import { PACKAGE_PRICES, PRICING_BANDS, usd } from "./lib/pricing.ts";

const countWords = (text: string) =>
  text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim().split(/\s+/).filter(Boolean).length;

const BANNED =
  /drone|aerial|\bdron\b|a[eé]reo|HIPAA|same-day|mismo d[ií]a|guarantee|garantiz|sin riesgo|high-converting|\d+\s?%|licensed|licenciad/i;

const starterFrom = PACKAGE_PRICES.arranque.kind === "from" ? usd(PACKAGE_PRICES.arranque.amount) : "$100";
const growthFrom = PACKAGE_PRICES.crecimiento.kind === "from" ? usd(PACKAGE_PRICES.crecimiento.amount) : "$640";
const localPresenceFrom = PACKAGE_PRICES["presencia-local"].kind === "from" ? usd(PACKAGE_PRICES["presencia-local"].amount) : "$800";
const socialMin = usd(PRICING_BANDS.social.baseMin);
const socialMax = usd(PRICING_BANDS.social.baseMax);
const onLocationMin = usd(PRICING_BANDS["on-location"].baseMin);
const onLocationMax = usd(PRICING_BANDS["on-location"].baseMax);

export const GYM_DEEP_DIVE = {
  id: "gym-video-details",
  title: "How much does gym video cost, and what should you film first?",
  destinations: "Editing and on-location ranges, monthly content plans, and published portfolio proof.",
  sections: [
    {
      heading: "How much does a gym promo video cost in Miami?",
      paragraphs: [
        `Short-form video editing for gym and fitness content falls into the calculator social editing band of ${socialMin} to ${socialMax} per project. This is an indicative editing-led freelancer range with an introductory discount already applied, designed for trainers and gym owners who record their own workout clips. Remote editing starts from ${starterFrom} per project through the [Starter package](/pricing/starter), which covers format adjustments for Reels or TikTok and one revision round. A scoped quote confirms the exact deliverables for your facility.`,
        `For fitness brands needing an ongoing presence, [Local Presence](/pricing/local-presence) starts from ${localPresenceFrom} per production day, while [Growth](/pricing/growth) starts from ${growthFrom} per month for planned posting. The calculator range is an estimate rather than a fixed total for every gym. You provide the raw workout footage, coaching demonstrations, and target platforms, and Esteban prepares the edit with clean sound balancing and dynamic pacing.`,
      ],
    },
    {
      heading: "What does it cost to film at the gym or studio?",
      paragraphs: [
        `On-location filming at your gym or fitness studio starts from ${localPresenceFrom} per production day under the [Local Presence](/pricing/local-presence) package, which includes pre-production planning, filming on location, and post-capture editing. If you need a shorter session, the half-day capture add-on carries an indicative range of ${onLocationMin} to ${onLocationMax} on the same discounted freelancer basis. These figures reflect solo videographer capture in Broward and selected Miami-Dade areas, not full commercial production crews with multi-camera setups.`,
        `For remote editing of existing footage, the [Starter package](/pricing/starter) begins at ${starterFrom} per project, and social editing ranges from ${socialMin} to ${socialMax}. Ongoing monthly plans like [Growth](/pricing/growth) begin at ${growthFrom} per month. Share your gym schedule, floor layout, and filming priorities through [contact](/contact) so Esteban can provide a clear written scope detailing capture hours, audio requirements, and final video cutdowns.`,
      ],
    },
    {
      heading: "What does a monthly content plan for a gym cost?",
      paragraphs: [
        `A monthly video posting plan starts from ${growthFrom} per month with the [Growth package](/pricing/growth), which includes a content plan, a publishing calendar, editing for your footage, and a monthly review report. This structure suits personal trainers, boutique studios, and CrossFit facilities aiming for consistent weekly visibility. If you only need individual video edits from your recorded classes, [Starter](/pricing/starter) begins at ${starterFrom} per project, while the social editing calculator band spans ${socialMin} to ${socialMax}.`,
        `When on-location production days are required to gather new workout material each month, [Local Presence](/pricing/local-presence) starts from ${localPresenceFrom} per production day. You film the daily client routines, coaching tips, or studio energy, and Esteban organizes the calendar and refines the footage. Check the [budget calculator](/calculator) to compare options, then request a written proposal tailored to your monthly release goals.`,
      ],
    },
    {
      heading: "What should a gym, trainer or pilates studio film first?",
      paragraphs: [
        `Start by recording the movements, coach cues, and member environment that define your training style, without disrupting the class flow. A repeatable routine works best: film one exercise demonstration with clear verbal instruction, two short clips of members training with proper form, and one wide shot of the studio floor. Bracing your smartphone on a stable shelf or tripod at chest height provides clear framing without requiring an extra person to hold the camera.`,
        `Always ask member permission before recording anyone in the facility and keep a short written note of who agreed. Consistent lighting across your workout floor allows clips to be cut together seamlessly in post-production. Starter editing is available from ${starterFrom} per project, social editing spans ${socialMin} to ${socialMax}, and ongoing [Growth](/pricing/growth) plans start from ${growthFrom} per month. On-location sessions start from ${localPresenceFrom} through [Local Presence](/pricing/local-presence).`,
      ],
    },
    {
      heading: "Which fitness work is in Esteban's portfolio?",
      paragraphs: [
        `Esteban's published fitness projects are interactive web platforms and conversational AI systems, not video. [Gains From Geebs](/portfolio/gains-from-geebs) is an interactive fitness web platform and Instagram DM bot built for a fitness coaching brand to answer training inquiries and qualify leads. [TitanForge](/portfolio/titanforge) is a high-performance web platform and AI booking bot developed for athlete onboarding, automated scheduling, and client registration. Both represent digital development and automation rather than filmed gym video.`,
        `For filmed client production proof, you can review [Healthy Smile Miami](/portfolio/healthy-smile), which features on-location social-media video capture (video and sound) and editing for a local dental clinic. For gym video projects, editing starts from ${starterFrom} per project through [Starter](/pricing/starter), social editing spans ${socialMin} to ${socialMax}, monthly [Growth](/pricing/growth) begins at ${growthFrom} per month, and [Local Presence](/pricing/local-presence) starts from ${localPresenceFrom} per production day.`,
      ],
    },
  ],
};

export const SALON_COST_DEEP_DIVE = {
  id: "salon-cost-details",
  title: "How much does salon video cost in Miami?",
  destinations: "Editing ranges, on-location capture, and monthly publishing plans.",
  sections: [
    {
      heading: "How much does salon or barbershop video cost in Miami?",
      paragraphs: [
        `Editing short-form video for hair salons, barbershops, and nail studios falls into the calculator social editing band of ${socialMin} to ${socialMax} per project. This is an indicative editing-led freelancer range with an introductory discount applied, built for shops that record clips between appointments. Remote editing starts from ${starterFrom} per project through the [Starter package](/pricing/starter), which includes format adaptation for vertical platforms and one round of revisions. A written proposal sets the exact scope for your salon.`,
        `For salons needing production support, [Local Presence](/pricing/local-presence) starts from ${localPresenceFrom} per production day, while [Growth](/pricing/growth) starts from ${growthFrom} per month for scheduled posting. Pricing varies based on raw clip volume, color correction needs, and final delivery versions. Share your recorded transformation clips through [contact](/contact) to establish your project quote.`,
      ],
    },
    {
      heading: "What does filming inside the salon cost?",
      paragraphs: [
        `Filming inside your salon or barbershop starts from ${localPresenceFrom} per production day under the [Local Presence](/pricing/local-presence) package, covering pre-production planning, on-location filming, and post-capture editing. For shorter sessions, the half-day capture add-on has an indicative range of ${onLocationMin} to ${onLocationMax} on the same discounted freelancer basis. This provides dedicated capture in Broward and selected Miami-Dade areas without bringing disruptive multi-person crews into your styling stations.`,
        `If you record transformation clips on your phone, remote editing starts from ${starterFrom} per project with [Starter](/pricing/starter), and social editing spans ${socialMin} to ${socialMax}. Monthly posting support begins at ${growthFrom} per month with [Growth](/pricing/growth). Tell Esteban your salon schedule, station lighting, and key services to receive a clear written scope detailing filming hours and edited cutdowns.`,
      ],
    },
    {
      heading: "What does a monthly posting plan for a salon cost?",
      paragraphs: [
        `A monthly video publishing plan for a salon or barbershop starts from ${growthFrom} per month with the [Growth package](/pricing/growth). This includes a structured content plan, a publishing calendar, video editing for your weekly transformation clips, and a monthly performance review. It helps stylists and shop owners maintain regular social visibility without spending evenings editing footage. If you only require editing for individual clip batches, [Starter](/pricing/starter) starts from ${starterFrom} per project, and social editing ranges from ${socialMin} to ${socialMax}.`,
        `When dedicated filming sessions are scheduled to capture styling techniques or shop ambiance, [Local Presence](/pricing/local-presence) starts from ${localPresenceFrom} per production day. You capture client reveals and haircut finishes, and Esteban manages post-production. Use the [budget calculator](/calculator) to estimate costs, then request a written proposal tailored to your salon.`,
      ],
    },
  ],
};

export const SPA_DEEP_DIVE = {
  id: "spa-video-details",
  title: "How much does spa promotional video cost in Miami?",
  destinations: "Editing and capture pricing, privacy-conscious filming, and monthly content plans.",
  sections: [
    {
      heading: "How much does a spa promotional video cost in Miami?",
      paragraphs: [
        `Promotional video editing for luxury spas and wellness centers falls into the calculator social editing band of ${socialMin} to ${socialMax} per project. This is an indicative editing-led freelancer range with an introductory discount already applied, created for wellness brands that film their own treatment rooms and facilities. Remote editing starts from ${starterFrom} per project under the [Starter package](/pricing/starter), which provides format tailoring for social feeds and one revision round. A scoped quote confirms exact deliverables.`,
        `For wellness facilities seeking on-site capture, [Local Presence](/pricing/local-presence) starts from ${localPresenceFrom} per production day, while ongoing [Growth](/pricing/growth) starts from ${growthFrom} per month. Estimates reflect editing complexity, audio atmosphere, and deliverable count. Send your footage and visual references through [contact](/contact) to receive written confirmation of project scope.`,
      ],
    },
    {
      heading: "What does filming at the spa cost?",
      paragraphs: [
        `Filming on location at your spa or wellness center starts from ${localPresenceFrom} per production day with the [Local Presence](/pricing/local-presence) package, which includes pre-production planning, quiet on-site capture, and post-capture editing. For shorter sessions, the half-day on-location add-on carries an indicative range of ${onLocationMin} to ${onLocationMax} on the same discounted freelancer basis. This approach ensures discreet solo videography in Broward and selected Miami-Dade locations without disrupting guest tranquility.`,
        `If your team already records ambient footage, remote editing starts from ${starterFrom} per project via [Starter](/pricing/starter), and social editing spans ${socialMin} to ${socialMax}. Ongoing monthly plans begin at ${growthFrom} per month with [Growth](/pricing/growth). Share your spa layout, treatment schedule, and quiet hours to establish a detailed written scope specifying capture times and video deliverables.`,
      ],
    },
    {
      heading: "How does a spa film without showing guests?",
      paragraphs: [
        `A spa can film compelling promotional video by focusing on ambient details, empty treatment suites, and sensory textures before opening hours. Capture close-up moments of botanical oils, hot stones, pouring water, and soft lighting rather than full-room scenes with clients. When showing a treatment technique, film only the therapist hands working on product textures or have a consenting staff member model the service with written permission.`,
        `This preserves guest privacy entirely while communicating your serene atmosphere and care standards. Remote editing of your ambient clips starts from ${starterFrom} per project through [Starter](/pricing/starter), social editing spans ${socialMin} to ${socialMax}, monthly [Growth](/pricing/growth) starts from ${growthFrom} per month, and on-location capture begins at ${localPresenceFrom} with [Local Presence](/pricing/local-presence).`,
      ],
    },
    {
      heading: "What does a monthly content plan for a spa cost?",
      paragraphs: [
        `A monthly video content plan for a wellness center starts from ${growthFrom} per month through the [Growth package](/pricing/growth). This package provides an ongoing content strategy, a monthly publishing schedule, video editing for your recorded treatment clips, and a monthly review report. It is ideal for day spas and wellness practices wanting consistent, elegant social touchpoints. If you only need individual video cutdowns, [Starter](/pricing/starter) begins at ${starterFrom} per project, and social editing ranges from ${socialMin} to ${socialMax}.`,
        `When on-site production is arranged to capture seasonal treatments or new facility amenities, [Local Presence](/pricing/local-presence) starts from ${localPresenceFrom} per production day. You provide treatment clips and ambient b-roll, and Esteban shapes them into polished releases. Review the [budget calculator](/calculator) to compare options, then request a scoped written quote.`,
      ],
    },
  ],
};

for (const [name, dive] of Object.entries({ GYM: GYM_DEEP_DIVE, SALON: SALON_COST_DEEP_DIVE, SPA: SPA_DEEP_DIVE })) {
  console.log(`=== CHECKING ${name} ===`);
  const text = JSON.stringify(dive);
  if (BANNED.test(text)) console.error(`FAIL: ${name} matched BANNED regex!`, text.match(BANNED));
  for (const p of ["$350", "$675", "$100", "$800", "$640"]) {
    if (!text.includes(p)) console.error(`FAIL: ${name} missing price ${p}`);
  }
  for (const section of dive.sections) {
    const words = countWords(section.paragraphs.join(" "));
    console.log(`  "${section.heading}": ${words} words`);
    if (words < 100 || words > 180) console.error(`  FAIL: word count out of bounds (${words})`);
  }
}
