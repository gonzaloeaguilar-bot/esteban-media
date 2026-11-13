import Link from "next/link";

import { ContactCta } from "@/components/contact-cta";
import { Container } from "@/components/ui/container";
import { ScriptAndOverlayKit } from "@/components/script-and-overlay-kit";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl } from "@/lib/site";
import { toolApplicationNode } from "@/lib/tool-schema";

export const metadata = buildPageMetadata({
  title: "Kit de Guiones y Zonas Seguras para Reels, TikTok y Shorts",
  description:
    "Plantillas gratuitas de guiones para anuncios de video y guía de zonas seguras 9:16 para Instagram Reels, TikTok y YouTube Shorts. Mejora ganchos, subtítulos y CTA.",
  path: "/es/recursos/kit-video-social",
  locale: "es",
});

export default function SpanishSocialVideoKitPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl("/es/recursos/kit-video-social#webpage"),
    url: absoluteUrl("/es/recursos/kit-video-social"),
    name: "Kit de Guiones y Zonas Seguras de Video",
    description:
      "Guiones direct-response y guía de zonas seguras 9:16 para Reels, TikTok y Shorts.",
    isPartOf: { "@id": absoluteUrl("/#website") },
    mainEntity: toolApplicationNode({
      path: "/es/recursos/kit-video-social",
      name: "Kit de Guiones y Zonas Seguras de Video",
      description:
        "Guiones direct-response y guía de zonas seguras 9:16 para edición de video social.",
      locale: "es",
    }),
    inLanguage: "es-US",
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
              <li><Link href="/es" className="hover:text-[#9f3c27]">Inicio</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/es/guias" className="hover:text-[#9f3c27]">Recursos</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">Kit de Video Social</li>
            </ol>
          </nav>

          <div className="mb-8 max-w-4xl">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">Recurso gratuito</p>
            <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
              Kit de guiones y zonas seguras para video social
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[#3f4548]">
              Planifica mejores ganchos, mantén subtítulos dentro de las zonas seguras y estructura anuncios cortos para Instagram Reels, TikTok y YouTube Shorts. Si quieres convertir estas ideas en videos listos para publicar, Esteban puede encargarse de la edición.
            </p>
          </div>

          <ScriptAndOverlayKit locale="es" />

          <div className="mt-10 max-w-4xl rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 text-sm leading-6 text-[#252a2d]">
            <p>
              Servicios relacionados:{" "}
              <Link href="/es/editor-de-video-corto-para-redes-miami" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">edición de video corto en Miami</Link>,{" "}
              <Link href="/es/editor-de-reels-fort-lauderdale" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">editor de Reels en Fort Lauderdale</Link> y{" "}
              <Link href="/es/areas" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">áreas de servicio</Link>.
            </p>
          </div>
        </Container>
      </section>
      <ContactCta locale="es" />
    </main>
  );
}
