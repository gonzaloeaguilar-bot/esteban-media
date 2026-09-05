import {
  buildSpanishNicheMetadata,
  SpanishNichePage,
} from "@/components/spanish-niche-page";

const slug = "video-para-yates-y-hospitalidad-fort-lauderdale";
const pageMetadata = buildSpanishNicheMetadata(slug);

export const metadata = {
  ...pageMetadata,
  title: { absolute: "Video para Yates y Hospitalidad en Fort Lauderdale" },
};

export default function Page() {
  return <SpanishNichePage slug={slug} />;
}
