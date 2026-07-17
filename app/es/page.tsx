import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, Phone, Send } from "lucide-react";

import { PortfolioTeaser } from "@/components/portfolio-teaser";
import { Container } from "@/components/ui/container";
import {
  spanishNichePages,
  spanishOpportunitySignals,
  spanishPackages,
  spanishServices,
  spanishSite,
  languageAlternates,
} from "@/lib/spanish-site";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Esteban Moreno Media en Español",
  description: spanishSite.description,
  alternates: {
    canonical: "/es",
    languages: languageAlternates["/es"],
  },
  openGraph: {
    title: "Esteban Moreno Media en Español",
    description: spanishSite.description,
    locale: "es_US",
  },
};

export default function SpanishHomePage() {
  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20">
        <Container size="xl">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase text-[#5a6066]">
              En español / Broward / Miami-Dade / Palm Beach
            </p>
            <h1 className="mt-5 max-w-[12ch] font-serif text-5xl leading-none sm:text-6xl lg:text-7xl">
              Edición, contenido con IA y estrategia para negocios que quieren publicar mejor.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
              Esteban Moreno trabaja con emprendedores, agencias, restaurantes,
              real estate y marcas locales. El español es su idioma principal;
              también puede comunicarse en inglés a nivel intermedio.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/es/contacto"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#e85d3e] px-6 text-sm font-medium text-white hover:bg-[#c84a2c]"
              >
                Cotizar proyecto
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/es/servicios"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
              >
                Ver servicios
              </Link>
            </div>

            <dl className="mt-8 grid gap-3 sm:grid-cols-3">
              {spanishOpportunitySignals.map((signal) => {
                const Icon = signal.icon;
                return (
                  <div
                    key={signal.label}
                    className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-4"
                  >
                    <Icon className="size-5 text-[#e85d3e]" aria-hidden="true" />
                    <dt className="mt-3 text-xs uppercase text-[#5a6066]">
                      {signal.label}
                    </dt>
                    <dd className="font-serif text-xl">{signal.value}</dd>
                    <p className="mt-2 text-xs leading-5 text-[#5a6066]">
                      {signal.detail}
                    </p>
                  </div>
                );
              })}
            </dl>
          </div>
        </Container>
      </section>

      <PortfolioTeaser locale="es" />

      <section className="py-12 sm:py-16">
        <Container size="xl">
          <SectionIntro
            eyebrow="Servicios"
            title="Contenido conectado con una meta de negocio."
            lead="La meta es simple: editar con intención, organizar qué publicar y definir con claridad cuándo hace falta producir material nuevo."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {spanishServices.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  id={service.id}
                  key={service.id}
                  className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5"
                >
                  <Icon className="size-6 text-[#e85d3e]" aria-hidden="true" />
                  <h2 className="mt-5 font-serif text-2xl leading-tight">
                    {service.name}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                    {service.description}
                  </p>
                </article>
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
            lead="Explora opciones por tipo de proyecto y zona. Los servicios en locación y cualquier opción aérea se confirman antes de cotizar."
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
          <SectionIntro
            eyebrow="Paquetes"
            title="Tres formas sencillas de empezar."
            lead="Cada opción se cotiza según material, locación, cantidad de entregables, uso de IA y fecha límite."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {spanishPackages.map((item) => (
              <article
                key={item.name}
                className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6"
              >
                <p className="text-xs uppercase text-[#5a6066]">{item.name}</p>
                <h2 className="mt-3 font-serif text-4xl">{item.price}</h2>
                <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-12 sm:pb-16">
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
                  Incluye fecha, ciudad, tipo de negocio, entregables y links de
                  referencia. Si no sabes exactamente qué necesitas, manda la
                  meta del proyecto.
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
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#e85d3e] px-5 text-sm font-medium text-white hover:bg-[#c84a2c]"
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
