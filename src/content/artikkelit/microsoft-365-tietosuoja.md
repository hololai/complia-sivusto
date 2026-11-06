---
h1: "Microsoft 365 ja tietosuoja: mitä organisaation pitää tarkistaa"
otsikko: "Microsoft 365 ja tietosuoja: GDPR-tarkistuslista | Complia"
kuvaus: "Onko Microsoft 365 (O365) GDPR:n mukainen? Se riippuu käytöstä. Katso tietosuojan tarkistuslista, vaikutustenarvioinnin tarve ja hinnat."
tiivistelma: "Sopimus, EU Data Boundary, jaot, säilytysajat ja vaikutustenarvioinnin tarve."
hakusana: microsoft 365 tietosuoja
kohde: molemmat
ryhma: ohjelmistot
jarjestys: 9
julkaistu: 2026-11-05
paivitetty: 2026-11-05
palvelu: vaikutustenarviointi
liittyvat:
  - microsoft-365-copilot-tietosuoja
  - mika-on-tia-tiedonsiirto
  - milloin-vaikutustenarviointi-on-pakollinen
kehotus:
  otsikko: "Haluatko arvion omasta ympäristöstänne?"
  teksti: "Teemme Microsoft 365:n vaikutustenarvioinnin 5–10 arkipäivässä, alkaen {{m365.pieni}} (alv 0 %)."
  nappi: "Katso vaikutustenarviointi"
  linkki: "/vaikutustenarviointi"
usein:
  - k: "Onko Microsoft 365 GDPR:n mukainen?"
    v: "Ohjelmisto ei yksin tee organisaatiosta lainmukaista. Microsoft tarjoaa sopimukset ja asetukset, mutta rekisterinpitäjänä te vastaatte siitä, miten palvelua käytetään."
  - k: "Riittääkö EU Data Boundary?"
    v: "Se vähentää siirtoja, mutta ei korvaa omaa arviota. Rajaus ei kata kaikkea, ja asetukset, jaot ja säilytysajat ovat yhä teidän vastuullanne."
  - k: "Tarvitaanko Microsoft 365:lle aina vaikutustenarviointi?"
    v: "Ei aina. Tarve riippuu tiedoista ja käyttötavasta. Jos ratkaisu ei ole selvä, ennakkoarvio kertoo sen ja dokumentoi perustelun."
lahteet:
  - nimi: "Microsoft: What is the EU Data Boundary?"
    url: "https://learn.microsoft.com/en-us/privacy/eudb/eu-data-boundary-learn"
  - nimi: "Microsoft: EU Data Boundaryn valmistuminen helmikuussa 2025"
    url: "https://blogs.microsoft.com/on-the-issues/2025/02/26/microsoft-completes-landmark-eu-data-boundary-offering-enhanced-data-residency-and-transparency/"
  - nimi: "Tietosuoja-asetus (EU) 2016/679, 28 ja 35 artikla"
    url: "https://eur-lex.europa.eu/legal-content/FI/TXT/?uri=CELEX:32016R0679"
  - nimi: "Laki yksityisyyden suojasta työelämässä 759/2004"
    url: "https://www.finlex.fi/fi/lainsaadanto/2004/759"
---

Microsoft 365 (entinen Office 365) on monen organisaation tärkein henkilötietojen käsittelypaikka: siellä ovat sähköpostit, tiedostot, kalenterit ja Teams-keskustelut. Microsoft on käsittelijä ja tarjoaa sopimukset ja asetukset, mutta rekisterinpitäjänä te vastaatte siitä, miten palvelua käytetään.

## Mitä Microsoft hoitaa ja mitä te hoidatte?

| Asia | Microsoft | Te |
|---|---|---|
| Sopimus | käsittelysopimus (Data Protection Addendum) | varmistatte, että se kattaa tilauksenne |
| Tietojen sijainti | EU Data Boundary -sitoumus | tarkistatte ympäristön sijainnin ja poikkeukset |
| Käyttöoikeudet | työkalut | päätätte, kuka näkee mitä |
| Säilytysajat | työkalut, kuten Purview | määrittelette ajat |
| Läpinäkyvyys | palvelun kuvaukset | kerrotte käsittelystä tietosuojaselosteessa |

## Tarkistuslista

1. **Onko käsittelysopimus voimassa?** Tarkistakaa, että sopimus kattaa käyttämänne tilauksen, ja säilyttäkää voimassa oleva versio.
2. **Missä tiedot sijaitsevat?** Microsoft sitoutuu EU Data Boundaryssa tallentamaan ja käsittelemään asiakastiedot ja pseudonymisoidut henkilötiedot EU:ssa ja EFTA-maissa. Rajaus ei kata aivan kaikkea, joten poikkeukset kannattaa käydä läpi.
3. **Millä perusteella tietoja siirtyy?** Jos tietoja siirtyy EU:n ulkopuolelle, selvittäkää siirtoperuste. Vakiosopimuslausekkeilla tehty siirto edellyttää [siirtovaikutusten arviointia](/artikkelit/mika-on-tia-tiedonsiirto).
4. **Ovatko jaot kunnossa?** Tarkistakaa SharePointin, OneDriven ja Teamsin jaot sekä ulkoiset käyttäjät. Vanhat "kaikille organisaatiossa" -jaot ovat yleisin ongelma.
5. **Onko säilytysajat määritelty?** Sähköpostit ja Teams-keskustelut jäävät helposti säilöön rajatta, jos asiasta ei ole päätetty.
6. **Seurataanko työntekijöitä?** Lokit, Teams-analytiikka ja työskentelyn raportointi voivat olla seurantaa. Tarkistakaa työelämän tietosuojalain ja yhteistoimintavelvoitteiden vaatimukset.
7. **Mitä palvelu- ja diagnostiikkatietoja kerätään?** Selvittäkää, mitä tietoja palvelu kerää käytöstä, ja kuvatkaa ne arvioinnissa.
8. **Onko käsittely kuvattu?** Microsoft 365 kuuluu sekä [työntekijöiden tietosuojaselosteeseen](/tietosuojaseloste) että [selosteeseen käsittelytoimista](/seloste-kasittelytoimista).

## Tarvitaanko vaikutustenarviointi?

Ei automaattisesti. Arviointi on yleensä perusteltu, jos palvelussa käsitellään arkaluonteisia tietoja laajasti, työntekijöitä seurataan järjestelmällisesti tai palvelua käyttää laaja organisaatio. Työntekijät ovat Euroopan tietosuojaviranomaisten ohjeen mukaan haavoittuvassa asemassa, joten kaksi [yhdeksästä kriteeristä](/artikkelit/milloin-vaikutustenarviointi-on-pakollinen) täyttyy helposti.

Jos ratkaisu ei ole selvä, [ennakkoarvio](/tarvitaanko-vaikutustenarviointi) kertoo sen ja dokumentoi perustelun, hintaan {{ennakkoarvio.pieni}}.

## Mitä arviointi maksaa?

| Laajuus | Pieni | Keskikokoinen | Laaja |
|---|---|---|---|
| Microsoft 365 | {{m365.pieni}} | {{m365.keski}} | {{m365.laaja}} |
| Microsoft 365 ja Copilot | {{copilot.pieni}} | {{copilot.keski}} | {{copilot.laaja}} |

Hinnat alv 0 %, ja niihin sisältyvät ennakkoarvio ja kirjaukset selosteisiin. Copilot muuttaa arvioinnin sisältöä, koska tekoäly pääsee käyttäjän tietoihin: lue [Copilotin tietosuojaohje](/artikkelit/microsoft-365-copilot-tietosuoja) ja katso [kaikki hinnat](/hinnasto#jarjestelmat).
