import {
  buildSpanishNicheMetadata,
  SpanishNichePage,
} from "@/components/spanish-niche-page";
import { FoodCreatorChoice } from "@/components/food-creator-choice";
import { ClientReviews } from "@/components/client-reviews";
import { CaseStudyRail } from "@/components/case-study-rail";

const slug = "editor-de-reels-fort-lauderdale";

export const metadata = buildSpanishNicheMetadata(slug);

export default function Page() {
  return (
    <>
      <SpanishNichePage
        slug={slug}
        showcase={
          <>
            <FoodCreatorChoice locale="es" sourcePage="fort-lauderdale-reels" />
            <CaseStudyRail ids={["ai-edit-prep-reel"]} locale="es" source="reels_ftl_service_case_es" />
          </>
        }
      />
      <ClientReviews locale="es" />
    </>
  );
}
