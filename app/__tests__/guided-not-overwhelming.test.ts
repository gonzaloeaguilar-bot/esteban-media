import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ContactCta } from "@/components/contact-cta";

/** Rendered TEXT, tags stripped — what a reader/crawler actually receives. */
const textOf = (html: string) => html.replace(/<[^>]+>/g, "");

/**
 * Owner, 2026-10-13, reacting to the live homepage contact section: "this
 * looks scary and intimidating". Before a visitor could say hello they met
 * an email field, an empty textarea and a dropdown — three form controls,
 * all mandatory-looking, none of them optional in appearance.
 *
 * The fix is not fewer fields; the detailed brief still exists, in full,
 * for whoever wants to send it. The fix is that it is no longer the FIRST
 * thing a visitor meets: it sits behind a native <details>, so a visitor
 * who wants to just say hi sees three direct taps (WhatsApp / email / call)
 * and nothing to fill in.
 *
 * "Form control" here means data-entry controls (input/select/textarea):
 * the three tap targets are <a> links, not form controls, so the honest
 * floor is zero outside <details> — not one. The rule still allows up to
 * one, in case a future revision adds a single always-visible field (e.g.
 * email) beside the taps; it must never allow the three-field wall back.
 *
 * Covers BOTH locales (2026-10-13 correction): ContactCta used to be
 * English-only, so "/es" kept the old duplicate HomeContactStrip +
 * HomeContactStrip shape untouched. It now takes a `locale` prop and
 * renders on both "/" and "/es" — this file would have said nothing about
 * the Spanish ask being calm, which is exactly the gap that let it slip.
 */

function countFormControls(html: string, { outsideDetailsOnly = false } = {}): number {
  let scope = html;
  if (outsideDetailsOnly) {
    // Strip every <details>...</details> block (there is exactly one on
    // this component) before counting what's left.
    scope = scope.replace(/<details\b[\s\S]*?<\/details>/g, "");
  }
  const matches = scope.match(/<(input|select|textarea)\b/g) ?? [];
  return matches.length;
}

describe("guided, not overwhelming", () => {
  it("negative control: the OLD single-screen form (3 controls, no <details>) fails the rule", () => {
    // This is not a snapshot of main — it is the shape main actually shipped
    // (email input, project-summary textarea, found-via select, all visible
    // before any interaction), reproduced inline so the counting logic itself
    // is proven to catch it.
    const oldMarkup = `
      <section>
        <h2>Send the goal and what you already have.</h2>
        <form>
          <input id="email" type="email" />
          <textarea id="summary"></textarea>
          <select id="found-via"><option value="">Choose one</option></select>
          <button type="submit">Send project details</button>
        </form>
      </section>
    `;
    const outside = countFormControls(oldMarkup, { outsideDetailsOnly: true });
    expect(outside).toBe(3);
    expect(outside).toBeGreaterThan(1); // the rule this test protects
  });

  describe.each(["en", "es"] as const)("ContactCta (%s)", (locale) => {
    it("keeps at most one control outside voluntary depth", () => {
      const html = renderToStaticMarkup(React.createElement(ContactCta, { locale }));
      const outside = countFormControls(html, { outsideDetailsOnly: true });
      expect(outside).toBeLessThanOrEqual(1);
    });

    it("depth still exists — guiding never became deleting", () => {
      const html = renderToStaticMarkup(React.createElement(ContactCta, { locale }));
      const total = countFormControls(html);
      expect(total).toBeGreaterThan(1);
      // And it must actually be reachable: present in the raw server HTML,
      // inside the one <details>, not stripped out.
      expect(html).toContain("<details");
      const insideDetailsOnly = html.match(/<details\b[\s\S]*?<\/details>/)?.[0] ?? "";
      expect(countFormControls(insideDetailsOnly)).toBeGreaterThan(1);
    });

    it("the three quick-tap paths are links, not form controls, and stay outside <details>", () => {
      const html = renderToStaticMarkup(React.createElement(ContactCta, { locale }));
      const beforeDetails = html.split("<details")[0];
      expect(beforeDetails).toContain('data-cta="home_contact_whatsapp"');
      expect(beforeDetails).toContain('data-cta="home_contact_email"');
      expect(beforeDetails).toContain('data-cta="home_contact_phone"');
    });
  });

  it("the English email and phone labels don't run into the address/number (the pasted defect)", () => {
    const html = renderToStaticMarkup(React.createElement(ContactCta, { locale: "en" }));
    // The owner's paste showed an email label and address run together — label and
    // address concatenated with no separator.
    //
    // This assertion used to pin the MARKUP SHAPE (two adjacent sibling spans
    // with nothing between them). That measured the proxy, not the property:
    // sibling block spans look correct on screen while textContent STILL runs
    // them together, which is what a text extraction, an AI crawler and some
    // assistive tech actually read. Visual separation is not textual
    // separation. So assert the rendered TEXT instead — it is the thing that
    // was wrong, and it stays true however the spans are arranged.
    expect(textOf(html)).toContain("Email Esteban info@estebanmorenomedia.com");
    expect(textOf(html)).not.toContain("Email Estebaninfo@estebanmorenomedia.com");
  });

  it("the Spanish label and phone number don't run into each other either (same defect, same component)", () => {
    const html = renderToStaticMarkup(React.createElement(ContactCta, { locale: "es" }));
    // Same correction as the English case: assert the TEXT, not the markup shape.
    expect(textOf(html)).toContain("Llamar a Esteban (305) 497-4478");
    expect(textOf(html)).not.toContain("Llamar a Esteban(305) 497-4478");
  });
});
