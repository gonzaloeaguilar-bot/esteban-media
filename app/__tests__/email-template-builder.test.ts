import { describe, it, expect } from "vitest";
import { buildTechOutreachHtmlEmail } from "../../lib/email-template-builder.mjs";

describe("Email Template Builder - Tella Dark Pressure-Tested System", () => {
  it("renders dark theme email cleanly with 3s hook, real portfolio links, and SMS redirect endpoint", () => {
    const html = buildTechOutreachHtmlEmail({
      targetName: "Davie Blvd Latin Bistro & Grill",
      city: "Fort Lauderdale",
      distanceMiles: "0.5",
      googleRating: "4.8",
      reviewCount: "142",
      language: "es",
    });

    const lower = html.toLowerCase();

    // Dark theme background & amber orange pill button
    expect(lower).toContain("background-color: #121214");
    expect(lower).toContain("background-color: #ea580c");
    expect(html).toContain("border-radius: 24px");

    // Scroll-stopping 3s Hook
    expect(html).toContain("El 80% de tus clientes pasa de largo en redes en 3 segundos");

    // Real portfolio CTA & Links
    expect(html).toContain("Ver Portafolio de Videos en Vivo →");
    expect(html).toContain("https://estebanmorenomedia.com/es/portafolio");

    // Real Portfolio work titles
    expect(html).toContain("Bar Door Monkey");
    expect(html).toContain("Diana & Jack");

    // Tella style italicized numbered list items
    expect(html).toContain('font-style: italic;">Gancho de interrupción (0-3s).</strong>');
    expect(html).toContain('font-style: italic;">Subtítulos kinéticos activos.</strong>');

    // Contact section, WhatsApp & HTTPS SMS redirect endpoint
    expect(html).toContain("WhatsApp (305-497-4478)");
    expect(html).toContain("https://estebanmorenomedia.com/api/sms?phone=13054974478");
    expect(html).toContain("📍 1811 SW 42nd Ave, Fort Lauderdale, FL 33317");
  });

  it("renders English email cleanly with high-impact hook", () => {
    const html = buildTechOutreachHtmlEmail({
      targetName: "Sunny Isles MedSpa",
      city: "Sunny Isles",
      distanceMiles: "12",
      googleRating: "5.0",
      reviewCount: "89",
      language: "en",
    });

    const lower = html.toLowerCase();

    expect(lower).toContain("background-color: #121214");
    expect(html).toContain("80% of potential customers scroll past social video in 3s");
    expect(html).toContain("View Live Video Portfolio →");
    expect(html).toContain("https://estebanmorenomedia.com/portfolio/bar-door-monkey");
    expect(html).toContain('font-style: italic;">Pattern-interrupt hook (0-3s).</strong>');
  });
});
