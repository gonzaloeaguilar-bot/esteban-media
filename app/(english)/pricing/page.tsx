import { filmingHourlyText } from "@/lib/pricing";
import Link from "next/link";

import { ClosingCredits, PackagesSection } from "@/components/packages-section";
import { PageUpdated } from "@/components/page-updated";
import { PricingAnswer, pricingHubExtraFaq } from "@/components/pricing-answer";
import { Container } from "@/components/ui/container";
import { entityIds } from "@/lib/entity-schema";
import { packagesJsonLd, priceSentence } from "@/lib/packages";
import { pageLastModified } from "@/lib/page-lastmod";
import { absoluteUrl } from "@/lib/site";
import { buildPageMetadata } from "@/lib/site-metadata";

const PATH = "/pricing";

export const metadata = buildPageMetadata({
  title: "Pricing & Packages — Video, Photo and Content",
  description:
    "What working with Esteban Moreno Media costs: four packages with starting prices, services you can book on their own, and how a written quote is put together.",
  path: PATH,
  locale: "en",
});

export default function PricingPage() {
  const url = absoluteUrl(PATH);
  const [catalog, packageFaqLd] = packagesJsonLd("en", url, entityIds.business);
  // The hub's own per-hour (and, in Spanish, Latin America) answers render in
  // PricingAnswer; the same strings join the one FAQPage here.
  const faq = {
    ...packageFaqLd,
    mainEntity: [
      ...packageFaqLd.mainEntity,
      ...pricingHubExtraFaq("en").map((q) => ({
        "@type": "Question",
        name: q.question,
        acceptedAnswer: { "@type": "Answer", text: q.answer },
      })),
    ],
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: "Pricing & Packages",
    description:
      "Starting prices for Esteban Moreno Media packages and individual services, plus the three-step quote process.",
    isPartOf: { "@id": absoluteUrl("/#website") },
    ...(pageLastModified(PATH) ? { dateModified: pageLastModified(PATH) } : {}),
    breadcrumb: { "@id": `${url}#breadcrumbs` },
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumbs`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Pricing", item: url },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([webPage, breadcrumbs, catalog, faq]),
        }}
      />

      <section className="pt-12 pb-2 sm:pt-16">
        <Container size="xl">
          <nav aria-label="Breadcrumbs" className="mb-8 text-sm text-[#5a6066]">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-[#9f3c27]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">
                Pricing
              </li>
            </ol>
          </nav>

          <h1 className="max-w-3xl text-balance font-serif em-display">
            What it costs to work together
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#40474d] sm:text-lg">
            Editing one video starts {priceSentence("en", "arranque").toLowerCase()}, and a production day at
            your business {priceSentence("en", "presencia-local").toLowerCase()}. Filming by the hour is {filmingHourlyText("en")}. Every package below shows a starting price so you know the ballpark
            before you write to me. The final number depends on how much video
            you need, whether I film on location, and how fast you need it — so
            you always get a written quote for your own project.
          </p>
          <PageUpdated path={PATH} locale="en" className="mt-3 text-xs text-[#5a6066]" />
          <p className="mt-3 max-w-2xl text-sm text-[#5a6066]">
            Want a number for your specific project right now? Use the{" "}
            <Link href="/calculator" className="underline hover:text-[#9f3c27]">
              budget calculator
            </Link>
            , see{" "}
            <Link href="/services" className="underline hover:text-[#9f3c27]">
              every service
            </Link>
            , or review the{" "}
            <Link
              href="/services/white-label-video-editing-for-agencies"
              className="underline hover:text-[#9f3c27]"
            >
              white-label editing terms for agencies
            </Link>
            .
          </p>
        </Container>
      </section>

      <PricingAnswer locale="en" />
      <PackagesSection locale="en" />
      <ClosingCredits locale="en" />
    </main>
  );
}
