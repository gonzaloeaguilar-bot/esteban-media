import { ReelsCostCalculatorPage } from "@/components/reels-cost-calculator-page";
import { REELS_COST_CALCULATOR_PATHS, reelsCostCalculatorCopy } from "@/lib/reels-cost-calculator";
import { buildPageMetadata } from "@/lib/site-metadata";

const copy = reelsCostCalculatorCopy.en;

export const metadata = buildPageMetadata({
  title: copy.metadataTitle,
  description: copy.metadataDescription,
  path: REELS_COST_CALCULATOR_PATHS.en,
  locale: "en",
});

export default function ReelsEditingCostCalculatorPage() {
  return <ReelsCostCalculatorPage locale="en" />;
}
