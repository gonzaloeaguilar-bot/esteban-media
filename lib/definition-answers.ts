// Definition-first answers for the pages people reach with a "what is …" or
// "… meaning" search (overnight loop row 56, 2026-10-14).
//
// Evidence: Google autocomplete returns "ugc video editor meaning", "short form
// video editor meaning" and "what is short form video" as the first
// suggestions for those seeds, and neither service page had a "What is…"
// heading. AI answers built by query fan-out cite the page that answers the
// sub-question in its own words, so each page gets ONE question-shaped
// section, 100-180 words, in the server-rendered HTML, near the top.
//
// Claim discipline: a general definition, then only what the site already
// publishes about Esteban (Fort Lauderdale base, Spanish-first, editing from
// supplied footage). Prices are read from lib/pricing.ts, never typed here.

import { shortFormPriceText } from "@/lib/pricing";

export type DefinitionAnswer = {
  path: string;
  locale: "en" | "es";
  /** Anchor id for the section. */
  id: string;
  /** Question-shaped heading, phrased the way people search. */
  heading: string;
  paragraphs: string[];
};

export const DEFINITION_ANSWERS: readonly DefinitionAnswer[] = [
  {
    path: "/services/ugc-video-editor-ecommerce",
    locale: "en",
    id: "what-is-a-ugc-video-editor",
    heading: "What is a UGC video editor?",
    paragraphs: [
      "A UGC video editor turns user-generated content, the clips customers or hired creators film on their phones, into finished videos a brand can post or run as ads. The footage already exists. The editor picks the strongest moments, cuts a hook for the first seconds, adds captions, levels the sound, matches the color and exports each version in the size the platform asks for.",
      "It is a different job from the UGC creator, who films the clips, and from a videographer, who brings a camera to a location. Because the editor works from supplied footage, the work is remote and the creator's own voice stays on screen.",
      "For an e-commerce brand the usual request is one product story cut into several ad variations: the same clips with different hooks, captions and lengths, so Meta or TikTok can test which one sells. Esteban Moreno Media edits UGC from Fort Lauderdale for brands in Miami and remote clients, Spanish-first and in English too.",
    ],
  },
  {
    path: "/es/editor-de-video-ugc-para-ecommerce",
    locale: "es",
    id: "que-es-un-editor-de-video-ugc",
    heading: "¿Qué es un editor de video UGC?",
    paragraphs: [
      "Un editor de video UGC convierte el contenido generado por usuarios, los clips que graban clientes o creadores contratados con su celular, en videos terminados que una marca puede publicar o usar como anuncio. El material ya existe. El editor elige los mejores momentos, arma un gancho para los primeros segundos, agrega subtítulos, nivela el sonido, iguala el color y exporta cada versión en el formato que pide la plataforma.",
      "Es un trabajo distinto al del creador UGC, que graba los clips, y al del videógrafo, que lleva la cámara a una locación. Como el editor trabaja con material que le envían, el trabajo es remoto y la voz del creador se mantiene en pantalla.",
      "Para una marca de e-commerce, el pedido habitual es una historia de producto cortada en varias variaciones de anuncio: los mismos clips con distintos ganchos, subtítulos y duraciones, para que Meta o TikTok prueben cuál vende. Esteban Moreno Media edita UGC desde Fort Lauderdale para marcas en Miami y clientes remotos, en español primero y también en inglés.",
    ],
  },
  {
    path: "/services/short-form-video-editor-miami",
    locale: "en",
    id: "what-is-a-short-form-video-editor",
    heading: "What is a short-form video editor?",
    paragraphs: [
      "Short-form video means vertical clips, usually under a minute, made for feeds people scroll: Instagram Reels, TikTok and YouTube Shorts. A short-form video editor takes the raw clips, often filmed on a phone, and cuts them into a finished post: a hook in the first seconds, tight cuts, burned-in captions for people watching with the sound off, music and voice levels that sit right, and a 9:16 export with the text kept clear of the app's buttons.",
      "The job is editing, not filming. A videographer records on location; a long-form editor works on ten-minute YouTube videos or corporate pieces. A short-form editor is judged on whether the first seconds hold attention and whether one set of clips can become several posts.",
      `Esteban Moreno Media edits short-form video from Fort Lauderdale for creators and businesses in Miami, Spanish-first. Starter is ${shortFormPriceText("en")}.`,
    ],
  },
  {
    path: "/es/editor-de-video-corto-para-redes-miami",
    locale: "es",
    id: "que-es-un-editor-de-videos-cortos",
    heading: "¿Qué es un editor de videos cortos?",
    paragraphs: [
      "Un video corto es un clip vertical, normalmente de menos de un minuto, hecho para los feeds que la gente desliza: Reels de Instagram, TikTok y YouTube Shorts. Un editor de videos cortos toma los clips en bruto, muchas veces grabados con el celular, y los convierte en una publicación terminada: un gancho en los primeros segundos, cortes ágiles, subtítulos para quien mira sin sonido, música y voz bien niveladas, y una exportación 9:16 con el texto lejos de los botones de la app.",
      "El trabajo es editar, no grabar. Un videógrafo graba en locación; un editor de video largo trabaja en videos de YouTube de diez minutos o piezas corporativas. A un editor de videos cortos se le mide por si los primeros segundos retienen y si un mismo material rinde varias publicaciones.",
      `Esteban Moreno Media edita videos cortos desde Fort Lauderdale para creadores y negocios en Miami, en español primero. El Arranque cuesta ${shortFormPriceText("es")}.`,
    ],
  },
];

export function definitionAnswerFor(path: string): DefinitionAnswer | undefined {
  return DEFINITION_ANSWERS.find((entry) => entry.path === path);
}
