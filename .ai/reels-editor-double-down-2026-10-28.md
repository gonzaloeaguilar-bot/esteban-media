# Double down on the Reels editor pages and the caption guide (SEO, no new pages)

Worktree: /Users/gonzalo/code/esteban-media-reels-dd (branch feat/reels-editor-ftl-double-down, from origin/main).
Scope ONLY: the EN page `app/(english)/services/reels-editor-fort-lauderdale/page.tsx`, its ES twin `app/(spanish)/es/editor-de-reels-fort-lauderdale/page.tsx`, the EN caption guide (find it with `grep -rl best-caption-styles-for-instagram-reels app lib content`) and its ES twin (`mejores-estilos-de-subtitulos-para-reels`), plus `lib/language-routes.ts` only if the EN/ES pair is missing there. No new routes, no new sections longer than 180 words, no price not present in `lib/pricing.ts`.

## Evidence (Search Console API, 2026-08-01..2026-10-28, dataState=all)
- `/services/reels-editor-fort-lauderdale`: `editor de reels fort lauderdale` 15 impr pos 11.5; `reel editor fort lauderdale` 11 impr pos 9.1; `editor de videos cortos fort lauderdale` 3 impr pos 2.0; 0 clicks on all.
- The Spanish query lands on the ENGLISH page even though `/es/editor-de-reels-fort-lauderdale` exists.
- Live title today: `Reels Editor Fort Lauderdale | Clear Social Videos`. H1: `Reels editor in Fort Lauderdale who turns your clips into clear social videos.`
- `/guides/best-caption-styles-for-instagram-reels`: 124 impressions at position 8.6 in the 28-day brief, 0 clicks. Live title: `Best Instagram Reel Caption Styles | Esteban Moreno Media`.

## Changes
1. EN Reels page metadata: title `Reel Editor in Fort Lauderdale | Reels Editing for Local Businesses | Esteban Moreno Media` (≤ 70 chars if you must trim: drop the brand). Description (≤ 155 chars): answer-first, names Fort Lauderdale, "reel editor", supplied footage, and the real starting price from `lib/pricing.ts` (read it; do not type a number from memory). Keep the H1; add "reel editor" wording to the first paragraph naturally.
2. Routing of the Spanish query: (a) confirm the EN/ES pair exists in `lib/language-routes.ts` and that both pages emit `alternates.languages` hreflang for each other (check `lib/site-metadata.ts` helpers; use the existing helper, do not hand-write link tags); (b) add one visible link near the top of the EN page: "¿Prefieres leerlo en español? Editor de reels en Fort Lauderdale" pointing to the ES twin, and the mirror link on the ES page; (c) ES twin title: `Editor de Reels en Fort Lauderdale | Edición de Reels para negocios | Esteban Moreno Media`, description in Spanish, answer-first, with the same price source.
3. Caption guide (EN + ES): title `Best Instagram Reel Caption Styles (2026): Readable Subtitles That Keep Viewers` / ES equivalent; description ≤ 155 chars answer-first. In the first 180 words add one contextual link to the Reels editor service page (EN→EN, ES→ES). Add a visible "Updated" date using the existing pattern on guide pages if one exists; otherwise skip (do not invent a component).
4. Record the before state (old title/description per page) in `.ai/reels-editor-double-down-before.json` for rollback.
5. Run `node scripts/indexnow-submit.mjs` only if it supports a URL list argument and does not require secrets absent locally; otherwise note it in the commit body and skip.

## Acceptance (must all pass; run them yourself)
- `pnpm vitest run $(git ls-files | grep -E "__tests__/.*(metadata|language-routes|reels|guide).*\.test\.tsx?$" | head -5 | tr "\n" " ")` or, if that glob is empty, the nearest metadata/route tests; then `pnpm typecheck`; then `npm test`.
- `pnpm build` must succeed (608-page build; it takes a few minutes).
- `git diff --check` clean. One commit: `feat(seo): reel editor Fort Lauderdale EN/ES titles, hreflang links and caption guide snippet`. Do not push.
