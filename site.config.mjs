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

  // Esikatselun salasana estää sivustoa näkymästä ennen julkaisua. Se ei ole tietoturvaa:
  // sisältö on julkisessa repossa. Tiiviste asetetaan komennolla `npm run salasana`.
  esikatselu: {
    paalla: true,
    tiiviste: '0972dbe5ffc1690e4d733810e5bd0037:200000:e155000a02c7f436e54029d562633be42a091b6b4fb6da39246f10623bc36c32',
  },

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
      kuvaus:
        'Heikki on filosofian maisteri ja työskentelee IT-alan asiantuntijatehtävissä. Hän on suorittanut FCG:n tietosuojavastaavan koulutusohjelman ja kirjoittanut tekoälyn tietosuojaoppaat yhdessä Miika Miininin ja Matti Kähkösen kanssa.',
      linkedin: null,
    },
    {
      nimi: 'Miika Miinin',
      titteli: 'Tietosuoja-asiantuntija',
      kuvaus:
        'Miika on filosofian maisteri ja työskentelee IT-alan asiantuntijatehtävissä. Hän on suorittanut FCG:n tietosuojavastaavan koulutusohjelman ja kirjoittanut tekoälyn tietosuojaoppaat yhdessä Heikki Laivamaan ja Matti Kähkösen kanssa.',
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

  // Lomakkeen vastaanottava palvelu. Niin kauan kuin null, lomake avaa sähköpostiviestin.
  lomakeOsoite: null,
};
