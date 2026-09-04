import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  HelpCircle,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Send,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { VideoBriefBuilder } from "@/components/video-brief-builder";
import { spanishServices, spanishSite } from "@/lib/spanish-site";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";

const PEMBROKE_PINES_SOURCE = "pembroke-pines-small-business-video" as const;

const contactDescriptionEs =
  "Contacta a Esteban Moreno Media en español para edición de video, contenido con IA y producción en South Florida. Envía tu brief o detalles del proyecto.";

export const metadata = buildPageMetadata({
  title: "Contacto en Español | Esteban Moreno Media Fort Lauderdale",
  description: contactDescriptionEs,
  path: "/es/contacto",
  locale: "es",
});

const faqs = [
  {
    question: "¿Qué información conviene incluir al enviar el brief inicial?",
    answer:
      "Indica qué necesitas publicar, la fecha estimada de entrega, las plataformas de destino (como Instagram Reels, TikTok, YouTube o sitio web) y si aportarás material propio grabado o requieres evaluar una jornada de rodaje en South Florida.",
  },
  {
    question:
      "¿Cómo funciona el flujo de edición remota con material suministrado por el cliente?",
    answer:
      "Transfieres tus archivos de video crudo y elementos de marca a una carpeta compartida en la nube (Google Drive, Dropbox, MASV o Frame.io). Esteban organiza el material, realiza el corte, corrección de color, balance de audio y subtítulos, y entrega una versión de revisión para comentarios.",
  },
  {
    question:
      "¿En qué idioma se coordinan las consultas y revisiones del proyecto?",
    answer:
      "La atención y comunicación del proyecto es principalmente en español, con nivel intermedio de inglés disponible para la definición de alcance y rondas de comentarios.",
  },
  {
    question:
      "¿Se ofrece grabación en locación dentro de Miami-Dade, Broward y Palm Beach?",
    answer:
      "La captura en locación en Miami-Dade, Broward o Palm Beach County se evalúa de manera selectiva según la naturaleza del proyecto, las necesidades de rodaje y el cronograma de trabajo.",
  },
  {
    question:
      "¿Cómo se calculan las cotizaciones y presupuestos de cada proyecto?",
    answer:
      "Cada proyecto recibe una cotización detallada según el volumen de material, los formatos requeridos, el ritmo de entrega y la complejidad técnica. También puedes estimar rangos iniciales en nuestra calculadora de presupuesto.",
  },
] as const;

export default async function SpanishContactPage({
  searchParams,
}: {
  searchParams: Promise<{ source?: string }>;
}) {
  const { source } = await searchParams;
  const leadSource =
    source === PEMBROKE_PINES_SOURCE ? PEMBROKE_PINES_SOURCE : "brief-builder";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": absoluteUrl("/es/contacto#webpage"),
        url: absoluteUrl("/es/contacto"),
        name: "Contacto en Español | Esteban Moreno Media",
        description: contactDescriptionEs,
        isPartOf: { "@id": absoluteUrl("/#website") },
        inLanguage: "es-US",
      },
      {
        "@type": "FAQPage",
        "@id": absoluteUrl("/es/contacto#faq"),
        inLanguage: "es-US",
        isPartOf: { "@id": absoluteUrl("/#website") },
        mainEntity: faqs.map((faq) => ({
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
              <li aria-current="page" className="text-[#252a2d]">
                Contacto
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.9fr]">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Consulta directa
              </p>
              <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-none sm:text-6xl">
                Manda el brief en español.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                {spanishSite.contactLead}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-[#5a6066]">
                <Link
                  href="/es"
                  className="underline underline-offset-4 hover:text-[#9f3c27]"
                >
                  Esteban Moreno Media
                </Link>{" "}
                es un negocio de área de servicio en Fort Lauderdale con
                atención remota. No hay un estudio abierto al público. Las
                consultas pueden comenzar por email, teléfono o Instagram, y la
                disponibilidad local se considera para cada proyecto.
              </p>

              <div className="mt-8 grid gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="flex min-h-16 items-center gap-4 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-4 hover:border-[#e85d3e]"
                >
                  <Mail className="size-5 text-[#e85d3e]" aria-hidden="true" />
                  <span>
                    <span className="block text-xs uppercase text-[#5a6066]">
                      Email
                    </span>
                    <span>{site.email}</span>
                  </span>
                </a>
                <a
                  href={site.phone.href}
                  className="flex min-h-16 items-center gap-4 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-4 hover:border-[#e85d3e]"
                >
                  <Phone className="size-5 text-[#e85d3e]" aria-hidden="true" />
                  <span>
                    <span className="block text-xs uppercase text-[#5a6066]">
                      Teléfono
                    </span>
                    <span>{site.phone.display}</span>
                  </span>
                </a>
                <a
                  href={site.instagram}
                  className="flex min-h-16 items-center gap-4 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-4 hover:border-[#e85d3e]"
                >
                  <Send
                    className="size-5 text-[#e85d3e]"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block text-xs uppercase text-[#5a6066]">
                      Instagram
                    </span>
                    <span>@steeban1</span>
                  </span>
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <VideoBriefBuilder locale="es" source={leadSource} />

              <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
                <MessageSquareText
                  className="size-6 text-[#e85d3e]"
                  aria-hidden="true"
                />
                <h2 className="mt-5 font-serif text-3xl">Qué incluir</h2>
                <ul className="mt-6 space-y-4 text-sm leading-6 text-[#252a2d]">
                  <li>
                    <strong className="text-[#101214]">Tipo de proyecto:</strong>{" "}
                    {spanishServices.map((service) => service.shortName).join(", ")}.
                  </li>
                  <li>
                    <strong className="text-[#101214]">Ciudad:</strong> Miami,
                    Fort Lauderdale, Palm Beach County, venue, propiedad o
                    dirección si ya existe. Para trabajo en locación, comparte
                    cualquier detalle de acceso que pueda afectar el alcance.
                  </li>
                  <li>
                    <strong className="text-[#101214]">Fecha:</strong> día de
                    rodaje o entrega de edición.
                  </li>
                  <li>
                    <strong className="text-[#101214]">Resultado:</strong> dónde
                    se publica el material y qué resultado comercial buscas.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-[#ddd4c8] py-12 sm:py-16">
        <Container size="xl">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-medium uppercase text-[#5a6066]">
              Guía de preparación del proyecto
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              Prepara los detalles de tu proyecto antes de enviar.
            </h2>
            <div className="mt-8 space-y-6 text-base leading-8 text-[#252a2d]">
              <p>
                Organizar el contexto de tu video antes de comenzar la edición
                ahorra tiempo y evita dudas. Ya sea que necesites reels
                verticales para redes sociales o cortes horizontales para tu
                sitio web, contar con archivos claros y objetivos definidos
                asegura un inicio ágil.
              </p>
              <p>
                Revisa nuestras guías prácticas para optimizar tu entrega:
                aprende{" "}
                <Link
                  href="/es/guias/como-escribir-un-brief-util-de-video"
                  className="underline underline-offset-4 hover:text-[#9f3c27]"
                >
                  cómo escribir un brief útil de video
                </Link>
                , consulta{" "}
                <Link
                  href="/es/guias/preparar-material-para-edicion-de-video"
                  className="underline underline-offset-4 hover:text-[#9f3c27]"
                >
                  cómo preparar material para edición
                </Link>
                , y sigue nuestras recomendaciones para una{" "}
                <Link
                  href="/es/guias/entrega-para-edicion-remota-de-video"
                  className="underline underline-offset-4 hover:text-[#9f3c27]"
                >
                  entrega para edición remota de video
                </Link>
                .
              </p>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <Link
                href="/es/calculadora"
                className="group rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 transition hover:border-[#e85d3e]"
              >
                <Calculator
                  className="size-6 text-[#e85d3e]"
                  aria-hidden="true"
                />
                <h3 className="mt-4 font-serif text-2xl">
                  Calculadora de presupuesto
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#5a6066]">
                  Estima rangos de costos y variables de alcance en línea antes
                  de enviar tu consulta.
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-[#9f3c27] group-hover:underline">
                  Calcular presupuesto
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </span>
              </Link>

              <Link
                href="/es/areas"
                className="group rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 transition hover:border-[#e85d3e]"
              >
                <MapPin
                  className="size-6 text-[#e85d3e]"
                  aria-hidden="true"
                />
                <h3 className="mt-4 font-serif text-2xl">
                  Áreas de servicio y cobertura
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#5a6066]">
                  Consulta opciones de postproducción remota y cobertura selectiva
                  para rodajes en el sur de la Florida.
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-[#9f3c27] group-hover:underline">
                  Ver áreas de servicio
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-[#ddd4c8] bg-[#fbf6ef] py-12 sm:py-16">
        <Container size="xl">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1fr]">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Preguntas frecuentes
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight">
                Preguntas comunes antes de iniciar un proyecto.
              </h2>
              <p className="mt-4 text-sm leading-6 text-[#5a6066]">
                Respuestas sobre entrega de archivos, atención en español y
                alcance de servicio.
              </p>
            </div>
            <div className="grid gap-4">
              {faqs.map((faq) => (
                <article
                  key={faq.question}
                  className="rounded-lg border border-[#ddd4c8] bg-[#f6f1ea] p-6"
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
          </div>
        </Container>
      </section>
    </main>
  );
}
