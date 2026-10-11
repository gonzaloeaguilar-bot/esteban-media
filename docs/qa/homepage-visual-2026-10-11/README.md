# Homepage visual check — 2026-10-11

Scope: English `/` and Spanish `/es`, from merged `main` commit `c17fd51`.
The public site still showed the earlier audience/reel/plans ordering when this
check began. These images compare the merged homepage before this repair with
the repaired local build, both in Chromium at 390 × 844 with reduced motion.

| State | Before | After |
| --- | --- | --- |
| English first project | [before](en-before-first.jpg) | [after](en-after-first.jpg) |
| English last project | [before](en-before-last.jpg) | [after](en-after-last.jpg) |
| Spanish first project | [before](es-before-first.jpg) | [after](es-after-first.jpg) |
| Spanish last project | Earlier screenshot unavailable | [after](es-after-last.jpg) |

## Reproduced issues and repairs

- The first property card used `listing-opener`, whose poster visibly showed a
  blurred foreground sign. The card now selects the existing verified
  `waterfront-tower-aerial` reel and its sharp architectural poster.
- The last card used `healthy-smile`, a vertical image embedded in a wide poster;
  the rail displayed black side bands. It now uses the existing published
  `diana-jack` event film, a true landscape poster. Both language versions use
  the same source records and preserve their portfolio destinations.
- The hero's secondary action had a 26px-high target on phones; the six review
  selectors were 24 × 24px; the Google source link was 15px high. On this
  homepage they now measure 44px, 40 × 40px, and 44px respectively.
- The visible intro Skip control was inside a parent with `aria-hidden="true"`,
  so it was absent from the accessibility tree. The animated content remains
  decorative and the Skip button is exposed. It dismissed the intro in both
  languages. Reduced motion omitted the intro in both languages.
- The first short choice promised filming but linked to an ideas guide. It now
  says “Edit a property Reel” / “Editar un Reel inmobiliario” and opens the
  corresponding real estate editing service page.

## Measured local boundary

Chromium checked 375 × 667, 390 × 844, 768 × 1024 and 1440 × 900 for both
languages. `documentElement.scrollWidth === innerWidth` at every size. The work
rail reached first, middle and last cards on phones and tablet; all three fit
at 1440px. The optional detail opened and retained the plan text. Mobile
navigation remained present after scrolling. This checks a browser simulation;
physical iPhone and Safari appearance are pending.

`pnpm check` passed on this branch, including lint, TypeScript, 1,576 tests,
build, and the 97-route text parity check. The analytics gate passed. The
Antigravity review was dispatched through the CTO gate with this rendered
package; the provider returned `RESOURCE_EXHAUSTED` before a review, and its
evidence directory contained no output. Independent craft review remains open.
