import Link from "next/link";

import { DailyScriptPacingCalculator } from "@/components/daily-script-pacing-calculator";
import { ScriptPacingHelp } from "@/components/script-pacing-help";
import { Container } from "@/components/ui/container";
import { absoluteUrl } from "@/lib/site";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = buildPageMetadata({
  title: "Daily Video Script Pacing Calculator",
  description: "A daily video script pacing and spoken duration calculator with teleprompter timing drills for video creators and editors.",
  path: "/daily-script-pacing-calculator",
  locale: "en",
});

export default function DailyScriptPacingCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl("/daily-script-pacing-calculator#webpage"),
    url: absoluteUrl("/daily-script-pacing-calculator"),
    name: "Daily Video Script Pacing Calculator",
    description: "A daily video script pacing calculator, spoken duration estimator, and teleprompter drills for creators.",
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
              Daily video script pacing calculator
            </li>
          </ol>
        </nav>
        <DailyScriptPacingCalculator locale="en" />
        <ScriptPacingHelp locale="en" />
      </Container>
    </main>
  );
}
