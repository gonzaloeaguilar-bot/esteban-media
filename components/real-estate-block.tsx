import { RealEstatePlansSection } from "@/components/real-estate-plans-section";
import { RealEstateReels } from "@/components/real-estate-reels";
import type { Locale } from "@/lib/packages";

/**
 * The homepage real-estate block: the reel shelf followed immediately by the
 * monthly plans. Both stay visible because visitors use the work and the price
 * together to decide whether to contact Esteban.
 *
 * Pages that render PackagesSection with its plans (the pricing pages) must
 * not render this block too, or the plans would appear twice.
 */
export function RealEstateBlock({ locale }: { locale: Locale }) {
  return (
    <div className="em-re-block" data-section="real_estate_block">
      <RealEstateReels locale={locale} featuredCount={3} />
      <RealEstatePlansSection locale={locale} />
    </div>
  );
}
