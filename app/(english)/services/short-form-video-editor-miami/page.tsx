import Link from "next/link";
import { ArrowRight, Scissors, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import {
  ServiceCraft,
  ServiceFaqs,
  ServiceRelated,
  buildServiceFaqSchema,
} from "@/components/service-depth";
import { SHORT_FORM_DEPTH } from "@/lib/service-depth-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Short Form Video Editor Miami",
  description:
    "Short-form video editing for Instagram Reels, TikTok, and YouTube Shorts for creators and businesses in South Florida.",
  path: "/services/short-form-video-editor-miami",
  locale: "en",
});

export default function ShortFormVideoEditorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(absoluteUrl("/services/short-form-video-editor-miami"), SHORT_FORM_DEPTH.faqs),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/short-form-video-editor-miami#service"),
        name: "Short Form Video Editor Miami",
        description:
          "Short-form 9:16 video editing with dynamic captions, pacing, and sound design in South Florida.",
        provider: {
          "@type": "LocalBusiness",
          "@id": absoluteUrl("/#business"),
          name: site.name,
          url: absoluteUrl("/"),
          telephone: site.phone.e164,
        },
        areaServed: "Miami-Dade / Fort Lauderdale / Remote",
        serviceType: "Short form video editing",
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
                Short-Form Editor
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Reels / Shorts / TikTok
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Short-Form Video Editing for Reels & TikTok.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                High-retention 9:16 vertical editing with bold captions, visual hooks, and sound design to keep audiences watching.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Start Short-Form Editing
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/portfolio/ml-colombia"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  View ML Colombia Reel Proof
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Scissors className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">Reel proof</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Our portfolio project <strong>ML Colombia</strong> proves published short-form social video editing. For food & beverage concepts, see our dedicated{" "}
                <Link
                  href="/services/restaurant-promo-video-editing-miami"
                  className="font-semibold text-[#9f3c27] underline decoration-[#e85d3e] underline-offset-4 hover:text-[var(--em-accent-ink)]"
                >
                  restaurant promo video editing in Miami
                </Link>.
              </p>
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
                  Scale your short-form content output.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Send raw video files to start short-form editing packages.
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
        heading={SHORT_FORM_DEPTH.craftHeading}
        cards={SHORT_FORM_DEPTH.craft}
        sectionId="short-form-craft"
      />
      <ServiceFaqs heading={SHORT_FORM_DEPTH.faqHeading} faqs={SHORT_FORM_DEPTH.faqs} />
      <ServiceRelated heading={SHORT_FORM_DEPTH.relatedHeading} services={SHORT_FORM_DEPTH.related} />
    </main>
  );
}
