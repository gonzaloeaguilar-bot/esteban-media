import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { metadata } from "../(english)/fort-lauderdale/page";
import { serviceAreas } from "../../lib/site";

// SEO/GEO audit 2026-10-10, finding 2: /fort-lauderdale returned 200 but its
// canonical, JSON-LD @id/url and OG url pointed at /areas/fort-lauderdale (a
// 404), its Spanish button linked to /es/areas/fort-lauderdale (also a 404) and
// nothing on the site linked to it.
describe("/fort-lauderdale is self-canonical and reachable", () => {
  const source = readFileSync(
    join(process.cwd(), "app/(english)/fort-lauderdale/page.tsx"),
    "utf8",
  );

  it("canonicalises to the served path", () => {
    expect(metadata.alternates?.canonical).toBe("/fort-lauderdale");
    expect((metadata.openGraph as { url?: string }).url).toBe(
      "https://estebanmorenomedia.com/fort-lauderdale",
    );
  });

  it("never points at the 404 paths", () => {
    expect(source).not.toMatch(/["`]\/(es\/)?areas\/fort-lauderdale/);
    expect(source).toContain('href="/es/videografo-en-fort-lauderdale"');
  });

  it("reads package prices from lib/pricing.ts instead of hard-coding them", () => {
    expect(source).not.toMatch(/\$\d/);
  });

  it("is linked from the /areas Fort Lauderdale card", () => {
    expect(serviceAreas.find((area) => area.name === "Fort Lauderdale")?.href).toBe(
      "/fort-lauderdale",
    );
  });
});
