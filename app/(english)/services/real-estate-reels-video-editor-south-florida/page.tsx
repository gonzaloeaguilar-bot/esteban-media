import { GeoServicePage, type GeoServicePageContent } from "@/components/geo-service-page";
import { buildPageMetadata } from "@/lib/site-metadata";

const content: GeoServicePageContent = {
  path: "/services/real-estate-reels-video-editor-south-florida",
  eyebrow: "Real estate reels",
  title: "Real estate Reels editor for South Florida listings, agents, and property brands.",
  description:
    "Editing for property walkthroughs, listing Reels, agent clips, drone footage, and short videos for Miami, Fort Lauderdale, Palm Beach, and remote real estate teams.",
  locationLabel: "South Florida / Remote",
  proofTitle: "Property footage needs clarity",
  proofText:
    "Real estate buyers inspect details. This page focuses on short property video, not generic lifestyle edits, so agents can send footage with a clearer goal.",
  proofHref: "/pricing/real-estate",
  proofLabel: "See real estate rates",
  primaryCta: "Ask about listing Reels",
  secondaryHref: "/guides/instagram-reels-ideas-for-real-estate",
  secondaryLabel: "Read real estate Reel ideas",
  serviceName: "Real Estate Reels Video Editor South Florida",
  serviceDescription:
    "Real estate Reels, listing video editing, property walkthrough cuts, and social clips for South Florida and remote real estate teams.",
  serviceType: "Real estate video editing",
  areaServed: "Miami / Fort Lauderdale / Palm Beach / Remote",
  craftHeading: "What property Reels need from the edit.",
  craft: [
    {
      title: "Rooms in an order that makes sense",
      detail:
        "A listing Reel should not feel like random attractive shots. The viewer needs to understand entrance, main living space, kitchen, bedrooms, outdoor areas, views, and neighborhood context. A clear sequence helps the property feel inspectable even when the finished video is short.",
    },
    {
      title: "Vertical crops that preserve the property",
      detail:
        "Real estate footage is often filmed wide, then posted vertically. Cropping can hide ceilings, windows, built-ins, water views, or room flow if it is not planned. The edit has to protect the feature that makes each shot valuable, not simply center the frame and hope the phone crop works.",
    },
    {
      title: "Agent presence without stealing the listing",
      detail:
        "An agent clip can add trust, but it should not bury the property. Short introductions, voiceover, and quick on-camera transitions usually work better than long talking sections. The viewer came to inspect a space; the agent's job is to guide that inspection and offer the next step.",
    },
  ],
  faqHeading: "Questions before sending property footage.",
  faqs: [
    {
      question: "What footage should an agent send for listing Reels?",
      answer:
        "Send original walkthrough footage, drone clips if available, exterior shots, the rooms or features that must be shown, listing-safe facts, agent branding, and the call to action. If the home has a standout feature such as water, a view, renovation, outdoor space, or location, name it in the brief so the edit does not treat every room equally.",
    },
    {
      question: "Can drone footage be used in short real estate videos?",
      answer:
        "Yes, but it should support the listing instead of becoming the whole video. Aerial footage can establish water, lot size, neighborhood, or exterior presence. Interior clips and human-scale details usually do more to help a buyer understand the property. The strongest short edit combines both when the footage is available.",
    },
    {
      question: "Should real estate Reels include prices or listing details?",
      answer:
        "Use only details the agent or brokerage confirms are safe and current. Price, availability, square footage, bedroom count, and association details can change, so the edit should not invent or guess. A safer approach is to keep time-sensitive details in the caption or landing page unless the agent confirms the exact text for the video.",
    },
    {
      question: "Can property footage be edited remotely?",
      answer:
        "Yes. Real estate editing is a strong remote fit when the agent sends original files, listing notes, preferred order, brand assets, and any restrictions from the brokerage or seller. A remote editor can create vertical Reels, website clips, drone trims, and social cutdowns without needing to be at the property.",
    },
  ],
  relatedHeading: "Related real estate and property services.",
  related: [
    {
      title: "Real Estate Photo Pricing",
      detail: "Published rates for listing photos, video, drone, and package work.",
      href: "/pricing/real-estate",
    },
    {
      title: "Real Estate Drone Video",
      detail: "Drone video editing for properties, exteriors, and neighborhood views.",
      href: "/services/real-estate-drone-video-editing-miami",
    },
    {
      title: "AI Real Estate Photo Enhancement",
      detail: "Photo preparation and enhancement guidance for listing visuals.",
      href: "/services/ai-real-estate-photo-enhancement",
    },
  ],
  inquiry: {
    serviceId: "real_estate_reels",
    serviceName: "real estate Reels editing",
    goalPrompt: "turn property footage into listing Reels or short social clips",
    assetPrompt: "original property clips, listing-safe facts, agent branding, must-show features, and a deadline",
    proofHref: "/pricing/real-estate",
    proofLabel: "Review real estate service rates",
  },
};

export const metadata = buildPageMetadata({
  title: "Real Estate Reels Video Editor South Florida",
  description:
    "Real estate Reels editor for South Florida listing videos, agent clips, drone footage, property walkthroughs, and remote editing.",
  path: content.path,
  locale: "en",
});

export default function RealEstateReelsVideoEditorSouthFloridaPage() {
  return <GeoServicePage content={content} />;
}
