import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Languages,
  MapPin,
  Scissors,
  Video,
  WandSparkles,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { languageAlternates } from "@/lib/spanish-site";
import { absoluteUrl, site } from "@/lib/site";

const cities = [
  "Boca Raton",
  "Delray Beach",
  "Boynton Beach",
  "West Palm Beach",
  "Palm Beach",
  "Palm Beach Gardens",
  "Jupiter",
  "Wellington",
  "Lake Worth Beach",
];

const palmBeachServices = [
  {
    name: "Remote video editing",
    description:
      "Short-form edits, captions, color, and platform-ready exports for footage you already have.",
    icon: Scissors,
  },
  {
    name: "AI and social planning",
    description:
      "AI-assisted creative and a practical content plan built around the formats your business needs.",
    icon: WandSparkles,
  },
  {
    name: "Mobile content capture",
    description:
      "Phone-based recording for social media, restaurants, real estate, products, and small local projects.",
    icon: Video,
  },
  {
    name: "Product photo and aerial options",
    description:
      "Product photography and aerial footage quoted only after capture requirements and authorized-pilot availability are confirmed.",
    icon: Camera,
  },
];

const questions = [
  {
    question: "Does Esteban Moreno Media work in Palm Beach County?",
    answer:
      "Palm Beach County is an expansion area. Esteban is based in Fort Lauderdale and considers selected projects by quote, with travel, timing, parking, access, equipment, and deliverables confirmed before booking.",
  },
  {
    question: "Which Palm Beach County cities are covered?",
    answer:
      "Boca Raton is a priority expansion market. Delray Beach, Boynton Beach, West Palm Beach, Palm Beach, Palm Beach Gardens, Jupiter, Wellington, Lake Worth Beach, and nearby areas are considered by quote.",
  },
  {
    question: "How are travel costs handled?",
    answer:
      "A travel fee may apply beyond 20 miles from Fort Lauderdale. Required parking is added to the quote, and longer trips are confirmed before booking.",
  },
  {
    question: "Is drone coverage guaranteed at every location?",
    answer:
      "No. Aerial work is quoted only after credentialed-pilot availability, airspace, weather, property permission, and site safety are confirmed.",
  },
  {
    question: "Can the project be handled in Spanish?",
    answer:
      "Yes. Spanish is Esteban's native language. He can also communicate in English at an intermediate level.",
  },
  {
    question: "How far ahead should on-location work be booked?",
    answer:
      "Three to four days ahead is preferred. Urgent requests may be considered depending on the current workload.",
  },
  {
    question: "How many review rounds are included?",
    answer:
      "Two review rounds are normally included: feedback on the first cut and one final adjustment round. Additional revisions are quoted separately.",
  },
];

export const metadata: Metadata = {
  title: "Video Editing & Content in Palm Beach County",
  description:
    "Video editing, AI-assisted content, social planning, mobile capture, and selected production projects for Palm Beach County businesses.",
  alternates: {
    canonical: "/areas/palm-beach-county",
    languages: languageAlternates["/areas/palm-beach-county"],
  },
  openGraph: {
    title: "Video Editing & Content in Palm Beach County",
    description:
      "Spanish-first content support for Palm Beach County businesses, with projects considered by quote from a Fort Lauderdale base.",
    url: absoluteUrl("/areas/palm-beach-county"),
    locale: "en_US",
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Video Editing & Content in Palm Beach County",
    description:
      "Spanish-first content support for Palm Beach County businesses, with projects considered by quote.",
  },
};

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
          "Mobile video capture",
          "Product photography",
        ],
        description:
          "Remote editing and selected on-location content services for Palm Beach County businesses.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Palm Beach County, Florida",
          containsPlace: cities.map((name) => ({
            "@type": "City",
            name,
          })),
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
            <Link href="/areas" className="hover:text-[#c84a2c]">
              Service areas
            </Link>{" "}
            / Palm Beach County
          </nav>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-start lg:gap-16">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Palm Beach County service area
              </p>
              <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-none sm:text-6xl">
                Content support for Palm Beach County, available by quote.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                <strong>Quick answer:</strong> Palm Beach County is an expansion
                area for Esteban Moreno Media. Boca Raton is a priority, and
                other cities are considered when the project, travel, equipment,
                and schedule are a fit.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#e85d3e] px-6 text-sm font-medium text-white hover:bg-[#c84a2c]"
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

            <aside className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <MapPin className="size-6 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">Cities considered by quote</h2>
              <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                The project address, access window, parking, tolls, equipment,
                and travel time are confirmed during quoting.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Palm Beach County cities served">
                {cities.map((city) => (
                  <li
                    key={city}
                    className="rounded-full border border-[#ddd4c8] px-3 py-1 text-xs text-[#5a6066]"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16" aria-labelledby="palm-beach-services">
        <Container size="xl">
          <p className="text-xs font-medium uppercase text-[#5a6066]">
            What you can book
          </p>
          <h2 id="palm-beach-services" className="mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">
            One visual system, scoped to the actual deliverables.
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
                Before you book
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight">
                Direct answers for Palm Beach County projects.
              </h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Send the city, date, project goal, references, and intended use.
                That is enough to start a useful scope.
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
            <h2 className="font-serif text-4xl">Have a Palm Beach County location in mind?</h2>
            <p className="mt-4 max-w-2xl leading-7 text-[#d8d0c7]">
              Share the address or venue, date, deliverables, and deadline.
              Esteban will confirm availability and any travel or site
              considerations before you commit.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#e85d3e] px-6 text-sm font-medium text-white hover:bg-[#c84a2c]"
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
