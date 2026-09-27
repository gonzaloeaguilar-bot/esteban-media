import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";

import { CinemaHeroMotion } from "@/components/cinema-hero-motion";
import { Container } from "@/components/ui/container";

type HeroVideoProps = {
  locale?: "en" | "es";
};

// The H1, verbatim. The display split below is typographic only: the heading
// still reads, and is indexed as, this one sentence.
const H1_EN = "Esteban Moreno Media · Video editing, AI-assisted content, and social production.";
const H1_ES = "Esteban Moreno Media · Video, IA y redes.";

/**
 * The viewfinder.
 *
 * A videographer's home page opens inside his own camera: Esteban's real
 * on-set clip, full-bleed on a phone and framed as a tall monitor on desktop,
 * with a viewfinder HUD (corner guides, REC, a running timecode) and the title
 * set as an opening credit. On scroll the credit clears while the footage keeps
 * rolling — see CinemaHeroMotion for the only moving parts.
 *
 * The poster is a real <Image priority> so it is the LCP element and what
 * no-JS and reduced-motion visitors see. The clip has no `autoplay`: it is
 * started from script only when motion is allowed and the hero is on screen.
 */
export function HeroVideo({ locale = "en" }: HeroVideoProps) {
  const isSpanish = locale === "es";
  const [brand, rest] = (isSpanish ? H1_ES : H1_EN).split(" · ");
  const posterAlt = isSpanish
    ? "Esteban Moreno revisando una toma en su cámara Canon"
    : "Esteban Moreno checking a shot on his Canon camera";

  return (
    <>
      <section
        id="em-cine-hero"
        aria-labelledby="hero-heading"
        className="em-cine"
      >
        <div className="em-cine__stage">
          <div className="em-cine__frame">
            <Image
              src="/about/esteban-on-set-frame.jpg"
              alt={posterAlt}
              fill
              priority
              sizes="(min-width: 1024px) 460px, 100vw"
              className="em-cine__poster"
            />
            <video
              className="em-cine__video"
              muted
              loop
              playsInline
              preload="metadata"
              poster="/about/esteban-on-set-frame.jpg"
              aria-hidden="true"
              tabIndex={-1}
            >
              <source src="/about/esteban-on-set.mp4" type="video/mp4" />
            </video>

            <div className="em-cine__hud" aria-hidden="true">
              <span className="em-cine__corner em-cine__corner--tl" />
              <span className="em-cine__corner em-cine__corner--tr" />
              <span className="em-cine__corner em-cine__corner--bl" />
              <span className="em-cine__corner em-cine__corner--br" />
              <span className="em-cine__rec">
                <span className="em-cine__rec-dot" />
                REC
              </span>
              <CinemaHeroMotion targetId="em-cine-hero" />
            </div>
          </div>

          <span className="em-cine__bar em-cine__bar--top" aria-hidden="true" />
          <span className="em-cine__bar em-cine__bar--bottom" aria-hidden="true" />

          <div className="em-cine__credit">
            <p className="em-cine__eyebrow">
              {isSpanish ? "Contenido · Producción · Digital" : "Content · Production · Digital"}
            </p>
            <h1 id="hero-heading" className="em-cine__title">
              <span className="em-cine__brand">
                {/* The spaces are real text nodes: without them the heading's
                    accessible name and indexed text read "EstebanMorenoMedia". */}
                {brand.split(" ").map((word, i, words) => (
                  <span key={word} className="em-cine__brand-line">
                    <span>{word}</span>
                    {i < words.length - 1 ? " " : null}
                  </span>
                ))}
              </span>
              <span className="sr-only"> · </span>
              <span className="em-cine__what">{rest}</span>
            </h1>
            <p className="em-cine__tagline">
              {isSpanish ? "Contenido que mueve tu marca." : "Content that moves your brand."}
            </p>

            <div className="em-cine__actions" data-em-hero-actions>
              <a
                href={isSpanish ? "#paquetes" : "#packages"}
                className="em-cine__cta em-cine__cta--primary"
                data-em-cta="hero_packages"
              >
                {isSpanish ? "Ver paquetes y precios" : "See packages & prices"}
                <ArrowDown className="size-4" aria-hidden="true" />
              </a>
              <Link
                href={isSpanish ? "/es/portafolio" : "/portfolio"}
                className="em-cine__cta em-cine__cta--ghost"
              >
                {isSpanish ? "Ver portafolio" : "View portfolio"}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The subtitle band. The sentences search and the tests rely on, set as
          a caption under the film rather than a paragraph inside the credit,
          so the first screen stays a title card. */}
      <section className="em-cine-caption" aria-label={isSpanish ? "Qué hace Esteban" : "What Esteban does"}>
        <Container size="xl">
          <p className="em-cine-caption__lead">
            {isSpanish
              ? "Apoyo creativo claro, desde tu material hasta contenido listo para publicar."
              : "Clear creative support, from your footage to ready-to-publish content."}
          </p>
          <p className="em-cine-caption__body">
            {isSpanish ? (
              <>
                Edición de video, contenido asistido por IA y planificación para redes. Si necesitas grabación local, revisa las{" "}
                <Link href="/es/areas">áreas de servicio</Link>
                . Consulta nuestras{" "}
                <Link href="/es/guias">guías prácticas de video</Link>{" "}
                para preparar el contenido.
              </>
            ) : (
              <>
                Video editing, AI-assisted content, and social planning for businesses with footage or a new idea. For local filming, review the{" "}
                <Link href="/areas">service area</Link>
                . Browse our{" "}
                <Link href="/guides">practical video guides</Link>{" "}
                before production.
              </>
            )}
          </p>
          <ul className="em-cine-caption__facts" role="list">
            {(isSpanish
              ? ["Fort Lauderdale", "Broward · Miami-Dade", "Español primero", "Remoto + local"]
              : ["Fort Lauderdale", "Broward · Miami-Dade", "Spanish-first", "Remote + local"]
            ).map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
