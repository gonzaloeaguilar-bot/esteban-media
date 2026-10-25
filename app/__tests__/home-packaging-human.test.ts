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

    it("1b. seven human buying routes expand in place and no parallel one-off card remains", () => {
      expect((path.match(/em-route-card"/g) ?? [])).toHaveLength(7);
      expect(path).not.toContain("em-single-project-entry");
      expect(path).toContain(locale === "en" ? "Productions and events" : "Producciones y eventos");
      expect(path).toContain(locale === "en" ? "Local businesses" : "Negocios locales");
      expect(path).toContain(locale === "en" ? "AI agents and chatbots" : "Agentes de IA y chatbots");
      expect(path).toContain(locale === "en" ? "SEO, GEO and landing pages" : "SEO, GEO y landing pages");
      expect(path).toContain(locale === "en" ? "Websites and ecommerce" : "Sitios web y ecommerce");
      const css = read("app/illustrated-commercial.css");
      expect(css).toContain(".em-route-card>summary");
    });

    it("1b1. route cards use full-bleed work imagery while keeping copy and the control readable", () => {
      const css = read("app/illustrated-commercial.css");
      const component = read("components/home-project-path.tsx");
      expect(css).toContain(".em-route-card__visual{position:absolute;z-index:0;inset:0;width:auto");
      expect(css).toContain(".em-route-card__copy{position:relative;z-index:2");
      expect(css).toContain(".em-route-card__plus{position:absolute;z-index:3");
      expect(component).toContain('"web-commerce": "/portfolio/gains-from-geebs.jpg"');
      expect(component).toContain('src="/portfolio/geebs-ai-companion.png"');
      expect(component).not.toContain('"ai-agents": "/portfolio/ai-lead-automation.jpg"');
      expect(component).toContain('className="em-route-card__companion-stage"');
      expect(component).toContain('className="em-route-card__geebs-chat"');
      expect(component).toContain("hey, i&apos;m kris. what are we fixing first?");
      expect(component).toContain('className="em-route-card__companion-orbit"');
      expect(component).not.toContain("kris is thinking...");
      expect(css).toContain(".em-route-card__geebs-chat");
      expect(css).toContain("@keyframes em-companion-orbit");
      expect(css).toContain(".em-route-card__companion-orbit i{animation:none}");
      expect(component).toContain('src="/real-estate-reels/brickell-loop.mp4"');
      expect(component).toContain('src="/real-estate-reels/brickell-loop-poster.jpg"');
      expect(component).toContain('autoPlay loop muted playsInline preload="metadata"');
      expect(css).toContain('.em-route-card__real-estate-loop{display:none}');
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

    it("1b2a. lets the creator-card like send a contained burst of hearts upward", () => {
      const css = read("app/illustrated-commercial.css");
      const editingStart = path.indexOf('data-route="editing"');
      const editingEnd = path.indexOf('data-route="production"');
      const editing = path.slice(editingStart, editingEnd);
      expect(editing.match(/em-route-card__reel-heart-burst/g)).toHaveLength(1);
      expect(editing.match(/<svg/g)?.length).toBeGreaterThanOrEqual(5);
      expect(editing).toContain('class="em-route-card__reel-like-count"');
      expect(editing).toContain('+1.2K');
      expect(path).toContain('class="em-route-card__property-pin"');
      expect(path).toContain('class="em-route-card__recording-frames"');
      expect(path).toContain('class="em-route-card__local-signal-spark"');
      expect(css).toContain("@keyframes em-reel-heart-float");
      expect(css).toContain("@keyframes em-reel-like-count-one");
      expect(css).toContain("@keyframes em-reel-like-count-four");
      expect(css).toContain("-62px");
      expect(css).toContain(".em-route-card__reel-like-count span,.em-route-card__reel-heart-burst svg{animation:none}");
      expect(css).toContain("@keyframes em-property-pin-settle");
      expect(css).toContain("@keyframes em-record-frame");
      expect(css).toContain("@keyframes em-local-spark");
      expect(css).toContain(".em-route-card__companion-orbit i{animation:none}");
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
      expect(component).toContain('{ id: "local-business", offerIds: ["crecimiento", "presencia-local"]');
      expect(component).toContain('{ id: "ai-agents", offerIds: [], serviceIds: []');
      expect(component).toContain('{ id: "seo-landing", offerIds: [], serviceIds: []');
      expect(component).toContain('{ id: "web-commerce", offerIds: [], serviceIds: []');
      expect(component).toContain('data-lane="creator-filming"');
      expect(component).toContain('name={`route-offer-${locale}-${route.id}`}');
      expect(component).toContain('name={`route-service-${locale}-${route.id}`}');
      expect(component).toContain('onToggle={resetRouteWhenClosed}');
      expect(read("app/illustrated-commercial.css")).toContain('em-route-card:has(.em-path-offer-details[open],.em-single-item[open]) .em-route-main-cta{display:none}');
      expect(path).toMatch(/data-route="local-business"[\s\S]*em-path-offer-name">(Growth|Crecimiento)</);
      expect(path).toMatch(/data-route="local-business"[\s\S]*em-path-offer-name">(Local Presence|Presencia Local)</);
      const aiStart = path.indexOf('data-route="ai-agents"');
      const ai = path.slice(aiStart);
      expect(ai).toContain(locale === "es" ? "Chatbots con IA" : "AI chatbots");
      expect(ai).toContain(locale === "es" ? "Desde $2,000 de configuración + cuota mensual" : "From $2,000 setup + monthly fee");
      expect(ai).toContain(locale === "es" ? "Reporte semanal de dinero" : "Weekly money report");
      expect(ai).toContain(locale === "es" ? "$2,400 de configuración + $297/mes" : "$2,400 setup + $297/mo");
      expect(ai).toContain(locale === "es" ? "Tracker de operaciones" : "Operations tracker");
      expect(ai).toContain(locale === "es" ? "SEO y GEO" : "SEO and GEO");
      expect(ai).toContain(locale === "es" ? "Sitios web" : "Websites");
      const seoStart = path.indexOf('data-route="seo-landing"');
      const seoEnd = path.indexOf('data-route="web-commerce"');
      const seo = path.slice(seoStart, seoEnd);
      expect(seo).toContain(locale === "es" ? "Desde $1,800" : "From $1,800");
      expect(seo).toContain(locale === "es" ? "Desde $1,500 · 3–5 días hábiles" : "From $1,500 · 3–5 business days");
      expect(seo).toContain(locale === "es" ? "Sitio web y seguimiento de búsquedas" : "Website and search tracking");
      expect(seo).toContain(locale === "es" ? "Configuración de eventos de conversión" : "Conversion-event setup");
      const webStart = path.indexOf('data-route="web-commerce"');
      const web = path.slice(webStart);
      expect(web).toContain(locale === "es" ? "Desde $5,000" : "From $5,000");
      expect(web).toContain("$5,000+");
      expect(web).toContain(locale === "es" ? "Desde $280 / sesión" : "From $280 / session");
      expect(web).toContain(locale === "es" ? "$400–$775" : "$400–$775");
      expect(web).toContain(locale === "es" ? "Sesión de fotografía de producto" : "Product photography session");
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
      const names = locale === "en" ? ["Growth", "Local Presence", "Essential"] : ["Crecimiento", "Presencia Local", "Essential"];
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
