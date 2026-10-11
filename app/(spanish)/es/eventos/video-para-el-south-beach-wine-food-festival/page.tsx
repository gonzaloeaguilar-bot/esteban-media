import { EventContentPage, buildEventPageMetadata } from "@/components/event-content-page";

export const metadata = buildEventPageMetadata("sobewff", "es");

export default function Page() {
  return <EventContentPage id="sobewff" locale="es" />;
}
