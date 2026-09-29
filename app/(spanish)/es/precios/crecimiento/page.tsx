import { PackageDetail, packageMetadata } from "@/components/package-detail";

export const metadata = packageMetadata("crecimiento", "es");

export default function Page() {
  return <PackageDetail id="crecimiento" locale="es" />;
}
