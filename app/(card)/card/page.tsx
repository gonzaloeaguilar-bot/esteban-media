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
    primary: true,
    external: true,
    image: "/portfolio/bar-door-monkey.jpg",
    imageAlt: "Fotograma de un video de restaurante de Esteban Moreno Media",
    visual: "whatsapp",
  },
  {
    href: site.phone.href,
    label: `Llamar al ${site.phone.display}`,
    detail: "Habla directamente con Esteban",
    icon: Phone,
    cta: "nfc_card_call",
    primary: false,
    external: false,
    image: "/about/esteban-on-location.jpg",
    imageAlt: "Esteban Moreno grabando en locación",
    visual: "call",
  },
  {
    href: "/es/portafolio",
    label: "Ver trabajos",
    detail: "Mira videos y proyectos de Esteban",
    icon: Play,
    cta: "nfc_card_portfolio",
    primary: false,
    external: false,
    internal: true,
    image: "/portfolio/gains-from-geebs-shorts.jpg",
    imageAlt: "Ejemplo de trabajo de video de Esteban Moreno Media",
    visual: "work",
  },
  {
    href: site.googleBusinessProfile,
    label: "Abrir en Google Maps",
    detail: "Ver el perfil de Esteban Moreno Media",
    icon: MapPinned,
    cta: "nfc_card_maps",
    primary: false,
    external: true,
    image: "/portfolio/local-business-camera-work.jpg",
    imageAlt: "Esteban trabajando con una cámara en un negocio local",
    visual: "maps",
  },
  {
    href: site.googleBusinessProfile,
    label: "Dejar una reseña en Google",
    detail: "En Google Maps, toca Reseñas y después Escribir una reseña",
    icon: Star,
    cta: "nfc_card_google_review",
    primary: false,
    external: true,
    image: "/portfolio/healthy-smile.jpg",
    imageAlt: "Proyecto publicado de Esteban Moreno Media",
    visual: "review",
  },
  {
    href: "/card.vcf",
    label: "Guardar contacto",
    detail: "Agrega a Esteban Moreno Media a tu teléfono",
    icon: Download,
    cta: "nfc_card_save_contact",
    primary: false,
    external: false,
    download: true,
    image: "/about/esteban-on-set.jpg",
    imageAlt: "Esteban Moreno en una producción",
    visual: "contact",
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
          <div className="mt-3 grid gap-3">
            {actions.map(({ href, label, detail, icon: Icon, cta, primary, external, image, imageAlt, visual, ...action }) => {
              const className = `group flex min-h-[84px] items-center gap-4 rounded-2xl border px-4 py-4 transition-colors focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#9f3c27] ${
                primary
                  ? "border-[#c84a2c] bg-[#c84a2c] text-white hover:bg-[#a93e29]"
                  : "border-[#d6ccc0] bg-[#fffaf4] hover:border-[#9f3c27]"
              }`;
              const content = <>
                <span className={`relative size-[72px] shrink-0 overflow-hidden rounded-xl bg-[#292623] ${visual === "maps" ? "ring-2 ring-[#4285f4]" : visual === "review" ? "ring-2 ring-[#ea4335]" : visual === "whatsapp" ? "ring-2 ring-[#25d366]" : ""}`}>
                  {visual === "whatsapp" ? <video src="/about/esteban-on-set.mp4" muted loop autoPlay playsInline preload="metadata" aria-hidden="true" className="h-full w-full object-cover" /> : <Image src={image} alt={imageAlt} fill sizes="72px" className="object-cover" />}
                  <span className={`absolute inset-0 grid place-items-center bg-black/35 text-white ${visual === "maps" ? "bg-[#4285f4]/45" : visual === "review" ? "bg-[#ea4335]/45" : visual === "whatsapp" ? "bg-[#128c7e]/35" : ""}`}>
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-semibold leading-5">{label}</span>
                  <span className={`mt-1 block text-sm leading-5 ${primary ? "text-white/85" : "text-[#5a6066]"}`}>{detail}</span>
                </span>
                {external ? <ArrowUpRight className="size-5 shrink-0" aria-hidden="true" /> : null}
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
