import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * The negative control for scripts/text-parity.mjs.
 *
 * The parity script is what lets the niche-template redesign claim that 70
 * routes kept every word, heading, link and schema blob. A checker that has
 * never failed has not been shown to work: if it silently matched nothing it
 * would print the same cheerful line. Each case below breaks exactly one thing
 * and asserts the gate catches that specific thing.
 *
 * This runs the real script against throwaway HTML, so it needs no build.
 */

const SCRIPT = join(process.cwd(), "scripts/text-parity.mjs");

const page = ({
  words = "alpha bravo charlie",
  heading = "Servicios en Miami",
  href = "/es/contacto",
  schema = '{"@type":"Service","name":"Video"}',
  alt = "Fotograma del proyecto Bar Door Monkey",
  deep = "Detalle tecnico",
} = {}) => `<!doctype html><html><body>
  <script type="application/ld+json">${schema}</script>
  <h2>${heading}</h2>
  <h4>${deep}</h4>
  <img src="/x.jpg" alt="${alt}">
  <p>${words}</p>
  <a href="${href}">Escribir</a>
</body></html>`;

function build(html: string) {
  const dir = mkdtempSync(join(tmpdir(), "parity-"));
  mkdirSync(join(dir, "es"), { recursive: true });
  writeFileSync(join(dir, "es", "pagina.html"), html);
  return dir;
}

function run(buildDir: string, baseline: string) {
  try {
    const stdout = execFileSync(
      process.execPath,
      [SCRIPT, "check", buildDir, baseline],
      { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
    );
    return { code: 0, out: stdout };
  } catch (error) {
    const e = error as { status: number; stdout: string; stderr: string };
    return { code: e.status, out: `${e.stdout}${e.stderr}` };
  }
}

/** Snapshot `html`, then check `mutated` against that snapshot. */
function compare(html: string, mutated: string) {
  const baselineDir = build(html);
  const baseline = join(baselineDir, "baseline.json");
  execFileSync(process.execPath, [SCRIPT, "snapshot", baselineDir, baseline], {
    stdio: "ignore",
  });
  return run(build(mutated), baseline);
}

describe("text-parity gate", () => {
  it("passes when nothing changed — the control for the controls", () => {
    const result = compare(page(), page());
    expect(result.code).toBe(0);
    expect(result.out).toContain("keep every word");
  });

  it("passes when only the markup around the words changes", () => {
    // This is the whole point: a card is allowed to replace a bullet.
    const before = page();
    // No numeral in the markup: this case asserts that RESHAPING is free, and a
    // numeral would be a new word, which is a different thing the gate should
    // and does reject. That is why the real NumberedList draws its number with
    // a CSS counter instead of rendering one.
    const after = before.replace(
      "<p>alpha bravo charlie</p>",
      "<ol><li>alpha</li><li>bravo charlie</li></ol>",
    );
    expect(compare(before, after).code).toBe(0);
  });

  it("catches a single dropped word", () => {
    const result = compare(page(), page({ words: "alpha charlie" }));
    expect(result.code).toBe(1);
    expect(result.out).toContain("1 word(s) lost");
    expect(result.out).toContain("bravo");
  });

  it("catches one duplicate lost when the word still appears elsewhere", () => {
    // A set comparison passes this. Only a multiset catches it, and losing one
    // of three identical list items is exactly how a refactor loses content.
    const result = compare(
      page({ words: "alpha alpha alpha" }),
      page({ words: "alpha alpha" }),
    );
    expect(result.code).toBe(1);
    expect(result.out).toContain("1 word(s) lost");
  });

  it("catches a heading demoted to a lower level", () => {
    const before = page();
    const after = before.replace(
      "<h2>Servicios en Miami</h2>",
      "<h3>Servicios en Miami</h3>",
    );
    const result = compare(before, after);
    expect(result.code).toBe(1);
    expect(result.out).toContain("heading outline changed");
  });

  it("catches a dropped link", () => {
    const result = compare(page(), page().replace(/<a[^>]*>.*?<\/a>/, "Escribir"));
    expect(result.code).toBe(1);
    expect(result.out).toContain("link(s) lost");
  });

  it("catches an edited JSON-LD blob", () => {
    const result = compare(
      page(),
      page({ schema: '{"@type":"Service","name":"Fotografia"}' }),
    );
    expect(result.code).toBe(1);
    expect(result.out).toContain("JSON-LD changed");
  });

  it("catches a route that vanished from the build", () => {
    const baselineDir = build(page());
    const baseline = join(baselineDir, "baseline.json");
    execFileSync(process.execPath, [SCRIPT, "snapshot", baselineDir, baseline], {
      stdio: "ignore",
    });
    const empty = mkdtempSync(join(tmpdir(), "parity-empty-"));
    mkdirSync(join(empty, "es"), { recursive: true });
    const result = run(empty, baseline);
    expect(result.code).toBe(1);
    expect(result.out).toContain("disappeared from the build");
  });

  it("catches a blanked alt attribute", () => {
    // Found by probing the gate, not by reading it: the first version stripped
    // tags and threw every attribute away with them, so gutting an alt was
    // invisible. That is the worst possible blind spot for a change whose
    // entire point is putting pictures on the page.
    const result = compare(page(), page({ alt: "" }));
    expect(result.code).toBe(1);
    expect(result.out).toContain("alt/title/aria-label word(s) lost");
    expect(result.out).toContain("Monkey");
  });

  it("catches an h4 demoted to h5", () => {
    // Every word survives a demotion, so nothing but the heading pass can see
    // it — and the heading pass only covered h1-h3 at first.
    const before = page();
    const after = before.replace("<h4>Detalle tecnico</h4>", "<h5>Detalle tecnico</h5>");
    const result = compare(before, after);
    expect(result.code).toBe(1);
    expect(result.out).toContain("heading outline changed");
  });

  it("catches words ADDED, not only words lost", () => {
    // "Presentation only" is a two-sided claim. A template that starts saying
    // something the copy never said breaks it just as much as one that drops a
    // sentence.
    const result = compare(page(), page({ words: "alpha bravo charlie delta" }));
    expect(result.code).toBe(1);
    expect(result.out).toContain("word(s) added");
    expect(result.out).toContain("delta");
  });

  it("ships a baseline that actually covers the niche routes", () => {
    // A baseline of {} would let every check above pass vacuously in CI.
    const baseline = JSON.parse(
      readFileSync("app/__tests__/fixtures/spanish-niche-text-baseline.json", "utf8"),
    ) as Record<string, { words: string; headings: string[] }>;
    const routes = Object.keys(baseline);
    expect(routes.length).toBeGreaterThan(80);
    expect(routes).toContain("es/videografo-en-miami.html");
    for (const route of routes) {
      expect(baseline[route].words.length).toBeGreaterThan(0);
    }
  });
});
