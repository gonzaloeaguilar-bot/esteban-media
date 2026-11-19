import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building,
  Calculator,
  CheckCircle2,
  Mail,
  Phone,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { buildPageMetadata } from "@/lib/site-metadata";
import {
  REAL_ESTATE_MEDIA_PRICES,
  REAL_ESTATE_PLANS,
  REAL_ESTATE_PLAN_TERMS,
  usd,
} from "@/lib/pricing";
import { absoluteUrl, site } from "@/lib/site";
import { EventSeasonLinks } from "@/components/event-content-page";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

const PATH = "/es/bienes-raices";

const PAGE_DESCRIPTION = `Videógrafo inmobiliario y producción de medios para propiedades en Fort Lauderdale, Miami-Dade y Broward. Planes mensuales desde ${usd(REAL_ESTATE_PLANS[0].price)}/mes, fotos por pies cuadrados y tours Zillow 3D desde ${usd(REAL_ESTATE_MEDIA_PRICES.zillow3dTourFrom)}.`;

export const metadata = buildPageMetadata({
  title: "Video, Dron y Fotografía Inmobiliaria en Miami y Fort Lauderdale",
  description: PAGE_DESCRIPTION,
  path: PATH,
  locale: "es",
});

const spanishRealEstateRoutes = [
  {
    title: "Tarifas y Precios de Bienes Raíces",
    href: "/es/precios/inmobiliaria",
    description: "Tarifas publicadas de fotografía por tamaño en pies cuadrados, video de listado, dron y recorridos virtuales.",
    tag: "Tarifas",
  },
  {
    title: "Reels Inmobiliarios en South Florida",
    href: "/es/reels-para-negocios-miami",
    description: "Recorridos verticales para Instagram, TikTok y YouTube Shorts pensados para agentes y desarrolladores.",
    tag: "Redes / Reels",
  },
  {
    title: "Video para Bienes Raíces Comerciales (Miami)",
    href: "/es/video-para-bienes-raices-comerciales-miami",
    description: "Producción audiovisual para edificios de oficinas, plazas comerciales y salas de ventas de preventa.",
    tag: "Comercial",
  },
  {
    title: "Edición de Video Aéreo Inmobiliario",
    href: "/es/edicion-de-video-aereo-inmobiliario-miami",
    description: "Tomas aéreas con dron estabilizadas, delimitación visual de terrenos y entorno costero en alta resolución.",
    tag: "Dron",
  },
  {
    title: "Fotos con IA para Bienes Raíces",
    href: "/es/fotos-con-ia-para-bienes-raices-miami",
    description: "Ambientación virtual, atardeceres digitales, eliminación de desorden y balance de iluminación con IA.",
    tag: "IA Visual",
  },
  {
    title: "Video Inmobiliario — Aventura",
    href: "/es/video-inmobiliario-aventura-miami",
    description: "Videos de condominios de lujo, marinas privadas y vistas intercostales en la zona de Aventura.",
    tag: "Aventura",
  },
  {
    title: "Video Inmobiliario — Coral Gables",
    href: "/es/video-inmobiliario-coral-gables",
    description: "Mansiones de arquitectura mediterránea, avenidas arboladas y propiedades históricas en Coral Gables.",
    tag: "Coral Gables",
  },
  {
    title: "Video Inmobiliario — Sunny Isles Beach",
    href: "/es/video-inmobiliario-sunny-isles",
    description: "Torres residenciales frente al mar, penthouses de lujo y estilo de vida costero en Sunny Isles.",
    tag: "Sunny Isles",
  },
  {
    title: "Guía de Costos de Video Inmobiliario",
    href: "/es/guias/cuanto-cuesta-video-inmobiliario-miami",
    description: "Desglose transparente: promedios del mercado de Miami, precios de fotografía de Esteban y planes mensuales.",
    tag: "Guía de Precios",
  },
];

export default function SpanishRealEstateHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": absoluteUrl(PATH),
        url: absoluteUrl(PATH),
        name: "Video, Dron y Fotografía Inmobiliaria en Miami y Fort Lauderdale",
        description: PAGE_DESCRIPTION,
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/es") },
            { "@type": "ListItem", position: 2, name: "Bienes Raíces", item: absoluteUrl(PATH) },
          ],
        },
      },
      {
        "@type": "Service",
        "@id": absoluteUrl(`${PATH}#service`),
        name: "Videógrafo Inmobiliario y Medios de Listado",
        description:
          "Producción de video inmobiliario, recorridos en video, edición de tomas de dron y fotografía de listados en Fort Lauderdale, Broward y Miami-Dade.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: ["Fort Lauderdale", "Broward County", "Miami-Dade County"],
        serviceType: "Videografía y Fotografía Inmobiliaria",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Planes de Medios Inmobiliarios",
          itemListElement: REAL_ESTATE_PLANS.map((plan) => ({
            "@type": "Offer",
            name: `Plan ${({ essential: "Esencial", plus: "Plus", premium: "Premium" })[plan.id]}`,
            price: plan.price,
            priceCurrency: "USD",
            description: `${plan.properties} propiedades al mes, ${plan.productionDays} jornadas de grabación, ${plan.postsPerWeek} publicaciones por semana (mínimo ${REAL_ESTATE_PLAN_TERMS.minimumMonths} meses).`,
          })),
        },
      },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(withNicheService(PATH, jsonLd)) }}
      />
      
      {/* Hero Section */}
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20" data-section="real-estate-hero-es">
        <Container size="xl">
          <nav aria-label="Migas de pan" className="mb-8 text-sm text-[#5a6066]">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/es" className="hover:text-[#9f3c27]">
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">
                Bienes Raíces
              </li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#5a6066]">
                Fort Lauderdale · Broward · Miami-Dade
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Videógrafo Inmobiliario y Medios de Listado en South Florida.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Cinematografía de propiedades, edición de tomas con dron, Reels verticales para redes y fotografía profesional para agentes y desarrolladores en Florida.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/es/precios/inmobiliaria"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Ver Lista de Precios
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/es/contacto"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  Cotizar Proyecto
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[#5a6066]">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-[#9f3c27]" />
                  Planes mensuales desde ${REAL_ESTATE_PLANS[0].price}/mes
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-[#9f3c27]" />
                  Tours Zillow 3D desde ${REAL_ESTATE_MEDIA_PRICES.zillow3dTourFrom}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-[#9f3c27]" />
                  Tarifas de foto por tamaño desde ${REAL_ESTATE_MEDIA_PRICES.photoTiers[0]}
                </span>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
              <Building className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-4 font-serif text-2xl sm:text-3xl">Resumen de Precios Confirmados</h2>
              <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                Todos los precios corresponden a la tabla oficial de Esteban Moreno Media. La fotografía individual se cotiza según los pies cuadrados de la propiedad, y la producción recurrente de video se organiza en planes mensuales predecibles.
              </p>
              
              <div className="mt-6 space-y-3 border-t border-[#ddd4c8] pt-4 text-sm">
                <div className="flex justify-between py-1">
                  <span className="font-medium text-[#252a2d]">Plan Esencial (1 Propiedad)</span>
                  <span className="font-semibold text-[#101214]">${REAL_ESTATE_PLANS[0].price} / mes</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-medium text-[#252a2d]">Plan Plus (2 Propiedades)</span>
                  <span className="font-semibold text-[#101214]">${REAL_ESTATE_PLANS[1].price} / mes</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-medium text-[#252a2d]">Plan Premium (3 Propiedades + Dron)</span>
                  <span className="font-semibold text-[#101214]">${REAL_ESTATE_PLANS[2].price} / mes</span>
                </div>
                <div className="flex justify-between py-1 border-t border-[#e8dfd3] pt-2">
                  <span className="text-[#5a6066]">Recorrido Interactivo Zillow 3D</span>
                  <span className="font-semibold text-[#101214]">Desde ${REAL_ESTATE_MEDIA_PRICES.zillow3dTourFrom}</span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/es/precios/inmobiliaria"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#9f3c27] hover:underline"
                >
                  Consultar tabla completa de precios
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Answer-First Section */}
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16">
        <Container size="xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#5a6066]">
              Respuesta Directa
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              ¿Cómo funciona el servicio con un videógrafo inmobiliario independiente en Miami?
            </h2>
            <div className="mt-6 space-y-4 text-base leading-8 text-[#252a2d]">
              <p>
                Trabajar con un videógrafo inmobiliario independiente garantiza trato directo, comunicación fluida en español y un criterio de edición consistente sin intermediarios ni costos inflados de agencia. Esteban Moreno Media coordina jornadas de grabación en locación en Fort Lauderdale, Broward y Miami-Dade, o edita a distancia el material grabado por tu propio equipo.
              </p>
              <p>
                Cada sesión para listados individuales incluye planos interiores y exteriores de alta definición, montaje vertical adaptado a Reels y archivos maestros sin marca para cumplimiento del MLS. Para inmobiliarias con publicaciones frecuentes, los planes mensuales (${REAL_ESTATE_PLANS[0].price} a ${REAL_ESTATE_PLANS[2].price}/mes con mínimo de {REAL_ESTATE_PLAN_TERMS.minimumMonths} meses) ofrecen fechas reservadas y entregas periódicas.
              </p>
            </div>
          </div>

          <div className="mt-8 max-w-3xl space-y-4">
            <details className="group rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5">
              <summary className="cursor-pointer font-serif text-xl font-medium text-[#101214] hover:text-[#9f3c27]">
                ¿Qué incluyen los planes mensuales de marketing inmobiliario?
              </summary>
              <div className="mt-4 space-y-3 text-sm leading-6 text-[#252a2d]">
                <p>
                  El Plan Esencial (${REAL_ESTATE_PLANS[0].price}/mes) cubre 1 propiedad al mes con 2 medias jornadas de grabación y 2 publicaciones semanales. El Plan Plus (${REAL_ESTATE_PLANS[1].price}/mes) incluye 2 propiedades con 3 jornadas de producción y 3–4 publicaciones por semana. El Plan Premium (${REAL_ESTATE_PLANS[2].price}/mes) abarca 3 propiedades, 3 jornadas de filmación, cobertura completa con dron y 5 publicaciones semanales.
                </p>
                <p>
                  Todos los planes mensuales requieren un compromiso mínimo de {REAL_ESTATE_PLAN_TERMS.minimumMonths} meses, aviso de cancelación de {REAL_ESTATE_PLAN_TERMS.cancelNoticeDays} días y reportes de rendimiento cada {REAL_ESTATE_PLAN_TERMS.reportEveryDays} días.
                </p>
              </div>
            </details>

            <details className="group rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5">
              <summary className="cursor-pointer font-serif text-xl font-medium text-[#101214] hover:text-[#9f3c27]">
                ¿Cómo se aplican los traslados y la repetición de sesiones?
              </summary>
              <div className="mt-4 space-y-3 text-sm leading-6 text-[#252a2d]">
                <p>
                  Los traslados dentro de Broward y el norte de Miami-Dade están contemplados en la tarifa base. Para propiedades fuera del radio habitual aplica un cargo fuera de área de ${REAL_ESTATE_MEDIA_PRICES.outOfAreaFee}. Si la propiedad no está lista para grabar o el clima impide la sesión tras haber llegado a la locación, la tarifa por repetir la visita es de ${REAL_ESTATE_MEDIA_PRICES.reshootFee}.
                </p>
              </div>
            </details>
          </div>
        </Container>
      </section>

      {/* Grid Directory */}
      <section className="border-b border-[#ddd4c8] py-14 sm:py-20" data-section="real-estate-directory-es">
        <Container size="xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#5a6066]">
              Servicios y Zonas Inmobiliarias
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              Explora las Páginas Especializadas de Bienes Raíces
            </h2>
            <p className="mt-4 text-base leading-7 text-[#252a2d]">
              Conoce las páginas dedicadas a propiedades residenciales de lujo, inmuebles comerciales, tomas aéreas y guías de costos en South Florida.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {spanishRealEstateRoutes.map((route) => (
              <div
                key={route.href}
                className="flex flex-col justify-between rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 transition-all hover:border-[#9f3c27]/40"
              >
                <div>
                  <span className="inline-block rounded-full bg-[#eee5d8] px-3 py-1 text-xs font-semibold text-[#5a6066]">
                    {route.tag}
                  </span>
                  <h3 className="mt-4 font-serif text-2xl text-[#101214]">
                    <Link href={route.href} className="hover:text-[#9f3c27]">
                      {route.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                    {route.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#ddd4c8]/60">
                  <Link
                    href={route.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#9f3c27] hover:underline"
                  >
                    Ver servicio
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Conversion Banner */}
      <section className="py-14 sm:py-20">
        <Container size="xl">
          <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-8 sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#5a6066]">
                  Contacto Directo
                </p>
                <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                  ¿Necesitas video de listado o producción mensual en South Florida?
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-7 text-[#252a2d]">
                  Comparte la dirección de la propiedad, los pies cuadrados y los formatos requeridos para recibir una cotización por escrito basada en tarifas oficiales.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/es/calculadora"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  <Calculator className="size-4" />
                  Calculadora de Costos
                </Link>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  <Mail className="size-4" />
                  Escribir a Esteban
                </a>
                <a
                  href={site.phone.href}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  <Phone className="size-4" />
                  Llamar ({site.phone.display})
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <EventSeasonLinks locale="es" path={PATH} />
      <NicheAnswers path={PATH} fact={String(metadata.description ?? "")} />
    </main>
  );
}
