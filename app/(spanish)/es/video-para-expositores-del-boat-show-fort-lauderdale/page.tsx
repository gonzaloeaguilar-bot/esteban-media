import {
  buildSpanishNicheMetadata,
  SpanishNichePage,
} from "@/components/spanish-niche-page";

const slug = "video-para-expositores-del-boat-show-fort-lauderdale";

// Renders EventBookingAnswer, which hides an edition once it has ended. That check
// runs at render time, so a fully static page would keep a past edition (and its
// booking link) until the next deploy. Re-render daily, like the /events routes.
export const revalidate = 86_400;

export const metadata = buildSpanishNicheMetadata(slug);

export default function Page() {
  return <SpanishNichePage slug={slug} />;
}
