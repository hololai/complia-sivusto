# Complia: verkkosivut

Staattinen Astro-sivusto tietosuojapalveluyritykselle. Tavoite on näkyä Googlessa suomenkielisillä tietosuojahauilla ja myydä kiinteähintaisia palveluja.

Lue ennen muutoksia [sivu- ja SEO-suunnitelma](docs/SIVUSTOSUUNNITELMA.md). Liiketoimintasuunnitelmat ovat kansiossa `..`, repon ulkopuolella, eikä niitä kopioida repoon.

Repo: [hololai/complia-sivusto](https://github.com/hololai/complia-sivusto), yksityinen, haara `main`. Push vaatii gh-tilin `hololai`: koneella on myös toinen tili, joten tarkista `gh auth status` ennen pushia.

## Komennot

Node 24 (`.nvmrc`). Aja ensin `nvm use`.

| Komento | Tekee |
|---|---|
| `npm run dev` | Kehityspalvelin, http://localhost:4321 |
| `npm run build` | Rakentaa `dist/`-kansion |
| `npm run preview` | Näyttää valmiin buildin CSP mukana |
| `npm run tarkista` | Build ja SEO-, saavutettavuus- ja tietosuojatarkistus |
| `npm run tarkista:julkaisu` | Sama, ja puuttuvat tiedot ovat virheitä |

## Rakenne

- `site.config.mjs`: nimi, osoite, slogan, yrityksen tiedot ja julkaisukytkin. Arvo `null` näkyy sivulla keltaisena Täydennä-merkintänä.
- `src/data/hinnat.ts`: ainoa paikka hinnoille. Teksteissä hinta merkitään `{{tietosuojaseloste.pieni}}`.
- `src/content/palvelut/`: palvelusivut. `src/content/artikkelit/`: ohjeet.
- `src/pages/`: muut sivut. `src/layouts/Perus.astro`: otsikot, canonical, CSP ja rakenteiset tiedot.
- `scripts/tarkista.mjs`: säännöt, jotka valmiin sivuston pitää täyttää.

## Säännöt

- Käyttöliittymä, tekstit, kommentit ja commit-viestit suomeksi. Kommentit kertovat miksi, eivät mitä.
- Sivuston oma tietosuoja on näyte osaamisesta: ei seurantaa, evästeitä, ulkoisia fontteja, upotuksia tai CDN-skriptejä.
- CSP on tiukka: ei sisäisiä skriptejä, tyylejä tai `style`-attribuutteja. Interaktiivisuus on lisä, ja sisällön ja hintojen pitää näkyä ilman JavaScriptiä.
- Uudella artikkelilla pitää olla hakusana, alle 155 merkin metakuvaus, kehotus palveluun, ensisijaiset lähteet ja päivityspäivä. Linkitä se palvelusivulta ja palvelusivulle.
- Palvelusivu ja artikkeli eivät kilpaile samasta hausta: palvelusivu vastaa ostoaikeeseen, artikkeli tiedonhakuun.
- Sakot ja tietomurrot kerrotaan faktoina, ei pelotteluna. Älä keksi tapauksia, lukuja, pätevyyksiä tai referenssejä. Tuntematon tieto on Täydennä-merkintä.
- Lakiviittaukset tarkistetaan ensisijaisesta lähteestä, ja keskeneräiset lakihankkeet kerrotaan päivämäärän kanssa.
- Uudet riippuvuudet tarkalla versiolla (`.npmrc`), vähintään 14 päivää vanha versio, `npm audit` muutoksen jälkeen.
- Älä julkaise (`firebase deploy`, `git push`) ilman erillistä pyyntöä. `julkaistu: true` vain, kun `npm run tarkista:julkaisu` menee läpi.
