import Link from "next/link";
import { Container } from "@/components/ui/container";
import { VideoStrategyAssessment } from "@/components/video-strategy-assessment";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Diagnóstico de Estrategia de Video",
  description:
    "Evaluación gratuita de 60 segundos de la estrategia de contenido de video para empresas en South Florida.",
  path: "/es/evaluacion",
  locale: "es",
});

export default function SpanishAssessmentPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl("/es/evaluacion#webpage"),
    url: absoluteUrl("/es/evaluacion"),
    name: "Diagnóstico de Estrategia de Video",
    description:
      "Audita el alcance comercial de tus videos, el enfoque bilingüe y la optimización para redes sociales.",
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
                Diagnóstico de Estrategia
              </li>
            </ol>
          </nav>

          <VideoStrategyAssessment locale="es" />

          <div className="mt-12 rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 text-sm text-[#252a2d]">
            <p>
              ¿Necesitas evaluar grabaciones o producción en locación? Consulta nuestras{" "}
              <Link
                href="/es/areas"
                className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]"
              >
                áreas de servicio en Fort Lauderdale, Broward y Miami-Dade
              </Link>{" "}
              para conocer la disponibilidad de cobertura antes de solicitar tu diagnóstico.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
