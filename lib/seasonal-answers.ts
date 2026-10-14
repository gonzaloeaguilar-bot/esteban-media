// Holiday-season answers for the restaurant pages (overnight loop row 71,
// 2026-10-14).
//
// Evidence: restaurant promo is the top non-brand service page in Search
// Console ("restaurant promo video editing miami", 16 impressions at 7.6 over
// 90 days; "video para restaurantes miami", 7 at 6.9), and no page on the site
// said anything about Thanksgiving, Christmas or New Year's Eve, the dates a
// restaurant plans its busiest posts around. Deepens the existing pages; no new
// URL.
//
// Claim discipline: the holiday dates are calendar facts for 2026; the share of
// Reels comes from the site's own Miami restaurant study (data file); prices
// come from lib/pricing.ts. No turnaround, result or client is claimed.

import study from "@/data/studies/miami-restaurant-instagram-2026.json";
import { RESTAURANT_PROMO, SHORT_FORM, usd } from "@/lib/pricing";
import { restaurantIgStudyPaths } from "@/lib/restaurant-ig-study";

export type SeasonalAnswer = {
  path: string;
  locale: "en" | "es";
  id: string;
  heading: string;
  paragraphs: string[];
  shotListLabel: string;
  shotList: string[];
};

const reelPct = study.formats.reelPct;
const posts = study.postsAnalyzed;
const accounts = study.sample;
const esPct = String(reelPct).replace(".", ",");

// One full entry per page (not a shared builder) so the date ledger sees each
// page's copy in its own block (scripts/page-lastmod.mjs contentBlocks).
export const SEASONAL_ANSWERS: readonly SeasonalAnswer[] = [
  {
    path: "/services/restaurant-promo-video-editing-miami",
    locale: "en",
    id: "restaurant-holiday-reels",
    heading: "When should a restaurant plan its Thanksgiving and holiday Reels?",
    paragraphs: [
      `Plan around three dates: Thanksgiving on Thursday, November 26, 2026, Christmas Eve and Christmas Day on December 24 and 25, and New Year's Eve on December 31. A holiday Reel helps most while people are still choosing where to book, so film the dishes as soon as the holiday menu is final and post the menu Reel well before the date, not on the day itself. In the [Miami restaurant Instagram study](${restaurantIgStudyPaths.en}) on this site, ${reelPct}% of ${posts} recent posts from ${accounts} restaurants were Reels. One Reel edited from your own clips is ${usd(SHORT_FORM.perVideoFrom)} per video (Starter); a full restaurant promo project starts at ${usd(RESTAURANT_PROMO.from)}.`,
    ],
    shotListLabel: "What to film on a phone for a holiday menu Reel",
    shotList: [
      "Each holiday dish, plated, from above and from the side",
      "The room, bar or patio set up for the holiday",
      "A drink being poured or a dish being finished",
      "One short line from the chef or owner with the date and how to book",
    ],
  },
  {
    path: "/es/edicion-de-video-promocional-para-restaurantes-miami",
    locale: "es",
    id: "reels-de-fin-de-ano-para-restaurantes",
    heading: "¿Cuándo debe planear un restaurante sus Reels de Thanksgiving y fin de año?",
    paragraphs: [
      `Planea alrededor de tres fechas: Thanksgiving (Día de Acción de Gracias) el jueves 26 de noviembre de 2026, Nochebuena y Navidad el 24 y 25 de diciembre, y Fin de Año el 31 de diciembre. Un Reel de temporada ayuda más mientras la gente todavía decide dónde reservar, así que graba los platos apenas el menú de temporada esté listo y publica el Reel del menú bastante antes de la fecha, no el mismo día. En el [estudio de Instagram de restaurantes de Miami](${restaurantIgStudyPaths.es}) de este sitio, el ${esPct}% de ${posts} publicaciones recientes de ${accounts} restaurantes fueron Reels. Un Reel editado con tus propios clips cuesta ${usd(SHORT_FORM.perVideoFrom)} por video (paquete Arranque); un proyecto promocional completo para restaurante empieza desde ${usd(RESTAURANT_PROMO.from)}.`,
    ],
    shotListLabel: "Qué grabar con el celular para un Reel del menú de temporada",
    shotList: [
      "Cada plato de temporada servido, desde arriba y de lado",
      "El salón, la barra o la terraza decorados para la fecha",
      "Una bebida que se sirve o un plato que se termina",
      "Una frase corta del chef o del dueño con la fecha y cómo reservar",
    ],
  },
  {
    path: "/es/video-para-restaurantes-miami",
    locale: "es",
    id: "reels-de-fin-de-ano-para-restaurantes",
    heading: "¿Cuándo debe planear un restaurante sus Reels de Thanksgiving y fin de año?",
    paragraphs: [
      `Planea alrededor de tres fechas: Thanksgiving (Día de Acción de Gracias) el jueves 26 de noviembre de 2026, Nochebuena y Navidad el 24 y 25 de diciembre, y Fin de Año el 31 de diciembre. Un Reel de temporada ayuda más mientras la gente todavía decide dónde reservar, así que graba los platos apenas el menú de temporada esté listo y publica el Reel del menú bastante antes de la fecha, no el mismo día. En el [estudio de Instagram de restaurantes de Miami](${restaurantIgStudyPaths.es}) de este sitio, el ${esPct}% de ${posts} publicaciones recientes de ${accounts} restaurantes fueron Reels. Un Reel editado con tus propios clips cuesta ${usd(SHORT_FORM.perVideoFrom)} por video (paquete Arranque); un proyecto promocional completo para restaurante empieza desde ${usd(RESTAURANT_PROMO.from)}.`,
    ],
    shotListLabel: "Qué grabar con el celular para un Reel del menú de temporada",
    shotList: [
      "Cada plato de temporada servido, desde arriba y de lado",
      "El salón, la barra o la terraza decorados para la fecha",
      "Una bebida que se sirve o un plato que se termina",
      "Una frase corta del chef o del dueño con la fecha y cómo reservar",
    ],
  },
];

export function seasonalAnswerFor(path: string): SeasonalAnswer | undefined {
  return SEASONAL_ANSWERS.find((entry) => entry.path === path);
}
