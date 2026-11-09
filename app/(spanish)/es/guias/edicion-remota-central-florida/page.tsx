import Link from "next/link";

import { Container } from "@/components/ui/container";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Edición Remota de Video con Material de Central Florida",
  description:
    "Cómo convertir material ya grabado en entrevistas, subtítulos y videos cortos listos para publicar, sin prometer grabación local.",
  path: "/es/guias/edicion-remota-central-florida",
  locale: "es",
});

const experiments = [
  {
    city: "Orlando",
    title: "Entrevistas ejecutivas ya grabadas",
    body: "Cuando la entrevista ya está grabada, el siguiente problema suele ser editorial: elegir las respuestas claras, limpiar el audio, crear subtítulos legibles y preparar una versión completa con cortes más cortos. Comparte los archivos originales, el público, los mensajes aprobados y la fecha. Esta página no promete grabación en Orlando; cualquier filmación se cotiza por separado solo si Esteban confirma el alcance.",
    source: "orlando-executive-footage",
  },
  {
    city: "Winter Park",
    title: "Apoyo de edición para estudios o agencias",
    body: "Un estudio o una agencia puede conservar la grabación y la dirección creativa mientras entrega una cola de edición que se volvió demasiado grande o urgente. Para cotizarla bien, comparte los entregables, la carpeta de material, archivos de marca, referencias y quién reúne los comentarios. Así la posproducción funciona con el material suministrado, sin depender de una promesa de disponibilidad local.",
    source: "winter-park-overflow-edit",
  },
  {
    city: "Lake Nona",
    title: "Material experto con permisos aprobados",
    body: "Los equipos que ya cuentan con entrevistas de expertos o profesionales pueden pedir una edición clara y versiones breves cuando ellos mismos ya resolvieron permisos y aprobaciones. Envía los archivos definitivos, los nombres y cargos permitidos, el proceso de revisión y las plataformas de destino. Es una edición de material del cliente; no implica credenciales médicas, legales ni institucionales.",
    source: "lake-nona-expert-footage",
  },
  {
    city: "Kissimmee",
    title: "Material de eventos en español e inglés",
    body: "Cuando un organizador ya tiene clips de celular o cámara, la edición puede convertirlos en un resumen, anuncio o secuencia para redes. Define primero qué idioma necesita cada audiencia, si los subtítulos serán en español, inglés o ambos, y cuál es el mensaje aprobado. Esteban trabaja primero en español y usa inglés intermedio para la comunicación del proyecto; el alcance se define con el material real.",
    source: "kissimmee-bilingual-event-edit",
  },
  {
    city: "Sanford",
    title: "Testimonios de negocios de servicio",
    body: "Un testimonio sirve cuando la persona entiende rápido quién habla, qué se hizo y qué puede hacer después. Envía los clips originales, la autorización para usar a la persona y el nombre del negocio, las afirmaciones que deben mantenerse exactas y el destino del video. Después se puede cotizar un testimonio largo, cortes verticales o ambos. La edición no promete un resultado comercial.",
    source: "sanford-testimonial-edit",
  },
] as const;

export default function EdicionRemotaCentralFloridaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": absoluteUrl("/es/guias/edicion-remota-central-florida#howto"),
    name: "Preparar material para edición remota de video",
    description: "Lista de material y aprobaciones para una edición de video a distancia.",
    inLanguage: "es",
    step: [
      { "@type": "HowToStep", name: "Reunir el material original y los archivos de marca" },
      { "@type": "HowToStep", name: "Definir audiencia, fecha, plataforma y aprobaciones" },
      { "@type": "HowToStep", name: "Solicitar un alcance de edición por escrito" },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20">
        <Container size="xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">Edición con material propio</p>
          <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-6xl">Convierte el material que ya tienes en video listo para publicar.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#3f4548]">Para equipos de Central Florida, la edición remota no necesita una grabación local: envía el material aprobado, el público, la fecha y los formatos que necesitas. Esteban define el alcance por escrito antes de empezar.</p>
          <Link href="/es/contacto?source=orlando-executive-footage" data-cta="central_florida_hub_brief_es" data-section="central_florida_hub" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]">Preparar un brief de edición</Link>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container size="xl">
          <div className="max-w-3xl">
            <h2 className="font-serif text-3xl sm:text-4xl">Qué enviar antes de pedir una edición</h2>
            <p className="mt-4 text-base leading-7 text-[#3f4548]">Usa archivos originales de celular o cámara cuando sea posible. Incluye el enlace a la carpeta, nombres y afirmaciones aprobadas, logos o referencias visuales, el idioma de los subtítulos y dónde se publicará el resultado. Indica quién reúne los comentarios para que la edición se pueda cotizar correctamente.</p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {experiments.map((experiment) => (
              <article key={experiment.source} className="rounded-2xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">{experiment.city}</p>
                <h2 className="mt-2 font-serif text-3xl">{experiment.title}</h2>
                <p className="mt-4 text-sm leading-7 text-[#3f4548]">{experiment.body}</p>
                <Link href={`/es/contacto?source=${experiment.source}`} data-cta={`central_florida_${experiment.source}_es`} data-section="central_florida_hub" className="mt-5 inline-flex min-h-11 items-center text-sm font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f21]">Compartir material y brief</Link>
              </article>
            ))}
          </div>

          <details className="mt-10 max-w-3xl border-t border-[#d6ccc0] pt-5">
            <summary className="cursor-pointer font-medium text-[#9f3c27] underline underline-offset-4">¿Necesitas que Esteban grabe en locación?</summary>
            <p className="mt-4 text-sm leading-7 text-[#3f4548]">Esta guía es para edición remota de material que tú suministras. Esteban trabaja desde Fort Lauderdale y evalúa grabaciones en Broward y Miami-Dade según el proyecto. Cualquier trabajo fuera de ese alcance requiere una confirmación de disponibilidad y una cotización por escrito antes de prometer una fecha.</p>
          </details>
        </Container>
      </section>
    </main>
  );
}
