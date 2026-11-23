"use client";

import { useEffect } from "react";

export function isCaptionGuideBriefRequest(search: string, hash: string): boolean {
  return new URLSearchParams(search).get("source") === "caption-guide" && hash === "#video-brief";
}

/**
 * Opens an existing, server-rendered native disclosure for the one guide route
 * that needs to preserve its discovery source in the contact form. It renders
 * no content and never changes a visitor's manually chosen disclosure state.
 */
export function CaptionGuideBriefDisclosure() {
  useEffect(() => {
    if (!isCaptionGuideBriefRequest(window.location.search, window.location.hash)) return;

    const brief = document.getElementById("video-brief");
    if (brief instanceof HTMLDetailsElement) brief.open = true;
  }, []);

  return null;
}
