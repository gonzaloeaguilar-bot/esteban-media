import Link from "next/link";

import { DailyScriptTimerEs } from "@/components/daily-script-timer-es";
import { PageUpdated } from "@/components/page-updated";
import { ScriptLengthAnswer } from "@/components/script-length-answer";
import { ContactCta } from "@/components/contact-cta";
import { Container } from "@/components/ui/container";
import { pageLastModified } from "@/lib/page-lastmod";
import { absoluteUrl } from "@/lib/site";
import { toolApplicationNode } from "@/lib/tool-schema";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = buildPageMetadata({
  title: "Temporizador de Guion y Ritmo | Herramienta para Reels y Shorts",
  description: "Calcula la duración y el ritmo de tu guion para videos de 15s, 30s y 60s. Planifica Reels y Shorts con apoyo profesional de edición.",
  path: "/es/temporizador-de-guiones-de-video",
  locale: "es",
});

export default function DailyScriptTimerEsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl("/es/temporizador-de-guiones-de-video#webpage"),
    url: absoluteUrl("/es/temporizador-de-guiones-de-video"),
    name: "Temporizador y Calculadora de Ritmo de Guiones",
    description: "Una calculadora interactiva de ritmo y lista de verificación diaria de ensayo para creadores de video vertical.",
    isPartOf: { "@id": absoluteUrl("/#website") },
    mainEntity: toolApplicationNode({
      path: "/es/temporizador-de-guiones-de-video",
      name: "Temporizador y Calculadora de Ritmo de Guiones",
      description: "Una calculadora interactiva de ritmo y lista de verificación diaria de ensayo para creadores de video vertical.",
      locale: "es",
    }),
    ...(pageLastModified("/es/temporizador-de-guiones-de-video") ? { dateModified: pageLastModified("/es/temporizador-de-guiones-de-video") } : {}),
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
              <li><Link href="/es/recursos" className="hover:text-[#9f3c27]">Recursos</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">Temporizador de guion y calculadora de ritmo</li>
            </ol>
          </nav>

          <div className="mx-auto mb-8 max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">Herramienta gratuita</p>
            <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">Temporizador de guion y calculadora de ritmo</h1>
            <p className="mt-4 text-base leading-7 text-[#3f4548]">Mide el tiempo de tu guion, ajusta el ritmo para formatos de 15s/30s/60s y mejora la entrega antes de grabar. Si necesitas edición, subtítulos o versiones cortas, Esteban puede encargarse de la postproducción.</p>
          </div>

          <DailyScriptTimerEs />

          <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 text-sm leading-6 text-[#252a2d]">
            <p>Servicios y recursos relacionados: <Link href="/es/editor-de-video-corto-para-redes-miami" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">edición de video corto en Miami</Link>, <Link href="/es/editor-de-reels-fort-lauderdale" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">edición de Reels en Fort Lauderdale</Link> y <Link href="/es/recursos/kit-video-social" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">kit de guiones y zonas seguras</Link>.</p>
          </div>
        </Container>
      </section>
      <ContactCta locale="es" />
    </main>
  );
