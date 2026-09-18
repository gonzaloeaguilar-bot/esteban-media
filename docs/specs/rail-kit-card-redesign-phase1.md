# Spec — Esteban Moreno Media: card/cartel redesign, phase 1

**Problem (measured on production, 2026-09-18).** The pages rank but read as walls
of text. Live HTTP + tag counts:

| Page | words | `<p>` | `<h2>` | `<li>` | `<img>` |
| --- | --- | --- | --- | --- | --- |
| `/es/videografo-en-miami` | 559 | 16 | 11 | 55 | **0** |
| `/es/video-inmobiliario-coral-gables` | 419 | 13 | 11 | 53 | **0** |
| `/services` | 1347 | 34 | 15 | 113 | **0** |
| `/areas` | 1132 | 29 | 14 | 104 | **0** |
| `/guides` | 1858 | 47 | 6 | 45 | **0** |
| `/portfolio` | 2907 | 114 | 20 | 45 | 8 |

The paragraphs are short; that is not the defect. The defect is that a page is
eleven headings and fifty-five bullets in identical cream boxes with **no visual
object anywhere on it** — nothing to look at, no scale change, no point of
interest, no card that reads as a card. Section 1 of
`~/obsidian-wiki/gonzalo-tech/wiki/reglas-de-componentes-tarjetas-y-ctas.md`:
"una tarjeta plana está muerta" and "cada tarjeta necesita un punto de interés,
o es una caja con texto". Every box on these pages is a box with text.

**Goal.** Present the same words through the shared card/cartel component
language already built for `danielzea-site` and the Geebs sites — `rail-kit` —
so a human can scan a page, while the SEO/GEO strategy is untouched.

## Hard constraint: nothing textual may change

This is a **presentation-layer** change.

- No copy is rewritten, shortened, added or deleted. Every string that renders
  today renders after.
- No JSON-LD changes. No `metadata` changes. No canonical, hreflang, robots or
  sitemap changes. No route changes.
- Headings keep their level and their text. An `<h2>` stays an `<h2>`.
- Acceptance includes a **word-count and heading-parity gate** (below) that
  fails the build if a single word or heading is lost.

## Scope of phase 1

1. Vendor `rail-kit` into this repo.
2. Add the Esteban skin for it (tokens only).
3. Rebuild `components/spanish-niche-page.tsx` presentation — **70 pages**.

Phases 2 and 3 (guides/services/areas/case-studies, then extracting an English
niche template out of the ~65 hand-written `app/(english)/services/*/page.tsx`)
are separate dispatches and out of scope here.

## 1. Vendor rail-kit

Copy the recipe from `~/code/gainsfromgeebs-site`, which is the proven Next.js
consumer — do not invent a new layout:

- `vendor/rail-kit/` — copy the files actually used from `~/code/rail-kit/src/`
  (at minimum `Rail.tsx`, `RailCard.tsx`, `RailStats.tsx`, `RailFaq.tsx`,
  `RailBillboard.tsx`, `icons.tsx`, `index.ts`, `types.ts`, `rail.css`,
  `motion.css`). Add any other component you actually import; do not copy the
  whole kit.
- `rail-kit.lock.json` at the repo root — same shape as
  `~/code/gainsfromgeebs-site/rail-kit.lock.json`: upstream repo, the commit
  ref you copied from, `vendorPath`, and a sha256 per file.
- `scripts/sync-rail-kit.mjs` — copy from the Geebs repo. `--check` must run
  **offline** and verify the vendored copy against the lock.
- `package.json`: add `"rail-kit:check": "node scripts/sync-rail-kit.mjs --check"`.
- `app/globals.css`: `@import "../vendor/rail-kit/rail.css";` next to the
  existing Tailwind imports.

Do not modify `~/code/rail-kit` itself. Read `~/code/rail-kit/COORDINATION.md`
first — other sessions consume it, and a vendored consumer being behind is
deliberate, not a bug to fix.

## 2. The Esteban skin

One block in `app/globals.css`, tokens only — no layout, no behaviour — modelled
on the Geebs block at `~/code/gainsfromgeebs-site/app/globals.css` (search
`── Rails ──`). The brand is already in the codebase; take the values from it,
do not invent a palette:

- page `#f6f1ea`, ink `#101214`, body `#252a2d`, muted `#5a6066`
- card surface `#fbf6ef`, border `#ddd4c8`
- accent terracotta `#c84a2c`, light accent `#e85d3e`, deep `#9f3c27`
- headings use `var(--font-newsreader)` (already wired as `--font-serif`)

Rules that apply and are checked:

- **One identity, not two.** Do not add these tokens inside
  `@media (prefers-color-scheme: dark)`.
- **Never pair a colour literal with a token.** Every rail token is a literal in
  this one block or a `var()` of an existing token — never half of each. See
  `[[reference-a-color-literal-against-a-token-is-a-time-bomb]]`.
- **Contrast is measured, not assumed.** Terracotta `#c84a2c` on `#fbf6ef` is
  fine as a filled button but must be checked at small text sizes; if it fails
  AA at 13–14px, use the darker `#9f3c27` for eyebrow/meta/link tokens exactly
  as the Geebs block does for its red. Report the measured ratios.
- **Radius**: this is an editorial site — small radius, not app-like.
- **No `:hover` on anything that is not a link or a button.**

## 3. Rebuild the Spanish niche template

`components/spanish-niche-page.tsx` (1,395 lines) renders 70 routes. Keep the
data, the `nicheLinkContext` map, `buildSpanishNicheMetadata` and the JSON-LD
exactly as they are. Change only what is returned.

Map content to components:

| Today | Becomes |
| --- | --- |
| hero + a bordered box with two `<dt>/<dd>` | hero keeps its `h1` and lead; the side box becomes a **stat cartel** (`kind: "stat"`) — keyword and zone as figures with a point of interest, not a definition list |
| `page.sections[]`: `h3` + prose + a bulleted box | each section keeps its `h3` and prose as reading text; the bullet box becomes a **card** per bullet group, not a 55-item list |
| the 4-up dark services grid | a **rail** of service cards |
| "proyectos" two-up links | a **media rail** using the portfolio stills that already exist under `public/` — if a project has no image, use the text card shape, never an empty media card |
| FAQ boxes | `RailFaq` (or the kit's disclosure), keeping question text as the same heading level it has today |
| closing contact block | the kit's CTA/sticky-bar treatment |

Rules from the vault doc that are non-negotiable here:

- **Every card fills every slot of its shared component.** A card shape with a
  description slot means *all* cards of that shape carry a description, or the
  rest look half-built. If a variant has nothing for a slot, use a different
  shape.
- **The page needs one moment of scale.** These pages open at `text-5xl` and
  never rise again. Give the page one figure or one line at a real size.
- **The primary action must sit inside the first viewport, checked against
  window HEIGHT, not width**, at 375×667 — not only at 844.
- **A CTA names the value, not the tool.** Existing CTA strings stay as they are
  (copy is frozen); if one names a channel, note it in the PR for a later copy
  pass — do not rewrite it here.
- **Phone.** The vault rule is not to promote phone calls. The template
  currently renders a `Phone` CTA. Copy is frozen in this phase: leave it, and
  flag it in the PR body as a phase-2 copy decision for Gonzalo.
- **Two carousels back to back in one section get merged into one.**
- **Animation is additive.** Content never starts invisible waiting on JS.
- **`object-fit`**: measure the real aspect ratio of the image files before
  choosing a card ratio. Which axis `cover` crops is decided by comparing the
  BOX ratio to the PHOTO ratio; the other axis does nothing.

## Acceptance — every command must pass

Run from the worktree root. `--acceptance` is the first command; the rest are
run and reported in the PR body.

1. `pnpm rail-kit:check` — vendored copy matches the lock, offline.
2. `pnpm test` — the existing vitest suite, unchanged and green.
3. `pnpm lint`
4. `pnpm build` — all 171 routes build.
5. **Text-parity gate (new, committed as a test).** For all 70 Spanish niche
   routes, render before and after and assert:
   - the multiset of visible words is unchanged (normalise whitespace),
   - the ordered list of `h1/h2/h3` text is unchanged,
   - the set of `href`s is unchanged,
   - the JSON-LD blobs are byte-identical.
   The gate **carries a negative control**: a fixture with one word removed that
   the gate must flag. Without the control a broken gate reports "all clear".
   See `[[feedback-run-the-negative-control-or-the-test-is-decoration]]`.
6. **Screenshots at 320, 375×667 and 1440**, for at least three routes of
   different shapes. 375×667 is mandatory, not 844 — the small phone is where
   the hero broke last time. Attach them.
7. **No horizontal overflow**: find which element propagates `scrollWidth`
   without clipping; a rail overflows by design and does not count.
8. **Contrast measured**, reported as ratios, for eyebrow, meta, link and CTA
   tokens at their real rendered sizes.
9. `git diff --stat` shows **no change** to any `app/**/page.tsx`, to
   `lib/site-metadata.ts`, `app/sitemap.ts` or `app/robots.ts`.

## How to verify (this is half the work)

- **Look at the screen.** A colour or layout change without a screenshot is not
  verified.
- **Measure the TEXT, not the block.** A `<p>`'s rect is always its column
  width; use a `Range` over the content.
- **Check the replacement landed.** A `str.replace()` with no match does not
  fail, it does nothing. Assert the anchor exists, then `grep` the built output.
- **Verify against the commit, not the disk.** A page can be perfect in the
  folder and broken in git if an imported file was not committed.
- **Read the component before adding rules to it.** rail.css has 279 custom
  properties and a deliberate grid; fighting it produces something worse than
  the problem.

## Constraints on the work itself

- Work only in this worktree, on branch `feat/rail-kit-card-redesign`.
- Never `git stash` — the stash stack is shared with other worktrees.
- Do not touch `~/code/esteban-media` (98 dirty files on an unrelated branch).
- Conventional commits. Open a PR; do not merge it.
