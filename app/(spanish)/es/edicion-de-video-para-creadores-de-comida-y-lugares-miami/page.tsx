import { buildSpanishNicheMetadata, SpanishNichePage } from "@/components/spanish-niche-page";

const slug = "edicion-de-video-para-creadores-de-comida-y-lugares-miami";
export const metadata = buildSpanishNicheMetadata(slug);

export default function Page() {
  return <SpanishNichePage slug={slug} />;
}
