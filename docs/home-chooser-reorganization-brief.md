# Home chooser reorganization — 2026-10-23

## Visitor and purpose

Spanish-first business owner or real-estate agent arriving on the homepage. They should recognize how they buy help before reading package detail: edit footage already recorded, publish consistently each month, bring production to their location, or market properties.

## Current friction and evidence

`lib/packages.ts` defines four packages: Arranque is remote editing, Crecimiento is a monthly social plan with editing, Presencia Local is on-location production plus editing, and Todo Incluido is a broader digital package. `lib/chooser-lane-pricing.ts` currently combines Crecimiento and Presencia Local as one `local-business` choice, while Arranque is shown as `Desde $100/video`. This makes the price look like the whole editing offer and hides the monthly versus on-location decision.

## Composition and interaction

Keep the existing Esteban camera scene and its optional focus animation. Replace the three recurring chooser stops with four short, outcome-first paths:

1. Inmobiliaria — plans from $450/mes.
2. Editar material que ya grabé — Arranque from $100/video.
3. Publicar cada mes — Crecimiento from $640/mes.
4. Grabar en mi negocio — Presencia Local at its canonical starting price.

The primary paths use compact two-column stops on phone. Selecting one reveals a single corresponding package card; real estate keeps its three plan cards. “¿Necesitas algo puntual?” remains a quieter, separate entry that groups project-specific services behind native details. All package information stays in server-rendered HTML.

## Acceptance

- Canonical package names and prices are visible in the chooser without confusing a per-video edit floor with monthly or on-site offers.
- Phone 375×600 and 390×844, plus desktop, show no horizontal overflow; touch controls are usable.
- The current camera identity, no-JS readable content, bilingual parity and reduced-motion behavior remain intact.
- Focused tests, lint, typecheck, production build, analytics gate and independent visual review pass before merge consideration.
