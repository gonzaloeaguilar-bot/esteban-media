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
import { SHORT_FORM, usd } from "@/lib/pricing";

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
    `If you want him behind the camera, filming in Doral or anywhere else in Miami-Dade is on-location work scoped per project. The Local Presence package is ${enLocal()}, and the written quote sets the location, the hours and what you get back before the date. You can brief him in Spanish or English.`,
  ],
};

const VLOG_EN_CREATOR: OwnerFactSection = {
  id: "vlogs",
  heading: "Do you film and edit vlogs?",
  paragraphs: [
    `Yes. Esteban Moreno films and edits vlogs as well as short vertical posts. Most creators record the vlog themselves and send the original files; he edits remotely, cutting the pauses and restarts, keeping the story in the order you lived it, and adding captions, music and a title. The same footage can also give you short clips for Reels, TikTok and Shorts, so one vlog feeds the rest of the week.`,
    `Editing is priced per video, from ${perVideo} on the Starter package, so the price is fixed before the edit starts; a long vlog is quoted by its length and what it needs. If you would rather have him film, on-location work in Miami-Dade or Broward is scoped per project and the Local Presence package is ${enLocal()}.`,
  ],
};

const VLOG_ES_DORAL: OwnerFactSection = {
  id: "vlogs",
  heading: "¿Grabas y editas vlogs en Doral y Miami?",
  paragraphs: [
    `Sí. Esteban Moreno graba y edita vlogs. Si ya grabas tu vlog con el celular o con una cámara, envía los archivos originales y él lo edita a distancia: quita los tiempos muertos, mantiene tu voz y el orden de la historia, y agrega subtítulos, música y un título para YouTube, Instagram o TikTok. La edición se cobra por video, desde ${perVideo} con el paquete Arranque, así que sabes el precio antes de empezar; un vlog largo se cotiza según su duración y lo que necesita.`,
    `Si prefieres que él grabe, la grabación en Doral o en cualquier parte de Miami-Dade es trabajo en locación que se define por proyecto. El paquete Presencia Local es ${esLocal()}, y la cotización por escrito fija el lugar, las horas y lo que recibes antes de la fecha. Puedes explicar tu proyecto en español.`,
  ],
};

const VLOG_ES_CREATOR: OwnerFactSection = {
  id: "vlogs",
  heading: "¿Grabas y editas vlogs?",
  paragraphs: [
    `Sí. Esteban Moreno graba y edita vlogs, además de videos cortos verticales. La mayoría de los creadores graba el vlog por su cuenta y envía los archivos originales; él edita a distancia, quita pausas y repeticiones, mantiene la historia en el orden en que la viviste y agrega subtítulos, música y un título. Del mismo material salen también clips cortos para Reels, TikTok y Shorts, así un vlog alimenta el resto de la semana.`,
    `La edición se cobra por video, desde ${perVideo} con el paquete Arranque, así que el precio queda fijo antes de empezar; un vlog largo se cotiza según su duración y lo que necesita. Si prefieres que él grabe, el trabajo en locación en Miami-Dade o Broward se define por proyecto y el paquete Presencia Local es ${esLocal()}.`,
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
  return OWNER_FACT_ANSWERS[path] ?? [];
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
        answer: `Esteban no cobra por hora: la edición se cobra por video, desde ${perVideo} con el paquete Arranque, así que sabes el precio antes de que empiece el trabajo. Con una tarifa por hora el total queda abierto hasta el final, porque depende de cuántas horas tomó el video; con un precio por video, lo que pagas por un video terminado queda fijo antes de editar, y la cotización por escrito dice cuántas rondas de cambios incluye. Para comparar con un editor que cobra por hora, pregúntale cuántas horas suele tomar un video como el tuyo y multiplícalo por su tarifa.`,
      }
    : {
        question: "How much does a video editor charge per hour?",
        answer: `Esteban does not charge by the hour: editing is priced per video, from ${perVideo} on the Starter package, so you know the price before work starts. With an hourly rate the total stays open until the end, because it depends on how many hours the video took; with a per-video price, what you pay for one finished video is fixed before the edit, and the written quote says how many rounds of changes are included. To compare with an editor who bills hourly, ask how many hours a video like yours usually takes and multiply by the rate.`,
      };
}

export function latamAnswer(): { question: string; answer: string } {
  return {
    question: LATAM_HEADING,
    answer: `Sí. Esteban trabaja a distancia con clientes de Latinoamérica, en español, que es su idioma principal de trabajo. Envías el material por internet, con un enlace de Google Drive o Dropbox, y recibes los archivos terminados de la misma forma. Los precios están en dólares estadounidenses (USD): editar un video cuesta desde ${perVideo} con el paquete Arranque, y cada proyecto recibe una cotización por escrito antes de empezar. La edición, los videos cortos para redes y las imágenes con IA hechas a partir de tus fotos funcionan bien a distancia; la grabación en persona se define por proyecto en Miami-Dade y Broward.`,
  };
}
