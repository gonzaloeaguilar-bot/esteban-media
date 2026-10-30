import { priceSentence } from "@/lib/packages";
import {
  ES_CREATOR_START_SECTION,
  ES_REELS_FORT_LAUDERDALE_CONVERSATIONAL,
  ES_REELS_MIAMI_CONVERSATIONAL,
} from "@/lib/conversational-answers";
import { restaurantIgStudyAlternates, restaurantIgStudyPaths } from "@/lib/restaurant-ig-study";
import { buildServiceFaqSchema } from "@/components/service-depth";
import { isConsolidatedPath } from "@/lib/consolidation";
import { eventLanguageAlternates } from "@/lib/events";
import { packageRoutes } from "@/lib/package-routes";
import type { LucideIcon } from "lucide-react";
import { ARRANQUE_WEEKLY_TERMS, PACKAGE_PRICES, PRICING_BANDS, RESTAURANT_PROMO, SHORT_FORM, filmingHourlyText, shortFormPriceText, shortFormWeeklyText, usd } from "@/lib/pricing";
import {
  Anchor,
  Building2,
  CalendarRange,
  Camera,
  Car,
  Church,
  Hammer,
  Handshake,
  Heart,
  Home,
  Sparkles,
  Watch,
  Languages,
  Landmark,
  Laptop,
  MapPin,
  Music,
  Megaphone,
  Martini,
  PartyPopper,
  Scale,
  Scissors,
  ShieldCheck,
  Stethoscope,
  UtensilsCrossed,
  Video,
  WandSparkles,
  Activity,
  Beer,
  Box,
  Briefcase,
  Film,
  Fish,
  TrendingUp,
  Mic,
  GraduationCap,
  CarFront,
  Palette,
  Plane,
  Trophy,
  Waves,
  Utensils,
  Key,
  Package,
  UserCheck,
  Repeat,
  Smile,
  Building,
  Palmtree,
  Presentation,
} from "lucide-react";

import { absoluteUrl } from "@/lib/site";
import { growthSystems } from "@/lib/growth-systems";
import { SHORT_FORM_SECTIONS_ES, shortFormServiceJsonLd } from "@/lib/short-form-recs";
import {
  CORPORATE_EVENT_ES_DESTINATIONS,
  CORPORATE_EVENT_ES_DISCLOSURE,
  CORPORATE_EVENT_ES_SECTIONS,
  CORPORATE_EVENT_FTL_ES_DESTINATIONS,
  CORPORATE_EVENT_FTL_ES_DISCLOSURE,
  CORPORATE_EVENT_FTL_ES_SECTIONS,
  NETWORKING_EVENT_ES_DESTINATIONS,
  NETWORKING_EVENT_ES_DISCLOSURE,
  NETWORKING_EVENT_ES_SECTIONS,
  WEDDING_MIAMI_ES_DESTINATIONS,
  WEDDING_MIAMI_ES_DISCLOSURE,
  WEDDING_MIAMI_ES_SECTIONS,
  VLOG_VIDEOGRAPHER_ES_DESTINATIONS,
  VLOG_VIDEOGRAPHER_ES_DISCLOSURE,
  VLOG_VIDEOGRAPHER_ES_SECTIONS,
  CONFERENCE_VIDEOGRAPHER_ES_DESTINATIONS,
  CONFERENCE_VIDEOGRAPHER_ES_DISCLOSURE,
  CONFERENCE_VIDEOGRAPHER_ES_SECTIONS,
  EXECUTIVE_INTERVIEW_ES_DESTINATIONS,
  EXECUTIVE_INTERVIEW_ES_DISCLOSURE,
  EXECUTIVE_INTERVIEW_ES_SECTIONS,
  YACHT_EVENT_ES_DESTINATIONS,
  YACHT_EVENT_ES_DISCLOSURE,
  YACHT_EVENT_ES_SECTIONS,
  CONTENT_DAY_ES_DESTINATIONS,
  CONTENT_DAY_ES_DISCLOSURE,
  CONTENT_DAY_ES_SECTIONS,
  REMOTE_EDITING_COLOMBIA_ES_DESTINATIONS,
  REMOTE_EDITING_COLOMBIA_ES_DISCLOSURE,
  REMOTE_EDITING_COLOMBIA_ES_SECTIONS,
  BILINGUAL_SUBTITLING_ES_DESTINATIONS,
  BILINGUAL_SUBTITLING_ES_DISCLOSURE,
  BILINGUAL_SUBTITLING_ES_SECTIONS,
  TRADE_SHOW_BOOTH_ES_DESTINATIONS,
  TRADE_SHOW_BOOTH_ES_DISCLOSURE,
  TRADE_SHOW_BOOTH_ES_SECTIONS,
  CORPORATE_GALA_ES_DESTINATIONS,
  CORPORATE_GALA_ES_DISCLOSURE,
  CORPORATE_GALA_ES_SECTIONS,
  SUPERYACHT_CHARTER_ES_DESTINATIONS,
  SUPERYACHT_CHARTER_ES_DISCLOSURE,
  SUPERYACHT_CHARTER_ES_SECTIONS,
  REHEARSAL_DINNER_ES_DESTINATIONS,
  REHEARSAL_DINNER_ES_DISCLOSURE,
  REHEARSAL_DINNER_ES_SECTIONS,
  MASTERMIND_EVENT_ES_DESTINATIONS,
  MASTERMIND_EVENT_ES_DISCLOSURE,
  MASTERMIND_EVENT_ES_SECTIONS,
  SURPRISE_PROPOSAL_ES_DESTINATIONS,
  SURPRISE_PROPOSAL_ES_DISCLOSURE,
  SURPRISE_PROPOSAL_ES_SECTIONS,
  SPEAKER_SIZZLE_REEL_ES_DESTINATIONS,
  SPEAKER_SIZZLE_REEL_ES_DISCLOSURE,
  SPEAKER_SIZZLE_REEL_ES_SECTIONS,
  BAR_MITZVAH_ES_DESTINATIONS,
  BAR_MITZVAH_ES_DISCLOSURE,
  BAR_MITZVAH_ES_SECTIONS,
  COMMERCIAL_REAL_ESTATE_ES_DESTINATIONS,
  COMMERCIAL_REAL_ESTATE_ES_DISCLOSURE,
  COMMERCIAL_REAL_ESTATE_ES_SECTIONS,
  LUXURY_PENTHOUSE_ES_DESTINATIONS,
  LUXURY_PENTHOUSE_ES_DISCLOSURE,
  LUXURY_PENTHOUSE_ES_SECTIONS,
  FINE_DINING_ES_DESTINATIONS,
  FINE_DINING_ES_DISCLOSURE,
  FINE_DINING_ES_SECTIONS,
  MIXOLOGY_COCKTAIL_ES_DESTINATIONS,
  MIXOLOGY_COCKTAIL_ES_DISCLOSURE,
  MIXOLOGY_COCKTAIL_ES_SECTIONS,
  CONSTRUCTION_PROGRESS_ES_DESTINATIONS,
  CONSTRUCTION_PROGRESS_ES_DISCLOSURE,
  CONSTRUCTION_PROGRESS_ES_SECTIONS,
  FASHION_LOOKBOOK_ES_DESTINATIONS,
  FASHION_LOOKBOOK_ES_DISCLOSURE,
  FASHION_LOOKBOOK_ES_SECTIONS,
  BOAT_LISTING_ES_DESTINATIONS,
  BOAT_LISTING_ES_DISCLOSURE,
  BOAT_LISTING_ES_SECTIONS,
  LUXURY_WATCH_ES_DESTINATIONS,
  LUXURY_WATCH_ES_DISCLOSURE,
  LUXURY_WATCH_ES_SECTIONS,
  HOTEL_ES_DESTINATIONS,
  HOTEL_ES_DISCLOSURE,
  HOTEL_ES_SECTIONS,
  NIGHTLIFE_ES_DESTINATIONS,
  NIGHTLIFE_ES_DISCLOSURE,
  NIGHTLIFE_ES_SECTIONS,
  AMAZON_PRODUCT_ES_SECTIONS,
  AMAZON_PRODUCT_ES_DISCLOSURE,
  AMAZON_PRODUCT_ES_DESTINATIONS,
  COSMETICS_PRODUCT_ES_SECTIONS,
  COSMETICS_PRODUCT_ES_DISCLOSURE,
  COSMETICS_PRODUCT_ES_DESTINATIONS,
  PRODUCT_DEMO_ES_SECTIONS,
  PRODUCT_DEMO_ES_DISCLOSURE,
  PRODUCT_DEMO_ES_DESTINATIONS,
  UGC_AD_VARIATION_ES_SECTIONS,
  UGC_AD_VARIATION_ES_DISCLOSURE,
  UGC_AD_VARIATION_ES_DESTINATIONS,
  CATERING_COMPANY_ES_SECTIONS,
  CATERING_COMPANY_ES_DISCLOSURE,
  CATERING_COMPANY_ES_DESTINATIONS,
  BREWERY_CRAFT_DISTILLERY_ES_SECTIONS,
  BREWERY_CRAFT_DISTILLERY_ES_DISCLOSURE,
  BREWERY_CRAFT_DISTILLERY_ES_DESTINATIONS,
  YACHT_PARTY_ES_SECTIONS,
  YACHT_PARTY_ES_DISCLOSURE,
  YACHT_PARTY_ES_DESTINATIONS,
  SPORTFISHING_ES_SECTIONS,
  SPORTFISHING_ES_DISCLOSURE,
  SPORTFISHING_ES_DESTINATIONS,
  HAIR_RESTORATION_ES_SECTIONS,
  HAIR_RESTORATION_ES_DISCLOSURE,
  HAIR_RESTORATION_ES_DESTINATIONS,
  CHIROPRACTIC_VIDEO_ES_SECTIONS,
  CHIROPRACTIC_VIDEO_ES_DISCLOSURE,
  CHIROPRACTIC_VIDEO_ES_DESTINATIONS,
  STARTUP_PITCH_ES_SECTIONS,
  STARTUP_PITCH_ES_DISCLOSURE,
  STARTUP_PITCH_ES_DESTINATIONS,
  EXECUTIVE_VIDEO_BIO_ES_SECTIONS,
  EXECUTIVE_VIDEO_BIO_ES_DISCLOSURE,
  EXECUTIVE_VIDEO_BIO_ES_DESTINATIONS,
  MED_SPA_PLASTIC_SURGEON_ES_DISCLOSURE,
  MED_SPA_PLASTIC_SURGEON_ES_DESTINATIONS,
  MED_SPA_PLASTIC_SURGEON_ES_SECTIONS,
  CONTRACTOR_VIDEO_MARKETING_ES_DISCLOSURE,
  CONTRACTOR_VIDEO_MARKETING_ES_DESTINATIONS,
  CONTRACTOR_VIDEO_MARKETING_ES_SECTIONS,
  QUINCEANERA_VIDEOGRAPHER_ES_DISCLOSURE,
  QUINCEANERA_VIDEOGRAPHER_ES_DESTINATIONS,
  QUINCEANERA_VIDEOGRAPHER_ES_SECTIONS,
  MULTICAM_PODCAST_VIDEO_ES_DISCLOSURE,
  MULTICAM_PODCAST_VIDEO_ES_DESTINATIONS,
  MULTICAM_PODCAST_VIDEO_ES_SECTIONS,
  PERSONAL_INJURY_LAWYER_ES_DISCLOSURE,
  PERSONAL_INJURY_LAWYER_ES_DESTINATIONS,
  PERSONAL_INJURY_LAWYER_ES_SECTIONS,
  PRIVATE_SCHOOL_ADMISSIONS_ES_DISCLOSURE,
  PRIVATE_SCHOOL_ADMISSIONS_ES_DESTINATIONS,
  PRIVATE_SCHOOL_ADMISSIONS_ES_SECTIONS,
  EXOTIC_CAR_RENTAL_ES_DISCLOSURE,
  EXOTIC_CAR_RENTAL_ES_DESTINATIONS,
  EXOTIC_CAR_RENTAL_ES_SECTIONS,
  CAR_DEALERSHIP_VIDEO_ES_DISCLOSURE,
  CAR_DEALERSHIP_VIDEO_ES_DESTINATIONS,
  CAR_DEALERSHIP_VIDEO_ES_SECTIONS,
  BOAT_SHOW_EXHIBITOR_ES_DISCLOSURE,
  BOAT_SHOW_EXHIBITOR_ES_DESTINATIONS,
  BOAT_SHOW_EXHIBITOR_ES_SECTIONS,
  ART_BASEL_MIAMI_ART_WEEK_ES_DISCLOSURE,
  ART_BASEL_MIAMI_ART_WEEK_ES_DESTINATIONS,
  ART_BASEL_MIAMI_ART_WEEK_ES_SECTIONS,
  PRIVATE_AVIATION_VIDEO_ES_DISCLOSURE,
  PRIVATE_AVIATION_VIDEO_ES_DESTINATIONS,
  PRIVATE_AVIATION_VIDEO_ES_SECTIONS,
  EQUESTRIAN_POLO_VIDEO_ES_DISCLOSURE,
  EQUESTRIAN_POLO_VIDEO_ES_DESTINATIONS,
  EQUESTRIAN_POLO_VIDEO_ES_SECTIONS,
  YACHT_REFIT_BOATYARD_ES_DISCLOSURE,
  YACHT_REFIT_BOATYARD_ES_DESTINATIONS,
  YACHT_REFIT_BOATYARD_ES_SECTIONS,
  COUNTRY_CLUB_GOLF_COMMUNITY_ES_DISCLOSURE,
  COUNTRY_CLUB_GOLF_COMMUNITY_ES_DESTINATIONS,
  COUNTRY_CLUB_GOLF_COMMUNITY_ES_SECTIONS,
  LUXURY_POOL_BUILDER_ES_DISCLOSURE,
  LUXURY_POOL_BUILDER_ES_DESTINATIONS,
  LUXURY_POOL_BUILDER_ES_SECTIONS,
  REGENERATIVE_MEDICINE_STEM_CELL_ES_DISCLOSURE,
  REGENERATIVE_MEDICINE_STEM_CELL_ES_DESTINATIONS,
  REGENERATIVE_MEDICINE_STEM_CELL_ES_SECTIONS,
  B2B_CLIENT_CASE_STUDY_ES_DISCLOSURE,
  B2B_CLIENT_CASE_STUDY_ES_DESTINATIONS,
  B2B_CLIENT_CASE_STUDY_ES_SECTIONS,
  INTERIOR_DESIGN_MILLWORK_ES_DISCLOSURE,
  INTERIOR_DESIGN_MILLWORK_ES_DESTINATIONS,
  INTERIOR_DESIGN_MILLWORK_ES_SECTIONS,
  ESTATE_PLANNING_ATTORNEY_ES_DISCLOSURE,
  ESTATE_PLANNING_ATTORNEY_ES_DESTINATIONS,
  ESTATE_PLANNING_ATTORNEY_ES_SECTIONS,
  BOUTIQUE_HOTEL_RESORT_ES_DISCLOSURE,
  BOUTIQUE_HOTEL_RESORT_ES_DESTINATIONS,
  BOUTIQUE_HOTEL_RESORT_ES_SECTIONS,
  MULTICAM_PANEL_ES_DISCLOSURE,
  MULTICAM_PANEL_ES_DESTINATIONS,
  MULTICAM_PANEL_ES_SECTIONS,
  CORPORATE_TOWN_HALL_ES_DISCLOSURE,
  CORPORATE_TOWN_HALL_ES_DESTINATIONS,
  CORPORATE_TOWN_HALL_ES_SECTIONS,
  EXECUTIVE_RETREAT_ES_DISCLOSURE,
  EXECUTIVE_RETREAT_ES_DESTINATIONS,
  EXECUTIVE_RETREAT_ES_SECTIONS,
  BRAND_ACTIVATION_ES_DISCLOSURE,
  BRAND_ACTIVATION_ES_DESTINATIONS,
  BRAND_ACTIVATION_ES_SECTIONS,
  PRE_CONSTRUCTION_SALES_ES_DISCLOSURE,
  PRE_CONSTRUCTION_SALES_ES_DESTINATIONS,
  PRE_CONSTRUCTION_SALES_ES_SECTIONS,
  COMMERCIAL_OFFICE_LEASING_ES_DISCLOSURE,
  COMMERCIAL_OFFICE_LEASING_ES_DESTINATIONS,
  COMMERCIAL_OFFICE_LEASING_ES_SECTIONS,
  COSMETIC_DENTISTRY_ES_DISCLOSURE,
  COSMETIC_DENTISTRY_ES_DESTINATIONS,
  COSMETIC_DENTISTRY_ES_SECTIONS,
  CONCIERGE_DOCTOR_ES_DISCLOSURE,
  CONCIERGE_DOCTOR_ES_DESTINATIONS,
  CONCIERGE_DOCTOR_ES_SECTIONS,
  BAR_BAT_MITZVAH_ES_DISCLOSURE,
  BAR_BAT_MITZVAH_ES_DESTINATIONS,
  BAR_BAT_MITZVAH_ES_SECTIONS,
  DESTINATION_WEDDING_ES_DISCLOSURE,
  DESTINATION_WEDDING_ES_DESTINATIONS,
  DESTINATION_WEDDING_ES_SECTIONS,
  ONLINE_COURSE_ES_DISCLOSURE,
  ONLINE_COURSE_ES_DESTINATIONS,
  ONLINE_COURSE_ES_SECTIONS,
  VSL_DIRECT_RESPONSE_ES_DISCLOSURE,
  VSL_DIRECT_RESPONSE_ES_DESTINATIONS,
  VSL_DIRECT_RESPONSE_ES_SECTIONS,
  VIDEO_REPURPOSING_ES_DISCLOSURE,
  VIDEO_REPURPOSING_ES_DESTINATIONS,
  VIDEO_REPURPOSING_ES_SECTIONS,
  B2B_SAAS_EXPLAINER_ES_DISCLOSURE,
  B2B_SAAS_EXPLAINER_ES_DESTINATIONS,
  B2B_SAAS_EXPLAINER_ES_SECTIONS,
  EXECUTIVE_LINKEDIN_ES_DISCLOSURE,
  EXECUTIVE_LINKEDIN_ES_DESTINATIONS,
  EXECUTIVE_LINKEDIN_ES_SECTIONS,
  YOUTUBE_LONG_FORM_ES_DISCLOSURE,
  YOUTUBE_LONG_FORM_ES_DESTINATIONS,
  YOUTUBE_LONG_FORM_ES_SECTIONS,
  PRODUCT_UNBOXING_ES_DISCLOSURE,
  PRODUCT_UNBOXING_ES_DESTINATIONS,
  PRODUCT_UNBOXING_ES_SECTIONS,
  AIRBNB_LUXE_ES_DISCLOSURE,
  AIRBNB_LUXE_ES_DESTINATIONS,
  AIRBNB_LUXE_ES_SECTIONS,
  WATERFRONT_RESTAURANT_ES_DISCLOSURE,
  WATERFRONT_RESTAURANT_ES_DESTINATIONS,
  WATERFRONT_RESTAURANT_ES_SECTIONS,
  MARINA_FACILITY_ES_DISCLOSURE,
  MARINA_FACILITY_ES_DESTINATIONS,
  MARINA_FACILITY_ES_SECTIONS,
} from "@/lib/hospitality-deep-dive-content";
import {
  AUTOMOTIVE_ES_SECTIONS,
  AUTOMOTIVE_ES_DISCLOSURE,
  DENTAL_ES_SECTIONS,
  DENTAL_ES_DISCLOSURE,
  MED_SPA_ES_SECTIONS,
  MED_SPA_ES_DISCLOSURE,
  YACHT_CHARTER_ES_SECTIONS,
  YACHT_CHARTER_ES_DISCLOSURE,
} from "@/lib/vertical-deep-dives";

export const spanishSite = {
  // Matches the /es h1 ("Video, IA y redes") and the meta description (edits video
  // for businesses in Fort Lauderdale and Miami); the old title promised "Sistemas
  // de Growth", which nothing on the page says (audit 2026-10-14, item 6).
  title: "Esteban Moreno Media | Edición de Video en Fort Lauderdale",
  description:
    "Esteban Moreno Media: edición de video, contenido con IA y producción para redes en South Florida. En español y en inglés. Fort Lauderdale — cotiza rápido.",
  /** The Spanish HOME only: anchored on the published starting price (lib/pricing.ts). */
  homeDescription: `Esteban Moreno Media: edita videos para negocios en Fort Lauderdale y Miami desde ${PACKAGE_PRICES.arranque.kind === "from" ? usd(PACKAGE_PRICES.arranque.amount) : "un precio a cotizar"} por video. Atención en español. Cotiza por WhatsApp.`,
  contactLead:
    "Comparte la meta, el condado, el material disponible, las referencias y el uso previsto. La atención es principalmente en español y también hay comunicación disponible en inglés intermedio.",
};

export type SpanishService = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  detail: string;
  icon: LucideIcon;
  tags: string[];
  /** Precio inicial autorizado por el owner (2026-08-28) — siempre "Desde", nunca precio cerrado. */
  startingPrice?: string;
};

export const spanishServices: SpanishService[] = [
  {
    id: "fotografia",
    name: "Fotografía comercial",
    shortName: "Fotografía",
    description:
      "Fotografía de producto y otros proyectos comerciales, con alcance definido según lo que necesitas mostrar, la locación y el uso de las imágenes.",
    detail:
      "Comparte qué se va a fotografiar, dónde será la sesión y cómo usarás las fotos para recibir una propuesta.",
    icon: Camera,
    tags: ["Producto", "Según proyecto", "Fort Lauderdale"],
  },
  {
    id: "edicion",
    name: "Edición de video",
    shortName: "Edición",
    description:
      "Edición remota para emprendedores, negocios, agencias y equipos que ya tienen material grabado.",
    detail:
      "El alcance parte del material disponible, la meta de publicación y las necesidades de formato.",
    icon: Scissors,
    tags: ["Remoto", "Material existente", "Postproducción"],
    startingPrice: `Desde ${PACKAGE_PRICES.arranque.kind === "from" ? usd(PACKAGE_PRICES.arranque.amount) : "un precio a cotizar"}`,
  },
  {
    id: "contenido-ia",
    name: "Contenido con IA",
    shortName: "Contenido IA",
    description:
      "Apoyo creativo con métodos asistidos por IA, definido alrededor de una meta de contenido confirmada.",
    detail:
      "Las preguntas de alcance aclaran dónde puede encajar la IA, qué referencias guían la dirección y cómo se usará el contenido.",
    icon: WandSparkles,
    tags: ["Asistido por IA", "Dirección creativa", "Según proyecto"],
  },
  {
    id: "planificacion-social",
    name: "Planificación para redes",
    shortName: "Plan social",
    description:
      "Un plan práctico para marcas que necesitan publicar con consistencia y una intención clara.",
    detail:
      "Las preguntas de alcance cubren la audiencia, la meta, los canales y las necesidades de contenido.",
    icon: CalendarRange,
    tags: ["Estrategia", "Frecuencia", "Plan de contenido"],
    startingPrice: `Paquetes mensuales desde ${usd(PACKAGE_PRICES.crecimiento.kind === "from" ? PACKAGE_PRICES.crecimiento.amount : 0)}/mes`,
  },
  {
    id: "videografia",
    name: "Contenido en locación",
    shortName: "Grabación",
    description:
      "Producción local de video, definida de forma selectiva para emprendedores, negocios y marcas.",
    detail:
      "La disponibilidad y el alcance se consideran proyecto por proyecto después de conocer la locación, la meta y las necesidades de captura.",
    icon: Video,
    tags: ["South Florida", "En locación", "Según proyecto"],
    startingPrice: `Presencia Local desde ${usd(PACKAGE_PRICES["presencia-local"].kind === "from" ? PACKAGE_PRICES["presencia-local"].amount : 0)}/mes`,
  },
  {
    id: "diseno-web",
    name: "Diseño Web y Chatbots con IA",
    shortName: "Diseño Web e IA",
    description:
      "Sitios web personalizados de alta conversión, aplicaciones web interactivas y chatbots de IA para captura de clientes 24/7.",
    detail:
      "El diseño y desarrollo combina arquitectura web moderna, bots conversacionales de IA e integración visual de marca.",
    icon: Laptop,
    tags: ["Diseño Web", "Chatbots IA", "Sistemas de Conversión"],
  },
];

export const spanishAreas = [
  {
    name: "Fort Lauderdale",
    county: "Broward County",
    href: "/es/areas",
    description:
      "Base principal para emprendedores, restaurantes, real estate y contenido para negocios locales.",
  },
  {
    name: "Broward County",
    county: "Broward County",
    href: "/es/areas",
    description:
      "Broward County forma parte del mercado local habitual para proyectos definidos de forma selectiva.",
  },
  {
    name: "Miami-Dade",
    county: "Miami-Dade County",
    href: "/es/areas",
    description:
      "Proyectos de edición y grabación para emprendedores, restaurantes, marcas y real estate en Miami-Dade.",
  },
  {
    name: "Palm Beach County",
    county: "Palm Beach County",
    href: "/es/areas/palm-beach-county",
    description:
      "Proyectos de edición y grabación en Palm Beach County, definidos desde la base de Esteban en Fort Lauderdale.",
  },
];

export type SpanishNicheSection = {
  heading: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
};

export type SpanishNichePage = {
  slug: string;
  title: string;
  metadataTitle: string;
  description: string;
  /** Search snippet when the visible description runs past ~160 characters (loop row 27). */
  metaDescription?: string;
  eyebrow: string;
  h1: string;
  lead: string;
  keyword: string;
  location: string;
  availability: "confirmed" | "pending-confirmation";
  icon: LucideIcon;
  bestFor: string[];
  scopingQuestions: string[];
  projectFit: string;
  sections?: readonly SpanishNicheSection[];
  sectionsDisclosure?: string;
  /** H2 over visible (unfolded) sections; the default names short-form video, wrong for a videographer page. */
  sectionsHeading?: string;
  /** Summary line under the disclosure title; names what is inside the fold. */
  sectionsDestinations?: string;
  updated?: string;
  heroMedia?: { src: string; alt: string; caption: string };
  /** Question-shaped heading for the answer-first card (defaults to "¿Para qué proyecto encaja?"). */
  fitQuestion?: string;
  faqs: { question: string; answer: string }[];
};

// Precios de las páginas de gimnasios, salones y spas (2026-10-07): todos salen
// de lib/pricing.ts, así que un cambio de tarifa se propaga solo.
const esFrom = (price: (typeof PACKAGE_PRICES)[keyof typeof PACKAGE_PRICES]) =>
  price.kind === "from" ? usd(price.amount) : "una cotización a medida";
const esStarterFrom = esFrom(PACKAGE_PRICES.arranque);
const esGrowthFrom = esFrom(PACKAGE_PRICES.crecimiento);
const esLocalFrom = esFrom(PACKAGE_PRICES["presencia-local"]);
const esShortForm = shortFormPriceText("es");
const esWeekly = shortFormWeeklyText("es");
const esHalfDayBand = `${usd(PRICING_BANDS["on-location"].baseMin)}–${usd(PRICING_BANDS["on-location"].baseMax)}`;

// Ola de nichos 8 (2026-10-11, aprobada por el dueño). Ocho compradores sin
// página propia. Precios solo vía priceSentence() (lib/pricing.ts); la grabación
// en locación es un servicio adicional pagado que se cotiza por proyecto; las
// obligaciones reguladas (avisos legales, NMLS, revisión de la Florida Bar,
// textos de aseguradoras, permiso para menores) son del cliente.
const esArranque = () => priceSentence("es", "arranque").toLowerCase();
const esCrecimiento = () => priceSentence("es", "crecimiento").toLowerCase();
const esPresencia = () => priceSentence("es", "presencia-local").toLowerCase();

const nicheWave8Pages: SpanishNichePage[] = [
  {
    slug: "video-para-preventa-de-condominios-miami",
    title: "Video para preventa de condominios en Miami",
    metadataTitle: "Video para Preventa de Condominios",
    description:
      "Reels verticales a partir de renders y del sales gallery para lanzamientos de condominios en preventa en Miami y Fort Lauderdale, en versión en español e inglés.",
    eyebrow: "Desarrolladores / Equipos de venta / Preventa",
    h1: "Reels para lanzamientos de condominios en preventa, en español e inglés.",
    lead:
      "Envía los renders aprobados, los recorridos animados y los clips del sales gallery. Esteban los convierte en reels verticales con versión en español y en inglés para compradores locales e internacionales, y tu equipo aprueba cada afirmación y cada aviso legal.",
    keyword: "video para preventa de condominios",
    location: "Miami-Dade / Broward / Remoto",
    availability: "confirmed",
    icon: Building2,
    updated: "2026-10-11",
    fitQuestion: "¿Se pueden convertir los renders y el sales gallery en reels para una preventa?",
    projectFit: `Sí. Esteban edita el material que ya tiene el proyecto, como renders aprobados, recorridos animados, tomas del apartamento modelo y del sales gallery, y clips del equipo de ventas hablando a cámara, y lo convierte en reels verticales para Instagram, TikTok y YouTube Shorts. Cada reel puede entregarse en una versión en español y otra en inglés, con subtítulos en cada idioma, para que un mismo lanzamiento hable con compradores de Miami y de América Latina. Los renders se identifican como renders, y el equipo del desarrollador aprueba cada texto, aviso y traducción antes de publicar. La edición es remota: ${esArranque()}. Si hay que grabar el sales gallery o el modelo, la grabación en locación es un servicio adicional pagado que se cotiza por proyecto; el paquete Presencia Local es ${esPresencia()}.`,
    sectionsDisclosure: "Arma la serie de reels de tu preventa",
    sectionsDestinations: "La serie de lanzamiento y las versiones en español e inglés",
    bestFor: [
      "Desarrolladores que lanzan un proyecto en preventa con renders ya aprobados.",
      "Equipos de venta que atienden compradores locales e internacionales.",
      "Agencias de marketing inmobiliario que necesitan edición sin sumar personal.",
    ],
    scopingQuestions: [
      "¿Qué renders, animaciones y clips del sales gallery están aprobados para publicar?",
      "¿Para qué compradores es cada pieza: locales, del resto del país o internacionales?",
      "¿Quién del equipo revisa los avisos legales y los textos en español y en inglés?",
    ],
    sections: [
      {
        heading: "¿Qué reels necesita un lanzamiento en preventa?",
        paragraphs: [
          "Casi siempre cuatro tipos, publicados en orden. El adelanto usa el render exterior más fuerte y una frase sobre la ubicación, y su trabajo es que la gente pida el brochure. Los reels de amenidades muestran una sola cosa a la vez, la piscina, el lobby, el gimnasio, para que cada publicación deje una idea clara. El recorrido del sales gallery enseña los acabados y el apartamento modelo, lo más cerca que un comprador puede estar de tocar algo que todavía no existe. Las actualizaciones de obra llegan después y muestran que el proyecto avanza.",
          "Planear los cuatro juntos permite editar los renders una sola vez y reutilizarlos en toda la serie. Es el tipo de calendario que sostiene el [plan Crecimiento](/es/precios/crecimiento); los [reels inmobiliarios](/es/editor-de-video-real-estate-miami) cubren las propiedades terminadas.",
        ],
      },
      {
        heading: "¿Qué cambia entre la versión en español y la versión en inglés?",
        paragraphs: [
          "La imagen suele quedarse igual y cambian las palabras. Los textos en pantalla se reescriben en lugar de traducirse palabra por palabra, porque una frase que vende en inglés puede sonar rígida en español, y el español ocupa más espacio, así que los títulos se ajustan para no salir de la zona segura del formato vertical. También se revisan las medidas, la moneda y la llamada a la acción para cada público: un comprador del exterior necesita saber a quién escribir y en qué idioma.",
          "Si un asesor habla a cámara, el clip puede llevar subtítulos en el otro idioma en vez de doblaje. Esteban trabaja primero en español, con inglés intermedio, así que alguien del equipo revisa el inglés final. Ningún precio, disponibilidad ni fecha de entrega aparece si el desarrollador no entrega el texto exacto.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Puede un videógrafo cubrir una conferencia o evento de ocho horas?",
        answer:
          "La cobertura larga se define por la ventana de trabajo, los momentos prioritarios, el acceso y los videos finales. Comparte fecha, sede, horario y las partes importantes para que la cotización escrita defina el alcance antes de reservar.",
      },
      {
        question: "¿Qué material debe enviar el desarrollador?",
        answer:
          "Los renders y animaciones aprobados en resolución completa, las tomas aéreas o de obra que ya tenga, los clips del sales gallery y del modelo, el logo y la guía de marca, y el texto exacto que aprobó el equipo legal, incluidos los avisos. Agrega una nota que diga para qué comprador es cada pieza.",
      },
      {
        question: "¿Quién aprueba los avisos legales y las traducciones?",
        answer:
          "El desarrollador. Esteban coloca los avisos, las etiquetas de render y las afirmaciones de venta tal como las entrega tu equipo legal o de marketing, y no redacta lenguaje legal. Esa revisión forma parte del plan desde el principio.",
      },
      {
        question: "¿Esteban puede grabar el sales gallery o el apartamento modelo?",
        answer: `Sí, como servicio adicional pagado que se cotiza por proyecto en Miami-Dade y Broward. El paquete Presencia Local es ${esPresencia()} e incluye preproducción, grabación y edición. Si solo necesitas editar el material existente, Arranque es ${esArranque()}.`,
      },
    ],
  },
  {
    slug: "video-para-alquileres-vacacionales-fort-lauderdale",
    title: "Video para alquileres vacacionales en Fort Lauderdale",
    metadataTitle: "Video para Alquileres Vacacionales",
    description:
      "Reels de recorrido para anfitriones de Airbnb y administradores de alquileres de corto plazo en Fort Lauderdale y Miami, editados desde el celular.",
    eyebrow: "Anfitriones / Administradores de alquiler de corto plazo",
    h1: "Reels de recorrido para alquileres vacacionales, con tu propio material.",
    lead:
      "Graba la propiedad después de la limpieza, cuarto por cuarto. Esteban la convierte en un reel vertical y en un corte para el anuncio que muestran el lugar tal como es, con subtítulos y nombres de cada espacio para verlo sin sonido.",
    keyword: "video para alquileres vacacionales",
    location: "Broward / Miami-Dade / Remoto",
    availability: "confirmed",
    icon: Home,
    updated: "2026-10-11",
    fitQuestion: "¿Qué tiene que mostrar el reel de un alquiler vacacional?",
    projectFit: `Los espacios que el huésped va a usar, en el orden en que los recorrería, y la razón principal para reservar: la piscina, la vista al agua, la playa a pocos pasos. Esteban edita el material de anfitriones y administradores de alquileres de corto plazo y lo convierte en reels verticales para Instagram y TikTok, y en cortes horizontales para el anuncio o el sitio de reservas directas, con subtítulos y el nombre de cada espacio para que el recorrido se entienda sin sonido. La edición muestra la propiedad como es, sin amenidades agregadas, sin vistas prestadas y sin huéspedes en cámara. La edición es remota: ${esArranque()}. Si administras varias unidades en Broward o Miami-Dade y quieres que alguien grabe, la grabación en locación es un servicio adicional pagado que se cotiza por proyecto. Si ya tienes clips y tu negocio está en Broward, el [editor de Reels en Fort Lauderdale](/es/editor-de-reels-fort-lauderdale) los convierte en videos cortos con subtítulos.`,
    sectionsDisclosure: "Prepara el material de cada unidad",
    sectionsDestinations: "Una lista de tomas para cada unidad y qué enviar con los clips",
    bestFor: [
      "Anfitriones que graban su propiedad con el celular entre estadías.",
      "Administradores con varias unidades que necesitan recorridos con el mismo estilo.",
      "Propiedades con sitio de reservas directas que necesitan un video horizontal.",
    ],
    scopingQuestions: [
      "¿Cuántas unidades son y ya tienen material grabado?",
      "¿Dónde se publicará cada video: redes, el anuncio o el sitio de reservas?",
      "¿Qué datos de la propiedad pueden aparecer en pantalla?",
    ],
    sections: [
      {
        heading: "¿Qué lista de tomas sirve para cualquier unidad?",
        paragraphs: [
          "La misma, siempre. Empieza afuera, con el edificio o la puerta, para que el huésped lo reconozca al llegar. Entra y detente en la sala, luego en la cocina, con una toma cerrada de lo que los huéspedes suelen preguntar, como la cafetera. Recorre cada habitación y cada baño, después el espacio exterior y la vista, y termina con lo que el anuncio ya menciona cerca, como el acceso a la playa o la piscina.",
          "Mantener el orden fijo permite que quien limpia o un coanfitrión grabe sin instrucciones, y un administrador con muchas unidades termina con recorridos que parecen de una misma marca. Graba de día, con todas las luces encendidas, y deja fuera de cuadro los objetos personales y las pertenencias de huéspedes. Los [reels inmobiliarios](/es/editor-de-video-real-estate-miami) siguen el mismo ritmo de recorrido.",
        ],
      },
      {
        heading: "¿Qué debe enviar el administrador junto con los videos?",
        paragraphs: [
          "Una carpeta por propiedad, con el mismo nombre que usa el anuncio, los archivos originales del celular y una nota breve con los datos que pueden aparecer en pantalla: habitaciones, baños, la característica más importante y el texto del enlace de reserva. Lo que cambia, como la tarifa por noche o la disponibilidad, va en la descripción y no en el video, para que el reel no quede desactualizado.",
          "Indica dónde se publicará cada corte: un reel vertical para redes, una versión horizontal para el anuncio o el sitio de reservas directas, o ambos. Agrega el logo si las propiedades tienen marca. Si prefieres publicar con un calendario fijo, el [plan Crecimiento](/es/precios/crecimiento) incluye plan de contenido, calendario, edición y reporte mensual.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Qué debe grabar un anfitrión para el reel?",
        answer:
          "Graba justo después de la limpieza, con luces encendidas y cortinas abiertas: la entrada, un paso lento por cada espacio a la altura del pecho, la cocina, los baños, las habitaciones con las camas hechas y el exterior. Sostén cada toma varios segundos y usa una sola orientación del celular.",
      },
      {
        question: "¿Una sola grabación puede cubrir varias unidades?",
        answer: `Sí, si las unidades se agendan seguidas entre estadías. La grabación en locación es un servicio adicional pagado que se cotiza por proyecto; el paquete Presencia Local es ${esPresencia()}. Si ya tienes material, se edita a distancia con Arranque, ${esArranque()}.`,
      },
      {
        question: "¿Hay trabajo inmobiliario publicado para ver?",
        answer:
          "Sí. La página de reels inmobiliarios en inglés muestra siete reels verticales de propiedades que editó Esteban. Son reels de anuncios, no de un cliente de alquiler vacacional, y muestran cómo se arma un recorrido para la pantalla del celular.",
      },
    ],
  },
  {
    slug: "marketing-de-video-para-agencias-de-seguros-miami",
    title: "Marketing de video para agencias de seguros en Miami",
    metadataTitle: "Video para Agencias de Seguros Miami",
    description:
      "Videos cortos en español para agencias de seguros latinas en Miami y Fort Lauderdale: explicaciones de ACA y Medicare y un calendario para la temporada de inscripción.",
    metaDescription:
      `Videos cortos en español para agencias de seguros en Miami y Fort Lauderdale: tus agentes explican ACA y Medicare. Edición desde ${usd(SHORT_FORM.perVideoFrom)} por video.`,
    eyebrow: "Agencias de seguros / Agentes de ACA y Medicare",
    h1: "Videos cortos en español para agencias de seguros.",
    lead:
      "Graba a tus agentes respondiendo las preguntas que los clientes hacen en la oficina. Esteban las convierte en explicaciones cortas en español y organiza el calendario para la temporada de inscripción, con los avisos que tu agencia aprueba.",
    keyword: "marketing de video para agencias de seguros",
    location: "Miami-Dade / Broward / Remoto",
    availability: "confirmed",
    icon: ShieldCheck,
    updated: "2026-10-11",
    fitQuestion: "¿Qué videos cortos puede publicar en español una agencia de seguros latina?",
    projectFit: `Explicaciones que responden una sola pregunta que los clientes ya hacen en el escritorio: qué es un deducible, en qué se diferencia un plan del Mercado de Medicaid, qué cambia al cumplir 65 años, qué documentos llevar a la cita. Esteban edita los clips de celular de tus agentes en videos cortos en español, con versión en inglés cuando hace falta, y planea el calendario alrededor de la temporada de inscripción de otoño. La agencia entrega y aprueba cada aviso legal y el lenguaje que exigen las aseguradoras. Los videos explican e invitan a pedir una cita; no prometen inscripción, ahorro, aprobación ni un plan determinado. La edición es remota: ${esArranque()}. Grabar en la agencia es un servicio adicional pagado que se cotiza por proyecto.`,
    sectionsDisclosure: "Arma la biblioteca de explicaciones de tu agencia",
    sectionsDestinations: "Temas que salen de las preguntas reales y cómo grabar sin estudio",
    bestFor: [
      "Agencias que atienden clientes hispanos en planes del Mercado y Medicare.",
      "Agentes que responden las mismas preguntas todos los días por teléfono y WhatsApp.",
      "Oficinas que quieren publicar con orden antes y durante la inscripción.",
    ],
    scopingQuestions: [
      "¿Qué preguntas escuchan más tus agentes, con las palabras que usan los clientes?",
      "¿Qué avisos legales y textos de las aseguradoras deben aparecer en los videos?",
      "¿Quién de la agencia revisa cada video antes de publicarlo?",
    ],
    sections: [
      {
        heading: "¿Con qué temas conviene empezar una serie de explicaciones de seguros?",
        paragraphs: [
          "Con las preguntas que la recepción contesta cada semana. Pide a cada agente que anote lo que los clientes preguntan más, con sus propias palabras, y la lista se repite: qué son la prima y el deducible, si se puede agregar a un familiar, qué papeles llevar, qué pasa si cambian los ingresos, cómo usar el plan para ver a un médico. Cada pregunta se vuelve un video de menos de un minuto, con la pregunta como título, porque así la escribe alguien en el buscador o se la pregunta a un asistente de voz.",
          "Los temas de Medicare se separan de los del Mercado, para que cada serie lleve los avisos que exige su revisión. La agencia termina con piezas para publicar, fijar y mandar por WhatsApp. Para el formato vertical, revisa el [editor de video corto](/es/editor-de-video-corto-para-redes-miami).",
        ],
      },
      {
        heading: "¿Cómo se prepara la agencia para la temporada de inscripción?",
        paragraphs: [
          "Con tiempo. La agencia confirma las fechas vigentes directamente con Medicare y HealthCare.gov, y luego graba y aprueba las explicaciones antes de publicarlas. El calendario se ajusta a esas fechas sin prometer cifras de inscripción.",
          "Una sola sesión tranquila alcanza: el agente frente a una ventana, el celular a la altura de los ojos y un micrófono de solapa, respondiendo la pregunta que lee un compañero. El [plan Crecimiento](/es/precios/crecimiento) reparte esos videos en un calendario, con edición y reporte mensual, sin prometer cifras de inscripción. En los meses tranquilos, temas como leer una factura o presentar un reclamo mantienen la cuenta activa.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Quién responde por el cumplimiento normativo de los videos?",
        answer:
          "La agencia y sus aseguradoras. El marketing relacionado con Medicare tiene reglas sobre lo que se puede decir y los avisos que deben aparecer, y la agencia las aplica con su propio proceso de revisión. Esteban coloca el texto aprobado tal como lo recibe y no redacta lenguaje regulatorio ni da asesoría de seguros.",
      },
      {
        question: "¿Los agentes necesitan un estudio para grabar?",
        answer: `No. Una oficina tranquila, el celular a la altura de los ojos y luz de ventana bastan, y la edición es remota: Arranque es ${esArranque()}. Si la agencia quiere que Esteban grabe en la oficina, es un servicio adicional pagado que se cotiza por proyecto.`,
      },
      {
        question: "¿Los videos prometen resultados de inscripción?",
        answer:
          "No. Explican términos y pasos e invitan a pedir una cita. No prometen inscripción, aprobación, ahorro ni un plan específico, y cada video pasa por la revisión de la agencia antes de publicarse.",
      },
    ],
  },
  {
    slug: "marketing-de-video-para-brokers-hipotecarios-miami",
    title: "Marketing de video para brokers hipotecarios en Miami",
    metadataTitle: "Video para Brokers Hipotecarios Miami",
    description:
      "Reels de marca personal y explicaciones en español para brokers hipotecarios y oficiales de préstamos en Miami y Fort Lauderdale. Los avisos y el NMLS los aprueba el cliente.",
    metaDescription:
      `Reels en español para brokers hipotecarios en Miami y Fort Lauderdale, editados desde ${usd(SHORT_FORM.perVideoFrom)} por video. Los avisos y el NMLS los aprueba el cliente.`,
    eyebrow: "Brokers hipotecarios / Oficiales de préstamos",
    h1: "Videos de marca personal para brokers hipotecarios que atienden en español.",
    lead:
      "Explica el proceso de compra con tu propia voz y Esteban convierte esos clips en reels y explicaciones con un estilo constante. Tú entregas y apruebas el NMLS y los avisos que exige tu prestamista.",
    keyword: "marketing de video para brokers hipotecarios",
    location: "Miami-Dade / Broward / Remoto",
    availability: "confirmed",
    icon: Landmark,
    updated: "2026-10-11",
    fitQuestion: "¿Qué videos ayudan a un oficial de préstamos hispano a construir su marca personal?",
    projectFit: `Videos cortos en los que el oficial de préstamos explica, con su propia voz, los pasos que confunden a los compradores: la diferencia entre precalificación y preaprobación, qué documentos conviene consultar si alguien trabaja por cuenta propia, qué preguntas requieren una conversación individual y cómo se explican los costos de cierre. Esteban edita esos clips en reels verticales y explicaciones más largas en español, con versión en inglés cuando el público lo pide, y ayuda a planear un calendario de publicación. El cumplimiento es del cliente: el número NMLS, el nombre de la empresa y cualquier aviso que pida el prestamista los entrega y aprueba el broker. Ningún video promete una tasa, una aprobación ni una fecha de cierre. Edición remota: ${esArranque()}; grabar en la oficina es un servicio adicional pagado que se cotiza por proyecto.`,
    sectionsDisclosure: "Planea un mes de videos hipotecarios",
    sectionsDestinations: "Las preguntas de los compradores y una sola sesión de grabación",
    bestFor: [
      "Oficiales de préstamos que atienden familias hispanas en South Florida.",
      "Brokers que quieren una cuenta con la misma cara, el mismo tono y avisos en orden.",
      "Equipos que trabajan con agentes inmobiliarios y necesitan contenido para compartir.",
    ],
    scopingQuestions: [
      "¿Qué número NMLS, nombre de empresa y avisos deben aparecer en cada video?",
      "¿Quién del equipo de cumplimiento revisa los videos antes de publicarlos?",
      "¿Tus clientes prefieren contenido en español, en inglés o en ambos?",
    ],
    sections: [
      {
        heading: "¿Qué preguntas de compradores sirven para explicar el proceso hipotecario?",
        paragraphs: [
          "Las que aparecen antes de que el comprador esté listo para aplicar. Quien compra por primera vez pregunta cuánto debe ahorrar y qué significa su crédito. Quien trabaja por cuenta propia pregunta qué documentos revisa el prestamista. Otras situaciones requieren una conversación individual con el oficial de préstamos antes de describir opciones. Cada pregunta general puede convertirse en un video con la pregunta como título, respondido en un español sencillo por el profesional.",
          "El video explica el proceso general y deja las condiciones específicas para una conversación. Ordenar las preguntas por etapa, del ahorro al cierre, le da orden al calendario y enseña el proceso en el orden en que el seguidor lo va a vivir.",
        ],
      },
      {
        heading: "¿Cómo rinde una sola sesión de grabación para todo un mes?",
        paragraphs: [
          "Grabando respuestas, no programas. Escribe entre ocho y doce preguntas en tarjetas, siéntate frente al celular con luz de ventana y responde cada una en menos de un minuto, como si un cliente acabara de preguntarte. Un compañero que lee la pregunta en voz alta mantiene el tono natural. Cambia de camisa o de lugar a mitad de la sesión para que no parezca todo de la misma tarde.",
          "Envía los clips con la lista de preguntas, el texto de avisos aprobado y el enlace donde la gente debe agendar. La edición recorta cada respuesta, agrega subtítulos y deja el aviso siempre en el mismo lugar. El [plan Crecimiento](/es/precios/crecimiento) reparte esos videos en el mes, y los [reels inmobiliarios](/es/editor-de-video-real-estate-miami) sirven para los agentes con los que trabajas.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Quién entrega el número NMLS y los avisos?",
        answer:
          "El broker o el oficial de préstamos, junto con el equipo de cumplimiento del prestamista. Esteban no decide qué avisos aplican ni cómo se redactan; coloca el NMLS, el nombre de la empresa y el texto requerido tal como lo recibe, en el mismo lugar de cada video.",
      },
      {
        question: "¿Se puede grabar todo con el celular?",
        answer: `Sí. Celular a la altura de los ojos, luz de ventana y micrófono de solapa. La edición remota con Arranque es ${esArranque()}, y el plan Crecimiento, con plan de contenido y calendario, es ${esCrecimiento()}. Grabar en la oficina o en un open house es un servicio adicional pagado que se cotiza por proyecto.`,
      },
      {
        question: "¿Los videos deben ser en español, en inglés o en ambos?",
        answer:
          "En el idioma en que te llaman tus clientes. Muchos oficiales de préstamos de South Florida atienden primero a familias hispanas. Esteban trabaja primero en español, con inglés intermedio, así que alguien de tu equipo revisa los textos en inglés antes de publicar.",
      },
    ],
  },
  {
    slug: "marketing-de-video-para-abogados-de-inmigracion-miami",
    title: "Marketing de video para abogados de inmigración en Miami",
    metadataTitle: "Video para Abogados de Inmigración",
    description:
      "Reels educativos en español con los abogados reales de tu firma de inmigración en Miami y Fort Lauderdale. Información general, no asesoría legal; la firma aprueba todo.",
    metaDescription:
      `Reels educativos con los abogados de tu firma de inmigración en Miami, desde ${usd(SHORT_FORM.perVideoFrom)} por video. Información general, no asesoría legal; la firma aprueba todo.`,
    eyebrow: "Abogados de inmigración / Firmas en español",
    h1: "Reels educativos con el abogado real de tu firma de inmigración.",
    lead:
      "Tus abogados explican temas generales a cámara, con su nombre y el de la firma. Esteban edita los reels en español y la firma revisa y aprueba cada guion, subtítulo y aviso según las reglas de publicidad de la Florida Bar.",
    keyword: "marketing de video para abogados de inmigración",
    location: "Miami-Dade / Broward / Remoto",
    availability: "confirmed",
    icon: Scale,
    updated: "2026-10-11",
    fitQuestion: "¿Por qué una firma de inmigración debería publicar videos de sus abogados reales?",
    projectFit: `Mostrar al abogado de la firma en cámara ayuda a reconocer quién habla y a comprobar su nombre en el directorio público de la Florida Bar. Esteban edita reels educativos cortos en los que los abogados explican temas generales, como preparar una consulta o reunir documentos. Son información general, no asesoría legal sobre el caso de quien mira. La firma revisa y aprueba cada guion, subtítulo y aviso antes de publicar. La edición es remota: ${esArranque()}. Grabar en la oficina es un servicio adicional pagado que se cotiza por proyecto.`,
    sectionsDisclosure: "Planea los reels educativos de la firma",
    sectionsDestinations: "Temas generales que sí sirven y la revisión antes de publicar",
    bestFor: [
      "Firmas de inmigración que atienden a familias en español.",
      "Abogados que quieren que su cara y su nombre sean fáciles de verificar.",
      "Equipos que necesitan publicar con orden sin descuidar la revisión interna.",
    ],
    scopingQuestions: [
      "¿Qué abogados aparecerán en cámara y con qué nombre y título?",
      "¿Quién de la firma aprueba los guiones, subtítulos y avisos?",
      "¿Qué temas generales quiere tratar la firma y cuáles prefiere dejar para la consulta?",
    ],
    sections: [
      {
        heading: "¿Qué temas de inmigración sirven como educación general?",
        paragraphs: [
          "Los que tratan del proceso y la preparación, no de resultados. Cómo prepararse para la primera consulta y qué papeles llevar. Cómo comprobar el nombre de un abogado en el directorio público de la Florida Bar. La firma puede elegir otros temas de prevención que quiera explicar y revisar el lenguaje legal antes de publicar.",
          "Cada tema ayuda sin tocar los hechos del caso de nadie y termina con la misma invitación a pedir una consulta. Lo que depende de circunstancias personales o de políticas que están cambiando va mejor en la consulta que en un reel, y la firma decide dónde está esa línea.",
        ],
      },
      {
        heading: "¿Qué revisión necesita un reel antes de publicarse?",
        paragraphs: [
          "Tres pasos. Primero, el abogado aprueba el esquema antes de grabar, para que la grabación ya diga lo que la firma está dispuesta a decir. Segundo, después de la edición, la firma mira el corte como lo vería el público: los subtítulos en español, el texto en pantalla, el nombre y el título del abogado y el aviso que entrega la firma. Tercero, la firma confirma la descripción y el enlace que acompañan la publicación.",
          "La parte de Esteban es la edición y la colocación del texto aprobado; el cumplimiento de las reglas de publicidad de la Florida Bar es de la firma. Para otras áreas de práctica, revisa el [marketing de video para abogados](/es/marketing-de-video-para-abogados-miami).",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Esteban da asesoría legal o revisa el cumplimiento de la Florida Bar?",
        answer:
          "No. Edita video. La firma y sus abogados deciden qué se dice, aplican las reglas de publicidad de la Florida Bar y aprueban cada guion, subtítulo y aviso antes de publicar. Si un video necesita un aviso, la firma entrega el texto exacto.",
      },
      {
        question: "¿Cómo puede una firma identificar a sus abogados en video?",
        answer:
          "Puede mostrar a sus abogados reales con nombre y cargo, enlazar sus perfiles públicos y revisar cada texto antes de publicar. Así el público sabe quién está hablando y puede consultar la información de la firma.",
      },
      {
        question: "¿Los abogados pueden grabar con el celular?",
        answer: `Sí. Una oficina tranquila, el celular a la altura de los ojos y un micrófono de solapa bastan; la edición remota con Arranque es ${esArranque()}. Si la firma quiere grabar una tanda de videos en su oficina, es un servicio adicional pagado que se cotiza por proyecto, con Presencia Local ${esPresencia()}.`,
      },
    ],
  },
  {
    slug: "edicion-de-clips-de-predicas-para-iglesias-miami",
    title: "Edición de clips de prédicas para iglesias en Miami",
    metadataTitle: "Clips de Prédicas para Iglesias Miami",
    description:
      "Edición de clips cortos a partir de la prédica del domingo para iglesias en Miami y Fort Lauderdale, en español, inglés o ambos, con subtítulos y un calendario semanal.",
    metaDescription:
      `Clips cortos de la prédica del domingo para iglesias en Miami y Fort Lauderdale, con subtítulos en español, inglés o ambos. Desde ${usd(SHORT_FORM.perVideoFrom)} por video.`,
    eyebrow: "Iglesias / Ministerios / Equipos de medios",
    h1: "La prédica del domingo, convertida en clips para toda la semana.",
    lead:
      "Comparte la grabación del servicio. Esteban elige con tu equipo los momentos que se entienden solos y los convierte en clips verticales con subtítulos, en español, inglés o ambos.",
    keyword: "edición de clips de prédicas para iglesias",
    location: "Miami-Dade / Broward / Remoto",
    availability: "confirmed",
    icon: Church,
    updated: "2026-10-11",
    fitQuestion: "¿Cómo convierte una iglesia la prédica del domingo en clips cortos?",
    projectFit: `Eligiendo los momentos del mensaje que se sostienen solos, una idea clara, una historia, un versículo explicado, y convirtiendo cada uno en un clip vertical de menos de un minuto con subtítulos, para que la gente lo vea durante la semana y lo comparta. Esteban edita la grabación de la iglesia, del archivo de la transmisión o de una cámara, en clips para Instagram, Facebook, TikTok y YouTube Shorts, en español, inglés o ambos, y puede planear qué clip sale cada día. El pastor o el equipo de medios aprueba la selección. La edición es remota: ${esArranque()}. Si la iglesia quiere grabar un servicio o un evento especial, la grabación en locación es un servicio adicional pagado que se cotiza por proyecto.`,
    sectionsDisclosure: "Arma una semana de clips desde la prédica",
    sectionsDestinations: "Qué momentos elegir y un ritmo semanal que el equipo pueda sostener",
    bestFor: [
      "Iglesias que transmiten o graban el servicio y no tienen quien edite.",
      "Ministerios con servicios en español, en inglés o en ambos idiomas.",
      "Equipos de medios voluntarios que necesitan un proceso semanal sencillo.",
    ],
    scopingQuestions: [
      "¿De dónde sale la grabación: la transmisión, una cámara o la consola de sonido?",
      "¿Quién aprueba los momentos elegidos antes de publicar?",
      "¿La iglesia tiene derechos para usar la música de alabanza en redes?",
    ],
    sections: [
      {
        heading: "¿Qué partes de una prédica funcionan como clip?",
        paragraphs: [
          "Los pasajes que empiezan y terminan dentro del mismo minuto: una frase clara con la idea principal, una historia corta que la ilustra, la explicación de un versículo, una aplicación práctica para esa semana o una pregunta que el pastor le hace a la congregación. Los momentos que dependen de algo dicho mucho antes casi nunca funcionan solos, y tampoco los anuncios, que pierden vigencia.",
          "Un buen hábito es que el pastor o un voluntario de medios anote algunos momentos al terminar el servicio, con el minuto aproximado en la grabación. La edición parte de esas notas, agrega una portada con el tema y la cita bíblica y respeta las palabras del pastor, sin reordenarlas para que digan algo que no se dijo.",
        ],
      },
      {
        heading: "¿Qué ritmo semanal puede sostener un equipo de medios?",
        paragraphs: [
          "Uno que empieza con la grabación del domingo y termina con los clips programados durante la semana. La grabación se comparte al terminar el servicio, la selección se acuerda con el pastor y los clips se reparten en los días siguientes, con el más fuerte primero. Un clip a mitad de semana recuerda el mensaje y el último puede invitar al próximo servicio o a un evento.",
          "Si la iglesia tiene servicios en dos idiomas, los clips en español e inglés pueden alternarse. Cuida a la congregación: los niños y los miembros que se reconocen en cámara solo aparecen con permiso. La [reutilización de contenido para redes](/es/reutilizacion-de-contenido-para-redes-miami) aplica el mismo método a conferencias y retiros, y el [plan Crecimiento](/es/precios/crecimiento) sostiene el calendario.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Qué grabación debe enviar la iglesia?",
        answer:
          "El archivo de mejor calidad que tengan: la grabación original de la cámara o de la transmisión, no una copia descargada de redes, con el audio de la consola si es posible. Agrega la fecha, el título de la prédica y los minutos que el pastor quiere considerar.",
      },
      {
        question: "¿Los clips pueden llevar música de alabanza?",
        answer:
          "Solo si la iglesia tiene los derechos para usarla en redes. Muchas canciones tienen derechos de autor, y las licencias para transmitir o volver a publicar las debe tener y confirmar la iglesia. Si no está claro, los clips se centran en el mensaje hablado.",
      },
      {
        question: "¿Cuánto cuesta editar clips de prédicas?",
        answer: `La edición remota empieza con Arranque, ${esArranque()}, y una iglesia que quiere un ritmo semanal con calendario puede ver el plan Crecimiento, ${esCrecimiento()}. Grabar un servicio o un evento es un servicio adicional pagado que se cotiza por proyecto.`,
      },
    ],
  },
  {
    slug: "editor-de-video-para-marca-personal-miami",
    title: "Editor de video para marca personal en Miami",
    metadataTitle: "Editor de Video Marca Personal Miami",
    description:
      "Edición de video para fundadores, coaches y consultores en Miami y Fort Lauderdale: Reels, TikToks, Shorts y videos para LinkedIn a partir de tus propias grabaciones.",
    metaDescription:
      `Edición de video para fundadores, coaches y consultores en Miami: Reels, TikToks, Shorts y videos de LinkedIn con tus grabaciones, desde ${usd(SHORT_FORM.perVideoFrom)} por video.`,
    eyebrow: "Fundadores / Coaches / Consultores",
    h1: "Lo que sabes, frente a la cámara, editado en videos que la gente termina de ver.",
    lead:
      "Graba tus respuestas con el celular o en un estudio. Esteban las edita a distancia en videos verticales con subtítulos para Reels, TikTok y Shorts, y versiones para LinkedIn, en español o en inglés.",
    keyword: "editor de video para marca personal",
    location: "Miami-Dade / Broward / Remoto",
    availability: "confirmed",
    icon: Megaphone,
    updated: "2026-10-13",
    fitQuestion: "¿Quién edita videos de marca personal para fundadores, coaches y consultores en Miami?",
    projectFit: `Esteban Moreno Media edita los videos que un fundador, un coach o un consultor graba sobre su propio trabajo: explicaciones a cámara, opiniones sobre su industria, preguntas de clientes respondidas en video y clips sacados de charlas o entrevistas. Tú grabas con el celular o en un estudio; Esteban edita a distancia en cortes verticales para Reels, TikTok y YouTube Shorts y versiones para LinkedIn, con subtítulos en español o en inglés. Conoce el otro lado de la cámara: fundó y dirigió su propia marca, ML Colombia, durante unos seis años y llevó su contenido digital como CEO. La edición es remota: ${esArranque()}. La grabación en locación es un servicio adicional pagado que se cotiza por proyecto.`,
    sectionsDisclosure: "Arma un mes de videos desde una sola sesión",
    sectionsDestinations: "Qué grabar en una sesión y un ritmo semanal que aguante una agenda llena",
    bestFor: [
      "Fundadores que venden su experiencia y no tienen equipo de producción.",
      "Coaches y consultores que responden las mismas preguntas en cada llamada.",
      "Profesionales que quieren publicar en español, en inglés o en ambos.",
    ],
    scopingQuestions: [
      "¿Qué preguntas te hacen tus clientes en cada llamada de venta?",
      "¿Dónde vas a publicar: Instagram, TikTok, YouTube, LinkedIn?",
      "¿Cada cuánto puedes grabar: cada semana, cada dos semanas o una vez al mes?",
    ],
    sections: [
      {
        heading: "¿Qué debe grabar un fundador en una sola sesión?",
        paragraphs: [
          "Respuestas cortas a las preguntas que tus clientes ya te hacen. Anota entre cinco y ocho, las que respondes cada semana en llamadas de venta, y graba cada respuesta por separado en uno o dos minutos, mirando al lente. Suma una opinión sobre tu industria que defenderías en una reunión y una historia corta de tu propio trabajo. Esa lista suele alcanzar para dos a cuatro semanas de publicaciones.",
          "Graba todo en una sola sentada para que la luz, el sonido y la ropa coincidan, y deja una pausa antes y después de cada respuesta para tener margen de corte. Manda los archivos originales, no exportados de una app, con una línea sobre de qué trata cada uno. Esteban respeta tus palabras: quita las pausas, los arranques en falso y las muletillas, y agrega subtítulos y un título.",
        ],
      },
      {
        heading: "¿Qué ritmo semanal puede sostener un fundador ocupado?",
        paragraphs: [
          "Una sesión de grabación cada dos a cuatro semanas y un número fijo de publicaciones por semana, no una promesa diaria. Un fundador que graba ocho respuestas un lunes y publica dos por semana tiene el mes cubierto, y las ediciones llegan en tandas y no de a una. Si publicas cada semana, el Arranque semanal encaja con ese ritmo, con un número fijo de videos cada semana.",
          "Mide solo dos cosas: qué preguntas te traen mensajes o llamadas y cuáles la gente ve hasta el final. Eso decide la siguiente lista de grabación. Cuando quieras que el calendario y el reporte los lleve otra persona, ese es el [plan Crecimiento](/es/precios/crecimiento). Para los detalles de edición de videos cortos, mira el [editor de video corto para redes](/es/editor-de-video-corto-para-redes-miami).",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Necesito un estudio o un equipo de grabación?",
        answer:
          "No. Para empezar alcanzan un celular reciente, una ventana de frente, un micrófono de solapa y un cuarto callado. Graba unos minutos por idea, di el punto al principio y manda los archivos originales en una carpeta compartida. Si quieres un look de estudio o grabar en tu oficina, es un servicio adicional pagado que se cotiza por proyecto.",
      },
      {
        question: "¿Los videos pueden ir en español y en inglés?",
        answer:
          "Sí. Esteban trabaja principalmente en español, con inglés intermedio para proyectos bilingües, y los subtítulos pueden ir en cualquiera de los dos idiomas. Si grabas la misma idea dos veces, una en cada idioma, cada versión se edita por separado en lugar de traducirse solo en subtítulos.",
      },
      {
        question: "¿Cuánto cuesta editar videos de marca personal?",
        answer: `Cada video editado se cobra como el paquete Arranque, ${esArranque()}. Si publicas cada semana, el Arranque se puede pagar semana a semana, y un mes planificado con calendario y reporte es el plan Crecimiento, ${esCrecimiento()}. Una cotización por escrito fija la cantidad de videos antes de empezar.`,
      },
    ],
  },
  {
    slug: "edicion-de-clips-de-podcast-miami",
    title: "Edición de clips de podcast en Miami",
    metadataTitle: "Clips de Podcast para Redes Miami",
    description:
      "Edición de clips de podcast en Miami y Fort Lauderdale: episodios convertidos en clips verticales con subtítulos para Reels, TikTok y YouTube Shorts, encuadrados en quien habla.",
    metaDescription:
      "Clips de podcast en Miami y Fort Lauderdale: cada episodio convertido en clips verticales con subtítulos para Reels, TikTok y Shorts, encuadrados en quien habla.",
    eyebrow: "Podcasts / Entrevistas / Programas en video",
    h1: "Un episodio de podcast, convertido en clips para Reels, TikTok y Shorts.",
    lead:
      "Manda los archivos del episodio. Esteban encuentra los momentos que se entienden solos y convierte cada uno en un clip 9:16 con subtítulos, encuadrado en quien habla, listo para publicar.",
    keyword: "edición de clips de podcast",
    location: "Miami-Dade / Broward / Remoto",
    availability: "confirmed",
    icon: Music,
    updated: "2026-10-13",
    fitQuestion: "¿Cómo se convierte un episodio de podcast en clips para Reels, TikTok y Shorts?",
    projectFit: `Buscando los momentos del episodio que se entienden sin el resto de la conversación, una respuesta clara, una opinión fuerte, una historia corta, y cortando cada uno en un clip vertical de menos de un minuto y medio con subtítulos incrustados. Esteban trabaja con los archivos de tu episodio, idealmente cada ángulo de cámara por separado y el audio limpio, reencuadra la conversación de 16:9 a 9:16 para que quien habla quede en cuadro y entrega cada clip listo para Reels, TikTok y YouTube Shorts. Tú o tu productor aprueban la selección antes de publicar. La edición es remota: ${esArranque()}. La edición del episodio completo es otro servicio: la edición de video podcast. Grabar un episodio en locación es un servicio adicional pagado que se cotiza por proyecto.`,
    sectionsDisclosure: "Arma una semana de clips desde un episodio",
    sectionsDestinations: "Qué momentos elegir y un ritmo de publicación que un podcast pequeño pueda sostener",
    bestFor: [
      "Podcasts y programas en video que graban con dos o más cámaras.",
      "Shows en español, en inglés o bilingües que quieren crecer en redes.",
      "Productores que ya editan el episodio y necesitan los clips aparte.",
    ],
    scopingQuestions: [
      "¿Cada cuánto sale un episodio y cuánto dura?",
      "¿Grabas con una cámara o con varias, y tienes el audio limpio por separado?",
      "¿Cuántos clips por episodio quieres publicar?",
    ],
    sections: [
      {
        heading: "¿Qué momentos de un podcast funcionan como clip?",
        paragraphs: [
          "Los pasajes que empiezan y terminan dentro de más o menos el mismo minuto: una respuesta directa a una pregunta, una opinión dicha sin rodeos, una historia corta, un dato sorprendente con su fuente o un desacuerdo entre los anfitriones. Los momentos que dependen de algo dicho veinte minutos antes casi nunca funcionan solos, y tampoco las menciones de patrocinadores o los chistes internos, que confunden a quien nunca escuchó el programa.",
          "La forma más rápida de llegar a una buena selección es que el anfitrión o el productor anote algunos minutos justo después de grabar, cuando la conversación está fresca. Con esas notas empieza la selección; cada clip lleva un título de una línea que dice de qué trata el clip y respeta las palabras de cada persona, sin pegar frases para que digan algo que nadie dijo.",
        ],
      },
      {
        heading: "¿Qué ritmo de publicación puede sostener un podcast pequeño?",
        paragraphs: [
          "Clips repartidos en los días después del episodio, no todos el día del estreno. Un ritmo común es el clip más fuerte junto con el episodio, dos o tres más durante la semana y el último invitando al siguiente episodio. Entre tres y cinco clips por episodio es un buen comienzo para un programa semanal; la cantidad se acuerda en la cotización según la duración del episodio y cada cuánto publicas.",
          "Piensa en el invitado: mándale los clips donde aparece para que también los comparta, y confirma que la música y las intros tienen licencia para redes. Cuando el episodio completo también necesita edición, la [edición de video podcast](/es/edicion-de-video-podcast-miami) lo cubre, y para webinars y charlas sirve la [reutilización de contenido para redes](/es/reutilizacion-de-contenido-para-redes-miami).",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Qué archivos debe mandar un podcast para los clips?",
        answer:
          "Los originales de mejor calidad que tengas: cada ángulo de cámara en su propio archivo y el audio limpio de la grabadora o la consola, no una copia descargada de YouTube o Spotify. Agrega el título del episodio, los nombres de los invitados bien escritos y, si puedes, los minutos de los momentos que te gustaron.",
      },
      {
        question: "¿Es lo mismo que la edición de podcast?",
        answer:
          "No. La edición de podcast produce el episodio completo para YouTube o las plataformas de audio; los clips son piezas verticales cortas que salen de un episodio que ya existe. Muchos programas necesitan las dos cosas. Para el episodio completo, mira la página de edición de video podcast; esta página cubre solo los clips.",
      },
      {
        question: "¿Cuánto cuesta editar clips de podcast?",
        answer: `Cada clip se cobra como el paquete Arranque, ${esArranque()}. Un programa que publica cada semana puede pagar el Arranque semana a semana, y un mes de clips con calendario y reporte es el plan Crecimiento, ${esCrecimiento()}. Una cotización por escrito fija la cantidad de clips por episodio.`,
      },
    ],
  },
  {
    slug: "video-para-quinceaneras-miami",
    title: "Video para quinceañeras en Miami",
    metadataTitle: "Video para Quinceañeras Miami",
    description:
      "Película de momentos destacados y clips para redes de tu quinceañera en Miami y Fort Lauderdale. Edición de tu material y grabación en el lugar como servicio adicional.",
    metaDescription:
      "Video de momentos destacados y clips para redes de tu quinceañera en Miami y Fort Lauderdale. Esteban edita tu material; grabar en el lugar es un adicional.",
    eyebrow: "Quinceañeras / Familias / Celebraciones",
    h1: "El video de la quinceañera: la película de la noche y los clips para redes.",
    lead:
      "Esteban edita el material del videógrafo, del fotógrafo o de los invitados en una película de momentos destacados y clips verticales que la familia aprueba. También puede grabar la fiesta en persona.",
    keyword: "video para quinceañeras",
    location: "Miami-Dade / Broward",
    availability: "confirmed",
    icon: PartyPopper,
    updated: "2026-10-11",
    fitQuestion: "¿Qué incluye el video de una quinceañera?",
    projectFit: `Normalmente dos cosas: una película de momentos destacados de pocos minutos, para que la familia la vea y la comparta durante años, y clips verticales para redes, como la entrada, el vals, el baile sorpresa y el brindis. Esteban edita el material del videógrafo de la familia, los clips de video del fotógrafo o los celulares de los invitados, y también puede grabar la celebración en persona en Miami-Dade o Broward como servicio adicional pagado que se cotiza por proyecto; Presencia Local es ${esPresencia()}. La familia decide qué se publica, porque la quinceañera es menor de edad, y se respetan las reglas del salón sobre grabación. La música de las publicaciones públicas debe tener licencia o salir de la biblioteca de cada plataforma. La cotización por escrito fija los entregables antes de la fecha.`,
    sectionsDisclosure: "Planea el video de la quinceañera",
    sectionsDestinations: "La lista de momentos de la noche y qué se comparte en redes",
    bestFor: [
      "Familias que quieren una película de la fiesta y clips para compartir.",
      "Quinceañeras grabadas por otro videógrafo que necesitan edición.",
      "Celebraciones en Miami-Dade o Broward que necesitan quien grabe en persona.",
    ],
    scopingQuestions: [
      "¿Quién graba la fiesta y qué material habrá?",
      "¿Qué momentos son imprescindibles para la familia?",
      "¿Qué clips se pueden publicar y en qué cuentas?",
    ],
    sections: [
      {
        heading: "¿Qué momentos de una quinceañera deben estar en la lista?",
        paragraphs: [
          "Los que la familia va a querer ver otra vez. La preparación en casa o en el salón de belleza, la sesión de fotos si la hay, la misa o la bendición cuando la familia la incluye, la llegada al salón, la entrada con los chambelanes y las damas, el vals con el papá, el cambio de zapatos, la última muñeca si la familia mantiene esa tradición, el baile sorpresa y el brindis.",
          "Entrega al videógrafo el orden de la noche con horarios aproximados y los nombres de las personas más importantes, como los padrinos y los abuelos, para que se graben a propósito y no por casualidad. La película se arma con esa lista, y con ella la familia puede comprobar que no faltó nada importante.",
        ],
      },
      {
        heading: "¿Quién decide qué se publica en redes?",
        paragraphs: [
          "Los padres. La quinceañera tiene quince años, así que la familia aprueba cada clip antes de compartirlo y decide si va en las cuentas de la familia, en la de ella o en ninguna. Los invitados que se reconocen, y sobre todo otros niños, deben estar de acuerdo en aparecer; si hay duda, la edición usa planos más abiertos o los deja fuera.",
          "Algunos salones tienen reglas propias sobre grabar y publicar, y la familia las confirma con el lugar. Para las publicaciones públicas, la música debe tener licencia o salir de la biblioteca de la plataforma; la película privada puede conservar las canciones de la fiesta. La [edición de video para discotecas y eventos](/es/edicion-de-video-para-discotecas-y-eventos-miami) cubre otros eventos, y el [editor de video corto](/es/editor-de-video-corto-para-redes-miami) los clips verticales.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Esteban puede grabar la quinceañera en persona?",
        answer: `Sí. La grabación en Miami-Dade o Broward es un servicio adicional pagado que se cotiza por proyecto, según el salón, las horas de cobertura y los momentos que quiere la familia. Si otro videógrafo ya graba la fiesta, Esteban puede editar ese material a distancia; Arranque es ${esArranque()}.`,
      },
      {
        question: "¿Se pueden usar los videos que grabaron los invitados?",
        answer:
          "Sí, y muchas veces captan momentos que una sola cámara no ve, como la reacción de los abuelos. Pide a los invitados los archivos originales en una carpeta compartida, no videos descargados de un chat.",
      },
      {
        question: "¿Cuándo conviene reservar la edición?",
        answer:
          "Antes de la fecha, para acordar la lista de momentos, los entregables y las canciones con tiempo. Si la fiesta ya pasó, envía el material y la lista de momentos más importantes. Las fechas de entrega se confirman en la cotización por escrito.",
      },
    ],
  },
  {
    // Bodas (dato del dueño 2026-10-14, vault esteban-owner-facts-2026-10-14):
    // Esteban graba y edita bodas y cotiza cada boda por separado. No hay precio
    // de bodas, así que esta página no publica ninguna cifra.
    slug: "videografo-de-bodas-fort-lauderdale",
    title: "Videógrafo de bodas en Fort Lauderdale y Miami",
    metadataTitle: "Videógrafo de Bodas Fort Lauderdale",
    description:
      "Películas de boda y tráileres de momentos destacados que Esteban Moreno graba y edita en Fort Lauderdale y Miami. Cada boda se cotiza por separado.",
    eyebrow: "Bodas / Parejas / Familias",
    h1: "Videógrafo de bodas en Fort Lauderdale y Miami: la película de tu día.",
    lead:
      "Esteban Moreno graba y edita bodas: una película completa del día, un tráiler para compartir y, si los quieres, clips verticales para redes. También puede editar una boda que grabó otro videógrafo.",
    keyword: "videógrafo de bodas",
    location: "Broward / Miami-Dade",
    availability: "confirmed",
    icon: Heart,
    updated: "2026-10-14",
    fitQuestion: "¿Grabas bodas en Fort Lauderdale y Miami?",
    projectFit:
      "Sí. Esteban Moreno graba y edita bodas. Tiene su base en Fort Lauderdale y graba en locación en Broward y Miami-Dade, y también puede editar a distancia una boda que grabó otro videógrafo. Su boda publicada, [Diana & Jack](/es/portafolio/diana-jack), se grabó en Boston, Massachusetts: él fue el videógrafo y el editor, y entregó una película completa de 20 minutos del día y un tráiler de momentos destacados de un minuto y medio, aproximadamente. Cada boda se cotiza por separado, porque las horas, los lugares y los entregables cambian de una pareja a otra. Puedes planear todo el video en español, su idioma principal de trabajo.",
    sectionsDisclosure: "Planea el video de tu boda",
    sectionsDestinations: "Qué enviar para la cotización y los momentos que van en la lista",
    bestFor: [
      "Parejas que quieren una película del día y un tráiler para compartir.",
      "Bodas grabadas por otro videógrafo que necesitan edición.",
      "Bodas en Broward o Miami-Dade que necesitan quien grabe en persona.",
    ],
    scopingQuestions: [
      "¿Cuál es la fecha y dónde son la ceremonia y la recepción?",
      "¿Cuántas horas del día quieres cubrir?",
      "¿Qué quieres recibir: película, tráiler, clips para redes?",
    ],
    sections: [
      {
        heading: "¿Cuánto cobra un videógrafo de bodas?",
        paragraphs: [
          "Cada boda se cotiza por separado, porque cada boda es distinta. Cuéntanos la fecha, el lugar, las horas y lo que quieres recibir, y te enviamos una cotización.",
          "Esas cuatro respuestas son las que cambian el trabajo: cuántas horas del día se cubren, si la ceremonia y la recepción son en el mismo lugar o en dos, y si quieres una película completa, un tráiler corto, clips verticales para redes o las tres cosas. Un sábado de temporada alta y una ceremonia pequeña entre semana son trabajos distintos, y por eso no hay un precio único de paquete. La cotización enumera los entregables antes de la fecha, así los dos saben qué se graba y qué recibes.",
        ],
      },
      {
        heading: "¿Qué debe enviar una pareja para recibir la cotización?",
        paragraphs: [
          "Cuatro datos: la fecha, el lugar, las horas que quieres cubrir y lo que quieres recibir. La fecha dice si Esteban está libre. El lugar dice si la ceremonia y la recepción son en un mismo salón o en dos, y qué tan lejos quedan. Las horas fijan cuánto del día se graba, desde la preparación hasta el último baile o solo la ceremonia y los brindis.",
          "Lo que quieres recibir es lo que las parejas suelen dejar en el aire. Di si quieres una película completa del día, un tráiler corto, clips verticales para Instagram o TikTok o una mezcla, y si algún discurso necesita subtítulos. Agrega las reglas del salón sobre grabación si ya las conoces. Con esos datos llega una cotización por escrito, y sabes qué incluye antes de reservar.",
        ],
      },
      {
        heading: "¿Qué momentos de la boda deben estar en la lista?",
        paragraphs: [
          "Los que vas a querer ver otra vez en diez años. La preparación, el primer encuentro si lo planean, la entrada a la ceremonia, los votos y el intercambio de anillos, el lazo o las arras si la familia mantiene esas tradiciones, el primer beso, la salida, las fotos familiares, la entrada a la recepción, el primer baile, los bailes con los padres, los brindis, el pastel y la despedida.",
          "Entrega al videógrafo el horario del día con tiempos aproximados y los nombres de las personas más importantes, para que los abuelos, los padrinos y quien da un discurso se graben a propósito. La película se arma con esa lista. Para clips cortos del mismo día está el [editor de video corto](/es/editor-de-video-corto-para-redes-miami), y para otra celebración familiar el [video para quinceañeras](/es/video-para-quinceaneras-miami).",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Esteban puede editar el material que grabó otro videógrafo en nuestra boda?",
        answer:
          "Sí. Envía los archivos originales de cámara y el audio, no copias descargadas de un chat, junto con el horario del día y los momentos que más te importan. Él edita a distancia y la cotización se basa en cuánto material hay y en lo que quieres recibir.",
      },
      {
        question: "¿Qué recibimos después de la boda?",
        answer:
          "Lo que diga la cotización por escrito. Como referencia, la boda publicada de Diana & Jack se entregó como una película completa de 20 minutos y un tráiler de un minuto y medio, aproximadamente. Los clips verticales para redes se agregan cuando los pides.",
      },
      {
        question: "¿Podemos planear el video de la boda en español?",
        answer:
          "Sí. El español es el idioma principal de trabajo de Esteban, y su inglés es intermedio, así que las familias bilingües pueden planear en el idioma que les quede más fácil. Dile qué votos o discursos son en cada idioma para planear los subtítulos desde el principio, si los quieres.",
      },
    ],
  },
  {
    slug: "video-para-academias-de-baile-y-musica-miami",
    title: "Video para academias de baile y música en Miami",
    metadataTitle: "Video para Escuelas de Baile y Música",
    description:
      "Contenido constante para academias de baile, escuelas de música y actividades infantiles en Miami y Fort Lauderdale: clips de clase, recitales y un calendario mensual.",
    metaDescription:
      "Clips de clase y recitales para academias de baile y escuelas de música en Miami y Fort Lauderdale, con un calendario mensual de publicaciones.",
    eyebrow: "Academias de baile / Escuelas de música / Actividades infantiles",
    h1: "Contenido para academias de baile y música durante toda la temporada.",
    lead:
      "Graba las clases con el celular desde un mismo rincón. Esteban convierte ese material en reels y resúmenes de recitales con un calendario mensual, usando solo a los alumnos cuyas familias dieron permiso.",
    keyword: "video para academias de baile y música",
    location: "Miami-Dade / Broward / Remoto",
    availability: "confirmed",
    icon: Music,
    updated: "2026-10-11",
    fitQuestion: "¿Qué contenido constante funciona para academias de baile y escuelas de música?",
    projectFit: `Contenido que sigue el calendario que la academia ya tiene: clips cortos de las clases, piezas de progreso que muestran a un alumno aprendiendo una coreografía o una canción durante el ciclo, presentaciones de los profesores, recordatorios de inscripción antes de cada sesión nueva y un resumen de cada recital o muestra. Esteban edita el material de celular de la academia en reels verticales y resúmenes horizontales y ayuda a planear un calendario mensual; el plan Crecimiento es ${esCrecimiento()}. El mismo método sirve para otras actividades infantiles, como artes marciales, arte o natación. Como la mayoría de los alumnos son menores, la academia trabaja solo con material que las familias aceptaron compartir. La edición es remota; grabar un recital o una clase en el lugar es un servicio adicional pagado que se cotiza por proyecto.`,
    sectionsDisclosure: "Mantén la cuenta activa toda la temporada",
    sectionsDestinations: "Una rutina para grabar clases y el plan alrededor de recitales e inscripciones",
    bestFor: [
      "Academias de baile con clases semanales y recitales durante el año.",
      "Escuelas de música que quieren mostrar el progreso de sus alumnos.",
      "Negocios de actividades infantiles que funcionan por ciclos y muestras.",
    ],
    scopingQuestions: [
      "¿Qué familias firmaron permiso para que sus hijos aparezcan en redes?",
      "¿Cuándo son los próximos recitales y las próximas inscripciones?",
      "¿El teatro o el salón del recital permite grabar?",
    ],
    sections: [
      {
        heading: "¿Cómo pueden los profesores grabar sin interrumpir la clase?",
        paragraphs: [
          "Elige un solo lugar en cada salón, normalmente un rincón del fondo a la altura del pecho, y deja el celular en un soporte durante los últimos minutos de la clase, cuando los alumnos repasan la coreografía o la pieza que están practicando. Ese es el momento que vale la pena: el progreso, no el calentamiento. Mantén la luz constante y revisa que el espejo no refleje el celular.",
          "Una vez al mes, graba a un profesor explicando en qué está trabajando el grupo, para que los padres entiendan lo que están pagando. Nombra cada archivo con la clase y la fecha, marca qué alumnos tienen permiso y comparte la carpeta. La edición convierte cada tanda en publicaciones sin detener ninguna clase.",
        ],
      },
      {
        heading: "¿Cómo se planea el contenido alrededor de recitales e inscripciones?",
        paragraphs: [
          "Trabajando hacia atrás desde las fechas que ya existen. Antes de abrir una sesión nueva, publica recordatorios con clips de clase y una presentación del profesor de cada nivel. Antes de un recital, muestra momentos del ensayo que generen expectativa sin revelar toda la coreografía. Después de la función, publica primero el resumen y luego un clip corto por grupo, para que cada familia vea el momento de su hijo.",
          "En los meses tranquilos, las piezas de progreso y el detrás de cámaras mantienen la cuenta activa. La [producción masiva de video para redes](/es/produccion-masiva-de-video-para-redes-miami) permite editar un mes completo en una sola tanda, y los resúmenes de eventos tienen su propia página: [video de eventos y discotecas en Miami](/es/edicion-de-video-para-discotecas-y-eventos-miami).",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Qué permiso necesita la academia para publicar a sus alumnos?",
        answer:
          "La academia obtiene permiso del padre, la madre o el tutor según sus propias políticas antes de compartir imágenes en las que se reconoce a un alumno. La edición usa solo los clips aprobados y planos abiertos o de espaldas para el resto.",
      },
      {
        question: "¿Esteban puede grabar un recital?",
        answer: `Sí, como servicio adicional pagado que se cotiza por proyecto en Miami-Dade o Broward, según el teatro, la duración de la función y si el lugar permite grabar. Presencia Local es ${esPresencia()}. Si la academia ya graba la función, ese material se edita a distancia con Arranque, ${esArranque()}.`,
      },
      {
        question: "¿Qué pasa con la música de los videos de baile?",
        answer:
          "La academia confirma los derechos de la música para cada canal donde publicará. Puede aportar pistas que aprobó o elegir audio disponible para ese uso en su cuenta; un video familiar y un clip público se revisan por separado. Esteban prepara versiones alternativas después de recibir esas decisiones.",
      },
    ],
  },
];

export const spanishNichePages: SpanishNichePage[] = [
  {
    slug: "edicion-de-video-para-creadores-de-comida-y-lugares-miami",
    title: "Creadores de comida y lugares",
    metadataTitle: "Creadores de Comida y Lugares Miami",
    description: "Edición para creadores que recomiendan comida y lugares en Miami y Fort Lauderdale. Envía tus videos o consulta un mes de contenido para lanzar tu cuenta.",
    eyebrow: "Comida / Lugares / Creadores",
    h1: "Tú descubres el lugar. Esteban edita la historia.",
    lead: "Edición para cuentas que recomiendan comida y lugares en Miami y Fort Lauderdale. Envía tus videos o consulta un mes de contenido para lanzar tu cuenta.",
    keyword: "Edición para creadores",
    location: "Broward / Miami-Dade / Remoto",
    availability: "confirmed",
    icon: UtensilsCrossed,
    updated: "2026-10-07",
    heroMedia: { src: "/portfolio/bar-door-monkey.jpg", alt: "Fotograma del video publicado de Bar Door Monkey Miami", caption: "Bar Door Monkey Miami · 2020 · 55 segundos. Promoción de un local con videografía y edición, no una cuenta de recomendaciones." },
    sectionsDisclosure: "Prepara tus primeros videos de comida y lugares",
    bestFor: [
      "Cuentas nuevas con visitas grabadas y ganas de empezar a publicar.",
      "Creadores que recomiendan restaurantes, cafés y otros lugares.",
      "Videos grabados con celular que necesitan edición y subtítulos.",
    ],
    scopingQuestions: [
      "¿Qué material tienes y dónde quieres publicarlo?",
      "¿Qué ritmo de publicación buscas para el primer mes?",
      "¿Qué visitas fueron pagadas o incluyeron comida de cortesía?",
    ],
    projectFit: `Crecimiento: ${priceSentence("es", "crecimiento")}. Incluye plan de contenido, calendario, edición y reporte mensual. El material disponible y el ritmo que buscas definen la cotización. Esteban tiene su base en Fort Lauderdale; la edición puede ser remota y la grabación se acuerda por proyecto.`,
    sections: [
      {
        heading: "¿Qué edita Esteban para una cuenta de recomendaciones?",
        paragraphs: [
          "Esteban convierte tus visitas a restaurantes y otros lugares en videos verticales de 1080x1920, con subtítulos incrustados dentro de la zona segura. El nombre del plato o del local y el barrio aparecen en pantalla para que quien descubre tu cuenta sepa de qué lugar hablas. Las portadas se sacan de tus propias tomas. También se puede acordar una versión horizontal cuando la visita tenga material para un video más largo.",
          "Envía los archivos originales, la cuenta y las plataformas donde vas a publicar. Explica qué quieres recomendar y qué detalles no deben quedar por fuera. El servicio une la [edición para creadores de contenido](/es/edicion-de-video-para-creadores-de-contenido-miami) con el cuidado del plato y el ambiente de la [edición promocional para restaurantes](/es/edicion-de-video-promocional-para-restaurantes-miami), conservando tu manera de contar la experiencia.",
        ],
      },
      {
        heading: "¿Cómo se organiza el primer mes de la cuenta?",
        paragraphs: [
          `El paquete Crecimiento incluye plan de contenido, calendario de publicación, edición y reporte mensual. ${priceSentence("es", "crecimiento")}. Es un precio de partida: el primer mes se define en una llamada según el material que tengas y el ritmo que quieras mantener. Lleva tu cuenta, los lugares que piensas visitar y referencias de estilo. La cantidad de publicaciones y los plazos se acuerdan después de revisar el alcance.`,
          "La conversación separa las visitas que ya grabaste de las ideas que todavía necesitan tomas. También sirve para decidir qué piezas van juntas y qué nombres, observaciones o textos debes enviar. No necesitas tener una cuenta consolidada para consultar. El plan parte de tu material y de lo que quieres comunicar, sin prometer seguidores, visualizaciones ni resultados de crecimiento.",
        ],
      },
      {
        heading: "¿Qué conviene grabar durante una visita al restaurante?",
        paragraphs: [
          "Graba manos, ingredientes, texturas, el salón y el letrero o la fachada. Esas tomas conectan el plato con el lugar y evitan que todo el video dependa de primeros planos de comida. Organiza los originales en carpetas con el nombre del local y la fecha. Incluye la escritura correcta de los platos del menú y una nota breve sobre lo que quieres recomendar, sin dejar que el editor tenga que adivinar tu opinión.",
          "La [guía de ideas de video para restaurantes](/es/guias/ideas-de-contenido-de-video-para-restaurantes) te ayuda a preparar las tomas; la [guía de entrega para edición remota](/es/guias/entrega-para-edicion-remota-de-video) explica cómo organizar el envío. Si el contenido es para la cuenta del negocio, consulta también [video para restaurantes en Miami](/es/video-para-restaurantes-miami) y aclara ese uso antes de editar.",
        ],
      },
      {
        heading: "¿Cómo se identifican las visitas pagadas y las comidas de cortesía?",
        paragraphs: [
          "Dile a Esteban qué visitas son colaboraciones pagadas y en cuáles el local te ofreció la comida. La práctica publicada para creadores es incorporar esa información dentro del video, sin depender únicamente de una descripción que el público tenga que desplegar. Envía el contexto junto a los clips correspondientes, el nombre del restaurante y cualquier texto que ya hayas acordado. Así se tiene en cuenta desde el inicio de la edición.",
          "Al revisar el montaje, comprueba que el aviso se lea y acompañe la visita correcta. Revisa también los nombres del local y los platos, los subtítulos y tus comentarios sobre la experiencia. Si una carpeta mezcla visitas pagadas, invitaciones y comidas que pagaste tú, identifica cada una por separado. Esa distinción permite editar con información concreta y conservar lo que realmente quisiste recomendar.",
        ],
      },
      {
        heading: "¿Qué trabajos publicados puedes ver antes de consultar?",
        paragraphs: [
          "[Bar Door Monkey Miami](/es/portafolio/bar-door-monkey) es un video promocional de un restaurante de Miami, realizado en 2020 con videografía y edición. La pieza publicada dura 55 segundos. [ML Colombia](/es/portafolio/ml-colombia) es una pieza de contenido social de 24 segundos. Son una promoción de un local y un video social; no se presentan como una cuenta de recomendaciones de comida ni como resultados de un creador.",
          "Míralos pensando en tu propio material: el orden de las tomas, la relación entre personas y espacios y la información que cabe en una pieza corta. Señala qué partes quieres tomar como referencia y qué cambiarías para que el video se sienta tuyo. La consulta parte de trabajos que puedes ver y de tus grabaciones, sin atribuirles una audiencia o un resultado que no está documentado.",
        ],
      },
    ],
    faqs: [
      { question: "¿Puedes editar a distancia lo que grabé con el celular?", answer: `Sí. Envía los archivos originales, no videos descargados de una aplicación. Arranque cubre la edición remota: ${priceSentence("es", "arranque").toLowerCase()}. El formato, el volumen y los plazos se confirman para tu proyecto.` },
      { question: "¿El plan mensual incluye ir a grabar?", answer: "Crecimiento incluye plan de contenido, calendario, edición y reporte mensual. La grabación en locación se acuerda por separado, proyecto por proyecto, en Broward y Miami-Dade desde la base de Esteban en Fort Lauderdale." },
      { question: "¿Los ejemplos son de una cuenta de recomendaciones?", answer: "No. Bar Door Monkey Miami es una promoción de un local con videografía y edición; ML Colombia es una pieza social. Muestran trabajo publicado, no una cuenta de recomendaciones ni sus resultados." },
    ],
  },

  {
    slug: "diseno-web-fort-lauderdale",
    title: "Diseño Web y Chatbots en Fort Lauderdale",
    metadataTitle: "Diseño Web & Chatbots IA",
    description:
      "Diseño de páginas web de alta conversión, aplicaciones web personalizadas e integración de chatbots con IA en Fort Lauderdale y South Florida.",
    eyebrow: "Fort Lauderdale / Diseño Web e IA",
    h1: "Diseño Web y Chatbots con IA para Negocios en Fort Lauderdale.",
    lead:
      "Desarrollamos sitios web modernos de alta conversión y chatbots conversacionales de IA para empresas locales en Fort Lauderdale, Miami y Broward. Combina presencia web con automatización de clientes 24/7.",
    keyword: "diseño web fort lauderdale",
    location: "Fort Lauderdale / Broward / Miami",
    availability: "confirmed",
    icon: Laptop,
    bestFor: [
      "Negocios locales que buscan reemplazar su sitio web antiguo por un sistema moderno de ventas.",
      "Empresas y concesionarios que desean chatbots de IA para responder clientes 24/7.",
      "Marcas y marcas personales que requieren aplicaciones web interactivas.",
      "Equipos que prefieren atención directa y bilingüe en South Florida.",
    ],
    scopingQuestions: [
      "¿Cuál es el objetivo principal del nuevo sitio web (ventas, agenda, captura de leads)?",
      "¿Requiere un chatbot de IA para responder preguntas frecuentes o calificar prospectos?",
      "¿Dispones de logo, fotos y videos de marca o necesitas apoyo creativo?",
      "¿Qué plazo estimado tienes para el lanzamiento del proyecto?",
    ],
    projectFit:
      "Esta ruta conecta el desarrollo web de alta conversión con chatbots de IA y portafolio real comprobado (TitanForge, Geebs, Frontline Auto, FLAS).",
    faqs: [
      {
        question: "¿El sitio web incluye diseño adaptado a teléfonos móviles?",
        answer:
          "Sí. Todos nuestros sitios web se diseñan primero para dispositivos móviles (mobile-first) garantizando velocidad extrema y excelente experiencia de usuario.",
      },
      {
        question: "¿Cómo funciona el chatbot con IA en la página?",
        answer:
          "Integraciones con IA que responden preguntas frecuentes de tus clientes, califican prospectos y agendan citas automáticamente las 24 horas del día.",
      },
    ],
  },
  {
    slug: "videografo-en-miami",
    title: "Videógrafo en Miami",
    metadataTitle: "Videógrafo en Miami",
    description:
      "Información sobre edición y producción selectiva de video por proyecto en Miami-Dade, con atención principal en español.",
    eyebrow: "Miami-Dade / atención en español",
    h1: "Video en Miami-Dade, definido proyecto por proyecto.",
    lead:
      "Esteban tiene proyectos publicados y verificables realizados en Miami. Para una nueva idea en locación, la disponibilidad y el alcance se conversan de forma individual según [Fort Lauderdale como base, tres condados como área de servicio](/es/areas); la atención es principalmente en español y su inglés es intermedio.",
    keyword: "videógrafo en Miami",
    location: "Miami-Dade",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Negocios con material existente que quieren conversar sobre edición.",
      "Equipos que evalúan una producción de video en locación definida de forma selectiva.",
      "Marcas que prefieren explicar la meta y las referencias en español.",
      "Personas que quieren revisar prueba publicada de proyectos reales en Miami.",
    ],
    scopingQuestions: [
      "¿Ya existe material grabado o la idea requiere una captura nueva?",
      "¿Qué debe comunicar el contenido y dónde se publicará?",
      "¿La locación está dentro de Miami-Dade?",
      "¿Qué disponibilidad, formatos y alcance deben confirmarse para este proyecto?",
    ],
    projectFit:
      "Esta página reúne la edición y la producción selectiva en Miami con trabajos publicados. Para edición de video corto con material existente, consulta con un [editor de Reels en Miami](/es/editor-de-reels-miami). No promete disponibilidad, formatos ni un alcance universal.",
    sectionsHeading: "Antes de contratar un videógrafo cerca de ti",
    sections: [
      {
        // Row 72 (2026-10-14): autocomplete "videografo cerca de mi".
        heading: "¿Cómo encontrar un videógrafo cerca de mí en Miami?",
        paragraphs: [
          `Si buscas un videógrafo cerca de mí en Miami, ten en cuenta que Esteban Moreno Media tiene su base en Fort Lauderdale y toma proyectos en Miami-Dade de forma seleccionada: la disponibilidad de cada locación se confirma al consultar. Hay trabajo publicado grabado en Miami, como el video de [Bar Door Monkey](/es/portafolio/bar-door-monkey), para que veas el estilo antes de escribir.`,
          `La grabación en locación es un servicio pagado, ${filmingHourlyText("es")}, con alcance y cotización por proyecto, y un día de producción en tu negocio va ${priceSentence("es", "presencia-local").toLowerCase()}. Si ya tienes el material, la distancia no importa: la edición es remota, en español primero, y parte del paquete Arranque, ${esShortForm}. Para videos cortos con tus clips, mira el [editor de Reels en Miami](/es/editor-de-reels-miami).`,
        ],
      },
      {
        heading: "¿Cómo se prepara una jornada larga de grabación?",
        paragraphs: [
          "Para una conferencia, una cena o un evento de varias horas, la cotización debe nombrar la ventana de cobertura, los momentos prioritarios, el acceso y los videos finales. Eso evita convertir una jornada larga en una promesa poco clara de grabar cada minuto o a cada invitado.",
          "Antes de reservar, comparte la fecha, la locación, el horario de inicio y cierre, las reglas de acceso, qué partes del evento deben aparecer y si además necesitas edición. La grabación y los entregables se definen por separado, con pausas y cambios de agenda considerados, para que el alcance se entienda antes del día del evento.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Esteban trabaja en español?",
        answer:
          "Sí. El español es su idioma principal y también puede mantener comunicación de trabajo en inglés intermedio.",
      },
      {
        question: "¿Cubre todo Miami-Dade?",
        answer:
          "Miami-Dade es un mercado de proyectos seleccionados. No se publica una lista de ciudades o vecindarios; la disponibilidad de cada locación se confirma al consultar.",
      },
    ],
  },
  {
    slug: "videografo-en-fort-lauderdale",
    title: "Videógrafo en Fort Lauderdale",
    metadataTitle: "Videógrafo en Fort Lauderdale",
    description:
      "Información sobre edición y producción selectiva de video por proyecto desde Fort Lauderdale para Broward County.",
    eyebrow: "Fort Lauderdale / Broward County",
    h1: "Video desde Fort Lauderdale, con alcance definido por proyecto.",
    lead:
      "Fort Lauderdale es la base de Esteban Moreno Media. La edición, la planificación y la producción local de video son sus servicios principales; cada idea en locación se considera de forma selectiva dentro de [tres condados como área de servicio](/es/areas).",
    keyword: "videógrafo en Fort Lauderdale",
    location: "Fort Lauderdale",
    availability: "confirmed",
    icon: MapPin,
    bestFor: [
      "Negocios de Broward que quieren explicar una meta de video en español.",
      "Emprendedores con material existente para una posible edición.",
      "Equipos que evalúan si una captura local encaja con el proyecto.",
      "Personas que quieren revisar primero el portafolio publicado.",
    ],
    scopingQuestions: [
      "¿El proyecto parte de archivos existentes o de una idea para grabar?",
      "¿Qué necesita entender la audiencia?",
      "¿Qué tipo de locación estaría involucrada?",
      "¿Qué disponibilidad, uso y necesidades de formato deben confirmarse?",
    ],
    projectFit:
      "Esta ruta explica la base local y ayuda a preparar una consulta sobre edición o producción selectiva. Si ya tienes material grabado y buscas optimizarlo para redes, consulta como [editor de Reels en Fort Lauderdale](/es/editor-de-reels-fort-lauderdale). El alcance se confirma para cada proyecto.",
    sectionsHeading: "Antes de contratar un videógrafo cerca de ti",
    sections: [
      {
        // Row 72 (2026-10-14): autocomplete "videografo cerca de mi"; no page said "cerca de".
        heading: "¿Cómo encontrar un videógrafo cerca de mí en Fort Lauderdale?",
        paragraphs: [
          `Si buscas un videógrafo cerca de mí desde Fort Lauderdale o Broward, Esteban Moreno Media tiene aquí su base y atiende en español primero, con inglés intermedio. No hay un estudio abierto al público: la grabación se hace en tu negocio o en la locación del proyecto, como servicio pagado con alcance y cotización por proyecto, ${filmingHourlyText("es")}. Un día de producción en tu negocio, con preproducción, grabación y edición, va ${priceSentence("es", "presencia-local").toLowerCase()}.`,
          `Antes de contratar a un videógrafo cercano conviene confirmar tres cosas: si el material que ya tienes alcanza para editar sin grabar de nuevo, quién se queda con los archivos originales y cuántas rondas de cambios incluye la edición. Si ya tienes clips, la edición es remota y parte del paquete Arranque, ${esShortForm}; para videos cortos, mira el [editor de Reels en Fort Lauderdale](/es/editor-de-reels-fort-lauderdale).`,
        ],
      },
    ],
    faqs: [
      {
        question: "¿Fort Lauderdale es la base principal?",
        answer:
          "Sí. Fort Lauderdale y Broward son la base local; Miami-Dade es un mercado seleccionado y Palm Beach County sigue siendo un área de expansión.",
      },
      {
        question: "¿La producción en locación está disponible para cualquier idea?",
        answer:
          "No se publica una disponibilidad universal. La producción local se considera de forma selectiva después de conocer la meta, la locación y las necesidades de captura.",
      },
    ],
  },
  {
    slug: "fotografo-en-fort-lauderdale",
    title: "Fotógrafo en Fort Lauderdale",
    metadataTitle: "Fotógrafo en Fort Lauderdale",
    description:
      "Fotografía comercial y de producto en Fort Lauderdale con Esteban Moreno Media. Cuéntanos qué necesitas fotografiar para definir el alcance.",
    eyebrow: "Fort Lauderdale / fotografía comercial",
    h1: "Fotografía comercial en Fort Lauderdale, según tu proyecto.",
    lead:
      "Esteban ofrece fotografía, incluida fotografía de producto. Comparte qué necesitas mostrar, dónde será la sesión y cómo usarás las imágenes para definir la producción y recibir una propuesta.",
    keyword: "fotógrafo en Fort Lauderdale",
    location: "Fort Lauderdale / Broward County",
    availability: "confirmed",
    icon: Camera,
    bestFor: [
      "Negocios que necesitan fotografías reales de sus productos.",
      "Marcas que quieren definir imágenes para su sitio y redes.",
      "Equipos que prefieren explicar su proyecto en español.",
      "Personas que quieren consultar alcance y uso antes de contratar.",
    ],
    scopingQuestions: [
      "¿Qué producto o aspecto de tu negocio necesitas fotografiar?",
      "¿Dónde se realizaría la sesión y cuándo necesitas las imágenes?",
      "¿Dónde se publicarán las fotos y qué formatos necesitas?",
      "¿Tienes ejemplos del estilo visual que buscas?",
    ],
    projectFit:
      "Cuéntanos qué se va a fotografiar, dónde y para qué usarás las imágenes. Esteban confirmará las tomas, los archivos finales y el presupuesto antes de agendar la sesión. Para fotos del producto físico, mira la [fotografía de producto en Miami](/es/fotografia-de-producto-miami); para videos cortos con tus clips, el [editor de Reels en Fort Lauderdale](/es/editor-de-reels-fort-lauderdale).",
    faqs: [
      {
        question: "¿Se puede reservar fotografía con Esteban?",
        answer:
          "Sí puedes consultar un proyecto de fotografía. Envía qué necesitas fotografiar, la locación, el uso previsto y las fechas; Esteban confirmará el alcance y la disponibilidad antes de cotizar.",
      },
      {
        question: "¿Dónde puedo ver ejemplos de fotografía?",
        answer:
          "El portafolio público muestra principalmente video y diseño. Si necesitas comprobar experiencia fotográfica antes de contratar, pide ejemplos disponibles durante la consulta.",
      },
    ],
  },
  {
    slug: "reels-para-negocios-miami",
    title: "Reels para negocios en Miami",
    metadataTitle: "Reels para Negocios en Miami",
    description:
      "Información sobre edición y producción selectiva de video corto para negocios de Miami-Dade, con atención principal en español.",
    eyebrow: "Instagram / TikTok / Shorts",
    h1: "Reels para negocios de Miami-Dade, con alcance por proyecto.",
    lead:
      "La edición de video corto es uno de los servicios principales de Esteban. Si una idea requiere grabación en Miami-Dade, la producción se considera de forma selectiva después de conocer la meta y la locación dentro de las [áreas de servicio](/es/areas).",
    keyword: "reels para negocios Miami",
    location: "Miami-Dade",
    availability: "confirmed",
    icon: Scissors,
    bestFor: [
      "Negocios con clips existentes que quieren explorar una edición.",
      "Marcas que necesitan pensar qué comunicar en video corto.",
      "Equipos latinos que prefieren una conversación de alcance en español.",
      "Proyectos que podrían requerir una captura local seleccionada.",
    ],
    scopingQuestions: [
      "¿Qué debe entender la audiencia en el video?",
      "¿Qué material ya está disponible?",
      "¿Dónde se publicaría el contenido?",
      "¿Qué formato, disponibilidad y alcance deben confirmarse?",
    ],
    projectFit:
      "Esta ruta ayuda a preparar una conversación sobre edición o captura selectiva de video corto. Si buscas un servicio directo de edición para tus grabaciones, consulta como [editor de Reels en Miami](/es/editor-de-reels-miami). No fija duración, cantidad, formato ni fecha de entrega. Si ya tienes clips y tu negocio está en Broward, el [editor de Reels en Fort Lauderdale](/es/editor-de-reels-fort-lauderdale) los convierte en videos cortos con subtítulos.",
    sections: [
      {
        heading: "Estructura de video corto para captar atención en Miami",
        paragraphs: [
          "En el mercado comercial de Miami-Dade, donde la atención en plataformas como Instagram, TikTok y YouTube Shorts es inmediata, un Reel efectivo no intenta resumir toda la historia de una empresa en 30 segundos. Cada video funciona mejor cuando se enfoca en un solo mensaje claro: resolver una duda puntual, demostrar el funcionamiento de un producto o presentar la experiencia que vive un cliente.",
          "Los primeros 2 a 3 segundos determinan si el usuario continúa viendo o desliza hacia la siguiente publicación. Por eso la edición prioriza ganchos visuales y verbales directos: mostrar el resultado final al inicio, formular una pregunta frecuente de clientes locales o iniciar con una acción dinámica que contextualice el negocio de inmediato.",
        ],
        bullets: [
          "Un solo beneficio, servicio o duda clave por cada pieza de video",
          "Gancho visual o verbal directo en los primeros 2 a 3 segundos",
          "Ritmo ágil con cortes y transiciones limpias cada 2 a 4 segundos",
          "Cierre con llamado a la acción concreto (visitar el local, enviar un mensaje o consultar el perfil)",
        ],
      },
      {
        heading: "Criterios técnicos: encuadre 9:16, zonas seguras y subtítulos dinámicos",
        paragraphs: [
          "El formato estándar para Reels y videos verticales es una resolución de 1080×1920 píxeles con una relación de aspecto 9:16. Sin embargo, las interfaces de Instagram y TikTok colocan botones de interacción (me gusta, comentarios, compartir) en el lateral derecho y la descripción con el audio en la franja inferior. Si los elementos clave o los subtítulos se ubican en esas áreas, la interfaz los oculta.",
          "Una postproducción cuidada mantiene los textos principales, logotipos y subtítulos dentro de la zona segura central (Safe Zone). Además, dado que gran parte de los usuarios reproduce videos en dispositivos móviles con el audio silenciado, la inclusión de subtítulos dinámicos y legibles asegura que el mensaje se transmita con claridad en cualquier contexto. Consulta nuestra [guía de formatos y zonas seguras](/es/guias/video-vertical-horizontal-y-zonas-seguras) para conocer los márgenes recomendados.",
        ],
        bullets: [
          "Exportación en 1080×1920 (9:16) con compresión optimizada para redes móviles",
          "Respeto estricto de márgenes de seguridad para evitar solapamientos con la interfaz",
          "Subtitulado dinámico con tipografía legible y contraste sobre el fondo",
          "Ecualización y limpieza de voz para una escucha nítida en altavoces de teléfono",
        ],
      },
      {
        heading: "Flujo de postproducción remota y material existente",
        paragraphs: [
          "Muchas empresas de Miami ya cuentan con grabaciones realizadas con teléfonos inteligentes o cámaras propias en sus locales, eventos o demostraciones. A través de un flujo de postproducción remota, ese material se selecciona, recorta y transforma en piezas ágiles listas para publicar en redes sociales.",
          "El proceso inicia reuniendo los archivos de video en una carpeta compartida en la nube junto con una breve nota sobre el objetivo comercial de cada clip. Si quieres preparar tus archivos antes de enviarlos, revisa la [guía de entrega para edición remota](/es/guias/entrega-para-edicion-remota-de-video).",
        ],
        bullets: [
          "Selección de las mejores tomas y eliminación de silencios o pausas innecesarias",
          "Corrección básica de color para unificar clips grabados en distintos momentos",
          "Integración de identidad visual (paleta de colores, logotipo y estilo tipográfico)",
          "Preparación de versiones adaptadas para Instagram Reels, TikTok y YouTube Shorts",
        ],
      },
      {
        heading: "Producción selectiva en Miami-Dade y enfoque bilingüe",
        paragraphs: [
          "Cuando un proyecto requiere captura de tomas nuevas en locación dentro del condado de Miami-Dade, la producción se evalúa de forma selectiva considerando la locación, el tipo de negocio y la planificación del contenido dentro de las [áreas de servicio](/es/areas).",
          "En un entorno multicultural como el sur de la Florida, la comunicación directa en español facilita definir el tono, los ganchos y el estilo de cada video sin barreras de idioma, adaptando el contenido para audiencias hispanas o bilingües de la región.",
        ],
        bullets: [
          "Planificación de tomas en locación según el tipo de producto, local o servicio",
          "Comunicación fluida y directa en español durante todo el proceso de consulta y revisión",
          "Coordinación de cortes para audiencias hispanohablantes o bilingües en South Florida",
          "Enlace con proyectos reales del portafolio como [Bar Door Monkey Miami](/es/portafolio/bar-door-monkey) y [ML Colombia](/es/portafolio/ml-colombia)",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Puedo pedir solo edición de reels si ya tengo los videos grabados?",
        answer:
          "Sí. La edición de video con material existente es uno de los servicios principales de Esteban. Puedes enviar tus grabaciones en vertical u horizontal a través de almacenamiento en la nube, y el alcance de edición, subtítulos y formato se define para cada proyecto.",
      },
      {
        question: "¿Qué formato y resolución se entregan los Reels?",
        answer:
          "Los videos se entregan en formato vertical 9:16 (1080×1920 px en MP4), respetando las zonas seguras de Instagram, TikTok y YouTube Shorts para que ningún texto o subtítulo quede tapado por botones de la plataforma.",
      },
      {
        question: "¿Los reels pueden ser bilingües o incluir subtítulos?",
        answer:
          "El español es el idioma principal de atención de Esteban y cuenta con inglés intermedio. Se pueden incorporar subtítulos dinámicos en español, inglés o versiones adaptadas según las necesidades de la audiencia del negocio en Miami.",
      },
      {
        question: "¿Se realiza grabación en locación para Reels en Miami-Dade?",
        answer:
          "La edición remota con material suministrado es el servicio prioritario confirmado. Si un proyecto en Miami-Dade necesita grabación en locación, la producción se evalúa de manera selectiva analizando el tipo de negocio, la locación y el alcance requerido.",
      },
      {
        question: "¿Qué tipo de videos cortos funcionan mejor para empresas locales en Miami?",
        answer:
          "Los formatos más efectivos para negocios locales son demostraciones breves de servicios o productos, respuestas directas a preguntas frecuentes de clientes, recorridos de instalaciones o locales comerciales, y clips testimoniales enfocados en un solo mensaje claro.",
      },
      {
        question: "¿Cómo se envían los archivos para comenzar un proyecto de edición?",
        answer:
          "Los archivos crudos se comparten mediante enlaces de servicios en la nube (como Google Drive o Dropbox), acompañados de notas sobre el objetivo del video y las referencias deseadas.",
      },
    ],
  },
  {
    slug: "video-para-restaurantes-miami",
    title: "Video para restaurantes en Miami",
    metadataTitle: "Video para Restaurantes en Miami",
    // SNIPPET TEST 2026-10-07 (GSC: video para restaurantes miami, 7 impr, pos 6.9, 0 clicks). Read GSC after 2026-11-10; if still 0 clicks, revert rather than iterate.
    description:
      "Edición de Reels y videos promocionales para restaurantes de Miami y South Florida: platos estrella, ambiente del salón y promociones. Atención en español.",
    eyebrow: "Restaurantes / comida / hospitality",
    h1: "Video para restaurantes en Miami: edición de reels y promociones.",
    lead:
      `¿Ya tienes clips? Un proyecto promocional para tu restaurante, con alcance y cotización a la medida de tu local, va desde ${usd(RESTAURANT_PROMO.from)}. ¿Solo necesitas un reel editado con tus propios clips? Es ${usd(SHORT_FORM.perVideoFrom)} por video (paquete Arranque). ¿Necesitas video nuevo? Consulta por grabación selectiva. ¿También necesitas fotos reales? Cuéntanos qué, dónde y para qué: la sesión se cotiza por separado.`,
    keyword: "video para restaurantes Miami",
    location: "Miami / South Florida",
    availability: "confirmed",
    icon: UtensilsCrossed,
    bestFor: [
      "Restaurantes con material existente que necesita edición profesional.",
      "Restaurantes que necesitan fotos reales y quieren definir una sesión por separado.",
      "Dueños que quieren definir la meta antes de producir contenido nuevo.",
      "Equipos que prefieren explicar el proyecto en español.",
      "Ideas que requieren una captura local definida por proyecto en South Florida.",
    ],
    scopingQuestions: [
      "¿Qué aspecto del restaurante necesita comunicar el video?",
      "¿Ya existe material grabado en cocina o salón?",
      "¿En qué ciudad de South Florida se necesita la grabación?",
      "¿Qué uso, formato y disponibilidad deben confirmarse?",
    ],
    projectFit:
      "¿Ya tienes clips? Pide edición de Reels. ¿Necesitas tomas nuevas en el local? Consulta por grabación selectiva. ¿Necesitas imágenes fijas reales de platos o del espacio? Describe las fotos y la locación para definir una sesión de [fotografía](/es/fotografo-en-fort-lauderdale) por separado. Para planear el video, consulta la [guía de ideas para restaurantes](/es/guias/ideas-de-contenido-de-video-para-restaurantes) y los [Reels para negocios](/es/reels-para-negocios-miami).",
    sections: [
      {
        heading: "Estrategia de video gastronómico y dinámicas de restaurantes en Miami",
        paragraphs: [
          "Si publicas recomendaciones desde tu propia cuenta, consulta la [edición para creadores de comida y lugares](/es/edicion-de-video-para-creadores-de-comida-y-lugares-miami).",
          "Un restaurante de Miami-Dade puede centrar cada video en un plato, una bebida, la preparación o el ambiente del salón. Ese enfoque ayuda a que la persona entienda qué se ofrece sin intentar mostrar todo el menú en una sola pieza. Antes de editar, indica el nombre correcto del plato, dónde se publicará el video y qué quieres que haga la persona después de verlo.",
          "Las tomas de ingredientes, manos, emplatado y servicio pueden ordenarse según el material que ya tengas. Si todavía vas a grabar, la [guía de ideas de video para restaurantes](/es/guias/ideas-de-contenido-de-video-para-restaurantes) ayuda a preparar una lista breve de escenas. Conoce proyectos reales en el sector gastronómico como [Juanchis Burguer](/es/portafolio/juanchis-burguer) (edición de video para hamburguesería artesanal), [Portosole](/es/portafolio/portosole) (ambiente y cocina de restaurante italiano) y [Bar Door Monkey Miami](/es/portafolio/bar-door-monkey); no se les atribuyen reservas ni ventas directas.",
        ],
        bullets: [
          "Enfoque en 1 o 2 platos insignia con primeros planos de emplatado y texturas",
          "Gancho sensorial directo en los primeros 2 a 3 segundos (humo, crujido, salsas)",
          "Captura del ambiente real y energía del salón en horas de servicio o brunch",
          "Llamado a la acción claro para reservas, visitas al local o pedidos directos",
        ],
      },
      {
        heading: "Criterios técnicos: planos detalle de cocina, ritmo ágil y zonas seguras 9:16",
        paragraphs: [
          "La postproducción de video gastronómico exige un cuidado meticuloso del color, el ritmo y el audio. Una correcta corrección de color resalta la frescura y calidez natural de los alimentos sin saturaciones artificiales que distorsionen el plato. Asimismo, el diseño sonoro —capturando el sonido del chisporroteo, el brindis de copas y el bullicio acogedor— transforma un clip ordinario en una experiencia sensorial inmersiva.",
          "En el formato vertical 1080×1920 (9:16), es fundamental respetar las zonas seguras centrales para que los textos, nombres de platillos y precios no queden cubiertos por los botones de interacción de Instagram o TikTok. Consulta nuestra [guía de formatos y zonas seguras](/es/guias/video-vertical-horizontal-y-zonas-seguras) para detalles técnicos de exportación.",
        ],
        bullets: [
          "Resolución vertical 1080×1920 (9:16) con compresión optimizada para carga rápida móvil",
          "Corrección de color realista que potencia el apetito y la frescura de los ingredientes",
          "Respeto riguroso de zonas seguras evitando solapamiento con botones de redes sociales",
          "Diseño sonoro limpio con ecualización de audio ambiente y efectos de cocina",
        ],
      },
      {
        heading: "Flujo de postproducción remota con material propio del restaurante",
        paragraphs: [
          "Si ya grabaste con teléfono o cámara durante la preparación, el servicio o un evento, puedes pedir edición remota. Esteban selecciona las tomas útiles y acuerda contigo ritmo, texto, color y formatos según el material disponible. No necesitas contratar un rodaje para consultar por una edición.",
          "El proceso comienza reuniendo los clips en una carpeta de Google Drive o Dropbox y compartiendo las prioridades del local. Para organizar tus archivos antes de enviarlos, revisa nuestra [guía de entrega para edición remota de video](/es/guias/entrega-para-edicion-remota-de-video).",
        ],
        bullets: [
          "Recepción de archivos crudos organizados por plato, evento o turno de servicio",
          "Edición dinámica y recorte de pausas para maximizar el ritmo y la atención",
          "Integración de logotipo, tipografía de marca y paleta cromática del restaurante",
          "Entrega de versiones listas para publicar en Instagram Reels, TikTok y YouTube Shorts",
        ],
      },
      {
        heading: "Captura selectiva en locación en Miami-Dade y atención directa en español",
        paragraphs: [
          "Cuando un restaurante en Miami requiere tomas nuevas en locación, la producción se evalúa de manera selectiva analizando la disponibilidad, el horario de cocina y el alcance del rodaje dentro de las [áreas de servicio](/es/areas). Grabar durante horas de preparación matutina o justo antes del servicio permite capturar al chef y los ingredientes con iluminación controlada sin interrumpir la operación del restaurante.",
          "Contar con atención directa en español facilita coordinar con el equipo de cocina y gerencia de forma rápida y fluida en el sur de la Florida. Conoce nuestro trabajo publicado en el sector con [Juanchis Burguer](/es/portafolio/juanchis-burguer), [Portosole](/es/portafolio/portosole) y [Bar Door Monkey Miami](/es/portafolio/bar-door-monkey), y explora también opciones complementarias como [fotografía de comida asistida por IA](/es/fotografia-de-comida-con-ia-restaurantes).",
        ],
        bullets: [
          "Coordinación de rodaje en cocina y salón adaptada a la dinámica del restaurante",
          "Planificación de lista de tomas (shot list) para optimizar el tiempo del chef y staff",
          "Atención directa y fluida en español para restaurantes del sur de la Florida",
          "Respaldo en proyectos reales verificados como [Juanchis Burguer](/es/portafolio/juanchis-burguer), [Portosole](/es/portafolio/portosole) y [Bar Door Monkey Miami](/es/portafolio/bar-door-monkey)",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Puedo solicitar solo edición de video si ya grabamos material en la cocina o el salón?",
        answer:
          "Sí. La edición de video con material existente suministrado por el restaurante es un servicio prioritario confirmado. Puedes transferir tus grabaciones verticales u horizontales por la nube y realizamos la selección, ritmo, color, subtítulos y música para entrega en redes sociales.",
      },
      {
        question: "¿Qué tipo de videos funcionan mejor para atraer comensales en redes sociales en Miami?",
        answer:
          "Los formatos con mejor rendimiento en Miami son los clips de 15 a 30 segundos enfocados en el gancho sensorial de un plato estrella (humo, corte, queso derretido), recorridos de ambiente durante cenas o brunch de fin de semana, y videos breves del chef explicando el concepto o la recomendación de la casa.",
      },
      {
        question: "¿Se puede coordinar grabación en locación dentro de Miami-Dade?",
        answer:
          "La grabación en locación se evalúa de forma selectiva según el tipo de restaurante, la locación en Miami-Dade y el cronograma operativo del negocio. Se planifica en horarios convenientes para no interferir con el servicio a clientes.",
      },
      {
        question: "¿Los videos se entregan optimizados con subtítulos y formato vertical 9:16?",
        answer:
          "Sí. Todos los videos se entregan en formato vertical 1080×1920 (9:16) listos para Instagram Reels, TikTok y YouTube Shorts, respetando las zonas seguras para que los textos no queden cubiertos por botones de la interfaz.",
      },
      {
        question: "¿Cómo se coordinan las consultas y revisiones del proyecto?",
        answer:
          "Esteban atiende principalmente en español con nivel intermedio de inglés. Las consultas se inician compartiendo el objetivo del restaurante, el material disponible y la ubicación, lo que permite evaluar el alcance de forma clara y sin demoras.",
      },
      {
        question: "¿Esta página ofrece fotografía de alimentos o sesiones fotográficas?",
        answer:
          "Esteban ofrece fotografía. Si necesitas fotos reales de platos, bebidas o del local además del video, describe la locación, las tomas y el uso previsto para confirmar el alcance y la disponibilidad de la sesión por separado. Consulta [fotografía en Fort Lauderdale](/es/fotografo-en-fort-lauderdale); el video publicado de Bar Door Monkey no se presenta como muestra de fotos.",
      },
      {
        question: "¿Cuánto cuesta la edición o producción de video para restaurantes en Miami?",
        answer:
          `La edición de un Reel individual con material propio suministrado por el restaurante parte desde ${usd(SHORT_FORM.perVideoFrom)} dentro del paquete Arranque, o desde ${usd(RESTAURANT_PROMO.from)} por proyecto promocional completo. Si se requiere filmación selectiva en cocina o salón, se cotiza según las horas de rodaje y la locación en Miami-Dade.`,
      },
      {
        question: "¿Cuál es el tiempo de entrega de un Reel gastronómico?",
        answer:
          "La primera entrega de un Reel editado con material del cliente se realiza habitualmente en 48 horas hábiles tras recibir los archivos en la nube, lo que permite anunciar platos de temporada, menús especiales y eventos sin retrasos.",
      },
    ],
  },
  {
    slug: "drone-real-estate-miami",
    title: "Drone para real estate en Miami",
    metadataTitle: "Drone para Real Estate en Miami",
    description:
      "Ruta educativa heredada sobre drone para real estate en Miami-Dade. El trabajo aéreo no se publica actualmente como servicio confirmado.",
    eyebrow: "Ruta heredada / confirmación pendiente",
    h1: "Drone para real estate en Miami: disponibilidad pendiente de confirmación.",
    lead:
      "Esta URL se conserva para evitar confusión y explicar el estado real: la disponibilidad de trabajo con drone sigue pendiente de confirmación con Esteban. La página no ofrece vuelo, piloto, equipo ni tomas aéreas.",
    keyword: "drone real estate Miami",
    location: "Miami-Dade",
    availability: "pending-confirmation",
    icon: Home,
    bestFor: [
      "Entender por qué esta ruta heredada continúa publicada.",
      "Distinguir producción de video verificada de una muestra aérea.",
      "Revisar servicios actuales como edición y producción selectiva en tierra.",
      "Preparar preguntas para una futura confirmación de disponibilidad.",
    ],
    scopingQuestions: [
      "¿El trabajo con drone forma parte de los servicios actuales? Aún está pendiente de confirmación.",
      "¿El portafolio publicado incluye una muestra aérea? No se presenta ninguna como tal.",
      "¿Qué alternativas sí están confirmadas? Edición y producción selectiva de video en locación.",
      "¿Cómo consultar sin asumir disponibilidad? Describe la meta y pregunta por los servicios actuales.",
    ],
    projectFit:
      "Es un recurso de transparencia, no una página de reserva. Mantiene la ruta mientras Esteban confirma si el trabajo aéreo debe ofrecerse públicamente.",
    faqs: [
      {
        question: "¿Se puede reservar un vuelo con drone?",
        answer:
          "No se publica actualmente como servicio confirmado. La disponibilidad de trabajo aéreo sigue pendiente de una respuesta directa de Esteban.",
      },
      {
        question: "¿Los proyectos relacionados prueban trabajo aéreo o de real estate?",
        answer:
          "No. Los enlaces relacionados verifican producción y edición; no se presentan como vuelos con drone ni como proyectos de real estate.",
      },
    ],
  },
  {
    slug: "editor-de-video-real-estate-miami",
    title: "Editor de video para real estate en Miami",
    metadataTitle: "Editor de Video Real Estate en Miami",
    description:
      "Información sobre edición remota y producción selectiva de video para agentes inmobiliarios y marcas de real estate en South Florida.",
    eyebrow: "Real Estate / Bienes Raíces",
    h1: "Edición de video y Reels para real estate en South Florida.",
    lead:
      "La edición de video y contenido para redes es uno de los servicios principales de Esteban. Ayudamos a agentes y agencias inmobiliarias a estructurar recorridos y videos de propiedades a partir de su material grabado en nuestras [áreas de servicio](/es/areas).",
    keyword: "editor de video para real estate",
    location: "South Florida / Miami-Dade / Broward",
    availability: "confirmed",
    icon: Home,
    bestFor: [
      "Agentes de bienes raíces con tomas de propiedades listas para editar.",
      "Inmobiliarias que buscan publicar Reels y recorridos verticales con consistencia.",
      "Equipos que prefieren comunicar requerimientos y edición en español.",
      "Proyectos que requieren postproducción remota estructurada.",
    ],
    scopingQuestions: [
      "¿Ya tienes las tomas de la propiedad grabadas?",
      "¿Qué formato y canal de publicación necesitas (Reels 9:16, YouTube 16:9)?",
      "¿Requieres subtítulos, gráficos de marca o música de fondo?",
      "¿Cuál es la fecha límite para la publicación del inmueble?",
    ],
    projectFit:
      "Esta ruta conecta prioridades de edición remota con trabajo publicado de bienes raíces. No garantiza vuelos con drone ni tomas aéreas a menos que se confirmen de forma independiente.",
    sections: [
      {
        heading: "¿Qué dos cosas detienen una grabación inmobiliaria en South Florida?",
        paragraphs: [
          "Casi todo el inventario de South Florida está en un edificio que controla alguien más, y buena parte queda bajo espacio aéreo controlado. Un condominio o HOA normalmente tiene que aprobar la grabación en áreas comunes, y varios edificios piden un certificado de seguro antes de que entre una cámara al lobby. Aparte, Fort Lauderdale, Miami y Opa-locka dejan gran parte del condado en espacio aéreo controlado, donde volar un dron exige autorización de la FAA por LAANC y no solo un piloto con licencia.",
        ],
        bullets: [
          "Pregunta por el permiso de grabación y el certificado de seguro al firmar el listing",
          "Revisa el espacio aéreo contra la dirección antes de prometer una toma aérea",
          "Ten una apertura a nivel de piso que funcione si el dron no vuela",
        ],
      },
      {
        heading: "¿Por qué sacar dos cortes, en español y en inglés, de una sola grabación?",
        paragraphs: [
          "Un reel subtitulado solo en inglés le pide a una parte grande del comprador de South Florida más esfuerzo del que va a hacer. La versión económica no es una segunda grabación: es el mismo material con una segunda pista de subtítulos y un gancho pensado en español, porque la primera línea decide si se ve el resto. Cuando el agente habla español, un fragmento corto a cámara en español suele rendir más que un subtítulo traducido sobre audio en inglés.",
        ],
      },
      {
        heading: "¿Por qué hace falta un corte para el MLS y otro para redes?",
        paragraphs: [
          "Las reglas del material que se sindica por el MLS cambian según el MLS, y varios restringen la marca del agente, sus datos de contacto o llamados a la acción dentro del video del listing. Lo práctico son dos exportaciones de la misma edición: un corte sin marca para el listing y un corte con marca para redes. Decidirlo antes de editar evita reexportar una tanda completa después. Y en el contenido de vecindario conviene describir el lugar — amenidades, distancias, lo que físicamente hay — y no a la gente que vive ahí: la publicidad inmobiliaria está sujeta a las reglas de vivienda justa.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Se incluye edición para Instagram Reels y TikTok?",
        answer:
          "Sí. Editamos material en formato vertical 9:16 optimizado para Reels, Shorts y TikTok con subtítulos legibles y cortes dinámicos.",
      },
      {
        question: "¿Esta página incluye tomas con drone?",
        answer:
          "No. El servicio aéreo sigue pendiente de confirmación. Esta página se enfoca en edición remota de video para bienes raíces.",
      },
    ],
  },
  {
    slug: "fotografia-de-producto-con-ia-miami",
    title: "Fotografía de producto con IA en Miami",
    metadataTitle: "Fotos de Producto con IA en Miami",
    description:
      "Creación de imágenes de producto e integraciones visuales asistidas por IA para marcas de e-commerce y negocios en Miami y Fort Lauderdale.",
    eyebrow: "Imágenes con IA / E-Commerce",
    h1: "Fotografía de producto e imágenes de marca asistidas por IA.",
    lead:
      "El desarrollo de contenido con IA es un servicio confirmado de Esteban. Ayudamos a marcas de e-commerce y tiendas locales a generar fondos, entornos y mockups de producto de alto impacto a partir de fotos de referencia reales.",
    keyword: "fotografía de producto con IA",
    location: "Miami-Dade / Fort Lauderdale / Broward",
    availability: "confirmed",
    icon: WandSparkles,
    bestFor: [
      "Marcas de e-commerce que necesitan imágenes de catálogo y catálogo de producto.",
      "Emprendedores que buscan fondos de estilo de vida sin alquilar estudios costosos.",
      "Tiendas que prefieren coordinar requerimientos creativos en español.",
      "Proyectos visuales que requieren conceptos publicitarios modernos.",
    ],
    scopingQuestions: [
      "¿Tienes fotos originales del producto con buena resolución?",
      "¿Qué tipo de fondo o ambiente deseas generar con IA?",
      "¿En qué canales se utilizarán las imágenes (sitio web, Amazon, redes)?",
      "¿Qué estilo o paleta de colores representa tu marca?",
    ],
    projectFit:
      "Esta ruta explica el servicio de imágenes con IA combinando fotos reales del producto con generación asistida. No promete sesiones de fotografía tradicional en estudio a menos que se acuerden. Si necesitas fotografiar el producto físico, mira la [fotografía de producto en Miami](/es/fotografia-de-producto-miami).",
    faqs: [
      {
        question: "¿Las imágenes con IA parecen reales?",
        answer:
          "Sí. Trabajamos utilizando fotos reales de tu producto como base para asegurar que el logo, los colores y las proporciones se mantengan exactos.",
      },
      {
        question: "¿Sirve para tiendas de Amazon o Shopify?",
        answer:
          "Totalmente. Creamos fondos de estilo de vida y mockups limpios optimizados para listados de e-commerce y publicidad digital.",
      },
    ],
  },
  {
    slug: "imagenes-con-ia-para-ecommerce-miami",
    title: "Imágenes con IA para e-commerce en Miami",
    metadataTitle: "Imágenes con IA para E-Commerce",
    description:
      "Generación de piezas visuales y mockups con IA para tiendas en línea, marcas direct-to-consumer y vendedores en South Florida.",
    eyebrow: "E-Commerce / Branding",
    h1: "Imágenes y gráficos con IA para tiendas en línea en South Florida.",
    lead:
      "Optimizamos la presencia visual de tiendas en línea mediante la edición y composición de imágenes con IA. Transforma tomas simples de producto en fotos de estilo de vida listas para publicar.",
    keyword: "imágenes con IA para e-commerce",
    location: "South Florida / Miami-Dade / Broward",
    availability: "confirmed",
    icon: WandSparkles,
    bestFor: [
      "Vendedores en línea que necesitan mejorar el aspecto visual de sus listados.",
      "Marcas que lanzan nuevos productos y requieren piezas publicitarias rápidamente.",
      "Equipos que prefieren comunicación directa en español.",
    ],
    scopingQuestions: [
      "¿Cuántos productos o referencias necesitas trabajar?",
      "¿Tienes guía de estilo de marca definida?",
      "¿Qué plataformas de venta utilizas?",
    ],
    projectFit:
      "Orientado a la creación y composición de piezas visuales digitales. My D'ler demuestra trabajo real de diseño de marca y mockups de producto.",
    faqs: [
      {
        question: "¿Se pueden crear fondos de temporada?",
        answer:
          "Sí. Es posible adaptar el entorno del producto para campañas navideñas, verano u ofertas especiales sin volver a fotografiar.",
      },
    ],
  },
  {
    slug: "marketing-de-video-para-dentistas-miami",
    title: "Marketing de video para dentistas en Miami",
    metadataTitle: "Video Marketing Dentistas Miami",
    description:
      "Edición de video y producción selectiva para clínicas dentales, odontólogos y centros de estética dental en South Florida.",
    eyebrow: "Salud & Salud Dental",
    h1: "Video marketing y contenido en redes para clínicas dentales.",
    lead:
      "El proyecto Healthy Smile demuestra experiencia real produciendo y editando contenido en video para clínicas dentales en Miami. Creamos videos informativos, testimoniales y contenido para redes que genera confianza.",
    keyword: "marketing de video para dentistas",
    location: "Miami-Dade / Broward",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Consultorios odontológicos que desean explicar tratamientos en video.",
      "Clínicas dentales con tomas grabadas que necesitan edición profesional.",
      "Doctores que buscan atraer pacientes en el mercado hispano de Miami.",
    ],
    scopingQuestions: [
      "¿El video explicará procedimientos o testimonios de pacientes?",
      "¿Se grabará en la clínica o se editará material existente?",
      "¿Qué canales de difusión principales utilizarás?",
    ],
    projectFit:
      "Resaltado por el proyecto Healthy Smile en nuestro portafolio. Conecta edición de video profesional con comunicación en salud dental.",
    sections: DENTAL_ES_SECTIONS,
    sectionsDisclosure: DENTAL_ES_DISCLOSURE,
    sectionsDestinations: "Rangos publicados, el proyecto Healthy Smile Miami y tres decisiones antes de grabar",
    faqs: [
      {
        question: "¿Qué tipo de videos funcionan mejor para dentistas?",
        answer:
          "Los videos educativos cortos (explicación de carillas, alineadores o blanqueamiento) y los sketches breves generan gran interacción y confianza.",
      },
    ],
  },
  {
    slug: "marketing-de-video-para-abogados-miami",
    title: "Marketing de video para abogados en Miami",
    metadataTitle: "Video Marketing Abogados Miami",
    description:
      "Edición de video profesional y contenido para firmas legales, abogados y despachos de abogados en Miami y Fort Lauderdale.",
    eyebrow: "Servicios Legales / Firmas",
    h1: "Video marketing y Reels educativos para abogados y firmas legales.",
    lead:
      "Estructuramos y editamos videos educativos para abogados y firmas de abogados en South Florida. Convierte conceptos legales complejos en mensajes claros y profesionales para redes sociales.",
    keyword: "marketing de video para abogados",
    location: "Miami-Dade / Broward County",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Abogados que comparten consejos legales y respuestas frecuentes en redes.",
      "Firmas que buscan mantener presencia constante en Instagram, YouTube y LinkedIn.",
      "Despachos que requieren atención y edición bilingüe (español e inglés).",
    ],
    scopingQuestions: [
      "¿Qué especialidad legal abordará el contenido (inmigración, accidentes, corporativo)?",
      "¿Cuentas con guion o temas prioritarios a tratar?",
      "¿Deseas formato vertical para Reels o formato horizontal para sitio web?",
    ],
    projectFit:
      "Enfocado en edición y estructuración de contenido profesional legal. Mantiene la voz seria y transparente que exige la industria.",
    faqs: [
      {
        question: "¿Cómo se mantiene la imagen profesional del despacho?",
        answer:
          "Cuidamos el ritmo, la tipografía de marca y los subtítulos para que el video mantenga la sobriedad y la autoridad que exige el sector legal.",
      },
    ],
  },
  {
    slug: "marketing-de-video-para-clinicas-esteticas-miami",
    title: "Marketing de video para clínicas estéticas en Miami",
    metadataTitle: "Video Marketing Estéticas Miami",
    description:
      "Edición de video y Reels para med spas, clínicas estéticas y centros de dermatología cosmética en Miami y Fort Lauderdale.",
    eyebrow: "Med Spa / Estética",
    h1: "Video marketing y Reels para clínicas estéticas y med spas.",
    lead:
      "El contenido en video es clave para generar confianza en procedimientos estéticos. Editamos tomas de tratamientos, instalaciones y antes/después para publicaciones dinámicas en Instagram y TikTok.",
    keyword: "marketing de video para med spas",
    location: "Miami-Dade / Broward",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Clínicas estéticas y med spas con tomas de instalaciones y procedimientos.",
      "Centros cosméticos que desean explicar tratamientos antiedad e inyectables en video.",
      "Marcas de belleza que buscan interacción constante en el mercado de Miami.",
    ],
    scopingQuestions: [
      "¿Qué tratamientos estéticos principales deseas promocionar?",
      "¿Tienes permisos firmados de pacientes para mostrar tratamientos?",
      "¿Prefieres edición de clips existentes o planificación de grabación?",
    ],
    projectFit:
      "Conecta postproducción de video profesional con comunicación ética en salud estética.",
    sections: MED_SPA_ES_SECTIONS,
    sectionsDisclosure: MED_SPA_ES_DISCLOSURE,
    sectionsDestinations: "Rangos publicados, los proyectos más cercanos y qué hace seguro un video de tratamiento",
    faqs: [
      {
        question: "¿Qué formato de video funciona mejor para med spas?",
        answer:
          "Los videos verticales en 9:16 con subtítulos dinámicos que muestran el paso a paso del tratamiento y recomendaciones de cuidado posterior.",
      },
    ],
  },
  {
    slug: "reutilizacion-de-contenido-para-redes-miami",
    title: "Reutilización de contenido de video en Miami",
    metadataTitle: "Repurposing de Video para Redes",
    description:
      "Transforma videos largos, webinars o podcasts en Reels, Shorts y clips para redes sociales con edición profesional.",
    eyebrow: "Repurposing / Edición",
    h1: "Transforma videos largos en decenas de clips para redes sociales.",
    lead:
      "La reutilización de contenido (repurposing) es uno de los servicios principales de Esteban. Convertimos ponencias, podcasts y videos de YouTube en piezas verticales optimizadas para Reels y TikTok.",
    keyword: "reutilización de contenido de video",
    location: "Miami-Dade / Fort Lauderdale / Remote",
    availability: "confirmed",
    icon: Scissors,
    bestFor: [
      "Creadores y empresas con webinars, conferencias o podcasts grabados.",
      "Marcas que buscan multiplicar sus publicaciones sin grabar nuevo contenido.",
      "Equipos que necesitan selección de momentos clave y subtítulos dinámicos.",
    ],
    scopingQuestions: [
      "¿De qué duración son tus videos fuente?",
      "¿Cuántos clips cortos por video esperas extraer?",
      "¿Cuentas con elementos de marca (logos, colores, tipografías)?",
    ],
    projectFit:
      "Enfocado en edición remota eficiente sobre material existente grabado por el cliente.",
    faqs: [
      {
        question: "¿Qué tipo de videos largos se pueden transformar?",
        answer:
          "Webinars, entrevistas, conferencias, episodios de podcast y videos largos de YouTube.",
      },
    ],
  },
  {
    slug: "produccion-de-video-para-pequenos-negocios-miami",
    title: "Producción de video para pequeños negocios en Miami",
    metadataTitle: "Video para Pequeños Negocios",
    description:
      "Edición de video y producción adaptable para PyMEs, emprendedores y negocios locales en Miami y Fort Lauderdale.",
    eyebrow: "Negocios Locales / PyMEs",
    h1: "Videos promocionales y contenido social para pequeños negocios.",
    lead:
      "Ayudamos a pequeños negocios locales a comunicarse profesionalmente en video. Desde la edición de clips grabados con smartphone hasta videos de presentación de marca.",
    keyword: "video para pequeños negocios",
    location: "Miami-Dade / Broward",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Emprendedores que lanzan un producto o servicio local.",
      "Negocios familiares que desean aumentar su visibilidad en redes sociales.",
      "Empresas locales que prefieren asesoría directa y bilingüe.",
    ],
    scopingQuestions: [
      "¿Cuál es el objetivo principal del video (ventas, concientización, contratación)?",
      "¿Dispones de material propio o requieres planificación de producción?",
    ],
    projectFit:
      "Edición y postproducción accesible y transparente estructurada por proyecto.",
    faqs: [
      {
        question: "¿Es necesario contar con equipo profesional para grabar?",
        answer:
          "No siempre. Un smartphone moderno con buena iluminación natural puede generar excelentes tomas que nosotros transformamos con edición profesional.",
      },
    ],
  },
  {
    slug: "fotos-con-ia-para-bienes-raices-miami",
    title: "Fotos con IA para bienes raíces en Miami",
    metadataTitle: "Fotos con IA Bienes Raíces Miami",
    description:
      "Mejora visual de imágenes inmobiliarias y ambientación virtual con IA para agentes y propiedades en South Florida.",
    eyebrow: "Real Estate / IA Visual",
    h1: "Fotos e imágenes con IA para inmuebles y bienes raíces.",
    lead:
      "Ayudamos a agentes inmobiliarios a retocar y generar fondos de ambientación limpia para propiedades mediante herramientas visuales asistidas por IA.",
    keyword: "fotos con IA para bienes raíces",
    location: "Miami-Dade / Broward",
    availability: "confirmed",
    icon: WandSparkles,
    bestFor: [
      "Agentes de bienes raíces que necesitan retocar imágenes de propiedades.",
      "Inmobiliarias que buscan presentar ambientes iluminados y limpios.",
    ],
    scopingQuestions: [
      "¿Las tomas del inmueble están listas para retocar?",
      "¿Qué elementos deseas mejorar (iluminación, cielo, fondos)?",
    ],
    projectFit:
      "Resaltado por el trabajo de guion y edición de [Homeowners](/es/portafolio/homeowners) en el sector inmobiliario.",
    faqs: [
      {
        question: "¿Se altera la estructura real de la propiedad?",
        answer:
          "No. Se optimizan la iluminación, cielos y entornos conservando la distribución exacta de la propiedad.",
      },
    ],
  },
  {
    slug: "fotografia-de-comida-con-ia-restaurantes",
    title: "Fotografía de comida con IA para restaurantes",
    metadataTitle: "Fotos de Comida con IA Restaurantes",
    description:
      "Creación de piezas visuales de platillos y menús asistidas por IA para restaurantes y marcas gastronómicas en Miami.",
    eyebrow: "Gastronomía / IA Visual",
    h1: "Fotografía de comida e imágenes de menú asistidas por IA.",
    lead:
      "El proyecto Bar Door Monkey demuestra trabajo real de producción y contenido gastronómico. Generamos fondos y composiciones visuales de estilo de vida para restaurantes. Para producción y edición en movimiento, consulta nuestro servicio de [video para restaurantes en Miami](/es/video-para-restaurantes-miami).",
    keyword: "fotografía de comida con IA",
    location: "Miami-Dade / Fort Lauderdale",
    availability: "confirmed",
    icon: UtensilsCrossed,
    bestFor: [
      "Restaurantes que lanzan nuevos platillos o promociones de temporada.",
      "Marcas gastronómicas que necesitan contenido constante para redes sociales.",
    ],
    scopingQuestions: [
      "¿Tienes fotos originales de los platillos?",
      "¿En qué plataformas publicarás el menú o las fotos?",
    ],
    projectFit:
      "Combina fotos reales de platillos con entornos visuales atractivos. Si además cuentas con tomas de cocina o salón, revisa nuestras opciones de [video para restaurantes en Miami](/es/video-para-restaurantes-miami).",
    faqs: [
      {
        question: "¿El platillo se sigue viendo real?",
        answer:
          "Sí. Usamos la foto real del plato preparado como ancla y generamos el entorno de mesa o restaurante.",
      },
    ],
  },
  {
    slug: "marketing-de-video-para-contratistas-miami",
    title: "Marketing de video para contratistas en Miami",
    metadataTitle: "Video Marketing Contratistas Miami",
    description:
      "Edición de video y proyectos promocionales para contratistas, remodeladores y servicios del hogar en South Florida.",
    eyebrow: "Servicios del Hogar / Contratistas",
    h1: "Videos de proyectos y transformaciones para contratistas.",
    lead:
      "Muestra la calidad de tu trabajo de remodelación y construcción. Editamos clips de antes y después, testimoniales de clientes y explicaciones de proyectos.",
    keyword: "marketing de video para contratistas",
    location: "Miami-Dade / Broward",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Contratistas generales, pintores, techadores y remodeladores de cocinas/baños.",
      "Empresas de servicios que desean mostrar proyectos terminados.",
    ],
    scopingQuestions: [
      "¿Tienes videos o fotos del proceso de remodelación (antes y después)?",
      "¿Prefieres edición de clips en teléfono o planificar tomas en sitio?",
    ],
    projectFit:
      "Edición estructurada remota para contratistas locales.",
    faqs: [
      {
        question: "¿Funciona para mostrar proyectos de remodelación?",
        answer:
          "Excelente. Los videos de 'antes y después' son el formato de mayor conversión para contratistas.",
      },
    ],
  },
  {
    slug: "fotografo-de-retratos-y-headshots-miami",
    title: "Fotógrafo de retratos y headshots en Miami",
    metadataTitle: "Retratos y Headshots Miami",
    description:
      "Retratos profesionales y headshots para ejecutivos, abogados, agentes inmobiliarios y marcas personales en Miami.",
    eyebrow: "Retratos / Marca Personal",
    h1: "Headshots profesionales y retratos corporativos.",
    lead:
      "Fotografía y retoque de retratos ejecutivos y headshots profesionales para perfiles de LinkedIn, sitios web corporativos y tarjetas de presentación.",
    keyword: "fotógrafo de headshots en Miami",
    location: "Miami-Dade / Fort Lauderdale",
    availability: "confirmed",
    icon: Camera,
    bestFor: [
      "Ejecutivos y emprendedores que actualizan su perfil profesional.",
      "Agentes de bienes raíces y abogados que necesitan una imagen de confianza.",
    ],
    scopingQuestions: [
      "¿La sesión será en estudio, oficina o locación exterior?",
      "¿Cuántas personas necesitan headshot?",
    ],
    projectFit:
      "Sesiones de retratos agendadas por proyecto en South Florida.",
    faqs: [
      {
        question: "¿Se incluye retoque fotográfico digital?",
        answer:
          "Sí. Cada retrato final seleccionado incluye retoque discreto de piel y color.",
      },
    ],
  },
  {
    slug: "editor-de-video-corto-para-redes-miami",
    title: "Editor de video corto para redes en Miami",
    metadataTitle: "Editor de Video Corto Reels Miami",
    description: `Editor de videos cortos y reels para influencers, creadores y negocios en Miami y Fort Lauderdale. Reels, TikTok y Shorts desde ${usd(SHORT_FORM.perVideoFrom)} por video.`,
    eyebrow: "Video Corto / Reels",
    updated: "2026-10-08",
    sectionsDisclosure: "Videos cortos para influencers y negocios: costo, grabar con el celular y contacto",
    sectionsDestinations: "Formato y zonas seguras, edición remota, influencers que empiezan, grabar con el celular, precios en Miami y cómo contactar a Esteban",
    h1: "Edición de Reels, TikToks y YouTube Shorts.",
    lead:
      "Editamos videos verticales en formato 9:16 con cortes dinámicos, subtítulos legibles y ritmos que mantienen la retención de audiencia.",
    keyword: "editor de video corto",
    location: "Miami-Dade / Broward / Remote",
    availability: "confirmed",
    icon: Scissors,
    bestFor: [
      "Creadores de contenido y empresas que publican Reels y Shorts diariamente.",
      "Marcas que buscan mantener consistencia visual en redes sociales.",
      "Negocios con material grabado en teléfono que necesitan edición profesional.",
      "Equipos que buscan ganchos visuales claros y subtítulos en zonas seguras.",
    ],
    scopingQuestions: [
      "¿Cuántos videos cortos al mes planeas publicar?",
      "¿Cuentas con la plantilla o estilo gráfico de tu marca?",
      "¿En qué plataformas se publicará el contenido (Reels, TikTok, Shorts)?",
      "¿Los videos requieren subtítulos dinámicos o versiones bilingües?",
    ],
    projectFit:
      "Servicio central de edición remota de video corto para marcas y creadores.",
    sections: [
      {
        heading: "¿Cómo estructurar videos cortos para captar atención en redes?",
        paragraphs: [
          "En plataformas como Instagram Reels, TikTok y YouTube Shorts, la atención de los usuarios en Miami es inmediata. Un video corto no intenta resumir toda la historia de una marca en 30 segundos; funciona mejor cuando se enfoca en un solo mensaje directo: resolver una duda frecuente, mostrar el funcionamiento de un producto o presentar la experiencia real de un cliente.",
          "Los primeros 2 a 3 segundos determinan si el usuario continúa viendo o pasa al siguiente contenido. Por eso la edición prioriza ganchos visuales y verbales al inicio: mostrar el resultado final, formular una pregunta clara o abrir con una acción dinámica que contextualice el negocio de inmediato sin introducciones lentas ni logotipos estáticos que resten retención.",
        ],
      },
      {
        heading: "¿Cuáles son los criterios técnicos de encuadre y zonas seguras?",
        paragraphs: [
          "El estándar técnico para videos cortos es una resolución vertical de 1080×1920 píxeles con relación de aspecto 9:16. Las interfaces móviles de Instagram y TikTok colocan botones de me gusta, comentarios, perfiles y descripciones sobre los laterales y la parte inferior del video. Si los elementos clave o textos se colocan en esas áreas, la interfaz los tapa.",
          "Una postproducción cuidada mantiene los subtítulos dinámicos, logotipos y llamados a la acción dentro de la zona segura central (Safe Zone). Como gran parte del público consume video en el celular con el audio silenciado, los subtítulos legibles con alto contraste garantizan la comprensión completa. Para proyectos específicos en Broward, puedes coordinar con un [editor de Reels en Fort Lauderdale](/es/editor-de-reels-fort-lauderdale).",
        ],
      },
      {
        heading: "¿Cómo funciona el flujo de edición remota con material existente?",
        paragraphs: [
          "Muchas empresas y creadores en el sur de la Florida ya cuentan con grabaciones realizadas con teléfonos inteligentes o cámaras propias en sus locales, eventos o jornadas de trabajo. A través de un flujo de postproducción remota, esos archivos se organizan, limpian y transforman en piezas ágiles listas para publicar en redes sociales sin necesidad de programar rodajes costosos.",
          "El proceso comienza reuniendo los archivos originales en una carpeta compartida en la nube con notas breves sobre el objetivo de cada clip. La edición recorta silencios, unifica color y sonido, y prepara versiones verticales adaptadas. Si necesitas atención enfocada en Miami-Dade, consulta con un [editor de Reels en Miami](/es/editor-de-reels-miami) para revisar el alcance de tus publicaciones.",
        ],
      },
      ...SHORT_FORM_SECTIONS_ES,
    ],
    faqs: [
      {
        question: "¿Incluye subtítulos animados?",
        answer:
          "Sí. Todos los videos cortos incluyen subtítulos legibles optimizados para reproducción sin sonido.",
      },
      {
        question: "¿Puedo enviar material grabado con el teléfono?",
        answer:
          "Sí. La edición remota de video corto trabaja habitualmente con archivos grabados en smartphone siempre que tengan audio comprensible y buena luz.",
      },
      {
        question: "¿Qué formato de entrega se utiliza?",
        answer:
          "Los videos se entregan en formato vertical 9:16 (1080×1920) en MP4, listos para publicar en Instagram Reels, TikTok y YouTube Shorts.",
      },
    ],
  },
  {
    slug: "editor-de-video-miami",
    title: "Editor de Video en Miami",
    metadataTitle: "Editor de Video en Miami en Español",
    description:
      "Edición de video remota y profesional en español para negocios, agencias y creadores de Miami. Reels, YouTube, comerciales y contenido con material existente.",
    eyebrow: "Miami / Edición en español",
    h1: "Editor de video en Miami en español para negocios, marcas y creadores.",
    lead:
      "Esteban edita video de forma remota para negocios y marcas de Miami-Dade. Su idioma principal de trabajo es el español, con inglés intermedio para proyectos bilingües. Puedes enviar material existente o consultar producción en locación de forma selectiva.",
    keyword: "editor de video Miami",
    location: "Miami-Dade / Remoto",
    availability: "confirmed",
    icon: Scissors,
    bestFor: [
      "Negocios y marcas de Miami con grabaciones existentes que necesitan edición profesional.",
      "Emprendedores y equipos que prefieren comunicarse y revisar cortes en español.",
      "Creadores de contenido y agencias que buscan un editor para Reels, YouTube o anuncios.",
      "Proyectos que requieren edición remota ágil y cotización clara por proyecto.",
    ],
    scopingQuestions: [
      "¿Qué tipo de video necesitas: Reels, YouTube, comercial o corporativo?",
      "¿Cuentas con el material grabado o necesitas evaluar captura en locación?",
      "¿Requieres edición en español, inglés o subtítulos bilingües?",
      "¿Cuál es la fecha estimada o el ritmo de publicación previsto?",
    ],
    projectFit:
      "Esta página responde la búsqueda de editor de video en Miami en español y conecta con nuestros servicios confirmados de edición remota, video corto y producción selectiva.",
    sections: [
      {
        heading: "¿Cómo es el servicio de edición de video en español?",
        paragraphs: [
          "El español es el idioma principal de trabajo y atención de Esteban Moreno Media, con comunicación de trabajo disponible en inglés intermedio para proyectos bilingües en el sur de Florida. Esto permite que dueños de negocios, equipos de marketing y creadores en Miami expliquen la meta comercial, el tono y las referencias de estilo sin barreras de idioma ni intermediarios.",
          "La edición en español asegura que los modismos, los ganchos de apertura y el ritmo de la narrativa conecten de forma auténtica con la audiencia hispanohablante de Miami-Dade y Broward. Ya sea para videos promocionales, explicativos de servicios o contenido para redes sociales, el proceso de revisión y ajustes se coordina directamente en tu idioma, facilitando entregas precisas y alineadas con la visión de tu marca.",
        ],
      },
      {
        heading: "¿Se trabaja de forma remota o con grabación en locación?",
        paragraphs: [
          "El modelo de trabajo está centrado en edición de video remota a partir de material existente que el cliente ya tiene grabado. Si tu empresa cuenta con tomas realizadas con teléfonos, cámaras propias o archivos de grabaciones anteriores, los clips se envían a través de almacenamiento en la nube y se procesan digitalmente sin necesidad de coordinar jornadas presenciales.",
          "Para proyectos que requieren capturar imágenes nuevas en locación dentro de Miami-Dade o Broward, la producción presencial se evalúa de manera selectiva según la locación, la disponibilidad y los objetivos del proyecto. Esta separación clara permite mantener costos accesibles para quienes solo necesitan postproducción profesional y reservar la grabación para ideas que verdaderamente exigen cobertura local.",
        ],
      },
      {
        heading: "¿Qué tipos de video edita Esteban para negocios de Miami?",
        paragraphs: [
          "La oferta de postproducción cubre los principales formatos que utilizan los negocios para promocionarse y vender. Para redes sociales verticales, editamos contenido corto como [editor de Reels en Miami](/es/editor-de-reels-miami), opciones en Broward como [editor de Reels en Fort Lauderdale](/es/editor-de-reels-fort-lauderdale) y el servicio general de [editor de video corto para redes en Miami](/es/editor-de-video-corto-para-redes-miami).",
          "Para canales horizontales y plataformas de contenido largo, ofrecemos edición de video para YouTube y creativos publicitarios tipo [editor de video UGC](/es/editor-de-video-ugc-para-ecommerce). Cada tipo de video se edita con el ritmo, formato y llamadas a la acción adecuados para su canal.",
        ],
      },
      {
        heading: "¿Cuál es la diferencia entre un editor de video y un videógrafo?",
        paragraphs: [
          "Un videógrafo es el profesional encargado de la captura de imágenes en locación: opera las cámaras, maneja la iluminación y registra el audio durante una jornada de grabación. Su función principal concluye cuando entrega los archivos en bruto. Un editor de video, en cambio, se encarga de la postproducción: selecciona las mejores tomas, define la estructura narrativa y da ritmo a la historia.",
          "El editor integra subtítulos, música, corrección de color, diseño sonoro y gráficos en pantalla para convertir clips dispersos en una pieza coherente y atractiva. Si tu negocio ya genera grabaciones internas, contratar directamente a un editor especializado te permite publicar contenido constante sin incurrir en los costos recurrentes de producción en set. Puedes revisar más diferencias en la [guía de editor de video vs videógrafo](/es/guias/editor-de-video-vs-videografo).",
        ],
      },
      {
        heading: "¿Cuánto cuesta contratar un editor de video en Miami?",
        paragraphs: [
          `Las tarifas base indicativas de edición se estructuran por tipo de proyecto como referencia de un profesional independiente enfocado en edición, con el descuento introductorio aplicado. Los videos cortos de redes se cotizan como el paquete Arranque, ${esShortForm}; para videos de YouTube, de ${usd(PRICING_BANDS.youtube.baseMin)} a ${usd(PRICING_BANDS.youtube.baseMax)}; y para piezas corporativas o comerciales, de ${usd(PRICING_BANDS.corporate.baseMin)} a ${usd(PRICING_BANDS.corporate.baseMax)} por proyecto.`,
          "Estos valores son rangos de referencia para postproducción con material suministrado. El presupuesto definitivo requiere una cotización adaptada al volumen de tomas, la complejidad técnica y los tiempos de entrega. Puedes consultar todos los planes y paquetes mensuales en nuestra sección de [precios](/es/precios), incluyendo el paquete [Arranque](/es/precios/arranque) y el plan [Crecimiento](/es/precios/crecimiento).",
        ],
      },
      {
        heading: "¿Qué material debes enviar para iniciar la edición y qué prueba existe?",
        paragraphs: [
          "Para comenzar un proyecto de edición, debes compartir los archivos de video originales mediante un enlace de Google Drive o Dropbox, acompañados de una breve descripción de la meta comercial, el guion o puntos clave, el logotipo si aplica y referencias visuales del estilo deseado. Indicar qué tomas son indispensables y cuáles descartar agiliza notablemente el proceso.",
          "Puedes verificar la calidad del trabajo revisando proyectos reales publicados en nuestro portafolio, como el video promocional de [Bar Door Monkey Miami](/es/portafolio/bar-door-monkey), la edición de [Homeowners](/es/portafolio/homeowners), el contenido social de [ML Colombia](/es/portafolio/ml-colombia) y la producción en locación y edición de [Healthy Smile Miami](/es/portafolio/healthy-smile).",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Esteban trabaja proyectos de edición completamente en español?",
        answer:
          "Sí. El español es su idioma principal de trabajo y también hay comunicación de trabajo disponible en inglés intermedio para proyectos bilingües.",
      },
      {
        question: "¿Puedo enviar grabaciones hechas con mi celular?",
        answer:
          "Sí. Muchos proyectos comerciales parten de clips grabados con smartphone, siempre que los archivos originales tengan iluminación adecuada y audio claro.",
      },
      {
        question: "¿Cómo se entregan los videos terminados?",
        answer:
          "Los videos se entregan en formatos optimizados para cada plataforma (vertical 9:16 para Reels y Shorts, u horizontal 16:9 para YouTube y web) a través de enlaces descargables en la nube.",
      },
      {
        question: "¿Se puede incluir grabación en locación en Miami?",
        answer:
          "La grabación presencial se evalúa de manera selectiva por proyecto según la locación y el alcance requerido; la prioridad habitual del servicio es la edición remota.",
      },
    ],
  },
  {
    slug: "produccion-de-video-palm-beach-county",
    title: "Producción de video en Palm Beach",
    metadataTitle: "Producción de Video Palm Beach",
    description:
      "Producción de video, comerciales y contenido para marcas y empresas en Palm Beach County.",
    eyebrow: "Palm Beach County",
    h1: "Producción de video y contenido comercial en Palm Beach.",
    lead:
      "Ofrecemos planificación, videografía y postproducción para marcas, empresas inmobiliarias y negocios locales en el condado de Palm Beach dentro de nuestras [áreas de servicio](/es/areas).",
    keyword: "producción de video en Palm Beach",
    location: "Palm Beach County",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Marcas y empresas en el área de Palm Beach que necesitan comerciales y videos corporativos.",
      "Agentes inmobiliarios y negocios en Palm Beach County.",
    ],
    scopingQuestions: [
      "¿El video se filmará en locación en el condado o requieres edición remota?",
      "¿Cuáles son los entregables finales necesarios?",
    ],
    projectFit:
      "Consulta nuestras [áreas de servicio de video](/es/areas) para conocer el alcance y cobertura en Palm Beach County respaldado por portafolio publicado.",
    faqs: [
      {
        question: "¿Tienen cobertura en el condado de Palm Beach?",
        answer:
          "Sí. Ofrecemos producción en sitio y edición remota para proyectos en el condado de Palm Beach.",
      },
    ],
  },
  {
    slug: "edicion-de-video-palm-beach-county",
    title: "Edición de video en Palm Beach County",
    metadataTitle: "Edición de Video Palm Beach",
    description:
      "Servicio de edición remota de video para empresas y creadores en Palm Beach County.",
    eyebrow: "Palm Beach County",
    h1: "Edición de video profesional en Palm Beach County.",
    lead:
      "Edición remota de video para empresas, negocios locales y creadores en el condado de Palm Beach. Optimiza tu material bruto en piezas listas para publicar.",
    keyword: "edición de video en Palm Beach",
    location: "Palm Beach County",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Negocios en el área de Palm Beach que cuentan con grabaciones y necesitan edición.",
      "Creadores de contenido y empresas en Palm Beach County.",
    ],
    scopingQuestions: [
      "¿En qué formato tienes el material grabado?",
      "¿Cuál es el calendario de entregas de tu proyecto?",
    ],
    projectFit:
      "Edición remota y eficiente sin requerir desplazamientos.",
    faqs: [
      {
        question: "¿Cómo se envían los archivos pesados desde Palm Beach?",
        answer:
          "Utilizamos enlaces seguros de Dropbox o Frame.io para una transferencia rápida de material.",
      },
    ],
  },
  {
    slug: "produccion-de-video-doral-miami",
    title: "Producción de video en Doral Miami",
    metadataTitle: "Producción de Video Doral Miami",
    description:
      "Producción y edición de video para empresas B2B, distribuidores y marcas comerciales en Doral y Miami.",
    eyebrow: "Doral / B2B Commercial",
    h1: "Producción de video y contenido comercial en Doral.",
    lead:
      "Ofrecemos servicios de producción, videografía corporativa y edición remota para distribuidores, agencias de logística y marcas comerciales en Doral, dentro de nuestras [áreas de servicio de edición y producción de video](/es/areas).",
    keyword: "producción de video en Doral",
    location: "Doral / Miami-Dade",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Empresas de logística, importación y distribuidores en Doral.",
      "Marcas B2B que necesitan videos de producto y corporativos.",
    ],
    scopingQuestions: [
      "¿El video se filmará en almacén/oficina en Doral o es edición de material existente?",
      "¿En qué idiomas se distribuirá el video?",
    ],
    projectFit:
      "Atención directa y bilingüe para empresas en la zona comercial de Doral.",
    faqs: [
      {
        question: "¿Atienden proyectos corporativos en Doral?",
        answer:
          "Sí. Contamos con cobertura de grabación en sitio y edición remota para empresas en Doral y el oeste de Miami-Dade.",
      },
    ],
  },
  {
    slug: "video-inmobiliario-coral-gables",
    title: "Video inmobiliario en Coral Gables",
    metadataTitle: "Video Inmobiliario Coral Gables",
    description:
      "Producción y edición de video de lujo para propiedades residenciales y comerciales en Coral Gables.",
    eyebrow: "Coral Gables / Real Estate",
    h1: "Videos de propiedades de lujo en Coral Gables.",
    lead:
      "Editamos y estructuramos recorridos visuales de alta calidad para agentes de bienes raíces y firmas inmobiliarias en Coral Gables. Consulta el [área de servicio](/es/areas) al preparar tu proyecto.",
    keyword: "video inmobiliario en Coral Gables",
    location: "Coral Gables / Miami-Dade",
    availability: "confirmed",
    icon: Building2,
    bestFor: [
      "Agentes de bienes raíces de lujo en Coral Gables.",
      "Desarrolladores e inmobiliarias en el sur de Miami.",
    ],
    scopingQuestions: [
      "¿Las tomas de la propiedad ya fueron grabadas?",
      "¿Requieres edición para Instagram Reels o formato horizontal de alta resolución?",
    ],
    projectFit:
      "Resaltado por el trabajo de edición publicado en el sector inmobiliario.",
    faqs: [
      {
        question: "¿Incluye edición de música y color de lujo?",
        answer:
          "Sí. Cada video inmobiliario se entrega con corrección de color profesional y diseño sonoro adecuado para propiedades de alto valor.",
      },
    ],
  },
  {
    slug: "video-para-yates-y-hospitalidad-fort-lauderdale",
    title: "Video para yates y hospitalidad en Fort Lauderdale",
    metadataTitle: "Video para Yates y Hospitalidad",
    description:
      "Video para yates y hospitalidad en Fort Lauderdale. Edición promocional para chárteres náuticos, brokers marinos y turismo con material del cliente.",
    eyebrow: "Fort Lauderdale / Náutica",
    h1: "Videos promocionales para yates, marinos y hospitalidad.",
    lead:
      "Fort Lauderdale es la capital náutica de Florida. Editamos y producimos contenido audiovisual para servicios de chárter, brokers marinos, hoteles y marcas náuticas a partir de material suministrado por el cliente. Revisa el [área de servicio](/es/areas) al preparar tu proyecto. Consulta guías especializadas como [guías de edición de video con dron en Florida](/es/guias/guias-de-edicion-de-video-con-dron-florida) y [entrega para edición remota de video](/es/guias/entrega-para-edicion-remota-de-video).",
    keyword: "video para yates en Fort Lauderdale",
    location: "Fort Lauderdale / Broward",
    availability: "confirmed",
    icon: Anchor,
    bestFor: [
      "Empresas de chárter de yates y servicios marítimos en Fort Lauderdale.",
      "Hoteles y restaurantes frente al mar en Broward.",
    ],
    scopingQuestions: [
      "¿El material en video se grabó en marina, en navegación o incluye tomas aéreas?",
      "¿Requieres versiones verticales 9:16 para Instagram/TikTok y horizontales 16:9 para web?",
    ],
    projectFit:
      "Postproducción y edición de estilo de vida náutico en Fort Lauderdale y South Florida. Demostrado por el proyecto [Banacol](/es/portafolio/banacol) con cinematografía aérea en mar abierto. Si ya tienes clips y tu negocio está en Broward, el [editor de Reels en Fort Lauderdale](/es/editor-de-reels-fort-lauderdale) los convierte en videos cortos con subtítulos.",
    faqs: [
      {
        question: "¿Qué tipo de material puede suministrar una empresa de chárter o corretaje náutico?",
        answer:
          "Las empresas náuticas suministran material grabado por el cliente: tomas con dron, recorridos de cabina, navegación en aguas abiertas, deportes acuáticos, momentos de hospitalidad y tomas del capitán. Incluir logotipos y especificaciones de la embarcación ayuda a estructurar la edición.",
      },
      {
        question: "¿Cómo optimizan el audio con ruido de viento, oleaje y motores marinos?",
        answer:
          "Aplicamos reducción de ruido y ecualización para limpiar voces y diálogos, atenuamos el rugido de motores e integramos capas de sonido ambiental marino junto a música con licencia comercial adaptada a marcas de lujo.",
      },
      {
        question: "¿Pueden editar y estabilizar tomas aéreas capturadas desde embarcaciones?",
        answer:
          "Sí. Estabilizamos clips aéreos suministrados por el cliente y aplicamos corrección de color para balancear la luz solar intensa, reflejos sobre el agua y tonos de madera teca en cubierta.",
      },
      {
        question: "¿Se entregan versiones para redes sociales y páginas web de corretaje?",
        answer:
          "Sí. Entregamos versiones 16:9 en alta resolución para sitios web y portales de chárter, además de cortes verticales 9:16 para Instagram Reels, TikTok y anuncios digitales.",
      },
      {
        question: "¿Cómo funciona el proceso de envío de archivos y revisiones?",
        answer:
          "Los archivos de video y tomas aéreas se comparten mediante transferencia segura en la nube. Tras la primera entrega, puedes enviar comentarios consolidados con marcas de tiempo para ajustar ritmo, música y llamadas a la acción.",
      },
      {
        question: "¿Cuánto cuesta la edición o producción de video para yates en Fort Lauderdale?",
        answer:
          `La edición con clips existentes suministrados por el cliente inicia desde ${usd(SHORT_FORM.perVideoFrom)} por video vertical dentro del paquete Arranque o desde ${usd(RESTAURANT_PROMO.from)} para piezas promocionales extensas. Si se requiere media jornada de filmación náutica en marina o muelle en Broward, se cotiza según las horas de rodaje y la embarcación.`,
      },
      {
        question: "¿Cuál es el tiempo de entrega para videos de corretaje o chárter náutico?",
        answer:
          "Los cortes horizontales y verticales editados con material suministrado se entregan habitualmente en 3 a 5 días hábiles, permitiendo revisiones centralizadas en la nube antes de su publicación en portales náuticos y redes sociales.",
      },
    ],
  },
  {
    slug: "video-corporativo-distrito-financiero-miami",
    title: "Video corporativo en el centro financiero de Miami",
    metadataTitle: "Video Corporativo Miami",
    description:
      "Producción de video corporativo, testimoniales y contenido para firmas financieras y empresas en Miami.",
    eyebrow: "Miami / Corporativo",
    h1: "Videos corporativos y de presentación en Miami.",
    lead:
      "Edición de video profesional y testimoniales ejecutivos para firmas financieras, startups tecnológicas y empresas en el centro financiero de Miami.",
    keyword: "video corporativo en Miami",
    location: "Downtown Miami / Financial District",
    availability: "confirmed",
    icon: Building2,
    bestFor: [
      "Firmas de servicios profesionales, legales y financieras en Miami.",
      "Empresas tecnológicas que necesitan videos de presentación ejecutiva.",
    ],
    scopingQuestions: [
      "¿Se grabarán testimoniales de ejecutivos u operaciones en oficina?",
      "¿Requieren subtítulos en inglés y español?",
    ],
    projectFit:
      "Comunicación corporativa bilingüe de alto nivel.",
    faqs: [
      {
        question: "¿Ofrecen servicios de subtitulado bilingüe?",
        answer:
          "Sí. Proporcionamos archivos con subtítulos sincronizados en ambos idiomas para distribución corporativa.",
      },
    ],
  },
  {
    slug: "video-para-pequenos-negocios-pembroke-pines",
    title: "Video para pequeños negocios en Pembroke Pines",
    metadataTitle: "Video Pequeños Negocios Pines",
    description:
      "Edición de video y contenido promocional para pequeños negocios de Pembroke Pines, con atención remota desde Fort Lauderdale.",
    eyebrow: "Pembroke Pines / Broward",
    h1: "Videos promocionales para negocios locales en Pembroke Pines.",
    lead:
      "Esteban Moreno Media atiende consultas de emprendedores y pequeños negocios de Pembroke Pines desde Fort Lauderdale. El alcance puede incluir edición de material del cliente, planificación social y grabación en locación evaluada por proyecto.",
    keyword: "video para pequeños negocios en Pembroke Pines",
    location: "Pembroke Pines / Broward",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Comercios, clínicas locales y empresas de servicios en Pembroke Pines.",
      "Negocios familiares que buscan presencia activa en Instagram y Facebook.",
    ],
    scopingQuestions: [
      "¿Dispones de grabaciones cortas grabadas en tu local?",
      "¿Qué oferta o servicio deseas promocionar?",
    ],
    projectFit:
      "Edición de material entregado por el cliente y, según el alcance, planificación social o producción en locación evaluada por proyecto.",
    // Round 6 (2026-10-14): the English twin carries the city Reels answer
    // (CITY_REELS in lib/conversational-answers.ts); this page had none, so a
    // Spanish search for a Reels editor in Pembroke Pines found no sentence to quote.
    sections: [
      {
        heading: "¿Quién edita Reels para negocios en Pembroke Pines?",
        paragraphs: [
          `Esteban Moreno Media edita Reels de Instagram, TikToks y YouTube Shorts para negocios y creadores de Pembroke Pines a partir de los clips que ellos mismos graban. Esteban Moreno es editor de video con base en Fort Lauderdale y trabaja a distancia: envías los archivos originales y una línea sobre cada idea, y recibes los cortes verticales con subtítulos dentro de las zonas seguras y una acción clara al final. Pembroke Pines queda en el suroeste del condado de Broward, al oeste de Hollywood por Pines Boulevard, el mismo condado de su base, así que se puede cotizar una grabación en locación cuando haga falta material nuevo. Su idioma de trabajo es el español, con inglés intermedio. El paquete Arranque cuesta desde ${esStarterFrom} por video, con una ronda de cambios; si publicas cada semana, es ${esWeekly}, con un mínimo de ${ARRANQUE_WEEKLY_TERMS.minimumWeeks} semanas. Para ver cómo funciona la edición, revisa la página de [editor de Reels en Fort Lauderdale](/es/editor-de-reels-fort-lauderdale).`,
        ],
      },
    ],
    faqs: [
      {
        question: "¿Cómo funciona el servicio si estoy en Pembroke Pines?",
        answer:
          "Puedes comenzar con un brief y material ya grabado. Esteban trabaja desde Fort Lauderdale; cualquier grabación en locación se evalúa según el alcance del proyecto.",
      },
      {
        question: "¿El portafolio incluye un proyecto hecho en Pembroke Pines?",
        answer:
          "No se presenta un proyecto de Pembroke Pines. Bar Door Monkey es un ejemplo publicado en Miami que verifica videografía y edición para un video promocional de un negocio local, sin afirmar resultados comerciales.",
      },
    ],
  },
  {
    slug: "marketing-de-video-para-cirugia-plastica-miami",
    title: "Marketing de video para cirugía plástica en Miami",
    metadataTitle: "Video Cirugía Plástica Miami",
    description:
      "Edición de video confidencial y elegante para clínicas de cirugía plástica y medicina estética en Miami.",
    eyebrow: "Cirugía Plástica / Estética",
    h1: "Marketing de video para cirujanos plásticos en Miami.",
    lead:
      "Editamos videos explicativos, testimoniales de pacientes y contenido educativo para cirujanos plásticos y centros quirúrgicos en Miami.",
    keyword: "video para cirugía plástica en Miami",
    location: "Miami / Coral Gables",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Cirujanos plásticos y clínicas de medicina estética en Miami.",
      "Centros quirúrgicos que buscan educar a pacientes potenciales.",
    ],
    scopingQuestions: [
      "¿El video se enfocará en consultas, explicaciones médicas o instalaciones?",
      "¿Cuentas con consentimiento de pacientes para testimoniales?",
    ],
    projectFit:
      "Edición estética de alta confidencialidad y elegancia visual.",
    faqs: [
      {
        question: "¿Mantienen privacidad estricta en el manejo de grabaciones?",
        answer:
          "Absolutamente. Todo el material clínico se procesa mediante almacenamiento cifrado con total confidencialidad.",
      },
    ],
  },
  {
    slug: "fotografia-de-joyas-y-lujo-miami",
    title: "Fotografía de joyas y productos de lujo en Miami",
    metadataTitle: "Fotografía Joyas Lujo Miami",
    description:
      "Fotografía asistida por IA y retoque comercial para joyería, relojes y artículos de lujo en Miami.",
    eyebrow: "Joyería / Marca de Lujo",
    h1: "Fotografía de productos de lujo y joyería en Miami.",
    lead:
      "Generamos imágenes comerciales hiperrealistas y retoque de alta resolución para marcas de joyas, relojes y lujo en Miami.",
    keyword: "fotografía de joyas en Miami",
    location: "Miami / Doral",
    availability: "confirmed",
    icon: Camera,
    bestFor: [
      "Joyeros, diseñadores y marcas de artículos de lujo.",
      "Tiendas e-commerce de joyería fina en South Florida.",
    ],
    scopingQuestions: [
      "¿Deseas fotografía macro en estudio o generación de escenarios de lujo con IA?",
      "¿En qué resolución e-commerce requieres las imágenes?",
    ],
    projectFit:
      "Imágenes de producto impecables optimizadas con herramientas de IA. Si necesitas fotografiar el producto físico, mira la [fotografía de producto en Miami](/es/fotografia-de-producto-miami).",
    faqs: [
      {
        question: "¿Se pueden crear fondos de lujo con IA sin enviar la pieza física?",
        answer:
          "Sí. Con fotografías base nítidas de la joya, podemos componer fondos e iluminación de nivel editorial utilizando IA.",
      },
    ],
  },
  {
    slug: "marketing-de-video-para-gimnasios-miami",
    title: "Marketing de video para gimnasios y fitness en Miami",
    metadataTitle: "Video Fitness Gimnasios Miami",
    description:
      "Edición de video dinámico y promocionales para gimnasios, estudios de pilates y entrenadores en Miami.",
    eyebrow: "Fitness / Gimnasios",
    h1: "Videos dinámicos para gimnasios y centros de entrenamiento.",
    lead:
      "Edición de alto impacto y cortes para redes sociales diseñados para captar nuevos miembros en gimnasios y centros fitness de Miami.",
    keyword: "video para gimnasios en Miami",
    location: "Miami-Dade / Broward",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Gimnasios, boxes de CrossFit y estudios de Pilates en Miami.",
      "Entrenadores personales que buscan construir su marca en redes sociales.",
    ],
    scopingQuestions: [
      "¿Deseas promocionar instalaciones, entrenamientos o testimoniales de alumnos?",
      "¿El video irá destinado a Reels de Instagram o anuncios pagados?",
    ],
    projectFit:
      "Edición rítmica con música de alta energía y títulos dinámicos.",
    sectionsDisclosure: "Precios y qué grabar primero",
    updated: "2026-10-07",
    sections: [
      {
        heading: "¿Cuánto cuesta un video promocional para un gimnasio en Miami?",
        paragraphs: [
          `Si tus entrenadores ya graban con el teléfono, la edición empieza desde ${esStarterFrom} por video con el [paquete Arranque](/es/precios/arranque): edición remota, formato para Reels, TikTok, YouTube o web y una ronda de revisión. Si el gimnasio publica cada semana, la calculadora pone el video corto en ${esWeekly}. Las dos cifras son precios de partida, y la cotización por escrito fija el alcance real.`,
          "El precio cambia con tres cosas: cuánto material bruto hay, cuántas versiones terminadas necesitas (un anuncio de 30 segundos y tres cortes verticales son cuatro entregables, no uno) y si hay que grabar algo. Un gimnasio que envía clips ordenados y una indicación clara queda en la parte baja de la banda.",
        ],
      },
      {
        heading: "¿Cuánto cuesta grabar en el gimnasio o el estudio?",
        paragraphs: [
          `La grabación en sitio va por [Presencia Local](/es/precios/presencia-local), desde ${esLocalFrom} por día de producción. Incluye preproducción, captura en locación, edición posterior y entregables según formato, en Fort Lauderdale, Broward y proyectos seleccionados en Miami-Dade. Existe además un complemento de media jornada de captura con un rango orientativo de ${esHalfDayBand}, con la misma base. No se suman: son dos maneras distintas de cotizar la misma necesidad.`,
          "Una grabación en un gimnasio es más fácil de cotizar cuando el horario está decidido de antemano: qué clase, a qué hora, qué entrenadores y si habrá miembros en cuadro. Las horas tranquilas hacen la grabación más rápida y eliminan casi todas las dudas de permiso. Envía ese horario con la solicitud.",
        ],
      },
      {
        heading: "¿Cuánto cuesta un plan mensual de contenido para un gimnasio?",
        paragraphs: [
          `Para un gimnasio que quiere publicar cada semana y no una sola vez, el [plan Crecimiento](/es/precios/crecimiento) empieza desde ${esGrowthFrom} al mes. Incluye plan de contenido, calendario de publicación, edición y reporte mensual. Encaja con un estudio que ya graba clases y entrenadores pero no tiene a nadie encargado de convertir esos clips en publicaciones constantes.`,
          "Un plan mensual solo funciona si el material sigue llegando. La rutina más simple es un bloque de grabación por semana, reunido en una carpeta compartida, con una línea por clip que diga quién aparece y si dio permiso. Si no sabes qué ruta te conviene, compáralas en la [calculadora](/es/calculadora) y luego pide una cotización por escrito en [contacto](/es/contacto).",
        ],
      },
      {
        heading: "¿Qué debe grabar primero un gimnasio, un entrenador o un estudio de pilates?",
        paragraphs: [
          "Lo que pone nervioso a un miembro nuevo. Para un gimnasio suele ser el espacio a una hora normal y cómo es la primera sesión; para un entrenador personal, cómo transcurre de verdad una sesión; para un estudio de yoga o pilates, el formato de la clase y el equipo. Graba una toma de cada cosa desde una posición fija y estable, sin perseguir momentos a pulso.",
          "Dos reglas ahorran casi todas las correcciones. Primero, pregunta antes de grabar a alguien: quien entrena no aceptó aparecer en una cuenta de negocio por entrar al gimnasio, así que anota quién dijo sí y envía la nota con los clips. Segundo, envía los archivos originales del teléfono o la cámara, no copias guardadas desde una app de mensajería, que ya perdieron detalle.",
        ],
      },
      {
        heading: "¿Qué trabajos de fitness hay en el portafolio de Esteban?",
        paragraphs: [
          "Dos marcas de entrenamiento, y los dos proyectos son web, no son video. [Gains From Geebs](/es/portafolio/gains-from-geebs) es una plataforma web interactiva de fitness con un bot de IA para Instagram DM que atiende consultas sobre planes de entrenamiento y nutrición y califica prospectos. [TitanForge](/es/portafolio/titanforge) es una plataforma web con un bot conversacional para calificar prospectos, agendar y registrar clientes.",
          "El trabajo grabado más cercano es [Healthy Smile Miami](/es/portafolio/healthy-smile): videos para redes de una clínica dental de Miami, donde Esteban grabó en el lugar, video y sonido, y luego editó y entregó las piezas. Una clínica en funcionamiento y un gimnasio abierto comparten las mismas limitaciones: clientes reales, poco tiempo y un espacio que no puede cerrar.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Incluyen música libre de derechos para redes sociales?",
        answer:
          "Sí. La música se elige para la plataforma donde se publicará el video, y para anuncios pagados el negocio confirma los derechos de uso antes de publicar.",
      },
    ],
  },
  {
    slug: "videografo-para-eventos-corporativos-miami",
    title: "Videógrafo para eventos corporativos en Miami",
    metadataTitle: "Video Eventos Corporativos Miami",
    description:
      "Grabación en sitio y edición de resumen de eventos corporativos, conferencias y exposiciones en Miami.",
    eyebrow: "Eventos Corporativos",
    h1: "Cobertura en video y resumen de eventos corporativos en Miami.",
    lead:
      "Captura en video y edición rápida de recaps para convenciones, lanzamientos de marca y conferencias en Miami.",
    keyword: "video de eventos corporativos en Miami",
    location: "Miami Convention Center / Downtown Miami",
    availability: "confirmed",
    icon: Camera,
    bestFor: [
      "Empresas que organizan conferencias o convenciones en Miami.",
      "Marcas corporativas que requieren un video resumen (aftermovie) de su evento.",
    ],
    scopingQuestions: [
      "¿El evento es de un solo día o de varios días de duración?",
      "¿Requieres entrega de resumen rápido durante el evento?",
    ],
    projectFit:
      "Cobertura limpia y profesional coordinada con la agenda de tu evento.",
    updated: "2026-10-07",
    sections: CORPORATE_EVENT_ES_SECTIONS,
    sectionsDisclosure: CORPORATE_EVENT_ES_DISCLOSURE,
    sectionsDestinations: CORPORATE_EVENT_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Pueden entregar un teaser el mismo día del evento?",
        answer:
          "No se promete. La calculadora aplica un multiplicador exprés a la entrega rápida, pero el plazo real se confirma antes del evento según el material y la agenda. Indica la fecha de publicación que necesitas al pedir la cotización.",
      },
      {
        question: "¿Cómo se graban las entrevistas y testimonios durante el networking?",
        answer:
          "Se utiliza una cámara ligera en mano con micrófono direccional de bastón o solapa inalámbrico, acercándose a los participantes de forma fluida para registrar respuestas cortas y naturales sin interrumpir la dinámica del evento.",
      },
      {
        question: "¿Es posible grabar una conferencia o evento corporativo durante 8 a 10 horas continuas?",
        answer:
          "Sí. La cobertura de jornada completa opera con rotación continua de baterías y doble tarjeta de memoria en cámara para asegurar grabación ininterrumpida de ponencias, paneles y actividades vespertinas.",
      },
      {
        question: "¿La grabación puede incluir traslados a cenas o actividades en yate?",
        answer:
          "Sí. Eventos corporativos con itinerarios múltiples que pasan del centro de convenciones a cócteles o recorridos en embarcaciones se coordinan dentro del plan de rodaje con equipo adaptado para tomas nocturnas.",
      },
    ],
  },
  {
    slug: "videografo-para-eventos-corporativos-fort-lauderdale",
    title: "Videógrafo para eventos corporativos en Fort Lauderdale",
    metadataTitle: "Video Eventos Fort Lauderdale",
    description:
      "Grabación y edición de video para eventos corporativos, conferencias y exposiciones en Fort Lauderdale y Broward.",
    eyebrow: "Eventos Corporativos Fort Lauderdale",
    h1: "Videografía y edición para conferencias y eventos en Fort Lauderdale.",
    lead:
      "Cobertura profesional en video para convenciones, reuniones empresariales y conferencias en Fort Lauderdale y el Condado de Broward.",
    keyword: "video de eventos corporativos en Fort Lauderdale",
    location: "Fort Lauderdale / Broward",
    availability: "confirmed",
    icon: Camera,
    bestFor: [
      "Empresas y organizaciones que realizan conferencias o convenciones en Broward.",
      "Marcas que necesitan un video resumen profesional (aftermovie) de su evento.",
    ],
    scopingQuestions: [
      "¿El evento se realiza en un hotel, centro de convenciones o espacio privado?",
      "¿Cuántas horas de cobertura continua se requieren en el programa?",
    ],
    projectFit:
      "Cobertura ágil y profesional coordinada con la agenda de tu evento en Fort Lauderdale.",
    updated: "2026-10-18",
    sections: CORPORATE_EVENT_FTL_ES_SECTIONS,
    sectionsDisclosure: CORPORATE_EVENT_FTL_ES_DISCLOSURE,
    sectionsDestinations: CORPORATE_EVENT_FTL_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿El servicio en Fort Lauderdale incluye costos adicionales de traslado?",
        answer:
          "No. Esteban tiene su base en Fort Lauderdale, por lo que las locaciones en el Centro de Convenciones de Broward, Las Olas y hoteles de la zona no tienen recargos de viaje.",
      },
      {
        question: "¿Cómo se capturan las entrevistas espontáneas durante el networking?",
        answer:
          "Se utiliza una cámara ligera en mano con micrófono direccional tipo bastón o solapa inalámbrico, permitiendo interactuar con los asistentes de forma rápida y natural.",
      },
      {
        question: "¿Es posible filmar una conferencia durante 8 a 10 horas seguidas?",
        answer:
          "Sí. La cobertura de jornada completa opera con rotación continua de baterías y doble tarjeta de memoria en cámara para asegurar grabación ininterrumpida de ponencias y actividades.",
      },
    ],
  },
  {
    slug: "videografo-para-eventos-de-networking-miami",
    title: "Videógrafo para eventos de networking en Miami",
    metadataTitle: "Video Networking Miami",
    description:
      "Grabación de video y entrevistas para encuentros de networking, cócteles de negocios y mixers corporativos en Miami.",
    eyebrow: "Eventos de Networking Miami",
    h1: "Video para eventos de networking y cócteles de negocios en Miami.",
    lead:
      "Captura de ambiente, entrevistas breves a participantes y videos resumen para mixers empresariales y conferencias en Miami.",
    keyword: "videógrafo para eventos de networking en Miami",
    location: "Miami-Dade / Broward / Remoto",
    availability: "confirmed",
    icon: Handshake,
    bestFor: [
      "Organizadores de mixers de negocios, encuentros de fundadores y cócteles corporativos.",
      "Empresas que desean reels dinámicos con testimonios espontáneos de asistentes.",
    ],
    scopingQuestions: [
      "¿El espacio cuenta con música de fondo o zona silenciosa para entrevistas?",
      "¿Deseas un resumen general o cápsulas individuales de testimonios para redes?",
    ],
    projectFit:
      "Grabación dinámica y cercana sin interrumpir las conversaciones entre invitados.",
    updated: "2026-10-18",
    sections: NETWORKING_EVENT_ES_SECTIONS,
    sectionsDisclosure: NETWORKING_EVENT_ES_DISCLOSURE,
    sectionsDestinations: NETWORKING_EVENT_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Qué formato de video funciona mejor para un evento de networking?",
        answer:
          "Un video resumen dinámico de 60 a 90 segundos para LinkedIn y la web, complementado con 2 a 3 clips verticales breves con testimonios de asistentes para Instagram y TikTok.",
      },
      {
        question: "¿Cómo se asegura audio claro con el ruido del salón y música ambiente?",
        answer:
          "Se utiliza un micrófono de mano dinámico o solapas inalámbricas colocadas muy cerca del ponente, lo que aísla la voz y mantiene el murmullo ambiental como energía positiva.",
      },
      {
        question: "¿Se pueden filmar entrevistas con patrocinadores y asistentes destacados?",
        answer:
          "Sí. Se coordinan preguntas cortas previamente con la organización para capturar impresiones puntuales de 30 a 45 segundos durante los descansos y cócteles.",
      },
    ],
  },
  {
    slug: "videografo-de-bodas-miami",
    title: "Videógrafo de bodas en Miami",
    metadataTitle: "Video de Bodas Miami",
    description:
      "Video de bodas y trailers destacados filmados y editados por Esteban Moreno en Miami. Cada boda se cotiza individualmente según las horas de rodaje.",
    eyebrow: "Bodas y Celebraciones Miami",
    h1: "Video de bodas y películas cinematográficas en Miami.",
    lead:
      "Películas de boda, trailers destacados y cobertura de ceremonia filmados en Miami y Coral Gables con narrativa cinematográfica.",
    keyword: "videógrafo de bodas en Miami",
    location: "Miami-Dade / Remoto",
    availability: "confirmed",
    icon: Heart,
    bestFor: [
      "Parejas que buscan una película cinematográfica con sonido profesional de sus votos.",
      "Celebraciones en hoteles, fincas y playas de Miami y Coral Gables.",
    ],
    scopingQuestions: [
      "¿La ceremonia y la recepción se celebran en la misma sede o en lugares distintos?",
      "¿Desean un resumen corto para redes o la película completa del día?",
    ],
    projectFit:
      "Cobertura sensible y cuidada para registrar cada momento clave y espontáneo de la boda.",
    updated: "2026-10-18",
    sections: WEDDING_MIAMI_ES_SECTIONS,
    sectionsDisclosure: WEDDING_MIAMI_ES_DISCLOSURE,
    sectionsDestinations: WEDDING_MIAMI_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo se define el precio de un video de bodas en Miami?",
        answer:
          "Cada boda se cotiza de forma individualizada según las horas de cobertura, la logística de traslado entre sedes y los formatos de entrega deseados.",
      },
      {
        question: "¿Qué equipo de grabación se utiliza en las bodas?",
        answer:
          "Se emplean cámaras Sony Alpha de sensor completo, lentes luminosos para recepciones de noche, estabilizadores y micrófonos inalámbricos discretos para los votos.",
      },
      {
        question: "¿Pueden editar material grabado por otro profesional?",
        answer:
          "Sí. Esteban ofrece servicio de edición para metraje grabado por familiares u otros videógrafos, sincronizando ceremonias multicámara y discursos.",
      },
    ],
  },
  {
    slug: "videografo-para-vlogs-miami",
    title: "Videógrafo para vlogs en Miami",
    metadataTitle: "Videógrafo para Vlogs Miami",
    description:
      "Videógrafo para vlogs y canales de YouTube en Miami con estabilización de cámara, audio inalámbrico y edición dinámica para creadores de contenido.",
    eyebrow: "Creadores de Contenido / YouTube",
    h1: "Videógrafo para vlogs y canales de YouTube en Miami.",
    lead:
      "Filmación en exteriores, seguimiento en movimiento y sonido inalámbrico nítido para vlogs y creadores de contenido en Miami.",
    keyword: "videógrafo para vlogs en Miami",
    location: "Miami-Dade / Remoto",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Creadores de YouTube que necesitan un camarógrafo dedicado en locación.",
      "Emprendedores y marcas personales que documentan su día a día en Miami.",
    ],
    scopingQuestions: [
      "¿Las grabaciones son en espacios públicos, restaurantes o estudios?",
      "¿Requieres solo el metraje bruto organizado o la edición completa del episodio?",
    ],
    projectFit:
      "Filmación ágil y ligera para creadores que necesitan movilidad sin equipos invasivos.",
    updated: "2026-10-18",
    sections: VLOG_VIDEOGRAPHER_ES_SECTIONS,
    sectionsDisclosure: VLOG_VIDEOGRAPHER_ES_DISCLOSURE,
    sectionsDestinations: VLOG_VIDEOGRAPHER_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo se contrata y cotiza la filmación de un vlog?",
        answer:
          "El rodaje se puede reservar por horas según el alcance o en jornadas de medio día y día completo para acumular varias entregas de material.",
      },
      {
        question: "¿Se entregan episodios terminados o los archivos originales?",
        answer:
          "Ambas opciones están disponibles: entrega de material bruto organizado para edición interna o postproducción completa con ganchos, música y cortes verticales.",
      },
      {
        question: "¿Es posible grabar en calles y restaurantes de Miami?",
        answer:
          "Sí. El uso de equipos compactos de mano permite grabar con naturalidad en Wynwood y locales de la ciudad sin obstaculizar a los clientes.",
      },
    ],
  },
  {
    slug: "videografo-para-conferencias-fort-lauderdale",
    title: "Videógrafo para conferencias en Fort Lauderdale",
    metadataTitle: "Video Conferencias Fort Lauderdale",
    description:
      "Videografía para conferencias y convenciones en Fort Lauderdale y Broward: discursos principales, paneles de discusión y resúmenes de video para eventos.",
    eyebrow: "Conferencias / Convenciones Fort Lauderdale",
    h1: "Videógrafo para conferencias y convenciones en Fort Lauderdale.",
    lead:
      "Grabación de ponencias magistrales, paneles de expertos y videos resumen para convenciones empresariales en Fort Lauderdale y Broward.",
    keyword: "videógrafo para conferencias en Fort Lauderdale",
    location: "Fort Lauderdale / Broward",
    availability: "confirmed",
    icon: CalendarRange,
    bestFor: [
      "Empresas y asociaciones que organizan congresos en el Centro de Convenciones de Broward.",
      "Organizadores que necesitan conferencias archivadas y reels para redes sociales.",
    ],
    scopingQuestions: [
      "¿Se requiere conexión directa a la consola de audio del salón?",
      "¿Cuántas salas o ponencias simultáneas necesitan registro?",
    ],
    projectFit:
      "Cobertura técnica confiable con respaldo continuo de energía y audio para congresos.",
    updated: "2026-10-18",
    sections: CONFERENCE_VIDEOGRAPHER_ES_SECTIONS,
    sectionsDisclosure: CONFERENCE_VIDEOGRAPHER_ES_DISCLOSURE,
    sectionsDestinations: CONFERENCE_VIDEOGRAPHER_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo se garantiza el audio de los conferencistas en salones grandes?",
        answer:
          "Se toma una señal directa de la mesa de mezclas del auditorio mediante cable XLR y se complementa con micrófonos de solapa inalámbricos en el atril.",
      },
      {
        question: "¿Se pueden cubrir jornadas completas o eventos de varios días?",
        answer:
          "Sí. Se opera con estaciones de carga rotativas y grabación redundante en dos tarjetas de memoria para cubrir jornadas continuas de 8 a 10 horas.",
      },
      {
        question: "¿Se cobran gastos de desplazamiento en Fort Lauderdale?",
        answer:
          "No. Esteban tiene base local en Fort Lauderdale, prestando servicio en todo el Condado de Broward sin recargo por traslado.",
      },
    ],
  },
  {
    slug: "videografo-para-entrevistas-ejecutivas-miami",
    title: "Videógrafo para entrevistas ejecutivas en Miami",
    metadataTitle: "Video Entrevistas Ejecutivas Miami",
    description:
      "Videógrafo para entrevistas ejecutivas y testimonios corporativos en Miami: iluminación profesional, audio doble y edición estructurada para empresas.",
    eyebrow: "Entrevistas Ejecutivas / Testimonios Miami",
    h1: "Video para entrevistas ejecutivas y testimonios corporativos en Miami.",
    lead:
      "Grabación en oficinas corporativas y locaciones de Miami con iluminación suave, microfonía doble y edición enfocada en liderazgo y marca.",
    keyword: "videógrafo para entrevistas ejecutivas en Miami",
    location: "Miami-Dade / Broward / Remoto",
    availability: "confirmed",
    icon: Building2,
    bestFor: [
      "Directivos y fundadores que comunican su visión en LinkedIn y medios corporativos.",
      "Empresas que producen casos de estudio y testimonios en video con clientes clave.",
    ],
    scopingQuestions: [
      "¿La filmación se realiza en la oficina del cliente o en un espacio alquilado?",
      "¿Se requiere teleprónter o se prefiere una entrevista conversacional guiada?",
    ],
    projectFit:
      "Puesta en escena profesional que transmite confianza y autoridad ejecutiva en video.",
    updated: "2026-10-18",
    sections: EXECUTIVE_INTERVIEW_ES_SECTIONS,
    sectionsDisclosure: EXECUTIVE_INTERVIEW_ES_DISCLOSURE,
    sectionsDestinations: EXECUTIVE_INTERVIEW_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Dónde se pueden realizar las entrevistas ejecutivas?",
        answer:
          "En salas de conferencias, oficinas corporativas o espacios de co-working en Miami-Dade y Broward con adecuada insonorización.",
      },
      {
        question: "¿Cómo ayudan a directivos que no tienen experiencia ante la cámara?",
        answer:
          "Las preguntas se formulan fuera de encuadre en tono de conversación guiada, permitiendo respuestas naturales y seguras sin memorizar textos.",
      },
      {
        question: "¿Se entregan fragmentos breves para publicaciones en LinkedIn?",
        answer:
          "Sí. Además de la entrevista completa, se editan cápsulas verticales de 60 segundos con subtítulos y rótulos corporativos optimizadas para LinkedIn.",
      },
    ],
  },
  {
    slug: "videografo-para-eventos-en-yates-miami",
    title: "Videógrafo para eventos en yates en Miami",
    metadataTitle: "Video de Eventos en Yates Miami",
    description:
      "Videografía profesional para fiestas privadas, paseos al atardecer y eventos corporativos a bordo de yates y barcos en Miami y Fort Lauderdale.",
    eyebrow: "Náutica / Eventos en Yates Miami",
    h1: "Videógrafo para eventos y fiestas privadas en yates en Miami.",
    lead:
      "Captura cinematográfica y estabilizada a bordo de embarcaciones privadas y chárteres en la Bahía de Biscayne y South Florida.",
    keyword: "videógrafo para eventos en yates en Miami",
    location: "Miami / Fort Lauderdale / Biscayne Bay",
    availability: "confirmed",
    icon: PartyPopper,
    bestFor: [
      "Empresas que celebran cenas y cócteles corporativos en embarcaciones privadas.",
      "Celebraciones privadas, cumpleaños y eventos exclusivos en la Bahía de Biscayne.",
    ],
    scopingQuestions: [
      "¿El evento es un paseo diurno o una celebración nocturna?",
      "¿Necesitas tomas de ambiente o también discursos y entrevistas a bordo?",
    ],
    projectFit:
      "Grabación ligera y estabilizada que no incomoda a los invitados en cubierta.",
    updated: "2026-10-18",
    sections: YACHT_EVENT_ES_SECTIONS,
    sectionsDisclosure: YACHT_EVENT_ES_DISCLOSURE,
    sectionsDestinations: YACHT_EVENT_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo se cotiza la videografía para un evento en barco o yate?",
        answer:
          "Cada salida se cotiza según las horas de navegación, los requerimientos de audio para discursos y los videos finales acordados.",
      },
      {
        question: "¿Qué equipo se utiliza para evitar tomas movidas en el agua?",
        answer:
          "Se emplean cámaras de cuadro completo con estabilizadores electrónicos de tres ejes que compensan el movimiento de la embarcación.",
      },
      {
        question: "¿Se entrega un video resumen para redes o el metraje completo?",
        answer:
          "Ambas opciones son posibles: un resumen dinámico de sesenta segundos con música para redes y los archivos originales organizados.",
      },
    ],
  },
  {
    slug: "videografo-para-dia-de-contenido-miami",
    title: "Videógrafo para día de contenido en Miami",
    metadataTitle: "Día de Contenido Miami",
    description:
      "Jornada de grabación de contenido en Miami: filmación intensiva de videos cortos, reels y shorts en lote para marcas y profesionales.",
    eyebrow: "Lote de Contenido / Redes Sociales",
    h1: "Jornadas de grabación de contenido en lote para marcas en Miami.",
    lead:
      "Produce un mes de videos para redes en una sola sesión de rodaje con cámara profesional, iluminación suave y sonido inalámbrico.",
    keyword: "videógrafo para día de contenido en Miami",
    location: "Miami-Dade / Broward",
    availability: "confirmed",
    icon: Megaphone,
    bestFor: [
      "Fundadores y negocios que necesitan múltiples videos sin grabar cada semana.",
      "Asesores y marcas que buscan consistencia en Reels, TikTok y YouTube Shorts.",
    ],
    scopingQuestions: [
      "¿Tienes definidos los guiones o requieres ayuda con los temas y ganchos?",
      "¿La filmación se realiza en tu oficina o en exteriores en Miami?",
    ],
    projectFit:
      "Producción estructurada para acumular entre ocho y dieciséis piezas en una sesión.",
    updated: "2026-10-18",
    sections: CONTENT_DAY_ES_SECTIONS,
    sectionsDisclosure: CONTENT_DAY_ES_DISCLOSURE,
    sectionsDestinations: CONTENT_DAY_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo se prepara una empresa para una jornada de contenido?",
        answer:
          "Se define una lista de preguntas frecuentes y objeciones habituales de clientes, organizando los mensajes en puntos breves antes del rodaje.",
      },
      {
        question: "¿Cuántos videos se pueden grabar en una sesión de medio día?",
        answer:
          "Con temas claros se suelen filmar entre ocho y dieciséis videos verticales con tomas de apoyo y ganchos alternativos.",
      },
      {
        question: "¿Incluye la edición de los videos o solo la filmación?",
        answer:
          "Se puede contratar la jornada de rodaje con entrega de archivos brutos o el paquete completo con subtítulos y cortes finales.",
      },
    ],
  },
  {
    slug: "edicion-de-video-remota-colombia",
    title: "Edición de video remota para empresas en Colombia",
    metadataTitle: "Edición de Video Remota Colombia",
    description:
      "Servicio de postproducción y edición de video remota para empresas, agencias y creadores en Colombia con estándares internacionales y entrega ágil.",
    eyebrow: "Postproducción Remota / Colombia",
    h1: "Edición de video remota para empresas y creadores en Colombia.",
    lead:
      "Postproducción profesional en español nativo desde Florida para empresas en Bogotá, Medellín y toda Colombia.",
    keyword: "edición de video remota en Colombia",
    location: "Remoto / Bogotá / Medellín",
    availability: "confirmed",
    icon: Laptop,
    bestFor: [
      "Startups y marcas colombianas que necesitan videos corporativos y comerciales.",
      "Agencias y creadores de contenido que buscan tercerizar la postproducción de video.",
    ],
    scopingQuestions: [
      "¿El material grabado se encuentra alojado en Google Drive o Dropbox?",
      "¿Buscas videos horizontales para web o clips verticales para redes sociales?",
    ],
    projectFit:
      "Flujo de trabajo en la nube con revisión interactiva y comunicación directa.",
    updated: "2026-10-18",
    sections: REMOTE_EDITING_COLOMBIA_ES_SECTIONS,
    sectionsDisclosure: REMOTE_EDITING_COLOMBIA_ES_DISCLOSURE,
    sectionsDestinations: REMOTE_EDITING_COLOMBIA_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo se gestiona el envío de grabaciones desde Colombia?",
        answer:
          "Los archivos se comparten a través de carpetas en Google Drive o Frame.io, organizados por proyectos con audios y logotipos de marca.",
      },
      {
        question: "¿Cómo se coordinan las revisiones y correcciones de los videos?",
        answer:
          "Se envían enlaces de revisión interactivos donde el equipo cliente puede marcar comentarios con marcas de tiempo exactas.",
      },
      {
        question: "¿Qué modalidades de contratación existen para clientes internacionales?",
        answer:
          "Se ofrecen paquetes mensuales por volumen de videos o cotizaciones por proyecto individual con facturación directa en dólares.",
      },
    ],
  },
  {
    slug: "servicio-de-subtitulado-bilingue-de-video",
    title: "Servicio de subtitulado bilingüe de video",
    metadataTitle: "Subtitulado Bilingüe de Video",
    description:
      "Subtitulado bilingüe profesional en inglés y español para videos corporativos, conferencias, cursos online y redes sociales.",
    eyebrow: "Subtítulos Bilingües / EN y ES",
    h1: "Subtitulado bilingüe profesional en inglés y español para video.",
    lead:
      "Traducción precisa, sincronización milimétrica y diseño de subtítulos legibles para audiencias bilingües en Estados Unidos y Latinoamérica.",
    keyword: "servicio de subtitulado bilingüe de video",
    location: "Remoto / Miami / Fort Lauderdale",
    availability: "confirmed",
    icon: Languages,
    bestFor: [
      "Empresas con audiencias bilingües en Estados Unidos y mercados internacionales.",
      "Capacitaciones corporativas, ponencias y entrevistas que requieren máxima claridad.",
    ],
    scopingQuestions: [
      "¿Necesitas subtítulos incrustados en la imagen o archivos SRT independientes?",
      "¿El audio original está en inglés, en español o en ambos idiomas?",
    ],
    projectFit:
      "Traducción contextual y formateo dentro de zonas seguras de pantalla.",
    updated: "2026-10-18",
    sections: BILINGUAL_SUBTITLING_ES_SECTIONS,
    sectionsDisclosure: BILINGUAL_SUBTITLING_ES_DISCLOSURE,
    sectionsDestinations: BILINGUAL_SUBTITLING_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cuál es la ventaja de la traducción humana sobre los subtítulos automáticos?",
        answer:
          "La revisión humana asegura que términos técnicos y giros lingüísticos se traduzcan con precisión sin errores que confundan a la audiencia.",
      },
      {
        question: "¿En qué formatos se entregan los subtítulos terminados?",
        answer:
          "Se entregan grabados sobre el video en alta definición o en archivos de texto sincronizado SRT para plataformas web.",
      },
      {
        question: "¿Cómo se adaptan los subtítulos a videos verticales en redes?",
        answer:
          "Los textos se ajustan en tamaño y posición para no ser tapados por botones de redes sociales o descripciones de usuario.",
      },
      {
        question: "¿Cuánto cuesta el servicio de subtitulado bilingüe en inglés y español?",
        answer:
          `El subtitulado bilingüe y formateo de videos cortos parte desde ${usd(SHORT_FORM.perVideoFrom)} por video dentro del paquete Arranque, entregando archivos SRT y cortes con subtítulos quemados dentro de zonas seguras. Para conferencias, webinars o videos corporativos de mayor duración, la cotización se ajusta por minuto de audio.`,
      },
      {
        question: "¿Cuál es el plazo habitual de entrega para subtítulos bilingües?",
        answer:
          "Para videos cortos de hasta 60 segundos, la entrega se realiza en 24 a 48 horas hábiles. Para capacitaciones o ponencias de 15 a 45 minutos, el plazo estándar es de 3 a 5 días hábiles incluyendo revisión humana de terminología especializada.",
      },
    ],
  },
  {
    slug: "videografo-para-ferias-comerciales-fort-lauderdale",
    title: "Videógrafo para ferias comerciales en Fort Lauderdale",
    metadataTitle: "Video para Ferias Comerciales",
    description:
      "Videografía profesional para stands de exhibición, ferias comerciales y convenciones en Fort Lauderdale y Miami con equipo estabilizado 4K.",
    eyebrow: "Ferias Comerciales / Stands B2B",
    h1: "Videógrafo para ferias comerciales y stands de exhibición en Fort Lauderdale.",
    lead:
      "Captura dinámica de demostraciones de producto, afluencia en stands y presentaciones corporativas en el Centro de Convenciones de Broward y Miami.",
    keyword: "videógrafo para ferias comerciales en Fort Lauderdale",
    location: "Fort Lauderdale / Broward / Miami",
    availability: "confirmed",
    icon: Building2,
    bestFor: [
      "Empresas expositoras en centros de convenciones que buscan demostrar retorno de inversión.",
      "Marcas B2B que necesitan material audiovisual de producto para difusión en LinkedIn.",
    ],
    scopingQuestions: [
      "¿En qué centro de convenciones o pabellón ferial se ubica su stand?",
      "¿Requiere demostraciones de producto a cámara o cobertura general del flujo de visitantes?",
    ],
    projectFit:
      "Grabación ágil con estabilizador de tres ejes que no interrumpe el tránsito de asistentes.",
    updated: "2026-10-18",
    sections: TRADE_SHOW_BOOTH_ES_SECTIONS,
    sectionsDisclosure: TRADE_SHOW_BOOTH_ES_DISCLOSURE,
    sectionsDestinations: TRADE_SHOW_BOOTH_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo se graba en los stands de ferias sin interrumpir las conversaciones con clientes?",
        answer:
          "Se utilizan cámaras de cuadro completo sobre estabilizadores compactos que permiten desplazarse con agilidad por pasillos concurridos sin obstaculizar el paso ni interrumpir reuniones comerciales.",
      },
      {
        question: "¿Qué elementos visuales se registran durante la cobertura del pabellón ferial?",
        answer:
          "La filmación incluye demostraciones de producto en directo, afluencia de visitantes al stand, pantallas interactivas, señalética de marca y presentaciones de conferencias.",
      },
      {
        question: "¿Se pueden entregar videos para publicar mientras la convención sigue en marcha?",
        answer:
          "Sí. Es posible entregar cortes destacados y cápsulas verticales optimizadas para LinkedIn y redes sociales para que el equipo de marketing difunda avances durante los días del evento.",
      },
    ],
  },
  {
    slug: "videografo-para-galas-corporativas-miami",
    title: "Videógrafo para galas corporativas en Miami",
    metadataTitle: "Video de Galas Corporativas Miami",
    description:
      "Videografía cinematográfica para galas corporativas, cenas benéficas y eventos de recaudación de fondos en Miami y Palm Beach.",
    eyebrow: "Galas Benéficas / Cenas de Etiqueta",
    h1: "Videógrafo para galas corporativas y cenas benéficas en Miami.",
    lead:
      "Cobertura cinematográfica en salones de etiqueta, registro de discursos con audio de consola y recaps de alto impacto para donantes.",
    keyword: "videógrafo para galas corporativas en Miami",
    location: "Miami / Coral Gables / Palm Beach",
    availability: "confirmed",
    icon: PartyPopper,
    bestFor: [
      "Fundaciones y organizaciones sin fines de lucro que celebran galas anuales de recaudación.",
      "Empresas e instituciones que entregan premios y reconocimientos en cenas de etiqueta.",
    ],
    scopingQuestions: [
      "¿El evento incluye subasta benéfica en vivo o intervenciones formales en podio?",
      "¿El salón cuenta con equipo propio de audio para toma directa de sonido?",
    ],
    projectFit:
      "Cámaras de cuadro completo de alta sensibilidad para entornos con iluminación tenue de banquetes.",
    updated: "2026-10-18",
    sections: CORPORATE_GALA_ES_SECTIONS,
    sectionsDisclosure: CORPORATE_GALA_ES_DISCLOSURE,
    sectionsDestinations: CORPORATE_GALA_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo se gestiona la iluminación tenue en salones de banquetes sin molestar a los invitados?",
        answer:
          "Se utilizan sensores de cuadro completo con ópticas muy luminosas que registran el ambiente del salón, las luces del escenario y las mesas sin necesidad de focos frontales invasivos.",
      },
      {
        question: "¿Cómo se graba el audio de discursos, entregas de premios y subastas benéficas?",
        answer:
          "El sonido se conecta directamente a la mesa de audio del evento, respaldado con transmisores inalámbricos en el podio para garantizar una grabación limpia y sin reverberación del salón.",
      },
      {
        question: "¿Qué entregables se preparan habitualmente para galas y recaudaciones de fondos?",
        answer:
          "Se edita una película resumen de dos minutos orientada a patrocinadores y donantes, junto con el registro completo de intervenciones en tarima y cápsulas cortas para redes sociales.",
      },
    ],
  },
  {
    slug: "marketing-de-video-para-superyates-fort-lauderdale",
    title: "Marketing de video para superyates en Fort Lauderdale",
    metadataTitle: "Video Marketing para Superyates",
    description:
      "Producción audiovisual de lujo para chárteres de superyates y corretaje náutico en Fort Lauderdale con cinematografía de interiores y navegación.",
    eyebrow: "Náutica de Lujo / Superyacht Charter",
    h1: "Marketing de video cinematográfico para superyates en Fort Lauderdale.",
    lead:
      "Cinematografía especializada en navegación, interiores de lujo y hospitalidad a bordo para corredores y agencias de chárter náutico.",
    keyword: "marketing de video para superyates en Fort Lauderdale",
    location: "Fort Lauderdale / Bahia Mar / South Florida",
    availability: "confirmed",
    icon: Anchor,
    bestFor: [
      "Corredores marítimos y agencias de gestión de chárter que comercializan embarcaciones de lujo.",
      "Armadores y capitanes que buscan material audiovisual de nivel internacional para promoción de temporada.",
    ],
    scopingQuestions: [
      "¿La sesión se realizará con la embarcación atracada en marina o durante una salida de navegación?",
      "¿Se requiere filmar el servicio de mesa y la preparación de camarotes por parte de la tripulación?",
    ],
    projectFit:
      "Ópticas gran angular de precisión y calzado náutico para el cuidado de cubiertas de teca.",
    updated: "2026-10-18",
    sections: SUPERYACHT_CHARTER_ES_SECTIONS,
    sectionsDisclosure: SUPERYACHT_CHARTER_ES_DISCLOSURE,
    sectionsDestinations: SUPERYACHT_CHARTER_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo se graban interiores estrechos, camarotes y salas de máquinas en embarcaciones de gran porte?",
        answer:
          "Se emplean objetivos angulares de baja distorsión y estabilizadores compactos que recorren pasillos, camarotes principales y cocinas manteniendo la escala real y las líneas arquitectónicas.",
      },
      {
        question: "¿Cómo se muestra el servicio de la tripulación y las comodidades a bordo?",
        answer:
          "La producción se coordina con el capitán y la tripulación para filmar montajes de cenas gourmet, navegación en lanchas auxiliares, preparación de deportes acuáticos y servicio al atardecer.",
      },
      {
        question: "¿Qué formatos se entregan para corredores náuticos y portales de chárter internacional?",
        answer:
          "Se entregan videos cinematográficos horizontales para portales náuticos y sitios web de agencias, junto con avances verticales en alta definición para campañas en redes sociales.",
      },
    ],
  },
  {
    slug: "videografo-para-cena-de-ensayo-miami",
    title: "Videógrafo para cena de ensayo en Miami",
    metadataTitle: "Video de Cena de Ensayo Miami",
    description:
      "Cobertura cinematográfica documental de cenas de ensayo, cócteles de bienvenida y brindis familiares para bodas en Miami y Coral Gables.",
    eyebrow: "Bodas / Cena de Ensayo",
    h1: "Videógrafo para cena de ensayo y cóctel de bienvenida en Miami.",
    lead:
      "Captura documental de discursos íntimos, abrazos familiares y cócteles al atardecer en la víspera del día de la boda.",
    keyword: "videógrafo para cena de ensayo en Miami",
    location: "Miami / Coconut Grove / Coral Gables",
    availability: "confirmed",
    icon: UtensilsCrossed,
    bestFor: [
      "Parejas que organizan un fin de semana completo de bodas con cóctel de bienvenida o cena íntima.",
      "Familias que desean conservar los discursos y testimonios emotivos previos a la boda principal.",
    ],
    scopingQuestions: [
      "¿La cena de ensayo se celebrará en un restaurante, terraza al aire libre o residencia privada?",
      "¿Desean un video independiente de discursos o su integración en el documental principal de la boda?",
    ],
    projectFit:
      "Operador único y discreto con microfonía inalámbrica de solapa para registrar discursos sin entorpecer la velada.",
    updated: "2026-10-18",
    sections: REHEARSAL_DINNER_ES_SECTIONS,
    sectionsDisclosure: REHEARSAL_DINNER_ES_DISCLOSURE,
    sectionsDestinations: REHEARSAL_DINNER_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿En qué complementa la cobertura de la cena de ensayo al video del día de la boda?",
        answer:
          "La cena de ensayo registra discursos íntimos y espontáneos de familiares cercanos y amigos en un ambiente relajado, aportando testimonios de gran valor emotivo para la historia completa de la boda.",
      },
      {
        question: "¿Qué microfonía se utiliza para brindis informales en terrazas o restaurantes?",
        answer:
          "Se emplean micrófonos inalámbricos discretos y de mano con protección acústica para que las palabras de los invitados se escuchen nítidas por encima del murmullo del local o la brisa exterior.",
      },
      {
        question: "¿Se pueden incluir fragmentos del cóctel de bienvenida en el trailer de la boda?",
        answer:
          "Sí. Las frases más emotivas y las reacciones de los asistentes en la víspera pueden integrarse en el montaje cinematográfico final, reflejando toda la experiencia del fin de semana festivo.",
      },
    ],
  },
  {
    slug: "videografo-para-masterminds-miami",
    title: "Videógrafo para masterminds y retiros en Miami",
    metadataTitle: "Video para Masterminds Miami",
    description:
      "Videografía profesional para eventos mastermind, retiros de mentoría y seminarios de coaching en Miami con captura discreta 4K.",
    eyebrow: "Masterminds / Retiros de Negocios",
    h1: "Videógrafo para eventos mastermind y retiros de mentoría en Miami.",
    lead:
      "Cobertura cinematográfica en villas de lujo y hoteles ejecutivos, testimonios de participantes y video marketing para convocatorias.",
    keyword: "videógrafo para masterminds en Miami",
    location: "Miami / Downtown Miami / Miami Beach",
    availability: "confirmed",
    icon: Handshake,
    bestFor: [
      "Mentores y coaches que celebran retiros exclusivos en villas o salones ejecutivos de Miami.",
      "Comunidades de negocios de alta inversión que necesitan testimonios en video para futuras ediciones.",
    ],
    scopingQuestions: [
      "¿El retiro se celebra en una residencia privada frente al mar o en un salón de hotel?",
      "¿Desea entrevistas a cámara con los asistentes o cobertura documental de las dinámicas?",
    ],
    projectFit:
      "Operador único con cámara silenciosa de cuadro completo que no rompe la intimidad ni la concentración del grupo.",
    updated: "2026-10-18",
    sections: MASTERMIND_EVENT_ES_SECTIONS,
    sectionsDisclosure: MASTERMIND_EVENT_ES_DISCLOSURE,
    sectionsDestinations: MASTERMIND_EVENT_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo se registran las sesiones íntimas sin incomodar a los participantes?",
        answer:
          "Se utilizan cámaras ligeras de cuadro completo con obturación silenciosa y ópticas discretas, documentando intervenciones y avances sin luces invasivas ni interrupciones.",
      },
      {
        question: "¿Qué piezas se entregan para la venta de próximas convocatorias?",
        answer:
          "Se entrega una película resumen de dos minutos que refleja el entorno exclusivo y la atmósfera del retiro, testimonios breves de alumnos y cápsulas verticales para redes.",
      },
      {
        question: "¿Se pueden grabar entrevistas dinámicas en las pausas de café o junto a la piscina?",
        answer:
          "Sí. Con microfonía direccional de mano se registran impresiones y aprendizajes espontáneos de los participantes durante los descansos y cócteles de networking.",
      },
    ],
  },
  {
    slug: "videografo-para-propuestas-de-matrimonio-miami",
    title: "Videógrafo para propuestas de matrimonio en Miami",
    metadataTitle: "Video de Propuesta de Matrimonio",
    description:
      "Videografía encubierta para propuestas de matrimonio sorpresa en Miami, Vizcaya y playas de South Florida con entrega rápida para redes.",
    eyebrow: "Propuestas de Matrimonio / Compromisos",
    h1: "Videógrafo para propuestas de matrimonio sorpresa en Miami.",
    lead:
      "Filmación a distancia con teleobjetivo, captura de audio nítido de los votos y tráiler vertical para anunciar el compromiso.",
    keyword: "videógrafo para propuestas de matrimonio en Miami",
    location: "Miami / Miami Beach / Coconut Grove",
    availability: "confirmed",
    icon: Heart,
    bestFor: [
      "Parejas que desean documentar el momento exacto de la petición de mano sin que su pareja sospeche.",
      "Organizadores de propuestas que coordinan montajes florales o experiencias en barcos y terrazas.",
    ],
    scopingQuestions: [
      "¿En qué locación exacta de Miami se realizará la propuesta (playa, parque o terraza)?",
      "¿Requieren microfonía oculta para registrar las palabras y votos durante la pedida?",
    ],
    projectFit:
      "Posicionamiento encubierto con teleobjetivo cinematográfico y entrega ágil de video vertical para redes.",
    updated: "2026-10-18",
    sections: SURPRISE_PROPOSAL_ES_SECTIONS,
    sectionsDisclosure: SURPRISE_PROPOSAL_ES_DISCLOSURE,
    sectionsDestinations: SURPRISE_PROPOSAL_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo permanece oculto el videógrafo antes del momento de la propuesta?",
        answer:
          "Mediante teleobjetivos largos situados a distancia prudencial, el operador se mimetiza con turistas o visitantes del parque hasta el instante en que se realiza la pregunta.",
      },
      {
        question: "¿Cómo se capta el sonido en exteriores con viento marino o playas abiertas?",
        answer:
          "Se emplean transmisores inalámbricos en miniatura con protector antiviento de alta densidad, ocultos discretamente en la ropa o en la decoración floral.",
      },
      {
        question: "¿Cuándo reciben las parejas el video para anunciar su compromiso?",
        answer:
          "Se entrega un tráiler vertical de sesenta segundos con acabado cinematográfico en un plazo breve para compartir la noticia en Instagram Reels y TikTok.",
      },
    ],
  },
  {
    slug: "produccion-de-video-reel-para-conferencistas-miami",
    title: "Producción de video reel para conferencistas en Miami",
    metadataTitle: "Video Reel para Conferencistas",
    description:
      "Producción de sizzle reels y videos promocionales para conferencistas, ponentes magistrales y moderadores en Miami y Fort Lauderdale.",
    eyebrow: "Conferencistas / Sizzle Reels",
    h1: "Producción de video reel promocional para conferencistas en Miami.",
    lead:
      "Montaje cinematográfico de intervenciones en escenario, sonido directo de consola, títulos animados y recaps para agencias de conferencias.",
    keyword: "video reel para conferencistas en Miami",
    location: "Miami / Fort Lauderdale / Remoto",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Conferencistas profesionales y autores que buscan ser contratados por agencias y congresos.",
      "Líderes de opinión que necesitan demostrar solvencia escénica y ovación del público en video.",
    ],
    scopingQuestions: [
      "¿Cuenta con grabaciones existentes de múltiples conferencias o requiere filmación en un evento próximo?",
      "¿El reel debe incluir testimonios de organizadores y títulos animados de libros o logros?",
    ],
    projectFit:
      "Edición rítmica y armonización de metrajes heterogéneos con mezcla de sonido profesional.",
    updated: "2026-10-18",
    sections: SPEAKER_SIZZLE_REEL_ES_SECTIONS,
    sectionsDisclosure: SPEAKER_SIZZLE_REEL_ES_DISCLOSURE,
    sectionsDestinations: SPEAKER_SIZZLE_REEL_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Qué metraje se necesita para elaborar un video reel de conferencista?",
        answer:
          "Se emplean tomas de escenario en convenciones, reacciones de la audiencia, testimonios de asistentes, ovaciones y material gráfico corporativo.",
      },
      {
        question: "¿Se pueden editar juntos videos grabados con cámaras y luces diferentes?",
        answer:
          "Sí. La corrección de color, estabilización y tratamiento sonoro unifican archivos de distintos eventos en una pieza promocional armónica y enérgica.",
      },
      {
        question: "¿Qué duraciones y formatos se entregan para agencias y redes sociales?",
        answer:
          "Se entrega un reel maestro de tres minutos para páginas web y agencias de ponentes, junto con versiones verticales para LinkedIn e Instagram.",
      },
    ],
  },
  {
    slug: "videografo-para-bar-mitzvah-south-florida",
    title: "Videógrafo para Bar y Bat Mitzvah en South Florida",
    metadataTitle: "Video de Bar y Bat Mitzvah",
    description:
      "Videografía cinematográfica para celebraciones de Bar y Bat Mitzvah en Boca Raton, Miami y Aventura con respeto ceremonial y fiesta enérgica.",
    eyebrow: "Bar & Bat Mitzvah / Hitos Familiares",
    h1: "Videógrafo para Bar y Bat Mitzvah en South Florida.",
    lead:
      "Cobertura respetuosa en sinagogas, grabación estabilizada de la hora y películas familiares de legado en alta definición.",
    keyword: "videógrafo para bar mitzvah en South Florida",
    location: "Boca Raton / Miami / Aventura",
    availability: "confirmed",
    icon: PartyPopper,
    bestFor: [
      "Familias que celebran el Bar o Bat Mitzvah de sus hijos en sinagogas y salones de South Florida.",
      "Organizadores de eventos que buscan un operador técnico ágil para la fiesta y respetuoso en la ceremonia.",
    ],
    scopingQuestions: [
      "¿La sinagoga permite grabación durante el servicio religioso o se coordinará una sesión de ensayo previa?",
      "¿Desean una película documental cronológica de la fiesta o un resumen cinematográfico corto?",
    ],
    projectFit:
      "Sensibilidad ceremonial con teleobjetivos silenciosos y seguimiento fluido en la pista de baile.",
    updated: "2026-10-18",
    sections: BAR_MITZVAH_ES_SECTIONS,
    sectionsDisclosure: BAR_MITZVAH_ES_DISCLOSURE,
    sectionsDestinations: BAR_MITZVAH_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo se filma en santuarios con poca luz y en la pista de baile nocturna?",
        answer:
          "Cámaras de cuadro completo con objetivos luminosos registran los momentos en la bimá con sobriedad, pasando a estabilización dinámica durante el baile de la hora.",
      },
      {
        question: "¿Cómo se graba el sonido de las lecturas de la Torá y las bendiciones?",
        answer:
          "Se conectan tomas directas a la consola de sonido del recinto combinadas con micrófonos de solapa inalámbricos para una claridad vocal absoluta.",
      },
      {
        question: "¿Qué videos finales recibe la familia tras el fin de semana de celebración?",
        answer:
          "La familia recibe una película documental completa con los discursos y bailes íntegros, junto con un resumen cinematográfico de tres minutos para compartir.",
      },
    ],
  },
  {
    slug: "video-para-bienes-raices-comerciales-miami",
    title: "Video para bienes raíces comerciales en Miami",
    metadataTitle: "Video Bienes Raíces Comerciales",
    description:
      "Producción audiovisual y recorridos de video para oficinas comerciales, naves industriales y locales en Miami y Doral con entrega ágil.",
    eyebrow: "Bienes Raíces Comerciales / Oficinas",
    h1: "Video para bienes raíces comerciales y oficinas en Miami.",
    lead:
      "Recorridos arquitectónicos estabilizados en 4K, planos diáfanos y especificaciones estructurales para comercialización y arrendamiento.",
    keyword: "video para bienes raíces comerciales en Miami",
    location: "Miami / Doral / Downtown Miami",
    availability: "confirmed",
    icon: Building2,
    bestFor: [
      "Corredores de arrendamiento comercial y fondos inmobiliarios en South Florida.",
      "Propietarios de naves logísticas y edificios corporativos de oficinas.",
    ],
    scopingQuestions: [
      "¿La propiedad corresponde a oficinas acondicionadas, espacios diáfanos o naves industriales?",
      "¿Requieren títulos animados con especificaciones de metraje y alturas de techo?",
    ],
    projectFit:
      "Estabilización motorizada con ópticas de corrección de perspectiva sin distorsión angular.",
    updated: "2026-10-18",
    sections: COMMERCIAL_REAL_ESTATE_ES_SECTIONS,
    sectionsDisclosure: COMMERCIAL_REAL_ESTATE_ES_DISCLOSURE,
    sectionsDestinations: COMMERCIAL_REAL_ESTATE_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo ayudan los recorridos en video a cualificar empresas interesadas?",
        answer:
          "Los recorridos de alta definición muestran la distribución real y la entrada de luz natural, facilitando que comités corporativos y empresas evalúen el inmueble a distancia antes de programar visitas.",
      },
      {
        question: "¿Se pueden incluir especificaciones técnicas y áreas en pantalla?",
        answer:
          "Sí. Mediante títulos limpios se indican metros cuadrados útiles, altura de techos, potencia eléctrica y estacionamientos asignados para facilitar el análisis del arrendatario.",
      },
      {
        question: "¿Cuál es el plazo habitual de entrega de los videos comerciales?",
        answer:
          "Los videos de recorrido horizontal de tres minutos y las cápsulas verticales para redes comerciales se entregan habitualmente entre cinco y siete días hábiles tras el rodaje.",
      },
    ],
  },
  {
    slug: "video-de-penthouses-de-lujo-miami",
    title: "Video de penthouses de lujo en Miami",
    metadataTitle: "Video Penthouses de Lujo Miami",
    description:
      "Cinematografía de interiores y recorridos de lujo para penthouses frente al océano en Sunny Isles Beach, Miami Beach y Downtown Miami.",
    eyebrow: "Penthouses de Lujo / Residencias",
    h1: "Video cinematográfico para penthouses de lujo en Miami.",
    lead:
      "Equilibrio lumínico entre vistas al mar e interiores de diseño, recorridos estabilizados y piezas audiovisuales para compradores internacionales.",
    keyword: "video de penthouses de lujo en Miami",
    location: "Sunny Isles Beach / Miami Beach / Downtown Miami",
    availability: "confirmed",
    icon: Home,
    bestFor: [
      "Agentes inmobiliarios y agencias de corretaje que representan penthouses multimillonarios.",
      "Desarrolladores de residencias de ultralujo frente al océano en South Florida.",
    ],
    scopingQuestions: [
      "¿El penthouse cuenta con terraza panorámica, piscina privada o amarre de yate?",
      "¿La filmación se programará durante el atardecer o la luz dorada de la mañana?",
    ],
    projectFit:
      "Sensores de cuadro completo con filtros polarizadores para equilibrar ventanales marinos y acabados interiores.",
    updated: "2026-10-18",
    sections: LUXURY_PENTHOUSE_ES_SECTIONS,
    sectionsDisclosure: LUXURY_PENTHOUSE_ES_DISCLOSURE,
    sectionsDestinations: LUXURY_PENTHOUSE_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo se equilibra la luz del mar con los acabados interiores de lujo?",
        answer:
          "Cámaras de cuadro completo con amplio rango dinámico y polarización controlada captan el azul marino sin sobreexponer el cielo ni oscurecer suelos de mármol o ebanistería.",
      },
      {
        question: "¿Qué formatos de video se entregan para comercialización inmobiliaria?",
        answer:
          "Se entrega una película cinematográfica horizontal de tres minutos para portales web y presentaciones, acompañada de avances verticales 9:16 para Instagram y canales de lujo.",
      },
      {
        question: "¿Se pueden filmar comodidades del edificio y muelles privados?",
        answer:
          "Sí. Las secuencias pueden abarcar muelles, vestíbulos con conserjería y terrazas comunitarias para comunicar el estilo de vida exclusivo de la residencia.",
      },
    ],
  },
  {
    slug: "videografo-para-restaurantes-de-alta-cocina-miami",
    title: "Videógrafo para restaurantes de alta cocina en Miami",
    metadataTitle: "Video Alta Cocina Restaurantes",
    description:
      "Cinematografía gastronómica y videos de menús de degustación para restaurantes de alta cocina en Miami Design District y Coconut Grove.",
    eyebrow: "Gastronomía / Alta Cocina",
    h1: "Videógrafo para restaurantes de alta cocina y autor en Miami.",
    lead:
      "Captura macro de emplatados de precisión, sellados a fuego vivo, servicio de sala y ambientación gastronómica que impulsa reservas de mesas.",
    keyword: "videógrafo para restaurantes de alta cocina en Miami",
    location: "Miami Design District / Coconut Grove / Downtown Miami",
    availability: "confirmed",
    icon: UtensilsCrossed,
    bestFor: [
      "Restaurantes con estrella Michelin, salones gastronómicos y propuestas culinarias de autor.",
      "Grupos de hospitalidad que buscan posicionar sus cartas de temporada y maridajes.",
    ],
    scopingQuestions: [
      "¿La sesión incluirá filmación en cocina activa con la brigada o solo emplatados en sala?",
      "¿Se coordinará la presencia del sommelier y la presentación del menú de degustación?",
    ],
    projectFit:
      "Ópticas macro cinematográficas con iluminación direccional que no deslumbran ni interfieren con el servicio en sala.",
    updated: "2026-10-18",
    sections: FINE_DINING_ES_SECTIONS,
    sectionsDisclosure: FINE_DINING_ES_DISCLOSURE,
    sectionsDestinations: FINE_DINING_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo se filma en cocinas activas sin alterar el servicio del restaurante?",
        answer:
          "Se opera con cámaras compactas y lentes macro luminosos junto al equipo de cocina, registrando sellados y emplatados minuciosos sin focos aparatosos ni cables en el suelo.",
      },
      {
        question: "¿Qué entregables audiovisuales se preparan para restaurantes gastronómicos?",
        answer:
          "El paquete incluye una película de marca de noventa segundos centrada en la propuesta del chef ejecutivo y cápsulas verticales diseñadas para alta interacción en Instagram Reels y TikTok.",
      },
      {
        question: "¿Se puede registrar el servicio de sommelier y maridajes en mesa?",
        answer:
          "Sí. Mediante iluminación sutil y micrófonos sensibles se capta el vertido de vinos, decantación y la interacción refinada del personal con los comensales.",
      },
    ],
  },
  {
    slug: "videografo-de-cocteleria-para-bares-miami",
    title: "Videógrafo de coctelería para bares en Miami",
    metadataTitle: "Video Coctelería para Bares",
    description:
      "Producción de video en cámara lenta y reels para bares de coctelería, speakeasies y salones nocturnos en Wynwood, South Beach y Fort Lauderdale.",
    eyebrow: "Coctelería / Bares & Speakeasies",
    h1: "Videógrafo de coctelería artesanal para bares en Miami.",
    lead:
      "Grabación en 4K a 120 cuadros por segundo, sonido nítido de barra y videos rítmicos para redes sociales que llenan locales nocturnos.",
    keyword: "videógrafo de coctelería para bares en Miami",
    location: "Wynwood / South Beach / Downtown Fort Lauderdale",
    availability: "confirmed",
    icon: Martini,
    bestFor: [
      "Bares de coctelería artesanal, speakeasies y salones de coctelería de autor.",
      "Marcas de destilados y bebidas premium que realizan activaciones nocturnas.",
    ],
    scopingQuestions: [
      "¿La filmación se realizará antes de la apertura al público o con clientela real en la barra?",
      "¿Desea enfocar el contenido en recetas de autor, técnicas de batido o ambiente del local?",
    ],
    projectFit:
      "Grabación en alta velocidad a 60 y 120 fps con iluminación lateral que resalta botánicos y licores en ambientes nocturnos.",
    updated: "2026-10-18",
    sections: MIXOLOGY_COCKTAIL_ES_SECTIONS,
    sectionsDisclosure: MIXOLOGY_COCKTAIL_ES_DISCLOSURE,
    sectionsDestinations: MIXOLOGY_COCKTAIL_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Por qué se utiliza grabación en cámara lenta para videos de coctelería?",
        answer:
          "La captura a 60 y 120 cuadros por segundo convierte movimientos rápidos de barra como el tallado de hielo, flambeado de cítricos y vertidos en historias visuales fluidas y atractivas.",
      },
      {
        question: "¿Cómo se capta el sonido de la coctelería en ambientes de bar?",
        answer:
          "Micrófonos direccionales aíslan el sonido del hielo al romperse, el batido en coctelera y las burbujas, combinándose con iluminación lateral que resalta destilados en la penumbra.",
      },
      {
        question: "¿Se pueden entregar videos de recetas y cartas de temporada para redes?",
        answer:
          "Sí. Se entregan cortes verticales de diez a quince segundos con textos gráficos de ingredientes y ritmo musical dinámico para Instagram Reels y TikTok.",
      },
    ],
  },
  {
    slug: "video-de-progreso-de-construccion-miami",
    title: "Video de progreso de construcción en Miami",
    metadataTitle: "Video Progreso Construcción Miami",
    description:
      "Documentación audiovisual de avance de obra y video para constructores de casas de lujo en Miami, Coral Gables y Fort Lauderdale.",
    eyebrow: "Construcción / Casas de Lujo",
    h1: "Video de avance de obra y construcción residencial en Miami.",
    lead:
      "Documentación mensual de hitos constructivos, recorridos de cimentación y acabados arquitectónicos para desarrolladores y clientes remotos.",
    keyword: "video de progreso de construcción en Miami",
    location: "Coral Gables / Fort Lauderdale / Miami",
    availability: "confirmed",
    icon: Hammer,
    bestFor: [
      "Constructores de residencias personalizadas y contratistas generales en South Florida.",
      "Desarrolladores inmobiliarios y propietarios con supervisión remota de obras.",
    ],
    scopingQuestions: [
      "¿En qué fase constructiva se encuentra el proyecto (cimentación, estructura o acabados interiores)?",
      "¿Requieren informes periódicos para bancos o material audiovisual para portafolio comercial?",
    ],
    projectFit:
      "Recorridos técnicos con ópticas gran angulares de alta rectitud y luminarias de obra para captar detalles antes de cerrar tabiquería.",
    updated: "2026-10-18",
    sections: CONSTRUCTION_PROGRESS_ES_SECTIONS,
    sectionsDisclosure: CONSTRUCTION_PROGRESS_ES_DISCLOSURE,
    sectionsDestinations: CONSTRUCTION_PROGRESS_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Con qué frecuencia conviene filmar el avance en una obra de construcción?",
        answer:
          "Las visitas mensuales o quincenales programadas tras el vaciado de losas, la finalización de estructuras o instalaciones técnicas proporcionan una documentación continua y exhaustiva.",
      },
      {
        question: "¿Se pueden añadir etiquetas de estancias y fechas de hitos en pantalla?",
        answer:
          "Sí. Mediante rótulos limpios se indican fechas exactas, nombres de áreas y fases terminadas para facilitar el archivo y la presentación ante clientes o bancos.",
      },
      {
        question: "¿Cómo se gestiona la seguridad y la actividad de los oficios durante el rodaje?",
        answer:
          "La filmación se realiza con equipo de protección reglamentario y en coordinación con el jefe de obra, grabando sin entorpecer a operarios ni detener los trabajos en curso.",
      },
    ],
  },
  {
    slug: "video-para-marcas-de-moda-miami",
    title: "Video para marcas de moda y trajes de baño en Miami",
    metadataTitle: "Video Marcas de Moda Miami",
    description:
      "Producción audiovisual de lookbooks de moda y trajes de baño en Miami Beach y Wynwood con cinematografía de movimiento y piezas para redes.",
    eyebrow: "Moda / Trajes de Baño",
    h1: "Video cinematográfico de lookbook y moda en Miami Beach.",
    lead:
      "Cinematografía ágil para colecciones de diseño, iluminación natural en exteriores de playa y piezas verticales rítmicas para campañas de lanzamiento.",
    keyword: "video para marcas de moda en Miami",
    location: "Miami Beach / Wynwood / Design District",
    availability: "confirmed",
    icon: Sparkles,
    bestFor: [
      "Firmas de moda, colecciones de trajes de baño y diseñadores independientes en Miami.",
      "Agencias de marketing de moda y marcas de moda resort que lanzan campañas de temporada.",
    ],
    scopingQuestions: [
      "¿El rodaje se realizará en localizaciones de playa en Miami Beach, zonas urbanas o en estudio?",
      "¿Cuántos conjuntos y modelos formarán parte de la sesión de lookbook?",
    ],
    projectFit:
      "Cámaras cinematográficas con ópticas de focal fija y reflectores suaves para captar la caída de las telas y el tono natural de la piel.",
    updated: "2026-10-18",
    sections: FASHION_LOOKBOOK_ES_SECTIONS,
    sectionsDisclosure: FASHION_LOOKBOOK_ES_DISCLOSURE,
    sectionsDestinations: FASHION_LOOKBOOK_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Qué localizaciones en Miami se recomiendan para rodajes de moda y baño?",
        answer:
          "Las playas de Miami Beach, los murales de Wynwood, jardines tropicales y estudios con luz natural ofrecen escenarios idóneos para colecciones de verano y ropa resort.",
      },
      {
        question: "¿Cuántos conjuntos o cambios de ropa se pueden registrar por jornada?",
        answer:
          "Con una planificación coordinada se filman habitualmente entre cuatro y seis estilismos en media jornada, y de ocho a doce conjuntos en una jornada completa.",
      },
      {
        question: "¿Se incluyen versiones verticales optimizadas para campañas publicitarias?",
        answer:
          "Sí. Se entrega una película horizontal de la colección acompañada de versiones verticales 9:16 con cortes rítmicos para Instagram Reels, TikTok y anuncios en Meta.",
      },
    ],
  },
  {
    slug: "video-para-venta-de-barcos-fort-lauderdale",
    title: "Video para venta de barcos y corretaje náutico en Fort Lauderdale",
    metadataTitle: "Video Venta Barcos Fort Lauderdale",
    description:
      "Producción de recorridos en video para venta de embarcaciones y corretaje náutico en Fort Lauderdale con cobertura de puente de mando y camarotes.",
    eyebrow: "Venta de Barcos / Brokerage",
    h1: "Video para venta de barcos y corretaje náutico en Fort Lauderdale.",
    lead:
      "Recorridos estabilizados en muelle, navegación de interiores de cabina y demostración de consolas de mando para plataformas de venta internacional.",
    keyword: "video para venta de barcos en Fort Lauderdale",
    location: "Fort Lauderdale / Dania Beach / Palm Beach",
    availability: "confirmed",
    icon: Anchor,
    bestFor: [
      "Corredurías de yates, brokers independientes y distribuidores náuticos en Fort Lauderdale.",
      "Propietarios particulares que comercializan embarcaciones de recreo o pesca de alta gama.",
    ],
    scopingQuestions: [
      "¿La embarcación se encuentra atracada en marina, varadero o muelle privado?",
      "¿Desea incluir narración del broker o fichas técnicas en pantalla con especificaciones completas?",
    ],
    projectFit:
      "Estabilización de precisión y lentes de ángulo recto para recorrer camarotes y puestos de gobierno sin deformación angular.",
    updated: "2026-10-18",
    sections: BOAT_LISTING_ES_SECTIONS,
    sectionsDisclosure: BOAT_LISTING_ES_DISCLOSURE,
    sectionsDestinations: BOAT_LISTING_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Qué duración debe tener un video de recorrido para venta de una embarcación?",
        answer:
          "Los recorridos de venta suelen durar entre tres y cinco minutos, tiempo suficiente para detallar cubierta, puesto de gobierno, camarotes y sala de máquinas sin perder dinamismo.",
      },
      {
        question: "¿Se pueden indicar horas de motor, eslora y especificaciones en pantalla?",
        answer:
          "Sí. Mediante títulos nítidos se muestran eslora, manga, calado, capacidad de combustible, velocidad de crucero y horas de motor junto a cada secuencia.",
      },
      {
        question: "¿En qué plataformas se pueden utilizar los videos de barcos producidos?",
        answer:
          "Los videos se entregan listos para canales de YouTube náuticos, portales de corretaje naval y avances verticales para Instagram y TikTok.",
      },
    ],
  },
  {
    slug: "video-para-relojes-de-lujo-miami",
    title: "Video para relojes de lujo y joyería en Miami",
    metadataTitle: "Video Relojes de Lujo Miami",
    description:
      "Cinematografía macro comercial para relojes de alta gama y piezas de colección en el Diamond District de Miami con iluminación libre de reflejos.",
    eyebrow: "Relojes de Lujo / Joyería",
    h1: "Cinematografía macro para relojes de alta gama en Miami.",
    lead:
      "Tomas macro de 1:1 que destacan biseles, esferas artesanales y movimiento mecánico sin reflejos para coleccionistas y tiendas de alta relojería.",
    keyword: "video para relojes de lujo en Miami",
    location: "Downtown Miami / Coral Gables / Palm Beach",
    availability: "confirmed",
    icon: Watch,
    bestFor: [
      "Joyerías, tiendas de alta relojería y comerciantes de relojes de segunda mano en Downtown Miami.",
      "Casas de subastas y coleccionistas que comercializan piezas exclusivas en canales internacionales.",
    ],
    scopingQuestions: [
      "¿Las piezas a filmar incluyen cronógrafos, fondos vistos o mecanismos con complicaciones especiales?",
      "¿La sesión se desarrollará en el estudio o en las instalaciones seguras de la joyería?",
    ],
    projectFit:
      "Ópticas macro de relación 1:1 e iluminación polarizada de estudio para captar detalles milimétricos y el movimiento de agujas sin brillos parásitos.",
    updated: "2026-10-18",
    sections: LUXURY_WATCH_ES_SECTIONS,
    sectionsDisclosure: LUXURY_WATCH_ES_DISCLOSURE,
    sectionsDestinations: LUXURY_WATCH_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo revelan las ópticas macro los detalles microscópicos de los relojes de lujo?",
        answer:
          "Ópticas macro de escala 1:1 e iluminación difusa de estudio eliminan reflejos del zafiro y muestran acabados de la esfera, textura de índices y el movimiento del escape.",
      },
      {
        question: "¿Se puede registrar el sonido del mecanismo y los clics del bisel giratorio?",
        answer:
          "Sí. Micrófonos de alta sensibilidad captan la cuerda manual, el chasquido del bisel de cerámica y el latido del volante para transmitir una experiencia táctil y mecánica.",
      },
      {
        question: "¿Qué formatos audiovisuales se entregan para comercialización de relojería?",
        answer:
          "Los profesionales reciben videos horizontales de noventa segundos para fichas de venta y avances verticales de quince segundos con datos de referencia para redes sociales.",
      },
    ],
  },
  {
    slug: "video-para-productos-de-amazon-miami",
    title: "Video para productos de Amazon y marcas de e-commerce en Miami",
    metadataTitle: "Video Productos Amazon Miami",
    description:
      "Producción de video para productos de Amazon, Brand Stores y contenido vertical para Amazon Inspire en ciclorama blanco y estudio en Miami.",
    eyebrow: "Amazon / E-Commerce",
    h1: "Video comercial y demostraciones para productos de Amazon en Miami.",
    lead:
      "Producción en ciclorama e iluminación de estudio de alta fidelidad para destacar funciones, desempaques y cumplimiento de directrices en Amazon.",
    keyword: "video para productos de Amazon en Miami",
    location: "Miami / Doral / Coral Gables",
    availability: "confirmed",
    icon: Box,
    bestFor: [
      "Vendedores de Amazon FBA, marcas de e-commerce y tiendas oficiales en Amazon Brand Store.",
      "Empresas de bienes de consumo en Miami que lanzan productos con video en resolución 4K.",
    ],
    scopingQuestions: [
      "¿Los videos se destinarán al carrusel principal de la ficha, al Brand Store o a Amazon Inspire?",
      "¿Se requiere ciclorama blanco puro, fondo de color corporativo o escenografía lifestyle?",
    ],
    projectFit:
      "Tomas nítidas en ciclorama de estudio, textos en pantalla con especificaciones y encuadres pensados para reproducción móvil sin audio.",
    updated: "2026-10-18",
    sections: AMAZON_PRODUCT_ES_SECTIONS,
    sectionsDisclosure: AMAZON_PRODUCT_ES_DISCLOSURE,
    sectionsDestinations: AMAZON_PRODUCT_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Qué especificaciones y formatos exige Amazon para los videos de producto?",
        answer:
          "Amazon requiere formato 16:9 en resolución 1080p o 4K para el carrusel de la ficha, junto con formato 9:16 vertical para Amazon Inspire y escaparates móviles.",
      },
      {
        question: "¿Se pueden añadir textos y llamadas gráficas con dimensiones y funciones?",
        answer:
          "Sí. Se insertan títulos legibles y de alto contraste que destacan medidas, materiales y modo de uso para compradores que navegan en silencio.",
      },
      {
        question: "¿Dónde se realiza la grabación de productos para Amazon en el sur de la Florida?",
        answer:
          "Las grabaciones se llevan a cabo en ciclorama de estudio en Miami, mesas de luz especializadas o entornos reales según el tipo de producto.",
      },
    ],
  },
  {
    slug: "video-para-marcas-de-cosmeticos-miami",
    title: "Video para marcas de cosméticos y cuidado de la piel en Miami",
    metadataTitle: "Video Cosméticos Miami",
    description:
      "Cinematografía macro para marcas de cosméticos, sérums y productos de belleza en Miami con iluminación difusa y fidelidad de tono de piel.",
    eyebrow: "Cosméticos / Skincare",
    h1: "Cinematografía macro para cosméticos y belleza en Miami.",
    lead:
      "Planos macro de pipetas, texturas viscosas y aplicación en piel para marcas de belleza, cuidado personal y cosmética limpia en South Florida.",
    keyword: "video para marcas de cosméticos en Miami",
    location: "Miami Beach / Wynwood / Downtown Miami",
    availability: "confirmed",
    icon: Sparkles,
    bestFor: [
      "Marcas de cosmética limpia, sérums faciales y laboratorios dermatológicos en South Florida.",
      "Emprendedores de belleza que venden en Shopify, Sephora o campañas de TikTok Shop.",
    ],
    scopingQuestions: [
      "¿La sesión incluye tomas de texturas con pipeta, cremas sobre piel o modelos aplicando el producto?",
      "¿Qué directrices de color y tono de piel deben mantenerse en la corrección final?",
    ],
    projectFit:
      "Ópticas macro de escala 1:1, placas giratorias motorizadas y luces difusas para captar brillo sin destellos molestos.",
    updated: "2026-10-18",
    sections: COSMETICS_PRODUCT_ES_SECTIONS,
    sectionsDisclosure: COSMETICS_PRODUCT_ES_DISCLOSURE,
    sectionsDestinations: COSMETICS_PRODUCT_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo se filman sérums, texturas y fórmulas líquidas de belleza?",
        answer:
          "Con lentes macro de alta precisión y velocidades de 60 a 120 cuadros por segundo para registrar caídas de gotas, cremas untables y emulsiones sin reflejos.",
      },
      {
        question: "¿Cómo se asegura la precisión del tono de piel y el color del producto?",
        answer:
          "Utilizando cartas de calibración de color e iluminación balanceada para que los pigmentos y tonos se muestren exactamente como son en persona.",
      },
      {
        question: "¿Qué entregables se facilitan para campañas publicitarias de cosméticos?",
        answer:
          "Entregamos videos horizontales para páginas de producto y variantes verticales en 9:16 optimizadas para anuncios de TikTok y Meta.",
      },
    ],
  },
  {
    slug: "video-de-demostracion-de-producto-miami",
    title: "Video de demostración de producto y desempaque en Miami",
    metadataTitle: "Video Demostración Producto Miami",
    description:
      "Producción de videos de demostración paso a paso, desempaques y tutoriales de producto para marcas de tecnología y consumo en Miami.",
    eyebrow: "Demostración / Tutoriales",
    h1: "Videos de demostración técnica y desempaque de productos en Miami.",
    lead:
      "Tomas cenitales, ensamblaje paso a paso y sonido de materiales para guías interactivas, códigos QR y páginas de soporte al cliente.",
    keyword: "video de demostración de producto en Miami",
    location: "Miami / Doral / Fort Lauderdale",
    availability: "confirmed",
    icon: Laptop,
    bestFor: [
      "Empresas de hardware, electrodomésticos y productos de consumo que requieren guías claras de uso.",
      "Marcas que buscan reducir devoluciones de clientes mediante videos instructivos por código QR.",
    ],
    scopingQuestions: [
      "¿El producto requiere tomas cenitales a 90 grados para mostrar conexiones y ensamblaje?",
      "¿Se necesita narración de voz en off o subtítulos sincronizados para reproducción silenciosa?",
    ],
    projectFit:
      "Tomas cenitales estabilizadas, iluminación sin sombras y cortes precisos que guían al usuario sin confusión.",
    updated: "2026-10-18",
    sections: PRODUCT_DEMO_ES_SECTIONS,
    sectionsDisclosure: PRODUCT_DEMO_ES_DISCLOSURE,
    sectionsDestinations: PRODUCT_DEMO_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Qué estructura tiene un video de demostración de producto eficaz?",
        answer:
          "Plantea el problema en los primeros segundos, muestra el ensamblaje y funcionamiento de forma secuencial y resalta las soluciones prácticas.",
      },
      {
        question: "¿Se pueden filmar tomas cenitales desde arriba para guías de ensamblaje?",
        answer:
          "Sí. Empleamos montajes superiores a 90 grados con iluminación difusa que eliminan sombras de las manos y muestran las piezas con claridad.",
      },
      {
        question: "¿El video de demostración se entrega con narración o subtítulos?",
        answer:
          "Ofrecemos ambas opciones: locución profesional sincronizada y subtítulos en pantalla pensados para usuarios que ven el video en silencio.",
      },
    ],
  },
  {
    slug: "edicion-de-variaciones-de-anuncios-ugc",
    title: "Edición de variaciones de anuncios UGC para Meta y TikTok",
    metadataTitle: "Edición Variaciones UGC",
    description:
      "Servicio de edición y montaje de variaciones de anuncios UGC con múltiples ganchos, llamadas a la acción y zonas seguras para escalar campañas pagadas.",
    eyebrow: "Publicidad UGC / Performance",
    h1: "Edición de variaciones de anuncios UGC para escalar campañas de pago.",
    lead:
      "Montaje modular de ganchos iniciales, demostraciones y llamadas a la acción para anunciantes en Meta, TikTok y YouTube Shorts.",
    keyword: "edicion de variaciones de anuncios ugc",
    location: "Remoto / Miami / Fort Lauderdale",
    availability: "confirmed",
    icon: Film,
    bestFor: [
      "Agencias de medios pagados y marcas D2C que necesitan probar múltiples creatividades por semana.",
      "Equipos de marketing con grabaciones de creadores que requieren ensamblaje rápido y profesional.",
    ],
    scopingQuestions: [
      "¿Cuántos ganchos iniciales y llamadas a la acción se grabaron para cada producto?",
      "¿Qué directrices de subtítulos y elementos gráficos de marca deben aplicarse?",
    ],
    projectFit:
      "Flujo ágil de postproducción remota con subtítulos nativos, ganchos dinámicos y formatos de área segura para redes.",
    updated: "2026-10-18",
    sections: UGC_AD_VARIATION_ES_SECTIONS,
    sectionsDisclosure: UGC_AD_VARIATION_ES_DISCLOSURE,
    sectionsDestinations: UGC_AD_VARIATION_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo benefician las variaciones de ganchos el rendimiento publicitario?",
        answer:
          "Permiten probar diferentes aperturas en los primeros tres segundos para detectar la variante con mayor retención sin regrabar todo el contenido.",
      },
      {
        question: "¿Cómo se organizan los archivos de video enviados por creadores UGC?",
        answer:
          "El material se sube a carpetas compartidas clasificando tomas de apertura, demostración y cierre para un montaje modular eficiente.",
      },
      {
        question: "¿Qué formato de subtítulos y zonas seguras se aplican a los anuncios?",
        answer:
          "Diseñamos subtítulos en el tercio central respetando las interfaces de TikTok e Instagram para evitar que los iconos oculten el texto.",
      },
    ],
  },
  {
    slug: "video-para-empresas-de-catering-miami",
    title: "Video para empresas de catering y servicios de banquetes en Miami",
    metadataTitle: "Video Catering Miami",
    description:
      "Producción de video cinematográfico para empresas de catering, banquetes corporativos y recepciones de bodas en Miami y Coral Gables.",
    eyebrow: "Catering / Banquetes",
    h1: "Video cinematográfico para empresas de catering y eventos en Miami.",
    lead:
      "Emplatados en vivo, estaciones de trinchado y servicio de gala para empresas de catering que buscan contratos corporativos y recepciones de lujo.",
    keyword: "video para empresas de catering en Miami",
    location: "Miami / Coral Gables / Fort Lauderdale",
    availability: "confirmed",
    icon: UtensilsCrossed,
    bestFor: [
      "Empresas de catering para bodas, recepciones privadas y eventos corporativos en South Florida.",
      "Equipos culinarios que compiten en licitaciones y necesitan demostrar capacidad operativa y elegancia.",
    ],
    scopingQuestions: [
      "¿El rodaje cubrirá preparación en cocina, montaje de mesas o el servicio en vivo a comensales?",
      "¿Desea incluir entrevistas breves con el chef ejecutivo o testimonios de organizadores de eventos?",
    ],
    projectFit:
      "Cámaras estabilizadas en mano, lentes macro para alimentos e iluminación ambiental que resalta colores sin alterar la operativa.",
    updated: "2026-10-18",
    sections: CATERING_COMPANY_ES_SECTIONS,
    sectionsDisclosure: CATERING_COMPANY_ES_DISCLOSURE,
    sectionsDestinations: CATERING_COMPANY_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo se filman buffets y estaciones culinarias durante un evento en vivo?",
        answer:
          "Con estabilizadores ligeros y ópticas luminosas que captan el servicio del personal y las bandejas recién salidas de cocina sin entorpecer a los camareros.",
      },
      {
        question: "¿Se puede grabar el montaje y la preparación antes de la llegada de invitados?",
        answer:
          "Sí. Coordinamos llamadas tempranas para registrar mesas puestas, detalles de cristalería y la labor en los fogones con total tranquilidad.",
      },
      {
        question: "¿Qué piezas ayudan a una empresa de catering a cerrar nuevos contratos?",
        answer:
          "Un video institucional de dos minutos sobre la experiencia de servicio, complementado con reels verticales de los platos más solicitados.",
      },
    ],
  },
  {
    slug: "video-para-cervecerias-artesanales-miami",
    title: "Video para cervecerías artesanales y destilerías en Miami",
    metadataTitle: "Video Cervecerías Artesanales Miami",
    description:
      "Producción audiovisual para cervecerías artesanales, destilerías de autor y taprooms en Wynwood, Doral y South Florida.",
    eyebrow: "Cervecerías / Destilerías",
    h1: "Videos de proceso y taproom para cervecerías artesanales en Miami.",
    lead:
      "Filtración, tanques de acero inoxidable, tiraje en barra y ambiente de taproom para marcas de cerveza artesanal y destilados de autor.",
    keyword: "video para cervecerías artesanales en Miami",
    location: "Wynwood / Doral / Downtown Miami",
    availability: "confirmed",
    icon: Beer,
    bestFor: [
      "Cervecerías artesanales independientes y destilerías urbanas en Wynwood y Doral.",
      "Marcas de bebidas artesanales que promocionan lanzamientos de temporada y visitas guiadas.",
    ],
    scopingQuestions: [
      "¿Desea enfocar el rodaje en el proceso cervecero técnico o en la energía social del taproom?",
      "¿Hay jornadas de enlatado, maceración o embotellado programadas durante la grabación?",
    ],
    projectFit:
      "Ópticas ultra luminosas para zonas oscuras de fermentación y cámaras de alta velocidad para captar el servicio de barril y burbujas.",
    updated: "2026-10-18",
    sections: BREWERY_CRAFT_DISTILLERY_ES_SECTIONS,
    sectionsDisclosure: BREWERY_CRAFT_DISTILLERY_ES_DISCLOSURE,
    sectionsDestinations: BREWERY_CRAFT_DISTILLERY_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo se filman áreas de fermentación oscuras y tanques de acero?",
        answer:
          "Con lentes de gran apertura e iluminación puntual cálida que perfila los depósitos de acero y resalta el visor de nivel de cerveza.",
      },
      {
        question: "¿Se pueden grabar tomas en cámara lenta de los grifos y la línea de enlatado?",
        answer:
          "Sí. Grabamos a 120 cuadros por segundo para mostrar el fluir cremoso de la espuma, el sellado de latas y la condensación del vaso.",
      },
      {
        question: "¿Qué formatos aumentan la afluencia de clientes al taproom?",
        answer:
          "Reels dinámicos con anuncios de eventos, noches temáticas y clips del maestro cervecero explicando las notas de sabor de cada lote.",
      },
    ],
  },
  {
    slug: "videografo-para-fiestas-en-yates-miami",
    title: "Videógrafo para fiestas en yates y celebraciones privadas en Miami",
    metadataTitle: "Videógrafo Fiestas en Yates Miami",
    description:
      "Cobertura audiovisual para celebraciones en yates, despedidas de soltera y eventos náuticos en la bahía de Biscayne y Haulover.",
    eyebrow: "Yates / Fiestas Privadas",
    h1: "Video cinematográfico para fiestas en yate en Miami.",
    lead:
      "Música, baile en popa, atardeceres sobre la bahía y ambiente festivo filmados con cámaras estabilizadas a prueba del movimiento del agua.",
    keyword: "videógrafo para fiestas en yates en Miami",
    location: "Miami Beach / Biscayne Bay / Haulover",
    availability: "confirmed",
    icon: Anchor,
    bestFor: [
      "Grupos privados que celebran cumpleaños, aniversarios o despedidas de soltera en yates de alquiler.",
      "Empresas de chárter que ofrecen recuerdos audiovisuales de alta calidad como servicio premium.",
    ],
    scopingQuestions: [
      "¿Cuál es el recorrido náutico previsto y la hora de salida para coordinar la luz del atardecer?",
      "¿Se requerirá registro de brindis formales o cobertura espontánea de baile y baño en el banco de arena?",
    ],
    projectFit:
      "Estabilizadores de tres ejes para contrarrestar el oleaje, lentes sellados y sensores con alto rango dinámico para el sol tropical.",
    updated: "2026-10-18",
    sections: YACHT_PARTY_ES_SECTIONS,
    sectionsDisclosure: YACHT_PARTY_ES_DISCLOSURE,
    sectionsDestinations: YACHT_PARTY_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo se graban celebraciones en yate con el movimiento de las olas?",
        answer:
          "Utilizamos estabilizadores electrónicos de tres ejes que absorben los vaivenes de la embarcación y garantizan tomas firmes y fluidas.",
      },
      {
        question: "¿Cómo se capta el atardecer frente a la silueta urbana de Miami?",
        answer:
          "Aprovechamos sensores de cine de amplio rango dinámico para equilibrar los tonos cálidos del cielo con la iluminación en cubierta.",
      },
      {
        question: "¿Cuándo se entregan el video de recuerdo y los avances para redes?",
        answer:
          "El reel principal se entrega entre tres y cinco días hábiles después del paseo, junto con el archivo completo de tomas en alta definición.",
      },
    ],
  },
  {
    slug: "videografo-de-pesca-deportiva-miami",
    title: "Videógrafo de pesca deportiva y torneos náuticos en South Florida",
    metadataTitle: "Videógrafo Pesca Deportiva Miami",
    description:
      "Producción de video para torneos de pesca deportiva, tripulaciones de chárter y capturas de peces de pico en Miami y Fort Lauderdale.",
    eyebrow: "Pesca Deportiva / Torneos",
    h1: "Cobertura audiovisual de pesca deportiva y torneos en South Florida.",
    lead:
      "Navegación mar adentro, picadas en popa, trabajo en bañera y sueltas de pez vela filmadas en alta resolución para equipos y patrocinadores.",
    keyword: "videógrafo de pesca deportiva en Miami",
    location: "Miami / Fort Lauderdale / Florida Keys",
    availability: "confirmed",
    icon: Fish,
    bestFor: [
      "Equipos de competición en torneos de pez vela, marlín y dorado en el Atlántico.",
      "Capitanes de chárter de pesca que desean contenido promocional para atraer pescadores deportivos.",
    ],
    scopingQuestions: [
      "¿La salida es de jornada completa en alta mar o sesión de media jornada costera?",
      "¿Qué patrocinadores o marcas de pesca deportiva requieren mención en el video final?",
    ],
    projectFit:
      "Equipos cinematográficos sellados contra salitre y humedad, arneses de sujeción para cubierta y grabación a alta velocidad.",
    updated: "2026-10-18",
    sections: SPORTFISHING_ES_SECTIONS,
    sectionsDisclosure: SPORTFISHING_ES_DISCLOSURE,
    sectionsDestinations: SPORTFISHING_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo se protege el equipo de cámara frente al agua salada y el oleaje?",
        answer:
          "Usamos cuerpos y lentes con sellado profesional, fundas impermeables y correas de seguridad ancladas a la estructura de la embarcación.",
      },
      {
        question: "¿Cómo se registran las picadas rápidas y saltos de pez vela mar adentro?",
        answer:
          "Grabamos en 4K a altas tasas de fotogramas para revivir las batallas en cubierta, el trabajo con el anzuelo y las sueltas en cámara lenta.",
      },
      {
        question: "¿Qué videos se preparan para patrocinadores y equipos de torneo?",
        answer:
          "Producimos un resumen completo de la jornada deportiva, entrevistas breves en bañera y clips verticales con menciones de marcas colaboradoras.",
      },
    ],
  },
  {
    slug: "video-para-restauracion-capilar-miami",
    title: "Video para clínicas de restauración capilar y trasplante en Miami",
    metadataTitle: "Video Restauración Capilar Miami",
    description:
      "Producción audiovisual médica y explicativa para clínicas de restauración capilar, diseño de línea frontal y testimonios en Miami.",
    eyebrow: "Clínicas Capilares / Salud",
    h1: "Videos educativos y testimoniales para clínicas de restauración capilar.",
    lead:
      "Diseño de línea frontal, consultas médicas y seguimiento de evolución folicular filmados con rigor ético para clínicas capilares en Miami.",
    keyword: "video para restauración capilar en Miami",
    location: "Miami / Coral Gables / Fort Lauderdale",
    availability: "confirmed",
    icon: Scissors,
    bestFor: [
      "Clínicas especializadas en microinjerto capilar (FUE/FUT) y tratamientos regenerativos en Miami.",
      "Cirujanos capilares que desean explicar el proceso y resolver dudas comunes de futuros pacientes.",
    ],
    scopingQuestions: [
      "¿Las filmaciones se centrarán en consultas médicas, diseño de línea y explicaciones en consulta?",
      "¿Se cuenta con consentimiento firmado de pacientes para documentar su evolución?",
    ],
    projectFit:
      "Iluminación suave de grado médico, entrevistas conversacionales y respeto estricto a la privacidad de los pacientes.",
    updated: "2026-10-18",
    sections: HAIR_RESTORATION_ES_SECTIONS,
    sectionsDisclosure: HAIR_RESTORATION_ES_DISCLOSURE,
    sectionsDestinations: HAIR_RESTORATION_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo se filman los procedimientos capilares sin mostrar imágenes invasivas?",
        answer:
          "Nos enfocamos en el trazado de la línea frontal, el diálogo explicativo del médico y la comodidad de las instalaciones, evitando primeros planos quirúrgicos.",
      },
      {
        question: "¿Cómo se documenta la evolución del crecimiento de los pacientes?",
        answer:
          "Organizamos tomas con iluminación estandarizada en distintas etapas para mostrar de manera objetiva el progreso del cabello a lo largo de los meses.",
      },
      {
        question: "¿Qué contenidos generan mayor confianza en pacientes potenciales?",
        answer:
          "Videos del especialista resolviendo preguntas frecuentes sobre tiempos de recuperación, cuidados posteriores y naturalidad del resultado.",
      },
    ],
  },
  {
    slug: "marketing-de-video-para-quiropracticos-miami",
    title: "Marketing de video para clínicas de quiropráctica en Miami",
    metadataTitle: "Video Quiroprácticos Miami",
    description:
      "Producción de video para clínicas quiroprácticas en Miami con captura acústica de ajustes espinales, ejercicios de postura y testimonios.",
    eyebrow: "Quiropráctica / Bienestar",
    h1: "Videos educativos y acústica de ajustes para quiroprácticos en Miami.",
    lead:
      "Sonido nítido de ajustes vertebrales, guías de movilidad articular y explicaciones de salud postural para atraer nuevos pacientes en Miami.",
    keyword: "marketing de video para quiroprácticos en Miami",
    location: "Miami / Doral / Coral Gables",
    availability: "confirmed",
    icon: Activity,
    bestFor: [
      "Doctores en quiropráctica, clínicas de columna y centros de rehabilitación postural en Miami-Dade.",
      "Profesionales de la salud articular que buscan desmitificar el tratamiento mediante videos educativos.",
    ],
    scopingQuestions: [
      "¿Desea registrar sonido acústico de ajustes manuales o centrarse en rutinas de estiramiento?",
      "¿Los pacientes participantes han firmado previamente su formulario de autorización de imagen?",
    ],
    projectFit:
      "Micrófonos direccionales de solapa para captar la respuesta acústica del ajuste y planos claros que transmiten profesionalismo y calma.",
    updated: "2026-10-18",
    sections: CHIROPRACTIC_VIDEO_ES_SECTIONS,
    sectionsDisclosure: CHIROPRACTIC_VIDEO_ES_DISCLOSURE,
    sectionsDestinations: CHIROPRACTIC_VIDEO_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo se graba el audio para captar el sonido de los ajustes articulares?",
        answer:
          "Empleamos micrófonos direccionales inalámbricos colocados estratégicamente para registrar el chasquido articular amortiguando el ruido de fondo de la clínica.",
      },
      {
        question: "¿Qué videos ayudan a conseguir más consultas de nuevos pacientes?",
        answer:
          "Explicaciones sobre dolores comunes de cuello y espalda, demostraciones de pruebas de postura y valoraciones de pacientes tras el tratamiento.",
      },
      {
        question: "¿Cómo se preparan las tomas para que el paciente se sienta cómodo frente a la cámara?",
        answer:
          "El especialista explica cada movimiento antes de proceder, garantizando que el paciente esté relajado y la postura sea correcta en todo momento.",
      },
    ],
  },
  {
    slug: "video-para-pitches-de-startups-miami",
    title: "Video de pitch para startups y rondas de inversión en Miami",
    metadataTitle: "Video Pitch Startups Miami",
    description:
      "Producción de video para fundadores de startups, rondas seed y presentaciones para inversores en el ecosistema tecnológico de Miami.",
    eyebrow: "Startups / Inversores",
    h1: "Videos de presentación y pitch para fundadores de startups en Miami.",
    lead:
      "Narrativa del fundador, demostración de software y presentación de métricas clave para acelerar rondas de inversión y comités de venture capital.",
    keyword: "video de pitch para startups en Miami",
    location: "Downtown Miami / Wynwood / Coral Gables",
    availability: "confirmed",
    icon: TrendingUp,
    bestFor: [
      "Fundadores tecnológicos levantando rondas de inversión seed o Serie A en el ecosistema de Miami.",
      "Empresas de software B2B que necesitan sintetizar su propuesta de valor ante fondos de capital de riesgo.",
    ],
    scopingQuestions: [
      "¿La presentación incluye demostraciones grabadas de la plataforma o solo entrevista al equipo fundador?",
      "¿Qué duración objetivo se busca para el video de presentación (2 minutos para deck o 60 segundos para demo day)?",
    ],
    projectFit:
      "Iluminación cuidada para oficinas y espacios de co-working, audio limpio de entrevista y gráficos en pantalla para métricas de crecimiento.",
    updated: "2026-10-18",
    sections: STARTUP_PITCH_ES_SECTIONS,
    sectionsDisclosure: STARTUP_PITCH_ES_DISCLOSURE,
    sectionsDestinations: STARTUP_PITCH_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Qué datos debe contener un video de pitch eficaz para inversores?",
        answer:
          "Planteamiento del problema de mercado, presentación de la solución tecnológica, demostración del flujo de usuario y métricas de tracción comprobadas.",
      },
      {
        question: "¿Se pueden incorporar grabaciones de pantalla de la interfaz del software?",
        answer:
          "Sí. Se combinan capturas de pantalla en alta resolución con animaciones de títulos que destacan las ventajas de la solución frente a la competencia.",
      },
      {
        question: "¿Qué versiones se preparan para convocatorias de inversores y redes?",
        answer:
          "Un video maestro de dos a tres minutos para anexar al deck de inversión y avances breves de treinta segundos con declaraciones del fundador para LinkedIn.",
      },
    ],
  },
  {
    slug: "video-de-biografia-ejecutiva-miami",
    title: "Video de biografía ejecutiva y perfiles corporativos en Miami",
    metadataTitle: "Video Biografía Ejecutiva Miami",
    description:
      "Producción de biografías ejecutivas en video, perfiles para juntas directivas y liderazgo de opinión para directivos en Miami y Fort Lauderdale.",
    eyebrow: "Liderazgo / Biografía Ejecutiva",
    h1: "Biografías ejecutivas en video y perfiles de liderazgo corporativo.",
    lead:
      "Entrevistas conversacionales, iluminación de despacho y recursos de apoyo para directores generales, socios y directivos en South Florida.",
    keyword: "video de biografía ejecutiva en Miami",
    location: "Downtown Miami / Coral Gables / Fort Lauderdale",
    availability: "confirmed",
    icon: Briefcase,
    bestFor: [
      "Directores ejecutivos, socios de firmas profesionales y miembros de juntas directivas en South Florida.",
      "Líderes empresariales que desarrollan su presencia en LinkedIn y portales corporativos de gobierno corporativo.",
    ],
    scopingQuestions: [
      "¿La grabación se realizará en el despacho de la empresa, sala de juntas o estudio privado?",
      "¿El objetivo es un perfil institucional para la página web de la firma o clips verticales de liderazgo de opinión?",
    ],
    projectFit:
      "Iluminación de varios puntos suave, micrófonos de solapa de alta definición y encuadres sobrios que reflejan solvencia y trayectoria.",
    updated: "2026-10-18",
    sections: EXECUTIVE_VIDEO_BIO_ES_SECTIONS,
    sectionsDisclosure: EXECUTIVE_VIDEO_BIO_ES_DISCLOSURE,
    sectionsDestinations: EXECUTIVE_VIDEO_BIO_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo se filma una biografía ejecutiva para directivos y consejos de administración?",
        answer:
          "Se estructura una entrevista pausada en su entorno laboral con iluminación suave y sonido broadcast, complementada con planos de trabajo y reuniones.",
      },
      {
        question: "¿Dónde se realiza la grabación en el sur de la Florida?",
        answer:
          "En salas de reuniones corporativas, despachos privados o espacios ejecutivos en Downtown Miami, Coral Gables y Fort Lauderdale.",
      },
      {
        question: "¿Cómo se adaptan las reflexiones del directivo para canales como LinkedIn?",
        answer:
          "La entrevista completa se edita en un perfil institucional de dos minutos y en cápsulas verticales con subtítulos destacando ideas clave de gestión.",
      },
    ],
  },
  {
    slug: "marketing-de-video-automotriz-miami",
    title: "Marketing de video automotriz en Miami",
    metadataTitle: "Video Automotriz Miami",
    description:
      "Edición de video cinematográfico para concesionarios, talleres de detailing y vehículos de lujo en Miami.",
    eyebrow: "Automotriz / Detailing",
    h1: "Videos de vehículos de alto nivel y servicios automotrices.",
    lead:
      "Resaltamos el diseño y acabado de autos exóticos, servicios de detailing y ventas en concesionarios con ediciones en video de estilo cinematográfico.",
    keyword: "video automotriz en Miami",
    location: "Miami / Fort Lauderdale",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Talleres de auto detailing y protección de pintura (PPF).",
      "Concesionarios de autos exóticos y de lujo en South Florida.",
    ],
    scopingQuestions: [
      "¿Dispones de tomas detalladas de interiores y exteriores del auto?",
      "¿El objetivo es ventas directas o engagement en redes sociales?",
    ],
    projectFit:
      "Corrección de color y diseño de sonido de alta fidelidad automotriz.",
    sections: AUTOMOTIVE_ES_SECTIONS,
    sectionsDisclosure: AUTOMOTIVE_ES_DISCLOSURE,
    sectionsDestinations: "Rangos publicados, el trabajo automotriz del portafolio y qué enviar para cotizar",
    faqs: [
      {
        question: "¿Se puede agregar diseño de sonido de motores?",
        answer:
          "Sí. Realzamos la experiencia auditiva del video con efectos de sonido de motor y ambiente profesionales.",
      },
    ],
  },
  {
    slug: "produccion-de-video-para-hoteles-miami",
    title: "Producción de video para hoteles y hospitalidad en Miami",
    metadataTitle: "Video Hoteles Hospitalidad Miami",
    description:
      "Videos promocionales, recorridos de suites y contenido de experiencia de huésped para hoteles en Miami.",
    eyebrow: "Hoteles / Hospitalidad",
    h1: "Videos promocionales para hoteles y resorts en Miami.",
    lead:
      "Captura visual y edición refinada para mostrar las instalaciones, amenidades y experiencia gastronómica de hoteles en Miami y South Beach. Para contenido gastronómico específico de comedores y bares, consulta [video para restaurantes en Miami](/es/video-para-restaurantes-miami).",
    keyword: "video para hoteles en Miami",
    location: "Miami Beach / South Florida",
    availability: "confirmed",
    icon: Building2,
    bestFor: [
      "Boutique hoteles, resorts y propiedades de hospitalidad.",
      "Grupos hoteleros que necesitan videos para su sitio web y redes sociales.",
    ],
    scopingQuestions: [
      "¿El video abarcará habitaciones, piscina, restaurante o todo el complejo?",
      "¿En qué plataformas digitales se publicará?",
    ],
    projectFit:
      "Calidad cinematográfica que transmite lujo y hospitalidad.",
    updated: "2026-10-07",
    sections: HOTEL_ES_SECTIONS,
    sectionsDisclosure: HOTEL_ES_DISCLOSURE,
    sectionsDestinations: HOTEL_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Producen versiones optimizadas para Instagram y sitio web?",
        answer:
          "Sí. Entregamos la versión horizontal para el sitio web y adaptaciones verticales para Reels y Stories.",
      },
    ],
  },
  {
    slug: "edicion-de-video-podcast-miami",
    title: "Edición de video podcast en Miami",
    metadataTitle: "Edición Video Podcast Miami",
    description:
      "Servicio de edición de videopodcast, multicámara, clips para redes sociales y eliminación de silencios en Miami.",
    eyebrow: "Video Podcast / Creadores",
    h1: "Edición profesional de video podcasts en Miami.",
    lead:
      "Transformamos grabaciones multicámara de podcast en episodios pulidos y clips cortos verticales optimizados para YouTube, Spotify e Instagram.",
    keyword: "edición de video podcast en Miami",
    location: "Miami-Dade / Remote",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Creadores de video podcasts, consultores y emprendedores en Miami.",
      "Empresas que producen shows de entrevistas o podcasts corporativos.",
    ],
    scopingQuestions: [
      "¿La grabación del podcast es de una o varias cámaras?",
      "¿Requieres clips cortos de momentos destacados para redes sociales?",
    ],
    projectFit:
      "Edición bilingüe y optimización constante de episodios. Si ya editas el episodio y solo necesitas los clips cortos, mira la [edición de clips de podcast para Reels, TikTok y Shorts](/es/edicion-de-clips-de-podcast-miami).",
    faqs: [
      {
        question: "¿Incluye diseño de portadas e introducciones animadas?",
        answer:
          "Sí. Podemos agregar animaciones de inicio, zócalos con nombres de invitados y gráficos de marca.",
      },
    ],
  },
  {
    slug: "editor-de-video-ugc-para-ecommerce",
    title: "Editor de video UGC para e-commerce en Miami",
    metadataTitle: "Editor Video UGC E-Commerce",
    description:
      "Edición de video UGC (contenido generado por usuarios) optimizado para anuncios en Meta y TikTok para marcas e-commerce.",
    eyebrow: "UGC / E-Commerce Ads",
    h1: "Edición de anuncios UGC para marcas e-commerce.",
    lead:
      "Convertimos clips de testimoniales de usuarios y unboxings en anuncios de video de alta conversión con ganchos visuales y subtítulos animados.",
    keyword: "editor de video UGC en Miami",
    location: "Fort Lauderdale / Miami / Remote E-Commerce",
    availability: "confirmed",
    icon: WandSparkles,
    bestFor: [
      "Marcas e-commerce que utilizan anuncios en TikTok y Meta Ads.",
      "Agencias de marketing digital que necesitan edición ágil de variaciones de anuncios.",
    ],
    scopingQuestions: [
      "¿Envías las tomas UGC de tus creadores para edición?",
      "¿Cuántas variaciones de gancho (hook) necesitas por anuncio?",
    ],
    projectFit:
      "Edición rápida orientada a rendimiento y conversión en redes sociales.",
    faqs: [
      {
        question: "¿Pueden editar múltiples variaciones para pruebas A/B?",
        answer:
          "Sí. Entregamos distintas versiones con diferentes ganchos iniciales y llamadas a la acción para optimizar el retorno de inversión.",
      },
      {
        question: "¿Editan video UGC para marcas de e-commerce en Fort Lauderdale?",
        answer:
          "Sí. Esteban tiene su base en Fort Lauderdale, así que las marcas de e-commerce de Fort Lauderdale y del resto de Broward County son clientes locales, no remotos. La edición UGC en sí no depende de la ubicación: los clips de creadores, las notas del producto y los claims aprobados llegan como archivos, y las variaciones del anuncio vuelven por el mismo camino, así que una marca de Fort Lauderdale sigue exactamente la misma entrega que una de Miami o de otro estado. La diferencia aparece cuando falta material. Una marca de Fort Lauderdale que necesita tomas extra del producto, un unboxing limpio o b-roll del artículo en uso puede hablar de una sesión corta de captura local en lugar de pedirle al creador que vuelva a grabar, y esa sesión se define por proyecto. Envía los clips que tienes, indica en qué plataforma correrán los anuncios y di si estás en Fort Lauderdale o en Miami para saber si la captura local es una opción.",
      },
    ],
  },
  {
    slug: "video-para-arquitectura-y-diseno-miami",
    title: "Video para arquitectura y diseño de interiores en Miami",
    metadataTitle: "Video Arquitectura Diseño Miami",
    description:
      "Edición de video cinematográfico y recorridos para firmas de arquitectura y diseñadores de interiores en Miami.",
    eyebrow: "Arquitectura / Diseño",
    h1: "Videos promocionales para estudios de arquitectura y diseño.",
    lead:
      "Resaltamos detalles de diseño, texturas e iluminación en proyectos residenciales y comerciales para arquitectos e interioristas en Miami.",
    keyword: "video de arquitectura en Miami",
    location: "Miami / Coral Gables",
    availability: "confirmed",
    icon: Building2,
    bestFor: [
      "Estudios de arquitectura y firmas de diseño de interiores.",
      "Desarrolladores boutique en Miami y South Florida.",
    ],
    scopingQuestions: [
      "¿Las tomas abarcan fotografía estática animada o clips de video?",
      "¿El video se publicará en portfolio web o Instagram?",
    ],
    projectFit:
      "Edición minimalista y de alto nivel estilístico.",
    faqs: [
      {
        question: "¿Se pueden animar fotos de arquitectura de alta resolución?",
        answer:
          "Sí. Utilizamos técnicas de parallax y movimiento de cámara virtual para dar vida a portafolios fotográficos.",
      },
    ],
  },
  {
    slug: "marketing-de-video-para-spas-y-bienestar-miami",
    title: "Marketing de video para spas y bienestar en Miami",
    metadataTitle: "Video Spas Bienestar Miami",
    description:
      "Videos relajantes y contenido promocional para spas de lujo, centros de bienestar y tratamientos holísticos en Miami.",
    eyebrow: "Spas / Bienestar",
    h1: "Videos promocionales para spas y centros de bienestar.",
    lead:
      "Creamos contenido visual envolvente con ritmo sereno y edición estética para atraer clientes a spas y centros holísticos en Miami.",
    keyword: "video para spas en Miami",
    location: "Miami Beach / Distrito Financiero",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Day spas, centros de medicina holística y resorts de bienestar.",
      "Marcas de cuidado personal que buscan transmitir tranquilidad y lujo.",
    ],
    scopingQuestions: [
      "¿Deseas mostrar tratamientos, ambiente del spa o testimoniales?",
      "¿Requieres diseño de sonido relajante personalizado?",
    ],
    projectFit:
      "Estética visual limpia con edición fluida y sonido envolvente.",
    sectionsDisclosure: "Precios y cómo grabar sin mostrar clientes",
    updated: "2026-10-07",
    sections: [
      {
        heading: "¿Cuánto cuesta un video promocional para un spa en Miami?",
        paragraphs: [
          `Editar el material que el spa ya tiene empieza desde ${esStarterFrom} por video con el [paquete Arranque](/es/precios/arranque), con formato para Reels, TikTok, YouTube o web y una ronda de revisión. Si el spa publica cada semana, la calculadora pone el video corto en ${esWeekly}. Las dos cifras son precios de partida, y la cotización por escrito fija el alcance.`,
          "Un promocional de spa suele pedir menos material del que se espera y más cuidado en la edición: ritmo pausado, tomas estables de las salas, el agua, las texturas y la luz, y un sonido que no moleste. El número cambia con cuántas versiones necesitas y con si hay que grabar algo.",
        ],
      },
      {
        heading: "¿Cuánto cuesta grabar en el spa?",
        paragraphs: [
          `La grabación en sitio va por [Presencia Local](/es/precios/presencia-local), desde ${esLocalFrom} por día de producción: preproducción, captura en locación, edición posterior y entregables según formato, en Fort Lauderdale, Broward y proyectos seleccionados en Miami-Dade. El complemento de media jornada de captura tiene un rango orientativo de ${esHalfDayBand}, con la misma base. Son dos formas de cotizar el trabajo, no cantidades que se suman.`,
          "Casi todos los spas son más fáciles de grabar antes de abrir o en un bloque tranquilo entre reservas, con las salas listas y nadie esperando. Envía las horas disponibles, las salas que quieres mostrar y si alguien del equipo hablará a cámara, para que la propuesta diga qué se graba y qué queda fuera.",
        ],
      },
      {
        heading: "¿Cómo graba un spa sin mostrar a sus clientes?",
        paragraphs: [
          "Grabando el lugar y la preparación en vez de a las personas. Las salas vacías, el agua, las toallas dobladas, los productos en un estante y las manos de una terapeuta preparando la camilla cuentan cómo se siente la visita sin poner a un cliente en una cuenta de negocio. Grabadas desde una posición fija y con luz constante, esas tomas sirven durante meses.",
          "Cuando aparece una persona, debe ser alguien del equipo o alguien que aceptó de antemano, nunca un cliente que pasaba por ahí. Pregunta antes de grabar, anota quién dijo sí y envía la nota con los clips. Envía los archivos originales del teléfono o la cámara, no copias de una app de mensajería, que ya perdieron detalle.",
        ],
      },
      {
        heading: "¿Cuánto cuesta un plan mensual de contenido para un spa?",
        paragraphs: [
          `El [plan Crecimiento](/es/precios/crecimiento) empieza desde ${esGrowthFrom} al mes e incluye plan de contenido, calendario de publicación, edición y reporte mensual. Sirve a un spa o centro de bienestar que quiere publicar con constancia pero no tiene a nadie encargado, y que puede enviar material nuevo cada una o dos semanas.`,
          "Los tratamientos de temporada, una sala renovada o una persona nueva en el equipo le dan al calendario algo nuevo que contar, y las mismas tomas tranquilas de las salas lo sostienen entre una novedad y otra. Compara las rutas en la [calculadora](/es/calculadora) y pide una cotización por escrito en [contacto](/es/contacto) que diga qué se graba, edita y entrega cada mes.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Incluye diseño de sonido ambiente de spa?",
        answer:
          "Sí. Integramos texturas sonoras naturales y música ambiental elegida para la plataforma donde se publicará el video.",
      },
    ],
  },
  {
    slug: "edicion-de-video-para-eventos-miami",
    title: "Edición de video para eventos en Miami",
    metadataTitle: "Edición Video Eventos Miami",
    description:
      "Edición remota y postproducción de grabaciones de eventos, fiestas corporativas y galas en Miami.",
    eyebrow: "Edición de Eventos",
    h1: "Edición de video profesional para eventos y galas.",
    lead:
      "Organizamos y editamos grabaciones de eventos en vivo en videos de resumen atractivos y resúmenes para participantes.",
    keyword: "edición de video de eventos en Miami",
    location: "Miami-Dade / Broward",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Organizadores de eventos y agencias de producción en South Florida.",
      "Fotógrafos y videógrafos que necesitan externalizar la postproducción.",
    ],
    scopingQuestions: [
      "¿Cuántas horas de grabación bruta deseas resumir?",
      "¿Cuál es el tiempo de entrega deseado para la primera versión?",
    ],
    projectFit:
      "Postproducción estructurada para videógrafos independientes.",
    faqs: [
      {
        question: "¿Puedo enviar archivos masivos de video?",
        answer:
          "Sí. Recibimos archivos pesados de varias cámaras a través de enlaces directos de nube.",
      },
    ],
  },
  {
    slug: "produccion-de-video-de-marca-miami",
    title: "Producción de video de marca en Miami",
    metadataTitle: "Producción Video Marca Miami",
    description:
      "Videos manifiesto de marca, historias de fundadores y contenido institucional para empresas en Miami.",
    eyebrow: "Branding / Manifiesto",
    h1: "Videos de marca y manifiesto institucional en Miami.",
    lead:
      "Conectamos la visión de tu empresa con su audiencia mediante videos de historia de marca con guion sólido y edición cinematográfica.",
    keyword: "video de marca en Miami",
    location: "Miami / South Florida",
    availability: "confirmed",
    icon: WandSparkles,
    bestFor: [
      "Empresas en crecimiento y startups que relanzan su identidad de marca.",
      "Fundadores que desean contar la historia detrás de su negocio.",
    ],
    scopingQuestions: [
      "¿Cuentas con un guion o narración en voz en off grabada?",
      "¿Qué emociones o valores de marca deseas destacar?",
    ],
    projectFit:
      "Narrativa de marca auténtica y duradera.",
    faqs: [
      {
        question: "¿Ayudan a estructurar la voz en off y la música de fondo?",
        answer:
          "Sí. Seleccionamos la locución comercial bilingüe y la composición musical que mejor represente la personalidad de tu marca.",
      },
    ],
  },
  {
    slug: "produccion-de-video-para-entrenadores-personales-miami",
    title: "Producción de video para entrenadores personales en Miami",
    metadataTitle: "Video Entrenadores Personales Miami",
    description:
      "Videos de entrenamiento dinámicos, reels de transformación y contenido promocional para personal trainers y coaches en Miami.",
    eyebrow: "Personal Trainers / Fitness",
    h1: "Videos de alta energía para personal trainers y coaches.",
    lead:
      "Captura la intensidad de tus sesiones de entrenamiento con reels dinámicos, edición de ritmo rápido y testimonios de clientes.",
    keyword: "video para personal trainer en Miami",
    location: "Miami / Distrito Financiero",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Personal trainers independientes y coaches de acondicionamiento físico.",
      "Estudios boutique de entrenamiento funcional y Pilates.",
    ],
    scopingQuestions: [
      "¿El video se enfocará en rutinas de ejercicio o historias de transformación?",
      "¿Tienes música rítmica seleccionada para la edición?",
    ],
    projectFit:
      "Edición motivacional de alto impacto visual.",
    faqs: [
      {
        question: "¿Pueden editar clips grabados en gimnasios con smartphone?",
        answer:
          "Sí. Optimizamos la resolución, estabilizamos las tomas y mejoramos el audio de fondo.",
      },
    ],
  },
  {
    slug: "edicion-de-video-promocional-para-restaurantes-miami",
    title: "Edición de video promocional para restaurantes en Miami",
    metadataTitle: "Edición Video Restaurantes Miami",
    description:
      "Edición de video para restaurantes en Miami: reels de platillos, promociones, subtítulos y cortes sociales desde material del cliente.",
    eyebrow: "Gastronomía / Restaurantes",
    h1: "Edición de video promocional para restaurantes en Miami.",
    lead:
      `Envía tus videos de cocina, platos, bebidas o salón para editar una promoción para redes desde ${usd(RESTAURANT_PROMO.from)} por proyecto, con cotización a la medida. Un solo reel editado con tus clips es ${usd(SHORT_FORM.perVideoFrom)} por video (paquete Arranque). Mira el [video publicado de Bar Door Monkey Miami](/es/portafolio/bar-door-monkey) y consulta [video para restaurantes en Miami](/es/video-para-restaurantes-miami) si también necesitas grabación.`,
    keyword: "edición de video para restaurantes en Miami",
    location: "Miami / Wynwood",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Restaurantes, bares gastronómicos y conceptos de comida rápida de lujo.",
      "Agencias de marketing gastronómico en South Florida.",
    ],
    scopingQuestions: [
      "¿Cuentas con tomas en cámara lenta de preparación de alimentos?",
      "¿El video incluirá superposiciones de menú o precios promocionales?",
    ],
    projectFit:
      "Edición sensorial detallada para apetito visual. Para alcances combinados de rodaje y postproducción, visita [video para restaurantes en Miami](/es/video-para-restaurantes-miami).",
    sections: [
      {
        heading: "Estructura de un reel de platillo o menú",
        paragraphs: [
          "Si publicas recomendaciones desde tu propia cuenta, consulta la [edición para creadores de comida y lugares](/es/edicion-de-video-para-creadores-de-comida-y-lugares-miami).",
          "Un reel gastronómico puede partir de una sola idea clara: un platillo insignia, una bebida, una preparación, el ambiente del salón o un mensaje breve del equipo. La edición puede abrir con el detalle visual más inmediato —vapor, corte, salsa, emplatado o vertido— y luego ordenar los planos para que el espectador entienda qué se ofrece y cuál es el siguiente paso que el restaurante desea comunicar.",
          "No existe una secuencia única para todos los locales. Los primeros planos de ingredientes, manos y textura pueden alternarse con planos más abiertos del servicio o la sala. El ritmo se define por el material disponible y por el mensaje, sin acelerar una toma hasta que el plato deje de apreciarse. Para planificar material antes de grabar, consulta la [guía de ideas de video para restaurantes](/es/guias/ideas-de-contenido-de-video-para-restaurantes).",
        ],
      },
      {
        heading: "Color y ritmo con textura natural",
        paragraphs: [
          "El tratamiento de color busca que el alimento se vea apetitoso y que conserve su textura natural. Exposición, balance de blancos, contraste y saturación se revisan entre clips para que luz de cocina, luz de mesa, salsas e ingredientes se sientan coherentes dentro de una misma pieza. No se presenta una corrección de color como sustituto de una buena toma ni como una promesa sobre el resultado comercial.",
          "La base de trabajo es el [material suministrado por el cliente](/es/guias/entrega-para-edicion-remota-de-video). Pueden incluirse clips de smartphone o cámara de preparación, emplatado, bebidas, ambiente y mensajes a cámara, junto con los nombres correctos del menú y la intención de cada publicación. Las necesidades de rodaje se conversan por separado; no se presumen dentro de una edición remota.",
          "Cuando el restaurante está en Miami, conviene indicar contexto local, plato, promoción, canal y ubicación antes de editar. Las [áreas de servicio](/es/areas) ayudan a separar una edición remota de una posible conversación de rodaje. Un video de bar, un especial de almuerzo y un reel de comedor pueden necesitar ritmos, textos y primeros planos distintos. La edición mantiene clara esa intención local sin prometer un resultado de reservas.",
        ],
      },
      {
        heading: "Versiones 9:16, 1:1 y texto para ver sin sonido",
        paragraphs: [
          "El alcance puede incluir una versión vertical 9:16 para Instagram Reels y TikTok, además de una versión cuadrada 1:1 cuando una publicación la necesite. Los recortes se revisan para que el plato, el producto y el texto importante se mantengan visibles en cada formato. La [guía de video vertical, horizontal y zonas seguras](/es/guias/video-vertical-horizontal-y-zonas-seguras) ofrece contexto para decidir qué formatos solicitar.",
          "Subtítulos o textos breves pueden explicar una frase hablada, un detalle del menú o un llamado a la acción aportado por el restaurante. Esto permite seguir el mensaje cuando el audio está apagado. El texto se coloca evitando tapar el plato y las zonas que suelen ocupar los controles de la plataforma, sin reemplazar la información que el negocio debe confirmar antes de publicar.",
        ],
      },
      {
        heading: "¿Conviene editar clips del restaurante o planear una grabación?",
        paragraphs: [
          "Empieza por edición cuando ya tienes archivos originales que muestran con claridad el plato, la bebida, el salón o la persona detrás del mensaje. En una carpeta ordenada por platillo o turno, comparte las mejores tomas, los nombres correctos del menú, la primera red donde se publicará y una sola acción para quien ve el video. La [guía de entrega para edición remota](/es/guias/entrega-para-edicion-remota-de-video) ayuda a preparar ese envío sin dar por hecho un día de grabación.",
          "Conviene conversar una grabación cuando falta una escena esencial: preparación, ambiente del salón, explicación del dueño o el detalle que hace comprensible la oferta. La captura se define aparte según el local y el objetivo. Antes de cualquiera de las dos opciones, prepara una lista corta con la [guía de ideas de video para restaurantes](/es/guias/ideas-de-contenido-de-video-para-restaurantes) y revisa el trabajo publicado de [Bar Door Monkey Miami](/es/portafolio/bar-door-monkey).",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Qué material puede entregar un restaurante para editar un video promocional?",
        answer:
          "El restaurante puede compartir material suministrado por el cliente: preparación, emplatado, bebidas, sala, personal, detalles de menú o mensajes a cámara. También ayuda incluir el nombre correcto de cada platillo, referencias, logo y los canales donde se publicará.",
      },
      {
        question: "¿Cómo se estructura un reel corto de comida o menú?",
        answer:
          "La edición puede empezar con el detalle más inmediato y continuar con preparación, textura, emplatado, ambiente o un mensaje del equipo. La secuencia se decide con el material disponible y el objetivo que comparta el restaurante, no con una fórmula fija.",
      },
      {
        question: "¿Pueden preparar versiones verticales y cuadradas?",
        answer:
          "Sí. Se puede definir una versión 9:16 para Reels y TikTok y una versión 1:1 para una publicación cuadrada cuando el alcance lo requiera. Cada recorte se revisa para conservar visibles el platillo y la información esencial.",
      },
      {
        question: "¿Pueden incluir subtítulos para quien ve el video sin sonido?",
        answer:
          "Se pueden añadir subtítulos o textos breves para una frase hablada, contexto de menú o un llamado a la acción proporcionado por el restaurante. El texto se ubica para no cubrir el alimento ni zonas habituales de la interfaz.",
      },
      {
        question: "¿Cómo se comparten comentarios y revisiones?",
        answer:
          "Tras recibir un borrador, el restaurante puede reunir comentarios con marca de tiempo sobre planos, ritmo, textos o llamados a la acción. El alcance de revisiones se conversa por proyecto; no se presupone una cantidad fija de rondas.",
      },
    ],
  },
  {
    slug: "produccion-de-video-para-firmas-de-abogados-miami",
    title: "Producción de video para firmas de abogados en Miami",
    metadataTitle: "Video Abogados Firmas Miami",
    description:
      "Videos testimoniales, presentación de socios y contenido institucional para bufetes de abogados en Miami.",
    eyebrow: "Firmas de Abogados / Legal",
    h1: "Videos institucionales y de testimonio para firmas de abogados.",
    lead:
      "Genera confianza y autoridad con historias de casos de éxito, perfiles de socios y videos explicativos legales para tu firma en Miami.",
    keyword: "video para abogados en Miami",
    location: "Downtown Miami / Distrito Financiero",
    availability: "confirmed",
    icon: WandSparkles,
    bestFor: [
      "Firmas de abogados de lesiones personales, corporativo e inmigración.",
      "Bufetes legales que buscan diferenciarse en campañas de video marketing.",
    ],
    scopingQuestions: [
      "¿El video incluirá testimoniales de clientes o perfiles de abogados?",
      "¿Requiere subtítulos en inglés y español para audiencias locales?",
    ],
    projectFit:
      "Postproducción sobria, elegante y de alta credibilidad.",
    faqs: [
      {
        question: "¿Pueden editar entrevistas grabadas en la oficina de la firma?",
        answer:
          "Sí. Limpiamos el audio, nivelamos el color e integramos gráficos con la marca institucional.",
      },
    ],
  },
  {
    slug: "marketing-de-video-para-alquiler-de-yates-miami",
    title: "Marketing de video para alquiler de yates en Miami",
    metadataTitle: "Video Alquiler Yates Miami",
    description:
      "Videos cinemáticos de yates, recorridos en mar abierto y contenido promocional para chárters marinos en Miami.",
    eyebrow: "Yates / Chárter Marino",
    h1: "Videos promocionales cinemáticos para chárter de yates en Miami.",
    lead:
      "Destaca el lujo de la cubierta, las experiencias a bordo y las vistas costeras para atraer clientes de chárter de alto nivel.",
    keyword: "video para alquiler de yates en Miami",
    location: "Miami Beach / Fort Lauderdale",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Empresas de chárter de yates y brókeres marinos en Miami y Fort Lauderdale.",
      "Marcas de estilo de vida náutico y experiencias de lujo.",
    ],
    scopingQuestions: [
      "¿Las tomas incluyen video aéreo con dron o recorrido de interiores?",
      "¿El video se publicará en Instagram Reels o sitio web principal?",
    ],
    projectFit:
      "Visuales deslumbrantes con ritmo fluido y sonido marino profesional.",
    sections: YACHT_CHARTER_ES_SECTIONS,
    sectionsDisclosure: YACHT_CHARTER_ES_DISCLOSURE,
    sectionsDestinations: "Rangos de edición y grabación, el trabajo más cercano y la carpeta que conviene enviar",
    faqs: [
      {
        question: "¿Combinan tomas de dron con clips de interior de yates?",
        answer:
          "Sí. Editamos transiciones impecables entre vistas aéreas del mar y detalles de lujo en camarotes.",
      },
    ],
  },
  {
    slug: "marketing-de-video-para-odontologia-estetica-miami",
    title: "Marketing de video para odontología estética en Miami",
    metadataTitle: "Video Odontología Estética Miami",
    description:
      "Videos de transformaciones de sonrisa, antes y después y testimonios de pacientes para clínicas dentales estéticas.",
    eyebrow: "Odontología Estética",
    h1: "Videos promocionales para odontología estética en Miami.",
    lead:
      "Demuestra la calidad de tus diseño de sonrisa y carillas dentales con videos emotivos de transformación de pacientes.",
    keyword: "video para odontología estética en Miami",
    location: "Coral Gables / Miami",
    availability: "confirmed",
    icon: WandSparkles,
    bestFor: [
      "Dentistas cosméticos y especialistas en diseño de sonrisa.",
      "Clínicas de implantología y ortodoncia invisible.",
    ],
    scopingQuestions: [
      "¿Cuentas con clips de antes y después de los pacientes?",
      "¿Deseas mostrar explicaciones breves del procedimiento por el especialista?",
    ],
    projectFit:
      "Edición estética impecable que transmite limpieza y confianza.",
    faqs: [
      {
        question: "¿Cómo destacan los resultados de cambio de sonrisa?",
        answer:
          "Utilizamos comparativas en pantalla dividida y zooms de alta definición que resaltan la estética dental.",
      },
    ],
  },
  {
    slug: "edicion-de-video-para-discotecas-y-eventos-miami",
    title: "Edición de video para discotecas y eventos en Miami",
    metadataTitle: "Edición Video Discotecas Miami",
    description:
      "Edición de ritmo rápido, efectos visuales y recaps nocturnos para discotecas, clubes y eventos VIP en Miami.",
    eyebrow: "Vida Nocturna / Eventos VIP",
    h1: "Edición de video vibrante para discotecas y eventos nocturnos.",
    lead:
      "Resumen la energía de la fiesta con cortes de ritmo rápido, luces sincronizadas y efectos visuales modernos para redes sociales.",
    keyword: "edición de video para discotecas en Miami",
    location: "Miami Beach / Wynwood",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Discotecas, bares gastronómicos y promotores de eventos VIP.",
      "DJs y artistas que buscan reels promocionales de alto impacto.",
    ],
    scopingQuestions: [
      "¿Tienes música grabada del set en vivo o pista limpia en estudio?",
      "¿Requiere efectos de destello de luz o transiciones rápidas?",
    ],
    projectFit:
      "Postproducción dinámica de alto impacto sensorial.",
    updated: "2026-10-07",
    sections: NIGHTLIFE_ES_SECTIONS,
    sectionsDisclosure: NIGHTLIFE_ES_DISCLOSURE,
    sectionsDestinations: NIGHTLIFE_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Pueden ajustar los cortes al ritmo exacto de la música?",
        answer:
          "Sí. Sincronizamos cada cambio de toma con los beats de la pista para crear un reel electromagnético.",
      },
    ],
  },
  {
    slug: "marketing-de-video-para-contratistas-de-techos-florida",
    title: "Marketing de video para contratistas de techos en Florida",
    metadataTitle: "Video Contratistas Techos Florida",
    description:
      "Videos de procesos de instalación de techos, inspecciones y testimonios para contratistas en South Florida.",
    eyebrow: "Contratistas de Techos",
    h1: "Videos de obras y testimonios para empresas de techado.",
    lead:
      "Demuestra la durabilidad y calidad de tus proyectos de techado residencial y comercial para ganar proyectos de alto valor.",
    keyword: "video para contratistas de techos en Florida",
    location: "Miami-Dade / Broward",
    availability: "confirmed",
    icon: Building2,
    bestFor: [
      "Empresas de techado residencial y comercial en South Florida.",
      "Contratistas de ventanas de impacto y remodelación exterior.",
    ],
    scopingQuestions: [
      "¿Las tomas muestran el proceso antes, durante y después del trabajo?",
      "¿Deseas resaltar garantías de resistencia a huracanes?",
    ],
    projectFit:
      "Demostración sólida de capacidad técnica y confianza comercial.",
    faqs: [
      {
        question: "¿Soportan tomas grabadas en obra con teléfonos móviles?",
        answer:
          "Sí. Estabilizamos las tomas en techo y mejoramos el contraste visual para mostrar el acabado impecable.",
      },
    ],
  },
  {
    slug: "produccion-de-video-para-asesores-financieros-miami",
    title: "Producción de video para asesores financieros en Miami",
    metadataTitle: "Video Asesores Financieros Miami",
    description:
      "Videos de autoridad, análisis de mercado y contenido educativo para asesores financieros y gestión de patrimonio.",
    eyebrow: "Finanzas / Gestión Patrimonial",
    h1: "Videos de autoridad para asesores financieros y patrimoniales.",
    lead:
      "Comunica conceptos financieros complejos de forma clara y profesional mediante videos institucionales y cápsulas para redes.",
    keyword: "video para asesores financieros en Miami",
    location: "Distrito Financiero / Downtown Miami",
    availability: "confirmed",
    icon: WandSparkles,
    bestFor: [
      "Asesores de inversión independientes y gestores de patrimonio.",
      "Firmas de planificación financiera y fondos boutique.",
    ],
    scopingQuestions: [
      "¿El video incluirá gráficos animados de datos financieros?",
      "¿Se publicará en LinkedIn, YouTube o sitio corporativo?",
    ],
    projectFit:
      "Presentación sobria, ejecutiva y orientada a la confianza.",
    faqs: [
      {
        question: "¿Se pueden integrar diapositivas y gráficos de mercado?",
        answer:
          "Sí. Diseñamos gráficos limpios sobrepuestos en pantalla para acompañar la explicación del asesor.",
      },
    ],
  },
  {
    slug: "edicion-de-video-para-hoteles-boutique-miami",
    title: "Edición de video para hoteles boutique en Miami",
    metadataTitle: "Edición Video Hoteles Boutique Miami",
    description:
      "Edición de recorridos de suites, experiencias gastronómicas y áreas comunes para hoteles boutique en Miami.",
    eyebrow: "Hoteles Boutique / Hospitalidad",
    h1: "Videos promocionales para hoteles boutique y resorts en Miami.",
    lead:
      "Resalta la arquitectura distintiva, comodidad de habitaciones y servicios exclusivos para impulsar reservas directas.",
    keyword: "edición de video para hoteles boutique en Miami",
    location: "Miami Beach / South Beach",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Hoteles boutique independientes y resorts de estilo de vida.",
      "Grupos de hospitalidad que relanzan propiedades vacacionales.",
    ],
    scopingQuestions: [
      "¿Las tomas abarcan habitaciones, piscina o restaurante del hotel?",
      "¿Requieres versiones verticales para Instagram y horizontales para web?",
    ],
    projectFit:
      "Edición estética elegante de alta calidad visual.",
    faqs: [
      {
        question: "¿Entregan formatos optimizados para Booking e Instagram?",
        answer:
          "Sí. Entregamos versiones en relación 16:9 para web y 9:16 vertical para redes sociales.",
      },
    ],
  },
  {
    slug: "editor-de-video-de-productos-para-ecommerce",
    title: "Editor de video de productos para e-commerce en Miami",
    metadataTitle: "Editor Video Productos E-Commerce",
    description:
      "Edición de video de producto para tiendas Shopify, fichas de Amazon y anuncios de marcas e-commerce.",
    eyebrow: "E-Commerce / Video de Producto",
    h1: "Edición de video de productos para tiendas e-commerce.",
    lead:
      "Organiza el material de tu producto en videos claros para tiendas Shopify, fichas de Amazon, anuncios o redes, con alcance definido antes de editar.",
    keyword: "editor de video de productos para e-commerce",
    location: "Miami-Dade / Broward",
    availability: "confirmed",
    icon: WandSparkles,
    bestFor: [
      "Marcas directas al consumidor (D2C) en Shopify o Amazon.",
      "Emprendedores que venden productos físicos con campañas de anuncios.",
    ],
    scopingQuestions: [
      "¿Cuentas con demos de producto grabados en estudio o uso real?",
      "¿Requieres textos sobrepuestos resaltando beneficios clave?",
    ],
    projectFit:
      "Edición comercial para contenido de producto cuando el material y los derechos de uso están claros.",
    faqs: [
      {
        question: "¿Se pueden añadir textos con beneficios e íconos animados?",
        answer:
          "Sí. Diseñamos llamados a la acción y leyendas de características clave alineados con la identidad del producto.",
      },
    ],
  },
  {
    slug: "edicion-de-video-para-joyeria-de-lujo-miami",
    title: "Edición de video para joyería de lujo en Miami",
    metadataTitle: "Video Joyería de Lujo Miami",
    description:
      "Edición detallada de piezas de alta joyería, diamantes y relojes de lujo para marcas en Miami.",
    eyebrow: "Joyería / Relojes de Lujo",
    h1: "Edición de video deslumbrante para joyería de lujo.",
    lead:
      "Captura el brillo de diamantes, cortes de gemas y artesanía en metales preciosos con iluminación y colorimetría refinada.",
    keyword: "edición de video para joyería en Miami",
    location: "Distrito de Diseño / Coral Gables",
    availability: "confirmed",
    icon: WandSparkles,
    bestFor: [
      "Joyerías boutique, diseñadores de alta joyería y distribuidores de relojes de lujo.",
      "Marcas de accesorios finos que venden en línea o en boutique.",
    ],
    scopingQuestions: [
      "¿Las tomas son en macro de 360 grados o con modelos luciendo piezas?",
      "¿Requieres música de fondo sutil y elegante?",
    ],
    projectFit:
      "Postproducción hiper-detallada con colorimetría de precisión.",
    faqs: [
      {
        question: "¿Se resalta el brillo real de diamantes y metales?",
        answer:
          "Sí. Aplicamos corrección de color avanzada que acentúa los reflejos y matices reales de las piezas.",
      },
    ],
  },
  {
    slug: "edicion-de-video-aereo-inmobiliario-miami",
    title: "Edición de video aéreo e inmobiliario en Miami",
    metadataTitle: "Video Aéreo Inmobiliario Miami",
    description:
      "Edición de tomas aéreas con dron, vistas panorámicas de mansiones y mapas virtuales para bienes raíces en Miami.",
    eyebrow: "Video Aéreo / Dron Inmobiliario",
    h1: "Edición de video aéreo para propiedades inmobiliarias de lujo.",
    lead:
      "Integra perspectivas aéreas de mansiones, terrenos y entornos costeros en videos inmobiliarios atractivos y fluidos.",
    keyword: "edición de video aéreo inmobiliario en Miami",
    location: "Miami-Dade / Broward / Palm Beach",
    availability: "confirmed",
    icon: Building2,
    bestFor: [
      "Realtors de lujo y firmas inmobiliarias en South Florida.",
      "Videógrafos aéreos que necesitan posproducción profesional.",
    ],
    scopingQuestions: [
      "¿Cuentas con archivos de video 4K grabados con dron?",
      "¿Deseas superposiciones de líneas de propiedad o nombres de áreas?",
    ],
    projectFit:
      "Estabilización y colorimetría de paisaje marino y residencial.",
    faqs: [
      {
        question: "¿Se pueden añadir marcadores de ubicación en el video?",
        answer:
          "Sí. Añadimos gráficos sutiles que señalan puntos de interés cercanos como playas, escuelas o distritos comerciales.",
      },
    ],
  },
  {
    slug: "edicion-de-video-miami-beach",
    title: "Edición de video en Miami Beach",
    metadataTitle: "Edición de Video Miami Beach",
    description:
      "Edición de video para proyectos en Miami Beach: hospitalidad, estilo de vida, eventos y bienes raíces de lujo.",
    eyebrow: "Miami Beach / Hospitalidad y Estilo de Vida",
    h1: "Edición de video profesional para proyectos en Miami Beach.",
    lead:
      "Transforma tomas costeras, eventos nocturnos y propiedades de lujo en videos cinemáticos optimizados para marcas de Miami Beach.",
    keyword: "edición de video en Miami Beach",
    location: "Miami Beach / South Beach",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Hoteles, restaurantes y clubes nocturnos en Miami Beach.",
      "Marcas de moda costera y agentes de bienes raíces de lujo.",
    ],
    scopingQuestions: [
      "¿El video destaca ambientes de playa, nocturnos o interiores?",
      "¿Requiere versiones en formato vertical para Instagram Reels?",
    ],
    projectFit:
      "Ritmo vibrante, colores cálidos y estética de lujo costero.",
    faqs: [
      {
        question: "¿Cómo optimizan el color para tomas en exteriores de Miami Beach?",
        answer:
          "Equilibramos tonos de mar azul turquesa y cielos soleados manteniendo tonos de piel naturales.",
      },
    ],
  },
  {
    slug: "video-inmobiliario-aventura-miami",
    title: "Video inmobiliario en Aventura y Sunny Isles",
    metadataTitle: "Video Inmobiliario Aventura Miami",
    description:
      "Videos de recorridos por condominios de lujo, penthouse y mansiones marítimas en Aventura y Sunny Isles.",
    eyebrow: "Aventura / Sunny Isles",
    h1: "Videos inmobiliarios para propiedades de lujo en Aventura.",
    lead:
      "Muestra vistas intercostales, acabados de alta gama y amenidades de condominios de lujo con videos cinemáticos.",
    keyword: "video inmobiliario en Aventura Miami",
    location: "Aventura / Sunny Isles Beach",
    availability: "confirmed",
    icon: Building2,
    bestFor: [
      "Realtors de lujo y firmas inmobiliarias especializadas en Aventura y Sunny Isles.",
      "Desarrolladores de condominios marítimos de alta gama.",
    ],
    scopingQuestions: [
      "¿Las tomas incluyen vistas intercostales o interiores de penthouse?",
      "¿Se agregarán planos o datos de la propiedad en pantalla?",
    ],
    projectFit:
      "Presentación sobria y refinada de alto estándar visual.",
    faqs: [
      {
        question: "¿Destacan las amenidades del edificio como marina o spa?",
        answer:
          "Sí. Editamos secuencias que integran perfectamente el área residencial con las áreas comunes del condominio.",
      },
    ],
  },
  {
    slug: "video-creativo-wynwood-miami",
    title: "Producción de video creativo en Wynwood",
    metadataTitle: "Video Creativo Wynwood Miami",
    description:
      "Edición y producción de video creativo para marcas de moda, arte, gastronomía y agencias en Wynwood.",
    eyebrow: "Wynwood / Distrito Creativo",
    h1: "Edición de video creativo e innovador para marcas en Wynwood.",
    lead:
      "Combina ritmo urbano, gráficos audaces y estética artística para proyectos creativos en el corazón del distrito de Wynwood.",
    keyword: "video creativo en Wynwood Miami",
    location: "Wynwood / Distrito de Diseño",
    availability: "confirmed",
    icon: WandSparkles,
    bestFor: [
      "Marcas de moda streetwear, galerías de arte y conceptos gastronómicos de Wynwood.",
      "Agencias creativas que buscan posproducción de estilo vanguardista.",
    ],
    scopingQuestions: [
      "¿El video usará música alternativa o efectos de ritmo acelerado?",
      "¿Deseas superposiciones de grafitis o elementos gráficos animados?",
    ],
    projectFit:
      "Visuales audaces, dinámicos e innovadores.",
    faqs: [
      {
        question: "¿Soportan efectos visuales y transiciones de ritmo creativo?",
        answer:
          "Sí. Aplicamos transiciones rápidas, efectos de textura y tipografía urbana ajustados al estilo del cliente.",
      },
    ],
  },
  {
    slug: "edicion-de-video-corporativo-weston",
    title: "Edición de video corporativo en Weston",
    metadataTitle: "Video Corporativo Weston FL",
    description:
      "Edición de video institucional, entrevistas ejecutivas y cápsulas para empresas y clínicas en Weston, Florida.",
    eyebrow: "Weston / Broward County",
    h1: "Edición de video corporativo para empresas en Weston, FL.",
    lead:
      "Produce comunicados institucionales, videos de capacitación y promocionales de alta credibilidad para corporativos en Weston, con cobertura dentro de [Fort Lauderdale como base, tres condados como área de servicio](/es/areas).",
    keyword: "video corporativo en Weston FL",
    location: "Weston / Broward County",
    availability: "confirmed",
    icon: WandSparkles,
    bestFor: [
      "Empresas corporativas, centros médicos y firmas de servicios en Weston y Davie.",
      "Negocios familiares consolidados en el oeste de Broward.",
    ],
    scopingQuestions: [
      "¿El video es para uso interno corporativo o redes externas?",
      "¿Se requiere limpieza de sonido en entrevistas de oficina?",
    ],
    projectFit:
      "Comunicación sobria, profesional y enfocada en confianza.",
    faqs: [
      {
        question: "¿Pueden editar conferencias o presentaciones corporativas grabadas?",
        answer:
          "Sí. Eliminamos pausas, insertamos diapositivas explicativas y mejoramos la nitidez del audio.",
      },
    ],
  },
  {
    slug: "video-de-marca-de-lujo-jupiter",
    title: "Video de marca de lujo en Jupiter y Palm Beach Gardens",
    metadataTitle: "Video Marca de Lujo Jupiter FL",
    description:
      "Videos de marcas de lujo, clubes de golf y servicios de alto patrimonio en Jupiter y Palm Beach Gardens.",
    eyebrow: "Jupiter / Palm Beach Gardens",
    h1: "Videos promocionales para marcas de lujo en Jupiter, FL.",
    lead:
      "Captura la sofisticación de clubes privados, náutica de lujo y propiedades exclusivas en el norte del condado de Palm Beach.",
    keyword: "video de marca de lujo en Jupiter FL",
    location: "Jupiter / Palm Beach Gardens",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Clubes de golf residenciales, marinas y marcas de estilo de vida en Jupiter.",
      "Servicios de alto valor para residentes de Palm Beach Gardens.",
    ],
    scopingQuestions: [
      "¿Las tomas son de campos de golf, yates o residencias privadas?",
      "¿Se busca un tono sereno y elegante con narrativa en voz en off?",
    ],
    projectFit:
      "Colorimetría de alta gama y narrativa pausada de prestigio.",
    faqs: [
      {
        question: "¿Editan videos para clubes residenciales y marinos privados?",
        answer:
          "Sí. Creamos videos de presentación de estilo de vida con música orquestal o acústica de alta distinción.",
      },
    ],
  },
  {
    slug: "video-para-negocios-hollywood-fl",
    title: "Video para pequeños negocios en Hollywood, FL",
    metadataTitle: "Video Negocios Hollywood FL",
    description:
      "Videos promocionales, reels para Instagram y presentaciones comerciales para comercios en Hollywood y Hallandale.",
    eyebrow: "Hollywood / Broward County",
    h1: "Videos promocionales para negocios locales en Hollywood, FL.",
    lead:
      "Aumenta la visibilidad local de tu tienda, restaurante o servicio profesional en Hollywood con contenido en video atractivo.",
    keyword: "video para negocios en Hollywood FL",
    location: "Hollywood / Hallandale Beach",
    availability: "confirmed",
    icon: Building2,
    bestFor: [
      "Comercios locales, restaurantes y profesionales en Hollywood, FL.",
      "Empresas de servicios que atienden el área metropolitana de Broward.",
    ],
    scopingQuestions: [
      "¿El video busca atraer clientes locales en Instagram o Google?",
      "¿Cuentas con ofertas o promociones de temporada?",
    ],
    projectFit:
      "Mensajes directos, claros y orientados a la conversión de clientes.",
    faqs: [
      {
        question: "¿Incluyen llamadas a la acción con teléfono y sitio web?",
        answer:
          "Sí. Diseñamos gráficos finales con botones de contacto, ubicación y datos directos del negocio.",
      },
    ],
  },
  // Gemela en español de /services/video-production-boca-raton (decisión del
  // dueño, 2026-10-14: Boca Raton entró al área de servicio del perfil de
  // Google ese día). Palm Beach County sigue "proyecto por proyecto" (AGENTS.md);
  // los negocios de Boca aparecen solo como público, nunca como clientes.
  {
    slug: "editor-de-reels-boca-raton",
    title: "Editor de Reels y video en Boca Raton",
    metadataTitle: "Reels y Edición de Video Boca Raton",
    description:
      "Edición remota de Reels, TikTok y Shorts para negocios de Boca Raton con los clips que ya grabaste. La grabación en Palm Beach County se evalúa proyecto por proyecto.",
    metaDescription:
      `Edición remota de Reels, TikTok y Shorts para negocios de Boca Raton, desde ${usd(SHORT_FORM.perVideoFrom)} por video, con los clips que ya grabaste.`,
    eyebrow: "Boca Raton / Palm Beach County",
    h1: "Editor de Reels en Boca Raton para convertir tus clips en videos que se entienden rápido.",
    lead:
      "Esta página es para negocios y creadores de Boca Raton que ya tienen videos en el teléfono o de una grabación. Esteban edita a distancia desde Fort Lauderdale, en español, y te devuelve videos verticales con subtítulos legibles y una sola acción al final.",
    keyword: "editor de reels Boca Raton",
    location: "Boca Raton / Palm Beach County",
    availability: "confirmed",
    icon: Scissors,
    bestFor: [
      "Restaurantes y cafés, también los de la zona de Mizner Park, con clips sin editar.",
      "Med spas, consultorios dentales y médicos, y agentes inmobiliarios con material de sus propiedades.",
      "Boutiques, estudios de fitness y bienestar, y servicios profesionales que quieren un video corto que explique la oferta.",
      "Dueños que prefieren explicar la idea y revisar el contenido en español.",
    ],
    scopingQuestions: [
      "¿Cuántos clips tienes y con qué los grabaste?",
      "¿El video debe vender, explicar, educar o mostrar un antes y después?",
      "¿Necesitas subtítulos en español, en inglés o en los dos idiomas?",
      "¿En qué plataforma se publicará primero?",
    ],
    projectFit:
      "Si quieres ver una pieza publicada, revisa el [video social de ML Colombia](/es/portafolio/ml-colombia), de la marca de Esteban. En esta página no se presenta ningún cliente de Boca Raton. La versión en inglés está en [Reels & Video Editing Boca Raton](/services/video-production-boca-raton).",
    sections: [
      {
        heading: "¿Quién edita Reels para negocios en Boca Raton?",
        paragraphs: [
          `Esteban Moreno Media edita Reels de Instagram, TikToks y YouTube Shorts para negocios y creadores de Boca Raton a partir de los clips que ellos mismos graban. Esteban Moreno es editor de video con base en Fort Lauderdale y trabaja a distancia: subes los archivos originales a una carpeta compartida, escribes una línea sobre lo que debe decir cada video y dónde se va a publicar, y recibes los cortes verticales con subtítulos dentro de las zonas seguras y una acción clara al final. Su idioma de trabajo es el español, con inglés intermedio, así que puedes explicar la idea y dar los cambios en español aunque los subtítulos vayan en inglés. Boca Raton queda en el extremo sur de Palm Beach County, al otro lado del canal Hillsboro desde Deerfield Beach, en Broward. Para ver cómo funciona la edición, revisa la página de [editor de Reels en Fort Lauderdale](/es/editor-de-reels-fort-lauderdale).`,
        ],
      },
      {
        heading: "¿Para qué negocios de Boca Raton es este servicio?",
        paragraphs: [
          "Está pensado para negocios de Boca Raton que ya graban con el teléfono o con una cámara y necesitan que esos clips se conviertan en videos cortos que la gente vea hasta el final. Los casos más comunes son restaurantes y cafés, incluidos los de la zona de Mizner Park; med spas, consultorios dentales y médicos; agentes inmobiliarios con clips de sus propiedades; boutiques y tiendas cerca de Town Center at Boca Raton; estudios de fitness, yoga y bienestar; firmas de servicios profesionales que quieren un video corto que explique lo que hacen; y creadores que están empezando, también los estudiantes de Florida Atlantic University. Son el tipo de negocio para el que se diseñó el servicio, no una lista de clientes: aquí no se presenta ningún proyecto en Boca Raton. Si tu negocio no aparece, el mismo proceso funciona igual.",
        ],
      },
      {
        heading: "¿Esteban va a Boca Raton a grabar?",
        paragraphs: [
          "La mayoría del trabajo en Boca Raton es edición a distancia, y eso no depende del viaje. Envías los clips originales, una referencia de un video que te guste y el texto principal, y apruebas la edición desde el teléfono. Boca Raton está a unas 20 millas al norte de Fort Lauderdale por la I-95, pero la grabación en locación en Palm Beach County se evalúa proyecto por proyecto: si una grabación tiene sentido y cuánto suma el traslado a la cotización se define para cada proyecto, cuando el objetivo está claro. No se promete disponibilidad fija para grabar en Boca Raton, así que pregunta antes de organizar un día de grabación alrededor de esa fecha. Si todavía no tienes material, la guía [cómo grabar video con iPhone para edición profesional](/es/guias/grabar-video-con-iphone-para-edicion-profesional) te ayuda a preparar los primeros clips antes de escribir.",
        ],
      },
      {
        heading: "¿Cuánto cuesta editar Reels para un negocio en Boca Raton?",
        paragraphs: [
          `Los precios para Boca Raton salen de la misma lista publicada que el resto del sitio. El paquete Arranque cuesta desde ${esStarterFrom} por video: tú grabas y Esteban edita un video vertical para Reels, TikTok, Shorts o la web, con una ronda de cambios. Si publicas cada semana, el Arranque se paga semana a semana: ${esWeekly}, con un mínimo de ${ARRANQUE_WEEKLY_TERMS.minimumWeeks} semanas, y después cancelas cualquier semana. Un mes planificado, con plan de contenido, calendario, edición y reporte, es el paquete Crecimiento, que aparece en la página de [precios](/es/precios). Cualquier grabación en locación en Palm Beach County se cotiza aparte, proyecto por proyecto, porque el traslado y el tiempo de grabación dependen del objetivo. Es un precio de partida, no un precio cerrado: la cantidad de material y las versiones que necesites ajustan la cotización final.`,
        ],
      },
    ],
    faqs: [
      {
        question: "¿Puedo contratar solo la edición si estoy en Boca Raton?",
        answer:
          "Sí. Si ya tienes clips, una referencia y un objetivo claro, el proyecto puede ser solo edición a distancia de Reels, TikTok o Shorts. No necesitas estar en Fort Lauderdale.",
      },
      {
        question: "¿Qué material debo enviar?",
        answer:
          "Los clips originales, no copias descargadas de redes; los mejores momentos; cualquier toma hablando a cámara o voz en off; tu logo; un Reel de referencia y la plataforma donde se publicará.",
      },
      {
        question: "¿También cubren Delray Beach y el resto de Palm Beach County?",
        answer:
          "Sí, en las mismas condiciones: edición a distancia del material que tengas y trabajo en locación en Palm Beach County evaluado proyecto por proyecto. Revisa [producción de video en Delray Beach](/es/produccion-de-video-delray-beach).",
      },
    ],
  },
  {
    slug: "produccion-de-video-delray-beach",
    title: "Producción de video en Delray Beach",
    metadataTitle: "Producción Video Delray Beach",
    description:
      "Edición y producción de video para boutique, gastronomía y servicios profesionales en Delray Beach, Florida.",
    eyebrow: "Delray Beach / Palm Beach County",
    h1: "Edición de video para negocios en Delray Beach, FL.",
    lead:
      "Resalta la energía costera y la oferta comercial de Atlantic Avenue con videos promocionales de calidad cinematográfica.",
    keyword: "producción de video en Delray Beach",
    location: "Delray Beach / Palm Beach County",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Restaurantes, boutiques y galerías en Atlantic Avenue de Delray Beach.",
      "Servicios profesionales en el sur del condado de Palm Beach.",
    ],
    scopingQuestions: [
      "¿Las tomas son en exteriores de playa o interiores de local?",
      "¿Se requiere distribución de contenido para redes sociales?",
    ],
    projectFit:
      "Visuales luminosos con enfoque en estilo de vida local.",
    faqs: [
      {
        question: "¿Adaptan el video para anuncios locales en Instagram y Meta?",
        answer:
          "Sí. Entregamos los cortes requeridos para campañas publicitarias segmentadas en Delray Beach.",
      },
    ],
  },
  {
    slug: "video-inmobiliario-sunny-isles",
    title: "Video inmobiliario en Sunny Isles Beach",
    metadataTitle: "Video Inmobiliario Sunny Isles",
    description:
      "Edición de video inmobiliario en Sunny Isles Beach para agentes y equipos con material suministrado por el cliente.",
    eyebrow: "Sunny Isles Beach",
    h1: "Edición de video inmobiliario para Sunny Isles Beach.",
    lead:
      "Convierte el material ya grabado de una propiedad en un video claro para presentar el inmueble y compartirlo en los canales acordados. Si el proyecto requiere una conversación de ubicación, revisa las [áreas de servicio](/es/areas).",
    keyword: "video inmobiliario en Sunny Isles Beach",
    location: "Sunny Isles Beach / Aventura",
    availability: "confirmed",
    icon: Building2,
    bestFor: [
      "Agentes y equipos inmobiliarios que ya tienen material grabado de una propiedad.",
      "Marcas que necesitan organizar un video inmobiliario para canales acordados.",
    ],
    scopingQuestions: [
      "¿Qué material de la propiedad ya está grabado y quién tiene permiso para usarlo?",
      "¿Dónde se publicará el video y qué información debe aparecer?",
    ],
    projectFit:
      "Edición de material suministrado por el cliente, con alcance y entregables definidos para cada proyecto.",
    faqs: [
      {
        question: "¿Pueden editar material ya grabado de una propiedad en Sunny Isles?",
        answer:
          "Sí. Esteban puede editar material suministrado por el cliente; el alcance, los formatos y el uso previsto se confirman para cada proyecto.",
      },
    ],
  },
  {
    slug: "edicion-de-video-palm-beach-gardens",
    title: "Edición de video en Palm Beach Gardens",
    metadataTitle: "Edición Video Palm Beach Gardens",
    description:
      "Edición de video para servicios ejecutivos, clínicas y residencias de lujo en Palm Beach Gardens.",
    eyebrow: "Palm Beach Gardens",
    h1: "Edición de video para empresas y residencias en Palm Beach Gardens.",
    lead:
      "Comunica la excelencia de tus servicios comerciales o residenciales con videos pulidos de alta distinción visual.",
    keyword: "edición de video en Palm Beach Gardens",
    location: "Palm Beach Gardens / Jupiter",
    availability: "confirmed",
    icon: WandSparkles,
    bestFor: [
      "Clínicas médicas, centros de salud y bufetes en Palm Beach Gardens.",
      "Empresas de arquitectura y paisajismo de lujo.",
    ],
    scopingQuestions: [
      "¿El video se enfocará en instalaciones o entrevistas al equipo?",
      "¿Buscas publicar en YouTube o LinkedIn corporativo?",
    ],
    projectFit:
      "Tono corporativo sofisticado y limpio.",
    faqs: [
      {
        question: "¿Optimizan el contenido para LinkedIn ejecutivo?",
        answer:
          "Sí. Formateamos clips horizontales con subtítulos incrustados ideales para audiencias de LinkedIn.",
      },
    ],
  },
  {
    slug: "produccion-de-video-davie-fl",
    title: "Producción de video en Davie, FL",
    metadataTitle: "Producción Video Davie FL",
    description:
      "Edición de video para centros ecuestres, comercios y servicios educativos en Davie y el suroeste de Broward.",
    eyebrow: "Davie / Broward County",
    h1: "Edición de video para negocios y servicios en Davie, FL.",
    lead:
      "Presenta tus instalaciones, ranchos, comercios o servicios educativos con videos claros y atractivos.",
    keyword: "producción de video en Davie FL",
    location: "Davie / Plantation / Broward",
    availability: "confirmed",
    icon: Building2,
    bestFor: [
      "Comercios locales, centros educativos y propiedades en Davie.",
      "Contratistas y proveedores de servicios comunitarios.",
    ],
    scopingQuestions: [
      "¿Las tomas son en espacios abiertos o aulas/oficinas?",
      "¿Requieres llamados a la acción comerciales directos?",
    ],
    projectFit:
      "Edición auténtica y natural enfocada en la comunidad local.",
    faqs: [
      {
        question: "¿Procesan tomas grabadas en eventos al aire libre?",
        answer:
          "Sí. Estabilizamos movimiento y nivelamos los niveles de iluminación solar directa para tomas exteriores.",
      },
    ],
  },
  {
    slug: "servicio-de-edicion-de-video-para-youtube-miami",
    title: "Servicio de edición de video para YouTube en Miami",
    metadataTitle: "Edición Video YouTube Miami",
    description:
      "Edición de contenido en formato largo para YouTube: ritmo fluido, gráficos explicativos, sonido limpio y miniaturas atractivas.",
    eyebrow: "YouTube / Creadores y Marcas",
    h1: "Edición de video profesional para canales de YouTube.",
    lead:
      "Aumenta la retención de tus espectadores en YouTube con cortes dinámicos, superposiciones gráficas y capítulos marcados.",
    keyword: "servicio de edición de video para YouTube en Miami",
    location: "Miami-Dade / Broward",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Creadores de contenido, educadores y canales de marca en YouTube.",
      "Empresas que producen videopodcasts y entrevistas en formato largo.",
    ],
    scopingQuestions: [
      "¿El video requiere división de capítulos y llamadas a la suscripción?",
      "¿Cuentas con gráficos de miniatura o deseas su diseño?",
    ],
    projectFit:
      "Optimización de ritmo para maximizar el tiempo de visualización.",
    faqs: [
      {
        question: "¿Incluyen diseño de capítulos y pantalla final de YouTube?",
        answer:
          "Sí. Insertamos marcas de tiempo para la descripción de YouTube y animaciones de suscripción.",
      },
    ],
  },
  {
    slug: "editor-de-video-para-anuncios-de-tiktok-miami",
    title: "Editor de video para anuncios de TikTok e Instagram",
    metadataTitle: "Editor Video Anuncios TikTok Miami",
    description:
      "Editor de video para anuncios de TikTok en Miami. Edición direct-response, ganchos de alta retención, subtítulos dinámicos y video ads para marcas.",
    eyebrow: "TikTok Ads / Social Video Ads",
    h1: "Edición de anuncios en video optimizados para TikTok e Instagram.",
    lead:
      "Engancha a tu audiencia en los primeros 3 segundos con anuncios de respuesta directa pulidos para campañas en redes.",
    keyword: "editor de video para anuncios de TikTok en Miami",
    location: "Miami-Dade / Broward",
    availability: "confirmed",
    icon: WandSparkles,
    bestFor: [
      "Marcas e-commerce, apps y agencias de medios pagados en redes.",
      "Emprendedores que ejecutan campañas publicitarias en Meta y TikTok.",
    ],
    scopingQuestions: [
      "¿Tienes variaciones de ganchos iniciales para pruebas A/B?",
      "¿Requieres subtítulos en tendencia y efectos de voz?",
    ],
    projectFit:
      "Retención ágil orientada al clic y la conversión directa.",
    sections: [
      {
        heading: "Estructura de gancho y retención en los primeros 3 segundos",
        paragraphs: [
          "Un anuncio de video efectivo para TikTok y Meta depende de los primeros segundos para detener el scroll. La edición organiza el material suministrado por el cliente para abrir con el gancho visual o auditivo más convincente: una demostración de producto, un problema reconocible, una pregunta directa o una toma de acción inmediata.",
          "El ritmo editorial mantiene la atención eliminando pausas innecesarias, empleando cortes limpios y acelerando transiciones entre demostraciones de características y beneficios. Para entender la arquitectura técnica de estos formatos, consulta la [guía de Reels vs TikTok vs Shorts para negocios locales](/es/guias/reels-vs-tiktok-vs-shorts-para-negocios-locales).",
        ],
      },
      {
        heading: "Subtítulos dinámicos y zonas seguras para pauta digital",
        paragraphs: [
          "Gran parte del consumo de anuncios móviles ocurre sin audio activado o en entornos ruidosos. La edición incorpora subtítulos dinámicos sincronizados con precisión, destacando palabras clave y manteniendo los textos dentro de las zonas seguras verticales 9:16.",
          "Esto garantiza que la interfaz de TikTok e Instagram (botones de me gusta, comentarios, descripciones y llamadas a la acción) no oculte datos críticos del producto ni la propuesta de valor. Para pautas de diseño y encuadre, revisa la [guía de video vertical, horizontal y zonas seguras](/es/guias/video-vertical-horizontal-y-zonas-seguras).",
        ],
      },
      {
        heading: "Variaciones de ganchos (hooks) y pruebas de creatividad",
        paragraphs: [
          "Las campañas de paid social requieren iteración constante de creatividades. A partir de una misma sesión de grabación o conjunto de tomas de producto, se pueden estructurar múltiples variaciones de inicio (hooks) acopladas a un cuerpo y llamada a la acción consistentes.",
          "Este enfoque modular permite a las marcas probar diferentes ángulos de venta, objeciones y disparadores visuales en el administrador de anuncios sin necesidad de producir videos completamente independientes desde cero.",
        ],
      },
      {
        heading: "Entrega de material y organización del flujo de postproducción",
        paragraphs: [
          "El proceso de trabajo se basa en material suministrado por el cliente: grabaciones de teléfono, tomas de producto con cámara, testimonios en video o metraje UGC. Organizar las tomas por concepto, producto y ángulo facilita una postproducción ágil y estructurada.",
          "Junto con el material grabado, compartir guiones, logotipos vectoriales, lineamientos de marca y la oferta exacta agiliza la integración de gráficos y llamados a la acción. Consulta la [guía de entrega para edición remota de video](/es/guias/entrega-para-edicion-remota-de-video) para preparar tus archivos.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Qué tipo de material debo entregar para la edición de anuncios de TikTok?",
        answer:
          "Trabajamos con material suministrado por el cliente: grabaciones en smartphone o cámara, tomas de uso de producto, testimonios estilo UGC, demostraciones y recursos de marca (logos, fuentes, directrices de oferta).",
      },
      {
        question: "¿Entregan variaciones de ganchos (hooks) para pruebas publicitarias?",
        answer:
          "Sí. Podemos estructurar múltiples inicios de 3 a 5 segundos combinados con un cuerpo común y llamada a la acción para facilitar pruebas A/B en campañas de paid social.",
      },
      {
        question: "¿Cómo aseguran que los subtítulos y gráficos no queden tapados por la interfaz de TikTok?",
        answer:
          "Diseñamos cada pieza respetando las zonas seguras verticales 9:16 de TikTok e Instagram Reels, asegurando que textos, subtítulos dinámicos y logos queden libres de botones y descripciones de la plataforma.",
      },
      {
        question: "¿Los anuncios editados son compatibles con campañas en Instagram Reels y Facebook Ads?",
        answer:
          "Sí. Los anuncios en formato vertical 9:16 y las adaptaciones cuadradas 1:1 o 4:5 se configuran para rendir en los placements de TikTok Ads Manager y Meta Ads Manager.",
      },
      {
        question: "¿Cómo se gestionan las revisiones y ajustes en la edición de anuncios?",
        answer:
          "Tras compartir el primer borrador, se recopilan comentarios específicos con marcas de tiempo sobre ritmo, ganchos, gráficos y textos para aplicar los ajustes dentro del alcance acordado del proyecto.",
      },
    ],
  },
  {
    slug: "edicion-de-video-para-cursos-online",
    title: "Edición de video para cursos online y webinars",
    metadataTitle: "Edición Video Cursos Online",
    description:
      "Edición de módulos educativos, lecciones en video, webinars y tutoriales para plataformas de e-learning.",
    eyebrow: "Cursos Online / E-Learning",
    h1: "Edición de video para cursos en línea y programas educativos.",
    lead:
      "Pule tus lecciones educativas con sincronización de diapositivas, audio cristalino y gráficos que facilitan el aprendizaje.",
    keyword: "edición de video para cursos online",
    location: "Miami-Dade / Broward",
    availability: "confirmed",
    icon: WandSparkles,
    bestFor: [
      "Infoproductores, mentores y creadores de cursos digitales.",
      "Instituciones educativas y plataformas de e-learning.",
    ],
    scopingQuestions: [
      "¿El curso combina grabación de pantalla con cámara del instructor?",
      "¿Deseas resaltar puntos clave con texto animado en pantalla?",
    ],
    projectFit:
      "Estructura clara y sonido nivelado para máxima claridad pedagógica.",
    faqs: [
      {
        question: "¿Limpian ruidos de fondo y titubeos del instructor?",
        answer:
          "Sí. Editamos el audio para eliminar ruidos ambiente y pausas innecesarias, manteniendo la fluidez del habla.",
      },
    ],
  },
  {
    slug: "edicion-de-video-de-capacitacion-corporativa-miami",
    title: "Edición de video de capacitación corporativa en Miami",
    metadataTitle: "Video Capacitación Corporativa Miami",
    description:
      "Edición de videos de inducción, procedimientos SOP y capacitaciones internas para empresas en Miami.",
    eyebrow: "Capacitación Corporativa / SOP",
    h1: "Videos de capacitación e inducción interna para corporativos.",
    lead:
      "Convierte manuales y procesos operativos en videos explicativos breves que aceleran la incorporación de empleados.",
    keyword: "edición de video de capacitación corporativa en Miami",
    location: "Distrito Financiero / Doral / Miami",
    availability: "confirmed",
    icon: Building2,
    bestFor: [
      "Departamentos de recursos humanos y operaciones en empresas corporativas.",
      "Firmas en expansión que necesitan estandarizar su entrenamiento.",
    ],
    scopingQuestions: [
      "¿El video incluirá capturas de pantalla de software o grabaciones presenciales?",
      "¿Requieres resúmenes clave al final de cada módulo?",
    ],
    projectFit:
      "Formato profesional, claro e instructivo.",
    faqs: [
      {
        question: "¿Se pueden añadir cuestionarios o llamados en pantalla?",
        answer:
          "Sí. Agregamos placas de texto y pausas de repaso para reforzar la absorción de contenidos.",
      },
    ],
  },
  {
    slug: "editor-de-video-para-campanas-de-crowdfunding",
    title: "Editor de video para campañas de crowdfunding en Miami",
    metadataTitle: "Video Editor Crowdfunding Miami",
    description:
      "Edición de videos de lanzamiento de producto para campañas en Kickstarter e Indiegogo.",
    eyebrow: "Crowdfunding / Lanzamiento de Producto",
    h1: "Videos emotivos y persuasivos para campañas de crowdfunding.",
    lead:
      "Cuenta la historia detrás de tu innovación con videos persuasivos diseñados para captar patrocinadores e inversores.",
    keyword: "editor de video para campañas de crowdfunding en Miami",
    location: "Wynwood / Miami-Dade",
    availability: "confirmed",
    icon: WandSparkles,
    bestFor: [
      "Startups tecnológicas, creadores de gadgets y emprendedores en Kickstarter.",
      "Marcas innovadoras que buscan financiamiento inicial.",
    ],
    scopingQuestions: [
      "¿Cuentas con animación 3D de prototipo o grabaciones de prototipo real?",
      "¿El video incluye el testimonio del fundador?",
    ],
    projectFit:
      "Narrativa inspiradora enfocada en generar emoción y confianza en el proyecto.",
    faqs: [
      {
        question: "¿Integran llamado a la acción final con metas de financiamiento?",
        answer:
          "Sí. Diseñamos gráficos finales atractivos con los incentivos de la campaña y llamada al patrocinio.",
      },
    ],
  },
  {
    slug: "edicion-de-video-con-dron-miami",
    title: "Servicio de edición de video con dron en Miami",
    metadataTitle: "Servicio Edición Video Dron Miami",
    description:
      "Posproducción y corrección de color de tomas aéreas grabadas con dron para arquitectura, eventos y bienes raíces.",
    eyebrow: "Video Aéreo / Dron",
    h1: "Posproducción y colorimetría profesional para video aéreo con dron.",
    lead:
      "Estabiliza, corrige el color e integra gráficos sobre tus tomas en 4K grabadas con dron para resultados deslumbrantes.",
    keyword: "servicio de edición de video con dron en Miami",
    location: "Miami-Dade / Broward / Palm Beach",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Operadores de dron y videógrafos aéreos que buscan delegar la posproducción.",
      "Empresas de bienes raíces, construcción y eventos al aire libre.",
    ],
    scopingQuestions: [
      "¿El material proviene de tomas horizontales o verticales?",
      "¿Deseas nivelar tonos de cielo y agua en tomas marciales?",
    ],
    projectFit:
      "Tratamiento de color cinemático para tomas panorámicas.",
    faqs: [
      {
        question: "¿Cómo corrigen el parpadeo o movimientos bruscos del dron?",
        answer:
          "Aplicamos algoritmos de estabilización digital de alta precisión para suavizar el recorrido de cámara.",
      },
    ],
  },
  {
    slug: "postproduccion-de-videos-musicales-miami",
    title: "Postproducción de videos musicales en Miami",
    metadataTitle: "Postproducción Videos Musicales Miami",
    description:
      "Montaje, corrección de color cinemática y sincronización de labios para videos musicales de artistas en Miami.",
    eyebrow: "Videos Musicales / Artistas",
    h1: "Postproducción cinemática para videos musicales en Miami.",
    lead:
      "Crea una pieza audiovisual icónica para tu lanzamiento musical con colorimetría de cine y efectos rítmicos adaptados al género.",
    keyword: "postproducción de videos musicales en Miami",
    location: "Wynwood / Miami Beach",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Artistas independientes, bandas y sellos discográficos en Miami.",
      "Directores de videos musicales que buscan posproducción de alto nivel.",
    ],
    scopingQuestions: [
      "¿Cuál es el género musical y el tono visual deseado (urbano, pop, latino)?",
      "¿Cuentas con múltiples tomas de playback de la canción?",
    ],
    projectFit:
      "Sincronización milimétrica y look de cine estilizado.",
    faqs: [
      {
        question: "¿Sincronizan múltiples tomas de interpretación con la pista master?",
        answer:
          "Sí. Realizamos multicámara sincronizada con la pista de audio master para cortar entre diferentes escenarios.",
      },
    ],
  },
  {
    slug: "edicion-de-clips-para-webinars",
    title: "Edición de clips para webinars y eventos virtuales",
    metadataTitle: "Edición Clips Webinars Miami",
    description:
      "Corte y extracción de momentos destacados de webinars largos para convertirlos en cápsulas virales para redes sociales.",
    eyebrow: "Webinars / Clips para Redes",
    h1: "Transforma webinars grabados en clips virales para redes sociales.",
    lead:
      "Extrae los mejores consejos e ideas de tus eventos virtuales y conviertenlos en reels con subtítulos animados de alto impacto.",
    keyword: "edición de clips para webinars",
    location: "Miami-Dade / Broward",
    availability: "confirmed",
    icon: WandSparkles,
    bestFor: [
      "Conferencistas, consultores y empresas que organizan webinars periódicos.",
      "Agencias de marketing que buscan maximizar el contenido de eventos virtuales.",
    ],
    scopingQuestions: [
      "¿Tienes identificados los minutos de las mejores intervenciones?",
      "¿Deseas formato 9:16 vertical con subtítulos resaltados?",
    ],
    projectFit:
      "Optimización de contenido largo para consumo rápido en redes.",
    faqs: [
      {
        question: "¿Pueden seleccionar ustedes las mejores partes del webinar?",
        answer:
          "Sí. Revisamos la grabación para identificar los momentos con mayor gancho y valor informativo.",
      },
    ],
  },
  {
    slug: "produccion-masiva-de-video-para-redes-miami",
    title: "Producción masiva de video para redes en Miami",
    metadataTitle: "Producción Masiva Video Redes Miami",
    description:
      "Servicio de batching de contenido en video: edición de decenas de reels y shorts a partir de sesiones de grabación concentradas.",
    eyebrow: "Batching / Contenido Masivo",
    h1: "Edición masiva de video para mantener presencia constante en redes.",
    lead:
      "Aprovecha un solo día de grabación para obtener un mes entero de contenido en video perfectamente editado y programable.",
    keyword: "producción masiva de video para redes en Miami",
    location: "Miami-Dade / Broward / Palm Beach",
    availability: "confirmed",
    icon: WandSparkles,
    bestFor: [
      "Creadores de marca personal, ejecutivos y empresas con publicación diaria.",
      "Equipos de marketing que trabajan con calendarios mensuales de contenido.",
    ],
    scopingQuestions: [
      "¿Cuántos videos mensuales planeas publicar (15, 30, 60 clips)?",
      "¿Cuentas con la plantilla gráfica de marca lista?",
    ],
    projectFit:
      "Flujo de trabajo estructurado y entregas organizadas por fecha.",
    faqs: [
      {
        question: "¿Cómo entregan los lotes masivos de video?",
        answer:
          "Organizamos los archivos en carpetas ordenadas por semana y día con nombres descriptivos para su publicación.",
      },
    ],
  },
  {
    slug: "servicio-de-edicion-de-entrevistas-de-video",
    title: "Servicio de edición de entrevistas de video",
    metadataTitle: "Edición Entrevistas Video Miami",
    description:
      "Edición multicámara de entrevistas, limpieza de audio, encuadre dinámico e inserción de b-roll para testimonios.",
    eyebrow: "Entrevistas / Testimoniales Multicámara",
    h1: "Edición profesional de entrevistas de video y conversaciones.",
    lead:
      "Pule conversaciones grabadas a dos o más cámaras, alternando encuadres de forma fluida y agregando material de apoyo visual.",
    keyword: "servicio de edición de entrevistas de video",
    location: "Miami-Dade / Broward",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Podcasters, periodistas y productores de contenido documental.",
      "Empresas que graban testimonios de clientes o paneles de expertos.",
    ],
    scopingQuestions: [
      "¿La entrevista fue grabada a 1, 2 o 3 cámaras simultáneas?",
      "¿Requiere inserción de b-roll de apoyo durante la narración?",
    ],
    projectFit:
      "Cortes invisibles que priorizan el ritmo natural del testimonio.",
    faqs: [
      {
        question: "¿Sincronizan audio grabado externamente con micrófonos de solapa?",
        answer:
          "Sí. Sincronizamos las pistas de audio independientes con la señal de video de las cámaras de forma perfecta.",
      },
    ],
  },
  {
    slug: "produccion-de-video-fort-lauderdale",
    title: "Producción de video en Fort Lauderdale",
    // 2026-10-29 GSC review: 10 impr pos 14.0 en la versión EN y consultas como
    // "editor de video fort lauderdale" / "produccion de video fort lauderdale" con 0 clics.
    // Título y descripción responden primero con precio base y atención en español.
    metadataTitle: "Producción de Video Fort Lauderdale",
    description:
      `Producción y edición de video en Fort Lauderdale para negocios de Broward. Edición remota desde ${usd(SHORT_FORM.perVideoFrom)} y grabación local cotizada por proyecto en español.`,
    eyebrow: "Fort Lauderdale / Broward",
    h1: "Producción de video en Fort Lauderdale para negocios que necesitan explicar su oferta.",
    lead:
      "Fort Lauderdale es la base de Esteban Moreno Media. Esta página ayuda a preparar una consulta de video para negocios de Broward: qué se debe grabar, qué material ya existe, dónde se publicará y si el proyecto requiere captura local dentro de [Fort Lauderdale como base, tres condados como área de servicio](/es/areas) o solo edición remota.",
    keyword: "producción de video Fort Lauderdale",
    location: "Fort Lauderdale / Broward County",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Negocios de Broward que necesitan un video claro para su web, redes o perfil local.",
      "Equipos con clips existentes que quieren convertirlos en piezas listas para publicar.",
      "Marcas que prefieren definir el alcance y revisar el material en español.",
      "Proyectos que pueden necesitar captura local selectiva en Fort Lauderdale.",
    ],
    scopingQuestions: [
      "¿El proyecto requiere grabar material nuevo o editar archivos existentes?",
      "¿Qué debe entender o hacer la persona después de ver el video?",
      "¿Dónde se publicará: web, Instagram, TikTok, YouTube, presentación o perfil local?",
      "¿Qué fecha, locación, referencias y formatos deben confirmarse antes de cotizar?",
    ],
    projectFit:
      "Esta ruta conecta la base local en Fort Lauderdale con servicios confirmados de edición, planificación social y producción selectiva. Para clips verticales con material existente, consulta con un [editor de Reels en Fort Lauderdale](/es/editor-de-reels-fort-lauderdale). Para una versión en inglés, revisa [video production in Fort Lauderdale](/services/video-production-fort-lauderdale).",
    sections: [
      {
        heading: "¿Qué tipo de video necesita un negocio de Fort Lauderdale?",
        paragraphs: [
          "Un video local funciona mejor cuando responde una sola pregunta: qué ofreces, para quién es y cuál es el siguiente paso. Para un restaurante puede ser una pieza de menú o ambiente; para un agente inmobiliario, un recorrido de propiedad; para un servicio profesional, una explicación corta de la oferta.",
          "Antes de hablar de cámaras o edición, conviene definir el uso principal. Un video para la página web necesita contexto y confianza; un Reel necesita ritmo y subtítulos; un video para Google Business Profile debe ser directo y fácil de entender en teléfono.",
        ],
        bullets: [
          "Una meta principal por video",
          "Material disponible y material que falta",
          "Formato vertical, horizontal o ambos",
          "Un llamado a la acción simple: llamar, escribir o revisar un ejemplo",
        ],
      },
      {
        heading: "¿Cuándo conviene editar remoto y cuándo grabar en locación?",
        paragraphs: [
          "Si ya tienes clips del equipo, producto, servicio o local, la edición remota puede ser suficiente. El trabajo se enfoca en elegir las mejores tomas, ordenar la historia, limpiar el audio cuando aplique, agregar subtítulos y exportar en el formato correcto.",
          "La captura en locación se evalúa proyecto por proyecto. Tiene sentido cuando no existe material útil, cuando el negocio necesita mostrar un espacio físico o cuando la oferta depende de personas, movimiento, producto o ambiente que no se puede explicar solo con texto.",
        ],
      },
      {
        heading: "¿Qué se debe enviar para recibir una respuesta clara?",
        paragraphs: [
          "El primer mensaje debe incluir la meta, el condado, el tipo de negocio, los archivos disponibles, una referencia visual y la fecha ideal. Esa información evita una conversación larga y ayuda a saber si el proyecto es de edición, producción o ambos.",
          "Si tienes material listo, comparte una carpeta con clips originales y una nota breve. Si todavía no tienes material, describe la locación, las personas que aparecerían, el uso previsto y los ejemplos de estilo que te gustan.",
        ],
        bullets: [
          "Meta y uso del video",
          "Enlaces a clips o carpeta de archivos",
          "Referencia visual o ejemplo de estilo",
          "Fecha y formato de publicación",
        ],
      },
      {
        heading: "¿Qué se confirma antes de una producción de video en Fort Lauderdale?",
        paragraphs: [
          "Empieza por la decisión que el video debe ayudar a tomar: escribir al negocio, entender un servicio, conocer un espacio o ver un producto. Indica la ciudad, la fecha importante, dónde se publicará y si ya existen clips útiles. Si hace falta grabar, añade las personas o áreas que deben aparecer y cualquier límite de acceso del lugar.",
          "Una referencia sirve para explicar el tono, pero no reemplaza la meta del negocio. Con esos datos, Esteban puede separar la edición remota de la captura en locación y responder con un alcance escrito, sin asumir equipo, horario ni entregables que todavía no se han acordado.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Esteban trabaja desde Fort Lauderdale?",
        answer:
          "Sí. Fort Lauderdale es la base operativa de Esteban Moreno Media dentro de Broward County. La disponibilidad para cada proyecto local se confirma después de revisar la meta, la locación y el alcance.",
      },
      {
        question: "¿Puedo pedir solo edición si ya tengo material?",
        answer:
          "Sí. La edición remota con material existente es uno de los servicios principales. Puedes enviar clips originales, referencias, textos y la plataforma de publicación para recibir una respuesta más precisa.",
      },
      {
        question: "¿La producción local está disponible para cualquier idea?",
        answer:
          "No se publica una disponibilidad universal. La producción en locación se evalúa de forma selectiva según el objetivo, el lugar, las personas involucradas y las necesidades de captura.",
      },
      {
        question: "¿Se puede atender el proyecto en español?",
        answer:
          "Sí. La atención principal de Esteban es en español, con comunicación de trabajo disponible en inglés intermedio cuando el proyecto lo necesita.",
      },
    ],
  },
  {
    slug: "editor-de-reels-fort-lauderdale",
    title: "Editor de Reels en Fort Lauderdale",
    // 2026-10-28: la consulta "editor de reels fort lauderdale" (15 impr) aterriza
    // en la página en inglés; el título y la descripción ahora responden primero.
    metadataTitle: "Editor de Reels en Fort Lauderdale",
    description:
      `Edición de Reels en Fort Lauderdale para negocios con clips grabados: Reels, TikTok y videos cortos con subtítulos legibles y una acción clara. Desde ${usd(SHORT_FORM.perVideoFrom)} por video.`,
    eyebrow: "Reels / TikTok / Shorts",
    h1: "Editor de Reels en Fort Lauderdale para convertir clips en videos claros.",
    lead:
      "Si buscas un editor de Reels en Fort Lauderdale y ya tienes clips, empieza con tres cosas: archivos originales, una idea por video y la red donde vas a publicar. En esta página están los pasos para editar videos cortos a distancia desde Broward en español primero; la grabación local se cotiza por proyecto cuando hace falta material nuevo.",
    keyword: "editor de reels Fort Lauderdale",
    location: "Fort Lauderdale / Broward County",
    availability: "confirmed",
    icon: Scissors,
    bestFor: [
      "Restaurantes, realtors, gimnasios, med spas y negocios locales con clips sin editar.",
      "Equipos que necesitan subtítulos, ritmo y versiones listas para publicar.",
      "Dueños que prefieren explicar la oferta y revisar el contenido en español.",
      "Proyectos de contenido corto que no requieren una grabación nueva.",
    ],
    scopingQuestions: [
      "¿Cuántos clips tienes y en qué formato están grabados?",
      "¿El Reel debe vender, explicar, educar o mostrar prueba visual?",
      "¿Necesitas subtítulos, portada, música, voz o versión bilingüe?",
      "¿En qué plataforma se publicará primero?",
    ],
    projectFit:
      "Si ya tienes clips, revisa el [video social publicado de ML Colombia](/es/portafolio/ml-colombia), los [Shorts de Gains From Geebs](/es/portafolio/gains-from-geebs-shorts) y las muestras en el [portafolio](/es/portafolio) para ver piezas reales que Esteban dirigió y editó. La versión en inglés de este servicio está en [Reels Editor Fort Lauderdale](/services/reels-editor-fort-lauderdale). Si tu negocio está más al norte, revisa el [editor de Reels en Boca Raton](/es/editor-de-reels-boca-raton).",
    sections: [
      {
        // Row 89 (2026-10-14): "editor de reels fort lauderdale" 9 imp @14.8
        // was served by the EN page; this page did not answer its own query.
        heading: "¿Dónde encontrar un editor de Reels en Fort Lauderdale?",
        paragraphs: [
          `Esteban Moreno Media es un editor de Reels en Fort Lauderdale: tiene aquí su base y atiende en español primero, con inglés intermedio para proyectos bilingües. Si buscas un editor de Reels cerca de mí desde Broward, la distancia importa menos de lo que parece, porque la edición es remota: envías los clips del teléfono por un enlace y recibes el Reel con subtítulos, ritmo y formato 9:16, sin visita. La edición de Reels parte del paquete Arranque, ${esShortForm}.`,
          `La cercanía sí cuenta cuando hace falta grabar en tu negocio. La grabación en locación es un servicio pagado, ${filmingHourlyText("es")}, con alcance y cotización por proyecto, y un día de producción completo en tu negocio va ${priceSentence("es", "presencia-local").toLowerCase()}. Si tu negocio está en Miami-Dade, el [editor de Reels en Miami](/es/editor-de-reels-miami) explica lo mismo para esa zona.`,
        ],
      },
      {
        heading: "¿Qué hace útil a un Reel de negocio?",
        paragraphs: [
          "Por ejemplo, un restaurante puede enviar clips grabados con teléfono del plato, el local y una presentación corta del dueño. Una edición posible muestra primero el plato, explica qué lo distingue y termina con una sola invitación a reservar. Esteban revisa el material disponible con el negocio antes de definir la pieza; este ejemplo describe cómo preparar una consulta, no un resultado atribuido a un cliente publicado.",
          "Silencios largos, tomas repetidas, intros lentas con logotipos y textos pequeños hacen que el video pierda la atención antes de que la oferta haya sido explicada. Eliminar esos elementos no es una preferencia de estilo, sino lo que mantiene la pieza comprensible y atractiva. Si tu proyecto necesita una coordinación más amplia en la región, puedes comparar con un [editor de Reels en Miami](/es/editor-de-reels-miami) o consultar nuestro servicio como [editor de video en Miami](/es/editor-de-video-miami).",
        ],
      },
      {
        heading: "¿Qué debe incluir el material que envías?",
        paragraphs: [
          "El paquete útil para iniciar la edición incluye clips originales sin comprimir, una referencia de estilo visual, el texto o idea principal, el logotipo si aplica y la plataforma donde se publicará primero. Si existe una voz en off o un testimonio en cámara, el audio debe compartirse en la mejor calidad disponible en lugar de extraerse de una copia comprimida de aplicaciones sociales.",
          "También ayuda especificar qué material no se debe utilizar. Un editor trabaja con mayor precisión cuando conoce qué escenas son obligatorias, qué tomas están repetidas y qué parte del producto, local o persona debe mantenerse visible en todo momento. Esa indicación suele ahorrar una ronda completa de revisiones. Para proyectos con múltiples formatos, revisa la guía de [editor de video corto para redes en Miami](/es/editor-de-video-corto-para-redes-miami).",
        ],
        bullets: [
          "Clips originales, no descargas comprimidas de redes",
          "Referencia de un Reel parecido",
          "Mensaje principal y acción final",
          "Logo, colores o subtítulos deseados",
        ],
      },
      {
        heading: "¿Cómo se adapta la edición a Instagram, TikTok y Shorts?",
        paragraphs: [
          "Las plataformas verticales ubican botones de interacción, nombres de perfil, descripciones y comentarios sobre el video. Por eso los subtítulos y cualquier elemento informativo importante deben mantenerse estrictamente dentro de las zonas seguras centrales, sin tapar rostros, productos, platos de comida, propiedades ni herramientas de trabajo.",
          "El mismo video puede requerir ajustes según la plataforma: una portada distinta, una duración calculada, un texto inicial específico o una versión sin música para usar audios en tendencia. Definir el primer canal de publicación antes de comenzar la edición funciona mejor que intentar adaptarlo en la exportación final, ya que el encuadre, el ritmo de los cortes y la ubicación de los textos se estructuran según el destino previsto.",
        ],
      },
      {
        heading: "¿Cuánto cuesta editar Reels en Fort Lauderdale?",
        paragraphs: [
          `Para video corto y redes sociales, la edición con material existente se cotiza como el paquete Arranque: ${esShortForm}. El alcance, la cantidad de tomas en bruto, el diseño de subtítulos y las versiones requeridas ajustan la cotización final; es un precio de partida, no un precio cerrado.`,
          "El costo final se define mediante una cotización personalizada después de evaluar el volumen de material, la complejidad de postproducción y los plazos de entrega solicitados. Para negocios que necesitan continuidad mensual o paquetes combinados de contenido, puedes revisar todos los paquetes publicados en nuestra sección de [precios](/es/precios) o consultar las opciones de [Arranque](/es/precios/arranque) y [Crecimiento](/es/precios/crecimiento).",
        ],
      },
      {
        heading: "¿Qué debe decidir un negocio antes de pedir un Reel?",
        paragraphs: [
          "Antes de escoger música, subtítulos o una tendencia, define la sola pregunta que el Reel debe responder: qué incluye el servicio, qué pasa en una primera visita, por qué el producto es distinto o qué debe hacer la persona después. Después comparte los clips originales que sostienen esa respuesta, la cuenta donde se publicará y quién aprobará los cambios.",
          "Con ese mensaje corto, Esteban puede distinguir si el material existente alcanza para editar o si hace falta cotizar una grabación aparte. También evita que un Reel se convierta en una lista de ofertas sin relación. Para preparar la carpeta y las notas antes de enviar archivos, revisa la [guía de entrega para edición remota](/es/guias/entrega-para-edicion-remota-de-video).",
        ],
      },
      ...ES_REELS_FORT_LAUDERDALE_CONVERSATIONAL,
    ],
    faqs: [
      {
        question: "¿Puedo contratar solo la edición de Reels?",
        answer:
          "Sí. Si ya tienes clips, referencias y una meta clara, el proyecto puede enfocarse exclusivamente en edición remota de Reels, TikTok o Shorts.",
      },
      {
        question: "¿Qué pasa si mis clips están grabados con teléfono?",
        answer:
          "Se pueden revisar. Muchos proyectos de Reels parten de material grabado con teléfono, siempre que los archivos originales tengan suficiente luz, audio útil y encuadre aprovechable.",
      },
      {
        question: "¿Se pueden agregar subtítulos dinámicos?",
        answer:
          "Sí. Si el proyecto lo requiere, se trabaja con subtítulos dinámicos o textos en pantalla optimizados para zonas seguras y lectura en dispositivos móviles.",
      },
      {
        question: "¿Necesito estar en Fort Lauderdale para editar Reels?",
        answer:
          "No. La edición puede realizarse de forma totalmente remota. Fort Lauderdale importa si el proyecto requiere captura en locación o una referencia local específica.",
      },
    ],
  },
  {
    slug: "editor-de-reels-miami",
    title: "Editor de Reels en Miami",
    metadataTitle: "Editor de Reels en Miami",
    description:
      "Edición de Reels, TikTok y Shorts para negocios de Miami-Dade que necesitan piezas claras, subtituladas y listas para publicar.",
    eyebrow: "Miami / video corto",
    h1: "Editor de Reels en Miami para negocios que publican en teléfono primero.",
    lead:
      "Para negocios en Miami-Dade, los Reels funcionan mejor cuando el video muestra una oferta concreta, una experiencia real o una respuesta rápida a una duda del cliente. Esteban puede editar con material existente y revisar proyectos de captura local de forma selectiva.",
    keyword: "editor de reels Miami",
    location: "Miami-Dade / Remote",
    availability: "confirmed",
    icon: Scissors,
    bestFor: [
      "Restaurantes, tiendas, realtors, creadores y servicios locales con material para redes.",
      "Negocios bilingües que necesitan subtítulos o mensajes claros en español.",
      "Equipos que quieren convertir una grabación larga en varios clips cortos.",
      "Proyectos de Miami que requieren una consulta directa antes de grabar.",
    ],
    scopingQuestions: [
      "¿El contenido se publicará en Instagram, TikTok, Shorts o varias plataformas?",
      "¿El material muestra producto, persona, local, propiedad o testimonio?",
      "¿Necesitas versiones en español, inglés o bilingües?",
      "¿Cuál es la fecha ideal de publicación?",
    ],
    projectFit:
      "Esta página complementa [Reels para negocios en Miami](/es/reels-para-negocios-miami) y la ruta en inglés [Reels Editor Miami](/services/reels-editor-miami).",
    sections: [
      {
        heading: "¿Qué diferencia un Reel de Miami de un video genérico?",
        paragraphs: [
          "Miami-Dade cuenta con negocios con alta carga visual: restaurantes, bienestar, bienes raíces, eventos, marcas de productos, servicios profesionales y proyectos bilingües. Un Reel genérico pierde impacto cuando no muestra el local, la persona, el producto o el contexto concreto que hace creíble la oferta ante la audiencia local.",
          "La edición profesional conserva esos detalles distintivos mientras recorta pausas, vacilaciones y planos redundantes. El objetivo no es llenar segundos en pantalla, sino lograr que el espectador comprenda rápidamente por qué el negocio merece un mensaje, una visita o una llamada. Si también buscas cobertura en Broward, puedes consultar a nuestro [editor de Reels en Fort Lauderdale](/es/editor-de-reels-fort-lauderdale) o revisar el servicio integral de [editor de video en Miami](/es/editor-de-video-miami).",
        ],
      },
      {
        heading: "¿Cómo se convierte una grabación larga en varios Reels?",
        paragraphs: [
          "Una entrevista, una demostración de servicio, un recorrido de local o la cobertura de un evento pueden dividirse en piezas independientes si contienen ideas claramente diferenciadas. Cada Reel necesita su propia apertura atractiva, un punto principal bien desarrollado y un cierre con llamada a la acción concreta. Dividir un video largo en segmentos iguales casi nunca produce resultados útiles.",
          "Para estructurar la edición con precisión, conviene marcar las tomas imprescindibles y definir los temas que justifican un clip individual: preguntas frecuentes, transformaciones de antes y después, testimonios de clientes u ofertas destacadas. Para aprender a organizar tus archivos y grabaciones, puedes revisar nuestra sección de [editor de video corto para redes en Miami](/es/editor-de-video-corto-para-redes-miami).",
        ],
      },
      {
        heading: "¿Cuándo conviene pedir una versión bilingüe?",
        paragraphs: [
          "Una versión bilingüe resulta especialmente conveniente cuando el negocio atiende simultáneamente a clientes hispanohablantes y angloparlantes en el sur de Florida. Esto no siempre exige duplicar toda la producción: en muchos casos basta con incorporar subtítulos precisos, textos de apoyo en pantalla o una segunda variante editada con diferente gancho verbal.",
          "La decisión depende de la audiencia principal de cada canal y del objetivo del mensaje. En una oferta local en Miami, la legibilidad del texto en pantalla y la claridad del mensaje en dispositivos móviles tienen mayor peso que mezclar idiomas sin una razón estratégica definida. Una estructura limpia permite que ambos públicos comprendan el valor de la propuesta de inmediato.",
        ],
      },
      {
        heading: "¿Cuánto cuesta editar Reels en Miami?",
        paragraphs: [
          `La edición de video corto y Reels en Miami parte de ${usd(SHORT_FORM.perVideoFrom)} por video con el paquete Arranque, o ${esWeekly} si publicas cada semana. Ese precio cubre la postproducción de clips a partir de material suministrado.`,
          "Dado que cada proyecto varía según la cantidad de material en bruto, el ritmo de cortes, los subtítulos dinámicos y los formatos de entrega, el presupuesto final requiere una cotización a la medida. Puedes consultar las tarifas y detalles de nuestros planes en la página de [precios](/es/precios), incluyendo el paquete de edición [Arranque](/es/precios/arranque) y el plan mensual [Crecimiento](/es/precios/crecimiento).",
        ],
      },
      ...ES_REELS_MIAMI_CONVERSATIONAL,
    ],
    faqs: [
      {
        question: "¿Editan Reels para negocios de Miami con material existente?",
        answer:
          "Sí. La edición con material existente es uno de los servicios principales. Comparte clips originales, referencias, plataforma y meta para revisar el alcance.",
      },
      {
        question: "¿Puede un video largo convertirse en varios Reels?",
        answer:
          "Sí. Si el material contiene varias ideas claras, se puede dividir en clips independientes. Es preferible crear menos Reels con mensaje claro que muchos videos repetitivos.",
      },
      {
        question: "¿Se puede trabajar directamente en español?",
        answer:
          "Sí. Esteban atiende principalmente en español y también puede manejar comunicación de trabajo en inglés intermedio.",
      },
      {
        question: "¿La grabación en Miami está incluida?",
        answer:
          "No se asume automáticamente. La producción en locación se evalúa proyecto por proyecto tras analizar el objetivo comercial, la locación y la disponibilidad.",
      },
    ],
  },
  // ---------------------------------------------------------------------
  // Lote de nichos 2026-10-06. Cinco compradores distintos, no cinco
  // sinonimos: un consultorio medico que no es dental, un creador de
  // contenido que es su propio cliente, una agencia o fotografo que
  // subcontrata la edicion, un salon y un taller de detallado. Cada pagina
  // responde primero, trae secciones con encabezado en forma de pregunta y
  // un dato real por seccion, y no inventa precios, plazos ni resultados.
  // ---------------------------------------------------------------------
  {
    slug: "marketing-de-video-para-consultorios-medicos-miami",
    title: "Marketing de video para consultorios médicos en Miami",
    metadataTitle: "Video para Consultorios Médicos Miami",
    description:
      "Edición de video y producción selectiva para quiroprácticos, fisioterapia, medicina funcional y clínicas de atención sin cita en Miami-Dade y Broward.",
    eyebrow: "Consultorios / Quiropráctica / Fisioterapia",
    h1: "Video para consultorios médicos en Miami y Broward.",
    lead:
      "Esteban edita el material que el propio consultorio graba en sus salas, y considera jornadas en locación de forma selectiva. Envía los clips que ya tienes, indica cuáles cuentan con autorización firmada del paciente y recibes un siguiente paso concreto. La atención es principalmente en español y también hay comunicación en inglés intermedio.",
    keyword: "marketing de video para consultorios médicos",
    location: "Miami-Dade / Broward",
    availability: "confirmed",
    icon: Stethoscope,
    bestFor: [
      "Quiroprácticos y fisioterapeutas que quieren explicar un dolor concreto en video.",
      "Clínicas de medicina funcional con grabaciones propias listas para editar.",
      "Centros de atención sin cita que necesitan explicar cómo es la primera visita.",
      "Equipos clínicos que prefieren definir el contenido en español.",
    ],
    scopingQuestions: [
      "¿El video explicará un tratamiento, una molestia específica o la experiencia de la primera visita?",
      "¿Aparecerá algún paciente identificable y existe su autorización escrita?",
      "¿El material ya está grabado o la idea requiere una captura en la clínica?",
      "¿Dónde se publicará: redes verticales, sitio web o pauta?",
    ],
    projectFit:
      "Esta ruta conecta la edición remota con contenido clínico que puede publicarse: primero el consentimiento, después el corte. No promete disponibilidad universal ni asesoría legal.",
    sections: [
      {
        heading: "¿Qué define el consultorio antes de grabar?",
        paragraphs: [
          "Tres decisiones, y ninguna es sobre cámaras. La primera es quién aparece: un profesional, alguien del equipo, un paciente o nadie identificable. Solo el caso del paciente exige una autorización escrita de marketing bajo HIPAA, y esa autorización la conserva el consultorio, así que resolverlo primero es lo que hace posible el material con pacientes reales.",
          "La segunda es la sala. Una sala con ventana suele ganarle a una sin luz natural, y la sala más silenciosa le gana a la más impresionante cuando hay alguien hablando. La tercera es para qué sirve el video: explicar una molestia a alguien que todavía no es paciente, mostrar cómo es la primera visita, o demostrar un ejercicio que un paciente actual pueda seguir en casa. Son tres grabaciones distintas, e intentar sacarlas de una hora improvisada es la razón más común por la que un consultorio termina con material que nunca publica.",
        ],
        bullets: [
          "Decidir quién aparece y conseguir la autorización escrita antes de grabar",
          "Elegir la sala por silencio y luz, no por tamaño",
          "Un objetivo por video: explicar, mostrar la visita o demostrar un ejercicio",
          "Dejar el micrófono cerca de quien habla y lejos del equipo que zumba",
        ],
      },
      {
        heading: "¿Qué se envía cuando el material está listo?",
        paragraphs: [
          "Una carpeta, una lista y las autorizaciones. La carpeta lleva los archivos originales tal como salieron del teléfono o la cámara, no clips reenviados por mensajería, porque esa copia ya viene comprimida y el detalle no se recupera. La lista dice, en una línea por clip, qué es y adónde va: publicación vertical, encabezado del sitio o pauta.",
          "Las autorizaciones pesan igual que los archivos. Señalar qué clips muestran a un paciente identificable, y cuáles de esos están autorizados, permite montar el video solo con material publicable. Agrega el logo en vector o en archivo editable en lugar de una captura de pantalla, el nombre y el cargo de quien aparece en cámara, y la frase exacta del siguiente paso que quieres que tome quien lo vea.",
        ],
        bullets: [
          "Archivos originales, no copias reenviadas por mensajería",
          "Una línea por clip: qué es, dónde se publica y en qué formato",
          "Lista de clips con paciente identificable y cuáles están autorizados",
          "Logo en vector y el siguiente paso redactado tal como debe aparecer",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Hace falta autorización escrita antes de enviar material con pacientes?",
        answer:
          "Sí, siempre que el paciente sea reconocible. HIPAA trata el uso de información identificable del paciente con fines de marketing como algo que el paciente debe autorizar por escrito, y esa autorización la conserva el consultorio. El material del equipo, las salas, los equipos o una demostración hecha sobre personal de la clínica no plantea la misma pregunta.",
      },
      {
        question: "¿Qué puede grabar una clínica sin una jornada de producción?",
        answer:
          "Bastante. Un teléfono sobre un trípode a la altura del pecho cubre a un profesional explicando una molestia a cámara, la demostración de un ejercicio con encuadre lo bastante amplio para ver el cuerpo completo, y un recorrido breve de la sala que imagina quien nunca ha venido. Lo que conviene controlar es que la luz caiga sobre la cara y que la parte hablada se grabe en la sala más silenciosa.",
      },
      {
        question: "¿Se puede mostrar el progreso de un paciente en redes?",
        answer:
          "Con su autorización escrita y con cuidado sobre lo que la comparación insinúa. Un progreso presentado como el resultado que cualquier paciente debería esperar es una afirmación que el consultorio tendría que poder respaldar, así que el encuadre más seguro es la experiencia de una persona contada por ella misma. En la parte visual, dos clips solo se comparan si coinciden posición de cámara, distancia e iluminación.",
      },
    ],
  },
  {
    slug: "edicion-de-video-para-creadores-de-contenido-miami",
    title: "Edición de video para creadores de contenido en Miami",
    metadataTitle: "Edición para Creadores de Contenido",
    description:
      "Edición vertical, subtítulos incrustados y ritmo de publicación para creadores e influencers: una sesión de grabación convertida en varias publicaciones.",
    eyebrow: "Creadores / Influencers / Marca personal",
    h1: "Edición y ritmo de publicación para creadores.",
    lead:
      "Tú grabas; Esteban corta las publicaciones verticales, incrusta los subtítulos y convierte una sola sesión en varias piezas con un orden de publicación. Envía los archivos originales y una línea por clip indicando plataforma y cuenta, y recibes las exportaciones listas en los formatos que piden las redes.",
    keyword: "edición de video para creadores de contenido",
    location: "Miami-Dade / Broward / Remoto",
    availability: "confirmed",
    icon: Megaphone,
    bestFor: [
      "Creadores que publican varias veces por semana y no alcanzan a editar.",
      "Influencers con colaboraciones pagadas que deben declararse en el video.",
      "Marcas personales que graban en bloque y necesitan un orden de publicación.",
      "Cuentas que quieren subtítulos legibles sin depender de los automáticos.",
    ],
    scopingQuestions: [
      "¿En qué plataformas se publica y con qué cuenta?",
      "¿Cuántas ideas distintas trae la sesión grabada?",
      "¿Hay clips con colaboración pagada, producto regalado o enlace de afiliado?",
      "¿Tienes referencias de estilo, sonido o tipografía que debamos seguir?",
    ],
    projectFit:
      "Esta ruta parte de material propio y entrega piezas verticales listas para publicar. No fija cantidad de videos, calendario ni fecha de entrega sin antes revisar la sesión.",
    sections: [
      {
        heading: "¿Cómo se planea una sesión que rinda varias publicaciones?",
        paragraphs: [
          "Si publicas recomendaciones desde tu propia cuenta, consulta la [edición para creadores de comida y lugares](/es/edicion-de-video-para-creadores-de-comida-y-lugares-miami).",
          "Escribiendo la lista antes de tomar la cámara. Una sesión que rinde una pila de piezas publicables nace como una lista de ideas separadas, cada una con su propia primera frase, porque cada publicación es el primer contacto de alguien con la cuenta y no puede depender de la anterior.",
          "De ahí en adelante se trata de reiniciar algo visible entre ideas: otra chaqueta, una segunda pared, pasar de sentado a de pie. Cambios pequeños que evitan que cinco piezas se lean como cinco rebanadas del mismo clip. Mantener fija la iluminación durante todo el bloque es la decisión opuesta, y es deliberada: una luz constante permite ordenar los clips después en cualquier secuencia. Lo último que vale la pena grabar son unos segundos de sala en silencio y dos planos de apoyo, que son los que rescatan una toma con un tropiezo en el medio.",
        ],
        bullets: [
          "Una lista de ideas separadas, cada una con su propia primera frase",
          "Un cambio visible entre bloques para que no parezcan el mismo clip",
          "Iluminación fija durante toda la sesión para poder reordenar después",
          "Unos segundos de sala en silencio y planos de apoyo al final",
        ],
      },
      {
        heading: "¿Qué entrega el creador y para qué sirve la declaración de pauta?",
        paragraphs: [
          "La entrega es corta: archivos originales, una línea por clip, la plataforma y la cuenta de destino, y cualquier referencia o audio que ya tengas en mente. Nombrar la plataforma importa porque la zona segura cambia entre una publicación de feed y una vertical a pantalla completa, y el texto colocado para la otra queda tapado por la interfaz.",
          "La declaración es la parte que conviene resolver bien desde el principio. Cuando existe una relación material con una marca (pago, producto regalado, afiliación, un vínculo personal), la FTC espera que se declare de forma clara y visible donde el público realmente la note, es decir dentro del video y en lo que se dice, no solo en una descripción que hay que desplegar. Avisar al editor qué clips son colaboraciones pagadas es lo que mantiene la declaración dentro del corte.",
        ],
        bullets: [
          "Archivos originales, nunca descargas de la propia plataforma",
          "Plataforma y cuenta por clip, para colocar el texto en la zona segura",
          "Aviso de qué clips son pagados, regalados o de afiliado",
          "Subtítulos incrustados, porque gran parte del feed se reproduce sin audio",
        ],
      },
      ES_CREATOR_START_SECTION,
    ],
    faqs: [
      {
        question: "¿Qué archivos debe enviar un creador para empezar a editar?",
        answer:
          "Los originales de la cámara o del teléfono, no material vuelto a descargar desde una aplicación, porque esa exportación ya está comprimida y no se puede devolver el detalle. Con ellos, una línea por clip con el objetivo de la pieza, la cuenta y la plataforma de destino, cualquier colaboración pagada y la música o referencia que tengas en mente.",
      },
      {
        question: "¿Por qué los subtítulos van en el centro del encuadre?",
        answer:
          "Porque la aplicación dibuja el nombre de usuario, la descripción, la barra de audio y toda la columna de botones encima del video. Un texto que en el editor se ve perfecto puede quedar tapado en el teléfono. Mantener la tipografía dentro de la banda central, con suficiente contraste y peso, es la diferencia entre una pieza legible y una que nadie pudo leer.",
      },
      {
        question: "¿Una sola sesión puede cubrir una semana de publicaciones?",
        answer:
          "Puede, cuando la sesión se planea como una lista de ideas distintas y no como una sola toma larga. Cada idea necesita su propia frase de apertura, porque quien llega a la cuarta publicación no vio las tres anteriores. Cambiar una prenda o moverse a otra pared entre bloques evita que el conjunto se note grabado de una sola vez.",
      },
    ],
  },
  {
    // Row 30 (2026-10-14): ES twin of /services/hire-remote-video-editor, a
    // full translation, no new claims. Intent gap: Google autocomplete (hl=es,
    // gl=us) "contratar editor de videos", "contratar editor de videos para
    // instagram", "contratar editor de videos online", "editor de video remoto".
    slug: "contratar-editor-de-video-remoto",
    title: "Contratar un editor de video remoto",
    metadataTitle: "Contratar un Editor de Video Remoto",
    description:
      "Contrata a Esteban Moreno Media para edición de video remota: Reels, YouTube, videos de producto y contenido bilingüe desde el sur de Florida.",
    eyebrow: "Edición de video remota",
    h1: "Contrata un editor de video remoto para Reels, YouTube, anuncios y videos de tu negocio.",
    lead:
      "Esteban trabaja con el material que le envías, los archivos de tu marca y notas claras, así que un negocio en el sur de Florida o en otro estado puede pedir la edición sin reservar una grabación local.",
    keyword: "contratar editor de video remoto",
    location: "Remoto / sur de Florida",
    availability: "confirmed",
    icon: Scissors,
    bestFor: [
      "Ya tienes el material y necesitas convertirlo en Reels, Shorts, videos de YouTube, anuncios o clips para tu sitio web.",
      "Tu equipo está fuera del sur de Florida pero puede enviar los archivos originales, los materiales de marca, las referencias y los comentarios agrupados.",
      "Quieres que un solo editor entienda la meta, el ritmo, los subtítulos, los formatos y la entrega final antes de cortar.",
    ],
    scopingQuestions: [
      "¿Cuál es la meta del video y en qué plataforma se publica?",
      "¿Dónde está la carpeta con el material original y qué clips son obligatorios?",
      "¿Qué referencias, logotipo o tipografías debe seguir la edición?",
      "¿Para qué fecha necesitas la entrega y quién da los comentarios?",
    ],
    fitQuestion: "¿Cuándo encaja la edición remota?",
    projectFit:
      "La edición remota funciona mejor cuando el material ya existe y quien decide puede explicar qué debe lograr el video terminado. Para videos cortos con subtítulos y recortes verticales, mira el [editor de video corto para redes](/es/editor-de-video-corto-para-redes-miami); para creadores con material ya grabado, la [edición de video para creadores de contenido](/es/edicion-de-video-para-creadores-de-contenido-miami). Si el proyecto necesita grabación, la [producción de video en Fort Lauderdale](/es/produccion-de-video-fort-lauderdale) explica cómo se cotiza aparte.",
    sections: [
      {
        heading: "¿Cómo se contrata a un editor de video remoto?",
        paragraphs: [
          `En tres pasos. Primero, envía un brief útil: la meta del negocio, la plataforma, la carpeta con el material, los clips que no pueden faltar, las referencias y la fecha límite; un traspaso claro hace que la primera respuesta sirva. Segundo, confirma el alcance antes de editar: la cotización debe nombrar los entregables, los formatos, el camino de revisión y los tiempos, para que un lote de Reels, una edición de YouTube y un corte para anuncio no se traten como un solo video genérico. Tercero, revisa en un solo lugar: elige a una persona responsable de los comentarios y agrupa las notas por video o por minuto, porque el trabajo remoto avanza más rápido cuando las correcciones no se contradicen. La edición remota parte del paquete Arranque, ${esShortForm}.`,
        ],
        bullets: [
          "Envía el brief útil",
          "Confirma el alcance antes de editar",
          "Revisa en un solo lugar",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Qué material puede editar Esteban a distancia?",
        answer:
          "La edición remota trabaja con los archivos originales que el cliente ya tiene: material de teléfono o de cámara, grabaciones de pantalla, clips de producto y audio grabado por separado. Los archivos deben enviarse como originales y no como clips guardados de nuevo desde una app de mensajería, porque esa copia ya está comprimida y el detalle no se puede recuperar.",
      },
      {
        question: "¿Esteban trabaja con negocios fuera del sur de Florida?",
        answer:
          "Sí, para edición remota, contenido asistido por IA, planificación de redes y trabajo visual a partir de materiales, siempre que los archivos se puedan compartir en línea. La grabación en locación es una decisión aparte y solo se considera para proyectos en el sur de Florida.",
      },
      {
        question: "¿Cuánto cuesta la edición de video remota?",
        answer: `El paquete Arranque, edición remota de material que ya tienes, va ${esArranque()} con una ronda de cambios incluida. Cada proyecto se cotiza según el material real, la lista de entregables y la cantidad de rondas de cambios, así que el precio del paquete es un punto de partida y no una tarifa fija.`,
      },
      {
        question: "¿En qué idiomas trabaja Esteban?",
        answer:
          "Esteban trabaja en español primero, con comunicación en inglés intermedio, así que un brief bilingüe o un video en español es sencillo. No dice tener fluidez completa en inglés, y no es un servicio de traducción a otros idiomas.",
      },
    ],
  },
  {
    slug: "edicion-de-video-marca-blanca-para-agencias",
    title: "Edición de video en marca blanca para agencias y fotógrafos",
    metadataTitle: "Edición en Marca Blanca para Agencias",
    description:
      "Edición de video sin marca para agencias de marketing y fotógrafos que venden la grabación y subcontratan la postproducción. Tu cliente, tu entrega, tu nombre.",
    eyebrow: "Agencias / Fotógrafos / Estudios",
    h1: "Edición en marca blanca para agencias y fotógrafos.",
    lead:
      "Tú vendiste la grabación y conservas al cliente. Esteban monta el material y devuelve archivos sin marca, nombrados a tu convención, sin logo, sin crédito y sin contacto con el cliente final. Envía los archivos de cámara, los recursos de marca y un brief de una página.",
    keyword: "edición de video en marca blanca",
    location: "South Florida / Remoto",
    availability: "confirmed",
    icon: Handshake,
    bestFor: [
      "Agencias de marketing que venden video y no tienen editor de planta.",
      "Fotógrafos que graban en los mismos trabajos y subcontratan el montaje.",
      "Estudios con picos de trabajo que necesitan capacidad adicional.",
      "Equipos que requieren entregas sin marca listas para su propio cliente.",
    ],
    scopingQuestions: [
      "¿Qué entregables, formatos y relaciones de aspecto necesita el cliente final?",
      "¿Con qué cámara y perfil de imagen se grabó, y existe un LUT o grado aprobado?",
      "¿Quién será el único punto de contacto para las notas de revisión?",
      "¿Qué convención de nombres y estructura de carpetas usan en la entrega?",
    ],
    projectFit:
      "Esta ruta es capacidad de postproducción para estudios: entrega sin marca, comunicación solo con el estudio y nada publicado como referencia sin su permiso.",
    sections: [
      {
        heading: "¿Cuánto cuesta la edición de video en marca blanca?",
        paragraphs: [
          `El [paquete Arranque](/es/precios/arranque) de Esteban, edición remota del material que ya grabaste, parte desde ${PACKAGE_PRICES.arranque.kind === "from" ? usd(PACKAGE_PRICES.arranque.amount) : "un precio a cotizar"} por video e incluye una ronda de revisión. La calculadora cotiza los videos cortos igual, dentro de un mercado publicado de ${usd(SHORT_FORM.marketMin)} a ${usd(SHORT_FORM.marketMax)} por video, y ubica la edición para YouTube entre ${usd(PRICING_BANDS.youtube.baseMin)} y ${usd(PRICING_BANDS.youtube.baseMax)} por video: un rango de editor independiente con un descuento introductorio del 10 %, comparado con tarifas de mercado publicadas de ${usd(PRICING_BANDS.youtube.marketMin)} a ${usd(PRICING_BANDS.youtube.marketMax)}.`,
          `Un estudio que envía trabajo cada semana puede usar la tarifa semanal, ${esWeekly}; los volúmenes mensuales mayores se cotizan directamente y no se publican. Nada de esto es una cotización. El precio de un trabajo en marca blanca se fija cuando Esteban ve el material, la lista de entregables y las rondas de revisión que el estudio vendió a su propio cliente; por eso conviene enviar primero un proyecto representativo y cotizar el resto a partir de él.`,
        ],
      },
      {
        heading: "¿Esteban ya ha editado para agencias?",
        paragraphs: [
          "Sí, y los ejemplos publicados dicen exactamente qué hizo. Para la agencia 300 Bees editó un video para redes de [Homeowners](/es/portafolio/homeowners) a partir del material que entregó la agencia: solo edición, el arreglo que buscan la mayoría de los estudios cuando subcontratan la postproducción. En otro encargo de 300 Bees grabó en locación, video y sonido, para un consultorio odontológico en Miami, y luego editó y entregó las piezas finales ([Healthy Smile Miami](/es/portafolio/healthy-smile)).",
          "Ambos aparecen en el portafolio con el nombre de la agencia porque ese crédito ya es público. El trabajo en marca blanca no se publica salvo que el estudio lo autorice, y por eso la lista pública es corta. Si lo publicado no coincide con la categoría de tu cliente, dilo en el brief antes de cotizar el primer proyecto.",
        ],
      },
      {
        heading: "¿Qué debe incluir el paquete que envía el estudio?",
        paragraphs: [
          "Todo lo necesario para montar sin hacer una sola pregunta, que en la práctica son cinco cosas. Los archivos originales de cámara, incluida la segunda cámara si existe, con su estructura de carpetas intacta en lugar de aplanada. El audio grabado por separado, si se usó grabadora o corbatero, para sincronizarlo en lugar de reconstruirlo desde la pista de la cámara.",
          "Después, los recursos de marca en vector o en archivo por capas, porque un logo tomado de una página web es una fotografía de baja resolución de un logo. Un brief que nombre cada entregable, su relación de aspecto, su destino y su convención de nombres. Y la línea técnica: modelo de cámara, perfil de imagen, cuadros por segundo y cualquier LUT o grado aprobado. Ese último punto es el que más falta y el que decide si el montaje inicial llega con el aspecto del estudio o con una suposición.",
        ],
        bullets: [
          "Archivos originales de todas las cámaras, con sus carpetas intactas",
          "Audio grabado por separado para sincronizar, no reconstruir",
          "Marca en vector o por capas, nunca una captura de pantalla",
          "Cámara, perfil de imagen, cuadros por segundo y el LUT o grado aprobado",
        ],
      },
      {
        heading: "¿Quién habla con quién mientras corre la edición?",
        paragraphs: [
          "El estudio. La relación con el cliente final se queda con quien vendió el trabajo, así que las notas viajan a través de un único contacto designado y no llegan desde varios lados. No es una preferencia de orden: en trabajo subcontratado cada nota ya pasó por el cliente y por el estudio, y dos versiones de la misma instrucción cuestan una pasada completa sobre la línea de tiempo.",
          "La forma práctica es una sola lista consolidada por ronda, con códigos de tiempo, y un acuerdo sobre cuántas rondas incluye el trabajo antes de empezar. En la entrega los archivos van sin marca ni logo, y el trabajo no se publica como referencia pública salvo que el estudio lo autorice. Contarle o no al cliente final que la postproducción está subcontratada es una decisión del estudio, y nada en los archivos la toma por él.",
        ],
        bullets: [
          "Un único punto de contacto en el estudio para todas las notas",
          "Una lista consolidada por ronda, con códigos de tiempo",
          "Número de rondas acordado antes de empezar, no después",
          "Archivos sin marca y cero publicación como referencia sin permiso",
        ],
      },
    ],
    faqs: [
      {
        question: "¿El cliente final se enterará de que hubo un editor externo?",
        answer:
          "No por los archivos. Los entregables llegan sin marca, nombrados como pide el estudio y sin crédito, logo ni datos de contacto. La comunicación se mantiene con el estudio en lugar de ir directo al cliente final, y el trabajo no se muestra como referencia pública sin su autorización. Contarlo o no es una decisión del estudio.",
      },
      {
        question: "¿Se puede igualar un aspecto que la agencia ya tiene establecido?",
        answer:
          "Sí, y el camino más corto es una referencia que la agencia ya posea: una exportación terminada de un trabajo anterior, un LUT o un fotograma ya coloreado. Igualar un aspecto descrito con palabras cuesta más pasadas que igualar uno mostrado. Si el material viene de una cámara o un perfil nuevos para ese cliente, un clip de prueba coloreado antes del montaje completo evita una marcha atrás al final.",
      },
      {
        question: "¿Cómo se manejan las revisiones en un proyecto de marca blanca?",
        answer:
          "Como una lista consolidada por ronda, con códigos de tiempo, enviada desde un único contacto del estudio. Importa más aquí que en el trabajo directo, porque cada nota ya pasó por el cliente final y por la agencia, y dos personas con instrucciones contradictorias cuestan una pasada completa. Acordar de antemano cuántas rondas incluye el trabajo protege el alcance que el estudio cotizó.",
      },
    ],
  },
  {
    slug: "marketing-de-video-para-salones-y-barberias-miami",
    title: "Marketing de video para salones y barberías en Miami",
    metadataTitle: "Video para Salones y Barberías Miami",
    description:
      "Edición de video para salones de belleza, barberías y estudios de uñas en Miami y Fort Lauderdale: transformaciones, primeros planos y piezas verticales.",
    eyebrow: "Salones / Barberías / Estudios de uñas",
    h1: "Video para salones, barberías y estudios de uñas.",
    lead:
      "Graba la silla antes de empezar, dos o tres momentos del trabajo y la revelación desde el mismo punto. Esteban convierte esos clips en piezas verticales con el color corregido para que el resultado en pantalla se parezca al del espejo. Envía una semana de material y una nota de qué clientes dieron permiso.",
    keyword: "marketing de video para salones y barberías",
    location: "Miami-Dade / Broward",
    availability: "confirmed",
    icon: Scissors,
    bestFor: [
      "Salones de belleza que quieren mostrar transformaciones de color.",
      "Barberías que graban entre clientes y no alcanzan a editar.",
      "Estudios de uñas que necesitan primeros planos realmente nítidos.",
      "Locales con agenda que publican para llenar huecos de la semana.",
    ],
    scopingQuestions: [
      "¿Existe ya un punto fijo del local para grabar antes y después?",
      "¿Los clientes que aparecen dieron permiso para publicar?",
      "¿El contenido muestra color, corte, uñas o el ambiente del local?",
      "¿Dónde se publica y con qué frecuencia quieres sostenerlo?",
    ],
    projectFit:
      "Esta ruta parte de material grabado entre clientes y entrega piezas verticales. No promete cantidad de publicaciones ni resultados de agenda.",
    updated: "2026-10-07",
    sections: [
      {
        heading: "¿Cuánto cuesta el video para un salón o una barbería en Miami?",
        paragraphs: [
          `Si el local ya graba transformaciones con el teléfono, la edición empieza desde ${esStarterFrom} por video con el [paquete Arranque](/es/precios/arranque): edición remota, cortes verticales para Reels o TikTok y una ronda de revisión. Si el local publica cada semana, la calculadora pone el video corto en ${esWeekly}. Son precios de partida; la cotización por escrito fija el alcance real.`,
          "Lo que mueve el número es el volumen y el orden. Una semana de clips del antes, el trabajo y la revelación, grabados desde el mismo punto marcado, se edita rápido. Clips sin nombre de varias estaciones, con luz mezclada, toman más tiempo porque primero hay que igualar el color.",
        ],
      },
      {
        heading: "¿Cuánto cuesta grabar dentro del salón?",
        paragraphs: [
          `Cuando el local quiere que alguien venga a grabar, [Presencia Local](/es/precios/presencia-local) empieza desde ${esLocalFrom} por día de producción e incluye preproducción, captura en locación, edición posterior y entregables según formato, en Fort Lauderdale, Broward y proyectos seleccionados en Miami-Dade. El complemento de media jornada de captura tiene un rango orientativo de ${esHalfDayBand}, con la misma base; son alternativas, no una suma.`,
          "Una grabación en el salón avanza más rápido cuando se agenda junto con las citas y no en contra de ellas. Elige un bloque en que un estilista o barbero tenga un cliente dispuesto, una silla con luz constante y unos minutos libres para decir algo útil a cámara.",
        ],
      },
      {
        heading: "¿Cuánto cuesta un plan mensual de publicaciones para un salón?",
        paragraphs: [
          `El [plan Crecimiento](/es/precios/crecimiento) empieza desde ${esGrowthFrom} al mes e incluye plan de contenido, calendario de publicación, edición y reporte mensual. Encaja con un salón o una barbería que graba cada semana pero no tiene a nadie encargado de convertir los clips en publicaciones constantes, y que prefiere dedicar ese tiempo a los clientes en la silla.`,
          "El plan depende de que el material llegue a tiempo. Una carpeta compartida, un bloque de grabación por semana y una línea por clip que diga qué servicio muestra y quién dio permiso suele bastar. Los estudios de uñas deben enviar aparte los primeros planos, con la mano apoyada para que salgan nítidos. Compara opciones en la [calculadora](/es/calculadora) antes de pedir cotización en [contacto](/es/contacto).",
        ],
      },
      {
        heading: "¿Dónde debe vivir la cámara dentro del local?",
        paragraphs: [
          "En un solo lugar elegido, siempre el mismo. Fijar una estación y una posición de cámara convierte la grabación en un hábito en lugar de una decisión, y es también lo que hace comparables el antes y el después, porque lo único que debería cambiar entre las dos tomas es el cabello.",
          "El lugar que conviene elegir es el de luz más constante. Una estación junto a la ventana da una luz favorecedora pero cambia de color a lo largo del día y pelea con los focos cálidos del techo; una estación iluminada sobre todo por las lámparas del local es menos bonita pero repetible. Cualquiera de las dos funciona, siempre que se elija una y el balance de blancos se fije para ella en lugar de dejar que la cámara adivine. Un teléfono apoyado en un estante o sujeto al espejo a la altura del pecho es más estable que cualquier toma a pulso.",
        ],
        bullets: [
          "Una estación y una posición de cámara marcadas, siempre las mismas",
          "Balance de blancos fijado para la luz dominante, no automático",
          "Teléfono apoyado o sujeto, a la altura del pecho",
          "El antes se graba antes de tocar el cabello, no se recuerda después",
        ],
      },
      {
        heading: "¿Cuáles son las tres formas que vale la pena grabar cada semana?",
        paragraphs: [
          "La transformación, el detalle y la explicación. La transformación son dos tomas desde la misma posición, una antes de empezar y otra en la revelación, con dos o tres momentos breves del trabajo en medio. El detalle es el primer plano cerrado: el acabado de las uñas, la línea del degradado, el patrón del rizo, grabado con la mano apoyada porque a esa distancia la profundidad enfocada es mínima y las manos se mueven.",
          "La explicación es alguien del equipo diciendo algo útil a cámara: por qué se eligió un tono, cómo mantenerlo en casa, qué pedir la próxima vez. Cada forma toma menos de un minuto de la jornada y ninguna exige cerrar el local. Lo único no negociable es el permiso: quien se sienta en la silla no aceptó aparecer en una cuenta de negocio por sentarse, así que conviene preguntar antes de grabar y enviar la nota de quién dijo sí junto con los clips.",
        ],
        bullets: [
          "Transformación: dos tomas desde el mismo punto, con momentos breves en medio",
          "Detalle: primer plano con la mano apoyada para que salga nítido",
          "Explicación: una frase útil del estilista a cámara",
          "Permiso preguntado antes de grabar y anotado junto a los clips",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Qué debe grabar un salón en un día normal de trabajo?",
        answer:
          "Las piezas de una transformación, en orden: el cliente en la silla antes de empezar, dos o tres momentos breves del trabajo y el resultado final grabado desde la misma posición que la primera toma. Agrega unos segundos del local y una frase del estilista sobre lo que se hizo. Nada de eso exige cerrar el local.",
      },
      {
        question: "¿Hace falta permiso del cliente antes de publicar su corte?",
        answer:
          "Sí, y conviene pedirlo antes de grabar y no después. Alguien sentado con la capa puesta no aceptó aparecer en una cuenta de negocio solo por estar ahí, y un cliente que dice no más tarde deja un montaje construido alrededor de una cara que no se puede mostrar. Una nota de quién dio permiso, enviada con el material, evita esa situación.",
      },
      {
        question: "¿Por qué el color del cabello se ve distinto en cámara?",
        answer:
          "Casi siempre porque la luz está mezclada. La luz de la ventana es azul comparada con los focos cálidos de la estación, y cuando ambas caen sobre la misma cabeza la cámara tiene que elegir una, así que la otra tiñe todo lo que toca. Grabar siempre en el mismo punto, con la silla orientada hacia la luz dominante, se acerca mucho más al resultado real que cualquier corrección posterior.",
      },
    ],
  },
  {
    slug: "marketing-de-video-para-detallado-y-wraps-miami",
    title: "Marketing de video para detallado, polarizado y wraps en Miami",
    metadataTitle: "Video para Detallado y Wraps Miami",
    description:
      "Edición de video para talleres de detallado, polarizado y wrap de vinilo en el sur de Florida: reflejos controlados y comparaciones antes y después honestas.",
    eyebrow: "Detallado / Polarizado / Wrap de vinilo",
    h1: "Video para talleres de detallado, polarizado y wraps.",
    lead:
      "Una lámina corregida se comporta como un espejo, así que la toma trata en realidad de lo que se refleja en ella. Marca un punto fijo en la bahía, graba unos segundos al inicio y al final de cada trabajo, y Esteban monta comparaciones donde lo único que cambió es el trabajo. Envía los clips y el servicio al que corresponde cada uno.",
    keyword: "marketing de video para detallado y wraps",
    location: "Miami-Dade / Broward",
    availability: "confirmed",
    icon: Car,
    bestFor: [
      "Talleres de detallado y corrección de pintura que quieren mostrar el antes y después.",
      "Instaladores de polarizado que necesitan explicar lo que se ve desde dentro.",
      "Talleres de wrap de vinilo que viven de los bordes y los acabados.",
      "Negocios automotrices de servicio, distintos de un concesionario.",
    ],
    scopingQuestions: [
      "¿Ya existe un punto marcado en la bahía para grabar siempre igual?",
      "¿El contenido muestra corrección de pintura, recubrimiento, polarizado o wrap?",
      "¿Hay una fuente de luz dura disponible para levantar los defectos del antes?",
      "¿Qué quieres que haga quien lo vea: pedir cotización, escribir o pasar al taller?",
    ],
    projectFit:
      "Esta ruta parte de material grabado en la bahía y entrega comparaciones y piezas verticales. Las cifras de rechazo de calor o durabilidad quedan con el fabricante de la lámina.",
    sections: [
      {
        heading: "¿Cómo se controla el reflejo dentro de una bahía de trabajo?",
        paragraphs: [
          "Decidiendo qué le permites ver a la pintura. Una lámina terminada es un espejo, así que una toma de un auto en una bahía desordenada es una toma del desorden. Mover el auto a un punto que mire al cielo abierto, a una pared lisa o a una cortina metálica cerrada cambia la imagen más que cualquier ajuste posterior.",
          "El segundo control es la luz. Las luminarias amplias del techo envuelven la lámina de manera uniforme, y por eso las marcas de remolino y los hologramas desaparecen en cámara aunque sean evidentes en persona. Una sola luz dura, o el sol bajo, rasante sobre la superficie, devuelve los defectos para la toma del antes; y la misma técnica después de la corrección es lo que hace que el acabado se vea profundo en lugar de plano. Las dos tomas quieren el mismo tratamiento, porque una comparación donde solo cambió la luz no es una comparación.",
        ],
        bullets: [
          "Elegir qué se refleja: cielo abierto, pared lisa o cortina cerrada",
          "Una luz dura rasante para levantar remolinos en la toma del antes",
          "La misma luz después de la corrección, para que la comparación valga",
          "Revisar la pantalla en las tomas de polarizado antes de mover el auto",
        ],
      },
      {
        heading: "¿Qué se queda fuera de un video de detallado o polarizado?",
        paragraphs: [
          "Las cifras de desempeño que pertenecen a otro. El rechazo de calor, la protección ultravioleta y los años de durabilidad son afirmaciones del fabricante de la lámina o del recubrimiento, y un taller que las repite en su propia voz está respaldando datos que no generó. El camino más seguro y más convincente es mostrar lo que la cámara sí puede registrar: un borde instalado con un corte limpio, la vista desde dentro de un vidrio tratado frente a uno sin tratar, el agua comportándose distinto sobre una lámina recubierta.",
          "La misma disciplina aplica a la comparación. Un antes y después es honesto cuando coinciden posición, altura, distancia y luz, y deja de serlo en silencio cuando el después se graba con mejor luz. Marcar la posición de grabación en el piso es un hábito pequeño que convierte cada auto que pasa por la bahía en material usable y mantiene la afirmación dentro de lo que el video muestra.",
        ],
        bullets: [
          "Las cifras de calor y durabilidad se dejan al fabricante de la lámina",
          "Se muestra el borde instalado, el corte y la vista desde dentro",
          "El después se graba con la misma luz y la misma posición que el antes",
          "Posición de grabación marcada en el piso de la bahía",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Cómo se graba un antes y después en el taller?",
        answer:
          "Mismo punto, misma altura de cámara, misma luz, las dos veces. Una corrección se ve dramática en persona porque cambió el reflejo, y la única forma de mostrarlo en pantalla es dejar que quien mira compare dos tomas que no se diferencian en nada excepto la pintura. Marcar la posición en el piso es la forma más simple de hacerlo repetible.",
      },
      {
        question: "¿Por qué las marcas de remolino desaparecen en cámara?",
        answer:
          "Porque solo se ven bajo una luz dura y única, y la mayoría de los talleres está iluminada por luminarias amplias que envuelven la lámina y esconden justo lo que quieres mostrar. Una luz direccional, o el sol en ángulo bajo, rasante sobre la pintura, devuelve los defectos. La misma técnica después de la corrección es lo que hace que la lámina se vea profunda.",
      },
      {
        question: "¿Se puede grabar sin cerrar la bahía?",
        answer:
          "Sí, siempre que la posición de cámara se decida una vez y se reutilice. Un teléfono en trípode sobre un punto marcado, un fondo limpio detrás del auto y unos segundos capturados al inicio y al final de cada trabajo alcanzan para sostener publicaciones. Lo que arruina el material no es la falta de estudio, sino un reflejo desordenado y un ángulo distinto cada vez.",
      },
    ],
  },
  {
    slug: "video-para-med-spas-y-cirujanos-plasticos-miami",
    title: "Video para spas médicos y cirujanos plásticos en Miami",
    metadataTitle: "Video Spas Médicos Cirujanos Miami",
    description:
      "Video marketing para spas médicos y cirujanos plásticos en Miami: demostraciones de inyectables, consultas médicas y Reels educativos con consentimiento.",
    eyebrow: "Salud Estética / Spas Médicos",
    h1: "Video marketing para spas médicos y cirujanos plásticos.",
    lead:
      "Producción audiovisual clínica, demostraciones de técnicas estéticas, consultas guiadas y piezas verticales diseñadas para captar pacientes en Miami.",
    keyword: "video marketing para spas médicos en Miami",
    location: "Miami / Coral Gables / Doral",
    availability: "confirmed",
    icon: Sparkles,
    bestFor: [
      "Cirujanos plásticos y spas médicos que buscan educar a pacientes y aumentar citas de valoración.",
      "Inyectores y dermatólogos estéticos que necesitan contenido mensual profesional para Instagram y TikTok.",
    ],
    scopingQuestions: [
      "¿Qué tratamientos específicos se filmarán durante la jornada de producción clínica?",
      "¿Se cuenta con pacientes voluntarios que hayan firmado la debida autorización de imagen?",
    ],
    projectFit:
      "Ópticas macro de gran nitidez, iluminación suave de belleza y protocolos de rodaje clínico que transmiten rigor y confianza médica.",
    updated: "2026-10-18",
    sections: MED_SPA_PLASTIC_SURGEON_ES_SECTIONS,
    sectionsDisclosure: MED_SPA_PLASTIC_SURGEON_ES_DISCLOSURE,
    sectionsDestinations: MED_SPA_PLASTIC_SURGEON_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo se filman los tratamientos estéticos e inyectables con rigor profesional?",
        answer:
          "La filmación destaca la consulta médica, el instrumental esterilizado y la destreza del especialista evitando primeros planos invasivos.",
      },
      {
        question: "¿Cómo se gestiona el consentimiento de los pacientes que aparecen en video?",
        answer:
          "Cada participante firma un acuerdo formal de cesión de derechos audiovisuales con fines divulgativos antes de iniciar la grabación.",
      },
      {
        question: "¿Qué formatos en video consiguen mayor volumen de reservas para el centro?",
        answer:
          "Las cápsulas cortas en formato vertical que muestran la pericia del inyector y resuelven dudas frecuentes logran el mayor interés.",
      },
    ],
  },
  {
    slug: "video-marketing-para-contratistas-florida",
    title: "Video marketing para contratistas en Florida",
    metadataTitle: "Video para Contratistas Florida",
    description:
      "Video marketing para contratistas de techos, climatización y energía solar en Florida: filmaciones en obra, equipo técnico y testimonios de clientes.",
    eyebrow: "Servicios para el Hogar / Contratistas",
    h1: "Video marketing para contratistas y empresas de reformas.",
    lead:
      "Grabación profesional en obra, demostración de instalaciones técnicas, tomas elevadas de tejados y casos de éxito comercial en toda la Florida.",
    keyword: "video marketing para contratistas en Florida",
    location: "Miami / Fort Lauderdale / Tampa / Orlando",
    availability: "confirmed",
    icon: Hammer,
    bestFor: [
      "Contratistas de tejados, climatización y energía solar que buscan validar su solvencia ante nuevos clientes.",
      "Empresas de reformas comerciales que necesitan documentar proyectos de gran envergadura.",
    ],
    scopingQuestions: [
      "¿En qué fase de la instalación o reforma se planificará la jornada de grabación en obra?",
      "¿Se requieren testimonios en cámara del cliente propietario o solo documentación técnica del equipo?",
    ],
    projectFit:
      "Grabación ágil a pie de obra con equipos resistentes y tomas elevadas que demuestran la calidad de los materiales y la maestría del equipo.",
    updated: "2026-10-18",
    sections: CONTRACTOR_VIDEO_MARKETING_ES_SECTIONS,
    sectionsDisclosure: CONTRACTOR_VIDEO_MARKETING_ES_DISCLOSURE,
    sectionsDestinations: CONTRACTOR_VIDEO_MARKETING_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo se filman las obras en cubiertas y tejados sin entorpecer la seguridad?",
        answer:
          "Se emplean mástiles telescópicos de gran alcance y ópticas de largo alcance que capturan detalles de instalación desde posiciones seguras.",
      },
      {
        question: "¿Es posible coordinar grabaciones urgentes tras el paso de tormentas o huracanes?",
        answer:
          "Sí. Disponemos de calendarios flexibles para acudir rápidamente a documentar reparaciones de emergencia y sustituciones completas.",
      },
      {
        question: "¿Qué piezas ayudan más a cerrar presupuestos comerciales con propietarios?",
        answer:
          "Los casos de estudio breves que muestran el proceso completo y el testimonio final del cliente aportan la mayor eficacia en ventas.",
      },
    ],
  },
  {
    slug: "videografo-de-quinceaneras-miami",
    title: "Videógrafo de quinceañeras en Miami",
    metadataTitle: "Videógrafo de Quinceañeras Miami",
    description:
      "Videógrafo de quinceañeras en Miami: cobertura integral de misa y salón, multicámara para el vals, corte de honor y videos verticales familiares.",
    eyebrow: "Eventos Familiares / Quinceañeras",
    h1: "Videógrafo de fiestas de quinceañera y aniversarios.",
    lead:
      "Cinematografía emotiva de la misa religiosa, coreografía de la corte, baile de vals y celebración festiva para familias en South Florida.",
    keyword: "videógrafo de quinceañeras en Miami",
    location: "Miami / Coral Gables / Doral / Kendall",
    availability: "confirmed",
    icon: Heart,
    bestFor: [
      "Familias que desean una película cinematográfica completa y cuidada del festejo de quince años.",
      "Quinceañeras que buscan clips dinámicos en vertical para compartir con amistades en Instagram y TikTok.",
    ],
    scopingQuestions: [
      "¿En qué iglesia y salón de recepciones se celebrará la misa y la fiesta de quinceañera?",
      "¿Se contempla cobertura desde los preparativos de maquillaje y peinado en casa o desde la iglesia?",
    ],
    projectFit:
      "Grabación multicámara respetuosa, iluminación ambiental cuidada y sonido directo de la mesa de mezclas para discursos y música.",
    updated: "2026-10-18",
    sections: QUINCEANERA_VIDEOGRAPHER_ES_SECTIONS,
    sectionsDisclosure: QUINCEANERA_VIDEOGRAPHER_ES_DISCLOSURE,
    sectionsDestinations: QUINCEANERA_VIDEOGRAPHER_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cuántos camarógrafos se desplazan para cubrir la fiesta de quinceañera?",
        answer:
          "Recomendamos un equipo de dos operadores para captar la ceremonia religiosa y los bailes de la corte desde varios ángulos simultáneos.",
      },
      {
        question: "¿Cómo se asegura la calidad del audio en los brindis y las palabras de los padres?",
        answer:
          "Conectamos grabadores directamente al equipo del DJ y colocamos micrófonos inalámbricos discretos en los protagonistas.",
      },
      {
        question: "¿Cuándo recibe la familia los videos terminados de la celebración?",
        answer:
          "Entregamos un adelanto vertical en la primera semana tras la fiesta, y el documental completo tras el proceso de corrección de color.",
      },
    ],
  },
  {
    slug: "produccion-de-podcast-con-multicamara-miami",
    title: "Producción de video para podcasts con multicámara en Miami",
    metadataTitle: "Video Podcasts Multicámara Miami",
    description:
      "Producción de video para podcasts con multicámara en Miami: grabación sincronizada 4K, audio de estudio, edición completa y clips para redes.",
    eyebrow: "Contenido Digital / Podcasts",
    h1: "Producción de video para podcasts con multicámara.",
    lead:
      "Grabación profesional en estudio con múltiples cámaras 4K, microfonía dinámica, edición ágil de episodios y clips verticales con subtítulos.",
    keyword: "producción de podcast con multicámara en Miami",
    location: "Miami / Fort Lauderdale / Coral Gables",
    availability: "confirmed",
    icon: Mic,
    bestFor: [
      "Empresarios y creadores que buscan emitir su podcast en video con calidad televisiva en YouTube y Spotify.",
      "Programas de entrevistas que necesitan cápsulas verticales semanales para alimentar Instagram Reels y TikTok.",
    ],
    scopingQuestions: [
      "¿Se grabará en un estudio independiente en Miami o se montará el set en su propia oficina?",
      "¿Cuántos episodios se grabarán por sesión mensual y qué número de clips se necesita por entrega?",
    ],
    projectFit:
      "Configuración multicámara con encuadres sincronizados, iluminación favorecedora y procesado de sonido profesional sin eco.",
    updated: "2026-10-18",
    sections: MULTICAM_PODCAST_VIDEO_ES_SECTIONS,
    sectionsDisclosure: MULTICAM_PODCAST_VIDEO_ES_DISCLOSURE,
    sectionsDestinations: MULTICAM_PODCAST_VIDEO_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Es posible instalar el estudio portátil de grabación en nuestras oficinas?",
        answer:
          "Sí. Desplazamos cámaras de cine, paneles de luz y micrófonos para habilitar un set profesional en cualquier sala de juntas silenciosa.",
      },
      {
        question: "¿Cómo se suprime el ruido ambiente de aire acondicionado en la grabación?",
        answer:
          "Utilizamos micrófonos dinámicos direccionales de patrón cerrado que aíslan la voz del interlocutor frente al sonido residual del entorno.",
      },
      {
        question: "¿Los clips para redes sociales incluyen subtítulos dinámicos?",
        answer:
          "Sí. Cada clip vertical se entrega con subtítulos incrustados y diseño visual adaptado para visualizaciones móviles sin sonido.",
      },
    ],
  },
  {
    slug: "video-para-abogados-de-lesiones-personales-miami",
    title: "Video para abogados de lesiones personales en Miami",
    metadataTitle: "Video Abogados Lesiones Miami",
    description:
      "Video para abogados de lesiones personales en Miami: perfiles de litigantes, testimonios de clientes y contenido ajustado a las normas del Florida Bar.",
    eyebrow: "Sector Jurídico / Lesiones Personales",
    h1: "Video para bufetes de abogados de lesiones personales.",
    lead:
      "Producción audiovisual de prestigio, perfiles de socios litigantes y relatos de recuperación con pleno respeto a la deontología del Florida Bar.",
    keyword: "video para abogados de lesiones personales en Miami",
    location: "Miami / Coral Gables / Fort Lauderdale",
    availability: "confirmed",
    icon: Scale,
    bestFor: [
      "Bufetes de litigación civil que desean transmitir experiencia judicial y empatía humana a nuevos clientes.",
      "Socios directores de firmas de daños personales que necesitan piezas para web y redes profesionales.",
    ],
    scopingQuestions: [
      "¿Qué áreas de especialidad jurídica se abordarán en las entrevistas a los socios de la firma?",
      "¿Se contemplan grabaciones en las propias oficinas del bufete o en salas de reuniones institucionales?",
    ],
    projectFit:
      "Cinematografía sobria con iluminación suave, microfonía inalámbrica nítida y encuadres elegantes que reflejan solidez jurídica.",
    updated: "2026-10-18",
    sections: PERSONAL_INJURY_LAWYER_ES_SECTIONS,
    sectionsDisclosure: PERSONAL_INJURY_LAWYER_ES_DISCLOSURE,
    sectionsDestinations: PERSONAL_INJURY_LAWYER_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo se garantiza que el video cumpla la normativa publicitaria del Florida Bar?",
        answer:
          "Los guiones evitan promesas de indemnizaciones concretas y representaciones engañosas, centrándose en la experiencia objetiva del letrado.",
      },
      {
        question: "¿Dónde se llevan a cabo las entrevistas a los abogados de la firma?",
        answer:
          "El rodaje se organiza en despachos principales, bibliotecas jurídicas o salas de juntas para transmitir un ambiente profesional.",
      },
      {
        question: "¿Cómo se graban los testimonios de antiguos clientes con delicadeza?",
        answer:
          "Se acuerda previamente el contenido con los representados, enfocando el relato en la cercanía y el respaldo humano recibido.",
      },
    ],
  },
  {
    slug: "video-de-admisiones-para-colegios-privados-miami",
    title: "Video de admisiones para colegios privados en Miami",
    metadataTitle: "Video Admisiones Colegios Miami",
    description:
      "Video de admisiones para colegios privados en Miami: recorrido visual del campus, vida académica, testimonios de familias y captación de alumnos.",
    eyebrow: "Educación / Colegios Privados",
    h1: "Video de admisiones para colegios privados y academias.",
    lead:
      "Cinematografía institucional del campus, proyectos de ciencias y humanidades, y testimonios familiares para impulsar el proceso de matriculación.",
    keyword: "video de admisiones para colegios privados en Miami",
    location: "Miami / Coral Gables / Coconut Grove / Pinecrest",
    availability: "confirmed",
    icon: GraduationCap,
    bestFor: [
      "Colegios privados que desean transmitir su excelencia formativa y cultura comunitaria a nuevas familias.",
      "Directores de admisiones que buscan enriquecer las jornadas de puertas abiertas con material audiovisual de primer nivel.",
    ],
    scopingQuestions: [
      "¿Qué asignaturas, instalaciones deportivas y áreas singulares del campus se incluirán en el plan de rodaje?",
      "¿El centro dispone del listado actualizado de autorizaciones de imagen para alumnos y personal docente?",
    ],
    projectFit:
      "Filmación documental ágil con iluminación natural y sonido directo que capta la espontaneidad y curiosidad de los estudiantes.",
    updated: "2026-10-18",
    sections: PRIVATE_SCHOOL_ADMISSIONS_ES_SECTIONS,
    sectionsDisclosure: PRIVATE_SCHOOL_ADMISSIONS_ES_DISCLOSURE,
    sectionsDestinations: PRIVATE_SCHOOL_ADMISSIONS_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo se filman las clases lectivas sin distraer a los alumnos?",
        answer:
          "Utilizamos cámaras silenciosas y trabajamos en los laterales de las aulas para registrar las explicaciones sin interrumpir.",
      },
      {
        question: "¿Cómo se gestiona la privacidad de los menores que no cuentan con autorización?",
        answer:
          "Cruzamos el plan de grabación con los registros del centro, encuadrando a esos alumnos de espaldas o en planos desenfocados.",
      },
      {
        question: "¿Qué formatos en video apoyan mejor las campañas de captación de matrículas?",
        answer:
          "Un video de presentación general de tres minutos para la web institucional y extractos breves de testimonios para redes sociales.",
      },
    ],
  },
  {
    slug: "video-para-agencias-de-carros-exoticos-miami",
    title: "Video para agencias de carros exóticos en Miami",
    metadataTitle: "Video Carros Exóticos Miami",
    description:
      "Video para agencias de carros exóticos en Miami: cinematografía de superdeportivos, sonido de escape, estética urbana y clips de conversión en redes.",
    eyebrow: "Automoción de Lujo / Autos Exóticos",
    h1: "Video para agencias de alquiler de autos exóticos.",
    lead:
      "Cinematografía dinámica de superdeportivos, detalles de habitáculo de lujo, sonido de motor impecable y contenido vertical para reservas en Miami.",
    keyword: "video para carros exóticos en Miami",
    location: "Miami / South Beach / Wynwood / Coral Gables",
    availability: "confirmed",
    icon: Car,
    bestFor: [
      "Empresas de alquiler de superdeportivos que necesitan mostrar el estado impecable y el atractivo de sus vehículos.",
      "Agencias de conserjería de lujo que buscan cerrar reservas de clientes VIP a través de redes sociales.",
    ],
    scopingQuestions: [
      "¿Cuántos vehículos de la flota se incluirán en la jornada de rodaje comercial?",
      "¿Se requiere filmación en localizaciones costeras de Miami Beach o en las instalaciones de la propia agencia?",
    ],
    projectFit:
      "Planos a ras de suelo con estabilizador, filtros polarizadores de precisión y sonido sincronizado de aceleración y escape.",
    updated: "2026-10-18",
    sections: EXOTIC_CAR_RENTAL_ES_SECTIONS,
    sectionsDisclosure: EXOTIC_CAR_RENTAL_ES_DISCLOSURE,
    sectionsDestinations: EXOTIC_CAR_RENTAL_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo se capta el sonido auténtico de los motores deportivos sin distorsión?",
        answer:
          "Empleamos micrófonos direccionales provistos de protección contra el viento colocados estratégicamente junto al sistema de escape.",
      },
      {
        question: "¿Qué enclaves de Miami se recomiendan para filmar superdeportivos de lujo?",
        answer:
          "Aconsejamos recorridos costeros en South Beach, fondos urbanos en Wynwood y pasos elevados frente a la bahía.",
      },
      {
        question: "¿Se pueden agrupar varios vehículos en una sola jornada de producción?",
        answer:
          "Sí. Planificamos sesiones por lotes donde grabamos de tres a cinco vehículos para surtir de contenido un mes entero.",
      },
    ],
  },
  {
    slug: "marketing-de-video-para-concesionarios-south-florida",
    title: "Marketing de video para concesionarios en South Florida",
    metadataTitle: "Video Concesionarios South Florida",
    description:
      "Marketing de video para concesionarios en South Florida: presentaciones de inventario, área de servicio técnico, entregas de llaves y caso Frontline Auto.",
    eyebrow: "Automoción / Concesionarios",
    h1: "Marketing de video para concesionarios y compraventas.",
    lead:
      "Presentaciones dinámicas de vehículos en stock, confianza en el taller mecánico y videos de entregas con experiencia demostrada en el sector automotriz.",
    keyword: "video marketing para concesionarios en South Florida",
    location: "Miami / Fort Lauderdale / Hollywood / Coral Gables",
    availability: "confirmed",
    icon: CarFront,
    bestFor: [
      "Concesionarios oficiales y tiendas de seminuevos que buscan acelerar la rotación de su stock mediante video online.",
      "Grupos automotrices que desean potenciar la confianza en su área de servicio técnico y postventa.",
    ],
    scopingQuestions: [
      "¿Cuántas unidades se preparan para filmación en cada visita programada al concesionario?",
      "¿Se incorporarán testimonios de compradores en el momento de la entrega de llaves?",
    ],
    projectFit:
      "Recorridos estabilizados con gran angular, iluminación equilibrada en exposición y edición ágil adaptada a los portales de venta.",
    updated: "2026-10-18",
    sections: CAR_DEALERSHIP_VIDEO_ES_SECTIONS,
    sectionsDisclosure: CAR_DEALERSHIP_VIDEO_ES_DISCLOSURE,
    sectionsDestinations: CAR_DEALERSHIP_VIDEO_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cuántos vehículos pueden grabarse en una sola jornada de producción?",
        answer:
          "Con una preparación adecuada en campa, se filman entre ocho y doce vehículos de forma exhaustiva en cuatro horas.",
      },
      {
        question: "¿Las piezas se adaptan a las fichas técnicas de los portales de inventario?",
        answer:
          "Sí. Entregamos enlaces en horizontal para fichas web y versiones verticales para perfiles de Google y campañas en redes.",
      },
      {
        question: "¿Cómo ayuda el video a aumentar los ingresos del departamento de taller?",
        answer:
          "Los videos explicativos sobre revisiones periódicas y mantenimiento transmiten transparencia y fidelizan al cliente.",
      },
    ],
  },
  {
    slug: "video-para-expositores-del-boat-show-fort-lauderdale",
    title: "Video para expositores del boat show en Fort Lauderdale",
    metadataTitle: "Video Expositores Boat Show FL",
    description:
      "Video para expositores del boat show en Fort Lauderdale: cobertura en stands de Bahia Mar, recorridos de embarcaciones y resúmenes ágiles para marcas náuticas.",
    eyebrow: "Sector Náutico / Ferias y Exposiciones",
    h1: "Video para expositores del Salón Náutico de Fort Lauderdale.",
    lead:
      "Cobertura profesional en muelles, presentaciones de barcos en primicia, entrevistas con directivos y clips rápidos durante la semana del evento.",
    keyword: "video para expositores del boat show de Fort Lauderdale",
    location: "Fort Lauderdale / Bahia Mar / Broward Convention Center",
    availability: "confirmed",
    icon: Anchor,
    bestFor: [
      "Astilleros y fabricantes que presentan nuevos modelos y desean documentar la respuesta de los visitantes.",
      "Empresas de accesorios marítimos y electrónica náutica que precisan demostraciones de producto en funcionamiento.",
    ],
    scopingQuestions: [
      "¿En qué pantalán o pabellón del salón náutico se ubica el espacio de su firma comercial?",
      "¿Se realizarán eventos VIP de presentación o cócteles privados que requieran cobertura especial?",
    ],
    projectFit:
      "Cámaras estabilizadas ligeras para muelles concurridos, filtros polarizadores sobre el agua y entrega rápida durante la semana del salón.",
    updated: "2026-10-18",
    sections: BOAT_SHOW_EXHIBITOR_ES_SECTIONS,
    sectionsDisclosure: BOAT_SHOW_EXHIBITOR_ES_DISCLOSURE,
    sectionsDestinations: BOAT_SHOW_EXHIBITOR_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo se filma con agilidad en pantalanes y muelles con gran afluencia de público?",
        answer:
          "Empleamos estabilizadores compactos y ópticas de gran angular que permiten moverse con discreción entre los visitantes.",
      },
      {
        question: "¿Se pueden cubrir cócteles privados y presentaciones al caer la tarde?",
        answer:
          "Sí. Las cámaras con sensor de alta sensibilidad captan la atmósfera de los eventos nocturnos en el pantalán con gran calidez.",
      },
      {
        question: "¿Con qué rapidez se entregan los clips verticales para redes sociales?",
        answer:
          "Disponemos de entregas en cuarenta y ocho horas durante la feria para que los expositores publiquen mientras el evento está en marcha.",
      },
    ],
  },
  {
    slug: "cobertura-de-video-art-basel-miami-art-week",
    title: "Cobertura de video para Art Basel y Miami Art Week",
    metadataTitle: "Video Art Basel Miami Art Week",
    description:
      "Cobertura de video para Art Basel y Miami Art Week: exposiciones en ferias de arte, perfiles de artistas, activaciones de marcas y vernissages en Miami.",
    eyebrow: "Arte y Cultura / Ferias de Arte",
    h1: "Cobertura de video para Art Basel y Miami Art Week.",
    lead:
      "Cinematografía sobria y fiel al color para galerías de arte, activaciones de marcas de lujo, charlas de artistas y recepciones privadas en Miami.",
    keyword: "cobertura de video Art Basel Miami Art Week",
    location: "Miami Beach / Wynwood / Miami Design District",
    availability: "confirmed",
    icon: Palette,
    bestFor: [
      "Galerías de arte internacionales que buscan documentar su stand y conservar un testimonio fiel de las obras exhibidas.",
      "Marcas y comisarios que organizan activaciones culturales y recepciones privadas durante la semana del arte.",
    ],
    scopingQuestions: [
      "¿En qué feria oficial o satélite se encuentra ubicado el stand de la galería?",
      "¿Se realizarán entrevistas formales con los artistas o intervenciones ante coleccionistas?",
    ],
    projectFit:
      "Grabación silenciosa con sensor de alta fidelidad cromática que respeta los matices de la pintura y la iluminación del espacio expositivo.",
    updated: "2026-10-18",
    sections: ART_BASEL_MIAMI_ART_WEEK_ES_SECTIONS,
    sectionsDisclosure: ART_BASEL_MIAMI_ART_WEEK_ES_DISCLOSURE,
    sectionsDestinations: ART_BASEL_MIAMI_ART_WEEK_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo se filman las obras de arte sin alterar la iluminación de la galería?",
        answer:
          "Trabajamos con sensores sensibles y ópticas luminosas que aprovechan la luz ambiental de la sala sin focos adicionales molestos.",
      },
      {
        question: "¿Es posible grabar entrevistas con los artistas en el propio stand?",
        answer:
          "Sí. Disponemos de micrófonos inalámbricos direccionales que capturan el testimonio del artista con claridad frente al murmullo del público.",
      },
      {
        question: "¿Con qué agilidad se entregan los resúmenes para prensa y redes sociales?",
        answer:
          "Podemos realizar entregas de clips verticales en veinticuatro o cuarenta y ocho horas para acompañar las publicaciones durante la feria.",
      },
    ],
  },
  {
    slug: "video-para-aviacion-privada-y-jets-miami",
    title: "Video para aviación privada y jets en Miami",
    metadataTitle: "Video Aviación Privada y Jets Miami",
    description:
      "Video para aviación privada y jets en Miami: recorridos de cabinas ejecutivas, hangares FBO y piezas cinematográficas para vuelos chárter y venta.",
    eyebrow: "Aviación Ejecutiva / Vuelos Chárter",
    h1: "Video para aviación privada y vuelos chárter.",
    lead:
      "Cinematografía especializada en hangares FBO, cabinas de gran confort, detalles de aviónica y contenidos para comercialización de aeronaves en Miami.",
    keyword: "video para aviación privada en Miami",
    location: "Miami / Opa-locka / Miami-Dade",
    availability: "confirmed",
    icon: Plane,
    bestFor: [
      "Operadores de vuelos chárter que buscan destacar la amplitud y comodidades exclusivas de sus aeronaves.",
      "Brókeres de aviación que necesitan recorridos visuales detallados para acelerar operaciones de compraventa.",
    ],
    scopingQuestions: [
      "¿En qué terminal ejecutiva o hangar FBO se encuentra estacionada la aeronave para la filmación?",
      "¿Se requiere filmar con iluminación de cabina encendida y sistemas de aviónica en funcionamiento?",
    ],
    projectFit:
      "Ópticas ultra gran angular libres de distorsión, iluminación difusa de interiores y cámaras estabilizadas que capturan la elegancia de la cabina.",
    updated: "2026-10-19",
    sections: PRIVATE_AVIATION_VIDEO_ES_SECTIONS,
    sectionsDisclosure: PRIVATE_AVIATION_VIDEO_ES_DISCLOSURE,
    sectionsDestinations: PRIVATE_AVIATION_VIDEO_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo se gestiona el acceso de filmación a pistas y hangares ejecutivos?",
        answer:
          "Coordinamos los permisos y credenciales directamente con el operador de base fija o el departamento de vuelo correspondiente.",
      },
      {
        question: "¿Es factible filmar la cabina durante una escala corta de mantenimiento?",
        answer:
          "Sí. Empleamos sistemas de iluminación a batería compactos que permiten registrar la cabina con rapidez sin obstaculizar las tareas en tierra.",
      },
      {
        question: "¿Qué formato resulta más eficaz para la venta y alquiler de aeronaves?",
        answer:
          "Un recorrido horizontal que detalle autonomía y confort, respaldado por avances verticales para redes sociales, genera un gran volumen de consultas.",
      },
    ],
  },
  {
    slug: "videografo-de-polo-y-equitacion-wellington",
    title: "Videógrafo de polo y equitación en Wellington",
    metadataTitle: "Video de Polo y Equitación Wellington",
    description:
      "Videógrafo de polo y equitación en Wellington: partidos de alto hándicap, saltos de obstáculos, fincas hípicas y videos de venta de caballos deportivos.",
    eyebrow: "Hípica y Polo / Competición de Élite",
    h1: "Videógrafo de polo y equitación de alta competición.",
    lead:
      "Producción cinematográfica de torneos de polo, recorridos de salto en pistas ecuestres, cuadras de cría y videos de venta de caballos en Wellington.",
    keyword: "videógrafo de polo y equitación en Wellington",
    location: "Wellington / Palm Beach County",
    availability: "confirmed",
    icon: Trophy,
    bestFor: [
      "Clubes de polo y jinetes de salto que desean registrar torneos y preservar memorias deportivas de primer orden.",
      "Propietarios de yeguadas y cuadras de entrenamiento que buscan comercializar caballos deportivos ante compradores de todo el mundo.",
    ],
    scopingQuestions: [
      "¿Qué disciplina o torneo específico se documentará durante la jornada ecuestre en Wellington?",
      "¿Se requiere realizar tomas de conformación y presentación veterinaria en pista además de la competición?",
    ],
    projectFit:
      "Teleobjetivos de seguimiento continuo a alta velocidad de fotogramas y estabilizadores que capturan el dinamismo equino con absoluta seguridad.",
    updated: "2026-10-19",
    sections: EQUESTRIAN_POLO_VIDEO_ES_SECTIONS,
    sectionsDisclosure: EQUESTRIAN_POLO_VIDEO_ES_DISCLOSURE,
    sectionsDestinations: EQUESTRIAN_POLO_VIDEO_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo se filman los chukkers de polo sin perturbar el juego?",
        answer:
          "Utilizamos teleobjetivos largos y posiciones seguras en bandas autorizadas para captar lances rápidos con total nitidez.",
      },
      {
        question: "¿Pueden los videos de venta de caballos incluir pruebas sobre obstáculos?",
        answer:
          "Sí. Documentamos la inspección en pista, la morfología del animal y recorridos completos sobre saltos para dar certeza al comprador.",
      },
      {
        question: "¿Qué entregables se elaboran para la promoción de fincas ecuestres?",
        answer:
          "Producimos recorridos por establos, pistas de entrenamiento y paddocks junto con cápsulas cortas para inversores internacionales.",
      },
    ],
  },
  {
    slug: "video-para-astilleros-y-reparacion-de-yates-fort-lauderdale",
    title: "Video para astilleros y reparación de yates en Fort Lauderdale",
    metadataTitle: "Video Astilleros Fort Lauderdale",
    description:
      "Video para astilleros y reparación de yates en Fort Lauderdale: varadas en dique seco, pintura de cascos, ebanistería marina y proyectos de refit.",
    eyebrow: "Industria Naval / Refit de Yates",
    h1: "Video para astilleros y refit de superyates.",
    lead:
      "Documentación cinematográfica de varaderos, reformas estructurales en cascos, ingeniería marina y oficios artesanos a lo largo del New River.",
    keyword: "video para astilleros en Fort Lauderdale",
    location: "Fort Lauderdale / Dania Beach / Palm Beach",
    availability: "confirmed",
    icon: Anchor,
    bestFor: [
      "Astilleros y varaderos navales que desean acreditar su solvencia técnica y capacidad de izada ante capitanes y armadores.",
      "Empresas de ebanistería marina, pintura y mecánica naval que precisan casos de estudio de refits de gran eslora.",
    ],
    scopingQuestions: [
      "¿Qué hitos de la reforma naval se documentarán durante el periodo de varada en el astillero?",
      "¿Se requiere instalar cámaras fijas de lapso de tiempo para registrar procesos prolongados de pintura o calafateo?",
    ],
    projectFit:
      "Equipos resistentes al ambiente marino, lentes macro para detalles constructivos y seguimiento documental que refleja la maestría naval.",
    updated: "2026-10-19",
    sections: YACHT_REFIT_BOATYARD_ES_SECTIONS,
    sectionsDisclosure: YACHT_REFIT_BOATYARD_ES_DISCLOSURE,
    sectionsDestinations: YACHT_REFIT_BOATYARD_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo se filma en diques secos y zonas de pintura con seguridad?",
        answer:
          "Cumplimos estrictamente las directrices de prevención de riesgos laborales del astillero, portando equipos de protección individual en todo momento.",
      },
      {
        question: "¿Se pueden registrar reformas de varios meses con lapsos de tiempo?",
        answer:
          "Sí. Instalamos sistemas protegidos contra la intemperie que graban avances periódicos desde la varada hasta la botadura final.",
      },
      {
        question: "¿Qué formato resulta más idóneo para captar proyectos de gran eslora?",
        answer:
          "Un video institucional centrado en maquinaria y oficios especializados, complementado con hitos breves de obra, aporta máxima credibilidad ante armadores.",
      },
    ],
  },
  {
    slug: "video-para-clubes-de-golf-y-country-clubs-palm-beach",
    title: "Video para clubes de golf y country clubs en Palm Beach",
    metadataTitle: "Video Clubes de Golf Palm Beach",
    description:
      "Video para clubes de golf y country clubs en Palm Beach: trazados de campeonato, casas club, instalaciones deportivas y promoción de membresías sociales.",
    eyebrow: "Clubes Privados / Golf y Deporte",
    h1: "Video para clubes de golf y comunidades privadas.",
    lead:
      "Producción audiovisual distinguida para clubes de campo, recorridos hoyo a hoyo, vida social en la casa club e instalaciones de bienestar en Palm Beach.",
    keyword: "video para clubes de golf en Palm Beach",
    location: "Palm Beach / Boca Raton / Palm Beach County",
    availability: "confirmed",
    icon: Landmark,
    bestFor: [
      "Clubes de golf y country clubs que buscan atraer nuevos socios y presentar renovaciones recientes en el campo.",
      "Comunidades residenciales privadas con campo de golf que precisan videos de estilo de vida para comercializar villas exclusivas.",
    ],
    scopingQuestions: [
      "¿En qué horarios resulta más oportuno filmar el recorrido del campo para evitar interferencias con las partidas de los socios?",
      "¿Se registrarán actividades en la casa club como cenas gastronómicas, pistas de raqueta o torneos benéficos?",
    ],
    projectFit:
      "Cámaras sobre soportes estabilizados y puntos de vista elevados que capturan la belleza paisajística de fairways y greenes al amanecer.",
    updated: "2026-10-19",
    sections: COUNTRY_CLUB_GOLF_COMMUNITY_ES_SECTIONS,
    sectionsDisclosure: COUNTRY_CLUB_GOLF_COMMUNITY_ES_DISCLOSURE,
    sectionsDestinations: COUNTRY_CLUB_GOLF_COMMUNITY_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo se filma en el campo sin interrumpir el ritmo de los jugadores?",
        answer:
          "Planificamos los rodajes en las primeras horas de la mañana o en jornadas de mantenimiento semanal con equipos silenciosos.",
      },
      {
        question: "¿Se pueden incluir instalaciones de tenis, pádel y gimnasio?",
        answer:
          "Sí. Coordinamos filmaciones en pistas deportivas, zonas de hidroterapia y salones de la casa club con previa conformidad de la gerencia.",
      },
      {
        question: "¿Qué piezas ayudan a promover la captación de nuevas membresías?",
        answer:
          "Un video principal de estilo de vida combinado con cápsulas temáticas sobre gastronomía y escuelas infantiles capta solicitudes muy cualificadas.",
      },
    ],
  },
  {
    slug: "video-marketing-para-constructores-de-piscinas-south-florida",
    title: "Video marketing para constructores de piscinas en South Florida",
    metadataTitle: "Video Constructores de Piscinas FL",
    description:
      "Video marketing para constructores de piscinas en South Florida: piscinas desbordantes, cocinas exteriores, cascadas y zonas de ocio al aire libre.",
    eyebrow: "Construcción Residencial / Paisajismo Exterior",
    h1: "Video marketing para constructores de piscinas de lujo.",
    lead:
      "Filmación de proyectos exteriores a medida, bordes infinitos, revestimientos nobles y efectos de iluminación crepuscular en patios de South Florida.",
    keyword: "video marketing para constructores de piscinas en South Florida",
    location: "Coral Gables / Fort Lauderdale / Miami",
    availability: "confirmed",
    icon: Waves,
    bestFor: [
      "Empresas de construcción de piscinas de diseño y contratistas de exteriores que buscan justificar presupuestos elevados con obras acabadas.",
      "Estudios de paisajismo que desean mostrar la integración armónica entre agua, vegetación tropical y zonas de descanso al aire libre.",
    ],
    scopingQuestions: [
      "¿Se programará la filmación durante la hora dorada y el anochecer para capturar los sistemas de iluminación acuática y fuego?",
      "¿Se contará con la participación del propietario o del diseñador para relatar las particularidades de la obra en video?",
    ],
    projectFit:
      "Cámaras con amplio rango dinámico, estabilización suave a ras de agua y ópticas nítidas que realzan las texturas de revestimientos y pavimentos.",
    updated: "2026-10-19",
    sections: LUXURY_POOL_BUILDER_ES_SECTIONS,
    sectionsDisclosure: LUXURY_POOL_BUILDER_ES_DISCLOSURE,
    sectionsDestinations: LUXURY_POOL_BUILDER_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo se combinan las tomas diurnas de obra con los efectos nocturnos?",
        answer:
          "Organizamos el rodaje en dos momentos clave: media tarde para apreciar calidades constructivas y el anochecer para iluminaciones y pebeteros.",
      },
      {
        question: "¿Es posible incorporar testimonios de los propietarios de la vivienda?",
        answer:
          "Sí. Las impresiones directas del cliente final aportan una prueba social determinante para convencer a futuros compradores exigentes.",
      },
      {
        question: "¿Qué formato en video rinde mejor para campañas en redes sociales?",
        answer:
          "Los videos verticales de treinta segundos con transiciones ágiles del antes y el después consiguen un alto nivel de compartición y presupuestos.",
      },
    ],
  },
  {
    slug: "video-para-clinicas-de-medicina-regenerativa-miami",
    title: "Video para clínicas de medicina regenerativa en Miami",
    metadataTitle: "Video Medicina Regenerativa Miami",
    description:
      "Video para clínicas de medicina regenerativa en Miami: explicaciones facultativas, laboratorio biológico, tratamientos articulares y testimonios éticos.",
    eyebrow: "Medicina Avanzada / Terapias Celulares",
    h1: "Video para clínicas de medicina regenerativa.",
    lead:
      "Producción audiovisual clínica, divulgación de terapias biológicas avanzadas, tecnología de laboratorio y testimonios de pacientes en Miami.",
    keyword: "video para medicina regenerativa en Miami",
    location: "Miami / Coral Gables / Doral",
    availability: "confirmed",
    icon: Activity,
    bestFor: [
      "Médicos especialistas en medicina biológica y ortopedia regenerativa que buscan educar con rigor a pacientes indecisos.",
      "Clínicas de longevidad que necesitan contenidos claros y éticos para explicar protocolos de laboratorio y tratamientos articulares.",
    ],
    scopingQuestions: [
      "¿Qué procedimientos clínicos concretos se registrarán durante la jornada en el centro médico?",
      "¿Dispone el centro de autorizaciones formales firmadas por los pacientes que intervendrán en el rodaje?",
    ],
    projectFit:
      "Iluminación médica suave, ópticas macro de gran precisión y un enfoque respetuoso que ensalza el valor científico del equipo médico.",
    updated: "2026-10-19",
    sections: REGENERATIVE_MEDICINE_STEM_CELL_ES_SECTIONS,
    sectionsDisclosure: REGENERATIVE_MEDICINE_STEM_CELL_ES_DISCLOSURE,
    sectionsDestinations: REGENERATIVE_MEDICINE_STEM_CELL_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo se preserva la intimidad del paciente durante el rodaje médico?",
        answer:
          "Enfocamos el instrumental, la destreza manual del facultativo y los monitores diagnósticos con la debida cesión de derechos por escrito.",
      },
      {
        question: "¿Cómo se asegura el cumplimiento de las normativas de publicidad médica?",
        answer:
          "Elaboramos guiones pedagógicos basados en la evidencia científica y la cualificación profesional, evitando promesas curativas indebidas.",
      },
      {
        question: "¿Qué piezas consiguen mayor conversión de consultas médicas?",
        answer:
          "Los videos verticales educativos que resuelven dudas iniciales sobre indicaciones y plazos de recuperación generan el mayor número de citas.",
      },
    ],
  },
  {
    slug: "produccion-de-casos-de-estudio-en-video-para-empresas-miami",
    title: "Casos de estudio en video para empresas en Miami",
    metadataTitle: "Video Casos de Estudio para B2B",
    description:
      "Casos de estudio en video para empresas en Miami: entrevistas a clientes, retorno de inversión tangible, flujos operativos y testimonios ejecutivos B2B.",
    eyebrow: "Empresas y B2B / Casos de Éxito",
    h1: "Casos de estudio en video para empresas B2B.",
    lead:
      "Documentación audiovisual de casos de éxito corporativos, entrevistas a directivos, operativas en oficinas y prueba comercial para ventas complejas.",
    keyword: "casos de estudio en video para empresas en Miami",
    location: "Distrito Financiero / Downtown Miami",
    availability: "confirmed",
    icon: Briefcase,
    bestFor: [
      "Empresas tecnológicas y proveedoras de servicios corporativos que necesitan demostrar retorno de inversión en sus reuniones comerciales.",
      "Consultoras y firmas de logística que buscan acelerar decisiones de compra mediante recomendaciones verificables de directivos pares.",
    ],
    scopingQuestions: [
      "¿En qué oficina o sala de juntas del cliente se llevará a cabo la grabación de la entrevista?",
      "¿Qué métricas o beneficios concretos se desean enfatizar durante el relato del caso de éxito?",
    ],
    projectFit:
      "Entrevistas con doble cámara, iluminación suave de retrato corporativo y microfonía nítida que transmite máxima autoridad empresarial.",
    updated: "2026-10-19",
    sections: B2B_CLIENT_CASE_STUDY_ES_SECTIONS,
    sectionsDisclosure: B2B_CLIENT_CASE_STUDY_ES_DISCLOSURE,
    sectionsDestinations: B2B_CLIENT_CASE_STUDY_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo se prepara a los directivos para la entrevista ante la cámara?",
        answer:
          "Entregamos cuestionarios orientativos previos para que el interlocutor exponga el impacto en su negocio con soltura y naturalidad.",
      },
      {
        question: "¿Dónde se realiza la grabación de los testimonios empresariales?",
        answer:
          "Filmamos en las oficinas corporativas o salas de conferencias del cliente, cuidando la acústica y el encuadre profesional.",
      },
      {
        question: "¿Pueden adaptarse los videos a diferentes etapas de la venta?",
        answer:
          "Sí. Editamos una pieza documental principal, cápsulas de un minuto para presentaciones y cortes verticales para redes profesionales.",
      },
    ],
  },
  {
    slug: "video-para-disenadores-de-interiores-y-ebanisteria-miami",
    title: "Video para diseñadores de interiores y ebanistería en Miami",
    metadataTitle: "Video Diseño Interiores Miami",
    description:
      "Video para diseñadores de interiores y ebanistería en Miami: carpintería a medida, residencias de lujo, recorridos con interioristas y acabados nobles.",
    eyebrow: "Diseño y Arquitectura / Interiorismo",
    h1: "Video para diseñadores de interiores y ebanistas.",
    lead:
      "Cinematografía de espacios residenciales a medida, carpintería arquitectónica, selección de materiales y recorridos guiados en Miami.",
    keyword: "video para diseñadores de interiores en Miami",
    location: "Distrito de Diseño / Coral Gables",
    availability: "confirmed",
    icon: Palette,
    bestFor: [
      "Estudios de diseño de interiores que precisan presentar proyectos residenciales finalizados ante revistas especializadas y clientes de alto nivel.",
      "Talleres de ebanistería artesanal que desean destacar la precisión de sus ensambles, herrajes ocultos y acabados en maderas nobles.",
    ],
    scopingQuestions: [
      "¿Se encuentra la vivienda completamente amueblada y con el estilismo decorativo listo para la filmación?",
      "¿Participará el interiorista principal explicando las decisiones espaciales y la paleta de materiales elegida?",
    ],
    projectFit:
      "Deslizadores motorizados para recorridos suaves, ópticas de arquitectura sin curvatura y respeto estricto a la iluminación del proyecto.",
    updated: "2026-10-19",
    sections: INTERIOR_DESIGN_MILLWORK_ES_SECTIONS,
    sectionsDisclosure: INTERIOR_DESIGN_MILLWORK_ES_DISCLOSURE,
    sectionsDestinations: INTERIOR_DESIGN_MILLWORK_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cuál es el mejor momento para filmar un proyecto de interiorismo?",
        answer:
          "El momento ideal es inmediatamente tras la colocación del mobiliario final y la limpieza a fondo, antes de la mudanza del propietario.",
      },
      {
        question: "¿Cómo se capturan las texturas y los detalles de la madera?",
        answer:
          "Utilizamos lentes macro y movimientos lentos con iluminación difusa para resaltar vetas, ensambles y herrajes sin reflejos no deseados.",
      },
      {
        question: "¿Qué piezas audiovisuales impulsan la captación de encargos de envergadura?",
        answer:
          "Un recorrido cinematográfico de tres minutos guiado por el diseñador y clips cortos para redes sociales transmiten un posicionamiento excelente.",
      },
    ],
  },
  {
    slug: "video-para-abogados-de-planificacion-patrimonial-boca-raton",
    title: "Video para abogados de planificación patrimonial en Boca Raton",
    metadataTitle: "Video Abogados de Patrimonio Boca",
    description:
      "Video para abogados de planificación patrimonial en Boca Raton: fideicomisos familiares, protección de activos, traslados a Florida y ética legal.",
    eyebrow: "Servicios Jurídicos / Sucesiones y Patrimonios",
    h1: "Video para abogados de planificación patrimonial.",
    lead:
      "Producción audiovisual sobria y cercana para despachos de derecho sucesorio, fideicomisos familiares y protección de activos en Boca Raton.",
    keyword: "video para abogados de planificación patrimonial en Boca Raton",
    location: "Boca Raton / Palm Beach County",
    availability: "confirmed",
    icon: Scale,
    bestFor: [
      "Despachos de abogados de sucesiones y patrimonios que desean transmitir rigor y calidez a familias que planifican su legado.",
      "Abogados especialistas en derecho sucesorio que buscan forjar alianzas de recomendación con asesores financieros y patrimoniales.",
    ],
    scopingQuestions: [
      "¿Qué aspectos legales esenciales se abordarán en las cápsulas educativas para futuros clientes?",
      "¿En qué salas o despachos de la firma jurídica se dispondrá el espacio para las entrevistas principales?",
    ],
    projectFit:
      "Iluminación elegante de retrato, sonido impecable y una dirección de cámara sobria que transmite discreción, experiencia y fiabilidad.",
    updated: "2026-10-19",
    sections: ESTATE_PLANNING_ATTORNEY_ES_SECTIONS,
    sectionsDisclosure: ESTATE_PLANNING_ATTORNEY_ES_DISCLOSURE,
    sectionsDestinations: ESTATE_PLANNING_ATTORNEY_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo se garantiza el cumplimiento de las normas del Colegio de Abogados?",
        answer:
          "Cuidamos minuciosamente el lenguaje de los guiones para evitar mensajes engañosos o promesas infundadas, centrándonos en la labor formativa.",
      },
      {
        question: "¿Dónde se graban los perfiles de los abogados del bufete?",
        answer:
          "Realizamos la grabación en los despachos privados o salas de reuniones de la firma, creando un entorno de conversación distinguido.",
      },
      {
        question: "¿Qué temas jurídicos generan mayor interés en las familias?",
        answer:
          "Las explicaciones sobre fideicomisos revocables, agilización sucesoria y ventajas del domicilio en Florida suscitan el mayor volumen de consultas.",
      },
    ],
  },
  {
    slug: "video-marketing-para-hoteles-boutique-miami-beach",
    title: "Video marketing para hoteles boutique en Miami Beach",
    metadataTitle: "Video Hoteles Boutique Miami Beach",
    description:
      "Video marketing para hoteles boutique en Miami Beach: suites frente al mar, piscinas en azotea, arquitectura Art Decó y fomento de reservas directas.",
    eyebrow: "Hostelería de Lujo / Hoteles con Encanto",
    h1: "Video marketing para hoteles boutique y resorts.",
    lead:
      "Cinematografía de hospitalidad de alto nivel, suites con vistas, coctelería en azoteas y arquitectura Art Decó en Miami Beach.",
    keyword: "video marketing para hoteles boutique en Miami Beach",
    location: "Miami Beach / South Beach / Miami-Dade",
    availability: "confirmed",
    icon: Building2,
    bestFor: [
      "Hoteles boutique y establecimientos independientes que desean impulsar las reservas directas a través de su propia plataforma web.",
      "Grupos hoteleros que necesitan videos visualmente sugerentes de sus instalaciones, coctelería y suites para campañas de captación.",
    ],
    scopingQuestions: [
      "¿Qué categorías de habitaciones y zonas comunes se priorizarán durante la sesión de filmación?",
      "¿Se registrarán servicios específicos como sesiones matinales de yoga o coctelería al atardecer en la azotea?",
    ],
    projectFit:
      "Ópticas de cine luminosas, estabilizadores fluidos y rodaje en horas doradas que capturan la atmósfera inconfundible de South Beach.",
    updated: "2026-10-19",
    sections: BOUTIQUE_HOTEL_RESORT_ES_SECTIONS,
    sectionsDisclosure: BOUTIQUE_HOTEL_RESORT_ES_DISCLOSURE,
    sectionsDestinations: BOUTIQUE_HOTEL_RESORT_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo se graba en el hotel sin molestar a los clientes alojados?",
        answer:
          "Organizamos el rodaje en franjas horarias tranquilas y coordinamos con la recepción para filmar suites durante el intervalo de limpieza.",
      },
      {
        question: "¿Es factible realizar recorridos por varias categorías de habitación?",
        answer:
          "Sí. Establecemos un plan de grabación ágil para documentar dormitorios, baños de diseño y balcones con vistas en una misma jornada.",
      },
      {
        question: "¿Qué piezas favorecen que el cliente reserve directamente en la web?",
        answer:
          "Un video de presentación de noventa segundos y cápsulas para redes que resalten ventajas como desayuno incluido aumentan las reservas directas.",
      },
    ],
  },
  {
    slug: "video-para-paneles-y-conferencias-multicamara-miami",
    title: "Video para paneles y conferencias con multicámara en Miami",
    metadataTitle: "Paneles y Conferencias Miami",
    description:
      "Video para paneles y conferencias en Miami: grabación sincronizada con multicámara, audio directo de consola y edición de resúmenes ejecutivos.",
    eyebrow: "Eventos Corporativos / Multicámara",
    h1: "Grabación de paneles y conferencias con multicámara.",
    lead:
      "Cobertura audiovisual con dos cámaras sincronizadas, captura de audio directo de mesa de mezclas y edición dinámica para paneles en Miami.",
    keyword: "video para paneles y conferencias en Miami",
    location: "Miami / Fort Lauderdale / Coral Gables",
    availability: "confirmed",
    icon: Presentation,
    bestFor: [
      "Organizadores de cumbres empresariales y foros que precisan registrar ponencias con calidad broadcast.",
      "Instituciones educativas y asociaciones gremiales que difunden paneles en video bajo demanda.",
    ],
    scopingQuestions: [
      "¿La sala de conferencias cuenta con salida directa XLR en la mesa de sonido para conectar las grabadoras?",
      "¿Se requiere montaje de una cámara fija al orador principal y una segunda cámara para planos generales y preguntas?",
    ],
    projectFit:
      "Dos cámaras cinematográficas Sony con código de tiempo, micrófonos inalámbricos de solapa de respaldo e iluminación difusa para auditorios.",
    updated: "2026-10-19",
    sections: MULTICAM_PANEL_ES_SECTIONS,
    sectionsDisclosure: MULTICAM_PANEL_ES_DISCLOSURE,
    sectionsDestinations: MULTICAM_PANEL_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Es posible conectar el audio directamente a la mesa del centro de convenciones?",
        answer:
          "Sí. Coordinamos con los técnicos de sonido locales para tomar salidas XLR aisladas y registrar las voces de cada ponente con absoluta limpieza.",
      },
      {
        question: "¿Cuánto tiempo toma la entrega de los videos completos y clips para redes?",
        answer:
          "Los resúmenes y clips verticales para redes se procesan en varios días hábiles tras la sincronización de audio y la corrección de color.",
      },
      {
        question: "¿Se integran las diapositivas de la presentación en el montaje final?",
        answer:
          "Sí. Sincronizamos los archivos digitales de las diapositivas con la imagen de los oradores para crear una experiencia visual educativa completa.",
      },
    ],
  },
  {
    slug: "video-para-asambleas-corporativas-south-florida",
    title: "Video para asambleas y reuniones corporativas en South Florida",
    metadataTitle: "Asambleas Corporativas FL",
    description:
      "Video para asambleas corporativas en South Florida: grabación de mensajes de liderazgo, juntas de accionistas y transmisiones internas confidenciales.",
    eyebrow: "Comunicaciones Corporativas / Asambleas",
    h1: "Video para asambleas y reuniones corporativas.",
    lead:
      "Producción audiovisual para juntas directivas, asambleas de accionistas y reuniones informativas de empresa con absoluta confidencialidad en South Florida.",
    keyword: "video para asambleas corporativas en South Florida",
    location: "Miami / Fort Lauderdale / Palm Beach",
    availability: "confirmed",
    icon: Building2,
    bestFor: [
      "Corporaciones y firmas financieras que necesitan grabar asambleas generales con audio impecable para accionistas.",
      "Direcciones generales que difunden balances trimestrales y mensajes estratégicos a equipos deslocalizados.",
    ],
    scopingQuestions: [
      "¿La asamblea se desarrollará en una sala de juntas privada o en un auditorio corporativo?",
      "¿Se requiere la entrega de un archivo íntegro para archivo confidencial además de un video resumen con subtítulos?",
    ],
    projectFit:
      "Cámaras discretas de alta resolución, micrófonos inalámbricos cifrados y protocolos estrictos de custodia de datos.",
    updated: "2026-10-19",
    sections: CORPORATE_TOWN_HALL_ES_SECTIONS,
    sectionsDisclosure: CORPORATE_TOWN_HALL_ES_DISCLOSURE,
    sectionsDestinations: CORPORATE_TOWN_HALL_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Firman acuerdos de confidencialidad corporativos previos a la jornada?",
        answer:
          "Sí. Suscribimos acuerdos de no divulgación formales y mantenemos copias de seguridad locales cifradas para proteger la privacidad de su empresa.",
      },
      {
        question: "¿Facilitan marcas temporales para la navegación en intranets de empresa?",
        answer:
          "Sí. Entregamos índices por capítulos temáticos que permiten a los empleados saltar con facilidad a los puntos de su interés.",
      },
      {
        question: "¿Se pueden mostrar las tablas financieras en pantalla junto al directivo?",
        answer:
          "Sí. Diseñamos composiciones de pantalla dividida donde los gráficos y diapositivas se leen con total claridad mientras habla el orador.",
      },
    ],
  },
  {
    slug: "videografo-para-retiros-ejecutivos-florida-keys",
    title: "Videógrafo para retiros ejecutivos y offsites en Florida Keys",
    metadataTitle: "Retiros Ejecutivos Keys",
    description:
      "Videógrafo para retiros ejecutivos en Florida Keys: grabaciones de sesiones de liderazgo, actividades de equipo al aire libre y videos de cultura corporativa.",
    eyebrow: "Retiros de Liderazgo / Convenciones",
    h1: "Videógrafo para retiros ejecutivos y offsites.",
    lead:
      "Cobertura cinematográfica para retiros directivos, cumbres de liderazgo y viajes de incentivo en complejos hoteleros y villas exclusivas de Florida Keys.",
    keyword: "videógrafo para retiros ejecutivos en Florida Keys",
    location: "Florida Keys / Key Largo / Miami",
    availability: "confirmed",
    icon: Palmtree,
    bestFor: [
      "Empresas que reúnen a su comité de dirección en los Cayos de Florida para fijar metas y estrechar vínculos de equipo.",
      "Fondos de inversión y firmas tecnológicas que organizan jornadas anuales de estrategia y convivencia empresarial.",
    ],
    scopingQuestions: [
      "¿El retiro combina presentaciones en salas privadas con actividades náuticas o cenas al atardecer?",
      "¿Se busca un video documental emotivo para los participantes o una pieza de captación de talento para la web de la empresa?",
    ],
    projectFit:
      "Cámaras portátiles con estabilización gimbal para exteriores soleados, ópticas de retrato luminosas y sonido inalámbrico discreto.",
    updated: "2026-10-19",
    sections: EXECUTIVE_RETREAT_ES_SECTIONS,
    sectionsDisclosure: EXECUTIVE_RETREAT_ES_DISCLOSURE,
    sectionsDestinations: EXECUTIVE_RETREAT_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Realizan coberturas de varios días consecutivos en complejos de los Cayos?",
        answer:
          "Sí. Disponemos de equipos autónomos para acompañar jornadas completas de retiro en hoteles de Key Largo, Islamorada y alrededores.",
      },
      {
        question: "¿Cómo resuelven el sonido durante cenas o charlas junto al agua con brisa marina?",
        answer:
          "Utilizamos protectores antiviento de pelo profesional y cápsulas inalámbricas de solapa que eliminan el ruido de la brisa marina.",
      },
      {
        question: "¿Es posible proyectar un avance editado durante la cena de clausura del retiro?",
        answer:
          "Sí. Mediante acuerdo previo, organizamos una edición rápida para proyectar un emotivo video resumen en el banquete final del equipo.",
      },
    ],
  },
  {
    slug: "videografo-para-activacion-de-marca-miami",
    title: "Videógrafo para activación de marca y pop-ups en Miami",
    metadataTitle: "Activacion de Marca Miami",
    description:
      "Videógrafo para activación de marca en Miami: inauguraciones exclusivas, tiendas efímeras pop-up, eventos de influencers y videos de impacto social.",
    eyebrow: "Activación de Marca / Eventos Pop-Up",
    h1: "Videógrafo para activación de marca y pop-ups.",
    lead:
      "Cinematografía enérgica para campañas vivenciales, tiendas pop-up, lanzamientos de producto y activaciones de marca en Wynwood y Miami.",
    keyword: "videógrafo para activación de marca en Miami",
    location: "Miami / Miami Beach / Coral Gables",
    availability: "confirmed",
    icon: Sparkles,
    bestFor: [
      "Agencias de marketing experiencial que buscan documentar la interacción del público con instalaciones de marca.",
      "Marcas de moda, bebidas y tecnología que celebran eventos temporales pop-up en zonas emblemáticas de Miami.",
    ],
    scopingQuestions: [
      "¿La activación cuenta con photocalls interactivos, sesiones de DJs o personalizaciones de producto en directo?",
      "¿Se requieren entregas prioritarias de videos verticales durante el transcurso del evento para amplificar en redes?",
    ],
    projectFit:
      "Cámaras con altas frecuencias de cuadro para cámara lenta, estabilizadores de tres ejes y edición rítmica con grafismos cuidados.",
    updated: "2026-10-19",
    sections: BRAND_ACTIVATION_ES_SECTIONS,
    sectionsDisclosure: BRAND_ACTIVATION_ES_DISCLOSURE,
    sectionsDestinations: BRAND_ACTIVATION_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Pueden entregar clips verticales durante el mismo fin de semana del pop-up?",
        answer:
          "Sí. Coordinamos entregas rápidas de reels para amplificar la asistencia y las visualizaciones en redes mientras el evento continúa abierto.",
      },
      {
        question: "¿La música empleada cuenta con licencias comerciales para anuncios pagados?",
        answer:
          "Toda la música se obtiene de catálogos con licencia comercial completa para campañas orgánicas y publicidad digital sin problemas de derechos.",
      },
      {
        question: "¿Graban testimonios espontáneos y recorridos con creadores de contenido?",
        answer:
          "Sí. Captamos la interacción natural de los asistentes, estaciones de prueba de producto y declaraciones de influencers invitados.",
      },
    ],
  },
  {
    slug: "video-para-salas-de-ventas-de-preventa-miami",
    title: "Video para salas de venta y maquetas de preventa en Miami",
    metadataTitle: "Salas de Venta Preventa Miami",
    description:
      "Video para salas de venta inmobiliarias en Miami: recorridos de maquetas a escala, muestras de materiales exclusivos y presentaciones para inversores.",
    eyebrow: "Desarrollos Inmobiliarios / Preventa",
    h1: "Video para salas de venta y maquetas de preventa.",
    lead:
      "Cinematografía arquitectónica de salas de venta, maquetas iluminadas y acabados de lujo para comercialización de condominios en preventa en Miami.",
    keyword: "video para salas de venta de preventa en Miami",
    location: "Miami / Sunny Isles / Coral Gables",
    availability: "confirmed",
    icon: Building,
    bestFor: [
      "Promotores inmobiliarios que lanzan proyectos residenciales de lujo y buscan seducir a compradores internacionales.",
      "Equipos de ventas exclusivas de condominios que necesitan mostrar maquetas y calidades antes de que inicie la obra.",
    ],
    scopingQuestions: [
      "¿La sala de ventas incluye una maqueta arquitectónica con iluminación interior programada y pantallas interactivas?",
      "¿Se desea filmar a los directores de ventas explicando los planos de planta y las vistas del futuro edificio?",
    ],
    projectFit:
      "Lentes macro para detalles de maquetas, iluminación suave sin reflejos sobre metacrilato y movimientos de deslizador micrométricos.",
    updated: "2026-10-19",
    sections: PRE_CONSTRUCTION_SALES_ES_SECTIONS,
    sectionsDisclosure: PRE_CONSTRUCTION_SALES_ES_DISCLOSURE,
    sectionsDestinations: PRE_CONSTRUCTION_SALES_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Pueden filmar maquetas protegidas por vitrinas sin que aparezcan reflejos?",
        answer:
          "Sí. Empleamos filtros polarizadores y paneles de luz suave difusa que evitan reflejos sobre cristales y metacrilatos.",
      },
      {
        question: "¿Producen versiones en varios idiomas para compradores extranjeros?",
        answer:
          "Sí. Grabamos testimonios de agentes en inglés o español e integramos subtítulos precisos adaptados a mercados de América Latina o Europa.",
      },
      {
        question: "¿Se pueden añadir infografías 3D y planos de planta en el montaje final?",
        answer:
          "Sí. Combinamos las secuencias reales de la sala de ventas con infografías digitales y planos suministrados por el promotor.",
      },
    ],
  },
  {
    slug: "video-para-alquiler-de-oficinas-comerciales-south-florida",
    title: "Video para alquiler de oficinas y bienes raíces comerciales en South Florida",
    metadataTitle: "Video Oficinas Comerciales FL",
    description:
      "Video para alquiler de oficinas en South Florida: recorridos de sedes corporativas Clase A, parques logísticos industriales y espacios de trabajo para empresas.",
    eyebrow: "Bienes Raíces Comerciales / Oficinas",
    h1: "Video para alquiler de oficinas comerciales.",
    lead:
      "Producción de video arquitectónico para comercialización y alquiler de oficinas corporativas, naves industriales y parques logísticos en South Florida.",
    keyword: "video para alquiler de oficinas comerciales en South Florida",
    location: "Fort Lauderdale / Miami / Doral",
    availability: "confirmed",
    icon: Briefcase,
    bestFor: [
      "Brókeres comerciales y fondos inmobiliarios que comercializan edificios de oficinas Clase A y sedes multinacionales.",
      "Propietarios de parques industriales y logísticos que necesitan mostrar accesos para camiones y muelles de carga.",
    ],
    scopingQuestions: [
      "¿El complejo cuenta con zonas comunes como gimnasio para empleados, cafetería central o salas de conferencias compartidas?",
      "¿Se requiere mostrar la cercanía a vías principales de transporte, aeropuertos y accesos para mercancías?",
    ],
    projectFit:
      "Ópticas ultra angulares que respetan líneas verticales, estabilizadores gimbal para pasillos largos y gráficos con metros cuadrados disponibles.",
    updated: "2026-10-19",
    sections: COMMERCIAL_OFFICE_LEASING_ES_SECTIONS,
    sectionsDisclosure: COMMERCIAL_OFFICE_LEASING_ES_DISCLOSURE,
    sectionsDestinations: COMMERCIAL_OFFICE_LEASING_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Filman en fines de semana para evitar molestias a otros inquilinos?",
        answer:
          "Sí. Programamos grabaciones en sábados o mañanas tempranas para recorrer plantas vacías e instalaciones comunes sin interferir en la actividad diaria.",
      },
      {
        question: "¿Añaden rótulos con las superficies en metros cuadrados y alturas disponibles?",
        answer:
          "Sí. Incorporamos grafismos profesionales animados que detallan las superficies alquilables, alturas libres y características técnicas clave.",
      },
      {
        question: "¿Cuentan con equipo para grabar naves logísticas e instalaciones industriales amplias?",
        answer:
          "Sí. Disponemos de lentes de gran cobertura para registrar zonas de almacenamiento en altura, muelles de carga y accesos de transporte.",
      },
    ],
  },
  {
    slug: "video-para-odontologia-cosmetica-y-carillas-miami",
    title: "Video marketing para odontología cosmética y carillas en Miami",
    metadataTitle: "Carillas y Odontologia Miami",
    description:
      "Video para odontología estética en Miami: transformaciones de sonrisa con carillas de porcelana, testimonios de pacientes y videos clínicos de confianza.",
    eyebrow: "Odontología Estética / Sonrisas",
    h1: "Video marketing para odontología cosmética y carillas.",
    lead:
      "Producción audiovisual para clínicas dentales de alta gama: antes y después de carillas de porcelana, revelación de sonrisas y testimonios en Miami.",
    keyword: "video para odontología cosmética en Miami",
    location: "Miami / Coral Gables / Doral",
    availability: "confirmed",
    icon: Smile,
    bestFor: [
      "Odontólogos estéticos y clínicas dentales de diseño de sonrisa que buscan transmitir confianza y naturalidad en tratamientos de carillas.",
      "Especialistas en rehabilitación oral y estética dental que desean documentar historias de superación y cambio de vida de sus pacientes.",
    ],
    scopingQuestions: [
      "¿Se filmarán testimonios reales de pacientes sentados en el sillón dental o en un espacio privado de consulta?",
      "¿Se requiere iluminación específica de belleza facial para resaltar el brillo y textura natural de las carillas cerámicas?",
    ],
    projectFit:
      "Iluminación difusa de estudio para tonos de piel luminosos, lentes macro de precisión dental y entrevistas guiadas con calidez humana.",
    updated: "2026-10-19",
    sections: COSMETIC_DENTISTRY_ES_SECTIONS,
    sectionsDisclosure: COSMETIC_DENTISTRY_ES_DISCLOSURE,
    sectionsDestinations: COSMETIC_DENTISTRY_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cómo garantizan la comodidad del paciente y la higiene del gabinete dental?",
        answer:
          "Mantenemos un despliegue silencioso y compacto, desinfectamos el material y coordinamos los tiempos para respetar la pulcritud de la clínica.",
      },
      {
        question: "¿Se pueden adaptar las transformaciones dentales para videos verticales de Reels?",
        answer:
          "Sí. Editamos secuencias verticales con transiciones fluidas de antes y después concebidas para captar la atención en redes sociales.",
      },
      {
        question: "¿Ayudan a los pacientes que sienten nervios ante la cámara durante la entrevista?",
        answer:
          "Sí. Guiamos la conversación con cercanía y serenidad para que el paciente hable de su experiencia con total espontaneidad y confianza.",
      },
    ],
  },
  {
    slug: "video-para-medicos-concierge-y-clinicas-privadas-palm-beach",
    title: "Video para médicos concierge y clínicas privadas en Palm Beach",
    metadataTitle: "Medicos Concierge Palm Beach",
    description:
      "Video para medicina concierge en Palm Beach: perfiles de médicos privados, clínicas de longevidad y videos de captación de pacientes de alto patrimonio.",
    eyebrow: "Medicina Concierge / Clínicas Privadas",
    h1: "Video para médicos concierge y clínicas privadas.",
    lead:
      "Producción audiovisual distinguida para médicos privados, clínicas de longevidad y consultas de medicina concierge en Palm Beach y Boca Raton.",
    keyword: "video para médicos concierge en Palm Beach",
    location: "Palm Beach / Boca Raton / Fort Lauderdale",
    availability: "confirmed",
    icon: Stethoscope,
    bestFor: [
      "Médicos de atención personalizada y medicina preventiva que desean explicar las ventajas de su modelo de membresía anual.",
      "Clínicas de medicina integrativa y longevidad que buscan atraer familias de alto patrimonio en el condado de Palm Beach.",
    ],
    scopingQuestions: [
      "¿La filmación se llevará a cabo en una consulta médica privada con despacho y biblioteca o en una clínica de bienestar?",
      "¿El médico desea comunicar su filosofía de trato directo y disponibilidad continuada sin intermediarios administrativos?",
    ],
    projectFit:
      "Iluminación de retrato cálida y refinada, sonido impecable con micrófonos de solapa de alta gama y encuadres serenos.",
    updated: "2026-10-19",
    sections: CONCIERGE_DOCTOR_ES_SECTIONS,
    sectionsDisclosure: CONCIERGE_DOCTOR_ES_DISCLOSURE,
    sectionsDestinations: CONCIERGE_DOCTOR_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Filman en consultas privadas garantizando discreción y tranquilidad?",
        answer:
          "Sí. Organizamos las sesiones en horarios de consulta reservados, con un equipo reducido que asegura la máxima discreción y silencio.",
      },
      {
        question: "¿Orientan al médico para explicar con claridad el modelo de membresía anual?",
        answer:
          "Sí. Guiamos la entrevista mediante preguntas sencillas que permiten al doctor destacar los beneficios de su atención personalizada.",
      },
      {
        question: "¿Se pueden filmar los equipos diagnósticos y salas de pruebas de la clínica?",
        answer:
          "Sí. Grabamos con encuadres limpios la tecnología médica, analizadores de laboratorio y las instalaciones de bienestar del centro.",
      },
    ],
  },
  {
    slug: "video-para-bar-y-bat-mitzvah-boca-raton",
    title: "Producción de video para Bar y Bat Mitzvah en Boca Raton",
    metadataTitle: "Bar y Bat Mitzvah Boca Raton",
    description:
      "Producción de video cinematográfico para Bar y Bat Mitzvah en Boca Raton y Aventura: ceremonias en sinagoga, retratos familiares y fiestas de gala inolvidables.",
    eyebrow: "Celebraciones Familiares / Mitzvahs",
    h1: "Video para Bar y Bat Mitzvah en Boca Raton.",
    lead:
      "Cinematografía emotiva y dinámica para ceremonias de Bar y Bat Mitzvah, bendiciones familiares y grandes fiestas de celebración en Boca Raton.",
    keyword: "video para Bar y Bat Mitzvah en Boca Raton",
    location: "Boca Raton / Aventura / Palm Beach",
    availability: "confirmed",
    icon: PartyPopper,
    bestFor: [
      "Familias que celebran el Bar o Bat Mitzvah de sus hijos y buscan una película emotiva que preserve este hito generacional.",
      "Organizadores de eventos y planificadores de fiestas que necesitan un videógrafo de confianza con excelente manejo de iluminación nocturna.",
    ],
    scopingQuestions: [
      "¿Se grabará la lectura de la Torá durante el ensayo matinal en la sinagoga además de la fiesta nocturna?",
      "¿Se busca un cortometraje cinematográfico con discursos familiares y momentos de baile o la entrega de la fiesta completa sin cortes?",
    ],
    projectFit:
      "Objetivos prime luminosos para sinagogas y pistas de baile, sonido inalámbrico para bendiciones de los abuelos y edición musical rítmica.",
    updated: "2026-10-19",
    sections: BAR_BAT_MITZVAH_ES_SECTIONS,
    sectionsDisclosure: BAR_BAT_MITZVAH_ES_DISCLOSURE,
    sectionsDestinations: BAR_BAT_MITZVAH_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Pueden filmar el ensayo previo con la Torá en el templo?",
        answer:
          "Sí. Coordinamos con la sinagoga la sesión fotográfica y de video en los horarios autorizados para registrar al joven ante la bimá con la Torá.",
      },
      {
        question: "¿Cómo filman los bailes multitudinarios y el levantamiento de sillas en la Hora?",
        answer:
          "Utilizamos estabilizadores ligeros y lentes angulares que nos permiten movernos con seguridad dentro del círculo de baile para captar la euforia.",
      },
      {
        question: "¿Se entregan los discursos de los padres y el encendido de velas íntegros?",
        answer:
          "Sí. Además del video resumen artístico, facilitamos archivos completos con todos los brindis, discursos y la ceremonia de velas al detalle.",
      },
    ],
  },
  {
    slug: "videografo-para-bodas-de-destino-palm-beach",
    title: "Videógrafo para bodas de destino de fin de semana en Palm Beach",
    metadataTitle: "Bodas de Destino Palm Beach",
    description:
      "Videógrafo para bodas de destino en Palm Beach: coberturas de fin de semana completo, cócteles de bienvenida, votos matrimoniales y películas de boda de lujo.",
    eyebrow: "Bodas de Lujo / Fin de Semana",
    h1: "Videógrafo para bodas de destino de fin de semana.",
    lead:
      "Cinematografía de boda exclusiva para parejas que viajan a celebrar su fin de semana nupcial en Palm Beach, The Breakers y enclaves costeros de lujo.",
    keyword: "videógrafo para bodas de destino en Palm Beach",
    location: "Palm Beach / Boca Raton / Coral Gables",
    availability: "confirmed",
    icon: Heart,
    bestFor: [
      "Parejas de otros estados o internacionales que celebran un fin de semana nupcial de dos o tres días en Palm Beach.",
      "Organizadores de bodas de destino de alto presupuesto que requieren un realizador local con conocimiento de la luz de Florida.",
    ],
    scopingQuestions: [
      "¿El fin de semana incluye fiesta de bienvenida el viernes, jornada nupcial el sábado y almuerzo informal el domingo?",
      "¿La pareja desea una película documental extendida con los votos completos además de un tráiler cinematográfico?",
    ],
    projectFit:
      "Cámaras de cine 4K de alta sensibilidad, microfonía inalámbrica invisible para votos y etalonaje en tonos pastel elegantes.",
    updated: "2026-10-19",
    sections: DESTINATION_WEDDING_ES_SECTIONS,
    sectionsDisclosure: DESTINATION_WEDDING_ES_DISCLOSURE,
    sectionsDestinations: DESTINATION_WEDDING_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Se desplazan a hoteles y villas de Palm Beach, Boca Raton o los Cayos?",
        answer:
          "Sí. Cubrimos bodas de destino en los principales complejos turísticos y fincas privadas del sur de Florida con total autonomía.",
      },
      {
        question: "¿Cómo aseguran que los votos se escuchen con nitidez en ceremonias frente al mar?",
        answer:
          "Colocamos micrófonos inalámbricos en miniatura con protección antiviento en el novio y el oficiante para registrar los votos con claridad cristalina.",
      },
      {
        question: "¿Pueden entregar un avance cinematográfico durante la luna de miel?",
        answer:
          "Sí. Podemos entregar un teaser vertical de un minuto en varios días hábiles tras la boda para revivir la emoción durante su viaje.",
      },
    ],
  },
  {
    slug: "produccion-de-video-para-cursos-online-miami",
    title: "Producción de video para cursos online y formación en Miami",
    metadataTitle: "Cursos Online Miami",
    description:
      "Video para cursos online en Miami: filmación en estudio con teleprónter, captura de diapositivas y edición de módulos formativos.",
    eyebrow: "Educación Digital / Cursos",
    h1: "Producción de video para cursos online.",
    lead:
      "Producción audiovisual de programas formativos con teleprónter, iluminación de estudio suave y gráficos explicativos en Miami.",
    keyword: "video para cursos online en Miami",
    location: "Miami / Fort Lauderdale / Coral Gables",
    availability: "confirmed",
    icon: GraduationCap,
    bestFor: [
      "Consultores y educadores que convierten su conocimiento presencial en academias digitales de alto valor.",
      "Empresas corporativas que graban portales de inducción interna y certificaciones de personal.",
    ],
    scopingQuestions: [
      "¿Dispone del guion final cargado para teleprónter y la división por módulos formativos de cinco a diez minutos?",
      "¿Se requiere captura sincronizada de pantalla para diapositivas de Keynote o demostraciones de software?",
    ],
    projectFit:
      "Estudio rodante con teleprónter de cristal polarizado, dos cámaras 4K simultáneas y microfonía lavalier broadcast.",
    updated: "2026-10-19",
    sections: ONLINE_COURSE_ES_SECTIONS,
    sectionsDisclosure: ONLINE_COURSE_ES_DISCLOSURE,
    sectionsDestinations: ONLINE_COURSE_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Incluyen el equipo de teleprónter y el operador durante la grabación?",
        answer:
          "Sí. Suministramos teleprónter de cristal reflectante profesional y regulamos la velocidad del texto en tiempo real según el ritmo del orador.",
      },
      {
        question: "¿Se pueden integrar capturas de pantalla y diapositivas de presentaciones?",
        answer:
          "Sí. Sincronizamos diapositivas de alta resolución, animaciones conceptuales y capturas de aplicaciones junto a la imagen del profesor.",
      },
      {
        question: "¿Cómo conviene organizar los textos antes de iniciar la jornada de rodaje?",
        answer:
          "Aconsejamos redactar lecciones breves estructuradas entre cinco y diez minutos con anotaciones claras de los gráficos complementarios.",
      },
    ],
  },
  {
    slug: "edicion-de-video-para-cartas-de-venta-vsl",
    title: "Edición de video para cartas de venta VSL en Miami",
    metadataTitle: "Edición Video VSL Miami",
    description:
      "Edición de video para cartas de venta VSL en Miami: tipografía cinética, interrupciones de patrón, efectos de sonido y alta conversión.",
    eyebrow: "Marketing de Respuesta Directa / VSL",
    h1: "Edición de video para cartas de venta VSL.",
    lead:
      "Montaje de cartas de venta en video con tipografía cinética, diseño sonoro persuasivo y pausas calculadas para campañas digitales.",
    keyword: "edición de cartas de venta en video VSL",
    location: "Miami / Fort Lauderdale / South Florida",
    availability: "confirmed",
    icon: TrendingUp,
    bestFor: [
      "Lanzadores de ofertas digitales y especialistas en tráfico de pago que buscan elevar el tiempo de visualización y las conversiones.",
      "Marcas de comercio electrónico y software con páginas de aterrizaje que exigen presentaciones persuasivas.",
    ],
    scopingQuestions: [
      "¿Dispone de la locución profesional grabada junto con el guion estructurado con llamadas a la acción?",
      "¿Requiere formato horizontal dieciséis novenos para páginas de aterrizaje o adaptaciones verticales para anuncios?",
    ],
    projectFit:
      "Estación de montaje con animación tipográfica personalizada, librería de efectos sonoros de impacto y gradación de color.",
    updated: "2026-10-19",
    sections: VSL_DIRECT_RESPONSE_ES_SECTIONS,
    sectionsDisclosure: VSL_DIRECT_RESPONSE_ES_DISCLOSURE,
    sectionsDestinations: VSL_DIRECT_RESPONSE_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿El cliente debe suministrar la voz en off o la gestionan ustedes?",
        answer:
          "Habitualmente el cliente proporciona la locución grabada, aunque podemos recomendar locutores profesionales en inglés o español.",
      },
      {
        question: "¿Entregan formatos horizontales para páginas web y versiones verticales para anuncios?",
        answer:
          "Sí. Suministramos montajes panorámicos para sitios web y adaptaciones verticales diseñadas para campañas en redes sociales.",
      },
      {
        question: "¿Qué materiales iniciales se necesitan para comenzar la edición del VSL?",
        answer:
          "Requerimos el guion aprobado, la pista de audio con la locución, la guía gráfica de la marca, imágenes del producto y testimonios de clientes.",
      },
    ],
  },
  {
    slug: "retenedor-mensual-de-reutilizacion-de-video",
    title: "Retenedor mensual de reutilización de video en Miami",
    metadataTitle: "Retenedor Contenido Video",
    description:
      "Retenedor de contenido en video en Miami: conversión de podcasts, conferencias y seminarios en clips verticales para redes sociales.",
    eyebrow: "Estrategia de Contenido / Retenedor",
    h1: "Retenedor mensual de reutilización de video.",
    lead:
      "Transformación mensual de conferencias y podcasts extensos en clips verticales con ganchos persuasivos y subtítulos animados.",
    keyword: "retenedor de reutilización de video en Miami",
    location: "Miami / Fort Lauderdale / Palm Beach",
    availability: "confirmed",
    icon: Repeat,
    bestFor: [
      "Fundadores de empresas y creadores que generan contenido extenso pero carecen de tiempo para editar piezas para redes sociales.",
      "Agencias de marketing que requieren un socio de edición constante para alimentar los calendarios de publicación de sus clientes.",
    ],
    scopingQuestions: [
      "¿Cuántas horas de contenido bruto en video o podcast genera su equipo cada mes para procesar?",
      "¿Prefiere entregas semanales programadas con subtítulos dinámicos y formatos adaptados a cada plataforma?",
    ],
    projectFit:
      "Flujo continuo de edición con plantillas de marca personalizadas, selección de ganchos virales y entrega recurrente.",
    updated: "2026-10-19",
    sections: VIDEO_REPURPOSING_ES_SECTIONS,
    sectionsDisclosure: VIDEO_REPURPOSING_ES_DISCLOSURE,
    sectionsDestinations: VIDEO_REPURPOSING_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Qué tipos de archivos se pueden enviar para la reutilización mensual de contenido?",
        answer:
          "Aceptamos grabaciones originales de cámara, reuniones de Zoom en alta definición, pistas de podcasts o enlaces de transmisiones previas.",
      },
      {
        question: "¿Se incluyen subtítulos animados sincronizados en todas las piezas verticales?",
        answer:
          "Sí. Todos los clips verticales incorporan subtítulos estilizados con resaltado de palabras clave para lectura fluida sin audio.",
      },
      {
        question: "¿Cómo se coordinan las fechas de entrega a lo largo del mes de servicio?",
        answer:
          "Organizamos entregas escalonadas en fechas fijas acordadas para que su equipo disponga de material constante en su calendario social.",
      },
    ],
  },
  {
    slug: "video-explicativo-de-software-saas-miami",
    title: "Video explicativo de software SaaS para empresas en Miami",
    metadataTitle: "Video Explicativo Software SaaS",
    description:
      "Video explicativo de software SaaS en Miami: animación de interfaces, demostraciones de producto, flujos de trabajo y videos de venta B2B.",
    eyebrow: "Tecnología / Software SaaS",
    h1: "Video explicativo de software SaaS para empresas.",
    lead:
      "Producción audiovisual de demostraciones y explicaciones de plataformas de software en Miami, combinando animaciones de pantalla y beneficios comerciales.",
    keyword: "video explicativo de software SaaS en Miami",
    location: "Miami / Fort Lauderdale / Coral Gables",
    availability: "confirmed",
    icon: Laptop,
    bestFor: [
      "Empresas de tecnología y software en la nube que precisan explicar plataformas complejas a directores de tecnología y compras.",
      "Startups en rondas de financiación que necesitan presentar la propuesta de valor y la interfaz a inversores en pocos minutos.",
    ],
    scopingQuestions: [
      "¿Dispone de una versión funcional o prototipo interactivo de la plataforma para capturar secuencias de interfaz en alta resolución?",
      "¿Requiere locución profesional en inglés y español para comercialización simultánea en Norteamérica y América Latina?",
    ],
    projectFit:
      "Captura digital sin compresión de interfaces, animación de cursores y ventanas, grafismo explicativo y mezcla de sonido estéreo.",
    updated: "2026-10-19",
    sections: B2B_SAAS_EXPLAINER_ES_SECTIONS,
    sectionsDisclosure: B2B_SAAS_EXPLAINER_ES_DISCLOSURE,
    sectionsDestinations: B2B_SAAS_EXPLAINER_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Se pueden actualizar los videos explicativos cuando el software cambie su diseño?",
        answer:
          "Sí. Diseñamos los proyectos con plantillas vectoriales modulares, permitiendo sustituir capturas de pantalla o botones actualizados con rapidez.",
      },
      {
        question: "¿Ofrecen locución profesional para la explicación técnica de la plataforma?",
        answer:
          "Sí. Gestionamos locutores especializados en inglés norteamericano y español neutro que transmiten el mensaje con rigor y cercanía técnica.",
      },
      {
        question: "¿Qué formatos se suministran para páginas de aterrizaje y presentaciones comerciales?",
        answer:
          "Entregamos archivos panorámicos de alta definición optimizados para la web y versiones comprimidas ligeras para adjuntar en correos de ventas.",
      },
    ],
  },
  {
    slug: "serie-de-video-para-linkedin-ejecutivo-miami",
    title: "Serie de video para LinkedIn ejecutivo en Miami",
    metadataTitle: "Video LinkedIn Ejecutivo",
    description:
      "Video de liderazgo de opinión para LinkedIn en Miami: sesiones trimestrales de grabación, cápsulas ejecutivas y optimización para redes profesionales.",
    eyebrow: "Liderazgo de Opinión / LinkedIn",
    h1: "Serie de video para LinkedIn ejecutivo.",
    lead:
      "Grabación de series de video para directivos y líderes de opinión en Miami, con enfoque en autoridad profesional y distribución en LinkedIn.",
    keyword: "serie de video para LinkedIn ejecutivo en Miami",
    location: "Miami / Fort Lauderdale / Coral Gables",
    availability: "confirmed",
    icon: UserCheck,
    bestFor: [
      "Directores ejecutivos, socios de firmas profesionales y fundadores que desean construir una presencia influyente en LinkedIn.",
      "Empresas de tecnología y finanzas que buscan posicionar a sus líderes como referentes del sector mediante contenidos de opinión.",
    ],
    scopingQuestions: [
      "¿Dispone de una sala de juntas o despacho corporativo con luz natural para realizar la sesión de grabación trimestral?",
      "¿Cuenta con una lista de temas prioritarios del sector o requiere una sesión de preparación de preguntas orientadas a negocio?",
    ],
    projectFit:
      "Esquema de iluminación suave de tres puntos en oficina, dos cámaras fijas discretas y entrega de cápsulas verticales con subtítulos.",
    updated: "2026-10-19",
    sections: EXECUTIVE_LINKEDIN_ES_SECTIONS,
    sectionsDisclosure: EXECUTIVE_LINKEDIN_ES_DISCLOSURE,
    sectionsDestinations: EXECUTIVE_LINKEDIN_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿La grabación puede realizarse en las oficinas o sala de conferencias de la empresa?",
        answer:
          "Sí. Instalamos cámaras cinematográficas compactas e iluminación difusa en sus instalaciones minimizando molestias al resto del equipo.",
      },
      {
        question: "¿El directivo debe memorizar textos antes del día de filmación?",
        answer:
          "No. Conducimos una entrevista basada en temas previamente coordinados que propicia respuestas naturales con solidez profesional.",
      },
      {
        question: "¿Se incluyen subtítulos exactos para visualización en teléfonos móviles sin sonido?",
        answer:
          "Sí. Todas las piezas incorporan subtítulos sincronizados y elegantes para facilitar la lectura inmediata en el feed de LinkedIn.",
      },
    ],
  },
  {
    slug: "edicion-de-video-largo-para-youtube",
    title: "Edición de video largo para YouTube en Miami",
    metadataTitle: "Edición Video YouTube",
    description:
      "Edición de video largo para YouTube en Miami: ritmo narrativo, optimización de curvas de retención, diseño sonoro y gráficos en movimiento.",
    eyebrow: "Medios Digitales / YouTube",
    h1: "Edición de video largo para YouTube.",
    lead:
      "Montaje profesional de contenidos extensos para canales de YouTube con narrativa ágil, diseño sonoro envolvente y grafismo explicativo.",
    keyword: "edición de video largo para YouTube",
    location: "Miami / Fort Lauderdale / South Florida",
    availability: "confirmed",
    icon: Film,
    bestFor: [
      "Creadores de contenido y marcas con canales de YouTube que precisan un flujo de edición semanal confiable.",
      "Empresas que publican tutoriales detallados, análisis de mercado y documentales de marca de más de diez minutos.",
    ],
    scopingQuestions: [
      "¿Dispone de metraje grabado con múltiples cámaras o fuentes de pantalla junto con archivos de audio independientes?",
      "¿Requiere diseño de miniaturas de portada y optimización de marcas de tiempo para los capítulos del video?",
    ],
    projectFit:
      "Flujo de trabajo de edición en Premiere Pro con corrección de color cinemática, mezcla de sonido estéreo y entrega de archivos maestros.",
    updated: "2026-10-19",
    sections: YOUTUBE_LONG_FORM_ES_SECTIONS,
    sectionsDisclosure: YOUTUBE_LONG_FORM_ES_DISCLOSURE,
    sectionsDestinations: YOUTUBE_LONG_FORM_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cuál es el plazo habitual de montaje para un episodio de veinte minutos de YouTube?",
        answer:
          "El montaje se completa en pocos días hábiles tras recibir los archivos de video originales, sincronizar pistas de audio e incorporar gráficos.",
      },
      {
        question: "¿Ofrecen el diseño de la imagen de miniatura de portada para cada video?",
        answer:
          "Sí. Diseñamos miniaturas atractivas con contrastes cuidados y tipografía legible ideadas para conseguir altas tasas de clics.",
      },
      {
        question: "¿Cómo se envían los archivos de video pesados para su edición?",
        answer:
          "Los clientes cargan sus grabaciones directamente en nuestros servidores de almacenamiento en la nube a través de enlaces seguros y rápidos.",
      },
    ],
  },
  {
    slug: "video-de-unboxing-y-demostracion-de-producto-south-florida",
    title: "Video de unboxing y demostración de producto en South Florida",
    metadataTitle: "Unboxing y Producto Florida",
    description:
      "Video de unboxing y demostración de producto en South Florida: iluminación macro de estudio, diseño sonoro táctil y clips para tiendas online.",
    eyebrow: "Comercio Electrónico / Productos",
    h1: "Video de unboxing y demostración de producto.",
    lead:
      "Grabación en estudio de desempaquetado de productos, detalles con lentes macro y sonido táctil envolvente para marcas en el sur de la Florida.",
    keyword: "video de unboxing y demostración de producto",
    location: "Miami / Fort Lauderdale / Boca Raton",
    availability: "confirmed",
    icon: Package,
    bestFor: [
      "Marcas de consumo, tecnología y belleza que lanzan nuevos productos y requieren videos para Amazon y tiendas de comercio electrónico.",
      "Empresas de venta directa que buscan transmitir la calidad de los materiales y el empaque a compradores virtuales.",
    ],
    scopingQuestions: [
      "¿Dispone de unidades del producto con empaques intactos y sin marcas para las tomas de desempaque inicial?",
      "¿Se requiere un presentador o modelo de manos en cámara o únicamente planos cerrados de producto sobre mesa giratoria?",
    ],
    projectFit:
      "Estudio con mesa giratoria motorizada, lentes macro cinematográficas, iluminación difusa de alto índice cromático y foley acústico.",
    updated: "2026-10-19",
    sections: PRODUCT_UNBOXING_ES_SECTIONS,
    sectionsDisclosure: PRODUCT_UNBOXING_ES_DISCLOSURE,
    sectionsDestinations: PRODUCT_UNBOXING_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Se pueden enviar los productos directamente a su estudio para la filmación?",
        answer:
          "Sí. Las marcas envían unidades con empaques nuevos a nuestras instalaciones en el sur de la Florida para programar la sesión de estudio.",
      },
      {
        question: "¿Cuentan con modelos de manos o presentadores para la manipulación en cámara?",
        answer:
          "Sí. Disponemos de modelos y presentadores capacitados para realizar desempaques y demostraciones de producto con movimientos fluidos y precisos.",
      },
      {
        question: "¿Qué formatos de entrega preparan para plataformas de venta electrónica y redes?",
        answer:
          "Entregamos archivos panorámicos optimizados para fichas de Amazon y cortes verticales pensados para campañas de comercio en redes sociales.",
      },
    ],
  },
  {
    slug: "video-para-alquileres-de-lujo-y-airbnb-luxe-miami-beach",
    title: "Video para alquileres de lujo y Airbnb Luxe en Miami Beach",
    metadataTitle: "Airbnb Luxe Miami Beach",
    description:
      "Video para alquileres vacacionales de lujo en Miami Beach: filmación al atardecer, piscinas frente al agua y reels para reservas de alto valor.",
    eyebrow: "Alquiler Vacacional / Lujo",
    h1: "Video para alquileres de lujo y Airbnb Luxe.",
    lead:
      "Cinematografía arquitectónica de villas vacacionales de lujo en Miami Beach, con tomas al atardecer, piscinas privadas y detalles de hospitalidad.",
    keyword: "video para alquileres de lujo en Miami Beach",
    location: "Miami Beach / South Beach / Sunny Isles",
    availability: "confirmed",
    icon: Key,
    bestFor: [
      "Propietarios y gestores de villas de lujo que buscan maximizar el precio por noche y la tasa de ocupación en plataformas exclusivas.",
      "Empresas de gestión de propiedades vacacionales que promocionan residencias exclusivas frente al agua ante turistas de alto poder adquisitivo.",
    ],
    scopingQuestions: [
      "¿Se encuentra la propiedad completamente amueblada, decorada y preparada para filmar durante el atardecer?",
      "¿Desea incluir tomas de bienvenida con detalles de hospitalidad como copas servidas, iluminación de terraza y chimeneas exteriores?",
    ],
    projectFit:
      "Estabilizador gimbal de tres ejes, ópticas gran angular con corrección geométrica e iluminación cálida de apoyo.",
    updated: "2026-10-19",
    sections: AIRBNB_LUXE_ES_SECTIONS,
    sectionsDisclosure: AIRBNB_LUXE_ES_DISCLOSURE,
    sectionsDestinations: AIRBNB_LUXE_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Cuál es el mejor momento del día para filmar una villa vacacional de lujo?",
        answer:
          "Filmamos a última hora de la tarde y durante el atardecer para capturar la luz dorada en exteriores y la iluminación cálida nocturna.",
      },
      {
        question: "¿Se pueden destacar muelles privados, cocinas de exterior y zonas de spa?",
        answer:
          "Sí. Dedicamos secuencias específicas a los muelles náuticos, zonas de barbacoa al aire libre, pérgolas de descanso y jacuzzis exteriores.",
      },
      {
        question: "¿Entregan videos verticales para promocionar reservas en redes sociales?",
        answer:
          "Sí. Suministramos cápsulas verticales con música cinemática con derechos de uso para atraer reservas directas desde redes sociales.",
      },
    ],
  },
  {
    slug: "video-para-restaurantes-frente-al-agua-fort-lauderdale",
    title: "Video para restaurantes frente al agua en Fort Lauderdale",
    metadataTitle: "Restaurantes Frente Agua",
    description:
      "Video para restaurantes en Fort Lauderdale: gastronomía frente al agua, coctelería de autor, ambiente al atardecer y llegada en embarcaciones.",
    eyebrow: "Gastronomía / Restaurantes",
    h1: "Video para restaurantes frente al agua.",
    lead:
      "Producción audiovisual para restaurantes gastronómicos frente a los canales de Fort Lauderdale, con platos gourmet, coctelería y terrazas al atardecer.",
    keyword: "video para restaurantes frente al agua en Fort Lauderdale",
    location: "Fort Lauderdale / Las Olas / Intracoastal",
    availability: "confirmed",
    icon: Utensils,
    bestFor: [
      "Restaurantes de alta gastronomía y terrazas junto a canales que buscan atraer a navegantes y visitantes locales.",
      "Grupos de restauración que promocionan espacios para eventos privados, cenas corporativas y bodas íntimas frente al agua.",
    ],
    scopingQuestions: [
      "¿Se coordinará la sesión de cocina antes de la apertura al público para filmar emplatados y preparación de cócteles?",
      "¿Desea registrar el ambiente de la terraza con clientes reales durante la hora dorada y la cena?",
    ],
    projectFit:
      "Lentes macro para texturas culinarias, iluminación cálida de apoyo para mesas y estabilizador ligero para sala y barra.",
    updated: "2026-10-19",
    sections: WATERFRONT_RESTAURANT_ES_SECTIONS,
    sectionsDisclosure: WATERFRONT_RESTAURANT_ES_DISCLOSURE,
    sectionsDestinations: WATERFRONT_RESTAURANT_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Se puede filmar antes del horario de apertura para no incomodar a los clientes?",
        answer:
          "Sí. Grabamos en cocina y barra antes de abrir al público y registramos el ambiente de terraza con clientes al inicio de la cena.",
      },
      {
        question: "¿Filman salones privados para la comercialización de eventos y cenas de empresa?",
        answer:
          "Sí. Documentamos comedores privados, montajes para banquetes frente al agua y menús especiales para celebraciones corporativas.",
      },
      {
        question: "¿Pueden grabar la llegada de clientes en barco al muelle del restaurante?",
        answer:
          "Sí. Filmamos la maniobra de atraque de embarcaciones en el muelle del local y el acceso directo de los visitantes a la terraza exterior.",
      },
    ],
  },
  {
    slug: "video-comercial-para-marinas-fort-lauderdale",
    title: "Video comercial para marinas e instalaciones náuticas en Fort Lauderdale",
    metadataTitle: "Video Marinas Fort Lauderdale",
    description:
      "Video para marinas y astilleros en Fort Lauderdale: muelles para yates, hangares en seco, surtidores de combustible y servicios técnicos.",
    eyebrow: "Sector Náutico / Marinas",
    h1: "Video comercial para marinas e instalaciones náuticas.",
    lead:
      "Cinematografía comercial para marinas y puertos deportivos en Fort Lauderdale, documentando amarres exclusivos, hangares y atención náutica.",
    keyword: "video comercial para marinas en Fort Lauderdale",
    location: "Fort Lauderdale / Dania Beach / Port Everglades",
    availability: "confirmed",
    icon: Anchor,
    bestFor: [
      "Operadores de marinas comerciales y puertos deportivos que buscan alquilar amarres anuales para embarcaciones de gran eslora.",
      "Astilleros e instalaciones de varadero que desean mostrar su capacidad de elevación, talleres especializados y seguridad portuaria.",
    ],
    scopingQuestions: [
      "¿Se requiere permiso de acceso para filmar en pantalanes de amarre, oficinas de capitanía y zonas de varada?",
      "¿Desea incluir maniobras de carretillas elevadoras marinas o el servicio de repostaje en el muelle de combustible?",
    ],
    projectFit:
      "Ópticas de cine con sellado ambiental, filtros polarizadores para reflejos en el agua y estabilizador para recorridos en pantalán.",
    updated: "2026-10-19",
    sections: MARINA_FACILITY_ES_SECTIONS,
    sectionsDisclosure: MARINA_FACILITY_ES_DISCLOSURE,
    sectionsDestinations: MARINA_FACILITY_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Pueden filmar maniobras de varadero, grúas y almacenamiento en seco?",
        answer:
          "Sí. Coordinamos con los responsables de seguridad del puerto para registrar el trabajo de grúas, elevadores y repostajes de forma segura.",
      },
      {
        question: "¿Documentan las instalaciones para tripulaciones como salas de descanso y gimnasios?",
        answer:
          "Sí. Recorremos los espacios destinados a capitanes y tripulantes que deciden a las tripulaciones a fijar su puerto base en su marina.",
      },
      {
        question: "¿Se pueden incluir datos náuticos como calado mínimo y conexiones eléctricas?",
        answer:
          "Sí. Integramos rótulos sobreimpresos con especificaciones de profundidad, amperaje disponible y esloras máximas autorizadas.",
      },
    ],
  },
  ...nicheWave8Pages,
];



export const spanishCoreRoutes = [
  "/es",
  "/es/fotografia-de-producto-miami",
  "/es/servicios",
  "/es/precios",
  "/es/portafolio",
  "/es/areas",
  "/es/areas/palm-beach-county",
  "/es/sobre-esteban",
  "/es/contacto",
  "/es/calculadora",
  "/es/recursos/kit-video-social",
  "/es/evaluacion",
];

/**
 * The 2026-10-06 niche batch, paired in both directions.
 *
 * hreflang is discarded unless both documents point at each other, so each new
 * page appears twice here: once under its English path and once under its
 * Spanish one, with identical values.
 */
const nicheBatch20261006 = Object.fromEntries(
  (
    [
      [
        "/services/medical-practice-video-marketing-miami",
        "/es/marketing-de-video-para-consultorios-medicos-miami",
      ],
      [
        "/services/content-creator-video-editing-miami",
        "/es/edicion-de-video-para-creadores-de-contenido-miami",
      ],
      [
        "/services/white-label-video-editing-for-agencies",
        "/es/edicion-de-video-marca-blanca-para-agencias",
      ],
      [
        "/services/salon-barbershop-video-marketing-miami",
        "/es/marketing-de-video-para-salones-y-barberias-miami",
      ],
      [
        "/services/auto-detailing-tint-wrap-video-marketing-miami",
        "/es/marketing-de-video-para-detallado-y-wraps-miami",
      ],
    ] as const
  ).flatMap(([en, es]) =>
    [en, es].map((path) => [path, { "en-US": en, "es-US": es, "x-default": en }] as const),
  ),
);

/**
 * Spanish niche pages that shipped WITHOUT an English counterpart in the
 * hreflang map, and therefore served only a self-referencing `es-US`.
 *
 * Measured 2026-10-06 by probing the served HTML of all 103 static Spanish
 * routes: 63 emitted the correct three alternates, **36 emitted exactly one**
 * (themselves), and 4 emitted none. An unpaired Spanish page tells Google
 * nothing about its English twin, so Google is free to pick the English page
 * for a Spanish query — which is exactly what the Search Console data shows:
 * for "editor de reels fort lauderdale" the Spanish page does not appear at
 * all, while the ENGLISH page ranks 15.0 and /areas and /es outrank it.
 *
 * Each pair below was matched by hand and verified before shipping: both sides
 * return 200, and no English target was already claimed by a different Spanish
 * page. An automated fuzzy match was tried first and rejected — it mapped the
 * lawyer, dentist, gym, medspa and contractor pages all onto the AUTOMOTIVE
 * page, and a wrong hreflang pair is worse than a missing one because it tells
 * Google two unrelated pages are translations of each other. The safety check
 * then caught a real conflict (`real-estate-drone-video-editing-miami` was
 * already paired to `/es/drone-real-estate-miami`) and that pair was dropped.
 *
 * One further pair, for a Miami financial-district sub-city page, was removed
 * after `customer-ranking-pages.test.ts` failed: that neighbourhood is an
 * explicitly gated phrase in public copy and this file is one of the sources
 * that test scans. Sub-city coverage stays gated — including in comments,
 * which is how this was caught the second time.
 *
 * Ten further pairs were removed after the sitemap test failed: every page in
 * them is CONSOLIDATED by the 2026-08-12 cohort decision, i.e. merged or
 * noindexed and deliberately absent from the sitemap. Advertising an hreflang
 * pair for a page we have told Google not to index is a contradictory signal,
 * the same class of mistake the sitemap filter exists to prevent.
 *
 * Pages left unpaired on purpose: those with no unambiguous English twin
 * (videografo-en-miami, fotografo-en-fort-lauderdale, the Palm Beach County
 * pages) or where pairing would double-claim an English page that already has
 * a Spanish counterpart. Note: on 2026-10-07 the served pages were compared and
 * both target financial advisors / wealth managers in Miami, so
 * asesores-financieros is paired now with wealth-management-video-production-miami
 * (along with real-estate-reels-video-editor-south-florida and
 * editor-de-video-real-estate-miami).
 */
const nicheBatch20261006Hreflang = Object.fromEntries(
  (
    [
      ["/services/reels-editor-fort-lauderdale", "/es/editor-de-reels-fort-lauderdale"],
      ["/services/reels-editor-miami", "/es/editor-de-reels-miami"],
      ["/services/video-production-boca-raton", "/es/editor-de-reels-boca-raton"],
      ["/services/real-estate-reels-video-editor-south-florida", "/es/editor-de-video-real-estate-miami"],
      ["/services/wealth-management-video-production-miami", "/es/produccion-de-video-para-asesores-financieros-miami"],
      ["/services/med-spa-video-marketing-south-florida", "/es/marketing-de-video-para-clinicas-esteticas-miami"],
      ["/services/contractor-video-marketing-south-florida", "/es/marketing-de-video-para-contratistas-miami"],
      ["/services/dental-video-marketing-south-florida", "/es/marketing-de-video-para-dentistas-miami"],
      ["/services/fitness-gym-video-marketing-miami", "/es/marketing-de-video-para-gimnasios-miami"],
      ["/services/cosmetic-dentistry-video-marketing-miami", "/es/marketing-de-video-para-odontologia-estetica-miami"],
      ["/services/wellness-spa-video-marketing-miami", "/es/marketing-de-video-para-spas-y-bienestar-miami"],
      ["/services/music-video-post-production-miami", "/es/postproduccion-de-videos-musicales-miami"],
      ["/services/brand-video-production-miami", "/es/produccion-de-video-de-marca-miami"],
      ["/services/video-production-fort-lauderdale", "/es/produccion-de-video-fort-lauderdale"],
      ["/services/hotel-hospitality-video-production-miami", "/es/produccion-de-video-para-hoteles-miami"],
      ["/services/content-repurposing-service-miami", "/es/reutilizacion-de-contenido-para-redes-miami"],
      // Row 30 (2026-10-14): the new ES twin.
      ["/services/hire-remote-video-editor", "/es/contratar-editor-de-video-remoto"],
    ] as const
  ).flatMap(([en, es]) =>
    [en, es].map((path) => [path, { "en-US": en, "es-US": es, "x-default": en }] as const),
  ),
);

/**
 * Pairs for the pages Esteban ordered into the sitemap on 2026-10-10 (SEO/GEO
 * audit finding 8): the six growth-system pairs, the case-study hubs and the
 * daily tool pairs. The growth-system and hub pages already emitted these
 * alternates in their HTML; declaring them here makes the sitemap emit the
 * same set. Four of the daily tool pairs had only language-switcher pairing
 * and no hreflang at all (audit fix 13).
 */
const inventoryAdditions20261010Hreflang = Object.fromEntries(
  (
    [
      ...growthSystems.map(
        (system) => [`/services/${system.slug}`, `/es/${system.spanishSlug}`] as const,
      ),
      ["/case-studies", "/es/casos-de-estudio"],
      ["/daily-hook-planner", "/es/planificador-de-ganchos-de-video"],
      ["/daily-publish-prompt", "/es/prompt-de-publicacion-diaria"],
      ["/daily-script-timer", "/es/temporizador-de-guiones-de-video"],
      ["/daily-shot-list-planner", "/es/planificador-de-tomas-de-video"],
    ] as const
  ).flatMap(([en, es]) =>
    [en, es].map((path) => [path, { "en-US": en, "es-US": es, "x-default": en }] as const),
  ),
);

/** The 2026-10-11 niche wave 8 (owner-approved), paired in both directions. */
const nicheWave8Hreflang = Object.fromEntries(
  (
    [
      ["/services/pre-construction-condo-video-marketing-miami", "/es/video-para-preventa-de-condominios-miami"],
      ["/services/vacation-rental-video-marketing-fort-lauderdale", "/es/video-para-alquileres-vacacionales-fort-lauderdale"],
      ["/services/insurance-agency-video-marketing-miami", "/es/marketing-de-video-para-agencias-de-seguros-miami"],
      ["/services/mortgage-broker-video-marketing-miami", "/es/marketing-de-video-para-brokers-hipotecarios-miami"],
      ["/services/immigration-attorney-video-marketing-miami", "/es/marketing-de-video-para-abogados-de-inmigracion-miami"],
      ["/services/church-sermon-clip-editing-miami", "/es/edicion-de-clips-de-predicas-para-iglesias-miami"],
      ["/services/quinceanera-video-miami", "/es/video-para-quinceaneras-miami"],
      ["/services/wedding-videographer-fort-lauderdale", "/es/videografo-de-bodas-fort-lauderdale"],
      // DM-16 (2026-10-14): the English twin now exists.
      ["/services/videographer-miami", "/es/videografo-en-miami"],
      ["/services/dance-studio-music-school-video-marketing-miami", "/es/video-para-academias-de-baile-y-musica-miami"],
      ["/services/personal-brand-video-editor-founders-miami", "/es/editor-de-video-para-marca-personal-miami"],
      ["/services/podcast-clipping-service-miami", "/es/edicion-de-clips-de-podcast-miami"],
    ] as const
  ).flatMap(([en, es]) =>
    [en, es].map((path) => [path, { "en-US": en, "es-US": es, "x-default": en }] as const),
  ),
);

/** 2026-10-14: the free Reels editing cost calculator, EN + ES. */
const reelsCostCalculatorHreflang = Object.fromEntries(
  (
    [["/reels-editing-cost-calculator", "/es/calculadora-de-costo-de-edicion-de-reels"]] as const
  ).flatMap(([en, es]) =>
    [en, es].map((path) => [path, { "en-US": en, "es-US": es, "x-default": en }] as const),
  ),
);

/** 2026-10-14: chatbot and landing-page service pairs (lib/web-ai-services.ts). */
const webAiServiceHreflang = Object.fromEntries(
  (
    [
      ["/services/ai-chatbot-for-small-business", "/es/chatbot-con-ia-para-negocios"],
      ["/services/landing-page-design", "/es/landing-page-para-negocios"],
    ] as const
  ).flatMap(([en, es]) =>
    [en, es].map((path) => [path, { "en-US": en, "es-US": es, "x-default": en }] as const),
  ),
);

const languageAlternatesRaw: Record<string, Record<string, string>> = {
  ...inventoryAdditions20261010Hreflang,
  ...webAiServiceHreflang,
  ...reelsCostCalculatorHreflang,
  // Original-data study, 2026-10-14 (lib/restaurant-ig-study.ts).
  [restaurantIgStudyPaths.en]: { ...restaurantIgStudyAlternates },
  [restaurantIgStudyPaths.es]: { ...restaurantIgStudyAlternates },
  "/services/food-and-places-creator-video-editing-miami": {
    "en-US": "/services/food-and-places-creator-video-editing-miami",
    "es-US": "/es/edicion-de-video-para-creadores-de-comida-y-lugares-miami",
    "x-default": "/services/food-and-places-creator-video-editing-miami",
  },
  "/es/edicion-de-video-para-creadores-de-comida-y-lugares-miami": {
    "en-US": "/services/food-and-places-creator-video-editing-miami",
    "es-US": "/es/edicion-de-video-para-creadores-de-comida-y-lugares-miami",
    "x-default": "/services/food-and-places-creator-video-editing-miami",
  },
  "/services/corporate-event-videographer-fort-lauderdale": {
    "en-US": "/services/corporate-event-videographer-fort-lauderdale",
    "es-US": "/es/videografo-para-eventos-corporativos-fort-lauderdale",
    "x-default": "/services/corporate-event-videographer-fort-lauderdale",
  },
  "/es/videografo-para-eventos-corporativos-fort-lauderdale": {
    "en-US": "/services/corporate-event-videographer-fort-lauderdale",
    "es-US": "/es/videografo-para-eventos-corporativos-fort-lauderdale",
    "x-default": "/services/corporate-event-videographer-fort-lauderdale",
  },
  "/services/networking-event-videographer-miami": {
    "en-US": "/services/networking-event-videographer-miami",
    "es-US": "/es/videografo-para-eventos-de-networking-miami",
    "x-default": "/services/networking-event-videographer-miami",
  },
  "/es/videografo-para-eventos-de-networking-miami": {
    "en-US": "/services/networking-event-videographer-miami",
    "es-US": "/es/videografo-para-eventos-de-networking-miami",
    "x-default": "/services/networking-event-videographer-miami",
  },
  "/services/wedding-videographer-miami": {
    "en-US": "/services/wedding-videographer-miami",
    "es-US": "/es/videografo-de-bodas-miami",
    "x-default": "/services/wedding-videographer-miami",
  },
  "/es/videografo-de-bodas-miami": {
    "en-US": "/services/wedding-videographer-miami",
    "es-US": "/es/videografo-de-bodas-miami",
    "x-default": "/services/wedding-videographer-miami",
  },
  "/services/vlog-videographer-miami": {
    "en-US": "/services/vlog-videographer-miami",
    "es-US": "/es/videografo-para-vlogs-miami",
    "x-default": "/services/vlog-videographer-miami",
  },
  "/es/videografo-para-vlogs-miami": {
    "en-US": "/services/vlog-videographer-miami",
    "es-US": "/es/videografo-para-vlogs-miami",
    "x-default": "/services/vlog-videographer-miami",
  },
  "/services/conference-videographer-fort-lauderdale": {
    "en-US": "/services/conference-videographer-fort-lauderdale",
    "es-US": "/es/videografo-para-conferencias-fort-lauderdale",
    "x-default": "/services/conference-videographer-fort-lauderdale",
  },
  "/es/videografo-para-conferencias-fort-lauderdale": {
    "en-US": "/services/conference-videographer-fort-lauderdale",
    "es-US": "/es/videografo-para-conferencias-fort-lauderdale",
    "x-default": "/services/conference-videographer-fort-lauderdale",
  },
  "/services/executive-interview-videographer-miami": {
    "en-US": "/services/executive-interview-videographer-miami",
    "es-US": "/es/videografo-para-entrevistas-ejecutivas-miami",
    "x-default": "/services/executive-interview-videographer-miami",
  },
  "/es/videografo-para-entrevistas-ejecutivas-miami": {
    "en-US": "/services/executive-interview-videographer-miami",
    "es-US": "/es/videografo-para-entrevistas-ejecutivas-miami",
    "x-default": "/services/executive-interview-videographer-miami",
  },
  "/services/yacht-event-videographer-miami": {
    "en-US": "/services/yacht-event-videographer-miami",
    "es-US": "/es/videografo-para-eventos-en-yates-miami",
    "x-default": "/services/yacht-event-videographer-miami",
  },
  "/es/videografo-para-eventos-en-yates-miami": {
    "en-US": "/services/yacht-event-videographer-miami",
    "es-US": "/es/videografo-para-eventos-en-yates-miami",
    "x-default": "/services/yacht-event-videographer-miami",
  },
  "/services/content-day-videographer-miami": {
    "en-US": "/services/content-day-videographer-miami",
    "es-US": "/es/videografo-para-dia-de-contenido-miami",
    "x-default": "/services/content-day-videographer-miami",
  },
  "/es/videografo-para-dia-de-contenido-miami": {
    "en-US": "/services/content-day-videographer-miami",
    "es-US": "/es/videografo-para-dia-de-contenido-miami",
    "x-default": "/services/content-day-videographer-miami",
  },
  "/services/remote-video-editing-colombia": {
    "en-US": "/services/remote-video-editing-colombia",
    "es-US": "/es/edicion-de-video-remota-colombia",
    "x-default": "/services/remote-video-editing-colombia",
  },
  "/es/edicion-de-video-remota-colombia": {
    "en-US": "/services/remote-video-editing-colombia",
    "es-US": "/es/edicion-de-video-remota-colombia",
    "x-default": "/services/remote-video-editing-colombia",
  },
  "/services/bilingual-video-subtitling-service": {
    "en-US": "/services/bilingual-video-subtitling-service",
    "es-US": "/es/servicio-de-subtitulado-bilingue-de-video",
    "x-default": "/services/bilingual-video-subtitling-service",
  },
  "/es/servicio-de-subtitulado-bilingue-de-video": {
    "en-US": "/services/bilingual-video-subtitling-service",
    "es-US": "/es/servicio-de-subtitulado-bilingue-de-video",
    "x-default": "/services/bilingual-video-subtitling-service",
  },
  "/services/trade-show-booth-videographer-fort-lauderdale": {
    "en-US": "/services/trade-show-booth-videographer-fort-lauderdale",
    "es-US": "/es/videografo-para-ferias-comerciales-fort-lauderdale",
    "x-default": "/services/trade-show-booth-videographer-fort-lauderdale",
  },
  "/es/videografo-para-ferias-comerciales-fort-lauderdale": {
    "en-US": "/services/trade-show-booth-videographer-fort-lauderdale",
    "es-US": "/es/videografo-para-ferias-comerciales-fort-lauderdale",
    "x-default": "/services/trade-show-booth-videographer-fort-lauderdale",
  },
  "/services/corporate-gala-videographer-miami": {
    "en-US": "/services/corporate-gala-videographer-miami",
    "es-US": "/es/videografo-para-galas-corporativas-miami",
    "x-default": "/services/corporate-gala-videographer-miami",
  },
  "/es/videografo-para-galas-corporativas-miami": {
    "en-US": "/services/corporate-gala-videographer-miami",
    "es-US": "/es/videografo-para-galas-corporativas-miami",
    "x-default": "/services/corporate-gala-videographer-miami",
  },
  "/services/superyacht-charter-marketing-video-fort-lauderdale": {
    "en-US": "/services/superyacht-charter-marketing-video-fort-lauderdale",
    "es-US": "/es/marketing-de-video-para-superyates-fort-lauderdale",
    "x-default": "/services/superyacht-charter-marketing-video-fort-lauderdale",
  },
  "/es/marketing-de-video-para-superyates-fort-lauderdale": {
    "en-US": "/services/superyacht-charter-marketing-video-fort-lauderdale",
    "es-US": "/es/marketing-de-video-para-superyates-fort-lauderdale",
    "x-default": "/services/superyacht-charter-marketing-video-fort-lauderdale",
  },
  "/services/rehearsal-dinner-videographer-miami": {
    "en-US": "/services/rehearsal-dinner-videographer-miami",
    "es-US": "/es/videografo-para-cena-de-ensayo-miami",
    "x-default": "/services/rehearsal-dinner-videographer-miami",
  },
  "/es/videografo-para-cena-de-ensayo-miami": {
    "en-US": "/services/rehearsal-dinner-videographer-miami",
    "es-US": "/es/videografo-para-cena-de-ensayo-miami",
    "x-default": "/services/rehearsal-dinner-videographer-miami",
  },
  "/services/mastermind-event-videographer-miami": {
    "en-US": "/services/mastermind-event-videographer-miami",
    "es-US": "/es/videografo-para-masterminds-miami",
    "x-default": "/services/mastermind-event-videographer-miami",
  },
  "/es/videografo-para-masterminds-miami": {
    "en-US": "/services/mastermind-event-videographer-miami",
    "es-US": "/es/videografo-para-masterminds-miami",
    "x-default": "/services/mastermind-event-videographer-miami",
  },
  "/services/surprise-proposal-videographer-miami": {
    "en-US": "/services/surprise-proposal-videographer-miami",
    "es-US": "/es/videografo-para-propuestas-de-matrimonio-miami",
    "x-default": "/services/surprise-proposal-videographer-miami",
  },
  "/es/videografo-para-propuestas-de-matrimonio-miami": {
    "en-US": "/services/surprise-proposal-videographer-miami",
    "es-US": "/es/videografo-para-propuestas-de-matrimonio-miami",
    "x-default": "/services/surprise-proposal-videographer-miami",
  },
  "/services/speaker-sizzle-reel-production-miami": {
    "en-US": "/services/speaker-sizzle-reel-production-miami",
    "es-US": "/es/produccion-de-video-reel-para-conferencistas-miami",
    "x-default": "/services/speaker-sizzle-reel-production-miami",
  },
  "/es/produccion-de-video-reel-para-conferencistas-miami": {
    "en-US": "/services/speaker-sizzle-reel-production-miami",
    "es-US": "/es/produccion-de-video-reel-para-conferencistas-miami",
    "x-default": "/services/speaker-sizzle-reel-production-miami",
  },
  "/services/bar-mitzvah-videographer-south-florida": {
    "en-US": "/services/bar-mitzvah-videographer-south-florida",
    "es-US": "/es/videografo-para-bar-mitzvah-south-florida",
    "x-default": "/services/bar-mitzvah-videographer-south-florida",
  },
  "/es/videografo-para-bar-mitzvah-south-florida": {
    "en-US": "/services/bar-mitzvah-videographer-south-florida",
    "es-US": "/es/videografo-para-bar-mitzvah-south-florida",
    "x-default": "/services/bar-mitzvah-videographer-south-florida",
  },
  ...nicheBatch20261006,
  ...nicheBatch20261006Hreflang,
  // Annual-events section (2026-10-10), both directions, from lib/events.ts.
  ...eventLanguageAlternates(),
  ...nicheWave8Hreflang,
  ...Object.fromEntries(Object.values(packageRoutes).flatMap(({ en, es }) => [en, es].map((path) => [path, { "en-US": en, "es-US": es, "x-default": en }]))),
  "/pricing/real-estate": {
    "en-US": "/pricing/real-estate",
    "es-US": "/es/precios/inmobiliaria",
    "x-default": "/pricing/real-estate",
  },
  "/es/precios/inmobiliaria": {
    "en-US": "/pricing/real-estate",
    "es-US": "/es/precios/inmobiliaria",
    "x-default": "/pricing/real-estate",
  },
  "/pricing": {
    "en-US": "/pricing",
    "es-US": "/es/precios",
    "x-default": "/pricing",
  },
  "/es/precios": {
    "en-US": "/pricing",
    "es-US": "/es/precios",
    "x-default": "/pricing",
  },
  "/daily-script-pacing-calculator": {
    "en-US": "/daily-script-pacing-calculator",
    "es-US": "/es/calculadora-de-ritmo-de-video",
    "x-default": "/daily-script-pacing-calculator",
  },
  "/es/calculadora-de-ritmo-de-video": {
    "en-US": "/daily-script-pacing-calculator",
    "es-US": "/es/calculadora-de-ritmo-de-video",
    "x-default": "/daily-script-pacing-calculator",
  },
  // Case Study pairs (2026-08-14): Banacol, Homeowners, FLAS, Healthy Smile, My D'ler
  "/case-studies/banacol": {
    "en-US": "/case-studies/banacol",
    "es-US": "/es/casos-de-estudio/banacol",
    "x-default": "/case-studies/banacol",
  },
  "/es/casos-de-estudio/banacol": {
    "en-US": "/case-studies/banacol",
    "es-US": "/es/casos-de-estudio/banacol",
    "x-default": "/case-studies/banacol",
  },
  "/case-studies/homeowners": {
    "en-US": "/case-studies/homeowners",
    "es-US": "/es/casos-de-estudio/homeowners",
    "x-default": "/case-studies/homeowners",
  },
  "/es/casos-de-estudio/homeowners": {
    "en-US": "/case-studies/homeowners",
    "es-US": "/es/casos-de-estudio/homeowners",
    "x-default": "/case-studies/homeowners",
  },
  "/case-studies/flas-concierge": {
    "en-US": "/case-studies/flas-concierge",
    "es-US": "/es/casos-de-estudio/flas-concierge",
    "x-default": "/case-studies/flas-concierge",
  },
  "/es/casos-de-estudio/flas-concierge": {
    "en-US": "/case-studies/flas-concierge",
    "es-US": "/es/casos-de-estudio/flas-concierge",
    "x-default": "/case-studies/flas-concierge",
  },
  "/case-studies/healthy-smile": {
    "en-US": "/case-studies/healthy-smile",
    "es-US": "/es/casos-de-estudio/healthy-smile",
    "x-default": "/case-studies/healthy-smile",
  },
  "/es/casos-de-estudio/healthy-smile": {
    "en-US": "/case-studies/healthy-smile",
    "es-US": "/es/casos-de-estudio/healthy-smile",
    "x-default": "/case-studies/healthy-smile",
  },
  "/case-studies/my-dler": {
    "en-US": "/case-studies/my-dler",
    "es-US": "/es/casos-de-estudio/my-dler",
    "x-default": "/case-studies/my-dler",
  },
  "/es/casos-de-estudio/my-dler": {
    "en-US": "/case-studies/my-dler",
    "es-US": "/es/casos-de-estudio/my-dler",
    "x-default": "/case-studies/my-dler",
  },
  // pembroke-pines was previously hardcoded inside buildSpanishNicheMetadata.
  // Moved here so every pair lives in one place and both languages read it.
  "/services/small-business-video-pembroke-pines": {
    "en-US": "/services/small-business-video-pembroke-pines",
    "es-US": "/es/video-para-pequenos-negocios-pembroke-pines",
    "x-default": "/services/small-business-video-pembroke-pines",
  },
  "/es/video-para-pequenos-negocios-pembroke-pines": {
    "en-US": "/services/small-business-video-pembroke-pines",
    "es-US": "/es/video-para-pequenos-negocios-pembroke-pines",
    "x-default": "/services/small-business-video-pembroke-pines",
  },
  // Bilingual service/niche pairs (2026-08-14). Both languages stay live —
  // Spanish serves the large bilingual audience, English is the ranking engine
  // for Miami-Dade / Broward / Palm Beach. Before this, only 17 shell pages
  // were paired, so the 62 English service pages and their Spanish
  // equivalents had NO hreflang and no toggle between them.
  // x-default points at English by design: US search intent for these
  // services is English (Semrush 2026-08-13 — "videografo miami" returns no
  // US data at all, while "videographer miami" is 260/mo at KD 26).
  "/services/ai-food-photography-restaurants": {
    "en-US": "/services/ai-food-photography-restaurants",
    "es-US": "/es/fotografia-de-comida-con-ia-restaurantes",
    "x-default": "/services/ai-food-photography-restaurants",
  },
  "/es/fotografia-de-comida-con-ia-restaurantes": {
    "en-US": "/services/ai-food-photography-restaurants",
    "es-US": "/es/fotografia-de-comida-con-ia-restaurantes",
    "x-default": "/services/ai-food-photography-restaurants",
  },
  "/services/ai-product-photography-miami": {
    "en-US": "/services/ai-product-photography-miami",
    "es-US": "/es/fotografia-de-producto-con-ia-miami",
    "x-default": "/services/ai-product-photography-miami",
  },
  "/es/fotografia-de-producto-con-ia-miami": {
    "en-US": "/services/ai-product-photography-miami",
    "es-US": "/es/fotografia-de-producto-con-ia-miami",
    "x-default": "/services/ai-product-photography-miami",
  },
  "/services/product-photography-miami": {
    "en-US": "/services/product-photography-miami",
    "es-US": "/es/fotografia-de-producto-miami",
    "x-default": "/services/product-photography-miami",
  },
  "/es/fotografia-de-producto-miami": {
    "en-US": "/services/product-photography-miami",
    "es-US": "/es/fotografia-de-producto-miami",
    "x-default": "/services/product-photography-miami",
  },
  "/services/ai-real-estate-photo-enhancement": {
    "en-US": "/services/ai-real-estate-photo-enhancement",
    "es-US": "/es/fotos-con-ia-para-bienes-raices-miami",
    "x-default": "/services/ai-real-estate-photo-enhancement",
  },
  "/es/fotos-con-ia-para-bienes-raices-miami": {
    "en-US": "/services/ai-real-estate-photo-enhancement",
    "es-US": "/es/fotos-con-ia-para-bienes-raices-miami",
    "x-default": "/services/ai-real-estate-photo-enhancement",
  },
  "/services/architecture-design-video-miami": {
    "en-US": "/services/architecture-design-video-miami",
    "es-US": "/es/video-para-arquitectura-y-diseno-miami",
    "x-default": "/services/architecture-design-video-miami",
  },
  "/es/video-para-arquitectura-y-diseno-miami": {
    "en-US": "/services/architecture-design-video-miami",
    "es-US": "/es/video-para-arquitectura-y-diseno-miami",
    "x-default": "/services/architecture-design-video-miami",
  },
  "/services/automotive-video-marketing-miami": {
    "en-US": "/services/automotive-video-marketing-miami",
    "es-US": "/es/marketing-de-video-automotriz-miami",
    "x-default": "/services/automotive-video-marketing-miami",
  },
  "/es/marketing-de-video-automotriz-miami": {
    "en-US": "/services/automotive-video-marketing-miami",
    "es-US": "/es/marketing-de-video-automotriz-miami",
    "x-default": "/services/automotive-video-marketing-miami",
  },
  "/services/boutique-hotel-video-editing-miami": {
    "en-US": "/services/boutique-hotel-video-editing-miami",
    "es-US": "/es/edicion-de-video-para-hoteles-boutique-miami",
    "x-default": "/services/boutique-hotel-video-editing-miami",
  },
  "/es/edicion-de-video-para-hoteles-boutique-miami": {
    "en-US": "/services/boutique-hotel-video-editing-miami",
    "es-US": "/es/edicion-de-video-para-hoteles-boutique-miami",
    "x-default": "/services/boutique-hotel-video-editing-miami",
  },
  "/services/corporate-training-video-editing-miami": {
    "en-US": "/services/corporate-training-video-editing-miami",
    "es-US": "/es/edicion-de-video-de-capacitacion-corporativa-miami",
    "x-default": "/services/corporate-training-video-editing-miami",
  },
  "/es/edicion-de-video-de-capacitacion-corporativa-miami": {
    "en-US": "/services/corporate-training-video-editing-miami",
    "es-US": "/es/edicion-de-video-de-capacitacion-corporativa-miami",
    "x-default": "/services/corporate-training-video-editing-miami",
  },
  "/services/corporate-video-editing-weston-fl": {
    "en-US": "/services/corporate-video-editing-weston-fl",
    "es-US": "/es/edicion-de-video-corporativo-weston",
    "x-default": "/services/corporate-video-editing-weston-fl",
  },
  "/es/edicion-de-video-corporativo-weston": {
    "en-US": "/services/corporate-video-editing-weston-fl",
    "es-US": "/es/edicion-de-video-corporativo-weston",
    "x-default": "/services/corporate-video-editing-weston-fl",
  },
  "/services/creative-video-production-wynwood": {
    "en-US": "/services/creative-video-production-wynwood",
    "es-US": "/es/video-creativo-wynwood-miami",
    "x-default": "/services/creative-video-production-wynwood",
  },
  "/es/video-creativo-wynwood-miami": {
    "en-US": "/services/creative-video-production-wynwood",
    "es-US": "/es/video-creativo-wynwood-miami",
    "x-default": "/services/creative-video-production-wynwood",
  },
  "/services/crowdfunding-video-editor-miami": {
    "en-US": "/services/crowdfunding-video-editor-miami",
    "es-US": "/es/editor-de-video-para-campanas-de-crowdfunding",
    "x-default": "/services/crowdfunding-video-editor-miami",
  },
  "/es/editor-de-video-para-campanas-de-crowdfunding": {
    "en-US": "/services/crowdfunding-video-editor-miami",
    "es-US": "/es/editor-de-video-para-campanas-de-crowdfunding",
    "x-default": "/services/crowdfunding-video-editor-miami",
  },
  "/services/drone-video-editing-service-miami": {
    "en-US": "/services/drone-video-editing-service-miami",
    "es-US": "/es/edicion-de-video-con-dron-miami",
    "x-default": "/services/drone-video-editing-service-miami",
  },
  "/es/edicion-de-video-con-dron-miami": {
    "en-US": "/services/drone-video-editing-service-miami",
    "es-US": "/es/edicion-de-video-con-dron-miami",
    "x-default": "/services/drone-video-editing-service-miami",
  },
  "/services/ecommerce-product-video-editor-miami": {
    "en-US": "/services/ecommerce-product-video-editor-miami",
    "es-US": "/es/editor-de-video-de-productos-para-ecommerce",
    "x-default": "/services/ecommerce-product-video-editor-miami",
  },
  "/es/editor-de-video-de-productos-para-ecommerce": {
    "en-US": "/services/ecommerce-product-video-editor-miami",
    "es-US": "/es/editor-de-video-de-productos-para-ecommerce",
    "x-default": "/services/ecommerce-product-video-editor-miami",
  },
  "/services/event-video-editing-miami": {
    "en-US": "/services/event-video-editing-miami",
    "es-US": "/es/edicion-de-video-para-eventos-miami",
    "x-default": "/services/event-video-editing-miami",
  },
  "/es/edicion-de-video-para-eventos-miami": {
    "en-US": "/services/event-video-editing-miami",
    "es-US": "/es/edicion-de-video-para-eventos-miami",
    "x-default": "/services/event-video-editing-miami",
  },
  "/services/headshot-photographer-miami": {
    "en-US": "/services/headshot-photographer-miami",
    "es-US": "/es/fotografo-de-retratos-y-headshots-miami",
    "x-default": "/services/headshot-photographer-miami",
  },
  "/es/fotografo-de-retratos-y-headshots-miami": {
    "en-US": "/services/headshot-photographer-miami",
    "es-US": "/es/fotografo-de-retratos-y-headshots-miami",
    "x-default": "/services/headshot-photographer-miami",
  },
  "/services/jewelry-product-photography-miami": {
    "en-US": "/services/jewelry-product-photography-miami",
    "es-US": "/es/fotografia-de-joyas-y-lujo-miami",
    "x-default": "/services/jewelry-product-photography-miami",
  },
  "/es/fotografia-de-joyas-y-lujo-miami": {
    "en-US": "/services/jewelry-product-photography-miami",
    "es-US": "/es/fotografia-de-joyas-y-lujo-miami",
    "x-default": "/services/jewelry-product-photography-miami",
  },
  "/services/luxury-jewelry-video-editing-miami": {
    "en-US": "/services/luxury-jewelry-video-editing-miami",
    "es-US": "/es/edicion-de-video-para-joyeria-de-lujo-miami",
    "x-default": "/services/luxury-jewelry-video-editing-miami",
  },
  "/es/edicion-de-video-para-joyeria-de-lujo-miami": {
    "en-US": "/services/luxury-jewelry-video-editing-miami",
    "es-US": "/es/edicion-de-video-para-joyeria-de-lujo-miami",
    "x-default": "/services/luxury-jewelry-video-editing-miami",
  },
  "/services/nightlife-event-video-editing-miami": {
    "en-US": "/services/nightlife-event-video-editing-miami",
    "es-US": "/es/edicion-de-video-para-discotecas-y-eventos-miami",
    "x-default": "/services/nightlife-event-video-editing-miami",
  },
  "/es/edicion-de-video-para-discotecas-y-eventos-miami": {
    "en-US": "/services/nightlife-event-video-editing-miami",
    "es-US": "/es/edicion-de-video-para-discotecas-y-eventos-miami",
    "x-default": "/services/nightlife-event-video-editing-miami",
  },
  "/services/online-course-video-editing-service": {
    "en-US": "/services/online-course-video-editing-service",
    "es-US": "/es/edicion-de-video-para-cursos-online",
    "x-default": "/services/online-course-video-editing-service",
  },
  "/es/edicion-de-video-para-cursos-online": {
    "en-US": "/services/online-course-video-editing-service",
    "es-US": "/es/edicion-de-video-para-cursos-online",
    "x-default": "/services/online-course-video-editing-service",
  },
  "/services/plastic-surgery-video-marketing-miami": {
    "en-US": "/services/plastic-surgery-video-marketing-miami",
    "es-US": "/es/marketing-de-video-para-cirugia-plastica-miami",
    "x-default": "/services/plastic-surgery-video-marketing-miami",
  },
  "/es/marketing-de-video-para-cirugia-plastica-miami": {
    "en-US": "/services/plastic-surgery-video-marketing-miami",
    "es-US": "/es/marketing-de-video-para-cirugia-plastica-miami",
    "x-default": "/services/plastic-surgery-video-marketing-miami",
  },
  "/services/real-estate-drone-video-editing-miami": {
    "en-US": "/services/real-estate-drone-video-editing-miami",
    "es-US": "/es/drone-real-estate-miami",
    "x-default": "/services/real-estate-drone-video-editing-miami",
  },
  "/es/drone-real-estate-miami": {
    "en-US": "/services/real-estate-drone-video-editing-miami",
    "es-US": "/es/drone-real-estate-miami",
    "x-default": "/services/real-estate-drone-video-editing-miami",
  },
  "/services/real-estate-video-aventura-miami": {
    "en-US": "/services/real-estate-video-aventura-miami",
    "es-US": "/es/video-inmobiliario-aventura-miami",
    "x-default": "/services/real-estate-video-aventura-miami",
  },
  "/es/video-inmobiliario-aventura-miami": {
    "en-US": "/services/real-estate-video-aventura-miami",
    "es-US": "/es/video-inmobiliario-aventura-miami",
    "x-default": "/services/real-estate-video-aventura-miami",
  },
  "/services/real-estate-video-coral-gables": {
    "en-US": "/services/real-estate-video-coral-gables",
    "es-US": "/es/video-inmobiliario-coral-gables",
    "x-default": "/services/real-estate-video-coral-gables",
  },
  "/es/video-inmobiliario-coral-gables": {
    "en-US": "/services/real-estate-video-coral-gables",
    "es-US": "/es/video-inmobiliario-coral-gables",
    "x-default": "/services/real-estate-video-coral-gables",
  },
  "/services/real-estate-video-sunny-isles": {
    "en-US": "/services/real-estate-video-sunny-isles",
    "es-US": "/es/video-inmobiliario-sunny-isles",
    "x-default": "/services/real-estate-video-sunny-isles",
  },
  "/es/video-inmobiliario-sunny-isles": {
    "en-US": "/services/real-estate-video-sunny-isles",
    "es-US": "/es/video-inmobiliario-sunny-isles",
    "x-default": "/services/real-estate-video-sunny-isles",
  },
  "/services/restaurant-promo-video-editing-miami": {
    "en-US": "/services/restaurant-promo-video-editing-miami",
    "es-US": "/es/edicion-de-video-promocional-para-restaurantes-miami",
    "x-default": "/services/restaurant-promo-video-editing-miami",
  },
  "/es/edicion-de-video-promocional-para-restaurantes-miami": {
    "en-US": "/services/restaurant-promo-video-editing-miami",
    "es-US": "/es/edicion-de-video-promocional-para-restaurantes-miami",
    "x-default": "/services/restaurant-promo-video-editing-miami",
  },
  "/services/short-form-video-editor-miami": {
    "en-US": "/services/short-form-video-editor-miami",
    "es-US": "/es/editor-de-video-corto-para-redes-miami",
    "x-default": "/services/short-form-video-editor-miami",
  },
  "/es/editor-de-video-corto-para-redes-miami": {
    "en-US": "/services/short-form-video-editor-miami",
    "es-US": "/es/editor-de-video-corto-para-redes-miami",
    "x-default": "/services/short-form-video-editor-miami",
  },
  "/services/tiktok-ad-video-editor-miami": {
    "en-US": "/services/tiktok-ad-video-editor-miami",
    "es-US": "/es/editor-de-video-para-anuncios-de-tiktok-miami",
    "x-default": "/services/tiktok-ad-video-editor-miami",
  },
  "/es/editor-de-video-para-anuncios-de-tiktok-miami": {
    "en-US": "/services/tiktok-ad-video-editor-miami",
    "es-US": "/es/editor-de-video-para-anuncios-de-tiktok-miami",
    "x-default": "/services/tiktok-ad-video-editor-miami",
  },
  "/services/ugc-video-editor-ecommerce": {
    "en-US": "/services/ugc-video-editor-ecommerce",
    "es-US": "/es/editor-de-video-ugc-para-ecommerce",
    "x-default": "/services/ugc-video-editor-ecommerce",
  },
  "/es/editor-de-video-ugc-para-ecommerce": {
    "en-US": "/services/ugc-video-editor-ecommerce",
    "es-US": "/es/editor-de-video-ugc-para-ecommerce",
    "x-default": "/services/ugc-video-editor-ecommerce",
  },
  "/services/video-editing-miami-beach": {
    "en-US": "/services/video-editing-miami-beach",
    "es-US": "/es/edicion-de-video-miami-beach",
    "x-default": "/services/video-editing-miami-beach",
  },
  "/es/edicion-de-video-miami-beach": {
    "en-US": "/services/video-editing-miami-beach",
    "es-US": "/es/edicion-de-video-miami-beach",
    "x-default": "/services/video-editing-miami-beach",
  },
  "/services/video-editing-palm-beach-gardens": {
    "en-US": "/services/video-editing-palm-beach-gardens",
    "es-US": "/es/edicion-de-video-palm-beach-gardens",
    "x-default": "/services/video-editing-palm-beach-gardens",
  },
  "/es/edicion-de-video-palm-beach-gardens": {
    "en-US": "/services/video-editing-palm-beach-gardens",
    "es-US": "/es/edicion-de-video-palm-beach-gardens",
    "x-default": "/services/video-editing-palm-beach-gardens",
  },
  "/services/video-podcast-editing-service-miami": {
    "en-US": "/services/video-podcast-editing-service-miami",
    "es-US": "/es/edicion-de-video-podcast-miami",
    "x-default": "/services/video-podcast-editing-service-miami",
  },
  "/es/edicion-de-video-podcast-miami": {
    "en-US": "/services/video-podcast-editing-service-miami",
    "es-US": "/es/edicion-de-video-podcast-miami",
    "x-default": "/services/video-podcast-editing-service-miami",
  },
  "/services/video-production-davie-fl": {
    "en-US": "/services/video-production-davie-fl",
    "es-US": "/es/produccion-de-video-davie-fl",
    "x-default": "/services/video-production-davie-fl",
  },
  "/es/produccion-de-video-davie-fl": {
    "en-US": "/services/video-production-davie-fl",
    "es-US": "/es/produccion-de-video-davie-fl",
    "x-default": "/services/video-production-davie-fl",
  },
  "/services/video-production-delray-beach": {
    "en-US": "/services/video-production-delray-beach",
    "es-US": "/es/produccion-de-video-delray-beach",
    "x-default": "/services/video-production-delray-beach",
  },
  "/es/produccion-de-video-delray-beach": {
    "en-US": "/services/video-production-delray-beach",
    "es-US": "/es/produccion-de-video-delray-beach",
    "x-default": "/services/video-production-delray-beach",
  },
  "/services/video-production-doral-miami": {
    "en-US": "/services/video-production-doral-miami",
    "es-US": "/es/produccion-de-video-doral-miami",
    "x-default": "/services/video-production-doral-miami",
  },
  "/es/produccion-de-video-doral-miami": {
    "en-US": "/services/video-production-doral-miami",
    "es-US": "/es/produccion-de-video-doral-miami",
    "x-default": "/services/video-production-doral-miami",
  },
  "/services/website-design-fort-lauderdale": {
    "en-US": "/services/website-design-fort-lauderdale",
    "es-US": "/es/diseno-web-fort-lauderdale",
    "x-default": "/services/website-design-fort-lauderdale",
  },
  "/es/diseno-web-fort-lauderdale": {
    "en-US": "/services/website-design-fort-lauderdale",
    "es-US": "/es/diseno-web-fort-lauderdale",
    "x-default": "/services/website-design-fort-lauderdale",
  },
  "/services/yacht-charter-video-marketing-miami": {
    "en-US": "/services/yacht-charter-video-marketing-miami",
    "es-US": "/es/marketing-de-video-para-alquiler-de-yates-miami",
    "x-default": "/services/yacht-charter-video-marketing-miami",
  },
  "/es/marketing-de-video-para-alquiler-de-yates-miami": {
    "en-US": "/services/yacht-charter-video-marketing-miami",
    "es-US": "/es/marketing-de-video-para-alquiler-de-yates-miami",
    "x-default": "/services/yacht-charter-video-marketing-miami",
  },
  "/services/yacht-hospitality-video-fort-lauderdale": {
    "en-US": "/services/yacht-hospitality-video-fort-lauderdale",
    "es-US": "/es/video-para-yates-y-hospitalidad-fort-lauderdale",
    "x-default": "/services/yacht-hospitality-video-fort-lauderdale",
  },
  "/es/video-para-yates-y-hospitalidad-fort-lauderdale": {
    "en-US": "/services/yacht-hospitality-video-fort-lauderdale",
    "es-US": "/es/video-para-yates-y-hospitalidad-fort-lauderdale",
    "x-default": "/services/yacht-hospitality-video-fort-lauderdale",
  },
  "/services/youtube-video-editing-service-miami": {
    "en-US": "/services/youtube-video-editing-service-miami",
    "es-US": "/es/servicio-de-edicion-de-video-para-youtube-miami",
    "x-default": "/services/youtube-video-editing-service-miami",
  },
  "/es/servicio-de-edicion-de-video-para-youtube-miami": {
    "en-US": "/services/youtube-video-editing-service-miami",
    "es-US": "/es/servicio-de-edicion-de-video-para-youtube-miami",
    "x-default": "/services/youtube-video-editing-service-miami",
  },
  "/": {
    "en-US": "/",
    "es-US": "/es",
    "x-default": "/",
  },
  "/calculator": {
    "en-US": "/calculator",
    "es-US": "/es/calculadora",
    "x-default": "/calculator",
  },
  "/resources/social-video-kit": {
    "en-US": "/resources/social-video-kit",
    "es-US": "/es/recursos/kit-video-social",
    "x-default": "/resources/social-video-kit",
  },
  "/assessment": {
    "en-US": "/assessment",
    "es-US": "/es/evaluacion",
    "x-default": "/assessment",
  },
  // Spanish-side entries must mirror their English counterparts exactly.
  // hreflang is only honoured when both documents point at each other; a
  // one-directional declaration is discarded by Google.
  "/es/calculadora": {
    "en-US": "/calculator",
    "es-US": "/es/calculadora",
    "x-default": "/calculator",
  },
  "/es/recursos/kit-video-social": {
    "en-US": "/resources/social-video-kit",
    "es-US": "/es/recursos/kit-video-social",
    "x-default": "/resources/social-video-kit",
  },
  "/es/evaluacion": {
    "en-US": "/assessment",
    "es-US": "/es/evaluacion",
    "x-default": "/assessment",
  },
  "/services": {
    "en-US": "/services",
    "es-US": "/es/servicios",
    "x-default": "/services",
  },
  "/portfolio": {
    "en-US": "/portfolio",
    "es-US": "/es/portafolio",
    "x-default": "/portfolio",
  },
  "/areas": {
    "en-US": "/areas",
    "es-US": "/es/areas",
    "x-default": "/areas",
  },
  "/areas/palm-beach-county": {
    "en-US": "/areas/palm-beach-county",
    "es-US": "/es/areas/palm-beach-county",
    "x-default": "/areas/palm-beach-county",
  },
  "/about": {
    "en-US": "/about",
    "es-US": "/es/sobre-esteban",
    "x-default": "/about",
  },
  "/contact": {
    "en-US": "/contact",
    "es-US": "/es/contacto",
    "x-default": "/contact",
  },
  "/es": {
    "en-US": "/",
    "es-US": "/es",
    "x-default": "/",
  },
  "/es/servicios": {
    "en-US": "/services",
    "es-US": "/es/servicios",
    "x-default": "/services",
  },
  "/es/portafolio": {
    "en-US": "/portfolio",
    "es-US": "/es/portafolio",
    "x-default": "/portfolio",
  },
  "/es/areas": {
    "en-US": "/areas",
    "es-US": "/es/areas",
    "x-default": "/areas",
  },
  "/es/areas/palm-beach-county": {
    "en-US": "/areas/palm-beach-county",
    "es-US": "/es/areas/palm-beach-county",
    "x-default": "/areas/palm-beach-county",
  },
  "/es/sobre-esteban": {
    "en-US": "/about",
    "es-US": "/es/sobre-esteban",
    "x-default": "/about",
  },
  "/es/contacto": {
    "en-US": "/contact",
    "es-US": "/es/contacto",
    "x-default": "/contact",
  },
};

/**
 * hreflang is suppressed for any page the 2026-08-12 cohort decision marked
 * noindex or merged.
 *
 * Advertising "this is the Spanish version of that page" while the page itself
 * says "do not index me" is a contradictory signal, and it is the same mistake
 * the sitemap filter at the bottom of app/sitemap.ts already prevents. Measured
 * 2026-10-06: six pairs (ecommerce product video, event video, luxury jewelry,
 * Aventura real estate, Davie production, YouTube editing) were noindexed on
 * BOTH sides and still carried full hreflang annotations.
 *
 * Filtering here rather than hand-deleting rows means a future consolidation
 * stops advertising itself automatically, with no second place to remember.
 */
for (const id of ["gains-from-geebs", "caro-sells-miami", "dupont-realty-international", "great-reviewer-website", "gains-from-geebs-shorts", "exatlon", "juanchis-burguer", "portosole", "punto-de-giro"] as const) {
  const en = `/case-studies/${id}`;
  const es = `/es/casos-de-estudio/${id}`;
  languageAlternatesRaw[en] = { "en-US": en, "es-US": es, "x-default": en };
  languageAlternatesRaw[es] = { "en-US": en, "es-US": es, "x-default": en };
}

const PRIVATE_PARTY_EN = "/services/private-party-videographer-south-florida";
const PRIVATE_PARTY_ES = "/es/videografo-para-fiestas-privadas-sur-de-florida";
languageAlternatesRaw[PRIVATE_PARTY_EN] = { "en-US": PRIVATE_PARTY_EN, "es-US": PRIVATE_PARTY_ES, "x-default": PRIVATE_PARTY_EN };
languageAlternatesRaw[PRIVATE_PARTY_ES] = { "en-US": PRIVATE_PARTY_EN, "es-US": PRIVATE_PARTY_ES, "x-default": PRIVATE_PARTY_EN };

export const languageAlternates: Record<string, Record<string, string>> =
  Object.fromEntries(
    Object.entries(languageAlternatesRaw).filter(
      ([path, langs]) =>
        !isConsolidatedPath(path) &&
        !isConsolidatedPath(langs["en-US"]) &&
        !isConsolidatedPath(langs["es-US"]),
    ),
  );

export const spanishProofPrinciples = [
  "El español es el idioma principal de Esteban; también hay comunicación de trabajo disponible en inglés.",
  "La página publica solo prueba real: trabajos reales, enlaces reales y testimonios reales cuando existan.",
  "La edición, el contenido con IA, la planificación y la captura se conectan a una meta comercial.",
  "Las consultas parten de la meta, el material disponible, la ubicación y el uso previsto.",
];

export const spanishTrustQuestions = [
  {
    question: "¿Por qué una página en español?",
    answer:
      "Porque muchos dueños, agentes, restaurantes y creadores en Broward, Miami-Dade y Palm Beach prefieren explicar el proyecto en español. Eso reduce fricción y evita malos entendidos en el scope.",
  },
  {
    question: "¿Hay prueba real publicada?",
    answer:
      "Sí. El portafolio publica ocho proyectos reales con videos públicos del canal de YouTube de Esteban y los créditos disponibles. El sitio no inventa logos, reseñas, cifras ni resultados.",
  },
  {
    question: "¿Qué hace diferente a Esteban?",
    answer:
      "Ofrece atención directa en español, comunicación disponible en inglés intermedio y un portafolio público limitado a proyectos y créditos verificables.",
  },
];

export const spanishRoutes = [
  "/es/precios/inmobiliaria",
  restaurantIgStudyPaths.es,
  ...Object.values(packageRoutes).map((route) => route.es),
  ...spanishCoreRoutes,
  ...spanishNichePages.map((page) => `/es/${page.slug}`),
];

export const spanishOpportunitySignals = [
  {
    label: "Atención",
    value: "Español primero",
    detail: "Comunicación directa en español; inglés intermedio disponible.",
    icon: Languages,
  },
  {
    label: "Base local",
    value: "Broward",
    detail: "Fort Lauderdale es la base operativa dentro de Broward County.",
    icon: Building2,
  },
  {
    label: "Trabajo remoto",
    value: "Edición + estrategia",
    detail: "Proyectos sin depender de una grabación presencial.",
    icon: Laptop,
  },
];

export function getSpanishNichePage(slug: string) {
  return spanishNichePages.find((page) => page.slug === slug);
}

/**
 * Builds the JSON-LD `@graph` for a Spanish niche landing page.
 *
 * The graph mirrors the page's already-visible content only: the primary
 * entity (a `Service` for confirmed pages, or a transparent `WebPage`
 * resource for legacy pending-confirmation routes), a `BreadcrumbList`, and a
 * `FAQPage` whose questions/answers are rendered verbatim on the page. No
 * claim is added here that is not already published in the page copy.
 */
export function buildSpanishNicheStructuredData(page: SpanishNichePage) {
  const path = `/es/${page.slug}`;
  const isPendingConfirmation = page.availability === "pending-confirmation";

  const pageEntityJsonLd = isPendingConfirmation
    ? {
        "@type": "WebPage",
        "@id": absoluteUrl(`${path}#resource`),
        name: page.title,
        description: page.description,
        url: absoluteUrl(path),
        inLanguage: "es-US",
        about: page.keyword,
        isPartOf: { "@id": absoluteUrl("/#website") },
      }
    : page.slug === "editor-de-video-corto-para-redes-miami"
      ? shortFormServiceJsonLd("es")
      : {
        "@type": "Service",
        "@id": absoluteUrl(`${path}#service`),
        name: page.title,
        description: page.description,
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: page.location,
        availableLanguage: ["Spanish", "English"],
        serviceType: page.keyword,
      };

  return {
    "@context": "https://schema.org",
    "@graph": [
      pageEntityJsonLd,
      {
        "@type": "BreadcrumbList",
        "@id": absoluteUrl(`${path}#breadcrumbs`),
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: absoluteUrl("/es"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Servicios",
            item: absoluteUrl("/es/servicios"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: page.title,
            item: absoluteUrl(path),
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": absoluteUrl(`${path}#faq`),
        inLanguage: "es-US",
        isPartOf: { "@id": absoluteUrl("/#website") },
        mainEntity: buildServiceFaqSchema(absoluteUrl(path), page.faqs).mainEntity,
      },
    ],
  };
}
