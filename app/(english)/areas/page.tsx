import Link from "next/link";
import { ArrowRight, Laptop, MapPin } from "lucide-react";

import { ServiceLandingDirectory } from "@/components/service-landing-directory";
import { Container } from "@/components/ui/container";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, serviceAreas } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Service Areas",
  description:
    "Fort Lauderdale-based video editing and content support for Broward and Miami-Dade, with Palm Beach County considered project by project as an expansion area.",
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

export default function AreasPage() {
  const areaJsonLd = {
    "@context": "https://schema.org",
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
            Fort Lauderdale-based, South Florida practical.
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
                  available to clients beyond South Florida.
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
              These are real Miami projects from Esteban&apos;s public portfolio.
              They document the work shown; they do not imply results or
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
