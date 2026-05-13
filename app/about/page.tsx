import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAboutCopy } from "@/content/about";

// Static server component — copy is read at build time, no client JS shipped.
// next-intl wiring is a separate P1 task; until then we render the EN locale
// directly. The ES copy already lives in content/about.ts so the locale swap
// later won't require touching this file's JSX.
const copy = getAboutCopy("en");

export const metadata: Metadata = {
  title: "About Esteban",
  description:
    "Esteban is a full-service visual storyteller based in South Florida — aerial, photography, videography, and post-production.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Container className="py-20 sm:py-28">
        {/* ----------------------------------------------------------------
            1. Hero
           ---------------------------------------------------------------- */}
        <section aria-labelledby="about-hero" className="flex flex-col gap-4">
          <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
            {copy.hero.eyebrow}
          </p>
          <h1
            id="about-hero"
            className="text-4xl font-semibold tracking-tight sm:text-6xl"
          >
            {copy.hero.title}
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
            {copy.hero.intro}
          </p>
        </section>

        {/* ----------------------------------------------------------------
            2. Headshot + Bio (side-by-side on lg, stacked on mobile)
            <!-- TODO: real bio from Esteban -->
            <!-- TODO: real headshot from Esteban — replace placeholder div -->
           ---------------------------------------------------------------- */}
        <section
          aria-labelledby="about-bio"
          className="mt-20 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16"
        >
          <figure className="flex flex-col gap-3">
            <div
              role="img"
              aria-label={copy.headshot.alt}
              className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-muted via-muted/70 to-muted/40 ring-1 ring-foreground/10"
            >
              {/* Placeholder portrait. Never AI-generate a face — swap this
                  div for next/image when Esteban delivers a real headshot. */}
              <span className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
                Headshot
              </span>
              <span className="absolute bottom-3 right-3 rounded-md bg-background/80 px-2 py-0.5 text-[10px] font-medium tracking-wide text-muted-foreground uppercase ring-1 ring-foreground/10">
                Placeholder
              </span>
            </div>
            <figcaption className="text-sm text-muted-foreground">
              {copy.headshot.caption}
            </figcaption>
          </figure>

          <div className="flex flex-col gap-6">
            <h2
              id="about-bio"
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              {copy.bio.heading}
            </h2>
            <div className="flex flex-col gap-4 text-base text-muted-foreground sm:text-lg">
              {copy.bio.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------------
            3. Brand statement + pillars
           ---------------------------------------------------------------- */}
        <section
          aria-labelledby="about-brand"
          className="mt-24 border-t border-foreground/10 pt-16"
        >
          <div className="flex flex-col gap-4">
            <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
              {copy.brandStatement.heading}
            </p>
            <h2
              id="about-brand"
              className="max-w-3xl text-2xl font-semibold tracking-tight sm:text-4xl"
            >
              {copy.brandStatement.statement}
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {copy.brandStatement.pillars.map((pillar) => (
              <Card key={pillar.title}>
                <CardHeader>
                  <CardTitle>{pillar.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  {pillar.body}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ----------------------------------------------------------------
            4. Equipment
            <!-- TODO: real equipment list from Esteban -->
           ---------------------------------------------------------------- */}
        <section
          aria-labelledby="about-equipment"
          className="mt-24 border-t border-foreground/10 pt-16"
        >
          <div className="flex flex-col gap-4">
            <h2
              id="about-equipment"
              className="text-2xl font-semibold tracking-tight sm:text-4xl"
            >
              {copy.equipment.heading}
            </h2>
            <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
              {copy.equipment.intro}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {copy.equipment.categories.map((category) => (
              <div
                key={category.title}
                className="flex flex-col gap-3 rounded-xl bg-card p-5 ring-1 ring-foreground/10"
              >
                <h3 className="text-base font-medium">{category.title}</h3>
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                  {category.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/60"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-3xl text-sm text-muted-foreground">
            {copy.equipment.footnote}
          </p>
        </section>
      </Container>
    </main>
  );
}
