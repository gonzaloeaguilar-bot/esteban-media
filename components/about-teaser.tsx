import Link from "next/link";
import { ArrowRight, Camera, MapPin, Plane } from "lucide-react";

import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

const highlights = [
  {
    icon: MapPin,
    label: "Local",
    detail:
      "Based in Fort Lauderdale, working across Broward and Miami-Dade weekly.",
  },
  {
    icon: Camera,
    label: "Full toolkit",
    detail:
      "Photo, video, drone, and post — one operator, no agency handoffs.",
  },
  {
    icon: Plane,
    label: "FAA-aware",
    detail:
      "Drone work planned around airspace, weather, and what the shot actually needs.",
  },
];

export function AboutTeaser() {
  return (
    <section
      aria-labelledby="about-heading"
      className="border-b border-[#ddd4c8] bg-[#ece5da] py-14 sm:py-20"
    >
      <Container size="xl">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:gap-16">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-wide text-[#5a6066]">
              About Esteban
            </p>
            <h2
              id="about-heading"
              className="mt-3 font-serif text-4xl leading-tight sm:text-5xl"
            >
              Visual storyteller, not just &ldquo;the drone guy.&rdquo;
            </h2>
            <p className="mt-5 text-base leading-7 text-[#252a2d] sm:text-lg sm:leading-8">
              {site.shortName} shoots and edits across photo, video, drone, and
              post for South Florida businesses. The work is calm, scoped, and
              built to ship — no agency theater, no inflated decks, no fake
              testimonials.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/about"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#101214] px-6 text-sm font-medium text-[#f6f1ea] hover:bg-[#2a2e32]"
              >
                More about Esteban
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/services"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
              >
                What he can shoot
              </Link>
            </div>
          </div>

          <ul role="list" className="grid gap-3">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.label}
                  className="flex items-start gap-4 rounded-lg border border-[#d0c7bb] bg-[#f6f1ea] p-5"
                >
                  <Icon
                    className="mt-0.5 size-6 shrink-0 text-[#e85d3e]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-[#5a6066]">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[#252a2d]">
                      {item.detail}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
