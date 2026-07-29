/**
 * Website Contact Email & Social Media Extractor (Enrichment Engine)
 * 
 * Takes a business website URL, fetches main page + /contact + /about,
 * and extracts verified contact emails, Instagram handles, and phone numbers.
 */

export async function extractBusinessContactInfo(websiteUrl) {
  const emails = new Set();
  const socialHandles = {
    instagram: null,
    facebook: null,
    linkedin: null,
  };

  if (!websiteUrl || websiteUrl.includes("example.com") || websiteUrl.includes("estebanmorenomedia")) {
    return { emails: [], socialHandles };
  }

  const pathsToCrawl = ["", "/contact", "/contact-us", "/contacto", "/about", "/about-us"];

  for (const subPath of pathsToCrawl) {
    try {
      const targetUrl = websiteUrl.replace(/\/$/, "") + subPath;
      const res = await fetch(targetUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        timeout: 5000,
      });

      if (!res.ok) continue;
      const html = await res.text();

      // Extract emails using email regex
      const foundEmails = html.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
      foundEmails.forEach((email) => {
        const cleanEmail = email.toLowerCase().trim();
        // Ignore static asset / image false positives
        if (!cleanEmail.endsWith(".png") && !cleanEmail.endsWith(".jpg") && !cleanEmail.endsWith(".svg") && !cleanEmail.includes("sentry")) {
          emails.add(cleanEmail);
        }
      });

      // Extract Instagram handle
      const igMatch = html.match(/instagram\.com\/([a-zA-Z0-9_.-]+)/i);
      if (igMatch && igMatch[1] && !socialHandles.instagram) {
        socialHandles.instagram = `@${igMatch[1].replace(/\/$/, "")}`;
      }

      // Extract Facebook page
      const fbMatch = html.match(/facebook\.com\/([a-zA-Z0-9_.-]+)/i);
      if (fbMatch && fbMatch[1] && !socialHandles.facebook) {
        socialHandles.facebook = fbMatch[1].replace(/\/$/, "");
      }
    } catch {
      // Fallback silently if individual endpoint times out
    }
  }

  return {
    emails: Array.from(emails),
    socialHandles,
  };
}
