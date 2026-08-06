# Esteban Moreno Media — Engineering Handoff

## Goal

Keep the production site reproducible, governed, private, and ready for the next proof/indexing phase.

## ESTEBAN-03 implementation checkpoint — 2026-08-05 ET

- Isolated clone/branch `codex/esteban-03-pembroke-pines` is based on verified object `877dce7`. The target Spanish page now removes unsupported affordability/outcome/continuous-service wording, explicitly says the published Miami proof is not a Pembroke Pines project or commercial-results proof, adds reciprocal hreflang to the existing English pair, and carries the allowlisted source `pembroke-pines-small-business-video` into first-party brief submissions.
- Evidence: `git diff --check` pass; focused 26/26 pass; lint 0 errors/3 pre-existing warnings; typecheck pass; full suite 194/195 with only the unrelated network-backed Squarespace fixture failing. Build is blocked by `fonts.googleapis.com` DNS; local preview bind is blocked by `EPERM`; production/GSC hosts do not resolve; browser selection has no available browser.
- Required Claude spec failed through three gated strategy variants (180s/120s/90s timeouts), so nothing was released or claimed complete. Full evidence and delayed KPI contract: `docs/audits/ESTEBAN-03-pembroke-pines-ranking-2026-08-05.md`.

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
