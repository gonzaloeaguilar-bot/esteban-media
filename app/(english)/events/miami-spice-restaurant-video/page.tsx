import { EventContentPage, buildEventPageMetadata } from "@/components/event-content-page";

export const metadata = buildEventPageMetadata("miami-spice", "en");

export default function Page() {
  return <EventContentPage id="miami-spice" locale="en" />;
}
