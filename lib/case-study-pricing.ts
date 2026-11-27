import type { CaseStudyLocale, CaseStudyPriceKind } from "@/lib/case-studies";
import {
  ARRANQUE_WEEKLY_FROM,
  REAL_ESTATE_PLANS,
  SHORT_FORM,
  usd,
} from "@/lib/pricing";

/**
 * The starting price a case study shows beside its contact step.
 *
 * Case-study copy is guarded against currency figures (a price typed into a
 * story reads as what the client paid). This line is the opposite: it is read
 * from lib/pricing.ts at render time, so it moves when the price list moves and
 * it is labelled as today's starting price for comparable work.
 */
export type CaseStudyPriceLine = {
  text: string;
  href: string;
  linkLabel: string;
};

const MONTHLY_FROM = Math.min(...REAL_ESTATE_PLANS.map((plan) => plan.price));

export function caseStudyPriceLine(
  kind: CaseStudyPriceKind,
  locale: CaseStudyLocale,
): CaseStudyPriceLine {
  const perVideo = usd(SHORT_FORM.perVideoFrom);
  const es = locale === "es";
  switch (kind) {
    case "real-estate":
      return es
        ? {
            text: `Editar un Reel como estos empieza en ${perVideo} por video. Los planes mensuales para inmobiliarias empiezan en ${usd(MONTHLY_FROM)} al mes.`,
            href: "/es/precios/inmobiliaria",
            linkLabel: "Ver planes para inmobiliarias",
          }
        : {
            text: `Editing a Reel like these starts at ${perVideo} per video. Monthly real-estate plans start at ${usd(MONTHLY_FROM)} a month.`,
            href: "/pricing/real-estate",
            linkLabel: "See real-estate plans",
          };
    case "short-form":
      return es
        ? {
            text: `Editar un video corto empieza en ${perVideo} por video, o ${usd(ARRANQUE_WEEKLY_FROM.perWeek)} por semana con un video semanal.`,
            href: "/es/precios/arranque",
            linkLabel: "Ver precios de edición",
          }
        : {
            text: `Editing one short video starts at ${perVideo} per video, or ${usd(ARRANQUE_WEEKLY_FROM.perWeek)} a week for one video a week.`,
            href: "/pricing/starter",
            linkLabel: "See editing prices",
          };
    case "drone-editing":
      return es
        ? {
            text: `Editar tomas de dron que ya tienes empieza en ${perVideo} por video. Un vuelo nuevo en el sur de Florida lo hace un piloto FAA Part 107 verificado por separado y se cotiza por proyecto.`,
            href: "/es/edicion-de-video-con-dron-miami",
            linkLabel: "Ver edición de video con dron",
          }
        : {
            text: `Editing drone footage you already have starts at ${perVideo} per video. A new flight in South Florida is flown by a separately verified FAA Part 107 pilot and quoted per project.`,
            href: "/services/drone-video-editing-service-miami",
            linkLabel: "See drone video editing",
          };
  }
}
