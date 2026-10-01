import { GeoServicePage, type GeoServicePageContent } from "@/components/geo-service-page";
import { buildPageMetadata } from "@/lib/site-metadata";

const content: GeoServicePageContent = {
  path: "/services/video-production-fort-lauderdale",
  eyebrow: "Fort Lauderdale video production",
  title: "Video production in Fort Lauderdale for businesses that need useful footage.",
  description:
    "Commercial video production, short-form content, and editing support for Fort Lauderdale businesses, service companies, real estate teams, and hospitality brands.",
  locationLabel: "Fort Lauderdale / Broward County",
  proofTitle: "Built for local searches",
  proofText:
    "This page gives Fort Lauderdale buyers a direct place to land instead of sending every video production query to the home page or a broad areas page.",
  proofHref: "/guides/video-production-cost-fort-lauderdale",
  proofLabel: "Read the Fort Lauderdale cost guide",
  primaryCta: "Ask about a Fort Lauderdale project",
  secondaryHref: "/areas",
  secondaryLabel: "View South Florida coverage",
  serviceName: "Video Production Fort Lauderdale",
  serviceDescription:
    "Video production, videography, and video editing for Fort Lauderdale and Broward County businesses.",
  serviceType: "Video production",
  areaServed: "Fort Lauderdale / Broward County / Remote",
  craftHeading: "What Fort Lauderdale business video needs to show clearly.",
  craft: [
    {
      title: "A real offer, not scenery",
      detail:
        "Fort Lauderdale footage can easily become beach, skyline, and drone filler. A useful business video still has to show the actual service, who it helps, what the customer should do next, and enough local context to feel real. Location adds trust only when the viewer can also understand the offer.",
    },
    {
      title: "Formats planned before filming",
      detail:
        "A company may need one website video, several Reels, a short ad, and still frames from the same shoot. Planning those crops before filming protects faces, products, signs, and captions from being cut off when the video moves from horizontal to vertical. The same footage can work harder when the safe zones are known early.",
    },
    {
      title: "Audio that can carry the message",
      detail:
        "A polished image does not save a noisy interview. Wind, traffic, music, and room echo are common around South Florida shoots, so the plan should name which lines must be recorded cleanly and which shots only need natural sound. Clear audio gives the editor something useful to build around.",
    },
  ],
  faqHeading: "Questions Fort Lauderdale businesses ask before starting video.",
  faqs: [
    {
      question: "What kind of Fort Lauderdale business video is easiest to start with?",
      answer:
        "The easiest first project is usually one focused video with one goal: explain a service, introduce a location, promote an offer, or turn existing footage into short social clips. A general brand video can work, but it becomes stronger when the business names the audience, the action it wants, and where the finished video will be used. That lets the edit support a real decision instead of becoming a montage.",
    },
    {
      question: "Can one shoot create both website video and Reels?",
      answer:
        "Yes, if the formats are planned before capture. Website video often needs wider shots, calmer pacing, and room for text or a headline. Reels need tighter moments, vertical framing, captions, and a faster opening. A shot list that covers both prevents the most common problem: good horizontal footage that loses faces, signs, or products when cropped for a phone.",
    },
    {
      question: "Do Fort Lauderdale projects need an in-person shoot?",
      answer:
        "Not always. If the business already has footage, Esteban can often help remotely with editing, captions, color, sound, and multiple export formats. An in-person shoot is more useful when the current footage is missing faces, location context, product details, or a clean explanation from the owner. The first quote should separate what can be edited now from what needs to be filmed.",
    },
    {
      question: "What should a business send before asking for a quote?",
      answer:
        "Send the goal, deadline, where the video will be published, any existing footage, logo or brand files, a reference video, and the best contact number. If the project involves a location, include the city and whether filming is needed. A short, specific message helps Esteban answer with scope and next steps instead of asking basic follow-up questions first.",
    },
  ],
  relatedHeading: "Related Fort Lauderdale and video services.",
  related: [
    {
      title: "Reels Editor Fort Lauderdale",
      detail: "Turn local business footage into vertical clips for Instagram, TikTok, and Shorts.",
      href: "/services/reels-editor-fort-lauderdale",
    },
    {
      title: "Yacht Hospitality Video",
      detail: "Marine, hospitality, and charter video support around Fort Lauderdale.",
      href: "/services/yacht-hospitality-video-fort-lauderdale",
    },
    {
      title: "Remote Video Editor",
      detail: "Send footage from anywhere and get a clearer editing handoff.",
      href: "/services/hire-remote-video-editor",
    },
  ],
  inquiry: {
    serviceId: "fort_lauderdale_video_production",
    serviceName: "Fort Lauderdale video production",
    goalPrompt: "plan or edit a business video for Fort Lauderdale customers",
    assetPrompt: "the goal, location, deadline, existing footage, and where the video will be published",
    proofHref: "/portfolio",
    proofLabel: "Review portfolio examples",
  },
};

export const metadata = buildPageMetadata({
  title: "Video Production Fort Lauderdale",
  description:
    "Fort Lauderdale video production and editing for business videos, Reels, website clips, hospitality, real estate, and remote post-production.",
  path: content.path,
  locale: "en",
});

export default function VideoProductionFortLauderdalePage() {
  return <GeoServicePage content={content} />;
}
