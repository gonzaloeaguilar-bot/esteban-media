import { describe, expect, it } from "vitest";
import { buildCandidates, guideSlugs } from "./esteban-demand-content-farm.mjs";

describe("Esteban demand content farm", () => {
  it("finds Spanish guide slugs from served HTML", () => {
    expect([...guideSlugs('<a href="/es/guias/guia-existente">x</a>')]).toEqual(["guia-existente"]);
  });

  it("keeps only approved served areas and improves an exact existing route", () => {
    const results = buildCandidates([
      { query: "guia existente", status: "UNANSWERED", lang: "es", score: "99" },
      { query: "videographer near me", status: "UNANSWERED", lang: "en", score: "99" },
      { query: "cuanto cobra un diseñador web en mexico", status: "UNANSWERED", lang: "es", place: "Mexico", score: "99" },
      { query: "diseñador web bogota", status: "UNANSWERED", lang: "es", place: "Colombia", score: "99" },
      { query: "web developer miami", status: "UNANSWERED", lang: "en", place: "Miami", best_page: "/portfolio/caro-sells-miami", score: "9" },
      { query: "que grabar para reels en miami", status: "UNANSWERED", lang: "es", place: "Miami", service: "editing", sources: "gsc", gsc_impr: "12", gsc_pos: "19", gsc_page: "/es/guias", best_page: "/es/editor-de-reels-miami", score: "10" },
    ], new Set(["guia-existente"]), new Map([["que grabar para reels en miami", { run_date: "2026-10-26", search_volume: "50", keyword_difficulty: "10" }]]), { status: "UNMEASURED", source: "fixture" });
    expect(results).toHaveLength(2);
    const reels = results.find((item) => item.query === "que grabar para reels en miami");
    expect(reels).toMatchObject({ target: "/es/editor-de-reels-miami", action: "improve_existing", areaTier: "core", status: "UNANSWERED" });
    expect(reels.ssrOutline).toHaveLength(3);
    expect(reels.storyHook).toContain("que grabar para reels en miami");
    expect(results.find((item) => item.query === "web developer miami")).toMatchObject({ action: "new_guide_draft", target: "/es/guias/web-developer-miami" });
  });
});
