// Answers built from the owner facts relayed from Esteban on
// 2026-10-14 (vault: client-esteban-media/wiki/esteban-owner-facts-2026-10-14).
// Those facts are the ONLY new claims here:
//   - he films and edits vlogs;
//   - he wants Latin American clients, working remotely;
//   - editing is priced per video (from SHORT_FORM.perVideoFrom), not per hour;
//   - web, landing pages and chatbots are a service line to market, described
//     only with facts the portfolio pages already publish.
// Not given, so never written: an hourly editing rate, travel, overtime, a
// payment method, turnaround. Every figure is read from lib/pricing.ts.
//
// Shape: one question-shaped H2 per section, answer in the first sentence,
// optional depth behind a native <details> (server-rendered, so crawlers that
// run no JavaScript still read it).

import { priceSentence } from "@/lib/packages";
import { CHATBOT_PRICE, COMMERCIAL_VIDEO_TIERS, CREW_RECORDING_RATES, LANDING_PAGE_PRICE, SHORT_FORM, TURNKEY_PRODUCTION_BUNDLES, YACHT_PRODUCTION, filmingHourlyText, landingPagePriceText, usd } from "@/lib/pricing";
import { DEMAND_MAP_ANSWERS } from "@/lib/demand-map-answers";

export type OwnerFactSection = {
  id: string;
  heading: string;
  paragraphs: readonly string[];
  details?: { summary: string; paragraphs: readonly string[] };
};

const perVideo = usd(SHORT_FORM.perVideoFrom);
const enLocal = () => priceSentence("en", "presencia-local").toLowerCase();
const esLocal = () => priceSentence("es", "presencia-local").toLowerCase();

// ---------------------------------------------------------------------------
// Vlogs (row 35: "doral vlog videography" 11 impressions at 47.5 on the Doral
// production page, GSC 2026-07-16..10-13).
// ---------------------------------------------------------------------------

const VLOG_EN_DORAL: OwnerFactSection = {
  id: "vlogs",
  heading: "Do you film and edit vlogs in Doral and Miami?",
  paragraphs: [
    `Yes. Esteban Moreno films and edits vlogs. If you already record your own vlog on a phone or a camera, send the original files and he edits them remotely: he cuts the dead time, keeps your voice and the story in order, and adds captions, music and a title for YouTube, Instagram or TikTok. Editing is priced per video, from ${perVideo} on the Starter package, so you know the price before the edit starts; a long vlog is quoted by its length and what it needs.`,
    `If you want him behind the camera, filming in Doral or anywhere else in Miami-Dade is on-location work scoped per project: filming is ${filmingHourlyText("en")}, a full production day is the Local Presence package, ${enLocal()}, and the written quote sets the location, the hours and what you get back before the date. You can brief him in Spanish or English.`,
  ],
};

const VLOG_EN_CREATOR: OwnerFactSection = {
  id: "vlogs",
  heading: "Do you film and edit vlogs?",
  paragraphs: [
    `Yes. Esteban Moreno films and edits vlogs as well as short vertical posts. Most creators record the vlog themselves and send the original files; he edits remotely, cutting the pauses and restarts, keeping the story in the order you lived it, and adding captions, music and a title. The same footage can also give you short clips for Reels, TikTok and Shorts, so one vlog feeds the rest of the week.`,
    `Editing is priced per video, from ${perVideo} on the Starter package, so the price is fixed before the edit starts; a long vlog is quoted by its length and what it needs. If you would rather have him film, on-location work in Miami-Dade or Broward is scoped per project: filming is ${filmingHourlyText("en")}, and a full production day is the Local Presence package, ${enLocal()}.`,
  ],
};

const VLOG_ES_DORAL: OwnerFactSection = {
  id: "vlogs",
  heading: "¿Grabas y editas vlogs en Doral y Miami?",
  paragraphs: [
    `Sí. Esteban Moreno graba y edita vlogs. Si ya grabas tu vlog con el celular o con una cámara, envía los archivos originales y él lo edita a distancia: quita los tiempos muertos, mantiene tu voz y el orden de la historia, y agrega subtítulos, música y un título para YouTube, Instagram o TikTok. La edición se cobra por video, desde ${perVideo} con el paquete Arranque, así que sabes el precio antes de empezar; un vlog largo se cotiza según su duración y lo que necesita.`,
    `Si prefieres que él grabe, la grabación en Doral o en cualquier parte de Miami-Dade es trabajo en locación que se define por proyecto: la grabación va ${filmingHourlyText("es")}, un día completo de producción es el paquete Presencia Local, ${esLocal()}, y la cotización por escrito fija el lugar, las horas y lo que recibes antes de la fecha. Puedes explicar tu proyecto en español.`,
  ],
};

const VLOG_ES_CREATOR: OwnerFactSection = {
  id: "vlogs",
  heading: "¿Grabas y editas vlogs?",
  paragraphs: [
    `Sí. Esteban Moreno graba y edita vlogs, además de videos cortos verticales. La mayoría de los creadores graba el vlog por su cuenta y envía los archivos originales; él edita a distancia, quita pausas y repeticiones, mantiene la historia en el orden en que la viviste y agrega subtítulos, música y un título. Del mismo material salen también clips cortos para Reels, TikTok y Shorts, así un vlog alimenta el resto de la semana.`,
    `La edición se cobra por video, desde ${perVideo} con el paquete Arranque, así que el precio queda fijo antes de empezar; un vlog largo se cotiza según su duración y lo que necesita. Si prefieres que él grabe, el trabajo en locación en Miami-Dade o Broward se define por proyecto: la grabación va ${filmingHourlyText("es")}, y un día completo de producción es el paquete Presencia Local, ${esLocal()}.`,
  ],
};

// ---------------------------------------------------------------------------
// Latin American clients (rows 10 and 16: Spanish product-photo and editing
// queries from outside the US, e.g. autocomplete "cuanto cobra un editor de
// video por hora en colombia / argentina").
// ---------------------------------------------------------------------------

const LATAM_HEADING = "¿Trabajas con clientes en Latinoamérica?";

const latamCore = `Sí. Esteban Moreno trabaja a distancia con clientes de Latinoamérica, y el español es su idioma principal de trabajo, así que todo el proyecto se habla en español, desde la primera consulta hasta la última corrección. Tú envías el material por internet, con un enlace de Google Drive o Dropbox, y recibes los archivos terminados de la misma forma, sin envíos físicos ni reuniones en persona.`;

const latamPrices = `Los precios están en dólares estadounidenses (USD): editar un video cuesta desde ${perVideo} con el paquete Arranque, y cada proyecto recibe una cotización por escrito antes de empezar, así sabes el total desde el principio.`;

const LATAM_ES_EDITING: OwnerFactSection = {
  id: "latinoamerica",
  heading: LATAM_HEADING,
  paragraphs: [
    latamCore,
    `${latamPrices} La edición es el servicio que mejor funciona a distancia: Reels, TikTok, Shorts, videos para YouTube o para la web, editados con los clips que ya grabaste. Lo único que necesita estar en el mismo lugar que Esteban es la grabación en persona, que se define por proyecto en Miami-Dade y Broward.`,
  ],
};

const LATAM_ES_PRODUCT_PHOTO: OwnerFactSection = {
  id: "latinoamerica",
  heading: LATAM_HEADING,
  paragraphs: [
    latamCore,
    `${latamPrices} Una sesión de fotos necesita tener el producto frente a la cámara, así que desde otro país lo que funciona a distancia son las [imágenes de producto con IA](/es/fotografia-de-producto-con-ia-miami) hechas a partir de tus propias fotos, que se cotizan según la cantidad de imágenes y su uso, y la edición de video de tus clips.`,
  ],
};

const LATAM_ES_AI_PHOTO: OwnerFactSection = {
  id: "latinoamerica",
  heading: LATAM_HEADING,
  paragraphs: [
    latamCore,
    `Los precios están en dólares estadounidenses (USD), y cada proyecto recibe una cotización por escrito antes de empezar, según la cantidad de imágenes y su uso. Las imágenes con IA se hacen a partir de las fotos que tú envías, así que funcionan bien a distancia; una sesión de fotos en persona, en cambio, necesita tener el producto frente a la cámara. Si además necesitas video, editar un video cuesta desde ${perVideo} con el paquete Arranque.`,
  ],
};

// ---------------------------------------------------------------------------
// Web, landing pages and chatbots (row 75 decision: keep in the portfolio and
// market as a service line). Facts only from the five portfolio pages
// (messages/*.json Portfolio.items) and lib/growth-systems.ts descriptions.
// ---------------------------------------------------------------------------

const WEB_EN: readonly OwnerFactSection[] = [
  {
    id: "web-chatbots-answer",
    heading: "Do you build websites, landing pages and chatbots for small businesses?",
    paragraphs: [
      "Yes. Besides video, Esteban Moreno Media designs websites, landing pages and AI chatbots for local businesses, and the portfolio publishes five of these projects. [TitanForge](/portfolio/titanforge) has a web platform and an AI DM bot that handles lead qualification, booking and client intake in the chat. [Gains From Geebs](/portfolio/gains-from-geebs) is a fitness web app with interactive calculators and an Instagram DM chatbot that answers coaching questions and qualifies leads. [Frontline Auto](/portfolio/front-line-auto), a repair shop, has a website with an AI service concierge for repair scheduling, service quotes and intake in English and Spanish.",
      "[Fort Lauderdale Auto Sale](/portfolio/flas-concierge), a Buy-Here-Pay-Here dealership, has a website with financing pre-qualification, live inventory and an AI concierge for lead capture. The fifth project, [AI lead chatbots](/portfolio/ai-lead-automation), documents two of those bots side by side: Geebs on Instagram and FLAS on the website. Each web project is quoted per project from its scope.",
    ],
  },
  {
    id: "web-which-service",
    heading: "Which web service fits my business?",
    paragraphs: [
      "Start from the problem you want solved. If people cannot find a clear offer or a way to ask, a [conversion website](/services/conversion-websites) is the base: custom mobile-first pages and focused landing pages built around one offer and a measurable inquiry path. If inquiries arrive but nobody answers fast enough, [AI lead capture and automation](/services/ai-lead-capture-automation) adds chatbots, ManyChat DM flows, email, SMS and handoff rules so a qualified inquiry reaches the right next step.",
      "If customers search for you and find nothing, [local presence and SEO](/services/local-presence-seo) connects Google Business Profile, Maps and technical SEO. When you are not sure where leads are lost, the [growth funnel audit](/services/growth-funnel-audit) looks at acquisition paths, analytics and handoffs first. You can explain the project in Spanish or English.",
      `If you only need one piece: an [AI chatbot for small business](/services/ai-chatbot-for-small-business) answers questions on your site or in Instagram DMs, from ${usd(CHATBOT_PRICE.from)} plus a monthly fee; a [landing page](/services/landing-page-design) gives one ad one page and one action, from ${usd(LANDING_PAGE_PRICE.from)}.`,
    ],
  },
  {
    id: "web-designer-cost",
    heading: "How much does a web designer charge for a small business site?",
    paragraphs: [
      `${landingPagePriceText("en")} Full websites have no published price and are quoted per project. The quote follows the scope: how many pages, whether the copy and photos already exist, one language or two, and what the forms and any chatbot have to do after someone writes. The All-In package is the one that bundles a conversion website, an AI chatbot and lead capture, the local profile and content, and it is also quoted per project.`,
      "If you need only one page for an ad or your Instagram bio, the [landing page](/services/landing-page-design) page explains what moves that quote. Video for the site is priced separately: editing is per video, not per hour.",
    ],
  },
  {
    id: "web-design-examples",
    heading: "Where can I see examples of websites Esteban Moreno Media has designed?",
    paragraphs: [
      "In the portfolio, one page per project. [Fort Lauderdale Auto Sale](/portfolio/flas-concierge) is a dealership site with a financing calculator suite, inventory filtering and an AI concierge; the [FLAS case study](/case-studies/flas-concierge) explains how it was built, from the mobile-first inventory cards to the hand-off to the sales team. [Frontline Auto](/portfolio/front-line-auto) is a repair shop site with service booking and bilingual intake. [Gains From Geebs](/portfolio/gains-from-geebs) is a fitness web app with interactive calculators, and [TitanForge](/portfolio/titanforge) is a web platform with client intake and booking.",
      "Each of those sites also runs a chatbot; the [AI chatbot for small business](/services/ai-chatbot-for-small-business) page explains what those bots do.",
    ],
  },
];

const WEB_ES: readonly OwnerFactSection[] = [
  {
    id: "web-chatbots-respuesta",
    heading: "¿Haces sitios web, landing pages y chatbots para negocios?",
    paragraphs: [
      "Sí. Además de video, Esteban Moreno Media diseña sitios web, landing pages y chatbots con IA para negocios locales, y el portafolio publica cinco de esos proyectos. [TitanForge](/es/portafolio/titanforge) tiene una plataforma web y un bot de IA que precalifica prospectos, agenda y registra clientes en el chat. [Gains From Geebs](/es/portafolio/gains-from-geebs) es una aplicación web de fitness con calculadoras interactivas y un chatbot de Instagram DM que responde dudas de coaching y precalifica prospectos. [Frontline Auto](/es/portafolio/front-line-auto), un taller de reparación, tiene un sitio web con un concierge de IA para citas de reparación, cotizaciones y registro en inglés y en español.",
      "[Fort Lauderdale Auto Sale](/es/portafolio/flas-concierge), un concesionario Buy-Here-Pay-Here, tiene un sitio web con precalificación de financiamiento, inventario en vivo y un concierge de IA para captar prospectos. El quinto proyecto, [chatbots de IA](/es/portafolio/ai-lead-automation), muestra dos de esos bots juntos: Geebs en Instagram y FLAS en el sitio web. Cada proyecto web se cotiza según su alcance.",
    ],
  },
  {
    id: "web-que-servicio",
    heading: "¿Qué servicio web le conviene a mi negocio?",
    paragraphs: [
      "Empieza por el problema que quieres resolver. Si la gente no encuentra una oferta clara ni una forma de preguntar, la base es un [sitio web de conversión](/es/sitios-web-de-conversion): páginas personalizadas mobile-first y landing pages enfocadas en una oferta y una ruta de consulta medible. Si las consultas llegan pero nadie responde a tiempo, la [captura y automatización de clientes con IA](/es/captura-y-automatizacion-de-clientes-con-ia) agrega chatbots, flujos de DM en ManyChat, email, SMS y reglas de handoff.",
      "Si los clientes te buscan y no te encuentran, [presencia local y SEO](/es/presencia-local-seo) conecta Google Business Profile, Maps y SEO técnico. Si no sabes dónde se pierden los prospectos, la [auditoría de funnel y datos](/es/auditoria-de-funnel-y-datos) revisa primero las rutas de adquisición, la analítica y los handoffs. Todo se puede hablar en español.",
      "Para una sola pieza: un [chatbot con IA](/es/chatbot-con-ia-para-negocios) responde en tu web o en Instagram y te pasa las consultas serias; una [landing page](/es/landing-page-para-negocios) da a un anuncio una página con una oferta y una acción.",
    ],
  },
  {
    id: "web-cuanto-cobra",
    heading: "¿Cuánto cobra un diseñador web por la página de un negocio?",
    paragraphs: [
      `${landingPagePriceText("es")} Los sitios web completos no tienen un precio publicado y se cotizan por proyecto. La cotización sigue el alcance: cuántas páginas, si los textos y las fotos ya existen, uno o dos idiomas, y qué tienen que hacer los formularios y el chatbot después de que alguien escribe. Esteban trabaja como diseñador independiente desde Fort Lauderdale y también de forma remota con negocios en Latinoamérica, y el proyecto se puede llevar completo en español.`,
      "Si solo necesitas una página para un anuncio o para tu bio, la página de [landing page para negocios](/es/landing-page-para-negocios) explica qué mueve esa cotización. El video para el sitio se cobra aparte: la edición se cobra por video, no por hora.",
    ],
  },
  {
    id: "web-ejemplos",
    heading: "¿Dónde veo ejemplos de páginas web que ha diseñado?",
    paragraphs: [
      "En el portafolio, una página por proyecto. [Fort Lauderdale Auto Sale](/es/portafolio/flas-concierge) es el sitio de un concesionario con calculadoras de financiamiento, filtro de inventario y un concierge con IA; el [caso de estudio de FLAS](/es/casos-de-estudio/flas-concierge) explica cómo se construyó, desde las tarjetas de inventario pensadas para el celular hasta el paso de cada consulta al equipo de ventas. [Frontline Auto](/es/portafolio/front-line-auto) es el sitio de un taller con reservas de servicio y atención bilingüe. [Gains From Geebs](/es/portafolio/gains-from-geebs) es una aplicación web de fitness con calculadoras interactivas, y [TitanForge](/es/portafolio/titanforge) es una plataforma web con registro de clientes y reservas.",
      "Cada uno de esos sitios tiene además un chatbot; la página de [chatbot con IA para negocios](/es/chatbot-con-ia-para-negocios) explica qué hacen esos bots.",
    ],
  },
];

// ---------------------------------------------------------------------------
// The published wedding film's watch page answers the wedding question too
// (row 95: watch pages had no answer beyond a ~40-word summary).
// ---------------------------------------------------------------------------

const WEDDING_WATCH_EN: OwnerFactSection = {
  id: "weddings",
  heading: "Does Esteban film weddings in Fort Lauderdale and Miami?",
  paragraphs: [
    "Yes. Diana & Jack is Esteban's published wedding: a wedding in Boston, Massachusetts, where he was the videographer and the editor and delivered a full 20-minute film of the day plus a highlight trailer of about a minute and a half. He films and edits weddings from his base in Fort Lauderdale, on location across Broward and Miami-Dade, and he can also edit a wedding that another videographer filmed.",
    "Each wedding is quoted individually because every wedding is different. Send the date, the location, the hours you want covered and what you want delivered, and the quote comes back before you book. The [wedding videographer page](/services/wedding-videographer-fort-lauderdale) explains what to send and which moments belong on the shot list.",
  ],
};

const WEDDING_WATCH_ES: OwnerFactSection = {
  id: "bodas",
  heading: "¿Esteban graba bodas en Fort Lauderdale y Miami?",
  paragraphs: [
    "Sí. Diana & Jack es la boda publicada de Esteban: una boda en Boston, Massachusetts, donde él fue el videógrafo y el editor y entregó una película completa de 20 minutos del día y un tráiler de momentos destacados de un minuto y medio, aproximadamente. Graba y edita bodas desde su base en Fort Lauderdale, en locación en Broward y Miami-Dade, y también puede editar una boda que grabó otro videógrafo.",
    "Cada boda se cotiza por separado, porque cada boda es distinta. Envía la fecha, el lugar, las horas que quieres cubrir y lo que quieres recibir, y la cotización llega antes de reservar. La página de [videógrafo de bodas](/es/videografo-de-bodas-fort-lauderdale) explica qué enviar y qué momentos van en la lista.",
  ],
};

// ---------------------------------------------------------------------------
// Registry: path -> sections, rendered by <OwnerFactAnswers path=... />.
// ---------------------------------------------------------------------------

export const OWNER_FACT_ANSWERS: Readonly<Record<string, readonly OwnerFactSection[]>> = {
  "/services/video-production-doral-miami": [VLOG_EN_DORAL],
  "/services/content-creator-video-editing-miami": [VLOG_EN_CREATOR],
  "/es/produccion-de-video-doral-miami": [VLOG_ES_DORAL],
  "/es/edicion-de-video-para-creadores-de-contenido-miami": [VLOG_ES_CREATOR],
  "/es/editor-de-video-miami": [LATAM_ES_EDITING],
  "/es/fotografia-de-producto-miami": [LATAM_ES_PRODUCT_PHOTO],
  "/es/fotografia-de-producto-con-ia-miami": [LATAM_ES_AI_PHOTO],
  "/services/website-design-fort-lauderdale": WEB_EN,
  "/es/diseno-web-fort-lauderdale": WEB_ES,
  "/portfolio/diana-jack": [WEDDING_WATCH_EN],
  "/es/portafolio/diana-jack": [WEDDING_WATCH_ES],
};

export function ownerFactAnswers(path: string): readonly OwnerFactSection[] {
  // Demand-map answers (DM rows, 2026-10-14) share the same slot and shape.
  return [...(OWNER_FACT_ANSWERS[path] ?? []), ...(DEMAND_MAP_ANSWERS[path] ?? [])];
}

// ---------------------------------------------------------------------------
// Per video, not per hour (autocomplete 2026-10-14: "video editor per hour
// rate", "what does a video editor charge per hour", "cuanto cobra un editor de
// video por hora", "... en colombia", "... en dolares"). Used by the pricing
// hubs (visible + FAQPage JSON-LD) and mirrored in the freelance guide.
// ---------------------------------------------------------------------------

export function perHourAnswer(locale: "en" | "es"): { question: string; answer: string } {
  return locale === "es"
    ? {
        question: "¿Cuánto cobra un editor de video por hora?",
        answer: `Esteban no cobra la edición por hora: la edición se cobra por video, desde ${perVideo} con el paquete Arranque, así que sabes el precio antes de que empiece el trabajo. Lo único que se cobra por tiempo es la grabación, ${filmingHourlyText("es")}. Con una tarifa de edición por hora el total queda abierto hasta el final, porque depende de cuántas horas tomó el video; con un precio por video, lo que pagas por un video terminado queda fijo antes de editar, y la cotización por escrito dice cuántas rondas de cambios incluye. Para comparar, pregúntale al editor que cobra por hora cuántas horas suele tomar un video como el tuyo.`,
      }
    : {
        question: "How much does a video editor charge per hour?",
        answer: `Esteban does not charge for editing by the hour: editing is priced per video, from ${perVideo} on the Starter package, so you know the price before work starts. Only filming is billed by time, ${filmingHourlyText("en")}. With an hourly editing rate the total stays open until the end, because it depends on how many hours the video took; with a per-video price, what you pay for one finished video is fixed before the edit, and the written quote says how many rounds of changes are included. To compare, ask an hourly editor how many hours a video like yours usually takes.`,
      };
}

export function latamAnswer(): { question: string; answer: string } {
  return {
    question: LATAM_HEADING,
    answer: `Sí. Esteban trabaja a distancia con clientes de Latinoamérica, en español, que es su idioma principal de trabajo. Envías el material por internet, con un enlace de Google Drive o Dropbox, y recibes los archivos terminados de la misma forma. Los precios están en dólares estadounidenses (USD): editar un video cuesta desde ${perVideo} con el paquete Arranque, y cada proyecto recibe una cotización por escrito antes de empezar. La edición, los videos cortos para redes y las imágenes con IA hechas a partir de tus fotos funcionan bien a distancia; la grabación en persona se define por proyecto en Miami-Dade y Broward.`,
  };
}

export function onSiteProductionAnswer(locale: "en" | "es"): { question: string; answer: string } {
  return locale === "es"
    ? {
        question: "¿Cuánto cuesta la grabación en sitio, multicámara o en yates?",
        answer: `La grabación presencial se cobra por tiempo o jornada: un videógrafo con cámara 4K va desde ${usd(CREW_RECORDING_RATES.solo.hourly)} por hora (mínimo ${CREW_RECORDING_RATES.solo.minimumHours} horas, ${usd(CREW_RECORDING_RATES.solo.halfDay)} media jornada u ${usd(CREW_RECORDING_RATES.solo.fullDay)} día completo). Un equipo de 2 personas para eventos (camarógrafo 4K y creador móvil para Reels y testimonios) va desde ${usd(CREW_RECORDING_RATES.twoPerson.hourly)} por hora o ${usd(TURNKEY_PRODUCTION_BUNDLES.twoPersonHalfDay)} llave en mano con edición. La cobertura multicámara para conferencias (2 a 3 cámaras y consola) va desde ${usd(CREW_RECORDING_RATES.multiCamera.hourly)} por hora (${usd(TURNKEY_PRODUCTION_BUNDLES.multiCamHalfDay)} terminada). Las sesiones en yates requieren media jornada como mínimo, desde ${usd(YACHT_PRODUCTION.halfDaySolo)} en bruto o ${usd(TURNKEY_PRODUCTION_BUNDLES.yachtHalfDay)} con edición promocional, y hasta ${usd(TURNKEY_PRODUCTION_BUNDLES.yachtFullDay)} el día con dron en agua. Los videos comerciales y de producto parten desde ${usd(COMMERCIAL_VIDEO_TIERS.basic.from)} para demos básicos de fundador (60–90 seg); producciones premium con narrativa de marca parten desde ${usd(COMMERCIAL_VIDEO_TIERS.brandNarrative.from)} (hasta 2 min con ganchos para anuncios); y comerciales publicitarios con actores profesionales y renta de estudio parten desde ${usd(COMMERCIAL_VIDEO_TIERS.actorsAndStudio.fromMin)} a ${usd(COMMERCIAL_VIDEO_TIERS.actorsAndStudio.fromMax)}+ según casting y derechos comerciales.`,
      }
    : {
        question: "How much does on-site recording, multi-camera, or yacht production cost?",
        answer: `On-location filming is billed by time or day: a solo 4K videographer starts from ${usd(CREW_RECORDING_RATES.solo.hourly)} per hour (${CREW_RECORDING_RATES.solo.minimumHours}-hour minimum, or ${usd(CREW_RECORDING_RATES.solo.halfDay)} half-day / ${usd(CREW_RECORDING_RATES.solo.fullDay)} full-day). A 2-person event crew (lead 4K DP plus mobile creator for vertical Reels and attendee soundbites) starts from ${usd(CREW_RECORDING_RATES.twoPerson.hourly)} per hour or ${usd(TURNKEY_PRODUCTION_BUNDLES.twoPersonHalfDay)} turnkey with editing included. Multi-camera conference coverage (2 to 3 cameras with soundboard audio) starts from ${usd(CREW_RECORDING_RATES.multiCamera.hourly)} per hour (${usd(TURNKEY_PRODUCTION_BUNDLES.multiCamHalfDay)} turnkey). Yacht and marine charter shoots require a half-day minimum, starting from ${usd(YACHT_PRODUCTION.halfDaySolo)} raw or ${usd(TURNKEY_PRODUCTION_BUNDLES.yachtHalfDay)} turnkey with a luxury showcase edit, up to ${usd(TURNKEY_PRODUCTION_BUNDLES.yachtFullDay)} for full-day charter coverage with licensed marine drone tracking. Commercial and product videos start from ${usd(COMMERCIAL_VIDEO_TIERS.basic.from)} for basic founder-led product demos (60–90 seconds); premium brand narrative films with 2-person crew start from ${usd(COMMERCIAL_VIDEO_TIERS.brandNarrative.from)} (up to 2 minutes with ad hooks); and commercial spots with professional actors and studio rental start from ${usd(COMMERCIAL_VIDEO_TIERS.actorsAndStudio.fromMin)} to ${usd(COMMERCIAL_VIDEO_TIERS.actorsAndStudio.fromMax)}+ depending on casting and commercial usage rights.`,
      };
}
