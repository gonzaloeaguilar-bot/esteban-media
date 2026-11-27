import {
  AI_SERVICES,
  ARRANQUE_WEEKLY_OPTIONS,
  ARRANQUE_WEEKLY_TERMS,
  CELEBRATION_FILM_BUNDLES,
  COMMERCIAL_VIDEO_TIERS,
  CREW_RECORDING_RATES,
  EXPANSION_SERVICES,
  FILMING_RATES,
  PACKAGE_PRICES,
  PRICING_BANDS,
  REAL_ESTATE_DRONE_PHOTO_ADD_ON,
  REAL_ESTATE_MEDIA_PRICES,
  REAL_ESTATE_PLANS,
  REAL_ESTATE_PLAN_TERMS,
  REVISION_ROUNDS,
  SHORT_FORM,
  WEDDING_PACKAGES,
  filmingPriceText,
  filmingQuote,
  turnaroundFor,
  usd,
} from "@/lib/pricing";

/**
 * Owner-page FAQs built from the buyer-phrase universe (2026-11-26).
 *
 * Source: 3,204 strong buyer phrases (Google/Bing/DuckDuckGo/YouTube
 * autocomplete, vault evidence/esteban-buyer-phrases-2026-11-26.csv) plus 134
 * AI-commercial phrases read from DuckDuckGo the same day, clustered by meaning
 * into questions (evidence/esteban-faq-clusters-2026-11-26.csv). Each cluster
 * has ONE owner page; this file holds the questions that page did not already
 * answer. Vault page: wiki/esteban-owner-page-faqs-2026-11-26.md.
 *
 * Truth rules, enforced by app/__tests__/owner-page-faqs.test.ts:
 *   - Every price, hour count and turnaround is read from lib/pricing.ts. The
 *     source of this file contains no typed dollar figure.
 *   - The answer comes in the first sentence, and each answer is 100-180 words.
 *   - The 7-day turnaround floor is the owner's answer for per-video edits
 *     (Starter) only; it is never stated for filmed or long-form work.
 *   - Language: Spanish first, intermediate English (owner fact on the site).
 *   - Based in Fort Lauderdale; no other office is claimed.
 *   - No client, review, result or delivery date is invented.
 *
 * AI-commercial cost questions (EN + ES clusters) are held for a follow-up:
 * the owner set a new AI-generated commercial price on 2026-11-26 that lands
 * in lib/pricing.ts on its own branch; those answers must read it from there.
 *
 * Rendering: components/owner-page-faqs.tsx (native <details>, server HTML).
 * Structured data: withOwnerFaqJsonLd() appends the same strings to a page's
 * existing FAQPage node only; a page without one gets none.
 */

export type OwnerPageFaq = {
  /** Stable anchor and analytics id. */
  id: string;
  /** Cluster id in evidence/esteban-faq-clusters-2026-11-26.csv. */
  cluster: string;
  question: string;
  answer: string;
};

export type OwnerPageFaqEntry = {
  locale: "en" | "es";
  faqs: readonly OwnerPageFaq[];
};

const EDIT_FROM = usd(SHORT_FORM.perVideoFrom);
const DAYS = turnaroundFor("arranque").minimumDays;
const HALF = usd(FILMING_RATES.halfDay);
const FULL = usd(FILMING_RATES.fullDay);
const EXTRA = usd(FILMING_RATES.extraHour);
const HALF_H = FILMING_RATES.halfDayHours;
const FULL_H = FILMING_RATES.fullDayHours;
const [WEEK1, WEEK2, WEEK3] = ARRANQUE_WEEKLY_OPTIONS;
const PER_VIDEO_AT_THREE = usd(WEEK3.pricePerWeek / WEEK3.videosPerWeek);
const YT_MIN = usd(PRICING_BANDS.youtube.baseMin);
const YT_MAX = usd(PRICING_BANDS.youtube.baseMax);
const YT_MKT_MIN = usd(PRICING_BANDS.youtube.marketMin);
const YT_MKT_MAX = usd(PRICING_BANDS.youtube.marketMax);
const ONLOC_MKT_MIN = usd(PRICING_BANDS["on-location"].marketMin);
const ONLOC_MKT_MAX = usd(PRICING_BANDS["on-location"].marketMax);
const BASIC = COMMERCIAL_VIDEO_TIERS.basic;
const NARRATIVE = COMMERCIAL_VIDEO_TIERS.brandNarrative;
const ACTORS = COMMERCIAL_VIDEO_TIERS.actorsAndStudio;
const GROWTH = PACKAGE_PRICES.crecimiento.kind === "from" ? usd(PACKAGE_PRICES.crecimiento.amount) : "";
const LOCAL = PACKAGE_PRICES["presencia-local"].kind === "from" ? usd(PACKAGE_PRICES["presencia-local"].amount) : "";
const [RE_ESSENTIAL, RE_PLUS, RE_PREMIUM] = REAL_ESTATE_PLANS;
const PHOTO_TIERS = REAL_ESTATE_MEDIA_PRICES.photoTiers;
const SIX_HOURS = usd(filmingQuote(6));
const TWO = CREW_RECORDING_RATES.twoPerson;
const MULTI = CREW_RECORDING_RATES.multiCamera;

export const OWNER_PAGE_FAQS: Record<string, OwnerPageFaqEntry> = {
  // ---------------------------------------------------------------- EN
  "/services/video-production-fort-lauderdale": {
    locale: "en",
    faqs: [
      {
        id: "video-production-price-list",
        cluster: "en-production-cost",
        question: "Is there a video production price list I can see before I call?",
        answer: `Yes: editing footage you already have starts at ${EDIT_FROM} per finished video, and Esteban Moreno Media publishes the rest of its starting prices so you can budget before the first message. Filming on location is ${filmingPriceText("en")}. A produced commercial is priced in three tiers: a basic founder-led product demo from ${usd(BASIC.from)} (${BASIC.duration}, solo videographer), a brand film from ${usd(NARRATIVE.from)} with a two-person crew, and a spot with professional actors and a studio from ${usd(ACTORS.fromMin)} to ${usd(ACTORS.fromMax)} or more. Monthly content runs from ${GROWTH} a month for the Growth plan and from ${LOCAL} a month for Local Presence, which adds filming. Every figure is a starting point: the written quote follows your scope, footage and deadline. Esteban works from Fort Lauderdale and films across South Florida.`,
      },
    ],
  },
  "/services/hire-remote-video-editor": {
    locale: "en",
    faqs: [
      {
        id: "video-editor-near-me-or-remote",
        cluster: "en-editor-near-me",
        question: "Do I need a video editor near me, or can the editing be done remotely?",
        answer: `Most editing can be remote, from ${EDIT_FROM} per finished video: you upload your original files to a shared folder, and the edit comes back by link with one revision round included. Esteban Moreno Media is based in Fort Lauderdale and edits for businesses in South Florida and elsewhere this way, with a turnaround of at least ${DAYS} days per video that is confirmed in writing. A local editor matters when the project also needs filming: then a shoot is booked separately at ${filmingPriceText("en")}. Extra revision rounds on a short video are ${usd(REVISION_ROUNDS.shortVideo)} each. Esteban works in Spanish first, with intermediate English, so a Spanish brief is the easiest start. If you search for "video editing near me" because you want to meet first, a short call or WhatsApp message covers the same ground.`,
      },
    ],
  },
  "/pricing/starter": {
    locale: "en",
    faqs: [
      {
        id: "editor-per-minute-hour-or-video",
        cluster: "en-editor-cost",
        question: "Does a video editor charge per minute, per hour or per video?",
        answer: `Esteban Moreno Media charges per finished video, not per minute of footage or per hour: one edit starts at ${EDIT_FROM}. Pricing per video means you know the cost before work starts, and slow footage review never turns into a surprise bill. For regular posting there is a weekly plan: ${usd(WEEK1.pricePerWeek)} a week for ${WEEK1.videosPerWeek} video, ${usd(WEEK2.pricePerWeek)} for ${WEEK2.videosPerWeek} or ${usd(WEEK3.pricePerWeek)} for ${WEEK3.videosPerWeek}, which works out to ${PER_VIDEO_AT_THREE} per video at three a week, with a ${ARRANQUE_WEEKLY_TERMS.minimumWeeks}-week minimum. On the weekly plan each video runs up to ${ARRANQUE_WEEKLY_TERMS.maxVideoSeconds} seconds from up to ${ARRANQUE_WEEKLY_TERMS.maxFootageMinutes} minutes of footage. A single edit includes one revision round; another round on a short video is ${usd(REVISION_ROUNDS.shortVideo)}. Turnaround is at least ${DAYS} days per video. Long-form work such as a YouTube episode is quoted separately because the footage is longer.`,
      },
    ],
  },
  "/services/videographer-miami": {
    locale: "en",
    faqs: [
      {
        id: "average-videographer-rate-south-florida",
        cluster: "en-videographer-cost",
        question: "What is the average rate for a videographer in South Florida?",
        answer: `Published half-day rates for a solo videographer in South Florida sit roughly between ${ONLOC_MKT_MIN} and ${ONLOC_MKT_MAX}, and Esteban Moreno Media charges ${HALF} for a half day (up to ${HALF_H} hours of filming), ${FULL} for a full day (up to ${FULL_H} hours) and ${EXTRA} for each extra hour. That rate is filming only, with one videographer and a 4K camera kit with audio. Editing is priced on its own, from ${EDIT_FROM} per short finished video, so you can film once and decide later how many pieces to cut. Hours are counted in blocks: a ${HALF_H}-hour shoot is the half day, and six hours costs ${SIX_HOURS}, because extra hours are added until the full-day rate caps it. Hourly rates in listings often hide a minimum or exclude audio, so compare the total for your hours. Esteban is based in Fort Lauderdale and films across South Florida.`,
      },
    ],
  },
  "/services/small-business-video-production-miami": {
    locale: "en",
    faqs: [
      {
        id: "small-business-marketing-video-cost",
        cluster: "en-business-video",
        question: "How much does a marketing video for a small business cost?",
        answer: `A short marketing video for a small business starts at ${EDIT_FROM} when you already have the footage, because Esteban Moreno Media prices editing per finished video. If you want to post every week, the weekly plan is ${usd(WEEK1.pricePerWeek)} a week for one video up to ${usd(WEEK3.pricePerWeek)} for three. When someone needs to film, a half day on location is ${HALF} (up to ${HALF_H} hours) and a full day is ${FULL}; one shoot usually feeds several short videos. For a business that wants content handled every month, the Growth plan starts at ${GROWTH} a month (content plan, calendar, editing and a monthly report) and Local Presence starts at ${LOCAL} a month with filming. A testimonial or customer-story video follows the same lines: filming plus editing. Every figure is a starting point, and the written quote follows your scope. Esteban works from Fort Lauderdale, in Spanish first and intermediate English.`,
      },
    ],
  },
  "/services/brand-video-production-miami": {
    locale: "en",
    faqs: [
      {
        id: "commercial-promo-video-cost",
        cluster: "en-commercial",
        question: "How much does a commercial or promo video cost to produce?",
        answer: `A produced commercial starts at ${usd(BASIC.from)} for a basic founder-led product demo of ${BASIC.duration}, filmed by a solo videographer at your location with ${BASIC.revisions} revision round. A brand film with a two-person crew, up to two minutes and three short ad hook variations, starts at ${usd(NARRATIVE.from)} with ${NARRATIVE.revisions} revision rounds. A commercial spot with professional actors, studio rental, styling and a custom sound mix starts at ${usd(ACTORS.fromMin)} to ${usd(ACTORS.fromMax)} or more, depending on casting and usage rights. These tiers cover filming and editing together. If you already have footage and only need a brand video cut from it, the editing-only path is priced separately, with short cuts from ${EDIT_FROM} per video. Every price is a starting point and the written quote follows your scope. Esteban Moreno Media is based in Fort Lauderdale and works in Spanish first, with intermediate English.`,
      },
    ],
  },
  "/services/youtube-long-form-video-editing": {
    locale: "en",
    faqs: [
      {
        id: "youtube-editor-cost-per-video",
        cluster: "en-youtube",
        question: "How much does a YouTube video editor cost per video?",
        answer: `A scoped long-form YouTube edit from Esteban Moreno Media is estimated at ${YT_MIN}–${YT_MAX} per video, against a published market range of about ${YT_MKT_MIN}–${YT_MKT_MAX} per YouTube edit. Where an episode lands in that range depends on its length, how much raw footage there is, and how much graphics, sound cleanup and pacing work it needs. Shorts cut from the same episode are priced like any short edit, from ${EDIT_FROM} per video, so one recording can become an episode plus several Shorts. The range is a planning estimate, not a quote: send one sample episode and the written quote follows. Editing is remote, so the channel does not need to be in South Florida; you upload the original files to a shared folder. Esteban works in Spanish first, with intermediate English, which suits Spanish-language and bilingual channels.`,
      },
    ],
  },
  "/pricing/real-estate": {
    locale: "en",
    faqs: [
      {
        id: "real-estate-video-cost-per-listing",
        cluster: "en-real-estate",
        question: "How much does real estate video cost per listing?",
        answer: `A premium listing video costs ${usd(REAL_ESTATE_MEDIA_PRICES.premiumListingVideoPerMinute)} per finished minute, and listing photos are priced by home size, from ${usd(PHOTO_TIERS[0])} for up to 1,500 square feet to ${usd(PHOTO_TIERS[PHOTO_TIERS.length - 1])} for 6,001 to 8,000 square feet. Common add-ons are drone photos for ${usd(REAL_ESTATE_DRONE_PHOTO_ADD_ON)} and a Zillow 3D tour from ${usd(REAL_ESTATE_MEDIA_PRICES.zillow3dTourFrom)}. Listings outside the usual service area carry a ${usd(REAL_ESTATE_MEDIA_PRICES.outOfAreaFee)} travel fee, and a reshoot is ${usd(REAL_ESTATE_MEDIA_PRICES.reshootFee)}. If you only need Reels cut from clips you filmed on your phone, remote editing starts at ${EDIT_FROM} per video. Agents who list every month usually compare these per-listing prices with the monthly plans in the next answer. Esteban Moreno Media is based in Fort Lauderdale and shoots across South Florida.`,
      },
      {
        id: "real-estate-monthly-video-plan",
        cluster: "en-real-estate",
        question: "Is there a monthly video plan for real estate agents?",
        answer: `Yes: three monthly plans start at ${usd(RE_ESSENTIAL.price)} a month, and each one covers filming, editing and posting for a set number of properties. Essential is ${usd(RE_ESSENTIAL.price)} a month for ${RE_ESSENTIAL.properties} property, ${RE_ESSENTIAL.productionDays} production days and ${RE_ESSENTIAL.postsPerWeek} posts a week. Plus is ${usd(RE_PLUS.price)} a month for ${RE_PLUS.properties} properties, ${RE_PLUS.productionDays} production days and ${RE_PLUS.postsPerWeek} posts a week. Premium is ${usd(RE_PREMIUM.price)} a month for ${RE_PREMIUM.properties} properties with drone photography included and ${RE_PREMIUM.postsPerWeek} posts a week; on the smaller plans drone photos are a ${usd(REAL_ESTATE_DRONE_PHOTO_ADD_ON)} add-on. Each property is up to 3,000 square feet. Plans run for at least ${REAL_ESTATE_PLAN_TERMS.minimumMonths} months, include a results report every ${REAL_ESTATE_PLAN_TERMS.reportEveryDays} days, and cancel with ${REAL_ESTATE_PLAN_TERMS.cancelNoticeDays} days' notice.`,
      },
    ],
  },
  "/services/wedding-videographer-miami": {
    locale: "en",
    faqs: [
      {
        id: "wedding-videographer-cost-miami",
        cluster: "en-wedding-hire",
        question: "How much does a wedding videographer cost in Miami?",
        answer: `Wedding films from Esteban Moreno Media start at ${usd(WEDDING_PACKAGES.halfDayFrom)} for the Half Day package and ${usd(WEDDING_PACKAGES.fullDayFrom)} for the Full Day package, and wedding content creation for social media starts at ${usd(WEDDING_PACKAGES.contentCreationFrom)}. A ${WEDDING_PACKAGES.depositPercent}% deposit holds the date. Within those starting points, the quote moves with coverage hours, whether the ceremony and reception are at one venue or two, and the deliverables you want: a highlight film, a full ceremony edit, or vertical clips for Instagram and TikTok. A film and social content can be combined in one booking. If another videographer already filmed your wedding, editing that footage is quoted on its own, with short clips from ${EDIT_FROM} each. The packages focus on Miami and Fort Lauderdale, and travel elsewhere is confirmed in writing before booking. Esteban works in Spanish first, with intermediate English, which suits Spanish-speaking and bilingual families.`,
      },
    ],
  },
  "/services/product-demo-video-production-miami": {
    locale: "en",
    faqs: [
      {
        id: "product-demo-video-cost",
        cluster: "en-product-video",
        question: "How much does a product demo video cost?",
        answer: `A basic product demo video starts at ${usd(BASIC.from)}: ${BASIC.duration} long, filmed by a solo videographer at your location, founder-led, with ${BASIC.revisions} revision round. When the product needs a fuller story, a brand film with a two-person crew starts at ${usd(NARRATIVE.from)} and includes three short ad hook variations for testing. A narrated version can add an AI voiceover at ${usd(AI_SERVICES.voiceoverPerVideo)} per video, disclosed in the delivery note. If you already filmed the product yourself, for example an unboxing on a phone, editing starts at ${EDIT_FROM} per finished short video instead. The difference between the two is who films and how many angles are needed: assembly steps and close-ups usually need the shoot. Every price is a starting point and the written quote follows the product count and formats. Esteban Moreno Media is based in Fort Lauderdale and films across South Florida.`,
      },
    ],
  },
  "/services/music-video-post-production-miami": {
    locale: "en",
    faqs: [
      {
        id: "music-video-film-and-edit",
        cluster: "en-music-video",
        question: "Can you film the music video too, or only edit it?",
        answer: `Both: Esteban Moreno Media can film the music video from ${HALF} for a half day and edit it, and the two are priced separately so you only pay for what you need. Filming is ${filmingPriceText("en")}; most performance videos fit in a half day of up to ${HALF_H} hours. For the edit (syncing takes to the master track, colour and pacing), the site's budget calculator puts a full-length video in its long-form band of ${YT_MIN}–${YT_MAX} per long-form edit, an estimate rather than a quote, and vertical clips for Reels, TikTok and Shorts cut from the same footage start at ${EDIT_FROM} each. If a friend or another crew already filmed it, there is no filming line at all: share the files and the song, and the quote covers the edit only. Esteban is based in Fort Lauderdale, films across South Florida, and works in Spanish first, with intermediate English.`,
      },
    ],
  },
  "/services/corporate-event-videographer-miami": {
    locale: "en",
    faqs: [
      {
        id: "event-crew-size-and-cameras",
        cluster: "en-event",
        question: "Do you bring a second shooter or multiple cameras for bigger events?",
        answer: `Yes: an event can be filmed by one videographer from ${HALF}, a two-person crew, or a multi-camera setup, and each has a published starting rate. One videographer with a 4K camera kit and audio is ${HALF} for a half day and ${FULL} for a full day. A two-person crew, a lead camera plus a mobile creator filming vertical clips, behind-the-scenes and attendee soundbites, is ${usd(TWO.halfDay)} for a half day and ${usd(TWO.fullDay)} for a full day. A multi-camera setup with two or three cameras and a soundboard audio feed for stage talks is ${usd(MULTI.halfDay)} for a half day and ${usd(MULTI.fullDay)} for a full day. Each crew rate has a ${TWO.minimumHours}-hour minimum. These rates cover filming; the recap edit and short clips are quoted on top, with short clips from ${EDIT_FROM} each. Esteban Moreno Media is based in Fort Lauderdale.`,
      },
    ],
  },
  "/services/content-day-videographer-miami": {
    locale: "en",
    faqs: [
      {
        id: "social-media-videographer-cost",
        cluster: "en-social-videographer",
        question: "How much does a social media videographer cost for a content day?",
        answer: `A content day costs ${HALF} for a half day of filming (up to ${HALF_H} hours) or ${FULL} for a full day (up to ${FULL_H} hours), plus the editing of each finished video. Editing is priced per video, from ${EDIT_FROM}, so a half-day shoot that becomes eight short videos is the filming fee plus eight edits. If you would rather spread the edits across weeks, the weekly plan is ${usd(WEEK1.pricePerWeek)} a week for one video, ${usd(WEEK2.pricePerWeek)} for two or ${usd(WEEK3.pricePerWeek)} for three, with each video up to ${ARRANQUE_WEEKLY_TERMS.maxVideoSeconds} seconds. Extra hours on the day are ${EXTRA} each. Every figure is a starting point, and the written quote confirms the shot list and the number of edits. Esteban Moreno Media is based in Fort Lauderdale, films across South Florida, and directs the day in Spanish first, with intermediate English.`,
      },
    ],
  },
  "/services/ugc-video-editor-ecommerce": {
    locale: "en",
    faqs: [
      {
        id: "ai-ugc-ads-or-real-creators",
        cluster: "en-ugc-ads",
        question: "Do you make AI UGC ads, or only edit real creator footage?",
        answer: `The UGC ads are edited from real creator footage, with AI used only to assist: a pack of five UGC ad edits is ${usd(EXPANSION_SERVICES.ugcAdPack5)}, and AI add-ons are priced per video. An AI voiceover is ${usd(AI_SERVICES.voiceoverPerVideo)} and generated b-roll is ${usd(AI_SERVICES.bRollPerVideo)} per video, and both are named in the delivery note so the brand can apply the platform's AI label honestly. What AI does not do here is invent the product: the label, texture, size and result shown on screen come from the footage the creator filmed. A single short ad edit starts at ${EDIT_FROM}, and extra revision rounds are ${usd(REVISION_ROUNDS.shortVideo)} each. If a brand needs footage filmed first, a half day on location is ${HALF}. Esteban Moreno Media is based in Fort Lauderdale and edits remotely for ecommerce brands, in Spanish first and intermediate English.`,
      },
    ],
  },
  "/services/private-party-videographer-south-florida": {
    locale: "en",
    faqs: [
      {
        id: "birthday-party-videographer-cost",
        cluster: "en-party",
        question: "How much does a videographer cost for a birthday or private party?",
        answer: `A finished film of a birthday or private party starts at ${usd(CELEBRATION_FILM_BUNDLES.halfDay)} for up to ${HALF_H} hours, including filming, editing and a shareable delivery. A full day of up to ${FULL_H} hours starts at ${usd(CELEBRATION_FILM_BUNDLES.fullDay)}, and a two-person production for fuller coverage starts at ${usd(CELEBRATION_FILM_BUNDLES.twoPersonFullDay)}. A yacht party film starts at ${usd(CELEBRATION_FILM_BUNDLES.yachtHalfDay)} for a half day. These are finished films, not hourly camera rentals: the price covers the consultation, the coverage and the edited highlight. If you only want the raw footage, filming alone is ${filmingPriceText("en")}, and short clips can be edited later from ${EDIT_FROM} each. Travel and any extra deliverables are confirmed in writing before booking. Esteban Moreno Media is based in Fort Lauderdale and films celebrations across South Florida; Esteban works in Spanish first, with intermediate English.`,
      },
    ],
  },

  // ---------------------------------------------------------------- ES
  "/es/guias/cuanto-cuesta-un-editor-de-videos-cortos": {
    locale: "es",
    faqs: [
      {
        id: "editor-cobra-por-minuto-hora-o-video",
        cluster: "es-editor-cost",
        question: "¿Un editor de video cobra por minuto, por hora o por video?",
        answer: `Esteban Moreno Media cobra por video terminado, no por minuto de material ni por hora: una edición empieza en ${EDIT_FROM}. Cobrar por video te deja saber el costo antes de empezar, y revisar material lento nunca se convierte en una factura sorpresa. Para publicar seguido existe el plan semanal: ${usd(WEEK1.pricePerWeek)} por semana por ${WEEK1.videosPerWeek} video, ${usd(WEEK2.pricePerWeek)} por ${WEEK2.videosPerWeek} o ${usd(WEEK3.pricePerWeek)} por ${WEEK3.videosPerWeek}, es decir ${PER_VIDEO_AT_THREE} por video con tres a la semana, con un mínimo de ${ARRANQUE_WEEKLY_TERMS.minimumWeeks} semanas. En el plan semanal cada video dura hasta ${ARRANQUE_WEEKLY_TERMS.maxVideoSeconds} segundos y se edita a partir de hasta ${ARRANQUE_WEEKLY_TERMS.maxFootageMinutes} minutos de material. Una edición incluye una ronda de cambios; otra ronda en un video corto cuesta ${usd(REVISION_ROUNDS.shortVideo)}. El plazo es de al menos ${DAYS} días por video. Los videos largos, como un episodio de YouTube, se cotizan aparte.`,
      },
    ],
  },
  "/es/servicio-de-edicion-de-video-para-youtube-miami": {
    locale: "es",
    faqs: [
      {
        id: "contratar-editor-youtube-en-espanol",
        cluster: "es-youtube",
        question: "¿Cómo contrato a un editor de videos para YouTube que trabaje en español?",
        answer: `Se contrata a distancia, con episodios largos estimados entre ${YT_MIN} y ${YT_MAX}: subes los archivos originales a una carpeta compartida, envías un episodio de muestra y recibes una cotización por escrito antes de empezar. Esteban trabaja primero en español, con inglés intermedio, así que el guion, los comentarios y las revisiones pueden ir completos en español. El precio de cada episodio depende de la duración, la cantidad de material y el trabajo de gráficos y sonido; como referencia, el mercado publicado va de ${YT_MKT_MIN} a ${YT_MKT_MAX} por edición. Los Shorts que salen del mismo episodio cuestan desde ${EDIT_FROM} por video, así que una grabación puede convertirse en un episodio y varios cortos. El canal no tiene que estar en el sur de Florida: Esteban Moreno Media está en Fort Lauderdale y edita a distancia para creadores fuera del sur de Florida. Si además hace falta grabar, medio día en locación cuesta ${HALF}.`,
      },
    ],
  },
  "/es/postproduccion-de-videos-musicales-miami": {
    locale: "es",
    faqs: [
      {
        id: "cuanto-cuesta-grabar-video-musical",
        cluster: "es-music-video",
        question: "¿Cuánto cuesta grabar un video musical, no solo editarlo?",
        answer: `Grabar un video musical cuesta ${filmingPriceText("es")}; la mayoría de los videos de interpretación caben en medio día de hasta ${HALF_H} horas. La edición se cobra aparte: para sincronizar las tomas con la pista master, el color y el ritmo, la calculadora de presupuesto del sitio ubica un video completo en su rango de video largo, de ${YT_MIN} a ${YT_MAX} por edición, como estimado y no como cotización, y los clips verticales para Reels, TikTok y Shorts que salen del mismo material empiezan en ${EDIT_FROM} cada uno. Si un amigo u otro equipo ya grabó el video, no hay línea de grabación: compartes los archivos y la canción, y la cotización cubre solo la edición. Las locaciones se confirman por escrito antes de reservar la fecha. Esteban Moreno Media está en Fort Lauderdale, graba en todo el sur de Florida y trabaja primero en español, con inglés intermedio, así que el artista puede dirigir todo en su idioma.`,
      },
    ],
  },
  "/es/produccion-de-video-fort-lauderdale": {
    locale: "es",
    faqs: [
      {
        id: "cuanto-cuesta-video-promocional-publicitario",
        cluster: "es-commercial",
        question: "¿Cuánto cuesta hacer un video promocional o publicitario?",
        answer: `Un video promocional producido empieza en ${usd(BASIC.from)} para un demo básico de producto de ${BASIC.duration.replace("seconds", "segundos")}, grabado por un videógrafo en tu local, con ${BASIC.revisions} ronda de cambios. Un video de marca con un equipo de dos personas, de hasta dos minutos y con tres variaciones cortas para anuncios, empieza en ${usd(NARRATIVE.from)}. Un comercial con actores profesionales, renta de estudio y mezcla de sonido a la medida va desde ${usd(ACTORS.fromMin)} hasta ${usd(ACTORS.fromMax)} o más, según el casting y los derechos de uso. Estos precios incluyen grabación y edición. Si ya tienes el material y solo necesitas editarlo, cada video corto empieza en ${EDIT_FROM}. Todos los precios son puntos de partida y la cotización por escrito sigue tu alcance. Esteban Moreno Media trabaja desde Fort Lauderdale, graba en todo el sur de Florida y atiende primero en español.`,
      },
    ],
  },
  "/es/guias/cuanto-cuesta-la-produccion-de-video-en-fort-lauderdale": {
    locale: "es",
    faqs: [
      {
        id: "cuanto-cobra-videografo-medio-dia-fort-lauderdale",
        cluster: "es-production-cost",
        question: "¿Cuánto cobra un videógrafo por medio día o por día completo en Fort Lauderdale?",
        answer: `Esteban Moreno Media cobra ${HALF} por medio día de grabación (hasta ${HALF_H} horas), ${FULL} por día completo (hasta ${FULL_H} horas) y ${EXTRA} por cada hora adicional. La tarifa es solo de grabación, con un videógrafo y equipo 4K con audio; la edición se cobra aparte, desde ${EDIT_FROM} por video corto terminado. Las horas se cuentan por bloques: una grabación de ${HALF_H} horas es medio día, y una de seis horas cuesta ${SIX_HOURS}, porque se suman horas adicionales hasta que la tarifa de día completo pone el tope. En el mercado del sur de Florida, el medio día publicado de un videógrafo va de ${ONLOC_MKT_MIN} a ${ONLOC_MKT_MAX}. Si el evento necesita más cobertura, un equipo de dos personas cuesta ${usd(TWO.halfDay)} el medio día. Esteban trabaja desde Fort Lauderdale y graba en todo el sur de Florida, primero en español.`,
      },
    ],
  },
};

/** The FAQs a page owns, or an empty list. Trailing slashes are ignored. */
export function ownerPageFaqs(path: string): readonly OwnerPageFaq[] {
  const key = path.length > 1 ? path.replace(/\/+$/, "") : path;
  return OWNER_PAGE_FAQS[key]?.faqs ?? [];
}

type FaqLike = { question: string; answer: string };

/** Page FAQs plus the owner FAQs, de-duplicated by question text. */
export function withOwnerPageFaqs<T extends FaqLike>(path: string, faqs: readonly T[]): FaqLike[] {
  const seen = new Set(faqs.map((faq) => faq.question.trim().toLowerCase()));
  const extra = ownerPageFaqs(path).filter((faq) => !seen.has(faq.question.trim().toLowerCase()));
  return [...faqs, ...extra.map(({ question, answer }) => ({ question, answer }))];
}

/** Plain text of an answer as it reads on the page (markdown links reduced to their label). */
function answerText(answer: string): string {
  return answer.replace(/\[([^\]]+)\]\([^)]+\)/g, (_m, label: string) => label);
}

type JsonNode = Record<string, unknown>;

/**
 * Appends this page's owner FAQs to the FAQPage node already present in a
 * JSON-LD object (a node, an array, or an object with @graph). A page with no
 * FAQPage node is returned unchanged: the questions stay visible-only there.
 */
export function withOwnerFaqJsonLd<T>(jsonLd: T, path: string): T {
  const faqs = ownerPageFaqs(path);
  if (faqs.length === 0) return jsonLd;

  const extend = (node: unknown): unknown => {
    if (Array.isArray(node)) return node.map(extend);
    if (!node || typeof node !== "object") return node;
    const obj = node as JsonNode;
    if (Array.isArray(obj["@graph"])) return { ...obj, "@graph": (obj["@graph"] as unknown[]).map(extend) };
    const type = obj["@type"];
    const isFaqPage = type === "FAQPage" || (Array.isArray(type) && type.includes("FAQPage"));
    if (!isFaqPage) return node;
    const existing = Array.isArray(obj.mainEntity) ? (obj.mainEntity as JsonNode[]) : [];
    const names = new Set(existing.map((q) => String(q.name ?? "").trim().toLowerCase()));
    const added = faqs
      .filter((faq) => !names.has(faq.question.trim().toLowerCase()))
      .map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: answerText(faq.answer) },
      }));
    return { ...obj, mainEntity: [...existing, ...added] };
  };

  return extend(jsonLd) as T;
}
