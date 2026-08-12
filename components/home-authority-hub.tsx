import Link from "next/link";
import { ArrowRight, BookOpenText, MapPin, Video } from "lucide-react";

import { Container } from "@/components/ui/container";

type Locale = "en" | "es";

const copy = {
  en: {
    eyebrow: "Video editor and content partner in South Florida",
    title: "One clear path from business goal to finished video.",
    intro: "Esteban Moreno Media is based in Fort Lauderdale and serves Broward, selected Miami-Dade projects, and Palm Beach County by project. Work can begin with footage you already have or with a scoped production plan when new capture is needed.",
    proofTitle: "Match the service to published project proof",
    guideTitle: "Plan the scope before requesting a quote",
    proofLabel: "View credited project",
    guideLabel: "Open pricing guide",
    contactLabel: "Send a project brief",
    proofs: [
      { title: "Remote video editing", description: "Homeowners was edited by Esteban from footage supplied by the agency 300 Bees.", href: "/portfolio/homeowners" },
      { title: "On-location business video", description: "Healthy Smile credits Esteban with on-location video, sound, editing, and delivery for a Miami dental clinic.", href: "/portfolio/healthy-smile" },
      { title: "Social promotional video", description: "Bar Door Monkey credits on-location videography and editing for a Miami restaurant social spot.", href: "/portfolio/bar-door-monkey" },
    ],
    guideHref: "/guides/corporate-video-production-cost-miami",
    contactHref: "/contact",
  },
  es: {
    eyebrow: "Editor de video y aliado de contenido en South Florida",
    title: "Una ruta clara desde la meta de negocio hasta el video final.",
    intro: "Esteban Moreno Media está en Fort Lauderdale y atiende Broward, proyectos seleccionados en Miami-Dade y Palm Beach County según el proyecto. El trabajo puede comenzar con material existente o con un alcance de producción para grabar contenido nuevo.",
    proofTitle: "Conecta el servicio con prueba publicada",
    guideTitle: "Define el alcance antes de pedir cotización",
    proofLabel: "Ver proyecto acreditado",
    guideLabel: "Abrir guía de precios",
    contactLabel: "Enviar brief del proyecto",
    proofs: [
      { title: "Edición remota de video", description: "Homeowners fue editado por Esteban con material entregado por la agencia 300 Bees.", href: "/es/portafolio/homeowners" },
      { title: "Video de negocio en locación", description: "Healthy Smile acredita a Esteban por video, sonido, edición y entrega para un consultorio dental de Miami.", href: "/es/portafolio/healthy-smile" },
      { title: "Video promocional para redes", description: "Bar Door Monkey acredita videografía y edición en locación para un spot social de un restaurante de Miami.", href: "/es/portafolio/bar-door-monkey" },
    ],
    guideHref: "/es/guias/cuanto-cuesta-la-produccion-de-video-corporativo-miami",
    contactHref: "/es/contacto",
  },
} as const;

export function HomeAuthorityHub({ locale = "en" }: { locale?: Locale }) {
  const content = copy[locale];

  return (
    <section className="border-b border-[#ddd4c8] bg-[#101214] py-14 text-[#f6f1ea] sm:py-20" aria-labelledby={`authority-hub-${locale}`}>
      <Container size="xl">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
          <div>
            <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-[#ffb49e]"><MapPin className="size-4" aria-hidden="true" />{content.eyebrow}</p>
            <h2 id={`authority-hub-${locale}`} className="mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">{content.title}</h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[#d8d0c7]">{content.intro}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={content.guideHref} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#f6f1ea] px-6 text-sm font-medium text-[#101214] hover:bg-white"><BookOpenText className="size-4" aria-hidden="true" />{content.guideLabel}</Link>
              <Link href={content.contactHref} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/40 px-6 text-sm font-medium hover:bg-white/10">{content.contactLabel}<ArrowRight className="size-4" aria-hidden="true" /></Link>
            </div>
          </div>
          <div>
            <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-[#ffb49e]"><Video className="size-4" aria-hidden="true" />{content.proofTitle}</p>
            <div className="mt-4 grid gap-3">
              {content.proofs.map((proof) => (
                <Link key={proof.href} href={proof.href} className="group rounded-xl border border-white/15 bg-white/[0.05] p-5 hover:border-[#ffb49e] hover:bg-white/[0.08]">
                  <h3 className="font-serif text-2xl">{proof.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#d8d0c7]">{proof.description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#ffb49e]">{content.proofLabel}<ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" /></span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
