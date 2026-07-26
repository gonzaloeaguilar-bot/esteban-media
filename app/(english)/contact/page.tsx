import { Mail, MessageSquareText, Phone, Send } from "lucide-react";

import { Container } from "@/components/ui/container";
import { VideoBriefBuilder } from "@/components/video-brief-builder";
import { buildPageMetadata } from "@/lib/site-metadata";
import { services, site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Contact Esteban Moreno Media for video editing, AI-assisted content, social planning, and scoped South Florida production.",
  path: "/contact",
  locale: "en",
});

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
                There is no client-facing studio. Inquiries can start by email,
                phone, or Instagram, and local availability is considered for
                each project.
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
    </main>
  );
}
