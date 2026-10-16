import { GeoServicePage, type GeoServicePageContent } from "@/components/geo-service-page";
import { buildPageMetadata } from "@/lib/site-metadata";
import { priceSentence } from "@/lib/packages";
import { SHORT_FORM, filmingHourlyText, shortFormPriceText, usd } from "@/lib/pricing";

// DM-16 (demand coverage map 2026-10-14): autocomplete x4 "videographer miami"
// and x4 "videographer fort lauderdale", and /es/videografo-en-miami had no
// English twin. Same facts as the Spanish page: Fort Lauderdale base, Miami-Dade
// projects selected one by one, filming from the owner's hourly floor (owner
// fact 2026-10-14), editing per video, published Miami work as the only proof.
// No drone work, client result or availability promise is claimed.

const local = priceSentence("en", "presencia-local").toLowerCase();

const content: GeoServicePageContent = {
  path: "/services/videographer-miami",
  eyebrow: "Videographer in Miami",
  title: "A videographer in Miami who films and edits the same project.",
  description:
    "Videographer for Miami-Dade businesses: on-location filming billed by the hour, editing priced per video, Spanish-first, from a Fort Lauderdale base.",
  locationLabel: "Miami-Dade / based in Fort Lauderdale",
  proofTitle: "See video filmed on location in Miami",
  proofText:
    "Healthy Smile Miami is a published project for a Miami dental clinic, made on assignment with 300 Bees: the credits name Esteban for on-location video, sound, editing and delivery. Watch it to judge the filming. Nothing published confirms the same price, crew or timing for another project.",
  proofHref: "/portfolio/healthy-smile",
  proofLabel: "Watch the Healthy Smile Miami video",
  primaryCta: "Ask about a Miami shoot",
  secondaryHref: "/areas",
  secondaryLabel: "View South Florida coverage",
  serviceName: "Videographer Miami",
  pricingQuestion: "How much does a videographer cost in Miami?",
  serviceDescription:
    "On-location videography and video editing for businesses in Miami-Dade, from a Fort Lauderdale base.",
  serviceType: "Videography",
  areaServed: "Miami-Dade County / Broward County",
  answerService: "hiring a videographer in Miami",
  craftHeading: "What a Miami shoot needs to get right.",
  craft: [
    {
      title: "One clear job for the video",
      detail:
        "A shoot goes better when the video has one job: explain the service, show the space, introduce the owner or promote one offer. That job decides which shots matter, who needs to be on camera and how long the finished piece should run.",
    },
    {
      title: "Sound planned before the camera",
      detail:
        "Traffic, air conditioning, music and wind are common on Miami locations. If someone speaks on camera, the plan names a quiet room and a time, because a clean picture does not save an interview nobody can hear.",
    },
    {
      title: "Formats chosen on the day",
      detail:
        "A website video, Reels and a short ad can come from one shoot if the vertical and horizontal framing is planned before recording. Faces, products and signs then stay inside the frame when the video is cropped for a phone.",
    },
    {
      title: "Equipment planned around the shoot",
      detail:
        "Esteban currently works with a Sony Alpha IV and Canon T5i. The useful planning decision is not a camera specification: it is confirming the coverage, audio, power and file-backup plan required for the location and duration before filming begins.",
    },
  ],
  depthHeading: "Hiring a videographer in Miami: what to know first.",
  depth: [
    {
      question: "How do you hire a videographer in Miami?",
      body: `Start with what the video is for, then ask for a written quote that separates filming time from editing. Esteban Moreno Media is based in Fort Lauderdale and takes Miami-Dade projects one by one, so the location and the date are confirmed when you ask. Filming is ${filmingHourlyText("en")}, the minimum for time on location, and editing is priced per video, from ${usd(SHORT_FORM.perVideoFrom)} on the Starter package. A full production day at your business, with planning, filming and the edit, is the Local Presence package, ${local}. Send the address, the goal, where the video will be published and a reference you like. Esteban replies with the hours he would film, the number of finished videos and the rounds of changes, before the date is booked. Communication is Spanish-first, with intermediate English for bilingual projects.`,
    },
    {
      question: "Do you need a videographer, or only an editor?",
      body: `You need a videographer when the footage does not exist yet: the owner explaining the service, the space itself, a product in use or a team at work. You only need an editor when you already have clips, even phone clips, that show those things. In that case nothing has to be filmed and the work is remote: you send the original files through a shared link and get the edited video back with captions and the sizes you need. Editing your own clips is Starter, ${shortFormPriceText("en")}. Many Miami projects mix both: one shoot at the location, then remote edits from that footage in the weeks after, so the filming cost is paid once and the footage keeps working. The [editor vs videographer guide](/guides/video-editor-vs-videographer) explains the two roles in more detail.`,
    },
  ],
  faqHeading: "Questions Miami businesses ask before booking a videographer.",
  faqs: [
    {
      question: "How much does a videographer cost per hour in Miami?",
      answer: `With Esteban Moreno Media, filming is ${filmingHourlyText("en")}, the minimum for time on location. Editing is priced separately, per video, and every shoot gets a written quote first.`,
    },
    {
      question: "Is Esteban based in Miami?",
      answer:
        "No. Esteban Moreno Media is based in Fort Lauderdale and takes Miami-Dade projects selectively; availability for each location is confirmed when you ask. There is no studio open to the public: filming happens at your business or the project location.",
    },
    {
      question: "Can I brief the videographer in Spanish?",
      answer:
        "Yes. Esteban's working language is Spanish, with intermediate English, so the brief, the shoot and the changes can all be in Spanish.",
    },
    {
      question: "What should I send before asking for a quote?",
      answer:
        "The address, the goal of the video, where it will be published, the date you need it, any footage you already have and one reference video you like. A specific first message gets a specific quote back.",
    },
  ],
  relatedHeading: "Related Miami and video services.",
  related: [
    {
      title: "Video Production Fort Lauderdale",
      detail: "Filming and editing from the Fort Lauderdale base, for Broward businesses.",
      href: "/services/video-production-fort-lauderdale",
    },
    {
      title: "Reels Editor Miami",
      detail: "Short vertical edits from the clips you already filmed.",
      href: "/services/reels-editor-miami",
    },
    {
      title: "Corporate Event Videographer Miami",
      detail: "Event filming and editing, priced as filming time plus the edit.",
      href: "/services/corporate-event-videographer-miami",
    },
    {
      title: "Yacht Event Videographer Fort Lauderdale",
      detail: "On-location filming for yacht dinners and waterfront events, separate from editing supplied footage.",
      href: "/services/yacht-event-videographer-fort-lauderdale",
    },
  ],
  inquiry: {
    serviceId: "miami_videographer",
    serviceName: "Miami videographer",
    goalPrompt: "film and edit a business video in Miami-Dade",
    assetPrompt: "the address, goal, date, where the video will be published, and any footage you already have",
    proofHref: "/portfolio/healthy-smile",
    proofLabel: "Watch Healthy Smile Miami",
  },
};

export const metadata = buildPageMetadata({
  title: "Videographer Miami",
  description: content.description,
  path: content.path,
  locale: "en",
});

export default function VideographerMiamiPage() {
  return <GeoServicePage content={content} />;
}
