import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { ClientReviews } from "@/components/client-reviews";
import { Container } from "@/components/ui/container";
import {
  ServiceFaqs,
  ServiceInquiryRail,
  buildServiceFaqSchema,
} from "@/components/service-depth";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, serviceAreas } from "@/lib/site";
import { entityIds } from "@/lib/entity-schema";

export const metadata = buildPageMetadata({
  title: "Hire a Remote Video Editor",
  description:
    "Hire Esteban Moreno Media for remote video editing, reels, YouTube editing, product videos, and bilingual social content from South Florida.",
  path: "/services/hire-remote-video-editor",
  locale: "en",
});

const fits = [
  "You already have footage and need it shaped into reels, shorts, YouTube videos, ads, or website clips.",
  "Your team is outside South Florida but can send original files, brand assets, references, and consolidated feedback.",
  "You want one editor to understand the goal, pacing, captions, formats, and final delivery needs before cutting.",
];

const process = [
  {
    title: "Send the useful brief",
    detail:
      "Share the business goal, platform, footage folder, must-use clips, references, and deadline. A clear handoff makes the first answer more useful.",
  },
  {
    title: "Confirm scope before editing",
    detail:
      "The quote should name the deliverables, formats, review path, and timing. That keeps a batch of reels, a YouTube edit, and an ad cut from being treated like one generic video.",
  },
  {
    title: "Review one place",
    detail:
      "Choose one feedback owner and keep notes grouped by video or timestamp. Remote work moves faster when revision notes do not conflict.",
  },
];

const REMOTE_EDITOR_DEPTH = {
  faqHeading: "Remote editing questions, answered before you send files",
  faqs: [
    {
      question: "What footage can Esteban edit remotely?",
      answer:
        "Remote editing works from original files the client already has: phone or camera footage, screen recordings, product clips, and separately recorded audio. Files should be sent as originals rather than clips re-saved out of a messaging app, because a message-app copy is already compressed and the detail cannot be restored.",
    },
    {
      question: "Does Esteban work with businesses outside South Florida?",
      answer:
        "Yes for remote editing, AI-assisted content, social planning, and asset-based visual work when source files can be shared online. On-location capture is a separate decision and is only considered for South Florida projects.",
    },
    {
      question: "What does remote video editing cost?",
      answer:
        "The Starter package, remote editing of footage you already have, starts from $100 per video with one revision round included. Every project is priced from the actual footage, the deliverable list, and the number of revision rounds, so the package price is a starting point rather than a fixed rate.",
    },
    {
      question: "What languages does Esteban work in?",
      answer:
        "Esteban works in Spanish first, with intermediate English communication available, so a bilingual brief or a Spanish-language video is straightforward. He does not claim full fluency in English, and this is not a translation service for other languages.",
    },
  ],
} as const;

export default function HireRemoteVideoEditorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(
        absoluteUrl("/services/hire-remote-video-editor"),
        REMOTE_EDITOR_DEPTH.faqs,
      ),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/hire-remote-video-editor#service"),
        name: "Remote video editing service",
        description:
          "Remote video editing for supplied footage, short-form social video, YouTube, product videos, and bilingual content.",
        provider: { "@id": entityIds.business },
        areaServed: serviceAreas.map((area) => area.name),
        url: absoluteUrl("/services/hire-remote-video-editor"),
      },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16">
        <Container size="xl">
          <nav aria-label="Breadcrumbs" className="mb-8 text-sm text-[#5a6066]">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-[#9f3c27]">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/services" className="hover:text-[#9f3c27]">Services</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">Remote video editor</li>
            </ol>
          </nav>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">Remote video editing</p>
          <h1 className="mt-4 max-w-4xl font-serif em-display">Hire a remote video editor for reels, YouTube, ads, and business footage.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#252a2d]">
            Esteban can work from supplied footage, brand assets, and clear notes, so businesses in South Florida or out of state can request editing without booking a local shoot.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/resources/remote-editing-handoff-checklist" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]">
              Prepare files first
            </Link>
            <Link href="/pricing/starter" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]">
              Starter editing price
            </Link>
            <Link href="/contact" data-cta="remote_editor_contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]">
              Ask for a quote
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container size="xl">
          <div className="grid gap-8 lg:grid-cols-[.74fr_1.26fr]">
            <div>
              <h2 className="font-serif text-4xl leading-tight">When remote editing is a fit</h2>
              <p className="mt-4 text-sm leading-7 text-[#3f4548]">
                Remote editing works best when the footage already exists and the decision-maker can explain what the finished video should do.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {fits.map((fit) => (
                <article key={fit} className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5">
                  <CheckCircle2 className="size-5 text-[#e85d3e]" aria-hidden="true" />
                  <p className="mt-3 text-sm leading-7 text-[#252a2d]">{fit}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-[#ddd4c8] bg-[#fbf6ef] py-12 sm:py-16">
        <Container size="xl">
          <h2 className="max-w-3xl font-serif text-4xl leading-tight">How to make the first quote useful</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {process.map((step) => (
              <article key={step.title} className="rounded-lg border border-[#ddd4c8] bg-white p-5">
                <h3 className="font-serif text-2xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#252a2d]">{step.detail}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { href: "/services/short-form-video-editor-miami", title: "Short-form video", detail: "For supplied footage that needs reels, Shorts, TikTok, captions, and crops." },
              { href: "/services/youtube-video-editing-service-miami", title: "YouTube editing", detail: "For long-form structure, audio cleanup, pacing, and clips from one main edit." },
              { href: "/resources/video-project-brief-template", title: "Brief template", detail: "Copy a message that makes the quote easier to answer." },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="rounded-lg border border-[#ddd4c8] bg-white p-5 hover:border-[#e85d3e]">
                <h3 className="font-serif text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#3f4548]">{item.detail}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <ClientReviews locale="en" />

      <ServiceFaqs heading={REMOTE_EDITOR_DEPTH.faqHeading} faqs={REMOTE_EDITOR_DEPTH.faqs} />

      <ServiceInquiryRail
        service={{
          serviceId: "remote_video_editor",
          serviceName: "remote video editing",
          goalPrompt: "turn supplied footage into publish-ready videos",
          assetPrompt: "raw files, brand assets, references, formats, and a deadline",
          proofHref: "/portfolio/homeowners",
          proofLabel: "View published remote editing proof",
        }}
      />
    </main>
  );
}
