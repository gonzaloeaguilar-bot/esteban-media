export type AiAgentLocale = "en" | "es";

export type AiAgentOffer = {
  title: string;
  price: string;
};

export type AiAgentRouteOption = {
  title: string;
  detail: string;
  price?: string;
  offers?: readonly AiAgentOffer[];
};

/**
 * Fixed build offers adopted from the current approved AI operations price
 * menu. These are build prices, not a promise of an ongoing monthly service.
 * Keep chatbot setup separate: it has its own $2,000-plus-monthly scope in
 * pricing.ts.
 */
export const AI_AGENT_ROUTE_OPTIONS: Record<AiAgentLocale, readonly AiAgentRouteOption[]> = {
  en: [
    {
      title: "AI chatbots",
      detail: "Answer common questions and capture the right next step.",
      price: "From $2,000 setup + monthly fee",
    },
    {
      title: "AI agents and automation",
      detail: "Connect repetitive work into a useful, human-reviewed workflow.",
      price: "Builds from $1,200",
      offers: [
        { title: "Weekly money report", price: "$1,200" },
        { title: "Full email assistant", price: "$1,500" },
        { title: "SEO and GEO assistant", price: "$1,800" },
        { title: "Sales assistant with managed CRM", price: "$2,400 setup + $297/mo" },
        { title: "Data assistant", price: "$3,000" },
        { title: "Operations tracker", price: "$6,000" },
      ],
    },
  ],
  es: [
    {
      title: "Chatbots con IA",
      detail: "Responde preguntas comunes y captura el siguiente paso correcto.",
      price: "Desde $2,000 de configuración + cuota mensual",
    },
    {
      title: "Agentes y automatización con IA",
      detail: "Conecta trabajo repetitivo en un flujo útil revisado por personas.",
      price: "Proyectos desde $1,200",
      offers: [
        { title: "Reporte semanal de dinero", price: "$1,200" },
        { title: "Asistente completo de email", price: "$1,500" },
        { title: "Asistente de SEO y GEO", price: "$1,800" },
        { title: "Asistente de ventas con CRM administrado", price: "$2,400 de configuración + $297/mes" },
        { title: "Asistente de datos", price: "$3,000" },
        { title: "Tracker de operaciones", price: "$6,000" },
      ],
    },
  ],
};
