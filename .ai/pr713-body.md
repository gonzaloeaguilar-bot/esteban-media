## Why
Competitor pages that AI engines cite for Fort Lauderdale video prompts show reviews on the money page and name real places; Esteban's three money pages showed neither (0 venue names, review block only on the homepage). The Google Business Profile merchant panel read on 2026-11-03 shows 19 reviews at 5.0; the site said 18. Source: `client-esteban-media/wiki/esteban-geo-seo-gap-fleet-2026-11-03.md` gap D27 and the competitor study.

## What
- Existing reviews band rendered server-side on `/services/reels-editor-fort-lauderdale`, `/services/video-production-fort-lauderdale`, `/services/short-form-video-editor-miami` (`components/geo-service-page.tsx`).
- One "Where Esteban has filmed or edited for" line per page naming only clients/places present in `lib/portfolio.ts` or `lib/case-studies.ts` (Fort Lauderdale Auto Sales, Port Everglades, Healthy Smile Miami, Bar Door Monkey, Caro Sells Miami). Visible text only; no `aggregateRating` or `Review` JSON-LD.
- `data/google-reviews.json` count 18 -> 19, readAt 2026-11-03.
- New test `app/__tests__/money-pages-proof-blocks.test.ts` (7 tests): band renders on the three routes and every venue named exists in the portfolio or case-study sources.
- Reels-editor page metadata untouched (PR #652 under T+14 read).

## Verification
- `pnpm typecheck` clean; `npm test` 196 files / 3807 tests pass; `analytics-gate.py` PASS; `pnpm rail-adoption:check` clean; CTO gate command acceptance passed.
- Real-boundary read: cache-busted curl of the three URLs after deploy must contain "Where Esteban has filmed or edited for"; re-probe citations 2026-11-06 and 2026-11-17.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

## Cortex quality evidence

```json
{
  "allowed": false,
  "mode": "release",
  "project": "esteban-media",
  "quality_result": {
    "debt_delta": "neutral",
    "deterministic_gate": "CI: validate=FAIL,mergeable=yes; attached by cto-pr-evidence-drain",
    "findings": [
      "second-party review lane returned no verdict; deterministic gates stand alone"
    ],
    "followup_tasks": [],
    "hard_stops": [],
    "missing_evidence": [
      "independent second-party verdict"
    ],
    "mode": "release",
    "next_safe_action": "Merge on green, then re-measure the page in the 28-day GSC window; utility-lookup-loop/measure.py closes the task only on a live impression or position change, never on the merge.",
    "project": "esteban-media",
    "reviewer_roles": {
      "builder": "blocked",
      "skeptic": "no_verdict",
      "taste": "deterministic-only"
    },
    "rubric_version": "utility-lookup-loop-2026-08-19",
    "scores": {},
    "status": "quality_failed"
  },
  "recorded": true,
  "required_action": "fix",
  "status": "quality_enforced_blocked",
  "target_id": "PR-713",
  "target_type": "pr"
}
```

## Cortex Quality Evidence
```json
{
  "allowed": true,
  "ledger_path": "/Users/gonzalo/.local/state/cortex-quality/ledger.jsonl",
  "mode": "pr",
  "project": "esteban-media",
  "quality_result": {
    "debt_delta": "net negative: one new regression test, no new dependencies.",
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
  "target_id": "PR-713",
  "target_type": "pr"
}
```
