import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const hero = readFileSync(join(process.cwd(), "components/hero-video.tsx"), "utf8");
const cinema = readFileSync(join(process.cwd(), "app/cinema.css"), "utf8");

describe("homepage How it works disclosure", () => {
  it("ships a scannable three-step process in both languages", () => {
    expect(hero).toContain('className="em-cine-caption__steps"');
    expect(hero).toContain("Send your footage or idea");
    expect(hero).toContain("Choose how to start");
    expect(hero).toContain("Confirm the scope");
    expect(hero).toContain("Comparte tu material o idea");
    expect(hero).toContain("Elige cómo empezar");
    expect(hero).toContain("Confirma el alcance");
  });

  it("uses numbered rows, not the old body paragraph and chip collection", () => {
    expect(hero).toContain("em-cine-caption__step-number");
    expect(hero).not.toContain("em-cine-caption__body");
    expect(hero).not.toContain("em-cine-caption__facts");
    expect(cinema).toContain(".em-cine-caption__steps li");
    expect(cinema).toContain(".em-cine-caption__step-number");
  });
});
