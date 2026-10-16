import { GeoServicePage, type GeoServicePageContent } from "@/components/geo-service-page";
import { buildPageMetadata } from "@/lib/site-metadata";

// Owner-requested 2026-10-15: on-location yacht-event filming is distinct from
// the existing yacht page, which remains strictly for editing supplied footage.
// It deliberately names no camera specifications, drone service, crew size,
// availability or client result until each is verified for a specific project.
const content: GeoServicePageContent = {
  path: "/services/yacht-event-videographer-fort-lauderdale",
  eyebrow: "Fort Lauderdale yacht events",
  title: "Yacht-event videography in Fort Lauderdale, scoped before the day starts.",
  description: "On-location yacht dinner, charter and waterfront event videography in Fort Lauderdale, with editing scoped separately for the final deliverables.",
  locationLabel: "Fort Lauderdale / Broward / Miami-Dade",
  proofTitle: "What can you confirm before a yacht event shoot?",
  proofText: "The useful first message is the marina or dock, event date and time, guest-facing moments that matter, access instructions, and the finished videos you need. Esteban confirms the filming plan and editing scope before a date is booked.",
  proofHref: "/services/yacht-hospitality-video-fort-lauderdale",
  proofLabel: "Already have yacht footage to edit?",
  primaryCta: "Ask about yacht-event filming",
  secondaryHref: "/services/corporate-event-videographer-miami",
  secondaryLabel: "See conference coverage",
  serviceName: "Yacht Event Videographer Fort Lauderdale",
  pricingQuestion: "How is yacht-event videography priced?",
  serviceDescription: "On-location yacht event videography and separately scoped post-production for Fort Lauderdale waterfront events.",
  serviceType: "Yacht event videography",
  areaServed: "Fort Lauderdale / Broward County / Miami-Dade County",
  answerService: "yacht-event videography in Fort Lauderdale",
  craftHeading: "What does a yacht dinner video need to plan before filming?",
  craft: [
    { title: "Access before guests arrive", detail: "A marina, dock or charter crew may have a check-in process and a short boarding window. Confirm it with the organiser before the event so filming begins where the day actually starts." },
    { title: "A simple moment list", detail: "Name the moments worth preserving: arrival, welcome, a toast, a speaker, food service, the view, or a short host message. That keeps coverage focused without promising every guest or every minute on camera." },
    { title: "Editing planned separately", detail: "Filming time and the final edits are scoped separately. A short highlight, vertical clips and a longer recap are different deliverables, so the quote names what will be edited before the date is confirmed." },
  ],
  depthHeading: "How do you plan a yacht dinner video in Fort Lauderdale?",
  depth: [
    { question: "What should you send before asking about yacht-event videography?", body: "Send the marina or pickup location, event date, start and end time, the part of the event that matters most, access rules, and where the finished video will be used. If the event runs for several hours, say which moments need coverage rather than assuming continuous filming of every guest. Esteban Moreno Media confirms the project one by one from a Fort Lauderdale base, in Spanish first with intermediate English. The quote separates time filming on location from the edits you want after the event, so a short vertical recap and a longer event film do not become an unclear single promise. For footage another crew has already captured, use the yacht editing service instead." },
    { question: "Is this the same as yacht video editing?", body: "No. This page is for an organiser who needs on-location filming at a yacht dinner, charter or waterfront event. The yacht hospitality editing page is for an operator, broker or client who already has footage and needs post-production. Keeping the two services separate makes the first conversation clearer: one starts with access, timing and moments to capture; the other starts with the original files, the desired edit and the platforms where it will be published. If both are needed, the written scope can include each line without suggesting that supplied footage was filmed by Esteban." },
  ],
  faqHeading: "Questions before booking a yacht-event videographer.",
  faqs: [
    { question: "Does Esteban film yacht dinners in Fort Lauderdale?", answer: "On-location yacht-event filming is scoped project by project. Send the marina, date, duration and access information so the filming plan can be confirmed before booking." },
    { question: "Can the same project include editing?", answer: "Yes. Editing is scoped separately from filming, with the number and format of finished videos written into the quote." },
    { question: "Can I send yacht footage I already have?", answer: "Yes. If filming is already complete, use the yacht hospitality editing service and send the original files through a shared link." },
  ],
  relatedHeading: "Related on-location and editing services.",
  related: [
    { title: "Yacht & Marine Video Editing", detail: "Post-production for yacht and hospitality footage already captured.", href: "/services/yacht-hospitality-video-fort-lauderdale" },
    { title: "Corporate Event Videographer Miami", detail: "Conference and event coverage with editing scoped to the deliverables.", href: "/services/corporate-event-videographer-miami" },
    { title: "Videographer Miami", detail: "On-location filming and editing for Miami-Dade businesses.", href: "/services/videographer-miami" },
  ],
  inquiry: { serviceId: "yacht_event_videography", serviceName: "Fort Lauderdale yacht-event videography", goalPrompt: "film a yacht dinner or waterfront event", assetPrompt: "the marina, date, event duration, access instructions, moments to capture, and the final videos needed", proofHref: "/services/yacht-hospitality-video-fort-lauderdale", proofLabel: "See yacht editing" },
};

export const metadata = buildPageMetadata({ title: "Yacht Event Videographer Fort Lauderdale", description: content.description, path: content.path, locale: "en" });

export default function YachtEventVideographerFortLauderdalePage() {
  return <GeoServicePage content={content} />;
}
