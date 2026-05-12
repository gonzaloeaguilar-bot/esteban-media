import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AboutTeaser() {
  return (
    <section
      aria-labelledby="about-heading"
      className="bg-background py-20 sm:py-28"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 md:grid-cols-2 md:gap-16 lg:px-8">
        {/* Portrait placeholder — no AI-generated photos. Replace with Esteban's
            real headshot when delivered. */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-200 via-zinc-300 to-zinc-400 md:order-2 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-900">
          {/* TODO: real asset from Esteban — professional portrait, 4:5 ratio. */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-zinc-500/80 dark:text-zinc-400/80">
              Portrait placeholder
            </span>
          </div>
        </div>

        <div className="md:order-1">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
            About Esteban
          </p>
          <h2
            id="about-heading"
            className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            A visual storyteller, not a drone guy.
          </h2>
          {/* TODO: real bio from Esteban — keep cinematic, calm, confident.
              No corporate jargon, no superlatives without proof. */}
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            South-Florida-based and bilingual (EN/ES). Esteban shoots and edits
            across formats — drone, camera, post — so your story stays in one
            pair of hands from the first frame to the final cut.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            We make things feel like a film.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground underline-offset-4 transition hover:underline sm:text-base"
          >
            More about Esteban
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
