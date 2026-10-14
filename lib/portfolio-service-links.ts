// Which service page each portfolio project should send a reader to, when a
// dedicated page exists. Without an entry, the watch page keeps its generic
// "/services#<id>" card.
//
// 2026-10-14 owner facts (vault esteban-owner-facts-2026-10-14):
//   - weddings: the Diana & Jack wedding film leads to the wedding page;
//   - web, landing pages and chatbots are a service line to market (row 75),
//     so each web project leads to the growth-system page its work belongs to.
// Titles and details reuse wording already published on the target pages.

export type PortfolioServiceLink = { href: string; title: string; detail: string };

type Localized = { en: PortfolioServiceLink; es: PortfolioServiceLink };

const CONVERSION_WEBSITES: Localized = {
  en: {
    href: "/services/conversion-websites",
    title: "Conversion websites",
    detail: "Custom mobile-first websites and focused landing pages built around a clear offer and a measurable inquiry path.",
  },
  es: {
    href: "/es/sitios-web-de-conversion",
    title: "Sitios web de conversión",
    detail: "Sitios web personalizados mobile-first y landing pages enfocadas en una oferta clara y una ruta de consulta medible.",
  },
};

const AI_LEAD_CAPTURE: Localized = {
  en: {
    href: "/services/ai-lead-capture-automation",
    title: "AI lead capture & lifecycle automation",
    detail: "Chatbots, ManyChat DM flows, email, SMS, and handoff rules that help a qualified inquiry reach the right next step.",
  },
  es: {
    href: "/es/captura-y-automatizacion-de-clientes-con-ia",
    title: "Captura y automatización de clientes con IA",
    detail: "Chatbots, flujos de DM en ManyChat, email, SMS y reglas de handoff para llevar una consulta calificada al siguiente paso correcto.",
  },
};

const WEDDING: Localized = {
  en: {
    href: "/services/wedding-videographer-fort-lauderdale",
    title: "Wedding videographer in Fort Lauderdale and Miami",
    detail: "Weddings filmed and edited into a full film and a highlight trailer. Each wedding is quoted individually.",
  },
  es: {
    href: "/es/videografo-de-bodas-fort-lauderdale",
    title: "Videógrafo de bodas en Fort Lauderdale y Miami",
    detail: "Bodas grabadas y editadas en una película completa y un tráiler. Cada boda se cotiza por separado.",
  },
};

const LINKS: Readonly<Record<string, Localized>> = {
  "diana-jack": WEDDING,
  "flas-concierge": CONVERSION_WEBSITES,
  "front-line-auto": CONVERSION_WEBSITES,
  titanforge: AI_LEAD_CAPTURE,
  "gains-from-geebs": AI_LEAD_CAPTURE,
  "ai-lead-automation": AI_LEAD_CAPTURE,
};

export function portfolioServiceLink(id: string, locale: "en" | "es"): PortfolioServiceLink | undefined {
  return LINKS[id]?.[locale];
}
