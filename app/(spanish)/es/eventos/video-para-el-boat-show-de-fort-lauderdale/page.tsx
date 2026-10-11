import { EventContentPage, buildEventPageMetadata } from "@/components/event-content-page";

export const metadata = buildEventPageMetadata("flibs", "es");

export default function Page() {
  return <EventContentPage id="flibs" locale="es" />;
}
