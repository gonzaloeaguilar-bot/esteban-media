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

// Esteban's own package prices, set by him in his 2026-09 services guide
// (the "Paquetes" document he sends clients). These are owner-set starting
// points, not market bands: every package page shows them as "desde"/"from",
// and the quote process says a scoped quote is always issued. Change a price
// here and every surface that shows it follows.
export type PackageId = "arranque" | "crecimiento" | "presencia-local" | "todo-incluido";

export type PackagePrice =
  | { kind: "from"; amount: number; unit: "video" | "month" | "production-day" }
  | { kind: "custom" };

export const PACKAGE_PRICES: Record<PackageId, PackagePrice> = {
  arranque: { kind: "from", amount: 100, unit: "video" },
  crecimiento: { kind: "from", amount: 640, unit: "month" },
  "presencia-local": { kind: "from", amount: 800, unit: "production-day" },
  "todo-incluido": { kind: "custom" },
};

// Real estate monthly plans, from Esteban's 2026-09-30 "Real Estate" price
// guide. Figures only: the words that go with them live in
// lib/real-estate-plans.ts, so a price is edited in exactly one place.
//
// These are the MONTHLY plans. The per-shoot rate card is a separate source of
// truth (REAL_ESTATE_MEDIA in lib/services-config.ts) and is not touched here.
export type RealEstatePlanId = "essential" | "plus" | "premium";

export type RealEstatePlan = {
  id: RealEstatePlanId;
  /** USD per month. */
  price: number;
  /** Properties per month, each up to 3,000 SF. */
  properties: number;
  productionDays: number;
  /** Drone photography is an add-on on the smaller plans. */
  drone: "add-on" | "included";
  /** Posts or reels per week, as printed ("3–4" is a range, not a number). */
  postsPerWeek: string;
};

export const REAL_ESTATE_PLANS: RealEstatePlan[] = [
  { id: "essential", price: 450, properties: 1, productionDays: 2, drone: "add-on", postsPerWeek: "2" },
  { id: "plus", price: 700, properties: 2, productionDays: 3, drone: "add-on", postsPerWeek: "3–4" },
  { id: "premium", price: 1250, properties: 3, productionDays: 3, drone: "included", postsPerWeek: "5" },
];

export const REAL_ESTATE_PLAN_TERMS = {
  minimumMonths: 3,
  /** Metricool report cadence, in days (every 2 weeks). */
  reportEveryDays: 14,
  cancelNoticeDays: 30,
} as const;

// Arranque (Starter) on a WEEKLY subscription. Same service as the Arranque
// package — the client films, Esteban edits remotely — sold by videos per week.
// Owner-approved 2026-10-07 from the client proposal
// (~/code/esteban-propuesta/propuesta.html). Figures only; the words live in
// lib/arranque-weekly.ts.
//
// No reference/"was" price and no discount badge: a permanent public discount
// reads as a fake reference price. The owner confirmed on 2026-10-08 that
// Arranque is one video edit, so its $100 is per video, and the plain
// comparison (from $80 per video weekly vs $100 for a single video) is published.
export type ArranqueWeeklyOptionId = "one-per-week" | "two-per-week";

export type ArranqueWeeklyOption = {
  id: ArranqueWeeklyOptionId;
  videosPerWeek: number;
  /** USD per week, paid at the start of each week. */
  pricePerWeek: number;
  changesPerVideo: number;
};

export const ARRANQUE_WEEKLY_OPTIONS: ArranqueWeeklyOption[] = [
  { id: "one-per-week", videosPerWeek: 1, pricePerWeek: 85, changesPerVideo: 1 },
  { id: "two-per-week", videosPerWeek: 2, pricePerWeek: 160, changesPerVideo: 2 },
];

export const ARRANQUE_WEEKLY_TERMS = {
  maxVideoSeconds: 90,
  /** Footage per video. */
  maxFootageMinutes: 10,
  deliveryHoursMin: 48,
  deliveryHoursMax: 72,
} as const;

export function arranqueWeeklyPerVideo(option: ArranqueWeeklyOption): number {
  return option.pricePerWeek / option.videosPerWeek;
}

/** Lowest weekly price and lowest per-video figure, for "desde" lines. */
export const ARRANQUE_WEEKLY_FROM = {
  perWeek: Math.min(...ARRANQUE_WEEKLY_OPTIONS.map((o) => o.pricePerWeek)),
  perVideo: Math.min(...ARRANQUE_WEEKLY_OPTIONS.map(arranqueWeeklyPerVideo)),
} as const;
