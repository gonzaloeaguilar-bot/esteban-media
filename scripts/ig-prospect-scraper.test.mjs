import { describe, expect, it } from "vitest";

import {
  buildDmDraft,
  emailFromBio,
  igSearchTerms,
  isDuplicate,
  ledgerIndex,
  pickContact,
  profileDomain,
  isLeadFarmHandle,
  qualifyProfile,
  validateDm,
} from "./ig-prospect-scraper.mjs";

describe("igSearchTerms", () => {
  it("appends the city without the state code and prefers ig_terms", () => {
    expect(igSearchTerms({ ig_terms: ["barbershop"], queries: ["hair salon"] }, "Fort Lauderdale FL"))
      .toEqual(["barbershop Fort Lauderdale"]);
  });

  it("falls back to the shared Maps queries so one niches.json serves both lanes", () => {
    expect(igSearchTerms({ queries: ["gym"] }, "Miami FL")).toEqual(["gym Miami"]);
  });

  it("drops duplicate terms", () => {
    expect(igSearchTerms({ ig_terms: ["gym", "Gym"] }, "Miami FL")).toEqual(["gym Miami"]);
  });
});

describe("qualifyProfile", () => {
  const ok = { username: "thegym", followersCount: 5000, postsCount: 120 };

  it("accepts a public account inside the follower band", () => {
    expect(qualifyProfile(ok).ok).toBe(true);
  });

  it("states a reason for every rejection", () => {
    expect(qualifyProfile({ ...ok, private: true }).reason).toBe("private account");
    expect(qualifyProfile({ ...ok, followersCount: 12 }).reason).toBe("under 500 followers");
    expect(qualifyProfile({ ...ok, followersCount: 4_000_000 }).reason).toBe("over 250000 followers");
    expect(qualifyProfile({ ...ok, postsCount: 0 }).reason).toBe("no posts");
    expect(qualifyProfile({ ...ok, followersCount: null }).reason).toBe("no follower count");
    expect(qualifyProfile({ ...ok, username: "" }).reason).toBe("no handle");
    expect(qualifyProfile({ ...ok, username: "estebanmorenomedia" }).reason).toBe("platform/own account");
    expect(qualifyProfile({ ...ok, username: "miamimedspaleads" }).reason).toBe("lead-gen/agency farm handle");
  });

  it("sees a lead-farm token inside a concatenated handle, and spares Spanish words", () => {
    expect(isLeadFarmHandle("miamimedspaleads")).toBe(true);
    expect(isLeadFarmHandle("growth.hack.miami")).toBe(true);
    expect(isLeadFarmHandle("seo_miami")).toBe(true);
    expect(isLeadFarmHandle("paseos_miami")).toBe(false);
    expect(isLeadFarmHandle("thegym")).toBe(false);
  });

  it("honours a widened band", () => {
    expect(qualifyProfile({ ...ok, followersCount: 120 }, { minFollowers: 100 }).ok).toBe(true);
  });
});

describe("profileDomain", () => {
  it("returns the business domain without www", () => {
    expect(profileDomain("https://www.elitemedspamiami.com/")).toBe("elitemedspamiami.com");
  });

  it("refuses link aggregators and social profiles — they are not an owned domain", () => {
    expect(profileDomain("http://linktr.ee/mobonmiamivalley")).toBe("");
    expect(profileDomain("https://www.facebook.com/someshop")).toBe("");
    expect(profileDomain("https://msha.ke/elegantimagemedspa")).toBe("");
    expect(profileDomain("https://www.youtube.com/watch?v=abc")).toBe("");
  });

  it("refuses a booking vendor, so the harvester cannot pitch the vendor", () => {
    // Live 2026-10-06: @glowtogo.aesthetics_ linked to a Square booking page.
    expect(profileDomain("https://squareup.com/appointments/book/ckh2ni2udaooc")).toBe("");
    expect(profileDomain("https://booksy.com/en-us/some-salon")).toBe("");
    expect(profileDomain("https://wa.me/13055551234")).toBe("");
  });

  it("returns empty for a missing or malformed link", () => {
    expect(profileDomain("")).toBe("");
    expect(profileDomain("not a url")).toBe("");
  });
});

describe("emailFromBio / pickContact", () => {
  it("reads an address the owner typed into their own bio", () => {
    expect(emailFromBio("Bookings 📩 info@theshop.com\nMiami", "theshop.com")).toBe("info@theshop.com");
  });

  it("returns nothing rather than guessing", () => {
    expect(emailFromBio("Miami barbershop · DM to book", "theshop.com")).toBe("");
    expect(pickContact({ domain: "theshop.com" })).toEqual({ email: "", email_source: "", contact_tier: "" });
  });

  it("prefers the bio over a site harvest and records the source", () => {
    const got = pickContact({
      bioEmail: "hola@theshop.com",
      siteEmail: "owner@theshop.com",
      siteSource: "https://theshop.com/contact",
      domain: "theshop.com",
    });
    expect(got).toEqual({ email: "hola@theshop.com", email_source: "instagram bio", contact_tier: "A" });
  });

  it("falls back to the harvested site address with its real source url", () => {
    const got = pickContact({
      siteEmail: "info@theshop.com",
      siteSource: "https://theshop.com/contact",
      domain: "theshop.com",
    });
    expect(got.email_source).toBe("https://theshop.com/contact");
    expect(got.contact_tier).toBe("A");
  });
});

describe("ledgerIndex / isDuplicate", () => {
  const index = ledgerIndex([
    { handle: "alreadydmd", domain: "" },
    { domain: "theshop.com", email: "info@theshop.com", instagram: "@theshopmiami" },
  ]);

  it("blocks a handle already DMd", () => {
    expect(isDuplicate({ handle: "@AlreadyDMd" }, index)).toEqual({
      dup: true, reason: "handle already in ledger",
    });
  });

  it("blocks an IG handle the EMAIL lane already harvested", () => {
    expect(isDuplicate({ handle: "theshopmiami" }, index).dup).toBe(true);
  });

  it("blocks a DM to a business already emailed, matched on its domain", () => {
    expect(isDuplicate({ handle: "brandnewhandle", domain: "theshop.com" }, index)).toEqual({
      dup: true, reason: "domain already in ledger (emailed)",
    });
  });

  it("lets a genuinely new prospect through", () => {
    expect(isDuplicate({ handle: "freshone", domain: "fresh.com" }, index).dup).toBe(false);
  });

  it("does not treat a missing domain as a match on other rows with no domain", () => {
    expect(isDuplicate({ handle: "freshone", domain: "" }, index).dup).toBe(false);
  });
});

describe("buildDmDraft", () => {
  it("writes Spanish by default and passes its own guardrails", () => {
    const dm = buildDmDraft({ fullName: "Elite Med Spa", username: "elite.medspamiami" });
    expect(dm.startsWith("Hola Elite Med Spa,")).toBe(true);
    expect(validateDm(dm)).toEqual({ ok: true, violations: [] });
  });

  it("writes English on request and still passes", () => {
    expect(validateDm(buildDmDraft({ fullName: "The Gym", username: "thegym", language: "en" })).ok).toBe(true);
  });

  it("strips punctuation out of the name so the greeting cannot inflate the sentence count", () => {
    const dm = buildDmDraft({ fullName: "Dr. Ana Pérez M.D.", username: "dranap" });
    expect(dm).toContain("Hola Dr Ana Pérez MD,");
    expect(validateDm(dm)).toEqual({ ok: true, violations: [] });
  });

  it("trims a decorated profile name and falls back to the handle", () => {
    expect(buildDmDraft({ fullName: "Legends | Barbershop Miami", username: "x" })).toContain("Hola Legends,");
    expect(buildDmDraft({ fullName: "", username: "thegym" })).toContain("Hola @thegym,");
  });
});

describe("validateDm", () => {
  const cases = [
    ["contains a link", "Hola, mira mi portafolio en https://estebanmorenomedia.com hoy."],
    ["contains a link", "Hola, escribime y te muestro ejemplos en estebanmorenomedia.com ya."],
    ["contains a price", "Hola, edito video desde $300 al mes."],
    ["contains a price", "Hola, el paquete incluye cuatro reels."],
    ["promises a turnaround", "Hola, te entrego los reels en 48 horas."],
    ["promises a result or guarantee", "Hola, garantizo que se vuelve viral."],
    ["claims drone work", "Hola, hago tomas con drone de tu local."],
    ["claims full bilingual", "Hola, equipo totalmente bilingüe a tu servicio."],
    ["offers an audit or web/SEO work", "Hola, te hago una auditoría de tu contenido."],
    ["has an email subject line", "Asunto: edición de video\nHola equipo."],
    ["has a corporate signature", "Hola equipo, edito video. Un saludo."],
    ["pastes an email address", "Hola, escribime a hola@ejemplo.net."],
  ];

  for (const [label, text] of cases) {
    it(`rejects: ${label} — ${text.slice(0, 32)}…`, () => {
      const got = validateDm(text);
      expect(got.ok).toBe(false);
      expect(got.violations).toContain(label);
    });
  }

  it("rejects an email pretending to be a DM: too long, too many sentences, paragraphs", () => {
    const emailish = `Hola equipo.\n\nSoy editor de video. Ayudo a negocios locales. Trabajo remoto. Me cuentan. ${"x".repeat(400)}`;
    const got = validateDm(emailish);
    expect(got.violations).toContain("over 330 characters");
    expect(got.violations).toContain("more than 2 sentences");
    expect(got.violations).toContain("multi-paragraph (reads as an email)");
  });

  it("rejects an empty draft", () => {
    expect(validateDm("  ")).toEqual({ ok: false, violations: ["empty draft"] });
  });

  it("accepts a bare two-sentence DM anchored on the confirmed offer", () => {
    expect(validateDm("Hola, vi lo que publican. Edito video remoto si la edición se les acumula.").ok).toBe(true);
  });
});
