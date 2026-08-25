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

/** Fires once a lead form has been submitted, mirroring its /api/lead `source`. */
export function trackLeadSubmit(leadSource: LeadSource, locale: string): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag !== "function") return;
  gtag("event", "lead_submit", { lead_source: leadSource, locale });
}
