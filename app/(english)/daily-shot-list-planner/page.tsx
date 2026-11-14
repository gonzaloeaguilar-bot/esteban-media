import Link from "next/link";

import { DailyShotListPlanner } from "@/components/daily-shot-list-planner";
import { ContactCta } from "@/components/contact-cta";
import { Container } from "@/components/ui/container";
import { absoluteUrl } from "@/lib/site";
import { toolApplicationNode } from "@/lib/tool-schema";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = buildPageMetadata({
  title: "Daily Video Shot List & B-Roll Planner | Filming Checklist",
  description: "Plan your daily shot list, B-roll, and filming checklist for better video production. Get help with filming and editing in South Florida.",
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
    mainEntity: toolApplicationNode({
      path: "/daily-shot-list-planner",
      name: "Daily Video Shot List & B-Roll Planner",
      description: "A daily video shot list framework, custom shot tracker, and pre-shoot checklist for video creators.",
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
              <li aria-current="page" className="text-[#252a2d]">Daily video shot list & B-roll planner</li>
            </ol>
          </nav>

          <div className="mx-auto mb-8 max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">Free planning tool</p>
            <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">Daily video shot list & B-roll planner</h1>
            <p className="mt-4 text-base leading-7 text-[#3f4548]">Plan essential shots, B-roll, and a pre-shoot checklist so your filming day runs smoother. If you need on-location capture or editing support, Esteban can help bring the plan to life.</p>
          </div>

          <DailyShotListPlanner locale="en" />

          <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 text-sm leading-6 text-[#252a2d]">
            <p>Related services and resources: <Link href="/services/video-production-fort-lauderdale" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">video production in Fort Lauderdale</Link>, <Link href="/services/hire-remote-video-editor" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">remote video editing</Link>, and <Link href="/guides/prepare-footage-for-video-editing" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">how to prepare footage</Link>.</p>
          </div>
        </Container>
      </section>
      <ContactCta locale="en" />
    </main>
  );
