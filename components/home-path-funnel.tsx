"use client";

import { useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";

import { trackFunnelEvent } from "@/lib/analytics-events";
import type { AudienceLocale } from "@/lib/audience-lanes";
import { whatsappHref } from "@/lib/packages";
import { site } from "@/lib/site";

/**
 * The in-place contact takeover the chooser's CTA opens.
 *
 * Owner, 2026-10-13: "take them to a very simplistic funnel to leave info to
 * be contacted that asks for what they need first" and "modal or takeover
 * not just go to another page." The lane is already answered by the tab the
 * visitor picked, so the choice and its price sit as a header ABOVE the
 * fields instead of getting a step of their own (2026-10-14 audit: the old
 * step 1 only repeated the tap). 2 taps from an already-correct lane to a
 * submitted contact: open -> Send.
 *
 * Deliberately not `video-brief-builder.tsx`'s 4-step flow — see
 * concept-1-v4-provenance.md "Design decision" for why.
 */

type Step = "contact" | "done" | "error";

const COPY = {
  en: {
    projectLabel: "Your choice",
    priceLabel: "Starting price",
    close: "Close",
    contactHeading: "How should Esteban reach you?",
    contactHint: "Fill in one: email or WhatsApp.",
    nameLabel: "Name",
    emailLabel: "Email",
    phoneLabel: "WhatsApp number",
    send: "Send",
    directWhatsapp: "Message Esteban on WhatsApp instead",
    sending: "Sending…",
    doneHeading: "Sent. Esteban has your request.",
    doneProject: "Project",
    doneReach: "He will contact you at",
    doneNext: "Nothing else to fill in. If you would rather talk now, message him on WhatsApp.",
    whatsappMessage: "Hi Esteban, I just sent my details on your site.",
    doneClose: "Close",
    errorMessage: "The form could not be sent. Message Esteban directly instead.",
    errorWhatsapp: "WhatsApp",
    stepLabel: "Your details",
    stepDone: "Sent",
  },
  es: {
    projectLabel: "Tu elección",
    priceLabel: "Precio de referencia",
    close: "Cerrar",
    contactHeading: "¿Cómo te contacta Esteban?",
    contactHint: "Llena uno: email o WhatsApp.",
    nameLabel: "Nombre",
    emailLabel: "Email",
    phoneLabel: "Número de WhatsApp",
    send: "Enviar",
    directWhatsapp: "Escribirle a Esteban por WhatsApp",
    sending: "Enviando…",
    doneHeading: "Enviado. Esteban tiene tu solicitud.",
    doneProject: "Proyecto",
    doneReach: "Te contactará al",
    doneNext: "No tienes que llenar nada más. Si prefieres hablar ya, escríbele por WhatsApp.",
    whatsappMessage: "Hola Esteban, acabo de enviar mis datos en tu página.",
    doneClose: "Cerrar",
    errorMessage: "No se pudo enviar el formulario. Escríbele directo por WhatsApp.",
    errorWhatsapp: "WhatsApp",
    stepLabel: "Tus datos",
    stepDone: "Enviado",
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
  const directWhatsappMessage = locale === "es"
    ? `Hola Esteban, quiero cotizar ${laneLabel}.`
    : `Hi Esteban, I'd like a quote for ${laneLabel}.`;
  const [step, setStep] = useState<Step>("contact");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sentReach, setSentReach] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerFocusTarget = useRef<HTMLElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!open) return;
    triggerFocusTarget.current = document.activeElement as HTMLElement | null;
    setStep("contact");
    setName("");
    setEmail("");
    setPhone("");
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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedReach = trimmedEmail || trimmedPhone;
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "home-path-funnel",
          locale,
          name: name.trim(),
          email: trimmedEmail || `${trimmedPhone.replace(/[^0-9+]/g, "")}@whatsapp.lead`,
          phone: trimmedPhone || undefined,
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
      trackFunnelEvent("form_error", { form_id: "home_path_funnel", error_code: "request_failed", field: "submit", lane: laneId, locale });
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
              {step === "done" ? c.stepDone : c.stepLabel}
            </span>
            <span className="em-funnel-strip" aria-hidden="true">
              <i data-lit="true" />
              <i data-lit={step === "done"} />
            </span>
          </>
        )}

        {step === "contact" && (
          <form onSubmit={handleSubmit}>
            <h3 id="em-funnel-heading" className="em-funnel-h">{c.contactHeading}</h3>
            <div className="em-funnel-summary">
              <p className="em-funnel-chip"><span className="em-funnel-chip-k">{c.projectLabel}</span> {laneLabel}</p>
              <p className="em-funnel-price"><span>{c.priceLabel}</span>{price.split(" · ").map((line) => <strong key={line}>{line}</strong>)}</p>
            </div>
            <p className="em-funnel-note">{c.contactHint}</p>
            <label className="em-funnel-field">
              <span>{c.nameLabel}</span>
              <input
                name="name"
                type="text"
                autoComplete="name"
                autoCapitalize="words"
                enterKeyHint="next"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={1}
              />
            </label>
            <label className="em-funnel-field">
              <span>{c.emailLabel}</span>
              <input
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                autoCapitalize="none"
                spellCheck={false}
                enterKeyHint="next"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={!phone.trim()}
              />
            </label>
            <label className="em-funnel-field">
              <span>{c.phoneLabel}</span>
              <input
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                enterKeyHint="send"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required={!email.trim()}
                minLength={7}
              />
            </label>
            <button type="submit" className="em-funnel-primary" data-cta="home_path_funnel_send">
              {c.send}
            </button>
            <a
              className="em-funnel-wa"
              href={whatsappHref(site.phone.e164, directWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="home_path_funnel_direct_whatsapp"
            >
              {c.directWhatsapp}
            </a>
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
