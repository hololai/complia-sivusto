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

  // Nimetty asiantuntija on hakukoneille ja ostajille tärkein luottamustekijä.
  asiantuntija: {
    nimi: null,
    titteli: null,
    kuvaus: null,
    linkedin: null,
  },

  // Lomakkeen vastaanottava palvelu. Niin kauan kuin null, lomake avaa sähköpostiviestin.
  lomakeOsoite: null,
  // EU:ssa dataa säilyttävän ajanvaraustyökalun osoite.
  ajanvarausOsoite: null,
};
