# Lead Desk: record the inquiry channel and ask one origin question

Repo worktree: /Users/gonzalo/code/esteban-lead-desk-20261028 (branch codex/esteban-lead-desk-20261028).
Files in scope ONLY: lib/lead-desk.ts, lib/__tests__/lead-desk.test.ts, scripts/run-lead-desk.ts, docs/lead-desk.md.

## Why
On 2026-10-27/28 two real inquiries arrived (birthday party, real-estate listing). GA4 shows 0 form submits in 14 days and Search Console 0 clicks in 10 days, so nothing can say where they came from. The only "how did you find us" question lives in the website form, which they did not use. The Lead Desk must capture it on the email lane.

## Changes
1. `LeadFacts` gains `foundVia?: string`. `extractLeadFacts` fills it from the body with a tolerant regex covering EN and ES, e.g. "found you on Instagram", "saw you on Google", "ChatGPT recommended", "referred by", "los vi en Instagram", "me recomendó", "los encontré en Google". Store the normalized matched phrase (max 80 chars), never invent one.
2. `LeadDeskResult` gains `channel: "email"` (literal for this runner) and surfaces `facts.foundVia` in `ownerAlert.body` as a line `Found via: <value or "not stated">`.
3. `clientDraft.body`: when `foundVia` is absent, append exactly one short question before the sign-off, in the language of the inquiry (detect ES by the presence of common Spanish words like "hola", "gracias", "cumpleaños", "quisiera", "necesito"): EN "One quick question so I can serve you better: how did you hear about us?" / ES "Una pregunta rápida para atenderte mejor: ¿cómo nos encontraste?". When present, do not ask.
4. `scripts/run-lead-desk.ts`: the status entry gains `channel: result.channel` and `foundVia: result.facts.foundVia ?? null`. No new network calls. Still zero Gmail send endpoints.
5. Tests: add cases for (a) EN body with "found you on Instagram" -> foundVia set, no question asked, alert shows it; (b) ES body without origin -> Spanish question appended, alert says "not stated"; (c) status entry shape includes channel and foundVia (unit-test the pure helper if the runner is not unit-testable; otherwise skip the runner).
6. `docs/lead-desk.md`: one paragraph on the channel/foundVia fields and the single origin question.

## Acceptance
- `pnpm vitest run lib/__tests__/lead-desk.test.ts` passes.
- `pnpm typecheck` passes.
- `git diff --check` clean. Commit with message `feat(lead-desk): capture inquiry channel and ask one origin question`. Do not push.
