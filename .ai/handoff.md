# Esteban Moreno Media — Engineering Handoff

## Goal

Keep the production site reproducible, governed, private, and ready for the next proof/indexing phase.

## Current state — 2026-07-16

- Production: `https://estebanmorenomedia.com`
- Vercel project: `esteban-media`
- GitHub: `https://github.com/gonzaloeaguilar-bot/esteban-media` (private)
- Canonical production branch: `main`; changes land through pull requests and CI.
- Production baseline merged through PR #21; legacy automation PRs are closed and their branches remain available for selective recovery.
- The former iCloud `origin` is preserved as the archival `icloud` remote and must not be used with `git fetch --all` while it remains invalid.
- Repository contains internal interview/source documents and must remain private.
- Local Graphify map: 271 nodes, 433 built edges, 22 labeled communities; generated output is ignored.
- Vercel's GitHub integration is verified: `main` automatically produced Ready production deployment `dpl_kJs67KAr7ryxeHngcDQS8XrERki8` and all canonical aliases point to it.
- GitHub branch protection is unavailable for this private repository on the current plan; PR/CI discipline is therefore enforced by repository policy rather than a server-side rule.

## Validation baseline

- Project onboarding pass: lint, typecheck, 28 tests, and production build passed.
- Live audit: all 18 sitemap URLs returned 200; no broken internal links; canonical redirects, robots, sitemap, hreflang, and JSON-LD were healthy.
- Re-run `pnpm check` before future merges; do not rely only on this baseline.

## Decisions

- Dedicated Obsidian module: `/Users/gonzalo/obsidian-wiki/client-esteban-media/`
- GitHub canonical: `https://github.com/gonzaloeaguilar-bot/esteban-media`
- Graphify stays local/ignored because it can reproduce private source-document facts.
- CodeGraph remains opt-in and is not initialized by default.
- No fake portfolio, reviews, address, prices, turnaround, client names, or business claims.

## Next safe work

1. Begin Search Console/GBP setup.
2. Replace proof placeholders with approved real assets and case studies.
3. Correct Spanish document language and add the branded Open Graph asset.
4. Add reviews, citations, and local links only as legitimate evidence becomes available.
