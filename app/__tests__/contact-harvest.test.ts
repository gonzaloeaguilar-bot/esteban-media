import { describe, expect, it } from "vitest";

import {
  PRIORITY_PATHS,
  decodeCloudflareEmail,
  deobfuscateText,
  extractEmailsFromHtml,
  isPlausibleBusinessEmail,
  rankEmailCandidates,
  scoreEmail,
} from "@/lib/contact-harvest.mjs";
import {
  buildMapsInput,
  classifyApifyError,
  placeToProspect,
} from "@/lib/apify-google-maps.mjs";
import { _resetMxCache, validateEmail } from "@/lib/email-validation.mjs";
import {
  buildOverpassQuery,
  fetchLocalBusinesses,
  isIndependentBusiness,
  tagsToProspects,
} from "@/lib/osm-local-business.mjs";

/**
 * Hermetic. Every test here runs on a fixture string or an injected resolver —
 * nothing reaches the network, because a suite that quietly makes real HTTP or
 * DNS calls passes for reasons nobody chose and fails on a plane.
 */

describe("Cloudflare email obfuscation", () => {
  /**
   * The biggest false negative in the old extractor. Cloudflare replaces the
   * address with `data-cfemail` hex and the plaintext is GONE, so a regex sees a
   * site with no email. First hex byte is the XOR key, so it is fully
   * reversible with no network call.
   */
  it("decodes a real data-cfemail payload", () => {
    // Built by the documented algorithm: key 0x7a, then each byte XOR 0x7a.
    const address = "hola@arepabar.com";
    const key = 0x7a;
    const hex =
      key.toString(16).padStart(2, "0") +
      [...address].map((c) => (c.charCodeAt(0) ^ key).toString(16).padStart(2, "0")).join("");
    expect(decodeCloudflareEmail(hex)).toBe(address);
  });

  it("returns null rather than mojibake when the payload is not an address", () => {
    expect(decodeCloudflareEmail("7a7a7a7a")).toBeNull();
    expect(decodeCloudflareEmail("zzzz")).toBeNull();
    expect(decodeCloudflareEmail("7a1")).toBeNull();
    expect(decodeCloudflareEmail("")).toBeNull();
  });

  it("finds a Cloudflare-hidden address in page HTML where a plain regex finds none", () => {
    const address = "info@lauderale.com";
    const key = 0x2b;
    const hex =
      key.toString(16).padStart(2, "0") +
      [...address].map((c) => (c.charCodeAt(0) ^ key).toString(16).padStart(2, "0")).join("");
    const html = `<a class="__cf_email__" data-cfemail="${hex}">[email&#160;protected]</a>`;
    // The control that proves the point: no plaintext address in the source.
    expect(html).not.toContain("@lauderale.com");
    expect(extractEmailsFromHtml(html).map((c) => c.email)).toContain(address);
  });
});

describe("what is not a business email", () => {
  it("rejects asset filenames the old filter let through", () => {
    // The old one dropped .png/.jpg/.svg only.
    for (const bad of ["logo@2x.webp", "hero@2x.gif", "icon@1x.avif", "app@v2.js"]) {
      expect(isPlausibleBusinessEmail(bad), bad).toBe(false);
    }
  });

  it("rejects inboxes nobody reads, by exact local part", () => {
    for (const bad of ["noreply@shop.com", "postmaster@shop.com", "unsubscribe@shop.com"]) {
      expect(isPlausibleBusinessEmail(bad), bad).toBe(false);
    }
  });

  it("does not reject a real address for merely containing a bad substring", () => {
    // `info` contains `inf`; a substring filter would kill it. And a Fort
    // Lauderdale shop really can be called "Example Framing".
    expect(isPlausibleBusinessEmail("info@arepabar.com")).toBe(true);
    expect(isPlausibleBusinessEmail("hello@exampleframing.com")).toBe(true);
    // But the placeholder domain itself stays rejected.
    expect(isPlausibleBusinessEmail("hello@example.com")).toBe(false);
  });

  it("rejects Sentry DSNs and JSON-escaped junk", () => {
    expect(isPlausibleBusinessEmail("0123456789abcdef0123456789abcdef@sentry.io")).toBe(false);
    expect(isPlausibleBusinessEmail("a@b.comu003e")).toBe(false);
  });
});

describe("picking the inbox a human reads", () => {
  /**
   * The old extractor took whichever address the markup mentioned first. A site
   * exposing careers@ before info@ got pitched at recruiting.
   */
  it("prefers the business's own domain and a role a buyer answers", () => {
    const own = scoreEmail("info@arepabar.com", { siteHost: "arepabar.com", onContactPage: true });
    const careers = scoreEmail("careers@arepabar.com", { siteHost: "arepabar.com" });
    const foreign = scoreEmail("info@somewebdesigner.com", { siteHost: "arepabar.com" });
    expect(own).toBeGreaterThan(careers);
    expect(own).toBeGreaterThan(foreign);
  });

  it("names exactly one winner", () => {
    const ranked = rankEmailCandidates(
      [
        { email: "careers@arepabar.com", onContactPage: false, inJsonLd: false },
        { email: "info@arepabar.com", onContactPage: true, inJsonLd: false },
      ],
      { siteHost: "arepabar.com" },
    );
    expect(ranked.filter((c) => c.isLikelyOfficial)).toHaveLength(1);
    expect(ranked[0].email).toBe("info@arepabar.com");
  });
});

describe("the other places an address hides", () => {
  it("reads JSON-LD, which restaurants use more than visible copy", () => {
    const html = `<script type="application/ld+json">
      {"@type":"Restaurant","name":"Patacon Pisao","email":"pedidos@pataconpisao.com"}
    </script>`;
    const found = extractEmailsFromHtml(html);
    expect(found.map((c) => c.email)).toContain("pedidos@pataconpisao.com");
    expect(found.find((c) => c.email === "pedidos@pataconpisao.com")?.inJsonLd).toBe(true);
  });

  it("un-obfuscates the human form, in English and Spanish", () => {
    expect(deobfuscateText("hola [arroba] sitio [punto] com")).toContain("hola@sitio.com");
    expect(
      extractEmailsFromHtml("<p>reach us at hello [at] boatyard [dot] com</p>").map((c) => c.email),
    ).toContain("hello@boatyard.com");
    // Whitespace-delimited, no brackets.
    expect(deobfuscateText("hola arroba sitio punto com")).toContain("hola@sitio.com");
  });

  /**
   * The substring trap, written down because it produced a plausible FAKE
   * address rather than a visible failure. A bare `at` matched inside the real
   * prospect name "Boatyard" and yielded bo@yard.com.
   */
  it("never invents an address by matching 'at' or 'dot' inside a word", () => {
    const emails = extractEmailsFromHtml(
      "<p>reach us at hello [at] boatyard [dot] com</p>",
    ).map((c) => c.email);
    expect(emails).not.toContain("bo@yard.com");
    expect(emails).toEqual(["hello@boatyard.com"]);
    // Other words carrying the tokens must survive untouched.
    for (const word of ["boatyard", "dotted", "category", "atlantic", "puntos"]) {
      expect(deobfuscateText(word), word).toBe(word);
    }
  });

  it("strips mailto query strings", () => {
    expect(
      extractEmailsFromHtml('<a href="mailto:info@vault.com?subject=Hi%20there">mail</a>').map(
        (c) => c.email,
      ),
    ).toEqual(["info@vault.com"]);
  });

  it("asks the contact page, in both languages", () => {
    expect(PRIORITY_PATHS).toContain("/contact");
    expect(PRIORITY_PATHS).toContain("/contacto");
  });
});

describe("MX validation, with an injected resolver", () => {
  it("accepts a domain that publishes an MX", async () => {
    _resetMxCache();
    const resolver = { resolveMx: async () => [{ exchange: "mx.example-host.net", priority: 10 }] };
    await expect(validateEmail("info@arepabar.com", { resolver })).resolves.toMatchObject({
      ok: true,
      reason: "mx",
    });
  });

  it("rejects a domain that resolves nowhere — the fabricated-address case", async () => {
    _resetMxCache();
    const enotfound = Object.assign(new Error("not found"), { code: "ENOTFOUND" });
    const resolver = {
      resolveMx: async () => {
        throw enotfound;
      },
      resolve: async () => {
        throw enotfound;
      },
    };
    await expect(validateEmail("info@notarealbiz-zzz.com", { resolver })).resolves.toMatchObject({
      ok: false,
      reason: "enotfound",
    });
  });

  it("accepts the implicit MX (A record only), which cheap hosting really uses", async () => {
    _resetMxCache();
    const resolver = {
      resolveMx: async () => {
        throw Object.assign(new Error("no data"), { code: "ENODATA" });
      },
      resolve: async () => ["203.0.113.10"],
    };
    await expect(validateEmail("info@smallcafe.com", { resolver })).resolves.toMatchObject({
      ok: true,
      reason: "implicit_mx_a_record",
    });
  });

  it("caches per domain so a 40-prospect run does not do 40 lookups", async () => {
    _resetMxCache();
    let calls = 0;
    const resolver = {
      resolveMx: async () => {
        calls += 1;
        return [{ exchange: "mx.host.net", priority: 10 }];
      },
    };
    await validateEmail("a@same.com", { resolver });
    await validateEmail("b@same.com", { resolver });
    expect(calls).toBe(1);
  });
});

describe("the Apify Google Maps lane", () => {
  /**
   * `website: "withWebsite"` is the entire fix. 19 of 22 prospects were skipped
   * because they had no website to harvest from; asking Maps for only places
   * that have one removes that at the source. Field names were read from the
   * live input schema of build 0.14.761 on 2026-09-30.
   */
  it("asks Google Maps only for places that HAVE a website", () => {
    const input = buildMapsInput({ searches: ["restaurant"], location: "Fort Lauderdale, Florida" });
    expect(input.website).toBe("withWebsite");
    expect(input.scrapeContacts).toBe(true);
    expect(input.skipClosedPlaces).toBe(true);
  });

  it("leaves the per-lead paid email verification OFF", () => {
    // MX is free and answers the same question; this add-on bills per lead and
    // the harvester runs daily.
    const input = buildMapsInput({ searches: ["cafe"], location: "Miami, Florida" });
    expect(input.verifyLeadsEnrichmentEmails).toBe(false);
  });

  it("uses the exact field names the actor's schema declares", () => {
    const input = buildMapsInput({ searches: ["gym"], location: "Hollywood, Florida", maxPerSearch: 7 });
    expect(Object.keys(input).sort()).toEqual(
      [
        "language",
        "locationQuery",
        "maxCrawledPlacesPerSearch",
        "scrapeContacts",
        "searchMatching",
        "searchStringsArray",
        "skipClosedPlaces",
        "verifyLeadsEnrichmentEmails",
        "website",
      ].sort(),
    );
    expect(input.maxCrawledPlacesPerSearch).toBe(7);
  });

  it("refuses to build a run with no searches or no location", () => {
    expect(() => buildMapsInput({ searches: [], location: "Miami" })).toThrow();
    // @ts-expect-error — location is required; the type says so and so does the runtime.
    expect(() => buildMapsInput({ searches: ["cafe"] })).toThrow();
  });

  /**
   * Measured 2026-09-30: GET /users/me returned 200 while POST /runs returned
   * `platform-feature-disabled: Monthly usage hard limit exceeded`. A token that
   * authenticates is not a lane that can run — conflating the two is how a loop
   * reports "no prospects found" for days instead of "the plan is capped".
   */
  it("tells a spend cap apart from an auth failure", () => {
    const capped = classifyApifyError(403, {
      error: { type: "platform-feature-disabled", message: "Monthly usage hard limit exceeded" },
    });
    expect(capped.wall).toBe("usage_cap_exceeded");
    expect(capped.retryable).toBe(false);

    expect(classifyApifyError(401, { error: { type: "token-not-found", message: "bad token" } }).wall).toBe("auth");
    expect(classifyApifyError(429, {}).retryable).toBe(true);
    expect(classifyApifyError(503, {}).retryable).toBe(true);
  });

  it("maps a place onto the prospect shape the dispatcher already loads", () => {
    const prospect = placeToProspect({
      placeId: "ChIJabc",
      title: "Arepa Bar",
      city: "Fort Lauderdale",
      website: "https://arepabar.com",
      phone: "+19545551212",
      contactDetails: { emails: ["INFO@arepabar.com", "info@arepabar.com"], instagrams: ["@arepabar"] },
      categories: ["Restaurant"],
    });
    expect(prospect.name).toBe("Arepa Bar");
    expect(prospect.website).toBe("https://arepabar.com");
    // Candidates, not verdicts: the add-on returns noreply@ like any crawler,
    // so these still go through ranking and MX.
    expect(prospect.candidateEmails).toEqual(["info@arepabar.com"]);
    expect(prospect.source).toContain("compass/crawler-google-places");
  });
});

describe("the keyless OpenStreetMap fallback lane", () => {
  /**
   * Exists because Apify is capped until 2026-10-03 (STARTER, $29 cap, $29.24
   * spent — read from the account, not assumed). A pipeline whose only source is
   * capped produces zero prospects and no explanation.
   *
   * Proven on 2026-09-30: one bbox query returned 80 Fort Lauderdale businesses
   * with real websites, and harvesting 18 independents produced 5 deliverable
   * addresses with zero fabrications.
   */
  it("builds a bbox query in Overpass's own coordinate order", () => {
    const q = buildOverpassQuery({ bbox: [26.09, -80.2, 26.18, -80.1], limit: 40 });
    // (south, west, north, east) — the wrong order returns an EMPTY set rather
    // than an error, so it would look like "no businesses here".
    expect(q).toContain("(26.09,-80.2,26.18,-80.1)");
    expect(q).toContain("out tags 40");
    expect(q).toContain("[out:json]");
  });

  it("refuses a bbox with the corners swapped instead of silently finding nothing", () => {
    expect(() => buildOverpassQuery({ bbox: [26.18, -80.2, 26.09, -80.1] })).toThrow(/south/);
    expect(() => buildOverpassQuery({ bbox: [26.09, -80.1, 26.18, -80.2] })).toThrow(/west/);
    expect(() => buildOverpassQuery({ bbox: [1, 2, 3] })).toThrow();
  });

  it("drops national chains, which a one-person video shop cannot sell to", () => {
    // Both were in the first 12 real results.
    expect(isIndependentBusiness({ name: "IHOP" })).toBe(false);
    expect(isIndependentBusiness({ name: "Starbucks" })).toBe(false);
    expect(isIndependentBusiness({ name: "The Cheesecake Factory" })).toBe(false);
    expect(isIndependentBusiness({ name: "Tom Jenkins BBQ" })).toBe(true);
    // OSM marks franchises explicitly; trust the data over the name list.
    expect(isIndependentBusiness({ name: "Local Looking Cafe", brand: "Big Chain" })).toBe(false);
  });

  it("keeps one prospect per website host, so a chain's store locator is not 40 leads", () => {
    const prospects = tagsToProspects([
      { id: 1, type: "node", tags: { name: "Beach House Las Olas", website: "https://beachhouseflb.com/", amenity: "restaurant" } },
      { id: 2, type: "node", tags: { name: "Beach House Las Olas 2", website: "https://www.beachhouseflb.com/x", amenity: "restaurant" } },
      { id: 3, type: "node", tags: { name: "Catch & Cut", website: "https://catchandcut.com", amenity: "restaurant" } },
    ]);
    expect(prospects).toHaveLength(2);
    expect(prospects.map((p) => p.name)).toEqual(["Beach House Las Olas", "Catch & Cut"]);
    expect(prospects[0].segment).toBe("restaurant");
    expect(prospects[0].source).toBe("openstreetmap:overpass");
  });

  it("skips entries with no website — the exact gap that caused the bug", () => {
    expect(tagsToProspects([{ id: 9, tags: { name: "No Site Cafe", amenity: "cafe" } }])).toEqual([]);
  });

  it("tries the next mirror when one returns 504", async () => {
    // overpass-api.de returned 504 twice on 2026-09-30; one dead mirror must
    // not end the run.
    const calls: string[] = [];
    const fetchImpl = async (url: string) => {
      calls.push(url);
      if (calls.length === 1) return { ok: false, status: 504 };
      return { ok: true, status: 200, json: async () => ({ elements: [{ id: 1, tags: { name: "X", website: "https://x.com" } }] }) };
    };
    const out = await fetchLocalBusinesses(
      { bbox: [26.09, -80.2, 26.18, -80.1] },
      { fetchImpl, mirrors: ["https://a/api", "https://b/api"] },
    );
    expect(calls).toHaveLength(2);
    expect(out.elements).toHaveLength(1);
    expect(out.mirror).toBe("https://b/api");
  });
});

describe("template placeholders found on real sites", () => {
  /**
   * Found in production on 2026-09-30, not imagined. The harvest pulled
   * `abc@xyz.com` off Elbo Room's genuine contact page — a real Fort Lauderdale
   * bar that never deleted its theme's dummy address. `xyz.com` resolves AND
   * publishes MX, so neither the shape check nor the DNS check could catch it:
   * it became a draft addressed to nobody.
   */
  it("rejects the exact placeholder that reached a draft", () => {
    expect(isPlausibleBusinessEmail("abc@xyz.com")).toBe(false);
  });

  it("rejects a dummy on either side of the @", () => {
    // A dummy local part on a real domain is somebody testing their own form.
    expect(isPlausibleBusinessEmail("test@realbakery.com")).toBe(false);
    expect(isPlausibleBusinessEmail("youremail@realbakery.com")).toBe(false);
    // A real role on a placeholder domain is a theme that was never edited.
    expect(isPlausibleBusinessEmail("info@yourwebsite.com")).toBe(false);
  });

  it("does not reject a real address that merely contains a dummy word", () => {
    // Exact local parts only. `abc` is inside plenty of real names, and
    // `testa` is an Italian surname a restaurant really uses.
    expect(isPlausibleBusinessEmail("abcdefcatering@gmail.com")).toBe(true);
    expect(isPlausibleBusinessEmail("testa@trattoriatesta.com")).toBe(true);
    expect(isPlausibleBusinessEmail("nametag@printshop.com")).toBe(true);
    // And the legitimate address from the same run must survive.
    expect(isPlausibleBusinessEmail("marketing@lasvegascubancuisine.com")).toBe(true);
  });
});
