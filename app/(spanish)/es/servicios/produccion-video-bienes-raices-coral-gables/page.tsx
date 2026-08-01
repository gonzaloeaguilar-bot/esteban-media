import Link from "next/link";
import { ArrowRight, Building2, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Video de Bienes Raíces Coral Gables",
  description:
    "Edición de video de bienes raíces de lujo y formateo de recorridos para agentes inmobiliarios y propiedades en Coral Gables y el sur de Miami.",
  path: "/es/servicios/produccion-video-bienes-raices-coral-gables",
  locale: "es",
});

export default function RealEstateVideoCoralGablesSpanishPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": absoluteUrl("/es/servicios/produccion-video-bienes-raices-coral-gables#service"),
        name: "Video de Bienes Raíces Coral Gables",
        description:
          "Edición de video de propiedades de lujo, formateo de recorridos y Reels sociales para agentes de Coral Gables.",
        provider: {
          "@type": "LocalBusiness",
          "@id": absoluteUrl("/#business"),
          name: site.name,
          url: absoluteUrl("/"),
          telephone: site.phone.e164,
        },
        areaServed: "Coral Gables / Miami-Dade",
        serviceType: "Producción de video de bienes raíces",
        subjectOf: {
          "@type": "VideoObject",
          name: "Portafolio de Producción de Video de Bienes Raíces",
          description: "Ejemplos de nuestro trabajo de edición y producción de video de bienes raíces.",
          thumbnailUrl: absoluteUrl("/images/real-estate-video-thumbnail.jpg"),
          uploadDate: "2023-01-01T08:00:00+08:00",
          contentUrl: absoluteUrl("/videos/real-estate-portfolio.mp4"),
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
                Bienes Raíces Coral Gables
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Coral Gables / Bienes Raíces de Lujo
              </p>
              <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-none sm:text-6xl">
                Edición de Video de Bienes Raíces de Lujo en Coral Gables.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Edición de recorridos de propiedades de alta gama, etalonaje y formateo de Reels verticales para agentes en Coral Gables.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/es/contacto"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#c84a2c] px-6 text-sm font-medium text-white hover:bg-[#a93e29]"
                >
                  Editar Video de Propiedad
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Building2 className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">Prueba de propiedad de lujo</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Nuestro proyecto de portafolio <strong>Homeowners</strong> demuestra la edición y guionización de videos de bienes raíces publicados.
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
                  ¿Listando una propiedad de lujo en Coral Gables?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Envíe clips de recorrido crudos para edición.
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
