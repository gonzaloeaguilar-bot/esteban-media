import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";

type Locale = "en" | "es";

const copy = {
  en: {
    eyebrow: "One project, one creative partner",
    heading: "Start with the purpose. Choose the craft that helps.",
    lead: "I listen to what you need to communicate, help shape the idea, and stay directly involved through the finished work.",
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
      className="border-t border-[#e4e0da] bg-[#f7f5f1] py-12 sm:py-16 lg:py-20 text-[#101214]"
      data-section="personal-craft-experience"
    >
      <Container size="lg">
        <div className="max-w-3xl">
          <p className="em-eyebrow text-[#9d3d2b]">{c.eyebrow}</p>
          <h2 id={`personal-craft-heading-${locale}`} className="mt-3 em-h2">
            {c.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#4d5358] sm:text-lg sm:leading-8">
            {c.lead}
          </p>
        </div>

        <ol className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-5 lg:gap-6" aria-label={c.eyebrow}>
          {c.commitments.map((commitment, index) => (
            <li
              key={commitment}
              className="relative flex flex-col justify-between rounded-2xl border border-[#e4e0da] bg-white p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition hover:border-[#cfc4b8]"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#f0ede6] pb-3">
                  <span className="font-mono text-xs font-bold tracking-widest text-[#9d3d2b]" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-wider text-[#8a8278]">
                    {index === 0
                      ? (locale === "es" ? "Propósito" : "Purpose")
                      : index === 1
                      ? (locale === "es" ? "Oficio" : "Craft")
                      : (locale === "es" ? "Siguiente paso" : "Next step")}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#252a2d] sm:text-[15px] sm:leading-6">
                  {commitment}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-col items-start gap-4 border-t border-[#e4e0da] pt-6 sm:flex-row sm:items-center sm:justify-between">
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
              <span className="flex size-5 items-center justify-center rounded-full border border-[#d16a55]/40 text-xs font-mono font-bold leading-none text-[#9d3d2b] transition-transform group-open:rotate-45" aria-hidden="true">
                +
              </span>
              <span className="underline decoration-[#d16a55]/60 underline-offset-4">{c.detail}</span>
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
      </Container>
    </section>
  );
}
