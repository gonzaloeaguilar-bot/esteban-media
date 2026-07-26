import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ScriptAndOverlayKit } from "@/components/script-and-overlay-kit";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Social Video Ad Script & Safe-Zone Kit",
  description:
    "Free direct-response video ad script frameworks and 9:16 vertical safe zone overlay specifications for Instagram Reels, TikTok & Shorts.",
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
      "Direct-response video ad scripts and 9:16 vertical safe-zone overlay guidelines.",
    isPartOf: { "@id": absoluteUrl("/#website") },
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
              <li>
                <Link href="/" className="hover:text-[#9f3c27]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/guides" className="hover:text-[#9f3c27]">
                  Resources
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">
                Social Video Kit
              </li>
            </ol>
          </nav>

          <ScriptAndOverlayKit locale="en" />
        </Container>
      </section>
    </main>
  );
}
