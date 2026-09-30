import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * The gate that reviews Esteban's work has to be trustworthy in both
 * directions: it must catch the two dangerous things, and it must NOT flag the
 * rest of the codebase at him.
 *
 * Its first version walked the whole tree and reported 60+ findings in files
 * nobody had touched. On a first push that would have rewritten twenty files
 * and produced an unreviewable diff. A gate that flags the past punishes the
 * person who showed up today, and it gets switched off within a week.
 */

const ROOT = process.cwd();
const script = join(ROOT, "scripts/esteban-qa.mjs");

function runOn(source: string) {
  const dir = mkdtempSync(join(tmpdir(), "qa-"));
  try {
    execFileSync("git", ["init", "-q"], { cwd: dir });
    execFileSync("git", ["config", "user.email", "t@t.t"], { cwd: dir });
    execFileSync("git", ["config", "user.name", "t"], { cwd: dir });
    execFileSync("mkdir", ["-p", join(dir, "components"), join(dir, "app")]);
    writeFileSync(join(dir, "components/.keep"), "");
    execFileSync("git", ["add", "-A"], { cwd: dir });
    execFileSync("git", ["commit", "-qm", "base"], { cwd: dir });
    execFileSync("git", ["branch", "-M", "base"], { cwd: dir });
    execFileSync("git", ["checkout", "-qb", "work"], { cwd: dir });
    writeFileSync(join(dir, "components/nuevo.tsx"), source);
    execFileSync("git", ["add", "-A"], { cwd: dir });
    execFileSync("git", ["commit", "-qm", "cambio"], { cwd: dir });
    let status = 0;
    try {
      execFileSync("node", [script, "--check"], { cwd: dir, env: { ...process.env, QA_BASE: "base" } });
    } catch (error: unknown) {
      status = (error as { status?: number }).status ?? 1;
    }
    return { status, report: readFileSync(join(dir, "esteban-qa-report.md"), "utf8") };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

describe("esteban qa", () => {
  it("blocks a price typed into a page", () => {
    const { status, report } = runOn(`export function A(){return <p>Desde $250 por proyecto</p>;}`);
    expect(status).toBe(1);
    expect(report).toContain("precio escrito a mano");
  });

  it("blocks a client's private rate ladder", () => {
    const { status, report } = runOn(
      `export function A(){return <ul><li>$150</li><li>$190</li><li>$225</li></ul>;}`,
    );
    expect(status).toBe(1);
    expect(report).toContain("tarifa privada");
  });

  it("reports missing analytics WITHOUT blocking, because it fixes them", () => {
    const { status, report } = runOn(`export function A(){return <a href="/x">Ir</a>;}`);
    expect(status).toBe(0);
    expect(report).toContain("analítica");
  });

  it("says nothing at all when the change touches no page", () => {
    const { status, report } = runOn(`export const A = 1;`);
    expect(status).toBe(0);
    expect(report).toMatch(/analítica|orden/);
  });

  it("only ever looks at what this branch changed", () => {
    // The whole design rests on this: the report names one file, never the tree.
    const { report } = runOn(`export function A(){return <p>Desde $250</p>;}`);
    expect(report).toContain("components/nuevo.tsx");
    expect(report).not.toContain("packages-section");
  });
});
