import Link from "next/link";
import { ArrowRight, Building2, Video, Camera, Zap, MapPin } from "lucide-react";

import { Container } from "@/components/ui/container";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { REAL_ESTATE_MEDIA } from "@/lib/services-config";
import { REAL_ESTATE_PLANS, REAL_ESTATE_PLAN_TERMS, usd } from "@/lib/pricing";
import { PageUpdated } from "@/components/page-updated";

export const metadata = buildPageMetadata({
  title: "Real Estate Media Hub — Fort Lauderdale, Miami-Dade & Broward",
  description:
    "Central hub for real estate video, photography, drone, AI enhancement, and monthly plans in Fort Lauderdale, Miami-Dade, and Broward. Compare per-shoot rates vs monthly plans, see coverage areas, and choose the right fit for your listings.",
  path: "/real-estate",
  locale: "en",
});

const realEstateServices = [
  {
    title: "Real Estate Reels Editing",
    description: "Turn property walkthroughs, drone clips, and agent pieces into vertical listing Reels that buyers can inspect.",
    href: "/services/real-estate-reels-video-editor-south-florida",
    icon: Video,
    coverage: "South Florida / Remote",
  },
  {
    title: "Drone Video Editing",
    description: "Post-production for aerial property footage: stabilization, color correction, and neighborhood context cuts.",
    href: "/services/real-estate-drone-video-editing-miami",
    icon: Zap,
    coverage: "Miami-Dade / Broward / Remote",
  },
  {
    title: "AI Photo Enhancement",
    description: "Prepare and enhance listing photos with AI-assisted editing for MLS, Zillow, and social channels.",
    href: "/services/ai-real-estate-photo-enhancement",
    icon: Camera,
    coverage: "Remote (supply your photos)",
  },
  {
    title: "Commercial Real Estate Video",
    description: "Video editing for office, retail, industrial, and multifamily investment properties in Miami.",
    href: "/services/commercial-real-estate-video-miami",
    icon: Building2,
    coverage: "Miami / Miami-Dade",
  },
  {
    title: "Coral Gables Luxury Video",
    description: "Cinematic editing for high-end Coral Gables residences, estates, and waterfront properties.",
    href: "/services/real-estate-video-coral-gables",
    icon: Building2,
    coverage: "Coral Gables / Miami-Dade",
  },
  {
    title: "Aventura & Sunny Isles Condo Video",
    description: "Penthouse walkthroughs, intracoastal views, and luxury condo promos for Aventura and Sunny Isles Beach.",
    href: "/services/real-estate-video-aventura-miami",
    icon: Building2,
    coverage: "Aventura / Sunny Isles Beach",
  },
  {
    title: "Sunny Isles Beach Video",
    description: "Oceanfront condo and resort property video editing for Sunny Isles Beach listings.",
    href: "/services/real-estate-video-sunny-isles",
    icon: Building2,
    coverage: "Sunny Isles Beach / Miami-Dade",
  },
  {
    title: "Real Estate Photography & Video Rates",
    description: "Published photography tiers by home size, drone add-on, Zillow 3D tour, premium listing video per minute, and travel fees.",
    href: "/pricing/real-estate",
    icon: MapPin,
    coverage: "Fort Lauderdale / Miami-Dade / Broward",
  },
] as const;

const guides = [
  {
    title: "How Much Does Real Estate Video Cost in Miami?",
    description: "Photography tiers, per-minute video rate, Zillow tour starting price, travel fees, and monthly plan comparison.",
    href: "/guides/how-much-does-real-estate-video-cost-miami",
  },
  {
    title: "Instagram Reels Ideas for Real Estate Agents",
    description: "Content ideas for listing Reels, agent branding clips, neighborhood features, and market updates.",
    href: "/guides/instagram-reels-ideas-for-real-estate",
  },
] as const;

function ServiceCard({ service }: { service: typeof realEstateServices[0] }) {
  return (
    <Link
      href={service.href}
      className="group flex flex-col h-full rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8 transition-colors hover:border-[var(--em-accent-ink,#a8381d)]"
    >
      <service.icon className="size-8 text-[#e85d3e]" aria-hidden="true" />
      <h3 className="mt-5 font-serif text-xl leading-snug text-[#101214] group-hover:text-[var(--em-accent-ink,#a8381d)]">
        {service.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-[#252a2d]">{service.description}</p>
      <div className="mt-auto flex items-center justify-between gap-4">
        <span className="text-xs font-medium uppercase text-[#5a6066]">{service.coverage}</span>
        <ArrowRight className="size-4 text-[#9f3c27] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </div>
    </Link>
  );
}

function GuideCard({ guide }: { guide: typeof guides[0] }) {
  return (
    <Link
      href={guide.href}
      className="group flex flex-col h-full rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 transition-colors hover:border-[var(--em-accent-ink,#a8381d)]"
    >
      <h3 className="font-serif text-xl leading-snug text-[#101214] group-hover:text-[var(--em-accent-ink,#a8381d)]">
        {guide.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-[#252a2d]">{guide.description}</p>
      <div className="mt-auto">
        <ArrowRight className="size-4 text-[#9f3c27] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </div>
    </Link>
  );
}

export default function RealEstateHubPage() {
  const essential = REAL_ESTATE_PLANS[0];
  const plus = REAL_ESTATE_PLANS[1];
  const premium = REAL_ESTATE_PLANS[2];

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": absoluteUrl("/real-estate#page"),
                name: "Real Estate Media Hub — Fort Lauderdale, Miami-Dade & Broward",
                description:
                  "Central hub for real estate video, photography, drone, AI enhancement, and monthly plans in Fort Lauderdale, Miami-Dade, and Broward.",
                url: absoluteUrl("/real-estate"),
                inLanguage: "en-US",
                isPartOf: { "@id": absoluteUrl("/#website") },
              },
              {
                "@type": "BreadcrumbList",
                "@id": absoluteUrl("/real-estate#breadcrumbs"),
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: absoluteUrl("/"),
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Services",
                    item: absoluteUrl("/services"),
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "Real Estate Media Hub",
                    item: absoluteUrl("/real-estate"),
                  },
                ],
              },
            ],
          }),
        }}
      />

      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20">
        <Container size="xl">
          <nav aria-label="Breadcrumbs" className="mb-8 text-sm text-[#5a6066]">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-[#9f3c27]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/services" className="hover:text-[#9f3c27]">
                  Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">
                Real Estate Media Hub
              </li>
            </ol>
          </nav>

          <div className="max-w-4xl">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--em-accent-ink,#a8381d)]">
              Real estate media pillar
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Real Estate Video, Photography & Drone for South Florida Listings
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
              One hub linking every real estate service: Reels editing, drone post-production, AI photo enhancement, commercial and luxury property video, published photography rates by home size, and monthly plans for agents who list every month. Base: Fort Lauderdale. Coverage: Miami-Dade & Broward. Palm Beach County by conversation.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink,#a8381d)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
              >
                Discuss a Listing Project
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/pricing/real-estate"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
              >
                View Published Rates
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16 lg:py-20" data-section="re_services">
        <Container size="xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--em-accent-ink,#a8381d)]">
            Real estate services
          </p>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-tight sm:text-4xl">
            Editing, drone, AI enhancement, and commercial property video
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[#5a6066]">
            All editing is remote from Fort Lauderdale. On-location capture is scoped per project in Miami-Dade and Broward. Send raw clips, listing-safe facts, and must-show features; every project gets a written quote before work starts.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {realEstateServices.map((service) => (
              <ServiceCard key={service.href} service={service} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-[#ddd4c8] py-12 sm:py-16 lg:py-20" data-section="re_plans">
        <Container size="xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--em-accent-ink,#a8381d)]">
            Monthly plans for active agents
          </p>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-tight sm:text-4xl">
            Monthly property plans vs per-shoot pricing
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[#5a6066]">
            Choose monthly plans when you list multiple properties per month and want predictable, bundled shoots and social posts. Choose per-shoot when you have occasional listings or need a single photography, video, or drone session.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { plan: essential, label: "Essential" },
              { plan: plus, label: "Plus" },
              { plan: premium, label: "Premium" },
            ].map(({ plan, label }) => (
              <div
                key={plan.id}
                className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8 flex flex-col"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-2xl text-[#101214]">{label}</h3>
                  <span className="font-serif text-3xl text-[var(--em-accent-ink,#a8381d)]">
                    {usd(plan.price)}/mo
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                  {plan.properties} {plan.properties === 1 ? "property" : "properties"} per month · up to 3,000 SF each
                </p>
                <ul className="mt-6 space-y-3 flex-1">
                  <li className="flex items-center gap-2 text-sm leading-6 text-[#252a2d]">
                    <span className="size-1.5 rounded-full bg-[var(--em-accent-ink,#a8381d)]" aria-hidden="true" />
                    {plan.productionDays} production day{plan.productionDays > 1 ? "s" : ""} per month
                  </li>
                  <li className="flex items-center gap-2 text-sm leading-6 text-[#252a2d]">
                    <span className="size-1.5 rounded-full bg-[var(--em-accent-ink,#a8381d)]" aria-hidden="true" />
                    Drone photography: {plan.drone === "included" ? "included" : "add-on ($99)"}
                  </li>
                  <li className="flex items-center gap-2 text-sm leading-6 text-[#252a2d]">
                    <span className="size-1.5 rounded-full bg-[var(--em-accent-ink,#a8381d)]" aria-hidden="true" />
                    {plan.postsPerWeek} post{plan.postsPerWeek.includes("–") ? "" : "s"} per week
                  </li>
                </ul>
                <p className="mt-6 text-xs leading-5 text-[#5a6066]">
                  {REAL_ESTATE_PLAN_TERMS.minimumMonths}-month minimum · cancel with {REAL_ESTATE_PLAN_TERMS.cancelNoticeDays} days notice · Metricool report every {REAL_ESTATE_PLAN_TERMS.reportEveryDays} days
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 max-w-3xl">
            <Link
              href="/pricing/real-estate"
              className="group inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
            >
              View full rate card with photography tiers, add-ons, and terms
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-t border-[#ddd4c8] py-12 sm:py-16 lg:py-20" data-section="re_guides">
        <Container size="xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--em-accent-ink,#a8381d)]">
            Decision guides
          </p>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-tight sm:text-4xl">
            Answer-first guides for your next listing decision
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[#5a6066]">
            Each guide leads with the direct answer, then expands with FAQs and transparent pricing from the same source as the rate card.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {guides.map((guide) => (
              <GuideCard key={guide.href} guide={guide} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-[#ddd4c8] py-12 sm:py-16 lg:py-20" data-section="re_coverage">
        <Container size="xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--em-accent-ink,#a8381d)]">
            Service area
          </p>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-tight sm:text-4xl">
            Fort Lauderdale base, Miami-Dade & Broward coverage
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[#252a2d]">
            Esteban Moreno Media is based in Fort Lauderdale. Remote editing serves clients nationwide. On-location filming is available in Miami-Dade and Broward by project. Palm Beach County is an expansion area — availability is confirmed per address before booking. The out-of-area fee applies north of West Palm Beach or south of Hollywood.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <MapPin className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h3 className="mt-5 font-serif text-xl">Fort Lauderdale (Base)</h3>
              <p className="mt-3 text-sm leading-6 text-[#252a2d]">Editing, planning, and local production hub. Broward County priority.</p>
            </div>
            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <MapPin className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h3 className="mt-5 font-serif text-xl">Miami-Dade County</h3>
              <p className="mt-3 text-sm leading-6 text-[#252a2d]">Selected on-location projects: Miami, Coral Gables, Aventura, Sunny Isles, Brickell, Doral, Miami Beach.</p>
            </div>
            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <MapPin className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h3 className="mt-5 font-serif text-xl">Broward County</h3>
              <p className="mt-3 text-sm leading-6 text-[#252a2d]">Fort Lauderdale, Hollywood, Pembroke Pines, Weston, Davie, Pompano Beach, Deerfield Beach.</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-[#ddd4c8] py-12 sm:py-16 lg:py-20" data-section="re_decision">
        <Container size="xl">
          <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-medium uppercase text-[#5a6066]">
                  Decision boundary
                </p>
                <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
                  Monthly plan <span className="text-[var(--em-accent-ink,#a8381d)]">$750–$1,950</span>/mo vs per-listing shoot
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  If you list 2+ properties per month and need recurring Reels, photos, and drone, a monthly plan bundles the work at a predictable cost. If you have occasional listings or need a one-off photography, video, or drone session, the per-shoot rate card gives exact pricing by home size. Both use the same published figures from Esteban's rate card.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/pricing/real-estate"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink,#a8381d)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Compare Full Rate Card
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  Ask Which Fits
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-[#ddd4c8] py-12 sm:py-16 lg:py-20" data-section="re_proof">
        <Container size="xl">
          <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
            <Building2 className="size-8 text-[#e85d3e]" aria-hidden="true" />
            <h2 className="mt-5 font-serif text-3xl">Real estate proof</h2>
            <p className="mt-4 text-sm leading-6 text-[#252a2d]">
              Our portfolio project <strong>Homeowners</strong> proves published real estate property video editing for an agency client.
            </p>
            <Link
              href="/portfolio/homeowners"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
            >
              Review Homeowners Real Estate Video Proof
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Container>
      </section>

      <section className="pb-12 sm:pb-16" data-section="re_cta">
        <Container size="xl">
          <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-medium uppercase text-[#5a6066]">
                  Get Started
                </p>
                <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
                  Ready to edit your next listing video?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Send raw walkthrough clips, drone footage, listing-safe facts, agent branding, and the must-show features. Per-shoot rates are published, and every project gets a written quote before editing starts.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink,#a8381d)] px-5 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Email
                </a>
                <a
                  href={site.phone.href}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  Call
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <PageUpdated path="/real-estate" locale="en" className="py-6 text-xs text-[#5a6066]" />
    </main>
  );
}