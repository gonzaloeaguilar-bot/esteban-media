import type { Metadata } from "next";
import { Mail, MessageSquareText, Phone, Send } from "lucide-react";

import { Container } from "@/components/ui/container";
import { languageAlternates } from "@/lib/spanish-site";
import { services, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Esteban Moreno Media for video editing, AI-assisted content, social planning, and scoped South Florida production.",
  alternates: {
    canonical: "/contact",
    languages: languageAlternates["/contact"],
  },
};

export default function ContactPage() {
  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <section className="py-12 sm:py-16">
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_.9fr]">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Contact
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
                Esteban Moreno Media is a remote-first service-area business.
                There is no client-facing studio; consultations happen by phone
                or video call, and local work is quoted by location.
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

            <aside className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
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
                  venue, property, or address if available. A travel fee may
                  apply beyond 20 miles from Fort Lauderdale; required parking
                  is added to the quote.
                </li>
                <li>
                  <strong className="text-[#101214]">Timeline:</strong> shoot or
                  handoff date, launch date, and whether urgent delivery matters.
                </li>
                <li>
                  <strong className="text-[#101214]">Outcome:</strong> where the
                  assets go and what a good result looks like.
                </li>
              </ul>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}
