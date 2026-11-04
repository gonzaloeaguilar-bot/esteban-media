# Spec: proof above the fold on the three money pages (reviews + real venues), facts only

Evidence (2026-11-03, `.ai/competitor-report.md` sections 3-4): competitor pages that AI engines cite for Fort Lauderdale video prompts show reviews on the money page and name real venues (Mark Studios: Las Olas, Bahia Mar, Port Everglades). Esteban's money pages show neither: 0 venue names, review block only on the homepage. The Google Business Profile merchant panel read today shows 19 reviews at 5.0; the homepage copy says 18.

Money pages:
- /services/reels-editor-fort-lauderdale (do NOT change its metadata title/description; PR #652 is under a T+14 read)
- /services/video-production-fort-lauderdale
- /services/short-form-video-editor-miami

Do, and nothing else:
1. Reuse the existing homepage review block component (find it by grepping for "public reviews on Google") and render it on the three pages directly under the hero/first answer, server-side (no client-only mount). Update the visible count from 18 to 19 wherever the site states it, with a single source constant if one exists. Do NOT add `aggregateRating` or `Review` JSON-LD; visible text only.
2. Add one short "Where Esteban has filmed or edited for" line per page naming ONLY places that appear in `lib/case-studies.ts` or `lib/portfolio.ts` (grep for `location:` and venue names). If fewer than two real places exist for a page's niche, omit the line on that page rather than invent one. List the places you used and their source line in the commit message.
3. Add a regression test that the review block renders in the served HTML of the three routes and that any venue named appears in `lib/case-studies.ts` or `lib/portfolio.ts`.
4. Run `pnpm lastmod:update`.

Acceptance: `pnpm typecheck && npm test && python3 $HOME/.claude/durable/analytics-gate.py --repo . && pnpm rail-adoption:check`
Commit as `feat(geo): review and venue proof blocks on three money pages`.
