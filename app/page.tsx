import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MessageSquareText,
  Send,
} from "lucide-react";

import { ReelPreview } from "@/components/reel-preview";
import { Container } from "@/components/ui/container";
import {
  packages,
  processSteps,
  serviceAreas,
  services,
  site,
  trustSignals,
} from "@/lib/site";

export default function Home() {
  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20">
        <Container size="xl">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Fort Lauderdale / Broward / Miami-Dade
              </p>
              <h1 className="mt-5 max-w-[11ch] font-serif text-5xl leading-none sm:text-6xl lg:text-7xl">
                Visual work for South Florida businesses.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Esteban Moreno shoots and edits video, photography, drone, and
                social content for restaurants, properties, events, creators,
                and local brands. Clear scope. Clean delivery. No agency theater.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#e85d3e] px-6 text-sm font-medium text-white hover:bg-[#c84a2c]"
                >
                  Start a project
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  View services
                </Link>
              </div>

              <dl className="mt-8 grid gap-3 sm:grid-cols-2">
                {trustSignals.map((signal) => {
                  const Icon = signal.icon;
                  return (
                    <div
                      key={signal.label}
                      className="flex items-center gap-3 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-3"
                    >
                      <Icon className="size-5 text-[#e85d3e]" aria-hidden="true" />
                      <div>
                        <dt className="text-xs uppercase text-[#5a6066]">
                          {signal.label}
                        </dt>
                        <dd className="font-serif text-xl">{signal.value}</dd>
                      </div>
                    </div>
                  );
                })}
              </dl>
            </div>

            <ReelPreview
              title="Local launch reel"
              location="Las Olas"
              label="Real media swaps in here"
            />
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container size="xl">
          <SectionIntro
            eyebrow="What Esteban does"
            title="A short service menu, built around what actually ships."
            lead="Choose the closest fit, then send the details that matter: location, date, deadline, and where the final assets need to live."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  id={service.id}
                  key={service.id}
                  className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5"
                >
                  <Icon className="size-6 text-[#e85d3e]" aria-hidden="true" />
                  <h2 className="mt-5 font-serif text-2xl leading-tight">
                    {service.name}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                    {service.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#ddd4c8] px-3 py-1 text-xs uppercase text-[#5a6066]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-y border-[#ddd4c8] bg-[#ece5da] py-12 sm:py-16">
        <Container size="xl">
          <SectionIntro
            eyebrow="Starting points"
            title="Plain pricing anchors before the quote."
            lead="These are directionally useful starting points, not fixed promises. Final scope depends on shoot length, location, usage, and edit complexity."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {packages.map((item) => (
              <article
                key={item.name}
                className="flex flex-col rounded-lg border border-[#d0c7bb] bg-[#f6f1ea] p-6"
              >
                <p className="text-xs font-medium uppercase text-[#5a6066]">
                  {item.name}
                </p>
                <p className="mt-3 font-serif text-4xl">{item.price}</p>
                <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                  {item.description}
                </p>
                <ul className="mt-6 space-y-3 text-sm text-[#252a2d]">
                  {item.items.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0 text-[#1a9fa3]"
                        aria-hidden="true"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container size="xl">
          <SectionIntro
            eyebrow="Process"
            title="Four steps, visible from the start."
            lead="The flow is intentionally predictable: brief, shoot or receive, first cut, deliver. That keeps the project calm for busy owners and clients who hate vague creative processes."
          />
          <ol className="mt-8 grid overflow-hidden rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] md:grid-cols-4">
            {processSteps.map((step, index) => (
              <li
                key={step.name}
                className="border-b border-[#ddd4c8] p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
              >
                <span className="text-xs font-medium uppercase text-[#e85d3e]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-4 font-serif text-2xl">{step.name}</h2>
                <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-y border-[#ddd4c8] bg-[#fbf6ef] py-12 sm:py-16">
        <Container size="xl">
          <SectionIntro
            eyebrow="Where Esteban works"
            title="Fort Lauderdale first, Broward and Miami-Dade close behind."
            lead="Local pages and copy should anchor the business in real places, not generic 'South Florida' filler."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {serviceAreas.map((area) => (
              <article
                key={area.name}
                className="rounded-lg border border-[#ddd4c8] bg-[#f6f1ea] p-6"
              >
                <p className="text-xs uppercase text-[#5a6066]">{area.county}</p>
                <h2 className="mt-3 font-serif text-3xl">{area.name}</h2>
                <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                  {area.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {area.neighborhoods.map((hood) => (
                    <span
                      key={hood}
                      className="rounded-full border border-[#ddd4c8] px-3 py-1 text-xs text-[#5a6066]"
                    >
                      {hood}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container size="xl">
          <div className="grid gap-8 rounded-lg bg-[#101214] p-6 text-[#f6f1ea] sm:p-8 lg:grid-cols-[1fr_.85fr] lg:p-10">
            <div>
              <p className="text-xs font-medium uppercase text-[#c9c1b8]">
                Proof
              </p>
              <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
                Real work only. Placeholders stay labeled until the media is in.
              </h2>
              <p className="mt-5 max-w-2xl leading-7 text-[#d8d0c7]">
                Recent reels and client examples will be added from Esteban&apos;s
                real uploads. Until then, the site stays clear about what is a
                sample slot and what is finished work.
              </p>
            </div>
            <div className="grid content-start gap-3">
              {[
                "No fake testimonials",
                "No borrowed client logos",
                "No guaranteed views or rankings",
                "Real Instagram links when available",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4"
                >
                  <CheckCircle2
                    className="size-5 shrink-0 text-[#6fe3a8]"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-[#ddd4c8] py-12 sm:py-16">
        <Container size="xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_.8fr]">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Next step
              </p>
              <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
                Send the date, location, and what success looks like.
              </h2>
              <p className="mt-5 max-w-2xl leading-7 text-[#252a2d]">
                A few lines is enough. Esteban can reply with a quote, a short
                question, or a calendar link depending on what moves the project
                forward.
              </p>
            </div>
            <div className="grid gap-3">
              <a
                href={`mailto:${site.email}`}
                className="flex min-h-16 items-center justify-between gap-4 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-4 hover:border-[#e85d3e]"
              >
                <span className="flex items-center gap-3">
                  <Mail className="size-5 text-[#e85d3e]" aria-hidden="true" />
                  Email {site.email}
                </span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <a
                href={site.instagram}
                className="flex min-h-16 items-center justify-between gap-4 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-4 hover:border-[#e85d3e]"
              >
                <span className="flex items-center gap-3">
                  <Send
                    className="size-5 text-[#e85d3e]"
                    aria-hidden="true"
                  />
                  Instagram @steeban1
                </span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <Link
                href="/contact"
                className="flex min-h-16 items-center justify-between gap-4 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-4 hover:border-[#e85d3e]"
              >
                <span className="flex items-center gap-3">
                  <MessageSquareText
                    className="size-5 text-[#e85d3e]"
                    aria-hidden="true"
                  />
                  See the contact brief
                </span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

function SectionIntro({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-[.8fr_1.2fr] md:items-end">
      <div>
        <p className="text-xs font-medium uppercase text-[#5a6066]">{eyebrow}</p>
        <h2 className="mt-3 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
          {title}
        </h2>
      </div>
      <p className="max-w-2xl text-base leading-7 text-[#252a2d] md:justify-self-end">
        {lead}
      </p>
    </div>
  );
}
