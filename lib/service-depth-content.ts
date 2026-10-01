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
