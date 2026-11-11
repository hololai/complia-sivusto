// Complian käsittelysopimus (tietosuoja-asetus 28 art.). Lopullinen versio 6.11.2026.
// Tiedot Complia-työkalusta perustuvat sen omaan dokumentaatioon. Asiakkaat eivät kirjaudu työkaluun,
// joten kirjautumispalvelua ei mainita. Käsittelijä on Famula Group Oy (Complia on sen palvelu), ja Google
// tallentaa työkalun tiedot pilveensä. Sähköposti on Planeetta Internet Oy:n (Domainhotelli) palvelussa (päätökset 6.11.2026).
import { SIVUSTO } from '../../site.config.mjs';
import type { Asiakirja } from './asiakirja';

const kasittelija = SIVUSTO.yritys.nimi ?? '<<yrityksen virallinen nimi>>'; // täytetty site.config.mjs:ssä
const ytunnus = SIVUSTO.yritys.ytunnus ?? '<<Y-tunnus>>';

export const KASITTELYSOPIMUS: Asiakirja = {
  otsikko: 'Henkilötietojen käsittelysopimus',
  alaotsikko: `${kasittelija} ja [Asiakkaan nimi] · [päivämäärä]`,
  ohje: 'Täytä keltaiset kohdat ennen allekirjoitusta.',
  osiot: [
    {
      otsikko: 'Osapuolet ja tarkoitus',
      osat: [
        {
          tyyppi: 'rivit',
          rivit: [
            'Rekisterinpitäjä: [Asiakkaan nimi], Y-tunnus [Y-tunnus]',
            `Käsittelijä: ${kasittelija}, Y-tunnus ${ytunnus}`,
          ],
        },
        {
          tyyppi: 'kappale',
          teksti:
            'Tämä sopimus koskee henkilötietoja, joita käsittelijä käsittelee rekisterinpitäjän lukuun, kun se tuottaa tilauksessa sovitut tietosuojapalvelut. Sopimus täyttää tietosuoja-asetuksen 28 artiklan vaatimukset. Jos tämä sopimus ja muut ehdot ovat ristiriidassa, henkilötietojen käsittelyssä noudatetaan tätä sopimusta.',
        },
      ],
    },
    {
      otsikko: 'Käsittelyn kuvaus',
      osat: [
        {
          tyyppi: 'taulukko',
          otsikot: ['Kohta', 'Kuvaus'],
          rivit: [
            ['Kohde ja tarkoitus', 'Tietosuoja-asiakirjojen, kuten selosteiden ja arviointien, laatiminen ja ylläpito'],
            ['Käsittelyn luonne', 'Tietojen vastaanotto, tallennus, järjestäminen ja käyttö asiakirjojen laatimisessa'],
            ['Rekisteröidyt', 'Rekisterinpitäjän yhteyshenkilöt ja vastuuhenkilöt'],
            ['Henkilötiedot', 'Nimi, rooli, työsähköposti ja työpuhelin'],
            ['Kesto', 'Toimeksiannon ajan'],
          ],
        },
        {
          tyyppi: 'kappale',
          teksti:
            'Asiakirjoissa kuvataan tietoryhmiä ja käsittelyjä, ei yksittäisiä ihmisiä. Käsittelijä ei tarvitse rekisterinpitäjän asiakkaiden, potilaiden tai työntekijöiden henkilötietoja eikä pyydä niitä. Jos niitä silti toimitetaan, käsittelijä poistaa ne tai käsittelee ne tämän sopimuksen mukaisesti.',
        },
      ],
    },
    {
      otsikko: 'Käsittelijän velvollisuudet',
      osat: [
        { tyyppi: 'kappale', teksti: 'Käsittelijä' },
        {
          tyyppi: 'lista',
          kohdat: [
            'käsittelee henkilötietoja vain rekisterinpitäjän dokumentoitujen ohjeiden mukaan, myös siirroissa EU:n ja ETA:n ulkopuolelle, ellei laki muuta edellytä',
            'ilmoittaa rekisterinpitäjälle, jos ohje on sen käsityksen mukaan lainvastainen',
            'varmistaa, että henkilötietoja käsittelevät ovat sitoutuneet salassapitoon',
            'toteuttaa liitteen 1 mukaiset tekniset ja organisatoriset suojatoimet',
            'avustaa rekisterinpitäjää vastaamaan rekisteröityjen pyyntöihin',
            'avustaa rekisterinpitäjää tietoturvassa, tietoturvaloukkausten ilmoittamisessa, vaikutustenarvioinneissa ja ennakkokuulemisessa',
            'antaa rekisterinpitäjän käyttöön tiedot, joita tarvitaan tämän sopimuksen noudattamisen osoittamiseen.',
          ],
        },
      ],
    },
    {
      otsikko: 'Tietoturvaloukkaukset',
      osat: [
        {
          tyyppi: 'kappale',
          teksti:
            'Käsittelijä ilmoittaa rekisterinpitäjälle henkilötietojen tietoturvaloukkauksesta ilman aiheetonta viivytystä ja viimeistään 48 tunnin kuluessa siitä, kun se on saanut tiedon loukkauksesta. Ilmoituksessa kerrotaan, mitä tiedetään, ja sitä täydennetään tietojen tarkentuessa.',
        },
      ],
    },
    {
      otsikko: 'Alikäsittelijät',
      osat: [
        {
          tyyppi: 'kappale',
          teksti:
            'Rekisterinpitäjä antaa yleisen ennakkoluvan liitteessä 2 lueteltujen alikäsittelijöiden käyttöön. Käsittelijä ilmoittaa uusista tai vaihtuvista alikäsittelijöistä vähintään 30 päivää etukäteen, ja rekisterinpitäjällä on oikeus vastustaa muutosta. Käsittelijä sitoo alikäsittelijät samoihin tietosuojavelvoitteisiin ja vastaa niiden toiminnasta.',
        },
      ],
    },
    {
      otsikko: 'Siirrot EU:n ja ETA:n ulkopuolelle',
      osat: [
        {
          tyyppi: 'kappale',
          teksti:
            'Käsittelijä käsittelee henkilötietoja EU:ssa ja ETA:ssa. Liitteessä 2 kerrotaan alikäsittelijöiden mahdolliset siirrot ja niiden siirtoperusteet. Muita siirtoja ei tehdä ilman rekisterinpitäjän kirjallista ohjetta.',
        },
      ],
    },
    {
      otsikko: 'Tarkastukset',
      osat: [
        {
          tyyppi: 'kappale',
          teksti:
            'Rekisterinpitäjä tai sen valtuuttama riippumaton tarkastaja voi tarkastaa, että käsittely vastaa tätä sopimusta. Tarkastuksesta ilmoitetaan vähintään 30 päivää etukäteen, ja kumpikin osapuoli vastaa omista kustannuksistaan.',
        },
      ],
    },
    {
      otsikko: 'Sopimuksen päättyminen',
      osat: [
        {
          tyyppi: 'kappale',
          teksti:
            'Kun palvelu päättyy, käsittelijä luovuttaa valmiit asiakirjat rekisterinpitäjälle Word-tiedostoina ja poistaa rekisterinpitäjän tiedot työkalustaan. Tekninen vientikopio ja varmuuskopiot poistetaan 30 päivän kuluessa, ja käsittelijä vahvistaa poiston kirjallisesti. Tietoja säilytetään pidempään vain, jos laki sitä edellyttää.',
        },
      ],
    },
    {
      otsikko: 'Vastuu',
      osat: [
        {
          tyyppi: 'kappale',
          teksti:
            'Kumpikin osapuoli vastaa tämän sopimuksen ja tietosuojalainsäädännön mukaisista velvoitteistaan. Osapuolten välinen vastuu ja sen rajoitukset määräytyvät toimitusehtojen mukaan, ellei pakottavasta lainsäädännöstä muuta johdu.',
        },
      ],
    },
    {
      otsikko: 'Voimassaolo',
      osat: [
        {
          tyyppi: 'kappale',
          teksti: 'Sopimus on voimassa niin kauan kuin käsittelijä käsittelee henkilötietoja rekisterinpitäjän lukuun.',
        },
      ],
    },
    {
      otsikko: 'Allekirjoitukset',
      osat: [
        {
          tyyppi: 'rivit',
          rivit: [
            'Rekisterinpitäjä: [nimi, asema ja päivämäärä]',
            `Käsittelijä: [nimi, asema ja päivämäärä], ${kasittelija}`,
          ],
        },
      ],
    },
    {
      tunnus: 'L1',
      otsikko: 'Liite 1: Suojatoimet',
      osat: [
        {
          tyyppi: 'lista',
          kohdat: [
            'Tiedot ovat Complia-työkalussa, joka toimii Googlen pilvipalvelussa EU:ssa.',
            'Työkaluun kirjautuu vain nimetty asiantuntija, ja istunto päättyy kahdeksan tunnin kuluttua.',
            'Organisaatioiden tiedot erotetaan toisistaan tietokannan pääsysäännöillä, ja niiden toiminta testataan automaattisesti jokaisen muutoksen yhteydessä.',
            'Kehitystyö tehdään erillisessä ympäristössä testidatalla.',
            'Tekoälyä käytetään tekstien luonnosteluun ilman henkilötietoja: kehotteissa nimet korvataan rooleilla ja asiakkaan nimi paikkamerkillä. Tekoälypalvelu ei siksi ole alikäsittelijä.',
            'Varmuuskopiot otetaan ennen järjestelmämuutoksia ja säilytetään nimetyn asiantuntijan työkoneella, jonka levy on salattu.',
            'Lähdekoodi tarkistetaan salaisuuksien varalta ennen jokaista muutosta.',
          ],
        },
      ],
    },
    {
      tunnus: 'L2',
      otsikko: 'Liite 2: Alikäsittelijät',
      osat: [
        {
          tyyppi: 'taulukko',
          otsikot: ['Alikäsittelijä', 'Tehtävä', 'Sijainti ja siirtoperuste'],
          rivit: [
            [
              'Google',
              'Complia-työkalun tietojen tallennus ja sähköposti (Google Workspace)',
              'Työkalun tiedot EU:ssa. Sähköpostia voidaan käsitellä myös EU:n ulkopuolella. Siirtoihin Yhdysvaltoihin sovelletaan EU–US Data Privacy Frameworkia.',
            ],
            [
              'Planeetta Internet Oy (Domainhotelli, Y-tunnus 1753494-9)',
              'Sähköpostin vastaanotto ja edelleenohjaus',
              'Palvelinkeskukset pääsääntöisesti Suomessa. Mahdollisiin siirtoihin EU:n ja ETA:n ulkopuolelle sovelletaan vakiosopimuslausekkeita.',
            ],
          ],
        },
      ],
    },
  ],
};
