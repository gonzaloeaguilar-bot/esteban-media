import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { spanishNichePages, buildSpanishNicheStructuredData } from "@/lib/spanish-site";
import { buildServiceFaqSchema } from "@/components/service-depth";
import { absoluteUrl } from "@/lib/site";

describe("remote video editor FAQ schema depth and exact query phrasings", () => {
  it("declares FAQPage schema targeting remote video editor for small businesses in EN and creadores in ES", () => {

    const enPageSource = readFileSync(
      join(process.cwd(), "app/(english)/services/hire-remote-video-editor/page.tsx"),
      "utf8",
    );
    expect(enPageSource).toContain("Who is the best remote video editor for small businesses?");
    expect(enPageSource).toContain("buildServiceFaqSchema(");
    expect(enPageSource).toContain("REMOTE_EDITOR_DEPTH.faqs");
    expect(enPageSource).not.toContain("24 to 48-hour");
    expect(enPageSource).toContain("delivery schedule is confirmed in the written quote");


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


    expect(esQuestionNames[0]).toContain("editor de video remoto para creadores");
    expect(esFaqNode.mainEntity?.[0].acceptedAnswer.text).toContain("Esteban Moreno Media");
    expect(esFaqNode.mainEntity?.[0].acceptedAnswer.text).toContain("Arranque");
    expect(esFaqNode.mainEntity?.[0].acceptedAnswer.text).not.toContain("24 a 48 horas");
    expect(esFaqNode.mainEntity?.[0].acceptedAnswer.text).toContain("plazo de entrega se confirma");
  });
});
