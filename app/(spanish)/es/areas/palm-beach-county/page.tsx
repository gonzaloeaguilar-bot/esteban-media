import Link from "next/link";
import {
  ArrowRight,
  CalendarRange,
  Languages,
  MapPin,
  Scissors,
  Video,
  WandSparkles,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl } from "@/lib/site";

const palmBeachServices = [
  {
    name: "Edición remota",
    description:
      "Una prioridad confirmada para proyectos que parten de material existente y una meta de publicación.",
    icon: Scissors,
  },
  {
    name: "Contenido asistido por IA",
    description:
      "El contenido asistido por IA es una prioridad confirmada, definida según la meta y el uso previsto.",
    icon: WandSparkles,
  },
  {
    name: "Planificación para redes",
    description:
      "Una prioridad confirmada para conversar sobre audiencia, canales, metas de publicación y necesidades de contenido.",
    icon: CalendarRange,
  },
  {
    name: "Captura de contenido en locación",
    description:
      "La producción local de video se considera de forma selectiva después de conocer la locación, la meta y las necesidades de captura.",
    icon: Video,
  },
];

const questions = [
  {
    question: "¿Esteban Moreno Media trabaja en Palm Beach County?",
    answer:
      "Palm Beach County es un área de expansión. Esteban está basado en Fort Lauderdale y considera proyectos seleccionados después de conocer la zona, la meta y las necesidades generales.",
  },
  {
    question: "¿Se publica cobertura por ciudad en Palm Beach County?",
    answer:
      "No. Palm Beach County se publica solo como área de expansión a nivel de condado hasta que Esteban confirme la disponibilidad en ciudades específicas.",
  },
  {
    question: "¿Un cliente en Palm Beach County puede trabajar de forma remota?",
    answer:
      "Sí. La edición de video, el contenido con IA y la planificación para redes pueden comenzar con archivos y referencias sin una visita en locación.",
  },
  {
    question: "¿La producción en locación está disponible para cualquier consulta?",
    answer:
      "No se publica una disponibilidad universal. La producción local de video se considera de forma selectiva después de conocer la locación y las necesidades de captura.",
  },
  {
    question: "¿Todo el proyecto se puede manejar en español?",
    answer:
      "Sí. El español es el idioma principal de Esteban. También puede comunicarse en inglés a nivel intermedio.",
  },
  {
    question: "¿Qué información ayuda a revisar un proyecto local?",
    answer:
      "Comparte la ciudad, la meta del proyecto, el uso previsto, los archivos disponibles y las referencias visuales. Con eso se puede iniciar la conversación.",
  },
  {
    question: "¿Dónde puedo revisar el trabajo de Esteban?",
    answer:
      "El portafolio público incluye ocho videos seleccionados del canal de YouTube de Esteban con los datos y créditos disponibles.",
  },
];

export const metadata = buildPageMetadata({
  title: "Edición de Video en Palm Beach County",
  description:
    "Edición de video, contenido con IA, planificación para redes y proyectos seleccionados de captura local para negocios de Palm Beach County.",
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
          "Producción de video en locación definida de forma selectiva",
        ],
        description:
          "Servicios creativos remotos y producción local de video definida de forma selectiva para el área de expansión de Palm Beach County.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Palm Beach County, Florida",
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
          <nav aria-label="Migas de pan" className="text-sm text-[#5a6066]">
            <Link href="/es" className="hover:text-[#9f3c27]">
              Inicio
            </Link>{" "}
            /{" "}
            <Link href="/es/areas" className="hover:text-[#9f3c27]">
              Áreas de servicio
            </Link>{" "}
            / Palm Beach County
          </nav>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-start lg:gap-16">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Área de servicio / Palm Beach County
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Contenido para Palm Beach County, considerado proyecto por proyecto.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                <strong>Respuesta rápida:</strong> Palm Beach County es un área
                de expansión para Esteban Moreno Media. La disponibilidad se
                considera por proyecto y todavía no se publica cobertura por
                ciudad.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/es/contacto"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#c84a2c] px-6 text-sm font-medium text-white hover:bg-[#a93e29]"
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

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <MapPin className="size-6 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">Área de expansión a nivel de condado</h2>
              <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                Palm Beach County sigue siendo un mercado de expansión considerado
                proyecto por proyecto. No se enumeran ciudades hasta que Esteban
                confirme dónde es práctica la producción local actualmente.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16" aria-labelledby="servicios-palm-beach">
        <Container size="xl">
          <p className="text-xs font-medium uppercase text-[#5a6066]">
            Prioridades confirmadas
          </p>
          <h2 id="servicios-palm-beach" className="mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">
            Servicios que se pueden conversar sin asumir un paquete fijo.
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
                Antes de consultar
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight">
                Respuestas directas para proyectos en Palm Beach County.
              </h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Las preguntas útiles de alcance cubren el condado, la meta, el
                material disponible, las referencias y el uso previsto. No
                implican disponibilidad local ni entregables fijos.
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
            <h2 className="font-serif text-4xl">¿Tienes un proyecto en Palm Beach County?</h2>
            <p className="mt-4 max-w-2xl leading-7 text-[#d8d0c7]">
              Comparte el condado, la meta, el uso previsto y las referencias
              visuales para conversar sobre si la disponibilidad actual del área
              de expansión podría encajar.
            </p>
            <Link
              href="/es/contacto"
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#c84a2c] px-6 text-sm font-medium text-white hover:bg-[#a93e29]"
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
