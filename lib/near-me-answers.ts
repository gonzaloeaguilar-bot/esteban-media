/**
 * "… near me" answers for buyer phrases that had no owner page
 * (evidence/esteban-buyer-phrases-2026-11-26.csv, quality=strong,
 * bucket=near-me, best_page empty). Each one strengthens an existing page for a
 * service Esteban verifiably offers; no new routes.
 *
 * Rules: prices only from lib/pricing.ts / lib/packages.ts; availability is
 * never asserted (booked only once confirmed in writing); the proof link is a
 * real published item, labelled for what it is.
 */
import { priceSentence } from "@/lib/packages";
import { SHORT_FORM, filmingHourlyText, usd } from "@/lib/pricing";

export type NearMeAnswerContent = {
  /** Page the block lives on. */
  path: string;
  /** The buyer phrases this block answers (from the phrase CSV). */
  phrases: readonly string[];
  sectionId: string;
  ctaPrefix: string;
  question: string;
  answer: string;
  proof: { href: string; label: string };
  whatsappMessage: string;
};

const PER_VIDEO = usd(SHORT_FORM.perVideoFrom);
const BOOKED = "A date is booked only once it is confirmed in writing.";

export const DRONE_NEAR_ME: NearMeAnswerContent = {
  path: "/services/drone-video-editing-service-miami",
  phrases: [
    "drone videographer near me",
    "drone videography near me",
    "drone videography services near me",
    "drone photographer near me",
  ],
  sectionId: "drone-near-me",
  ctaPrefix: "drone_near_me",
  question: "Is there a drone videographer near me in Miami or Fort Lauderdale?",
  // Aviation boundary (vault client-esteban-media/agents.md, confirmed 2026-07-21):
  // Esteban holds no FAA Part 107 certificate, so aerial work is sold only as
  // editing supplied footage or as capture flown by a separately verified
  // Part 107 pilot. No per-session flying price and no claim that he flies here.
  answer: `Yes. Esteban Moreno Media, based in Fort Lauderdale, edits drone footage you already have from ${PER_VIDEO} per video. When you also need the aerial capture in South Florida, the flight is done by a separately verified FAA Part 107 pilot who is responsible for the flight and its permissions, and that shoot is quoted per project. Esteban's own aerial work is past agency work in Colombia: on the Banacol project he captured three days of aerial footage over export operations in Urabá, some of it launched from boats offshore. ${BOOKED}`,
  proof: { href: "/case-studies/banacol", label: "Read the Banacol aerial drone case study" },
  whatsappMessage: "Hi Esteban, I need drone video. Here are the location, the date, whether I already have footage, and what the video is for:",
};

export const LOCAL_VIDEOGRAPHER_NEAR_ME: NearMeAnswerContent = {
  path: "/services/video-production-fort-lauderdale",
  phrases: [
    "local videographer near me",
    "commercial video production near me",
    "video production company near me",
    "professional videographer near me",
  ],
  sectionId: "local-videographer-near-me",
  ctaPrefix: "ftl_near_me",
  question: "Is there a local videographer near me for commercial video in Fort Lauderdale?",
  answer: `Yes. Esteban Moreno Media is a local videographer based in Fort Lauderdale who films and edits commercial video for businesses in Broward and Miami-Dade. On-location filming is ${filmingHourlyText("en")}, editing footage you already have starts at ${PER_VIDEO} per video, and a production day with planning, filming and the edit is ${priceSentence("en", "presencia-local").toLowerCase()}. For on-location commercial work, see Healthy Smile Miami: Esteban filmed, recorded the sound and edited a promo inside a working dental clinic. ${BOOKED}`,
  proof: { href: "/case-studies/healthy-smile", label: "Read the Healthy Smile Miami case study" },
  whatsappMessage: "Hi Esteban, I need a local videographer for a business video. Here are the location, date and goal:",
};

export const DANCE_RECITAL_NEAR_ME: NearMeAnswerContent = {
  path: "/services/dance-studio-music-school-video-marketing-miami",
  phrases: ["dance recital videographer near me", "dance videographer near me", "dance video shoot near me"],
  sectionId: "dance-recital-near-me",
  ctaPrefix: "studio_near_me",
  question: "Can I hire a dance recital videographer near me in Miami or Fort Lauderdale?",
  answer: `Yes. Esteban Moreno Media, based in Fort Lauderdale, films dance recitals on location in Miami-Dade and Broward and edits them into recital highlights and short clips. On-location filming is ${filmingHourlyText("en")}; editing footage the studio or parents already recorded starts at ${PER_VIDEO} per video. The venue's filming rules are confirmed before the date, and only students whose families agreed to appear are posted publicly. There is no published recital film yet; the closest published work is a full event film he shot and edited. ${BOOKED}`,
  proof: { href: "/portfolio/diana-jack", label: "Watch Diana & Jack, a published event film (a wedding, not a recital)" },
  whatsappMessage: "Hi Esteban, I need a videographer for a dance recital. Here are the venue, date and times:",
};

export const NEAR_ME_ANSWERS: readonly NearMeAnswerContent[] = [DRONE_NEAR_ME, LOCAL_VIDEOGRAPHER_NEAR_ME, DANCE_RECITAL_NEAR_ME];
