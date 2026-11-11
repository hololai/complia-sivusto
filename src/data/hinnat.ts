// Hinnat ovat vain tässä tiedostossa. Sivut, rakenteiset tiedot ja artikkelien
// {{tunnus}}-merkinnät lukevat ne täältä, jotta hinnan muutos ei jää mihinkään vanhana.
//
// Hinnoittelun periaatteet (päätös 6.11.2026, perustelut docs/SIVUSTOSUUNNITELMA.md):
// - Perusasiakirjat hinnoitellaan organisaation koon mukaan.
// - Vaikutustenarviointi hinnoitellaan järjestelmää kohden, ja hinta sisältää kaiken, mitä yhden
//   järjestelmän käyttöönotto vaatii: ennakkoarvion, tarvittaessa tasapainotestin ja
//   siirtovaikutusten arvioinnin sekä kirjaukset selosteisiin.
// - Erillisillä arvioinneilla on yksi kiinteä hinta koosta riippumatta.

export const KOOT = [
  {
    id: 'pieni',
    nimi: 'Pieni',
    lyhyt: '1–9 henkeä',
    kuvaus: '1–9 henkeä tai yksi yksinkertainen järjestelmä (verkkokauppa, ajanvaraus), ei arkaluonteisia tietoja.',
  },
  {
    id: 'keski',
    nimi: 'Keskikokoinen',
    lyhyt: '10–49 henkeä',
    kuvaus: '10–49 henkeä, useita järjestelmiä (esim. HR ja asiakasrekisteri) tai kunnan yksittäinen palvelu.',
  },
  {
    id: 'laaja',
    nimi: 'Laaja',
    lyhyt: '50+ henkeä tai arkaluonteisia tietoja',
    kuvaus:
      '50+ henkeä, arkaluonteisia tietoja (terveys, lapset) tai laaja integroitu järjestelmä (asiakas- tai potilastietojärjestelmä, toiminnanohjaus), kunnan koko toimiala.',
  },
] as const;

export type KokoId = (typeof KOOT)[number]['id'];

// Vaikutustenarviointi järjestelmän laajuuden mukaan. Rivit kasvavat sekä alaspäin että oikealle.
export const JARJESTELMAT = {
  rajattu: {
    nimi: 'Rajattu järjestelmä tai tekoälytyökalu',
    esimerkit: 'ajanvaraus, asiakasrekisteri tai kameravalvonta',
    artikkelit: [{ nimi: 'Claude Team', polku: '/artikkelit/claude-team-tietosuoja' }],
    pieni: 990,
    keski: 1490,
    laaja: 2400,
  },
  toimisto: {
    nimi: 'Toimisto-ohjelmisto',
    esimerkit: '',
    artikkelit: [
      { nimi: 'Microsoft 365 (O365)', polku: '/artikkelit/microsoft-365-tietosuoja' },
      { nimi: 'Google Workspace', polku: '/artikkelit/google-workspace-tietosuoja' },
    ],
    pieni: 1190,
    keski: 1790,
    laaja: 2900,
  },
  tekoaly: {
    nimi: 'Tekoäly toimisto-ohjelmistossa',
    esimerkit: '',
    artikkelit: [
      { nimi: 'Microsoft 365 Copilot', polku: '/artikkelit/microsoft-365-copilot-tietosuoja' },
      { nimi: 'Gemini', polku: '/artikkelit/google-gemini-tietosuoja' },
    ],
    pieni: 1490,
    keski: 2190,
    laaja: 3400,
  },
  arkaluonteinen: {
    nimi: 'Arkaluonteisia tietoja käsittelevä järjestelmä',
    esimerkit: 'esim. asiakas- tai potilastietojärjestelmä, varhaiskasvatus tai rekrytointi',
    artikkelit: [],
    pieni: 1790,
    keski: 2690,
    laaja: 3900,
  },
} as const;

export type JarjestelmaAvain = keyof typeof JARJESTELMAT;
export const JARJESTELMIEN_JARJESTYS = Object.keys(JARJESTELMAT) as JarjestelmaAvain[];

export const ARVIOINNIN_SISALTO = [
  'ennakkoarvio: tarvitaanko vaikutustenarviointi',
  'vaikutustenarviointi riskeineen ja toimenpiteineen',
  'tasapainotesti, jos käsittely perustuu oikeutettuun etuun',
  'siirtovaikutusten arviointi, jos tiedot siirtyvät EU:n ulkopuolelle',
  'käsittelyn kirjaus selosteeseen käsittelytoimista',
  'käsittelyn päivitys tietosuojaselosteeseen',
] as const;

export const HINNAT = {
  // Ensimmäisenä, koska GAP-analyysi on suositeltu aloitus (päätös 6.11.2026).
  tarkastus: {
    nimi: 'Tietosuojatarkastus eli GAP-analyysi',
    polku: '/tietosuojatarkastus',
    lyhyt: 'Hyvä aloitus: nykytila, puutteet ja toimenpidelista hintoineen.',
    pieni: 890,
    keski: 2400,
    laaja: 5900,
    toimitus: '10 arkipäivää',
  },
  tietosuojaseloste: {
    nimi: 'Tietosuojaselosteet',
    polku: '/tietosuojaseloste',
    lyhyt: 'Kaikki tarvittavat selosteet: asiakkaat, työntekijät, työnhakijat ja verkkosivut.',
    pieni: 290,
    keski: 590,
    laaja: 990,
    toimitus: '3 arkipäivää',
  },
  seloste: {
    nimi: 'Seloste käsittelytoimista',
    polku: '/seloste-kasittelytoimista',
    lyhyt: 'Lakisääteinen kuvaus siitä, mitä henkilötietoja käsittelette ja miksi.',
    pieni: 590,
    keski: 1290,
    laaja: 2490,
    toimitus: '5 arkipäivää',
  },
  ennakkoarvio: {
    nimi: 'Ennakkoarvio',
    polku: '/tarvitaanko-vaikutustenarviointi',
    lyhyt: 'Tarvitaanko vaikutustenarviointi? Hinta vähennetään, jos jatkatte arviointiin.',
    pieni: 290,
    keski: 290,
    laaja: 290,
    toimitus: '2 arkipäivää',
  },
  vaikutustenarviointi: {
    nimi: 'Vaikutustenarviointi',
    polku: '/vaikutustenarviointi',
    lyhyt: 'Kaikki, mitä yhden järjestelmän käyttöönotto vaatii, myös kirjaukset selosteisiin.',
    pieni: JARJESTELMAT.rajattu.pieni,
    keski: JARJESTELMAT.rajattu.keski,
    laaja: JARJESTELMAT.rajattu.laaja,
    toimitus: '5–10 arkipäivää',
  },
  tietotilinpaatos: {
    nimi: 'Tietotilinpäätös',
    polku: '/tietotilinpaatos',
    lyhyt: 'Kunnan vuosittainen kooste tiedonhallinnasta ja tietosuojasta.',
    pieni: null,
    keski: 1900,
    laaja: 3900,
    toimitus: '10 arkipäivää',
  },
} as const;

export type PalveluAvain = keyof typeof HINNAT;
export const PALVELUJEN_JARJESTYS = Object.keys(HINNAT) as PalveluAvain[];

export const PAKETTI = {
  nimi: 'Tietosuoja kuntoon',
  sisalto: 'GAP-analyysi, tietosuojaselosteet ja seloste käsittelytoimista',
  pieni: 1390,
  keski: 3390,
  laaja: 7490,
} as const;

// Paketti sisältää GAP-analyysin, joten analyysin jälkeen tilatusta paketista maksetaan vain erotus.
export const JATKO = {
  nimi: `${PAKETTI.nimi} -paketti GAP-analyysin jälkeen`,
  pieni: PAKETTI.pieni - HINNAT.tarkastus.pieni,
  keski: PAKETTI.keski - HINNAT.tarkastus.keski,
  laaja: PAKETTI.laaja - HINNAT.tarkastus.laaja,
} as const;

// Erilliset arvioinnit. Tasapainotesti ja siirtovaikutusten arviointi sisältyvät
// vaikutustenarviointiin; erikseen ostettuna niillä on yksi hinta koosta riippumatta.
export const ARVIOINNIT = {
  lia: {
    nimi: 'Tasapainotesti eli oikeutetun edun arviointi (LIA)',
    polku: '/oikeutetun-edun-arviointi',
    lyhyt: 'Voiko käsittely perustua oikeutettuun etuun?',
    yksikko: 'käsittelyä kohden',
    pieni: 290,
    keski: 290,
    laaja: 290,
    toimitus: '2 arkipäivää',
  },
  tia: {
    nimi: 'Siirtovaikutusten arviointi (TIA)',
    polku: '/siirtovaikutusten-arviointi',
    lyhyt: 'Ovatko EU:n ulkopuolelle siirtyvät tiedot suojassa?',
    yksikko: 'toimittajaa kohden',
    pieni: 390,
    keski: 390,
    laaja: 390,
    toimitus: '3 arkipäivää',
  },
  fria: {
    nimi: 'Perusoikeusvaikutusten arviointi (FRIA)',
    polku: '/perusoikeusvaikutusten-arviointi',
    lyhyt: 'Suuririskisen tekoälyn vaikutukset perusoikeuksiin.',
    yksikko: 'järjestelmää kohden',
    // Työkalu tekee arvioinnin rungon, joten hinta on vaikutustenarviointia pienempi (päätös 6.11.2026).
    pieni: 690,
    keski: 990,
    laaja: 1490,
    toimitus: '5–10 arkipäivää',
  },
} as const;

export type ArviointiAvain = keyof typeof ARVIOINNIT;
export const ARVIOINTIEN_JARJESTYS = Object.keys(ARVIOINNIT) as ArviointiAvain[];

type Koollinen = { pieni: number | null; keski: number; laaja: number };

/** Onko hinta sama kaikille kokoluokille. Silloin se näytetään yhtenä hintana. */
export function kiintea(h: Koollinen): boolean {
  return h.pieni === h.keski && h.keski === h.laaja;
}

/** Paketin osien yhteenlaskettu hinta erikseen ostettuna. */
export function pakettiErikseen(koko: KokoId): number {
  return HINNAT.tarkastus[koko] + HINNAT.tietosuojaseloste[koko] + HINNAT.seloste[koko];
}

export const ESIMERKIT = {
  // 25 hengen yritys ottaa Copilotin käyttöön: ennakkoarvio sisältyy, joten tämä on enimmäishinta.
  copilot: JARJESTELMAT.tekoaly.keski,
  // Kunnan suuririskinen tekoälyjärjestelmä tarvitsee molemmat arvioinnit.
  kuntafria: JARJESTELMAT.arkaluonteinen.laaja + ARVIOINNIT.fria.laaja,
  claudekeski: JARJESTELMAT.rajattu.keski,
};

const paketti = (koko: KokoId) => ({ nimi: `${PAKETTI.nimi} -paketti`, hinta: PAKETTI[koko] });

// Lasketaan yhteen koodissa, jotta summa ei voi jäädä vanhaksi hinnan muuttuessa.
export const KOKONAISUUDET = [
  {
    otsikko: 'Parturi-kampaamo, 4 henkeä',
    kuvaus: 'Ajanvarausjärjestelmä, ei tekoälyä',
    rivit: [paketti('pieni')],
  },
  {
    otsikko: 'Ohjelmistoyritys, 25 henkeä',
    kuvaus: 'Claude Team, perusasiakirjat jo kunnossa',
    rivit: [{ nimi: 'Vaikutustenarviointi, siirtojen arviointi mukana', hinta: JARJESTELMAT.rajattu.keski }],
  },
  {
    otsikko: 'Asiantuntijayritys, 30 henkeä',
    kuvaus: 'Microsoft 365 ja Copilot',
    rivit: [paketti('keski'), { nimi: 'Vaikutustenarviointi: Copilot', hinta: JARJESTELMAT.tekoaly.keski }],
  },
  {
    otsikko: 'Palveluyritys, 120 henkeä',
    kuvaus: 'Microsoft 365, Copilot ja yksi muu toimittaja EU:n ulkopuolella',
    rivit: [
      paketti('laaja'),
      { nimi: 'Vaikutustenarviointi: Copilot', hinta: JARJESTELMAT.tekoaly.laaja },
      { nimi: 'Siirtovaikutusten arviointi, muu toimittaja', hinta: ARVIOINNIT.tia.laaja },
    ],
  },
  {
    otsikko: 'Kunta, tekoäly rekrytoinnissa',
    kuvaus: 'Suuririskinen tekoälyjärjestelmä',
    rivit: [
      { nimi: 'Vaikutustenarviointi', hinta: JARJESTELMAT.arkaluonteinen.laaja },
      { nimi: 'Perusoikeusvaikutusten arviointi (FRIA)', hinta: ARVIOINNIT.fria.laaja },
    ],
  },
].map((k) => ({ ...k, yhteensa: k.rivit.reduce((summa, r) => summa + r.hinta, 0) }));

/** Muotoilee summan suomalaisittain sitovilla väleillä, jottei hinta katkea rivinvaihdossa. */
export function eur(summa: number): string {
  return `${String(summa).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} €`;
}

// Artikkeleissa käytetyt ohjelmistotunnukset osoittavat järjestelmäriveihin, jotta vanhat
// {{copilot.keski}}-merkinnät pysyvät oikeina.
const TUNNUKSET: Record<string, Record<string, unknown>> = {
  ...HINNAT,
  paketti: PAKETTI,
  jatko: JATKO,
  ...JARJESTELMAT,
  claude: JARJESTELMAT.rajattu,
  m365: JARJESTELMAT.toimisto,
  workspace: JARJESTELMAT.toimisto,
  copilot: JARJESTELMAT.tekoaly,
  gemini: JARJESTELMAT.tekoaly,
  ...ARVIOINNIT,
  esim: ESIMERKIT,
};

/** Korvaa tekstin {{palvelu.koko}}-merkinnät hinnoilla. Tuntematon tunnus kaataa buildin. */
export function sijoitaHinnat(teksti: string): string {
  return teksti.replace(/\{\{\s*([a-z0-9]+)\.([a-z]+)\s*\}\}/g, (_, ryhma: string, kentta: string) => {
    const arvo = TUNNUKSET[ryhma]?.[kentta];
    if (typeof arvo !== 'number') throw new Error(`Tuntematon hintatunnus: {{${ryhma}.${kentta}}}`);
    return eur(arvo);
  });
}
