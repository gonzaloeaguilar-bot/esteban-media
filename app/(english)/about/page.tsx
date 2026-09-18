import Link from "next/link";
import { ArrowRight, PlaySquare, Send, ShieldCheck } from "lucide-react";

import { OnSetMedia } from "@/components/on-set-media";
import { Container } from "@/components/ui/container";
import { buildProfilePageJsonLd } from "@/lib/entity-schema";
import { buildPageMetadata } from "@/lib/site-metadata";
import { site } from "@/lib/site";

const aboutDescription =
  "Meet Esteban Moreno, founder of Esteban Moreno Media in Fort Lauderdale. Spanish-first video editing, AI-assisted content, social planning, and scoped projects.";

export const metadata = buildPageMetadata({
  title: "Esteban Moreno | Founder & Video Editor",
  description: aboutDescription,
  path: "/about",
  locale: "en",
  type: "profile",
});

const principles = [
  "Personal, direct communication in Spanish, with intermediate English available.",
  "Real proof only. No invented logos, testimonials, or view-count promises.",
  "Spanish-first service with intermediate English communication available.",
  "Published portfolio credits stay limited to the work that can be verified.",
];

const profilePageJsonLd = buildProfilePageJsonLd({
  path: "/about",
  name: "About Esteban Moreno",
  description: aboutDescription,
  language: "en-US",
});

export default function AboutPage() {
  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profilePageJsonLd),
        }}
      />
      <section className="py-12 sm:py-16">
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_.85fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                About
              </p>
              <h1 className="mt-4 max-w-3xl font-serif em-display">
                Esteban Moreno: edit-led, business-minded, personal by design.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Esteban Moreno López works publicly as Esteban Moreno, the
                founder behind{" "}
                <Link href="/" className="underline underline-offset-4 hover:text-[#9f3c27]">
                  Esteban Moreno Media
                </Link>{" "}
                in Fort Lauderdale. The published service focuses on video
                editing, AI-assisted creative, social planning, and scoped
                production for remote and selected South Florida projects.
              </p>
              <p className="mt-4 max-w-2xl leading-7 text-[#252a2d]">
                His{" "}
                <Link
                  href="/portfolio"
                  className="underline underline-offset-4 hover:text-[#9f3c27]"
                >
                  public portfolio
                </Link>{" "}
                connects each selected project to its
                available credits and original video source. His Spanish{" "}
                <Link
                  href="/es/guias"
                  className="underline underline-offset-4 hover:text-[#9f3c27]"
                >
                  practical video guides
                </Link>{" "}
                cover project preparation, while his service is Spanish-first,
                with intermediate English communication available for project
                work.
              </p>
              <div className="mt-8 grid gap-3">
                {principles.map((principle) => (
                  <div
                    key={principle}
                    className="flex gap-3 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-4"
                  >
                    <ShieldCheck
                      className="mt-0.5 size-5 shrink-0 text-[#1a9fa3]"
                      aria-hidden="true"
                    />
                    <p className="text-sm leading-6 text-[#252a2d]">
                      {principle}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#c84a2c] px-6 text-sm font-medium text-white hover:bg-[#a93e29]"
                >
                  Start a project
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <a
                  href={site.instagram}
                  rel="me"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  <Send className="size-4" aria-hidden="true" />
                  Instagram
                </a>
                <a
                  href={site.youtube}
                  rel="me"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  <PlaySquare className="size-4" aria-hidden="true" />
                  YouTube
                </a>
              </div>
            </div>
            <OnSetMedia
              primaryAlt="Esteban Moreno shooting with a Canon DSLR in a lit studio setup"
              primaryCaption="Behind the camera · Fort Lauderdale"
              secondaryAlt="Esteban Moreno working with the crew on a video production set"
              secondaryCaption="On set"
            />
          </div>
        </Container>
      </section>
    </main>
  );
}
