import type { PackageId } from "@/lib/pricing";
import type { Locale } from "@/lib/packages";

export const packageRoutes: Record<PackageId, Record<Locale, string>> = {
  arranque: { en: "/pricing/starter", es: "/es/precios/arranque" },
  crecimiento: { en: "/pricing/growth", es: "/es/precios/crecimiento" },
  "presencia-local": { en: "/pricing/local-presence", es: "/es/precios/presencia-local" },
  "todo-incluido": { en: "/pricing/all-in", es: "/es/precios/todo-incluido" },
};
