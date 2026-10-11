import { EventsHubPage, buildEventsHubMetadata } from "@/components/event-content-page";

export const metadata = buildEventsHubMetadata("en");

export default function Page() {
  return <EventsHubPage locale="en" />;
}
