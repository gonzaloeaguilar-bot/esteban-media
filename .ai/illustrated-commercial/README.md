# Illustrated commercial sections — 2026-10-03

The owner rejected the text-only audience cards and oversized monthly-plan tables, accepted illustrations, reviewed the rendered concept, then requested “Push”. This change carries that composition into the English and Spanish site.

- Reuses the pinned RailPlaybill, RailPlayer, RailSegmented and RailPrice components. Esteban-specific artwork, layout and editing demonstration live in the consumer; no vendored files change.
- Three concept illustrations are explicitly labeled. The business player opens the existing Bar Door Monkey video after a click; Homeowners links to the existing localized project.
- Each audience keeps its prior destination, data-cta identifier and original description in native details.
- Monthly prices, property counts, deliverables, conditions and WhatsApp messages still come from lib/pricing.ts and lib/real-estate-plans.ts. All three plans render in HTML, and remain visible without JavaScript; hydration enables the compact selector.
- Source assets were generated for this request. prompts.json records the prompts and assets.json records source/output hashes. WebP encoding preserves the complete 1536 by 1024 composition.

The Spanish pricing text snapshot intentionally changes only es/precios.html: the new heading/illustration labels and repeated per-plan inclusions replace numbered black mastheads. The exact href set and JSON-LD hash match the previous fixture. No other snapshot or parity rule changes. SSR regression tests independently check all prior terms, source prices, links and exact WhatsApp text.

Verification: pnpm check with Node 22 passes (943 tests plus 3 adoption checks, production build, lint/typecheck and all 90 parity routes). Browser checks exercise Chromium/WebKit at 375x667, 390x844 and 1440x1000; plan changes, details, Spanish, video facade, editing animation/reduced motion and no-JS. Scoped axe scans pass both collapsed and expanded. The quote button is visible and hit-testable above the fixed mobile dock. Raw HTTP HTML serves all plans and terms on /, /es, /pricing and /es/precios.

Evidence directory: /Users/gonzalo/code/esteban-visual-preview-20261003/evidence/production. Whole-homepage human-consumption audit remains red for findings outside these sections; scoped accessibility passes. Local analytics is suppressed by the existing canonical-host policy, so live click requests are verified after deployment. Claude specification dispatch encountered expired OAuth (zero model tokens); no Claude approval is claimed. Antigravity independently reviewed the rendered candidate and returned REVIEW_VERDICT: APPROVE. A separate Chrome/axe read of the existing live homepage reproduces the same two whole-page warnings (rating aria attribute and small-element contrast). Final production status is recorded in the project vault note.
