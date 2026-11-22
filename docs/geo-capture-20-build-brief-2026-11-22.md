# Esteban GEO Capture 20 — free-lane implementation brief

## Purpose

Implement every safe, owned-surface opportunity from the 20-item GEO council without inventing proof, publishing client information, sending outreach, creating generic city pages, or asserting citation/revenue outcomes.

## Evidence (re-read 2026-11-22)

- `pnpm seo:capture-score`: caption guide 47 impressions / 0 clicks / average position 8.0; Fort Lauderdale Reels 31 / 0 / 7.1; homepage query `editor de video fort lauderdale` 44 / 0 / 2.8.
- `~/.local/state/esteban-media-geo-citation/latest-successful.json`: fresh Gemini citations: FTL Reels EN 2/2, FTL Reels ES 2/2, Miami short-form 2/2. Orlando and remote supplied-footage are 0/2.
- Lead outcomes are `unmeasured`. FITCE/Muse is internal attribution only and requires written client permission before public mention.

## Deliver in one cohesive implementation

### A. Attribution and measurement (#2, #6, #20)

1. Persist a visitor-selected discovery source in the contact lead payload without breaking existing source semantics. Choices must include ChatGPT, Gemini/Google AI, Grok, Muse, Instagram, referral, Google search, and other.
2. Add an event-only delivery preference: original files, edited clips, or both. Persist it with the lead and emit an analytics event only through existing analytics conventions.
3. Add a dated, deterministic $0 receipt script or extend the existing GEO receipt tooling to report each engine separately; it must never infer a lead, qualification, booking, win, or revenue.

### B. Existing citation winners (#3, #4, #8, #9, #19)

4. Improve existing Fort Lauderdale Reels EN/ES and Miami short-form service routes. First screen must answer who the service is for, where/remote boundary, and the next exact action in short, factual language. Preserve Spanish-first / intermediate-English honesty.
5. Add only source-backed answer units and server-rendered details/FAQs. Do not add a new URL, invented client result, testimonial, price, turnaround, credential, availability, or a public FITCE claim.
6. Wire the existing contact path with route-specific provenance so outcome reads can distinguish the pages.

### C. Existing buyer tools (#7, #10, #11, #12, #14, #16)

7. Strengthen the caption guide with an immediate decision/checklist/handoff path using only existing factual material.
8. Keep the bilingual exhibitor message as a copyable micro-tool and measure copy/action with the site’s existing event conventions.
9. Improve the existing attendee-interview, pricing/filming, supplied-footage, and comparison buyer paths only if supported by existing canonical facts. No new standalone generic page.

### D. Guarded / preparation-only items (#1, #5, #13, #15, #17, #18)

10. Add or update a private, versioned operational ledger listing the factual-profile audit, homepage anomaly check, Orlando route decision, FITCE permission gate, and partner-handoff draft. These cannot publish/submit/contact anyone or claim current external profile state without a fresh authenticated read.

## Constraints

- Reuse shared Rail/common components. No hand-rolled dense interface.
- Answer-first text must be server-rendered; deeper content uses native `details`, never JS-gated copy.
- `llms.txt` is not a citation lever and is out of scope.
- Do not edit user work in the dirty canonical checkout. Worktree only.
- Update page dates with `pnpm lastmod:update` for any changed page content.
- Do not send a real form, email, or external profile update.

## Required gates

Run: `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, `pnpm rail-adoption:check`, `pnpm lastmod:update` (if relevant), and raw built/production-equivalent route checks. Add tests that prove persistence/analytics semantics and served answer content.

## Acceptance

- Existing routes, not new generic city routes, carry factual answer-first proof and provenance.
- Contact payload safely carries discovery source and event-delivery choice where supplied; no private data leaks to analytics.
- Receipt output separates citations/mentions from clicks/leads/revenue.
- Full gate suite passes. Changes are branch-local until independent review and real-boundary release verification.


PREVIOUS ATTEMPT FAILED AT THE ACCEPTANCE CHECK. Run this check FIRST, read the failure, fix it, then re-run it before reporting done:
{"boundary": "( test \"$(python3 \"$HOME/.claude/durable/cto-workspace-state.py\" --repo \"$CWD\")\" = \"$REVIEW_WORKSPACE_BEFORE\" ) && ( pnpm lint && pnpm typecheck && pnpm test && pnpm build && pnpm rail-adoption:check && python3 $HOME/.claude/durable/analytics-gate.py --repo /Users/gonzalo/code/_wt-esteban-geo-capture-20 )", "evidence": "                         103 kB\n  \u251c chunks/4f2090b9-e2e9220abe5d6d93.js                                        54.2 kB\n  \u251c chunks/69802-4c876ac872780701.js                                           46.6 kB\n  \u2514 other shared chunks (total)                                                2.07 kB\n\n\n\u0192 Middleware                                                                   33.9 kB\n\n\u25cb  (Static)   prerendered as static content\n\u25cf  (SSG)      prerendered as static HTML (uses generateStaticParams)\n\u0192  (Dynamic)  server-rendered on demand\n\n\u2009WARN\u2009 Unsupported engine: wanted: {\"node\":\">=20.9 <23\"} (current: {\"node\":\"v26.7.0\",\"pnpm\":\"10.14.0\"})\n\n> esteban-media@0.1.0 rail-adoption:check /Users/gonzalo/code/_wt-esteban-geo-capture-20\n> vitest run app/__tests__/rail-adoption.test.ts\n\n\u001b[33mThe CJS build of Vite's Node API is deprecated. See https://vite.dev/guide/troubleshooting.html#vite-cjs-node-api-deprecated for more details.\u001b[39m\n\n RUN  v2.1.9 /Users/gonzalo/code/_wt-esteban-geo-capture-20\n\n \u2713 app/__tests__/rail-adoption.test.ts (3 tests) 24ms\n\n Test Files  1 passed (1)\n      Tests  3 passed (3)\n   Start at  22:28:18\n   Duration  260ms (transform 31ms, setup 0ms, collect 15ms, tests 24ms, environment 0ms, prepare 71ms)\n\nANALYTICS-GATE: 17 emit site(s), 11 distinct event(s): ai_referral_visit, brand_moment_complete, brand_moment_shown, contact, cta_click, form_error, form_start, form_submit, lead, section_view, service_interest\nANALYTICS-GATE PASS\\nINDEPENDENT VERIFIER REJECTED THE WORK"}


PREVIOUS ATTEMPT FAILED AT THE ACCEPTANCE CHECK. Run this check FIRST, read the failure, fix it, then re-run it before reporting done:
{"boundary": "( test \"$(python3 \"$HOME/.claude/durable/cto-workspace-state.py\" --repo \"$CWD\")\" = \"$REVIEW_WORKSPACE_BEFORE\" ) && ( pnpm lint && pnpm typecheck && pnpm test && pnpm build && pnpm rail-adoption:check && python3 $HOME/.claude/durable/analytics-gate.py --repo /Users/gonzalo/code/_wt-esteban-geo-capture-20 )", "evidence": "                         103 kB\n  \u251c chunks/4f2090b9-e2e9220abe5d6d93.js                                        54.2 kB\n  \u251c chunks/69802-4c876ac872780701.js                                           46.6 kB\n  \u2514 other shared chunks (total)                                                2.07 kB\n\n\n\u0192 Middleware                                                                   33.9 kB\n\n\u25cb  (Static)   prerendered as static content\n\u25cf  (SSG)      prerendered as static HTML (uses generateStaticParams)\n\u0192  (Dynamic)  server-rendered on demand\n\n\u2009WARN\u2009 Unsupported engine: wanted: {\"node\":\">=20.9 <23\"} (current: {\"node\":\"v26.7.0\",\"pnpm\":\"10.14.0\"})\n\n> esteban-media@0.1.0 rail-adoption:check /Users/gonzalo/code/_wt-esteban-geo-capture-20\n> vitest run app/__tests__/rail-adoption.test.ts\n\n\u001b[33mThe CJS build of Vite's Node API is deprecated. See https://vite.dev/guide/troubleshooting.html#vite-cjs-node-api-deprecated for more details.\u001b[39m\n\n RUN  v2.1.9 /Users/gonzalo/code/_wt-esteban-geo-capture-20\n\n \u2713 app/__tests__/rail-adoption.test.ts (3 tests) 24ms\n\n Test Files  1 passed (1)\n      Tests  3 passed (3)\n   Start at  22:28:18\n   Duration  260ms (transform 31ms, setup 0ms, collect 15ms, tests 24ms, environment 0ms, prepare 71ms)\n\nANALYTICS-GATE: 17 emit site(s), 11 distinct event(s): ai_referral_visit, brand_moment_complete, brand_moment_shown, contact, cta_click, form_error, form_start, form_submit, lead, section_view, service_interest\nANALYTICS-GATE PASS\\nINDEPENDENT VERIFIER REJECTED THE WORK"}
