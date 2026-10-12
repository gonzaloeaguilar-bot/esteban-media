"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

import { whatsappHref } from "@/lib/packages";
import { site } from "@/lib/site";

export type ReelFunnelReel = {
  id: string;
  title: string;
  src: string;
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
 */
const COPY = {
  en: {
    question: "What do you need?",
    hint: "Pick one and it opens WhatsApp with your answer already written.",
    close: "Close",
    watching: "Watching",
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
  locale,
  onClose,
}: {
  reel: ReelFunnelReel | null;
  locale: "en" | "es";
  onClose: () => void;
}) {
  const t = COPY[locale];
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

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
      <div className="em-funnel__panel">
        <button
          ref={closeRef}
          type="button"
          className="em-funnel__close"
          aria-label={t.close}
          onClick={onClose}
        >
          <X className="size-5" aria-hidden="true" />
        </button>

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
        </div>
      </div>
    </div>
  );
}
