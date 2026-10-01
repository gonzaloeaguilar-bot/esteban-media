import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Container } from "@/components/ui/container";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "AI Product Photo Truth Checklist",
  description:
    "A checklist for using AI product photos without changing labels, materials, proportions, included items, or customer expectations.",
  path: "/resources/ai-product-photo-truth-checklist",
  locale: "en",
});

const rules = [
  "Keep packaging text, warnings, flavor names, sizes, and included items accurate.",
  "Use real product references for color, shape, texture, label placement, and scale.",
  "Avoid changing reflective surfaces, jewelry details, stitching, ports, ingredients, or room fixtures into a nicer but false version.",
  "Separate concept images for ads from final product listing images that buyers use to inspect the item.",
  "Compare the final image against the real product before publishing.",
];

export default function AiProductPhotoTruthChecklistPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl("/resources/ai-product-photo-truth-checklist#webpage"),
    url: absoluteUrl("/resources/ai-product-photo-truth-checklist"),
    name: "AI Product Photo Truth Checklist",
    description: "A truth-first checklist for AI-assisted product photography.",
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16">
        <Container size="xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">AI product photos</p>
          <h1 className="mt-4 max-w-4xl font-serif em-display">AI product photo truth checklist</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#252a2d]">
            AI can help product visuals, but the final image still has to match what the customer can inspect, buy, and receive.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/services/ai-product-photography-miami" data-cta="resource_ai_photo_service" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]">
              Review AI photo service
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href="/guides/how-to-use-ai-for-product-photography" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]">
              Read the AI guide
            </Link>
            <Link href="/pricing/real-estate" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]">
              Real estate photo pricing
            </Link>
          </div>
        </Container>
      </section>
      <section className="py-12 sm:py-16">
        <Container size="xl">
          <div className="grid gap-4 md:grid-cols-2">
            {rules.map((rule) => (
              <article key={rule} className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5">
                <CheckCircle2 className="size-5 text-[#e85d3e]" aria-hidden="true" />
                <p className="mt-3 text-sm leading-7 text-[#252a2d]">{rule}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { href: "/services/ai-real-estate-photo-enhancement", title: "AI real estate photos", detail: "Use the same truth check for property images and listing media." },
              { href: "/guides/ai-product-photography-vs-traditional-studio", title: "AI vs studio", detail: "Compare when a generated image helps and when a real shoot is better." },
              { href: "/portfolio/my-dler", title: "Product visual example", detail: "See published visual brand work before requesting a product image." },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5 hover:border-[#e85d3e]">
                <h2 className="font-serif text-2xl">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[#3f4548]">{item.detail}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
