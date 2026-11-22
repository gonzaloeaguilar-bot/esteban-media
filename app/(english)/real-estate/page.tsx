import { RealEstateHubPage, buildRealEstateHubMetadata } from "@/components/real-estate-hub-page";

export const metadata = buildRealEstateHubMetadata("en");

export default function Page() {
  return <RealEstateHubPage locale="en" />;
}
