import { EventContentPage, buildEventPageMetadata } from "@/components/event-content-page";

export const metadata = buildEventPageMetadata("boca-raton-events", "es");

export default function Page() {
  return <EventContentPage id="boca-raton-events" locale="es" />;
}
