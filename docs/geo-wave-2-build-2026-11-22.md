# Esteban GEO wave 2 — caption-guide attribution repair

Implement one small, existing-route conversion and measurement repair. Do not create new public URLs, external profiles, claims, price changes, or outreach.

Evidence: the latest settled Search Console capture has 47 caption-guide impressions, 0 clicks, average position 8.0; current citation observations are stale except selected existing Reels routes; lead outcomes remain unmeasured. The caption guide already has a server-rendered self-serve/done-for-you decision. Its done-for-you action currently goes directly to WhatsApp, which cannot persist the `caption-guide` source in the existing lead store.

Build:

1. Preserve the server-rendered caption guide decision and its existing self-serve action.
2. Make the done-for-you primary action open the existing contact page with the already allowlisted `source=caption-guide` and a fragment that opens the detailed video brief. Keep WhatsApp available as a clearly secondary, direct fallback; do not remove it.
3. Add the smallest reusable client-side mechanic needed for the existing contact route to open its native detailed-brief disclosure when that exact source/fragment is present. The detailed brief remains server-rendered in HTML; JavaScript may only open the disclosure.
4. Add focused tests for the outbound source URL, direct WhatsApp fallback, and disclosure semantics. Preserve analytics privacy: no typed fields to analytics and no new event vocabulary unless existing conventions require it.
5. Update lastmod for altered public copy/routes.

Acceptance: raw rendered HTML contains the caption-guide contact source path and native brief content; the existing short mobile decision is readable; tests/typecheck/lint/build/rail/analytics pass. No customer submission or external action.
