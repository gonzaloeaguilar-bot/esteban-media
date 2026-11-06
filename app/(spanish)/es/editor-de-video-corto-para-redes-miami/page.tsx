import {
  buildSpanishNicheMetadata,
  SpanishNichePage,
} from "@/components/spanish-niche-page";
import { FoodCreatorChoice } from "@/components/food-creator-choice";

const slug = "editor-de-video-corto-para-redes-miami";

export const metadata = buildSpanishNicheMetadata(slug);

export default function Page() {
  return <SpanishNichePage slug={slug} showcase={<FoodCreatorChoice locale="es" sourcePage="miami-short-form" />} />;
}
