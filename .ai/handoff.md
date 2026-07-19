# Esteban Moreno Media — Engineering Handoff

## Goal

Keep the production site reproducible, governed, private, and ready for the next proof/indexing phase.

## Current state — 2026-07-19

- The canonical local checkout is now `/Users/gonzalo/code/esteban-media`, cloned directly from the private GitHub repository with `origin` set to GitHub.
- The former Desktop checkout remains intact as a legacy copy with an explicit canonical-path note; its archival `icloud` remote is not part of the new checkout.
- Fresh-clone validation passed on Node `22.22.2` / pnpm `10.14.0`: lint, typecheck, 29 tests, and the 26-page production build.
- A2 merged through PR #39 at `814d7cc`. GA4 property `546162112`, stream `15284656879`, and measurement ID `G-W9CM4CE2MQ` are provisioned under Gonzalo account `234386094`; enhanced measurement and page-change tracking are enabled and a second provisioning run was idempotent.
- English and Spanish routes now use separate root layouts, so initial Spanish HTML serves `<html lang="es">`. A shared metadata builder keeps canonical, hreflang, Open Graph, and Twitter fields page-specific across all 20 sitemap URLs.
- The release adds a cached 1200×630 branded `/social-card`, concise titles/descriptions, direct above-fold entity/service/location copy, production-host-scoped GA loading, bilingual privacy notices, and a bilingual global 404 for the multiple-root-layout app.
- A2 release evidence is green: local `pnpm check`, three independent reviews, GitHub `validate`, recorded Cortex enforcement, and Vercel preview passed. Exact-commit production deployment `dpl_H7eYyWj9tYjvVUtW69i33jYdEhCu` is Ready; the full live verifier passes 20 sitemap pages, two privacy pages, three 404 paths, language/metadata parity, GA source checks, and social-card dimensions. Browser collection requests for `page_view` and `a2_acceptance_test` returned HTTP 204, and `/es` serves `lang="es"`.
- Remaining A2 gate: the newly created property has not yet surfaced the production test event through the GA4 Realtime API. Google documents initial-install processing delays, so keep polling without changing the confirmed tag transport.
- B1 completed through PR #40 at `554ed5d`. `com.esteban-media.index-watch` is loaded from the committed plist for Wed/Fri/Sun 08:00 ET. Its first real run wrote `esteban-media-index-watch.md` and private state with one all-data click/impression, 20/20 `PASS`, zero canonical mismatches, a delivered first-impression notification, exit 0, and zero-byte stderr. A second same-day kickstart returned `ALREADY_RECORDED` with byte-stable state/note and no repeat alert.
- B2 completed through PR #41 at `033ed30` after three independent reviews, 19 focused/77 total tests, the 29-page build, GitHub `validate`, Vercel preview, and recorded Cortex enforcement. The validated PR artifact and squash merge have the identical Git tree; that artifact is production Ready as `dpl_8C2Z9ourhHv3pRgK5sYcaxWbERYn`, and the live 20-URL SEO verifier remains green.
- `com.esteban-media.weekly-digest` is loaded from the committed byte-identical plist for Sunday 08:45 ET. Its first real run wrote private state, the managed hot pulse, and `esteban-media-weekly-digest.md`; observed homepage/sitemap/robots HTTP 200 plus exact GA configuration; and consumed B1 run `2026-07-19T17:19:29.268Z` with finalized 0/0, all-data 1/1, and 20/20 indexed coverage without repeating Google calls. Replay returned `ALREADY_RECORDED` with byte-stable state/hot/detail artifacts, exit 0, zero-byte stderr, and no error state. B1 was reinstalled with its timezone guard and its accepted state/note remained byte-stable.

## Current state — 2026-07-16

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

1. Continue polling GA4 Realtime until the already-confirmed production event appears, then close A2 in the vault.
2. Finish the hidden-address service-area Google Business Profile only after Esteban confirms the official category.
3. Turn the strongest published projects into dedicated case studies only when Esteban confirms deliverables, roles, locations, and outcomes.
4. Add reviews, citations, and local links only as legitimate evidence becomes available.
