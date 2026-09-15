import Link from "next/link";
import { ArrowRight, Film, Mail, Play, Upload } from "lucide-react";

import {
  getLiveYouTubePortfolioItems,
  PortfolioGrid,
  resolvePortfolioItemCopy,
} from "@/components/portfolio-grid";
import { Container } from "@/components/ui/container";
import { PORTFOLIO_ITEMS } from "@/lib/portfolio";
import { buildPortfolioCollectionSchema } from "@/lib/portfolio-schema";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";

const title = "Portafolio de edición de video en Miami y Fort Lauderdale";
const description =
  "Mira trabajos seleccionados de edición, promoción, contenido social, eventos, animación y narrativa para proyectos en Miami y Fort Lauderdale.";
const liveItems = getLiveYouTubePortfolioItems(PORTFOLIO_ITEMS);
const primaryPoster = liveItems.find((item) =>
  item.media.poster.startsWith("/portfolio/"),
)?.media.poster;

export const metadata = buildPageMetadata({
  title,
  description,
  path: "/es/portafolio",
  locale: "es",
  ...(primaryPoster
    ? {
        images: [
          {
            url: absoluteUrl(primaryPoster),
            width: 1280,
            height: 720,
            alt: "Trabajos seleccionados de Esteban Moreno Media",
          },
        ],
      }
    : {}),
});

const portfolioSchema = buildPortfolioCollectionSchema({
  path: "/es/portafolio",
  locale: "es-US",
  title,
  description,
  items: liveItems.map((item) => {
    const copy = resolvePortfolioItemCopy(item, "es");

    return {
      id: item.id,
      ...copy,
      url: item.media.url,
      poster: item.media.poster,
      videoId: item.media.videoId,
      uploadDate: item.media.uploadDate,
      duration: item.media.duration,
      location: item.location,
    };
  }),
});

export default function SpanishPortfolioPage() {
  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />

      <section className="overflow-hidden bg-[#101214] py-14 text-[#f6f1ea] sm:py-20">
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_.46fr] lg:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#f0b384]">
                Trabajos seleccionados
              </p>
              <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[0.96] sm:text-6xl lg:text-7xl">
                Proyectos reales, presentados en su formato original.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[#d8d0c7] sm:text-lg sm:leading-8">
                Una colección del portafolio aprobado de Esteban. Cada ficha
                muestra la descripción y los créditos disponibles; cuando el
                portafolio original no especificó un rol individual, se indica
                con claridad.
              </p>
            </div>
            <div className="border-l border-white/15 pl-6">
              <p className="font-serif text-5xl text-[#f0b384]">
                {liveItems.length.toString().padStart(2, "0")}
              </p>
              <p className="mt-2 max-w-xs text-sm leading-6 text-[#b9b2aa]">
                Proyectos publicados, agrupados por tipo de historia o producción.
              </p>
              <a
                href="#portfolio-collection"
                className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-white underline decoration-[#e85d3e] underline-offset-4"
              >
                Explorar la colección
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/*
        Banda del servicio principal — el argumento de edición remota.
        Todo el texto se limita a hechos CONFIRMADOS (nota de oferta 2026-07-25
        + el proyecto real de solo edición "Homeowners"). Sin precios, tiempos
        de entrega, número de revisiones, testimonios ni métricas — eso queda
        pendiente de la confirmación de Esteban.
        [PLACEHOLDER — Esteban to supply] un caso de estudio completo
        (brief -> entregable -> resultado medible -> testimonio citable) puede
        entrar debajo del bloque de prueba cuando confirme material real.
      */}
      <section
        className="border-b border-[#d6ccc0] bg-[#efe7db] py-14 sm:py-16"
        aria-labelledby="anchor-service-heading"
      >
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
                Servicio principal
              </p>
              <h2
                id="anchor-service-heading"
                className="mt-4 max-w-xl font-serif text-4xl leading-tight sm:text-5xl"
              >
                Edición remota, con el material que ya tienes.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#3f4548]">
                El servicio principal de Esteban es la posproducción. Tú envías
                el material que ya grabaste &mdash; clips de celular, la
                cobertura de un evento, tomas de producto o de una sesión &mdash;
                y él lo convierte en un video terminado, listo para publicar. El
                trabajo es remoto, así que no necesitas estar en el sur de
                Florida para trabajar juntos.
              </p>
              <Link
                href="/es/servicios#editing"
                className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#9f3c27] underline decoration-[#c84a2c]/40 underline-offset-4 transition hover:text-[#7f2f20]"
              >
                Ver cómo funciona la edición
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>

            <div>
              <ol className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    Icon: Upload,
                    step: "Paso 1",
                    title: "Envías el material",
                    detail:
                      "Comparte lo que ya tienes: clips en bruto, un evento, una sesión o una carpeta de archivos.",
                  },
                  {
                    Icon: Film,
                    step: "Paso 2",
                    title: "Esteban lo edita",
                    detail:
                      "Posproducción pensada según tu objetivo y dónde se va a publicar el video.",
                  },
                  {
                    Icon: Play,
                    step: "Paso 3",
                    title: "Recibes un corte listo para publicar",
                    detail:
                      "Un video terminado, editado para la plataforma y la historia que tienes en mente.",
                  },
                ].map(({ Icon, step, title: stepTitle, detail }) => (
                  <li
                    key={stepTitle}
                    className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5"
                  >
                    <span className="grid size-10 place-items-center rounded-lg bg-[#101214] text-[#e85d3e]">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <p className="mt-4 text-xs font-medium uppercase tracking-[0.12em] text-[#9f3c27]">
                      {step}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl leading-tight">
                      {stepTitle}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#3f4548]">
                      {detail}
                    </p>
                  </li>
                ))}
              </ol>

              <Link
                href="/es/portafolio/homeowners"
                className="group mt-4 block rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5 transition hover:border-[#e85d3e]"
              >
                <span className="text-xs font-medium uppercase tracking-[0.12em] text-[#5a6066]">
                  Prueba de solo edición
                </span>
                <span className="mt-2 flex items-center justify-between gap-3 font-serif text-2xl leading-tight">
                  Homeowners
                  <ArrowRight
                    className="size-5 shrink-0 text-[#9f3c27] transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
                <span className="mt-2 block text-sm leading-6 text-[#5a6066]">
                  Un video social que Esteban editó por completo a partir del
                  material entregado por la agencia 300 Bees &mdash; el servicio
                  principal en acción.
                </span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <Container size="xl">
          <PortfolioGrid items={PORTFOLIO_ITEMS} locale="es" />
        </Container>
      </section>

      <section className="border-t border-[#d6ccc0] bg-[#efe7db] py-12 sm:py-16">
        <Container size="xl">
          <div className="grid gap-6 rounded-2xl border border-[#d6ccc0] bg-[#fbf6ef] p-7 sm:grid-cols-[1fr_auto] sm:items-end sm:p-10">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
                Producción en locación
              </p>
              <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-tight">
                ¿Tu proyecto necesita una grabación en South Florida?
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-[#3f4548] sm:text-base sm:leading-7">
                Revisa las{" "}
                <Link
                  href="/es/areas"
                  className="underline underline-offset-4 hover:text-[#9f3c27]"
                >
                  áreas de servicio
                </Link>{" "}
                para Fort Lauderdale, Broward, Miami-Dade y Palm Beach antes de
                consultar por una producción en locación.
              </p>
            </div>
            <Link
              href="/es/areas"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#101214] px-6 text-sm font-medium text-[#252a2d] transition hover:bg-[#101214] hover:text-[#f6f1ea]"
            >
              Ver áreas de servicio
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-t border-[#d6ccc0] py-14 sm:py-18">
        <Container size="xl">
          <div className="grid gap-8 rounded-2xl bg-[#e7ded2] p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
                Tu proyecto
              </p>
              <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">
                ¿Tienes una historia, lanzamiento, propiedad o campaña por crear?
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-[#3f4548] sm:text-base sm:leading-7">
                Comparte la meta, la fecha, la ubicación y el material que ya
                existe. Esteban hará las preguntas necesarias para definir el
                alcance del trabajo.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/es/contacto"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#c84a2c] px-6 text-sm font-medium text-white transition hover:bg-[#a93e29]"
              >
                Consultar un proyecto
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#b9aa9a] px-6 text-sm font-medium text-[#252a2d] transition hover:border-[#e85d3e]"
              >
                <Mail className="size-4" aria-hidden="true" />
                {site.email}
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
