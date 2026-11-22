import { RealEstateHubPage, buildRealEstateHubMetadata } from "@/components/real-estate-hub-page";

export const metadata = buildRealEstateHubMetadata("es");

export default function Page() {
  return <RealEstateHubPage locale="es" />;
}
