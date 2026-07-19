import Link from "next/link";
import { ArrowRight, Laptop, MapPin } from "lucide-react";

import { Container } from "@/components/ui/container";
import { spanishAreas } from "@/lib/spanish-site";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Áreas de Servicio en Español",
  description:
    "Edición de video y contenido desde Fort Lauderdale para Broward y Miami-Dade, con Palm Beach County como área de expansión evaluada por proyecto.",
  path: "/es/areas",
  locale: "es",
});

const areaAnchors: Record<string, string> = {
  "Fort Lauderdale": "fort-lauderdale",
  "Broward County": "broward-county",
  "Miami-Dade": "miami-dade",
  "Palm Beach County": "palm-beach-county",
};

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

export default function SpanishAreasPage() {
  const areaJsonLd = {
    "@context": "https://schema.org",
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
          <p className="text-xs font-medium uppercase text-[#5a6066]">
            Áreas de servicio
          </p>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-none sm:text-6xl">
            Fort Lauderdale como base, tres condados como área de servicio.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
            Fort Lauderdale y Broward son la base local, con proyectos
            seleccionados disponibles en Miami-Dade. Palm Beach County sigue
            siendo un área de expansión considerada por proyecto. Esteban
            trabaja como negocio de área de servicio y no publica una dirección
            de estudio.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {spanishAreas.map((area) => (
              <article
                key={area.name}
                id={areaAnchors[area.name]}
                className="scroll-mt-24 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6"
              >
                <MapPin className="size-6 text-[#e85d3e]" aria-hidden="true" />
                <h2 className="mt-5 font-serif text-3xl">{area.name}</h2>
                <p className="mt-2 text-xs uppercase text-[#5a6066]">
                  {area.county}
                </p>
                <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                  {area.description}
                </p>
                {area.href !== "/es/areas" ? (
                  <Link
                    href={area.href}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27] hover:text-[#7f2f20]"
                  >
                    Ver cobertura en {area.name}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                ) : null}
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
                <Link
                  href="/es/servicios#edicion"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
                >
                  Explorar edición de video remota
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
                  href="/es/servicios#videografia"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
                >
                  Revisar servicios en locación
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
              Estos son proyectos reales de Miami en el portafolio público de
              Esteban. Documentan el trabajo indicado, sin atribuir resultados
              ni servicios que no aparecen en los créditos.
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

          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              href="/es/contacto"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#c84a2c] px-6 text-sm font-medium text-white hover:bg-[#a93e29]"
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
    </main>
  );
}
