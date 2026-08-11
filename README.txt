STOLKOR – synchronizacja z eksportem Dorik

Nadpisuje:
- src/pages/index.astro
- src/styles/global.css
- src/data/site.json
- .pages.yml

Nie nadpisuje:
- src/data/gallery.json
- src/components/Gallery.astro
- public/images/gallery

Czyli zachowujesz 27 zdjęć i działający lightbox.

Po rozpakowaniu:
npm run dev

Jeśli OK:
npm run build
git add .
git commit -m "Synchronize layout with Dorik export"
git pull --rebase origin main
git push origin main

Na czas pull/push nie zapisuj nic w Pages CMS.
