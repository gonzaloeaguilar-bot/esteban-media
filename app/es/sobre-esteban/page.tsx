import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

import { ReelPreview } from "@/components/reel-preview";
import { Container } from "@/components/ui/container";
import {
  languageAlternates,
  spanishProofPrinciples,
  spanishTrustQuestions,
} from "@/lib/spanish-site";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre Esteban Moreno",
  description:
    "Conoce a Esteban Moreno, creador visual en Fort Lauderdale que trabaja en español e inglés para video, fotografía, drone, reels y edición.",
  alternates: {
    canonical: "/es/sobre-esteban",
    languages: languageAlternates["/es/sobre-esteban"],
  },
  openGraph: {
    title: "Sobre Esteban Moreno | Creador visual en South Florida",
    description:
      "Fotografía, video, drone, reels y edición para negocios latinos en Miami, Broward y Fort Lauderdale.",
    url: absoluteUrl("/es/sobre-esteban"),
    locale: "es_US",
    siteName: site.name,
    type: "profile",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": absoluteUrl("/#esteban"),
  name: "Esteban Moreno",
  url: absoluteUrl("/es/sobre-esteban"),
  jobTitle: "Creador visual, videógrafo, fotógrafo y editor",
  worksFor: {
    "@type": "LocalBusiness",
    "@id": absoluteUrl("/#business"),
    name: site.name,
  },
  knowsLanguage: ["Spanish", "English"],
  workLocation: {
    "@type": "Place",
    name: "Fort Lauderdale, Broward County, Miami-Dade",
  },
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
                Un creador visual bilingüe para negocios de South Florida.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Esteban Moreno está basado en Fort Lauderdale y trabaja con
                video, fotografía, drone, reels y postproducción. La ventaja
                para clientes latinos es simple: puedes explicar el proyecto,
                revisar cambios y cerrar entregables en español sin perder
                claridad técnica.
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
                Esta capa ayuda a SEO y GEO, pero también protege la credibilidad:
                no usamos prueba inventada. Cuando haya media real, esta página
                debe apuntar a los reels, fotos, testimonios y ejemplos.
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
