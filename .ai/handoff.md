# Esteban Moreno Media — Engineering Handoff

## Portfolio Page Content Depth & Search Enrichment — 2026-08-17

- Expanded `/portfolio` with substantive coverage answering searcher intent for video editing portfolio and production services:
  - Creative disciplines breakdown across video editing/post-production, business/brand promos, animation/visual assets, and custom web systems.
  - 4-step project workflow covering media intake (cloud handoff), story arc/editorial cutting, audio mixing/color grading/dynamic captions, and timecoded review/master multi-format exports.
  - Comprehensive FAQ section with 6 targeted questions (footage suitability, remote collaboration, smartphone video, export formats, bilingual English/Spanish delivery, and South Florida capture).
  - Enhanced structured data combining `CollectionPage` and `FAQPage` JSON-LD schema.
- Verification: `pnpm check` passed (lint, typecheck, 45 test files / 354 tests, and Next.js static build of 289 routes).

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
