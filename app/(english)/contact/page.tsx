import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { VideoBriefBuilder } from "@/components/video-brief-builder";
import { whatsappHref } from "@/lib/packages";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";

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
  const jsonLd = { "@context": "https://schema.org", "@graph": [
    { "@type": "ContactPage", "@id": absoluteUrl("/contact#webpage"), url: absoluteUrl("/contact"), name: "Contact Esteban Moreno Media", description: contactDescription, inLanguage: "en-US" },
    { "@type": "FAQPage", "@id": absoluteUrl("/contact#faq"), inLanguage: "en-US", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
  ] };
  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="py-8 sm:py-14">
        <Container size="xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">Contact</p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight sm:text-6xl">Tell Esteban about your video.</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#3f4548]">Send a short message with what you need, when you need it, and whether you already have footage.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a href={whatsappHref(site.phone.e164, "Hi Esteban, I saw your site and want to discuss a video project.")} target="_blank" rel="noopener noreferrer" data-cta="contact_whatsapp" data-section="contact" className="flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#c84a2c] px-5 text-sm font-medium text-white hover:bg-[#a93e29]"><MessageCircle className="size-5" aria-hidden="true" /> Message on WhatsApp</a>
            <a href={`mailto:${site.email}`} data-cta="contact_email" data-section="contact" className="flex min-h-14 items-center justify-center gap-3 rounded-full border border-[#b9aa9a] px-5 text-sm font-medium text-[#252a2d] hover:border-[#c84a2c]"><Mail className="size-5" aria-hidden="true" /> Email Esteban</a>
          </div>
          <p className="mt-3 text-sm text-[#5a6066]">Or call <a href={site.phone.href} className="underline underline-offset-4">{site.phone.display}</a>.</p>
          <details className="mt-8 border-t border-[#d6ccc0] pt-5">
            <summary className="cursor-pointer font-medium text-[#9f3c27] underline underline-offset-4">Want help writing your message?</summary>
            <div className="mt-5 max-w-2xl space-y-3 text-sm leading-6 text-[#3f4548]">
              <p>Include your project type, location if filming is needed, desired date, and where the finished video will be used. If you already have footage, say what you have.</p>
              <p>Esteban Moreno Media works remotely on editing and considers South Florida filming project by project. There is no public studio.</p>
            </div>
          </details>
          <details className="mt-5 border-t border-[#d6ccc0] pt-5">
            <summary className="cursor-pointer font-medium text-[#9f3c27] underline underline-offset-4">Planning a project? Read these guides</summary>
            <div className="mt-5 max-w-2xl space-y-3 text-sm leading-6 text-[#3f4548]">
              <p>Start with the <Link href="/guides/write-a-useful-video-brief" className="underline">video brief guide</Link> if you need help describing the audience, platform, timing, and finished format. The <Link href="/guides/prepare-footage-for-video-editing" className="underline">footage preparation guide</Link> helps you gather raw clips before editing starts.</p>
              <p>For a remote project, read the <Link href="/guides/remote-video-editing-handoff" className="underline">handoff guide</Link> for organizing files and feedback. You can also explore the <Link href="/calculator" className="underline">project budget calculator</Link> and the <Link href="/areas" className="underline">service areas</Link> before you write.</p>
            </div>
          </details>
          <details className="mt-5 border-t border-[#d6ccc0] pt-5">
            <summary className="cursor-pointer font-medium text-[#9f3c27] underline underline-offset-4">Common questions</summary>
            <div className="mt-5 max-w-3xl space-y-5">
              {faqs.map((item) => (
                <section key={item.question}>
                  <h2 className="font-serif text-xl">{item.question}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#3f4548]">{item.answer}</p>
                </section>
              ))}
            </div>
          </details>
          <details className="mt-5 border-t border-[#d6ccc0] pt-5">
            <summary className="cursor-pointer font-medium text-[#9f3c27] underline underline-offset-4">Build a more detailed video brief</summary>
            <div className="mt-5 max-w-2xl"><VideoBriefBuilder locale="en" /></div>
          </details>
        </Container>
      </section>
    </main>
  );
}
