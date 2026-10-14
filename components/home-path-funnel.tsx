"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Check, X } from "lucide-react";

import { trackFunnelEvent } from "@/lib/analytics-events";
import type { AudienceLocale } from "@/lib/audience-lanes";
import { whatsappHref } from "@/lib/packages";
import { site } from "@/lib/site";

/**
 * The in-place, 2-step contact takeover the chooser's CTA opens.
 *
 * Owner, 2026-10-13: "take them to a very simplistic funnel to leave info to
 * be contacted that asks for what they need first" and "modal or takeover
 * not just go to another page." The lane is already answered by the tab the
 * visitor picked, so step 1 only CONFIRMS it (no re-asking, which would
 * rebuild the double-ask the contact section was just fixed to avoid) and
 * step 2 takes name + email-or-WhatsApp. 3 taps from an already-correct
 * lane to a submitted contact: open -> Continue -> Send.
 *
 * Deliberately not `video-brief-builder.tsx`'s 4-step flow — see
 * concept-1-v4-provenance.md "Design decision" for why.
 */

type Step = "confirm" | "contact" | "done" | "error";

const COPY = {
  en: {
    confirmHeading: "Your project",
    priceLabel: "Starting price",
    confirmFilled: "This is already filled in from your choice.",
    continue: "Continue",
    close: "Close",
    back: "Back",
    contactHeading: "How should Esteban reach you?",
    nameLabel: "Name",
    reachLabel: "Email or WhatsApp number",
    send: "Send",
    sending: "Sending…",
    doneHeading: "Sent. Esteban has your request.",
    doneProject: "Project",
    doneReach: "He will contact you at",
    doneNext: "Nothing else to fill in. If you would rather talk now, message him on WhatsApp.",
    whatsappMessage: "Hi Esteban, I just sent my details on your site.",
    doneClose: "Close",
    errorMessage: "The form could not be sent. Message Esteban directly instead.",
    errorWhatsapp: "WhatsApp",
    recRecording: "Recording",
    recStopped: "Captured",
  },
  es: {
    confirmHeading: "Tu proyecto",
    priceLabel: "Precio de referencia",
    confirmFilled: "Esto ya quedó lleno con tu elección.",
    continue: "Continuar",
    close: "Cerrar",
    back: "Atrás",
    contactHeading: "¿Cómo te contacta Esteban?",
    nameLabel: "Nombre",
    reachLabel: "Email o número de WhatsApp",
    send: "Enviar",
    sending: "Enviando…",
    doneHeading: "Enviado. Esteban tiene tu solicitud.",
    doneProject: "Proyecto",
    doneReach: "Te contactará al",
    doneNext: "No tienes que llenar nada más. Si prefieres hablar ya, escríbele por WhatsApp.",
    whatsappMessage: "Hola Esteban, acabo de enviar mis datos en tu página.",
    doneClose: "Cerrar",
    errorMessage: "No se pudo enviar el formulario. Escríbele directo por WhatsApp.",
    errorWhatsapp: "WhatsApp",
    recRecording: "Grabando",
    recStopped: "Capturado",
  },
} as const;

export function HomePathFunnel({
  locale,
  open,
  laneLabel,
  price,
  laneId,
  onClose,
}: {
  locale: AudienceLocale;
  open: boolean;
  /** The CTA's own filled label ("Reels for my properties"…), already set. */
  laneLabel: string;
  /** That lane's starting price, the same string the card showed. */
  price: string;
  laneId: string;
  onClose: () => void;
}) {
  const c = COPY[locale];
  const [step, setStep] = useState<Step>("confirm");
  const [name, setName] = useState("");
  const [reach, setReach] = useState("");
  const [sentReach, setSentReach] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerFocusTarget = useRef<HTMLElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!open) return;
    triggerFocusTarget.current = document.activeElement as HTMLElement | null;
    setStep("confirm");
    setName("");
    setReach("");
    document.body.style.overflow = "hidden";
    if (!startedRef.current) {
      startedRef.current = true;
      trackFunnelEvent("form_start", { form_id: "home_path_funnel", lane: laneId, locale });
    }
    panelRef.current?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, laneId, locale, onClose]);

  useEffect(() => {
    if (!open) {
      startedRef.current = false;
      triggerFocusTarget.current?.focus();
    }
  }, [open]);

  if (!open) return null;

  async function handleConfirm() {
    trackFunnelEvent("form_step", { form_id: "home_path_funnel", step: 2, lane: laneId, locale });
    setStep("contact");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedReach = reach.trim();
    const isEmail = trimmedReach.includes("@");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "home-path-funnel",
          locale,
          name: name.trim(),
          email: isEmail ? trimmedReach : `${trimmedReach.replace(/[^0-9+]/g, "")}@whatsapp.lead`,
          phone: isEmail ? undefined : trimmedReach,
          projectType: laneId,
          notes: `Lane: ${laneLabel}`,
        }),
      });
      if (!response.ok) throw new Error("lead request failed");
      trackFunnelEvent("form_submit", { form_id: "home_path_funnel", lane: laneId, locale });
      trackFunnelEvent("lead", { lead_source: "home-path-funnel", lead_type: "home-path-funnel", lane: laneId, locale });
      setSentReach(trimmedReach);
      setStep("done");
    } catch {
      trackFunnelEvent("form_error", { form_id: "home_path_funnel", lane: laneId, locale });
      setStep("error");
    }
  }

  return (
    <div className="em-funnel-scrim" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div
        ref={panelRef}
        className="em-funnel-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="em-funnel-heading"
        tabIndex={-1}
      >
        <button type="button" className="em-funnel-close" onClick={onClose} aria-label={c.close} data-cta="home_path_funnel_close">
          <X size={18} aria-hidden="true" />
        </button>

        {/* The camera grammar that opens the homepage (shutter, timecode,
            viewfinder) continuing as the funnel's own beat: a record dot
            that is "recording" through steps 1-2 and "captured" once sent,
            plus a 3-cell filmstrip that lights one more cell per step — the
            same gesture (em-art-record / em-art-film) repeated with
            variation, not a new animation per step. */}
        {step !== "error" && (
          <>
            <span className="em-funnel-rec" data-recording={step !== "done"} data-done={step === "done"}>
              <i aria-hidden="true" />
              {step === "done" ? c.recStopped : c.recRecording}
            </span>
            <span className="em-funnel-strip" aria-hidden="true">
              <i data-lit="true" />
              <i data-lit={step !== "confirm"} />
              <i data-lit={step === "done"} />
            </span>
          </>
        )}

        {step === "confirm" && (
          <>
            <h3 id="em-funnel-heading" className="em-funnel-h">{c.confirmHeading}</h3>
            <p className="em-funnel-chip">{laneLabel}</p>
            <p className="em-funnel-price"><span>{c.priceLabel}</span> <strong>{price}</strong></p>
            <p className="em-funnel-note">{c.confirmFilled}</p>
            <button type="button" className="em-funnel-primary" onClick={handleConfirm} data-cta="home_path_funnel_continue">
              {c.continue}
            </button>
          </>
        )}

        {step === "contact" && (
          <form onSubmit={handleSubmit}>
            <h3 id="em-funnel-heading" className="em-funnel-h">{c.contactHeading}</h3>
            <label className="em-funnel-field">
              <span>{c.nameLabel}</span>
              <input value={name} onChange={(e) => setName(e.target.value)} required minLength={1} />
            </label>
            <label className="em-funnel-field">
              <span>{c.reachLabel}</span>
              <input value={reach} onChange={(e) => setReach(e.target.value)} required minLength={5} />
            </label>
            <div className="em-funnel-row">
              <button type="button" className="em-funnel-secondary" onClick={() => setStep("confirm")} data-cta="home_path_funnel_back">
                <ArrowLeft size={16} aria-hidden="true" />
                {c.back}
              </button>
              <button type="submit" className="em-funnel-primary" data-cta="home_path_funnel_send">
                {c.send}
              </button>
            </div>
          </form>
        )}

        {step === "done" && (
          <div className="em-funnel-done-reveal">
            <h3 id="em-funnel-heading" className="em-funnel-h"><Check size={20} aria-hidden="true" /> {c.doneHeading}</h3>
            <p className="em-funnel-note em-funnel-recap">
              <span><strong>{c.doneProject}:</strong> {laneLabel}</span>
              <span><strong>{c.doneReach}:</strong> {sentReach}</span>
            </p>
            <p className="em-funnel-note">{c.doneNext}</p>
            <button type="button" className="em-funnel-primary" onClick={onClose} data-cta="home_path_funnel_done_close">
              {c.doneClose}
            </button>
            {/* Kept from #414: a direct WhatsApp fallback on the done step,
                so the visitor is never left with only a Close button. It sits
                INSIDE the reveal wrapper so it arrives with the rest of the
                payoff rather than after it. */}
            <a className="em-funnel-wa" href={whatsappHref(site.phone.e164, c.whatsappMessage)} target="_blank" rel="noopener noreferrer" data-cta="home_path_funnel_done_whatsapp">
              {c.errorWhatsapp}
            </a>
          </div>
        )}

        {step === "error" && (
          <>
            <h3 id="em-funnel-heading" className="em-funnel-h">{c.errorMessage}</h3>
            <button type="button" className="em-funnel-primary" onClick={onClose} data-cta="home_path_funnel_error_close">
              {c.close}
            </button>
            <a className="em-funnel-wa" href={whatsappHref(site.phone.e164, c.whatsappMessage)} target="_blank" rel="noopener noreferrer" data-cta="home_path_funnel_error_whatsapp">
              {c.errorWhatsapp}
            </a>
          </>
        )}
      </div>
    </div>
  );
}
