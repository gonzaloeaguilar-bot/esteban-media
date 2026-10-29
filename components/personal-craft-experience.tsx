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
      className="border-y border-[#d8cec1] bg-[#ece5da] py-12 sm:py-16 lg:py-20"
      data-section="personal-craft-experience"
    >
      <Container size="xl">
        <div className="grid gap-9 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16">
          <div className="max-w-xl">
            <p className="em-eyebrow">{c.eyebrow}</p>
            <h2 id={`personal-craft-heading-${locale}`} className="mt-3 em-h2">
              {c.heading}
            </h2>
            <p className="mt-5 text-base leading-7 text-[#252a2d] sm:text-lg sm:leading-8">
              {c.lead}
            </p>
            <a
              href="#start"
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#101214] px-6 text-sm font-medium text-[#f6f1ea] transition hover:bg-[#2a2e32] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9d3d2b]"
              data-cta="personal_craft_choose_path"
            >
              {c.action}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>

          <div className="border-t border-[#cfc4b8] pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <ol className="space-y-4" aria-label={c.eyebrow}>
              {c.commitments.map((commitment, index) => (
                <li key={commitment} className="grid grid-cols-[2.25rem_1fr] gap-3 sm:grid-cols-[2.75rem_1fr] sm:gap-4">
                  <span className="flex size-9 items-center justify-center rounded-full border border-[#bfb3a6] font-serif text-lg text-[#9d3d2b] sm:size-11 sm:text-xl" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <p className="m-0 pt-1 text-base leading-7 text-[#252a2d] sm:pt-1.5 sm:text-lg sm:leading-8">{commitment}</p>
                </li>
              ))}
            </ol>

            <details className="mt-7 border-t border-[#cfc4b8] pt-4">
              <summary className="cursor-pointer text-sm font-semibold text-[#9d3d2b] underline decoration-[#d16a55] underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9d3d2b]">
                {c.detail}
              </summary>
              <div className="mt-4 max-w-2xl text-sm leading-6 text-[#4d4741] sm:text-base sm:leading-7">
                <p className="m-0">{c.detailText}</p>
                <p className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                  <Link href={`${prefix}/services`} className="font-medium text-[#9d3d2b] underline decoration-[#d16a55] underline-offset-4 hover:text-[#7f2f20]">
                    {c.services}
                  </Link>
                  <Link href={`${prefix}/portfolio`} className="font-medium text-[#9d3d2b] underline decoration-[#d16a55] underline-offset-4 hover:text-[#7f2f20]">
                    {c.portfolio}
                  </Link>
                </p>
              </div>
            </details>
          </div>
        </div>
      </Container>
    </section>
  );
}
