import { GeoServicePage, type GeoServicePageContent } from "@/components/geo-service-page";
import { buildPageMetadata } from "@/lib/site-metadata";

const content: GeoServicePageContent = {
  path: "/services/reels-editor-fort-lauderdale",
  eyebrow: "Fort Lauderdale reels editor",
  title: "Reels editor in Fort Lauderdale who turns your clips into clear social videos.",
  description:
    "Send existing clips and a clear goal; Esteban turns them into a focused Reel, TikTok, or Short with one message, legible captions, and one final action. The edit can stay remote, while a local shoot is scoped separately only when new footage is needed.",
  locationLabel: "Fort Lauderdale / South Florida / Remote",
  proofTitle: "A published example",
  proofText:
    "Watch the published 24-second ML Colombia video from Esteban’s own brand. Send your clips and goals so he can recommend an edit for your project.",
  proofHref: "/portfolio/ml-colombia",
  proofLabel: "Watch ML Colombia social video",
  primaryCta: "Ask about Reels editing",
  secondaryHref: "/resources/remote-editing-handoff-checklist",
  secondaryLabel: "Prepare your footage",
  serviceName: "Reels Editor Fort Lauderdale",
  pricingQuestion: "How much does a Reels editor in Fort Lauderdale cost?",
  serviceDescription:
    "Instagram Reels, TikTok, and YouTube Shorts editing for Fort Lauderdale businesses and remote clients.",
  serviceType: "Short form video editing",
  areaServed: "South Florida, from Palm Beach through the Keys / Remote",
  answerService: "Reels editing in Fort Lauderdale",
  craftHeading: "What Fort Lauderdale Reels need from the edit.",
  depthHeading: "Fort Lauderdale Reels editing questions, answered.",
  craft: [
    {
      title: "The first line has a job",
      detail:
        "For example, a restaurant could send phone clips of a dish, the dining room, and a short owner introduction. One edit might show the dish first, explain what makes it distinct, and end with one reservation action. Esteban selects usable footage with the business; this is an example of a possible brief, not a claim about a published client project.",
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
  // Citable depth, translated from copy Esteban already publishes in Spanish at
  // /es/editor-de-reels-fort-lauderdale. Nothing new is claimed here.
  depth: [
    {
      question: "What makes a business Reel useful?",
      body:
        "A business Reel does not need to tell the whole brand story. It should open on the clearest thing it has — the problem, the result, or the most immediate visual moment — and then carry the viewer to one simple action: message, call, visit, book, or look at more work. The edit decides what stays out, and that is most of the job. Long silences, repeated takes, slow intros and small text all cost attention before the offer has been explained. Cutting those is not a stylistic preference; it is what keeps the clip watchable long enough to make its point.",
    },
    {
      question: "What should the footage you send include?",
      body:
        "The useful package is original clips, a style reference, the main text or idea, a logo if one applies, and the platform it will be published on. If there is a voice-over or a testimonial, the audio should be shared at the best quality available rather than pulled from a compressed copy. It also helps to say what must not be used. An editor chooses better when they know which scenes are mandatory, which takes are repeats, and which part of the product, the room or the person has to stay visible throughout. That note usually saves a revision round on its own.",
    },
    {
      question: "How does the edit adapt to Instagram, TikTok and Shorts?",
      body:
        "Vertical platforms place buttons, captions and comments on top of the video. Subtitles and anything that matters therefore have to stay inside the safe zones, without covering faces, products, food, properties or tools. The same video can also need small changes per platform: a different cover frame, a different length, a different opening line, or a version with no music. Deciding the first channel before editing works better than trying to correct for it at export, because the crop, the pacing and the text placement all follow from where the clip is going to run.",
    },
    {
      question: "Should you send existing clips or plan a local shoot first?",
      body:
        "Start with editing when you already have original clips that show the product, service, people or place well enough to make one clear point. Send the strongest takes, the platform, and the action the viewer should take; that lets the edit focus on pacing, captions and a useful ending. Plan a local shoot when the footage cannot show the offer yet, when essential scenes are missing, or when the business needs a specific location or team moment captured. The two jobs solve different problems: remote editing shapes material you have, while a shoot creates the material before the edit begins.",
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
    {
      question: "Can a South Florida business request filming as well as Reels editing?",
      answer:
        "Yes. Esteban is based in Fort Lauderdale and can scope on-location work across South Florida, from Palm Beach through the Keys, when a project needs footage that does not exist yet. The quote confirms the exact site, access, schedule, capture needs, finished versions, and any transportation cost for a distant location. If your team already has usable clips, remote editing can start from those files without a shoot.",
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
      title: "Editor de Reels en Fort Lauderdale",
      detail: "La versión en español para negocios de Broward que ya tienen clips.",
      href: "/es/editor-de-reels-fort-lauderdale",
    },
    {
      title: "Content Repurposing",
      detail: "Turn one long video, podcast or shoot into a set of short social clips.",
      href: "/services/content-repurposing-service-miami",
    },
    {
      title: "Reels and video in Hollywood, FL",
      detail: "Remote Reels editing for Hollywood businesses, between Fort Lauderdale and Miami.",
      href: "/services/small-business-video-hollywood-fl",
    },
    {
      title: "Reels and video in Pembroke Pines",
      detail: "Short-form editing for southwest Broward businesses and creators.",
      href: "/services/small-business-video-pembroke-pines",
    },
    {
      title: "Reels and video editing in West Palm Beach",
      detail: "Remote editing of the footage West Palm Beach businesses already have.",
      href: "/services/video-editing-west-palm-beach",
    },
    {
      title: "Reels and video editing in Boca Raton",
      detail: "Remote Reels editing for Boca Raton businesses, at the south end of Palm Beach County.",
      href: "/services/video-production-boca-raton",
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
  title: "Reels Editor Fort Lauderdale | Clear Social Videos",
  description:
    "Turn supplied clips into clear Instagram Reels, TikTok videos, or Shorts with captions and one focused action. Fort Lauderdale and remote editing.",
  path: content.path,
  locale: "en",
});

export default function ReelsEditorFortLauderdalePage() {
  return <GeoServicePage content={content} />;
}
