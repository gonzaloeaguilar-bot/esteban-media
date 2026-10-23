import { RealEstatePlansSection } from "@/components/real-estate-plans-section";
import { RealEstateReels } from "@/components/real-estate-reels";
import type { Locale } from "@/lib/packages";

/**
 * The real-estate block: the work first, the price second, both near the top.
 *
 * Both halves already existed and both were fine on their own. What was wrong
 * was the order and the place.
 *
 * The property-reel shelf — the only part of the page a visitor can judge in
 * three seconds — sat below the packages track, the monthly plans, the
 * a-la-carte grid, the three steps and the FAQ, i.e. in the bottom third of a
 * long page. The monthly plans, the half that asks for a monthly commitment,
 * sat ABOVE all of that, inside the packages section. So the visitor arrived
 * to see the work and was shown a price for work they had not seen yet.
 *
 * The audience router's first lane is real estate, so the visitor who picks
 * that lane now gets the shelf immediately: see the work, then what it costs.
 * A price is only ever shown after the work that justifies it.
 *
 * Neither half was rewritten. They are stacked in one block so the seam
 * between them is a single divider instead of the shelf's hairline sitting on
 * top of the plans' own rule, and so the pair carries one tracking section
 * ("real_estate_showcase") that can be read as one unit in GA4 rather than as
 * two unrelated sections in two different parts of the funnel.
 *
 * The reels stay cheap here: posters lazy-load, the MP4s are still mounted
 * only when a card is opened or hovered. Moving the shelf up the page does
 * not move a single byte of video into the initial load.
 */
export function RealEstateShowcase({
  locale,
  className = "",
}: {
  locale: Locale;
  className?: string;
}) {
  return (
    <div
      className={`em-re-showcase ${className}`}
      data-section="real_estate_showcase"
    >
      {/* The shelf keeps its own <section> and heading; the plans section keeps
          its own as well. One wrapper, two self-contained halves. */}
      <RealEstateReels locale={locale} className="em-re-showcase__work" />
      <RealEstatePlansSection locale={locale} />
    </div>
  );
}
