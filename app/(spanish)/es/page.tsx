import Link from "next/link";
import { ArrowRight, Mail, Phone, Send } from "lucide-react";

import { HeroVideo } from "@/components/hero-video";
import { PortfolioTeaser } from "@/components/portfolio-teaser";
import { Container } from "@/components/ui/container";
import {
  spanishNichePages,
  spanishServices,
  spanishSite,
} from "@/lib/spanish-site";
import { buildPageMetadata } from "@/lib/site-metadata";
import { site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: spanishSite.title,
  description: spanishSite.description,
  path: "/es",
  locale: "es",
});

export default function SpanishHomePage() {
  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <HeroVideo locale="es" />

      <PortfolioTeaser locale="es" />

      <section className="py-12 sm:py-16">
        <Container size="xl">
          <SectionIntro
            eyebrow="Servicios"
            title="Contenido conectado con una meta de negocio."
            lead="La meta es simple: editar con intención, organizar qué publicar y definir con claridad cuándo hace falta producir material nuevo."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {spanishServices.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.id}
                  href={`/es/servicios#${service.id}`}
                  className="group rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5 transition hover:-translate-y-0.5 hover:border-[#e85d3e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e85d3e]"
                  aria-label={`Explorar ${service.name}`}
                >
                  <Icon className="size-6 text-[#e85d3e]" aria-hidden="true" />
                  <h2 className="mt-5 font-serif text-2xl leading-tight">
                    {service.name}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                    {service.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]">
                    Explorar este servicio
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-y border-[#ddd4c8] bg-[#101214] py-12 text-[#f6f1ea] sm:py-16">
        <Container size="xl">
          <SectionIntro
            eyebrow="Servicios y ubicaciones"
            title="Encuentra el servicio que encaja con tu proyecto."
            lead="Explora servicios confirmados y rutas heredadas por tipo de proyecto. Las páginas de fotografía y drone explican que su disponibilidad sigue pendiente de confirmación."
            inverted
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {spanishNichePages.map((page) => {
              const Icon = page.icon;
              return (
                <Link
                  key={page.slug}
                  href={`/es/${page.slug}`}
                  className="rounded-lg border border-white/10 bg-white/[0.04] p-5 transition-colors hover:bg-white/[0.08]"
                >
                  <Icon className="size-5 text-[#ffb49e]" aria-hidden="true" />
                  <h2 className="mt-4 font-serif text-2xl">{page.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-[#c9c1b8]">
                    {page.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm text-[#ffb49e]">
                    Abrir página
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container size="xl">
          <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
            <p className="text-xs font-medium uppercase text-[#5a6066]">
              Contacto
            </p>
            <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="font-serif text-4xl">
                  Manda un brief corto en español.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Comparte la meta, el condado, el material disponible, el uso
                  previsto y links de referencia. No hace falta asumir formatos
                  ni una forma de trabajo específica.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/es/sobre-esteban"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  Sobre Esteban
                </Link>
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
                <a
                  href={site.instagram}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  <Send className="size-4" aria-hidden="true" />
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

function SectionIntro({
  eyebrow,
  title,
  lead,
  inverted = false,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  inverted?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <p
        className={`text-xs font-medium uppercase ${
          inverted ? "text-[#ffb49e]" : "text-[#5a6066]"
        }`}
      >
        {eyebrow}
      </p>
      <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
        {title}
      </h2>
      <p
        className={`mt-4 text-base leading-7 ${
          inverted ? "text-[#c9c1b8]" : "text-[#252a2d]"
        }`}
      >
        {lead}
      </p>
    </div>
  );
}
