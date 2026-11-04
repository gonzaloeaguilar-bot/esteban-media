import { PACKAGE_PRICES, SHORT_FORM, usd } from "@/lib/pricing";

export function ReelsCapCutComparison() {
  const starterPrice = usd(PACKAGE_PRICES.arranque.kind === "from" ? PACKAGE_PRICES.arranque.amount : SHORT_FORM.perVideoFrom);

  return (
    <section
      id="human-vs-capcut"
      data-section="human_vs_capcut"
      className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20"
      aria-labelledby="capcut-comparison-heading"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#ddd4c8] pb-6">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
            Tool vs Editor Comparison
          </p>
          <h2
            id="capcut-comparison-heading"
            className="mt-3 font-serif text-3xl sm:text-4xl text-[#101214]"
          >
            Should you hire a Reels editor or use CapCut?
          </h2>
          <p className="mt-4 text-base leading-7 text-[#252a2d]">
            Editing mobile video with automated software, offshore marketplace listings, or a dedicated local editor involves different investments of your time, quality controls, and language precision. Compare the three approaches below:
          </p>
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-left text-sm text-[#252a2d] border-collapse">
            <caption className="sr-only">
              Comparison between CapCut/Descript apps, freelancer marketplaces, and Esteban Moreno Media
            </caption>
            <thead>
              <tr className="border-b border-[#ddd4c8] bg-[#fbf6ef] text-[#101214]">
                <th scope="col" className="p-3 font-semibold">Option</th>
                <th scope="col" className="p-3 font-semibold">Cost per reel</th>
                <th scope="col" className="p-3 font-semibold">Turnaround</th>
                <th scope="col" className="p-3 font-semibold">Who writes captions in Spanish</th>
                <th scope="col" className="p-3 font-semibold">Revisions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ddd4c8]">
              <tr>
                <th scope="row" className="p-3 font-medium text-[#101214]">CapCut / Descript app</th>
                <td className="p-3">$15–$35/month software subscription</td>
                <td className="p-3">Self-paced (you edit, trim, and format yourself)</td>
                <td className="p-3">Automated speech-to-text; you review and correct spelling, slang, and line breaks manually</td>
                <td className="p-3">Unlimited self-edits, but requires your own time and manual adjustment</td>
              </tr>
              <tr>
                <th scope="row" className="p-3 font-medium text-[#101214]">Freelancer marketplace</th>
                <td className="p-3">$25–$150 per video (plus 5.5% platform fee)</td>
                <td className="p-3">3–7 business days depending on queue and timezone</td>
                <td className="p-3">Varies; offshore editors often use machine translation or non-regional phrasing</td>
                <td className="p-3">Strict 1–2 revision rounds; additional changes incur extra gig fees</td>
              </tr>
              <tr className="bg-[#fbf6ef]/60">
                <th scope="row" className="p-3 font-semibold text-[#9f3c27]">
                  Esteban Moreno Media
                </th>
                <td className="p-3 font-semibold text-[#101214]">
                  From {starterPrice} per video (Starter package)
                </td>
                <td className="p-3">48–72 hours typical turnaround on supplied footage</td>
                <td className="p-3">
                  Esteban writes and formats Spanish-first captions natively inside safe zones, with English available
                </td>
                <td className="p-3">Written revision rounds included with direct WhatsApp or email communication</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
