import { describe, expect, it } from "vitest";

import { PORTFOLIO_ITEMS, getPortfolioItemById } from "@/lib/portfolio";
import { getPortfolioWatchCopy, getPortfolioWatchPath } from "@/lib/portfolio-watch";

describe("Website Design & AI Chatbot QA Test Suite", () => {
  const webDesignItems = PORTFOLIO_ITEMS.filter(
    (item) => item.category === "web-design",
  );

  it("contains all 5 live Web & AI projects", () => {
    expect(webDesignItems).toHaveLength(5);
    const ids = webDesignItems.map((item) => item.id);
    expect(ids).toEqual([
      "flas-concierge",
      "gains-from-geebs",
      "titanforge",
      "front-line-auto",
      "gonzalo-tech-chatbots",
    ]);
  });

  it("verifies accurate live external website URLs for all projects", () => {
    const titanforge = getPortfolioItemById("titanforge");
    expect(titanforge?.websiteUrl).toBe("https://titanforgefit.com/");

    const geebs = getPortfolioItemById("gains-from-geebs");
    expect(geebs?.websiteUrl).toBe("https://gainsfromgeebs.com");

    const frontline = getPortfolioItemById("front-line-auto");
    expect(frontline?.websiteUrl).toBe("https://frontlineautosfl.com/");

    const flas = getPortfolioItemById("flas-concierge");
    expect(flas?.websiteUrl).toBe("https://fortlauderdaleautosale.com");

    const chatbots = getPortfolioItemById("gonzalo-tech-chatbots");
    expect(chatbots?.websiteUrl).toBe("https://fortlauderdaleautosale.com");
  });

  it("verifies factual copy & Instagram DM bot descriptions for Gains From Geebs and Chatbots", () => {
    const geebsEn = getPortfolioWatchCopy(getPortfolioItemById("gains-from-geebs")!, "en");
    expect(geebsEn.title).toContain("Instagram DM AI Bot");
    expect(geebsEn.summary).toContain("Instagram (IG) DM AI bot");

    const geebsEs = getPortfolioWatchCopy(getPortfolioItemById("gains-from-geebs")!, "es");
    expect(geebsEs.title).toContain("Instagram DM");
    expect(geebsEs.summary).toContain("Instagram DM");

    const frontlineEn = getPortfolioWatchCopy(getPortfolioItemById("front-line-auto")!, "en");
    expect(frontlineEn.title).toContain("Frontline Auto Repair");
    expect(frontlineEn.summary).toContain("Auto repair shop web system");

    const frontlineEs = getPortfolioWatchCopy(getPortfolioItemById("front-line-auto")!, "es");
    expect(frontlineEs.title).toContain("Frontline Auto Repair");
    expect(frontlineEs.summary).toContain("taller de reparación automotriz");
  });

  it("verifies key metrics and results arrays exist for all 5 web & AI projects", () => {
    for (const item of webDesignItems) {
      const copyEn = getPortfolioWatchCopy(item, "en");
      expect(copyEn.results).toBeDefined();
      expect(copyEn.results!.length).toBeGreaterThanOrEqual(2);

      const copyEs = getPortfolioWatchCopy(item, "es");
      expect(copyEs.results).toBeDefined();
      expect(copyEs.results!.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("verifies watch paths generate correct localized routes", () => {
    expect(getPortfolioWatchPath("titanforge", "en")).toBe("/portfolio/titanforge");
    expect(getPortfolioWatchPath("titanforge", "es")).toBe("/es/portafolio/titanforge");
    expect(getPortfolioWatchPath("front-line-auto", "en")).toBe("/portfolio/front-line-auto");
    expect(getPortfolioWatchPath("front-line-auto", "es")).toBe("/es/portafolio/front-line-auto");
  });
});
