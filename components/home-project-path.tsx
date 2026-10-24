"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown, Heart, MapPin, MessageCircle, Plus, Send, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { StarterOptions } from "@/components/starter-options";

import type { AudienceLocale } from "@/lib/audience-lanes";
import { laneFunnelPrice, laneOffers, type ChooserLaneId } from "@/lib/chooser-lane-pricing";
import {
  CREW_RECORDING_RATES,
  KICKSTARTER_LAUNCH,
  ON_LOCATION_CAPTURE,
  PRODUCT_PHOTO_SESSION,
  REAL_ESTATE_PLAN_TERMS,
  YACHT_PRODUCTION,
  usd,
  type PackageId,
} from "@/lib/pricing";
import { HomePathFunnel } from "@/components/home-path-funnel";
import { packagesCopy, packagesFor, priceFor, whatsappHref } from "@/lib/packages";
import { aLaCarteVisual } from "@/lib/a-la-carte-visuals";
import { quoteCtaLabel } from "@/lib/quote-cta";
import { site } from "@/lib/site";

const copy = {
  en: {
    eyebrow: "Find your starting point",
    heading: "What do you need made?",
    intro: "Choose a project to see the relevant work and next steps.",
    labels: ["Reels for my properties", "Edit footage I already have", "Publish consistently each month", "Film at my business"],
    /* The control needs two or three words, not a sentence: at full length the
       three options stacked into one grey block with the inactive ones barely
       legible. The full label still reads on the card below. */
    tabs: ["Real estate", "Edit footage", "Monthly content", "On-site filming"],
    singleShortcut: { title: "Need one specific thing?", lead: "Photo, filming, or digital support quoted for your project." },
    singleLead: "Tap one to see what to send me.",
    singleAsk: "Ask about this",
    singleService: "See service page",
    singleSend: "What to send",
    singleCta: "Start a single project",
    singleWho: "One service, quoted for your project",
    singleLabel: "Single project",
    singleQuoted: "Quoted per project",
    singleFrom: "From",
    singleSession: "/session",
    singleHalfDay: "/half-day",
    singleCredit: "Concept illustrations created with AI.",
    lensAlt: "Illustration of Esteban's Sony Alpha 7 IV camera lens",
    lensAction: "Show the next project type",
    singleWhatsapp: "Hi Esteban, I'd like a quote for a single project.",
  artAlts: [
      "Concept illustration of a home, camera and property photographs",
      "Concept illustration of an editing desk with a monitor, filmstrip and headphones",
      "Concept illustration of a cafe being filmed on a phone",
      "Concept illustration of a camera crew filming at a local business",
  ],
  routeVisualAlts: {
    "real-estate": "Property photography and a camera for real estate marketing",
    editing: "Vertical video clip for a content creator",
    production: "Esteban filming a live conference speaker",
    "local-business": "Video production at a local business",
    "ai-agents": "Gains From Geebs AI companion and chatbot interface",
    "seo-landing": "Search and landing-page signals for a local business",
    "web-commerce": "Current Gains From Geebs website experience",
  },
    pricingDetail: "These are starting prices. The final price depends on the project scope.",
    pricingAction: "See everything each package includes",
    offersLabel: "What this includes",
    morePlans: "Need custom volume or 4+ properties? View full plan comparison.",
    thumbAlt: (title: string) => `Concept illustration for ${title}`,
    swipe: "Choose the situation that matches your project.",
    sceneLabels: ["Frame your listing", "Bring the edit to life", "Publish with a system", "Create original footage"],
    sceneFacts: [
      ["Walkthroughs and Reels.", "Edited from your footage."],
      ["Cuts, captions and sound.", "Clear feedback for the next version."],
      ["Plan, calendar and editing.", "A monthly rhythm for your channels."],
      ["A production day at your business.", "Footage and edits ready for every format."],
    ],
    pricingHref: "/pricing",
    from: "From",
    custom: "Custom quote",
    units: { video: "/video", month: "/month", "production-day": "/production day" },
    localLinks: [
      { href: "/services/video-production-fort-lauderdale", label: "Film a video in Fort Lauderdale" },
      { href: "/services/reels-editor-fort-lauderdale", label: "Edit Reels in Fort Lauderdale" },
    ],
    minimumTerm: `${REAL_ESTATE_PLAN_TERMS.minimumMonths}-month minimum commitment.`,
    termsLink: "Full terms are on the pricing page",
    turnaround: (days: number) =>
      days === 7
        ? "One week minimum turnaround — not a fixed delivery date"
        : `${days}-day minimum turnaround — not a fixed delivery date`,
  },
  es: {
    eyebrow: "Encuentra por dónde empezar",
    heading: "¿Qué necesitas crear?",
    intro: "Elige un proyecto para ver trabajo relacionado y los próximos pasos.",
    labels: ["Reels para mis propiedades", "Editar material que ya grabé", "Publicar cada mes", "Grabar en mi negocio"],
    tabs: ["Inmobiliaria", "Editar material", "Contenido mensual", "Grabar en sitio"],
    singleShortcut: { title: "¿Necesitas algo puntual?", lead: "Foto, grabación o ayuda digital cotizada para tu proyecto." },
    singleLead: "Toca uno para saber qué enviarme.",
    singleAsk: "Preguntar por esto",
    singleService: "Ver página del servicio",
    singleSend: "Qué enviarme",
    singleCta: "Empezar un proyecto puntual",
    singleWho: "Un servicio, cotizado a tu proyecto",
    singleLabel: "Proyecto puntual",
    singleQuoted: "Cotización por proyecto",
    singleFrom: "Desde",
    singleSession: "/sesión",
    singleHalfDay: "/medio día",
    singleCredit: "Ilustraciones conceptuales creadas con IA.",
    lensAlt: "Ilustración del lente de la cámara Sony Alpha 7 IV de Esteban",
    lensAction: "Mostrar el siguiente tipo de proyecto",
    singleWhatsapp: "Hola Esteban, quiero una cotización para un proyecto puntual.",
  artAlts: [
      "Ilustración conceptual de una casa, una cámara y fotografías de la propiedad",
      "Ilustración conceptual de una mesa de edición con monitor, película y audífonos",
      "Ilustración conceptual de un café grabado con un celular",
      "Ilustración conceptual de un equipo grabando en un negocio local",
  ],
  routeVisualAlts: {
    "real-estate": "Fotografía de propiedad y cámara para marketing inmobiliario",
    editing: "Video vertical para un creador de contenido",
    production: "Esteban grabando a un conferencista en vivo",
    "local-business": "Producción de video en un negocio local",
    "ai-agents": "Personaje de IA y chatbot de Gains From Geebs",
    "seo-landing": "Señales de búsqueda y landing page para un negocio local",
    "web-commerce": "Experiencia web actual de Gains From Geebs",
  },
    pricingDetail: "Son precios de partida. El precio final depende del alcance del proyecto.",
    pricingAction: "Ver todo lo que incluye cada paquete",
    offersLabel: "Qué incluye",
    morePlans: "¿Más de 4 propiedades o volumen a medida? Ver comparativa completa de planes.",
    thumbAlt: (title: string) => `Ilustración conceptual de ${title}`,
    swipe: "Elige la situación que se parece a tu proyecto.",
    sceneLabels: ["Encuadra tu propiedad", "Dale ritmo al material", "Publica con un sistema", "Crea material original"],
    sceneFacts: [
      ["Recorridos y Reels.", "Editados a partir de tu material."],
      ["Cortes, subtítulos y sonido.", "Comentarios organizados para la siguiente versión."],
      ["Plan, calendario y edición.", "Un ritmo mensual para tus canales."],
      ["Un día de producción en tu negocio.", "Material y ediciones para cada formato."],
    ],
    pricingHref: "/es/precios",
    from: "Desde",
    custom: "Cotización personalizada",
    units: { video: "/video", month: "/mes", "production-day": "/día de producción" },
    localLinks: [
      { href: "/es/produccion-de-video-fort-lauderdale", label: "Grabar video en Fort Lauderdale" },
      { href: "/es/editor-de-reels-fort-lauderdale", label: "Editar Reels en Fort Lauderdale" },
    ],
    minimumTerm: `Mínimo de ${REAL_ESTATE_PLAN_TERMS.minimumMonths} meses de compromiso.`,
    termsLink: "Las condiciones completas están en la página de precios",
    turnaround: (days: number) =>
      days === 7
        ? "Mínimo de una semana de entrega — no es una fecha fija"
        : `Mínimo de ${days} días de entrega — no es una fecha fija`,
  },
} as const;

type RouteId = "real-estate" | "editing" | "production" | "local-business" | "ai-agents" | "seo-landing" | "web-commerce";

/**
 * Routes are intentionally organized around what a human is buying, not the
 * billing unit. A service appears once, in the route where a visitor expects
 * to find it. Creators own their editing and creator-filming path; event,
 * yacht, and commercial buyers do not have to infer that work from a generic
 * "one specific thing" label.
 */
const routeDefinitions: Array<{
  id: RouteId;
  offerIds: PackageId[] | "real-estate";
  serviceIds: string[];
  artwork: "property" | "editing" | "business";
}> = [
  { id: "real-estate", offerIds: "real-estate", serviceIds: ["foto", "mejora"], artwork: "property" },
  { id: "editing", offerIds: [], serviceIds: [], artwork: "editing" },
  { id: "production", offerIds: [], serviceIds: ["multicam", "yate", "kickstarter"], artwork: "business" },
  { id: "local-business", offerIds: ["crecimiento", "presencia-local"], serviceIds: [], artwork: "business" },
  { id: "ai-agents", offerIds: [], serviceIds: [], artwork: "business" },
  { id: "seo-landing", offerIds: [], serviceIds: [], artwork: "business" },
  { id: "web-commerce", offerIds: [], serviceIds: [], artwork: "business" },
];

const routeVisuals: Record<RouteId, string> = {
  // A clean aerial still leaves room for the card copy; avoid Reels that already
  // carry baked-in headlines behind the route label.
  "real-estate": "/real-estate-reels/reel-05.jpg",
  // The official YouTube preview is the recognizable public cover for this case.
  editing: "https://i.ytimg.com/vi/BDRru8eXaj4/maxresdefault.jpg",
  production: "/portfolio/event-conference-filming.jpg",
  // Owner-supplied camera detail: a crisp, horizontal production still avoids
  // presenting a website screenshot as the local-business service.
  "local-business": "/portfolio/local-business-camera-work.jpg",
  // The AI route deliberately keeps the companion in the foreground; the
  // current Gains site is reserved for the website/ecommerce route below.
  "ai-agents": "/portfolio/gains-from-geebs-chatbot.jpg",
  "seo-landing": "/portfolio/front-line-auto.jpg",
  "web-commerce": "/portfolio/gains-from-geebs-chatbot.jpg",
};

const digitalRouteLinks: Record<Exclude<RouteId, "real-estate" | "editing" | "production" | "local-business">, Record<AudienceLocale, Array<{ title: string; detail: string }>>> = {
  "ai-agents": {
    en: [
      { title: "AI chatbots", detail: "Answer common questions and capture the right next step." },
      { title: "AI agents and automation", detail: "Connect repetitive work into a useful, human-reviewed workflow." },
    ],
    es: [
      { title: "Chatbots con IA", detail: "Responde preguntas comunes y captura el siguiente paso correcto." },
      { title: "Agentes y automatización con IA", detail: "Conecta trabajo repetitivo en un flujo útil revisado por personas." },
    ],
  },
  "seo-landing": {
    en: [
      { title: "SEO and GEO", detail: "Make the service, location and next action clear for search and AI answers." },
      { title: "Landing pages", detail: "Give a campaign or service one focused page that makes the next step obvious." },
    ],
    es: [
      { title: "SEO y GEO", detail: "Aclara servicio, ubicación y siguiente paso para buscadores y respuestas de IA." },
      { title: "Landing pages", detail: "Una página enfocada para que una campaña o servicio tenga un siguiente paso claro." },
    ],
  },
  "web-commerce": {
    en: [
      { title: "Websites", detail: "A clear home for the offer, proof and ways to get in touch." },
      { title: "Ecommerce content", detail: "Product video that helps an online store show what it sells." },
    ],
    es: [
      { title: "Sitios web", detail: "Un hogar claro para la oferta, prueba y formas de contactar." },
      { title: "Contenido para ecommerce", detail: "Video de producto que ayuda a una tienda online a mostrar lo que vende." },
    ],
  },
};

function offerDeliverables(name: string, laneId: ChooserLaneId, locale: AudienceLocale): string[] {
  const isEs = locale === "es";
  if (laneId === "real-estate") {
    if (name.includes("Essential")) {
      return isEs
        ? [
            "1 propiedad al mes (hasta 3,000 SF)",
            "2 días de producción en locación al mes",
            "20 a 30 fotos profesionales editadas",
            "2 posts o reels por semana (Instagram y TikTok)",
            "Gestión de redes y reporte Metricool cada 2 semanas",
            "Flexibilidad: la sesión pasa al mes siguiente si no hay listado",
            "Fotografía con dron disponible como adicional ($120)",
          ]
        : [
            "1 property per month (up to 3,000 SF)",
            "2 on-location production shoot days / month",
            "20–30 professionally edited photos",
            "2 posts or reels per week (Instagram & TikTok)",
            "Social management & Metricool report every 2 weeks",
            "Rollover: shoot rolls to next month if no listing",
            "Drone photography available as add-on ($120)",
          ];
    }
    if (name.includes("Plus")) {
      return isEs
        ? [
            "2 propiedades al mes (hasta 3,000 SF c/u)",
            "3 días de producción en locación al mes",
            "20 a 30 fotos profesionales por propiedad",
            "3 a 4 posts o reels por semana (Instagram y TikTok)",
            "Gestión de redes y reporte Metricool cada 2 semanas",
            "Flexibilidad: las sesiones pasan al mes siguiente si no hay listado",
            "Fotografía con dron disponible como adicional ($120)",
          ]
        : [
            "2 properties per month (up to 3,000 SF each)",
            "3 on-location production shoot days / month",
            "20–30 professionally edited photos per property",
            "3–4 posts or reels per week (Instagram & TikTok)",
            "Social management & Metricool report every 2 weeks",
            "Rollover: shoots roll to next month if no listings",
            "Drone photography available as add-on ($120)",
          ];
    }
    if (name.includes("Premium")) {
      return isEs
        ? [
            "3 propiedades al mes (hasta 3,000 SF c/u)",
            "3 días de producción en locación al mes",
            "20 a 30 fotos profesionales por propiedad",
            "Fotografía aérea con dron INCLUIDA",
            "5 posts o reels por semana (Instagram y TikTok)",
            "Gestión de redes y reporte Metricool cada 2 semanas",
            "Prioridad de calendario y flexibilidad de rollover",
          ]
        : [
            "3 properties per month (up to 3,000 SF each)",
            "3 on-location production shoot days / month",
            "20–30 professionally edited photos per property",
            "Drone aerial photography INCLUDED",
            "5 posts or reels per week (Instagram & TikTok)",
            "Social management & Metricool report every 2 weeks",
            "Priority scheduling & rollover flexibility",
          ];
    }
  }

  if (laneId === "local-business") {
    if (name.includes("Growth") || name.includes("Crecimiento")) {
      return isEs
        ? [
            "Plan y estrategia mensual de contenido",
            "Calendario estructurado de publicación",
            "Edición profesional de formato corto incluida",
            "Reporte quincenal de métricas con Metricool",
            "Dirección creativa dedicada para tu marca",
          ]
        : [
            "Content strategy & monthly planning",
            "Structured publishing calendar",
            "Professional short-form editing included",
            "Bi-weekly Metricool performance report",
            "Dedicated creative lead for your brand",
          ];
    }
    if (name.includes("All-In") || name.includes("Todo Incluido")) {
      return isEs
        ? [
            "Sitio web de conversión",
            "Chatbot y captura de clientes con IA",
            "Perfil y presencia local (Google Business, Maps)",
            "Contenido y edición",
            "Reporte de todos los canales",
          ]
        : [
            "Conversion website",
            "AI chatbot and lead capture",
            "Local profile and presence (Google Business, Maps)",
            "Content and editing",
            "Reporting across all channels",
          ];
    }
    return isEs
      ? [
          "Pre-producción: dirección creativa y lista de tomas",
          "Día completo de producción en sitio con equipo de cine",
          "Edición multiformato (9:16 vertical y 16:9 horizontal)",
          "Cobertura en Broward, Miami-Dade y Palm Beach",
          "Entregables listos para redes sociales, anuncios y web",
        ]
      : [
          "Pre-production creative direction & shot list",
          "Full on-location production day with cinema gear",
          "Multi-format editing (9:16 vertical & 16:9 widescreen)",
          "Broward, Miami-Dade, and Fort Lauderdale coverage",
          "Turnkey deliverables for social, ads, and website",
        ];
  }

  return isEs
    ? [
        "Edición remota a partir de tus tomas originales",
        "Formato para Reels, TikTok, YouTube Shorts o web",
        "1 ronda de revisión incluida por video",
        "Corrección de color profesional, audio y subtítulos",
        "Mínimo de entrega: 7 días",
      ]
    : [
        "Remote video editing from your raw footage",
        "Formatted for Reels, TikTok, YouTube Shorts or web",
        "1 revision round included per video",
        "Professional color grading, audio cleanup & captions",
        "7-day turnaround floor",
      ];
}

export function HomeProjectPath({ locale }: { locale: AudienceLocale }) {
  const c = copy[locale];
  const single = packagesCopy(locale).aLaCarte;
  const chooserRef = useRef<HTMLDivElement>(null);
  const [lensInView, setLensInView] = useState(false);
  const [funnelOpen, setFunnelOpen] = useState(false);
  const [funnelLane, setFunnelLane] = useState<{ id: string; label: string; price: string }>({ id: "real-estate", label: c.tabs[0], price: laneFunnelPrice(locale, "real-estate") });
  const routeCopy: Record<RouteId, { title: string; lead: string; eyebrow: string }> = locale === "es"
    ? {
        "real-estate": { title: "Real Estate", eyebrow: "Propiedades", lead: "Planes, fotos y mejoras para mostrar cada propiedad." },
        editing: { title: "Creador de contenido", eyebrow: "Tú eres el canal", lead: "Edita tus clips, publica cada semana o graba un día de contenido conmigo." },
        production: { title: "Producciones y eventos", eyebrow: "Una producción especial", lead: "Conferencias, yates, equipos multicámara y videos comerciales." },
        "local-business": { title: "Negocios locales", eyebrow: "Tu negocio", lead: "Contenido mensual y grabación en tu negocio para tu marca." },
        "ai-agents": { title: "Agentes de IA y chatbots", eyebrow: "Tu asistente digital", lead: "Un chatbot que guía y automatizaciones que mantienen el trabajo moviéndose." },
        "seo-landing": { title: "SEO, GEO y landing pages", eyebrow: "Que te encuentren", lead: "Páginas claras para que te descubran, entiendan tu oferta y den el siguiente paso." },
        "web-commerce": { title: "Sitios web y ecommerce", eyebrow: "Tu casa en internet", lead: "Un sitio que muestra lo que haces y contenido de producto para vender online." },
      }
    : {
        "real-estate": { title: "Real estate", eyebrow: "Properties", lead: "Plans, photos and improvements to show each property." },
        editing: { title: "Content creator", eyebrow: "You are the channel", lead: "Edit your clips, publish every week, or film a content day with me." },
        production: { title: "Productions and events", eyebrow: "A special production", lead: "Conferences, yachts, multi-camera crews and commercial video." },
        "local-business": { title: "Local businesses", eyebrow: "Your business", lead: "Monthly content and filming at your business for your brand." },
        "ai-agents": { title: "AI agents and chatbots", eyebrow: "Your digital assistant", lead: "A chatbot that guides people and automation that keeps useful work moving." },
        "seo-landing": { title: "SEO, GEO and landing pages", eyebrow: "Get found", lead: "Clear pages so people discover you, understand the offer, and take the next step." },
        "web-commerce": { title: "Websites and ecommerce", eyebrow: "Your home online", lead: "A site that shows what you do and product content that helps you sell online." },
      };
  const openFunnel = (id: string, label: string, price: string) => {
    setFunnelLane({ id, label, price });
    setFunnelOpen(true);
  };
  useEffect(() => {
    const chooser = chooserRef.current;
    if (!chooser || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => setLensInView(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(chooser);
    return () => observer.disconnect();
  }, []);
  const resetRouteWhenClosed = (event: React.SyntheticEvent<HTMLDetailsElement>) => {
    const route = event.currentTarget;
    if (!route.open) route.querySelectorAll<HTMLDetailsElement>("details[open]").forEach((detail) => { detail.open = false; });
  };
  const keepChoiceVisible = (event: React.SyntheticEvent<HTMLDetailsElement>) => {
    const detail = event.currentTarget;
    if (!detail.open) return;
    requestAnimationFrame(() => detail.scrollIntoView({ block: "start", behavior: "smooth" }));
  };
  const packageOffers = (offerIds: PackageId[] | "real-estate") => {
    if (offerIds === "real-estate") return laneOffers(locale, "real-estate");
    return offerIds.map((id) => {
      const pkg = packagesFor(locale).find((candidate) => candidate.id === id)!;
      const price = priceFor(id);
      if (price.kind === "custom") return { name: pkg.name, price: c.singleQuoted, includes: pkg.includes.join(" · "), href: c.pricingHref };
      const unit = price.unit === "video" ? c.units.video : price.unit === "month" ? c.units.month : c.units["production-day"];
      return { name: pkg.name, price: `${c.from} ${usd(price.amount)}${unit}`, includes: pkg.includes.join(" · "), href: `${c.pricingHref}/${locale === "es" ? id : id === "arranque" ? "starter" : id === "crecimiento" ? "growth" : id === "presencia-local" ? "local-presence" : "all-in"}` };
    });
  };
  const servicePrice = (item: (typeof single.items)[number]) => {
    const noteIsQuote = !!item.note && /^(quoted|cotizaci)/i.test(item.note);
    if (item.id === "foto") return `${c.singleFrom} ${usd(PRODUCT_PHOTO_SESSION.from)}${c.singleSession}`;
    if (item.id === "grabacion") return `${c.singleFrom} ${usd(ON_LOCATION_CAPTURE.from)}${c.singleHalfDay}`;
    if (item.id === "multicam") return `${c.singleFrom} ${usd(CREW_RECORDING_RATES.multiCamera.halfDay)}${c.singleHalfDay}`;
    if (item.id === "yate") return `${c.singleFrom} ${usd(YACHT_PRODUCTION.halfDaySolo)}${c.singleHalfDay}`;
    if (item.id === "kickstarter") return `${c.singleFrom} ${usd(KICKSTARTER_LAUNCH.from)}`;
    return noteIsQuote ? item.note! : c.singleQuoted;
  };
  const productionSummary = (id: string) => {
    if (locale === "es") {
      if (id === "grabacion") return "Material en bruto para que tu equipo lo edite.";
      if (id === "multicam") return "Conferencias, entrevistas o eventos con 2 a 3 cámaras.";
      if (id === "yate") return "Producción a bordo con operador solo o equipo de dos.";
      return "Demo, brand film o producción con actores y estudio.";
    }
    if (id === "grabacion") return "Raw footage for your team to edit.";
    if (id === "multicam") return "Conferences, interviews, or events with 2 to 3 cameras.";
    if (id === "yate") return "On-board production with a solo operator or two-person crew.";
    return "Demo, brand film, or a production with actors and studio.";
  };
  const commercialScope = locale === "es"
    ? "Elige el alcance al cotizar: demo básico desde $1,000; brand film desde $3,000; actores y estudio desde $6,500."
    : "Choose the scope when you quote it: basic demo from $1,000; brand film from $3,000; actors and studio from $6,500.";
  const creatorFilm = locale === "es"
    ? { label: "¿También necesitas grabar?", title: "Grabemos tu contenido", lead: "Traes la idea. Yo grabo material para Reels, Shorts y tu próxima edición.", action: "Cotizar día de grabación" }
    : { label: "Need a filming day too?", title: "Film content with me", lead: "Bring the idea. I capture usable footage for Reels, Shorts, and your next edit.", action: "Quote a filming day" };

  return (
    <section id="start" aria-labelledby={`home-path-${locale}`} data-section="home-project-path" className="em-home-project-path bg-[#f7f5f1] py-10 sm:py-14">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-medium uppercase tracking-wider text-[#6a625a]">{c.eyebrow}</p>
        <h2 id={`home-path-${locale}`} className="mt-2 font-serif text-4xl leading-tight sm:text-5xl">{c.heading}</h2>
        <p className="mt-2 max-w-2xl text-base leading-7 text-[#4d5358]">{locale === "es" ? "Toca la situación que se parece a tu proyecto. Se abre aquí mismo con todo lo que incluye." : "Tap the situation that matches your project. It opens right here with everything included."}</p>

        <div ref={chooserRef} className="em-camera-chooser mt-5" aria-hidden="true" data-lens-idling={lensInView || undefined}>
          <div className="em-camera-chooser__body">
            <div className="em-camera-chooser__flash" />
            <span className="em-camera-chooser__lens">
              <span className="em-camera-chooser__lens-image">
                <Image src="/illustrations/esteban-sony-alpha-lens-v2.png" alt={c.lensAlt} fill sizes="112px" className="object-contain" />
                <span className="em-camera-chooser__iris" />
              </span>
            </span>
            <p className="em-camera-chooser__eyebrow">{locale === "es" ? "ELIGE TU PROYECTO" : "CHOOSE YOUR PROJECT"}</p>
            <p className="em-camera-chooser__choice">{locale === "es" ? "Todo en su lugar" : "Everything in one place"}</p>
            <p className="em-camera-chooser__price">{locale === "es" ? "Paquetes y opciones relacionadas" : "Packages and related options"}</p>
          </div>
        </div>

        <div className="em-route-list mt-3">
          {routeDefinitions.map((route) => {
            const routeText = routeCopy[route.id];
            const visualSrc = routeVisuals[route.id];
            const offers = packageOffers(route.offerIds);
            const routeLane: ChooserLaneId = route.id === "editing" ? "agency" : route.id === "real-estate" ? "real-estate" : "local-business";
            const routePrice = offers.length > 0 ? offers.map((offer) => `${offer.name} ${offer.price}`).join(" · ") : c.singleQuoted;
            const editingProject = locale === "es"
              ? { title: "Video largo o proyecto a medida", lead: "Vlog, entrevista, pieza corporativa o varios formatos. Se cotiza por proyecto según duración, material y entregables.", action: "Pedir cotización por proyecto" }
              : { title: "Long video or custom project", lead: "Vlog, interview, corporate piece, or multiple formats. Quoted per project based on length, footage and deliverables.", action: "Request a project quote" };
            return (
              <details key={route.id} className="em-route-card" data-route={route.id} name={`home-route-${locale}`} onToggle={resetRouteWhenClosed}>
                <summary data-cta={`home_project_route_${locale}_${route.id}`}>
                  <span className="em-route-card__copy"><span className="em-route-card__eyebrow">{routeText.eyebrow}</span><strong>{routeText.title}</strong><span>{routeText.lead}</span></span>
                  <span className={`em-route-card__visual em-route-card__visual--${route.id}`} aria-hidden="true">
                    <Image src={visualSrc} alt={c.routeVisualAlts[route.id]} fill sizes="(max-width: 639px) 100vw, 1200px" />
                    {route.id === "real-estate" && <><span className="em-route-card__property-glint" /><span className="em-route-card__property-pin"><span /><MapPin fill="currentColor" /></span></>}
                    {route.id === "editing" && <span className="em-route-card__reel-actions"><span className="em-route-card__reel-like"><span className="em-route-card__reel-heart-burst" aria-hidden="true"><Heart fill="currentColor" /><Heart fill="currentColor" /><Heart fill="currentColor" /><Heart fill="currentColor" /></span><Heart fill="currentColor" /><span className="em-route-card__reel-like-count" aria-hidden="true"><span>+1</span><span>+26</span><span>+183</span><span>+1.2K</span></span></span><MessageCircle /><Send /></span>}
                    {route.id === "production" && <span className="em-route-card__recording" aria-hidden="true"><i />REC<span className="em-route-card__recording-frames"><b /><b /><b /></span></span>}
                    {route.id === "local-business" && <span className="em-route-card__local-signal" aria-hidden="true"><span className="em-route-card__local-signal-spark"><b /><b /></span><i /><i /><i /></span>}
                    {route.id === "ai-agents" && <><Image className="em-route-card__agent-character" src="/portfolio/geebs-ai-companion.png" alt={c.routeVisualAlts["ai-agents"]} width={72} height={80} /><span className="em-route-card__geebs-chat" aria-hidden="true"><span className="em-route-card__geebs-chat-head"><b />GEEBS AI <em>LIVE</em></span><span className="em-route-card__geebs-chat-bubble">hey, i&apos;m kris. what are we fixing first?<i /></span><span className="em-route-card__geebs-chat-thinking"><b /><b /><b /><small>kris is thinking...</small></span><span className="em-route-card__geebs-chat-reply">How 1:1 coaching works</span></span><span className="em-route-card__digital-signal" aria-hidden="true"><span /><span /><Sparkles /></span></>}
                    {route.id === "seo-landing" && <span className="em-route-card__search-map" aria-hidden="true"><b>SEO</b><b>GEO</b><b>LP</b><i /><i /><i /></span>}
                    {route.id === "web-commerce" && <span className="em-route-card__site-tab" aria-hidden="true"><b>GFG</b><span>01</span><i /></span>}
                  </span>
                  <Plus className="em-route-card__plus" size={22} aria-hidden="true" />
                </summary>
                <div className="em-route-card__body">
                  {route.id in digitalRouteLinks && <><p className="em-route-card__label">{locale === "es" ? "Explora el servicio" : "Explore the service"}</p><ul className="em-digital-route-links" role="list" data-specialty={route.id}>{digitalRouteLinks[route.id as keyof typeof digitalRouteLinks][locale].map((item, index) => <li key={item.title} data-service-option={index}><button type="button" onClick={() => openFunnel(route.id, `${routeText.title}: ${item.title}`, c.singleQuoted)}><strong>{item.title}</strong><span>{item.detail}</span><ArrowRight size={16} aria-hidden="true" /></button></li>)}</ul></>}
                  {offers.length > 0 && <><p className="em-route-card__label">{locale === "es" ? "Paquetes" : "Packages"}</p>
                  <ul className="em-path-offers grid grid-cols-1 gap-2.5 sm:grid-cols-2" role="list" data-lane={route.id}>
                    {offers.map((offer) => (
                      <li key={offer.name} className="em-path-offer rounded-xl border border-[#d6cabc] bg-white overflow-hidden">
                        <details className="em-path-offer-details group/offer" name={`route-offer-${locale}-${route.id}`} onToggle={keepChoiceVisible}>
                          <summary className="p-3.5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                            <p className="em-path-offer-head flex items-baseline justify-between gap-2 m-0"><strong className="em-path-offer-name">{offer.name}</strong><span className="em-path-offer-price">{offer.price}</span></p>
                            <p className="em-path-offer-inc">{offer.includes}</p>
                            <span className="mt-3 pt-2.5 border-t border-[#f0eae1] flex items-center gap-1 text-xs font-medium text-[#6a625a]">{locale === "es" ? "Ver qué incluye" : "See what is included"}<ChevronDown className="size-3.5 transition-transform group-open/offer:rotate-180" /></span>
                          </summary>
                          <div className="px-3.5 pb-3.5 pt-2 border-t border-[#f0eae1] bg-[#fffaf4] text-xs text-[#3a3530]">
                            <ul className="space-y-1.5" role="list">{offerDeliverables(offer.name, routeLane, locale).map((item) => <li key={item} className="flex gap-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#9d3d2b]" /><span>{item}</span></li>)}</ul>
                            <button type="button" className="em-route-choose" onClick={() => openFunnel(route.id, `${routeText.title}: ${offer.name}`, offer.price)}>{locale === "es" ? `Cotizar ${offer.name}` : `Quote ${offer.name}`}<ArrowRight size={15} /></button>
                          </div>
                        </details>
                      </li>
                    ))}
                  </ul></>}
                  {route.id === "real-estate" && <details className="em-route-terms"><summary>{locale === "es" ? "Condiciones de los planes mensuales" : "Monthly Real Estate plan terms"}</summary><p>{locale === "es" ? `Aplica solo a los planes mensuales de arriba, no a los servicios individuales. Mínimo de ${REAL_ESTATE_PLAN_TERMS.minimumMonths} meses. Las propiedades adicionales o mayores a 3,000 SF se cotizan por separado.` : `Applies only to the monthly plans above, not to individual services. ${REAL_ESTATE_PLAN_TERMS.minimumMonths}-month minimum. Extra properties or homes over 3,000 SF are quoted separately.`}</p></details>}
                  {route.id === "production" && <><p className="em-route-card__label mt-5">{locale === "es" ? "Elige la producción que necesitas" : "Choose the production you need"}</p><ul className="em-path-offers grid grid-cols-1 gap-2.5 sm:grid-cols-2" role="list" data-lane="production">{single.items.filter((item) => route.serviceIds.includes(item.id)).map((item) => {
                    const price = servicePrice(item);
                    return <li key={item.id} className="em-path-offer rounded-xl border border-[#d6cabc] bg-white overflow-hidden"><details className="em-path-offer-details group/offer" name={`route-production-${locale}`} onToggle={keepChoiceVisible}><summary className="p-3.5 cursor-pointer list-none [&::-webkit-details-marker]:hidden"><p className="em-path-offer-head flex items-baseline justify-between gap-2 m-0"><strong className="em-path-offer-name">{item.title}</strong><span className="em-path-offer-price">{price}</span></p><p className="em-path-offer-inc">{productionSummary(item.id)}</p><span className="mt-3 pt-2.5 border-t border-[#f0eae1] flex items-center gap-1 text-xs font-medium text-[#6a625a]">{locale === "es" ? "Ver qué enviar" : "See what to send"}<ChevronDown className="size-3.5 transition-transform group-open/offer:rotate-180" /></span></summary><div className="px-3.5 pb-3.5 pt-2 border-t border-[#f0eae1] bg-[#fffaf4] text-xs text-[#3a3530]"><p className="m-0 text-sm leading-6"><strong>{c.singleSend}.</strong> {aLaCarteVisual(item.id, locale).preparation}</p>{item.id === "kickstarter" && <p className="mt-3 mb-0 text-sm leading-6 text-[#4d5358]">{commercialScope}</p>}<button type="button" className="em-route-choose" onClick={() => openFunnel(route.id, `${routeText.title}: ${item.title}`, price)}>{locale === "es" ? "Pedir cotización" : "Request a quote"}<ArrowRight size={15} /></button></div></details></li>;
                  })}</ul></>}
                  {route.id !== "production" && route.id !== "editing" && route.serviceIds.length > 0 && <><p className="em-route-card__label mt-5">{locale === "es" ? "También puedes pedir" : "You can also request"}</p><ul className="em-single-list" role="list">{single.items.filter((item) => route.serviceIds.includes(item.id)).map((item) => {
                    const scene = aLaCarteVisual(item.id, locale); const price = servicePrice(item);
                    return <li key={item.id}><details className="em-single-item" data-service={item.id} name={`route-service-${locale}-${route.id}`} onToggle={keepChoiceVisible}><summary data-cta={`home_path_${route.id}_${item.id}`}><Image className="em-single-thumb" src={scene.image} alt={c.thumbAlt(item.title)} width={96} height={64} sizes="64px" /><span className="em-single-text"><span className="em-single-title">{item.title}</span><span className="em-single-price">{price}</span>{item.note && <span className="em-single-note">{item.note}</span>}</span><Plus className="em-single-plus" size={18} aria-hidden="true" /></summary><div className="em-single-panel"><p><strong>{c.singleSend}.</strong> {scene.preparation}</p><div className="em-single-actions"><button type="button" className="em-single-ask" onClick={() => openFunnel(route.id, `${routeText.title}: ${item.title}`, price)}>{c.singleAsk}</button>{item.href && <Link href={item.href} className="em-single-service">{c.singleService}</Link>}</div></div></details></li>;
                  })}</ul></>}
                  {route.id === "editing" && <><div className="mt-5"><StarterOptions locale={locale} quiet /></div><p className="em-route-card__label mt-5">{creatorFilm.label}</p><ul className="em-path-offers grid grid-cols-1 gap-2.5" role="list" data-lane="creator-filming"><li className="em-path-offer rounded-xl border border-[#d6cabc] bg-white overflow-hidden"><details className="em-path-offer-details group/offer" name={`route-creator-filming-${locale}`} onToggle={keepChoiceVisible}><summary className="p-3.5 cursor-pointer list-none [&::-webkit-details-marker]:hidden"><p className="em-path-offer-head flex items-baseline justify-between gap-2 m-0"><strong className="em-path-offer-name">{creatorFilm.title}</strong><span className="em-path-offer-price">{`${c.singleFrom} ${usd(ON_LOCATION_CAPTURE.from)}${c.singleHalfDay}`}</span></p><p className="em-path-offer-inc">{creatorFilm.lead}</p><span className="mt-3 pt-2.5 border-t border-[#f0eae1] flex items-center gap-1 text-xs font-medium text-[#6a625a]">{locale === "es" ? "Ver qué enviar" : "See what to send"}<ChevronDown className="size-3.5 transition-transform group-open/offer:rotate-180" /></span></summary><div className="px-3.5 pb-3.5 pt-2 border-t border-[#f0eae1] bg-[#fffaf4] text-xs text-[#3a3530]"><p className="m-0 text-sm leading-6"><strong>{c.singleSend}.</strong> {aLaCarteVisual("grabacion", locale).preparation}</p><button type="button" className="em-route-choose" onClick={() => openFunnel(route.id, `${routeText.title}: ${creatorFilm.title}`, `${c.singleFrom} ${usd(ON_LOCATION_CAPTURE.from)}${c.singleHalfDay}`)}>{creatorFilm.action}<ArrowRight size={15} /></button></div></details></li></ul><details className="em-route-terms" onToggle={keepChoiceVisible}><summary>{editingProject.title}</summary><p>{editingProject.lead}</p><button type="button" className="em-route-choose" onClick={() => openFunnel(route.id, `${routeText.title}: ${editingProject.title}`, c.singleQuoted)}>{editingProject.action}<ArrowRight size={15} /></button></details></>}
                  {route.id !== "editing" && <button type="button" className="em-route-main-cta" onClick={() => openFunnel(route.id, routeText.title, routePrice)}>{locale === "es" ? `Cotizar ${routeText.title}` : `Quote ${routeText.title}`}<ArrowRight size={18} /></button>}
                </div>
              </details>
            );
          })}
        </div>
        <div className="mt-5 border-t border-[#ddd4c8] pt-5">
          <p className="text-sm leading-6 text-[#4d5358]">{locale === "es" ? "¿Tu proyecto no encaja en una de estas rutas? Cuéntame qué quieres crear y te preparo una cotización." : "Does your project not fit one of these routes? Tell me what you want to make and I will prepare a quote."}</p>
          <a href={whatsappHref(site.phone.e164, c.singleWhatsapp)} target="_blank" rel="noopener noreferrer" data-cta="home_path_general_quote" className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[#6a625a] underline underline-offset-4">{quoteCtaLabel(locale)}<ArrowRight className="size-4" /></a>
        </div>
      </div>
      <HomePathFunnel locale={locale} open={funnelOpen} laneId={funnelLane.id} laneLabel={funnelLane.label} price={funnelLane.price} onClose={() => setFunnelOpen(false)} />
    </section>
  );
}
