import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = 'https://stolkor.pl';

const hostname = new URL(site).hostname.toLowerCase();
const isProductionDomain =
  hostname === 'stolkor.pl' || hostname === 'www.stolkor.pl';

export default defineConfig({
  site,

  integrations: [
    sitemap({
      filter: () => isProductionDomain,
      namespaces: {
        news: false,
        xhtml: false,
        video: false,
      },
    }),
  ],
});
