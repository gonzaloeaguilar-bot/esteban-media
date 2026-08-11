"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Mail, RotateCcw } from "lucide-react";

const prompts = [
  "Muestra un proceso de trabajo real de 15 segundos sin música estridente.",
  "Explica un error común de tu industria y cómo evitarlo en 30 segundos.",
  "Responde la pregunta que más hacen tus clientes en una sola toma.",
  "Comparte una toma del 'antes y después' de un proyecto reciente.",
  "Muestra las herramientas o el equipo que usas a diario para trabajar.",
  "Resume una lección clave aprendida en tu último proyecto.",
  "Graba un recorrido de 20 segundos por tu espacio de trabajo o estudio.",
];

const tasks = [
  "Seleccionar el material o la idea del video.",
  "Establecer el formato de destino (Reel, TikTok o Short).",
  "Verificar el primer cuadro y la claridad del título o subtítulos.",
];

type DailyState = {
  date: string;
  completed: boolean[];
  streak: number;
};

const storageKey = "esteban-media-daily-publish-prompt-es";

function localDateKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function promptForToday() {
  const dayNumber = Math.floor(new Date().setHours(0, 0, 0, 0) / 86_400_000);
  return prompts[dayNumber % prompts.length];
}

export function DailyPublishPromptEs() {
  const [state, setState] = useState<DailyState>({ date: "", completed: [], streak: 0 });
  const [isReady, setIsReady] = useState(false);
  const [email, setEmail] = useState("");
  const [captureStatus, setCaptureStatus] = useState<"idle" | "sending" | "saved" | "error">("idle");
  const today = useMemo(localDateKey, []);
  const prompt = useMemo(promptForToday, []);
  const completedCount = state.completed.filter(Boolean).length;
  const isComplete = completedCount === tasks.length;

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) {
      setState({ date: today, completed: Array(tasks.length).fill(false), streak: 0 });
      setIsReady(true);
      return;
    }

    try {
      const parsed = JSON.parse(saved) as DailyState;
      setState(
        parsed.date === today
          ? { ...parsed, completed: parsed.completed.slice(0, tasks.length) }
          : { date: today, completed: Array(tasks.length).fill(false), streak: parsed.streak },
      );
    } catch {
      setState({ date: today, completed: Array(tasks.length).fill(false), streak: 0 });
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
        streak: nowComplete && !wasComplete ? current.streak + 1 : nowComplete ? current.streak : Math.max(0, current.streak - 1),
      };
    });
  }

  function resetToday() {
    setState((current) => ({ ...current, completed: Array(tasks.length).fill(false) }));
  }

  async function captureEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCaptureStatus("sending");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "daily-prompt",
          locale: "es",
          email,
          notes: `Captura de Prompt de Publicación Diaria (ES). Prompt: ${prompt}`,
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
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9f3c27]">Prompt de publicación diaria</p>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-[#101214] sm:text-4xl">Un paso diario de publicación</h1>
          <p className="mt-2 text-sm leading-6 text-[#5a6066]">Usa la idea de hoy y las tres verificaciones. Vuelve mañana para el siguiente prompt.</p>
        </div>
        <div className="shrink-0 rounded-xl bg-[#101214] px-4 py-3 text-center text-[#f6f1ea]">
          <div className="text-2xl font-semibold">{state.streak}</div>
          <div className="text-[11px] uppercase tracking-wide text-[#d8d0c7]">Días completados</div>
        </div>
      </div>

      <section aria-labelledby="today-prompt" className="mt-6 rounded-xl border border-[#e6c7bb] bg-[#fff4ee] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9f3c27]">Hoy</p>
        <h2 id="today-prompt" className="mt-2 text-lg font-semibold text-[#101214]">{prompt}</h2>
      </section>

      <section aria-labelledby="daily-checklist" className="mt-6">
        <div className="flex items-center justify-between gap-3">
          <h2 id="daily-checklist" className="text-sm font-semibold text-[#101214]">Verificaciones de hoy</h2>
          <span className="text-xs text-[#5a6066]">{completedCount} de {tasks.length}</span>
        </div>
        <div className="mt-3 space-y-2">
          {tasks.map((task, index) => {
            const checked = Boolean(state.completed[index]);
            return (
              <button
                key={task}
                type="button"
                aria-pressed={checked}
                onClick={() => toggleTask(index)}
                className={`flex min-h-14 w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c84a2c] ${
                  checked ? "border-emerald-600/50 bg-emerald-50 text-emerald-950" : "border-[#ddd4c8] bg-[#f6f1ea] text-[#252a2d] hover:border-[#c84a2c]"
                }`}
              >
                <span className={`grid size-5 shrink-0 place-items-center rounded border ${checked ? "border-emerald-700 bg-emerald-700 text-white" : "border-[#b9aa9a] bg-white text-transparent"}`}>
                  <Check className="size-3.5 stroke-[3]" aria-hidden="true" />
                </span>
                {task}
              </button>
            );
          })}
        </div>
        {isComplete ? <p className="mt-3 text-sm text-emerald-800">El avance de hoy se ha guardado en este dispositivo.</p> : null}
        <button type="button" onClick={resetToday} className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-[#5a6066] hover:bg-[#ece5da] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c84a2c]">
          <RotateCcw className="size-4" aria-hidden="true" /> Reiniciar hoy
        </button>
      </section>

      <section aria-labelledby="daily-email" className="mt-6 rounded-xl bg-[#101214] p-4 text-[#f6f1ea] sm:p-5">
        <div className="flex gap-3">
          <Mail className="mt-0.5 size-5 shrink-0 text-[#f0b384]" aria-hidden="true" />
          <div>
            <h2 id="daily-email" className="text-sm font-semibold">Registro para actualizaciones diarias</h2>
            <p className="mt-1 text-xs leading-5 text-[#d8d0c7]">Guarda tu correo con el sitio para futuras actualizaciones de prompts. El progreso permanece en este dispositivo.</p>
          </div>
        </div>
        {captureStatus === "saved" ? <p className="mt-4 text-sm text-emerald-300">Correo guardado.</p> : (
          <form onSubmit={captureEmail} className="mt-4 flex flex-col gap-2 sm:flex-row">
            <label className="sr-only" htmlFor="daily-prompt-email-es">Correo electrónico</label>
            <input id="daily-prompt-email-es" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Correo electrónico" className="min-h-11 min-w-0 flex-1 rounded-lg border border-white/20 bg-white/10 px-3 text-sm text-white placeholder:text-white/50 focus:border-[#f0b384] focus:outline-none" />
            <button type="submit" disabled={captureStatus === "sending"} className="min-h-11 rounded-full bg-[#c84a2c] px-5 text-sm font-semibold text-white hover:bg-[#a93e29] disabled:cursor-wait disabled:opacity-70">
              {captureStatus === "sending" ? "Guardando…" : "Guardar correo"}
            </button>
          </form>
        )}
        {captureStatus === "error" ? <p className="mt-3 text-xs text-[#ffb49e]">No se pudo guardar el correo. Tu lista de verificación sigue funcionando en este dispositivo.</p> : null}
      </section>
    </div>
  );
}
