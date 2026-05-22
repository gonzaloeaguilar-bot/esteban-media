import type { Locale } from "@/i18n/routing";
import type { ServiceSlug } from "@/lib/services";

export const LOCAL_SEO_PAGE_SLUGS = [
  "fort-lauderdale-video-editor",
  "broward-video-editing",
  "miami-video-editor",
  "fort-lauderdale-reels-video-editing",
  "broward-real-estate-video",
  "miami-restaurant-video",
  "fort-lauderdale-drone-video",
] as const;

export type LocalSeoPageSlug = (typeof LOCAL_SEO_PAGE_SLUGS)[number];

export type LocalMarketKey = "fort-lauderdale" | "broward" | "miami";
export type LocalSeoNiche =
  | "video-editing"
  | "reels"
  | "real-estate"
  | "restaurant"
  | "aerial";

type LocalSeoFaq = {
  question: string;
  answer: string;
};

type LocalSeoRelatedLink = {
  href: string;
  label: string;
};

export type LocalSeoPageCopy = {
  slug: LocalSeoPageSlug;
  status: "published";
  market: LocalMarketKey;
  niche: LocalSeoNiche;
  cityLabel: string;
  title: string;
  description: string;
  primaryKeyword: string;
  secondaryKeywords: readonly string[];
  serviceSlugs: readonly ServiceSlug[];
  audienceSegments: readonly string[];
  searchIntent: string;
  competitorGap: string;
  eyebrow: string;
  headline: string;
  lede: string;
  servicesHeading: string;
  services: readonly string[];
  areasHeading: string;
  areas: readonly string[];
  proofHeading: string;
  proof: string;
  faqHeading: string;
  faqs: readonly LocalSeoFaq[];
  relatedLinks: readonly LocalSeoRelatedLink[];
  ctaHeading: string;
  ctaBody: string;
  researchSourceIds: readonly string[];
};

const sharedRelatedLinks = {
  videoEditing: { href: "/services/video-editing", label: "Video editing" },
  videography: { href: "/services/videography", label: "Videography" },
  aerial: { href: "/services/aerial", label: "Aerial / drone" },
  photography: { href: "/services/photography", label: "Photography" },
} as const;

const sharedRelatedLinksEs = {
  videoEditing: { href: "/services/video-editing", label: "Edición de video" },
  videography: { href: "/services/videography", label: "Videografía" },
  aerial: { href: "/services/aerial", label: "Aéreo / drone" },
  photography: { href: "/services/photography", label: "Fotografía" },
} as const;

export const LOCAL_SEO_PAGES: Record<
  Locale,
  Record<LocalSeoPageSlug, LocalSeoPageCopy>
> = {
  en: {
    "fort-lauderdale-video-editor": {
      slug: "fort-lauderdale-video-editor",
      status: "published",
      market: "fort-lauderdale",
      niche: "video-editing",
      cityLabel: "Fort Lauderdale",
      title: "Fort Lauderdale Video Editor",
      description:
        "Fort Lauderdale video editing, videography, reels, aerial visuals, and supporting photography for local businesses, real estate, events, and creators.",
      primaryKeyword: "Fort Lauderdale video editor",
      secondaryKeywords: [
        "video editing Fort Lauderdale",
        "Fort Lauderdale videographer",
        "Fort Lauderdale reels editor",
        "South Florida post-production",
      ],
      serviceSlugs: ["video-editing", "videography", "aerial", "photography"],
      audienceSegments: [
        "local businesses",
        "creators",
        "events",
        "real estate teams",
      ],
      searchIntent:
        "A local buyer needs a practical editor or shooter who can take raw footage, plan a simple shoot, and deliver platform-ready video.",
      competitorGap:
        "Most ranked pages lead with full-service production agency language. This page leads with the editor-led workflow a smaller business can buy quickly.",
      eyebrow: "Fort Lauderdale video editor",
      headline: "Video editing and content for Fort Lauderdale businesses.",
      lede: "Esteban Moreno Media helps Fort Lauderdale brands turn footage into sharp edits, short-form reels, promos, event recaps, real estate content, and aerial visuals built for web and social.",
      servicesHeading: "Video-first services in Fort Lauderdale",
      services: [
        "Short-form Reels, TikToks, and YouTube Shorts",
        "Promo videos and business content",
        "Event recap videos and social cutdowns",
        "Real estate, venue, and aerial visuals",
        "Supporting photography and photo editing",
      ],
      areasHeading: "Nearby areas served",
      areas: [
        "Las Olas",
        "Downtown Fort Lauderdale",
        "Victoria Park",
        "Flagler Village",
        "Harbordale",
        "Wilton Manors",
        "Oakland Park",
        "Lauderdale-by-the-Sea",
      ],
      proofHeading: "Built around the edit",
      proof:
        "The strongest local videos are planned backward from the final cut: hook, pacing, format, captions, music, color, and the call to action. Shooting and aerials support that edit instead of creating random footage.",
      faqHeading: "Fort Lauderdale video questions",
      faqs: [
        {
          question: "Can Esteban edit footage we already shot?",
          answer:
            "Yes. Send the footage, deadline, platform, and reference style. The edit can be scoped before a new shoot is recommended.",
        },
        {
          question: "Can one shoot create multiple social clips?",
          answer:
            "Yes. The best first package is usually one focused shoot or footage batch that becomes a hero edit plus short vertical cutdowns.",
        },
        {
          question: "Does this include photography?",
          answer:
            "Photography is available when stills support the video campaign, listing, event, or launch. Video remains the lead deliverable.",
        },
      ],
      relatedLinks: [
        sharedRelatedLinks.videoEditing,
        sharedRelatedLinks.videography,
        sharedRelatedLinks.aerial,
      ],
      ctaHeading: "Need a Fort Lauderdale video edit?",
      ctaBody:
        "Send the footage, date, location, platform, and reference style. We will scope the edit or shoot and reply with next steps.",
      researchSourceIds: [
        "shine-creative-media",
        "shout-creative",
        "digital-cut",
        "driven-films",
        "google-local-ranking",
      ],
    },
    "broward-video-editing": {
      slug: "broward-video-editing",
      status: "published",
      market: "broward",
      niche: "video-editing",
      cityLabel: "Broward",
      title: "Broward Video Editing",
      description:
        "Broward video editing and videography for restaurants, real estate, events, gyms, salons, med spas, creators, and local businesses.",
      primaryKeyword: "Broward video editing",
      secondaryKeywords: [
        "Broward video editor",
        "Broward videographer",
        "Broward social media video",
        "video editing services Broward County",
      ],
      serviceSlugs: ["video-editing", "videography", "aerial", "photography"],
      audienceSegments: [
        "restaurants",
        "real estate teams",
        "events",
        "gyms and salons",
        "med spas",
      ],
      searchIntent:
        "A Broward business wants local video help without hiring a large agency or managing separate editor, shooter, and drone vendors.",
      competitorGap:
        "County-level pages are thinner than Miami pages, so Broward can be built as a hub that points into narrower city and niche pages.",
      eyebrow: "Broward video editing",
      headline: "Video edits, reels, and shoots for Broward businesses.",
      lede: "From Fort Lauderdale to Hollywood, Pompano, Plantation, Davie, and Pembroke Pines, Esteban Moreno Media creates video-first content for businesses that need clean edits and consistent social assets.",
      servicesHeading: "Broward content services",
      services: [
        "Video editing from phone, camera, or drone footage",
        "Restaurant, salon, gym, and med spa reels",
        "Real estate and property video edits",
        "Event recaps and launch promos",
        "Aerial visuals and supporting stills when needed",
      ],
      areasHeading: "Broward areas served",
      areas: [
        "Fort Lauderdale",
        "Hollywood",
        "Pompano Beach",
        "Plantation",
        "Davie",
        "Pembroke Pines",
        "Miramar",
        "Deerfield Beach",
      ],
      proofHeading: "A practical launch offer",
      proof:
        "For a new business, the first ranking signal is real work: a small portfolio, Google Business Profile photos, client reviews, and pages that match what local clients actually search.",
      faqHeading: "Broward video editing questions",
      faqs: [
        {
          question: "What Broward businesses are the best first fit?",
          answer:
            "Restaurants, fitness studios, salons, med spas, real estate teams, local events, and service businesses are strong first targets because they need repeated social content.",
        },
        {
          question: "Can projects be edit-only?",
          answer:
            "Yes. Edit-only work is a strong entry offer for businesses that already have phone, camera, or drone footage but need sharper pacing and delivery formats.",
        },
        {
          question: "Can the same content work for Instagram and the website?",
          answer:
            "Yes. A master edit can be adapted into vertical reels, square posts, website embeds, and short paid-ad cuts.",
        },
      ],
      relatedLinks: [
        sharedRelatedLinks.videoEditing,
        sharedRelatedLinks.videography,
        sharedRelatedLinks.photography,
      ],
      ctaHeading: "Start a Broward video project",
      ctaBody:
        "Share the business type, city, footage status, and the platform you want to publish on. We will recommend the simplest video package to start.",
      researchSourceIds: [
        "driven-films",
        "shine-creative-media",
        "team-unity-media",
        "google-local-ranking",
      ],
    },
    "miami-video-editor": {
      slug: "miami-video-editor",
      status: "published",
      market: "miami",
      niche: "video-editing",
      cityLabel: "Miami",
      title: "Miami Video Editor",
      description:
        "Miami video editor for short-form reels, product videos, restaurant content, event recaps, aerial visuals, and social media cutdowns.",
      primaryKeyword: "Miami video editor",
      secondaryKeywords: [
        "Miami reels editor",
        "Miami short-form video editor",
        "Miami social media video production",
        "Miami post-production editor",
      ],
      serviceSlugs: ["video-editing", "videography", "aerial", "photography"],
      audienceSegments: [
        "restaurants",
        "product brands",
        "creators",
        "events",
        "small businesses",
      ],
      searchIntent:
        "A Miami brand or creator needs fast, platform-native editing and may not need a full production agency.",
      competitorGap:
        "Miami is dense with production companies. The opportunity is narrower language around editor-led reels, restaurant content, creator clips, and bilingual short-form work.",
      eyebrow: "Miami video editor",
      headline: "Short-form video edits and content for Miami brands.",
      lede: "Esteban Moreno Media supports Miami restaurants, product brands, creators, events, and small businesses with video editing, reels, promos, and platform-ready social cutdowns.",
      servicesHeading: "Miami video services",
      services: [
        "Instagram Reels, TikTok, and YouTube Shorts",
        "Product videos and ecommerce content",
        "Restaurant and hospitality reels",
        "Creator clips and podcast cutdowns",
        "Aerial visuals and supporting photography",
      ],
      areasHeading: "Miami areas served",
      areas: [
        "Miami",
        "Brickell",
        "Wynwood",
        "Doral",
        "Coral Gables",
        "Miami Beach",
        "Hialeah",
        "Little Havana",
      ],
      proofHeading: "Miami needs a narrower angle",
      proof:
        "Miami is competitive, so the site leads with practical service searches like video editor, reels, product video, and restaurant content instead of trying to win broad agency terms on day one.",
      faqHeading: "Miami video editing questions",
      faqs: [
        {
          question: "Is this for brands or creators?",
          answer:
            "Both. The offer works for restaurants, product brands, local businesses, creators, and events that need short-form video cut for Instagram, TikTok, YouTube Shorts, or web.",
        },
        {
          question: "Can Esteban work from existing footage?",
          answer:
            "Yes. Existing footage, podcast clips, phone footage, and previous shoot assets can be cut into new social deliverables.",
        },
        {
          question: "Why not only target 'Miami video production'?",
          answer:
            "That phrase is crowded by larger agencies. A tighter video editor and short-form content angle gives a newer site a more realistic path into search.",
        },
      ],
      relatedLinks: [
        sharedRelatedLinks.videoEditing,
        sharedRelatedLinks.videography,
        sharedRelatedLinks.aerial,
      ],
      ctaHeading: "Need a Miami video editor?",
      ctaBody:
        "Send the footage, deadline, platform, and references. We will scope a clean edit or content shoot around what the video needs to do.",
      researchSourceIds: [
        "videohouse",
        "sobe-films",
        "short-form-media",
        "videographer-miami",
        "google-local-ranking",
      ],
    },
    "fort-lauderdale-reels-video-editing": {
      slug: "fort-lauderdale-reels-video-editing",
      status: "published",
      market: "fort-lauderdale",
      niche: "reels",
      cityLabel: "Fort Lauderdale",
      title: "Fort Lauderdale Reels Video Editing",
      description:
        "Instagram Reels, TikTok, YouTube Shorts, captions, pacing, and social cutdowns for Fort Lauderdale businesses and creators.",
      primaryKeyword: "Fort Lauderdale reels video editing",
      secondaryKeywords: [
        "Instagram Reels editor Fort Lauderdale",
        "TikTok video editing Fort Lauderdale",
        "short-form video editor Fort Lauderdale",
        "social media video Fort Lauderdale",
      ],
      serviceSlugs: ["video-editing", "videography"],
      audienceSegments: [
        "creators",
        "local businesses",
        "personal brands",
        "restaurants",
        "service providers",
      ],
      searchIntent:
        "A buyer needs vertical video that is edited for retention, captions, pacing, and repeated social posting.",
      competitorGap:
        "Competitors mention social media as one service inside a larger agency menu. This page makes reels editing the product.",
      eyebrow: "Fort Lauderdale reels editor",
      headline: "Short-form edits for Fort Lauderdale brands that post often.",
      lede: "Turn raw clips, talking heads, event footage, food shots, product demos, and behind-the-scenes moments into Reels, TikToks, and Shorts with tighter hooks, captions, rhythm, and platform-ready exports.",
      servicesHeading: "Short-form deliverables",
      services: [
        "Vertical edits for Instagram Reels, TikTok, and YouTube Shorts",
        "Hook, pacing, caption, and sound pass",
        "Batch editing from one shoot or footage folder",
        "Creator, founder, restaurant, and local business clips",
        "Optional shoot plan when fresh footage is needed",
      ],
      areasHeading: "Fort Lauderdale social content areas",
      areas: [
        "Las Olas",
        "Flagler Village",
        "Downtown Fort Lauderdale",
        "Wilton Manors",
        "Oakland Park",
        "Pompano Beach",
        "Hollywood",
        "Davie",
      ],
      proofHeading: "Designed for repeat posting",
      proof:
        "A reels page should not sound like a mini commercial page. The buyer wants speed, consistency, and clips that feel native to the feed. This page is built around those deliverables instead of broad production language.",
      faqHeading: "Reels editing questions",
      faqs: [
        {
          question: "Can one shoot become a month of reels?",
          answer:
            "Usually, yes. A focused content session can be planned to capture repeatable clips, hooks, B-roll, and details that become multiple vertical edits.",
        },
        {
          question: "Do you add captions?",
          answer:
            "Yes. Captions, pacing, music direction, sound design, and export sizing are part of the editing workflow.",
        },
        {
          question: "Can the reels match an existing Instagram style?",
          answer:
            "Yes. Send references from the account or competitors. The edit can match the brand without copying another creator's work.",
        },
      ],
      relatedLinks: [
        sharedRelatedLinks.videoEditing,
        sharedRelatedLinks.videography,
      ],
      ctaHeading: "Need Fort Lauderdale reels edited?",
      ctaBody:
        "Send a footage folder, Instagram reference, and posting goal. We will scope a batch edit or a simple content shoot.",
      researchSourceIds: [
        "shine-creative-media",
        "videohouse",
        "short-form-media",
        "mile-1-media",
      ],
    },
    "broward-real-estate-video": {
      slug: "broward-real-estate-video",
      status: "published",
      market: "broward",
      niche: "real-estate",
      cityLabel: "Broward",
      title: "Broward Real Estate Video",
      description:
        "Real estate video editing, listing reels, property walkthroughs, aerial visuals, and supporting photos for Broward agents and property teams.",
      primaryKeyword: "Broward real estate video",
      secondaryKeywords: [
        "real estate video editing Broward",
        "Broward property video",
        "Fort Lauderdale listing video",
        "Broward drone real estate video",
      ],
      serviceSlugs: ["video-editing", "videography", "aerial", "photography"],
      audienceSegments: [
        "real estate agents",
        "property managers",
        "developers",
        "venue owners",
        "vacation rentals",
      ],
      searchIntent:
        "A real estate or property buyer needs listing-ready video, reels, aerial context, and supporting stills without a slow agency process.",
      competitorGap:
        "Drone and real estate competitors often lead with photography packages. This page leads with edited property video and social cutdowns.",
      eyebrow: "Broward real estate video",
      headline: "Property videos, listing reels, and aerial visuals for Broward.",
      lede: "For agents, property teams, venues, and rentals, Esteban Moreno Media turns walkthrough footage, drone clips, detail shots, and stills into listing videos and social edits that show the space clearly.",
      servicesHeading: "Property video deliverables",
      services: [
        "Listing video edits from walkthrough and drone footage",
        "Vertical property reels for Instagram and TikTok",
        "Neighborhood, waterfront, and exterior context shots",
        "Venue, rental, and development recap videos",
        "Supporting photo selects and basic retouching",
      ],
      areasHeading: "Broward property markets",
      areas: [
        "Fort Lauderdale",
        "Hollywood",
        "Pompano Beach",
        "Plantation",
        "Davie",
        "Pembroke Pines",
        "Miramar",
        "Deerfield Beach",
      ],
      proofHeading: "Property content needs context",
      proof:
        "Real estate video is not only a walkthrough. The useful edit shows flow, surroundings, light, neighborhood, amenities, and the few details that make the property easy to remember.",
      faqHeading: "Real estate video questions",
      faqs: [
        {
          question: "Can Esteban edit a listing video from supplied footage?",
          answer:
            "Yes. Existing camera, phone, or drone footage can be edited into a clean listing video and vertical social cutdowns.",
        },
        {
          question: "Can aerial footage be included?",
          answer:
            "Aerial visuals can be planned when location, timing, airspace, weather, and legal requirements allow. No unsafe or unapproved flight is promised.",
        },
        {
          question: "What does a property video package usually include?",
          answer:
            "A practical starting point is one main listing edit, one to three vertical reels, and supporting stills or frame grabs for social and web.",
        },
      ],
      relatedLinks: [
        sharedRelatedLinks.videoEditing,
        sharedRelatedLinks.aerial,
        sharedRelatedLinks.photography,
      ],
      ctaHeading: "Need a Broward property video?",
      ctaBody:
        "Send the address area, property type, deadline, and whether footage already exists. We will scope the simplest listing or social package.",
      researchSourceIds: [
        "edin-studios",
        "dragos-cinematics",
        "videographer-miami",
        "digital-cut",
      ],
    },
    "miami-restaurant-video": {
      slug: "miami-restaurant-video",
      status: "published",
      market: "miami",
      niche: "restaurant",
      cityLabel: "Miami",
      title: "Miami Restaurant Video",
      description:
        "Miami restaurant reels, food video editing, hospitality promos, launch recaps, and social content for restaurants, cafes, bars, and food brands.",
      primaryKeyword: "Miami restaurant video",
      secondaryKeywords: [
        "Miami restaurant reels",
        "food video editor Miami",
        "hospitality video Miami",
        "Miami social media video for restaurants",
      ],
      serviceSlugs: ["video-editing", "videography", "photography"],
      audienceSegments: [
        "restaurants",
        "cafes",
        "bars",
        "food trucks",
        "hospitality brands",
      ],
      searchIntent:
        "A hospitality operator needs short, appetizing, consistent content for Instagram, TikTok, launch promos, events, and menu moments.",
      competitorGap:
        "Miami agencies talk about social broadly. This page narrows the offer to restaurant and hospitality clips where speed, texture, and repeat posting matter.",
      eyebrow: "Miami restaurant video",
      headline: "Food, hospitality, and launch videos for Miami restaurants.",
      lede: "Esteban Moreno Media edits and shoots restaurant reels, menu features, chef moments, event recaps, product drops, and hospitality promos built for social and web.",
      servicesHeading: "Restaurant content deliverables",
      services: [
        "Menu item reels and food detail edits",
        "Chef, staff, and behind-the-scenes clips",
        "Launch, pop-up, and event recap videos",
        "Vertical social cutdowns from one content session",
        "Supporting stills for posts, stories, and website use",
      ],
      areasHeading: "Miami hospitality areas",
      areas: [
        "Wynwood",
        "Brickell",
        "Miami Beach",
        "Coral Gables",
        "Doral",
        "Little Havana",
        "Downtown Miami",
        "Coconut Grove",
      ],
      proofHeading: "Restaurant content has to feel immediate",
      proof:
        "A restaurant video should move fast enough for social but still show texture, service, atmosphere, and the reason someone should visit. That balance is an edit problem before it is a camera problem.",
      faqHeading: "Restaurant video questions",
      faqs: [
        {
          question: "Can a shoot happen before or after service?",
          answer:
            "Yes. The cleanest plan is often a short content block around prep, plated items, atmosphere, and a few staff or founder moments.",
        },
        {
          question: "Can one menu shoot become several posts?",
          answer:
            "Yes. A batch can become multiple item reels, a hero promo, story clips, and supporting stills.",
        },
        {
          question: "Do restaurants need a full brand film first?",
          answer:
            "Usually not. For launch SEO and social traction, consistent short-form posts are often a better first product than one expensive brand film.",
        },
      ],
      relatedLinks: [
        sharedRelatedLinks.videoEditing,
        sharedRelatedLinks.videography,
        sharedRelatedLinks.photography,
      ],
      ctaHeading: "Need Miami restaurant reels?",
      ctaBody:
        "Send the restaurant, menu focus, launch date, and reference accounts. We will scope a simple content session or edit-only batch.",
      researchSourceIds: [
        "videohouse",
        "short-form-media",
        "sobe-films",
        "mile-1-media",
      ],
    },
    "fort-lauderdale-drone-video": {
      slug: "fort-lauderdale-drone-video",
      status: "published",
      market: "fort-lauderdale",
      niche: "aerial",
      cityLabel: "Fort Lauderdale",
      title: "Fort Lauderdale Drone Video",
      description:
        "Fort Lauderdale drone video, aerial visuals, property establishing shots, event B-roll, and aerial footage integrated into edited video projects.",
      primaryKeyword: "Fort Lauderdale drone video",
      secondaryKeywords: [
        "aerial video Fort Lauderdale",
        "drone videography Fort Lauderdale",
        "Fort Lauderdale aerial visuals",
        "South Florida drone video editing",
      ],
      serviceSlugs: ["aerial", "video-editing", "videography"],
      audienceSegments: [
        "real estate teams",
        "venues",
        "marine businesses",
        "events",
        "local brands",
      ],
      searchIntent:
        "A buyer wants aerial perspective for a property, venue, event, or brand video and needs it edited into the final deliverable.",
      competitorGap:
        "Drone competitors often sell aerial capture as a standalone package. This page positions aerial footage as part of a finished edit.",
      eyebrow: "Fort Lauderdale drone video",
      headline: "Aerial footage that supports the final video.",
      lede: "Use aerial visuals for property context, waterfront reveals, venue scale, event atmosphere, and brand establishing shots. The goal is not a generic flyover; it is footage that earns its place in the edit.",
      servicesHeading: "Aerial video deliverables",
      services: [
        "Aerial establishing shots and reveal footage",
        "Property, venue, and waterfront context clips",
        "Event and brand B-roll when location rules allow",
        "Color-matched drone selects integrated into the edit",
        "Ground footage pairing for a complete video package",
      ],
      areasHeading: "Fort Lauderdale aerial areas",
      areas: [
        "Las Olas",
        "Downtown Fort Lauderdale",
        "Harbordale",
        "Lauderdale-by-the-Sea",
        "Pompano Beach",
        "Oakland Park",
        "Hollywood",
        "Dania Beach",
      ],
      proofHeading: "Aerial content needs planning",
      proof:
        "South Florida aerial work has to account for location rules, weather, airspace, timing, and the actual edit. This page keeps expectations clear and avoids promising unsafe or unapproved flights.",
      faqHeading: "Drone video questions",
      faqs: [
        {
          question: "Can every Fort Lauderdale location use drone footage?",
          answer:
            "No. Aerial work depends on airspace, property permission, weather, timing, and legal requirements. Each project needs a location check first.",
        },
        {
          question: "Is drone footage delivered as raw clips or an edit?",
          answer:
            "The strongest offer is edited delivery: aerial selects color-matched and cut into a main video or social clips. Raw delivery can be scoped if needed.",
        },
        {
          question: "What projects benefit most from aerial visuals?",
          answer:
            "Real estate, waterfront venues, marine businesses, events, hospitality, construction progress, and brand videos that need location context.",
        },
      ],
      relatedLinks: [
        sharedRelatedLinks.aerial,
        sharedRelatedLinks.videoEditing,
        sharedRelatedLinks.videography,
      ],
      ctaHeading: "Need Fort Lauderdale aerial footage?",
      ctaBody:
        "Send the location, timing, use case, and final platform. We will check the scope and recommend the safest useful aerial plan.",
      researchSourceIds: [
        "dragos-cinematics",
        "edin-studios",
        "acq-drone-photography",
        "ocean-pride-media",
      ],
    },
  },
  es: {
    "fort-lauderdale-video-editor": {
      slug: "fort-lauderdale-video-editor",
      status: "published",
      market: "fort-lauderdale",
      niche: "video-editing",
      cityLabel: "Fort Lauderdale",
      title: "Editor de video en Fort Lauderdale",
      description:
        "Edición de video, videografía, Reels, tomas aéreas y fotografía de apoyo en Fort Lauderdale para negocios, real estate, eventos y creadores.",
      primaryKeyword: "editor de video en Fort Lauderdale",
      secondaryKeywords: [
        "edición de video Fort Lauderdale",
        "videógrafo Fort Lauderdale",
        "editor de Reels Fort Lauderdale",
        "postproducción South Florida",
      ],
      serviceSlugs: ["video-editing", "videography", "aerial", "photography"],
      audienceSegments: [
        "negocios locales",
        "creadores",
        "eventos",
        "equipos de real estate",
      ],
      searchIntent:
        "Un cliente local necesita un editor o videógrafo práctico que convierta material en video listo para publicar.",
      competitorGap:
        "Muchas páginas posicionadas hablan como agencias grandes. Esta página lidera con un flujo de edición que un negocio pequeño puede comprar rápido.",
      eyebrow: "Editor de video en Fort Lauderdale",
      headline: "Edición de video y contenido para negocios en Fort Lauderdale.",
      lede: "Esteban Moreno Media ayuda a marcas de Fort Lauderdale a convertir material en ediciones claras, Reels, promos, recaps de eventos, contenido de real estate y tomas aéreas listas para web y redes.",
      servicesHeading: "Servicios con video primero en Fort Lauderdale",
      services: [
        "Reels, TikToks y YouTube Shorts",
        "Promos y contenido para negocios",
        "Recaps de eventos y cortes sociales",
        "Real estate, venues y tomas aéreas",
        "Fotografía y edición de fotos de apoyo",
      ],
      areasHeading: "Zonas cercanas",
      areas: [
        "Las Olas",
        "Downtown Fort Lauderdale",
        "Victoria Park",
        "Flagler Village",
        "Harbordale",
        "Wilton Manors",
        "Oakland Park",
        "Lauderdale-by-the-Sea",
      ],
      proofHeading: "Construido alrededor de la edición",
      proof:
        "Los mejores videos locales se planean desde el corte final: hook, ritmo, formato, captions, música, color y llamada a la acción. El rodaje y las tomas aéreas apoyan esa edición.",
      faqHeading: "Preguntas sobre video en Fort Lauderdale",
      faqs: [
        {
          question: "¿Esteban puede editar material que ya grabamos?",
          answer:
            "Sí. Envía el material, fecha límite, plataforma y referencia visual. La edición se puede definir antes de recomendar un rodaje nuevo.",
        },
        {
          question: "¿Un rodaje puede producir varios clips para redes?",
          answer:
            "Sí. Un buen primer paquete suele ser un rodaje o batch de material que produce un video principal y varios cortes verticales.",
        },
        {
          question: "¿Incluye fotografía?",
          answer:
            "La fotografía está disponible cuando las fotos apoyan la campaña, listing, evento o lanzamiento. El video sigue siendo el entregable principal.",
        },
      ],
      relatedLinks: [
        sharedRelatedLinksEs.videoEditing,
        sharedRelatedLinksEs.videography,
        sharedRelatedLinksEs.aerial,
      ],
      ctaHeading: "¿Necesitas un video en Fort Lauderdale?",
      ctaBody:
        "Envía el material, fecha, locación, plataforma y referencia visual. Definimos el edit o rodaje y respondemos con próximos pasos.",
      researchSourceIds: [
        "shine-creative-media",
        "shout-creative",
        "digital-cut",
        "driven-films",
        "google-local-ranking",
      ],
    },
    "broward-video-editing": {
      slug: "broward-video-editing",
      status: "published",
      market: "broward",
      niche: "video-editing",
      cityLabel: "Broward",
      title: "Edición de video en Broward",
      description:
        "Edición de video y videografía en Broward para restaurantes, real estate, eventos, gimnasios, salones, med spas, creadores y negocios locales.",
      primaryKeyword: "edición de video en Broward",
      secondaryKeywords: [
        "editor de video Broward",
        "videógrafo Broward",
        "video para redes Broward",
        "servicios de edición de video Broward County",
      ],
      serviceSlugs: ["video-editing", "videography", "aerial", "photography"],
      audienceSegments: [
        "restaurantes",
        "real estate",
        "eventos",
        "gimnasios y salones",
        "med spas",
      ],
      searchIntent:
        "Un negocio de Broward quiere ayuda local con video sin contratar una agencia grande ni coordinar varios proveedores.",
      competitorGap:
        "Las páginas a nivel county suelen ser más débiles que las de Miami, así que Broward puede funcionar como hub hacia ciudades y nichos más específicos.",
      eyebrow: "Edición de video en Broward",
      headline: "Ediciones, Reels y rodajes para negocios en Broward.",
      lede: "Desde Fort Lauderdale hasta Hollywood, Pompano, Plantation, Davie y Pembroke Pines, Esteban Moreno Media crea contenido con video primero para negocios que necesitan ediciones limpias y assets constantes para redes.",
      servicesHeading: "Servicios de contenido en Broward",
      services: [
        "Edición desde material de celular, cámara o drone",
        "Reels para restaurantes, salones, gimnasios y med spas",
        "Videos para real estate y propiedades",
        "Recaps de eventos y promos de lanzamiento",
        "Tomas aéreas y fotos de apoyo cuando hagan falta",
      ],
      areasHeading: "Zonas de Broward",
      areas: [
        "Fort Lauderdale",
        "Hollywood",
        "Pompano Beach",
        "Plantation",
        "Davie",
        "Pembroke Pines",
        "Miramar",
        "Deerfield Beach",
      ],
      proofHeading: "Una oferta práctica para arrancar",
      proof:
        "Para un negocio nuevo, la primera señal de ranking es trabajo real: portafolio pequeño, fotos en Google Business Profile, reviews y páginas alineadas con búsquedas locales reales.",
      faqHeading: "Preguntas sobre edición en Broward",
      faqs: [
        {
          question: "¿Qué negocios de Broward son mejor fit al inicio?",
          answer:
            "Restaurantes, estudios fitness, salones, med spas, equipos de real estate, eventos y negocios de servicios porque necesitan contenido social repetido.",
        },
        {
          question: "¿Puede ser solo edición?",
          answer:
            "Sí. Edit-only es una oferta fuerte para negocios que ya tienen material de celular, cámara o drone y necesitan mejor ritmo y formatos.",
        },
        {
          question: "¿El mismo contenido sirve para Instagram y la web?",
          answer:
            "Sí. Un edit principal puede adaptarse a Reels verticales, posts cuadrados, embeds para web y cortes cortos para ads.",
        },
      ],
      relatedLinks: [
        sharedRelatedLinksEs.videoEditing,
        sharedRelatedLinksEs.videography,
        sharedRelatedLinksEs.photography,
      ],
      ctaHeading: "Inicia un proyecto de video en Broward",
      ctaBody:
        "Comparte el tipo de negocio, ciudad, estado del material y plataforma final. Recomendamos el paquete de video más simple para empezar.",
      researchSourceIds: [
        "driven-films",
        "shine-creative-media",
        "team-unity-media",
        "google-local-ranking",
      ],
    },
    "miami-video-editor": {
      slug: "miami-video-editor",
      status: "published",
      market: "miami",
      niche: "video-editing",
      cityLabel: "Miami",
      title: "Editor de video en Miami",
      description:
        "Editor de video en Miami para Reels, videos de producto, contenido de restaurantes, recaps de eventos, tomas aéreas y cortes para redes.",
      primaryKeyword: "editor de video en Miami",
      secondaryKeywords: [
        "editor de Reels Miami",
        "editor de video corto Miami",
        "video para redes Miami",
        "postproducción Miami",
      ],
      serviceSlugs: ["video-editing", "videography", "aerial", "photography"],
      audienceSegments: [
        "restaurantes",
        "marcas de producto",
        "creadores",
        "eventos",
        "negocios pequeños",
      ],
      searchIntent:
        "Una marca o creador en Miami necesita edición rápida para plataformas y quizás no necesita una agencia de producción completa.",
      competitorGap:
        "Miami tiene muchas productoras. La oportunidad está en lenguaje más específico: editor de Reels, clips para restaurantes, creadores y contenido bilingüe.",
      eyebrow: "Editor de video en Miami",
      headline: "Edición de video corto y contenido para marcas en Miami.",
      lede: "Esteban Moreno Media apoya restaurantes, marcas de producto, creadores, eventos y negocios pequeños en Miami con edición de video, Reels, promos y cortes listos para redes.",
      servicesHeading: "Servicios de video en Miami",
      services: [
        "Instagram Reels, TikTok y YouTube Shorts",
        "Videos de producto y contenido ecommerce",
        "Reels para restaurantes y hospitality",
        "Clips de creadores y cortes de podcast",
        "Tomas aéreas y fotografía de apoyo",
      ],
      areasHeading: "Zonas de Miami",
      areas: [
        "Miami",
        "Brickell",
        "Wynwood",
        "Doral",
        "Coral Gables",
        "Miami Beach",
        "Hialeah",
        "Little Havana",
      ],
      proofHeading: "Miami necesita un ángulo más específico",
      proof:
        "Miami es competitivo, así que la web empieza con búsquedas prácticas como editor de video, Reels, videos de producto y contenido para restaurantes en vez de competir por términos amplios de agencia desde el día uno.",
      faqHeading: "Preguntas sobre edición en Miami",
      faqs: [
        {
          question: "¿Esto es para marcas o creadores?",
          answer:
            "Ambos. Funciona para restaurantes, marcas de producto, negocios locales, creadores y eventos que necesitan video corto para Instagram, TikTok, YouTube Shorts o web.",
        },
        {
          question: "¿Esteban puede trabajar con material existente?",
          answer:
            "Sí. Material existente, clips de podcast, videos de celular y assets de rodajes anteriores pueden convertirse en nuevos entregables sociales.",
        },
        {
          question: "¿Por qué no atacar solo 'video production Miami'?",
          answer:
            "Esa búsqueda está llena de agencias grandes. Un ángulo de editor y short-form content es un camino más realista para una web nueva.",
        },
      ],
      relatedLinks: [
        sharedRelatedLinksEs.videoEditing,
        sharedRelatedLinksEs.videography,
        sharedRelatedLinksEs.aerial,
      ],
      ctaHeading: "¿Necesitas un editor de video en Miami?",
      ctaBody:
        "Envía el material, fecha límite, plataforma y referencias. Definimos una edición o rodaje alrededor de lo que el video tiene que lograr.",
      researchSourceIds: [
        "videohouse",
        "sobe-films",
        "short-form-media",
        "videographer-miami",
        "google-local-ranking",
      ],
    },
    "fort-lauderdale-reels-video-editing": {
      slug: "fort-lauderdale-reels-video-editing",
      status: "published",
      market: "fort-lauderdale",
      niche: "reels",
      cityLabel: "Fort Lauderdale",
      title: "Edición de Reels en Fort Lauderdale",
      description:
        "Instagram Reels, TikTok, YouTube Shorts, captions, ritmo y cortes sociales para negocios y creadores en Fort Lauderdale.",
      primaryKeyword: "edición de Reels en Fort Lauderdale",
      secondaryKeywords: [
        "editor de Instagram Reels Fort Lauderdale",
        "edición TikTok Fort Lauderdale",
        "editor de video corto Fort Lauderdale",
        "video para redes Fort Lauderdale",
      ],
      serviceSlugs: ["video-editing", "videography"],
      audienceSegments: [
        "creadores",
        "negocios locales",
        "marcas personales",
        "restaurantes",
        "proveedores de servicios",
      ],
      searchIntent:
        "Un cliente necesita video vertical con mejor retención, captions, ritmo y publicación constante.",
      competitorGap:
        "Muchos competidores mencionan social media dentro de un menú grande. Esta página convierte Reels en el producto principal.",
      eyebrow: "Editor de Reels en Fort Lauderdale",
      headline: "Ediciones cortas para marcas de Fort Lauderdale que publican seguido.",
      lede: "Convierte clips, talking heads, material de eventos, comida, productos y behind-the-scenes en Reels, TikToks y Shorts con mejor hook, captions, ritmo y exports listos para publicar.",
      servicesHeading: "Entregables short-form",
      services: [
        "Ediciones verticales para Instagram Reels, TikTok y YouTube Shorts",
        "Hook, ritmo, captions y sonido",
        "Edición en batch desde un rodaje o carpeta de material",
        "Clips para creadores, founders, restaurantes y negocios locales",
        "Plan de rodaje opcional si hace falta material nuevo",
      ],
      areasHeading: "Zonas para contenido social",
      areas: [
        "Las Olas",
        "Flagler Village",
        "Downtown Fort Lauderdale",
        "Wilton Manors",
        "Oakland Park",
        "Pompano Beach",
        "Hollywood",
        "Davie",
      ],
      proofHeading: "Pensado para publicar de forma constante",
      proof:
        "Una página de Reels no debe sonar como una página de comerciales. El cliente quiere velocidad, consistencia y clips nativos para el feed.",
      faqHeading: "Preguntas sobre edición de Reels",
      faqs: [
        {
          question: "¿Un rodaje puede convertirse en un mes de Reels?",
          answer:
            "Muchas veces sí. Una sesión enfocada puede capturar clips, hooks, B-roll y detalles que se convierten en varias ediciones verticales.",
        },
        {
          question: "¿Agregan captions?",
          answer:
            "Sí. Captions, ritmo, música, sonido y tamaños de export son parte del flujo de edición.",
        },
        {
          question: "¿Pueden seguir el estilo de una cuenta existente?",
          answer:
            "Sí. Envía referencias de la cuenta o competidores. La edición puede respetar la marca sin copiar el trabajo de otra persona.",
        },
      ],
      relatedLinks: [
        sharedRelatedLinksEs.videoEditing,
        sharedRelatedLinksEs.videography,
      ],
      ctaHeading: "¿Necesitas Reels editados en Fort Lauderdale?",
      ctaBody:
        "Envía una carpeta de material, referencia de Instagram y objetivo de publicación. Definimos un batch edit o un rodaje simple.",
      researchSourceIds: [
        "shine-creative-media",
        "videohouse",
        "short-form-media",
        "mile-1-media",
      ],
    },
    "broward-real-estate-video": {
      slug: "broward-real-estate-video",
      status: "published",
      market: "broward",
      niche: "real-estate",
      cityLabel: "Broward",
      title: "Video para real estate en Broward",
      description:
        "Videos de propiedades, Reels de listings, recorridos, tomas aéreas y fotos de apoyo para agentes y equipos inmobiliarios en Broward.",
      primaryKeyword: "video para real estate en Broward",
      secondaryKeywords: [
        "edición de video inmobiliario Broward",
        "video de propiedades Broward",
        "video de listings Fort Lauderdale",
        "drone para real estate Broward",
      ],
      serviceSlugs: ["video-editing", "videography", "aerial", "photography"],
      audienceSegments: [
        "agentes inmobiliarios",
        "property managers",
        "developers",
        "venues",
        "vacation rentals",
      ],
      searchIntent:
        "Un cliente de real estate o propiedades necesita video listo para listing, Reels, contexto aéreo y fotos de apoyo sin un proceso lento de agencia.",
      competitorGap:
        "Muchos competidores de drone y real estate lideran con paquetes de fotografía. Esta página lidera con video editado y cortes sociales.",
      eyebrow: "Video de real estate en Broward",
      headline: "Videos de propiedades, Reels de listings y tomas aéreas en Broward.",
      lede: "Para agentes, property teams, venues y rentals, Esteban Moreno Media convierte recorridos, clips de drone, detalles y fotos en videos de listing y edits sociales que muestran el espacio con claridad.",
      servicesHeading: "Entregables para propiedades",
      services: [
        "Ediciones de listing desde recorridos y material de drone",
        "Reels verticales de propiedades para Instagram y TikTok",
        "Contexto exterior, waterfront y vecindario",
        "Videos de venues, rentals y desarrollos",
        "Fotos de apoyo y retoque básico",
      ],
      areasHeading: "Mercados de propiedades en Broward",
      areas: [
        "Fort Lauderdale",
        "Hollywood",
        "Pompano Beach",
        "Plantation",
        "Davie",
        "Pembroke Pines",
        "Miramar",
        "Deerfield Beach",
      ],
      proofHeading: "El contenido de propiedades necesita contexto",
      proof:
        "Un video inmobiliario no es solo un walkthrough. El edit útil muestra flujo, alrededores, luz, vecindario, amenidades y los detalles que hacen la propiedad fácil de recordar.",
      faqHeading: "Preguntas sobre video inmobiliario",
      faqs: [
        {
          question: "¿Esteban puede editar un listing desde material existente?",
          answer:
            "Sí. Material de cámara, celular o drone puede convertirse en un video de listing y cortes verticales para redes.",
        },
        {
          question: "¿Se puede incluir drone?",
          answer:
            "Las tomas aéreas se pueden planificar cuando locación, timing, airspace, clima y requisitos legales lo permitan. No se promete ningún vuelo inseguro o no autorizado.",
        },
        {
          question: "¿Qué incluye un paquete básico de propiedad?",
          answer:
            "Un buen inicio es un edit principal de listing, uno a tres Reels verticales y fotos o frame grabs para redes y web.",
        },
      ],
      relatedLinks: [
        sharedRelatedLinksEs.videoEditing,
        sharedRelatedLinksEs.aerial,
        sharedRelatedLinksEs.photography,
      ],
      ctaHeading: "¿Necesitas video para una propiedad en Broward?",
      ctaBody:
        "Envía la zona, tipo de propiedad, fecha límite y si ya existe material. Definimos el paquete más simple para listing o redes.",
      researchSourceIds: [
        "edin-studios",
        "dragos-cinematics",
        "videographer-miami",
        "digital-cut",
      ],
    },
    "miami-restaurant-video": {
      slug: "miami-restaurant-video",
      status: "published",
      market: "miami",
      niche: "restaurant",
      cityLabel: "Miami",
      title: "Video para restaurantes en Miami",
      description:
        "Reels para restaurantes en Miami, edición de comida, promos hospitality, recaps de lanzamiento y contenido social para restaurantes, cafes, bares y marcas de comida.",
      primaryKeyword: "video para restaurantes en Miami",
      secondaryKeywords: [
        "Reels para restaurantes Miami",
        "editor de video de comida Miami",
        "video hospitality Miami",
        "video para redes de restaurantes Miami",
      ],
      serviceSlugs: ["video-editing", "videography", "photography"],
      audienceSegments: [
        "restaurantes",
        "cafes",
        "bares",
        "food trucks",
        "marcas hospitality",
      ],
      searchIntent:
        "Un restaurante necesita contenido corto, apetitoso y constante para Instagram, TikTok, lanzamientos, eventos y momentos del menú.",
      competitorGap:
        "Las agencias de Miami hablan de social en general. Esta página enfoca restaurantes y hospitality, donde importan velocidad, textura y publicación repetida.",
      eyebrow: "Video para restaurantes en Miami",
      headline: "Videos de comida, hospitality y lanzamientos para restaurantes en Miami.",
      lede: "Esteban Moreno Media edita y graba Reels de restaurantes, platos del menú, momentos con chef, recaps de eventos, drops de producto y promos hospitality para redes y web.",
      servicesHeading: "Entregables para restaurantes",
      services: [
        "Reels de platos y detalles de comida",
        "Clips de chef, staff y behind-the-scenes",
        "Videos de lanzamientos, pop-ups y eventos",
        "Cortes verticales desde una sesión de contenido",
        "Fotos de apoyo para posts, stories y web",
      ],
      areasHeading: "Zonas hospitality de Miami",
      areas: [
        "Wynwood",
        "Brickell",
        "Miami Beach",
        "Coral Gables",
        "Doral",
        "Little Havana",
        "Downtown Miami",
        "Coconut Grove",
      ],
      proofHeading: "El contenido de restaurantes tiene que sentirse inmediato",
      proof:
        "Un video de restaurante debe moverse rápido para redes pero mostrar textura, servicio, ambiente y la razón para visitar. Ese balance es un problema de edición antes que de cámara.",
      faqHeading: "Preguntas sobre video para restaurantes",
      faqs: [
        {
          question: "¿El rodaje puede ser antes o después del servicio?",
          answer:
            "Sí. Lo más limpio suele ser un bloque corto para prep, platos, ambiente y algunos momentos del staff o founder.",
        },
        {
          question: "¿Un shoot de menú puede producir varios posts?",
          answer:
            "Sí. Un batch puede convertirse en varios Reels de platos, una promo principal, clips para stories y fotos de apoyo.",
        },
        {
          question: "¿Un restaurante necesita primero un brand film completo?",
          answer:
            "Normalmente no. Para tracción inicial, el contenido corto y consistente suele ser mejor primer producto que un solo brand film grande.",
        },
      ],
      relatedLinks: [
        sharedRelatedLinksEs.videoEditing,
        sharedRelatedLinksEs.videography,
        sharedRelatedLinksEs.photography,
      ],
      ctaHeading: "¿Necesitas Reels para un restaurante en Miami?",
      ctaBody:
        "Envía el restaurante, foco del menú, fecha de lanzamiento y cuentas de referencia. Definimos una sesión simple o batch de edición.",
      researchSourceIds: [
        "videohouse",
        "short-form-media",
        "sobe-films",
        "mile-1-media",
      ],
    },
    "fort-lauderdale-drone-video": {
      slug: "fort-lauderdale-drone-video",
      status: "published",
      market: "fort-lauderdale",
      niche: "aerial",
      cityLabel: "Fort Lauderdale",
      title: "Video con drone en Fort Lauderdale",
      description:
        "Video con drone en Fort Lauderdale, tomas aéreas, contexto para propiedades, B-roll de eventos y material aéreo integrado en ediciones finales.",
      primaryKeyword: "video con drone en Fort Lauderdale",
      secondaryKeywords: [
        "video aéreo Fort Lauderdale",
        "drone videography Fort Lauderdale",
        "tomas aéreas Fort Lauderdale",
        "edición de drone South Florida",
      ],
      serviceSlugs: ["aerial", "video-editing", "videography"],
      audienceSegments: [
        "real estate",
        "venues",
        "negocios marinos",
        "eventos",
        "marcas locales",
      ],
      searchIntent:
        "Un cliente quiere perspectiva aérea para una propiedad, venue, evento o video de marca y necesita que eso se integre al edit final.",
      competitorGap:
        "Muchas páginas de drone venden captura aérea como paquete aislado. Esta página posiciona el drone como parte del video terminado.",
      eyebrow: "Video con drone en Fort Lauderdale",
      headline: "Tomas aéreas que apoyan el video final.",
      lede: "Usa tomas aéreas para contexto de propiedades, reveals waterfront, escala de venues, ambiente de eventos y establishing shots de marca. El objetivo no es un flyover genérico; es material útil para el edit.",
      servicesHeading: "Entregables aéreos",
      services: [
        "Establishing shots y reveals aéreos",
        "Contexto de propiedades, venues y waterfront",
        "B-roll de eventos y marcas cuando las reglas de locación lo permitan",
        "Selecciones de drone con color integrado al edit",
        "Combinación con cámara en tierra para un paquete completo",
      ],
      areasHeading: "Zonas aéreas de Fort Lauderdale",
      areas: [
        "Las Olas",
        "Downtown Fort Lauderdale",
        "Harbordale",
        "Lauderdale-by-the-Sea",
        "Pompano Beach",
        "Oakland Park",
        "Hollywood",
        "Dania Beach",
      ],
      proofHeading: "El contenido aéreo necesita planificación",
      proof:
        "El trabajo aéreo en South Florida depende de reglas de locación, clima, airspace, timing y del edit real. Esta página mantiene expectativas claras y no promete vuelos inseguros o no aprobados.",
      faqHeading: "Preguntas sobre drone",
      faqs: [
        {
          question: "¿Toda locación en Fort Lauderdale permite drone?",
          answer:
            "No. El trabajo aéreo depende de airspace, permiso de propiedad, clima, timing y requisitos legales. Cada proyecto necesita revisión de locación.",
        },
        {
          question: "¿Se entregan clips raw o un edit?",
          answer:
            "La oferta más fuerte es la entrega editada: selecciones aéreas con color y ritmo dentro de un video principal o clips sociales. Raw se puede cotizar si hace falta.",
        },
        {
          question: "¿Qué proyectos aprovechan mejor tomas aéreas?",
          answer:
            "Real estate, venues waterfront, negocios marinos, eventos, hospitality, progreso de construcción y videos de marca que necesitan contexto de ubicación.",
        },
      ],
      relatedLinks: [
        sharedRelatedLinksEs.aerial,
        sharedRelatedLinksEs.videoEditing,
        sharedRelatedLinksEs.videography,
      ],
      ctaHeading: "¿Necesitas tomas aéreas en Fort Lauderdale?",
      ctaBody:
        "Envía la locación, timing, uso final y plataforma. Revisamos el alcance y recomendamos el plan aéreo más seguro y útil.",
      researchSourceIds: [
        "dragos-cinematics",
        "edin-studios",
        "acq-drone-photography",
        "ocean-pride-media",
      ],
    },
  },
} as const;

export function getLocalSeoPage(locale: Locale, slug: string) {
  return LOCAL_SEO_PAGES[locale][slug as LocalSeoPageSlug];
}

export function getPublishedLocalSeoPages(locale: Locale) {
  return LOCAL_SEO_PAGE_SLUGS.map((slug) => LOCAL_SEO_PAGES[locale][slug]).filter(
    (page) => page.status === "published",
  );
}
