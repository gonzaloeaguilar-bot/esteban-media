import type { LucideIcon } from "lucide-react";
import {
  Aperture,
  Camera,
  Clock3,
  Film,
  Languages,
  MapPin,
  Plane,
  Scissors,
  Video,
} from "lucide-react";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://estebanmorenomedia.com";

export const site = {
  name: "Esteban Moreno Media",
  shortName: "Esteban Moreno",
  domain: "estebanmorenomedia.com",
  email: "hello@estebanmorenomedia.com",
  instagram: "https://www.instagram.com/steeban1/",
  location: "Fort Lauderdale, FL",
  description:
    "Fort Lauderdale-based visual storyteller for short-form video, photography, drone, editing, and local business content across Broward and Miami-Dade.",
};

export type Service = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  detail: string;
  icon: LucideIcon;
  tags: string[];
};

export const services: Service[] = [
  {
    id: "reels",
    name: "Reels and short-form video",
    shortName: "Reels",
    description:
      "Vertical edits built for Instagram, TikTok, and YouTube Shorts without making the project feel bigger than it is.",
    detail:
      "Hooks, pacing, captions, music timing, color, and export settings for posting fast.",
    icon: Scissors,
    tags: ["Captions", "Color", "Hook pacing"],
  },
  {
    id: "videography",
    name: "Videography",
    shortName: "Video",
    description:
      "On-location capture for restaurants, events, property, products, creators, and local brands.",
    detail:
      "Solo operator for small shoots, scoped crew support when the project needs more coverage.",
    icon: Video,
    tags: ["Shoot plan", "Audio", "B-roll"],
  },
  {
    id: "photography",
    name: "Photography",
    shortName: "Photo",
    description:
      "Portraits, lifestyle, event, commercial, and product stills that match the video direction.",
    detail:
      "Useful image sets for websites, listings, menus, social posts, and launch campaigns.",
    icon: Camera,
    tags: ["Portraits", "Events", "Product"],
  },
  {
    id: "aerial",
    name: "Drone and aerial visuals",
    shortName: "Aerial",
    description:
      "Aerial shots for property, coastline, events, boats, and brand context where rules and weather allow.",
    detail:
      "Site checks, weather checks, and plain communication before promising a specific drone shot.",
    icon: Plane,
    tags: ["Drone", "Property", "Coastal"],
  },
  {
    id: "post-production",
    name: "Editing and color",
    shortName: "Post",
    description:
      "Video editing, color grading, photo editing, culling, retouching, and delivery for work you shot or work Esteban shoots.",
    detail:
      "Edit-only jobs are welcome when you already have footage and need the final output cleaned up.",
    icon: Film,
    tags: ["Resolve", "Premiere", "Retouching"],
  },
];

export const packages = [
  {
    name: "Edit-only",
    price: "From $75",
    description:
      "Best when you already have footage and need a clean short-form cut, captions, and final exports.",
    items: ["1 vertical edit", "Captions and color", "48-72 hour target"],
  },
  {
    name: "Local shoot",
    price: "From $150",
    description:
      "A focused shoot for one location, one clear deliverable, and a simple review path.",
    items: ["60-90 minute shoot", "1 hero reel", "One alternate cut"],
  },
  {
    name: "Content day",
    price: "Quoted",
    description:
      "A half-day or full-day plan for several deliverables across photo, video, and social cuts.",
    items: ["Shot list", "Batch capture", "Reusable asset set"],
  },
];

export const serviceAreas = [
  {
    name: "Fort Lauderdale",
    county: "Broward County, FL",
    description:
      "Home base for restaurants, real estate, events, creators, yacht work, and local business content.",
    neighborhoods: [
      "Las Olas",
      "Flagler Village",
      "Victoria Park",
      "Wilton Manors",
      "Rio Vista",
    ],
  },
  {
    name: "Broward County",
    county: "Broward County, FL",
    description:
      "Regular coverage across Hollywood, Pompano, Davie, Plantation, Coral Springs, Sunrise, and Weston.",
    neighborhoods: [
      "Hollywood",
      "Pompano Beach",
      "Davie",
      "Plantation",
      "Coral Springs",
    ],
  },
  {
    name: "Miami-Dade",
    county: "Miami-Dade County, FL",
    description:
      "Secondary market for Brickell restaurants, Wynwood activations, Doral product work, and Miami listings.",
    neighborhoods: ["Brickell", "Wynwood", "Doral", "Coral Gables", "Miami Beach"],
  },
];

export const processSteps = [
  {
    name: "Brief",
    detail:
      "A short call or message: goal, date, location, references, and deadline.",
  },
  {
    name: "Shoot or receive",
    detail:
      "Esteban captures the work or reviews the files you send before cutting.",
  },
  {
    name: "First cut",
    detail:
      "You get a review link and leave timestamped notes where changes are needed.",
  },
  {
    name: "Deliver",
    detail:
      "Final exports arrive in the formats you need for web, social, and archive.",
  },
];

export const trustSignals = [
  { label: "Based in", value: "Fort Lauderdale", icon: MapPin },
  { label: "Turnaround", value: "48-72h target", icon: Clock3 },
  { label: "Languages", value: "EN / ES", icon: Languages },
  { label: "Scope", value: "Photo + video + post", icon: Aperture },
];

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}
