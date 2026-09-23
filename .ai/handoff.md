## In production (and ongoing starvation remediations)

### Spanish areas inbound internal links reinforcement — 2026-09-23
- Remediation target: `https://estebanmorenomedia.com/es/areas`
- Contextual internal links added across 6 Spanish interactive tool and resource surfaces:
  - `/es/calculadora-de-ritmo-de-video` (Daily script pacing calculator)
  - `/es/planificador-de-ganchos-de-video` (Daily hook planner)
  - `/es/planificador-de-tomas-de-video` (Daily shot list planner)
  - `/es/temporizador-de-guiones-de-video` (Daily script timer)
  - `/es/prompt-de-publicacion-diaria` (Daily publish prompt)
  - `/es/recursos/kit-video-social` (Social video kit)
- Each page now presents a contextual callout linking to `/es/areas` with anchor text referencing service areas in Fort Lauderdale, Broward, and Miami-Dade.
- Preserved frozen URL inventory, metadata, schema, and zero unsupported service claims.
- Added regression test assertions in `app/__tests__/customer-ranking-pages.test.ts`, `app/__tests__/daily-hook-planner.test.ts`, `app/__tests__/daily-script-pacing-calculator.test.ts`, `app/__tests__/daily-shot-list-planner.test.ts`, and `app/__tests__/daily-script-timer.test.ts`.


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
