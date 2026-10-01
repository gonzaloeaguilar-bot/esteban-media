import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Container } from "@/components/ui/container";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Remote Video Editing Handoff Checklist",
  description:
    "A practical checklist for sending footage, audio, brand files, references, and revision notes to a remote video editor.",
  path: "/resources/remote-editing-handoff-checklist",
  locale: "en",
});

const checklist = [
  "Upload original files, not compressed social downloads, whenever possible.",
  "Group footage by shoot, scene, product, room, speaker, or date.",
  "Add a short note naming the strongest clips and anything that must not be used.",
  "Include logos, fonts, color references, captions, offers, and required wording.",
  "Send platform requirements before editing starts: reels, TikTok, Shorts, YouTube, website, ads, or all of them.",
  "Choose one person to collect revision notes so feedback does not conflict.",
];

export default function RemoteEditingHandoffChecklistPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl("/resources/remote-editing-handoff-checklist#webpage"),
    url: absoluteUrl("/resources/remote-editing-handoff-checklist"),
    name: "Remote Video Editing Handoff Checklist",
    description: "A checklist for preparing files before remote video editing.",
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16">
        <Container size="xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">Remote editing</p>
          <h1 className="mt-4 max-w-4xl font-serif em-display">Remote video editing handoff checklist</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#252a2d]">
            Send the files and decisions that let a remote editor start cleanly: originals, context, brand assets, formats, and one feedback owner.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/services/hire-remote-video-editor" data-cta="resource_remote_handoff_service" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]">
              Hire a remote editor
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href="/guides/remote-video-editing-handoff" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]">
              Read the handoff guide
            </Link>
            <Link href="/pricing/starter" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]">
              Starter editing price
            </Link>
          </div>
        </Container>
      </section>
      <section className="py-12 sm:py-16">
        <Container size="xl">
          <div className="grid gap-4 md:grid-cols-2">
            {checklist.map((item) => (
              <article key={item} className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5">
                <CheckCircle2 className="size-5 text-[#e85d3e]" aria-hidden="true" />
                <p className="mt-3 text-sm leading-7 text-[#252a2d]">{item}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { href: "/services/short-form-video-editor-miami", title: "Short-form editing", detail: "For reels, TikTok, Shorts, captions, pacing, and safe crops." },
              { href: "/services/youtube-video-editing-service-miami", title: "YouTube editing", detail: "For longer edits that need structure, audio cleanup, and clips." },
              { href: "/guides/fastest-way-to-send-large-video-files-to-editor", title: "Large file transfer", detail: "For preparing original footage before remote editing starts." },
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
