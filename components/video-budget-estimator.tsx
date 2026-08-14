"use client";

import { useState } from "react";
import { Calculator, CheckCircle2, DollarSign, Send, Sparkles, Clock, ShieldCheck } from "lucide-react";
import { site } from "@/lib/site";
import { trackLeadSubmit } from "@/lib/analytics-events";

type Locale = "en" | "es";

interface VideoBudgetEstimatorProps {
  locale?: Locale;
}

export function VideoBudgetEstimator({ locale = "en" }: VideoBudgetEstimatorProps) {
  const isEs = locale === "es";

  const [serviceType, setServiceType] = useState<string>("social");
  const [volume, setVolume] = useState<string>("monthly-15");
  const [footageSource, setFootageSource] = useState<string>("supplied");
  const [speed, setSpeed] = useState<string>("standard");

  const [clientName, setClientName] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Estimation Logic
  // Base bands are South Florida market rates for an editing-led freelancer
  // (Esteban's actual model), less a standing 10% introductory discount.
  //
  // Provenance — each band was checked against published 2026 rate guides
  // before the discount was applied; see docs/pricing-basis.md:
  //   social      market $100-500 per short-form project
  //   youtube     market $300-1,500 per YouTube edit
  //   corporate   market $500-2,500 per medium/explainer project
  //   realestate  market $250-1,200 short ad creative
  //   ecommerce   market $250-1,200 short ad creative
  //   capture     market $300-1,000 half-day
  //
  // These are deliberately NOT Miami full-production-company rates
  // ($4,500-20,000), because that comparable assumes a full crew and
  // is the wrong model for editing-led work. Do not "correct" upward to it.
  //
  // Output stays an indicative range; the UI requires a scoped quote.
  const calculateEstimate = () => {
    let baseMin = 350;
    let baseMax = 675;

    if (serviceType === "youtube") {
      baseMin = 450;
      baseMax = 850;
    } else if (serviceType === "corporate") {
      baseMin = 725;
      baseMax = 1450;
    } else if (serviceType === "realestate") {
      baseMin = 575;
      baseMax = 1075;
    } else if (serviceType === "ecommerce") {
      baseMin = 400;
      baseMax = 775;
    }

    // Volume multiplier
    let multMin = 1;
    let multMax = 1;
    let period = isEs ? "por proyecto" : "per project";

    if (volume === "pack-5") {
      multMin = 3.8;
      multMax = 3.9;
      period = isEs ? "por paquete de 5 videos" : "per 5-video pack";
    } else if (volume === "monthly-15") {
      multMin = 4.5;
      multMax = 5.5;
      period = isEs ? "/ mes (15 videos)" : "/ month (15 videos)";
    } else if (volume === "monthly-30") {
      multMin = 8;
      multMax = 9.5;
      period = isEs ? "/ mes (30 videos)" : "/ month (30 videos)";
    }

    if (footageSource === "shoot") {
      // Half-day on-location capture: market $300-1,000, less 10%.
      baseMin += 400;
      baseMax += 775;
    }

    if (speed === "express") {
      multMin *= 1.25;
      multMax *= 1.25;
    }

    const finalMin = Math.round((baseMin * multMin) / 25) * 25;
    const finalMax = Math.round((baseMax * multMax) / 25) * 25;
    const turnaround = speed === "express" ? (isEs ? "24 - 48 Horas" : "24 - 48 Hours") : (isEs ? "3 - 5 Días Hábiles" : "3 - 5 Business Days");

    return {
      priceRange: `$${finalMin.toLocaleString()} - $${finalMax.toLocaleString()} USD`,
      period,
      turnaround,
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

  return (
    <div className="rounded-2xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 shadow-sm sm:p-8">
      <div className="mb-8 border-b border-[#ddd4c8] pb-6">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#c84a2c]">
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
                  onClick={() => setServiceType(item.id)}
                  className={`rounded-xl border p-3 font-medium transition-all ${
                    serviceType === item.id
                      ? "border-[#c84a2c] bg-[#c84a2c]/10 text-[#c84a2c]"
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
              {[
                { id: "single", label: isEs ? "1 Video Individual" : "1 Single Video" },
                { id: "pack-5", label: isEs ? "Paquete de 5 Videos" : "5-Video Starter Pack" },
                { id: "monthly-15", label: isEs ? "15 Videos / Mes (Popular)" : "15 Videos / Month (Popular)" },
                { id: "monthly-30", label: isEs ? "30 Videos / Mes (Retainer)" : "30 Videos / Month (Retainer)" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setVolume(item.id)}
                  className={`rounded-xl border p-3 font-medium transition-all ${
                    volume === item.id
                      ? "border-[#c84a2c] bg-[#c84a2c]/10 text-[#c84a2c]"
                      : "border-[#ddd4c8] bg-[#f6f1ea] text-[#252a2d] hover:border-[#a93e29]"
                  }`}
                >
                  {item.label}
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
                  onClick={() => setFootageSource(item.id)}
                  className={`rounded-xl border p-3 font-medium transition-all ${
                    footageSource === item.id
                      ? "border-[#c84a2c] bg-[#c84a2c]/10 text-[#c84a2c]"
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
                  onClick={() => setSpeed(item.id)}
                  className={`rounded-xl border p-3 font-medium transition-all ${
                    speed === item.id
                      ? "border-[#c84a2c] bg-[#c84a2c]/10 text-[#c84a2c]"
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
                className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-full bg-[#c84a2c] px-4 text-xs font-semibold text-white hover:bg-[#a93e29]"
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
                className="mt-2 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#c84a2c] text-xs font-semibold text-white hover:bg-[#a93e29]"
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
