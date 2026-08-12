"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Mail, RefreshCw, RotateCcw } from "lucide-react";

const hooksEs = [
  {
    title: "El error de los primeros 3 segundos",
    framework: "El error principal al grabar [tema] es comenzar con una introducción lenta. Así se corrige en 3 segundos.",
    focus: "Toma de apertura visual",
  },
  {
    title: "Antes de grabar",
    framework: "Antes de grabar tu próximo video sobre [tema], revisa estos 2 detalles sencillos de iluminación y audio.",
    focus: "Verificación previa",
  },
  {
    title: "Idea equivocada común",
    framework: "La mayoría piensa que [tema] requiere equipos costosos. Esto es lo que realmente retiene la atención del espectador.",
    focus: "Claridad y encuadre",
  },
  {
    title: "3 pasos rápidos",
    framework: "3 pasos rápidos para convertir material crudo de [tema] en un video corto y estructurado.",
    focus: "Estructura de contenido",
  },
  {
    title: "Gancho de contraste visual",
    framework: "Muestra primero el resultado final y luego revela el proceso detrás de [tema].",
    focus: "Ritmo y gancho",
  },
  {
    title: "Fuga del segundo 5",
    framework: "Si tus videos pierden espectadores en el segundo 5, añade texto en pantalla exactamente aquí.",
    focus: "Retención de audiencia",
  },
  {
    title: "Estructura de 30 segundos",
    framework: "Cómo estructurar un video de 30 segundos sobre [tema]: 3s gancho, 20s mensaje principal, 7s llamado final.",
    focus: "Planificación de formato",
  },
];

const tasksEs = [
  "Seleccionar el gancho y encuadre inicial de hoy.",
  "Estructurar el mensaje principal en menos de 15 segundos.",
  "Verificar subtítulos, texto en pantalla y encuadre final.",
];

type DailyState = {
  date: string;
  completed: boolean[];
  streak: number;
};

const storageKeyEs = "esteban-media-daily-hook-planner-es";

function localDateKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function hookForTodayIndex() {
  const dayNumber = Math.floor(new Date().setHours(0, 0, 0, 0) / 86_400_000);
  return dayNumber % hooksEs.length;
}

export function DailyHookPlannerEs() {
  const [state, setState] = useState<DailyState>({ date: "", completed: [], streak: 0 });
  const [isReady, setIsReady] = useState(false);
  const [hookIndex, setHookIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [captureStatus, setCaptureStatus] = useState<"idle" | "sending" | "saved" | "error">("idle");
  const today = useMemo(localDateKey, []);

  useEffect(() => {
    setHookIndex(hookForTodayIndex());
  }, []);

  const currentHook = hooksEs[hookIndex % hooksEs.length];
  const completedCount = state.completed.filter(Boolean).length;
  const isComplete = completedCount === tasksEs.length;

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKeyEs);
    if (!saved) {
      setState({ date: today, completed: Array(tasksEs.length).fill(false), streak: 0 });
      setIsReady(true);
      return;
    }

    try {
      const parsed = JSON.parse(saved) as DailyState;
      setState(
        parsed.date === today
          ? { ...parsed, completed: parsed.completed.slice(0, tasksEs.length) }
          : { date: today, completed: Array(tasksEs.length).fill(false), streak: parsed.streak },
      );
    } catch {
      setState({ date: today, completed: Array(tasksEs.length).fill(false), streak: 0 });
    }
    setIsReady(true);
  }, [today]);

  useEffect(() => {
    if (!isReady) return;
    window.localStorage.setItem(storageKeyEs, JSON.stringify(state));
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
    setState((current) => ({ ...current, completed: Array(tasksEs.length).fill(false) }));
  }

  function nextRandomHook() {
    setHookIndex((prev) => (prev + 1) % hooksEs.length);
  }

  async function captureEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCaptureStatus("sending");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "daily-hook-planner",
          locale: "es",
          email,
          notes: `Daily Hook Planner ES capture. Selected hook: ${currentHook.title}`,
        }),
      });
      setCaptureStatus(response.ok ? "saved" : "error");
    } catch {
      setCaptureStatus("error");
    }
  }

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-[#ddd4c8] bg-[#fbf6ef] p-4 shadow-sm sm:p-7">
      <div className="flex flex-col gap-4 border-b border-[#ddd4c8] pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9f3c27]">
            Planificador de ganchos de video
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-[#101214] sm:text-4xl">
            Paso diario de ganchos y planificación
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#5a6066]">
            Selecciona un gancho de estructura, completa las tres verificaciones y mantén la racha diaria de planificación.
          </p>
        </div>
        <div className="shrink-0 rounded-xl bg-[#101214] px-4 py-3 text-center text-[#f6f1ea]">
          <div className="text-2xl font-semibold">{state.streak}</div>
          <div className="text-[11px] uppercase tracking-wide text-[#d8d0c7]">Días de racha</div>
        </div>
      </div>

      <section aria-labelledby="today-hook-es" className="mt-6 rounded-xl border border-[#e6c7bb] bg-[#fff4ee] p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9f3c27]">
            Gancho sugerido • {currentHook.focus}
          </p>

          <button
            type="button"
            onClick={nextRandomHook}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-[#e6c7bb] bg-white px-3 py-1 text-xs font-medium text-[#9f3c27] hover:bg-[#fff4ee] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c84a2c]"
          >
            <RefreshCw className="size-3.5" aria-hidden="true" /> Siguiente gancho
          </button>
        </div>
        <h2 id="today-hook-es" className="mt-2 text-lg font-semibold text-[#101214]">
          {currentHook.title}
        </h2>
        <p className="mt-2 text-sm italic leading-6 text-[#252a2d]">
          &ldquo;{currentHook.framework}&rdquo;
        </p>
      </section>

      <section aria-labelledby="daily-checklist-es" className="mt-6">
        <div className="flex items-center justify-between gap-3">
          <h2 id="daily-checklist-es" className="text-sm font-semibold text-[#101214]">
            Verificaciones de hoy
          </h2>
          <span className="text-xs text-[#5a6066]">
            {completedCount} de {tasksEs.length}
          </span>
        </div>
        <div className="mt-3 space-y-2">
          {tasksEs.map((task, index) => {
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
          <p className="mt-3 text-sm text-emerald-800">El paso de hoy se ha guardado en este dispositivo.</p>
        ) : null}
        <button
          type="button"
          onClick={resetToday}
          className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-[#5a6066] hover:bg-[#ece5da] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c84a2c]"
        >
          <RotateCcw className="size-4" aria-hidden="true" /> Reiniciar hoy
        </button>
      </section>

      <section aria-labelledby="daily-email-es" className="mt-6 rounded-xl bg-[#101214] p-4 text-[#f6f1ea] sm:p-5">
        <div className="flex gap-3">
          <Mail className="mt-0.5 size-5 shrink-0 text-[#f0b384]" aria-hidden="true" />
          <div>
            <h2 id="daily-email-es" className="text-sm font-semibold">
              Actualizaciones diarias de ganchos
            </h2>
            <p className="mt-1 text-xs leading-5 text-[#d8d0c7]">
              Guarda tu correo en el sitio para recibir ideas diarias de ganchos y formatos. El envío no es automatizado; el progreso permanece en este dispositivo.
            </p>
          </div>
        </div>
        {captureStatus === "saved" ? (
          <p className="mt-4 text-sm text-emerald-300">Correo guardado.</p>
        ) : (
          <form onSubmit={captureEmail} className="mt-4 flex flex-col gap-2 sm:flex-row">
            <label className="sr-only" htmlFor="daily-hook-email-es">
              Correo electrónico
            </label>
            <input
              id="daily-hook-email-es"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Correo electrónico"
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
            No se pudo guardar el correo. Tu planificador sigue funcionando en este dispositivo.
          </p>
        ) : null}
      </section>
    </div>
  );
}
