import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ALaCarteSection } from "@/components/a-la-carte-section";
import { ClientReviews } from "@/components/client-reviews";
import { HeroVideo } from "@/components/hero-video";
import { ClosingCredits, PackagesSection } from "@/components/packages-section";
import { RealEstatePlansSection } from "@/components/real-estate-plans-section";
import { RealEstateReels } from "@/components/real-estate-reels";
import { googleReviewSnapshot } from "@/lib/client-reviews";
import { packageFaq } from "@/lib/packages";
import { QUOTE_CTA_LABEL } from "@/lib/quote-cta";

/**
 * One primary action on the home, worded once (2026-10-10 UX review).
 *
 * Every quote/contact action opens WhatsApp and reads QUOTE_CTA_LABEL; the
 * labels it replaced must not come back one section at a time. The hero's
 * primary action is deliberately a chooser anchor, so it is tested separately.
 */
const render = (el: React.ReactElement) => renderToStaticMarkup(el);
const RETIRED = {
  en: ["Start a video project", "See packages &amp; prices", "Ask about a project", "Message on WhatsApp", "Text Esteban", "Quote on WhatsApp", "Start on WhatsApp"],
  es: ["Consultar proyecto de video", "Ver paquetes y precios", "Consultar proyecto", "Escribir por WhatsApp", "Mándale un WhatsApp a Esteban", "Empezar por WhatsApp"],
} as const;

describe.each(["en", "es"] as const)("home quote actions (%s)", (locale) => {
  const label = QUOTE_CTA_LABEL[locale];
  const sections = {
    hero: render(React.createElement(HeroVideo, { locale })),
    packages: render(React.createElement(PackagesSection, { locale })),
    closing: render(React.createElement(ClosingCredits, { locale })),
    plans: render(React.createElement(RealEstatePlansSection, { locale })),
    carte: render(React.createElement(ALaCarteSection, { locale })),
    reels: render(React.createElement(RealEstateReels, { locale })),
  };

  it("uses the one label, on WhatsApp, with a `_whatsapp` data-cta", () => {
    for (const [name, html] of Object.entries(sections)) {
      expect(html, name).toContain(label);
      // Every element carrying the label is a wa.me link whose data-cta ends
      // in _whatsapp, which is how scripts/service-cta-dashboard.mjs counts it.
      for (const m of html.matchAll(/<a\b([^>]*)>(?:(?!<\/a>)[\s\S])*?<\/a>/g)) {
        if (!m[0].includes(`>${label}<`) && !m[0].includes(`${label}<svg`) && !m[0].endsWith(`${label}</a>`)) continue;
        expect(m[1], `${name}: ${m[0].slice(0, 120)}`).toContain('href="https://wa.me/');
        expect(m[1], `${name}: ${m[0].slice(0, 120)}`).toMatch(/data-cta="[\w-]+_whatsapp"/);
      }
    }
    expect(sections.hero).toContain('data-cta="hero_whatsapp"');
    expect(sections.hero).toContain('data-cta="hero_choose_package"');
    expect(sections.hero).toContain('href="#start"');
    expect(sections.closing).toContain('data-cta="closing_whatsapp"');
  });

  it("retires the competing labels", () => {
    for (const [name, html] of Object.entries(sections)) {
      for (const old of RETIRED[locale]) expect(html, `${name} still says "${old}"`).not.toContain(`>${old}<`);
    }
  });

  it("drops the per-card WhatsApp buttons from the reel shelf, keeping one section CTA", () => {
    expect(sections.reels).not.toContain('data-rail-cta="secondary"');
    expect(sections.reels.match(new RegExp(`>${label}<`, "g"))).toHaveLength(1);
    expect(sections.reels).toContain(
      `href="${locale === "es" ? "/es/editor-de-video-real-estate-miami" : "/services/real-estate-reels-video-editor-south-florida"}"`,
    );
  });

  it("keeps the FAQ in first/second person, matching its FAQPage schema", () => {
    for (const q of packageFaq(locale)) {
      expect(q.question).not.toMatch(/Esteban|\bhe\b|¿Puede |¿Tiene /);
      expect(sections.packages).toContain(q.question.replace(/'/g, "&#x27;"));
    }
  });
});

describe.each(["en", "es"] as const)("client reviews fine print (%s)", (locale) => {
  const html = render(React.createElement(ClientReviews, { locale }));
  it("keeps the verification and the link, drops the copy written for search engines", () => {
    // The verification claim moved into the HEADING so the page stops saying
    // "verified ... on Google" twice (owner, 2026-10-13: "you say verified on
    // google 2x basically"). What this test protects is unchanged: the page
    // must still SAY the reviews are verified on Google, and each card must
    // still name its source. Only the wording of each half changed.
    expect(html).toContain(locale === "es" ? "perfil verificado de Google" : "my verified Google profile");
    expect(html).toContain(locale === "es" ? "Reseña de Google" : "Google review");
    // The perfect score is a fact from data/google-reviews.json (rating 5,
    // 11 reviews, every individual review a 5, read 2026-10-08). If the real
    // rating ever drops below 5, this assertion must fail loudly rather than
    // let the page keep claiming a perfect score.
    expect(googleReviewSnapshot.rating).toBe(5);
  });

  // The homepage band is a DIFFERENT variant of the same component, and it is
  // the one the owner was looking at. Assert it separately: a variant fix is
  // not a component fix.
  it("states verified client feedback once, in the home band", () => {
    const compactHtml = render(React.createElement(ClientReviews, { locale, compact: true }));
    expect(compactHtml).toContain(
      locale === "es"
        ? "Opiniones reales de clientes, verificadas en Google."
        : "Real client feedback, verified on Google.",
    );
    // Said ONCE: the old copy paired this heading with a "Verified on Google"
    // badge on every card.
    expect(compactHtml).not.toContain(locale === "es" ? "Verificado en Google" : "Verified on Google");
    for (const gone of ["typos and all", "written for the site", "rating markup", "Profile snapshot", "erratas", "markup de calificación", "Instantánea del perfil"]) {
      expect(html).not.toContain(gone);
    }
  });
});
