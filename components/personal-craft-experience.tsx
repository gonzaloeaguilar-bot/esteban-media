import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";

type Locale = "en" | "es";

const copy = {
  en: {
    eyebrow: "One project, one creative partner",
    heading: "Start with the purpose. Choose the craft that helps.",
    lead: "I listen to what you need to communicate, help shape the idea, and stay directly involved through the finished work.",
    photoAlt: "Esteban Moreno directing a commercial shoot on location with camera in hand",
    roleTag: "Director & Video Editor",
    roleNote: "Direct collaboration on every cut, shoot and delivery.",
    stepTitles: ["Purpose", "Craft", "Next step"],
    commitments: [
      "Begin with the goal, the audience, and where the work needs to live.",
      "Choose the right craft: editing, content planning, scoped production, or a connected website.",
      "Leave with a practical next step for your project.",
    ],
    action: "Choose a project path",
    detail: "See the wider creative scope",
    detailText: "Some projects need more than one piece of work. Explore the services and portfolio, then choose the project path that fits what you are making.",
    services: "Explore services",
    portfolio: "See the portfolio",
  },
  es: {
    eyebrow: "Un proyecto, un socio creativo",
    heading: "Empieza por la meta. Elige el oficio que te ayuda.",
    lead: "Escucho lo que necesitas comunicar, te ayudo a darle forma a la idea y sigo involucrado directamente hasta terminar el trabajo.",
    photoAlt: "Esteban Moreno dirigiendo un rodaje comercial en locación con cámara en mano",
    roleTag: "Director y Editor de Video",
    roleNote: "Atención directa en cada corte, rodaje y entrega.",
    stepTitles: ["Propósito", "Oficio", "Siguiente paso"],
    commitments: [
      "Empezamos por la meta, la audiencia y dónde debe vivir el trabajo.",
      "Elegimos el oficio correcto: edición, planificación de contenido, producción puntual o un sitio web conectado.",
      "Sales con un siguiente paso práctico para tu proyecto.",
    ],
    action: "Elegir un tipo de proyecto",
    detail: "Ver el alcance creativo completo",
    detailText: "Algunos proyectos necesitan más de una pieza. Explora los servicios y el portafolio, y luego elige el tipo de proyecto que encaja con lo que quieres crear.",
    services: "Explorar servicios",
    portfolio: "Ver el portafolio",
  },
} as const;

export function PersonalCraftExperience({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const prefix = locale === "es" ? "/es" : "";

  return (
    <section
      aria-labelledby={`personal-craft-heading-${locale}`}
      className="border-t border-[#e4e0da] bg-[#f7f5f1] py-14 sm:py-18 lg:py-22 text-[#101214]"
      data-section="personal-craft-experience"
    >
      <Container size="xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-center lg:gap-14 xl:gap-16">
          {/* Visual column: Authentic on-set production video */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="group relative aspect-[4/3] sm:aspect-[4/5] overflow-hidden rounded-2xl bg-[#141618] shadow-2xl shadow-black/15 ring-1 ring-black/10">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/about/esteban-on-set-frame.jpg"
                className="size-full object-cover object-[center_35%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                aria-label={c.photoAlt}
              >
                <source src="/about/esteban-on-set.mp4" type="video/mp4" />
              </video>

              {/* Filmic gradient overlay for legibility */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/15"
                aria-hidden="true"
              />

              {/* Viewfinder corner brackets (matching camera HUD in the section under) */}
              <span className="pointer-events-none absolute top-3.5 left-3.5 size-3.5 border-t-2 border-l-2 border-white/60 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              <span className="pointer-events-none absolute top-3.5 right-3.5 size-3.5 border-t-2 border-r-2 border-white/60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              <span className="pointer-events-none absolute bottom-3.5 left-3.5 size-3.5 border-b-2 border-l-2 border-white/60 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:translate-y-0.5" aria-hidden="true" />
              <span className="pointer-events-none absolute bottom-3.5 right-3.5 size-3.5 border-b-2 border-r-2 border-white/60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" aria-hidden="true" />

              {/* Center focus crosshair / target ring */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
                <span className="size-8 rounded-full border border-white/20 transition-all duration-500 group-hover:scale-125 group-hover:border-[#c84a2c]/60" />
                <span className="absolute size-1.5 rounded-full bg-white/40 transition-colors group-hover:bg-[#e62b26]" />
              </div>

              {/* Top status bar: Camera specs + REC indicator */}
              <div className="absolute top-4 inset-x-4 flex items-center justify-between" aria-hidden="true">
                <span className="rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-[10px] font-mono font-medium tracking-widest text-white/90 backdrop-blur-md">
                  SONY 4K · 60P
                </span>

                <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[10px] font-mono tracking-wider text-white backdrop-blur-md shadow-xs">
                  <span className="size-2 rounded-full bg-[#e62b26] animate-pulse shadow-[0_0_8px_#e62b26]" />
                  <span className="font-bold">REC</span>
                  <span className="text-white/60 pl-0.5">00:15:24</span>
                </div>
              </div>

              {/* Director & Editor caption strip */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 text-[#f6f1ea]">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff8c73]">
                  {c.roleTag}
                </p>
                <p className="mt-1 font-serif text-2xl text-white">
                  Esteban Moreno
                </p>
                <p className="mt-1.5 text-xs text-[#ddd4c8] leading-relaxed max-w-xs">
                  {c.roleNote}
                </p>
              </div>
            </div>
          </div>

          {/* Narrative & Process column */}
          <div className="max-w-xl">
            <p className="em-eyebrow text-[#9d3d2b]">{c.eyebrow}</p>
            <h2
              id={`personal-craft-heading-${locale}`}
              className="mt-3 em-h2 text-balance"
            >
              {c.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#4d5358] sm:text-lg sm:leading-8">
              {c.lead}
            </p>

            {/* Editorial process timeline */}
            <ol
              className="mt-7 space-y-4 border-t border-[#e4e0da] pt-6"
              aria-label={c.eyebrow}
            >
              {c.commitments.map((commitment, index) => (
                <li
                  key={commitment}
                  className="group flex items-start gap-4 rounded-xl p-2.5 transition hover:bg-white/60"
                >
                  <span
                    className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#eee7dc] font-mono text-xs font-bold text-[#9d3d2b] transition group-hover:bg-[#9d3d2b] group-hover:text-white"
                    aria-hidden="true"
                  >
                    0{index + 1}
                  </span>
                  <div className="pt-0.5">
                    <h3 className="text-sm font-semibold text-[#1a1c1e]">
                      {c.stepTitles[index]}
                    </h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-[#555d64]">
                      {commitment}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            {/* Actions & Voluntary depth */}
            <div className="mt-7 flex flex-wrap items-center gap-4 border-t border-[#e4e0da] pt-6">
              <a
                href="#start"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#101214] px-6 py-2.5 text-sm font-medium text-[#f6f1ea] transition hover:bg-[#25282c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9d3d2b]"
                data-cta="personal_craft_choose_path"
              >
                <span>{c.action}</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>

              <details className="group text-left">
                <summary className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#9d3d2b] transition hover:text-[#7f2f20] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9d3d2b] list-none [&::-webkit-details-marker]:hidden">
                  <span
                    className="flex size-5 items-center justify-center rounded-full border border-[#d16a55]/40 text-xs font-mono font-bold leading-none text-[#9d3d2b] transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                  <span className="underline decoration-[#d16a55]/60 underline-offset-4">
                    {c.detail}
                  </span>
                </summary>
                <div className="mt-3 max-w-xl rounded-xl border border-[#e4e0da] bg-white p-4 text-sm leading-relaxed text-[#4d5358] shadow-[0_1px_2px_rgba(0,0,0,0.03)] sm:p-5">
                  <p className="m-0">{c.detailText}</p>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                    <Link
                      href={`${prefix}/services`}
                      className="inline-flex items-center gap-1 font-medium text-[#9d3d2b] underline decoration-[#d16a55] underline-offset-4 transition hover:text-[#7f2f20]"
                    >
                      {c.services} →
                    </Link>
                    <Link
                      href={`${prefix}/portfolio`}
                      className="inline-flex items-center gap-1 font-medium text-[#9d3d2b] underline decoration-[#d16a55] underline-offset-4 transition hover:text-[#7f2f20]"
                    >
                      {c.portfolio} →
                    </Link>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
