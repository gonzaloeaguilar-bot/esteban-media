# 2026-10-24 — Digital chooser-card composition candidate

## SEO, GEO and landing-page price catalog — local addition

- The existing SEO/GEO and landing-page chooser now gives each service a visible minimum: **From $1,800** for SEO/GEO and **From $1,500** for a focused landing page. Each keeps a native “See what is included” disclosure in the served HTML. SEO/GEO lists website/search tracking, service/location-page review, and technical fixes with a first-priority plan. Landing pages list a single offer and next step, mobile-first page with form/contact action, conversion-event setup, and English, Spanish, or both when scoped.
- Price sources checked 2026-10-24: `~/obsidian-wiki/gonzalo-tech/wiki/gonzalotech-price-menu.md` lists “SEO & GEO assistant (with website and search tracking)” at USD 1,800; `lib/pricing.ts` declares `LANDING_PAGE_PRICE.from = 1500`; `lib/web-ai-services.ts` defines the landing-page scope. The current public chooser was read before this local change and had neither price displayed.
- Local checks: packaging test 32/32; full `pnpm test` 172 files / 3,521 tests; typecheck passed; lint 0 errors / 22 existing warnings; analytics gate passed (12 emit sites / 11 events); supported Node 22.22.2 production build completed with `BUILD_ID=Puwgs-LPv64pFlaPatLCk`; local production server confirmed the visible prices and expanded SEO inclusions. No PR, merge, or public release yet.

## Website and ecommerce catalog — local addition

- The web chooser now distinguishes the two honest purchase paths: **Websites — Custom quote** (no owner-approved public starting price exists), and **Ecommerce content — From $280/session**. The product-content disclosure lists a real product-photo session from $280 and product/ad-video editing at $400–$775, then names the variables that determine the written scope. Both languages are included.
- Sources checked 2026-10-24: `lib/pricing.ts` says full websites have no published price and declares `PRODUCT_PHOTO_SESSION.from = 280`; its ecommerce pricing band is $400–$775 per product or ad creative. Local checks: packaging test 32/32, full test suite 172 files / 3,521 tests, typecheck, lint with 0 errors / 22 existing warnings, analytics gate pass, and `git diff --check` pass. No PR, merge, or deployment.

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

- The homepage now gives AI, website, local SEO and AI-search visibility their own fifth buyer card instead of hiding them inside “Local businesses.” The Spanish card is “IA, web y visibilidad”; the English equivalent is “AI, web and visibility.” It opens the existing All-In package plus the existing AI-assisted content, local SEO/AI-search visibility, website/funnel audit, and operations-automation services. The package and services remain in the server-rendered HTML; nothing is revealed only through motion.
- “Local businesses” now contains only its existing monthly content and local-presence packages, so the All-In package appears once in its more relevant route. The new card uses the documented published AI lead-capture case image and one restrained sparkle signal; all card motion is decorative and disabled under reduced motion.
- Local verification: targeted chooser test passed (32 assertions), `pnpm typecheck` passed, `pnpm lint` exited 0 with 22 existing warnings, full `pnpm test` exited 0, optimized `pnpm build` completed, `pnpm rail-adoption:check` passed (3 assertions), `analytics-gate.py` passed (12 emit sites / 11 event names), `git diff --check` passed. Browser review opened the card at 390x844 and 375x667 and checked the desktop card at 1440x900; the expanded Spanish card visibly contained Todo Incluido, IA, SEO/AI-search visibility, audit, and automation. Next: commit, independent review, scoped PR, merge on required checks, then public `/es` visual and raw-HTML verification.

---

# 2026-10-24 — Homepage chooser card motion candidate

- The repeating Content Creator heart/count feedback remains unchanged. The other three homepage chooser cards now have their own small, service-specific loops: a settling property pin with a soft ring, a recording dot with three frame marks, and a rising local-business signal sparkle. They are decorative only; no audience, recording, or business-performance data is asserted.
- Changed files: `components/home-project-path.tsx`, `app/illustrated-commercial.css`, and `app/__tests__/home-packaging-human.test.ts`. Motion is `aria-hidden`, does not gate card copy or expansion, and the reduced-motion rule disables every newly added animation.
- Local evidence: full `pnpm test` passed (168 files / 3,497 tests); `pnpm typecheck` passed; `pnpm lint` completed with 0 errors and 22 pre-existing warnings; `pnpm build` completed; `git diff --check` passed. Browser review at 390x844 showed the property pin, recording frames, and local signal clear of the cards' plus controls and reading copy. Next: open the scoped PR, wait for required checks, merge, and verify the public Spanish homepage.

---

# 2026-10-24 — Carousel verification and generated-date repair (PR #526, not released)

- The homepage `PortfolioTeaser` intentionally derives the work rail from every live, non-web portfolio item. Local rendered English and Spanish home HTML each contain all five new case links (Gains From Geebs Shorts, Exatlón, Juanchis Burguer, Portosole, and Punto de Giro); they follow the seven property Reels in the horizontal rail. Desktop browser inspection found the rail clear and touchable with its existing Prev/Next controls. No separate carousel implementation was needed.
- Remote `validate` initially failed only at `page-lastmod.test.ts`: the 10 newly added EN/ES project pages had stale generated dates/hashes after the rebase. `pnpm lastmod:update` regenerated those exact ten records in `config/page-lastmod.json` (10 changed, 542 total). Commit and push this ledger repair, then wait for the rerun before merge.

---

# 2026-10-24 — Rebased portfolio proof cases (PR #526, not released)

- PR #526 now rebases cleanly on `main` as `4d6bc218`; it carries five bilingual source-backed project cases: Gains From Geebs Shorts, Exatlón, Juanchis Burguer, Portosole and Punto de Giro. The rebase retains the newer Great Reviewer portfolio pair, so the post-merge sitemap baseline is 542 URLs.
- Rebase verification: 53 focused portfolio, sitemap, inventory and cohort tests passed across 7 files; `git diff --check` passed. The public site remains unchanged until remote checks, merge and deployment complete.

---

# 2026-10-23 — Content creator own-route candidate

## 2026-10-24 — Homepage Content Creator floating like-hearts (local candidate)

- The content creator route now has four decorative Lucide hearts that float upward from its existing heart icon in a staggered, TikTok-like burst. The existing heart pulse and `+1` feedback remain; the burst is `aria-hidden` and `pointer-events:none`.
- Changes are limited to `components/home-project-path.tsx`, `app/illustrated-commercial.css`, and regression coverage in `app/__tests__/home-packaging-human.test.ts`.
- Local evidence: lint 0 errors (22 existing warnings), typecheck passed, targeted packaging test 32/32 passed, `git diff --check` passed, and a local browser read of `/es#start` confirmed 4 burst hearts with `em-reel-heart-float`. Reduced-motion CSS disables all three animations.
- Branch remains `fix/home-rail-great-reviewer-repair`; no commit, independent review, deployment, or production visual verification exists. Next: `cto-qa-lead` reviews this narrow diff; authorized release must inspect the expanded Content Creator card at phone size in normal and reduced-motion states.

- Owner correction: a person who creates content could not recognize themselves in the generic “Video editing” route. That route is now “Content creator” / “Creador de contenido,” with a direct promise: edit clips, publish weekly, or film a content day. It contains the established one-off/weekly editing choices first, a creator-only filming choice (`From $400/half-day`, raw footage for the next edit), then a long/custom-project disclosure. On-location raw capture was removed from Events so the same service does not appear in two buyer paths; Productions now contains multicamera, yacht, and commercial work only.
- Local visual evidence: at 390×664 the open route showed the creator title and editing choices without horizontal overflow; at 375×667 the opened “Film content with me” card ran from `172px` to `528px` with its quote button visible. Desktop at 1440×900 retained a 704px route column without overflow. Screenshots: `/tmp/esteban-content-creator-mobile-local.png`, `/tmp/esteban-content-creator-film-mobile-local.png`, `/tmp/esteban-content-creator-desktop-local.png` (local-only artifacts).
- Gates passed: focused routing tests 46/46; `pnpm typecheck`; `pnpm lint` (0 errors, 22 existing warnings); `pnpm test` (166 files / 3,481 tests); `pnpm rail-adoption:check` (3); and `pnpm build` (569 static pages). Commit and add to PR #522; production remains unchanged until remote checks pass.

# 2026-10-23 — Production option-card and commercial-scope clarity candidate

- Owner phone QA found the production route mixing two card systems and presenting the commercial price ladder as if three conflicting prices applied at once. The route now says "Choose the production you need" / "Elige la producción que necesitas" and uses the same expandable card grammar as packages. Every production has its starting price and one-line fit on the closed card; the commercial card has only `From $1,000` until opened, where it explains that basic demo, brand film, and actors/studio are scope levels, then offers one quote action.
- Local mobile evidence: `agent-browser` at 390×664 opened the commercial card with no horizontal overflow. Its closed summary reads `Commercial video or product demo · From $1,000 · Demo, brand film, or a production with actors and studio`; its open content explains the scope tiers and keeps one `Request a quote` button. Screenshot: `/tmp/esteban-commercial-clarity-local.png` (local-only artifact).
- Gates passed: focused chooser tests 37/37; `pnpm typecheck`; `pnpm rail-adoption:check` (3); `pnpm lint` (0 errors, 22 existing warnings); `pnpm test` (166 files / 3,481 tests); and `pnpm build` (569 static pages). Add the commit to PR #522. Production remains unchanged until its self-hosted remote font-download failure is repaired and required remote checks pass.

# 2026-10-23 — Editing route: remove the ambiguous Starter package card candidate

- Owner phone QA identified “Starter” as an unclear package name because it repeated the same $100 single-video choice shown immediately beneath it. The home Editing route now opens straight into three buyer choices: one video, recurring weekly editing (one or two videos), or a longer/custom project. “Starter” remains an internal/pricing-page identifier, not a visible package card in this route.
- Local mobile evidence: browser at 390×664 showed `Video editing` → `How often do you need videos?` → Just once / Every week, then the custom-project disclosure. The editing card rendered zero `.em-path-offer` cards, no visible “Starter” string, and zero horizontal overflow. Screenshot: `/tmp/esteban-editing-clarity-local.png` (local-only artifact).
- Gates passed on this added diff: focused chooser tests 35/35; `pnpm rail-adoption:check` (3); typecheck; lint (0 errors, 22 existing warnings); full `pnpm test` (166 files / 3,479 tests); and `pnpm build`. Add this commit to PR #522; production remains unchanged until the previously documented self-hosted runner font-network failure is resolved.

# 2026-10-23 — Real Estate monthly-plan terms clarity candidate

- Scope: moved the Real Estate terms immediately below the monthly plan cards and above the individual photography and AI-enhancement services. The disclosure is now explicitly titled "Monthly Real Estate plan terms" / "Condiciones de los planes mensuales" and says it applies only to those monthly plans, not the individual services. No price, deliverable, or eligibility rule changed.
- Local visual evidence: Spanish mobile browser at 390×664 showed Essential, Plus and Premium followed by the renamed disclosure and then "También puedes pedir" with the individual photo and AI items. DOM geometry confirmed the terms begin above the individual-services label (`821 < 872`) and horizontal overflow is zero. Screenshot: `/tmp/esteban-real-estate-terms-local-position.png` (local-only artifact).
- Gates passed on this diff: `pnpm vitest run app/__tests__/home-packaging-human.test.ts` (26), `pnpm rail-adoption:check` (3), `pnpm typecheck`, `pnpm lint` (0 errors; 22 pre-existing warnings), `pnpm test` (166 files / 3,479 tests), and `pnpm build`. PR #522 is open. Its self-hosted GitHub `validate` passed lint, typecheck and tests twice but both builds failed while fetching all Google fonts through `next/font` (first `TypeError`, then `ETIMEDOUT`); no changed file touches font loading. Keep it unmerged until the runner's font-network fault is repaired and the required quality record passes. Production remains unchanged.

# 2026-10-23 — Homepage lens idle-focus loop published

- Scope: the decorative lens in `HomeProjectPath` now performs one brief focus-and-glint breath every 8 seconds only while at least 35% of its chooser panel is visible. The interaction uses `IntersectionObserver`; it does not alter copy, pricing, buttons, or route expansion. `prefers-reduced-motion: reduce` returns no animation.
- Local visual/behavior evidence: `agent-browser` at 390×844 found the lens panel has `data-lens-idling="true"` with `em-camera-idle-focus` and `em-camera-idle-iris` active while on screen; after scrolling it out, the attribute was false and the computed animation was `none`; after `set media reduced-motion`, it was visible but computed animation remained `none`. Screenshot: `/tmp/esteban-lens-motion-mobile.png` (local-only artifact).
- Gates passed on this diff: `pnpm vitest run app/__tests__/home-packaging-human.test.ts app/__tests__/home-single-projects-in-chooser.test.ts` (33), `pnpm rail-adoption:check` (3), `pnpm test` (166 files / 3,477 tests), `pnpm typecheck`, `pnpm lint` (0 errors, 22 pre-existing warnings), and `pnpm build`. PR #521 merged as `bf4dc1494d17991393a2a3647e6a801bac6fdbdb`; Vercel deployment `dpl_BHqvNAmLmoUsinudpff2oQKg8zd4` is Ready and aliases the canonical domain. Production browser at 390×844 confirmed `em-camera-idle-focus` and `em-camera-idle-iris` while in view, `animation:none` under reduced motion, and no horizontal overflow. No inquiry or revenue outcome is measured.

# 2026-10-23 — Human-route homepage chooser candidate (PR #519)

- Follow-up human QA repair is local and uncommitted: nested package/service disclosures are now named exclusive groups, so only one choice remains open; closing a buyer route clears its nested choice. When a choice opens, it scrolls its title, price and action into the 390×600 safe reading area, and the generic route quote hides while that contextual quote is active. Weekly editing now has one compact, explicit quote link for `$85/semana · 1 video` and another for `$160/semana · 2 videos`; neither uses the other plan's WhatsApp text, and the weekly-process link is gone. Productions uses distinct semantic thumbnails (video, clapperboard, ship wheel, rocket) rather than one repeated image. Local browser evidence on `http://localhost:3015/es#start` at 390×600: after opening Local Business then Growth/Local Presence, state was `[false,true,false]`, generic CTA was `display:none`, selected card top was `172px`; closing/reopening reset to `[false,false,false]`. Yacht selection likewise had only Yacht open, generic CTA hidden, card top `171px`; the two weekly anchors decoded to their matching $85/$160 messages. Tests: `pnpm vitest run app/__tests__/home-packaging-human.test.ts app/__tests__/arranque-weekly.test.ts` = 37 passed; `pnpm typecheck` passed; `pnpm lint` 0 errors / 22 pre-existing warnings; `pnpm build` compiled and generated 569 static pages, then exited without an error. No commit, PR update, deployment, or production verification.

- Editing follow-up: the open **Edición de video** route now exposes every published way to buy editing together—one edit for $100/video, weekly editing at $85 for one video or $160 for two, and a separate native disclosure for a longer/custom project quoted by duration, footage, and deliverables. Editing remains priced per video or project, never by an unbounded hourly rate; only filming is time-scoped. Local source tests (31 focused assertions), typecheck, lint (0 errors), and a 390×664 phone interaction passed. The production build was manually stopped after it stalled while generating static pages, so remote build status remains the release gate.
- Owner clarification after the first local mobile pass: a local business must find its content plan, on-site filming, and broader digital package together. `Presencia Local` now belongs to **Negocios locales** beside `Crecimiento` and `Todo Incluido`; **Producciones y eventos** starts directly with conference, yacht, multicamera, and commercial-production services. `Todo Incluido` also now renders its actual website, AI chat/capture, local-presence, content/editing, and cross-channel-reporting inclusions rather than production-day bullets. Targeted route tests (38 assertions), typecheck, lint (0 errors), and production build passed locally. This is still PR-only, not production.
- Commit `cec21ca5` replaces the homepage billing-unit selector with four native expandable buyer routes: Real Estate, Video Editing, Productions and Events, and Local Businesses. Each keeps its package(s) and related individual services together. The standalone one-off card is gone.
- Local evidence: `pnpm test` 166 files / 3,472 tests, `pnpm typecheck`, `pnpm lint` (0 errors), `pnpm build`, and analytics gate passed. At 390×844, opening Producciones y eventos expanded in place and exposed Presencia Local, on-site filming, multicamera/conferences, yacht production and commercial video.
- PR #519 is open. Vercel preview passed. At last check, CI validate remained in progress and the re-triggered Cortex quality record was queued; do not call production live until those clear and the public Spanish route is checked.

---

# 2026-10-23 — Local GBP conversion proof on About page (priority-growth candidate)

- Source scope: `app/(english)/about/page.tsx`, `app/__tests__/about-conversion-proof.test.ts`, and `config/page-lastmod.json`; addresses `local_gbp_conversion` recommendation for the top query/page opportunity "esteban moreno media" -> `/about`.
- Renders `ClientReviews` (5.0 rating, verified Google review count, verbatim client quotes, and verified Google Business Profile link) directly on `/about` above the WhoIs section, bridging brand query searchers to live Google reviews and local conversion proof.
- Local verification: `pnpm lastmod:update`, `pnpm check` (all 6 gates: rail-kit, rail-adoption, lint, typecheck, test, build, text-parity, and verify-spanish-hub-indexability) passed with 166 test files / 3,472 tests passing. Next owner: `cto-qa-lead` reviews the candidate commit; after authorized release, verify `/about` on production.

---

# 2026-10-23 — English caption-styles guide content-depth candidate (local branch)

- Source scope: `lib/guides.ts` and the generated existing ledger `config/page-lastmod.json`; no route, dependency, analytics, price, or factual business claim changed.
- Updated `/guides/best-caption-styles-for-instagram-reels` with an outcome-specific title and H1, a two-sentence answer-first introduction, expanded safe-zone guidance, and contextual links to the existing safe-zone guide, Reels-for-business guide, and restaurant-editing service. The existing FAQ, FAQPage schema, route, and established restaurant-service link remain in place.
- Local verification: `pnpm lastmod:update`, `npm run typecheck --silent`, `npm test`, and `git diff --check` completed without failures. Not committed, independently reviewed, deployed, or production-verified. Next owner: `cto-qa-lead` reviews the exact diff; after authorized release, verify the production title, H1, answer, raw FAQ HTML, contextual links, and updated date. `cto-seo-lead` owns a comparable later GSC read; no click, ranking, citation, or inquiry impact is claimed.

---

# 2026-10-22 — Miami corporate-video cost guide content-depth candidate (local branch)

- Source scope: `lib/guides.ts`, its existing metadata test, and the generated existing ledger `config/page-lastmod.json`; no route, dependency, analytics, or unsupported price/business claim changed.
- Updated `/guides/corporate-video-production-cost-miami` with a budget-and-comparison H1, a concise intent-matched metadata title and description, a two-sentence answer-first opening that distinguishes a filming starting price from an all-in quote, and two additional server-rendered FAQ answers about comparing same-day quotes and requesting a quote before every detail is known. Existing contextual links to remote editing and on-location production remain in the guide.
- Local verification: `pnpm lastmod:update`, `npm run typecheck --silent`, `npm test`, and `git diff --check` passed. The full suite reported 165 test files and 3,469 tests passing. Not committed, independently reviewed, deployed, or production-verified. Next owner: `cto-qa-lead` reviews the exact diff; after an authorized release, verify the title, H1, answer, FAQ HTML, contextual links, and updated date on production. `cto-seo-lead` owns a comparable later GSC read; no click, ranking, citation, or inquiry impact is claimed.

---

# 2026-10-22 — Spanish video-pacing calculator content-depth candidate (local branch)

- Source scope: `app/(spanish)/es/calculadora-de-ritmo-de-video/page.tsx`, its existing calculator component, its existing metadata assertion, and the generated ledger `config/page-lastmod.json`; no new route, dependency, analytics, pricing, or business claim changed.
- The page now leads with the specific 30/60-second words-and-duration outcome in title, H1, and answer-first copy. It adds three server-rendered native-`details` answers about calculating words, trimming a long script, and estimating Reel/Short duration, plus contextual links to the existing Spanish script timer and Reels-editing cost calculator.
- Local verification: `pnpm lastmod:update` refreshed this route to `2026-10-22`; `pnpm typecheck` and `npm test` passed. The literal `npm run typecheck --silent` acceptance form is a repository command-wrapper defect: npm forwards `--silent` to `tsc`, which exits with `TS5023 Unknown compiler option '--silent'`; `pnpm typecheck` runs the same configured `tsc --noEmit` command cleanly. `pnpm build` compiled and emitted `.next/server/app/es/calculadora-de-ritmo-de-video.html`, but its terminal completion status was not captured; rerun it as a release gate before merge.
- Not committed, independently reviewed, deployed, or production-verified. Next owner: `cto-qa-lead` reviews the exact diff, confirms the build completion and raw HTML; after an authorized release, verify title, H1, FAQs, canonical links, and the updated date on production. `cto-seo-lead` owns the comparable later GSC read; no click, ranking, citation, or inquiry effect is claimed.

---

# 2026-10-22 — Spanish caption-styles guide content-depth candidate (local branch)

- Source scope: `lib/guides.ts` and the generated existing ledger `config/page-lastmod.json`; no route, dependency, analytics, pricing, or factual business claim changed.
- Updated `/es/guias/mejores-estilos-de-subtitulos-para-reels` with an outcome-specific H1, concise metadata, a two-sentence answer-first introduction, and a reading-need comparison (complete captions versus short emphasis text) that links to the existing Spanish safe-zone guide and Reels service page.
- Local verification: `pnpm lastmod:update`, `git diff --check`, `npm run typecheck --silent`, and `npm test` passed. The full suite reported 165 test files and 3,469 tests passing. No deployment or production verification has occurred.
- Next owner: `cto-qa-lead` independently reviews the exact diff and, after an authorized release, verifies the production raw HTML, rendered page, canonical links, and date ledger. `cto-seo-lead` owns a later comparable GSC observation; this change does not establish click, ranking, or citation impact.

---

# 2026-10-21 — Large-video transfer guide content-depth candidate (local branch)

- Source scope: `lib/guides.ts` and the generated existing ledger `config/page-lastmod.json`; no route, dependency, analytics, pricing, or factual business claim changed.
- The English guide at `/guides/fastest-way-to-send-large-video-files-to-editor` now opens with the transfer decision a searcher needs: cloud folder when it can finish in time, proxies when originals are too slow, or a physical drive for a very large archive. A server-rendered question section provides the short decision path, verification reminder, and contextual links to the existing footage-preparation guide and short-form editing service. The existing FAQ, structured data, related-guide surface, and canonical metadata contract remain in place.
- Local evidence: `pnpm lastmod:update` updated the route ledger to `2026-10-21`; `npm run typecheck --silent` passed; the initial `npm test` exposed only the required stale page-date ledger, which passed after the generated update. The subsequent full suite was started after that update; use `npm test` again in a release review to capture a fresh terminal summary before merge. Not committed, reviewed, deployed, or production-verified. Next owner: cto-qa-lead reviews the exact diff and, if released, checks canonical production raw HTML; cto-seo-lead rereads the settled query/page window without attributing a CTR or ranking outcome to this local change.

---

# 2026-10-21 — Fort Lauderdale Reels page content-depth candidate (local branch)

- Source scope: `app/(english)/services/reels-editor-fort-lauderdale/page.tsx` and the generated existing ledger `config/page-lastmod.json`; no route, schema contract, analytics, price, or factual business claim changed.
- The H1 and metadata now state the supplied-clips outcome directly: a focused social video with readable captions and one action. A new server-rendered question-shaped section distinguishes editing supplied footage from planning a scoped local shoot. The route already retains its visible FAQ, FAQPage JSON-LD, and related links to the Miami, Fort Lauderdale production, Spanish reciprocal, and content-repurposing services.
- Local evidence: `pnpm lastmod:update` updated this route to `2026-10-21`; `npm run typecheck --silent` passed; `npm test` passed 165 files / 3,469 tests; `npm run lint --silent` completed with 0 errors and 22 existing warnings; `pnpm rail-adoption:check` passed 3/3; `pnpm build` rendered 569 static pages and its generated route HTML contained the new title, description, H1, decision section, and updated date. Not committed, reviewed by a sibling, deployed, or production-verified. Next owner: cto-qa-lead to review the exact diff and, if released, check production raw HTML and the changed route; cto-seo-lead to remeasure the settled query/page window without claiming a CTR or ranking result from this local change.

---

# 2026-10-20 — Technical SEO monitor repair and fresh gap read (local branch)

- Branch `fix/seo-monitor-video-facade` repairs three verifier defects without changing public copy: it recognizes the production YouTube click-to-play facade instead of demanding an eager iframe, parses valid JSON-LD without corrupting escaped quotes, and retries only transient network/5xx fetch failures (three attempts, 250ms apart). Eager embeds remain a failure, so the monitor still catches a real regression.
- Production evidence: `pnpm seo:verify` passed three consecutive reads on 2026-10-20: 530 indexable pages, 16 video-sitemap pages, 98 guide pages, 265 English and 265 Spanish routes, GA4 `G-W9CM4CE2MQ`, and a 1200x630 social card. The first full `pnpm check` exposed a distinct stale fixture: `es/chatbot-con-ia-para-negocios` intentionally changed with the Web AI service release but the Spanish text-parity snapshot was not refreshed. Rebuilding the exact fixture captured 194 routes; the parity check then passed all 194.
- Fresh outcome read: `pnpm seo:measurement:run -- --force` used final Search Console data for 2026-09-20 through 2026-10-17 (54 query rows, 92 page rows, 103 query-page rows). The index watch’s current `latest.json` has 321 PASS, 209 NEUTRAL, 0 FAIL. `scripts/neutral-index-audit.mjs` generated a 209-row review CSV; many neutral URLs are Spanish routes and event pages. Do not noindex/delete them from this report alone. Next: classify the 209 by age, query evidence, language pair and internal links, then consolidate only duplicates or thin routes.
- Contact attribution is implemented, not missing: `lib/google-analytics-script.ts` records first-touch contact source, records contact-intent method/source, and adds AI-referral source to WhatsApp prefill; `lib/lead-responder.ts` validates a lead source. This is instrumentation proof, not a source-tagged inquiry outcome.
- Separate PR #497 factual yacht-event copy correction had its missing quality evidence attached by `payload_autofill.py`; its quality workflow was rerun on 2026-10-20. Verify final CI and review before merging.

---

# 2026-10-19 — Shared public inbox migration (pending PR merge/deployment)

- Branch `fix/shared-inbox-public-contact`, commit `b663d333`, changes only the public business email from `esmolopez@gmail.com` to `info@estebanmorenomedia.com`. It preserves the canonical public name, `(305) 497-4478`, Fort Lauderdale base, service-area wording, maps/profile URLs, canonicals, and hreflang.
- The canonical `site.email` now drives visible mail links, LocalBusiness and ContactPoint schema, `/llms.txt`, and all generated bilingual pages. The lead-notification fallback matches the public inbox. The static 2026 catalog uses it too.
- Local evidence: targeted tests passed 36/36; `pnpm lint` completed with 0 errors (22 existing warnings); `pnpm typecheck` passed; a full test run exposed the intentionally obsolete personal-Gmail assertion in `contact-channels`, which was updated to the verified forwarding alias. A rebuilt raw output contained 921 `mailto:info@…` references and zero `mailto:esmolopez@…` references; the Spanish parity gate passed all 194 routes after the intentional email/schema baseline refresh.
- Delivery evidence: authoritative `dig @dns1.registrar-servers.com +short MX estebanmorenomedia.com` returns the five Namecheap `eforward` hosts. This proves incoming forwarding DNS, not receipt in Esteban's Gmail, outbound sending, automatic replies, or daily report delivery. Do not claim those until a send/receive/digest probe completes.

---

# 2026-10-19 — Growth starvation internal links to /es/precios

- Rescued target route `https://estebanmorenomedia.com/es/precios` (`app/(spanish)/es/precios/page.tsx`) by adding 4 contextual internal links in body copy from earning pages:
  1. `/about` (`app/(english)/about/page.tsx`): contextual link with anchor `precios y paquetes`.
  2. `/` (`components/about-teaser.tsx`): contextual link in the "Spanish-first" highlight card with anchor `precios de partida`.
  3. `/guides/best-caption-styles-for-instagram-reels` (`lib/guides.ts`): contextual link in viewing context / subtitle strategies section with anchor `precios de partida`.
  4. `/areas` (`app/(english)/areas/page.tsx`): contextual link in remote editing section with anchor `precios y paquetes`.
- Confirmed target `/es/precios` has breadcrumbs back to `/es` and contextual links back to `/es/areas`, `/es/calculadora`, and `/es/servicios`.
- Ran `pnpm lastmod:update` updating `config/page-lastmod.json`.
- Validated with `npm run typecheck --silent` and vitest test suite.

---

# 2026-10-18 — High-budget buyer path and verified entity reference (production verified)

- Branch `codex/high-budget-buyer-path-20261018` adds short, server-rendered pre-proposal sections to the existing English corporate and brand-production pages. Both route a buyer to the existing RFP guide without adding an offer, crew, turnaround, or price claim.
- The existing EN/ES RFP guide pair now includes a matching agency/event-planner attachment checklist and links to the published Healthy Smile portfolio entry. The copy names only the documented role (on-location video, direct sound, editing) and says it is not evidence of a private RFP, contract, or production policy.
- `site.clutch` is added only to the business `sameAs` schema after the public Clutch company page was inspected in the authenticated browser. It does not support an outcome, review, price, availability, team-size, or high-budget-production claim. The public profile currently says "Not yet reviewed" and has no focus areas, so its own fields still need owner-side normalization before it can reinforce the larger-scope path.
- Local proof: `pnpm test` passed 162 files / 3,216 tests; targeted entity/guide/lastmod tests passed 45/45; `pnpm lint` completed with 0 errors and 60 pre-existing warnings; `pnpm typecheck`, `pnpm build` (489 static pages), analytics gate, raw HTML checks, and 390×844 phone capture passed. Antigravity’s content review returned `REVIEW_VERDICT: APPROVE`; its wrapper exited 1 after a background-process handling defect, so the direct local gates above are the release evidence.
- PR [#482](https://github.com/gonzaloeaguilar-bot/esteban-media/pull/482) merged as `d771107b00c499a0f4de6d3896d878490377b083` on 2026-10-19. Vercel reported success for that commit. Canonical raw HTML contained the English corporate/brand sections, English/Spanish RFP additions, and the business Clutch URL; a 390×844 production capture showed the corporate brief block without obscuring navigation. `pnpm seo:indexnow:run` received HTTP 200 for all 450 sitemap URLs. This proves deployment/crawl notification, not ranking, citation, or inquiry outcome. Next: collect the planned T+28/T+56 query, citation, and source-tagged-inquiry reads.

---

# 2026-10-18 — Growth starvation internal links to /es/eventos

- Rescued target route `https://estebanmorenomedia.com/es/eventos` (`app/(spanish)/es/eventos/page.tsx`) by adding 4 contextual internal links in body copy from earning pages:
  1. `/about` (`app/(english)/about/page.tsx`): contextual link with anchor `eventos del año`.
  2. `/` (`components/about-teaser.tsx`): contextual link in the "Spanish-first" highlight card with anchor `eventos del año`.
  3. `/guides/best-caption-styles-for-instagram-reels` (`lib/guides.ts`): contextual link in viewing context / event reels section with anchor `eventos del año en el sur de Florida`.
  4. `/areas` (`app/(english)/areas/page.tsx`): contextual link in remote editing section with anchor `eventos del año`.
- Confirmed target `/es/eventos` has breadcrumb link back to `/es` and its 7 event child pages carry a backlink to the events hub (`/es/eventos` or `/events`) in their "other annual events" section (`components/event-content-page.tsx`).
- Ran `pnpm lastmod:update` updating `config/page-lastmod.json`.
- Validated with `pnpm typecheck` and full vitest test suite `pnpm test` (162 test files, 2,981 tests passing).

---

# 2026-10-16 — Bing + Ahrefs free-tool readiness (local branch)

- PR [#454](https://github.com/gonzaloeaguilar-bot/esteban-media/pull/454) on `feat/bing-ahrefs-readiness` adds the read-only `pnpm search-tools:readiness` contract and setup notes at `docs/search-tool-setup.md`. It checks live `robots.txt`, normal/video sitemaps and the public IndexNow key before any browser-side account setup or UI export review.
- Live check at implementation time: all five owned-site checks passed against `https://estebanmorenomedia.com`; `pnpm seo:indexnow:status` also confirmed the hosted key. This does not establish Bing Webmaster Tools or Ahrefs account ownership, accepted sitemap state, crawl data, rankings, or AI citations.
- Verification: targeted tests passed 5/5 and full `pnpm test` passed 158 files / 2,953 tests. Governed Antigravity review approved exact code commit `a8962514` (`20261016T123652Z-cto-seo-lead-esteban-media-1792154213182901000-68496-f9c8536282f21b60`); it found no external writes, false ownership claims, parsing defect, or test regression. PR remains unmerged.

# 2026-10-16 — Finalized SEO measurement loop (implementation branch)

- Branch: `codex/measurement-loop-20261016`. Adds `scripts/esteban-seo-measurement-report.mjs`, a read-only Search Console query/page/query-page report using `dataState: final` and a three-Pacific-day holdback. State writes to `~/.local/state/esteban-media-seo-measurement/`; the durable note is `wiki/esteban-seo-measurement.md`.
- First manual production-data read: `pnpm seo:measurement:run -- --force` returned PASS on 2026-10-16 for 2026-09-16 through 2026-10-13 (55 query, 87 page, 101 query-page rows). This is discovery evidence only, not Maps/AI/lead/release impact.
- Also adds GBP source-CSV intake and fixed-coordinate Maps operations docs, plus a Monday 08:15 ET LaunchAgent and installer. The LaunchAgent is deliberately not installed until reviewed and merged into the canonical checkout.
- Validation: measurement fixtures 4/4 passed; ESLint passed; plist validation passed. No public GBP field or external account was changed.

---

# 2026-10-15 — Homepage camera service deck repair (PR #445, local branch)

- Owner correction: changing a project category must not force a phone visitor to scroll past another image card to find the selected services.
- Commit `b5e3e51b` on `feat/camera-pricing-chooser` keeps the camera visual, turns all four project choices into one 2 by 2 phone grid, and places the selected package list directly beneath it. The former duplicate per-category image banner is hidden; the service heading and canonical price live in the camera deck.
- It deliberately does not publish Esteban equipment facts. The camera is visual direction only until models, lenses, ownership and buyer-facing relevance are confirmed.
- Local verification: focused home tests `27 passed`; `pnpm typecheck`; `pnpm build` (407 static pages); analytics gate passed. Local 320px Chrome check switched Business from the deck and immediately rendered Growth ($640/mo) and Local Presence ($800/production day) without a separate category-service scroll.
- PR: https://github.com/gonzaloeaguilar-bot/esteban-media/pull/445. Antigravity visual review approved the code commit (`REVIEW_VERDICT: APPROVE`) under dispatch `20261016T031413Z-cto-web-lead-esteban-media-1792120453538779000-40736-7f5294834eb37004`; the docs-only head `4dcc0fd2` has freshly queued CI. No production merge/deploy is claimed.

---

# 2026-10-14 — Growth starvation internal links to /es/areas

- Rescued target route `https://estebanmorenomedia.com/es/areas` (`app/(spanish)/es/areas/page.tsx`) by adding 4 contextual internal links in body copy from earning pages:
  1. `/about` (`app/(english)/about/page.tsx`): contextual link with anchor `áreas de servicio`.
  2. `/` (`components/about-teaser.tsx`): contextual link in the "Local" highlight card with anchor `áreas de servicio`.
  3. `/guides/best-caption-styles-for-instagram-reels` (`lib/guides.ts`): contextual link in safe-zone section with anchor `áreas de servicio`.
  4. `/portfolio` (`app/(english)/portfolio/page.tsx`): contextual link in remote editing section with anchor `áreas de servicio`.
- Confirmed target `/es/areas` already links back to its section hubs (`/es` breadcrumb, `/es/servicios`, and individual area detail pages).
- Ran `pnpm lastmod:update` updating `config/page-lastmod.json`.
- Validated with `npm run typecheck --silent` and full vitest test suite `npm test` (156 test files, 2,939 tests passing).

---

# 2026-10-14 — Overnight round 7 (branch `loop/round-7`)

- 71 Spanish niche pages: the existing "¿Cuánto cuesta…?" answer is now its own H2 right after the short answer (was an h3 at heading 4-25, 55 of them inside the bottom fold). 16 lift their own `sections` entry (`spanishPriceSection`), 55 lift the niche cost answer (`NicheCostAnswer`, `NicheAnswers omitCost`). No words added; text-parity re-snapshotted after diffing: only the fold labels lost "y cuánto cuesta" / ", precios publicados", links/alt/JSON-LD unchanged.
- 10 pricing detail pages (EN/ES packages + real estate): visible Home / Pricing / <page> trail, WebPage + BreadcrumbList JSON-LD with ledger dateModified, visible Updated line (`components/pricing-trail.tsx`).
- `priceSentence` custom branch: "Quoted per project" / "Cotizado a medida" (was "Quote custom"); package meta falls back to whole include lines, not a bare price sentence.
- Caption guide `metaDescription` answer-first. Round-6 notes re-dated 10-15 -> 10-14.

---

# 2026-10-14 — Overnight round 6 (branch `loop/round-6`)

- Price H2 on the 5 GeoServicePage pages is now an explicit `pricingQuestion` ("How much does a Reels editor in Fort Lauderdale cost?"), not `serviceName.toLowerCase()`.
- `ServiceAnswerFirst` question: `esServicePhrase` (no "servicio de servicio de", "edición de Reels en <city>") and `enServicePhrase` (no trailing "service"); keyword and answer unchanged. Text-parity baseline re-snapshotted after reading the full diff (only those headings, Pembroke dates/section).
- ES subtitles guide: "¿Cómo hacer subtítulos para Reels?" + 2 FAQs; Boat Show titles (FLIBS + Miami, EN/ES) say "Video"; /portfolio 2 headings as questions; ES Pembroke Pines city Reels answer.
- Log rows 100+ in the vault page esteban-overnight-loop-2026-10-14.

---

# 2026-10-13 — Spanish areas contextual inbound link

- Local change: guide `editor-de-video-vs-videografo` links to `/es/areas` beside filming guidance.
- Evidence, scope and coordinator follow-up: `.ai/internal-links-es-areas-2026-10-13.md`.
- Typecheck, lint, 1,854 tests and build passed; generated HTML contains the new anchor exactly once.
- Not deployed; sibling review and external vault updates belong to the owning coordinator.

# Real product photography buyer path — 2026-10-11

- PR #361 adds one English real-shoot page for product photography, links it from the AI page and services hub, and registers sitemap/watch/inventory follow-up for November 11. Direct GSC read had 3 US impressions / 0 clicks for `miami product photographer` landing on the AI page; this is site visibility, not market volume.
- Rebased onto the 342-URL main (#348), preserving its inventory and adding the product page as URL 343. Node22 `pnpm check` passed: 128 files / 1,834 tests, build and 107-route text parity. Built raw HTML includes the real-shoot H1, contact and AI links, canonical `#business` Service schema, phone/email, updated date and no price claim. No production outcome is claimed.

---

# Integration: SEO/GEO wave + events hub + niche wave 8 — 2026-10-11

Branch `integration/seo-events-niches-20261011` from main `c17fd51`, merge commits only: `fix/seo-geo-audit-wave` → `feat/events-hub` (#339) → `feat/niche-wave-8`. Sitemap 284 + 26 + 16 + 16 = **342** (counted in the built sitemap); one freeze count/hash with all three dated owner-ordered entries; `WATCH_URLS`, sitemap/cohort/index-watch tests at 342. Event facts carried into `lib/llms-base.txt` (the generated `/llms.txt` route lists every URL). Wave 8 pages got the `#business` provider reference; `ServiceRelated` now drops cards into consolidated pages (5 wave 8 cards). Text-parity baseline regenerated after build: 0 words/links/headings lost vs main on 97 routes, 10 new routes. CTA dashboard regenerated. Gates: rail-kit, rail-adoption, lint (0 errors), typecheck, vitest (only `prospect-auditor-verifier`), build, text-parity (107 routes), events:check, dual-audience 32/32.

---

# SEO/GEO audit wave — 2026-10-11 (branch `fix/seo-geo-audit-wave`, pushed, no PR)

Implements the 15 "safe mechanical fixes" in `.ai/seo-geo-code-audit-2026-10-10.md` plus Esteban's owner decisions. Fixes 1-2 also shipped to main as #334; this branch is merged with main.

- **Sitemap 284 → 310** (owner decision): the 26 indexable-but-unsitemapped pages (12 growth-system, 10 daily tools, 2 case-study hubs, `/lens`, `/fort-lauderdale`) are listed via `inventoryAdditions20261010Paths` in `app/sitemap.ts`. Freeze count/hash + `ownerOrderedAdditions` entry (follow-up 2026-11-10), `WATCH_URLS`, sitemap/hub/consolidation tests updated. Hreflang declared in `languageAlternates` for every pair, including the 4 daily tool pairs that had only switcher pairing.
- **`/llms.txt` is now a static route** (`app/llms.txt/route.ts`): hand-written facts in `lib/llms-base.txt` + a page index generated from `sitemap()`. New sitemap pages (the niche/event pages other agents are adding) appear automatically; edit only the facts file. Tests: llms URLs ⊆ sitemap, every sitemap URL listed. Palm Beach line reworded to describe the existing pages without strengthening them; on-location filming stated as paid, scoped per project.
- **Schema**: WebPage + BreadcrumbList on every EN `/services/*` page (`buildServicePageNodes`); 70 inline `LocalBusiness` stubs → `{ "@id": "#business" }`; guides author/publisher → `#business` (no bylines yet, owner decision pending) + Article image; case studies author `#esteban` (body names him) / publisher `#business`; GBP URL removed from Person `sameAs`; VideoObject on the 8 case studies that embed YouTube.
- **Content (no new claims)**: `ServiceAnswerFirst` ("In short" / "En corto", prices from `PACKAGE_PRICES`) on GeoServicePage, the Spanish niche renderer and 47 EN pages; FAQs on 37 hand-written EN pages ported from their Spanish twins (`PORTED_SERVICE_FAQS`); contractor and plastic-surgery skipped (their ES FAQ makes a performance / security claim). Sibling rings for 23 EN + 40 ES hub-only pages; Palm Beach pages deliberately excluded.
- **Other**: hubs/related cards stop linking noindexed pages (82 → 31 links; the 31 left are on `/es/servicios`, `/es/areas`, `/es/guias`, `/es/editor-de-video-miami`, which text-parity pins, so removing links there needs an owner-approved non-additive baseline refresh); `/es/contacto` prerenders (`?source` read client-side); H1 on 6 tool pages; unique Reels H2s; brand suffix dropped when a title would pass 60 chars (not on parity-pinned `/es/<slug>`); portfolio descriptions ≤155 and `Portafolio:` ES titles; ChatGPT-User/Claude-User/Perplexity-User skip the `/`→`/es` redirect.
- **Text-parity baseline refreshed** with `node scripts/text-parity.mjs snapshot` after a full diff: 0 words/alt/headings/links lost on 97 routes; additions + JSON-LD hash changes only; `/es/contacto` added.
- **Left for later / other owners**: reels video-sitemap entries, reels `publisher` and the ES reel shelf (branch `feat/es-real-estate-reel-shelf`); visible bylines and page dates (owner decision pending); the templated `¿Para qué proyecto encaja?` H2 replacement and the ES-hub link removals (non-additive parity changes); `/areas`'s Palm Beach card copy still says "sub-city coverage is not yet published".
- Build note: `next/font` needs `NODE_USE_ENV_PROXY=1 pnpm build` in the sandbox. `app/__tests__/prospect-auditor-verifier.test.ts` fails only because the proxy blocks its live fetch.


---

# Local keyword demand release — 2026-10-11

PR #353 merged at `285af4530d31b9b36ef9ee8c44224ba0e6cec232` and Vercel production reached Ready. Direct canonical-domain checks returned HTTP 200 with the new English and Spanish restaurant copy, the Fort Lauderdale production/Reels links, canonical metadata, and working destination/contact links. A live phone screenshot confirmed a single home illustration caption after the rebase repair. IndexNow accepted 284 sitemap URLs (HTTP 200). The measurable input was 90-day Search Console site impressions, not local-market search volume; click/lead outcome is due 2026-11-08. Source and evidence: `~/obsidian-wiki/client-esteban-media/wiki/esteban-local-keyword-demand-gaps-2026-10-11.md`.

---

# Fort Lauderdale Reels search handoff — 2026-10-11

Branch `codex/esteban-reels-seo` updates the existing English `/services/reels-editor-fort-lauderdale` and Spanish `/es/editor-de-reels-fort-lauderdale` pages. Both now give a concrete, clearly hypothetical restaurant clip brief, distinguish editing supplied footage from separately scoped local capture, and point to published ML Colombia content without claiming customer results. The English Fort Lauderdale cost guide now links directly to the English Reels service; the Spanish guide already linked to its counterpart. The changed Spanish page alone was refreshed in the text-parity fixture. Source for the ML Colombia reference: `lib/portfolio.ts` (published social video, 24-second duration) and `messages/en.json` / `messages/es.json` (Esteban founded and led digital content for his own brand). No identical deliverable or performance result is asserted. Local gates: rail-kit, rail adoption, lint (0 errors), typecheck, all 1,576 tests, production build, and 97-route text parity passed; final raw HTML and independent review are recorded in the PR. Search clicks and leads remain future observations, not claimed outcomes.

# Cost guide and Fort Lauderdale expansion — 2026-10-11

- Branch: `codex/esteban-demand-links-20261011` from current `origin/main`. Scope: `lib/guides.ts`, two English Fort Lauderdale service pages. EN/ES guide uses `packageGuidePrice("presencia-local")`, with explicit production-day vs full-project price distinction and verified links. No new route.
- Evidence: BigQuery Esteban query table ends Oct 5; `video production miami cost` 7 impressions/0 clicks since Sep 1. Direct GSC API available through Oct 9. BigQuery sync log rejects DML because billing is disabled.
- CI correction: the first PR run failed a legacy phrase assertion in `app/__tests__/pricing-bands.test.ts` that required the old no-price answer. Replaced it with a stronger assertion tying the answer to `PACKAGE_PRICES["presencia-local"]` while requiring the full-quote disclaimer. The complete `pnpm check` then passed at the final diff.
- Gates: `pnpm check` passed before final dynamic price addition; targeted 267 guide tests and build passed after. The Spanish guides index reused the changed answer, so only its word fingerprint was refreshed; text parity now passes 97 routes. Analytics gate passed. Raw generated HTML link checks passed. Independent CTO-dispatched review attempted but provider rerouting ended in unsupported Codex CLI model; manual diff and source/route review completed. See vault [[esteban-bq-expansion-review-2026-10-11]].
---

# Root <html> hydration warning — 2026-10-11

Branch `fix/html-hydration-warning`. Every route logged "A tree hydrated but some attributes of the server rendered HTML didn't match" (the dev overlay's "1 Issue"): SiteChrome's motion gate and brand-moment boot set `class="rail-anim"` / `data-brand-moment` on `<html>` before React hydrates. Added `suppressHydrationWarning` to `<html>` in both locale root layouts and `global-not-found.tsx` (it covers that element's own attributes only). Reproduced on `/`, `/es`, `/pricing` and a 404 before the fix, 0 after. New guard `app/__tests__/html-hydration.test.ts`; `localized-layouts.test.ts` now matches the lang attribute instead of the exact tag string.

---

# Home: proof before pricing — 2026-10-10

Branch `fix/home-proof-before-pricing`. Both homes (`/`, `/es`) now render Hero → AudienceRouter → PortfolioTeaser → RealEstateReels (EN only; `/es` never had the shelf) → ClientReviews → PackagesSection (which still bundles real-estate plans, à-la-carte, 3 steps, FAQ + FAQPage JSON-LD) → KeepReading fold → ClosingCredits. Ordering only, no copy changes. `#packages` / `#paquetes` still live inside PackagesSection, so the hero CTA works. `app/__tests__/home-proof-before-pricing.test.ts` locks the order.
# Home unified type system — 2026-10-11

Branch `style/home-unified-type` (draft PR). UX review fix #3: the home pages used three headline voices (Oswald condensed caps, Geist 700 grotesk, Newsreader serif) and two price faces (Instrument Serif vs bold sans RailPrice). Now there is one of each, set from shared tokens declared on `body` in `app/globals.css`: `.em-h2` (Newsreader 400, `clamp(36px, ..., 52px)`), `.em-eyebrow` / `.em-eyebrow--inverted` (Geist 600 12px, 0.2em, `--em-accent-ink`), and `.em-price-figure` / `--words` (Instrument Serif 400 via the `Instrument_Serif` `--font-price` loader, 48–64px / words 36–48px, unit small in Geist beside it — owner choice, matching PR #318). Oswald is left only on the hero brand mark and the opening ident. The real-estate RailPrice is mapped through kit variables, so `vendor/` is untouched. Copy, order, imagery and CTAs are unchanged. Guard: `app/__tests__/home-type-system.test.ts`. Gates: rail-kit, rail-adoption, lint (0 errors), typecheck, build, text-parity (97 routes) pass. The only failing vitest is `prospect-auditor-verifier`, which needs live egress the container blocks.
# Home CTA, voice and fine print — 2026-10-11

Branch `fix/home-cta-voice-fineprint` (draft PR). One primary action, worded once: every quote/contact action on the home (header, hero, package cards, Starter tiles, real estate plans, à la carte items without a page, reel section + reel detail, closing credit) is a wa.me link labelled from `lib/quote-cta.ts` ("Get a quote on WhatsApp" / "Cotizar por WhatsApp") with a `data-cta` ending in `_whatsapp`. Per-card reel WhatsApp buttons removed (service link moved to the reel section header). Header CTA now opens WhatsApp site-wide (was /contact; /contact stays in the footer) — GA4 sees `contact_intent` (whatsapp) instead of `contact_cta_click` for that button. Removed SEO-facing review fine print and the visible "Updated <date>" stamps on illustration captions (illustrations and AI disclosure kept). Home copy standardized to first person singular; package FAQ questions now "you"-addressed (schema derives from the same strings). Hero caption no longer repeats the H1. `spanish-niche-text-baseline.json` refreshed for 97 routes: diff verified to be only the header label on 94 routes, plus Starter labels on 2 creator routes and the package/FAQ/CTA copy on `es/precios`. Gates: lint 0 errors, typecheck, build, text-parity PASS; vitest 1533/1534 (only `prospect-auditor-verifier` fails — live fetch blocked by the sandbox proxy, untouched by this branch). Obsidian notes not updated from this container.

# Annual events content section — 2026-10-10

Branch `feat/events-hub` (owner-approved by Esteban). New bilingual section for small businesses that exhibit at, sponsor or sell around recurring South Florida events: hub `/events` ↔ `/es/eventos` plus one EN/ES pair per event, rendered by the shared `components/event-content-page.tsx` (ServiceCraft, ServiceFaqs, ServiceInquiryRail, ServiceRelated, NumberedList, `buildServiceFaqSchema`). Page files are thin wrappers.
- **All event dates live in `lib/events.ts`** (`typicalWindow` + `nextEdition {start,end,confirmedSource,lastChecked}`), labelled as event-guide listings. Staleness is a reminder, not a merge blocker: `pnpm events:check [YYYY-MM-DD]` lists ended editions and exits 1; it runs weekly in `.github/workflows/followups-due.yml` (not in `pnpm check`), and pages hide ended editions at build time. Refresh every year; set `nextEdition: null` when the next edition is not listed yet. Miami Spice (ends 2026-10-31) and FLIBS (ends 2026-11-01) will show up in the weekly run first.
- Copy in `lib/event-content.ts`: no date literals, no hand-typed prices (priceSentence only), every page states non-affiliation and that Esteban has not filmed the event; on-location filming is a paid add-on scoped per project. Schema is WebPage/CollectionPage + Service + FAQPage + BreadcrumbList, never `Event`.
- Additive `EventSeasonLinks` cross-links (map `EVENT_CROSSLINKS` in `lib/events.ts`) on /services, /es/servicios and the yacht, restaurant, nightlife, event-video and corporate-event pages (EN + ES). Shared components gained optional `eyebrow`/`linkLabel` props and an opt-in accented Spanish inquiry copy (`accentedSpanish`); existing pages render unchanged.
- Inventory: sitemap, freeze count+hash, WATCH_URLS, llms.txt block and the 8 affected Spanish text-parity baselines updated (additive only).
# Niche wave 8 — eight bilingual pairs — 2026-10-11

Branch `feat/niche-wave-8` (pushed, no PR). Owner-approved buyer gaps, 16 new indexable URLs:
pre-construction condos, vacation rentals, insurance agencies (ACA/Medicare), mortgage brokers/loan officers,
immigration attorneys, churches (sermon clips), quinceañeras, dance studios/music academies/kids' activities.
- EN pages: `app/(english)/services/<slug>/page.tsx` on service-depth (`ServiceCraft`, `ServiceDeepDive`, `ServiceFaqs`,
  `ServiceInquiryRail`, `ServiceRelated`, `buildServiceFaqSchema`); hero carries a question `<h2>` with a 40–180-word answer
  (`NicheWave8Depth.answer`) and an honest proof line. Copy in `lib/service-depth-content.ts` / `lib/service-deep-dive-content.ts` (wave-8 blocks at the end).
- ES pages: `nicheWave8Pages` in `lib/spanish-site.ts`, rendered by `SpanishNichePage`; new optional `fitQuestion` replaces the generic
  "¿Para qué proyecto encaja?" heading. Proof/inquiry entries in `components/spanish-niche-page.tsx`.
- Prices only via `priceSentence()`; on-location filming stated as "paid add-on scoped per project" / "servicio adicional pagado que se cotiza por proyecto".
  Regulated duties (NMLS, carrier/Medicare disclaimers, Florida Bar review, minors' consent, music rights) attributed to the client.
- Wiring (grouped "niche wave 8" blocks): sitemap 284 → 300, freeze count/hash + ownerOrderedAdditions entry (follow-up 2026-11-11),
  index-watch `WATCH_URLS`, `lib/language-routes.ts`, `nicheWave8Hreflang`, `public/llms.txt` group, text-parity hub allowlist + 8 new baseline routes,
  `data/outreach/niches.json` (+8), CTA dashboard. Tests: `app/__tests__/niche-wave-8.test.ts`.
- Gates: pnpm check steps all pass except the known sandbox-only `prospect-auditor-verifier.test.ts` (live network); dual-audience gate 16/16 PASS.
- Expect conflicts with the concurrent llms.txt-generation and event-pages branches in sitemap/freeze/watch/llms/text-parity files.

---

# Spanish service-area contextual links — 2026-10-11 (local, uncommitted)

- Bounded dispatch: `cto-seo-lead` → implementation; verification owner `cto-qa-lead`. Base commit `94a63bb6dd6233fcad66339b6892d29f8933893c`.
- Added two body-copy links in `lib/spanish-site.ts`, from `/es/video-inmobiliario-coral-gables` and `/es/video-para-yates-y-hospitalidad-fort-lauderdale` to `/es/areas`. Anchor `área de servicio` is taken from the target H1. Both use the existing `SpanishNichePage` → `renderFormattedText` → Next Link path; no new component or route.
- Confirmed target at `app/(spanish)/es/areas/page.tsx`; its `/es` breadcrumb and `/es/servicios` return link already exist. All pre-existing copy/claims are preserved; only two navigational sentences are appended.
- Evidence correction: the target is already linked in existing source and production. Python HTTP/HTML reads returned 200 for the target and both source routes; `/es/servicios` already has four direct `/es/areas` anchors (including shared navigation). Existing backlog entries also record earlier reinforcement. Do not call this an orphan fix or infer indexing causation from zero impressions.
- The dispatch supplied no earning-page URLs; these sources were selected by contextual relevance and are not marked noindex in `config/cohort-consolidation.json`. Their GSC performance and the supplied zero-impression figures remain unverified in this bounded call.
- Read Graphify map `a825fa0827ef5d69d4cb084aee8658f215d3d0a82f455a9331dc129d17846c76` and shared context packet `9c7b3a53231f2834fb008555000dd1b6c8c4812879d0fbcf5a40d236bfe578b9`; traced both route wrappers through the shared renderer to the edited content.
- Verification: `npm run typecheck --silent` PASS; `npm test` PASS (119 files / 1,526 tests); `npm run lint` PASS (0 errors / 50 warnings); `NEXT_TELEMETRY_DISABLED=1 npm run build` PASS (349 static pages); `npm run rail-kit:check` PASS (100 files match the pinned kit); Rail adoption PASS within the full test suite. First full test attempt hit one existing rendering-test timeout while the build was running; the unchanged suite passed on rerun after the build finished, with no timeout/config changes.
- `npm run text-parity` PASS (97 routes). Updated only the two affected word fingerprints in the existing fixture, after verifying the exact added sentence tokens and byte-equivalent headings, alt text, destination sets and JSON-LD; all other route fingerprints are unchanged. A source comparison also confirmed that removing the two new sentences restores the original `lib/spanish-site.ts` exactly.
- Raw boundary: parsed generated HTML and used `curl --fail --silent` against the local production server on port 32361 for both sources and `/es/areas`. Each source has exactly one paragraph anchor labeled `área de servicio` to the target; target H1, `/es` breadcrumb and `/es/servicios` return link pass. Server stopped after verification. Phone/desktop visual review is pending with the coordinator; no layout or component behavior changed.
- Dependency setup: `npm ci` rejected the pre-existing package-lock mismatch; used the declared frozen pnpm lockfile without changing manifests/locks. Runtime logs remain ignored under `node_modules/.internal-links-cache/` (`tests-rerun.log`, `lint.log`, `build.log`, `rail-kit.log`).
- Next-role request, before release: coordinator dispatches sibling Antigravity review and Claude/cto-qa-lead verification, including rendered phone/desktop link checks, then handles PR/release and vault/registry updates. This call makes no external writes, provider calls, deployment or ranking claim. Coordinator should repair the recurring orphan selection/missing earning-page evidence before the next scheduled attempt; detector changes are outside this workspace scope.

---

# US-Spanish Money Pages Deepening & /es/editor-de-video-miami — 2026-10-07 (local, uncommitted)

Branch `feat/es-us-spanish-money-pages`. Deepened US-Spanish money pages (`/es/editor-de-reels-fort-lauderdale`, `/es/editor-de-reels-miami`, `/es/editor-de-video-corto-para-redes-miami`), added contextual cross-links and guide links, and created the Spanish-first landing page `/es/editor-de-video-miami` (sitemap count: 284).
- Restored Spanish diacritics on Reels money pages and improved lead/descriptions.
- Derived all price figures directly from `PRICING_BANDS` in `lib/pricing.ts` (social, youtube, corporate) with no hardcoded price literals.
- Added cross-links between FTL Reels, Miami Reels, Short-form video hub, and Miami Editor.
- Added contextual entry links in `/es/videografo-en-fort-lauderdale`, `/es/produccion-de-video-fort-lauderdale`, `/es/videografo-en-miami`, `/es/reels-para-negocios-miami`, and guides (`/es/guias/cuanto-cuesta-la-produccion-de-video-en-fort-lauderdale`, `/es/guias/como-elegir-un-editor-de-video-en-miami`).
- Updated indexable inventory freeze (`approvedSitemapUrlCount: 284`), search console index watch (`WATCH_URLS` length: 284), and sitemap tests.
- Dual-Audience Gate PASS on all 4 target pages: `es/editor-de-reels-fort-lauderdale.html` (4 in-band, 0 oversized), `es/editor-de-reels-miami.html` (4 in-band, 0 oversized), `es/editor-de-video-corto-para-redes-miami.html` (3 in-band, 0 oversized), `es/editor-de-video-miami.html` (6 in-band, 0 oversized).
- Verification: `npm test` (106 files / 1160 tests PASS), `npx tsc --noEmit` (PASS), `npm run lint` (0 errors), `npm run text-parity` (97 routes PASS), `analytics-gate` (PASS).

---

# Food and places creator pair — 2026-10-07

Branch `feat/food-places-creator-launch`. New EN/ES service routes (`/services/food-and-places-creator-video-editing-miami`, `/es/edicion-de-video-para-creadores-de-comida-y-lugares-miami`) join creator editing and restaurant editing: reciprocal body/related links, hreflang pair, sitemap + inventory freeze + index-watch entries, package-derived prices (never hardcoded), FAQ schema, real portfolio proof (Bar Door Monkey, ML Colombia). Service-interest tracking is opt-in for this pair; lens telemetry gained its two missing `cta_click` params so the repo analytics gate passes. Local gates: 1,086 tests, build, analytics gate PASS, dual-audience gate PASS (EN 5 in-band / ES 5 in-band).

---

# Lead persistence — 2026-10-07 (local, uncommitted)

`lib/lead-store.ts` now maps lead fields into `esteban_leads`, inserts through Supabase before optional Resend delivery, and marks accepted email best-effort. `/api/lead` returns 503 in EN/ES if neither storage nor email accepts the submission; successful persistence returns the database row ID. Rejected submissions no longer emit a successful CDP ingestion event. JSON validation, network timeouts, test-row tagging and privacy-safe failure logging are covered.

Verified in this worktree: targeted Vitest 64/64; `npx --no-install tsc --noEmit` exit 0; `npm test` 1,131/1,131 across 103 files; changed-file ESLint exit 0. No `.env.example` exists. Required server variables: `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`; Resend remains optional.

No commit, deployment, live database write, notification send or independent provider review occurred in this bounded implementation. The coordinator owns sibling Antigravity review, Claude/cto-qa-lead verification, remaining release checks and a tagged production submission/readback before claiming incident closure. External vault and registry writes are reserved for the coordinator under this dispatch's worktree-only policy. Full evidence and next actions: `.ai/lead-persistence-2026-10-07.md`.

# Favicon cache refresh — 2026-10-03

Owner reports the Vercel favicon again. Current live root assets already contain Esteban’s terracotta e; the head still declares the original /favicon.ico URL. This repair gives all browser icon declarations explicit brand-specific paths in both root locales while preserving byte-identical legacy assets for bookmarks/schema. scripts/generate-brand-icons.py owns both sets. Existing glyph legibility tests plus metadata/alias tests guard the recurrence. Browser cache is a plausible cause, not directly proven. Delivery and production evidence: Obsidian esteban-favicon-refresh-2026-10-03.

# Index-watch neutral URL follow-up — 2026-10-01

Branch: `feat/esteban-growth-watch-hardening`. This pass finishes Top 20 actions 18/19 by making the Search Console index-watch loop remember neutral/excluded URLs instead of only printing the current run.

- Added `neutralWatch` state to `scripts/search-console-index-watch.mjs`: each current `NEUTRAL` URL stores first seen, last seen, days neutral, coverage state, and last alert time.
- Added a seven-day warning path: if a URL stays neutral for 7+ days, the loop emits `neutral_seven_day_watch` and renders a "Neutral URLs older than 7 days" table in the managed Obsidian note.
- Added recovery cleanup: when a watched neutral URL returns to `PASS`, the neutral-watch record disappears while the existing `reindexed` alert path still fires.
- Added validation and backfill for older state files so the current 63 neutral URLs are brought under watch the next time `index-watch:status` or the scheduled loop reads state.
- Verification: `pnpm exec vitest run scripts/search-console-index-watch.test.mjs` passed with 28 tests, and `pnpm index-watch:status` reported `indexed pass 193 neutral 63 fail 0 unknown 0`, `pendingNotificationCount 0`, and `neutralWatchCount 63` from `/Users/gonzalo/.local/state/esteban-media-index-watch/latest.json`.

---

# Rail/common component adoption loop — 2026-10-01

Branch: `feat/esteban-rail-adoption-loop`. This pass creates the durable path for Esteban or his AI to contribute without hand-rolling dense page sections.

- Added `.ai/service-page-template.md` for AI contributors: new service-page depth should use `components/service-depth.tsx` (`ServiceCraft`, `ServiceFaqs`, `ServiceRelated`, `buildServiceFaqSchema`) and keep analytics hooks as `data-section` / `data-cta` instead of one-off markup.
- Added `app/__tests__/rail-adoption.test.ts` plus `pnpm rail-adoption:check`. The gate scans `app/**/page.tsx`, allows known shared renderers and legacy gaps, and blocks new dense public page files that do not use common components or an approved shared renderer.
- Migrated `/services/yacht-hospitality-video-fort-lauderdale` as the reference page. Depth copy now lives in `YACHT_HOSPITALITY_DEPTH` in `lib/service-depth-content.ts`, while the page renders shared service-depth components and FAQ JSON-LD through the shared builder.
- Added `.github/workflows/rail-adoption.yml` on a weekly Tuesday schedule plus manual dispatch, and added the adoption gate to `pnpm check`.
- Current audit snapshot: 192 `page.tsx` files; 95 direct Rail/shared/service-depth imports; 80 thin wrappers around shared renderers; 17 likely hand-rolled page files remaining. See `.ai/rail-common-component-adoption-audit-2026-10-01.md`.
- Verification: `pnpm check` exit 0 on 2026-10-01. It ran `rail-kit:check`, `rail-adoption:check` (3 tests), lint (46 existing warnings, 0 errors), typecheck, `vitest` (91 files / 907 tests), production build (323 static pages), and `text-parity` (87 routes keep every word, heading, link and schema blob).

---

# Real estate monthly plans — 2026-09-30

Branch: `feat/real-estate-monthly-plans`. New section under the four packages (home `/`, `/es`, `/pricing`, `/es/precios`) showing the three PUBLIC monthly plans (Essential / Plus / Premium). Figures live in `lib/pricing.ts` (`REAL_ESTATE_PLANS`), words in `lib/real-estate-plans.ts`.

- **Deliberately NOT published:** the photo ladder and the monthly size-surcharge ladder from the same guide. `app/__tests__/services-config.test.ts` blocks them because they are a client's negotiated terms and the repo is public. Do not add them, and do not edit that guard to make a change pass.
- The per-shoot rate card (`REAL_ESTATE_MEDIA`) is unchanged. The guide's "extra properties are billed at the prices above" line was left out because it refers to the private ladder, not the public card.
- `es/precios.html` in `spanish-niche-text-baseline.json` was refreshed (one line). The diff was verified purely additive: 0 words, headings, links or JSON-LD lost.

---

# Current bounded implementation — 2026-09-30

Branch: `feat/commercial-cda87cb0f3ffa017-1-r0930`. Answered commercial buyer query: "Which video editors in Fort Lauderdale should a small business hire for social media videos and reels? Compare specific providers and cite their websites." (Prompt ID: `43ff69cb33a8dd094cf93b7a10c211010ccde15c2e6ea8f8c346e77baa090e37`). Deepened `/guides/video-production-cost-fort-lauderdale` and `/es/guias/cuanto-cuesta-la-produccion-de-video-en-fort-lauderdale`, updated `/fort-lauderdale` landing page, verified all build/text-parity/analytics gates. PR opened for independent review.

---

# Engineering handoff — esteban-media

Last substantive session: **2026-09-24**, growth-starvation internal link reinforcement for `/es/areas` on 6 Spanish interactive tool pages.
Full record: `~/obsidian-wiki/client-esteban-media/wiki/esteban-sesion-rediseno-y-movimiento-2026-09-18.md`

## In production

`aefd808` 70 Spanish niche routes as cards · `adc592b` homepage portfolio rail ·
`dc976a0` the real cartel (tall poster cards, 293×375 ratio 1.28 on a phone, 68% photo).

## Open, deliberately unmerged

**PR #213 — motion** (entrance, page veil, scroll reveal, cartel shimmer). Gates green,
verified in Chromium + WebKit. Not merged because it runs before paint, touches every
page and can cover the viewport — the only change that day with no independent review.
Merge when Gonzalo says.

## The three gates this repo now carries

1. `pnpm rail-kit:check` — the vendored kit is sha256-pinned at `57a13c627458`.
   **Never edit `vendor/rail-kit/` directly.** Change it in `~/code/rail-kit`, run
   `node scripts/sync-rail-kit.mjs`, commit the diff. 14 other checkouts vendor it —
   run `node scripts/consumers-report.mjs` there before renaming anything.
2. `pnpm text-parity` — compares BUILT html against
   `app/__tests__/fixtures/spanish-niche-text-baseline.json`. Additions are ALLOWLISTED
   in `scripts/text-parity.mjs` (`ALLOWED_ADDITIONS`), not forbidden: adopting a
   component that speaks always adds its own UI strings, and you cannot add a picture
   without adding its alt. Anything outside the list fails. 12 negative controls in
   `app/__tests__/text-parity-gate.test.ts`.
3. `moonlight-public-identity.test.ts` — **the operator's name must not appear in
   source.** It failed three times on CSS comments attributing design decisions. Keep the
   rationale, write it unattributed.

## Things that will bite

- **The cartel is a SKIN, not the kit.** `.em-cartel` in `app/globals.css`, ported from
  `~/code/gonzalotech-artifacts/danielzea-site/css/components/cartel.css`. The kit is
  brand-neutral and text-first on purpose; the brand lives in the skin.
- **The stills are 16:9 and mostly website screenshots.** Do NOT crop them to a portrait
  frame — a 4:5 centre crop keeps 45% of the width and makes the headlines inside them
  illegible. The FRAME carries the poster proportion; the picture stays whole.
- **Next navigates on the client.** `documentLoadsDuringNav: 0`. Any pattern that relies
  on a second document — head-script handoffs, sessionStorage relays, prefetch-the-next-
  document — is dead code here. The veil is driven by `usePathname`.
- **Verify servers before measuring.** Two false readings came from a stale server and
  from a *different project* answering on a reused port. Start on a verified-free port
  and read the `<title>` before trusting any number.

## Blocked on the client, not on code

1. A scanned signature + one sentence in Esteban's own words → makes the entrance his.
2. Turnaround, price band, on-location availability → the TL;DR facts. Persona UAT found
   the copy hedges instead of answering, which reads as evasion to a human AND gives an
   answer engine nothing to cite. Same defect, two symptoms. Never invent these.

## Next, by value

1. "En corto" TL;DR blocks (needs the three facts above).
2. Hero CTA sits at y=765 on a 667px viewport — below the fold, untouched across four PRs.
3. ~65 English service pages are hand-written one-offs; extract a template before they
   can receive any of this.

## 2026-10-03 — Floating navigation safe-area repair

The shared floating bar inherited home-indicator padding inside its pill while cinema.css already included the inset in the outside lift. Adopted a narrow upstream rail-kit maintenance commit b7d62ca (from this consumer's existing pin), preserving all unrelated vendored components. The shared fix removes floating interior padding, preserves safe clearance outside, includes lift in the spacer and remeasures viewport changes. The hide transform now includes the lift so the shorter bar completely leaves the screen.

Verified: pnpm check EXIT 0 (939 tests, 3 adoption tests, 90-route text parity); shared browser fixture passes 375x667, 390x844 and 1280x800 with 0/34/0 simulated insets, original-defect negative control fails. Local built site: height59.5/padding0, external44/spacer104, hidden top868 in viewport844, Search opens and Escape closes. Physical iPhone unverified. Evidence: /Users/gonzalo/code/nav-safearea-evidence/. Claude OAuth expired; no Claude verification. Shared main's unrelated token-map audit failure is not part of this consumer backport. Production status to be recorded after PR checks.

## 2026-10-03 — Illustrated audience and monthly plans

Owner requested images/video/illustrations for the two plain commercial sections and approved the working illustrated concept with “Push”. The production implementation uses shared RailPlaybill/RailPlayer/RailSegmented/RailPrice, three labeled concept illustrations, a real published project video, optional original audience explanations and one monthly-plan selector. Prices, WhatsApp text, all inclusions and conditions remain sourced from the existing pricing modules. All plans remain available without JavaScript.

`pnpm check` passes with Node 22: 943 tests, 3 adoption checks, build/typecheck/lint and 90 parity routes. Only the authorized Spanish pricing snapshot changed; its link set and JSON-LD hash are unchanged. See `.ai/illustrated-commercial/README.md` and the project vault's `esteban-visual-commercial-cards-2026-10-03.md` for browser evidence, provider limits, review and delivery status. Other checkout work is preserved.


## 2026-10-03 — real-estate plan identity and interactive miniature illustrations
Owner correction after PR279: real-estate chapter needs explicit identity; every plan needs different creative; illustrations should animate and respond to touch. Branch `fix/real-estate-plan-distinction` preserves canonical prices/terms/links. Uses shared RailDisclosure/RailPlayer/RailSegmented/RailPrice; local brand composition, no vendor fork. Source artwork map has metadata/hash regression. Visual direction saved in shared reference index and project vault, owner explicitly likes its playful quality. Tests944/94 PASS; build PASS; only es/precios text fixture refreshed after identical links/JSON-LD assertion; parity90routes PASS. Chrome/WebKit375/390/1440 actual interactions, no-JS, reduced motion, raw four routes and scoped axe0 PASS. Production verification follows PR promotion; Claude lane unavailable, do not claim its approval. Evidence: ~/code/esteban-plan-distinction-20261003/evidence; durable note esteban-plan-distinction-2026-10-03.md.

# Illustrated à la carte — 2026-10-03
Owner requested extending the playful illustration treatment to single-project services, using the current workflow. ALaCarteSection composes pinned RailDisclosure with six distinct generated miniatures, service-specific finite touch effects and preparation guidance. Exact labels/notes/hrefs remain sourced from lib/packages.ts; direct links work without opening a card. EN/ES, no-JS visibility and reduced motion are covered. No commercial facts changed. Provenance: .ai/illustrated-commercial/carte-assets.json. Full local and production verification/review links are recorded in the project vault note esteban-a-la-carte-illustrations-2026-10-03.
# Fort Lauderdale production page search handoff — 2026-10-11

The 2026-09-10 through 2026-10-09 live Search Console query/page read showed 18 impressions/0 clicks for `video production services` and 17/0 for `fort lauderdale video production`, both on `/`. The exact `video production fort lauderdale` query had 3 impressions/0 clicks on `/services/video-production-fort-lauderdale`. The homepage already carries a service-first title test from October 6, while PR #343 changes its visual path; this branch only fixes the production service page. Its hero previously exposed an internal SEO explanation. It now points to the published Bar Door Monkey portfolio video, states that project was filmed in Miami, and gives a Fort Lauderdale visitor a concrete way to start a quote. The Spanish counterpart already links to published projects and needs no source change. Verification and PR state are in the Esteban SEO gap plan note.

# Homepage reel carousel visual pass — 2026-10-11

In this worktree, `components/real-estate-reels.tsx` and `app/globals.css` now present the sharp waterfront tower reel first, remove the dark wash over the poster row, and give cards a subtle border/depth. The separate homepage/page and portfolio edits already present in the worktree were not changed for this pass. Local phone browser inspection covered EN/ES at 390×844; the first reel player opened and closed. After restoring the original intro copy, `pnpm check` passed 1,576 tests, build, and 97-route text parity. Commit `640e1c9` is pushed to open PR #343. CTO Antigravity review dispatch rerouted and failed before returning a review; independent review and production verification remain pending. See Obsidian `esteban-reel-carousel-visual-pass-2026-10-11.md`.
# Photography offer truth correction — 2026-10-11

PR #357 merged at `f81fb665b1668333a20d200cab2750806d62c24e` after the owner-confirmed photography correction. It adds a scoped photography item to shared Spanish services and links it to the photographer page; My D'ler remains labeled visual brand work, not a photo shoot. Full `pnpm check` on Node 22 passed: 1,572 tests, lint 0 errors, typecheck, build 349 pages, text parity 97 routes. GitHub validate and Cortex evidence checks passed. Vercel deployment succeeded; fresh canonical GETs of `/es/fotografo-en-fort-lauderdale` and `/es/servicios` both returned 200. Raw photographer HTML has `Esteban ofrece fotografía`, the service link, and no stale pending statement; the services page has the photography anchor and reciprocal link. Both photographer JSON-LD graphs lack stale text. Contact destinations shown in raw HTML are WhatsApp `13054974478`, `esmolopez@gmail.com`, and `tel:+13054974478`. Independent read-only source review passed. Antigravity CTO review dispatch was refused at provider cooldown. Search and inquiry lift await observation.

# Spanish Fort Lauderdale Reels guide link — 2026-10-11

Branch `codex/esteban-reels-guide-link-20261011` from `origin/main` at `9903c2a`. A fresh authenticated GSC query+page read for 2026-09-10..2026-10-09 showed the Spanish Fort Lauderdale editor query reaching both the EN Reels page and the ES editor-vs-videographer guide, while the latter linked onward to Miami services. Changed one shared guide paragraph to link the existing `/es/editor-de-reels-fort-lauderdale` service for Broward footage and `/es/produccion-de-video-fort-lauderdale` for filming instead. Both live targets returned 200; the Reels page has its own canonical and reciprocal en-US/es-US alternates. Final `pnpm check` passed, including 1,576 tests, build, and 97-route text parity; built Spanish guide HTML contains both links. Analytics gate and `git diff --check` passed. Antigravity dispatch was attempted through the CTO gate but the required provider was unavailable for 97 minutes; independent alternate code review PASS 96/100 on final source. No production deployment or outcome lift is claimed.
# GEO offer clarity — 2026-10-11

Branch `codex/esteban-geo-offer-clarity-20261011`. The home service card now says the approved Starter price is per video, and the Spanish home description makes the same unit and Spanish service explicit. The amount still comes from `lib/pricing.ts`. `pnpm check` passed: 1,573 tests, build, and 97-route Spanish text parity. Google Business Profile's Video editing service was saved with a from-$100 price and a supplied-footage, Spanish-first description; Google said it will publish shortly, so public visibility is pending. See the 2026-10-11 recommendation probe in the Esteban vault.

---
# Microsoft Clarity readiness — 2026-10-16

Configuration-gated conversion-observability implementation is present locally, inactive by default: `components/microsoft-clarity.tsx`, `lib/microsoft-clarity.ts`, conditional EN/ES privacy disclosure, and `docs/microsoft-clarity-activation.md`. It only renders when Vercel supplies a valid `NEXT_PUBLIC_CLARITY_PROJECT_ID`; the browser script exits for previews/noncanonical host, bots/automation, Global Privacy Control and Do Not Track. No account, project ID, Vercel configuration, deploy, or visitor data was created. Full `pnpm test` passed 156 files / 2,943 tests; typecheck passed; changed-file lint has 0 errors (one existing `beforeInteractive` warning in `site-chrome.tsx`). Next: governed independent review, merge, then owner adds the production variable and performs the written live verification. Durable evidence: `[[esteban-microsoft-clarity-readiness-2026-10-16]]`.

## 2026-10-20 — guarded shared-inbox website acknowledgement (local branch)

- Branch `feat/shared-inbox-lead-agent`, commit `63d61377`, adds `lib/lead-email.ts` and four focused tests. Website leads first notify Esteban; a bilingual receipt reply is sent only when `LEAD_AUTOREPLY_ENABLED=1` and a working Resend sender is present. The reply collects goal/date/location/references and explicitly does not confirm price, scope, or availability. Test submissions send nothing.
- `pnpm test` passed 164 files / 3,465 tests; `pnpm typecheck` passed; `pnpm lint` had 0 errors and 22 pre-existing warnings; `analytics-gate.py` passed after syncing the required vendored tracker. The initial independent review rejected only because that tracker was stale; its safety findings found no acknowledgement or privacy defect.
- This is not a live email agent: the configured Resend credential must be repaired and a real mailbox (rather than forwarding-only alias) connected before merge/activation and a real receive → acknowledgement → Esteban alert → daily-report probe can be claimed.
# 2026-10-16 — Camera Bench native-swipe gallery (local, awaiting PR)

- Owner asked for a more impressive, touchable whole-camera experience after the paired product tiles shipped in PR #469.
- Branch `feat/camera-bench-interactive` changes `components/camera-kit-method.tsx` and `app/illustrated-commercial.css` into a native horizontal scroll-snap shelf. One camera fills a slide; the next camera remains visibly reachable. Each slide retains its server-rendered native `<details>` disclosure and shared name, so Sony/Canon details remain mutually exclusive.
- No new equipment, lens, lighting, delivery, ownership, or performance claim was added. Existing manufacturer images and specifications remain the only camera facts.
- Local evidence: `pnpm test` 162 files / 2,981 tests passed; `pnpm typecheck`, `pnpm lint` (60 pre-existing warnings), `pnpm build`, `pnpm rail-adoption:check`, `git diff --check`, and raw local HTML check passed. Antigravity visual-direction review approved (`/tmp/camera-bench-swipe-agy.txt`). Production HTTPS phone interaction verification is still required after merge.
## 2026-10-24 — AI chooser visual repair released

- PR #541 (`fix(home): replace small AI card image`) replaced only the fifth chooser card's FLAS screenshot with `/portfolio/gains-from-geebs.jpg`; it preserves the AI, web and visibility route, offers and services from PR #540. Source `29d2ac25`, merged `91c79f3647fbbf780ba8151b7d726e70eccd5792`.
- Verification: focused Vitest 37/37, typecheck, lint (0 errors; existing warnings); 390x844 local visual check. PR validate `40120096085`, quality evidence `40120429510`, main CI `40120461083`, and IndexNow `40120461062` passed. Production deployment `7302642368` succeeded; canonical `/es` returned HTTP 200 with `gains-from-geebs.jpg` and the card's Spanish label.
- No measured inquiry, ranking, citation or revenue change. Durable vault entry: `client-esteban-media/wiki/esteban-home-ai-seo-chooser-2026-10-24.md`.
# 2026-10-23 — Owner-authorized real-estate social reel carousel (local branch)

- Branch `feat/real-estate-social-reel` adds the owner-supplied published Instagram social edit as the first, self-hosted item in the existing real-estate carousel. The local MP4 is 576x1024 and 22.866667 seconds; it has a local poster. No Instagram embed, client/property name, sale claim, homepage-hero swap, or new visitor flow was added.
- `lib/real-estate-reels.ts` remains the shared source for the card, player, VideoObject JSON-LD, and video sitemap. It now stores each reel publication date; visible inventory is seven. `config/page-lastmod.json` was regenerated for the two affected service pages and the Spanish parity baseline was refreshed after the intentional count changes.
- Local evidence: lint passed with 0 errors and 22 existing warnings; typecheck passed; 165 test files / 3,470 tests passed; analytics gate passed (12 emit sites / 11 events); build, text parity (194 routes), rail adoption (3/3), and `git diff --check` passed. Browser checks showed desktop and 390px player playback advancing from the self-hosted MP4.
- Local commit `ac9d927f` records the implementation. No PR, merge, deployment, or production verification exists. Required independent-review dispatch is blocked by its recorded context/usage gate after three attempts; do not bypass it. Next owner clears that governed dispatch state, obtains review, then releases and verifies both live player sizes.

# 2026-10-23 — Combined owner-media release candidate

- The candidate adds native `autoPlay` to the existing muted, looping, inline homepage hero video and a regression test in `app/__tests__/home-anchors-resolve.test.ts`. It preserves the existing poster, text, actions, `CinemaHeroMotion` visibility pause, and reduced-motion gate.
- It also includes the previously committed owner-authorized social-reel carousel item. Browser verification on the generated local build showed the hero at `autoplay: true`, `muted: true`, `loop: true`, `paused: false`, with advancing time; the carousel shows seven items and plays the new local MP4 in place at phone size.
- Release-candidate checks: lint 0 errors (22 existing warnings), typecheck passed, `pnpm test` passed 165 files / 3,471 tests, analytics gate passed, build produced `BUILD_ID=FjQMM2xegeGaLVeiriBCY`, text parity passed 194 routes, and rail adoption passed 3/3. A governed review dispatch was attempted but did not reach a provider because its review configuration rejected the initial requests; no review verdict exists.
- User explicitly requested production release. After the branch is pushed and CI is green, verify the live home autoplay and the real-estate reel player at desktop and 390px. Do not claim conversion impact from this release.
## 2026-10-23 — The Great Reviewer iPhone 18 content case (local)

- Branch: `feat/youtube-content-case-20261023`.
- Added `public/portfolio/great-reviewer-iphone-18.jpg`, extracted from the original 1080×1920 vertical Reel supplied in the The Great Reviewer iMessage group on 2026-09-28 at 23:14. The Content Creator route now uses this real Reel still with its existing interaction treatment.
- Added bilingual portfolio project `great-reviewer-iphone-18` linked to the public YouTube video `BDRru8eXaj4`. Copy makes no reach, commercial, or audience claim.
- Verification: `pnpm test` passed 167 files / 3,489 tests. Browser QA passed on 375×667, 390×844, 1440×900. `pnpm check` got through lint, typecheck, tests, build, and indexability, then the global Spanish text-parity gate reported 28 known snapshot differences in unrelated existing routes. Do not refresh that global fixture without reviewing those separate changes.
- Next: obtain an independent diff review, commit, create PR, merge only after remote evidence, then verify public `/portfolio/great-reviewer-iphone-18`, `/es/portafolio/great-reviewer-iphone-18`, and the 390px Content Creator expansion.
# 2026-10-23 — Growth-starvation internal links for /es/evaluacion (local candidate)

- Scope: added four contextual body-copy links to the existing Spanish `Diagnóstico de Estrategia de Video` at `/es/evaluacion` from `/` (via `components/about-teaser.tsx`), `/about`, `/areas`, and `/contact`. The target already returns to its Spanish section hub through the visible `Inicio` breadcrumb to `/es`.
- Ledger: `pnpm lastmod:update` refreshed the generated existing entries for `/about`, `/areas`, and `/contact` in `config/page-lastmod.json`; the homepage component does not own a page-ledger entry.
- Local evidence: `npm run typecheck --silent` and the required `npm test` acceptance run passed: 167 test files, 3,489 tests. `git diff --check` passed. Not committed, independently reviewed, deployed, or production-verified. Next: `cto-qa-lead` reviews the exact diff; after an authorized release, confirm the four canonical rendered links and the target breadcrumb in production. `cto-seo-lead` owns a later comparable GSC read; no indexing, click, ranking, citation, inquiry, or revenue effect is claimed.
# Free capture score — 2026-10-24

- New read-only `scripts/free-capture-score.mjs` ranks settled Search Console query-page rows with transparent demand, reachability, click-opportunity, and recorded AI-citation inputs. It is deliberately not a proprietary difficulty metric and leaves SERP resistance unmeasured without a reproducible source.
- Command: `pnpm seo:capture-score`; sources default to the local settled Search Console snapshot and the portfolio citation ledger. No paid APIs, page edits, or external writes.
- Verified: focused test (4/4), full `pnpm test` (169 files / 3,499 tests), lint (0 errors), typecheck, and production build completed. Two governed independent Antigravity verifier records approved: `20261024T150601Z-cto-qa-lead-esteban-media-1792854362550307000-49201-f1b5cbd2742c47f2.json` and `20261024T150823Z-cto-seo-lead-esteban-media-1792854504094440000-56254-c5fd3ebf91eb775b.json`. Next: commit and open PR; do not treat score output as a ranking, traffic, or lead result.

# 2026-10-24 — Google review proof refresh candidate

- Public Google Maps read on 2026-10-24 reported `5.0 stars` and `18 reviews` for the Esteban Moreno Media profile (`https://www.google.com/maps?cid=12305289738935181687`). The source snapshot was stale at 11.
- Commit `5aab9367` updates `data/google-reviews.json`, makes the compact home band lead with verified client feedback rather than “a perfect 5.0,” and keeps the 18-review count as supporting verification. The Google action is count-free: “See all reviews on Google.” Quotes remain verbatim and attributed.
- Verification: focused review tests 11/11, `pnpm typecheck`, and `pnpm lint` (0 errors; 18 existing warnings). Local browser check at 390×844 confirms the feedback heading, rating, count, quote, and Google action fit with usable spacing. Next: open a scoped PR; after merge, verify public phone rendering and raw homepage text before calling it live.

---
# 2026-10-24 — AI-agent price clarity (local)

- Branch `feat/ai-agent-pricing-20261024` adds `lib/ai-agent-offers.ts` and exposes chatbot setup pricing plus six fixed-price agent builds in the existing bilingual homepage AI selector. The custom-agent list is a native `<details>` disclosure; the existing quote action and analytics hooks remain in place.
- Checks: `pnpm test` passed 172 files / 3,521 tests; `pnpm typecheck` passed; `pnpm lint` finished with 0 errors and 22 pre-existing warnings; analytics gate passed (12 emit sites / 11 event names). `pnpm build` did not finish locally under Node v26.7.0; this repo requires Node >=20.9 and <23. Re-run under Node 22 before PR.
- No PR, merge, deploy, rendered local browser check, or production verification. The required plan-phase Claude dispatch was blocked by the active burn gate; do not mark an independent review as complete.
