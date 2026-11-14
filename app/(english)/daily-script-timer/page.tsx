import Link from "next/link";

import { DailyScriptTimer } from "@/components/daily-script-timer";
import { PageUpdated } from "@/components/page-updated";
import { ScriptLengthAnswer } from "@/components/script-length-answer";
import { ContactCta } from "@/components/contact-cta";
import { Container } from "@/components/ui/container";
import { pageLastModified } from "@/lib/page-lastmod";
import { absoluteUrl } from "@/lib/site";
import { toolApplicationNode } from "@/lib/tool-schema";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = buildPageMetadata({
  title: "Daily Script Timer & Pacing Calculator | Short-Form Video Tool",
  description: "Calculate script timing and pacing for 15s, 30s, and 60s videos. Plan tighter Reels, TikTok, and Shorts with professional editing support available.",
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
    mainEntity: toolApplicationNode({
      path: "/daily-script-timer",
      name: "Daily Script Timer & Video Pacing Calculator",
      description: "An interactive pacing calculator and daily rehearsal checklist for vertical short-form video creators.",
      locale: "en",
    }),
    ...(pageLastModified("/daily-script-timer") ? { dateModified: pageLastModified("/daily-script-timer") } : {}),
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
              <li><Link href="/resources" className="hover:text-[#9f3c27]">Resources</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">Daily script timer & pacing calculator</li>
            </ol>
          </nav>

          <div className="mx-auto mb-8 max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">Free planning tool</p>
            <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">Daily script timer & pacing calculator</h1>
            <p className="mt-4 text-base leading-7 text-[#3f4548]">Time your script, match pacing to 15s/30s/60s formats, and tighten delivery before recording. When you need a polished edit, captions, or short-form versions, Esteban can handle post-production.</p>
          </div>

          <DailyScriptTimer />

          <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 text-sm leading-6 text-[#252a2d]">
            <p>Related services and resources: <Link href="/services/short-form-video-editor-miami" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">short-form video editing in Miami</Link>, <Link href="/services/reels-editor-fort-lauderdale" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">Reels editing in Fort Lauderdale</Link>, and <Link href="/resources/social-video-kit" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">social video script kit</Link>.</p>
          </div>
        </Container>
      </section>
      <ContactCta locale="en" />
    </main>
  );
