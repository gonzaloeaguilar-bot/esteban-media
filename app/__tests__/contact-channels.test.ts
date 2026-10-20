import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { site } from "@/lib/site";

/**
 * The contact page is the one page whose whole job is contact, and it was the
 * only page on the site that did not offer WhatsApp — while every package CTA,
 * the home and the closing block all send people there. Measured 2026-09-28:
 * /contact offered email (a gmail.com address), phone and Instagram, in that
 * order, on a site that charges $800 a production day.
 *
 * The public email is the shared `info@estebanmorenomedia.com` inbox. On
 * 2026-10-19, Namecheap Email Forwarding was configured for that alias and the
 * domain's authoritative MX now resolves to Namecheap's eforward hosts. Keep
 * this assertion aligned with the deployed receiving address; a live MX probe
 * remains part of release verification because source code cannot prove mail
 * delivery.
 */

const PAGES = ["app/(english)/contact/page.tsx", "app/(spanish)/es/contacto/page.tsx"];
const source = (p: string) => readFileSync(join(process.cwd(), p), "utf8");

describe("contact channels", () => {
  it("offers WhatsApp on both contact pages", () => {
    for (const page of PAGES) {
      expect(source(page)).toContain("whatsappHref(site.phone.e164");
    }
  });

  it("puts WhatsApp BEFORE the email, because it is the channel that converts", () => {
    for (const page of PAGES) {
      const src = source(page);
      const whatsapp = src.indexOf("contact_whatsapp");
      const email = src.indexOf("mailto:${site.email}");
      expect(whatsapp).toBeGreaterThan(-1);
      expect(email).toBeGreaterThan(-1);
      expect(whatsapp).toBeLessThan(email);
    }
  });

  it("uses the shared helper, not a hand-built wa.me URL", () => {
    for (const page of PAGES) {
      const src = source(page);
      // A hand-rolled link forgets the encoded text and the phone formatting.
      expect(src).not.toMatch(/href="https:\/\/wa\.me/);
    }
  });

  it("measures the click through the shared analytics layer", () => {
    for (const page of PAGES) {
      expect(source(page)).toContain('data-cta="contact_whatsapp"');
    }
  });

  it("says the channels it actually offers", () => {
    // The prose used to list "email, phone or Instagram" — three channels, and
    // not the one the business runs on.
    expect(source(PAGES[0])).toContain("on WhatsApp");
    expect(source(PAGES[1])).toContain("por WhatsApp");
  });

  it("uses the configured shared inbox as the public email channel", () => {
    expect(site.email).toBe("info@estebanmorenomedia.com");
  });
});
