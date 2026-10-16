import Script from "next/script";

import {
  buildMicrosoftClarityScript,
  getMicrosoftClarityProjectId,
} from "@/lib/microsoft-clarity";
import { site } from "@/lib/site";

/**
 * Opt-in deployment integration for Microsoft Clarity.
 *
 * No project ID is committed to the repository. The component renders nothing
 * until Vercel provides a valid production-only NEXT_PUBLIC_CLARITY_PROJECT_ID
 * at build time; see docs/microsoft-clarity-activation.md.
 */
export function MicrosoftClarity() {
  const projectId = getMicrosoftClarityProjectId(site.microsoftClarityProjectId);

  if (!projectId) {
    return null;
  }

  return (
    <Script id="microsoft-clarity" strategy="lazyOnload">
      {buildMicrosoftClarityScript({
        projectId,
        canonicalHostname: site.domain,
      })}
    </Script>
  );
}
