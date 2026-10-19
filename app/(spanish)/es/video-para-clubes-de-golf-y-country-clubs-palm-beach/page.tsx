import {
  buildSpanishNicheMetadata,
  SpanishNichePage,
} from "@/components/spanish-niche-page";

const slug = "video-para-clubes-de-golf-y-country-clubs-palm-beach";

export const metadata = buildSpanishNicheMetadata(slug);

export default function Page() {
  return <SpanishNichePage slug={slug} />;
}
