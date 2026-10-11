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
