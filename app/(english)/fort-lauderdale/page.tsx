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

const fortLauderdaleServices = [
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
    question: "Does Esteban Moreno Media work in Fort Lauderdale?",
    answer:
      "Yes. Fort Lauderdale and Broward County are the home operating base of Esteban Moreno Media. Remote video editing, social media reels, and AI-assisted content are core priorities, while on-location filming is scoped project by project.",
  },
  {
    question: "How much does video editing cost for Fort Lauderdale businesses?",
    answer:
      "Remote video editing packages start from $100 per video (Starter package), ongoing monthly social video plans start from $640/month (Growth package), and on-location production days start from $800 (Local Presence package).",
  },
  {
    question: "Can Fort Lauderdale clients work with Esteban remotely?",
    answer:
      "Yes. Remote video editing, AI-assisted content creation, and social media planning can begin directly with existing footage and creative references via Google Drive, Dropbox, or MASV without requiring an on-site visit.",
  },
  {
    question: "Is on-location production available in Fort Lauderdale?",
    answer:
      "Yes. On-location video capture is available in Fort Lauderdale and throughout Broward County, evaluated and scheduled project by project after reviewing the filming location, goals, and production needs.",
  },
  {
    question: "Can projects be handled in both Spanish and English?",
    answer:
      "Yes. Esteban Moreno Media provides bilingual English and Spanish content support, ensuring accurate cultural messaging, styled captions, and clear communications.",
  },
  {
    question: "What information helps Esteban review a local Fort Lauderdale project?",
    answer:
      "Share your business goals, target platforms (such as Instagram Reels or YouTube), available source footage, visual references, and target timeline to receive a clear project quote.",
  },
  {
    question: "Where can I review Esteban's work in Fort Lauderdale and South Florida?",
    answer:
      "Explore the public portfolio featuring verified work such as the FLAS AI Concierge in Fort Lauderdale, Bar Door Monkey, Healthy Smile, and Homeowners client edits.",
  },
];

export const metadata = buildPageMetadata({
  title: "Video Editing & Content Support in Fort Lauderdale",
  description:
    "Remote video editing, social media reels, AI-assisted content, and selective on-location capture for Fort Lauderdale and Broward County businesses.",
  path: "/areas/fort-lauderdale",
  locale: "en",
});

export default function FortLauderdalePage() {
  const pageUrl = absoluteUrl("/areas/fort-lauderdale");
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Video editing and content support in Fort Lauderdale",
        description:
          "Remote creative services, social media reels, and selective on-location video production for Fort Lauderdale and Broward County.",
        inLanguage: "en-US",
        isPartOf: { "@id": absoluteUrl("/#website") },
        mainEntity: { "@id": `${pageUrl}#service` },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Video editing and content services in Fort Lauderdale",
        serviceType: [
          "Remote video editing",
          "Social media video & reels",
          "AI-assisted content",
          "Social media planning",
          "Selectively scoped on-location video production",
        ],
        description:
          "We offer remote video editing, social media reels, AI-enhanced content creation, strategic social media planning, and targeted on-location capture for Fort Lauderdale businesses.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Fort Lauderdale, Florida",
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
            name: "Fort Lauderdale",
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
            / Fort Lauderdale
          </nav>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-start lg:gap-16">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Fort Lauderdale service area
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Fort Lauderdale video editing and content support for local businesses.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                <strong>Quick answer:</strong> Fort Lauderdale is Esteban Moreno Media&apos;s home base. We provide remote video editing for social media reels, monthly content retainers, and selectively scoped on-location production across Broward County.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Get a quote for Fort Lauderdale
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/es/areas/fort-lauderdale"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  <Languages className="size-4" aria-hidden="true" />
                  Ver en español
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <MapPin className="size-6 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">Local base in Broward County</h2>
              <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                Fort Lauderdale is our home base. Local businesses can start with remote video editing of existing smartphone and camera footage from $100, or schedule on-location capture for original content creation.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16" aria-labelledby="fort-lauderdale-services">
        <Container size="xl">
          <p className="text-xs font-medium uppercase text-[#5a6066]">
            Confirmed priorities
          </p>
          <h2 id="fort-lauderdale-services" className="mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">
            Services that can be discussed without assuming a fixed package.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {fortLauderdaleServices.map((service) => {
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
                Direct answers for Fort Lauderdale projects.
              </h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Use these questions to clarify scope before contacting us. Our team reviews location, goal, and resources to determine what can be delivered locally versus remotely.
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
            <h2 className="font-serif text-4xl">Have a Fort Lauderdale project in mind?</h2>
            <p className="mt-4 max-w-2xl leading-7 text-[#d8d0c7]">
              Share the location, project goal, intended use, and visual references to see if our expansion-area availability fits your needs.
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
