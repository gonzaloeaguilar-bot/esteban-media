import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PortfolioWatchPage } from "@/components/portfolio-watch-page";
import { buildPageMetadata } from "@/lib/site-metadata";
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

  const copy = getPortfolioWatchCopy(item, "en");
  const path = getPortfolioWatchPath(item.id, "en");
  const posterSize = getPortfolioPosterSize(item.id);

  return buildPageMetadata({
    title: copy.title,
    description: copy.summary,
    path,
    locale: "en",
    languages: getPortfolioWatchLanguages(item.id),
    images: [
      {
        url: absoluteUrl(item.media.poster),
        ...posterSize,
        alt: `Video thumbnail for ${copy.title}`,
      },
    ],
  });
}

export default async function EnglishPortfolioWatchPage({
  params,
}: PortfolioWatchRouteProps) {
  const { id } = await params;
  const item = getPortfolioWatchItem(id);

  if (!item) {
    notFound();
  }

  return <PortfolioWatchPage item={item} locale="en" />;
}
