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

// Short-form social is NOT a band any more: it is priced like Starter (see
// SHORT_FORM below), because a $350-675 "single video" band contradicted the
// owner-confirmed Starter ($100 per video) on the same site (2026-10-08).
export type PricingBandId =
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
  crecimiento: { kind: "from", amount: 800, unit: "month" },
  "presencia-local": { kind: "from", amount: 1600, unit: "month" },
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
  { id: "essential", price: 600, properties: 1, productionDays: 2, drone: "add-on", postsPerWeek: "2" },
  { id: "plus", price: 950, properties: 2, productionDays: 3, drone: "add-on", postsPerWeek: "3–4" },
  { id: "premium", price: 1500, properties: 3, productionDays: 3, drone: "included", postsPerWeek: "5" },
];

/** Drone photography add-on on the smaller real estate plans (catalog 2026: +$99). */
export const REAL_ESTATE_DRONE_PHOTO_ADD_ON = 99;

/** Real estate listing media (catalog 2026): photo tiers by home size, add-ons and fees. */
export const REAL_ESTATE_MEDIA_PRICES = {
  photoTiers: [199, 249, 299, 399, 499],
  zillow3dTourFrom: 149,
  premiumListingVideoPerMinute: 200,
  outOfAreaFee: 75,
  reshootFee: 100,
} as const;

export const REAL_ESTATE_PLAN_TERMS = {
  minimumMonths: 3,
  /** Metricool report cadence, in days (every 2 weeks). */
  reportEveryDays: 14,
  cancelNoticeDays: 30,
} as const;

// Owner, in session, 2026-10-13, verbatim: "a week min for turn around."
// Scoped to editing (Arranque/per-video) only — the owner answered the
// per-video question, not the monthly real-estate plan or the business
// production-day lane, so no entry exists for those here. Worded as a FLOOR,
// never a promised delivery date: see turnaroundFor() below and its callers.
export type TurnaroundId = "arranque";

export const TURNAROUND: Record<TurnaroundId, { minimumDays: number }> = {
  arranque: { minimumDays: 7 },
} as const;

/**
 * Reads the floor, never lets a caller type "one week" by hand. Mirrors
 * priceFor()'s shape: one function, one source, so the UI cannot drift from
 * the owner's actual answer.
 */
export function turnaroundFor(id: TurnaroundId): { minimumDays: number } {
  return TURNAROUND[id];
}

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
  /** Owner-approved 2026-10-08: weekly payment, 4-week minimum, then cancel any week. */
  minimumWeeks: 4,
} as const;

export function arranqueWeeklyPerVideo(option: ArranqueWeeklyOption): number {
  return option.pricePerWeek / option.videosPerWeek;
}

/** Lowest weekly price and lowest per-video figure, for "desde" lines. */
export const ARRANQUE_WEEKLY_FROM = {
  perWeek: Math.min(...ARRANQUE_WEEKLY_OPTIONS.map((o) => o.pricePerWeek)),
  perVideo: Math.min(...ARRANQUE_WEEKLY_OPTIONS.map(arranqueWeeklyPerVideo)),
} as const;

// Short-form / social video, priced the way Starter is sold (owner, 2026-10-08:
// "Starter is really just 1 video edit"). One price model for the package
// card, the calculator and every guide that quotes the calculator:
//   - once: from $100 per video (PACKAGE_PRICES.arranque);
//   - every week: $85 for 1 video, $160 for 2 (ARRANQUE_WEEKLY_OPTIONS);
//   - a 5-video pack is 5 single videos, with no invented discount.
// The 15- and 30-video monthly calculator options are not offered for
// short-form: no owner-set price exists for that volume, and deriving one
// would publish a commitment nobody made. They remain for the other bands.
// Market context ($100-500 per short-form video) is unchanged.
const ARRANQUE_PRICE = PACKAGE_PRICES.arranque;

export const SHORT_FORM = {
  perVideoFrom: ARRANQUE_PRICE.kind === "from" ? ARRANQUE_PRICE.amount : 0,
  packOf: 5,
  weekly: ARRANQUE_WEEKLY_OPTIONS,
  marketMin: 100,
  marketMax: 500,
  source: "market $100-500 per short-form video",
} as const;

/** "$85 a week for 1 video or $160 a week for 2 videos". */
export function shortFormWeeklyText(locale: "en" | "es"): string {
  const [one, two] = SHORT_FORM.weekly;
  return locale === "es"
    ? `${usd(one.pricePerWeek)} por semana por ${one.videosPerWeek} video o ${usd(two.pricePerWeek)} por semana por ${two.videosPerWeek} videos`
    : `${usd(one.pricePerWeek)} a week for ${one.videosPerWeek} video or ${usd(two.pricePerWeek)} a week for ${two.videosPerWeek} videos`;
}

/** "from $100 per video, or $85 a week for 1 video and $160 a week for 2 videos". */
export function shortFormPriceText(locale: "en" | "es"): string {
  const [one, two] = SHORT_FORM.weekly;
  const from = usd(SHORT_FORM.perVideoFrom);
  return locale === "es"
    ? `desde ${from} por video, o ${usd(one.pricePerWeek)} por semana por ${one.videosPerWeek} video y ${usd(two.pricePerWeek)} por semana por ${two.videosPerWeek} videos`
    : `from ${from} per video, or ${usd(one.pricePerWeek)} a week for ${one.videosPerWeek} video and ${usd(two.pricePerWeek)} a week for ${two.videosPerWeek} videos`;
}

// Restaurant promo video (owner decision, re-confirmed 2026-10-13:
// "$240 +"). A scoped promo edit for a restaurant, bar or café from the
// venue's footage; every project still gets a written quote. This is the one
// place the figure lives: the restaurant pages and their cost answers read it.
export const RESTAURANT_PROMO = {
  from: 240,
  unit: "project",
  source: "owner decision 2026-10-13: restaurant promo video $240 and up",
} as const;

// Product photography SESSION floor (owner-authorized 2026-08-28, docs/pricing-basis.md:
// "Product photography session | $280"; published as "Desde $280 por sesión").
// A real shoot with the product in front of the camera. AI-assisted images made
// from supplied photos are a different service and have no published floor.
export const PRODUCT_PHOTO_SESSION = {
  from: 350,
  unit: "session",
  source: "owner-authorized $280 2026-08-28 (docs/pricing-basis.md); raised to $350 in the 2026-10-28 market review (Squareshot Miami minimum order $300)",
} as const;

// On-location raw video capture (no editing): market $300-1,000 half-day,
// starting floor from PRICING_BANDS["on-location"].baseMin ($400: the accessible recording-only option, owner 2026-10-28).
export const ON_LOCATION_CAPTURE = {
  from: PRICING_BANDS["on-location"].baseMin,
  unit: "half-day",
  source: "PRICING_BANDS on-location baseMin ($400 half-day)",
} as const;


// Filming (on-location recording) hourly floor. Owner fact confirmed 2026-10-18:
// filming from $100 per hour with a 4-hour minimum ($400 floor): owner decision 2026-10-28 to keep an accessible recording-only option even though the market review put the pro band at $100–250/h.
// Copy reads it through filmingHourlyText(); never hard-code the figure.
export const FILMING_HOURLY = {
  amount: 100,
  currency: "USD",
  unit: "hour",
  isMinimum: true,
  minimumHours: 4,
  minimumAmount: 400,
  source: "owner fact confirmed 2026-10-28: filming from $100 per hour with 4-hour minimum call",
} as const;

/** "from $100 per hour of filming" / "desde $100 por hora de grabación". */
export function filmingHourlyText(locale: "en" | "es"): string {
  const price = usd(FILMING_HOURLY.amount);
  return locale === "es"
    ? `desde ${price} por hora de grabación`
    : `from ${price} per hour of filming`;
}

// ---------------------------------------------------------------------------
// On-site crew, multi-camera, yacht and turnkey catalog (2026-10-18)
// ---------------------------------------------------------------------------

/**
 * Owner decision 2026-10-28: every published figure is a STARTING point and
 * the final quote is always open to conversation. Render this line wherever a
 * price list ends (pricing page, home route cards, the catalog PDF).
 */
export const PRICE_TERMS = {
  en: "Every price is a starting point: the final quote follows your scope, and we can always talk it through.",
  es: "Todos los precios son puntos de partida: la cotización final sigue tu alcance y siempre podemos conversarla.",
} as const;
export function priceTermsText(locale: "en" | "es"): string {
  return PRICE_TERMS[locale];
}

export const CREW_RECORDING_RATES = {
  solo: {
    hourly: 100,
    minimumHours: 4,
    minimumAmount: 400,
    halfDay: 400,
    fullDay: 800,
    description: "1 solo videographer + Sony Alpha 7 IV 4K kit + audio",
  },
  twoPerson: {
    hourly: 200,
    minimumHours: 4,
    minimumAmount: 800,
    halfDay: 800,
    fullDay: 1600,
    description: "2-person event crew: Lead 4K DP + dedicated mobile content creator with dual iPhones for vertical Reels, BTS & attendee soundbites",
  },
  multiCamera: {
    hourly: 225,
    minimumHours: 4,
    minimumAmount: 900,
    halfDay: 900,
    fullDay: 1800,
    description: "2–3 cameras (Sony + secondary angles) + soundboard XLR feed & multi-track lavalier audio",
  },
} as const;

export const YACHT_PRODUCTION = {
  halfDaySolo: 750,
  fullDaySolo: 1400,
  halfDayTwoPerson: 1200,
  fullDayTwoPerson: 2200,
  marineDroneAddOn: 250,
  unit: "session",
  source: "South Florida marine videography rate card (Biscayne Bay / Fort Lauderdale charter shoots)",
} as const;

export const COMMERCIAL_VIDEO_TIERS = {
  basic: {
    from: 1500,
    duration: "60–90 seconds",
    crew: "Solo videographer",
    scope: "Founder-led product demo on client location",
    revisions: 1,
  },
  brandNarrative: {
    from: 3500,
    duration: "60–120 seconds",
    crew: "2-person production crew",
    scope: "Cinematic brand film with 3 social ad hook variations",
    revisions: 2,
  },
  actorsAndStudio: {
    fromMin: 8500,
    fromMax: 12000,
    duration: "30–60s hero commercial + multi-format cutdowns",
    crew: "3 to 4 person commercial crew",
    scope: "Studio soundstage rental, actor casting (1-2 actors + commercial buyout), HMUA stylist, custom sound mix",
    revisions: 2,
  },
} as const;

export const KICKSTARTER_LAUNCH = {
  from: COMMERCIAL_VIDEO_TIERS.basic.from,
  unit: "project",
  shootHours: 3.5,
  videoLength: "60–90 seconds",
  source: "3-tier commercial production, 2026-10-28 market review: basic demo, brand narrative, actors and studio (see COMMERCIAL_VIDEO_TIERS)",
} as const;

/** The one answer-first price line for commercial videos, EN or ES. */
export function commercialVideoPriceText(locale: "en" | "es"): string {
  const basic = usd(COMMERCIAL_VIDEO_TIERS.basic.from);
  const narrative = usd(COMMERCIAL_VIDEO_TIERS.brandNarrative.from);
  const actorsMin = usd(COMMERCIAL_VIDEO_TIERS.actorsAndStudio.fromMin);
  const actorsMax = usd(COMMERCIAL_VIDEO_TIERS.actorsAndStudio.fromMax);
  return locale === "es"
    ? `Videos comerciales y de producto desde ${basic} para demos básicos en locación del cliente (60–90 seg); producciones premium con narrativa de marca desde ${narrative} (hasta 2 minutos); y comerciales publicitarios con actores profesionales y renta de estudio desde ${actorsMin} a ${actorsMax}+ según requerimientos de casting y derechos comerciales.`
    : `Commercial and product videos start from ${basic} for basic founder-led product demos (60–90 seconds on client location); premium brand films with 2-person crew and ad hooks start from ${narrative} (up to 2 minutes); and commercial spots with professional actors and studio rental start from ${actorsMin} to ${actorsMax}+ depending on casting and usage rights.`;
}

export const ON_SITE_ADD_ONS = {
  soundboardAudio: 150,
  marineDrone: 250,
  mobileTeleprompter: 100,
  rapidSsdDelivery: 120,
} as const;

export const TURNKEY_PRODUCTION_BUNDLES = {
  soloHalfDay: 950,
  soloFullDay: 2000,
  twoPersonHalfDay: 1600,
  twoPersonFullDay: 3000,
  multiCamHalfDay: 1750,
  multiCamFullDay: 3600,
  yachtHalfDay: 1800,
  yachtFullDay: 3200,
  kickstarterLaunch: 1500,
} as const;

/**
 * Private celebrations are finished storytelling projects, not hourly camera
 * rentals. These price floors cover consultation, coverage and a finished
 * highlight film; scope, travel and any requested additional deliverables are
 * confirmed in writing before booking.
 * Owner positioning decision 2026-10-28: personalized, craft-led work must
 * sit in the competitive South Florida finished-event market, not below it.
 */
export const CELEBRATION_FILM_BUNDLES = {
  halfDay: 1200,
  fullDay: 2800,
  twoPersonFullDay: 4000,
  // Yacht celebrations use the published turnkey yacht rate card (half-day
  // minimum; full day includes licensed marine drone tracking). Same numbers
  // the FAQ answer in lib/owner-fact-answers.ts already states publicly.
  yachtHalfDay: TURNKEY_PRODUCTION_BUNDLES.yachtHalfDay,
  yachtFullDay: TURNKEY_PRODUCTION_BUNDLES.yachtFullDay,
} as const;

/**
 * Landing pages. Owner fact 2026-10-14 (relayed by the project operator; vault
 * client-esteban-media/wiki/esteban-owner-facts-2026-10-14): a basic landing
 * page starts at $1,500; larger custom builds run $7,000 and up. Applies to
 * landing pages only. Full websites and chatbots have NO published price and
 * stay "custom quote" until Esteban gives one. Change the numbers here only.
 */
export const LANDING_PAGE_PRICE = {
  from: 1500,
  typicalUpper: 7000,
  currency: "USD",
  source: "owner fact 2026-10-14 (relayed by the project operator): basic landing page from $1,500; larger custom builds $7,000+",
} as const;

/** The one answer-first price line for landing pages, EN or ES. */
export function landingPagePriceText(locale: "en" | "es"): string {
  const from = usd(LANDING_PAGE_PRICE.from);
  const upper = usd(LANDING_PAGE_PRICE.typicalUpper);
  return locale === "es"
    ? `Una landing page básica empieza en ${from}; las páginas a la medida más grandes suelen costar ${upper} o más, según las páginas, los textos y las integraciones.`
    : `A basic landing page starts at ${from}; larger custom builds usually run ${upper} or more depending on pages, copy and integrations.`;
}

/**
 * AI chatbots. Owner fact 2026-10-14 (relayed by the project operator; vault
 * client-esteban-media/wiki/esteban-owner-facts-2026-10-14): from $2,000 to set
 * up, plus a monthly fee. The monthly amount was NOT given: never print a
 * number for it, only "plus a monthly fee".
 */
export const CHATBOT_PRICE = {
  from: 2000,
  currency: "USD",
  monthlyFee: true,
  source: "owner fact 2026-10-14 (relayed by the project operator): AI chatbots from $2,000 setup plus a monthly fee (amount not given)",
} as const;

/** The one answer-first price line for chatbots, EN or ES. */
export function chatbotPriceText(locale: "en" | "es"): string {
  const from = usd(CHATBOT_PRICE.from);
  return locale === "es"
    ? `Un chatbot con IA empieza en ${from} de configuración, más una cuota mensual.`
    : `An AI chatbot starts at ${from} to set up, plus a monthly fee.`;
}
