# Camera Bench unboxing video repair

## Brief

A visitor on the mobile homepage taps the Sony Alpha 7 IV unboxing card expecting the video that its label promises. The existing card instead opens a short text disclosure. The repair retains the established Camera Bench composition and uses the already owner-supplied Sony unboxing MP4. On tap, the disclosure must reveal a native, controllable video with the existing still as its poster. English and Spanish copy must state the action truthfully. This is a local repair, not a new visual direction.

## Evidence

- `curl -sSL https://estebanmorenomedia.com/` returned the `Open the unboxing` card, a still `/portfolio/sony-a7iv-unboxing.png`, and only a text disclosure.
- `git show origin/main:components/camera-kit-method.tsx` contained no video source or player for that card.
- Commit `a7601f29` contains the owner-supplied `/portfolio/sony-a7iv-unboxing.mp4`; `ffprobe` reports a valid media file.

## Acceptance

1. Tapping the Camera Bench unboxing control exposes a native video player on 390×844 and desktop, with controls, inline playback and the existing image as poster.
2. The raw initial HTML includes the MP4 source and truthful English/Spanish text.
3. The control remains keyboard operable and reduced-motion does not auto-start the player.
4. Focused tests, lint, typecheck and build pass; an independent rendered review occurs before release.
