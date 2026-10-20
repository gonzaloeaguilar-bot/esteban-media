import { describe, expect, it } from "vitest";
import {
  CRAWLERS,
  evaluateResponse,
  probeCrawlers,
} from "./crawler-availability.mjs";

function response(status, contentType, html) {
  return {
    status,
    headers: new Headers({ "content-type": contentType }),
    text: async () => html,
  };
}

const validHtml = '<!doctype html><html><head><link rel="canonical" href="https://estebanmorenomedia.com/"></head><body><h1>Video editing</h1></body></html>';

describe("crawler availability monitor", () => {
  it("passes a raw HTML homepage response", () => {
    expect(evaluateResponse({
      name: "Googlebot",
      userAgent: "Googlebot",
      response: response(200, "text/html; charset=utf-8", validHtml),
      html: validHtml,
      origin: "https://estebanmorenomedia.com",
    })).toMatchObject({ ok: true, errors: [] });
  });

  it("fails closed on a challenge response", () => {
    const result = evaluateResponse({
      name: "GPTBot",
      userAgent: "GPTBot",
      response: response(403, "text/html", "<html><body>challenge</body></html>"),
      html: "<html><body>challenge</body></html>",
      origin: "https://estebanmorenomedia.com",
    });
    expect(result.ok).toBe(false);
    expect(result.errors).toContain("HTTP 403");
    expect(result.errors).toContain("missing canonical homepage link");
    expect(result.errors).toContain("missing raw HTML h1");
  });

  it("sends every declared user agent and preserves an individual failure", async () => {
    const seen = [];
    const report = await probeCrawlers("https://example.com", async (_url, options) => {
      seen.push(options.headers["user-agent"]);
      const userAgent = options.headers["user-agent"];
      return response(userAgent === "ClaudeBot" ? 503 : 200, "text/html", validHtml.replaceAll("estebanmorenomedia.com", "example.com"));
    });
    expect(seen).toEqual(CRAWLERS.map(([, userAgent]) => userAgent));
    expect(report.find((probe) => probe.name === "ClaudeBot")).toMatchObject({
      ok: false,
      errors: ["HTTP 503"],
    });
  });
});
