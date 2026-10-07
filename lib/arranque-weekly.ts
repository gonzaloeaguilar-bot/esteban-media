// Arranque (Starter) on a weekly subscription — the words.
//
// Same service as the Arranque package (you film, Esteban edits remotely),
// sold by videos per week. Figures live in lib/pricing.ts
// (ARRANQUE_WEEKLY_OPTIONS / ARRANQUE_WEEKLY_TERMS); nothing here hardcodes a
// price. FAQs come from the client proposal approved on 2026-10-07
// (~/code/esteban-propuesta/propuesta.html), with the proposal's internal
// option names replaced by "1 video por semana" / "2 videos por semana".
//
// Deliberately absent: discount badges, "valor normal", a struck reference
// price, and a per-video comparison against Arranque's $100 (the site prices
// Arranque "per project"; whether that is per video is unconfirmed).

import {
  ARRANQUE_WEEKLY_FROM,
  ARRANQUE_WEEKLY_OPTIONS,
  ARRANQUE_WEEKLY_TERMS as T,
  arranqueWeeklyPerVideo,
  usd,
  type ArranqueWeeklyOption,
  type ArranqueWeeklyOptionId,
} from "@/lib/pricing";
import { whatsappHref, type Locale } from "@/lib/packages";

/** The four creator pages that carry the weekly plan section. Not /packages. */
export const ARRANQUE_WEEKLY_PAGES = {
  en: [
    "/services/food-and-places-creator-video-editing-miami",
    "/services/content-creator-video-editing-miami",
  ],
  es: [
    "/es/edicion-de-video-para-creadores-de-comida-y-lugares-miami",
    "/es/edicion-de-video-para-creadores-de-contenido-miami",
  ],
} as const;

export const ARRANQUE_WEEKLY_SPANISH_SLUGS: ReadonlySet<string> = new Set(
  ARRANQUE_WEEKLY_PAGES.es.map((p) => p.replace(/^\/es\//, "")),
);

export function arranqueWeeklyAnchor(locale: Locale): string {
  return locale === "es" ? "arranque-semanal" : "weekly-starter";
}

/** Where the Arranque package card points: the general creator page's section. */
export function arranqueWeeklyHref(locale: Locale): string {
  const page = locale === "es" ? ARRANQUE_WEEKLY_PAGES.es[1] : ARRANQUE_WEEKLY_PAGES.en[1];
  return `${page}#${arranqueWeeklyAnchor(locale)}`;
}

export function arranqueWeeklyName(locale: Locale): string {
  return locale === "es" ? "Arranque semanal" : "Weekly Starter";
}

export function arranqueWeeklyOptionName(option: ArranqueWeeklyOption, locale: Locale): string {
  const n = option.videosPerWeek;
  return locale === "es"
    ? `${n} ${n === 1 ? "video" : "videos"} por semana`
    : `${n} ${n === 1 ? "video" : "videos"} a week`;
}

export function arranqueWeeklyCtaId(id: ArranqueWeeklyOptionId): string {
  return id === "one-per-week" ? "arranque_weekly_1_per_week_whatsapp" : "arranque_weekly_2_per_week_whatsapp";
}

const INCLUDES: Record<Locale, { shared: string[]; byOption: Record<ArranqueWeeklyOptionId, string[]> }> = {
  es: {
    shared: [
      "Edición con historia y subtítulos en español o inglés",
      "Edición al ritmo de la música en tendencia de Instagram y TikTok",
    ],
    byOption: {
      "one-per-week": ["Guía de ideas para cada historia"],
      "two-per-week": ["Calendario de contenido", "Llamada de estrategia"],
    },
  },
  en: {
    shared: [
      "Story-driven edit with subtitles in Spanish or English",
      "Cut to the beat of trending Instagram and TikTok audio",
    ],
    byOption: {
      "one-per-week": ["Story and ideas guide"],
      "two-per-week": ["Content calendar", "Strategy call"],
    },
  },
};

export function arranqueWeeklyIncludes(option: ArranqueWeeklyOption, locale: Locale): string[] {
  const c = INCLUDES[locale];
  const n = option.changesPerVideo;
  const changes = locale === "es"
    ? `${n} ${n === 1 ? "cambio" : "cambios"} por video`
    : `${n} ${n === 1 ? "change" : "changes"} per video`;
  return [...c.shared, ...c.byOption[option.id], changes];
}

export function arranqueWeeklyPerVideoLine(option: ArranqueWeeklyOption, locale: Locale): string {
  const each = usd(arranqueWeeklyPerVideo(option));
  return locale === "es" ? `${each} por video` : `${each} per video`;
}

export function arranqueWeeklyWhatsapp(phoneE164: string, option: ArranqueWeeklyOption, locale: Locale): string {
  const name = `${arranqueWeeklyName(locale)}: ${arranqueWeeklyOptionName(option, locale)}`;
  const price = usd(option.pricePerWeek);
  const text = locale === "es"
    ? `Hola Esteban, me interesa ${name} (${price} por semana).`
    : `Hi Esteban, I'm interested in ${name} (${price} per week).`;
  return whatsappHref(phoneE164, text);
}

function capital(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function arranqueWeeklyCopy(locale: Locale) {
  const es = locale === "es";
  const [one, two] = ARRANQUE_WEEKLY_OPTIONS;
  const fromVideo = usd(ARRANQUE_WEEKLY_FROM.perVideo);
  return {
    eyebrow: es ? "Pago semanal" : "Paid weekly",
    heading: es ? "¿Cuánto cuesta editar tus videos cada semana?" : "What does it cost to have your videos edited every week?",
    answer: es
      ? `${arranqueWeeklyName("es")} es el paquete Arranque por semana: tú grabas, Esteban edita. ${capital(arranqueWeeklyOptionName(one, "es"))} cuesta ${usd(one.pricePerWeek)} y ${arranqueWeeklyOptionName(two, "es")} cuesta ${usd(two.pricePerWeek)}, desde ${fromVideo} por video.`
      : `${arranqueWeeklyName("en")} is the Starter package by the week: you film, Esteban edits. ${capital(arranqueWeeklyOptionName(one, "en"))} is ${usd(one.pricePerWeek)} and ${arranqueWeeklyOptionName(two, "en")} is ${usd(two.pricePerWeek)}, from ${fromVideo} per video.`,
    perWeek: es ? "/ semana" : "/ week",
    paidWeekly: es ? "Pago semanal, al inicio de cada semana" : "Paid weekly, at the start of each week",
    includesLabel: es ? "Incluye" : "Includes",
    cta: (option: ArranqueWeeklyOption) =>
      es ? `Empezar con ${arranqueWeeklyOptionName(option, "es")}` : `Start with ${arranqueWeeklyOptionName(option, "en")}`,
    termsHeading: es ? "¿Qué condiciones tiene el plan semanal?" : "What are the weekly plan's terms?",
    terms: es
      ? [
          `Videos de hasta ${T.maxVideoSeconds} segundos, a partir de hasta ${T.maxFootageMinutes} minutos de material por video.`,
          `Entrega de cada video en ${T.deliveryHoursMin}–${T.deliveryHoursMax} horas.`,
          "Pagas al inicio de cada semana y puedes parar avisando antes de la semana siguiente.",
          "Los videos son tuyos. La grabación y la publicación quedan a tu cargo.",
          "La canción en tendencia la agregas tú en Instagram o TikTok al publicar: ese audio solo tiene licencia dentro de la app. El video llega cortado a su ritmo.",
        ]
      : [
          `Videos up to ${T.maxVideoSeconds} seconds, from up to ${T.maxFootageMinutes} minutes of footage per video.`,
          `Each video delivered in ${T.deliveryHoursMin}–${T.deliveryHoursMax} hours.`,
          "You pay at the start of each week and can stop by telling Esteban before the next week.",
          "The videos are yours. Filming and posting stay with you.",
          "You add the trending song in Instagram or TikTok when you post: that audio is only licensed inside the app. The video comes back cut to its beat.",
        ],
    faqHeading: es ? "Preguntas frecuentes del plan semanal" : "Weekly plan questions",
    packageCardLine: es
      ? `¿Publicas cada semana? Plan semanal desde ${usd(ARRANQUE_WEEKLY_FROM.perWeek)}/semana`
      : `Posting every week? Weekly plan from ${usd(ARRANQUE_WEEKLY_FROM.perWeek)}/week`,
  };
}

/** The proposal's ten questions, as plain strings: rendered AND used for FAQPage. */
export function arranqueWeeklyFaq(locale: Locale): { question: string; answer: string }[] {
  if (locale === "es") {
    return [
      { question: "¿Cómo se paga?", answer: "Semana a semana, al inicio de cada una. No pagas el mes completo de una vez." },
      { question: "¿Puedo cancelar?", answer: "Sí. Avísame antes de la semana siguiente y no se cobra. La semana en curso no se devuelve." },
      { question: "¿Y si no alcanzo a grabar 2 por semana?", answer: "Empieza con 1 video por semana. Pasas a 2 por semana cuando quieras." },
      { question: "¿Qué necesito para grabar?", answer: "Solo tu celular. Te digo qué grabar y cómo contar cada historia." },
      { question: "¿Cuánto material mando?", answer: `Hasta ${T.maxFootageMinutes} minutos por video, en una carpeta de Drive o Dropbox.` },
      { question: "¿Qué cuenta como un cambio?", answer: "Un ajuste al video entregado: cortes, texto o música. Una idea nueva es un video nuevo." },
      { question: "¿Y la música?", answer: "La que está en tendencia en Instagram y TikTok. Edito al ritmo de la canción y tú la eliges en la app al publicar." },
      { question: "¿De quién son los videos?", answer: "Tuyos. Los publicas donde quieras." },
      { question: "¿Qué me da que no me dé un editor barato?", answer: "Una historia con ritmo y un plan de qué publicar. No solo cortes." },
      { question: "¿Me garantizas seguidores?", answer: "No, nadie puede. Lo que sí tendrás: historias bien contadas, cada semana." },
    ];
  }
  return [
    { question: "How do I pay?", answer: "Week by week, at the start of each one. You never pay a whole month up front." },
    { question: "Can I cancel?", answer: "Yes. Tell me before the next week starts and it is not charged. The week in progress is not refunded." },
    { question: "What if I can't film 2 a week?", answer: "Start with 1 video a week. Move to 2 a week whenever you like." },
    { question: "What do I need to film?", answer: "Just your phone. I tell you what to film and how to tell each story." },
    { question: "How much footage do I send?", answer: `Up to ${T.maxFootageMinutes} minutes per video, in a Drive or Dropbox folder.` },
    { question: "What counts as a change?", answer: "One adjustment to the delivered video: cuts, text or music. A new idea is a new video." },
    { question: "What about the music?", answer: "Whatever is trending on Instagram and TikTok. I cut to the beat of the song and you pick it in the app when you post." },
    { question: "Who owns the videos?", answer: "You do. Post them wherever you want." },
    { question: "What do I get that a cheap editor won't give me?", answer: "A story with rhythm and a plan for what to post. Not just cuts." },
    { question: "Will you guarantee followers?", answer: "No, nobody can. What you will have: well-told stories, every week." },
  ];
}

/** OfferCatalog node for the page's existing @graph; prices from lib/pricing.ts. */
export function arranqueWeeklyOfferJsonLd(locale: Locale, pageUrl: string, providerId: string) {
  const es = locale === "es";
  return {
    "@type": "OfferCatalog",
    "@id": `${pageUrl}#${arranqueWeeklyAnchor(locale)}`,
    name: arranqueWeeklyName(locale),
    itemListElement: ARRANQUE_WEEKLY_OPTIONS.map((option, i) => ({
      "@type": "Offer",
      position: i + 1,
      name: `${arranqueWeeklyName(locale)}: ${arranqueWeeklyOptionName(option, locale)}`,
      url: `${pageUrl}#${arranqueWeeklyAnchor(locale)}`,
      itemOffered: {
        "@type": "Service",
        name: arranqueWeeklyName(locale),
        provider: { "@id": providerId },
      },
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: option.pricePerWeek,
        priceCurrency: "USD",
        unitText: es ? "semana" : "week",
        referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "WEE" },
      },
    })),
  };
}
