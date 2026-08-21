import Link from "next/link";

import { DailyScriptTimer } from "@/components/daily-script-timer";
import { Container } from "@/components/ui/container";
import { absoluteUrl } from "@/lib/site";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = buildPageMetadata({
  title: "Daily Script Timer & Video Pacing Calculator",
  description: "Calculate short-form video speaking duration, word count budgets for 15s/30s/60s formats, and daily rehearsal checks.",
  path: "/daily-script-timer",
  locale: "en",
});

export default function DailyScriptTimerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl("/daily-script-timer#webpage"),
    url: absoluteUrl("/daily-script-timer"),
    name: "Daily Script Timer & Video Pacing Calculator",
    description: "An interactive pacing calculator and daily rehearsal checklist for vertical short-form video creators.",
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
              Daily video script timer
            </li>
          </ol>
        </nav>
        <DailyScriptTimer />
      </Container>
    </main>
  );
}
