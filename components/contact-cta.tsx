"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Mail, MessageCircle, Phone, Send } from "lucide-react";

import { Container } from "@/components/ui/container";
import { homeContactCopy } from "@/components/home-contact-strip";
import { trackLeadSubmit } from "@/lib/analytics-events";
import {
  FOUND_QUERY_MAX,
  FOUND_VIA_ASKS_QUERY,
  isFoundVia,
  type FoundVia,
} from "@/lib/lead-responder";
import { type Locale, whatsappHref } from "@/lib/packages";
import { site } from "@/lib/site";

type SubmitState = "idle" | "submitting" | "success" | "error";

// Every string below is reused verbatim from copy already live elsewhere on
// the site, not re-translated:
//  - eyebrow/heading/detail/steps/whatsapp/email/call: home-contact-strip.tsx
//    (HomeContactStrip) — the owner, looking at both sections live, called
//    them "basically the same" and said THIS phrasing is the calm, guided
//    moment he asked for.
//  - foundVia question, option labels, query placeholder/aria-label, the
//    submit-failed message and its WhatsApp/Call fallback: hero-project-intake.tsx
//    (HeroProjectIntake), the only other place on the site that already asks
//    this exact question bilingually.
//  - "Build a detailed brief" (es: "Preparar un brief más detallado"): the
//    live <summary> label on /es/contacto and /contact that discloses the
//    same VideoBriefBuilder depth.
//  - submit label / sending state / project-summary label: video-brief-builder.tsx
//    ("Enviar proyecto" / "Enviando…"); "resumen del proyecto" already
//    appears in lib/guides.ts guide copy.
// The success heading/body and the reset-button label have no exact live
// Spanish precedent for THIS success screen; the closest existing control is
// VideoBriefBuilder's own success state ("Recibimos los datos de tu
// proyecto" / its body / "Reiniciar Formulario" for the reset action) — that
// is what is reused here. Flagged in the PR description, not invented fresh.
const COPY = {
  en: {
    eyebrow: homeContactCopy.en.eyebrow,
    heading: homeContactCopy.en.heading,
    promise: homeContactCopy.en.detail,
    steps: homeContactCopy.en.steps,
    whatsappLabel: homeContactCopy.en.whatsapp,
    emailLabel: homeContactCopy.en.email,
    callLabel: homeContactCopy.en.call,
    whatsappMessage: homeContactCopy.en.message,
    mailSubject: homeContactCopy.en.subject,
    buildBrief: "Build a detailed brief",
    buildBriefHint: "Best when you want a complete written quote with the project details in one message.",
    emailField: "Email",
    summaryLabel: "Project summary",
    summaryPlaceholder: homeContactCopy.en.detail,
    foundViaQuestion: "How did you find me?",
    optional: "optional",
    chooseOne: "Choose one",
    foundViaChoices: [
      { value: "chatgpt" as FoundVia, label: "ChatGPT" },
      { value: "other_ai" as FoundVia, label: "Another AI assistant (Gemini, Perplexity…)" },
      { value: "google_search" as FoundVia, label: "Google search" },
      { value: "google_maps" as FoundVia, label: "Google Maps" },
      { value: "instagram" as FoundVia, label: "Instagram" },
      { value: "referral" as FoundVia, label: "Someone recommended you" },
      { value: "other" as FoundVia, label: "Something else" },
    ],
    foundQueryQuestion: "What did you type or ask?",
    foundQueryPlaceholder: "e.g. videographer for restaurants in Miami",
    submit: "Send project details",
    sending: "Sending…",
    errorMessage: "The form could not be sent. Message Esteban directly and continue there.",
    errorWhatsapp: "WhatsApp",
    errorCall: "Call",
    errorFallbackMessage: "Hi Esteban, the form did not send and I'd like to ask about a project.",
    successHeading: "Project details received.",
    successBody: "Thank you. I now have the details I need to review your request.",
    resetLabel: "Send another project",
  },
  es: {
    eyebrow: homeContactCopy.es.eyebrow,
    heading: homeContactCopy.es.heading,
    promise: homeContactCopy.es.detail,
    steps: homeContactCopy.es.steps,
    whatsappLabel: homeContactCopy.es.whatsapp,
    emailLabel: homeContactCopy.es.email,
    callLabel: homeContactCopy.es.call,
    whatsappMessage: homeContactCopy.es.message,
    mailSubject: homeContactCopy.es.subject,
    // Live on /es/contacto and /contact's VideoBriefBuilder disclosure.
    buildBrief: "Preparar un brief más detallado",
    buildBriefHint: "Ideal si quieres una cotización escrita completa con los detalles del proyecto en un solo mensaje.",
    emailField: "Email", // same word both languages — already used unconditionally in hero-project-intake.tsx
    // "resumen del proyecto" is existing site copy (lib/guides.ts).
    summaryLabel: "Resumen del proyecto",
    summaryPlaceholder: homeContactCopy.es.detail,
    // hero-project-intake.tsx ES copy.
    foundViaQuestion: "¿Cómo nos encontró?",
    optional: "opcional",
    chooseOne: "Elegir una",
    foundViaChoices: [
      { value: "chatgpt" as FoundVia, label: "ChatGPT" },
      { value: "other_ai" as FoundVia, label: "Otra IA (Gemini, Perplexity…)" },
      { value: "google_search" as FoundVia, label: "Búsqueda en Google" },
      { value: "google_maps" as FoundVia, label: "Google Maps" },
      { value: "instagram" as FoundVia, label: "Instagram" },
      { value: "referral" as FoundVia, label: "Me lo recomendaron" },
      { value: "other" as FoundVia, label: "Otro" },
    ],
    foundQueryQuestion: "¿Qué escribió o preguntó?",
    foundQueryPlaceholder: "ej. editor de video para restaurantes en Miami",
    // video-brief-builder.tsx ES copy.
    submit: "Enviar proyecto",
    sending: "Enviando…",
    // hero-project-intake.tsx ES error copy.
    errorMessage: "No se pudo enviar el formulario. Escríbenos directo y seguimos por ahí.",
    errorWhatsapp: "WhatsApp",
    errorCall: "Llamar",
    errorFallbackMessage: "Hola Esteban, no pude enviar el formulario y quiero consultar por un proyecto.",
    // No exact live Spanish precedent for this success screen; nearest
    // existing control reused (video-brief-builder.tsx success state).
    successHeading: "Recibimos los datos de tu proyecto",
    successBody: "Esteban puede revisar lo que enviaste y responder sobre el siguiente paso. No necesitas enviarlo otra vez.",
    resetLabel: "Reiniciar Formulario", // video-brief-builder.tsx reset action — nearest live precedent
  },
} as const;

export function ContactCta({ locale = "en" }: { locale?: Locale }) {
  const c = COPY[locale];
  const [email, setEmail] = useState("");
  const [projectSummary, setProjectSummary] = useState("");
  const [foundVia, setFoundVia] = useState<FoundVia | "">("");
  const [foundQuery, setFoundQuery] = useState("");
  const asksQuery = foundVia !== "" && FOUND_VIA_ASKS_QUERY.has(foundVia);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("submitting");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "contact",
          locale,
          email,
          notes: projectSummary,
          ...(foundVia ? { foundVia } : {}),
          ...(asksQuery && foundQuery.trim()
            ? { foundQuery: foundQuery.trim().slice(0, FOUND_QUERY_MAX) }
            : {}),
        }),
      });

      if (!response.ok) {
        throw new Error("Lead request failed");
      }

      trackLeadSubmit("contact", locale, foundVia || "not_answered");
      setSubmitState("success");
      setEmail("");
      setProjectSummary("");
      setFoundVia("");
      setFoundQuery("");
    } catch {
      setSubmitState("error");
    }
  }

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(c.mailSubject)}&body=${encodeURIComponent(c.whatsappMessage)}`;

  return (
    <section
      aria-labelledby={`contact-heading-${locale}`}
      className="bg-[#101214] py-16 text-[#f6f1ea] sm:py-20"
      data-em-hides-sticky
      data-section="home-contact-cta"
    >
      <Container size="xl">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-start lg:gap-16">
          <div className="max-w-2xl">
            <p className="em-eyebrow em-eyebrow--inverted">{c.eyebrow}</p>
            <h2 id={`contact-heading-${locale}`} className="mt-3 em-h2">
              {c.heading}
            </h2>
            <p className="mt-5 text-base leading-7 text-[#d8d0c7] sm:text-lg sm:leading-8">
              {c.promise}
            </p>

            {/* The journey is the thing the owner asked to lead with ("this
                should be a guided experience first like 3 steps kind of
                situation calming"), so it must not be the smallest thing in
                the section. Measured live 2026-10-13 at 390x844 before this
                change: step text 14px/400 in a 24px row, badge 12px, while
                the CTA labels below were 14px/600 in 48-62px rows — the
                buttons out-weighted the journey they were the outcome of.
                Owner: "this 1 2 3 line items are too small".
                Now: 16px step text, 28px badge, and real row height so the
                three steps read as the spine of the section. Still smaller
                than the promise line above them, which stays the lead. */}
            <ol
              className="mt-6 flex flex-col gap-3 text-base leading-7 text-[#e8e2da]"
              aria-label={locale === "es" ? "Qué pasa después" : "What happens next"}
            >
              {c.steps.map((step, index) => (
                <li key={step} className="flex items-center gap-3">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white/12 text-sm font-semibold text-[#f0b384]">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

          </div>

          <div className="max-w-xl">
            {/* One primary and one secondary way to reach Esteban, nothing to
                type. The phone number and Instagram used to be two more
                full-width rows in a right-hand column, repeating the email
                and call buttons beside them (audit 2026-10-14: nine wa.me and
                eleven mailto links on the page). They are now one quiet line. */}
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={whatsappHref(site.phone.e164, c.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="home_contact_whatsapp"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#f0b384] px-5 py-3 text-sm font-semibold text-[#101214] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                {c.whatsappLabel}
              </a>
              <a
                href={mailto}
                data-cta="home_contact_email"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#f0b384]"
              >
                <Mail className="size-4" aria-hidden="true" />
                <span className="flex flex-col text-left">
                  {/* A space between the two spans so textContent reads
                      "Email Esteban esmolopez@..." and not run together. */}
                  <span>{c.emailLabel}</span>{" "}
                  <span className="text-xs font-normal text-[#aaa29a]">{site.email}</span>
                </span>
              </a>
            </div>
            <p className="mt-3 flex flex-wrap items-center gap-x-5 text-sm text-[#d8d0c7]">
              <a
                href={site.phone.href}
                data-cta="home_contact_phone"
                className="inline-flex min-h-11 items-center gap-2 underline underline-offset-4 hover:text-white"
              >
                <Phone className="size-4" aria-hidden="true" />
                {c.callLabel} {site.phone.display}
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="home_contact_instagram"
                className="inline-flex min-h-11 items-center gap-2 underline underline-offset-4 hover:text-white"
              >
                <Send className="size-4" aria-hidden="true" />
                Instagram @steeban1
              </a>
            </p>

            {/* Voluntary depth. Every field below already existed on the
                homepage; nothing was deleted, it just stopped being the
                first thing a visitor meets. Native <details>, so it is
                still in the server-rendered HTML with JS off — collapsed,
                not removed. */}
            <details className="group mt-7 rounded-xl border border-white/15 bg-white/5 open:bg-white/[0.06]">
              <summary className="flex min-h-12 cursor-pointer select-none items-center justify-between gap-2 rounded-xl px-5 py-3 text-sm font-medium text-white marker:content-none">
                {c.buildBrief}
                <ArrowRight className="size-4 transition group-open:rotate-90" aria-hidden="true" />
              </summary>
              <div className="px-5 pb-6">
                <p className="mt-1 text-sm leading-6 text-[#d8d0c7]">{c.buildBriefHint}</p>
                {submitState === "success" ? (
                  <div
                    role="status"
                    className="mt-2 rounded-xl border border-[#f0b384]/40 bg-white/5 p-5"
                  >
                    <p className="flex items-center gap-2 font-medium text-white">
                      <CheckCircle2 className="size-5 text-[#f0b384]" aria-hidden="true" />
                      {c.successHeading}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#d8d0c7]">
                      {c.successBody}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitState("idle")}
                      className="mt-4 text-sm font-medium text-[#f0b384] underline underline-offset-4"
                    >
                      {c.resetLabel}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-2 grid gap-4">
                    <div>
                      <label htmlFor={`homepage-project-email-${locale}`} className="text-sm font-medium text-white">
                        {c.emailField}
                      </label>
                      <input
                        id={`homepage-project-email-${locale}`}
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="mt-2 min-h-12 w-full rounded-lg border border-white/20 bg-white/10 px-4 text-base text-white placeholder:text-[#aaa29a] focus:border-[#f0b384] focus:outline-none"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor={`homepage-project-summary-${locale}`} className="text-sm font-medium text-white">
                        {c.summaryLabel}
                      </label>
                      <textarea
                        id={`homepage-project-summary-${locale}`}
                        name="projectSummary"
                        required
                        rows={4}
                        value={projectSummary}
                        onChange={(event) => setProjectSummary(event.target.value)}
                        className="mt-2 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-base text-white placeholder:text-[#aaa29a] focus:border-[#f0b384] focus:outline-none"
                        placeholder={c.summaryPlaceholder}
                      />
                    </div>
                    <div>
                      <label htmlFor={`homepage-found-via-${locale}`} className="text-sm font-medium text-white">
                        {c.foundViaQuestion}{" "}
                        <span className="font-normal text-[#aaa29a]">({c.optional})</span>
                      </label>
                      <select
                        id={`homepage-found-via-${locale}`}
                        name="foundVia"
                        value={foundVia}
                        onChange={(event) => {
                          setFoundVia(isFoundVia(event.target.value) ? event.target.value : "");
                          setFoundQuery("");
                        }}
                        className="mt-2 min-h-12 w-full rounded-lg border border-white/20 bg-[#1b1e21] px-4 text-base text-white focus:border-[#f0b384] focus:outline-none"
                      >
                        <option value="">{c.chooseOne}</option>
                        {c.foundViaChoices.map((choice) => (
                          <option key={choice.value} value={choice.value}>
                            {choice.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    {asksQuery && (
                      <div>
                        <label htmlFor={`homepage-found-query-${locale}`} className="text-sm font-medium text-white">
                          {c.foundQueryQuestion}{" "}
                          <span className="font-normal text-[#aaa29a]">({c.optional})</span>
                        </label>
                        <input
                          id={`homepage-found-query-${locale}`}
                          name="foundQuery"
                          type="text"
                          maxLength={FOUND_QUERY_MAX}
                          value={foundQuery}
                          onChange={(event) => setFoundQuery(event.target.value)}
                          className="mt-2 min-h-12 w-full rounded-lg border border-white/20 bg-white/10 px-4 text-base text-white placeholder:text-[#aaa29a] focus:border-[#f0b384] focus:outline-none"
                          placeholder={c.foundQueryPlaceholder}
                        />
                      </div>
                    )}
                    {submitState === "error" && (
                      <div role="alert" className="rounded-lg border border-[#f7b9aa]/40 bg-white/5 px-4 py-3">
                        <p className="text-sm text-[#f7b9aa]">
                          {c.errorMessage}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <a
                            href={whatsappHref(site.phone.e164, c.errorFallbackMessage)}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cta="contact_error_whatsapp"
                            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#f6f1ea] px-4 text-sm font-medium text-[#101214] hover:bg-white"
                          >
                            <MessageCircle className="size-4" aria-hidden="true" />
                            {c.errorWhatsapp}
                          </a>
                          <a
                            href={site.phone.href}
                            data-cta="contact_error_phone"
                            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/30 px-4 text-sm font-medium text-white hover:bg-white hover:text-[#101214]"
                          >
                            <Phone className="size-4" aria-hidden="true" />
                            {c.errorCall} {site.phone.display}
                          </a>
                        </div>
                      </div>
                    )}
                    <div>
                      <button
                        type="submit"
                        disabled={submitState === "submitting"}
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white transition hover:bg-[var(--em-accent-ink-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-wait disabled:opacity-70"
                      >
                        {submitState === "submitting" ? c.sending : c.submit}
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </details>
          </div>

        </div>
      </Container>
    </section>
  );
}
