"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

type Locale = "en" | "es";

const copy = {
  en: {
    eyebrow: "Caption self-check",
    title: "Will your Reel captions stay readable?",
    intro: "Answer the three prompts. You will get a clear caption-placement recommendation before you publish.",
    questions: [
      { label: "Where will most viewers see the video?", choices: ["Instagram Reels or TikTok", "More than one platform"] },
      { label: "What sits behind the lower third?", choices: ["A face, product, or important detail", "Mostly open background"] },
      { label: "Do captions have a written place to live?", choices: ["Yes — away from controls and key visuals", "Not yet / I am not sure"] },
    ],
    resultEyebrow: "Your caption decision",
    readyTitle: "Your starting setup is readable.",
    readyBody: "Keep captions in the central safe area, preview the finished cut on a phone, and avoid letting motion compete with the words.",
    adjustTitle: "Set the caption lane before you style it.",
    adjustBody: "Reserve a central band for the words before choosing fonts or animation. That keeps captions clear of controls and the important part of the video.",
    subjectNote: "Because the lower third has an important subject, move captions above it or simplify the shot.",
    planNote: "Mark the caption area in the edit before adding text so it stays consistent from shot to shot.",
    multiPlatformNote: "Make one conservative master version: each platform can crop or cover a different part of the frame.",
    reset: "Start over",
  },
  es: {
    eyebrow: "Revisión rápida de subtítulos",
    title: "¿Tus subtítulos seguirán siendo legibles en un Reel?",
    intro: "Responde las tres preguntas. Recibirás una recomendación clara para ubicar los subtítulos antes de publicar.",
    questions: [
      { label: "¿Dónde verá el video la mayoría de tu audiencia?", choices: ["Instagram Reels o TikTok", "En más de una plataforma"] },
      { label: "¿Qué aparece detrás del tercio inferior?", choices: ["Una cara, producto o detalle importante", "Mayormente fondo libre"] },
      { label: "¿Los subtítulos ya tienen un lugar definido?", choices: ["Sí — lejos de controles y elementos importantes", "Todavía no / no estoy seguro"] },
    ],
    resultEyebrow: "Tu decisión de subtítulos",
    readyTitle: "Tu punto de partida se ve legible.",
    readyBody: "Mantén los subtítulos en la zona segura central, revisa el corte final en un celular y evita que el movimiento compita con las palabras.",
    adjustTitle: "Define el espacio del texto antes de elegir el estilo.",
    adjustBody: "Reserva una franja central para las palabras antes de elegir tipografía o animación. Así los subtítulos no tapan controles ni la parte importante del video.",
    subjectNote: "Como el tercio inferior tiene un elemento importante, mueve los subtítulos arriba o simplifica la toma.",
    planNote: "Marca el espacio de subtítulos en la edición antes de añadir texto para mantenerlo igual entre tomas.",
    multiPlatformNote: "Haz una versión maestra conservadora: cada plataforma puede recortar o tapar una zona distinta del cuadro.",
    reset: "Empezar de nuevo",
  },
} as const;

export function CaptionSafeZoneDiagnostic({ locale = "en" }: { locale?: Locale }) {
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null]);
  const text = copy[locale];
  const complete = answers.every((answer) => answer !== null);
  const needsAdjustment = answers[1] === 0 || answers[2] === 1;

  return <section data-section="caption_safe_zone_diagnostic" className="rounded-2xl border border-[#d6ccc0] bg-[#fbf6ef] p-6 shadow-sm sm:p-8" aria-labelledby="caption-safe-zone-title">
    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9f3c27]">{text.eyebrow}</p>
    <h2 id="caption-safe-zone-title" className="mt-2 max-w-2xl font-serif text-3xl leading-tight text-[#101214] sm:text-4xl">{text.title}</h2>
    <p className="mt-3 max-w-2xl text-sm leading-6 text-[#3f4548]">{text.intro}</p>
    <div className="mt-6 space-y-5">
      {text.questions.map((question, questionIndex) => <fieldset key={question.label} className="border-t border-[#ddd4c8] pt-4 first:border-t-0 first:pt-0">
        <legend className="text-sm font-semibold text-[#101214]">{questionIndex + 1}. {question.label}</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {question.choices.map((choice, choiceIndex) => {
            const selected = answers[questionIndex] === choiceIndex;
            return <button key={choice} type="button" aria-pressed={selected} onClick={() => setAnswers((current) => current.map((answer, index) => index === questionIndex ? choiceIndex : answer))} className={`min-h-12 rounded-xl border px-4 py-3 text-left text-sm transition ${selected ? "border-[#9f3c27] bg-[#f1d8ce] text-[#5e2419]" : "border-[#d6ccc0] bg-white text-[#252a2d] hover:border-[#9f3c27]"}`}>
              {selected && <CheckCircle2 className="mr-2 inline size-4" aria-hidden="true" />}{choice}
            </button>;
          })}
        </div>
      </fieldset>)}
    </div>
    {complete && <div className="mt-6 border-t border-[#d6ccc0] pt-5" aria-live="polite" data-section="caption_safe_zone_result">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9f3c27]">{text.resultEyebrow}</p>
      <h3 className="mt-2 font-serif text-3xl leading-tight text-[#101214]">{needsAdjustment ? text.adjustTitle : text.readyTitle}</h3>
      <p className="mt-3 max-w-2xl text-base leading-7 text-[#3f4548]">{needsAdjustment ? text.adjustBody : text.readyBody}</p>
      <ul className="mt-4 space-y-2 border-l-2 border-[#9f3c27] pl-4 text-sm leading-6 text-[#252a2d]">
        {answers[1] === 0 ? <li>{text.subjectNote}</li> : null}
        {answers[2] === 1 ? <li>{text.planNote}</li> : null}
        {answers[0] === 1 ? <li>{text.multiPlatformNote}</li> : null}
      </ul>
      <button type="button" onClick={() => setAnswers([null, null, null])} className="mt-5 min-h-11 rounded-full border border-[#9f3c27] px-5 text-sm font-semibold text-[#9f3c27] hover:bg-[#f1d8ce]">{text.reset}</button>
    </div>}
  </section>;
}
