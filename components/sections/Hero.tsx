import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

/**
 * Cinematic full-bleed hero with a background video (placeholder sample) and
 * dark overlay for legibility. Mobile-first sizing scales up at md/lg.
 *
 * Performance + a11y notes (Lighthouse-driven):
 *  - The background video is purely decorative (`aria-hidden`). Headline copy
 *    is the LCP element, not the video, so we set `preload="metadata"` and
 *    omit `priority`-style hints — the video should NEVER race the headline.
 *  - `motion-reduce:hidden` removes the video entirely when the visitor opts
 *    out of motion. The same-element gradient backdrop remains as a static
 *    fallback so the section is never visually empty.
 *  - The `<video>` carries explicit `width`/`height` so the browser can
 *    reserve aspect-ratio'd space before the asset resolves (CLS = 0).
 *  - Until Esteban delivers a self-hosted showreel we keep the GCS sample
 *    URL, but `preload="metadata"` keeps the bytes off the critical path.
 *
 * TODO: real asset from Esteban — swap the placeholder reel for his showreel
 * when delivered. Keep dimensions >=1080p, <=8s loop, muted/silent, and host
 * on Vercel Blob (or Mux) so the asset shares an origin with the page.
 */
export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[88vh] w-full items-center overflow-hidden bg-black text-white"
    >
      {/* Static cinematic backdrop. Always rendered so the section has a
          baseline look even when (a) the video is still buffering, (b) the
          visitor has prefers-reduced-motion enabled, or (c) the video URL
          fails. Pure CSS — no extra network request, no LCP candidate. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top,rgba(40,40,40,0.9),rgba(0,0,0,1))]"
      />

      {/* Background video — placeholder sample. Decorative, so it's hidden
          from assistive tech and from anyone who prefers reduced motion. */}
      <video
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-70 motion-reduce:hidden"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        // `metadata` keeps the video off the critical-byte path; the browser
        // only fetches enough to know dimensions/duration until it actually
        // starts playing. `auto` (the default) was the prior LCP regression.
        preload="metadata"
        // Explicit intrinsic dimensions stop the browser from reflowing the
        // section when the video resolves. Object-cover fills the container.
        width={1920}
        height={1080}
        // Same-origin SVG poster keeps the placeholder visible until the
        // first video frame paints, without a cross-origin image request.
        poster="/vercel.svg"
        // Public sample from Google's GTV bucket — Vercel-friendly, HTTPS, no auth.
        // TODO: real asset from Esteban — replace with hosted showreel and
        // self-host (Vercel Blob / Mux) so LCP isn't bottlenecked on a third-party.
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
      />

      {/* Dark gradient overlay for headline legibility. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/50 to-black/80"
      />

      <div className="mx-auto w-full max-w-5xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/70 sm:text-sm">
          {t("eyebrow")}
        </p>
        <h1
          id="hero-heading"
          className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {t("headlineLine1")}
          <br />
          <span className="text-white/70">{t("headlineLine2")}</span>
        </h1>
        <p className="mt-6 max-w-xl text-base text-white/80 sm:text-lg">
          {t("lede")}
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:text-base"
          >
            {t("ctaPrimary")}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/0 px-5 py-3 text-sm font-medium text-white transition hover:border-white/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:text-base"
          >
            {t("ctaSecondary")}
          </Link>
        </div>
      </div>
    </section>
  );
}
