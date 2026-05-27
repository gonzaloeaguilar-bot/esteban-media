import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Photography, videography, aerial/drone, video editing, and photo editing — full-service visual storytelling across South Florida.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section
        aria-labelledby="services-overview-heading"
        className="border-b border-border bg-background py-20 sm:py-28"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
              Services
            </p>
            <h1
              id="services-overview-heading"
              className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
            >
              One studio. Capture and post, end to end.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Esteban shoots and edits across formats so your story stays in one
              pair of hands from the first frame to the final cut. Pick a
              service to learn more, or{" "}
              <Link
                href="/contact"
                className="font-medium text-foreground underline underline-offset-4 transition hover:opacity-80"
              >
                start a project
              </Link>
              .
            </p>
          </div>

          <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(({ slug, name, longBlurb, Icon }) => (
              <li key={slug} className="h-full">
                <Link
                  href={`/services/${slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <Icon
                    className="size-8 text-foreground/80 transition group-hover:text-foreground"
                    aria-hidden
                  />
                  <h2 className="mt-6 text-xl font-semibold tracking-tight">
                    {name}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {longBlurb}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground">
                    Learn more
                    <ArrowRight
                      className="size-4 transition group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
