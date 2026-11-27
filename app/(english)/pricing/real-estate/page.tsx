import { OwnerPageFaqs } from "@/components/owner-page-faqs";
import { buildServiceFaqSchema } from "@/components/service-depth";
import { ownerPageFaqs } from "@/lib/owner-page-faqs";
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
      <OwnerPageFaqs path={PATH} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      {/* The page had no FAQ until the owner-page FAQs; its FAQPage carries exactly those visible questions. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", ...buildServiceFaqSchema(absoluteUrl(PATH), ownerPageFaqs(PATH)) }) }}
      />
    </>
  );
}

export const dynamic = "force-static";
