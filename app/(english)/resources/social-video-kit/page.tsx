import Link from "next/link";

import { ContactCta } from "@/components/contact-cta";
import { Container } from "@/components/ui/container";
import { ScriptAndOverlayKit } from "@/components/script-and-overlay-kit";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl } from "@/lib/site";
import { toolApplicationNode } from "@/lib/tool-schema";

export const metadata = buildPageMetadata({
  title: "Social Video Ad Script & Safe-Zone Kit | Reels, TikTok, Shorts",
  description:
    "Free direct-response video ad script frameworks and 9:16 vertical safe-zone guidance for Instagram Reels, TikTok, and YouTube Shorts. Built for clearer hooks, captions, and CTAs.",
  path: "/resources/social-video-kit",
  locale: "en",
});

export default function SocialVideoKitPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl("/resources/social-video-kit#webpage"),
    url: absoluteUrl("/resources/social-video-kit"),
    name: "Social Video Ad Script & Safe-Zone Kit",
    description:
      "Direct-response video ad scripts and 9:16 vertical safe-zone overlay guidelines for Reels, TikTok, and Shorts.",
    isPartOf: { "@id": absoluteUrl("/#website") },
    mainEntity: toolApplicationNode({
      path: "/resources/social-video-kit",
      name: "Social Video Ad Script & Safe-Zone Kit",
      description:
        "Direct-response video ad scripts and 9:16 vertical safe-zone overlay guidelines.",
      locale: "en",
    }),
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
              <li><Link href="/" className="hover:text-[#9f3c27]">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/guides" className="hover:text-[#9f3c27]">Resources</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">Social Video Kit</li>
            </ol>
          </nav>

          <div className="mb-8 max-w-4xl">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">Free resource</p>
            <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
              Social video ad script &amp; safe-zone kit
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[#3f4548]">
              Plan stronger hooks, keep captions inside safe zones, and structure short-form ads for Instagram Reels, TikTok, and YouTube Shorts. If you want these ideas edited into polished, publish-ready videos, Esteban can handle the edit.
            </p>
          </div>

          <ScriptAndOverlayKit locale="en" />

          <div className="mt-10 max-w-4xl rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 text-sm leading-6 text-[#252a2d]">
            <p>
              Related services:{" "}
              <Link href="/services/short-form-video-editor-miami" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">short-form video editing in Miami</Link>,{" "}
              <Link href="/services/reels-editor-fort-lauderdale" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">Reels editor in Fort Lauderdale</Link>, and{" "}
              <Link href="/services/restaurant-reels-editor-miami" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">restaurant Reels editing</Link>.
            </p>
          </div>
        </Container>
      </section>
      <ContactCta locale="en" />
    </main>
  );
}
