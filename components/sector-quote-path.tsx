import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";

type Sector = "restaurant" | "event" | "marine";
type Locale = "en" | "es";

type Copy = {
  eyebrow: string;
  heading: string;
  answer: string;
  includedHeading: string;
  included: readonly string[];
  priceHref: string;
  priceLabel: string;
  contactHref: string;
  contactLabel: string;
};

const copy: Record<Locale, Record<Sector, Copy>> = {
  en: {
    restaurant: {
      eyebrow: "A clear monthly scope",
      heading: "What should a waterfront restaurant video quote confirm?",
      answer:
        "A useful restaurant quote starts with the shoot day and the monthly content plan, not an assumed number of posts. Local Presence covers on-location production, while Growth covers the recurring editing and planning path. The written scope confirms the capture window, the spaces and menu moments to film, the formats requested, and the final files before production begins.",
      includedHeading: "Confirm before the shoot",
      included: [
        "Access, filming hours, and the restaurant areas available to record.",
        "The menu, drinks, service moments, and room atmosphere that matter most.",
        "Where each final version will be used and the editing schedule that follows.",
      ],
      priceHref: "/pricing/local-presence",
      priceLabel: "See on-location production options",
      contactHref: "/contact",
      contactLabel: "Request a restaurant video quote",
    },
    event: {
      eyebrow: "A clear event scope",
      heading: "What should a networking event video quote confirm?",
      answer:
        "An event recap works best when the capture window and the finished use are agreed before the date. A written quote can define the arrival and key moments, whether short interviews are appropriate, the audio and consent plan, and the versions needed for the next event or sponsor communication. It does not assume every event needs the same deliverables.",
      includedHeading: "Confirm before the event",
      included: [
        "The event schedule, access, and the people or moments that matter most.",
        "Whether interviews are requested and how participant permission will be handled.",
        "The delivery timing, formats, and the channels where the recap will appear.",
      ],
      priceHref: "/pricing/local-presence",
      priceLabel: "See on-location production options",
      contactHref: "/contact",
      contactLabel: "Request an event video quote",
    },
    marine: {
      eyebrow: "A clear marine scope",
      heading: "What should a yacht or marina video quote confirm?",
      answer:
        "Marine work can begin with a local shoot or with footage supplied for editing. The written scope confirms the vessel or facility, the marina contact and access window, safety and weather considerations, the footage available, and the final use of the video. A public case study is separate: it is published only with client-approved footage and project details.",
      includedHeading: "Confirm before production",
      included: [
        "The vessel or facility, access contact, location, and filming window.",
        "The available footage, the safety conditions, and any weather-dependent decision.",
        "The final formats and where the finished work will be used.",
      ],
      priceHref: "/pricing/local-presence",
      priceLabel: "See on-location production options",
      contactHref: "/contact",
      contactLabel: "Request a marine video quote",
    },
  },
  es: {
    restaurant: {
      eyebrow: "Alcance mensual claro",
      heading: "¿Qué debe confirmar una cotización de video para un restaurante frente al agua?",
      answer:
        "Una cotización útil empieza por el día de grabación y el plan mensual de contenido, no por asumir una cantidad de publicaciones. Presencia Local cubre la producción en locación y Crecimiento el camino de edición y planificación recurrente. El alcance por escrito confirma la ventana de grabación, los espacios y momentos del menú, los formatos solicitados y los archivos finales antes de empezar.",
      includedHeading: "Confirmar antes de grabar",
      included: [
        "Acceso, horario de grabación y áreas del restaurante disponibles.",
        "Menú, bebidas, servicio y ambiente que más importa mostrar.",
        "Uso de cada versión final y calendario de edición posterior.",
      ],
      priceHref: "/es/precios/presencia-local",
      priceLabel: "Ver opciones de producción en locación",
      contactHref: "/es/contacto",
      contactLabel: "Pedir cotización para restaurante",
    },
    event: {
      eyebrow: "Alcance de evento claro",
      heading: "¿Qué debe confirmar una cotización de video para un evento de networking?",
      answer:
        "Un resumen de evento funciona mejor cuando se acuerdan la ventana de captura y el uso final antes de la fecha. La cotización puede definir llegada y momentos clave, si conviene hacer entrevistas breves, el plan de audio y permisos, y las versiones para promover el próximo evento o comunicar a patrocinadores. No presupone que todos los eventos necesiten las mismas entregas.",
      includedHeading: "Confirmar antes del evento",
      included: [
        "Horario, acceso y personas o momentos prioritarios.",
        "Si habrá entrevistas y cómo se manejará el permiso de cada participante.",
        "Fecha de entrega, formatos y canales donde aparecerá el resumen.",
      ],
      priceHref: "/es/precios/presencia-local",
      priceLabel: "Ver opciones de producción en locación",
      contactHref: "/es/contacto",
      contactLabel: "Pedir cotización para evento",
    },
    marine: {
      eyebrow: "Alcance náutico claro",
      heading: "¿Qué debe confirmar una cotización de video para yate o marina?",
      answer:
        "El trabajo náutico puede comenzar con una grabación local o con material entregado para edición. El alcance por escrito confirma la embarcación o instalación, el contacto y acceso de marina, las condiciones de seguridad y clima, el material disponible y el uso final del video. Un caso público es distinto: solo se publica con metraje y detalles aprobados por el cliente.",
      includedHeading: "Confirmar antes de producir",
      included: [
        "Embarcación o instalación, contacto de acceso, locación y ventana de grabación.",
        "Material disponible, condiciones de seguridad y decisiones que dependen del clima.",
        "Formatos finales y dónde se utilizará el trabajo terminado.",
      ],
      priceHref: "/es/precios/presencia-local",
      priceLabel: "Ver opciones de producción en locación",
      contactHref: "/es/contacto",
      contactLabel: "Pedir cotización náutica",
    },
  },
};

export function SectorQuotePath({ sector, locale = "en" }: { sector: Sector; locale?: Locale }) {
  const c = copy[locale][sector];

  return (
    <section className="border-b border-[#ddd4c8] bg-[#fbf6ef] py-12 sm:py-16" data-section={`sector_quote_path_${sector}`}>
      <Container size="xl">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">{c.eyebrow}</p>
          <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">{c.heading}</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#252a2d]">{c.answer}</p>
          <h3 className="mt-8 font-serif text-2xl">{c.includedHeading}</h3>
          <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-sm leading-6 text-[#252a2d]">
            {c.included.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-sm font-medium">
            <Link href={c.priceHref} className="inline-flex items-center gap-2 text-[#9f3c27] underline decoration-[#9f3c27]/40 underline-offset-4 hover:decoration-[#9f3c27]">
              {c.priceLabel}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href={c.contactHref} data-cta={`${sector}_quote_contact`} className="inline-flex items-center gap-2 text-[#9f3c27] underline decoration-[#9f3c27]/40 underline-offset-4 hover:decoration-[#9f3c27]">
              {c.contactLabel}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
