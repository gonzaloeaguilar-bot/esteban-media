/**
 * The three audiences, and the page each one should land on.
 *
 * NOT invented. Each lane points at a page the data already shows working, and
 * the order is the order of evidence:
 *
 *  1. REAL ESTATE — /es/guias/ideas-de-reels-para-agentes-de-bienes-raices is the
 *     4th-biggest landing page on the site (9 sessions in 30 days) with ONE search
 *     impression, so that traffic is social. One of his 11 Google reviews is from
 *     a real estate client. Perplexity cites him for "video editor for realtors in
 *     South Florida who speaks Spanish" and not for the generic English variants.
 *     And the callers Esteban reports are real estate agents.
 *  2. LOCAL BUSINESS — /es/reels-para-negocios-miami is the 2nd-biggest landing
 *     page and produced the site's only contact click in the window.
 *  3. AGENCY / OVERFLOW — the three pages that earn search impressions on
 *     /services are agency-shaped work, and the original outreach list's only
 *     three deliverable contacts were agencies. Kept last because an agency is a
 *     white-label buyer, not the client the other two lanes describe.
 *
 * Spanish first inside each lane's destination where a Spanish page exists,
 * because the converting pages are the Spanish ones and the market is bilingual.
 */

export type AudienceLocale = "en" | "es";

export type AudienceLane = {
  id: string;
  who: string;
  title: string;
  detail: string;
  action: string;
  href: string;
};

type AudienceCopy = {
  eyebrow: string;
  heading: string;
  lanes: readonly AudienceLane[];
};

export const AUDIENCE_LANES: Record<AudienceLocale, AudienceCopy> = {
  en: {
    eyebrow: "Start where you are",
    heading: "Which of these sounds like you?",
    lanes: [
      {
        id: "real-estate",
        who: "Real estate agent or brokerage",
        title: "You have listing footage and no time to cut it.",
        detail:
          "Walkthroughs, neighborhood pieces and agent-brand Reels from footage you already shot — including what a condo board and controlled airspace actually allow.",
        action: "Real estate Reels",
        href: "/guides/instagram-reels-ideas-for-real-estate",
      },
      {
        id: "local-business",
        who: "Local business",
        title: "You post when you remember to.",
        detail:
          "Editing and a plain content plan so posting stays consistent, built from phone footage rather than a production day.",
        action: "Reels for a local business",
        href: "/services/short-form-video-editor-miami",
      },
      {
        id: "agency",
        who: "Agency or studio",
        title: "You need overflow editing this week.",
        detail:
          "White-label post-production on your supplied footage, scoped per project, with organized feedback rounds instead of scattered notes.",
        action: "Overflow editing",
        href: "/services",
      },
    ],
  },
  es: {
    eyebrow: "Empieza por donde estás",
    heading: "¿Cuál de estos eres tú?",
    lanes: [
      {
        id: "real-estate",
        who: "Agente inmobiliario o inmobiliaria",
        title: "Tienes el material de la propiedad y no tienes tiempo de editarlo.",
        detail:
          "Recorridos, piezas del vecindario y Reels de marca personal a partir de lo que ya grabaste — incluido lo que de verdad permiten un condominio y el espacio aéreo controlado.",
        action: "Reels para bienes raíces",
        href: "/es/guias/ideas-de-reels-para-agentes-de-bienes-raices",
      },
      {
        id: "local-business",
        who: "Negocio local",
        title: "Publicas cuando te acuerdas.",
        detail:
          "Edición y un plan de contenido sencillo para publicar con constancia, armado con material de celular y no con un día de producción.",
        action: "Reels para tu negocio",
        href: "/es/reels-para-negocios-miami",
      },
      {
        id: "agency",
        who: "Agencia o estudio",
        title: "Necesitas apoyo de edición esta semana.",
        detail:
          "Postproducción de marca blanca sobre tu material, con alcance por proyecto y rondas de feedback ordenadas en lugar de notas dispersas.",
        action: "Edición de apoyo",
        href: "/es/servicios",
      },
    ],
  },
};
