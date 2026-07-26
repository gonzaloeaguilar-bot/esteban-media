import Link from "next/link";
import { Container } from "@/components/ui/container";
import { VideoBudgetEstimator } from "@/components/video-budget-estimator";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Calculadora de Presupuesto de Video",
  description:
    "Calculadora gratuita de costo y tiempo de entrega de edición y producción de video en South Florida.",
  path: "/es/calculadora",
  locale: "es",
});

export default function SpanishCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl("/es/calculadora#webpage"),
    url: absoluteUrl("/es/calculadora"),
    name: "Calculadora de Presupuesto de Video",
    description:
      "Calcula el costo y tiempo de entrega de tus proyectos de video para Reels, YouTube, videos corporativos y dron.",
    isPartOf: { "@id": absoluteUrl("/#website") },
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="py-12 sm:py-16">
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
                Calculadora de Presupuesto
              </li>
            </ol>
          </nav>

          <VideoBudgetEstimator locale="es" />
        </Container>
      </section>
    </main>
  );
}
