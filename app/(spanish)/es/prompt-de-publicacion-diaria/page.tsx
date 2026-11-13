import Link from "next/link";

import { ContactCta } from "@/components/contact-cta";
import { DailyPublishPromptEs } from "@/components/daily-publish-prompt-es";
import { Container } from "@/components/ui/container";
import { absoluteUrl } from "@/lib/site";
import { toolApplicationNode } from "@/lib/tool-schema";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = buildPageMetadata({
  title: "Prompt de Publicación Diaria | Herramienta de Contenido",
  description:
    "Usa un prompt diario y una lista de verificación para publicar videos con constancia. Si necesitas edición o producción, Esteban puede ayudarte a convertir ideas en Reels y videos listos para publicar.",
  path: "/es/prompt-de-publicacion-diaria",
  locale: "es",
});

export default function DailyPublishPromptEsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl("/es/prompt-de-publicacion-diaria#webpage"),
    url: absoluteUrl("/es/prompt-de-publicacion-diaria"),
    name: "Prompt de Publicación Diaria",
    description:
      "Idea diaria y lista de verificación local para publicar videos cortos con un camino claro a edición y producción profesional.",
    isPartOf: { "@id": absoluteUrl("/#website") },
    mainEntity: toolApplicationNode({
      path: "/es/prompt-de-publicacion-diaria",
      name: "Prompt de Publicación Diaria",
      description: "Idea diaria y lista de verificación local para la publicación de videos cortos.",
      locale: "es",
    }),
    inLanguage: "es-US",
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="py-10 sm:py-16">
        <Container size="xl">
          <nav aria-label="Navegación de migas de pan" className="mb-7 text-sm text-[#5a6066]">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/es" className="hover:text-[#9f3c27]">Inicio</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/es/guias" className="hover:text-[#9f3c27]">Guías</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">Prompt de publicación diaria</li>
            </ol>
          </nav>

          <div className="mx-auto mb-8 max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">Herramienta gratuita</p>
            <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">Prompt de publicación diaria</h1>
            <p className="mt-4 text-base leading-7 text-[#3f4548]">
              Usa una idea enfocada y una lista breve para publicar con constancia. Cuando necesites convertir ideas en Reels, Shorts o videos listos para clientes, Esteban puede ayudarte con edición, subtítulos y postproducción.
            </p>
          </div>

          <DailyPublishPromptEs />

          <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 text-sm leading-6 text-[#252a2d]">
            <p>
              ¿Necesitas más que un prompt? Explora{" "}
              <Link href="/es/editor-de-reels-fort-lauderdale" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">edición de Reels en Fort Lauderdale</Link>,{" "}
              <Link href="/es/editor-de-video-corto-para-redes-miami" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">edición de video corto en Miami</Link> o{" "}
              <Link href="/es/areas" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">áreas de servicio en South Florida</Link>.
            </p>
          </div>
        </Container>
      </section>
      <ContactCta locale="es" />
    </main>
  );
}
