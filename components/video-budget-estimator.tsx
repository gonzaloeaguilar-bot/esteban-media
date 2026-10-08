"use client";

import { useState } from "react";
import { Calculator, CheckCircle2, DollarSign, Send, Sparkles, Clock, ShieldCheck } from "lucide-react";
import { site } from "@/lib/site";
import { trackLeadSubmit } from "@/lib/analytics-events";
import {
  ARRANQUE_WEEKLY_TERMS,
  EXPRESS_MULTIPLIER,
  PRICING_BANDS,
  SHORT_FORM,
  VOLUME_MULTIPLIERS,
  usd,
  type PricingBandId,
} from "@/lib/pricing";

type Locale = "en" | "es";

// Short-form follows Starter: one video, five single videos, or the weekly
// Arranque cadence. The 15/30-a-month options stay for the other categories
// only: no owner-set short-form price exists at that volume.
const shortFormVolumes = [
  { id: "single", es: "1 Video (una sola vez)", en: "1 Video (just once)" },
  { id: "pack-5", es: "5 Videos (5 × 1 video)", en: "5 Videos (5 × 1 video)" },
  ...SHORT_FORM.weekly.map((o) => ({
    id: `weekly-${o.videosPerWeek}`,
    es: `${o.videosPerWeek} ${o.videosPerWeek === 1 ? "Video" : "Videos"} / Semana`,
    en: `${o.videosPerWeek} ${o.videosPerWeek === 1 ? "Video" : "Videos"} / Week`,
  })),
];
const otherVolumes = [
  { id: "single", es: "1 Video Individual", en: "1 Single Video" },
  { id: "pack-5", es: "Paquete de 5 Videos", en: "5-Video Starter Pack" },
  { id: "monthly-15", es: "15 Videos / Mes (Popular)", en: "15 Videos / Month (Popular)" },
  { id: "monthly-30", es: "30 Videos / Mes (Retainer)", en: "30 Videos / Month (Retainer)" },
];

interface VideoBudgetEstimatorProps {
  locale?: Locale;
}

export function VideoBudgetEstimator({ locale = "en" }: VideoBudgetEstimatorProps) {
  const isEs = locale === "es";

  const [serviceType, setServiceType] = useState<string>("social");
  const [volume, setVolume] = useState<string>("single");
  const [footageSource, setFootageSource] = useState<string>("supplied");
  const [speed, setSpeed] = useState<string>("standard");

  const [clientName, setClientName] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Estimation Logic
  // All figures come from lib/pricing.ts — the single source of truth for
  // published prices (bands, provenance, multipliers). Do not inline numbers
  // here; see that module and docs/pricing-basis.md.
  const isShortForm = serviceType === "social";
  const weeklyOption = SHORT_FORM.weekly.find((o) => `weekly-${o.videosPerWeek}` === volume);

  // Short-form is priced like Starter (lib/pricing.ts SHORT_FORM): from $100
  // per video, a 5-pack is five single videos, and the weekly cadence is the
  // Arranque weekly price. Paying weekly is for footage you film, delivered in
  // 48-72 hours, so it carries no on-location or express surcharge.
  const pickVolume = (id: string) => {
    setVolume(id);
    if (id.startsWith("weekly-")) {
      setFootageSource("supplied");
      setSpeed("standard");
    }
  };
  const pickService = (id: string) => {
    setServiceType(id);
    const valid = (id === "social" ? shortFormVolumes : otherVolumes).some((v) => v.id === volume);
    if (!valid) setVolume("single");
  };
  const pickFootage = (id: string) => {
    setFootageSource(id);
    if (id === "shoot" && volume.startsWith("weekly-")) setVolume("single");
  };
  const pickSpeed = (id: string) => {
    setSpeed(id);
    if (id === "express" && volume.startsWith("weekly-")) setVolume("single");
  };

  const calculateEstimate = () => {
    const standardTurnaround = isEs ? "3 - 5 Días Hábiles" : "3 - 5 Business Days";
    const expressTurnaround = isEs ? "24 - 48 Horas" : "24 - 48 Hours";

    if (isShortForm && weeklyOption) {
      const n = weeklyOption.videosPerWeek;
      return {
        priceRange: `${usd(weeklyOption.pricePerWeek)} USD`,
        period: isEs
          ? `por semana (${n} ${n === 1 ? "video" : "videos"})`
          : `per week (${n} ${n === 1 ? "video" : "videos"})`,
        turnaround: isEs
          ? `${ARRANQUE_WEEKLY_TERMS.deliveryHoursMin} - ${ARRANQUE_WEEKLY_TERMS.deliveryHoursMax} Horas por video`
          : `${ARRANQUE_WEEKLY_TERMS.deliveryHoursMin} - ${ARRANQUE_WEEKLY_TERMS.deliveryHoursMax} Hours per video`,
      };
    }

    if (isShortForm) {
      const videos = volume === "pack-5" ? SHORT_FORM.packOf : 1;
      let min = SHORT_FORM.perVideoFrom * videos;
      let max: number | null = null;
      if (footageSource === "shoot") {
        // Half-day on-location capture add-on, once per job.
        max = min + PRICING_BANDS["on-location"].baseMax;
        min += PRICING_BANDS["on-location"].baseMin;
      }
      const mult = speed === "express" ? EXPRESS_MULTIPLIER : 1;
      const lo = Math.round((min * mult) / 25) * 25;
      const hi = max === null ? null : Math.round((max * mult) / 25) * 25;
      return {
        priceRange: hi === null ? `${isEs ? "Desde" : "From"} ${usd(lo)} USD` : `${usd(lo)} - ${usd(hi)} USD`,
        period:
          volume === "pack-5"
            ? isEs ? "por paquete de 5 videos" : "per 5-video pack"
            : isEs ? "por video" : "per video",
        turnaround: speed === "express" ? expressTurnaround : standardTurnaround,
      };
    }

    const bandId: PricingBandId =
      serviceType in PRICING_BANDS && serviceType !== "on-location"
        ? (serviceType as PricingBandId)
        : "youtube";
    const band = PRICING_BANDS[bandId];
    let baseMin = band.baseMin;
    let baseMax = band.baseMax;

    // Volume multiplier
    let multMin = 1;
    let multMax = 1;
    let period = isEs ? "por proyecto" : "per project";

    if (volume === "pack-5") {
      ({ multMin, multMax } = VOLUME_MULTIPLIERS["pack-5"]);
      period = isEs ? "por paquete de 5 videos" : "per 5-video pack";
    } else if (volume === "monthly-15") {
      ({ multMin, multMax } = VOLUME_MULTIPLIERS["monthly-15"]);
      period = isEs ? "/ mes (15 videos)" : "/ month (15 videos)";
    } else if (volume === "monthly-30") {
      ({ multMin, multMax } = VOLUME_MULTIPLIERS["monthly-30"]);
      period = isEs ? "/ mes (30 videos)" : "/ month (30 videos)";
    }

    if (footageSource === "shoot") {
      // Half-day on-location capture add-on.
      baseMin += PRICING_BANDS["on-location"].baseMin;
      baseMax += PRICING_BANDS["on-location"].baseMax;
    }

    if (speed === "express") {
      multMin *= EXPRESS_MULTIPLIER;
      multMax *= EXPRESS_MULTIPLIER;
    }

    const finalMin = Math.round((baseMin * multMin) / 25) * 25;
    const finalMax = Math.round((baseMax * multMax) / 25) * 25;

    return {
      priceRange: `${usd(finalMin)} - ${usd(finalMax)} USD`,
      period,
      turnaround: speed === "express" ? expressTurnaround : standardTurnaround,
    };
  };

  const estimate = calculateEstimate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    trackLeadSubmit("budget-estimator", locale);

    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "budget-estimator",
        locale,
        name: clientName,
        email: clientEmail,
        phone: clientPhone,
        company,
        priceRange: estimate.priceRange,
        projectType: serviceType,
        footageStatus: footageSource,
      }),
    }).catch((err) => console.error("Lead submission error:", err));
  };

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(
      isEs
        ? `Cotización Estimada: ${estimate.priceRange} - ${clientName || "Cliente"}`
        : `Budget Estimate: ${estimate.priceRange} - ${clientName || "Client"}`
    );
    const body = encodeURIComponent(
      `--- ${isEs ? "ESTIMACIÓN DE PRESUPUESTO WEB" : "ESTIMATED BUDGET SCOPE"} ---\n\n` +
        `${isEs ? "Rango Estimado" : "Estimated Range"}: ${estimate.priceRange} ${estimate.period}\n` +
        `${isEs ? "Tiempo de Entrega" : "Turnaround"}: ${estimate.turnaround}\n\n` +
        `${isEs ? "Nombre" : "Name"}: ${clientName}\n` +
        `Email: ${clientEmail}\n` +
        `${isEs ? "Teléfono" : "Phone"}: ${clientPhone || "N/A"}\n` +
        `${isEs ? "Empresa" : "Company"}: ${company || "N/A"}\n\n` +
        `${isEs ? "Detalles del Alcance" : "Scope Details"}:\n` +
        `- ${isEs ? "Servicio" : "Service"}: ${serviceType}\n` +
        `- ${isEs ? "Volumen" : "Volume"}: ${volume}\n` +
        `- ${isEs ? "Material" : "Footage"}: ${footageSource}\n` +
        `- ${isEs ? "Velocidad" : "Speed"}: ${speed}\n`
    );
    return `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  // The data-section is what makes this tool's events attributable: without it
  // track.js walks up to no marker and reports cta_position "page", so every
  // click here is counted and indistinguishable from any other on the page.
  return (
    <div data-section="video_budget_estimator" className="rounded-2xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 shadow-sm sm:p-8">
      <div className="mb-8 border-b border-[#ddd4c8] pb-6">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--em-accent-ink)]">
          <Calculator className="size-4" aria-hidden="true" />
          {isEs ? "Calculadora de Presupuesto" : "Budget & Scope Estimator"}
        </span>
        <h3 className="mt-2 font-serif text-3xl font-semibold text-[#101214]">
          {isEs ? "Calcula el costo y tiempo de tu proyecto de video" : "Estimate your video editing cost & turnaround"}
        </h3>
        <p className="mt-2 text-sm text-[#5a6066]">
          {isEs
            ? "Selecciona los parámetros de tu contenido para obtener una estimación transparente en segundos."
            : "Select your content scope parameters to get an instant transparent project estimation."}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
        {/* INPUT FORM */}
        <div className="space-y-6">
          {/* 1. SERVICE TYPE */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5a6066]">
              {isEs ? "1. Tipo de Servicio de Video" : "1. Video Service Category"}
            </label>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs sm:grid-cols-3">
              {[
                { id: "social", label: isEs ? "Reels & TikTok Ads" : "Reels & TikTok Ads" },
                { id: "youtube", label: isEs ? "YouTube Formato Largo" : "Long-Form YouTube" },
                { id: "corporate", label: isEs ? "Capacitación SOP / HR" : "Corporate SOP / HR" },
                { id: "realestate", label: isEs ? "Dron & Bienes Raíces" : "Real Estate & Drone" },
                { id: "ecommerce", label: isEs ? "Producto / E-Commerce" : "Product E-Commerce" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => pickService(item.id)}
                  className={`rounded-xl border p-3 font-medium transition-all ${
                    serviceType === item.id
                      ? "border-[#c84a2c] bg-[#c84a2c]/10 text-[var(--em-accent-ink)]"
                      : "border-[#ddd4c8] bg-[#f6f1ea] text-[#252a2d] hover:border-[#a93e29]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. VOLUME / CADENCE */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5a6066]">
              {isEs ? "2. Volumen de Contenido" : "2. Content Volume & Cadence"}
            </label>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              {(isShortForm ? shortFormVolumes : otherVolumes).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => pickVolume(item.id)}
                  className={`rounded-xl border p-3 font-medium transition-all ${
                    volume === item.id
                      ? "border-[#c84a2c] bg-[#c84a2c]/10 text-[var(--em-accent-ink)]"
                      : "border-[#ddd4c8] bg-[#f6f1ea] text-[#252a2d] hover:border-[#a93e29]"
                  }`}
                >
                  {isEs ? item.es : item.en}
                </button>
              ))}
            </div>
          </div>

          {/* 3. FOOTAGE SOURCE */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5a6066]">
              {isEs ? "3. Origen del Material" : "3. Source Footage Status"}
            </label>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              {[
                { id: "supplied", label: isEs ? "Edición Remota (Tengo Tomas)" : "Remote Editing (Supplied)" },
                { id: "shoot", label: isEs ? "Filmación Presencial (South Florida)" : "On-Location Shoot (South Florida)" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => pickFootage(item.id)}
                  className={`rounded-xl border p-3 font-medium transition-all ${
                    footageSource === item.id
                      ? "border-[#c84a2c] bg-[#c84a2c]/10 text-[var(--em-accent-ink)]"
                      : "border-[#ddd4c8] bg-[#f6f1ea] text-[#252a2d] hover:border-[#a93e29]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. SPEED */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5a6066]">
              {isEs ? "4. Tiempo de Entrega Requerido" : "4. Turnaround Priority"}
            </label>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              {[
                { id: "standard", label: isEs ? "Estándar (3 - 5 días)" : "Standard (3 - 5 days)" },
                { id: "express", label: isEs ? "Expreso (24 - 48 horas)" : "Express (24 - 48 hours)" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => pickSpeed(item.id)}
                  className={`rounded-xl border p-3 font-medium transition-all ${
                    speed === item.id
                      ? "border-[#c84a2c] bg-[#c84a2c]/10 text-[var(--em-accent-ink)]"
                      : "border-[#ddd4c8] bg-[#f6f1ea] text-[#252a2d] hover:border-[#a93e29]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ESTIMATE DISPLAY & LEAD FORM */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#ddd4c8] bg-[#101214] p-6 text-[#f6f1ea]">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#e85d3e]">
              <Sparkles className="size-3.5" aria-hidden="true" />
              {isEs ? "Estimación Calculada" : "Estimated Scope"}
            </span>

            <div className="mt-4 border-b border-white/10 pb-6">
              <div className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {estimate.priceRange}
              </div>
              <div className="mt-1 text-xs text-[#d8d0c7]">{estimate.period}</div>
            </div>

            <div className="mt-4 space-y-3 text-xs text-[#d8d0c7]">
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-[#e85d3e]" aria-hidden="true" />
                <span>
                  <strong>{isEs ? "Tiempo de Entrega:" : "Turnaround:"}</strong> {estimate.turnaround}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-[#e85d3e]" aria-hidden="true" />
                <span>
                  {isEs ? "Incluye corrección de color, mezcla de audio y revisiones." : "Includes color grading, audio mixing & review rounds."}
                </span>
              </div>
            </div>
          </div>

          {/* LOCK-IN FORM */}
          {submitted ? (
            <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center">
              <CheckCircle2 className="mx-auto size-6 text-emerald-400" aria-hidden="true" />
              <h4 className="mt-2 text-sm font-semibold text-white">
                {isEs ? "¡Estimación Reservada!" : "Estimate Locked In!"}
              </h4>
              <p className="mt-1 text-xs text-[#d8d0c7]">
                {isEs ? "Haz clic para enviar los detalles de tu cotización a Esteban." : "Click below to send your estimate directly to Esteban."}
              </p>
              <a
                href={getMailtoUrl()}
                className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-4 text-xs font-semibold text-white hover:bg-[var(--em-accent-ink-hover)]"
              >
                <Send className="size-3.5" aria-hidden="true" />
                {isEs ? "Enviar por Email" : "Send via Email"}
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-3 border-t border-white/10 pt-4">
              <p className="text-xs font-medium text-white">
                {isEs ? "Bloquea tu estimación y recibe una propuesta:" : "Lock in this estimate & receive formal scope:"}
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
              <div className="grid gap-2 sm:grid-cols-2">
                <input
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder={isEs ? "Teléfono / WhatsApp" : "Phone / WhatsApp"}
                  className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs text-white placeholder-white/50 focus:border-[#e85d3e] focus:outline-none"
                />
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder={isEs ? "Empresa / Canal" : "Company / Channel"}
                  className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs text-white placeholder-white/50 focus:border-[#e85d3e] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] text-xs font-semibold text-white hover:bg-[var(--em-accent-ink-hover)]"
              >
                <DollarSign className="size-4" aria-hidden="true" />
                {isEs ? "Bloquear Estimación de Presupuesto" : "Lock In Budget Scope"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
