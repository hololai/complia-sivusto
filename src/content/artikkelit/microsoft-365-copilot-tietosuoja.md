---
h1: "Microsoft 365 Copilot ja tietosuoja: tarvitaanko vaikutustenarviointi?"
otsikko: "Microsoft 365 Copilot ja tietosuoja: DPIA-opas | Complia"
kuvaus: "Microsoft 365 Copilot näkee kaiken, mihin käyttäjällä on oikeus. Katso tietosuojan riskit, EU-asetukset, vaikutustenarvioinnin tarve ja hinnat."
tiivistelma: "Mitä Microsoft lupaa, mitkä asetukset pitää päättää ja milloin arviointi tarvitaan."
hakusana: copilot tietosuoja
kohde: molemmat
ryhma: ohjelmistot
jarjestys: 10
julkaistu: 2026-11-05
paivitetty: 2026-11-05
palvelu: vaikutustenarviointi
liittyvat:
  - microsoft-365-tietosuoja
  - tekoaly-tyopaikalla-tietosuoja
  - mika-on-lia-tasapainotesti
kehotus:
  otsikko: "Otatteko Copilotin käyttöön?"
  teksti: "Ennakkoarvio valmistuu kahdessa arkipäivässä. Esimerkki: 25 hengen yritys, ennakkoarvio ja tarvittaessa vaikutustenarviointi, enintään {{esim.copilot}} (alv 0 %)."
  nappi: "Tilaa ennakkoarvio"
  linkki: "/tarvitaanko-vaikutustenarviointi"
usein:
  - k: "Koulutetaanko Copilotin malleja meidän tiedoillamme?"
    v: "Microsoftin mukaan kehotteita, vastauksia ja Microsoft Graphin kautta haettuja tietoja ei käytetä perusmallien kouluttamiseen."
  - k: "Tarvitseeko Copilot perusoikeusvaikutusten arvioinnin (FRIA)?"
    v: "Tavallisessa toimistotyössä yleensä ei, koska silloin se ei ole suuririskinen järjestelmä. Tilanne voi muuttua, jos Copilotilla esimerkiksi karsitaan työnhakijoita."
  - k: "Kuka voi ottaa Claude-mallit käyttöön Copilotissa?"
    v: "EU:ssa ne ovat oletuksena pois päältä, ja ylläpitäjä voi ottaa ne käyttöön. Koska ne ovat EU Data Boundaryn ulkopuolella, päätös kannattaa perustella ja kirjata."
lahteet:
  - nimi: "Microsoft: Data, privacy, and security for Microsoft Copilot"
    url: "https://learn.microsoft.com/en-us/copilot/microsoft-365/microsoft-365-copilot-privacy"
  - nimi: "Microsoft: Claude models from Anthropic in Microsoft Online Services"
    url: "https://learn.microsoft.com/en-us/copilot/microsoft-365/connect-to-ai-subprocessor"
  - nimi: "Microsoft: Manage public web access"
    url: "https://learn.microsoft.com/en-us/copilot/microsoft-365/manage-public-web-access"
  - nimi: "Privacy Company: Update DPIA on Microsoft 365 Copilot for education"
    url: "https://www.privacycompany.eu/blog/update-dpia-on-microsoft-365-copilot-for-education"
  - nimi: "Euroopan tietosuojaviranomaisten ohje vaikutustenarvioinnista (WP 248)"
    url: "https://ec.europa.eu/newsroom/article29/items/611236"
---

Microsoft 365 Copilot ei anna kenellekään uutta oikeutta nähdä tietoja, mutta se tuo nopeasti esiin kaiken, mihin käyttäjällä on jo pääsy. Siksi Copilotin käyttöönotto on tietosuojan kannalta suurempi muutos kuin uusi toimisto-ohjelma: vanhat jaot ja tallennustavat alkavat yhtäkkiä vaikuttaa.

## Mitä Microsoft kertoo?

Microsoftin ohjeiden mukaan (tilanne marraskuussa 2026):

- Kehotteita, vastauksia ja Microsoft Graphin kautta haettuja tietoja ei käytetä perusmallien kouluttamiseen.
- Copilot näyttää organisaation tietoja vain, jos käyttäjällä on niihin vähintään katseluoikeus.
- Copilot kuuluu EU-asiakkailla EU Data Boundaryn piiriin.
- Anthropicin Claude-mallit eivät kuulu EU Data Boundaryyn, ja EU:ssa ne ovat oletuksena pois päältä.
- Verkkohaku lähettää kehotteesta muodostetun hakukyselyn Bing-palveluun. Koko kehote tai kokonaiset tiedostot eivät lähde sen mukana, ja ylläpitäjä voi hallita asetusta.

Nämä ovat lähtötietoja, eivät valmis arvio. Te päätätte asetuksista ja käyttötavasta.

## Mitä pitää päättää ja korjata?

| Riski | Mitä se tarkoittaa | Mitä tehdä |
|---|---|---|
| Liian laajat jaot | Copilot tuo esiin palkka- tai henkilöstötietoja väärälle ihmiselle | korjaa SharePointin, OneDriven ja Teamsin jaot ennen käyttöönottoa |
| Virheelliset tiedot | vastaus voi sisältää väärää tai puutteellista tietoa ihmisestä | ohjeista, että käyttäjä tarkistaa tuloksen |
| Säilytys | keskusteluhistoria säilyy, ellei toisin päätetä | määritä säilytysajat, esimerkiksi Purview'ssa |
| Työntekijöiden seuranta | käyttötiedoista voi tehdä päätelmiä työskentelystä | selvitä työelämän tietosuojalaki ja yhteistoiminta |
| Agentit ja laajennukset | tiedot voivat liikkua kolmannelle osapuolelle | tarkista kunkin agentin ehdot |
| Claude-mallit ja verkkohaku | käsittely voi laajeta EU Data Boundaryn ulkopuolelle | tee päätös asetuksista ja kirjaa perustelu |

## Tarvitaanko vaikutustenarviointi?

Usein kyllä. Uusi teknologia ja työntekijöiden tiedot täyttävät jo kaksi Euroopan tietosuojaviranomaisten [yhdeksästä kriteeristä](/artikkelit/milloin-vaikutustenarviointi-on-pakollinen), ja laajassa käytössä mukaan tulee myös laajamittaisuus. Vähintään tarve kannattaa arvioida ja perustelu kirjata.

Malliksi käy Alankomaiden arviointi. SLM ja SURF löysivät Copilotista joulukuussa 2024 neljä korkeaa riskiä. Koulutusalan lisenssejä koskevassa päivityksessä syyskuussa 2025 korkeita riskejä ei enää ollut, mutta kaksi jäi keskitasolle: virheelliset henkilötiedot vastauksissa ja metatietojen 18 kuukauden säilytysaika. Alhaiset riskit edellyttivät, että organisaatio tekee suositellut toimet.

Sama arvio ei sellaisenaan sovi teille, koska lisenssit, asetukset ja tiedot ovat erilaiset.

## Mitä muuta voidaan tarvita?

- [Tasapainotesti](/artikkelit/mika-on-lia-tasapainotesti), jos käsittely perustuu oikeutettuun etuun.
- [Siirtovaikutusten arviointi](/artikkelit/mika-on-tia-tiedonsiirto), jos tiedot siirtyvät EU:n ulkopuolelle vakiosopimuslausekkeilla.
- Henkilöstön ohje siitä, mitä Copilotiin saa kirjoittaa. Mallin saat [tekoälyn tarkistuslistasta](/artikkelit/tekoaly-tyopaikalla-tietosuoja).

Tasapainotesti ja siirtojen arviointi sisältyvät vaikutustenarviointimme hintaan, kun niitä tarvitaan.

## Mitä arviointi maksaa?

Microsoft 365:n ja Copilotin vaikutustenarviointi maksaa koon mukaan {{copilot.pieni}}, {{copilot.keski}} tai {{copilot.laaja}} (alv 0 %). Hintaan sisältyvät ennakkoarvio ja kirjaukset selosteisiin. Katso [kaikki ohjelmistot](/hinnasto#jarjestelmat) ja [esimerkkikokonaisuudet](/hinnasto#kokonaisuudet).
