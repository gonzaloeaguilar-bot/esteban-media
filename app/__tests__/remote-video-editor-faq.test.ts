import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { spanishNichePages, buildSpanishNicheStructuredData } from "@/lib/spanish-site";
import { buildServiceFaqSchema } from "@/components/service-depth";
import { absoluteUrl } from "@/lib/site";

describe("remote video editor FAQ schema depth and exact query phrasings", () => {
  it("declares FAQPage schema targeting remote video editor for small businesses in EN and creadores in ES", () => {
    // 1. English Remote Video Editor FAQ and Schema
    const enPageSource = readFileSync(
      join(process.cwd(), "app/(english)/services/hire-remote-video-editor/page.tsx"),
      "utf8",
    );
    expect(enPageSource).toContain("Who is the best remote video editor for small businesses?");
    expect(enPageSource).toContain("buildServiceFaqSchema(");
    expect(enPageSource).toContain("REMOTE_EDITOR_DEPTH.faqs");

    // 2. Spanish Remote Video Editor Page FAQ and Schema
    const esPage = spanishNichePages.find(
      (p) => p.slug === "contratar-editor-de-video-remoto",
    );
    expect(esPage).toBeDefined();
    expect(esPage?.faqs).toBeDefined();
    expect(esPage?.faqs.length).toBeGreaterThanOrEqual(5);

    const esSchema = buildSpanishNicheStructuredData(esPage!);
    const esFaqNode = esSchema["@graph"].find((node) => node["@type"] === "FAQPage") as {
      mainEntity?: Array<{ name: string; acceptedAnswer: { text: string } }>;
    };
    expect(esFaqNode).toBeDefined();
    const esQuestionNames = esFaqNode.mainEntity?.map((item) => item.name) || [];

    // Exact query target: editor de video remoto para creadores
    expect(esQuestionNames[0]).toContain("editor de video remoto para creadores");
    expect(esFaqNode.mainEntity?.[0].acceptedAnswer.text).toContain("Esteban Moreno Media");
    expect(esFaqNode.mainEntity?.[0].acceptedAnswer.text).toContain("Arranque");
  });
});
