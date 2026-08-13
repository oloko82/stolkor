# Stolkor

Strona firmowa **Stolkor** dostępna pod:

https://stolkor.pl

Jednostronicowy serwis zbudowany w Astro, z galerią realizacji i edycją treści przez Pages CMS.

## Technologia

- Astro
- GitHub Pages
- Pages CMS
- GitHub Actions
- Sharp do optymalizacji galerii

## Uruchomienie lokalne

```powershell
npm ci
npm run dev
```

Strona lokalna jest dostępna pod:

```text
http://localhost:4321/
```

## Build

```powershell
npm run build
```

Przed buildem automatycznie uruchamia się optymalizacja galerii.

## Galeria

Źródłowe zdjęcia znajdują się w:

```text
public/images/gallery/
```

Dane galerii:

```text
src/data/gallery.json
```

Optymalizacja obrazów:

```powershell
npm run optimize:gallery
```

Skrypt:

```text
scripts/optimize-gallery.mjs
```

generuje responsywne warianty WebP. Niezmienione zdjęcia są pomijane.

## Pages CMS

Treść strony i galerię można edytować przez Pages CMS.

Zmiany zapisane w Pages CMS trafiają do repozytorium GitHub.

Publikacja strony jest uruchamiana ręcznie przyciskiem:

**Publikuj stronę**

## Publikacja

Workflow:

```text
.github/workflows/deploy.yml
```

Publikacja działa przez `workflow_dispatch`, więc zwykły push nie wdraża automatycznie strony.

Po zmianach:

```powershell
git add .
git commit -m "Opis zmian"
git pull --rebase origin main
git push origin main
```

Następnie uruchom **Publikuj stronę** w Pages CMS lub workflow ręcznie w GitHub Actions.

## Ważne pliki

```text
.pages.yml                         konfiguracja Pages CMS
astro.config.mjs                  konfiguracja Astro / domeny / sitemap
src/data/site.json                treść strony
src/data/gallery.json             lista zdjęć galerii
scripts/optimize-gallery.mjs      optymalizacja zdjęć
.github/workflows/deploy.yml      build i publikacja GitHub Pages
```

## Domena

Produkcja:

https://stolkor.pl