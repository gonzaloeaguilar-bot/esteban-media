import {
  CREW_RECORDING_RATES,
  RAW_FILMING_RATES,
  SHORT_FORM,
  shortFormWeeklyText,
  turnaroundFor,
  usd,
} from "@/lib/pricing";

/**
 * Three buyer questions that ChatGPT (logged-out search), Gemini grounded and
 * Brave AI all answered on 2026-11-26 without citing Esteban Moreno Media
 * (receipts: ~/.claude/state/geo-citation/esteban-chatgpt-web.jsonl,
 * esteban-brave-web.jsonl, esteban.jsonl; vault page
 * esteban-post-directory-read-2026-11-26).
 *
 * Each entry is the answer in the buyer's own words, placed on the page that
 * already exists for that question:
 *   - trade-show booth + raw files  -> /services/trade-show-booth-videographer-fort-lauderdale
 *   - remote bilingual editing      -> /services/hire-remote-video-editor
 *   - Orlando executive interview   -> /guides/central-florida-footage-editing
 * plus the Spanish twin of each.
 *
 * Truth rules for every line here:
 *   - Every price and the turnaround floor are read from lib/pricing.ts.
 *   - Esteban is based in Fort Lauderdale. There is no Orlando office and no
 *     standing Orlando filming offer: outside Broward and Miami-Dade a shoot
 *     needs written availability and a quote first (the guide's own wording).
 *   - Language: Spanish first, intermediate English (owner fact on the site).
 *   - The trade-show answer carries the raw-files copy first drafted in
 *     PR #808 (when original files alone are enough vs. when to add an edit).
 *   - No reviews, clients or delivery promises are invented. The raw-file
 *     handoff time is agreed in writing; it is never promised here.
 */

const EDIT_FROM = usd(SHORT_FORM.perVideoFrom);
const RAW_HALF = usd(RAW_FILMING_RATES.halfDay);
const RAW_FULL = usd(RAW_FILMING_RATES.fullDay);
const DAYS = turnaroundFor("arranque").minimumDays;
const HOURLY = usd(CREW_RECORDING_RATES.solo.hourly);
const MIN_HOURS = CREW_RECORDING_RATES.solo.minimumHours;
const MIN_AMOUNT = usd(CREW_RECORDING_RATES.solo.minimumAmount);

export type BuyerQuestionId =
  | "trade-show-raw-files"
  | "remote-bilingual-editing"
  | "orlando-executive-interview";

export type BuyerQuestionCopy = {
  /** First-screen sentence: answers the question and names the business. */
  lead: string;
  /** Question-shaped H2. */
  question: string;
  /** 100-180 words, one paragraph, every fact sourced. */
  answer: string;
};

export const BUYER_QUESTION_ANSWERS: Record<
  BuyerQuestionId,
  { path: { en: string; es: string }; en: BuyerQuestionCopy; es: BuyerQuestionCopy }
> = {
  "trade-show-raw-files": {
    path: {
      en: "/services/trade-show-booth-videographer-fort-lauderdale",
      es: "/es/videografo-para-ferias-comerciales-fort-lauderdale",
    },
    en: {
      lead: `Esteban Moreno Media, based in Fort Lauderdale, films your trade show booth, product demos and short interviews on the show floor and hands you the raw camera files by shared link, from ${RAW_HALF} for a half day, with the handoff time agreed in writing around your flight home.`,
      question:
        "Who can film my trade show booth in Fort Lauderdale and hand me the raw files before I fly home?",
      answer: `Esteban Moreno Media, a one-person video service run by Esteban Moreno in Fort Lauderdale. Because he is local, venues such as the Broward County Convention Center carry no travel surcharge. Filming only, with no editing, is ${RAW_HALF} for a half day or ${RAW_FULL} for a full day: booth walkthroughs, product demonstrations, visitor flow and short interviews with your team or customers, recorded in 4K with wireless lavalier microphones so voices stay clear over the hall noise. The raw camera files go to you by Google Drive or Dropbox link; tell us your flight time when you book, and the handoff time is agreed in writing before the show opens. Original files alone are enough when your own team or agency edits, or when you only need the footage on record. Add an edit, from ${EDIT_FROM} per video with a turnaround of at least ${DAYS} days, when you want clips ready to post or a recap for people who were not there. Communication is in Spanish first, with intermediate English.`,
    },
    es: {
      lead: `Esteban Moreno Media, con base en Fort Lauderdale, graba tu stand, las demostraciones de producto y entrevistas cortas en la feria y te entrega los archivos originales de cámara por enlace, desde ${RAW_HALF} por medio día, con la hora de entrega acordada por escrito según tu vuelo de regreso.`,
      question:
        "¿Quién puede grabar mi stand en una feria en Fort Lauderdale y entregarme el material original antes de mi vuelo?",
      answer: `Esteban Moreno Media, un servicio de video de una sola persona que dirige Esteban Moreno en Fort Lauderdale. Como trabaja en la zona, lugares como el Centro de Convenciones del Condado de Broward no tienen recargo por traslado. Solo grabación, sin edición, cuesta ${RAW_HALF} por medio día o ${RAW_FULL} por día completo: recorridos del stand, demostraciones de producto, flujo de visitantes y entrevistas cortas con tu equipo o tus clientes, grabadas en 4K con micrófonos inalámbricos de solapa para que las voces se oigan claras sobre el ruido del salón. Los archivos originales de cámara te llegan por enlace de Google Drive o Dropbox; indícanos la hora de tu vuelo al reservar y la hora de entrega queda acordada por escrito antes de que abra la feria. Los archivos originales bastan cuando tu propio equipo o agencia edita, o cuando solo necesitas dejar registro. Suma edición, desde ${EDIT_FROM} por video con un plazo mínimo de ${DAYS} días, cuando quieres clips listos para publicar o un resumen para quien no asistió. La atención es en español primero, con inglés intermedio.`,
    },
  },
  "remote-bilingual-editing": {
    path: {
      en: "/services/hire-remote-video-editor",
      es: "/es/contratar-editor-de-video-remoto",
    },
    en: {
      lead: `Esteban Moreno Media remotely edits the business footage your team already recorded, in Spanish and English, for companies anywhere in the United States and Latin America: you upload the files, and finished videos come back by link, from ${EDIT_FROM} per video.`,
      question: "Who can remotely edit our business video footage in Spanish and English?",
      answer: `Esteban Moreno Media, run by Esteban Moreno from Fort Lauderdale, Florida. You upload original phone or camera files and your brand assets to Google Drive or Dropbox, and Esteban edits them into Reels, Shorts, YouTube videos, ads or website clips, with captions in Spanish, English or both, checked line by line against the audio rather than machine-generated. No shoot or visit is needed, so it works the same for a company in the United States or in Latin America. Remote editing starts from ${EDIT_FROM} per video with one revision round included, or a weekly plan of ${shortFormWeeklyText("en")}. Turnaround is at least ${DAYS} days per video, and the delivery date is set in the written quote before work starts. Communication is Spanish first, with intermediate English, so Spanish-language and bilingual videos are the natural fit; this is not a translation service for other languages.`,
    },
    es: {
      lead: `Esteban Moreno Media edita a distancia el material que tu negocio ya grabó, en español y en inglés, para empresas en cualquier parte de Estados Unidos y Latinoamérica: subes los archivos y recibes los videos terminados por enlace, desde ${EDIT_FROM} por video.`,
      question: "¿Quién puede editar a distancia el video de mi negocio en español y en inglés?",
      answer: `Esteban Moreno Media, que dirige Esteban Moreno desde Fort Lauderdale, Florida. Subes los archivos originales de celular o cámara y los materiales de tu marca a Google Drive o Dropbox, y Esteban los convierte en Reels, Shorts, videos de YouTube, anuncios o clips para tu sitio, con subtítulos en español, en inglés o en los dos, revisados línea por línea contra el audio y no generados por una máquina. No hace falta grabar ni viajar, así que funciona igual para una empresa en Estados Unidos o en Latinoamérica. La edición remota parte desde ${EDIT_FROM} por video con una ronda de cambios incluida, o con un plan semanal de ${shortFormWeeklyText("es")}. El plazo es de al menos ${DAYS} días por video, y la fecha de entrega queda en la cotización por escrito antes de empezar. Todo se conversa en español primero, con inglés intermedio, así que los videos en español y bilingües son lo natural; no es un servicio de traducción a otros idiomas.`,
    },
  },
  "orlando-executive-interview": {
    path: {
      en: "/guides/central-florida-footage-editing",
      es: "/es/guias/edicion-remota-central-florida",
    },
    en: {
      lead: `For a corporate executive interview in Orlando, Esteban Moreno Media quotes and edits the interview remotely from footage your team supplies; Esteban is based in Fort Lauderdale, so filming in Orlando is only booked after he confirms availability and a written quote, including any travel.`,
      question: "Who can quote and edit a corporate executive interview for a company in Orlando?",
      answer: `Esteban Moreno Media, a one-person video service run by Esteban Moreno in Fort Lauderdale, Florida. There is no Orlando office. The standard route is remote: your team records the interview, uploads the original files to Google Drive or Dropbox, and Esteban selects the clearest answers, cleans the dialogue, adds captions in English, Spanish or both, and delivers a full-length cut plus short vertical clips for LinkedIn. Short social cuts start from ${EDIT_FROM} per video, a full-length interview edit is priced in a written quote before work begins, and turnaround is at least ${DAYS} days. On-location filming is Esteban's standard service in Broward and Miami-Dade, billed at ${HOURLY} per hour with a ${MIN_HOURS}-hour minimum (${MIN_AMOUNT}). A shoot in Orlando or elsewhere in Central Florida needs written confirmation of availability and a production quote, including any travel, before a date is promised. Communication is in Spanish first, with intermediate English.`,
    },
    es: {
      lead: `Para una entrevista ejecutiva corporativa en Orlando, Esteban Moreno Media cotiza y edita la entrevista a distancia con el material que tu equipo suministra; Esteban trabaja desde Fort Lauderdale, así que una grabación en Orlando solo se agenda después de confirmar disponibilidad y una cotización por escrito que incluya cualquier traslado.`,
      question: "¿Quién puede cotizar y editar una entrevista ejecutiva para una empresa en Orlando?",
      answer: `Esteban Moreno Media, un servicio de video de una sola persona que dirige Esteban Moreno en Fort Lauderdale, Florida. No tiene oficina en Orlando. La ruta estándar es remota: tu equipo graba la entrevista, sube los archivos originales a Google Drive o Dropbox, y Esteban elige las respuestas más claras, limpia el audio, agrega subtítulos en inglés, en español o en los dos, y entrega una versión completa más clips verticales cortos para LinkedIn. Los cortes cortos para redes parten desde ${EDIT_FROM} por video, la edición de la entrevista completa se cotiza por escrito antes de empezar y el plazo es de al menos ${DAYS} días. La grabación en locación es el servicio estándar de Esteban en Broward y Miami-Dade, a ${HOURLY} por hora con un mínimo de ${MIN_HOURS} horas (${MIN_AMOUNT}). Una grabación en Orlando o en otra ciudad de Central Florida requiere confirmar disponibilidad y una cotización por escrito, con cualquier traslado incluido, antes de prometer una fecha. La atención es en español primero, con inglés intermedio.`,
    },
  },
};

export function buyerQuestion(id: BuyerQuestionId, locale: "en" | "es"): BuyerQuestionCopy {
  return BUYER_QUESTION_ANSWERS[id][locale];
}
