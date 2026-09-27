// Everything the site search can reach. Built from the same data the pages are
// built from, never typed by hand, so a page cannot exist without being
// findable (and a finder row cannot point at a page that does not exist).

import type { RailFinderEntry } from "@/vendor/rail-kit/RailFinder";

import { growthSystems } from "@/lib/growth-systems";
import { packageAnchor, packagesFor, type Locale } from "@/lib/packages";
import { spanishNichePages } from "@/lib/spanish-site";

const CORE: Record<Locale, { id: string; title: string; href: string; keywords?: string[] }[]> = {
  es: [
    { id: "inicio", title: "Inicio", href: "/es" },
    { id: "paquetes", title: "Paquetes y precios", href: "/es#paquetes", keywords: ["precio", "cuanto cuesta", "tarifa", "cotizar"] },
    { id: "portafolio", title: "Portafolio", href: "/es/portafolio", keywords: ["trabajos", "videos", "ejemplos"] },
    { id: "casos", title: "Casos de estudio", href: "/es/casos-de-estudio" },
    { id: "servicios", title: "Servicios", href: "/es/servicios" },
    { id: "areas", title: "Áreas de servicio", href: "/es/areas", keywords: ["broward", "miami", "fort lauderdale"] },
    { id: "guias", title: "Guías prácticas de video", href: "/es/guias" },
    { id: "calculadora", title: "Calculadora de presupuesto", href: "/es/calculadora", keywords: ["presupuesto", "costo"] },
    { id: "sobre", title: "Sobre Esteban", href: "/es/sobre-esteban" },
    { id: "contacto", title: "Contacto", href: "/es/contacto", keywords: ["whatsapp", "llamar", "email"] },
  ],
  en: [
    { id: "home", title: "Home", href: "/" },
    { id: "packages", title: "Packages & prices", href: "/#packages", keywords: ["price", "cost", "rates", "quote"] },
    { id: "portfolio", title: "Portfolio", href: "/portfolio", keywords: ["work", "videos", "examples"] },
    { id: "cases", title: "Case studies", href: "/case-studies" },
    { id: "services", title: "Services", href: "/services" },
    { id: "areas", title: "Service areas", href: "/areas", keywords: ["broward", "miami", "fort lauderdale"] },
    { id: "guides", title: "Video guides", href: "/guides" },
    { id: "calculator", title: "Budget calculator", href: "/calculator", keywords: ["budget", "cost"] },
    { id: "about", title: "About Esteban", href: "/about" },
    { id: "contact", title: "Contact", href: "/contact", keywords: ["whatsapp", "call", "email"] },
  ],
};

export function searchEntries(locale: Locale): RailFinderEntry[] {
  const es = locale === "es";
  const home = es ? "/es" : "/";
  const out: RailFinderEntry[] = CORE[locale].map((c) => ({
    ...c,
    section: es ? "Sitio" : "Site",
  }));

  for (const pkg of packagesFor(locale)) {
    out.push({
      id: `pkg-${pkg.id}`,
      title: `${es ? "Paquete" : "Package"} ${pkg.name}`,
      summary: pkg.subtitle,
      href: `${home}#${packageAnchor(pkg.id)}`,
      section: es ? "Paquetes" : "Packages",
      keywords: [pkg.need.title, ...pkg.includes],
    });
  }

  for (const system of growthSystems) {
    out.push({
      id: `sys-${system.slug}`,
      title: es ? system.spanishTitle : system.title,
      href: es ? `/es/${system.spanishSlug}` : `/services/${system.slug}`,
      section: es ? "Sistemas digitales" : "Digital systems",
    });
  }

  if (es) {
    for (const page of spanishNichePages) {
      out.push({
        id: `nicho-${page.slug}`,
        title: page.title,
        summary: page.description,
        href: `/es/${page.slug}`,
        section: "Servicios por nicho y zona",
      });
    }
  }
  return out;
}
