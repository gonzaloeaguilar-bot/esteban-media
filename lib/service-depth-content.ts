import type { CraftCard, RelatedService, ServiceFaq } from "@/components/service-depth";
import { priceSentence } from "@/lib/packages";

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

export const YACHT_HOSPITALITY_DEPTH: Depth = {
  craftHeading: "What yacht hospitality footage has to show clearly.",
  craft: [
    {
      title: "The vessel and the experience",
      detail:
        "A yacht promo has two jobs at once: show the boat accurately and make the day feel desirable. Wide exterior passes establish the vessel, but the useful booking material is often closer — guests boarding, towels, catering, shaded seating, clean cabins, and the water moving past the hull. The edit has to connect those details without turning the vessel into a vague lifestyle montage.",
    },
    {
      title: "Water, wind, and usable sound",
      detail:
        "Open-water footage usually arrives with wind bursts, motor rumble, and uneven dialogue. The safest edit treats onboard sound as texture unless a voice is clear enough to carry meaning. Music, wave ambience, and short natural sound moments can support the luxury feeling, but they should not hide a noisy recording that the viewer needs to understand.",
    },
    {
      title: "Luxury pacing without hiding facts",
      detail:
        "A charter edit can feel polished and still answer practical questions: vessel name, layout, passenger experience, location, and the booking route. Slow shots help interiors and deck spaces breathe; faster cuts help water sports, drone passes, and arrival moments. The final piece should make the offer easier to inspect, not just make the footage prettier.",
    },
  ],
  faqHeading: "Practical answers before sharing yacht hospitality footage.",
  faqs: [
    {
      question: "What footage can a yacht charter or marine broker provide for video editing?",
      answer:
        "Useful material can include drone sweeps, cabin walkthroughs, dockside arrivals, cruising footage, wake sports, guest hospitality moments, catering, crew details, captain commentary, and still photos from a broker or prior shoot. The best folder also includes the vessel name, specs that are safe to publish, brand assets, booking contact details, and any shots that must not be used. That gives the edit a clear commercial purpose instead of becoming a general recap of a nice day on the water.",
    },
    {
      question: "How do you manage wind noise, water splash, and engine roar in marine footage?",
      answer:
        "Marine recordings often include wind, engines, dock noise, and music from the day itself. Dialogue can sometimes be cleaned with noise reduction and EQ, but not every clip can become a voice-led asset. When sound is not usable, the edit can lean on music, wave ambience, short natural sound accents, and clear on-screen text. The important decision is made early: which clips need intelligible speech, and which only need to create atmosphere.",
    },
    {
      question: "Can drone aerial footage be color graded and stabilized for yacht promos?",
      answer:
        "Yes, supplied aerial footage can be stabilized, leveled, trimmed, and color graded so the water, hull, teak, upholstery, and sky feel consistent across the edit. The limits depend on the original file: a clipped white hull, a tilted horizon with no crop room, or heavily compressed social downloads leave less room for repair. Original drone files are much better than reposted clips because they preserve detail in water highlights and shaded deck areas.",
    },
    {
      question: "Do you deliver multi-format cuts for social media and website listings?",
      answer:
        "A yacht project often needs more than one output. A website or broker listing may use a calmer 16:9 edit that explains the vessel and onboard experience, while Instagram Reels, TikTok, or Shorts need a vertical cut that opens with the strongest moving-water or hospitality moment. Safe zones matter because vessel names, booking lines, and platform controls can collide on a phone. Planning those placements before export prevents text from covering the boat.",
    },
    {
      question: "How does the file transfer and revision workflow work for marine video projects?",
      answer:
        "Raw footage can be shared through a cloud folder with notes by clip, route, or scene. Revisions are organized around timing, color, sound, and version needs so the final assets stay ready for brokers, charter teams, hospitality operators, and remote stakeholders.",
    },
  ],
  relatedHeading: "Related services and guides for yacht and hospitality media.",
  related: [
    {
      title: "Yacht Charter Video Marketing",
      detail: "Marine charter promos, deck walkthroughs, and open-water lifestyle edits.",
      href: "/services/yacht-charter-video-marketing-miami",
    },
    {
      title: "Drone Video Editing",
      detail: "Stabilization and color grading for supplied coastal and aerial footage.",
      href: "/services/drone-video-editing-service-miami",
    },
    {
      title: "Remote Editing Handoff",
      detail: "How to organize vessel clips, drone files, audio, and brand assets.",
      href: "/guides/remote-video-editing-handoff",
    },
    {
      title: "Drone Video Editing Guidelines",
      detail: "Prepare aerial footage so edits feel cinematic, compliant, and clear.",
      href: "/guides/drone-video-editing-guidelines-florida",
    },
    {
      title: "Short-Form Video Editing",
      detail: "Shape vertical clips for launches, listings, events, and social campaigns.",
      href: "/services/short-form-video-editor-miami",
    },
    {
      title: "Restaurant Promo Video Editing",
      detail: "Package hospitality footage into polished cuts for dining and venue promotion.",
      href: "/services/restaurant-promo-video-editing-miami",
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

export const SHORT_FORM_DEPTH: Depth = {
  craftHeading: "What short-form editing has to decide before the first cut.",
  craft: [
    {
      title: "One hook per export",
      detail:
        "A strong short-form edit is not just a trimmed long video. The first seconds need one clear reason to keep watching: a result, a question, a contradiction, or a visual moment that already proves the topic. When the raw footage includes several possible hooks, each finished version should choose one instead of stacking them into a crowded opening.",
    },
    {
      title: "Captions that do work",
      detail:
        "Captions carry the message when the viewer has sound off, but they can also make the edit feel heavy. The useful version highlights the spoken idea, keeps line breaks readable on a phone, and leaves room for the platform interface. A caption style should support pace and clarity, not become another moving object competing with the footage.",
    },
    {
      title: "Platform-safe rhythm",
      detail:
        "Reels, TikTok, and Shorts all reward quick understanding, but the same cut does not always fit each placement. The edit has to account for vertical framing, text-safe areas, end cards, and whether the clip needs a clean loop. That is why raw footage should be delivered with the intended platforms named before editing begins.",
    },
  ],
  faqHeading: "Practical answers before sending short-form footage.",
  faqs: [
    {
      question: "What should I send for a short-form video edit?",
      answer:
        "Send the original files when possible, not only compressed social downloads. Include the intended platform, the main message, any must-use clip, brand assets, music direction if you have one, and examples of pacing you like. A note explaining what should happen after the viewer watches is also useful, because the ending changes if the goal is a booking, a product page, a DM, or a simple awareness post.",
    },
    {
      question: "Can one set of raw clips become multiple reels?",
      answer:
        "Yes, when the footage contains more than one clear idea. A talking clip can become a direct answer, a myth-versus-fact edit, and a fast quote highlight if each version has its own hook and ending. What usually does not work is exporting the same timeline with three different captions and calling it a batch; the viewer sees the same video three times, and the content starts to feel recycled.",
    },
    {
      question: "How do revisions work for short-form content?",
      answer:
        "The cleanest review is consolidated feedback on one draft: timestamp the exact line, caption, shot, or pacing moment you want changed. Revision scope depends on the project, but the important habit is separating factual corrections from creative preferences. If the message is wrong, it should be fixed directly. If the edit needs a different style, references help more than a long list of abstract adjectives.",
    },
    {
      question: "When is short-form editing remote instead of local production?",
      answer:
        "It is remote when the useful footage already exists or can be captured by your team on a phone, camera, screen recording, or creator setup. Local production becomes relevant when the idea depends on camera direction, lighting, location access, or a specific shot list that cannot be captured casually. Many businesses start remote because it proves the content angle before a larger production day is planned.",
    },
  ],
  relatedHeading: "Related services for social video output.",
  related: [
    {
      title: "Content Repurposing",
      detail: "Turn one long video, podcast or shoot into a set of short social clips.",
      href: "/services/content-repurposing-service-miami",
    },
    {
      title: "TikTok Ad Video Editor",
      detail: "Direct-response vertical ads built from supplied creator or product footage.",
      href: "/services/tiktok-ad-video-editor-miami",
    },
    {
      title: "Remote Editing Handoff",
      detail: "A practical guide for organizing files before you send them.",
      href: "/guides/remote-video-editing-handoff",
    },
  ],
};

export const AI_PRODUCT_DEPTH: Depth = {
  craftHeading: "What AI product photography must keep truthful.",
  craft: [
    {
      title: "Reference first",
      detail:
        "AI product visuals work best when the real product photo is treated as the source of truth. The label, color, proportions, texture, and logo placement need to survive the scene change. If the generated background makes the product look better but changes what a buyer will receive, the image has become a product claim rather than a marketing asset.",
    },
    {
      title: "Use AI for context",
      detail:
        "The safer use is building lifestyle context around a product: counter surfaces, seasonal environments, simple props, and ad concepts that help a shopper understand where the item belongs. It is less safe to invent packaging text, change reflective details, or make a product appear larger or smaller than it is. The workflow should separate creative exploration from final commerce images.",
    },
    {
      title: "Commerce-ready crops",
      detail:
        "Product visuals often need more than one output: marketplace-friendly product images, lifestyle crops for ads, square social posts, and vertical story placements. The image has to be composed with those crops in mind from the start. A dramatic horizontal concept can fail if the product or label disappears once the image is cut for a phone screen.",
    },
  ],
  faqHeading: "Practical answers before starting an AI product image project.",
  faqs: [
    {
      question: "What product files should I send for AI product photography?",
      answer:
        "Send clear reference photos from several angles, any existing product photos you already use, logo or label files when available, and notes about colors that must stay accurate. If the product has packaging text, ingredients, legal copy, or reflective surfaces, call those out before the first concept is made. The more exact the reference, the easier it is to use AI for setting and mood without changing the item itself.",
    },
    {
      question: "When should AI product images not replace a photo shoot?",
      answer:
        "Do not use AI as the only source when the buyer needs exact proof of material, size, fit, manufacturing detail, or packaging copy. A real photo shoot is still the better foundation for products where accuracy is the selling point. AI can still help with ad concepts, background variations, and seasonal creative, but the final commerce image should not make the product look different from what arrives.",
    },
    {
      question: "Can AI product images be used for ecommerce ads?",
      answer:
        "They can, when the product remains accurate and the image does not imply features, scale, or uses that are not real. Ads usually tolerate more lifestyle context than a marketplace product listing, but the same truth rule applies: a generated setting can make the creative easier to understand, not change the actual product. Keep a folder of approved reference images so future ad variations stay consistent.",
    },
    {
      question: "How does the review process work for AI visuals?",
      answer:
        "Review starts by checking product fidelity before judging style. Confirm the label, color, shape, and any important detail first. Only then review background, lighting, crop, and mood. This order prevents a common failure where the image looks impressive but the item is no longer accurate. Consolidated notes with one approved direction are more useful than asking for many unrelated style changes at once.",
    },
  ],
  relatedHeading: "Related services for product and ecommerce visuals.",
  related: [
    {
      title: "AI Product Photo Truth Checklist",
      detail: "What to check before an AI product image goes on a store or an ad.",
      href: "/resources/ai-product-photo-truth-checklist",
    },
    {
      title: "UGC Ecommerce Video Editor",
      detail: "Creator-style product videos shaped for social and ad placements.",
      href: "/services/ugc-video-editor-ecommerce",
    },
    {
      title: "AI Product Photo Guide",
      detail: "When AI product images help and when a real shoot is still needed.",
      href: "/guides/how-to-use-ai-for-product-photography",
    },
  ],
};

export const AI_REAL_ESTATE_DEPTH: Depth = {
  craftHeading: "What real estate photo enhancement must not change.",
  craft: [
    {
      title: "Layout stays real",
      detail:
        "A listing image is a promise a buyer can inspect in person. AI can help with exposure, color, sky, and cluttered presentation, but it must not move walls, stretch rooms, remove permanent fixtures, invent views, or hide a defect that affects the property. The useful edit makes the room readable while preserving what the buyer will actually see.",
    },
    {
      title: "Windows and color matter",
      detail:
        "South Florida rooms often mix bright exterior windows with warm interior light. Enhancement should balance that range without turning walls, floors, cabinets, or views into something else. A blue sky replacement may make an exterior clearer, but a false window view is a different claim. The file review has to separate light correction from property alteration.",
    },
    {
      title: "MLS and social are different",
      detail:
        "A photo for an MLS feed and a photo for a social teaser do not need the same crop. The listing feed needs clarity and honesty first; a social crop can emphasize a feature as long as the underlying detail is real. Delivering both from the same source set avoids the common issue where a cinematic crop looks good online but fails to show the room.",
    },
  ],
  faqHeading: "Practical answers before sending listing photos.",
  faqs: [
    {
      question: "What real estate photo edits are safe to request?",
      answer:
        "Safe requests usually involve exposure balance, color correction, straightening, sky replacement where it does not change the actual view, light cleanup, and consistent crops. Requests become risky when they change what a buyer would inspect: room dimensions, permanent fixtures, flooring, ceiling condition, window views, landscaping, or anything attached to the property. If a detail matters to the sale, it should stay visible and accurate.",
    },
    {
      question: "Can AI fix dark listing photos?",
      answer:
        "AI and manual editing can often improve a dark room by lifting shadows, balancing mixed light, and reducing color casts. The limit is the source file. If a window is completely blown out or a room is severely underexposed, the edit can make the image more readable but should not invent missing detail. Sending original high-resolution files gives more room to correct light without creating a fake look.",
    },
    {
      question: "What should an agent send with property photos?",
      answer:
        "Send the original image files, the property address or neighborhood for context, the intended use, and any rules from the brokerage or listing platform. Note which photos are hero images and which are supporting rooms. If a feature must not be altered, say so directly. For social crops, include the platform and whether the image needs space for captions, logos, or a listing callout.",
    },
    {
      question: "Can edited photos be used for remote real estate marketing?",
      answer:
        "Yes, when the source files are supplied digitally and the edits preserve the real property. Remote photo enhancement is usually practical because the work depends on files, not on the editor being on site. Local capture is a separate question: if the property needs new angles, drone work, or better original photography, that has to be scoped as production instead of retouching.",
    },
  ],
  relatedHeading: "Related services for real estate media.",
  related: [
    {
      title: "Real Estate Drone Video Editing",
      detail: "Editing supplied aerial and property footage for listing and social use.",
      href: "/services/real-estate-drone-video-editing-miami",
    },
    {
      title: "Real Estate Reels Editor",
      detail: "Short-form property videos edited from listing footage for South Florida agents.",
      href: "/services/real-estate-reels-video-editor-south-florida",
    },
    {
      title: "Real Estate Pricing",
      detail: "Starting points for real estate media planning and monthly plans.",
      href: "/pricing/real-estate",
    },
  ],
};

export const ECOMMERCE_VIDEO_DEPTH: Depth = {
  craftHeading: "What ecommerce product videos need to prove quickly.",
  craft: [
    {
      title: "Show the product working",
      detail:
        "A product video has to answer the viewer's practical question before it tries to feel cinematic. Show the item in use, the hand scale, the texture, the before state, or the result. If the footage only shows beauty shots, the edit has little evidence to work with. Useful ecommerce footage includes demonstrations, close-ups, packaging, and one clear reason to buy or learn more.",
    },
    {
      title: "Keep claims tied to supplied proof",
      detail:
        "Editing can make a product easier to understand, but it should not add a performance claim the footage does not support. On-screen text works best when it names visible features, steps, or use cases. If a claim needs certification, lab support, user results, or a legal disclosure, the brand needs to provide that source before it becomes a caption or headline.",
    },
    {
      title: "Cut for the buying path",
      detail:
        "A product page, a paid ad, and a social post need different emphasis. Product pages benefit from clarity and completeness; ads need a fast hook and a single action; social posts can carry more context or story. The same raw clips can support all three, but the edit should name the placement before pacing, crop, and end card are decided.",
    },
  ],
  faqHeading: "Practical answers before sending product video footage.",
  faqs: [
    {
      question: "What footage works best for ecommerce product videos?",
      answer:
        "Send the product being used, close-ups of important details, packaging shots, any founder or creator explanation, and footage that shows scale in a hand or real environment. Include brand assets, approved product language, and the destination page or campaign. The editor can tighten, caption, and structure the story, but the strongest proof still comes from footage where the product is visibly doing the thing customers care about.",
    },
    {
      question: "Can one product shoot create several video assets?",
      answer:
        "Yes, if the source material covers more than one angle. One folder might become a product-page overview, a short ad hook, a comparison clip, and a social post focused on use. The batch works best when each export has a different job. Cutting the same timeline shorter and shorter can save time, but it rarely creates a strong set of distinct assets for a campaign.",
    },
    {
      question: "How should product claims be handled in the edit?",
      answer:
        "Provide the exact wording the brand can stand behind, along with any required disclosure or proof source. The edit can place that language clearly and keep it visible long enough to read. It should not invent phrases like fastest, safest, or best unless the brand has substantiation. If the useful message is visual, showing the product in action often says more than adding a heavier claim on screen.",
    },
    {
      question: "When does an ecommerce brand need video instead of only photos?",
      answer:
        "Video helps when motion, scale, setup, texture, use, or result changes the way a buyer understands the product. A still image can show the item; a video can show how it opens, fits, pours, installs, lights up, packs, or solves the problem. If customers keep asking the same practical question, that question is usually the first ecommerce video to make.",
    },
  ],
  relatedHeading: "Related services for ecommerce video.",
  related: [
    {
      title: "AI Product Photography",
      detail: "Product visuals and lifestyle concepts from accurate reference photos.",
      href: "/services/ai-product-photography-miami",
    },
    {
      title: "UGC Ecommerce Video Editor",
      detail: "Creator-style product videos shaped from testimonial and demo clips.",
      href: "/services/ugc-video-editor-ecommerce",
    },
    {
      title: "TikTok Ad Video Editor",
      detail: "Short-form ad edits with hook variations from supplied product footage.",
      href: "/services/tiktok-ad-video-editor-miami",
    },
  ],
};

export const UGC_ECOMMERCE_DEPTH: Depth = {
  craftHeading: "What UGC product videos need from the raw clips.",
  craft: [
    {
      title: "Keep the creator voice intact",
      detail:
        "UGC works because it feels like a person explaining the product, not a brand forcing a commercial into a selfie frame. The edit should remove dead air, sharpen the order, and add readable captions without sanding away the natural phrasing. If every sentence becomes brand copy, the finished video loses the reason a business asked for UGC in the first place.",
    },
    {
      title: "Proof before polish",
      detail:
        "The best clips are often simple: opening the package, showing the texture, reacting to use, comparing a before state, or naming the exact problem. Heavy graphics cannot replace that proof. The edit should organize the creator's footage around the useful evidence, then add product names, captions, and calls to action only where they make the message easier to follow.",
    },
    {
      title: "Versions for testing",
      detail:
        "A UGC folder usually contains several possible openings: a pain point, a result, an unboxing, a direct recommendation, or a demonstration. Those should become different versions only when the body of the video still supports the opening. A hook variation that promises one thing and then shows another wastes the creative test because the message is not coherent.",
    },
  ],
  faqHeading: "Practical answers before sending UGC product clips.",
  faqs: [
    {
      question: "What should a brand send with UGC footage?",
      answer:
        "Send the raw creator clips, approved product names, claims the brand can use, logo files if needed, and the intended placement. If the creator mentioned something that should not be used, flag it before editing begins. The editor also needs to know whether the goal is an organic social post, a paid ad, a product-page asset, or several versions from the same material.",
    },
    {
      question: "Can UGC footage be edited into paid ad variations?",
      answer:
        "Yes, when the usage rights and brand approvals are clear. The same creator footage can become multiple cuts with different hooks, captions, or end cards, but each version should stay faithful to what the creator actually showed or said. If a paid ad needs a stronger claim, discount, or offer, the brand should provide exact approved wording so the edit does not invent it.",
    },
    {
      question: "How much polish should a UGC video have?",
      answer:
        "Enough to make it easy to watch, not so much that it stops feeling direct. Cut pauses, clean audio where possible, add captions, remove confusing repeats, and use simple graphics for product names or calls to action. Avoid overbuilt motion and stock-style transitions unless the brand specifically wants a more produced ad. A good UGC edit still feels like the creator is speaking to the viewer.",
    },
    {
      question: "What makes UGC clips hard to edit?",
      answer:
        "The common problems are missing product shots, poor audio, unclear claims, and clips recorded in only one orientation when the final placement needs another. A creator can also record a strong testimonial without showing the product enough for the edit to prove the point. The best handoff includes extra b-roll, clean room tone if available, and one note describing the exact message the brand wants the viewer to remember.",
    },
  ],
  relatedHeading: "Related services for creator-style product video.",
  related: [
    {
      title: "AI Product Photography",
      detail: "Product images for stores and ads, built from real product references.",
      href: "/services/ai-product-photography-miami",
    },
    {
      title: "Content Repurposing",
      detail: "Turn one long video, podcast or shoot into a set of short social clips.",
      href: "/services/content-repurposing-service-miami",
    },
    {
      title: "Remote Editing Handoff",
      detail: "How to organize raw clips before sending them to an editor.",
      href: "/guides/remote-video-editing-handoff",
    },
  ],
};

export const SOCIAL_BATCHING_DEPTH: Depth = {
  craftHeading: "What turns a content folder into a useful batch.",
  craft: [
    {
      title: "One batch, many jobs",
      detail:
        "A useful batch is not a pile of similar posts. It should cover different jobs: answer a common question, show proof, explain a process, handle an objection, and invite the next step. When the raw footage is organized by message instead of by file name, the edit can produce a set that feels planned rather than repetitive.",
    },
    {
      title: "Repeatable capture habits",
      detail:
        "Batch editing gets easier when the business records the same useful ingredients each time: one direct-to-camera answer, a few b-roll clips, a process shot, a result or product close-up, and any needed brand assets. The goal is not a large shoot every week. It is a simple repeatable capture habit that creates enough variety for the editor to shape.",
    },
    {
      title: "Calendar without filler",
      detail:
        "Posting consistently only helps if the content earns its slot. A batch should leave room for stronger pieces and cut weak ones rather than forcing every clip into the calendar. The edit can create a rhythm, but the business still benefits from choosing topics that connect to real questions, offers, projects, or proof instead of generic trends.",
    },
  ],
  faqHeading: "Practical answers before batching social videos.",
  faqs: [
    {
      question: "How should I prepare footage for a monthly content batch?",
      answer:
        "Group files by topic, not only by date. Add one note for each topic explaining the point, platform, offer, and any words that must appear. Include b-roll, product shots, screenshots, and brand assets in the same folder. If the batch needs Spanish and English versions, identify that before editing starts so captions, hooks, and calls to action can be planned rather than translated at the end.",
    },
    {
      question: "What kinds of videos belong in a business content batch?",
      answer:
        "A balanced batch usually mixes answers to customer questions, proof from real projects, product or service explainers, founder commentary, process clips, and direct offer posts. The exact mix depends on the business, but variety matters because people do not need the same sales angle every time. The useful question is what a buyer needs to understand before they feel ready to contact you.",
    },
    {
      question: "Can batching work for remote clients?",
      answer:
        "Yes. Remote batching works when the client can send usable files on a predictable rhythm and review drafts in one place. The editor does not need to be local if the content is built from supplied footage, screen recordings, product clips, or founder videos. Local production only becomes necessary when the content depends on new camera work, location access, or directed filming.",
    },
    {
      question: "How do we avoid repetitive social posts?",
      answer:
        "Start with different questions and outcomes, then let the footage follow. If every clip begins with the same setup and ends with the same call to action, the batch will feel repetitive even if the captions change. A stronger workflow assigns each video a specific role before editing: teach, prove, compare, answer, invite, or show the work. That structure keeps the calendar varied.",
    },
  ],
  relatedHeading: "Related services for ongoing social content.",
  related: [
    {
      title: "Short-Form Video Editor",
      detail: "Individual Reels, TikToks, and Shorts from supplied footage.",
      href: "/services/short-form-video-editor-miami",
    },
    {
      title: "Content Repurposing",
      detail: "Turn long recordings into shorter posts and clips.",
      href: "/services/content-repurposing-service-miami",
    },
    {
      title: "Video Brief Guide",
      detail: "Write a useful brief before asking for an ongoing batch.",
      href: "/guides/write-a-useful-video-brief",
    },
  ],
};

export const YOUTUBE_EDITING_DEPTH: Depth = {
  craftHeading: "What YouTube editing needs beyond trimming.",
  craft: [
    {
      title: "Structure before style",
      detail:
        "A YouTube edit needs a clear promise, a path through the topic, and an ending that gives the viewer a reason to act or keep watching. Cutting pauses helps, but structure does more. If the recording wanders, the edit has to decide what belongs in the main story, what becomes a short clip, and what should be removed entirely.",
    },
    {
      title: "Audio carries trust",
      detail:
        "Viewers forgive simple visuals more easily than harsh audio. Dialogue cleanup, level balance, music restraint, and removing distracting noise often matter more than complex graphics. Good YouTube editing makes the voice easy to follow for a long stretch, because the audience may be listening while working, driving, or watching on a small speaker.",
    },
    {
      title: "Chapters and clips",
      detail:
        "Long-form YouTube footage can become more than one asset when the recording is organized. A full video may need chapters, while the strongest answers can become Shorts, Reels, or follow-up clips. The edit should identify those moments during the main timeline, not after everything is exported and the best short-form openings are harder to find.",
    },
  ],
  faqHeading: "Practical answers before sending YouTube footage.",
  faqs: [
    {
      question: "What files should I send for a YouTube edit?",
      answer:
        "Send original camera or screen files, separate audio if it exists, thumbnail ideas or stills, brand assets, any slides, and a short outline of the intended video. If the recording has must-keep sections, mark them by timestamp. If you want short clips from the same footage, say that early so the editor can preserve strong standalone moments while building the longer story.",
    },
    {
      question: "Can a YouTube video become short-form clips?",
      answer:
        "Yes, when the long recording contains clear standalone answers or visual moments. The best clips usually have their own question, context, and ending; they should not feel like a random middle slice. Planning clips during the YouTube edit is more efficient than returning later, because the editor already knows where the strongest statements, examples, and transitions live.",
    },
    {
      question: "How much should be cut from a talking-head YouTube video?",
      answer:
        "Cut enough to keep the idea moving, but not so much that the speaker sounds unnatural. Remove long pauses, repeated starts, technical interruptions, and tangents that do not support the topic. Keep useful breaths and human rhythm where they help the viewer follow. A good YouTube edit feels intentional, not frantic, because people stay for clarity and usefulness as much as speed.",
    },
    {
      question: "When does a YouTube edit need extra graphics?",
      answer:
        "Use graphics when they explain something the footage or voice cannot carry alone: names, steps, screenshots, diagrams, product details, or important quotes. Do not add motion simply to make the timeline look busy. If a viewer can understand the point from the voice and footage, the cleaner edit may be stronger. If the topic is technical, supplied references and screenshots make graphics more accurate.",
    },
  ],
  relatedHeading: "Related services for long-form video.",
  related: [
    {
      title: "Content Repurposing",
      detail: "Turn long recordings into clips, summaries, and social cuts.",
      href: "/services/content-repurposing-service-miami",
    },
    {
      title: "Video Podcast Editing",
      detail: "Edit conversation-based episodes and clips from supplied recordings.",
      href: "/services/video-podcast-editing-service-miami",
    },
    {
      title: "How to Repurpose Long Form",
      detail: "A guide for turning one recording into several useful assets.",
      href: "/guides/how-to-repurpose-long-form-video-into-reels",
    },
  ],
};

/* ------------------------------------------------------------------------- *
 * The 2026-10-06 niche batch.
 *
 * Five verticals the site had no page for, each picked because it is a different
 * BUYER rather than a different noun: a medical practice that is not a dentist, a
 * creator who is their own client, an agency or photographer who subcontracts the
 * edit, a salon, and a detail shop. The discipline is the same as the pilot above
 * — three craft cards, four question-shaped FAQs, one real fact per section, and
 * nothing invented. Each entry also carries the depth that sits behind a native
 * <details> fold on its page, so the words are in the served HTML whether or not
 * the fold is open.
 * ------------------------------------------------------------------------- */

export const MEDICAL_PRACTICE_DEPTH: Depth = {
  craftHeading: "What a clinic shoot has to settle before the camera is out.",
  craft: [
    {
      title: "Authorisation first, footage second",
      detail:
        "Showing a recognisable patient in marketing is governed by HIPAA, and what it asks for is a signed marketing authorisation held by the practice before anything is published. Nobody downstream can supply it later, so the clips worth filming are the ones already cleared. Practices that raise it at booking end up with usable patient footage; practices that raise it at the edit end up with a room tour.",
    },
    {
      title: "Movement needs a wider frame",
      detail:
        "Gait, range of motion, a mobility screen, an adjustment on the table: the subject is a body travelling through space, so the frame has to contain the whole limb through the whole movement. That means a locked tripod and a step back rather than a tight handheld shot that chases the motion and loses the joint. One clean wide take beats five drifting close ones.",
    },
    {
      title: "A treatment room is a loud room",
      detail:
        "Table motors, an ultrasound unit, an autoclave, the air handler and a hallway full of people all land in the microphone even when nobody notices them live. Getting the microphone close to whoever is speaking fixes most of it, and filming the talking part in the quietest room rather than the busiest one fixes the rest. Noise recorded behind a voice cannot be subtracted cleanly afterwards.",
    },
  ],
  faqHeading: "Practical answers before a medical practice shares footage.",
  faqs: [
    {
      question: "Do we need written authorisation before sending patient footage?",
      answer:
        "Yes, whenever a patient can be recognised. HIPAA treats marketing use of identifiable patient information as something the patient has to authorise in writing, and that authorisation belongs to the practice. Footage of the team, the rooms, the equipment, a demonstration on a staff member, or a hands-only shot where nobody is identifiable does not raise the same question. Flagging which clips are cleared when you send them keeps the edit from being built around a shot that can never be published.",
    },
    {
      question: "What can a chiropractor or physical therapist film without a production day?",
      answer:
        "More than most expect. A phone on a tripod at chest height covers a clinician explaining one complaint to camera, a demonstration of a single exercise filmed wide enough to see the whole body, and a short tour of the room a nervous first-timer is picturing. The two things worth controlling are light falling on the face rather than behind it, and one quiet room for anything with talking in it.",
    },
    {
      question: "How should a treatment explainer for a clinic be structured?",
      answer:
        "One complaint per video, named in the opening line, because somebody searching for help with sciatica will not sit through a general practice overview. After that the useful order is the question patients actually ask at the front desk, the answer in ordinary language, and what the first visit involves. The picture has to show whatever the words describe, which is why a demonstration beats a clinician gesturing at a diagram.",
    },
    {
      question: "Can a clinic publish a patient's progress on social media?",
      answer:
        "With that patient's written authorisation, and with care about what the comparison implies. A progress story told as the result any patient should expect is a claim the practice has to be able to stand behind, so the safer framing is one person's experience in their own words. On the picture side, two clips only compare if the camera position, distance and lighting match, otherwise part of the difference belongs to the camera.",
    },
  ],
  relatedHeading: "Related services for clinics and healthcare brands.",
  related: [
    {
      title: "Dental Video Marketing",
      detail: "The same consent discipline, applied where the mouth is the subject.",
      href: "/services/dental-video-marketing-south-florida",
    },
    {
      title: "Wellness & Spa Video",
      detail: "Treatment rooms and calm-room atmosphere for wellness brands.",
      href: "/services/wellness-spa-video-marketing-miami",
    },
    {
      title: "Remote Editing Handoff",
      detail: "How to package clinic clips so nothing is missing when editing starts.",
      href: "/guides/remote-video-editing-handoff",
    },
  ],
};

export const CREATOR_DEPTH: Depth = {
  craftHeading: "What a creator's edit has to get right every single week.",
  craft: [
    {
      title: "The interface eats your corners",
      detail:
        "A vertical video is 1080x1920, but the app draws the username, caption, audio strip and the whole column of action buttons on top of it. Captions and on-screen text that land in those bands get covered on a phone while looking perfect in the editor. Keeping type in the middle of the frame is the difference between a legible post and one nobody could read.",
    },
    {
      title: "A paid post has to say so, on screen",
      detail:
        "When a creator is paid, gifted product, or otherwise has a material connection to a brand, the FTC expects that disclosed clearly and conspicuously where the audience actually sees it. A line buried under a More tag or dropped into a comment is not where people look. The disclosure belongs in the video itself, and it is the creator who is responsible for making it.",
    },
    {
      title: "A publishable pile, not one hero cut",
      detail:
        "A posting rhythm fails on supply, not on ambition. One filming session that stays in one outfit, one location and one lighting setup yields a stack of separate posts rather than a single edit, as long as each take is a self-contained idea with its own opening line. Batching the filming is what makes a calendar survive a busy week.",
    },
  ],
  faqHeading: "Practical answers before a creator hands over a week of footage.",
  faqs: [
    {
      question: "What should a creator send so editing can start immediately?",
      answer:
        "The original camera or phone files rather than anything re-downloaded from an app, since a platform export is already compressed and sharpening it back is not possible. With them, send a line per clip saying what the post is for, the handle and platform each one is going to, any brand or paid partnership involved, and the music or reference you have in mind. That is usually enough to avoid a round of questions.",
    },
    {
      question: "How do captions get styled without covering the picture?",
      answer:
        "By keeping them in the safe middle band of the frame, in a weight heavy enough to survive compression, with enough contrast against whatever is moving behind them. Burned-in captions matter because a large share of feeds plays muted by default, so a video whose point lives only in the audio reaches a fraction of the people who saw it. Platform auto-captions are a fallback, not the plan.",
    },
    {
      question: "Can one filming session cover a whole publishing week?",
      answer:
        "It can when the session is planned as a list of separate ideas instead of one long take. Each idea needs its own opening sentence, because a viewer arriving on the fourth post has not seen the first three. Changing a jacket or moving to a second wall between blocks keeps the posts from looking like slices of the same clip, which is the usual reason a batch gets spotted as a batch.",
    },
    {
      question: "Who keeps the raw footage and the project files?",
      answer:
        "The footage is the creator's, and it is worth keeping an original copy somewhere other than the handoff folder, because a repurposed cut later needs the full-quality source rather than the published version. What gets returned from an edit are the finished exports in the formats the platforms need. Anything beyond that, such as open project files, is worth agreeing before the work starts rather than after.",
    },
  ],
  relatedHeading: "Related services for creators and personal brands.",
  related: [
    {
      title: "Food & Places Creator Editing",
      detail: "Restaurant visits and local recommendations, from footage to a launch month.",
      href: "/services/food-and-places-creator-video-editing-miami",
    },
    {
      title: "Short-Form Video Editing",
      detail: "Vertical edits with burned-in captions from footage you already shot.",
      href: "/services/short-form-video-editor-miami",
    },
    {
      title: "Content Repurposing",
      detail: "Turn one long video, podcast or shoot into a set of short social clips.",
      href: "/services/content-repurposing-service-miami",
    },
    {
      title: "Remote Video Editor",
      detail: "Long-form and short-form edits from supplied footage, handed off remotely.",
      href: "/services/hire-remote-video-editor",
    },
  ],
};

export const WHITE_LABEL_DEPTH: Depth = {
  craftHeading: "What an agency or photographer needs from a subcontracted edit.",
  craft: [
    {
      title: "Delivered unbranded",
      detail:
        "Exports come back with no watermark, no end card and no credit, because the client relationship belongs to the studio that sold the job. Naming, folder structure and aspect ratios follow whatever convention that studio already uses with that client, so the files drop straight into an existing delivery instead of needing to be renamed first.",
    },
    {
      title: "Log footage needs its colour recipe",
      detail:
        "Material shot in a flat or log profile looks washed out until the matching camera transform is applied, and guessing which one it is produces skin tones nobody ordered. Sending the camera model, the picture profile, and any LUT or grade already approved for that client removes the guesswork. A graded still from an earlier delivery is often the fastest way to communicate a look.",
    },
    {
      title: "One brief, one round, written down",
      detail:
        "A subcontracted edit goes wrong in the feedback, not the cutting. Notes tied to timecode, gathered into a single list, turn a revision from a conversation into a task. The opposite pattern, a trickle of separate messages from several people, is what turns a simple pass into an open-ended one, so it is worth agreeing who speaks for the client before anything goes out for review.",
    },
  ],
  faqHeading: "Practical answers before an agency sends a project over.",
  faqs: [
    {
      question: "Does the client ever know an outside editor was involved?",
      answer:
        "Not from the files. Deliverables arrive unbranded, named the way the studio asks, with no credit, watermark or contact detail attached. Communication stays with the studio rather than going direct to the end client, and the work is not shown as a public reference without the studio's say. Whether to tell a client that post-production is subcontracted is the studio's decision to make, not something the files decide for them.",
    },
    {
      question: "What should a photographer or agency include in the handoff?",
      answer:
        "The original camera files, any audio recorded separately, brand assets as vectors or layered files rather than screenshots, and a short brief naming the deliverables and where each one will be published. Add the camera and picture profile, any approved look, and the client's own reference material. A folder with that in it can be cut without a single clarifying question, which is usually the point.",
    },
    {
      question: "How are revisions handled on a white-label project?",
      answer:
        "As one consolidated list per round, with timecodes, coming from a single point of contact at the studio. That matters more here than on direct work, because every note has already passed through the end client and the studio, and two people giving contradictory instructions costs a full pass. Agreeing up front how many rounds a job includes keeps the scope the studio quoted intact.",
    },
    {
      question: "Can an editor match a look the studio has already established?",
      answer:
        "Yes, and the shortest route is a reference the studio already owns: a finished export from an earlier job, a LUT, or a graded frame. Matching a described look, as opposed to a shown one, takes more passes than matching a picture. If the footage comes from a camera or profile not used on that client before, a short graded test clip before the full edit is cheaper than a reversal at the end.",
    },
  ],
  relatedHeading: "Related services for studios and production partners.",
  related: [
    {
      title: "Hire a Remote Editor",
      detail: "How remote post-production works when the shooting is already covered.",
      href: "/services/hire-remote-video-editor",
    },
    {
      title: "Interview Video Editing",
      detail: "Multi-camera and sit-down interview assembly from supplied rushes.",
      href: "/services/interview-video-editing-service",
    },
    {
      title: "Content Repurposing",
      detail: "Turning one delivered film into the cutdowns a client asks for next.",
      href: "/services/content-repurposing-service-miami",
    },
  ],
};

export const SALON_DEPTH: Depth = {
  craftHeading: "What salon, barbershop and nail footage demands.",
  craft: [
    {
      title: "Mixed light breaks the colour",
      detail:
        "A salon usually has a window on one side and warm bulbs overhead, and those two sources are different colours. Left alone, the camera splits the difference and a balayage that took hours reads orange or grey on screen. Setting the white balance for one source, and keeping the chair away from the other, is what makes a colour result look on screen the way it looks in the mirror.",
    },
    {
      title: "Nails are a macro subject",
      detail:
        "Filming a hand close enough to read the finish leaves very little depth in focus, and hands do not hold still. The fix is physical rather than digital: rest the hand on a support, give it something steady to sit against, and keep the camera at a fixed distance instead of drifting in and out. A braced close-up is sharp; a floating one is a blur nobody can use.",
    },
    {
      title: "The transformation is the story",
      detail:
        "A cut, a colour or a set only lands if the viewer saw the starting point, which means the first shot has to exist before anyone picks up the clippers. Same chair, same angle, same light, and a final reveal filmed the same way. Shops that take that opening shot as a habit end up with a library of transformations; shops that remember afterwards have a shelf of endings.",
    },
  ],
  faqHeading: "Practical answers before a salon or barbershop shares clips.",
  faqs: [
    {
      question: "What should a salon film during a normal working day?",
      answer:
        "The pieces of a transformation, in order: the client in the chair before anything starts, two or three short moments during the work, and the finished look filmed from the same position as the opening shot. Add a few seconds of the room and a line from the stylist about what was done. None of that needs a closed day, and a phone braced against a mirror or a station shelf is steady enough.",
    },
    {
      question: "Do clients need to agree before their haircut appears online?",
      answer:
        "Yes, and it is worth asking before filming rather than after. Somebody sitting in a chair with a cape on has not agreed to appear on a business account just by being there, and a client who says no later leaves an edit built around a face that cannot be shown. A note of who said yes, sent along with the footage, keeps the finished video out of that situation.",
    },
    {
      question: "Why does hair colour look different on camera than in the chair?",
      answer:
        "Usually because the light is mixed. Daylight from a window is blue compared with the warm bulbs over the station, and when both land on the same head the camera has to pick one, so the other tints everything it touches. Filming in a consistent spot in the room, with the chair turned towards the dominant light, gets far closer to the real result than any correction applied afterwards.",
    },
    {
      question: "How do barbershops and nail studios post consistently?",
      answer:
        "By capturing the same two or three shapes every week instead of inventing a new idea each time: the transformation, the detail close-up, and the stylist saying something short and useful. Repeatable shapes are quick to film between clients and quick to edit, and the familiarity is a feature rather than a limitation. The alternative, waiting for a remarkable day, is why most shop accounts go quiet.",
    },
  ],
  relatedHeading: "Related services for appointment-based local businesses.",
  related: [
    {
      title: "Reels for Miami Businesses",
      detail: "Vertical posts from clips filmed between appointments.",
      href: "/services/reels-editor-miami",
    },
    {
      title: "Small Business Video",
      detail: "Video for a local business with one location and a booking page.",
      href: "/services/small-business-video-production-miami",
    },
    {
      title: "Wellness & Spa Video",
      detail: "Treatment-room footage for neighbouring appointment businesses.",
      href: "/services/wellness-spa-video-marketing-miami",
    },
  ],
};

export const AUTO_DETAILING_DEPTH: Depth = {
  craftHeading: "What a polished panel does to a camera.",
  craft: [
    {
      title: "You are filming the reflection",
      detail:
        "A corrected, waxed or ceramic-coated panel behaves like a mirror, so what the lens records is whatever stands in front of the car: the shop door, a ladder, the person holding the camera. Choosing what reflects, an open sky or a plain wall rather than clutter, is the whole shot. Open shade and a clean background do more for a paint shot than any amount of colour work later.",
    },
    {
      title: "Tint and fine patterns fight the sensor",
      detail:
        "A rear window with a dot matrix, a perforated graphic, or a textured mesh can produce shimmering interference patterns on video that nobody saw in the room. Moving the camera slightly, changing the distance, or shifting the angle usually clears it, and it is far easier to notice on set than to remove afterwards. Checking the screen on those shots before moving on saves the clip.",
    },
    {
      title: "A wrap needs the whole car",
      detail:
        "Colour change and commercial graphics are judged on how the panels meet: the edges, the door handles, the curves where the vinyl is pulled. That asks for a slow pass along the body with the light sliding across it, plus close shots of the terminations, rather than one wide shot of the car parked straight on. The wide shot proves the colour; the close shots prove the work.",
    },
  ],
  faqHeading: "Practical answers before a detail or wrap shop sends footage.",
  faqs: [
    {
      question: "How should a detail shop film a before and after?",
      answer:
        "Same spot, same camera height, same light, both times. A correction looks dramatic in person because the reflection changed, and the only way to show that on screen is to let the viewer compare two shots that differ in nothing except the paint. Marking a filming position on the shop floor is the simplest way to make that repeatable, and it turns every car that comes through into a usable comparison.",
    },
    {
      question: "Why do swirl marks disappear on camera?",
      answer:
        "Because they are visible only under a hard, single light source, and most shops are lit by broad overhead fixtures that wrap the panel evenly and hide exactly what you are trying to show. One directional light, or low-angle sun, raked across the paint brings the defects back. The same trick, used after the correction, is what makes the finished panel look deep instead of flat.",
    },
    {
      question: "What footage works best for window tint and paint protection?",
      answer:
        "Shots that let a viewer see a difference they can believe: one treated window beside an untreated one, the view from inside looking out, a hand on the film edge at a clean cut line. Claims about heat rejection or durability belong to the film manufacturer and the shop that installs it, so the video shows install quality and the visible result rather than asserting performance figures.",
    },
    {
      question: "Can a shop film this without closing the bay?",
      answer:
        "Yes, as long as the camera position is decided once and then reused. A phone on a tripod in a marked spot, a clean background behind the car, and a few seconds captured at the start and the end of each job is enough raw material for a steady stream of posts. What ruins the footage is not the lack of a studio but a cluttered reflection and a different angle every time.",
    },
  ],
  relatedHeading: "Related services for automotive businesses.",
  related: [
    {
      title: "Automotive Video Marketing",
      detail: "Video for dealerships, where the subject is inventory rather than a service.",
      href: "/services/automotive-video-marketing-miami",
    },
    {
      title: "Reels for Miami Businesses",
      detail: "Vertical posts cut from footage filmed in the bay.",
      href: "/services/reels-editor-miami",
    },
    {
      title: "Content Repurposing",
      detail: "One longer build video turned into the clips each platform wants.",
      href: "/services/content-repurposing-service-miami",
    },
  ],
};

export const FOOD_PLACES_CREATOR_DEPTH: Depth = {
  craftHeading: "What makes a visit easy to follow?",
  craft: [
    { title: "The place", detail: "Dish, venue and neighbourhood on screen, so viewers know what you are recommending." },
    { title: "Your voice", detail: "Burned-in captions kept clear of app controls and the food you came to show." },
    { title: "The context", detail: "Tell Esteban which visits were paid or which meals were comped before editing starts." },
  ],
  faqHeading: "What should you know before sending clips?",
  faqs: [
    { question: "Can you edit phone footage remotely?", answer: `Yes. Send original phone files, not copies downloaded from a social app. The Starter package covers remote editing: ${priceSentence("en", "arranque").toLowerCase()}. Format, volume and timing are confirmed for your project.` },
    { question: "Does a launch month include filming?", answer: "The Growth package includes a content plan, publishing calendar, editing and a monthly report. On-location filming is scoped separately, project by project, across Broward and Miami-Dade from Esteban's Fort Lauderdale base." },
    { question: "Are these examples from recommendation accounts?", answer: "No. Bar Door Monkey Miami is a published venue promo with videography and editing; ML Colombia is a published social piece. They show editing work, not a food recommendation account or its results." },
  ],
  relatedHeading: "Which other editing service fits your project?",
  related: [
    { title: "Content Creator Video Editing", detail: "Editing and publishing support for a broader creator account.", href: "/services/content-creator-video-editing-miami" },
    { title: "Restaurant Promo Video Editing", detail: "Promotional edits for the restaurant's own channels.", href: "/services/restaurant-promo-video-editing-miami" },
  ],
};

export const FOOD_PLACES_CREATOR_SECTIONS = [
  {
    heading: "What does Esteban edit for a food or places recommendation account?",
    paragraphs: [
      "Esteban edits your restaurant visits and local discoveries into vertical 1080x1920 videos with burned-in captions inside the safe band. The dish or venue name and neighbourhood appear on screen, so someone who finds the video without knowing your account can still identify the place. Cover frames come from your footage. A horizontal cut can also be scoped when the same visit has enough material for a longer upload.",
      "Send the original clips, your account and the platforms where you plan to publish. Explain what you liked and which details must stay in the cut. This combines [editing for content creators](/services/content-creator-video-editing-miami) with the food and venue detail of [restaurant promo editing](/services/restaurant-promo-video-editing-miami), while keeping the recommendation in your own voice.",
    ],
  },
  {
    heading: "How does a launch month work?",
    paragraphs: [
      `The Growth package includes a content plan, publishing calendar, editing and a monthly report. ${priceSentence("en", "crecimiento")}. That is a starting price, with the first month scoped on a call from the footage you have and the posting rhythm you want. Bring your account, the places you want to cover and examples of the style you like. There is no fixed post count or delivery promise before the material and scope are agreed.`,
      "The conversation separates visits already filmed from ideas that still need footage. It also identifies which pieces belong together and what information each one needs from you. You can discuss a launch month even if the account is new; the plan is based on your material and goals, without promising followers, views or growth results.",
    ],
  },
  {
    heading: "What should a creator film at a restaurant so it edits well?",
    paragraphs: [
      "Capture hands, ingredients, texture, the room and the sign or exterior. Those views help connect the dish to the place instead of leaving the editor with only close-ups of a plate. Keep original files in folders named by venue and date, and include the correct menu spelling. Add a short note about what you want to recommend, plus any spoken observations that should stay in your own words.",
      "The [restaurant video ideas guide](/guides/video-content-ideas-for-restaurants) can help you prepare a visit, while the [remote editing handoff guide](/guides/remote-video-editing-handoff) explains how to organise the files. If the video is being made for the venue's own account, review [restaurant promo video editing](/services/restaurant-promo-video-editing-miami) too. Explain that intended use before sending footage so the finished piece addresses the right audience.",
    ],
  },
  {
    heading: "How are paid visits and comped meals disclosed?",
    paragraphs: [
      "Tell Esteban which visits are paid partnerships and which meals were provided by the venue. This follows the published creator-editing practice of placing the disclosure in the cut itself, rather than relying only on an expandable caption. Send that context alongside the relevant clips, with the venue name and any wording you have already agreed. It belongs in the editing brief from the start, alongside the recommendation you want to make.",
      "When reviewing the edit, check that the disclosure is readable and stays with the relevant visit. Also check the venue and dish names, your captions and the parts of the experience you chose to describe. If one folder mixes paid visits, comped meals and visits you paid for yourself, label each separately so that the editor does not have to guess.",
    ],
  },
  {
    heading: "What published work shows this kind of editing?",
    paragraphs: [
      "[Bar Door Monkey Miami](/portfolio/bar-door-monkey) is a promo for a Miami restaurant, from 2020, with videography and editing. Its published video runs 55 seconds. [ML Colombia](/portfolio/ml-colombia) is a published social content piece running 24 seconds. These are a venue promo and a social piece, not a food or places recommendation account. They are examples you can watch to discuss editing choices, not claims about a creator client's audience or results.",
      "Watch them with your own footage in mind: the order of shots, the balance between people and surroundings, and how much information fits into a short piece. Send Esteban the parts you want to use as a reference and explain what should feel different for your account. The conversation starts from visible work and your own material.",
    ],
  },
] as const;


/* ---------------------------------------------------------------------------
 * SEO/GEO audit wave, 2026-10-10.
 *
 * PORTED_SERVICE_FAQS — FAQ copy for hand-written English service pages that
 * had none (audit finding 3). Each entry is the English meaning of the FAQ the
 * matching Spanish page already publishes (spanishNichePages[].faqs in
 * lib/spanish-site.ts), so no new fact is introduced. Two pages are left out on
 * purpose because their Spanish FAQ makes a claim the site cannot back:
 *   - contractor-video-marketing-south-florida: "before-and-after videos are
 *     the highest-converting format for contractors" (a performance claim);
 *   - plastic-surgery-video-marketing-miami: "all clinical footage is processed
 *     in encrypted storage" (a security claim with no published basis).
 * On-location answers follow the owner's 2026-10-10 rule: on-location filming
 * is a paid service, scoped per project. No turnaround or price is added.
 * ------------------------------------------------------------------------- */

export const PORTED_SERVICE_FAQS: Readonly<Record<string, readonly ServiceFaq[]>> = {
  "/services/content-repurposing-service-miami": [
    {
      question: "What kinds of long videos can be repurposed?",
      answer: "Webinars, interviews, conference talks, podcast episodes and long YouTube videos.",
    },
  ],
  "/services/small-business-video-production-miami": [
    {
      question: "Do I need professional equipment to film?",
      answer:
        "Not always. A modern smartphone with good natural light can capture usable footage, which is then shaped with professional editing.",
    },
  ],
  "/services/ai-food-photography-restaurants": [
    {
      question: "Does the dish still look real?",
      answer:
        "Yes. The real photo of the plated dish is the anchor, and only the table or restaurant setting around it is generated.",
    },
  ],
  "/services/headshot-photographer-miami": [
    {
      question: "Is digital retouching included?",
      answer: "Yes. Each final selected portrait includes subtle skin and color retouching.",
    },
  ],
  "/services/video-editing-west-palm-beach": [
    {
      question: "How are large files sent from Palm Beach County?",
      answer: "Footage is transferred through secure Dropbox or Frame.io links.",
    },
  ],
  "/services/video-production-doral-miami": [
    {
      question: "Are corporate projects in Doral covered?",
      answer:
        "Yes. Remote editing is available for businesses in Doral and western Miami-Dade, and on-location filming there is available as a paid service, scoped per project.",
    },
  ],
  "/services/real-estate-video-coral-gables": [
    {
      question: "Does the edit include music and luxury color work?",
      answer:
        "Yes. Each real estate video is delivered with professional color correction and sound design suited to high-value properties.",
    },
  ],
  "/services/corporate-video-production-brickell": [
    {
      question: "Are bilingual subtitles available?",
      answer: "Yes. Files can be delivered with synchronized subtitles in both English and Spanish for corporate distribution.",
    },
  ],
  "/services/small-business-video-pembroke-pines": [
    {
      question: "How does the service work if I am in Pembroke Pines?",
      answer:
        "You can start with a brief and footage you have already filmed. Esteban works from Fort Lauderdale; any on-location filming is a paid service, scoped per project.",
    },
    {
      question: "Does the portfolio include a project made in Pembroke Pines?",
      answer:
        "No Pembroke Pines project is presented. Bar Door Monkey is a published Miami example that shows videography and editing for a local business promo video, without claiming business results.",
    },
  ],
  "/services/jewelry-product-photography-miami": [
    {
      question: "Can luxury backgrounds be created with AI without sending the physical piece?",
      answer:
        "Yes. With sharp base photos of the jewelry, editorial-level backgrounds and lighting can be composed with AI.",
    },
  ],
  "/services/fitness-gym-video-marketing-miami": [
    {
      question: "Is royalty-free music included for social media?",
      answer:
        "Yes. Music is chosen for the platform where the video will be published, and for paid ads the business confirms the usage rights before publishing.",
    },
  ],
  "/services/corporate-event-videographer-miami": [
    {
      question: "Can a teaser be delivered on the day of the event?",
      answer:
        "That is not promised. The calculator applies an express multiplier to rush delivery, but the real timeline is confirmed before the event based on the footage and the schedule. State the publishing date you need when you ask for a quote.",
    },
  ],
  "/services/automotive-video-marketing-miami": [
    {
      question: "Can engine sound design be added?",
      answer: "Yes. The edit can be enhanced with professional engine and ambient sound effects.",
    },
  ],
  "/services/hotel-hospitality-video-production-miami": [
    {
      question: "Are versions made for Instagram and the website?",
      answer: "Yes. A horizontal version is delivered for the website, with vertical adaptations for Reels and Stories.",
    },
  ],
  "/services/video-podcast-editing-service-miami": [
    {
      question: "Are cover designs and animated intros included?",
      answer: "Yes. Opening animations, guest name lower thirds and brand graphics can be added.",
    },
  ],
  "/services/architecture-design-video-miami": [
    {
      question: "Can high-resolution architecture photos be animated?",
      answer: "Yes. Parallax and virtual camera movement are used to bring photo portfolios to life.",
    },
  ],
  "/services/wellness-spa-video-marketing-miami": [
    {
      question: "Is spa ambient sound design included?",
      answer:
        "Yes. Natural sound textures and ambient music chosen for the platform where the video will be published are built into the edit.",
    },
  ],
  "/services/brand-video-production-miami": [
    {
      question: "Is help available with the voiceover and background music?",
      answer:
        "Yes. Bilingual commercial voiceover and music are selected to represent the personality of the brand.",
    },
  ],
  "/services/cosmetic-dentistry-video-marketing-miami": [
    {
      question: "How are smile makeover results highlighted?",
      answer: "With split-screen comparisons and high-definition zooms that bring out the dental aesthetics.",
    },
  ],
  "/services/nightlife-event-video-editing-miami": [
    {
      question: "Can the cuts follow the exact rhythm of the music?",
      answer: "Yes. Every shot change is synced to the beats of the track.",
    },
  ],
  "/services/wealth-management-video-production-miami": [
    {
      question: "Can slides and market charts be integrated?",
      answer: "Yes. Clean on-screen graphics are designed to accompany the advisor's explanation.",
    },
  ],
  "/services/boutique-hotel-video-editing-miami": [
    {
      question: "Are formats delivered for booking sites and Instagram?",
      answer: "Yes. Versions are delivered in 16:9 for the web and 9:16 vertical for social media.",
    },
  ],
  "/services/real-estate-drone-video-editing-miami": [
    {
      question: "Can a drone flight be booked?",
      answer:
        "Drone flying is not currently published as a confirmed service. Availability for aerial work is still pending a direct answer from Esteban; this page covers editing drone footage you supply.",
    },
  ],
  "/services/video-editing-miami-beach": [
    {
      question: "How is color handled for outdoor Miami Beach footage?",
      answer: "Turquoise water and sunny skies are balanced while skin tones stay natural.",
    },
  ],
  "/services/creative-video-production-wynwood": [
    {
      question: "Are visual effects and rhythmic creative transitions supported?",
      answer: "Yes. Fast transitions, texture effects and urban typography are applied to match the client's style.",
    },
  ],
  "/services/corporate-video-editing-weston-fl": [
    {
      question: "Can recorded corporate conferences or presentations be edited?",
      answer: "Yes. Pauses are removed, explanatory slides are inserted and audio clarity is improved.",
    },
  ],
  "/services/small-business-video-hollywood-fl": [
    {
      question: "Are calls to action with phone and website included?",
      answer: "Yes. End graphics are designed with contact buttons, location and the business's direct details.",
    },
  ],
  "/services/video-production-delray-beach": [
    {
      question: "Is the video adapted for local Instagram and Meta ads?",
      answer: "Yes. The cuts required for targeted ad campaigns are delivered.",
    },
  ],
  "/services/real-estate-video-sunny-isles": [
    {
      question: "Can footage already filmed of a Sunny Isles property be edited?",
      answer:
        "Yes. Esteban can edit footage supplied by the client; scope, formats and intended use are confirmed for each project.",
    },
  ],
  "/services/video-editing-palm-beach-gardens": [
    {
      question: "Is content optimized for executive LinkedIn?",
      answer: "Yes. Horizontal clips are formatted with burned-in subtitles suited to LinkedIn audiences.",
    },
  ],
  "/services/online-course-video-editing-service": [
    {
      question: "Are background noise and instructor hesitations cleaned up?",
      answer:
        "Yes. The audio is edited to remove ambient noise and unnecessary pauses while keeping the speech natural.",
    },
  ],
  "/services/corporate-training-video-editing-miami": [
    {
      question: "Can quizzes or on-screen prompts be added?",
      answer: "Yes. Text cards and review pauses are added to reinforce what learners take in.",
    },
  ],
  "/services/crowdfunding-video-editor-miami": [
    {
      question: "Is a closing call to action with the funding goals included?",
      answer: "Yes. End graphics are designed with the campaign rewards and a call to back the project.",
    },
  ],
  "/services/drone-video-editing-service-miami": [
    {
      question: "How are drone flicker and abrupt movements corrected?",
      answer: "High-precision digital stabilization is applied to smooth the camera path.",
    },
  ],
  "/services/music-video-post-production-miami": [
    {
      question: "Are multiple performance takes synced with the master track?",
      answer: "Yes. Multicam edits are synced to the master audio track so the cut can move between setups.",
    },
  ],
  "/services/webinar-clip-editing-service": [
    {
      question: "Can you choose the best parts of the webinar?",
      answer: "Yes. The recording is reviewed to find the moments with the strongest hook and the most useful information.",
    },
  ],
  "/services/interview-video-editing-service": [
    {
      question: "Is audio recorded separately on lavalier mics synced?",
      answer: "Yes. Separate audio tracks are synced to the camera video.",
    },
  ],
};

/** Hand-written pages left without a FAQ because no published fact supports one. */
export const FAQ_SKIPPED_NO_FACTUAL_SOURCE = [
  "/services/contractor-video-marketing-south-florida",
  "/services/plastic-surgery-video-marketing-miami",
] as const;

/* ---------------------------------------------------------------------------
 * Sibling links for service pages that were linked only from the hubs (audit
 * finding 7 / fix 6). Each cluster is a ring: every page links the next three,
 * so every page in the cluster also gains three inbound links. Card copy is
 * each page's own published breadcrumb label and meta description. Palm Beach
 * County pages are deliberately not in any cluster: AGENTS.md forbids
 * strengthening Palm Beach positioning without local evidence.
 * ------------------------------------------------------------------------- */

const SERVICE_CARD_COPY: Readonly<Record<string, Omit<RelatedService, "href">>> = {
  "/services/corporate-training-video-editing-miami": { title: "Corporate Training Video Editing", detail: "Corporate training video editing in Miami: employee onboarding videos, SOP procedure walkthroughs, and internal policy video edits." },
  "/services/corporate-video-editing-weston-fl": { title: "Corporate Video Editing Weston", detail: "Corporate video editing in Weston & Davie FL: executive announcements, internal SOP video training, and company overview post-production." },
  "/services/corporate-video-production-brickell": { title: "Brickell Corporate Video", detail: "Corporate video editing, executive testimonials, and company overview videos for financial firms and tech startups in Brickell, Miami." },
  "/services/wealth-management-video-production-miami": { title: "Wealth Management Video Production", detail: "Financial advisor video production, wealth management authority reels, market update edits, and corporate financial video in Miami." },
  "/services/webinar-clip-editing-service": { title: "Webinar Clip Editing Service", detail: "Webinar clip editing service: extracting key takeaway clips from virtual events, formatting into 9:16 vertical reels with captions." },
  "/services/online-course-video-editing-service": { title: "Online Course Video Editing Service", detail: "Online course video editing: educational module polish, slide overlays, clear audio enhancement, and webinar lesson post-production." },
  "/services/boutique-hotel-video-editing-miami": { title: "Boutique Hotel Video Editing", detail: "Boutique hotel video editing, resort amenity walkthroughs, luxury hospitality reels, and booking video promos in Miami." },
  "/services/nightlife-event-video-editing-miami": { title: "Nightlife Event Video Editing", detail: "Nightclub video editing, DJ promo reels, VIP party recap videos, and fast-paced event post-production in Miami." },
  "/services/music-video-post-production-miami": { title: "Music Video Post Production", detail: "Music video post-production in Miami: lip-sync assembly, cinematic color grading, visual effects, and rhythm cuts for artists & directors." },
  "/services/video-podcast-editing-service-miami": { title: "Video Podcast Editing", detail: "Professional video podcast editing, multi-cam switching, audio cleanup, and social media clip creation for creators in Miami." },
  "/services/small-business-video-hollywood-fl": { title: "Small Business Video Hollywood", detail: "Small business video production & editing in Hollywood & Hallandale FL: Instagram reels, storefront promos, and customer review clips." },
  "/services/small-business-video-pembroke-pines": { title: "Pembroke Pines Video", detail: "Promotional video editing and social content creation for small businesses in Pembroke Pines and Miramar, Florida." },
  "/services/video-editing-miami-beach": { title: "Video Editing Miami Beach", detail: "Professional video editing in Miami Beach: hospitality, luxury real estate walkthroughs, lifestyle reels, and nightclub event recaps." },
  "/services/video-production-doral-miami": { title: "Doral Video Production", detail: "B2B video production, commercial videography, and remote editing for businesses and distributors in Doral, Florida." },
  "/services/fitness-gym-video-marketing-miami": { title: "Fitness Gym Video", detail: "Gym, trainer and pilates studio video in Miami: what editing, on-site filming and a monthly plan cost, with prices from the published rate card." },
  "/services/salon-barbershop-video-marketing-miami": { title: "Salon & Barbershop Video", detail: "Video marketing for salons, barbershops, and nail studios in Miami and Fort Lauderdale: transformations, detail close-ups, and vertical posts from phone clips." },
  "/services/medical-practice-video-marketing-miami": { title: "Medical Practice Video", detail: "Video editing and selective production for chiropractors, physical therapists, functional medicine clinics, and urgent care in Miami and Broward." },
  "/services/auto-detailing-tint-wrap-video-marketing-miami": { title: "Detailing, Tint & Wrap Video", detail: "Video marketing for auto detailing, window tint, and vinyl wrap shops in South Florida: controlled reflections, honest before-and-afters, vertical posts." },
  "/services/headshot-photographer-miami": { title: "Headshots", detail: "Professional headshots and executive portrait photography for business leaders, realtors, and attorneys in Miami and Fort Lauderdale." },
  "/services/architecture-design-video-miami": { title: "Architecture Design Video", detail: "Architectural video editing, interior design walkthroughs, and portfolio video production for design firms in Miami." },
  "/services/real-estate-video-coral-gables": { title: "Coral Gables Real Estate", detail: "Luxury real estate video editing and tour formatting for realtors and properties in Coral Gables and South Miami." },
  "/services/jewelry-product-photography-miami": { title: "Jewelry Photography", detail: "AI-enhanced product photography and high-resolution retouching for jewelry brands and luxury e-commerce in Miami." },
  "/services/crowdfunding-video-editor-miami": { title: "Crowdfunding Video Editor", detail: "Crowdfunding video editor in Miami: Kickstarter launch videos, Indiegogo product pitch edits, and backer conversion video post-production." },
};

export const SERVICE_SIBLING_CLUSTERS: readonly (readonly string[])[] = [
  [
    "/services/corporate-training-video-editing-miami",
    "/services/corporate-video-editing-weston-fl",
    "/services/corporate-video-production-brickell",
    "/services/wealth-management-video-production-miami",
    "/services/webinar-clip-editing-service",
    "/services/online-course-video-editing-service",
  ],
  [
    "/services/boutique-hotel-video-editing-miami",
    "/services/nightlife-event-video-editing-miami",
    "/services/music-video-post-production-miami",
    "/services/video-podcast-editing-service-miami",
  ],
  [
    "/services/small-business-video-hollywood-fl",
    "/services/small-business-video-pembroke-pines",
    "/services/video-editing-miami-beach",
    "/services/video-production-doral-miami",
  ],
  [
    "/services/fitness-gym-video-marketing-miami",
    "/services/salon-barbershop-video-marketing-miami",
    "/services/medical-practice-video-marketing-miami",
    "/services/auto-detailing-tint-wrap-video-marketing-miami",
    "/services/headshot-photographer-miami",
  ],
  [
    "/services/architecture-design-video-miami",
    "/services/real-estate-video-coral-gables",
    "/services/jewelry-product-photography-miami",
    "/services/crowdfunding-video-editor-miami",
  ],
];

/** Spanish clusters, same ring rule; card copy comes from spanishNichePages. */
export const SPANISH_SIBLING_CLUSTERS: readonly (readonly string[])[] = [
  [
    "edicion-de-video-corporativo-weston",
    "edicion-de-video-de-capacitacion-corporativa-miami",
    "video-corporativo-distrito-financiero-miami",
    "produccion-de-video-para-asesores-financieros-miami",
    "marketing-de-video-para-abogados-miami",
    "edicion-de-video-para-cursos-online",
  ],
  [
    "edicion-de-video-para-hoteles-boutique-miami",
    "produccion-de-video-para-hoteles-miami",
    "edicion-de-video-para-discotecas-y-eventos-miami",
    "postproduccion-de-videos-musicales-miami",
    "edicion-de-video-podcast-miami",
    "marketing-de-video-para-alquiler-de-yates-miami",
  ],
  [
    "edicion-de-video-miami-beach",
    "produccion-de-video-doral-miami",
    "video-para-pequenos-negocios-pembroke-pines",
    "video-creativo-wynwood-miami",
    "produccion-de-video-fort-lauderdale",
  ],
  [
    "marketing-de-video-para-gimnasios-miami",
    "marketing-de-video-para-spas-y-bienestar-miami",
    "marketing-de-video-para-clinicas-esteticas-miami",
    "marketing-de-video-para-cirugia-plastica-miami",
    "marketing-de-video-para-odontologia-estetica-miami",
    "marketing-de-video-para-consultorios-medicos-miami",
    "marketing-de-video-para-salones-y-barberias-miami",
    "produccion-de-video-para-entrenadores-personales-miami",
  ],
  [
    "marketing-de-video-automotriz-miami",
    "marketing-de-video-para-detallado-y-wraps-miami",
    "marketing-de-video-para-contratistas-miami",
    "marketing-de-video-para-contratistas-de-techos-florida",
    "video-para-arquitectura-y-diseno-miami",
    "video-inmobiliario-coral-gables",
    "video-inmobiliario-sunny-isles",
    "edicion-de-video-con-dron-miami",
  ],
  [
    "reutilizacion-de-contenido-para-redes-miami",
    "produccion-masiva-de-video-para-redes-miami",
    "edicion-de-video-marca-blanca-para-agencias",
    "editor-de-video-para-campanas-de-crowdfunding",
    "fotografia-de-joyas-y-lujo-miami",
    "fotografo-de-retratos-y-headshots-miami",
    "imagenes-con-ia-para-ecommerce-miami",
  ],
];

/** The next `count` members of a ring cluster after `member`, or [] if absent. */
export function ringSiblings(
  clusters: readonly (readonly string[])[],
  member: string,
  count = 3,
): string[] {
  const cluster = clusters.find((candidate) => candidate.includes(member));
  if (!cluster) return [];
  const start = cluster.indexOf(member);
  const take = Math.min(count, cluster.length - 1);
  return Array.from({ length: take }, (_, offset) => cluster[(start + offset + 1) % cluster.length]);
}

export function serviceSiblings(path: string): RelatedService[] {
  return ringSiblings(SERVICE_SIBLING_CLUSTERS, path).map((href) => ({
    href,
    ...SERVICE_CARD_COPY[href],
  }));
}

/** An existing related list plus the page's ring siblings, without duplicates. */
export function withServiceSiblings(
  path: string,
  related: readonly RelatedService[],
): RelatedService[] {
  const seen = new Set(related.map((card) => card.href));
  return [...related, ...serviceSiblings(path).filter((card) => !seen.has(card.href))];
}
// ---------------------------------------------------------------------------
// Niche wave 8 (2026-10-11, owner-approved): eight buyers with no page yet.
//
// Each entry adds two things the earlier Depth shape did not carry: the
// answer-first block rendered as the hero's question-shaped <h2>, and the
// honest proof line. Proof is only real portfolio work, named for what it is
// (a wedding is called a wedding, not a quinceañera). Prices only ever reach
// these strings through priceSentence(), i.e. lib/pricing.ts. Regulated duties
// (disclaimers, NMLS, Florida Bar review, carrier language, consent for
// minors) are stated as the client's, never Esteban's.
// ---------------------------------------------------------------------------

export type NicheWave8Depth = Depth & {
  answer: { question: string; answer: string };
  proof: { href: string; label: string; note: string };
};

const enStarter = () => priceSentence("en", "arranque").toLowerCase();
const enGrowth = () => priceSentence("en", "crecimiento").toLowerCase();
const enLocal = () => priceSentence("en", "presencia-local").toLowerCase();

export const PRECONSTRUCTION_DEPTH: NicheWave8Depth = {
  answer: {
    question: "Can renderings and sales-gallery footage become reels for a pre-construction launch?",
    answer:
      "Yes. Esteban edits the material a pre-construction project already has, such as approved renderings, animated fly-throughs, model-unit and sales-gallery footage, and on-camera clips from the sales team, into vertical reels for Instagram, TikTok and YouTube Shorts. Each reel can be delivered in a Spanish version and an English version, with captions in each language, so one launch can speak to local buyers and to buyers in Latin America. Renderings stay labelled as renderings, and the developer's team approves every claim, disclaimer and translation before anything is published. Editing is remote and is the core of the service. When the sales gallery or the model unit needs to be filmed, on-location filming in Miami-Dade or Broward is a paid add-on, scoped per project.",
  },
  proof: {
    href: "/services/real-estate-reels-video-editor-south-florida",
    label: "Watch the property reels",
    note: "Published proof for this kind of edit: six vertical property reels Esteban edited, shown on the real estate reels page, and My D'ler, a 3D video and mockups made for an app pitch. Neither is a pre-construction condo project.",
  },
  craftHeading: "What a pre-construction reel has to get right.",
  craft: [
    {
      title: "A rendering is not the building",
      detail:
        "Animated renderings and finished-unit footage look alike in a vertical crop. The edit keeps on-screen labels such as \"artist's rendering\" wherever your counsel requires them, so a buyer never mistakes a visualisation for a completed residence.",
    },
    {
      title: "Two languages, one cut",
      detail:
        "The Spanish and English versions share one picture edit, so the sales team is not managing two different stories. Captions, on-screen text and the call to action change per language, and your team signs off the final wording in both.",
    },
    {
      title: "Built for the sales cycle",
      detail:
        "A launch needs different pieces at different stages: the first teaser, amenity reels, a sales-gallery walkthrough, construction updates. Planning them as a series keeps the feed consistent while the project moves from presale to groundbreaking.",
    },
  ],
  faqHeading: "Questions before a developer sends launch material.",
  faqs: [
    {
      question: "What should a developer send for pre-construction reels?",
      answer:
        "The approved rendering files and animations at full resolution, any site or aerial footage you already own, sales-gallery and model-unit clips, the logo and brand guide, and the exact wording your legal team has cleared, including disclaimers. Add a short note naming the buyers each piece is for, local, domestic or international, so the Spanish and English versions are written for the right audience from the start.",
    },
    {
      question: "Who approves the disclaimers and the English and Spanish copy?",
      answer:
        "The developer does. Esteban places disclaimers, rendering labels and sales claims exactly as your counsel or marketing team supplies them, and he does not write legal language. He works Spanish first, with intermediate English, so the English captions should be checked by someone on your side before publishing. That review is part of the plan, and it keeps every version consistent with the sales materials.",
    },
    {
      question: "Can Esteban film the sales gallery or the model unit?",
      answer: `Yes, as a paid add-on scoped per project in Miami-Dade and Broward. The Local Presence package, ${enLocal()}, covers pre-production, filming on site and the edit afterwards. If you only need existing renderings and footage edited, the Starter package is ${enStarter()}, and a written quote confirms the scope.`,
    },
  ],
  relatedHeading: "Related services for property marketing.",
  related: [
    { title: "Real Estate Reels", detail: "Vertical edits of finished homes and listings, with six published examples.", href: "/services/real-estate-reels-video-editor-south-florida" },
    { title: "Architecture & Design Video", detail: "Video for studios and firms whose subject is the space itself.", href: "/services/architecture-design-video-miami" },
    { title: "Aerial Real Estate Editing", detail: "Editing supplied aerial footage into property pieces.", href: "/services/real-estate-drone-video-editing-miami" },
  ],
};

export const VACATION_RENTAL_DEPTH: NicheWave8Depth = {
  answer: {
    question: "What does a vacation rental tour reel need to show?",
    answer:
      "The rooms a guest will actually use, in the order they would walk through them, plus the one feature that justifies the booking: a pool, a water view, a short walk to the beach. Esteban edits footage from hosts and short-term rental managers into vertical tour reels for Instagram and TikTok, and horizontal cuts for a listing or a direct-booking site, with captions and room labels so the tour reads without sound. The edit shows the property as it is, with no added amenities, no borrowed views and no shots of guests. Editing is remote, so a host can film between stays with a phone. For managers with several units in Broward or Miami-Dade who want the filming handled as well, on-location filming is a paid add-on scoped per project.",
  },
  proof: {
    href: "/services/real-estate-reels-video-editor-south-florida",
    label: "Watch the property reels",
    note: "The six reels on the real estate reels page are property reels Esteban edited for listings, not for a vacation rental host. They show the pacing and vertical cropping described here.",
  },
  craftHeading: "What a short-term rental tour needs from the edit.",
  craft: [
    {
      title: "One walk, not a montage",
      detail:
        "Guests are checking whether the place fits their trip. A tour that moves from the door to the living room, kitchen, bedrooms and outdoor space answers that faster than a montage of pretty corners, and it doubles as a pre-arrival video.",
    },
    {
      title: "Accurate beats flattering",
      detail:
        "A very wide lens can make a bedroom look larger than it is, and a misleading tour turns into a disappointed review. The edit keeps proportions honest and labels each room, so the video sets expectations the stay can meet.",
    },
    {
      title: "Ready between turnovers",
      detail:
        "Filming happens after cleaning and before the next check-in, often in a short window. A fixed shot list, the same for every unit, lets a host or cleaner capture usable clips quickly and lets a manager compare properties side by side.",
    },
  ],
  faqHeading: "Questions before a host or manager sends footage.",
  faqs: [
    {
      question: "What should a host film for a vacation rental reel?",
      answer:
        "Film right after cleaning, with the lights on and blinds open: the entrance, a slow pass through each room at chest height, the kitchen, the bathrooms, the bedrooms with beds made and the outdoor space. Add the view, the pool or the walk to the beach at the time of day guests use them. Hold each shot for several seconds and keep the phone in one orientation for the whole set.",
    },
    {
      question: "Can one shoot cover several units for a property manager?",
      answer: `Yes, when the units are scheduled back to back between stays. On-location filming is a paid add-on scoped per project; the Local Presence package is ${enLocal()} and covers pre-production, filming and editing. Managers who already have footage can send it for remote editing on the Starter package, ${enStarter()}.`,
    },
    {
      question: "Is there published property work to look at?",
      answer:
        "Yes. The real estate reels page shows six vertical property reels Esteban edited: an outdoor opener, bedroom walkthroughs and other room-by-room pieces. They are listing-style reels, not vacation rental clients, and they show how a property tour is paced and cropped for a phone screen.",
    },
  ],
  relatedHeading: "Related services for property hosts and managers.",
  related: [
    { title: "Real Estate Reels", detail: "Room-by-room vertical edits, with six published property reels.", href: "/services/real-estate-reels-video-editor-south-florida" },
    { title: "Fort Lauderdale Reels Editor", detail: "Short vertical edits for local businesses near the base.", href: "/services/reels-editor-fort-lauderdale" },
    { title: "AI Real Estate Photo Enhancement", detail: "Listing photo clean-up that keeps the property truthful.", href: "/services/ai-real-estate-photo-enhancement" },
  ],
};

export const INSURANCE_AGENCY_DEPTH: NicheWave8Depth = {
  answer: {
    question: "What short videos can a Latino insurance agency publish in Spanish?",
    answer:
      "Explainers that answer one question clients already ask at the desk: what a deductible is, how a Marketplace plan differs from Medicaid, what changes when someone turns 65, which documents to bring to an appointment. Esteban edits agents' phone clips or filmed sessions into short Spanish videos, with English versions when the agency needs them, and plans the calendar around the fall enrollment season so the right topics go out before clients start calling. The agency supplies and approves every disclaimer and any carrier-required language. The videos explain and invite people to book an appointment; they do not promise enrollment, savings, approval or a particular plan. Editing and planning are remote, and filming at the agency is a paid add-on scoped per project.",
  },
  proof: {
    href: "/portfolio/healthy-smile",
    label: "Watch the clinic social videos",
    note: "Healthy Smile Miami is a set of social videos for a dental clinic that Esteban filmed on location, with sound, and edited, on assignment with an agency. It is not an insurance agency; it shows a local practice presented on camera.",
  },
  craftHeading: "What an insurance explainer needs to work.",
  craft: [
    {
      title: "One question per video",
      detail:
        "Insurance confuses people because every answer opens three more questions. A short video that handles one term or one situation is easier to follow and easier to find again, and a series of them becomes a library the agency can send by WhatsApp.",
    },
    {
      title: "Plain Spanish, approved wording",
      detail:
        "Clients want the explanation the way an agent gives it across the desk, not in policy language. The agent speaks naturally, the captions follow, and the agency checks that each sentence and every disclaimer matches what it is allowed to say.",
    },
    {
      title: "A calendar shaped by the season",
      detail:
        "Questions bunch up around the enrollment periods. Planning ahead means explainers are ready in early fall, reminders run during the windows, and the quieter months carry evergreen topics such as reading a bill or filing a claim.",
    },
  ],
  faqHeading: "Questions before an insurance agency sends footage.",
  faqs: [
    {
      question: "Who is responsible for compliance in insurance videos?",
      answer:
        "The agency and its carriers. Medicare-related marketing in particular has rules on what can be said and which disclaimers must appear, and those rules are applied through the agency's own compliance process. Esteban places the approved disclaimer text exactly as supplied and does not draft regulatory language or give insurance advice. Send the required wording with the footage so it is built into the edit, not added at the last minute.",
    },
    {
      question: "When should an agency start preparing enrollment-season videos?",
      answer:
        "Before the season starts. Medicare's annual enrollment period runs from October 15 to December 7, and Marketplace open enrollment for Florida residents usually opens on November 1, so explainers are most useful when they are filmed and approved by early fall. The agency should confirm each year's dates. The Growth plan's content calendar can map topics to those weeks without promising any enrollment numbers.",
    },
    {
      question: "Do agents need a studio to film explainers?",
      answer: `No. A quiet office, a phone at eye level and window light are enough for a clear explainer, and Esteban edits that footage remotely; the Starter package is ${enStarter()}. If the agency wants a batch of explainers filmed on site, that is a paid add-on scoped per project, with the Local Presence package at ${enLocal()}.`,
    },
  ],
  relatedHeading: "Related services for advisory businesses.",
  related: [
    { title: "Wealth Management Video", detail: "Video for advisors whose clients need trust before numbers.", href: "/services/wealth-management-video-production-miami" },
    { title: "Short-Form Video Editing", detail: "Vertical edits for Reels, TikTok and Shorts from supplied clips.", href: "/services/short-form-video-editor-miami" },
    { title: "Small Business Video", detail: "Video for a local office with one location and a booking page.", href: "/services/small-business-video-production-miami" },
  ],
};

export const MORTGAGE_BROKER_DEPTH: NicheWave8Depth = {
  answer: {
    question: "What videos help a Spanish-speaking loan officer build a personal brand?",
    answer:
      "Short videos in which the loan officer explains, in their own voice, the steps buyers find confusing: pre-qualification versus pre-approval, what documents a self-employed buyer needs, what an ITIN loan is, how closing costs work. Esteban edits those clips into vertical reels and longer explainers in Spanish, with English versions when the audience needs them, and helps plan a posting calendar so the account keeps a steady voice. Compliance stays with the client: the NMLS number, the company name and any disclosure the lender or compliance team requires are supplied and approved by the broker, and the edit places them exactly as written. Nothing promises a rate, an approval or a closing date. Filming at an office or an open house is a paid add-on scoped per project.",
  },
  proof: {
    href: "/portfolio/ml-colombia",
    label: "Watch a published social piece",
    note: "ML Colombia is a short social piece for a cosmetics brand Esteban founded and ran. It is not a mortgage account; it shows how he edits short content for a brand's own channels.",
  },
  craftHeading: "What a loan officer's videos have to get right.",
  craft: [
    {
      title: "The person is the brand",
      detail:
        "Borrowers choose a loan officer they trust before they compare products. Videos with the same face, the same tone and a consistent look make the officer recognisable, which matters more than any single post that travels far.",
    },
    {
      title: "Disclosures built into the template",
      detail:
        "Licensing details and required disclosures should not be squeezed in at the end. The edit reserves one consistent spot for them on every video, using the exact text the compliance team approves, so nothing goes out without it.",
    },
    {
      title: "Explain, do not quote",
      detail:
        "Rates move constantly and a number in a video goes out of date fast. Explainers focus on the process and the documents, and send viewers to book a call for figures, which keeps the content useful for months and publishes no terms nobody approved.",
    },
  ],
  faqHeading: "Questions before a loan officer sends footage.",
  faqs: [
    {
      question: "Who provides the NMLS number and disclosures on mortgage videos?",
      answer:
        "The broker or loan officer, together with the lender's compliance team. Esteban does not decide which disclosures apply or how they must be worded; he places the NMLS identifier, company name and any required text exactly as supplied, in the same position on every video. Send the approved wording with the first batch of footage, and flag any video that mentions a product or terms so your compliance team reviews it before it is published.",
    },
    {
      question: "Can a loan officer film everything with a phone?",
      answer: `Yes. A phone at eye level, window light and a lapel microphone give clean results, and the clips can be edited remotely on the Starter package, ${enStarter()}. For a monthly rhythm with a content plan and calendar, the Growth plan is ${enGrowth()}. Filming at an office or an open house is a paid add-on scoped per project.`,
    },
    {
      question: "Should mortgage videos be in Spanish, English or both?",
      answer:
        "In the language your clients use when they call you. Many South Florida loan officers serve Spanish-speaking families first, so Spanish-first videos with English captions, or separate English cuts, are common. Esteban works Spanish first, with intermediate English, so English scripts and captions should be reviewed by someone on your team before they go out.",
    },
  ],
  relatedHeading: "Related services for financial professionals.",
  related: [
    { title: "Wealth Management Video", detail: "Video for advisors and planners in Miami.", href: "/services/wealth-management-video-production-miami" },
    { title: "Real Estate Reels", detail: "Listing reels for the agents a loan officer works beside.", href: "/services/real-estate-reels-video-editor-south-florida" },
    { title: "Miami Reels Editor", detail: "Vertical edits of talking-head clips for Instagram and TikTok.", href: "/services/reels-editor-miami" },
  ],
};

export const IMMIGRATION_ATTORNEY_DEPTH: NicheWave8Depth = {
  answer: {
    question: "Why should an immigration law firm publish videos of its real attorneys?",
    answer:
      "Because Spanish-speaking families are being targeted by fake lawyer profiles, some with AI-generated faces and voices, and the clearest answer is to show the real, licensed attorney speaking. Esteban edits short educational reels in which the firm's own attorneys explain general topics, such as how to prepare for a consultation, which documents to keep, or why a notario público is not a lawyer in the United States. Each video names the attorney, so a viewer can look the name up in The Florida Bar's public member directory. The videos are general information, not legal advice, and the firm reviews and approves every script, caption and disclaimer under the Florida Bar's advertising rules. Editing is remote; filming at the office is a paid add-on scoped per project.",
  },
  proof: {
    href: "/portfolio/healthy-smile",
    label: "Watch the clinic social videos",
    note: "Healthy Smile Miami is a set of clinic social videos Esteban filmed on location with sound and edited, on assignment with an agency. It is not a law firm; it shows a professional practice presented on camera.",
  },
  craftHeading: "What an attorney's educational reel has to get right.",
  craft: [
    {
      title: "A face viewers can verify",
      detail:
        "The attorney appears on camera, says their own name and the firm's name, and the same person shows up across the series. That consistency is what separates a real practice from an impersonation account built on a stock face or a synthetic voice.",
    },
    {
      title: "General information, clearly framed",
      detail:
        "Each reel explains a process or a warning sign without advising anyone on their own case. On-screen text and the closing line make that distinction plain, and invite viewers to book a consultation rather than act on a video.",
    },
    {
      title: "The firm approves every word",
      detail:
        "Lawyer advertising in Florida is regulated, and the firm is responsible for compliance. Scripts, captions and disclaimers go through the firm's review before publishing, and the edit uses the approved wording exactly as supplied.",
    },
  ],
  faqHeading: "Questions before a law firm sends footage.",
  faqs: [
    {
      question: "Does Esteban give legal advice or check Florida Bar compliance?",
      answer:
        "No. He edits video. The firm and its attorneys decide what is said, apply The Florida Bar's lawyer advertising rules and approve every script, caption and disclaimer before anything is published. If a video needs a disclaimer, the firm supplies the exact wording and the edit places it as written. Topics stay general, so no viewer mistakes a reel for advice on their own case.",
    },
    {
      question: "Why do fake lawyer profiles matter to a real firm?",
      answer:
        "Impersonation accounts copy the look of legitimate firms, sometimes with AI-generated people, and the families they target often search in Spanish. A firm whose real attorneys appear by name, consistently, gives viewers something to compare against and something to verify. Videos can also teach the warning signs directly: requests for payment by gift card, promises that a case will certainly be approved, or a notario offering legal services.",
    },
    {
      question: "Can the attorneys film with a phone?",
      answer: `Yes. A quiet office, a phone at eye level and a lapel microphone are enough, and the footage is edited remotely; the Starter package is ${enStarter()}. If the firm wants a batch of videos filmed at the office in Miami-Dade or Broward, that is a paid add-on scoped per project, with the Local Presence package at ${enLocal()}.`,
    },
  ],
  relatedHeading: "Related services for law firms.",
  related: [
    { title: "Law Firm Video Production", detail: "Video for firms across practice areas in Miami.", href: "/services/law-firm-video-production-miami" },
    { title: "Interview Video Editing", detail: "Edits of seated interviews and talking-head recordings.", href: "/services/interview-video-editing-service" },
    { title: "Short-Form Video Editing", detail: "Vertical edits for Reels, TikTok and Shorts.", href: "/services/short-form-video-editor-miami" },
  ],
};

export const CHURCH_SERMON_DEPTH: NicheWave8Depth = {
  answer: {
    question: "How can a church turn a Sunday sermon into short clips?",
    answer:
      "By choosing the moments in the message that stand on their own, a clear point, a story, a verse explained, and cutting each into a vertical clip of under a minute with captions, so people can watch it during the week and share it. Esteban edits the church's own recording, from a livestream file or a camera, into clips for Instagram, Facebook, TikTok and YouTube Shorts, in Spanish, English or both, and can plan which clips go out on which days. The pastor or the media team approves the selection. Editing is remote, so the church only needs to share the recording. If the church wants a service or a special event filmed, on-location filming is a paid add-on scoped per project.",
  },
  proof: {
    href: "/portfolio/diana-jack",
    label: "Watch a long event cut into a highlight",
    note: "Diana & Jack is a wedding Esteban filmed and edited into a 20-minute film and a highlight trailer of about a minute and a half. It is not a church service; it shows a long event condensed into a short piece.",
  },
  craftHeading: "What a sermon clip needs from the edit.",
  craft: [
    {
      title: "The clip has to stand alone",
      detail:
        "A sermon builds over half an hour or more; a clip has seconds. The edit looks for passages that make sense without the build-up and trims the lead-in, so someone who never attended still understands the point.",
    },
    {
      title: "Captions for silent scrolling",
      detail:
        "Most clips are watched without sound. Burned-in captions in Spanish or English, with Bible references written out correctly, make the message readable on a phone in a waiting room or on a bus.",
    },
    {
      title: "Respect for the room",
      detail:
        "Worship moments and congregation shots involve people who did not agree to be on social media. The edit favours the pulpit and the stage, and leaves out identifiable members, especially children, unless the church has permission.",
    },
  ],
  faqHeading: "Questions before a church sends a recording.",
  faqs: [
    {
      question: "What recording does a church need to send?",
      answer:
        "The highest-quality file you have: the original camera or livestream recording, not a copy downloaded from social media, with the sermon audio taken from the soundboard if possible. Add the date, the sermon title and the passages or timestamps the pastor wants considered. If several services are recorded, say which one is the main version, so the clips come from the clearest take.",
    },
    {
      question: "Can the clips include worship music?",
      answer:
        "Only if the church has the rights to use it on social platforms. Songs performed in a service are often under copyright, and licences for streaming or reposting are the church's to hold and confirm. When that is not clear, the clips focus on the spoken message, which avoids most music claims and keeps the attention on the sermon.",
    },
    {
      question: "How much does sermon clip editing cost?",
      answer: `Remote editing starts with the Starter package, ${enStarter()}, and a church that wants a weekly rhythm with a content calendar can look at the Growth plan, ${enGrowth()}. Filming a service or an event on site is a paid add-on scoped per project. A written quote sets the number of clips and the scope.`,
    },
  ],
  relatedHeading: "Related services for long recordings.",
  related: [
    { title: "Content Repurposing", detail: "One long recording turned into the clips each platform wants.", href: "/services/content-repurposing-service-miami" },
    { title: "Video Podcast Editing", detail: "Multi-camera conversations edited for YouTube and clips.", href: "/services/video-podcast-editing-service-miami" },
    { title: "Webinar Clip Editing", detail: "Short clips cut from long talks and presentations.", href: "/services/webinar-clip-editing-service" },
  ],
};

export const QUINCEANERA_DEPTH: NicheWave8Depth = {
  answer: {
    question: "What does a quinceañera video include?",
    answer:
      "Usually two things: a highlight film of a few minutes that the family will watch and share for years, and short vertical edits for social media, such as the entrance, the waltz, the surprise dance and the toast. Esteban edits footage from the family's videographer, the photographer's video clips or guests' phones, and he can also film the celebration in person in Miami-Dade or Broward as a paid add-on scoped per project. The family decides what is published, since the quinceañera is a minor, and the venue's own filming rules apply. Music for public social posts has to be licensed or chosen from the platform's library, so the edit plans for that from the start. A written quote sets the deliverables before the date.",
  },
  proof: {
    href: "/portfolio/diana-jack",
    label: "Watch a published celebration film",
    note: "Diana & Jack is a wedding in Boston that Esteban filmed and edited: a 20-minute film of the day and a highlight trailer of about a minute and a half. It is a wedding, not a quinceañera, and shows how he covers a family celebration.",
  },
  craftHeading: "What a quinceañera edit has to get right.",
  craft: [
    {
      title: "The moments in order",
      detail:
        "A quinceañera has a running order: the arrival, the entrance with the court, the father-daughter waltz, the change of shoes, the surprise dance, the toast. The highlight follows that order, so the film tells the night the way the family lived it.",
    },
    {
      title: "Social edits the family approves",
      detail:
        "Short vertical clips for Instagram and TikTok are cut from the same footage. The family approves each one before it is shared, and guests or children who should not appear are left out.",
    },
    {
      title: "Music that will not be muted",
      detail:
        "A song in a private highlight may be blocked when posted publicly. The social edits use music the platform allows or tracks the family has rights to, while the private film can keep the songs from the night.",
    },
  ],
  faqHeading: "Questions before a family books the video.",
  faqs: [
    {
      question: "Can Esteban film the quinceañera in person?",
      answer: `Yes. On-location filming in Miami-Dade or Broward is a paid add-on scoped per project, based on the venue, the hours of coverage and the moments the family wants. The Local Presence package is ${enLocal()} and includes pre-production, filming and editing. If another videographer already films the event, Esteban can edit that footage remotely; the Starter package is ${enStarter()}.`,
    },
    {
      question: "Can guests' phone videos be edited into the highlight?",
      answer:
        "Yes, and they often catch moments a single camera misses, such as the grandparents' reaction or the dance floor from inside. Ask guests to send the original files through a shared folder, not videos downloaded from a chat app. Vertical and horizontal clips can be mixed, and the edit evens out colour and sound so the film still feels like one piece.",
    },
    {
      question: "When should the family book the edit?",
      answer:
        "Before the date, so the shot list, the deliverables and the songs are agreed while there is still time to plan. If the party has already happened, send the footage and a list of the moments that matter most; the edit is scoped from what was recorded. Delivery dates are confirmed in the written quote rather than promised in advance.",
    },
  ],
  relatedHeading: "Related services for celebrations and events.",
  related: [
    { title: "Event Video Editing", detail: "Recaps and highlights edited from event footage.", href: "/services/event-video-editing-miami" },
    { title: "Short-Form Video Editing", detail: "Vertical clips for Reels and TikTok from the same footage.", href: "/services/short-form-video-editor-miami" },
    { title: "Fort Lauderdale Reels Editor", detail: "Short vertical edits close to the Fort Lauderdale base.", href: "/services/reels-editor-fort-lauderdale" },
  ],
};

export const DANCE_MUSIC_STUDIO_DEPTH: NicheWave8Depth = {
  answer: {
    question: "What recurring video content works for dance studios and music academies?",
    answer:
      "Content that follows the calendar the studio already has: short clips from regular classes, progress pieces that show a student learning a routine or a song over a term, teacher introductions, enrollment reminders before each new session and a highlight of every recital or showcase. Esteban edits the studio's own phone footage into vertical reels and horizontal recaps and helps plan a monthly calendar, so posting does not depend on someone having a free afternoon. The same method suits other kids' activity businesses, such as martial arts, art or swim schools. Because most students are minors, the studio works only with footage that families have agreed to share. Editing is remote; filming a recital or a class on site is a paid add-on scoped per project.",
  },
  proof: {
    href: "/portfolio/diana-jack",
    label: "Watch a published event film",
    note: "Diana & Jack is a wedding Esteban filmed and edited into a full film and a highlight trailer. It is not a recital; it shows how a live event is covered and condensed. ML Colombia, a 24-second social piece, shows his short-form editing.",
  },
  craftHeading: "What studio content needs to keep going.",
  craft: [
    {
      title: "Classes are the steady supply",
      detail:
        "A recital happens a few times a year; classes happen every week. Short clips from class, filmed from the same corner of the room, keep the account active between big events and show parents what a normal session looks like.",
    },
    {
      title: "Permission before posting",
      detail:
        "Students are children, so the studio needs to know which families agreed to appear online. The edit uses only approved students, and wide or back-facing shots cover the rest, so a great moment is not lost to one missing form.",
    },
    {
      title: "Recitals as a highlight and a series",
      detail:
        "One recital can produce a full recording for families, a highlight of a few minutes and a set of short clips per group. Planning all three before the show means the camera captures what each piece needs.",
    },
  ],
  faqHeading: "Questions before a studio sends footage.",
  faqs: [
    {
      question: "What permission does a studio need to post students?",
      answer:
        "Written consent from a parent or guardian for each student who appears identifiably, kept by the studio; many studios add it to the enrollment form. Send Esteban a list of approved students, or mark which clips are cleared, and the edit uses only those, with wide shots or back-to-camera framing for the rest. The studio decides what is posted and where.",
    },
    {
      question: "Can Esteban film a recital?",
      answer: `Yes, as a paid add-on scoped per project in Miami-Dade or Broward, depending on the venue, the length of the show and whether the theatre allows filming. The Local Presence package is ${enLocal()}, with pre-production, filming and editing. If the studio or a parent already records the show, that footage can be edited remotely on the Starter package, ${enStarter()}.`,
    },
    {
      question: "What about the music in dance videos?",
      answer:
        "Choreography is usually set to commercial music, which may be blocked or muted in public social posts. For public clips, the studio can use songs from the platform's own library or tracks it has licensed, while the full recital recording for families is handled separately. Music schools face the same question with the pieces students perform, and public-domain repertoire avoids it.",
    },
  ],
  relatedHeading: "Related services for studios and class-based businesses.",
  related: [
    { title: "Fitness Trainer Video", detail: "Video for coaches and class-based fitness businesses.", href: "/services/fitness-trainer-video-production-miami" },
    { title: "Event Video Editing", detail: "Recital and showcase recaps edited from event footage.", href: "/services/event-video-editing-miami" },
    { title: "Social Media Video Batching", detail: "A month of clips edited in one batch.", href: "/services/social-media-video-batching-miami" },
  ],
};
