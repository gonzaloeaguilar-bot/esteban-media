# Camera Bench swipe gallery brief

## Visitor and outcome

A phone visitor should meet one real, recognizable camera at a time, use a native horizontal swipe to reach the other body, and tap the displayed camera to inspect only manufacturer-published specifications. The scene is an exploration moment, not another services grid.

## Evidence

- Owner feedback in this chat: the current two-tile bench is not impressive enough; he wants the whole camera, touch interaction, and scrolling to the other camera.
- Production check on 2026-10-16: the current bench exposes two small paired cards with native details (`curl -sSL https://estebanmorenomedia.com/`).
- Both model names and facts are already source-bounded: Sony Alpha 7 IV / Canon EOS Rebel T5i and their manufacturer links.

## Composition and behavior

- Keep native page scrolling. Inside the Camera Bench, use one horizontal `scroll-snap` rail with large 86–90% width slides so the next camera is visibly waiting at the edge.
- One full camera body occupies each slide. The body is the visual subject; title, one short prompt, and tap control sit in a dark lower panel with breathing room.
- Each slide is a server-rendered native `<details>` disclosure. The two disclosures share a name so only one is open. The expandable source-bounded facts remain in the first HTML response.
- Use the existing manufacturer images only. Do not claim or fabricate a lens, audio kit, lighting kit, ownership, or production results.
- Motion is constrained to the selected camera image and inspect control; reduced-motion removes transitions.

## Acceptance

1. At 390×844 and 390×664, Sony is dominant, Canon visibly peeks at the right edge, and the section does not hide the method control behind blank space.
2. Horizontal finger/trackpad scroll reaches Canon without trapping normal vertical page scroll.
3. Tapping either camera opens its detail panel; opening Canon closes Sony.
4. Raw HTML contains both camera facts and sources without client-mounted text.
5. 375×600, 390×844 and desktop screenshots show readable camera name, full product image, intact source row, and no horizontal page overflow.
