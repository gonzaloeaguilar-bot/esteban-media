import {
  buildSpanishNicheMetadata,
  SpanishNichePage,
} from "@/components/spanish-niche-page";

const slug = "video-para-clinicas-de-medicina-regenerativa-miami";

export const metadata = buildSpanishNicheMetadata(slug);

export default function Page() {
  return <SpanishNichePage slug={slug} />;
}
