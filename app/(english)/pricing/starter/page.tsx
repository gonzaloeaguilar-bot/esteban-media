import { PackageDetail, packageMetadata } from "@/components/package-detail";

export const metadata = packageMetadata("arranque", "en");

export default function Page() {
  return <PackageDetail id="arranque" locale="en" />;
}
