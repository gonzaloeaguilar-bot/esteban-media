import type { LocalSeoPageSlug } from "@/lib/local-seo-pages";

export type CompetitorResearchSource = {
  id: string;
  name: string;
  url: string;
  market: "Fort Lauderdale" | "Broward" | "Miami" | "South Florida";
  observedPositioning: string;
  visibleOffers: readonly string[];
  opportunityForEsteban: string;
};

export type KeywordCluster = {
  id: string;
  priority: "launch" | "next" | "later";
  market: "Fort Lauderdale" | "Broward" | "Miami" | "South Florida";
  primaryIntent: string;
  targetKeywords: readonly string[];
  pageSlugs: readonly LocalSeoPageSlug[];
  rationale: string;
};

export const COMPETITOR_RESEARCH: readonly CompetitorResearchSource[] = [
  {
    id: "shine-creative-media",
    name: "Shine Creative Media",
    url: "https://shinecreativemedia.co/",
    market: "Fort Lauderdale",
    observedPositioning:
      "Strategic video content for brands, with social media, corporate events, case studies, and conversion-focused video packages.",
    visibleOffers: [
      "video business cards",
      "corporate events",
      "case studies",
      "social media video",
    ],
    opportunityForEsteban:
      "Compete below the agency tier with edit-first pages for reels, local business clips, and quick launch content.",
  },
  {
    id: "shout-creative",
    name: "Shout Creative",
    url: "https://shoutcreative.tv/",
    market: "Fort Lauderdale",
    observedPositioning:
      "Full-service Fort Lauderdale production company covering digital marketing, animation, corporate, convention, documentary, music, and television video.",
    visibleOffers: [
      "corporate video",
      "social media production",
      "convention video",
      "animation and motion design",
    ],
    opportunityForEsteban:
      "Avoid broad agency claims and rank with narrower pages for editor, reels, recap, and small-business content.",
  },
  {
    id: "digital-cut",
    name: "Digital Cut Productions",
    url: "https://digitalcut.biz/",
    market: "Fort Lauderdale",
    observedPositioning:
      "Established award-winning production company focused on corporate brand stories, commercial production, healthcare, agencies, and national work.",
    visibleOffers: [
      "corporate brand stories",
      "commercial production",
      "healthcare video",
      "camera crews",
      "post-production",
    ],
    opportunityForEsteban:
      "Do not fight their authority head-on. Build practical pages for smaller local buyers that need a fast editor and shooter.",
  },
  {
    id: "driven-films",
    name: "Driven Films",
    url: "https://www.drivenfilms.tv/fort-lauderdale-video-production",
    market: "Broward",
    observedPositioning:
      "Fort Lauderdale/Broward video production company offering commercial video, documentary, event videography, photography, post-production, editing, and social marketing.",
    visibleOffers: [
      "commercial video",
      "event videography",
      "post-production",
      "video editing",
      "social media marketing",
    ],
    opportunityForEsteban:
      "Broward pages can win by being more specific: real estate, reels, restaurants, and edit-only workflows.",
  },
  {
    id: "videohouse",
    name: "VideoHouse",
    url: "https://www.videohouse.io/",
    market: "Miami",
    observedPositioning:
      "Miami video production for social growth, Instagram Reels, YouTube videos, video ads, product video, events, and corporate production.",
    visibleOffers: [
      "Instagram Reels",
      "product video",
      "video ads",
      "YouTube video",
      "event video",
    ],
    opportunityForEsteban:
      "Miami pages should be niche and editor-led: reels editing, product cutdowns, restaurants, and creator content.",
  },
  {
    id: "sobe-films",
    name: "SoBe Films",
    url: "https://www.sobefilms.com/",
    market: "Miami",
    observedPositioning:
      "Miami film and digital production for social/reels, commercials, events, live coverage, and post-production.",
    visibleOffers: [
      "social and reels",
      "commercial and brand video",
      "events and live coverage",
      "post-production",
    ],
    opportunityForEsteban:
      "Build around smaller, clear use cases instead of premium film/digital positioning.",
  },
  {
    id: "short-form-media",
    name: "Short Form Media",
    url: "https://shortformmedia.co/short-form-video-production",
    market: "Miami",
    observedPositioning:
      "Short-form video production company for TikTok, Instagram Reels, YouTube Shorts, scripting, filming, editing, captions, and distribution.",
    visibleOffers: [
      "TikTok production",
      "Instagram Reels production",
      "YouTube Shorts production",
      "scripting",
      "captions",
    ],
    opportunityForEsteban:
      "Short-form intent is validated, but Esteban should localize by city/niche and lead with editing craft plus bilingual South Florida execution.",
  },
  {
    id: "mile-1-media",
    name: "Mile 1 Media",
    url: "https://www.mile1media.com/social-media",
    market: "South Florida",
    observedPositioning:
      "Recurring social media video content for Florida businesses, including platform-specific aspect ratios, captions, pacing, and regular shoot days.",
    visibleOffers: [
      "event socials",
      "brand socials",
      "product socials",
      "recurring content creation",
    ],
    opportunityForEsteban:
      "Recurring content language is useful, but Esteban can start with smaller batch-edit and batch-shoot offers.",
  },
  {
    id: "dragos-cinematics",
    name: "Dragos Cinematics",
    url: "https://dragoscinematics.com/drone-videography",
    market: "South Florida",
    observedPositioning:
      "Fort Lauderdale-based drone videography and aerial photography for real estate, commercial marketing, construction progress, and creative projects.",
    visibleOffers: [
      "real estate aerials",
      "commercial aerial footage",
      "construction progress",
      "creative aerial cinematography",
    ],
    opportunityForEsteban:
      "Drone pages should not only sell flight. They should sell aerial footage integrated into final edits and social deliverables.",
  },
  {
    id: "edin-studios",
    name: "Edin Studios",
    url: "https://edinstudios.com/aerial-drone-photographer-fort-lauderdale/",
    market: "Fort Lauderdale",
    observedPositioning:
      "Aerial and drone photography in Fort Lauderdale for marina, waterfront, luxury property, development, and real estate with fast delivery claims.",
    visibleOffers: [
      "aerial stills",
      "aerial video",
      "twilight aerials",
      "site documentation",
      "real estate packages",
    ],
    opportunityForEsteban:
      "Real estate pages should differentiate with video editing, listing reels, and social cutdowns rather than only drone photos.",
  },
  {
    id: "google-local-ranking",
    name: "Google Business Profile local ranking guidance",
    url: "https://support.google.com/business/answer/7091/improve-your-local-ranking-on-google",
    market: "South Florida",
    observedPositioning:
      "Google describes local ranking around relevance, distance, and prominence, and recommends complete business information, reviews, and photos/videos.",
    visibleOffers: ["relevance", "distance", "prominence", "reviews", "photos and videos"],
    opportunityForEsteban:
      "The website should match Google Business Profile services and cities, then reinforce prominence with portfolio, reviews, and citations.",
  },
] as const;

export const KEYWORD_CLUSTERS: readonly KeywordCluster[] = [
  {
    id: "local-editor-core",
    priority: "launch",
    market: "South Florida",
    primaryIntent: "Find a local video editor or video editing service.",
    targetKeywords: [
      "Fort Lauderdale video editor",
      "Broward video editing",
      "Miami video editor",
      "video editing services Broward County",
    ],
    pageSlugs: [
      "fort-lauderdale-video-editor",
      "broward-video-editing",
      "miami-video-editor",
    ],
    rationale:
      "Core pages establish city/county relevance before the site tries to rank for more competitive production-company terms.",
  },
  {
    id: "short-form-reels",
    priority: "launch",
    market: "South Florida",
    primaryIntent: "Get recurring short-form content for Instagram, TikTok, and YouTube Shorts.",
    targetKeywords: [
      "Fort Lauderdale reels editor",
      "Miami short-form video editor",
      "Instagram Reels video editing Fort Lauderdale",
      "social media video editing Miami",
    ],
    pageSlugs: [
      "fort-lauderdale-reels-video-editing",
      "miami-video-editor",
    ],
    rationale:
      "Competitors validate demand for reels and short-form, but many bury it inside broader agency pages.",
  },
  {
    id: "property-aerial",
    priority: "launch",
    market: "Broward",
    primaryIntent: "Create listing, property, venue, or aerial video content.",
    targetKeywords: [
      "Broward real estate video",
      "Fort Lauderdale listing video",
      "Fort Lauderdale drone video",
      "aerial video Fort Lauderdale",
    ],
    pageSlugs: [
      "broward-real-estate-video",
      "fort-lauderdale-drone-video",
    ],
    rationale:
      "Drone and real estate pages have commercial intent, but Esteban can differentiate by tying aerials to finished video edits.",
  },
  {
    id: "hospitality-social",
    priority: "launch",
    market: "Miami",
    primaryIntent: "Produce social content for restaurants, cafes, bars, and hospitality launches.",
    targetKeywords: [
      "Miami restaurant video",
      "Miami restaurant reels",
      "food video editor Miami",
      "hospitality video Miami",
    ],
    pageSlugs: ["miami-restaurant-video"],
    rationale:
      "Restaurant/social content is a sharper entry point than broad Miami video production and maps to high-repeat-content businesses.",
  },
  {
    id: "bilingual-creator",
    priority: "next",
    market: "South Florida",
    primaryIntent: "Find a bilingual editor for English/Spanish audiences.",
    targetKeywords: [
      "bilingual video editor Miami",
      "Spanish video editor Fort Lauderdale",
      "English Spanish video editing South Florida",
    ],
    pageSlugs: ["miami-video-editor", "fort-lauderdale-video-editor"],
    rationale:
      "Bilingual service is a real South Florida differentiator, but it should support existing pages until there is more portfolio proof.",
  },
] as const;
