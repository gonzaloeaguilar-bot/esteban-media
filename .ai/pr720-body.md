## Why
Perplexity Sonar cites estebanmorenomedia.com most reliably on Spanish prompts (2026-11-03: reels-editor-ftl-es 2/2 runs vs the English twin 0/2) and, asked directly what would make it cite the site on "who is a good Instagram Reels editor in Fort Lauderdale", answered: one sentence combining the business name, Fort Lauderdale and Instagram Reels editing. PR #712 shipped English answer-first openers on 8 niche pages; their Spanish twins still carried the generic opener. Tracker: `client-esteban-media/wiki/esteban-geo-ten-moves-plan-2026-11-04.md` move 2.

## What
- Spanish answer-first openers (100-180 words, one price fact from `lib/pricing.ts`) on the 8 hreflang twins in `lib/spanish-site.ts`: webinar clips, product demo, Amazon product video, crowdfunding, UGC ad variations, video podcast, executive interview, Doral.
- First body sentence on both reels pages: "Esteban Moreno Media provides Instagram Reels editing for Fort Lauderdale businesses." and "Esteban Moreno Media ofrece edición de Instagram Reels para negocios en Fort Lauderdale." Metadata untouched.
- `app/__tests__/niche-openers-distinct.test.ts` extended to the Spanish openers and the two sentences (4 tests).
- `config/page-lastmod.json` refreshed (9 routes).

## Verification
- `pnpm typecheck` clean; `pnpm vitest run app/__tests__/niche-openers-distinct.test.ts` 4/4; `analytics-gate.py` PASS; `pnpm rail-adoption:check` clean; CTO gate acceptance ran `npm test` (198 files / 3,813 tests), record `~/.claude/state/cto-decisions/20261104T151851Z-cto-geo-lead-esteban-media-*.json`.
- Real-boundary read after deploy: `curl` of `/es/editor-de-reels-fort-lauderdale` contains the Spanish sentence; Thursday re-probe 2026-11-06 and T+14 on 2026-11-17.

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
  "target_id": "PR-720",
  "target_type": "pr"
}
```
