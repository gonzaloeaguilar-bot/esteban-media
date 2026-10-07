import type React from "react";
import Link from "next/link";

export function renderFormattedText(text: string) {
  const parts: React.ReactNode[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const label = match[1];
    const href = match[2];
    const isExternal = href.startsWith("http");

    if (isExternal) {
      parts.push(
        <a
          key={`${href}-${match.index}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[#9f3c27] underline decoration-[#e85d3e] underline-offset-4 hover:text-[var(--em-accent-ink)]"
        >
          {label}
        </a>,
      );
    } else {
      parts.push(
        <Link
          key={`${href}-${match.index}`}
          href={href}
          className="font-medium text-[#9f3c27] underline decoration-[#e85d3e] underline-offset-4 hover:text-[var(--em-accent-ink)]"
        >
          {label}
        </Link>,
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

