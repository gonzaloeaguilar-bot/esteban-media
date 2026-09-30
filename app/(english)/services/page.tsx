import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ChartLine,
  ClipboardCheck,
  Laptop,
  MapPin,
  Workflow,
} from "lucide-react";

import { KeepReading } from "@/components/keep-reading";
import { serviceImages } from "@/lib/service-images";
import { Container } from "@/components/ui/container";
import { ServiceLandingDirectory } from "@/components/service-landing-directory";
import { VideoBriefBuilder } from "@/components/video-brief-builder";
import { entityIds } from "@/lib/entity-schema";
import { buildPageMetadata } from "@/lib/site-metadata";
import {
  absoluteUrl,
  scopingQuestions,
  serviceAreas,
  services,
} from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Growth Systems, Websites & Creative Production",
  description:
    "Conversion websites, AI lead capture, local presence, measurement, automation, and creative production for businesses in Fort Lauderdale and South Florida.",
  path: "/services",
  locale: "en",
});

const serviceProof: Record<
  string,
  { href: string; label: string; detail: string }
> = {
  editing: {
    href: "/portfolio/homeowners",
    label: "Homeowners",
    detail: "Published script and video-editing work.",
  },
  "ai-content": {
    href: "/portfolio/my-dler",
    label: "My D'ler",
    detail: "Related brand visuals, social designs, 3D video, and product mockups.",
  },
  "social-planning": {
    href: "/portfolio/ml-colombia",
    label: "ML Colombia",
    detail: "A published social-media video from Esteban's portfolio.",
  },
  "on-location": {
    href: "/portfolio/bar-door-monkey",
    label: "Bar Door Monkey Miami",
    detail: "Pre-production, location, videography, and editing in one project.",
  },
  "website-design": {
    href: "/portfolio/flas-concierge",
    label: "FLAS AI Concierge & Web System",
    detail: "Custom web platform and 24/7 AI lead capture concierge for an auto dealership.",
  },
};

const growthPillars = [
  {
    title: "Conversion websites",
    detail:
      "Mobile-first websites and focused landing pages designed around a clear offer, measured inquiry path, and the content your team needs to publish.",
    icon: Laptop,
    href: "/services/conversion-websites",
  },
  {
    title: "AI lead capture & lifecycle",
    detail:
      "Scoped chatbots, DM flows, email and SMS follow-up that route a new inquiry into the right human or next step. Consent and platform access are confirmed before launch.",
    icon: Bot,
    href: "/services/ai-lead-capture-automation",
  },
  {
    title: "Local presence",
    detail:
      "A practical plan for Google Business Profile, Maps, Apple, Yelp, industry marketplaces, and the pages that explain a local service clearly.",
    icon: MapPin,
    href: "/services/local-presence-seo",
  },
  {
    title: "Data & measurement audit",
    detail:
      "Audit the current journey, measurement, handoffs, and manual work before deciding which system should be built first.",
    icon: ChartLine,
    href: "/services/growth-funnel-audit",
  },
  {
    title: "Custom operations automation",
    detail:
      "Project-scoped integrations, reporting workflows, and AI-assisted operations that connect approved tools and keep a human escalation path.",
    icon: Workflow,
    href: "/services/custom-operations-automation",
  },
  {
    title: "Creative production",
    detail:
      "Video, photography, editing, and social assets that give the website, campaigns, and follow-up system something worth converting around.",
    icon: ClipboardCheck,
    href: "/services/creative-production",
  },
];

export default function ServicesPage() {
  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": absoluteUrl("/services#services"),
    name: "Growth systems and creative production services",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        url: absoluteUrl(`/services#${service.id}`),
        provider: {
          "@id": entityIds.business,
        },
        areaServed: serviceAreas.map((area) => area.name),
      },
    })),
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <section className="py-12 sm:py-16">
        <Container size="xl">
          <p className="text-xs font-medium uppercase text-[#5a6066]">
            Services
          </p>
          <h1 className="mt-4 max-w-3xl font-serif em-display">
            Growth systems that turn an idea into a working digital customer journey.
          </h1>
          {/* THE FIRST SCREEN SAYS WHAT THIS IS AND WHAT TO DO (2026-09-29).
              Measured on the served page before this pass: 1,397 words, one
              image, 20 phone screens, and two paragraphs of prose before a
              single action. Now: one sentence, one action, one real frame of
              his work. The rest of the page is sectioned under the questions
              a client actually asks, and everything that only supports
              reading is folded — collapsed, never removed. */}
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
            Websites, measured lead capture, automation, and creative production,
            built around one confirmed scope so you get more qualified inquiries
            and less manual follow-up.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
            >
              Start a project
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214]/30 px-6 text-sm font-medium text-[#101214] hover:bg-[#101214] hover:text-white"
            >
              See starting prices
            </Link>
          </div>
          {serviceImages["on-location"] ? (
            <Image
              src={serviceImages["on-location"].src}
              alt={serviceImages["on-location"].alt}
              width={1600}
              height={900}
              priority
              sizes="(min-width: 1024px) 960px, 100vw"
              className="mt-8 aspect-[16/9] w-full max-w-4xl rounded-lg object-cover"
              style={{ objectPosition: serviceImages["on-location"].focal }}
            />
          ) : null}

          <section className="mt-12" aria-labelledby="growth-systems-heading">
            <p className="text-xs font-medium uppercase text-[#5a6066]">
              0→1 Growth Systems
            </p>
            <h2
              id="growth-systems-heading"
              className="mt-4 max-w-3xl font-serif text-4xl leading-tight"
            >
              What does Esteban Media build?
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-[#252a2d]">
              Start with the business outcome: more qualified inquiries, a clearer
              local presence, less manual follow-up, or a better way to see what is
              working. Esteban Media combines websites, measured lead capture,
              automation, and creative production around a confirmed scope.
            </p>
            <p className="mt-3 max-w-3xl leading-7 text-[#252a2d]">
              {growthPillars.length} scoped building blocks, one accountable system
              from first search to follow-up. Not a promise that every business
              needs every tool: timing depends on confirmed scope, assets, access,
              consent requirements, and client review cycles.
            </p>
            <p className="mt-3 max-w-3xl leading-7 text-[#252a2d]">
              If you are still deciding what to ask for, start with the{" "}
              <Link
                href="/assessment"
                className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]"
              >
                video strategy diagnostic
              </Link>{" "}
              before sending the project brief.
            </p>
            <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {growthPillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <Link
                    href={pillar.href}
                    key={pillar.title}
                    className="rounded-lg border border-[#ddd4c8] bg-white/50 p-5 transition hover:-translate-y-0.5 hover:border-[#e85d3e] hover:shadow-sm"
                  >
                    <Icon className="size-6 text-[var(--em-accent-ink)]" aria-hidden="true" />
                    <h3 className="mt-4 font-serif text-2xl">{pillar.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                      {pillar.detail}
                    </p>
                  </Link>
                );
              })}
            </div>
            <Link
              href="/services/website-design-fort-lauderdale"
              className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27] underline underline-offset-4"
            >
              Explore the current website and AI lead-capture work
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </section>

          <section className="mt-14" aria-labelledby="creative-production-heading">
            <p className="text-xs font-medium uppercase text-[#5a6066]">
              Creative production
            </p>
            <h2 id="creative-production-heading" className="mt-4 max-w-3xl font-serif text-4xl leading-tight">
              What does creative production include?
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-[#252a2d]">
              Short video editing and photography remain the creative fuel for
              the system. Each service below shows its starting price; every
              project still gets a scoped quote. Looking for what it costs as a
              bundle? The{" "}
              <Link
                href="/pricing"
                className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]"
              >
                pricing and packages page
              </Link>{" "}
              shows the starting price for each package.
            </p>
            <div className="mt-7 grid gap-5 lg:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;
              const proof = serviceProof[service.id];
              return (
                <article
                  id={service.id}
                  key={service.id}
                  className="scroll-mt-24 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6"
                >
                  <div className="flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-[#101214] text-[#e85d3e]">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <div>
                      <h2 className="font-serif text-3xl leading-tight">
                        {service.name}
                      </h2>
                      <p className="mt-3 leading-7 text-[#252a2d]">
                        {service.description}
                      </p>
                      {service.startingPrice ? (
                        <p className="em-price">
                          {service.startingPrice} — every project gets a scoped
                          quote.
                        </p>
                      ) : null}
                    </div>
                  </div>
                  {serviceImages[service.id] ? (
                    /* A real frame from his own work. Services with no honest
                       frame get none — a decorative mismatch costs more than a
                       missing image. */
                    <Image
                      src={serviceImages[service.id].src}
                      alt={serviceImages[service.id].alt}
                      width={1200}
                      height={675}
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="mt-5 h-44 w-full rounded-lg object-cover"
                      style={{ objectPosition: serviceImages[service.id].focal }}
                    />
                  ) : null}
                  <ul className="mt-6 space-y-3 text-sm text-[#252a2d]">
                    <li className="flex gap-3">
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0 text-[#1a9fa3]"
                        aria-hidden="true"
                      />
                      <span>{service.detail}</span>
                    </li>
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#ddd4c8] px-3 py-1 text-xs uppercase text-[#5a6066]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {service.id === "website-design" ? (
                    <Link
                      href="/services/website-design-fort-lauderdale"
                      className="group mt-6 block rounded-lg border border-[#c84a2c] bg-[var(--em-accent-ink)] p-5 text-white shadow-sm transition hover:bg-[var(--em-accent-ink-hover)]"
                    >
                      <span className="text-xs font-bold uppercase tracking-wider text-[#f0b384]">
                        Featured Web & AI Service Hub
                      </span>
                      <span className="mt-2 flex items-center justify-between gap-3 font-serif text-xl font-bold text-white">
                        Explore Website Design & AI Chatbots Hub
                        <ArrowRight
                          className="size-5 shrink-0 transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="mt-2 block text-sm leading-6 text-[#f6f1ea]">
                        View custom web applications, dealership engines, and AI lead capture chatbots for TitanForge, Geebs, FLAS, and Frontline Auto.
                      </span>
                    </Link>
                  ) : proof ? (
                    <Link
                      href={proof.href}
                      className="group mt-6 block rounded-md border border-[#ddd4c8] bg-white/50 p-4 hover:border-[#e85d3e]"
                    >
                      <span className="text-xs font-medium uppercase text-[#5a6066]">
                        Related published work
                      </span>
                      <span className="mt-2 flex items-center justify-between gap-3 font-serif text-xl">
                        {proof.label}
                        <ArrowRight
                          className="size-4 shrink-0 text-[#9f3c27] transition-transform group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="mt-2 block text-sm leading-6 text-[#5a6066]">
                        {proof.detail}
                      </span>
                    </Link>
                  ) : null}
                </article>
              );
            })}
            </div>
          </section>

          <div className="mt-12">
            <VideoBriefBuilder locale="en" />
          </div>
          {/* Everything below only supports READING: how remote and local work
              compare, the scoping questions, and the page directory. One
              fold-out, destinations named. Collapsed is not removed — the
              words stay in the served HTML for every crawler. The JSON-LD
              service anchors (#editing, #ai-content…) stay OUTSIDE, above. */}
          <KeepReading
            id="how-we-work"
            title="How does working with Esteban work?"
            destinations="Remote or on location, the four scoping questions, and every page by project type and South Florida area."
          >
          <section className="mt-10" aria-labelledby="delivery-model-heading">
            <p className="text-xs font-medium uppercase text-[#5a6066]">
              Remote or on location
            </p>
            <h2
              id="delivery-model-heading"
              className="mt-4 max-w-3xl font-serif text-4xl leading-tight"
            >
              Do you need to be in South Florida?
            </h2>
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <article className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
                <Laptop className="size-7 text-[#1a9fa3]" aria-hidden="true" />
                <h3 className="mt-4 font-serif text-3xl">Remote-first work</h3>
                <p className="mt-3 leading-7 text-[#252a2d]">
                  Editing, AI-assisted creative, and social planning can begin
                  with existing footage, references, and the publishing goal.
                  The client does not need to be in South Florida for those
                  services.
                </p>
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  <Link className="text-[#9f3c27] underline underline-offset-4" href="#editing">
                    Video editing
                  </Link>
                  <Link className="text-[#9f3c27] underline underline-offset-4" href="#ai-content">
                    AI-assisted content
                  </Link>
                  <Link className="text-[#9f3c27] underline underline-offset-4" href="#social-planning">
                    Social planning
                  </Link>
                </div>
              </article>
              <article className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
                <MapPin className="size-7 text-[#e85d3e]" aria-hidden="true" />
                <h3 className="mt-4 font-serif text-3xl">South Florida capture</h3>
                <p className="mt-3 leading-7 text-[#252a2d]">
                  Fort Lauderdale and Broward are the local base. Selected
                  Miami-Dade projects are available, while Palm Beach County
                  remains an expansion area considered by project.
                </p>
                <Link
                  href="/areas"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
                >
                  Compare service areas
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </article>
            </div>
          </section>

          <section className="mt-14" aria-labelledby="process-heading">
            <p className="text-xs font-medium uppercase text-[#5a6066]">
              Scoping questions
            </p>
            <h2
              id="process-heading"
              className="mt-4 max-w-3xl font-serif text-4xl leading-tight"
            >
              What defines the scope of a project?
            </h2>
            <ul className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {scopingQuestions.map((question, index) => (
                <li
                  key={question.name}
                  className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5"
                >
                  <span className="text-xs font-medium uppercase text-[#9f3c27]">
                    Question {index + 1}
                  </span>
                  <h3 className="mt-3 font-serif text-2xl">{question.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                    {question.detail}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10" aria-labelledby="pages-by-project-type-heading">
            <h2
              id="pages-by-project-type-heading"
              className="max-w-3xl font-serif text-4xl leading-tight"
            >
              Which page covers your project type and area?
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-[#252a2d]">
              Editing, drone and real estate, restaurants, clinics, events,
              e-commerce and more, by South Florida city and county.
            </p>
            <ServiceLandingDirectory />
          </section>
          </KeepReading>

          <div className="mt-14 rounded-lg bg-[#101214] p-6 text-[#f6f1ea] sm:p-8">
            <h2 className="font-serif text-4xl">Not sure which service fits?</h2>
            <p className="mt-4 max-w-2xl leading-7 text-[#d8d0c7]">
              Send the project goal, location, date, and where the final asset
              will be used. Esteban can shape the scope from there.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
              >
                Start a project
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/assessment"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-6 text-sm font-medium text-white hover:bg-white hover:text-[#101214]"
              >
                Try the diagnostic
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-6 text-sm font-medium text-white hover:bg-white hover:text-[#101214]"
              >
                View published work
              </Link>
              <Link
                href="/guides"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-6 text-sm font-medium text-white hover:bg-white hover:text-[#101214]"
              >
                Read practical video guides
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
