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
  /** Intrinsic poster/video size, so the schema and next/image agree. */
  width: number;
  height: number;
};

/** Where a reel card's title links: the service page that sells this work. */
export const REAL_ESTATE_REELS_PATH =
  "/services/real-estate-reels-video-editor-south-florida";

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
    width: 720,
    height: 1280,
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
 * The date this shelf first shipped. Google's video rich results require an
 * uploadDate, and inventing a per-clip date we cannot verify would be a lie the
 * schema tells on the page's behalf — so every clip carries the one date the
 * gallery was published. Change it when the gallery is republished.
 */
export const REAL_ESTATE_REELS_PUBLISHED = "2026-10-10";

/**
 * VideoObject graph for the shelf. One node per reel, each pointing at the same
 * page it appears on, so a search engine can surface the video and the page
 * together. `contentUrl` is the file that actually plays; `thumbnailUrl` is the
 * poster that actually renders — never a URL the page does not serve.
 */
export function buildRealEstateReelsJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": REAL_ESTATE_REELS.map((reel) => ({
      "@type": "VideoObject",
      "@id": absoluteUrl(`${reel.src}#video`),
      name: reel.title,
      description: reel.caption,
      thumbnailUrl: [absoluteUrl(reel.poster)],
      uploadDate: REAL_ESTATE_REELS_PUBLISHED,
      duration: iso8601Duration(reel.durationSeconds),
      contentUrl: absoluteUrl(reel.src),
      width: reel.width,
      height: reel.height,
      isFamilyFriendly: true,
      inLanguage: ["en", "es"],
      publisher: {
        "@type": "Organization",
        name: "Esteban Moreno Media",
        url: absoluteUrl("/"),
      },
    })),
  };
}
