import { RealEstatePricing, realEstateDirectAnswer } from "@/components/real-estate-pricing";
import { entityIds } from "@/lib/entity-schema";
import { realEstateJsonLd } from "@/lib/real-estate-schema";
import { absoluteUrl } from "@/lib/site";
import { buildPageMetadata } from "@/lib/site-metadata";

const PATH = "/pricing/real-estate";

export const metadata = buildPageMetadata({
  title: "Real Estate Photography Pricing — Fort Lauderdale & Miami",
  description:
    "What listing photography costs in South Florida, priced by home size, plus drone, Zillow 3D tour and premium listing video. Published rates, not an estimate.",
  path: PATH,
  locale: "en",
});

export default function Page() {
  const ld = realEstateJsonLd("en", absoluteUrl(PATH), entityIds.business);
  return (
    <>
      <RealEstatePricing locale="en" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}

export const dynamic = "force-static";
