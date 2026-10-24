# Free capture score

## Problem

Esteban needs a repeatable, zero-cost way to decide whether an existing search opportunity merits improvement. Generic keyword-difficulty vendors require paid external SERP or backlink data, and advertiser competition is not organic difficulty.

## Evidence

- `scripts/esteban-seo-measurement-report.mjs` already persists settled, authenticated Search Console query, page and query-page rows without changing Search Console.
- `/Users/gonzalo/.local/share/portfolio-ops/geo-citations.jsonl` records observed AI-answer citations. It is evidence of observations only, not traffic or a ranking factor.
- `/tmp/zens-ink-seo-package/zens_ink/kd.py` requires `SERPER_API_KEY`, so its numerical KD cannot be called free. Its open-source pattern—make inputs and scoring inspectable—is usable.

## Scope

Add a read-only Node script and focused tests. It must:

1. Read the existing Search Console measurement snapshot from the default local state directory or a supplied `--measurement` file.
2. Read a supplied citation ledger or the default local citation ledger.
3. Produce a transparent `0–10` capture score for query/page candidates using only settled GSC impressions, average position, CTR, and observed citation matches.
4. Label every input source and date; omit unavailable inputs instead of inventing values.
5. Never call a paid API, mutate external systems, write to production, expose tokens, or call an LLM.
6. Emit JSON for automation and a human-readable report for the Obsidian measurement note.

## Score

- Demand: 0–2 based on settled GSC impressions (1–9 = 1; 10+ = 2).
- Reachability: 0–3 based on settled average position (<=10 = 3; <=20 = 2; <=30 = 1).
- CTR opportunity: 0–1 when 10+ impressions and 0 clicks.
- Observed citation: 0–2 when matching completed ledger observations cite the owned domain (one observation = 1; two or more = 2).
- SERP resistance: explicitly `unmeasured`, worth 0 points until a separately sourced, reproducible SERP input exists.

The report must call this a **capture score**, never Keyword Difficulty or a prediction of ranking.

## Acceptance

- `pnpm vitest run scripts/free-capture-score.test.mjs` passes.
- `node scripts/free-capture-score.mjs --help` exits 0 and makes no network calls.
- Fixture output proves score arithmetic, citation matching, absence handling, and source labeling.
- `pnpm lint` and `pnpm typecheck` pass.
