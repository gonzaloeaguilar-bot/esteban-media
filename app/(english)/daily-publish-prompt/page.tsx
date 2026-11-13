import Link from "next/link";

import { ContactCta } from "@/components/contact-cta";
import { DailyPublishPrompt } from "@/components/daily-publish-prompt";
import { Container } from "@/components/ui/container";
import { absoluteUrl } from "@/lib/site";
import { toolApplicationNode } from "@/lib/tool-schema";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = buildPageMetadata({
  title: "Daily Video Publishing Prompt | Free Content Planning Tool",
  description:
    "Use a daily video publishing prompt and checklist to plan, publish, and stay consistent with short-form content. Get help from a Fort Lauderdale video editor when you need editing or production.",
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
    description:
      "A daily prompt and local checklist for planning a video publishing pass, with a clear path to professional editing and production support.",
    isPartOf: { "@id": absoluteUrl("/#website") },
    mainEntity: toolApplicationNode({
      path: "/daily-publish-prompt",
      name: "Daily Video Publishing Prompt",
      description:
        "A daily prompt and local checklist for planning a video publishing pass.",
      locale: "en",
    }),
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="py-10 sm:py-16">
        <Container size="xl">
          <nav aria-label="Breadcrumbs" className="mb-7 text-sm text-[#5a6066]">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-[#9f3c27]">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/guides" className="hover:text-[#9f3c27]">Guides</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">Daily publishing prompt</li>
            </ol>
          </nav>

          <div className="mx-auto mb-8 max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">Free planning tool</p>
            <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">Daily video publishing prompt</h1>
            <p className="mt-4 text-base leading-7 text-[#3f4548]">
              Use one focused prompt and a short checklist to publish consistently. When you need help turning ideas into finished Reels, Shorts, or client-ready videos, Esteban can edit, caption, and refine the final cut.
            </p>
          </div>

          <DailyPublishPrompt />

          <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 text-sm leading-6 text-[#252a2d]">
            <p>
              Need more than a prompt? Explore{" "}
              <Link href="/services/reels-editor-fort-lauderdale" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">Reels editing in Fort Lauderdale</Link>,{" "}
              <Link href="/services/short-form-video-editor-miami" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">short-form video editing in Miami</Link>, or{" "}
              <Link href="/services/hire-remote-video-editor" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">remote video editing</Link>.
            </p>
          </div>
        </Container>
      </section>
      <ContactCta locale="en" />
    </main>
  );
}
