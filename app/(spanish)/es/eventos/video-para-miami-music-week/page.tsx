import { EventContentPage, buildEventPageMetadata } from "@/components/event-content-page";

export const metadata = buildEventPageMetadata("miami-music-week", "es");

export default function Page() {
  return <EventContentPage id="miami-music-week" locale="es" />;
}
