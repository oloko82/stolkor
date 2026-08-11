STOLKOR — SEO V1

Co wdraża paczka
================
1. canonical URL
2. Open Graph
3. Twitter Card
4. favicon 48 / 192 / 512
5. Apple Touch Icon
6. site.webmanifest
7. Open Graph image 1200 × 630
8. JSON-LD:
   - WebSite
   - LocalBusiness
9. robots.txt
10. @astrojs/sitemap

WAŻNE — wersja testowa github.io
================================
Obecnie astro.config.mjs nadal ma:
  site: https://oloko82.github.io
  base: /stolkor

Dlatego:
- meta robots = noindex,nofollow
- wersja testowa NIE jest dodawana do sitemap
- canonical wskazuje aktualny adres testowy

Nie chcemy, żeby Google indeksował testową kopię przed uruchomieniem stolkor.pl.

Po przyszłym przełączeniu na domenę
===================================
Gdy zmienimy astro.config.mjs na:
  site: https://stolkor.pl

i usuniemy:
  base: /stolkor

automatycznie:
- robots przełączy się na index,follow,
- canonical stanie się https://stolkor.pl/,
- Open Graph będzie używał stolkor.pl,
- robots.txt doda sitemapę,
- sitemap zacznie zawierać stronę stolkor.pl.

Nie trzeba będzie przepisywać komponentu SEO.

Instalacja
==========
1. Rozpakuj paczkę do głównego katalogu repozytorium.
2. Pozwól nadpisać:
   astro.config.mjs
   src/pages/index.astro
   src/styles/content-additions.css

3. Dodane zostaną:
   src/components/Seo.astro
   src/pages/robots.txt.ts
   public/favicon-48.png
   public/favicon-192.png
   public/favicon-512.png
   public/apple-touch-icon.png
   public/og-image.jpg
   public/site.webmanifest
   scripts/setup-seo.ps1

4. Uruchom:
   powershell -ExecutionPolicy Bypass -File .\scripts\setup-seo.ps1

5. Następnie:
   npm run build

6. Jeśli build przejdzie:
   npm run dev

Test
====
Na wersji lokalnej / testowej w kodzie strony powinno być:
  <meta name="robots" content="noindex,nofollow,noarchive">

Po buildzie powinny powstać pliki sitemap-index.xml i sitemap-0.xml.
Na github.io sitemap może być pusta — to zamierzone do czasu uruchomienia stolkor.pl.

Commit
======
Jeśli wszystko działa:
  git add .
  git commit -m "Add technical SEO"
  git pull --rebase origin main
  git push origin main

Na czas pull/push nie zapisuj nic w Pages CMS.

Po uruchomieniu stolkor.pl
==========================
Zrobimy jeszcze:
- przełączenie astro.config.mjs na stolkor.pl,
- Google Search Console,
- weryfikację Rich Results Test,
- przesłanie sitemap-index.xml,
- sprawdzenie canonical / robots / favicon po wdrożeniu.
