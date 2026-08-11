STOLKOR — PRZEŁĄCZENIE NA DOMENĘ stolkor.pl

Ten pakiet zmienia tylko astro.config.mjs:
- site: https://stolkor.pl
- usuwa base: /stolkor
- włącza produkcyjne SEO / sitemapę przez istniejącą logikę projektu

KOLEJNOŚĆ

1. Najpierw na GitHub:
   Repozytorium stolkor → Settings → Pages → Custom domain
   wpisz:
   stolkor.pl
   i kliknij Save.

2. Następnie rozpakuj tę paczkę do repozytorium i nadpisz:
   astro.config.mjs

3. Uruchom:
   npm run build

4. Jeśli build przejdzie:
   git add .
   git commit -m "Switch site to stolkor.pl"
   git pull --rebase origin main
   git push origin main

5. Poczekaj aż GitHub Actions zakończy deploy na zielono.

6. Dopiero wtedy zmień rekordy DNS WWW.

UWAGA:
- nie zmieniaj serwerów nazw (NS),
- nie usuwaj ani nie edytuj rekordów MX,
- nie usuwaj rekordów SPF/DKIM/DMARC związanych z pocztą.
