import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  buildCompliantOutreachEmail,
  buildCompliantSubject,
} from "../../lib/compliant-outreach-email.mjs";

let saved: string | undefined;
beforeEach(() => {
  saved = process.env.ESTEBAN_POSTAL_ADDRESS;
  process.env.ESTEBAN_POSTAL_ADDRESS = "PO Box 1234, Fort Lauderdale, FL 33301";
});
afterEach(() => {
  if (saved === undefined) delete process.env.ESTEBAN_POSTAL_ADDRESS;
  else process.env.ESTEBAN_POSTAL_ADDRESS = saved;
});

describe("compliant outreach email — generic + offer-safe", () => {
  const built = () =>
    buildCompliantOutreachEmail({
      name: "Monserrate Restaurante",
      city: "Doral",
      igHandle: "@monserraterestaurante",
      language: "es",
      email: "lead@monserrate.test",
    });

  it("has an accurate, non-deceptive subject anchored on remote editing", () => {
    expect(buildCompliantSubject({ name: "Le Cafe In", language: "es" })).toBe(
      "Edición de video remota para Le Cafe In",
    );
    expect(buildCompliantSubject({ name: "Le Cafe In", language: "en" })).toBe(
      "Remote video editing for Le Cafe In",
    );
  });

  it("includes the CAN-SPAM footer: physical address + working unsubscribe link", () => {
    const { html, text } = built();
    expect(html).toContain("PO Box 1234, Fort Lauderdale, FL 33301");
    expect(html).toContain("/unsubscribe?email=lead%40monserrate.test");
    expect(text).toContain("PO Box 1234, Fort Lauderdale, FL 33301");
    expect(text).toContain("/unsubscribe?email=lead%40monserrate.test");
    expect(html).toContain("Esteban Moreno Media");
  });

  it("leads with the confirmed anchor offer (remote editing of supplied footage)", () => {
    const { text } = built();
    expect(text.toLowerCase()).toContain("editor de video remoto");
    expect(text.toLowerCase()).toContain("material");
  });

  it("contains NO fabricated claims, prices, metrics, or off-offer marketing", () => {
    const { html, text } = built();
    const blob = (html + " " + text).toLowerCase();
    // No prices / turnaround / fabricated metrics.
    expect(blob).not.toContain("$");
    expect(blob).not.toMatch(/\bprecio\b/);
    expect(blob).not.toContain("★");
    expect(blob).not.toContain("reviews");
    expect(blob).not.toContain("reseñas");
    // No "fully bilingual" claim.
    expect(blob).not.toContain("fully bilingual");
    expect(blob).not.toContain("100% bilingüe");
    expect(blob).not.toContain("completamente bilingüe");
    // Never a drone pilot.
    expect(blob).not.toContain("drone");
    expect(blob).not.toContain("dron ");
    expect(blob).not.toContain("part 107");
    // No off-offer web-design / SEO / free-audit pitch.
    expect(blob).not.toContain("next.js");
    expect(blob).not.toContain("seo");
    expect(blob).not.toContain("auditor");
    expect(blob).not.toContain("web redesign");
    // No leaked private address.
    expect(blob).not.toContain("1811 sw 42nd");
    // No fabricated placeholder businesses.
    expect(blob).not.toContain("davie blvd latin bistro");
  });

  it("renders an English variant with the same guarantees", () => {
    const { subject, html } = buildCompliantOutreachEmail({
      name: "Boatyard",
      city: "Fort Lauderdale",
      language: "en",
      email: "hi@boatyard.test",
    });
    expect(subject).toBe("Remote video editing for Boatyard");
    expect(html.toLowerCase()).toContain("remote video editor");
    expect(html).toContain("/unsubscribe?email=hi%40boatyard.test");
  });
});
