import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AudienceRouter } from "@/components/audience-router";
import { NeedsChooser } from "@/components/needs-chooser";
import { DOOR_ORDER } from "@/lib/needs-doors";
import { AUDIENCE_LANES } from "@/lib/audience-lanes";
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

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/'/g, "&#x27;").replace(/"/g, "&quot;");

describe.each(["en", "es"] as const)("illustrated commercial content (%s)", locale => {
  it("retains all single-service names, notes, destinations and preparation without client rendering", () => {
    const html = renderToStaticMarkup(React.createElement(ALaCarteSection, { locale }));
    const hashes = packagesCopy(locale).aLaCarte.items.map(item => {
      const scene = aLaCarteVisual(item.id, locale);
      expect(html).toContain(escape(item.title));
      if (item.note) expect(html).toContain(escape(item.note));
      expect(html).toContain(`href="${item.href ?? (locale === "es" ? "/es/contacto" : "/contact")}"`);
      expect(html).toContain(`data-cta="a_la_carte_${item.id}"`);
      expect(html).toContain(escape(scene.preparation));
      return createHash("sha256").update(readFileSync(`public${scene.image}`)).digest("hex");
    });
    expect(new Set(hashes).size).toBe(6);
    expect(html).toContain("<noscript>");
    expect(html).toContain(locale === "es" ? "Ilustraciones conceptuales creadas con IA." : "Concept illustrations created with AI.");
  });

  it("keeps every audience destination and original explanation in served HTML", () => {
    const html = renderToStaticMarkup(React.createElement(AudienceRouter, { locale }));
    for (const lane of AUDIENCE_LANES[locale].lanes) {
      expect(html).toContain(`href="${lane.href}"`);
      expect(html).toContain(`data-cta="audience-${lane.id}"`);
      expect(html).toContain(escape(lane.detail));
    }
    for (const name of ["property", "business", "editing"]) expect(decodeURIComponent(html)).toContain(`/illustrations/${name}.webp`);
    expect(html).not.toContain("<iframe"); // Third-party video waits for an actual click.
  });

  it("serves all plan prices, terms and exact quote messages before JavaScript", () => {
    // Since 2026-10-08 the monthly plans live behind the first door of the
    // needs chooser. A closed door only hides them visually: every price,
    // term and quote link is in the server HTML.
    const html = renderToStaticMarkup(React.createElement(NeedsChooser, { locale }));
    const c = realEstatePlansCopy(locale);
    for (const plan of REAL_ESTATE_PLANS) {
      expect(html).toContain(`data-plan="${plan.id}"`);
      expect(html).toContain(plan.price.toLocaleString("en-US"));
      expect(html).toContain(escape(whatsappHref(site.phone.e164, c.whatsapp(realEstatePlanName(plan.id)))));
      expect(html).toContain(`data-cta="real_estate_plan_${plan.id}_whatsapp"`);
      expect(html).toContain(encodeURIComponent(REAL_ESTATE_PLAN_VISUALS[plan.id].image));
    }
    for (const term of [...realEstateTerms(locale), ...c.everyPlan.items]) expect(html).toContain(escape(term));
    expect(html).not.toMatch(/<article[^>]*hidden/); // All plans work without hydration.
    // Real estate is the first door and the only highlighted one.
    const doors = [...html.matchAll(/data-door="([\w-]+)"/g)].map((m) => m[1]);
    expect(doors).toEqual(DOOR_ORDER);
    expect(html.match(/data-specialty="true"/g)).toHaveLength(1);
    expect(html.indexOf('data-specialty="true"')).toBeLessThan(html.indexOf('data-door="business"'));
    for (const id of DOOR_ORDER) expect(html).toContain(`data-cta="door_open_${id}"`);
  });
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
