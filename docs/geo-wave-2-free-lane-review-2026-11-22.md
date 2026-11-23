# Esteban GEO wave 2 — caption-guide source-preserving inquiry repair

Independently review the exact candidate at commit `96942ba1` after it was rebased onto `03762b1a`. Do not modify files.

The user-facing evidence is bounded: the settled Search Console window from 2026-10-22 through 2026-11-18 recorded 47 impressions, zero clicks, and average position 8.0 for the caption-styles guide. A newer main-branch repair adds a server-rendered link to verified public Google Business Profile reviews. Lead outcomes remain unmeasured.

The candidate retains the self-serve caption route, combines that verified review link with a new done-for-you action to `/contact?source=caption-guide#video-brief` (and Spanish equivalent), retains WhatsApp as a visibly secondary fallback, and exposes the existing contact brief as server-rendered native `<details>`. The client helper must only open that disclosure for the exact allowlisted source and fragment; it must not hide the contact content from raw HTML or invent any proof.

Review the supplied 390×844 capture as an affected-state mobile repair. Check whether the guide’s next-step choices are legible, whether the primary brief action and secondary WhatsApp fallback preserve clear hierarchy, and whether the change is visually consistent with the existing Esteban editorial system. Also inspect the exact diff for source attribution, bilingual parity, SSR/native-details behavior, and regression-test adequacy.

Return `APPROVE` only if the bounded repair is acceptable for release. Separate craft, behavior, and business outcome. Do not infer a citation, inquiry, booking, or revenue result from this change.
