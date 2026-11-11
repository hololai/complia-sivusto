// Palvelujen kulku asiakkaan näkökulmasta. Jokaisessa vaiheessa kerrotaan erikseen asiakkaan osuus ja
// Complian osuus, jotta ostaja näkee, kuinka vähän työtä palvelu teettää hänellä itsellään.
//
// Tekstit perustuvat palvelusivujen tietoihin (saat, tarvitsemme, toimitus). Aikoja näytetään vain, kun ne
// on kerrottu palvelun kuvauksessa. Vaikutustenarvioinnin ajat ovat arvioita ennen ensimmäisiä toimituksia
// (10.11.2026), joten tarkista ne todellisista toimituksista.
import { ARVIOINNIN_SISALTO, ARVIOINNIT, HINNAT, JATKUVAT, eur } from './hinnat';
import type { KuvanNimi } from './kuvat';
import type { IkoninNimi } from '../components/Ikoni.astro';

export interface Vaihe {
  kuva: KuvanNimi;
  otsikko: string;
  kuvaus: string;
  // aika: merkkijono näytetään, null on Täydennä, puuttuva tarkoittaa, ettei vaiheessa ole kellotettavaa.
  te: { teksti: string; aika?: string | null; merkki?: string };
  complia: string;
}

export interface Kulku {
  otsikko: string;
  johdanto: string;
  luvut: { ikoni: IkoninNimi; nimi: string; arvo: string | null }[];
  vaiheet: Vaihe[];
  paketti: { otsikko: string; teksti: string; rivit: string[] };
}

const EI_TEHTAVAA = { teksti: 'Voitte keskittyä omaan työhönne.', merkki: 'Ei tehtävää' };
const OSAAMINEN = { ikoni: 'kilpi', nimi: 'Tietosuojaosaamista', arvo: 'ei tarvita' } as const;
const valmiina = (toimitus: string) => ({ ikoni: 'seloste', nimi: 'Valmiina', arvo: toimitus }) as const;
const isolla = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const KIINTEA = 'Yksi kiinteä hinta kattaa kaiken alla olevan. Lasku lähtee vasta, kun olette hyväksyneet valmiit asiakirjat.';

export const KULUT: Record<string, Kulku> = {
  vaikutustenarviointi: {
    otsikko: 'Näin vaikutustenarviointi etenee',
    johdanto:
      'Teidän ei tarvitse osata tietosuojaa. Vastaatte kysymyksiin ja kerrotte, miten järjestelmää käytetään. Vaikeat asiat, kuten riskit, lakiperusteet ja asiakirjat, hoidamme me.',
    luvut: [
      { ikoni: 'kello', nimi: 'Teidän työaikanne yhteensä', arvo: 'noin 2–3 h' },
      valmiina(HINNAT.vaikutustenarviointi.toimitus),
      OSAAMINEN,
    ],
    vaiheet: [
      {
        kuva: 'lomake',
        otsikko: 'Vastaatte valmiisiin kysymyksiin',
        kuvaus:
          'Lähetämme lomakkeen, jossa kysytään arkikielellä, mihin järjestelmää käytetään, ketkä sitä käyttävät ja mitä tietoja siihen tallennetaan.',
        te: { teksti: 'Vastaatte lomakkeeseen. Neuvomme, jos jokin kysymys mietityttää.', aika: 'noin 30 min' },
        complia: 'Pyydämme järjestelmän toimittajalta tietoturvakuvauksen ja luemme sen puolestanne.',
      },
      {
        kuva: 'haastattelu',
        otsikko: 'Haastattelemme oikeat ihmiset etänä',
        kuvaus: 'Kysymme sen, mitä lomakkeesta ei selviä. Haastatteluja on yleensä 1–2.',
        te: { teksti: 'Vastuuhenkilö ja tarvittaessa pääkäyttäjä osallistuvat.', aika: 'noin 1 h' },
        complia: 'Valmistelemme kysymykset ja kirjaamme vastaukset.',
      },
      {
        kuva: 'asiakirjat',
        otsikko: 'Me teemme asiakirjat',
        kuvaus: 'Kuvaamme käsittelyn, arvioimme riskit ihmisille ja laadimme toimenpidesuunnitelman.',
        te: EI_TEHTAVAA,
        complia: 'Teemme samalla tarvittavat lisäarvioinnit ja kirjaukset selosteisiin.',
      },
      {
        kuva: 'lapikaynti',
        otsikko: 'Käymme luonnoksen läpi yhdessä',
        kuvaus: 'Tarkistamme kanssanne, että kuvaus vastaa todellisuutta, ja korjaamme virheet.',
        te: { teksti: 'Kommentoitte luonnosta.', aika: 'noin 45 min' },
        complia: 'Korjaamme ja täydennämme. Jos teillä on tietosuojavastaava, hänen neuvonsa kirjataan arviointiin.',
      },
      {
        kuva: 'allekirjoitus',
        otsikko: 'Allekirjoitatte ja arkistoitte',
        kuvaus:
          'Saatte valmiit asiakirjat. Arviointi tehdään teidän nimissänne, koska vastuu käsittelystä on rekisterinpitäjällä.',
        te: { teksti: 'Hyväksytte, allekirjoitatte ja arkistoitte organisaationne käytännön mukaan.' },
        complia: 'Toimenpidelista kertoo, mitä organisaation pitää tehdä ennen käyttöönottoa.',
      },
    ],
    paketti: {
      otsikko: 'Valmis paketti, jonka saatte',
      teksti:
        'Yksi kiinteä hinta kattaa kaiken, mitä järjestelmän käyttöönotto tietosuojan kannalta vaatii. Lasku lähtee vasta, kun olette hyväksyneet valmiit asiakirjat.',
      rivit: [
        ...ARVIOINNIN_SISALTO.map(isolla),
        'Toimenpidelista: mitä tehdään ennen käyttöönottoa, kuka sen tekee ja mihin mennessä',
        'Allekirjoitusvalmiit asiakirjat arkistoitavaksi',
      ],
    },
  },

  tietosuojaseloste: {
    otsikko: 'Näin tietosuojaselosteet syntyvät',
    johdanto:
      'Puolen tunnin keskustelu riittää. Me selvitämme, mitä laki vaatii, ja kirjoitamme selosteet teidän toimintanne mukaan.',
    luvut: [
      { ikoni: 'kello', nimi: 'Teiltä tarvitaan', arvo: '30 min haastattelu' },
      valmiina(HINNAT.tietosuojaseloste.toimitus),
      OSAAMINEN,
    ],
    vaiheet: [
      {
        kuva: 'lomake',
        otsikko: 'Kerrotte järjestelmänne',
        kuvaus: 'Listaatte käytössä olevat järjestelmät, esimerkiksi asiakasrekisterin, palkanlaskennan ja verkkosivut.',
        te: { teksti: 'Lista järjestelmistä riittää.' },
        complia: 'Kerromme, mitä tietoja tarvitaan.',
      },
      {
        kuva: 'haastattelu',
        otsikko: 'Puolen tunnin haastattelu',
        kuvaus: 'Käymme läpi, mitä tietoja käsittelette ja missä järjestelmissä.',
        te: { teksti: 'Yksi toiminnan tunteva henkilö riittää.', aika: 'noin 30 min' },
        complia: 'Kysymme oikeat kysymykset, joten valmistautumista ei tarvita.',
      },
      {
        kuva: 'asiakirjat',
        otsikko: 'Me kirjoitamme selosteet',
        kuvaus: `Teemme selosteet asiakkaille, työntekijöille, työnhakijoille ja verkkosivuille. Toimitusaika ${HINNAT.tietosuojaseloste.toimitus}.`,
        te: EI_TEHTAVAA,
        complia: 'Kirjoitamme selosteet teidän järjestelmienne ja toimittajienne mukaan, emme yleisellä mallilla.',
      },
      {
        kuva: 'lapikaynti',
        otsikko: 'Hyväksytte ja julkaisette',
        kuvaus: 'Tarkistamme muutokset kanssanne, ja saatte selosteet julkaisuvalmiina.',
        te: { teksti: 'Tarkistatte luonnokset ja julkaisette selosteet.' },
        complia: 'Korjaamme muutokset ennen luovutusta.',
      },
    ],
    paketti: {
      otsikko: 'Tämän saatte',
      teksti: KIINTEA,
      rivit: [
        'Tietosuojaseloste asiakkaille',
        'Tietosuojaseloste työntekijöille',
        'Tietosuojaseloste työnhakijoille',
        'Tietosuojaseloste verkkosivujen käyttäjille',
        'Julkaisuvalmiit ja muokattavat tiedostot',
      ],
    },
  },

  'seloste-kasittelytoimista': {
    otsikko: 'Näin seloste käsittelytoimista syntyy',
    johdanto: 'Te kerrotte, miten toimitte. Me selvitämme oikeusperusteet ja säilytysajat ja kokoamme lakisääteisen selosteen.',
    luvut: [
      { ikoni: 'kello', nimi: 'Teiltä tarvitaan', arvo: '1 h haastattelu' },
      valmiina(HINNAT.seloste.toimitus),
      OSAAMINEN,
    ],
    vaiheet: [
      {
        kuva: 'lomake',
        otsikko: 'Kokoatte järjestelmä- ja sopimuslistan',
        kuvaus: 'Lista käytössä olevista järjestelmistä ja toimittajasopimuksista, sellaisena kuin se on.',
        te: { teksti: 'Keskeneräinenkin lista käy.' },
        complia: 'Kerromme, mitä listassa pitää olla.',
      },
      {
        kuva: 'haastattelu',
        otsikko: 'Tunnin haastattelu',
        kuvaus: 'Käymme läpi toiminnot, järjestelmät ja toimittajat.',
        te: { teksti: 'Vastuuhenkilö kertoo, miten toimitte.', aika: 'noin 1 h' },
        complia: 'Valmistelemme kysymykset listanne perusteella.',
      },
      {
        kuva: 'asiakirjat',
        otsikko: 'Me kuvaamme käsittelyt',
        kuvaus: `Kokoamme käsittelyt taulukkoon. Toimitusaika ${HINNAT.seloste.toimitus}.`,
        te: EI_TEHTAVAA,
        complia: 'Selvitämme jokaiselle käsittelylle oikeusperusteen, vastaanottajat ja säilytysajan.',
      },
      {
        kuva: 'lapikaynti',
        otsikko: 'Käymme selosteen läpi yhdessä',
        kuvaus:
          'Kerromme, jos jokin vaatii korjausta, esimerkiksi puuttuva käsittelysopimus tai määrittelemätön säilytysaika.',
        te: { teksti: 'Hyväksytte selosteen.' },
        complia: 'Saatte listan korjattavista asioista.',
      },
    ],
    paketti: {
      otsikko: 'Tämän saatte',
      teksti: KIINTEA,
      rivit: [
        'Käsittelyt taulukkona: tarkoitus, oikeusperuste ja tietoryhmät',
        'Vastaanottajat, säilytysajat ja suojaustoimet',
        'Lista korjattavista asioista, kuten puuttuvista käsittelysopimuksista',
        'Muokattava tiedosto, jota on helppo päivittää',
      ],
    },
  },

  tietosuojatarkastus: {
    otsikko: 'Näin GAP-analyysi etenee',
    johdanto: 'Te annatte nykyiset asiakirjat ja kerrotte, miten toimitte. Me kerromme suoraan, mikä on kunnossa ja mistä kannattaa aloittaa.',
    luvut: [
      { ikoni: 'kello', nimi: 'Teiltä tarvitaan', arvo: '1–3 haastattelua' },
      valmiina(HINNAT.tarkastus.toimitus),
      OSAAMINEN,
    ],
    vaiheet: [
      {
        kuva: 'lomake',
        otsikko: 'Lähetätte nykyiset asiakirjat',
        kuvaus: 'Ne asiakirjat, jotka teillä jo on. Keskeneräisetkin käyvät.',
        te: { teksti: 'Mitään ei tarvitse tehdä valmiiksi.' },
        complia: 'Kerromme, mitä aineistoa tarvitaan.',
      },
      {
        kuva: 'haastattelu',
        otsikko: 'Haastattelemme vastuuhenkilöt',
        kuvaus: 'Haastatteluja on 1–3 organisaation koon mukaan.',
        te: { teksti: 'Vastuuhenkilöt osallistuvat etänä.' },
        complia: 'Vertaamme toimintaanne tietosuoja-asetuksen vaatimuksiin.',
      },
      {
        kuva: 'asiakirjat',
        otsikko: 'Me teemme raportin',
        kuvaus: `Nykytila, puutteet riskiluokittain ja korjaukset hintoineen. Toimitusaika ${HINNAT.tarkastus.toimitus}.`,
        te: EI_TEHTAVAA,
        complia: 'Järjestämme korjaukset tärkeysjärjestykseen, jotta tiedätte, mistä aloittaa.',
      },
      {
        kuva: 'lapikaynti',
        otsikko: 'Purkupalaveri',
        kuvaus: 'Käymme havainnot läpi tunnin palaverissa, ja päätätte jatkosta.',
        te: { teksti: 'Johto tai vastuuhenkilö osallistuu.', aika: 'noin 1 h' },
        complia: 'Jos jatkatte pakettiin, analyysin hinta vähennetään.',
      },
    ],
    paketti: {
      otsikko: 'Tämän saatte',
      teksti: KIINTEA,
      rivit: ['Raportti nykytilasta', 'Puutteet riskiluokittain', 'Korjauslista hintoineen', 'Tunnin purkupalaveri'],
    },
  },

  'tarvitaanko-vaikutustenarviointi': {
    otsikko: 'Näin ennakkoarvio etenee',
    johdanto: 'Kerrotte, mitä järjestelmää olette ottamassa käyttöön. Me arvioimme, tarvitaanko vaikutustenarviointi, ja perustelemme sen kirjallisesti.',
    luvut: [
      { ikoni: 'kello', nimi: 'Teiltä tarvitaan', arvo: 'lyhyt kuvaus' },
      valmiina(HINNAT.ennakkoarvio.toimitus),
      OSAAMINEN,
    ],
    vaiheet: [
      {
        kuva: 'lomake',
        otsikko: 'Kuvaatte järjestelmän',
        kuvaus: 'Kerrotte, mitä järjestelmää käytetään, mihin ja mitä tietoja siihen tallennetaan.',
        te: { teksti: 'Lyhyt kuvaus riittää.' },
        complia: 'Neuvomme, jos jokin kysymys mietityttää.',
      },
      {
        kuva: 'asiakirjat',
        otsikko: 'Me arvioimme',
        kuvaus: `Peilaamme käsittelyn tietosuoja-asetukseen ja tietosuojavaltuutetun luetteloon. Toimitusaika ${HINNAT.ennakkoarvio.toimitus}.`,
        te: EI_TEHTAVAA,
        complia: 'Kerromme, tarvitaanko vaikutustenarviointi, ja miksi.',
      },
      {
        kuva: 'allekirjoitus',
        otsikko: 'Saatte kirjallisen arvion',
        kuvaus: 'Arvio perusteluineen, jonka voi näyttää valvojalle.',
        te: { teksti: 'Arkistoitte arvion.' },
        complia: 'Jos arviointi tarvitaan, ennakkoarvion hinta vähennetään siitä.',
      },
    ],
    paketti: {
      otsikko: 'Tämän saatte',
      teksti: KIINTEA,
      rivit: ['Kirjallinen arvio', 'Perustelut, jotka voi näyttää valvojalle', 'Suositus jatkosta'],
    },
  },

  'oikeutetun-edun-arviointi': {
    otsikko: 'Näin tasapainotesti etenee',
    johdanto: 'Kuvaatte käsittelyn ja kerrotte sen tarkoituksen. Me teemme kolmivaiheisen arvioinnin ja kirjaamme perustelut.',
    luvut: [
      { ikoni: 'kello', nimi: 'Teiltä tarvitaan', arvo: '30 min haastattelu' },
      valmiina(ARVIOINNIT.lia.toimitus),
      OSAAMINEN,
    ],
    vaiheet: [
      {
        kuva: 'lomake',
        otsikko: 'Kuvaatte käsittelyn',
        kuvaus: 'Lyhyt kuvaus siitä, mitä tietoja käsittelette ja miksi.',
        te: { teksti: 'Muutama kappale riittää.' },
        complia: 'Kerromme, mitä kuvaukseen tarvitaan.',
      },
      {
        kuva: 'haastattelu',
        otsikko: 'Puolen tunnin haastattelu',
        kuvaus: 'Tarkennamme käsittelyn tarkoituksen ja vaihtoehdot.',
        te: { teksti: 'Käsittelystä vastaava osallistuu.', aika: 'noin 30 min' },
        complia: 'Valmistelemme kysymykset kuvauksenne perusteella.',
      },
      {
        kuva: 'asiakirjat',
        otsikko: 'Me teemme arvioinnin',
        kuvaus: `Arvioimme kolmessa vaiheessa: etu, tarpeellisuus ja tasapaino. Toimitusaika ${ARVIOINNIT.lia.toimitus}.`,
        te: EI_TEHTAVAA,
        complia: 'Ehdotamme suojatoimet, jos tasapaino sitä vaatii.',
      },
      {
        kuva: 'allekirjoitus',
        otsikko: 'Hyväksytte ja arkistoitte',
        kuvaus: 'Saatte kirjallisen arvioinnin ja johtopäätöksen.',
        te: { teksti: 'Hyväksytte arvioinnin ja arkistoitte sen.' },
        complia: 'Saatte valmiin tekstin tietosuojaselosteeseen.',
      },
    ],
    paketti: {
      otsikko: 'Tämän saatte',
      teksti: KIINTEA,
      rivit: ['Kirjallinen kolmivaiheinen arviointi', 'Johtopäätös', 'Tarvittavat suojatoimet', 'Teksti tietosuojaselosteeseen'],
    },
  },

  'siirtovaikutusten-arviointi': {
    otsikko: 'Näin siirtovaikutusten arviointi etenee',
    johdanto: 'Kerrotte toimittajan ja siirrettävät tiedot. Me selvitämme siirtoperusteen ja kohdemaan lainsäädännön.',
    luvut: [
      { ikoni: 'kello', nimi: 'Teiltä tarvitaan', arvo: 'toimittajan tiedot' },
      valmiina(ARVIOINNIT.tia.toimitus),
      OSAAMINEN,
    ],
    vaiheet: [
      {
        kuva: 'lomake',
        otsikko: 'Kerrotte toimittajan ja tiedot',
        kuvaus: 'Toimittajan nimi, sopimukset ja kuvaus siirrettävistä tiedoista.',
        te: { teksti: 'Lähetätte sopimukset, jotka teillä on.' },
        complia: 'Luemme toimittajan siirtoperusteet sen omasta dokumentaatiosta.',
      },
      {
        kuva: 'asiakirjat',
        otsikko: 'Me arvioimme siirron',
        kuvaus: `Arvioimme siirron, kohdemaan lainsäädännön ja tarvittavat lisäsuojatoimet. Toimitusaika ${ARVIOINNIT.tia.toimitus}.`,
        te: EI_TEHTAVAA,
        complia: 'Kerromme suoraan, jos siirto vaatii lisäsuojatoimia.',
      },
      {
        kuva: 'allekirjoitus',
        otsikko: 'Saatte arvion ja johtopäätöksen',
        kuvaus: 'Kirjallinen arvio, jonka voi näyttää asiakkaalle, hankintayksikölle tai valvojalle.',
        te: { teksti: 'Hyväksytte arvion ja arkistoitte sen.' },
        complia: 'Toimitamme arvion valmiina arkistoitavaksi.',
      },
    ],
    paketti: {
      otsikko: 'Tämän saatte',
      teksti: KIINTEA,
      rivit: ['Kirjallinen arvio siirrosta', 'Kohdemaan lainsäädännön arvio', 'Lisäsuojatoimet tarvittaessa', 'Johtopäätös'],
    },
  },

  'perusoikeusvaikutusten-arviointi': {
    otsikko: 'Näin perusoikeusvaikutusten arviointi etenee',
    johdanto: 'Kerrotte, miten tekoälyjärjestelmää käytetään. Me arvioimme, kenen oikeuksiin se vaikuttaa ja miten riskit hallitaan.',
    luvut: [
      { ikoni: 'kello', nimi: 'Teiltä tarvitaan', arvo: '1–2 haastattelua' },
      valmiina(ARVIOINNIT.fria.toimitus),
      OSAAMINEN,
    ],
    vaiheet: [
      {
        kuva: 'lomake',
        otsikko: 'Kuvaatte käyttötavan',
        kuvaus: 'Kerrotte, miten ja missä prosesseissa järjestelmää käytetään, ja lähetätte toimittajan käyttöohjeet.',
        te: { teksti: 'Käyttöohjeet ja lyhyt kuvaus riittävät.' },
        complia: 'Kerromme, mitä aineistoa tarvitaan.',
      },
      {
        kuva: 'haastattelu',
        otsikko: 'Haastattelemme käyttäjät',
        kuvaus: 'Haastatteluja on yleensä 1–2.',
        te: { teksti: 'Järjestelmän vastuuhenkilö osallistuu.' },
        complia: 'Selvitämme, kenen oikeuksiin järjestelmä vaikuttaa.',
      },
      {
        kuva: 'asiakirjat',
        otsikko: 'Me teemme arvioinnin',
        kuvaus: `Teemme tekoälyasetuksen 27 artiklan mukaisen arvioinnin. Toimitusaika ${ARVIOINNIT.fria.toimitus}.`,
        te: EI_TEHTAVAA,
        complia: 'Kuvaamme riskit, ihmisen valvonnan ja toimet riskien toteutuessa.',
      },
      {
        kuva: 'allekirjoitus',
        otsikko: 'Hyväksytte ja arkistoitte',
        kuvaus: 'Saatte valmiin arvioinnin.',
        te: { teksti: 'Hyväksytte arvioinnin ja arkistoitte sen.' },
        complia: 'Kerromme, mitä arvioinnin jälkeen pitää tehdä.',
      },
    ],
    paketti: {
      otsikko: 'Tämän saatte',
      teksti: KIINTEA,
      rivit: [
        'Kuvaus käyttöprosessista',
        'Kenen oikeuksiin järjestelmä vaikuttaa',
        'Riskit ja ihmisen valvonta',
        'Toimet riskien toteutuessa',
      ],
    },
  },

  tietotilinpaatos: {
    otsikko: 'Näin tietotilinpäätös syntyy',
    johdanto: 'Annatte olemassa olevan aineiston. Me kokoamme siitä julkaisuvalmiin tietotilinpäätöksen.',
    luvut: [
      { ikoni: 'kello', nimi: 'Teiltä tarvitaan', arvo: 'olemassa oleva aineisto' },
      valmiina(HINNAT.tietotilinpaatos.toimitus),
      OSAAMINEN,
    ],
    vaiheet: [
      {
        kuva: 'lomake',
        otsikko: 'Lähetätte aineiston',
        kuvaus: 'Edellisen vuoden tietotilinpäätöksen, tietoturvapoikkeamat ja selosteet.',
        te: { teksti: 'Aineisto sellaisena kuin se on.' },
        complia: 'Kerromme tarkalleen, mitä aineistoa tarvitaan.',
      },
      {
        kuva: 'asiakirjat',
        otsikko: 'Me kokoamme tietotilinpäätöksen',
        kuvaus: `Julkaisuvalmis kooste johdolle, kuntalaisille ja tarkastuslautakunnalle. Toimitusaika ${HINNAT.tietotilinpaatos.toimitus}.`,
        te: EI_TEHTAVAA,
        complia: 'Kirjoitamme koosteen selkeällä suomella.',
      },
      {
        kuva: 'lapikaynti',
        otsikko: 'Käymme luonnoksen läpi',
        kuvaus: 'Tarkistatte, että tiedot vastaavat kunnan tilannetta.',
        te: { teksti: 'Kommentoitte luonnosta.' },
        complia: 'Korjaamme ja viimeistelemme.',
      },
      {
        kuva: 'allekirjoitus',
        otsikko: 'Käsittely ja julkaisu',
        kuvaus: 'Saatte julkaisuvalmiin tietotilinpäätöksen ja aineiston tarkastuslautakunnalle.',
        te: { teksti: 'Viette sen käsittelyyn kunnan käytännön mukaan.' },
        complia: 'Aineisto tarkastuslautakunnalle sisältyy hintaan.',
      },
    ],
    paketti: {
      otsikko: 'Tämän saatte',
      teksti: KIINTEA,
      rivit: ['Julkaisuvalmis tietotilinpäätös', 'Aineisto tarkastuslautakunnalle', 'Muokattava tiedosto seuraavaa vuotta varten'],
    },
  },

  tietosuojavastaava: {
    otsikko: 'Näin aloitus etenee',
    johdanto: 'Kaikki alkaa maksuttomalla kartoituksella. Sen jälkeen tietosuojavastaava hoitaa jatkuvan työn, ja te kysytte, kun tarvitsette.',
    luvut: [
      { ikoni: 'kello', nimi: 'Teiltä tarvitaan', arvo: 'yhteyshenkilö' },
      { ikoni: 'seloste', nimi: 'Kartoitus', arvo: 'maksuton' },
      OSAAMINEN,
    ],
    vaiheet: [
      {
        kuva: 'haastattelu',
        otsikko: 'Maksuton kartoitus',
        kuvaus: 'Selvitämme, onko nimittäminen teille pakollista tai perusteltua, ja käymme läpi nykyiset asiakirjat.',
        te: { teksti: 'Kerrotte toiminnastanne ja lähetätte nykyiset asiakirjat.' },
        complia: 'Kerromme suoraan, tarvitsetteko palvelua.',
      },
      {
        kuva: 'allekirjoitus',
        otsikko: 'Sopimus ja nimitys',
        kuvaus: 'Sovimme palvelun sisällön ja koon kirjallisesti.',
        te: { teksti: 'Nimitätte tietosuojavastaavan.' },
        complia: 'Laadimme sopimuksen valmiiksi.',
      },
      {
        kuva: 'lomake',
        otsikko: 'Ilmoitus ja yhteystiedot',
        kuvaus: 'Asetus edellyttää, että yhteystiedot julkaistaan ja ilmoitetaan tietosuojavaltuutetun toimistolle.',
        te: { teksti: 'Hyväksytte ilmoituksen.' },
        complia: 'Kerromme, mitä ilmoitukseen tarvitaan.',
      },
      {
        kuva: 'asiakirjat',
        otsikko: 'Jatkuva työ',
        kuvaus: 'Tietosuojavastaava neuvoo, seuraa asetuksen noudattamista ja raportoi suoraan ylimmälle johdolle.',
        te: { teksti: 'Kysytte, kun tarvitsette.' },
        complia: 'Seuraamme noudattamista ja raportoimme johdolle.',
      },
    ],
    paketti: {
      otsikko: 'Tämän saatte',
      teksti: `Kuukausihinta sovitaan kirjallisesti, alkaen ${eur(JATKUVAT.vastaava.pieni)}/kk.`,
      rivit: ['Nimetty tietosuojavastaava', 'Neuvonta', 'Noudattamisen seuranta', 'Yhteyspiste tietosuojavaltuutettuun ja rekisteröityihin'],
    },
  },
};
