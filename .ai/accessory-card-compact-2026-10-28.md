# Compact Camera Bench accessory card

## Owner correction

The homepage phone-mount panel is too large, text-heavy, and visually empty. It should read as a compact equipment preview, closer to the small product cards on The Great Reviewer than a two-column editorial feature.

## Scope

- Keep the verified Syncwire product image and existing, source-bounded explanation.
- Make the closed card compact: 358 by 168 px at the checked 390 px phone viewport and no wider than 660 px on the checked desktop viewport.
- Show the product image immediately, a short label, a short title, and one clear native disclosure control.
- Put explanatory copy in the existing native `details` panel so the default state does not compete with the Camera Bench cards or contact path.

## Acceptance

- The focused component test, TypeScript, rail checks, production build, and diff check pass.
- At 390 by 844 and 1440 by 900, the product is fully visible, the card is compact, and opening its plus control exposes the sourced explanation.
- The change does not alter external destinations, analytics semantics, or the existing Camera Bench cards.
