import { describe, expect, it } from "vitest";
import { discover, fetchSuggestions, parseArgs, renderReport } from "./free-opportunity-discovery.mjs";

describe("free opportunity discovery", () => {
  it("uses explicit seeds without treating suggestions as metrics", () => {
    expect(parseArgs(["--seed=restaurant video miami", "--json"])).toMatchObject({ seeds: ["restaurant video miami"], json: true });
  });

  it("returns source-level failure instead of inventing a result", async () => {
    const result = await fetchSuggestions("restaurant video miami", async () => new Response("no", { status: 429 }));
    expect(result.suggestions).toEqual([]);
    expect(result.sources.every((source) => source.status === "unavailable")).toBe(true);
  });

  it("deduplicates suggestions and preserves their source boundary", async () => {
    let call = 0;
    const result = await discover(["restaurant video miami"], async () => {
      call += 1;
      return new Response(JSON.stringify(["ignored", call === 1 ? ["restaurant video miami", "food video miami"] : ["food video miami", "miami restaurant videographer"]]), { status: 200 });
    });
    expect(result.results[0].suggestions).toEqual(["restaurant video miami", "food video miami", "miami restaurant videographer"]);
    expect(renderReport(result)).toContain("phrase-discovery signals only");
  });
});
