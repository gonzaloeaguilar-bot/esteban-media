import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Download,
  MapPinned,
  MessageCircle,
  Phone,
  Play,
  Star,
} from "lucide-react";

import { whatsappHref } from "@/lib/packages";
import { site } from "@/lib/site";

import "./card.css";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta a Esteban Moreno Media para edición y producción de video.",
  alternates: { canonical: "/card" },
};

const whatsapp = whatsappHref(
  site.phone.e164,
  "Hola Esteban, escaneé tu tarjeta y quiero hablar sobre un proyecto.",
);

const actions = [
  {
    href: whatsapp,
    label: "Escribir por WhatsApp",
    detail: "Cuéntame qué necesitas grabar o editar",
    icon: MessageCircle,
    cta: "nfc_card_whatsapp",
    eyebrow: "Responde Esteban",
    visual: "whatsapp",
    video: "/about/esteban-on-set.mp4",
    image: "/about/esteban-on-set.jpg",
    imageAlt: "Esteban Moreno en una producción",
    primary: true,
    external: true,
  },
  {
    href: site.phone.href,
    label: `Llamar al ${site.phone.display}`,
    detail: "Habla directamente con Esteban",
    icon: Phone,
    cta: "nfc_card_call",
    eyebrow: "Llamada directa",
    visual: "call",
    image: "/about/esteban-on-location.jpg",
    imageAlt: "Esteban Moreno grabando en locación",
    primary: false,
    external: false,
  },
  {
    href: "/es/portafolio",
    label: "Ver trabajos",
    detail: "Mira videos y proyectos de Esteban",
    icon: Play,
    cta: "nfc_card_portfolio",
    eyebrow: "Portafolio",
    visual: "play",
    image: "/portfolio/gains-from-geebs-shorts.jpg",
    imageAlt: "Ejemplo de video corto producido por Esteban Moreno Media",
    primary: false,
    external: false,
    internal: true,
  },
  {
    href: site.googleBusinessProfile,
    label: "Abrir en Google Maps",
    detail: "Ver el perfil de Esteban Moreno Media",
    icon: MapPinned,
    cta: "nfc_card_maps",
    eyebrow: "Google Maps",
    visual: "maps",
    image: "/portfolio/local-business-camera-work.jpg",
    imageAlt: "Esteban trabajando con una cámara en un negocio local",
    primary: false,
    external: true,
  },
  {
    href: site.googleBusinessProfile,
    label: "Dejar una reseña en Google",
    detail: "En Google Maps, toca Reseñas y después Escribir una reseña",
    icon: Star,
    cta: "nfc_card_google_review",
    eyebrow: "Reseñas",
    visual: "review",
    image: "/portfolio/healthy-smile.jpg",
    imageAlt: "Proyecto publicado de Esteban Moreno Media",
    primary: false,
    external: true,
  },
  {
    href: "/card.vcf",
    label: "Guardar contacto",
    detail: "Agrega a Esteban Moreno Media a tu teléfono",
    icon: Download,
    cta: "nfc_card_save_contact",
    eyebrow: "Contacto",
    visual: "save",
    image: "/portfolio/bar-door-monkey.jpg",
    imageAlt: "Fotograma de un video de restaurante de Esteban Moreno Media",
    primary: false,
    external: false,
    download: true,
  },
] as const;

export default function NfcContactCardPage() {
  return (
    <main className="min-h-dvh bg-[#f6f1ea] px-4 py-5 text-[#101214] sm:px-6 sm:py-10">
      <div className="mx-auto max-w-xl">
        <header className="border-b border-[#d6ccc0] pb-6 sm:pb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9f3c27]">Esteban Moreno Media</p>
          <h1 className="mt-3 max-w-md font-serif text-4xl leading-[0.98] tracking-[-0.035em] sm:text-6xl">
            Video que hace que tu negocio se vea claro.
          </h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-[#3f4548]">
            Edición, contenido y producción de video para negocios y creadores. Atención en español.
          </p>
        </header>

        <section className="pt-5" aria-label="Formas de contactar a Esteban">
          <p className="text-sm font-medium text-[#5a6066]">Elige lo que necesitas</p>
          <div className="em-route-list mt-3">
            {actions.map(({ href, label, detail, icon: Icon, cta, primary, external, eyebrow, visual, image, imageAlt, ...action }) => {
              const className = `em-route-card${primary ? " em-route-card--primary" : ""}`;
              const badge =
                visual === "whatsapp" ? <span className="em-route-card__badge em-route-card__badge--whatsapp" aria-hidden="true"><Icon /><span className="em-route-card__dots"><i /><i /><i /></span></span>
                : visual === "call" ? <span className="em-route-card__badge em-route-card__badge--call" aria-hidden="true"><Icon />Disponible</span>
                : visual === "play" ? <span className="em-route-card__badge em-route-card__badge--play" aria-hidden="true"><Icon />Ver reel</span>
                : visual === "maps" ? <span className="em-route-card__badge em-route-card__badge--maps" aria-hidden="true"><Icon />Fort Lauderdale</span>
                : visual === "review" ? <span className="em-route-card__badge em-route-card__badge--review" aria-hidden="true"><span className="em-route-card__stars"><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /></span></span>
                : <span className="em-route-card__badge em-route-card__badge--save" aria-hidden="true"><Icon />.vcf</span>;
              const content = <>
                <span className={`em-route-card__visual em-route-card__visual--${visual}`} aria-hidden="true">
                  {"video" in action
                    ? <video src={action.video} poster={image} autoPlay loop muted playsInline preload="metadata" />
                    : <Image src={image} alt={imageAlt} fill sizes="(max-width: 767px) 100vw, 50vw" />}
                </span>
                {badge}
                <span className="em-route-card__copy">
                  <span className="em-route-card__eyebrow">{eyebrow}</span>
                  <strong>{label}</strong>
                  <span>{detail}</span>
                </span>
                <span className="em-route-card__go" aria-hidden="true">{external ? <ArrowUpRight /> : <Icon />}</span>
              </>;

              if ("internal" in action) {
                return <Link key={cta} href={href} data-cta={cta} data-section="nfc-card" className={className}>{content}</Link>;
              }

              return (
                <a
                  key={cta}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  {...("download" in action ? { download: true } : {})}
                  data-cta={cta}
                  data-section="nfc-card"
                  className={className}
                >
                  {content}
                </a>
              );
            })}
          </div>
        </section>

        <footer className="py-6 text-sm leading-6 text-[#5a6066]">
          <p>Fort Lauderdale, Florida. Edición remota y proyectos de grabación según alcance.</p>
          <p className="mt-1">{site.phone.display} · {site.email}</p>
        </footer>
      </div>
    </main>
  );
}
