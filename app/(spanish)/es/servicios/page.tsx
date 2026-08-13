import Link from "next/link";
import { ArrowRight, CheckCircle2, Laptop, MapPin } from "lucide-react";

import { Container } from "@/components/ui/container";
import { VideoBriefBuilder } from "@/components/video-brief-builder";
import { entityIds } from "@/lib/entity-schema";
import {
  spanishAreas,
  spanishNichePages,
  spanishServices,
} from "@/lib/spanish-site";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Edición de Video y Contenido",
  description:
    "Edición de video, contenido con IA, planificación para redes y producción por proyecto en español desde Fort Lauderdale.",
  path: "/es/servicios",
  locale: "es",
});

const serviceProof: Record<
  string,
  { href: string; label: string; detail: string }
> = {
  edicion: {
    href: "/es/portafolio/homeowners",
    label: "Homeowners",
    detail: "Trabajo publicado de edición de video.",
  },
  "contenido-ia": {
    href: "/es/portafolio/my-dler",
    label: "My D'ler",
    detail: "Trabajo visual relacionado: diseños sociales, video 3D y mockups de producto.",
  },
  "planificacion-social": {
    href: "/es/portafolio/ml-colombia",
    label: "ML Colombia",
    detail: "Un video para redes sociales publicado en el portafolio de Esteban.",
  },
  videografia: {
    href: "/es/portafolio/bar-door-monkey",
    label: "Bar Door Monkey Miami",
    detail: "Preproducción, locación, videografía y edición en un solo proyecto.",
  },
};

const spanishScopingQuestions = [
  {
    name: "¿Qué debe comunicar?",
    detail: "¿Cuál es la meta y dónde se publicaría el contenido?",
  },
  {
    name: "¿Qué material existe?",
    detail: "¿Hay archivos para editar o la idea requeriría una captura nueva?",
  },
  {
    name: "¿Importa la locación?",
    detail: "Para una idea local, ¿qué condado y tipo de lugar estarían involucrados?",
  },
  {
    name: "¿Qué falta confirmar?",
    detail: "Pregunta por disponibilidad, alcance, tiempo y necesidades de formato para el proyecto individual.",
  },
];

export default function SpanishServicesPage() {
  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": absoluteUrl("/es/servicios#servicios"),
    name: "Servicios creativos de Esteban Moreno Media",
    inLanguage: "es-US",
    itemListElement: spanishServices.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        url: absoluteUrl(`/es/servicios#${service.id}`),
        provider: {
          "@id": entityIds.business,
        },
        areaServed: spanishAreas.map((area) => area.name),
        availableLanguage: ["Spanish", "English"],
      },
    })),
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <section className="py-12 sm:py-16">
        <Container size="xl">
          <p className="text-xs font-medium uppercase text-[#5a6066]">
            Servicios en español
          </p>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-none sm:text-6xl">
            Edición, contenido con IA, planificación y producción según el proyecto.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
            Empieza por la meta y el lugar donde se publicará el contenido.
            Esteban puede trabajar de forma remota con material existente o
            planificar una captura puntual en South Florida. La atención es
            primero en español y también hay comunicación disponible en inglés
            intermedio.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {spanishServices.map((service) => {
              const Icon = service.icon;
              const proof = serviceProof[service.id];
              return (
                <article
                  id={service.id}
                  key={service.id}
                  className="scroll-mt-24 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6"
                >
                  <Icon className="size-6 text-[#e85d3e]" aria-hidden="true" />
                  <h2 className="mt-5 font-serif text-3xl">{service.name}</h2>
                  <p className="mt-3 leading-7 text-[#252a2d]">
                    {service.description}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-[#5a6066]">
                    <CheckCircle2
                      className="mr-2 inline size-4 text-[#1a9fa3]"
                      aria-hidden="true"
                    />
                    {service.detail}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#ddd4c8] px-3 py-1 text-xs uppercase text-[#5a6066]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {service.id === "diseno-web" || service.id === "website-design" ? (
                    <Link
                      href="/es/diseno-web-fort-lauderdale"
                      className="group mt-6 block rounded-lg border border-[#c84a2c] bg-[#c84a2c] p-5 text-white shadow-sm transition hover:bg-[#a93e29]"
                    >
                      <span className="text-xs font-bold uppercase tracking-wider text-[#f0b384]">
                        Centro Destacado de Diseño Web & IA
                      </span>
                      <span className="mt-2 flex items-center justify-between gap-3 font-serif text-xl font-bold text-white">
                        Explorar Centro de Diseño Web & Chatbots con IA
                        <ArrowRight
                          className="size-5 shrink-0 transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="mt-2 block text-sm leading-6 text-[#f6f1ea]">
                        Ver aplicaciones web personalizadas, motores para concesionarios y chatbots de captura con IA para TitanForge, Geebs, FLAS y Frontline Auto.
                      </span>
                    </Link>
                  ) : proof ? (
                    <Link
                      href={proof.href}
                      className="group mt-6 block rounded-md border border-[#ddd4c8] bg-white/50 p-4 hover:border-[#e85d3e]"
                    >
                      <span className="text-xs font-medium uppercase text-[#5a6066]">
                        Trabajo publicado relacionado
                      </span>
                      <span className="mt-2 flex items-center justify-between gap-3 font-serif text-xl">
                        {proof.label}
                        <ArrowRight
                          className="size-4 shrink-0 text-[#9f3c27] transition-transform group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="mt-2 block text-sm leading-6 text-[#5a6066]">
                        {proof.detail}
                      </span>
                    </Link>
                  ) : null}
                </article>
              );
            })}
          </div>

          <section className="mt-14" aria-labelledby="modalidad-heading">
            <p className="text-xs font-medium uppercase text-[#5a6066]">
              Remoto o en locación
            </p>
            <h2
              id="modalidad-heading"
              className="mt-4 max-w-3xl font-serif text-4xl leading-tight"
            >
              El flujo depende del material que ya tienes.
            </h2>
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <article className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
                <Laptop className="size-7 text-[#1a9fa3]" aria-hidden="true" />
                <h3 className="mt-4 font-serif text-3xl">Trabajo remoto</h3>
                <p className="mt-3 leading-7 text-[#252a2d]">
                  La edición, el contenido asistido por IA y la planificación
                  pueden empezar con videos, referencias y una meta de
                  publicación, aunque el cliente no esté en South Florida.
                </p>
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  <Link className="text-[#9f3c27] underline underline-offset-4" href="#edicion">
                    Edición de video
                  </Link>
                  <Link className="text-[#9f3c27] underline underline-offset-4" href="#contenido-ia">
                    Contenido con IA
                  </Link>
                  <Link className="text-[#9f3c27] underline underline-offset-4" href="#planificacion-social">
                    Planificación
                  </Link>
                  <Link className="text-[#9f3c27] underline underline-offset-4" href="/es/reels-para-negocios-miami">
                    Reels para negocios
                  </Link>
                </div>
              </article>
              <article className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
                <MapPin className="size-7 text-[#e85d3e]" aria-hidden="true" />
                <h3 className="mt-4 font-serif text-3xl">Captura en South Florida</h3>
                <p className="mt-3 leading-7 text-[#252a2d]">
                  Fort Lauderdale y Broward son la base local. Hay proyectos
                  seleccionados en Miami-Dade, mientras Palm Beach County sigue
                  siendo un área de expansión considerada por proyecto.
                </p>
                <Link
                  href="/es/areas"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
                >
                  Comparar áreas de servicio
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </article>
            </div>
          </section>

          <section className="mt-14" aria-labelledby="proceso-heading">
            <p className="text-xs font-medium uppercase text-[#5a6066]">
              Preguntas de alcance
            </p>
            <h2
              id="proceso-heading"
              className="mt-4 max-w-3xl font-serif text-4xl leading-tight"
            >
              Preguntas que ayudan a definir un proyecto individual.
            </h2>
            <ul className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {spanishScopingQuestions.map((question, index) => (
                <li
                  key={question.name}
                  className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5"
                >
                  <span className="text-xs font-medium uppercase text-[#9f3c27]">
                    Pregunta {index + 1}
                  </span>
                  <h3 className="mt-3 font-serif text-2xl">{question.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                    {question.detail}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-12">
            <VideoBriefBuilder locale="es" />
          </div>

          <div className="mt-14 rounded-lg bg-[#101214] p-6 text-[#f6f1ea] sm:p-8">
            <h2 className="font-serif text-4xl">¿No sabes cuál servicio encaja?</h2>
            <p className="mt-4 max-w-2xl leading-7 text-[#d8d0c7]">
              Envía la meta, la ciudad o los archivos disponibles, y dónde se
              publicará la pieza. Esteban puede orientar el siguiente paso sin
              convertir la conversación en un paquete genérico.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/es/contacto"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#c84a2c] px-6 text-sm font-medium text-white hover:bg-[#a93e29]"
              >
                Hablar del proyecto
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/es/portafolio"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-6 text-sm font-medium text-white hover:bg-white hover:text-[#101214]"
              >
                Ver trabajos publicados
              </Link>
              <Link
                href="/es/guias"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-6 text-sm font-medium text-white hover:bg-white hover:text-[#101214]"
              >
                Leer guías prácticas de video
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-[#ddd4c8] py-12 sm:py-16">
        <Container size="xl">
          <p className="text-xs font-medium uppercase text-[#5a6066]">
            Páginas por tipo de proyecto
          </p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight">
            Revisa servicios confirmados y rutas heredadas con su estado visible.
          </h2>
          <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {spanishNichePages.map((page) => (
              <Link
                key={page.slug}
                href={`/es/${page.slug}`}
                className="flex min-h-24 items-center justify-between gap-4 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-4 hover:border-[#e85d3e]"
              >
                <span>
                  <span className="block font-serif text-xl">{page.title}</span>
                  <span className="mt-1 block text-xs uppercase text-[#5a6066]">
                    {page.location}
                  </span>
                </span>
                <ArrowRight
                  className="size-4 shrink-0 text-[#e85d3e]"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
