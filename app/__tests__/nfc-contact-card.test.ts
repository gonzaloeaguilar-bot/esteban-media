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

  it("gives every action an end-to-end motif with no photography", () => {
    const css = readFileSync(join(process.cwd(), "app/(card)/card/card.css"), "utf8");
    expect(page).toContain('import "./card.css"');
    expect(page).toContain('className="em-route-list mt-3"');
    expect(page).not.toContain("/about/");
    // Real work appears only inside the reel strip; every other scene is a pure motif.
    const reel = page.slice(page.indexOf("em-scene--reel"), page.indexOf("em-scene--maps"));
    expect(reel).toContain("/real-estate-reels/brickell-loop.mp4");
    expect((reel.match(/\/portfolio\//g) ?? []).length).toBe(4);
    expect((page.match(/\/portfolio\//g) ?? []).length).toBe(4);
    expect(page).toContain("em-reel__strip");
    expect((page.match(/visual: "/g) ?? []).length).toBe(6);
    for (const scene of ["wa", "call", "reel", "maps", "review", "save"]) expect(page).toContain(`em-scene em-scene--${scene}`);
    expect(page).toContain("em-wa__typing");
    expect(page).toContain("em-maps__pin");
    expect(page).toContain("Escribir una reseña");
    expect(page).toContain("Agregar a contactos");
    expect(css).toContain("@keyframes em-wa-in");
    expect(css).toContain("@keyframes em-maps-drop");
    expect(css).toContain("@keyframes em-review-star");
    expect(css).toContain("@keyframes em-ring");
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
