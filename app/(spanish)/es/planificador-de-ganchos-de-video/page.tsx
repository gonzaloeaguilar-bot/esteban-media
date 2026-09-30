import Link from "next/link";

import { DailyHookPlannerEs } from "@/components/daily-hook-planner-es";
import { Container } from "@/components/ui/container";
import { absoluteUrl } from "@/lib/site";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = buildPageMetadata({
  title: "Planificador Diario de Ganchos de Video",
  description: "Una herramienta diaria con estructuras de ganchos y 3 verificaciones para planificar videos cortos.",
  path: "/es/planificador-de-ganchos-de-video",
  locale: "es",
});

export default function DailyHookPlannerEsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl("/es/planificador-de-ganchos-de-video#webpage"),
    url: absoluteUrl("/es/planificador-de-ganchos-de-video"),
    name: "Planificador Diario de Ganchos de Video",
    description: "Estructuras diarias de ganchos y lista de verificación local para la planificación de videos cortos.",
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
              Planificador de ganchos de video
            </li>
          </ol>
        </nav>
        <DailyHookPlannerEs />

        <div className="mt-12 rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 text-sm text-[#252a2d]">
          <p>
            Si además de planificar tus ganchos necesitas producción en locación o edición profesional, revisa nuestras{" "}
            <Link
              href="/es/areas"
              className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]"
            >
              áreas de servicio de video en South Florida
            </Link>{" "}
            para conocer la cobertura local.
          </p>
        </div>
      </Container>
    </main>
  );
}
