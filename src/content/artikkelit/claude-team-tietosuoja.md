---
h1: "Claude Team ja tietosuoja: mitä organisaation pitää tarkistaa"
otsikko: "Claude Team ja tietosuoja: GDPR-tarkistuslista | Complia"
kuvaus: "Claude Team -käyttöönoton tietosuoja: käsittelysopimus, tietojen sijainti, säilytysajat, siirtovaikutusten arviointi ja vaikutustenarvioinnin hinnat."
tiivistelma: "Sopimus, koulutus, säilytysajat, tietojen sijainti ja siirtojen arviointi."
hakusana: claude team tietosuoja
kohde: molemmat
ryhma: ohjelmistot
jarjestys: 13
julkaistu: 2026-11-05
paivitetty: 2026-11-05
palvelu: vaikutustenarviointi
liittyvat:
  - tekoaly-tyopaikalla-tietosuoja
  - mika-on-tia-tiedonsiirto
  - mika-on-lia-tasapainotesti
kehotus:
  otsikko: "Otatteko Claude Teamin käyttöön?"
  teksti: "Vaikutustenarviointi alkaen {{claude.pieni}} ja siirtovaikutusten arviointi alkaen {{tia.pieni}} (alv 0 %). Esimerkki: 25 hengen yritys, molemmat yhteensä {{esim.claudekeski}}."
  nappi: "Katso vaikutustenarviointi"
  linkki: "/vaikutustenarviointi"
usein:
  - k: "Koulutetaanko Clauden malleja meidän tiedoillamme?"
    v: "Anthropicin mukaan kaupallisten tuotteiden syötteitä ja tuotoksia ei oletuksena käytetä koulutukseen. Poikkeus on se, jos käyttäjä antaa palautetta esimerkiksi peukalopainikkeella tai organisaatio sallii käytön."
  - k: "Sopiiko henkilökohtainen Claude Pro työkäyttöön?"
    v: "Ei henkilötietojen käsittelyyn. Free, Pro ja Max ovat kuluttajatuotteita, joihin sovelletaan eri ehtoja, eikä niihin kuulu organisaation käsittelysopimusta."
  - k: "Tarvitaanko siirtovaikutusten arviointi?"
    v: "Yleensä se on syytä tehdä, koska Anthropicin mukaan tiedot tallennetaan Yhdysvalloissa ja sen käsittelysopimukseen kuuluvat vakiosopimuslausekkeet. Tarkistakaa myös Data Privacy Framework -listan tilanne."
lahteet:
  - nimi: "Miinin, Kähkönen ja Laivamaa: Tekoälypalvelun vaikutustenarviointi (aoe.fi, 2025)"
    url: "https://aoe.fi/materiaali/4848"
  - nimi: "Anthropic: käsittelysopimus (DPA)"
    url: "https://privacy.claude.com/en/articles/7996862"
  - nimi: "Anthropic: tietojen käyttö mallien koulutukseen"
    url: "https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-model-training"
  - nimi: "Anthropic: säilytysajat kaupallisissa tuotteissa"
    url: "https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data"
  - nimi: "Anthropic: palvelinten sijainti"
    url: "https://privacy.claude.com/en/articles/7996890-where-are-your-servers-located-do-you-host-your-models-on-eu-servers"
  - nimi: "Data Privacy Framework -lista"
    url: "https://www.dataprivacyframework.gov/list"
---

Claude Team on Anthropicin tekoälytyökalu organisaatioille. Toisin kuin Copilot ja Gemini, se ei ole osa toimisto-ohjelmistoa, joten arvio on oletuksena suppeampi. Tietosuojan kannalta ratkaisevaa on kuitenkin se, mitä työkaluun kirjoitetaan ja mihin se liitetään.

## Mitä Anthropic kertoo?

| Asia | Anthropicin ohje (tilanne marraskuussa 2026) | Mitä tarkistaa |
|---|---|---|
| Sopimus | käsittelysopimus vakiosopimuslausekkeineen kuuluu kaupallisiin ehtoihin | että käytössä on kaupallinen tuote, ja säilytä voimassa oleva versio |
| Koulutus | kaupallisten tuotteiden tietoja ei oletuksena käytetä koulutukseen | että palautepainikkeen merkitys on kerrottu käyttäjille |
| Säilytys | poistettu keskustelu katoaa historiasta heti ja palvelimilta 30 päivässä | mitä säilytysaikaa itse noudatatte |
| Poikkeukset | käyttökäytännön rikkomiseksi merkityt syötteet ja tuotokset enintään 2 vuotta ja luokittelupisteet enintään 7 vuotta; lisäksi tietyissä malleissa rajattu säilytys ja tarkastus turvallisuussyistä | että asiat on kuvattu arvioinnissa |
| Sijainti | tiedot tallennetaan Yhdysvalloissa, ja liikenne voi kulkea Yhdysvaltojen, Euroopan, Aasian ja Australian kautta | siirtoperuste ja arviointi |

## Tarkistuslista

1. **Onko käytössä Team eikä henkilökohtainen tili?** Free, Pro ja Max ovat kuluttajatuotteita, joihin sovelletaan eri ehtoja. Kartoittakaa, käyttääkö joku niitä työssä.
2. **Mitä työkaluun saa kirjoittaa?** Kertokaa henkilöstön ohjeessa selvästi, mitä ei saa kirjoittaa: esimerkiksi henkilötunnuksia, terveystietoja ja asiakkaiden yksilöiviä tietoja, ellei käyttöä ole erikseen arvioitu.
3. **Mihin Claude on liitetty?** Jos sen liittää sähköpostiin, tiedostoihin tai muihin järjestelmiin, käsittely laajenee. Arvioikaa jokainen liitäntä ja rajatkaa käyttöoikeudet.
4. **Mikä on siirtoperuste?** Koska tiedot tallennetaan Yhdysvalloissa, [siirtovaikutusten arviointi](/artikkelit/mika-on-tia-tiedonsiirto) on syytä tehdä, ellei siirto perustu riittävyyspäätökseen. Tarkistakaa [Data Privacy Framework -lista](https://www.dataprivacyframework.gov/list) ja sopijaosapuoli.
5. **Mikä on käsittelyperuste?** Jos peruste on oikeutettu etu, tehkää [tasapainotesti eli oikeutetun edun arviointi](/artikkelit/mika-on-lia-tasapainotesti).
6. **Koskeeko käyttö työntekijöitä?** Jos työkalun käytöstä kerätään tietoa työskentelystä, tarkistakaa työelämän tietosuojalain ja yhteistoimintavelvoitteiden vaatimukset.
7. **Onko käsittely kuvattu?** Claude kuuluu [selosteeseen käsittelytoimista](/seloste-kasittelytoimista) ja tarvittaessa [tietosuojaselosteeseen](/tietosuojaseloste).

## Claude Copilotin kautta on eri asia

Claude-mallit voivat olla käytössä myös Microsoft 365 Copilotissa. Silloin sopimus ja asetukset määräytyvät Microsoftin mukaan, ja mallit ovat EU Data Boundaryn ulkopuolella. Lue lisää [Copilotin tietosuojaohjeesta](/artikkelit/microsoft-365-copilot-tietosuoja).

## Tarvitaanko vaikutustenarviointi?

Se riippuu käytöstä. Tekstien luonnostelu ilman henkilötietoja on eri asia kuin asiakastietojen tai työntekijöiden tietojen analysointi. Uusi teknologia ja työntekijöiden tiedot täyttävät jo kaksi [yhdeksästä kriteeristä](/artikkelit/milloin-vaikutustenarviointi-on-pakollinen). Jos ratkaisu ei ole selvä, [ennakkoarvio](/tarvitaanko-vaikutustenarviointi) kertoo sen ja dokumentoi perustelun.

## Mitä arviointi maksaa?

| Arviointi | Pieni | Keskikokoinen | Laaja |
|---|---|---|---|
| Vaikutustenarviointi: Claude Team | {{claude.pieni}} | {{claude.keski}} | {{claude.laaja}} |
| Siirtovaikutusten arviointi (TIA) | {{tia.pieni}} | {{tia.keski}} | {{tia.laaja}} |

Hinnat alv 0 %. Jos Claude liitetään sähköpostiin tai tiedostoihin, arvio laajenee. Katso [kaikki hinnat](/hinnasto#ohjelmistot).
