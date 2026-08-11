STOLKOR – pełna poprawka dwóch plików

Skopiuj katalog `src` z tej paczki do głównego katalogu projektu `stolkor`
i pozwól Windowsowi nadpisać istniejące pliki:

- src/pages/index.astro
- src/components/Gallery.astro

Potem uruchom:

npm run build

Jeśli build zakończy się poprawnie:

git add .
git commit -m "Fix GitHub Pages asset paths"
git push

Ta wersja zachowuje obecny układ strony z repozytorium i poprawia tylko
obsługę ścieżek dla GitHub Pages.
