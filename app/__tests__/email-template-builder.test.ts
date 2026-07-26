import { describe, it, expect } from "vitest";
import { buildTechOutreachHtmlEmail } from "../../lib/email-template-builder.mjs";

describe("Email Template Builder - Real Portfolio Focus System", () => {
  it("renders dark theme email with real portfolio links, soft pill CTA, and WhatsApp pill buttons", () => {
    const html = buildTechOutreachHtmlEmail({
      targetName: "Davie Blvd Latin Bistro & Grill",
      city: "Fort Lauderdale",
      distanceMiles: "0.5",
      googleRating: "4.8",
      reviewCount: "142",
      language: "es",
      theme: "dark",
    });

    // Dark theme background & soft pill button
    expect(html.toLowerCase()).toContain("background-color: #121214");
    expect(html.toLowerCase()).toContain("background-color: #8b5cf6");
    expect(html).toContain("border-radius: 24px");

    // Header badge & real portfolio CTA
    expect(html).toContain("Ver Portafolio");
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

    expect(html.toLowerCase()).toContain("background-color: #faf5ee");
    expect(html.toLowerCase()).toContain("background-color: #8b5cf6");
    expect(html).toContain("View Portfolio");
    expect(html).toContain("View Video Portfolio →");
    expect(html).toContain("https://estebanmorenomedia.com/portfolio/bar-door-monkey");
    expect(html).toContain('font-style: italic;">Pattern-interrupt hook (0-3s).</strong>');
  });
});
