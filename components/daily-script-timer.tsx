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
  { id: "15s", name: "15s Story / Hook", seconds: 15, description: "Quick hook or Instagram Story" },
  { id: "30s", name: "30s Reel / TikTok", seconds: 30, description: "Standard short-form video" },
  { id: "60s", name: "60s Short / Video", seconds: 60, description: "In-depth breakdown" },
  { id: "90s", name: "90s Explainer", seconds: 90, description: "Detailed walkthrough" },
];

type SpeedPreset = {
  wpm: number;
  label: string;
};

const SPEEDS: SpeedPreset[] = [
  { wpm: 130, label: "Conversational (130 WPM)" },
  { wpm: 150, label: "Natural (150 WPM)" },
  { wpm: 170, label: "Upbeat (170 WPM)" },
];

const TEMPLATES = [
  {
    title: "Problem & 10-Second Fix",
    formatId: "30s",
    text: "Hook: If your [topic] is running into [common problem], here is the 10-second fix.\n\nPoint 1: Instead of [mistake], switch to [action].\nPoint 2: Make sure your [detail] is set before recording.\n\nNext Step: Save this setup for your next video session.",
  },
  {
    title: "Behind-The-Scenes Process",
    formatId: "15s",
    text: "Hook: Here is what goes into [craft or workflow] before the final cut.\n\nCore Takeaway: Three quick steps from raw setup to final export.\n\nNext Step: Follow for more daily production breakdowns.",
  },
  {
    title: "Common Industry Myth vs Reality",
    formatId: "30s",
    text: "Hook: Stop assuming that [topic] requires expensive equipment.\n\nPoint 1: Good audio and clear lighting matter far more than resolution.\nPoint 2: A simple 3-second hook keeps viewer retention higher.\n\nNext Step: Drop your questions below.",
  },
  {
    title: "3-Point Action Checklist",
    formatId: "60s",
    text: "Hook: 3 details you must verify before recording your next vertical video.\n\nStep 1: Check your lighting angle to avoid harsh overhead shadows.\nStep 2: Keep the microphone within 6 inches for crisp speech clarity.\nStep 3: Keep text overlays inside the 9:16 vertical safe zone.\n\nNext Step: Bookmark this checklist for your next shoot.",
  },
  {
    title: "Before & After Visual Comparison",
    formatId: "30s",
    text: "Hook: Look at the difference between raw footage and a finished 9:16 edit.\n\nPoint 1: Fast pacing cuts remove dead air and filler words.\nPoint 2: Dynamic subtitles ensure clarity even when audio is muted.\n\nNext Step: Save this reference for your next edit.",
  },
  {
    title: "Immediate Pacing Fix for Second 1",
    formatId: "30s",
    text: "Hook: The single reason vertical videos lose viewers in second 1 is a slow opening.\n\nPoint 1: Start directly with the action shot or core question.\nPoint 2: Introduce on-screen text in the first two seconds.\n\nNext Step: Test this structure on your next clip.",
  },
  {
    title: "Direct Customer Question & Answer",
    formatId: "60s",
    text: "Hook: We get asked this question every week: [frequent question]?\n\nExplanation: Here is the direct breakdown in under 45 seconds.\nKey Detail: Focus on [core insight] and skip unnecessary preamble.\n\nNext Step: Comment your question for the next breakdown.",
  },
];

const TASKS = [
  "Read script aloud against the target time budget (15s / 30s / 60s).",
  "Confirm the core hook or topic appears in the first 3 seconds.",
  "Verify captions and key subject remain inside the 9:16 safe area.",
];

type DailyState = {
  date: string;
  completed: boolean[];
  streak: number;
};

const storageKey = "esteban-media-daily-script-timer";

function localDateKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function templateForTodayIndex() {
  const dayNumber = Math.floor(new Date().setHours(0, 0, 0, 0) / 86_400_000);
  return dayNumber % TEMPLATES.length;
}

export function DailyScriptTimer() {
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
          locale: "en",
          email,
          notes: `Daily Script Timer capture. Target format: ${selectedFormat.seconds}s, WPM: ${wpm}, Word count: ${wordCount}`,
        }),
      });
      if (response.ok) {
        setCaptureStatus("saved");
        trackLeadSubmit("daily-script-timer", "en");
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
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-[#ddd4c8] pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9f3c27]">
            Daily Video Tool
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-[#101214] sm:text-4xl">
            Daily Script Timer &amp; Pacing Calculator
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#5a6066]">
            Calculate word budgets, test speaking pace against 15s/30s/60s formats, and complete your daily rehearsal checks.
          </p>
        </div>
        <div className="shrink-0 rounded-xl bg-[#101214] px-4 py-3 text-center text-[#f6f1ea]">
          <div className="text-2xl font-semibold">{state.streak}</div>
          <div className="text-[11px] uppercase tracking-wide text-[#d8d0c7]">Days streak</div>
        </div>
      </div>

      {/* Target Format & Speaking Pace Controls */}
      <section aria-labelledby="timing-controls" className="mt-6 space-y-4">
        <h2 id="timing-controls" className="text-sm font-semibold text-[#101214]">
          1. Select Target Duration &amp; Speaking Pace
        </h2>
        
        {/* Format Selector */}
        <div>
          <span className="text-xs font-medium text-[#5a6066]">Video Format Target</span>
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

        {/* Speed Selector */}
        <div>
          <span className="text-xs font-medium text-[#5a6066]">
            Speaking Speed (Words Per Minute)
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

      {/* Script Editor & Stats Panel */}
      <section aria-labelledby="script-editor" className="mt-6">
        <div className="flex items-center justify-between gap-3">
          <h2 id="script-editor" className="text-sm font-semibold text-[#101214]">
            2. Draft or Paste Your Video Script
          </h2>
          <button
            type="button"
            onClick={nextTemplate}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-[#e6c7bb] bg-white px-3 py-1 text-xs font-medium text-[#9f3c27] hover:bg-[#fff4ee] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c84a2c]"
          >
            <RefreshCw className="size-3.5" aria-hidden="true" />
            Load Framework ({currentTemplate.title})
          </button>
        </div>

        <div className="mt-2">
          <label htmlFor="video-script-input" className="sr-only">
            Video script content
          </label>
          <textarea
            id="video-script-input"
            rows={7}
            value={script}
            onChange={(e) => setScript(e.target.value)}
            placeholder="Type or paste your short-form script here..."
            className="w-full rounded-xl border border-[#ddd4c8] bg-white p-3.5 text-sm leading-6 text-[#101214] placeholder:text-[#5a6066] focus:border-[#c84a2c] focus:outline-none"
          />
        </div>

        {/* Live Calculation Bar */}
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <div className="rounded-xl border border-[#ddd4c8] bg-[#f6f1ea] p-3 text-center">
            <div className="text-xs text-[#5a6066]">Word Count</div>
            <div className="mt-1 text-xl font-semibold text-[#101214]">{wordCount}</div>
            <div className="text-[11px] text-[#5a6066]">Budget: ~{maxRecommendedWords} words</div>
          </div>

          <div className="rounded-xl border border-[#ddd4c8] bg-[#f6f1ea] p-3 text-center">
            <div className="text-xs text-[#5a6066]">Estimated Time</div>
            <div className="mt-1 text-xl font-semibold text-[#101214]">
              {formatTime(estimatedSeconds)}
            </div>
            <div className="text-[11px] text-[#5a6066]">{estimatedSeconds}s calculated</div>
          </div>

          <div className="rounded-xl border border-[#ddd4c8] bg-[#f6f1ea] p-3 text-center">
            <div className="text-xs text-[#5a6066]">Target Limit</div>
            <div className="mt-1 text-xl font-semibold text-[#101214]">{selectedFormat.seconds}s</div>
            <div className="text-[11px] text-[#5a6066]">{selectedFormat.name}</div>
          </div>

          <div className="rounded-xl border border-[#ddd4c8] bg-[#f6f1ea] p-3 text-center">
            <div className="text-xs text-[#5a6066]">Pacing Status</div>
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
                {diffSeconds > 0 ? `+${diffSeconds}s over` : diffSeconds === 0 ? "Exact fit" : `${Math.abs(diffSeconds)}s buffer`}
              </span>
            </div>
            <div className="text-[11px] text-[#5a6066]">
              {diffSeconds > 0 ? "Trim words" : "Pacing on target"}
            </div>
          </div>
        </div>

        {/* Copy Button */}
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={copyScript}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-[#ddd4c8] bg-white px-4 py-2 text-xs font-medium text-[#252a2d] hover:bg-[#f6f1ea] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c84a2c]"
          >
            {copied ? (
              <>
                <Check className="size-4 text-emerald-600" aria-hidden="true" /> Script copied!
              </>
            ) : (
              <>
                <Copy className="size-4 text-[#5a6066]" aria-hidden="true" /> Copy script
              </>
            )}
          </button>
        </div>
      </section>

      {/* Daily 3-Step Verification Checklist */}
      <section aria-labelledby="daily-rehearsal-checks" className="mt-6 border-t border-[#ddd4c8] pt-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 id="daily-rehearsal-checks" className="text-sm font-semibold text-[#101214]">
              3. Today&apos;s Rehearsal &amp; Safe-Zone Checks
            </h2>
            <p className="mt-0.5 text-xs text-[#5a6066]">
              Complete all 3 checks to maintain your daily production streak.
            </p>
          </div>
          <span className="text-xs font-medium text-[#5a6066]">
            {completedCount} of {TASKS.length}
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
            Today&apos;s script pacing and rehearsal pass is saved on this device.
          </p>
        ) : null}

        <button
          type="button"
          onClick={resetToday}
          className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-[#5a6066] hover:bg-[#ece5da] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c84a2c]"
        >
          <RotateCcw className="size-4" aria-hidden="true" /> Reset today
        </button>
      </section>

      {/* Lightweight Email Capture */}
      <section aria-labelledby="daily-script-email" className="mt-6 rounded-xl bg-[#101214] p-4 text-[#f6f1ea] sm:p-5">
        <div className="flex gap-3">
          <Mail className="mt-0.5 size-5 shrink-0 text-[#f0b384]" aria-hidden="true" />
          <div>
            <h2 id="daily-script-email" className="text-sm font-semibold">
              Weekly Script Timing &amp; Format Updates
            </h2>
            <p className="mt-1 text-xs leading-5 text-[#d8d0c7]">
              Save your email to receive weekly script timing updates and short-form video formatting tips. Progress stays on this device.
            </p>
          </div>
        </div>

        {captureStatus === "saved" ? (
          <p className="mt-4 text-sm text-emerald-300">Email saved.</p>
        ) : (
          <form onSubmit={captureEmail} className="mt-4 flex flex-col gap-2 sm:flex-row">
            <label className="sr-only" htmlFor="daily-script-timer-email">
              Email address
            </label>
            <input
              id="daily-script-timer-email"
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
            Email could not be saved. Your timer and rehearsal checks still work on this device.
          </p>
        ) : null}
      </section>
    </div>
  );
}
