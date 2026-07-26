import Link from "next/link";
import { Container } from "@/components/ui/container";
import { VideoBudgetEstimator } from "@/components/video-budget-estimator";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Video Production & Editing Budget Calculator",
  description:
    "Free video production cost and turnaround estimator for South Florida businesses and remote editing clients.",
  path: "/calculator",
  locale: "en",
});

export default function CalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl("/calculator#webpage"),
    url: absoluteUrl("/calculator"),
    name: "Video Production & Editing Budget Calculator",
    description:
      "Estimate your video editing costs and turnaround time for Reels, YouTube, corporate SOPs, and drone projects.",
    isPartOf: { "@id": absoluteUrl("/#website") },
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="py-12 sm:py-16">
        <Container size="xl">
          <nav aria-label="Breadcrumbs" className="mb-8 text-sm text-[#5a6066]">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-[#9f3c27]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">
                Budget Calculator
              </li>
            </ol>
          </nav>

          <VideoBudgetEstimator locale="en" />
        </Container>
      </section>
    </main>
  );
}
