import type { LucideIcon } from "lucide-react";
import {
  CalendarRange,
  Camera,
  Laptop,
  Languages,
  MapPin,
  RefreshCcw,
  Scissors,
  WandSparkles,
  Video,
} from "lucide-react";

import { socialImageAlt, socialImageSize } from "@/lib/social-image";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://estebanmorenomedia.com";

export const site = {
  name: "Esteban Moreno Media",
  shortName: "Esteban Moreno",
  domain: "estebanmorenomedia.com",
  email: "esmolopez@gmail.com",
  phone: {
    display: "(305) 497-4478",
    e164: "+13054974478",
    href: "tel:+13054974478",
  },
  instagram: "https://www.instagram.com/steeban1/",
  youtube: "https://www.youtube.com/@estebanmorenolopez3811",
  googleSiteVerification: "I70vr7LMsVyZc_VO4grb6fDxQXPTbhB7LIIFjJUlvUs",
  googleAnalyticsMeasurementId: "G-W9CM4CE2MQ",
  location: "Fort Lauderdale, FL",
  description:
    "Fort Lauderdale video editing, AI-assisted content, social planning, and selectively scoped on-location production for Broward, Miami-Dade, and remote clients.",
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
    id: "editing",
    name: "Video editing and short-form cuts",
    shortName: "Editing",
    description:
      "Remote editing for entrepreneurs, businesses, agencies, and teams that already have footage to shape.",
    detail:
      "Hooks, pacing, captions, color, music timing, and platform-ready exports are scoped around the project.",
    icon: Scissors,
    tags: ["Remote", "Short-form", "Post-production"],
  },
  {
    id: "ai-content",
    name: "AI-assisted content",
    shortName: "AI content",
    description:
      "AI-assisted images, motion, and creative variations for social content and product storytelling.",
    detail:
      "The workflow and level of generation are explained before the work begins, with human review built in.",
    icon: WandSparkles,
    tags: ["Images", "Motion", "Creative testing"],
  },
  {
    id: "social-planning",
    name: "Social media planning",
    shortName: "Social plan",
    description:
      "A practical content plan for brands that need consistency, not another folder of disconnected assets.",
    detail:
      "Topics, formats, cadence, and production needs can be organized as a monthly scope.",
    icon: CalendarRange,
    tags: ["Strategy", "Cadence", "Monthly content"],
  },
  {
    id: "on-location",
    name: "On-location content capture",
    shortName: "Capture",
    description:
      "Lightweight capture for restaurants, real estate, products, entrepreneurs, and local brands.",
    detail:
      "The quote defines the location, capture approach, deliverables, travel, and timeline before booking.",
    icon: Video,
    tags: ["South Florida", "Social", "Real estate"],
  },
  {
    id: "product-aerial",
    name: "Product photography and aerial options",
    shortName: "Photo + aerial",
    description:
      "Product stills and, when the project allows, aerial footage that adds useful context to a property or brand.",
    detail:
      "Drone work is offered only when airspace, weather, property permission, and credentialed-pilot availability are confirmed.",
    icon: Camera,
    tags: ["Product", "Property", "Scoped aerial"],
  },
];

export const packages = [
  {
    name: "Remote editing",
    price: "Custom quote",
    description:
      "For existing footage that needs a clean short-form edit or a planned batch of deliverables.",
    items: ["Single or batch edits", "Captions and color", "Timeline confirmed in scope"],
  },
  {
    name: "Monthly content plan",
    price: "Custom quote",
    description:
      "For businesses that need a repeatable mix of posts, videos, carousels, or AI-assisted creative.",
    items: ["Content strategy", "Format and cadence plan", "Deliverables defined together"],
  },
  {
    name: "On-location project",
    price: "Custom quote",
    description:
      "A scoped visit for local content, product photography, real estate, or restaurant work.",
    items: ["Capture plan", "Travel confirmed up front", "Final assets by agreed use"],
  },
];

export const serviceAreas = [
  {
    name: "Fort Lauderdale",
    county: "Broward County, FL",
    schemaType: "City" as const,
    href: "/areas",
    description:
      "Home base for entrepreneurs, restaurants, real estate, and local business content.",
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
    schemaType: "AdministrativeArea" as const,
    href: "/areas",
    description:
      "Available by quote across Hollywood, Pompano Beach, Davie, Plantation, Coral Springs, Sunrise, Weston, and nearby areas.",
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
    schemaType: "AdministrativeArea" as const,
    href: "/areas",
    description:
      "Selected projects for entrepreneurs, restaurants, brands, and real estate across Miami-Dade.",
    neighborhoods: ["Brickell", "Wynwood", "Doral", "Coral Gables", "Miami Beach"],
  },
  {
    name: "Palm Beach County",
    county: "Palm Beach County, FL",
    schemaType: "AdministrativeArea" as const,
    href: "/areas/palm-beach-county",
    description:
      "Available by quote for selected content projects from Boca Raton and Delray Beach through West Palm Beach, Palm Beach Gardens, Jupiter, and Wellington.",
    neighborhoods: [
      "Boca Raton",
      "Delray Beach",
      "Boynton Beach",
      "West Palm Beach",
      "Palm Beach Gardens",
      "Jupiter",
      "Wellington",
    ],
  },
];

export const processSteps = [
  {
    name: "Brief",
    detail:
      "A short call or message: goal, date, location, references, and deadline.",
  },
  {
    name: "Plan or receive",
    detail:
      "Esteban reviews your files for remote editing or confirms the plan for a local capture project.",
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
  { label: "Reviews", value: "2 rounds typical", icon: RefreshCcw },
  { label: "Service", value: "Spanish-first", icon: Languages },
  { label: "Workflow", value: "Remote + local", icon: Laptop },
];

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export const socialImage = {
  url: absoluteUrl("/social-card"),
  ...socialImageSize,
  alt: socialImageAlt,
};
