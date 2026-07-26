import enMessages from "@/messages/en.json";
import esMessages from "@/messages/es.json";
import {
  PORTFOLIO_ITEMS,
  isYouTubeSource,
  type PortfolioCategoryId,
  type PortfolioItem,
  type YouTubeSource,
} from "@/lib/portfolio";

export type PortfolioWatchLocale = "en" | "es";

export type LiveYouTubePortfolioItem = PortfolioItem & {
  media: YouTubeSource;
};

type PortfolioItemCopy = {
  title: string;
  summary: string;
  credits: string;
};

type PortfolioCatalog = {
  Portfolio: {
    categories: Record<PortfolioCategoryId, { title: string }>;
    items: Record<string, PortfolioItemCopy>;
  };
};

const catalogs = {
  en: enMessages as PortfolioCatalog,
  es: esMessages as PortfolioCatalog,
} satisfies Record<PortfolioWatchLocale, PortfolioCatalog>;

const relevantServiceIds = {
  animation: { en: "ai-content", es: "contenido-ia" },
  "business-promos": { en: "on-location", es: "videografia" },
  "social-content": { en: "social-planning", es: "planificacion-social" },
  events: { en: "on-location", es: "videografia" },
  editing: { en: "editing", es: "edicion" },
  narrative: { en: "editing", es: "edicion" },
  "web-design": { en: "website-design", es: "diseno-web" },
} satisfies Record<PortfolioCategoryId, Record<PortfolioWatchLocale, string>>;

const posterSizes: Record<string, { width: number; height: number }> = {
  "la-huelga": { width: 480, height: 360 },
};

const livePortfolioItems = PORTFOLIO_ITEMS.filter(
  (item) => item.status === "live",
);

export function getPortfolioWatchItems(): readonly PortfolioItem[] {
  return livePortfolioItems;
}

export function getPortfolioWatchItem(
  id: string,
): PortfolioItem | undefined {
  return livePortfolioItems.find((item) => item.id === id);
}

export function getPortfolioWatchCopy(
  item: PortfolioItem,
  locale: PortfolioWatchLocale,
): PortfolioItemCopy & { categoryTitle: string } {
  const catalog = catalogs[locale].Portfolio;
  const copy = catalog.items[item.id];

  if (!copy) {
    throw new Error(`Missing ${locale} portfolio copy for ${item.id}`);
  }

  return {
    ...copy,
    categoryTitle: catalog.categories[item.category].title,
  };
}

export function getPortfolioWatchPath(
  id: string,
  locale: PortfolioWatchLocale,
): string {
  return locale === "es" ? `/es/portafolio/${id}` : `/portfolio/${id}`;
}

export function getPortfolioWatchLanguages(id: string) {
  const englishPath = getPortfolioWatchPath(id, "en");
  const spanishPath = getPortfolioWatchPath(id, "es");

  return {
    "en-US": englishPath,
    "es-US": spanishPath,
    "x-default": englishPath,
  };
}

export function getPortfolioCollectionPath(locale: PortfolioWatchLocale) {
  return locale === "es" ? "/es/portafolio" : "/portfolio";
}

export function getPortfolioCategoryPath(
  category: PortfolioCategoryId,
  locale: PortfolioWatchLocale,
) {
  return `${getPortfolioCollectionPath(locale)}#portfolio-${category}`;
}

export function getRelevantServiceId(
  category: PortfolioCategoryId,
  locale: PortfolioWatchLocale,
) {
  return relevantServiceIds[category][locale];
}

export function getPortfolioPosterSize(id: string) {
  return posterSizes[id] ?? { width: 1280, height: 720 };
}

export function isoDurationToSeconds(duration: string): number {
  const match = duration.match(
    /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/,
  );

  if (!match) {
    throw new Error(`Unsupported ISO 8601 video duration: ${duration}`);
  }

  const hours = Number(match[1] ?? 0);
  const minutes = Number(match[2] ?? 0);
  const seconds = Number(match[3] ?? 0);

  return hours * 3600 + minutes * 60 + seconds;
}
