import Link from "next/link";

import { Container } from "@/components/ui/container";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_85%,transparent)] backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight"
          aria-label="Esteban Media — home"
        >
          esteban<span className="text-[var(--color-accent)]">.media</span>
        </Link>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-1 sm:gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm text-[var(--color-fg-muted)] transition-colors hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-fg)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
