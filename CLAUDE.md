# Complia: verkkosivut

Staattinen Astro-sivusto tietosuojapalveluyritykselle. Tavoite on näkyä Googlessa suomenkielisillä tietosuojahauilla ja myydä kiinteähintaisia palveluja.

Lue ennen muutoksia [sivu- ja SEO-suunnitelma](docs/SIVUSTOSUUNNITELMA.md). Liiketoimintasuunnitelmat ovat kansiossa `..`, repon ulkopuolella, eikä niitä kopioida repoon.

Repo: [hololai/complia-sivusto](https://github.com/hololai/complia-sivusto), julkinen, haara `main`. Sivusto: https://hololai.github.io/complia-sivusto/ salasanaportin takana, kunnes `esikatselu.paalla` on false. Repo on julkinen, joten siihen ei kirjoiteta mitään, mikä ei saa näkyä kaikille. Push vaatii gh-tilin `hololai`: koneella on myös toinen tili, joten tarkista `gh auth status` ennen pushia.

## Komennot

Node 24 (`.nvmrc`). Aja ensin `nvm use`.

| Komento | Tekee |
|---|---|
| `npm run dev` | Kehityspalvelin, http://localhost:4321 |
| `npm run build` | Rakentaa `dist/`-kansion |
| `npm run preview` | Näyttää valmiin buildin CSP mukana |
| `npm run tarkista` | Build ja SEO-, saavutettavuus- ja tietosuojatarkistus |
| `npm run tarkista:julkaisu` | Sama, ja puuttuvat tiedot ovat virheitä |
| `npm run salasana` | Asettaa esikatselun salasanan (tiiviste tiedostoon `site.config.mjs`) |
| `npm run asiakirjat` | Rakentaa ladattavat Word-tiedostot (selostepohja ja käsittelysopimus) ja kuntien palvelukuvauksen (PDF, tulostetaan Chromella) datasta. Aja aina, kun hinnat tai yrityksen tiedot muuttuvat: tarkistin huomaa vanhentuneen PDF:n. |

## Rakenne

- `site.config.mjs`: nimi, osoite, slogan, yrityksen tiedot ja julkaisukytkin. Arvo `null` näkyy sivulla keltaisena Täydennä-merkintänä.
- `src/data/hinnat.ts`: ainoa paikka hinnoille. Teksteissä hinta merkitään `{{tietosuojaseloste.pieni}}`.
- `src/content/palvelut/`: palvelusivut. `src/content/artikkelit/`: ohjeet.
- `src/pages/`: muut sivut. `src/layouts/Perus.astro`: otsikot, canonical, CSP ja rakenteiset tiedot.
- `scripts/tarkista.mjs`: säännöt, jotka valmiin sivuston pitää täyttää.
- `src/data/kulut.ts`: jokaisen palvelun kuvallinen kulku (vaiheet, asiakkaan ja Complian osuus, lopputulos). Uusi palvelu tarvitsee kulun, muuten build kaatuu.
- `src/data/kuvat.ts`: sivuston piirrokset upotettuna SVG:nä, kaikki samaa tyyliä.
- `src/data/asiakirja.ts`: yhteinen rakenne asiakirjoille. Sivu (`Asiakirja.astro`) ja Word (`scripts/tee-asiakirjat.mjs`) syntyvät samasta datasta. `[kenttä]` täyttää asiakas, `<<kohta>>` täydennetään ennen julkaisua.
- Käsittelysopimuksen ja Meistä-sivun tiedot Complia-työkalusta tulevat sen omasta dokumentaatiosta (sen PRD). Päivitä ne, kun työkalun sijainti, pääsy tai alihankkijat muuttuvat.

## Säännöt

- Käyttöliittymä, tekstit, kommentit ja commit-viestit suomeksi. Kommentit kertovat miksi, eivät mitä.
- Sivuston oma tietosuoja on näyte osaamisesta: ei seurantaa, evästeitä, selaintallennusta, ulkoisia fontteja, upotuksia tai CDN-skriptejä.
- Ainoa tietoja lähettävä lomake on tarjouspyyntö (`/yhteystiedot`). Se lähettää vain omaan vastaanottoon (`lomake/`, Google Cloud Run, europe-north1), joka lähettää sähköpostin eikä tallenna mitään. CSP:n `form-action` rajaa lähetyksen sinne, ja tarkistin valvoo sitä. Julkaisu: `bash lomake/julkaise.sh`. SMTP-salasana on vain Secret Managerissa (`bash lomake/tallenna-salasana.sh`), ja lähettäjätilin osoitetta ei kirjoiteta repoon eikä sivustolle.
- Ilme on ammattimainen, ei tarjouslehti (päätös 11.11.2026): yksi kultainen päätoimintopainike per osio, päätoiminto on "Ota yhteyttä" ja palvelusivulla "Tilaa palvelu". Ei yliviivattuja hintoja, säästöprosentteja, leimoja tai tarroja. Tarkistin valvoo painikkeet ja yliviivaukset.
- Kaikki palvelut ovat kertaostoksia, jatkuvia palveluja ei myydä (päätös 11.11.2026). Jokainen Tilaa-painike vie osoitteeseen `/yhteystiedot?palvelu=<tunnus>`, jolloin lomake on esitäytetty. Tarkistin valvoo, että tunnus löytyy lomakkeelta.
- Kehotukset puhuttelevat ihmistä yksikössä ("Ota yhteyttä", "Kerro, mitä teette", "Etkö tiedä…?"). Organisaatiosta puhutaan te-muodossa ("teidän asiakirjanne", "Otatteko Copilotin käyttöön?").
- CSP on tiukka: ei sisäisiä skriptejä, tyylejä tai `style`-attribuutteja. Interaktiivisuus on lisä, ja sisällön ja hintojen pitää näkyä ilman JavaScriptiä.
- Uudella artikkelilla pitää olla hakusana, alle 155 merkin metakuvaus, kehotus palveluun, ensisijaiset lähteet ja päivityspäivä. Linkitä se palvelusivulta ja palvelusivulle.
- Palvelusivu ja artikkeli eivät kilpaile samasta hausta: palvelusivu vastaa ostoaikeeseen, artikkeli tiedonhakuun.
- Sakot ja tietomurrot kerrotaan faktoina, ei pelotteluna. Älä keksi tapauksia, lukuja, pätevyyksiä tai referenssejä. Tuntematon tieto on Täydennä-merkintä.
- Ohjelmistoartikkelien toimittajatiedot tarkistetaan toimittajan omasta dokumentaatiosta, ja niihin merkitään tarkistushetki. Ehdot muuttuvat, joten tarkista ne neljännesvuosittain.
- Lakiviittaukset tarkistetaan ensisijaisesta lähteestä, ja keskeneräiset lakihankkeet kerrotaan päivämäärän kanssa.
- Uudet riippuvuudet tarkalla versiolla (`.npmrc`), vähintään 14 päivää vanha versio, `npm audit` muutoksen jälkeen.
- Push mainiin julkaisee sivuston GitHub Pagesiin (`.github/workflows/julkaisu.yml`), joten älä pushaa ilman erillistä pyyntöä. `julkaistu: true` vain, kun `npm run tarkista:julkaisu` menee läpi.
