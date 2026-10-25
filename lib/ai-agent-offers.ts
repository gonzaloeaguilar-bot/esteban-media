export type AiAgentLocale = "en" | "es";

export type AiAgentOffer = {
  title: string;
  price?: string;
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

/**
 * Published digital-service starting prices. The SEO/GEO work begins with the
 * website and search-tracking build; a landing page is a single focused page,
 * not a full website. The short inclusion lists make that distinction visible
 * before someone asks for a quote.
 */
export const SEO_LANDING_ROUTE_OPTIONS: Record<AiAgentLocale, readonly AiAgentRouteOption[]> = {
  en: [
    {
      title: "SEO and GEO",
      detail: "Make the service, location and next action clear for search and AI answers.",
      price: "From $1,800",
      offers: [
        { title: "Website and search tracking" },
        { title: "Service and location-page review" },
        { title: "Technical search fixes and a first-priority plan" },
      ],
    },
    {
      title: "Landing pages",
      detail: "Give a campaign or service one focused page that makes the next step obvious.",
      price: `From ${usd(LANDING_PAGE_PRICE.from)} · ${LANDING_PAGE_PRICE.deliveryBusinessDays} business days`,
      offers: [
        { title: "One offer with one clear next step", price: `${LANDING_PAGE_PRICE.deliveryBusinessDays} business days` },
        { title: "Mobile-first page with a form or contact action" },
        { title: "Conversion-event setup" },
        { title: "English, Spanish, or both when scoped" },
      ],
    },
  ],
  es: [
    {
      title: "SEO y GEO",
      detail: "Aclara servicio, ubicación y siguiente paso para buscadores y respuestas de IA.",
      price: "Desde $1,800",
      offers: [
        { title: "Sitio web y seguimiento de búsquedas" },
        { title: "Revisión de páginas de servicio y ubicación" },
        { title: "Ajustes técnicos y un plan de prioridades" },
      ],
    },
    {
      title: "Landing pages",
      detail: "Una página enfocada para que una campaña o servicio tenga un siguiente paso claro.",
      price: `Desde ${usd(LANDING_PAGE_PRICE.from)} · ${LANDING_PAGE_PRICE.deliveryBusinessDays} días hábiles`,
      offers: [
        { title: "Una oferta con un siguiente paso claro", price: `${LANDING_PAGE_PRICE.deliveryBusinessDays} días hábiles` },
        { title: "Página pensada para celular con formulario o contacto" },
        { title: "Configuración de eventos de conversión" },
        { title: "Inglés, español o ambos cuando se acuerde" },
      ],
    },
  ],
};

/**
 * Website builds have a $5,000 owner-approved starting point. Ecommerce
 * content has two distinct published starting points:
 * a real product-photo session and an edit for a product or ad creative.
 */
export const WEB_ECOMMERCE_ROUTE_OPTIONS: Record<AiAgentLocale, readonly AiAgentRouteOption[]> = {
  en: [
    {
      title: "Websites",
      detail: "A clear home for the offer, proof and ways to get in touch.",
      price: `From ${usd(WEBSITE_BUILD_PRICE.from)}`,
      offers: [
        { title: "Landing page — one offer and one action", price: `Starting at ${usd(LANDING_PAGE_PRICE.from)} · ${LANDING_PAGE_PRICE.deliveryBusinessDays} business days` },
        { title: "Business website — UX/UI, wireframes, design library and analytics", price: `${usd(WEBSITE_BUILD_PRICE.from)}+` },
        { title: "Ecommerce store — products, cart, sign-up and checkout flow", price: `${usd(WEB_PRODUCT_PACKAGE_PRICES.ecommerceStore)}+` },
        { title: "Customer growth system — CRM, email/SMS marketing, retention and customer mapping", price: `${usd(WEB_PRODUCT_PACKAGE_PRICES.customerGrowthSystem)}+` },
        { title: "Custom product experience — user stories, onboarding, gamification and shared components", price: `${usd(WEB_PRODUCT_PACKAGE_PRICES.customProductExperience)}+` },
        { title: "English, Spanish, or both when scoped" },
      ],
    },
    {
      title: "Ecommerce content",
      detail: "Product photos and video that help an online store show what it sells.",
      price: `From ${usd(PRODUCT_PHOTO_SESSION.from)} / session`,
      offers: [
        { title: "Product photography session", price: `From ${usd(PRODUCT_PHOTO_SESSION.from)} / session` },
        { title: "Product or ad-video edit", price: `${usd(PRICING_BANDS.ecommerce.baseMin)}–${usd(PRICING_BANDS.ecommerce.baseMax)}` },
        { title: "Scope based on products, angles, setting, retouching and use" },
      ],
    },
  ],
  es: [
    {
      title: "Sitios web",
      detail: "Un hogar claro para la oferta, prueba y formas de contactar.",
      price: `Desde ${usd(WEBSITE_BUILD_PRICE.from)}`,
      offers: [
        { title: "Landing page — una oferta y una acción", price: `Desde ${usd(LANDING_PAGE_PRICE.from)} · ${LANDING_PAGE_PRICE.deliveryBusinessDays} días hábiles` },
        { title: "Sitio web para negocio — UX/UI, wireframes, librería de diseño y analítica", price: `${usd(WEBSITE_BUILD_PRICE.from)}+` },
        { title: "Tienda ecommerce — productos, carrito, registro y flujo de pago", price: `${usd(WEB_PRODUCT_PACKAGE_PRICES.ecommerceStore)}+` },
        { title: "Sistema de crecimiento — CRM, marketing por email/SMS, retención y mapa de cliente", price: `${usd(WEB_PRODUCT_PACKAGE_PRICES.customerGrowthSystem)}+` },
        { title: "Experiencia digital a medida — user stories, onboarding, gamificación y componentes compartidos", price: `${usd(WEB_PRODUCT_PACKAGE_PRICES.customProductExperience)}+` },
        { title: "Inglés, español o ambos cuando se acuerde" },
      ],
    },
    {
      title: "Contenido para ecommerce",
      detail: "Fotos y video de producto para que una tienda online muestre lo que vende.",
      price: `Desde ${usd(PRODUCT_PHOTO_SESSION.from)} / sesión`,
      offers: [
        { title: "Sesión de fotografía de producto", price: `Desde ${usd(PRODUCT_PHOTO_SESSION.from)} / sesión` },
        { title: "Edición de video de producto o anuncio", price: `${usd(PRICING_BANDS.ecommerce.baseMin)}–${usd(PRICING_BANDS.ecommerce.baseMax)}` },
        { title: "Alcance según productos, ángulos, ambientación, retoque y uso" },
      ],
    },
  ],
};
import { LANDING_PAGE_PRICE, PRICING_BANDS, PRODUCT_PHOTO_SESSION, WEB_PRODUCT_PACKAGE_PRICES, WEBSITE_BUILD_PRICE, usd } from "@/lib/pricing";
