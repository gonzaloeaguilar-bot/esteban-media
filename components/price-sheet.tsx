import Link from "next/link";

import { packagesFor, priceFor, type Locale } from "@/lib/packages";
import { packageRoutes } from "@/lib/package-routes";
import { usd } from "@/lib/pricing";
import { realEstatePlanName, realEstatePlans } from "@/lib/real-estate-plans";

/**
 * Prices, on demand — but still in the HTML.
 *
 * They used to sit as a four-card grid inside the chooser, with the monthly
 * real-estate plans a whole separate section three screens further down.
 * Owner, 2026-10-12: "the prices should show up after, in some modal or
 * sheet, cause the pages that come after are so long I get lost trying to
 * find pricing."
 *
 * WHY THIS IS A <details> AND NOT A CLIENT SHEET. The first build used the
 * kit's RailSheet, which mounts its contents when opened — and that would
 * have taken every price OUT of the server-rendered HTML. Two existing tests
 * guard against exactly that ("keeps starting prices visible", "visibly
 * together in the server HTML"), and the rule this site runs on is that
 * COLLAPSED IS NOT REMOVED, UNMOUNTED IS. A native <details> ships the whole
 * price list in the first byte, closed. Google weighs it fully and the AI
 * crawlers, which execute no JavaScript, can still read every figure.
 *
 * Every number is read from the SAME sources the pricing pages read —
 * lib/packages.ts and lib/pricing.ts — so this cannot drift. No price is
 * typed into this file.
 */
export function PriceSheet({
  locale,
  showPlans,
  section = "home_project_path",
}: {
  locale: Locale;
  /** The real-estate lane also gets its monthly plans. */
  showPlans: boolean;
  /**
   * data-section on the "Compare packages" CTA. Defaults to the home
   * chooser's original value so that call site's analytics are unchanged.
   * Callers outside the home chooser (a GEO service page, the short-form
   * page) MUST pass their own section so this fold's clicks aren't
   * miscategorized as home-page chooser activity.
   */
  section?: string;
}) {
  const es = locale === "es";
  const packages = packagesFor(locale);
  const plans = realEstatePlans();

  return (
    <details className="em-pricefold" data-em-hides-sticky>
      <summary>
        <span>{es ? "Ver precios de referencia" : "See starting prices"}</span>
        <span className="em-pricefold__chev" aria-hidden="true" />
      </summary>

      <div className="em-pricefold__body">
        {/* No "final pricing depends on scope" line here: the chooser already
            says it directly above the fold, and saying it twice in one block
            is the kind of duplicate this page keeps trimming. */}
        {showPlans ? (
          <>
            <h3 className="em-pricefold__h">
              {es ? "Planes mensuales" : "Monthly plans"}
            </h3>
            <ul className="em-pricefold__list">
              {plans.map((plan) => (
                <li key={plan.id}>
                  <span className="em-pricefold__name">
                    {realEstatePlanName(plan.id)}
                  </span>
                  <span className="em-pricefold__meta">
                    {plan.properties}{" "}
                    {es
                      ? plan.properties === 1
                        ? "propiedad"
                        : "propiedades"
                      : plan.properties === 1
                        ? "property"
                        : "properties"}
                  </span>
                  <span className="em-pricefold__price">
                    {usd(plan.price)}
                    <span>{es ? "/mes" : "/mo"}</span>
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : null}

        <h3 className="em-pricefold__h">{es ? "Por proyecto" : "By project"}</h3>
        <ul className="em-pricefold__list">
          {packages.map((pkg) => {
            const price = priceFor(pkg.id);
            return (
              <li key={pkg.id}>
                <Link href={packageRoutes[pkg.id][locale]} className="em-pricefold__row">
                  <span className="em-pricefold__name">{pkg.name}</span>
                  <span className="em-pricefold__meta">{pkg.subtitle}</span>
                  <span className="em-pricefold__price">
                    {price.kind === "custom"
                      ? es
                        ? "A cotizar"
                        : "Custom quote"
                      : `${es ? "Desde" : "From"} ${usd(price.amount)}`}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href={es ? "/es/precios" : "/pricing"}
          data-cta="price_fold_compare"
          data-section={section}
          className="em-pricefold__cta"
        >
          {es ? "Comparar paquetes" : "Compare packages"}
        </Link>
      </div>
    </details>
  );
}
