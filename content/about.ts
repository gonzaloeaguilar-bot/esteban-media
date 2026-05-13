/**
 * About page copy — bilingual EN/ES.
 *
 * Structure mirrors the page's five sections so the upcoming next-intl
 * wiring (separate P1 task) only has to swap the locale source: no JSX
 * rework. Every Spanish string is flagged with TRANSLATION REVIEW NEEDED
 * because the project rule is: never ship AI-translated copy without a
 * native-speaker review (Gonzalo).
 *
 * Placeholder bio/equipment/headshot — Esteban hasn't delivered final
 * content yet. Replace the TODO-marked strings when he does.
 */

export type Locale = "en" | "es";

export type AboutCopy = {
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
  };
  headshot: {
    /** Caption shown under the placeholder portrait. */
    caption: string;
    /** Alt text used until a real headshot is delivered. */
    alt: string;
  };
  bio: {
    heading: string;
    /** Each paragraph renders as its own <p>. */
    paragraphs: string[];
  };
  brandStatement: {
    heading: string;
    statement: string;
    pillars: { title: string; body: string }[];
  };
  equipment: {
    heading: string;
    intro: string;
    /** Categories of gear. Cameras → drones → audio → post → support. */
    categories: { title: string; items: string[] }[];
    footnote: string;
  };
};

// ---------------------------------------------------------------------------
// English — source of truth.
// ---------------------------------------------------------------------------
const en: AboutCopy = {
  hero: {
    eyebrow: "About Esteban",
    title: "Visual storyteller based in South Florida.",
    intro:
      "Aerial, photography, videography, and post-production — one operator, one calm process, one cinematic look across every frame.",
  },
  headshot: {
    caption: "Esteban — owner, director of photography, pilot in command.",
    alt: "Portrait of Esteban (placeholder until a professional headshot is delivered).",
  },
  bio: {
    heading: "The short version",
    // TODO: real bio from Esteban
    paragraphs: [
      "Esteban is a full-service visual storyteller working with brands, real-estate teams, weddings, and creators across South Florida. He started in still photography, moved into motion, and now runs every step of the pipeline in-house — from the first shot list to the final color pass.",
      "His work leans cinematic: deliberate movement, restrained color, and a respect for the room. Clients hire him because they want footage that feels like a film, not a montage.",
      "He is FAA Part 107 certified, insured on request, and based out of South Florida — available across Miami-Dade, Broward, and Palm Beach, and travel-ready for the rest of the state.",
    ],
  },
  brandStatement: {
    heading: "How we work",
    statement:
      "We make things feel like a film. That means slowing down at the start, choosing fewer shots, and finishing each one properly — not chasing volume.",
    pillars: [
      {
        title: "One operator, end to end",
        body: "The person who flies the drone is the person who edits the cut. Nothing gets lost in a handoff.",
      },
      {
        title: "Story before spectacle",
        body: "Drone shots, slow-motion, and color grading serve the story. If a shot doesn't earn its place, it doesn't make the edit.",
      },
      {
        title: "Calm on set",
        body: "We arrive early, work clean, and leave the venue better than we found it. Weddings and properties especially.",
      },
    ],
  },
  equipment: {
    heading: "Equipment",
    intro:
      "A working list — gear rotates with the shoot, but this is what's typically on the truck.",
    // TODO: real equipment list from Esteban
    categories: [
      {
        title: "Cameras & lenses",
        items: [
          "Full-frame mirrorless body (primary)",
          "Mirrorless body (B-cam, gimbal-mounted)",
          "Fast prime lenses — 24mm, 35mm, 50mm, 85mm",
          "Cinema-style zoom 24–70mm f/2.8",
          "Telephoto 70–200mm f/2.8",
        ],
      },
      {
        title: "Aerial",
        items: [
          "Professional cinema drone — 4K HDR, mechanical shutter",
          "Compact travel drone for tight interior and indoor reveals",
          "FAA Part 107 certified pilot; insurance available on request",
        ],
      },
      {
        title: "Audio",
        items: [
          "Dual-channel wireless lavalier kit",
          "Shotgun mic with boom",
          "Portable field recorder",
        ],
      },
      {
        title: "Lighting & support",
        items: [
          "Bi-color LED panel kit (key, fill, hair)",
          "RGB tube lights for accent and color",
          "Carbon-fiber tripod, monopod, slider",
          "Three-axis gimbal stabilizer",
        ],
      },
      {
        title: "Post-production",
        items: [
          "DaVinci Resolve Studio — edit, color, finishing",
          "Calibrated reference monitor for color work",
          "Adobe Lightroom + Photoshop for stills",
          "Off-site backup on every project — nothing leaves on a single drive",
        ],
      },
    ],
    footnote:
      "Need something specific — a second operator, a larger drone for restricted airspace, or a studio rental? Ask in the inquiry and we'll scope it.",
  },
};

// ---------------------------------------------------------------------------
// Spanish — placeholder translations.
// Every block carries a TRANSLATION REVIEW NEEDED marker. Do not ship
// without a native-speaker review (Gonzalo).
// ---------------------------------------------------------------------------
const es: AboutCopy = {
  hero: {
    eyebrow: "Sobre Esteban",
    // TRANSLATION REVIEW NEEDED
    title: "Narrador visual con base en el sur de Florida.",
    // TRANSLATION REVIEW NEEDED
    intro:
      "Aérea, fotografía, videografía y posproducción — un solo operador, un proceso calmado y una estética cinematográfica en cada toma.",
  },
  headshot: {
    // TRANSLATION REVIEW NEEDED
    caption: "Esteban — dueño, director de fotografía y piloto al mando.",
    // TRANSLATION REVIEW NEEDED
    alt: "Retrato de Esteban (marcador de posición hasta que se entregue una foto profesional).",
  },
  bio: {
    // TRANSLATION REVIEW NEEDED
    heading: "La versión corta",
    // TODO: real bio from Esteban
    // TRANSLATION REVIEW NEEDED
    paragraphs: [
      "Esteban es un narrador visual de servicio completo que trabaja con marcas, equipos de bienes raíces, bodas y creadores en todo el sur de Florida. Empezó en fotografía fija, pasó al video y hoy maneja toda la cadena en casa — desde el primer plano hasta la corrección de color final.",
      "Su trabajo tiende a lo cinematográfico: movimiento intencional, color contenido y respeto por el espacio. Los clientes lo contratan porque buscan material que se sienta como una película, no como un montaje.",
      "Está certificado FAA Parte 107, con seguro disponible bajo solicitud, y tiene base en el sur de Florida — disponible en Miami-Dade, Broward y Palm Beach, y listo para viajar por el resto del estado.",
    ],
  },
  brandStatement: {
    // TRANSLATION REVIEW NEEDED
    heading: "Cómo trabajamos",
    // TRANSLATION REVIEW NEEDED
    statement:
      "Hacemos que las cosas se sientan como una película. Eso significa empezar despacio, elegir menos tomas y terminar cada una bien — sin perseguir volumen.",
    // TRANSLATION REVIEW NEEDED
    pillars: [
      {
        title: "Un solo operador, de principio a fin",
        body: "Quien vuela el dron es quien edita el corte. Nada se pierde en una entrega.",
      },
      {
        title: "Primero la historia, después el espectáculo",
        body: "Las tomas aéreas, la cámara lenta y la corrección de color sirven a la historia. Si una toma no se gana su lugar, no entra al edit.",
      },
      {
        title: "Calma en el set",
        body: "Llegamos temprano, trabajamos limpio y dejamos el lugar mejor de como lo encontramos. Sobre todo en bodas y propiedades.",
      },
    ],
  },
  equipment: {
    // TRANSLATION REVIEW NEEDED
    heading: "Equipo",
    // TRANSLATION REVIEW NEEDED
    intro:
      "Una lista de trabajo — el equipo rota según el proyecto, pero esto es lo que suele estar en el vehículo.",
    // TODO: real equipment list from Esteban
    // TRANSLATION REVIEW NEEDED
    categories: [
      {
        title: "Cámaras y lentes",
        items: [
          "Cuerpo full-frame mirrorless (principal)",
          "Cuerpo mirrorless (cámara B, montado en gimbal)",
          "Lentes fijos rápidos — 24 mm, 35 mm, 50 mm, 85 mm",
          "Zoom estilo cine 24–70 mm f/2.8",
          "Teleobjetivo 70–200 mm f/2.8",
        ],
      },
      {
        title: "Aérea",
        items: [
          "Dron de cine profesional — 4K HDR, obturador mecánico",
          "Dron compacto de viaje para interiores y planos reveladores",
          "Piloto certificado FAA Parte 107; seguro disponible bajo solicitud",
        ],
      },
      {
        title: "Audio",
        items: [
          "Kit inalámbrico de lavalier de dos canales",
          "Micrófono shotgun con boom",
          "Grabadora de campo portátil",
        ],
      },
      {
        title: "Iluminación y soporte",
        items: [
          "Kit de paneles LED bicolor (key, fill, hair)",
          "Tubos LED RGB para acento y color",
          "Trípode de fibra de carbono, monopie, slider",
          "Estabilizador gimbal de tres ejes",
        ],
      },
      {
        title: "Posproducción",
        items: [
          "DaVinci Resolve Studio — edición, color y finalización",
          "Monitor de referencia calibrado para color",
          "Adobe Lightroom + Photoshop para fotografía",
          "Respaldo fuera del sitio en cada proyecto — nada sale en un solo disco",
        ],
      },
    ],
    // TRANSLATION REVIEW NEEDED
    footnote:
      "¿Necesitas algo específico — un segundo operador, un dron mayor para espacio aéreo restringido, o un estudio? Pregúntalo en el formulario y lo cotizamos.",
  },
};

export const aboutCopy: Record<Locale, AboutCopy> = { en, es };

/**
 * Returns the about-page copy for a given locale. Defaults to English.
 * The locale argument is optional today (no next-intl yet) but typed so the
 * wiring task can pass through `useLocale()` without a refactor.
 */
export function getAboutCopy(locale: Locale = "en"): AboutCopy {
  return aboutCopy[locale];
}
