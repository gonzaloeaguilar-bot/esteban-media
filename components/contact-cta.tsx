"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Mail, MessageCircle, Phone, Send } from "lucide-react";

import { Container } from "@/components/ui/container";
import { trackLeadSubmit } from "@/lib/analytics-events";
import {
  FOUND_QUERY_MAX,
  FOUND_VIA_ASKS_QUERY,
  isFoundVia,
  type FoundVia,
} from "@/lib/lead-responder";
import { whatsappHref } from "@/lib/packages";
import { site } from "@/lib/site";

type SubmitState = "idle" | "submitting" | "success" | "error";

const FOUND_VIA_CHOICES: { value: FoundVia; label: string }[] = [
  { value: "chatgpt", label: "ChatGPT" },
  { value: "other_ai", label: "Another AI assistant (Gemini, Perplexity…)" },
  { value: "google_search", label: "Google search" },
  { value: "google_maps", label: "Google Maps" },
  { value: "instagram", label: "Instagram" },
  { value: "referral", label: "Someone recommended you" },
  { value: "other", label: "Something else" },
];

// Reused verbatim from the former HomeContactStrip — the owner, looking at
// both sections live, called them "basically the same" and said THIS one
// (promise line, numbered 1-2-3, three direct taps) is already the calm,
// guided moment he asked for. One phrasing survives instead of two
// near-duplicates ("scope, price and timing" vs "scope, availability,
// timing, and format needs").
const PROMISE = "Send what you want to make, the footage you have and your target date. I’ll confirm scope, price and timing in writing.";
const STEPS = ["Send the project details", "Confirm scope and availability", "Receive a written quote and timing"];
const WHATSAPP_MESSAGE =
  "Hi Esteban, I would like a quote. My project is ____. I have ____ footage and need it by ____.";

export function ContactCta() {
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
          locale: "en",
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

      trackLeadSubmit("contact", "en", foundVia || "not_answered");
      setSubmitState("success");
      setEmail("");
      setProjectSummary("");
      setFoundVia("");
      setFoundQuery("");
    } catch {
      setSubmitState("error");
    }
  }

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Project quote")}&body=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <section
      aria-labelledby="contact-heading"
      className="bg-[#101214] py-16 text-[#f6f1ea] sm:py-20"
      data-em-hides-sticky
      data-section="home-contact-cta"
    >
      <Container size="xl">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-start lg:gap-16">
          <div className="max-w-2xl">
            <p className="em-eyebrow em-eyebrow--inverted">Ready to talk?</p>
            <h2 id="contact-heading" className="mt-3 em-h2">
              Tell me about your project.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#d8d0c7] sm:text-lg sm:leading-8">
              {PROMISE}
            </p>

            <ol
              className="mt-5 flex flex-col gap-2 text-sm text-[#d8d0c7] sm:flex-row sm:flex-wrap sm:gap-x-5"
              aria-label="What happens next"
            >
              {STEPS.map((step, index) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white/10 text-xs font-semibold text-[#f0b384]">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>

            {/* The three lowest-commitment paths, as direct taps — nothing to
                type. This is the whole "ask" on first contact. */}
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <a
                href={whatsappHref(site.phone.e164, WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="home_contact_whatsapp"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#f0b384] px-5 py-3 text-sm font-semibold text-[#101214] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Get a quote on WhatsApp
              </a>
              <a
                href={mailto}
                data-cta="home_contact_email"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#f0b384]"
              >
                <Mail className="size-4" aria-hidden="true" />
                <span className="flex flex-col text-left">
                  <span>Email Esteban</span>
                  <span className="text-xs font-normal text-[#aaa29a]">{site.email}</span>
                </span>
              </a>
              <a
                href={site.phone.href}
                data-cta="home_contact_phone"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#f0b384]"
              >
                <Phone className="size-4" aria-hidden="true" />
                <span className="flex flex-col text-left">
                  <span>Call Esteban</span>
                  <span className="text-xs font-normal text-[#aaa29a]">{site.phone.display}</span>
                </span>
              </a>
            </div>

            {/* Voluntary depth. Every field below already existed on the
                homepage; nothing was deleted, it just stopped being the
                first thing a visitor meets. Native <details>, so it is
                still in the server-rendered HTML with JS off — collapsed,
                not removed. */}
            <details className="group mt-7 rounded-xl border border-white/15 bg-white/5 open:bg-white/[0.06]">
              <summary className="flex min-h-12 cursor-pointer select-none items-center justify-between gap-2 rounded-xl px-5 py-3 text-sm font-medium text-white marker:content-none">
                Build a detailed brief
                <ArrowRight className="size-4 transition group-open:rotate-90" aria-hidden="true" />
              </summary>
              <div className="px-5 pb-6">
                {submitState === "success" ? (
                  <div
                    role="status"
                    className="mt-2 rounded-xl border border-[#f0b384]/40 bg-white/5 p-5"
                  >
                    <p className="flex items-center gap-2 font-medium text-white">
                      <CheckCircle2 className="size-5 text-[#f0b384]" aria-hidden="true" />
                      Project details received.
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#d8d0c7]">
                      Thank you. I now have the details I need to review your
                      request.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitState("idle")}
                      className="mt-4 text-sm font-medium text-[#f0b384] underline underline-offset-4"
                    >
                      Send another project
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-2 grid gap-4">
                    <div>
                      <label htmlFor="homepage-project-email" className="text-sm font-medium text-white">
                        Email
                      </label>
                      <input
                        id="homepage-project-email"
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
                      <label htmlFor="homepage-project-summary" className="text-sm font-medium text-white">
                        Project summary
                      </label>
                      <textarea
                        id="homepage-project-summary"
                        name="projectSummary"
                        required
                        rows={4}
                        value={projectSummary}
                        onChange={(event) => setProjectSummary(event.target.value)}
                        className="mt-2 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-base text-white placeholder:text-[#aaa29a] focus:border-[#f0b384] focus:outline-none"
                        placeholder="What are you making, and what footage or assets do you already have?"
                      />
                    </div>
                    <div>
                      <label htmlFor="homepage-found-via" className="text-sm font-medium text-white">
                        How did you find me?{" "}
                        <span className="font-normal text-[#aaa29a]">(optional)</span>
                      </label>
                      <select
                        id="homepage-found-via"
                        name="foundVia"
                        value={foundVia}
                        onChange={(event) => {
                          setFoundVia(isFoundVia(event.target.value) ? event.target.value : "");
                          setFoundQuery("");
                        }}
                        className="mt-2 min-h-12 w-full rounded-lg border border-white/20 bg-[#1b1e21] px-4 text-base text-white focus:border-[#f0b384] focus:outline-none"
                      >
                        <option value="">Choose one</option>
                        {FOUND_VIA_CHOICES.map((choice) => (
                          <option key={choice.value} value={choice.value}>
                            {choice.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    {asksQuery && (
                      <div>
                        <label htmlFor="homepage-found-query" className="text-sm font-medium text-white">
                          What did you type or ask?{" "}
                          <span className="font-normal text-[#aaa29a]">(optional)</span>
                        </label>
                        <input
                          id="homepage-found-query"
                          name="foundQuery"
                          type="text"
                          maxLength={FOUND_QUERY_MAX}
                          value={foundQuery}
                          onChange={(event) => setFoundQuery(event.target.value)}
                          className="mt-2 min-h-12 w-full rounded-lg border border-white/20 bg-white/10 px-4 text-base text-white placeholder:text-[#aaa29a] focus:border-[#f0b384] focus:outline-none"
                          placeholder="e.g. videographer for restaurants in Miami"
                        />
                      </div>
                    )}
                    {submitState === "error" && (
                      <div role="alert" className="rounded-lg border border-[#f7b9aa]/40 bg-white/5 px-4 py-3">
                        <p className="text-sm text-[#f7b9aa]">
                          The form could not be sent. Message me directly and
                          continue there.
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <a
                            href={whatsappHref(
                              site.phone.e164,
                              "Hi Esteban, the form did not send and I'd like to ask about a project.",
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cta="contact_error_whatsapp"
                            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#f6f1ea] px-4 text-sm font-medium text-[#101214] hover:bg-white"
                          >
                            <MessageCircle className="size-4" aria-hidden="true" />
                            WhatsApp
                          </a>
                          <a
                            href={site.phone.href}
                            data-cta="contact_error_phone"
                            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/30 px-4 text-sm font-medium text-white hover:bg-white hover:text-[#101214]"
                          >
                            <Phone className="size-4" aria-hidden="true" />
                            Call {site.phone.display}
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
                        {submitState === "submitting" ? "Sending…" : "Send project details"}
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </details>
          </div>

          <ul role="list" className="grid gap-3">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex min-h-16 items-center justify-between gap-4 rounded-lg border border-white/15 bg-white/5 p-4 transition hover:border-[#e85d3e] hover:bg-white/10"
              >
                <span className="flex items-center gap-3">
                  <Mail className="size-5 text-[#f0b384]" aria-hidden="true" />
                  <span>
                    <span className="block text-[0.65rem] uppercase tracking-wide text-[#d8d0c7]">Email</span>
                    <span className="block font-serif text-lg">{site.email}</span>
                  </span>
                </span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href={site.phone.href}
                className="flex min-h-16 items-center justify-between gap-4 rounded-lg border border-white/15 bg-white/5 p-4 transition hover:border-[#e85d3e] hover:bg-white/10"
              >
                <span className="flex items-center gap-3">
                  <Phone className="size-5 text-[#f0b384]" aria-hidden="true" />
                  <span>
                    <span className="block text-[0.65rem] uppercase tracking-wide text-[#d8d0c7]">Phone</span>
                    <span className="block font-serif text-lg">{site.phone.display}</span>
                  </span>
                </span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-16 items-center justify-between gap-4 rounded-lg border border-white/15 bg-white/5 p-4 transition hover:border-[#e85d3e] hover:bg-white/10"
              >
                <span className="flex items-center gap-3">
                  <Send className="size-5 text-[#f0b384]" aria-hidden="true" />
                  <span>
                    <span className="block text-[0.65rem] uppercase tracking-wide text-[#d8d0c7]">Instagram</span>
                    <span className="block font-serif text-lg">@steeban1</span>
                  </span>
                </span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
