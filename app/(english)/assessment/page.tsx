import Link from "next/link";
import { Container } from "@/components/ui/container";
import { VideoStrategyAssessment } from "@/components/video-strategy-assessment";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "South Florida Video Strategy Diagnostic",
  description:
    "Free 60-second video content strategy audit and score for South Florida businesses and brands.",
  path: "/assessment",
  locale: "en",
});

export default function AssessmentPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl("/assessment#webpage"),
    url: absoluteUrl("/assessment"),
    name: "South Florida Video Strategy Diagnostic",
    description:
      "Evaluate your video content strategy, bilingual EN/ES reach, and mobile format execution.",
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
                Strategy Diagnostic
              </li>
            </ol>
          </nav>

          <VideoStrategyAssessment locale="en" />
        </Container>
      </section>
    </main>
  );
}
