import { GeoServicePage, type GeoServicePageContent } from "@/components/geo-service-page";
import { buildPageMetadata } from "@/lib/site-metadata";

const content: GeoServicePageContent = {
  path: "/services/reels-editor-miami",
  eyebrow: "Miami reels editor",
  title: "Reels editor in Miami for business clips, product videos, and social ads.",
  description:
    "Short-form editing for Miami businesses that need supplied footage turned into readable, fast-moving Reels, TikTok videos, Shorts, and ad variations.",
  locationLabel: "Miami / Remote",
  proofTitle: "Miami short-form intent",
  proofText:
    "Miami already has a short-form page, but searchers also use the plain phrase Reels editor. This page answers that wording directly and links back to the deeper editing hub.",
  proofHref: "/services/short-form-video-editor-miami",
  proofLabel: "View the short-form editing hub",
  primaryCta: "Ask about Miami Reels editing",
  secondaryHref: "/guides/reels-vs-tiktok-vs-shorts-for-local-business",
  secondaryLabel: "Compare Reels, TikTok, and Shorts",
  serviceName: "Reels Editor Miami",
  serviceDescription:
    "Instagram Reels, TikTok, and YouTube Shorts editing for Miami businesses, creators, products, and remote teams.",
  serviceType: "Reels editing",
  areaServed: "Miami / Miami-Dade / Remote",
  craftHeading: "What Miami Reels need to do quickly.",
  craft: [
    {
      title: "Show the useful moment first",
      detail:
        "A Miami restaurant, clinic, realtor, or product brand often has footage that looks good but starts too slowly. The edit should open with the dish, result, space, product, or line that makes someone keep watching. Context can follow after the viewer has a reason to stay.",
    },
    {
      title: "Make sound optional",
      detail:
        "Many viewers watch social video without sound, especially on phones in public. Captions, visual order, and simple on-screen labels have to carry the point without turning the clip into a wall of text. The best short edits can be understood with sound off and feel better with sound on.",
    },
    {
      title: "Cut versions by intent",
      detail:
        "One Reel might need to introduce a business, another to answer a question, another to support a paid ad, and another to remind existing followers. Those are different edits, not just different lengths. Naming the intent before editing keeps the call to action from feeling pasted on.",
    },
  ],
  // Citable depth, translated from copy Esteban already publishes in Spanish at
  // /es/editor-de-reels-miami. Nothing new is claimed here.
  depth: [
    {
      question: "What makes a Miami Reel different from a generic video?",
      body:
        "Miami-Dade is full of visually strong businesses: restaurants, wellness, real estate, events, products, professional services and bilingual brands. A generic Reel loses its force when it does not show the place, the person, the product or the context that makes the offer believable. The edit has to keep those details while removing pauses and repetitions. The aim is not to fill seconds, it is to let a viewer understand quickly why this business is worth a message, a visit or a call. That is a decision about what to keep, and it is made clip by clip rather than by a template.",
    },
    {
      question: "How does one long recording become several Reels?",
      body:
        "An interview, a site visit, an event or a demonstration can be split into separate clips when it genuinely contains separate ideas. Each Reel then needs its own opening, one main point and a simple close. Cutting a recording into equal-length pieces almost never produces good videos, because the pieces inherit no structure of their own. To help the edit, mark the moments that cannot be missing and name the themes worth becoming their own clip: a frequent question, a before and after, a result, an objection, an offer, or one specific detail of the product.",
    },
    {
      question: "When is a bilingual version worth asking for?",
      body:
        "A bilingual version helps when the business serves both Spanish-speaking and English-speaking customers. It does not always mean duplicating the video: subtitles, supporting on-screen text, or a second short version are often enough, and they cost less than a full second edit. The decision depends on the audience, the channel and the message. For a local offer, the clarity of the text and whether it is readable on a phone matter more than mixing both languages without a concrete reason to do so.",
    },
  ],
  faqHeading: "Questions before hiring a Miami Reels editor.",
  faqs: [
    {
      question: "Is a Reels editor different from a general video editor?",
      answer:
        "A Reels editor focuses on vertical pacing, captions, safe zones, hooks, and platform formats. A general editor may be strong at longer stories but still miss the small phone constraints that make a short clip easy to watch. The useful question is not the label; it is whether the editor asks where the video will publish and what action it should create.",
    },
    {
      question: "What makes a Miami business Reel feel local without being cheesy?",
      answer:
        "Specific details work better than generic skyline shots. A storefront, dish, street, room, team member, service area, or product in use gives the viewer a real place to attach the offer. Local context should support the business message; it should not become stock scenery that could belong to any company.",
    },
    {
      question: "Can existing phone footage be enough?",
      answer:
        "Often, yes. Clean phone footage can be enough when it shows the product, person, service, or result clearly and the audio is understandable or replaceable. The limits are usually lighting, shaky movement, missing close-ups, and clips downloaded from social platforms. Original files give the edit more room to crop, caption, color, and stabilize.",
    },
    {
      question: "How should feedback be sent for a Reels batch?",
      answer:
        "Group feedback by video and timestamp. Name the line, shot, caption, or ending that needs a change, and keep one person in charge of final approval. That prevents a simple batch from turning into conflicting notes across text messages, email, and social apps.",
    },
  ],
  relatedHeading: "Related Miami short-form services.",
  related: [
    {
      title: "Short-Form Video Editor Miami",
      detail: "A broader hub for Reels, TikTok, Shorts, captions, and social cuts.",
      href: "/services/short-form-video-editor-miami",
    },
    {
      title: "Restaurant Promo Video",
      detail: "Food, dining, and hospitality clips built from stronger visual moments.",
      href: "/services/restaurant-promo-video-editing-miami",
    },
    {
      title: "UGC Ecommerce Video",
      detail: "Product clips and creator footage shaped into social ad variations.",
      href: "/services/ugc-video-editor-ecommerce",
    },
  ],
  inquiry: {
    serviceId: "reels_editor_miami",
    serviceName: "Miami Reels editing",
    goalPrompt: "turn supplied Miami business footage into short social videos",
    assetPrompt: "original clips, the offer, brand files, reference videos, platform notes, and a deadline",
    proofHref: "/portfolio/ml-colombia",
    proofLabel: "Review short-form proof",
  },
};

export const metadata = buildPageMetadata({
  title: "Reels Editor Miami",
  description:
    "Miami Reels editor for Instagram Reels, TikTok, YouTube Shorts, product clips, restaurant videos, captions, and social ad edits.",
  path: content.path,
  locale: "en",
});

export default function ReelsEditorMiamiPage() {
  return <GeoServicePage content={content} />;
}
