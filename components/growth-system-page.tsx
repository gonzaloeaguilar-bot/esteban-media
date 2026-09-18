import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

import { Container } from "@/components/ui/container";
import type { GrowthSystem } from "@/lib/growth-systems";
import { absoluteUrl, site } from "@/lib/site";

export function GrowthSystemPage({
  system,
  locale,
}: {
  system: GrowthSystem;
  locale: "en" | "es";
}) {
  const spanish = locale === "es";
  const path = spanish
    ? `/es/${system.spanishSlug}`
    : `/services/${system.slug}`;
  const servicePath = spanish ? "/es/servicios" : "/services";
  const homePath = spanish ? "/es" : "/";
  const title = spanish ? system.spanishTitle : system.title;
  const eyebrow = spanish ? system.spanishEyebrow : system.eyebrow;
  const lead = spanish ? system.spanishLead : system.lead;
  const includes = spanish ? system.spanishIncludes : system.includes;
  const boundaries = spanish ? system.spanishBoundaries : system.boundaries;
  const proofLabel = spanish ? system.proof.spanishLabel : system.proof.label;
  const proofHref = spanish ? `/es${system.proof.href}`.replace("/es/areas", "/es/areas").replace("/es/assessment", "/es/evaluacion").replace("/es/portfolio", "/es/portafolio") : system.proof.href;
  const Icon = system.icon;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": absoluteUrl(`${path}#service`),
        name: title,
        description: spanish ? system.spanishDescription : system.description,
        serviceType: title,
        provider: {
          "@type": "LocalBusiness",
          "@id": absoluteUrl("/#business"),
          name: site.name,
          url: absoluteUrl("/"),
          telephone: site.phone.e164,
        },
        areaServed: "Fort Lauderdale, Broward County, Miami-Dade, and Palm Beach County",
      },
      {
        "@type": "BreadcrumbList",
        "@id": absoluteUrl(`${path}#breadcrumbs`),
        itemListElement: [
          { "@type": "ListItem", position: 1, name: spanish ? "Inicio" : "Home", item: absoluteUrl(homePath) },
          { "@type": "ListItem", position: 2, name: spanish ? "Servicios" : "Services", item: absoluteUrl(servicePath) },
          { "@type": "ListItem", position: 3, name: title, item: absoluteUrl(path) },
        ],
      },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20">
        <Container size="xl">
          <nav aria-label={spanish ? "Migas de pan" : "Breadcrumbs"} className="mb-8 text-sm text-[#5a6066]">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href={homePath} className="hover:text-[#9f3c27]">{spanish ? "Inicio" : "Home"}</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href={servicePath} className="hover:text-[#9f3c27]">{spanish ? "Servicios" : "Services"}</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">{title}</li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.78fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-[#5a6066]">{eyebrow}</p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">{title}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-[#252a2d]">{lead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={spanish ? "/es/contacto" : "/contact"} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#c84a2c] px-6 text-sm font-medium text-white hover:bg-[#a93e29]">
                  {spanish ? "Hablar del proyecto" : "Discuss your project"}<ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link href={servicePath} className="inline-flex min-h-12 items-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]">
                  {spanish ? "Ver todos los sistemas" : "View all systems"}
                </Link>
              </div>
            </div>
            <aside className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 shadow-sm">
              <Icon className="size-9 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">{spanish ? "Qué puede incluir" : "What can be in scope"}</h2>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-[#252a2d]">
                {includes.map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#c84a2c]" aria-hidden="true" />{item}</li>)}
              </ul>
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-b border-[#ddd4c8] py-14 sm:py-20">
        <Container size="xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_.78fr]">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-[#5a6066]">{spanish ? "Prueba relacionada" : "Related proof"}</p>
              <h2 className="mt-3 font-serif text-4xl leading-tight">{spanish ? "Conecta la oferta con trabajo publicado." : "Connect the offer to published work."}</h2>
              <p className="mt-4 max-w-2xl leading-7 text-[#252a2d]">{spanish ? "Revisamos el sistema que realmente hace falta, no una lista obligatoria de herramientas. La prueba publicada ayuda a iniciar una conversación concreta." : "We scope the system a business actually needs, not a compulsory list of tools. Published proof helps start a concrete conversation."}</p>
              <Link href={proofHref} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27] underline underline-offset-4">{proofLabel}<ArrowRight className="size-4" aria-hidden="true" /></Link>
            </div>
            <aside className="rounded-lg border border-[#ddd4c8] bg-white/50 p-6">
              <ShieldCheck className="size-7 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-4 font-serif text-3xl">{spanish ? "Límites claros" : "Clear delivery boundaries"}</h2>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-[#252a2d]">
                {boundaries.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}
