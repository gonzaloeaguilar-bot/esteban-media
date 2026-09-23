import Link from "next/link";

import { DailyPublishPromptEs } from "@/components/daily-publish-prompt-es";
import { Container } from "@/components/ui/container";
import { absoluteUrl } from "@/lib/site";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = buildPageMetadata({
  title: "Prompt de Publicación Diaria",
  description: "Una guía e idea diaria con lista de verificación para planificar publicaciones de video.",
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
    description: "Idea diaria y lista de verificación local para la publicación de videos cortos.",
    isPartOf: { "@id": absoluteUrl("/#website") },
    inLanguage: "es-US",
  };

  return (
    <main className="bg-[#f6f1ea] py-10 text-[#101214] sm:py-16">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Container size="xl">
        <nav aria-label="Navegación de migas de pan" className="mb-7 text-sm text-[#5a6066]">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/es" className="hover:text-[#9f3c27]">Inicio</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-[#252a2d]">Prompt de publicación diaria</li>
          </ol>
        </nav>
        <DailyPublishPromptEs />

        <div className="mt-12 rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 text-sm text-[#252a2d]">
          <p>
            ¿Buscas estructurar contenido con grabación en locación o edición continua? Revisa nuestras{" "}
            <Link
              href="/es/areas"
              className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]"
            >
              áreas de servicio en Fort Lauderdale, Broward y Miami-Dade
            </Link>{" "}
            para conocer las opciones de soporte local y producción audiovisual.
          </p>
        </div>
      </Container>
    </main>
  );
}
