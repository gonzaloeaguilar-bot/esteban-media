"use client";

import { CheckCircle2 } from "lucide-react";

type Locale = "en" | "es";

const copy = {
  en: {
    eyebrow: "Typography presets",
    title: "Font recommendations for Instagram Reels captions",
    intro:
      "Skip the guesswork. Use these proven presets in CapCut, Premiere Pro, Canva, or your editor of choice.",
    headers: {
      preset: "Preset",
      font: "Font suggestion",
      weightSize: "Weight / Size (mobile)",
      treatment: "Contrast treatment",
      useCase: "When to use",
    },
    presets: [
      {
        preset: "Clean read",
        font: "Plus Jakarta Sans / Inter",
        weightSize: "700 / 28–34px",
        treatment: "Subtle drop shadow or none on plain bg",
        useCase: "Talking head, voiceover, interviews",
      },
      {
        preset: "High contrast card",
        font: "Plus Jakarta Sans / Satoshi",
        weightSize: "800 / 30–36px",
        treatment: "Semi-transparent black card behind text",
        useCase: "Busy backgrounds, food shots, bright daylight",
      },
      {
        preset: "Emphasis only",
        font: "Plus Jakarta Sans / Inter",
        weightSize: "800 / 24–28px",
        treatment: "Text stroke (1–2px) or tight shadow",
        useCase: "Short key words over motion, product reveals",
      },
    ],
  },
  es: {
    eyebrow: "Presets tipográficos",
    title: "Fuentes recomendadas para subtítulos de Reels",
    intro:
      "Usa estos presets directamente en CapCut, Premiere Pro, Canva o tu editor.",
    headers: {
      preset: "Preset",
      font: "Fuente sugerida",
      weightSize: "Peso / Tamaño (móvil)",
      treatment: "Tratamiento de contraste",
      useCase: "Cuándo usarlo",
    },
    presets: [
      {
        preset: "Lectura limpia",
        font: "Plus Jakarta Sans / Inter",
        weightSize: "700 / 28–34px",
        treatment: "Sombra sutil o ninguna sobre fondo neutro",
        useCase: "Video hablado, voz en off, entrevistas",
      },
      {
        preset: "Tarjeta de alto contraste",
        font: "Plus Jakarta Sans / Satoshi",
        weightSize: "800 / 30–36px",
        treatment: "Tarjeta negra semitransparente detrás del texto",
        useCase: "Fondos complejos, comida, luz fuerte",
      },
      {
        preset: "Solo énfasis",
        font: "Plus Jakarta Sans / Inter",
        weightSize: "800 / 24–28px",
        treatment: "Contorno (1–2px) o sombra compacta",
        useCase: "Palabras clave sobre movimiento, productos",
      },
    ],
  },
} as const;

export function CaptionTypographyPresets({ locale = "en" }: { locale?: Locale }) {
  const text = copy[locale];

  return (
    <section
      data-section="caption_typography_presets"
      className="rounded-2xl border border-[#d6ccc0] bg-[#fbf6ef] p-6 shadow-sm sm:p-8"
      aria-labelledby="caption-typography-title"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9f3c27]">
        {text.eyebrow}
      </p>
      <h2
        id="caption-typography-title"
        className="mt-2 max-w-2xl font-serif text-3xl leading-tight text-[#101214] sm:text-4xl"
      >
        {text.title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[#3f4548]">{text.intro}</p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[680px] border-separate border-spacing-0 overflow-hidden rounded-xl border border-[#ddd4c8] bg-white text-sm">
          <thead>
            <tr className="bg-[#f7f3ee] text-left">
              <th className="border-b border-[#ddd4c8] px-4 py-3 font-semibold text-[#101214]">
                {text.headers.preset}
              </th>
              <th className="border-b border-[#ddd4c8] px-4 py-3 font-semibold text-[#101214]">
                {text.headers.font}
              </th>
              <th className="border-b border-[#ddd4c8] px-4 py-3 font-semibold text-[#101214]">
                {text.headers.weightSize}
              </th>
              <th className="border-b border-[#ddd4c8] px-4 py-3 font-semibold text-[#101214]">
                {text.headers.treatment}
              </th>
              <th className="border-b border-[#ddd4c8] px-4 py-3 font-semibold text-[#101214]">
                {text.headers.useCase}
              </th>
            </tr>
          </thead>
          <tbody>
            {text.presets.map((preset, idx) => (
              <tr key={preset.preset} className={idx % 2 === 0 ? "bg-white" : "bg-[#fbf9f6]"}>
                <td className="border-b border-[#eee4d9] px-4 py-3 font-medium text-[#101214]">
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-[#1a7f82]" aria-hidden="true" />
                    {preset.preset}
                  </span>
                </td>
                <td className="border-b border-[#eee4d9] px-4 py-3 text-[#252a2d]">
                  {preset.font}
                </td>
                <td className="border-b border-[#eee4d9] px-4 py-3 text-[#252a2d]">
                  {preset.weightSize}
                </td>
                <td className="border-b border-[#eee4d9] px-4 py-3 text-[#3f4548]">
                  {preset.treatment}
                </td>
                <td className="border-b border-[#eee4d9] px-4 py-3 text-[#3f4548]">
                  {preset.useCase}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
