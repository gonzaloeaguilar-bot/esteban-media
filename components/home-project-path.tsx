"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

import RailSegmented from "@/vendor/rail-kit/RailSegmented";
import { IllustratedScene } from "@/components/illustrated-scene";
import { LaneAnswer } from "@/components/lane-answer";
import { AudienceVideo, EditingPreview } from "@/components/audience-media";

import { AUDIENCE_LANES, type AudienceLocale } from "@/lib/audience-lanes";
import { realEstateReelsPath } from "@/lib/real-estate-reels";
import { laneStartingPrice, type ChooserLaneId } from "@/lib/chooser-lane-pricing";
import { REAL_ESTATE_PLAN_TERMS, turnaroundFor } from "@/lib/pricing";
import { HomePathFunnel } from "@/components/home-path-funnel";

const copy = {
  en: {
    eyebrow: "Find your starting point",
    heading: "What do you need made?",
    intro: "Choose a project to see the relevant work and next steps.",
    labels: ["Reels for my properties", "Short videos for my business", "Edit footage I already have"],
    /* The control needs two or three words, not a sentence: at full length the
       three options stacked into one grey block with the inactive ones barely
       legible. The full label still reads on the card below. */
    tabs: ["Real estate", "Business", "Editing only"],
    artAlts: [
      "Concept illustration of a home, camera and property photographs",
      "Concept illustration of a cafe being filmed on a phone",
      "Concept illustration of an editing desk with a monitor, filmstrip and headphones",
    ],
    pricingDetail: "Choose a package to see everything included. Final pricing depends on the project scope.",
    pricingAction: "Compare packages",
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
    minimumTerm: `${REAL_ESTATE_PLAN_TERMS.minimumMonths}-month minimum commitment — full terms below`,
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
    tabs: ["Inmobiliaria", "Negocio", "Solo edición"],
    artAlts: [
      "Ilustración conceptual de una casa, una cámara y fotografías de la propiedad",
      "Ilustración conceptual de un café grabado con un celular",
      "Ilustración conceptual de una mesa de edición con monitor, película y audífonos",
    ],
    pricingDetail: "Elige un paquete para ver todo lo incluido. El precio final depende del alcance del proyecto.",
    pricingAction: "Comparar paquetes",
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
    minimumTerm: `Mínimo de ${REAL_ESTATE_PLAN_TERMS.minimumMonths} meses de compromiso — condiciones completas abajo`,
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

export function HomeProjectPath({ locale }: { locale: AudienceLocale }) {
  const c = copy[locale];
  const lanes = AUDIENCE_LANES[locale].lanes;
  const [activeLane, setActiveLane] = useState(lanes[0].id);
  const [funnelOpen, setFunnelOpen] = useState(false);
  const [funnelLane, setFunnelLane] = useState<{ id: string; label: string }>({ id: lanes[0].id, label: c.labels[0] });
  const openFunnel = (id: string, label: string) => {
    setFunnelLane({ id, label });
    setFunnelOpen(true);
  };

  return (
    <section id="start" aria-labelledby={`home-path-${locale}`} data-section="home-project-path" className="bg-[#f7f5f1] py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-medium uppercase tracking-wider text-[#6a625a]">{c.eyebrow}</p>
        <h2 id={`home-path-${locale}`} className="mt-2 font-serif text-4xl leading-tight sm:text-5xl">{c.heading}</h2>
        <p className="mt-2 max-w-2xl text-base leading-7 text-[#4d5358]">{c.intro}</p>
        {/* A CONTROL, not three cards to swipe. Owner, 2026-10-12: the real
            estate section "is truly nice on its own... feel we can combine
            them if we have some sort of filter and control" — this is the
            same RailSegmented the monthly plans already use, so the page
            teaches the gesture once. Picking a lane swaps the card below. */}
        <div className="em-path-choice mt-5">
          <RailSegmented
            segments={lanes.map((lane, i) => ({ id: lane.id, label: c.tabs[i] }))}
            activeId={activeLane}
            label={locale === "es" ? "Tipo de proyecto" : "Project type"}
            block
            source={`home_project_path_${locale}`}
            onSelect={({ id }: { id: string }) => setActiveLane(id)}
          />
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
              {/* The flat .webp was the defect. Owner, 2026-10-12, on this
                  exact card: "this is missing the animations, each had..." —
                  the same three illustrations animate everywhere else on the
                  site through IllustratedScene (viewfinder, record dot,
                  filmstrip, tilt, and a disclosure that reveals what you get).
                  The chooser rendered them as a still image, so the one card
                  a visitor actually lands on was the only dead one.
                  Composed exactly as AudienceRouter does it: the scene is its
                  own element, the link is the row beneath it, so a disclosure
                  is never nested inside an anchor.
                  Above 1024px the card is two columns (art left, capped at
                  640px; link + process right) instead of one phone column
                  stretched wide — 2026-10-12 review item 7: the illustration
                  rendered at 1187px, the biggest object on the homepage. */}
              {index === 1 ? (
                <AudienceVideo locale={locale} alt={c.videoAlt} />
              ) : (
                <IllustratedScene
                  image={`/illustrations/${artwork[index]}.webp`}
                  alt={c.artAlts[index]}
                  kind={index === 2 ? "edit" : "photo"}
                  source={`home-path-${lane.id}`}
                  locale={locale}
                  label={c.sceneLabels[index]}
                  facts={[...c.sceneFacts[index]]}
                  price={laneStartingPrice(locale, laneIdAt(index))}
                  detailsHref={index === 0 ? realEstateReelsPath(locale) : lane.href}
                />
              )}
              <div className="em-path-card-info mt-3 lg:mt-0 flex flex-col gap-3">
                {/* The business lane's artwork is a video, not IllustratedScene,
                    so its price/TLDR answer lives here instead — inside the
                    SAME grid column as the CTA button. It used to sit as its
                    own grid item beside the video, which pushed the three
                    children of .em-path-card into a 2-column/3-item grid and
                    left a second, empty row under the button at desktop
                    (review item 6: 395px of dead cream at 1440). */}
                {index === 1 && (
                  <LaneAnswer
                    source={`home-path-${lane.id}`}
                    locale={locale}
                    label={c.sceneLabels[index]}
                    price={laneStartingPrice(locale, laneIdAt(index))}
                    facts={[...c.sceneFacts[index]]}
                    detailsHref={lane.href}
                  />
                )}
                {/* Minimum-term qualifier (real estate) / turnaround floor
                    (editing), sitting ~14px above the CTA so the condition is
                    read before anyone commits. Both figures come from
                    lib/pricing.ts, never typed here. */}
                {index === 0 && (
                  <p className="em-path-qualifier">{c.minimumTerm}</p>
                )}
                {index === 2 && (
                  <p className="em-path-qualifier">{c.turnaround(turnaroundFor("arranque").minimumDays)}</p>
                )}
                {/* The filled, terracotta row is now the ONE primary action in
                    the section (review item 5: "the red button is currently
                    the SECONDARY action"); starting prices is demoted below
                    to the compact related-link treatment. Owner, 2026-10-13:
                    the CTA (and the scene) open an in-place 2-step contact
                    takeover instead of navigating away. The real href stays
                    as the no-JS fallback and keeps every existing data-cta
                    value unchanged. */}
                <Link
                  href={index === 0 ? realEstateReelsPath(locale) : lane.href}
                  data-cta={`home-path-${lane.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    openFunnel(lane.id, c.labels[index]);
                  }}
                  className="group flex min-h-16 items-center justify-between gap-4 rounded-2xl bg-[#9d3d2b] px-5 py-4 text-lg font-medium leading-snug text-white transition hover:bg-[#86341f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span><span className="block">{c.labels[index]}</span><span className="mt-1 block text-xs font-normal uppercase tracking-wide text-white">{lane.who}</span></span>
                  <ArrowRight className="size-5 shrink-0 text-white transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                {index === 2 && (
                  <details className="em-process-details em-sheet-details">
                    <summary>{c.process}</summary>
                    <div className="em-sheet-body">
                      <EditingPreview locale={locale} />
                    </div>
                  </details>
                )}
              </div>
            </div>
            );
          })}
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
        onClose={() => setFunnelOpen(false)}
      />
    </section>
  );
}
