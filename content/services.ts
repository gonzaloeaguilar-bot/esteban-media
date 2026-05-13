/**
 * Single source of truth for the 5 service offerings.
 *
 * Each detail page (`/services/[slug]`) and the overview grid
 * (`/services`) render from this module. Add a new entry here and a new
 * route appears automatically.
 *
 * Bilingual structure: EN copy is authoritative, ES is a placeholder flagged
 * `<!-- TRANSLATION REVIEW NEEDED -->` for Gonzalo's native review pass.
 * Full next-intl wiring lives in the separate P1 i18n task.
 */

export type ServiceSlug =
  | "aerial"
  | "photography"
  | "videography"
  | "video-editing"
  | "photo-editing";

export type BilingualString = {
  en: string;
  /** ES translation — flagged for human review before publishing. */
  es: string;
};

export type Service = {
  slug: ServiceSlug;
  /** Display name. */
  name: BilingualString;
  /** One-line tagline for cards and hero subtitle. */
  tagline: BilingualString;
  /** Short paragraph for hero body and OG description. */
  description: BilingualString;
  /** Path to hero image placeholder. */
  heroImage: string;
  /** "What's included" bullet list. */
  included: BilingualString[];
  /** Number of placeholder tiles in the sample-work gallery. */
  gallerySlots: number;
  /** Lucide icon name (rendered via dynamic import in the card). */
  icon:
    | "drone"
    | "camera"
    | "video"
    | "film"
    | "image";
};

/**
 * ES strings carry `<!-- TRANSLATION REVIEW NEEDED -->` so a string search
 * surfaces every unreviewed translation before launch.
 */
const REVIEW = "<!-- TRANSLATION REVIEW NEEDED -->";

export const services: readonly Service[] = [
  {
    slug: "aerial",
    name: {
      en: "Aerial Cinematography",
      es: `Cinematografía Aérea ${REVIEW}`,
    },
    tagline: {
      en: "Drone work that opens up the frame.",
      es: `Tomas con dron que abren el encuadre. ${REVIEW}`,
    },
    description: {
      en: "FAA Part 107 drone capture for real estate, weddings, brand films, and South Florida coastal work. Cinematic moves, calm pace, deliverables tuned for the edit.",
      es: `Captura con dron FAA Part 107 para bienes raíces, bodas, marcas y trabajo costero en el sur de Florida. Movimientos cinematográficos, ritmo calmado, entregables listos para edición. ${REVIEW}`,
    },
    heroImage: "/placeholders/aerial-hero.svg",
    included: [
      {
        en: "Scouting + flight planning (airspace, weather, permits)",
        es: `Reconocimiento y planificación de vuelo (espacio aéreo, clima, permisos) ${REVIEW}`,
      },
      {
        en: "4K/6K capture, LOG color profile for post",
        es: `Captura 4K/6K, perfil de color LOG para post-producción ${REVIEW}`,
      },
      {
        en: "Reveal shots, orbits, tracking, top-down maps",
        es: `Tomas reveladoras, órbitas, seguimiento, mapas cenitales ${REVIEW}`,
      },
      {
        en: "Selects gallery + raw footage delivery",
        es: `Galería de seleccionados + entrega de material en bruto ${REVIEW}`,
      },
    ],
    gallerySlots: 6,
    icon: "drone",
  },
  {
    slug: "photography",
    name: {
      en: "Photography",
      es: `Fotografía ${REVIEW}`,
    },
    tagline: {
      en: "Portraits, events, commercial, lifestyle.",
      es: `Retratos, eventos, comercial, estilo de vida. ${REVIEW}`,
    },
    description: {
      en: "Frames that hold up — for couples, brands, restaurants, and the people who run them. Natural light first, strobes when the room needs it.",
      es: `Imágenes que perduran — para parejas, marcas, restaurantes y las personas detrás de ellos. Luz natural primero, flashes cuando la sala lo pide. ${REVIEW}`,
    },
    heroImage: "/placeholders/photography-hero.svg",
    included: [
      {
        en: "Pre-shoot creative call (shot list, references, locations)",
        es: `Llamada creativa previa (lista de tomas, referencias, locaciones) ${REVIEW}`,
      },
      {
        en: "Full-frame mirrorless capture, dual-card backup on site",
        es: `Captura mirrorless de fotograma completo, respaldo en dos tarjetas en sitio ${REVIEW}`,
      },
      {
        en: "Color-graded high-resolution JPGs (web + print)",
        es: `JPGs de alta resolución con color graduado (web + impresión) ${REVIEW}`,
      },
      {
        en: "Private online gallery for selection and download",
        es: `Galería privada en línea para selección y descarga ${REVIEW}`,
      },
    ],
    gallerySlots: 6,
    icon: "camera",
  },
  {
    slug: "videography",
    name: {
      en: "Videography",
      es: `Videografía ${REVIEW}`,
    },
    tagline: {
      en: "Story-led capture, on the ground.",
      es: `Captura narrativa, a ras de suelo. ${REVIEW}`,
    },
    description: {
      en: "Brand films, event recaps, social cutdowns, and documentary-style pieces. We plan the story before we plan the gear.",
      es: `Películas de marca, resúmenes de eventos, cortes para redes y piezas estilo documental. Planeamos la historia antes que el equipo. ${REVIEW}`,
    },
    heroImage: "/placeholders/videography-hero.svg",
    included: [
      {
        en: "Pre-production: outline, shot list, interview prompts",
        es: `Pre-producción: guion, lista de tomas, preguntas de entrevista ${REVIEW}`,
      },
      {
        en: "4K capture, professional audio (lavs + boom)",
        es: `Captura 4K, audio profesional (corbateros + boom) ${REVIEW}`,
      },
      {
        en: "Cinematic lighting kit when the scene calls for it",
        es: `Equipo de iluminación cinematográfica cuando la escena lo requiere ${REVIEW}`,
      },
      {
        en: "Hero edit + vertical social cutdowns from the same shoot",
        es: `Edición principal + cortes verticales para redes desde la misma grabación ${REVIEW}`,
      },
    ],
    gallerySlots: 6,
    icon: "video",
  },
  {
    slug: "video-editing",
    name: {
      en: "Video Editing & Color",
      es: `Edición de Video y Color ${REVIEW}`,
    },
    tagline: {
      en: "Your footage, finished like a film.",
      es: `Tu material, terminado como una película. ${REVIEW}`,
    },
    description: {
      en: "Bring your own footage — we'll cut it, grade it, and master it. Wedding films, brand pieces, social reels, YouTube long-form.",
      es: `Trae tu propio material — lo editamos, etalonamos y masterizamos. Películas de boda, piezas de marca, reels para redes, formato largo de YouTube. ${REVIEW}`,
    },
    heroImage: "/placeholders/video-editing-hero.svg",
    included: [
      {
        en: "Project setup: proxies, organization, sync, transcripts",
        es: `Configuración: proxies, organización, sincronización, transcripciones ${REVIEW}`,
      },
      {
        en: "Story-led edit with up to two rounds of revisions",
        es: `Edición narrativa con hasta dos rondas de revisiones ${REVIEW}`,
      },
      {
        en: "Color grading (primaries + secondaries, skin tone protect)",
        es: `Etalonaje de color (primarios + secundarios, protección de tonos de piel) ${REVIEW}`,
      },
      {
        en: "Sound design, music licensing, mastered exports",
        es: `Diseño de sonido, licencias de música, exportaciones masterizadas ${REVIEW}`,
      },
    ],
    gallerySlots: 6,
    icon: "film",
  },
  {
    slug: "photo-editing",
    name: {
      en: "Photo Editing & Retouching",
      es: `Edición y Retoque Fotográfico ${REVIEW}`,
    },
    tagline: {
      en: "Final polish without the plastic look.",
      es: `Acabado final sin el aspecto plástico. ${REVIEW}`,
    },
    description: {
      en: "Color-grading, skin retouching, and culling for photographers, agencies, and small brands. Consistent looks across full shoots.",
      es: `Etalonaje, retoque de piel y selección para fotógrafos, agencias y marcas pequeñas. Estilo consistente en sesiones completas. ${REVIEW}`,
    },
    heroImage: "/placeholders/photo-editing-hero.svg",
    included: [
      {
        en: "Culling + first-pass selects from your raw library",
        es: `Selección + primera pasada desde tu biblioteca raw ${REVIEW}`,
      },
      {
        en: "Color grading aligned to your brand or shoot LUT",
        es: `Etalonaje alineado a tu marca o LUT del proyecto ${REVIEW}`,
      },
      {
        en: "Frequency-separation retouching (natural skin)",
        es: `Retoque por separación de frecuencias (piel natural) ${REVIEW}`,
      },
      {
        en: "Web + print exports, organized by deliverable",
        es: `Exportaciones para web e impresión, organizadas por entregable ${REVIEW}`,
      },
    ],
    gallerySlots: 6,
    icon: "image",
  },
];

const bySlug = new Map(services.map((s) => [s.slug, s] as const));

export function getService(slug: string): Service | undefined {
  return bySlug.get(slug as ServiceSlug);
}

export function getAllServiceSlugs(): ServiceSlug[] {
  return services.map((s) => s.slug);
}
