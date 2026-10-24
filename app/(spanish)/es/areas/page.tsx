import { KeepReading } from "@/components/keep-reading";
import Link from "next/link";
import { ArrowRight, HelpCircle, Laptop, MapPin } from "lucide-react";
import { EventSeasonLinks } from "@/components/event-content-page";

import { SpanishServiceLandingDirectory } from "@/components/spanish-service-landing-directory";
import { Container } from "@/components/ui/container";
import { spanishAreas } from "@/lib/spanish-site";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Servicios de edición de video en Miami y Fort Lauderdale",
  description:
    "Explora edición de video, contenido con IA y planificación social para Fort Lauderdale, Broward y Miami-Dade. Palm Beach se evalúa según el proyecto.",
  path: "/es/areas",
  locale: "es",
});

const areaAnchors: Record<string, string> = {
  "Fort Lauderdale": "fort-lauderdale",
  "Broward County": "broward-county",
  "Miami-Dade": "miami-dade",
  "Palm Beach County": "palm-beach-county",
};

/**
 * Una sección por zona (2026-10-24). GSC 2026-07-26..10-22 mostró este hub
 * posicionando por delante de las páginas hechas para la consulta ("editor de
 * reels fort lauderdale" repartido entre /areas, /es y la guía de costos, con la
 * página dedicada en 57). Cada bloque nombra la zona, dice qué hace Esteban allí
 * y entrega la pregunta de servicio a la página dedicada con el ancla exacta.
 * Nunca responde la consulta de servicio: sin precios ni entregables.
 */
type AreaRoute = { href: string; label: string };
type AreaSection = {
  name: string;
  question: string;
  intro: string;
  routes: AreaRoute[];
  outro: string;
};

const areaSections: AreaSection[] = [
  {
    name: "Fort Lauderdale",
    question: "¿Qué edita y graba Esteban en Fort Lauderdale?",
    intro:
      "Fort Lauderdale es la base. La edición de video corto para restaurantes, real estate, náutica y negocios locales empieza aquí con material enviado, y la grabación en locación se evalúa primero desde esta ciudad. Si tu pregunta es sobre un servicio concreto, la página hecha para ese servicio responde más rápido que este resumen:",
    routes: [
      { href: "/es/editor-de-reels-fort-lauderdale", label: "editor de Reels en Fort Lauderdale" },
      { href: "/es/editor-de-video-ugc-para-ecommerce", label: "editor de video UGC para e-commerce" },
      { href: "/es/produccion-de-video-fort-lauderdale", label: "producción de video en Fort Lauderdale" },
      { href: "/es/videografo-en-fort-lauderdale", label: "videógrafo en Fort Lauderdale" },
    ],
    outro:
      "Esas páginas explican para quién es el servicio, cómo funciona la entrega y cómo enviar el material. Usa este hub solo para confirmar que Fort Lauderdale está cubierto y sigue en la página del servicio.",
  },
  {
    name: "Broward County",
    question: "¿Qué ciudades de Broward, además de Fort Lauderdale, están cubiertas?",
    intro:
      "Broward County es el mercado local habitual: Weston, Hollywood, Pembroke Pines, Plantation y las ciudades entre ellas se tratan como trabajo local. La edición viaja en archivos, así que un negocio de Broward puede empezar en remoto; una jornada de grabación se confirma por proyecto cuando se conoce el lugar y el objetivo. Ya hay guías para las ciudades que más preguntan:",
    routes: [
      { href: "/es/edicion-de-video-corporativo-weston", label: "edición de video corporativo en Weston" },
      { href: "/es/video-para-negocios-hollywood-fl", label: "video para pequeños negocios en Hollywood, FL" },
      { href: "/es/video-para-pequenos-negocios-pembroke-pines", label: "video para pequeños negocios en Pembroke Pines" },
    ],
    outro:
      "Si tu ciudad no aparece, aplican las páginas de Fort Lauderdale: el mismo editor, el mismo flujo y grabación en locación evaluada localmente en cualquier punto de Broward.",
  },
  {
    name: "Miami-Dade",
    question: "¿Qué proyectos toma Esteban en Miami-Dade?",
    intro:
      "Miami-Dade está disponible para proyectos seleccionados: restaurantes, marcas, real estate y emprendedores que ya tienen material o confirman una fecha de grabación. Más abajo se listan trabajos publicados en Miami. Las preguntas de servicio que la gente busca en Miami tienen su propia página, y cada una responde con más precisión que un resumen por zona:",
    routes: [
      { href: "/es/edicion-de-video-promocional-para-restaurantes-miami", label: "edición de video promocional para restaurantes en Miami" },
      { href: "/es/editor-de-reels-miami", label: "editor de Reels en Miami" },
      { href: "/es/editor-de-video-miami", label: "editor de video en Miami" },
      { href: "/es/videografo-en-miami", label: "videógrafo en Miami" },
    ],
    outro:
      "La edición remota para clientes de Miami empieza el día que llegan los archivos. La grabación en Miami-Dade se confirma proyecto por proyecto, y las páginas de servicio lo explican antes de que envíes la consulta.",
  },
  {
    name: "Palm Beach County",
    question: "¿Palm Beach County forma parte del área de servicio?",
    intro:
      "Palm Beach County es un área de expansión que se evalúa proyecto por proyecto. La edición remota y la planificación de contenido están disponibles ya para cualquier negocio de Palm Beach con material grabado; la grabación en locación se confirma en cada consulta, nunca se da por hecha. Ya hay guías por ciudad para los lugares con más demanda:",
    routes: [
      { href: "/es/areas/palm-beach-county", label: "página de servicio para Palm Beach County" },
      { href: "/es/produccion-de-video-palm-beach-county", label: "producción de video en Palm Beach" },
      { href: "/es/editor-de-reels-boca-raton", label: "editor de Reels y video en Boca Raton" },
      { href: "/es/produccion-de-video-delray-beach", label: "producción de video en Delray Beach" },
    ],
    outro:
      "Empieza por la página del condado si no sabes qué guía encaja. Explica cómo se evalúa un proyecto en Palm Beach y qué incluir en el primer mensaje.",
  },
];

const miamiProof = [
  {
    href: "/es/portafolio/bar-door-monkey",
    title: "Bar Door Monkey Miami",
    detail:
      "Video promocional en Miami con preproducción, locación, videografía y edición.",
  },
  {
    href: "/es/portafolio/healthy-smile",
    title: "Healthy Smile Miami",
    detail:
      "Video promocional en Miami desarrollado desde un guion tipo sketch hasta la grabación y edición.",
  },
];

const serviceAreaFaqs = [
  {
    question: "¿Cómo se diferencia la edición remota de la producción en locación?",
    answer:
      "La edición de video remota, los flujos con IA y la planificación para redes comienzan directamente desde el material grabado y referencias visuales del cliente, atendiendo marcas en South Florida y en cualquier ubicación. La grabación en locación se evalúa de manera selectiva según la sede del rodaje, los objetivos y el calendario en Fort Lauderdale o Broward, con disponibilidad en Miami-Dade para proyectos confirmados.",
  },
  {
    question: "¿Se puede editar material grabado fuera del sur de la Florida?",
    answer:
      "Sí. La postproducción de video, mezcla de audio, corrección de color y adaptación de formatos para redes sociales funcionan directamente con archivos digitales transferidos por internet sin restricciones geográficas.",
  },
  {
    question: "¿Cómo se evalúa la disponibilidad para Palm Beach County?",
    answer:
      "Palm Beach County es un área de expansión evaluada individualmente por proyecto para grabaciones en locación. La edición remota de video y la planificación de contenido están disponibles de inmediato para cualquier proyecto con material existente.",
  },
  {
    question: "¿Ofrecen atención y contenido bilingüe en español e inglés?",
    answer:
      "Sí. Esteban Moreno Media brinda atención principal en español y comunicación fluida en inglés, estructurando guiones, subtítulos dinámicos y narrativa de video adaptada para audiencias hispanohablantes y del mercado general en Estados Unidos.",
  },
  {
    question: "¿Qué información conviene compartir al solicitar una cotización?",
    answer:
      "Indica si ya cuentas con material grabado o si requieres una jornada de rodaje en locación. Compartir el objetivo comercial, los canales de publicación previstos y la fecha estimada de entrega permite definir si el proyecto puede iniciar en remoto o requiere coordinar una visita técnica en South Florida.",
  },
];

const projectTypeLinks = [
  {
    href: "/es/videografo-en-miami",
    title: "Video para proyectos en Miami-Dade",
    detail:
      "Revisa el enfoque de edición y producción selectiva para proyectos definidos en Miami-Dade.",
  },
  {
    href: "/es/videografo-en-fort-lauderdale",
    title: "Video para proyectos en Fort Lauderdale y Broward",
    detail:
      "Consulta el punto de partida para una grabación o edición vinculada a la base local.",
  },
  {
    href: "/es/reels-para-negocios-miami",
    title: "Reels para negocios en Miami",
    detail:
      "Encuentra detalles sobre edición de video corto para Instagram, TikTok y YouTube Shorts.",
  },
  {
    href: "/es/diseno-web-fort-lauderdale",
    title: "Diseño Web y Chatbots en Fort Lauderdale",
    detail:
      "Sitios web modernos de alta conversión y chatbots conversacionales con IA para negocios locales.",
  },
  {
    href: "/es/produccion-de-video-doral-miami",
    title: "Producción de video en Doral Miami",
    detail:
      "Producción audiovisual y contenido comercial para marcas y negocios en el área de Doral.",
  },
  {
    href: "/es/produccion-de-video-palm-beach-county",
    title: "Producción de video en Palm Beach",
    detail:
      "Alcance y producción selectiva de video para proyectos y marcas en Palm Beach County.",
  },
  {
    href: "/es/edicion-de-video-corporativo-weston",
    title: "Edición de video corporativo en Weston",
    detail:
      "Postproducción de video profesional para empresas y firmas corporativas en Broward.",
  },
  {
    href: "/es/video-inmobiliario-coral-gables",
    title: "Video inmobiliario en Coral Gables",
    detail:
      "Recorridos inmobiliarios y video de arquitectura para propiedades en Miami-Dade.",
  },
  {
    href: "/es/video-para-yates-y-hospitalidad-fort-lauderdale",
    title: "Video para yates y hospitalidad en Fort Lauderdale",
    detail:
      "Producción de video para la industria náutica, hospitalidad y turismo en Fort Lauderdale.",
  },
];

export default function SpanishAreasPage() {
  const areaJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        "@id": absoluteUrl("/es/areas#areas-de-servicio"),
        name: "Áreas de servicio de Esteban Moreno Media",
        inLanguage: "es-US",
        itemListElement: spanishAreas.map((area, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": area.name === "Fort Lauderdale" ? "City" : "AdministrativeArea",
            name: area.name,
            description: area.description,
            url: absoluteUrl(`/es/areas#${areaAnchors[area.name]}`),
          },
        })),
      },
      {
        "@type": "FAQPage",
        "@id": absoluteUrl("/es/areas#faq"),
        inLanguage: "es-US",
        mainEntity: serviceAreaFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(areaJsonLd) }}
      />
      <section className="py-12 sm:py-16">
        <Container size="xl">
          <nav aria-label="Migas de pan" className="mb-6 text-sm text-[#5a6066]">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/es" className="hover:text-[#9f3c27]">
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">
                Áreas de servicio
              </li>
            </ol>
          </nav>
          <p className="text-xs font-medium uppercase text-[#5a6066]">
            Áreas de servicio
          </p>
          <h1 className="mt-4 max-w-4xl font-serif em-display">
            Fort Lauderdale como base, tres condados como área de servicio.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
            Fort Lauderdale y Broward son la base local, con proyectos
            seleccionados disponibles en Miami-Dade. Palm Beach County sigue
            siendo un área de expansión considerada por proyecto. Esteban
            trabaja como negocio de área de servicio y no publica una dirección
            de estudio.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {areaSections.map((area) => (
              <article
                key={area.name}
                id={areaAnchors[area.name]}
                className="scroll-mt-24 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6"
              >
                <MapPin className="size-6 text-[#e85d3e]" aria-hidden="true" />
                <p className="mt-5 text-xs uppercase text-[#5a6066]">
                  {area.name}
                </p>
                <h2 className="mt-3 font-serif text-3xl leading-tight">
                  {area.question}
                </h2>
                <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                  {area.intro}
                </p>
                <ul className="mt-3 space-y-1.5 text-sm leading-6">
                  {area.routes.map((route) => (
                    <li key={route.href}>
                      <Link
                        href={route.href}
                        className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]"
                      >
                        {route.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                  {area.outro}
                </p>
              </article>
            ))}
          </div>

          <section className="mt-14" aria-labelledby="modalidad-zona-heading">
            <p className="text-xs font-medium uppercase text-[#5a6066]">
              Qué cambia según la ubicación
            </p>
            <h2
              id="modalidad-zona-heading"
              className="mt-4 max-w-3xl font-serif text-4xl leading-tight"
            >
              Los archivos viajan en remoto; una grabación empieza con el lugar.
            </h2>
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <article className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
                <Laptop className="size-7 text-[#1a9fa3]" aria-hidden="true" />
                <h3 className="mt-4 font-serif text-3xl">Edición y planificación remota</h3>
                <p className="mt-3 leading-7 text-[#252a2d]">
                  La edición de video, el contenido con IA y la planificación
                  para redes pueden empezar con archivos y referencias. Esos
                  servicios están disponibles fuera de South Florida.
                </p>
                {/* DM-5 / DM-7 (2026-10-14): GSC ranked this hub for "editor de
                    video fort lauderdale" (@43) and "editor de videos ugc miami"
                    (@52); these anchors point each query at the page that answers it. */}
                <p className="mt-3 leading-7 text-[#252a2d]">
                  Para empezar, revisa al{" "}
                  <Link href="/es/editor-de-reels-fort-lauderdale" className="font-medium text-[#9f3c27] underline underline-offset-4">
                    editor de Reels en Fort Lauderdale
                  </Link>
                  , al{" "}
                  <Link href="/es/editor-de-video-ugc-para-ecommerce" className="font-medium text-[#9f3c27] underline underline-offset-4">
                    editor de videos UGC en Miami
                  </Link>{" "}
                  o al{" "}
                  <Link href="/es/editor-de-video-miami" className="font-medium text-[#9f3c27] underline underline-offset-4">
                    editor de video en Miami
                  </Link>
                  .
                </p>
                <Link
                  href="/es/editor-de-reels-fort-lauderdale"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
                >
                  Explorar edición de Reels en Fort Lauderdale
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </article>
              <article className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
                <MapPin className="size-7 text-[#e85d3e]" aria-hidden="true" />
                <h3 className="mt-4 font-serif text-3xl">Captura de contenido local</h3>
                <p className="mt-3 leading-7 text-[#252a2d]">
                  La producción de video en locación se considera de forma
                  selectiva después de conocer el lugar, la meta y las necesidades
                  de captura. Fort Lauderdale es la base local de esa conversación.
                </p>
                <Link
                  href="/es/produccion-de-video-fort-lauderdale"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
                >
                  Explorar producción de video en Fort Lauderdale
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </article>
            </div>
          </section>

          <section className="mt-14" aria-labelledby="prueba-miami-heading">
            <p className="text-xs font-medium uppercase text-[#5a6066]">
              Trabajo verificado en Miami
            </p>
            <h2
              id="prueba-miami-heading"
              className="mt-4 max-w-3xl font-serif text-4xl leading-tight"
            >
              Proyectos publicados que respaldan la disponibilidad en Miami-Dade.
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-[#252a2d]">
              Estos son proyectos reales de Miami en el{" "}
              <Link
                href="/es/portafolio"
                className="underline underline-offset-4 hover:text-[#9f3c27]"
              >
                portafolio público
              </Link>{" "}
              de Esteban. Documentan el trabajo indicado, sin atribuir
              resultados ni servicios que no aparecen en los créditos.
            </p>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {miamiProof.map((project) => (
                <Link
                  key={project.href}
                  href={project.href}
                  className="group rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 hover:border-[#e85d3e]"
                >
                  <span className="flex items-center justify-between gap-3 font-serif text-3xl">
                    {project.title}
                    <ArrowRight
                      className="size-5 shrink-0 text-[#9f3c27] transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-3 block text-sm leading-6 text-[#252a2d]">
                    {project.detail}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section
            className="mt-14 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8"
            aria-labelledby="restaurantes-servicio-heading"
          >
            <p className="text-xs font-medium uppercase text-[#5a6066]">
              Proyectos de restaurantes en Miami
            </p>
            <h2
              id="restaurantes-servicio-heading"
              className="mt-4 max-w-3xl font-serif text-4xl leading-tight"
            >
              ¿Buscas edición de video para un restaurante, no cobertura por zona?
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-[#252a2d]">
              Esta página explica las zonas de servicio. Para detalles de una
              promoción de restaurante y la consulta correspondiente, visita
              la página de servicio en Miami.
            </p>
            <Link
              href="/es/edicion-de-video-promocional-para-restaurantes-miami"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27] hover:text-[#7f2f20]"
            >
              Ver edición de video promocional para restaurantes en Miami
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </section>

          <section
            className="mt-14 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8"
            aria-labelledby="consulta-ubicacion-heading"
          >
            <p className="text-xs font-medium uppercase text-[#5a6066]">
              Qué incluir en tu consulta por ubicación
            </p>
            <h2
              id="consulta-ubicacion-heading"
              className="mt-4 max-w-3xl font-serif text-4xl leading-tight"
            >
              Empieza con el lugar, el objetivo y el material disponible.
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-[#252a2d]">
              Para grabaciones en locación, comparte el condado, el objetivo del
              proyecto y qué se necesita filmar. Para edición de video, contenido
              con IA o planificación para redes, comparte los archivos de origen
              o referencias que ya tienes y dónde se publicará el video final.
              Esto permite evaluar si el trabajo puede desarrollarse de forma
              remota o requiere una visita técnica en South Florida.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium">
              <Link
                href="/es/contacto"
                className="inline-flex items-center gap-2 text-[#9f3c27] hover:text-[#7f2f20]"
              >
                Enviar detalles del proyecto
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/es/servicios"
                className="inline-flex items-center gap-2 text-[#9f3c27] hover:text-[#7f2f20]"
              >
                Comparar servicios
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </section>

          <section
            className="mt-14"
            aria-labelledby="preguntas-areas-heading"
          >
            <p className="text-xs font-medium uppercase text-[#5a6066]">
              Preguntas frecuentes
            </p>
            <h2
              id="preguntas-areas-heading"
              className="mt-4 max-w-3xl font-serif text-4xl leading-tight"
            >
              Preguntas comunes sobre áreas de servicio y producción audiovisual.
            </h2>
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              {serviceAreaFaqs.map((faq) => (
                <article
                  key={faq.question}
                  className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6"
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle
                      className="mt-1 size-5 shrink-0 text-[#9f3c27]"
                      aria-hidden="true"
                    />
                    <h3 className="font-serif text-2xl leading-tight">
                      {faq.question}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                    {faq.answer}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-14" aria-labelledby="proyectos-por-tipo-heading">
            <p className="text-xs font-medium uppercase text-[#5a6066]">
              Servicios según el proyecto
            </p>
            <h2
              id="proyectos-por-tipo-heading"
              className="mt-4 max-w-3xl font-serif text-4xl leading-tight"
            >
              Elige una guía según el lugar y el formato que necesitas.
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-[#252a2d]">
              Las páginas de servicio explican el encaje del proyecto antes de
              contactar. La disponibilidad de grabación en locación se confirma
              según el alcance y la ubicación.
            </p>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {projectTypeLinks.map((project) => (
                <Link
                  key={project.href}
                  href={project.href}
                  className="group rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 hover:border-[#e85d3e]"
                >
                  <span className="flex items-center justify-between gap-3 font-serif text-2xl leading-tight">
                    {project.title}
                    <ArrowRight
                      className="size-5 shrink-0 text-[#9f3c27] transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-3 block text-sm leading-6 text-[#252a2d]">
                    {project.detail}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* THE PAGE DIRECTORY IS NAVIGATION, NOT THE PAGE (2026-09-30).
              Measured on production at 390x844: /areas was 13,953px, and this
              directory alone was 5,013px of it for 256 words — a wall of link
              tiles sitting between the FAQ and the one action on the page.
              /services has folded this same component since the first
              reading-path pass; /areas never did, which is why measuring found
              it and reading did not.

              Collapsed is NOT removed: every link stays in the served HTML, so
              the internal linking a crawler follows is untouched. */}
          <KeepReading
            id="directorio-de-servicios"
            title="Todas las páginas por tipo de proyecto y zona"
            destinations="Páginas de video, foto y contenido con IA para cada ciudad del sur de Florida y cada tipo de proyecto."
          >
            <SpanishServiceLandingDirectory />
          </KeepReading>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              href="/es/contacto"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
            >
              Preguntar por mi ciudad
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/es/portafolio"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
            >
              Ver trabajos publicados
            </Link>
          </div>
        </Container>
      </section>
      <EventSeasonLinks locale="es" path="/es/areas" />
    </main>
  );
}
