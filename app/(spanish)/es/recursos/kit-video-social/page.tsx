import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ScriptAndOverlayKit } from "@/components/script-and-overlay-kit";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Kit de Guiones y Zonas Seguras de Video",
  description:
    "Plantillas gratuitas de guiones de video anuncios y especificaciones de zonas seguras 9:16 para Reels, TikTok y Shorts.",
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
      "Guiones direct-response y plantillas de zonas seguras 9:16 para edición de video social.",
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
              <li>
                <Link href="/es/guias" className="hover:text-[#9f3c27]">
                  Recursos
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">
                Kit de Video Social
              </li>
            </ol>
          </nav>

          <ScriptAndOverlayKit locale="es" />

          <div className="mt-12 rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 text-sm text-[#252a2d]">
            <p>
              Aplica estas plantillas a tus videos verticales. Si tu equipo necesita grabación en locación o edición personalizada, revisa nuestras{" "}
              <Link
                href="/es/areas"
                className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]"
              >
                áreas de servicio de video en South Florida
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
