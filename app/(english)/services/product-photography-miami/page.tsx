import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

const path = "/services/product-photography-miami";

export const metadata = buildPageMetadata({
  title: "Product Photographer in Miami | Real Product Photos",
  description:
    "Product photography for Miami and Broward businesses. Ask Esteban Moreno Media about a real product shoot for ecommerce, a website, or social content.",
  path,
  locale: "en",
});

export default function ProductPhotographyMiamiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": absoluteUrl(`${path}#service`),
        name: "Product photography in Miami",
        description:
          "Real product photography for Miami and Broward businesses, scoped around the product, location, and intended use.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: ["Miami-Dade County", "Broward County"],
        serviceType: "Product photography",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
          { "@type": "ListItem", position: 3, name: "Product photography", item: absoluteUrl(path) },
        ],
      },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(withNicheService("/services/product-photography-miami", jsonLd)) }}
      />
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20">
        <Container size="xl">
          <nav aria-label="Breadcrumbs" className="mb-8 text-sm text-[#5a6066]">
            <Link href="/" className="underline underline-offset-4">Home</Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <Link href="/services" className="underline underline-offset-4">Services</Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <span aria-current="page">Product photography</span>
          </nav>
          <div className="mt-8 max-w-4xl">
            <p className="text-xs font-medium uppercase text-[#5a6066]">Real product photos / Miami and Broward</p>
            <h1 className="mt-4 font-serif em-display">Product photography in Miami for the products you actually sell.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
              Esteban photographs real products for business websites, ecommerce, and social content. Tell him what you sell and where the images will appear to plan the right shoot.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]">
                Ask about a product shoot <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link href="/services/ai-product-photography-miami" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]">
                Have photos already? Explore AI visuals
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container size="xl" className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
            <h2 className="font-serif text-3xl">What should you send before a product shoot?</h2>
            <p className="mt-5 text-base leading-7 text-[#252a2d]">
              Send the product type, number of items, where the products are, and examples of images you need. Tell Esteban whether the photos are for product listings, a website, ads, or social posts. That information helps him discuss the setting, shot list, location, and deliverables with you before quoting. If you also need short product videos, mention those at the same time so the stills and video can be scoped together. A real shoot starts with the actual product; AI-assisted backgrounds start with existing reference images. Neither path should change the product’s label, color, or features in a way that misleads customers. Use the contact page to describe the project, or email him directly if you already have a brief.
            </p>
          </section>
          <section className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
            <h2 className="font-serif text-3xl">Do you need new photographs or visuals from existing photos?</h2>
            <p className="mt-5 text-base leading-7 text-[#252a2d]">
              Choose a real product shoot when you need new images of the item itself: its packaging, texture, scale, or details that a buyer should see clearly. If you already have accurate product photographs and want alternate settings or campaign concepts, Esteban can discuss AI-assisted visuals using those references. The two services solve different problems, and you can ask about both in one inquiry. Project location, product handling, image use, and the number of final images determine the scope; there is no fixed shoot price on this page. Esteban’s published visual work includes product mockups, but those are not presented here as proof of a photographed product session. Ask for a relevant real-photo example when you speak with him.
            </p>
            <Link href="/services/ai-product-photography-miami" className="mt-6 inline-flex min-h-11 items-center gap-2 font-medium text-[#9f3c27] underline underline-offset-4">
              See the AI-assisted option <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </section>
        </Container>
      </section>

      <section className="pb-12 sm:pb-16">
        <Container size="xl">
          <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
            <h2 className="font-serif text-3xl">Describe your product photography project.</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#252a2d]">Include the product, intended use, location, and a sample of the look you want. Esteban can then discuss a suitable scope with you.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`mailto:${site.email}?subject=Product%20photography%20inquiry`} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-5 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"><Mail className="size-4" aria-hidden="true" />Email Esteban</a>
              <a href={site.phone.href} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"><Phone className="size-4" aria-hidden="true" />Call Esteban</a>
            </div>
          </div>
        </Container>
      </section>
      <NicheAnswers path="/services/product-photography-miami" fact={String(metadata.description ?? "")} />
    </main>
  );
}
