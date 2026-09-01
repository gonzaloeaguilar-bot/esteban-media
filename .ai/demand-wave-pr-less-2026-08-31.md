# Demand wave — PR-less result (2026-08-31)

## Decision

No pull request was opened for this wave. The live candidate feed supplied one
position-band content-depth candidate that initially appears eligible, but the
current source disproves the required "lacks depth" condition. Repeating the
previous portfolio depth or metadata moves would be stale remediation, not a
bounded demand improvement.

## Fresh evidence read this run

- `/Users/gonzalo/.local/state/esteban-media-seo-geo/candidates-2026-08-31.json`
  reports `/guides/video-editor-vs-videographer` at 31 impressions, 0 clicks,
  and average position `12.451612903225806` in its 28-day candidate window.
- The same artifact reports `/portfolio` at 48 impressions and average position
  `7.979166666666667`; it is not presented as a current depth candidate.
- `/Users/gonzalo/.local/state/esteban-media-seo-geo/review-2026-08-31.json`
  reports the property window `2026-08-01 .. 2026-08-28` with 2 clicks, 705
  impressions, and average position 29.1.
- `gh pr list --state all --search 'created:>=2026-08-30'` confirmed the prior
  demand-wave PR #152 was merged at `2026-09-01T01:23:15Z`; no yesterday-wave
  PR remains open.

## Source and recurrence audit

- `lib/guides.ts` defines reciprocal English and Spanish versions of the guide,
  each with four substantive sections and six visible FAQ entries. Existing
  `lib/__tests__/demand-pages.test.ts` covers both rendered routes, their
  cross-language companion links, their service/contact links, 900-word
  minimum, and FAQ schema visibility.
- `app/(english)/portfolio/page.tsx` has already received multiple depth moves
  (including PRs #102, #106, #112, and #113) and its near-top-10 metadata plus
  internal-intent work was shipped in PR #143. Its current title/meta remain
  regression-tested in `app/__tests__/ctr-near-top10-metadata.test.ts`.

## Next owned action

The SEO/GEO nightly collector should enrich its candidate record with a
machine-checkable existing-depth signal (section count, FAQ count, and recent
same-route demand-wave PRs) before classifying a route as `content_depth`.
Owner: `cto-seo-lead`; due: next daily collector run. This prevents repeated
content-padding proposals while preserving the current inventory and factual
claim guardrails.
