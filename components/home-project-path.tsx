import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { AUDIENCE_LANES, type AudienceLocale } from "@/lib/audience-lanes";
import { packagesFor, priceFor } from "@/lib/packages";
import { packageRoutes } from "@/lib/package-routes";
import { usd } from "@/lib/pricing";

const copy = {
  en: {
    eyebrow: "Find your starting point",
    heading: "What do you need made?",
    intro: "Choose a project to see the relevant work and next steps.",
    labels: ["Reels for my properties", "Short videos for my business", "Edit footage I already have"],
    artAlts: [
      "Concept illustration of a home, camera and property photographs",
      "Concept illustration of a cafe being filmed on a phone",
      "Concept illustration of an editing desk with a monitor, filmstrip and headphones",
    ],
    pricing: "Starting prices",
    pricingDetail: "Choose a package to see everything included. Final pricing depends on the project scope.",
    pricingAction: "Compare packages",
    swipe: "Swipe to see all three options.",
    illustrationNote: "Homeowners is published work. The other two service choices are concept illustrations.",
    propertyProof: "Watch 6 property Reels",
    pricingHref: "/pricing",
    from: "From",
    custom: "Custom quote",
    units: { video: "/video", month: "/month", "production-day": "/production day" },
    localLinks: [
      { href: "/services/video-production-fort-lauderdale", label: "Film a video in Fort Lauderdale" },
      { href: "/services/reels-editor-fort-lauderdale", label: "Edit Reels in Fort Lauderdale" },
    ],
  },
  es: {
    eyebrow: "Encuentra por dónde empezar",
    heading: "¿Qué necesitas crear?",
    intro: "Elige un proyecto para ver trabajo relacionado y los próximos pasos.",
    labels: ["Reels para mis propiedades", "Videos cortos para mi negocio", "Editar videos que ya grabé"],
    artAlts: [
      "Ilustración conceptual de una casa, una cámara y fotografías de la propiedad",
      "Ilustración conceptual de un café grabado con un celular",
      "Ilustración conceptual de una mesa de edición con monitor, película y audífonos",
    ],
    pricing: "Precios para empezar",
    pricingDetail: "Elige un paquete para ver todo lo incluido. El precio final depende del alcance del proyecto.",
    pricingAction: "Comparar paquetes",
    swipe: "Desliza para ver las tres opciones.",
    illustrationNote: "Homeowners es trabajo publicado. Las otras dos opciones son ilustraciones conceptuales.",
    propertyProof: "Ver 6 Reels de propiedades",
    pricingHref: "/es/precios",
    from: "Desde",
    custom: "Cotización personalizada",
    units: { video: "/video", month: "/mes", "production-day": "/día de producción" },
    localLinks: [
      { href: "/es/produccion-de-video-fort-lauderdale", label: "Grabar video en Fort Lauderdale" },
      { href: "/es/editor-de-reels-fort-lauderdale", label: "Editar Reels en Fort Lauderdale" },
    ],
  },
} as const;

const artwork = ["property", "business", "editing"] as const;

export function HomeProjectPath({ locale }: { locale: AudienceLocale }) {
  const c = copy[locale];
  const lanes = AUDIENCE_LANES[locale].lanes;
  const packages = packagesFor(locale);

  return (
    <section id="start" aria-labelledby={`home-path-${locale}`} data-section="home-project-path" className="bg-[#f7f5f1] py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-medium uppercase tracking-wider text-[#9d3d2b]">{c.eyebrow}</p>
        <h2 id={`home-path-${locale}`} className="mt-2 font-serif text-4xl leading-tight sm:text-5xl">{c.heading}</h2>
        <p className="mt-2 max-w-2xl text-base leading-7 text-[#4d5358]">{c.intro}</p>
        <p className="mt-3 text-sm font-medium text-[#9d3d2b] sm:hidden">{c.swipe}</p>
        <div className="-mx-4 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
          {lanes.map((lane, index) => (
            <Link key={lane.id} href={index === 0 ? "#real-estate-reels-heading" : lane.href} data-cta={`home-path-${lane.id}`} className="group min-w-[78%] snap-start overflow-hidden rounded-2xl border border-[#d3c3b2] bg-white transition hover:border-[#a93e29] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a93e29] sm:min-w-0">
              <span className="block overflow-hidden bg-[#f4ebdf]">
                <Image src={index === 0 ? "/portfolio/homeowners.jpg" : `/illustrations/${artwork[index]}.webp`} alt={index === 0 ? (locale === "es" ? "Fotograma del proyecto publicado Homeowners" : "Still from the published Homeowners project") : c.artAlts[index]} width={1536} height={1024} className={`aspect-[3/2] w-full transition duration-500 group-hover:scale-[1.02] ${index === 0 ? "object-cover" : "object-contain"}`} sizes="(min-width: 640px) 33vw, 78vw" />
              </span>
              <span className="flex min-h-16 items-center justify-between gap-4 border-t border-[#e2d5c7] bg-[#fffaf4] px-5 py-4 text-lg font-medium leading-snug">
                <span><span className="block">{c.labels[index]}</span><span className="mt-1 block text-xs font-normal uppercase tracking-wide text-[#6a625a]">{lane.who}</span>{index === 0 && <span className="mt-2 block text-sm font-medium normal-case tracking-normal text-[#9d3d2b] underline underline-offset-4">{c.propertyProof}</span>}</span>
                <ArrowRight className="size-5 shrink-0 text-[#a93e29] transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
        <p className="mt-2 text-xs leading-5 text-[#6a625a]">{c.illustrationNote}</p>
        <nav aria-label={locale === "es" ? "Servicios locales" : "Local services"} className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {c.localLinks.map((link) => (
            <Link key={link.href} href={link.href} className="min-h-11 inline-flex items-center text-[#9d3d2b] underline underline-offset-4" data-cta="home-local-service">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-6 border-t border-[#ddd4c8] pt-5">
          <p className="text-sm leading-6 text-[#4d5358]"><strong className="text-[#101214]">{c.pricing}</strong> {c.pricingDetail}</p>
          <ul className="em-home-price-rows mt-4 grid gap-2 lg:grid-cols-4" aria-label={c.pricing}>
            {packages.map((pkg) => {
              const price = priceFor(pkg.id);
              return (
                <li key={pkg.id}>
                <Link href={packageRoutes[pkg.id][locale]} className="group block min-h-full rounded-xl border border-[#ddd4c8] bg-white px-4 py-3 transition hover:border-[#a93e29] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a93e29]">
                  <span className="block text-sm font-medium leading-snug text-[#101214]">{pkg.name}</span>
                  <span className="mt-1 block text-xs leading-snug text-[#6a625a]">{pkg.subtitle}</span>
                  <span className="mt-1 block text-sm leading-snug text-[#9d3d2b]">
                    {price.kind === "custom"
                      ? c.custom
                      : `${c.from} ${usd(price.amount)}${c.units[price.unit]}`}
                  </span>
                </Link>
                </li>
              );
            })}
          </ul>
          <Link href={c.pricingHref} data-cta="home-pricing" className="mt-3 inline-flex min-h-11 shrink-0 items-center gap-2 self-start font-medium text-[#9d3d2b] underline underline-offset-4 sm:self-auto">
            {c.pricingAction}<ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
