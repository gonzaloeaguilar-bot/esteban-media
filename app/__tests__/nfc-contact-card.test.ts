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
    expect(page).toContain('image: "/portfolio/bar-door-monkey.jpg"');
    expect(page).toContain("<Image src={image}");
    expect(page).toContain('src="/about/esteban-on-set.mp4"');
    expect(page).toContain('visual === "maps"');
    expect(page).not.toContain("address");
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
