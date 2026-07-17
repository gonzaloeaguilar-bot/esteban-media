# Esteban Moreno Media — Engineering Handoff

## Goal

Keep the production site reproducible, governed, private, and ready for the next proof/indexing phase.

## Current state — 2026-07-16

- Production: `https://estebanmorenomedia.com`
- Vercel project: `esteban-media`
- GitHub: `https://github.com/gonzaloeaguilar-bot/esteban-media` (private)
- Canonical production branch: `main`; changes land through pull requests and CI.
- The former iCloud `origin` is preserved as the archival `icloud` remote and must not be used with `git fetch --all` while it remains invalid.
- Repository contains internal interview/source documents and must remain private.
- Local Graphify map: 271 nodes, 433 built edges, 22 labeled communities; generated output is ignored.

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

1. Verify Vercel's GitHub production-branch connection.
2. Begin Search Console/GBP setup.
3. Replace proof placeholders with approved real assets and case studies.
4. Correct Spanish document language and add the branded Open Graph asset.
