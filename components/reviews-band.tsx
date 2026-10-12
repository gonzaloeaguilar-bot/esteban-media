"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

export type BandQuote = { author: string; quote: string; publishedAt?: string };

/**
 * The reviews band, art-directed.
 *
 * It was a white rounded card on cream — the visual language of a review
 * plugin, identical on a dentist's site, in the middle of a dark cinematic
 * page. Art-direction pass, 2026-10-12: "it is a trust widget, not a section
 * of his site... the five stars are the loudest graphic on the page and they
 * are stock."
 *
 * So: full-bleed ink, the six real reel posters drifting behind a veil, and
 * the rating set as the largest numeral on the site. Three things were
 * deleted rather than restyled — the stock stars (they carry nothing the
 * "5.0" does not), the green "verified" pill (green is Google's colour, not
 * his, and the word carries it), and the caption repeating the link.
 *
 * WHAT MOVES, and for how long. Each fires once, on arrival, and stops:
 * the wall drifts up 60px over 2.4s; the numeral counts to its real value
 * over 900ms; one cream highlight sweeps across the glyphs over 1.1s. An
 * animation that never ends is wallpaper. Under prefers-reduced-motion the
 * band arrives settled, the numeral renders at its value, nothing sweeps —
 * the scale and the dark are the design, the timing is only the entrance.
 */
export function ReviewsBand({
  eyebrow,
  heading,
  rating,
  reviewCount,
  quotes,
  action,
  sourceUrl,
  posters,
  locale,
}: {
  eyebrow: string;
  heading: string;
  rating: number;
  reviewCount: number;
  quotes: BandQuote[];
  action: string;
  sourceUrl: string;
  posters: string[];
  locale: "en" | "es";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  const [display, setDisplay] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setShown(true);
      setDisplay(rating);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setShown(true);
          io.disconnect();
          const start = performance.now();
          const DURATION = 900;
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / DURATION);
            // ease-out, so it lands softly on the real number
            setDisplay(rating * (1 - Math.pow(1 - p, 3)));
            if (p < 1) requestAnimationFrame(tick);
            else setDisplay(rating);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rating]);

  return (
    <section
      ref={ref}
      aria-labelledby="client-reviews-heading"
      className="em-revband"
      data-shown={shown ? "true" : undefined}
    >
      <div className="em-revband__wall" aria-hidden="true">
        {posters.map((src) => (
          <span key={src} className="em-revband__tile">
            <Image src={src} alt="" fill sizes="33vw" className="object-cover" />
          </span>
        ))}
      </div>
      <span className="em-revband__veil" aria-hidden="true" />

      <div className="em-revband__inner">
        <p className="em-eyebrow em-eyebrow--inverted">{eyebrow}</p>
        <h2 id="client-reviews-heading" className="em-revband__h">
          {heading}
        </h2>

        <p className="em-revband__figure">
          <span className="em-revband__num">
            {(display ?? rating).toFixed(1)}
          </span>
        </p>
        <p className="em-revband__meta">
          {locale === "es"
            ? `${reviewCount} reseñas públicas · verificadas en Google`
            : `${reviewCount} public reviews · verified on Google`}
        </p>

        <ul className="em-revband__quotes">
          {quotes.map((q) => (
            <li key={q.author}>
              <blockquote>{q.quote}</blockquote>
              <cite>{q.author}</cite>
            </li>
          ))}
        </ul>

        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="reviews_band_google"
          data-section="client_reviews"
          className="em-revband__cta"
        >
          {action}
          <ExternalLink className="size-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
