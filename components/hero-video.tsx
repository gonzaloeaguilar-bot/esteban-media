import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Languages, Laptop, MapPin } from "lucide-react";

import { Container } from "@/components/ui/container";
import { trustSignals as trustSignalsEn } from "@/lib/site";

type HeroVideoProps = {
  locale?: "en" | "es";
};

const trustSignalsEs = [
  { label: "Ubicación", value: "Fort Lauderdale", icon: MapPin },
  { label: "Prueba", value: "Portafolio real", icon: BadgeCheck },
  { label: "Atención", value: "Español primero", icon: Languages },
  { label: "Flujo", value: "Remoto + local", icon: Laptop },
];

export function HeroVideo({ locale = "en" }: HeroVideoProps) {
  const isSpanish = locale === "es";
  const trustSignals = isSpanish ? trustSignalsEs : trustSignalsEn;

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-[#101214] text-[#f6f1ea]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_78%_28%,#cf6a2c_0%,#2d140d_48%,#080404_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(0,0,0,.2),rgba(0,0,0,.55))]"
      />

      <Container size="xl" className="relative py-12 sm:py-20 lg:py-24">
        <div className="grid items-center gap-7 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
          <div>
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs uppercase tracking-wide backdrop-blur">
              <MapPin className="size-3.5" aria-hidden="true" />
              {isSpanish
                ? "Fort Lauderdale · Broward · Miami-Dade · Área de expansión en Palm Beach"
                : "Fort Lauderdale · Broward · Miami-Dade · Palm Beach expansion area"}
            </div>

            <h1
              id="hero-heading"
              className="mt-5 max-w-[17ch] font-serif text-4xl leading-[1.04] sm:mt-6 sm:text-6xl lg:text-7xl"
            >
              {isSpanish
                ? "Esteban Moreno Media · Video, IA y redes."
                : "Esteban Moreno Media · Video editing, AI-assisted content, and social production."}
            </h1>

            <p className="mt-4 font-serif text-xl italic text-[#f0b384] sm:mt-5 sm:text-3xl">
              {isSpanish
                ? "Apoyo creativo claro, desde tu material hasta contenido listo para publicar."
                : "Clear creative support, from your footage to ready-to-publish content."}
            </p>

            <p className="mt-4 max-w-2xl text-base leading-7 text-[#e8e2d8] sm:text-lg sm:leading-8">
              {isSpanish ? (
                <>
                  Edición de video, contenido asistido por IA y planificación para redes. Si necesitas grabación local, revisa las{" "}
                  <Link
                    href="/es/areas"
                    className="underline decoration-[#ffb49e] underline-offset-4 hover:text-[#ffb49e]"
                  >
                    áreas de servicio
                  </Link>
                  . Consulta nuestras{" "}
                  <Link
                    href="/es/guias"
                    className="underline decoration-[#ffb49e] underline-offset-4 hover:text-[#ffb49e]"
                  >
                    guías prácticas de video
                  </Link>{" "}
                  para preparar el contenido.
                </>
              ) : (
                <>
                  Video editing, AI-assisted content, and social planning for businesses with footage or a new idea. For local filming, review the{" "}
                  <Link
                    href="/areas"
                    className="underline decoration-[#ffb49e] underline-offset-4 hover:text-[#ffb49e]"
                  >
                    service area
                  </Link>
                  . Browse our{" "}
                  <Link
                    href="/guides"
                    className="underline decoration-[#ffb49e] underline-offset-4 hover:text-[#ffb49e]"
                  >
                    practical video guides
                  </Link>{" "}
                  before production.
                </>
              )}
            </p>

            <div className="mt-5 flex flex-wrap gap-3" data-em-hero-actions>
              <Link
                href={isSpanish ? "/es/portafolio" : "/portfolio"}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#c84a2c] px-6 text-sm font-medium text-white transition hover:bg-[#a93e29] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {isSpanish ? "Ver portafolio" : "View portfolio"}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href={isSpanish ? "/es/contacto" : "/contact"}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 bg-white/5 px-6 text-sm font-medium text-white backdrop-blur transition hover:bg-white hover:text-[#101214] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {isSpanish ? "Consultar un proyecto" : "Start a project"}
              </Link>
            </div>
          </div>

          {/* Shown on the phone too. It was `hidden sm:block`, so the site's most
              visited entry had no photograph at all for three screens — on a
              videographer's home page — while `priority` still made the browser
              DOWNLOAD it: measured 55,878 bytes fetched and never displayed on a
              390px phone. Un-hiding costs nothing at the fold, because on mobile
              the figure stacks under the text: the hero CTA measures 583 either
              way, and the photograph arrives at 671, immediately after it. */}
          <figure className="mx-auto w-full max-w-[26rem] lg:mx-0 lg:justify-self-end">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 shadow-2xl shadow-black/40 sm:aspect-[4/5]">
              <Image
                src="/about/esteban-on-set.jpg"
                alt={
                  isSpanish
                    ? "Esteban Moreno grabando con una cámara Canon en un set de estudio iluminado en Fort Lauderdale"
                    : "Esteban Moreno filming with a Canon camera on a lit studio set in Fort Lauderdale"
                }
                fill
                priority
                sizes="(min-width: 1024px) 416px, (min-width: 640px) 400px, calc(100vw - 32px)"
                className="object-cover object-[58%_35%]"
              />
            </div>
          </figure>
        </div>

        <ul
          role="list"
          className="mt-12 hidden gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-4"
        >
          {trustSignals.map((signal) => {
            const Icon = signal.icon;
            return (
              <li
                key={signal.label}
                className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/5 p-3 backdrop-blur"
              >
                <Icon
                  className="size-5 text-[#f0b384]"
                  aria-hidden="true"
                />
                <div>
                  <span className="block text-[0.65rem] uppercase tracking-wide text-[#d8d0c7]">
                    {signal.label}
                  </span>
                  <span className="block font-serif text-lg leading-tight">
                    {signal.value}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
