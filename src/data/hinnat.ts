// Hinnat ovat vain tässä tiedostossa. Sivut, rakenteiset tiedot ja artikkelien
// {{tunnus}}-merkinnät lukevat ne täältä, jotta hinnan muutos ei jää mihinkään vanhana.

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

export const HINNAT = {
  tietosuojaseloste: {
    nimi: 'Tietosuojaselosteet',
    polku: '/tietosuojaseloste',
    lyhyt: 'Asiakkaille, työntekijöille, työnhakijoille ja verkkosivuille.',
    pieni: 390,
    keski: 790,
    laaja: 1490,
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
    lyhyt: 'Selvitämme, tarvitaanko vaikutustenarviointi.',
    pieni: 290,
    keski: 490,
    laaja: 790,
    toimitus: '2 arkipäivää',
  },
  vaikutustenarviointi: {
    nimi: 'Vaikutustenarviointi',
    polku: '/vaikutustenarviointi',
    lyhyt: 'Riskit ja toimenpiteet uudelle järjestelmälle tai käsittelylle.',
    pieni: 890,
    keski: 1790,
    laaja: 3900,
    toimitus: '5–10 arkipäivää',
  },
  tarkastus: {
    nimi: 'Tietosuojatarkastus',
    polku: '/tietosuojatarkastus',
    lyhyt: 'Nykytila, puutteet ja toimenpidelista tärkeysjärjestyksessä.',
    pieni: 890,
    keski: 2400,
    laaja: 5900,
    toimitus: '10 arkipäivää',
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
  sisalto: 'tietosuojatarkastus, tietosuojaselosteet ja seloste käsittelytoimista',
  pieni: 1490,
  keski: 3590,
  laaja: 7900,
} as const;

export const JATKUVAT = {
  kunnossa: {
    nimi: 'Tietosuoja kunnossa',
    lyhyt: 'Vuosipäivitys, muutokset ja kysymykset.',
    pieni: 89,
    keski: 189,
    laaja: 290,
  },
  vastaava: {
    nimi: 'Tietosuojavastaava palveluna',
    polku: '/tietosuojavastaava',
    lyhyt: 'Ulkoistettu tietosuojavastaava, kun nimittäminen on pakollista tai perusteltua.',
    pieni: 590,
    keski: 990,
    laaja: 1500,
  },
} as const;

// Vaikutustenarvioinnin hinta ohjelmiston laajuuden mukaan. Ylin rivi vastaa perushintaa,
// jotta aiemmat esimerkkihinnat pätevät edelleen.
export const OHJELMISTOT = {
  claude: {
    nimi: 'Claude Team',
    artikkeli: '/artikkelit/claude-team-tietosuoja',
    lyhyt: 'Erillinen tekoälytyökalu ilman koko toimisto-ohjelmiston arviointia.',
    pieni: 890,
    keski: 1290,
    laaja: 2900,
  },
  m365: {
    nimi: 'Microsoft 365 (O365)',
    artikkeli: '/artikkelit/microsoft-365-tietosuoja',
    lyhyt: 'Sähköposti, tiedostot, Teams ja yhteistyö.',
    pieni: 990,
    keski: 1490,
    laaja: 3400,
  },
  workspace: {
    nimi: 'Google Workspace',
    artikkeli: '/artikkelit/google-workspace-tietosuoja',
    lyhyt: 'Gmail, Drive, Meet ja yhteistyö.',
    pieni: 990,
    keski: 1490,
    laaja: 3400,
  },
  copilot: {
    nimi: 'Microsoft 365 ja Copilot',
    artikkeli: '/artikkelit/microsoft-365-copilot-tietosuoja',
    lyhyt: 'Tekoäly pääsee käyttäjän sähköposteihin ja tiedostoihin.',
    pieni: 1190,
    keski: 1790,
    laaja: 3900,
  },
  gemini: {
    nimi: 'Google Workspace ja Gemini',
    artikkeli: '/artikkelit/google-gemini-tietosuoja',
    lyhyt: 'Tekoäly pääsee käyttäjän sähköposteihin ja tiedostoihin.',
    pieni: 1190,
    keski: 1790,
    laaja: 3900,
  },
} as const;

export type OhjelmistoAvain = keyof typeof OHJELMISTOT;
export const OHJELMISTOJEN_JARJESTYS = Object.keys(OHJELMISTOT) as OhjelmistoAvain[];

// Lisäarvioinnit tarvitaan vain tietyissä tilanteissa, joten ne eivät kuulu pakettiin vaan lisätään siihen.
export const ARVIOINNIT = {
  lia: {
    nimi: 'Oikeutetun edun arviointi (LIA)',
    polku: '/oikeutetun-edun-arviointi',
    lyhyt: 'Voiko käsittely perustua oikeutettuun etuun?',
    yksikko: 'käsittelyä kohden',
    pieni: 290,
    keski: 490,
    laaja: 790,
    toimitus: '2 arkipäivää',
  },
  tia: {
    nimi: 'Siirtovaikutusten arviointi (TIA)',
    polku: '/siirtovaikutusten-arviointi',
    lyhyt: 'Ovatko EU:n ulkopuolelle siirtyvät tiedot suojassa?',
    yksikko: 'toimittajaa kohden',
    pieni: 390,
    keski: 690,
    laaja: 1290,
    toimitus: '3 arkipäivää',
  },
  fria: {
    nimi: 'Perusoikeusvaikutusten arviointi (FRIA)',
    polku: '/perusoikeusvaikutusten-arviointi',
    lyhyt: 'Suuririskisen tekoälyn vaikutukset perusoikeuksiin.',
    yksikko: 'järjestelmää kohden',
    pieni: 1290,
    keski: 2490,
    laaja: 4900,
    toimitus: '5–10 arkipäivää',
  },
} as const;

export type ArviointiAvain = keyof typeof ARVIOINNIT;
export const ARVIOINTIEN_JARJESTYS = Object.keys(ARVIOINNIT) as ArviointiAvain[];

/** Paketin osien yhteenlaskettu hinta erikseen ostettuna. */
export function pakettiErikseen(koko: KokoId): number {
  return HINNAT.tarkastus[koko] + HINNAT.tietosuojaseloste[koko] + HINNAT.seloste[koko];
}

export const ESIMERKIT = {
  // 25 hengen yritys: ennakkoarvio ja tarvittaessa vaikutustenarviointi.
  copilot: HINNAT.ennakkoarvio.keski + HINNAT.vaikutustenarviointi.keski,
  // Kunnan suuririskinen tekoälyjärjestelmä tarvitsee molemmat arvioinnit.
  kuntafria: HINNAT.vaikutustenarviointi.laaja + ARVIOINNIT.fria.laaja,
  claudekeski: OHJELMISTOT.claude.keski + ARVIOINNIT.tia.keski,
};

const paketti = (koko: KokoId) => ({ nimi: `${PAKETTI.nimi} -paketti`, hinta: PAKETTI[koko] });

// Lasketaan yhteen koodissa, jotta summa ei voi jäädä vanhaksi hinnan muuttuessa.
export const KOKONAISUUDET = [
  {
    otsikko: 'Pieni yritys, 8 henkeä',
    kuvaus: 'Google Workspace ja Gemini',
    rivit: [
      paketti('pieni'),
      { nimi: 'Vaikutustenarviointi: Workspace ja Gemini', hinta: OHJELMISTOT.gemini.pieni },
      { nimi: 'Oikeutetun edun arviointi (LIA)', hinta: ARVIOINNIT.lia.pieni },
    ],
  },
  {
    otsikko: 'Ohjelmistoyritys, 25 henkeä',
    kuvaus: 'Claude Team, perusasiakirjat kunnossa',
    rivit: [
      { nimi: 'Vaikutustenarviointi: Claude Team', hinta: OHJELMISTOT.claude.keski },
      { nimi: 'Siirtovaikutusten arviointi (TIA)', hinta: ARVIOINNIT.tia.keski },
    ],
  },
  {
    otsikko: 'Asiantuntijayritys, 30 henkeä',
    kuvaus: 'Microsoft 365 ja Copilot',
    rivit: [
      paketti('keski'),
      { nimi: 'Vaikutustenarviointi: Microsoft 365 ja Copilot', hinta: OHJELMISTOT.copilot.keski },
      { nimi: 'Oikeutetun edun arviointi (LIA)', hinta: ARVIOINNIT.lia.keski },
    ],
  },
  {
    otsikko: 'Palveluyritys, 120 henkeä',
    kuvaus: 'Microsoft 365, Copilot ja yksi toimittaja EU:n ulkopuolella',
    rivit: [
      paketti('laaja'),
      { nimi: 'Vaikutustenarviointi: Microsoft 365 ja Copilot', hinta: OHJELMISTOT.copilot.laaja },
      { nimi: 'Siirtovaikutusten arviointi (TIA)', hinta: ARVIOINNIT.tia.laaja },
      { nimi: 'Oikeutetun edun arviointi (LIA)', hinta: ARVIOINNIT.lia.laaja },
    ],
  },
  {
    otsikko: 'Kunta, tekoäly rekrytoinnissa',
    kuvaus: 'Suuririskinen tekoälyjärjestelmä',
    rivit: [
      { nimi: 'Vaikutustenarviointi, laaja', hinta: HINNAT.vaikutustenarviointi.laaja },
      { nimi: 'Perusoikeusvaikutusten arviointi (FRIA)', hinta: ARVIOINNIT.fria.laaja },
    ],
  },
].map((k) => ({ ...k, yhteensa: k.rivit.reduce((summa, r) => summa + r.hinta, 0) }));

/** Muotoilee summan suomalaisittain sitovilla väleillä, jottei hinta katkea rivinvaihdossa. */
export function eur(summa: number): string {
  return `${String(summa).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} €`;
}

const TUNNUKSET: Record<string, Record<string, unknown>> = {
  ...HINNAT,
  paketti: PAKETTI,
  ...JATKUVAT,
  ...OHJELMISTOT,
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
