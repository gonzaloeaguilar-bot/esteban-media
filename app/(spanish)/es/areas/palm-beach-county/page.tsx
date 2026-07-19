import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Languages,
  MapPin,
  Scissors,
  Video,
  WandSparkles,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl } from "@/lib/site";

const cities = [
  "Boca Raton",
  "Delray Beach",
  "Boynton Beach",
  "West Palm Beach",
  "Palm Beach",
  "Palm Beach Gardens",
  "Jupiter",
  "Wellington",
  "Lake Worth Beach",
];

const palmBeachServices = [
  {
    name: "Edición remota",
    description:
      "Reels, captions, color y exportes listos para plataforma a partir de material ya grabado.",
    icon: Scissors,
  },
  {
    name: "IA y planificación social",
    description:
      "Contenido asistido por IA y un plan práctico basado en los formatos que necesita el negocio.",
    icon: WandSparkles,
  },
  {
    name: "Grabación móvil",
    description:
      "Grabación con teléfono para redes sociales, restaurantes, real estate, productos y proyectos locales pequeños.",
    icon: Video,
  },
  {
    name: "Producto y opciones aéreas",
    description:
      "Fotografía de producto y tomas aéreas cotizadas solo después de confirmar requisitos de captura y piloto autorizado disponible.",
    icon: Camera,
  },
];

const questions = [
  {
    question: "¿Esteban Moreno Media trabaja en Palm Beach County?",
    answer:
      "Palm Beach County es un área de expansión. Esteban está basado en Fort Lauderdale y considera proyectos seleccionados por cotización, confirmando traslado, horario, estacionamiento, acceso, equipo y entregables antes de reservar.",
  },
  {
    question: "¿Qué ciudades de Palm Beach County cubre?",
    answer:
      "Boca Raton es un mercado prioritario para la expansión. Delray Beach, Boynton Beach, West Palm Beach, Palm Beach, Palm Beach Gardens, Jupiter, Wellington, Lake Worth Beach y zonas cercanas se consideran por cotización.",
  },
  {
    question: "¿Cómo se manejan los costos de traslado?",
    answer:
      "Puede aplicarse un cargo de traslado después de 20 millas desde Fort Lauderdale. El estacionamiento requerido se agrega a la cotización y los viajes más largos se confirman antes de reservar.",
  },
  {
    question: "¿El drone está garantizado en cualquier locación?",
    answer:
      "No. El trabajo aéreo se cotiza solo después de confirmar piloto acreditado disponible, espacio aéreo, clima, permiso de la propiedad y seguridad de la locación.",
  },
  {
    question: "¿Todo el proyecto se puede manejar en español?",
    answer:
      "Sí. El español es la lengua nativa de Esteban. También puede comunicarse en inglés a nivel intermedio.",
  },
  {
    question: "¿Con cuánto tiempo debo reservar un trabajo en locación?",
    answer:
      "Se recomienda reservar con tres o cuatro días de anticipación. Las solicitudes urgentes pueden evaluarse según la carga de trabajo.",
  },
  {
    question: "¿Cuántas rondas de revisión se incluyen?",
    answer:
      "Normalmente se incluyen dos rondas: comentarios sobre el primer corte y una ronda final de ajustes. Las revisiones adicionales se cotizan aparte.",
  },
];

export const metadata = buildPageMetadata({
  title: "Edición de Video en Palm Beach County",
  description:
    "Edición de video, contenido con IA, planificación para redes, grabación móvil y proyectos seleccionados para negocios de Palm Beach County.",
  path: "/es/areas/palm-beach-county",
  locale: "es",
});

export default function SpanishPalmBeachCountyPage() {
  const pageUrl = absoluteUrl("/es/areas/palm-beach-county");
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Edición de video y contenido en Palm Beach County",
        description: metadata.description,
        inLanguage: "es-US",
        isPartOf: { "@id": absoluteUrl("/#website") },
        mainEntity: { "@id": `${pageUrl}#service` },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Servicios de edición y contenido en Palm Beach County",
        serviceType: [
          "Edición de video",
          "Contenido asistido por IA",
          "Planificación de redes sociales",
          "Grabación móvil",
          "Fotografía de producto",
        ],
        description:
          "Edición remota y servicios seleccionados de contenido en locación para negocios de Palm Beach County.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Palm Beach County, Florida",
          containsPlace: cities.map((name) => ({
            "@type": "City",
            name,
          })),
        },
        availableLanguage: ["Spanish", "English"],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumbs`,
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
            name: "Áreas de servicio",
            item: absoluteUrl("/es/areas"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Palm Beach County",
            item: pageUrl,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20">
        <Container size="xl">
          <nav aria-label="Navegación" className="text-sm text-[#5a6066]">
            <Link href="/es/areas" className="hover:text-[#c84a2c]">
              Áreas de servicio
            </Link>{" "}
            / Palm Beach County
          </nav>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-start lg:gap-16">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Área de servicio / Palm Beach County
              </p>
              <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-none sm:text-6xl">
                Contenido para Palm Beach County, disponible por cotización.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                <strong>Respuesta rápida:</strong> Palm Beach County es un área
                de expansión para Esteban Moreno Media. Boca Raton es una
                prioridad y las demás ciudades se consideran cuando el proyecto,
                traslado, equipo y fecha encajan.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/es/contacto"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#e85d3e] px-6 text-sm font-medium text-white hover:bg-[#c84a2c]"
                >
                  Consultar un proyecto en Palm Beach
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/areas/palm-beach-county"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  <Languages className="size-4" aria-hidden="true" />
                  Ver en inglés
                </Link>
              </div>
            </div>

            <aside className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <MapPin className="size-6 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">Ciudades consideradas por cotización</h2>
              <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                La dirección, ventana de acceso, estacionamiento, peajes,
                equipo y tiempo de traslado se confirman durante la cotización.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Ciudades de Palm Beach County">
                {cities.map((city) => (
                  <li
                    key={city}
                    className="rounded-full border border-[#ddd4c8] px-3 py-1 text-xs text-[#5a6066]"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16" aria-labelledby="servicios-palm-beach">
        <Container size="xl">
          <p className="text-xs font-medium uppercase text-[#5a6066]">
            Servicios disponibles
          </p>
          <h2 id="servicios-palm-beach" className="mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">
            Un sistema visual, definido por entregables reales.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {palmBeachServices.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.name}
                  className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5"
                >
                  <Icon className="size-6 text-[#e85d3e]" aria-hidden="true" />
                  <h3 className="mt-5 font-serif text-2xl">{service.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                    {service.description}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-y border-[#ddd4c8] bg-[#ece5da] py-12 sm:py-16">
        <Container size="xl">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1fr]">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Antes de reservar
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight">
                Respuestas directas para proyectos en Palm Beach County.
              </h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Envía la ciudad, fecha, meta del proyecto, referencias y uso
                final. Con eso se puede empezar un scope útil.
              </p>
            </div>
            <dl className="grid gap-3">
              {questions.map((item) => (
                <div
                  key={item.question}
                  className="rounded-lg border border-[#d0c7bb] bg-[#f6f1ea] p-5"
                >
                  <dt className="font-serif text-2xl">{item.question}</dt>
                  <dd className="mt-3 text-sm leading-6 text-[#252a2d]">
                    {item.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container size="xl">
          <div className="rounded-lg bg-[#101214] p-6 text-[#f6f1ea] sm:p-8">
            <h2 className="font-serif text-4xl">¿Ya tienes una locación en Palm Beach County?</h2>
            <p className="mt-4 max-w-2xl leading-7 text-[#d8d0c7]">
              Comparte la dirección o venue, fecha, entregables y deadline.
              Esteban confirma disponibilidad y cualquier detalle de traslado o
              locación antes de que te comprometas.
            </p>
            <Link
              href="/es/contacto"
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#e85d3e] px-6 text-sm font-medium text-white hover:bg-[#c84a2c]"
            >
              Mandar el brief
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
