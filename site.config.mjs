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
  sahkoposti: 'info@complia.fi',

  // Tarjouspyyntölomakkeen vastaanotto: Google Cloud Run, projekti complia-lomake-fi,
  // alue europe-north1 (Suomi). Koodi kansiossa lomake/. Ei tallenna mitään, lähettää sähköpostin.
  lomakeOsoite: 'https://complia-lomake-90958864324.europe-north1.run.app',

  // Complia aloittaa Famula Group Oy:n palveluna (päätös 6.11.2026). Jos laskutus kasvaa, perustetaan oma
  // yhtiö ja palvelu siirretään sen alle. Osoite on pakollinen tieto (sähköisten palvelujen tarjoaja).
  yritys: {
    nimi: 'Famula Group Oy',
    ytunnus: '3358275-6',
    katuosoite: 'Huvilatie 7, 54100 Joutseno',
  },

  // Asiantuntijoiden nimiä ja puhelinnumeroa ei näytetä sivuilla (päätös 6.11.2026): tausta kerrotaan
  // yhteisesti, ja yhteydenotot tulevat tarjouspyynnöllä tai sähköpostilla. Pätevyyksiin vain sellaista,
  // minkä voi osoittaa: emme ole juristeja, eikä sitä anneta ymmärtää.
  tiimi: [
    'filosofian maisterin tutkinto',
    'FCG:n tietosuojavastaavan koulutusohjelma',
    'asiantuntijatehtävät IT-alalla',
  ],

};
