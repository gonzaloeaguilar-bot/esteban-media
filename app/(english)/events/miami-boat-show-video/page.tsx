import { EventContentPage, buildEventPageMetadata } from "@/components/event-content-page";

export const metadata = buildEventPageMetadata("miami-boat-show", "en");

export default function Page() {
  return <EventContentPage id="miami-boat-show" locale="en" />;
}
