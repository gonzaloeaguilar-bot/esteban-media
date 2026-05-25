import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

type ServiceIncludedListProps = {
  items: readonly string[];
  className?: string;
};

/**
 * "What's included" deliverable list for a service detail page. Pure semantic
 * <ul> with a check icon per item — no client JS, no animation.
 */
export function ServiceIncludedList({
  items,
  className,
}: ServiceIncludedListProps) {
  return (
    <ul
      role="list"
      className={cn(
        "grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-6",
        className,
      )}
    >
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 text-sm leading-relaxed text-foreground/85 sm:text-base"
        >
          <span
            aria-hidden="true"
            className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-foreground/10 text-foreground"
          >
            <Check className="size-3" />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
