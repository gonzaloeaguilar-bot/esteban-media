/**
 * Single source of truth for Esteban's service offerings.
 *
 * Used by:
 * - `/services` overview grid
 * - `/services/[slug]` placeholder per-service page (generateStaticParams)
 * - Top nav (eventually; for now nav just links to /services)
 *
 * NOTE: Spanish copy below is a placeholder and MUST be reviewed by a native
 * speaker before going to production. <!-- TRANSLATION REVIEW NEEDED -->
 */

import type { LucideIcon } from "lucide-react";
import {
  Camera,
  Clapperboard,
  Image as ImageIcon,
  Plane,
  Video,
} from "lucide-react";

export type ServiceSlug =
  | "aerial"
  | "photography"
  | "videography"
  | "video-editing"
  | "photo-editing";

export type Service = {
  slug: ServiceSlug;
  title: string;
  titleEs: string;
  shortDescription: string;
  shortDescriptionEs: string;
  longBlurb: string;
  icon: LucideIcon;
};

export const SERVICES: readonly Service[] = [
  {
    slug: "aerial",
    title: "Aerial cinematography",
    titleEs: "Cinematografía aérea",
    shortDescription:
      "Licensed drone work for venues, properties, and brand films.",
    shortDescriptionEs:
      "Trabajo con dron certificado para venues, propiedades y películas de marca.",
    longBlurb:
      "Part 107 certified. 4K HDR. Cinema-grade movement, insured on request, scoped to your shoot — from a single establishing shot to a full aerial package.",
    icon: Plane,
  },
  {
    slug: "photography",
    title: "Photography",
    titleEs: "Fotografía",
    shortDescription:
      "Portraits, events, commercial, lifestyle — studio or on-location.",
    shortDescriptionEs:
      "Retratos, eventos, comercial, lifestyle — estudio o en locación.",
    longBlurb:
      "Same-day previews available. Story-first direction so the photos feel like moments, not poses. Bring your brand brief or your blank canvas — we'll plan it together.",
    icon: Camera,
  },
  {
    slug: "videography",
    title: "Videography",
    titleEs: "Videografía",
    shortDescription:
      "Brand films, promos, weddings, and social cutdowns.",
    shortDescriptionEs:
      "Películas de marca, promos, bodas y cortes para redes sociales.",
    longBlurb:
      "Solo operator to full crew, scoped to your shoot. Cinematic camera movement, clean audio capture, and a deliverable plan written before we press record.",
    icon: Video,
  },
  {
    slug: "video-editing",
    title: "Video editing & color",
    titleEs: "Edición y color de video",
    shortDescription:
      "Story-first editing with professional color grading in DaVinci Resolve.",
    shortDescriptionEs:
      "Edición narrativa con color grading profesional en DaVinci Resolve.",
    longBlurb:
      "Edit-only engagements welcome — bring your RAW footage and a goal, leave with a graded cut. Turnaround quoted per project, with locked review rounds.",
    icon: Clapperboard,
  },
  {
    slug: "photo-editing",
    title: "Photo editing",
    titleEs: "Edición de fotografía",
    shortDescription:
      "Retouching, color, and culling for shoots you didn't shoot with us.",
    shortDescriptionEs:
      "Retoque, color y selección para sesiones que no hicimos nosotros.",
    longBlurb:
      "Per-image or volume pricing. Bring your RAWs. Skin and product retouching done with restraint — we're not chasing perfection, we're chasing the photo you meant to take.",
    icon: ImageIcon,
  },
] as const;

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
