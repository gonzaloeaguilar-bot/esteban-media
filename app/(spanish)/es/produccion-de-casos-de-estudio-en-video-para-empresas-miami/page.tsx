import {
  buildSpanishNicheMetadata,
  SpanishNichePage,
} from "@/components/spanish-niche-page";

const slug = "produccion-de-casos-de-estudio-en-video-para-empresas-miami";

export const metadata = buildSpanishNicheMetadata(slug);

export default function Page() {
  return <SpanishNichePage slug={slug} />;
}
