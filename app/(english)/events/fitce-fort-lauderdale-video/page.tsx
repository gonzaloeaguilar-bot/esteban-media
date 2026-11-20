import { EventContentPage, buildEventPageMetadata } from "@/components/event-content-page";

export const metadata = buildEventPageMetadata("fitce", "en");

export default function Page() {
  return <EventContentPage id="fitce" locale="en" />;
}
