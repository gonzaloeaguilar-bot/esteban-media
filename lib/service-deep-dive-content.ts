import type { DeepDiveSection } from "@/components/service-depth";
import {
  EXPRESS_MULTIPLIER,
  PACKAGE_PRICES,
  PRICING_BANDS,
  VOLUME_MULTIPLIERS,
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

const starterPrice = PACKAGE_PRICES.arranque;
const starterFrom = starterPrice.kind === "from" ? usd(starterPrice.amount) : "a custom quote";
const socialBand = PRICING_BANDS.social;
const youtubeBand = PRICING_BANDS.youtube;
const monthly15Mult = VOLUME_MULTIPLIERS["monthly-15"];
const monthlyMin = usd(Math.round((socialBand.baseMin * monthly15Mult.multMin) / 25) * 25);
const monthlyMax = usd(Math.round((socialBand.baseMax * monthly15Mult.multMax) / 25) * 25);

export const WHITE_LABEL_DEEP_DIVE: DeepDive = {
  id: "white-label-workflow",
  title: "What does a white-label edit cost, and how does it fit a studio's delivery?",
  destinations: "Prices, published agency work, the handoff package, and how revisions run.",
  sections: [
    {
      heading: "How much does white-label video editing cost?",
      paragraphs: [
        `Esteban's [Starter package](/pricing/starter), remote editing of footage you already have, starts from ${starterFrom} per project with one revision round included. For a scoped estimate, the calculator's short-form band is ${usd(socialBand.baseMin)}–${usd(socialBand.baseMax)} per project and its YouTube band is ${usd(youtubeBand.baseMin)}–${usd(youtubeBand.baseMax)} per edit. Both are editing-led freelancer ranges with a 10% introductory discount, checked against published market rates of ${usd(socialBand.marketMin)}–${usd(socialBand.marketMax)} and ${usd(youtubeBand.marketMin)}–${usd(youtubeBand.marketMax)}.`,
        `A studio sending regular volume can price 15 short-form videos a month at ${monthlyMin}–${monthlyMax} in the same calculator. None of these is a quote. The price of a white-label job is set once Esteban has seen the footage, the deliverable list and the number of revision rounds the studio sold to its own client, so send one representative project first and price the rest from it.`,
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
