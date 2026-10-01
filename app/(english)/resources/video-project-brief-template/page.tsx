import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Container } from "@/components/ui/container";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Video Project Brief Template",
  description:
    "Copy a practical video project brief before asking Esteban Moreno Media for a quote on editing, reels, product video, YouTube, or social content.",
  path: "/resources/video-project-brief-template",
  locale: "en",
});

const fields = [
  "Business name and one-line offer",
  "Publishing goal and platform",
  "Audience the video should speak to",
  "Source footage, photos, audio, logo, and brand assets available",
  "Must-use clips, products, names, offers, or disclaimers",
  "Requested formats, such as 9:16 reels, 16:9 YouTube, square ads, or all three",
  "Deadline, launch date, and who approves revisions",
];

export default function VideoProjectBriefTemplatePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl("/resources/video-project-brief-template#webpage"),
    url: absoluteUrl("/resources/video-project-brief-template"),
    name: "Video Project Brief Template",
    description:
      "A copy-ready brief for businesses preparing a video editing or content project.",
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16">
        <Container size="xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">Free project prep</p>
          <h1 className="mt-4 max-w-4xl font-serif em-display">Video project brief template</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#252a2d]">
            Copy this before you ask for a quote: it helps an editor understand the goal, files, formats, and deadline without a long back-and-forth.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/contact" data-cta="resource_video_brief_contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]">
              Send a prepared brief
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href="/guides/write-a-useful-video-brief" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]">
              Read the guide
            </Link>
            <Link href="/pricing" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]">
              See starting prices
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container size="xl">
          <div className="grid gap-8 lg:grid-cols-[.76fr_1.24fr]">
            <div>
              <h2 className="font-serif text-4xl leading-tight">What to include</h2>
              <p className="mt-4 text-sm leading-7 text-[#3f4548]">
                A brief does not need to be fancy. It needs to make the quote easier: what the business needs, what files exist, what must be delivered, and what would make the project fail if missed.
              </p>
            </div>
            <div className="grid gap-3">
              {fields.map((field) => (
                <div key={field} className="flex gap-3 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-4">
                  <CheckCircle2 className="mt-1 size-5 shrink-0 text-[#e85d3e]" aria-hidden="true" />
                  <p className="text-sm leading-6 text-[#252a2d]">{field}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 rounded-xl border border-[#ddd4c8] bg-white p-5 sm:p-6">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#9f3c27]">Copy-ready message</p>
            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-[#252a2d]">
              Business:{"\n"}Goal:{"\n"}Platform:{"\n"}Files available:{"\n"}Must-use moments or words:{"\n"}Formats needed:{"\n"}Deadline:{"\n"}Reference links:{"\n"}Who gives feedback:
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { href: "/pricing/starter", title: "Starter editing", detail: "Use this brief before asking for a small remote editing quote." },
              { href: "/pricing/growth", title: "Monthly growth", detail: "Use it to define a batch of recurring reels, shorts, or social cuts." },
              { href: "/services/hire-remote-video-editor", title: "Remote editing", detail: "Send the brief with original footage when the work can happen online." },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5 hover:border-[#e85d3e]">
                <h2 className="font-serif text-2xl">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[#3f4548]">{item.detail}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
