## 2026-10-24 — Camera Bench and product-unboxing refresh

- [x] Rework the homepage Camera Bench as a larger swipeable phone shelf, preserve native published-spec disclosures, and add the supplied product-unboxing Reel as a safe external Instagram action. Local evidence: `app/__tests__/camera-kit-method.test.ts`, typecheck, lint, and phone interaction check. Release verification remains open in [[esteban-camera-bench-unboxing-refresh-2026-10-24]].

- [ ] `cto-qa-lead`: independently inspect the Camera Bench at 390x664, 390x844, and desktop; then open the release PR and verify the deployed Spanish and English homepages.

## 2026-10-23 — Local GBP conversion proof on About page

- [x] 2026-10-24: Add contained TikTok-style floating-heart feedback to the homepage Content Creator card's like icon and extend the same crafted, decorative motion language to the remaining chooser cards. Content Creator keeps its four floating Lucide hearts and rising `+1` through `+1.2K` visual feedback; Real Estate has a settling property pin/ring, Productions has a REC beat with three frame marks, and Local Business has a rising signal sparkle. These loops are decorative, not audience or performance data. `pnpm test` passed (168 files / 3,497 tests); `pnpm typecheck` passed; `pnpm lint` completed with 0 errors and 22 pre-existing warnings; `pnpm build` and `git diff --check` passed. Browser review at 390x844 confirmed controls and copy remain clear. Next: scoped PR checks, merge, and public Spanish-homepage verification.
- [x] 2026-10-24: Unbury the homepage AI/SEO/GEO offer as a fifth chooser card. “IA, web y visibilidad” / “AI, web and visibility” now contains Todo Incluido plus the existing AI-assisted content, local SEO and AI-search visibility, site/funnel audit, and operations-automation options. The card uses the documented AI lead-capture case image and a restrained decorative signal that stops for reduced motion. Verification: chooser test (32), `pnpm typecheck`, `pnpm lint` (0 errors, 22 existing warnings), full `pnpm test`, optimized `pnpm build`, `pnpm rail-adoption:check` (3), analytics gate (12 emit sites / 11 event names), `git diff --check`, and browser checks at 375x667, 390x844, and 1440x900. Next: scoped PR checks, merge, and public Spanish-homepage verification.

- [x] Implement `local_gbp_conversion` priority-growth recommendation on `/about`: embed verified Google reviews (`ClientReviews`), linking brand searchers ("esteban moreno media") to 5.0 Google rating proof, verbatim client testimonials, and Google Business Profile listing. Verified with `pnpm lastmod:update`, `npm test` (166 files / 3,472 tests), `pnpm check`, and `priority-growth-project-verify.sh`.

## 2026-10-22 — Spanish caption-styles guide content-depth refinement

- [x] Prepare `/es/guias/mejores-estilos-de-subtitulos-para-reels` refinement: outcome-specific H1 and metadata, answer-first opening, an existing-page comparison between complete captions and short emphasis text, two contextual Spanish links, and refreshed page-lastmod ledger. `pnpm lastmod:update`, `npm run typecheck --silent`, and `npm test` passed (165 files / 3,469 tests). Before merge, `cto-qa-lead` must independently review the exact diff; after authorized release, verify production raw HTML and rendered links. `cto-seo-lead` owns the later comparable GSC read; traffic, ranking, and click impact remain unmeasured.

## 2026-10-21 — Large-video transfer guide content-depth refinement

- [x] Prepare `/guides/fastest-way-to-send-large-video-files-to-editor` refinement: direct H1/answer, one server-rendered cloud-versus-proxy-versus-drive decision section, two contextual internal links, and refreshed page-lastmod ledger. `npm run typecheck --silent` passed; the first full `npm test` found only the required stale date ledger, which `pnpm lastmod:update` corrected. Before merge, cto-qa-lead must capture a fresh full-suite terminal summary, review the exact diff, and after release verify the production raw HTML; cto-seo-lead owns the later settled GSC query/page read.

## 2026-10-21 — Fort Lauderdale Reels content-depth refinement

- [x] Prepare `/services/reels-editor-fort-lauderdale` refinement: direct supplied-clips outcome in H1/metadata, one server-rendered editing-versus-shoot decision section, and refreshed page-lastmod ledger. Local checks passed (`npm run typecheck --silent`, `npm test` 165 files / 3,469 tests, lint 0 errors, rail adoption 3/3, build rendered 569 static pages); independent review, release, production raw-HTML check, and settled GSC query/page remeasurement remain with cto-qa-lead and cto-seo-lead.

## 2026-10-19 — Rescue /es/precios with contextual internal links

- [x] Rescued `https://estebanmorenomedia.com/es/precios` from orphan/starvation status by adding 4 contextual internal links from high-earning pages: `/about`, `/` (via `AboutTeaser`), `/guides/best-caption-styles-for-instagram-reels`, and `/areas`. Validated with typecheck, vitest test suite, and `pnpm lastmod:update`.

## 2026-10-18 — Rescue /es/eventos with contextual internal links

- [x] Rescued `https://estebanmorenomedia.com/es/eventos` from orphan/starvation status by adding 4 contextual internal links from high-earning pages: `/about`, `/` (via `AboutTeaser`), `/guides/best-caption-styles-for-instagram-reels`, and `/areas`. Validated with typecheck, vitest test suite (162 suites, 2981 tests), and `pnpm lastmod:update`.

## 2026-10-14 — Rescue /es/areas with contextual internal links

- [x] Rescued `https://estebanmorenomedia.com/es/areas` from orphan/starvation status by adding 4 contextual internal links from high-earning pages: `/about`, `/` (via `AboutTeaser`), `/guides/best-caption-styles-for-instagram-reels`, and `/portfolio`. Validated with typecheck, vitest test suite (156 suites, 2939 tests), and `pnpm lastmod:update`.

## 2026-10-13 — Areas guide link

- [ ] Release and verify the contextual `/es/areas` link from the Spanish editor-versus-videographer guide after sibling review; implementation and validation record: `.ai/internal-links-es-areas-2026-10-13.md`.

# Esteban Moreno Media — Backlog

- [x] 2026-10-24: replace the small AI/SEO chooser visual with the documented Gains From Geebs full-bleed project image. PR #541 merged as `91c79f36`; production HTML, CI and IndexNow verified. Outcome measurement remains separate.

- [ ] 2026-10-24: release the current Gains From Geebs homepage and chatbot visual correction. PR #542 (`3931afac`) now mirrors the live chatbot's visible reply behavior: live status, cursor, thinking dots and reply sweep. Focused local tests (37), typecheck, lint (0 errors), and a 581-page production build passed. GitHub validation rerun `40123356549` and quality evidence are queued; after both pass, merge, verify raw production `/es` contains `gains-from-geebs-chatbot.jpg` and the chatbot opening state, then verify the 390px card visually. No performance outcome is claimed.
- [x] 2026-10-23: Prepare internal-link reinforcement for `/es/evaluacion` from `/`, `/about`, `/areas`, and `/contact` using the target H1 `Diagnóstico de Estrategia de Video`; retain the target's `/es` breadcrumb return link and refresh the page-lastmod ledger for changed page sources. `npm run typecheck --silent`, `npm test` (167 files / 3,489 tests), and `git diff --check` passed. Before merge, `cto-qa-lead` must independently review the exact diff; after authorized release, verify all four canonical production links and target breadcrumb. `cto-seo-lead` owns the later comparable GSC read; indexing, traffic, and inquiry impact remain unmeasured.

- [x] 2026-10-23: Prepare the content-depth refinement for `/guides/best-caption-styles-for-instagram-reels`: outcome-specific title and H1, a two-sentence answer-first opening, expanded safe-zone guidance, two closely related guide links, retained restaurant-editing service link, and refreshed page-lastmod ledger. `pnpm lastmod:update`, `npm run typecheck --silent`, and `npm test` completed without failures. Before merge, `cto-qa-lead` must independently review the exact diff; after authorized release, verify the production title, H1, raw FAQ HTML, links, and date. `cto-seo-lead` owns the later comparable GSC read; traffic, ranking, and click impact remain unmeasured.

- [x] 2026-10-22: Prepare the content-depth refinement for `/guides/corporate-video-production-cost-miami`: specific budget-and-comparison H1 and metadata, answer-first scope boundary, two quote-comparison FAQ answers, retained contextual internal links, and refreshed page-lastmod ledger. `pnpm lastmod:update`, `npm run typecheck --silent`, and `npm test` passed (165 files / 3,469 tests). Before merge, `cto-qa-lead` must independently review the exact diff; after authorized release, verify the production title, H1, raw FAQ HTML, links, and date. `cto-seo-lead` owns the later comparable GSC read; search and inquiry impact remain unmeasured.

- [ ] After the reviewed Clarity code is merged, create/select Esteban Moreno Media's real Microsoft Clarity project; add only its identifier as `NEXT_PUBLIC_CLARITY_PROJECT_ID` to the Vercel **Production** environment, redeploy, and complete the production verification/rollback steps in `docs/microsoft-clarity-activation.md`. Do not place the identifier in git or enable previews.

- [x] 2026-10-10: ship the annual-events section (hub + FLIBS + Art Basel first, then Miami boat show, SOBEWFF, eMerge Americas, Miami Music Week, Miami Spice) on `feat/events-hub`.
- [ ] 2026-11-01: refresh lib/events.ts — Miami Spice 2026 ends 2026-10-31 (`pnpm events:check` and the weekly follow-ups workflow go red until updated or set to null); FLIBS 2026 ends 2026-11-01.
- [ ] 2026-11-10: GSC impressions/indexed status and event_* / service_event_* CTA clicks for the events section URLs.

- [x] 2026-10-11: niche wave 8 — eight owner-approved EN/ES pairs (16 URLs, sitemap 300) on `feat/niche-wave-8`.
- [ ] 2026-11-11: GSC impressions, index status and inquiry CTA clicks for the 16 wave-8 URLs; merge or drop any pair at zero.

- [x] 2026-10-11: release EN/ES Miami restaurant search copy and contextual links to existing Fort Lauderdale production/Reels pages. PR #353 merged; exact-head CI and Cortex evidence green; production HTML/mobile/IndexNow verified. See `esteban-local-keyword-demand-gaps-2026-10-11` in the client vault.
- [ ] 2026-11-08: compare 28-day GSC clicks, impressions, and query-to-page routing for `restaurant promo video editing miami`, `video para restaurantes miami`, `fort lauderdale video production`, and EN/ES Reels terms; check qualified leads before calling the release an outcome win.

- [x] Implement the bilingual food/places creator service pair locally, with reciprocal links, package-derived prices, FAQ schema and sitemap/watch-list registration.
- [ ] 2026-10-21: compare GSC impressions/clicks and qualified inquiries for both food/places creator URLs (14 and 28 days after publication).

Production is live. This file tracks repository implementation; account/access work is also tracked in Obsidian.

## P0 — Lead persistence (2026-10-07)

- [x] Implement Supabase-first `/api/lead` storage, optional Resend fallback, truthful 503 failures, and unit coverage. Local, uncommitted: 64 targeted tests, full 1,131 tests, typecheck and changed-file lint pass. Details: `.ai/lead-persistence-2026-10-07.md`.
- [ ] Coordinator/cto-qa-lead: complete independent review and release checks, verify a tagged production submission against its `esteban_leads` row, then synchronize the project vault and registry before closing the incident.
- [ ] 2026-10-20: restore a valid sender plus a real mailbox API/IMAP connection for `info@estebanmorenomedia.com`; then merge and activate the guarded receipt reply, Esteban alert, and daily Spanish digest only after one real end-to-end probe.

## P0 — Search establishment

- [ ] 2026-10-16: after PR #454 merges, verify the site in Bing Webmaster Tools and Ahrefs Webmaster Tools through their browser UIs; submit/check both existing sitemap URLs in Bing, complete the first Ahrefs crawl, and record dated UI exports. Site-side preflight command: `pnpm search-tools:readiness`.
- [x] Verify Google Search Console and submit `/sitemap.xml`
- [x] Submit `/video-sitemap.xml` once after the 16 watch pages reached production; accepted for processing with immediate state pending and 0 errors/warnings, without resubmitting the regular sitemap
- [x] Request indexing for the four English/Spanish home and portfolio entry points: `/`, `/portfolio`, `/es`, and `/es/portafolio`
- [x] Verify the existing Google Business Profile: owner-accessible profile and public Maps card `cid=12305289738935181687` confirmed 2026-10-11; no new profile needed.
- [ ] Recheck the public Google Video editing service after the 2026-10-11 saved From $100 and supplied-footage description is published.

## P0 — Real proof

- [ ] Add Esteban's approved logo, headshot, and reel
- [x] Publish eight approved, public work samples in English and Spanish
- [ ] Publish 4–6 case studies with truthful location, deliverables, process, and outcome
- [ ] Add genuine reviews/testimonials after permission

## P1 — Technical SEO / GEO / ALOHA

- [x] Prepare `/es/calculadora-de-ritmo-de-video` content-depth refinement: specific 30/60-second word-count metadata and H1, answer-first copy, three visible server-rendered FAQs, two contextual links to existing Spanish tools, and a refreshed page-date ledger. Local `pnpm typecheck` and `npm test` passed; independent review, authorized release, production raw-HTML verification, and later comparable GSC observation remain required.
- [x] 2026-10-11: SEO/GEO audit wave on `fix/seo-geo-audit-wave` — the audit's 15 mechanical fixes (fix 8 partial), sitemap 284 → 310 by owner decision, `/llms.txt` generated from sitemap sources, 37 ported EN FAQs, answer-first blocks, sibling links. Details: `.ai/handoff.md`.
- [ ] 2026-11-10: check GSC indexed status and impressions for the 26 URLs added to the sitemap on 2026-10-10 (see `ownerOrderedAdditions` in `config/indexable-inventory-freeze.json`).
- [ ] Owner: decide guide bylines (Esteban as author of record?) and a date policy (`published`/`updated` fields) — unlocks visible dates, `dateModified` and sitemap `lastmod`.
- [ ] Owner-approved non-additive text-parity refresh: drop the 31 remaining links from `/es/servicios`, `/es/areas`, `/es/guias` and `/es/editor-de-video-miami` into noindexed pages, replace the templated `¿Para qué proyecto encaja?` H2, and apply the title brand-suffix rule to `/es/<slug>` pages.
- [ ] After `feat/es-real-estate-reel-shelf` merges: add the 6 reels to `video-sitemap.xml` and point the reels VideoObject `publisher` at `#business`.
- [ ] Copy: `/areas` Palm Beach County card still says "sub-city coverage is not yet published" while Palm Beach city pages are indexed; reword without strengthening Palm Beach positioning.
- [x] Prepare the Spanish editor-vs-videographer guide's Broward handoff to the existing Fort Lauderdale Reels and production services from fresh query/page evidence; full validation and live HTML checks are documented in `.ai/handoff.md`.
- [ ] After release, compare the same Fort Lauderdale Reels query/page group in settled GSC data and verify qualified inquiries; the link alone does not prove recommendation or ranking lift.
- [x] 2026-10-11: [PR #347](https://github.com/gonzaloeaguilar-bot/esteban-media/pull/347) merged after exact-head validation and Cortex evidence; production `/` and `/es` raw HTML returned 200 with the clarified "$100 per video" wording.
- [ ] Repeat the exact ChatGPT/Gemini buyer prompts in [[esteban-chatgpt-gemini-recommendation-probe-2026-10-11]] and compare settled GSC query/page results without claiming a causal ranking gain.

- [x] Prepare 2026-10-11 local `/es/areas` contextual links from the existing Coral Gables property-video and Fort Lauderdale yacht/hospitality pages; preserve all claims and existing target return links. Validation and review handoff: `.ai/handoff.md`.
- [ ] Coordinator/cto-qa-lead, before release: independently review and verify the two links; after release, confirm production HTML and update the vault/registry. Coordinator/cto-seo-lead, before the next starvation run: correct the recurring orphan classification and supply verified earning-page evidence.

- [x] Prepare the 2026-09-24 Spanish tool & resource internal-link reinforcement for `/es/areas`: added contextual internal links to `/es/areas` across 6 Spanish interactive tool pages (`/es/calculadora-de-ritmo-de-video`, `/es/planificador-de-ganchos-de-video`, `/es/planificador-de-tomas-de-video`, `/es/temporizador-de-guiones-de-video`, `/es/prompt-de-publicacion-diaria`, and `/es/recursos/kit-video-social`). Later GSC observation remains required; no inventory, metadata, schema, canonical, hreflang, NAP, price, client result, review, or availability promise changed.
- [x] Prepare the 2026-09-16 AI video editing vs human editor guide depth and FAQ schema from fresh GSC page evidence: `/es/guias/edicion-de-video-con-ia-vs-editor-profesional` has 4 impressions at average position 7.5 and `/guides/ai-video-editing-vs-human-editor` has 3 impressions at average position 9.0 in the 2026-08-19..2026-09-15 GSC search analytics. Deepened both locale entries with 5 substantive sections, bullet lists, contextual internal links to services/portfolio/guides/assessment, and 4 visible FAQs with FAQPage JSON-LD. Later GSC observation remains required.
- [x] Prepare the 2026-09-15 bilingual guide-hubs strategy assessment internal-link reinforcement from the `/es/guias` & `/es/evaluacion` candidates: `/guides` and `/es/guias` now route visitors to `/assessment` and `/es/evaluacion` to audit their video strategy before requesting quotes. Later GSC observation remains required; no inventory, metadata, schema, canonical, hreflang, NAP, or service claim changed.
- [x] Prepare the 2026-09-15 Spanish areas internal-link reinforcement from the `/es/areas` candidate: `/es/portafolio` and `/es/contacto` now include contextual body-copy links to the Spanish service-area hub using `áreas de servicio` anchor text. Later GSC observation remains required; no inventory, metadata, schema, canonical, hreflang, NAP, price, client result, review, street address, Palm Beach strengthening, drone claim, or availability promise changed.
- [x] Prepare the 2026-09-14 Spanish evaluation-to-contact internal-link reinforcement from the `/es/contacto` candidate: `/es/evaluacion` now routes ready diagnostic visitors to `/es/contacto` while explicitly avoiding assumptions about production, prices, or availability. Later GSC observation remains required; no inventory, metadata, schema, canonical, hreflang, NAP, or service claim changed.
- [x] Prepare the 2026-09-13 homepage service-area internal-link reinforcement from the `/es/areas` candidate: the bilingual hero now links production scope to `/areas` and `/es/areas` without changing URL inventory, metadata, schema, canonicals, hreflang, NAP, or Palm Beach positioning; later GSC observation remains required.
- [x] Prepare two additional contextual body-copy links to `/es/areas` from existing Spanish service pages for Reels and restaurant video; review and later GSC observation remain required.
- [x] Prepare a 2026-09-12 `/es/areas` internal-link reinforcement: contextual Spanish body-copy links from `/es`, `/es/servicios`, and `/es/portafolio` now use target-heading anchor language. Later GSC observation remains required; no inventory, route, sitemap, canonical, hreflang, schema, price, offer, testimonial, analytics, redirect, noindex, or factual/numeric claim changed.
- [x] Prepare restaurant promo snippet and intent-depth refinement from the 2026-09-12 demand wave: safer English metadata/schema copy, paired Spanish companion copy, local-brief guidance, and tests. Later GSC observation remains required; no inventory, route, sitemap, canonical, hreflang, redirect, noindex, or new claim changed.
- [x] Prepare editor-vs-videographer guide depth from fresh page evidence: `/guides/video-editor-vs-videographer` has 35 impressions, 0 clicks, and average position 10.9429 in the 2026-09-10 index-watch snapshot for 2026-08-12..2026-09-08. Added paired EN/ES decision-brief guidance for editing-first, filming-first, and combined-scope requests; the 2026-09-14 scoped follow-up adds English raw-footage handoff guidance and a matching visible FAQ after the live helper showed 24 impressions, 0 clicks, and average position 11.79 for the same settled page window. Later GSC observation remains required.
- [x] Prepare paired services-to-assessment internal links from `/services` to `/assessment` and `/es/servicios` to `/es/evaluacion` from the 2026-09-10 internal-link candidate set and 2026-08-11..2026-09-07 GSC window. Later GSC observation remains required; no inventory or schema changed.
- [x] Prepare caption-styles guide depth and FAQ schema from fresh GSC page evidence: `/es/guias/mejores-estilos-de-subtitulos-para-reels` has 16 impressions at average position 9.5 with 0 clicks in the 2026-08-12..2026-09-08 index-watch state, and the English counterpart has 33 impressions with 0 clicks. Later GSC observation remains required.
- [x] Prepare two contextual body-copy links to `/es/areas` from `/es` and `/es/servicios`; preserve existing hub return links. Independent review and release remain with the parent dispatch.

- [x] Prepare the `priority-growth:2026-09-02:esteban:replacement:recovery-7` English homepage proof-cue CTR refinement: retain the observed service terms and scoped-production boundary, then replace the generic portfolio callout with “View video editing work” in search and social descriptions; release verification and a later Search Console query/page observation remain required.
- [x] Prepare the `priority-growth:2026-09-03:esteban:recovery-6` English homepage website-designer snippet alignment: search, Open Graph, and X descriptions now use the observed `website designer` wording while retaining video editing services and scoped video production services; release verification and a later Search Console query/page observation remain required.
- [x] Prepare the `priority-growth:2026-09-03:esteban:recovery-5` English homepage portfolio-cue CTR contract: retain the observed service terms and scoped-production boundary, then consistently add “View portfolio work” to search and social descriptions; release verification and a later Search Console query/page observation remain required.
- [x] Prepare the `priority-growth:2026-09-03:esteban:recovery-3` English homepage three-intent CTR contract: the title and matching search/social descriptions now cover the observed video editing, website design, and scoped video production intent; regression coverage prevents the shared metadata surfaces from drifting. Release verification and a later Search Console query/page observation remain required.
- [x] Prepare the 2026-09-13 homepage service-area internal-link reinforcement from the `/es/areas` candidate: the bilingual hero now links production scope to `/areas` and `/es/areas` without changing URL inventory, metadata, schema, canonicals, hreflang, NAP, or Palm Beach positioning; later GSC observation remains required.
- [x] Prepare a bilingual search-title refinement for the indexed large-file transfer guide: GSC recorded the English URL at 48 impressions, 0 clicks, and position 21.96 for the 28-day window ending 2026-08-31. The EN/ES metadata titles now lead with the direct transfer question; release verification and a later Search Console observation remain required.
- [x] Prepare the `priority-growth:2026-09-03:esteban:recovery-2` English homepage title refinement: title, Open Graph, and X metadata now contain the observed `video editing services` phrase and retain the confirmed production category; release verification and a later Search Console query/page observation remain required.
- [x] Prepare the `priority-growth:2026-09-03:esteban` English homepage search-snippet refinement: the title-aligned metadata now leads with Esteban Moreno Media and names the observed `video editing services` and scoped `video production services` queries; release verification and a later Search Console query/page observation remain required.
- [x] Prepare the `priority-growth:2026-09-02:esteban:replacement:recovery-3` English homepage service-card and digital-systems CTR refinement: service descriptions and digital-systems summary in the homepage strip now explicitly connect `website designer`, `video editing services`, and `video production services` search intent without expanding confirmed offerings; release verification and a later GSC query/page observation remain required.
- [x] Prepare the `priority-growth:2026-09-02:esteban:replacement:recovery-2` English homepage website designer intent alignment: visible authority hub copy now incorporates the observed `website designer` query for custom website workflows; release verification and a later GSC query/page observation remain required.
- [x] Prepare the `priority-growth:2026-09-02:esteban:replacement` English homepage service-intent clarification: visible hero copy now matches the observed `video editing services` and `video production services` wording while keeping production scoped by project; release verification and a later GSC query/page observation remain required.
- [x] Prepare the `priority-growth:2026-09-02:esteban` homepage CTR refinement from the immutable brief: lead the English homepage title with the observed branded query and retain confirmed video editing and scoped production services; later GSC query/page observation remains required.
- [x] Prepare an evidence-bound English homepage CTR refinement for the 2026-08-27 `video production services` query observation (2 impressions, 0 clicks): title and description now name scoped video production services without expanding the confirmed offering.
- [x] Strengthen `/es/areas` with contextual links to the existing Miami-Dade, Fort Lauderdale/Broward, and short-form Spanish project guides; no new indexable URL or unsupported service-area claim.
- [x] Add a contextual Spanish portfolio-to-areas link for visitors considering an on-location South Florida production; no new indexable URL or service-area claim.
- [x] Prepare a durability-tested metadata refinement on the actual `/about` page ranking for `esteban moreno` (6 impressions, position 13.7 in the 2026-08-27 28-day GSC artifact); pending independent review, PR checks, deployment, and a fresh query/page observation.
- [x] Prepare depth and FAQ-schema expansion for the existing EN/ES restaurant-promo service pair without changing the frozen 243-URL inventory; PR #144 is open, with independent CTO review and later GSC observation pending.
- [x] Prepare a bilingual CTR candidate for the near-top-10 `/areas` and `/portfolio` hubs, with a dedicated-service link that consolidates restaurant-promo intent without changing the frozen 243-URL inventory; awaiting PR review, deploy, and fresh GSC evidence.
- [x] Release the bilingual digital-systems service-hub expansion after a clean full test/build and independent review. Keep the sitemap frozen; create individual product/service URLs only as 1:1 replacements with demand and conversion evidence.

- [x] Render Spanish pages with initial document-level `lang="es"`
- [x] Add a branded 1200×630 Open Graph image
- [x] Tighten long titles and homepage descriptions
- [x] Add one direct entity/service/location sentence above the homepage fold
- [x] Run three mobile and three desktop Lighthouse audits on `/`, `/es`, `/portfolio`, and `/es/portafolio`; record medians and remediate the semantic/accessibility findings (mobile performance 95/93/95/94, desktop 100s, final accessibility/SEO/best-practices 100)
- [x] Add truthful localized `VideoObject` data on all 16 dedicated watch pages and represent collection entries as links to those `WebPage` entities
- [x] Add an `ImageObject` for the existing square brand icon to the LocalBusiness entity; production homepage JSON-LD contains the logo URL. Replace it with an approved dedicated logo asset when one is supplied.
- [ ] Add English priority-service pages when distinct, verified content is ready
- [x] Strengthen the homepage, bilingual service/area hubs, internal proof links, and Esteban entity graph using only approved facts
- [x] Add contextual inbound links to the existing Spanish practical-video guide hub from earning content and service-area pages
- [x] Add a bilingual homepage authority hub that connects priority services to three accurately credited portfolio projects
- [x] Rebuild the corporate-video pricing guide with transparent scope factors, quote inputs, decision criteria, visible FAQ, and matching structured data
- [x] Freeze the 259-URL sitemap until the current inventory is classified; CI now rejects URL-count growth or duplication
- [x] Publish four practical bilingual guide pairs with explicit general-guidance and evidence caveats
- [x] Use click-to-load YouTube facades on both collection pages while keeping every watch-page iframe rendered and discoverable
- [x] Release ESTEBAN-03 Pembroke Pines EN/ES pages; both production URLs returned 200 with reciprocal language links on 2026-10-11.
- [ ] Compare settled GSC query/page and qualified inquiries for the Pembroke Pines pair before claiming a search outcome.

## P1 — Product and measurement

- [x] Harden the Search Console index-watch warning path for the Top 20 growth batch: current neutral/excluded URLs now persist in `neutralWatch`, 7+ day neutral pages emit a `neutral_seven_day_watch` warning and render a follow-up table in the managed note, recovered URLs clear from neutral tracking, and legacy state backfills the current 63 neutral URLs. Verified 2026-10-01 with `pnpm exec vitest run scripts/search-console-index-watch.test.mjs` (28 tests) and `pnpm index-watch:status` reporting `pass 193`, `neutral 63`, `fail 0`, `unknown 0`, `pendingNotificationCount 0`, and `neutralWatchCount 63`.
- [x] Add the shared-component adoption path for Esteban AI contributions: `.ai/service-page-template.md` tells contributors to use `components/service-depth.tsx`, `app/__tests__/rail-adoption.test.ts` blocks new dense hand-rolled page files, `.github/workflows/rail-adoption.yml` runs the gate weekly/manual, and `/services/yacht-hospitality-video-fort-lauderdale` is the migrated model page. Verified 2026-10-01 with `pnpm check` exit 0: rail-kit check, adoption check, lint, typecheck, 91 test files / 907 tests, production build, and text parity across 87 Spanish routes.
- [x] Align the bilingual homepage hero with the primary technology inquiry lanes (AI lead capture, automated customer workflows, and conversion websites), preserving the existing privacy-safe homepage intake and its consent-scoped language
- [x] Add a single-step homepage project intake using the existing `/api/lead` and privacy-safe `lead_submit` measurement paths, including direct hero placement and idempotent GA4 key-event provisioning
- [x] Add a bilingual direct inquiry intake to the verified website-design/chatbot commercial pair, with a distinct privacy-safe `website-design-intake` measurement source
- [x] Add an accessible bilingual portfolio backed by real public work
- [x] Connect a production-scoped GA4 stream with query-safe manual page measurement and a bilingual privacy disclosure
- [x] Install and acceptance-test the three-times-weekly Search Console index-watch loop; live inventory migrated from 20 to 46 with indexing classifications of 20 `PASS`, 26 new `NEUTRAL`, and no failures/unknowns
- [x] Install and acceptance-test the Sunday health and Search Console digest loop; probes pass and the expected overall `DEGRADED` state tracks Google's processing of the 26 new URLs
- [x] Define contact and AI-referral measurement; provision GA4 dimensions for `contact_method` and `ai_source`
- [x] Add route metadata, sitemap, portfolio schema, and data tests
- [x] Run the live weekly search/index digest on 2026-08-12 and connect qualified-action evidence to the zero-token portfolio GA4 ingest
- [x] Add interactive bilingual daily video script timer & pacing calculator surface (`/daily-script-timer` and `/es/temporizador-de-guiones-de-video`)

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

- [x] Repair 2026-09-05 retained homepage inquiry shortcuts for bilingual technology services and accessibility; local gates and rendered HTTP checks passed.
- [ ] cto-qa-lead: review retained draft before release, then verify production shortcut content and synchronize canonical notes after deployment.

## 2026-09-24 — brand entity + title-dedup fix (this session)

- [x] Fix double-branded `<title>` on /contact, /es/contacto, /es (home), and
      /desk-recommendations — `buildPageMetadata` now detects a title that
      already names the brand and wraps it in `{ absolute }` so the root
      layout's `%s | Esteban Moreno Media` template doesn't append it again.
      Negative control: `app/__tests__/brand-title-dedup.test.ts` (181 pages).
- [x] Added `logo` (ImageObject, apple-icon.png 180x180) to the Organization/
      LocalBusiness JSON-LD node. Organization + WebSite + Person graph was
      already present sitewide via SiteChrome — no gaps otherwise.
- [x] Verified /portfolio, /about, /contact, /areas are already linked from
      the home page's visible header nav + footer with plain anchors — no
      change needed.
- [x] Git-history review 2026-08-24..2026-09-05: no robots/sitemap/canonical/
      nav changes in the window. Found the likely cause of the week-of-08-31
      GSC drop instead — the homepage `<title>`/description were rewritten
      ~16 times in that window (PRs #145,#148,#151,#154,#155,#157-#165,#168,
      #170,#172-#174), 8 of them within a single hour on 2026-09-03. Filed as
      the evidenced finding in the PR description.

## 2026-09-30 — Commercial citation & Fort Lauderdale social video editing guide (PR in progress)

- Prepared commercial citation & local discovery reinforcement for buyer intent: "Which video editors in Fort Lauderdale should a small business hire for social media videos and reels? Compare specific providers and cite their websites."
- Deepened bilingual Fort Lauderdale cost & provider comparison guide (`/guides/video-production-cost-fort-lauderdale` and `/es/guias/cuanto-cuesta-la-produccion-de-video-en-fort-lauderdale`) with direct answer-first structure, small-business editing rates ($100 starter, $640 monthly, $800 on-location day), reels/social media delivery criteria, raw footage handoff specifications, and 4 FAQs per locale with FAQPage JSON-LD.
- Updated `/fort-lauderdale` landing page to reflect Fort Lauderdale as primary home base, highlighting published editing packages, short-form reels focus, and verified portfolio proofs.
- Verified text-parity snapshot, demand-page regression tests (62 tests), analytics gate, and full build validation.

## 2026-10-03 — Visual audience choices and monthly plans

- [x] Replace text-only audience cards with coherent labeled illustrations, existing project video, clear service links and optional original explanations.
- [x] Replace repeated oversized monthly-plan headers with an illustrated selector using the existing pricing source; retain complete terms, Spanish parity and no-JS access.
- [x] Verify source/build gates and mobile/desktop behavior. Final production evidence is recorded in the dated project vault note.

- [x] Owner-requested real-estate-only visual boundary, distinct1/2/3-property plan artwork, playful touch/keyboard response and reference storage; implemented and browser-verified2026-10-03. Delivery record: `.ai/handoff.md` and Obsidian `esteban-plan-distinction-2026-10-03`.

- [x] Replace à la carte text/icon tiles with six distinct playful illustrations, shared disclosures, useful preparation guidance, EN/ES source links and finite touch motion (2026-10-03 owner request).
## 2026-10-23 — Owner-authorized real-estate social reel carousel

- [x] Add the supplied published social reel to the existing real-estate carousel as a self-hosted seventh item. Local lint, typecheck, full test suite (165 files / 3,470 tests), analytics gate, build, text parity, rail checks, and desktop/390px playback checks passed.
- [ ] Obtain the governed independent review, release `feat/real-estate-social-reel`, and verify the live player at desktop and 390px before calling it public.

## 2026-10-23 — Owner-requested production release

- [x] Add native muted inline autoplay to the existing homepage hero and retain the reduced-motion poster path. The combined local candidate passed lint, typecheck, 165 test files / 3,471 tests, analytics, build, text parity, rail adoption, raw HTML, and rendered playback checks.
- [ ] Push the combined owner-media candidate, merge after green CI, and verify production homepage autoplay plus the new real-estate reel at desktop and 390px.
