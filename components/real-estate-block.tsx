import { KeepReading } from "@/components/keep-reading";
import { RealEstatePlansSection } from "@/components/real-estate-plans-section";
import { RealEstateReels } from "@/components/real-estate-reels";
import type { Locale } from "@/lib/packages";

/**
 * The homepage real-estate block: the reel shelf, then the monthly plans
 * behind one button, so the work and what it costs read as ONE block instead
 * of two sections a dozen screens apart.
 *
 * The plans sit inside the site's one fold-out (KeepReading, a <details>), so
 * collapsed is not removed: every price, term and link stays in the server
 * HTML for crawlers and answer engines. The plans keep their own anchors
 * (#real-estate-plans / #real-estate); the layouts' anchors script opens the
 * fold before landing on them, on load, on hashchange and on in-page clicks.
 *
 * Pages that render PackagesSection with its plans (the pricing pages) must
 * not render this block too, or the plans would appear twice.
 */
export function RealEstateBlock({ locale }: { locale: Locale }) {
  const es = locale === "es";
  return (
    <div className="em-re-block" data-section="real_estate_block">
      <RealEstateReels locale={locale} />
      <KeepReading
        id={es ? "planes-de-bienes-raices" : "real-estate-plans-fold"}
        cta="real_estate_plans_expand"
        className="em-re-plans-fold"
        title={es ? "Ver planes de bienes raíces" : "See real estate plans"}
        destinations={
          es
            ? "Planes mensuales para agentes e inmobiliarias: qué incluye cada uno y cuánto cuesta."
            : "Monthly plans for agents and brokerages: what each one includes and what it costs."
        }
      >
        <RealEstatePlansSection locale={locale} />
      </KeepReading>
    </div>
  );
}
