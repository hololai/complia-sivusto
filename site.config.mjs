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

  // Yhtiö on perusteilla 6.11.2026, joten Y-tunnus puuttuu vielä.
  yritys: {
    nimi: 'Complia GDPR Oy',
    ytunnus: null,
    katuosoite: 'Huvilatie 7, 54100 Joutseno',
  },

  // Asiantuntijoiden nimiä ja puhelinnumeroa ei näytetä sivuilla (päätös 6.11.2026): tausta kerrotaan
  // yhteisesti, ja yhteydenotot tulevat tarjouspyynnöllä tai sähköpostilla. Pätevyyksiin vain sellaista,
  // minkä voi osoittaa: emme ole juristeja, eikä sitä anneta ymmärtää.
  tiimi: [
    'filosofian maisterin tutkinto',
    'FCG:n tietosuojavastaavan koulutusohjelma',
    'asiantuntijatehtävät IT-alalla',
    'kaksi julkaistua opasta tekoälyn tietosuojasta',
  ],

  // Asiantuntijoiden kirjoittamat julkaisut. Näytetään Meistä-sivulla ja tekoälyartikkelien lähteissä.
  julkaisut: [
    {
      nimi: 'Tekoälypalvelun vaikutustenarviointi',
      kuvaus: 'Askel askeleelta -opas tekoälypalvelun tietosuojan vaikutustenarviointiin käytännön esimerkkeineen.',
      julkaistu: '2025-05-27',
      url: 'https://aoe.fi/materiaali/4848',
    },
    {
      nimi: 'Tekoälyn tietosuojattu käyttöönotto oppilaitoksessa',
      kuvaus: 'Opas tekoälyn tietosuojattuun käyttöönottoon oppilaitoksessa.',
      julkaistu: '2025-05-27',
      url: 'https://aoe.fi/materiaali/4849',
    },
  ],

};
