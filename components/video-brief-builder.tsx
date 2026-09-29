"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, RotateCcw, Send, Sparkles } from "lucide-react";
import type { LeadSource } from "@/lib/lead-responder";
import { site } from "@/lib/site";
import { trackLeadSubmit } from "@/lib/analytics-events";

type Locale = "en" | "es";

interface VideoBriefBuilderProps {
  locale?: Locale;
  source?: LeadSource;
}

export function VideoBriefBuilder({
  locale = "en",
  source = "brief-builder",
}: VideoBriefBuilderProps) {
  const isEs = locale === "es";

  const [step, setStep] = useState<number>(1);
  const [projectType, setProjectType] = useState<string>("");
  const [footageStatus, setFootageStatus] = useState<string>("");
  const [formatNeeds, setFormatNeeds] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const projectTypeOptions = isEs
    ? [
        { id: "youtube", label: "Canal de YouTube / Formato Largo", desc: "Edición de ritmo, miniaturas, capítulos y gráficos explicativos." },
        { id: "social-ads", label: "Anuncios de TikTok / Reels / Shorts", desc: "Cortes direct-response con ganchos iniciales de alta conversión." },
        { id: "corporate", label: "Capacitación Corporativa / SOP", desc: "Manuales internos, inducción de empleados y videos corporativos." },
        { id: "real-estate", label: "Bienes Raíces & Video con Dron", desc: "Recorridos de propiedades, tomas aéreas 4K y colorimetría." },
        { id: "ecommerce", label: "Fotografía / Video de Producto", desc: "Demostración de productos, contenido UGC e imágenes mejoradas." },
        { id: "interview", label: "Entrevistas Multicámara & Podcasts", desc: "Sincronización multicámara, limpieza de audio y subtítulos." },
      ]
    : [
        { id: "youtube", label: "YouTube Channel / Long-Form", desc: "Pacing, thumbnails, chapter markers, and explanatory graphics." },
        { id: "social-ads", label: "TikTok / Reels / Shorts Video Ads", desc: "Direct-response cuts with high-converting opening hooks." },
        { id: "corporate", label: "Corporate Training & SOP Videos", desc: "Employee onboarding, SOP walkthroughs, and executive videos." },
        { id: "real-estate", label: "Real Estate & Drone Aerial Video", desc: "Property walkthroughs, 4K aerial shots, and horizon color grading." },
        { id: "ecommerce", label: "Product Video & E-Commerce", desc: "Product demonstrations, UGC edits, and enhanced visuals." },
        { id: "interview", label: "Multi-Cam Interview & Podcast", desc: "Multi-cam syncing, dialogue audio cleaning, and captions." },
      ];

  const footageStatusOptions = isEs
    ? [
        { id: "supplied", label: "Tengo material grabado (Edición Remota)", desc: "Ya cuento con tomas en 4K/HD listas para enviar al editor." },
        { id: "capture-needed", label: "Requiero grabación presencial", desc: "Necesito filmación en locación en Miami-Dade, Broward o Palm Beach." },
        { id: "hybrid", label: "Formato híbrido / Por definir", desc: "Combino tomas existentes con recursos gráficos o stock." },
      ]
    : [
        { id: "supplied", label: "Supplied Footage (Remote Editing)", desc: "I have raw 4K/HD video files ready to send to the editor." },
        { id: "capture-needed", label: "On-Location Shoot Needed", desc: "Need video capture in Miami-Dade, Broward, or Palm Beach County." },
        { id: "hybrid", label: "Hybrid / Not Sure Yet", desc: "Combining existing footage with stock assets or graphics." },
      ];

  const formatNeedsOptions = isEs
    ? [
        { id: "vertical", label: "9:16 Vertical (Reels / TikTok / Shorts)", desc: "Optimizado para consumo rápido en dispositivos móviles." },
        { id: "widescreen", label: "16:9 Horizontal (YouTube / Web)", desc: "Formato cinemático para canales y sitios web oficiales." },
        { id: "both", label: "Ambos formatos (Paquete Completo)", desc: "Exportaciones simultáneas en vertical u horizontal con zonas seguras." },
      ]
    : [
        { id: "vertical", label: "9:16 Vertical (Reels / TikTok / Shorts)", desc: "Optimized for mobile feeds and quick engagement." },
        { id: "widescreen", label: "16:9 Widescreen (YouTube / Web)", desc: "Cinematic format for official channels and website hero banners." },
        { id: "both", label: "Both Formats (Multi-Export Package)", desc: "Simultaneous vertical and horizontal exports with safe zone margins." },
      ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source,
        locale,
        name: clientName,
        email: clientEmail,
        phone: clientPhone,
        projectType,
        footageStatus,
        formatNeeds,
        notes,
      }),
      });
      if (!response.ok) throw new Error("Lead submission failed");
      trackLeadSubmit(source, locale);
      setSubmitted(true);
    } catch (err) {
      console.error("Lead submission error:", err);
    }
  };

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(
      isEs
        ? `Nuevo Brief de Proyecto Video - ${clientName || "Cliente"}`
        : `New Video Project Brief - ${clientName || "Client"}`
    );
    const body = encodeURIComponent(
      `--- ${isEs ? "RESUMEN DEL BRIEF DE PROYECTO" : "PROJECT BRIEF SUMMARY"} ---\n\n` +
        `${isEs ? "Nombre" : "Name"}: ${clientName}\n` +
        `Email: ${clientEmail}\n` +
        `${isEs ? "Teléfono" : "Phone"}: ${clientPhone || "N/A"}\n\n` +
        `${isEs ? "Tipo de Proyecto" : "Project Type"}: ${projectType}\n` +
        `${isEs ? "Estado del Material" : "Footage Status"}: ${footageStatus}\n` +
        `${isEs ? "Formato Deseado" : "Format Desired"}: ${formatNeeds}\n\n` +
        `${isEs ? "Notas del Proyecto" : "Project Notes"}:\n${notes || "N/A"}\n`
    );
    return `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  const resetForm = () => {
    setStep(1);
    setProjectType("");
    setFootageStatus("");
    setFormatNeeds("");
    setClientName("");
    setClientEmail("");
    setClientPhone("");
    setNotes("");
    setSubmitted(false);
  };

  return (
    <div className="rounded-2xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#ddd4c8] pb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--em-accent-ink)]">
            <Sparkles className="size-3.5" aria-hidden="true" />
            {isEs ? "Planificador de Proyectos de Video" : "Interactive Video Brief Builder"}
          </span>
          <h3 className="mt-1 font-serif text-2xl font-semibold text-[#101214]">
            {isEs ? "Define tu proyecto en 3 simples pasos" : "Scope your video project in 3 simple steps"}
          </h3>
        </div>

        {!submitted && (
          <div className="flex items-center gap-2 text-xs font-medium text-[#5a6066]">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`flex size-7 items-center justify-center rounded-full text-xs font-semibold ${
                  step === s
                    ? "bg-[#c84a2c] text-white"
                    : step > s
                    ? "bg-[#101214] text-white"
                    : "border border-[#ddd4c8] bg-[#f6f1ea] text-[#5a6066]"
                }`}
              >
                {step > s ? "✓" : s}
              </div>
            ))}
          </div>
        )}
      </div>

      {submitted ? (
        <div className="py-8 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#c84a2c]/10 text-[var(--em-accent-ink)]">
            <CheckCircle2 className="size-8" aria-hidden="true" />
          </div>
          <h4 className="mt-4 font-serif text-2xl font-semibold text-[#101214]">
            {isEs ? "¡Brief de Proyecto Listo!" : "Project Brief Ready!"}
          </h4>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#252a2d]">
            {isEs
              ? "Hemos estructurado la información de tu proyecto. Haz clic a continuación para enviar tu brief por correo a Esteban Moreno."
              : "Your project scope has been structured. Click below to send your brief directly to Esteban Moreno."}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={getMailtoUrl()}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
            >
              <Send className="size-4" aria-hidden="true" />
              {isEs ? "Enviar Brief por Email" : "Send Brief via Email"}
            </a>
            <button
              onClick={resetForm}
              type="button"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#ddd4c8] bg-[#f6f1ea] px-5 text-sm font-medium text-[#101214] hover:bg-[#eae3d9]"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
              {isEs ? "Reiniciar Formulario" : "Start Over"}
            </button>
          </div>
        </div>
      ) : (
        <div>
          {/* STEP 1: PROJECT TYPE */}
          {step === 1 && (
            <div>
              <p className="mb-4 text-sm font-medium text-[#252a2d]">
                {isEs ? "Paso 1: ¿Cuál es el objetivo o formato principal de tu video?" : "Step 1: What is the main objective or video format?"}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {projectTypeOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setProjectType(opt.label)}
                    className={`rounded-xl border p-4 text-left transition-all ${
                      projectType === opt.label
                        ? "border-[#c84a2c] bg-[#c84a2c]/5 ring-1 ring-[#c84a2c]"
                        : "border-[#ddd4c8] bg-[#f6f1ea] hover:border-[#a93e29]"
                    }`}
                  >
                    <div className="font-semibold text-[#101214]">{opt.label}</div>
                    <div className="mt-1 text-xs text-[#5a6066]">{opt.desc}</div>
                  </button>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  disabled={!projectType}
                  onClick={() => setStep(2)}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white disabled:opacity-50 hover:bg-[var(--em-accent-ink-hover)]"
                >
                  {isEs ? "Siguiente Paso" : "Next Step"}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: FOOTAGE STATUS */}
          {step === 2 && (
            <div>
              <p className="mb-4 text-sm font-medium text-[#252a2d]">
                {isEs ? "Paso 2: ¿Cuentas con el material grabado o necesitas filmación?" : "Step 2: Do you already have raw footage or need a shoot?"}
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {footageStatusOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setFootageStatus(opt.label)}
                    className={`rounded-xl border p-4 text-left transition-all ${
                      footageStatus === opt.label
                        ? "border-[#c84a2c] bg-[#c84a2c]/5 ring-1 ring-[#c84a2c]"
                        : "border-[#ddd4c8] bg-[#f6f1ea] hover:border-[#a93e29]"
                    }`}
                  >
                    <div className="font-semibold text-[#101214]">{opt.label}</div>
                    <div className="mt-1 text-xs text-[#5a6066]">{opt.desc}</div>
                  </button>
                ))}
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#ddd4c8] bg-[#f6f1ea] px-5 text-sm font-medium text-[#101214] hover:bg-[#eae3d9]"
                >
                  {isEs ? "Atrás" : "Back"}
                </button>
                <button
                  type="button"
                  disabled={!footageStatus}
                  onClick={() => setStep(3)}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white disabled:opacity-50 hover:bg-[var(--em-accent-ink-hover)]"
                >
                  {isEs ? "Siguiente Paso" : "Next Step"}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: FORMAT NEEDS */}
          {step === 3 && (
            <div>
              <p className="mb-4 text-sm font-medium text-[#252a2d]">
                {isEs ? "Paso 3: ¿En qué formatos deseas publicar los videos?" : "Step 3: What output formats do you need?"}
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {formatNeedsOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setFormatNeeds(opt.label)}
                    className={`rounded-xl border p-4 text-left transition-all ${
                      formatNeeds === opt.label
                        ? "border-[#c84a2c] bg-[#c84a2c]/5 ring-1 ring-[#c84a2c]"
                        : "border-[#ddd4c8] bg-[#f6f1ea] hover:border-[#a93e29]"
                    }`}
                  >
                    <div className="font-semibold text-[#101214]">{opt.label}</div>
                    <div className="mt-1 text-xs text-[#5a6066]">{opt.desc}</div>
                  </button>
                ))}
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#ddd4c8] bg-[#f6f1ea] px-5 text-sm font-medium text-[#101214] hover:bg-[#eae3d9]"
                >
                  {isEs ? "Atrás" : "Back"}
                </button>
                <button
                  type="button"
                  disabled={!formatNeeds}
                  onClick={() => setStep(4)}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white disabled:opacity-50 hover:bg-[var(--em-accent-ink-hover)]"
                >
                  {isEs ? "Finalizar Brief" : "Finalize Brief"}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: SUBMIT FORM */}
          {step === 4 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm font-medium text-[#252a2d]">
                {isEs ? "Paso 4: Ingresa tus datos de contacto para enviarte la propuesta" : "Step 4: Enter your contact details to receive your scoping quote"}
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#5a6066]">
                    {isEs ? "Nombre Completo *" : "Full Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder={isEs ? "Ej. María García" : "e.g. Alex Smith"}
                    className="mt-1 w-full rounded-xl border border-[#ddd4c8] bg-[#f6f1ea] px-4 py-2.5 text-sm text-[#101214] focus:border-[#c84a2c] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#5a6066]">
                    {isEs ? "Correo Electrónico *" : "Email Address *"}
                  </label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder={isEs ? "maria@empresa.com" : "alex@company.com"}
                    className="mt-1 w-full rounded-xl border border-[#ddd4c8] bg-[#f6f1ea] px-4 py-2.5 text-sm text-[#101214] focus:border-[#c84a2c] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#5a6066]">
                  {isEs ? "Teléfono / WhatsApp (Opcional)" : "Phone / WhatsApp (Optional)"}
                </label>
                <input
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="(305) 000-0000"
                  className="mt-1 w-full rounded-xl border border-[#ddd4c8] bg-[#f6f1ea] px-4 py-2.5 text-sm text-[#101214] focus:border-[#c84a2c] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#5a6066]">
                  {isEs ? "Notas o detalles adicionales del proyecto" : "Additional Project Notes or Requirements"}
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={isEs ? "Detalla cantidad de videos, referencias visuales o plazos..." : "Specify number of videos, visual references, or timelines..."}
                  className="mt-1 w-full rounded-xl border border-[#ddd4c8] bg-[#f6f1ea] px-4 py-2.5 text-sm text-[#101214] focus:border-[#c84a2c] focus:outline-none"
                />
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#ddd4c8] bg-[#f6f1ea] px-5 text-sm font-medium text-[#101214] hover:bg-[#eae3d9]"
                >
                  {isEs ? "Atrás" : "Back"}
                </button>
                <button
                  type="submit"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  <Send className="size-4" aria-hidden="true" />
                  {isEs ? "Generar Brief de Proyecto" : "Generate Project Brief"}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
