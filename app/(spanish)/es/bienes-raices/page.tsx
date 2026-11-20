import Link from "next/link";
import { ArrowRight, Building2, Video, Camera, Zap, MapPin } from "lucide-react";

import { Container } from "@/components/ui/container";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { REAL_ESTATE_MEDIA } from "@/lib/services-config";
import { REAL_ESTATE_PLANS, REAL_ESTATE_PLAN_TERMS, usd } from "@/lib/pricing";
import { PageUpdated } from "@/components/page-updated";

export const metadata = buildPageMetadata({
  title: "Hub Inmobiliario — Fort Lauderdale, Miami-Dade y Broward",
  description:
    "Hub central para video inmobiliario, fotografía, dron, mejoras con IA y planes mensuales en Fort Lauderdale, Miami-Dade y Broward. Compara tarifas por sesión vs planes mensuales, ve el área de servicio y elige el formato correcto para tus propiedades.",
  path: "/es/bienes-raices",
  locale: "es",
});

const realEstateServices = [
  {
    title: "Edición de Reels Inmobiliarios",
    description: "Convierte recorridos de propiedades, clips con dron y piezas del agente en Reels verticales que el comprador pueda inspeccionar.",
    href: "/es/editor-de-video-real-estate-miami",
    icon: Video,
    coverage: "South Florida / Remoto",
  },
  {
    title: "Edición de Video con Dron",
    description: "Postproducción para tomas aéreas: estabilización, corrección de color y cortes con contexto del vecindario.",
    href: "/es/drone-real-estate-miami",
    icon: Zap,
    coverage: "Miami-Dade / Broward / Remoto",
  },
  {
    title: "Mejoras de Fotos con IA",
    description: "Prepara y mejora fotos de propiedades con edición asistida por IA para MLS, Zillow y redes sociales.",
    href: "/es/fotos-con-ia-para-bienes-raices-miami",
    icon: Camera,
    coverage: "Remoto (envías tus fotos)",
  },
  {
    title: "Video Inmobiliario Comercial",
    description: "Edición de video para oficinas, locales comerciales, industriales y propiedades multifamiliares en Miami.",
    href: "/es/video-para-bienes-raices-comerciales-miami",
    icon: Building2,
    coverage: "Miami / Miami-Dade",
  },
  {
    title: "Video de Lujo en Coral Gables",
    description: "Edición cinemática para residencias de lujo, mansiones y propiedades frente al agua en Coral Gables.",
    href: "/es/video-inmobiliario-coral-gables",
    icon: Building2,
    coverage: "Coral Gables / Miami-Dade",
  },
  {
    title: "Video de Condominios en Aventura",
    description: "Recorridos de penthouses, vistas intracosteras y promos de condominios de lujo en Aventura y Sunny Isles.",
    href: "/es/video-inmobiliario-aventura-miami",
    icon: Building2,
    coverage: "Aventura / Sunny Isles Beach",
  },
  {
    title: "Video en Sunny Isles Beach",
    description: "Edición de video para condominios frente al mar y propiedades resort en Sunny Isles Beach.",
    href: "/es/video-inmobiliario-sunny-isles",
    icon: Building2,
    coverage: "Sunny Isles Beach / Miami-Dade",
  },
  {
    title: "Tarifas de Fotografía y Video Inmobiliario",
    description: "Tarifas publicadas de fotografía por tamaño de la casa, dron, recorrido 3D de Zillow, video premium por minuto y cargos de traslado.",
    href: "/es/precios/inmobiliaria",
    icon: MapPin,
    coverage: "Fort Lauderdale / Miami-Dade / Broward",
  },
] as const;

const guides = [
  {
    title: "¿Cuánto Cuesta el Video y la Foto Inmobiliaria en Miami?",
    description: "Tarifas de fotografía, video por minuto, recorrido de Zillow, traslado y comparación de planes mensuales.",
    href: "/es/guias/cuanto-cuesta-video-inmobiliario-miami",
  },
  {
    title: "Ideas de Reels para Agentes Inmobiliarios",
    description: "Ideas de contenido para Reels de propiedades, clips de marca del agente, características del vecindario y actualizaciones del mercado.",
    href: "/es/guias/ideas-de-reels-para-agentes-de-bienes-raices",
  },
] as const;

function ServiceCard({ service }: { service: typeof realEstateServices[0] }) {
  return (
    <Link
      href={service.href}
      className="group flex flex-col h-full rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8 transition-colors hover:border-[var(--em-accent-ink,#a8381d)]"
    >
      <service.icon className="size-8 text-[#e85d3e]" aria-hidden="true" />
      <h3 className="mt-5 font-serif text-xl leading-snug text-[#101214] group-hover:text-[var(--em-accent-ink,#a8381d)]">
        {service.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-[#252a2d]">{service.description}</p>
      <div className="mt-auto flex items-center justify-between gap-4">
        <span className="text-xs font-medium uppercase text-[#5a6066]">{service.coverage}</span>
        <ArrowRight className="size-4 text-[#9f3c27] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </div>
    </Link>
  );
}

function GuideCard({ guide }: { guide: typeof guides[0] }) {
  return (
    <Link
      href={guide.href}
      className="group flex flex-col h-full rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 transition-colors hover:border-[var(--em-accent-ink,#a8381d)]"
    >
      <h3 className="font-serif text-xl leading-snug text-[#101214] group-hover:text-[var(--em-accent-ink,#a8381d)]">
        {guide.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-[#252a2d]">{guide.description}</p>
      <div className="mt-auto">
        <ArrowRight className="size-4 text-[#9f3c27] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </div>
    </Link>
  );
}

export default function RealEstateHubPage() {
  const essential = REAL_ESTATE_PLANS[0];
  const plus = REAL_ESTATE_PLANS[1];
  const premium = REAL_ESTATE_PLANS[2];

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": absoluteUrl("/es/bienes-raices#page"),
                name: "Hub Inmobiliario — Fort Lauderdale, Miami-Dade y Broward",
                description:
                  "Hub central para video inmobiliario, fotografía, dron, mejoras con IA y planes mensuales en Fort Lauderdale, Miami-Dade y Broward.",
                url: absoluteUrl("/es/bienes-raices"),
                inLanguage: "es-US",
                isPartOf: { "@id": absoluteUrl("/#website") },
              },
              {
                "@type": "BreadcrumbList",
                "@id": absoluteUrl("/es/bienes-raices#breadcrumbs"),
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Inicio",
                    item: absoluteUrl("/es"),
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Servicios",
                    item: absoluteUrl("/es/servicios"),
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "Hub Inmobiliario",
                    item: absoluteUrl("/es/bienes-raices"),
                  },
                ],
              },
            ],
          }),
        }}
      />

      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20">
        <Container size="xl">
          <nav aria-label="Breadcrumbs" className="mb-8 text-sm text-[#5a6066]">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/es" className="hover:text-[#9f3c27]">
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/es/servicios" className="hover:text-[#9f3c27]">
                  Servicios
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">
                Hub Inmobiliario
              </li>
            </ol>
          </nav>

          <div className="max-w-4xl">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--em-accent-ink,#a8381d)]">
              Pilar inmobiliario
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Video, Fotografía y Dron Inmobiliario para Propiedades en South Florida
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
              Un hub que enlaza todos los servicios inmobiliarios: edición de Reels, postproducción con dron, mejoras de fotos con IA, video comercial y de lujo, tarifas publicadas de fotografía por tamaño de la casa y planes mensuales para agentes que publican propiedades cada mes. Base: Fort Lauderdale. Cobertura: Miami-Dade y Broward. Palm Beach County por conversación.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/es/contacto"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink,#a8381d)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
              >
                Conversar sobre una Propiedad
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/es/precios/inmobiliaria"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
              >
                Ver Tarifas Publicadas
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16 lg:py-20" data-section="re_services">
        <Container size="xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--em-accent-ink,#a8381d)]">
            Servicios inmobiliarios
          </p>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-tight sm:text-4xl">
            Edición, dron, mejoras con IA y video comercial de propiedades
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[#5a6066]">
            Toda la edición se hace de forma remota desde Fort Lauderdale. La captura en locación se cotiza por proyecto en Miami-Dade y Broward. Envía clips originales, datos seguros de la propiedad y las características que deben mostrarse; cada proyecto recibe una cotización por escrito antes de empezar.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {realEstateServices.map((service) => (
              <ServiceCard key={service.href} service={service} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-[#ddd4c8] py-12 sm:py-16 lg:py-20" data-section="re_plans">
        <Container size="xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--em-accent-ink,#a8381d)]">
            Planes mensuales para agentes activos
          </p>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-tight sm:text-4xl">
            Planes mensuales vs tarifas por sesión
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[#5a6066]">
            Elige los planes mensuales cuando publicas varias propiedades al mes y quieres sesiones y publicaciones para redes con un costo predecible. Elige la tarifa por sesión cuando tienes propiedades ocasionales o necesitas una sola sesión de fotografía, video o dron.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { plan: essential, label: "Esencial" },
              { plan: plus, label: "Plus" },
              { plan: premium, label: "Premium" },
            ].map(({ plan, label }) => (
              <div
                key={plan.id}
                className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8 flex flex-col"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-2xl text-[#101214]">{label}</h3>
                  <span className="font-serif text-3xl text-[var(--em-accent-ink,#a8381d)]">
                    {usd(plan.price)}/mes
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                  {plan.properties} {plan.properties === 1 ? "propiedad" : "propiedades"} al mes · hasta 3,000 SF cada una
                </p>
                <ul className="mt-6 space-y-3 flex-1">
                  <li className="flex items-center gap-2 text-sm leading-6 text-[#252a2d]">
                    <span className="size-1.5 rounded-full bg-[var(--em-accent-ink,#a8381d)]" aria-hidden="true" />
                    {plan.productionDays} día{plan.productionDays > 1 ? "s" : ""} de producción al mes
                  </li>
                  <li className="flex items-center gap-2 text-sm leading-6 text-[#252a2d]">
                    <span className="size-1.5 rounded-full bg-[var(--em-accent-ink,#a8381d)]" aria-hidden="true" />
                    Fotografía con dron: {plan.drone === "included" ? "incluido" : "complemento ($99)"}
                  </li>
                  <li className="flex items-center gap-2 text-sm leading-6 text-[#252a2d]">
                    <span className="size-1.5 rounded-full bg-[var(--em-accent-ink,#a8381d)]" aria-hidden="true" />
                    {plan.postsPerWeek} publicación{plan.postsPerWeek.includes("–") ? "es" : ""} por semana
                  </li>
                </ul>
                <p className="mt-6 text-xs leading-5 text-[#5a6066]">
                  Mínimo de {REAL_ESTATE_PLAN_TERMS.minimumMonths} meses · cancelación con {REAL_ESTATE_PLAN_TERMS.cancelNoticeDays} días de aviso · reporte Metricool cada {REAL_ESTATE_PLAN_TERMS.reportEveryDays} días
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 max-w-3xl">
            <Link
              href="/es/precios/inmobiliaria"
              className="group inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
            >
              Ver la lista completa de tarifas con fotos, complementos y condiciones
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-t border-[#ddd4c8] py-12 sm:py-16 lg:py-20" data-section="re_guides">
        <Container size="xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--em-accent-ink,#a8381d)]">
            Guías de decisión
          </p>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-tight sm:text-4xl">
            Guías con respuesta directa para la próxima decisión sobre tu propiedad
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[#5a6066]">
            Cada guía comienza con la respuesta directa y luego amplía con preguntas frecuentes y precios transparentes de la misma fuente que la lista de tarifas.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {guides.map((guide) => (
              <GuideCard key={guide.href} guide={guide} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-[#ddd4c8] py-12 sm:py-16 lg:py-20" data-section="re_coverage">
        <Container size="xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--em-accent-ink,#a8381d)]">
            Área de servicio
          </p>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-tight sm:text-4xl">
            Base en Fort Lauderdale, cobertura en Miami-Dade y Broward
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[#252a2d]">
            Esteban Moreno Media tiene su base en Fort Lauderdale. La edición remota sirve a clientes en todo el país. La grabación en locación está disponible en Miami-Dade y Broward por proyecto. Palm Beach County es un área de expansión: la disponibilidad se confirma por dirección antes de agendar. El cargo fuera del área aplica al norte de West Palm Beach o al sur de Hollywood.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <MapPin className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h3 className="mt-5 font-serif text-xl">Fort Lauderdale (Base)</h3>
              <p className="mt-3 text-sm leading-6 text-[#252a2d]">Edición, planificación y centro de producción local. Prioridad en el condado de Broward.</p>
            </div>
            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <MapPin className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h3 className="mt-5 font-serif text-xl">Condado de Miami-Dade</h3>
              <p className="mt-3 text-sm leading-6 text-[#252a2d]">Proyectos seleccionados en locación: Miami, Coral Gables, Aventura, Sunny Isles, Brickell, Doral, Miami Beach.</p>
            </div>
            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <MapPin className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h3 className="mt-5 font-serif text-xl">Condado de Broward</h3>
              <p className="mt-3 text-sm leading-6 text-[#252a2d]">Fort Lauderdale, Hollywood, Pembroke Pines, Weston, Davie, Pompano Beach, Deerfield Beach.</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-[#ddd4c8] py-12 sm:py-16 lg:py-20" data-section="re_decision">
        <Container size="xl">
          <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-medium uppercase text-[#5a6066]">
                  Límite de decisión
                </p>
                <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
                  Plan mensual <span className="text-[var(--em-accent-ink,#a8381d)]">$750–$1,950</span>/mes vs sesión por propiedad
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Si publicas 2 o más propiedades al mes y necesitas Reels, fotos y dron de forma recurrente, un plan mensual reúne el trabajo con un costo predecible. Si tienes propiedades ocasionales o necesitas una sola sesión de fotografía, video o dron, la lista de tarifas por sesión da precios exactos por tamaño de la casa. Ambas usan las mismas cifras publicadas de la tarifa de Esteban.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/es/precios/inmobiliaria"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink,#a8381d)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Comparar Lista Completa
                </Link>
                <Link
                  href="/es/contacto"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  Preguntar Cuál Conviene
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-[#ddd4c8] py-12 sm:py-16 lg:py-20" data-section="re_proof">
        <Container size="xl">
          <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
            <Building2 className="size-8 text-[#e85d3e]" aria-hidden="true" />
            <h2 className="mt-5 font-serif text-3xl">Prueba inmobiliaria</h2>
            <p className="mt-4 text-sm leading-6 text-[#252a2d]">
              El proyecto <strong>Homeowners</strong> demuestra edición publicada de video inmobiliario para un cliente agencia.
            </p>
            <Link
              href="/es/portafolio/homeowners"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
            >
              Revisar Prueba de Video Inmobiliario Homeowners
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Container>
      </section>

      <section className="pb-12 sm:py-16" data-section="re_cta">
        <Container size="xl">
          <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-medium uppercase text-[#5a6066]">
                  Empezar
                </p>
                <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
                  ¿Listo para editar el video de tu próxima propiedad?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Envía clips de recorrido originales, tomas con dron, datos seguros de la propiedad, marca del agente y las características que deben mostrarse. Las tarifas por sesión están publicadas y cada proyecto recibe una cotización por escrito antes de empezar.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink,#a8381d)] px-5 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Correo
                </a>
                <a
                  href={site.phone.href}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  Llamar
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <PageUpdated path="/es/bienes-raices" locale="es" className="py-6 text-xs text-[#5a6066]" />
    </main>
  );
}