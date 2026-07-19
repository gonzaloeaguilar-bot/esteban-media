import Link from "next/link";
import { ArrowRight, Mail, Phone, Send } from "lucide-react";

import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

export function ContactCta() {
  return (
    <section
      aria-labelledby="contact-heading"
      className="bg-[#101214] py-16 text-[#f6f1ea] sm:py-20"
    >
      <Container size="xl">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:gap-16">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-wide text-[#f0b384]">
              Start a project
            </p>
            <h2
              id="contact-heading"
              className="mt-3 font-serif text-4xl leading-tight sm:text-5xl"
            >
              Send the goal, deadline, and what you already have.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#d8d0c7] sm:text-lg sm:leading-8">
              A few lines is enough to start a conversation about scope,
              availability, timing, and format needs for the individual project.
            </p>
            <div className="mt-7">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#c84a2c] px-6 text-sm font-medium text-white transition hover:bg-[#a93e29] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Start the brief
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <ul role="list" className="grid gap-3">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex min-h-16 items-center justify-between gap-4 rounded-lg border border-white/15 bg-white/5 p-4 transition hover:border-[#e85d3e] hover:bg-white/10"
              >
                <span className="flex items-center gap-3">
                  <Mail
                    className="size-5 text-[#f0b384]"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block text-[0.65rem] uppercase tracking-wide text-[#d8d0c7]">
                      Email
                    </span>
                    <span className="block font-serif text-lg">
                      {site.email}
                    </span>
                  </span>
                </span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href={site.phone.href}
                className="flex min-h-16 items-center justify-between gap-4 rounded-lg border border-white/15 bg-white/5 p-4 transition hover:border-[#e85d3e] hover:bg-white/10"
              >
                <span className="flex items-center gap-3">
                  <Phone
                    className="size-5 text-[#f0b384]"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block text-[0.65rem] uppercase tracking-wide text-[#d8d0c7]">
                      Phone
                    </span>
                    <span className="block font-serif text-lg">
                      {site.phone.display}
                    </span>
                  </span>
                </span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-16 items-center justify-between gap-4 rounded-lg border border-white/15 bg-white/5 p-4 transition hover:border-[#e85d3e] hover:bg-white/10"
              >
                <span className="flex items-center gap-3">
                  <Send
                    className="size-5 text-[#f0b384]"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block text-[0.65rem] uppercase tracking-wide text-[#d8d0c7]">
                      Instagram
                    </span>
                    <span className="block font-serif text-lg">@steeban1</span>
                  </span>
                </span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
