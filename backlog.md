# Esteban Moreno Media — Backlog

Production is live. This file tracks repository implementation; account/access work is also tracked in Obsidian.

## P0 — Search establishment

- [x] Verify Google Search Console and submit `/sitemap.xml`
- [x] Submit `/video-sitemap.xml` once after the 16 watch pages reached production; accepted for processing with immediate state pending and 0 errors/warnings, without resubmitting the regular sitemap
- [x] Request indexing for the four English/Spanish home and portfolio entry points: `/`, `/portfolio`, `/es`, and `/es/portafolio`
- [ ] Create or claim one legitimate hidden-address service-area Google Business Profile

## P0 — Real proof

- [ ] Add Esteban's approved logo, headshot, and reel
- [x] Publish eight approved, public work samples in English and Spanish
- [ ] Publish 4–6 case studies with truthful location, deliverables, process, and outcome
- [ ] Add genuine reviews/testimonials after permission

## P1 — Technical SEO / GEO / ALOHA

- [x] Render Spanish pages with initial document-level `lang="es"`
- [x] Add a branded 1200×630 Open Graph image
- [x] Tighten long titles and homepage descriptions
- [x] Add one direct entity/service/location sentence above the homepage fold
- [x] Run three mobile and three desktop Lighthouse audits on `/`, `/es`, `/portfolio`, and `/es/portafolio`; record medians and remediate the semantic/accessibility findings (mobile performance 95/93/95/94, desktop 100s, final accessibility/SEO/best-practices 100)
- [x] Add truthful localized `VideoObject` data on all 16 dedicated watch pages and represent collection entries as links to those `WebPage` entities
- [ ] Add `ImageObject`/logo schema when approved brand photography and logo files are available
- [ ] Add English priority-service pages when distinct, verified content is ready
- [x] Make the existing short-form editing service a substantive search surface with distinct metadata and a direct homepage link
- [x] Strengthen the homepage, bilingual service/area hubs, internal proof links, and Esteban entity graph using only approved facts
- [x] Add a bilingual homepage authority hub that connects priority services to three accurately credited portfolio projects
- [x] Rebuild the corporate-video pricing guide with transparent scope factors, quote inputs, decision criteria, visible FAQ, and matching structured data
- [x] Freeze the 259-URL sitemap until the current inventory is classified; CI now rejects URL-count growth or duplication
- [x] Publish four practical bilingual guide pairs with explicit general-guidance and evidence caveats
- [x] Use click-to-load YouTube facades on both collection pages while keeping every watch-page iframe rendered and discoverable
- [ ] Release ESTEBAN-03 after the fail-closed 3-LLM/build/preview boundary: factual Pembroke Pines copy, reciprocal hreflang, and attributed brief source are implemented locally; Claude spec, full build, preview, production, and fresh rank evidence remain required

## P1 — Product and measurement

- [x] Add an accessible bilingual portfolio backed by real public work
- [x] Connect a production-scoped GA4 stream with query-safe manual page measurement and a bilingual privacy disclosure
- [x] Install and acceptance-test the three-times-weekly Search Console index-watch loop; live inventory migrated from 20 to 46 with indexing classifications of 20 `PASS`, 26 new `NEUTRAL`, and no failures/unknowns
- [x] Install and acceptance-test the Sunday health and Search Console digest loop; probes pass and the expected overall `DEGRADED` state tracks Google's processing of the 26 new URLs
- [x] Define contact and AI-referral measurement; provision GA4 dimensions for `contact_method` and `ai_source`
- [x] Add route metadata, sitemap, portfolio schema, and data tests
- [x] Run the live weekly search/index digest on 2026-08-12 and connect qualified-action evidence to the zero-token portfolio GA4 ingest

## P2 — Portfolio refinement

- [ ] Replace the 480×360 `La Huelga` poster with an approved 16:9 high-resolution source
- [ ] Complete Esteban/native-speaker voice review of the Spanish portfolio copy
- [x] Add dedicated bilingual watch pages for all eight approved public videos with localized metadata, visible verified facts, schema, internal links, and regular/video sitemap coverage
- [ ] Enrich selected watch pages into full case studies after project roles, locations, deliverables, permissions, and outcomes are verified

## Completed foundation

- [x] Next.js 15 App Router, TypeScript, Tailwind, and Vitest
- [x] Bilingual English/Spanish core site and Spanish local-intent pages
- [x] Services, areas, About, contact, Palm Beach expansion, schema, sitemap, robots, and `llms.txt`
- [x] Canonical custom domain and Vercel production deployment
- [x] Dedicated Obsidian project module and repository governance
- [x] Canonical GitHub-backed local checkout at `/Users/gonzalo/code/esteban-media`
