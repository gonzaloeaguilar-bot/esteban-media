// The three answers every niche/service page owes an AI assistant and a
// person comparing editors, generated from ONE place:
//
//   1. "Who can help me with <service> in <place>?"  — phrased the way people
//      ask ChatGPT / Gemini, answered only with facts the site already
//      publishes (the page's own description, the Fort Lauderdale base, the
//      Spanish-first language claim, the published-work-only portfolio rule);
//   2. "How much does <service> cost in <place>?" — every figure read from
//      lib/pricing.ts (and its package / plan helpers), never typed here;
//   3. "How do I contact Esteban about <service>?" — phone, WhatsApp and email
//      in plain text, from lib/site.ts.
//
// Plus one Service node per page whose telephone, areaServed and serviceType
// match that visible text (withNicheService).
//
// Why (2026-10-08, vault esteban-what-drives-ai-recommendations-2026-10-08):
// ChatGPT and Gemini recommended Esteban from ONE page, the short-form editor
// page, after PR #316 gave it exactly these three answers. On 2026-10-13 the
// live sitemap's 247 /services and /es pages had a plain-text phone on 6, a
// "who can help" section on 8 and a cost question on 71. This module is the
// PR #316 pattern at the template level, so the next page gets it for free.
//
// Claim discipline: no client, result, review, follower count or drone work is
// claimed. Where a page already answers the cost question, `cost` is false and
// that page keeps its own answer. The restaurant pages' "from" price is the
// owner's (2026-10-13) and lives in lib/pricing.ts as RESTAURANT_PROMO.

import { priceSentence, whatsappHref } from "@/lib/packages";
import {
  ARRANQUE_WEEKLY_FROM,
  ARRANQUE_WEEKLY_TERMS as T,
  PRICING_BANDS,
  PRODUCT_PHOTO_MARKET,
  PRODUCT_PHOTO_SESSION,
  REAL_ESTATE_PLANS,
  REAL_ESTATE_PLAN_TERMS,
  RESTAURANT_PROMO,
  SHORT_FORM,
  shortFormWeeklyText,
  usd,
  type PricingBandId,
} from "@/lib/pricing";
import { withPageDate } from "@/lib/page-lastmod";
import { realEstatePlanName } from "@/lib/real-estate-plans";
import { absoluteUrl, site } from "@/lib/site";

export type NicheLocale = "en" | "es";

/** Which published price list answers the cost question for a page. */
export type PriceModel =
  | "social" // Starter per video, weekly Starter, Growth monthly
  | "restaurant" // restaurant promo from RESTAURANT_PROMO (owner, 2026-10-13)
  | "realestate" // monthly real estate plans
  | "local" // production day + on-location band + Starter for editing only
  | "longform" // calculator band "youtube"
  | "corporate" // calculator band "corporate"
  | "ecommerce" // calculator band "ecommerce"
  | "photo" // AI-assisted images: no owner price; quote, with published market context
  | "photoSession" // a real product shoot: owner floor PRODUCT_PHOTO_SESSION
  | "quote"; // no owner price and no market context on the site

export type NicheEntry = {
  path: string;
  locale: NicheLocale;
  /** Lower-case noun phrase as it reads mid-question: "dental video marketing". */
  subject: string;
  /** "Miami", "Fort Lauderdale", "South Florida", "Doral"... */
  place: string;
  model: PriceModel;
  /** false when the page already answers its own cost question. */
  cost: boolean;
  /** One sentence the page already publishes about this service (its description). */
  fact: string;
  /** The subject is plural: "professional headshots", "imágenes con IA". */
  plural: boolean;
};

type Row = [path: string, subject: string, place: string, model: PriceModel, cost?: boolean];

// ---------------------------------------------------------------------------
// The registry. One row per indexable page. `cost: false` = the page already
// carries a "How much does ... cost?" section (measured on the live HTML,
// 2026-10-13) or a price this module must not contradict.
// Not here on purpose: the short-form pair (PR #316 already did it), the
// website-design pair (no price source in lib/pricing.ts and its own intake
// flow), noindexed / merged cohort pages, and legacy pending-confirmation routes.
// ---------------------------------------------------------------------------

const EN_ROWS: Row[] = [
  ["/services/ai-food-photography-restaurants", "AI food photography for a restaurant", "Miami", "photo"],
  ["/services/ai-product-photography-miami", "AI product photography", "Miami", "photo"],
  ["/services/ai-real-estate-photo-enhancement", "AI real estate photo enhancement", "Miami", "quote"],
  ["/services/architecture-design-video-miami", "architecture and interior design video", "Miami", "corporate"],
  ["/services/auto-detailing-tint-wrap-video-marketing-miami", "a video for a detailing, tint or wrap shop", "Miami", "social"],
  ["/services/automotive-video-marketing-miami", "automotive video marketing", "Miami", "social", false],
  ["/services/boutique-hotel-video-editing-miami", "boutique hotel video editing", "Miami", "social"],
  ["/services/brand-video-production-miami", "brand video production", "Miami", "corporate"],
  ["/services/church-sermon-clip-editing-miami", "sermon clip editing for a church", "Miami", "social", false],
  ["/services/content-creator-video-editing-miami", "video editing as a content creator", "Miami", "social", false],
  ["/services/content-repurposing-service-miami", "turning long videos into social clips", "Miami", "social"],
  ["/services/contractor-video-marketing-south-florida", "video marketing for a contractor", "South Florida", "social"],
  ["/services/corporate-event-videographer-miami", "corporate event video", "Miami", "corporate", false],
  ["/services/corporate-training-video-editing-miami", "corporate training video editing", "Miami", "corporate"],
  ["/services/corporate-video-editing-weston-fl", "corporate video editing", "Weston", "corporate"],
  ["/services/corporate-video-production-brickell", "corporate video production", "Brickell", "corporate"],
  ["/services/cosmetic-dentistry-video-marketing-miami", "cosmetic dentistry video marketing", "Miami", "social"],
  ["/services/creative-video-production-wynwood", "creative video production", "Wynwood", "local"],
  ["/services/crowdfunding-video-editor-miami", "a crowdfunding or Kickstarter video", "Miami", "corporate"],
  ["/services/dance-studio-music-school-video-marketing-miami", "a video for a dance studio or music school", "Miami", "social"],
  ["/services/dental-video-marketing-south-florida", "dental video marketing", "South Florida", "social", false],
  ["/services/drone-video-editing-service-miami", "drone video editing", "Miami", "longform"],
  ["/services/fitness-gym-video-marketing-miami", "gym and fitness video marketing", "Miami", "social", false],
  ["/services/food-and-places-creator-video-editing-miami", "editing for a food and places account", "Miami", "social", false],
  ["/services/headshot-photographer-miami", "professional headshots", "Miami", "quote"],
  ["/services/hire-remote-video-editor", "remote video editing", "South Florida", "social", false],
  ["/services/hotel-hospitality-video-production-miami", "hotel and hospitality video", "Miami", "social", false],
  ["/services/immigration-attorney-video-marketing-miami", "video marketing for an immigration law firm", "Miami", "social"],
  ["/services/insurance-agency-video-marketing-miami", "a video for an insurance agency", "Miami", "social"],
  ["/services/interview-video-editing-service", "interview video editing", "Miami", "longform"],
  ["/services/jewelry-product-photography-miami", "jewelry product photography", "Miami", "photoSession"],
  ["/services/med-spa-video-marketing-south-florida", "med spa video marketing", "South Florida", "social", false],
  ["/services/medical-practice-video-marketing-miami", "video marketing for a medical practice", "Miami", "social"],
  ["/services/mortgage-broker-video-marketing-miami", "a video for a mortgage broker", "Miami", "social"],
  ["/services/music-video-post-production-miami", "music video post-production", "Miami", "longform"],
  ["/services/nightlife-event-video-editing-miami", "nightlife and event video editing", "Miami", "social", false],
  ["/services/online-course-video-editing-service", "online course video editing", "Miami", "longform"],
  ["/services/plastic-surgery-video-marketing-miami", "plastic surgery video marketing", "Miami", "social"],
  ["/services/pre-construction-condo-video-marketing-miami", "pre-construction condo video", "Miami", "realestate"],
  ["/services/personal-brand-video-editor-founders-miami", "personal brand video editing for a founder", "Miami", "social", false],
  ["/services/podcast-clipping-service-miami", "podcast clipping", "Miami", "social", false],
  ["/services/product-photography-miami", "product photography", "Miami", "photoSession"],
  ["/services/quinceanera-video-miami", "a quinceañera video", "Miami", "local"],
  ["/services/real-estate-drone-video-editing-miami", "real estate drone video editing", "Miami", "realestate"],
  ["/services/real-estate-reels-video-editor-south-florida", "real estate Reels editing", "South Florida", "realestate", false],
  ["/services/real-estate-video-coral-gables", "real estate video", "Coral Gables", "realestate"],
  ["/services/real-estate-video-sunny-isles", "real estate video", "Sunny Isles Beach", "realestate"],
  ["/services/reels-editor-fort-lauderdale", "Reels editing", "Fort Lauderdale", "social", false],
  ["/services/reels-editor-miami", "Reels editing", "Miami", "social", false],
  ["/services/restaurant-promo-video-editing-miami", "restaurant promo video editing", "Miami", "restaurant"],
  ["/services/salon-barbershop-video-marketing-miami", "a video for a salon or barbershop", "Miami", "social", false],
  ["/services/small-business-video-hollywood-fl", "small business video", "Hollywood, FL", "local"],
  ["/services/small-business-video-pembroke-pines", "small business video editing", "Pembroke Pines", "social"],
  ["/services/small-business-video-production-miami", "small business video production", "Miami", "local", false],
  ["/services/tiktok-ad-video-editor-miami", "TikTok and Instagram ad editing", "Miami", "social"],
  ["/services/ugc-video-editor-ecommerce", "UGC video editing for an e-commerce brand", "Miami", "ecommerce"],
  ["/services/vacation-rental-video-marketing-fort-lauderdale", "vacation rental video", "Fort Lauderdale", "social"],
  ["/services/video-editing-miami-beach", "video editing", "Miami Beach", "local"],
  ["/services/video-editing-palm-beach-gardens", "video editing", "Palm Beach Gardens", "local"],
  ["/services/video-editing-west-palm-beach", "video editing", "West Palm Beach", "local"],
  ["/services/video-production-boca-raton", "Reels and video editing", "Boca Raton", "social", false],
  ["/services/video-podcast-editing-service-miami", "video podcast editing", "Miami", "longform"],
  ["/services/video-production-delray-beach", "video production", "Delray Beach", "local"],
  ["/services/video-production-doral-miami", "video production", "Doral", "local"],
  ["/services/video-production-fort-lauderdale", "video production", "Fort Lauderdale", "local", false],
  ["/services/wealth-management-video-production-miami", "a video for a financial advisor or wealth manager", "Miami", "corporate"],
  ["/services/webinar-clip-editing-service", "webinar clip editing", "Miami", "social"],
  ["/services/wellness-spa-video-marketing-miami", "spa and wellness video marketing", "Miami", "social", false],
  ["/services/white-label-video-editing-for-agencies", "white-label video editing", "Miami", "social", false],
  ["/services/yacht-charter-video-marketing-miami", "yacht charter video marketing", "Miami", "social", false],
  ["/services/yacht-hospitality-video-fort-lauderdale", "yacht and marine video editing", "Fort Lauderdale", "social"],
];

const ES_ROWS: Row[] = [
  ["/es/video-para-preventa-de-condominios-miami", "el video para preventa de condominios", "Miami", "realestate"],
  ["/es/video-para-alquileres-vacacionales-fort-lauderdale", "el video para un alquiler vacacional", "Fort Lauderdale", "social"],
  ["/es/marketing-de-video-para-agencias-de-seguros-miami", "el video para una agencia de seguros", "Miami", "social"],
  ["/es/marketing-de-video-para-brokers-hipotecarios-miami", "el video para un broker hipotecario", "Miami", "social"],
  ["/es/marketing-de-video-para-abogados-de-inmigracion-miami", "el video para una firma de abogados de inmigración", "Miami", "social"],
  ["/es/edicion-de-clips-de-predicas-para-iglesias-miami", "los clips de prédicas para una iglesia", "Miami", "social", false],
  ["/es/video-para-quinceaneras-miami", "el video de unos quince años", "Miami", "local"],
  ["/es/editor-de-video-para-marca-personal-miami", "la edición de videos de marca personal", "Miami", "social", false],
  ["/es/edicion-de-clips-de-podcast-miami", "los clips de un podcast", "Miami", "social", false],
  ["/es/video-para-academias-de-baile-y-musica-miami", "el video para una academia de baile o música", "Miami", "social"],
  ["/es/edicion-de-video-para-creadores-de-comida-y-lugares-miami", "la edición de una cuenta de comida y lugares", "Miami", "social", false],
  ["/es/videografo-en-miami", "un videógrafo", "Miami", "local"],
  ["/es/videografo-en-fort-lauderdale", "un videógrafo", "Fort Lauderdale", "local"],
  ["/es/reels-para-negocios-miami", "los reels para mi negocio", "Miami", "social"],
  ["/es/video-para-restaurantes-miami", "el video para un restaurante", "Miami", "restaurant"],
  ["/es/editor-de-video-real-estate-miami", "la edición de video para real estate", "Miami", "realestate"],
  ["/es/fotografia-de-producto-con-ia-miami", "la fotografía de producto con IA", "Miami", "photo"],
  ["/es/imagenes-con-ia-para-ecommerce-miami", "las imágenes con IA para e-commerce", "Miami", "photo"],
  ["/es/marketing-de-video-para-dentistas-miami", "el marketing de video para dentistas", "Miami", "social", false],
  ["/es/marketing-de-video-para-abogados-miami", "el marketing de video para abogados", "Miami", "social"],
  ["/es/marketing-de-video-para-clinicas-esteticas-miami", "el marketing de video para una clínica estética", "Miami", "social", false],
  ["/es/reutilizacion-de-contenido-para-redes-miami", "convertir videos largos en clips para redes", "Miami", "social"],
  ["/es/fotos-con-ia-para-bienes-raices-miami", "las fotos con IA para bienes raíces", "Miami", "quote"],
  ["/es/fotografia-de-comida-con-ia-restaurantes", "la fotografía de comida con IA para un restaurante", "Miami", "photo"],
  ["/es/marketing-de-video-para-contratistas-miami", "el marketing de video para contratistas", "Miami", "social"],
  ["/es/fotografo-de-retratos-y-headshots-miami", "los retratos y headshots profesionales", "Miami", "quote"],
  ["/es/editor-de-video-miami", "un editor de video", "Miami", "social", false],
  ["/es/produccion-de-video-palm-beach-county", "la producción de video", "Palm Beach", "local"],
  ["/es/produccion-de-video-doral-miami", "la producción de video", "Doral", "local"],
  ["/es/video-inmobiliario-coral-gables", "el video inmobiliario", "Coral Gables", "realestate"],
  ["/es/video-para-yates-y-hospitalidad-fort-lauderdale", "el video para yates y hospitalidad", "Fort Lauderdale", "social"],
  ["/es/video-corporativo-distrito-financiero-miami", "el video corporativo", "Brickell", "corporate"],
  ["/es/video-para-pequenos-negocios-pembroke-pines", "el video para mi pequeño negocio", "Pembroke Pines", "social"],
  ["/es/marketing-de-video-para-cirugia-plastica-miami", "el marketing de video para cirugía plástica", "Miami", "social"],
  ["/es/fotografia-de-joyas-y-lujo-miami", "la fotografía de joyas y productos de lujo", "Miami", "photoSession"],
  ["/es/marketing-de-video-para-gimnasios-miami", "el marketing de video para un gimnasio", "Miami", "social", false],
  ["/es/marketing-de-video-automotriz-miami", "el marketing de video automotriz", "Miami", "social", false],
  ["/es/produccion-de-video-para-hoteles-miami", "la producción de video para un hotel", "Miami", "social", false],
  ["/es/edicion-de-video-podcast-miami", "la edición de un video podcast", "Miami", "longform"],
  ["/es/editor-de-video-ugc-para-ecommerce", "la edición de videos UGC para e-commerce", "Miami", "ecommerce"],
  ["/es/video-para-arquitectura-y-diseno-miami", "el video de arquitectura y diseño de interiores", "Miami", "corporate"],
  ["/es/marketing-de-video-para-spas-y-bienestar-miami", "el marketing de video para un spa", "Miami", "social", false],
  ["/es/produccion-de-video-de-marca-miami", "la producción de video de marca", "Miami", "corporate"],
  ["/es/produccion-de-video-para-entrenadores-personales-miami", "el video para un entrenador personal", "Miami", "social"],
  ["/es/edicion-de-video-promocional-para-restaurantes-miami", "el video promocional para un restaurante", "Miami", "restaurant"],
  ["/es/marketing-de-video-para-alquiler-de-yates-miami", "el marketing de video para alquiler de yates", "Miami", "social", false],
  ["/es/marketing-de-video-para-odontologia-estetica-miami", "el marketing de video para odontología estética", "Miami", "social"],
  ["/es/edicion-de-video-para-discotecas-y-eventos-miami", "el video para una discoteca o un evento", "Miami", "social", false],
  ["/es/marketing-de-video-para-contratistas-de-techos-florida", "el video para un contratista de techos", "South Florida", "social"],
  ["/es/produccion-de-video-para-asesores-financieros-miami", "el video para un asesor financiero", "Miami", "corporate"],
  ["/es/edicion-de-video-para-hoteles-boutique-miami", "la edición de video para un hotel boutique", "Miami", "social"],
  ["/es/edicion-de-video-miami-beach", "la edición de video", "Miami Beach", "local"],
  ["/es/video-creativo-wynwood-miami", "la producción de video creativo", "Wynwood", "local"],
  ["/es/edicion-de-video-corporativo-weston", "la edición de video corporativo", "Weston", "corporate"],
  ["/es/video-de-marca-de-lujo-jupiter", "el video para una marca de lujo", "Jupiter", "local"],
  ["/es/produccion-de-video-delray-beach", "la producción de video", "Delray Beach", "local"],
  ["/es/video-inmobiliario-sunny-isles", "el video inmobiliario", "Sunny Isles Beach", "realestate"],
  ["/es/edicion-de-video-palm-beach-gardens", "la edición de video", "Palm Beach Gardens", "local"],
  ["/es/editor-de-video-para-anuncios-de-tiktok-miami", "los anuncios de video para TikTok e Instagram", "Miami", "social"],
  ["/es/edicion-de-video-para-cursos-online", "la edición de un curso online", "Miami", "longform"],
  ["/es/edicion-de-video-de-capacitacion-corporativa-miami", "los videos de capacitación corporativa", "Miami", "corporate"],
  ["/es/editor-de-video-para-campanas-de-crowdfunding", "el video de una campaña de crowdfunding", "Miami", "corporate"],
  ["/es/edicion-de-video-con-dron-miami", "la edición de video con dron", "Miami", "longform"],
  ["/es/postproduccion-de-videos-musicales-miami", "la postproducción de un video musical", "Miami", "longform"],
  ["/es/produccion-masiva-de-video-para-redes-miami", "producir muchos videos para redes a la vez", "Miami", "social"],
  ["/es/produccion-de-video-fort-lauderdale", "la producción de video", "Fort Lauderdale", "local"],
  ["/es/editor-de-reels-fort-lauderdale", "la edición de Reels", "Fort Lauderdale", "social", false],
  ["/es/editor-de-reels-miami", "la edición de Reels", "Miami", "social", false],
  ["/es/editor-de-reels-boca-raton", "la edición de Reels y video", "Boca Raton", "social", false],
  ["/es/marketing-de-video-para-consultorios-medicos-miami", "el marketing de video para un consultorio médico", "Miami", "social"],
  ["/es/edicion-de-video-para-creadores-de-contenido-miami", "la edición de video como creador de contenido", "Miami", "social", false],
  ["/es/edicion-de-video-marca-blanca-para-agencias", "la edición de video en marca blanca", "Miami", "social", false],
  ["/es/marketing-de-video-para-salones-y-barberias-miami", "el video para un salón o una barbería", "Miami", "social", false],
  ["/es/marketing-de-video-para-detallado-y-wraps-miami", "el video para un taller de detallado o wraps", "Miami", "social"],
];

// Facts are filled in by the page (its own published description), so a
// registry row can never carry a claim the page does not already make.
const ROWS: Record<string, { locale: NicheLocale; row: Row }> = Object.fromEntries([
  ...EN_ROWS.map((row) => [row[0], { locale: "en" as const, row }]),
  ...ES_ROWS.map((row) => [row[0], { locale: "es" as const, row }]),
]);

export const NICHE_ANSWER_PATHS: readonly string[] = Object.keys(ROWS);

/** Rows whose subject is plural, so the cost question reads "do ... cost" / "cuestan". */
const PLURAL_SUBJECT = new Set([
  "/services/headshot-photographer-miami",
  "/es/imagenes-con-ia-para-ecommerce-miami",
  "/es/fotos-con-ia-para-bienes-raices-miami",
  "/es/fotografo-de-retratos-y-headshots-miami",
  "/es/reels-para-negocios-miami",
  "/es/editor-de-video-para-anuncios-de-tiktok-miami",
  "/es/edicion-de-video-de-capacitacion-corporativa-miami",
]);

export function nicheEntry(path: string, fact: string): NicheEntry | undefined {
  const hit = ROWS[path];
  if (!hit) return undefined;
  const [, subject, place, model, cost = true] = hit.row;
  return { path, locale: hit.locale, subject, place, model, cost, fact: sentence(fact), plural: PLURAL_SUBJECT.has(path) };
}

function sentence(text: string): string {
  const t = text.trim().replace(/\s+/g, " ");
  return /[.!?]$/.test(t) ? t : `${t}.`;
}

// ---------------------------------------------------------------------------
// Places. The visible contact paragraph names exactly these, and the JSON-LD
// areaServed is built from the same list, so the two cannot drift apart.
// ---------------------------------------------------------------------------

const CORE_PLACES = ["Miami", "Fort Lauderdale", "Miami-Dade County", "Broward County"] as const;
const COUNTY_LIKE = new Set(["Miami-Dade County", "Broward County", "Palm Beach County"]);
const REGIONS = new Set(["South Florida"]);
const PALM_BEACH = new Set(["Boca Raton", "Palm Beach", "Palm Beach Gardens", "West Palm Beach", "Jupiter", "Delray Beach"]);

export function nicheAreas(place: string): string[] {
  const extra = place === "Palm Beach" ? "Palm Beach County" : place;
  const list: string[] = [...CORE_PLACES];
  if (!REGIONS.has(extra) && !list.includes(extra)) list.push(extra);
  return list;
}

function areaList(place: string, locale: NicheLocale): string {
  const names = nicheAreas(place).map((n) =>
    locale === "es" ? n.replace(" County", "") : n,
  );
  const and = locale === "es" ? " y " : " and ";
  return names.length > 1 ? `${names.slice(0, -1).join(", ")}${and}${names[names.length - 1]}` : names[0];
}

// ---------------------------------------------------------------------------
// Prices. Every figure below is computed from lib/pricing.ts.
// ---------------------------------------------------------------------------

const starter = (l: NicheLocale) => priceSentence(l, "arranque").replace(/^\w/, (c) => c.toLowerCase());
const growth = (l: NicheLocale) => priceSentence(l, "crecimiento").replace(/^\w/, (c) => c.toLowerCase());
const productionDay = (l: NicheLocale) => priceSentence(l, "presencia-local").replace(/^\w/, (c) => c.toLowerCase());
const band = (id: PricingBandId) => `${usd(PRICING_BANDS[id].baseMin)}–${usd(PRICING_BANDS[id].baseMax)}`;
const weeklyFrom = usd(ARRANQUE_WEEKLY_FROM.perVideo);

function costParagraphs(e: NicheEntry): string[] {
  const es = e.locale === "es";
  const pricing = es ? "/es/precios" : "/pricing";
  const close = es
    ? `Todas las cifras son precios de partida de la lista publicada y cada proyecto recibe una cotización por escrito antes de empezar. Compara las opciones en la [página de precios](${pricing}) o calcula un rango en la [calculadora](/es/calculadora).`
    : `Every figure is a starting point from the published price list, and every project gets a written quote before work begins. Compare the options on the [pricing page](${pricing}) or use the [calculator](/calculator) for a range that fits your project.`;
  // Photo and quote answers name third-party market rates or no figure at all,
  // so they must not call their numbers Esteban's published starting prices.
  const quoteClose = es
    ? `Cada proyecto recibe una cotización por escrito antes de empezar. Los paquetes de video que Esteban sí publica están en la [página de precios](${pricing}).`
    : `Every project gets a written quote before work begins. The video packages Esteban does publish are on the [pricing page](${pricing}).`;
  const onLocation = es
    ? `Si hace falta grabar en el lugar, se cotiza aparte: la jornada de producción del paquete Presencia Local va ${productionDay("es")}, y la calculadora del sitio pone media jornada en locación entre ${band("on-location")}.`
    : `If the work needs filming on location, that is quoted separately: the Local Presence package is ${productionDay("en")}, and the site's calculator puts a half-day on location at ${band("on-location")}.`;

  switch (e.model) {
    case "restaurant": {
      const from = usd(RESTAURANT_PROMO.from);
      return es
        ? [
            `La edición de un video promocional para un restaurante, un bar o un café empieza desde ${from} por proyecto. Esteban edita tus tomas de cocina, platos, bebidas o salón en un reel o una promoción para Instagram, TikTok o la web, con subtítulos y el nombre del plato o del local en pantalla. El precio final depende de cuántas piezas necesitas, cuánto material hay y dónde se va a publicar, y queda por escrito antes de empezar. Si solo necesitas un reel editado con tus propios clips, eso es el paquete Arranque: ${usd(SHORT_FORM.perVideoFrom)} por video.`,
            `${onLocation} ${close}`,
          ]
        : [
            `A restaurant, bar or café promo edit starts from ${from} per project. Esteban edits your kitchen, dish, drink or dining-room footage into a reel or promo for Instagram, TikTok or the web, with captions and the dish or venue name on screen. The final price depends on how many pieces you need, how much footage there is and where it will run, and it is set in writing before work begins. If you only need one Reel edited from your own clips, that is the Starter edit: ${usd(SHORT_FORM.perVideoFrom)} per video.`,
            `${onLocation} ${close}`,
          ];
    }
    case "social":
      return es
        ? [
            `Para ${e.subject}, lo habitual es empezar con videos verticales cortos. El paquete Arranque va ${starter("es")}: tú grabas y Esteban edita un video para Reels, TikTok, Shorts o web, con una ronda de cambios. Si publicas cada semana, el Arranque se paga semana a semana: ${shortFormWeeklyText("es")}, es decir, desde ${weeklyFrom} por video, con un mínimo de ${T.minimumWeeks} semanas y luego cancelas cuando quieras. Un mes planificado, con plan de contenido, calendario, edición y reporte, es el paquete Crecimiento, ${growth("es")}.`,
            `${onLocation} ${close}`,
          ]
        : [
            `For ${e.subject}, most work starts with short vertical videos. The Starter package is ${starter("en")}: you film, Esteban edits one video for Reels, TikTok, Shorts or the web, with one revision round. If you post every week, Starter can be paid weekly: ${shortFormWeeklyText("en")}, which works out from ${weeklyFrom} per video, with a ${T.minimumWeeks}-week minimum and then cancel anytime. A planned month with a content plan, calendar, editing and a monthly report is the Growth package, ${growth("en")}.`,
            `${onLocation} ${close}`,
          ];
    case "realestate": {
      const [a, b, c] = REAL_ESTATE_PLANS;
      const plans = (l: NicheLocale) =>
        [a, b, c]
          .map((p) =>
            l === "es"
              ? `${realEstatePlanName(p.id)} a ${usd(p.price)} al mes (${p.properties} ${p.properties === 1 ? "propiedad" : "propiedades"}, ${p.productionDays} días de producción)`
              : `${realEstatePlanName(p.id)} at ${usd(p.price)} a month (${p.properties} ${p.properties === 1 ? "property" : "properties"}, ${p.productionDays} production days)`,
          )
          .join(es ? "; " : "; ");
      return es
        ? [
            `Para agentes y propiedades, Esteban publica tres planes mensuales de real estate: ${plans("es")}. Cada propiedad cuenta hasta 3,000 pies cuadrados. Los planes tienen un mínimo de ${REAL_ESTATE_PLAN_TERMS.minimumMonths} meses, se cancelan con ${REAL_ESTATE_PLAN_TERMS.cancelNoticeDays} días de aviso e incluyen un reporte cada ${REAL_ESTATE_PLAN_TERMS.reportEveryDays} días.`,
            `Si solo necesitas editar material que ya tienes, el paquete Arranque va ${starter("es")}. ${close}`,
          ]
        : [
            `For agents and listings, Esteban publishes three monthly real estate plans: ${plans("en")}. Each property counts up to 3,000 square feet. The plans have a ${REAL_ESTATE_PLAN_TERMS.minimumMonths}-month minimum, cancel with ${REAL_ESTATE_PLAN_TERMS.cancelNoticeDays} days' notice, and include a report every ${REAL_ESTATE_PLAN_TERMS.reportEveryDays} days.`,
            `If you only need footage you already have edited, the Starter package is ${starter("en")}. ${close}`,
          ];
    }
    case "local":
      return es
        ? [
            `Depende de si hace falta grabar. Si ya tienes el material, la edición sola empieza con el paquete Arranque, ${starter("es")}, y se puede pagar semana a semana: ${shortFormWeeklyText("es")}, con un mínimo de ${T.minimumWeeks} semanas. Si Esteban va a grabar, el paquete Presencia Local va ${productionDay("es")}, y la calculadora del sitio pone media jornada en locación entre ${band("on-location")}.`,
            `La grabación en ${e.place} se acuerda proyecto por proyecto desde la base de Esteban en Fort Lauderdale. ${close}`,
          ]
        : [
            `It depends on whether anything needs filming. If you already have footage, editing alone starts with the Starter package, ${starter("en")}, and can be paid weekly: ${shortFormWeeklyText("en")}, with a ${T.minimumWeeks}-week minimum. If Esteban films, the Local Presence package is ${productionDay("en")}, and the site's calculator puts a half-day on location at ${band("on-location")}.`,
            `Filming in ${e.place} is agreed project by project from Esteban's base in Fort Lauderdale. ${close}`,
          ];
    case "longform":
    case "corporate":
    case "ecommerce": {
      const id: PricingBandId = e.model === "longform" ? "youtube" : e.model;
      const unitEn = { youtube: "per long-form edit", corporate: "per medium corporate or explainer project", ecommerce: "per product or ad creative" }[id as "youtube" | "corporate" | "ecommerce"];
      const unitEs = { youtube: "por edición de video largo", corporate: "por proyecto corporativo o explicativo mediano", ecommerce: "por pieza de producto o anuncio" }[id as "youtube" | "corporate" | "ecommerce"];
      return es
        ? [
            `La calculadora de presupuesto del sitio pone ${e.subject} entre ${band(id)} ${unitEs}, según la duración, la cantidad de material y los formatos que necesites. Es una estimación para planear, no una cotización. Los cortes cortos para redes que salen del mismo material se cotizan como el paquete Arranque, ${starter("es")}.`,
            `${onLocation} ${close}`,
          ]
        : [
            `The site's budget calculator puts ${e.subject} at ${band(id)} ${unitEn}, depending on length, the amount of footage and the formats you need. It is an estimate for planning, not a quote. Short social cuts from the same footage are priced like the Starter package, ${starter("en")}.`,
            `${onLocation} ${close}`,
          ];
    }
    case "photoSession": {
      const from = usd(PRODUCT_PHOTO_SESSION.from);
      const m = PRODUCT_PHOTO_MARKET;
      return es
        ? [
            `Una sesión de fotografía de producto con Esteban parte desde ${from} por sesión. Es un precio inicial, no una cifra cerrada: el presupuesto final depende de cuántos productos y ángulos necesitas, del fondo o la ambientación, del retoque y del uso que les vas a dar. Como contexto, las tarifas publicadas en 2026 en el sur de Florida van de ${usd(m.perImageMin)} a ${usd(m.perImageMax)} por imagen de catálogo con fondo blanco; esas son tarifas del mercado, no un precio de Esteban.`,
            `Si en lugar de una sesión prefieres mandar fotos que ya tienes para fondos o ambientes con IA, eso es otro servicio y se cotiza aparte. ${quoteClose}`,
          ]
        : [
            `A product photography session with Esteban starts from ${from} per session. That is a starting price, not a closed figure: the final quote depends on how many products and angles you need, the background or setting, the retouching and how the images will be used. For context, published 2026 South Florida rates run ${usd(m.perImageMin)} to ${usd(m.perImageMax)} per white-background catalog image; those are market rates, not Esteban's price.`,
            `If you would rather send photos you already have for AI-assisted backgrounds or settings, that is a separate service, quoted on its own. ${quoteClose}`,
          ];
    }
    case "photo": {
      const m = PRODUCT_PHOTO_MARKET;
      return es
        ? [
            `No hay un precio fijo publicado para ${e.subject}: Esteban cotiza cada proyecto según la cantidad de imágenes, el uso y si hace falta una sesión. Como referencia, las tarifas publicadas en 2026 en el sur de Florida van de ${usd(m.perImageMin)} a ${usd(m.perImageMax)} por imagen de catálogo con fondo blanco, y una media jornada en Miami cuesta entre ${usd(m.halfDayMin)} y ${usd(m.halfDayMax)} más gastos de producción. Son tarifas del mercado, no un precio de Esteban.`,
            `Para cotizar rápido, di cuántos productos son, cuántas imágenes necesitas de cada uno, en qué fondo o ambiente, y dónde se van a usar: tienda online, web, redes o anuncios. ${quoteClose}`,
          ]
        : [
            `There is no fixed published price for ${e.subject}: Esteban quotes each project by the number of images, how they will be used and whether a session is needed. For context, published 2026 South Florida rates run ${usd(m.perImageMin)} to ${usd(m.perImageMax)} per white-background catalog image, and a half-day in Miami runs ${usd(m.halfDayMin)} to ${usd(m.halfDayMax)} plus production costs. Those are market rates, not Esteban's price.`,
            `For a fast quote, say how many products there are, how many images you need of each, on what background or setting, and where they will be used: an online store, a website, social media or ads. ${quoteClose}`,
          ];
    }
    case "quote":
      return es
        ? [
            `No hay un precio fijo publicado para ${e.subject}. Esteban cotiza cada proyecto según la cantidad de imágenes o piezas, el uso que les vas a dar y si hace falta ir a un lugar, y la cotización llega antes de empezar, sin compromiso. Así el precio corresponde a tu proyecto y no a un paquete que no lo cubre.`,
            `Para recibir la cotización, cuenta qué necesitas, cuántas piezas, para qué fecha y dónde se van a publicar, y adjunta un par de referencias del estilo que buscas. ${quoteClose}`,
          ]
        : [
            `There is no fixed published price for ${e.subject}. Esteban quotes each project by the number of images or pieces, how they will be used and whether he needs to travel to a location, and the quote arrives before any work starts, with no obligation. That way the price matches your project rather than a package that does not fit it.`,
            `To get the quote, say what you need, how many pieces, by what date and where they will be published, and attach a couple of references for the style you want. ${quoteClose}`,
          ];
  }
}

// ---------------------------------------------------------------------------
// Sections.
// ---------------------------------------------------------------------------

export type NicheSection = { id: string; heading: string; paragraphs: string[] };

function inPlace(place: string, locale: NicheLocale): string {
  if (locale === "es") return place === "South Florida" ? "el sur de Florida" : place;
  return place;
}

function whoSection(e: NicheEntry): NicheSection {
  const es = e.locale === "es";
  const pb = PALM_BEACH.has(e.place);
  return es
    ? {
        id: "quien-ayuda",
        heading: `¿Quién me ayuda con ${e.subject} en ${inPlace(e.place, "es")}?`,
        paragraphs: [
          `Esteban Moreno Media. ${e.fact} Detrás está Esteban Moreno, editor de video con base en Fort Lauderdale, Florida, que trabaja a distancia con el material que tú envías y acuerda el trabajo en locación proyecto por proyecto en Miami-Dade y Broward.${pb ? " Los proyectos en Palm Beach County se consideran proyecto por proyecto." : ""}`,
          `El idioma principal de trabajo de Esteban es el español, con inglés intermedio para proyectos bilingües, así que puedes explicar tu proyecto en español. El sitio publica solo trabajo real: el [portafolio](/es/portafolio) muestra proyectos publicados con sus créditos, sin clientes, reseñas ni resultados inventados. Míralo para ver si el estilo encaja y después manda tu material o tu idea con las fechas que necesitas.`,
        ],
      }
    : {
        id: "who-can-help",
        heading: `Who can help me with ${e.subject} in ${inPlace(e.place, "en")}?`,
        paragraphs: [
          `Esteban Moreno Media can. ${e.fact} Behind it is Esteban Moreno, a video editor based in Fort Lauderdale, Florida, who works remotely from the material you send and agrees on-location work project by project in Miami-Dade and Broward.${pb ? " Palm Beach County projects are considered project by project." : ""}`,
          `Esteban's working language is Spanish, with intermediate English for bilingual projects, so you can brief him in either language. The site publishes only real work: the [portfolio](/portfolio) shows published projects with their credits, and it does not invent clients, reviews or results. Look at it to see whether the style fits, then send your footage or your idea with the dates you need.`,
        ],
      };
}

function costSection(e: NicheEntry): NicheSection {
  const es = e.locale === "es";
  return {
    id: es ? "cuanto-cuesta" : "how-much",
    heading: es
      ? `¿Cuánto ${e.plural ? "cuestan" : "cuesta"} ${e.subject} en ${inPlace(e.place, "es")}?`
      : `How much ${e.plural ? "do" : "does"} ${e.subject} cost in ${inPlace(e.place, "en")}?`,
    paragraphs: costParagraphs(e),
  };
}

const waDigits = site.phone.e164.replace(/\D/g, "");

function contactSection(e: NicheEntry): NicheSection {
  const es = e.locale === "es";
  return es
    ? {
        id: "contacto-directo",
        heading: `¿Cómo contacto a Esteban por ${e.subject}?`,
        paragraphs: [
          `Llama o escribe a Esteban Moreno al ${site.phone.display}. El mismo número está en WhatsApp en wa.me/${waDigits}, la forma más rápida de mandar un primer clip. El correo es ${site.email}. Esteban Moreno Media tiene su base en Fort Lauderdale, Florida, y trabaja con clientes en ${areaList(e.place, "es")}. Puedes escribir en español o en inglés.`,
          `Un primer mensaje útil dice tres cosas: qué es tu negocio o tu cuenta, para qué es el trabajo y dónde está el material ahora, en el celular, en una cámara o todavía sin grabar. Si ya tienes clips, incluye el enlace de Drive o Dropbox. Esteban responde con la opción que encaja y una cotización antes de empezar. En la [página de contacto](/es/contacto) también hay un formulario.`,
        ],
      }
    : {
        id: "contact-esteban",
        heading: `How do I contact Esteban about ${e.subject}?`,
        paragraphs: [
          `Call or text Esteban Moreno at ${site.phone.display}. The same number is on WhatsApp at wa.me/${waDigits}, the quickest way to send a first clip. Email goes to ${site.email}. Esteban Moreno Media is based in Fort Lauderdale, Florida, and works with clients in ${areaList(e.place, "en")}. You can write in Spanish or English.`,
          `A useful first message says three things: what the business or account is, what the work is for, and where the footage is now, whether on a phone, a camera or not filmed yet. If you already have clips, include a Drive or Dropbox link. Esteban replies with the option that fits and a quote before any work begins. The [contact page](/contact) also has a form.`,
        ],
      };
}

export function nicheSections(e: NicheEntry): { folded: NicheSection[]; contact: NicheSection } {
  const folded = [whoSection(e)];
  if (e.cost) folded.push(costSection(e));
  return { folded, contact: contactSection(e) };
}

export function nicheWhatsappHref(e: NicheEntry): string {
  return whatsappHref(
    site.phone.e164,
    e.locale === "es" ? `Hola Esteban, quiero preguntar por ${e.subject}.` : `Hi Esteban, I'd like to ask about ${e.subject}.`,
  );
}

// ---------------------------------------------------------------------------
// Structured data. Merged into the page's existing Service node (same @id), or
// appended when the page has none.
// ---------------------------------------------------------------------------

function schemaPlace(name: string) {
  return { "@type": COUNTY_LIKE.has(name) ? "AdministrativeArea" : "City", name };
}

export function nicheServiceFields(e: NicheEntry) {
  const areaServed = nicheAreas(e.place).map(schemaPlace);
  return {
    serviceType: e.subject,
    areaServed,
    availableLanguage: ["Spanish", "English"],
    provider: {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": absoluteUrl("/#business"),
      name: site.name,
      url: absoluteUrl("/"),
      email: site.email,
      telephone: site.phone.e164,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Fort Lauderdale",
        addressRegion: "FL",
        addressCountry: "US",
      },
      areaServed,
    },
  };
}

type JsonNode = Record<string, unknown>;

function isService(node: JsonNode): boolean {
  const t = node["@type"];
  return t === "Service" || (Array.isArray(t) && t.includes("Service"));
}

/**
 * Returns the page's JSON-LD with its Service node carrying the same
 * telephone, areaServed and serviceType the visible answers show. Pages with
 * no registry entry are returned untouched.
 */
export function withNicheService<T extends JsonNode>(path: string, jsonLd: T, name?: string): T {
  return withPageDate(path, withNicheServiceFields(path, jsonLd, name), absoluteUrl(path));
}

function withNicheServiceFields<T extends JsonNode>(path: string, jsonLd: T, name?: string): T {
  const hit = ROWS[path];
  if (!hit) return jsonLd;
  const e = nicheEntry(path, "")!;
  const fields = nicheServiceFields(e);
  const graph = jsonLd["@graph"];
  if (Array.isArray(graph)) {
    let merged = false;
    const next = graph.map((node: JsonNode) => {
      if (!merged && isService(node)) {
        merged = true;
        return { ...node, ...fields };
      }
      return node;
    });
    if (!merged) {
      next.push({ "@type": "Service", "@id": absoluteUrl(`${path}#service`), name: name ?? e.subject, url: absoluteUrl(path), ...fields });
    }
    return { ...jsonLd, "@graph": next };
  }
  if (isService(jsonLd)) return { ...jsonLd, ...fields };
  return {
    "@context": "https://schema.org",
    "@graph": [
      Object.fromEntries(Object.entries(jsonLd).filter(([k]) => k !== "@context")),
      { "@type": "Service", "@id": absoluteUrl(`${path}#service`), name: name ?? e.subject, url: absoluteUrl(path), ...fields },
    ],
  } as unknown as T;
}
