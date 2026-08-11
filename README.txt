STOLKOR — USTAWIENIA TYPOGRAFII W PAGES CMS

Paczka dodaje do Pages CMS możliwość zmiany rozmiaru:
- menu,
- tekstu o firmie,
- dużych liczb 10+ / 657+,
- podpisów pod statystykami,
- tytułu „Skontaktuj się z nami”,
- danych kontaktowych,
- stopki.

Wartości wpisujesz jako LICZBY, np.:
42
18
30

Nie wpisuj „px”.

Domyślne wartości są identyczne z obecnym wyglądem strony:
Menu: 20
Tekst o firmie: 30
Statystyki: 68
Podpisy statystyk: 16
Tytuł kontaktu: 42
Dane kontaktowe: 18
Stopka: 14

Na telefonie CSS ma bezpieczne maksymalne rozmiary, więc duża wartość
desktopowa nie rozwali wersji mobilnej. Zmniejszanie działa również na mobile.

INSTALACJA

1. Rozpakuj paczkę do głównego katalogu repozytorium.
2. Nadpisz:
   .pages.yml
   src/data/site.json
   src/pages/index.astro
   src/styles/polish.css

3. Uruchom:
   npm run dev

4. Jeśli strona wygląda identycznie jak przed zmianą:
   npm run build
   git add .
   git commit -m "Add typography controls to Pages CMS"
   git pull --rebase origin main
   git push origin main

5. Po pushu otwórz Pages CMS → Dane strony.
   Na dole formularza zobaczysz pola z rozmiarami czcionek.

UWAGA
Paczka zawiera aktualny site.json z wartościami projektu.
Jeśli przed rozpakowaniem zmieniłeś treści w Pages CMS, najpierw zrób:
   git pull --rebase origin main
żeby mieć lokalnie najnowszą wersję.
