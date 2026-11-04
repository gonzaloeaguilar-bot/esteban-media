import {
  ARRANQUE_WEEKLY_OPTIONS,
  PACKAGE_PRICES,
  PRICING_BANDS,
  REAL_ESTATE_PLANS,
  SHORT_FORM,
  arranqueWeeklyPerVideo,
  usd,
} from "@/lib/pricing";

export const REELS_PRICE_INDEX_CHECKED_ON = "2026-11-03";

export type PriceIndexLocale = "en" | "es";

export type MarketPriceRow = {
  provider: string;
  service: string;
  price: string;
  unit: string;
  tier: "VERIFIED" | "UNVERIFIED" | "NO PUBLIC PRICE";
  href: string;
  checkedOn: string;
};

/**
 * Source-backed observations transcribed from .ai/price-index-sources.md.
 * Keep the source URL and fetch date on every row: summary copy is not a
 * substitute for the underlying observation.
 */
export const marketPriceRows: readonly MarketPriceRow[] = [
  ["Mark Studios", "Starter: 1 long video, 4 Shorts and 2 thumbnails", "$750", "per month", "VERIFIED", "https://www.markstudios.com/pricing"],
  ["Mark Studios", "Growth / Scale / Unlimited monthly plans", "$2,000 / $2,700 / $3,500", "per month", "VERIFIED", "https://www.markstudios.com/pricing"],
  ["Robbie Santana", "Starter social edit up to 60 seconds, captions and one revision", "$300", "per project", "VERIFIED", "https://robbiesantana.com/"],
  ["Robbie Santana", "Professional corporate or commercial edit up to 3 minutes", "$800", "per project", "VERIFIED", "https://robbiesantana.com/"],
  ["Inside Editors", "Vertical short-form edit, up to 2 minutes", "$20 single; $16 (5+); $14 (10+ weekly)", "per video", "VERIFIED", "https://insideeditors.com/video-editing-pricing/"],
  ["Inside Editors", "Short-form/social subscriptions; $200 entry is channel management, not a Reels plan", "$200 / $500 / $1,000", "per month", "VERIFIED", "https://insideeditors.com/video-editing-pricing/"],
  ["Increditors", "Reels Pricing monthly package", "From $2.5K", "per month", "VERIFIED", "https://increditors.com/"],
  ["ZipIn Media", "Up to 1 minute, 2-hour production, single camera, interview style", "$2,200", "per package", "VERIFIED", "https://zipinmedia.com/"],
  ["ZipIn Media", "FAQ starting rate for 45 seconds with 2-hour production; conflicts with its $2,200 card", "$1,800 FAQ vs $2,200 card", "per package", "VERIFIED", "https://zipinmedia.com/"],
  ["ZipIn Media", "Corporate videographer guide: solo, crew, half day and full day ranges", "$75–$450", "per hour", "VERIFIED", "https://zipinmedia.com/corporate-videography-how-much-per-hour/"],
  ["FLF Corporate", "Monthly creative and growth retainer", "From $990", "per month", "VERIFIED", "https://flfcorporate.com/en/corporate-video-production-miami/"],
  ["FLF Corporate", "Production sprint / flagship film", "From $2,000 / $5,000–$15,000", "per project", "VERIFIED", "https://flfcorporate.com/en/corporate-video-production-miami/"],
  ["Ball Media Innovations", "Corporate video / editing / real estate / interview", "$1,200 / $250 / $750", "from, per project", "VERIFIED", "https://www.ballmediainnovations.com/our-pricing/"],
  ["Bono Motion", "Typical professional video project", "$3,500–$15,000+", "per project", "VERIFIED", "https://bonomotion.com/"],
  ["Shorts Creation", "Done-for-you short-form tiers", "No public price", "per month", "NO PUBLIC PRICE", "https://shortscreation.com/"],
  ["Opticvault Marketing", "Marketing retainer; no comparable editing price", "No public editing price", "n/a", "NO PUBLIC PRICE", "https://opticvaultmarketing.com/pricing/"],
  ["Upwork", "Short-form video editor category", "$75 single edit; $10–$60/hour", "per video / hour", "UNVERIFIED", "https://www.upwork.com/hire/short-form-video-editors/"],
  ["Fiverr", "Instagram Reels editor listings", "$10–$100 starting", "per gig / minute", "UNVERIFIED", "https://www.fiverr.com/search/gigs?query=instagram%20reels%20editor"],
  ["Thumbtack", "Miami/Fort Lauderdale videographer listings; no public Reels edit rate", "No public Reels price", "per event", "UNVERIFIED", "https://www.thumbtack.com/fl/miami/videographers"],
  ["Opus Clip", "AI clipping Starter / Pro", "$15 / $29", "per month", "VERIFIED", "https://www.opus.pro/pricing"],
  ["Kapwing", "Pro / Business on annual toggle", "$16 / $50", "per month", "VERIFIED", "https://www.kapwing.com/pricing"],
].map(([provider, service, price, unit, tier, href]) => ({ provider, service, price, unit, tier: tier as MarketPriceRow["tier"], href, checkedOn: REELS_PRICE_INDEX_CHECKED_ON }));

const packageAmount = (id: keyof typeof PACKAGE_PRICES) => {
  const price = PACKAGE_PRICES[id];
  if (price.kind !== "from") throw new Error(`Price index requires a published price for ${id}`);
  return price.amount;
};

export function estebanPriceRows(locale: PriceIndexLocale) {
  const es = locale === "es";
  const monthly = es ? "al mes" : "per month";
  const perVideo = es ? "por video" : "per video";
  return [
    { item: es ? "Edición Arranque" : "Starter editing", price: `From ${usd(packageAmount("arranque"))}`, unit: perVideo },
    ...ARRANQUE_WEEKLY_OPTIONS.map((option) => ({
      item: es ? `Edición semanal: ${option.videosPerWeek} video${option.videosPerWeek === 1 ? "" : "s"}` : `Weekly editing: ${option.videosPerWeek} video${option.videosPerWeek === 1 ? "" : "s"}`,
      price: `${usd(option.pricePerWeek)} (${usd(arranqueWeeklyPerVideo(option))} ${perVideo})`,
      unit: es ? "por semana" : "per week",
    })),
    { item: es ? "Crecimiento" : "Growth", price: `From ${usd(packageAmount("crecimiento"))}`, unit: monthly },
    { item: es ? "Presencia Local" : "Local Presence", price: `From ${usd(packageAmount("presencia-local"))}`, unit: monthly },
    ...REAL_ESTATE_PLANS.map((plan) => ({ item: es ? `Plan inmobiliario: ${plan.id}` : `Real-estate plan: ${plan.id}`, price: usd(plan.price), unit: monthly })),
    { item: es ? "Banda mínima de grabación en locación" : "On-location filming band minimum", price: usd(PRICING_BANDS["on-location"].baseMin), unit: es ? "por media jornada" : "per half day" },
  ];
}

export function priceIndexAnswer(locale: PriceIndexLocale) {
  const localLow = usd(300);
  const localHigh = usd(4600);
  const own = usd(SHORT_FORM.perVideoFrom);
  return locale === "es"
    ? `Las páginas locales verificadas de esta tabla muestran desde ${localLow} por una edición corta hasta ${localHigh} por un paquete de producción; la edición Arranque de Esteban empieza en ${own} por video y se cotiza según el alcance.`
    : `Verified local pages in this table run from ${localLow} for a short edit to ${localHigh} for a production package; Esteban’s Starter editing begins at ${own} per video and is scoped by project.`;
}
