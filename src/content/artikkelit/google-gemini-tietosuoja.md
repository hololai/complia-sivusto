---
h1: "Gemini ja tietosuoja: Google Workspacen tekoäly työpaikalla"
otsikko: "Gemini ja tietosuoja: tekoäly Workspacessa | Complia"
kuvaus: "Gemini pääsee Workspacessa käyttäjän sähköposteihin ja tiedostoihin. Katso tietosuojan riskit, säilytysajat, vaikutustenarvioinnin tarve ja hinnat."
tiivistelma: "Mitä Google lupaa, kuinka kauan kehotteet säilyvät ja milloin arviointi tarvitaan."
hakusana: gemini tietosuoja
kohde: molemmat
ryhma: ohjelmistot
jarjestys: 12
julkaistu: 2026-11-05
paivitetty: 2026-11-05
palvelu: vaikutustenarviointi
liittyvat:
  - google-workspace-tietosuoja
  - tekoaly-tyopaikalla-tietosuoja
  - mika-on-lia-tasapainotesti
kehotus:
  otsikko: "Otatteko Geminin käyttöön?"
  teksti: "Ennakkoarvio valmistuu kahdessa arkipäivässä ja maksaa {{ennakkoarvio.pieni}}. Google Workspacen ja Geminin vaikutustenarviointi alkaen {{gemini.pieni}} (alv 0 %)."
  nappi: "Tilaa ennakkoarvio"
  linkki: "/tarvitaanko-vaikutustenarviointi"
usein:
  - k: "Käyttääkö Google tietojamme Geminin kouluttamiseen?"
    v: "Googlen mukaan Workspace ei käytä asiakastietoja mallien kouluttamiseen ilman asiakkaan lupaa tai ohjetta. Sitoumus on Workspacen palvelukohtaisissa ehdoissa."
  - k: "Koskevatko samat ehdot henkilökohtaista Gemini-tiliä?"
    v: "Eivät. Googlen sitoumukset koskevat tuettuja Workspace-versioita. Työasioita ei pidä käsitellä henkilökohtaisella tilillä."
  - k: "Tarvitseeko Gemini perusoikeusvaikutusten arvioinnin (FRIA)?"
    v: "Tavallisessa toimistotyössä yleensä ei. Tilanne voi muuttua, jos Geminillä esimerkiksi arvioidaan työnhakijoita tai oikeutta palveluun."
lahteet:
  - nimi: "Miinin, Kähkönen ja Laivamaa: Tekoälypalvelun vaikutustenarviointi (aoe.fi, 2025)"
    url: "https://aoe.fi/materiaali/4848"
  - nimi: "Google: Generative AI in Google Workspace Privacy Hub"
    url: "https://support.google.com/a/answer/15706919?hl=en"
  - nimi: "Google: Choose a geographic location for your data"
    url: "https://support.google.com/a/answer/7630496?hl=en"
  - nimi: "Euroopan tietosuojaviranomaisten ohje vaikutustenarvioinnista (WP 248)"
    url: "https://ec.europa.eu/newsroom/article29/items/611236"
---

Gemini on Google Workspacen tekoäly, joka voi hyödyntää käyttäjän sähköposteja, tiedostoja ja kalenteria. Se ei anna uutta oikeutta nähdä tietoja, mutta tuo nopeasti esiin kaiken, mihin käyttäjällä on jo pääsy. Siksi käyttöönotto on myös tietosuojapäätös.

## Mitä Google kertoo?

Googlen Workspace-ohjeiden mukaan (tilanne marraskuussa 2026):

- Kehotteet ovat asiakastietoa, johon sovelletaan Cloud Data Processing Addendumia.
- Workspace ei käytä asiakastietoja mallien kouluttamiseen ilman asiakkaan lupaa tai ohjetta.
- Gemini pääsee vain sisältöön, johon käyttäjällä on oikeus.
- Organisaation Driven ja Gmailin hyödyntäminen on oletuksena rajoitettu, kun tiedosto on jaettu organisaation ulkopuolelle.

Sitoumukset koskevat tuettuja Workspace-versioita. Henkilökohtainen Google-tili on eri asia, joten se pitää rajata pois henkilöstön ohjeessa.

## Kuinka kauan kehotteet säilyvät?

| Ominaisuus | Kehotteet ja vastaukset | Kuka päättää |
|---|---|---|
| Gemini Workspace-sovelluksissa | 90 päivästä toistaiseksi | ylläpitäjä |
| Gemini-sovellus | enintään 36 kuukautta | ylläpitäjä |
| Gemini Notebook | ei säilytetä istunnon jälkeen | ei asetusta |

Säilytysaika on päätös, joka kuuluu selosteeseen käsittelytoimista. Pelkkä oletusasetus ei ole perustelu.

## Mitä pitää päättää ja korjata?

| Riski | Mitä se tarkoittaa | Mitä tehdä |
|---|---|---|
| Liian laajat jaot | Gemini tuo esiin palkka- tai henkilöstötietoja väärälle ihmiselle | korjaa Driven jaot ennen käyttöönottoa |
| Virheelliset tiedot | vastaus voi sisältää väärää tietoa ihmisestä | ohjeista, että käyttäjä tarkistaa tuloksen |
| Säilytys | keskustelut voivat säilyä pitkään | päätä säilytysaika |
| Data-alue | asetus ei ole kaikissa versioissa | tarkista versio ja sen kattavuus |
| Työntekijöiden seuranta | käyttötiedoista voi tehdä päätelmiä työskentelystä | selvitä työelämän tietosuojalaki ja yhteistoiminta |
| Henkilökohtaiset tilit | yrityksen ehdot eivät päde | kiellä työasiat henkilökohtaisella tilillä |

## Tarvitaanko vaikutustenarviointi?

Usein kyllä. Uusi teknologia ja työntekijöiden tiedot täyttävät jo kaksi Euroopan tietosuojaviranomaisten [yhdeksästä kriteeristä](/artikkelit/milloin-vaikutustenarviointi-on-pakollinen), ja arviointi on silloin yleensä tarpeen. Jos käyttö on rajattua eikä ratkaisu ole selvä, [ennakkoarvio](/tarvitaanko-vaikutustenarviointi) dokumentoi perustelun.

Hintaan sisältyvät tarvittaessa [tasapainotesti](/artikkelit/mika-on-lia-tasapainotesti), jos käsittely perustuu oikeutettuun etuun, ja [siirtovaikutusten arviointi](/artikkelit/mika-on-tia-tiedonsiirto), jos siirto perustuu vakiosopimuslausekkeisiin. Työkalun perusasiat ovat [Google Workspacen tietosuojaohjeessa](/artikkelit/google-workspace-tietosuoja).

## Mitä arviointi maksaa?

Google Workspacen ja Geminin vaikutustenarviointi maksaa koon mukaan {{gemini.pieni}}, {{gemini.keski}} tai {{gemini.laaja}} (alv 0 %). Katso [kaikki ohjelmistot](/hinnasto#jarjestelmat) ja [esimerkkikokonaisuudet](/hinnasto#kokonaisuudet).
