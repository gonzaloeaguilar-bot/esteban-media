import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const page = readFileSync(join(process.cwd(), "app/(card)/card/page.tsx"), "utf8");
const cardRoute = readFileSync(join(process.cwd(), "app/(card)/card.vcf/route.ts"), "utf8");
const layout = readFileSync(join(process.cwd(), "app/(card)/layout.tsx"), "utf8");

describe("NFC contact card", () => {
  it("keeps exactly six large quick actions for a card scanner", () => {
    expect(page).toContain("nfc_card_whatsapp");
    expect(page).toContain("nfc_card_call");
    expect(page).toContain("nfc_card_maps");
    expect(page).toContain("nfc_card_google_review");
    expect(page).toContain("nfc_card_portfolio");
    expect(page).toContain("nfc_card_save_contact");
    expect((page.match(/nfc_card_/g) ?? []).length).toBe(6);
    expect(page).toContain("Dejar una reseña en Google");
    expect(page).toContain("toca Reseñas y después Escribir una reseña");
    expect(page).not.toContain("nfc_card_email");
    expect(page).not.toContain("nfc_card_instagram");
    expect(page).not.toContain("address");
  });

  it("gives every action the homepage route-card treatment with real imagery", () => {
    const css = readFileSync(join(process.cwd(), "app/(card)/card/card.css"), "utf8");
    expect(page).toContain('import "./card.css"');
    expect(page).toContain('className="em-route-list mt-3"');
    expect(page).toContain("em-route-card__visual em-route-card__visual--");
    expect(page).toContain("<Image src={image} alt={imageAlt} fill");
    expect(page).toContain('video: "/about/esteban-on-set.mp4"');
    expect((page.match(/visual: "/g) ?? []).length).toBe(6);
    expect((page.match(/image: "\/(portfolio|about)\//g) ?? []).length).toBe(6);
    expect(page).not.toContain("size-[72px]");
    expect(css).toContain(".em-route-card{position:relative");
    expect(css).toContain("@media (prefers-reduced-motion:reduce)");
  });

  it("offers a downloadable vCard from the same canonical contact source", () => {
    expect(page).toContain('href: "/card.vcf"');
    expect(cardRoute).toContain("BEGIN:VCARD");
    expect(cardRoute).toContain("site.phone.e164");
    expect(cardRoute).toContain("site.email");
    expect(cardRoute).toContain('"Content-Type": "text/vcard; charset=utf-8"');
  });

  it("uses a dedicated noindex layout with the existing analytics writer", () => {
    expect(layout).toContain("robots: { index: false, follow: true }");
    expect(layout).toContain("<GoogleAnalytics />");
    expect(layout).not.toContain("<SiteChrome>");
  });
});
