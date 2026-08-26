import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bot,
  Camera,
  Laptop,
  MapPinned,
  Workflow,
} from "lucide-react";

export type GrowthSystem = {
  slug: string;
  spanishSlug: string;
  icon: LucideIcon;
  title: string;
  spanishTitle: string;
  metadataTitle: string;
  spanishMetadataTitle: string;
  description: string;
  spanishDescription: string;
  eyebrow: string;
  spanishEyebrow: string;
  lead: string;
  spanishLead: string;
  includes: readonly string[];
  spanishIncludes: readonly string[];
  boundaries: readonly string[];
  spanishBoundaries: readonly string[];
  proof: { label: string; spanishLabel: string; href: string };
};

export const growthSystems: readonly GrowthSystem[] = [
  {
    slug: "conversion-websites",
    spanishSlug: "sitios-web-de-conversion",
    icon: Laptop,
    title: "Conversion websites",
    spanishTitle: "Sitios web de conversión",
    metadataTitle: "Conversion Website Design in South Florida",
    spanishMetadataTitle: "Sitios Web de Conversión en South Florida",
    description: "Custom mobile-first websites and focused landing pages built around a clear offer, a measurable inquiry path, and useful creative content.",
    spanishDescription: "Sitios web personalizados mobile-first y landing pages enfocadas en una oferta clara, una ruta de consulta medible y contenido creativo útil.",
    eyebrow: "Growth system 01 / Website foundation",
    spanishEyebrow: "Sistema de crecimiento 01 / Base web",
    lead: "A website is the place where a local offer, proof, forms, analytics, and follow-up rules can work together instead of living in separate tools.",
    spanishLead: "Un sitio web es donde una oferta local, prueba, formularios, analítica y reglas de seguimiento pueden trabajar juntos en vez de vivir en herramientas separadas.",
    includes: ["Custom desktop and mobile pages", "Offer, CTA, form, and address-autocomplete design", "Analytics and conversion-event setup", "Creative photo and video direction when it supports the journey"],
    spanishIncludes: ["Páginas personalizadas desktop y móvil", "Diseño de oferta, CTA, formulario y address autocomplete", "Configuración de analítica y eventos de conversión", "Dirección de foto y video cuando apoya el recorrido"],
    boundaries: ["Launch timing depends on confirmed scope, assets, access, and review cycles.", "Conversion is measured and improved; it is not guaranteed."],
    spanishBoundaries: ["El tiempo de lanzamiento depende del alcance, materiales, accesos y ciclos de revisión confirmados.", "La conversión se mide y mejora; no se garantiza."],
    proof: { label: "See the FLAS AI Concierge web system", spanishLabel: "Ver el sistema web FLAS AI Concierge", href: "/portfolio/flas-concierge" },
  },
  {
    slug: "ai-lead-capture-automation",
    spanishSlug: "captura-y-automatizacion-de-clientes-con-ia",
    icon: Bot,
    title: "AI lead capture & lifecycle automation",
    spanishTitle: "Captura y automatización de clientes con IA",
    metadataTitle: "AI Lead Capture & Automation for Local Businesses",
    spanishMetadataTitle: "Captura de Clientes y Automatización con IA",
    description: "Chatbots, ManyChat DM flows, email, SMS, and handoff rules that help a qualified inquiry reach the right next step.",
    spanishDescription: "Chatbots, flujos de DM en ManyChat, email, SMS y reglas de handoff para llevar una consulta calificada al siguiente paso correcto.",
    eyebrow: "Growth system 02 / Response and follow-through",
    spanishEyebrow: "Sistema de crecimiento 02 / Respuesta y seguimiento",
    lead: "We map the path from first question to a booked or human-owned next step, then connect the approved tools that make that path reliable.",
    spanishLead: "Mapeamos el camino desde la primera pregunta hasta una próxima acción agendada o tomada por una persona, y conectamos las herramientas aprobadas que lo hacen confiable.",
    includes: ["Website chatbots and agent-assisted intake", "ManyChat and social DM funnel setup", "Automated email and Twilio SMS journeys", "Human escalation, routing, and reporting rules"],
    spanishIncludes: ["Chatbots web e intake asistido por agentes", "Configuración de ManyChat y funnel de DM social", "Journeys automatizados de email y SMS con Twilio", "Reglas de escalación humana, routing y reportes"],
    boundaries: ["SMS and marketing messages require the right consent, platform access, and compliance review.", "Automation is scoped with human escalation; it is not presented as unattended decision-making."],
    spanishBoundaries: ["Los SMS y mensajes de marketing requieren consentimiento, acceso a plataforma y revisión de cumplimiento.", "La automatización se define con escalación humana; no se presenta como toma de decisiones sin supervisión."],
    proof: { label: "See the TitanForge intake and bot work", spanishLabel: "Ver el trabajo de intake y bot de TitanForge", href: "/portfolio/titanforge" },
  },
  {
    slug: "local-presence-seo",
    spanishSlug: "presencia-local-seo",
    icon: MapPinned,
    title: "Local presence, SEO & AI-search readiness",
    spanishTitle: "Presencia local, SEO y preparación para búsqueda con IA",
    metadataTitle: "Local SEO, Google Business Profile & Maps Optimization",
    spanishMetadataTitle: "SEO Local, Google Business Profile y Maps",
    description: "A connected local-presence plan for Google Business Profile, Maps, Apple, Yelp, relevant marketplaces, technical SEO, and source clarity.",
    spanishDescription: "Un plan de presencia local conectado para Google Business Profile, Maps, Apple, Yelp, marketplaces relevantes, SEO técnico y claridad de fuentes.",
    eyebrow: "Growth system 03 / Findability",
    spanishEyebrow: "Sistema de crecimiento 03 / Ser encontrado",
    lead: "We assess the profiles, citations, service pages, and underlying site signals that make a local business easier for customers and search systems to evaluate.",
    spanishLead: "Evaluamos los perfiles, citas, páginas de servicio y señales del sitio que facilitan que clientes y sistemas de búsqueda entiendan un negocio local.",
    includes: ["Google Business Profile, Maps, Apple Maps, and Yelp optimization", "Industry marketplace setup or cleanup, such as Zillow or Homes.com when relevant", "Technical SEO, service-page structure, and indexation checks", "Observed reporting for search and AI-assistant visibility"],
    spanishIncludes: ["Optimización de Google Business Profile, Maps, Apple Maps y Yelp", "Setup o limpieza de marketplaces de industria, como Zillow u Homes.com cuando aplican", "SEO técnico, estructura de páginas de servicio y chequeos de indexación", "Reportes observados de visibilidad en búsqueda y asistentes de IA"],
    boundaries: ["Platform policies and account ownership determine what can be changed.", "No search engine or AI-assistant placement is guaranteed."],
    spanishBoundaries: ["Las políticas de cada plataforma y la propiedad de cuenta determinan qué se puede cambiar.", "No se garantiza la posición en buscadores o asistentes de IA."],
    proof: { label: "Review the local service-area foundation", spanishLabel: "Revisar la base de áreas de servicio", href: "/areas" },
  },
  {
    slug: "growth-funnel-audit",
    spanishSlug: "auditoria-de-funnel-y-datos",
    icon: BarChart3,
    title: "Growth funnel & data audit",
    spanishTitle: "Auditoría de funnel y datos",
    metadataTitle: "Digital Funnel, Analytics & Cost Audit",
    spanishMetadataTitle: "Auditoría de Funnel, Analítica y Costos",
    description: "A practical audit of acquisition paths, analytics, handoffs, manual work, and costs before deciding what should be improved or automated.",
    spanishDescription: "Una auditoría práctica de rutas de adquisición, analítica, handoffs, trabajo manual y costos antes de decidir qué mejorar o automatizar.",
    eyebrow: "Growth system 04 / Diagnose before building",
    spanishEyebrow: "Sistema de crecimiento 04 / Diagnosticar antes de construir",
    lead: "We turn scattered tools and activity into a view of where inquiries drop, what teams repeat manually, and what measurement is missing.",
    spanishLead: "Convertimos herramientas y actividad dispersas en una vista de dónde se caen las consultas, qué repite el equipo manualmente y qué medición falta.",
    includes: ["GA4, Search Console, and Metricool setup or review", "Funnel, attribution, and handoff mapping", "Manual-work and cost-opportunity assessment", "A prioritized implementation brief with measurable next steps"],
    spanishIncludes: ["Setup o revisión de GA4, Search Console y Metricool", "Mapeo de funnel, atribución y handoffs", "Evaluación de trabajo manual y oportunidades de costo", "Brief priorizado de implementación con próximos pasos medibles"],
    boundaries: ["Findings are based on the data and access available at the time of review.", "An audit identifies opportunities; it does not promise savings or revenue."],
    spanishBoundaries: ["Los hallazgos dependen de los datos y accesos disponibles al momento de la revisión.", "Una auditoría identifica oportunidades; no promete ahorros ni ingresos."],
    proof: { label: "Start with a structured project assessment", spanishLabel: "Empezar con una evaluación estructurada", href: "/assessment" },
  },
  {
    slug: "custom-operations-automation",
    spanishSlug: "automatizacion-de-operaciones",
    icon: Workflow,
    title: "Custom operations automation",
    spanishTitle: "Automatización personalizada de operaciones",
    metadataTitle: "Custom Business Automation & Agent-Assisted Workflows",
    spanishMetadataTitle: "Automatización de Negocios y Flujos Asistidos por Agentes",
    description: "Custom integrations, reporting, spreadsheets, and agent-assisted workflows that reduce repeated operational work with review points built in.",
    spanishDescription: "Integraciones, reportes, spreadsheets y flujos asistidos por agentes para reducir trabajo operacional repetido con puntos de revisión incluidos.",
    eyebrow: "Growth system 05 / Operational infrastructure",
    spanishEyebrow: "Sistema de crecimiento 05 / Infraestructura operacional",
    lead: "We design the practical layer between your forms, inboxes, databases, reports, and approved software so work can move with fewer manual transfers.",
    spanishLead: "Diseñamos la capa práctica entre formularios, inboxes, bases de datos, reportes y software aprobado para que el trabajo avance con menos transferencias manuales.",
    includes: ["Custom agent flows and approved-software integrations", "Automated reports and spreadsheet workflows", "Form routing and data-quality checks", "Security-aware design, authorized pressure testing, and human review points"],
    spanishIncludes: ["Flujos de agentes personalizados e integraciones con software aprobado", "Reportes automatizados y workflows de spreadsheets", "Routing de formularios y chequeos de calidad de datos", "Diseño consciente de seguridad, pressure testing autorizado y puntos de revisión humana"],
    boundaries: ["Security testing is only performed with written authorization and defined scope.", "Automation is designed around approved systems and access; it does not bypass platform controls."],
    spanishBoundaries: ["El testing de seguridad se realiza solo con autorización escrita y alcance definido.", "La automatización se diseña alrededor de sistemas y accesos aprobados; no evade controles de plataforma."],
    proof: { label: "See the AI concierge implementation", spanishLabel: "Ver la implementación de AI concierge", href: "/portfolio/flas-concierge" },
  },
  {
    slug: "creative-production",
    spanishSlug: "produccion-creativa",
    icon: Camera,
    title: "Creative production & content intelligence",
    spanishTitle: "Producción creativa e inteligencia de contenido",
    metadataTitle: "Video, Photography & Content Intelligence",
    spanishMetadataTitle: "Video, Fotografía e Inteligencia de Contenido",
    description: "Video, photography, editing, content analysis, and publishing support that give the rest of a growth system credible creative fuel.",
    spanishDescription: "Video, fotografía, edición, análisis de contenido y apoyo de publicación que le dan combustible creativo creíble al resto del sistema de crecimiento.",
    eyebrow: "Growth system 06 / Creative fuel",
    spanishEyebrow: "Sistema de crecimiento 06 / Combustible creativo",
    lead: "Creative production stays central: it supplies the proof, product visibility, and usable assets that make websites, profiles, and campaigns more persuasive.",
    spanishLead: "La producción creativa sigue siendo central: entrega la prueba, visibilidad de producto y assets utilizables que hacen más persuasivos a sitios, perfiles y campañas.",
    includes: ["Video editing, photography, and scoped local capture", "Content repurposing and channel-ready exports", "Video and post-performance analysis", "Creative direction tied to a publishing or conversion use case"],
    spanishIncludes: ["Edición de video, fotografía y captura local definida por alcance", "Reutilización de contenido y exports listos para canal", "Análisis de video y post-performance", "Dirección creativa conectada a un caso de publicación o conversión"],
    boundaries: ["Creative deliverables, timing, location, and usage are confirmed per project.", "Performance analysis informs decisions; it cannot predict or guarantee virality."],
    spanishBoundaries: ["Los entregables creativos, tiempo, locación y uso se confirman por proyecto.", "El análisis de performance informa decisiones; no puede predecir ni garantizar viralidad."],
    proof: { label: "Browse published portfolio work", spanishLabel: "Explorar trabajo publicado en el portafolio", href: "/portfolio" },
  },
];

export function getGrowthSystem(slug: string, locale: "en" | "es") {
  return growthSystems.find((system) =>
    locale === "en" ? system.slug === slug : system.spanishSlug === slug,
  );
}
