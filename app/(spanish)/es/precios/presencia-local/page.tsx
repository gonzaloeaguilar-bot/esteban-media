import { PackageDetail, packageMetadata } from "@/components/package-detail";

export const metadata = packageMetadata("presencia-local", "es");

export default function Page() {
  return <PackageDetail id="presencia-local" locale="es" />;
}
