import { EventContentPage, buildEventPageMetadata } from "@/components/event-content-page";

export const metadata = buildEventPageMetadata("miami-music-week", "en");

export default function Page() {
  return <EventContentPage id="miami-music-week" locale="en" />;
}
