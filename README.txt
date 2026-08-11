STOLKOR – PERFORMANCE V1

Ta paczka łączy:
- true masonry,
- poprawny skalujący lightbox,
- automatyczne WebP,
- srcset 480 / 960 / 1600,
- Pages CMS bez zmian.

INSTALACJA

1. Rozpakuj paczkę do głównego katalogu repozytorium `stolkor`.
   Nadpisz:
   - src/components/Gallery.astro
   - scripts/optimize-gallery.mjs

   Dodane zostaną:
   - scripts/configure-performance.mjs
   - scripts/setup-performance.ps1
   - src/data/gallery-optimized.json

2. Uruchom:

powershell -ExecutionPolicy Bypass -File .\scripts\setup-performance.ps1

3. Następnie:

npm run dev

Po uruchomieniu możesz sprawdzić w DevTools → Network, że galeria pobiera
pliki z /images/gallery-optimized/ zamiast pełnych JPEG-ów.

4. Jeżeli wszystko działa:

npm run build
git add .
git commit -m "Optimize responsive gallery images"
git pull --rebase origin main
git push origin main

Na czas pull/push nie zapisuj zmian w Pages CMS.

WAŻNE

Folder:
public/images/gallery-optimized/

oraz plik:
src/data/gallery-optimized.json

są generowane automatycznie i nie są commitowane.
GitHub Actions odtworzy je przy `npm run build`.

Nazwy wygenerowanych plików zawierają hash ZAWARTOŚCI zdjęcia. Dzięki temu
podmiana fotografii pod tą samą nazwą nie powoduje problemu ze starą wersją
w cache przeglądarki.
