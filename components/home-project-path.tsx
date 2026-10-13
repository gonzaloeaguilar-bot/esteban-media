"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

import RailSegmented from "@/vendor/rail-kit/RailSegmented";
import { PriceSheet } from "@/components/price-sheet";
import { IllustratedScene } from "@/components/illustrated-scene";
import { LaneAnswer } from "@/components/lane-answer";
import { AudienceVideo, EditingPreview } from "@/components/audience-media";

import { AUDIENCE_LANES, type AudienceLocale } from "@/lib/audience-lanes";
import { realEstateReelsPath } from "@/lib/real-estate-reels";
import { laneStartingPrice, type ChooserLaneId } from "@/lib/chooser-lane-pricing";

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
    pricing: "Starting prices",
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
    pricing: "Precios para empezar",
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
            teaches the gesture once. Picking a lane swaps the card below and
            decides what the price sheet opens on. */}
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
          {lanes.filter((lane) => lane.id === activeLane).map((lane) => {
            const index = lanes.findIndex((l) => l.id === lane.id);
            return (
            <div key={lane.id} className="em-path-card">
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
                <>
                  <AudienceVideo locale={locale} alt={c.videoAlt} />
                  <LaneAnswer
                    source={`home-path-${lane.id}`}
                    locale={locale}
                    label={c.sceneLabels[index]}
                    price={laneStartingPrice(locale, laneIdAt(index))}
                    facts={[...c.sceneFacts[index]]}
                    detailsHref={lane.href}
                  />
                </>
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
                {/* The filled, terracotta row is now the ONE primary action in
                    the section (review item 5: "the red button is currently
                    the SECONDARY action"); starting prices is demoted below
                    to the compact related-link treatment. */}
                <Link href={index === 0 ? realEstateReelsPath(locale) : lane.href} data-cta={`home-path-${lane.id}`} className="group flex min-h-16 items-center justify-between gap-4 rounded-2xl bg-[#9d3d2b] px-5 py-4 text-lg font-medium leading-snug text-white transition hover:bg-[#86341f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                  <span><span className="block">{c.labels[index]}</span><span className="mt-1 block text-xs font-normal uppercase tracking-wide text-white">{lane.who}</span></span>
                  <ArrowRight className="size-5 shrink-0 text-white transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                {index === 2 && (
                  <details className="em-process-details">
                    <summary>{c.process}</summary>
                    <EditingPreview locale={locale} />
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
          {/* ONE button instead of a price grid. The four package cards used
              to sit here, and the monthly real-estate plans were a separate
              section three screens further down — so a visitor comparing cost
              had to hold two blocks in their head, far apart, with long pages
              in between. Owner, 2026-10-12: "the prices should show up after,
              in some modal or sheet, cause the pages that come after are so
              long I get lost trying to find pricing."
              The sheet reads the SAME sources the pricing pages read, so no
              figure can drift, and it shows the monthly plans when the real
              estate lane is the one selected. */}
          <p className="text-sm leading-6 text-[#4d5358]">
            <strong className="text-[#101214]">{c.pricing}</strong> {c.pricingDetail}
          </p>
          <PriceSheet locale={locale} showPlans={activeLane === "real-estate"} />
        </div>
      </div>
    </section>
  );
}
