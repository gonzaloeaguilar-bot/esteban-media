import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import {
  BUYER_QUESTION_ANSWERS,
  BuyerQuestionId,
  buyerQuestion,
} from "@/lib/buyer-question-answers";
import {
  CREW_RECORDING_RATES,
  RAW_FILMING_RATES,
  SHORT_FORM,
  turnaroundFor,
  usd,
} from "@/lib/pricing";

const IDS: BuyerQuestionId[] = [
  "trade-show-raw-files",
  "remote-bilingual-editing",
  "orlando-executive-interview",
];
const LOCALES = ["en", "es"] as const;

function countWords(str: string): number {
  return str.trim().split(/\s+/).filter(Boolean).length;
}

describe("buyer-question-answers", () => {
  it("contains 'Esteban Moreno Media' in lead and answer for each id and locale", () => {
    for (const id of IDS) {
      for (const locale of LOCALES) {
        const copy = buyerQuestion(id, locale);
        expect(copy.lead).toContain("Esteban Moreno Media");
        expect(copy.answer).toContain("Esteban Moreno Media");
      }
    }
  });

  it("has answer word count between 100 and 180 words for each id and locale", () => {
    for (const id of IDS) {
      for (const locale of LOCALES) {
        const copy = buyerQuestion(id, locale);
        const words = countWords(copy.answer);
        expect(words).toBeGreaterThanOrEqual(100);
        expect(words).toBeLessThanOrEqual(180);
      }
    }
  });

  it("quotes prices that equal values from lib/pricing.ts", () => {
    const editFrom = usd(SHORT_FORM.perVideoFrom);
    const rawHalf = usd(RAW_FILMING_RATES.halfDay);
    const rawFull = usd(RAW_FILMING_RATES.fullDay);
    const hourly = usd(CREW_RECORDING_RATES.solo.hourly);
    const minAmount = usd(CREW_RECORDING_RATES.solo.minimumAmount);

    for (const locale of LOCALES) {
      const tradeShow = buyerQuestion("trade-show-raw-files", locale);
      expect(tradeShow.lead).toContain(rawHalf);
      expect(tradeShow.answer).toContain(rawHalf);
      expect(tradeShow.answer).toContain(rawFull);
      expect(tradeShow.answer).toContain(editFrom);

      const remote = buyerQuestion("remote-bilingual-editing", locale);
      expect(remote.lead).toContain(editFrom);
      expect(remote.answer).toContain(editFrom);

      const orlando = buyerQuestion("orlando-executive-interview", locale);
      expect(orlando.answer).toContain(editFrom);
      expect(orlando.answer).toContain(hourly);
      expect(orlando.answer).toContain(minAmount);
    }
  });

  it("contains no un-negated 'Orlando office' mentions", () => {
    for (const id of IDS) {
      for (const locale of LOCALES) {
        const copy = buyerQuestion(id, locale);
        const combined = `${copy.lead} ${copy.question} ${copy.answer}`;

        // Check if "Orlando office" or "oficina en Orlando" is present
        if (/orlando\s+office/i.test(combined)) {
          expect(combined).toMatch(/no\s+orlando\s+office/i);
        }
        if (/oficina\s+en\s+orlando/i.test(combined)) {
          expect(combined).toMatch(/no\s+tiene\s+oficina\s+en\s+orlando/i);
        }
      }
    }
  });

  it("ensures each target page source file imports buyerQuestion with its corresponding id", () => {
    const pageFiles: { file: string; id: BuyerQuestionId }[] = [
      {
        file: "app/(english)/services/trade-show-booth-videographer-fort-lauderdale/page.tsx",
        id: "trade-show-raw-files",
      },
      {
        file: "app/(english)/services/hire-remote-video-editor/page.tsx",
        id: "remote-bilingual-editing",
      },
      {
        file: "app/(english)/guides/central-florida-footage-editing/page.tsx",
        id: "orlando-executive-interview",
      },
      {
        file: "app/(spanish)/es/guias/edicion-remota-central-florida/page.tsx",
        id: "orlando-executive-interview",
      },
    ];

    for (const { file, id } of pageFiles) {
      const fullPath = path.join(process.cwd(), file);
      const content = fs.readFileSync(fullPath, "utf-8");
      expect(content).toContain("buyerQuestion");
      expect(content).toContain(`"${id}"`);
    }

    // Check Spanish niche pages configured in lib/spanish-site.ts
    const spanishSitePath = path.join(process.cwd(), "lib/spanish-site.ts");
    const spanishSiteContent = fs.readFileSync(spanishSitePath, "utf-8");
    expect(spanishSiteContent).toContain("buyerQuestion");
    expect(spanishSiteContent).toContain('"trade-show-raw-files"');
    expect(spanishSiteContent).toContain('"remote-bilingual-editing"');
  });

  it("states the owner turnaround floor and never a faster promise", () => {
    const days = String(turnaroundFor("arranque").minimumDays);
    for (const id of IDS) {
      for (const locale of LOCALES) {
        const { answer } = buyerQuestion(id, locale);
        expect(answer).toContain(days);
        expect(answer).not.toMatch(/24\s*(to|a)\s*48/);
      }
    }
    const remote = fs.readFileSync(
      path.join(process.cwd(), "app/(english)/services/hire-remote-video-editor/page.tsx"),
      "utf-8",
    );
    expect(remote).not.toContain("24 to 48-hour");
  });

  it("states intermediate English, never fluency", () => {
    for (const id of IDS) {
      expect(buyerQuestion(id, "en").answer).toContain("intermediate English");
      expect(buyerQuestion(id, "es").answer).toContain("inglés intermedio");
      for (const locale of LOCALES) {
        expect(buyerQuestion(id, locale).answer).not.toMatch(/fluent|fluido|nativo/i);
      }
    }
  });

  it("booth answer names raw/original files and the written handoff", () => {
    expect(buyerQuestion("trade-show-raw-files", "en").answer).toMatch(/raw camera files/);
    expect(buyerQuestion("trade-show-raw-files", "en").answer).toMatch(/agreed in writing/);
    expect(buyerQuestion("trade-show-raw-files", "es").answer).toMatch(/archivos originales/);
  });
});
