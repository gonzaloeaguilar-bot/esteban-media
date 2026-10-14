import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ClientReviews } from "@/components/client-reviews";
import { ContactCta } from "@/components/contact-cta";
import { HeroVideo } from "@/components/hero-video";
import { HomeProjectPath } from "@/components/home-project-path";
import { SignalIntro } from "@/components/signal-intro";
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
import { isConsolidatedPath } from "@/lib/consolidation";
import { site } from "@/lib/site";
import "../../homepage-visual.css";

export const metadata = buildPageMetadata({
  title: spanishSite.title,
  description: spanishSite.homeDescription,
  path: "/es",
  locale: "es",
});

// No links into noindexed pages (SEO/GEO audit 2026-10-10, fix 5).
const nicheLinks = spanishNichePages.filter((page) => !isConsolidatedPath(`/es/${page.slug}`));
// The index is every niche page's inlink, so none of it is removed; only the
// part past the first screen folds into a native <details>, which is in the
// served HTML. It was 3,942px (48% of the phone page) when fully open.
const NICHE_VISIBLE = 9;

function NicheIndexItem({ page }: { page: (typeof nicheLinks)[number] }) {
  return (
    <li>
      <Link href={`/es/${page.slug}`}>
        {page.title}
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </li>
  );
}

export default function SpanishHomePage() {
  return (
    <main className="em-home bg-[#f7f5f1] text-[#101214]">
      <SignalIntro locale="es" />
      <HeroVideo locale="es" />
      <PortfolioTeaser locale="es" />
      <HomeProjectPath locale="es" />
      {/* La prueba y el contacto van JUNTOS justo en la decisión, no una
          mención breve antes del selector y una repetición completa tres
          pantallas más abajo. El dueño, 2026-10-12: "ser convencido" es la
          mitad del encargo — las reseñas son lo que convence, van donde se
          decide, una sola vez. */}
      <ClientReviews locale="es" compact />
      {/* Un solo momento de contacto, no dos casi idénticos (dueño,
          2026-10-13, viendo la página en vivo: "these 2 sections are
          basically the same"). ContactCta ahora lleva la forma calmada de
          HomeContactStrip (frase de promesa, 1-2-3 numerado, tres toques
          directos) como el pedido visible, con el formulario más largo
          como profundidad voluntaria dentro de un <details> nativo. */}
      <ContactCta locale="es" />
      <KeepReading
        id="mas"
        className="em-fold"
        title="Explora más servicios"
        destinations="Servicios a la carta, el proceso, preguntas frecuentes y zonas."
      >
      {/* showGuide=false: los cuatro paquetes y sus precios ya están en el
          PriceSheet del selector. Esto deja los servicios a la carta, el
          proceso de cotización en 3 pasos y las preguntas frecuentes — nada
          de eso repite al selector. */}
      <PackagesSection locale="es" showRealEstatePlans={false} quiet showGuide={false} showALaCarte={false} />

      {/* The five-icon display-card grid ("what I do") was removed — it
          duplicated the chooser directly above. The internal link to every
          service (including diseno-web-fort-lauderdale, which had no other
          homepage inlink) stays, as one compact row instead of a grid of
          cards. */}
      <section className="py-8">
        <Container size="xl">
          <p className="em-eyebrow">Servicios</p>
          <nav aria-label="Todos los servicios" className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {spanishServices.map((service) => {
              const href =
                service.id === "diseno-web"
                  ? "/es/diseno-web-fort-lauderdale"
                  : service.id === "videografia"
                    ? "/es/produccion-de-video-fort-lauderdale"
                  : `/es/servicios#${service.id}`;
              return (
                <Link key={service.id} href={href} className="min-h-11 inline-flex items-center text-[#6a625a] underline underline-offset-4 hover:text-[#a93e29]">
                  {service.shortName}
                </Link>
              );
            })}
          </nav>
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
            {nicheLinks.slice(0, NICHE_VISIBLE).map((page) => (
              <NicheIndexItem key={page.slug} page={page} />
            ))}
          </ul>
          <details className="em-index-more">
            <summary>
              <span>Ver las {nicheLinks.length - NICHE_VISIBLE} páginas restantes</span>
              <span className="em-index-more__chev" aria-hidden="true" />
            </summary>
            <ul className="em-index-compact" role="list">
              {nicheLinks.slice(NICHE_VISIBLE).map((page) => (
                <NicheIndexItem key={page.slug} page={page} />
              ))}
            </ul>
          </details>
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
          <Link href="/es/sobre-esteban">más sobre mí</Link> o sígueme en{" "}
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
      <p className={`em-eyebrow${inverted ? " em-eyebrow--inverted" : ""}`}>
        {eyebrow}
      </p>
      <h2 className="mt-4 em-h2">
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
