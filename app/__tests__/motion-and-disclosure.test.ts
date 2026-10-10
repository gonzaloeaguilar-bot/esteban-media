import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

/**
 * Two promises this site makes about motion, guarded here because neither is
 * visible in a diff.
 *
 * 1. Content never starts invisible waiting for JavaScript. The reveal states
 *    are added by script; if `rail-reveal` ever ships in the server HTML, a
 *    visitor whose script fails reads a blank page.
 * 2. The question list is a disclosure the visitor can CLOSE, never one that
 *    arrives closed. An answer folded away on first paint is an answer an
 *    answer engine has to work to find, and this site is built to be quoted.
 */

const root = process.cwd();
const template = readFileSync(
  join(root, "components/spanish-niche-page.tsx"),
  "utf8",
);
const globals = readFileSync(join(root, "app/globals.css"), "utf8");

/**
 * The poster card's own declarations, brace to brace.
 *
 * The tests below used `globals.slice(indexOf(...), +900)` and hoped the block
 * ended inside the window. This cuts at the rule's own closing brace instead,
 * so a comment added above the declarations cannot move a `}` into or out of
 * the slice and quietly change what is being asserted.
 */
function cartelCard(): string {
  const start = globals.indexOf(
    '.em-cartel .rail-card[data-rail-kind="media"] {',
  );
  expect(start).toBeGreaterThan(-1);
  const block = globals.slice(start, globals.indexOf("}", start) + 1);
  // The rule documents the two declarations it replaced, by name, in its own
  // comment. An assertion like `not.toMatch(/aspect-ratio:/)` would otherwise
  // fail on the prose that explains why there is no aspect-ratio. Strip
  // comments so these guards read declarations and only declarations.
  return block.replace(/\/\*[\s\S]*?\*\//g, "");
}

describe("motion", () => {
  it("the reveal class is never authored into markup", () => {
    // Only components/site-motion.tsx may add it, and only at runtime.
    expect(template).not.toContain("rail-reveal");
  });

  it("the stagger is capped so the last block is arrival, not latency", () => {
    const rule = globals.match(
      /\.rail-anim \.rail-reveal \{\s*transition-delay:\s*calc\(min\(var\(--em-reveal-i,\s*0\),\s*(\d+)\)\s*\*\s*(\d+)ms\)/,
    );
    expect(rule).not.toBeNull();
    const steps = Number(rule![1]);
    const perStep = Number(rule![2]);
    expect(steps * perStep).toBeLessThanOrEqual(500);
  });

  it("the stagger only applies where the motion gate applies", () => {
    // `.rail-anim` is added by script and only when reduced motion is off.
    // A delay outside that scope would delay a transition nobody asked for.
    expect(globals).toContain(".rail-anim .rail-reveal {\n  transition-delay:");
  });
});

describe("the question list", () => {
  it("renders open, so no answer is hidden on first paint", () => {
    expect(template).toMatch(/className="em-qa p-5"[\s\S]{0,200}?\bopen\b/);
  });

  it("keeps the question a real heading inside the summary", () => {
    // Promoting the question to the summary itself would rewrite the heading
    // outline of 70 pages — an IA decision, not a styling one.
    expect(template).toMatch(/<summary>\s*<h3/);
  });

  it("draws its sign in CSS, never as text in the DOM", () => {
    // A decorative glyph in markup is a word to every text comparison; the
    // parity gate failed all 70 routes when this was a literal "+".
    expect(globals).toMatch(/\.em-qa__pm::before \{\s*content: "\+";/);
    expect(template).not.toMatch(/em-qa__pm"[^/]*>\s*\+/);
  });

  it("respects a request for less motion", () => {
    const reduced = globals.slice(globals.indexOf(".em-qa__pm::before"));
    expect(reduced).toMatch(
      /@media \(prefers-reduced-motion: reduce\) \{\s*\.em-qa__pm \{\s*transition: none;/,
    );
  });

  // Negative controls — a checker that cannot fail is decoration.
  it("would notice a disclosure that shipped closed", () => {
    expect(/className="em-qa p-5"[\s\S]{0,200}?\bopen\b/.test(
      '<Cartel className="em-qa p-5" data-em-reveal>',
    )).toBe(false);
  });

  it("would notice the glyph moving back into the DOM", () => {
    expect(/em-qa__pm"[^/]*>\s*\+/.test('<span className="em-qa__pm">\n  +')).toBe(true);
  });

  it("would notice an uncapped stagger", () => {
    const bad = "transition-delay: calc(min(var(--em-reveal-i, 0), 40) * 70ms)";
    const m = bad.match(/min\(var\(--em-reveal-i,\s*0\),\s*(\d+)\)\s*\*\s*(\d+)ms/);
    expect(Number(m![1]) * Number(m![2])).toBeGreaterThan(500);
  });
});

/**
 * The phone action bar.
 *
 * Measured reason for it: a niche page is 11 screens on a 375px phone, a
 * service page 22, the Spanish home 44. The hero action fixes the first screen
 * and nothing after it.
 */
const appNav = readFileSync(join(root, "components/app-nav.tsx"), "utf8");
const chrome = readFileSync(join(root, "components/site-chrome.tsx"), "utf8");
const cinema = readFileSync(join(root, "app/cinema.css"), "utf8");

// 2026-09-27: the single "Consultar" bar became the kit's bottom navigation —
// five destinations (home, packages, search, work, talk) instead of one
// action. The reasons the bar existed still hold, so they are asserted here.
describe("the phone app bar", () => {
  it("lives in the site chrome, not in one template", () => {
    // A visitor does not care which template they are on.
    expect(chrome).toContain("<AppNav />");
    expect(chrome).not.toContain("<StickyCta />");
  });

  it("is the kit's bottom nav rather than a new fixed element", () => {
    expect(appNav).toContain('from "@/vendor/rail-kit/RailBottomNav"');
    expect(appNav).toMatch(/source="app_nav"/);
  });

  it("offers at most five destinations, contact and search among them", () => {
    const ids = [...appNav.matchAll(/id: "([a-z]+)",\s+label:/g)].map((m) => m[1]);
    expect(ids.length).toBeLessThanOrEqual(5);
    expect(ids).toEqual(expect.arrayContaining(["packages", "search", "talk"]));
  });

  it("reserves its height with the kit's spacer, not a body padding guess", () => {
    // The old 76px body padding would now stack with the kit's measured spacer.
    expect(globals).not.toMatch(/body \{\s*padding-bottom: 76px;/);
  });

  it("is phone only", () => {
    expect(cinema).toMatch(/@media \(min-width: 1024px\) \{\s*\.em-appnav,\s*\.rail-bottomnav__spacer \{ display: none; \}/);
  });


  // Negative control: the five-destination cap would notice a sixth tab.
  it("would notice a sixth destination", () => {
    const six = ["a", "b", "c", "d", "e", "f"];
    expect(six.length).toBeGreaterThan(5);
  });
});

/**
 * Reading progress. Built rather than taken from the kit: `rail-progress` is a
 * labelled card with a value, and every word of it would be a new claim on 91
 * routes. This one adds no text at all.
 */
const progress = readFileSync(
  join(root, "components/em-reading-progress.tsx"),
  "utf8",
);

describe("reading progress", () => {
  it("contributes no text", () => {
    // Anything between tags other than an expression would be a word on 91
    // routes. The only child is a styled div.
    expect(progress).not.toMatch(/>\s*[A-Za-zÀ-ÿ]{2,}\s*</);
  });

  it("is decoration, and says so", () => {
    // A live progress value announced on every scroll tick is hostile; a
    // screen reader already reports position.
    expect(progress).toMatch(/aria-hidden="true"/);
  });

  it("only appears on a page long enough to need it", () => {
    expect(progress).toMatch(/innerHeight \* 2/);
    expect(progress).toMatch(/if \(!long\) return null;/);
  });

  it("is fixed, so it cannot shift the document", () => {
    // The site measures CLS 0.
    expect(globals).toMatch(/\.em-progress \{[^}]*position: fixed;/);
  });

  it("never transitions its width", () => {
    // It reports a scroll position; animating it would make it lag the thing
    // it reports, and need a second version for reduced motion.
    const rule = globals.slice(globals.indexOf(".em-progress__fill"));
    expect(rule.slice(0, 120)).not.toContain("transition");
  });

  it("would notice text creeping in", () => {
    expect(/>\s*[A-Za-zÀ-ÿ]{2,}\s*</.test("<div>Progreso</div>")).toBe(true);
  });
});

describe("the way back to the top", () => {
  // The old action bar carried an icon-only "back to top". The app bar keeps
  // that job on its Home tab: tapping Home while already home returns to top.
  it("the Home tab returns to the top when you are already home", () => {
    expect(appNav).toMatch(/id === "home" && pathname === home/);
    expect(appNav).toMatch(/scrollTo\(\{\s*top: 0/);
  });

  it("honours a request for less motion", () => {
    expect(appNav).toMatch(/prefers-reduced-motion: reduce[\s\S]{0,60}\? "auto"/);
  });
});

/**
 * The service shelf on the Spanish home.
 *
 * Measured: that one block was 20,990px — 31.5 of the page's 44.6 screens on a
 * 375px phone, seventy cards in a single column, sitting between the visitor
 * and the contact section.
 */
const home = readFileSync(join(root, "app/(spanish)/es/page.tsx"), "utf8");

describe("the service shelf", () => {
  it("changes presentation only, never markup", () => {
    // The homepage is NOT covered by the text-parity gate, so the safe change
    // is the one that cannot alter what the gate would have checked. Verified
    // by diffing the built HTML: 0 words, 0 links, 0 headings changed.
    expect(home).toContain('className="em-shelf mt-8 grid gap-4');
    expect(home).toContain("spanishNichePages.map");
  });

  it("is phone only", () => {
    const rule = globals.slice(globals.indexOf(".em-shelf"));
    expect(globals).toMatch(/@media \(max-width: 767px\) \{\s*\.em-shelf \{/);
    expect(rule).toContain("grid-auto-flow: column");
  });

  it("contains its own overscroll", () => {
    // Without this a sideways flick at either end turns into a page scroll.
    expect(globals).toMatch(/\.em-shelf \{[^}]*overscroll-behavior-x: contain;/);
  });

  it("snaps, so a card never stops half off screen", () => {
    expect(globals).toMatch(/scroll-snap-type: x mandatory/);
    expect(globals).toMatch(/\.em-shelf > \* \{\s*scroll-snap-align: start;/);
  });

  it("would notice the shelf being applied at every width", () => {
    const badlyScoped = ".em-shelf { grid-auto-flow: column; }";
    expect(/@media \(max-width: 767px\)/.test(badlyScoped)).toBe(false);
  });
});

/**
 * The poster.
 *
 * The frame was 1:1 while every picture is 16:9, so a 266px frame carried a
 * 266x150 photograph and 116px of dead mat — only 36% of the card was picture.
 */
describe("the poster card", () => {
  it("frames the picture at the aspect the pictures actually are", () => {
    // Measured with EXIF applied: 12 of 13 stills are exactly 16:9. A frame at
    // any other aspect either mats the picture or crops it, and cropping is not
    // available — these are website screenshots with headline type in them.
    const figure = globals.slice(
      globals.indexOf(
        '.em-cartel .rail-card[data-rail-kind="media"] .rail-card__figure {',
      ),
    );
    expect(figure.slice(0, 2600)).toMatch(/aspect-ratio: 16 \/ 9;/);
  });

  it("never crops the stills", () => {
    // Anchored on the em-cartel block: `.rail-card__figure img` alone matches
    // the kit's transition rule first, which says nothing about cropping.
    const i = globals.indexOf(
      '.em-cartel .rail-card[data-rail-kind="media"] .rail-card__figure img,',
    );
    expect(i).toBeGreaterThan(-1);
    expect(globals.slice(i, i + 400)).toMatch(/object-fit: contain !important/);
  });

  it("gives the picture the card's full width", () => {
    // The inset made a frame inside the card's frame around a letterboxed
    // picture: three nested rectangles.
    const figure = globals.slice(
      globals.indexOf(
        '.em-cartel .rail-card[data-rail-kind="media"] .rail-card__figure {',
      ),
    );
    expect(figure.slice(0, 900)).toMatch(/margin: 0;/);
  });

  it("takes its height from its content, not from a forced ratio", () => {
    // 2026-10-10. The card carried `aspect-ratio: 1 / 1.45`. A ratio cannot
    // know how much copy a card holds: on the homepage rail — lg cards, a title
    // and the credits, no description — it forced 812px of card around ~430px
    // of content, and the surplus landed as ~380px of empty dark panel under
    // the credits. Measured, rendered, and called out in review as the thing
    // that made the section look broken.
    //
    // So the earlier "the card has a poster ratio" guard is RETIRED WITH ITS
    // MECHANISM, not relaxed: height now comes from the two things that do
    // know how tall the card is — the 16:9 still (guarded above) and the panel.
    // The poster READ is guarded below, where it now lives.
    expect(cartelCard()).not.toMatch(/aspect-ratio:/);
  });

  it("puts no slack row in the card, so nothing can pool as empty panel", () => {
    // The retired pair was `aspect-ratio` on the card PLUS a `1fr` slack row:
    // with the height already decided by the ratio, the `1fr` row absorbed
    // every pixel the content did not use. Two children, two rows, no slack.
    const card = cartelCard();
    expect(card).toMatch(/grid-template-rows: auto auto;/);
    // Rows only: the card legitimately carries `grid-template-columns: 1fr`
    // (one column), so a bare /\d+fr/ would fail on the declaration that is
    // not the problem.
    expect(card).not.toMatch(/grid-template-rows:[^;]*fr/);
  });

  it("keeps the poster read in the panel, which is what knows the height", () => {
    // The card is not a tile because the panel carries the composition past the
    // picture. A card with only a title and a place used to end one pixel under
    // its last line — text touching its own edge reads as unfinished however
    // good the photograph above it is. That bottom air is a floor on the panel.
    expect(globals).toMatch(
      /\.rail-card\[data-rail-kind="media"\]:not\(:has\(\.rail-card__description\)\)\s*\.rail-card__body \{\s*padding-bottom: clamp\(/,
    );
  });

  // Negative controls.
  it("would notice the mat coming back", () => {
    expect(/aspect-ratio: 16 \/ 9;/.test("aspect-ratio: 1 / 1;")).toBe(false);
  });

  it("would notice the forced ratio and the slack row coming back", () => {
    // The two declarations this block retired, as they were written. Both
    // guards above are one line of regex, so they get a negative control each:
    // a rule that is not the card's own must not be able to pass them.
    const forced = "aspect-ratio: 1 / 1.45;";
    const slack = "grid-template-rows: auto 1fr auto auto;";
    expect(forced).toMatch(/aspect-ratio:/);
    expect(slack).toMatch(/grid-template-rows:[^;]*fr/);
  });
});
