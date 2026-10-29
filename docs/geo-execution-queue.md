# Esteban GEO execution queue

`scripts/esteban-geo-execution-queue.mjs` is a daily, zero-cost selector. It reads the draft-only GEO graph and writes at most one source-bound action brief. It does not change a page, invoke an LLM, send outreach, or publish content.

The selector accepts only an `improve_existing` cluster that has no `missing_edges` and is marked `unmeasured_outcome`. It preserves observed and `unmeasured` evidence verbatim. It does not convert unavailable evidence into zero or claim a business outcome.

`dispatched[cluster_id]` is executor-owned durable state. A cluster is suppressed for 28 days only when it has a receipt with `status: "dispatched"` and a valid `at` timestamp. Failed or pending receipts remain eligible. The selector's `selector_receipt` explicitly records that selecting a cluster is not a dispatch success.

## Governed executor handoff

The brief is input to a governed executor, never an instruction to edit directly. The executor must:

1. Invoke `~/.claude/durable/cto-dispatch.sh` from an isolated worktree.
2. Make only a source-supported repair to the existing target or its source-bound internal links.
3. Run the project checks, obtain independent review, and open a pull request.
4. Merge only after required gates, verify the real production boundary, and write an outcome ledger row.
5. Record a successful `dispatched` receipt only after the governed handoff succeeds. A selector receipt, failure, draft, PR, or deployment alone is not that receipt.

No executor may self-publish content. The launchd template runs the selector through `fleet-slot.sh` only; it neither invokes an LLM nor modifies the site.
