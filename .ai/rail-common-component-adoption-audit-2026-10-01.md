# Esteban Media Rail/Common Component Adoption Audit

Date: 2026-10-01
Repo/worktree: `/Users/gonzalo/code/esteban-top20-growth-20261001-a`

## Executive Summary

The site has the shared Rail library vendored and pinned correctly, and the
shared analytics layer is present. The gap is adoption discipline: many public
surfaces still hand-roll cards, grids, CTAs, FAQs, stats, pricing cards, and
section wrappers instead of using Rail/common components or promoting repeated
local patterns into the library.

Verified:

- `pnpm rail-kit:check` passed.
- `rail-kit.lock.json` pins 100 files from
  `gonzaloeaguilar-bot/rail-kit@700d20af9ad4`.
- `public/track.js` owns shared event names such as `cta_click` and
  `section_view`; `app/__tests__/one-emitter-per-event.test.ts` protects
  against double-emitting them.
- New service-depth components use `data-section` and `data-cta`, so the shared
  analytics layer can attribute their sections and related-service links.

## Counts

- App `page.tsx` files: 192.
- Directly importing Rail/shared UI/service-depth: 95.
- Thin route wrappers around shared renderers, despite no direct Rail import: 80.
- Likely hand-rolled page files with no direct shared import and no obvious
  shared renderer wrapper: 17.

The 80 wrapper pages are not necessarily a problem. Example:
`app/(spanish)/es/editor-de-video-corto-para-redes-miami/page.tsx` only calls
`<SpanishNichePage slug={slug} />`, so the audit should focus on
`components/spanish-niche-page.tsx`, not every generated route.

## Highest-Priority Adoption Gaps

### 1. Big hand-rolled English pages

These files carry dense repeated layout/card markup and little or no Rail/common
component usage:

- `app/(english)/portfolio/page.tsx`
- `app/(english)/services/yacht-hospitality-video-fort-lauderdale/page.tsx`
- `app/(english)/services/tiktok-ad-video-editor-miami/page.tsx`
- `app/(english)/services/restaurant-promo-video-editing-miami/page.tsx`
- `app/(english)/services/website-design-fort-lauderdale/page.tsx`
- `app/(english)/services/page.tsx`
- `app/(english)/areas/page.tsx`
- `app/(english)/contact/page.tsx`

Suggested component path:

- Use existing `ServiceCraft`, `ServiceFaqs`, `ServiceRelated`, or promote those
  into Rail as a reusable service-page depth kit.
- Replace repeated rounded card grids with a Rail/common card-grid primitive if
  an existing Rail component does not fit.
- Add `data-section` to major sections that are currently un-attributed.

### 2. Shared renderers that still hand-roll cards

These are shared renderers already, but they should rely more on Rail/common
components because many generated pages inherit their markup:

- `components/spanish-niche-page.tsx`
- `components/guide-pages.tsx`
- `components/case-studies-index.tsx`
- `components/case-study-page.tsx`
- `components/portfolio-watch-page.tsx`

Suggested component path:

- `components/guide-pages.tsx` already uses `RailFaq`; support cards, related
  cards, proof cards, and query-insight cards are still local markup.
- `components/case-studies-index.tsx` repeats card/list/CTA patterns that fit
  Rail card/list primitives or a new case-study index component.
- `components/spanish-niche-page.tsx` uses local `Cartel`, `Figure`,
  `NumberedList`, `ProjectRail`, and `ServiceRail`; decide which of these
  should stay Esteban-specific and which should be promoted.

### 3. Interactive tools have analytics markers but not common UI

These tools now have `data-section` tests, but still hand-roll most interface
surfaces:

- `components/video-budget-estimator.tsx`
- `components/video-strategy-assessment.tsx`
- `components/video-brief-builder.tsx`
- `components/script-and-overlay-kit.tsx`
- `components/footage-handoff-checklist.tsx`
- `components/daily-script-pacing-calculator.tsx`
- `components/daily-script-timer.tsx`
- `components/daily-script-timer-es.tsx`
- `components/daily-shot-list-planner.tsx`
- `components/daily-hook-planner.tsx`
- `components/daily-hook-planner-es.tsx`

Suggested component path:

- Keep the tool-specific logic local.
- Extract repeated option rows, progress/status tiles, result panels, and form
  shells into Rail/common components before building the next tool.

### 4. Pricing/package detail routes

Likely hand-rolled page files:

- `app/(english)/pricing/all-in/page.tsx`
- `app/(english)/pricing/growth/page.tsx`
- `app/(english)/pricing/local-presence/page.tsx`
- `app/(english)/pricing/real-estate/page.tsx`
- `app/(english)/pricing/starter/page.tsx`
- `app/(spanish)/es/precios/arranque/page.tsx`
- `app/(spanish)/es/precios/crecimiento/page.tsx`
- `app/(spanish)/es/precios/inmobiliaria/page.tsx`
- `app/(spanish)/es/precios/presencia-local/page.tsx`
- `app/(spanish)/es/precios/todo-incluido/page.tsx`

Suggested component path:

- Standardize through existing package/pricing components where possible:
  `components/package-detail.tsx`, `components/packages-section.tsx`,
  `RailPrice`, `RailFaq`, and related pricing cards.
- Any new price-card behavior should go upstream to Rail first if it is not
  Esteban-specific.

## Likely Hand-Rolled Page Files

Files with no direct Rail/shared import and no obvious shared renderer wrapper:

- `app/(english)/desk-recommendations/page.tsx`
- `app/(english)/page.tsx`
- `app/(english)/portfolio/[id]/page.tsx`
- `app/(english)/pricing/all-in/page.tsx`
- `app/(english)/pricing/growth/page.tsx`
- `app/(english)/pricing/local-presence/page.tsx`
- `app/(english)/pricing/real-estate/page.tsx`
- `app/(english)/pricing/starter/page.tsx`
- `app/(english)/privacy/page.tsx`
- `app/(english)/unsubscribe/page.tsx`
- `app/(spanish)/es/portafolio/[id]/page.tsx`
- `app/(spanish)/es/precios/arranque/page.tsx`
- `app/(spanish)/es/precios/crecimiento/page.tsx`
- `app/(spanish)/es/precios/inmobiliaria/page.tsx`
- `app/(spanish)/es/precios/presencia-local/page.tsx`
- `app/(spanish)/es/precios/todo-incluido/page.tsx`
- `app/(spanish)/es/privacidad/page.tsx`

Some of these are low-risk static/legal pages. The high-value adoption work is
not legal copy; it is portfolio, pricing, services, areas, contact, guides, case
studies, and interactive tools.

## Repeated Markup Signals

Counts from `app/**/*.tsx` and `components/**/*.tsx`:

- `rounded-xl border`: 118 occurrences across 36 files.
- `rounded-lg border`: 288 occurrences across 104 files.
- `border-[#ddd4c8]`: 530 occurrences across 118 files.
- `bg-[#fbf6ef]`: 311 occurrences across 111 files.
- `bg-[#f6f1ea]`: 187 occurrences across 125 files.
- `data-section=`: 26 occurrences across 15 files.
- `data-cta=`: 17 occurrences across 11 files.

Interpretation: the design language is repeated widely, but analytics attribution
markers are much less common than visual card markup. Future continuation work
should close that gap.

## Proposed Next PR

Create a small enforcement/adoption PR before more content work:

1. Add an `.ai/service-page-template.md` for Esteban contributors and AI agents:
   use `ServiceCraft`, `ServiceFaqs`, `ServiceRelated`,
   `buildServiceFaqSchema`, `data-section`, and `data-cta`; do not invent
   claims.
2. Add a deterministic test that fails when new `app/**/page.tsx` files contain
   high-density hand-rolled card markup without importing Rail/common components
   or using an approved shared renderer.
3. Convert one high-traffic hand-rolled surface, preferably
   `/services/yacht-hospitality-video-fort-lauderdale` or `/portfolio`, as the
   migration model.
4. If the conversion needs a component not present in Rail, add it to
   `gonzaloeaguilar-bot/rail-kit`, sync it into Esteban, and use it in the same
   PR.

