import { site, siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const card = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${site.founder.fullName}`,
    `ORG:${site.name}`,
    "TITLE:Video editing and production",
    `TEL;TYPE=CELL,VOICE:${site.phone.e164}`,
    `EMAIL;TYPE=WORK:${site.email}`,
    `URL:${siteUrl}`,
    `X-SOCIALPROFILE;TYPE=instagram:${site.instagramBusiness}`,
    "END:VCARD",
  ].join("\r\n");

  return new Response(card, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="esteban-moreno-media.vcf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
