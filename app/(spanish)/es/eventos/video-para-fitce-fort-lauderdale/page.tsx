import { EventContentPage, buildEventPageMetadata } from "@/components/event-content-page";

export const metadata = buildEventPageMetadata("fitce", "es");

export default function Page() {
  return <EventContentPage id="fitce" locale="es" />;
}
