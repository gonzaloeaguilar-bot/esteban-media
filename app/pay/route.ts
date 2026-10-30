import { NextResponse } from "next/server";

import { site } from "@/lib/site";

// /pay is the stable payment URL printed on QR codes and invoices. It
// redirects to the live Stripe Payment Link held in lib/site.ts, so the
// Stripe link can be swapped without reprinting anything. 307, never 308:
// the destination is expected to change over time and must not be cached
// as a permanent redirect.
export function GET() {
  return NextResponse.redirect(site.pay, 307);
}
