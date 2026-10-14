// Answers for the "ready to build" rows of the demand coverage map
// (vault: client-esteban-media/wiki/esteban-demand-coverage-map-2026-10-14,
// gap rows DM-1..DM-40 in esteban-overnight-loop-2026-10-14).
//
// Each entry answers a query family that people really type (Google
// autocomplete hl=en/es, gl=us/co/mx, and Search Console 90 days) and that the
// map classified WEAK or WRONG PAGE: the words were not in a heading, or the
// answer sat below the first screen, or Google ranked a hub instead.
//
// Claim discipline:
//   - every figure is read from lib/pricing.ts (or lib/packages.ts, which reads
//     it); none is typed here;
//   - the only new owner facts are the 2026-10-14 ones (filming from $80 per
//     hour, editing per video, vlogs yes, Latin American clients remote);
//   - no client, result, follower count, drone work or on-camera UGC is claimed;
//     English is "intermediate".
//
// Shape: one question-shaped H2 per section, the answer in the first sentence,
// 100-180 words, rendered by <OwnerFactAnswers path=... /> (server-rendered).

import type { OwnerFactSection } from "@/lib/owner-fact-answers";
import { priceSentence } from "@/lib/packages";
import {
  ARRANQUE_WEEKLY_TERMS as T,
  PRICING_BANDS,
  RESTAURANT_PROMO,
  SHORT_FORM,
  filmingHourlyText,
  shortFormWeeklyText,
  usd,
  type PricingBandId,
} from "@/lib/pricing";

const perVideo = usd(SHORT_FORM.perVideoFrom);
const market = (l: "en" | "es") =>
  l === "es"
    ? `${usd(SHORT_FORM.marketMin)} a ${usd(SHORT_FORM.marketMax)}`
    : `${usd(SHORT_FORM.marketMin)}–${usd(SHORT_FORM.marketMax)}`;
const band = (id: PricingBandId, l: "en" | "es" = "en") =>
  l === "es"
    ? `${usd(PRICING_BANDS[id].baseMin)} a ${usd(PRICING_BANDS[id].baseMax)}`
    : `${usd(PRICING_BANDS[id].baseMin)}–${usd(PRICING_BANDS[id].baseMax)}`;
const bandMarket = (id: PricingBandId, l: "en" | "es" = "en") =>
  l === "es"
    ? `${usd(PRICING_BANDS[id].marketMin)} a ${usd(PRICING_BANDS[id].marketMax)}`
    : `${usd(PRICING_BANDS[id].marketMin)}–${usd(PRICING_BANDS[id].marketMax)}`;
const enLocal = () => priceSentence("en", "presencia-local").toLowerCase();
const esLocal = () => priceSentence("es", "presencia-local").toLowerCase();

// ---------------------------------------------------------------------------
// English service pages
// ---------------------------------------------------------------------------

// DM-14 (autocomplete x5 "how much does a videographer cost", "videographer
// price per hour"; 0 EN pages carried the hourly rate in a heading) and the
// Fort Lauderdale half of DM-16 ("videographer fort lauderdale").
const VIDEOGRAPHER_COST_FTL: OwnerFactSection = {
  id: "videographer-cost",
  heading: "How much does a videographer cost in Fort Lauderdale?",
  paragraphs: [
    `A videographer in Fort Lauderdale with Esteban Moreno Media costs ${filmingHourlyText("en")}, which is the minimum for time on location, and editing is priced separately, from ${perVideo} per video on the Starter package. A full production day at your business, with planning, filming and the edit, is the Local Presence package, ${enLocal()}. Every shoot gets a written quote before the date is booked, so the hours, the place and the finished files are agreed first.`,
    `Two lines on the quote keep the price easy to read: filming time and editing. An hour of filming that becomes three short videos is billed as the filming plus three edits, not as a package with a vague total. If you already have footage, there is no filming line and you pay for editing only. Esteban works from Fort Lauderdale across Broward and Miami-Dade, in Spanish first with intermediate English.`,
  ],
};

// DM-34 (autocomplete x6 "how to clip part of a podcast"): the how-to first,
// then the offer.
const PODCAST_HOW_TO_CLIP: OwnerFactSection = {
  id: "how-to-clip-a-podcast",
  heading: "How do you clip part of a podcast?",
  paragraphs: [
    `Pick a stretch that makes sense on its own, mark where it starts and ends, and cut it into a vertical video with captions. First, listen for a moment with one clear idea: an answer, a story or a strong opinion that a stranger understands without the rest of the episode. Second, write down the start and end times so the cut begins on the point, not on the setup. Third, reframe the recording to 9:16 so the speaker's face stays in the frame, and burn in captions, because many people watch with the sound off. Fourth, export one file per platform: Reels, TikTok and Shorts accept the same vertical video.`,
    `If you would rather send the episode and get the clips back, Esteban Moreno Media edits each clip from ${perVideo} per video on the Starter package, or ${shortFormWeeklyText("en")} if a new episode goes out every week. Each weekly clip runs up to ${T.maxVideoSeconds} seconds.`,
  ],
};

// DM-35 (autocomplete "restaurant videographer", "restaurant videographer near
// me"; the best match was a guide, not this service page).
const RESTAURANT_VIDEOGRAPHER: OwnerFactSection = {
  id: "restaurant-videographer",
  heading: "Restaurant videographer in Miami: what do filming and editing cost?",
  paragraphs: [
    `A restaurant promo edited from your own footage starts at ${usd(RESTAURANT_PROMO.from)} per project, and if you want Esteban Moreno Media to film at the restaurant as well, filming is ${filmingHourlyText("en")}. The two are quoted as separate lines, so a venue that already has good clips of the kitchen and the room pays for the edit only, and a venue that has nothing yet adds the filming time. A full production day, with planning, filming and the edit, is the Local Presence package, ${enLocal()}.`,
    `Restaurant filming works best when the shoot is planned around service: the dishes that sell, the bar at its busiest hour, the staff who agree to be on camera, and a quiet window for the room shots. The published Bar Door Monkey Miami promo, which Esteban filmed and edited for the venue, shows the style. Every project gets a written quote first.`,
  ],
};

// DM-9 (vlogs: 52 autocomplete queries, 0 pages, "vlog editing rates").
// Deepens the creator page; the vlog yes/no answer is already there (#434).
const VLOG_RATES_EN: OwnerFactSection = {
  id: "vlog-editing-rates",
  heading: "What do vlog editing rates look like?",
  paragraphs: [
    `Vlog editing rates depend mostly on length, and Esteban Moreno Media prices them per video, never per hour. A short vlog-style post for Reels, TikTok or Shorts is the Starter package, from ${perVideo} per video, and if you post every week it is ${shortFormWeeklyText("en")}, each video up to ${T.maxVideoSeconds} seconds from up to ${T.maxFootageMinutes} minutes of footage. A full YouTube vlog falls in the calculator's YouTube band, ${band("youtube")} per edit, which was checked against a published market range of ${bandMarket("youtube")} per YouTube edit.`,
    `What moves the price inside that band is how much footage there is, how many cuts it takes to keep the story moving, and whether you want music, titles, maps or a thumbnail frame. Send one vlog's original files and the length you want; the written quote fixes the price before editing starts. Filming, if you want it, is ${filmingHourlyText("en")}.`,
  ],
};

// DM-27 (autocomplete "freelance video editor rates", "... near me", "... for
// hire"; the freelance guide answers it first but had 0 impressions and no
// link from the hiring page with those words).
const FREELANCE_RATES_EN: OwnerFactSection = {
  id: "freelance-editor-rates",
  heading: "What are freelance video editor rates?",
  paragraphs: [
    `Freelance video editor rates usually come per video, per hour or per project, and the published market range for one edited short-form video is ${market("en")}. Esteban Moreno Media is a freelance editor based in Fort Lauderdale who prices per video: from ${perVideo} for a Reel, TikTok or Short on the Starter package, or ${shortFormWeeklyText("en")} on a weekly plan. Longer work is quoted by band: a YouTube edit is ${band("youtube")}, and a corporate or explainer edit is ${band("corporate")}.`,
    `To compare two freelancers fairly, ask both the same questions: how many rounds of changes are included, who keeps the project files, and whether captions and extra sizes cost more. The [freelance video editor vs post-production agency guide](/guides/freelance-video-editor-vs-post-agency) compares freelance video editor rates with agency hourly billing, and when each one fits. Remote editing works the same from anywhere in the US.`,
  ],
};

// ---------------------------------------------------------------------------
// Spanish niche pages (rendered by the OwnerFactAnswers slot in
// components/spanish-niche-page.tsx, right after the price section)
// ---------------------------------------------------------------------------

// DM-18 (autocomplete x10, the most-suggested query of the matrix:
// "editor de videos para youtube", "+ freelancer", "contratar ...").
const YOUTUBE_EDITOR_ES: OwnerFactSection = {
  id: "editor-de-videos-para-youtube",
  heading: "Editor de videos para YouTube: ¿cuánto cuesta y cómo se entrega?",
  paragraphs: [
    `Un editor de videos para YouTube con Esteban Moreno Media cuesta entre ${band("youtube", "es")} por edición de un video largo, el rango de YouTube de la calculadora, que se comparó con un rango publicado del mercado de ${bandMarket("youtube", "es")} por edición. Los clips cortos que salen de ese mismo video, para Shorts, Reels o TikTok, van desde ${perVideo} por video con el paquete Arranque.`,
    `La entrega es a distancia: subes los archivos originales a Google Drive o Dropbox, explicas la idea del video y la duración que buscas, y recibes el video terminado por el mismo enlace, listo para subir a tu canal. El precio dentro del rango depende de cuánto material hay, cuántos cortes necesita la historia y si quieres títulos, música o gráficos. La cotización por escrito fija el precio y las rondas de cambios antes de empezar, y todo se habla en español.`,
  ],
};

// DM-19 (autocomplete gl=mx "cuanto cobra un editor de videos de youtube en
// mexico"). Remote work and USD only; no payment method was given, so none is
// named.
const YOUTUBE_LATAM_ES: OwnerFactSection = {
  id: "youtube-mexico-colombia",
  heading: "¿Cuánto cobra un editor de videos de YouTube si estás en México o Colombia?",
  paragraphs: [
    `Lo mismo que en Miami: los precios de Esteban Moreno Media están en dólares estadounidenses (USD) y no cambian por país. Editar un video de YouTube va de ${band("youtube", "es")}, y un clip corto desde ${perVideo}. Esteban trabaja a distancia con clientes de Latinoamérica, y el español es su idioma principal de trabajo, así que el proyecto se habla en español desde la primera consulta.`,
    `Desde México, Colombia o cualquier otro país, el proceso es el mismo: envías el material por internet con un enlace de Google Drive o Dropbox, recibes los archivos terminados de la misma forma y no hace falta ningún envío físico ni reunión en persona. Antes de comparar con un editor local, pregunta a ambos lo mismo: qué incluye el precio, cuántas rondas de cambios hay y quién se queda con los archivos del proyecto. Cada proyecto recibe una cotización por escrito antes de empezar.`,
  ],
};

// DM-4 (GSC "editor de videos cortos miami" 4 imp @54.5 on /services, the EN
// hub): the exact phrase in a heading on the Spanish page that answers it.
const SHORT_EDITOR_MIAMI_ES: OwnerFactSection = {
  id: "editor-de-videos-cortos-en-miami",
  heading: "¿Buscas un editor de videos cortos en Miami?",
  paragraphs: [
    `Esteban Moreno Media es un editor de videos cortos en Miami y Fort Lauderdale que edita Reels, TikToks y YouTube Shorts a partir de los clips que tú grabas, desde ${perVideo} por video con el paquete Arranque. Si publicas cada semana, el mismo servicio va ${shortFormWeeklyText("es")}, con un mínimo de ${T.minimumWeeks} semanas, y cada video semanal dura hasta ${T.maxVideoSeconds} segundos.`,
    `La edición es a distancia, así que no importa en qué parte de Miami-Dade estés: envías los archivos originales, Esteban corta las pausas, ordena la historia, pone subtítulos dentro de la zona segura y exporta en vertical 9:16. Si además necesitas que alguien grabe en tu negocio, la grabación va ${filmingHourlyText("es")}. Todo se habla en español, y su inglés es intermedio para proyectos bilingües. Las tarifas publicadas del mercado para un video corto van de ${market("es")}.`,
  ],
};

// DM-5 (GSC "editor de video fort lauderdale" 4 imp @43 on /areas).
const VIDEO_EDITOR_FTL_ES: OwnerFactSection = {
  id: "editor-de-video-en-fort-lauderdale",
  heading: "¿Buscas un editor de video en Fort Lauderdale?",
  paragraphs: [
    `Esteban Moreno Media es un editor de video con base en Fort Lauderdale, que atiende en español primero a negocios y creadores de Broward y Miami-Dade. Edita Reels, TikToks, Shorts, videos para la web y videos de YouTube con el material que ya tienes: un video corto cuesta desde ${perVideo} con el paquete Arranque, y la edición de YouTube va de ${band("youtube", "es")} por video.`,
    `Estar en la misma ciudad ayuda cuando hace falta grabar: la grabación en tu negocio va ${filmingHourlyText("es")}, y un día completo de producción, con planificación, grabación y edición, va ${esLocal()}. Si ya grabaste, todo puede ser a distancia: envías los archivos por Google Drive o Dropbox y recibes el video terminado por el mismo enlace. Cada proyecto recibe una cotización por escrito antes de empezar, con las rondas de cambios incluidas.`,
  ],
};

// DM-24 (autocomplete x6 "editor de reels freelance", co+mx+us).
const REELS_FREELANCE_ES: OwnerFactSection = {
  id: "reels-freelance-o-agencia",
  heading: "¿Editor de Reels freelance o agencia?",
  paragraphs: [
    `Un editor de Reels freelance conviene cuando quieres hablar directo con quien edita y pagar por video; una agencia conviene cuando la campaña necesita varios especialistas a la vez. Esteban Moreno Media es un editor freelance: la persona que lee tus notas es la misma que hace el cambio, y el precio es por video, desde ${perVideo} con el paquete Arranque, o ${shortFormWeeklyText("es")} si publicas cada semana.`,
    `La ventaja de un freelance es el trato directo y un precio que queda fijo antes de editar; el límite es la capacidad, porque una sola persona tiene un calendario finito. Antes de decidir, pregunta a cada opción cuántas rondas de cambios incluye, quién guarda los archivos y qué pasa si el editor no está disponible. La guía [editor local vs Fiverr vs agencia](/es/guias/editor-local-vs-fiverr-vs-agencia-miami) compara las tres opciones con precios y fuentes.`,
  ],
};

// DM-40 (autocomplete "que es contenido ugc", "... en instagram", "como hacer
// videos ugc"; the Instagram variant was buried). He EDITS UGC; on-camera UGC
// creation is not confirmed, so it is not offered.
const WHAT_IS_UGC_ES: OwnerFactSection = {
  id: "que-es-el-contenido-ugc",
  heading: "¿Qué es el contenido UGC en Instagram y cómo se hacen videos UGC?",
  paragraphs: [
    `El contenido UGC (user-generated content, contenido generado por usuarios) es un video que parece hecho por un cliente real y no por la marca: alguien que muestra el producto con su celular, lo usa y dice qué le pareció. En Instagram se publica como Reel o como anuncio, y funciona porque se ve como una recomendación y no como publicidad.`,
    `Un video UGC se hace en tres pasos: alguien graba en vertical, con el celular y con buena luz, abriendo el empaque, usando el producto y hablando a cámara; después se edita con un gancho en los primeros segundos, subtítulos y un cierre que diga qué hacer; y al final se exporta en 9:16 para Reels, TikTok o anuncios. Esteban Moreno Media hace la parte de edición con los clips que tú o tus creadores graban, desde ${perVideo} por video. No graba UGC frente a cámara.`,
  ],
};

// DM-7 (GSC "editor de videos ugc miami" 3 imp @52 on /areas).
const UGC_EDITOR_MIAMI_ES: OwnerFactSection = {
  id: "editor-de-videos-ugc-en-miami",
  heading: "¿Buscas un editor de videos UGC en Miami?",
  paragraphs: [
    `Esteban Moreno Media es un editor de videos UGC en Miami y Fort Lauderdale para marcas de e-commerce: recibe los clips que graban tus clientes o creadores y los convierte en anuncios y Reels con gancho, subtítulos y llamado a la acción. Un video UGC corto cuesta desde ${perVideo} con el paquete Arranque; un lote de anuncios con varias versiones se cotiza en el rango de e-commerce de la calculadora, ${band("ecommerce", "es")}.`,
    `La edición es a distancia, así que la marca puede estar en Miami o en otro estado: envías los archivos originales y las reglas de la marca, y recibes cada versión exportada en vertical 9:16. Si la campaña necesita varias aperturas para probar cuál funciona mejor, pídelo en el brief, porque cada apertura es una versión distinta. Todo se habla en español, con inglés intermedio para marcas bilingües.`,
  ],
};

// DM-20 (autocomplete x4 "editor de video para creadores de contenido",
// "mejor editor de video para creadores de contenido").
const CREATOR_EDITOR_ES: OwnerFactSection = {
  id: "editor-de-video-para-creadores-de-contenido",
  heading: "¿Cómo elegir un editor de video para creadores de contenido?",
  paragraphs: [
    `Un buen editor de video para creadores de contenido entiende tu estilo, entrega a tiempo cada semana y cobra un precio que sabes antes de empezar. Esteban Moreno Media edita para creadores e influencers con los clips que tú grabas: desde ${perVideo} por video con el paquete Arranque, o ${shortFormWeeklyText("es")} si publicas cada semana, con un mínimo de ${T.minimumWeeks} semanas y entrega en ${T.deliveryHoursMin} a ${T.deliveryHoursMax} horas por video semanal.`,
    `Para saber si un editor es el indicado, pídele que edite un solo video de prueba con tu material y fíjate en tres cosas: si mantuvo tu voz y tu forma de hablar, si los subtítulos quedaron dentro de la zona segura y si el gancho de los primeros segundos se entiende sin sonido. Las tarifas publicadas del mercado para un video corto van de ${market("es")}, así que compara lo que incluye cada oferta y no solo el precio.`,
  ],
};

// DM-9 (vlogs, ES side: "editor de vlogs", "editor de video vlogs").
const VLOG_EDITOR_ES: OwnerFactSection = {
  id: "editor-de-vlogs",
  heading: "¿Cuánto cobra un editor de vlogs para YouTube?",
  paragraphs: [
    `Un editor de vlogs cobra según la duración, y Esteban Moreno Media lo cobra por video, nunca por hora. Un vlog completo para YouTube entra en el rango de YouTube de la calculadora, ${band("youtube", "es")} por edición, comparado con un rango publicado del mercado de ${bandMarket("youtube", "es")}. Un vlog corto para Reels, TikTok o Shorts es el paquete Arranque, desde ${perVideo} por video.`,
    `Esteban graba y edita vlogs. Si grabas tú, envías los archivos originales y él quita los tiempos muertos, mantiene la historia en el orden en que la viviste, y agrega subtítulos, música y un título. Lo que mueve el precio dentro del rango es cuánto material hay, cuántos cortes necesita y si quieres mapas, títulos animados o una imagen de portada. Si prefieres que él grabe, la grabación va ${filmingHourlyText("es")}. La cotización por escrito fija el precio antes de editar.`,
  ],
};

// ---------------------------------------------------------------------------
// Registry, merged into ownerFactAnswers(path).
// ---------------------------------------------------------------------------

export const DEMAND_MAP_ANSWERS: Readonly<Record<string, readonly OwnerFactSection[]>> = {
  "/services/video-production-fort-lauderdale": [VIDEOGRAPHER_COST_FTL],
  "/services/podcast-clipping-service-miami": [PODCAST_HOW_TO_CLIP],
  "/services/restaurant-promo-video-editing-miami": [RESTAURANT_VIDEOGRAPHER],
  "/services/content-creator-video-editing-miami": [VLOG_RATES_EN],
  "/services/hire-remote-video-editor": [FREELANCE_RATES_EN],
  "/es/contratar-editor-de-video-remoto": [YOUTUBE_EDITOR_ES, YOUTUBE_LATAM_ES],
  "/es/editor-de-video-corto-para-redes-miami": [SHORT_EDITOR_MIAMI_ES],
  "/es/editor-de-reels-fort-lauderdale": [VIDEO_EDITOR_FTL_ES, REELS_FREELANCE_ES],
  "/es/editor-de-video-ugc-para-ecommerce": [WHAT_IS_UGC_ES, UGC_EDITOR_MIAMI_ES],
  "/es/edicion-de-video-para-creadores-de-contenido-miami": [CREATOR_EDITOR_ES],
  "/es/servicio-de-edicion-de-video-para-youtube-miami": [VLOG_EDITOR_ES],
};

// ---------------------------------------------------------------------------
// Pricing hubs (DM-26: autocomplete x5 "what is the going rate for video
// editing", x3 "how much do editors charge per video"). Visible + FAQPage.
// ---------------------------------------------------------------------------

export function goingRateAnswer(locale: "en" | "es"): { question: string; answer: string } {
  return locale === "es"
    ? {
        question: "¿Cuánto se cobra normalmente por editar un video?",
        answer: `El rango publicado del mercado en el sur de Florida para editar un video corto es de ${market("es")} por video, y una edición de YouTube va de ${bandMarket("youtube", "es")}. Esteban Moreno Media cobra por video, no por hora: un video corto desde ${perVideo} con el paquete Arranque, en la parte baja de ese rango, y una edición de YouTube de ${band("youtube", "es")}. Un video corporativo o explicativo va de ${band("corporate", "es")}, comparado con un mercado de ${bandMarket("corporate", "es")}. Esos rangos del mercado salen de guías de tarifas publicadas en 2026 y sirven para comparar; el precio de tu proyecto lo fija una cotización por escrito antes de editar, con las rondas de cambios incluidas. Si un editor cobra por hora, pregúntale cuántas horas suele tomar un video como el tuyo para poder comparar.`,
      }
    : {
        question: "What is the going rate for video editing?",
        answer: `The published South Florida market range for editing one short-form video is ${market("en")} per video, and a YouTube edit runs ${bandMarket("youtube")}. Esteban Moreno Media charges per video, not per hour: a short video from ${perVideo} on the Starter package, at the low end of that range, and a YouTube edit at ${band("youtube")}. A corporate or explainer edit is ${band("corporate")}, against a market range of ${bandMarket("corporate")}. Those market ranges come from published 2026 rate guides and are there to compare against; the price of your project is set by a written quote before editing starts, with the rounds of changes included. If an editor bills by the hour, ask how many hours a video like yours usually takes, so the two prices compare.`,
      };
}
