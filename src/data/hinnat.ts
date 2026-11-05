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

/** Paketin osien yhteenlaskettu hinta erikseen ostettuna. */
export function pakettiErikseen(koko: KokoId): number {
  return HINNAT.tarkastus[koko] + HINNAT.tietosuojaseloste[koko] + HINNAT.seloste[koko];
}

export const ESIMERKIT = {
  // 25 hengen yritys: ennakkoarvio ja tarvittaessa vaikutustenarviointi.
  copilot: HINNAT.ennakkoarvio.keski + HINNAT.vaikutustenarviointi.keski,
};

/** Muotoilee summan suomalaisittain sitovilla väleillä, jottei hinta katkea rivinvaihdossa. */
export function eur(summa: number): string {
  return `${String(summa).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} €`;
}

const TUNNUKSET: Record<string, Record<string, unknown>> = {
  ...HINNAT,
  paketti: PAKETTI,
  ...JATKUVAT,
  esim: ESIMERKIT,
};

/** Korvaa tekstin {{palvelu.koko}}-merkinnät hinnoilla. Tuntematon tunnus kaataa buildin. */
export function sijoitaHinnat(teksti: string): string {
  return teksti.replace(/\{\{\s*([a-z]+)\.([a-z]+)\s*\}\}/g, (_, ryhma: string, kentta: string) => {
    const arvo = TUNNUKSET[ryhma]?.[kentta];
    if (typeof arvo !== 'number') throw new Error(`Tuntematon hintatunnus: {{${ryhma}.${kentta}}}`);
    return eur(arvo);
  });
}
