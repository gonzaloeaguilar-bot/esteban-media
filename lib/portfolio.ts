/**
 * Typed portfolio source of truth.
 *
 * Facts in this file are limited to Esteban's curated portfolio and the public
 * YouTube uploads selected for this site. Local poster images keep the cards
 * fast while each canonical watch URL preserves the original public source.
 */

// -----------------------------------------------------------------------------
// Categories
// -----------------------------------------------------------------------------

/** Keep in sync with `Portfolio.categories.*` in both message files. */
export const PORTFOLIO_CATEGORY_IDS = [
  "business-promos",
  "events",
  "editing",
  "social-content",
  "narrative",
  "animation",
  "web-design",
] as const;

export type PortfolioCategoryId = (typeof PORTFOLIO_CATEGORY_IDS)[number];

export interface PortfolioCategory {
  id: PortfolioCategoryId;
  slug: PortfolioCategoryId;
  i18nKey: PortfolioCategoryId;
}

export const PORTFOLIO_CATEGORIES: readonly PortfolioCategory[] =
  PORTFOLIO_CATEGORY_IDS.map((id) => ({ id, slug: id, i18nKey: id }));

// -----------------------------------------------------------------------------
// Media source discriminated union
// -----------------------------------------------------------------------------

export interface InstagramEmbedSource {
  kind: "instagram";
  url: string;
  embedHtml?: string;
  aspect?: "1:1" | "4:5" | "9:16" | "16:9";
}

export interface SelfHostedVideoSource {
  kind: "video";
  src: string;
  poster: string;
  durationSeconds?: number;
  aspect?: "1:1" | "4:5" | "9:16" | "16:9";
}

/**
 * A selected video from Esteban's public YouTube portfolio.
 *
 * `url` is always the canonical watch URL for `videoId`. `poster` is a local,
 * approved still so pages do not depend on YouTube thumbnails for initial
 * rendering. Portfolio videos are landscape and therefore fixed to 16:9.
 */
export interface YouTubeSource {
  kind: "youtube";
  videoId: string;
  url: `https://www.youtube.com/watch?v=${string}`;
  poster: `/portfolio/${string}.jpg`;
  /** Public YouTube upload timestamp, verified from the watch page metadata. */
  uploadDate: string;
  /** Public YouTube duration in ISO 8601 format. */
  duration: string;
  aspect: "16:9";
}

export interface ImageSource {
  kind: "image";
  src: string;
  alt: string;
  aspect?: "1:1" | "4:5" | "9:16" | "16:9";
}

export interface PlaceholderSource {
  kind: "placeholder";
  note: string;
  aspect?: "1:1" | "4:5" | "9:16" | "16:9";
}

export type MediaSource =
  | InstagramEmbedSource
  | SelfHostedVideoSource
  | YouTubeSource
  | ImageSource
  | PlaceholderSource;

// -----------------------------------------------------------------------------
// Portfolio items
// -----------------------------------------------------------------------------

export type PortfolioItemStatus = "live" | "placeholder";

export type PortfolioItemI18nKey =
  | "my-dler"
  | "banacol"
  | "bar-door-monkey"
  | "healthy-smile"
  | "homeowners"
  | "diana-jack"
  | "la-huelga"
  | "ml-colombia"
  | "titanforge"
  | "gains-from-geebs"
  | "front-line-auto"
  | "flas-concierge"
  | "gonzalo-tech-chatbots";

export interface PortfolioItem {
  /** Stable URL-safe id, also used by the local poster filename. */
  id: string;
  category: PortfolioCategoryId;
  /** Language-neutral fallback used outside an i18n context. */
  title: string;
  /** Namespace key resolved as `Portfolio.items.<key>.title`. */
  titleI18nKey: PortfolioItemI18nKey;
  /** Namespace key resolved as `Portfolio.items.<key>.summary`. */
  descriptionI18nKey: PortfolioItemI18nKey;
  /** Namespace key resolved as `Portfolio.items.<key>.credits`. */
  creditsI18nKey: PortfolioItemI18nKey;
  /** Verified portfolio year only; omitted when the source gives no year. */
  year?: number;
  /** Verified location context only; omitted when not specified. */
  location?: string;
  media: MediaSource;
  featured?: boolean;
  status: PortfolioItemStatus;
}

/**
 * Eight selected, live projects from Esteban's curated earlier portfolio.
 * Order is intentional: featured and category views preserve it.
 */
export const PORTFOLIO_ITEMS: readonly PortfolioItem[] = [
  {
    id: "flas-concierge",
    category: "web-design",
    title: "Fort Lauderdale Auto Sale (FLAS AI Concierge)",
    titleI18nKey: "flas-concierge",
    descriptionI18nKey: "flas-concierge",
    creditsI18nKey: "flas-concierge",
    year: 2026,
    location: "Fort Lauderdale",
    featured: true,
    status: "live",
    media: {
      kind: "image",
      src: "/portfolio/flas-concierge.jpg",
      alt: "Fort Lauderdale Auto Sale BHPH Dealership Web System & AI Concierge Bot",
      aspect: "16:9",
    },
  },
  {
    id: "gains-from-geebs",
    category: "web-design",
    title: "Gains From Geebs Web App & AI Bot",
    titleI18nKey: "gains-from-geebs",
    descriptionI18nKey: "gains-from-geebs",
    creditsI18nKey: "gains-from-geebs",
    year: 2026,
    featured: true,
    status: "live",
    media: {
      kind: "image",
      src: "/portfolio/gains-from-geebs.jpg",
      alt: "Gains From Geebs Interactive Fitness Platform & Coaching AI Bot",
      aspect: "16:9",
    },
  },
  {
    id: "titanforge",
    category: "web-design",
    title: "TitanForge Platform & AI Bot",
    titleI18nKey: "titanforge",
    descriptionI18nKey: "titanforge",
    creditsI18nKey: "titanforge",
    year: 2026,
    location: "South Florida",
    featured: true,
    status: "live",
    media: {
      kind: "image",
      src: "/portfolio/titanforge.jpg",
      alt: "TitanForge Web Design & AI Chatbot System",
      aspect: "16:9",
    },
  },
  {
    id: "bar-door-monkey",
    category: "business-promos",
    title: "Bar Door Monkey Miami",
    titleI18nKey: "bar-door-monkey",
    descriptionI18nKey: "bar-door-monkey",
    creditsI18nKey: "bar-door-monkey",
    year: 2020,
    location: "Miami",
    featured: true,
    status: "live",
    media: {
      kind: "youtube",
      videoId: "m1PZOcutQHg",
      url: "https://www.youtube.com/watch?v=m1PZOcutQHg",
      poster: "/portfolio/bar-door-monkey.jpg",
      uploadDate: "2022-08-31T17:06:40-07:00",
      duration: "PT0M55S",
      aspect: "16:9",
    },
  },
  {
    id: "diana-jack",
    category: "events",
    title: "Diana & Jack",
    titleI18nKey: "diana-jack",
    descriptionI18nKey: "diana-jack",
    creditsI18nKey: "diana-jack",
    featured: true,
    status: "live",
    media: {
      kind: "youtube",
      videoId: "3tjLDtVrhG4",
      url: "https://www.youtube.com/watch?v=3tjLDtVrhG4",
      poster: "/portfolio/diana-jack.jpg",
      uploadDate: "2022-08-31T17:21:29-07:00",
      duration: "PT1M12S",
      aspect: "16:9",
    },
  },
  {
    id: "banacol",
    category: "business-promos",
    title: "Banacol",
    titleI18nKey: "banacol",
    descriptionI18nKey: "banacol",
    creditsI18nKey: "banacol",
    year: 2021,
    featured: true,
    status: "live",
    media: {
      kind: "youtube",
      videoId: "DgeKWR8s80M",
      url: "https://www.youtube.com/watch?v=DgeKWR8s80M",
      poster: "/portfolio/banacol.jpg",
      uploadDate: "2022-08-31T16:15:23-07:00",
      duration: "PT1M48S",
      aspect: "16:9",
    },
  },
  {
    id: "healthy-smile",
    category: "business-promos",
    title: "Healthy Smile Miami",
    titleI18nKey: "healthy-smile",
    descriptionI18nKey: "healthy-smile",
    creditsI18nKey: "healthy-smile",
    year: 2021,
    location: "Miami",
    featured: true,
    status: "live",
    media: {
      kind: "youtube",
      videoId: "YTJW6zn14S8",
      url: "https://www.youtube.com/watch?v=YTJW6zn14S8",
      poster: "/portfolio/healthy-smile.jpg",
      uploadDate: "2022-08-31T16:01:17-07:00",
      duration: "PT0M18S",
      aspect: "16:9",
    },
  },
  {
    id: "homeowners",
    category: "editing",
    title: "Homeowners",
    titleI18nKey: "homeowners",
    descriptionI18nKey: "homeowners",
    creditsI18nKey: "homeowners",
    year: 2021,
    status: "live",
    media: {
      kind: "youtube",
      videoId: "2m3iHq0JrLM",
      url: "https://www.youtube.com/watch?v=2m3iHq0JrLM",
      poster: "/portfolio/homeowners.jpg",
      uploadDate: "2022-08-31T16:04:51-07:00",
      duration: "PT0M23S",
      aspect: "16:9",
    },
  },
  {
    id: "la-huelga",
    category: "narrative",
    title: "La Huelga",
    titleI18nKey: "la-huelga",
    descriptionI18nKey: "la-huelga",
    creditsI18nKey: "la-huelga",
    year: 2017,
    status: "live",
    media: {
      kind: "youtube",
      videoId: "hsfQ4aKx0B8",
      url: "https://www.youtube.com/watch?v=hsfQ4aKx0B8",
      poster: "/portfolio/la-huelga.jpg",
      uploadDate: "2017-05-29T16:53:52-07:00",
      duration: "PT0M57S",
      aspect: "16:9",
    },
  },
  {
    id: "ml-colombia",
    category: "social-content",
    title: "ML Colombia",
    titleI18nKey: "ml-colombia",
    descriptionI18nKey: "ml-colombia",
    creditsI18nKey: "ml-colombia",
    status: "live",
    media: {
      kind: "youtube",
      videoId: "poIo-VCBeAw",
      url: "https://www.youtube.com/watch?v=poIo-VCBeAw",
      poster: "/portfolio/ml-colombia.jpg",
      uploadDate: "2022-08-31T17:10:32-07:00",
      duration: "PT0M24S",
      aspect: "16:9",
    },
  },
  {
    id: "my-dler",
    category: "animation",
    title: "My D'ler",
    titleI18nKey: "my-dler",
    descriptionI18nKey: "my-dler",
    creditsI18nKey: "my-dler",
    status: "live",
    media: {
      kind: "youtube",
      videoId: "vMvbC5yOzgs",
      url: "https://www.youtube.com/watch?v=vMvbC5yOzgs",
      poster: "/portfolio/my-dler.jpg",
      uploadDate: "2024-01-23T14:21:54-08:00",
      duration: "PT0M11S",
      aspect: "16:9",
    },
  },
  {
    id: "front-line-auto",
    category: "web-design",
    title: "Frontline Auto & AI Concierge",
    titleI18nKey: "front-line-auto",
    descriptionI18nKey: "front-line-auto",
    creditsI18nKey: "front-line-auto",
    year: 2026,
    location: "Miami / Broward",
    featured: true,
    status: "live",
    media: {
      kind: "image",
      src: "/portfolio/front-line-auto.jpg",
      alt: "Frontline Auto Dealership Platform & AI Concierge Bot",
      aspect: "16:9",
    },
  },
  {
    id: "gonzalo-tech-chatbots",
    category: "web-design",
    title: "Conversational AI Lead Chatbots (Geebs & FLAS)",
    titleI18nKey: "gonzalo-tech-chatbots",
    descriptionI18nKey: "gonzalo-tech-chatbots",
    creditsI18nKey: "gonzalo-tech-chatbots",
    year: 2026,
    location: "South Florida",
    featured: true,
    status: "live",
    media: {
      kind: "image",
      src: "/portfolio/gonzalo-tech-chatbots.jpg",
      alt: "Custom AI Conversational Lead Bots for Geebs & FLAS",
      aspect: "16:9",
    },
  },
];

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

export function getPortfolioCategories(): readonly PortfolioCategory[] {
  return PORTFOLIO_CATEGORIES;
}

export function getPortfolioItemsByCategory(
  category: PortfolioCategoryId,
): readonly PortfolioItem[] {
  return PORTFOLIO_ITEMS.filter((item) => item.category === category);
}

/** Featured surfaces must never promote placeholders. */
export function getFeaturedPortfolioItems(limit?: number): readonly PortfolioItem[] {
  const liveFeatured = PORTFOLIO_ITEMS.filter(
    (item) => item.featured && item.status === "live",
  );
  return typeof limit === "number"
    ? liveFeatured.slice(0, Math.max(0, limit))
    : liveFeatured;
}

export function getPortfolioItemById(id: string): PortfolioItem | undefined {
  return PORTFOLIO_ITEMS.find((item) => item.id === id);
}

export function getPortfolioCategoryBySlug(
  slug: string,
): PortfolioCategory | undefined {
  return PORTFOLIO_CATEGORIES.find((category) => category.slug === slug);
}

export function getPlaceholderItemCount(): number {
  return PORTFOLIO_ITEMS.filter((item) => item.status === "placeholder").length;
}

export function getLivePortfolioItemCount(): number {
  return PORTFOLIO_ITEMS.filter((item) => item.status === "live").length;
}

export function isInstagramSource(
  media: MediaSource,
): media is InstagramEmbedSource {
  return media.kind === "instagram";
}

export function isSelfHostedVideoSource(
  media: MediaSource,
): media is SelfHostedVideoSource {
  return media.kind === "video";
}

export function isYouTubeSource(
  media: MediaSource,
): media is YouTubeSource {
  return media.kind === "youtube";
}

export function isPlaceholderSource(
  media: MediaSource,
): media is PlaceholderSource {
  return media.kind === "placeholder";
}
