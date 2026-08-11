STOLKOR – definitywna poprawka galerii i lightboxa

Dlaczego poprzednia poprawka nie działała:
- aktualny Gallery.astro nie importował masonry.css,
- global.css nadal zawierał stare reguły lightboxa.

Ta wersja rozwiązuje problem inaczej:
- cały true masonry,
- skrypt masonry,
- lightbox,
- CSS lightboxa
znajdują się w jednym pliku Gallery.astro.

Instalacja:
1. Rozpakuj paczkę do głównego katalogu projektu Stolkor.
2. Nadpisz:
   src/components/Gallery.astro
3. Nie musisz usuwać masonry.css. Ten plik nie jest już wymagany.
4. Uruchom:
   npm run dev
5. Sprawdź kilka zdjęć poziomych i pionowych w lightboxie.

Jeżeli jest dobrze:
   npm run build
   git add .
   git commit -m "Fix masonry and lightbox layout"
   git pull --rebase origin main
   git push origin main

Na czas pull/push nie zapisuj nic w Pages CMS.
