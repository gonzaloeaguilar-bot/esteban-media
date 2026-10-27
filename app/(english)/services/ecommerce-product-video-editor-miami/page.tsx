import Link from "next/link";
import { ArrowRight, WandSparkles, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import {
  ServiceCraft,
  ServiceFaqs,
  ServiceInquiryRail,
  ServiceRelated,
  buildServiceFaqSchema,
  buildServicePageNodes,
} from "@/components/service-depth";
import { ECOMMERCE_VIDEO_DEPTH } from "@/lib/service-depth-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "E-Commerce Product Video Editor Miami",
  description:
    "Product video editing for Shopify stores, Amazon listing videos, D2C brand video ads, and feature callout edits in Miami.",
  path: "/services/ecommerce-product-video-editor-miami",
  locale: "en",
});

export default function EcommerceProductVideoEditorMiamiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...buildServicePageNodes({
        path: "/services/ecommerce-product-video-editor-miami",
        name: "E-Commerce Product Video Editor Miami",
        description:
          "Product video editing for Shopify stores, Amazon listing videos, D2C brand video ads, and feature callout edits in Miami.",
        crumb: "E-Commerce Product Video Editor",
      }),
      buildServiceFaqSchema(absoluteUrl("/services/ecommerce-product-video-editor-miami"), ECOMMERCE_VIDEO_DEPTH.faqs),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/ecommerce-product-video-editor-miami#service"),
        name: "E-Commerce Product Video Editor Miami",
        description:
          "E-commerce product demo video editing, Shopify store video ads, Amazon product listing video edits, and D2C brand videos.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Miami-Dade / Broward",
        serviceType: "E-commerce video editing",
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
                E-Commerce Product Video Editor
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Miami / D2C & Online Stores
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                E-Commerce Product Video Editing in Miami.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                High-converting product demo videos, feature callouts, and animated text overlays for Shopify and Amazon brands.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Edit Product Video
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <WandSparkles className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">E-commerce video proof</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Published portfolio work shows two relevant parts of the craft: <Link href="/portfolio/my-dler" className="underline underline-offset-4 hover:text-[#9f3c27]">My D&apos;ler</Link> is an agency-made product-visual and motion package with app mockups and an animated product flow; <Link href="/portfolio/bar-door-monkey" className="underline underline-offset-4 hover:text-[#9f3c27]">Bar Door Monkey Miami</Link> is a published commercial video. They show visual and commercial production work, not a claim that either project was an Amazon or Shopify listing campaign.
              </p>
              <div className="mt-5 flex flex-wrap gap-3 border-t border-[#ddd4c8] pt-4">
                <Link href="/portfolio/my-dler" className="text-sm font-semibold text-[#9f3c27] underline underline-offset-4 hover:text-[var(--em-accent-ink)]">View My D&apos;ler product visuals</Link>
                <Link href="/portfolio/bar-door-monkey" className="text-sm font-semibold text-[#9f3c27] underline underline-offset-4 hover:text-[var(--em-accent-ink)]">View commercial video</Link>
              </div>
            </div>
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
                  Selling physical products online in South Florida?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Send raw product footage for conversion-focused editing.
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
      <ServiceCraft
        heading={ECOMMERCE_VIDEO_DEPTH.craftHeading}
        cards={ECOMMERCE_VIDEO_DEPTH.craft}
        sectionId="ecommerce-video-craft"
      />
      <ServiceFaqs heading={ECOMMERCE_VIDEO_DEPTH.faqHeading} faqs={ECOMMERCE_VIDEO_DEPTH.faqs} />
      <ServiceInquiryRail
        service={{
          serviceId: "ecommerce_product_video",
          serviceName: "ecommerce product video editing",
          goalPrompt: "turn product footage into demo videos or listing ads",
          assetPrompt: "raw product clips, product claims that are safe to publish, logo files, and the target store or ad placement",
          proofHref: "/portfolio/my-dler",
          proofLabel: "Review product-visual portfolio proof",
        }}
      />
      <ServiceRelated heading={ECOMMERCE_VIDEO_DEPTH.relatedHeading} services={ECOMMERCE_VIDEO_DEPTH.related} />
    </main>
  );
}
