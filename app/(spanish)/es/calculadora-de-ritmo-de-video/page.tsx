import Link from "next/link";

import { DailyScriptPacingCalculator } from "@/components/daily-script-pacing-calculator";
import { PriorityLinks } from "@/components/priority-links";
import { PageUpdated } from "@/components/page-updated";
import { ScriptLengthAnswer } from "@/components/script-length-answer";
import { ContactCta } from "@/components/contact-cta";
import { Container } from "@/components/ui/container";
import { pageLastModified } from "@/lib/page-lastmod";
import { absoluteUrl } from "@/lib/site";
import { toolApplicationNode } from "@/lib/tool-schema";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = buildPageMetadata({
  title: "Calculadora de Ritmo de Guion | Herramienta para Video Corto",
  description: "Calcula el ritmo y la duración de tu guion para videos cortos. Mejora la entrega en Reels y TikTok con apoyo de edición en South Florida.",
  path: "/es/calculadora-de-ritmo-de-video",
  locale: "es",
});

const PATH = "/es/calculadora-de-ritmo-de-video";

export default function DailyScriptPacingCalculatorEsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl("/es/calculadora-de-ritmo-de-video#webpage"),
    url: absoluteUrl("/es/calculadora-de-ritmo-de-video"),
    name: "Calculadora de palabras para video de 30 y 60 segundos",
    description: "Calculadora para estimar palabras, ritmo de lectura y duración hablada de un guion de video.",
    isPartOf: { "@id": absoluteUrl("/#website") },
    mainEntity: toolApplicationNode({
      path: "/es/calculadora-de-ritmo-de-video",
      name: "Calculadora de palabras para video de 30 y 60 segundos",
      description: "Calculadora para estimar palabras, ritmo de lectura y duración hablada de un guion de video.",
      locale: "es",
    }),
    ...(pageLastModified(PATH) ? { dateModified: pageLastModified(PATH) } : {}),
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
              <li aria-current="page" className="text-[#252a2d]">Calculadora diaria de ritmo de guion</li>
            </ol>
          </nav>

          <div className="mx-auto mb-8 max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">Herramienta gratuita</p>
            <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">Calculadora diaria de ritmo de guion</h1>
            <p className="mt-4 text-base leading-7 text-[#3f4548]">Calcula palabras por minuto, duración y ritmo del guion para una entrega clara en formatos cortos. Si necesitas convertir guiones en videos editados que retengan atención, Esteban puede ayudarte.</p>
          </div>

          <DailyScriptPacingCalculator locale="es" />

          <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 text-sm leading-6 text-[#252a2d]">
            <p>Servicios y recursos relacionados: <Link href="/es/editor-de-video-corto-para-redes-miami" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">edición de video corto en Miami</Link>, <Link href="/es/editor-de-reels-fort-lauderdale" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">edición de Reels en Fort Lauderdale</Link> y <Link href="/es/guias" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">guías de video</Link>.</p>
          </div>
        </Container>
      </section>
      <ContactCta locale="es" />
    </main>
  );
