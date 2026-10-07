"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CheckCircle2, Mail, Phone, Send } from "lucide-react";

import { Container } from "@/components/ui/container";
import { trackLeadSubmit } from "@/lib/analytics-events";
import {
  FOUND_QUERY_MAX,
  FOUND_VIA_ASKS_QUERY,
  isFoundVia,
  type FoundVia,
} from "@/lib/lead-responder";
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

  return (
    <section
      aria-labelledby="contact-heading"
      className="bg-[#101214] py-16 text-[#f6f1ea] sm:py-20"
    >
      <Container size="xl">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-start lg:gap-16">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-wide text-[#f0b384]">
              Start a project
            </p>
            <h2
              id="contact-heading"
              className="mt-3 font-serif text-4xl leading-tight sm:text-5xl"
            >
              Send the goal and what you already have.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#d8d0c7] sm:text-lg sm:leading-8">
              Share your email and a short project summary. Esteban can use it
              to start a conversation about scope, availability, timing, and
              format needs.
            </p>

            {submitState === "success" ? (
              <div
                role="status"
                className="mt-7 rounded-xl border border-[#f0b384]/40 bg-white/5 p-5"
              >
                <p className="flex items-center gap-2 font-medium text-white">
                  <CheckCircle2 className="size-5 text-[#f0b384]" aria-hidden="true" />
                  Project details received.
                </p>
                <p className="mt-2 text-sm leading-6 text-[#d8d0c7]">
                  Thank you. Esteban now has the details needed to review your
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
              <form onSubmit={handleSubmit} className="mt-7 grid gap-4">
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
                    How did you find us?{" "}
                    <span className="font-normal text-[#aaa29a]">(optional)</span>
                  </label>
                  <select
                    id="homepage-found-via"
                    name="foundVia"
                    value={foundVia}
                    onChange={(event) =>
                      setFoundVia(isFoundVia(event.target.value) ? event.target.value : "")
                    }
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
                  <p role="alert" className="text-sm text-[#f7b9aa]">
                    The form could not be sent. Please try again or use the
                    email link beside it.
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    disabled={submitState === "submitting"}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white transition hover:bg-[var(--em-accent-ink-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-wait disabled:opacity-70"
                  >
                    {submitState === "submitting" ? "Sending…" : "Send project details"}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </button>
                  <Link
                    href="/contact"
                    className="-mx-2 inline-flex min-h-10 items-center rounded-md px-2 text-sm font-medium text-[#f0b384] underline underline-offset-4"
                  >
                    Build a detailed brief
                  </Link>
                </div>
              </form>
            )}
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
