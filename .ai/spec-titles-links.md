# Spec: Spanish snippet fixes, brand title, and ES-hub internal links (titles/meta/links only)

Evidence: Search Console 2026-10-05..11-02 (`.ai/seo-lead-report.md` has the per-gap rows and the exact proposed title/meta text).
- "editor de video fort lauderdale" 22 impr pos 3.2, "editor de video miami" 5 @4.2, "edición de video en fort lauderdale" 3 @3.3: all land on the ENGLISH homepage, 0 clicks. `/es/editor-de-video-fort-lauderdale` is 404.
- Brand query: 34 of 148 impressions land on `/daily-publish-prompt`, `/pricing/starter`, service pages; home title ends "| Esteban Moreno" without "Media".
- "editor de reels fort lauderdale": EN page 22 impr pos 10.0, ES page `/es/editor-de-reels-fort-lauderdale` 2 impr pos 57 with an exact-match title. The ES page lacks internal links.
- "editor de reels miami" 6 @11.5 and "editor de youtube miami" 4 @16 hit `/services/short-form-video-editor-miami`.
- "editora vídeo freelance" 6 @44 and "video para eventos florida" 4 @53: titles lack the terms.
- "video editing services columbia" 8 @67.5 on `/services/remote-video-editing-colombia`.

Do, using the exact title/meta strings in `.ai/seo-lead-report.md` (gaps 1, 2, 3, 6, 9, 10):
1. Homepage `app/(english)/page.tsx` metadata: title becomes "Fort Lauderdale Video Production & Editing | Esteban Moreno Media" and the description gains a Spanish clause ("Editor de video en Fort Lauderdale y Miami").
2. `/es` landing metadata: title "Editor de Video en Fort Lauderdale | Esteban Moreno Media"; add a visible link to `/es/editor-de-video-miami` in its first section.
3. Add three internal links with exact-match anchors "editor de reels Fort Lauderdale" to `/es/editor-de-reels-fort-lauderdale` from the ES hub pages (`/es`, `/es/editor-de-reels-miami`, `/es/editor-de-video-miami`), and two links with anchor "editor de reels Miami" to `/es/editor-de-reels-miami` from `/es` and `/es/editor-de-video-corto-para-redes-miami`. Edit `lib/spanish-site.ts` content where those pages are defined.
4. `/services/short-form-video-editor-miami` title adds "YouTube Shorts" (read commit 55781bde first; keep its FAQ untouched).
5. Title/meta only for `/es/guias/editor-de-video-freelance-vs-agencia-de-postproduccion`, `/es/videografo-para-eventos-corporativos-fort-lauderdale`, `/services/remote-video-editing-colombia` per the report.
6. Do NOT change `/services/reels-editor-fort-lauderdale` (PR #652 is under a T+14 read until 2026-11-11). Do not add pages. Do not change prices or body copy beyond the link sentences.
7. Run `pnpm lastmod:update` so `config/page-lastmod.json` reflects the touched pages.

Acceptance: `pnpm typecheck && npm test && python3 $HOME/.claude/durable/analytics-gate.py --repo . && pnpm rail-adoption:check`
Commit as `feat(seo): Spanish snippet fixes, brand title, ES-hub internal links`.
