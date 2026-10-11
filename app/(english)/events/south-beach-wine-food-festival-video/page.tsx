import { EventContentPage, buildEventPageMetadata } from "@/components/event-content-page";

export const metadata = buildEventPageMetadata("sobewff", "en");

export default function Page() {
  return <EventContentPage id="sobewff" locale="en" />;
}
