import { EventContentPage, buildEventPageMetadata } from "@/components/event-content-page";

export const metadata = buildEventPageMetadata("emerge-americas", "es");

export default function Page() {
  return <EventContentPage id="emerge-americas" locale="es" />;
}
