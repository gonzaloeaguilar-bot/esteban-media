/**
 * The one primary conversion action on the home page, worded once.
 *
 * A UX review (2026-10-10) counted eight differently worded contact actions on
 * the home ("Start a video project", "See packages & prices", "Quote
 * Essential", "Ask about a project", "Message on WhatsApp", a bare "WhatsApp"
 * on every reel card...). Every quote or contact action now opens WhatsApp and
 * says the same thing, so a visitor learns the action once. Navigation links
 * ("View portfolio", "Explore service") stay secondary and keep their own
 * wording.
 *
 * Analytics: every element using this label carries a `data-cta` ending in
 * `_whatsapp`, which is how scripts/service-cta-dashboard.mjs classifies
 * contact actions, and the shared GA layer reports the wa.me click itself as
 * `contact_intent` (method whatsapp) regardless of the label.
 */
export type QuoteCtaLocale = "en" | "es";

export const QUOTE_CTA_LABEL: Record<QuoteCtaLocale, string> = {
  en: "Get a quote on WhatsApp",
  es: "Cotizar por WhatsApp",
};

export function quoteCtaLabel(locale: QuoteCtaLocale): string {
  return QUOTE_CTA_LABEL[locale];
}

/** The generic first message, when the action is not about one package. */
export const QUOTE_CTA_GREETING: Record<QuoteCtaLocale, string> = {
  en: "Hi Esteban, I saw your site and I'd like a quote.",
  es: "Hola Esteban, vi tu página y quiero una cotización.",
};
