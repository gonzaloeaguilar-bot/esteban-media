# Favicon cache refresh — 2026-10-03

Owner reports the Vercel favicon again. Current live root assets already contain Esteban’s terracotta e; the head still declares the original /favicon.ico URL. This repair gives all browser icon declarations explicit brand-specific paths in both root locales while preserving byte-identical legacy assets for bookmarks/schema. scripts/generate-brand-icons.py owns both sets. Existing glyph legibility tests plus metadata/alias tests guard the recurrence. Browser cache is a plausible cause, not directly proven. Delivery and production evidence: Obsidian esteban-favicon-refresh-2026-10-03.

# Index-watch neutral URL follow-up — 2026-10-01

Branch: `feat/esteban-growth-watch-hardening`. This pass finishes Top 20 actions 18/19 by making the Search Console index-watch loop remember neutral/excluded URLs instead of only printing the current run.

- Added `neutralWatch` state to `scripts/search-console-index-watch.mjs`: each current `NEUTRAL` URL stores first seen, last seen, days neutral, coverage state, and last alert time.
- Added a seven-day warning path: if a URL stays neutral for 7+ days, the loop emits `neutral_seven_day_watch` and renders a "Neutral URLs older than 7 days" table in the managed Obsidian note.
- Added recovery cleanup: when a watched neutral URL returns to `PASS`, the neutral-watch record disappears while the existing `reindexed` alert path still fires.
- Added validation and backfill for older state files so the current 63 neutral URLs are brought under watch the next time `index-watch:status` or the scheduled loop reads state.
- Verification: `pnpm exec vitest run scripts/search-console-index-watch.test.mjs` passed with 28 tests, and `pnpm index-watch:status` reported `indexed pass 193 neutral 63 fail 0 unknown 0`, `pendingNotificationCount 0`, and `neutralWatchCount 63` from `/Users/gonzalo/.local/state/esteban-media-index-watch/latest.json`.

---

# Rail/common component adoption loop — 2026-10-01

Branch: `feat/esteban-rail-adoption-loop`. This pass creates the durable path for Esteban or his AI to contribute without hand-rolling dense page sections.

- Added `.ai/service-page-template.md` for AI contributors: new service-page depth should use `components/service-depth.tsx` (`ServiceCraft`, `ServiceFaqs`, `ServiceRelated`, `buildServiceFaqSchema`) and keep analytics hooks as `data-section` / `data-cta` instead of one-off markup.
- Added `app/__tests__/rail-adoption.test.ts` plus `pnpm rail-adoption:check`. The gate scans `app/**/page.tsx`, allows known shared renderers and legacy gaps, and blocks new dense public page files that do not use common components or an approved shared renderer.
- Migrated `/services/yacht-hospitality-video-fort-lauderdale` as the reference page. Depth copy now lives in `YACHT_HOSPITALITY_DEPTH` in `lib/service-depth-content.ts`, while the page renders shared service-depth components and FAQ JSON-LD through the shared builder.
- Added `.github/workflows/rail-adoption.yml` on a weekly Tuesday schedule plus manual dispatch, and added the adoption gate to `pnpm check`.
- Current audit snapshot: 192 `page.tsx` files; 95 direct Rail/shared/service-depth imports; 80 thin wrappers around shared renderers; 17 likely hand-rolled page files remaining. See `.ai/rail-common-component-adoption-audit-2026-10-01.md`.
- Verification: `pnpm check` exit 0 on 2026-10-01. It ran `rail-kit:check`, `rail-adoption:check` (3 tests), lint (46 existing warnings, 0 errors), typecheck, `vitest` (91 files / 907 tests), production build (323 static pages), and `text-parity` (87 routes keep every word, heading, link and schema blob).

---

# Real estate monthly plans — 2026-09-30

Branch: `feat/real-estate-monthly-plans`. New section under the four packages (home `/`, `/es`, `/pricing`, `/es/precios`) showing the three PUBLIC monthly plans (Essential / Plus / Premium). Figures live in `lib/pricing.ts` (`REAL_ESTATE_PLANS`), words in `lib/real-estate-plans.ts`.

- **Deliberately NOT published:** the photo ladder and the monthly size-surcharge ladder from the same guide. `app/__tests__/services-config.test.ts` blocks them because they are a client's negotiated terms and the repo is public. Do not add them, and do not edit that guard to make a change pass.
- The per-shoot rate card (`REAL_ESTATE_MEDIA`) is unchanged. The guide's "extra properties are billed at the prices above" line was left out because it refers to the private ladder, not the public card.
- `es/precios.html` in `spanish-niche-text-baseline.json` was refreshed (one line). The diff was verified purely additive: 0 words, headings, links or JSON-LD lost.

---

# Current bounded implementation — 2026-09-30

Branch: `feat/commercial-cda87cb0f3ffa017-1-r0930`. Answered commercial buyer query: "Which video editors in Fort Lauderdale should a small business hire for social media videos and reels? Compare specific providers and cite their websites." (Prompt ID: `43ff69cb33a8dd094cf93b7a10c211010ccde15c2e6ea8f8c346e77baa090e37`). Deepened `/guides/video-production-cost-fort-lauderdale` and `/es/guias/cuanto-cuesta-la-produccion-de-video-en-fort-lauderdale`, updated `/fort-lauderdale` landing page, verified all build/text-parity/analytics gates. PR opened for independent review.

---

# Engineering handoff — esteban-media

Last substantive session: **2026-09-24**, growth-starvation internal link reinforcement for `/es/areas` on 6 Spanish interactive tool pages.
Full record: `~/obsidian-wiki/client-esteban-media/wiki/esteban-sesion-rediseno-y-movimiento-2026-09-18.md`

## In production

`aefd808` 70 Spanish niche routes as cards · `adc592b` homepage portfolio rail ·
`dc976a0` the real cartel (tall poster cards, 293×375 ratio 1.28 on a phone, 68% photo).

## Open, deliberately unmerged

**PR #213 — motion** (entrance, page veil, scroll reveal, cartel shimmer). Gates green,
verified in Chromium + WebKit. Not merged because it runs before paint, touches every
page and can cover the viewport — the only change that day with no independent review.
Merge when Gonzalo says.

## The three gates this repo now carries

1. `pnpm rail-kit:check` — the vendored kit is sha256-pinned at `57a13c627458`.
   **Never edit `vendor/rail-kit/` directly.** Change it in `~/code/rail-kit`, run
   `node scripts/sync-rail-kit.mjs`, commit the diff. 14 other checkouts vendor it —
   run `node scripts/consumers-report.mjs` there before renaming anything.
2. `pnpm text-parity` — compares BUILT html against
   `app/__tests__/fixtures/spanish-niche-text-baseline.json`. Additions are ALLOWLISTED
   in `scripts/text-parity.mjs` (`ALLOWED_ADDITIONS`), not forbidden: adopting a
   component that speaks always adds its own UI strings, and you cannot add a picture
   without adding its alt. Anything outside the list fails. 12 negative controls in
   `app/__tests__/text-parity-gate.test.ts`.
3. `moonlight-public-identity.test.ts` — **the operator's name must not appear in
   source.** It failed three times on CSS comments attributing design decisions. Keep the
   rationale, write it unattributed.

## Things that will bite

- **The cartel is a SKIN, not the kit.** `.em-cartel` in `app/globals.css`, ported from
  `~/code/gonzalotech-artifacts/danielzea-site/css/components/cartel.css`. The kit is
  brand-neutral and text-first on purpose; the brand lives in the skin.
- **The stills are 16:9 and mostly website screenshots.** Do NOT crop them to a portrait
  frame — a 4:5 centre crop keeps 45% of the width and makes the headlines inside them
  illegible. The FRAME carries the poster proportion; the picture stays whole.
- **Next navigates on the client.** `documentLoadsDuringNav: 0`. Any pattern that relies
  on a second document — head-script handoffs, sessionStorage relays, prefetch-the-next-
  document — is dead code here. The veil is driven by `usePathname`.
- **Verify servers before measuring.** Two false readings came from a stale server and
  from a *different project* answering on a reused port. Start on a verified-free port
  and read the `<title>` before trusting any number.

## Blocked on the client, not on code

1. A scanned signature + one sentence in Esteban's own words → makes the entrance his.
2. Turnaround, price band, on-location availability → the TL;DR facts. Persona UAT found
   the copy hedges instead of answering, which reads as evasion to a human AND gives an
   answer engine nothing to cite. Same defect, two symptoms. Never invent these.

## Next, by value

1. "En corto" TL;DR blocks (needs the three facts above).
2. Hero CTA sits at y=765 on a 667px viewport — below the fold, untouched across four PRs.
3. ~65 English service pages are hand-written one-offs; extract a template before they
   can receive any of this.

## 2026-10-03 — Floating navigation safe-area repair

The shared floating bar inherited home-indicator padding inside its pill while cinema.css already included the inset in the outside lift. Adopted a narrow upstream rail-kit maintenance commit b7d62ca (from this consumer's existing pin), preserving all unrelated vendored components. The shared fix removes floating interior padding, preserves safe clearance outside, includes lift in the spacer and remeasures viewport changes. The hide transform now includes the lift so the shorter bar completely leaves the screen.

Verified: pnpm check EXIT 0 (939 tests, 3 adoption tests, 90-route text parity); shared browser fixture passes 375x667, 390x844 and 1280x800 with 0/34/0 simulated insets, original-defect negative control fails. Local built site: height59.5/padding0, external44/spacer104, hidden top868 in viewport844, Search opens and Escape closes. Physical iPhone unverified. Evidence: /Users/gonzalo/code/nav-safearea-evidence/. Claude OAuth expired; no Claude verification. Shared main's unrelated token-map audit failure is not part of this consumer backport. Production status to be recorded after PR checks.

## 2026-10-03 — Illustrated audience and monthly plans

Owner requested images/video/illustrations for the two plain commercial sections and approved the working illustrated concept with “Push”. The production implementation uses shared RailPlaybill/RailPlayer/RailSegmented/RailPrice, three labeled concept illustrations, a real published project video, optional original audience explanations and one monthly-plan selector. Prices, WhatsApp text, all inclusions and conditions remain sourced from the existing pricing modules. All plans remain available without JavaScript.

`pnpm check` passes with Node 22: 943 tests, 3 adoption checks, build/typecheck/lint and 90 parity routes. Only the authorized Spanish pricing snapshot changed; its link set and JSON-LD hash are unchanged. See `.ai/illustrated-commercial/README.md` and the project vault's `esteban-visual-commercial-cards-2026-10-03.md` for browser evidence, provider limits, review and delivery status. Other checkout work is preserved.


## 2026-10-03 — real-estate plan identity and interactive miniature illustrations
Owner correction after PR279: real-estate chapter needs explicit identity; every plan needs different creative; illustrations should animate and respond to touch. Branch `fix/real-estate-plan-distinction` preserves canonical prices/terms/links. Uses shared RailDisclosure/RailPlayer/RailSegmented/RailPrice; local brand composition, no vendor fork. Source artwork map has metadata/hash regression. Visual direction saved in shared reference index and project vault, owner explicitly likes its playful quality. Tests944/94 PASS; build PASS; only es/precios text fixture refreshed after identical links/JSON-LD assertion; parity90routes PASS. Chrome/WebKit375/390/1440 actual interactions, no-JS, reduced motion, raw four routes and scoped axe0 PASS. Production verification follows PR promotion; Claude lane unavailable, do not claim its approval. Evidence: ~/code/esteban-plan-distinction-20261003/evidence; durable note esteban-plan-distinction-2026-10-03.md.

# Illustrated à la carte — 2026-10-03
Owner requested extending the playful illustration treatment to single-project services, using the current workflow. ALaCarteSection composes pinned RailDisclosure with six distinct generated miniatures, service-specific finite touch effects and preparation guidance. Exact labels/notes/hrefs remain sourced from lib/packages.ts; direct links work without opening a card. EN/ES, no-JS visibility and reduced motion are covered. No commercial facts changed. Provenance: .ai/illustrated-commercial/carte-assets.json. Full local and production verification/review links are recorded in the project vault note esteban-a-la-carte-illustrations-2026-10-03.
