import Link from "next/link";
import { Container } from "@/components/ui/container";
import { homeContent } from "./content";

// Cinematic full-bleed hero. <video> is muted/looped/playsInline so it
// auto-plays on iOS. Poster fallback covers no-JS / reduced-motion / file
// missing. Source path is a placeholder — drop a CC0 sample (e.g. Coverr,
// Pexels) at /public/video/hero.mp4 + /public/video/hero-poster.jpg.
// <!-- TODO: real hero footage from Esteban -->

export function Hero() {
  const { eyebrow, headline, sub, primaryCta, secondaryCta } = homeContent.hero;

  return (
    <section className="relative isolate flex min-h-[80vh] w-full items-center overflow-hidden border-b border-[var(--color-border)] md:min-h-screen">
      {/* Background video — silent, looped, decorative */}
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/video/hero-poster.jpg"
        aria-hidden="true"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      {/* Cinematic gradient overlay for legibility */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/50 to-black/80"
        aria-hidden="true"
      />

      <Container className="relative py-32 md:py-40">
        <p className="mb-5 text-xs uppercase tracking-[0.25em] text-[var(--color-muted-foreground)] md:text-sm">
          {eyebrow}
        </p>
        <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-[var(--color-foreground)] md:text-6xl lg:text-7xl">
          {headline}
        </h1>
        <p className="mt-6 max-w-xl text-base text-[var(--color-muted-foreground)] md:text-lg">
          {sub}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href={primaryCta.href}
            className="inline-flex h-12 items-center justify-center rounded-md bg-[var(--color-foreground)] px-6 text-sm font-medium text-[var(--color-background)] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
          >
            {primaryCta.label}
          </Link>
          <Link
            href={secondaryCta.href}
            className="inline-flex h-12 items-center justify-center rounded-md border border-[var(--color-border)] bg-transparent px-6 text-sm font-medium text-[var(--color-foreground)] transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
          >
            {secondaryCta.label}
          </Link>
        </div>
      </Container>
    </section>
  );
}
