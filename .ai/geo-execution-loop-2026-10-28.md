# Esteban GEO daily execution loop

## Problem and evidence

The live graph receipt at `~/.local/state/esteban-media-geo-graph/latest.json`
contains 12 commercial candidates. Eight have no missing graph edges and are
marked `unmeasured_outcome`. The existing `com.esteban-media.seo-geo-nightly`
job reports `dispatch_one_gsc_candidate`, but its downstream growth-starvation
loop considers previously touched URLs permanently exhausted. It does not
consume graph candidates, so its `2026-10-28` log ended `shipped=0 failed=0
skipped=0` while eligible graph candidates existed.

## Goal

Add a deterministic, draft-only-to-executor handoff that selects exactly one
eligible graph candidate per daily run and writes a source-bound action brief
for the existing governed delivery lane. This change must not edit a public
page, create a new route, publish content, send outreach, or invoke an LLM.

## Deliverables

1. `scripts/esteban-geo-execution-queue.mjs`
   - Read graph ledger from `--graph=<path>`; default to the live state path.
   - Read/write a durable queue state from `--state=<path>`; default under
     `~/.local/state/esteban-media-geo-execution/`.
   - Pick at most one candidate with: `proposed_action=improve_existing`,
     zero `missing_edges`, and `state=unmeasured_outcome`.
   - De-duplicate by `cluster_id` for 28 days after a successful dispatch
     receipt; do not treat a failure as dispatched.
   - Write a compact JSON action brief with query, target, proposed action,
     observed evidence statuses, citation-domain observations if present, exact
     acceptance intent, and an explicit no-invented-claims rule.
   - If nothing is eligible, write a terminal `no_eligible_candidate` receipt.
   - Never infer outcomes from source readiness and never turn `unmeasured`
     into zero.
2. Focused tests covering selection, 28-day de-duplication, failure retry,
   missing-edge exclusion and unmeasured preservation.
3. A launchd plist template in `launchd/` for a daily, $0 selection job. It
   must run the selector only, through `fleet-slot.sh`; it must not call an LLM
   or modify the site.
4. Document the handoff contract: the selector creates a brief; a governed
   executor must invoke `cto-dispatch.sh` in an isolated worktree, run checks,
   open a PR, independently review, merge only after gates, verify production,
   and write an outcome ledger row. No self-published content.

## Acceptance

- `pnpm vitest run scripts/esteban-geo-execution-queue.test.mjs`
- `node scripts/esteban-geo-execution-queue.mjs --graph=$HOME/.local/state/esteban-media-geo-graph/latest.json --state=/tmp/esteban-geo-execution-queue-test.json`
- `git diff --check`
