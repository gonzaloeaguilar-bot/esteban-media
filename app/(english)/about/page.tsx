import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { ReelPreview } from "@/components/reel-preview";
import { Container } from "@/components/ui/container";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = buildPageMetadata({
  title: "About Esteban Moreno",
  description:
    "About Esteban Moreno, a Fort Lauderdale video editor and content partner focused on editing, AI-assisted creative, social planning, and scoped production.",
  path: "/about",
  locale: "en",
});

const principles = [
  "Personal, direct communication from the first questions through final delivery.",
  "Real proof only. No invented logos, testimonials, or view-count promises.",
  "Spanish-first service with practical English communication available.",
  "A typical project includes two review rounds; the exact scope is confirmed up front.",
];

export default function AboutPage() {
  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <section className="py-12 sm:py-16">
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_.85fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                About
              </p>
              <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-none sm:text-6xl">
                Edit-led, business-minded, personal by design.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Esteban studied Audiovisual Communication at Universidad de
                Medellín and has worked across e-commerce, fitness, restaurants,
                sports, real estate, and local business content. Running his own
                online brand for five years taught him to connect every creative
                decision to the business behind it.
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
              <Link
                href="/contact"
                className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#e85d3e] px-6 text-sm font-medium text-white hover:bg-[#c84a2c]"
              >
                Start a project
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <ReelPreview
              title="Behind the camera"
              location="Fort Lauderdale"
              label="Headshot / reel pending"
            />
          </div>
        </Container>
      </section>
    </main>
  );
}
