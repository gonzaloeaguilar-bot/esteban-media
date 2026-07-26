import Link from "next/link";
import { ArrowRight, CheckCircle2, WandSparkles, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "AI Product Photography Miami",
  description:
    "AI-assisted product photography and visual creation for e-commerce brands, restaurants, and businesses in Miami and Fort Lauderdale.",
  path: "/services/ai-product-photography-miami",
  locale: "en",
});

export default function AIProductPhotographyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/ai-product-photography-miami#service"),
        name: "AI Product Photography Miami",
        description:
          "AI-assisted product photography, background generation, and visual mockups for South Florida e-commerce brands and local businesses.",
        provider: {
          "@type": "LocalBusiness",
          "@id": absoluteUrl("/#business"),
          name: site.name,
          url: absoluteUrl("/"),
          telephone: site.phone.e164,
        },
        areaServed: "Miami-Dade / Broward / Fort Lauderdale",
        serviceType: "AI product photography",
      },
      {
        "@type": "BreadcrumbList",
        "@id": absoluteUrl("/services/ai-product-photography-miami#breadcrumbs"),
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
            name: "AI Product Photography Miami",
            item: absoluteUrl("/services/ai-product-photography-miami"),
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
                AI Product Photography
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                AI Images / E-Commerce Branding
              </p>
              <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-none sm:text-6xl">
                AI Product Photography & Brand Visuals in Miami.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Combine real product reference photos with AI-assisted background and environment generation. Produce stunning lifestyle imagery for Shopify, Amazon, and social channels without renting expensive studio sets.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#c84a2c] px-6 text-sm font-medium text-white hover:bg-[#a93e29]"
                >
                  Start an AI Image Project
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/guides/how-to-use-ai-for-product-photography"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  Read AI Product Photo Guide
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <WandSparkles className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">Why AI product photos?</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                AI-assisted image production keeps real products accurate while unlocking unlimited lifestyle settings, seasonal scenes, and creative lighting.
              </p>
              <dl className="mt-6 grid gap-3">
                <div className="rounded-md border border-[#ddd4c8] p-3">
                  <dt className="text-xs uppercase text-[#5a6066]">Service</dt>
                  <dd className="mt-1 font-serif text-xl">AI Product Photography</dd>
                </div>
                <div className="rounded-md border border-[#ddd4c8] p-3">
                  <dt className="text-xs uppercase text-[#5a6066]">Area Served</dt>
                  <dd className="mt-1 font-serif text-xl">Miami-Dade / Fort Lauderdale / Remote</dd>
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
              <h2 className="font-serif text-3xl">Best suited for</h2>
              <ul className="mt-6 space-y-4 text-sm leading-6 text-[#252a2d]">
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#e85d3e]" />
                  <span>E-commerce brands needing lifestyle product photos for Shopify or Amazon.</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#e85d3e]" />
                  <span>Restaurants & food brands wanting seasonal menu & social visuals.</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#e85d3e]" />
                  <span>Small business owners looking to upgrade product marketing photos affordably.</span>
                </li>
              </ul>
            </section>

            <section className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <h2 className="font-serif text-3xl">Proof & workflow</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Our portfolio project <strong>My D&apos;ler</strong> demonstrates approved brand key visuals, social designs, 3D video, and product mockups. We work with real reference photos to preserve product color, logo placement, and key details.
              </p>
              <Link
                href="/portfolio/my-dler"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
              >
                Review My D&apos;ler Portfolio Proof
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
                  Ready to upgrade your product visuals?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Send your product details, reference photos, and target platforms to begin an AI image project.
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
