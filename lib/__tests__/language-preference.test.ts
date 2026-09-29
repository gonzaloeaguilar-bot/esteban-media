import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import { middleware } from '@/middleware';

describe('root language preference', () => {
  const run = (headers: Record<string,string>, path = '/') => middleware(new NextRequest(`https://example.com${path}`, {headers}));
  it('temporarily redirects Spanish and varies the response', () => {
    const r = run({'accept-language':'es-CO,es;q=0.9'});
    expect(r.status).toBe(307); expect(r.headers.get('location')).toBe('https://example.com/es');
    expect(r.headers.get('vary')).toContain('Accept-Language');
  });
  it('keeps explicit English ahead of country', () => expect(run({'accept-language':'en-US,es;q=0.9','x-vercel-ip-country':'CO'}).headers.get('location')).toBeNull());
  it('uses country when English is not preferred', () => expect(run({'x-vercel-ip-country':'CO'}).status).toBe(307));
  it('honours both saved choices', () => {
    expect(run({cookie:'em_lang=en','accept-language':'es-CO'}).headers.get('location')).toBeNull();
    expect(run({cookie:'em_lang=es','accept-language':'en-US'}).status).toBe(307);
  });
  it('never redirects crawlers or other routes', () => {
    for (const agent of ['Googlebot','bingbot','Applebot','GPTBot','ClaudeBot','PerplexityBot','AhrefsBot','SemrushBot']) expect(run({'user-agent':agent,'accept-language':'es'}).headers.get('location')).toBeNull();
    for (const path of ['/es','/pricing','/pricing/growth','/es/precios']) expect(run({'accept-language':'es'},path).headers.get('location')).toBeNull();
  });
});
