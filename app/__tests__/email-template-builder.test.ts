import { describe, it, expect } from "vitest";
import { buildTechOutreachHtmlEmail } from "../../lib/email-template-builder.mjs";

describe("Email Template Builder - Tella & Canva Design System", () => {
  it("renders dark theme email with signature soft violet pill CTA, Canva badge, and Tella numbered list", () => {
    const html = buildTechOutreachHtmlEmail({
      targetName: "Davie Blvd Latin Bistro & Grill",
      city: "Fort Lauderdale",
      distanceMiles: "0.5",
      googleRating: "4.8",
      reviewCount: "142",
      language: "es",
      theme: "dark",
    });

    // Dark theme carbon background & soft violet pill button
    expect(html).toContain("background-color: #1C1D22");
    expect(html).toContain("background-color: #9D6DFD");
    expect(html).toContain("color: #0F0F12 !important");
    expect(html).toContain("border-radius: 9999px");

    // Canva-style header badge
    expect(html).toContain("Ver Portafolio");
    expect(html).toContain("border: 1px solid rgba(255, 255, 255, 0.14)");

    // Tella typography headline & greeting
    expect(html).toContain("Optimizaciones de video 9:16");
    expect(html).toContain("Hola equipo de Davie Blvd Latin Bistro & Grill,");
    expect(html).toContain("Ver todos los ejemplos (3 min)");

    // Tella style italicized numbered list items
    expect(html).toContain('font-style: italic;">Gancho de interrupción (0-3s).</strong>');
    expect(html).toContain('font-style: italic;">Subtítulos kinéticos activos.</strong>');
    expect(html).toContain('font-style: italic;">Mezcla de audio a -14 LUFS.</strong>');

    // 16px media cards with rounded corners
    expect(html).toContain("border-radius: 16px");
    expect(html).toContain("/email-assets/tella_editor.jpg");

    // Contact section & footer
    expect(html).toContain("WhatsApp");
    expect(html).toContain("SMS / Texto");
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

    expect(html).toContain("background-color: #FAF5EE");
    expect(html).toContain("background-color: #8B5CF6");
    expect(html).toContain("View Portfolio");
    expect(html).toContain("9:16 Vertical Reels");
    expect(html).toContain("Watch all video showcases (3 min)");
    expect(html).toContain('font-style: italic;">Pattern-interrupt hook (0-3s).</strong>');
  });
});
