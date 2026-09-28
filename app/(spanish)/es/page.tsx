import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ClientReviews } from "@/components/client-reviews";
import { HeroVideo } from "@/components/hero-video";
import { HomeAuthorityHub } from "@/components/home-authority-hub";
import { EditBayIntro } from "@/components/edit-bay-intro";
import { CameraPlayground } from "@/components/camera-playground";
import { PackagesSection, ClosingCredits } from "@/components/packages-section";
import { KeepReading } from "@/components/keep-reading";
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
  description: spanishSite.homeDescription,
  path: "/es",
  locale: "es",
});

export default function SpanishHomePage() {
  return (
    <main className="bg-[#f7f5f1] text-[#101214]">
      <EditBayIntro locale="es" />
      <HeroVideo locale="es" />
      <CameraPlayground locale="es" />
      <PackagesSection locale="es" />
      <PortfolioTeaser locale="es" />
      <ClientReviews locale="es" />
      <KeepReading
        id="mas"
        title="¿Quieres ver todo?"
        destinations="Servicios, zonas, guías y las 70 páginas por nicho."
      >
      <HomeAuthorityHub locale="es" />

      <section className="py-12 sm:py-16">
        <Container size="xl">
          <SectionIntro
            eyebrow="Servicios"
            title="Contenido conectado con una meta de negocio."
            lead="La meta es simple: editar con intención, organizar qué publicar y definir con claridad cuándo hace falta producir material nuevo."
          />
          <div className="em-shelf mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {spanishServices.map((service) => {
              const Icon = service.icon;
              const href =
                service.id === "diseno-web"
                  ? "/es/diseno-web-fort-lauderdale"
                  : `/es/servicios#${service.id}`;
              return (
                <Link
                  key={service.id}
                  href={href}
                  className="group flex h-full flex-col rounded-xl border border-[#e4e0da] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#a93e29] hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a93e29]"
                  aria-label={`Explorar ${service.name}`}
                >
                  <Icon className="size-7 text-[#a93e29]" aria-hidden="true" />
                  <h2 className="mt-4 text-lg font-bold leading-tight tracking-tight">
                    {service.shortName}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#4d5358]">
                    {service.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#a93e29]">
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

      {/* Every niche page stays linked from the home — the internal-link graph
          does not change — but as a compact index, not 71 display cards. */}
      <section className="bg-[#0b0c0d] py-12 text-[#f6f1ea] sm:py-16">
        <Container size="xl">
          <SectionIntro
            eyebrow="Servicios y ubicaciones"
            title="Encuentra el servicio que encaja con tu proyecto."
            lead="Explora servicios disponibles y páginas por tipo de proyecto. Cuando una opción necesita confirmación, la página lo explica con claridad antes de que pidas una cotización."
            inverted
          />
          <ul className="em-index-compact" role="list">
            {spanishNichePages.map((page) => (
              <li key={page.slug}>
                <Link href={`/es/${page.slug}`}>
                  {page.title}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      </KeepReading>

      <ClosingCredits locale="es">
        <p>
          Comparte la meta, el condado, el{" "}
          <Link href="/es/calculadora">material disponible</Link>, el uso
          previsto y links de referencia. Consulta las{" "}
          <Link href="/es/areas">áreas de servicio</Link> si necesitas
          grabación local, las{" "}
          <Link href="/es/guias">guías prácticas de video</Link>, conoce{" "}
          <Link href="/es/sobre-esteban">a Esteban</Link> o síguelo en{" "}
          <a href={site.instagram}>Instagram</a>.
        </p>
      </ClosingCredits>
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
      <h2 className="mt-4 text-4xl font-bold leading-[1.04] tracking-tight sm:text-5xl">
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
