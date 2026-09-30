import Link from "next/link";

import { DailyShotListPlanner } from "@/components/daily-shot-list-planner";
import { Container } from "@/components/ui/container";
import { absoluteUrl } from "@/lib/site";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = buildPageMetadata({
  title: "Planificador Diario de Tomas de Video y B-Roll",
  description: "Una herramienta diaria con fórmulas de planos de apoyo y 3 verificaciones de rodaje para creadores y producción de video.",
  path: "/es/planificador-de-tomas-de-video",
  locale: "es",
});

export default function DailyShotListPlannerEsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl("/es/planificador-de-tomas-de-video#webpage"),
    url: absoluteUrl("/es/planificador-de-tomas-de-video"),
    name: "Planificador Diario de Tomas de Video y B-Roll",
    description: "Fórmulas diarias de soporte visual, lista interactiva de tomas y verificaciones de rodaje.",
    isPartOf: { "@id": absoluteUrl("/#website") },
  };

  return (
    <main className="bg-[#f6f1ea] py-10 text-[#101214] sm:py-16">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container size="xl">
        <nav aria-label="Navegación de migas de pan" className="mb-7 text-sm text-[#5a6066]">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/es" className="hover:text-[#9f3c27]">
                Inicio
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-[#252a2d]">
              Planificador de tomas de video
            </li>
          </ol>
        </nav>
        <DailyShotListPlanner locale="es" />

        <div className="mt-12 rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 text-sm text-[#252a2d]">
          <p>
            ¿Necesitas apoyo de producción en set o rodaje de planos de apoyo? Revisa nuestras{" "}
            <Link
              href="/es/areas"
              className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]"
            >
              áreas de servicio de video en South Florida
            </Link>{" "}
            para coordinar grabaciones en locación.
          </p>
        </div>
      </Container>
    </main>
  );
}
