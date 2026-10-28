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
import { PACKAGE_PRICES, usd } from "@/lib/pricing";

/** The Arranque / Starter package floor — the ONE figure, from lib/pricing.ts. */
const startingPackagePrice = usd(
  PACKAGE_PRICES.arranque.kind === "from" ? PACKAGE_PRICES.arranque.amount : 0,
);

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
  // Public business inbox. Name, phone, location, and service area remain the
  // canonical NAP values below; only the customer-facing email is centralized.
  email: "info@estebanmorenomedia.com",
  booking: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3mpFYiKvhJEh9RI6e-hFk2OYc3aYbrYrt2ycrLmFRRsvccRVXXnVKvIjIYWSCIr1z5djyik60q",
  phone: {
    display: "(305) 497-4478",
    e164: "+13054974478",
    href: "tel:+13054974478",
  },
  instagram: "https://www.instagram.com/steeban1/",
  youtube: "https://www.youtube.com/@estebanmorenolopez3811",
  // Esteban's personal LinkedIn, rebuilt 2026-10-14 (headline "Short-Form Video
  // Editor (Reels, TikTok, Shorts) in Fort Lauderdale & Miami"). curl_cffi
  // (impersonate=chrome) returned 999 on 2026-10-14, LinkedIn's bot wall, which
  // is expected. Person sameAs only, never the business (PR #301, #436).
  linkedin: "https://www.linkedin.com/in/esteban-moreno-l%C3%B3pez-a95290377/",
  // Verified Google Business Profile (place ChIJz5tunn0FmqERd6F9Q9Irxao, cid
  // 12305289738935181687). Read live from the Business Information API
  // 2026-08-14. This is the entity link between the site and the profile that
  // carries the reviews; it is NOT a licence to emit aggregateRating here.
  googleBusinessProfile: "https://maps.google.com/?cid=12305289738935181687",
  // Bing imported the Google profile; verified live 2026-10-07.
  bingPlaces: "https://www.bing.com/maps?ypid=YN6BD50BCE86C81774",
  // The brand account, distinct from the personal @steeban1 above. Verified live
  // 2026-10-07: display name "Esteban Moreno Media", bio lists video editing and
  // the Fort Lauderdale / Broward / Miami-Dade / Palm Beach area, links this site.
  instagramBusiness: "https://www.instagram.com/estebanmorenomedia/",
  // Directory and portfolio profiles. Each returned HTTP 200 to curl_cffi
  // (impersonate=chrome) on 2026-10-14. Nextdoor 301s /page/... to the
  // canonical /pages/.../ form, which is the one stored here. Business sameAs
  // only, never the person (same rule as Bing Places, PR #301).
  behance: "https://www.behance.net/estebanmoreno15",
  vimeo: "https://vimeo.com/user175241719",
  nextdoor: "https://nextdoor.com/pages/esteban-moreno-media-fort-lauderdale-fl/",
  // Public company profile verified in the authenticated Clutch UI on 2026-10-18.
  // This is an identity reference only; it does not substantiate a rate, review,
  // crew size, or project scope on this site.
  clutch: "https://clutch.co/profile/esteban-moreno-media",
  googleSiteVerification: "I70vr7LMsVyZc_VO4grb6fDxQXPTbhB7LIIFjJUlvUs",
  googleAnalyticsMeasurementId: "G-W9CM4CE2MQ",
  // Deliberately unset in source. See docs/microsoft-clarity-activation.md.
  // A value is only supplied by Vercel's Production environment after the
  // owner has approved the privacy disclosure and created the real project.
  microsoftClarityProjectId: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID,
  location: "Fort Lauderdale, FL",
  description:
    "Esteban Moreno Media: video editing, AI content & social production for South Florida businesses. Spanish-first, English too. Fort Lauderdale — fast quote.",
};

export type Service = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  detail: string;
  icon: LucideIcon;
  tags: string[];
  /**
   * Owner-authorized "Starts at" price (fair-market Florida rate less 20%,
   * approved 2026-08-28 — see docs/pricing-basis.md). Always a floor, never a
   * fixed quote. Omit for services without an authorized starting price.
   */
  startingPrice?: string;
};

export const services: Service[] = [
  {
    id: "editing",
    name: "Video editing",
    shortName: "Editing",
    description:
      "Remote video editing services for entrepreneurs, businesses, agencies, and teams that already have footage to shape.",
    detail:
      "Scoping starts with the source footage, publishing goal, and format needs for the project.",
    icon: Scissors,
    tags: ["Remote", "Supplied footage", "Post-production"],
    startingPrice: `Starts at ${startingPackagePrice} per video`,
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
    startingPrice: "Monthly packages start at $640/mo",
  },
  {
    id: "on-location",
    name: "On-location content capture",
    shortName: "Capture",
    description:
      "Selectively scoped local video production services for entrepreneurs, businesses, and brands.",
    detail:
      "Availability and scope are considered project by project after learning the location, goal, and capture needs.",
    icon: Video,
    tags: ["South Florida", "On location", "Project-specific"],
    startingPrice: "Production days start at $800",
  },
  {
    id: "website-design",
    name: "Website Design & AI Chatbots",
    shortName: "Web Design & AI",
    description:
      "Website designer solutions for high-converting custom websites, interactive web applications, and AI lead-capture chatbots built for local businesses.",
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
    // The base-city page; it had zero inbound links before 2026-10-10.
    href: "/fort-lauderdale",
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
      "On-location and editing projects for entrepreneurs, restaurants, brands, and real estate across Miami-Dade.",
  },
  {
    name: "Palm Beach County",
    county: "Palm Beach County, FL",
    schemaType: "AdministrativeArea" as const,
    href: "/areas/palm-beach-county",
    description:
      "On-location and editing projects across Palm Beach County, scoped from Esteban's Fort Lauderdale base.",
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
