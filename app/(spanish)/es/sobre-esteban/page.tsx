import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

import { ReelPreview } from "@/components/reel-preview";
import { Container } from "@/components/ui/container";
import { spanishProofPrinciples, spanishTrustQuestions } from "@/lib/spanish-site";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Sobre Esteban Moreno",
  description:
    "Conoce a Esteban Moreno, comunicador audiovisual en Fort Lauderdale enfocado en edición, contenido con IA, estrategia para redes y producción por proyecto.",
  path: "/es/sobre-esteban",
  locale: "es",
  type: "profile",
});

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": absoluteUrl("/#esteban"),
  name: "Esteban Moreno",
  url: absoluteUrl("/es/sobre-esteban"),
  jobTitle: "Comunicador audiovisual, editor de video y creador de contenido",
  worksFor: {
    "@type": "LocalBusiness",
    "@id": absoluteUrl("/#business"),
    name: site.name,
  },
  knowsLanguage: ["Spanish", "English"],
  workLocation: [
    { "@type": "City", name: "Fort Lauderdale, Florida" },
    { "@type": "AdministrativeArea", name: "Broward County, Florida" },
    { "@type": "AdministrativeArea", name: "Miami-Dade County, Florida" },
    { "@type": "AdministrativeArea", name: "Palm Beach County, Florida" },
  ],
  sameAs: [site.instagram],
};

export default function SpanishAboutPage() {
  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd),
        }}
      />
      <section className="py-12 sm:py-16">
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_.85fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Sobre Esteban
              </p>
              <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-none sm:text-6xl">
                Atención directa en español, con mirada creativa y de negocio.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Esteban estudió Comunicación Audiovisual en la Universidad de
                Medellín. Su experiencia incluye edición, contenido para redes,
                real estate, restaurantes, deportes y fotografía de producto.
                Además, lideró durante cinco años una marca en línea, experiencia
                que hoy aporta a su forma de entender las metas del cliente.
              </p>
              <div className="mt-8 grid gap-3">
                {spanishProofPrinciples.map((principle) => (
                  <div
                    key={principle}
                    className="flex gap-3 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-4"
                  >
                    <ShieldCheck
                      className="mt-0.5 size-5 shrink-0 text-[#1a9fa3]"
                      aria-hidden="true"
                    />
                    <p className="text-sm leading-6 text-[#252a2d]">
                      {principle}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                href="/es/contacto"
                className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#e85d3e] px-6 text-sm font-medium text-white hover:bg-[#c84a2c]"
              >
                Cotizar en español
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <ReelPreview
              title="Detrás de cámara"
              location="Fort Lauderdale"
              label="Prueba real pendiente"
            />
          </div>
        </Container>
      </section>

      <section className="border-t border-[#ddd4c8] py-12 sm:py-16">
        <Container size="xl">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1fr]">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Confianza
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight">
                Lo que falta publicar también queda claro.
              </h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                La credibilidad empieza con hechos verificables: no usamos prueba
                inventada. Cuando haya material real, esta página mostrará los
                reels, fotos, testimonios y ejemplos correspondientes.
              </p>
            </div>
            <div className="grid gap-3">
              {spanishTrustQuestions.map((item) => (
                <article
                  key={item.question}
                  className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5"
                >
                  <h3 className="flex gap-3 font-serif text-2xl">
                    <CheckCircle2
                      className="mt-1 size-5 shrink-0 text-[#e85d3e]"
                      aria-hidden="true"
                    />
                    {item.question}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
