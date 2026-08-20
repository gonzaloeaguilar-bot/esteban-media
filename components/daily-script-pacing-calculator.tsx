"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Clock, Copy, Gauge, Mail, RefreshCw, RotateCcw, Sparkles } from "lucide-react";
import { trackLeadSubmit } from "@/lib/analytics-events";

type PacingDrill = {
  title: string;
  focus: string;
  targetSeconds: number;
  wpm: number;
  description: string;
  template: string;
};

const DRILLS_EN: PacingDrill[] = [
  {
    title: "15-Second Direct Contrast Hook",
    focus: "Rapid Opening & High Contrast",
    targetSeconds: 15,
    wpm: 150,
    description: "Anchor the core mistake and immediate solution in 3 short sentences before the viewer scrolls.",
    template:
      "Name one filming mistake. Show the affected frame. Then describe one adjustment and the next check to run before recording.",
  },
  {
    title: "30-Second Problem-Agitation-Solution",
    focus: "Retention Hold & Direct Value",
    targetSeconds: 30,
    wpm: 140,
    description: "Call out the audience friction point, reveal the exact 2-step fix, and deliver a clean next step.",
    template:
      "If your videos lose attention in the first 5 seconds, you are likely missing an immediate visual proof point. Instead of introducing yourself, show the finished result right away. Then explain the exact 2 steps to get there. Check the link for daily filming frameworks.",
  },
  {
    title: "45-Second Step-by-Step Process Breakdown",
    focus: "Structured Tutorial & Pacing Cues",
    targetSeconds: 45,
    wpm: 135,
    description: "Deliver a clear 3-step technical workflow with natural pause markers between steps for cutaways.",
    template:
      "Use this 3-step setup before recording. Step 1: Choose the key-light position. Step 2: Check exposure for visible flicker. Step 3: Record a short room-tone sample for audio editing. Add a pause between each step for a cutaway.",
  },
  {
    title: "60-Second Case Study & Transformation",
    focus: "Proof, Transformation & Cadence",
    targetSeconds: 60,
    wpm: 135,
    description: "Narrate client baseline, strategic turnaround, and measurable outcome with dedicated b-roll pauses.",
    template:
      "Draft a neutral before-and-after example. Start with a folder of unedited clips. Next, describe two editing decisions, such as selecting action shots and adding clear text labels. End by naming the observable difference in the finished sequence without inventing performance results.",
  },
  {
    title: "30-Second Myth-Buster & Reframe",
    focus: "Direct Myth-Bust & Actionable Advice",
    targetSeconds: 30,
    wpm: 140,
    description: "Dispel an expensive gear misconception and emphasize the 2 fundamentals that actually drive quality.",
    template:
      "Test the idea that the camera is the only part of video quality. Compare the image under two lighting positions, then compare audio from two microphone distances. Use the visible and audible differences to choose the next setup.",
  },
  {
    title: "40-Second Behind-the-Scenes Production Drill",
    focus: "On-Set Efficiency & Batching Cadence",
    targetSeconds: 40,
    wpm: 135,
    description: "Break down an efficient on-location filming session to demonstrate systematic content creation.",
    template:
      "Outline a batch-recording session. List the planned camera angles, verify the safe area for the target format, and record alternate openings. Add time markers to the outline so each section has a clear stopping point.",
  },
  {
    title: "20-Second Direct Offer & Next Step",
    focus: "Crisp Call-to-Action & Clarity",
    targetSeconds: 20,
    wpm: 145,
    description: "Filter target audience immediately, define service scope concisely, and direct to portfolio.",
    template:
      "State the type of footage, the intended video format, and the next review step. Keep the request specific: identify the source files, target duration, aspect ratio, and delivery date.",
  },
];

const DRILLS_ES: PacingDrill[] = [
  {
    title: "Gancho de Contraste Rápido de 15 Segundos",
    focus: "Apertura rápida y contraste visual",
    targetSeconds: 15,
    wpm: 145,
    description: "Ancla el error principal y la solución inmediata en 3 frases cortas antes de que el usuario haga scroll.",
    template:
      "Nombra un error de grabación. Muestra el fotograma afectado. Luego describe un ajuste y la siguiente comprobación antes de grabar.",
  },
  {
    title: "Problema-Agitación-Solución de 30 Segundos",
    focus: "Retención de inicio y valor directo",
    targetSeconds: 30,
    wpm: 135,
    description: "Señala el punto de fricción de la audiencia, revela la solución en 2 pasos y brinda un siguiente paso claro.",
    template:
      "Si tus videos pierden audiencia en los primeros 5 segundos, probablemente te falta una prueba visual inmediata. En lugar de presentarte, muestra el resultado final desde el primer fotograma. Luego explica los 2 pasos exactos para lograrlo. Consulta el enlace para estructuras diarias de video.",
  },
  {
    title: "Desglose de Proceso en 3 Pasos de 45 Segundos",
    focus: "Tutorial estructurado y pausas claras",
    targetSeconds: 45,
    wpm: 130,
    description: "Entrega un flujo técnico en 3 pasos con pausas naturales entre pasos para tomas de apoyo.",
    template:
      "Esta es la preparación exacta en 3 pasos antes de presionar grabar en cada rodaje. Paso 1: Coloca la luz principal a 45 grados. Paso 2: Bloquea la exposición manual para evitar parpadeos en el fondo. Paso 3: Graba 5 segundos de sonido ambiente para sincronización limpia. Consulta la guía para la lista completa.",
  },
  {
    title: "Caso de Estudio y Demostración de 60 Segundos",
    focus: "Transformación con evidencia y cierre",
    targetSeconds: 60,
    wpm: 130,
    description: "Narra la situación inicial, el cambio estratégico y el resultado concreto con pausas para B-roll.",
    template:
      "Redacta un ejemplo neutral de antes y después. Comienza con una carpeta de clips sin editar. Luego, describe dos decisiones de edición, como seleccionar tomas de acción y añadir rótulos claros. Termina con una diferencia observable en la secuencia final sin inventar resultados de rendimiento.",
  },
  {
    title: "Mito Común y Reencuadre de 30 Segundos",
    focus: "Eliminación de fricción y reencuadre",
    targetSeconds: 30,
    wpm: 135,
    description: "Desmitifica la necesidad de equipos costosos y destaca los 2 pilares que determinan la calidad del video.",
    template:
      "Pon a prueba la idea de que la cámara es el único factor de calidad. Compara la imagen con dos posiciones de luz y el audio con dos distancias de micrófono. Usa las diferencias visibles y audibles para elegir la siguiente configuración.",
  },
  {
    title: "Ritmo de Detrás de Cámaras de 40 Segundos",
    focus: "Eficiencia de rodaje y lotes de contenido",
    targetSeconds: 40,
    wpm: 130,
    description: "Desglosa una sesión eficiente de grabación por lotes para estructurar contenido continuo.",
    template:
      "Organiza una sesión de grabación por lotes. Enumera los ángulos previstos, verifica la zona segura del formato final y graba aperturas alternativas. Añade marcas de tiempo al esquema para definir el cierre de cada sección.",
  },
  {
    title: "Llamado a la Acción Directo de 20 Segundos",
    focus: "Claridad de propuesta y llamada a la acción",
    targetSeconds: 20,
    wpm: 140,
    description: "Filtra a tu público objetivo, define el alcance del servicio y dirige al portafolio.",
    template:
      "Indica el tipo de material, el formato de video previsto y el siguiente paso de revisión. Especifica los archivos de origen, la duración objetivo, la relación de aspecto y la fecha de entrega.",
  },
];

const CHECKS_EN = [
  "Pacing test: Read aloud at target cadence within target duration",
  "Hook test: First 8 words delivered in under 3.5 seconds",
  "Cut cues: Added 0.5s pause markers before primary b-roll cutaways",
];

const CHECKS_ES = [
  "Prueba de ritmo: Lectura en voz alta dentro de la duración objetivo",
  "Prueba de gancho: Primeras 8 palabras articuladas en menos de 3.5 segundos",
  "Marcas de corte: Pausas de 0.5s añadidas antes de planos de apoyo",
];

type PacingState = {
  date: string;
  checksCompleted: boolean[];
  streak: number;
};

const storageKey = "esteban-media-daily-pacing-calculator";

export function localDateKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export function drillForTodayIndex(total: number) {
  const dayNumber = Math.floor(Date.now() / 86_400_000);
  return dayNumber % total;
}

export function nextStreak(streak: number, wasComplete: boolean, isComplete: boolean) {
  if (isComplete && !wasComplete) return streak + 1;
  if (wasComplete && !isComplete) return Math.max(0, streak - 1);
  return streak;
}

export function carriedStreak(
  streak: number,
  previousDate: string,
  currentDate: string,
  previousDayComplete: boolean,
) {
  const previous = new Date(`${previousDate}T00:00:00`);
  const current = new Date(`${currentDate}T00:00:00`);
  const dayGap = Math.round((current.getTime() - previous.getTime()) / 86_400_000);
  return dayGap === 1 && previousDayComplete ? streak : 0;
}

export function DailyScriptPacingCalculator({ locale = "en" }: { locale?: "en" | "es" }) {
  const isEs = locale === "es";
  const drills = isEs ? DRILLS_ES : DRILLS_EN;
  const readinessChecks = isEs ? CHECKS_ES : CHECKS_EN;

  const [state, setState] = useState<PacingState>({
    date: "",
    checksCompleted: [],
    streak: 0,
  });

  const [isReady, setIsReady] = useState(false);
  const initialDrillIndex = drillForTodayIndex(drills.length);
  const initialDrill = drills[initialDrillIndex];
  const [drillIndex, setDrillIndex] = useState(initialDrillIndex);
  const [scriptText, setScriptText] = useState(initialDrill.template);
  const [targetSeconds, setTargetSeconds] = useState(initialDrill.targetSeconds);
  const [wpm, setWpm] = useState(initialDrill.wpm);
  const [copied, setCopied] = useState(false);

  const [email, setEmail] = useState("");
  const [captureStatus, setCaptureStatus] = useState<"idle" | "sending" | "saved" | "error">("idle");
  const today = useMemo(localDateKey, []);

  const currentDrill = drills[drillIndex % drills.length];

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) {
      setState({
        date: today,
        checksCompleted: Array(readinessChecks.length).fill(false),
        streak: 0,
      });
      setIsReady(true);
      return;
    }

    try {
      const parsed = JSON.parse(saved) as PacingState;
      if (parsed.date === today) {
        setState({
          date: today,
          checksCompleted: (parsed.checksCompleted || []).slice(0, readinessChecks.length),
          streak: parsed.streak || 0,
        });
      } else {
        const completedPreviousDay =
          (parsed.checksCompleted || []).length === readinessChecks.length &&
          parsed.checksCompleted.every(Boolean);
        setState({
          date: today,
          checksCompleted: Array(readinessChecks.length).fill(false),
          streak: carriedStreak(parsed.streak || 0, parsed.date, today, completedPreviousDay),
        });
      }
    } catch {
      setState({
        date: today,
        checksCompleted: Array(readinessChecks.length).fill(false),
        streak: 0,
      });
    }
    setIsReady(true);
  }, [today, readinessChecks.length]);

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
        streak: nextStreak(current.streak, wasAllChecks, nowAllChecks),
      };
    });
  }

  function resetToday() {
    setState((current) => ({
      ...current,
      checksCompleted: Array(readinessChecks.length).fill(false),
    }));
  }

  function loadDrill(drill: PacingDrill) {
    setScriptText(drill.template);
    setTargetSeconds(drill.targetSeconds);
    setWpm(drill.wpm);
  }

  function nextDrill() {
    const nextIdx = (drillIndex + 1) % drills.length;
    setDrillIndex(nextIdx);
    loadDrill(drills[nextIdx]);
  }

  // Pacing calculations
  const words = useMemo(() => {
    return scriptText.trim() ? scriptText.trim().split(/\s+/) : [];
  }, [scriptText]);

  const wordCount = words.length;
  const estimatedSeconds = wordCount > 0 ? Math.round((wordCount / wpm) * 60) : 0;
  const timeDifference = estimatedSeconds - targetSeconds;

  const hookDurationSeconds = ((Math.min(wordCount, 8)) / wpm) * 60;
  const recommendedCuts = Math.max(1, Math.floor(estimatedSeconds / 3.5));

  function copyFormattedScript() {
    if (!scriptText) return;
    // Format script with clean line breaks after sentence terminators and pauses
    const formatted = scriptText
      .replace(/([.?!])\s+/g, "$1\n\n")
      .concat(`\n\n--- [Pacing: ~${estimatedSeconds}s @ ${wpm} WPM | Target: ${targetSeconds}s] ---`);

    navigator.clipboard.writeText(formatted).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  async function captureEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCaptureStatus("sending");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "daily-pacing-calculator",
          locale,
          email,
          notes: `Daily Script Pacing Calculator capture. Target: ${targetSeconds}s, Estimated: ${estimatedSeconds}s (${wordCount} words @ ${wpm} WPM)`,
        }),
      });
      if (response.ok) {
        setCaptureStatus("saved");
        trackLeadSubmit("daily-pacing-calculator", locale);
      } else {
        setCaptureStatus("error");
      }
    } catch {
      setCaptureStatus("error");
    }
  }

  const completedChecksCount = state.checksCompleted.filter(Boolean).length;
  const isChecksComplete = completedChecksCount === readinessChecks.length && readinessChecks.length > 0;

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-[#ddd4c8] bg-[#fbf6ef] p-4 shadow-sm sm:p-7">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-[#ddd4c8] pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9f3c27]">
            {isEs ? "Calculadora de Ritmo de Video" : "Daily Video Script Pacing Calculator"}
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-[#101214] sm:text-4xl">
            {isEs ? "Ritmo de guion y duración estimada" : "Script pacing & teleprompter timing"}
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#5a6066]">
            {isEs
              ? "Calcula la duración exacta de tu guion, ajusta palabras por minuto y calibra la retención antes de grabar."
              : "Calculate exact spoken video duration, dial in speaking cadence, and calibrate viewer retention before hitting record."}
          </p>
        </div>
        <div className="shrink-0 rounded-xl bg-[#101214] px-4 py-3 text-center text-[#f6f1ea]">
          <div className="text-2xl font-semibold">{state.streak}</div>
          <div className="text-[11px] uppercase tracking-wide text-[#d8d0c7]">
            {isEs ? "Días de racha" : "Days streak"}
          </div>
        </div>
      </div>

      {/* Featured Daily Drill */}
      <section aria-labelledby="today-drill" className="mt-6 rounded-xl border border-[#e6c7bb] bg-[#fff4ee] p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9f3c27]">
            {isEs ? "Plantilla de ritmo de hoy" : "Today's Pacing Drill"} • {currentDrill.focus}
          </p>
          <button
            type="button"
            onClick={nextDrill}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-[#e6c7bb] bg-white px-3 py-1 text-xs font-medium text-[#9f3c27] hover:bg-[#fff4ee] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c84a2c]"
          >
            <RefreshCw className="size-3.5" aria-hidden="true" /> {isEs ? "Siguiente plantilla" : "Next drill"}
          </button>
        </div>
        <h2 id="today-drill" className="mt-2 text-lg font-semibold text-[#101214]">
          {currentDrill.title}
        </h2>
        <p className="mt-1 text-sm leading-6 text-[#5a6066]">{currentDrill.description}</p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => loadDrill(currentDrill)}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-[#9f3c27] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#853220] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9f3c27]"
          >
            <Sparkles className="size-3.5" aria-hidden="true" />
            {isEs ? "Cargar en editor de guion" : "Load into script editor"}
          </button>
          <span className="text-xs text-[#5a6066]">
            {isEs ? "Objetivo sugerido:" : "Suggested target:"} {currentDrill.targetSeconds}s @ {currentDrill.wpm} WPM
          </span>
        </div>
      </section>

      {/* Real-time Interactive Script Calculator */}
      <section aria-labelledby="calculator-controls" className="mt-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Gauge className="size-4 text-[#9f3c27]" aria-hidden="true" />
            <h2 id="calculator-controls" className="text-sm font-semibold text-[#101214]">
              {isEs ? "Editor y parámetros de lectura" : "Script editor & pacing controls"}
            </h2>
          </div>
          <button
            type="button"
            onClick={copyFormattedScript}
            disabled={wordCount === 0}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-[#ddd4c8] bg-white px-3 py-1 text-xs font-medium text-[#252a2d] hover:bg-[#f6f1ea] disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c84a2c]"
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-emerald-600" aria-hidden="true" />
                <span className="text-emerald-700">{isEs ? "¡Copiado!" : "Copied!"}</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5 text-[#5a6066]" aria-hidden="true" />
                <span>{isEs ? "Copiar para teleprónter" : "Copy teleprompter text"}</span>
              </>
            )}
          </button>
        </div>

        {/* Script Input Textarea */}
        <div className="mt-3">
          <label htmlFor="script-input" className="sr-only">
            {isEs ? "Texto del guion o diálogo" : "Script or dialogue text"}
          </label>
          <textarea
            id="script-input"
            rows={5}
            value={scriptText}
            onChange={(e) => setScriptText(e.target.value)}
            placeholder={
              isEs
                ? "Escribe o pega aquí el guion de tu video para calcular el tiempo exacto..."
                : "Type or paste your video script here to calculate exact spoken duration..."
            }
            className="w-full rounded-xl border border-[#ddd4c8] bg-white p-3.5 text-sm leading-relaxed text-[#101214] placeholder:text-[#8c827a] focus:border-[#c84a2c] focus:outline-none"
          />
        </div>

        {/* Cadence & Target Controls */}
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Target Format / Duration */}
          <div className="rounded-xl border border-[#ddd4c8] bg-[#f6f1ea] p-3">
            <label htmlFor="target-duration-select" className="text-xs font-semibold text-[#101214]">
              {isEs ? "Duración objetivo" : "Target duration"}
            </label>
            <select
              id="target-duration-select"
              value={targetSeconds}
              onChange={(e) => setTargetSeconds(Number(e.target.value))}
              className="mt-1.5 min-h-11 w-full rounded-lg border border-[#ddd4c8] bg-white px-3 text-sm text-[#101214] focus:border-[#c84a2c] focus:outline-none"
            >
              <option value={15}>{isEs ? "15 segundos (Reel rápido / Gancho)" : "15 seconds (Rapid Reel / Hook)"}</option>
              <option value={30}>{isEs ? "30 segundos (Problema + Solución)" : "30 seconds (Problem + Solution)"}</option>
              <option value={45}>{isEs ? "45 segundos (Tutorial de 3 pasos)" : "45 seconds (3-Step Tutorial)"}</option>
              <option value={60}>{isEs ? "60 segundos (Caso de estudio / Micro historia)" : "60 seconds (Case Study / Micro-Story)"}</option>
              <option value={90}>{isEs ? "90 segundos (Explicación a fondo)" : "90 seconds (In-depth Explainer)"}</option>
            </select>
          </div>

          {/* Speaking Pace (WPM) */}
          <div className="rounded-xl border border-[#ddd4c8] bg-[#f6f1ea] p-3">
            <label htmlFor="wpm-select" className="text-xs font-semibold text-[#101214]">
              {isEs ? "Cadencia de voz (PPM)" : "Speaking cadence (WPM)"}
            </label>
            <select
              id="wpm-select"
              value={wpm}
              onChange={(e) => setWpm(Number(e.target.value))}
              className="mt-1.5 min-h-11 w-full rounded-lg border border-[#ddd4c8] bg-white px-3 text-sm text-[#101214] focus:border-[#c84a2c] focus:outline-none"
            >
              <option value={160}>{isEs ? "160 PPM (Ritmo dinámico / TikTok / Gancho)" : "160 WPM (Dynamic / TikTok / Rapid)"}</option>
              <option value={140}>{isEs ? "140 PPM (Conversacional / Natural)" : "140 WPM (Conversational / Natural)"}</option>
              <option value={120}>{isEs ? "120 PPM (Explicativo / Corporativo pausado)" : "120 WPM (Deliberate / Corporate)"}</option>
              <option value={100}>{isEs ? "100 PPM (Cinemático / Énfasis reflexivo)" : "100 WPM (Cinematic / Reflective)"}</option>
            </select>
          </div>
        </div>

        {/* Real-time Diagnostics Grid */}
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <div className="rounded-xl border border-[#ddd4c8] bg-white p-3 text-center">
            <span className="text-[11px] font-medium uppercase tracking-wide text-[#5a6066]">
              {isEs ? "Palabras" : "Words"}
            </span>
            <div className="mt-0.5 text-2xl font-bold text-[#101214]">{wordCount}</div>
          </div>

          <div className="rounded-xl border border-[#ddd4c8] bg-white p-3 text-center">
            <span className="text-[11px] font-medium uppercase tracking-wide text-[#5a6066]">
              {isEs ? "Tiempo estimado" : "Est. duration"}
            </span>
            <div className="mt-0.5 text-2xl font-bold text-[#9f3c27]">
              {estimatedSeconds}s
            </div>
          </div>

          <div className="rounded-xl border border-[#ddd4c8] bg-white p-3 text-center">
            <span className="text-[11px] font-medium uppercase tracking-wide text-[#5a6066]">
              {isEs ? "Gancho (8 pal.)" : "Hook (8 wds)"}
            </span>
            <div className="mt-0.5 text-2xl font-bold text-[#101214]">
              {hookDurationSeconds.toFixed(1)}s
            </div>
          </div>

          <div className="rounded-xl border border-[#ddd4c8] bg-white p-3 text-center">
            <span className="text-[11px] font-medium uppercase tracking-wide text-[#5a6066]">
              {isEs ? "Cortes sugeridos" : "Rec. cuts"}
            </span>
            <div className="mt-0.5 text-2xl font-bold text-[#101214]">
              ~{recommendedCuts}
            </div>
          </div>
        </div>

        {/* Pacing Diagnostic Feedback Banner */}
        <div
          className={`mt-4 rounded-xl border p-3.5 text-sm font-medium ${
            wordCount === 0
              ? "border-[#ddd4c8] bg-[#f6f1ea] text-[#5a6066]"
              : Math.abs(timeDifference) <= 2
                ? "border-emerald-600/50 bg-emerald-50 text-emerald-950"
                : timeDifference > 2
                  ? "border-amber-600/50 bg-amber-50 text-amber-950"
                  : "border-sky-600/50 bg-sky-50 text-sky-950"
          }`}
        >
          <div className="flex items-start gap-2.5">
            <Clock className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <div>
              {wordCount === 0 ? (
                <p>{isEs ? "Escribe un guion o carga una plantilla para ver el diagnóstico." : "Enter script text or load a drill to calculate pacing diagnostics."}</p>
              ) : Math.abs(timeDifference) <= 2 ? (
                <p>
                  {isEs
                    ? `Ajuste óptimo: ${estimatedSeconds}s calculados para el objetivo de ${targetSeconds}s. La cadencia encaja con los cortes recomendados.`
                    : `Optimal timing: ${estimatedSeconds}s estimated for a ${targetSeconds}s target. Cadence fits comfortably within platform limits.`}
                </p>
              ) : timeDifference > 2 ? (
                <p>
                  {isEs
                    ? `Exceso de tiempo: +${timeDifference}s sobre el objetivo (${estimatedSeconds}s vs ${targetSeconds}s). Reduce aprox. ${Math.round((timeDifference / 60) * wpm)} palabras o aumenta la cadencia.`
                    : `Over target by +${timeDifference}s (${estimatedSeconds}s vs ${targetSeconds}s target). Trim approximately ${Math.round((timeDifference / 60) * wpm)} words or increase delivery speed.`}
                </p>
              ) : (
                <p>
                  {isEs
                    ? `Espacio disponible: ${Math.abs(timeDifference)}s libres (${estimatedSeconds}s vs ${targetSeconds}s). Hay margen para pausas visuales de apoyo o demostración.`
                    : `Under target by ${Math.abs(timeDifference)}s (${estimatedSeconds}s vs ${targetSeconds}s target). Room for b-roll action holds and visual pauses.`}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Daily Timing & Delivery Readiness Checklist */}
      <section aria-labelledby="readiness-checks" className="mt-6 border-t border-[#ddd4c8] pt-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 id="readiness-checks" className="text-sm font-semibold text-[#101214]">
              {isEs ? "Verificaciones de ritmo y entrega antes de grabar" : "Pre-record pacing & delivery checks"}
            </h2>
            <p className="mt-0.5 text-xs text-[#5a6066]">
              {isEs
                ? "Completa las 3 verificaciones para registrar tu avance diario."
                : "Complete all 3 checks to maintain your daily production streak."}
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
              ? "El pase de ritmo de hoy está guardado en este dispositivo."
              : "Today's script pacing pass is saved on this device."}
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

      {/* Lightweight Email Capture Block */}
      <section aria-labelledby="daily-pacing-email" className="mt-6 rounded-xl bg-[#101214] p-4 text-[#f6f1ea] sm:p-5">
        <div className="flex gap-3">
          <Mail className="mt-0.5 size-5 shrink-0 text-[#f0b384]" aria-hidden="true" />
          <div>
            <h2 id="daily-pacing-email" className="text-sm font-semibold">
              {isEs ? "Plantillas Semanales de Ritmo y Guion" : "Weekly Script Pacing & Teleprompter Templates"}
            </h2>
            <p className="mt-1 text-xs leading-5 text-[#d8d0c7]">
              {isEs
                ? "Recibe plantillas de ritmo y fórmulas de retención en tu correo. El progreso diario permanece en este dispositivo."
                : "Save your email to receive weekly pacing frameworks and teleprompter drills. Progress stays on this device."}
            </p>
          </div>
        </div>

        {captureStatus === "saved" ? (
          <p className="mt-4 text-sm text-emerald-300">{isEs ? "Correo guardado." : "Email saved."}</p>
        ) : (
          <form onSubmit={captureEmail} className="mt-4 flex flex-col gap-2 sm:flex-row">
            <label className="sr-only" htmlFor="daily-pacing-email-input">
              {isEs ? "Dirección de correo electrónico" : "Email address"}
            </label>
            <input
              id="daily-pacing-email-input"
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
              ? "No se pudo guardar el correo. Tu calculadora sigue funcionando en este dispositivo."
              : "Email could not be saved. Your pacing calculator still works on this device."}
          </p>
        ) : null}
      </section>
    </div>
  );
}
