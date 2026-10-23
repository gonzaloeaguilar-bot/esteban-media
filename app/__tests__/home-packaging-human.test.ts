import React from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ClosingCredits, PackagesSection } from "@/components/packages-section";
import { ContactCta } from "@/components/contact-cta";
import { HomePathFunnel } from "@/components/home-path-funnel";
import { HomeProjectPath } from "@/components/home-project-path";
import { AUDIENCE_LANES } from "@/lib/audience-lanes";
import { laneFunnelPrice, laneOffers } from "@/lib/chooser-lane-pricing";

// Homepage human audit, 2026-10-14: the chooser was clear but the packaging
// after it still confused. Each block pins one of the eight ranked fixes so a
// later "tidy-up" cannot quietly put the problem back.

const read = (path: string) => readFileSync(join(process.cwd(), path), "utf8");
const text = (html: string) =>
  html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ");

for (const locale of ["en", "es"] as const) {
  const growth = locale === "en" ? "Growth" : "Crecimiento";
  const path = renderToStaticMarkup(React.createElement(HomeProjectPath, { locale }));
  const funnel = renderToStaticMarkup(
    React.createElement(HomePathFunnel, {
      locale,
      open: true,
      laneId: "local-business",
      laneLabel: "Short videos for my business",
      price: laneFunnelPrice(locale, "local-business"),
      onClose: () => {},
    }),
  );

  describe(`home ${locale}: packaging after the chooser`, () => {
    it("1. each buying route keeps its canonical prices in its server-rendered route", () => {
      const prices = laneOffers(locale, "local-business").map((o) => o.price).join(" ");
      expect(prices).toContain("$640");
      expect(prices).toContain("$800");
      expect(path).toMatch(/em-path-offer-price[^>]*>(From|Desde) \$640\/(mo|month|mes)</);
      expect(path).toMatch(/em-path-offer-price[^>]*>(From|Desde) \$800\/[^<]+</);
    });

    it("1b. four human buying routes expand in place and no parallel one-off card remains", () => {
      expect((path.match(/em-route-card"/g) ?? [])).toHaveLength(4);
      expect(path).not.toContain("em-single-project-entry");
      expect(path).toContain(locale === "en" ? "Productions and events" : "Producciones y eventos");
      expect(path).toContain(locale === "en" ? "Local businesses" : "Negocios locales");
      const css = read("app/illustrated-commercial.css");
      expect(css).toContain(".em-route-card>summary");
    });

    it("1b1. desktop route cards reserve separate tracks for copy, artwork, and the control", () => {
      const css = read("app/illustrated-commercial.css");
      expect(css).toContain("grid-template-columns:minmax(0,1fr) 82px 28px");
      expect(css).toContain(".em-route-card__visual{position:relative");
      expect(css).toContain(".em-route-card__plus{position:relative");
    });

    it("1b2. gives the decorative lens an on-screen idle focus loop without moving for reduced-motion visitors", () => {
      const component = read("components/home-project-path.tsx");
      const css = read("app/illustrated-commercial.css");
      expect(component).toContain("IntersectionObserver");
      expect(component).toContain('data-lens-idling={lensInView || undefined}');
      expect(component).toContain('prefers-reduced-motion: reduce');
      expect(css).toContain("em-camera-idle-focus 8s");
      expect(css).toContain("@keyframes em-camera-idle-focus");
      expect(css).toContain("@media(prefers-reduced-motion:reduce)");
    });

    it("1b3. keeps monthly Real Estate terms with the monthly plans, not the individual services", () => {
      const terms = locale === "es" ? "Condiciones de los planes mensuales" : "Monthly Real Estate plan terms";
      const clarification = locale === "es"
        ? "Aplica solo a los planes mensuales de arriba, no a los servicios individuales."
        : "Applies only to the monthly plans above, not to individual services.";
      const individualServices = locale === "es" ? "También puedes pedir" : "You can also request";
      const realEstateStart = path.indexOf('data-route="real-estate"');
      const realEstateEnd = path.indexOf('data-route="editing"');
      const realEstate = path.slice(realEstateStart, realEstateEnd);
      expect(realEstate).toContain(terms);
      expect(realEstate).toContain(clarification);
      expect(realEstate.indexOf(terms)).toBeLessThan(realEstate.indexOf(individualServices));
      expect(realEstate).not.toContain(locale === "es" ? "Adicionales y condiciones de Real Estate" : "Real estate add-ons and terms");
    });

    it("1c. creator filming stays with creators, business filming stays with local packages, and events keep their specific services", () => {
      const component = read("components/home-project-path.tsx");
      expect(component).toContain('{ id: "production", offerIds: [], serviceIds: ["multicam", "yate", "kickstarter"]');
      expect(component).toContain('{ id: "local-business", offerIds: ["crecimiento", "presencia-local", "todo-incluido"]');
      expect(component).toContain('data-lane="creator-filming"');
      expect(component).toContain('name={`route-offer-${locale}-${route.id}`}');
      expect(component).toContain('name={`route-service-${locale}-${route.id}`}');
      expect(component).toContain('onToggle={resetRouteWhenClosed}');
      expect(read("app/illustrated-commercial.css")).toContain('em-route-card:has(.em-path-offer-details[open],.em-single-item[open]) .em-route-main-cta{display:none}');
      expect(path).toMatch(/data-route="local-business"[\s\S]*em-path-offer-name">(Growth|Crecimiento)</);
      expect(path).toMatch(/data-route="local-business"[\s\S]*em-path-offer-name">(Local Presence|Presencia Local)</);
      expect(path).not.toContain(locale === "es" ? "Ver ejemplo de contenido" : "See a content example");
    });

    it("1c2. production uses the same card grammar and explains commercial scopes only after opening", () => {
      const productionStart = path.indexOf('data-route="production"');
      const productionEnd = path.indexOf('data-route="local-business"');
      const production = path.slice(productionStart, productionEnd);
      expect(production).toContain(locale === "es" ? "Elige la producción que necesitas" : "Choose the production you need");
      expect(production).toContain(locale === "es" ? "Ver qué enviar" : "See what to send");
      expect(production).toContain(locale === "es" ? "Pedir cotización" : "Request a quote");
      expect(production).not.toContain(locale === "es" ? "También puedes pedir" : "You can also request");
      expect(production).not.toContain("em-single-item");
      expect(production).toContain("em-path-offer-details");
      expect(production).toContain(locale === "es" ? "Demo, brand film o producción con actores y estudio." : "Demo, brand film, or a production with actors and studio.");
      expect(production).toContain(locale === "es" ? "Elige el alcance al cotizar:" : "Choose the scope when you quote it:");
      expect(production).not.toContain(locale === "es" ? "Demo básico $1,000 · Brand film $3,000 · Actores y estudio $6,500+" : "Basic demo $1,000 · Brand film $3,000 · Actors and studio $6,500+");
    });

    it("1d. the content creator route shows editing, a filming day, and scoped-project choices together", () => {
      expect(path).toMatch(/data-route="editing"[\s\S]*\$100[\s\S]*\$85[\s\S]*\$160/);
      expect(path).toMatch(/data-route="editing"[\s\S]*(Content creator|Creador de contenido)/);
      expect(path).toMatch(/data-route="editing"[\s\S]*(Film content with me|Grabemos tu contenido)[\s\S]*\$400/);
      expect(path).toContain(locale === "es" ? "Video largo o proyecto a medida" : "Long video or custom project");
      expect(path).toContain(locale === "es" ? "Pedir cotización por proyecto" : "Request a project quote");
      expect(path).not.toContain(locale === "es" ? "Ver el proceso de edición" : "See the editing process");
      const editingStart = path.indexOf('data-route="editing"');
      const editingEnd = path.indexOf('data-route="production"');
      const editing = path.slice(editingStart, editingEnd);
      expect(editing).not.toContain("em-route-main-cta");
      expect(editing).not.toContain('em-route-card__label">Packages');
      expect(editing).not.toContain('em-route-card__label">Paquetes');
      expect(editing).not.toContain(">Starter<");
    });

    it("3. every package is in the server-rendered chooser, even when not selected", () => {
      const names = locale === "en" ? ["Growth", "Local Presence", "All-In", "Essential"] : ["Crecimiento", "Presencia Local", "Todo Incluido", "Essential"];
      for (const name of names) expect(path, name).toContain(`em-path-offer-name">${name}<`);
    });

    it("4. the funnel is one step: the choice and price sit above the fields, no Continue tap", () => {
      expect(funnel).not.toContain("home_path_funnel_continue");
      expect(funnel.indexOf("em-funnel-summary")).toBeGreaterThan(-1);
      expect(funnel.indexOf("em-funnel-summary")).toBeLessThan(funnel.indexOf("<input"));
      expect(funnel).toContain(growth);
      expect(funnel).toContain("$640");
      expect(funnel).toContain("$800");
      expect(funnel).toContain('data-cta="home_path_funnel_direct_whatsapp"');
      expect(funnel).toContain(locale === "es" ? "Escribirle a Esteban por WhatsApp" : "Message Esteban on WhatsApp instead");
    });

    it("5. funnel inputs carry the right keyboard and autofill hints; no jargon label", () => {
      expect(funnel).toMatch(/type="email"/);
      expect(funnel).toMatch(/type="tel"/);
      for (const token of ["name", "email", "tel"]) expect(funnel).toMatch(new RegExp(`autoComplete="${token}"`, "i"));
      expect(funnel).not.toMatch(/Recording|Grabando|Captured|Capturado/);
      const css = read("app/illustrated-commercial.css");
      expect(css).toMatch(/\.em-funnel-field input\{[^}]*font-size:16px/);
      expect(css).toMatch(/\.em-funnel-close\{[^}]*min-height:44px;min-width:44px/);
    });

    it("6. the editing option is not labelled for agencies only, and links to Starter pricing", () => {
      const agency = AUDIENCE_LANES[locale].lanes.find((l) => l.id === "agency")!;
      expect(agency.who).not.toMatch(/Agency or studio|Agencia o estudio/);
      expect(agency.href).toBe(locale === "en" ? "/pricing/starter" : "/es/precios/arranque");
    });

    it("7. no copy points at things that do not exist", () => {
      const t = text(path);
      expect(t).not.toMatch(/full terms below|condiciones completas abajo/i);
      expect(t).not.toMatch(/Choose a package|Elige un paquete/i);
    });

    it("8. every chooser image has alt text", () => {
      const imgs = path.match(/<img[^>]*>/g) ?? [];
      expect(imgs.length).toBeGreaterThan(0);
      for (const img of imgs) expect(img, img).toMatch(/alt="[^"]+"/);
    });

    it("2. one contact section: one quote explainer, no closing ask, one primary + one secondary action", () => {
      const home = [
        renderToStaticMarkup(React.createElement(ContactCta, { locale })),
        renderToStaticMarkup(
          React.createElement(PackagesSection, { locale, showRealEstatePlans: false, quiet: true, showGuide: false, showALaCarte: false, showProcess: false }),
        ),
        renderToStaticMarkup(React.createElement(ClosingCredits, { locale, linksOnly: true }, React.createElement("nav", { className: "em-close__hubs" }))),
      ].join("\n");
      expect(home).not.toMatch(/quote in 3 steps|cotización en 3 pasos|Ready to make something great|¿Listo para crear algo/i);
      expect(home).not.toContain("quote_process");
      expect(home).toContain("em-close__hubs");
      // PackagesSection may carry its own quiet WhatsApp text links; the contact
      // block itself is exactly one WhatsApp and one mailto.
      const contact = renderToStaticMarkup(React.createElement(ContactCta, { locale }));
      expect((contact.match(/wa\.me/g) ?? []).length).toBe(1);
      expect((contact.match(/href="mailto:/g) ?? []).length).toBe(1);
      // /pricing keeps the explainer: it has no contact section above it.
      expect(renderToStaticMarkup(React.createElement(PackagesSection, { locale }))).toContain("quote_process");
    });
  });
}
