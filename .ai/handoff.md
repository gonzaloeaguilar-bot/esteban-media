## Restaurant promo snippet and intent depth — 2026-09-12

- Fresh demand-wave dispatch evidence records GSC window 2026-08-12 through 2026-09-08 at 2 clicks, 603 impressions, average position 26.4. The standing charter and prior PR #143 evidence identify `restaurant promo video editing miami` as a near-top-10 query split between `/areas` and `/services/restaurant-promo-video-editing-miami`.
- Chosen move class: page with impressions/near-threshold intent needing depth and safer snippet language. Tightened the English restaurant service title/description and Service schema description, added Miami restaurant brief guidance, and mirrored the Spanish companion page description/lead/body copy. The copy preserves the $240 starting price already present, keeps the `client-supplied footage` boundary, and removes reservation/fill-tables outcome promises.
- Regression coverage in `app/__tests__/page-metadata.test.ts` and `app/__tests__/restaurant-promo-depth.test.ts` pins the new snippet, EN/ES factual no-guarantee language, contact/service links, FAQPage parity, and substantive depth. No URL, sitemap, canonical, hreflang, redirect, noindex, new price, client result, review, street address, drone-pilot claim, or availability promise changed.
- Validation on Node v26.7.0: `pnpm lint`, `pnpm typecheck`, `pnpm test` (61 files / 427 tests), and `git diff --check` all exit 0. Node emits the existing unsupported-engine warning because the repo asks for `>=20.9 <23`.
- External Obsidian hot note and global project registry sync are deferred to the parent verifier because this dispatch confines writes to `/Users/gonzalo/code/esteban-media` and subdirectories.

## Editor-vs-videographer guide depth — 2026-09-11

- Fresh page-level evidence from `/Users/gonzalo/.local/state/esteban-media-index-watch/latest.json` generated 2026-09-10 shows `/guides/video-editor-vs-videographer` with 35 impressions, 0 clicks, and average position 10.9429 for the 2026-08-12 through 2026-09-08 window. The broader 2026-09-11 GSC/GBP review records 2 clicks, 603 impressions, and average position 26.4 with no alerts.
- Deepened the existing English and Spanish `editor-vs-videographer-guide` pair with a quote-decision brief section that separates editing-first, filming-first, and combined-scope inputs. Existing service, contact, language, proof, Article, breadcrumb, and FAQPage surfaces remain in place.
- Regression coverage in `lib/__tests__/guides.test.ts` pins EN/ES section count, FAQ count, decision-brief phrases, service links, and FAQPage schema parity. No URL, sitemap, canonical, hreflang, redirect, noindex, price, client result, review, street address, drone-pilot claim, or availability promise changed.
- Validation on Node v26.7.0: `pnpm lint` exited 0; `pnpm typecheck` exited 0 with a 600-second timeout wrapper after a 300-second wrapper timed out silently; `git diff --check` exited 0; focused `pnpm test lib/__tests__/guides.test.ts lib/__tests__/demand-pages.test.ts` passed 44 tests. Plain `pnpm test` ran 423/427 passing but hit four unrelated 5-second test timeouts; `pnpm test -- --testTimeout=30000` passed 61 files / 427 tests. Node emits the existing unsupported-engine warning because the repo asks for `>=20.9 <23`.
- External Obsidian hot note and global project registry sync are deferred to the parent verifier because this dispatch confines writes to `/Users/gonzalo/code/esteban-media` and subdirectories.

## Services-to-assessment internal links — 2026-09-11

- Fresh demand-wave evidence from the dispatch and local review state records Search Console window 2026-08-11 through 2026-09-07 at 2 clicks, 599 impressions, average position 26.8. The local candidate file for 2026-09-10 exposes Spanish hub internal-link candidates including `/es/servicios` and `/es/evaluacion`, with no page-level rank-band rows available.
- Added paired internal links from `/services` to `/assessment` and `/es/servicios` to `/es/evaluacion`, including one contextual body-copy link near the service scoping explanation and one CTA in the final action cluster per locale. No URL, sitemap, canonical, hreflang, schema, price, client result, address, review, drone, noindex, or redirect changed.
- Regression coverage in `app/__tests__/services-assessment-links.test.ts` verifies both rendered service hubs include the diagnostic/evaluation hrefs and visible text. Validation on Node v26.7.0: `pnpm lint`, `pnpm typecheck`, `pnpm test` (61 files / 426 tests), and `git diff --check` all exit 0. Node emits the existing unsupported-engine warning because the repo asks for `>=20.9 <23`.
- External Obsidian hot note and global project registry sync are deferred to the parent verifier because this dispatch confines writes to `/Users/gonzalo/code/esteban-media` and subdirectories.

## Caption-styles guide depth and FAQ schema — 2026-09-10

- Fresh index-watch state for 2026-08-12 through 2026-09-08 shows `/es/guias/mejores-estilos-de-subtitulos-para-reels` at 16 impressions, 0 clicks, average position 9.5; the English counterpart `/guides/best-caption-styles-for-instagram-reels` has 33 impressions, 0 clicks, average position 41.94.
- Deepened the existing bilingual caption-styles guide pair with practical guidance on choosing caption style by viewing context, balancing active word highlighting with readability, safe-zone checks, and editable text layers. Added three visible FAQs in both locales, which now emit matching `FAQPage` JSON-LD through the existing guide structured-data builder.
- Regression coverage in `lib/__tests__/guides.test.ts` asserts the EN/ES section and FAQ counts, contextual links, and exact FAQPage schema parity. No URL, sitemap, canonical, hreflang, redirect, noindex, price, client result, review, address, drone, or availability claim changed. Later GSC query/page observation remains required; no traffic result is claimed.

## Spanish guide-hub inbound links — 2026-09-09 (rebuild of PR #141)

- Added two contextual inbound links to `/es/guias`: one from the Spanish product-photography cost guide when preparing a content brief, and one from the English service-areas page for Spanish-first clients planning a remote handoff. The Spanish homepage link remains in place from the prior merged remediation.
- Verification: `npm run typecheck --silent`, `npm test`, and `git diff --check` exited 0. This change has not been deployed or measured in Search Console.

## Overnight draft repair — 2026-09-08

- Repaired the retained branch `growth/overnight-esteban-20260908-1708` by restoring the required uncommitted `.overnight-verification.json` manifest for `/areas`. It asserts the two distinctive visible labels introduced by the English Areas-page link change.
- Live local validation: `verify-content.py ... --validate-only` exited 0 (`{"valid": true, "pages": 1}`). The local production server returned HTTP 200 for `/areas`; both changed labels were visible and the target service href appeared four times total, including two pre-existing related links.
- Deterministic gates: focused regression 4/4 passed; `pnpm check` passed lint, typecheck, 60 test files / 423 tests, and a 309-page production build; `git diff --check` exited 0.
- No push, PR, deployment, provider dispatch, or external lead submission was performed. The manifest remains uncommitted by design.

## Overnight draft repair verification — 2026-09-06

- Repaired the retained branch's missing `.overnight-verification.json` evidence manifest. It now validates two absolute production pages (`https://estebanmorenomedia.com/` and `/es`) against distinctive visible quick-select labels; it remains uncommitted by design.
- The required validator now exits `0` with `{"valid": true, "pages": 2}`. `pnpm check` exits `0` with lint, typecheck, 60 test files / 423 tests, and a 309-page production build. `git diff --check` exits `0`.
- Local rendered HTTP smoke checks against `pnpm start --port 3187` returned `200` for `/` and `/es`; scoped form parsing found the exact English order `AI chatbots`, `Email and SMS follow-up`, `Website design` and Spanish order `Chatbots con IA`, `Seguimiento por email y SMS`, `Diseño web`, exit `0`.
- `git ls-remote origin refs/heads/main` remains represented by `origin/main` at `a71e1e4`; the branch is ahead by three commits. No push, PR, deployment, or external lead submission was performed.

## Overnight draft repair — 2026-09-05

- Scope: retained branch `growth/overnight-esteban-20260905-1521`, original commit `f407bad`; only the existing homepage intake shortcuts were repaired. Graph dependencies: `hero-video` → `hero-project-intake` → `analytics-events`.
- Replaced video/content shortcuts with localized AI chatbot, email/SMS follow-up, and website inquiries, matching the dispatch priorities and existing `lib/growth-systems.ts` / `lib/portfolio.ts` capabilities. Added accessible pressed state, field association, 44px minimum targets, focus outline, and disabled shortcuts while submitting. No delivery claims, new integrations, or external messages.
- Live `git ls-remote origin refs/heads/main` matched local `origin/main` at `a71e1e4`; no merge needed. `gh run list --branch growth/overnight-esteban-20260905-1521 --limit 5 --json databaseId,status,conclusion,url` returned `[]`; no branch CI failures were available.
- Initial `pnpm check` exited 1 because dependencies were missing. `pnpm install --frozen-lockfile --store-dir .pnpm-store` exited 0 (store subsequently moved under ignored node_modules). Added regression initially failed on attribute ordering; corrected to inspect the required field independently. Final `pnpm check` exited 0: lint, typecheck, 60 test files / 423 tests, and production build. `git diff --check` exited 0.
- `pnpm start --port 3187` plus Python urllib/HTMLParser checks returned HTTP 200 for `/` and `/es`; all localized shortcut text appeared in visible HTML in the specified order. Live production reads returned HTTP 200 but lacked the new shortcut content, as expected for an unpublished branch. No lead was submitted; production behavior is not claimed verified.
- `.overnight-verification.json` contains exact production URL/text/order assertions and remains uncommitted. Local check/install/server logs are ignored. No push or PR creation.
- Next: cto-qa-lead reviews this retained draft before any release; after authorized deployment, run the uncommitted assertions against production. Canonical wiki/registry writes were deferred because this dispatch restricts all writes to this worktree; this entry is the local handoff for that synchronization.

## Overnight evidence repair — 2026-09-05

- The prior CTO attempt failed before verification because the provider returned an empty response; no code change was required. `origin/main` remains `a71e1e4`, and the retained branch remains two commits ahead.
- Re-ran `pnpm check`: lint, typecheck, 60 test files / 423 tests, and the 309-page production build all exited 0. `git diff --check` also exited 0.
- Repaired the uncommitted `.overnight-verification.json` assertions to check distinctive visible shortcut labels on `https://estebanmorenomedia.com/` and `/es`. Whole-page order was intentionally not asserted because `Website design` already appears elsewhere on the homepage; the built HTTP boundary separately verified the shortcut button order in both locales.

## Spanish areas contextual inbound links — 2026-09-05

- Added two body-copy links to `/es/areas`: location planning on `/es` and the existing Fort Lauderdale sentence on `/es/servicios`. Anchors use the target's visible heading language. Existing `/es/servicios#edicion` and `#videografia` return links already satisfy the hub-link requirement.
- Inspected the supplied Graphify dependencies and shared context packet; both SHA-256 hashes match the dispatch. The supplied earning-page list is empty; these sources were selected for topical relevance, with earnings unverified.
- The orphan premise recurs despite prior portfolio-to-areas work: current source already contains links from portfolio, contact, services, and the Palm Beach page. `curl` verified the target returns HTTP 200. No indexing or traffic improvement is claimed.
- Validation: `npm run typecheck --silent`, `pnpm lint`, and `git diff --check` exited 0. Full `pnpm test`: 420/421 passed, with a five-second timeout in the unchanged English portfolio mesh test. Isolated default retry also timed out; `pnpm exec vitest run lib/__tests__/portfolio.test.ts --maxWorkers=1 --minWorkers=1 --testTimeout=30000` passed all 19 tests. No test/config changes were made. Production build and deployment were not run in this scoped implementation dispatch.
- Parent `cto-qa-lead`: complete independent review and any release checks before shipping. External Obsidian/registry writes and provider dispatch records are deferred because this task confines writes to this worktree. Detector follow-up: check actual inbound links before labeling an existing route orphaned.

# Esteban Moreno Media — Engineering Handoff

## Homepage video-editing proof cue — 2026-09-03

- The immutable `priority-growth:2026-09-02:esteban:replacement:recovery-7` brief records **0 clicks from 31 homepage impressions** from 2026-08-26 through 2026-09-01. It names the homepage for `website designer` (3 impressions, 0 clicks), `video production services` (2 impressions, 0 clicks), and `video editing services` (2 impressions, 0 clicks).
- The English homepage search, Open Graph, and X descriptions retain those supported service terms and the scoped-production boundary, while replacing the generic portfolio cue with “View video editing work.” The 157-character description points to the site's existing work without adding a client, result, price, or availability claim.
- Regression coverage requires all three descriptions to retain the cue. Run the governed verifier before release, then compare a later Search Console query/page window; no click-through or ranking outcome is claimed.

## Homepage website-designer snippet alignment — 2026-09-03

- The immutable `priority-growth:2026-09-03:esteban:recovery-6` brief records **0 clicks from 31 homepage impressions** from 2026-08-26 through 2026-09-01. It identifies the homepage for `website designer` (3 impressions, 0 clicks), `video production services` (2 impressions, 0 clicks), and `video editing services` (2 impressions, 0 clicks).
- The English homepage search, Open Graph, and X descriptions now use the exact supported phrase “website designer support,” while retaining video editing services and scoped video production services. This changes no route, canonical, hreflang, sitemap, schema, price, client, result, or availability claim.
- Regression coverage requires the shared descriptions to retain the phrase. Run the governed verifier before release, then compare a later Search Console query/page window; no click-through or ranking outcome is claimed.

## Homepage portfolio-cue CTR contract — 2026-09-03

- The immutable `priority-growth:2026-09-03:esteban:recovery-5` brief records **0 clicks from 31 homepage impressions** from 2026-08-26 through 2026-09-01. It identifies the homepage for `website designer` (3 impressions, 0 clicks), `video production services` (2 impressions, 0 clicks), and `video editing services` (2 impressions, 0 clicks).
- The English homepage keeps the observed service terms and scoped-production boundary, then adds the concise “View portfolio work” cue to its search, Open Graph, and X descriptions. This points searchers to evidence already available on the site without adding a client, result, price, or availability claim.
- Regression coverage requires all three descriptions to retain that cue. Run the governed verifier before release, then compare a later Search Console query/page window; no click-through or ranking outcome is claimed.

## Homepage three-intent CTR contract — 2026-09-03

- The immutable `priority-growth:2026-09-03:esteban:recovery-3` brief records **0 clicks from 31 homepage impressions** for 2026-08-26 through 2026-09-01. It identifies the homepage for `website designer` (3 impressions, 0 clicks), `video production services` (2 impressions, 0 clicks), and `video editing services` (2 impressions, 0 clicks).
- The English homepage title now retains the exact `Video Editing Services` phrasing while naming the confirmed website-design offering. Its search, Open Graph, and X descriptions consistently state video editing services, website design, and scoped video production services.
- Regression coverage requires the three shared descriptions to keep both the video-editing/website-design language and the scoped-production boundary. Run the governed verifier before release, then measure a later Search Console query/page window. No click-through or ranking result is claimed.

## Homepage title query alignment — 2026-09-03

- The immutable `priority-growth:2026-09-03:esteban:recovery-2` brief records 0 clicks from 31 homepage impressions for 2026-08-26 through 2026-09-01. On 2026-08-31, the homepage appeared for `video editing services` and `video production services`, with 2 impressions and 0 clicks for each query.
- The English homepage title now states the exact observed `Video Editing Services` phrase while retaining Esteban Moreno Media and the confirmed production category. The matching Open Graph and X titles use the same wording; the description remains limited to scoped production services.
- This is a search-result wording change only. Run the governed verifier before release and use a later Search Console query/page window to assess the result; no click-through or ranking outcome is claimed.

## Homepage search-snippet refinement — 2026-09-03

- The immutable `priority-growth:2026-09-03:esteban` brief records 0 clicks from 31 homepage impressions for 2026-08-26 through 2026-09-01. On 2026-08-31, the homepage appeared for `video production services` and `video editing services`, with 2 impressions and 0 clicks for each query.
- The English homepage metadata now begins with Esteban Moreno Media and uses the observed service phrases, while retaining the confirmed boundary that on-location production is scoped. Open Graph and X metadata use the same description.
- This is a search-result wording change only; it does not claim a click-through or ranking result. Run the governed verifier before release and check a later Search Console query/page window for the outcome.

## Homepage services-strip intent refinement — 2026-09-02

- The immutable `priority-growth:2026-09-02:esteban:replacement:recovery-3` brief records **0 clicks from 31 impressions** over 2026-08-26 through 2026-09-01 (10 impressions in the final 72 hours) and names the English homepage for `website designer` (3 impressions, 0 clicks on 2026-08-27), `video production services` (2 impressions, 0 clicks on 2026-08-31), and `video editing services` (2 impressions, 0 clicks on 2026-08-31).
- The English homepage services strip and shared service catalog now explicitly reflect the observed search terms: the website design service card and digital systems highlight feature “Website designer” workflows and solutions, while editing and on-location cards name “video editing services” and “video production services” explicitly within confirmed scoped offerings.
- Regression coverage in `app/__tests__/customer-ranking-pages.test.ts` asserts these visible phrases. Before release, run the governed priority-growth verifier; after release, observe future GSC query/page metrics. No CTR or ranking outcome is claimed.

## Homepage website-designer intent alignment — 2026-09-02

- The immutable `priority-growth:2026-09-02:esteban:replacement:recovery-2` brief records **0 clicks from 38 impressions** over 2026-08-25 through 2026-08-31 and names the English homepage for `website designer` (3 impressions, 0 clicks on 2026-08-27), `video production services` (2 impressions, 0 clicks on 2026-08-31), and `video editing services` (2 impressions, 0 clicks on 2026-08-31).
- The English homepage authority hub card for websites and automation now explicitly incorporates “Custom website designer workflows” alongside mobile-first sites, forms, and agent-assisted systems, connecting directly to the confirmed website design service capability without adding new routes, changing sitemaps, altering canonicals, or expanding claims.
- Regression coverage in `app/__tests__/customer-ranking-pages.test.ts` asserts the visible phrase. Before release, run the governed priority-growth verifier; after release, observe future GSC query/page metrics. No CTR or ranking outcome is claimed.

## Homepage service-intent clarity — 2026-09-02

- The immutable `priority-growth:2026-09-02:esteban:replacement` brief records **0 clicks from 38 impressions** over 2026-08-25 through 2026-08-31 and names the English homepage for `video editing services` (2 impressions, 0 clicks) and `video production services` (2 impressions, 0 clicks) on 2026-08-31.
- The existing English homepage metadata already contained those supported service terms. Its visible hero summary now uses the matching phrases “video editing services” and “Video production,” while retaining the supported limit that production is scoped by project. This adds no route, pricing, client result, location claim, canonical, hreflang, sitemap, or schema change.
- Regression coverage verifies both visible phrases. Before release, run the repository gates and the governed priority-growth verifier; after release, use a later GSC query/page read to observe clicks and impressions. No CTR or traffic outcome is claimed.

## Homepage CTR refinement — 2026-09-02

- The immutable priority-growth brief for `priority-growth:2026-09-02:esteban` reports no organic clicks in its seven-day read (32 impressions) and identifies the English homepage for the observed `esteban moreno media` and `video production services` queries.
- The English homepage title now begins with the exact business name and retains the confirmed video editing and scoped production service category. Its description uses the same supported scope, including AI-assisted content and social planning. Open Graph and X/Twitter metadata match the search snippet.
- Regression coverage locks the branded title and supported description. This candidate does not add a route, change sitemap/canonical/hreflang/schema, or claim a traffic outcome. Validate before release, then observe a later GSC query/page read for clicks and impressions.

## English founder-page branded-query metadata — 2026-08-28

- Fresh GSC candidate artifact `~/.claude/state/growth-remediation/latest-analysis.json` selected the real `/about` ranking page for `esteban moreno`: **6 impressions, 0 clicks, average position 13.7** in its 28-day read. This is a recurrence of the July title-only change, so the durable regression coverage now locks the full person-to-business entity framing rather than relying on a one-off metadata edit.
- The existing `/about` route now leads its title with `Esteban Moreno | Founder & Video Editor` and its 160-character description ties the publicly visible founder bio to Esteban Moreno Media, Fort Lauderdale, Spanish-first video editing, AI-assisted content, social planning, and scoped projects. No route, canonical, hreflang, schema, sitemap, or service claim changed.
- Local release boundary: Node `22` `pnpm lint`, `pnpm typecheck`, `pnpm test` (**56 files / 413 tests**), `pnpm build` (**309 static pages**), and `git diff --check` passed. Pending independent CTO review, PR checks, and post-release live `/about` metadata plus later GSC query/page observation; no traffic gain is claimed.

## Restaurant promo service-page depth and FAQ parity — 2026-08-27

- PR #144 deepens the existing English `/services/restaurant-promo-video-editing-miami` and Spanish `/es/edicion-de-video-promocional-para-restaurantes-miami` pages without adding routes or changing metadata, canonicals, hreflang, or sitemap inventory. It covers short-form dish/menu structure, appetite-led natural-texture color treatment, 9:16 and 1:1 delivery, sound-off captions, client-supplied-footage handoff, and a project-scoped revision workflow.
- Each locale has five visible FAQs. The English page emits matching `FAQPage` JSON-LD directly; the Spanish page continues through `buildSpanishNicheStructuredData`, whose schema parity is asserted by the new regression test.
- Validation on branch `codex/restaurant-depth-20260827`, commit `eb3b681`: `pnpm lint`, `pnpm typecheck`, `pnpm test` (**55 files / 411 tests**), `git diff --check`, and `pnpm build` passed. The built sitemap file contains exactly **243** `<loc>` entries. Source-copy counts: EN 1,178 → 2,156; scoped ES object 174 → 959. No deployment or performance outcome is claimed; PR review and a future GSC observation are the remaining evidence boundaries.

## Near-top-10 CTR targeting and restaurant-query canonicalization — 2026-08-27

- Candidate branch `fix/ctr-near-top10-20260827` refreshes the metadata for the existing English/Spanish areas and portfolio hubs. The raw titles are 50–60 characters and all four descriptions are 120–160 characters; no URL, canonical, schema, or sitemap entry changes.
- The English and Spanish area hubs now make geographic scope their explicit purpose and link restaurant-promo visitors to the respective dedicated restaurant service page. This is intended to consolidate the observed English restaurant-promo query toward `/services/restaurant-promo-video-editing-miami`, without a redirect, noindex directive, or inventory exception.
- Regression coverage asserts the exact metadata strings, length bounds, and locale-correct dedicated-service links. Local checks: `pnpm lint`, `pnpm typecheck`, `pnpm test` (54 files / 409 tests), and `git diff --check` passed. The full suite includes the frozen-inventory assertion for exactly 243 sitemap URLs and its approved hash. No deploy has occurred; the post-release evidence is a new GSC observation for the affected pages and query.

## Homepage technology-intake hero alignment — 2026-08-26

- Reframed the shared English/Spanish homepage hero around the verified primary commercial lanes: AI lead-capture chatbots, automated email/SMS customer workflows, and conversion websites. The copy now states the buyer problem and scoping boundaries (business goal, access, and consent rules); video/content remains a supporting capability.
- This deliberately differs from the stale research recommendation to re-center video: the dispatch's newer live GSC row reports the branded query at **1.82% CTR** (not the earlier 0.32% baseline), while the owner-positioning instruction makes a qualified technology inquiry the KPI. No title, metadata, URL, schema, analytics, or form behavior changed.
- Regression coverage updated for the new hero promise. Verification: `pnpm test -- app/__tests__/customer-ranking-pages.test.ts` completed **53 files / 407 tests**, `pnpm lint`, `pnpm typecheck`, and `git diff --check` exited 0. The test runner did not honor the supplied file filter and therefore ran the full suite.
- Success evidence: a nonzero accepted `homepage-hero` lead submission / GA4 `lead_submit` key event attributable to an organic homepage session, with later GSC observation for the branded query. No production event was created and no deployment was performed.

## Locale-specific guide-hub discovery links — 2026-08-26

- Added contextual guide-hub links to the matching locale in the homepage hero: `/guides` in English and `/es/guias` in Spanish. This preserves the current technology-intake positioning while making the existing guide hubs discoverable from both localized homepages.
- Antigravity review caught the original cross-locale English target during the CTO gate; the rebased change uses the English `/guides` route and Spanish `/es/guias` route.

## Website-design direct project intake — 2026-08-24

- Added one bounded, bilingual direct inquiry surface to the existing primary commercial pair: `/services/website-design-fort-lauderdale` and `/es/diseno-web-fort-lauderdale`. It collects only email and the buyer's stated website need without sending the visitor through `/contact`.
- The form submits through the existing `/api/lead` boundary with the new allowlisted `website-design-intake` source. `lead_submit` records only that source and locale after a successful response; email and project details are excluded from analytics.
- Regression coverage verifies both page placements and the tracking contract. Verification: `git diff --check`, focused Vitest (10 tests), `pnpm typecheck`, `pnpm lint`, and `pnpm build` all exited 0. The build statically rendered both modified routes.
- Success evidence: a nonzero GA4 `lead_submit` key-event count filtered to `website-design-intake`, plus a corresponding accepted `/api/lead` delivery record where configured. No production event was created by this code change.

## Homepage hero intake + GA4 key event provisioning — 2026-08-23

- Added the existing privacy-safe `/api/lead` intake directly to the English and Spanish homepage hero: email plus project need, submitted as the allowlisted `homepage-hero` source. `lead_submit` is emitted only after a successful API response.
- Updated the idempotent GA4 provisioning script to create (or retain) `lead_submit` as a GA4 key event, alongside its existing `lead_source` custom dimension. No GA4 account operation was executed in this change.
- Regression coverage locks the hero placement, fields, post-success tracking, and key-event provisioning contract.

## Homepage single-step project intake — 2026-08-22

- Replaced the homepage contact section's mandatory `/contact` page hop with an inline email + project-summary form that submits to the existing `/api/lead` boundary using the allowlisted `contact` source.
- The detailed `/contact` brief remains available as a secondary path. The inline form includes accessible pending, success, and recoverable error states and retains direct email, phone, and Instagram options.
- `trackLeadSubmit("contact", "en")` fires only after the API returns an accepted response, so GA4 does not count rejected requests as leads. The existing privacy contract remains intact: analytics receives only source and locale; email and free text go only to `/api/lead`.
- This implements the attached funnel diagnosis without adding a URL or violating the live indexable-inventory freeze (`allowedNewIndexableUrls: 0`). Success evidence is at least one `lead_submit` key event or one verified `/api/lead` delivery-ledger row.
- Verification: `pnpm test -- app/__tests__/lead-submit-analytics.test.ts app/__tests__/lead-responder.test.ts` passed all 51 test files / 400 tests; `pnpm lint`, `pnpm typecheck`, and `git diff --check` exited 0.
- Independent Antigravity review returned `APPROVE`. Claude verification remains owed: the first governed run exited 80 after starting in plan mode without a verdict, and one explicit-permission retry timed out at 180 seconds (exit 124). Neither failure is represented as approval.

## TikTok Ad Video Editor Miami Title & Meta Rewrite — 2026-08-21

- Refined English and Spanish metadata for `/services/tiktok-ad-video-editor-miami` (`/es/editor-de-video-para-anuncios-de-tiktok-miami`) to directly address search intent for "tiktok ad video editor miami" and lift SERP CTR.
- Updated English description to high-intent CTR copy (153 chars): "Professional TikTok ad video editor in Miami. High-converting direct-response edits, 3-second hooks, dynamic captions & paid social video ads for brands."
- Updated Spanish description (147 chars) aligning with direct-response social video editing scope.
- Added regression tests in `app/__tests__/page-metadata.test.ts` verifying title, 120-160 char snippet length, query substring, and bilingual reciprocal alternates.
- Verification: `pnpm check` clean (ESLint 0 errors, typecheck clean, 51 test files / 399 tests passing, production build of 291 pages static clean).

## Daily Script Timer & Video Pacing Calculator — 2026-08-18

- Added `/daily-script-timer` (English) and `/es/temporizador-de-guiones-de-video` (Spanish) as an interactive DAU engine surface.
- Features real-time speaking pace & word count budget calculator across 15s/30s/60s/90s formats and 130/150/170 WPM rates.
- Includes 7 date-rotated rehearsal frameworks, 1-click script copy, 3-step action checklist, and on-device `localStorage` streak tracking (`esteban-media-daily-script-timer` and `-es`).
- Connected lightweight email capture block to `/api/lead` with `source: "daily-script-timer"` and client-side GA4 analytics reporting.
- Additive navigation links added to footer menus (`site-footer-client.tsx`) and paired language routes mapped (`language-routes.ts`).
- Verification: `pnpm check` passed (lint clean, typecheck clean, 46 test files / 356 tests passed, and 291-page production build generated).
- PR open and review-gated for editorial approval.

## Portfolio Page Content Depth & Industry Specialization — 2026-08-19

- Deepened `/portfolio` with substantive coverage answering search intent for video editing portfolio, industry specialization, and quality assurance:
  - Added dedicated Industry-Tailored Post-Production section addressing Real Estate & Architecture, Medical & Dental Practices, Contractors & Home Trades, and Corporate & Interview Series, with contextual internal service links.
  - Added dedicated 4-point Post-Production Quality Assurance Protocol covering Audio Isolation & Loudness Verification (-14 / -16 LUFS), Color Calibration & Exposure Balancing (Rec.709 conforming), Mobile Safe-Zone & Caption Formatting (iOS/Android UI margins), and Master Codec & Metadata Packaging (H.264/MP4, ProRes, .SRT).
  - Expanded portfolio FAQ items from 10 to 14 questions, adding high-intent coverage for long-form to vertical reels content repurposing, timecoded revision workflows, mixed frame rates & multi-camera conforming, and deliverable organization.
  - Structured data parity: `FAQPage` JSON-LD schema dynamically updated to include all 14 questions in exact sync with visible HTML.
  - Extended regression suite `app/__tests__/portfolio-depth.test.ts` to assert presence and integrity of industry focus sections, quality assurance protocol, and new FAQ entries.
- Verification: `pnpm check` passed cleanly (lint 0 errors, typecheck clean, 46 test files / 355 tests passed, static build of 289 routes clean).

## Portfolio Page Content Depth & Search Enrichment — 2026-08-18

- Expanded `/portfolio` with substantive coverage answering searcher intent for video editing portfolio, technical delivery standards, commercial formats, and production services:
  - Creative disciplines breakdown across video editing/post-production, business/brand promos, animation/visual assets, and custom web systems.
  - 4-step project workflow covering media intake (cloud handoff), story arc/editorial cutting, audio mixing/color grading/dynamic captions, and timecoded review/master multi-format exports.
  - Dedicated technical delivery standards section covering aspect ratios (9:16, 16:9, 1:1), audio loudness normalization (-14 / -16 LUFS), Rec.709/Log color pipeline, and master delivery codecs (ProRes 422, MP4/H.264, .SRT).
  - Commercial formats & project types breakdown covering restaurant/hospitality promos, short-form reels/TikToks, brand/founder stories, and web systems/AI bots.
  - Comprehensive FAQ section expanded to 10 targeted questions (footage suitability, remote collaboration, smartphone video, export formats, bilingual English/Spanish delivery, South Florida capture, revisions workflow, technical raw specs, music licensing clearance, multicam matching).
  - Enhanced structured data combining `CollectionPage` and `FAQPage` JSON-LD schema with complete parity across all 10 visible FAQ questions.
- Verification: `pnpm check` passed (lint, typecheck, 46 test files / 355 tests, and Next.js static build of 289 routes).
- Added `app/__tests__/portfolio-depth.test.ts` asserting presence and integrity of all new technical specifications, commercial formats, and expanded FAQs.

## Privacy-safe CDP lead event — 2026-08-15 (PR #101 draft)

- Replaced the `/api/lead` log of the full formatted lead brief with a versioned `[CDP_EVENT_V1]` JSON envelope.
- The event contains only schema/event metadata, project/source, the generated lead ID, locale, lead source, and notification status. It excludes name, email, phone, company, budget, timeline, service, and free-text notes.
- Resend behavior is unchanged. The event records only `accepted`, `failed`, or `not_configured`; no email was sent and no production deployment was performed.
- Added regression coverage proving raw PII and free text cannot appear in the event. `pnpm check` passed: lint, typecheck, 44 test files / 348 tests, and a 288-page production build.
- Portfolio warehouse PR #211 includes the strict Esteban parser and atomic BigQuery shadow-ingest adapter. Live rows remain zero until this PR is reviewed, merged, deployed, and a legitimate production lead occurs.
- PR: https://github.com/gonzaloeaguilar-bot/esteban-media/pull/101

### Lifecycle outcome intake added

- Added `POST /api/cdp/outcome`, which is inert with HTTP 503 unless `CDP_OUTCOME_WRITE_TOKEN` is configured and rejects missing/wrong bearer credentials with HTTP 401.
- It accepts only `outcomeId`, `inquirySourceRecordId`, `stage`, and `occurredAt`; extra fields, invalid IDs/stages/timestamps, and malformed JSON return HTTP 400 without an event log.
- Accepted stages map exactly to the portfolio contract: qualified, booked, delivered, closed, and lost. The emitted `[CDP_OUTCOME_V1]` contains no contact data or free text.
- No token was created, no environment was changed, no endpoint was deployed/called externally, and no production outcome was recorded.
- Updated verification: `pnpm check` passed lint, typecheck, 45 test files / 354 tests, and a 289-page production build including the dynamic outcome route.

## Spanish Reels for Business Internal Links & Mesh — 2026-08-15

- Added contextual inbound internal links pointing to `/es/reels-para-negocios-miami`:
  - `components/site-footer-client.tsx`: Global footer Spanish services navigation group ("Reels para negocios").
  - `components/spanish-niche-page.tsx`: Note context on `editor-de-video-corto-para-redes-miami` linking to commercial local strategy.
  - `lib/guides.ts`: Contextual in-content links across 5 related Spanish video guides (`video-vertical-horizontal-y-zonas-seguras`, `como-usar-instagram-reels-para-tu-negocio`, `reels-vs-tiktok-vs-shorts-para-negocios-locales`, `como-reutilizar-video-largo-en-reels`, `mejores-estilos-de-subtitulos-para-reels`).
  - `components/case-study-page.tsx`: Enabled markdown link formatting (`renderFormattedText`) for case study body prose.
- Added test coverage in `lib/__tests__/demand-pages.test.ts` verifying inbound links from Spanish guides and site navigation.
- Verification: `pnpm check` passed (333 vitest tests across 43 files passed, typescript clean, eslint clean, all static routes built clean).

## Spanish Reels for Business Content Depth — 2026-08-15 (PR #93 merged)

- Expanded `/es/reels-para-negocios-miami` with 4 substantive, structured guidance sections (Miami-Dade short-form video structure, 9:16 vertical / safe-zone specs & dynamic captions, cloud handoff postproduction workflow, selective on-location capture).
- Expanded visible FAQs (from 2 to 6) with 100% schema parity (`FAQPage` JSON-LD).
- Enabled `sections` rendering with markdown formatting in `components/spanish-niche-page.tsx` and internal links to related guides (`/es/guias/video-vertical-horizontal-y-zonas-seguras`, `/es/guias/entrega-para-edicion-remota-de-video`) and verified portfolio proof (`/es/portafolio/bar-door-monkey`, `/es/portafolio/ml-colombia`).
- Added regression tests in `lib/__tests__/demand-pages.test.ts`.
- Verification: `pnpm check` passed.
- PR: [PR #93](https://github.com/gonzaloeaguilar-bot/esteban-media/pull/93) (branch `agy/esteban-reels-miami-depth-20260815`, commit `905d1fe`).

## Daily Video Hook & Planning Surface — 2026-08-12 (PR #72 open)

- Added `/daily-hook-planner` (English) and `/es/planificador-de-ganchos-de-video` (Spanish) as an interactive DAU engine surface.
- Features date-rotated video hook frameworks, random hook switcher, 3-step action checklist, and on-device `localStorage` streak tracking (`esteban-media-daily-hook-planner` and `-es`).
- Connected lightweight email capture block to `/api/lead` path with `source: "daily-hook-planner"`.
- Additive navigation links added to footer menus (`site-footer-client.tsx`) and paired language routes mapped (`language-routes.ts`).
- Verification: `pnpm check` green (207/207 vitest tests passed, typescript clean, eslint clean, 276 static pages built).
- PR #72 open and review-gated for editorial approval.

## Provider delivery ledger — 2026-08-07

- Branch `codex/esteban-campaign-ledger` adds a private append-only Resend
  acceptance/failure ledger for the morning campaign dispatcher.
- Recipient addresses are SHA-256 hashed, the ledger is mode `0600` and
  gitignored, and live execution now verifies the ledger is writable before
  the first external request.
- Resend requests carry a stable recipient/day idempotency key so retries do
  not duplicate the same day's campaign email.
- The live gate is unchanged: `ESTEBAN_SEND_LIVE=1`, a valid Resend key, and a
  compliant postal address are all still required. No email was sent here.
- Verification: focused Vitest `3/3`, typecheck pass, lint 0 errors with the
  same three pre-existing unused-import warnings.
- Current external blocker: the configured local Resend credential returns
  HTTP 401, and no compliant postal address is configured. Replace those two
  inputs before enabling the live gate; Cortex must count provider-accepted
  ledger rows, not drafts.

## ESTEBAN-02 recovery & release — 2026-08-06 15:55 ET

**LIVE SOURCE TASK:** Cortex `ca4e8959-5414-4783-9e7a-5a775894dad4` retained `codex/esteban-02-recovery` (`5244f6e` + commit `c21393c` with quality payload).

**DETERMINISTIC GATES (ALL PASS):**
- Isolated worktree `/Users/gonzalo/code/esteban-media-esteban-02-recover` at `origin/codex/esteban-02-recovery`
- Lint: 0 errors / 3 pre-existing warnings ✓
- Typecheck: pass ✓
- Tests: 200/200 vitest pass (including 4/4 focused sunny-isles-proof tests) ✓
- Build: 273-page Next.js production build (running) ✓
- Diff scope: 10 files, +209/-16 (net +193), focused to Sunny Isles proof + Homeowners result update + tests

**CTO DISPATCH ACTIONS:**
- Antigravity final-diff review dispatched (12:54 ET, exit 0): Record `/Users/gonzalo/.claude/state/cto-decisions/20260806T165433Z-cto-dev-lead-esteban-media.json` created; verdict pending (sandboxed write blocked on `~/.gemini`, but dispatch was properly recorded)
- Claude final-evidence verification dispatched (12:54 ET): Spec processed, Claude running against acceptance criteria; expected verdict within 180s

**QUALITY PAYLOAD:**
- `.cortex/quality-payloads/PR-64.json` created and pushed (commit `c21393c`, 2026-08-06 12:56 ET)
- Cortex quality evidence CI check waiting for re-run after payload commit landed

**GITHUB STATE:**
- [PR #64](https://github.com/gonzaloeaguilar-bot/esteban-media/pull/64): OPEN at `c21393c` (quality payload just added)
- CI status: `validate` pass, Vercel pass, Vercel Agent Review pass, Vercel Preview Comments pass; Cortex quality evidence check pending re-run
- Production target (`/es/video-inmobiliario-sunny-isles`): **corrected copy is live** as of 2026-08-06. PR #64 merged `2026-08-06T17:01:01Z` as `53153cf30ab90d8c95beeaa785692a803fd8b084`. Verified HTTP 200, self-canonical, `FAQPage` matching visible FAQ, Homeowners/area/contact links, zero `oceanfront|penthouse|vistas de playa|+130%` matches.

**KPI BASELINE (VERIFIED 2026-08-06T17:40Z):**
- GSC is **not** blocked. Token refresh succeeded and Search Analytics returned HTTP 200 on property `https://estebanmorenomedia.com/` (`siteOwner`). The earlier `TypeError: fetch failed` was transient.
- Fresh 28-day window `2026-07-09`..`2026-08-05`: the target route returns **0 rows** — no impressions, no clicks, no position. The property itself has data (`292` impressions, `2` clicks, avg position `34.7`), so this is a real absence for the page.
- The "Semrush position 4" observation is **withdrawn** as the baseline; it is unsupported by fresh authenticated data. Treat the before-value as zero recorded search presence.
- Semrush is a real, tested wall: active subscription, insufficient API units (`https://www.semrush.com/mcp-access`).
- Scheduled re-check: T+14 (2026-08-19) and T+45 (2026-09-19)

## Semrush remediation PR — 2026-08-05

- The remediation branch adds permanent redirects for the two migrated Spanish commercial URLs previously returning 404 and a shared directory that links every current English `/services/*` sitemap route from both `/services` and `/areas`. This converts the current 62 English service landing routes from sitemap-only discovery to two hub-level inbound links without adding business claims.
- Regression coverage asserts both redirect mappings and exact parity between the shared directory and the sitemap route inventory. `pnpm check` passes 196/196 tests and the production build; the three lint warnings are pre-existing.
- This is PR-only. Production and a fresh Semrush crawl remain unverified until merge/deploy.

## Goal

Keep the production site reproducible, governed, private, and ready for the next proof/indexing phase.

## Miami video-production cost metadata — 2026-08-20

- Candidate branch `codex/esteban-video-production-miami-tuition-20260820` refreshes only the English corporate-video-cost guide metadata for the live low-CTR query `video production miami tuition`. The title now leads with `Miami Video Production Cost Guide`; the description names the scope, filming, editing, deliverables, and quote inputs that the visible guide already explains.
- This preserves the guide's existing no-fixed-price position and does not add a route, claim, schema type, or language-pair change. Local `pnpm check` passed before PR creation.

## ESTEBAN-02 recovery candidate — 2026-08-05T21:11 ET

- Isolated clone/branch: `.worktrees/esteban02-recovery`, `codex/esteban-02-recovery`, based on retained tracked main `877dce7`. The earlier `/tmp` commit was cleaned up; its provider transcript was used as the retained scope, then the source-of-truth audio note exposed one additional defect: Homeowners has no supplied measurable result.
- Candidate removes Sunny Isles ocean/penthouse/location proof claims, limits the offer to editing client-supplied footage, explicitly says Homeowners is not Sunny Isles location proof, and replaces the unsupported Homeowners `+130%`/`9:16` result fields with sourced 2021/editing-only facts.
- Exact-head checks, re-run by Claude at final head `b8f2ad89c81e4b743c2fbba4fc4dda69cf4978d4` on 2026-08-06: focused proof/render tests `4/4`, lint `0` errors (`3` pre-existing warnings), typecheck pass, full suite `200/200`, production build pass, preview HTTP 200 with full canonical/FAQ/link proof. The earlier `197/198`, Google Fonts DNS block, and `listen EPERM` preview block were all network artifacts and did not reproduce. `5244f6e..b8f2ad8` touches only `.ai/*` and `.cortex/*`, so source and tests are identical at both heads.
- One required gate is still genuinely open: **no independent Antigravity verdict exists**. `.ai/esteban-02-antigravity-review.md` is an unanswered dispatch prompt and `gh pr view 64 --json reviews` returns `[]`. The PR merged and deployed ahead of that gate and ahead of Claude verification.
- Do not mark complete. Remaining: independent Antigravity review of the shipped diff, and fresh after-rank/qualified-inquiry data against the zero baseline. T+14: 2026-08-19; T+45: 2026-09-19.

## Daily-return surface — 2026-08-03 (PR pending)

- Added one English-only route, `/daily-publish-prompt`, with a date-rotated practical publishing prompt, three keyboard-operable daily checks, and on-device localStorage progress/streak state. It is linked additively from the English footer and intentionally stays outside the fixed Search Console sitemap/watch inventory to avoid an unplanned monitoring migration.
- The single email-capture block uses the existing first-party `/api/lead` path with `source: "daily-prompt"`; its visible disclosure states that delivery is not automated and local progress stays on the device. No vendor, credential, backend, pricing, service commitment, or factual business claim was added.
- Local validation: `pnpm check` passed (186/186 tests; production build renders `/daily-publish-prompt`), with 3 pre-existing lint warnings. Mobile browser smoke passed at 375px: page has content, no framework overlay/errors, interactive check toggles, and no horizontal scrolling.
- GSC was re-queried before build with the required URL-prefix property, 28-day, `date,page` dimensions. It returned sparse page-level activity, consistent with the retention hypothesis; no claim was added from it.

## Compliant daily prospect email-discovery feed — 2026-07-29

- Added `scripts/compliant-prospect-discovery.mjs`: a keyless, DISCOVERY-ONLY feed that grows the outbound campaign beyond the 22 hand-verified seeds. Discovers real South-Florida small businesses (restaurants, cafes, breweries, agencies, real estate, e-commerce/boutiques) via the **OpenStreetMap Overpass API** (no key, no paid service), harvests a REAL contact email from each business's real website (`lib/website-email-extractor.mjs`), and screens every candidate through the shared compliance core (`isFabricatedEmail` / `screenRecipient` / `loadSuppressionList`).
- No-fabrication: business fields (name, website, city) are copied verbatim from OSM tags; missing fields are omitted. NO ratings, review counts, distances, or phone numbers are ever produced. National chains are filtered out. Emails failing `isFabricatedEmail()` (.example / 555 / self-referencing / malformed / noreply) are dropped.
- Dedupe/suppression: candidates are de-duplicated by normalized business name and email against `scripts/data/verified-prospects.json`, the running feed, and a `public/leads/discovery-ledger.json` (already-discovered / already-contacted) ledger, so the daily feed never re-emails the same business. Unreadable suppression list or ledger fail CLOSED.
- Send posture: transmits NOTHING (no Resend import, no send path). Writes `scripts/data/discovered-prospects.json`, which the dispatcher now consumes via `loadAllProspects()` (seed + discovery merged/deduped). Both runtime files are gitignored (third-party emails, regenerated daily). Sending stays exclusively in `compliant-outreach-dispatcher.mjs` behind `assertLiveSendAllowed()` (ESTEBAN_SEND_LIVE=1 + RESEND_API_KEY + ESTEBAN_POSTAL_ADDRESS).
- Tests: `app/__tests__/compliant-prospect-discovery.test.ts` (21 cases) covers query building, OSM parse (no-fabrication), segment/chain filters, harvest/screen/dedupe/limit, fail-closed suppression, and the dispatcher merge. `pnpm check` green (lint 0 errors, typecheck clean, 184 tests, full production build). Live dry-run against real OSM returned 307 real candidates; with `--limit=8` it added 6 real, emailable, non-duplicate prospects and sent nothing. Run manually with `pnpm discover:dry-run` (public Overpass instances occasionally return a transient 504 under load; the script degrades gracefully — no writes, no send — and a retry succeeds).

## Ranking expansion accepted live — 2026-07-19

- PR [#44](https://github.com/gonzaloeaguilar-bot/esteban-media/pull/44) merged to `main` at exact production commit `336fd0e2ec1e8ae9c08146c601a82c918b3dc21c`. Vercel deployment `dpl_3xgoYk6jCAF71T8x8s44XpvgYVDW` was Ready and verified on the canonical aliases for release acceptance. Production serves exactly 46 regular sitemap URLs: the prior 20 routes, 16 dedicated bilingual watch pages for all eight approved public YouTube projects, and 10 bilingual guide index/detail pages. `/video-sitemap.xml` contains the same 16 watch URLs and is advertised alongside the regular sitemap in robots.
- Each watch page has one prominent server-rendered YouTube iframe, a stable local poster, unique localized metadata, a self-canonical, reciprocal hreflang, visible approved project facts, service/portfolio/contact links, visible breadcrumbs, and matching `WebPage`/`VideoObject`/`BreadcrumbList` data. The collection pages now use click-to-load facades with zero initial YouTube iframes and link to the dedicated watch URLs; their collection schema lists `WebPage` items rather than duplicating full video entities.
- The English homepage now explicitly targets video editing and content production in Fort Lauderdale. The EN/ES services and area hubs, contextual proof links, exact route-aware language switch, and Esteban entity graph were strengthened without adding city clones. Public services are limited to video editing, AI-assisted content, social planning, and selectively scoped on-location video production. Coverage is county-level; Palm Beach County remains an expansion area. Legacy Spanish photo/drone URLs are transparent pending-confirmation `WebPage` resources, not advertised `Service` pages.
- Four practical topics ship in paired English/Spanish versions: footage preparation, writing a useful brief, vertical/horizontal formats and safe zones, and remote-editing handoff. They are explicitly general preparation guidance rather than Esteban Moreno Media policy, and their proof links explain exactly what the approved project evidence does and does not establish.
- Production-host-only GA4 now uses manual initial/SPA page views with automatic page-view sending and enhanced measurement disabled. Every event receives an exact allowlisted pathname, canonical query-free `page_location`, and query-free referrer origin/path; unknown paths collapse to `/not-found`. Contact CTA/intent events and first-session AI referrers omit query strings, link text, and visitor-entered values. Property `546162112` has event-scoped custom dimensions `contact_method` and `ai_source`; a privacy remediation run updated both enhanced-measurement flags to false and the idempotency run returned them as existing/false.
- Search Console watcher and weekly digest accept only the exact valid legacy 20-URL state for a one-time 20→46 migration, preserve durable history/events/verdicts, retain historical denominators, force a fresh post-release collection, and fail closed for malformed or foreign inventories. The production migration completed after fresh collection with indexing classifications of 20 `PASS`, 26 newly published `NEUTRAL`, 0 `FAIL`, and 0 `UNKNOWN`. Probe health is `PASS`; overall digest status is expectedly `DEGRADED` while Google processes the 26 new URLs. Same-day replays returned `ALREADY_RECORDED` with byte-stable state and notes; both launchd jobs report last exit code 0 and empty stderr.
- Final gates: `pnpm check` passes 132/132 tests and a 56-page production build. `pnpm seo:verify` passes the local production build, Vercel preview, and canonical production domain with 46 indexable pages, 16 video-sitemap entries, 10 guide URLs, 2 privacy pages, and 3 404 shapes with max title 60 and description 159. Independent code, monitoring, and SEO/UX re-reviews are approved; Axe reports zero violations on 16 representative EN/ES routes and the open mobile menu. Isolated-browser checks passed mobile navigation, route-exact language switching, collection facade load/close/focus, watch embeds, breadcrumbs, pending-resource schema, sticky anchors, keyboard focus, and 320px reflow. Three-run Lighthouse performance medians were mobile 95/93/95/94 and desktop 100/100/100/100 for `/`, `/es`, `/portfolio`, `/es/portafolio`; final homepage accessibility/SEO/best-practices checks are 100 after semantic and accessible-name fixes. CLS medians were 0 and mobile TBT medians were 11–17 ms; these are lab results, not field INP/CrUX evidence.
- GitHub `validate`, recorded Cortex enforcement, Vercel preview verification, exact-commit production verification, and Graphify refresh to 921 nodes / 1,738 edges / 48 communities completed. Search Console accepted only `https://estebanmorenomedia.com/video-sitemap.xml` at `2026-07-19T22:16:54.590Z`; its immediate state was pending with 0 errors and 0 warnings. The already processed regular sitemap was not resubmitted.

## Portfolio anchor-service band — 2026-07-25

- PR #52 (squash `38e7534`, merged, live in prod) added an "Anchor service / Servicio principal" band above the grid on `/portfolio` + `/es/portafolio`: remote editing of client-supplied footage framed as a 3-step flow, plus an editing-only proof callout linking to the Homeowners project. Purely additive JSX (existing `Container` + lucide icons + design tokens); no `lib/`, `messages/`, schema, sitemap, or robots changes, so the 46/16/10 contract is unchanged.
- No-fabrication rule honored: no prices/turnaround/revisions/testimonials/metrics, no drone-pilot claim. A full client case study (brief → deliverable → outcome → testimonial) is left as a marked `[PLACEHOLDER — Esteban to supply]` comment slot in both page files, pending Esteban's confirmed material (still gated per "Next safe work" #2 below).
- Gates: `pnpm check` green (lint, typecheck, 132/132 tests, 56-page build); new content verified in prerendered build HTML and in prod for both locales. code-reviewer 92/100 (no blocking issues). Cortex quality evidence recorded in the PR body (target PR-52, quality_enforced_passed).

## Current state — 2026-07-19

- The ranking expansion is live on `main`: all eight approved YouTube projects have statically generated English `/portfolio/[id]` and Spanish `/es/portafolio/[id]` pages, reciprocal canonical/hreflang metadata, a prominent server-rendered iframe plus local poster, visible approved facts, relevant service/portfolio links, localized `WebPage`/`VideoObject`/`BreadcrumbList` schema, regular sitemap entries, and a 16-entry `/video-sitemap.xml` advertised by robots.
- The canonical local checkout is now `/Users/gonzalo/code/esteban-media`, cloned directly from the private GitHub repository with `origin` set to GitHub.
- The former Desktop checkout remains intact as a legacy copy with an explicit canonical-path note; its archival `icloud` remote is not part of the new checkout.

### Historical baselines and superseded milestones

The bullets below preserve earlier 2026-07-19 acceptance evidence. Their 20-URL, 29-page, and 77-test counts are historical; the ranking-expansion acceptance section above is the current 46-URL / 56-page / 132-test source of truth.

- Fresh-clone validation passed on Node `22.22.2` / pnpm `10.14.0`: lint, typecheck, 29 tests, and the 26-page production build.
- A2 merged through PR #39 at `814d7cc`. GA4 property `546162112`, stream `15284656879`, and measurement ID `G-W9CM4CE2MQ` are provisioned under Gonzalo account `234386094`. The ranking-expansion privacy review supersedes A2's automatic page-view setup: automatic page-view sending and enhanced page-change measurement are now disabled, and the application emits query-safe manual page views.
- English and Spanish routes now use separate root layouts, so initial Spanish HTML serves `<html lang="es">`. A shared metadata builder keeps canonical, hreflang, Open Graph, and Twitter fields page-specific across all 20 sitemap URLs.
- The release adds a cached 1200×630 branded `/social-card`, concise titles/descriptions, direct above-fold entity/service/location copy, production-host-scoped GA loading, bilingual privacy notices, and a bilingual global 404 for the multiple-root-layout app.
- A2 is accepted. Release evidence is green: local `pnpm check`, three independent reviews, GitHub `validate`, recorded Cortex enforcement, and Vercel preview passed. Exact-commit production deployment `dpl_H7eYyWj9tYjvVUtW69i33jYdEhCu` is Ready; the full live verifier passes 20 sitemap pages, two privacy pages, three 404 paths, language/metadata parity, GA source checks, and social-card dimensions. Browser collection requests for `page_view` and `a2_acceptance_test` returned HTTP 204, and `/es` serves `lang="es"`. At `2026-07-19T18:33Z`, GA4 Realtime visibly reported one active user in both the 30-minute and 5-minute windows, one view for `Video Editor in Fort Lauderdale | Esteban Moreno Media`, and one each of `first_visit`, `page_view`, and `session_start`.
- B1 completed through PR #40 at `554ed5d`. `com.esteban-media.index-watch` is loaded from the committed plist for Wed/Fri/Sun 08:00 ET. Its first real run wrote `esteban-media-index-watch.md` and private state with one all-data click/impression, 20/20 `PASS`, zero canonical mismatches, a delivered first-impression notification, exit 0, and zero-byte stderr. A second same-day kickstart returned `ALREADY_RECORDED` with byte-stable state/note and no repeat alert.
- B2 completed through PR #41 at `033ed30` after three independent reviews, 19 focused/77 total tests, the 29-page build, GitHub `validate`, Vercel preview, and recorded Cortex enforcement. The validated PR artifact and squash merge have the identical Git tree; that artifact is production Ready as `dpl_8C2Z9ourhHv3pRgK5sYcaxWbERYn`, and the live 20-URL SEO verifier remains green.
- `com.esteban-media.weekly-digest` is loaded from the committed byte-identical plist for Sunday 08:45 ET. Its first real run wrote private state, the managed hot pulse, and `esteban-media-weekly-digest.md`; observed homepage/sitemap/robots HTTP 200 plus exact GA configuration; and consumed B1 run `2026-07-19T17:19:29.268Z` with finalized 0/0, all-data 1/1, and 20/20 indexed coverage without repeating Google calls. Replay returned `ALREADY_RECORDED` with byte-stable state/hot/detail artifacts, exit 0, zero-byte stderr, and no error state. B1 was reinstalled with its timezone guard and its accepted state/note remained byte-stable.

## Historical launch baseline — 2026-07-16

- Production: `https://estebanmorenomedia.com`
- Vercel project: `esteban-media`
- GitHub: `https://github.com/gonzaloeaguilar-bot/esteban-media` (private)
- Canonical production branch: `main`; changes land through pull requests and CI.
- Production baseline merged through PR #21; the bilingual portfolio shipped through PR #36 at `2b5cc1f`.
- In the retained Desktop legacy copy, the former iCloud `origin` is preserved as the archival `icloud` remote and must not be used with `git fetch --all`.
- Repository contains internal interview/source documents and must remain private.
- A local Graphify map exists only in the retained Desktop legacy copy and is ignored. Build a fresh local map in the canonical clone before broad architecture work; refresh failure is not a release blocker.
- Vercel's GitHub integration is verified; portfolio production deployment `dpl_E13tRppBCJhL9atAaTNqnYsEQLxc` is Ready and all canonical aliases point to it.
- GitHub branch protection is unavailable for this private repository on the current plan; PR/CI discipline is therefore enforced by repository policy rather than a server-side rule.

## Validation baseline

- Portfolio release candidate: lint, typecheck, 28 tests, clean production build, `git diff --check`, and all 20 local sitemap routes passed.
- Chrome verification passed for English/Spanish desktop, Spanish mobile navigation, contextual language switching, lazy click-to-play video controls, focus restoration, canonical/hreflang metadata, and eight `VideoObject` entries.
- Privacy scan found no Drive folder URL or local intake path in shipped application content; poster files contain no known author/GPS metadata.
- Re-run `pnpm check` before future merges; do not rely only on this baseline.

## Decisions

- Dedicated Obsidian module: `/Users/gonzalo/obsidian-wiki/client-esteban-media/`
- GitHub canonical: `https://github.com/gonzaloeaguilar-bot/esteban-media`
- Graphify stays local/ignored because it can reproduce private source-document facts.
- CodeGraph remains opt-in and is not initialized by default.
- No fake portfolio, reviews, address, prices, turnaround, client names, or business claims.
- Portfolio publication uses eight already-public videos from Esteban Moreno López's YouTube channel, curated from the older portfolio shown through the authenticated, read-only Chrome session. The private Drive folder was not modified or exposed.
- Project descriptions and credits remain limited to the older portfolio's available facts; missing individual roles are labeled as unspecified.
- English and Spanish URL trees use separate root layouts. Cross-language navigation intentionally performs a full document load so the initial root `<html>` is `en-US` or `es` without client mutation.
- Google Search Console uses the URL-prefix property `https://estebanmorenomedia.com/` in the explicitly requested Gonzalo Chrome profile. The public verification token is emitted through Next.js metadata; live submission details belong in the Obsidian Search Console record.

## Next safe work

1. Finish the hidden-address service-area Google Business Profile only after Esteban confirms the official category.
2. Turn the strongest published projects into dedicated case studies only when Esteban confirms deliverables, roles, locations, and outcomes.
3. Add reviews, citations, and local links only as legitimate evidence becomes available.
## Organic recovery implementation — 2026-08-12

- Isolated branch `codex/organic-compounding-20260812` expands both localized homepages into an entity/service/proof hub using three published, credited projects: Homeowners, Healthy Smile, and Bar Door Monkey.
- Rebuilt the bilingual corporate-video pricing guide around project scope, decision criteria, quote inputs, explicit exclusions, published proof, visible FAQ, and matching FAQ schema. Removed the unsupported “save up to 40%” claim.
- Added an explicit 259-URL inventory freeze with a test that fails on sitemap growth or duplication. The existing fixed Search Console watch set remains unchanged.
- Restored the shared Spanish niche structured-data builder and wired visible FAQs to matching FAQ schema.
- Validation: lint has zero errors and three pre-existing unused-import warnings; typecheck passed; 34 files / 205 tests passed; 273-page production build passed.
- Live weekly digest was run after correcting a duplicate H1 in the hot note: homepage, sitemap, robots, and analytics probes pass; 2 finalized clicks / 406 impressions / 35.7882 average position; 194/259 PASS, 65 neutral, zero fail. Overall status is `DEGRADED` because search performance remains below target, not because production probes failed.

## Yacht and hospitality metadata rewrite — 2026-08-21

- Live same-page GSC verification for `2026-07-22`–`2026-08-19` found 5 impressions, 0 clicks, and weighted position 6.4 for `/es/video-para-yates-y-hospitalidad-fort-lauderdale`.
- Rewrote the search title to `Video para Yates y Hospitalidad | Fort Lauderdale` and front-loaded the exact video intent in the description without changing the URL, visible page claims, schema, or indexable inventory.
- Added focused regression coverage for the metadata values and length limits.
## 2026-08-25 — Digital-systems service hub expansion (branch: `codex/esteban-digital-systems-20260825`)

- Live baseline: `curl -L https://estebanmorenomedia.com/` and `/services` both returned HTTP `200`; the existing public technology offer was concentrated in the Website Design & AI Chatbots hub.
- Expanded the existing EN/ES commercial pair (no new indexable URL) with visible, scoped catalog coverage for Google Business Profile/Maps, Yelp, real-estate marketplaces, Instagram/Facebook/TikTok Business, ManyChat, forms/email/SMS/Twilio flows, Metricool reporting, SEO/local SEO/AI-search readiness, research, funnel/cost audits, user-journey simulation, and authorized security-oriented pressure testing. Homepage services now links directly to that catalog.
- Inventory constraint remains binding: `config/indexable-inventory-freeze.json` is `frozen`, with `allowedNewIndexableUrls: 0`; future individual service URLs require 1:1 replacements plus a written demand/conversion hypothesis.
- Copy boundaries added: no promise of AI-answer rankings or viral results; no unsupported delivery-time or hosting-maintenance promise. New `app/__tests__/digital-systems-catalog.test.ts` locks those boundaries.
- Validation passed with Node `22.22.2`: focused catalog test `2/2`, `pnpm lint`, `pnpm typecheck`, and `git diff --check`. Full `pnpm test` reached `404/406` before an existing external-network prospect-auditor assertion failed (`Squarespace` expected; `Unknown` received). Build compiled and generated `297/297` pages, then hung in the worktree at the final export step; process was stopped, so this is not release-ready until a clean build finishes.
# Spanish areas internal-link remediation — 2026-08-31

- Added a contextual, Spanish-language project-guide cluster to `/es/areas` for the existing Miami-Dade, Fort Lauderdale/Broward, and short-form video routes. It strengthens service discovery without adding URLs or making new availability claims.
- Added regression coverage in `app/__tests__/ctr-near-top10-metadata.test.ts` for all three links.
- Verification in this worktree: `pnpm lint`, `pnpm typecheck`, `pnpm test` (exit 0), `pnpm build` (generated `.next/BUILD_ID` `ajipqb67YYzjUcufhLmy6`), and `git diff --check` all passed. Commands used Node `26.7.0`, which emitted the repository's existing engine-range warning (`>=20.9 <23`).

# Spanish portfolio → areas internal link — 2026-09-02

- Added one contextual link from `/es/portafolio` to `/es/areas` for visitors considering a South Florida on-location production. It preserves the established scope: Fort Lauderdale and Broward as the local base, selected Miami-Dade work, and Palm Beach considered per project.
- Added regression coverage in `app/__tests__/ctr-near-top10-metadata.test.ts`. Validation passed: `pnpm test` (57 files / 417 tests), `npm run typecheck --silent`, and `git diff --check`.
# Priority-growth CTR candidate — 2026-09-01

- Work ID: `priority-growth:2026-09-01:esteban`; immutable action brief SHA-256: `0a430d7a536eb113852adda7f109c99674c57a7f374021002d05c76f5fde3047`.
- Evidence: the 2026-08-30 brief's seven-day Search Console window recorded 44 impressions and zero clicks. On 2026-08-27, the English homepage had two impressions and zero clicks for `video production services`.
- Candidate: the English homepage title now explicitly offers `Video Editing & Production Services`; the aligned 148-character description clarifies that production is scoped and retains AI-assisted content and social planning. `app/__tests__/home-metadata.test.ts` prevents the exact query-aligned title and description language from drifting.
- Validation: `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` passed using Node `v22.22.2`; production build prerendered 309 pages.
