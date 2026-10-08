# Editor versus videographer depth: already merged

Decision: do not duplicate existing coverage. No website source changes or deployment.

Live evidence collected in this dispatch:
- `gh pr view 90 --json state,mergedAt,mergeCommit,title,files,url`: MERGED, 2026-08-14T21:55:47Z, b7a7e7b7872bcd089ed54d5c78ea1348ac6d1d27.
- `git merge-base --is-ancestor b7a7e7b7872bcd089ed54d5c78ea1348ac6d1d27 origin/main`: exit 0.
- `git show b7a7e7b7872bcd089ed54d5c78ea1348ac6d1d27 -- lib/guides.ts`: this PR introduced expanded role responsibilities, hiring scenarios, production pitfalls and briefing FAQs.
- `curl -fsSL --max-time 30 https://estebanmorenomedia.com/guides/video-editor-vs-videographer`: exit 0. Saved live-guide.html contains all four corresponding heading/question assertions and the expected self-canonical.
- GSC helper --site esteban --days 28 --dimensions date,page --source live-api succeeded for https://estebanmorenomedia.com/, 2026-08-07 through 2026-09-04. Response contains only 100 rows, so it is not an exhaustive page total and does not refute the brief. Brief ranking metrics remain unverified for its unspecified exact window.
- assert_move_boundary.sh with ALREADY_MERGED PR #90: PASS.

Graph scope: lib/guides.ts feeds shared guide rendering, English and Spanish guide routes and sitemap; no need to alter shared consumers. Shared context packet read; capability labs remained observation-only.

Coordinator handoff for Obsidian: record this duplicate candidate against PR #90 in esteban-media-hot.md and a durable note. Writes outside this isolated worktree are prohibited by this dispatch, so canonical notes were not changed. cto-dev-lead should use the existing merged coverage when selecting its next candidate; cto-qa-lead can verify the saved live assertions before another depth dispatch. No new ranking lift claimed.

OUTCOME: ALREADY_MERGED https://github.com/gonzaloeaguilar-bot/esteban-media/pull/90
