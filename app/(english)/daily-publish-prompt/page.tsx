import Link from "next/link";

import { DailyPublishPrompt } from "@/components/daily-publish-prompt";
import { Container } from "@/components/ui/container";
import { absoluteUrl } from "@/lib/site";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = buildPageMetadata({
  title: "Daily Video Publishing Prompt",
  description: "A small daily prompt and checklist for planning a video publishing pass.",
  path: "/daily-publish-prompt",
  locale: "en",
});

export default function DailyPublishPromptPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl("/daily-publish-prompt#webpage"),
    url: absoluteUrl("/daily-publish-prompt"),
    name: "Daily Video Publishing Prompt",
    description: "A daily prompt and local checklist for a video publishing pass.",
    isPartOf: { "@id": absoluteUrl("/#website") },
  };

  return (
    <main className="bg-[#f6f1ea] py-10 text-[#101214] sm:py-16">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Container size="xl">
        <nav aria-label="Breadcrumbs" className="mb-7 text-sm text-[#5a6066]">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-[#9f3c27]">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-[#252a2d]">Daily publishing prompt</li>
          </ol>
        </nav>
        <DailyPublishPrompt />
      </Container>
    </main>
  );
}
