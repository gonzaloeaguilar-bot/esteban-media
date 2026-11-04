# Spec: Spanish twins of the niche openers + the one sentence Perplexity asked for

Evidence (2026-11-03): Perplexity Sonar cites estebanmorenomedia.com most reliably on Spanish prompts (reels-editor-ftl-es 2/2 runs, Spanish Miami editor cited) and, asked directly what would make it cite the site on "who is a good Instagram Reels editor in Fort Lauderdale", answered: a sentence combining business name + Fort Lauderdale + Instagram Reels editing in one place, e.g. "Esteban Moreno Media provides Instagram Reels editing for Fort Lauderdale businesses." PR #712 (branch feat/niche-answer-openers) adds English answer-first openers on 8 pages; their Spanish twins still carry the generic opener.

Do, and nothing else:
1. For each Spanish twin of the 8 pages in PR #712 (find them via the hreflang pairs in the sitemap or `lib/spanish-site.ts`: webinar clips, product demo, Amazon product video, crowdfunding, UGC ad variations, video podcast, executive interview, Doral), write a Spanish answer-first opener of 100-180 words that answers the niche question in the first sentence and carries the same price fact as the English twin, taken only from `lib/pricing.ts`. Natural Latin American Spanish, no machine-translation tone. If a Spanish twin does not exist for one, skip it and say so in the commit message; do not create pages.
2. On `/services/reels-editor-fort-lauderdale` add, in the body (not metadata), this exact sentence as the first sentence of the answer-first block or directly after it: "Esteban Moreno Media provides Instagram Reels editing for Fort Lauderdale businesses." And on `/es/editor-de-reels-fort-lauderdale`: "Esteban Moreno Media ofrece edición de Instagram Reels para negocios en Fort Lauderdale." Do not change either page's metadata title or description.
3. Extend the distinctness test to the Spanish openers (distinct from each other and from the Spanish generic text), and add a test that the two sentences in step 2 appear in the rendered HTML.
4. `pnpm lastmod:update`.
Note: base this on origin/main; PR #712 may land first. If it has, the English openers are already there; if not, do not re-implement them.

Acceptance: `pnpm typecheck && npm test && python3 $HOME/.claude/durable/analytics-gate.py --repo . && pnpm rail-adoption:check`
Commit as `feat(geo): Spanish niche openers and the Reels sentence on both reels pages`.
