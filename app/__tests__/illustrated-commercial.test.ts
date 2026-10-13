import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { RealEstatePlansSection } from "@/components/real-estate-plans-section";
import { REAL_ESTATE_PLANS } from "@/lib/pricing";
import { realEstatePlansCopy, realEstateTerms, realEstatePlanName } from "@/lib/real-estate-plans";
import { whatsappHref } from "@/lib/packages";
import { site } from "@/lib/site";
import { REAL_ESTATE_PLAN_VISUALS } from "@/lib/real-estate-plan-visuals";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { ALaCarteSection } from "@/components/a-la-carte-section";
import { packagesCopy } from "@/lib/packages";
import { aLaCarteVisual } from "@/lib/a-la-carte-visuals";
import { quoteCtaLabel } from "@/lib/quote-cta";

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/'/g, "&#x27;").replace(/"/g, "&quot;");
const illustratedCss = readFileSync("app/illustrated-commercial.css", "utf8");

describe.each(["en", "es"] as const)("illustrated commercial content (%s)", locale => {
  it("retains all single-service names, notes, destinations and preparation without client rendering", () => {
    const html = renderToStaticMarkup(React.createElement(ALaCarteSection, { locale }));
    const hashes = packagesCopy(locale).aLaCarte.items.map(item => {
      const scene = aLaCarteVisual(item.id, locale);
      expect(html).toContain(escape(item.title));
      if (item.note) expect(html).toContain(escape(item.note));
      // A service with its own page links there; one without a page is a
      // quote request and opens WhatsApp with the service already named, like
      // every other quote action on the home (lib/quote-cta.ts). The `_whatsapp`
      // suffix is what scripts/service-cta-dashboard.mjs reads as a contact CTA.
      if (item.href) {
        expect(html).toContain(`href="${item.href}"`);
        expect(html).toContain(`data-cta="a_la_carte_${item.id}"`);
      } else {
        expect(html).toContain('href="https://wa.me/13054974478?text=');
        expect(html).toContain(`data-cta="a_la_carte_${item.id}_whatsapp"`);
        expect(html).toContain(escape(`${quoteCtaLabel(locale)}: ${item.title}`));
      }
      expect(html).toContain(escape(scene.preparation));
      return createHash("sha256").update(readFileSync(`public${scene.image}`)).digest("hex");
    });
    expect(new Set(hashes).size).toBe(6);
    expect(html).toContain("<noscript>");
    expect(html).toContain(locale === "es" ? "Ilustraciones conceptuales creadas con IA." : "Concept illustrations created with AI.");
  });

  it("serves all plan prices, terms and exact quote messages before JavaScript", () => {
    const html = renderToStaticMarkup(React.createElement(RealEstatePlansSection, { locale }));
    const c = realEstatePlansCopy(locale);
    for (const plan of REAL_ESTATE_PLANS) {
      expect(html).toContain(`data-plan="${plan.id}"`);
      expect(html).toContain(plan.price.toLocaleString("en-US"));
      expect(html).toContain(escape(whatsappHref(site.phone.e164, c.whatsapp(realEstatePlanName(plan.id)))));
      expect(html).toContain(`data-cta="real_estate_plan_${plan.id}_whatsapp"`);
    }
    for (const term of [...realEstateTerms(locale), ...c.everyPlan.items]) expect(html).toContain(escape(term));
    expect(html.match(/class="em-plan-details"/g)).toHaveLength(3);
    expect(html).not.toMatch(/<article[^>]*hidden/); // All plans work without hydration.
    expect(html).toContain(locale === "es" ? "Planes mensuales de bienes raíces." : "Monthly real estate plans.");
    expect(html).toContain(locale === "es" ? "Solo para bienes raíces" : "Real estate only");
    expect(html).toContain('class="em-plan-pricing-link"');
  });
});

it("keeps the secondary per-shoot action compact and removes the decorative chapter stripe", () => {
  const start = illustratedCss.indexOf(".em-plan-pricing-link{");
  const rule = illustratedCss.slice(start, illustratedCss.indexOf("}", start) + 1);
  expect(start).toBeGreaterThan(-1);
  expect(rule).not.toMatch(/border(?:-radius)?:/);
  expect(illustratedCss).not.toContain("border-block:5px solid #bd694d");
});

it("ties three different creative files to the source property counts and drone inclusion", () => {
  const hashes = REAL_ESTATE_PLANS.map(plan => {
    const visual = REAL_ESTATE_PLAN_VISUALS[plan.id];
    expect(visual.illustratedProperties).toBe(plan.properties);
    expect(visual.includedDrone).toBe(plan.drone === "included");
    return createHash("sha256").update(readFileSync(`public${visual.image}`)).digest("hex");
  });
  expect(new Set(hashes).size).toBe(REAL_ESTATE_PLANS.length);
});
