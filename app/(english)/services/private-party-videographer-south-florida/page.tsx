import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

import { Container } from "@/components/ui/container";
import { PageUpdated } from "@/components/page-updated";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { whatsappHref } from "@/lib/packages";

const path = "/services/private-party-videographer-south-florida";
const faqs = [
  {
    question: "What private celebrations can Esteban help document?",
    answer:
      "Birthday parties, holiday gatherings, date nights, anniversaries, quinceañeras, bachelor or bachelorette celebrations, and other private events can start with the same brief: date, venue, guest count, the moments that matter, and whether you need filming, editing from your own footage, or both. The written quote confirms the actual scope before the date.",
  },
  {
    question: "Is on-location filming included?",
    answer:
      "No. Editing and planning can happen remotely from original files you share. On-location filming is quoted separately for the specific date, location, access, and deliverables. Esteban is based in Fort Lauderdale and covers South Florida from Palm Beach through the Florida Keys; any distant-location transport is included only when it is stated in the project quote.",
  },
  {
    question: "What should I send before asking for a quote?",
    answer:
      "Send the event date, venue or neighborhood, approximate schedule, the moments you want remembered, and links to any references. If you already have footage, share original files rather than reposted social clips. That gives Esteban enough context to separate an edit from a filming request and reply with a written scope.",
  },
] as const;

export const metadata = buildPageMetadata({
  title: "Private Party Videographer South Florida",
  description:
    "Private party videography and event-video editing across South Florida for birthdays, holiday gatherings, quinceañeras, date nights and bachelor celebrations.",
  path,
  locale: "en",
});

export default function PrivatePartyVideographerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": absoluteUrl(`${path}#service`),
        name: "Private party videography and event video editing in South Florida",
        description: String(metadata.description),
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: ["Fort Lauderdale", "Broward County", "Miami-Dade County", "Palm Beach County", "Florida Keys"],
        serviceType: "Private event videography and video editing",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
      },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20">
        <Container size="xl">
          <nav aria-label="Breadcrumbs" className="mb-8 text-sm text-[#5a6066]">
            <Link href="/">Home</Link> / <Link href="/services">Services</Link> / <span aria-current="page">Private celebrations</span>
          </nav>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-start">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#5a6066]">South Florida private celebrations</p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">Video for the party you want to remember.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Birthday parties, holiday gatherings, date nights, anniversaries, quinceañeras, bachelor and bachelorette celebrations: share the date and the moments that matter, then choose editing from your footage, on-location filming, or both in a written quote.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={whatsappHref(site.phone.e164, "Hi Esteban, I am planning a private celebration and want to ask about video.")} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]">
                  <MessageCircle className="size-4" aria-hidden="true" /> Ask about my date
                </a>
                <Link href="#what-to-send" className="inline-flex min-h-12 items-center rounded-full border border-[#101214] px-6 text-sm font-medium">What to send first</Link>
              </div>
              <PageUpdated path={path} locale="en" />
            </div>
            <aside className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#9f3c27]">Published event work</p>
              <h2 className="mt-3 font-serif text-3xl">See the pacing before you book.</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">Diana &amp; Jack is a published wedding film, not a birthday or quinceañera. It shows the event-film pacing and family-storytelling style Esteban can discuss for a private celebration.</p>
              <Link href="/portfolio/diana-jack" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27] underline underline-offset-4">Watch Diana &amp; Jack <ArrowRight className="size-4" aria-hidden="true" /></Link>
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-b border-[#ddd4c8] py-12 sm:py-16" aria-labelledby="celebration-types">
        <Container size="lg">
          <h2 id="celebration-types" className="max-w-3xl font-serif text-3xl sm:text-4xl">What kind of celebration is this?</h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#252a2d]">The format changes with the event, but the planning questions do not. A birthday may need a toast and a surprise entrance; a holiday gathering may need a short recap for the family; a date night or anniversary may need a discreet plan; a quinceañera needs family approval and venue rules; a bachelor or bachelorette event needs the schedule and any venue restrictions. Start with the one moment you cannot miss.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              ["Birthday, anniversary or date night", "Share the date, location and any surprise, toast or person who must be included."],
              ["Holiday party or family gathering", "Share the schedule, room or outdoor setting, and whether the edit is for family sharing or social posts."],
              ["Quinceañera", "Use the dedicated quinceañera page for family approval, ceremony and schedule details."],
              ["Bachelor or bachelorette celebration", "Share the venue, guest count, planned stops and the content that is appropriate to share."],
            ].map(([title, detail]) => <div key={title} className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5"><h3 className="font-serif text-2xl">{title}</h3><p className="mt-3 text-sm leading-6 text-[#252a2d]">{detail}</p></div>)}
          </div>
          <p className="mt-6 text-sm leading-6 text-[#252a2d]">Planning a quinceañera? <Link className="underline underline-offset-4" href="/services/quinceanera-videographer-miami">See the quinceañera videographer guide</Link>. Planning a yacht celebration? <Link className="underline underline-offset-4" href="/services/yacht-party-videographer-miami">See the yacht-party guide</Link>.</p>
        </Container>
      </section>

      <section id="what-to-send" className="border-b border-[#ddd4c8] py-12 sm:py-16" aria-labelledby="what-to-send-heading">
        <Container size="lg">
          <h2 id="what-to-send-heading" className="max-w-3xl font-serif text-3xl sm:text-4xl">What to send with the first message.</h2>
          <ul className="mt-6 max-w-3xl space-y-3 text-base leading-7 text-[#252a2d]">
            <li>Date, venue or neighborhood, and the approximate start/end time.</li>
            <li>The event type and the one or two moments that cannot be missed.</li>
            <li>Whether you need on-location filming, editing from existing footage, or both.</li>
            <li>Any venue access rules, schedule, references and original footage already available.</li>
          </ul>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[#252a2d]">Esteban is based in Fort Lauderdale and serves South Florida through the Florida Keys. A distant-location transportation cost is included only when it is listed in your project quote.</p>
        </Container>
      </section>

      <section className="py-12 sm:py-16" aria-labelledby="party-faqs">
        <Container size="lg">
          <h2 id="party-faqs" className="font-serif text-3xl sm:text-4xl">Questions before you book.</h2>
          <div className="mt-6 divide-y divide-[#ddd4c8] border-y border-[#ddd4c8]">
            {faqs.map((faq) => <details key={faq.question} className="py-5"><summary className="cursor-pointer font-medium">{faq.question}</summary><p className="mt-3 max-w-3xl text-sm leading-7 text-[#252a2d]">{faq.answer}</p></details>)}
          </div>
        </Container>
      </section>
    </main>
  );
}
