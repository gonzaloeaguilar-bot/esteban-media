"use client";

import { useState } from "react";

import { trackLeadSubmit } from "@/lib/analytics-events";

type HeroProjectIntakeProps = {
  locale: "en" | "es";
};

type SubmitState = "idle" | "submitting" | "success" | "error";

export function HeroProjectIntake({ locale }: HeroProjectIntakeProps) {
  const [email, setEmail] = useState("");
  const [projectNeed, setProjectNeed] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const isSpanish = locale === "es";

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
        }),
      });

      if (!response.ok) throw new Error("Lead request failed");

      trackLeadSubmit("hero-intake", locale);
      setSubmitState("success");
      setEmail("");
      setProjectNeed("");
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
      {submitState === "error" && (
        <p role="alert" className="sm:col-span-3 text-sm text-[#f7b9aa]">
          {isSpanish
            ? "No se pudo enviar. Inténtalo de nuevo o usa el formulario de contacto."
            : "The form could not be sent. Please try again or use the contact form."}
        </p>
      )}
    </form>
  );
}
