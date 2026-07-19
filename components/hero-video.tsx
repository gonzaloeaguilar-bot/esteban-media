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
        className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_72%_32%,#cf6a2c_0%,#2d140d_46%,#080404_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(0,0,0,.15),rgba(0,0,0,.72))]"
      />

      <Container size="xl" className="relative">
        <div className="flex min-h-[78svh] flex-col justify-center py-20 sm:min-h-[82svh] sm:py-24 lg:min-h-[88svh] lg:py-28">
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs uppercase tracking-wide backdrop-blur">
            <MapPin className="size-3.5" aria-hidden="true" />
            Fort Lauderdale · Broward · Miami-Dade · Palm Beach County by quote
          </div>

          <h1
            id="hero-heading"
            className="mt-6 max-w-[14ch] font-serif text-5xl leading-[1.02] sm:text-6xl lg:text-7xl"
          >
            We make things feel like a film.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-[#e8e2d8] sm:text-lg sm:leading-8">
            Esteban Moreno Media provides video editing, AI-assisted content,
            and social planning from Fort Lauderdale for Broward, Miami-Dade,
            and remote clients. Selected on-location production is quoted by
            project.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#e85d3e] px-6 text-sm font-medium text-white transition hover:bg-[#c84a2c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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

          <dl className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {trustSignals.map((signal) => {
              const Icon = signal.icon;
              return (
                <div
                  key={signal.label}
                  className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/5 p-3 backdrop-blur"
                >
                  <Icon
                    className="size-5 text-[#f0b384]"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-[0.65rem] uppercase tracking-wide text-[#d8d0c7]">
                      {signal.label}
                    </dt>
                    <dd className="font-serif text-lg leading-tight">
                      {signal.value}
                    </dd>
                  </div>
                </div>
              );
            })}
          </dl>
        </div>
      </Container>
    </section>
  );
}
