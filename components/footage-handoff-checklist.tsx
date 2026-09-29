"use client";

import { useState } from "react";
import { Copy, Check, Folder, Sparkles, Send } from "lucide-react";
import { site } from "@/lib/site";

type Locale = "en" | "es";

interface FootageHandoffChecklistProps {
  locale?: Locale;
}

export function FootageHandoffChecklist({ locale = "en" }: FootageHandoffChecklistProps) {
  const isEs = locale === "es";

  const checklistItems = isEs
    ? [
        { id: "raw-files", label: "Archivos de Video 4K/HD agrupados por fecha y cámara", detail: "Archivos sin comprimir organizados por día de rodaje." },
        { id: "audio-stems", label: "Pistas de Audio WAV a 24-bit 48kHz de lavalier", detail: "Archivos de sonido independientes sin solapamiento de ruidos." },
        { id: "room-tone", label: "10 segundos de Tono de Sala grabado", detail: "Registro de silencio ambiental para eliminación digital de ruido." },
        { id: "sync-clap", label: "Palmada o Claqueta de Sincronización", detail: "Referencia visual/auditiva para alinear audio externo." },
        { id: "logos", label: "Logotipos en formato vectorial .PNG o .SVG", detail: "Versiones con fondo transparente para superposición en pantalla." },
        { id: "brand-colors", label: "Códigos HEX de colores de marca y tipografías", detail: "Especificaciones para títulos y subtítulos institucionales." },
        { id: "references", label: "Enlaces a videos de referencia o estilo deseado", detail: "Ejemplos de ritmo, transiciones o tono visual." },
        { id: "subtitles", label: "Preferencia de Subtítulos (Inglés, Español o Ambos)", detail: "Especificación de idioma para subtítulos en zonas seguras." },
        { id: "aspect-ratio", label: "Especificación de Plataforma (9:16 / 16:9 / 4:5)", detail: "Destino final del contenido para exportaciones optimizadas." },
        { id: "cloud-folder", label: "Carpeta en la nube con nombres de archivo legibles", detail: "Google Drive, WeTransfer o Frame.io estructurado." },
      ]
    : [
        { id: "raw-files", label: "Raw 4K/HD Video Files Grouped by Date & Angle", detail: "Uncompressed footage organized by shoot date and camera A/B." },
        { id: "audio-stems", label: "Uncompressed 24-bit 48kHz WAV Audio Stems", detail: "Independent lavalier audio tracks recorded clean." },
        { id: "room-tone", label: "10 Seconds of Room Tone Audio Recorded", detail: "Ambient silence recording for digital noise subtraction." },
        { id: "sync-clap", label: "Visual Sync Clap / Slate Recorded on Camera", detail: "Audio/visual reference for aligning external mic tracks." },
        { id: "logos", label: "Transparent .PNG / Vector .SVG Logo Assets", detail: "High-resolution brand logos for lower-third graphics." },
        { id: "brand-colors", label: "Brand Color HEX Codes & Typography Specs", detail: "Exact color and font guidelines for title text overlays." },
        { id: "references", label: "Reference Video Links (Style & Pacing Goals)", detail: "Examples showing desired editing pace and visual mood." },
        { id: "subtitles", label: "Language Preference for Subtitles (EN / ES / Both)", detail: "Target language specification for safe-zone captions." },
        { id: "aspect-ratio", label: "Target Platform Aspect Ratios (9:16 / 16:9)", detail: "Destination platforms for multi-format export presets." },
        { id: "cloud-folder", label: "Cloud Drive Organized with Descriptive Names", detail: "Google Drive, WeTransfer, or Frame.io folder structure." },
      ];

  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [copiedFolder, setCopiedFolder] = useState<boolean>(false);

  const toggleCheck = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checked).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / checklistItems.length) * 100);

  const folderStructureTemplate = `01_RAW_FOOTAGE/
├── Camera_A/
└── Camera_B/
02_AUDIO_STEMS/
├── Dialogue_Lavalier.wav
└── Room_Tone_10s.wav
03_BRAND_ASSETS/
├── Logo_Transparent.png
└── Brand_Guidelines.pdf
04_REFERENCES/
└── Style_Inspiration_Links.txt`;

  const handleCopyFolder = () => {
    navigator.clipboard.writeText(folderStructureTemplate);
    setCopiedFolder(true);
    setTimeout(() => setCopiedFolder(false), 2000);
  };

  // The data-section is what makes this tool's events attributable: without it
  // track.js walks up to no marker and reports cta_position "page", so every
  // click here is counted and indistinguishable from any other on the page.
  return (
    <div data-section="footage_handoff_checklist" className="rounded-2xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#ddd4c8] pb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#c84a2c]">
            <Sparkles className="size-3.5" aria-hidden="true" />
            {isEs ? "Lista de Chequeo de Posproducción" : "Pre-Production Handoff Checklist"}
          </span>
          <h3 className="mt-1 font-serif text-3xl font-semibold text-[#101214]">
            {isEs ? "Lista de Verificación para Entrega de Material Remoto" : "Remote Video Footage Handoff Checklist"}
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs font-semibold text-[#101214]">
              {completedCount} / {checklistItems.length} {isEs ? "Listos" : "Ready"}
            </div>
            <div className="text-[10px] text-[#5a6066]">{progressPercent}% {isEs ? "Completado" : "Complete"}</div>
          </div>
          <div className="h-3 w-24 rounded-full bg-[#ddd4c8]">
            <div
              className="h-full rounded-full bg-[#c84a2c] transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
        {/* CHECKLIST ITEMS */}
        <div className="space-y-2.5">
          {checklistItems.map((item) => {
            const isChecked = !!checked[item.id];
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleCheck(item.id)}
                className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition-all ${
                  isChecked
                    ? "border-emerald-500/50 bg-emerald-500/10"
                    : "border-[#ddd4c8] bg-[#f6f1ea] hover:border-[#a93e29]"
                }`}
              >
                <div
                  className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border ${
                    isChecked ? "border-emerald-600 bg-emerald-600 text-white" : "border-[#ddd4c8] bg-white text-transparent"
                  }`}
                >
                  <Check className="size-3.5 stroke-[3]" />
                </div>
                <div>
                  <div className={`text-xs font-semibold ${isChecked ? "text-emerald-900 line-through" : "text-[#101214]"}`}>
                    {item.label}
                  </div>
                  <div className="mt-0.5 text-[11px] text-[#5a6066]">{item.detail}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* FOLDER TEMPLATE & HANDOFF INSTRUCTIONS */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#ddd4c8] bg-[#101214] p-6 text-[#f6f1ea]">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#e85d3e]">
                <Folder className="size-4" aria-hidden="true" />
                {isEs ? "Estructura de Carpeta Sugerida" : "Suggested Folder Structure"}
              </span>
              <button
                type="button"
                onClick={handleCopyFolder}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white hover:bg-white/20"
              >
                {copiedFolder ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                {copiedFolder ? (isEs ? "¡Copiado!" : "Copied!") : isEs ? "Copiar Estructura" : "Copy Tree"}
              </button>
            </div>

            <pre className="mt-4 rounded-xl bg-black/40 p-4 font-mono text-[11px] leading-relaxed text-emerald-300">
              {folderStructureTemplate}
            </pre>
          </div>

          <div className="mt-6 border-t border-white/10 pt-4">
            <h4 className="text-xs font-semibold text-white">
              {isEs ? "¿Listo para enviar tus archivos a edición?" : "Ready to hand off footage to your editor?"}
            </h4>
            <p className="mt-1 text-[11px] leading-relaxed text-[#d8d0c7]">
              {isEs
                ? "Comparte el enlace de tu carpeta de Google Drive o WeTransfer Pro con Esteban Moreno."
                : "Share your Google Drive or WeTransfer Pro folder link with Esteban Moreno."}
            </p>

            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent(isEs ? "Entrega de Material de Video para Edición" : "Video Footage Handoff for Editing")}`}
              className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-full bg-[#c84a2c] text-xs font-semibold text-white hover:bg-[#a93e29]"
            >
              <Send className="size-3.5" aria-hidden="true" />
              {isEs ? "Enviar Enlace de Carpeta por Email" : "Send Folder Link via Email"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
