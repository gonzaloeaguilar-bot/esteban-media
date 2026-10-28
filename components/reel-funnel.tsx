"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";

import { whatsappHref } from "@/lib/packages";
import { site } from "@/lib/site";

export type ReelFunnelReel = {
  id: string;
  title: string;
  /** Locally hosted Reel. */
  src?: string;
  /** Published YouTube clip. Kept in the same player sheet as local Reels. */
  embedUrl?: string;
  /** A published film can be widescreen even when its carousel card is a phone. */
  aspect?: "landscape";
  poster: string;
};

/**
 * Watch the reel here, then say what you need.
 *
 * Tapping a reel on the home used to NAVIGATE to the reels service page: the
 * visitor asked to see six seconds of video and got a page instead. Owner,
 * 2026-10-12: "if i press on the reels on homepage i want to see them in the
 * modal or takeover, not just go to another page... then a very simplistic
 * funnel to leave info to be contacted, that asks for what they need first,
 * then whatsapp him that."
 *
 * So: the clip plays in place, and under it is ONE question. Picking an answer
 * opens WhatsApp with both facts already written — the reel they were
 * watching and the thing they want — so Esteban's first message is never
 * blank and never generic. No form, no fields, no email capture: the message
 * IS the lead, and it arrives in the channel this site already uses for every
 * other contact action.
 *
 * AND YOU CAN KEEP BROWSING. Owner, 2026-10-12: "i kind of wanted to be able
 * to scroll also and see other work whole on this view (like Netflix does)."
 * So the takeover carries the rest of the shelf under the question, the way a
 * streaming detail view carries More Like This: pick another and the player
 * swaps in place rather than closing and reopening. Posters only — no second
 * MP4 is fetched until you choose one, so browsing costs nothing.
 */
const COPY = {
  en: {
    question: "What do you need?",
    hint: "Pick one and it opens WhatsApp with your answer already written.",
    close: "Close",
    watching: "Watching",
    more: "More work",
    needs: [
      // Short enough to sit two-up without wrapping to three lines: four
      // full-width pills needed a scroll on a real phone.
      { id: "same", label: "A reel like this", said: "a reel like this" },
      { id: "business", label: "Business video", said: "a video for my business" },
      { id: "event", label: "Event filming", said: "an event filmed" },
      { id: "editing", label: "Editing only", said: "editing for footage I already have" },
    ],
    line: (reel: string, need: string) =>
      `Hi Esteban, I just watched "${reel}" on your site. I need: ${need}.`,
  },
  es: {
    question: "¿Qué necesitas?",
    hint: "Elige una y se abre WhatsApp con tu respuesta ya escrita.",
    close: "Cerrar",
    watching: "Viendo",
    more: "Más trabajo",
    needs: [
      { id: "same", label: "Un reel como este", said: "un reel como este" },
      { id: "business", label: "Video de negocio", said: "un video para mi negocio" },
      { id: "event", label: "Grabar un evento", said: "grabar un evento" },
      { id: "editing", label: "Solo edición", said: "edición del material que ya tengo" },
    ],
    line: (reel: string, need: string) =>
      `Hola Esteban, acabo de ver "${reel}" en tu página. Necesito: ${need}.`,
  },
} as const;

export function ReelFunnel({
  reel,
  playlist = [],
  locale,
  onClose,
  onSelect,
}: {
  reel: ReelFunnelReel | null;
  /** The rest of the shelf, shown under the question. Posters only. */
  playlist?: ReelFunnelReel[];
  locale: "en" | "es";
  onClose: () => void;
  onSelect?: (next: ReelFunnelReel) => void;
}) {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const [mounted, setMounted] = useState(false);

  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setMounted(true), []);

  /** Swapping reels returns you to the player. Without this you pick a new
      one from the bottom of the list and the video is off-screen above. */
  useEffect(() => {
    if (reel) panelRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [reel?.id]);

  const onKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!reel) return;
    document.addEventListener("keydown", onKey);
    // The page behind must not scroll while a takeover is open, or the reel
    // drifts off under your thumb.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [reel, onKey]);

  if (!reel || !mounted) return null;

  const t = COPY[locale];
  const others = playlist.filter((item) => item.id !== reel.id);
  const mediaClass = `em-funnel__media${reel.aspect === "landscape" ? " em-funnel__media--landscape" : ""}`;

  return (
    <div
      className="em-funnel"
      role="dialog"
      aria-modal="true"
      aria-label={reel.title}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className={`em-funnel__panel${reel.aspect === "landscape" ? " em-funnel__panel--landscape" : ""}`}
        ref={panelRef}
      >
        <button
          ref={closeRef}
          type="button"
          className="em-funnel__close"
          aria-label={t.close}
          onClick={onClose}
        >
          <X className="size-5" aria-hidden="true" />
        </button>

        {reel.embedUrl || reel.src ? (
          <div className={mediaClass}>
            {reel.embedUrl ? (
              <iframe
                className="em-funnel__video"
                src={reel.embedUrl}
                title={reel.title}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                className="em-funnel__video"
                src={reel.src}
                poster={reel.poster}
                controls
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
            )}
          </div>
        ) : null}

        <div className="em-funnel__ask">
          <p className="em-funnel__watching">
            {t.watching}: <strong>{reel.title}</strong>
          </p>
          <h2 className="em-funnel__q">{t.question}</h2>
          <div className="em-funnel__needs">
            {t.needs.map((need) => (
              <a
                key={need.id}
                href={whatsappHref(
                  site.phone.e164,
                  t.line(reel.title, need.said),
                )}
                target="_blank"
                rel="noopener noreferrer"
                data-cta={`reel_funnel_${need.id}_whatsapp`}
                data-section="reel_funnel"
                className="em-funnel__need"
              >
                {need.label}
              </a>
            ))}
          </div>
          <p className="em-funnel__hint">{t.hint}</p>

          {others.length > 0 ? (
            <section className="em-funnel__more" aria-label={t.more}>
              <h3 className="em-funnel__more-h">{t.more}</h3>
              <div className="em-funnel__grid">
                {others.map((other) => (
                  <button
                    key={other.id}
                    type="button"
                    className="em-funnel__thumb"
                    onClick={() => onSelect?.(other)}
                  >
                    <Image
                      src={other.poster}
                      alt=""
                      fill
                      sizes="33vw"
                      className="object-cover"
                    />
                    <span className="em-funnel__thumb-play" aria-hidden="true">
                      <Play className="size-3.5 fill-current" />
                    </span>
                    <span className="em-funnel__thumb-t">{other.title}</span>
                  </button>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
