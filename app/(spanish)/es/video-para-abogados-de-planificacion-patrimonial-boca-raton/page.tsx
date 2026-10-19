import {
  buildSpanishNicheMetadata,
  SpanishNichePage,
} from "@/components/spanish-niche-page";

const slug = "video-para-abogados-de-planificacion-patrimonial-boca-raton";

export const metadata = buildSpanishNicheMetadata(slug);

export default function Page() {
  return <SpanishNichePage slug={slug} />;
}
