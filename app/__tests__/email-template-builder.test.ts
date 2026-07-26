import { describe, it, expect } from "vitest";
import { buildTechOutreachHtmlEmail } from "../../lib/email-template-builder.mjs";

describe("Email Template Builder - Tella Dark Design System", () => {
  it("renders dark theme email cleanly with real portfolio links, soft pill CTA, and WhatsApp pill buttons", () => {
    const html = buildTechOutreachHtmlEmail({
      targetName: "Davie Blvd Latin Bistro & Grill",
      city: "Fort Lauderdale",
      distanceMiles: "0.5",
      googleRating: "4.8",
      reviewCount: "142",
      language: "es",
      theme: "dark",
    });

    const lower = html.toLowerCase();

    // Dark theme background & soft pill button
    expect(lower).toContain("background-color: #121214");
    expect(lower).toContain("background-color: #f97316");
    expect(html).toContain("border-radius: 24px");

    // Real portfolio CTA
    expect(html).toContain("Ver Portafolio de Videos →");
    expect(html).toContain("https://estebanmorenomedia.com/es/portafolio");

    // Real Portfolio work titles
    expect(html).toContain("Bar Door Monkey");
    expect(html).toContain("Diana & Jack");

    // Tella style italicized numbered list items
    expect(html).toContain('font-style: italic;">Gancho de interrupción (0-3s).</strong>');
    expect(html).toContain('font-style: italic;">Subtítulos kinéticos activos.</strong>');

    // Contact section & WhatsApp phone
    expect(html).toContain("WhatsApp (305-497-4478)");
    expect(html).toContain("13054974478");
    expect(html).toContain("📍 1811 SW 42nd Ave, Fort Lauderdale, FL 33317");
  });

  it("renders English warm cream theme email cleanly", () => {
    const html = buildTechOutreachHtmlEmail({
      targetName: "Sunny Isles MedSpa",
      city: "Sunny Isles",
      distanceMiles: "12",
      googleRating: "5.0",
      reviewCount: "89",
      language: "en",
      theme: "cream",
    });

    const lower = html.toLowerCase();

    expect(lower).toContain("background-color: #faf5ee");
    expect(lower).toContain("background-color: #ea580c");
    expect(html).toContain("View Video Portfolio →");
    expect(html).toContain("https://estebanmorenomedia.com/portfolio/bar-door-monkey");
    expect(html).toContain('font-style: italic;">Pattern-interrupt hook (0-3s).</strong>');
  });
});
