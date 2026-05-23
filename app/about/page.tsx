import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { ReelPreview } from "@/components/reel-preview";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "About Esteban Moreno",
  description:
    "About Esteban Moreno, a Fort Lauderdale visual storyteller working across video, photography, drone, and post-production.",
  alternates: {
    canonical: "/about",
  },
};

const principles = [
  "Visual storyteller first. Drone is one tool, not the whole identity.",
  "Real proof only. No invented logos, testimonials, or view-count promises.",
  "Bilingual-friendly for South Florida clients and deliverables.",
  "Scope stays visible so the client knows what happens next.",
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
                Camera-first, edit-led, local by design.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Esteban Moreno is a Fort Lauderdale visual storyteller working
                across video, photography, aerial visuals, and post-production.
                His work is built for local businesses and people who need
                clean capture, clean edits, and a simple path from idea to final
                files.
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
