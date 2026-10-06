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
      title: "Social Media Video Batching",
      detail: "Turn one recording session or folder of clips into a planned set of posts.",
      href: "/services/social-media-video-batching-miami",
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
      title: "Ecommerce Product Video Editor",
      detail: "Product videos assembled from demos, phone clips, UGC, and brand assets.",
      href: "/services/ecommerce-product-video-editor-miami",
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
      title: "Real Estate Video Aventura",
      detail: "Video production and editing for Aventura real estate marketing.",
      href: "/services/real-estate-video-aventura-miami",
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
      title: "Ecommerce Product Video Editor",
      detail: "Product-page and ad-ready videos made from product demos and brand clips.",
      href: "/services/ecommerce-product-video-editor-miami",
    },
    {
      title: "Social Media Video Batching",
      detail: "Batch social edits from one folder of creator or founder footage.",
      href: "/services/social-media-video-batching-miami",
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
      title: "Short-Form Video Editing",
      detail: "Vertical edits with burned-in captions from footage you already shot.",
      href: "/services/short-form-video-editor-miami",
    },
    {
      title: "Social Video Batching",
      detail: "Turning one filming block into a stack of separate posts.",
      href: "/services/social-media-video-batching-miami",
    },
    {
      title: "YouTube Editing",
      detail: "Long-form structure for the channel the clips point back to.",
      href: "/services/youtube-video-editing-service-miami",
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
