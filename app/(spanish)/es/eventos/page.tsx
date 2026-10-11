import { EventsHubPage, buildEventsHubMetadata } from "@/components/event-content-page";

export const metadata = buildEventsHubMetadata("es");

export default function Page() {
  return <EventsHubPage locale="es" />;
}
