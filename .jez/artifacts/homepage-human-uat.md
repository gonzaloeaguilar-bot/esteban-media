# Homepage Human UAT: Esteban Moreno Media
**Date**: 2026-09-15
**Test URL**: http://localhost:3108
**Scope**: `/` and `/es`, desktop 1440x900, mobile 390x844
**Result**: PASS, 0 failures

## Product Thesis
The homepage should help a real buyer answer three questions quickly:
1. Who is Esteban?
2. Can I see the work?
3. How do I start a project?

The page now starts with a clear identity, then moves directly into the portfolio before service explanation. SEO content still exists on the page and in the route structure, but it no longer blocks the human path to published work.

## UI/UX Agent
**Pass.**
- Hero first button opens portfolio.
- Contact remains visible as the second button.
- The homepage no longer places a lead form before the portfolio.
- The work grid now leads the page before service taxonomy, reviews, and deeper location/service content.

## Dyslexia / Readability Agent
**Pass.**
- English H1: 11 words.
- Spanish H1: 8 words.
- Longest homepage paragraph in English: 32 words.
- Longest homepage paragraph in Spanish: 30 words.
- The page avoids dense wall-of-text blocks before showing the portfolio.

## ADHD / Scanability Agent
**Pass.**
- English mobile: portfolio begins at 0.79 screens; first project appears at 1.12 screens.
- Spanish mobile: portfolio begins at 0.82 screens; first project appears at 1.18 screens.
- Primary path is now visually obvious: portfolio first, contact second.
- Mobile tap-target check passed with 0 small mobile targets.

## Plain-Language Sweep
**Pass.**
- No visible internal terms detected from the homepage UAT list: guardrail, baseline, staging, readiness, activation, UAT, GEO, rutas heredadas, journey, CTA, proof lane, internal link.
- Replaced Spanish homepage copy that said "rutas heredadas" with plain visitor-facing language.
- Replaced service copy that said "customer journey" and "search readiness" with plain visitor-facing language.
- Replaced portfolio teaser copy that explained the design problem with copy focused on what the visitor can evaluate: style, pace, and quality.

## SEO / Google Crawlability
**Pass.**
- English homepage title, meta description, canonical, and structured data remain present.
- Spanish homepage title, meta description, canonical, and structured data remain present.
- Build generated 309 static pages, preserving the broader SEO route inventory.

## Evidence
- Build: `pnpm build` passed and generated 309/309 pages.
- UAT command: `UAT_BASE_URL=http://localhost:3108 /Users/gonzalo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/homepage-human-uat.mjs`.
- UAT raw result: `/tmp/esteban-homepage-human-uat-clean.json`.
- Screenshots:
  - `/tmp/esteban-home-uat-en-desktop.png`
  - `/tmp/esteban-home-uat-en-mobile.png`
  - `/tmp/esteban-home-uat-es-desktop.png`
  - `/tmp/esteban-home-uat-es-mobile.png`
