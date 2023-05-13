# Blokklánc-alapú szervízkönyv alkalmazás

Követelmények:
 - Node.js
 - Metamask

Futtatás:

1. Klónozzuk a projektet a gépünkre.

2. Lépjünk a letöltött mappába, majd az "npm install --legacy-peer-deps" parancs kiadásával telepítsük a projekt használatához szükséges függőségeket.

3. Az "npm run dev" parancs kiadásával indítsuk el az alkalmazást. Ezután alapértelmezetten a "http://localhost:3000" címen elérhetővé válik az alkalmazás.

Szerződések újra fordítása és publiklása:

Ha szeretnénk újrafordítani az okosszerződéseinket és publikálni őket akkor azt az ethereum alkönyvtárban található "compile.js" és "deploy.js" futtatásával tudjuk megtenni.

pl.: "node ethereum/compile.js"

Ezután a szerződésünk új példánya felkerül a használt blokkláncra. A deploy szkript futtatásakor kapott azonosítót be kell illesztenünk a factory.js fájlba a használatához.


A projekt alapértelmezetten a Goerli hálózatra van beállítva. Ha a Metamaskban másik hálózat van beállítva úgy az alkalmazás hibásan fog működni és hibaüzenetet ad. Ha szertnénk módosítani a hálózatot, akkor a megfelelőt API kulcsot be kell illesztenünk a web3.js és deploy.js fájlokba, valamint ahogy az előző lépés mutatja közzé kell tennőnk a szerződésünket és frissíteni a factory.js fájlt.
