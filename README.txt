STOLKOR — VISUAL POLISH V1

Ta paczka poprawia wygląd bez ingerencji w:
- Gallery.astro
- true masonry
- lightbox
- Pages CMS
- optymalizację WebP

Pliki:
- src/pages/index.astro
- src/styles/polish.css

Zmiany:
- dopracowane proporcje nagłówka,
- subtelniejsze zachowanie nawigacji,
- uporządkowana typografia sekcji o firmie,
- delikatny hover zdjęć bez zmiany masonry,
- dopracowane przejście do sekcji kontaktowej,
- subtelny cień mapy,
- lepsze odstępy danych kontaktowych,
- bardziej zwarte proporcje na telefonie,
- dostępne focus states i respektowanie prefers-reduced-motion.

Instalacja:
1. Rozpakuj paczkę w katalogu repozytorium Stolkor.
2. Pozwól nadpisać src/pages/index.astro.
3. Zostanie dodany src/styles/polish.css.
4. Uruchom:
   npm run dev

Jeśli wygląda dobrze:
   npm run build
   git add .
   git commit -m "Polish site layout and responsive styling"
   git pull --rebase origin main
   git push origin main

Na czas pull/push nie zapisuj zmian w Pages CMS.
