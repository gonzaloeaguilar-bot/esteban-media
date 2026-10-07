# Lead persistence implementation and verification — 2026-10-07

Status: built and tested locally; uncommitted; not deployed or verified against production.

## Context consumed

- Worktree: `/Users/gonzalo/code/esteban-lead-persist-lane-esteban-media-lead-api-route`.
- Actual branch: `lane/esteban-media-lead-api-route`; base HEAD `c1c3455e12205d8bfdab1880352fd31f0acab005`. Preserved the dispatcher's isolated branch.
- Graph read: `/Users/gonzalo/code/esteban-lead-persist/graphify-out/graph.json`. Its route edges identify `lib/lead-responder.ts` validation/summary/ID generation and `lib/cdp-event.ts` as dependencies, plus lead analytics and responder tests. The implementation preserves those interfaces.
- Shared packet read: `/Users/gonzalo/.claude/state/cto-context-packets/20261007T162305Z-cto-dev-lead-esteban-media-1791390186906427000-18755-ab99f9ec4ac574dc.json`; verified SHA-256 `35725e8e749f06be0caedd5d097579674180d89311ad94eadbf6833b4f624236`. Capability labs remain observation-only and unused.
- Read project instructions, current handoff, project hot/index/agent notes and the prior lead-loss incident note. Those notes provide context, not current production evidence.
- Fresh source inspection found Resend already checked `response.ok` for its status log; the defect was that the route still returned 200 regardless, and had no durable storage.

## Behavior

- `buildLeadRow` maps every specified snake_case column; trims/nulls text, caps free text at 2,000, email/user-agent at 200, defaults locale to EN and stores integer scores or null.
- `insertLead` reads server configuration on each call, strips URL trailing slashes, POSTs with service authorization and `return=representation`, and requires a nonempty returned ID. Missing configuration, HTTP/malformed responses, and network/timeout failures return structured results. Fetch has an eight-second timeout.
- The route attempts storage before email. Persisted leads return the database row ID. Email is optional and checked for acceptance. Only accepted email can rescue failed storage; otherwise the route returns a localized 503 with direct-contact instructions. JSON parse errors and non-object payloads return 400 before any outbound request.
- `markEmailSent` PATCHes only the encoded ID after both persistence and email acceptance. Bookkeeping failures never turn a received lead into a failed request.
- Only `x-esteban-test: 1` marks a stored row as a test. Rejected submissions do not emit a success CDP event. Failure logs contain reason/status, not upstream bodies, credentials or submitted text.
- Server variables: `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`. Optional notifier variables remain `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`, `RESEND_FROM_EMAIL`. No environment example/sample exists in this worktree, so none was changed or invented.

## Executed checks

| Command | Result | Local log |
| --- | --- | --- |
| `npx --no-install vitest run app/__tests__/lead-store.test.ts app/__tests__/lead-route.test.ts app/__tests__/lead-submit-analytics.test.ts` | PASS, 64 tests / 3 files | `.ai/lead-persistence-targeted.log` |
| `npx --no-install tsc --noEmit` | PASS, exit 0 | `.ai/lead-persistence-typecheck.log` |
| `npm test` (package script is `vitest run`, the full requested suite) | PASS, 1,131 tests / 103 files | `.ai/lead-persistence-full-tests.log` |
| `npx --no-install eslint lib/lead-store.ts app/api/lead/route.ts app/__tests__/lead-store.test.ts app/__tests__/lead-route.test.ts` | PASS, exit 0 | `.ai/lead-persistence-lint.log` |

Setup: the worktree initially lacked `node_modules`, so initial runners failed before test discovery. Copied an independent local dependency tree from `esteban-geo-gaps` after verifying both `pnpm-lock.yaml` files have SHA-256 `69f31017fe1d6c90c4415c06c6e821652764b71e83f33c910285a54e4b5ea234`. No dependency manifest/lock changes. Typecheck initially caught missing `NODE_ENV` in injected test environments; corrected the fixtures and all subsequent checks passed. Vite emits its existing CJS API deprecation warning.

The new tests mock fetch; they make no real Supabase or Resend requests. They cover both delivery outcomes, ordering while storage is pending, malformed successful database responses, missing configuration, rejection/timeout handling, status marking, limits/null normalization, invalid inputs, localized errors and log privacy. No UI component changed, so visual acceptance is outside this repair.

## Next-role request to the owning coordinator

Before incident closure, `cto-dev-lead` should dispatch the independent Antigravity review and Claude/`cto-qa-lead` verification as sibling calls. This bounded provider did not invoke additional providers.

The coordinator then owns required release gates, environment verification, deployment and one authorized test submission with `x-esteban-test: 1`, followed by a database readback matching the returned ID, `is_test` and submitted fields. Confirm notification bookkeeping if the notifier is configured. Unit acceptance does not establish live table permissions, configuration, persistence or delivery.

Due: in the coordinator's current delivery session, before reporting the incident fixed. Copy the verified findings to the project durable note, `esteban-media-hot.md` and project registry after real-boundary verification. These external writes are outside this dispatch's worktree-only permission scope.
