import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

import { Container } from "@/components/ui/container";
import type { NearMeAnswerContent } from "@/lib/near-me-answers";
import { whatsappHref } from "@/lib/packages";
import { site } from "@/lib/site";

/**
 * Answer-first block for a "… near me" buyer phrase on an existing service
 * page (near-me gap fill, 2026-11-26). Server-rendered: the question H2, the
 * answer with prices from lib/pricing.ts and the proof link are in the raw
 * HTML. The WhatsApp link is counted by the site-wide contact_click listener
 * (lead_type + landing_page); the proof link carries a data-cta for cta_click.
 */
export function NearMeAnswer({ content }: { content: NearMeAnswerContent }) {
  const headingId = `${content.sectionId}-heading`;
  return (
    <section
      className="border-b border-[#ddd4c8] bg-[#fbf6ef] py-10 sm:py-12"
      data-section={content.sectionId}
      aria-labelledby={headingId}
    >
      <Container size="lg">
        <h2 id={headingId} className="max-w-3xl font-serif text-3xl leading-tight sm:text-4xl">
          {content.question}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[#252a2d]">{content.answer}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={whatsappHref(site.phone.e164, content.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            data-cta={`${content.ctaPrefix}_whatsapp`}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            Ask on WhatsApp
          </a>
          <Link
            href={content.proof.href}
            data-cta={`${content.ctaPrefix}_proof`}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27] underline decoration-[#e85d3e] underline-offset-4"
          >
            {content.proof.label}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
