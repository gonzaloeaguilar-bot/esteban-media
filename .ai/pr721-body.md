## Why
AI engines cite the page that holds the number. On 2026-11-03 both Perplexity Sonar and GPT-4o-mini with web cited estebanmorenomedia.com on "How much does a Reels editor cost in South Florida?", yet no page compared published market prices with a dated source per row. Move 5 in `client-esteban-media/wiki/esteban-geo-ten-moves-plan-2026-11-04.md`; sources in `attachments/geo-fleet-2026-11-03/price-index-sources.md` (21 rows re-fetched 2026-11-03, each with URL and VERIFIED/UNVERIFIED tier).

## What
- New guide pair: `/guides/reels-video-editing-prices-south-florida` and `/es/guias/precios-edicion-de-reels-y-video-sur-de-florida` (reciprocal hreflang) in `lib/guides.ts`.
- Answer-first opener with a number; full sources table (provider, service, price, unit, tier, source link, checked date; the two conflicting ZipIn rows kept and flagged); Esteban's ladder rendered from `lib/pricing.ts` constants, not literals.
- Question-shaped sections, depth in native `<details>`, FAQPage JSON-LD matching visible text, visible "Updated 2026-11-03" line.
- Linked from `/pricing`, `/es/precios` and the reels-editor Fort Lauderdale page. `config/page-lastmod.json` refreshed.
- New test `app/__tests__/reels-price-index-guide.test.ts`; `guides-routes`, `price-single-source`, `cohort-consolidation` tests updated for the new routes.

## Verification
- `pnpm typecheck` clean; `npm test` 199 files / 3,820 tests pass; `analytics-gate.py` PASS; `pnpm rail-adoption:check` clean.
- Independent review and Cortex quality block to follow before merge. Real-boundary read after deploy: `curl` of both URLs contains the table and the updated date; re-probe the reels-cost prompt on both engines 2026-11-06 and 2026-11-17.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

## Cortex Quality Evidence
```json
{
  "allowed": true,
  "ledger_path": "/Users/gonzalo/.local/state/cortex-quality/ledger.jsonl",
  "mode": "pr",
  "project": "esteban-media",
  "quality_result": {
    "debt_delta": "net negative or neutral.",
    "findings": [],
    "followup_tasks": [],
    "hard_stops": [],
    "missing_evidence": [],
    "mode": "pr",
    "next_safe_action": "Create a bounded follow-up task for any missing evidence, failed review role, hard stop, or debt increase before treating the work as sound.",
    "project": "esteban-media",
    "reviewer_roles": {
      "builder": "ok",
      "skeptic": "ok",
      "taste": "ok"
    },
    "rubric_version": "2026-06-06",
    "scores": {},
    "status": "quality_passed"
  },
  "recorded": true,
  "required_action": "none",
  "status": "quality_enforced_passed",
  "target_id": "PR-721",
  "target_type": "pr"
}
```
