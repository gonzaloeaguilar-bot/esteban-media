import Link from "next/link";
import { CalendarClock, Mail, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { VideoBriefBuilder } from "@/components/video-brief-builder";
import { whatsappHref } from "@/lib/packages";
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

// Static on purpose. Reading ?source= on the server through searchParams made
// this route render on demand, so for many user agents the canonical, hreflang
// and robots tags streamed into <body> (SEO/GEO audit 2026-10-10, fix 14). The
// allowlisted attribution value is now read in the browser by the brief
// builder; every other value still falls back to "brief-builder".
export default function SpanishContactPage() {

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
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="py-8 sm:py-14">
        <Container size="xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">Contacto</p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight sm:text-6xl">Cuéntale a Esteban sobre tu video.</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#3f4548]">Envía un mensaje breve: qué necesitas, para cuándo y si ya tienes material grabado.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a href={whatsappHref(site.phone.e164, "Hola Esteban, vi tu página y quiero hablar sobre un proyecto de video.")} target="_blank" rel="noopener noreferrer" data-cta="contact_whatsapp" data-section="contact" className="flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#c84a2c] px-5 text-sm font-medium text-white hover:bg-[#a93e29]"><MessageCircle className="size-5" aria-hidden="true" /> Escribir por WhatsApp</a>
            <a href={`mailto:${site.email}`} data-cta="contact_email_es" data-section="contact" className="flex min-h-14 items-center justify-center gap-3 rounded-full border border-[#b9aa9a] px-5 text-sm font-medium text-[#252a2d] hover:border-[#c84a2c]"><Mail className="size-5" aria-hidden="true" /> Enviar un email</a>
          </div>
          <div className="mt-4 flex flex-col items-start gap-1 text-sm text-[#5a6066]">
            <a href={site.booking} target="_blank" rel="noopener noreferrer" data-cta="contact_booking_es" data-section="contact" className="inline-flex min-h-11 items-center gap-2 font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f21]">
              <CalendarClock className="size-4" aria-hidden="true" /> Ver horarios disponibles
            </a>
            <p>Elige el horario que te funcione. Los detalles de Google Meet llegan después de reservar.</p>
          </div>
          <p className="mt-3 text-sm text-[#5a6066]">O llama al <a href={site.phone.href} className="inline-flex min-h-11 items-center underline underline-offset-4">{site.phone.display}</a>.</p>
          <section className="mt-6 max-w-2xl border-l-2 border-[#c84a2c] pl-4" aria-labelledby="local-project-heading">
            <h2 id="local-project-heading" className="font-serif text-xl">¿Necesitas grabación en South Florida?</h2>
            <p className="mt-2 text-sm leading-6 text-[#3f4548]">Esteban trabaja desde Fort Lauderdale y evalúa cada grabación en Broward y Miami-Dade según el proyecto. En tu mensaje de WhatsApp incluye la ciudad, la fecha deseada y qué necesitas grabar; primero confirmará si el alcance encaja y después enviará una cotización por escrito.</p>
            <Link href="/es/areas" data-cta="contact_service_areas" className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-[#9f3c27] underline underline-offset-4">Ver áreas de servicio y qué se debe confirmar</Link>
          </section>
          <details className="mt-8 border-t border-[#d6ccc0] pt-5">
            <summary className="flex min-h-11 cursor-pointer items-center font-medium text-[#9f3c27] underline underline-offset-4">¿Qué información conviene enviar?</summary>
            <div className="mt-5 max-w-2xl space-y-3 text-sm leading-6 text-[#3f4548]">
              <p>Indica el tipo de proyecto, la ciudad si necesitas grabación, la fecha deseada y dónde se publicará el video. Si ya tienes material, cuenta qué tienes.</p>
              <p>Esteban Moreno Media hace edición a distancia y considera cada grabación en el sur de Florida según el proyecto. No tiene un estudio abierto al público.</p>
            </div>
          </details>
          <details className="mt-5 border-t border-[#d6ccc0] pt-5">
            <summary className="flex min-h-11 cursor-pointer items-center font-medium text-[#9f3c27] underline underline-offset-4">Guías para preparar tu proyecto</summary>
            <div className="mt-5 max-w-2xl space-y-3 text-sm leading-6 text-[#3f4548]">
              <p>La <Link href="/es/guias/como-escribir-un-brief-util-de-video" className="underline">guía para escribir un brief</Link> te ayuda a explicar el público, la plataforma, la fecha y el formato de entrega. La <Link href="/es/guias/preparar-material-para-edicion-de-video" className="underline">guía para preparar el material</Link> sirve para reunir clips y archivos antes de empezar la edición.</p>
              <p>Si el trabajo será a distancia, consulta la <Link href="/es/guias/entrega-para-edicion-remota-de-video" className="underline">guía de entrega remota</Link> para organizar archivos y comentarios. También puedes visitar la <Link href="/es/calculadora" className="underline">calculadora de presupuesto</Link> y revisar las <Link href="/es/areas" className="underline">áreas de servicio</Link> antes de escribir.</p>
            </div>
          </details>
          <details className="mt-5 border-t border-[#d6ccc0] pt-5">
            <summary className="flex min-h-11 cursor-pointer items-center font-medium text-[#9f3c27] underline underline-offset-4">Preguntas frecuentes</summary>
            <div className="mt-5 max-w-3xl space-y-5">
              {faqs.map((item) => (
                <section key={item.question}>
                  <h2 className="font-serif text-xl">{item.question}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#3f4548]">{item.answer}</p>
                </section>
              ))}
            </div>
          </details>
          <details className="mt-5 border-t border-[#d6ccc0] pt-5">
            <summary className="flex min-h-11 cursor-pointer items-center font-medium text-[#9f3c27] underline underline-offset-4">Preparar un brief más detallado</summary>
            <div className="mt-5 max-w-2xl"><VideoBriefBuilder locale="es" source="brief-builder" querySources={[PEMBROKE_PINES_SOURCE]} /></div>
          </details>
        </Container>
      </section>
    </main>
  );
}
