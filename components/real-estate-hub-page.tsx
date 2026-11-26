import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Building2, Camera, Film, MapPin, Sparkles, Video } from "lucide-react";

import { BuyerAnswer } from "@/components/buyer-answer";
import { Container } from "@/components/ui/container";
import { entityIds } from "@/lib/entity-schema";
import { buildPageMetadata } from "@/lib/site-metadata";
import { whatsappHref } from "@/lib/packages";
import {
  PACKAGE_PRICES,
  REAL_ESTATE_DRONE_PHOTO_ADD_ON,
  REAL_ESTATE_MEDIA_PRICES,
  REAL_ESTATE_PLANS,
  REAL_ESTATE_PLAN_TERMS,
  usd,
} from "@/lib/pricing";
import { site, siteUrl } from "@/lib/site";

type Locale = "en" | "es";

interface HubServiceCard {
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly coverage: string;
  readonly icon: "reels" | "drone" | "ai" | "commercial" | "coralgables" | "coastal";
}

interface HubGuideCard {
  readonly title: string;
  readonly description: string;
  readonly href: string;
}

interface HubFaqItem {
  readonly q: string;
  readonly a: string;
}

function HubIcon({ icon }: { icon: HubServiceCard["icon"] }) {
  const cls = "size-5 text-[#9d3d2b]";
  switch (icon) {
    case "reels":
      return <Film className={cls} aria-hidden="true" />;
    case "drone":
      return <Video className={cls} aria-hidden="true" />;
    case "ai":
      return <Sparkles className={cls} aria-hidden="true" />;
    case "commercial":
      return <Building2 className={cls} aria-hidden="true" />;
    case "coralgables":
      return <MapPin className={cls} aria-hidden="true" />;
    case "coastal":
      return <Camera className={cls} aria-hidden="true" />;
  }
}

const essentialPlan = REAL_ESTATE_PLANS[0];
const plusPlan = REAL_ESTATE_PLANS[1];
const premiumPlan = REAL_ESTATE_PLANS[2];
const starterPrice = usd(PACKAGE_PRICES.arranque.kind === "from" ? PACKAGE_PRICES.arranque.amount : 0);

const HUB_COPY: Record<
  Locale,
  {
    metaTitle: string;
    metaDescription: string;
    canonicalPath: string;
    eyebrow: string;
    h1: string;
    lead: string;
    priceStrip: string;
    primaryCta: string;
    whatsappText: string;
    pricingCta: string;
    pricingHref: string;
    servicesEyebrow: string;
    servicesHeading: string;
    services: readonly HubServiceCard[];
    plansEyebrow: string;
    plansHeading: string;
    plansNote: string;
    guidesEyebrow: string;
    guidesHeading: string;
    guides: readonly HubGuideCard[];
    faqEyebrow: string;
    faqHeading: string;
    faqs: readonly HubFaqItem[];
    updatedLabel: string;
  }
> = {
  en: {
    metaTitle: "Real Estate Video, Reels & Listing Media in South Florida",
    metaDescription: `Real estate video editing, listing Reels, drone post-production, AI photo enhancement, and monthly content plans in Fort Lauderdale, Miami, and Broward. Editing from ${starterPrice}; monthly plans from ${usd(essentialPlan.price)}/mo.`,
    canonicalPath: "/real-estate",
    eyebrow: "Real Estate Media Hub · South Florida",
    h1: "Real estate video, Reels, and listing media built for South Florida agents.",
    lead: "Send raw listing walkthroughs for remote Reels editing or schedule scoped on-location shoots across Fort Lauderdale, Coral Gables, Aventura, Sunny Isles, and Miami.",
    priceStrip: `Remote Reels editing from ${starterPrice}/video · Listing photos from ${usd(REAL_ESTATE_MEDIA_PRICES.photoTiers[0])} · Monthly plans from ${usd(essentialPlan.price)}/mo`,
    primaryCta: "Ask about a listing or monthly plan",
    whatsappText: "Hi Esteban, I am a real estate agent/team looking for listing video, Reels editing, or a monthly media plan.",
    pricingCta: "See full real estate rates",
    pricingHref: "/pricing/real-estate",
    servicesEyebrow: "Real Estate Services",
    servicesHeading: "Pick the exact format your listing or team needs.",
    services: [
      {
        title: "Real Estate Reels Editing",
        description: "Turn property walkthroughs, drone clips, and agent talking-head footage into vertical Reels with clean hooks and safe-zone captions.",
        href: "/services/real-estate-reels-video-editor-south-florida",
        coverage: "Remote nationwide · Fort Lauderdale & Miami",
        icon: "reels",
      },
      {
        title: "Drone Video Editing",
        description: "Post-production for aerial property footage: stabilization, color balance, neighborhood context cuts, and vertical or widescreen exports.",
        href: "/services/real-estate-drone-video-editing-miami",
        coverage: "Miami-Dade · Broward · Remote",
        icon: "drone",
      },
      {
        title: "AI Real Estate Photo Enhancement",
        description: "Clean lighting balance, sky replacement, and presentation polish for listing stills without misrepresenting the physical property.",
        href: "/services/ai-real-estate-photo-enhancement",
        coverage: "Remote turnaround · South Florida",
        icon: "ai",
      },
      {
        title: "Commercial Real Estate Video",
        description: "Location-driven property tours, investor updates, and leasing reels for retail plazas, offices, and mixed-use spaces in Miami.",
        href: "/services/commercial-real-estate-video-miami",
        coverage: "Miami · Brickell · Broward",
        icon: "commercial",
      },
      {
        title: "Coral Gables Real Estate Video",
        description: "Tailored property walkthroughs and social cuts for Coral Gables single-family homes, estates, and boutique developments.",
        href: "/services/real-estate-video-coral-gables",
        coverage: "Coral Gables · Miami-Dade",
        icon: "coralgables",
      },
      {
        title: "Aventura & Sunny Isles Video",
        description: "High-rise condo and waterfront listing video for Aventura and Sunny Isles Beach agents targeting local and international buyers.",
        href: "/services/real-estate-video-aventura-miami",
        coverage: "Aventura · Sunny Isles Beach",
        icon: "coastal",
      },
    ],
    plansEyebrow: "Published Starting Rates",
    plansHeading: "Monthly real estate plans and per-listing add-ons.",
    plansNote: `Monthly plans carry a ${REAL_ESTATE_PLAN_TERMS.minimumMonths}-month minimum with Metricool reports every ${REAL_ESTATE_PLAN_TERMS.reportEveryDays} days. Drone photography add-on is ${usd(REAL_ESTATE_DRONE_PHOTO_ADD_ON)} on Essential and Plus, and included on Premium.`,
    guidesEyebrow: "Planning Guides",
    guidesHeading: "Cost breakdowns and Reel ideas before you book.",
    guides: [
      {
        title: "How Much Does Real Estate Video Cost in Miami?",
        description: `Photo tiers from ${usd(REAL_ESTATE_MEDIA_PRICES.photoTiers[0])}, listing video at ${usd(REAL_ESTATE_MEDIA_PRICES.premiumListingVideoPerMinute)}/min, Zillow 3D tours from ${usd(REAL_ESTATE_MEDIA_PRICES.zillow3dTourFrom)}, and monthly plan comparisons.`,
        href: "/guides/how-much-does-real-estate-video-cost-miami",
      },
      {
        title: "Instagram Reels Ideas for Real Estate Agents",
        description: "Repeatable formats for listing walkthroughs, neighborhood context, buyer FAQs, and agent authority clips.",
        href: "/guides/instagram-reels-ideas-for-real-estate",
      },
    ],
    faqEyebrow: "Common Questions",
    faqHeading: "Quick answers for agents, brokers, and teams.",
    faqs: [
      {
        q: "Can I send phone footage from a listing walkthrough for remote editing?",
        a: `Yes. Remote Reels editing starts at ${starterPrice} per video (Starter). Send your raw vertical clips, property highlights, and target platform, and Esteban handles pacing, color, audio cleanup, and safe-zone captions.`,
      },
      {
        q: "What is included in the monthly real estate plans?",
        a: `Essential (${usd(essentialPlan.price)}/mo) covers ${essentialPlan.properties} property and ${essentialPlan.postsPerWeek} posts/week; Plus (${usd(plusPlan.price)}/mo) covers ${plusPlan.properties} properties and ${plusPlan.postsPerWeek} posts/week; Premium (${usd(premiumPlan.price)}/mo) covers ${premiumPlan.properties} properties, ${premiumPlan.postsPerWeek} posts/week, and includes drone coverage.`,
      },
      {
        q: "Do you work in Spanish and English for South Florida buyers?",
        a: "Yes. Esteban Moreno Media is Spanish-first and bilingual, editing listing Reels and agent content with natural Spanish or English captions for local and international South Florida buyers.",
      },
      {
        q: "Which areas do you cover for on-location shoots?",
        a: "Fort Lauderdale, Broward County, Coral Gables, Brickell, Aventura, Sunny Isles Beach, and surrounding Miami-Dade areas. Remote editing is available nationwide.",
      },
    ],
    updatedLabel: "Updated November 2026 · Spanish-first & English available",
  },
  es: {
    metaTitle: "Video Inmobiliario, Reels y Media para Bienes Raíces en South Florida",
    metaDescription: `Edición de Reels inmobiliarios, edición de video con dron, mejora de fotos con IA y planes mensuales para agentes en Fort Lauderdale y Miami. Edición desde ${starterPrice}; planes desde ${usd(essentialPlan.price)}/mes.`,
    canonicalPath: "/es/bienes-raices",
    eyebrow: "Centro de Media Inmobiliaria · South Florida",
    h1: "Video inmobiliario, Reels y contenido de propiedades para agentes en South Florida.",
    lead: "Envía tus clips de recorridos para edición remota de Reels o agenda grabaciones en locación en Fort Lauderdale, Coral Gables, Aventura, Sunny Isles y Miami.",
    priceStrip: `Edición remota desde ${starterPrice}/video · Fotos desde ${usd(REAL_ESTATE_MEDIA_PRICES.photoTiers[0])} · Planes mensuales desde ${usd(essentialPlan.price)}/mes`,
    primaryCta: "Cotizar una propiedad o plan mensual",
    whatsappText: "Hola Esteban, soy agente o equipo inmobiliario y quiero cotizar video, edición de Reels o un plan mensual.",
    pricingCta: "Ver tarifas completas de inmobiliaria",
    pricingHref: "/es/precios/inmobiliaria",
    servicesEyebrow: "Servicios Inmobiliarios",
    servicesHeading: "Elige el formato exacto que necesita tu propiedad o equipo.",
    services: [
      {
        title: "Edición de Reels Inmobiliarios",
        description: "Convierte recorridos de propiedades, clips con dron y videos del agente en Reels verticales claros con subtítulos en zona segura.",
        href: "/es/editor-de-video-real-estate-miami",
        coverage: "Edición remota · Fort Lauderdale y Miami",
        icon: "reels",
      },
      {
        title: "Edición de Video con Dron",
        description: "Postproducción para tomas aéreas de propiedades: estabilización, balance de color, contexto del vecindario y formatos vertical u horizontal.",
        href: "/es/drone-real-estate-miami",
        coverage: "Miami-Dade · Broward · Remoto",
        icon: "drone",
      },
      {
        title: "Fotos con IA para Bienes Raíces",
        description: "Mejora de luz, cielo y presentación en fotos de propiedades sin alterar la realidad física del inmueble.",
        href: "/es/fotos-con-ia-para-bienes-raices-miami",
        coverage: "Entrega remota · South Florida",
        icon: "ai",
      },
      {
        title: "Video para Bienes Raíces Comerciales",
        description: "Recorridos de locales, plazas, oficinas y actualizaciones para inversionistas en Miami y Broward.",
        href: "/es/video-para-bienes-raices-comerciales-miami",
        coverage: "Miami · Brickell · Broward",
        icon: "commercial",
      },
      {
        title: "Video Inmobiliario en Coral Gables",
        description: "Recorridos y piezas sociales para residencias y desarrollos boutique en Coral Gables.",
        href: "/es/video-inmobiliario-coral-gables",
        coverage: "Coral Gables · Miami-Dade",
        icon: "coralgables",
      },
      {
        title: "Video en Aventura y Sunny Isles",
        description: "Video de condominios y propiedades frente al agua en Aventura y Sunny Isles para compradores locales e internacionales.",
        href: "/es/video-inmobiliario-aventura-miami",
        coverage: "Aventura · Sunny Isles Beach",
        icon: "coastal",
      },
    ],
    plansEyebrow: "Tarifas Publicadas",
    plansHeading: "Planes mensuales inmobiliarios y servicios por propiedad.",
    plansNote: `Los planes mensuales tienen un mínimo de ${REAL_ESTATE_PLAN_TERMS.minimumMonths} meses con reportes cada ${REAL_ESTATE_PLAN_TERMS.reportEveryDays} días. El complemento de dron cuesta ${usd(REAL_ESTATE_DRONE_PHOTO_ADD_ON)} en Essential y Plus, y viene incluido en Premium.`,
    guidesEyebrow: "Guías Prácticas",
    guidesHeading: "Costos reales e ideas de Reels antes de reservar.",
    guides: [
      {
        title: "¿Cuánto Cuesta el Video y la Foto Inmobiliaria en Miami?",
        description: `Rangos de fotos desde ${usd(REAL_ESTATE_MEDIA_PRICES.photoTiers[0])}, video a ${usd(REAL_ESTATE_MEDIA_PRICES.premiumListingVideoPerMinute)}/min, recorrido Zillow 3D desde ${usd(REAL_ESTATE_MEDIA_PRICES.zillow3dTourFrom)} y comparación de planes.`,
        href: "/es/guias/cuanto-cuesta-video-inmobiliario-miami",
      },
      {
        title: "Ideas de Reels para Agentes de Bienes Raíces",
        description: "Formatos repetibles para recorridos, contexto de zona, preguntas de compradores y marca personal del agente.",
        href: "/es/guias/ideas-de-reels-para-agentes-de-bienes-raices",
      },
    ],
    faqEyebrow: "Preguntas Frecuentes",
    faqHeading: "Respuestas directas para agentes y equipos inmobiliarios.",
    faqs: [
      {
        q: "¿Puedo enviar clips grabados con mi celular para edición remota?",
        a: `Sí. La edición remota de Reels empieza en ${starterPrice} por video (paquete Arranque). Envías tus clips verticales y notas de la propiedad, y Esteban se encarga del ritmo, color, audio y subtítulos en zona segura.`,
      },
      {
        q: "¿Qué incluyen los planes mensuales de bienes raíces?",
        a: `Essential (${usd(essentialPlan.price)}/mes) cubre ${essentialPlan.properties} propiedad y ${essentialPlan.postsPerWeek} publicaciones/semana; Plus (${usd(plusPlan.price)}/mes) cubre ${plusPlan.properties} propiedades y ${plusPlan.postsPerWeek} publicaciones/semana; Premium (${usd(premiumPlan.price)}/mes) cubre ${premiumPlan.properties} propiedades, ${premiumPlan.postsPerWeek} publicaciones/semana e incluye dron.`,
      },
      {
        q: "¿Editan y subtitulan en español e inglés?",
        a: "Sí. Esteban Moreno Media trabaja español primero y bilingüe, con subtítulos naturales en español o inglés para compradores locales e internacionales en South Florida.",
      },
      {
        q: "¿Qué zonas cubren para grabaciones en locación?",
        a: "Fort Lauderdale, Broward, Coral Gables, Brickell, Aventura, Sunny Isles Beach y Miami-Dade. La edición remota está disponible para agentes en todo Estados Unidos.",
      },
    ],
    updatedLabel: "Actualizado noviembre 2026 · Español primero e inglés disponible",
  },
};

export function buildRealEstateHubMetadata(locale: Locale): Metadata {
  const c = HUB_COPY[locale];
  return buildPageMetadata({
    title: c.metaTitle,
    description: c.metaDescription,
    path: c.canonicalPath,
    locale,
    languages: {
      en: "/real-estate",
      es: "/es/bienes-raices",
    },
  });
}

export function RealEstateHubPage({ locale }: { locale: Locale }) {
  const c = HUB_COPY[locale];
  const homeUrl = siteUrl;
  const pageUrl = `${homeUrl}${c.canonicalPath}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: c.metaTitle,
        description: c.metaDescription,
        url: pageUrl,
        provider: {
          "@id": entityIds.business,
        },
        areaServed: ["Fort Lauderdale, FL", "Miami, FL", "Coral Gables, FL", "Aventura, FL", "Sunny Isles Beach, FL", "Broward County, FL"],
      },
      {
        "@type": "FAQPage",
        mainEntity: c.faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: locale === "es" ? "Inicio" : "Home",
            item: locale === "es" ? `${homeUrl}/es` : homeUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: locale === "es" ? "Bienes raíces" : "Real estate",
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="bg-[#f7f5f1] text-[#101214]" data-section="real-estate-hub">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <section className="border-b border-[#e4e0da] py-12 sm:py-16 lg:py-20">
        <Container size="xl">
          <div className="max-w-3xl">
            <p className="em-eyebrow text-[#9d3d2b]">{c.eyebrow}</p>
            <h1 className="mt-3 font-serif text-4xl leading-[1.04] tracking-tight text-[#101214] sm:text-5xl lg:text-6xl">
              {c.h1}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[#4d5358] sm:text-lg sm:leading-8">
              {c.lead}
            </p>
            <p className="mt-4 text-sm font-medium text-[#101214]">
              {c.priceStrip}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <a
                href={whatsappHref(site.phone.e164, c.whatsappText)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#9d3d2b] px-6 text-sm font-semibold text-white transition hover:bg-[#843122]"
                data-cta={`re_hub_whatsapp_${locale}`}
              >
                {c.primaryCta}
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <Link
                href={c.pricingHref}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-semibold text-[#101214] transition hover:bg-[#101214] hover:text-[#f7f5f1]"
                data-cta={`re_hub_pricing_${locale}`}
              >
                {c.pricingCta}
              </Link>
            </div>
            <p className="mt-5 text-xs text-[#6a625a]">{c.updatedLabel}</p>
          </div>
        </Container>
      </section>

      <BuyerAnswer kind="real-estate-monthly-plan" locale={locale} />

      {/* Services grid */}
      <section className="py-12 sm:py-16" aria-labelledby={`re-services-${locale}`}>
        <Container size="xl">
          <p className="em-eyebrow text-[#9d3d2b]">{c.servicesEyebrow}</p>
          <h2 id={`re-services-${locale}`} className="mt-2 em-h2 max-w-2xl">
            {c.servicesHeading}
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group flex flex-col justify-between rounded-2xl border border-[#ded5ca] bg-[#fffaf3] p-6 transition hover:-translate-y-0.5 hover:border-[#9d3d2b] hover:shadow-md"
              >
                <div>
                  <div className="flex size-10 items-center justify-center rounded-xl bg-[#f4ece3]">
                    <HubIcon icon={service.icon} />
                  </div>
                  <h3 className="mt-4 font-serif text-xl font-semibold text-[#101214] group-hover:text-[#9d3d2b]">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4d5358]">
                    {service.description}
                  </p>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-[#ebe3d8] pt-3.5 text-xs font-medium text-[#6a625a]">
                  <span>{service.coverage}</span>
                  <ArrowRight className="size-4 text-[#9d3d2b] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Monthly plans snapshot */}
      <section className="border-y border-[#e4e0da] bg-[#141618] py-12 text-[#f6f1ea] sm:py-16" aria-labelledby={`re-plans-${locale}`}>
        <Container size="xl">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#eab58e]">
            {c.plansEyebrow}
          </p>
          <h2 id={`re-plans-${locale}`} className="mt-2 font-serif text-3xl tracking-tight text-white sm:text-4xl">
            {c.plansHeading}
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {REAL_ESTATE_PLANS.map((plan) => (
              <div
                key={plan.id}
                className="flex flex-col justify-between rounded-2xl border border-white/15 bg-[#1c1f21] p-6"
              >
                <div>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#eab58e]">
                    {plan.id}
                  </p>
                  <p className="mt-2 font-serif text-4xl text-white">
                    {usd(plan.price)}
                    <span className="ml-1 font-sans text-sm text-[#c9c0b8]">
                      /{locale === "es" ? "mes" : "mo"}
                    </span>
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-[#ddd4c8]">
                    <li>
                      {locale === "es"
                        ? `${plan.properties} ${plan.properties === 1 ? "propiedad" : "propiedades"} por mes`
                        : `${plan.properties} ${plan.properties === 1 ? "property" : "properties"} per month`}
                    </li>
                    <li>
                      {locale === "es"
                        ? `${plan.productionDays} días de producción`
                        : `${plan.productionDays} production days`}
                    </li>
                    <li>
                      {locale === "es"
                        ? `${plan.postsPerWeek} publicaciones/Reels por semana`
                        : `${plan.postsPerWeek} posts/Reels per week`}
                    </li>
                    <li>
                      {plan.drone === "included"
                        ? locale === "es"
                          ? "Dron incluido"
                          : "Drone included"
                        : locale === "es"
                          ? `Dron opcional (+${usd(REAL_ESTATE_DRONE_PHOTO_ADD_ON)})`
                          : `Drone add-on (+${usd(REAL_ESTATE_DRONE_PHOTO_ADD_ON)})`}
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="max-w-2xl text-xs leading-relaxed text-[#c9c0b8]">{c.plansNote}</p>
            <Link
              href={c.pricingHref}
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#f0b384] underline underline-offset-4 hover:text-white"
            >
              {c.pricingCta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Guides + Folded FAQ depth */}
      <section className="py-12 sm:py-16">
        <Container size="xl">
          <p className="em-eyebrow text-[#9d3d2b]">{c.guidesEyebrow}</p>
          <h2 className="mt-2 em-h2 max-w-2xl">{c.guidesHeading}</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {c.guides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group rounded-2xl border border-[#ded5ca] bg-[#fffaf3] p-6 transition hover:border-[#9d3d2b]"
              >
                <h3 className="font-serif text-xl font-semibold text-[#101214] group-hover:text-[#9d3d2b]">
                  {guide.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4d5358]">{guide.description}</p>
              </Link>
            ))}
          </div>

          <div className="mt-12 border-t border-[#e4e0da] pt-10">
            <p className="em-eyebrow text-[#9d3d2b]">{c.faqEyebrow}</p>
            <h2 className="mt-2 em-h2">{c.faqHeading}</h2>
            <div className="mt-6 space-y-3">
              {c.faqs.map((item) => (
                <details
                  key={item.q}
                  className="rounded-2xl border border-[#ded5ca] bg-[#fffaf3] px-5 py-4"
                >
                  <summary className="cursor-pointer list-none font-serif text-lg font-semibold text-[#101214] [&::-webkit-details-marker]:hidden">
                    {item.q}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[#4d5358]">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
