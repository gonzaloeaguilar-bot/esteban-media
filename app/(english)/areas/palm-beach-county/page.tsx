import Link from "next/link";
import {
  ArrowRight,
  CalendarRange,
  Languages,
  MapPin,
  Scissors,
  Video,
  WandSparkles,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl } from "@/lib/site";

const palmBeachServices = [
  {
    name: "Remote video editing",
    description:
      "A confirmed priority for projects that begin with existing footage and a publishing goal.",
    icon: Scissors,
  },
  {
    name: "AI-assisted content",
    description:
      "AI-assisted creative is a confirmed priority, scoped around the project goal and intended use.",
    icon: WandSparkles,
  },
  {
    name: "Social media planning",
    description:
      "A confirmed priority for discussing audience, channels, publishing goals, and content needs.",
    icon: CalendarRange,
  },
  {
    name: "On-location content capture",
    description:
      "Local video production is considered selectively after the location, goal, and capture needs are known.",
    icon: Video,
  },
];

const questions = [
  {
    question: "Does Esteban Moreno Media work in Palm Beach County?",
    answer:
      "Palm Beach County is an expansion area. Esteban is based in Fort Lauderdale and considers selected projects after learning the county, project goal, and general needs.",
  },
  {
    question: "Is sub-city coverage published for Palm Beach County?",
    answer:
      "No. Palm Beach County is published only as a county-level expansion area until Esteban confirms individual city availability.",
  },
  {
    question: "Can Palm Beach County clients work with Esteban remotely?",
    answer:
      "Yes. Video editing, AI-assisted content, and social planning can begin with existing files and references without an on-location visit.",
  },
  {
    question: "Is on-location production available for every inquiry?",
    answer:
      "No universal availability is published. Local video production is considered selectively after the location and capture needs are understood.",
  },
  {
    question: "Can the project be handled in Spanish?",
    answer:
      "Yes. Spanish is Esteban's primary language. He can also communicate in English at an intermediate level.",
  },
  {
    question: "What information helps Esteban review a local project?",
    answer:
      "Share the city, project goal, intended use, available files, and visual references. That is enough to start the conversation.",
  },
  {
    question: "Where can I review Esteban's work?",
    answer:
      "The public portfolio includes eight selected videos from Esteban's YouTube channel with the project facts and credits currently available.",
  },
];

export const metadata = buildPageMetadata({
  title: "Video Editing in Palm Beach County",
  description:
    "Video editing, AI-assisted content, social planning, and selected local capture projects for Palm Beach County businesses.",
  path: "/areas/palm-beach-county",
  locale: "en",
});

export default function PalmBeachCountyPage() {
  const pageUrl = absoluteUrl("/areas/palm-beach-county");
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Video editing and content support in Palm Beach County",
        description: metadata.description,
        inLanguage: "en-US",
        isPartOf: { "@id": absoluteUrl("/#website") },
        mainEntity: { "@id": `${pageUrl}#service` },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Video editing and content services in Palm Beach County",
        serviceType: [
          "Video editing",
          "AI-assisted content",
          "Social media planning",
          "Selectively scoped on-location video production",
        ],
        description:
          "Remote creative services and selectively scoped local video production for the Palm Beach County expansion area.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Palm Beach County, Florida",
        },
        availableLanguage: ["English", "Spanish"],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumbs`,
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
            name: "Service Areas",
            item: absoluteUrl("/areas"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Palm Beach County",
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20">
        <Container size="xl">
          <nav aria-label="Breadcrumb" className="text-sm text-[#5a6066]">
            <Link href="/" className="hover:text-[#9f3c27]">
              Home
            </Link>{" "}
            /{" "}
            <Link href="/areas" className="hover:text-[#9f3c27]">
              Service areas
            </Link>{" "}
            / Palm Beach County
          </nav>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-start lg:gap-16">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Palm Beach County service area
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Palm Beach County content support, considered project by project.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                <strong>Quick answer:</strong> Palm Beach County is an expansion
                area for Esteban Moreno Media. Availability is considered by
                project, and no individual city coverage is published yet.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Ask about a Palm Beach project
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/es/areas/palm-beach-county"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  <Languages className="size-4" aria-hidden="true" />
                  Ver en español
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <MapPin className="size-6 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">County-level expansion area</h2>
              <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                Palm Beach County remains an expansion market considered project
                by project. Individual cities are not listed until Esteban confirms
                where local production is currently practical.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16" aria-labelledby="palm-beach-services">
        <Container size="xl">
          <p className="text-xs font-medium uppercase text-[#5a6066]">
            Confirmed priorities
          </p>
          <h2 id="palm-beach-services" className="mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">
            Services that can be discussed without assuming a fixed package.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {palmBeachServices.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.name}
                  className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5"
                >
                  <Icon className="size-6 text-[#e85d3e]" aria-hidden="true" />
                  <h3 className="mt-5 font-serif text-2xl">{service.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                    {service.description}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-y border-[#ddd4c8] bg-[#ece5da] py-12 sm:py-16">
        <Container size="xl">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1fr]">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Before you inquire
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight">
                Direct answers for Palm Beach County projects.
              </h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Useful scoping questions cover the county, project goal, available
                material, references, and intended use. They do not imply local
                availability or fixed deliverables.
              </p>
            </div>
            <dl className="grid gap-3">
              {questions.map((item) => (
                <div
                  key={item.question}
                  className="rounded-lg border border-[#d0c7bb] bg-[#f6f1ea] p-5"
                >
                  <dt className="font-serif text-2xl">{item.question}</dt>
                  <dd className="mt-3 text-sm leading-6 text-[#252a2d]">
                    {item.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container size="xl">
          <div className="rounded-lg bg-[#101214] p-6 text-[#f6f1ea] sm:p-8">
            <h2 className="font-serif text-4xl">Have a Palm Beach County project in mind?</h2>
            <p className="mt-4 max-w-2xl leading-7 text-[#d8d0c7]">
              Share the county, project goal, intended use, and visual references
              to discuss whether the current expansion-area availability may fit.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
            >
              Start the brief
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
