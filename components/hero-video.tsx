import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

import { Container } from "@/components/ui/container";
import { trustSignals } from "@/lib/site";

export function HeroVideo() {
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

      <Container size="xl" className="relative py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
          <div>
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs uppercase tracking-wide backdrop-blur">
              <MapPin className="size-3.5" aria-hidden="true" />
              Fort Lauderdale · Broward · Miami-Dade · Palm Beach expansion area
            </div>

            <h1
              id="hero-heading"
              className="mt-6 max-w-[17ch] font-serif text-5xl leading-[1.02] sm:text-6xl lg:text-7xl"
            >
              Video editing and content production in Fort Lauderdale.
            </h1>

            <p className="mt-5 font-serif text-2xl italic text-[#f0b384] sm:text-3xl">
              We make things feel like a film.
            </p>

            <p className="mt-4 max-w-2xl text-base leading-7 text-[#e8e2d8] sm:text-lg sm:leading-8">
              Esteban Moreno Media provides video editing, AI-assisted content,
              and social planning from Fort Lauderdale for Broward, Miami-Dade,
              and remote clients. On-location production is considered
              selectively, project by project.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#c84a2c] px-6 text-sm font-medium text-white transition hover:bg-[#a93e29] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Start a project
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="#services"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 bg-white/5 px-6 text-sm font-medium text-white backdrop-blur transition hover:bg-white hover:text-[#101214] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                See what Esteban does
              </Link>
            </div>
          </div>

          <figure className="mx-auto w-full max-w-[26rem] lg:mx-0 lg:justify-self-end">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-white/10 shadow-2xl shadow-black/40">
              <Image
                src="/about/esteban-on-set.jpg"
                alt="Esteban Moreno filming with a Canon camera on a lit studio set in Fort Lauderdale"
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
          className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
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
