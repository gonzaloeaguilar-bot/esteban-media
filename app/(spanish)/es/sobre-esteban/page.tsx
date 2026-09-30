import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  PlaySquare,
  Send,
  ShieldCheck,
} from "lucide-react";

import { OnSetMedia } from "@/components/on-set-media";
import { Container } from "@/components/ui/container";
import { buildProfilePageJsonLd } from "@/lib/entity-schema";
import { spanishProofPrinciples, spanishTrustQuestions } from "@/lib/spanish-site";
import { buildPageMetadata } from "@/lib/site-metadata";
import { site } from "@/lib/site";

const aboutDescription =
  "Conoce a Esteban Moreno, editor de video y creador de contenido en Fort Lauderdale, con atención en español y trabajo publicado en su portafolio.";

export const metadata = buildPageMetadata({
  title: "Sobre Esteban Moreno",
  description: aboutDescription,
  path: "/es/sobre-esteban",
  locale: "es",
  type: "profile",
});

const profilePageJsonLd = buildProfilePageJsonLd({
  path: "/es/sobre-esteban",
  name: "Sobre Esteban Moreno",
  description: aboutDescription,
  language: "es-US",
});

export default function SpanishAboutPage() {
  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profilePageJsonLd),
        }}
      />
      <section className="py-12 sm:py-16">
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_.85fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Sobre Esteban
              </p>
              <h1 className="mt-4 max-w-3xl font-serif em-display">
                Esteban Moreno: atención directa en español, con mirada creativa y de negocio.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Esteban Moreno López trabaja públicamente como Esteban Moreno y
                es el fundador de Esteban Moreno Media en Fort Lauderdale.
                El servicio publicado se enfoca en edición de video, contenido
                asistido por IA, planificación para redes y producción definida
                según cada proyecto remoto o cobertura en{" "}
                <Link
                  href="/es/areas"
                  className="underline underline-offset-4 hover:text-[#9f3c27]"
                >
                  tres condados como área de servicio
                </Link>{" "}
                en South Florida.
              </p>
              <p className="mt-4 max-w-2xl leading-7 text-[#252a2d]">
                Su{" "}
                <Link
                  href="/es/portafolio"
                  className="underline underline-offset-4 hover:text-[#9f3c27]"
                >
                  portafolio público
                </Link>{" "}
                conecta cada proyecto seleccionado con los
                créditos disponibles y la fuente original del video. El español
                es su idioma principal y también puede mantener comunicación de
                trabajo en inglés intermedio.
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
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/es/contacto"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Hablar del proyecto
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <a
                  href={site.instagram}
                  rel="me"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  <Send className="size-4" aria-hidden="true" />
                  Instagram
                </a>
                <a
                  href={site.youtube}
                  rel="me"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  <PlaySquare className="size-4" aria-hidden="true" />
                  YouTube
                </a>
              </div>
            </div>
            <OnSetMedia
              primaryAlt="Esteban Moreno grabando con una cámara Canon en un set con iluminación"
              primaryCaption="Detrás de cámara · Fort Lauderdale"
              secondaryAlt="Esteban Moreno trabajando con el equipo en un set de producción de video"
              secondaryCaption="En el set"
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
                testimonios y ejemplos correspondientes.
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
