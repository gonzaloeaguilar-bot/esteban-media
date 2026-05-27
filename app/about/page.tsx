import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Esteban",
  description:
    "South-Florida-based visual storyteller. Aerial, photography, videography, and post — one pair of hands from the first frame to the final cut.",
};

/**
 * About Esteban — placeholder bio + brand statement + equipment list.
 *
 * Bilingual structure is staged inline (EN first, then ES) using
 * <!-- TRANSLATION REVIEW NEEDED --> markers per CLAUDE.md i18n rule.
 * The full next-intl wiring lands in a separate P1 task; this page is
 * ready to be lifted into messages/{en,es}.json with minimal churn.
 *
 * No AI-generated photos. Portrait + sample images are placeholder
 * blocks marked with `TODO: real asset from Esteban`.
 */
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HERO ------------------------------------------------------------- */}
      <section
        aria-labelledby="about-hero-heading"
        className="border-b border-border bg-background py-20 sm:py-28"
      >
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 md:grid-cols-2 md:gap-16 lg:px-8">
          {/* Portrait placeholder — never AI-generate. */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-200 via-zinc-300 to-zinc-400 md:order-2 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-900">
            {/* TODO: real asset from Esteban — professional headshot, 4:5 ratio. */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-zinc-500/80 dark:text-zinc-400/80">
                Headshot placeholder
              </span>
            </div>
          </div>

          <div className="md:order-1">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
              About
            </p>
            <h1
              id="about-hero-heading"
              className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
            >
              Esteban.
              <br />
              <span className="text-muted-foreground">
                Visual storyteller.
              </span>
            </h1>

            {/* EN bio — placeholder. */}
            {/* TODO: real bio from Esteban — keep cinematic, calm, confident.
                No corporate jargon, no superlatives without proof. */}
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Esteban is a South-Florida-based photographer, videographer, and
              drone operator. He shoots and edits across formats so your story
              stays in one pair of hands from the first frame to the final cut.
              Bilingual on set (EN/ES). Calm direction, cinematic eye, fast
              turnarounds.
            </p>

            {/* ES bio — placeholder translation. */}
            {/* TRANSLATION REVIEW NEEDED — native speaker (Gonzalo) to confirm
                tone and Spanish-Florida idiom before next-intl wiring. */}
            <p
              lang="es"
              className="mt-4 text-base leading-relaxed text-muted-foreground/80 sm:text-lg"
            >
              Esteban es fotógrafo, videógrafo y piloto de dron radicado en el
              sur de la Florida. Captura y edita en todos los formatos para
              que tu historia esté en las mismas manos, del primer encuadre al
              corte final. Bilingüe en el set (EN/ES). Dirección serena,
              mirada cinematográfica, entregas rápidas.
            </p>
          </div>
        </div>
      </section>

      {/* BRAND STATEMENT -------------------------------------------------- */}
      <section
        aria-labelledby="brand-statement-heading"
        className="border-b border-border bg-background py-20 sm:py-28"
      >
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
            What we make
          </p>
          <h2
            id="brand-statement-heading"
            className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
          >
            We make things feel like a film.
          </h2>

          {/* EN brand statement. */}
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Not just clips. Not just photos. Stories with a point of view —
            shot, lit, and cut so the work carries the feeling you wanted
            when you first imagined it. We pick the right tool for the
            story: a wide aerial when a building deserves scale, a quiet
            portrait when a person deserves stillness, a sharp social cut
            when an audience deserves momentum.
          </p>

          {/* ES brand statement — placeholder translation. */}
          {/* TRANSLATION REVIEW NEEDED */}
          <p
            lang="es"
            className="mt-4 text-base leading-relaxed text-muted-foreground/80 sm:text-lg"
          >
            No son simples clips. No son simples fotos. Son historias con
            punto de vista — filmadas, iluminadas y montadas para que el
            resultado transmita exactamente lo que imaginaste al principio.
            Elegimos la herramienta correcta para cada historia: un plano
            aéreo amplio cuando un lugar merece escala, un retrato sereno
            cuando una persona merece quietud, un corte social ágil cuando
            una audiencia merece ritmo.
          </p>
        </div>
      </section>

      {/* EQUIPMENT -------------------------------------------------------- */}
      <section
        aria-labelledby="equipment-heading"
        className="border-b border-border bg-background py-20 sm:py-28"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
              Equipment
            </p>
            <h2
              id="equipment-heading"
              className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              The kit, in plain terms.
            </h2>
            {/* EN intro. */}
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Gear is a tool, not a brag. Here&apos;s what shows up to set.
            </p>
            {/* ES intro — placeholder translation. */}
            {/* TRANSLATION REVIEW NEEDED */}
            <p
              lang="es"
              className="mt-2 text-base leading-relaxed text-muted-foreground/80 sm:text-lg"
            >
              El equipo es una herramienta, no un alarde. Esto es lo que
              llega al set.
            </p>
          </div>

          {/* TODO: real equipment list from Esteban — confirm models, lenses,
              and licensing details before publishing. */}
          <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {EQUIPMENT.map(({ category, items }) => (
              <li
                key={category.en}
                className="flex h-full flex-col rounded-2xl border border-border bg-card p-7"
              >
                <h3 className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
                  {category.en}
                </h3>
                {/* ES label — placeholder translation. */}
                {/* TRANSLATION REVIEW NEEDED */}
                <p
                  lang="es"
                  className="mt-1 text-[11px] uppercase tracking-[0.25em] text-muted-foreground/60"
                >
                  {category.es}
                </p>
                <ul className="mt-5 space-y-2 text-sm leading-relaxed text-foreground/90">
                  {items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span
                        aria-hidden
                        className="mt-2 inline-block size-1 shrink-0 rounded-full bg-foreground/40"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-sm text-muted-foreground">
            Part 107 licensed for drone operations. Insured. Bilingual on set
            (EN/ES).
          </p>
        </div>
      </section>

      {/* CTA -------------------------------------------------------------- */}
      <section
        aria-labelledby="about-cta-heading"
        className="bg-background py-20 sm:py-28"
      >
        <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            id="about-cta-heading"
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Have a project in mind?
          </h2>
          {/* EN copy. */}
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Tell us what you&apos;re trying to make. We&apos;ll tell you the
            simplest way to make it well.
          </p>
          {/* ES copy — placeholder translation. */}
          {/* TRANSLATION REVIEW NEEDED */}
          <p
            lang="es"
            className="mt-2 text-base leading-relaxed text-muted-foreground/80 sm:text-lg"
          >
            Cuéntanos qué quieres crear. Te diremos la forma más simple de
            hacerlo bien.
          </p>

          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Start a project
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>
    </main>
  );
}

/**
 * Equipment list — placeholder until Esteban confirms exact bodies, lenses,
 * and drone models. Bilingual category labels staged inline; items will be
 * promoted into messages/{en,es}.json once next-intl lands.
 *
 * TODO: real equipment list from Esteban.
 */
const EQUIPMENT: ReadonlyArray<{
  category: { en: string; es: string };
  items: readonly string[];
}> = [
  {
    category: { en: "Cameras", es: "Cámaras" },
    items: [
      "Full-frame mirrorless body (primary)",
      "Backup mirrorless body",
      "Cinema-grade camera for brand films",
    ],
  },
  {
    category: { en: "Lenses", es: "Lentes" },
    items: [
      "24–70mm f/2.8 zoom",
      "70–200mm f/2.8 telephoto",
      "35mm and 85mm primes for portraits",
      "Wide prime for interiors and architecture",
    ],
  },
  {
    category: { en: "Aerial / Drone", es: "Aéreo / Dron" },
    items: [
      "Professional quad — 4K / 5.4K capable",
      "Part 107 license + commercial insurance",
      "ND filter set for cinematic shutter",
    ],
  },
  {
    category: { en: "Lighting", es: "Iluminación" },
    items: [
      "Battery-powered LED key lights",
      "Soft boxes + diffusion for portraits",
      "Practicals and tungsten accents",
    ],
  },
  {
    category: { en: "Audio", es: "Audio" },
    items: [
      "Wireless lavalier kit (dual channel)",
      "Shotgun mic for on-camera interviews",
      "Field recorder for clean dialogue",
    ],
  },
  {
    category: { en: "Post-production", es: "Post-producción" },
    items: [
      "DaVinci Resolve — color grade and finish",
      "Premiere Pro + After Effects",
      "Lightroom + Photoshop for stills",
      "Calibrated reference display",
    ],
  },
] as const;
