// The words for the real estate monthly plans. The figures are NOT here: they
// come from lib/pricing.ts (REAL_ESTATE_PLANS and friends), so one edit there
// changes every surface. Copy follows Esteban's 2026-09-30 "Real Estate" price
// guide; the Spanish is a direct rendering of it.

import {
  REAL_ESTATE_PLANS,
  REAL_ESTATE_PLAN_TERMS,
  type RealEstatePlan,
} from "@/lib/pricing";
import type { Locale } from "@/lib/packages";

type PlanCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  perMonth: string;
  rows: {
    properties: string;
    productionDays: string;
    drone: string;
    social: string;
    posts: string;
    report: string;
  };
  values: { yes: string; addOn: string; included: string; everyTwoWeeks: string };
  quote: (name: string) => string;
  whatsapp: (name: string) => string;
  perShoot: string;
  everyPlan: { title: string; items: string[] };
  terms: string[];
};

const COPY: Record<Locale, PlanCopy> = {
  es: {
    eyebrow: "Real Estate",
    title: "Media para propiedades, en un plan mensual.",
    lead: "Tus sesiones de propiedad más la gestión de Instagram y TikTok, hechas con el contenido de tus propios listados. Elige el plan según cuántas propiedades tienes.",
    perMonth: "al mes",
    rows: {
      properties: "Propiedades al mes (hasta 3,000 SF c/u)",
      productionDays: "Días de producción al mes",
      drone: "Fotografía con dron",
      social: "Gestión de Instagram y TikTok",
      posts: "Posts o reels por semana",
      report: "Reporte de Metricool",
    },
    values: { yes: "Sí", addOn: "Adicional", included: "Incluida", everyTwoWeeks: "Cada 2 semanas" },
    quote: (name) => `Cotizar ${name}`,
    whatsapp: (name) => `Hola Esteban, me interesa el plan mensual de Real Estate ${name}.`,
    perShoot: "Ver precios por sesión",
    everyPlan: {
      title: "Todos los planes incluyen",
      items: [
        "Media de propiedad y gestión de redes en una sola factura, con contenido hecho de tus propias sesiones.",
        "De 20 a 30 fotos editadas por propiedad, según la propiedad.",
        "Flexibilidad: si un mes no tienes listado, esa sesión pasa al mes siguiente. Después vence, y no se guardan más de dos a la vez.",
      ],
    },
    terms: [
      "Mínimo de {months} meses. Se factura el día 1 de cada mes. Aviso de {notice} días para cancelar.",
      "No incluye inversión en anuncios ni responder comentarios o mensajes directos.",
      "Los cargos por zona se facturan aparte, por propiedad.",
    ],
  },
  en: {
    eyebrow: "Real Estate",
    title: "Listing media, in one monthly plan.",
    lead: "Your property shoots plus Instagram and TikTok management, built from your own listing content. Choose the plan that matches how many listings you have.",
    perMonth: "per month",
    rows: {
      properties: "Properties per month (up to 3,000 SF each)",
      productionDays: "Production days per month",
      drone: "Drone photography",
      social: "Instagram and TikTok management",
      posts: "Posts or reels per week",
      report: "Metricool report",
    },
    values: { yes: "Yes", addOn: "Add-on", included: "Included", everyTwoWeeks: "Every 2 weeks" },
    quote: (name) => `Quote ${name}`,
    whatsapp: (name) => `Hi Esteban, I'm interested in the ${name} real estate monthly plan.`,
    perShoot: "See per-shoot prices",
    everyPlan: {
      title: "Every plan includes",
      items: [
        "Listing media and social media management in one invoice, with content made from your own shoots.",
        "20–30 edited photos per property, depending on the property.",
        "Flexibility: if you have no listing one month, that property session rolls over to the next month. It expires after that, and no more than two are held at a time.",
      ],
    },
    terms: [
      "{months}-month minimum. Billed on the 1st of each month. {notice} days' notice to cancel.",
      "Not included: paid ad spend and replying to comments or direct messages.",
      "Out-of-area fees are billed separately, per property.",
    ],
  },
};

export function realEstatePlansCopy(locale: Locale): PlanCopy {
  return COPY[locale];
}

const NAMES: Record<RealEstatePlan["id"], string> = {
  essential: "Essential",
  plus: "Plus",
  premium: "Premium",
};

export function realEstatePlanName(id: RealEstatePlan["id"]): string {
  return NAMES[id];
}

export function realEstatePlans() {
  return REAL_ESTATE_PLANS;
}

/** Terms with the figures read from lib/pricing.ts, never typed into the copy. */
export function realEstateTerms(locale: Locale): string[] {
  return COPY[locale].terms.map((line) =>
    line
      .replace("{months}", String(REAL_ESTATE_PLAN_TERMS.minimumMonths))
      .replace("{notice}", String(REAL_ESTATE_PLAN_TERMS.cancelNoticeDays)),
  );
}
