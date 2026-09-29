import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { packageRoutes } from '@/lib/package-routes';
import { PACKAGE_PRICES, usd, type PackageId } from '@/lib/pricing';
import { packagesFor, packagesCopy } from '@/lib/packages';
import { getPairedLanguageRoute } from '@/lib/language-routes';
import sitemap from '@/app/sitemap';
import { languageAlternates } from '@/lib/spanish-site';
import { SiteHeaderClient, englishNav, spanishNav } from '@/components/site-header-client';
vi.mock('next/navigation', () => ({usePathname: () => '/pricing/growth'}));

describe('package details', () => {
  for (const [id, paths] of Object.entries(packageRoutes)) for (const locale of ['en','es'] as const) {
    it(`renders ${paths[locale]} with canonical copy and price`, async () => {
      const prefix = locale === 'en' ? '../../app/(english)' : '../../app/(spanish)';
      const page = await import(`${prefix}${paths[locale]}/page.tsx`);
      expect(page.default).toBeTypeOf('function');
      const html = renderToStaticMarkup(createElement(page.default));
      const pkg = packagesFor(locale).find(p => p.id === id)!;
      expect(html).toContain(pkg.name);
      for (const line of pkg.includes) expect(html).toContain(line);
      const price = PACKAGE_PRICES[id as PackageId];
      if (price.kind === 'from') expect(html).toContain(usd(price.amount));
      else expect(html).toContain(packagesCopy(locale).price.custom);
      expect(getPairedLanguageRoute(paths[locale])).toBe(paths[locale === 'en' ? 'es' : 'en']);
      expect(languageAlternates[paths[locale]]['en-US']).toBe(paths.en);
      expect(sitemap().some(p => p.url.endsWith(paths[locale]))).toBe(true);
    });
  }
  it('keeps a single language control outside navigation with the paired destination', () => {
    const html = renderToStaticMarkup(createElement(SiteHeaderClient, {shortName:'Esteban'}));
    expect(html.match(/data-cta="header_language"/g)).toHaveLength(1);
    expect(html).toContain('href="/es/precios/crecimiento"');
    for (const nav of [englishNav,spanishNav]) expect(nav.some(p => /English|Español/.test(p.label))).toBe(false);
    for (const nav of html.matchAll(/<nav\b[^>]*>([\s\S]*?)<\/nav>/g)) expect(nav[1]).not.toContain('header_language');
  });
});
