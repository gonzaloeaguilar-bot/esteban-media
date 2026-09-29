import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import {
  packageDetailJsonLd,
  packageDirectAnswer,
  packageFaq,
  packageFaqFor,
} from "@/lib/packages";
import { packageRoutes } from "@/lib/package-routes";
import { PACKAGE_PRICES, type PackageId } from "@/lib/pricing";
import { absoluteUrl } from "@/lib/site";
import { entityIds } from "@/lib/entity-schema";

/**
 * The eight package pages were measured on 2026-09-28 at 214-263 words each,
 * with no FAQ and no structured data of their own — while their entire
 * informational payload already existed on /pricing via packagesJsonLd. That is
 * the doorway-page pattern: eight URLs telling an answer engine what the hub
 * already told it.
 *
 * These tests pin the only thing that earns them a URL: each page answers ONE
 * specific buyer question, in one citable sentence, with structured data that is
 * its own and not a ninth copy of the hub's.
 */

const IDS: PackageId[] = ["arranque", "crecimiento", "presencia-local", "todo-incluido"];
const LOCALES = ["en", "es"] as const;

describe("package page GEO", () => {
  it("gives every package a question-shaped heading and a direct answer", () => {
    for (const id of IDS) {
      for (const locale of LOCALES) {
        const { question, answer } = packageDirectAnswer(id, locale);
        expect(question).toMatch(/\?$/);
        // An answer engine quotes a sentence. A fragment is not quotable and a
        // paragraph is not either.
        expect(answer.length).toBeGreaterThan(80);
        expect(answer).toMatch(/\.$/);
        // It must answer without a preamble — no "we offer", no "our package".
        expect(answer.toLowerCase()).not.toMatch(/^(we |our |at esteban|en esteban)/);
      }
    }
  });

  it("asks a DIFFERENT question on each page, or the pages are duplicates", () => {
    for (const locale of LOCALES) {
      const questions = IDS.map((id) => packageDirectAnswer(id, locale).question);
      expect(new Set(questions).size).toBe(IDS.length);
    }
  });

  it("carries only its own questions, never a ninth copy of the hub's FAQ", () => {
    for (const locale of LOCALES) {
      const all = packageFaq(locale).length;
      for (const id of IDS) {
        const own = packageFaqFor(id, locale);
        expect(own.length).toBeGreaterThan(0);
        expect(own.length).toBeLessThan(all);
      }
      // The package-specific question must not be shared between two packages:
      // the only question allowed on every page is the "are prices fixed" one.
      const specific = IDS.flatMap((id) =>
        packageFaqFor(id, locale).filter((q) => q.id !== "precios-fijos").map((q) => q.id),
      );
      expect(new Set(specific).size).toBe(specific.length);
    }
  });

  it("publishes the price as a FLOOR, never as a fixed price", () => {
    for (const id of IDS) {
      const [service] = packageDetailJsonLd(id, "en", absoluteUrl(packageRoutes[id].en), entityIds.business);
      const price = PACKAGE_PRICES[id];
      const offers = (service as unknown as Record<string, unknown>).offers as Record<string, unknown> | undefined;
      if (price.kind === "from") {
        expect(offers).toBeDefined();
        expect(offers!.lowPrice).toBe(price.amount);
        // `price` or `highPrice` would assert a cost this business does not quote.
        expect(offers!.price).toBeUndefined();
        expect(offers!.highPrice).toBeUndefined();
      } else {
        // Todo Incluido is quoted individually: inventing any figure is the bug.
        expect(offers).toBeUndefined();
      }
    }
  });

  it("scopes every @id to its own URL, so nine pages are not one entity", () => {
    const ids = new Set<string>();
    for (const id of IDS) {
      for (const locale of LOCALES) {
        const url = absoluteUrl(packageRoutes[id][locale]);
        const [service, faq] = packageDetailJsonLd(id, locale, url, entityIds.business);
        expect((service as unknown as Record<string, string>)["@id"]).toBe(`${url}#service`);
        expect((faq as unknown as Record<string, string>)["@id"]).toBe(`${url}#faq`);
        ids.add((service as unknown as Record<string, string>)["@id"]);
      }
    }
    expect(ids.size).toBe(IDS.length * LOCALES.length);
  });

  it("never writes a price figure into a page or a sentence", () => {
    // Every figure has to come from PACKAGE_PRICES. A number typed into copy is
    // the failure this project has already paid for once.
    const component = readFileSync(join(process.cwd(), "components/package-detail.tsx"), "utf8");
    expect(component).not.toMatch(/\$\s?\d/);
    for (const id of IDS) {
      for (const locale of LOCALES) {
        const { answer } = packageDirectAnswer(id, locale);
        const price = PACKAGE_PRICES[id];
        if (price.kind === "from") {
          expect(answer).toContain(price.amount.toLocaleString("en-US"));
        }
      }
    }
  });

  it("lists all eight pages in llms.txt, with both languages paired", () => {
    const llms = readFileSync(join(process.cwd(), "public/llms.txt"), "utf8");
    for (const id of IDS) {
      for (const locale of LOCALES) {
        expect(llms).toContain(`https://estebanmorenomedia.com${packageRoutes[id][locale]}`);
      }
    }
    // And it must no longer claim the packages live on a home-page anchor.
    expect(llms).not.toContain("/#packages");
    expect(llms).not.toContain("/es#paquetes");
  });
});
