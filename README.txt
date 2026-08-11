STOLKOR — PUNKTY 1 + 3

Wdrożone:
1. Klikalny adres firmy w sekcji kontaktowej.
3. Krótka lista usług pod opisem firmy.

Oba elementy są edytowalne w Pages CMS.

Dodatkowo:
- rozmiar krótkiej listy usług można zmieniać w Pages CMS,
- NIE nadpisujemy src/data/site.json,
- jeśli nowe pola jeszcze nie istnieją w site.json, strona używa bezpiecznych
  wartości domyślnych,
- po pierwszym zapisie w Pages CMS pola zostaną zapisane w site.json.

Pliki:
- .pages.yml
- src/pages/index.astro
- src/styles/content-additions.css

Instalacja:
1. Rozpakuj do katalogu projektu.
2. Nadpisz .pages.yml i src/pages/index.astro.
3. Dodaj src/styles/content-additions.css.
4. Uruchom:
   npm run dev

Jeśli jest OK:
   npm run build
   git add .
   git commit -m "Add services summary and business address"
   git pull --rebase origin main
   git push origin main

Podczas pull/push nie zapisuj nic w Pages CMS.
