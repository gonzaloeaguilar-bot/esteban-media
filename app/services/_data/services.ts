import { SERVICES, type Service } from "@/lib/services";

/**
 * Per-service detail content for the individual /services/<slug> pages.
 *
 * Keep this file as the single edit surface for service-page copy. Translation
 * to ES (next-intl) will key off these slugs.
 *
 * Hero imagery is intentionally a placeholder path — real assets land when
 * Esteban delivers reference work. Never AI-generate photos (CLAUDE.md).
 */

export type GalleryPlaceholder = {
  /** Alt text, written as if the real image were already present. */
  alt: string;
  /** Aspect hint for the placeholder tile. */
  aspect: "square" | "portrait" | "landscape" | "wide";
};

export type ServiceDetail = {
  slug: string;
  /** Page title (h1). May differ from the short nav name. */
  title: string;
  /** One-line cinematic tagline shown under the title. */
  tagline: string;
  /**
   * Hero image path (relative to /public). Placeholder until Esteban delivers
   * a real asset — pages render a styled placeholder if the file is missing.
   */
  heroImage: string;
  /** "What's included" — concrete deliverables, not vague promises. */
  included: string[];
  /** Sample-work gallery placeholders. 3–6 tiles per service. */
  galleryPlaceholders: GalleryPlaceholder[];
  /** Inquiry CTA label — slight variations per service. */
  inquiryCtaLabel: string;
  /** Per-page SEO. */
  seo: {
    title: string;
    description: string;
  };
};

const DETAILS: Record<string, Omit<ServiceDetail, "slug">> = {
  aerial: {
    title: "Aerial & Drone Cinematography",
    tagline:
      "Licensed Part 107 flight. Cinematic moves — not real-estate flyovers.",
    heroImage: "/services/aerial-hero.jpg",
    included: [
      "FAA Part 107 licensed pilot, fully insured",
      "Pre-flight airspace check + permit coordination for restricted zones",
      "4K/6K aerial capture, 10-bit log color for grading headroom",
      "Cinematic moves: reveals, orbits, low-altitude push-ins, parallax",
      "Same-day proxy review on set when the schedule allows",
      "Delivery in any aspect ratio — 16:9, 9:16, 1:1, 2.39:1",
    ],
    galleryPlaceholders: [
      { alt: "Sunset reveal over a South Florida coastline", aspect: "wide" },
      { alt: "Low aerial pass across a beachfront wedding setup", aspect: "landscape" },
      { alt: "Orbit shot above a waterfront luxury property", aspect: "square" },
      { alt: "Top-down geometric shot of palm-lined avenue", aspect: "portrait" },
      { alt: "Golden-hour push-in toward downtown Miami skyline", aspect: "wide" },
      { alt: "Drone-tracked car commercial roll on A1A", aspect: "landscape" },
    ],
    inquiryCtaLabel: "Plan an aerial shoot",
    seo: {
      title: "Aerial & Drone Cinematography — South Florida",
      description:
        "Licensed Part 107 drone capture for venues, real estate, weddings, and brand films across South Florida. Cinematic moves and 4K/6K delivery.",
    },
  },
  photography: {
    title: "Photography",
    tagline:
      "Portraits, events, commercial, lifestyle — studio or on-location.",
    heroImage: "/services/photography-hero.jpg",
    included: [
      "Pre-shoot planning call to lock concept, locations, and shot list",
      "Studio sessions or on-location coverage across South Florida",
      "Bilingual direction (EN/ES) on set — calm, collaborative pace",
      "RAW + edited delivery via a private online gallery",
      "Color-graded final selects, retouched to a natural-but-polished finish",
      "Usage rights tailored to commercial, editorial, or personal use",
    ],
    galleryPlaceholders: [
      { alt: "Editorial portrait, soft window light", aspect: "portrait" },
      { alt: "On-location lifestyle shoot at a Miami rooftop", aspect: "landscape" },
      { alt: "Commercial product shot on a clean gradient", aspect: "square" },
      { alt: "Candid moment from a downtown wedding ceremony", aspect: "landscape" },
      { alt: "Studio portrait, dramatic single-source lighting", aspect: "portrait" },
      { alt: "Brand event coverage, wide-angle crowd shot", aspect: "wide" },
    ],
    inquiryCtaLabel: "Book a photo shoot",
    seo: {
      title: "Photography — Portraits, Events, Commercial, Lifestyle",
      description:
        "South Florida photographer for portraits, events, commercial, and lifestyle work. Studio and on-location coverage with bilingual EN/ES direction.",
    },
  },
  videography: {
    title: "Videography",
    tagline:
      "Brand films, promos, and social cutdowns — story-first on the day.",
    heroImage: "/services/videography-hero.jpg",
    included: [
      "Creative direction + shot list aligned to the story you need to tell",
      "Cinema-grade cameras, prime lenses, and clean audio capture",
      "Multi-cam coverage for events, interviews, and live performances",
      "Story-first directing on the day so the edit comes together quickly",
      "Color-graded master + platform-ready cutdowns (16:9, 9:16, 1:1)",
      "Music licensing handled — no copyright strikes on social",
    ],
    galleryPlaceholders: [
      { alt: "Brand film opener, slow-motion product hero", aspect: "wide" },
      { alt: "Documentary-style interview, two-camera setup", aspect: "landscape" },
      { alt: "Event highlight, dance-floor wide shot", aspect: "landscape" },
      { alt: "Lifestyle promo, golden-hour beach scene", aspect: "wide" },
      { alt: "Vertical social cutdown for a fashion campaign", aspect: "portrait" },
      { alt: "Restaurant b-roll, plating close-up", aspect: "square" },
    ],
    inquiryCtaLabel: "Start a video project",
    seo: {
      title: "Videography — Brand Films, Promos, Events",
      description:
        "South Florida videographer producing brand films, promos, event coverage, and social cutdowns. Story-first direction and platform-ready delivery.",
    },
  },
  "video-editing": {
    title: "Video Editing & Color",
    tagline: "Bring your footage. Leave with a film.",
    heroImage: "/services/video-editing-hero.jpg",
    included: [
      "Footage organization, sync, and a transcribed shot log",
      "Story-first assembly edit — pacing reviewed before fine cut",
      "Professional color grade in DaVinci Resolve (Rec.709 + HDR options)",
      "Sound design, dialogue cleanup, and music licensing",
      "Titles, lower thirds, and motion graphics in your brand system",
      "Up to two rounds of revisions; platform-ready exports for every channel",
    ],
    galleryPlaceholders: [
      { alt: "Before/after color grade still from a brand film", aspect: "landscape" },
      { alt: "Edit timeline screenshot with multi-track audio", aspect: "wide" },
      { alt: "Final-cut still — cinematic teal/orange grade", aspect: "landscape" },
      { alt: "Vertical reel cutdown still for a fashion brand", aspect: "portrait" },
      { alt: "Documentary interview, graded for a warm filmic look", aspect: "square" },
    ],
    inquiryCtaLabel: "Send footage for an edit",
    seo: {
      title: "Video Editing & Color Grading",
      description:
        "Story-first editing and professional color grading. Send your footage; receive a finished film with platform-ready cutdowns.",
    },
  },
  "photo-editing": {
    title: "Photo Editing & Retouching",
    tagline: "Send your RAWs. Receive a polished, on-brand set.",
    heroImage: "/services/photo-editing-hero.jpg",
    included: [
      "Culling and selection from your full RAW set",
      "Color correction matched across the full gallery",
      "Skin and product retouching — natural finish, never plastic",
      "Background cleanup, dust removal, and composite work when needed",
      "Print- and web-ready exports (sRGB, Adobe RGB, CMYK as needed)",
      "Lightroom presets returned so future shoots stay on-brand",
    ],
    galleryPlaceholders: [
      { alt: "Before/after retouched studio portrait", aspect: "portrait" },
      { alt: "Color-matched gallery still from a wedding edit", aspect: "landscape" },
      { alt: "Product retouching, clean white background", aspect: "square" },
      { alt: "Composite editorial cover, layered light pass", aspect: "portrait" },
      { alt: "Real-estate exterior, blended exposures for sky retention", aspect: "wide" },
    ],
    inquiryCtaLabel: "Send RAWs for editing",
    seo: {
      title: "Photo Editing & Retouching",
      description:
        "Retouching, color, and culling. Send your RAWs and receive a polished, on-brand set ready for web, print, or social.",
    },
  },
};

/** Returns the merged base + detail record for a given slug. */
export function getServiceDetail(
  slug: string,
): (Service & ServiceDetail) | undefined {
  const base = SERVICES.find((s) => s.slug === slug);
  const detail = DETAILS[slug];
  if (!base || !detail) return undefined;
  return { ...base, ...detail, slug };
}

/** All slugs with full detail records — keeps route files DRY. */
export const SERVICE_DETAIL_SLUGS = Object.keys(DETAILS);
