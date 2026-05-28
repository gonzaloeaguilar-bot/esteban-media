/**
 * About-page copy dictionary.
 *
 * Bilingual EN/ES strings live here so the eventual next-intl migration
 * (P1 backlog: "Wire next-intl bilingual EN/ES") is a 1:1 lift — move the
 * `en` / `es` objects into `messages/{locale}.json`, swap `t(...)` calls,
 * and delete this file.
 *
 * Conventions:
 *  - EN copy is authoritative and reviewed.
 *  - ES copy is a PLACEHOLDER until a native speaker reviews it.
 *    Every ES block must be flagged in the rendered page with
 *    `{/* TRANSLATION REVIEW NEEDED *\/}` so it's grep-able for QA.
 *  - Real bio + equipment manifest come from Esteban; everything in here
 *    that he hasn't approved is marked with a `TODO: real <thing> from
 *    Esteban` comment so the cortex doesn't quietly ship invented facts.
 */

export type Locale = "en" | "es";

export type EquipmentCategory = {
  /** Stable id for React keys + future analytics. */
  id: string;
  /** Display label (e.g. "Cameras", "Cámaras"). */
  label: string;
  /** Specific gear, lenses, drones, etc. Placeholder strings allowed. */
  items: readonly string[];
};

export type AboutCopy = {
  eyebrow: string;
  heading: string;
  /** One short paragraph under the H1. */
  intro: string;
  bio: {
    heading: string;
    /** Paragraphs rendered in order. */
    paragraphs: readonly string[];
  };
  brandStatement: {
    heading: string;
    /** Pull-quote–style sentence. Stays short. */
    quote: string;
    /** Supporting paragraph beneath the quote. */
    detail: string;
  };
  equipment: {
    heading: string;
    intro: string;
    /** Disclaimer reminding readers the kit list is a placeholder. */
    disclaimer: string;
    categories: readonly EquipmentCategory[];
  };
  cta: {
    heading: string;
    body: string;
    button: string;
  };
  portraitAlt: string;
};

/**
 * English copy — authoritative.
 *
 * TODO: real bio from Esteban — keep cinematic, calm, confident. No
 * corporate jargon, no superlatives without proof.
 */
const en: AboutCopy = {
  eyebrow: "About Esteban",
  heading: "A visual storyteller, not a drone guy.",
  intro:
    "South-Florida-based, bilingual (EN/ES), and equally comfortable behind a camera, a drone, or a colour wheel. One pair of hands from the first frame to the final cut.",
  bio: {
    heading: "Background",
    // TODO: real bio from Esteban
    paragraphs: [
      "Esteban started in stills — weddings, portraits, the kind of long days that teach you to read a room before you raise a camera. The video work grew out of that habit of watching first and shooting second.",
      "Today the studio spans aerial, photography, videography, and post — colour, edit, retouch. The throughline is story: every shoot is scoped around what the footage needs to feel like once it's cut.",
      "Based in South Florida, available across the state and on location anywhere a project leads. Bilingual direction on set keeps EN- and ES-speaking talent equally at ease.",
    ],
  },
  brandStatement: {
    heading: "How we work",
    quote: "We make things feel like a film.",
    detail:
      "Calm on set, deliberate in post. We scope the shoot around the edit so the final cut isn't a rescue mission — it's the plan, executed.",
  },
  equipment: {
    heading: "Equipment",
    intro:
      "A working kit, not a brag sheet. Specific bodies, lenses, and rigs get matched to the brief — what's listed below is the everyday baseline.",
    // TODO: real equipment list from Esteban — confirm exact bodies, lenses,
    // drone model + Part 107 certification number, audio rigs, lighting kit.
    disclaimer:
      "Placeholder kit list — confirm specifics with Esteban before publishing externally.",
    categories: [
      {
        id: "cameras",
        label: "Cameras",
        items: [
          "Full-frame mirrorless body (primary)",
          "Backup mirrorless body",
          "Compact body for run-and-gun coverage",
        ],
      },
      {
        id: "lenses",
        label: "Lenses",
        items: [
          "24–70mm f/2.8 zoom",
          "70–200mm f/2.8 zoom",
          "35mm + 50mm + 85mm primes",
          "Macro lens for product detail",
        ],
      },
      {
        id: "aerial",
        label: "Aerial",
        items: [
          "Cinema-grade drone (4K/6K capable)",
          "FAA Part 107 certified pilot",
          "ND filter set for variable light",
        ],
      },
      {
        id: "audio-lighting",
        label: "Audio & Lighting",
        items: [
          "Lavalier + shotgun mic kit",
          "Field recorder",
          "Continuous LED panels with diffusion",
          "Portable strobes for stills",
        ],
      },
      {
        id: "post",
        label: "Post-production",
        items: [
          "Calibrated edit suite (DaVinci Resolve + Premiere Pro)",
          "Photo retouching pipeline (Lightroom + Photoshop + Capture One)",
          "Colour-managed reference monitor",
        ],
      },
    ],
  },
  cta: {
    heading: "Have a project in mind?",
    body: "Tell Esteban what you're building and you'll get a reply within one business day.",
    button: "Start a project",
  },
  portraitAlt: "Portrait of Esteban — placeholder until headshot is delivered.",
};

/**
 * Spanish copy — PLACEHOLDER.
 *
 * Translated by AI for layout/structure parity only. Must be reviewed by
 * a native speaker (Gonzalo) before any real users see it. Every consumer
 * of these strings should render a `TRANSLATION REVIEW NEEDED` marker.
 */
const es: AboutCopy = {
  eyebrow: "Sobre Esteban",
  heading: "Un narrador visual, no solo un piloto de drones.",
  intro:
    "Basado en el sur de Florida, bilingüe (EN/ES), y cómodo detrás de una cámara, un dron o una rueda de color. Un solo par de manos desde el primer cuadro hasta el corte final.",
  bio: {
    heading: "Trayectoria",
    paragraphs: [
      "Esteban empezó en la fotografía — bodas, retratos, esas jornadas largas que te enseñan a leer una sala antes de levantar la cámara. El video creció a partir de ese hábito de observar primero y filmar después.",
      "Hoy el estudio abarca aérea, fotografía, video y postproducción — color, edición, retoque. El hilo conductor es la historia: cada rodaje se planifica en función de cómo debe sentirse el material una vez editado.",
      "Con base en el sur de Florida, disponible en todo el estado y en cualquier locación. La dirección bilingüe en el set mantiene cómodos por igual al talento anglo e hispanohablante.",
    ],
  },
  brandStatement: {
    heading: "Cómo trabajamos",
    quote: "Hacemos que las cosas se sientan como una película.",
    detail:
      "Calma en el set, intención en la postproducción. Planificamos el rodaje pensando en la edición para que el corte final no sea un rescate — sea el plan, ejecutado.",
  },
  equipment: {
    heading: "Equipo",
    intro:
      "Un kit de trabajo, no una lista para presumir. Los cuerpos, lentes y aparejos específicos se eligen según el brief — lo de abajo es la base diaria.",
    disclaimer:
      "Lista de equipo provisional — confirmar detalles con Esteban antes de publicar externamente.",
    categories: [
      {
        id: "cameras",
        label: "Cámaras",
        items: [
          "Cuerpo mirrorless full-frame (principal)",
          "Cuerpo mirrorless de respaldo",
          "Cuerpo compacto para cobertura ágil",
        ],
      },
      {
        id: "lenses",
        label: "Lentes",
        items: [
          "Zoom 24–70mm f/2.8",
          "Zoom 70–200mm f/2.8",
          "Primes 35mm + 50mm + 85mm",
          "Lente macro para detalle de producto",
        ],
      },
      {
        id: "aerial",
        label: "Aérea",
        items: [
          "Dron de nivel cine (4K/6K)",
          "Piloto certificado FAA Part 107",
          "Set de filtros ND para luz variable",
        ],
      },
      {
        id: "audio-lighting",
        label: "Audio e iluminación",
        items: [
          "Kit de micrófonos lavalier y shotgun",
          "Grabadora de campo",
          "Paneles LED continuos con difusión",
          "Estrobos portátiles para foto fija",
        ],
      },
      {
        id: "post",
        label: "Postproducción",
        items: [
          "Suite de edición calibrada (DaVinci Resolve + Premiere Pro)",
          "Flujo de retoque fotográfico (Lightroom + Photoshop + Capture One)",
          "Monitor de referencia con gestión de color",
        ],
      },
    ],
  },
  cta: {
    heading: "¿Tienes un proyecto en mente?",
    body: "Cuéntale a Esteban lo que estás construyendo y recibirás respuesta en menos de un día hábil.",
    button: "Iniciar un proyecto",
  },
  portraitAlt:
    "Retrato de Esteban — provisional hasta que se entregue la foto profesional.",
};

export const ABOUT_COPY: Record<Locale, AboutCopy> = { en, es };
