import { buildServicePageNodes } from "@/components/service-depth";
import {
  WEDDING_PACKAGES_PATH,
  WeddingPackagesPage,
  weddingPackagesNodeArgs,
} from "@/components/wedding-packages-page";
import { WEDDING_PACKAGES } from "@/lib/pricing";
import { buildPageMetadata } from "@/lib/site-metadata";

const floor = `$${Math.min(WEDDING_PACKAGES.halfDayFrom, WEDDING_PACKAGES.contentCreationFrom, WEDDING_PACKAGES.fullDayFrom).toLocaleString("en-US")}`;

export const metadata = buildPageMetadata({
  title: "Paquetes de boda: Miami, Fort Lauderdale y Palm Beach",
  description: `Paquetes de video de boda desde ${floor}: medio día, día completo y contenido de boda en Miami, Fort Lauderdale y Palm Beach. Un depósito de ${WEDDING_PACKAGES.depositPercent}% reserva tu fecha.`,
  path: WEDDING_PACKAGES_PATH.es,
  locale: "es",
});

export default function Page() {
  return (
    <WeddingPackagesPage
      locale="es"
      nodes={buildServicePageNodes(weddingPackagesNodeArgs("es"))}
    />
  );
}
