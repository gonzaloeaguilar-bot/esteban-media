"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

type Locale = "en" | "es";

const copy = {
  en: {
    eyebrow: "Caption self-check",
    title: "Will your Reel captions stay readable?",
    intro: "This is a quick planning check, not an inspection of your finished video. Pick the closest answer, then send a brief if you want help shaping the edit.",
    questions: [
      { label: "Where will most viewers see the video?", choices: ["Instagram Reels or TikTok", "More than one platform"] },
      { label: "What sits behind the lower third?", choices: ["A face, product, or important detail", "Mostly open background"] },
      { label: "Do captions have a written place to live?", choices: ["Yes — away from controls and key visuals", "Not yet / I am not sure"] },
    ],
    finish: "Your answers point to a caption placement decision before the final edit. Include the platform and what captions cannot cover in the brief.",
    action: "Build a caption-aware project brief",
  },
  es: {
    eyebrow: "Revisión rápida de subtítulos",
    title: "¿Tus subtítulos seguirán siendo legibles en un Reel?",
    intro: "Es una revisión de planificación, no una inspección de tu video terminado. Elige la respuesta más cercana y luego envía un brief si quieres definir la edición.",
    questions: [
      { label: "¿Dónde verá el video la mayoría de tu audiencia?", choices: ["Instagram Reels o TikTok", "En más de una plataforma"] },
      { label: "¿Qué aparece detrás del tercio inferior?", choices: ["Una cara, producto o detalle importante", "Mayormente fondo libre"] },
      { label: "¿Los subtítulos ya tienen un lugar definido?", choices: ["Sí — lejos de controles y elementos importantes", "Todavía no / no estoy seguro"] },
    ],
    finish: "Tus respuestas señalan una decisión de ubicación de subtítulos antes de cerrar la edición. Incluye la plataforma y lo que los subtítulos no pueden tapar en el brief.",
    action: "Preparar un brief con subtítulos en mente",
  },
} as const;

export function CaptionSafeZoneDiagnostic({ locale = "en" }: { locale?: Locale }) {
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null]);
  const text = copy[locale];
  const complete = answers.every((answer) => answer !== null);
  const contactPath = locale === "es" ? "/es/contacto?source=caption-safe-zone" : "/contact?source=caption-safe-zone";

  return (
    <section data-section="caption_safe_zone_diagnostic" className="rounded-2xl border border-[#d6ccc0] bg-[#fbf6ef] p-6 shadow-sm sm:p-8" aria-labelledby="caption-safe-zone-title">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9f3c27]">{text.eyebrow}</p>
      <h2 id="caption-safe-zone-title" className="mt-2 max-w-2xl font-serif text-3xl leading-tight text-[#101214] sm:text-4xl">{text.title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[#3f4548]">{text.intro}</p>
      <div className="mt-6 space-y-5">
        {text.questions.map((question, questionIndex) => (
          <fieldset key={question.label} className="border-t border-[#ddd4c8] pt-4 first:border-t-0 first:pt-0">
            <legend className="text-sm font-semibold text-[#101214]">{questionIndex + 1}. {question.label}</legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {question.choices.map((choice, choiceIndex) => {
                const selected = answers[questionIndex] === choiceIndex;
                return (
                  <button key={choice} type="button" aria-pressed={selected} onClick={() => setAnswers((current) => current.map((answer, index) => index === questionIndex ? choiceIndex : answer))} className={`min-h-12 rounded-xl border px-4 py-3 text-left text-sm transition ${selected ? "border-[#9f3c27] bg-[#f1d8ce] text-[#5e2419]" : "border-[#d6ccc0] bg-white text-[#252a2d] hover:border-[#9f3c27]"}`}>
                    {selected && <CheckCircle2 className="mr-2 inline size-4" aria-hidden="true" />}{choice}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>
      {complete && (
        <div className="mt-6 border-t border-[#d6ccc0] pt-5">
          <p className="max-w-2xl text-sm leading-6 text-[#3f4548]">{text.finish}</p>
          <Link href={contactPath} data-cta="caption_safe_zone_brief" className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#9f3c27] px-5 text-sm font-semibold text-white hover:bg-[#7f2f21]">
            {text.action}<ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      )}
    </section>
  );
}
