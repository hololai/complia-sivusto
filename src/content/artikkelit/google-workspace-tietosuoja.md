---
h1: "Google Workspace ja tietosuoja: mitä organisaation pitää tarkistaa"
otsikko: "Google Workspace ja tietosuoja: GDPR-tarkistuslista | Complia"
kuvaus: "Onko Google Workspace GDPR:n mukainen? Se riippuu käytöstä. Katso tietosuojan tarkistuslista, data-alueet, arvioinnin tarve ja hinnat."
tiivistelma: "Käsittelysopimus, data-alueet, jaot, säilytysajat ja vaikutustenarvioinnin tarve."
hakusana: google workspace tietosuoja
kohde: molemmat
ryhma: ohjelmistot
jarjestys: 11
julkaistu: 2026-11-05
paivitetty: 2026-11-05
palvelu: vaikutustenarviointi
liittyvat:
  - google-gemini-tietosuoja
  - mika-on-tia-tiedonsiirto
  - milloin-vaikutustenarviointi-on-pakollinen
kehotus:
  otsikko: "Haluatko arvion omasta ympäristöstänne?"
  teksti: "Teemme Google Workspacen vaikutustenarvioinnin 5–10 arkipäivässä, alkaen {{workspace.pieni}} (alv 0 %)."
  nappi: "Katso vaikutustenarviointi"
  linkki: "/vaikutustenarviointi"
usein:
  - k: "Onko Google Workspace GDPR:n mukainen?"
    v: "Ohjelmisto ei yksin tee organisaatiosta lainmukaista. Google tarjoaa sopimuksen ja asetukset, mutta rekisterinpitäjänä te vastaatte siitä, miten palvelua käytetään."
  - k: "Pysyvätkö tiedot EU:ssa, jos valitsen Euroopan data-alueen?"
    v: "Asetus koskee vain sen kattamia tietoja, eikä se ole käytettävissä kaikissa versioissa. Tarkistakaa versionne ja se, mitä tietoja asetus koskee."
  - k: "Saako yrityksen asioita hoitaa tavallisella Gmailillä?"
    v: "Ei kannata. Yrityksen sopimus ja asetukset koskevat Workspace-tiliä, joten asiakkaiden tietoja ei pidä käsitellä henkilökohtaisella tilillä."
lahteet:
  - nimi: "Google: Privacy compliance and records for Google Workspace"
    url: "https://support.google.com/a/answer/3407074?hl=en"
  - nimi: "Google: Choose a geographic location for your data"
    url: "https://support.google.com/a/answer/7630496?hl=en"
  - nimi: "Tietosuoja-asetus (EU) 2016/679, 28 ja 35 artikla"
    url: "https://eur-lex.europa.eu/legal-content/FI/TXT/?uri=CELEX:32016R0679"
  - nimi: "Data Privacy Framework -lista"
    url: "https://www.dataprivacyframework.gov/list"
---

Google Workspacessa ovat organisaation sähköpostit, tiedostot, kalenterit ja kokoukset, joten siellä käsitellään paljon henkilötietoja. Google on käsittelijä ja tarjoaa sopimuksen ja asetukset, mutta rekisterinpitäjänä te vastaatte siitä, miten palvelua käytetään.

## Mitä Google hoitaa ja mitä te hoidatte?

| Asia | Google | Te |
|---|---|---|
| Sopimus | Cloud Data Processing Addendum (CDPA) | varmistatte, että se kuuluu sopimukseenne |
| Tietojen sijainti | data-alueet tuetuissa versioissa | valitsette alueen ja tarkistatte sen kattavuuden |
| Käyttöoikeudet | työkalut | päätätte, kuka näkee mitä |
| Säilytysajat | työkalut, kuten Vault | määrittelette ajat |
| Läpinäkyvyys | palvelun kuvaukset | kerrotte käsittelystä tietosuojaselosteessa |

## Tarkistuslista

1. **Onko käytössä Workspace eikä henkilökohtainen tili?** Yrityksen sopimus ja asetukset koskevat Workspace-tiliä. Kartoittakaa, käsitteleekö joku työasioita henkilökohtaisessa Gmailissa.
2. **Onko käsittelysopimus voimassa?** Googlen mukaan CDPA pitää hyväksyä erikseen ylläpitokonsolissa vain, jos sopimuksenne ei jo sisällä sitä. Tarkistakaa asia ja kirjatkaa päivämäärä.
3. **Mikä data-alue on valittu?** Tallennussijainniksi voi valita Yhdysvallat, EU:n tai ei valintaa. Ominaisuus kuuluu muun muassa Business Standard-, Business Plus- ja Enterprise-versioihin, mutta ei Business Starteriin.
4. **Millä perusteella tietoja siirtyy?** Selvittäkää siirtoperuste. Tarkistakaa [Data Privacy Framework -listalta](https://www.dataprivacyframework.gov/list) sopijaosapuolen sertifiointi. Vakiosopimuslausekkeilla tehty siirto edellyttää [siirtovaikutusten arviointia](/artikkelit/mika-on-tia-tiedonsiirto).
5. **Ovatko jaot kunnossa?** Käykää läpi Driven jaetut asemat, linkkijaot ja ulkoiset käyttäjät.
6. **Onko säilytysajat määritelty?** Määritelkää, kuinka kauan sähköposteja, keskusteluja ja tiedostoja säilytetään.
7. **Seurataanko työntekijöitä?** Lokit ja raportit voivat olla seurantaa. Tarkistakaa työelämän tietosuojalain ja yhteistoimintavelvoitteiden vaatimukset.
8. **Onko käsittely kuvattu?** Workspace kuuluu [tietosuojaselosteisiin](/tietosuojaseloste) ja [selosteeseen käsittelytoimista](/seloste-kasittelytoimista).

## Tarvitaanko vaikutustenarviointi?

Ei automaattisesti. Arviointi on yleensä perusteltu, jos palvelussa käsitellään arkaluonteisia tietoja laajasti, työntekijöitä seurataan järjestelmällisesti tai palvelua käyttää laaja organisaatio. Katso [yhdeksän kriteeriä](/artikkelit/milloin-vaikutustenarviointi-on-pakollinen).

Kunnissa ja kouluissa mukana on usein lasten tietoja, joten tarve on syytä arvioida aina. Jos ratkaisu ei ole selvä, [ennakkoarvio](/tarvitaanko-vaikutustenarviointi) kertoo sen, hintaan {{ennakkoarvio.pieni}}.

## Mitä arviointi maksaa?

| Laajuus | Pieni | Keskikokoinen | Laaja |
|---|---|---|---|
| Google Workspace | {{workspace.pieni}} | {{workspace.keski}} | {{workspace.laaja}} |
| Google Workspace ja Gemini | {{gemini.pieni}} | {{gemini.keski}} | {{gemini.laaja}} |

Hinnat alv 0 %, ja niihin sisältyvät ennakkoarvio ja kirjaukset selosteisiin. Gemini muuttaa arvioinnin sisältöä, koska tekoäly pääsee käyttäjän tietoihin: lue [Geminin tietosuojaohje](/artikkelit/google-gemini-tietosuoja) ja katso [kaikki hinnat](/hinnasto#jarjestelmat).
