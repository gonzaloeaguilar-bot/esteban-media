import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(process.cwd());
const source = (file: string) => readFileSync(resolve(root, file), "utf8");

describe("personal creative partner DNA", () => {
  it("puts a direct-working explanation in every shared service inquiry", () => {
    const sharedRail = source("components/service-depth.tsx");

    expect(sharedRail).toContain('relationship?: "service" | "event" | "digital"');
    expect(sharedRail).toContain("You work directly with Esteban");
    expect(sharedRail).toContain("Trabajas directamente con Esteban");
    expect(sharedRail).toContain("data-personal-partner={relationship}");
  });

  it("uses event and digital wording where those shared page families render", () => {
    expect(source("components/event-content-page.tsx")).toContain('relationship="event"');
    expect(source("components/web-ai-service-page.tsx")).toContain('relationship="digital"');
  });

  it("makes the personal relationship visible on every portfolio watch page", () => {
    const portfolio = source("components/portfolio-watch-page.tsx");

    expect(portfolio).toContain('data-section="portfolio-personal-partner"');
    expect(portfolio).toContain("A project like this starts with a direct conversation with Esteban");
    expect(portfolio).toContain("Un proyecto así empieza conversando directamente con Esteban");
  });

  it("carries the direct-contact promise through the shared site footer", () => {
    const footer = source("components/site-footer-client.tsx");

    expect(footer).toContain('data-section="footer-personal-partner"');
    expect(footer).toContain("you speak directly with Esteban");
    expect(footer).toContain("hablas directamente con Esteban");
  });
});
