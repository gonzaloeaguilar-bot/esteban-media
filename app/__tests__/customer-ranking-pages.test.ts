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
      "Video editing, AI-assisted content, and social production.",
    );
    expect(hero).toContain(
      "Clear creative support, from your footage to ready-to-publish content.",
    );
    expect(hero).toContain("We provide video editing services");
    expect(hero).toContain("Video production is scoped when the project calls for it.");
    expect(hero).toContain(
      "Edición de video, contenido asistido por IA y producción para redes.",
    );
    expect(services).toContain("website-design");
    expect(services).toContain("Digital systems");
    expect(spanishHome).toContain("diseno-web");
    expect(spanishHome).toContain("/es/servicios#${service.id}");
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
    const nicheSchema = source("lib/spanish-site.ts");

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
      "produccion-de-video-doral-miami",
      "video-inmobiliario-coral-gables",
      "video-para-yates-y-hospitalidad-fort-lauderdale",
      "video-corporativo-distrito-financiero-miami",
      "video-para-pequenos-negocios-pembroke-pines",
      "marketing-de-video-para-cirugia-plastica-miami",
      "fotografia-de-joyas-y-lujo-miami",
      "marketing-de-video-para-gimnasios-miami",
      "videografo-para-eventos-corporativos-miami",
      "marketing-de-video-automotriz-miami",
      "produccion-de-video-para-hoteles-miami",
      "edicion-de-video-podcast-miami",
      "editor-de-video-ugc-para-ecommerce",
      "video-para-arquitectura-y-diseno-miami",
      "marketing-de-video-para-spas-y-bienestar-miami",
      "edicion-de-video-para-eventos-miami",
      "produccion-de-video-de-marca-miami",
      "produccion-de-video-para-entrenadores-personales-miami",
      "edicion-de-video-promocional-para-restaurantes-miami",
      "produccion-de-video-para-firmas-de-abogados-miami",
      "marketing-de-video-para-alquiler-de-yates-miami",
      "marketing-de-video-para-odontologia-estetica-miami",
      "edicion-de-video-para-discotecas-y-eventos-miami",
      "marketing-de-video-para-contratistas-de-techos-florida",
      "produccion-de-video-para-asesores-financieros-miami",
      "edicion-de-video-para-hoteles-boutique-miami",
      "editor-de-video-de-productos-para-ecommerce",
      "edicion-de-video-para-joyeria-de-lujo-miami",
      "edicion-de-video-aereo-inmobiliario-miami",
      "edicion-de-video-miami-beach",
      "video-inmobiliario-aventura-miami",
      "video-creativo-wynwood-miami",
      "edicion-de-video-corporativo-weston",
      "video-de-marca-de-lujo-jupiter",
      "video-para-negocios-hollywood-fl",
      "produccion-de-video-delray-beach",
      "video-inmobiliario-sunny-isles",
      "edicion-de-video-palm-beach-gardens",
      "produccion-de-video-davie-fl",
      "servicio-de-edicion-de-video-para-youtube-miami",
      "editor-de-video-para-anuncios-de-tiktok-miami",
      "edicion-de-video-para-cursos-online",
      "edicion-de-video-de-capacitacion-corporativa-miami",
      "editor-de-video-para-campanas-de-crowdfunding",
      "edicion-de-video-con-dron-miami",
      "postproduccion-de-videos-musicales-miami",
      "edicion-de-clips-para-webinars",
      "produccion-masiva-de-video-para-redes-miami",
      "servicio-de-edicion-de-entrevistas-de-video",
    ]) {
      expect(niche).toContain(`"${slug}"`);
    }
    expect(niche).toContain("/es/portafolio/bar-door-monkey");
    expect(niche).toContain("/es/portafolio/healthy-smile");
    expect(niche).toContain(
      "/es/contacto?source=pembroke-pines-small-business-video",
    );
    expect(niche).toContain(
      "No se presenta como un proyecto realizado en Pembroke Pines",
    );
    expect(niche).toContain("/es/portafolio/homeowners");
    expect(niche).toContain("/es/portafolio/my-dler");
    expect(niche).toContain("/es/portafolio/ml-colombia");
    expect(niche).toContain("/es/areas#miami-dade");
    expect(niche).toContain("/es/areas#fort-lauderdale");
    expect(niche).toContain("/es/guias");
    expect(nicheSchema).toContain("BreadcrumbList");
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

  it("bridges priority service pages to matching published case studies and contact paths in EN and ES", () => {
    const cosmeticDentistry = source("app/(english)/services/cosmetic-dentistry-video-marketing-miami/page.tsx");
    const videoEditingPb = source("app/(english)/services/video-editing-palm-beach-gardens/page.tsx");
    const crowdfunding = source("app/(english)/services/crowdfunding-video-editor-miami/page.tsx");
    const yachtHospitality = source("app/(english)/services/yacht-hospitality-video-fort-lauderdale/page.tsx");
    const spanishNiche = source("components/spanish-niche-page.tsx");

    // EN portfolio links
    expect(cosmeticDentistry).toContain('href="/portfolio/healthy-smile"');
    expect(cosmeticDentistry).toContain('href="/contact"');

    expect(videoEditingPb).toContain('href="/portfolio/homeowners"');
    expect(videoEditingPb).toContain('href="/contact"');

    expect(crowdfunding).toContain('href="/portfolio/my-dler"');
    expect(crowdfunding).toContain('href="/contact"');

    expect(yachtHospitality).toContain('href="/portfolio/banacol"');
    expect(yachtHospitality).toContain('href="/contact"');

    const sunnyIsles = source("app/(english)/services/real-estate-video-sunny-isles/page.tsx");
    const coralGables = source("app/(english)/services/real-estate-video-coral-gables/page.tsx");
    const aventura = source("app/(english)/services/real-estate-video-aventura-miami/page.tsx");
    const droneVideo = source("app/(english)/services/real-estate-drone-video-editing-miami/page.tsx");
    const architecture = source("app/(english)/services/architecture-design-video-miami/page.tsx");
    const footer = source("components/site-footer-client.tsx");

    expect(sunnyIsles).toContain('href="/portfolio/homeowners"');
    expect(coralGables).toContain('href="/portfolio/homeowners"');
    expect(aventura).toContain('href="/portfolio/homeowners"');
    expect(droneVideo).toContain('href="/portfolio/homeowners"');
    expect(architecture).toContain('href="/portfolio/homeowners"');
    expect(footer).toContain('href: "/portfolio/homeowners"');
    expect(footer).toContain('href: "/es/portafolio/homeowners"');
    expect(footer).toContain('href: "/portfolio/healthy-smile"');
    expect(footer).toContain('href: "/es/portafolio/healthy-smile"');

    const plasticSurgery = source("app/(english)/services/plastic-surgery-video-marketing-miami/page.tsx");
    const wellnessSpa = source("app/(english)/services/wellness-spa-video-marketing-miami/page.tsx");
    const smallBusinessHollywood = source("app/(english)/services/small-business-video-hollywood-fl/page.tsx");
    const smallBusinessPines = source("app/(english)/services/small-business-video-pembroke-pines/page.tsx");
    const brandVideo = source("app/(english)/services/brand-video-production-miami/page.tsx");
    const interviewVideo = source("app/(english)/services/interview-video-editing-service/page.tsx");

    expect(plasticSurgery).toContain('href="/portfolio/healthy-smile"');
    expect(wellnessSpa).toContain('href="/portfolio/healthy-smile"');
    expect(smallBusinessHollywood).toContain('href="/portfolio/healthy-smile"');
    expect(smallBusinessPines).toContain('href="/portfolio/healthy-smile"');
    expect(brandVideo).toContain('href="/portfolio/healthy-smile"');
    expect(interviewVideo).toContain('href="/portfolio/healthy-smile"');

    // ES portfolio links via nicheLinkContext
    expect(spanishNiche).toContain('"marketing-de-video-para-odontologia-estetica-miami"');
    expect(spanishNiche).toContain('/es/portafolio/healthy-smile');

    expect(spanishNiche).toContain('"edicion-de-video-palm-beach-gardens"');
    expect(spanishNiche).toContain('/es/portafolio/homeowners');

    expect(spanishNiche).toContain('"editor-de-video-para-campanas-de-crowdfunding"');
    expect(spanishNiche).toContain('/es/portafolio/my-dler');

    expect(spanishNiche).toContain('"video-para-yates-y-hospitalidad-fort-lauderdale"');
    expect(spanishNiche).toContain('/es/portafolio/banacol');
  });
});
