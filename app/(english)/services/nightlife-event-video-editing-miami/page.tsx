import Link from "next/link";
import { ArrowRight, Video, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { ServiceDeepDive } from "@/components/service-depth";
import { NIGHTLIFE_DEEP_DIVE } from "@/lib/hospitality-deep-dive-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Nightlife Event Video Editing Miami",
  description:
    "Nightclub video editing, DJ promo reels, VIP party recap videos, and fast-paced event post-production in Miami.",
  path: "/services/nightlife-event-video-editing-miami",
  locale: "en",
});

export default function NightlifeEventVideoEditingMiamiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/nightlife-event-video-editing-miami#service"),
        name: "Nightlife Event Video Editing Miami",
        description:
          "Nightclub event recap editing, fast-paced rhythm syncing, DJ promo video editing, and VIP party reels in Miami.",
        provider: {
          "@type": "LocalBusiness",
          "@id": absoluteUrl("/#business"),
          name: site.name,
          url: absoluteUrl("/"),
          telephone: site.phone.e164,
        },
        areaServed: "Miami Beach / Wynwood",
        serviceType: "Nightlife video editing",
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
                Nightlife Event Video Editing
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Miami / Nightlife & Entertainment
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Nightlife & Event Video Editing in Miami.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Capture party energy with beat-synced cuts, light flare effects, and high-impact social reels for clubs and VIP events.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Edit Nightlife Video
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Video className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">What published venue video can you see?</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                <strong>Bar Door Monkey Miami</strong>: a social promo spot for a Miami restaurant, filmed on location and edited by Esteban for the venue&apos;s Instagram. It is a restaurant spot, not a club night. <Link href="/portfolio/bar-door-monkey" className="underline decoration-[#e85d3e] underline-offset-4">See the project</Link>.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <ServiceDeepDive
        id={NIGHTLIFE_DEEP_DIVE.id}
        title={NIGHTLIFE_DEEP_DIVE.title}
        destinations={NIGHTLIFE_DEEP_DIVE.destinations}
        sections={NIGHTLIFE_DEEP_DIVE.sections}
      />

      <section className="pb-12 sm:pb-16 pt-12">
        <Container size="xl">
          <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-medium uppercase text-[#5a6066]">
                  Get Started
                </p>
                <h2 className="mt-3 font-serif text-4xl">
                  Promoting a nightclub or VIP event in Miami?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Send the raw footage and where the video will run, and get a scoped quote.
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
    </main>
  );
}
