import { RealEstateReels } from "@/components/real-estate-reels";
import type { Locale } from "@/lib/packages";

/**
 * The homepage real-estate block: the reel shelf.
 *
 * The monthly plans used to sit under it, which put a second price block three
 * screens below the first one. Owner, 2026-10-12: "the pages that come after
 * are so long I get lost trying to find pricing." They now live in the price
 * sheet that the chooser opens — same figures, same source, one place to look.
 * The pricing PAGES still render them in full through PackagesSection.
 */
export function RealEstateBlock({ locale }: { locale: Locale }) {
  return (
    <div className="em-re-block" data-section="real_estate_block">
      <RealEstateReels locale={locale} />
    </div>
  );
}
