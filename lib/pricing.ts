// Single source of truth for every published price figure on the site.
//
// Base bands are South Florida market rates for an editing-led freelancer
// (Esteban's actual model), less a standing 10% introductory discount.
// Each band was checked against published 2026 rate guides before the
// discount was applied; see docs/pricing-basis.md. The `source` field carries
// that market provenance.
//
// These are deliberately NOT Miami full-production-company rates
// ($4,500-20,000), because that comparable assumes a full crew and is the
// wrong model for editing-led work. Do not "correct" upward to it.
//
// Output stays an indicative range; the UI requires a scoped quote.

export type PricingBandId =
  | "social"
  | "youtube"
  | "corporate"
  | "realestate"
  | "ecommerce"
  | "on-location";

export type PricingBand = {
  id: PricingBandId;
  /** Discounted band published by the estimator (USD). */
  baseMin: number;
  baseMax: number;
  /** Published market comparable the band was checked against (USD). */
  marketMin: number;
  marketMax: number;
  /** Market provenance, per docs/pricing-basis.md. */
  source: string;
};

export const PRICING_BANDS: Record<PricingBandId, PricingBand> = {
  social: {
    id: "social",
    baseMin: 350,
    baseMax: 675,
    marketMin: 100,
    marketMax: 500,
    source: "market $100-500 per short-form project",
  },
  youtube: {
    id: "youtube",
    baseMin: 450,
    baseMax: 850,
    marketMin: 300,
    marketMax: 1500,
    source: "market $300-1,500 per YouTube edit",
  },
  corporate: {
    id: "corporate",
    baseMin: 725,
    baseMax: 1450,
    marketMin: 500,
    marketMax: 2500,
    source: "market $500-2,500 per medium/explainer project",
  },
  realestate: {
    id: "realestate",
    baseMin: 575,
    baseMax: 1075,
    marketMin: 250,
    marketMax: 1200,
    source: "market $250-1,200 short ad creative",
  },
  ecommerce: {
    id: "ecommerce",
    baseMin: 400,
    baseMax: 775,
    marketMin: 250,
    marketMax: 1200,
    source: "market $250-1,200 short ad creative",
  },
  // Half-day on-location capture add-on: market $300-1,000, less 10%.
  "on-location": {
    id: "on-location",
    baseMin: 400,
    baseMax: 775,
    marketMin: 300,
    marketMax: 1000,
    source: "market $300-1,000 half-day",
  },
};

export type VolumeMultiplier = { multMin: number; multMax: number };

export const VOLUME_MULTIPLIERS: Record<
  "pack-5" | "monthly-15" | "monthly-30",
  VolumeMultiplier
> = {
  "pack-5": { multMin: 3.8, multMax: 3.9 },
  "monthly-15": { multMin: 4.5, multMax: 5.5 },
  "monthly-30": { multMin: 8, multMax: 9.5 },
};

export const EXPRESS_MULTIPLIER = 1.25;

// Published South Florida PHOTOGRAPHY market context quoted in lib/guides.ts
// (product-photography cost guides, EN + ES). These are published market
// rates for the area, never a price commitment from Esteban Moreno Media.
export const PRODUCT_PHOTO_MARKET = {
  /** Simple white-background catalog images, per image (USD). */
  perImageMin: 25,
  perImageMax: 50,
  /** Miami studios' advertised entry rate, per image (USD). */
  miamiEntryPerImage: 35,
  /** Half-day sessions in Miami, plus production expenses (USD). */
  halfDayMin: 300,
  halfDayMax: 1000,
  source:
    "published 2026 South Florida / Miami product-photography market rates; see docs/pricing-basis.md",
} as const;

/** "1,000" style formatting for prose in guides. */
export function usd(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}
