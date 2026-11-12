import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Calculator,
  Mail,
  Phone,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import {
  ServiceCraft,
  ServiceFaqs,
  ServiceInquiryRail,
  ServiceRelated,
  buildServiceFaqSchema,
  buildServicePageNodes,
} from "@/components/service-depth";
import { AI_CHATBOT_LEAD_AUTOMATION_DEPTH } from "@/lib/service-depth-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import {
  CARE_AND_PRODUCTION_PLANS,
  CHATBOT_PRICE,
  usd,
} from "@/lib/pricing";
import { absoluteUrl, site } from "@/lib/site";
import { EventSeasonLinks } from "@/components/event-content-page";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

export const metadata = buildPageMetadata({
  title: "AI Chatbots & Lead Automation Fort Lauderdale",
  description:
    `AI chatbots and lead automation for Fort Lauderdale small businesses: website concierges and Instagram DM bots in English and Spanish. Setup from ${usd(CHATBOT_PRICE.from)}.`,
  path: "/services/ai-chatbots-lead-automation-fort-lauderdale",
  locale: "en",
});

export default function AiChatbotsLeadAutomationFortLauderdalePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...buildServicePageNodes({
        path: "/services/ai-chatbots-lead-automation-fort-lauderdale",
        name: "AI Chatbots & Lead Automation Fort Lauderdale",
        description:
          `AI chatbots and lead automation for Fort Lauderdale small businesses: website concierges and Instagram DM bots in English and Spanish. Setup from ${usd(CHATBOT_PRICE.from)}.`,
        crumb: "Fort Lauderdale AI Chatbots",
      }),
      buildServiceFaqSchema(
        absoluteUrl("/services/ai-chatbots-lead-automation-fort-lauderdale"),
        AI_CHATBOT_LEAD_AUTOMATION_DEPTH.faqs,
      ),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/ai-chatbots-lead-automation-fort-lauderdale#service"),
        name: "AI Chatbots & Lead Automation Fort Lauderdale",
        description:
          "AI chatbots and lead automation for Fort Lauderdale small businesses: website concierges and Instagram DM bots that qualify inquiries in English and Spanish.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Fort Lauderdale / Broward",
        serviceType: "AI chatbot and lead automation",
      },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(withNicheService("/services/ai-chatbots-lead-automation-fort-lauderdale", jsonLd)) }}
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
                Fort Lauderdale AI Chatbots
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Fort Lauderdale / AI &amp; Lead Capture
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                AI Chatbots and Lead Automation in Fort Lauderdale.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Website concierges and Instagram DM bots that answer common questions in English and Spanish, qualify the inquiry, and pass serious buyers to a person. Setup from {usd(CHATBOT_PRICE.from)}, with the AI Chatbot Care plan at {usd(CARE_AND_PRODUCTION_PLANS.aiChatbotCare.amount)} a month.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Start a Chatbot Build
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/portfolio/ai-lead-automation"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  View Chatbot Proof
                </Link>
                <Link
                  href="/calculator"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  Calculate Project Budget
                </Link>
              </div>
              <p className="mt-6 text-sm text-[#5a6066]">
                ¿Prefieres español? Lee la versión en español:{" "}
                <Link href="/es/chatbot-con-ia-para-negocios" className="underline decoration-[#e85d3e] underline-offset-4 hover:text-[#9f3c27]">
                  chatbot con IA para negocios
                </Link>
                .
              </p>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Bot className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">Four published bots</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Four chatbots are already live in the{" "}
                <Link
                  href="/portfolio"
                  className="underline underline-offset-4 hover:text-[#9f3c27]"
                >
                  portfolio
                </Link>
                : the FLAS website concierge, the Front Line Auto service concierge, the Geebs Instagram DM bot, and the TitanForge DM bot.
              </p>
              <div className="mt-5 border-t border-[#ddd4c8] pt-4">
                <Link
                  href="/portfolio/ai-lead-automation"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#9f3c27] hover:text-[var(--em-accent-ink)]"
                >
                  Review Published Chatbot Work
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/*
        Citable depth for the AI hub. The three craft cards below name the
        criteria; these three sections carry the argument at citable weight
        (100-180 words each) without restating the FAQ answers, which already
        cover pricing, published builds, bilingual answers, and WhatsApp.
      */}
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20" data-section="ai-chatbot-depth">
        <Container size="xl">
          <div className="mx-auto max-w-4xl space-y-10">
            <div className="border-b border-[#ddd4c8] pb-6">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
                Scope and technical criteria
              </p>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                How a lead bot earns the handoff
              </h2>
            </div>

            <article className="space-y-4">
              <h3 className="font-serif text-2xl sm:text-3xl">What should a bot answer, and what should it never say?</h3>
              <p className="text-base leading-8 text-[#252a2d]">
                A bot earns trust by answering only from what the business has approved: published
                services, prices, hours, and qualification rules. It never promises a vehicle
                hold, a financing rate, an appointment slot, or a term the business has not
                approved, and it never invents a price or a policy to fill a gap in the
                conversation. When a prospect asks an edge-case question, or when they meet the
                buying criteria, the bot captures their contact details and hands the conversation
                to a person who can answer it. That boundary is what separates a lead tool from a
                liability.
              </p>
            </article>

            <article className="space-y-4">
              <h3 className="font-serif text-2xl sm:text-3xl">Why does qualification come before contact details?</h3>
              <p className="text-base leading-8 text-[#252a2d]">
                The useful questions come first: what the person needs, which product or service
                they mean, and when they want it. Only then does the bot ask for a name and a way
                to reach them, so a serious inquiry arrives with the context a person needs to
                answer it. A form that asks for contact details before it understands the request
                sends the team inquiries they cannot act on, and a customer who has already given
                their phone number before being understood has little reason to stay engaged. Order
                the questions the way a good salesperson would, and the handoff carries its own
                summary.
              </p>
            </article>

            <article className="space-y-4">
              <h3 className="font-serif text-2xl sm:text-3xl">How does a bot sound like the business in two languages?</h3>
              <p className="text-base leading-8 text-[#252a2d]">
                Customers in Broward and Miami-Dade write in English one day and Spanish the
                next, so the bot answers in the language the customer writes in, and both versions
                of every answer are reviewed together. The Spanish version is written for the
                customer, not translated word for word, and the English version is written for
                conversion, not for formality. That joint review is where a bot stops sounding
                like a form and starts sounding like the business itself, and it is also where a
                mistranslated price, a wrong service name, or a promise the business cannot keep
                gets caught before a customer ever sees it.
              </p>
            </article>
          </div>
        </Container>
      </section>

      <ServiceCraft
        heading={AI_CHATBOT_LEAD_AUTOMATION_DEPTH.craftHeading}
        cards={AI_CHATBOT_LEAD_AUTOMATION_DEPTH.craft}
        sectionId="ai-chatbot-craft"
      />
      <ServiceFaqs
        heading={AI_CHATBOT_LEAD_AUTOMATION_DEPTH.faqHeading}
        faqs={AI_CHATBOT_LEAD_AUTOMATION_DEPTH.faqs}
      />
      <ServiceInquiryRail
        service={{
          serviceId: "ai_chatbot_lead_automation",
          serviceName: "AI chatbot lead automation",
          goalPrompt: "answer common customer questions and pass serious inquiries to a person",
          assetPrompt: "the channels you already use, your published services and prices, and where finished inquiries should go",
          proofHref: "/portfolio/ai-lead-automation",
          proofLabel: "Review published chatbot work",
        }}
      />
      <ServiceRelated
        heading={AI_CHATBOT_LEAD_AUTOMATION_DEPTH.relatedHeading}
        services={AI_CHATBOT_LEAD_AUTOMATION_DEPTH.related}
      />

      <section className="pb-12 sm:pb-16 pt-12">
        <Container size="xl">
          <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-medium uppercase text-[#5a6066]">
                  Get Started
                </p>
                <h2 className="mt-3 font-serif text-4xl">
                  Want a bot that answers after hours and hands you the serious inquiries?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Share the channels you already use and what a good inquiry looks like for a written quote.
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
      <EventSeasonLinks locale="en" path="/services/ai-chatbots-lead-automation-fort-lauderdale" />
      <NicheAnswers path="/services/ai-chatbots-lead-automation-fort-lauderdale" fact={String(metadata.description ?? "")} />
    </main>
  );
}
