"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, MessageCircle, Send, Sparkles, Trophy } from "lucide-react";
import { site } from "@/lib/site";
import { whatsappHref } from "@/lib/packages";
import { trackLeadSubmit } from "@/lib/analytics-events";

type Locale = "en" | "es";

interface VideoStrategyAssessmentProps {
  locale?: Locale;
}

export function VideoStrategyAssessment({ locale = "en" }: VideoStrategyAssessmentProps) {
  const isEs = locale === "es";

  // Nothing is pre-answered: the panel used to open at 100/100 because every
  // default was the best option, which made the score meaningless.
  const [bilingual, setBilingual] = useState<string>("");
  const [verticalRatio, setVerticalRatio] = useState<string>("");
  const [audioCaptions, setAudioCaptions] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("");
  const [editing, setEditing] = useState<string>("");

  const [clientName, setClientName] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const points = {
    bilingual: bilingual === "yes" ? 15 : bilingual === "no" ? 0 : null,
    vertical: verticalRatio === "high" ? 15 : verticalRatio === "medium" ? 8 : verticalRatio === "low" ? 0 : null,
    captions: audioCaptions === "yes" ? 10 : audioCaptions === "no" ? 0 : null,
    frequency: frequency === "daily" || frequency === "weekly" ? 10 : frequency === "occasional" ? 0 : null,
    editing: editing === "editor" ? 10 : editing === "self" ? 5 : editing === "none" ? 0 : null,
  } as const;

  const answeredCount = Object.values(points).filter((value) => value !== null).length;
  const totalQuestions = 5;

  // Score Calculation: only a complete set of answers earns a score.
  const score =
    answeredCount === totalQuestions
      ? Math.min(
          40 +
            (points.bilingual ?? 0) +
            (points.vertical ?? 0) +
            (points.captions ?? 0) +
            (points.frequency ?? 0) +
            (points.editing ?? 0),
          100,
        )
      : null;

  // The weakest answered area drives the recommendation and the next step.
  const weakestKey =
    score === null
      ? null
      : (Object.keys(points) as (keyof typeof points)[]).reduce((weakest, key) =>
          (points[key] ?? 0) < (points[weakest] ?? 0) ? key : weakest,
        );

  const weakestCopy = {
    bilingual: {
      label: isEs ? "Publicas en un solo idioma" : "You publish in one language",
      text: isEs
        ? "Tu punto más débil: publicas en un solo idioma. El subtitulado bilingüe abre el mismo video a las dos audiencias de South Florida."
        : "Your weakest point: you publish in one language. Bilingual subtitling opens the same video to both South Florida audiences.",
      href: isEs ? "/es/servicio-de-subtitulado-bilingue-de-video" : "/services/bilingual-video-subtitling-service",
      linkLabel: isEs ? "Ver el servicio de subtitulado bilingüe" : "See bilingual subtitling",
    },
    vertical: {
      label: isEs ? "Poco video vertical 9:16" : "Little 9:16 vertical video",
      text: isEs
        ? "Tu punto más débil: poco video vertical. Los Reels y Shorts en 9:16 son el formato que las plataformas empujan hoy."
        : "Your weakest point: little vertical video. 9:16 Reels and Shorts are the format the platforms push today.",
      href: isEs ? "/es/editor-de-reels-fort-lauderdale" : "/services/reels-editor-fort-lauderdale",
      linkLabel: isEs ? "Ver edición de Reels" : "See Reels editing",
    },
    captions: {
      label: isEs ? "Videos sin subtítulos claros" : "Videos without clear captions",
      text: isEs
        ? "Tu punto más débil: videos sin subtítulos o con audio difícil de seguir. La mayoría de tu audiencia mira sin sonido."
        : "Your weakest point: videos without captions or with hard-to-follow audio. Most of your audience watches on mute.",
      href: isEs ? "/es/servicio-de-subtitulado-bilingue-de-video" : "/services/bilingual-video-subtitling-service",
      linkLabel: isEs ? "Ver subtitulado bilingüe" : "See bilingual subtitling",
    },
    frequency: {
      label: isEs ? "Publicas poco" : "You publish rarely",
      text: isEs
        ? "Tu punto más débil: publicas poco. Un ritmo semanal sostenido vale más que un esfuerzo ocasional."
        : "Your weakest point: you publish rarely. A steady weekly rhythm beats an occasional push.",
      href: isEs ? "/es/precios" : "/pricing",
      linkLabel: isEs ? "Ver planes y precios" : "See plans and pricing",
    },
    editing: {
      label: isEs ? "La edición se acumula" : "Editing piles up",
      text: isEs
        ? "Tu punto más débil: la edición se acumula. Delegarla convierte tu material en publicaciones constantes."
        : "Your weakest point: editing piles up. Delegating it turns your footage into steady publishing.",
      href: isEs ? "/es/contratar-editor-de-video-remoto" : "/services/hire-remote-video-editor",
      linkLabel: isEs ? "Ver edición remota" : "See remote editing",
    },
  } as const;

  const weakest = weakestKey ? weakestCopy[weakestKey] : null;

  const getTierInfo = () => {
    if (score !== null && score >= 85) {
      return {
        badge: isEs ? "Marca Digital de Alto Desempeño" : "High-Performance Digital Brand",
        desc: isEs
          ? "Tu estrategia de video tiene bases sólidas. Ajustar el ritmo de edición y producir tu contenido en lotes mensuales aumentará tu conversión."
          : "Your video strategy has strong foundations. Fine-tuning editing pacing and a steady monthly production rhythm will scale conversion.",
      };
    } else if (score !== null && score >= 65) {
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
        ? "Tu marca se beneficiará de guiones claros y de delegar la posproducción remota."
        : "Your brand will benefit from clearer scripts and delegating remote post-production.",
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
        `- ${isEs ? "Frecuencia de Publicación" : "Publishing Frequency"}: ${frequency}\n` +
        `- ${isEs ? "Quién Edita" : "Who Edits"}: ${editing}\n`
    );
    return `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  // The data-section is what makes this tool's events attributable: without it
  // track.js walks up to no marker and reports cta_position "page", so every
  // click here is counted and indistinguishable from any other on the page.
  return (
    <div data-section="video_strategy_assessment" className="rounded-2xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 shadow-sm sm:p-8">
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
              {isEs ? "3. ¿Tus videos llevan subtítulos y el audio se escucha claro?" : "3. Do your videos include captions and clear, easy-to-follow audio?"}
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
          {/* Q5: WHO EDITS */}
          <div>
            <label className="block text-xs font-semibold uppercase text-[#5a6066]">
              {isEs ? "5. ¿Quién edita tus videos hoy?" : "5. Who edits your videos today?"}
            </label>
            <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
              {[
                { id: "editor", label: isEs ? "Un editor o agencia" : "An editor or agency" },
                { id: "self", label: isEs ? "Yo o mi equipo" : "Me or my team" },
                { id: "none", label: isEs ? "Nadie, se acumulan" : "Nobody, they pile up" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setEditing(opt.id)}
                  className={`rounded-xl border p-3 font-medium transition-all ${
                    editing === opt.id
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
                {score === null
                  ? isEs
                    ? `${answeredCount} de ${totalQuestions}`
                    : `${answeredCount} of ${totalQuestions}`
                  : `${score} / 100 Pts`}
              </span>
            </div>

            {score === null ? (
              <div className="mt-4 border-b border-white/10 pb-6">
                <p className="text-sm leading-relaxed text-[#d8d0c7]">
                  {isEs
                    ? "Responde las 5 preguntas y aquí aparece tu calificación, tu punto más débil y el servicio que lo resuelve."
                    : "Answer all 5 questions and your score appears here, with your weakest point and the service that fixes it."}
                </p>
              </div>
            ) : (
              <div className="mt-4 border-b border-white/10 pb-6">
                <div className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {score}%
                </div>
                <div className="mt-2 text-xs font-semibold text-[#e85d3e]">{tierInfo.badge}</div>
                <p className="mt-2 text-xs leading-relaxed text-[#d8d0c7]">{tierInfo.desc}</p>
                {weakest ? (
                  <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs leading-relaxed text-[#f6f1ea]">{weakest.text}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <a
                        href={weakest.href}
                        className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white/10 px-4 text-xs font-semibold text-white hover:bg-white/20"
                      >
                        {weakest.linkLabel}
                        <ArrowRight className="size-3.5" aria-hidden="true" />
                      </a>
                      <a
                        href={whatsappHref(
                          site.phone.e164,
                          isEs
                            ? `Hola Esteban, hice el diagnóstico de video y mi calificación fue ${score}/100. Mi punto más débil: ${weakest.label}. Quiero hablar del siguiente paso.`
                            : `Hi Esteban, I took the video assessment and scored ${score}/100. My weakest point: ${weakest.label}. I want to talk about the next step.`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#1faa55] px-4 text-xs font-semibold text-white hover:bg-[#178a44]"
                      >
                        <MessageCircle className="size-3.5" aria-hidden="true" />
                        {isEs ? "Hablarlo por WhatsApp" : "Talk it over on WhatsApp"}
                      </a>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
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
                disabled={score === null}
                className="mt-2 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] text-xs font-semibold text-white hover:bg-[var(--em-accent-ink-hover)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ArrowRight className="size-4" aria-hidden="true" />
                {isEs ? "Obtener Plan de Acción de Video" : "Get Video Action Plan"}
              </button>
              {score === null ? (
                <p className="text-[11px] leading-relaxed text-[#d8d0c7]">
                  {isEs
                    ? "Responde las 5 preguntas para activar tu plan de acción."
                    : "Answer all 5 questions to unlock your action plan."}
                </p>
              ) : null}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
