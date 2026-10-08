// The short-form page's citable depth, EN + ES, and its structured data.
//
// Why this page: on 2026-10-08 Bing Webmaster query stats put
// /services/short-form-video-editor-miami at position 1-2 for machine-phrased
// queries ("local short form video editor businesses contact", "... business
// email") that read like ChatGPT's search fan-out, and the people who called
// Esteban said ChatGPT or Gemini had recommended him. The same page was absent
// for the influencer / "redes sociales" phrasings. These sections answer those
// sub-questions on the page that already wins, without touching its URL,
// title phrase or H1.
//
// Claim discipline: every price and term is read from lib/pricing.ts; the
// contact details come from lib/site.ts; the language claim (Spanish first,
// intermediate English) repeats lib/entity-schema.ts. No client, result,
// follower count or drone work is claimed.

import type { DeepDiveSection } from "@/components/service-depth";
import { whatsappHref } from "@/lib/packages";
import {
  ARRANQUE_WEEKLY_FROM,
  ARRANQUE_WEEKLY_TERMS as T,
  SHORT_FORM,
  shortFormWeeklyText,
  usd,
} from "@/lib/pricing";
import { absoluteUrl, site } from "@/lib/site";

type Locale = "en" | "es";

const once = usd(SHORT_FORM.perVideoFrom);
const fromPerVideo = usd(ARRANQUE_WEEKLY_FROM.perVideo);
const market = `${usd(SHORT_FORM.marketMin)}–${usd(SHORT_FORM.marketMax)}`;
const whatsappDigits = site.phone.e164.replace(/\D/g, "");

export const SHORT_FORM_PATH_EN = "/services/short-form-video-editor-miami";
export const SHORT_FORM_PATH_ES = "/es/editor-de-video-corto-para-redes-miami";

export function shortFormWhatsappHref(locale: Locale): string {
  return whatsappHref(
    site.phone.e164,
    locale === "es"
      ? "Hola Esteban, quiero editar videos cortos para redes."
      : "Hi Esteban, I'd like short-form videos edited.",
  );
}

export const SHORT_FORM_DEEP_DIVE_EN = {
  id: "short-form-starting-out",
  title: "Starting out on Reels and TikTok? Cost, phone filming and contact",
  destinations:
    "Editing for new influencers and creators, filming on a phone, what it costs in Miami, and how to reach Esteban.",
  sections: [
    {
      heading: "Who edits videos for influencers and creators starting out in Miami?",
      paragraphs: [
        "Esteban Moreno Media edits short-form video for people who are just starting to post: a new influencer account, a food and places page, a coach, or a local business owner who wants to show up on Instagram and TikTok. You film on your phone; Esteban, based in Fort Lauderdale and working across Miami-Dade and Broward, edits remotely and sends the video back ready to post. His working language is Spanish, with intermediate English for bilingual projects, so Spanish-speaking creators in Miami can brief him in their own language.",
        "Starting out does not need a monthly retainer. Starter is one video edit at a time, and creators who post every week can pay weekly instead. If the account is about restaurants, bars and places to go, see [video editing for food and places creators](/services/food-and-places-creator-video-editing-miami); for any other niche, see [video editing for content creators](/services/content-creator-video-editing-miami). Nobody can promise followers. The edit's job is to tell each story clearly.",
      ],
    },
    {
      heading: "How do I start posting short-form videos if I film on my phone?",
      paragraphs: [
        "Start with the phone you already have, held upright. Reels, TikTok and YouTube Shorts are delivered at 1080×1920 pixels, a 9:16 frame, so vertical footage fills the screen without cropping. Face a window instead of standing with it behind you, keep the phone at eye level, and record a couple of seconds before and after you speak so there is room to cut. Clear sound matters more than a new camera: film somewhere quiet and close to the phone.",
        `Then give each video one idea, one place, one tip or one recommendation, and say the point in the first sentence. Send the original files in a Drive or Dropbox folder, up to ${T.maxFootageMinutes} minutes of footage per video, with a line on what the video is for. Esteban cuts the pauses, adds subtitles in Spanish or English, cuts to the beat of the trending sound, and keeps text inside the area the app interface does not cover.`,
      ],
    },
    {
      heading: "How much does a short-form video editor cost in Miami?",
      paragraphs: [
        `Esteban's Starter package is from ${once} per video: you film, he edits one video and formats it for Reels, TikTok, YouTube or the web, with one revision round included. If you post every week, the same Starter can be paid weekly: ${shortFormWeeklyText("en")}, which works out from ${fromPerVideo} per video. You pay at the start of each week and can stop by saying so before the next one. Weekly videos run up to ${T.maxVideoSeconds} seconds and each one is delivered in ${T.deliveryHoursMin}–${T.deliveryHoursMax} hours.`,
        `For context, the published 2026 market range this site's prices were checked against is ${market} per short-form video. A ${SHORT_FORM.packOf}-video pack is simply ${SHORT_FORM.packOf} single videos, with no invented bundle discount, and every project gets a quote before work starts. Compare the [Starter options on the pricing page](/pricing#paquete-arranque) or the [weekly Starter plan](/services/content-creator-video-editing-miami#weekly-starter).`,
      ],
    },
    {
      heading: "How do I contact a short-form video editor in Miami?",
      paragraphs: [
        `Call or text Esteban Moreno at ${site.phone.display}. The same number is on WhatsApp at wa.me/${whatsappDigits}, the quickest way to send a first clip or ask about Starter. Email goes to ${site.email}. Esteban Moreno Media is based in Fort Lauderdale, Florida, and edits short-form video for creators and businesses in Miami, Miami-Dade and Broward, remotely from footage you supply. You can write in Spanish or English.`,
        "A useful first message says three things: what the account or business is, how often you want to post, and where the footage is now, whether on a phone, a camera or not filmed yet. If you already have clips, include a Drive or Dropbox link. Esteban replies with the option that fits, a single video, the weekly plan or a larger package, and a quote before any work begins. The [contact page](/contact) has a form if you prefer to write it out.",
      ],
    },
  ] satisfies DeepDiveSection[],
};

/** Sections appended to /es/editor-de-video-corto-para-redes-miami. */
export const SHORT_FORM_SECTIONS_ES: { heading: string; paragraphs: string[] }[] = [
  {
    heading: "¿Quién edita videos para influencers y creadores que están empezando en Miami?",
    paragraphs: [
      "Esteban Moreno Media edita videos cortos para quienes están empezando a publicar: una cuenta nueva de influencer, una página de comida y lugares, un coach o el dueño de un negocio local que quiere aparecer en Instagram y TikTok. Tú grabas con el celular; Esteban, con base en Fort Lauderdale y trabajando en Miami-Dade y Broward, edita a distancia y te devuelve el video listo para publicar. Su idioma principal de trabajo es el español, con inglés intermedio para proyectos bilingües, así que puedes explicarle tu idea en español.",
      "Para empezar no hace falta un plan mensual. El Arranque es la edición de un video a la vez, y si publicas cada semana puedes pagarlo semana a semana. Si tu cuenta es de restaurantes, bares y lugares, mira la [edición de video para creadores de comida y lugares](/es/edicion-de-video-para-creadores-de-comida-y-lugares-miami); para cualquier otro nicho, la [edición de video para creadores de contenido](/es/edicion-de-video-para-creadores-de-contenido-miami). Nadie puede prometer seguidores. El trabajo de la edición es contar bien cada historia.",
    ],
  },
  {
    heading: "¿Cómo empiezo a publicar videos cortos si grabo con el celular?",
    paragraphs: [
      "Empieza con el celular que ya tienes, en vertical. Los Reels, TikToks y YouTube Shorts se entregan en 1080×1920 píxeles, formato 9:16, así que lo que grabas de pie llena la pantalla sin recortes. Ponte de frente a una ventana y no de espaldas a ella, deja el teléfono a la altura de los ojos y graba un par de segundos antes y después de hablar para tener margen de corte. El sonido claro importa más que una cámara nueva: graba en un lugar callado y cerca del teléfono.",
      `Luego dale a cada video una sola idea: un lugar, un consejo o una recomendación, y di el punto en la primera frase. Manda los archivos originales en una carpeta de Drive o Dropbox, hasta ${T.maxFootageMinutes} minutos de material por video, con una línea sobre para qué es. Esteban quita las pausas, agrega subtítulos en español o inglés, corta al ritmo del audio en tendencia y deja el texto donde la interfaz de la app no lo tapa. Así se arma el contenido para redes sociales semana a semana.`,
    ],
  },
  {
    heading: "¿Cuánto cuesta un editor de videos cortos o de reels en Miami?",
    paragraphs: [
      `El paquete Arranque cuesta desde ${once} por video: tú grabas y Esteban edita un video y lo adapta a Reels, TikTok, YouTube o web, con una ronda de cambios incluida. Si publicas cada semana, el mismo Arranque se puede pagar semana a semana: ${shortFormWeeklyText("es")}, es decir, desde ${fromPerVideo} por video. Pagas al inicio de cada semana y puedes parar avisando antes de la siguiente. Los videos semanales duran hasta ${T.maxVideoSeconds} segundos y cada uno se entrega en ${T.deliveryHoursMin}–${T.deliveryHoursMax} horas.`,
      `Como referencia, el rango de mercado publicado en 2026 con el que se revisaron estos precios es de ${market} por video corto. Un paquete de ${SHORT_FORM.packOf} videos son simplemente ${SHORT_FORM.packOf} videos sueltos, sin descuentos inventados, y cada proyecto recibe una cotización antes de empezar. Compara las [opciones del Arranque en precios](/es/precios#paquete-arranque) o el [Arranque semanal](/es/edicion-de-video-para-creadores-de-contenido-miami#arranque-semanal).`,
    ],
  },
  {
    heading: "¿Cómo contacto a un editor de videos cortos en Miami o Fort Lauderdale?",
    paragraphs: [
      `Llama o escribe a Esteban Moreno al ${site.phone.display}. El mismo número está en WhatsApp en wa.me/${whatsappDigits}, la forma más rápida de mandar un primer clip o preguntar por el Arranque. El correo es ${site.email}. Esteban Moreno Media tiene su base en Fort Lauderdale, Florida, y edita videos cortos y reels para creadores y negocios en Miami, Miami-Dade y Broward, a distancia y con el material que tú envías. Puedes escribir en español o en inglés.`,
      "Un primer mensaje útil dice tres cosas: qué es la cuenta o el negocio, cada cuánto quieres publicar y dónde está el material ahora, en el celular, en una cámara o todavía sin grabar. Si ya tienes clips, incluye el enlace de Drive o Dropbox. Esteban responde con la opción que encaja, un video suelto, el plan semanal o un paquete más grande, y una cotización antes de empezar. En la [página de contacto](/es/contacto) también hay un formulario.",
    ],
  },
];

/**
 * The areas the visible copy names, in the same order, as schema places.
 * Kept here so the JSON-LD and the paragraph above cannot drift apart.
 */
const AREAS = [
  { "@type": "City", name: "Miami" },
  { "@type": "City", name: "Fort Lauderdale" },
  { "@type": "AdministrativeArea", name: "Miami-Dade County" },
  { "@type": "AdministrativeArea", name: "Broward County" },
] as const;

/** Service node for either page: telephone, areaServed and serviceType match the visible text. */
export function shortFormServiceJsonLd(locale: Locale) {
  const path = locale === "es" ? SHORT_FORM_PATH_ES : SHORT_FORM_PATH_EN;
  return {
    "@type": "Service",
    "@id": absoluteUrl(`${path}#service`),
    name: locale === "es" ? "Editor de video corto para redes en Miami" : "Short Form Video Editor Miami",
    description:
      locale === "es"
        ? "Edición remota de Reels, TikToks y YouTube Shorts en formato 9:16 para influencers, creadores y negocios en Miami y Fort Lauderdale."
        : "Remote 9:16 editing of Reels, TikToks and YouTube Shorts for influencers, creators and businesses in Miami and Fort Lauderdale.",
    serviceType: locale === "es" ? "edición de video corto" : "short-form video editing",
    areaServed: AREAS,
    availableLanguage: ["Spanish", "English"],
    provider: {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": absoluteUrl("/#business"),
      name: site.name,
      url: absoluteUrl("/"),
      email: site.email,
      telephone: site.phone.e164,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Fort Lauderdale",
        addressRegion: "FL",
        addressCountry: "US",
      },
      areaServed: AREAS,
    },
    offers: {
      "@type": "Offer",
      name: locale === "es" ? "Arranque: un video" : "Starter: one video",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        minPrice: SHORT_FORM.perVideoFrom,
        priceCurrency: "USD",
        unitText: "video",
      },
    },
  };
}
