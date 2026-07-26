import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Mail, Phone, Send } from "lucide-react";

import { Container } from "@/components/ui/container";
import { getSpanishNichePage, spanishServices } from "@/lib/spanish-site";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";

type NicheLinkContext = {
  areaHref: string;
  areaLabel: string;
  note: string;
  serviceIds: string[];
  projects: { href: string; title: string; detail: string }[];
};

const nicheLinkContext: Record<string, NicheLinkContext> = {
  "videografo-en-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade",
    note: "Dos proyectos publicados en Miami muestran trabajo real de promoción, grabación y edición.",
    serviceIds: ["edicion", "planificacion-social", "videografia"],
    projects: [
      {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        detail: "Preproducción, modelos, locación, videografía y edición.",
      },
      {
        href: "/es/portafolio/healthy-smile",
        title: "Healthy Smile Miami",
        detail: "Guion tipo sketch, videografía y edición.",
      },
    ],
  },
  "videografo-en-fort-lauderdale": {
    areaHref: "/es/areas#fort-lauderdale",
    areaLabel: "Ver cobertura en Fort Lauderdale y Broward",
    note: "El portafolio verifica capacidades de producción y edición. Estos ejemplos no se presentan como proyectos realizados en Broward.",
    serviceIds: ["edicion", "planificacion-social", "videografia"],
    projects: [
      {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        detail: "Ejemplo publicado de producción en locación y edición en Miami.",
      },
      {
        href: "/es/portafolio/homeowners",
        title: "Homeowners",
        detail: "Trabajo publicado de guion y edición de video.",
      },
    ],
  },
  "fotografo-en-fort-lauderdale": {
    areaHref: "/es/areas#fort-lauderdale",
    areaLabel: "Ver cobertura en Fort Lauderdale y Broward",
    note: "La disponibilidad de fotografía sigue pendiente de confirmación. My D'ler verifica trabajo visual de marca, no una sesión fotográfica.",
    serviceIds: ["edicion", "contenido-ia", "planificacion-social", "videografia"],
    projects: [
      {
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        detail: "Piezas visuales de marca, diseños sociales, video 3D y mockups de producto.",
      },
    ],
  },
  "reels-para-negocios-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade",
    note: "Estos videos publicados muestran contenido social y promoción de negocios; no incluyen afirmaciones de resultados.",
    serviceIds: ["edicion", "planificacion-social", "videografia"],
    projects: [
      {
        href: "/es/portafolio/ml-colombia",
        title: "ML Colombia",
        detail: "Video para redes sociales seleccionado del portafolio de Esteban.",
      },
      {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        detail: "Video promocional en Miami con videografía y edición.",
      },
    ],
  },
  "video-para-restaurantes-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade",
    note: "Estos son ejemplos verificados de promoción de negocios en Miami; no se presentan como prueba de clientes de restaurantes.",
    serviceIds: ["edicion", "planificacion-social", "videografia"],
    projects: [
      {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        detail: "Preproducción, locación, videografía y edición.",
      },
      {
        href: "/es/portafolio/healthy-smile",
        title: "Healthy Smile Miami",
        detail: "Guion tipo sketch, videografía y edición.",
      },
    ],
  },
  "drone-real-estate-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver el área de Miami-Dade",
    note: "La disponibilidad de drone sigue pendiente de confirmación. Estos trabajos verifican producción y edición, no vuelo aéreo ni un proyecto de real estate.",
    serviceIds: ["edicion", "planificacion-social", "videografia"],
    projects: [
      {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        detail: "Ejemplo publicado de producción en locación y edición en Miami.",
      },
      {
        href: "/es/portafolio/homeowners",
        title: "Homeowners",
        detail: "Ejemplo publicado de guion y edición de video.",
      },
    ],
  },
  "editor-de-video-real-estate-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade y Broward",
    note: "El proyecto Homeowners demuestra trabajo publicado de guion y edición para el sector inmobiliario.",
    serviceIds: ["edicion", "planificacion-social"],
    projects: [
      {
        href: "/es/portafolio/homeowners",
        title: "Homeowners",
        detail: "Ejemplo publicado de guion y edición de video para bienes raíces.",
      },
    ],
  },
};

export function buildSpanishNicheMetadata(slug: string): Metadata {
  const page = getSpanishNichePage(slug);

  if (!page) {
    return {};
  }

  const path = `/es/${page.slug}`;

  return buildPageMetadata({
    title: page.metadataTitle,
    description: page.description,
    path,
    locale: "es",
    languages: {
      "es-US": path,
    },
  });
}

export function SpanishNichePage({ slug }: { slug: string }) {
  const page = getSpanishNichePage(slug);

  if (!page) {
    notFound();
  }

  const Icon = page.icon;
  const isPendingConfirmation =
    page.availability === "pending-confirmation";
  const linkContext = nicheLinkContext[page.slug];
  const relatedServices = linkContext
    ? spanishServices.filter((service) =>
        linkContext.serviceIds.includes(service.id),
      )
    : spanishServices;
  const path = `/es/${page.slug}`;
  const pageEntityJsonLd = isPendingConfirmation
    ? {
        "@type": "WebPage",
        "@id": absoluteUrl(`${path}#resource`),
        name: page.title,
        description: page.description,
        url: absoluteUrl(path),
        inLanguage: "es-US",
        about: page.keyword,
        isPartOf: { "@id": absoluteUrl("/#website") },
      }
    : {
        "@type": "Service",
        "@id": absoluteUrl(`${path}#service`),
        name: page.title,
        description: page.description,
        provider: {
          "@type": "LocalBusiness",
          "@id": absoluteUrl("/#business"),
          name: site.name,
          url: absoluteUrl("/"),
          email: site.email,
          telephone: site.phone.e164,
        },
        areaServed: page.location,
        availableLanguage: ["Spanish", "English"],
        serviceType: page.keyword,
      };
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      pageEntityJsonLd,
      {
        "@type": "BreadcrumbList",
        "@id": absoluteUrl(`${path}#breadcrumbs`),
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
            name: page.title,
            item: absoluteUrl(path),
          },
        ],
      },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20">
        <Container size="xl">
          <nav aria-label="Migas de pan" className="mb-8 text-sm text-[#5a6066]">
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
                {page.title}
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                {page.eyebrow}
              </p>
              <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-none sm:text-6xl">
                {page.h1}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                {page.lead}
              </p>
              {isPendingConfirmation ? (
                <p
                  role="note"
                  className="mt-6 max-w-2xl rounded-lg border border-[#c84a2c] bg-[#fbf6ef] p-4 text-sm leading-6 text-[#252a2d]"
                >
                  <strong>Estado:</strong> esta es una ruta educativa heredada. No
                  presenta fotografía ni drone como servicios disponibles.
                </p>
              ) : null}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/es/contacto"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#c84a2c] px-6 text-sm font-medium text-white hover:bg-[#a93e29]"
                >
                  {isPendingConfirmation
                    ? "Consultar servicios confirmados"
                    : "Consultar en español"}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/es/servicios"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  Ver servicios
                </Link>
                <Link
                  href="/es/guias"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  Ver guías de video
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Icon className="size-7 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">
                {isPendingConfirmation
                  ? "¿Qué explica esta página?"
                  : "¿Para qué proyecto encaja?"}
              </h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                {page.projectFit}
              </p>
              <dl className="mt-6 grid gap-3">
                <div className="rounded-md border border-[#ddd4c8] p-3">
                  <dt className="text-xs uppercase text-[#5a6066]">
                    {isPendingConfirmation ? "Tema" : "Servicio"}
                  </dt>
                  <dd className="mt-1 font-serif text-xl">{page.keyword}</dd>
                </div>
                <div className="rounded-md border border-[#ddd4c8] p-3">
                  <dt className="text-xs uppercase text-[#5a6066]">Zona</dt>
                  <dd className="mt-1 font-serif text-xl">{page.location}</dd>
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container size="xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <ContentList title="Puede ser relevante para" items={page.bestFor} />
            <ContentList
              title="Preguntas para definir el alcance"
              items={page.scopingQuestions}
            />
          </div>
        </Container>
      </section>

      {linkContext ? (
        <section className="border-t border-[#ddd4c8] py-12 sm:py-16">
          <Container size="xl">
            <div className="grid gap-8 lg:grid-cols-[.72fr_1fr]">
              <div>
                <p className="text-xs font-medium uppercase text-[#5a6066]">
                  Prueba publicada y contexto
                </p>
                <h2 className="mt-4 font-serif text-4xl leading-tight">
                  Revisa trabajo real antes de hablar del proyecto.
                </h2>
                <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                  {linkContext.note}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={linkContext.areaHref}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                  >
                    {linkContext.areaLabel}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/es/contacto"
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#c84a2c] px-5 text-sm font-medium text-white hover:bg-[#a93e29]"
                  >
                    {isPendingConfirmation
                      ? "Consultar servicios confirmados"
                      : "Hablar de esta idea"}
                  </Link>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {linkContext.projects.map((project) => (
                  <Link
                    key={project.href}
                    href={project.href}
                    className="group rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5 hover:border-[#e85d3e]"
                  >
                    <span className="flex items-center justify-between gap-3 font-serif text-2xl">
                      {project.title}
                      <ArrowRight
                        className="size-4 shrink-0 text-[#9f3c27] transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="mt-3 block text-sm leading-6 text-[#252a2d]">
                      {project.detail}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="border-y border-[#ddd4c8] bg-[#101214] py-12 text-[#f6f1ea] sm:py-16">
        <Container size="xl">
          <p className="text-xs font-medium uppercase text-[#ffb49e]">
            Servicios relacionados
          </p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight">
            Revisa las prioridades confirmadas relacionadas.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {relatedServices.map((service) => (
              <Link
                key={service.id}
                href={`/es/servicios#${service.id}`}
                className="rounded-lg border border-white/10 bg-white/[0.04] p-4 hover:bg-white/[0.08]"
              >
                <h3 className="font-serif text-xl">{service.name}</h3>
                <p className="mt-3 text-xs leading-5 text-[#c9c1b8]">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container size="xl">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1fr]">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Preguntas frecuentes
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight">
                Respuestas rápidas sobre alcance y disponibilidad.
              </h2>
            </div>
            <div className="grid gap-3">
              {page.faqs.map((faq) => (
                <article
                  key={faq.question}
                  className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5"
                >
                  <h3 className="font-serif text-2xl">{faq.question}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                    {faq.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-12 sm:pb-16">
        <Container size="xl">
          <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-medium uppercase text-[#5a6066]">
                  Siguiente paso
                </p>
                <h2 className="mt-3 font-serif text-4xl">
                  Comparte la meta, la zona y las referencias.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Esa información ayuda a conversar sobre los servicios
                  confirmados, sin asumir formatos, disponibilidad ni una forma de
                  trabajo específica.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#c84a2c] px-5 text-sm font-medium text-white hover:bg-[#a93e29]"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  Email
                </a>
                <a
                  href={site.phone.href}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  Llamar
                </a>
                <a
                  href={site.instagram}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  <Send className="size-4" aria-hidden="true" />
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

function ContentList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
      <h2 className="font-serif text-3xl">{title}</h2>
      <ul className="mt-6 space-y-4 text-sm leading-6 text-[#252a2d]">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <CheckCircle2
              className="mt-0.5 size-5 shrink-0 text-[#e85d3e]"
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
