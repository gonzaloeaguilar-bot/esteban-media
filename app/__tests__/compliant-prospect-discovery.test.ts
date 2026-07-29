import { describe, it, expect, afterEach } from "vitest";
import fs from "fs";
import os from "os";
import path from "path";

import {
  DISCOVERY_TRANSMITS_EMAIL,
  SOFLA_BBOX,
  normalizeName,
  normalizeEmail,
  isNationalChain,
  inferSegment,
  buildOverpassQuery,
  parseOverpassResponse,
  discoverViaOverpass,
  buildDiscoveryFeed,
} from "../../scripts/compliant-prospect-discovery.mjs";
import { loadAllProspects } from "../../scripts/compliant-outreach-dispatcher.mjs";

const socialHandles = { instagram: null, facebook: null, linkedin: null };

/** Fake Overpass payload of REAL-shaped OSM nodes (verbatim-tag semantics). */
const fakeOverpassJson = {
  elements: [
    {
      type: "node",
      id: 1,
      tags: { name: "Cafe Aurora", amenity: "cafe", website: "https://cafeaurora.test", "addr:city": "Hollywood" },
    },
    {
      type: "node",
      id: 2,
      tags: { name: "La Parrilla", amenity: "restaurant", "contact:website": "https://laparrilla.test", "addr:city": "Doral" },
    },
    {
      type: "node",
      id: 3,
      tags: { name: "Wynwood Ad Co", office: "advertising_agency", website: "https://wynwoodad.test" },
    },
    // National chain — must be excluded.
    { type: "node", id: 4, tags: { name: "Starbucks", amenity: "cafe", website: "https://starbucks.com/x" } },
    // No website — must be dropped.
    { type: "node", id: 5, tags: { name: "No Site Diner", amenity: "restaurant" } },
    // No name — must be dropped.
    { type: "node", id: 6, tags: { amenity: "restaurant", website: "https://nameless.test" } },
    // Untargeted segment — must be dropped.
    { type: "node", id: 7, tags: { name: "City Hall", amenity: "townhall", website: "https://cityhall.test" } },
  ],
};

describe("discovery is structurally send-incapable", () => {
  it("never transmits email (discovery-only posture)", () => {
    expect(DISCOVERY_TRANSMITS_EMAIL).toBe(false);
  });
});

describe("Overpass query builder (keyless OSM)", () => {
  it("targets the South-Florida bbox and the real target-segment tags", () => {
    const q = buildOverpassQuery();
    expect(q).toContain(`${SOFLA_BBOX.south},${SOFLA_BBOX.west},${SOFLA_BBOX.north},${SOFLA_BBOX.east}`);
    expect(q).toContain('node["amenity"="restaurant"]["name"]["website"]');
    expect(q).toContain('node["amenity"="cafe"]["name"]["contact:website"]');
    expect(q).toContain('node["office"="estate_agent"]["name"]["website"]');
    expect(q).toContain("[out:json]");
  });
});

describe("segment inference + chain filter", () => {
  it("maps OSM tags to Esteban's target segments", () => {
    expect(inferSegment({ amenity: "restaurant" })).toBe("restaurant");
    expect(inferSegment({ amenity: "cafe" })).toBe("cafe");
    expect(inferSegment({ craft: "brewery" })).toBe("brewery");
    expect(inferSegment({ office: "advertising_agency" })).toBe("agency");
    expect(inferSegment({ office: "estate_agent" })).toBe("real-estate");
    expect(inferSegment({ shop: "clothes" })).toBe("ecommerce");
    expect(inferSegment({ amenity: "townhall" })).toBeNull();
  });

  it("flags national chains as non-prospects", () => {
    expect(isNationalChain("Starbucks")).toBe(true);
    expect(isNationalChain("RE/MAX Downtown")).toBe(true);
    expect(isNationalChain("Cafe Aurora")).toBe(false);
  });

  it("normalizers are stable and accent-insensitive", () => {
    expect(normalizeName("  Café  Aurorá! ")).toBe("cafe aurora");
    expect(normalizeEmail("  HOLA@Site.COM ")).toBe("hola@site.com");
  });
});

describe("parseOverpassResponse (no fabrication)", () => {
  it("keeps only real, named, websited, target-segment, non-chain businesses", () => {
    const cands = parseOverpassResponse(fakeOverpassJson);
    expect(cands.map((c) => c.name).sort()).toEqual(["Cafe Aurora", "La Parrilla", "Wynwood Ad Co"]);
  });

  it("copies fields verbatim and NEVER invents ratings/reviews/distance/phone", () => {
    const cands = parseOverpassResponse(fakeOverpassJson);
    const cafe = cands.find((c) => c.name === "Cafe Aurora")!;
    expect(cafe.website).toBe("https://cafeaurora.test");
    expect(cafe.city).toBe("Hollywood");
    expect(cafe.segment).toBe("cafe");
    expect(cafe.source).toBe("osm:node/1");
    for (const c of cands) {
      expect(c).not.toHaveProperty("rating");
      expect(c).not.toHaveProperty("reviews");
      expect(c).not.toHaveProperty("reviewCount");
      expect(c).not.toHaveProperty("distance");
      expect(c).not.toHaveProperty("phone");
    }
  });

  it("uses contact:website when website is absent", () => {
    const cands = parseOverpassResponse(fakeOverpassJson);
    const rest = cands.find((c) => c.name === "La Parrilla")!;
    expect(rest.website).toBe("https://laparrilla.test");
  });
});

describe("discoverViaOverpass uses an injectable fetch (no network in tests)", () => {
  it("POSTs a QL query and returns parsed candidates", async () => {
    let capturedBody = "";
    const fetchFn = async (_url: string, opts: { body: string }) => {
      capturedBody = opts.body;
      return { ok: true, json: async () => fakeOverpassJson };
    };
    const cands = await discoverViaOverpass({ fetchFn: fetchFn as unknown as typeof fetch });
    expect(capturedBody).toContain("data=");
    expect(cands.length).toBe(3);
  });

  it("throws on a non-200 Overpass response", async () => {
    const fetchFn = async () => ({ ok: false, status: 429, json: async () => ({}) });
    await expect(
      discoverViaOverpass({ fetchFn: fetchFn as unknown as typeof fetch }),
    ).rejects.toThrow(/429/);
  });
});

describe("buildDiscoveryFeed — harvest, screen, dedupe", () => {
  const candidates = [
    { name: "Cafe Aurora", website: "https://cafeaurora.test", city: "Hollywood", segment: "cafe", language: "es", source: "osm:node/1" },
    { name: "Example Bistro", website: "https://examplebistro.test", city: "FTL", segment: "restaurant", language: "es", source: "osm:node/2" },
    { name: "Five Fives", website: "https://fivefives.test", city: "FTL", segment: "restaurant", language: "es", source: "osm:node/3" },
    { name: "No Email Co", website: "https://noemail.test", city: "Miami", segment: "agency", language: "en", source: "osm:node/4" },
  ];

  const harvestFn = async (url: string) => {
    if (url.includes("cafeaurora")) return { emails: ["hola@cafeaurora.test"], socialHandles };
    if (url.includes("examplebistro")) return { emails: ["info@place.example"], socialHandles };
    if (url.includes("fivefives")) return { emails: ["events@555place.test"], socialHandles };
    return { emails: [], socialHandles };
  };

  it("only adds prospects with a real harvested email", async () => {
    const { added, skipped } = await buildDiscoveryFeed({
      candidates,
      suppressionList: { unsubscribed: [], bounced: [] },
      harvestFn,
    });
    expect(added.map((p) => p.name)).toEqual(["Cafe Aurora"]);
    expect(added[0].email).toBe("hola@cafeaurora.test");
    expect(added[0].handleVerified).toBe(false);
    expect(added[0].source).toBe("osm:node/1");
    const reasons = skipped.map((s) => s.reason).sort();
    expect(reasons).toEqual(["fabricated_or_invalid_email", "fabricated_or_invalid_email", "fabricated_or_invalid_email"]);
  });

  it("de-dupes against known business names BEFORE harvesting", async () => {
    const { added, skipped } = await buildDiscoveryFeed({
      candidates,
      suppressionList: { unsubscribed: [], bounced: [] },
      knownNames: new Set([normalizeName("Cafe Aurora")]),
      harvestFn,
    });
    expect(added.length).toBe(0);
    expect(skipped.find((s) => s.name === "Cafe Aurora")?.reason).toBe("duplicate_business");
  });

  it("de-dupes against already-contacted/discovered emails (ledger)", async () => {
    const { added, skipped } = await buildDiscoveryFeed({
      candidates,
      suppressionList: { unsubscribed: [], bounced: [] },
      knownEmails: new Set(["hola@cafeaurora.test"]),
      harvestFn,
    });
    expect(added.length).toBe(0);
    expect(skipped.find((s) => s.name === "Cafe Aurora")?.reason).toBe("duplicate_email");
  });

  it("de-dupes two candidates that resolve to the same email within one batch", async () => {
    const dup = [
      { name: "Aurora Cafe One", website: "https://one.test", city: "", segment: "cafe", language: "es", source: "osm:node/10" },
      { name: "Aurora Cafe Two", website: "https://two.test", city: "", segment: "cafe", language: "es", source: "osm:node/11" },
    ];
    const sameEmail = async () => ({ emails: ["hola@shared.test"], socialHandles });
    const { added, skipped } = await buildDiscoveryFeed({
      candidates: dup,
      suppressionList: { unsubscribed: [], bounced: [] },
      harvestFn: sameEmail,
    });
    expect(added.length).toBe(1);
    expect(skipped.find((s) => s.reason === "duplicate_email")).toBeTruthy();
  });

  it("skips a suppressed address even when the email is real", async () => {
    const { added, skipped } = await buildDiscoveryFeed({
      candidates: [candidates[0]],
      suppressionList: { unsubscribed: ["hola@cafeaurora.test"], bounced: [] },
      harvestFn,
    });
    expect(added.length).toBe(0);
    expect(skipped[0].reason).toBe("suppressed");
  });

  it("fails CLOSED — adds nothing when the suppression list is unreadable (null)", async () => {
    const { added, skipped } = await buildDiscoveryFeed({
      candidates,
      suppressionList: null,
      harvestFn,
    });
    expect(added.length).toBe(0);
    expect(skipped.every((s) => s.reason === "suppression_unreadable")).toBe(true);
  });

  it("respects the per-run limit (bounds website crawling)", async () => {
    const many = Array.from({ length: 5 }, (_, i) => ({
      name: `Real Cafe ${i}`,
      website: `https://real${i}.test`,
      city: "",
      segment: "cafe",
      language: "es",
      source: `osm:node/${100 + i}`,
    }));
    const okEmail = async (url: string) => ({ emails: [`hi@${url.replace(/\W+/g, "")}.test`], socialHandles });
    const { added, skipped } = await buildDiscoveryFeed({
      candidates: many,
      suppressionList: { unsubscribed: [], bounced: [] },
      harvestFn: okEmail,
      limit: 2,
    });
    expect(added.length).toBe(2);
    expect(skipped.filter((s) => s.reason === "limit_reached").length).toBe(3);
  });
});

describe("dispatcher consumes the discovery feed (loadAllProspects merge)", () => {
  const tmpFiles: string[] = [];
  const tmp = (obj: unknown) => {
    const p = path.join(os.tmpdir(), `feed-${Date.now()}-${Math.random().toString(36).slice(2)}.json`);
    fs.writeFileSync(p, JSON.stringify(obj));
    tmpFiles.push(p);
    return p;
  };
  afterEach(() => {
    for (const p of tmpFiles.splice(0)) if (fs.existsSync(p)) fs.unlinkSync(p);
  });

  it("merges seed + discovered and de-dupes by name and email", () => {
    const seedPath = tmp({
      prospects: [{ id: "S1", name: "Boatyard", city: "FTL", language: "en" }],
    });
    const discoveredPath = tmp({
      prospects: [
        // Duplicate of the seed by name — dropped.
        { id: "D-dup", name: "boatyard", city: "FTL", language: "en", email: "a@boatyard.test" },
        // Genuinely new — kept.
        { id: "D-new", name: "Cafe Aurora", city: "Hollywood", language: "es", email: "hola@cafeaurora.test" },
      ],
    });
    const merged = loadAllProspects({ seedPath, discoveredPath });
    expect(merged.map((p) => p.id)).toEqual(["S1", "D-new"]);
  });

  it("returns just the seed when no discovery feed exists", () => {
    const seedPath = tmp({ prospects: [{ id: "S1", name: "Boatyard" }] });
    const merged = loadAllProspects({ seedPath, discoveredPath: "/nonexistent/discovered.json" });
    expect(merged.map((p) => p.id)).toEqual(["S1"]);
  });
});
