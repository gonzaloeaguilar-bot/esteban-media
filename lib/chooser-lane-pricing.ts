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
import { cheapestRealEstatePlan, priceFor, type Locale } from "@/lib/packages";
import { usd } from "@/lib/pricing";

export type ChooserLaneId = "real-estate" | "local-business" | "agency";

export type LanePriceLine = {
  /** "From $450/mo" / "Desde $450/mes" */
  price: string;
};

export function laneStartingPrice(locale: Locale, laneId: ChooserLaneId): string {
  const es = locale === "es";
  const from = es ? "Desde" : "From";
  if (laneId === "real-estate") {
    const plan = cheapestRealEstatePlan();
    return `${from} ${usd(plan.price)}${es ? "/mes" : "/mo"}`;
  }
  if (laneId === "local-business") {
    const price = priceFor("presencia-local");
    const amount = price.kind === "from" ? price.amount : 0;
    return `${from} ${usd(amount)}${es ? "/día de producción" : "/production day"}`;
  }
  // agency / "editing only" tab: edit footage the client already shot — the
  // same offer as the Starter/Arranque package.
  const price = priceFor("arranque");
  const amount = price.kind === "from" ? price.amount : 0;
  return `${from} ${usd(amount)}${es ? "/video" : "/video"}`;
}
