import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  HelpCircle,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Send,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { VideoBriefBuilder } from "@/components/video-brief-builder";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, services, site } from "@/lib/site";

const contactDescription =
  "Contact Esteban Moreno Media for video editing, AI content creation, social planning, and scoped South Florida production. Send your brief or project details.";

export const metadata = buildPageMetadata({
  title: "Contact Esteban Moreno Media | Video Editing & Production",
  description: contactDescription,
  path: "/contact",
  locale: "en",
});

const faqs = [
  {
    question: "What information should I include in my initial project brief?",
    answer:
      "Share what you need to publish, your target deadline, where the finished video will appear (e.g. Instagram Reels, TikTok, YouTube, or website), and whether you are supplying existing footage or requesting selective on-location filming in South Florida.",
  },
  {
    question: "How does remote video post-production work with client-supplied footage?",
    answer:
      "You upload your recorded raw footage and brand assets to a shared cloud folder (Google Drive, Dropbox, MASV, or Frame.io). Esteban organizes the timeline, applies pacing cuts, color correction, sound balancing, and captions, then shares a review draft for consolidated feedback.",
  },
  {
    question: "In which languages can we communicate during the project?",
    answer:
      "Direct project communication is Spanish-first, with intermediate English communication available for briefs, creative scoping, and revision rounds.",
  },
  {
    question: "Is on-location videography available in Miami, Broward, and Palm Beach?",
    answer:
      "Selective on-location camera capture in Miami-Dade, Broward, or Palm Beach County is evaluated on a project-by-project basis depending on scope, location requirements, and scheduling.",
  },
  {
    question: "How are project quotes and pricing estimates determined?",
    answer:
      "Every project receives an individualized scoped quote based on source footage volume, deliverable formats, turnaround requirements, and narrative complexity. You can also explore starting ranges on our project budget calculator.",
  },
] as const;

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": absoluteUrl("/contact#webpage"),
        url: absoluteUrl("/contact"),
        name: "Contact Esteban Moreno Media",
        description: contactDescription,
        isPartOf: { "@id": absoluteUrl("/#website") },
        inLanguage: "en-US",
      },
      {
        "@type": "FAQPage",
        "@id": absoluteUrl("/contact#faq"),
        inLanguage: "en-US",
        isPartOf: { "@id": absoluteUrl("/#website") },
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="py-12 sm:py-16">
        <Container size="xl">
          <nav aria-label="Breadcrumbs" className="mb-8 text-sm text-[#5a6066]">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-[#9f3c27]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">
                Contact
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.9fr]">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Direct Consultation
              </p>
              <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-none sm:text-6xl">
                Tell Esteban what you need to publish.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Send a short brief with the date, location, service type, and
                where the finished assets will be used. A few specific details
                are better than a long creative deck.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-[#5a6066]">
                <Link
                  href="/"
                  className="underline underline-offset-4 hover:text-[#9f3c27]"
                >
                  Esteban Moreno Media
                </Link>{" "}
                is a remote-first service-area business in Fort Lauderdale. There
                is no client-facing studio. Inquiries can start by email, phone,
                or Instagram, and local availability is considered for each
                project.
              </p>

              <div className="mt-8 grid gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="flex min-h-16 items-center gap-4 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-4 hover:border-[#e85d3e]"
                >
                  <Mail className="size-5 text-[#e85d3e]" aria-hidden="true" />
                  <span>
                    <span className="block text-xs uppercase text-[#5a6066]">
                      Email
                    </span>
                    <span>{site.email}</span>
                  </span>
                </a>
                <a
                  href={site.phone.href}
                  className="flex min-h-16 items-center gap-4 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-4 hover:border-[#e85d3e]"
                >
                  <Phone className="size-5 text-[#e85d3e]" aria-hidden="true" />
                  <span>
                    <span className="block text-xs uppercase text-[#5a6066]">
                      Phone
                    </span>
                    <span>{site.phone.display}</span>
                  </span>
                </a>
                <a
                  href={site.instagram}
                  className="flex min-h-16 items-center gap-4 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-4 hover:border-[#e85d3e]"
                >
                  <Send
                    className="size-5 text-[#e85d3e]"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block text-xs uppercase text-[#5a6066]">
                      Instagram
                    </span>
                    <span>@steeban1</span>
                  </span>
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <VideoBriefBuilder locale="en" />

              <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
                <MessageSquareText
                  className="size-6 text-[#e85d3e]"
                  aria-hidden="true"
                />
                <h2 className="mt-5 font-serif text-3xl">What to include</h2>
                <ul className="mt-6 space-y-4 text-sm leading-6 text-[#252a2d]">
                  <li>
                    <strong className="text-[#101214]">Project type:</strong>{" "}
                    {services.map((service) => service.shortName).join(", ")}.
                  </li>
                  <li>
                    <strong className="text-[#101214]">Location:</strong> city,
                    venue, property, or address if available. For on-location
                    work, share access details that may affect the project scope.
                  </li>
                  <li>
                    <strong className="text-[#101214]">Timeline:</strong> shoot or
                    editing delivery date.
                  </li>
                  <li>
                    <strong className="text-[#101214]">Outcome:</strong> where the
                    assets go and what a good result looks like.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-[#ddd4c8] py-12 sm:py-16">
        <Container size="xl">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-medium uppercase text-[#5a6066]">
              Project Preparation Guidance
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              Prepare your project details before getting in touch.
            </h2>
            <div className="mt-8 space-y-6 text-base leading-8 text-[#252a2d]">
              <p>
                Organizing your project context before starting an edit saves
                time and eliminates round trips. Whether you need short-form
                vertical reels for social feeds or widescreen cuts for your
                website, having clear source files and goals ensures a smooth
                start.
              </p>
              <p>
                Review our practical guides to streamline your submission: learn{" "}
                <Link
                  href="/guides/write-a-useful-video-brief"
                  className="underline underline-offset-4 hover:text-[#9f3c27]"
                >
                  how to write a useful video brief
                </Link>
                , understand{" "}
                <Link
                  href="/guides/prepare-footage-for-video-editing"
                  className="underline underline-offset-4 hover:text-[#9f3c27]"
                >
                  how to prepare footage for editing
                </Link>
                , and follow our recommendations for a{" "}
                <Link
                  href="/guides/remote-video-editing-handoff"
                  className="underline underline-offset-4 hover:text-[#9f3c27]"
                >
                  remote video editing handoff
                </Link>
                .
              </p>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <Link
                href="/calculator"
                className="group rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 transition hover:border-[#e85d3e]"
              >
                <Calculator
                  className="size-6 text-[#e85d3e]"
                  aria-hidden="true"
                />
                <h3 className="mt-4 font-serif text-2xl">
                  Budget Calculator
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#5a6066]">
                  Estimate project cost ranges and scope variables online before
                  submitting your brief.
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-[#9f3c27] group-hover:underline">
                  Calculate Budget
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </span>
              </Link>

              <Link
                href="/areas"
                className="group rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 transition hover:border-[#e85d3e]"
              >
                <MapPin
                  className="size-6 text-[#e85d3e]"
                  aria-hidden="true"
                />
                <h3 className="mt-4 font-serif text-2xl">
                  Service Areas & Coverage
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#5a6066]">
                  Check remote post-production options and selective on-location
                  videography coverage in South Florida.
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-[#9f3c27] group-hover:underline">
                  View Service Areas
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-[#ddd4c8] bg-[#fbf6ef] py-12 sm:py-16">
        <Container size="xl">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1fr]">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Frequently asked questions
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight">
                Common questions before starting a project.
              </h2>
              <p className="mt-4 text-sm leading-6 text-[#5a6066]">
                Review answers about handoff requirements, language options, and
                service scoping.
              </p>
            </div>
            <div className="grid gap-4">
              {faqs.map((faq) => (
                <article
                  key={faq.question}
                  className="rounded-lg border border-[#ddd4c8] bg-[#f6f1ea] p-6"
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle
                      className="mt-1 size-5 shrink-0 text-[#9f3c27]"
                      aria-hidden="true"
                    />
                    <h3 className="font-serif text-2xl leading-tight">
                      {faq.question}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                    {faq.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
