# Spec: Spanish twins of the niche openers + the one sentence Perplexity asked for

Evidence (2026-11-03): Perplexity Sonar cites estebanmorenomedia.com most reliably on Spanish prompts (reels-editor-ftl-es 2/2 runs) and, asked directly what would make it cite the site on "who is a good Instagram Reels editor in Fort Lauderdale", answered: a sentence combining business name + Fort Lauderdale + Instagram Reels editing in one place. PR #712 (merged 2026-11-04) added English answer-first openers on 8 pages (webinar clips, product demo, Amazon product video, crowdfunding, UGC ad variations, video podcast, executive interview, Doral); their Spanish twins still carry the generic opener.

Do, and nothing else:
1. For each Spanish twin of those 8 pages (find them via the hreflang pairs in the sitemap or lib/spanish-site.ts), write a Spanish answer-first opener of 100-180 words that answers the niche question in the first sentence and carries the same price fact as the English twin, taken only from lib/pricing.ts. Natural Latin American Spanish, no machine-translation tone. If a Spanish twin does not exist for one, skip it and say so in the commit message; do not create pages.
2. On /services/reels-editor-fort-lauderdale add, in the body (not metadata), the exact sentence "Esteban Moreno Media provides Instagram Reels editing for Fort Lauderdale businesses." as the first sentence of the answer-first block or directly after it. On /es/editor-de-reels-fort-lauderdale: "Esteban Moreno Media ofrece edición de Instagram Reels para negocios en Fort Lauderdale." Do not change either page's metadata title or description.
3. Extend app/__tests__/niche-openers-distinct.test.ts to the Spanish openers (distinct from each other and from the Spanish generic text), and add a test that the two sentences in step 2 appear in the rendered HTML.
4. Run pnpm lastmod:update.

Acceptance: pnpm typecheck && npm test && python3 $HOME/.claude/durable/analytics-gate.py --repo . && pnpm rail-adoption:check
Commit as: feat(geo): Spanish niche openers and the Reels sentence on both reels pages
