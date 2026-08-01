import Link from "next/link";
import { ArrowRight, WandSparkles, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Producción de Video para Firmas de Abogados en Miami",
  description:
    "Marketing de video para firmas de abogados, videos de perfil de abogados, postproducción de historias de casos y edición de testimonios para prácticas legales en Miami.",
  path: "/es/servicios/produccion-video-firmas-abogados-miami",
  locale: "es",
});

export default function LawFirmVideoProductionMiamiSpanishPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": absoluteUrl("/es/servicios/produccion-video-firmas-abogados-miami#service"),
        name: "Producción de Video para Firmas de Abogados en Miami",
        description:
          "Edición de testimonios de abogados, narración de marcas legales, postproducción de videos de resumen de socios y marketing de video social en Miami.",
        provider: {
          "@type": "LocalBusiness",
          "@id": absoluteUrl("/#business"),
          name: site.name,
          url: absoluteUrl("/"),
          telephone: site.phone.e164,
        },
        areaServed: "Downtown Miami / Financial District",
        serviceType: "Producción de video para firmas de abogados",
        subjectOf: {
          "@type": "VideoObject",
          name: "Portafolio de Producción de Video Legal",
          description: "Ejemplos de nuestro trabajo de edición y producción de video para bufetes de abogados.",
          thumbnailUrl: absoluteUrl("/images/legal-video-thumbnail.jpg"),
          uploadDate: "2023-01-01T08:00:00+08:00",
          contentUrl: absoluteUrl("/videos/legal-portfolio.mp4"),
        }
      },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20">
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
                <Link href="/es/servicios" className="hover:text-[#9f3c27]">
                  Servicios
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">
                Video para Firmas de Abogados
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Miami / Marketing de Video Legal
              </p>
              <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-none sm:text-6xl">
                Producción de Video para Firmas de Abogados en Miami.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Construya confianza y autoridad con perfiles cinematográficos de socios, ediciones de testimonios de clientes y videos legales educativos.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/es/contacto"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#c84a2c] px-6 text-sm font-medium text-white hover:bg-[#a93e29]"
                >
                  Editar Videos Legales
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <WandSparkles className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">Prueba de video legal</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Nuestro proyecto de portafolio <strong>My D&apos;ler</strong> demuestra producción visual de marcas corporativas y edición de nivel legal.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-12 sm:pb-16">
        <Container size="xl">
          <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-medium uppercase text-[#5a6066]">
                  Comenzar
                </p>
                <h2 className="mt-3 font-serif text-4xl">
                  ¿Filmando contenido legal para su firma en Miami?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Envíe material de archivo crudo de abogados para edición profesional.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#c84a2c] px-5 text-sm font-medium text-white hover:bg-[#a93e29]"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  Email
                </a>
                <a
                  href={site.phone.href}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  Llamar
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
