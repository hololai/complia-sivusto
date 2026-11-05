// Kaikki sivuston perustiedot ovat tässä yhdessä paikassa. Jos nimi tai osoite vaihtuu,
// canonical-osoitteet, sivukartta ja rakenteiset tiedot seuraavat mukana.
// Arvo null tarkoittaa, että tieto puuttuu: sivulle tulee keltainen Täydennä-merkintä,
// ja `npm run tarkista:julkaisu` estää julkaisun, kunnes tieto on annettu.
export const SIVUSTO = {
  nimi: 'Complia',
  osoite: 'https://complia.fi',

  // Hakusanat ovat sloganissa tarkoituksella: se näkyy etusivun otsikossa, H1:ssä ja rakenteisissa tiedoissa.
  slogan: 'Tietosuoja ja GDPR kuntoon kiinteällä hinnalla',
  // Kuvaa työtapaa, ei hakusanaa, joten sitä käytetään tekstissä mutta ei otsikoissa.
  iskulause: 'Me teemme, sinä hyväksyt.',

  // Pidetään false, kunnes sivut julkaistaan oikeasti. Tällöin jokainen sivu on noindex.
  julkaistu: false,

  // Toimii vasta, kun verkkotunnus ja sähköposti on otettu käyttöön.
  sahkoposti: 'hei@complia.fi',

  yritys: {
    nimi: null,
    ytunnus: null,
    katuosoite: null,
    puhelin: null,
  },

  // Nimetyt asiantuntijat ovat hakukoneille ja ostajille tärkein luottamustekijä.
  // Pätevyyksiin vain sellaista, minkä voi osoittaa: emme ole juristeja, eikä sitä anneta ymmärtää.
  asiantuntijat: [
    {
      nimi: 'Heikki Laivamaa',
      titteli: 'Tietosuoja-asiantuntija',
      tausta: [
        'filosofian maisteri',
        'suorittanut FCG:n tietosuojavastaavan koulutusohjelman',
        'työskentelee IT-alan asiantuntijatehtävissä',
        'hoitaa useamman yrityksen tietosuoja-asioita',
      ],
      linkedin: null,
    },
    {
      nimi: 'Miika Miinin',
      titteli: 'Tietosuoja-asiantuntija',
      tausta: [
        'filosofian maisteri',
        'suorittanut FCG:n tietosuojavastaavan koulutusohjelman',
        'työskentelee IT-alan asiantuntijatehtävissä',
      ],
      linkedin: null,
    },
  ],

  // Asiantuntijoiden kirjoittamat julkaisut. Näytetään Meistä-sivulla ja tekoälyartikkelien lähteissä.
  julkaisut: [
    {
      nimi: 'Tekoälypalvelun vaikutustenarviointi',
      kuvaus: 'Askel askeleelta -opas tekoälypalvelun tietosuojan vaikutustenarviointiin käytännön esimerkkeineen.',
      tekijat: 'Miika Miinin, Matti Kähkönen ja Heikki Laivamaa',
      julkaistu: '2025-05-27',
      url: 'https://aoe.fi/materiaali/4848',
    },
    {
      nimi: 'Tekoälyn tietosuojattu käyttöönotto oppilaitoksessa',
      kuvaus: 'Opas tekoälyn tietosuojattuun käyttöönottoon oppilaitoksessa.',
      tekijat: 'Miika Miinin, Matti Kähkönen ja Heikki Laivamaa',
      julkaistu: '2025-05-27',
      url: 'https://aoe.fi/materiaali/4849',
    },
  ],

  // Julkiset esiintymiset, joihin on tallenne tai kuvaus verkossa.
  esiintymiset: [
    {
      nimi: 'Tekoälypalvelun tietosuojattu käyttöönotto oppilaitoksessa',
      tapahtuma: 'Apuna AI -koulutus, Tekoäly oman työn tukena',
      esiintyjat: 'Miika Miinin ja Matti Kähkönen',
      paiva: '2025-05-06',
      url: 'https://www.youtube.com/watch?v=NfTkp1JCy6I',
    },
    {
      nimi: 'Tekoäly opettajan apuna',
      tapahtuma: 'ITK-konferenssin webinaari',
      esiintyjat: 'Miika Miinin',
      paiva: '2025-10-07',
      url: 'https://itk-konferenssi.fi/en/blog/webinar-recordings-5/tekoaly-opettajan-apuna-217',
    },
  ],

  // Lomakkeen vastaanottava palvelu. Niin kauan kuin null, lomake avaa sähköpostiviestin.
  lomakeOsoite: null,
  // EU:ssa dataa säilyttävän ajanvaraustyökalun osoite.
  ajanvarausOsoite: null,
};
