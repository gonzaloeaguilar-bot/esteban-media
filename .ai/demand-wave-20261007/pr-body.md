## Summary

The pacing calculator described a word-count estimate as exact timing and had no crawlable explanation of its limits. Both existing language pages now include three closed native FAQ answers and matching FAQPage schema covering the formula, pauses/silent shots, and checking the script aloud. The introductory copy now calls the result an estimate. Reuses the pinned RailFaq and shared schema builder.

**Move class 1 — content depth + FAQ:** authenticated Search Console final web data for 2026-09-07 through 2026-10-04 gives `/es/calculadora-de-ritmo-de-video` **21 impressions, 0 clicks, position 7.380952**. Read on 2026-10-07. This is page-level evidence; no exposed query or measured uplift is claimed.

## Production and business impact

- [x] Production behavior changes are described above.
- [x] Public explanations are verified against the existing calculator implementation and a rendered calculation.
- Source: `components/daily-script-pacing-calculator.tsx` computes rounded word count / selected WPM * 60. Browser input of 60 words at 120 WPM returns 30s.
- EN/ES parity maintained. No new URL, redirect, noindex, metadata, price, client proof, contact, or service-scope change. The sitemap remains 277 URLs.

## Validation

- [x] `pnpm check`: lint and typecheck pass; 102 files / 1,078 tests pass; production build generates 342 pages; text parity passes for 90 routes; shared-kit/adoption checks pass.
- [x] `git diff --check`.
- [x] New regression tests require native closed disclosures, raw server-rendered answers, matching schema, and truthful estimator wording.
- [x] Chrome at 375x667, 390x844 and 1440x900 in EN/ES: touch/keyboard disclosure controls, no horizontal overflow, reduced motion, zero scoped WCAG axe violations. Two additional no-JavaScript checks preserve answer/schema parity.
- [x] Served HTTP checks for both changed routes: answers, update date and canonical contact links. Linked production service pages return HTTP 200 with correct canonicals and contacts; mobile clicks navigate to the correct EN/ES routes above the bottom dock.
- [x] Uses existing shared components without modifying the vendor copy.

## Review and delivery boundary

Draft, unmerged. Independent Antigravity craft review and Claude fidelity verification are requested from the top-level coordinator. The separate portfolio human-consumption command exited before page inspection because its `js-yaml` dependency is missing; it is not marked passed. The focused browser/axe checks above completed.

GitHub currently reports this repository as public, contrary to its private-repository instruction. Raw analytics exports and internal dispatch artifacts remain local; the coordinator must reconcile that mismatch. The Obsidian handoff is prepared locally because this bounded provider has a workspace-only write restriction.

After review and release, verify both production pages, submit the changed URLs to IndexNow, then compare exact-page final GSC windows at T+14 and T+28. Low samples remain inconclusive. No independent review, deployment or business effect is claimed here.

## Cortex Quality Enforcement

Review pending. The review-pending quality payload is `.cortex/quality-payloads/PR-295.json`, using the PR-143 structure with the required fields duplicated at top level and under evidence. No passed enforcement record is asserted before the coordinator records it.
