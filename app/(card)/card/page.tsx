import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Download,
  Heart,
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
    primary: false,
    external: false,
    download: true,
  },
] as const;

export default function NfcContactCardPage() {
  return (
    <main className="em-nfc min-h-dvh bg-[#f6f1ea] px-4 py-5 text-[#101214] sm:px-6 sm:py-10">
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
            {actions.map(({ href, label, detail, icon: Icon, cta, primary, external, eyebrow, visual, ...action }) => {
              const className = `em-route-card em-route-card--scene em-route-card--${visual}${primary ? " em-route-card--primary" : ""}`;
              const stars = <span className="em-stars"><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /></span>;
              const scene =
                visual === "whatsapp" ? (
                  <span className="em-scene em-scene--wa">
                    <span className="em-wa__head"><i>EM</i><span><span className="em-scene__t">Esteban Moreno Media</span><span className="em-scene__s">en línea</span></span></span>
                    <span className="em-wa__body">
                      <span className="em-wa__msg em-wa__msg--in em-wa__msg--1">Hola Esteban, escaneé tu tarjeta<small>9:41</small></span>
                      <span className="em-wa__msg em-wa__msg--in em-wa__msg--2">Quiero un video para mi negocio<small>9:41</small></span>
                      <span className="em-wa__typing"><i /><i /><i /></span>
                      <span className="em-wa__msg em-wa__msg--out em-wa__msg--3">Claro, cuéntame qué necesitas grabar<small>9:42 ✓✓</small></span>
                    </span>
                  </span>
                ) : visual === "call" ? (
                  <span className="em-scene em-scene--call">
                    <span className="em-call__rings"><i /><i /><i /></span>
                    <span className="em-call__avatar">EM</span>
                    <span className="em-call__name">Esteban Moreno Media</span>
                    <span className="em-call__state">Llamada entrante<b>.</b><b>.</b><b>.</b></span>
                    <span className="em-call__buttons"><span className="em-call__btn em-call__btn--no"><Phone /></span><span className="em-call__btn em-call__btn--yes"><Phone /></span></span>
                  </span>
                ) : visual === "play" ? (
                  <span className="em-scene em-scene--reel">
                    <span className="em-reel__strip">
                      <span className="em-reel__thumb"><Image src="/portfolio/juanchis-burguer.jpg" alt="" fill sizes="120px" /></span>
                      <span className="em-reel__thumb em-reel__thumb--live"><video src="/real-estate-reels/brickell-loop.mp4" poster="/real-estate-reels/brickell-loop-poster.jpg" autoPlay loop muted playsInline preload="metadata" /><span className="em-reel__live">REEL</span></span>
                      <span className="em-reel__thumb"><Image src="/portfolio/bar-door-monkey.jpg" alt="" fill sizes="120px" /></span>
                      <span className="em-reel__thumb"><Image src="/portfolio/exatlon.jpg" alt="" fill sizes="120px" /></span>
                      <span className="em-reel__thumb"><Image src="/portfolio/event-conference-filming.jpg" alt="" fill sizes="120px" /></span>
                    </span>
                    <span className="em-reel__rail"><span className="em-reel__like"><Heart fill="currentColor" /><small>1.2K</small></span><span><MessageCircle /><small>86</small></span></span>
                  </span>
                ) : visual === "maps" ? (
                  <span className="em-scene em-scene--maps">
                    <span className="em-maps__map"><i /><i /><i /><i /><u /></span>
                    <span className="em-maps__pin"><i /><u /></span>
                    <span className="em-maps__sheet">
                      <span className="em-maps__title">Esteban Moreno Media</span>
                      <span className="em-maps__meta"><span className="em-scene__t">5.0</span>{stars}<span className="em-scene__s">Fort Lauderdale, FL</span></span>
                      <span className="em-maps__actions"><span className="em-maps__btn em-maps__btn--go">Cómo llegar</span><span className="em-maps__btn">Llamar</span></span>
                    </span>
                  </span>
                ) : visual === "review" ? (
                  <span className="em-scene em-scene--review">
                    <span className="em-review__head"><i>G</i><span><span className="em-scene__t">Esteban Moreno Media</span><span className="em-scene__s">Reseñas de Google</span></span></span>
                    <span className="em-review__rate"><span className="em-scene__t">5.0</span>{stars}</span>
                    <span className="em-review__dist"><i /><i /><i /><i /><i /></span>
                    <span className="em-review__text">Excelente trabajo, el video quedó clarísimo</span>
                    <span className="em-review__btn">Escribir una reseña</span>
                  </span>
                ) : (
                  <span className="em-scene em-scene--save">
                    <span className="em-save__avatar">EM<b /></span>
                    <span className="em-save__name">Esteban Moreno Media</span>
                    <span className="em-save__row"><Phone />{site.phone.display}</span>
                    <span className="em-save__row"><Download />{site.email}</span>
                    <span className="em-save__btn">Agregar a contactos</span>
                  </span>
                );
              const content = <>
                <div className={`em-route-card__visual em-route-card__visual--${visual}`} aria-hidden="true">{scene}</div>
                <span className="em-route-card__copy">
                  <span className="em-route-card__eyebrow">{eyebrow}</span>
                  <strong>{label}</strong>
                  <span>{detail}</span>
                </span>
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
