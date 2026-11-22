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
