import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { HeroVideo } from "./HeroVideo";

/**
 * Cinematic full-bleed hero with a background video (placeholder sample) and
 * dark overlay for legibility. Mobile-first sizing scales up at md/lg.
 *
 * TODO: real asset from Esteban — swap the placeholder reel for his showreel
 * when delivered. Keep dimensions ≥1080p, ≤8s loop, muted/silent.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[88vh] w-full items-center overflow-hidden bg-black text-white"
    >
      {/* Background video — respects prefers-reduced-motion (autoplay skipped). */}
      <HeroVideo
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-70"
        poster="/vercel.svg"
        // Public sample from Google's GTV bucket — Vercel-friendly, HTTPS, no auth.
        // TODO: real asset from Esteban — replace with hosted showreel.
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
      />

      {/* Dark gradient overlay for headline legibility. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/50 to-black/80"
      />

      <div className="mx-auto w-full max-w-5xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/70 sm:text-sm">
          Esteban Media · South Florida
        </p>
        <h1
          id="hero-heading"
          className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Visual stories,
          <br />
          <span className="text-white/70">from above and on the ground.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base text-white/80 sm:text-lg">
          Aerial, photography, videography, and post — full-service capture for
          brands, weddings, real estate, and creators across South Florida.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:text-base"
          >
            Start a project
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/0 px-5 py-3 text-sm font-medium text-white transition hover:border-white/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:text-base"
          >
            See the work
          </Link>
        </div>
      </div>
    </section>
  );
}
