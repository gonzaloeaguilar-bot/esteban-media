import { absoluteUrl } from "@/lib/site";

/**
 * The real-estate reel shelf.
 *
 * Six short vertical videos Esteban edited for property content, kept in one
 * typed list so the carousel, the WhatsApp calls to action and the VideoObject
 * structured data all read from the SAME record. Nothing here is invented per
 * surface: if a title changes it changes in the rail, the lightbox and the
 * schema together, which is the only way the schema can stay honest about what
 * the page actually shows.
 *
 * Facts only. Every title describes what is visibly in the frame (verified
 * against the extracted posters) and every duration was measured with ffprobe
 * on the file that ships. No address, price, sale status or neighbourhood is
 * asserted, because none of that was confirmed — a listing reel is not proof a
 * property sold.
 */

export type RealEstateReel = {
  /** Stable slug; also the lightbox key. */
  id: string;
  /** English card title. */
  title: string;
  /** Spanish card title, for the Spanish surfaces that reuse this list. */
  titleEs: string;
  /** One-clause English caption about the edit. */
  caption: string;
  /** One-clause Spanish caption. */
  captionEs: string;
  /** Poster still, relative to /public. */
  poster: string;
  /** Web-optimised MP4, relative to /public. Loaded only when opened. */
  src: string;
  /** Measured duration, in seconds (ffprobe). */
  durationSeconds: number;
  /** Source or first site-publication timestamp used by VideoObject and sitemap. */
  publishedAt: string;
  /** Intrinsic poster/video size, so the schema and next/image agree. */
  width: number;
  height: number;
};

/** Where a reel card's title links: the service page that sells this work. */
export const REAL_ESTATE_REELS_PATH =
  "/services/real-estate-reels-video-editor-south-florida";

/**
 * The Spanish twin of that service page (hreflang-paired in
 * lib/language-routes.ts), so the Spanish shelf links into the Spanish page
 * instead of sending a Spanish reader to English copy.
 */
export const REAL_ESTATE_REELS_PATH_ES = "/es/editor-de-video-real-estate-miami";

/** The service page a shelf in this locale should link to. */
export function realEstateReelsPath(locale: "en" | "es" = "en"): string {
  return locale === "es" ? REAL_ESTATE_REELS_PATH_ES : REAL_ESTATE_REELS_PATH;
}

export const REAL_ESTATE_REELS: readonly RealEstateReel[] = [
  {
    id: "listing-opener",
    title: "Sunny outdoor opener",
    titleEs: "Apertura al sol",
    caption: "A bright establishing shot that sets the Florida tone before the tour.",
    captionEs: "Un plano luminoso que marca el tono de Florida antes del recorrido.",
    poster: "/real-estate-reels/reel-01.jpg",
    src: "/real-estate-reels/reel-01.mp4",
    durationSeconds: 19,
    publishedAt: "2026-10-10T18:54:42-04:00",
    width: 720,
    height: 1280,
  },
  {
    id: "primary-suite-pool-view",
    title: "Primary suite with a pool view",
    titleEs: "Suite principal con vista a la piscina",
    caption: "A bedroom reel cut around the pool view through the glass doors.",
    captionEs: "Un reel de dormitorio montado alrededor de la vista a la piscina.",
    poster: "/real-estate-reels/reel-02.jpg",
    src: "/real-estate-reels/reel-02.mp4",
    durationSeconds: 57,
    publishedAt: "2026-10-10T18:54:42-04:00",
    width: 720,
    height: 1280,
  },
  {
    id: "staged-bedroom-tour",
    title: "Staged bedroom walkthrough",
    titleEs: "Recorrido de dormitorio ambientado",
    caption: "A staged bedroom shown in a clean, room-by-room sequence.",
    captionEs: "Un dormitorio ambientado mostrado en una secuencia ordenada.",
    poster: "/real-estate-reels/reel-03.jpg",
    src: "/real-estate-reels/reel-03.mp4",
    durationSeconds: 20,
    publishedAt: "2026-10-10T18:54:42-04:00",
    width: 720,
    height: 1280,
  },
  {
    id: "waterfront-condo-views",
    title: "Waterfront condo with views",
    titleEs: "Condominio frente al agua con vistas",
    caption: "High-rise balcony views edited into a vertical listing reel.",
    captionEs: "Vistas desde un balcón en altura montadas como reel vertical.",
    poster: "/real-estate-reels/reel-04.jpg",
    src: "/real-estate-reels/reel-04.mp4",
    durationSeconds: 14,
    publishedAt: "2026-10-10T18:54:42-04:00",
    width: 720,
    height: 1280,
  },
  {
    id: "waterfront-tower-aerial",
    title: "Waterfront tower from above",
    titleEs: "Torre frente al agua desde el aire",
    caption: "Aerial establishing shot of a waterfront tower and its marina.",
    captionEs: "Plano aéreo de una torre frente al agua y su marina.",
    poster: "/real-estate-reels/reel-05.jpg",
    src: "/real-estate-reels/reel-05.mp4",
    durationSeconds: 24,
    publishedAt: "2026-10-10T18:54:42-04:00",
    width: 720,
    height: 1280,
  },
  {
    id: "agent-intro-living-room",
    title: "Agent intro, bright living room",
    titleEs: "Presentación en sala luminosa",
    caption: "A short on-camera agent introduction in a bright living room.",
    captionEs: "Una presentación breve de la agente en una sala luminosa.",
    poster: "/real-estate-reels/reel-06.jpg",
    src: "/real-estate-reels/reel-06.mp4",
    durationSeconds: 31,
    publishedAt: "2026-10-10T18:54:42-04:00",
    width: 720,
    height: 1280,
  },
  {
    id: "agent-question-social-reel",
    title: "Agent-led social reel",
    titleEs: "Reel social con agente",
    caption: "A vertical social edit with an on-camera agent and a question-led opening.",
    captionEs: "Un reel vertical para redes con una agente en cámara y una apertura en forma de pregunta.",
    poster: "/real-estate-reels/reel-07.jpg",
    src: "/real-estate-reels/reel-07.mp4",
    durationSeconds: 23,
    publishedAt: "2026-10-23T03:28:04Z",
    width: 576,
    height: 1024,
  },
] as const;

/** 57 -> "0:57". Display-only; the schema uses the ISO duration below. */
export function formatClock(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

/** 57 -> "PT57S". Google requires an ISO 8601 duration on VideoObject. */
export function iso8601Duration(seconds: number): string {
  return `PT${Math.round(seconds)}S`;
}

/**
 * VideoObject graph for the shelf. One node per reel, each pointing at the same
 * page it appears on, so a search engine can surface the video and the page
 * together. `contentUrl` is the file that actually plays; `thumbnailUrl` is the
 * poster that actually renders — never a URL the page does not serve.
 *
 * The name and description follow the locale of the page the shelf sits on, so
 * a Spanish page describes its videos with the same Spanish titles and captions
 * it shows. The English output is unchanged.
 */
export function buildRealEstateReelsJsonLd(locale: "en" | "es" = "en") {
  const isEs = locale === "es";
  return {
    "@context": "https://schema.org",
    "@graph": REAL_ESTATE_REELS.map((reel) => ({
      "@type": "VideoObject",
      "@id": absoluteUrl(`${reel.src}#video`),
      name: isEs ? reel.titleEs : reel.title,
      description: isEs ? reel.captionEs : reel.caption,
      thumbnailUrl: [absoluteUrl(reel.poster)],
      uploadDate: reel.publishedAt,
      duration: iso8601Duration(reel.durationSeconds),
      contentUrl: absoluteUrl(reel.src),
      width: reel.width,
      height: reel.height,
      isFamilyFriendly: true,
      inLanguage: isEs ? "es" : ["en", "es"],
      publisher: {
        "@type": "Organization",
        name: "Esteban Moreno Media",
        url: absoluteUrl("/"),
      },
    })),
  };
}

/**
 * The order these reels are shown in, everywhere.
 *
 * Open with the sharp architectural frame: the authored first clip
 * ("listing-opener") begins on a motion-blurred frame, and leading with it
 * made the whole shelf feel unfinished on a phone. This lived inside the
 * shelf component until the homepage rail started rendering the same reels —
 * at which point two surfaces disagreed about which poster leads, and the
 * homepage led with the blurred one. One record, one order.
 */
export const REEL_DISPLAY_ORDER: readonly string[] = [
  "agent-question-social-reel",
  "waterfront-tower-aerial",
  "waterfront-condo-views",
  "primary-suite-pool-view",
  "agent-intro-living-room",
  "staged-bedroom-tour",
  "listing-opener",
];

/** REAL_ESTATE_REELS in the curated display order. */
export const REELS_IN_DISPLAY_ORDER = [...REAL_ESTATE_REELS].sort(
  (a, b) => REEL_DISPLAY_ORDER.indexOf(a.id) - REEL_DISPLAY_ORDER.indexOf(b.id),
);
