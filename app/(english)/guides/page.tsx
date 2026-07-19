import { GuidesIndexPage } from "@/components/guide-pages";
import { buildGuidesIndexMetadata } from "@/lib/guides";

export const metadata = buildGuidesIndexMetadata("en");

export default function EnglishGuidesPage() {
  return <GuidesIndexPage locale="en" />;
}
