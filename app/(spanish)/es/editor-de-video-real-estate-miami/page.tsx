import {
  buildSpanishNicheMetadata,
  SpanishNichePage,
} from "@/components/spanish-niche-page";
import { RealEstateReels } from "@/components/real-estate-reels";

const slug = "editor-de-video-real-estate-miami";

export const metadata = buildSpanishNicheMetadata(slug);

export default function Page() {
  return (
    <SpanishNichePage
      slug={slug}
      showcase={<RealEstateReels locale="es" />}
    />
  );
}
