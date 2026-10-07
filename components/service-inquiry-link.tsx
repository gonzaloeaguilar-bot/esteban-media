"use client";

import type { ComponentProps } from "react";
import { trackServiceInterest } from "@/lib/analytics-events";

/** Contact navigation and service interest share the existing analytics writer. */
export function ServiceInquiryLink({
  serviceId,
  locale,
  ...props
}: ComponentProps<"a"> & { serviceId?: string; locale: "en" | "es" }) {
  return <a {...props} onClick={() => {
    if (serviceId) trackServiceInterest(serviceId, locale);
  }} />;
}
