import { PackageDetail, packageMetadata } from "@/components/package-detail";

export const metadata = packageMetadata("arranque", "es");

export default function Page() {
  return <PackageDetail id="arranque" locale="es" />;
}
