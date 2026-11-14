import { filmingHourlyText } from "@/lib/pricing";
import Link from "next/link";

import { ClosingCredits, PackagesSection } from "@/components/packages-section";
import { PageUpdated } from "@/components/page-updated";
import { PricingAnswer, pricingHubExtraFaq } from "@/components/pricing-answer";
import { PricingCinematicHero } from "@/components/pricing-cinematic-hero";
import { PortfolioTeaser } from "@/components/portfolio-teaser";
import { ClientReviews } from "@/components/client-reviews";
import { Container } from "@/components/ui/container";
import { entityIds } from "@/lib/entity-schema";
import { packagesJsonLd, priceSentence } from "@/lib/packages";
import { pageLastModified } from "@/lib/page-lastmod";
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
  const [catalog, packageFaqLd] = packagesJsonLd("es", url, entityIds.business);
  // The hub's own per-hour (and, in Spanish, Latin America) answers render in
  // PricingAnswer; the same strings join the one FAQPage here.
  const faq = {
    ...packageFaqLd,
    mainEntity: [
      ...packageFaqLd.mainEntity,
      ...pricingHubExtraFaq("es").map((q) => ({
        "@type": "Question",
        name: q.question,
        acceptedAnswer: { "@type": "Answer", text: q.answer },
      })),
    ],
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: "Precios y Paquetes",
    description:
      "Precios de partida de los paquetes y servicios de Esteban Moreno Media, y el proceso de cotización en tres pasos.",
    isPartOf: { "@id": absoluteUrl("/#website") },
    ...(pageLastModified(PATH) ? { dateModified: pageLastModified(PATH) } : {}),
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

      <PricingCinematicHero locale="es" />
      <PortfolioTeaser locale="es" source="pricing_work_opening" />

      <section className="em-pricing-intro">
        <Container size="xl">
          <nav aria-label="Breadcrumbs" className="mb-5 text-sm text-[#5a6066]">
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

          <h2 className="max-w-3xl text-balance font-serif em-display">Empieza por el trabajo que realmente necesitas.</h2>
          <ul className="em-pricing-intro__facts" aria-label="Resumen de precios">
            <li>La edición remota empieza {priceSentence("es", "arranque").toLowerCase()}.</li>
            <li>Un día de producción empieza {priceSentence("es", "presencia-local").toLowerCase()}.</li>
            <li>La grabación por hora va {filmingHourlyText("es")}.</li>
          </ul>
          <PageUpdated path={PATH} locale="es" className="mt-3 text-xs text-[#5a6066]" />
          <p className="mt-3 max-w-2xl text-sm text-[#5a6066]">
            ¿Quieres un número para tu proyecto ahora mismo? Usa la{" "}
            <Link href="/es/calculadora" className="underline hover:text-[#9f3c27]">
              calculadora de presupuesto
            </Link>
            , o mira{" "}
            <Link href="/es/servicios" className="underline hover:text-[#9f3c27]">
              todos los servicios
            </Link>
            , compara el{" "}
            <Link href="/es/guias/precios-edicion-de-reels-y-video-sur-de-florida" className="underline hover:text-[#9f3c27]">
              índice de precios de edición de Reels en South Florida
            </Link>
            .
          </p>
        </Container>
      </section>

      <PackagesSection locale="es" />
      <ClientReviews locale="es" compact />
      <PricingAnswer locale="es" />
      <ClosingCredits locale="es" />
    </main>
  );
}
