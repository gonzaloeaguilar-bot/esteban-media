# Spec: niche-specific answer-first openers on the 8 pages that share one boilerplate paragraph

Evidence (2026-11-03, `.ai/geo-lead-report.md` section "What I checked on the pages"): the "In short" opening block is byte-identical (md5 prefix 1d78d62c) on these 8 pages, and neither Perplexity Sonar nor GPT-4o-mini:online cited Esteban on their matching buyer prompts:
- /services/webinar-clip-editing-service
- /services/product-demo-video-production-miami
- /services/amazon-product-video-production-miami
- /services/crowdfunding-video-editor-miami
- /services/ugc-ad-variation-video-editing
- /services/video-podcast-editing-service-miami
- /services/executive-interview-videographer-miami
- /services/video-production-doral-miami
`components/geo-service-page.tsx` line ~51 already supports a page-specific "In short" answer; these pages fall back to the generic one.

Do, for each of the 8 pages, and nothing else:
1. Write a page-specific `answerFirst` (or whatever the prop is named in `components/geo-service-page.tsx`) of 100-180 words, in the page's language, that answers the niche question in the first sentence and carries at least one real number taken ONLY from `lib/pricing.ts` or the page's own calculator text (e.g. $100 per video starter, $1,600 production day, $125/hour on-location rate, $725-$1,450 where the page already states it). No invented clients, counts, turnarounds or results. Where a page's niche fact is unknown (crowdfunding results, UGC performance), say what Esteban does and the price, not an outcome.
2. Webinar page: put "LinkedIn" in the H1 or first sentence and link `/services/executive-linkedin-video-series-miami`. Product-demo page: remove the Bar Door Monkey proof link if it is not a product demo; link the portfolio index instead. Webinar page: same for the Healthy Smile proof link.
3. Executive interview page: state the $125/hour on-location rate in the opener. Doral page: say whether Esteban films on location in Doral and that editing is remote; keep the travel boundary wording used on other city pages.
4. Add one regression test asserting the 8 openers are distinct from each other and from the generic text (compare the rendered first paragraph strings).
5. Run `pnpm lastmod:update`.
Do NOT touch `/services/reels-editor-fort-lauderdale`, the homepage, pricing, Spanish twins (separate PR), or any metadata title.

Acceptance: `pnpm typecheck && npm test && python3 $HOME/.claude/durable/analytics-gate.py --repo . && pnpm rail-adoption:check`
Commit as `feat(geo): niche answer-first openers on 8 service pages`.
