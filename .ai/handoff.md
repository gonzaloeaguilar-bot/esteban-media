# Esteban Moreno Media — Engineering Handoff

## Goal

Keep the production site reproducible, governed, private, and ready for the next proof/indexing phase.

## Current state — 2026-07-19

- The canonical local checkout is now `/Users/gonzalo/code/esteban-media`, cloned directly from the private GitHub repository with `origin` set to GitHub.
- The former Desktop checkout remains intact as a legacy copy with an explicit canonical-path note; its archival `icloud` remote is not part of the new checkout.
- Fresh-clone validation passed on Node `22.22.2` / pnpm `10.14.0`: lint, typecheck, 29 tests, and the 26-page production build.
- Next roadmap item: analytics + technical SEO PR (GA4, server-rendered Spanish document language, branded Open Graph image, metadata tightening, and direct entity/service/location copy).

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
- Spanish page content has a server-rendered `lang="es-US"` wrapper and hydrates the document language, but the initial root `<html>` remains `en-US`; fixing that correctly requires a broader root-layout/route-group change.
- Google Search Console uses the URL-prefix property `https://estebanmorenomedia.com/` in the explicitly requested Gonzalo Chrome profile. The public verification token is emitted through Next.js metadata; live submission details belong in the Obsidian Search Console record.

## Next safe work

1. Ship the analytics + technical SEO PR: GA4, server-rendered Spanish document language, branded Open Graph image, metadata tightening, and direct entity/service/location copy.
2. Add the three-times-weekly Search Console index-watch and weekly site-health digest loops after the technical release.
3. Finish the hidden-address service-area Google Business Profile only after Esteban confirms the official category.
4. Turn the strongest published projects into dedicated case studies only when Esteban confirms deliverables, roles, locations, and outcomes.
5. Add reviews, citations, and local links only as legitimate evidence becomes available.
