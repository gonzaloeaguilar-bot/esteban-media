import { GeoServicePage, type GeoServicePageContent } from "@/components/geo-service-page";
import { buildPageMetadata } from "@/lib/site-metadata";
import { priceSentence } from "@/lib/packages";
import { filmingHourlyText, shortFormPriceText } from "@/lib/pricing";

const content: GeoServicePageContent = {
  path: "/services/video-production-fort-lauderdale",
  eyebrow: "Fort Lauderdale video production",
  title: "Video production in Fort Lauderdale for businesses that need useful footage.",
  description:
    "Commercial video production, short-form content, and editing support for Fort Lauderdale businesses, service companies, real estate teams, and hospitality brands.",
  locationLabel: "Fort Lauderdale / Broward County",
  proofTitle: "See a finished business video",
  proofText:
    "Watch the published Bar Door Monkey project to see a finished business video. That project was filmed in Miami. For a Fort Lauderdale project, share the kind of video you need, your location, and the footage you already have so Esteban can quote filming and editing separately.",
  proofHref: "/portfolio/bar-door-monkey",
  proofLabel: "Watch the Bar Door Monkey video",
  primaryCta: "Ask about a Fort Lauderdale project",
  secondaryHref: "/areas",
  secondaryLabel: "View South Florida coverage",
  serviceName: "Video Production Fort Lauderdale",
  pricingQuestion: "How much does video production in Fort Lauderdale cost?",
  serviceDescription:
    "Video production, videography, and video editing for Fort Lauderdale and Broward County businesses.",
  serviceType: "Video production",
  areaServed: "Fort Lauderdale / Broward County / Remote",
  answerService: "video production in Fort Lauderdale",
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
  depthHeading: "Remote or on location: how a Fort Lauderdale project is split.",
  // Row 107 (2026-10-14): GSC "remote video production company fort lauderdale"
  // 3 imp @9.3 on this page, and no question answered it.
  depth: [
    {
      question: "Can a Fort Lauderdale video production company work remotely?",
      body: `Yes, for most of the work. Esteban Moreno Media is based in Fort Lauderdale, and editing happens remotely: you send the footage, photos and references through a shared link, and the finished video comes back with captions and the sizes you need, with no visit. Remote editing is Starter, ${shortFormPriceText("en")}. A visit is needed when the footage does not exist yet, such as the owner explaining the service, the space itself or a product being used. On-location filming is a paid service scoped per project, ${filmingHourlyText("en")}, and a production day at your business, with planning, filming and the edit, is ${priceSentence("en", "presencia-local").toLowerCase()}. A project can mix both: one shoot in Broward or Miami-Dade, then remote edits from that footage for the weeks after. Communication is Spanish-first, with intermediate English for bilingual projects.`,
    },
    {
      question: "Who does video production for small businesses in Fort Lauderdale?",
      body: `Esteban Moreno Media works with Fort Lauderdale and Broward County small businesses on commercial reels, website videos, service showcases, and editing from existing footage. A useful first conversation identifies whether the project needs a new on-location shoot or only editing, then names the location, goal, finished formats, and deadline. On-location filming is scoped and quoted per project; remote short-form editing starts at ${shortFormPriceText("en")}. A written quote separates filming time, editing, and the finished files so the business can compare the work before booking.`,
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
