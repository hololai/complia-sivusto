// Tietosuojaselosteen pohja. Samasta datasta syntyvät sivun malli, kopioitava teksti ja
// ladattava Word-tiedosto, jotta ne eivät voi erota toisistaan.
// Hakasulkeissa oleva teksti on täytettävä kenttä. Ohjeet eivät kuulu valmiiseen selosteeseen.

export type Osa =
  | { tyyppi: 'kappale'; teksti: string }
  | { tyyppi: 'rivit'; rivit: string[] }
  | { tyyppi: 'lista'; kohdat: string[] }
  | { tyyppi: 'taulukko'; otsikot: string[]; rivit: string[][] }
  | { tyyppi: 'vaihtoehdot'; vaihtoehdot: string[] }
  | { tyyppi: 'ohje'; teksti: string };

export interface Osio {
  otsikko: string;
  osat: Osa[];
}

export const POHJA_OTSIKKO = 'Tietosuojaseloste: [Yrityksen nimi], asiakkaat';
export const POHJA_PAIVAYS = 'Päivitetty [päivämäärä]';

export const POHJA: Osio[] = [
  {
    otsikko: 'Rekisterinpitäjä',
    osat: [
      {
        tyyppi: 'rivit',
        rivit: [
          '[Yrityksen nimi], Y-tunnus [Y-tunnus]',
          '[Katuosoite, postinumero ja -toimipaikka]',
          'Tietosuoja-asioissa: [sähköposti], [puhelin]',
        ],
      },
      { tyyppi: 'ohje', teksti: 'Jos olette nimenneet tietosuojavastaavan, lisää tähän hänen yhteystietonsa.' },
    ],
  },
  {
    otsikko: 'Mihin tietoja käytetään ja millä perusteella',
    osat: [
      {
        tyyppi: 'taulukko',
        otsikot: ['Tarkoitus', 'Oikeusperuste'],
        rivit: [
          ['Tilausten ja palvelujen toimittaminen', 'sopimus'],
          ['Laskutus ja kirjanpito', 'lakisääteinen velvoite'],
          ['Asiakassuhteen hoito ja asiakaspalvelu', 'oikeutettu etu: asiakassuhteen ylläpito'],
          ['[Uutiskirje tai muu markkinointi]', '[suostumus tai oikeutettu etu]'],
        ],
      },
      { tyyppi: 'ohje', teksti: 'Jos peruste on oikeutettu etu, kerro mikä etu on ja tee tasapainotesti.' },
    ],
  },
  {
    otsikko: 'Mitä tietoja käsittelemme',
    osat: [
      {
        tyyppi: 'lista',
        kohdat: [
          'Yhteystiedot: nimi, sähköposti, puhelin, osoite',
          'Tilaus- ja laskutustiedot: [tilaukset, maksutapa, laskut]',
          'Yhteydenotot: [viestit, asiakaspalvelupyynnöt]',
          '[Muut tiedot, joita käsittelette]',
        ],
      },
      {
        tyyppi: 'kappale',
        teksti: 'Tarvitsemme [nimen ja yhteystiedot] sopimuksen toteuttamiseen. Ilman niitä emme voi toimittaa tilausta.',
      },
    ],
  },
  {
    otsikko: 'Mistä saamme tiedot',
    osat: [
      { tyyppi: 'kappale', teksti: 'Saamme tiedot pääosin sinulta itseltäsi.' },
      { tyyppi: 'ohje', teksti: 'Jos tietoja saadaan muualta, kerro mistä, esimerkiksi Yritys- ja yhteisötietojärjestelmästä.' },
    ],
  },
  {
    otsikko: 'Kenelle tietoja luovutetaan',
    osat: [
      {
        tyyppi: 'lista',
        kohdat: [
          'Kirjanpito: [tilitoimiston nimi]',
          'Tietojärjestelmät: [asiakasrekisterin toimittaja]',
          'Maksut: [maksunvälittäjä]',
          '[Muut vastaanottajat]',
        ],
      },
      {
        tyyppi: 'kappale',
        teksti: 'Palveluntarjoajat käsittelevät tietoja puolestamme käsittelysopimuksen perusteella. Emme myy tietoja.',
      },
    ],
  },
  {
    otsikko: 'Siirrot EU:n ja ETA:n ulkopuolelle',
    osat: [
      {
        tyyppi: 'vaihtoehdot',
        vaihtoehdot: [
          'Emme siirrä tietoja EU:n tai ETA:n ulkopuolelle.',
          '[Palvelu] siirtää tietoja maahan [maa]. Siirto perustuu [komission tietosuojan riittävyyspäätökseen tai vakiosopimuslausekkeisiin]. Lisätietoja saat osoitteesta [sähköposti].',
        ],
      },
      { tyyppi: 'ohje', teksti: 'Valitse toinen vaihtoehto ja poista toinen.' },
    ],
  },
  {
    otsikko: 'Kuinka kauan säilytämme tietoja',
    osat: [
      {
        tyyppi: 'lista',
        kohdat: [
          'Asiakastiedot: asiakassuhteen ajan ja [X kuukautta] sen päättymisestä',
          'Kirjanpitoaineisto: kirjanpitolain mukaisen ajan',
          '[Markkinointi: kunnes perut suostumuksen tai kiellät markkinoinnin]',
        ],
      },
    ],
  },
  {
    otsikko: 'Sinun oikeutesi',
    osat: [
      {
        tyyppi: 'kappale',
        teksti:
          'Sinulla on oikeus saada pääsy tietoihisi, oikaista ja poistaa niitä, rajoittaa ja vastustaa niiden käsittelyä sekä siirtää tiedot järjestelmästä toiseen. Jos käsittely perustuu suostumukseen, voit perua sen milloin tahansa. Lähetä pyyntö osoitteeseen [sähköposti].',
      },
    ],
  },
  {
    otsikko: 'Valitusoikeus',
    osat: [
      {
        tyyppi: 'kappale',
        teksti:
          'Jos katsot, että käsittelemme tietojasi lainvastaisesti, voit tehdä valituksen tietosuojavaltuutetun toimistolle.',
      },
    ],
  },
  {
    otsikko: 'Automaattinen päätöksenteko',
    osat: [
      {
        tyyppi: 'vaihtoehdot',
        vaihtoehdot: [
          'Emme tee sinua koskevia päätöksiä pelkästään automaattisesti.',
          '[Kuvaus käytetystä logiikasta sekä päätöksen merkityksestä ja vaikutuksista sinulle]',
        ],
      },
    ],
  },
];

/** Pilkkoo tekstin tavalliseen tekstiin ja täytettäviin [kenttiin]. */
export function palat(teksti: string): { teksti: string; kentta: boolean }[] {
  return teksti
    .split(/(\[[^\]]+\])/)
    .filter(Boolean)
    .map((osa) => ({ teksti: osa, kentta: osa.startsWith('[') }));
}

export const kirjain = (i: number) => String.fromCharCode(65 + i);

/** Kopioitava teksti ilman täyttöohjeita. */
export function pohjaTekstina(): string {
  const rivit: string[] = [POHJA_OTSIKKO, POHJA_PAIVAYS, ''];
  POHJA.forEach((osio, i) => {
    rivit.push(`${i + 1}. ${osio.otsikko}`);
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
