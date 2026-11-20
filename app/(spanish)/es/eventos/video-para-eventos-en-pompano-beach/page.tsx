import { EventContentPage, buildEventPageMetadata } from "@/components/event-content-page";

export const metadata = buildEventPageMetadata("pompano-beach-events", "es");

export default function Page() {
  return <EventContentPage id="pompano-beach-events" locale="es" />;
}
