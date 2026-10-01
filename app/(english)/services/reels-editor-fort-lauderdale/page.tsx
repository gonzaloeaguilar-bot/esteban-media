import { GeoServicePage, type GeoServicePageContent } from "@/components/geo-service-page";
import { buildPageMetadata } from "@/lib/site-metadata";

const content: GeoServicePageContent = {
  path: "/services/reels-editor-fort-lauderdale",
  eyebrow: "Fort Lauderdale reels editor",
  title: "Reels editor in Fort Lauderdale for short videos that explain the offer fast.",
  description:
    "Editing for Instagram Reels, TikTok, and YouTube Shorts using supplied footage, clean captions, tighter pacing, and clear local business calls to action.",
  locationLabel: "Fort Lauderdale / Remote",
  proofTitle: "Short-form focus",
  proofText:
    "Fort Lauderdale searches already reach the site through broad pages. This page gives Reels buyers one direct service page with the exact handoff Esteban needs.",
  proofHref: "/services/short-form-video-editor-miami",
  proofLabel: "Compare short-form editing",
  primaryCta: "Ask about Reels editing",
  secondaryHref: "/resources/remote-editing-handoff-checklist",
  secondaryLabel: "Prepare your footage",
  serviceName: "Reels Editor Fort Lauderdale",
  serviceDescription:
    "Instagram Reels, TikTok, and YouTube Shorts editing for Fort Lauderdale businesses and remote clients.",
  serviceType: "Short form video editing",
  areaServed: "Fort Lauderdale / Broward County / Remote",
  craftHeading: "What Fort Lauderdale Reels need from the edit.",
  craft: [
    {
      title: "The first line has a job",
      detail:
        "A local Reel should open with the viewer's problem or the visible result, not with a logo animation. The first seconds decide whether the rest of the footage gets watched. A strong edit chooses the most specific opening and trims anything that delays the reason to care.",
    },
    {
      title: "Captions that do not cover the product",
      detail:
        "Phone platforms place buttons, captions, profile names, and comments over the video. Text has to stay readable without covering faces, food, property details, tools, or before-and-after proof. Safe zones are part of the edit, not a final export afterthought.",
    },
    {
      title: "One action per clip",
      detail:
        "A business Reel gets weaker when it asks for a visit, a call, a follow, a menu click, and a quote in the same few seconds. One clip should usually push one action. That makes the ending easier to write and gives the business a clearer way to judge whether the video is useful.",
    },
  ],
  faqHeading: "Questions before sending Fort Lauderdale Reels footage.",
  faqs: [
    {
      question: "What footage should I send for Reels editing?",
      answer:
        "Send original clips when possible, not downloaded social copies. Include the strongest moments, any voiceover or talking-head clips, brand files, a reference Reel, and the platform where the video will be published. If the business is local, include one or two clips that show the location, product, team, or neighborhood context so the edit does not feel generic.",
    },
    {
      question: "Can one batch become several Reels?",
      answer:
        "Yes, when the footage contains more than one clear idea. A batch can become a service explainer, a quick tip, a before-and-after, a customer question, and a simple offer clip. It is better to make fewer focused videos than to stretch weak footage into many nearly identical posts, because repeated clips give the viewer no new reason to watch.",
    },
    {
      question: "Do Reels need trending audio?",
      answer:
        "Not always. A trend can help discovery, but it cannot fix unclear footage or a weak message. For businesses, clear captions, understandable audio, and a fast path to the offer usually matter more than copying a sound. If a trend is used, the edit still needs to make sense when the viewer watches with sound off.",
    },
    {
      question: "Can you edit Reels remotely for a Fort Lauderdale business?",
      answer:
        "Yes. Reels editing is a strong fit for remote work when the business can send original files, a short brief, references, and one person to approve changes. A local shoot is only needed when there is no usable footage or the business needs new scenes, people, products, or location details captured.",
    },
  ],
  relatedHeading: "Related short-form and local services.",
  related: [
    {
      title: "Video Production Fort Lauderdale",
      detail: "Plan a shoot or edit a fuller business video around Fort Lauderdale.",
      href: "/services/video-production-fort-lauderdale",
    },
    {
      title: "Reels Editor Miami",
      detail: "Short-form editing for Miami and remote businesses.",
      href: "/services/reels-editor-miami",
    },
    {
      title: "Social Media Video Batching",
      detail: "Turn one folder or shoot into a usable set of social clips.",
      href: "/services/social-media-video-batching-miami",
    },
  ],
  inquiry: {
    serviceId: "reels_editor_fort_lauderdale",
    serviceName: "Fort Lauderdale Reels editing",
    goalPrompt: "turn supplied clips into Reels, TikTok, or Shorts for a local business",
    assetPrompt: "raw clips, brand notes, a reference Reel, captions or talking points, and the posting platform",
    proofHref: "/portfolio/ml-colombia",
    proofLabel: "Review short-form proof",
  },
};

export const metadata = buildPageMetadata({
  title: "Reels Editor Fort Lauderdale",
  description:
    "Fort Lauderdale Reels editor for Instagram Reels, TikTok, Shorts, captions, local business footage, and remote short-form editing.",
  path: content.path,
  locale: "en",
});

export default function ReelsEditorFortLauderdalePage() {
  return <GeoServicePage content={content} />;
}
