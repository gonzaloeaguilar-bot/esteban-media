// The three chooser lanes have THREE DIFFERENT price shapes, and flattening
// them into one "From $X" would misstate the offer:
//   - real estate sells a monthly plan (lib/pricing.ts REAL_ESTATE_PLANS)
//   - a production day at the client's business (lib/pricing.ts
//     PACKAGE_PRICES["presencia-local"])
//   - editing-only work sells per video (lib/pricing.ts
//     PACKAGE_PRICES["arranque"])
//
// Every figure here is READ from the existing pricing/packages sources, never
// re-typed, so the chooser's price fold and this disclosure can never drift
// from /pricing or the package pages.
import { cheapestRealEstatePlan, packagesFor, priceFor, type Locale } from "@/lib/packages";
import { usd, type PackageId } from "@/lib/pricing";
import { realEstatePlanName } from "@/lib/real-estate-plans";

export type ChooserLaneId = "real-estate" | "local-business" | "agency";

export type LanePriceLine = {
  /** "From $450/mo" / "Desde $450/mes" */
  price: string;
};

/** One priced package a lane sells, named exactly as /pricing names it. */
export type LaneOffer = {
  /** "Starter", "Growth", "Local Presence", "Essential"... */
  name: string;
  /** "From $100/video" */
  price: string;
  /** What it includes, in the words /pricing already uses. */
  includes: string;
  /** Package page (or the real estate plans anchor) this offer lives on. */
  href: string;
};

const UNIT: Record<Locale, Record<"video" | "month" | "production-day", string>> = {
  en: { video: "/video", month: "/mo", "production-day": "/production day" },
  es: { video: "/video", month: "/mes", "production-day": "/día de producción" },
};

const EN_SLUG: Record<PackageId, string> = {
  arranque: "starter",
  crecimiento: "growth",
  "presencia-local": "local-presence",
  "todo-incluido": "all-in",
};

function packageOffer(locale: Locale, id: PackageId): LaneOffer {
  const pkg = packagesFor(locale).find((p) => p.id === id)!;
  const price = priceFor(id);
  const from = locale === "es" ? "Desde" : "From";
  const amount = price.kind === "from" ? `${from} ${usd(price.amount)}${UNIT[locale][price.unit]}` : "";
  return {
    name: pkg.name,
    price: amount,
    includes: pkg.includes.join(" · "),
    href: `${locale === "es" ? "/es/precios" : "/pricing"}/${locale === "es" ? id : EN_SLUG[id]}`,
  };
}

/**
 * The packages each lane actually sells, with the names and figures /pricing
 * uses. The business lane sells two things that bill differently (a monthly
 * plan and a production day), and a restaurant owner has to see both.
 */
export function laneOffers(locale: Locale, laneId: ChooserLaneId): LaneOffer[] {
  const es = locale === "es";
  if (laneId === "real-estate") {
    const plan = cheapestRealEstatePlan();
    const from = es ? "Desde" : "From";
    return [
      {
        name: realEstatePlanName(plan.id),
        price: `${from} ${usd(plan.price)}${UNIT[locale].month}`,
        includes: es
          ? `${plan.properties} propiedad y ${plan.productionDays} días de producción al mes · ${plan.postsPerWeek} posts o reels por semana`
          : `${plan.properties} property and ${plan.productionDays} production days a month · ${plan.postsPerWeek} posts or reels a week`,
        href: es ? "/es/precios#real-estate" : "/pricing#real-estate-plans",
      },
    ];
  }
  if (laneId === "local-business") return [packageOffer(locale, "crecimiento"), packageOffer(locale, "presencia-local")];
  return [packageOffer(locale, "arranque")];
}

/** One short line for the chip: it must never wrap. */
export function laneStartingPrice(locale: Locale, laneId: ChooserLaneId): string {
  return laneOffers(locale, laneId)[0].price;
}

/** The funnel header: package name plus price, joined when a lane sells two. */
export function laneFunnelPrice(locale: Locale, laneId: ChooserLaneId): string {
  return laneOffers(locale, laneId)
    .map((o) => `${o.name} ${o.price.charAt(0).toLowerCase()}${o.price.slice(1)}`)
    .join(" · ");
}
