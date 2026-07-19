import { GuidesIndexPage } from "@/components/guide-pages";
import { buildGuidesIndexMetadata } from "@/lib/guides";

export const metadata = buildGuidesIndexMetadata("es");

export default function SpanishGuidesPage() {
  return <GuidesIndexPage locale="es" />;
}
