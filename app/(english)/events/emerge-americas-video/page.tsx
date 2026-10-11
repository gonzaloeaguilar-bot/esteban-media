import { EventContentPage, buildEventPageMetadata } from "@/components/event-content-page";

export const metadata = buildEventPageMetadata("emerge-americas", "en");

export default function Page() {
  return <EventContentPage id="emerge-americas" locale="en" />;
}
