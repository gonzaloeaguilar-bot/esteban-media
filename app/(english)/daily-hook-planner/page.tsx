import Link from "next/link";

import { DailyHookPlanner } from "@/components/daily-hook-planner";
import { Container } from "@/components/ui/container";
import { absoluteUrl } from "@/lib/site";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = buildPageMetadata({
  title: "Daily Video Hook & Content Planner",
  description: "A daily hook framework and 3-check planning tool for short-form video publishing.",
  path: "/daily-hook-planner",
  locale: "en",
});

export default function DailyHookPlannerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl("/daily-hook-planner#webpage"),
    url: absoluteUrl("/daily-hook-planner"),
    name: "Daily Video Hook & Content Planner",
    description: "A daily hook framework and local checklist for short-form video content planning.",
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
              Daily video hook planner
            </li>
          </ol>
        </nav>
        <DailyHookPlanner />
      </Container>
    </main>
  );
}
