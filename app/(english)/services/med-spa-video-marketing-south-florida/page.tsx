import Link from "next/link";
import { ArrowRight, CheckCircle2, Video, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Med Spa Video Marketing South Florida",
  description:
    "Video marketing and video editing for med spas, aesthetic clinics, and cosmetic dermatology practices in Miami and Fort Lauderdale.",
  path: "/services/med-spa-video-marketing-south-florida",
  locale: "en",
});

export default function MedSpaVideoMarketingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/med-spa-video-marketing-south-florida#service"),
        name: "Med Spa Video Marketing South Florida",
        description:
          "Video editing, treatment explanation Reels, and social video marketing for med spas and aesthetic practices in South Florida.",
        provider: {
          "@type": "LocalBusiness",
          "@id": absoluteUrl("/#business"),
          name: site.name,
          url: absoluteUrl("/"),
          telephone: site.phone.e164,
        },
        areaServed: "Miami-Dade / Fort Lauderdale / Broward",
        serviceType: "Med spa video marketing",
      },
      {
        "@type": "BreadcrumbList",
        "@id": absoluteUrl("/services/med-spa-video-marketing-south-florida#breadcrumbs"),
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
            name: "Med Spa Video Marketing",
            item: absoluteUrl("/services/med-spa-video-marketing-south-florida"),
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
                Med Spa Video Marketing
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Med Spa / Aesthetic Clinics
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Med Spa Video Marketing & Social Content in South Florida.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Build client trust for aesthetic treatments, skincare procedures, and cosmetic services through high-impact 9:16 social video editing and structured video campaigns.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#c84a2c] px-6 text-sm font-medium text-white hover:bg-[#a93e29]"
                >
                  Start a Med Spa Video Project
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/portfolio/healthy-smile"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  View Healthcare Proof
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Video className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">Professional video editing</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Send smartphone clips of clinic treatments or facility tours. We edit raw footage into dynamic, captioned Instagram Reels and TikTok videos that respect patient privacy guidelines.
              </p>
              <dl className="mt-6 grid gap-3">
                <div className="rounded-md border border-[#ddd4c8] p-3">
                  <dt className="text-xs uppercase text-[#5a6066]">Industry</dt>
                  <dd className="mt-1 font-serif text-xl">Med Spa / Aesthetics</dd>
                </div>
                <div className="rounded-md border border-[#ddd4c8] p-3">
                  <dt className="text-xs uppercase text-[#5a6066]">Target Audience</dt>
                  <dd className="mt-1 font-serif text-xl">Miami-Dade & Broward Clients</dd>
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
              <h2 className="font-serif text-3xl">Key aesthetic video formats</h2>
              <ul className="mt-6 space-y-4 text-sm leading-6 text-[#252a2d]">
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#e85d3e]" />
                  <span>Before & after treatment highlights with elegant motion transitions.</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#e85d3e]" />
                  <span>30-second aesthetic procedure explanations (lasers, facials, skin tightening).</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#e85d3e]" />
                  <span>Provider spotlights and clinic environment walkthroughs.</span>
                </li>
              </ul>
            </section>

            <section className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <h2 className="font-serif text-3xl">Remote-first post-production</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                No need to halt clinic operations for lengthy film crews. Your staff records daily treatment footage, and Esteban delivers ready-to-post short-form edits.
              </p>
              <Link
                href="/services#editing"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
              >
                Learn About Video Editing Services
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
                  Elevate your med spa&apos;s video content.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Share your clinic location and content goals to begin video post-production.
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
