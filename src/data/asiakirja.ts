// Yhteinen rakenne sivustolla näytettäville asiakirjoille (selostepohja, käsittelysopimus,
// toimitusehdot). Samasta datasta syntyvät sivu ja Word-tiedosto, joten ne eivät voi erota.
//
// Tekstin merkinnät:
//   [teksti]    kenttä, jonka asiakas täyttää (keltainen)
//   <<teksti>>  tieto, joka meidän pitää täydentää ennen julkaisua (Täydennä-merkintä,
//               jonka julkaisutarkistus estää)

export type Osa =
  | { tyyppi: 'kappale'; teksti: string }
  | { tyyppi: 'rivit'; rivit: string[] }
  | { tyyppi: 'lista'; kohdat: string[] }
  | { tyyppi: 'taulukko'; otsikot: string[]; rivit: string[][] }
  | { tyyppi: 'vaihtoehdot'; vaihtoehdot: string[] }
  | { tyyppi: 'ohje'; teksti: string };

export interface Osio {
  otsikko: string;
  /** Korvaa juoksevan numeron, esimerkiksi liitteissä. */
  tunnus?: string;
  osat: Osa[];
}

export interface Asiakirja {
  otsikko: string;
  alaotsikko?: string;
  /** Täyttöohje asiakirjan alussa. Ei kuulu valmiiseen asiakirjaan. */
  ohje?: string;
  osiot: Osio[];
}

export type Pala = { teksti: string; tyyppi: 'teksti' | 'kentta' | 'tayta' };

export function palat(teksti: string): Pala[] {
  return teksti
    .split(/(\[[^\]]+\]|<<[^>]+>>)/)
    .filter(Boolean)
    .map((osa) => {
      if (osa.startsWith('<<')) return { teksti: osa.slice(2, -2), tyyppi: 'tayta' as const };
      if (osa.startsWith('[')) return { teksti: osa, tyyppi: 'kentta' as const };
      return { teksti: osa, tyyppi: 'teksti' as const };
    });
}

export const kirjain = (i: number) => String.fromCharCode(65 + i);

export const osionNumero = (osio: Osio, i: number) => osio.tunnus ?? String(i + 1);

/** Kopioitava teksti ilman täyttöohjeita. */
export function tekstina(a: Asiakirja): string {
  const rivit: string[] = [a.otsikko, ...(a.alaotsikko ? [a.alaotsikko] : []), ''];
  a.osiot.forEach((osio, i) => {
    rivit.push(osio.tunnus ? osio.otsikko : `${i + 1}. ${osio.otsikko}`);
    for (const osa of osio.osat) {
      if (osa.tyyppi === 'kappale') rivit.push(osa.teksti);
      if (osa.tyyppi === 'rivit') rivit.push(...osa.rivit);
      if (osa.tyyppi === 'lista') rivit.push(...osa.kohdat.map((k) => `- ${k}`));
      if (osa.tyyppi === 'taulukko') rivit.push(...osa.rivit.map((r) => `- ${r.join(': ')}`));
      if (osa.tyyppi === 'vaihtoehdot') rivit.push(...osa.vaihtoehdot.map((v, j) => `Vaihtoehto ${kirjain(j)}: ${v}`));
    }
    rivit.push('');
  });
  return rivit.join('\n').trim();
}
