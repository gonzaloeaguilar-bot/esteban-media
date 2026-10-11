import { EventContentPage, buildEventPageMetadata } from "@/components/event-content-page";

export const metadata = buildEventPageMetadata("flibs", "en");

export default function Page() {
  return <EventContentPage id="flibs" locale="en" />;
}
