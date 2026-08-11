STOLKOR – poprawiona dolna część strony

Paczka zawiera:
- src/pages/index.astro
- src/styles/contact.css

Jak zastosować:
1. Rozpakuj paczkę do głównego katalogu repozytorium `stolkor`.
2. Pozwól nadpisać `src/pages/index.astro`.
3. Plik `src/styles/contact.css` zostanie dodany jako nowy.
4. Uruchom:
   npm run dev
5. Sprawdź sekcję kontaktową lokalnie.
6. Jeśli jest OK:
   npm run build
   git add .
   git commit -m "Improve contact section"
   git push

Zmiany:
- smuklejsze warstwowe przejście nad kontaktem,
- mniejszy nagłówek,
- mapa w proporcjach bliższych Dorik,
- prawdziwe ikony SVG zamiast znaków tekstowych,
- lepsze odstępy i układ danych kontaktowych,
- subtelniejsza stopka,
- poprawiona wersja mobilna.
