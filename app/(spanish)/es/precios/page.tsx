import Link from "next/link";

import { ClosingCredits, PackagesSection } from "@/components/packages-section";
import { Container } from "@/components/ui/container";
import { entityIds } from "@/lib/entity-schema";
import { packagesJsonLd } from "@/lib/packages";
import { absoluteUrl } from "@/lib/site";
import { buildPageMetadata } from "@/lib/site-metadata";

const PATH = "/es/precios";

export const metadata = buildPageMetadata({
  title: "Precios y Paquetes — Video, Foto y Contenido",
  description:
    "Cuánto cuesta trabajar con Esteban Moreno Media: cuatro paquetes con precio de partida, servicios sueltos y cómo se arma tu cotización por escrito.",
  path: PATH,
  locale: "es",
});

export default function SpanishPricingPage() {
  const url = absoluteUrl(PATH);
  const [catalog, faq] = packagesJsonLd("es", url, entityIds.business);

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: "Precios y Paquetes",
    description:
      "Precios de partida de los paquetes y servicios de Esteban Moreno Media, y el proceso de cotización en tres pasos.",
    isPartOf: { "@id": absoluteUrl("/#website") },
    breadcrumb: { "@id": `${url}#breadcrumbs` },
    inLanguage: "es-US",
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumbs`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/es") },
      { "@type": "ListItem", position: 2, name: "Precios", item: url },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([webPage, breadcrumbs, catalog, faq]),
        }}
      />

      <section className="pt-12 pb-2 sm:pt-16">
        <Container size="xl">
          <nav aria-label="Breadcrumbs" className="mb-8 text-sm text-[#5a6066]">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/es" className="hover:text-[#9f3c27]">
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">
                Precios
              </li>
            </ol>
          </nav>

          <h1 className="max-w-3xl text-balance font-serif em-display">
            Cuánto cuesta trabajar juntos
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#40474d] sm:text-lg">
            Cada paquete muestra su precio de partida para que sepas el orden de
            magnitud antes de escribirme. La cifra final depende de cuánto video
            necesitas, de si hay grabación presencial y de qué tan rápido lo
            necesitas — por eso siempre recibes una cotización por escrito para
            tu proyecto.
          </p>
          <p className="mt-3 max-w-2xl text-sm text-[#5a6066]">
            ¿Quieres un número para tu proyecto ahora mismo? Usa la{" "}
            <Link href="/es/calculadora" className="underline hover:text-[#9f3c27]">
              calculadora de presupuesto
            </Link>
            , o mira{" "}
            <Link href="/es/servicios" className="underline hover:text-[#9f3c27]">
              todos los servicios
            </Link>
            .
          </p>
        </Container>
      </section>

      <PackagesSection locale="es" />
      <ClosingCredits locale="es" />
    </main>
  );
}
