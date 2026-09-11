import Link from "next/link";
import { ArrowRight, HelpCircle, Laptop, MapPin } from "lucide-react";

import { ServiceLandingDirectory } from "@/components/service-landing-directory";
import { Container } from "@/components/ui/container";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, serviceAreas } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Miami & Fort Lauderdale Video Editing Services",
  description:
    "Explore video editing, AI-assisted content, and social planning for Fort Lauderdale, Broward, and Miami-Dade. Palm Beach projects are scoped individually.",
  path: "/areas",
  locale: "en",
});

const areaAnchors: Record<string, string> = {
  "Fort Lauderdale": "fort-lauderdale",
  "Broward County": "broward-county",
  "Miami-Dade": "miami-dade",
  "Palm Beach County": "palm-beach-county",
};

const miamiProof = [
  {
    href: "/portfolio/bar-door-monkey",
    title: "Bar Door Monkey Miami",
    detail:
      "A Miami promotional video covering pre-production, location, videography, and editing.",
  },
  {
    href: "/portfolio/healthy-smile",
    title: "Healthy Smile Miami",
    detail:
      "A Miami promotional video developed from sketch and script through filming and editing.",
  },
];

const serviceAreaFaqs = [
  {
    question: "How does remote editing differ from local content capture?",
    answer:
      "Remote video editing, AI-assisted content workflows, and social media planning begin directly from supplied footage and project references, serving clients across South Florida and remotely. On-location content capture is evaluated selectively based on the filming site, objectives, and schedule in Fort Lauderdale or Broward, with Miami-Dade available for confirmed projects.",
  },
  {
    question: "Can footage filmed outside South Florida be edited remotely?",
    answer:
      "Yes. Post-production video editing, audio mixing, color finishing, and social formatting work directly with digital source assets transferred online from any location, without geographic restrictions.",
  },
  {
    question: "How is project availability evaluated for Palm Beach County?",
    answer:
      "Palm Beach County is an expansion area evaluated on an individual project basis for on-location filming. Remote video editing and content planning remain available for any project with supplied source footage.",
  },
  {
    question: "Do you provide bilingual English and Spanish content support?",
    answer:
      "Yes. Esteban Moreno Media provides Spanish-first and bilingual video editing, content planning, and narrative pacing structured for South Florida businesses reaching both English and Spanish-speaking audiences.",
  },
  {
    question: "What details help clarify a new project inquiry?",
    answer:
      "Specify whether you have existing source footage to edit or need on-location filming. Sharing the primary project objective, intended publishing platforms, and target timeline helps Esteban confirm whether the project can proceed remotely or requires a scheduled local production visit.",
  },
];

export default function AreasPage() {
  const areaJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        "@id": absoluteUrl("/areas#service-areas"),
        name: "Service areas for Esteban Moreno Media",
        itemListElement: serviceAreas.map((area, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": area.schemaType,
            name: area.name,
            description: area.description,
            url: absoluteUrl(`/areas#${areaAnchors[area.name]}`),
            ...(area.schemaType === "City"
              ? {
                  containedInPlace: {
                    "@type": "AdministrativeArea",
                    name: area.county,
                  },
                }
              : {}),
          },
        })),
      },
      {
        "@type": "FAQPage",
        "@id": absoluteUrl("/areas#faq"),
        mainEntity: serviceAreaFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(areaJsonLd) }}
      />
      <section className="py-12 sm:py-16">
        <Container size="xl">
          <p className="text-xs font-medium uppercase text-[#5a6066]">
            Service areas
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-none sm:text-6xl">
            Fort Lauderdale-based, providing practical video editing and AI-assisted content for South Florida.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
            Fort Lauderdale and Broward are the local base, with selected work
            available in Miami-Dade. Palm Beach County remains an expansion
            area considered by project. Esteban operates as a service-area
            business and does not publish a studio address.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {serviceAreas.map((area) => (
              <article
                key={area.name}
                id={areaAnchors[area.name]}
                className="scroll-mt-24 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6"
              >
                <MapPin className="size-6 text-[#e85d3e]" aria-hidden="true" />
                <p className="mt-5 text-xs uppercase text-[#5a6066]">
                  {area.county}
                </p>
                <h2 className="mt-3 font-serif text-3xl">{area.name}</h2>
                <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                  {area.description}
                </p>
                {area.href !== "/areas" ? (
                  <Link
                    href={area.href}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27] hover:text-[#7f2f20]"
                  >
                    Explore {area.name}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                ) : null}
              </article>
            ))}
          </div>

          <section className="mt-14" aria-labelledby="location-model-heading">
            <p className="text-xs font-medium uppercase text-[#5a6066]">
              What location changes
            </p>
            <h2
              id="location-model-heading"
              className="mt-4 max-w-3xl font-serif text-4xl leading-tight"
            >
              Remote services travel through files. Capture work starts with a place.
            </h2>
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <article className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
                <Laptop className="size-7 text-[#1a9fa3]" aria-hidden="true" />
                <h3 className="mt-4 font-serif text-3xl">Remote editing and planning</h3>
                <p className="mt-3 leading-7 text-[#252a2d]">
                  Video editing, AI-assisted content, and social planning can
                  begin with existing files and references. Those services are
                  available to clients beyond South Florida. Spanish-first
                  clients can use the{" "}
                  <Link
                    href="/es/guias"
                    className="underline underline-offset-4 hover:text-[#9f3c27]"
                  >
                    practical video guides
                  </Link>{" "}
                  to define and review their next video project before a
                  remote handoff.
                </p>
                <Link
                  href="/services#editing"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
                >
                  Explore remote video editing
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </article>
              <article className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
                <MapPin className="size-7 text-[#e85d3e]" aria-hidden="true" />
                <h3 className="mt-4 font-serif text-3xl">Local content capture</h3>
                <p className="mt-3 leading-7 text-[#252a2d]">
                  On-location video production is considered selectively after
                  the project location, goal, and capture needs are known. Fort
                  Lauderdale is the local base for that conversation.
                </p>
                <Link
                  href="/services#on-location"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
                >
                  Review on-location services
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </article>
            </div>
          </section>

          <section className="mt-14" aria-labelledby="miami-proof-heading">
            <p className="text-xs font-medium uppercase text-[#5a6066]">
              Verified Miami work
            </p>
            <h2
              id="miami-proof-heading"
              className="mt-4 max-w-3xl font-serif text-4xl leading-tight"
            >
              Published project proof for Miami-Dade availability.
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-[#252a2d]">
              These are real Miami projects from Esteban&apos;s{" "}
              <Link
                href="/portfolio"
                className="underline underline-offset-4 hover:text-[#9f3c27]"
              >
                public portfolio
              </Link>
              . They document the work shown; they do not imply results or
              services that are not listed in the project credits.
            </p>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {miamiProof.map((project) => (
                <Link
                  key={project.href}
                  href={project.href}
                  className="group rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 hover:border-[#e85d3e]"
                >
                  <span className="flex items-center justify-between gap-3 font-serif text-3xl">
                    {project.title}
                    <ArrowRight
                      className="size-5 shrink-0 text-[#9f3c27] transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-3 block text-sm leading-6 text-[#252a2d]">
                    {project.detail}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section
            className="mt-14 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8"
            aria-labelledby="restaurant-service-heading"
          >
            <p className="text-xs font-medium uppercase text-[#5a6066]">
              Restaurant projects in Miami
            </p>
            <h2
              id="restaurant-service-heading"
              className="mt-4 max-w-3xl font-serif text-4xl leading-tight"
            >
              Looking for restaurant video editing rather than area coverage?
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-[#252a2d]">
              This page explains where Esteban works. For restaurant promotion
              details and the relevant project inquiry, use the dedicated Miami
              service page for{" "}
              <Link
                href="/services/restaurant-promo-video-editing-miami"
                className="underline underline-offset-4 hover:text-[#9f3c27]"
              >
                restaurant promo video editing in Miami
              </Link>
              .
            </p>
            <Link
              href="/services/restaurant-promo-video-editing-miami"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27] hover:text-[#7f2f20]"
            >
              Restaurant promo video editing in Miami
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </section>

          <section
            className="mt-14 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8"
            aria-labelledby="location-inquiry-heading"
          >
            <p className="text-xs font-medium uppercase text-[#5a6066]">
              What to include with a location inquiry
            </p>
            <h2
              id="location-inquiry-heading"
              className="mt-4 max-w-3xl font-serif text-4xl leading-tight"
            >
              Start with the place, the goal, and the footage.
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-[#252a2d]">
              For on-location capture, share the county, project goal, and what
              needs to be filmed. For editing, AI-assisted content, or social
              planning, share the source files or references you already have
              and where the finished content will be used. That gives Esteban
              enough context to discuss whether the work can begin remotely or
              needs a selectively scoped South Florida visit.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[#9f3c27] hover:text-[#7f2f20]"
              >
                Send the project details
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-[#9f3c27] hover:text-[#7f2f20]"
              >
                Compare services
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </section>

          <section
            className="mt-14"
            aria-labelledby="service-areas-faq-heading"
          >
            <p className="text-xs font-medium uppercase text-[#5a6066]">
              Common questions
            </p>
            <h2
              id="service-areas-faq-heading"
              className="mt-4 max-w-3xl font-serif text-4xl leading-tight"
            >
              Frequently asked questions about service areas and production.
            </h2>
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              {serviceAreaFaqs.map((faq) => (
                <article
                  key={faq.question}
                  className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6"
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle
                      className="mt-1 size-5 shrink-0 text-[#9f3c27]"
                      aria-hidden="true"
                    />
                    <h3 className="font-serif text-2xl leading-tight">
                      {faq.question}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                    {faq.answer}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <ServiceLandingDirectory />

          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#c84a2c] px-6 text-sm font-medium text-white hover:bg-[#a93e29]"
            >
              Ask about a location
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
            >
              View published work
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
