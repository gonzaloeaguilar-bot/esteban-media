"use client";

import { useState } from "react";
import { MessageCircle, Phone } from "lucide-react";

import { trackLeadSubmit } from "@/lib/analytics-events";
import {
  FOUND_QUERY_MAX,
  FOUND_VIA_ASKS_QUERY,
  FOUND_VIA_OPTIONS,
  isFoundVia,
  type FoundVia,
} from "@/lib/lead-responder";
import { whatsappHref } from "@/lib/packages";
import { site } from "@/lib/site";

type HeroProjectIntakeProps = {
  locale: "en" | "es";
};

type SubmitState = "idle" | "submitting" | "success" | "error";

export function HeroProjectIntake({ locale }: HeroProjectIntakeProps) {
  const [email, setEmail] = useState("");
  const [projectNeed, setProjectNeed] = useState("");
  const [foundVia, setFoundVia] = useState<FoundVia | "">("");
  const [foundQuery, setFoundQuery] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const isSpanish = locale === "es";
  const asksQuery = foundVia !== "" && FOUND_VIA_ASKS_QUERY.has(foundVia);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("submitting");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "hero-intake",
          locale,
          email,
          notes: projectNeed,
          ...(foundVia ? { foundVia } : {}),
          ...(asksQuery && foundQuery.trim()
            ? { foundQuery: foundQuery.trim().slice(0, FOUND_QUERY_MAX) }
            : {}),
        }),
      });

      if (!response.ok) throw new Error("Lead request failed");

      trackLeadSubmit("hero-intake", locale, foundVia || "not_answered");
      setSubmitState("success");
      setEmail("");
      setProjectNeed("");
      setFoundVia("");
      setFoundQuery("");
    } catch {
      setSubmitState("error");
    }
  }

  if (submitState === "success") {
    return (
      <p role="status" className="mt-7 rounded-lg border border-[#f0b384]/40 bg-white/10 px-4 py-3 text-sm leading-6 text-white">
        {isSpanish
          ? "Gracias. Tu proyecto fue recibido."
          : "Thank you. Your project details were received."}
      </p>
    );
  }

  const quickChips = isSpanish
    ? [
        { label: "Chatbots con IA", value: "Chatbot con IA para captar consultas" },
        { label: "Seguimiento por email y SMS", value: "Automatizar el seguimiento de clientes por email y SMS" },
        { label: "Diseño web", value: "Sitio web para recibir consultas" },
      ]
    : [
        { label: "AI chatbots", value: "AI chatbot to capture inquiries" },
        { label: "Email and SMS follow-up", value: "Automate customer follow-up by email and SMS" },
        { label: "Website design", value: "Website to receive project inquiries" },
      ];

  const foundViaLabels: Record<FoundVia, string> = isSpanish
    ? {
        chatgpt: "ChatGPT",
        other_ai: "Otra IA (Gemini, Perplexity…)",
        google_search: "Búsqueda en Google",
        google_maps: "Google Maps",
        instagram: "Instagram",
        referral: "Me lo recomendaron",
        other: "Otro",
      }
    : {
        chatgpt: "ChatGPT",
        other_ai: "Another AI assistant (Gemini, Perplexity…)",
        google_search: "Google search",
        google_maps: "Google Maps",
        instagram: "Instagram",
        referral: "Someone recommended you",
        other: "Something else",
      };

  const whatsappFallback = whatsappHref(
    site.phone.e164,
    isSpanish
      ? "Hola Esteban, no pude enviar el formulario y quiero consultar por un proyecto."
      : "Hi Esteban, the form did not send and I'd like to ask about a project.",
  );

  return (
    <form onSubmit={handleSubmit} className="mt-7 grid max-w-xl gap-3 sm:grid-cols-[1fr_1.35fr_auto] sm:items-end">
      <div>
        <label htmlFor={`hero-email-${locale}`} className="text-sm font-medium text-white">
          Email
        </label>
        <input
          id={`hero-email-${locale}`}
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-1.5 min-h-12 w-full rounded-lg border border-white/20 bg-white/10 px-3 text-base text-white placeholder:text-[#d8d0c7] focus:border-[#f0b384] focus:outline-none"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor={`hero-project-need-${locale}`} className="text-sm font-medium text-white">
            {isSpanish ? "Necesidad del proyecto" : "Project need"}
          </label>
        </div>
        <input
          id={`hero-project-need-${locale}`}
          name="projectNeed"
          required
          value={projectNeed}
          onChange={(event) => setProjectNeed(event.target.value)}
          className="mt-1.5 min-h-12 w-full rounded-lg border border-white/20 bg-white/10 px-3 text-base text-white placeholder:text-[#d8d0c7] focus:border-[#f0b384] focus:outline-none"
          placeholder={isSpanish ? "¿Qué quieres crear?" : "What do you want to create?"}
        />
      </div>
      <button
        type="submit"
        disabled={submitState === "submitting"}
        className="min-h-12 rounded-full bg-[var(--em-accent-ink)] px-5 text-sm font-medium text-white transition hover:bg-[var(--em-accent-ink-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-wait disabled:opacity-70"
      >
        {submitState === "submitting"
          ? isSpanish ? "Enviando…" : "Sending…"
          : isSpanish ? "Enviar" : "Send"}
      </button>
      <div className="sm:col-span-3 flex flex-wrap items-center gap-1.5 pt-0.5">
        <span className="text-xs text-[#d8d0c7]">
          {isSpanish ? "Opciones rápidas:" : "Quick select:"}
        </span>
        {quickChips.map((chip) => (
          <button
            key={chip.label}
            type="button"
            aria-pressed={projectNeed === chip.value}
            aria-controls={`hero-project-need-${locale}`}
            disabled={submitState === "submitting"}
            onClick={() => setProjectNeed(chip.value)}
            className={`min-h-11 rounded-full border px-2.5 py-1 text-xs transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-70 ${
              projectNeed === chip.value
                ? "border-[#f0b384] bg-[#f0b384]/20 text-[#f0b384]"
                : "border-white/20 bg-white/5 text-[#e8e2d8] hover:border-white/40 hover:bg-white/10"
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>
      <div className="sm:col-span-3">
        <label htmlFor={`hero-found-via-${locale}`} className="text-xs text-[#d8d0c7]">
          {isSpanish ? "¿Cómo nos encontró?" : "How did you find us?"}{" "}
          <span className="text-[#aaa29a]">({isSpanish ? "opcional" : "optional"})</span>
        </label>
        <select
          id={`hero-found-via-${locale}`}
          name="foundVia"
          value={foundVia}
          disabled={submitState === "submitting"}
          onChange={(event) => {
            setFoundVia(isFoundVia(event.target.value) ? event.target.value : "");
            setFoundQuery("");
          }}
          className="mt-1.5 min-h-11 w-full rounded-lg border border-white/20 bg-[#1b1e21] px-3 text-sm text-white focus:border-[#f0b384] focus:outline-none disabled:opacity-70"
        >
          <option value="">{isSpanish ? "Elegir una" : "Choose one"}</option>
          {FOUND_VIA_OPTIONS.map((value) => (
            <option key={value} value={value}>
              {foundViaLabels[value]}
            </option>
          ))}
        </select>
        {asksQuery && (
          <input
            id={`hero-found-query-${locale}`}
            name="foundQuery"
            type="text"
            maxLength={FOUND_QUERY_MAX}
            value={foundQuery}
            disabled={submitState === "submitting"}
            onChange={(event) => setFoundQuery(event.target.value)}
            className="mt-2 min-h-11 w-full rounded-lg border border-white/20 bg-white/10 px-3 text-sm text-white placeholder:text-[#d8d0c7] focus:border-[#f0b384] focus:outline-none disabled:opacity-70"
            placeholder={isSpanish ? "ej. editor de video para restaurantes en Miami" : "e.g. video editor for restaurants in Miami"}
            aria-label={isSpanish ? "¿Qué escribió o preguntó?" : "What did you type or ask?"}
          />
        )}
      </div>
      {submitState === "error" && (
        <div role="alert" className="sm:col-span-3 rounded-lg border border-[#f7b9aa]/40 bg-white/5 px-4 py-3">
          <p className="text-sm text-[#f7b9aa]">
            {isSpanish
              ? "No se pudo enviar el formulario. Escríbenos directo y seguimos por ahí."
              : "The form could not be sent. Message Esteban directly and continue there."}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href={whatsappFallback}
              target="_blank"
              rel="noopener noreferrer"
              data-cta={`hero_intake_error_whatsapp`}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#f6f1ea] px-4 text-sm font-medium text-[#101214] hover:bg-white"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              WhatsApp
            </a>
            <a
              href={site.phone.href}
              data-cta={`hero_intake_error_phone`}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/30 px-4 text-sm font-medium text-white hover:bg-white hover:text-[#101214]"
            >
              <Phone className="size-4" aria-hidden="true" />
              {isSpanish ? "Llamar" : "Call"} {site.phone.display}
            </a>
          </div>
        </div>
      )}
    </form>
  );
}
