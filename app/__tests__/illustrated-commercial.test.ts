import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AudienceRouter } from "@/components/audience-router";
import { RealEstatePlansSection } from "@/components/real-estate-plans-section";
import { AUDIENCE_LANES } from "@/lib/audience-lanes";
import { REAL_ESTATE_PLANS } from "@/lib/pricing";
import { realEstatePlansCopy, realEstateTerms, realEstatePlanName } from "@/lib/real-estate-plans";
import { whatsappHref } from "@/lib/packages";
import { site } from "@/lib/site";

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/'/g, "&#x27;").replace(/"/g, "&quot;");

describe.each(["en", "es"] as const)("illustrated commercial content (%s)", locale => {
  it("keeps every audience destination and original explanation in served HTML", () => {
    const html = renderToStaticMarkup(React.createElement(AudienceRouter, { locale }));
    for (const lane of AUDIENCE_LANES[locale].lanes) {
      expect(html).toContain(`href="${lane.href}"`);
      expect(html).toContain(`data-cta="audience-${lane.id}"`);
      expect(html).toContain(escape(lane.detail));
    }
    for (const name of ["property", "business", "editing"]) expect(html).toContain(`/illustrations/${name}.webp`);
    expect(html).not.toContain("<iframe"); // Third-party video waits for an actual click.
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
  });
});
