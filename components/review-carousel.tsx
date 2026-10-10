"use client";

import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import type { GoogleReview } from "@/lib/client-reviews";

type Locale = "en" | "es";

const copy = {
  en: {
    region: "Client reviews",
    prev: "Previous review",
    next: "Next review",
    slide: (index: number, total: number) => `Review ${index} of ${total}`,
    dot: (index: number) => `Go to review ${index}`,
    hint: "Swipe, or use the arrows to read the rest.",
  },
  es: {
    region: "Reseñas de clientes",
    prev: "Reseña anterior",
    next: "Reseña siguiente",
    slide: (index: number, total: number) => `Reseña ${index} de ${total}`,
    dot: (index: number) => `Ir a la reseña ${index}`,
    hint: "Desliza o usa las flechas para leer el resto.",
  },
} as const;

/** A long month+year for the visible-to-AT review date, never a raw ISO stamp. */
function formatPublished(publishedAt: string, locale: Locale): string {
  const date = new Date(`${publishedAt}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return publishedAt;
  return date.toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}

function StarRow({ className = "size-3.5" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className="flex items-center gap-0.5 text-[#e85d3e]"
    >
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} className={`${className} fill-current`} />
      ))}
    </span>
  );
}

/**
 * The review carousel. A horizontally scrolling, scroll-snapped track of the
 * verbatim Google reviews — one card at a time, with prev/next arrows, a dot
 * rail that doubles as a position indicator, and arrow-key support when the
 * track has focus.
 *
 * There is no autoplay. Social proof that moves on its own steals reading time
 * from a visitor mid-sentence and is exactly what `prefers-reduced-motion`
 * users hate; motion here is only ever the visitor's own.
 *
 * Because the page is statically generated, this is a client component on
 * purpose: the scroll position cannot be known at build time. Everything it
 * needs is passed in as props so the parent stays a server component.
 */
export function ReviewCarousel({
  reviews,
  locale = "en",
  sourceUrl,
  sourceLabel,
}: {
  reviews: GoogleReview[];
  locale?: Locale;
  sourceUrl: string;
  sourceLabel: string;
}) {
  const t = copy[locale];
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(reviews.length <= 1);

  /** The slide nearest the centre of the viewport, plus the edge flags. */
  const syncFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.children) as HTMLElement[];
    if (slides.length === 0) return;

    const centre = track.scrollLeft + track.clientWidth / 2;
    let nearest = 0;
    let smallest = Number.POSITIVE_INFINITY;
    slides.forEach((slide, index) => {
      const distance = Math.abs(
        slide.offsetLeft + slide.clientWidth / 2 - centre,
      );
      if (distance < smallest) {
        smallest = distance;
        nearest = index;
      }
    });
    setActive(nearest);

    const maxScroll = track.scrollWidth - track.clientWidth;
    setAtStart(track.scrollLeft <= 1);
    setAtEnd(track.scrollLeft >= maxScroll - 1);
  }, []);

  useEffect(() => {
    syncFromScroll();
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(syncFromScroll);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [syncFromScroll]);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[index] as HTMLElement | undefined;
    if (!slide) return;
    // Honour the visitor's motion preference; smooth-scrolling a carousel is
    // motion whether or not it is "useful".
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({
      left: slide.offsetLeft,
      behavior: reduce ? "auto" : "smooth",
    });
  }, []);

  const step = useCallback(
    (delta: number) => {
      const next = Math.min(
        Math.max(active + delta, 0),
        Math.max(reviews.length - 1, 0),
      );
      scrollToIndex(next);
    },
    [active, reviews.length, scrollToIndex],
  );

  if (reviews.length === 0) return null;

  const multiple = reviews.length > 1;

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={t.region}
      className="relative"
    >
      <ul
        ref={trackRef}
        className="em-carousel-track"
        aria-label={`${t.region} — ${reviews.length}`}
        tabIndex={multiple ? 0 : -1}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            step(-1);
          } else if (event.key === "ArrowRight") {
            event.preventDefault();
            step(1);
          }
        }}
      >
        {reviews.map((review, index) => (
          <li
            key={`${review.author}-${review.publishedAt}`}
            className="em-carousel-slide"
            role="group"
            aria-roledescription="slide"
            aria-label={t.slide(index + 1, reviews.length)}
          >
            <figure className="mx-auto flex w-full max-w-3xl flex-col rounded-xl border border-[#ddd4c8] bg-white p-6 shadow-[0_1px_0_rgba(16,18,20,0.03)] sm:p-8">
              <Quote aria-hidden="true" className="size-6 shrink-0 text-[#e85d3e]" />
              <blockquote className="mt-4 grow whitespace-pre-line font-serif text-lg leading-relaxed text-[#22262a] sm:text-xl">
                {review.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-[#ece5da] pt-4">
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f6f1ea] font-serif text-base text-[#101214]"
                >
                  {review.author.trim().charAt(0).toUpperCase()}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-[#101214]">
                    {review.author}
                  </span>
                  <span className="mt-0.5 flex items-center gap-2 text-xs text-[#5a6066]">
                    <StarRow />
                    <span className="sr-only">
                      {`${review.rating} out of 5, ${formatPublished(review.publishedAt, locale)}`}
                    </span>
                    <time dateTime={review.publishedAt} className="sr-only">
                      {formatPublished(review.publishedAt, locale)}
                    </time>
                  </span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {multiple && (
        <p aria-live="polite" className="sr-only">
          {t.slide(active + 1, reviews.length)}
        </p>
      )}

      {multiple && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label={t.prev}
            disabled={atStart}
            onClick={() => step(-1)}
            className="em-carousel-nav"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>

          <div className="flex items-center gap-2">
            {reviews.map((review, index) => (
              <button
                key={`${review.author}-${review.publishedAt}-dot`}
                type="button"
                aria-label={t.dot(index + 1)}
                aria-current={index === active ? "true" : undefined}
                onClick={() => scrollToIndex(index)}
                /* 24px target (WCAG 2.5.8) with the dot drawn inside it, so the
                   control is tappable without the marker itself growing. */
                className="grid size-6 place-items-center rounded-full"
              >
                <span
                  aria-hidden="true"
                  className={`size-2.5 rounded-full transition-colors ${
                    index === active
                      ? "bg-[#e85d3e]"
                      : "bg-[#9f9384] group-hover/dots:bg-[#6f6455]"
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            aria-label={t.next}
            disabled={atEnd}
            onClick={() => step(1)}
            className="em-carousel-nav"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      )}

      <p className="mt-4 text-center text-xs text-[#5a6066]">
        {multiple ? `${t.hint} ` : null}
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[#9f3c27] underline decoration-[#e85d3e] underline-offset-2 hover:text-[#7f2f20]"
        >
          {sourceLabel}
        </a>
      </p>
    </div>
  );
}
