import { EventContentPage, buildEventPageMetadata } from "@/components/event-content-page";

export const metadata = buildEventPageMetadata("pompano-beach-events", "en");

export default function Page() {
  return <EventContentPage id="pompano-beach-events" locale="en" />;
}
