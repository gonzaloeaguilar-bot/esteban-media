import { EventContentPage, buildEventPageMetadata } from "@/components/event-content-page";

export const metadata = buildEventPageMetadata("boca-raton-events", "en");

export default function Page() {
  return <EventContentPage id="boca-raton-events" locale="en" />;
}
