import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AUDIENCE_LANES, type AudienceLocale } from "@/lib/audience-lanes";
import { packagesFor, priceFor } from "@/lib/packages";
import { realEstateReelsPath } from "@/lib/real-estate-reels";
import { usd } from "@/lib/pricing";

const copy = {
  en: {
    eyebrow: "Find your starting point",
    heading: "What do you need made?",
    intro: "Choose a project to see the relevant work and next steps.",
    labels: ["Edit a property Reel", "Content for a business", "Edit existing footage"],
    pricing: "Need a starting price?",
    pricingDetail: "See packages and what each one includes before asking for a quote.",
    pricingAction: "Explore packages",
    pricingHref: "/pricing",
    from: "From",
    custom: "Custom quote",
    units: { video: "/video", month: "/month", "production-day": "/production day" },
  },
  es: {
    eyebrow: "Encuentra por dónde empezar",
    heading: "¿Qué necesitas crear?",
    intro: "Elige un proyecto para ver trabajo relacionado y los próximos pasos.",
    labels: ["Editar un Reel inmobiliario", "Contenido para un negocio", "Editar material existente"],
    pricing: "¿Quieres ver precios para empezar?",
    pricingDetail: "Consulta los paquetes y lo que incluye cada uno antes de pedir una cotización.",
    pricingAction: "Ver paquetes",
    pricingHref: "/es/precios",
    from: "Desde",
    custom: "Cotización personalizada",
    units: { video: "/video", month: "/mes", "production-day": "/día de producción" },
  },
} as const;

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
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {lanes.map((lane, index) => (
            <Link key={lane.id} href={index === 0 ? realEstateReelsPath(locale) : lane.href} data-cta={`home-path-${lane.id}`} className="group flex min-h-20 items-center justify-between gap-4 rounded-xl border border-[#ddd4c8] bg-white px-5 py-4 text-lg font-medium leading-snug transition hover:border-[#a93e29] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a93e29]">
              <span>{c.labels[index]}</span>
              <ArrowRight className="size-5 shrink-0 text-[#a93e29] transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          ))}
        </div>
        <div className="mt-6 border-t border-[#ddd4c8] pt-5">
          <p className="text-sm leading-6 text-[#4d5358]"><strong className="text-[#101214]">{c.pricing}</strong> {c.pricingDetail}</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4" aria-label={c.pricing}>
            {packages.map((pkg) => {
              const price = priceFor(pkg.id);
              return (
                <li key={pkg.id} className="rounded-xl border border-[#ddd4c8] bg-white px-4 py-3">
                  <span className="block text-sm font-medium leading-snug text-[#101214]">{pkg.name}</span>
                  <span className="mt-1 block text-sm leading-snug text-[#9d3d2b]">
                    {price.kind === "custom"
                      ? c.custom
                      : `${c.from} ${usd(price.amount)}${c.units[price.unit]}`}
                  </span>
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
