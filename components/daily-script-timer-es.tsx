"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Copy, Mail, RefreshCw, RotateCcw, Timer } from "lucide-react";
import { trackLeadSubmit } from "@/lib/analytics-events";

type FormatPreset = {
  id: string;
  name: string;
  seconds: number;
  description: string;
};

const FORMATS: FormatPreset[] = [
  { id: "15s", name: "15s Historia / Gancho", seconds: 15, description: "Gancho rápido o Instagram Story" },
  { id: "30s", name: "30s Reel / TikTok", seconds: 30, description: "Video corto estándar para redes" },
  { id: "60s", name: "60s Short / Video", seconds: 60, description: "Explicación detallada de valor" },
  { id: "90s", name: "90s Demostración", seconds: 90, description: "Paso a paso o caso de uso" },
];

type SpeedPreset = {
  wpm: number;
  label: string;
};

const SPEEDS: SpeedPreset[] = [
  { wpm: 130, label: "Conversacional (130 PPM)" },
  { wpm: 150, label: "Natural (150 PPM)" },
  { wpm: 170, label: "Dinámico (170 PPM)" },
];

const TEMPLATES = [
  {
    title: "Problema y solución en 10 segundos",
    formatId: "30s",
    text: "Gancho: Si tu [negocio o tema] enfrenta [problema común], aquí tienes el ajuste clave en 10 segundos.\n\nPaso 1: En lugar de [error habitual], realiza [acción directa].\nPaso 2: Verifica que tu [detalle de apoyo] esté listo antes de grabar.\n\nSiguiente paso: Guarda esta estructura para tu próxima grabación.",
  },
  {
    title: "Proceso detrás de cámara",
    formatId: "15s",
    text: "Gancho: Así se organiza [proceso o preparación] antes de la edición final.\n\nIdea central: Tres pasos rápidos desde el material en bruto hasta el formato vertical 9:16.\n\nSiguiente paso: Consulta más guías diarias de producción.",
  },
  {
    title: "Mito vs Realidad en la industria",
    formatId: "30s",
    text: "Gancho: No necesitas equipos costosos para comunicar con claridad sobre [tema].\n\nPunto 1: Un audio limpio y buena luz natural importan más que la resolución del lente.\nPunto 2: Un gancho en los primeros 3 segundos retiene la atención del usuario.\n\nSiguiente paso: Deja tus dudas en los comentarios.",
  },
  {
    title: "Lista de 3 verificaciones prácticas",
    formatId: "60s",
    text: "Gancho: 3 detalles que debes revisar antes de grabar tu próximo video vertical.\n\nPaso 1: Revisa el ángulo de iluminación para evitar sombras duras en el rostro.\nPaso 2: Mantén el micrófono a corta distancia para asegurar claridad de voz.\nPaso 3: Conserva textos y subtítulos dentro de la zona segura 9:16.\n\nSiguiente paso: Guarda esta lista para tu próximo rodaje.",
  },
  {
    title: "Comparación antes y después",
    formatId: "30s",
    text: "Gancho: Mira la diferencia entre un archivo crudo y una versión editada en vertical.\n\nPunto 1: El ritmo ágil elimina pausas y palabras de relleno.\nPunto 2: Los subtítulos dinámicos facilitan la comprensión sin audio activado.\n\nSiguiente paso: Usa esta referencia en tu siguiente corte.",
  },
  {
    title: "Ajuste de ritmo para el segundo 1",
    formatId: "30s",
    text: "Gancho: La principal razón de abandono en videos cortos es un inicio lento.\n\nPunto 1: Empieza directo con la acción o la pregunta principal del cliente.\nPunto 2: Añade texto visible en pantalla en los primeros dos segundos.\n\nSiguiente paso: Prueba este cambio en tu próximo clip.",
  },
  {
    title: "Respuesta directa a pregunta frecuente",
    formatId: "60s",
    text: "Gancho: Nos hacen esta pregunta todas las semanas: ¿[pregunta habitual]?\n\nExplicación: Aquí tienes la respuesta directa en menos de 45 segundos.\nDetalle clave: Concéntrate en [punto central] sin rodeos introductorios.\n\nSiguiente paso: Comparte qué otra duda quieres resolver.",
  },
];

const TASKS = [
  "Leer el guion en voz alta según el tiempo objetivo (15s / 30s / 60s).",
  "Confirmar que el gancho o tema principal aparezca en los primeros 3 segundos.",
  "Verificar que textos y elementos clave estén dentro de la zona segura 9:16.",
];

type DailyState = {
  date: string;
  completed: boolean[];
  streak: number;
};

const storageKey = "esteban-media-daily-script-timer-es";

function localDateKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function templateForTodayIndex() {
  const dayNumber = Math.floor(new Date().setHours(0, 0, 0, 0) / 86_400_000);
  return dayNumber % TEMPLATES.length;
}

export function DailyScriptTimerEs() {
  const [state, setState] = useState<DailyState>({ date: "", completed: [], streak: 0 });
  const [isReady, setIsReady] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<FormatPreset>(FORMATS[1]); // 30s default
  const [wpm, setWpm] = useState<number>(150);
  const [script, setScript] = useState<string>(TEMPLATES[0].text);
  const [templateIndex, setTemplateIndex] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [captureStatus, setCaptureStatus] = useState<"idle" | "sending" | "saved" | "error">("idle");

  const today = useMemo(localDateKey, []);

  useEffect(() => {
    const idx = templateForTodayIndex();
    setTemplateIndex(idx);
    setScript(TEMPLATES[idx].text);
    const targetPreset = FORMATS.find((f) => f.id === TEMPLATES[idx].formatId);
    if (targetPreset) setSelectedFormat(targetPreset);
  }, []);

  const currentTemplate = TEMPLATES[templateIndex % TEMPLATES.length];

  // Statistics calculation
  const wordCount = useMemo(() => {
    const trimmed = script.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).filter(Boolean).length;
  }, [script]);

  const estimatedSeconds = useMemo(() => {
    if (wordCount === 0) return 0;
    return Math.round((wordCount / wpm) * 60);
  }, [wordCount, wpm]);

  const maxRecommendedWords = Math.round((selectedFormat.seconds / 60) * wpm);
  const diffSeconds = estimatedSeconds - selectedFormat.seconds;

  const completedCount = state.completed.filter(Boolean).length;
  const isComplete = completedCount === TASKS.length;

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) {
      setState({ date: today, completed: Array(TASKS.length).fill(false), streak: 0 });
      setIsReady(true);
      return;
    }

    try {
      const parsed = JSON.parse(saved) as DailyState;
      setState(
        parsed.date === today
          ? { ...parsed, completed: parsed.completed.slice(0, TASKS.length) }
          : { date: today, completed: Array(TASKS.length).fill(false), streak: parsed.streak },
      );
    } catch {
      setState({ date: today, completed: Array(TASKS.length).fill(false), streak: 0 });
    }
    setIsReady(true);
  }, [today]);

  useEffect(() => {
    if (!isReady) return;
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  }, [isReady, state]);

  function toggleTask(index: number) {
    setState((current) => {
      const completed = current.completed.map((value, taskIndex) =>
        taskIndex === index ? !value : value,
      );
      const wasComplete = current.completed.every(Boolean);
      const nowComplete = completed.every(Boolean);
      return {
        ...current,
        completed,
        streak:
          nowComplete && !wasComplete
            ? current.streak + 1
            : nowComplete
              ? current.streak
              : Math.max(0, current.streak - 1),
      };
    });
  }

  function resetToday() {
    setState((current) => ({ ...current, completed: Array(TASKS.length).fill(false) }));
  }

  function nextTemplate() {
    const nextIdx = (templateIndex + 1) % TEMPLATES.length;
    setTemplateIndex(nextIdx);
    setScript(TEMPLATES[nextIdx].text);
    const targetPreset = FORMATS.find((f) => f.id === TEMPLATES[nextIdx].formatId);
    if (targetPreset) setSelectedFormat(targetPreset);
  }

  async function copyScript() {
    try {
      await navigator.clipboard.writeText(script);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback if clipboard API unavailable
    }
  }

  async function captureEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCaptureStatus("sending");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "daily-script-timer",
          locale: "es",
          email,
          notes: `Captura desde Temporizador de Guiones. Formato: ${selectedFormat.seconds}s, PPM: ${wpm}, Palabras: ${wordCount}`,
        }),
      });
      if (response.ok) {
        setCaptureStatus("saved");
        trackLeadSubmit("daily-script-timer", "es");
      } else {
        setCaptureStatus("error");
      }
    } catch {
      setCaptureStatus("error");
    }
  }

  function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, "0")}`;
  }

  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-[#ddd4c8] bg-[#fbf6ef] p-4 shadow-sm sm:p-7">
      {/* Encabezado */}
      <div className="flex flex-col gap-4 border-b border-[#ddd4c8] pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9f3c27]">
            Herramienta diaria de video
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-[#101214] sm:text-4xl">
            Temporizador y calculadora de ritmo de guiones
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#5a6066]">
            Calcula el presupuesto de palabras, comprueba el ritmo de habla para formatos de 15s/30s/60s y completa tus verificaciones de ensayo.
          </p>
        </div>
        <div className="shrink-0 rounded-xl bg-[#101214] px-4 py-3 text-center text-[#f6f1ea]">
          <div className="text-2xl font-semibold">{state.streak}</div>
          <div className="text-[11px] uppercase tracking-wide text-[#d8d0c7]">Días de racha</div>
        </div>
      </div>

      {/* Controles de formato y ritmo */}
      <section aria-labelledby="timing-controls" className="mt-6 space-y-4">
        <h2 id="timing-controls" className="text-sm font-semibold text-[#101214]">
          1. Selecciona el formato objetivo y la velocidad de habla
        </h2>
        
        {/* Selector de formato */}
        <div>
          <span className="text-xs font-medium text-[#5a6066]">Formato de video objetivo</span>
          <div className="mt-1.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {FORMATS.map((format) => {
              const active = selectedFormat.id === format.id;
              return (
                <button
                  key={format.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedFormat(format)}
                  className={`min-h-11 rounded-xl border px-3 py-2 text-left text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c84a2c] ${
                    active
                      ? "border-[#c84a2c] bg-[#101214] text-[#f6f1ea]"
                      : "border-[#ddd4c8] bg-[#f6f1ea] text-[#252a2d] hover:border-[#c84a2c]"
                  }`}
                >
                  <div className="font-semibold">{format.name}</div>
                  <div className={`mt-0.5 text-[11px] ${active ? "text-[#d8d0c7]" : "text-[#5a6066]"}`}>
                    {format.description}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selector de velocidad */}
        <div>
          <span className="text-xs font-medium text-[#5a6066]">
            Velocidad de habla (Palabras por minuto)
          </span>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {SPEEDS.map((speed) => {
              const active = wpm === speed.wpm;
              return (
                <button
                  key={speed.wpm}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setWpm(speed.wpm)}
                  className={`min-h-11 rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c84a2c] ${
                    active
                      ? "border-[#9f3c27] bg-[#fff4ee] font-semibold text-[#9f3c27]"
                      : "border-[#ddd4c8] bg-white text-[#252a2d] hover:border-[#9f3c27]"
                  }`}
                >
                  {speed.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Editor de guion y estadísticas */}
      <section aria-labelledby="script-editor" className="mt-6">
        <div className="flex items-center justify-between gap-3">
          <h2 id="script-editor" className="text-sm font-semibold text-[#101214]">
            2. Escribe o pega el guion de video
          </h2>
          <button
            type="button"
            onClick={nextTemplate}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-[#e6c7bb] bg-white px-3 py-1 text-xs font-medium text-[#9f3c27] hover:bg-[#fff4ee] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c84a2c]"
          >
            <RefreshCw className="size-3.5" aria-hidden="true" />
            Cargar estructura ({currentTemplate.title})
          </button>
        </div>

        <div className="mt-2">
          <label htmlFor="video-script-input-es" className="sr-only">
            Contenido del guion de video
          </label>
          <textarea
            id="video-script-input-es"
            rows={7}
            value={script}
            onChange={(e) => setScript(e.target.value)}
            placeholder="Escribe o pega tu guion en video corto aquí..."
            className="w-full rounded-xl border border-[#ddd4c8] bg-white p-3.5 text-sm leading-6 text-[#101214] placeholder:text-[#5a6066] focus:border-[#c84a2c] focus:outline-none"
          />
        </div>

        {/* Barra de cálculos en vivo */}
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <div className="rounded-xl border border-[#ddd4c8] bg-[#f6f1ea] p-3 text-center">
            <div className="text-xs text-[#5a6066]">Total palabras</div>
            <div className="mt-1 text-xl font-semibold text-[#101214]">{wordCount}</div>
            <div className="text-[11px] text-[#5a6066]">Límite: ~{maxRecommendedWords} palabras</div>
          </div>

          <div className="rounded-xl border border-[#ddd4c8] bg-[#f6f1ea] p-3 text-center">
            <div className="text-xs text-[#5a6066]">Tiempo estimado</div>
            <div className="mt-1 text-xl font-semibold text-[#101214]">
              {formatTime(estimatedSeconds)}
            </div>
            <div className="text-[11px] text-[#5a6066]">{estimatedSeconds}s calculados</div>
          </div>

          <div className="rounded-xl border border-[#ddd4c8] bg-[#f6f1ea] p-3 text-center">
            <div className="text-xs text-[#5a6066]">Límite objetivo</div>
            <div className="mt-1 text-xl font-semibold text-[#101214]">{selectedFormat.seconds}s</div>
            <div className="text-[11px] text-[#5a6066]">{selectedFormat.name}</div>
          </div>

          <div className="rounded-xl border border-[#ddd4c8] bg-[#f6f1ea] p-3 text-center">
            <div className="text-xs text-[#5a6066]">Estado de ritmo</div>
            <div className="mt-1 flex items-center justify-center gap-1">
              <Timer className="size-4 text-[#9f3c27]" aria-hidden="true" />
              <span
                className={`text-sm font-semibold ${
                  diffSeconds > 0
                    ? "text-red-700"
                    : diffSeconds >= -3
                      ? "text-amber-700"
                      : "text-emerald-700"
                }`}
              >
                {diffSeconds > 0 ? `+${diffSeconds}s exceso` : diffSeconds === 0 ? "Tiempo exacto" : `${Math.abs(diffSeconds)}s margen`}
              </span>
            </div>
            <div className="text-[11px] text-[#5a6066]">
              {diffSeconds > 0 ? "Recortar palabras" : "Ritmo dentro del tiempo"}
            </div>
          </div>
        </div>

        {/* Botón de copiar */}
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={copyScript}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-[#ddd4c8] bg-white px-4 py-2 text-xs font-medium text-[#252a2d] hover:bg-[#f6f1ea] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c84a2c]"
          >
            {copied ? (
              <>
                <Check className="size-4 text-emerald-600" aria-hidden="true" /> ¡Guion copiado!
              </>
            ) : (
              <>
                <Copy className="size-4 text-[#5a6066]" aria-hidden="true" /> Copiar guion
              </>
            )}
          </button>
        </div>
      </section>

      {/* Lista de 3 verificaciones diarias */}
      <section aria-labelledby="daily-rehearsal-checks-es" className="mt-6 border-t border-[#ddd4c8] pt-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 id="daily-rehearsal-checks-es" className="text-sm font-semibold text-[#101214]">
              3. Verificaciones de ensayo y zonas seguras de hoy
            </h2>
            <p className="mt-0.5 text-xs text-[#5a6066]">
              Completa las 3 verificaciones para mantener tu racha diaria de producción.
            </p>
          </div>
          <span className="text-xs font-medium text-[#5a6066]">
            {completedCount} de {TASKS.length}
          </span>
        </div>

        <div className="mt-3 space-y-2">
          {TASKS.map((task, index) => {
            const checked = Boolean(state.completed[index]);
            return (
              <button
                key={task}
                type="button"
                aria-pressed={checked}
                onClick={() => toggleTask(index)}
                className={`flex min-h-14 w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c84a2c] ${
                  checked
                    ? "border-emerald-600/50 bg-emerald-50 text-emerald-950"
                    : "border-[#ddd4c8] bg-[#f6f1ea] text-[#252a2d] hover:border-[#c84a2c]"
                }`}
              >
                <span
                  className={`grid size-5 shrink-0 place-items-center rounded border ${
                    checked
                      ? "border-emerald-700 bg-emerald-700 text-white"
                      : "border-[#b9aa9a] bg-white text-transparent"
                  }`}
                >
                  <Check className="size-3.5 stroke-[3]" aria-hidden="true" />
                </span>
                {task}
              </button>
            );
          })}
        </div>

        {isComplete ? (
          <p className="mt-3 text-sm text-emerald-800">
            La verificación de ritmo y ensayo de hoy está guardada en este dispositivo.
          </p>
        ) : null}

        <button
          type="button"
          onClick={resetToday}
          className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-[#5a6066] hover:bg-[#ece5da] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c84a2c]"
        >
          <RotateCcw className="size-4" aria-hidden="true" /> Reiniciar hoy
        </button>
      </section>

      {/* Captura de correo ligero */}
      <section aria-labelledby="daily-script-email-es" className="mt-6 rounded-xl bg-[#101214] p-4 text-[#f6f1ea] sm:p-5">
        <div className="flex gap-3">
          <Mail className="mt-0.5 size-5 shrink-0 text-[#f0b384]" aria-hidden="true" />
          <div>
            <h2 id="daily-script-email-es" className="text-sm font-semibold">
              Actualizaciones semanales de guiones y formatos
            </h2>
            <p className="mt-1 text-xs leading-5 text-[#d8d0c7]">
              Guarda tu correo para recibir actualizaciones semanales de ritmo de guiones y formatos de video corto. El progreso se guarda en este dispositivo.
            </p>
          </div>
        </div>

        {captureStatus === "saved" ? (
          <p className="mt-4 text-sm text-emerald-300">Correo guardado.</p>
        ) : (
          <form onSubmit={captureEmail} className="mt-4 flex flex-col gap-2 sm:flex-row">
            <label className="sr-only" htmlFor="daily-script-timer-email-es">
              Dirección de correo electrónico
            </label>
            <input
              id="daily-script-timer-email-es"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Dirección de correo"
              className="min-h-11 min-w-0 flex-1 rounded-lg border border-white/20 bg-white/10 px-3 text-sm text-white placeholder:text-white/50 focus:border-[#f0b384] focus:outline-none"
            />
            <button
              type="submit"
              disabled={captureStatus === "sending"}
              className="min-h-11 rounded-full bg-[#c84a2c] px-5 text-sm font-semibold text-white hover:bg-[#a93e29] disabled:cursor-wait disabled:opacity-70"
            >
              {captureStatus === "sending" ? "Guardando…" : "Guardar correo"}
            </button>
          </form>
        )}

        {captureStatus === "error" ? (
          <p className="mt-3 text-xs text-[#ffb49e]">
            No se pudo guardar el correo. Tu temporizador y verificaciones siguen funcionando en este dispositivo.
          </p>
        ) : null}
      </section>
    </div>
  );
}
