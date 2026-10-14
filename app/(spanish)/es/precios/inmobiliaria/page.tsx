import { RealEstatePricing } from "@/components/real-estate-pricing";
import { entityIds } from "@/lib/entity-schema";
import { realEstateJsonLd } from "@/lib/real-estate-schema";
import { absoluteUrl } from "@/lib/site";
import { buildPageMetadata } from "@/lib/site-metadata";

const PATH = "/es/precios/inmobiliaria";

export const metadata = buildPageMetadata({
  title: "Precios de fotografía inmobiliaria — Fort Lauderdale y Miami",
  description:
    "Fotografía de propiedades en el sur de Florida con precio publicado por tamaño de la casa, más dron, recorrido 3D de Zillow y video premium. Tarifas, no estimados.",
  path: PATH,
  locale: "es",
});

export default function Page() {
  const ld = realEstateJsonLd("es", absoluteUrl(PATH), entityIds.business);
  return (
    <>
      <RealEstatePricing locale="es" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}

export const dynamic = "force-static";
