// Question-shaped answers that a page did not have (overnight loop rows 10,
// 14, 109 and 111, 2026-10-14). Each entry is ONE section: a heading phrased
// the way people search, 100-180 words, at least one real fact, rendered in
// the server HTML by components/page-questions.tsx. Depth that a skimmer does
// not need goes in `details`, which renders as a native <details> (collapsed
// is not removed: crawlers read it).
//
// Claim discipline: only what the site already publishes (Fort Lauderdale
// base, Spanish-first with intermediate English, editing from supplied
// footage, on-location work scoped per project) plus general craft knowledge.
// Prices are read from lib/pricing.ts / lib/packages.ts, never typed here.
// Study figures come from data/studies/miami-restaurant-instagram-2026.json.
//
// Each entry starts with `path:` so scripts/page-lastmod.mjs dates the page
// when its answer changes.

import study from "@/data/studies/miami-restaurant-instagram-2026.json";
import { priceSentence } from "@/lib/packages";
import { filmingHourlyText, shortFormPriceText } from "@/lib/pricing";

export type PageQuestion = {
  path: string;
  locale: "en" | "es";
  /** Anchor id for the section heading. */
  id: string;
  heading: string;
  paragraphs: string[];
  details?: { summary: string; paragraphs: string[] };
};

const allInEn = priceSentence("en", "todo-incluido").toLowerCase();
const allInEs = priceSentence("es", "todo-incluido").toLowerCase();

export const PAGE_QUESTIONS: readonly PageQuestion[] = [
  // Row 109: autocomplete "tiktok editor for hire".
  {
    path: "/services/tiktok-ad-video-editor-miami",
    locale: "en",
    id: "can-i-hire-a-tiktok-editor",
    heading: "Can I hire a TikTok editor?",
    paragraphs: [
      "Yes. A TikTok editor is hired by the video or by the batch, and the work happens remotely from clips you already have: phone recordings, product demos, a founder talking to camera, or UGC from creators. You send the footage, the offer and the call to action; the editor cuts a hook for the first seconds, adds captions inside TikTok's safe zones and exports 9:16, plus 4:5 or 1:1 when the same ad also runs on Meta.",
      `Esteban Moreno Media edits TikTok ads and organic TikToks from Fort Lauderdale for businesses in Miami and remote clients, Spanish-first with intermediate English. Starter is ${shortFormPriceText("en")}, and every project gets a written quote before the edit starts. To hire, send three things in one message: a link to the footage, what the video has to sell, and the date it has to go live.`,
    ],
  },
  // Row 111: autocomplete "how to edit food videos", "video editing for restaurant".
  {
    path: "/services/food-and-places-creator-video-editing-miami",
    locale: "en",
    id: "how-do-you-edit-food-videos",
    heading: "How do you edit food videos?",
    paragraphs: [
      "Edit for appetite first and information second. Open on the moment that makes someone hungry: the pour, the cut, the cheese pull, the plate landing on the table. Keep the montage shots short and let one hero shot hold. Natural sound carries food well, so keep the sizzle and the crunch under the music. Correct the color so the dish looks the way it does on the table: white plates stay white, and warm restaurant light does not turn everything orange. Burn in captions with the dish, the price or the neighborhood, because many people watch on mute, and export 9:16 with text clear of the bottom of the frame.",
      `Length matters too. In the site's own [study of ${study.sample} Miami restaurant accounts](/guides/miami-restaurant-instagram-study) (${study.postsAnalyzed} posts), ${study.formats.reelPct}% of posts were Reels and the median Reel ran ${study.reels.medianSeconds} seconds. Editing your own phone clips is Starter, ${shortFormPriceText("en")}.`,
    ],
  },
  // Row 10: "ugc video editor fort lauderdale" landed on /areas; no new thin page.
  {
    path: "/services/ugc-video-editor-ecommerce",
    locale: "en",
    id: "ugc-video-editor-fort-lauderdale",
    heading: "Is there a UGC video editor in Fort Lauderdale?",
    paragraphs: [
      "Yes. Esteban Moreno Media is based in Fort Lauderdale and edits UGC for brands in Broward, Miami-Dade and remote clients. The editing itself does not depend on where the brand is: creators upload their clips to a shared folder, and the edits come back as ad variations with different hooks, captions and lengths for Meta and TikTok, so a Fort Lauderdale brand and one in another state get the same process.",
      `Being local matters when the brand also needs product footage filmed, for example a product in use at the store or at an event. On-location filming is a paid service scoped per project, ${filmingHourlyText("en")}. Editing creator clips is Starter, ${shortFormPriceText("en")}. Communication is Spanish-first with intermediate English, and the [Fort Lauderdale service area page](/fort-lauderdale) lists what else is available close to the base.`,
    ],
  },

  // Row 14: the six growth-system pages were ~300 words with no answer-first
  // section. One definition-first answer each, EN + ES, built only from the
  // scope and boundaries the pages already publish.
  {
    path: "/services/conversion-websites",
    locale: "en",
    id: "what-is-a-conversion-website",
    heading: "What is a conversion website?",
    paragraphs: [
      "A conversion website is built around one action the visitor should take, such as calling, booking or sending a form, instead of around a company history. Every page names the offer, shows proof the visitor can check, and puts the next step where a phone user can reach it with a thumb. The site is then measured: Google Analytics 4 events record each call tap, form start and form submission, so changes are judged by what people did rather than by how the page looks.",
      `The work here covers custom desktop and mobile pages, the offer, call-to-action and form design (including address autocomplete), analytics and conversion-event setup, and photo or video direction when it supports the visitor's path. It is priced inside the All-In package, ${allInEn}. Launch timing depends on the confirmed scope, assets, access and review rounds, and conversion is measured and improved, not guaranteed.`,
    ],
  },
  {
    path: "/es/sitios-web-de-conversion",
    locale: "es",
    id: "que-es-un-sitio-web-de-conversion",
    heading: "¿Qué es un sitio web de conversión?",
    paragraphs: [
      "Un sitio web de conversión se construye alrededor de una acción que el visitante debe tomar, como llamar, agendar o enviar un formulario, y no alrededor de la historia de la empresa. Cada página nombra la oferta, muestra una prueba que el visitante puede verificar y pone el siguiente paso donde se alcanza con el pulgar en el teléfono. Después el sitio se mide: los eventos de Google Analytics 4 registran cada toque en llamar, cada formulario empezado y cada formulario enviado, así que los cambios se juzgan por lo que hizo la gente.",
      `El trabajo incluye páginas personalizadas para escritorio y móvil, el diseño de la oferta, el botón de acción y el formulario (con autocompletado de dirección), la configuración de analítica y eventos de conversión, y dirección de foto o video cuando apoya el recorrido. Se cotiza dentro del paquete Todo Incluido, ${allInEs}. El tiempo de lanzamiento depende del alcance, los materiales, los accesos y las rondas de revisión, y la conversión se mide y se mejora; no se garantiza.`,
    ],
  },
  {
    path: "/services/ai-lead-capture-automation",
    locale: "en",
    id: "what-is-ai-lead-capture",
    heading: "What is AI lead capture and follow-up automation?",
    paragraphs: [
      "AI lead capture answers the first questions a new inquiry asks, collects the details a business needs (service, location, timing, contact), and hands the conversation to the right next step: a booked call, a person on the team, or a follow-up message. It runs where the questions arrive: a chat on the website, Instagram or Facebook DMs through ManyChat, email, or text messages sent through Twilio.",
      `The scope covers website chatbots and agent-assisted intake, ManyChat and social DM flows, automated email and SMS sequences, and the rules for when a human takes over, where conversations are routed and what gets reported. Every flow keeps a human escalation path; it is not presented as unattended decision-making. Text and marketing messages need the right consent, platform access and a compliance review before anything is sent. It is priced inside the All-In package, ${allInEn}.`,
    ],
  },
  {
    path: "/es/captura-y-automatizacion-de-clientes-con-ia",
    locale: "es",
    id: "que-es-la-captura-de-clientes-con-ia",
    heading: "¿Qué es la captura de clientes con IA y el seguimiento automatizado?",
    paragraphs: [
      "La captura de clientes con IA responde las primeras preguntas de una consulta nueva, reúne los datos que el negocio necesita (servicio, ubicación, fechas, contacto) y pasa la conversación al siguiente paso correcto: una llamada agendada, una persona del equipo o un mensaje de seguimiento. Funciona donde llegan las preguntas: un chat en el sitio web, los DM de Instagram o Facebook con ManyChat, el email o los mensajes de texto enviados con Twilio.",
      `El alcance incluye chatbots web e intake asistido por agentes, flujos de ManyChat y DM en redes, secuencias automatizadas de email y SMS, y las reglas de cuándo toma el control una persona, a dónde se enrutan las conversaciones y qué se reporta. Cada flujo mantiene una escalación humana; no se presenta como una toma de decisiones sin supervisión. Los mensajes de texto y de marketing requieren consentimiento, acceso a la plataforma y una revisión de cumplimiento antes de enviar nada. Se cotiza dentro del paquete Todo Incluido, ${allInEs}.`,
    ],
  },
  {
    path: "/services/local-presence-seo",
    locale: "en",
    id: "what-is-local-presence-seo",
    heading: "What does local presence and SEO work include?",
    paragraphs: [
      "Local presence work makes a business easy to find and easy to evaluate where people look for a local service: Google Business Profile and Google Maps, Apple Maps, Yelp, and the marketplaces of its own industry, such as Zillow or Homes.com for real estate. The same name, phone, hours and services should read identically in every one of them and on the website.",
      `On the website side it covers technical SEO, the structure of the service pages and indexation checks in Google Search Console, plus reporting of what is actually observed in search results and AI-assistant answers. What can be changed depends on each platform's policies and on who owns each account. No position in Google, Maps or an AI assistant is guaranteed; the work makes the business clearer to evaluate and reports what moved. It is priced inside the All-In package, ${allInEn}.`,
    ],
  },
  {
    path: "/es/presencia-local-seo",
    locale: "es",
    id: "que-incluye-la-presencia-local-seo",
    heading: "¿Qué incluye el trabajo de presencia local y SEO?",
    paragraphs: [
      "El trabajo de presencia local hace que un negocio sea fácil de encontrar y de evaluar donde la gente busca un servicio local: Google Business Profile y Google Maps, Apple Maps, Yelp y los marketplaces de su propia industria, como Zillow u Homes.com para bienes raíces. El nombre, el teléfono, el horario y los servicios deben leerse igual en cada uno y en el sitio web.",
      `En el sitio web incluye SEO técnico, la estructura de las páginas de servicio y los chequeos de indexación en Google Search Console, además de reportes de lo que realmente se observa en los resultados de búsqueda y en las respuestas de asistentes de IA. Lo que se puede cambiar depende de las políticas de cada plataforma y de quién es dueño de cada cuenta. No se garantiza ninguna posición en Google, Maps o un asistente de IA; el trabajo hace que el negocio sea más claro de evaluar y reporta lo que se movió. Se cotiza dentro del paquete Todo Incluido, ${allInEs}.`,
    ],
  },
  {
    path: "/services/growth-funnel-audit",
    locale: "en",
    id: "what-is-a-growth-funnel-audit",
    heading: "What is a growth funnel and data audit?",
    paragraphs: [
      "A funnel audit follows a customer from the first visit or message to the sale and marks where people drop, what the team repeats by hand, and what is not being measured at all. It reads the tools a business already has, such as Google Analytics 4, Google Search Console and Metricool for social posts, and checks whether they agree with each other before any number is used for a decision.",
      `The result is a map of acquisition paths, attribution and handoffs, an assessment of manual work and cost opportunities, and a prioritized brief with measurable next steps, so the business decides what to fix or automate with the evidence in front of it. Findings depend on the data and access available at the time of the review, and an audit identifies opportunities; it does not promise savings or revenue. It is priced inside the All-In package, ${allInEn}.`,
    ],
  },
  {
    path: "/es/auditoria-de-funnel-y-datos",
    locale: "es",
    id: "que-es-una-auditoria-de-funnel",
    heading: "¿Qué es una auditoría de funnel y datos?",
    paragraphs: [
      "Una auditoría de funnel sigue al cliente desde la primera visita o mensaje hasta la venta y marca dónde se cae la gente, qué repite el equipo a mano y qué no se está midiendo. Lee las herramientas que el negocio ya tiene, como Google Analytics 4, Google Search Console y Metricool para las publicaciones en redes, y revisa si coinciden entre sí antes de usar cualquier número para decidir.",
      `El resultado es un mapa de las rutas de adquisición, la atribución y los traspasos entre personas o herramientas, una evaluación del trabajo manual y de las oportunidades de costo, y un brief priorizado con próximos pasos medibles, para que el negocio decida qué arreglar o automatizar con la evidencia delante. Los hallazgos dependen de los datos y accesos disponibles al momento de la revisión, y una auditoría identifica oportunidades; no promete ahorros ni ingresos. Se cotiza dentro del paquete Todo Incluido, ${allInEs}.`,
    ],
  },
  {
    path: "/services/custom-operations-automation",
    locale: "en",
    id: "what-is-operations-automation",
    heading: "What is custom operations automation?",
    paragraphs: [
      "Operations automation takes the work a team copies from one place to another, such as form entries into a spreadsheet, a weekly report assembled by hand, or a lead forwarded from an inbox, and makes it move on its own between the tools the business already approved. Each flow has review points where a person checks the result before it counts.",
      `The scope covers custom agent flows and integrations with approved software, automated reports and spreadsheet workflows, form routing with data-quality checks, and security-aware design. Security testing happens only with written authorization and a defined scope, and automation is designed around the systems and access the business approved; it does not bypass platform controls. It is priced inside the All-In package, ${allInEn}, after the current process is mapped so the quote matches the real workload.`,
    ],
  },
  {
    path: "/es/automatizacion-de-operaciones",
    locale: "es",
    id: "que-es-la-automatizacion-de-operaciones",
    heading: "¿Qué es la automatización personalizada de operaciones?",
    paragraphs: [
      "La automatización de operaciones toma el trabajo que un equipo copia de un lugar a otro, como pasar formularios a una hoja de cálculo, armar a mano un reporte semanal o reenviar un cliente potencial desde un inbox, y hace que se mueva solo entre las herramientas que el negocio ya aprobó. Cada flujo tiene puntos de revisión donde una persona verifica el resultado antes de darlo por bueno.",
      `El alcance incluye flujos de agentes e integraciones con software aprobado, reportes automatizados y flujos de hojas de cálculo, enrutamiento de formularios con chequeos de calidad de datos y un diseño consciente de la seguridad. Las pruebas de seguridad se hacen solo con autorización escrita y un alcance definido, y la automatización se diseña alrededor de los sistemas y accesos que el negocio aprobó; no evade los controles de ninguna plataforma. Se cotiza dentro del paquete Todo Incluido, ${allInEs}, después de mapear el proceso actual para que la cotización refleje el trabajo real.`,
    ],
  },
  {
    path: "/services/creative-production",
    locale: "en",
    id: "what-is-creative-production",
    heading: "What does creative production include?",
    paragraphs: [
      "Creative production is the video and photography that the rest of a growth system runs on: the clips on the website, the photos on the Google profile, the Reels that send people to the offer. Here it covers video editing, photography and on-location capture scoped per project, repurposing one recording into channel-ready exports, and a look at how past videos and posts performed before deciding what to make next.",
      `Prices are published. Editing your own clips is Starter, ${shortFormPriceText("en")}. On-location filming is ${filmingHourlyText("en")}, and a production day at your business, with planning, filming and the edit, is ${priceSentence("en", "presencia-local").toLowerCase()}. Deliverables, timing, location and usage are confirmed per project. Performance analysis informs the next decision; it cannot predict or guarantee that a video goes viral.`,
    ],
  },
  {
    path: "/es/produccion-creativa",
    locale: "es",
    id: "que-incluye-la-produccion-creativa",
    heading: "¿Qué incluye la producción creativa?",
    paragraphs: [
      "La producción creativa es el video y la fotografía de los que vive el resto del sistema de crecimiento: los clips del sitio web, las fotos del perfil de Google, los Reels que llevan a la gente a la oferta. Aquí incluye edición de video, fotografía y grabación en locación definida por proyecto, la reutilización de una grabación en versiones listas para cada canal, y una revisión de cómo funcionaron los videos y publicaciones anteriores antes de decidir qué hacer después.",
      `Los precios están publicados. Editar tus propios clips es el paquete Arranque, ${shortFormPriceText("es")}. La grabación en locación va ${filmingHourlyText("es")}, y un día de producción en tu negocio, con planificación, grabación y edición, va ${priceSentence("es", "presencia-local").toLowerCase()}. Los entregables, los tiempos, la locación y el uso se confirman por proyecto. El análisis de resultados informa la siguiente decisión; no puede predecir ni garantizar que un video se haga viral.`,
    ],
  },
];

export function pageQuestionsFor(path: string): readonly PageQuestion[] {
  return PAGE_QUESTIONS.filter((entry) => entry.path === path);
}
