import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function source(path: string) {
  return readFileSync(join(process.cwd(), path), "utf8");
}

describe("customer-facing ranking pages", () => {
  it("keeps the homepage H1 explicit and links every service card", () => {
    const hero = source("components/hero-video.tsx");
    const services = source("components/services-strip.tsx");
    const spanishHome = source("app/(spanish)/es/page.tsx");

    expect(hero).toContain(
      "Video editing and content production in Fort Lauderdale.",
    );
    expect(hero).toContain("We make things feel like a film.");
    expect(services).toContain("href={`/services#${service.id}`}");
    expect(spanishHome).toContain(
      "href={`/es/servicios#${service.id}`}",
    );
  });

  it("keeps gated travel and revision policies off public ranking copy", () => {
    const areaSources = [
      source("app/(english)/areas/page.tsx"),
      source("app/(spanish)/es/areas/page.tsx"),
      source("app/(english)/areas/palm-beach-county/page.tsx"),
      source("app/(spanish)/es/areas/palm-beach-county/page.tsx"),
      source("app/(english)/contact/page.tsx"),
      source("app/(spanish)/es/contacto/page.tsx"),
      source("public/llms.txt"),
    ].join("\n");

    for (const gatedCopy of [
      "20 miles",
      "20 millas",
      "travel fee",
      "cargo de traslado",
      "review rounds",
      "rondas de revisión",
      "Additional revisions",
      "revisiones adicionales",
    ]) {
      expect(areaSources).not.toContain(gatedCopy);
    }
  });

  it("connects every Spanish niche through direct project and area links", () => {
    const niche = source("components/spanish-niche-page.tsx");

    for (const slug of [
      "videografo-en-miami",
      "videografo-en-fort-lauderdale",
      "fotografo-en-fort-lauderdale",
      "reels-para-negocios-miami",
      "video-para-restaurantes-miami",
      "drone-real-estate-miami",
      "editor-de-video-real-estate-miami",
      "fotografia-de-producto-con-ia-miami",
      "imagenes-con-ia-para-ecommerce-miami",
      "marketing-de-video-para-dentistas-miami",
      "marketing-de-video-para-abogados-miami",
      "marketing-de-video-para-clinicas-esteticas-miami",
      "reutilizacion-de-contenido-para-redes-miami",
      "produccion-de-video-para-pequenos-negocios-miami",
      "fotos-con-ia-para-bienes-raices-miami",
      "fotografia-de-comida-con-ia-restaurantes",
      "marketing-de-video-para-contratistas-miami",
      "fotografo-de-retratos-y-headshots-miami",
      "editor-de-video-corto-para-redes-miami",
      "produccion-de-video-palm-beach-county",
      "edicion-de-video-palm-beach-county",
    ]) {
      expect(niche).toContain(`"${slug}"`);
    }
    expect(niche).toContain("/es/portafolio/bar-door-monkey");
    expect(niche).toContain("/es/portafolio/healthy-smile");
    expect(niche).toContain("/es/portafolio/homeowners");
    expect(niche).toContain("/es/portafolio/my-dler");
    expect(niche).toContain("/es/portafolio/ml-colombia");
    expect(niche).toContain("/es/areas#miami-dade");
    expect(niche).toContain("/es/areas#fort-lauderdale");
    expect(niche).toContain("/es/guias");
    expect(niche).toContain("BreadcrumbList");
  });

  it("names the same public founder on both localized About pages", () => {
    const english = source("app/(english)/about/page.tsx");
    const spanish = source("app/(spanish)/es/sobre-esteban/page.tsx");

    expect(english).toContain("Esteban Moreno López");
    expect(spanish).toContain("Esteban Moreno López");
    expect(english).toContain("buildProfilePageJsonLd");
    expect(spanish).toContain("buildProfilePageJsonLd");
  });

  it("keeps unsupported titles, offers, workflows, and sub-city coverage gated", () => {
    const publicCopy = [
      source("lib/site.ts"),
      source("lib/spanish-site.ts"),
      source("lib/entity-schema.ts"),
      source("public/llms.txt"),
      source("components/about-teaser.tsx"),
      source("components/services-strip.tsx"),
      source("components/spanish-niche-page.tsx"),
      source("app/(english)/about/page.tsx"),
      source("app/(spanish)/es/sobre-esteban/page.tsx"),
      source("app/(english)/services/page.tsx"),
      source("app/(spanish)/es/servicios/page.tsx"),
      source("app/(english)/areas/page.tsx"),
      source("app/(spanish)/es/areas/page.tsx"),
      source("app/(english)/areas/palm-beach-county/page.tsx"),
      source("app/(spanish)/es/areas/palm-beach-county/page.tsx"),
    ].join("\n");

    for (const gatedPhrase of [
      "audiovisual communicator",
      "comunicador audiovisual",
      "five years",
      "cinco años",
      "Boca Raton",
      "West Palm Beach",
      "Pompano Beach",
      "Brickell",
      "first cut",
      "primer corte",
      "review link",
      "enlace de revisión",
      "phone-based capture",
    ]) {
      expect(publicCopy.toLowerCase()).not.toContain(gatedPhrase.toLowerCase());
    }

    expect(publicCopy).toContain("pending-confirmation");
    expect(publicCopy.toLowerCase()).toContain("ruta educativa heredada");
  });
});
