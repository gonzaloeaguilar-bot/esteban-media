import { metadata } from "../(english)/about/page";
import { describe, expect, it } from "vitest";

describe("English About page brand metadata", () => {
  it("keeps the observed personal-name query and business entity together", () => {
    expect(metadata).toMatchObject({
      title: "Esteban Moreno | Founder & Video Editor",
      description:
        "Meet Esteban Moreno, founder of Esteban Moreno Media in Fort Lauderdale. Spanish-first video editing, AI-assisted content, social planning, and scoped projects.",
    });
  });

  it("keeps the search description within the site's snippet limit", () => {
    expect(metadata.description).toHaveLength(160);
  });
});
