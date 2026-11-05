---
h1: "Mikä on TIA? Näin arvioit tietojen siirron EU:n ulkopuolelle"
otsikko: "Mikä on TIA? Tietojen siirto EU:n ulkopuolelle | Complia"
kuvaus: "TIA arvioi, ovatko EU:n ulkopuolelle siirtyvät henkilötiedot suojassa. Katso, milloin se tarvitaan, kuusi vaihetta ja yleisimmät virheet."
tiivistelma: "Milloin TIA tarvitaan, arvioinnin kuusi vaihetta ja yleisimmät virheet."
hakusana: tia eu ulkopuolelle
kohde: molemmat
ryhma: arvioinnit
jarjestys: 15
julkaistu: 2026-11-05
paivitetty: 2026-11-05
palvelu: tia
liittyvat:
  - claude-team-tietosuoja
  - microsoft-365-tietosuoja
  - google-workspace-tietosuoja
kehotus:
  otsikko: "Haluatko arvioinnin valmiina?"
  teksti: "Teemme siirtovaikutusten arvioinnin kolmessa arkipäivässä, alkaen {{tia.pieni}} toimittajaa kohden (alv 0 %)."
  nappi: "Katso siirtovaikutusten arviointi"
  linkki: "/siirtovaikutusten-arviointi"
usein:
  - k: "Kuka TIA:n tekee?"
    v: "Vastuu on tietojen viejällä yhdessä tietojen tuojan kanssa. Toimittajan valmis aineisto auttaa, mutta arvion pitää koskea teidän tietojanne ja käyttötapaanne."
  - k: "Onko etäpääsy siirto?"
    v: "Kyllä. Jos tukihenkilö tai alihankkija pääsee tietoihin EU:n ulkopuolelta, kyse on siirrosta, vaikka palvelin sijaitsisi EU:ssa."
  - k: "Kuinka usein arvio päivitetään?"
    v: "Kun toimittaja, alihankkija, siirrettävät tiedot tai kohdemaan lainsäädäntö muuttuu. Lisäksi arvio kannattaa tarkistaa säännöllisesti."
lahteet:
  - nimi: "EU-tuomioistuin: Schrems II, C-311/18"
    url: "https://eur-lex.europa.eu/legal-content/FI/TXT/?uri=CELEX:62018CJ0311"
  - nimi: "Euroopan tietosuojaneuvosto: suositus 01/2020 lisätoimenpiteistä"
    url: "https://www.edpb.europa.eu/our-work-tools/our-documents/recommendations/recommendations-012020-measures-supplement-transfer_en"
  - nimi: "Tietosuoja-asetus (EU) 2016/679, 44–46 artikla"
    url: "https://eur-lex.europa.eu/legal-content/FI/TXT/?uri=CELEX:32016R0679"
  - nimi: "Data Privacy Framework -lista"
    url: "https://www.dataprivacyframework.gov/list"
---

TIA tulee englannin sanoista transfer impact assessment. Suomeksi se on siirtovaikutusten arviointi. Sillä selvitetään, ovatko EU:n ja ETA:n ulkopuolelle siirtyvät henkilötiedot käytännössä suojassa, vaikka sopimus olisi kunnossa.

Vaatimus syntyi EU-tuomioistuimen Schrems II -ratkaisusta vuonna 2020. Sen jälkeen vakiosopimuslausekkeiden allekirjoittaminen ei enää riitä: myös kohdemaan lainsäädäntö ja käytännöt pitää arvioida.

## Milloin TIA tarvitaan?

| Tilanne | Tarvitaanko? |
|---|---|
| Palvelu, tuki ja alihankkijat ovat kaikki EU:ssa tai ETA:ssa | ei |
| Maa, jolla on komission riittävyyspäätös | ei yleensä |
| Yhdysvaltalainen yritys, joka on sertifioitu Data Privacy Frameworkiin | ei yleensä |
| Siirto perustuu vakiosopimuslausekkeisiin | kyllä |
| Siirto perustuu sitoviin yrityssääntöihin | kyllä |
| Tukihenkilö pääsee tietoihin EU:n ulkopuolelta | arvioitava, koska etäpääsy on siirto |

Data Privacy Frameworkin sertifiointi tarkistetaan [listalta](https://www.dataprivacyframework.gov/list) juuri sille yritykselle, joka on sopimuksen osapuoli. Riittävyyspäätöstä vastaan on vireillä valitus EU-tuomioistuimessa (C-703/25 P), joten varasuunnitelma kannattaa kirjata.

## Arvioinnin kuusi vaihetta

Euroopan tietosuojaneuvoston suositus 01/2020 jakaa työn kuuteen vaiheeseen:

1. **Tunne siirtosi.** Listaa, mitä tietoja siirtyy, keille ja mihin maihin, myös alihankkijoiden kautta.
2. **Tunnista siirtoperuste.** Riittävyyspäätös, vakiosopimuslausekkeet, sitovat yrityssäännöt tai poikkeus.
3. **Arvioi kohdemaa.** Voivatko viranomaiset päästä tietoihin, ja onko ihmisillä tehokkaat oikeussuojakeinot?
4. **Lisää suojatoimia.** Esimerkiksi salaus, pseudonymisointi ja sopimusehdot.
5. **Tee muodolliset toimet.** Kirjaa toimet ja muokkaa sopimuksia tarvittaessa.
6. **Arvioi uudelleen.** Tarkista arvio säännöllisesti ja aina, kun jokin muuttuu.

## Yleisimmät virheet

- **Vain pääsopimus on katsottu.** Alihankkijat voivat siirtää tietoja maihin, joita ei sopimuksessa näy suoraan.
- **EU-palvelin tulkitaan niin, ettei siirtoa ole.** Etäpääsy ja tuki voivat silti olla siirtoja.
- **Arvio on kopioitu toimittajalta.** Se on hyvä lähtöaineisto, mutta ei kerro teidän tiedoistanne.
- **Arvio jää vuosiksi.** Toimittajat ja lainsäädäntö muuttuvat.
- **Selosteet unohtuvat.** Siirrot ja suojatoimet pitää kertoa [tietosuojaselosteessa](/artikkelit/mita-tietosuojaselosteessa-pitaa-olla) ja kirjata [selosteeseen käsittelytoimista](/artikkelit/mika-on-seloste-kasittelytoimista).

## TIA tyypillisissä ohjelmistoissa

Ratkaisu riippuu toimittajan nykyisestä siirtoperusteesta ja alihankkijoista, joten se tarkistetaan ohjelmistokohtaisesti:

- [Microsoft 365](/artikkelit/microsoft-365-tietosuoja) ja [Copilot](/artikkelit/microsoft-365-copilot-tietosuoja)
- [Google Workspace](/artikkelit/google-workspace-tietosuoja) ja [Gemini](/artikkelit/google-gemini-tietosuoja)
- [Claude Team](/artikkelit/claude-team-tietosuoja)

Hinta on {{tia.pieni}}, {{tia.keski}} tai {{tia.laaja}} toimittajaa kohden koon mukaan (alv 0 %).
