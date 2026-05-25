/**
 * Single source of truth for Esteban's service offerings.
 *
 * Used by:
 * - `/services` overview grid
 * - `/services/[slug]` detail pages (generateStaticParams pre-renders all 5)
 * - Top nav (eventually; for now nav just links to /services)
 *
 * NOTE: All Spanish (`*Es`) copy below is a SCAFFOLDED PLACEHOLDER and MUST be
 * reviewed by a native Spanish speaker (Gonzalo) before going to production.
 * Grep for `TRANSLATION REVIEW NEEDED` to find every block.
 * <!-- TRANSLATION REVIEW NEEDED -->
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
  tagline: string;
  taglineEs: string;
  shortDescription: string;
  shortDescriptionEs: string;
  longBlurb: string;
  longBlurbEs: string;
  included: readonly string[];
  includedEs: readonly string[];
  gallerySlots: number;
  /** Tailwind class string used for placeholder gallery tile gradient. */
  accentGradient: string;
  icon: LucideIcon;
  /** Set to true while ES copy is unreviewed; grep target for translators. */
  _translationReviewNeeded: true;
};

export const SERVICES: readonly Service[] = [
  {
    slug: "aerial",
    title: "Aerial cinematography",
    titleEs: "Cinematografía aérea",
    tagline: "Part 107 certified. Cinema-grade movement.",
    taglineEs: "Certificado Parte 107. Movimiento de cine.",
    shortDescription:
      "Licensed drone work for venues, properties, and brand films.",
    shortDescriptionEs:
      "Trabajo con dron certificado para venues, propiedades y películas de marca.",
    longBlurb:
      "Part 107 certified. 4K HDR. Cinema-grade movement, insured on request, scoped to your shoot — from a single establishing shot to a full aerial package.",
    longBlurbEs:
      "Certificado Parte 107. 4K HDR. Movimiento de calidad cinematográfica, con seguro disponible, ajustado a tu producción — desde una toma de apertura hasta un paquete aéreo completo.",
    included: [
      "Pre-flight site survey + airspace authorization (LAANC where required)",
      "4K HDR aerial footage with cinema-grade movement",
      "On-set spotter and FAA Part 107 compliance",
      "Selects delivered the same day; full footage within 72 hours",
      "Color-graded hero clip ready for social",
    ],
    includedEs: [
      "Inspección previa del lugar + autorización del espacio aéreo (LAANC cuando se requiera)",
      "Material aéreo 4K HDR con movimiento de calidad cinematográfica",
      "Observador en sitio y cumplimiento FAA Parte 107",
      "Selecciones entregadas el mismo día; material completo en 72 horas",
      "Clip principal con color grading listo para redes sociales",
    ],
    gallerySlots: 6,
    accentGradient:
      "from-sky-500/20 via-indigo-500/10 to-slate-900/40",
    icon: Plane,
    _translationReviewNeeded: true,
  },
  {
    slug: "photography",
    title: "Photography",
    titleEs: "Fotografía",
    tagline: "Story-first direction. Same-day previews.",
    taglineEs: "Dirección narrativa. Previsualizaciones el mismo día.",
    shortDescription:
      "Portraits, events, commercial, lifestyle — studio or on-location.",
    shortDescriptionEs:
      "Retratos, eventos, comercial, lifestyle — estudio o en locación.",
    longBlurb:
      "Same-day previews available. Story-first direction so the photos feel like moments, not poses. Bring your brand brief or your blank canvas — we'll plan it together.",
    longBlurbEs:
      "Previsualizaciones el mismo día disponibles. Dirección narrativa para que las fotos se sientan como momentos, no como poses. Trae tu brief de marca o un lienzo en blanco — lo planeamos juntos.",
    included: [
      "Pre-shoot creative call to align on look, location, and shot list",
      "Studio or on-location coverage with professional lighting",
      "Same-day preview selects delivered within hours",
      "Color-corrected, web- and print-ready final gallery",
      "Online gallery with download + selection workflow",
    ],
    includedEs: [
      "Llamada creativa previa para alinear look, locación y lista de tomas",
      "Cobertura en estudio o en locación con iluminación profesional",
      "Selecciones de previsualización el mismo día entregadas en horas",
      "Galería final con corrección de color, lista para web e impresión",
      "Galería en línea con flujo de descarga + selección",
    ],
    gallerySlots: 6,
    accentGradient:
      "from-amber-500/20 via-rose-500/10 to-slate-900/40",
    icon: Camera,
    _translationReviewNeeded: true,
  },
  {
    slug: "videography",
    title: "Videography",
    titleEs: "Videografía",
    tagline: "Brand films, promos, weddings, social cutdowns.",
    taglineEs: "Películas de marca, promos, bodas, cortes para redes sociales.",
    shortDescription:
      "Brand films, promos, weddings, and social cutdowns.",
    shortDescriptionEs:
      "Películas de marca, promos, bodas y cortes para redes sociales.",
    longBlurb:
      "Solo operator to full crew, scoped to your shoot. Cinematic camera movement, clean audio capture, and a deliverable plan written before we press record.",
    longBlurbEs:
      "Operador único hasta equipo completo, ajustado a tu producción. Movimiento de cámara cinematográfico, captura de audio limpia y un plan de entregables escrito antes de presionar grabar.",
    included: [
      "Pre-production: shot list, location scout, gear plan",
      "Cinematic capture with stabilized camera movement",
      "Multi-channel audio capture with lavaliers and boom",
      "Hero film + platform-specific social cutdowns (16:9, 9:16, 1:1)",
      "Two locked rounds of revisions on the final cut",
    ],
    includedEs: [
      "Preproducción: lista de tomas, scouting de locación, plan de equipo",
      "Captura cinematográfica con movimiento de cámara estabilizado",
      "Captura de audio multicanal con micrófonos lavalier y boom",
      "Película principal + cortes específicos por plataforma (16:9, 9:16, 1:1)",
      "Dos rondas cerradas de revisiones en el corte final",
    ],
    gallerySlots: 6,
    accentGradient:
      "from-rose-500/20 via-orange-500/10 to-slate-900/40",
    icon: Video,
    _translationReviewNeeded: true,
  },
  {
    slug: "video-editing",
    title: "Video editing & color",
    titleEs: "Edición y color de video",
    tagline: "DaVinci Resolve color. Story-first edits.",
    taglineEs: "Color en DaVinci Resolve. Edición narrativa.",
    shortDescription:
      "Story-first editing with professional color grading in DaVinci Resolve.",
    shortDescriptionEs:
      "Edición narrativa con color grading profesional en DaVinci Resolve.",
    longBlurb:
      "Edit-only engagements welcome — bring your RAW footage and a goal, leave with a graded cut. Turnaround quoted per project, with locked review rounds.",
    longBlurbEs:
      "Bienvenidos los proyectos solo de edición — trae tu material RAW y un objetivo, llévate un corte con color grading. Tiempos de entrega cotizados por proyecto, con rondas de revisión cerradas.",
    included: [
      "Footage organization, sync, and selects from your RAW",
      "Story-first edit aligned to a written brief",
      "Professional color grading in DaVinci Resolve",
      "Sound design pass: levels, music sync, simple SFX",
      "Final deliverables in your chosen formats + master archive",
    ],
    includedEs: [
      "Organización, sincronización y selección de tu material RAW",
      "Edición narrativa alineada con un brief escrito",
      "Color grading profesional en DaVinci Resolve",
      "Pase de diseño de sonido: niveles, sincronía musical, efectos simples",
      "Entregables finales en los formatos que elijas + máster de archivo",
    ],
    gallerySlots: 6,
    accentGradient:
      "from-violet-500/20 via-fuchsia-500/10 to-slate-900/40",
    icon: Clapperboard,
    _translationReviewNeeded: true,
  },
  {
    slug: "photo-editing",
    title: "Photo editing",
    titleEs: "Edición de fotografía",
    tagline: "Per-image or volume. Restraint over perfection.",
    taglineEs: "Por imagen o por volumen. Contención sobre perfección.",
    shortDescription:
      "Retouching, color, and culling for shoots you didn't shoot with us.",
    shortDescriptionEs:
      "Retoque, color y selección para sesiones que no hicimos nosotros.",
    longBlurb:
      "Per-image or volume pricing. Bring your RAWs. Skin and product retouching done with restraint — we're not chasing perfection, we're chasing the photo you meant to take.",
    longBlurbEs:
      "Precios por imagen o por volumen. Trae tus RAWs. Retoque de piel y producto con contención — no perseguimos la perfección, perseguimos la foto que querías tomar.",
    included: [
      "Culling and selection from your full set",
      "Color correction and tone-matching across the gallery",
      "Skin retouching with a natural, restraint-first approach",
      "Product cleanup, dust removal, and background fixes",
      "Export-ready files in web and print resolutions",
    ],
    includedEs: [
      "Selección y filtrado de tu set completo",
      "Corrección de color y armonización de tonos en toda la galería",
      "Retoque de piel con un enfoque natural, priorizando la contención",
      "Limpieza de producto, remoción de polvo y arreglos de fondo",
      "Archivos listos para exportar en resolución web e impresión",
    ],
    gallerySlots: 6,
    accentGradient:
      "from-emerald-500/20 via-teal-500/10 to-slate-900/40",
    icon: ImageIcon,
    _translationReviewNeeded: true,
  },
] as const;

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

/**
 * Returns the four other services in canonical order, for the "related
 * services" rail on each detail page.
 */
export function getRelatedServices(slug: ServiceSlug): readonly Service[] {
  return SERVICES.filter((s) => s.slug !== slug);
}
