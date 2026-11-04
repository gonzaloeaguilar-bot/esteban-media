# Spec: make lead submits measurable and make a failed insert visible

Evidence (2026-11-03, read live): GA4 property 546162112 shows `lead_submit` last fired 2026-09-03 and 0 times in the last 28 days while `form_start` fired 17 times; `esteban_leads` has real rows on 10-07 and 10-14 with no matching GA4 event. `components/home-path-funnel.tsx` posts to `/api/lead` and never calls `trackLeadSubmit`. `app/api/lead/route.ts` returns HTTP 200 `success:true` when the Supabase insert fails and the email send succeeds; `app/__tests__/lead-route.test.ts` around line 89 asserts that.

Do, and nothing else:
1. On every lead path that reaches `/api/lead` success (contact form, home-path funnel, any service-page form that posts there), fire the GA4 `lead` event through the existing analytics helper (see `lib/analytics*` and the existing `trackLeadSubmit`), with params `lead_type`, `brand`, `page_type`, `locale`, `variant` per `~/.claude/durable/ANALYTICS_CONTRACT.md`. Keep `lead_submit` if it is already wired; do not invent new event names.
2. In `app/api/lead/route.ts`: when the DB insert fails, still send the email if that is current behaviour, but return `{ success: true, persisted: false, warning: "persistence_failed" }` and log at error level with the string `Lead persistence failed`. Client code that reads the response fires `form_error` (contract name) with `error_type: "persistence_failed"` in addition to `lead`.
3. Update `app/__tests__/lead-route.test.ts` so the failed-insert case asserts `persisted:false`, and add a test for home-path-funnel firing the lead event on success.
4. Do not touch pricing, titles, metadata, Spanish content, or any other page.

Acceptance: `pnpm vitest run app/__tests__/lead-route.test.ts && pnpm typecheck && npm test && python3 $HOME/.claude/durable/analytics-gate.py --repo .`
Commit as `fix(leads): fire lead event on every submit path and surface failed persistence`.
