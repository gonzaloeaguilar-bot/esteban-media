import Link from "next/link";

import { Container } from "@/components/ui/container";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[var(--color-border)] py-10 text-sm text-[var(--color-fg-muted)]">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} Esteban Media. South Florida.
        </p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/services" className="hover:text-[var(--color-fg)]">
                Services
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[var(--color-fg)]">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[var(--color-fg)]">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
