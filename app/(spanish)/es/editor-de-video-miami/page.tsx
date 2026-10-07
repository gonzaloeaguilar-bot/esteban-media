import { buildSpanishNicheMetadata, SpanishNichePage } from "@/components/spanish-niche-page";

const slug = "editor-de-video-miami";
export const metadata = buildSpanishNicheMetadata(slug);

export default function Page() {
  return <SpanishNichePage slug={slug} />;
}
