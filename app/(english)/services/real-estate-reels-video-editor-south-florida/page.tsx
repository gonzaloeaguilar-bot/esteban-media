import { GeoServicePage, type GeoServicePageContent } from "@/components/geo-service-page";
import { RealEstateReels } from "@/components/real-estate-reels";
import { PACKAGE_PRICES, REAL_ESTATE_PLANS, REAL_ESTATE_PLAN_TERMS, usd } from "@/lib/pricing";
import { REAL_ESTATE_MEDIA } from "@/lib/services-config";
import { buildPageMetadata } from "@/lib/site-metadata";

const starterPrice = PACKAGE_PRICES.arranque.kind === "from" ? usd(PACKAGE_PRICES.arranque.amount) : usd(100);
const essentialPrice = usd(REAL_ESTATE_PLANS[0].price);
const premiumPrice = usd(REAL_ESTATE_PLANS[2].price);
const droneAddon = REAL_ESTATE_MEDIA.addOns.find((a) => a.id === "drone-photography-add-on");
const droneAddonPrice = droneAddon?.amount ? usd(droneAddon.amount) : usd(99);

const content: GeoServicePageContent = {
  path: "/services/real-estate-reels-video-editor-south-florida",
  eyebrow: "Real estate reels",
  title: "Real estate Reels editor for South Florida listings, agents, and property brands.",
  description:
    `Real estate video editor in Fort Lauderdale and South Florida for property walkthroughs, listing Reels, and drone clips. From ${starterPrice} per video or monthly plans.`,
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
  pricingQuestion: "How much does a real estate Reels editor in South Florida cost?",
  serviceDescription:
    "Real estate Reels, listing video editing, property walkthrough cuts, and social clips for South Florida and remote real estate teams.",
  serviceType: "Real estate video editing",
  areaServed: "Miami / Fort Lauderdale / Palm Beach / Remote",
  answerService: "real estate Reels editing",
  answerFirst:
    "Real estate Reels editing turns footage an agent already has (walkthroughs, drone clips, exteriors and short agent pieces to camera) into short listing videos a buyer can actually inspect: rooms in a sensible order, vertical crops that protect the features that sell, and the agent guiding the tour instead of starring in it. Esteban Moreno Media edits remotely from Fort Lauderdale for agents and teams across South Florida and beyond, in Spanish first with intermediate English available. Send the original clips, the listing-safe facts and the must-show features; per-shoot rates are published, and every project gets a written quote before editing starts.",
  craftHeading: "What property Reels need from the edit.",
  depthHeading: "South Florida real estate video editing questions, answered.",
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
  depth: [
    {
      question: "How does an editor handle real estate video in Fort Lauderdale and South Florida?",
      body:
        `Esteban Moreno Media edits listing videos, property walkthroughs, and vertical Reels from footage agents and creators supply across Fort Lauderdale, Broward, and Miami-Dade. Esteban Moreno is based in Fort Lauderdale and provides remote post-production: you upload walkthrough footage, drone shots, and exterior clips to a shared folder, and he shapes them into ordered room tours with clean cuts and legible captions. His working language is Spanish, with intermediate English available for bilingual projects and team reviews. The edit focuses on property inspection rather than generic music video styling. Pricing starts with published monthly real estate plans from ${essentialPrice} a month (Essential: 1 property, up to 3,000 square feet, 2 production days, 2 posts per week with a ${REAL_ESTATE_PLAN_TERMS.minimumMonths}-month minimum) up to ${premiumPrice} a month, as well as per-video editing packages. On-location camera work in South Florida is selectively quoted per project.`,
    },
    {
      question: "What should a real estate video editor brief include?",
      body:
        "When sending footage to a real estate video editor in Fort Lauderdale or South Florida, provide the original camera clips, drone media, preferred room order, must-show architectural features, and any brand assets or brokerage guidelines. Detail the listing-safe facts such as confirmed layout flow, water views, and community amenities. Clearly identify time-sensitive details: keeping pricing and open house dates in the post caption or property landing page prevents the video edit from going stale when terms update. For projects with talking agent segments, keep introductions brief so the property remains the focus of the tour. Esteban Moreno Media reviews raw clips to verify orientation and lighting before cutting begins, ensuring the finished walkthrough accurately highlights the home.",
    },
  ],
  faqHeading: "Questions before sending property footage.",
  faqs: [
    {
      question: "How much does a real estate video editor cost in Fort Lauderdale?",
      answer:
        `Real estate video editing with Esteban Moreno Media starts from ${essentialPrice} per month on the Essential plan for agents listing regularly (covering 1 property up to 3,000 sq ft, 2 production days, and 2 social posts weekly with a ${REAL_ESTATE_PLAN_TERMS.minimumMonths}-month commitment), or from ${starterPrice} per video on the Starter editing tier for agent-supplied walkthrough clips. Individual listing media packages, 3D tours, and drone add-ons from ${droneAddonPrice} are detailed on the real estate rates page.`,
    },
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
  return (
    <GeoServicePage
      content={content}
      showcase={<RealEstateReels locale="en" />}
    />
  );
}
