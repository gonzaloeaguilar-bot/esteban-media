import Link from "next/link";

import { DailyShotListPlanner } from "@/components/daily-shot-list-planner";
import { Container } from "@/components/ui/container";
import { absoluteUrl } from "@/lib/site";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = buildPageMetadata({
  title: "Daily Video Shot List & B-Roll Planner",
  description: "A daily shot list framework and 3-step filming checklist for video production and content creators.",
  path: "/daily-shot-list-planner",
  locale: "en",
});

export default function DailyShotListPlannerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl("/daily-shot-list-planner#webpage"),
    url: absoluteUrl("/daily-shot-list-planner"),
    name: "Daily Video Shot List & B-Roll Planner",
    description: "A daily video shot list framework, custom shot tracker, and pre-shoot checklist for video creators.",
    isPartOf: { "@id": absoluteUrl("/#website") },
  };

  return (
    <main className="bg-[#f6f1ea] py-10 text-[#101214] sm:py-16">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container size="xl">
        <nav aria-label="Breadcrumbs" className="mb-7 text-sm text-[#5a6066]">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-[#9f3c27]">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-[#252a2d]">
              Daily video shot list planner
            </li>
          </ol>
        </nav>
        <DailyShotListPlanner locale="en" />
      </Container>
    </main>
  );
}
