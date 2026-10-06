import type { DeepDiveSection } from "@/components/service-depth";

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

export const WHITE_LABEL_DEEP_DIVE: DeepDive = {
  id: "white-label-workflow",
  title: "How does a white-label edit fit into a studio's existing delivery?",
  destinations: "The handoff package, colour and camera detail, and how revisions run.",
  sections: [
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
