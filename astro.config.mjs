import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = 'https://oloko82.github.io';
const base = '/stolkor';

const hostname = new URL(site).hostname.toLowerCase();
const isProductionDomain =
  hostname === 'stolkor.pl' || hostname === 'www.stolkor.pl';

export default defineConfig({
  site,
  base,

  integrations: [
    sitemap({
      // Nie publikujemy wersji testowej github.io w sitemapie.
      // Po zmianie `site` na https://stolkor.pl wpis pojawi się automatycznie.
      filter: () => isProductionDomain,
      namespaces: {
        news: false,
        xhtml: false,
        video: false,
      },
    }),
  ],
});
