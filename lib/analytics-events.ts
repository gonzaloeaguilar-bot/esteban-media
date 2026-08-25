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

import type { LeadSource } from "@/lib/lead-responder";

type Gtag = (command: "event", name: string, params?: Record<string, unknown>) => void;

/** Records interest in a public service category; no visitor or form data is sent. */
export function trackServiceInterest(service: string, locale: string): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag !== "function") return;
  gtag("event", "service_interest", { service, locale });
}

/**
 * Fires only after a lead form receives a successful /api/lead response.
 *
 * `lead_submit` preserves form-level reporting. `contact_intent` is emitted as
 * the shared, configured conversion event so submitted forms and direct contact
 * links use one conversion family without sending personal data to GA4.
 */
export function trackLeadSubmit(leadSource: LeadSource, locale: string): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag !== "function") return;
  gtag("event", "lead_submit", { lead_source: leadSource, locale });
  gtag("event", "contact_intent", {
    contact_method: "form_submit",
    lead_source: leadSource,
    locale,
  });
}
