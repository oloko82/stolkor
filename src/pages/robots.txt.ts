import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  if (!site) {
    return new Response('User-agent: *\nAllow: /\n', {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }

  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  const root = new URL(base, site);
  const hostname = root.hostname.toLowerCase();

  const isProductionDomain =
    hostname === 'stolkor.pl' || hostname === 'www.stolkor.pl';

  const body = isProductionDomain
    ? [
        'User-agent: *',
        'Allow: /',
        '',
        `Sitemap: ${new URL('sitemap-index.xml', root).href}`,
        '',
      ].join('\n')
    : [
        'User-agent: *',
        'Allow: /',
        '',
        '# Wersja testowa: indeksowanie blokuje meta robots noindex.',
        '',
      ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
