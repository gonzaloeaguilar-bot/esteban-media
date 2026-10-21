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
  secondaryHref?: string;
  secondaryLabel?: string;
  contactHref: string;
  contactLabel: string;
};

const copy: Record<Locale, Record<Sector, Copy>> = {
  en: {
    restaurant: {
      eyebrow: "Monthly restaurant content",
      heading: "What is included in a waterfront restaurant monthly content service?",
      answer:
        "This service joins Local Presence for the on-location content day with Growth for the recurring planning, editing, and calendar. It is quoted around the restaurant’s actual month rather than an invented fixed number of posts. The written scope confirms the capture window, the spaces and menu moments to film, the editing calendar, the requested formats, and the final files before production begins.",
      includedHeading: "Monthly scope to confirm",
      included: [
        "Access, filming hours, and the restaurant areas available to record.",
        "The menu, drinks, service moments, and room atmosphere that matter most.",
        "Planning, editing, and a calendar for the approved content cycle.",
      ],
      priceHref: "/pricing/local-presence",
      priceLabel: "See Local Presence",
      secondaryHref: "/pricing/growth",
      secondaryLabel: "See Growth planning and editing",
      contactHref: "/contact",
      contactLabel: "Request a restaurant video quote",
    },
    event: {
      eyebrow: "Event recap service",
      heading: "What can a networking event recap service include?",
      answer:
        "A networking event quote can combine a recap, short interviews, sponsor cuts, and a promotional version for the next event. The event itself sets the hours, deliverables, and permissions: nothing is assumed from a generic package. Before the date, the written scope defines the capture window, key moments, interview plan, audio, participant consent, delivery timing, and where each version will appear.",
      includedHeading: "Confirm before the event",
      included: [
        "The event schedule, access, filming hours, and moments that matter most.",
        "The recap, interviews, sponsor cuts, and next-event promotion that are appropriate.",
        "Participant permission, delivery timing, formats, and publication channels.",
      ],
      priceHref: "/pricing/local-presence",
      priceLabel: "See on-location production options",
      contactHref: "/contact",
      contactLabel: "Request an event video quote",
    },
    marine: {
      eyebrow: "Bilingual reusable marine content",
      heading: "What should a yacht or marina content quote confirm?",
      answer:
        "Marine work can begin with a local shoot or with footage supplied for editing. The scope can include reusable Spanish and English versions when the approved source material, captions, and final channels are confirmed. It does not sell drone, photography, 360 tours, or any other capture method as included before the vessel, marina access, safety, weather, and final use are agreed. A public case study is separate and is published only with client-approved footage and project details.",
      includedHeading: "Confirm before production",
      included: [
        "The vessel or facility, access contact, location, and filming window.",
        "Available footage, safety conditions, and any weather-dependent decision.",
        "Approved Spanish and English versions, captions, final formats, and publication channels.",
      ],
      priceHref: "/pricing/local-presence",
      priceLabel: "See on-location production options",
      secondaryHref: "/services/bilingual-video-subtitling-service",
      secondaryLabel: "See bilingual captioning",
      contactHref: "/contact",
      contactLabel: "Request a marine video quote",
    },
  },
  es: {
    restaurant: {
      eyebrow: "Contenido mensual para restaurante",
      heading: "¿Qué incluye un servicio mensual de contenido para restaurante frente al agua?",
      answer:
        "Este servicio une Presencia Local para el día de contenido en locación con Crecimiento para planificación, edición y calendario recurrentes. Se cotiza según el mes real del restaurante, no con una cantidad inventada de publicaciones. El alcance por escrito confirma la ventana de grabación, espacios y momentos del menú, calendario de edición, formatos solicitados y archivos finales antes de empezar.",
      includedHeading: "Alcance mensual por confirmar",
      included: [
        "Acceso, horario de grabación y áreas del restaurante disponibles.",
        "Menú, bebidas, servicio y ambiente que más importa mostrar.",
        "Planificación, edición y calendario del ciclo de contenido aprobado.",
      ],
      priceHref: "/es/precios/presencia-local",
      priceLabel: "Ver Presencia Local",
      secondaryHref: "/es/precios/crecimiento",
      secondaryLabel: "Ver planificación y edición Crecimiento",
      contactHref: "/es/contacto",
      contactLabel: "Pedir cotización para restaurante",
    },
    event: {
      eyebrow: "Servicio de recap de evento",
      heading: "¿Qué puede incluir un servicio de recap para un evento de networking?",
      answer:
        "La cotización de networking puede combinar recap, entrevistas breves, cortes para patrocinadores y una versión para promover el próximo evento. El evento define horas, entregables y permisos: no se presume un paquete genérico. Antes de la fecha, el alcance escrito deja claros ventana de captura, momentos clave, entrevistas, audio, consentimiento, entrega y dónde aparecerá cada versión.",
      includedHeading: "Confirmar antes del evento",
      included: [
        "Horario, acceso, horas de grabación y momentos prioritarios.",
        "Recap, entrevistas, cortes para patrocinadores y promoción del próximo evento.",
        "Permiso de participantes, entrega, formatos y canales de publicación.",
      ],
      priceHref: "/es/precios/presencia-local",
      priceLabel: "Ver opciones de producción en locación",
      contactHref: "/es/contacto",
      contactLabel: "Pedir cotización para evento",
    },
    marine: {
      eyebrow: "Contenido náutico bilingüe y reutilizable",
      heading: "¿Qué debe confirmar una cotización de contenido para yate o marina?",
      answer:
        "El trabajo náutico puede comenzar con grabación local o material entregado para edición. El alcance puede incluir versiones reutilizables en español e inglés cuando se confirman material, subtítulos y canales. No vende drone, fotografía, tour 360 ni otra captura como incluida antes de acordar embarcación, acceso de marina, seguridad, clima y uso final. Un caso público solo se publica con metraje y detalles aprobados por cliente.",
      includedHeading: "Confirmar antes de producir",
      included: [
        "Embarcación o instalación, contacto de acceso, locación y ventana de grabación.",
        "Material disponible, seguridad y decisiones que dependen del clima.",
        "Versiones aprobadas en español e inglés, subtítulos, formatos y canales de publicación.",
      ],
      priceHref: "/es/precios/presencia-local",
      priceLabel: "Ver opciones de producción en locación",
      secondaryHref: "/es/servicio-de-subtitulado-bilingue-de-video",
      secondaryLabel: "Ver subtitulado bilingüe",
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
            {c.secondaryHref && c.secondaryLabel ? (
              <Link href={c.secondaryHref} className="inline-flex items-center gap-2 text-[#9f3c27] underline decoration-[#9f3c27]/40 underline-offset-4 hover:decoration-[#9f3c27]">
                {c.secondaryLabel}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            ) : null}
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
