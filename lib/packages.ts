import {
  Calendar,
  Repeat,
  Scissors,
  type LucideIcon,
} from "lucide-react";

import type { LocalSeoPageSlug } from "@/lib/local-seo-pages";
import type { ServiceSlug } from "@/lib/services";

/**
 * Single source of truth for Esteban's launch monetization offers.
 *
 * Consumed by:
 *  - app/[locale]/packages/page.tsx (index page with the three offer cards)
 *  - components/sections/PackagesStrip.tsx (compact cards on homepage, service
 *    detail pages, and local SEO pages)
 *  - JSON-LD builders in lib/seo/schema.ts (Service + Offer + FAQPage)
 *
 * Structural data lives here (slug, price range, accent, deliverable count,
 * related service/local-page links). Translated copy lives in
 * messages/{locale}.json under `Packages.items.<slug>` — the page loops
 * `0..deliverableCount - 1` and `0..faqCount - 1` against the message keys,
 * so adding a bullet means bumping the count *and* the message file together.
 * If they fall out of sync the page throws MISSING_MESSAGE at static-gen
 * time — that's a feature: silent failure is worse than a loud crash.
 *
 * Pricing is always rendered as "starting at" or as a typical range — never
 * as a fixed quote. See the storefront monetization audit
 * (`docs/storefront-monetization-audit.md`) for the source pricing logic.
 */

export type PackageSlug =
  | "edit-only-starter"
  | "content-day-mini"
  | "local-business-monthly";

/**
 * Price range expressed in USD. `cadence` distinguishes a per-project anchor
 * (Starter / Content Day) from a recurring monthly retainer (Local Business
 * Monthly). Rendered by the page as e.g. "Starting at $250–$500" or
 * "$1,200–$2,500 / month".
 */
export type PackagePriceRange = {
  min: number;
  max: number;
  /** "project" = one-off engagement; "month" = monthly retainer. */
  cadence: "project" | "month";
};

export type PackageAccent = {
  /** Tailwind class fragment for the card header gradient. */
  gradient: string;
  /** Tailwind ring class used on hover/focus and around the accent icon. */
  ring: string;
};

export type Package = {
  /** Stable URL-safe slug. Never localised. */
  slug: PackageSlug;
  /** Lucide icon paired with the package for visual scanning. */
  Icon: LucideIcon;
  /** Starting price anchor. Always presented as "starting at" or a range. */
  priceRangeUsd: PackagePriceRange;
  /**
   * How many deliverable bullet keys ship in messages under
   * `Packages.items.<slug>.deliverables.<n>`. Out-of-sync = MISSING_MESSAGE
   * at build time, which is the desired failure mode.
   */
  deliverableCount: number;
  /**
   * How many caveat/honesty disclosures ship under
   * `Packages.items.<slug>.caveats.<n>`. We always render caveats — turnaround
   * promises, FAA Part 107 status, "starting at" framing, scope notes — so
   * the buyer never gets a quote that contradicts the storefront audit
   * (see `docs/storefront-monetization-audit.md#caveats`).
   */
  caveatCount: number;
  /**
   * How many package-level FAQ entries ship under
   * `Packages.items.<slug>.faqs.<n>` (each entry has `.question` + `.answer`).
   * Drives the FAQPage JSON-LD schema and the on-page accordion-style block.
   */
  faqCount: number;
  /**
   * Service detail pages that share intent with this package. Used to
   * generate "related services" rails on the package detail and to inform
   * the JSON-LD Service node. Pulls from the canonical ServiceSlug union so
   * a typo is a compile-time error, not a 404.
   */
  relatedServiceSlugs: readonly ServiceSlug[];
  /**
   * Local/niche SEO landing pages this package converts well from. Used by
   * the internal-link block on the package detail and rendered on each
   * local page's PackagesStrip so the buyer journey from local → package →
   * contact is one click each way.
   *
   * Pulls from the typed LocalSeoPageSlug union so missing/renamed slugs
   * surface at compile time.
   */
  relatedLocalSlugs: readonly LocalSeoPageSlug[];
  /** Visual treatment (gradient + ring) for the card. */
  accent: PackageAccent;
};

export const PACKAGES: readonly Package[] = [
  {
    slug: "edit-only-starter",
    Icon: Scissors,
    priceRangeUsd: { min: 250, max: 500, cadence: "project" },
    deliverableCount: 4,
    caveatCount: 3,
    faqCount: 4,
    relatedServiceSlugs: ["video-editing"],
    relatedLocalSlugs: [
      "fort-lauderdale-reels-video-editing",
      "miami-video-editor",
      "fort-lauderdale-video-editor",
    ],
    accent: {
      gradient: "from-zinc-100 to-zinc-300 dark:from-zinc-800 dark:to-zinc-950",
      ring: "ring-zinc-300/60 dark:ring-zinc-700/60",
    },
  },
  {
    slug: "content-day-mini",
    Icon: Calendar,
    priceRangeUsd: { min: 750, max: 1500, cadence: "project" },
    deliverableCount: 5,
    caveatCount: 3,
    faqCount: 4,
    relatedServiceSlugs: ["videography", "video-editing", "photography"],
    relatedLocalSlugs: [
      "broward-video-editing",
      "miami-restaurant-video",
      "fort-lauderdale-reels-video-editing",
    ],
    accent: {
      gradient: "from-sky-100 to-sky-300 dark:from-sky-900 dark:to-slate-950",
      ring: "ring-sky-300/60 dark:ring-sky-800/60",
    },
  },
  {
    slug: "local-business-monthly",
    Icon: Repeat,
    priceRangeUsd: { min: 1200, max: 2500, cadence: "month" },
    deliverableCount: 5,
    caveatCount: 3,
    faqCount: 4,
    relatedServiceSlugs: ["videography", "video-editing"],
    relatedLocalSlugs: [
      "broward-video-editing",
      "miami-restaurant-video",
      "fort-lauderdale-reels-video-editing",
    ],
    accent: {
      gradient:
        "from-stone-100 to-stone-300 dark:from-stone-800 dark:to-stone-950",
      ring: "ring-stone-300/60 dark:ring-stone-700/60",
    },
  },
] as const;

/** Slugs in canonical order — useful for generateStaticParams / sitemaps. */
export const PACKAGE_SLUGS: readonly PackageSlug[] = PACKAGES.map(
  (p) => p.slug,
);

/** Lookup by slug. Returns `undefined` for unknown slugs (callers handle). */
export function getPackage(slug: string): Package | undefined {
  return PACKAGES.find((p) => p.slug === slug);
}

/**
 * Packages that explicitly call out a related local SEO page. Used by
 * `PackagesStrip` rendered on each local landing page so the strip can
 * surface only the offers that make sense for that buyer (e.g. the drone
 * landing page sees the Content Day Mini, not the Edit-Only Starter).
 *
 * Falls back to the full list if no package mentions the slug — better to
 * show three options than nothing.
 */
export function getPackagesForLocalSlug(
  slug: LocalSeoPageSlug,
): readonly Package[] {
  const matches = PACKAGES.filter((p) =>
    p.relatedLocalSlugs.includes(slug),
  );
  return matches.length > 0 ? matches : PACKAGES;
}

/**
 * Packages that explicitly call out a related service. Used by
 * `PackagesStrip` rendered on each service detail page. Falls back to the
 * full list if none match (defensive — every package today maps to at
 * least one service, but we don't want a future service slug to render
 * an empty strip silently).
 */
export function getPackagesForServiceSlug(
  slug: ServiceSlug,
): readonly Package[] {
  const matches = PACKAGES.filter((p) =>
    p.relatedServiceSlugs.includes(slug),
  );
  return matches.length > 0 ? matches : PACKAGES;
}

/**
 * Canonical English package names for non-UI contexts (logs, analytics,
 * email subjects, JSON-LD `alternateName`). UI labels come from messages.
 */
export const CANONICAL_PACKAGE_NAMES: Record<PackageSlug, string> = {
  "edit-only-starter": "Edit-Only Starter",
  "content-day-mini": "Content Day Mini",
  "local-business-monthly": "Local Business Monthly",
};

/**
 * Format a price range as a display string. Kept here (not in the page)
 * because both the page and the JSON-LD builder need the same canonical
 * formatting — drift would mean what crawlers see ≠ what users see.
 *
 * Locale affects ONLY the per-month suffix ("/ month" vs "/ mes"). Currency
 * is rendered in $ USD on both sides because Esteban invoices in USD —
 * localising the symbol would be misleading.
 */
export function formatPriceRange(
  range: PackagePriceRange,
  locale: "en" | "es",
): string {
  const min = range.min.toLocaleString("en-US");
  const max = range.max.toLocaleString("en-US");
  const base = `$${min}–$${max}`;
  if (range.cadence !== "month") return base;
  return locale === "es" ? `${base} / mes` : `${base} / month`;
}
