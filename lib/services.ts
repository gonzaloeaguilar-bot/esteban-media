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
 *  - app/services/[slug]/page.tsx (per-service detail)
 *
 * Order is intentional: photography → videography → aerial → edits.
 * Positioning is "visual storyteller, not drone guy" — drone is one tool in a
 * deep toolkit, not the lead.
 *
 * ## Bilingual policy
 * EN copy is authoritative and what the UI renders today. ES strings are
 * carried alongside for the upcoming `next-intl` task (backlog P1
 * "Wire next-intl bilingual EN/ES") and are flagged with the literal marker
 * `TRANSLATION REVIEW NEEDED` so a string search surfaces every unreviewed
 * translation before launch. Per CLAUDE.md: never AI-translate without
 * flagging for a native speaker (Gonzalo).
 */

/**
 * Marker every unreviewed ES string carries. Searchable for the i18n task.
 * Exported so a pre-launch script can assert no string still ships with it.
 */
export const TRANSLATION_REVIEW_MARKER = "[TRANSLATION REVIEW NEEDED]";
const TR = TRANSLATION_REVIEW_MARKER;

/** Spanish copy bundle for a service. Surfaced once next-intl lands. */
export type ServiceEsCopy = {
  name: string;
  blurb: string;
  longBlurb: string;
  tagline: string;
  included: string[];
};

export type Service = {
  /** URL slug, used by /services/[slug]. Stable; SEO-safe. */
  slug: string;
  /** Display name used everywhere a label is shown. */
  name: string;
  /** Short, one-line teaser used on cards and strips. */
  blurb: string;
  /** Longer description used on the overview hero and detail page body. */
  longBlurb: string;
  /** Hero subtitle on the detail page — punchier than longBlurb. */
  tagline: string;
  /** Path under /public for the hero placeholder. Real asset TBD. */
  heroImage: string;
  /** "What's included" bullets rendered on the detail page (4–6 items). */
  included: readonly string[];
  /** Tile count for the sample-work placeholder gallery. */
  gallerySlots: number;
  /** Lucide icon paired with the service. */
  Icon: LucideIcon;
  /** Spanish translation bundle. Flagged for native-speaker review. */
  es: ServiceEsCopy;
};

export const SERVICES: readonly Service[] = [
  {
    slug: "photography",
    name: "Photography",
    blurb:
      "Portraits, events, commercial, and lifestyle — studio or on-location.",
    longBlurb:
      "Portraits, events, commercial, and lifestyle photography across South Florida. Studio sessions, on-location coverage, and bilingual direction (EN/ES) on set.",
    tagline: "Frames that hold up — for people, brands, and the rooms they live in.",
    heroImage: "/placeholders/photography-hero.svg",
    included: [
      "Pre-shoot creative call: shot list, references, locations",
      "Full-frame mirrorless capture with dual-card backup on site",
      "Color-graded high-resolution JPGs (web + print)",
      "Private online gallery for selection and download",
      "Bilingual direction on set (EN/ES)",
    ],
    gallerySlots: 6,
    Icon: Camera,
    es: {
      name: `Fotografía ${TR}`,
      blurb: `Retratos, eventos, comercial y estilo de vida — estudio o en locación. ${TR}`,
      longBlurb: `Fotografía de retratos, eventos, comercial y estilo de vida en el sur de Florida. Sesiones de estudio, cobertura en locación y dirección bilingüe (EN/ES) en el set. ${TR}`,
      tagline: `Imágenes que perduran — para personas, marcas y los lugares donde viven. ${TR}`,
      included: [
        `Llamada creativa previa: lista de tomas, referencias, locaciones ${TR}`,
        `Captura mirrorless de fotograma completo con respaldo en dos tarjetas en sitio ${TR}`,
        `JPGs de alta resolución con color graduado (web + impresión) ${TR}`,
        `Galería privada en línea para selección y descarga ${TR}`,
        `Dirección bilingüe en el set (EN/ES) ${TR}`,
      ],
    },
  },
  {
    slug: "videography",
    name: "Videography",
    blurb:
      "Brand films, promos, and social cutdowns scoped to your shoot.",
    longBlurb:
      "Brand films, promos, event coverage, and social cutdowns. Story-first directing on the day so the edit comes together quickly afterward.",
    tagline: "Story-led capture. We plan the story before we plan the gear.",
    heroImage: "/placeholders/videography-hero.svg",
    included: [
      "Pre-production: outline, shot list, interview prompts",
      "4K capture with professional audio (lavs + boom)",
      "Cinematic lighting kit when the scene calls for it",
      "Hero edit plus vertical social cutdowns from the same shoot",
      "Music licensing and mastered exports",
    ],
    gallerySlots: 6,
    Icon: Video,
    es: {
      name: `Videografía ${TR}`,
      blurb: `Películas de marca, promos y cortes para redes adaptados a tu sesión. ${TR}`,
      longBlurb: `Películas de marca, promos, cobertura de eventos y cortes para redes. Dirección narrativa el día del rodaje para que la edición fluya rápido. ${TR}`,
      tagline: `Captura narrativa. Planeamos la historia antes que el equipo. ${TR}`,
      included: [
        `Pre-producción: guion, lista de tomas, preguntas de entrevista ${TR}`,
        `Captura 4K con audio profesional (corbateros + boom) ${TR}`,
        `Equipo de iluminación cinematográfica cuando la escena lo requiere ${TR}`,
        `Edición principal más cortes verticales para redes de la misma grabación ${TR}`,
        `Licencias de música y exportaciones masterizadas ${TR}`,
      ],
    },
  },
  {
    slug: "aerial",
    name: "Aerial / Drone",
    blurb:
      "Licensed drone capture for venues, properties, and brand films.",
    longBlurb:
      "Licensed Part 107 drone capture for venues, real estate, weddings, and brand films. Cinematic moves, not just real-estate flyovers.",
    tagline: "Drone work that opens up the frame — cinematic moves, calm pace.",
    heroImage: "/placeholders/aerial-hero.svg",
    included: [
      "FAA Part 107 licensed pilot — airspace + permits handled",
      "Pre-flight scouting and weather window planning",
      "4K/6K capture in LOG color profile for post",
      "Reveal shots, orbits, tracking moves, top-down maps",
      "Selects gallery plus raw footage delivery",
    ],
    gallerySlots: 6,
    Icon: Plane,
    es: {
      name: `Aéreo / Dron ${TR}`,
      blurb: `Captura con dron licenciado para venues, propiedades y películas de marca. ${TR}`,
      longBlurb: `Captura con dron FAA Part 107 para venues, bienes raíces, bodas y películas de marca. Movimientos cinematográficos, no solo sobrevuelos inmobiliarios. ${TR}`,
      tagline: `Tomas con dron que abren el encuadre — movimientos cinematográficos, ritmo calmado. ${TR}`,
      included: [
        `Piloto licenciado FAA Part 107 — espacio aéreo y permisos gestionados ${TR}`,
        `Reconocimiento previo y planificación de ventanas climáticas ${TR}`,
        `Captura 4K/6K en perfil de color LOG para post-producción ${TR}`,
        `Tomas reveladoras, órbitas, seguimiento, mapas cenitales ${TR}`,
        `Galería de seleccionados más entrega de material en bruto ${TR}`,
      ],
    },
  },
  {
    slug: "video-editing",
    name: "Video Editing",
    blurb: "Story-first editing with professional color grading.",
    longBlurb:
      "Story-first editing and professional color grading. Bring your own footage or pair it with a shoot — delivery in any aspect ratio for any platform.",
    tagline: "Your footage, finished like a film.",
    heroImage: "/placeholders/video-editing-hero.svg",
    included: [
      "Project setup: proxies, organization, sync, transcripts",
      "Story-led edit with up to two rounds of revisions",
      "Color grading: primaries, secondaries, skin-tone protection",
      "Sound design and music licensing",
      "Mastered exports in every aspect ratio you need",
    ],
    gallerySlots: 6,
    Icon: Film,
    es: {
      name: `Edición de Video ${TR}`,
      blurb: `Edición narrativa con etalonaje de color profesional. ${TR}`,
      longBlurb: `Edición narrativa y etalonaje de color profesional. Trae tu material o combínalo con una sesión — entrega en cualquier formato para cualquier plataforma. ${TR}`,
      tagline: `Tu material, terminado como una película. ${TR}`,
      included: [
        `Configuración: proxies, organización, sincronización, transcripciones ${TR}`,
        `Edición narrativa con hasta dos rondas de revisiones ${TR}`,
        `Etalonaje de color: primarios, secundarios, protección de tonos de piel ${TR}`,
        `Diseño de sonido y licencias de música ${TR}`,
        `Exportaciones masterizadas en cada formato que necesites ${TR}`,
      ],
    },
  },
  {
    slug: "photo-editing",
    name: "Photo Editing",
    blurb: "Retouching, color, and culling — bring your RAWs.",
    longBlurb:
      "Retouching, color, and culling. Send your RAWs; receive a polished edit ready for web, print, or social.",
    tagline: "Final polish without the plastic look.",
    heroImage: "/placeholders/photo-editing-hero.svg",
    included: [
      "Culling and first-pass selects from your RAW library",
      "Color grading aligned to your brand or shoot LUT",
      "Frequency-separation retouching (natural skin)",
      "Web and print exports, organized by deliverable",
      "Up to two rounds of revisions",
    ],
    gallerySlots: 6,
    Icon: ImageIcon,
    es: {
      name: `Edición de Foto ${TR}`,
      blurb: `Retoque, color y selección — trae tus RAWs. ${TR}`,
      longBlurb: `Retoque, color y selección. Envía tus RAWs; recibe una edición pulida lista para web, impresión o redes. ${TR}`,
      tagline: `Acabado final sin el aspecto plástico. ${TR}`,
      included: [
        `Selección y primera pasada desde tu biblioteca RAW ${TR}`,
        `Etalonaje alineado a tu marca o LUT del proyecto ${TR}`,
        `Retoque por separación de frecuencias (piel natural) ${TR}`,
        `Exportaciones para web e impresión, organizadas por entregable ${TR}`,
        `Hasta dos rondas de revisiones ${TR}`,
      ],
    },
  },
] as const;

/** All slugs in the canonical order — handy for generateStaticParams. */
export const SERVICE_SLUGS: readonly string[] = SERVICES.map((s) => s.slug);

/** Lookup by slug. Returns `undefined` for unknown slugs (handled by callers). */
export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

/** Return the other services (handy for the related-services rail). */
export function getRelatedServices(slug: string): Service[] {
  return SERVICES.filter((s) => s.slug !== slug);
}
