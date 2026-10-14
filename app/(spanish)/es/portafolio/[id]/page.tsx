import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PortfolioWatchPage } from "@/components/portfolio-watch-page";
import { getPoster } from "@/lib/portfolio";
import { TITLE_BUDGET, buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl } from "@/lib/site";
import {
  getPortfolioPosterSize,
  getPortfolioWatchCopy,
  getPortfolioWatchItem,
  getPortfolioWatchItems,
  getPortfolioWatchLanguages,
  getPortfolioWatchPath,
} from "@/lib/portfolio-watch";

type PortfolioWatchRouteProps = {
  params: Promise<{ id: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getPortfolioWatchItems().map((item) => ({ id: item.id }));
}

export async function generateMetadata({
  params,
}: PortfolioWatchRouteProps): Promise<Metadata> {
  const { id } = await params;
  const item = getPortfolioWatchItem(id);

  if (!item) {
    notFound();
  }

  const copy = getPortfolioWatchCopy(item, "es");
  const path = getPortfolioWatchPath(item.id, "es");
  const posterSize = getPortfolioPosterSize(item.id);
  const posterUrl = getPoster(item) ?? "";

  return buildPageMetadata({
    // Localised so the EN/ES watch pages stop sharing one <title> (9
    // duplicate titles, SEO/GEO audit 2026-10-10, fix 12).
    // The "Portafolio: " prefix is dropped when it would push the title past
    // the ~60-character cut (loop row 31: 66 and 68 characters).
    title: `Portafolio: ${copy.title}`.length > TITLE_BUDGET ? copy.title : `Portafolio: ${copy.title}`,
    description: copy.metaDescription ?? copy.summary,
    descriptionMax: 155,
    path,
    locale: "es",
    languages: getPortfolioWatchLanguages(item.id),
    images: [
      {
        url: absoluteUrl(posterUrl),
        ...posterSize,
        alt: `Miniatura de ${copy.title}`,
      },
    ],
  });
}

export default async function SpanishPortfolioWatchPage({
  params,
}: PortfolioWatchRouteProps) {
  const { id } = await params;
  const item = getPortfolioWatchItem(id);

  if (!item) {
    notFound();
  }

  return <PortfolioWatchPage item={item} locale="es" />;
}
