## Why
On 2026-11-03 the first answer paragraph was byte-identical (md5 prefix 1d78d62c) on 8 service pages, and a live two-engine probe (Perplexity Sonar, GPT-4o-mini with web) cited none of them on their matching buyer prompts while citing the domain on 19 of 33 prompts elsewhere. Crawl is not the blocker (robots allows GPTBot/PerplexityBot, UA fetches return 200). Source: `client-esteban-media/wiki/esteban-geo-seo-gap-fleet-2026-11-03.md` gaps C16-C21.

## What
- Page-specific answer-first opener (100-180 words, one real price fact from `lib/pricing.ts`) on: webinar clips, product demo, Amazon product video, crowdfunding, UGC ad variations, video podcast, executive interview, Doral.
- Webinar page: "LinkedIn" in the heading and a link to `/services/executive-linkedin-video-series-miami`; off-niche proof links on webinar and product-demo now point to the portfolio index.
- Executive interview page states the on-location rate; Doral page states remote editing plus the travel boundary.
- New test `app/__tests__/niche-openers-distinct.test.ts`: the 8 rendered openers differ from each other and from the generic text.
- `config/page-lastmod.json` refreshed. Reels-editor page, homepage, pricing, Spanish twins and all metadata titles untouched.

## Verification
- `pnpm typecheck` clean; `pnpm vitest run app/__tests__/niche-openers-distinct.test.ts` 2 tests pass; `analytics-gate.py` PASS; `pnpm rail-adoption:check` clean; CTO gate ran `npm test` (acceptance passed), record `~/.claude/state/cto-decisions/20261104T000046Z-cto-geo-lead-esteban-media-*.json`.
- Real-boundary read: re-probe the 8 prompts, 2 runs per engine, on 2026-11-06 (Thursday loop) and 2026-11-17.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

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
  "target_id": "PR-712",
  "target_type": "pr"
}
```
