import Link from "next/link";
import { ArrowRight, CalendarCheck, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import {
  ServiceFaqs,
  buildServiceFaqSchema,
  buildServicePageNodes,
} from "@/components/service-depth";
import { buildPageMetadata } from "@/lib/site-metadata";
import { WEDDING_PACKAGES } from "@/lib/pricing";
import { absoluteUrl, site } from "@/lib/site";

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
const FLOOR = usd(Math.min(WEDDING_PACKAGES.halfDayFrom, WEDDING_PACKAGES.contentCreationFrom, WEDDING_PACKAGES.fullDayFrom));
const DEPOSIT = `${WEDDING_PACKAGES.depositPercent}%`;
const REST = `${100 - WEDDING_PACKAGES.depositPercent}%`;

const PATH = "/services/wedding-packages";

// Starting prices are owner-set (2026-11-24: packages start at $2,500+, 50%
// deposit). The per-package figures are working starting points until the
// owner confirms each one; a final quote is always written per wedding.
const PACKAGES = [
  {
    name: "Half Day",
    from: usd(WEDDING_PACKAGES.halfDayFrom),
    coverage: "Up to 5 hours of filming",
    best: "Ceremony plus the first hour of the reception, or a smaller wedding.",
    gets: [
      "Ceremony and key moments filmed",
      "A 3 to 5 minute highlight film",
      "A 60 to 90 second trailer for Instagram",
      "Delivered as a download link",
    ],
  },
  {
    name: "Full Day",
    from: usd(WEDDING_PACKAGES.fullDayFrom),
    coverage: "Up to 10 hours of filming",
    best: "Getting ready through the last dance.",
    gets: [
      "Getting ready, ceremony, toasts and reception",
      "A 5 to 8 minute wedding film",
      "A 60 to 90 second trailer",
      "Vertical clips cut for Instagram and TikTok",
    ],
  },
  {
    name: "Wedding Content Creation",
    from: usd(WEDDING_PACKAGES.contentCreationFrom),
    coverage: "Up to 5 hours, built for social",
    best: "Couples and guests who want to post the day, not watch a long film.",
    gets: [
      "Short vertical videos filmed through the day",
      "10 to 15 edited reels and clips",
      "Captions and a posting order",
      "Delivered within a week of the wedding",
    ],
  },
] as const;

const CITIES = [
  {
    name: "Miami",
    href: "/services/wedding-videographer-miami",
    es: "/es/videografo-de-bodas-miami",
    line: "Miami, Coral Gables, Coconut Grove and Brickell.",
  },
  {
    name: "Fort Lauderdale",
    href: "/services/wedding-videographer-fort-lauderdale",
    es: "/es/videografo-de-bodas-fort-lauderdale",
    line: "Fort Lauderdale, Las Olas, Pompano and Broward County.",
  },
  {
    name: "Palm Beach",
    href: "/services/destination-wedding-videographer-palm-beach",
    es: "/es/videografo-para-bodas-de-destino-palm-beach",
    line: "Palm Beach, West Palm Beach and destination weddings.",
  },
] as const;

const FAQS = [
  {
    question: "How much do wedding packages cost?",
    answer:
      `Wedding packages start at ${FLOOR}. Half Day and Wedding Content Creation start at ${usd(WEDDING_PACKAGES.halfDayFrom)}, and Full Day starts at ${usd(WEDDING_PACKAGES.fullDayFrom)} because it covers more hours. Your final quote depends on your date, venue, hours and what you want delivered.`,
  },
  {
    question: "How much is the deposit?",
    answer:
      `The deposit is ${DEPOSIT} of your quote. It holds your date. The other ${REST} is due before we deliver your film.`,
  },
  {
    question: "Do you travel for weddings in Miami, Fort Lauderdale and Palm Beach?",
    answer:
      "Yes. Esteban films across Miami-Dade, Broward and Palm Beach counties. Tell us the venue and we include any travel in your quote.",
  },
  {
    question: "What is the difference between a wedding film and wedding content?",
    answer:
      "A wedding film is a polished story of the day to watch and keep. Wedding content is a set of short vertical videos made to post on Instagram and TikTok, delivered fast.",
  },
  {
    question: "Can I combine a film and social content?",
    answer:
      "Yes. The Full Day package already includes vertical clips. Ask for the Content Creation package on top of a Half Day or Full Day and we price the two together.",
  },
] as const;

export const metadata = buildPageMetadata({
  title: "Wedding Packages: Miami, Fort Lauderdale and Palm Beach",
  description:
    `Wedding video packages from ${FLOOR}: Half Day, Full Day and wedding content creation across Miami, Fort Lauderdale and Palm Beach. ${DEPOSIT} deposit holds your date.`,
  path: PATH,
  locale: "en",
});

export default function WeddingPackagesPage() {
  const url = absoluteUrl(PATH);
  const faqs = FAQS.map((f) => ({ question: f.question, answer: f.answer }));
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(url, faqs),
      ...buildServicePageNodes({
        path: PATH,
        name: "Wedding Packages",
        description:
          `Wedding video packages in Miami, Fort Lauderdale and Palm Beach, starting at ${FLOOR}.`,
        crumb: "Wedding Packages",
      }),
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: "Wedding Video Packages",
        description:
          "Half Day, Full Day and wedding content creation packages filmed and edited by Esteban Moreno.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: ["Miami", "Fort Lauderdale", "Palm Beach"],
        serviceType: "Wedding videography",
        offers: PACKAGES.map((p) => ({
          "@type": "Offer",
          name: p.name,
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "USD",
            minPrice: Number(p.from.replace(/[^0-9]/g, "")),
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20">
        <Container size="xl">
          <nav aria-label="Breadcrumbs" className="mb-8 text-sm text-[#5a6066]">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-[#9f3c27]">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/services" className="hover:text-[#9f3c27]">Services</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">Wedding Packages</li>
            </ol>
          </nav>
          <p className="text-xs font-medium uppercase text-[#5a6066]">
            Miami / Fort Lauderdale / Palm Beach
          </p>
          <h1 className="mt-4 max-w-4xl font-serif em-display">
            Wedding video packages from {FLOOR}.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
            Pick a Half Day, a Full Day or wedding content for social. Pay {DEPOSIT} to hold your
            date and the other {REST} before delivery. Filmed and edited by Esteban Moreno.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
            >
              Check My Date
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/portfolio/diana-jack"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
            >
              Watch a Wedding Film
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16" id="packages">
        <Container size="xl">
          <h2 className="font-serif text-4xl">Which package fits your wedding?</h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {PACKAGES.map((p) => (
              <article
                key={p.name}
                className="flex flex-col rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6"
              >
                <h3 className="font-serif text-3xl">{p.name}</h3>
                <p className="mt-2 text-2xl font-medium text-[#9f3c27]">From {p.from}</p>
                <p className="mt-1 text-sm text-[#5a6066]">{p.coverage}</p>
                <p className="mt-4 text-sm leading-6 text-[#252a2d]">{p.best}</p>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-[#252a2d]">
                  {p.gets.map((g) => (
                    <li key={g} className="flex gap-2">
                      <span aria-hidden="true" className="text-[#e85d3e]">&bull;</span>
                      {g}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-full bg-[var(--em-accent-ink)] px-5 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Ask About {p.name}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-[#ddd4c8] bg-[#fbf6ef] py-12 sm:py-16" id="deposit">
        <Container size="xl">
          <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-start">
            <CalendarCheck className="size-10 text-[#e85d3e]" aria-hidden="true" />
            <div>
              <h2 className="font-serif text-4xl">How does the {DEPOSIT} deposit work?</h2>
              <ol className="mt-5 max-w-2xl list-decimal space-y-3 pl-5 text-base leading-7 text-[#252a2d]">
                <li>Send your date, venue and hours. You get a written quote.</li>
                <li>Pay {DEPOSIT} of the quote. Your date is held for you.</li>
                <li>Pay the other {REST} before your film is delivered.</li>
              </ol>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-[#5a6066]">
                Packages start at {FLOOR}. Your final price depends on hours, venue and what you
                want delivered.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16" id="cities">
        <Container size="xl">
          <h2 className="font-serif text-4xl">Where do you film weddings?</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {CITIES.map((c) => (
              <div key={c.name} className="rounded-lg border border-[#ddd4c8] p-6">
                <h3 className="font-serif text-2xl">{c.name}</h3>
                <p className="mt-3 text-sm leading-6 text-[#252a2d]">{c.line}</p>
                <Link
                  href={c.href}
                  className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
                >
                  Wedding videographer in {c.name}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
                <p className="mt-2 text-sm">
                  <Link href={c.es} className="text-[#5a6066] underline underline-offset-4">
                    En espa&ntilde;ol
                  </Link>
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-12 sm:pb-16">
        <Container size="xl">
          <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="font-serif text-4xl">Is your date still open?</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Send your date, venue and the hours you want covered. Esteban replies with a
                  written quote.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-5 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  Email
                </a>
                <a
                  href={site.phone.href}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  Call
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ServiceFaqs
        heading="Wedding package questions."
        faqs={faqs}
        sectionId="wedding-packages-faq"
        eyebrow="Before you book"
      />
    </main>
  );
}
