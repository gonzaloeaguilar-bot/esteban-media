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
