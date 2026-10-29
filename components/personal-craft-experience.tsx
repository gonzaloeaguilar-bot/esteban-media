import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";

type Locale = "en" | "es";

const copy = {
  en: {
    eyebrow: "One project, one creative partner",
    heading: "Start with the purpose. Choose the craft that helps.",
    lead: "I listen to what you need to communicate, help shape the idea, and stay directly involved through the finished work.",
    photoAlt: "Esteban Moreno on location filming with camera in hand",
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
    photoAlt: "Esteban Moreno en rodaje con cámara en mano",
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
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-14 xl:gap-16">
          {/* Visual column: Authentic on-set production still */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/3] sm:aspect-[4/5] overflow-hidden rounded-2xl bg-[#141618] shadow-xl shadow-black/10 ring-1 ring-black/5">
              <Image
                src="/about/esteban-on-location.jpg"
                alt={c.photoAlt}
                fill
                sizes="(min-width: 1024px) 460px, (min-width: 640px) 420px, 90vw"
                className="object-cover object-[center_28%]"
              />
              {/* Filmic gradient overlay for legibility */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"
                aria-hidden="true"
              />

              {/* Viewfinder REC status pill */}
              <div
                className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[10px] font-mono font-medium tracking-wider text-white/90 backdrop-blur-md"
                aria-hidden="true"
              >
                <span className="size-1.5 rounded-full bg-[#e62b26]" />
                <span>REC</span>
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
