import Link from "next/link";
import { ArrowRight, CheckCircle2, Scissors, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Content Repurposing Service Miami",
  description:
    "Transform long-form videos, webinars, and podcasts into engaging short clips, Reels, and Shorts for social media.",
  path: "/services/content-repurposing-service-miami",
  locale: "en",
});

export default function ContentRepurposingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/content-repurposing-service-miami#service"),
        name: "Content Repurposing Service Miami",
        description:
          "Video repurposing service turning long videos, webinars, and podcasts into short vertical social clips in Miami and Fort Lauderdale.",
        provider: {
          "@type": "LocalBusiness",
          "@id": absoluteUrl("/#business"),
          name: site.name,
          url: absoluteUrl("/"),
          telephone: site.phone.e164,
        },
        areaServed: "Miami-Dade / Fort Lauderdale / Remote",
        serviceType: "Content repurposing service",
      },
      {
        "@type": "BreadcrumbList",
        "@id": absoluteUrl("/services/content-repurposing-service-miami#breadcrumbs"),
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
            name: "Content Repurposing Service",
            item: absoluteUrl("/services/content-repurposing-service-miami"),
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
                Content Repurposing
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Video Editing / Repurposing
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Turn Long Videos into Dozens of Social Clips.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Extract high-value hooks, key insights, and engaging moments from existing webinars, YouTube videos, and podcasts. Multiply your posting output without recording new video.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#c84a2c] px-6 text-sm font-medium text-white hover:bg-[#a93e29]"
                >
                  Repurpose Your Content
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/portfolio/homeowners"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  View Editing Proof
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Scissors className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">Maximize existing video assets</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Instead of starting from scratch, repurposing extracts 5–20 short vertical videos (9:16) from a single hour of raw footage.
              </p>
              <dl className="mt-6 grid gap-3">
                <div className="rounded-md border border-[#ddd4c8] p-3">
                  <dt className="text-xs uppercase text-[#5a6066]">Input Sources</dt>
                  <dd className="mt-1 font-serif text-xl">Podcasts, Webinars, YouTube, Speeches</dd>
                </div>
                <div className="rounded-md border border-[#ddd4c8] p-3">
                  <dt className="text-xs uppercase text-[#5a6066]">Deliverables</dt>
                  <dd className="mt-1 font-serif text-xl">Reels, Shorts, TikTok Clips</dd>
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container size="xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <section className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <h2 className="font-serif text-3xl">What we do</h2>
              <ul className="mt-6 space-y-4 text-sm leading-6 text-[#252a2d]">
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#e85d3e]" />
                  <span>Curate the most compelling moments & quotes from raw footage.</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#e85d3e]" />
                  <span>Reframe horizontal video into clean 9:16 vertical layouts.</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#e85d3e]" />
                  <span>Add bold, readable captions, brand colors, and sound polish.</span>
                </li>
              </ul>
            </section>

            <section className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <h2 className="font-serif text-3xl">Remote workflow</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Upload your raw video via Google Drive, Dropbox, or Frame.io. Esteban handles timestamp selection, trimming, and final export delivery.
              </p>
              <Link
                href="/guides/prepare-footage-for-video-editing"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
              >
                Read Footage Handoff Guide
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </section>
          </div>
        </Container>
      </section>

      <section className="pb-12 sm:pb-16">
        <Container size="xl">
          <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-medium uppercase text-[#5a6066]">
                  Get Started
                </p>
                <h2 className="mt-3 font-serif text-4xl">
                  Ready to repurpose your video content?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Send a link to your long-form video to start extracting short clips.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#c84a2c] px-5 text-sm font-medium text-white hover:bg-[#a93e29]"
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
