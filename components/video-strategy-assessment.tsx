"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Send, Sparkles, Trophy } from "lucide-react";
import { site } from "@/lib/site";
import { trackLeadSubmit } from "@/lib/analytics-events";

type Locale = "en" | "es";

interface VideoStrategyAssessmentProps {
  locale?: Locale;
}

export function VideoStrategyAssessment({ locale = "en" }: VideoStrategyAssessmentProps) {
  const isEs = locale === "es";

  const [bilingual, setBilingual] = useState<string>("yes");
  const [verticalRatio, setVerticalRatio] = useState<string>("high");
  const [audioCaptions, setAudioCaptions] = useState<string>("yes");
  const [frequency, setFrequency] = useState<string>("weekly");

  const [clientName, setClientName] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Score Calculation
  const calculateScore = () => {
    let score = 50;

    if (bilingual === "yes") score += 15;
    if (verticalRatio === "high") score += 15;
    else if (verticalRatio === "medium") score += 8;

    if (audioCaptions === "yes") score += 10;
    if (frequency === "daily" || frequency === "weekly") score += 10;

    return Math.min(score, 100);
  };

  const score = calculateScore();

  const getTierInfo = () => {
    if (score >= 85) {
      return {
        badge: isEs ? "Marca Digital de Alto Desempeño" : "High-Performance Digital Brand",
        desc: isEs
          ? "Tu estrategia de video tiene bases solidas. Optimizar la edición rítmica y el batching mensual aumentará tu conversión."
          : "Your video strategy has strong foundations. Fine-tuning editing pacing and batch production will scale conversion.",
      };
    } else if (score >= 65) {
      return {
        badge: isEs ? "Marca en Crecimiento con Oportunidad" : "Growth Brand with High Potential",
        desc: isEs
          ? "Tienes buena frecuencia de contenido, pero implementar edición bilingüe y zonas seguras 9:16 desbloqueará mayor alcance en South Florida."
          : "Good content frequency, but adding bilingual editing & 9:16 safe zones will unlock broader South Florida reach.",
      };
    }
    return {
      badge: isEs ? "Oportunidad de Transformación de Contenido" : "Content Transformation Opportunity",
      desc: isEs
        ? "Tu marca se beneficiará enormemente de estructurar guiones direct-response y delegar la posproducción remota."
        : "Your brand will benefit immensely from structuring direct-response scripts and delegating remote video editing.",
    };
  };

  const tierInfo = getTierInfo();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "strategy-assessment",
        locale,
        name: clientName,
        email: clientEmail,
        phone: clientPhone,
        score,
      }),
      });
      if (!response.ok) throw new Error("Lead submission failed");
      trackLeadSubmit("strategy-assessment", locale);
      setSubmitted(true);
    } catch (err) {
      console.error("Lead submission error:", err);
    }
  };

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(
      isEs
        ? `Resultado Diagnóstico de Video Strategy (${score}/100) - ${clientName || "Cliente"}`
        : `Video Strategy Assessment Result (${score}/100) - ${clientName || "Client"}`
    );
    const body = encodeURIComponent(
      `--- ${isEs ? "DIAGNÓSTICO DE ESTRATEGIA DE VIDEO" : "VIDEO STRATEGY ASSESSMENT RESULT"} ---\n\n` +
        `Score: ${score}/100 (${tierInfo.badge})\n\n` +
        `${isEs ? "Nombre" : "Name"}: ${clientName}\n` +
        `Email: ${clientEmail}\n` +
        `${isEs ? "Teléfono" : "Phone"}: ${clientPhone || "N/A"}\n\n` +
        `${isEs ? "Respuestas Auditadas" : "Audited Answers"}:\n` +
        `- ${isEs ? "Contenido Bilingüe EN/ES" : "Bilingual EN/ES Content"}: ${bilingual}\n` +
        `- ${isEs ? "Proporción 9:16 Vertical" : "9:16 Vertical Ratio"}: ${verticalRatio}\n` +
        `- ${isEs ? "Audio & Subtítulos" : "Audio & Captions"}: ${audioCaptions}\n` +
        `- ${isEs ? "Frecuencia de Publicación" : "Publishing Frequency"}: ${frequency}\n`
    );
    return `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="rounded-2xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 shadow-sm sm:p-8">
      <div className="mb-6 border-b border-[#ddd4c8] pb-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--em-accent-ink)]">
          <Sparkles className="size-3.5" aria-hidden="true" />
          {isEs ? "Evaluación de Estrategia Digital" : "Bilingual Strategy Diagnostic"}
        </span>
        <h3 className="mt-1 font-serif text-3xl font-semibold text-[#101214]">
          {isEs ? "Diagnóstico de Estrategia de Video para South Florida" : "South Florida Video Strategy Assessment"}
        </h3>
        <p className="mt-2 text-sm text-[#5a6066]">
          {isEs
            ? "Responde 5 preguntas rápidas para calcular la calificación de alcance comercial de tu contenido."
            : "Answer 5 quick questions to calculate your brand's commercial video reach score."}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
        {/* QUESTIONS */}
        <div className="space-y-5">
          {/* Q1: BILINGUAL */}
          <div>
            <label className="block text-xs font-semibold uppercase text-[#5a6066]">
              {isEs ? "1. ¿Publicas contenido bilingüe (Inglés y Español)?" : "1. Do you publish bilingual English & Spanish content?"}
            </label>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              {[
                { id: "yes", label: isEs ? "Sí, en ambos idiomas" : "Yes, dual-language" },
                { id: "no", label: isEs ? "No, solo un idioma" : "No, single language" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setBilingual(opt.id)}
                  className={`rounded-xl border p-3 font-medium transition-all ${
                    bilingual === opt.id
                      ? "border-[#c84a2c] bg-[#c84a2c]/10 text-[var(--em-accent-ink)]"
                      : "border-[#ddd4c8] bg-[#f6f1ea] text-[#252a2d] hover:border-[#a93e29]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Q2: VERTICAL RATIO */}
          <div>
            <label className="block text-xs font-semibold uppercase text-[#5a6066]">
              {isEs ? "2. ¿Qué proporción de tus videos son formato 9:16 vertical?" : "2. What percentage of your videos are 9:16 vertical Reels/Shorts?"}
            </label>
            <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
              {[
                { id: "high", label: isEs ? "Más del 70%" : "Over 70%" },
                { id: "medium", label: isEs ? "Entre 30% y 70%" : "30% - 70%" },
                { id: "low", label: isEs ? "Menos del 30%" : "Under 30%" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setVerticalRatio(opt.id)}
                  className={`rounded-xl border p-3 font-medium transition-all ${
                    verticalRatio === opt.id
                      ? "border-[#c84a2c] bg-[#c84a2c]/10 text-[var(--em-accent-ink)]"
                      : "border-[#ddd4c8] bg-[#f6f1ea] text-[#252a2d] hover:border-[#a93e29]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Q3: AUDIO & CAPTIONS */}
          <div>
            <label className="block text-xs font-semibold uppercase text-[#5a6066]">
              {isEs ? "3. ¿Masterizan audio de diálogo e incluyen subtítulos animados?" : "3. Do you master dialogue audio (-14 LUFS) & add animated captions?"}
            </label>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              {[
                { id: "yes", label: isEs ? "Sí, siempre" : "Yes, always" },
                { id: "no", label: isEs ? "A veces o nunca" : "Sometimes / Never" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setAudioCaptions(opt.id)}
                  className={`rounded-xl border p-3 font-medium transition-all ${
                    audioCaptions === opt.id
                      ? "border-[#c84a2c] bg-[#c84a2c]/10 text-[var(--em-accent-ink)]"
                      : "border-[#ddd4c8] bg-[#f6f1ea] text-[#252a2d] hover:border-[#a93e29]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Q4: FREQUENCY */}
          <div>
            <label className="block text-xs font-semibold uppercase text-[#5a6066]">
              {isEs ? "4. ¿Con qué frecuencia publicas nuevo contenido de video?" : "4. How frequently do you publish new video content?"}
            </label>
            <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
              {[
                { id: "daily", label: isEs ? "Diario (15-30/mes)" : "Daily (15-30/mo)" },
                { id: "weekly", label: isEs ? "Semanal (4-8/mes)" : "Weekly (4-8/mo)" },
                { id: "occasional", label: isEs ? "Ocasional" : "Occasional" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setFrequency(opt.id)}
                  className={`rounded-xl border p-3 font-medium transition-all ${
                    frequency === opt.id
                      ? "border-[#c84a2c] bg-[#c84a2c]/10 text-[var(--em-accent-ink)]"
                      : "border-[#ddd4c8] bg-[#f6f1ea] text-[#252a2d] hover:border-[#a93e29]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SCORE DISPLAY & ACTION PLAN */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#ddd4c8] bg-[#101214] p-6 text-[#f6f1ea]">
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#e85d3e]">
                <Trophy className="size-3.5" aria-hidden="true" />
                {isEs ? "Calificación de Estrategia" : "Strategy Score"}
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">
                {score} / 100 Pts
              </span>
            </div>

            <div className="mt-4 border-b border-white/10 pb-6">
              <div className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {score}%
              </div>
              <div className="mt-2 text-xs font-semibold text-[#e85d3e]">{tierInfo.badge}</div>
              <p className="mt-2 text-xs leading-relaxed text-[#d8d0c7]">{tierInfo.desc}</p>
            </div>
          </div>

          {submitted ? (
            <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center">
              <CheckCircle2 className="mx-auto size-6 text-emerald-400" aria-hidden="true" />
              <h4 className="mt-2 text-sm font-semibold text-white">
                {isEs ? "¡Diagnóstico Guardado!" : "Assessment Saved!"}
              </h4>
              <p className="mt-1 text-xs text-[#d8d0c7]">
                {isEs ? "Haz clic abajo para consultar con Esteban el plan de acción." : "Click below to discuss your action plan with Esteban."}
              </p>
              <a
                href={getMailtoUrl()}
                className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-4 text-xs font-semibold text-white hover:bg-[var(--em-accent-ink-hover)]"
              >
                <Send className="size-3.5" aria-hidden="true" />
                {isEs ? "Enviar Resultado por Email" : "Send Score via Email"}
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-3 border-t border-white/10 pt-4">
              <p className="text-xs font-medium text-white">
                {isEs ? "Recibe tu informe de estrategia personalizado:" : "Receive your customized video audit report:"}
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder={isEs ? "Tu Nombre *" : "Your Name *"}
                  className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs text-white placeholder-white/50 focus:border-[#e85d3e] focus:outline-none"
                />
                <input
                  type="email"
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder={isEs ? "Tu Email *" : "Your Email *"}
                  className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs text-white placeholder-white/50 focus:border-[#e85d3e] focus:outline-none"
                />
              </div>
              <input
                type="tel"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder={isEs ? "Teléfono / WhatsApp (Opcional)" : "Phone / WhatsApp (Optional)"}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs text-white placeholder-white/50 focus:border-[#e85d3e] focus:outline-none"
              />

              <button
                type="submit"
                className="mt-2 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] text-xs font-semibold text-white hover:bg-[var(--em-accent-ink-hover)]"
              >
                <ArrowRight className="size-4" aria-hidden="true" />
                {isEs ? "Obtener Plan de Acción de Video" : "Get Video Action Plan"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
