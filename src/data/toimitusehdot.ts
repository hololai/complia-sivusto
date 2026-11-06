// Toimitusehtojen luonnos. Juristi tarkistaa ennen käyttöä; <<merkityt>> kohdat ovat päätöksiä,
// jotka pitää tehdä. Palvelut myydään vain yrityksille ja julkisyhteisöille.
import { SIVUSTO } from '../../site.config.mjs';
import type { Asiakirja } from './asiakirja';

const yritys = SIVUSTO.yritys.nimi ?? '<<yrityksen virallinen nimi>>';
const ytunnus = SIVUSTO.yritys.ytunnus ?? '<<Y-tunnus>>';

export const TOIMITUSEHDOT: Asiakirja = {
  otsikko: 'Toimitusehdot',
  alaotsikko: 'Voimassa <<voimaantulopäivä>> alkaen',
  osiot: [
    {
      otsikko: 'Soveltaminen',
      osat: [
        {
          tyyppi: 'kappale',
          teksti: `Näitä ehtoja sovelletaan palveluihin, jotka ${yritys} (Y-tunnus ${ytunnus}) toimittaa Complia-nimellä yrityksille ja julkisyhteisöille. Palveluja ei myydä kuluttajille. Ehdot ovat osa jokaista tilausta, ellei kirjallisesti toisin sovita.`,
        },
      ],
    },
    {
      otsikko: 'Tilaus ja sopimuksen syntyminen',
      osat: [
        {
          tyyppi: 'kappale',
          teksti: 'Sopimus syntyy, kun lähetämme tilausvahvistuksen. Vahvistuksessa ovat palvelu, kiinteä hinta ja toimitusaika.',
        },
      ],
    },
    {
      otsikko: 'Hinnat ja maksaminen',
      osat: [
        {
          tyyppi: 'lista',
          kohdat: [
            'Hinnat ovat hinnaston tai tilausvahvistuksen mukaiset, ja niihin lisätään arvonlisävero.',
            'Kertapalvelut laskutetaan, kun asiakas on hyväksynyt asiakirjat tai tarkistusaika on päättynyt.',
            'Jatkuvat palvelut laskutetaan <<laskutusväli, esim. kuukausittain etukäteen>>.',
            'Maksuaika on <<maksuaika, esim. 14>> päivää netto. Viivästyneestä maksusta peritään korkolain mukainen viivästyskorko.',
          ],
        },
      ],
    },
    {
      otsikko: 'Toimitus',
      osat: [
        {
          tyyppi: 'kappale',
          teksti:
            'Toimitusaika lasketaan arkipäivinä siitä, kun haastattelu on pidetty ja tarvittavat tiedot on saatu. Jos tiedot viivästyvät, toimitusaika siirtyy vastaavasti.',
        },
      ],
    },
    {
      otsikko: 'Asiakkaan vastuut',
      osat: [
        {
          tyyppi: 'kappale',
          teksti:
            'Asiakas vastaa antamiensa tietojen oikeellisuudesta ja siitä, että hyväksytyt asiakirjat vastaavat sen todellista toimintaa. Asiakas on rekisterinpitäjä ja vastaa henkilötietojen käsittelystään.',
        },
      ],
    },
    {
      otsikko: 'Hyväksyntä ja virheiden korjaus',
      osat: [
        {
          tyyppi: 'kappale',
          teksti:
            'Asiakas tarkistaa asiakirjat <<tarkistusaika, esim. 14>> päivän kuluessa toimituksesta. Jos asiakirjassa on virhe, korjaamme sen maksutta. Asiakirjat katsotaan hyväksytyiksi, kun asiakas hyväksyy ne tai tarkistusaika päättyy ilman huomautuksia.',
        },
      ],
    },
    {
      otsikko: 'Mitä palvelu ei ole',
      osat: [
        {
          tyyppi: 'kappale',
          teksti:
            'Palvelu on tietosuoja-asiantuntijan työtä, ei oikeudellista neuvontaa. Emme takaa, että viranomainen tai tuomioistuin tulkitsee asian samoin. Asiakirjat vastaavat toimitushetken lainsäädäntöä ja viranomaisohjeita. Jos tilanne vaatii oikeudellista tulkintaa, kerromme sen ja ohjaamme juristille.',
        },
      ],
    },
    {
      otsikko: 'Oikeudet asiakirjoihin',
      osat: [
        {
          tyyppi: 'kappale',
          teksti:
            'Asiakas saa omistusoikeuden toimitettuihin asiakirjoihin, kun ne on maksettu. Saamme käyttää työssä kertynyttä yleistä osaamista ja omia pohjiamme, mutta emme asiakkaan luottamuksellisia tietoja.',
        },
      ],
    },
    {
      otsikko: 'Luottamuksellisuus ja henkilötiedot',
      osat: [
        {
          tyyppi: 'kappale',
          teksti:
            'Pidämme asiakkaan tiedot luottamuksellisina myös sopimuksen päätyttyä. Henkilötietojen käsittelystä sovitaan käsittelysopimuksessa, joka on osa tilausta.',
        },
      ],
    },
    {
      otsikko: 'Vastuunrajoitus',
      osat: [
        {
          tyyppi: 'lista',
          kohdat: [
            'Vastuumme rajoittuu kertapalvelussa sen hintaan ja jatkuvassa palvelussa <<kuukausimäärä, esim. 12>> kuukauden laskutukseen.',
            'Emme vastaa välillisistä vahingoista, kuten saamatta jääneestä voitosta tai toiminnan keskeytyksestä.',
            'Emme vastaa viranomaisen asiakkaalle määräämistä seuraamusmaksuista.',
            'Vastuunrajoitus ei koske tahallisesti tai törkeällä huolimattomuudella aiheutettua vahinkoa.',
            'Vahingosta on ilmoitettava kirjallisesti <<määräaika>> kuluessa siitä, kun asiakas havaitsi sen.',
          ],
        },
      ],
    },
    {
      otsikko: 'Jatkuvat palvelut',
      osat: [
        {
          tyyppi: 'kappale',
          teksti:
            'Jatkuva palvelu on voimassa toistaiseksi, ja kumpikin osapuoli voi irtisanoa sen <<irtisanomisaika, esim. yhden kuukauden>> irtisanomisajalla. Sopimuksen päättyessä toimimme käsittelysopimuksen mukaisesti.',
        },
      ],
    },
    {
      otsikko: 'Ylivoimainen este',
      osat: [
        {
          tyyppi: 'kappale',
          teksti: 'Kumpikaan osapuoli ei vastaa viivästyksestä, jonka aiheuttaa sen vaikutusmahdollisuuksien ulkopuolella oleva este.',
        },
      ],
    },
    {
      otsikko: 'Ehtojen muuttaminen',
      osat: [
        {
          tyyppi: 'kappale',
          teksti: 'Voimme muuttaa ehtoja ilmoittamalla siitä 30 päivää etukäteen. Muutos ei koske jo vahvistettuja tilauksia.',
        },
      ],
    },
    {
      otsikko: 'Sovellettava laki ja riidat',
      osat: [
        {
          tyyppi: 'kappale',
          teksti:
            'Sopimukseen sovelletaan Suomen lakia. Riidat pyritään ratkaisemaan neuvottelemalla, ja muuten ne ratkaistaan <<käräjäoikeus, esim. yrityksen kotipaikan käräjäoikeudessa>>.',
        },
      ],
    },
  ],
};
