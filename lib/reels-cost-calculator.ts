// "How much does it cost to edit my Reels every month?" — the free calculator.
//
// One input (videos per week) compared two ways, every figure read from
// lib/pricing.ts so a price change moves the calculator, the table and the
// answer sentence together:
//   - single videos: Starter, from $100 per video (PACKAGE_PRICES.arranque);
//   - the weekly Starter: $85 a week for 1 video, $160 a week for 2
//     (ARRANQUE_WEEKLY_OPTIONS), paid weekly with a 4-week minimum.
//
// Claim discipline: no weekly price exists above two videos a week, so the
// calculator never derives one (lib/pricing.ts SHORT_FORM says the same for
// the 15/30-a-month options). Above two it shows the per-video figure and says
// the rest is quoted. The "4 weeks" period is the plan's own minimum, not an
// invented month.

import {
  ARRANQUE_WEEKLY_OPTIONS,
  ARRANQUE_WEEKLY_TERMS,
  PACKAGE_PRICES,
  type ArranqueWeeklyOption,
  usd,
} from "@/lib/pricing";

export type CalcLocale = "en" | "es";

export const REELS_COST_CALCULATOR_PATHS = {
  en: "/reels-editing-cost-calculator",
  es: "/es/calculadora-de-costo-de-edicion-de-reels",
} as const;

/** The plan's minimum term, used as the comparison period everywhere. */
export const PERIOD_WEEKS = ARRANQUE_WEEKLY_TERMS.minimumWeeks;

const STARTER = PACKAGE_PRICES.arranque;
export const PER_VIDEO = STARTER.kind === "from" ? STARTER.amount : 0;

/** Rows the server-rendered table answers, 1 to 5 videos a week. */
export const VIDEOS_PER_WEEK_OPTIONS = [1, 2, 3, 4, 5] as const;

export type CostRow = {
  videosPerWeek: number;
  singlePerWeek: number;
  singlePerPeriod: number;
  plan: ArranqueWeeklyOption | null;
  planPerWeek: number | null;
  planPerPeriod: number | null;
  /** single minus plan over the period; null when no weekly plan exists. */
  savingPerPeriod: number | null;
};

export function costFor(videosPerWeek: number): CostRow {
  const n = Math.max(1, Math.round(videosPerWeek));
  const plan = ARRANQUE_WEEKLY_OPTIONS.find((o) => o.videosPerWeek === n) ?? null;
  const singlePerWeek = n * PER_VIDEO;
  const singlePerPeriod = singlePerWeek * PERIOD_WEEKS;
  const planPerWeek = plan ? plan.pricePerWeek : null;
  const planPerPeriod = plan ? plan.pricePerWeek * PERIOD_WEEKS : null;
  return {
    videosPerWeek: n,
    singlePerWeek,
    singlePerPeriod,
    plan,
    planPerWeek,
    planPerPeriod,
    savingPerPeriod: planPerPeriod === null ? null : singlePerPeriod - planPerPeriod,
  };
}

export const COST_ROWS: readonly CostRow[] = VIDEOS_PER_WEEK_OPTIONS.map(costFor);

const [ONE, TWO] = ARRANQUE_WEEKLY_OPTIONS;
const one = costFor(ONE.videosPerWeek);
const two = costFor(TWO.videosPerWeek);
/** The 1-a-week plan's minimum spend, in single videos it would buy. */
const minimumSpendInSingles = Math.floor((one.planPerPeriod ?? 0) / PER_VIDEO);

function videos(n: number, locale: CalcLocale): string {
  if (locale === "es") return n === 1 ? "1 video" : `${n} videos`;
  return n === 1 ? "1 video" : `${n} videos`;
}

/** The one-sentence result for a row, in the server HTML and the live card. */
export function resultSentence(row: CostRow, locale: CalcLocale): string {
  const n = videos(row.videosPerWeek, locale);
  if (locale === "es") {
    if (row.planPerPeriod !== null && row.savingPerPeriod !== null) {
      return `Con ${n} por semana, pagar por video cuesta ${usd(row.singlePerWeek)} por semana (${usd(row.singlePerPeriod)} en ${PERIOD_WEEKS} semanas). El plan semanal cuesta ${usd(row.planPerWeek!)} por semana (${usd(row.planPerPeriod)} en el mínimo de ${PERIOD_WEEKS} semanas): ${usd(row.savingPerPeriod)} menos.`;
    }
    return `Con ${n} por semana, pagar por video cuesta ${usd(row.singlePerWeek)} por semana (${usd(row.singlePerPeriod)} en ${PERIOD_WEEKS} semanas). No hay precio semanal publicado para más de ${TWO.videosPerWeek} videos por semana: ese volumen se cotiza.`;
  }
  if (row.planPerPeriod !== null && row.savingPerPeriod !== null) {
    return `At ${n} a week, paying per video costs ${usd(row.singlePerWeek)} a week (${usd(row.singlePerPeriod)} over ${PERIOD_WEEKS} weeks). The weekly plan costs ${usd(row.planPerWeek!)} a week (${usd(row.planPerPeriod)} over its ${PERIOD_WEEKS}-week minimum): ${usd(row.savingPerPeriod)} less.`;
  }
  return `At ${n} a week, paying per video costs ${usd(row.singlePerWeek)} a week (${usd(row.singlePerPeriod)} over ${PERIOD_WEEKS} weeks). There is no published weekly price above ${TWO.videosPerWeek} videos a week, so that volume is quoted.`;
}

export type CalcSection = { heading: string; paragraphs: string[] };

export type CalcCopy = {
  metadataTitle: string;
  metadataDescription: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  eyebrow: string;
  h1: string;
  answer: string;
  toolHeading: string;
  inputLabel: string;
  optionLabel: (n: number) => string;
  tableCaption: string;
  colVideos: string;
  colSingle: string;
  colPlan: string;
  colDifference: string;
  noPlan: string;
  perWeek: string;
  overPeriod: string;
  sections: CalcSection[];
  faqHeading: string;
  faqs: { question: string; answer: string }[];
  ctaHeading: string;
  ctaContact: string;
  ctaStarter: string;
  ctaGuide: string;
  hrefs: { home: string; contact: string; starter: string; growth: string; guide: string; reels: string; shortForm: string };
  updated: string;
};

const T = ARRANQUE_WEEKLY_TERMS;

/** Visible "updated" date; change it when a figure on the page changes. */
export const REELS_COST_CALCULATOR_UPDATED = "2026-10-14";

export const reelsCostCalculatorCopy: Record<CalcLocale, CalcCopy> = {
  en: {
    metadataTitle: "Reels Editing Cost Calculator: Per Video or Weekly",
    metadataDescription: `What editing your Reels costs every 4 weeks: per video at ${usd(PER_VIDEO)} or the weekly plan at ${usd(ONE.pricePerWeek)} for 1 video and ${usd(TWO.pricePerWeek)} for 2. Free calculator with the method shown.`,
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Reels editing cost calculator",
    eyebrow: "Free calculator",
    h1: "How much does it cost to edit my Reels every month?",
    answer: `${resultSentence(one, "en")} At ${TWO.videosPerWeek} a week the plan is ${usd(two.savingPerPeriod!)} less over ${PERIOD_WEEKS} weeks. Editing is by Esteban Moreno Media, from footage you film.`,
    toolHeading: "Work out your own number",
    inputLabel: "Videos you post per week",
    optionLabel: (n) => (n === 1 ? "1 video a week" : `${n} videos a week`),
    tableCaption: `Editing cost by videos per week, over ${PERIOD_WEEKS} weeks (the weekly plan's minimum)`,
    colVideos: "Videos a week",
    colSingle: `Per video (${usd(PER_VIDEO)} each)`,
    colPlan: "Weekly plan",
    colDifference: "Difference",
    noPlan: "Quoted",
    perWeek: "a week",
    overPeriod: `over ${PERIOD_WEEKS} weeks`,
    sections: [
      {
        heading: "How much does it cost to edit Reels every month?",
        paragraphs: [
          `It depends on how many you post. Editing one Reel, TikTok or Short with Esteban Moreno Media starts from ${usd(PER_VIDEO)} per video, so one video a week is ${usd(one.singlePerWeek)} a week and ${usd(one.singlePerPeriod)} over ${PERIOD_WEEKS} weeks. On the weekly plan the same video costs ${usd(ONE.pricePerWeek)} a week, ${usd(one.planPerPeriod!)} over the plan's ${PERIOD_WEEKS}-week minimum, which is ${usd(one.savingPerPeriod!)} less.`,
          `Two videos a week is ${usd(two.singlePerPeriod)} over ${PERIOD_WEEKS} weeks paid one by one, or ${usd(two.planPerPeriod!)} on the weekly plan at ${usd(TWO.pricePerWeek)} a week: ${usd(two.savingPerPeriod!)} less. A calendar month is slightly longer than ${PERIOD_WEEKS} weeks (52 weeks divided by 12 months is about 4.3), so a monthly bill runs a little above these figures. Filming is not included: the prices assume you send the footage.`,
        ],
      },
      {
        heading: "How does the calculator work out the price?",
        paragraphs: [
          `It multiplies, nothing more. The per-video column is videos per week times ${usd(PER_VIDEO)}, times ${PERIOD_WEEKS} weeks. The weekly-plan column is the published weekly price times ${PERIOD_WEEKS} weeks: ${usd(ONE.pricePerWeek)} for ${videos(ONE.videosPerWeek, "en")} a week and ${usd(TWO.pricePerWeek)} for ${videos(TWO.videosPerWeek, "en")}. The difference column is the first minus the second.`,
          `${PERIOD_WEEKS} weeks is used because it is the weekly plan's minimum: you pay at the start of each week, and after ${PERIOD_WEEKS} weeks you can stop by saying so before the next one. Every figure comes from the same price list as the [Starter package](/pricing/starter), so the calculator, the pricing page and the written quote show the same numbers. There is no weekly price above ${TWO.videosPerWeek} videos a week, and the calculator does not make one up: from ${TWO.videosPerWeek + 1} a week it shows the per-video cost and marks the plan as quoted.`,
        ],
      },
      {
        heading: "When is paying per video cheaper than the weekly plan?",
        paragraphs: [
          `When you post fewer than one video a week, or you are not sure you will keep going. The weekly plan's minimum spend is ${usd(one.planPerPeriod!)} (${PERIOD_WEEKS} weeks at ${usd(ONE.pricePerWeek)}). The same money buys ${minimumSpendInSingles} single videos at ${usd(PER_VIDEO)}, so if you would publish ${minimumSpendInSingles} videos or fewer in those ${PERIOD_WEEKS} weeks, paying per video costs less and commits you to nothing.`,
          `Per video also fits one-off needs: a launch, an event clip or a restaurant opening. You send footage when you have it, get one finished video back, and decide afterwards whether to order another. The weekly plan pays off once you already film every week and want the edits to keep pace; the [short-form cost guide](/guides/how-much-does-a-short-form-video-editor-cost) explains the trade-off in more detail.`,
        ],
      },
      {
        heading: "What is included in each weekly video?",
        paragraphs: [
          `Each weekly video runs up to ${T.maxVideoSeconds} seconds and is cut from up to ${T.maxFootageMinutes} minutes of your footage. It is delivered ${T.deliveryHoursMin}–${T.deliveryHoursMax} hours after the footage arrives, with ${ONE.changesPerVideo} round of changes on the 1-video plan and ${TWO.changesPerVideo} rounds on the 2-video plan. Captions are placed inside the platform's safe zones and the file is exported in the format Instagram, TikTok or YouTube Shorts needs.`,
          `A single video on Starter is the same edit with one revision round, without the weekly schedule. What moves a quote either way: a much longer video, a lot more raw footage, separate versions for each platform, bilingual captions, or animated graphics. If you need filming as well, that is a different service, quoted per production day. Esteban works in Spanish first, with intermediate English, so notes and changes can be sent in Spanish.`,
        ],
      },
    ],
    faqHeading: "Questions about the cost",
    faqs: [
      { question: "What does one Reel cost to edit?", answer: `From ${usd(PER_VIDEO)} per video on Starter, from footage you supply, with one revision round.` },
      { question: "What does the weekly plan cost?", answer: `${usd(ONE.pricePerWeek)} a week for 1 video or ${usd(TWO.pricePerWeek)} a week for 2 videos, paid weekly, with a ${PERIOD_WEEKS}-week minimum.` },
      { question: "Can I do three or more videos a week?", answer: `Yes, but there is no published weekly price for that volume. Each video is ${usd(PER_VIDEO)} on Starter, or ask for a written quote through contact.` },
      { question: "Is filming included?", answer: "No. These prices are for editing footage you film yourself, usually on a phone." },
    ],
    ctaHeading: "Ready to send your first footage?",
    ctaContact: "Ask for a written quote",
    ctaStarter: "See the Starter package",
    ctaGuide: "Read the cost guide",
    hrefs: {
      home: "/",
      contact: "/contact",
      starter: "/pricing/starter",
      growth: "/pricing/growth",
      guide: "/guides/how-much-does-a-short-form-video-editor-cost",
      reels: "/services/reels-editor-fort-lauderdale",
      shortForm: "/services/short-form-video-editor-miami",
    },
    updated: "Updated",
  },
  es: {
    metadataTitle: "Calculadora: Cuánto Cuesta Editar Reels al Mes",
    metadataDescription: `Cuánto cuesta editar tus reels cada 4 semanas: por video desde ${usd(PER_VIDEO)} o con el plan semanal de ${usd(ONE.pricePerWeek)} por 1 video y ${usd(TWO.pricePerWeek)} por 2. Calculadora gratis con el método a la vista.`,
    breadcrumbHome: "Inicio",
    breadcrumbCurrent: "Calculadora de costo de edición de reels",
    eyebrow: "Calculadora gratis",
    h1: "¿Cuánto cuesta editar mis reels al mes?",
    answer: `${resultSentence(one, "es")} Con ${TWO.videosPerWeek} por semana el plan sale ${usd(two.savingPerPeriod!)} más barato en ${PERIOD_WEEKS} semanas. La edición la hace Esteban Moreno Media con el material que tú grabas.`,
    toolHeading: "Calcula tu propio número",
    inputLabel: "Videos que publicas por semana",
    optionLabel: (n) => (n === 1 ? "1 video por semana" : `${n} videos por semana`),
    tableCaption: `Costo de edición según videos por semana, en ${PERIOD_WEEKS} semanas (el mínimo del plan semanal)`,
    colVideos: "Videos por semana",
    colSingle: `Por video (${usd(PER_VIDEO)} cada uno)`,
    colPlan: "Plan semanal",
    colDifference: "Diferencia",
    noPlan: "Se cotiza",
    perWeek: "por semana",
    overPeriod: `en ${PERIOD_WEEKS} semanas`,
    sections: [
      {
        heading: "¿Cuánto cuesta editar reels cada mes?",
        paragraphs: [
          `Depende de cuántos publiques. Editar un Reel, TikTok o Short con Esteban Moreno Media cuesta desde ${usd(PER_VIDEO)} por video, así que un video por semana son ${usd(one.singlePerWeek)} por semana y ${usd(one.singlePerPeriod)} en ${PERIOD_WEEKS} semanas. Con el plan semanal ese mismo video cuesta ${usd(ONE.pricePerWeek)} por semana, ${usd(one.planPerPeriod!)} en el mínimo de ${PERIOD_WEEKS} semanas del plan: ${usd(one.savingPerPeriod!)} menos.`,
          `Dos videos por semana son ${usd(two.singlePerPeriod)} en ${PERIOD_WEEKS} semanas si los pagas uno por uno, o ${usd(two.planPerPeriod!)} con el plan semanal de ${usd(TWO.pricePerWeek)} por semana: ${usd(two.savingPerPeriod!)} menos. Un mes del calendario es un poco más largo que ${PERIOD_WEEKS} semanas (52 semanas entre 12 meses da unas 4,3), así que una factura mensual queda algo por encima de estas cifras. La grabación no está incluida: los precios suponen que tú mandas el material.`,
        ],
      },
      {
        heading: "¿Cómo calcula el precio la calculadora?",
        paragraphs: [
          `Solo multiplica. La columna por video es videos por semana por ${usd(PER_VIDEO)}, por ${PERIOD_WEEKS} semanas. La columna del plan semanal es el precio semanal publicado por ${PERIOD_WEEKS} semanas: ${usd(ONE.pricePerWeek)} por ${videos(ONE.videosPerWeek, "es")} a la semana y ${usd(TWO.pricePerWeek)} por ${videos(TWO.videosPerWeek, "es")}. La diferencia es la primera menos la segunda.`,
          `Se usan ${PERIOD_WEEKS} semanas porque es el mínimo del plan semanal: pagas al inicio de cada semana y, pasadas ${PERIOD_WEEKS} semanas, puedes parar avisando antes de la siguiente. Todas las cifras salen de la misma lista de precios del [paquete Arranque](/es/precios/arranque), así que la calculadora, la página de precios y la cotización escrita muestran lo mismo. No hay precio semanal para más de ${TWO.videosPerWeek} videos por semana y la calculadora no se inventa uno: desde ${TWO.videosPerWeek + 1} por semana muestra el costo por video y marca el plan como cotizado.`,
        ],
      },
      {
        heading: "¿Cuándo sale más barato pagar por video que el plan semanal?",
        paragraphs: [
          `Cuando publicas menos de un video por semana o no sabes si vas a seguir. El gasto mínimo del plan semanal es ${usd(one.planPerPeriod!)} (${PERIOD_WEEKS} semanas a ${usd(ONE.pricePerWeek)}). Con ese dinero pagas ${minimumSpendInSingles} videos sueltos a ${usd(PER_VIDEO)}, así que si en esas ${PERIOD_WEEKS} semanas vas a publicar ${minimumSpendInSingles} videos o menos, pagar por video cuesta menos y no te compromete a nada.`,
          `Pagar por video también encaja con algo puntual: un lanzamiento, el clip de un evento o la apertura de un restaurante. Mandas el material cuando lo tienes, recibes un video terminado y decides después si pides otro. El plan semanal conviene cuando ya grabas cada semana y quieres que la edición vaya al mismo ritmo; la [guía de precios de videos cortos](/es/guias/cuanto-cuesta-un-editor-de-videos-cortos) explica la diferencia con más detalle.`,
        ],
      },
      {
        heading: "¿Qué incluye cada video del plan semanal?",
        paragraphs: [
          `Cada video semanal dura hasta ${T.maxVideoSeconds} segundos y se edita con hasta ${T.maxFootageMinutes} minutos de tu material. Se entrega ${T.deliveryHoursMin}–${T.deliveryHoursMax} horas después de recibir el material, con ${ONE.changesPerVideo} ronda de cambios en el plan de 1 video y ${TWO.changesPerVideo} rondas en el de 2 videos. Los subtítulos van dentro de las zonas seguras de la plataforma y el archivo sale en el formato que piden Instagram, TikTok o YouTube Shorts.`,
          `Un video suelto del Arranque es la misma edición con una ronda de cambios, sin el calendario semanal. Lo que mueve una cotización en los dos casos: un video mucho más largo, mucho más material en bruto, versiones distintas para cada plataforma, subtítulos en dos idiomas o gráficos animados. Si además necesitas grabación, es otro servicio y se cotiza por jornada de producción. El idioma principal de Esteban es el español, así que puedes mandar notas y cambios en español.`,
        ],
      },
    ],
    faqHeading: "Preguntas sobre el costo",
    faqs: [
      { question: "¿Cuánto cuesta editar un reel?", answer: `Desde ${usd(PER_VIDEO)} por video con el Arranque, usando el material que tú envías, con una ronda de cambios.` },
      { question: "¿Cuánto cuesta el plan semanal?", answer: `${usd(ONE.pricePerWeek)} por semana por 1 video o ${usd(TWO.pricePerWeek)} por semana por 2 videos, con pago semanal y un mínimo de ${PERIOD_WEEKS} semanas.` },
      { question: "¿Puedo hacer tres o más videos por semana?", answer: `Sí, pero no hay un precio semanal publicado para ese volumen. Cada video cuesta ${usd(PER_VIDEO)} con el Arranque, o pide una cotización escrita por contacto.` },
      { question: "¿La grabación está incluida?", answer: "No. Estos precios son para editar el material que grabas tú, normalmente con el celular." },
    ],
    ctaHeading: "¿Listo para mandar tu primer material?",
    ctaContact: "Pide una cotización escrita",
    ctaStarter: "Ver el paquete Arranque",
    ctaGuide: "Leer la guía de precios",
    hrefs: {
      home: "/es",
      contact: "/es/contacto",
      starter: "/es/precios/arranque",
      growth: "/es/precios/crecimiento",
      guide: "/es/guias/cuanto-cuesta-un-editor-de-videos-cortos",
      reels: "/es/editor-de-reels-fort-lauderdale",
      shortForm: "/es/editor-de-video-corto-para-redes-miami",
    },
    updated: "Actualizado",
  },
};
