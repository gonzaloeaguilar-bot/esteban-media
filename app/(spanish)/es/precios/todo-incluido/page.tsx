import { PackageDetail, packageMetadata } from "@/components/package-detail";

export const metadata = packageMetadata("todo-incluido", "es");

export default function Page() {
  return <PackageDetail id="todo-incluido" locale="es" />;
}
