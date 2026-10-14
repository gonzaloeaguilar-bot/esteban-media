import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import RailStats from "@/vendor/rail-kit/RailStats";
import RailTable from "@/vendor/rail-kit/RailTable";
import {
  formatPercent,
  neighborhoodLabels,
  restaurantIgStudy as study,
  restaurantIgStudyCopy,
  restaurantIgStudyPaths,
  type StudyLocale,
  type StudySection,
} from "@/lib/restaurant-ig-study";
import { absoluteUrl, site } from "@/lib/site";

/**
 * Server-rendered study page. Every word — findings, chart labels, table —
 * is in the HTML from the first byte; nothing is mounted on click, so a
 * crawler that runs no JavaScript reads the same page a person does.
 */

function FindingSection({ section }: { section: StudySection }) {
  return (
    <section id={section.id} data-section={`study_${section.id.replace(/-/g, "_")}`} className="border-t border-[var(--em-rule,#ddd4c8)] py-10">
      <h2 className="max-w-3xl font-serif text-3xl leading-tight sm:text-4xl">{section.question}</h2>
      {section.paragraphs.map((p) => (
        <p key={p.slice(0, 32)} className="mt-4 max-w-3xl text-base leading-8 text-[#252a2d]">
          {p}
        </p>
      ))}
    </section>
  );
}

type Bar = { label: string; value: number };

/**
 * Horizontal bars as plain HTML: labels and values are real text in the
 * served page and reflow at phone width (an SVG viewBox shrank its own labels
 * to ~8px at 375px).
 */
function BarChart({ title, bars, tone, locale }: { title: string; bars: Bar[]; tone: string; locale: StudyLocale }) {
  const max = Math.max(...bars.map((b) => b.value), 1);
  return (
    <div role="group" aria-label={title}>
      <p className="text-sm font-semibold text-[#101214]">{title}</p>
      <ul className="mt-3 space-y-2">
        {bars.map((b) => (
          <li key={b.label} className="grid grid-cols-[7.5rem_1fr] items-center gap-3 text-sm sm:grid-cols-[10rem_1fr]">
            <span className="text-[#252a2d]">{b.label}</span>
            <span className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="block h-5 rounded-sm"
                style={{ width: `${Math.max(2, (b.value / max) * 78)}%`, background: tone }}
              />
              <span className="tabular-nums text-[#101214]">{formatPercent(b.value, locale)}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The kit defaults to a dark surface; this page is the site's light paper. */
const railLight = {
  "--rail-text": "#101214",
  "--rail-muted": "#4d5358",
  "--rail-card-bg": "#fbf6ef",
  "--rail-card-border": "#ddd4c8",
  "--rail-table-row-border": "#ddd4c8",
} as CSSProperties;

export function RestaurantIgStudyPage({ locale }: { locale: StudyLocale }) {
  const copy = restaurantIgStudyCopy[locale];
  const path = restaurantIgStudyPaths[locale];
  const pageUrl = absoluteUrl(path);
  const hoods = neighborhoodLabels[locale];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Dataset",
        "@id": `${pageUrl}#dataset`,
        name: copy.datasetName,
        description: copy.datasetDescription,
        url: pageUrl,
        inLanguage: locale === "es" ? "es-US" : "en-US",
        datePublished: study.collectedOn,
        dateModified: study.collectedOn,
        temporalCoverage: study.collectedOn,
        spatialCoverage: {
          "@type": "Place",
          name: "Miami, Florida",
          containedInPlace: { "@type": "State", name: "Florida" },
        },
        variableMeasured: copy.variables,
        measurementTechnique: copy.method.paragraphs.join(" "),
        isAccessibleForFree: true,
        creator: { "@type": "Organization", name: site.name, url: absoluteUrl("/") },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: site.name, item: absoluteUrl(locale === "es" ? "/es" : "/") },
          { "@type": "ListItem", position: 2, name: locale === "es" ? "Guías" : "Guides", item: absoluteUrl(locale === "es" ? "/es/guias" : "/guides") },
          { "@type": "ListItem", position: 3, name: copy.h1, item: pageUrl },
        ],
      },
    ],
  };

  const formatBars: Bar[] = [
    { label: copy.chart.formatLabels.reel, value: study.formats.reelPct },
    { label: copy.chart.formatLabels.carousel, value: study.formats.carouselPct },
    { label: copy.chart.formatLabels.photo, value: study.formats.photoPct },
  ];
  const lengthBars: Bar[] = [
    { label: copy.chart.lengthLabels[0], value: study.reels.under15sPct },
    { label: copy.chart.lengthLabels[1], value: study.reels.from15to30sPct },
    { label: copy.chart.lengthLabels[2], value: study.reels.from30to60sPct },
    { label: copy.chart.lengthLabels[3], value: study.reels.over60sPct },
  ];

  return (
    <main className="bg-[#f6f1ea] text-[#101214]" lang={locale === "es" ? "es" : "en"} style={railLight}>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section data-section="study_hero" className="py-12 sm:py-16">
        <Container size="lg">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">{copy.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl font-serif em-display">{copy.h1}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#252a2d]">{copy.answer}</p>
          <p className="mt-3 text-sm text-[#5a5f62]">
            <time dateTime={study.collectedOn}>{copy.updated}</time>
          </p>
          <div className="mt-8">
            <RailStats source="restaurant_ig_study_stats" columns={4} tiles={copy.stats} />
          </div>
        </Container>
      </section>

      <Container size="lg">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">{copy.findingsHeading}</p>
        {copy.findings.map((section) => (
          <FindingSection key={section.id} section={section} />
        ))}

        <section id="chart" data-section="study_chart" className="border-t border-[var(--em-rule,#ddd4c8)] py-10">
          <h2 className="max-w-3xl font-serif text-3xl leading-tight sm:text-4xl">{copy.chart.question}</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[#252a2d]">{copy.chart.intro}</p>
          <figure className="mt-6 grid max-w-2xl gap-8">
            <BarChart title={copy.chart.formatsTitle} bars={formatBars} tone="#e85d3e" locale={locale} />
            <BarChart title={copy.chart.lengthTitle} bars={lengthBars} tone="#101214" locale={locale} />
          </figure>
          <div className="mt-8 overflow-x-auto">
            <RailTable
              source="restaurant_ig_study_neighborhoods"
              className="[--rail-table-cell-padding:10px_6px] [&_td]:whitespace-nowrap [&_tbody_th]:whitespace-nowrap [&_thead_th]:whitespace-normal [&_thead_th]:align-bottom"
              label={copy.chart.tableLabel}
              nameLabel={locale === "es" ? "Barrio" : "Neighborhood"}
              columns={[
                { id: "accounts", label: copy.chart.columns.accounts, numeric: true },
                { id: "reels", label: copy.chart.columns.reels, numeric: true },
                { id: "spanish", label: copy.chart.columns.spanish, numeric: true },
              ]}
              rows={study.neighborhoods.map((n) => ({
                id: n.neighborhood.toLowerCase().replace(/\s+/g, "-"),
                name: hoods[n.neighborhood] ?? n.neighborhood,
                cells: {
                  accounts: n.accounts,
                  reels: formatPercent(n.medianReelSharePct, locale),
                  spanish: n.spanishOrBilingualAccounts,
                },
              }))}
            />
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#5a5f62]">{copy.chart.note}</p>
        </section>

        <section id={copy.method.id} data-section="study_method" className="border-t border-[var(--em-rule,#ddd4c8)] py-10">
          <h2 className="max-w-3xl font-serif text-3xl leading-tight sm:text-4xl">{copy.method.question}</h2>
          {copy.method.paragraphs.map((p) => (
            <p key={p.slice(0, 32)} className="mt-4 max-w-3xl text-base leading-8 text-[#252a2d]">{p}</p>
          ))}
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#3f4548]">
            <strong>{copy.measuredLabel}</strong> {copy.variables.join(" · ")}
          </p>
          <details className="mt-6 max-w-3xl rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5">
            <summary className="cursor-pointer">
              <h3 className="inline font-serif text-xl">{copy.method.detailsSummary}</h3>
            </summary>
            <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-[#252a2d]">
              {copy.method.details.map((d) => (
                <li key={d.slice(0, 32)}>{d}</li>
              ))}
            </ul>
          </details>
        </section>

        <section id={copy.next.id} data-section="study_next" className="border-t border-[var(--em-rule,#ddd4c8)] py-10 pb-16">
          <h2 className="max-w-3xl font-serif text-3xl leading-tight sm:text-4xl">{copy.next.question}</h2>
          {copy.next.paragraphs.map((p) => (
            <p key={p.slice(0, 32)} className="mt-4 max-w-3xl text-base leading-8 text-[#252a2d]">{p}</p>
          ))}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {copy.next.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-cta={link.cta}
                className="group flex flex-col rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5 hover:border-[#e85d3e]"
              >
                <span className="font-serif text-xl">{link.label}</span>
                <span className="mt-2 text-sm leading-6 text-[#3f4548]">{link.detail}</span>
                <ArrowRight className="mt-4 size-4 text-[#e85d3e]" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
