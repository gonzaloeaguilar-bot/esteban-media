import Link from "next/link";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

type NavLink = {
  href: string;
  label: string;
};

const NAV_LINKS: readonly NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-foreground/10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className,
      )}
    >
      <Container className="flex h-14 items-center justify-between gap-6">
        <Link
          href="/"
          className="text-sm font-semibold tracking-widest uppercase"
          aria-label="Esteban Media — Home"
        >
          Esteban<span className="text-muted-foreground">Media</span>
        </Link>

        <nav aria-label="Primary">
          <ul className="flex items-center gap-5 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
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
