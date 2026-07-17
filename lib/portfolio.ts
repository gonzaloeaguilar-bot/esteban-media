/**
 * Portfolio / proof data model
 * ----------------------------------------------------------------------------
 * Typed source of truth for Esteban's portfolio. Mirrors the lib/services.ts +
 * lib/packages.ts shape: structural data + types live here, translated copy
 * lives in messages/{locale}.json, page consumers loop over data-driven counts
 * against well-defined i18n keys so missing keys fail loudly at static-gen.
 *
 * Extensibility: items reference media via a discriminated union (`MediaSource`)
 * so swapping in real Instagram permalinks (now) or self-hosted Mux / Vercel
 * Blob posters (later) does NOT require type changes. New media kinds can be
 * added by extending the union — existing items stay valid.
 *
 * Until Esteban delivers reference media, items ship in `status: "placeholder"`
 * with `media: { kind: "placeholder", note }`. The UI surfaces them dimmed +
 * labelled "Sample work coming soon".
 */

// -----------------------------------------------------------------------------
// Categories
// -----------------------------------------------------------------------------

/**
 * Stable category ids. Keep in sync with i18n keys under `Portfolio.categories.*`.
 * Order here defines display order on the portfolio index page.
 */
export const PORTFOLIO_CATEGORY_IDS = [
  "reels",
  "real-estate",
  "restaurants",
  "aerial",
  "events",
  "business-promos",
] as const;

export type PortfolioCategoryId = (typeof PORTFOLIO_CATEGORY_IDS)[number];

export interface PortfolioCategory {
  id: PortfolioCategoryId;
  /** Slug used in URLs, e.g. `/portfolio/real-estate`. Equals `id` today. */
  slug: PortfolioCategoryId;
  /** i18n key under the `Portfolio.categories.<id>` namespace. */
  i18nKey: PortfolioCategoryId;
}

export const PORTFOLIO_CATEGORIES: readonly PortfolioCategory[] =
  PORTFOLIO_CATEGORY_IDS.map((id) => ({ id, slug: id, i18nKey: id }));

// -----------------------------------------------------------------------------
// Media source discriminated union
// -----------------------------------------------------------------------------

/**
 * Instagram embed. The canonical source today — every item Esteban posts to IG
 * can be referenced by permalink. `embedHtml` is optional cache from
 * Instagram's oEmbed endpoint; if absent, callers can lazy-fetch on render.
 */
export interface InstagramEmbedSource {
  kind: "instagram";
  /** Public Instagram permalink, e.g. `https://www.instagram.com/p/CXXXXXX/`. */
  url: string;
  /** Optional pre-fetched oEmbed HTML for SSR. */
  embedHtml?: string;
  /**
   * Aspect ratio hint for skeleton loading state. Defaults to "4:5" (IG feed)
   * when unset; Reels are typically "9:16".
   */
  aspect?: "1:1" | "4:5" | "9:16" | "16:9";
}

/**
 * Self-hosted video — for the eventual Mux / Vercel Blob upgrade. `src` is the
 * canonical playback URL; `poster` is the still frame shown before play.
 */
export interface SelfHostedVideoSource {
  kind: "video";
  /** Playback URL (HLS .m3u8 from Mux, or .mp4 from Vercel Blob). */
  src: string;
  /** Required poster image — used for LCP + reduced-motion fallback. */
  poster: string;
  /** Optional duration in seconds, for UI labels. */
  durationSeconds?: number;
  aspect?: "1:1" | "4:5" | "9:16" | "16:9";
}

/**
 * Single image — for stills, photography work, or the poster-only fallback
 * when video isn't appropriate.
 */
export interface ImageSource {
  kind: "image";
  src: string;
  /** Alt text MUST be authored (a11y); never auto-generated. */
  alt: string;
  aspect?: "1:1" | "4:5" | "9:16" | "16:9";
}

/**
 * Placeholder for items awaiting real media from Esteban. UI should render a
 * dimmed card with the `note` as caption. Never ship a live page anchored on
 * placeholder items alone — at least one non-placeholder per category.
 */
export interface PlaceholderSource {
  kind: "placeholder";
  /** Short note explaining what's coming, e.g. "Aerial reel — pending upload". */
  note: string;
  aspect?: "1:1" | "4:5" | "9:16" | "16:9";
}

export type MediaSource =
  | InstagramEmbedSource
  | SelfHostedVideoSource
  | ImageSource
  | PlaceholderSource;

// -----------------------------------------------------------------------------
// Portfolio item
// -----------------------------------------------------------------------------

export type PortfolioItemStatus = "live" | "placeholder";

export interface PortfolioItem {
  /** Stable, URL-safe id. Used as React key + slug. */
  id: string;
  /** Category bucket — must match a PortfolioCategoryId. */
  category: PortfolioCategoryId;
  /**
   * Display title. Project-name-like strings (e.g. "Brickell Penthouse Listing")
   * stay language-neutral; for items that need translation, use `titleI18nKey`
   * to override.
   */
  title: string;
  /** Optional i18n key override for `title`. Resolved under `Portfolio.items.<key>.title`. */
  titleI18nKey?: string;
  /** Optional one-liner. If translated, use `descriptionI18nKey` instead. */
  description?: string;
  descriptionI18nKey?: string;
  /** ISO date of capture / publish — used for sort + freshness signals. */
  capturedAt?: string;
  /** Free-form location label, e.g. "Fort Lauderdale, FL". */
  location?: string;
  /** Free-form tags for filtering — kept flexible by design. */
  tags?: readonly string[];
  /** The media surface. */
  media: MediaSource;
  /** Featured items can be promoted to the homepage strip. */
  featured?: boolean;
  /** Pipeline status. `placeholder` items render in a dimmed "coming soon" state. */
  status: PortfolioItemStatus;
}

// -----------------------------------------------------------------------------
// Source of truth (data)
// -----------------------------------------------------------------------------

/**
 * Live portfolio items. Today: all placeholders, one per category, so consuming
 * pages can render structure without empty buckets. Replace `media.kind` from
 * `placeholder` → `instagram` (or `video`) as Esteban delivers references.
 *
 * Keep this list ordered intentionally — first item per category surfaces in
 * the category card preview.
 */
export const PORTFOLIO_ITEMS: readonly PortfolioItem[] = [
  {
    id: "reel-coming-soon-01",
    category: "reels",
    title: "Featured Reel",
    status: "placeholder",
    featured: true,
    media: {
      kind: "placeholder",
      note: "Cinematic reel — pending upload from Esteban",
      aspect: "9:16",
    },
  },
  {
    id: "real-estate-coming-soon-01",
    category: "real-estate",
    title: "Listing Walkthrough",
    location: "South Florida",
    status: "placeholder",
    media: {
      kind: "placeholder",
      note: "Listing walkthrough — pending upload from Esteban",
      aspect: "16:9",
    },
  },
  {
    id: "restaurants-coming-soon-01",
    category: "restaurants",
    title: "Restaurant Brand Film",
    status: "placeholder",
    media: {
      kind: "placeholder",
      note: "Restaurant brand film — pending upload from Esteban",
      aspect: "9:16",
    },
  },
  {
    id: "aerial-coming-soon-01",
    category: "aerial",
    title: "Aerial Showreel",
    status: "placeholder",
    featured: true,
    media: {
      kind: "placeholder",
      note: "Aerial showreel — pending upload from Esteban",
      aspect: "16:9",
    },
  },
  {
    id: "events-coming-soon-01",
    category: "events",
    title: "Event Recap",
    status: "placeholder",
    media: {
      kind: "placeholder",
      note: "Event recap — pending upload from Esteban",
      aspect: "9:16",
    },
  },
  {
    id: "business-promos-coming-soon-01",
    category: "business-promos",
    title: "Local Business Promo",
    status: "placeholder",
    media: {
      kind: "placeholder",
      note: "Local business promo — pending upload from Esteban",
      aspect: "9:16",
    },
  },
];

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

/** All categories in declared display order. */
export function getPortfolioCategories(): readonly PortfolioCategory[] {
  return PORTFOLIO_CATEGORIES;
}

/** Items for a single category, in declared order. */
export function getPortfolioItemsByCategory(
  category: PortfolioCategoryId,
): readonly PortfolioItem[] {
  return PORTFOLIO_ITEMS.filter((item) => item.category === category);
}

/**
 * Featured items for homepage strips. Prefers `live` items, falls back to
 * placeholders when nothing live is available (early-stage site).
 */
export function getFeaturedPortfolioItems(limit?: number): readonly PortfolioItem[] {
  const featured = PORTFOLIO_ITEMS.filter((item) => item.featured);
  const live = featured.filter((item) => item.status === "live");
  const pool = live.length > 0 ? live : featured;
  return typeof limit === "number" ? pool.slice(0, limit) : pool;
}

/** Lookup by stable id. */
export function getPortfolioItemById(id: string): PortfolioItem | undefined {
  return PORTFOLIO_ITEMS.find((item) => item.id === id);
}

/** Lookup category by slug — useful for `/portfolio/[slug]` route handlers. */
export function getPortfolioCategoryBySlug(
  slug: string,
): PortfolioCategory | undefined {
  return PORTFOLIO_CATEGORIES.find((cat) => cat.slug === slug);
}

/** Count of placeholder items — useful for diagnostics + dashboards. */
export function getPlaceholderItemCount(): number {
  return PORTFOLIO_ITEMS.filter((item) => item.status === "placeholder").length;
}

/** Live (non-placeholder) item count. */
export function getLivePortfolioItemCount(): number {
  return PORTFOLIO_ITEMS.filter((item) => item.status === "live").length;
}

/** Narrowing helper: is this media source an Instagram embed? */
export function isInstagramSource(
  media: MediaSource,
): media is InstagramEmbedSource {
  return media.kind === "instagram";
}

/** Narrowing helper: is this media source a self-hosted video? */
export function isSelfHostedVideoSource(
  media: MediaSource,
): media is SelfHostedVideoSource {
  return media.kind === "video";
}

/** Narrowing helper: placeholder check. */
export function isPlaceholderSource(
  media: MediaSource,
): media is PlaceholderSource {
  return media.kind === "placeholder";
}
