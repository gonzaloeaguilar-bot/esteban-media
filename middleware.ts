import { NextRequest, NextResponse } from "next/server";

const spanishCountries = new Set(["AR", "BO", "CL", "CO", "CR", "CU", "DO", "EC", "SV", "GQ", "GT", "HN", "MX", "NI", "PA", "PY", "PE", "PR", "ES", "UY", "VE"]);
const crawler = /bot|crawler|spider|slurp|ahrefs|semrush|facebookexternalhit|headlesschrome/i;

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname !== "/") return NextResponse.next();
  const preference = request.cookies.get("em_lang")?.value;
  const firstLanguage = (request.headers.get("accept-language") || "").split(",")[0].split(";")[0].trim().toLowerCase();
  const country = (request.headers.get("x-vercel-ip-country") || "").toUpperCase();
  const spanish = preference !== undefined
    ? preference === "es"
    : firstLanguage.startsWith("es") || (!firstLanguage.startsWith("en") && spanishCountries.has(country));
  const response = spanish && !crawler.test(request.headers.get("user-agent") || "")
    ? NextResponse.redirect(new URL("/es" + request.nextUrl.search, request.url), 307)
    : NextResponse.next();
  response.headers.set("Vary", "Accept-Language, Cookie, X-Vercel-IP-Country, User-Agent");
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = { matcher: ["/"] };
