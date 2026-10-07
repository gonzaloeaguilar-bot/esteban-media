/**
 * Client-side analytics events fired from React components.
 *
 * The GA4 loader in `google-analytics-script.ts` installs `window.gtag` and
 * handles link-based contact intent. It cannot see React form submissions, so
 * the lead forms that POST to /api/lead report themselves here.
 *
 * PRIVACY: never pass name, email, phone, company, or free-text answers. The
 * property runs with enhanced measurement and ad personalization disabled, and
 * the published privacy notice depends on that staying true. Only the form
 * identity and locale go to GA4; the PII stays in the /api/lead payload.
 */

import type { FoundVia, LeadSource } from "@/lib/lead-responder";

type Gtag = (command: "event", name: string, params?: Record<string, unknown>) => void;
/**
 * The site's one writer (lib/google-analytics-script.ts `sendEvent`). It takes
 * the event NAME first — it is not gtag. Calling it gtag-style, with a leading
 * "event", sent every event to GA4 named "event" with the real name spread
 * into numbered parameters. That shipped in #216 and went unnoticed because no
 * test ever executed the writer with a caller.
 */
type SiteTrack = (name: string, params?: Record<string, unknown>) => void;

/** Records interest in a public service category; no visitor or form data is sent. */
export function trackServiceInterest(service: string, locale: string): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag !== "function") return;
  // Through the site's one writer, so the event carries the shared block and
  // its contract twin. See google-analytics-script.ts.
  const send = (window as unknown as { __estebanTrack?: SiteTrack }).__estebanTrack;
  if (typeof send === "function") return send("service_interest", { service, locale });
  gtag("event", "service_interest", { service, locale });
}

/**
 * Fires only after a lead form receives a successful /api/lead response.
 *
 * `lead_submit` preserves form-level reporting. `contact_intent` is emitted as
 * the shared, configured conversion event so submitted forms and direct contact
 * links use one conversion family without sending personal data to GA4.
 */
export function trackLeadSubmit(
  leadSource: LeadSource,
  locale: string,
  // Only the answer's slug ("chatgpt", "google_search"…), never the words the
  // visitor typed. Forms without the question omit it entirely.
  foundVia?: FoundVia | "not_answered",
): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag !== "function") return;
  const send = (window as unknown as { __estebanTrack?: SiteTrack }).__estebanTrack;
  const emit = typeof send === "function"
    ? (name: string, params: Record<string, unknown>) => send(name, params)
    : (name: string, params: Record<string, unknown>) => gtag("event", name, params);
  const found = foundVia ? { found_via: foundVia } : {};
  emit("lead_submit", { lead_source: leadSource, locale, ...found });
  emit("contact_intent", {
    contact_method: "form_submit",
    lead_source: leadSource,
    locale,
    ...found,
  });
}
