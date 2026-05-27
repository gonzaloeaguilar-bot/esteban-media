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
 *  - app/services/page.tsx (overview)
 *  - app/services/[slug]/page.tsx (per-service placeholder)
 *
 * Order is intentional: photography → videography → aerial → edits.
 * Positioning is "visual storyteller, not drone guy" — drone is one tool in a
 * deep toolkit, not the lead.
 */
export type Service = {
  /** URL slug, used by /services/[slug]. Stable; SEO-safe. */
  slug: string;
  /** Display name used everywhere a label is shown. */
  name: string;
  /** Short, one-line teaser used on cards and strips. */
  blurb: string;
  /** Longer description used on the overview hero and detail placeholder. */
  longBlurb: string;
  /** Lucide icon paired with the service. */
  Icon: LucideIcon;
};

export const SERVICES: readonly Service[] = [
  {
    slug: "photography",
    name: "Photography",
    blurb:
      "Portraits, events, commercial, and lifestyle — studio or on-location.",
    longBlurb:
      "Portraits, events, commercial, and lifestyle photography across South Florida. Studio sessions, on-location coverage, and bilingual direction (EN/ES) on set.",
    Icon: Camera,
  },
  {
    slug: "videography",
    name: "Videography",
    blurb:
      "Brand films, promos, and social cutdowns scoped to your shoot.",
    longBlurb:
      "Brand films, promos, event coverage, and social cutdowns. Story-first directing on the day so the edit comes together quickly afterward.",
    Icon: Video,
  },
  {
    slug: "aerial",
    name: "Aerial / Drone",
    blurb:
      "Licensed drone capture for venues, properties, and brand films.",
    longBlurb:
      "Licensed Part 107 drone capture for venues, real estate, weddings, and brand films. Cinematic moves, not just real-estate flyovers.",
    Icon: Plane,
  },
  {
    slug: "video-editing",
    name: "Video Editing",
    blurb: "Story-first editing with professional color grading.",
    longBlurb:
      "Story-first editing and professional color grading. Bring your own footage or pair it with a shoot — delivery in any aspect ratio for any platform.",
    Icon: Film,
  },
  {
    slug: "photo-editing",
    name: "Photo Editing",
    blurb: "Retouching, color, and culling — bring your RAWs.",
    longBlurb:
      "Retouching, color, and culling. Send your RAWs; receive a polished edit ready for web, print, or social.",
    Icon: ImageIcon,
  },
] as const;

/** All slugs in the canonical order — handy for generateStaticParams. */
export const SERVICE_SLUGS: readonly string[] = SERVICES.map((s) => s.slug);

/** Lookup by slug. Returns `undefined` for unknown slugs (handled by callers). */
export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
