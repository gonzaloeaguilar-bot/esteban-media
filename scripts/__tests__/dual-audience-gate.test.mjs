import { describe, expect, it } from "vitest";

import { analyse, verdict } from "../dual-audience-gate.mjs";

/**
 * The gate exists because this property was mis-measured three times in one
 * session. These tests pin the measurement itself, not the pages.
 */
describe("dual-audience gate", () => {
  const section = (words) => `<p>${"palabra ".repeat(words)}</p>`;

  it("passes a page built as citable units", () => {
    const html = `<h1>t</h1><h2>¿Qué incluye?</h2>${section(140)}<h2>¿Cuánto cuesta?</h2>${section(130)}`;
    expect(verdict(analyse(html))).toEqual([]);
  });

  it("fails a page of thin sections, which is the real English-side defect", () => {
    const html = `<h1>t</h1><h2>¿Qué incluye?</h2>${section(60)}<h2>¿Cuándo?</h2>${section(70)}`;
    expect(verdict(analyse(html))).toContain("only 0 section(s) in the 100-180 word band");
  });

  it("counts a section under an h3, not just an h2", () => {
    // Splitting on h2 alone lumps every h3 subsection into one block and
    // reports a 615-word monolith that does not exist on the page.
    const html = `<h1>t</h1><h2>Guía</h2><h3>¿Qué incluye?</h3>${section(140)}<h3>¿Cuánto cuesta?</h3>${section(130)}`;
    const m = analyse(html);
    expect(m.sections).toBe(3);
    expect(m.inBand).toBe(2);
    expect(verdict(m)).toEqual([]);
  });

  it("ignores script and style bytes when sizing a section", () => {
    const noise = `<script>${"x ".repeat(500)}</script><style>${"y ".repeat(500)}</style>`;
    const html = `<h1>t</h1>${noise}<h2>¿Qué incluye?</h2>${section(140)}<h2>¿Cuánto?</h2>${section(130)}`;
    expect(verdict(analyse(html))).toEqual([]);
  });

  it("does not credit a <details> count as structure", () => {
    // Counting <details> was the first proxy that misled. A page can be all
    // disclosure and still have nothing citable in it.
    const html = `<h1>t</h1><h2>Servicios</h2><details><summary>a</summary>${section(20)}</details>`;
    const m = analyse(html);
    expect(m.details).toBe(1);
    expect(verdict(m).length).toBeGreaterThan(0);
  });

  it("flags a missing h1, which is what a raw-HTML failure looks like", () => {
    const html = `<h2>¿Qué incluye?</h2>${section(140)}<h2>¿Cuánto?</h2>${section(130)}`;
    expect(verdict(analyse(html))).toContain("no <h1> in raw HTML");
  });
});
