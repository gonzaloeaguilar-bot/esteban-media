import { EventContentPage, buildEventPageMetadata } from "@/components/event-content-page";

export const metadata = buildEventPageMetadata("art-basel", "es");

export default function Page() {
  return <EventContentPage id="art-basel" locale="es" />;
}
