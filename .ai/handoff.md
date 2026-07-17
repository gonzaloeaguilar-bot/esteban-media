# Esteban Moreno Media — Engineering Handoff

## Goal

Keep the production site reproducible, governed, private, and ready for the next proof/indexing phase.

## Current state — 2026-07-16

- Production: `https://estebanmorenomedia.com`
- Vercel project: `esteban-media`
- GitHub: `https://github.com/gonzaloeaguilar-bot/esteban-media` (private)
- Canonical production branch: `main`; changes land through pull requests and CI.
- Production baseline merged through PR #21; legacy automation PRs are closed and their branches remain available for selective recovery.
- Branch `feat/real-portfolio` contains the verified bilingual real-project portfolio release candidate; publication status and final deployment identifiers are recorded below when merged.
- The former iCloud `origin` is preserved as the archival `icloud` remote and must not be used with `git fetch --all` while it remains invalid.
- Repository contains internal interview/source documents and must remain private.
- Local Graphify map exists and is ignored; refresh after the portfolio release without treating refresh failure as a release blocker.
- Vercel's GitHub integration is verified: `main` automatically produced Ready production deployment `dpl_kJs67KAr7ryxeHngcDQS8XrERki8` and all canonical aliases point to it.
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

## Next safe work

1. Begin Search Console/GBP setup and submit the expanded 20-URL sitemap after production verification.
2. Turn the strongest published projects into dedicated case studies only when Esteban confirms deliverables, roles, locations, and outcomes.
3. Correct root document language on Spanish routes; add Esteban's approved headshot/logo/reel and a branded Open Graph asset.
4. Ask Esteban to review the Spanish portfolio voice and replace the 480×360 `La Huelga` poster when a better source is available.
5. Add reviews, citations, and local links only as legitimate evidence becomes available.
