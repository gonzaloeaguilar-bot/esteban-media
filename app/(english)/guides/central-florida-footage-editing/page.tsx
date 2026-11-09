import Link from "next/link";

import { Container } from "@/components/ui/container";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Remote Video Editing for Central Florida Footage",
  description:
    "A practical way for Central Florida teams to turn footage they already recorded into interview cuts, captions, and publish-ready social video.",
  path: "/guides/central-florida-footage-editing",
  locale: "en",
});

const experiments = [
  {
    city: "Orlando",
    title: "Executive interview footage",
    body: "If an executive interview has already been recorded, the next problem is usually editorial rather than another shoot: select the clear answers, clean the dialogue, add readable captions, and make a full version plus shorter cuts for the places the team actually publishes. Send the original footage, the intended audience, any approved wording, and the deadline. On-location filming is not assumed by this page; it is quoted separately only when Esteban confirms the scope.",
    source: "orlando-executive-footage",
  },
  {
    city: "Winter Park",
    title: "Studio or agency edit overflow",
    body: "A studio or agency can keep the camera work and creative direction while sending an edit queue that has become too large or too late. A useful handoff names the project owner, the required deliverables, the source folder, brand files, reference cuts, and who consolidates feedback. That keeps post-production separate from the production team and makes the work possible from supplied footage rather than dependent on local availability.",
    source: "winter-park-overflow-edit",
  },
  {
    city: "Lake Nona",
    title: "Approved expert and interview footage",
    body: "Teams with expert, research, or professional-service footage can ask for a clear interview cut and shorter social versions after they have handled their own permissions and approvals. Provide the final approved files, the names and titles that may appear on screen, the required review process, and the platforms where the videos will run. This is an editorial service from client-supplied material; it does not imply medical, legal, or institutional production credentials.",
    source: "lake-nona-expert-footage",
  },
  {
    city: "Kissimmee",
    title: "Spanish-first event and organizer footage",
    body: "When an organizer already has phone or camera clips, the edit can turn that material into a short recap, announcement, or social sequence. Decide first which language each audience needs, whether captions should be Spanish, English, or both, and what message has been approved. Esteban works Spanish-first, with intermediate English for bilingual project communication; a bilingual result is scoped from the actual footage and review needs rather than promised as a generic template.",
    source: "kissimmee-bilingual-event-edit",
  },
  {
    city: "Sanford",
    title: "Service-business testimonials",
    body: "A testimonial or owner interview becomes useful when the viewer can quickly understand who is speaking, what was done, and what to do next. Supply the original clips, written approval to use the speaker and business name, any claims that must remain exact, and the destination for the finished video. From there, the edit can be scoped as a long testimonial, short vertical cuts, or both. Results are never assumed from the edit alone.",
    source: "sanford-testimonial-edit",
  },
] as const;

export default function CentralFloridaFootageEditingGuide() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": absoluteUrl("/guides/central-florida-footage-editing#howto"),
    name: "Prepare supplied footage for remote video editing",
    description: "A source-footage and approval checklist for a remote video edit.",
    step: [
      { "@type": "HowToStep", name: "Gather original footage and brand files" },
      { "@type": "HowToStep", name: "Name the platform, audience, deadline, and approvals" },
      { "@type": "HowToStep", name: "Request a written editing scope" },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20">
        <Container size="xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">Supplied-footage editing</p>
          <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-6xl">Turn footage you already have into video your team can publish.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#3f4548]">For Central Florida teams, remote editing does not require a local shoot: send the approved footage, the audience, the deadline, and the formats you need. Esteban scopes the edit in writing before work begins.</p>
          <Link href="/contact?source=orlando-executive-footage" data-cta="central_florida_hub_brief" data-section="central_florida_hub" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]">Build an editing brief</Link>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container size="xl">
          <div className="max-w-3xl">
            <h2 className="font-serif text-3xl sm:text-4xl">What to send before asking for an edit</h2>
            <p className="mt-4 text-base leading-7 text-[#3f4548]">Use original phone or camera files where possible. Include the cloud-folder link, final approved names and claims, logos or visual references, the preferred language for captions, and where the finished cut will appear. State who gives consolidated feedback. Those details make a remote scope accurate and protect the people appearing in the footage.</p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {experiments.map((experiment) => (
              <article key={experiment.source} className="rounded-2xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">{experiment.city}</p>
                <h2 className="mt-2 font-serif text-3xl">{experiment.title}</h2>
                <p className="mt-4 text-sm leading-7 text-[#3f4548]">{experiment.body}</p>
                <Link href={`/contact?source=${experiment.source}`} data-cta={`central_florida_${experiment.source}`} data-section="central_florida_hub" className="mt-5 inline-flex min-h-11 items-center text-sm font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f21]">Share this footage and brief</Link>
              </article>
            ))}
          </div>

          <details className="mt-10 max-w-3xl border-t border-[#d6ccc0] pt-5">
            <summary className="cursor-pointer font-medium text-[#9f3c27] underline underline-offset-4">Do you need Esteban to film on location?</summary>
            <p className="mt-4 text-sm leading-7 text-[#3f4548]">This guide is for remote editing from footage you supply. Esteban is based in Fort Lauderdale and evaluates filming requests in Broward and Miami-Dade project by project. Any work outside that scope needs a written availability and production quote before a date is promised.</p>
          </details>
        </Container>
      </section>
    </main>
  );
}
