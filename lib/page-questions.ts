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
      `El trabajo incluye páginas personalizadas para escritorio y móvil, el diseño de la oferta, el botón de acción y el formulario (con autocompletado de dirección), la configuración de analítica y eventos de conversión, y dirección de foto o video. Se cotiza dentro del paquete Todo Incluido, ${allInEs}. El tiempo de lanzamiento depende del alcance, los materiales, los accesos y las rondas de revisión, y la conversión se mide y se mejora; no se garantiza.`,
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
      "La producción creativa es el video y la fotografía de los que vive el resto del sistema de crecimiento: los clips del sitio web, las fotos del perfil de Google, los Reels que llevan a la gente a la oferta. Aquí incluye edición de video, fotografía y grabación en locación definida por proyecto, versiones de una misma grabación listas para cada canal y una revisión de cómo funcionaron los videos anteriores antes de decidir qué hacer.",
      `Los precios están publicados. Editar tus propios clips es el paquete Arranque, ${shortFormPriceText("es")}. La grabación en locación va ${filmingHourlyText("es")}, y un día de producción en tu negocio, con planificación, grabación y edición, va ${priceSentence("es", "presencia-local").toLowerCase()}. Entregables, tiempos, locación y uso se confirman por proyecto. El análisis de resultados informa la siguiente decisión; no puede predecir ni garantizar que un video se haga viral.`,
    ],
  },
  // Row 14, second answer per growth-system page: what to prepare, so each
  // page carries two citable sections (dual-audience gate needs two in band).
  {
    path: "/services/conversion-websites",
    locale: "en",
    id: "what-to-send-for-a-website-quote",
    heading: "What should you send before asking for a website quote?",
    paragraphs: [
      "Send the one action the site should drive (a call, a booking or a form), the offer and price you want visitors to see, the proof you can show (published work, reviews already on Google, photos of the real business), and the logins you control: domain, hosting, Google Analytics and Google Business Profile. Name who approves the copy and how many review rounds that person needs. With those in hand the quote can list the pages, the form fields and the events that will be measured, instead of guessing. A site built without access to the domain or the analytics account cannot be launched or measured, so that access is the first thing settled, before any design starts.",
    ],
  },
  {
    path: "/es/sitios-web-de-conversion",
    locale: "es",
    id: "que-enviar-para-cotizar-un-sitio",
    heading: "¿Qué conviene enviar antes de pedir la cotización de un sitio?",
    paragraphs: [
      "Envía la acción que el sitio debe lograr (una llamada, una cita o un formulario), la oferta y el precio que quieres que vean los visitantes, la prueba que puedes mostrar (trabajo publicado, reseñas que ya están en Google, fotos del negocio real) y los accesos que controlas: dominio, hosting, Google Analytics y Google Business Profile. Indica quién aprueba los textos y cuántas rondas de revisión necesita. Con eso la cotización puede listar las páginas, los campos del formulario y los eventos que se van a medir, sin adivinar. Un sitio sin acceso al dominio o a la cuenta de analítica no se puede lanzar ni medir, así que ese acceso se resuelve primero.",
    ],
  },
  {
    path: "/services/ai-lead-capture-automation",
    locale: "en",
    id: "what-to-map-before-lead-automation",
    heading: "What should you map before automating lead follow-up?",
    paragraphs: [
      "Write down where inquiries arrive today (website form, Instagram DMs, phone, email), the five questions the team answers most, the details needed before a quote, and the moment a person must take over. Then list the tools already paid for, such as ManyChat, a CRM, Google Calendar or Twilio, and who owns each account. That map decides the flow: what the bot may answer, what it must hand to a human, and what gets reported each week. If customers will receive text messages, collect proof of consent first, because SMS sending needs it before anything goes out. A flow built on top of an unclear handoff only answers faster; it does not book more.",
    ],
  },
  {
    path: "/es/captura-y-automatizacion-de-clientes-con-ia",
    locale: "es",
    id: "que-mapear-antes-de-automatizar",
    heading: "¿Qué conviene mapear antes de automatizar el seguimiento?",
    paragraphs: [
      "Anota por dónde llegan hoy las consultas (formulario web, DM de Instagram, teléfono, email), las cinco preguntas que el equipo responde más, los datos que hacen falta antes de cotizar y el momento en que una persona debe tomar el control. Después lista las herramientas que ya pagas, como ManyChat, un CRM, Google Calendar o Twilio, y quién es dueño de cada cuenta. Ese mapa define el flujo: qué puede responder el bot, qué debe pasar a una persona y qué se reporta cada semana. Si los clientes van a recibir mensajes de texto, reúne primero la prueba de consentimiento, porque el envío de SMS la necesita. Un flujo montado sobre un traspaso confuso solo responde más rápido; no agenda más.",
    ],
  },
  {
    path: "/services/local-presence-seo",
    locale: "en",
    id: "what-to-check-first-local-presence",
    heading: "What should a business check first on its local listings?",
    paragraphs: [
      "Search the business name on Google Maps, Apple Maps and Yelp and write down what each one shows: the name, phone number, hours, categories and website link. Any difference between them, or between them and the website, is the first fix, because customers and search systems both read the mismatch as doubt. Then check who owns each profile: a Google Business Profile claimed by a former employee or an old agency has to be recovered before anything can be edited. Note which service pages exist on the website for each service and city you want to appear for. With that list, the work can start with ownership and consistency before any new page is written.",
    ],
  },
  {
    path: "/es/presencia-local-seo",
    locale: "es",
    id: "que-revisar-primero-presencia-local",
    heading: "¿Qué debe revisar primero un negocio en sus perfiles locales?",
    paragraphs: [
      "Busca el nombre del negocio en Google Maps, Apple Maps y Yelp y anota lo que muestra cada uno: nombre, teléfono, horario, categorías y enlace al sitio. Cualquier diferencia entre ellos, o con el sitio web, es lo primero que se corrige, porque clientes y buscadores leen esa diferencia como duda. Después revisa quién es dueño de cada perfil: un Google Business Profile reclamado por un exempleado o una agencia anterior se debe recuperar antes de poder editarlo. Anota qué páginas de servicio existen en el sitio para cada servicio y ciudad donde quieres aparecer. Con esa lista, el trabajo empieza por la propiedad y la consistencia antes de escribir páginas nuevas.",
    ],
  },
  {
    path: "/services/growth-funnel-audit",
    locale: "en",
    id: "what-access-for-a-funnel-audit",
    heading: "What access does a funnel and data audit need?",
    paragraphs: [
      "Read access is enough to start: Google Analytics 4, Google Search Console, the social scheduling tool if there is one (Metricool, for example), the form or CRM where inquiries land, and the booking calendar. Add a short export of the last 90 days of inquiries with their source, if the business keeps one. Nothing is changed during the audit; the point is to see whether the tools agree. One gap the audit looks for is a form that sends email but records no analytics event, so the website looks like it produces no leads while the inbox has them. The audit ends with that kind of gap named, with the evidence that shows it and the next step to close it.",
    ],
  },
  {
    path: "/es/auditoria-de-funnel-y-datos",
    locale: "es",
    id: "que-accesos-necesita-la-auditoria",
    heading: "¿Qué accesos necesita una auditoría de funnel y datos?",
    paragraphs: [
      "Para empezar basta con acceso de lectura: Google Analytics 4, Google Search Console, la herramienta de programación de redes si existe (Metricool, por ejemplo), el formulario o CRM donde llegan las consultas y el calendario de citas. Suma una exportación corta de las consultas de los últimos 90 días con su origen, si el negocio la tiene. Durante la auditoría no se cambia nada; el objetivo es ver si las herramientas coinciden. Una brecha que la auditoría busca es un formulario que envía el email pero no registra ningún evento de analítica, así que el sitio parece no generar clientes mientras el inbox sí los tiene. La auditoría termina con esa brecha nombrada, su evidencia y el siguiente paso.",
    ],
  },
  {
    path: "/services/custom-operations-automation",
    locale: "en",
    id: "what-to-automate-first",
    heading: "Which operations task should be automated first?",
    paragraphs: [
      "Start with the task that is repeated most often, follows the same steps every time and breaks quietly when someone forgets it: copying form entries into a spreadsheet, building the Monday report by hand, or forwarding a new inquiry to the right person. Time it for one week, write the steps down exactly as the team does them, and note which tools hold the data. A task with judgment in the middle, such as approving a refund, keeps a human review point inside the flow. The first automation should be small enough to check by hand for two weeks, so the team trusts the result before the next one is built on top of it.",
    ],
  },
  {
    path: "/es/automatizacion-de-operaciones",
    locale: "es",
    id: "que-automatizar-primero",
    heading: "¿Qué tarea de operaciones conviene automatizar primero?",
    paragraphs: [
      "Empieza por la tarea que se repite más, sigue los mismos pasos cada vez y falla en silencio cuando alguien la olvida: pasar formularios a una hoja de cálculo, armar a mano el reporte del lunes o reenviar una consulta nueva a la persona correcta. Mídela durante una semana, escribe los pasos tal como los hace el equipo y anota qué herramientas guardan los datos. Una tarea con criterio en medio, como aprobar un reembolso, mantiene un punto de revisión humana dentro del flujo. La primera automatización debe ser lo bastante pequeña para revisarla a mano dos semanas, así el equipo confía en el resultado antes de construir la siguiente.",
    ],
  },
  {
    path: "/services/creative-production",
    locale: "en",
    id: "filming-or-editing-first",
    heading: "Should you start with filming or with editing?",
    paragraphs: [
      "Start with editing when the footage already exists: phone clips, an old shoot, recorded webinars or product videos that were never cut down. Editing is remote, needs no visit, and shows quickly which kinds of clips are missing. Start with filming when the business has nothing that shows the real service, the space, the team or the product being used. Filming is booked by the hour or as a production day, and one shoot can be planned to feed weeks of edits, with vertical and horizontal crops decided before the camera rolls. Either way, the first message should list the footage that already exists, so the quote does not pay to film something you already have.",
    ],
  },
  {
    path: "/es/produccion-creativa",
    locale: "es",
    id: "grabar-o-editar-primero",
    heading: "¿Conviene empezar por grabar o por editar?",
    paragraphs: [
      "Empieza por la edición cuando el material ya existe: clips del teléfono, una grabación anterior, webinars grabados o videos de producto que nunca se recortaron. La edición es remota, no necesita visita y muestra rápido qué tipo de tomas faltan. Empieza por grabar cuando el negocio no tiene nada que muestre el servicio real, el espacio, el equipo o el producto en uso. La grabación se reserva por hora o como día de producción, y una sola sesión se puede planear para alimentar semanas de ediciones, con los recortes verticales y horizontales decididos antes de grabar. En ambos casos, el primer mensaje debe listar el material que ya existe, para no pagar por grabar algo que ya tienes.",
    ],
  },
];

export function pageQuestionsFor(path: string): readonly PageQuestion[] {
  return PAGE_QUESTIONS.filter((entry) => entry.path === path);
}
