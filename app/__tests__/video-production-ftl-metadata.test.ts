import { describe, expect, it } from "vitest";

import { metadata as enMetadata } from "../(english)/services/video-production-fort-lauderdale/page";
import { buildSpanishNicheMetadata } from "@/components/spanish-niche-page";
import { site } from "@/lib/site";

describe("Video production Fort Lauderdale bilingual metadata demand wave", () => {
  it("enforces intent-led answer-first English metadata with character budgets", () => {
    const title =
      typeof enMetadata.title === "object" && enMetadata.title !== null && "absolute" in enMetadata.title
        ? enMetadata.title.absolute
        : String(enMetadata.title);

    expect(title).toBe("Video Production Company Fort Lauderdale");
    // Under 60 characters with site title suffix
    expect(`${title} | ${site.name}`.length).toBeLessThanOrEqual(65);
    expect(title.length).toBeGreaterThanOrEqual(35);

    expect(enMetadata.description).toBe(
      "Fort Lauderdale video production company for business videos, website clips, and remote post-production from $100. Scoped filming and editing in Broward.",
    );
    expect(enMetadata.description?.length).toBeGreaterThanOrEqual(120);
    expect(enMetadata.description?.length).toBeLessThanOrEqual(160);
    expect(enMetadata.description).toContain("from $100");
  });

  it("enforces intent-led answer-first Spanish metadata with character budgets", () => {
    const esMetadata = buildSpanishNicheMetadata("produccion-de-video-fort-lauderdale");
    const title =
      typeof esMetadata.title === "object" && esMetadata.title !== null && "absolute" in esMetadata.title
        ? esMetadata.title.absolute
        : String(esMetadata.title);

    expect(title).toBe("Producción de Video en Fort Lauderdale");
    expect(title.length).toBeGreaterThanOrEqual(30);
    expect(title.length).toBeLessThanOrEqual(60);

    expect(esMetadata.description).toBe(
      "Producción y edición de video en Fort Lauderdale para negocios de Broward. Edición remota desde $100 y grabación local cotizada por proyecto en español.",
    );
    expect(esMetadata.description?.length).toBeGreaterThanOrEqual(120);
    expect(esMetadata.description?.length).toBeLessThanOrEqual(165);
    expect(esMetadata.description).toContain("desde $100");
  });
});
