import { PackageDetail, packageMetadata } from "@/components/package-detail";

export const metadata = packageMetadata("presencia-local", "en");

export default function Page() {
  return <PackageDetail id="presencia-local" locale="en" />;
}
