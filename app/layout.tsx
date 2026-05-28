// Root layout. The locale-aware layout lives at app/[locale]/layout.tsx —
// this file only exists so Next has a root HTML shell to attach to in cases
// where a request slips past the locale segment (e.g., the not-found page).
// All real markup is rendered by app/[locale]/layout.tsx.
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
