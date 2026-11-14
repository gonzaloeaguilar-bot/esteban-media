import Link from "next/link";

import { DailyHookPlannerEs } from "@/components/daily-hook-planner-es";
import { ContactCta } from "@/components/contact-cta";
import { Container } from "@/components/ui/container";
import { absoluteUrl } from "@/lib/site";
import { toolApplicationNode } from "@/lib/tool-schema";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = buildPageMetadata({
  title: "Planificador Diario de Ganchos de Video | Reels y Shorts",
  description: "Planifica mejores ganchos para Reels, TikTok y Shorts con una estructura diaria y checklist. Obtén ayuda profesional de edición en Fort Lauderdale y Miami.",
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
    mainEntity: toolApplicationNode({
      path: "/es/planificador-de-ganchos-de-video",
      name: "Planificador Diario de Ganchos de Video",
      description: "Estructuras diarias de ganchos y lista de verificación local para la planificación de videos cortos.",
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
              <li aria-current="page" className="text-[#252a2d]">Planificador diario de ganchos de video</li>
            </ol>
          </nav>

          <div className="mx-auto mb-8 max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">Herramienta gratuita</p>
            <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">Planificador diario de ganchos de video</h1>
            <p className="mt-4 text-base leading-7 text-[#3f4548]">Usa estructuras de ganchos y una lista breve para empezar videos cortos con más claridad. Si necesitas convertir tus ideas en Reels o Shorts editados, Esteban puede ayudarte con la producción final.</p>
          </div>

          <DailyHookPlannerEs />

          <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 text-sm leading-6 text-[#252a2d]">
            <p>Servicios y recursos relacionados: <Link href="/es/editor-de-reels-fort-lauderdale" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">edición de Reels en Fort Lauderdale</Link>, <Link href="/es/editor-de-video-corto-para-redes-miami" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">edición de video corto en Miami</Link> y <Link href="/es/guias" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">guías de video</Link>.</p>
          </div>
        </Container>
      </section>
      <ContactCta locale="es" />
    </main>
  );
