import { PageQuestions } from "@/components/page-questions";
import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Compass,
  FileText,
  Mail,
  Phone,
  Scissors,
  Sparkles,
  Video,
  WandSparkles,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { buildServicePageNodes } from "@/components/service-depth";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

const faqs = [
  {
    question: "What raw footage should I provide for TikTok ad video editing?",
    answer:
      "We work with client-supplied footage: smartphone recordings, camera footage, unboxing clips, direct-to-camera founder hooks, product demos, or UGC creator testimonials. Providing brand guidelines, logos, and specific call-to-action text ensures fast turnaround.",
  },
  {
    question: "Do you provide multiple hook variations for creative testing?",
    answer:
      "Yes. A single ad shoot or asset batch can be edited with multiple 3-to-5 second opening hooks paired with a consistent body and call to action to enable structured A/B testing inside TikTok and Meta ad managers.",
  },
  {
    question: "How do you ensure captions and text stay within TikTok safe zones?",
    answer:
      "Every video ad is edited and formatted to 9:16 vertical standards, keeping dynamic animated captions, key product visuals, and text overlays within mobile safe zones so platform UI buttons, usernames, and captions never obscure critical details.",
  },
  {
    question: "Can edited TikTok video ads be used on Instagram Reels and Facebook Ads?",
    answer:
      "Yes. Vertical 9:16 cuts and adapted 1:1 or 4:5 ratios are configured to meet technical specs across TikTok Ads Manager and Meta Ads Manager for seamless multi-platform campaign deployment.",
  },
  {
    question: "How are feedback and revisions handled during the ad editing process?",
    answer:
      "After the initial cut is delivered, you can provide consolidated, time-stamped feedback covering pacing, hook timing, graphics, and captions to refine the edit within the agreed project scope.",
  },
] as const;

export const metadata = buildPageMetadata({
  title: "TikTok Ad Video Editor Miami",
  // SNIPPET TEST 2026-10-07 (GSC: tiktok ad video editor miami, 5 impr, pos 11.2, 0 clicks). Read GSC after 2026-11-10; if still 0 clicks, revert rather than iterate.
  description:
    "TikTok ad video editor in Miami, working from your footage: 3-second hooks, captions, safe-zone framing and paid-social cuts. Spanish-first, English available.",
  path: "/services/tiktok-ad-video-editor-miami",
  locale: "en",
});

export default function TiktokAdVideoEditorMiamiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...buildServicePageNodes({
        path: "/services/tiktok-ad-video-editor-miami",
        name: "TikTok Ad Video Editor Miami",
        description:
          "TikTok ad video editor in Miami, working from your footage: 3-second hooks, captions, safe-zone framing and paid-social cuts. Spanish-first, English available.",
        crumb: "TikTok Ad Video Editor",
      }),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/tiktok-ad-video-editor-miami#service"),
        name: "TikTok Ad Video Editor Miami",
        // SNIPPET TEST 2026-10-07 (GSC: tiktok ad video editor miami, 5 impr, pos 11.2, 0 clicks). Read GSC after 2026-11-10; if still 0 clicks, revert rather than iterate.
        description:
          "TikTok ad video editor in Miami, working from your footage: 3-second hooks, captions, safe-zone framing and paid-social cuts. Spanish-first, English available.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Miami-Dade / Broward",
        serviceType: "TikTok ad video editing",
      },
      {
        "@type": "FAQPage",
        "@id": absoluteUrl("/services/tiktok-ad-video-editor-miami#faq"),
        inLanguage: "en-US",
        isPartOf: { "@id": absoluteUrl("/#website") },
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(withNicheService("/services/tiktok-ad-video-editor-miami", jsonLd)) }}
      />
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20">
        <Container size="xl">
          <nav aria-label="Breadcrumbs" className="mb-8 text-sm text-[#5a6066]">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-[#9f3c27]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/services" className="hover:text-[#9f3c27]">
                  Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">
                TikTok Ad Video Editor
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Miami / TikTok & Social Ads
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                TikTok & Social Ad Video Editor in Miami.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Edit client-supplied footage into clear TikTok and Meta ad cuts with a focused opening, captions, safe-zone framing, and the formats your campaign needs.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Edit TikTok Ads
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/portfolio/bar-door-monkey"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  View Social Ad Proof
                </Link>
                <Link
                  href="/calculator"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  Calculate Project Budget
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <WandSparkles className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">TikTok ad proof</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Our{" "}
                <Link
                  href="/portfolio"
                  className="underline underline-offset-4 hover:text-[#9f3c27]"
                >
                  portfolio
                </Link>{" "}
                project <strong>Bar Door Monkey Miami</strong> is a published social promo for a Miami restaurant, filmed on location and delivered for the venue&apos;s Instagram. It is relevant format proof, not a paid-ad or performance claim.
              </p>
              <div className="mt-5 border-t border-[#ddd4c8] pt-4">
                <Link
                  href="/portfolio/bar-door-monkey"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#9f3c27] hover:text-[var(--em-accent-ink)]"
                >
                  Explore Bar Door Monkey Case Study
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <PageQuestions path="/services/tiktok-ad-video-editor-miami" />

      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20">
        <Container size="xl">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-medium uppercase text-[#5a6066]">Editing approach</p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              Start with one clear hook, then make the offer easy to follow.
            </h2>
            <div className="mt-8 space-y-6 text-base leading-8 text-[#252a2d]">
              <p>
                A direct-response video ad needs a clear opening quickly. The edit starts by finding the strongest visual or spoken moment in your <strong>client-supplied footage</strong>: a product demonstration, user reaction, product problem, or founder statement.
              </p>
              <p>
                The rest of the cut keeps the offer readable: remove dead air, keep captions away from platform controls, and let the product or service stay visible. For a simple planning framework, see the <Link href="/guides/how-to-use-instagram-reels-for-business" className="underline underline-offset-4 hover:text-[#9f3c27]">short-form business video guide</Link>.
              </p>
              <p>
                If your team wants more than one opening, the same core footage can be edited into several hook variations with one consistent body and supplied call to action. All editing uses <strong>client-supplied footage</strong>, so a new shoot is not assumed for every variation.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[#ddd4c8] bg-[#fbf6ef] py-12 sm:py-16">
        <Container size="xl">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-medium uppercase text-[#5a6066]">Technical execution</p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              Safe zones, dynamic typography, and multi-ratio exports.
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <article className="rounded-xl border border-[#ddd4c8] bg-[#f6f1ea] p-6">
                <h3 className="font-serif text-2xl">9:16 & 4:5 crops</h3>
                <p className="mt-3 text-sm leading-6 text-[#252a2d]">Vertical 9:16 exports for TikTok, Instagram Reels, and YouTube Shorts, alongside 4:5 or 1:1 ratios for feed placements. Every frame is carefully reframed to keep subjects centered.</p>
              </article>
              <article className="rounded-xl border border-[#ddd4c8] bg-[#f6f1ea] p-6">
                <h3 className="font-serif text-2xl">Mobile safe zones</h3>
                <p className="mt-3 text-sm leading-6 text-[#252a2d]">Captions, stickers, and headlines are placed precisely inside platform safe areas, ensuring username overlays, audio titles, and CTA buttons never cover essential messaging.</p>
              </article>
              <article className="rounded-xl border border-[#ddd4c8] bg-[#f6f1ea] p-6">
                <h3 className="font-serif text-2xl">Hook batching</h3>
                <p className="mt-3 text-sm leading-6 text-[#252a2d]">Deliver 3 to 5 opening hook variations for a single ad body to give media buyers the necessary creative breadth for continuous testing and reduced ad fatigue.</p>
              </article>
            </div>
            <p className="mt-8 text-base leading-8 text-[#252a2d]">
              Organizing raw assets by shot type, hook idea, and product feature makes post-production seamless. Provide high-resolution logos, product vectors, and brand fonts alongside your <strong>client-supplied footage</strong>. Review our <Link href="/guides/remote-video-editing-handoff" className="underline underline-offset-4 hover:text-[#9f3c27]">remote editing handoff guide</Link> for asset preparation guidelines.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-[#ddd4c8] py-12 sm:py-16">
        <Container size="xl">
          <p className="text-xs font-medium uppercase text-[#5a6066]">
            Connected Services & Solutions
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
            Comprehensive creative editing for modern digital marketing.
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/services/short-form-video-editor-miami"
              className="group rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 transition hover:border-[#e85d3e]"
            >
              <Scissors className="size-6 text-[#e85d3e]" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-2xl">Short-Form Video Editing</h3>
              <p className="mt-2 text-sm leading-6 text-[#5a6066]">
                Engaging vertical video editing with animated subtitles and sound design for organic social reach.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-[#9f3c27] group-hover:underline">
                Explore Short-Form Editing
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
            </Link>

            <Link
              href="/services/ugc-video-editor-ecommerce"
              className="group rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 transition hover:border-[#e85d3e]"
            >
              <Video className="size-6 text-[#e85d3e]" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-2xl">UGC Video Editing</h3>
              <p className="mt-2 text-sm leading-6 text-[#5a6066]">
                Authentic user-generated content editing engineered for e-commerce direct response and conversion.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-[#9f3c27] group-hover:underline">
                Explore UGC Editing
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
            </Link>

            <Link
              href="/services/content-repurposing-service-miami"
              className="group rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 transition hover:border-[#e85d3e]"
            >
              <Sparkles className="size-6 text-[#e85d3e]" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-2xl">Content Repurposing</h3>
              <p className="mt-2 text-sm leading-6 text-[#5a6066]">
                Transform podcasts, keynotes, and long-form webinars into high-impact social clips and paid ad cuts.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-[#9f3c27] group-hover:underline">
                Explore Repurposing
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-b border-[#ddd4c8] py-12 sm:py-16">
        <Container size="xl">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1fr]">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">Frequently asked questions</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight">Key answers before submitting your TikTok ad footage.</h2>
            </div>
            <div className="grid gap-3">
              {faqs.map((faq) => (
                <article key={faq.question} className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5">
                  <h3 className="font-serif text-2xl">{faq.question}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#252a2d]">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[#ddd4c8] bg-[#fbf6ef] py-12 sm:py-16">
        <Container size="xl">
          <p className="text-xs font-medium uppercase text-[#5a6066]">
            Practical Production Guidance
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
            Strategic resources to scale your short-form video ads.
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <Link
              href="/guides/how-to-use-instagram-reels-for-business"
              className="group rounded-xl border border-[#ddd4c8] bg-[#f6f1ea] p-6 transition hover:border-[#e85d3e]"
            >
              <FileText className="size-6 text-[#1a9fa3]" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-2xl">
                How to Use Instagram Reels & Short-Form Video for Business
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#5a6066]">
                Actionable tactics for scripting, filming, and pacing 15-to-30 second vertical videos with strong call-to-action endings.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-[#9f3c27] group-hover:underline">
                Read Short-Form Guide
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
            </Link>

            <Link
              href="/guides/remote-video-editing-handoff"
              className="group rounded-xl border border-[#ddd4c8] bg-[#f6f1ea] p-6 transition hover:border-[#e85d3e]"
            >
              <Compass className="size-6 text-[#1a9fa3]" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-2xl">
                Remote Video Editing Handoff & Footage Preparation
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#5a6066]">
                How to organize camera files, audio tracks, and branding assets to ensure a swift, seamless post-production turnaround.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-[#9f3c27] group-hover:underline">
                Read Handoff Guide
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </Container>
      </section>

      <section className="pb-12 sm:pb-16 pt-12">
        <Container size="xl">
          <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-medium uppercase text-[#5a6066]">
                  Get Started
                </p>
                <h2 className="mt-3 font-serif text-4xl">
                  Scaling paid video ad campaigns on TikTok or Meta?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Send raw video ad footage or creator clips for editing, or calculate your custom project scope online.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/calculator"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  <Calculator className="size-4" aria-hidden="true" />
                  Budget Calculator
                </Link>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-5 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  Email
                </a>
                <a
                  href={site.phone.href}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  Call
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <NicheAnswers path="/services/tiktok-ad-video-editor-miami" fact={String(metadata.description ?? "")} />
    </main>
  );
}
