import Link from "next/link";
import { ArrowRight, Camera, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { PORTED_SERVICE_FAQS, serviceSiblings } from "@/lib/service-depth-content";
import {
  ServiceAnswerFirst,
  ServiceFaqs,
  ServiceRelated,
  buildServiceFaqSchema,
  buildServicePageNodes,
} from "@/components/service-depth";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

export const metadata = buildPageMetadata({
  title: "Jewelry Product Photography Miami",
  description:
    "Real jewelry product photography, separately scoped AI-assisted backgrounds, and retouching for Miami brands.",
  path: "/services/jewelry-product-photography-miami",
  locale: "en",
});

export default function JewelryProductPhotographyMiamiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(absoluteUrl("/services/jewelry-product-photography-miami"), PORTED_SERVICE_FAQS["/services/jewelry-product-photography-miami"]),
      ...buildServicePageNodes({
        path: "/services/jewelry-product-photography-miami",
        name: "Jewelry Product Photography Miami",
        description:
          "Real jewelry product photography, separately scoped AI-assisted backgrounds, and retouching for Miami brands.",
        crumb: "Jewelry Photography",
      }),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/jewelry-product-photography-miami#service"),
        name: "Jewelry Product Photography Miami",
        description:
          "Real jewelry product photography, separately scoped AI-assisted backgrounds, and commercial retouching for luxury brands.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Miami / Doral",
        serviceType: "Product photography",
      },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(withNicheService("/services/jewelry-product-photography-miami", jsonLd)) }}
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
                Jewelry Photography
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Miami / Luxury & E-Commerce
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Jewelry Product Photography in Miami.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Ask about a real jewelry product shoot, subject to scope and availability, or send accurate product photos for separately scoped retouching and AI-assisted backgrounds.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Create Jewelry Visuals
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Camera className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">Related product visual work</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                <strong>My D&apos;ler</strong> shows published product retouching and brand visuals. It is not presented as a jewelry photo shoot.
              </p>
            </div>
          </div>
        </Container>
      </section>
      <ServiceAnswerFirst service="jewelry product photography" />

      <section className="pb-12 sm:pb-16">
        <Container size="xl">
          <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-medium uppercase text-[#5a6066]">
                  Get Started
                </p>
                <h2 className="mt-3 font-serif text-4xl">
                  Launching a new jewelry collection?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  For a real shoot, share the jewelry pieces, location, image count and intended use. For AI-assisted backgrounds, send accurate existing photos. Esteban will quote each option separately.
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
        heading="Common questions before you start."
        faqs={PORTED_SERVICE_FAQS["/services/jewelry-product-photography-miami"]}
        sectionId="ported-faq"
      />
      <ServiceRelated
        heading="Related services nearby."
        services={serviceSiblings("/services/jewelry-product-photography-miami")}
        sectionId="sibling-services"
      />
      <NicheAnswers path="/services/jewelry-product-photography-miami" fact={String(metadata.description ?? "")} />
    </main>
  );
}
