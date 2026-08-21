"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Film, Mail, Plus, RefreshCw, RotateCcw, Trash2 } from "lucide-react";
import { trackLeadSubmit } from "@/lib/analytics-events";

type ShotFormula = {
  title: string;
  focus: string;
  description: string;
  defaultShots: string[];
};

const FORMULAS_EN: ShotFormula[] = [
  {
    title: "3-Layer Establishing & Ambient Cut",
    focus: "Context & Atmosphere",
    description: "Capture wide room context (3s), motion detail (2s), and ambient room sound before recording dialogue.",
    defaultShots: [
      "Wide establishing shot of the room or workstation (3-4s)",
      "Tight macro cutaway of hands or active tool in motion",
      "Over-the-shoulder perspective with subject action",
    ],
  },
  {
    title: "Macro Texture & Product Reveal",
    focus: "Product & Physical Detail",
    description: "Highlight fine craftsmanship or physical textures with slow linear movement and natural directional light.",
    defaultShots: [
      "Slow lateral pan across primary product surface or dish",
      "Top-down flat-lay showing all prepared elements",
      "Hand entering frame to interact with the finished item",
    ],
  },
  {
    title: "Kinetic Action & Motion Wipe",
    focus: "Pacing & Transition",
    description: "Use continuous subject movement across camera frame to create natural cut points between scenes.",
    defaultShots: [
      "Subject walking past lens creating natural foreground wipe",
      "Quick push-in on key physical action or decisive gesture",
      "Snap zoom or pan landing cleanly on finished outcome",
    ],
  },
  {
    title: "Question-to-Proof Demonstration",
    focus: "Educational & Service Video",
    description: "Anchor the hook with direct eye-level framing, followed by two cutaways demonstrating evidence.",
    defaultShots: [
      "Eye-level speaking head within 9:16 safe zone",
      "Cutaway b-roll showing common error or baseline state",
      "Cutaway b-roll showing clean resolution or finished result",
    ],
  },
  {
    title: "Foreground Depth & Bokeh Layering",
    focus: "Visual Depth & Dimension",
    description: "Place an out-of-focus object in the immediate foreground to add dimensional depth to a simple scene.",
    defaultShots: [
      "Low-angle shot framed past desk or architectural element",
      "Side-profile angle with soft background blur",
      "Focus rack from foreground object to speaking subject",
    ],
  },
  {
    title: "30-Second Micro Storyboard",
    focus: "Short-Form Structure",
    description: "Plan exact footage blocks: 3s visual trigger, 18s continuous demonstration, 9s conclusion.",
    defaultShots: [
      "High-contrast visual trigger or surprising first frame",
      "Continuous step-by-step process footage",
      "Holding frame with clean space for call-to-action text",
    ],
  },
  {
    title: "Before-and-After Split Comparison",
    focus: "Transformation & Portfolio",
    description: "Shoot matched static angles of the starting condition and final outcome for seamless comparison.",
    defaultShots: [
      "Locked tripod wide shot of initial state",
      "Matched locked tripod shot of finished state",
      "Dynamic tight detail pan highlighting refined elements",
    ],
  },
];

const FORMULAS_ES: ShotFormula[] = [
  {
    title: "Corte de Contexto y Ambiente en 3 Capas",
    focus: "Contexto y atmósfera",
    description: "Captura el plano general del espacio (3s), detalle de acción (2s) y sonido ambiente antes de iniciar el diálogo.",
    defaultShots: [
      "Plano general del entorno de trabajo o local (3-4s)",
      "Plano cerrado macro de manos o herramienta en acción",
      "Perspectiva sobre el hombro con movimiento del sujeto",
    ],
  },
  {
    title: "Textura Macro y Revelación de Producto",
    focus: "Producto y detalle físico",
    description: "Resalta detalles y texturas con movimiento lineal pausado y luz direccional natural.",
    defaultShots: [
      "Paneo lateral lento sobre la superficie del producto o plato",
      "Plano cenital (top-down) mostrando elementos preparados",
      "Mano entrando en cuadro interactuando con el objeto",
    ],
  },
  {
    title: "Acción Cinética y Barrido de Movimiento",
    focus: "Ritmo y transición",
    description: "Utiliza el movimiento continuo del sujeto frente al lente para crear puntos de corte naturales.",
    defaultShots: [
      "Sujeto cruzando frente al lente generando corte por barrido",
      "Empuje rápido de cámara hacia la acción principal",
      "Encuadre dinámico finalizando en el resultado terminado",
    ],
  },
  {
    title: "Estructura de Pregunta a Demostración",
    focus: "Video educativo y de servicios",
    description: "Ancla el gancho con encuadre directo a la altura de los ojos, seguido de dos planos de demostración.",
    defaultShots: [
      "Plano medio a la altura de los ojos en zona segura 9:16",
      "Toma de apoyo (B-roll) mostrando el problema o error común",
      "Toma de apoyo mostrando la solución o resultado final",
    ],
  },
  {
    title: "Profundidad de Primer Plano y Desenfoque",
    focus: "Profundidad visual y acabado",
    description: "Coloca un elemento desenfocado en primer plano para aportar profundidad tridimensional a la escena.",
    defaultShots: [
      "Ángulo bajo disparando a través de un elemento del espacio",
      "Perfil lateral con fondo suavemente desenfocado",
      "Cambio de foco desde elemento cercano hacia el sujeto",
    ],
  },
  {
    title: "Micro Guion Gráfico de 30 Segundos",
    focus: "Estructura para video corto",
    description: "Planifica bloques exactos de metraje: 3s detonador visual, 18s demostración continua, 9s conclusión.",
    defaultShots: [
      "Detonador visual o primer fotograma de alto contraste",
      "Metraje continuo del proceso paso a paso",
      "Encuadre final limpio con espacio para texto de cierre",
    ],
  },
  {
    title: "Comparativa Antes y Después",
    focus: "Transformación y portafolio",
    description: "Graba encuadres estáticos coincidentes del estado inicial y del resultado final para comparativa fluida.",
    defaultShots: [
      "Plano fijo en trípode del estado inicial",
      "Mismo plano fijo en trípode del resultado terminado",
      "Paneo dinámico destacando detalles de acabado",
    ],
  },
];

const CHECKS_EN = [
  "Camera lens cleaned & 9:16 framing grid enabled",
  "Microphone gain level & background room tone verified",
  "Key light positioned & on-screen text safe zones cleared",
];

const CHECKS_ES = [
  "Lente de cámara limpio y cuadrícula 9:16 activada",
  "Nivel de ganancia de micrófono y sonido ambiente verificados",
  "Luz principal ubicada y márgenes libres de interfaz",
];

type PlannerState = {
  date: string;
  checksCompleted: boolean[];
  shotsCompleted: boolean[];
  customShots: string[];
  customCompleted: boolean[];
  streak: number;
};

const storageKey = "esteban-media-daily-shot-planner";

function localDateKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function formulaForTodayIndex(total: number) {
  const dayNumber = Math.floor(new Date().setHours(0, 0, 0, 0) / 86_400_000);
  return dayNumber % total;
}

export function DailyShotListPlanner({ locale = "en" }: { locale?: "en" | "es" }) {
  const isEs = locale === "es";
  const formulas = isEs ? FORMULAS_ES : FORMULAS_EN;
  const readinessChecks = isEs ? CHECKS_ES : CHECKS_EN;

  const [state, setState] = useState<PlannerState>({
    date: "",
    checksCompleted: [],
    shotsCompleted: [],
    customShots: [],
    customCompleted: [],
    streak: 0,
  });

  const [isReady, setIsReady] = useState(false);
  const [formulaIndex, setFormulaIndex] = useState(0);
  const [customInput, setCustomInput] = useState("");
  const [email, setEmail] = useState("");
  const [captureStatus, setCaptureStatus] = useState<"idle" | "sending" | "saved" | "error">("idle");
  const today = useMemo(localDateKey, []);

  useEffect(() => {
    setFormulaIndex(formulaForTodayIndex(formulas.length));
  }, [formulas.length]);

  const currentFormula = formulas[formulaIndex % formulas.length];

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) {
      setState({
        date: today,
        checksCompleted: Array(readinessChecks.length).fill(false),
        shotsCompleted: Array(currentFormula.defaultShots.length).fill(false),
        customShots: [],
        customCompleted: [],
        streak: 0,
      });
      setIsReady(true);
      return;
    }

    try {
      const parsed = JSON.parse(saved) as PlannerState;
      if (parsed.date === today) {
        setState({
          date: today,
          checksCompleted: (parsed.checksCompleted || []).slice(0, readinessChecks.length),
          shotsCompleted: (parsed.shotsCompleted || []).slice(0, currentFormula.defaultShots.length),
          customShots: parsed.customShots || [],
          customCompleted: parsed.customCompleted || [],
          streak: parsed.streak || 0,
        });
      } else {
        setState({
          date: today,
          checksCompleted: Array(readinessChecks.length).fill(false),
          shotsCompleted: Array(currentFormula.defaultShots.length).fill(false),
          customShots: [],
          customCompleted: [],
          streak: parsed.streak || 0,
        });
      }
    } catch {
      setState({
        date: today,
        checksCompleted: Array(readinessChecks.length).fill(false),
        shotsCompleted: Array(currentFormula.defaultShots.length).fill(false),
        customShots: [],
        customCompleted: [],
        streak: 0,
      });
    }
    setIsReady(true);
  }, [today, readinessChecks.length, currentFormula.defaultShots.length]);

  useEffect(() => {
    if (!isReady) return;
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  }, [isReady, state]);

  function toggleCheck(index: number) {
    setState((current) => {
      const checksCompleted = current.checksCompleted.map((value, i) =>
        i === index ? !value : value,
      );
      const wasAllChecks = current.checksCompleted.length > 0 && current.checksCompleted.every(Boolean);
      const nowAllChecks = checksCompleted.length > 0 && checksCompleted.every(Boolean);

      return {
        ...current,
        checksCompleted,
        streak:
          nowAllChecks && !wasAllChecks
            ? current.streak + 1
            : nowAllChecks
              ? current.streak
              : Math.max(0, current.streak - 1),
      };
    });
  }

  function toggleDefaultShot(index: number) {
    setState((current) => {
      const shotsCompleted = [...(current.shotsCompleted || [])];
      while (shotsCompleted.length < currentFormula.defaultShots.length) {
        shotsCompleted.push(false);
      }
      shotsCompleted[index] = !shotsCompleted[index];
      return { ...current, shotsCompleted };
    });
  }

  function toggleCustomShot(index: number) {
    setState((current) => {
      const customCompleted = [...current.customCompleted];
      customCompleted[index] = !customCompleted[index];
      return { ...current, customCompleted };
    });
  }

  function addCustomShot(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = customInput.trim();
    if (!trimmed) return;

    setState((current) => ({
      ...current,
      customShots: [...current.customShots, trimmed],
      customCompleted: [...current.customCompleted, false],
    }));
    setCustomInput("");
  }

  function removeCustomShot(index: number) {
    setState((current) => ({
      ...current,
      customShots: current.customShots.filter((_, i) => i !== index),
      customCompleted: current.customCompleted.filter((_, i) => i !== index),
    }));
  }

  function resetToday() {
    setState((current) => ({
      ...current,
      checksCompleted: Array(readinessChecks.length).fill(false),
      shotsCompleted: Array(currentFormula.defaultShots.length).fill(false),
      customShots: [],
      customCompleted: [],
    }));
  }

  function nextFormula() {
    setFormulaIndex((prev) => (prev + 1) % formulas.length);
  }

  async function captureEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCaptureStatus("sending");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "daily-shot-planner",
          locale,
          email,
          notes: `Daily Shot List Planner capture. Selected formula: ${currentFormula.title}`,
        }),
      });
      if (response.ok) {
        setCaptureStatus("saved");
        trackLeadSubmit("daily-shot-planner", locale);
      } else {
        setCaptureStatus("error");
      }
    } catch {
      setCaptureStatus("error");
    }
  }

  const completedChecksCount = state.checksCompleted.filter(Boolean).length;
  const isChecksComplete = completedChecksCount === readinessChecks.length;
  const completedShotsCount =
    state.shotsCompleted.filter(Boolean).length + state.customCompleted.filter(Boolean).length;
  const totalShotsCount = currentFormula.defaultShots.length + state.customShots.length;

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-[#ddd4c8] bg-[#fbf6ef] p-4 shadow-sm sm:p-7">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-[#ddd4c8] pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9f3c27]">
            {isEs ? "Planificador de Tomas de Video" : "Daily Video Shot List Planner"}
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-[#101214] sm:text-4xl">
            {isEs ? "Lista de tomas y soporte visual" : "Shot list & visual framing pass"}
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#5a6066]">
            {isEs
              ? "Planifica los planos de apoyo del día, verifica tu equipo en 3 pasos y mantén tu racha de grabación."
              : "Plan today's essential B-roll shots, verify filming readiness in 3 checks, and maintain your production streak."}
          </p>
        </div>
        <div className="shrink-0 rounded-xl bg-[#101214] px-4 py-3 text-center text-[#f6f1ea]">
          <div className="text-2xl font-semibold">{state.streak}</div>
          <div className="text-[11px] uppercase tracking-wide text-[#d8d0c7]">
            {isEs ? "Días de racha" : "Days streak"}
          </div>
        </div>
      </div>

      {/* Featured Formula Section */}
      <section aria-labelledby="today-formula" className="mt-6 rounded-xl border border-[#e6c7bb] bg-[#fff4ee] p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9f3c27]">
            {isEs ? "Fórmula de tomas de hoy" : "Today's Shot Formula"} • {currentFormula.focus}
          </p>
          <button
            type="button"
            onClick={nextFormula}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-[#e6c7bb] bg-white px-3 py-1 text-xs font-medium text-[#9f3c27] hover:bg-[#fff4ee] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c84a2c]"
          >
            <RefreshCw className="size-3.5" aria-hidden="true" /> {isEs ? "Siguiente fórmula" : "Next formula"}
          </button>
        </div>
        <h2 id="today-formula" className="mt-2 text-lg font-semibold text-[#101214]">
          {currentFormula.title}
        </h2>
        <p className="mt-1 text-sm leading-6 text-[#5a6066]">{currentFormula.description}</p>
      </section>

      {/* Interactive Shot List Builder */}
      <section aria-labelledby="shot-list-heading" className="mt-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Film className="size-4 text-[#9f3c27]" aria-hidden="true" />
            <h2 id="shot-list-heading" className="text-sm font-semibold text-[#101214]">
              {isEs ? "Tomas planificadas para hoy" : "Planned shots for today"}
            </h2>
          </div>
          <span className="text-xs text-[#5a6066]">
            {completedShotsCount} {isEs ? "de" : "of"} {totalShotsCount} {isEs ? "listas" : "filmed"}
          </span>
        </div>

        {/* Default Formula Shots */}
        <div className="mt-3 space-y-2">
          {currentFormula.defaultShots.map((shot, index) => {
            const checked = Boolean(state.shotsCompleted[index]);
            return (
              <button
                key={`${currentFormula.title}-${index}`}
                type="button"
                aria-pressed={checked}
                onClick={() => toggleDefaultShot(index)}
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
                <span className="flex-1">{shot}</span>
              </button>
            );
          })}

          {/* Custom User Shots */}
          {state.customShots.map((customShot, index) => {
            const checked = Boolean(state.customCompleted[index]);
            return (
              <div
                key={`custom-${index}`}
                className={`flex min-h-14 w-full items-center justify-between gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                  checked
                    ? "border-emerald-600/50 bg-emerald-50 text-emerald-950"
                    : "border-[#ddd4c8] bg-[#f6f1ea] text-[#252a2d]"
                }`}
              >
                <button
                  type="button"
                  aria-pressed={checked}
                  onClick={() => toggleCustomShot(index)}
                  className="flex flex-1 items-center gap-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c84a2c]"
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
                  <span className="flex-1">{customShot}</span>
                </button>
                <button
                  type="button"
                  aria-label={isEs ? "Eliminar toma personalizada" : "Remove custom shot"}
                  onClick={() => removeCustomShot(index)}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg p-2 text-[#8c827a] hover:bg-black/5 hover:text-[#9f3c27] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c84a2c]"
                >
                  <Trash2 className="size-4" aria-hidden="true" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Add Custom Shot Form */}
        <form onSubmit={addCustomShot} className="mt-3 flex gap-2">
          <label className="sr-only" htmlFor="add-shot-input">
            {isEs ? "Agregar toma personalizada" : "Add custom shot"}
          </label>
          <input
            id="add-shot-input"
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder={isEs ? "Ej: Detalle de cliente reaccionando..." : "e.g. Tight shot of customer reaction..."}
            className="min-h-11 flex-1 rounded-lg border border-[#ddd4c8] bg-white px-3 text-sm text-[#101214] placeholder:text-[#8c827a] focus:border-[#c84a2c] focus:outline-none"
          />
          <button
            type="submit"
            disabled={!customInput.trim()}
            className="inline-flex min-h-11 items-center gap-1 rounded-lg bg-[#252a2d] px-4 text-xs font-semibold text-white hover:bg-black disabled:opacity-50"
          >
            <Plus className="size-3.5" aria-hidden="true" />
            {isEs ? "Agregar" : "Add shot"}
          </button>
        </form>
      </section>

      {/* Daily 3-Step Filming Readiness Checks */}
      <section aria-labelledby="readiness-checks" className="mt-6 border-t border-[#ddd4c8] pt-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 id="readiness-checks" className="text-sm font-semibold text-[#101214]">
              {isEs ? "Verificaciones de rodaje antes de grabar" : "Pre-shoot readiness checks"}
            </h2>
            <p className="mt-0.5 text-xs text-[#5a6066]">
              {isEs
                ? "Completa las 3 verificaciones para registrar tu avance diario."
                : "Complete all 3 checks to maintain your daily filming streak."}
            </p>
          </div>
          <span className="text-xs font-medium text-[#5a6066]">
            {completedChecksCount} {isEs ? "de" : "of"} {readinessChecks.length}
          </span>
        </div>

        <div className="mt-3 space-y-2">
          {readinessChecks.map((task, index) => {
            const checked = Boolean(state.checksCompleted[index]);
            return (
              <button
                key={task}
                type="button"
                aria-pressed={checked}
                onClick={() => toggleCheck(index)}
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

        {isChecksComplete ? (
          <p className="mt-3 text-sm text-emerald-800">
            {isEs
              ? "El pase de preparación de hoy está guardado en este dispositivo."
              : "Today's pre-shoot pass is saved on this device."}
          </p>
        ) : null}

        <button
          type="button"
          onClick={resetToday}
          className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-[#5a6066] hover:bg-[#ece5da] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c84a2c]"
        >
          <RotateCcw className="size-4" aria-hidden="true" /> {isEs ? "Reiniciar hoy" : "Reset today"}
        </button>
      </section>

      {/* Lightweight Email Capture */}
      <section aria-labelledby="daily-shot-email" className="mt-6 rounded-xl bg-[#101214] p-4 text-[#f6f1ea] sm:p-5">
        <div className="flex gap-3">
          <Mail className="mt-0.5 size-5 shrink-0 text-[#f0b384]" aria-hidden="true" />
          <div>
            <h2 id="daily-shot-email" className="text-sm font-semibold">
              {isEs ? "Actualizaciones de Lista de Tomas y B-Roll" : "Daily Shot List & B-Roll Updates"}
            </h2>
            <p className="mt-1 text-xs leading-5 text-[#d8d0c7]">
              {isEs
                ? "Guarda tu correo para recibir plantillas de tomas y guías de encuadre. El progreso de hoy permanece en este dispositivo."
                : "Save your email to receive weekly shot list templates and b-roll framing guides. Progress stays on this device."}
            </p>
          </div>
        </div>

        {captureStatus === "saved" ? (
          <p className="mt-4 text-sm text-emerald-300">{isEs ? "Correo guardado." : "Email saved."}</p>
        ) : (
          <form onSubmit={captureEmail} className="mt-4 flex flex-col gap-2 sm:flex-row">
            <label className="sr-only" htmlFor="daily-shot-planner-email">
              {isEs ? "Dirección de correo electrónico" : "Email address"}
            </label>
            <input
              id="daily-shot-planner-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={isEs ? "Dirección de correo" : "Email address"}
              className="min-h-11 min-w-0 flex-1 rounded-lg border border-white/20 bg-white/10 px-3 text-sm text-white placeholder:text-white/50 focus:border-[#f0b384] focus:outline-none"
            />
            <button
              type="submit"
              disabled={captureStatus === "sending"}
              className="min-h-11 rounded-full bg-[#c84a2c] px-5 text-sm font-semibold text-white hover:bg-[#a93e29] disabled:cursor-wait disabled:opacity-70"
            >
              {captureStatus === "sending"
                ? isEs
                  ? "Guardando…"
                  : "Saving…"
                : isEs
                  ? "Guardar correo"
                  : "Save email"}
            </button>
          </form>
        )}

        {captureStatus === "error" ? (
          <p className="mt-3 text-xs text-[#ffb49e]">
            {isEs
              ? "No se pudo guardar el correo. Tu lista de tomas sigue funcionando en este dispositivo."
              : "Email could not be saved. Your shot list still works on this device."}
          </p>
        ) : null}
      </section>
    </div>
  );
}
