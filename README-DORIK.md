# Stolkor – odtworzenie na podstawie eksportu Dorik

Ta paczka zawiera pliki przygotowane na podstawie eksportu JSON Dorik.

## Co odtworzono z oryginału

- Inter jako główna czcionka
- bazowa typografia 18 px / 30 px
- sekcja O firmie: 160 px góra/dół
- układ 3/5 + 1/5 + 1/5
- liczniki 68 px
- galeria masonry: 4 kolumny, 10 px odstępu
- tablet: 3 kolumny
- mobile: 2 kolumny
- kontakt: #262525, padding 100/120 px
- mapa: 502 x 443 px, radius 10 px
- kontakt: 3/5 + 2/5
- zielone ikony #26C281
- dokładne teksty i telefony z Dorik
- dokładny embed mapy
- 27 oryginalnych adresów zdjęć galerii

## Instalacja

1. Zrób kopię bieżącego repozytorium lub upewnij się, że wszystko jest w Git.
2. Rozpakuj zawartość paczki do katalogu `stolkor` i pozwól nadpisać pliki.
3. Pobierz oryginalne zdjęcia z Dorik:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\download-dorik-media.ps1
```

4. Uruchom:

```powershell
npm run dev
```

Dla obecnego `base: '/stolkor'` strona lokalna będzie zwykle pod:
`http://localhost:4321/stolkor/`

5. Jeśli wszystko wygląda dobrze:

```powershell
npm run build
git add .
git commit -m "Rebuild site from Dorik export"
git push
```

## Ważne

Skrypt pobierający media korzysta z publicznych adresów CDN zapisanych w eksporcie Dorik.
Warto uruchomić go teraz, zanim stara strona zostanie wyłączona.
