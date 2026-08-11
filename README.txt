STOLKOR – TRUE MASONRY

Paczka zawiera:
- src/components/Gallery.astro
- src/styles/masonry.css

Jak działa:
- desktop: 4 kolumny
- tablet: 3 kolumny
- telefon: 2 kolumny
- każde następne zdjęcie trafia do aktualnie najkrótszej kolumny
- zachowywane są naturalne proporcje zdjęć
- działa lightbox
- Pages CMS i gallery.json pozostają bez zmian

Instalacja:
1. Rozpakuj paczkę do głównego katalogu repozytorium `stolkor`.
2. Pozwól nadpisać `src/components/Gallery.astro`.
3. Dodany zostanie `src/styles/masonry.css`.
4. Uruchom:
   npm run dev

Jeśli układ wygląda dobrze:
   npm run build
   git add .
   git commit -m "Add true masonry gallery"
   git pull --rebase origin main
   git push origin main

Na czas pull/push nie zapisuj zmian w Pages CMS.
