import Link from "next/link";

import { DailyHookPlanner } from "@/components/daily-hook-planner";
import { ContactCta } from "@/components/contact-cta";
import { Container } from "@/components/ui/container";
import { absoluteUrl } from "@/lib/site";
import { toolApplicationNode } from "@/lib/tool-schema";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = buildPageMetadata({
  title: "Daily Video Hook & Content Planner | Short-Form Video Tool",
  description: "Plan better hooks for Reels, TikTok, and Shorts with a daily framework and checklist. Get professional short-form editing help in Fort Lauderdale and Miami.",
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
    mainEntity: toolApplicationNode({
      path: "/daily-hook-planner",
      name: "Daily Video Hook & Content Planner",
      description: "A daily hook framework and local checklist for short-form video content planning.",
      locale: "en",
    }),
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="py-10 sm:py-16">
        <Container size="xl">
          <nav aria-label="Breadcrumbs" className="mb-7 text-sm text-[#5a6066]">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-[#9f3c27]">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/guides" className="hover:text-[#9f3c27]">Guides</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">Daily video hook planner</li>
            </ol>
          </nav>

          <div className="mx-auto mb-8 max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">Free planning tool</p>
            <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">Daily video hook planner</h1>
            <p className="mt-4 text-base leading-7 text-[#3f4548]">Use proven hook frameworks and a short planning checklist to start stronger short-form videos. When you need help turning hooks into edited Reels or Shorts, Esteban can produce the final cut.</p>
          </div>

          <DailyHookPlanner />

          <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 text-sm leading-6 text-[#252a2d]">
            <p>Related services and resources: <Link href="/services/reels-editor-fort-lauderdale" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">Reels editing in Fort Lauderdale</Link>, <Link href="/services/short-form-video-editor-miami" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">short-form video editing in Miami</Link>, and <Link href="/guides" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">practical video guides</Link>.</p>
          </div>
        </Container>
      </section>
      <ContactCta locale="en" />
    </main>
  );
