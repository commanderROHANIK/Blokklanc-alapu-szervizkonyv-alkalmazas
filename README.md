# Blokklánc-alapú szervízkönyv alkalmazás

Futtatás:

1. Klónozzuk a projektet a gépünkre.

2. Lépjünk a letöltött mappába, majd az "npm install --legacy-peer-deps" parancs kiadásával telepítsük a projekt használatához szükséges függőségeket.

3. Az "npm run dev" parancs kiadásával indítsuk el az alkalmazást. Ezután alapértelmezetten a "http://localhost:3000" címen elérhetővé válik az alkalmazás.

Szerződések újra fordítása és publiklása

Ha szeretnénk újrafordítani az okosszerződéseinket és publikálni őket akkor azt az ethereum alkönyvtárban található "compile.js" és "deploy.js" futtatásával tudjuk megtenni.

pl.: "node ethereum/compile.js"

Ezután a szerződésünk új példánya felkerül a használt blokkláncra.


