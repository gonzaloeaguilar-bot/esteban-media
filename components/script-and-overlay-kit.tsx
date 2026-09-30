"use client";

import { useState } from "react";
import { Copy, Check, Download, FileText, Layout, Sparkles, Send } from "lucide-react";
import { site } from "@/lib/site";
import { trackLeadSubmit } from "@/lib/analytics-events";

type Locale = "en" | "es";

interface ScriptAndOverlayKitProps {
  locale?: Locale;
}

export function ScriptAndOverlayKit({ locale = "en" }: ScriptAndOverlayKitProps) {
  const isEs = locale === "es";

  const [activeTab, setActiveTab] = useState<"scripts" | "safezone">("scripts");
  const [selectedScriptId, setSelectedScriptId] = useState<string>("hook-agitate");
  const [copied, setCopied] = useState<boolean>(false);

  const [clientEmail, setClientEmail] = useState<string>("");
  const [unlocked, setUnlocked] = useState<boolean>(false);

  const scripts = isEs
    ? [
        {
          id: "hook-agitate",
          title: "1. Anuncio Direct-Response (Gancho -> Problema -> Solución)",
          desc: "Ideal para marcas de e-commerce, apps y productos locales.",
          template: `[00:00 - 00:03] GANCHO VISUAL & VERBAL:
"¿Cansado de gastar miles en videos para redes sin recibir clientes reales?"

[00:03 - 00:08] PROBLEMA (AGITAR EL DOLOR):
"La mayoría de las marcas cometen el error de publicar tomas bonitas sin una llamada a la acción directa ni subtítulos optimizados."

[00:08 - 00:18] SOLUCIÓN & DEMOSTRACIÓN:
"Con nuestro sistema de edición remota, convertimos tus grabaciones en reels verticales de alto enganche con edición rítmica y subtítulos resaltados."

[00:18 - 00:25] LLAMADO A LA ACCIÓN (CTA):
"Haz clic en el enlace y solicita una estimación rápida de tu próximo lote de contenido."`,
        },
        {
          id: "educational",
          title: "2. Reel Educativo de Autoridad (3 Consejos Rápidos)",
          desc: "Ideal para abogados, dentistas, agentes inmobiliarios y consultores.",
          template: `[00:00 - 00:03] GANCHO DE CURIOSIDAD:
"3 cosas que debes verificar ANTES de contratar un servicio de video en Miami."

[00:03 - 00:12] PUNTOS CLAVE 1 Y 2:
"1. Exige que el audio se masterice a -14 LUFS para que la voz no se pierda en redes.
2. Verifica que las tomas tengan zonas seguras marcadas para subtítulos."

[00:12 - 00:20] PUNTO CLAVE 3 & PRUEBA:
"3. Asegúrate de recibir exportaciones simultáneas en formato vertical (9:16) y horizontal (16:9)."

[00:20 - 00:25] CTA FINAL:
"Guarda este video para tu próximo rodaje o contáctanos para editar tu material."`,
        },
        {
          id: "transformation",
          title: "3. Caso de Éxito / Antes y Después",
          desc: "Ideal para contratistas, spas médicos, remodelaciones y fitness.",
          template: `[00:00 - 00:03] GANCHO DE IMPACTO:
"Así se veía la comunicación de esta empresa antes y después de reorganizar su edición de video."

[00:03 - 00:12] TRANSICIÓN & PROCESO:
"Pasamos de videos caseros largos a cápsulas dinámicas de 30 segundos con gráficos explicativos."

[00:12 - 00:22] RESULTADO COMERCIAL:
"El resultado: un aumento del 40% en el tiempo de retención de los espectadores."

[00:22 - 00:25] CTA FINAL:
"Visita nuestro portafolio y conoce cómo estructurar tu próximo proyecto."`,
        },
      ]
    : [
        {
          id: "hook-agitate",
          title: "1. Direct-Response Ad (Hook -> Agitate -> Solution)",
          desc: "Best for e-commerce brands, apps, and local commercial services.",
          template: `[00:00 - 00:03] VISUAL & VERBAL HOOK:
"Tired of spending thousands on video content that gets zero actual leads?"

[00:03 - 00:08] AGITATE THE PROBLEM:
"Most brands publish polished footage without clear CTAs or mobile caption safe zones."

[00:08 - 00:18] SOLUTION & DEMO:
"With our remote video editing workflow, we turn your raw footage into high-converting 9:16 vertical reels."

[00:18 - 00:25] CALL TO ACTION (CTA):
"Click the link below to get a fast scope estimate on your next video batch."`,
        },
        {
          id: "educational",
          title: "2. Authority Educational Reel (3 Quick Tips)",
          desc: "Best for lawyers, dentists, real estate agents, and executives.",
          template: `[00:00 - 00:03] CURIOSITY HOOK:
"3 things you MUST check BEFORE hiring a video editor in South Florida."

[00:03 - 00:12] KEY POINTS 1 & 2:
"1. Demand dialogue audio mastered to -14 LUFS so speech stays crisp.
2. Ensure text subtitles remain inside vertical UI safe zones."

[00:12 - 00:20] KEY POINT 3 & PROOF:
"3. Request simultaneous 9:16 vertical and 16:9 widescreen exports."

[00:20 - 00:25] FINAL CTA:
"Save this reel for your next shoot or contact us to edit your supplied footage."`,
        },
        {
          id: "transformation",
          title: "3. Before & After Case Study Transformation",
          desc: "Best for contractors, med spas, fitness, and home services.",
          template: `[00:00 - 00:03] VISUAL TRANSFORMATION HOOK:
"Here is what happened to this business's video reach after fixing their editing pacing."

[00:03 - 00:12] TRANSITION & PROCESS:
"We took long raw footage and extracted 30-second vertical reels with bold captions."

[00:12 - 00:22] COMMERCIAL RESULT:
"The result: a 40% bump in viewer watch retention and consistent inbound lead inquiry."

[00:22 - 00:25] FINAL CTA:
"Visit our portfolio to see real published client project breakdowns."`,
        },
      ];

  const currentScript = scripts.find((s) => s.id === selectedScriptId) || scripts[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentScript.template);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "script-kit",
        locale,
        email: clientEmail,
      }),
      });
      if (!response.ok) throw new Error("Lead submission failed");
      trackLeadSubmit("script-kit", locale);
      setUnlocked(true);
    } catch (err) {
      console.error("Lead submission error:", err);
    }
  };

  // The data-section is what makes this tool's events attributable: without it
  // track.js walks up to no marker and reports cta_position "page", so every
  // click here is counted and indistinguishable from any other on the page.
  return (
    <div data-section="script_and_overlay_kit" className="rounded-2xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#ddd4c8] pb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--em-accent-ink)]">
            <Sparkles className="size-3.5" aria-hidden="true" />
            {isEs ? "Recursos Gratuitos de Producción" : "Free Production Resource Kit"}
          </span>
          <h3 className="mt-1 font-serif text-3xl font-semibold text-[#101214]">
            {isEs ? "Kit de Guiones para Video Ads & Zonas Seguras 9:16" : "Social Video Ad Script & 9:16 Safe-Zone Kit"}
          </h3>
        </div>

        <div className="flex gap-2 rounded-full border border-[#ddd4c8] bg-[#f6f1ea] p-1 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("scripts")}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 transition-all ${
              activeTab === "scripts" ? "bg-[#c84a2c] text-white" : "text-[#5a6066] hover:text-[#101214]"
            }`}
          >
            <FileText className="size-3.5" aria-hidden="true" />
            {isEs ? "Guiones de Ad" : "Ad Scripts"}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("safezone")}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 transition-all ${
              activeTab === "safezone" ? "bg-[#c84a2c] text-white" : "text-[#5a6066] hover:text-[#101214]"
            }`}
          >
            <Layout className="size-3.5" aria-hidden="true" />
            {isEs ? "Zonas Seguras 9:16" : "9:16 Safe Zones"}
          </button>
        </div>
      </div>

      {activeTab === "scripts" ? (
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          {/* SCRIPT SELECTOR */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#5a6066]">
              {isEs ? "Selecciona una plantilla de guion:" : "Select a video script framework:"}
            </p>
            {scripts.map((script) => (
              <button
                key={script.id}
                type="button"
                onClick={() => setSelectedScriptId(script.id)}
                className={`w-full rounded-xl border p-4 text-left transition-all ${
                  selectedScriptId === script.id
                    ? "border-[#c84a2c] bg-[#c84a2c]/10 ring-1 ring-[#c84a2c]"
                    : "border-[#ddd4c8] bg-[#f6f1ea] hover:border-[#a93e29]"
                }`}
              >
                <div className="font-semibold text-[#101214]">{script.title}</div>
                <div className="mt-1 text-xs text-[#5a6066]">{script.desc}</div>
              </button>
            ))}
          </div>

          {/* SCRIPT PREVIEW & COPY */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#ddd4c8] bg-[#101214] p-5 text-[#f6f1ea]">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#e85d3e]">
                  {isEs ? "Estructura del Guion" : "Script Framework"}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white hover:bg-white/20"
                >
                  {copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                  {copied ? (isEs ? "¡Copiado!" : "Copied!") : isEs ? "Copiar Guion" : "Copy Script"}
                </button>
              </div>

              <pre className="mt-4 whitespace-pre-wrap font-sans text-xs leading-relaxed text-[#d8d0c7]">
                {currentScript.template}
              </pre>
            </div>

            <div className="mt-6 border-t border-white/10 pt-4 text-xs text-[#5a6066]">
              {isEs
                ? "¿Quieres que editemos tus videos basados en estos guiones? Contáctanos para cotizar tu lote."
                : "Want us to edit your videos using these scripts? Contact us for a custom package estimate."}
            </div>
          </div>
        </div>
      ) : (
        /* SAFEZONE DIAGRAM */
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-4">
            <h4 className="font-serif text-xl font-semibold text-[#101214]">
              {isEs ? "Especificaciones de Zonas Seguras en Vertical (9:16)" : "9:16 Vertical Video Safe Zone Margins"}
            </h4>
            <p className="text-sm leading-relaxed text-[#252a2d]">
              {isEs
                ? "Al publicar Instagram Reels, TikToks o YouTube Shorts, los elementos de la interfaz de usuario (botones de me gusta, comentarios y foto de perfil) cubren los bordes superior e inferior."
                : "When publishing Instagram Reels, TikToks, or YouTube Shorts, platform native UI buttons (likes, comments, profile icons) overlay the top and bottom edges."}
            </p>

            <ul className="space-y-2 text-xs text-[#5a6066]">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#c84a2c]" />
                <strong>{isEs ? "Resolución Novedosa:" : "Target Resolution:"}</strong> 1080 x 1920 px (9:16)
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#c84a2c]" />
                <strong>{isEs ? "Margen Superior Libre:" : "Top Margin Avoid:"}</strong> 140px (Perfil y Barra)
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#c84a2c]" />
                <strong>{isEs ? "Margen Inferior Libre:" : "Bottom Margin Avoid:"}</strong> 320px (Botones y Audio)
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#ddd4c8] bg-[#101214] p-6 text-center text-white">
            <div className="mx-auto flex h-64 w-36 flex-col justify-between rounded-2xl border-2 border-dashed border-[#e85d3e] p-3 text-[10px]">
              <div className="rounded bg-red-500/20 py-1 text-red-300">
                {isEs ? "ZONA OCUPADA SUPERIOR (140px)" : "TOP UI ZONE (140px)"}
              </div>

              <div className="my-auto rounded border border-emerald-400 bg-emerald-500/20 py-6 text-emerald-300">
                <strong>{isEs ? "ZONA SEGURA TEXTO / SUBTÍTULOS" : "SAFE TEXT / CAPTION ZONE"}</strong>
              </div>

              <div className="rounded bg-red-500/20 py-2 text-red-300">
                {isEs ? "ZONA BOTONES INFERIOR (320px)" : "BOTTOM BUTTON ZONE (320px)"}
              </div>
            </div>
            <p className="mt-4 text-xs text-[#d8d0c7]">
              {isEs ? "Guía gráfica de zonas seguras para Premiere Pro & DaVinci Resolve." : "Graphical safe-zone guide for Premiere Pro & DaVinci Resolve."}
            </p>
          </div>
        </div>
      )}

      {/* UNLOCK ASSET BUNDLE */}
      <div className="mt-8 rounded-xl border border-[#ddd4c8] bg-[#f6f1ea] p-5">
        {unlocked ? (
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-[#101214]">
            <span className="text-emerald-700">
              {isEs ? "✓ Asset Pack desbloqueado. Recibirás las plantillas en tu correo." : "✓ Asset Pack Unlocked. Check your inbox for the templates."}
            </span>
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent(isEs ? "Solicitud de Kit de Video Social" : "Social Video Kit Asset Pack Request")}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--em-accent-ink)] px-4 py-2 text-white hover:bg-[var(--em-accent-ink-hover)]"
            >
              <Download className="size-3.5" />
              {isEs ? "Solicitar Archivos .PNG" : "Request .PNG Assets"}
            </a>
          </div>
        ) : (
          <form onSubmit={handleUnlock} className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-semibold text-[#101214]">
                {isEs ? "¿Quieres recibir el paquete de archivos .PNG de Zonas Seguras?" : "Want the full .PNG Overlay Safe Zone Asset Pack?"}
              </h4>
              <p className="text-xs text-[#5a6066]">
                {isEs ? "Ingresa tu email para desbloquear el paquete de recursos." : "Enter your email to unlock the full production resource bundle."}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="email"
                required
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="email@company.com"
                className="rounded-full border border-[#ddd4c8] bg-white px-4 py-2 text-xs text-[#101214] focus:border-[#c84a2c] focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-[var(--em-accent-ink)] px-5 text-xs font-semibold text-white hover:bg-[var(--em-accent-ink-hover)]"
              >
                <Send className="size-3.5" />
                {isEs ? "Desbloquear Kit" : "Unlock Kit"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
