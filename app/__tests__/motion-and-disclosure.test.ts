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
const stickyCta = readFileSync(join(root, "components/em-sticky-cta.tsx"), "utf8");
const chrome = readFileSync(join(root, "components/site-chrome.tsx"), "utf8");

describe("the phone action bar", () => {
  it("lives in the site chrome, not in one template", () => {
    // A visitor does not care which template they are on.
    expect(chrome).toContain("<StickyCta />");
  });

  it("is built on the kit's stickybar rather than a new fixed element", () => {
    expect(stickyCta).toContain("rail-stickybar");
    expect(stickyCta).toContain("data-rail-visible");
  });

  it("never offers the page you are already on", () => {
    expect(stickyCta).toMatch(/const onDestination = pathname === href/);
  });

  it("falls back to the headline when a page has no hero action", () => {
    // /es/sobre-esteban has no hero action at all — its first is ~1,100px
    // down — so it is exactly the page that must not be skipped.
    expect(stickyCta).toMatch(/querySelector\("main h1"\)/);
  });

  it("is hidden from assistive tech and from tab order while off screen", () => {
    expect(stickyCta).toMatch(/aria-hidden=\{visible \? undefined : "true"\}/);
    expect(stickyCta).toMatch(/tabIndex=\{visible \? undefined : -1\}/);
  });

  it("reserves its height statically, so revealing it cannot shift layout", () => {
    // The site measures CLS 0. Adding the padding when the bar appears would
    // spend that; 76px of empty space below the footer costs nothing.
    expect(globals).toMatch(
      /@media \(max-width: 639px\) \{\s*body \{\s*padding-bottom: 76px;/,
    );
  });

  it("is phone only", () => {
    expect(globals).toMatch(
      /@media \(min-width: 640px\) \{\s*\.em-stickybar \{\s*display: none;/,
    );
  });

  it("reserves more height than the bar occupies", () => {
    // Measured bar height is 69px at 320, 375 and 390; the reserve is 76px.
    // This is a static approximation of a runtime fact — the real check lives
    // in the browser sweep, because this one cannot notice the bar growing.
    const reserve = Number(globals.match(/body \{\s*padding-bottom: (\d+)px;/)![1]);
    expect(reserve).toBeGreaterThan(69);
  });

  it("keeps its controls on one row", () => {
    // The kit's bar wraps. `width: 100%` on the action pushed it to a second
    // line, which grew the bar past the 76px reserve and covered the card
    // underneath. Every piece measured correctly on its own; only a screenshot
    // showed it, so the shape that caused it is pinned here.
    const rule = globals.slice(globals.indexOf(".em-stickybar__action {"));
    expect(rule.slice(0, 160)).not.toMatch(/width:\s*100%/);
    expect(rule.slice(0, 160)).toMatch(/flex: 1 1 auto/);
  });

  // Negative controls.
  it("would notice the destination guard being dropped", () => {
    expect(/const onDestination = pathname === href/.test("const onDestination = false")).toBe(false);
  });

  it("would notice a reserve smaller than the bar", () => {
    const bad = "body {\n  padding-bottom: 40px;";
    expect(Number(bad.match(/padding-bottom: (\d+)px/)![1])).toBeLessThan(69);
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
  it("is icon only, with an accessible name", () => {
    expect(stickyCta).toMatch(/aria-label="Volver arriba"/);
  });

  it("honours a request for less motion", () => {
    expect(stickyCta).toMatch(/prefers-reduced-motion: reduce[\s\S]{0,60}\? "auto"/);
  });

  it("survives on the page where the primary action is suppressed", () => {
    // The contact page is 11.9 screens; dropping the whole bar there would
    // remove a useful control to remove a useless one.
    expect(stickyCta).toMatch(/\{onDestination \? null : \(/);
  });
});
