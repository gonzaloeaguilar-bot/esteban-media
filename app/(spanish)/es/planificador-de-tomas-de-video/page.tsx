import Link from "next/link";

import { DailyShotListPlanner } from "@/components/daily-shot-list-planner";
import { ContactCta } from "@/components/contact-cta";
import { Container } from "@/components/ui/container";
import { absoluteUrl } from "@/lib/site";
import { toolApplicationNode } from "@/lib/tool-schema";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = buildPageMetadata({
  title: "Planificador Diario de Tomas y B-Roll | Lista de Grabación",
  description: "Organiza tu lista diaria de tomas, B-roll y checklist de grabación para producir mejor video. Apoyo de grabación y edición en South Florida.",
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
    mainEntity: toolApplicationNode({
      path: "/es/planificador-de-tomas-de-video",
      name: "Planificador Diario de Tomas de Video y B-Roll",
      description: "Fórmulas diarias de soporte visual, lista interactiva de tomas y verificaciones de rodaje.",
      locale: "es",
    }),
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="py-10 sm:py-16">
        <Container size="xl">
          <nav aria-label="Navegación de migas de pan" className="mb-7 text-sm text-[#5a6066]">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/es" className="hover:text-[#9f3c27]">Inicio</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/es/guias" className="hover:text-[#9f3c27]">Guías</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">Planificador diario de tomas y B-roll</li>
            </ol>
          </nav>

          <div className="mx-auto mb-8 max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">Herramienta gratuita</p>
            <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">Planificador diario de tomas y B-roll</h1>
            <p className="mt-4 text-base leading-7 text-[#3f4548]">Planifica tomas esenciales, B-roll y una lista previa a grabar para que tu producción sea más fluida. Si necesitas apoyo en grabación o edición, Esteban puede ayudarte a ejecutarlo.</p>
          </div>

          <DailyShotListPlanner locale="es" />

          <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 text-sm leading-6 text-[#252a2d]">
            <p>Servicios y recursos relacionados: <Link href="/es/produccion-de-video-fort-lauderdale" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">producción de video en Fort Lauderdale</Link>, <Link href="/es/guias/preparar-material-para-edicion-de-video" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">cómo preparar material</Link> y <Link href="/es/areas" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">áreas de servicio</Link>.</p>
          </div>
        </Container>
      </section>
      <ContactCta locale="es" />
    </main>
  );
