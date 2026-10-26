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
 * THE REVIEWS ROLL LIKE END CREDITS. Owner, 2026-10-12: "the reviews should
 * just show like end credits rolling down." It is the right form for a video
 * editor: the people who worked on the thing, named, scrolling past. All six
 * real reviews run, not an edited two — credits do not pick favourites.
 *
 * The roll is the ONE exception to this file's no-endless-motion rule, because
 * a credit roll that stops is not a credit roll. It is bounded another way:
 * it runs only while the band is on screen and is PAUSED the moment it is
 * not, so it never animates behind your back, and reduced motion gets a plain
 * static list with no roll at all.
 *
 * THE RATING IS STATIC. Owner, 2026-10-12: "should always show the overall
 * rating, that number should not change." It renders at its real value on
 * first paint and never counts up — motion plays ON the glyphs (the shine
 * sweep), never a change OF the number itself.
 *
 * WHAT MOVES, and for how long. Each fires once, on arrival, and stops:
 * the wall drifts up 60px over 2.4s; one cream highlight sweeps across the
 * glyphs over 1.1s. An animation that never ends is wallpaper. Under
 * prefers-reduced-motion the band arrives settled, nothing sweeps —
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
  posterAlts,
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
  /** One description per poster, same order. */
  posterAlts?: string[];
  locale: "en" | "es";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  const [rolling, setRolling] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setShown(true);
      return;
    }

    /* The roll runs ONLY while the band is on screen. `shown` latches on for
       the one-shot entrance; this does not — a credit roll turning behind
       your back for the rest of the session is the wallpaper this file keeps
       arguing against. */
    const live = new IntersectionObserver(
      ([entry]) => setRolling(entry.isIntersecting),
      { threshold: 0 },
    );
    live.observe(el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      live.disconnect();
    };
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="client-reviews-heading"
      className="em-revband"
      data-shown={shown ? "true" : undefined}
      data-live={rolling ? "true" : undefined}
    >
      <div className="em-revband__wall" aria-hidden="true">
        {posters.map((src, i) => (
          <span key={src} className="em-revband__tile">
            <Image src={src} alt={posterAlts?.[i] ?? ""} fill sizes="33vw" className="object-cover" />
          </span>
        ))}
      </div>
      <span className="em-revband__veil" aria-hidden="true" />

      <div className="em-revband__inner">
        {/* The rating stays prominent, but the opening line frames it as real
            client feedback rather than asking a small, changing review count
            to carry the whole section. */}
        <p className="em-eyebrow em-eyebrow--inverted">{eyebrow}</p>

        <p className="em-revband__figure">
          <span className="em-revband__num">{rating.toFixed(1)}</span>
        </p>
        <h2 id="client-reviews-heading" className="em-revband__h">
          {heading}
        </h2>
        <p className="em-revband__meta">
          {locale === "es"
            ? `Calificación de ${rating.toFixed(1)} · ${reviewCount} reseñas públicas en Google`
            : `${rating.toFixed(1)} rating · ${reviewCount} public reviews on Google`}
        </p>

        <div className="em-revband__roll" data-rolling={rolling ? "true" : undefined}>
          {/* The track is rendered TWICE so the loop has no seam: when the
              first copy has travelled its own height the second is exactly
              where the first began, and the animation restarts invisibly. */}
          <div className="em-revband__track">
            {[0, 1].map((copy) => (
              <ul key={copy} aria-hidden={copy === 1 ? "true" : undefined}>
                {quotes.map((q) => (
                  <li key={`${copy}-${q.author}`}>
                    <blockquote>{q.quote}</blockquote>
                    <cite>{q.author}</cite>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

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
