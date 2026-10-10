"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MessageCircle, Play, X } from "lucide-react";

import { Rail, type RailItem } from "@/vendor/rail-kit";
import { RAIL_LABELS_EN, RAIL_LABELS_ES } from "@/components/em-rails";
import { site } from "@/lib/site";
import { whatsappHref } from "@/lib/packages";
import {
  REAL_ESTATE_REELS,
  REAL_ESTATE_REELS_PATH,
  buildRealEstateReelsJsonLd,
  formatClock,
} from "@/lib/real-estate-reels";

/**
 * The real-estate reel shelf: a Netflix-style carousel of vertical property
 * reels, a hover "spotlight" preview, and a detail view that opens over the
 * page.
 *
 * Four things this is careful about:
 *
 *  LOADING. The six MP4s (~26MB) are never fetched on page load. The cards
 *  render lazy posters only; a preview video is mounted INTO the DOM when a
 *  card is hovered (or keyboard-focused) and unmounted the moment the pointer
 *  leaves, so the file is requested then — not before. The detail view mounts
 *  its player only while open.
 *
 *  CONVERSION. The visitor arrives to see the work; the next thing they should
 *  be able to do is talk to Esteban. Every card carries a WhatsApp action, and
 *  the detail view carries the big one — pre-filled with the reel it came
 *  from, so the first message is never blank.
 *
 *  SEO/GEO. Each card's title links to the service page that sells this work
 *  (an internal link, not a dead end), and the whole shelf emits one
 *  VideoObject per reel so the videos are eligible for video rich results.
 *  The schema is built from the same records the cards render.
 *
 *  MOTION. Hover previews are skipped entirely for visitors who prefer
 *  reduced motion — the poster and detail view still carry the full pitch.
 */

/** Netflix delays its previews about half a second so a pass-over never fires. */
const PREVIEW_DELAY_MS = 450;

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** The rail tags each card with data-rail-index; read it off the hovered node. */
function cardIndexFrom(target: EventTarget | null): number | null {
  const card =
    target instanceof Element
      ? target.closest<HTMLElement>("[data-rail-card]")
      : null;
  if (!card) return null;
  const index = Number(card.dataset.railIndex);
  return Number.isInteger(index) ? index : null;
}

export function RealEstateReels({
  locale = "en",
  className = "",
}: {
  locale?: "en" | "es";
  className?: string;
}) {
  const isEs = locale === "es";
  const reels = REAL_ESTATE_REELS;
  const len = reels.length;
  const headingId = "real-estate-reels-heading";

  const [active, setActive] = useState<number | null>(null);
  const [previewing, setPreviewing] = useState<number | null>(null);
  const hoveredRef = useRef<number | null>(null);
  const previewTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  /* The shelf's own counter and arrows. The rail kit still owns the scrolling,
     but its header drew those controls as a full-width band sitting between
     the headline and the strip — a row floating in empty space, which read as
     a gap between two unrelated blocks. They now live in the headline row,
     beside the quote button, so the strip follows it with one clean step. */
  const shelfRef = useRef<HTMLDivElement | null>(null);
  const [shelfRange, setShelfRange] = useState<[number, number]>([1, 1]);
  const [shelfBack, setShelfBack] = useState(false);
  const [shelfForward, setShelfForward] = useState(false);
  const railLabels = isEs ? RAIL_LABELS_ES : RAIL_LABELS_EN;

  const stopPreviewTimer = useCallback(() => {
    if (previewTimer.current) {
      clearTimeout(previewTimer.current);
      previewTimer.current = null;
    }
  }, []);

  /** Hover dwell on a card schedules its spotlight; wiggle within a card does
      not restart the clock, because hoveredRef only moves between cards. */
  const schedulePreview = useCallback(
    (index: number) => {
      stopPreviewTimer();
      if (prefersReducedMotion()) return;
      previewTimer.current = setTimeout(() => setPreviewing(index), PREVIEW_DELAY_MS);
    },
    [stopPreviewTimer],
  );

  const cancelPreview = useCallback(() => {
    stopPreviewTimer();
    hoveredRef.current = null;
    setPreviewing(null);
  }, [stopPreviewTimer]);

  useEffect(() => stopPreviewTimer, [stopPreviewTimer]);

  const close = useCallback(() => {
    setActive(null);
    triggerRef.current?.focus();
  }, []);

  const step = useCallback(
    (dir: number) => {
      setActive((prev) => (prev === null ? prev : (prev + dir + len) % len));
    },
    [len],
  );

  /* The kit still owns the scrolling; these controls read and drive that same
     element, so the counter and arrows can never disagree with the strip. The
     arithmetic is the kit's own, mirrored here, so nothing about the state
     changes — only where the controls are drawn. */
  const shelfScroller = useCallback(
    () => shelfRef.current?.querySelector<HTMLElement>(".rail__scroller") ?? null,
    [],
  );

  useEffect(() => {
    const scroller = shelfScroller();
    if (!scroller) return;
    const recalc = () => {
      const cards = Array.from(
        scroller.querySelectorAll<HTMLElement>("[data-rail-card]"),
      );
      const left = scroller.scrollLeft;
      const right = left + scroller.clientWidth;
      let first = cards.length;
      let last = 1;
      cards.forEach((card, i) => {
        const start = card.offsetLeft;
        const end = start + card.offsetWidth;
        // On screen = at least half the card visible, the kit's own rule.
        if (
          end - 4 > left + card.offsetWidth / 2 &&
          start + card.offsetWidth / 2 < right + 4
        ) {
          first = Math.min(first, i + 1);
          last = Math.max(last, i + 1);
        }
      });
      if (cards.length) setShelfRange([Math.min(first, last), last]);
      const max = scroller.scrollWidth - scroller.clientWidth;
      setShelfBack(scroller.scrollLeft > 4);
      setShelfForward(max > 8 && scroller.scrollLeft < max - 4);
    };
    recalc();
    scroller.addEventListener("scroll", recalc, { passive: true });
    window.addEventListener("resize", recalc);
    return () => {
      scroller.removeEventListener("scroll", recalc);
      window.removeEventListener("resize", recalc);
    };
  }, [shelfScroller, len]);

  const pageShelf = useCallback(
    (dir: -1 | 1) => {
      const scroller = shelfScroller();
      if (!scroller) return;
      const card = scroller.querySelector<HTMLElement>("[data-rail-card]");
      const gap = 20;
      const stepWidth = card ? card.offsetWidth + gap : scroller.clientWidth * 0.8;
      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      scroller.scrollBy({
        left: stepWidth * dir,
        behavior: reduce ? "auto" : "smooth",
      });
    },
    [shelfScroller],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      else if (event.key === "ArrowRight") step(1);
      else if (event.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, step]);

  const whatsappMessage = (title: string) =>
    isEs
      ? `Hola Esteban, vi el reel "${title}" y quiero una cotización para un video de propiedad.`
      : `Hi Esteban, I saw the "${title}" reel and would like a quote for a property video.`;

  const railItems: RailItem[] = reels.map((reel, index) => {
    const title = isEs ? reel.titleEs : reel.title;
    const isPreviewing = previewing === index;
    return {
      kind: "media" as const,
      id: reel.id,
      // The title links here: the page that sells this work, so the rail is an
      // internal link into the service, not a closed loop.
      href: REAL_ESTATE_REELS_PATH,
      title,
      subtitle: isEs ? "Reel de propiedad" : "Listing reel",
      meta: formatClock(reel.durationSeconds),
      description: isEs ? reel.captionEs : reel.caption,
      // Decorative: the button below carries the accessible name, and the
      // card's title already names the reel for anyone reading.
      image: { src: reel.poster, alt: "" },
      media: (
        <button
          type="button"
          className="em-reel-play absolute inset-0 z-[1] block h-full w-full cursor-pointer overflow-hidden border-0 bg-transparent p-0"
          aria-label={`${isEs ? "Reproducir" : "Play"} ${title}`}
          onClick={(event) => {
            triggerRef.current = event.currentTarget;
            cancelPreview();
            setActive(index);
          }}
        >
          <Image
            src={reel.poster}
            alt=""
            fill
            sizes="(min-width: 768px) 264px, 62vw"
            className="object-cover"
          />
          {/* Spotlight preview: mounted only while the pointer dwells on the
              card, so the MP4 is requested then — never on page load. */}
          {isPreviewing && (
            <video
              key={`${reel.id}-preview`}
              src={reel.src}
              muted
              loop
              autoPlay
              playsInline
              preload="auto"
              tabIndex={-1}
              aria-hidden="true"
              className="em-reel-preview pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover"
            />
          )}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/45 via-transparent to-transparent"
          />
          {!isPreviewing && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-[2] grid place-items-center"
            >
              <span className="grid size-14 place-items-center rounded-full bg-black/55 text-white shadow-lg backdrop-blur-sm">
                <Play className="size-6 fill-current" aria-hidden="true" />
              </span>
            </span>
          )}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3 left-3 z-[3] rounded-full bg-black/65 px-2.5 py-1 text-xs font-medium text-white"
          >
            {formatClock(reel.durationSeconds)}
          </span>
        </button>
      ),
      actions: [
        {
          // A different destination than the card href, so the card becomes a
          // plain container and both the title link and this WhatsApp button
          // stay real, keyboard-reachable links instead of nested anchors.
          label: "WhatsApp",
          href: whatsappHref(site.phone.e164, whatsappMessage(title)),
          id: "whatsapp",
          variant: "secondary" as const,
        },
      ],
    };
  });

  const current = active === null ? null : reels[active];
  const jsonLd = buildRealEstateReelsJsonLd();

  return (
    <section
      className={`border-y border-[#ddd4c8] bg-[#101214] pb-10 pt-14 text-[#f6f1ea] sm:pb-14 sm:pt-20 ${className}`}
      aria-labelledby={headingId}
    >
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase text-[#ffb49e]">
              {isEs ? "Reels de bienes raíces" : "Real estate reels"}
            </p>
            <h2
              id={headingId}
              className="mt-3 font-serif text-4xl leading-tight sm:text-5xl"
            >
              {isEs ? "Mira el trabajo y arranca tu reel." : "See the work, then start your reel."}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#c9c1b8]">
              {isEs
                ? "Seis videos cortos de propiedades que editó Esteban para agentes y listados. Pasa el cursor para ver un adelanto, toca una portada para abrirlo. Cuando tengas tu propio material, mándalo por WhatsApp."
                : "Six short property videos Esteban edited for agents and listings. Hover a poster for a preview, tap to open it. When you have footage of your own, send it over on WhatsApp."}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-4 sm:items-end">
            <a
              href={whatsappHref(
                site.phone.e164,
                isEs
                  ? "Hola Esteban, vi tus reels de bienes raíces y quiero una cotización."
                  : "Hi Esteban, I saw your real estate reels and would like a quote.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              data-cta={`real_estate_reels_${locale}_whatsapp`}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-5 text-sm font-medium text-white transition-colors hover:bg-[var(--em-accent-ink-hover)]"
            >
              {isEs ? "Cotizar por WhatsApp" : "Get a quote on WhatsApp"}
            </a>
            {/* The strip's counter and arrows, docked under the quote button
                instead of in a header band of their own — that band was the
                row that floated in the gap between the headline and the
                shelf. The counter stays on a phone even when the arrows are a
                thumb's swipe away, because "3 of 6" is the orientation. */}
            <div className="flex items-center gap-2">
              <p
                className="mr-1 text-xs tabular-nums text-[#c9c1b8]"
                aria-live="polite"
              >
                {railLabels.position?.(shelfRange[0], shelfRange[1], len)}
              </p>
              <button
                type="button"
                className="em-reel-arrow"
                onClick={() => pageShelf(-1)}
                disabled={!shelfBack}
                aria-label={railLabels.back ?? "Previous"}
              >
                <ChevronLeft className="size-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="em-reel-arrow"
                onClick={() => pageShelf(1)}
                disabled={!shelfForward}
                aria-label={railLabels.forward ?? "Next"}
              >
                <ChevronRight className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* The poster IS the product, so the streaming-catalogue language: a
          strip you push sideways. Hover preview state is delegated here on
          the wrapper — the rail's cards already expose data-rail-index, so
          the kit stays untouched and the whole card (not just the poster)
          plays the spotlight. */}
      <div
        ref={shelfRef}
        className="em-on-dark em-reel mt-8"
        onMouseOver={(event) => {
          const index = cardIndexFrom(event.target);
          if (index === null || index === hoveredRef.current) return;
          hoveredRef.current = index;
          schedulePreview(index);
        }}
        onMouseOut={(event) => {
          const from = cardIndexFrom(event.target);
          const to = event.relatedTarget;
          if (from !== null && to instanceof Node && from === cardIndexFrom(to)) return;
          cancelPreview();
        }}
        onMouseLeave={cancelPreview}
        onFocus={(event) => {
          const index = cardIndexFrom(event.target);
          if (index === null || index === hoveredRef.current) return;
          hoveredRef.current = index;
          schedulePreview(index);
        }}
        onBlur={(event) => {
          const from = cardIndexFrom(event.target);
          const to = event.relatedTarget;
          if (from !== null && to instanceof Node && from === cardIndexFrom(to)) return;
          cancelPreview();
        }}
      >
        <Rail
          items={railItems}
          source={`real_estate_reels_${locale}`}
          variant="poster"
          size="lg"
          titleAs="h3"
          cta="none"
          ariaLabel={isEs ? "Reels de bienes raíces" : "Real estate reels"}
          labels={railLabels}
        />
      </div>

      {current && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={isEs ? current.titleEs : current.title}
          onClick={close}
        >
          <div className="flex min-h-full items-center justify-center p-4 sm:p-8">
            <div
              className="relative w-full max-w-[min(96vw,880px)] overflow-hidden rounded-2xl border border-white/15 bg-[#101214] text-white shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label={isEs ? "Cerrar video" : "Close video"}
                className="absolute right-3 top-3 z-20 grid size-9 place-items-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
              >
                <X className="size-5" aria-hidden="true" />
              </button>

              <div className="grid gap-0 sm:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
                <div
                  className="relative w-full bg-black"
                  style={{ aspectRatio: "9 / 16" }}
                >
                  {/* Only mounted while open: the MP4 is requested on first
                      play, never on page load. */}
                  <video
                    key={current.src}
                    src={current.src}
                    poster={current.poster}
                    controls
                    autoPlay
                    playsInline
                    preload="none"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-col gap-5 p-5 sm:gap-6 sm:p-7">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-[#ffb49e]">
                      {isEs ? "Reel de propiedad" : "Listing reel"}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl leading-snug sm:text-3xl">
                      {isEs ? current.titleEs : current.title}
                    </h3>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">
                        {formatClock(current.durationSeconds)}
                      </span>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">
                        9:16
                      </span>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">
                        {isEs ? `Reel ${active! + 1} de ${len}` : `Reel ${active! + 1} of ${len}`}
                      </span>
                    </div>
                  </div>

                  <p className="text-base leading-7 text-[#c9c1b8]">
                    {isEs ? current.captionEs : current.caption}
                  </p>

                  <div className="flex flex-col gap-2">
                    <a
                      href={whatsappHref(
                        site.phone.e164,
                        whatsappMessage(isEs ? current.titleEs : current.title),
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cta={`real_estate_reel_${current.id}_whatsapp`}
                      className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-[var(--em-accent-ink)] px-7 text-base font-semibold text-white transition-colors hover:bg-[var(--em-accent-ink-hover)]"
                    >
                      <MessageCircle className="size-5" aria-hidden="true" />
                      {isEs ? "Mándale un WhatsApp a Esteban" : "Text Esteban"}
                    </a>
                    <p className="text-xs leading-5 text-[#8a8378]">
                      {isEs
                        ? "Abre WhatsApp con un mensaje listo sobre este reel."
                        : "Opens WhatsApp with a message about this reel."}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => step(-1)}
                        aria-label={isEs ? "Reel anterior" : "Previous reel"}
                        className="grid size-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                      >
                        <ChevronLeft className="size-5" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => step(1)}
                        aria-label={isEs ? "Reel siguiente" : "Next reel"}
                        className="grid size-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                      >
                        <ChevronRight className="size-5" aria-hidden="true" />
                      </button>
                    </div>
                    <a
                      href={REAL_ESTATE_REELS_PATH}
                      className="text-sm font-medium text-[#ffb49e] underline-offset-4 hover:underline"
                    >
                      {isEs ? "Conoce el servicio de reels" : "About the reel service"}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

