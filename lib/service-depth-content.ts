import type { CraftCard, RelatedService, ServiceFaq } from "@/components/service-depth";

/**
 * The vertical-specific depth for the pilot pages.
 *
 * WHAT MAKES THIS DIFFERENT FROM THE TEMPLATE IT REPLACES. The dead pages say
 * the same four things about every industry with the noun swapped — "high-quality
 * educational videos", "polished 9:16 social videos". Each entry below says
 * something that is true of THAT vertical and false or irrelevant for the others:
 * a dental clinic's binding constraint is written patient authorisation before an
 * identifiable face is published; a yacht charter's is a moving horizon and salt
 * spray; a med spa's is that a before/after is only honest if the lighting and
 * angle are the same shot twice.
 *
 * CLAIM DISCIPLINE. Nothing here invents a statistic, a testimonial, a turnaround
 * time, a price, or a result — app/__tests__/service-depth.test.ts fails on any of
 * them. Two regulatory facts are named because they are established and they are
 * the single most useful thing a prospect in that vertical can be told:
 *
 *   - HIPAA requires a patient's written authorisation before identifiable
 *     images or footage are used in marketing. This is why a dental shoot plans
 *     consent before it plans shots.
 *   - The FTC's endorsement rules require that a testimonial not misrepresent
 *     what a typical customer will experience.
 *
 * Both are stated as what the business must handle, never as a promise that
 * Esteban provides legal advice or clearance. Anything narrower than that — a
 * specific Florida board rule, a named retention period — is deliberately absent,
 * because it was not verified and a confident wrong regulatory detail on a
 * client's page is worse than no detail.
 *
 * NO SHARED PHRASING BETWEEN VERTICALS. The test compares 8-word runs across the
 * three, which is the same measure the diagnosis used. It caught six shared runs
 * in the first draft of this file — the template disease reappearing in the fix
 * for it — and those were rewritten rather than the test loosened.
 */

type Depth = {
  craftHeading: string;
  craft: readonly CraftCard[];
  faqHeading: string;
  faqs: readonly ServiceFaq[];
  relatedHeading: string;
  related: readonly RelatedService[];
};

export const DENTAL_DEPTH: Depth = {
  craftHeading: "What dental footage needs that other footage does not.",
  craft: [
    {
      title: "Consent before shots",
      detail:
        "A patient's face, mouth, and treatment are identifiable health information, and HIPAA requires their written authorisation before any of it is used in marketing. That is a scheduling question, not an editing one: the clip that cannot be released is the one filmed without it. Clinics that decide consent first tend to end up with usable footage of real patients; clinics that decide it last end up with staff-only b-roll.",
    },
    {
      title: "Before and after, honestly",
      detail:
        "A smile comparison only means anything if it is the same shot twice — same distance, same lens, same light, same head angle, teeth at the same moisture. Change any one of those and the difference on screen is partly the camera, which is both misleading and obvious to a viewer. Matching the second frame to the first is easier at capture than in post, so it is worth a note on the chart.",
    },
    {
      title: "Close enough to see",
      detail:
        "Treatment explainers live or die on whether the viewer can see the thing being described. That means close focus on the tooth, aligner, or model rather than a wide shot of a room, and it means the overhead light is doing the work instead of a window behind the chair. Intraoral and model footage cuts well against a dentist speaking; a wide operatory shot cuts against nothing.",
    },
  ],
  faqHeading: "Practical answers before a dental clinic shares footage.",
  faqs: [
    {
      question: "Do we need patient consent before sending dental footage?",
      answer:
        "Yes, for any footage where a patient is identifiable. HIPAA requires the patient's written authorisation before identifiable images or video are used for marketing, and the clinic holds that authorisation — it is not something an editor can obtain afterwards. Footage of staff, the clinic, equipment, models, and anonymised close-ups that show no identifying features does not raise the same question. Sending a note about which clips are cleared avoids an edit being built around a shot that cannot be published.",
    },
    {
      question: "What can a dental clinic film without a dedicated shoot?",
      answer:
        "A phone on a small tripod covers most of it: the dentist explaining one treatment to camera, a close shot of an aligner or model being handled, the room and team, and a patient's own words where authorisation exists. The two things worth controlling are light on the subject's face rather than behind them, and a quiet moment for audio — a suction unit running under a voiceover is the most common reason a usable take is unusable.",
    },
    {
      question: "How are treatment explainers structured for short-form video?",
      answer:
        "One treatment per video, named in the first line, because a viewer searching for clear aligners does not stay for a general practice overview. From there the sequence is usually the question a patient actually asks, the answer in plain language, and what happens at the appointment — with the visual carrying whatever the words describe. A clinic-supplied next step at the end gives the video somewhere to send the viewer.",
    },
    {
      question: "Can before-and-after comparisons be used in dental advertising?",
      answer:
        "They can when the clinic has the patient's authorisation and the comparison is not presented in a way that implies a typical result it cannot support. The practical constraint is photographic: the two frames must match in framing, lighting, and angle, or the difference partly belongs to the camera. Clinics with a repeatable capture setup get comparisons that hold up; ad-hoc phone snaps usually do not match well enough to use.",
    },
  ],
  relatedHeading: "Related services for healthcare and clinic video.",
  related: [
    {
      title: "Cosmetic Dentistry Video",
      detail: "Video marketing focused on cosmetic and elective dental treatments.",
      href: "/services/cosmetic-dentistry-video-marketing-miami",
    },
    {
      title: "Med Spa Video Marketing",
      detail: "Aesthetic treatments, where the before/after has to survive the same scrutiny.",
      href: "/services/med-spa-video-marketing-south-florida",
    },
    {
      title: "Short-Form Video Editing",
      detail: "Editing supplied footage into vertical social video with captions.",
      href: "/services/short-form-video-editor-miami",
    },
  ],
};

export const YACHT_DEPTH: Depth = {
  craftHeading: "What filming on the water actually demands.",
  craft: [
    {
      title: "A horizon that stays level",
      detail:
        "Everything the camera is standing on is moving, and a tilting horizon reads as amateur faster than almost any other flaw — viewers forgive soft focus and do not forgive a sloping sea. On deck that means a gimbal and a deliberately level reference; in the edit it means stabilisation and rotation applied before anything is cropped, because cropping first throws away the margin the correction needs.",
    },
    {
      title: "Exposing for water",
      detail:
        "Open water is a mirror, so a charter's two subjects — a bright hull and a shaded cockpit — are several stops apart in the same frame. Highlights that clip on white fibreglass cannot be recovered, so it is worth protecting them at capture and lifting the shadows afterwards. Early morning and the last hour of light give a usable range; midday sun overhead gives hard shadows on faces and a blown deck.",
    },
    {
      title: "Salt, spray, and one take",
      detail:
        "A lens flecked with dried salt spray softens every shot after it, and nobody notices on a phone screen in the sun. Charter footage also tends to be genuinely unrepeatable: the guests, the light, and the anchorage happen once. That is the argument for a lens cloth within reach and for shooting a second safety take of anything that matters, rather than for any particular camera.",
    },
  ],
  faqHeading: "Practical answers before a charter operator shares footage.",
  faqs: [
    {
      question: "What footage do charter operators usually already have?",
      answer:
        "Most have more than they think: phone clips from guests and crew, drone footage from a previous season, walkthroughs filmed for a listing, and stills from a broker's photographer. Bringing it together is usually a better first step than booking a shoot, because a charter's strongest material — a real day on the water with real guests — is the hardest thing to stage and the easiest thing to have accidentally captured.",
    },
    {
      question: "Does drone footage need anything special for charter video?",
      answer:
        "The useful distinction is between footage that shows the vessel and footage that shows the experience. A high orbit establishes the boat and looks like every other charter video; a lower pass that keeps the water moving past the hull, or a pull-back from guests on the bow, shows what the day feels like. Launching and recovering from a moving deck is its own problem, and plenty of operators find it easier to get their aerials while at anchor.",
    },
    {
      question: "How long should a charter marketing video be?",
      answer:
        "It depends where it is going, and it is usually two different edits rather than one. A listing or website benefits from a longer piece that covers the vessel, the spaces, and the crew in order. Social placements want the single most immediate moment first — water, a jump, a pour, a view — with the vessel's name and the booking route supplied by the operator at the end. Cutting one long edit down rarely produces a strong short one.",
    },
    {
      question: "Can guests appear in charter marketing footage?",
      answer:
        "Only with their permission, and it is worth asking before the day rather than after. Charter guests have a reasonable expectation of privacy and some book precisely for it, so the operator's own permission for the vessel does not extend to the people aboard. Crew, empty interiors, the water, and wide shots where nobody is identifiable carry none of that difficulty and cover most of what a promotional edit needs.",
    },
  ],
  relatedHeading: "Related services for marine and hospitality video.",
  related: [
    {
      title: "Yacht & Hospitality Video",
      detail: "Video production for yacht and hospitality brands in Fort Lauderdale.",
      href: "/services/yacht-hospitality-video-fort-lauderdale",
    },
    {
      title: "Hotel & Hospitality Video",
      detail: "Rooms, grounds and service filmed around guests who booked for privacy.",
      href: "/services/hotel-hospitality-video-production-miami",
    },
    {
      title: "Drone Video Editing",
      detail: "Editing supplied aerial footage, including stabilisation and grading.",
      href: "/services/drone-video-editing-service-miami",
    },
  ],
};

export const MED_SPA_DEPTH: Depth = {
  craftHeading: "What med spa footage has to get right.",
  craft: [
    {
      title: "The same shot twice",
      detail:
        "A before and after is a measurement, and it is only a measurement if nothing but the client changed. Same distance, same focal length, same light from the same direction, same expression, no makeup difference. A softer light or a half-step closer flatters the second frame on its own, which a viewer reads as the treatment — and a comparison that oversells is a liability rather than an asset.",
    },
    {
      title: "Skin that looks like skin",
      detail:
        "Most of what a med spa sells is texture and tone, and both are the first things lost to heavy smoothing or a saturated grade. Retouching a result until it is flawless removes the evidence that anything was treated. Even, soft, frontal light shows real texture; a hard overhead source invents shadows in exactly the places a treatment is supposed to have changed.",
    },
    {
      title: "Treatment, not procedure",
      detail:
        "Footage of a needle, a cannula, or a device on skin makes a portion of the audience close the video, and it is rarely the part that persuades. The persuasive material is the consultation, the room, the practitioner explaining what happens and how it feels, and the result. Keeping the clinical close-ups short and non-graphic tends to hold more viewers than showing the procedure in full.",
    },
  ],
  faqHeading: "Practical answers before a med spa shares footage.",
  faqs: [
    {
      question: "What are the rules on before-and-after content for a med spa?",
      answer:
        "The client's written authorisation comes first for any identifiable footage, and the comparison itself must not imply a result that a typical client would not get — the FTC's endorsement rules treat a testimonial that misrepresents typical experience as deceptive. In practice that means the business decides what it can substantiate and what disclosure belongs on screen. An editor can place that text legibly and keep the two frames honest, but the claim and its substantiation stay with the practice.",
    },
    {
      question: "How should a med spa capture comparable before and after footage?",
      answer:
        "Fix the setup once and reuse it: a marked spot for the client to stand, the same lens at the same distance, the same light in the same position, no makeup on either visit, and a neutral expression. Photographing the first frame is the easy half; the discipline is repeating it weeks later. Practices that write the setup down get comparisons they can use, and those that improvise generally get two images that cannot fairly be placed side by side.",
    },
    {
      question: "What can a med spa film without a dedicated production day?",
      answer:
        "A phone handles the room, the arrival, the devices, a practitioner walking through one treatment, and an authorised client describing their experience. Two things are worth setting up deliberately: light that falls on the face from the front instead of an overhead downlight, which is what makes skin read as skin, and a room quiet enough that a voice does not compete with an air handler. Naming a single treatment at the start keeps each clip usable for something specific.",
    },
    {
      question: "Can client testimonials be used in med spa video?",
      answer:
        "Yes, with the client's written authorisation, and worth keeping in their own words — a scripted testimonial reads as scripted, and an unscripted one is the more persuasive asset anyway. Where a client describes a result, the practice decides what it can support and whether a disclosure about typical results belongs on screen. Editing can keep the quote intact and readable rather than trimming it into something the client did not say.",
    },
  ],
  relatedHeading: "Related services for aesthetic and wellness video.",
  related: [
    {
      title: "Plastic Surgery Video",
      detail: "Surgical practices, where the claim and its substantiation carry the most weight.",
      href: "/services/plastic-surgery-video-marketing-miami",
    },
    {
      title: "Wellness & Spa Video",
      detail: "Video marketing for wellness and spa businesses in South Florida.",
      href: "/services/wellness-spa-video-marketing-miami",
    },
    {
      title: "Dental Video Marketing",
      detail: "Clinical video where written authorisation governs every identifiable frame.",
      href: "/services/dental-video-marketing-south-florida",
    },
  ],
};
