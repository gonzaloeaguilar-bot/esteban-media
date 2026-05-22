import {
  Plane,
  Camera,
  Video,
  Film,
  Image as ImageIcon,
  type LucideIcon,
} from "lucide-react";

/**
 * Single source of truth for Esteban's service mix.
 *
 * Consumed by:
 *  - components/sections/ServicesStrip.tsx (homepage)
 *  - app/[locale]/services/page.tsx (overview)
 *  - app/[locale]/services/[slug]/page.tsx (per-service detail)
 *  - app/[locale]/contact/contact-form.tsx (project-type select)
 *
 * Order is intentional: video editing → videography → aerial → photography →
 * photo editing. Esteban is video-first; photography supports the story when
 * the project needs stills, but it is not the lead offer.
 *
 * Translated names + blurbs live in `messages/{locale}.json` under
 * `Services.items.<slug>`. The lookup helper below pulls structural data
 * (icon, slug, included-list cardinality, gallery slot count, accent gradient)
 * only — callers join in the translated strings themselves.
 *
 * "Included list" (`includedCount`) and "gallery" (`gallerySlots`) are
 * declared here so the page can render the right number of slots without
 * trusting message length (and so the i18n keys are well-defined: the page
 * loops `0..includedCount-1` against `items.<slug>.included.<n>`).
 */
export type ServiceSlug =
  | "photography"
  | "videography"
  | "aerial"
  | "video-editing"
  | "photo-editing";

/**
 * Tailwind gradient classes for the gallery placeholder tiles. Picked to give
 * each service a distinct, calm vibe without using any real photography.
 * Sticking to oklch-friendly neutral-to-tonal gradients keeps it on-brand
 * (cinematic, restrained) and works in both light and dark modes.
 *
 * TODO: real asset from Esteban — once reference work lands, the gallery
 * component can swap these gradient placeholders for `next/image` thumbs.
 */
export type ServiceAccent = {
  /** Tailwind class for `bg-gradient-to-br from-<color> to-<color>`. */
  gradient: string;
  /** Tailwind ring color class for hover/focus on placeholder tiles. */
  ring: string;
};

export type Service = {
  /** URL slug, used by /services/[slug]. Stable; SEO-safe. */
  slug: ServiceSlug;
  /** Lucide icon paired with the service. */
  Icon: LucideIcon;
  /**
   * How many "what's included" bullet keys the messages file ships for this
   * service. Page loops `0..includedCount-1` to look up
   * `Services.items.<slug>.included.<n>`. If you add a bullet in the message
   * file, bump this number; if it falls out of sync the page will throw a
   * MISSING_MESSAGE error during static generation (a feature — failure is
   * loud, not silent).
   */
  includedCount: number;
  /**
   * How many gallery placeholder tiles to render. Six gives a nice 2×3 / 3×2
   * grid at common breakpoints and reads as "varied portfolio" without
   * promising more work than Esteban has delivered yet.
   */
  gallerySlots: number;
  /** Visual treatment for placeholder tiles (gradient + accent ring). */
  accent: ServiceAccent;
};

export const SERVICES: readonly Service[] = [
  {
    slug: "video-editing",
    Icon: Film,
    includedCount: 5,
    gallerySlots: 6,
    accent: {
      gradient: "from-zinc-100 to-zinc-300 dark:from-zinc-800 dark:to-zinc-950",
      ring: "ring-zinc-300/60 dark:ring-zinc-700/60",
    },
  },
  {
    slug: "videography",
    Icon: Video,
    includedCount: 5,
    gallerySlots: 6,
    accent: {
      gradient: "from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-950",
      ring: "ring-slate-300/60 dark:ring-slate-700/60",
    },
  },
  {
    slug: "aerial",
    Icon: Plane,
    includedCount: 5,
    gallerySlots: 6,
    accent: {
      gradient: "from-sky-100 to-sky-300 dark:from-sky-900 dark:to-slate-950",
      ring: "ring-sky-300/60 dark:ring-sky-800/60",
    },
  },
  {
    slug: "photography",
    Icon: Camera,
    includedCount: 5,
    gallerySlots: 6,
    accent: {
      gradient: "from-stone-100 to-stone-300 dark:from-stone-800 dark:to-stone-950",
      ring: "ring-stone-300/60 dark:ring-stone-700/60",
    },
  },
  {
    slug: "photo-editing",
    Icon: ImageIcon,
    includedCount: 5,
    gallerySlots: 6,
    accent: {
      gradient: "from-neutral-100 to-neutral-300 dark:from-neutral-800 dark:to-neutral-950",
      ring: "ring-neutral-300/60 dark:ring-neutral-700/60",
    },
  },
] as const;

/** All slugs in the canonical order — handy for generateStaticParams. */
export const SERVICE_SLUGS: readonly ServiceSlug[] = SERVICES.map((s) => s.slug);

/**
 * Canonical English service names for non-UI contexts (email subjects, logs,
 * analytics). UI labels come from `messages/{locale}.json` — these are the
 * backend-side, locale-free names so server output stays grep-able regardless
 * of which locale the visitor used.
 */
export const CANONICAL_SERVICE_NAMES: Record<ServiceSlug, string> = {
  photography: "Photography",
  videography: "Videography",
  aerial: "Aerial / Drone",
  "video-editing": "Video Editing",
  "photo-editing": "Photo Editing",
};

/** Lookup by slug. Returns `undefined` for unknown slugs (handled by callers). */
export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

/** All services *except* the given slug, in canonical order — for "related" rails. */
export function getRelatedServices(slug: ServiceSlug): readonly Service[] {
  return SERVICES.filter((s) => s.slug !== slug);
}
