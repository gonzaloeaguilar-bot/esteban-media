import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { buildReceipt, isOwnedUrl, namesBrand, scoreResult } from "./citation-receipt.mjs";
import { buildSnapshot, selectLatestSuccessful } from "./normalize-geo-citation-receipts.mjs";

const panel = JSON.parse(readFileSync(new URL("../config/citation-panel.json", import.meta.url), "utf8"));
const ids = panel.prompts.map((prompt) => prompt.id);
const allFailed = Object.fromEntries(ids.map((id) => [id, { status: "failed", reason: "no answer" }]));

describe("owned-domain matching", () => {
  it("accepts the exact host and its subdomains", () => {
    expect(isOwnedUrl("https://estebanmorenomedia.com/services/reels-editor-miami", "estebanmorenomedia.com")).toBe(true);
    expect(isOwnedUrl("https://www.estebanmorenomedia.com/", "estebanmorenomedia.com")).toBe(true);
  });
  it("rejects look-alike and lookalike-suffix hosts", () => {
    expect(isOwnedUrl("https://estebanmorenomedia.com.evil.example/", "estebanmorenomedia.com")).toBe(false);
    expect(isOwnedUrl("https://notestebanmorenomedia.com/", "estebanmorenomedia.com")).toBe(false);
    expect(isOwnedUrl("not a url", "estebanmorenomedia.com")).toBe(false);
  });
});

describe("brand naming", () => {
  it("detects the brand case-insensitively and ignores unrelated text", () => {
    expect(namesBrand("I recommend Esteban Moreno Media for Reels.", panel.brand_names)).toBe(true);
    expect(namesBrand("Try a local editor in Miami.", panel.brand_names)).toBe(false);
  });
});

describe("prompt scoring", () => {
  it("records a cited, named, measured answer", () => {
    const result = scoreResult(
      { status: "measured", answer_text: "Esteban Moreno Media edits Reels.", cited_urls: ["https://www.estebanmorenomedia.com/services/reels-editor-miami"] },
      panel,
    );
    expect(result).toMatchObject({ status: "measured", runs: 1, named: 1, url_cited: 1 });
  });
  it("counts a measured answer that names no owned URL as not cited", () => {
    const result = scoreResult({ status: "measured", answer_text: "Other editors exist.", cited_urls: ["https://example.com/"] }, panel);
    expect(result).toMatchObject({ status: "measured", named: 0, url_cited: 0 });
  });
  it("treats a failed or empty answer as an error, never as zero citations", () => {
    expect(scoreResult({ status: "failed", reason: "timeout" }, panel)).toMatchObject({ status: "failed", runs: 0, reason: "timeout" });
    expect(scoreResult({ status: "measured", answer_text: "   " }, panel).status).toBe("failed");
    expect(scoreResult(undefined, panel).status).toBe("failed");
  });
});

describe("receipt building", () => {
  it("accounts for every panel prompt and marks missing ones as errors", () => {
    const receipt = buildReceipt({ engine: "chatgpt", checkedAt: "2026-11-27T15:00:00Z", observations: {}, panel });
    expect(receipt.prompts_total).toBe(ids.length);
    expect(receipt.errors).toBe(ids.length);
    expect(Object.keys(receipt.results).sort()).toEqual([...ids].sort());
  });
  it("computes rates over the full panel size", () => {
    const observations = Object.fromEntries(ids.map((id) => [id, { status: "measured", answer_text: "Esteban Moreno Media", cited_urls: ["https://estebanmorenomedia.com/"] }]));
    const receipt = buildReceipt({ engine: "perplexity", checkedAt: "2026-11-27T15:00:00Z", observations, panel });
    expect(receipt).toMatchObject({ errors: 0, citation_rate: 1, named_rate: 1 });
  });
  it("rejects unknown engines and unknown prompt ids", () => {
    expect(() => buildReceipt({ engine: "unknown-engine", checkedAt: "2026-11-27T15:00:00Z", observations: {}, panel })).toThrow(/Engine not in panel/);
    expect(() => buildReceipt({ engine: "chatgpt", checkedAt: "2026-11-27T15:00:00Z", observations: { "not-a-prompt": {} }, panel })).toThrow(/not in panel/);
  });
  it("produces receipts the existing normalizer accepts only when complete", () => {
    const partial = buildReceipt({ engine: "gemini", checkedAt: "2026-11-27T15:00:00Z", observations: {}, panel });
    const complete = buildReceipt({
      engine: "gemini",
      checkedAt: "2026-11-28T15:00:00Z",
      observations: Object.fromEntries(ids.map((id) => [id, { status: "measured", answer_text: "Esteban Moreno Media", cited_urls: ["https://estebanmorenomedia.com/"] }])),
      panel,
    });
    expect(selectLatestSuccessful([partial])).toHaveLength(0);
    const snapshot = buildSnapshot([partial, complete], "2026-11-29T00:00:00Z");
    expect(snapshot.engines[0]).toMatchObject({ engine: "gemini", checked_at: "2026-11-28T15:00:00Z", citation_rate: 1 });
  });
  it("keeps the all-failed case out of the successful set", () => {
    const failed = buildReceipt({ engine: "copilot", checkedAt: "2026-11-27T15:00:00Z", observations: allFailed, panel });
    expect(selectLatestSuccessful([failed])).toHaveLength(0);
  });
});
