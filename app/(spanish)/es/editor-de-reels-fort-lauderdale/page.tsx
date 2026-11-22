import {
  buildSpanishNicheMetadata,
  SpanishNichePage,
} from "@/components/spanish-niche-page";
import { FoodCreatorChoice } from "@/components/food-creator-choice";
import { ClientReviews } from "@/components/client-reviews";

const slug = "editor-de-reels-fort-lauderdale";

export const metadata = buildSpanishNicheMetadata(slug);

export default function Page() {
  return (
    <>
      <SpanishNichePage
        slug={slug}
        showcase={<FoodCreatorChoice locale="es" sourcePage="fort-lauderdale-reels" />}
      />
      <ClientReviews locale="es" />
    </>
  );
}
