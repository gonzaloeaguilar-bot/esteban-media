## 2026-11-19 — Near-Page-1 SEO Query Fixes on existing Reels and short-form pages

- **Branch:** `feat/nearp1-20261119` (commit `a069ce65`) | **PR:** https://github.com/gonzaloeaguilar-bot/esteban-media/pull/new/feat/nearp1-20261119
- **Scope:** Improved existing routes only (`/es/editor-de-reels-fort-lauderdale`, `/services/reels-editor-fort-lauderdale`, `/es/editor-de-reels-miami`, `/services/reels-editor-miami`, `/services/short-form-video-editor-miami`).
- **Target Queries:** `editor de video fort lauderdale` (pos 4.1), `editor de reels fort lauderdale` (pos 14.5), `reel editor fort lauderdale` (pos 9.8), `reel editor miami` (pos 14.3), `editor de reels miami` (pos 8.5), `editor de video miami` (pos 11), `short form video editor fort lauderdale` (pos 16.1), `short form video editor miami` (pos 6.3).
- **Execution Details:**
  - Page titles constrained to <= 60 characters with query alignment.
  - Meta descriptions constrained to <= 155 characters matching queries and answer-first model.
  - Answer-first intro sentences stating owner-confirmed pricing from `lib/pricing.ts` ($100 per video Starter floor; $85/wk for 1 video, $160/wk for 2 videos with 4-week minimum).
  - Native server-rendered `<details>` FAQs matching search intent and JSON-LD FAQ schemas.
  - Cross-linking between Fort Lauderdale and Miami short-form services.
  - Ran `pnpm lastmod:update` updating `config/page-lastmod.json`.
  - Added regression test `app/__tests__/near-page-1-queries.test.ts`.
- **Verification Gates Passed:** `pnpm typecheck`, `pnpm lint`, `npm test` (targeted near-page-1, price-single-source, service-depth, site, es-us-spanish-money-pages), and `analytics-gate.py`.

## 2026-11-19 — Talking-head, Christian YouTube video editing, and About entity enrichment (JOB=ai-unlock)

- Branch: `feat/ai-unlock-talking-head-20261119` off `origin/main`.
- Implemented talking-head video editing pages (`/services/talking-head-video-editing` and `/es/edicion-de-video-hablando-a-camara`): zero-jargon workflow for client-supplied recordings via Drive/Dropbox, audio remastering, subtitle styling, and vertical Shorts repurposing.
- Implemented Christian YouTube video editor pages (`/services/christian-youtube-video-editor`, `/es/editor-de-videos-cristianos-youtube`, and 301 redirect `/es/edicion-de-predicas-youtube` -> `/es/editor-de-videos-cristianos-youtube`) for pastors, ministries, and devotional creators recording at home.
- Enriched `/about` and `/es/sobre-esteban` body copy with factual entity lines linking to `/events`, talking-head remote editing, and AI commercial Reels while strictly preserving exact page title and 160-char meta description per `app/__tests__/about-brand-metadata.test.ts`.
- Sourced all pricing from `lib/pricing.ts` ($100 Starter, $85/wk 1 video, $160/wk 2 videos, $400 half-day / $700 full-day filming). Zero emojis. Dual-audience answer-first structure with native server-rendered `<details>`.
- Registered inventory expansion in `app/sitemap.ts` (588 -> 592), `config/indexable-inventory-freeze.json` (SHA-256 updated), `scripts/search-console-index-watch.mjs`, and `config/page-lastmod.json` via `pnpm lastmod:update`.
- Validation gates passed cleanly: `pnpm typecheck`, `pnpm lint` (0 errors), `npm test` (212 test files, 3,918 tests passing), and `analytics-gate.py`.

## 2026-11-19 — Spanish Miami Reels page content-depth refinement (growth starvation)

- Scope: `/es/editor-de-reels-miami` only, through the existing `SpanishNichePage` data entry in `lib/spanish-site.ts`.
- Changed the title to `Editor de Reels Miami: clips claros` (58 characters including the site suffix), and the H1/opening now answer the outcome and boundary first: supplied clips become clear, captioned short videos; remote editing is the default and Miami-Dade filming remains project-scoped.
- Added the server-rendered decision section `¿Qué debes enviar para empezar a editar Reels?` with an actionable intake checklist, a contextual link to `/es/editor-de-video-corto-para-redes-miami`, and one matching scope-and-quote FAQ. No prices, outcomes, credentials, testimonials, or availability claims were invented.
- `pnpm lastmod:update` changed `/es/editor-de-reels-miami` in `config/page-lastmod.json` to `2026-11-19` (hash `35c3949db3329cf8`).
- Verification: `npm run typecheck --silent`, `npm test`, `pnpm lint` (0 errors; 26 pre-existing warnings), `pnpm rail-adoption:check`, and `pnpm build` passed. Raw production-build artifact `.next/server/app/es/editor-de-reels-miami.html` contains the new opening, new section, new FAQ, contextual internal link, and title.
- Local-only state: modified `lib/spanish-site.ts` and `config/page-lastmod.json`; no commit, PR, deploy, or production measurement has occurred. `cto-qa-lead` should independently review the exact diff; after an authorized release, verify the canonical raw HTML and then let `cto-seo-lead` compare a later like-for-like GSC window. Click and inquiry impact are unmeasured.

## 2026-11-19 — Extend events hub with FITCE, Boca Raton, and Pompano Beach pages (JOB=events-extend)

- Branch: `feat/events-extend-20261119` off `origin/main`.
- Extended the `/events` and `/es/eventos` hub with 3 new bilingual event pairs (6 URLs):
  - `/events/fitce-fort-lauderdale-video` <-> `/es/eventos/video-para-fitce-fort-lauderdale` (FITCE at Broward County Convention Center)
  - `/events/boca-raton-events-video` <-> `/es/eventos/video-para-eventos-en-boca-raton` (Boca Raton business & cultural festivals)
  - `/events/pompano-beach-events-video` <-> `/es/eventos/video-para-eventos-en-pompano-beach` (Pompano Beach annual seaside & civic celebrations)
- Extended the events hub (`/events` and `/es/eventos`) with an explicit Broward County events section and coverage FAQs.
- Prices derived strictly from `lib/pricing.ts` via canonical `RAW_FILMING_RATES` ($400 half-day, $700 full-day raw filming) and `SHORT_FORM.perVideoFrom` ($100/video editing). Zero emojis. Dual-audience answer-first structure with server-rendered `<details>` for FAQs and honest proof disclaimers (Esteban has not filmed these events; on-location filming is a paid add-on).
- Inventory updated: sitemap 582 -> 588, `config/indexable-inventory-freeze.json` (hash updated, owner-ordered batch registered), `scripts/search-console-index-watch.mjs` (588 URLs), `config/page-lastmod.json` updated via `pnpm lastmod:update`.
- Gates passed: `pnpm lint` (0 errors), `pnpm typecheck` (passed), `npm test` (212 test files / 3,906 tests passed), `analytics-gate.py` passed. Next step: push branch and open pull request (do not merge).

## 2026-11-19 — Trimmed Event Attendee Interviews & AI Commercial Reels (feat/interview-ai-20261119)

- Replaced duplicate events calendar from PR #775 with trimmed bilingual pairs (4 URLs total):
  1. `/services/event-attendee-interview-videographer-miami` and `/es/videografo-para-entrevistas-a-asistentes-de-eventos-miami`
  2. `/services/ai-commercial-video-reels-miami` and `/es/reels-comerciales-con-ia-miami`
- Linked attendee-interview page to existing canonical `/events` and `/es/eventos` hub rather than creating redundant calendar routes.
- Kept strictly to owner-confirmed pricing in `lib/pricing.ts` ($400 half-day raw capture floor, corporate editing band, $100/video editing floor) with "price on request, quoted per reel" and line-item add-ons.
- Kept platform AI-disclosure and labeling compliance strictly factual and unsourced claims out.
- Dual-audience structure: one-sentence answer-first, concise 100-180 word question-headed sections, and native details FAQs.
- Updated indexable inventory freeze from 588 to 592 (4 URLs within demand allowance), updated search console index watch registry, and refreshed `config/page-lastmod.json`.
- Verification gates passed: `pnpm typecheck`, `pnpm lint`, `pnpm rail-adoption:check`, `npm test` (212 test files / 3908 tests passed), and `analytics-gate.py`.
- Branch: `feat/interview-ai-20261119`

## 2026-11-15 — Local GBP conversion proof on Miami Reels Editor page (priority-growth:2026-11-15:esteban)

- Priority-growth action brief: recommended action `local_gbp_conversion` for round 2026-11-15 (work id: `priority-growth:2026-11-15:esteban`).
- Source scope: `app/(english)/services/reels-editor-miami/page.tsx`, `app/__tests__/reels-editor-miami-conversion-proof.test.ts`, and `config/page-lastmod.json`.
- Renders verified Google reviews (`ClientReviews` 5.0 rating, 19 reviews, Google Business Profile link, and verbatim reviews) directly on `/services/reels-editor-miami`, providing local Miami searchers with direct social proof and Google profile conversion access matching `/services/reels-editor-fort-lauderdale`.
- Regression test `app/__tests__/reels-editor-miami-conversion-proof.test.ts` asserts `ClientReviews` is imported and rendered on `/services/reels-editor-miami`.
- Local verification: `pnpm lastmod:update`, `npm test` (212 test files, 3,894 tests passing), and `priority-growth-project-verify.sh`. Next owner: `cto-qa-lead` reviews candidate commit.

## 2026-11-14 — Local GBP conversion proof and short-form intent parity (priority-growth:2026-11-14:esteban)

- Priority-growth action brief: recommended action `local_gbp_conversion` for round 2026-11-14 (work id: `priority-growth:2026-11-14:esteban`).
- Source scope: `app/(english)/services/reels-editor-fort-lauderdale/page.tsx`, `app/(english)/services/short-form-video-editor-miami/page.tsx`, `app/__tests__/conversion-resources.test.ts`, and `config/page-lastmod.json`.
- Restores verified Google reviews (`ClientReviews` 5.0 rating, 19 reviews, Google Business Profile link) and food creator choice conversion paths on `/services/reels-editor-fort-lauderdale`.
- Restores reciprocal intent linkage between `/services/short-form-video-editor-miami` and `/services/reels-editor-miami`, removes hard-typed pricing figures in favor of canonical `lib/pricing.ts` imports, and keeps conversion review proof test expectations aligned with `<ClientReviews locale="en" compact />`.
- Local verification: `pnpm lastmod:update`, `npm test` (211 test files, 3,893 tests passing), and `priority-growth-project-verify.sh`.

## 2026-11-11 — Remote editor + Gemini entity rebuild (re-author of PRs #705 and #708, both dirty / needs-reauthor)

- Rebuilds the missing scope of #705 (remote video editor exact-query FAQPage schema EN and ES) and #708 (entity knowsAbout + Gemini category signals) on current main, as one combined PR: both PRs touch the same remote FAQ lines, so splitting them would conflict.
- EN `/services/hire-remote-video-editor` and ES `/es/contratar-editor-de-video-remoto` gain the exact-query first FAQ ("Who is the best remote video editor for small businesses?" / "¿Cuál es el mejor editor de video remoto para creadores?"), priced from the Arranque variable ($100 per video), with 24 to 48-hour short-form turnaround. Regression test `app/__tests__/remote-video-editor-faq.test.ts` locks both.
- `lib/entity-schema.ts`: person `knowsAbout` gains TikTok, Reels, Shorts, bilingual subtitling, remote, real estate, and content day categories; `localBusinessEntityJsonLd` gains a matching `knowsAbout` array. `lib/llms-base.txt` gains the TikTok ad/organic editor and content day batch videography core questions.
- Already landed, not rebuilt: bilingual subtitling exact-query FAQs EN and ES plus `bilingual-subtitling-faq.test.ts` (PR #701 scope), and the three #755 hubs (merged tonight, verified live).
- Correction to the #705/#708 handoff text: it claimed "$240/video" as the per-video price. That is wrong; $240 is the weekly 3-video price. The code uses `SHORT_FORM.perVideoFrom`, which is the Arranque $100 per video, and the rebuilt copy renders $100.

## 2026-11-11 — Local GBP conversion proof on Fort Lauderdale Reels Editor page (priority-growth candidate)

- Source scope: `app/(english)/services/reels-editor-fort-lauderdale/page.tsx`, `app/__tests__/reels-editor-conversion-proof.test.ts`, and `config/page-lastmod.json`; addresses `local_gbp_conversion` recommendation for the top opportunity query/page "editor de reels fort lauderdale" -> `/services/reels-editor-fort-lauderdale`.
- Renders `ClientReviews` (5.0 rating, verified Google review count, verbatim client quotes, and verified Google Business Profile link) directly on `/services/reels-editor-fort-lauderdale` below the main service content and showcase, bridging local business searchers to live Google reviews and local conversion proof.
- Local verification: `pnpm lastmod:update`, `npm test` (210 files / 3,882 tests passing), and `priority-growth-project-verify.sh`. Next owner: `cto-qa-lead` reviews candidate commit.

## 2026-11-05 — Demand wave: consolidate Miami Reels intent (PR #728, open; not production)

- Fresh authenticated Search Console live API, 2026-10-06 through 2026-11-02: `editor de reels miami` earned 8 impressions split across `/services/short-form-video-editor-miami` (6, position 11.5), `/es/editor-de-reels-fort-lauderdale` (1, position 10), and `/services/restaurant-promo-video-editing-miami` (1, position 9).
- The dedicated Spanish Miami Reels destination already exists. The English restaurant page already linked its matching general Reels page; the Spanish restaurant page now adds the matching server-rendered route to `/es/editor-de-reels-miami`, separating general Reels work from restaurant-specific promotion without adding a URL or a claim.
- Commit `92160ac4`; PR #728. Local validation: lint (0 errors, 23 existing warnings), typecheck, full test suite (200 files, 3,832 tests), rail adoption, lastmod update, and diff check. Not merged, deployed, visually reviewed, or measured.
- Next: `cto-qa-lead` reviews PR #728. If merged by the authorized path, verify the Spanish restaurant page's raw canonical HTML contains the new link, then compare the exact GSC query-page split in a later settled window. No ranking, click, or inquiry effect is claimed before that read.

## 2026-11-04 — Demand wave: caption styles guide FAQ depth and EN/ES parity (feat/demand-wave-best-caption-styles-depth)

- Resolved EN/ES parity gap on top demand guide `/guides/best-caption-styles-for-instagram-reels` (155 impressions at pos 8.4 in fresh 28-day review-2026-11-04):
  - English guide had only 3 FAQs while Spanish counterpart `/es/guias/mejores-estilos-de-subtitulos-para-reels` had 5 FAQs.
  - Added matching English FAQs addressing automatic captions and recommended font types in `lib/guides.ts`.
  - Both locales now serve 5 comprehensive FAQs with valid Schema.org FAQPage structured data via `buildGuideStructuredData`.
- Added unit test `app/__tests__/caption-styles-guide-depth.test.ts` verifying FAQ parity and structured data across locales.
- Updated `lib/__tests__/guides.test.ts` to assert 5 FAQs for both EN and ES caption guides.
- Updated `config/page-lastmod.json` via `pnpm lastmod:update`.
- Validation gates passed: `pnpm lint`, `pnpm typecheck`, `pnpm test` (all 198 test files / 3811 tests pass), and `git diff --check`.

## 2026-11-03 — Niche-specific answer-first openers on 8 service pages (feat/niche-answer-openers)

- Replaced shared "In short" boilerplate paragraph with distinct 100-180 word answer-first openers on 8 service pages:
  - `/services/webinar-clip-editing-service` (answers webinar clipping into LinkedIn & 9:16 cuts, mentions LinkedIn in H1/lead, links `/services/executive-linkedin-video-series-miami`, points proof card to portfolio index instead of Healthy Smile, Starter from $100)
  - `/services/product-demo-video-production-miami` (answers walkthroughs/unboxing, points proof card to portfolio index instead of Bar Door Monkey, Starter from $100, Local Presence from $1,600)
  - `/services/amazon-product-video-production-miami` (answers Amazon marketplace compliance and video specs, Starter from $100, Local Presence from $1,600)
  - `/services/crowdfunding-video-editor-miami` (answers Kickstarter/Indiegogo pitch edits, corporate calculator band $725–$1,450, Starter from $100)
  - `/services/ugc-ad-variation-video-editing` (answers paid social creative variation batching, Starter from $100, 5-pack variations $1,250)
  - `/services/video-podcast-editing-service-miami` (answers podcast video editing and multi-camera post-production, long-form band $450–$850, Starter from $100)
  - `/services/executive-interview-videographer-miami` (answers corporate interview videography with $125/hr filming rate and 4-hr minimum call, Starter from $100, Local Presence from $1,600)
  - `/services/video-production-doral-miami` (answers B2B commercial video in Doral, local production from $1,600, remote editing from $100, transparent Fort Lauderdale base travel boundary)
- Price discipline: figures are referenced directly from `lib/pricing.ts` constants via `usd()`, ensuring parity with `app/__tests__/price-single-source.test.ts`.
- Added regression test `app/__tests__/niche-openers-distinct.test.ts` verifying all 8 openers are distinct from each other and the generic text, meet 100-180 word bounds, and adhere to specific niche linking/content requirements.
- Updated `config/page-lastmod.json` via `pnpm lastmod:update`.
- Validation gates passed: `pnpm typecheck`, `pnpm test` (196/196 test files, 3,802 tests), analytics gate (`python3 /Users/gonzalo/.claude/durable/analytics-gate.py --repo .`), and `pnpm rail-adoption:check`.

## 2026-11-02 — Bilingual subtitling exact query phrasing FAQPage schema retry (spark-2026-11-02-001)

- Diagnosed gate exit 127 from previous run (#228): worktree `node_modules` was missing/unlinked, causing `sh: vitest: command not found` (exit 127). Resolved via symlink to shared repository `node_modules`.
- Added exact query phrasing FAQ in English (`PORTED_SERVICE_FAQS["/services/bilingual-video-subtitling-service"]` in `lib/service-depth-content.ts`):
  - Question: "Who provides a bilingual English Spanish video subtitling service?"
  - Emits FAQPage schema via `buildServiceFaqSchema` while preserving PR 696 intro/answer blocks and satisfying audit claim discipline.
- Added exact query phrasing FAQ in Spanish (`faqs` in `lib/spanish-site.ts` for slug `servicio-de-subtitulado-bilingue-de-video`):
  - Question: "¿Quién ofrece servicio de subtitulado bilingüe inglés español para videos?"
  - Emits FAQPage schema via `buildSpanishNicheStructuredData` while preserving existing answers and format.
- Added regression test `app/__tests__/bilingual-subtitling-faq.test.ts` asserting exact query matching in FAQPage schema for both EN and ES routes.
- Updated `config/page-lastmod.json` via `pnpm lastmod:update`.
- Gates: `npm test` (194 test files / 3,799 tests passed), `pnpm typecheck` passed, analytics gate passed, and `esteban-geo-nightly-subtitling-faq-retry-2026-11-02.txt` created.

## 2026-10-30 — GEO citation push: the two empty terms (spark/geo-citation-push)

Built at Gonzalo's direct order ("continue getting Esteban ranked on geo" / "make Esteban Moreno Media get more citations for leads") after the evening sweep (logged at goals/esteban-moreno-media-geo-seo/hidden_files/esteban-geo-sweep-2026-10-30-evening.md): 4 of 10 cited; TikTok up to #1 on his own domain, ES reels up to #1, real estate out after #1 on Oct 29, Shorts down to #2; remote editor and bilingual subtitling still empty.

- lib/llms-base.txt: bilingual subtitling service added to the hand-written Core Pages (EN) and Spanish Pages (ES) lists, plus two target questions (EN + ES) in the Core questions list. The subtitling service was absent from the facts file entirely.
- /services/bilingual-video-subtitling-service: filler intro replaced with quotable facts; specific answer-first override (human line-by-line translation, SRT or burned-in in safe zones, shorts 24-48h, longer per minute of audio, Spanish-first honesty, written quote).
- /services/hire-remote-video-editor: specific answer-first override (upload footage and brand assets, cut/color/audio/captions, no shoot or visit, US-wide, weekly creator plans, written quotes, Spanish-first).

Gates: full suite green after lastmod refresh (3,797 tests), typecheck clean, lint 0 errors, rail-adoption pass, build green; built llms.txt carries the new subtitling entries (8 mentions).

Also found the same night, separate thread: ChatGPT's local card for "La Familia Media" (a real, different Fort Lauderdale agency) carries Esteban Moreno Media's description text verbatim; logged at goals/esteban-moreno-media-geo-seo/hidden_files/esteban-entity-confusion-la-familia-2026-10-30.md. Fix needs his listing URLs/access, outstanding since Oct 17.

## 2026-10-30 — Spanish site-wide pass, chunk 1 (spark/spanish-pass)

Owner standard applied: español lindo (clear professional Latin American Spanish, tú forms, no calques) extended beyond the homepage.

- es/contacto: FAQ answers rewritten in one-person tú voice, same facts; Brief Builder fold moved to first, mirroring /contact.
- es/servicios: growth deck section rewritten ("Sitios web, chatbots y sistemas", human heading and scoping); metadata and pillar copy de-calqued ("funnel" and "handoffs" gone).
- lib/spanish-site.ts: corporate machinery removed across niche data: "se evalúa de manera selectiva" (12) becomes "se confirma caso por caso"; the "material suministrado" family (18) becomes "el material que ya tienes"; "flujo de postproducción remota" answers and headings rewritten. Factual alignment: the náutica niche promised edited cuts in 3 to 5 business days; now "desde los 7 días" per the unified turnaround floor. The subtitling niche keeps its own scope (shorts 24-48h, long-form 3-5 days).
- KEPT on purpose: the Sunny Isles entry's "material suministrado por el cliente" strings; they are a guarded factual-proof boundary (sunny-isles tests) where the exact client-supplied-footage wording is load-bearing.

Gates: full suite green (3,797 tests), typecheck clean, lint 0 errors, rail-adoption pass, build green. Lastmod: 16 pages updated.

Not in this chunk: the remaining usted-form guide sentence, /es/portafolio.

# 2026-10-30 — Human-QA wave 1: top pages lead with the person (branch spark/wave1-home, on current main)

- /es homepage in the owner's Spanish standard (clear, professional Latin American Spanish): the chooser heading "Empieza por la meta. Elige el oficio que te ayuda." now reads "Empieza por la meta. Elige el camino que te sirve." (steps Propósito / Método / Siguiente paso); the chooser's real-estate card is titled "Bienes raíces" instead of the English "Real Estate"; the Premium perk "flexibilidad de rollover" now says "flexibilidad para pasar videos al mes siguiente"; the camera-kit eyebrow "LA MESA DE CÁMARA" now reads "EL EQUIPO DE CÁMARA"; the crowdfunding note's "Brand film" is "Video de marca"; the same oficio calque on portfolio watch pages became "qué servicio le sirve mejor".
- /about and /es/sobre-esteban: the link-stuffed entity paragraphs that opened both pages are replaced by one human paragraph ("you talk to the person who edits your video" / "hablas con la persona que edita tu video"); every removed link survives in a quiet closing section ("Directories, Spanish pages and guides" / "Áreas de servicio y portafolio"), so the internal-link graph is unchanged and the person now leads.
- /contact: the Brief Builder fold moved from last to first among the help folds; the Spanish-first note now sits directly under the intro instead of inside an FAQ answer; the two corporate-voice FAQ answers (on-location availability, how quotes work) rewritten in the one-person voice with the same facts.
- /services: the folded business-systems section lost the agency voice ("0→1 Growth Systems" eyebrow and "one accountable system" deck copy now read "Websites, chatbots and systems" and plain first-person scoping). The 100+ link directory stays folded on this page for now: it is shared with the areas pages and four test suites pin its current placement, so moving it to its own index page is its own change, not folded into this wave.
- 404: beyond Home it now offers the routes people actually want, See the work (/portfolio), a WhatsApp quote button, and the top Spanish routes (/es, /es/portafolio, /es/contacto).
- Not in this wave, named honestly: /portfolio's category order and the ML Colombia / Banacol listings (the items back case studies and live niche proof links, so removal is a data decision for the owner), and the Healthy Smile / Bar Door Monkey page pair (word-count gates on case pages make the cut its own careful change).
- Gates on this machine: full vitest green in chunks (508 + 1,267 + 1,859 + 184), typecheck clean, lint 0 errors / 15 warnings, rail-adoption pass, build green. Built HTML re-read: every marker above verified present and every removed string verified absent. Merged under the owner's 2026-10-30 standing rule (Spark PRs merge automatically once gates pass).

---

# 2026-10-30 — Human-QA wave 4: conversion cluster (branch spark/wave4-conversion, stacked on spark/wave3-en, PR open, not production)

- Diagnóstico/Assessment: the tool now asks the 5 questions its intro promises (new Q5, who edits today). Nothing is pre-answered, so the panel no longer opens at 100/100; the score appears only when all five are answered, and the result names the weakest area, links the matching service, and offers a WhatsApp next step prefilled with the score and the weak point. Q3 jargon removed in both languages; "bases solidas" accent and "batching mensual" fixed.
- Turnaround unified: the budget estimator's standard delivery reads the owner floor from lib/pricing.ts TURNAROUND (from 7 days) instead of "3 - 5 business days", which contradicted /pricing and /about. Weekly-plan 48-72h and express 24-48h remain as labeled exceptions. The estimate result gained a WhatsApp send-this-estimate action.
- Case studies: production cases list before web/AI systems on the index in both languages; the answers and limits section moved below the projects. The five thin published-media cases no longer repeat the answer paragraph verbatim as the first paragraph of "What the public record confirms" (both languages); the section opens with a shorter distinct statement.
- Caption guides: EN and ES caption-styles guides gained a done-for-you bilingual subtitling offer block with a WhatsApp action. No price figure, deliberately: the subtitling starting price still has two live sources and waits on the owner's ruling, the same call wave 2 made.
- "$750per month" bug fixed at the source: RailPrice puts a space before word units in the accessible name and in extracted text (slash units unchanged). Arrived via a rail-kit checkout at the pinned ref plus the fix, re-synced with scripts/sync-rail-kit.mjs; only RailPrice.tsx differs among the 100 vendored files. A matching upstream rail-kit PR carries the fix for the other consumer sites.
- Gates on this machine: full vitest green in chunks (486 + 201 + 104 targeted + 1,279 + 1,846), typecheck clean, lint 0 errors / 23 pre-existing warnings, rail-adoption pass, rail-kit:check pass, build BUILD_ID 18d-sS13GLdWti_IQx-MQ. Built HTML re-read: spaced prices in EN and ES, unanswered Diagnóstico panel with Q5, 7-day calculator floor, case-study order and single common paragraph, both guide offer blocks. Not merged; not production.

---

# 2026-10-30 — Human-QA wave 3: English service pages end on the human close (branch spark/wave3-en, stacked on spark/wave2-es, PR open, not production)

- GeoServicePage template: the page now ends on the ServiceInquiryRail. Order is FAQs, related services, NicheAnswers, PriorityLinks, then the quote rail last, so no answer block, directory or second contact pitch follows the human close on any of the 7 pages using this template (the real-estate page's reported "restart after Ask for a quote" disease).
- Per-page "In short" answers via the answerOverride added in wave 2: Reels editor Fort Lauderdale and real-estate Reels now state their own answers in the page's voice; the price in the Reels answer interpolates from lib/pricing.ts (the price-single-source test caught a hand-typed figure during this branch's gates and it was fixed, not ledgered).
- Restaurant promo page: "Tell us the location" and "Our portfolio project" voice slips fixed to the one-person voice; the colour mechanics paragraph in Editing approach no longer repeats the craft section's colour article nearly verbatim (it now points to the craft notes and keeps its unique local-brief content); the repeated opening-detail list was trimmed the same way; the tail was reordered so the page ends on the Get Started close instead of on EventSeasonLinks, SeasonalAnswer, NicheAnswers and PriorityLinks.
- The "Who does it / Who can help" fold concatenation was already fixed at template level in wave 2 (both languages) and is inherited here.
- Gates on this machine: full vitest green in chunks (670 + 1,279 + 1,845, plus the price-single-source re-run), typecheck clean, lint 0 errors / 23 pre-existing warnings, rail-adoption pass, rail-kit:check pass, build BUILD_ID DQoqzU6LjiYIv-tw_sMPPh. Built HTML re-read: new In short answers live on both GeoService pages, bottom order verified by marker position, restaurant voice and dedupe verified. Not merged; not production.

---

# 2026-10-30 — Human-QA wave 2: Spanish service pages in Esteban's voice (branch spark/wave2-es, PR open, not production)

- Owner standard set this day: every Spanish page reads in clear, professional Latin American Spanish, written in Spanish rather than translated. This branch applies it to the three wave-2 service pages, /es/precios and /es/sobre-esteban.
- Per-page "En corto" answers: ServiceAnswerFirst takes an `answerOverride`; subtitulado and editor remoto state their own answers (subtitling reviewed line by line against the audio; remote editing from the client's own footage). The ES reels page keeps the generic answer on purpose: its opening is the cited GEO text behind the ChatGPT wins, guardrail is trim later repetition only.
- Subtitulado: the "dominio nativo de inglés y español" claim is gone (honest position: español primero, inglés intermedio, cada línea revisada), "sincronización milimétrica" hype removed from the lead, usted forms (consulte/visite/revise) unified to tú. The page and the remote-editor page gained ServiceInquiryRail entries, so both now carry the "Copia esto" first message they were missing.
- Template fixes: the niche fold summary no longer concatenates ("Quién lo hace y cuánto cuesta" + "La persona que hace el trabajo, los precios publicados y cómo empezar."); the Spanish niche closing block now reads "Cuéntame qué quieres lograr." with a written-quote promise instead of the anti-sales "sin asumir formatos..." line; remote editor's sections heading no longer says "video corto" on a page that sells long YouTube edits.
- /es/precios: the identical "Todos los planes incluyen" block renders once after the three real-estate plans instead of inside each plan's fold (test now asserts exactly one render); "Media de propiedad" calque rewritten; the "¿Listo para crear algo increíble?" hype close replaced in both languages ("¿Listo para empezar?" / "Ready to start?" with a written-quote lead).
- /es/sobre-esteban: the defensive "Lo que falta publicar también queda claro" section reframed to "Prueba real, publicada."; "en el scope" anglicism removed from the trust answers.
- Checked and NOT changed: the "English footer business block" from the QA read does not exist in the built HTML (zero matches with scripts stripped); it lives only in the entity JSON-LD, where English is the schema convention. The "$750per month" concatenation is real but its root is the vendored RailPrice sr-only string, hash-pinned to the shared rail-kit repo; the vendored file was left untouched (rail-kit:check green) and the fix belongs upstream in rail-kit, then a sync.
- Gates on this machine: full vitest green in chunks (3,775+ tests; illustrated-commercial updated to assert the single every-plan render), typecheck clean, lint 0 errors / 23 pre-existing warnings, rail-adoption pass, rail-kit:check pass, build BUILD_ID xABAmSUqt4b-5p3VO1l_r. Built HTML re-read page by page: every fix above is present and the reels opening is byte-identical. Not merged; not production.

---

# 2026-10-28 — Vertical video fills the rail phone and opens in a 9:16 stage (branch fix/vertical-video-fill-rail-and-modal-20261028, PR open, not production)

- Owner screenshots ("todo tiene el problema"): every rail clip sat in one 16:9 strip in the top third of the phone card, and the player cropped a vertical Reel to a slice. Each portfolio item now declares `orientation` (lib `mediaOrientation()` from the declared aspect; the teaser sets it per source). Evidence: ffprobe gives 720x1280/576x1024 for all eight local MP4s; `youtube.com/shorts/<id>` answers 200 for Hm-mI-RgvUY, YTJW6zn14S8, poIo-VCBeAw, B4d_bFQV6T0 (now `9:16`) and 303-redirects for BDRru8eXaj4 and the other films (`16:9`).
- Rail: `.em-phone-video[data-orientation]` — portrait owns the whole phone screen (video/poster cover, YouTube iframe as a centred 9:16 box), landscape keeps a whole 16:9 frame centred. Player: phone stage is a true 9:16 box `min(100%, 86svh*9/16)`, `object-fit: contain`, panel below; desktop keeps the #611 two-column layout, landscape stage is now a true 16:9 (was 663x336). Portfolio-page players (`PortfolioVideo`, its modal, watch page) take the same `orientation`.
- Gates: typecheck, lint (0 errors / 22 pre-existing warnings), full vitest 182 files after `pnpm lastmod:update`, analytics gate PASS, `pnpm build` BUILD_ID `RzFLUY5F3Y2McercFGVte`. Playwright at 390x844 and 1280x800: portrait stage 358x636 and 419x744 (0.5625) with video 576x1024, aspect delta 0%; landscape stage 358x201 and 597x336 (1.7778); Sony card screen = figure (fill 1.0). Not merged; not production.

---

# 2026-10-28 — GEO daily execution selector (local, ready for review)

- Added the deterministic draft-only selector at `scripts/esteban-geo-execution-queue.mjs`, its 5-test suite, a zero-cost daily `fleet-slot.sh` launchd template, and the governed executor contract in `docs/geo-execution-queue.md`.
- Live-ledger acceptance selected `esteban:es:editor-de-reels-fort-lauderdale` for `/es/editor-de-reels-fort-lauderdale`; the selector records this as `eligible`, explicitly not as a successful executor dispatch. A cluster is suppressed for 28 days only after a valid executor-owned `dispatched` receipt. Citation and outcome evidence remain source-bound; no outcome is inferred.
- Local checks: focused Vitest 5/5, full `pnpm test` completed with no failures, `node --check`, `plutil -lint launchd/com.esteban-media.geo-execution-selector.plist`, and `git diff --check` passed. This is local only: no launch agent was installed, site was not edited, and no production change or business outcome is claimed.
- Next: `cto-qa-lead` independently reviews the selector/state contract. After governed release, install the template through the normal fleet process and verify a selector receipt before any executor consumes a brief.

---

# 2026-10-28 — Camera Bench film-strip correction (local, ready for PR)

- Owner rejected the tilted cream-paper camera cards as accidental-looking Polaroids. Branch `fix/camera-filmstrip-20261028` replaces only the desktop presentation with a straight, dark two-frame film strip and visible top/bottom sprocket holes. The confirmed Sony and Canon images, native specification disclosures, wording, and phone/tablet swipe shelf remain unchanged.
- Local checks: focused camera-kit test `5/5`, full `pnpm test`, `pnpm typecheck`, `pnpm lint` (0 errors; 22 existing warnings), `pnpm build` (`BUILD_ID=3ao6XPl2Aquat59Q45DAS`), `pnpm rail-adoption:check` (`3/3`), and `git diff --check`. Local visual reads passed at `1440×900` and `390×844`: desktop frames are straight with sprockets; mobile remains a single clean swipe card with no horizontal page overflow.
- Next: open the scoped PR, obtain the governed review, merge under the owner's existing production authority, and re-read canonical phone and desktop rendering. No business effect is claimed.

---

# 2026-10-28 — Personal creative-partner GEO answers (local candidate)

Branch `feat/personal-geo-guides-20261028` adds two EN/ES guide pairs: the first helps a small business decide whether the first need is clearer messaging, useful footage, or a page/contact path; the second tells a prospective client what to send before asking Esteban for a quote. Both point readers to existing service, work, price, and contact pages and explicitly avoid universal packages, performance promises, or an invented fixed deliverable. Sitemap inventory is 573 routes, four new watched URLs are declared, and each guide has its server-rendered FAQ and visible update date through the existing guide renderer.

Local evidence: full `pnpm test` passed; `pnpm lint` had 0 errors and 22 existing warnings; `pnpm typecheck`, `pnpm build` (BUILD_ID `lRxkdZZ3tWzNbvIkJLIGM`), `pnpm rail-kit:check`, `pnpm rail-adoption:check`, `pnpm text-parity`, and `git diff --check` passed. Built raw HTML contains the EN and ES titles. A local browser read of the first EN guide confirmed answer-first copy, table of contents, bilingual route link, raw facts/links, and collapsed FAQs. This candidate has not been committed, reviewed, opened as a PR, deployed, or checked in production. Next verifier: `cto-qa-lead`.

---

# 2026-10-28 — Bilingual personal craft homepage interlude (local candidate; not production)

- Added `components/personal-craft-experience.tsx` to `/` and `/es`, immediately after the work rail and before `HomeProjectPath`. It keeps the approved hero untouched and presents the source-bounded direct-partnership promise, three short commitments, existing chooser anchor, and a server-rendered native `<details>` with only existing service and portfolio links.
- Local evidence: `pnpm test --run app/__tests__/personal-craft-experience.test.ts` passed 3/3; `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm rail-adoption:check`, `pnpm lastmod:update`, `git diff --check`, the experience-contract validator, and `analytics-gate.py` passed. Local EN and ES raw HTML each returned 200 and contained their promise and disclosure. Browser keyboard activation expanded the English disclosure and exposed its existing links.
- `human-consumption-gate.mjs --site esteban-media` has no configured site entry, so it returned `--site esteban-media not in config`; this is unavailable, not a passing visual result. The production build was started but has no terminal receipt in this constrained session. Independent visual review, a complete build receipt, PR/merge/deployment, real phone/desktop production rendering, and the T+7/T+14 comparable inquiry read remain required before any production or outcome claim.

---

# 2026-10-28 — Desktop polaroid and player repair (PR #579, not production)

- Commit `27ed763f` repairs two visual regressions found during the follow-up desktop/tablet pass: the camera contact sheet's late phone styles had erased the intended paper prints and left dark title text on dark cards; the Great Reviewer widescreen YouTube source was filling a tall vertical desktop canvas with black.
- The desktop Camera Bench now reasserts the two paper-reference prints after phone-first rules. The Great Reviewer source retains its iPhone-shaped carousel card but opens in a 16:9 in-place desktop player; the call-to-action column scrolls independently when needed.
- Local evidence: focused tests 10/10, typecheck, `pnpm build` (`BUILD_ID=l8bU0B_hbhdIkcSNQkCuv`) and diff check passed. Browser pass at 1440×900 verified closed/open camera states and the running muted player; 1180×820, 1024×768 and 834×1194 were also inspected. Push this commit to PR #579, await terminal remote checks and independently verify the deployed canonical page before calling any of it production.

---

# 2026-10-28 — Great Reviewer carousel autoplay and phone-frame consistency (PR #579, not production)

- The homepage work rail now treats every vertical property Reel and the featured The Great Reviewer iPhone Reel as an explicit phone-framed card. The seven property clips already carry local MP4 sources; The Great Reviewer is a published YouTube video, so its previous click followed the fallback portfolio link instead of opening the player.
- The featured card now opens the existing in-place Reel sheet with `https://www.youtube-nocookie.com/embed/BDRru8eXaj4?autoplay=1&mute=1&playsinline=1&rel=0`. It starts muted, inline, and automatically after the visitor selects the card; local MP4 Reels remain unchanged. The sheet's iframe has no default border, so it uses the same clean 9:16 player slot as local video.
- Local checks: `pnpm vitest run components/__tests__/portfolio-teaser.test.ts components/__tests__/reel-funnel-escape.test.ts` passed 6/6; `pnpm typecheck`, `git diff --check`, and `pnpm build` passed (BUILD_ID `DqD2YlS-FWKrFMQ-K9PxC`). Commit `155d3b89` is pushed to PR #579. The pre-existing 3005 development server had a stale Next chunk error, so it is not visual evidence for this change.
- This is an added candidate on PR #579, not a production result. A fresh preview plus canonical phone/tablet/desktop interaction check remains required after independent quality evidence is available.

---

# 2026-10-28 — Tablet route-card repair (PR #579, not production)

- Commit `7fced5d4` on `fix/desktop-camera-polaroids-20261028` is pushed to PR #579. It keeps the seven homepage buyer paths in one readable column through a 1024px landscape tablet and starts the two-column layout at 1100px. At that wider layout, the seventh card and an opened card span both columns; this removes the orphan final half-row and the empty stretched neighbor.
- Local browser matrix after the change: 768×1024, 820×1180, 834×1194 and 1024×768 render one route column; their digital-card reading fields measure 291px, 298px, 298px and 399px respectively. At 1180×820, the grid uses two 539px columns, the final card measures 1088px, and an opened route measures 1088px while the next two closed cards remain 539px each. All tested viewports reported document scroll width no greater than the viewport's scrollbar-adjusted layout width.
- Local deterministic check: `pnpm vitest run app/__tests__/home-packaging-human.test.ts` passed 34/34; `git diff --check` passed. The Node 26 engine warning is pre-existing environment compatibility noise; the test exited 0. No production claim: required independent review, PR checks, merge and canonical phone/tablet/desktop production render remain open.

---

# 2026-10-28 — Commercial local GEO answer units (review evidence complete; PR pending)

# 2026-10-28 — Private celebrations PR #580 (open; not production)

- PR #580 head `510488f9` expands the paired private-event pages to the owner-requested complete social-celebration list, keeps Spanish-first Colombian/Latin family context without a specialization claim, and preserves Fort Lauderdale base, quote-based distant transport and no public studio.
- `pnpm test` passed 177 files / 3,696 tests after `pnpm lastmod:update` refreshed exactly the two changed page hashes. Lint and typecheck passed. First suite pass found and the follow-up fixed missing WebPage/BreadcrumbList schema plus 567→569 sitemap/watch-set lock drift.
- Do not call it released. The fresh governed Antigravity and Claude reviewer attempts failed without a verdict; Claude fallback stopped at a zero-budget OpenRouter key limit. Wait for a terminal independent review, PR evidence drain, merge/deploy, raw canonical EN/ES HTML and 390x844 proof before IndexNow.

- Branch `feat/commercial-geo-guides-20261028`, commits `7015724f`, `6fdd9040`, and `f7a8d386`, strengthens only six existing English/Spanish commercial routes: Fort Lauderdale Reels, Fort Lauderdale video production, and Miami restaurant editing. It adds decision-first, server-rendered sections and contextual links; it adds no URL, price, client, review, ranking, citation, availability promise, or outcome claim.
- Live source: `python3 /Users/gonzalo/code/portfolio-ops/scripts/esteban_gsc_snapshot.py --output-dir /tmp/esteban-gsc-commercial-20261028 --days 90` on 2026-10-28 returned data through 2026-10-25: Reels 11 impressions / 0 clicks / 9.09; production 3 / 0 / 5.33; restaurant 17 / 0 / 7.24, each against its canonical English route.
- Gates: `pnpm test` 177 files / 3,690 tests; `pnpm typecheck`; `pnpm lint` 0 errors / 22 existing warnings; `pnpm rail-adoption:check`; `pnpm lastmod:update`; `git diff --check`. The full production build compiled and passed lint/type validation, but the 608-page static generation exceeded this terminal's 30-second execution ceiling; do not describe a full build pass without a new receipt.
- Link receipt: the handoff checklist, restaurant ideas guide, Bar Door Monkey case, and the three Spanish counterparts each returned production HTTP 200. Independent provider review attempts one and two rejected an incomplete evidence packet; attempt three was blocked by the dispatcher after its three-attempt work-id limit. The exact packet is `.ai/commercial-geo-guides-review-2026-10-28.md`. Next: push/open PR, get a fresh independent reviewer under a new governed review work-id, capture full build/preview, merge after valid checks, verify six canonical raw-HTML markers and 390×844/1440×900 renders, then call production.

---

# 2026-10-26 — Full-card digital scenes (locally verified, not public)

- Commit `56f8dffb055fa34a4255c5135a6b7ff381405ab2` on `codex/full-card-scenes-20261026` replaces small right-side illustrations with full-card working scenes: the approved AI robot squad in an original office/courier environment, an animated ChatGPT-style SEO/GEO conversation, and the current Gains From Geebs desktop hero scrolling behind a dark reading field.
- Evidence: `pnpm test` 172 files / 3,677 tests, `pnpm typecheck`, `pnpm build`, and `git diff --check` passed; lint had 0 errors / 22 existing warnings. Playwright inspected 390px and desktop renders. Reduced-motion emulation returned `animationName: none` for the courier. CTO visual review `20261026T142548Z-cto-design-lead-esteban-media-1793024749124926000-76904-46cb9cc2b2c61bb7` approved and reran the full suite plus analytics gate.
- Remote release is blocked only by GitHub's own internal-server error: `git push` and PR creation were rejected at 2026-10-26T14:28Z. Do not call this live. Retry push/PR, wait for checks, then verify the canonical `/es` raw markers and 390px public rendering.

---

# 2026-10-24 — Digital chooser-card composition candidate

- Scoped files: `components/home-project-path.tsx`, `app/illustrated-commercial.css`, `app/__tests__/home-packaging-human.test.ts`, and `docs/digital-route-card-composition.md`. The three digital card visuals now use the actual Gains From Geebs desktop hero (web), the existing SNES-style companion with one assistant prompt (AI), and one clear query-to-business-result composition (SEO/GEO). Real Estate's Brickell loop and the Content Creator card are unchanged.
- Local evidence: focused packaging suite 32/32; `pnpm lint` reported 0 errors / 22 pre-existing warnings; `pnpm typecheck` and `pnpm rail-adoption:check` passed; `git diff --check` passed. A full `pnpm test` run reached its final test groups before the tool output window closed, but its terminal exit receipt was not captured, so remote validation remains required. Browser review at 390x844 and 1440x900 found all three cards readable, the plus controls visible, and no horizontal overflow. CDP reduced-motion emulation yielded `animationName: none` for the companion, chat bubble and orbit.
- `pnpm build` was attempted twice after a prior concurrently-started build left Next's compiler waiting with no progress; the final standalone attempt was manually stopped after more than three minutes without compilation output. Do not call this candidate released locally. Next: commit, open the scoped PR, and use its fresh remote build/visual evidence before merge; after deployment, check the public Spanish card composition at 390px.

---

# 2026-10-24 — Homepage filming-area and process copy (PR #554, release pending)

- Owner correction: the homepage process must plainly say that Esteban films throughout Miami-Dade, Broward, and West Palm Beach; remote editing is available anywhere for supplied footage. The old wording's "selected filming projects" and Fort Lauderdale-only production link made the service area feel narrower than it is.
- The refreshed three steps are: tell me what you need, choose your starting point, and get a clear plan. The last step promises written price, timing, and deliverables before work begins. English and Spanish are covered by regression tests.
- Local verification on commit `0640defd` plus the pending parity-test repair: focused process/parity/ranking tests 23/23, full `pnpm test` passed, `pnpm typecheck` passed, `pnpm lint` had 0 errors / 22 existing warnings, analytics gate passed, and `git diff --check` passed. Wait for the current production build and remote checks, attach the genuine quality record, complete independent review, merge, then verify the exact live raw HTML and mobile expanded section before calling this production.

---

# 2026-10-24 — 360px hero CTA clipping repair (PR #543 update, not released)

- Human phone review reproduced the homepage hero overflow at 360px: the secondary WhatsApp action ended at x=366.75 on a 360px viewport, and the price/location line clipped at the same edge. The repair stacks the two actions and permits the support line to wrap at 389px and below; it preserves the inline composition from 390px up.
- Local visual verification: at 360x667, the primary action rendered x=20..188.22, the secondary action x=20..186.53 below it, and the support line occupied x=20..325 across two readable lines. At 375x667 the action group is 320px wide and 102px tall; at 390x844 the inline group stays within x=20..366.75. No horizontal clipping observed in these checked states.
- Commit `082299ef` is the current PR head. Gates: focused Vitest 4/4, `pnpm typecheck`, `pnpm lint` (0 errors; 22 existing warnings), `pnpm build` (BUILD_ID `mW6PVg1tgfB6rwYSF4v4_`), and `git diff --check`. PR #543 was pushed; wait for remote checks and independent review, then confirm the canonical production mobile hero before calling it released.

---

# 2026-10-24 — Homepage AI, web and visibility chooser candidate

- The homepage now gives AI, website, local SEO and AI-search visibility their own fifth buyer card instead of hiding them inside "Local businesses." The Spanish card is "IA, web y visibilidad"; the English equivalent is "AI, web and visibility." It opens the existing All-In package plus the existing AI-assisted content, local SEO/AI-search visibility, website/funnel audit, and operations-automation services. The package and services remain in the server-rendered HTML; nothing is revealed only through motion.