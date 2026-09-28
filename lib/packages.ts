// Esteban's packages, in the words of his own 2026-09 services guide.
//
// Source: the multi-page "Paquetes" document Esteban sends clients (the
// "¿Qué necesitas hoy?" chooser, four packages, services a la carta and the
// three-step quote process). Copy is his, shortened only where the guide
// repeats itself. Nothing here names a client, a result or a review.
//
// Prices are NOT written here. They live in lib/pricing.ts PACKAGE_PRICES so
// one edit changes every surface.

import { PACKAGE_PRICES, usd, type PackageId, type PackagePrice } from "@/lib/pricing";

export type Locale = "en" | "es";

export type PackageContent = {
  id: PackageId;
  number: string;
  name: string;
  subtitle: string;
  headline: string[];
  includes: string[];
  idealFor: string;
  image: { src: string; alt: string; focal: string; sceneFocal?: string };
  /** The need card that routes to this package. */
  need: { title: string; line: string };
};

export type ALaCarteItem = {
  id: string;
  title: string;
  note?: string;
  href?: string;
  icon: "sparkles" | "camera" | "wand" | "map" | "gauge" | "workflow";
};

type Copy = {
  chooser: { eyebrow: string; title: string; lead: string; cta: (name: string) => string; close: string };
  packages: { eyebrow: string; title: string; packageWord: string; includesLabel: string; quote: (name: string) => string };
  aLaCarte: { eyebrow: string; title: string; lead: string; items: ALaCarteItem[] };
  process: { eyebrow: string; title: string; lead: string; steps: { title: string; body: string }[]; note: string };
  closing: { title: string; lead: string; whatsapp: string; call: string; email: string };
  price: { from: string; custom: string; customLine: string; units: Record<"project" | "month" | "production-day", string> };
};

const IMAGES = {
  arranque: { src: "/portfolio/bar-door-monkey.jpg", focal: "50% 55%" },
  crecimiento: { src: "/portfolio/ml-colombia.jpg", focal: "58% 40%" },
  "presencia-local": { src: "/about/esteban-on-location.jpg", focal: "50% 38%" },
  "todo-incluido": { src: "/portfolio/front-line-auto.jpg", focal: "18% 40%", sceneFocal: "100% 30%" },
} as const;

const ES_PACKAGES: PackageContent[] = [
  {
    id: "arranque",
    number: "01",
    name: "Arranque",
    subtitle: "Edición remota",
    headline: ["Tú grabas.", "Yo lo convierto en contenido."],
    includes: [
      "Edición de video remota",
      "Formato para Reels, TikTok, YouTube o web",
      "1 ronda de revisión incluida",
    ],
    idealFor: "Ideal para emprendedores y negocios que generan su propio material.",
    image: { ...IMAGES.arranque, alt: "Fotograma de un video de Esteban para un restaurante: un plato flameado en primer plano" },
    need: { title: "Ya tengo videos", line: "Necesito que alguien los edite y los convierta en contenido." },
  },
  {
    id: "crecimiento",
    number: "02",
    name: "Crecimiento",
    subtitle: "Plan social mensual",
    headline: ["De publicar cuando puedes", "a tener un sistema."],
    includes: [
      "Plan de contenido",
      "Calendario de publicación",
      "Edición incluida",
      "Reporte mensual",
    ],
    idealFor: "Ideal para marcas que ya publican pero necesitan orden, ritmo y una sola persona responsable del contenido.",
    image: { ...IMAGES.crecimiento, alt: "Fotograma vertical de un video de Esteban para redes sociales" },
    need: { title: "Quiero publicar constantemente", line: "Necesito estrategia, contenido y edición." },
  },
  {
    id: "presencia-local",
    number: "03",
    name: "Presencia Local",
    subtitle: "Producción en sitio",
    headline: ["Tu negocio.", "Tu espacio.", "Tu contenido."],
    includes: [
      "Pre-producción y captura en locación",
      "Edición post-captura",
      "Entregables según formato",
      "Fort Lauderdale, Broward y proyectos seleccionados en Miami-Dade",
    ],
    idealFor: "Ideal para negocios físicos, propiedades, restaurantes, eventos y marcas que necesitan material propio y original.",
    image: { ...IMAGES["presencia-local"], alt: "Esteban grabando en locación al aire libre con su equipo" },
    need: { title: "Necesito crear contenido en mi negocio", line: "Quiero que alguien venga, grabe y produzca." },
  },
  {
    id: "todo-incluido",
    number: "04",
    name: "Todo Incluido",
    subtitle: "Ecosistema digital",
    headline: ["Contenido + tecnología", "+ presencia digital."],
    includes: [
      "Sitio web de conversión",
      "Chatbot y captura de clientes con IA",
      "Perfil y presencia local (Google Business, Maps)",
      "Contenido y edición",
      "Reporte de todos los canales",
    ],
    idealFor: "Ideal para negocios que están arrancando su presencia digital desde cero o que quieren juntar varios proveedores en uno solo.",
    image: { ...IMAGES["todo-incluido"], alt: "Captura de un sitio web construido por Esteban Moreno Media" },
    need: { title: "Quiero resolverlo todo", line: "Web, contenido, IA y presencia digital." },
  },
];

const EN_PACKAGES: PackageContent[] = [
  {
    id: "arranque",
    number: "01",
    name: "Starter",
    subtitle: "Remote editing",
    headline: ["You film.", "I turn it into content."],
    includes: [
      "Remote video editing",
      "Formatted for Reels, TikTok, YouTube or web",
      "1 revision round included",
    ],
    idealFor: "For founders and businesses that already shoot their own footage.",
    image: { ...IMAGES.arranque, alt: "Frame from Esteban's restaurant video: a flambéed dish in close-up" },
    need: { title: "I already have videos", line: "I need someone to edit them into content." },
  },
  {
    id: "crecimiento",
    number: "02",
    name: "Growth",
    subtitle: "Monthly social plan",
    headline: ["From posting when you can", "to having a system."],
    includes: ["Content plan", "Publishing calendar", "Editing included", "Monthly report"],
    idealFor: "For brands that already post but need order, rhythm and one person responsible for content.",
    image: { ...IMAGES.crecimiento, alt: "Vertical frame from one of Esteban's social videos" },
    need: { title: "I want to post consistently", line: "I need strategy, content and editing." },
  },
  {
    id: "presencia-local",
    number: "03",
    name: "Local Presence",
    subtitle: "On-site production",
    headline: ["Your business.", "Your space.", "Your content."],
    includes: [
      "Pre-production and on-location capture",
      "Post-capture editing",
      "Deliverables in the formats you need",
      "Fort Lauderdale, Broward and selected Miami-Dade projects",
    ],
    idealFor: "For physical businesses, properties, restaurants, events and brands that need original footage of their own.",
    image: { ...IMAGES["presencia-local"], alt: "Esteban filming outdoors on location with his crew" },
    need: { title: "I need content made at my business", line: "Someone to come, film and produce it." },
  },
  {
    id: "todo-incluido",
    number: "04",
    name: "All-In",
    subtitle: "Digital ecosystem",
    headline: ["Content + technology", "+ digital presence."],
    includes: [
      "Conversion website",
      "AI chatbot and lead capture",
      "Local profile and presence (Google Business, Maps)",
      "Content and editing",
      "Reporting across every channel",
    ],
    idealFor: "For businesses starting their digital presence from zero, or combining several vendors into one.",
    image: { ...IMAGES["todo-incluido"], alt: "Screenshot of a website built by Esteban Moreno Media" },
    need: { title: "I want it all handled", line: "Website, content, AI and digital presence." },
  },
];

const COPY: Record<Locale, Copy> = {
  es: {
    chooser: {
      eyebrow: "¿Qué necesitas hoy?",
      title: "Elige tu punto de partida.",
      lead: "Cuéntame qué necesitas y yo me encargo del resto.",
      cta: (name) => `Paquete ${name}`,
      close: "Cerrar",
    },
    packages: {
      eyebrow: "Paquetes",
      title: "Cuatro formas de empezar.",
      packageWord: "Paquete",
      includesLabel: "Incluye",
      quote: (name) => `Cotizar ${name}`,
    },
    aLaCarte: {
      eyebrow: "Servicios a la carta",
      title: "¿Solo necesitas una cosa?",
      lead: "También trabajo por proyecto en servicios puntuales.",
      items: [
        { id: "ia", title: "Contenido asistido por IA", note: "Cotización según referencia y objetivo", icon: "sparkles" },
        { id: "foto", title: "Fotografía de producto o inmobiliaria", href: "/es/fotografo-en-fort-lauderdale", icon: "camera" },
        { id: "mejora", title: "Mejora de fotos con IA", note: "Inmobiliaria y producto", href: "/es/fotos-con-ia-para-bienes-raices-miami", icon: "wand" },
        { id: "seo", title: "SEO local y visibilidad en buscadores de IA", href: "/es/presencia-local-seo", icon: "map" },
        { id: "auditoria", title: "Auditoría de sitio, embudo y competencia", href: "/es/auditoria-de-funnel-y-datos", icon: "gauge" },
        { id: "automatizacion", title: "Automatización de operaciones", note: "Integraciones y reportes", href: "/es/automatizacion-de-operaciones", icon: "workflow" },
      ],
    },
    process: {
      eyebrow: "Así de simple",
      title: "Tu cotización en 3 pasos.",
      lead: "Sin formularios largos. Una conversación corta.",
      steps: [
        { title: "Cuéntame tu objetivo", body: "Envíame el material que tienes y dime qué quieres lograr." },
        { title: "Confirmamos el alcance", body: "Formato, volumen, entregables, ubicación si aplica y plazos." },
        { title: "Recibes tu cotización", body: "Específica para tu proyecto." },
      ],
      note: "Los precios de esta guía son puntos de partida, no tarifas fijas.",
    },
    closing: {
      title: "¿Listo para crear algo increíble?",
      lead: "Hablemos de tu proyecto.",
      whatsapp: "Escribir por WhatsApp",
      call: "Llamar",
      email: "Enviar email",
    },
    price: {
      from: "Desde",
      custom: "Personalizada",
      customLine: "Cotización",
      units: { project: "por proyecto", month: "al mes", "production-day": "por día de producción" },
    },
  },
  en: {
    chooser: {
      eyebrow: "What do you need today?",
      title: "Pick your starting point.",
      lead: "Tell me what you need and I will handle the rest.",
      cta: (name) => `${name} package`,
      close: "Close",
    },
    packages: {
      eyebrow: "Packages",
      title: "Four ways to start.",
      packageWord: "Package",
      includesLabel: "Includes",
      quote: (name) => `Quote ${name}`,
    },
    aLaCarte: {
      eyebrow: "À la carte",
      title: "Only need one thing?",
      lead: "I also take single projects.",
      items: [
        { id: "ia", title: "AI-assisted content", note: "Quoted from your reference and goal", icon: "sparkles" },
        { id: "foto", title: "Product or real estate photography", note: "Quoted per shoot", icon: "camera" },
        { id: "mejora", title: "AI photo enhancement", note: "Real estate and product", href: "/services/ai-real-estate-photo-enhancement", icon: "wand" },
        { id: "seo", title: "Local SEO and AI-search visibility", href: "/services/local-presence-seo", icon: "map" },
        { id: "auditoria", title: "Website, funnel and competitor audit", href: "/services/growth-funnel-audit", icon: "gauge" },
        { id: "automatizacion", title: "Operations automation", note: "Integrations and reporting", href: "/services/custom-operations-automation", icon: "workflow" },
      ],
    },
    process: {
      eyebrow: "That simple",
      title: "Your quote in 3 steps.",
      lead: "No long forms. One short conversation.",
      steps: [
        { title: "Tell me your goal", body: "Send the material you have and what you want to achieve." },
        { title: "We confirm the scope", body: "Format, volume, deliverables, location if needed, and timing." },
        { title: "You get your quote", body: "Specific to your project." },
      ],
      note: "Prices in this guide are starting points, not fixed rates.",
    },
    closing: {
      title: "Ready to make something great?",
      lead: "Let's talk about your project.",
      whatsapp: "Message on WhatsApp",
      call: "Call",
      email: "Send email",
    },
    price: {
      from: "From",
      custom: "Custom",
      customLine: "Quote",
      units: { project: "per project", month: "per month", "production-day": "per production day" },
    },
  },
};

export function packagesFor(locale: Locale): PackageContent[] {
  return locale === "es" ? ES_PACKAGES : EN_PACKAGES;
}

export function packagesCopy(locale: Locale): Copy {
  return COPY[locale];
}

export function priceFor(id: PackageId): PackagePrice {
  return PACKAGE_PRICES[id];
}

/** The WhatsApp link with the package already named, so the first message is never blank. */
export function whatsappHref(phoneE164: string, text: string): string {
  return `https://wa.me/${phoneE164.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}

export function packageAnchor(id: PackageId): string {
  return `paquete-${id}`;
}

// ------------------------------------------------------------ search + AI
// Everything below is DERIVED from the same content and PACKAGE_PRICES the
// page renders, so structured data can never disagree with what a visitor sees.


export function priceSentence(locale: Locale, id: PackageId): string {
  const p = PACKAGE_PRICES[id];
  const c = COPY[locale].price;
  return p.kind === "from" ? `${c.from} ${usd(p.amount)} ${c.units[p.unit]}` : `${c.customLine} ${c.custom.toLowerCase()}`;
}

/** Short, answer-first questions for the page and for FAQPage schema. */
export function packageFaq(locale: Locale): { id: string; question: string; answer: string }[] {
  const pk = packagesFor(locale);
  const by = (id: PackageId) => pk.find((p) => p.id === id)!;
  const es = locale === "es";
  return [
    {
      id: "cuanto-edicion",
      question: es ? "¿Cuánto cobra Esteban por editar un video?" : "How much does Esteban charge to edit a video?",
      answer: es
        ? `El paquete ${by("arranque").name} (edición remota de tu material) es ${priceSentence("es", "arranque").toLowerCase()}, con formato para Reels, TikTok, YouTube o web y una ronda de revisión.`
        : `The ${by("arranque").name} package (remote editing of your footage) is ${priceSentence("en", "arranque").toLowerCase()}, formatted for Reels, TikTok, YouTube or web, with one revision round.`,
    },
    {
      id: "plan-mensual",
      question: es ? "¿Tiene un plan mensual para redes sociales?" : "Is there a monthly social media plan?",
      answer: es
        ? `Sí: ${by("crecimiento").name}, ${priceSentence("es", "crecimiento").toLowerCase()}. Incluye plan de contenido, calendario, edición y reporte mensual.`
        : `Yes: ${by("crecimiento").name}, ${priceSentence("en", "crecimiento").toLowerCase()}. It includes a content plan, calendar, editing and a monthly report.`,
    },
    {
      id: "grabar-negocio",
      question: es ? "¿Puede venir a grabar a mi negocio en Fort Lauderdale o Miami?" : "Can he film at my business in Fort Lauderdale or Miami?",
      answer: es
        ? `Sí, con ${by("presencia-local").name}: ${priceSentence("es", "presencia-local").toLowerCase()}, en Fort Lauderdale, Broward y proyectos seleccionados en Miami-Dade.`
        : `Yes, with ${by("presencia-local").name}: ${priceSentence("en", "presencia-local").toLowerCase()}, in Fort Lauderdale, Broward and selected Miami-Dade projects.`,
    },
    {
      id: "precios-fijos",
      question: es ? "¿Los precios son fijos?" : "Are the prices fixed?",
      answer: es
        ? "No. Son puntos de partida: cada proyecto recibe una cotización específica después de confirmar formato, volumen, entregables y plazos."
        : "No. They are starting points: every project gets a specific quote after format, volume, deliverables and timing are confirmed.",
    },
  ];
}

/** OfferCatalog + FAQPage, from the rendered content. */
export function packagesJsonLd(locale: Locale, homeUrl: string, providerId: string) {
  const es = locale === "es";
  const catalog = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: es ? "Paquetes de Esteban Moreno Media" : "Esteban Moreno Media packages",
    url: `${homeUrl}#${es ? "paquetes" : "packages"}`,
    itemListElement: packagesFor(locale).map((pkg, i) => {
      const price = PACKAGE_PRICES[pkg.id];
      return {
        "@type": "Offer",
        position: i + 1,
        name: `${es ? "Paquete" : "Package"} ${pkg.name} — ${pkg.subtitle}`,
        description: `${pkg.headline.join(" ")} ${pkg.includes.join(". ")}.`,
        url: `${homeUrl}#${packageAnchor(pkg.id)}`,
        availableAtOrFrom: { "@type": "Place", name: "Fort Lauderdale, FL" },
        itemOffered: { "@type": "Service", name: `${pkg.name} — ${pkg.subtitle}`, provider: { "@id": providerId } },
        ...(price.kind === "from"
          ? {
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                minPrice: price.amount,
                priceCurrency: "USD",
                unitText: COPY[locale].price.units[price.unit],
              },
            }
          : {}),
      };
    }),
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: packageFaq(locale).map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
  return [catalog, faq];
}
