import { GeoServicePage, type GeoServicePageContent } from "@/components/geo-service-page";
import { ServiceDeepDive } from "@/components/service-depth";
import { cityReelsFor } from "@/lib/conversational-answers";
import { ARRANQUE_WEEKLY_TERMS as T, SHORT_FORM, shortFormWeeklyText, usd } from "@/lib/pricing";
import { buildPageMetadata } from "@/lib/site-metadata";

// Re-admitted 2026-10-14 by owner decision (Boca Raton added to the Google
// Business Profile service area the same day). The 2026-08-12 cohort review had
// noindexed a ~190-word template city page; this is a rebuild on the Reels Fort
// Lauderdale formula (vault: esteban-reels-fort-lauderdale-formula-2026-10-14).
// Claim discipline (AGENTS.md): Palm Beach County stays "project by project",
// Boca businesses appear only as audiences, never as clients.
const PATH = "/services/video-production-boca-raton";
const cityReels = cityReelsFor(PATH);
const once = usd(SHORT_FORM.perVideoFrom);

const content: GeoServicePageContent = {
  path: PATH,
  eyebrow: "Boca Raton Reels and video",
  title: "Reels and video editing for Boca Raton businesses, done remotely from the clips you already have.",
  description:
    "Send the clips you filmed in Boca Raton and get back Instagram Reels, TikToks and Shorts with readable captions and one clear action. Esteban edits remotely from Fort Lauderdale; on-location filming in Palm Beach County is scoped project by project.",
  locationLabel: "Boca Raton / Palm Beach County / Remote",
  proofTitle: "A published example",
  proofText:
    "Watch the published 24-second ML Colombia video from Esteban’s own brand. No Boca Raton client work is claimed on this page; send your clips and goals so he can recommend an edit for your project.",
  proofHref: "/portfolio/ml-colombia",
  proofLabel: "Watch ML Colombia social video",
  primaryCta: "Ask about Reels in Boca Raton",
  secondaryHref: "/resources/remote-editing-handoff-checklist",
  secondaryLabel: "Prepare your footage",
  serviceName: "Reels & Video Boca Raton",
  pricingQuestion: "How much does Reels and video editing in Boca Raton cost?",
  serviceDescription:
    "Remote Instagram Reels, TikTok, YouTube Shorts and short business video editing for Boca Raton businesses and creators, with on-location filming in Palm Beach County scoped project by project.",
  serviceType: "Short form video editing",
  areaServed: "Boca Raton / Palm Beach County / Remote",
  answerService: "Reels and video editing for Boca Raton businesses",
  craftHeading: "What Boca Raton Reels need from the edit.",
  depthHeading: "Boca Raton Reels and video questions, answered.",
  craft: [
    {
      title: "Show the place in the first second",
      detail:
        "A Boca Raton customer deciding between two cafés, two studios or two agents decides on what they see first. The edit opens on the dish, the room, the result or the person, not on a logo card. This is an example of how a brief is approached, not a claim about a published client project.",
    },
    {
      title: "Captions that survive the phone interface",
      detail:
        "Instagram, TikTok and Shorts put buttons, the caption and the profile name over the bottom and right of the video. Text is placed inside the safe zones so it never covers a face, a product, a property detail or a before-and-after.",
    },
    {
      title: "One action per clip",
      detail:
        "A Reel that asks for a visit, a call, a follow and a booking in fifteen seconds asks for nothing. Each clip ends on one action: message, call, book or look at more work. That makes the ending easier to write and the result easier to judge.",
    },
  ],
  depth: [
    {
      question: "Which Boca Raton businesses is this for?",
      body:
        "It is for Boca Raton businesses and creators that already film on a phone or a camera and need the clips turned into short videos people finish watching. The usual fits are restaurants and cafés, including those around Mizner Park; med spas, dental and medical practices; real estate agents with listing clips; boutiques and retail shops near Town Center at Boca Raton; fitness, yoga and wellness studios; professional services firms that want a short explainer; and student or early-stage creators around Florida Atlantic University. These are the kinds of businesses the service is built for, not a list of clients: no Boca Raton project is claimed here. What they share is footage that already exists and a need for a clear first second, readable captions and one action at the end. If your business is not on the list, the same handoff works.",
    },
    {
      question: "Does Esteban come to Boca Raton to film?",
      body:
        "Most Boca Raton work is remote editing, which does not depend on the drive. You upload the original clips to a shared folder, add a line about what each video should say and where it will be posted, and approve the edit from your phone. Boca Raton sits at the southern edge of Palm Beach County, across the Hillsboro Canal from Deerfield Beach in Broward County and roughly 20 miles north of Esteban's Fort Lauderdale base on I-95. On-location filming in Palm Beach County is considered project by project: whether a shoot makes sense, and what travel adds to the quote, is scoped per project once the brief is clear. No standing on-site availability in Boca Raton is promised, so ask before planning a shoot day around it.",
    },
    {
      question: "How much does Reels editing cost for a Boca Raton business?",
      body:
        `Boca Raton work is priced from the same published list as every other page on the site. The Starter package is from ${once} per video: you film, Esteban edits one vertical video for Reels, TikTok, Shorts or the web, with one revision round. If you post every week, Starter can be paid weekly at ${shortFormWeeklyText("en")}, with a ${T.minimumWeeks}-week minimum and then cancel any week. A planned month with a content plan, calendar, editing and a report is the Growth package, listed on the pricing page. Any on-location filming in Palm Beach County is quoted separately, project by project, because the travel and the shoot time depend on the brief. Every figure here comes from the same price list published on the pricing page.`,
    },
  ],
  faqHeading: "Questions before sending Boca Raton footage.",
  faqs: [
    {
      question: "Can you edit Reels remotely for a Boca Raton business?",
      answer:
        "Yes. Reels editing is a strong fit for remote work when the business can send original files, a short brief, a reference and one person to approve changes. A shoot is only needed when there is no usable footage or new scenes have to be captured, and in Palm Beach County that is scoped project by project.",
    },
    {
      question: "What footage should I send?",
      answer:
        "Original clips rather than downloaded social copies, the strongest moments, any talking-head or voiceover takes, your logo, a Reel you like and the platform it will be posted on. One or two clips that show the location or the product in context keep the edit from feeling generic.",
    },
    {
      question: "Is the work done in Spanish or English?",
      answer:
        "Esteban works Spanish-first, with intermediate English. Briefs, feedback and on-screen captions can be in either language; say which one your customers read when you send the clips.",
    },
    {
      question: "Do you also cover West Palm Beach and Delray Beach?",
      answer:
        "Yes, on the same terms: remote editing of the footage you have, and on-location work in Palm Beach County considered project by project. See the West Palm Beach and Delray Beach pages below.",
    },
  ],
  relatedHeading: "Reels and video near Boca Raton.",
  related: [
    {
      title: "Reels Editor Fort Lauderdale",
      detail: "How the Reels edit works, from Esteban's Fort Lauderdale base.",
      href: "/services/reels-editor-fort-lauderdale",
    },
    {
      title: "Reels and video editing in West Palm Beach",
      detail: "Remote editing of the footage West Palm Beach businesses already have.",
      href: "/services/video-editing-west-palm-beach",
    },
    {
      title: "Video production in Delray Beach",
      detail: "Boca Raton's northern neighbour in Palm Beach County.",
      href: "/services/video-production-delray-beach",
    },
    {
      title: "Short-form video editor",
      detail: "Reels, TikTok and Shorts editing priced per video or per week.",
      href: "/services/short-form-video-editor-miami",
    },
    {
      title: "Editor de Reels en Boca Raton",
      detail: "Esta página en español.",
      href: "/es/editor-de-reels-boca-raton",
    },
  ],
  inquiry: {
    serviceId: "reels_video_boca_raton",
    serviceName: "Boca Raton Reels and video editing",
    goalPrompt: "turn supplied clips into Reels, TikTok, or Shorts for a Boca Raton business",
    assetPrompt: "raw clips, brand notes, a reference Reel, captions or talking points, and the posting platform",
    proofHref: "/portfolio/ml-colombia",
    proofLabel: "Review short-form proof",
  },
};

export const metadata = buildPageMetadata({
  title: "Reels & Video Editing Boca Raton",
  description:
    "Reels editor for Boca Raton businesses: Instagram Reels, TikTok and Shorts edited remotely from your clips, from " + once + " per video. Palm Beach County shoots scoped per project.",
  path: PATH,
  locale: "en",
});

export default function VideoProductionBocaRatonPage() {
  return (
    <GeoServicePage
      content={content}
      showcase={
        <ServiceDeepDive
          id="city-reels"
          title={cityReels.section.heading}
          destinations="Who edits Reels in Boca Raton, the starting price and how to send footage."
          sections={[cityReels.section]}
        />
      }
    />
  );
}
