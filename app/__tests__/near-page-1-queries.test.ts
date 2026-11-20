import { describe, expect, it } from "vitest";
import { getSpanishNichePage } from "@/lib/spanish-site";
import { metadata as ftlEnMetadata } from "../(english)/services/reels-editor-fort-lauderdale/page";
import { metadata as miamiEnMetadata } from "../(english)/services/reels-editor-miami/page";
import { metadata as shortFormMetadata } from "../(english)/services/short-form-video-editor-miami/page";
import { SHORT_FORM, usd } from "@/lib/pricing";

describe("Near-Page-1 Query SEO and Intent Parity Gate", () => {
  it("enforces title <= 60 and meta description <= 155 chars on all targeted routes", () => {
    const ftlEs = getSpanishNichePage("editor-de-reels-fort-lauderdale");
    const miamiEs = getSpanishNichePage("editor-de-reels-miami");

    expect(ftlEs).toBeDefined();
    expect(miamiEs).toBeDefined();

    const pages = [
      { name: "FTL ES", title: ftlEs!.metadataTitle ?? ftlEs!.title, desc: ftlEs!.description },
      { name: "Miami ES", title: miamiEs!.metadataTitle ?? miamiEs!.title, desc: miamiEs!.description },
      { name: "FTL EN", title: String(ftlEnMetadata.title), desc: String(ftlEnMetadata.description) },
      { name: "Miami EN", title: String(miamiEnMetadata.title), desc: String(miamiEnMetadata.description) },
      { name: "Short-Form EN", title: String(shortFormMetadata.title), desc: String(shortFormMetadata.description) },
    ];

    for (const p of pages) {
      expect(p.title.length, `${p.name} title length`).toBeLessThanOrEqual(60);
      expect(p.desc.length, `${p.name} desc length`).toBeLessThanOrEqual(155);
    }
  });

  it("contains query terms and owner-confirmed pricing in answerFirst on target pages", () => {
    const ftlEs = getSpanishNichePage("editor-de-reels-fort-lauderdale");
    const miamiEs = getSpanishNichePage("editor-de-reels-miami");

    expect(ftlEs?.answerFirst).toContain(usd(SHORT_FORM.perVideoFrom));
    expect(ftlEs?.answerFirst).toContain(usd(SHORT_FORM.weekly[0].pricePerWeek));
    expect(ftlEs?.answerFirst).toContain(usd(SHORT_FORM.weekly[1].pricePerWeek));
    expect(ftlEs?.answerFirst).toContain("editor de video");
    expect(ftlEs?.answerFirst).toContain("Fort Lauderdale");

    expect(miamiEs?.answerFirst).toContain(usd(SHORT_FORM.perVideoFrom));
    expect(miamiEs?.answerFirst).toContain(usd(SHORT_FORM.weekly[0].pricePerWeek));
    expect(miamiEs?.answerFirst).toContain(usd(SHORT_FORM.weekly[1].pricePerWeek));
    expect(miamiEs?.answerFirst).toContain("editor de video");
    expect(miamiEs?.answerFirst).toContain("Miami");
  });

  it("includes queries in native server-rendered FAQs", () => {
    const ftlEs = getSpanishNichePage("editor-de-reels-fort-lauderdale");
    const miamiEs = getSpanishNichePage("editor-de-reels-miami");

    const ftlQuestions = ftlEs?.faqs.map((f) => f.question).join(" ") ?? "";
    expect(ftlQuestions).toContain("editor de video en Fort Lauderdale");

    const miamiQuestions = miamiEs?.faqs.map((f) => f.question).join(" ") ?? "";
    expect(miamiQuestions).toContain("editor de video en Miami");
  });
});
