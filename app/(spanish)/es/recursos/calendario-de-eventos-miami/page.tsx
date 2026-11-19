import Link from "next/link";
import { ArrowRight, Calendar, AlertCircle } from "lucide-react";

import { Container } from "@/components/ui/container";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl } from "@/lib/site";
import {
  MIAMI_EVENTS_CALENDAR,
  formatCalendarDateRange,
} from "@/lib/event-ai-pages-content";

export const metadata = buildPageMetadata({
  title: "Calendario de Eventos en Miami para Creadores y Marcas",
  description:
    "Calendario de fechas pendientes de confirmación para conferencias, ferias comerciales, boat shows y festivales en Miami y el sur de la Florida.",
  path: "/es/recursos/calendario-de-eventos-miami",
  locale: "es",
});

export default function CalendarioDeEventosMiamiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemPage",
    "@id": absoluteUrl("/es/recursos/calendario-de-eventos-miami#webpage"),
    url: absoluteUrl("/es/recursos/calendario-de-eventos-miami"),
    name: "Calendario de Eventos en Miami para Creadores y Marcas",
    description:
      "Lista de conferencias, expos y eventos destacados en Miami para planificar cobertura de video y entrevistas.",
    isPartOf: { "@id": absoluteUrl("/#website") },
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="py-12 sm:py-16">
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
                  Recursos
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">
                Calendario de Eventos Miami
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-wider text-[#5a6066]">
              Temporada de Eventos en el Sur de la Florida
            </p>
            <h1 className="mt-4 font-serif em-display">
              Calendario de Eventos en Miami para Creadores y Marcas.
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#252a2d]">
              Una guía de las principales conferencias, boat shows, exposiciones y festivales en Miami-Dade y Broward. Pensada para empresas, patrocinadores y expositores que planifican grabación en locación y entrevistas breves a asistentes antes del inicio de la temporada.
            </p>
          </div>

          <div className="mt-8 rounded-lg border border-[#e85d3e]/30 bg-[#fbf6ef] p-4 text-sm text-[#252a2d] flex items-start gap-3">
            <AlertCircle className="size-5 text-[#e85d3e] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <strong>Aviso importante de planificación:</strong> Las fechas listadas corresponden a la programación preliminar de la temporada 2026-2027. Es indispensable <em>confirmar fechas con el organizador</em> antes de comprometer viajes o contratos. Esteban Moreno Media ofrece servicios independientes de video y no cuenta con afiliación oficial ni patrocinio de estos eventos.
            </div>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MIAMI_EVENTS_CALENDAR.map((evt) => (
              <div
                key={evt.name.es}
                className="flex flex-col justify-between rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#9f3c27]">
                    <Calendar className="size-4" aria-hidden="true" />
                    <span>{formatCalendarDateRange(evt.start, evt.end, "es")}</span>
                  </div>
                  <h2 className="mt-3 font-serif text-2xl text-[#101214]">
                    {evt.name.es}
                  </h2>
                  <p className="mt-1 text-xs text-[#5a6066]">{evt.where.es}</p>
                  <p className="mt-3 inline-block rounded bg-[#eee5d8] px-2 py-1 text-xs font-medium text-[#5a6066]">
                    confirm dates with organizer
                  </p>
                  {evt.note && (
                    <p className="mt-3 text-xs leading-5 text-[#252a2d]">
                      {evt.note.es}
                    </p>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-[#ddd4c8]">
                  <Link
                    href={evt.href}
                    className="inline-flex items-center gap-1 text-sm font-medium text-[#9f3c27] hover:underline"
                  >
                    {evt.dedicatedPage ? "Detalles de cobertura del evento" : "Detalles del servicio de video"}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-8">
            <h3 className="font-serif text-2xl">¿Planeas filmar entrevistas o resúmenes en un evento de Miami?</h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#252a2d]">
              Conoce nuestro servicio de entrevistas itinerantes a asistentes y edición rápida de reels resumen para entrega el mismo día o al día siguiente.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/services/event-attendee-interview-videographer-miami"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
              >
                Entrevistas a Asistentes
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/es/videografo-para-eventos-corporativos-miami"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#101214] px-6 text-sm font-medium text-[#101214] hover:bg-[#101214] hover:text-[#f6f1ea]"
              >
                Video para Eventos Corporativos
              </Link>
              <Link
                href="/es/contacto"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#101214] px-6 text-sm font-medium text-[#101214] hover:bg-[#101214] hover:text-[#f6f1ea]"
              >
                Contactar a Esteban
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
