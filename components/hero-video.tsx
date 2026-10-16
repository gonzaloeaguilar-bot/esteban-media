import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CinemaHeroMotion } from "@/components/cinema-hero-motion";
import { Container } from "@/components/ui/container";
import { whatsappHref } from "@/lib/packages";
import { QUOTE_CTA_GREETING, quoteCtaLabel } from "@/lib/quote-cta";
import { PACKAGE_PRICES, usd } from "@/lib/pricing";
import { site } from "@/lib/site";

type HeroVideoProps = {
  locale?: "en" | "es";
};

// The H1, verbatim. The display split below is typographic only: the heading
// still reads, and is indexed as, this one sentence.
const H1_EN = "Esteban Moreno Media · Video editing, AI-assisted content, and social production.";
const H1_ES = "Esteban Moreno Media · Video, IA y redes.";

function answerLine(locale: "en" | "es"): string {
  const price = PACKAGE_PRICES.arranque;
  const from = price.kind === "from" ? usd(price.amount) : "";
  return locale === "es"
    ? `Desde ${from} por video · Fort Lauderdale y Miami · WhatsApp`
    : `From ${from} a video · Fort Lauderdale & Miami · WhatsApp`;
}

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
              sizes="100vw"
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

            {/* The answer, in one line: price, area, channel. Price from
                lib/pricing.ts so it cannot drift from the chooser. It sits
                inside the credit, which is bottom-anchored in a fixed-height
                stage, so it does not move anything below the film. */}
            <p className="em-cine__answer">{answerLine(locale)}</p>

            {/* The hero's job is to start a decision, not immediately eject
                every visitor to WhatsApp. The chooser keeps package context
                and price visible; WhatsApp remains available for someone who
                already knows what they need. The work rail directly below is
                the proof, so it does not need a competing hero button. */}
            <div className="em-cine__actions" data-em-hero-actions data-section="hero">
              <Link
                href="#start"
                className="em-cine__cta em-cine__cta--primary"
                data-cta="hero_choose_package"
              >
                {isSpanish ? "Elegir paquete" : "Choose a package"}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <a
                href={whatsappHref(site.phone.e164, QUOTE_CTA_GREETING[locale])}
                target="_blank"
                rel="noopener noreferrer"
                className="em-cine__cta em-cine__cta--ghost"
                data-cta="hero_whatsapp"
              >
                {quoteCtaLabel(locale)}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* The subtitle band. The sentences search and the tests rely on, set as
          a caption under the film rather than a paragraph inside the credit,
          so the first screen stays a title card. */}
      {/* The phone app bar is fixed and lifts itself off the bottom edge with
          a margin that offsetHeight does not report (rail-bottomnav--floating
          margin-block-end). At the top of the page it never auto-hides on
          scroll (AppNav never hides at y<120), so on a short real viewport
          (375x600, 390x664) it clipped the bottom of this caption. The same
          data-em-hides-sticky mechanism that already protects the price fold
          (components/packages-section.tsx) and the closing credit force-hides
          the bar whenever this section is in view, instead of padding every
          brand's dock height into every page. */}
      <section className="em-cine-caption" aria-label={isSpanish ? "Qué hago" : "What I do"} data-em-hides-sticky>
        <Container size="xl">
          <p className="em-cine-caption__lead">
            {isSpanish
              ? "Edición de video y producción de contenido para negocios, agentes y creadores."
              : "Video editing and content production for businesses, agents, and creators."}
          </p>
          {/* The detail folds. The lead sentence above stays visible, so the
              block still says what this is; the long explanation and the
              area list open on tap. Native <details>, so the full text ships
              in the HTML and AI crawlers still read it — collapsed is not
              removed, unmounted would be. This is what pays back the screen
              the new air costs. */}
          <details className="em-cine-caption__more">
          <summary>{isSpanish ? "Cómo funciona" : "How it works"}</summary>
          <p className="em-cine-caption__body">
            {isSpanish ? (
              <>
                Envía el material que ya tienes o una idea que necesita grabación. Trabajo remoto y grabo proyectos seleccionados en{" "}
                <Link href="/es/areas">Fort Lauderdale, Broward, Miami-Dade y Palm Beach</Link>.
                {" "}Si la idea necesita una grabación local, revisa la{" "}
                <Link href="/es/produccion-de-video-fort-lauderdale">producción de video en Fort Lauderdale</Link>.
              </>
            ) : (
              <>
                Send footage you already have or an idea that needs filming. I edit remotely and film selected projects across{" "}
                <Link href="/areas">Fort Lauderdale, Broward, Miami-Dade, and Palm Beach</Link>.
                {" "}For a local shoot, see{" "}
                <Link href="/services/video-production-fort-lauderdale">video production in Fort Lauderdale</Link>.
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
          </details>
        </Container>
      </section>
    </>
  );
}
