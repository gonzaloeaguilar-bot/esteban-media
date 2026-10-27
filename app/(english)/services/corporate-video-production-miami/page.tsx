import { GeoServicePage, type GeoServicePageContent } from "@/components/geo-service-page";
import { buildPageMetadata } from "@/lib/site-metadata";
import { filmingHourlyText } from "@/lib/pricing";
import { priceSentence } from "@/lib/packages";

const content: GeoServicePageContent = {
  path: "/services/corporate-video-production-miami",
  eyebrow: "Corporate video production / Miami",
  title: "Corporate video production in Miami for a clear business message.",
  description:
    "Corporate video production in Miami for company overviews, executive interviews, customer stories, internal communication, and focused campaign videos.",
  locationLabel: "Miami / South Florida",
  proofTitle: "Start with the business decision",
  proofText:
    "A corporate video is useful when the brief names the audience, the decision the viewer needs to make, and the final places the video will run. Filming and editing are scoped separately so the proposal matches the actual project.",
  proofHref: "/guides/corporate-video-production-cost-miami",
  proofLabel: "Read the Miami corporate-video cost guide",
  primaryCta: "Ask about a Miami corporate video",
  secondaryHref: "/portfolio",
  secondaryLabel: "See published work",
  serviceName: "Corporate Video Production Miami",
  pricingQuestion: "How much does corporate video production in Miami cost?",
  serviceDescription:
    "Corporate video production in Miami for a defined business message, with filming and editing quoted to the needed scope.",
  serviceType: "Corporate video production",
  areaServed: "Miami / Miami-Dade / South Florida",
  answerService: "corporate video production in Miami",
  craftHeading: "What a corporate video needs to make clear.",
  craft: [
    {
      title: "One audience and one decision",
      detail:
        "A company overview, executive interview, customer story, internal update, and recruitment video do different jobs. Naming the viewer and the next step before filming keeps the message from turning into a generic montage.",
    },
    {
      title: "A brief that separates filming from editing",
      detail:
        "The quote should distinguish what must be captured on location from what can be made with supplied files. That makes room for a focused shoot, remote post-production, or both without pretending every corporate project has the same crew or schedule.",
    },
    {
      title: "Versions planned for where people will watch",
      detail:
        "A website overview, an executive LinkedIn cut, a vertical social clip, and an internal presentation may start from the same conversation but need different framing, pacing, captions, and endings. Those destinations belong in the brief before the shoot.",
    },
  ],
  depthHeading: "Corporate-video questions Miami teams ask before requesting a proposal.",
  depth: [
    {
      question: "What should a Miami corporate video proposal include?",
      body: "Start with the audience, business decision, required final files, approval owner, known locations, fixed dates, and any existing assets. The proposal can then separate planning, filming, editing, captions, versions, and open questions. That is clearer than asking for a universal package, because an executive interview and a customer-story project need different coverage even if both are called corporate video.",
    },
    {
      question: "Can a corporate project combine Miami filming and remote editing?",
      body: `Yes. If the project needs interviews, controlled audio, or a specific workplace, the filming portion is a paid service scoped to the project, ${filmingHourlyText("en")}. Editing can continue remotely once the footage and approval notes are available. A production day that combines planning, filming, and an edit is ${priceSentence("en", "presencia-local").toLowerCase()}. The final scope, locations, deliverables, and schedule are confirmed in the quote rather than assumed from a template.`,
    },
    {
      question: "When is a company overview better than several short videos?",
      body: "A company overview is useful when a visitor needs one concise explanation of what the business does and why it matters. Several short videos are often better when the same business needs to answer separate questions: who the founder is, how a process works, what a customer should expect, or why a product is different. A project can begin with one core interview and plan the distinct messages before editing begins.",
    },
  ],
  faqHeading: "Before you begin a Miami corporate-video project.",
  faqs: [
    {
      question: "Do you offer a fixed corporate video package?",
      answer:
        "No universal package is promised. Corporate scope depends on the message, people appearing, locations, audio needs, final formats, approval process, and delivery timing. A short brief makes it possible to quote those pieces clearly.",
    },
    {
      question: "What should we send before asking for a quote?",
      answer:
        "Send the goal, audience, location, deadline, planned distribution, existing footage or brand files, required speakers, and one or two references. If something must be approved by legal, leadership, or a client, say so early because it affects the edit and timeline.",
    },
    {
      question: "Can the final video be used on a website and social channels?",
      answer:
        "It can be planned for both when those uses are known before filming. Website and social versions can need different crops, captions, opening lines, lengths, and calls to action. Name each destination in the brief so the needed coverage is captured from the start.",
    },
  ],
  relatedHeading: "Related Miami video services and planning tools.",
  related: [
    {
      title: "Corporate video production in Brickell",
      detail: "A more specific corporate-video page for Brickell companies and professional teams.",
      href: "/services/corporate-video-production-brickell",
    },
    {
      title: "Brand video production in Miami",
      detail: "For a founder story or company positioning piece with a broader brand focus.",
      href: "/services/brand-video-production-miami",
    },
    {
      title: "Video-production RFP template",
      detail: "A practical list of the inputs that make a video proposal easier to compare.",
      href: "/guides/video-production-rfp-template-miami",
    },
  ],
  inquiry: {
    serviceId: "corporate_video_production_miami",
    serviceName: "Corporate video production in Miami",
    goalPrompt: "plan a corporate video with a clear audience and business purpose",
    assetPrompt: "the audience, goal, location, deadline, expected final versions, available assets, and approval process",
    proofHref: "/portfolio",
    proofLabel: "Review published work",
  },
};

export const metadata = buildPageMetadata({
  title: "Corporate Video Production Miami",
  description:
    "Corporate video production in Miami for company overviews, executive interviews, customer stories, internal communication, and focused campaign videos.",
  path: content.path,
  locale: "en",
});

export default function CorporateVideoProductionMiamiPage() {
  return <GeoServicePage content={content} />;
}
