import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ChevronDown, MessageCircle, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { PriceSheet } from "@/components/price-sheet";
import { PriorityLinks } from "@/components/priority-links";
import { ClientReviews } from "@/components/client-reviews";
import { DefinitionAnswer } from "@/components/definition-answer";
import { PageUpdated } from "@/components/page-updated";
import { YouTubeFacade } from "@/components/youtube-facade";
import {
  ServiceCraft,
  ServiceDeepDive,
  ServiceFaqs,
  ServiceInquiryRail,
  ServiceRelated,
  buildServiceFaqSchema,
  buildServicePageNodes,
} from "@/components/service-depth";
import { SHORT_FORM_DEPTH } from "@/lib/service-depth-content";
import { SHORT_FORM_DEEP_DIVE_EN, shortFormServiceJsonLd, shortFormWhatsappHref } from "@/lib/short-form-recs";
import { SHORT_FORM, usd } from "@/lib/pricing";
import { withPageDate } from "@/lib/page-lastmod";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Short Form Video Editor Miami | Reels, TikTok & YouTube Shorts",
  description: `Short-form video editing for Instagram Reels, TikTok, and YouTube Shorts for influencers, creators and businesses in Miami and Fort Lauderdale. Editor de video / Reels en español. From ${usd(SHORT_FORM.perVideoFrom)} per video.`,
  path: "/services/short-form-video-editor-miami",
  locale: "en",
});

export default function ShortFormVideoEditorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(absoluteUrl("/services/short-form-video-editor-miami"), SHORT_FORM_DEPTH.faqs),
      shortFormServiceJsonLd("en"),
      ...buildServicePageNodes({
        path: "/services/short-form-video-editor-miami",
        name: "Short Form Video Editor Miami",
        description: String(metadata.description),
        crumb: "Short-Form Editor",
      }),
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(withPageDate("/services/short-form-video-editor-miami", jsonLd, absoluteUrl("/services/short-form-video-editor-miami"))) }}
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
                Short-Form Editor
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Reels / Shorts / TikTok
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Short-Form Video Editing for Reels & TikTok.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                High-retention 9:16 vertical editing with bold captions, visual hooks, and sound design to keep audiences watching.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Get Reels Edited — From $100/Video
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/portfolio/great-reviewer-iphone-18"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  See recent work
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#ddd4c8] bg-[#101214] shadow-[0_22px_70px_rgba(16,18,20,.18)]" data-section="short-form-hero-proof">
              <div className="relative aspect-video">
                <Image
                  src="/portfolio/great-reviewer-iphone-18.jpg"
                  alt="Still from Esteban Moreno Media's recent The Great Reviewer video edit"
                  fill
                  priority
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                />
                <YouTubeFacade
                  videoId="BDRru8eXaj4"
                  title="The Great Reviewer: iPhone 18 Pro Max Content Reel"
                  playLabel="Play The Great Reviewer Reel"
                  source="short_form_hero_play"
                />
              </div>
              <div className="grid gap-3 bg-[#101214] px-5 py-5 text-white sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#f6bda9]">Recent published work</p>
                  <h2 className="mt-1 font-serif text-2xl leading-tight">Watch the edit before you read about it.</h2>
                </div>
                <Link href="/portfolio/great-reviewer-iphone-18" className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-[#101214] hover:bg-[#f6bda9]">
                  Open project
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <DefinitionAnswer path="/services/short-form-video-editor-miami" collapsible />
      <section className="border-b border-[#ddd4c8] py-10" aria-labelledby="published-short-form-work">
        <Container size="xl">
          <div className="mx-auto max-w-4xl rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
            <p className="text-xs font-medium uppercase text-[#5a6066]">Published work you can inspect</p>
            <h2 id="published-short-form-work" className="mt-3 font-serif text-3xl">Look at the work before you ask for a quote.</h2>
            <p className="mt-4 text-sm leading-6 text-[#252a2d]">
              These public sources show finished short-form work. They show the edit itself, not views, sales, campaign results, or a promise that a new project will perform the same way.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/case-studies/gains-from-geebs-shorts" className="inline-flex min-h-11 items-center rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]">View published short-form videos</Link>
              <Link href="/case-studies/juanchis-burguer" className="inline-flex min-h-11 items-center rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]">View a Miami restaurant campaign</Link>
            </div>
          </div>
        </Container>
      </section>
      <section className="border-b border-[#ddd4c8] bg-[#101214] py-10 text-white" aria-labelledby="short-form-work-shelf">
        <Container size="xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#f6bda9]">More recent work</p>
              <h2 id="short-form-work-shelf" className="mt-2 font-serif text-3xl sm:text-4xl">See the work, not another promise.</h2>
            </div>
            <Link href="/portfolio" className="inline-flex min-h-11 items-center rounded-full border border-white/35 px-5 text-sm font-semibold hover:bg-white hover:text-[#101214]">Open all work</Link>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {[
              ["/portfolio/great-reviewer-iphone-18", "/portfolio/great-reviewer-iphone-18.jpg", "The Great Reviewer", "Watch the published Reel"],
              ["/portfolio/caro-sells-miami", "/portfolio/caro-sells-miami-current-ui.png", "Caro Sells Miami", "See the current property experience"],
              ["/portfolio/dupont-realty-international", "/portfolio/dupont-realty-international-current-ui.png", "DuPont International Realty", "See the current real-estate experience"],
            ].map(([href, image, title, action]) => (
              <Link key={href} href={href} className="group overflow-hidden rounded-2xl border border-white/15 bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={image} alt={`Recent Esteban Moreno Media work: ${title}`} fill sizes="(min-width: 768px) 32vw, 100vw" className="object-cover transition duration-300 group-hover:scale-[1.03]" />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-2xl">{title}</h3>
                  <p className="mt-2 text-sm text-white/75">{action}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <details className="group border-b border-[#ddd4c8] bg-[#f6f1ea]" data-section="short-form-reviews">
        <summary className="mx-auto flex max-w-7xl cursor-pointer list-none items-center justify-between gap-4 px-6 py-6 text-lg font-semibold text-[#101214] sm:px-8">
          See verified Google reviews
          <ChevronDown className="size-5 text-[#9f3c27] transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <ClientReviews locale="en" compact />
      </details>
      <section className="border-b border-[#ddd4c8] bg-[#fbf6ef] py-6" data-section="service-venues">
        <Container size="xl">
          <p className="mx-auto max-w-4xl text-sm leading-6 text-[#252a2d]">
            <span className="font-semibold text-[#101214]">Where Esteban has filmed or edited for:</span>{" "}
            Healthy Smile Miami in Miami (on-location dental clinic video), The Great Reviewer (published content Reel), and Caro Sells Miami in Miami / Broward (bilingual real estate web discovery).
          </p>
        </Container>
      </section>

      <section className="border-b border-[#ddd4c8] py-8" data-section="service-pricing">
        <Container size="xl">
          <div className="mx-auto max-w-4xl">
            <details className="group rounded-2xl border border-[#ddd4c8] bg-[#fbf6ef] p-5 sm:p-7">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span>
                  <span className="block font-serif text-2xl sm:text-3xl">See starting prices</span>
                  <span className="mt-1 block text-sm leading-6 text-[#252a2d]">Open only if price is the next thing you need.</span>
                </span>
                <ChevronDown className="size-5 shrink-0 text-[#9f3c27] transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <div className="mt-6">
                <PriceSheet locale="en" showPlans={false} section="short_form_service_page" />
              </div>
            </details>
          </div>
        </Container>
      </section>

      <ShortFormAnswerFirst />

      <section className="pb-12 sm:pb-16">
        <Container size="xl">
          <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-medium uppercase text-[#5a6066]">
                  Get Started
                </p>
                <h2 className="mt-3 font-serif text-4xl">
                  Scale your short-form content output.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Send raw video files to start short-form editing packages. Call, text or WhatsApp{" "}
                  <strong>{site.phone.display}</strong>, or email <strong>{site.email}</strong>.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
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
                <a
                  href={shortFormWhatsappHref("en")}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="short_form_video_whatsapp"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <details className="group border-b border-[#ddd4c8] bg-[#fbf6ef]" data-section="short-form-craft-fold">
        <summary className="mx-auto flex max-w-7xl cursor-pointer list-none items-center justify-between gap-4 px-6 py-6 text-lg font-semibold text-[#101214] sm:px-8">
          What makes a short-form edit work?
          <ChevronDown className="size-5 text-[#9f3c27] transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <ServiceCraft
          heading={SHORT_FORM_DEPTH.craftHeading}
          cards={SHORT_FORM_DEPTH.craft}
          sectionId="short-form-craft"
        />
      </details>
      <ServiceDeepDive
        id={SHORT_FORM_DEEP_DIVE_EN.id}
        title={SHORT_FORM_DEEP_DIVE_EN.title}
        destinations={SHORT_FORM_DEEP_DIVE_EN.destinations}
        sections={SHORT_FORM_DEEP_DIVE_EN.sections}
      />
      <ServiceFaqs heading={SHORT_FORM_DEPTH.faqHeading} faqs={SHORT_FORM_DEPTH.faqs} collapsible />
      <ServiceInquiryRail
        service={{
          serviceId: "short_form_video",
          serviceName: "short-form video editing",
          goalPrompt: "turn supplied footage into Reels, TikTok, or Shorts",
          assetPrompt: "raw clips, references, brand notes, and the platforms where the videos will run",
          proofHref: "/portfolio/great-reviewer-iphone-18",
          proofLabel: "Watch recent published short-form work",
        }}
      />
      <ServiceRelated heading={SHORT_FORM_DEPTH.relatedHeading} services={SHORT_FORM_DEPTH.related} />
      <PriorityLinks path="/services/short-form-video-editor-miami" locale="en" />
      <Container size="xl">
        <PageUpdated path="/services/short-form-video-editor-miami" locale="en" className="pb-10 text-xs text-[#5a6066]" />
      </Container>
      <ShortFormStickyCta />
    </main>
  );
}

function ShortFormAnswerFirst() {
  return (
    <section className="border-b border-[#ddd4c8] bg-[#fbf6ef] py-10 sm:py-14" aria-labelledby="short-form-how-it-works" data-section="answer-first">
      <Container size="xl">
        <div className="mx-auto max-w-4xl rounded-2xl border border-[#ddd4c8] bg-[#f6f1ea] p-6 sm:p-9">
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#9f3c27]">How it works</p>
          <h2 id="short-form-how-it-works" className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">Send the clips. Get a clear edit plan.</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[#252a2d]">Start with the footage you already have and the one thing the Reel needs to say.</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3" aria-label="Short-form editing steps">
            {[
              ["1. Send originals", "Upload the strongest clips, not downloads from social media."],
              ["2. Name the goal", "Tell Esteban where it will run and what viewers should understand."],
              ["3. Get a scoped quote", "Receive the useful next step before anyone assumes filming or a package."],
            ].map(([title, detail]) => (
              <li key={title} className="rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-4 text-sm leading-6 text-[#252a2d]">
                <CheckCircle2 className="mb-3 size-5 text-[#e85d3e]" aria-hidden="true" />
                <strong className="block text-base text-[#101214]">{title}</strong>
                <span className="mt-1 block">{detail}</span>
              </li>
            ))}
          </ul>
          <details className="group mt-6 border-t border-[#ddd4c8] pt-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-[#101214]">
              What happens after I send the clips?
              <ChevronDown className="size-5 transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[#252a2d]">
              Esteban Moreno Media is a Fort Lauderdale-based service-area business run by Esteban Moreno, working with businesses across Broward and Miami-Dade. Projects can start remotely: you share footage, photos or references online and Esteban edits them, with no visit needed. On-location filming is available as a paid service, scoped and quoted per project. Communication is Spanish-first, with intermediate English available. Remote editing starts from {usd(SHORT_FORM.perVideoFrom)} per video; every project gets a written quote.
            </p>
          </details>
        </div>
      </Container>
    </section>
  );
}

function ShortFormStickyCta() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#ddd4c8] bg-[#f6f1ea]/95 px-3 py-2 backdrop-blur sm:hidden">
      <div className="mx-auto flex max-w-lg items-center justify-between gap-2">
        <Link
          href="/contact"
          data-cta="short_form_sticky_cta"
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-[var(--em-accent-ink)] px-4 text-sm font-semibold text-white"
        >
          Get Reels Edited — From $100/Video
        </Link>
      </div>
    </div>
  );
}
