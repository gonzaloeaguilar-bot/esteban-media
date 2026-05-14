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
 *  - app/[locale]/services/[slug]/page.tsx (per-service placeholder)
 *  - app/[locale]/contact/contact-form.tsx (project-type select)
 *
 * Order is intentional: photography → videography → aerial → edits.
 * Positioning is "visual storyteller, not drone guy" — drone is one tool in a
 * deep toolkit, not the lead.
 *
 * Translated names + blurbs live in `messages/{locale}.json` under
 * `Services.items.<slug>`. The lookup helper below pulls structural data
 * (icon, slug) only — callers join in the translated strings themselves.
 */
export type ServiceSlug =
  | "photography"
  | "videography"
  | "aerial"
  | "video-editing"
  | "photo-editing";

export type Service = {
  /** URL slug, used by /services/[slug]. Stable; SEO-safe. */
  slug: ServiceSlug;
  /** Lucide icon paired with the service. */
  Icon: LucideIcon;
};

export const SERVICES: readonly Service[] = [
  { slug: "photography", Icon: Camera },
  { slug: "videography", Icon: Video },
  { slug: "aerial", Icon: Plane },
  { slug: "video-editing", Icon: Film },
  { slug: "photo-editing", Icon: ImageIcon },
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
