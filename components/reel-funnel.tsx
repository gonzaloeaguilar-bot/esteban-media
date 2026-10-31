"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";

import { trackFunnelEvent, trackLeadSubmit } from "@/lib/analytics-events";
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
  /** Preferred over `aspect`: the stage is 9:16 for portrait and 16:9 for
      landscape, and the picture is never cropped in either. */
  orientation?: "portrait" | "landscape";
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
 * opens a compact contact form with the reel and service already attached.
 * The request is stored before the visitor can book a call or take the
 * optional WhatsApp handoff, so neither next action loses the inquiry.
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
    hint: "Choose one, then leave your details to book a time or get a reply.",
    close: "Close",
    watching: "Watching",
    more: "More work",
    detailsHeading: "Where should Esteban reply?",
    detailsHint: "Your request is saved first. Then you can pick a time or use WhatsApp.",
    name: "Name",
    email: "Email",
    phone: "Phone or WhatsApp number",
    send: "Save my request",
    sending: "Saving…",
    back: "Back",
    savedHeading: "Your request is saved.",
    savedHint: "Pick a time now, or message Esteban if that is easier.",
    book: "Book a time",
    whatsapp: "Message on WhatsApp",
    error: "We could not save that right now. Please contact Esteban directly.",
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
    hint: "Elige una y deja tus datos para reservar o recibir respuesta.",
    close: "Cerrar",
    watching: "Viendo",
    more: "Más trabajo",
    detailsHeading: "¿Dónde puede responderte Esteban?",
    detailsHint: "Primero guardamos tu solicitud. Después puedes reservar o usar WhatsApp.",
    name: "Nombre",
    email: "Email",
    phone: "Teléfono o número de WhatsApp",
    send: "Guardar mi solicitud",
    sending: "Guardando…",
    back: "Volver",
    savedHeading: "Tu solicitud está guardada.",
    savedHint: "Reserva un horario ahora o escríbele a Esteban si te queda mejor.",
    book: "Reservar un horario",
    whatsapp: "Escribir por WhatsApp",
    error: "No pudimos guardar tu solicitud ahora. Comunícate directo con Esteban.",
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

type Step = "choose" | "details" | "saved" | "error";

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
  const askRef = useRef<HTMLDivElement | null>(null);
  const [step, setStep] = useState<Step>("choose");
  const [needId, setNeedId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => setMounted(true), []);

  /** Swapping reels returns you to the player. Without this you pick a new
      one from the bottom of the list and the video is off-screen above. */
  useEffect(() => {
    if (!reel) return;
    setStep("choose");
    setNeedId(null);
    setName("");
    setEmail("");
    setPhone("");
    setSending(false);
    panelRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    // Desktop makes this column independently scrollable. Reset it too when
    // a visitor chooses another film, otherwise the new question can open
    // halfway down its own panel.
    askRef.current?.scrollTo({ top: 0, behavior: "smooth" });
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
  const landscape = (reel.orientation ?? (reel.aspect === "landscape" ? "landscape" : "portrait")) === "landscape";
  const mediaClass = `em-funnel__media${landscape ? " em-funnel__media--landscape" : ""}`;
  const selectedNeed = t.needs.find((need) => need.id === needId);
  const message = selectedNeed ? t.line(reel.title, selectedNeed.said) : "";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!reel || !selectedNeed) return;
    setSending(true);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "reel-funnel",
          locale,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          projectType: selectedNeed.id,
          notes: `Reel: ${reel.title}\nRequest: ${selectedNeed.said}`,
        }),
      });
      if (!response.ok) throw new Error("lead request failed");
      trackFunnelEvent("form_submit", { form_id: "reel_funnel", lane: selectedNeed.id, locale });
      trackFunnelEvent("lead", { lead_source: "reel-funnel", lead_type: selectedNeed.id, locale });
      trackLeadSubmit("reel-funnel", locale);
      setStep("saved");
    } catch {
      trackFunnelEvent("form_error", { form_id: "reel_funnel", error_code: "request_failed", field: "submit", locale });
      setStep("error");
    } finally {
      setSending(false);
    }
  }

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
        className={`em-funnel__panel${landscape ? " em-funnel__panel--landscape" : ""}`}
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
          <div className={mediaClass} data-orientation={landscape ? "landscape" : "portrait"}>
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

        <div className="em-funnel__ask" ref={askRef}>
          <p className="em-funnel__watching">
            {t.watching}: <strong>{reel.title}</strong>
          </p>
          {step === "choose" ? (
            <>
              <h2 className="em-funnel__q">{t.question}</h2>
              <div className="em-funnel__needs">
                {t.needs.map((need) => (
                  <button
                    key={need.id}
                    type="button"
                    data-cta={`reel_funnel_${need.id}`}
                    data-section="reel_funnel"
                    className="em-funnel__need"
                    onClick={() => {
                      setNeedId(need.id);
                      setStep("details");
                      trackFunnelEvent("form_start", { form_id: "reel_funnel", lane: need.id, locale });
                    }}
                  >
                    {need.label}
                  </button>
                ))}
              </div>
              <p className="em-funnel__hint">{t.hint}</p>
            </>
          ) : null}

          {step === "details" && selectedNeed ? (
            <form className="em-funnel__form" onSubmit={handleSubmit}>
              <h2 className="em-funnel__q">{t.detailsHeading}</h2>
              <p className="em-funnel__hint">{t.detailsHint}</p>
              <p className="em-funnel__selection">{selectedNeed.label}</p>
              <label className="em-funnel__field"><span>{t.name}</span><input name="name" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} required /></label>
              <label className="em-funnel__field"><span>{t.email}</span><input name="email" type="email" inputMode="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
              <label className="em-funnel__field"><span>{t.phone}</span><input name="phone" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} required minLength={7} /></label>
              <div className="em-funnel__actions">
                <button type="submit" className="em-funnel__primary" disabled={sending} data-cta="reel_funnel_save">{sending ? t.sending : t.send}</button>
                <button type="button" className="em-funnel__secondary" onClick={() => setStep("choose")}>{t.back}</button>
              </div>
            </form>
          ) : null}

          {step === "saved" && selectedNeed ? (
            <div className="em-funnel__result">
              <h2 className="em-funnel__q">{t.savedHeading}</h2>
              <p className="em-funnel__hint">{t.savedHint}</p>
              <div className="em-funnel__actions">
                <a className="em-funnel__primary" href={site.booking} target="_blank" rel="noopener noreferrer" data-cta="reel_funnel_book_time">{t.book}</a>
                <a className="em-funnel__secondary" href={whatsappHref(site.phone.e164, message)} target="_blank" rel="noopener noreferrer" data-cta="reel_funnel_whatsapp">{t.whatsapp}</a>
              </div>
            </div>
          ) : null}

          {step === "error" ? (
            <div className="em-funnel__result">
              <p className="em-funnel__error">{t.error}</p>
              {selectedNeed ? (
                <a className="em-funnel__secondary" href={whatsappHref(site.phone.e164, message)} target="_blank" rel="noopener noreferrer" data-cta="reel_funnel_whatsapp_fallback">{t.whatsapp}</a>
              ) : null}
            </div>
          ) : null}

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
