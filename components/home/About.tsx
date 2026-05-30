import Link from "next/link";
import { Container } from "@/components/ui/container";
import { homeContent } from "./content";

export function About() {
  const { eyebrow, heading, body, cta } = homeContent.about;

  return (
    <section
      id="about"
      className="border-b border-[var(--color-border)] bg-[var(--color-background)]"
    >
      <Container className="py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:items-center md:gap-16">
          {/* Placeholder portrait slot. <!-- TODO: real headshot from Esteban --> */}
          <div
            className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-muted)]"
            aria-hidden="true"
          >
            <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-[0.2em] text-[var(--color-muted-foreground)]">
              Portrait coming soon
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[var(--color-muted-foreground)] md:text-sm">
              {eyebrow}
            </p>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              {heading}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-muted-foreground)] md:text-lg">
              {body}
            </p>
            <Link
              href={cta.href}
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-foreground)] underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
            >
              {cta.label}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
