# Complia: sivu- ja SEO-suunnitelma

Päivitetty 5.11.2026. Pohjana on [nettisivusuunnitelma](../../02-Nettisivusuunnitelma.docx). Tähän on kirjattu, mitä siitä poikettiin ja miksi.

## Päätökset

| Asia | Päätös | Peruste |
|---|---|---|
| Nimi ja osoite | Complia, `complia.fi` | Käyttäjän päätös 5.11.2026. Verkkotunnus oli sinä päivänä vapaa, mutta sitä ei ole vielä rekisteröity. |
| Slogan | **Tietosuoja ja GDPR kuntoon kiinteällä hinnalla** | Sisältää hakusanat ja erottautumisen. Näkyy etusivun otsikossa ja H1:ssä, yläpalkissa, alatunnisteessa, jakokuvassa ja rakenteisissa tiedoissa. |
| Vanha iskulause | "Me teemme, sinä hyväksyt." säilyy tekstissä | Kertoo työtavan, mutta ei sisällä hakusanoja. |
| Toteutus | Astro, staattiset sivut | Selaimeen ei mene kehystä. Sivut toimivat missä tahansa palvelimella, joten hostingin voi vaihtaa myöhemmin. |
| Hosting | GitHub Pages, julkinen repo | Käyttäjän päätös 6.11.2026. Esikatselu on salasanaportin takana ja noindex. Pages ei salli omia otsakkeita, joten CSP on vain metatasolla, eikä `frame-ancestors` ole käytössä. Kun verkkotunnus on valmis, alipolku poistetaan (`SIVUSTON_POLKU`). |
| Varmuuskopiot | Salatulla työkoneella | Käsittelysopimuksen suojatoimi perustuu tähän. |
| Asiantuntijoiden tausta | Lyhyt kappale: koulutus, tehtävätaso ja julkaisut. Ei työnantajaa, aiempia virkoja, esiintymisiä eikä mainintaa muiden yritysten tietosuoja-asioiden hoitamisesta | Käyttäjän päätökset 5.11. ja 6.11.2026. |
| Sijainti repossa | `sivusto/` omana kansionaan | Markkinointisuunnitelma ja budjetit pysyvät repon ulkopuolella, vaikka repo joskus muuttuisi julkiseksi. |

### Hosting ja EU

Alkuperäinen suunnitelma lupasi hostingin EU:ssa. GitHub Pages toimii Yhdysvalloissa ja maailmanlaajuisen verkon kautta, joten lupaus ei toteudu. Sivuston omaan tietosuojaselosteeseen pitää kirjata GitHub ja siirtoperuste ennen julkaisua.

## Poikkeamat alkuperäisestä suunnitelmasta

| Kohta | Suunnitelmassa | Nyt | Syy |
|---|---|---|---|
| Oma tietosuojaseloste | ei osoitetta | `/tietosuoja` | `/tietosuojaseloste` on palvelusivun osoite, ja sen pitää kilpailla hakusanasta. |
| Palvelut-sivu | "Yrityksen palvelut →" ilman kohdetta | `/palvelut` | Etusivun yrityspolulle tarvitaan kohde, ja se kattaa hakusanat tietosuojapalvelut ja GDPR yritykselle. |
| Tietosuojavastaava | osa `/kunnat`-sivua | oma sivu `/tietosuojavastaava` | Hakusana "tietosuojavastaava ostopalveluna" kuuluu myös yrityksille, eikä kuntasivu vastaa siihen hyvin. |
| Tietosuojaselosteen pohja | sähköpostia vastaan | avoimesti sivulla, Word ilman sähköpostia | Google ei näe lomakkeen taakse. "Tietosuojaseloste pohja" on selvä hakusana, ja lisäksi sarjapostitus vaatisi palvelun ja suostumukset. Sähköpostin voi lisätä myöhemmin vapaaehtoisena. |
| Pikatesti | markkinointisuunnitelmassa sähköpostia vastaan, nettisivusuunnitelmassa tulos heti | tulos heti, ei tallennusta | Noudattaa nettisivusuunnitelmaa ja vahvistaa viestiä. |
| H1 etusivulla | Tietosuoja kuntoon – … | Tietosuoja ja GDPR kuntoon – … | Lisää hakusanan GDPR. |
| Tarkastus-sivun H1 | Tietosuojatarkastus | Tietosuojatarkastus: tietosuoja-auditointi … | Suunnitelman pääsana on "tietosuoja-auditointi", mutta sitä ei ollut osoitteessa eikä otsikossa. |
| Artikkelit 1, 4, 8 | sama pääsana ja lähes sama osoite kuin palvelusivulla | uudet otsikot ja osoitteet | Kaksi sivua kilpaili samasta hausta. Palvelusivu vastaa nyt ostoaikeeseen ja artikkeli tiedonhakuun. |
| Tekstien pituus | artikkelit 225–313 sanaa, palvelusivut noin 60 sanaa | artikkelit noin 400–550, palvelusivut noin 400–450 sanaa | Suunnitelman teksti on säilytetty pohjana. Lisättiin esimerkkejä, vaiheita, kysymyksiä ja ensisijaiset lähteet. |
| Usein kysytyt | FAQ-rakenne rikkaita tuloksia varten | sisältö ja merkintä säilyvät | Google lopetti FAQ-rikastulokset toukokuussa 2026, joten etua ei saa enää hakutuloksen ulkoasuun. Merkintä on yhä sallittu. |
| Kuntasivun PDF ja käsittelysopimus | ladattavissa | Täydennä-merkintä | Vaativat yrityksen tiedot ja oikeudellisen pohjan. |

## Hinnoittelu

Kaikki hinnat ovat tiedostossa `src/data/hinnat.ts`. Rakenne uudistettiin 6.11.2026 käyttäjän palautteen perusteella: vanha hinnoittelu oli sekava, koska vaikutustenarviointi hinnoiteltiin sekä koon että ohjelmiston mukaan ja LIA ja TIA laskutettiin päälle.

Hinnoittelu on kolmessa osassa:

1. **Perusasiakirjat organisaation koon mukaan:** tietosuojaselosteet 290 / 590 / 990 €, seloste käsittelytoimista 590 / 1 290 / 2 490 €, tietosuojatarkastus 890 / 2 400 / 5 900 €, tietotilinpäätös – / 1 900 / 3 900 € ja niistä koottu paketti 1 390 / 3 390 / 7 490 € (säästö noin 20 %).
2. **Vaikutustenarviointi järjestelmää kohden.** Hinta sisältää ennakkoarvion, arvioinnin, tarvittaessa tasapainotestin ja siirtovaikutusten arvioinnin sekä kirjaukset tietosuojaselosteeseen ja selosteeseen käsittelytoimista. Neljä riviä: rajattu järjestelmä tai tekoälytyökalu 990 / 1 490 / 2 400 €, toimisto-ohjelmisto 1 190 / 1 790 / 2 900 €, tekoäly toimisto-ohjelmistossa 1 490 / 2 190 / 3 400 € ja arkaluonteisia tietoja käsittelevä järjestelmä 1 790 / 2 690 / 3 900 €.
3. **Jatkuvat palvelut:** ennallaan.

GAP-analyysi (6.11.2026, käyttäjän ehdotus): tietosuojatarkastus on sisällöltään GAP-analyysi, joten palvelussa käytetään molempia nimiä ("Tietosuojatarkastus eli GAP-analyysi"). Se on suositeltu aloitus: ensimmäisenä palvelulistoissa, Aloita tästä -laatikko etusivulla ja hinnastossa. Jos asiakas tilaa analyysin jälkeen paketin, analyysin hinta vähennetään (`JATKO` tiedostossa `hinnat.ts`): loput paketista 500 / 990 / 1 590 €. Hyvitykselle ei ole vielä määräaikaa, ja se pitää lisätä toimitusehtoihin ennen julkaisua.

Erikseen ostettavat arvioinnit: ennakkoarvio 290 € (hyvitetään, jos jatketaan arviointiin), tasapainotesti 290 € käsittelyä kohden, siirtovaikutusten arviointi 390 € toimittajaa kohden ja FRIA 1 290 / 2 490 / 4 900 €. Kolmella ensimmäisellä on yksi hinta koosta riippumatta, koska työ on käsittely- tai toimittajakohtaista eikä kasva organisaation koon mukana.

Perustelut (markkinakatsaus 6.11.2026):

- Yksittäinen tietosuojaseloste maksaa markkinalla noin 200–230 € + alv (esim. Tietosuojatalo 229 €, Lakihelppi 199 €), lakitoimistoissa selvästi enemmän. Vanha 390 € näytti kalliilta, vaikka se sisälsi neljä selostetta. Uusi 290 € kaikista selosteista on kilpailukykyinen ja kertoo sisällön suoraan.
- Käyttäjän havainto: vaikutustenarvioinnissa syntyy aina tietosuojaseloste ja ropa-kirjaus samasta käsittelystä. Siksi ne kuuluvat arvioinnin hintaan eivätkä tule erillisinä laskuina.
- Ulkoistettu tietosuojavastaava maksaa markkinalla noin 300–2 500 €/kk ja tietosuojaohjelmistot noin 80–350 €/kk, joten jatkuvien palvelujen hinnat (89–1 500 €/kk) pysyvät ennallaan.
- Tarkistin (`scripts/tarkista.mjs`) vaatii, että hinta ei laske koon kasvaessa, järjestelmärivit kasvavat alaspäin ja paketin säästö on noin 20 %.

Muut periaatteet:

- Tasapainotesti ja oikeutetun edun arviointi ovat sama asia, joten palvelun nimessä ovat molemmat (käyttäjän päätös 5.11.2026).
- FRIA ei koske tavallista Copilotin, Geminin tai Clauden käyttöä, vaan tiettyjä suuririskisen tekoälyn käyttöönottajia. Tätä ei saa markkinoida kaikille pakollisena.
- TIA riippuu toimittajan siirtoperusteesta, joten sitä ei liitetä automaattisesti Microsoft 365:een tai Google Workspaceen.
- Vanhat `{{claude.koko}}`-, `{{m365.koko}}`-, `{{copilot.koko}}`-tyyppiset tunnukset osoittavat järjestelmäriveihin, joten artikkelien hinnat päivittyvät automaattisesti.

## Sivukartta ja hakusanat

| Sivu | Osoite | Pääsana | Hakuaie |
|---|---|---|---|
| Etusivu | `/` | tietosuoja, GDPR, tietosuojapalvelut | brändi ja yleishaku |
| Palvelut | `/palvelut` | tietosuojapalvelut yrityksille | vertailu |
| Tietosuojaselosteet | `/tietosuojaseloste` | tietosuojaseloste | osto |
| Seloste käsittelytoimista | `/seloste-kasittelytoimista` | seloste käsittelytoimista | osto |
| Ennakkoarvio | `/tarvitaanko-vaikutustenarviointi` | ennakkoarvio, tarvitaanko vaikutustenarviointi | osto |
| Vaikutustenarviointi | `/vaikutustenarviointi` | vaikutustenarviointi, DPIA | osto |
| Tietosuojatarkastus | `/tietosuojatarkastus` | tietosuojatarkastus, tietosuoja-auditointi | osto |
| Tietotilinpäätös | `/tietotilinpaatos` | tietotilinpäätös kunnalle | osto |
| Tietosuojavastaava | `/tietosuojavastaava` | tietosuojavastaava palveluna | osto |
| Tasapainotesti eli oikeutetun edun arviointi | `/oikeutetun-edun-arviointi` | oikeutetun edun arviointi, LIA, tasapainotesti | osto |
| Siirtovaikutusten arviointi | `/siirtovaikutusten-arviointi` | siirtovaikutusten arviointi, TIA | osto |
| Perusoikeusvaikutusten arviointi | `/perusoikeusvaikutusten-arviointi` | perusoikeusvaikutusten arviointi, FRIA | osto |
| Hinnasto | `/hinnasto` | tietosuojaseloste hinta, Copilot vaikutustenarviointi hinta | osto |
| Kunnille | `/kunnat` | tietosuojapalvelut kunnille | vertailu |
| Pohja | `/tietosuojaselostepohja` | tietosuojaseloste pohja, malli | tieto |
| Pikatesti | `/pikatesti` | onko GDPR kunnossa | tieto |
| Artikkeli | `/artikkelit/mita-tietosuojaselosteessa-pitaa-olla` | mitä tietosuojaselosteessa pitää olla | tieto |
| Artikkeli | `/artikkelit/rekisteriseloste-vai-tietosuojaseloste` | rekisteriseloste | tieto |
| Artikkeli | `/artikkelit/tarvitseeko-yritys-tietosuojavastaavan` | tarvitseeko yritys tietosuojavastaavan | tieto |
| Artikkeli | `/artikkelit/mika-on-seloste-kasittelytoimista` | mikä on seloste käsittelytoimista | tieto |
| Artikkeli | `/artikkelit/milloin-vaikutustenarviointi-on-pakollinen` | milloin DPIA tarvitaan | tieto |
| Artikkeli | `/artikkelit/tekoaly-tyopaikalla-tietosuoja` | copilot gdpr, tekoäly tietosuoja | tieto |
| Artikkeli | `/artikkelit/tietomurto-mita-tehda` | tietomurto mitä tehdä, tietosuojaloukkaus | tieto |
| Artikkeli | `/artikkelit/tietotilinpaatos-sisalto-ja-aikataulu` | tietotilinpäätöksen sisältö | tieto |
| Artikkeli | `/artikkelit/microsoft-365-tietosuoja` | microsoft 365 tietosuoja, o365 gdpr | tieto |
| Artikkeli | `/artikkelit/microsoft-365-copilot-tietosuoja` | copilot tietosuoja, copilot vaikutustenarviointi | tieto |
| Artikkeli | `/artikkelit/google-workspace-tietosuoja` | google workspace tietosuoja | tieto |
| Artikkeli | `/artikkelit/google-gemini-tietosuoja` | gemini tietosuoja | tieto |
| Artikkeli | `/artikkelit/claude-team-tietosuoja` | claude team tietosuoja | tieto |
| Artikkeli | `/artikkelit/mika-on-lia-tasapainotesti` | mikä on LIA, tasapainotesti | tieto |
| Artikkeli | `/artikkelit/mika-on-tia-tiedonsiirto` | mikä on TIA, tietojen siirto EU:n ulkopuolelle | tieto |
| Artikkeli | `/artikkelit/mika-on-fria-tekoalyasetus` | mikä on FRIA, tekoälyasetus | tieto |

Hakumääriä ei ole vielä tarkistettu. Ne saa Google Ads -tilin Keyword Plannerista, ja hakusanat kannattaa tarkistaa sen perusteella ennen mainonnan aloittamista.

## Mitä hakukoneoptimointiin on rakennettu

- Yksi H1, yksilöllinen otsikko ja alle 155 merkin metakuvaus jokaisella sivulla. Tarkistin estää poikkeamat.
- Canonical-osoite, sivukartta, `robots.txt`, jakotiedot ja suomen kielimerkintä.
- Rakenteiset tiedot: organisaatio, palvelut hintoineen, artikkelit, murupolut ja usein kysytyt.
- Hinnat ovat HTML:ssä myös ilman JavaScriptiä, joten hakukone näkee ne kaikki.
- Sisäiset linkit palvelusivulta artikkeliin ja takaisin. Jokainen sivu on enintään kahden klikkauksen päässä etusivusta.
- Nopeus: ei kehystä selaimessa, ei kuvia ylätaitteessa, omat fontit. JavaScriptiä on vain hinnastossa, pikatestissä ja lomakkeella.
- Tietoturvaotsakkeet ja tiukka CSP. Ei ulkoisia resursseja eikä seurantaa.

## Ennen julkaisua

Tekniset estot:

```bash
npm run tarkista:julkaisu
```

Komento ei mene läpi, ennen kuin kaikki keltaiset Täydennä-kohdat on hoidettu ja `julkaistu: true` on asetettu.

1. Rekisteröi `complia.fi` ja tarkista nimi PRH:n kaupparekisteristä ja tavaramerkeistä.
2. Täytä tiedostoon `site.config.mjs` Y-tunnus, kun Complia GDPR Oy on perustettu (nimi, osoite ja puhelin lisätty 6.11.2026). Asiantuntijat ja julkaisut on lisätty 5.11.2026, kuvat puuttuvat. Molemmille on merkitty FM-tutkinto: varmista, että se pitää paikkansa.
3. Sivustolla ei ole lomakkeita eikä ajanvarausta (käyttäjän päätökset 6.11.2026). Yhteydenotot tulevat puhelimella tai sähköpostilla sivun `/yhteystiedot` kautta, joten sivuston tietosuojaseloste kattaa vain yhteydenotot ja asiakkuudet. GitHub Pagesia ei mainita selosteessa käyttäjän päätöksellä. Säilytysajat: kirjanpitolaki 2 luku 10 § (6 ja 10 vuotta), laki velan vanhentumisesta 4 § (3 vuotta) ja yhteydenotot 12 kuukautta (oma päätös, ei lakisääteinen).
4. Päätä hosting ja täydennä `/tietosuoja`. Tee saavutettavuusarviointi ja täydennä `/saavutettavuus`.
5. Tee kuntien palvelukuvaus (PDF). Käsittelysopimus ja toimitusehdot ovat luonnoksina sivuilla `/kasittelysopimus` ja `/toimitusehdot`, ja juristin pitää tarkistaa ne. Ennen julkaisua pitää selvittää:
   - että työkalun tietokanta on EU-alueella
   - kenen nimissä työkalun pilvisopimus on, jotta käsittelijäksi kirjataan oikea yhtiö
   - sähköpostipalvelu ja muut alikäsittelijät
6. Heikki ja Miika lukevat kaikki tekstit läpi, koska artikkeleissa on heidän nimensä. Tarkista lopuksi nämä, koska ne voivat muuttua:
   - HE 46/2026 (seuraamusmaksut viranomaisille), oli vireillä 5.11.2026
   - PeVL 40/2026:n sisältö: lausuntoa ei saatu luettua alkuperäisenä
   - Digital Omnibus (ilmoitusaika 96 tuntia), ei voimassa 5.11.2026
   - Omnibus IV (selostevelvollisuus alle 750 hengelle), hyväksymisestä ei löytynyt vahvistusta
   - FRIA:n soveltamispäivä 2.12.2027: asetus (EU) 2026/1744, päivä on epävirallisista lähteistä, ei virallisesta tekstistä
   - SURF:n Copilot-arvio: artikkelissa on syyskuun 2025 päivitys, toukokuun 2026 päivitystä ei ole luettu alkuperäisenä
   - Ohjelmistoartikkelien toimittajatiedot: Microsoft, Google ja Anthropic muuttavat ehtojaan, joten tarkista ne ennen julkaisua ja sen jälkeen neljännesvuosittain
   - EDPB:n oikeutetun edun ohje 1/2024: lopullista versiota ei varmistettu
   - Data Privacy Framework: valitus C-703/25 P ja toimittajien sertifioinnit, erityisesti Anthropic, josta lähteet olivat ristiriitaisia
   - Tietosuoja kuntoon -nimi: `tietosuojakuntoon.fi` on Opsec Oy:n rekisteröimä
7. Julkaisupäivänä: Google Search Console ja Bing Webmaster Tools, sivukartan lähetys, `www`-osoitteen uudelleenohjaus.
