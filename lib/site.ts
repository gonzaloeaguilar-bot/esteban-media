import type { LucideIcon } from "lucide-react";
import {
  CalendarRange,
  Laptop,
  Languages,
  MapPin,
  BadgeCheck,
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
  founder: {
    name: "Esteban Moreno",
    fullName: "Esteban Moreno López",
  },
  domain: "estebanmorenomedia.com",
  email: "esmolopez@gmail.com",
  phone: {
    display: "(305) 497-4478",
    e164: "+13054974478",
    href: "tel:+13054974478",
  },
  instagram: "https://www.instagram.com/steeban1/",
  youtube: "https://www.youtube.com/@estebanmorenolopez3811",
  // Verified Google Business Profile (place ChIJz5tunn0FmqERd6F9Q9Irxao, cid
  // 12305289738935181687). Read live from the Business Information API
  // 2026-08-14. This is the entity link between the site and the profile that
  // carries the reviews; it is NOT a licence to emit aggregateRating here.
  googleBusinessProfile: "https://maps.google.com/?cid=12305289738935181687",
  googleSiteVerification: "I70vr7LMsVyZc_VO4grb6fDxQXPTbhB7LIIFjJUlvUs",
  googleAnalyticsMeasurementId: "G-W9CM4CE2MQ",
  location: "Fort Lauderdale, FL",
  description:
    "Esteban Moreno Media builds Fort Lauderdale growth systems: websites, local presence, AI lead capture, automation, data audits, and creative production.",
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
    name: "Video editing",
    shortName: "Editing",
    description:
      "Remote editing for entrepreneurs, businesses, agencies, and teams that already have footage to shape.",
    detail:
      "Scoping starts with the source footage, publishing goal, and format needs for the project.",
    icon: Scissors,
    tags: ["Remote", "Supplied footage", "Post-production"],
  },
  {
    id: "ai-content",
    name: "AI-assisted content",
    shortName: "AI content",
    description:
      "Creative support using AI-assisted methods, scoped around a confirmed content goal.",
    detail:
      "Scoping questions clarify where AI-assisted methods may fit, which references guide the direction, and how the content will be used.",
    icon: WandSparkles,
    tags: ["AI-assisted", "Creative direction", "Project-specific"],
  },
  {
    id: "social-planning",
    name: "Social media planning",
    shortName: "Social plan",
    description:
      "A practical content plan for brands that need consistency, not another folder of disconnected assets.",
    detail:
      "Scoping questions cover the audience, publishing goal, channels, and content needs.",
    icon: CalendarRange,
    tags: ["Strategy", "Cadence", "Content plan"],
  },
  {
    id: "on-location",
    name: "On-location content capture",
    shortName: "Capture",
    description:
      "Selectively scoped local video production for entrepreneurs, businesses, and brands.",
    detail:
      "Availability and scope are considered project by project after learning the location, goal, and capture needs.",
    icon: Video,
    tags: ["South Florida", "On location", "Project-specific"],
  },
  {
    id: "website-design",
    name: "Website Design & AI Chatbots",
    shortName: "Web Design & AI",
    description:
      "High-converting custom websites, interactive web applications, and AI lead-capture chatbots built for local businesses.",
    detail:
      "Scoping covers brand goals, custom web architecture, AI lead bot requirements, and media content integration.",
    icon: Laptop,
    tags: ["Web Design", "AI Chatbots", "Conversion Systems"],
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
  },
  {
    name: "Broward County",
    county: "Broward County, FL",
    schemaType: "AdministrativeArea" as const,
    href: "/areas",
    description:
      "Broward County is part of the normal local market for selectively scoped projects.",
  },
  {
    name: "Miami-Dade",
    county: "Miami-Dade County, FL",
    schemaType: "AdministrativeArea" as const,
    href: "/areas",
    description:
      "Selected projects for entrepreneurs, restaurants, brands, and real estate across Miami-Dade.",
  },
  {
    name: "Palm Beach County",
    county: "Palm Beach County, FL",
    schemaType: "AdministrativeArea" as const,
    href: "/areas/palm-beach-county",
    description:
      "Palm Beach County is an expansion area considered project by project; sub-city coverage is not yet published.",
  },
];

export const scopingQuestions = [
  {
    name: "What is the goal?",
    detail:
      "What should the content communicate, and where will it be published?",
  },
  {
    name: "What already exists?",
    detail:
      "Is there source footage to edit, or would the idea require newly captured material?",
  },
  {
    name: "Does location matter?",
    detail:
      "For a local idea, which county and type of location would be involved?",
  },
  {
    name: "What needs confirmation?",
    detail:
      "Ask about availability, scope, timing, and format needs for the individual project.",
  },
];

export const trustSignals = [
  { label: "Based in", value: "Fort Lauderdale", icon: MapPin },
  { label: "Proof", value: "Real portfolio", icon: BadgeCheck },
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
