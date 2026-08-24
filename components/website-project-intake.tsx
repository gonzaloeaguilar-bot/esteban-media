"use client";

import { useState } from "react";

import { trackLeadSubmit } from "@/lib/analytics-events";

type WebsiteProjectIntakeProps = {
  locale: "en" | "es";
};

type SubmitState = "idle" | "submitting" | "success" | "error";

export function WebsiteProjectIntake({ locale }: WebsiteProjectIntakeProps) {
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
          source: "website-design-intake",
          locale,
          email,
          notes: projectNeed,
        }),
      });

      if (!response.ok) throw new Error("Lead request failed");

      trackLeadSubmit("website-design-intake", locale);
      setSubmitState("success");
      setEmail("");
      setProjectNeed("");
    } catch {
      setSubmitState("error");
    }
  }

  if (submitState === "success") {
    return (
      <p role="status" className="mt-6 rounded-lg border border-[#c84a2c]/30 bg-[#f6e5dc] px-4 py-3 text-sm leading-6 text-[#252a2d]">
        {isSpanish
          ? "Gracias. Recibimos los detalles de tu proyecto."
          : "Thank you. We received your project details."}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-7 grid gap-4 text-left sm:grid-cols-[1fr_1.35fr_auto] sm:items-end">
      <div>
        <label htmlFor={`website-intake-email-${locale}`} className="text-sm font-medium text-[#252a2d]">
          Email
        </label>
        <input
          id={`website-intake-email-${locale}`}
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-1.5 min-h-12 w-full rounded-lg border border-[#b9afa2] bg-white px-3 text-base text-[#101214] placeholder:text-[#5a6066] focus:border-[#c84a2c] focus:outline-none"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor={`website-intake-need-${locale}`} className="text-sm font-medium text-[#252a2d]">
          {isSpanish ? "Necesidad del proyecto" : "Project need"}
        </label>
        <input
          id={`website-intake-need-${locale}`}
          name="projectNeed"
          required
          value={projectNeed}
          onChange={(event) => setProjectNeed(event.target.value)}
          className="mt-1.5 min-h-12 w-full rounded-lg border border-[#b9afa2] bg-white px-3 text-base text-[#101214] placeholder:text-[#5a6066] focus:border-[#c84a2c] focus:outline-none"
          placeholder={isSpanish ? "¿Qué debe resolver tu sitio?" : "What should your website solve?"}
        />
      </div>
      <button
        type="submit"
        disabled={submitState === "submitting"}
        className="min-h-12 rounded-full bg-[#c84a2c] px-5 text-sm font-medium text-white transition hover:bg-[#a93e29] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#101214] disabled:cursor-wait disabled:opacity-70"
      >
        {submitState === "submitting"
          ? isSpanish ? "Enviando…" : "Sending…"
          : isSpanish ? "Enviar proyecto" : "Send project"}
      </button>
      {submitState === "error" && (
        <p role="alert" className="sm:col-span-3 text-sm text-[#9f3c27]">
          {isSpanish
            ? "No se pudo enviar. Inténtalo de nuevo o usa el formulario de contacto."
            : "The form could not be sent. Please try again or use the contact form."}
        </p>
      )}
    </form>
  );
}
