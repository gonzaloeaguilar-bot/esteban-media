import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  EXPRESS_MULTIPLIER,
  PRICING_BANDS,
  PRODUCT_PHOTO_MARKET,
  SHORT_FORM,
  VOLUME_MULTIPLIERS,
} from "@/lib/pricing";

function source(path: string) {
  return readFileSync(join(process.cwd(), path), "utf8");
}

/**
 * The estimator publishes numbers on a live client site while Esteban has no
 * confirmed price list. lib/pricing.ts is the single source of truth; these
 * tests pin the module to its documented basis so a figure cannot drift
 * without someone also updating docs/pricing-basis.md.
 */
describe("pricing module bands", () => {
  const basis = source("docs/pricing-basis.md");
  const pricingSource = source("lib/pricing.ts");

  const BANDS: Array<[keyof typeof PRICING_BANDS, number, number]> = [
    ["youtube", 450, 850],
    ["corporate", 725, 1450],
    ["realestate", 575, 1075],
    ["ecommerce", 400, 775],
  ];

  it("uses exactly the documented bands", () => {
    for (const [id, min, max] of BANDS) {
      expect(PRICING_BANDS[id].baseMin, `${id} baseMin`).toBe(min);
      expect(PRICING_BANDS[id].baseMax, `${id} baseMax`).toBe(max);
    }
  });

  // 2026-10-08: short-form is priced like Starter, not by a band. A $350-675
  // "single video" band contradicted Starter's $100 per video on the same site.
  it("prices short-form like Starter: $100 per video, $85 / $160 a week", () => {
    expect("social" in PRICING_BANDS).toBe(false);
    expect(SHORT_FORM.perVideoFrom).toBe(100);
    expect(SHORT_FORM.packOf).toBe(5);
    expect(SHORT_FORM.weekly.map((o) => [o.videosPerWeek, o.pricePerWeek])).toEqual([[1, 85], [2, 160]]);
    expect(basis).toMatch(/Short-form social \| \$100–500 per video \| \*\*from \$100 per video; \$85\/week \(1 video\) or \$160\/week \(2 videos\)\*\*/);
  });

  it("keeps the calculator's short-form path on the Starter numbers", () => {
    const estimator = source("components/video-budget-estimator.tsx");
    expect(estimator).toContain("SHORT_FORM.perVideoFrom");
    expect(estimator).toContain("SHORT_FORM.weekly");
    expect(estimator).not.toMatch(/PRICING_BANDS\.social|PRICING_BANDS\["social"\]/);
  });

  it("keeps the on-location capture add-on at the documented figures", () => {
    expect(PRICING_BANDS["on-location"].baseMin).toBe(400);
    expect(PRICING_BANDS["on-location"].baseMax).toBe(775);
  });

  it("keeps the documented volume and express multipliers", () => {
    expect(VOLUME_MULTIPLIERS["pack-5"]).toEqual({ multMin: 3.8, multMax: 3.9 });
    expect(VOLUME_MULTIPLIERS["monthly-15"]).toEqual({ multMin: 4.5, multMax: 5.5 });
    expect(VOLUME_MULTIPLIERS["monthly-30"]).toEqual({ multMin: 8, multMax: 9.5 });
    expect(EXPRESS_MULTIPLIER).toBe(1.25);
  });

  it("carries market provenance on every band", () => {
    for (const band of Object.values(PRICING_BANDS)) {
      expect(band.source, `${band.id} source`).toMatch(/market \$/);
      expect(band.marketMin).toBeGreaterThan(0);
      expect(band.marketMax).toBeGreaterThan(band.marketMin);
    }
  });

  it("documents a basis for every band that appears in the module", () => {
    // The doc writes figures with thousands separators for readability.
    const digits = basis.replace(/,/g, "");
    for (const [, min, max] of BANDS) {
      expect(digits, `docs/pricing-basis.md must cite $${min}`).toContain(String(min));
      expect(digits, `docs/pricing-basis.md must cite $${max}`).toContain(String(max));
    }
  });

  it("states the discount and that output is an estimate, not a quote", () => {
    expect(basis).toMatch(/10%/);
    expect(basis.toLowerCase()).toContain("scoped quote");
  });

  it("records that the full-production-company comparable is deliberately not used", () => {
    // Guards against someone benchmarking against $4,500-20,000 agency pricing
    // and "correcting" the bands upward for the wrong business model.
    expect(pricingSource).toMatch(/full-production-company/i);
    expect(basis.replace(/,/g, "")).toMatch(/4500/);
  });

  it("keeps the estimator free of inlined band figures", () => {
    const estimator = source("components/video-budget-estimator.tsx");
    expect(estimator).toContain('from "@/lib/pricing"');
    for (const [, min, max] of BANDS) {
      expect(estimator).not.toMatch(new RegExp(`baseMin\\s*=\\s*${min}\\b`));
      expect(estimator).not.toMatch(new RegExp(`baseMax\\s*=\\s*${max}\\b`));
    }
  });

  it("keeps the guides' market figures wired to the pricing module", () => {
    const guides = source("lib/guides.ts");
    expect(guides).toContain("PRODUCT_PHOTO_MARKET");
    expect(PRODUCT_PHOTO_MARKET.perImageMin).toBe(25);
    expect(PRODUCT_PHOTO_MARKET.perImageMax).toBe(50);
    expect(PRODUCT_PHOTO_MARKET.miamiEntryPerImage).toBe(35);
    expect(PRODUCT_PHOTO_MARKET.halfDayMin).toBe(300);
    expect(PRODUCT_PHOTO_MARKET.halfDayMax).toBe(1000);
    // The formerly hard-coded literals must not reappear in guide prose.
    expect(guides).not.toMatch(/\$25 to \$50|\$25 y \$50|\$300 to \$1,000|\$300 y \$1,000/);
  });

  it("keeps the cost guides free of asserted prices", () => {
    const guides = source("lib/guides.ts");
    expect(guides).toContain("no responsible one-price answer");
  });
});
