import Link from "next/link";
import { ArrowRight, CheckCircle2, Video, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Small Business Video Production Miami",
  description:
    "Video editing, brand storytelling, and video production for small businesses and local entrepreneurs in Miami and Fort Lauderdale.",
  path: "/services/small-business-video-production-miami",
  locale: "en",
});

export default function SmallBusinessVideoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/small-business-video-production-miami#service"),
        name: "Small Business Video Production Miami",
        description:
          "Video editing, brand story videos, and promotional content for small businesses and local shops in Miami and Broward County.",
        provider: {
          "@type": "LocalBusiness",
          "@id": absoluteUrl("/#business"),
          name: site.name,
          url: absoluteUrl("/"),
          telephone: site.phone.e164,
        },
        areaServed: "Miami-Dade / Fort Lauderdale / Broward",
        serviceType: "Small business video production",
      },
      {
        "@type": "BreadcrumbList",
        "@id": absoluteUrl("/services/small-business-video-production-miami#breadcrumbs"),
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
            name: "Small Business Video Production",
            item: absoluteUrl("/services/small-business-video-production-miami"),
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
                Small Business Video
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Small Business / Local Brands
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Small Business Video Production & Social Content in Miami.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Professional video editing and scoped production for local shops, service providers, and growing businesses in South Florida.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#c84a2c] px-6 text-sm font-medium text-white hover:bg-[#a93e29]"
                >
                  Start a Small Business Video
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/portfolio/bar-door-monkey"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  View Local Business Proof
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Video className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">Local business proof</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Our portfolio project <strong>Bar Door Monkey Miami</strong> demonstrates location videography, social planning, and video post-production for a South Florida local establishment.
              </p>
              <dl className="mt-6 grid gap-3">
                <div className="rounded-md border border-[#ddd4c8] p-3">
                  <dt className="text-xs uppercase text-[#5a6066]">Service Model</dt>
                  <dd className="mt-1 font-serif text-xl">Editing or Scoped Capture</dd>
                </div>
                <div className="rounded-md border border-[#ddd4c8] p-3">
                  <dt className="text-xs uppercase text-[#5a6066]">Coverage Area</dt>
                  <dd className="mt-1 font-serif text-xl">Fort Lauderdale / Miami-Dade</dd>
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
              <h2 className="font-serif text-3xl">Popular small business videos</h2>
              <ul className="mt-6 space-y-4 text-sm leading-6 text-[#252a2d]">
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#e85d3e]" />
                  <span>30-second brand introduction & founder story videos.</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#e85d3e]" />
                  <span>Product or service showcase Reels for Instagram and Facebook ads.</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#e85d3e]" />
                  <span>Customer testimonial highlight clips.</span>
                </li>
              </ul>
            </section>

            <section className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <h2 className="font-serif text-3xl">Transparent per-project pricing</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Every project is scoped to your exact deliverables and budget with no hidden surprises. Review our published <Link href="/portfolio/healthy-smile" className="font-medium text-[#9f3c27] hover:underline">Healthy Smile Miami project</Link> for an example of on-location capture, dialogue audio mastering, and local business video editing.
              </p>
              <Link
                href="/services"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
              >
                Compare Creative Services
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
                  Grow your business with video.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Tell us about your business and video goals to start scoping.
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
