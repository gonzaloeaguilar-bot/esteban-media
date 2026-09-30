# Current bounded implementation — 2026-09-28

Branch: `feat/lang-switch-and-package-detail`. Language control, root preference middleware and eight package detail routes implemented. Review package: `.ai/evidence/README.md`; validation results and remaining review status are recorded there. No production deployment performed by this provider call. The coordinator owns independent review and external-vault updates under the workspace-only write restriction.

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
