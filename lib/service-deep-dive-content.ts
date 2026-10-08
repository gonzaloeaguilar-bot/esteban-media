import type { DeepDiveSection } from "@/components/service-depth";
import {
  EXPRESS_MULTIPLIER,
  PACKAGE_PRICES,
  PRICING_BANDS,
  SHORT_FORM,
  shortFormWeeklyText,
  usd,
} from "@/lib/pricing";

/**
 * The second reading on each 2026-10-06 niche page.
 *
 * Sections of roughly 100-180 words under a question-shaped heading, each one
 * carrying a fact rather than an adjective. They render inside a native
 * <details>, server-side, so the paragraphs are in the raw HTML whether the fold
 * is open or shut — which is the only honest way to collapse anything on a site
 * whose organic footprint is its acquisition channel.
 *
 * Claim discipline is the same as lib/service-depth-content.ts: no price, no
 * turnaround, no guarantee, no result, no statistic without a source. Esteban
 * does not hold a Part 107 certificate, so nothing here offers to fly a drone,
 * and his working language is Spanish with intermediate English, so nothing here
 * claims full fluency in both.
 */

export type DeepDive = {
  id: string;
  title: string;
  destinations: string;
  sections: readonly DeepDiveSection[];
};

export const MEDICAL_PRACTICE_DEEP_DIVE: DeepDive = {
  id: "clinic-preparation",
  title: "How does a clinic get footage worth editing?",
  destinations: "Consent and scheduling, filming around real appointments, and what to send.",
  sections: [
    {
      heading: "What does the practice have to decide before filming day?",
      paragraphs: [
        "Three decisions, and none of them is about cameras. The first is who appears: a clinician, a staff member, a patient, or nobody recognisable at all. Only the patient case needs a signed marketing authorisation under HIPAA, and that authorisation is held by the practice, so deciding it first is what makes patient footage possible rather than theoretical.",
        "The second is which room. A treatment room with a window usually beats a windowless one, and the quietest room beats the most impressive one for anything with talking in it. The third is what the video is for: a single complaint explained to a prospective patient, a tour that lowers first-visit nerves, or a demonstration a current patient can follow at home. Those are three different shoots, and trying to get all three from one unplanned hour is the most common reason a clinic ends up with footage it never publishes.",
      ],
    },
    {
      heading: "What should a clinic send when the footage is ready?",
      paragraphs: [
        "A folder, a list, and the clearances. The folder holds the original files straight off the phone or camera, not clips re-saved out of a messaging app, because a message-app copy has already been compressed and the detail cannot be restored. The list says, in one line per clip, what each one is and where it is going: a vertical post, a page header, an ad.",
        "The clearances matter as much as the files. Naming which clips contain a recognisable patient, and which of those are authorised, means the edit is built only from material that can actually be published. Add the practice logo as a vector or layered file rather than a screenshot, the name and title of anyone who appears on screen, and the exact wording of the next step you want a viewer to take. With that in hand, editing can start without a round of questions.",
      ],
    },
  ],
};

export const CREATOR_DEEP_DIVE: DeepDive = {
  id: "creator-workflow",
  title: "How does a weekly posting rhythm actually hold up?",
  destinations: "Batching a filming block, the handoff that avoids questions, and disclosure.",
  sections: [
    {
      heading: "How is a filming block planned so it yields separate posts?",
      paragraphs: [
        "By writing the list before picking up the camera. A block that produces a stack of publishable posts starts as a list of distinct ideas, each with its own first sentence, because every post is somebody's first contact with the account and cannot depend on the one before it.",
        "From there it is a matter of resetting something visible between ideas. A different jacket, a second wall, a change from sitting to standing: small changes that stop five posts from reading as five slices of one clip. Keeping the lighting setup fixed across the whole block is the opposite choice, and a deliberate one, because consistent light is what lets the clips be cut in any order later. The last thing worth doing on the day is a few seconds of silent room footage and a couple of neutral cutaways, which are what rescue a take with a stumble in the middle.",
      ],
    },
    {
      heading: "What does a creator hand over, and what is a disclosure's job?",
      paragraphs: [
        "The handoff is small: original files, one line per clip, the destination platform and handle, and any reference or sound you already have in mind. Naming the platform matters because the safe area differs between a feed post and a full-screen vertical one, and text placed for the wrong one gets covered by the interface.",
        "Disclosure is the part worth getting right the first time. When there is a material connection to a brand — payment, free product, an affiliate arrangement, a family tie — the FTC expects it stated clearly and conspicuously where the audience will actually notice it, which means on screen and in the spoken words rather than only in a caption that has to be expanded. Telling the editor which clips are paid partnerships at handoff is what keeps the disclosure in the cut instead of being added as an afterthought.",
      ],
    },
  ],
};

const wlStarterPrice = PACKAGE_PRICES.arranque;
const wlStarterFrom = wlStarterPrice.kind === "from" ? usd(wlStarterPrice.amount) : "a custom quote";
const wlYoutubeBand = PRICING_BANDS.youtube;
const wlWeekly = shortFormWeeklyText("en");

export const WHITE_LABEL_DEEP_DIVE: DeepDive = {
  id: "white-label-workflow",
  title: "What does a white-label edit cost, and how does it fit a studio's delivery?",
  destinations: "Prices, published agency work, the handoff package, and how revisions run.",
  sections: [
    {
      heading: "How much does white-label video editing cost?",
      paragraphs: [
        `Esteban's [Starter package](/pricing/starter), remote editing of footage you already have, starts from ${wlStarterFrom} per video with one revision round included. The calculator prices short-form the same way, inside a published market of ${usd(SHORT_FORM.marketMin)}–${usd(SHORT_FORM.marketMax)} per video. Its YouTube band is ${usd(wlYoutubeBand.baseMin)}–${usd(wlYoutubeBand.baseMax)} per edit, an editing-led freelancer range with a 10% introductory discount, checked against published market rates of ${usd(wlYoutubeBand.marketMin)}–${usd(wlYoutubeBand.marketMax)}.`,
        `A studio sending work every week can use the weekly rate, ${wlWeekly}; larger monthly volumes are quoted directly rather than published. None of these is a quote. The price of a white-label job is set once Esteban has seen the footage, the deliverable list and the number of revision rounds the studio sold to its own client, so send one representative project first and price the rest from it.`,
      ],
    },
    {
      heading: "Has Esteban edited for agencies before?",
      paragraphs: [
        "Yes, and the published examples say exactly what he did. For the agency 300 Bees, he edited a social-media video for [Homeowners](/portfolio/homeowners) from footage the agency supplied: editing only, the arrangement most studios want when they subcontract post-production. On another 300 Bees assignment he filmed on location, video and sound, for a Miami dental clinic, then edited and delivered the finished social pieces ([Healthy Smile Miami](/portfolio/healthy-smile)).",
        "Both appear in the portfolio with the agency's name because that credit is already public. White-label work is not published unless the studio says so, which is why the public list is short. If the published work does not match your client's category, say so in the brief before the first project is scoped.",
      ],
    },
    {
      heading: "What belongs in the package a studio sends over?",
      paragraphs: [
        "Everything needed to cut without asking a question, which in practice is five things. The original camera files, including any second camera, with their folder structure intact rather than flattened. The separately recorded audio, if a recorder or lavalier was used, so it can be synced rather than reconstructed from the camera track.",
        "Then the brand material as vectors or layered files, because a logo lifted from a website is a low-resolution picture of a logo. A brief naming each deliverable, its aspect ratio, its destination and its file-naming convention. And the technical line: camera model, picture profile, frame rate, plus any LUT or approved grade. The last item is the one most often missing, and it is the one that decides whether the opening assembly arrives looking like the studio's work or like somebody's guess at it.",
      ],
    },
    {
      heading: "Who talks to whom while the edit is running?",
      paragraphs: [
        "The studio does. The end client's relationship stays with the studio that sold the job, so notes travel through one named contact there rather than arriving from several directions. That is not a preference about tidiness: on subcontracted work every note has already been filtered through the client and the studio, and two versions of the same instruction arriving separately costs a full pass over the timeline.",
        "The practical shape is one consolidated list per round, with timecodes, and an agreement about how many rounds the job includes before it starts. On the delivery side the files are unbranded and unwatermarked, and the work is not published as a public reference unless the studio says so. Whether the end client is told that post-production is subcontracted is the studio's call to make, and nothing in the files makes it for them.",
      ],
    },
  ],
};

export const SALON_DEEP_DIVE: DeepDive = {
  id: "salon-capture",
  title: "How does a salon film between clients without slowing the day?",
  destinations: "A repeatable filming spot, the three shapes that work, and client permission.",
  sections: [
    {
      heading: "Where in the room should the camera live?",
      paragraphs: [
        "In one chosen place, every time. Picking a single station and a single camera position turns filming from a decision into a habit, and it is also what makes a before and after comparable, since the only thing that should change between the two shots is the hair.",
        "The place to pick is the one with the most consistent light. A station near a window gives flattering light but changes colour through the day, and it fights the warm bulbs overhead; a station lit mainly by the room's own fixtures is less pretty but repeatable. Either works, as long as one is chosen and the white balance is set for it rather than left to the camera to guess. A phone braced on a shelf or clamped to a mirror at roughly chest height is steadier than any handheld shot and does not need a crew member to hold it.",
      ],
    },
    {
      heading: "What are the three shapes worth filming every week?",
      paragraphs: [
        "The transformation, the detail, and the explanation. The transformation is two shots from the same position, one before anything starts and one at the reveal, with two or three short working moments in between. The detail is the macro shot: a nail finish, a fade line, a curl pattern, filmed with the subject braced because depth of focus at that distance is thin and hands move.",
        "The explanation is a stylist saying one useful thing to camera — why a tone was chosen, how to keep it at home, what to ask for next time. Each shape takes under a minute of a working day and none of them needs the shop closed. The one non-negotiable is permission: a client in the chair has not agreed to appear on a business account by sitting down, so ask before filming and send a note of who said yes along with the clips.",
      ],
    },
  ],
};

export const AUTO_DETAILING_DEEP_DIVE: DeepDive = {
  id: "detailing-capture",
  title: "How do you make paint, tint and vinyl read on screen?",
  destinations: "Controlling the reflection, repeatable before and afters, and claim discipline.",
  sections: [
    {
      heading: "How is the reflection controlled in a working bay?",
      paragraphs: [
        "By deciding what the paint is allowed to see. A finished panel is a mirror, so a shot of a car in a cluttered bay is a shot of the clutter. Rolling the car to a spot facing an open sky, a plain wall, or a closed roll-up door changes the image more than any adjustment made afterwards.",
        "The second control is the light. Broad overhead fixtures wrap a panel evenly, which is why swirl marks and holograms vanish on camera even though they are obvious in person. A single hard light, or low-angle sun, raked across the surface brings the defects back for the before shot — and the same technique after the correction is what makes the finish look deep rather than flat. Both shots want the same treatment, because a comparison where only the lighting changed is not a comparison.",
      ],
    },
    {
      heading: "What stays out of a detailing or tint video?",
      paragraphs: [
        "Performance numbers that belong to somebody else. Heat rejection figures, UV ratings and durability spans are the film or coating manufacturer's claims, and a shop repeating them in its own voice is standing behind data it did not generate. The safer and more convincing route is to show what the camera can actually record: an installed edge at a clean cut line, the view from inside a treated window against an untreated one, water behaving differently on a coated panel.",
        "The same discipline applies to the before and after. A comparison is honest when the camera position, height, distance and light match, and it quietly stops being honest when the after is shot in better light. Marking the filming position on the floor is a small habit that keeps every car that comes through the bay into usable material, and keeps the claim inside what the footage shows.",
      ],
    },
  ],
};

const localPresence = PACKAGE_PRICES["presencia-local"];
// Owner-set "from" price; a "custom" package would have no figure to print.
const localPresenceFrom = localPresence.kind === "from" ? usd(localPresence.amount) : "a custom quote";

/**
 * Corporate event page. Figures are imported from lib/pricing.ts; the proof is
 * the Diana & Jack film exactly as messages/en.json describes it. No capture
 * technique is claimed that the site does not already publish.
 */
export const CORPORATE_EVENT_DEEP_DIVE: DeepDive = {
  id: "corporate-event-details",
  title: "How much does event video cost, and what should a quote include?",
  destinations: "Editing and on-location ranges, urgent delivery, and a published event film to compare.",
  sections: [
        {
          heading: "How much does event videography cost in Miami?",
          paragraphs: [
            `For corporate or event material, the calculator's corporate editing band is ${usd(PRICING_BANDS.corporate.baseMin)}–${usd(PRICING_BANDS.corporate.baseMax)}. It is an indicative editing-led freelancer range with an introductory discount applied, not a promise of complete event coverage. If another videographer or your team already recorded the event, share the original material and explain the finished piece you want before treating that range as a quote.`,
            "A short recap, a speaker presentation, and a longer event film require different editorial decisions. Specify which moments matter, whether dialogue must remain complete, and where the finished video will be published. The amount and condition of the source material also need review. Capture and editing can be discussed together, with the actual deliverables agreed for your event.",
          ],
        },
        {
          heading: "How should you budget for filming at the venue?",
          paragraphs: [
            `[Local Presence](/pricing/local-presence) starts from ${localPresenceFrom} per production day. The separate half-day capture add-on has an indicative range of ${usd(PRICING_BANDS["on-location"].baseMin)}–${usd(PRICING_BANDS["on-location"].baseMax)} on the same discounted freelancer basis. These are different ways to scope work; do not add them together or assume either covers the entire event without checking the proposal. Full-crew production companies use a different model.`,
            "Send the venue, schedule, access arrangements, and the parts of the event that must be recorded. Explain whether speeches, audience reactions, interviews, or venue details are priorities. If activities overlap, flag that before coverage is agreed. Ask the quote to identify filming, sound requirements, editing, final versions, and any separately priced needs. An event date and a package starting price alone cannot establish the coverage or availability for your specific booking.",
          ],
        },
        {
          heading: "How does an urgent delivery request change the estimate?",
          paragraphs: [
            `The calculator applies an express multiplier of ${EXPRESS_MULTIPLIER} to its estimate when express delivery is selected. That is a budgeting adjustment, not a guaranteed delivery window or confirmation that an urgent request can be accepted. Tell Esteban the date you need the finished video and why that date matters before making plans around a fast edit.`,
            "Separate the event date from the requested publication date. Identify whether you need a recap first, a complete presentation, or different versions for different audiences, and name the person who can approve the work. Delayed assets or feedback can affect the schedule you are trying to arrange. Use the [budget calculator](/calculator) to compare the indicative options, then request written confirmation through [contact](/contact). The agreed scope should state the timing and review expectations for your actual event.",
          ],
        },
        {
          heading: "What does a published event film tell you before hiring?",
          paragraphs: [
            "The [Diana & Jack project](/portfolio/diana-jack) is a wedding film shot in Boston, Massachusetts. The published credits name Esteban as videographer and editor, with a full film and a highlight trailer. This is relevant event work to review, but it is not a Miami corporate-event case study and does not establish a current event price, venue relationship, or identical package for another client.",
            "Use it to discuss how you want the day represented and whether you need both an extended film and a shorter piece. Share the moments that matter most, the audience, and any restrictions on filming or publishing. Then compare the proposed coverage and finished files against your request. A useful decision combines a relevant example with a written scope; the example alone cannot confirm availability, turnaround, or the total cost of your event.",
          ],
        },
      ],
};

// Fitness & beauty cost answers (2026-10-07). Google's AI Overview for "how much
// does a gym promo video cost in miami" cites small-studio cost pages; these
// pages answer it with the figures in lib/pricing.ts and nothing else. The
// fitness projects in the portfolio are web and AI-bot work, and say so.
const fromPrice = (price: (typeof PACKAGE_PRICES)[keyof typeof PACKAGE_PRICES]) =>
  price.kind === "from" ? usd(price.amount) : "a custom quote";
const starterFrom = fromPrice(PACKAGE_PRICES.arranque);
const growthFrom = fromPrice(PACKAGE_PRICES.crecimiento);
const weeklyEn = shortFormWeeklyText("en");
const halfDayBand = `${usd(PRICING_BANDS["on-location"].baseMin)}–${usd(PRICING_BANDS["on-location"].baseMax)}`;

export const GYM_DEEP_DIVE: DeepDive = {
  id: "gym-cost",
  title: "How much does gym and studio video cost, and what should you film first?",
  destinations: "Editing and filming prices, a monthly plan, what to film first, and the fitness work in the portfolio.",
  sections: [
    {
      heading: "How much does a gym promo video cost in Miami?",
      paragraphs: [
        `If your trainers already film on their phones, editing starts from ${starterFrom} per video on the [Starter package](/pricing/starter): remote editing, a cut formatted for Reels, TikTok, YouTube or the web, and one revision round. If the gym posts every week, the calculator prices short-form at ${weeklyEn}. Both figures are starting points, and the written quote sets the actual scope.`,
        "The price moves with three things: how much raw footage there is, how many finished versions you need (a 30-second ad and three vertical cuts are four deliverables, not one), and whether anything has to be filmed. A gym that sends organised clips and a clear brief sits at the bottom of the band. A studio that needs the shoot as well belongs in the next section.",
      ],
    },
    {
      heading: "What does it cost to film at the gym or studio?",
      paragraphs: [
        `On-site work runs through [Local Presence](/pricing/local-presence), from ${localPresenceFrom} per production day. It covers pre-production, on-location capture, post-capture editing and deliverables in the formats you need, for Fort Lauderdale, Broward and selected Miami-Dade projects. A half-day capture add-on has an indicative range of ${halfDayBand} on the same discounted basis. Do not add the two together; they are different ways of scoping the same need.`,
        "A gym shoot is easier to price when the schedule is fixed in advance: which class, which hour, which trainers, and whether members will be in frame. Quiet hours make filming faster and remove most permission questions. Send that schedule with the request, and the proposal can say exactly what will be filmed and what will be delivered.",
      ],
    },
    {
      heading: "What does a monthly content plan for a gym cost?",
      paragraphs: [
        `For a gym that wants to post every week rather than once, the [Growth plan](/pricing/growth) starts from ${growthFrom} per month. It includes a content plan, a publishing calendar, editing and a monthly report. It suits a studio that already films classes and trainers but has nobody responsible for turning those clips into a steady schedule of posts.`,
        "A monthly plan only works if footage keeps arriving. The simplest routine is one filming block a week, collected in a shared folder, with a line per clip saying who is in it and whether they agreed to appear. If you are unsure which route fits, compare them in the [budget calculator](/calculator) and then ask for a written quote through [contact](/contact).",
      ],
    },
    {
      heading: "What should a gym, trainer or pilates studio film first?",
      paragraphs: [
        "The thing a new member is nervous about. For a gym that is usually the space at a normal hour and what a first session looks like; for a personal trainer it is how a session actually runs; for a yoga or pilates studio it is the class format and the equipment. Film one of each from a fixed, steady position rather than chasing moments handheld.",
        "Two rules save most edits. First, ask before filming anyone: a member working out has not agreed to appear on a business account by walking in, so keep a note of who said yes and send it with the clips. Second, send original files straight from the phone or camera, not copies saved out of a messaging app, which have already lost detail the edit cannot restore.",
      ],
    },
    {
      heading: "Which fitness work is in Esteban's portfolio?",
      paragraphs: [
        "Two fitness coaching brands, and both are web projects, not video. [Gains From Geebs](/portfolio/gains-from-geebs) is an interactive fitness web platform with an Instagram DM bot that answers questions about training plans and nutrition and qualifies leads. [TitanForge](/portfolio/titanforge) is a web platform with a conversational AI bot for lead qualification, scheduling and client registration. They show web and lead-handling work in the fitness market, not a gym shoot.",
        "The closest filmed proof is [Healthy Smile Miami](/portfolio/healthy-smile): social-media videos for a Miami dental clinic, where Esteban filmed on location, video and sound, then edited and delivered the pieces. A working clinic and a working gym share the same constraints: real clients, limited time, and a room that cannot close for the day. Review it next to your own footage before deciding.",
      ],
    },
  ],
};

export const SALON_COST_DEEP_DIVE: DeepDive = {
  id: "salon-cost",
  title: "How much does salon and barbershop video cost in Miami?",
  destinations: "Editing from your own clips, filming in the shop, and a monthly posting plan.",
  sections: [
    {
      heading: "How much does salon or barbershop video cost in Miami?",
      paragraphs: [
        `If the shop already films transformations on a phone, editing starts from ${starterFrom} per video on the [Starter package](/pricing/starter): remote editing, vertical cuts for Reels or TikTok, and one revision round. If the shop posts every week, the calculator prices short-form at ${weeklyEn}. Both are starting points; the written quote sets the real scope.`,
        "What moves the number is volume and order. A week of before, during and reveal clips, filmed from the same marked spot, edits quickly. Unlabelled clips from several stations, in mixed light, take longer, because colour has to be matched before the cut can even start. A note of which clients agreed to appear is part of the brief, not an extra.",
      ],
    },
    {
      heading: "What does filming inside the salon cost?",
      paragraphs: [
        `When the shop wants someone to come and film, [Local Presence](/pricing/local-presence) starts from ${localPresenceFrom} per production day and includes pre-production, on-location capture, post-capture editing and deliverables in the formats you need, in Fort Lauderdale, Broward and selected Miami-Dade projects. A half-day capture add-on has an indicative range of ${halfDayBand} on the same basis; the two are alternatives, not a sum.`,
        "A salon shoot goes faster when it is booked around the appointment book rather than against it. Pick a block when a stylist or barber has a willing client, a chair near consistent light, and a few minutes free for one useful line to camera. Send that plan with the request so the proposal can state what will be filmed and delivered.",
      ],
    },
    {
      heading: "What does a monthly posting plan for a salon cost?",
      paragraphs: [
        `The [Growth plan](/pricing/growth) starts from ${growthFrom} per month and includes a content plan, a publishing calendar, editing and a monthly report. It fits a salon or barbershop that films every week but has nobody responsible for turning the clips into a steady posting schedule, and that would rather spend the time with clients in the chair.`,
        "The plan depends on footage arriving on time. A shared folder, one filming block a week, and a line per clip saying which service it shows and who agreed to appear is usually enough. Nail studios should add the close-ups separately, braced so they are sharp. Compare the options in the [budget calculator](/calculator) before asking for a written quote through [contact](/contact).",
      ],
    },
  ],
};

export const SPA_DEEP_DIVE: DeepDive = {
  id: "spa-cost",
  title: "How much does spa video cost, and how do you film without guests?",
  destinations: "Editing and filming prices, filming the place instead of the people, and a monthly plan.",
  sections: [
    {
      heading: "How much does a spa promotional video cost in Miami?",
      paragraphs: [
        `Editing footage the spa already has starts from ${starterFrom} per video on the [Starter package](/pricing/starter), with the cut formatted for Reels, TikTok, YouTube or the web and one revision round. If the spa posts every week, the calculator prices short-form at ${weeklyEn}. Both are starting points, and the written quote sets the scope.`,
        "A spa promo usually needs less footage than people expect and more care in the edit: slower pacing, steady shots of rooms, water, textures and light, and sound that does not jar. The number moves with how many versions you need (a website header, a vertical post and a short ad are three deliverables) and with whether anything has to be filmed.",
      ],
    },
    {
      heading: "What does filming at the spa cost?",
      paragraphs: [
        `On-site filming runs through [Local Presence](/pricing/local-presence), from ${localPresenceFrom} per production day: pre-production, on-location capture, post-capture editing and deliverables in the formats you need, for Fort Lauderdale, Broward and selected Miami-Dade projects. A half-day capture add-on has an indicative range of ${halfDayBand} on the same discounted basis. They are two ways to scope the work, not amounts to add together.`,
        "Most spas are easiest to film before opening or in a quiet block between bookings, when rooms are set and nobody is waiting. Send the hours available, the rooms to show, and whether any staff member will speak to camera. The proposal can then state what will be filmed, what will be delivered, and what stays out of frame.",
      ],
    },
    {
      heading: "How does a spa film without showing guests?",
      paragraphs: [
        "By filming the place and the preparation instead of the people. Empty treatment rooms, water, folded linens, products on a shelf and a therapist's hands setting up a table all say what a visit feels like without putting a guest on a business account. Shot from a steady position in consistent light, those clips stay usable across months of posts.",
        "When a person does appear, it should be staff or someone who agreed in advance, never a guest who happened to walk past. Ask before filming, keep a note of who said yes, and send it with the clips. Send original files from the phone or camera rather than copies saved from a messaging app, which have already lost detail the edit cannot restore.",
      ],
    },
    {
      heading: "What does a monthly content plan for a spa cost?",
      paragraphs: [
        `The [Growth plan](/pricing/growth) starts from ${growthFrom} per month and includes a content plan, a publishing calendar, editing and a monthly report. It suits a spa or wellness centre that wants a steady posting schedule but has nobody responsible for it, and that can supply new footage every week or two.`,
        "Seasonal treatments, a refreshed room or a new team member give the calendar something new to say, and the same quiet room footage can carry it in between. Compare the routes in the [budget calculator](/calculator), then ask for a written quote through [contact](/contact) that states what is filmed, edited and delivered each month, so nothing is assumed on either side.",
      ],
    },
  ],
};
