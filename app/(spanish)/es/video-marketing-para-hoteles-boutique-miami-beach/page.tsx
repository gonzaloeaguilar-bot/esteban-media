import {
  buildSpanishNicheMetadata,
  SpanishNichePage,
} from "@/components/spanish-niche-page";

const slug = "video-marketing-para-hoteles-boutique-miami-beach";

export const metadata = buildSpanishNicheMetadata(slug);

export default function Page() {
  return <SpanishNichePage slug={slug} />;
}
