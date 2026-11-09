import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(process.cwd());
const english = readFileSync(resolve(root, "app/(english)/guides/central-florida-footage-editing/page.tsx"), "utf8");
const spanish = readFileSync(resolve(root, "app/(spanish)/es/guias/edicion-remota-central-florida/page.tsx"), "utf8");
const contact = readFileSync(resolve(root, "app/(english)/contact/page.tsx"), "utf8");
const contacto = readFileSync(resolve(root, "app/(spanish)/es/contacto/page.tsx"), "utf8");

const sources = [
  "orlando-executive-footage",
  "winter-park-overflow-edit",
  "lake-nona-expert-footage",
  "kissimmee-bilingual-event-edit",
  "sanford-testimonial-edit",
];

describe("Central Florida supplied-footage experiment", () => {
  it("keeps all five city hypotheses attributable in both languages", () => {
    for (const source of sources) {
      expect(english).toContain(source);
      expect(spanish).toContain(source);
    }
  });

  it("allows contact briefs to preserve the city experiment source", () => {
    expect(contact).toContain("...CENTRAL_FLORIDA_CAPTURE_SOURCES");
    expect(contacto).toContain("...CENTRAL_FLORIDA_CAPTURE_SOURCES");
  });

  it("does not claim Central Florida filming coverage", () => {
    expect(english).toContain("does not require a local shoot");
    expect(english).toContain("does not imply medical, legal, or institutional production credentials");
    expect(spanish).toContain("no necesita una grabación local");
    expect(spanish).toContain("no implica credenciales médicas, legales ni institucionales");
  });
});
