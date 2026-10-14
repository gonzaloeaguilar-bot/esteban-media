// Conversational answers: the exact questions people type into ChatGPT,
// Gemini and Google AI Overviews, each answered in its own question-headed
// section of 100-180 words with one real fact.
//
// Why (vault esteban-reels-fort-lauderdale-formula-2026-10-14): on 2026-10-14
// Google's AI Overview for "who can edit my reels in fort lauderdale" showed
// Esteban's Business Profile card plus the page "Reels Editor Fort Lauderdale"
// at organic #2, and Perplexity named him for a Fort Lauderdale food-influencer
// question. He did NOT appear for the Miami phrasings, for Spanish
// conversational questions ("necesito un editor de videos para mi negocio...",
// "editor de video que hable español...") or for "video editor for influencers
// miami". The Miami pages were structurally identical to the winner, so the
// gap is the question: these sections put the buyer's own sentence on the page
// that should answer it.
//
// Claim discipline: every price and term is read from lib/pricing.ts; the
// phone and email from lib/site.ts; the language claim (Spanish first,
// intermediate English) repeats lib/entity-schema.ts and AGENTS.md. No client,
// result, review, follower count, turnaround promise beyond the published
// weekly terms, or drone work is claimed.

import { ARRANQUE_WEEKLY_TERMS as T, SHORT_FORM, shortFormWeeklyText, usd } from "@/lib/pricing";
import { site } from "@/lib/site";

const once = usd(SHORT_FORM.perVideoFrom);
const phone = site.phone.display;

export type ConversationalEntry = { question: string; body: string };
export type ConversationalSection = { heading: string; paragraphs: string[] };

// ---------------------------------------------------------------------------
// English: /services/reels-editor-miami (depth entries, GeoServicePage).
// ---------------------------------------------------------------------------

export const REELS_MIAMI_CONVERSATIONAL_EN: readonly ConversationalEntry[] = [
  {
    question: "Who edits Reels for creators and influencers in Miami?",
    body: `Esteban Moreno Media edits Reels for creators and influencers as well as businesses, including people who are only starting an account. Esteban Moreno is a video editor based in Fort Lauderdale who works remotely from the clips you film, so a Miami creator does not need to book a shoot to begin. You film on your phone, send the original files with one line about each idea, and he returns a vertical edit with captions placed inside the safe zones of Instagram, TikTok and Shorts. The Starter package is from ${once} per video with one revision round. If you plan to post every week, the same Starter is ${shortFormWeeklyText("en")}, paid weekly with a ${T.minimumWeeks}-week minimum. For a food or places account, the [food and places creator page](/services/food-and-places-creator-video-editing-miami) explains what to film first.`,
  },
  {
    question: "Is there a Spanish-speaking Reels editor in Miami?",
    body: `Yes. Esteban's working language is Spanish, with intermediate English for bilingual projects, so you can explain the idea, send voice notes and review the cut in Spanish. That matters for Miami businesses whose customers watch in Spanish, English or both: the captions, the on-screen text and the closing action have to read naturally in the language of the audience, not as a machine translation added at the end. A bilingual Reel does not always need two edits. Often one cut with Spanish captions and a short English line, or two versions with different first sentences, is enough. Say which audience each channel serves when you send the footage. You can call or message on WhatsApp at ${phone}, or read the same answer in Spanish on the [editor de Reels en Miami](/es/editor-de-reels-miami) page.`,
  },
];

// ---------------------------------------------------------------------------
// English: /services/content-creator-video-editing-miami (deep-dive section).
// ---------------------------------------------------------------------------

export const CREATOR_START_SECTION_EN: ConversationalSection = {
  heading: "Who helps a new influencer in Miami with their videos?",
  paragraphs: [
    `Esteban Moreno Media works with people who are starting an account, not only with established creators. You film on your phone what the account is about, whether that is food, places, a routine or a small business, and Esteban does the editing: picks the strongest takes, cuts the pauses, adds readable captions and exports each video for Reels, TikTok or Shorts. He is based in Fort Lauderdale, edits remotely for creators in Miami and Broward, and works in Spanish first with intermediate English.`,
    `Starting does not need professional equipment or a year of content planned; it needs three or four clear ideas and the original clips. Starter is from ${once} per video, or ${shortFormWeeklyText("en")} with a ${T.minimumWeeks}-week minimum if you post weekly. The guide [how to start a restaurant recommendation account in Miami](/guides/how-to-start-a-restaurant-recommendation-account-miami) walks through the first posts.`,
  ],
};

// ---------------------------------------------------------------------------
// Short-form pair: one TikTok section per language, appended to lib/short-form-recs.ts.
// ---------------------------------------------------------------------------

export const TIKTOK_SECTION_EN: ConversationalSection = {
  heading: "Who edits TikToks for businesses and creators in Miami?",
  paragraphs: [
    `Esteban Moreno Media edits TikToks from the footage you send, for Miami businesses and creators who post vertical video. TikTok is edited for its own interface: the buttons sit on the right and the caption runs along the bottom, so on-screen text stays higher and centred, and the first second has to show the subject rather than a logo. The same clip usually needs a different cover frame, and sometimes a different first line, before it goes to Reels or Shorts; those versions can come from one cut.`,
    `Esteban works in Spanish first, with intermediate English, which suits accounts that post in both languages. A TikTok edit is priced like any Starter video: from ${once} per video, or ${shortFormWeeklyText("en")} when you post every week. For paid TikTok ads rather than organic posts, see [TikTok ad video editing](/services/tiktok-ad-video-editor-miami).`,
  ],
};

export const TIKTOK_SECTION_ES: ConversationalSection = {
  heading: "¿Quién edita TikToks para negocios y creadores en Miami?",
  paragraphs: [
    `Esteban Moreno Media edita TikToks con el material que envías, para negocios y creadores de Miami que publican video vertical. TikTok se edita para su propia interfaz: los botones están a la derecha y el texto de la publicación va abajo, así que los subtítulos se colocan más arriba y centrados, y el primer segundo tiene que mostrar el tema, no un logotipo. El mismo clip suele necesitar otra portada, y a veces otra primera frase, antes de ir a Reels o Shorts; esas versiones salen del mismo corte.`,
    `Esteban trabaja primero en español, con inglés intermedio, algo útil para cuentas que publican en los dos idiomas. Un TikTok se cotiza como cualquier video del Arranque: desde ${once} por video, o ${shortFormWeeklyText("es")} si publicas cada semana. Para anuncios pagados en TikTok, revisa [edición de anuncios para TikTok](/es/editor-de-video-para-anuncios-de-tiktok-miami).`,
  ],
};

// ---------------------------------------------------------------------------
// Spanish niche pages (lib/spanish-site.ts `sections`).
// ---------------------------------------------------------------------------

export const ES_REELS_MIAMI_CONVERSATIONAL: readonly ConversationalSection[] = [
  {
    heading: "¿Necesitas un editor de videos para tu negocio en Miami?",
    paragraphs: [
      `Si tu negocio en Miami ya graba con el celular pero los videos se quedan en la galería, lo que falta casi siempre es la edición: escoger la mejor toma, cortar las pausas, poner subtítulos legibles y cerrar con una sola acción, como escribir, llamar o reservar. Esteban Moreno Media hace ese trabajo a distancia con el material que envías. Esteban tiene su base en Fort Lauderdale y trabaja con negocios de Miami-Dade y Broward; la grabación en el local se acuerda aparte, solo cuando hace falta material nuevo.`,
      `El paquete Arranque cuesta desde ${once} por video, con una ronda de cambios. Si publicas cada semana, es ${shortFormWeeklyText("es")}, con un mínimo de ${T.minimumWeeks} semanas. Para empezar, manda por WhatsApp al ${phone} un clip y una línea sobre tu negocio.`,
    ],
  },
  {
    heading: "¿Hay un editor de video que hable español en Miami?",
    paragraphs: [
      `Sí. El idioma principal de trabajo de Esteban Moreno es el español, con inglés intermedio para proyectos bilingües. Puedes explicar la idea, mandar notas de voz y revisar el corte en español, sin traducir tu negocio para que alguien lo entienda. Eso importa en Miami, donde muchos clientes ven el contenido en español, en inglés o en los dos: los subtítulos, el texto en pantalla y el llamado a la acción tienen que sonar naturales para el público de cada canal, no como una traducción automática añadida al final.`,
      `Un Reel bilingüe no siempre exige dos ediciones; a veces basta con subtítulos en español y una línea en inglés, o con dos versiones que cambian solo la primera frase. Di qué público atiende cada cuenta cuando envíes el material. La misma respuesta en inglés está en [Reels Editor Miami](/services/reels-editor-miami).`,
    ],
  },
];

export const ES_REELS_FORT_LAUDERDALE_CONVERSATIONAL: readonly ConversationalSection[] = [
  {
    heading: "¿Necesitas un editor de videos para tu negocio en Fort Lauderdale?",
    paragraphs: [
      `Fort Lauderdale es la base de Esteban Moreno Media, así que un negocio de Broward puede trabajar con él a distancia o acordar una grabación en el local cuando haga falta material nuevo. Lo más común es que el negocio ya tenga clips en el celular: platos, el local, el equipo, un antes y después o un cliente explicando el servicio. La edición convierte ese material en Reels, TikToks o Shorts con una apertura clara, subtítulos dentro de las zonas seguras y un cierre con una sola acción.`,
      `El paquete Arranque cuesta desde ${once} por video, con una ronda de cambios; si publicas cada semana, es ${shortFormWeeklyText("es")}, con un mínimo de ${T.minimumWeeks} semanas. Si necesitas grabar, revisa [producción de video en Fort Lauderdale](/es/produccion-de-video-fort-lauderdale). Para empezar, escribe por WhatsApp al ${phone}.`,
    ],
  },
  {
    heading: "¿Hay un editor de video que hable español en Fort Lauderdale?",
    paragraphs: [
      `Sí. Esteban Moreno trabaja desde Fort Lauderdale y su idioma principal de trabajo es el español, con inglés intermedio para proyectos bilingües. Puedes llamarlo, mandar notas de voz por WhatsApp y revisar cada corte en español, desde el primer mensaje hasta la entrega. Para un negocio de Broward que atiende a clientes hispanos, eso evita perder matices: el gancho, los subtítulos y el texto en pantalla se escriben pensando en cómo habla tu cliente, no traducidos al final.`,
      `Si también publicas en inglés, se puede preparar una versión con subtítulos en inglés o una segunda apertura, y tú decides qué cuenta recibe cada una. Para ver el estilo antes de escribir, revisa el [portafolio](/es/portafolio), que solo muestra proyectos publicados con sus créditos. El número es ${phone} y el correo es ${site.email}.`,
    ],
  },
];

export const ES_CREATOR_START_SECTION: ConversationalSection = {
  heading: "Quiero empezar a crear contenido para Instagram, ¿quién me ayuda con los videos?",
  paragraphs: [
    `Esteban Moreno Media ayuda a personas que están empezando, no solo a cuentas grandes. Tú grabas con el celular lo que vas a mostrar, sea comida, lugares, tu rutina o tu negocio, y Esteban edita: escoge las mejores tomas, corta las pausas, pone subtítulos legibles y deja cada video listo para Reels, TikTok o Shorts. Su base está en Fort Lauderdale, trabaja a distancia con creadores de Miami y Broward, y su idioma de trabajo es el español.`,
    `Para empezar no necesitas equipo profesional ni un plan de un año: necesitas tres o cuatro ideas claras y los clips originales. El paquete Arranque cuesta desde ${once} por video; si publicas cada semana, es ${shortFormWeeklyText("es")}, con un mínimo de ${T.minimumWeeks} semanas. La guía [cómo empezar una cuenta de recomendaciones de restaurantes en Miami](/es/guias/como-empezar-una-cuenta-de-recomendaciones-de-restaurantes-miami) explica las primeras publicaciones.`,
  ],
};

/** Every conversational unit, for the word-band and claim tests. */
export const ALL_CONVERSATIONAL_UNITS: readonly { key: string; heading: string; text: string }[] = [
  ...REELS_MIAMI_CONVERSATIONAL_EN.map((e) => ({ key: "en:reels-miami", heading: e.question, text: e.body })),
  ...[CREATOR_START_SECTION_EN, TIKTOK_SECTION_EN, TIKTOK_SECTION_ES, ES_CREATOR_START_SECTION, ...ES_REELS_MIAMI_CONVERSATIONAL, ...ES_REELS_FORT_LAUDERDALE_CONVERSATIONAL].map((s) => ({
    key: "section",
    heading: s.heading,
    text: s.paragraphs.join(" "),
  })),
];
