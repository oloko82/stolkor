STOLKOR – AUTOMATYCZNA OPTYMALIZACJA GALERII

Co robi ta paczka
=================
Po dodaniu oryginalnego zdjęcia przez Pages CMS:

1. oryginał pozostaje w:
   public/images/gallery/

2. przed uruchomieniem strony lub buildem Sharp automatycznie tworzy:
   - 480 px WebP
   - 960 px WebP
   - 1600 px WebP

3. galeria używa srcset, więc przeglądarka pobiera rozmiar odpowiedni
   dla ekranu i gęstości pikseli.

4. lightbox używa wersji maks. 1600 px.

5. True masonry nadal działa:
   - desktop: 4 kolumny
   - tablet: 3 kolumny
   - telefon: 2 kolumny
   - kolejne zdjęcie trafia do aktualnie najkrótszej kolumny.

Instalacja
==========
1. Rozpakuj paczkę do głównego katalogu repozytorium `stolkor`
   i pozwól nadpisać:
   src/components/Gallery.astro

   Dodane zostaną również:
   src/styles/masonry.css
   src/data/gallery-optimized.json
   scripts/optimize-gallery.mjs
   scripts/configure-image-optimization.mjs
   scripts/setup-image-optimization.ps1

2. W PowerShellu, w katalogu projektu, uruchom:

   powershell -ExecutionPolicy Bypass -File .\scripts\setup-image-optimization.ps1

   Ten skrypt:
   - instaluje Sharp,
   - aktualizuje package.json,
   - aktualizuje package-lock.json,
   - dodaje predev i prebuild,
   - dodaje pliki generowane do .gitignore,
   - wykonuje pierwszą optymalizację.

3. Następnie:

   npm run dev

4. Jeśli strona działa:

   npm run build
   git add .
   git commit -m "Add automatic gallery image optimization"
   git pull --rebase origin main
   git push origin main

Na czas pull/push nie zapisuj niczego w Pages CMS.

Ważne
=====
Folder public/images/gallery-optimized/ oraz manifest
src/data/gallery-optimized.json są generowane automatycznie i nie są
commitowane do repozytorium. GitHub Actions wygeneruje je ponownie
podczas każdego builda.

Jeżeli npm pokaże ostrzeżenie o zablokowanym skrypcie instalacyjnym Sharp,
uruchom:
   npm approve-scripts sharp

a następnie ponownie:
   npm install
