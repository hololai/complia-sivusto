# Complia: sivu- ja SEO-suunnitelma

Päivitetty 5.11.2026. Pohjana on [nettisivusuunnitelma](../../02-Nettisivusuunnitelma.docx). Tähän on kirjattu, mitä siitä poikettiin ja miksi.

## Päätökset

| Asia | Päätös | Peruste |
|---|---|---|
| Nimi ja osoite | Complia, `complia.fi` | Käyttäjän päätös 5.11.2026. Verkkotunnus oli sinä päivänä vapaa, mutta sitä ei ole vielä rekisteröity. |
| Slogan | **Tietosuoja ja GDPR kuntoon kiinteällä hinnalla** | Sisältää hakusanat ja erottautumisen. Näkyy etusivun otsikossa ja H1:ssä, yläpalkissa, alatunnisteessa, jakokuvassa ja rakenteisissa tiedoissa. |
| Vanha iskulause | "Me teemme, sinä hyväksyt." säilyy tekstissä | Kertoo työtavan, mutta ei sisällä hakusanoja. |
| Toteutus | Astro, staattiset sivut | Selaimeen ei mene kehystä. Sivut toimivat missä tahansa palvelimella, joten hostingin voi vaihtaa myöhemmin. |
| Hosting | Firebase Hosting, yksityinen GitHub-repo | Otsakkeet, uudelleenohjaukset ja siistit osoitteet toimivat, ja yksityinen repo on ilmainen. GitHub Pages ei salli omia otsakkeita, ja yksityisestä reposta se vaatii maksullisen tilin. Ei vielä julkaistu. |
| Sijainti repossa | `sivusto/` omana kansionaan | Markkinointisuunnitelma ja budjetit pysyvät repon ulkopuolella, vaikka repo joskus muuttuisi julkiseksi. |

### Ratkaistava ennen julkaisua: "hosting EU:ssa"

Suunnitelma lupaa hostingin EU:ssa, mutta Firebase Hosting jakaa sisällön maailmanlaajuisen verkon kautta, eikä aluetta voi rajata. Sivuston oma tietosuoja on samalla näyte osaamisesta, joten tästä pitää päättää: joko Firebase kuvataan tietosuojaselosteessa tai sivut siirretään EU-palvelimelle. Sivut ovat staattisia, joten siirto ei vaadi muutoksia eikä haittaa hakunäkyvyyttä, jos osoite säilyy.

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
| Hinnasto | `/hinnasto` | tietosuojaseloste hinta | osto |
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
2. Täytä tiedostoon `site.config.mjs` yrityksen tiedot ja asiantuntija. Nimetty asiantuntija on tärkeä luottamustekijä, koska aihe on oikeudellinen.
3. Päätä lomakkeen vastaanottaja ja EU:ssa toimiva ajanvarauskalenteri. Lomake avaa toistaiseksi sähköpostin.
4. Päätä hosting ja täydennä `/tietosuoja`. Tee saavutettavuusarviointi ja täydennä `/saavutettavuus`.
5. Tee kuntien palvelukuvaus (PDF) ja käsittelysopimuspohja.
6. Asiantuntija lukee kaikki tekstit läpi. Tarkista lopuksi nämä, koska ne voivat muuttua:
   - HE 46/2026 (seuraamusmaksut viranomaisille), oli vireillä 5.11.2026
   - PeVL 40/2026:n sisältö: lausuntoa ei saatu luettua alkuperäisenä
   - Digital Omnibus (ilmoitusaika 96 tuntia), ei voimassa 5.11.2026
   - Omnibus IV (selostevelvollisuus alle 750 hengelle), hyväksymisestä ei löytynyt vahvistusta
   - Tietosuoja kuntoon -nimi: `tietosuojakuntoon.fi` on Opsec Oy:n rekisteröimä
7. Julkaisupäivänä: Google Search Console ja Bing Webmaster Tools, sivukartan lähetys, `www`-osoitteen uudelleenohjaus.
