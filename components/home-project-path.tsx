"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown, Plus } from "lucide-react";
import { useState } from "react";

import { AudienceVideo, EditingPreview } from "@/components/audience-media";

import { AUDIENCE_LANES, type AudienceLocale } from "@/lib/audience-lanes";
import { realEstateReelsPath } from "@/lib/real-estate-reels";
import { laneFunnelPrice, laneOffers, laneStartingPrice, type ChooserLaneId } from "@/lib/chooser-lane-pricing";
import { ON_LOCATION_CAPTURE, PRODUCT_PHOTO_SESSION, REAL_ESTATE_PLAN_TERMS, turnaroundFor, usd } from "@/lib/pricing";
import { HomePathFunnel } from "@/components/home-path-funnel";
import { packagesCopy, whatsappHref } from "@/lib/packages";
import { aLaCarteVisual } from "@/lib/a-la-carte-visuals";
import { quoteCtaLabel } from "@/lib/quote-cta";
import { site } from "@/lib/site";

const copy = {
  en: {
    eyebrow: "Find your starting point",
    heading: "What do you need made?",
    intro: "Choose a project to see the relevant work and next steps.",
    labels: ["Reels for my properties", "Short videos for my business", "Edit footage I already have"],
    /* The control needs two or three words, not a sentence: at full length the
       three options stacked into one grey block with the inactive ones barely
       legible. The full label still reads on the card below. */
    tabs: ["Real estate", "Business", "Editing only", "One thing"],
    singleLead: "Tap one to see what to send me.",
    singleAsk: "Ask about this",
    singleService: "See service page",
    singleSend: "What to send",
    singleCta: "Start a single project",
    singleWho: "One service, quoted for your project",
    singleLabel: "Single project",
    singleQuoted: "Quoted per project",
    singleFrom: "From",
    singleSession: "/session",
    singleHalfDay: "/half-day",
    singleCredit: "Concept illustrations created with AI.",
    lensAlt: "Illustration of Esteban's Sony Alpha 7 IV camera lens",
    singleWhatsapp: "Hi Esteban, I'd like a quote for a single project.",
    artAlts: [
      "Concept illustration of a home, camera and property photographs",
      "Concept illustration of a cafe being filmed on a phone",
      "Concept illustration of an editing desk with a monitor, filmstrip and headphones",
    ],
    pricingDetail: "These are starting prices. The final price depends on the project scope.",
    pricingAction: "See everything each package includes",
    offersLabel: "What this includes",
    morePlans: "Need custom volume or 4+ properties? View full plan comparison.",
    thumbAlt: (title: string) => `Concept illustration for ${title}`,
    swipe: "Swipe to see all three options.",
    sceneLabels: ["Frame your listing", "Make people stop scrolling", "Bring the edit to life"],
    sceneFacts: [
      ["Walkthroughs and Reels.", "Edited from your footage."],
      ["Turn the moments you already film into content.", "Short-form editing for Reels and TikTok."],
      ["Cuts, captions and sound.", "Clear feedback for the next version."],
    ],
    pricingHref: "/pricing",
    from: "From",
    custom: "Custom quote",
    units: { video: "/video", month: "/month", "production-day": "/production day" },
    localLinks: [
      { href: "/services/video-production-fort-lauderdale", label: "Film a video in Fort Lauderdale" },
      { href: "/services/reels-editor-fort-lauderdale", label: "Edit Reels in Fort Lauderdale" },
    ],
    process: "See the editing process",
    videoAlt: "Concept illustration of a cafe being filmed on a phone",
    minimumTerm: `${REAL_ESTATE_PLAN_TERMS.minimumMonths}-month minimum commitment.`,
    termsLink: "Full terms are on the pricing page",
    turnaround: (days: number) =>
      days === 7
        ? "One week minimum turnaround — not a fixed delivery date"
        : `${days}-day minimum turnaround — not a fixed delivery date`,
  },
  es: {
    eyebrow: "Encuentra por dónde empezar",
    heading: "¿Qué necesitas crear?",
    intro: "Elige un proyecto para ver trabajo relacionado y los próximos pasos.",
    labels: ["Reels para mis propiedades", "Videos cortos para mi negocio", "Editar videos que ya grabé"],
    tabs: ["Inmobiliaria", "Negocio", "Solo edición", "Algo puntual"],
    singleLead: "Toca uno para saber qué enviarme.",
    singleAsk: "Preguntar por esto",
    singleService: "Ver página del servicio",
    singleSend: "Qué enviarme",
    singleCta: "Empezar un proyecto puntual",
    singleWho: "Un servicio, cotizado a tu proyecto",
    singleLabel: "Proyecto puntual",
    singleQuoted: "Cotización por proyecto",
    singleFrom: "Desde",
    singleSession: "/sesión",
    singleHalfDay: "/medio día",
    singleCredit: "Ilustraciones conceptuales creadas con IA.",
    lensAlt: "Ilustración del lente de la cámara Sony Alpha 7 IV de Esteban",
    singleWhatsapp: "Hola Esteban, quiero una cotización para un proyecto puntual.",
    artAlts: [
      "Ilustración conceptual de una casa, una cámara y fotografías de la propiedad",
      "Ilustración conceptual de un café grabado con un celular",
      "Ilustración conceptual de una mesa de edición con monitor, película y audífonos",
    ],
    pricingDetail: "Son precios de partida. El precio final depende del alcance del proyecto.",
    pricingAction: "Ver todo lo que incluye cada paquete",
    offersLabel: "Qué incluye",
    morePlans: "¿Más de 4 propiedades o volumen a medida? Ver comparativa completa de planes.",
    thumbAlt: (title: string) => `Ilustración conceptual de ${title}`,
    swipe: "Desliza para ver las tres opciones.",
    sceneLabels: ["Encuadra tu propiedad", "Haz que dejen de deslizar", "Dale ritmo al material"],
    sceneFacts: [
      ["Recorridos y Reels.", "Editados a partir de tu material."],
      ["Convierte lo que ya grabas en contenido.", "Edición de formato corto para Reels y TikTok."],
      ["Cortes, subtítulos y sonido.", "Comentarios organizados para la siguiente versión."],
    ],
    pricingHref: "/es/precios",
    from: "Desde",
    custom: "Cotización personalizada",
    units: { video: "/video", month: "/mes", "production-day": "/día de producción" },
    localLinks: [
      { href: "/es/produccion-de-video-fort-lauderdale", label: "Grabar video en Fort Lauderdale" },
      { href: "/es/editor-de-reels-fort-lauderdale", label: "Editar Reels en Fort Lauderdale" },
    ],
    process: "Ver el proceso de edición",
    videoAlt: "Ilustración conceptual de un café grabado con un celular",
    minimumTerm: `Mínimo de ${REAL_ESTATE_PLAN_TERMS.minimumMonths} meses de compromiso.`,
    termsLink: "Las condiciones completas están en la página de precios",
    turnaround: (days: number) =>
      days === 7
        ? "Mínimo de una semana de entrega — no es una fecha fija"
        : `Mínimo de ${days} días de entrega — no es una fecha fija`,
  },
} as const;

const artwork = ["property", "business", "editing"] as const;
/** lanes[index].id ("real-estate" | "local-business" | "agency") already
 * matches ChooserLaneId 1:1 — this is just the type-narrowing cast point. */
const laneIdAt = (index: number): ChooserLaneId =>
  (["real-estate", "local-business", "agency"] as const)[index];

function offerDeliverables(name: string, laneId: ChooserLaneId, locale: AudienceLocale): string[] {
  const isEs = locale === "es";
  if (laneId === "real-estate") {
    if (name.includes("Essential")) {
      return isEs
        ? [
            "1 propiedad al mes (hasta 3,000 SF)",
            "2 días de producción en locación al mes",
            "20 a 30 fotos profesionales editadas",
            "2 posts o reels por semana (Instagram y TikTok)",
            "Gestión de redes y reporte Metricool cada 2 semanas",
            "Flexibilidad: la sesión pasa al mes siguiente si no hay listado",
            "Fotografía con dron disponible como adicional ($120)",
          ]
        : [
            "1 property per month (up to 3,000 SF)",
            "2 on-location production shoot days / month",
            "20–30 professionally edited photos",
            "2 posts or reels per week (Instagram & TikTok)",
            "Social management & Metricool report every 2 weeks",
            "Rollover: shoot rolls to next month if no listing",
            "Drone photography available as add-on ($120)",
          ];
    }
    if (name.includes("Plus")) {
      return isEs
        ? [
            "2 propiedades al mes (hasta 3,000 SF c/u)",
            "3 días de producción en locación al mes",
            "20 a 30 fotos profesionales por propiedad",
            "3 a 4 posts o reels por semana (Instagram y TikTok)",
            "Gestión de redes y reporte Metricool cada 2 semanas",
            "Flexibilidad: las sesiones pasan al mes siguiente si no hay listado",
            "Fotografía con dron disponible como adicional ($120)",
          ]
        : [
            "2 properties per month (up to 3,000 SF each)",
            "3 on-location production shoot days / month",
            "20–30 professionally edited photos per property",
            "3–4 posts or reels per week (Instagram & TikTok)",
            "Social management & Metricool report every 2 weeks",
            "Rollover: shoots roll to next month if no listings",
            "Drone photography available as add-on ($120)",
          ];
    }
    if (name.includes("Premium")) {
      return isEs
        ? [
            "3 propiedades al mes (hasta 3,000 SF c/u)",
            "3 días de producción en locación al mes",
            "20 a 30 fotos profesionales por propiedad",
            "Fotografía aérea con dron INCLUIDA",
            "5 posts o reels por semana (Instagram y TikTok)",
            "Gestión de redes y reporte Metricool cada 2 semanas",
            "Prioridad de calendario y flexibilidad de rollover",
          ]
        : [
            "3 properties per month (up to 3,000 SF each)",
            "3 on-location production shoot days / month",
            "20–30 professionally edited photos per property",
            "Drone aerial photography INCLUDED",
            "5 posts or reels per week (Instagram & TikTok)",
            "Social management & Metricool report every 2 weeks",
            "Priority scheduling & rollover flexibility",
          ];
    }
  }

  if (laneId === "local-business") {
    if (name.includes("Growth") || name.includes("Crecimiento")) {
      return isEs
        ? [
            "Plan y estrategia mensual de contenido",
            "Calendario estructurado de publicación",
            "Edición profesional de formato corto incluida",
            "Reporte quincenal de métricas con Metricool",
            "Dirección creativa dedicada para tu marca",
          ]
        : [
            "Content strategy & monthly planning",
            "Structured publishing calendar",
            "Professional short-form editing included",
            "Bi-weekly Metricool performance report",
            "Dedicated creative lead for your brand",
          ];
    }
    return isEs
      ? [
          "Pre-producción: dirección creativa y lista de tomas",
          "Día completo de producción en sitio con equipo de cine",
          "Edición multiformato (9:16 vertical y 16:9 horizontal)",
          "Cobertura en Broward, Miami-Dade y Palm Beach",
          "Entregables listos para redes sociales, anuncios y web",
        ]
      : [
          "Pre-production creative direction & shot list",
          "Full on-location production day with cinema gear",
          "Multi-format editing (9:16 vertical & 16:9 widescreen)",
          "Broward, Miami-Dade, and Fort Lauderdale coverage",
          "Turnkey deliverables for social, ads, and website",
        ];
  }

  return isEs
    ? [
        "Edición remota a partir de tus tomas originales",
        "Formato para Reels, TikTok, YouTube Shorts o web",
        "1 ronda de revisión incluida por video",
        "Corrección de color profesional, audio y subtítulos",
        "Mínimo de entrega: 7 días",
      ]
    : [
        "Remote video editing from your raw footage",
        "Formatted for Reels, TikTok, YouTube Shorts or web",
        "1 revision round included per video",
        "Professional color grading, audio cleanup & captions",
        "7-day turnaround floor",
      ];
}

export function HomeProjectPath({ locale }: { locale: AudienceLocale }) {
  const c = copy[locale];
  const lanes = AUDIENCE_LANES[locale].lanes;
  const single = packagesCopy(locale).aLaCarte;
  const SINGLE_ID = "a-la-carte";
  const [activeLane, setActiveLane] = useState(lanes[0].id);
  const [funnelOpen, setFunnelOpen] = useState(false);
  const [funnelLane, setFunnelLane] = useState<{ id: string; label: string; price: string }>({ id: lanes[0].id, label: c.labels[0], price: laneFunnelPrice(locale, "real-estate") });
  const openFunnel = (id: string, label: string, price: string) => {
    setFunnelLane({ id, label, price });
    setFunnelOpen(true);
  };

  const activeIndex = [...lanes.map((lane) => lane.id), SINGLE_ID].indexOf(activeLane);
  const activeChooserLane = activeIndex >= 0 && activeIndex < lanes.length ? laneIdAt(activeIndex) : "real-estate";
  const activeChoice = activeIndex < lanes.length ? c.labels[activeIndex] : c.singleLabel;
  const activePrice = activeIndex < lanes.length ? laneStartingPrice(locale, activeChooserLane) : c.singleQuoted;

  return (
    <section id="start" aria-labelledby={`home-path-${locale}`} data-section="home-project-path" className="bg-[#f7f5f1] py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-medium uppercase tracking-wider text-[#6a625a]">{c.eyebrow}</p>
        <h2 id={`home-path-${locale}`} className="mt-2 font-serif text-4xl leading-tight sm:text-5xl">{c.heading}</h2>
        <p className="mt-2 max-w-2xl text-base leading-7 text-[#4d5358]">{c.intro}</p>

        <div className="em-camera-chooser mt-5" data-active-index={activeIndex}>
          <div className="em-camera-chooser__body">
            <div className="em-camera-chooser__flash" aria-hidden="true" />
            <div className="em-camera-chooser__lens">
              <Image
                src="/illustrations/esteban-sony-alpha-lens-v2.png"
                alt={c.lensAlt}
                fill
                sizes="(max-width: 639px) 112px, 138px"
                className="object-contain"
              />
            </div>
            <p className="em-camera-chooser__eyebrow">{locale === "es" ? "CÁMARA LISTA" : "CAMERA READY"}</p>
            <p className="em-camera-chooser__choice">{activeChoice}</p>
            <p className="em-camera-chooser__price">{activePrice}</p>
          </div>
          <div className="em-camera-chooser__choices" role="group" aria-label={locale === "es" ? "Tipo de proyecto" : "Project type"}>
            {[...lanes.map((lane, i) => ({ id: lane.id, label: c.tabs[i], price: laneStartingPrice(locale, laneIdAt(i)) })), { id: SINGLE_ID, label: c.tabs[3], price: c.singleQuoted }].map((chip) => {
              return (
              <button
                key={chip.id}
                type="button"
                className="em-camera-chooser__stop"
                aria-pressed={chip.id === activeLane}
                data-active={chip.id === activeLane ? "" : undefined}
                data-cta={`home_project_path_${locale}_${chip.id}`}
                onClick={() => setActiveLane(chip.id)}
              >
                <span>{chip.label}</span>
                <small>{chip.price}</small>
              </button>
              );
            })}
          </div>
        </div>
        <div className="mt-5">
          {/* All three lanes are server-rendered every time — never filtered
              to the active one. GPTBot, ClaudeBot and PerplexityBot execute
              no JavaScript, so a client-gated tab is ABSENT content, not
              hidden content: the price/TLDR work just finished (#395) must
              exist in the raw bytes for all three lanes, not just whichever
              one `lanes[0]` happens to be. The native `hidden` attribute
              keeps the inactive two in the DOM (curl sees them, Google
              crawls them) while making them invisible, untabbable and
              unreadable to a screen reader — the browser's built-in
              equivalent of `display:none` + implicit `aria-hidden`. Every
              animation in illustrated-commercial.css is already gated on
              `[data-visible=true]` (IntersectionObserver) and/or
              `[data-rail-open]`, and a `hidden` element can be neither
              intersecting nor open, so the inactive lanes' scenes cannot
              animate — verified by filming, see PR description. */}
          {lanes.map((lane) => {
            const index = lanes.findIndex((l) => l.id === lane.id);
            const isActive = lane.id === activeLane;
            return (
              <div key={lane.id} className="em-path-card" hidden={!isActive}>
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#d6cabc] bg-[#fffaf3] shadow-sm">
                  {/* Cinematic Lens Backdrop Banner — illustration sits behind like a cinema poster */}
                  <div className="em-path-visual relative h-44 sm:h-52 w-full overflow-hidden bg-[#101214]">
                    <Image
                      src={`/illustrations/${artwork[index]}.webp`}
                      alt={c.artAlts[index]}
                      fill
                      sizes="(max-width: 768px) 100vw, 760px"
                      className="object-cover opacity-35 brightness-90 filter transition-transform duration-700 hover:scale-105"
                      priority={index === 0}
                    />
                    {/* Cinematic optical gradient / vignette overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(to bottom, rgba(16,18,20,0.3) 0%, rgba(16,18,20,0.65) 50%, rgba(16,18,20,0.95) 100%)",
                      }}
                    />

                    {/* Keep the image decorative: the price and choice are stated above,
                        rather than invented as camera telemetry. */}
                    <div className="absolute inset-3 sm:inset-4 border border-white/15 rounded-xl pointer-events-none flex flex-col justify-between p-2.5 sm:p-3.5">
                      {/* Title & Who It Is For */}
                      <div className="mt-auto">
                        <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium drop-shadow-md">
                          {c.labels[index]}
                        </h3>
                        <p className="text-xs sm:text-sm text-white/80 font-normal mt-0.5 tracking-wide">
                          {lane.who}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* The Package List & Details — immediately visible without scrolling down */}
                  <div className="em-path-card-info p-4 sm:p-5 flex flex-col gap-3">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#6a625a]">
                        {locale === "es" ? "Paquetes y entregables" : "Available packages & deliverables"}
                      </p>
                      {index === 0 && (
                        <p className="em-path-qualifier text-xs text-[#6a625a]">
                          {c.minimumTerm}
                        </p>
                      )}
                      {index === 2 && (
                        <p className="em-path-qualifier text-xs text-[#6a625a]">
                          {c.turnaround(turnaroundFor("arranque").minimumDays)}
                        </p>
                      )}
                    </div>

                    {/* Offers List: expandable plan cards with full deliverables disclosure */}
                    <ul className={`em-path-offers grid grid-cols-1 ${laneOffers(locale, laneIdAt(index)).length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"} gap-2.5`} role="list" aria-label={c.offersLabel} data-lane={lane.id}>
                      {laneOffers(locale, laneIdAt(index)).map((offer) => {
                        const deliverables = offerDeliverables(offer.name, laneIdAt(index), locale);
                        return (
                          <li
                            key={offer.name}
                            className="em-path-offer group flex flex-col justify-between rounded-xl border border-[#d6cabc] bg-white transition hover:border-[#9d3d2b] hover:shadow-sm overflow-hidden"
                          >
                            <details className="em-path-offer-details group/offer w-full flex-1 flex flex-col">
                              <summary className="p-3.5 sm:p-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden flex flex-col justify-between select-none">
                                <div>
                                  <p className="em-path-offer-head flex items-baseline justify-between gap-2 m-0">
                                    <strong className="em-path-offer-name">{offer.name}</strong>
                                    <span className="em-path-offer-price">{offer.price}</span>
                                  </p>
                                  <p className="em-path-offer-inc">{offer.includes}</p>
                                </div>
                                <div className="mt-3 pt-2.5 border-t border-[#f0eae1] flex items-center justify-between text-xs">
                                  <span className="text-[#6a625a] font-medium flex items-center gap-1 group-open/offer:text-[#9d3d2b]">
                                    <span>{locale === "es" ? "Ver alcance" : "View scope"}</span>
                                    <ChevronDown className="size-3.5 transition-transform duration-200 group-open/offer:rotate-180" aria-hidden="true" />
                                  </span>
                                  <button
                                    type="button"
                                    className="text-[#9d3d2b] font-semibold flex items-center gap-1 hover:underline cursor-pointer py-0.5 px-2 rounded hover:bg-[#9d3d2b]/10 transition-colors"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      openFunnel(lane.id, `${c.labels[index]}: ${offer.name}`, offer.price);
                                    }}
                                  >
                                    {locale === "es" ? "Elegir" : "Select"} <ArrowRight className="size-3.5" aria-hidden="true" />
                                  </button>
                                </div>
                              </summary>
                              <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4 pt-2 bg-[#fffaf4] border-t border-[#f0eae1] text-xs">
                                <p className="text-[11px] font-bold uppercase tracking-wider text-[#9d3d2b] mb-2">
                                  {locale === "es" ? "Alcance y entregables" : "Scope & deliverables"}
                                </p>
                                <ul className="space-y-1.5 my-2 text-[#3a3530]" role="list">
                                  {deliverables.map((item, dIdx) => (
                                    <li key={dIdx} className="flex items-start gap-2">
                                      <span className="size-1.5 rounded-full bg-[#9d3d2b] mt-1.5 shrink-0" aria-hidden="true" />
                                      <span className="leading-snug">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                                <button
                                  type="button"
                                  className="w-full mt-3 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-[#9d3d2b] text-white text-xs sm:text-sm font-semibold hover:bg-[#86341f] transition shadow-sm cursor-pointer"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    openFunnel(lane.id, `${c.labels[index]}: ${offer.name}`, offer.price);
                                  }}
                                >
                                  <span>{locale === "es" ? `Elegir ${offer.name} · ${offer.price}` : `Select ${offer.name} · ${offer.price}`}</span>
                                  <ArrowRight className="size-3.5" aria-hidden="true" />
                                </button>
                              </div>
                            </details>
                          </li>
                        );
                      })}
                    </ul>

                    {index === 0 && (
                      <div className="mt-2">
                        <details className="group/terms rounded-xl border border-[#d6cabc] bg-[#fffaf3] p-3 text-xs text-[#6a625a]">
                          <summary className="font-semibold text-[#6a625a] cursor-pointer hover:text-[#101214] list-none flex items-center justify-between [&::-webkit-details-marker]:hidden select-none">
                            <span>{locale === "es" ? "Adicionales y condiciones del servicio Real Estate" : "Real Estate add-ons & service terms"}</span>
                            <Plus className="size-3.5 text-[#9d3d2b] transition-transform duration-200 group-open/terms:rotate-45" aria-hidden="true" />
                          </summary>
                          <div className="mt-2.5 pt-2.5 border-t border-[#e3ded6] text-xs text-[#4d5358] space-y-2.5">
                            <div>
                              <strong className="text-[#101214] block mb-1">{locale === "es" ? "Adicionales disponibles:" : "Available add-ons:"}</strong>
                              <ul className="space-y-1 list-disc pl-4 text-[#554e48]">
                                <li>{locale === "es" ? "Fotografía aérea con dron: $120 por sesión (incluida en el plan Premium)." : "Drone aerial photography: $120 per session (included in Premium)."}</li>
                                <li>{locale === "es" ? "Propiedades adicionales o metraje mayor a 3,000 SF se cotizan por separado." : "Extra properties or homes over 3,000 SF quoted separately."}</li>
                              </ul>
                            </div>
                            <div>
                              <strong className="text-[#101214] block mb-1">{locale === "es" ? "Condiciones del plan:" : "Plan terms:"}</strong>
                              <ul className="space-y-1 list-disc pl-4 text-[#554e48]">
                                <li>{locale === "es" ? `Mínimo de ${REAL_ESTATE_PLAN_TERMS.minimumMonths} meses. Se factura el día 1 de cada mes. Aviso de ${REAL_ESTATE_PLAN_TERMS.cancelNoticeDays} días para cancelar.` : `${REAL_ESTATE_PLAN_TERMS.minimumMonths}-month minimum. Billed on the 1st of each month. ${REAL_ESTATE_PLAN_TERMS.cancelNoticeDays} days' notice to cancel.`}</li>
                                <li>{locale === "es" ? "Flexibilidad de sesiones: si un mes no tienes listado, esa sesión pasa al mes siguiente (hasta 2 guardadas)." : "Rollover flexibility: if you have no listing one month, that shoot rolls to the next month (up to 2 held)."}</li>
                                <li>{locale === "es" ? "No incluye pauta publicitaria paga ni gestión de mensajes directos." : "Excludes paid advertising spend and direct message management."}</li>
                              </ul>
                            </div>
                          </div>
                        </details>
                      </div>
                    )}

                    {index === 1 && (
                      <div className="mt-1">
                        <details className="em-process-details em-sheet-details">
                          <summary className="text-xs font-semibold text-[#6a625a] cursor-pointer hover:text-[#101214] py-1">
                            {locale === "es" ? "Ver video de cliente real" : "Watch real client video"}
                          </summary>
                          <div className="em-sheet-body p-4 bg-[#fffaf4]">
                            <AudienceVideo locale={locale} alt={c.videoAlt} />
                          </div>
                        </details>
                      </div>
                    )}

                    {index === 2 && (
                      <div className="mt-1">
                        <details className="em-process-details em-sheet-details">
                          <summary className="text-xs font-semibold text-[#6a625a] cursor-pointer hover:text-[#101214] py-1">
                            {c.process}
                          </summary>
                          <div className="em-sheet-body p-4 bg-[#fffaf4]">
                            <EditingPreview locale={locale} />
                          </div>
                        </details>
                      </div>
                    )}

                    {/* Primary Action Button */}
                    <div className="mt-2">
                      <Link
                        href={index === 0 ? realEstateReelsPath(locale) : lane.href}
                        data-cta={`home-path-${lane.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          openFunnel(lane.id, c.labels[index], laneFunnelPrice(locale, laneIdAt(index)));
                        }}
                        className="group flex min-h-14 items-center justify-between gap-4 rounded-xl bg-[#9d3d2b] px-5 py-3.5 text-base sm:text-lg font-medium leading-snug text-white transition hover:bg-[#86341f] shadow-sm"
                      >
                        <span>
                          <span className="block font-semibold">{c.labels[index]}</span>
                          <span className="text-xs font-normal text-white/80">{lane.who} · {laneStartingPrice(locale, laneIdAt(index))}</span>
                        </span>
                        <ArrowRight className="size-5 shrink-0 text-white transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {/* Fourth lane: the single projects that used to be their own
              "A la carte" section with a second, parallel WhatsApp entry.
              Owner, 2026-10-14: "This other section needs to merge also
              with the one about what you need." Same server-rendered words
              (titles, notes, what-to-send, service links) behind native
              details, and the same in-place funnel instead of a WhatsApp
              row per card. */}
          <div className="em-path-card em-path-card--single" hidden={activeLane !== SINGLE_ID}>
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#d6cabc] bg-[#fffaf3] shadow-sm">
              {/* Cinematic Lens Backdrop Banner — illustration sits behind like a cinema poster */}
              <div className="em-path-visual relative h-44 sm:h-52 w-full overflow-hidden bg-[#101214]">
                <Image
                  src="/illustrations/property.webp"
                  alt={c.thumbAlt(c.singleLabel)}
                  fill
                  sizes="(max-width: 768px) 100vw, 760px"
                  className="object-cover opacity-35 brightness-90 filter transition-transform duration-700 hover:scale-105"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(16,18,20,0.3) 0%, rgba(16,18,20,0.65) 50%, rgba(16,18,20,0.95) 100%)",
                  }}
                />
                <div className="absolute inset-3 sm:inset-4 border border-white/15 rounded-xl pointer-events-none flex flex-col justify-between p-2.5 sm:p-3.5">
                  <div className="mt-auto">
                    <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium drop-shadow-md">
                      {c.singleLabel}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 font-normal mt-0.5 tracking-wide">
                      {c.singleWho}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <p className="em-single-lead">{single.title} {single.lead} {c.singleLead}</p>
                <ul className="em-single-list" role="list">
              {single.items.map((item) => {
                const scene = aLaCarteVisual(item.id, locale);
                // Real figure only where lib/pricing has one (the photo
                // session floor). Otherwise the item's own quote statement,
                // or a plain "Quoted per project" — never an invented number.
                const noteIsQuote = !!item.note && /^(quoted|cotizaci)/i.test(item.note);
                const itemPrice =
                  item.id === "foto"
                    ? `${c.singleFrom} ${usd(PRODUCT_PHOTO_SESSION.from)}${c.singleSession}`
                    : item.id === "grabacion"
                    ? `${c.singleFrom} ${usd(ON_LOCATION_CAPTURE.from)}${c.singleHalfDay}`
                    : noteIsQuote ? item.note! : c.singleQuoted;
                const showNote = !!item.note && !(item.id !== "foto" && noteIsQuote);
                return (
                  <li key={item.id}>
                    <details className="em-single-item" data-service={item.id}>
                      <summary data-cta={`home_path_single_${item.id}`}>
                        <Image className="em-single-thumb" src={scene.image} alt={c.thumbAlt(item.title)} width={96} height={64} sizes="64px" />
                        <span className="em-single-text">
                          <span className="em-single-title">{item.title}</span>
                          <span className="em-single-price">{itemPrice}</span>
                          {showNote && <span className="em-single-note">{item.note}</span>}
                        </span>
                        <Plus className="em-single-plus" size={18} aria-hidden="true" />
                      </summary>
                      <div className="em-single-panel">
                        <p><strong>{c.singleSend}.</strong> {scene.preparation}</p>
                        <div className="em-single-actions">
                          <button
                            type="button"
                            className="em-single-ask"
                            data-cta={`home_path_single_${item.id}_ask`}
                            onClick={() => openFunnel(SINGLE_ID, `${c.singleLabel}: ${item.title}`, itemPrice)}
                          >
                            {c.singleAsk}
                          </button>
                          {item.href && (
                            <Link href={item.href} className="em-single-service" data-cta={`home_path_single_${item.id}_service`}>
                              {c.singleService}
                            </Link>
                          )}
                        </div>
                      </div>
                    </details>
                  </li>
                );
              })}
            </ul>
            <p className="em-single-credit">{c.singleCredit}</p>
            <div className="em-path-card-info flex flex-col gap-3">
              <Link
                href={locale === "es" ? "/es/contacto" : "/contact"}
                data-cta="home-path-a-la-carte"
                onClick={(e) => {
                  e.preventDefault();
                  openFunnel(SINGLE_ID, c.singleLabel, c.singleQuoted);
                }}
                className="group flex min-h-16 items-center justify-between gap-4 rounded-2xl bg-[#9d3d2b] px-5 py-4 text-lg font-medium leading-snug text-white transition hover:bg-[#86341f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span><span className="block">{c.singleCta}</span><span className="mt-1 block text-xs font-normal uppercase tracking-wide text-white">{c.singleWho}</span></span>
                <ArrowRight className="size-5 shrink-0 text-white transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <a
                href={whatsappHref(site.phone.e164, c.singleWhatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="home_path_single_whatsapp"
                className="inline-flex min-h-11 items-center text-sm font-semibold text-[#6a625a] underline underline-offset-4"
              >
                {quoteCtaLabel(locale)}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
        <nav aria-label={locale === "es" ? "Servicios locales" : "Local services"} className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {c.localLinks.map((link) => (
            <Link key={link.href} href={link.href} className="min-h-11 inline-flex items-center text-[#6a625a] underline underline-offset-4" data-cta="home-local-service">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-10 border-t border-[#ddd4c8] pt-5">
          {/* Price already answered ONCE, in the lane's own `+` disclosure
              above (review item 1, 2026-10-13): opening any of the three
              illustrations/video now shows the starting price before the
              TLDR facts. The price fold that used to live here (a second,
              full breakdown of every package) was the SAME figures in a
              second visual language in the same section — this link is the
              only thing left: an escape hatch to the full comparison page
              for someone who wants every package side by side, not another
              list of prices. */}
          <p className="text-sm leading-6 text-[#4d5358]">{c.pricingDetail}</p>
          <Link
            href={c.pricingHref}
            data-cta="home_path_compare_packages"
            className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[#6a625a] underline underline-offset-4"
          >
            {c.pricingAction}
            <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
          </Link>
        </div>
      </div>
      <HomePathFunnel
        locale={locale}
        open={funnelOpen}
        laneId={funnelLane.id}
        laneLabel={funnelLane.label}
        price={funnelLane.price}
        onClose={() => setFunnelOpen(false)}
      />
    </section>
  );
}
