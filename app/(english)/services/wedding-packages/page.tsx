import { buildServicePageNodes } from "@/components/service-depth";
import {
  WEDDING_PACKAGES_PATH,
  WeddingPackagesPage,
  weddingPackagesNodeArgs,
} from "@/components/wedding-packages-page";
import { WEDDING_PACKAGES } from "@/lib/pricing";
import { buildPageMetadata } from "@/lib/site-metadata";

const floor = `$${Math.min(WEDDING_PACKAGES.halfDayFrom, WEDDING_PACKAGES.contentCreationFrom, WEDDING_PACKAGES.fullDayFrom).toLocaleString("en-US")}`;

export const metadata = buildPageMetadata({
  title: "Wedding Packages: Miami, Fort Lauderdale and Palm Beach",
  description: `Wedding video packages from ${floor}: Half Day, Full Day and wedding content creation across Miami, Fort Lauderdale and Palm Beach. ${WEDDING_PACKAGES.depositPercent}% deposit holds your date.`,
  path: WEDDING_PACKAGES_PATH.en,
  locale: "en",
});

export default function Page() {
  return (
    <WeddingPackagesPage
      locale="en"
      nodes={buildServicePageNodes(weddingPackagesNodeArgs("en"))}
    />
  );
}
