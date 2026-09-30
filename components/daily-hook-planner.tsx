"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Mail, RefreshCw, RotateCcw } from "lucide-react";

const hooks = [
  {
    title: "The 3-Second Opening Error",
    framework: "The #1 mistake people make when filming [topic] is starting with a slow intro. Here is how to fix it in 3 seconds.",
    focus: "Visual opening shot",
  },
  {
    title: "Before You Record",
    framework: "Before you record your next video on [topic], check these 2 simple lighting and audio details.",
    focus: "Preparation check",
  },
  {
    title: "Common Misconception",
    framework: "Most people think [topic] requires expensive gear. Here is what actually matters most for viewer retention.",
    focus: "Clarity & framing",
  },
  {
    title: "3 Quick Steps",
    framework: "3 quick steps to turn raw [topic] footage into a clean 30-second social video.",
    focus: "Content structure",
  },
  {
    title: "The Visual Contrast Hook",
    framework: "Show the finished result first, then reveal the simple process behind [topic].",
    focus: "Pacing & hook",
  },
  {
    title: "Second-5 Dropoff Fix",
    framework: "If your videos lose attention at second 5, add on-screen captions right here.",
    focus: "Retention boost",
  },
  {
    title: "The 30-Second Structure",
    framework: "How to structure a 30-second [topic] video: 3s hook, 20s core point, 7s clear next step.",
    focus: "Format planning",
  },
];

const tasks = [
  "Select today's hook & visual opening frame.",
  "Structure key takeaway in under 15 seconds.",
  "Verify caption, on-screen text & end frame.",
];

type DailyState = {
  date: string;
  completed: boolean[];
  streak: number;
};

const storageKey = "esteban-media-daily-hook-planner";

function localDateKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function hookForTodayIndex() {
  const dayNumber = Math.floor(new Date().setHours(0, 0, 0, 0) / 86_400_000);
  return dayNumber % hooks.length;
}

export function DailyHookPlanner() {
  const [state, setState] = useState<DailyState>({ date: "", completed: [], streak: 0 });
  const [isReady, setIsReady] = useState(false);
  const [hookIndex, setHookIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [captureStatus, setCaptureStatus] = useState<"idle" | "sending" | "saved" | "error">("idle");
  const today = useMemo(localDateKey, []);

  useEffect(() => {
    setHookIndex(hookForTodayIndex());
  }, []);

  const currentHook = hooks[hookIndex % hooks.length];
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
    setState((current) => ({ ...current, completed: Array(tasks.length).fill(false) }));
  }

  function nextRandomHook() {
    setHookIndex((prev) => (prev + 1) % hooks.length);
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
          locale: "en",
          email,
          notes: `Daily Hook Planner capture. Selected hook: ${currentHook.title}`,
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
            Daily Video Hook Planner
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-[#101214] sm:text-4xl">
            Short-form video hook &amp; planning pass
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#5a6066]">
            Select a hook framework, complete the three checks, and track your daily video planning streak.
          </p>
        </div>
        <div className="shrink-0 rounded-xl bg-[#101214] px-4 py-3 text-center text-[#f6f1ea]">
          <div className="text-2xl font-semibold">{state.streak}</div>
          <div className="text-[11px] uppercase tracking-wide text-[#d8d0c7]">Days streak</div>
        </div>
      </div>

      <section aria-labelledby="today-hook" className="mt-6 rounded-xl border border-[#e6c7bb] bg-[#fff4ee] p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9f3c27]">
            Featured Hook Framework • {currentHook.focus}
          </p>

          <button
            type="button"
            onClick={nextRandomHook}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-[#e6c7bb] bg-white px-3 py-1 text-xs font-medium text-[#9f3c27] hover:bg-[#fff4ee] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c84a2c]"
          >
            <RefreshCw className="size-3.5" aria-hidden="true" /> Next hook
          </button>
        </div>
        <h2 id="today-hook" className="mt-2 text-lg font-semibold text-[#101214]">
          {currentHook.title}
        </h2>
        <p className="mt-2 text-sm italic leading-6 text-[#252a2d]">
          &ldquo;{currentHook.framework}&rdquo;
        </p>
      </section>

      <section aria-labelledby="daily-checklist" className="mt-6">
        <div className="flex items-center justify-between gap-3">
          <h2 id="daily-checklist" className="text-sm font-semibold text-[#101214]">
            Today&apos;s planning checks
          </h2>
          <span className="text-xs text-[#5a6066]">
            {completedCount} of {tasks.length}
          </span>
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
          <p className="mt-3 text-sm text-emerald-800">Today&apos;s hook planning pass is saved on this device.</p>
        ) : null}
        <button
          type="button"
          onClick={resetToday}
          className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-[#5a6066] hover:bg-[#ece5da] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c84a2c]"
        >
          <RotateCcw className="size-4" aria-hidden="true" /> Reset today
        </button>
      </section>

      <section aria-labelledby="daily-email" className="mt-6 rounded-xl bg-[#101214] p-4 text-[#f6f1ea] sm:p-5">
        <div className="flex gap-3">
          <Mail className="mt-0.5 size-5 shrink-0 text-[#f0b384]" aria-hidden="true" />
          <div>
            <h2 id="daily-email" className="text-sm font-semibold">
              Daily video hook updates
            </h2>
            <p className="mt-1 text-xs leading-5 text-[#d8d0c7]">
              Save an email with the site for daily video hook and format updates. Delivery is not automated; progress stays on this device.
            </p>
          </div>
        </div>
        {captureStatus === "saved" ? (
          <p className="mt-4 text-sm text-emerald-300">Email saved.</p>
        ) : (
          <form onSubmit={captureEmail} className="mt-4 flex flex-col gap-2 sm:flex-row">
            <label className="sr-only" htmlFor="daily-hook-email">
              Email address
            </label>
            <input
              id="daily-hook-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email address"
              className="min-h-11 min-w-0 flex-1 rounded-lg border border-white/20 bg-white/10 px-3 text-sm text-white placeholder:text-white/50 focus:border-[#f0b384] focus:outline-none"
            />
            <button
              type="submit"
              disabled={captureStatus === "sending"}
              className="min-h-11 rounded-full bg-[var(--em-accent-ink)] px-5 text-sm font-semibold text-white hover:bg-[var(--em-accent-ink-hover)] disabled:cursor-wait disabled:opacity-70"
            >
              {captureStatus === "sending" ? "Saving…" : "Save email"}
            </button>
          </form>
        )}
        {captureStatus === "error" ? (
          <p className="mt-3 text-xs text-[#ffb49e]">
            Email could not be saved. Your hook planner still works on this device.
          </p>
        ) : null}
      </section>
    </div>
  );
}
