// Kuntien palvelukuvaus hankintapäätöksen liitteeksi. Sisältö kootaan samasta datasta kuin
// sivut: hinnat tiedostosta src/data/hinnat.ts ja palvelujen kuvaukset palvelusivujen
// etusivutiedoista. Tätä käyttävät sekä PDF:n tekijä (tee-palvelukuvaus.mjs) että tarkistin,
// joka huomaa, jos PDF on jäänyt jälkeen hinnoista.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SIVUSTO } from '../site.config.mjs';
import {
  ARVIOINNIN_SISALTO,
  ARVIOINNIT,
  HINNAT,
  JARJESTELMAT,
  JARJESTELMIEN_JARJESTYS,
  JATKO,
  JATKUVAT,
  PAKETTI,
  eur,
  sijoitaHinnat,
} from '../src/data/hinnat.ts';

const JUURI = fileURLToPath(new URL('..', import.meta.url));
export const PDF_POLKU = 'lataukset/complia-palvelukuvaus-kunnille.pdf';
export const TILA_POLKU = join(JUURI, 'scripts', 'palvelukuvaus.json');

const html = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const iso = (s) => s.charAt(0).toUpperCase() + s.slice(1);

/** Palvelusivun etusivutiedot, joista PDF:n kuvaukset tulevat. */
function palvelu(tiedosto) {
  const s = readFileSync(join(JUURI, 'src', 'content', 'palvelut', `${tiedosto}.md`), 'utf8');
  const kentta = (nimi) => {
    const m = s.match(new RegExp(`^${nimi}: "(.*)"$`, 'm'));
    if (!m) throw new Error(`${tiedosto}.md: kenttä ${nimi} puuttuu`);
    return sijoitaHinnat(m[1]);
  };
  return { sopii: kentta('sopii'), saat: kentta('saat'), tarvitsemme: kentta('tarvitsemme') };
}

// Kunnalle olennaiset kokoluokat. Pienen organisaation hinnat ovat hinnastossa.
const SARAKKEET = [
  { id: 'keski', nimi: 'Yksittäinen palvelu tai yksikkö' },
  { id: 'laaja', nimi: 'Koko toimiala tai laaja järjestelmä' },
];

function hintataulu(rivit, { kk = false, otsikot = SARAKKEET } = {}) {
  const paate = kk ? '/kk' : '';
  return `<table class="hinnat">
  <thead><tr><th scope="col">Palvelu</th>${otsikot.map((o) => `<th scope="col" class="h">${html(o.nimi)}</th>`).join('')}</tr></thead>
  <tbody>${rivit
    .map(
      (r) =>
        `<tr><th scope="row">${html(r.nimi)}${r.lisa ? `<span>${html(r.lisa)}</span>` : ''}</th>${otsikot
          .map((o) => `<td class="h">${r[o.id] == null ? '–' : `${eur(r[o.id])}${paate}`}</td>`)
          .join('')}</tr>`,
    )
    .join('')}</tbody>
</table>`;
}

function kuvaus(p, toimitus) {
  return `<dl class="kuvaus">
  <div><dt>Sopii, kun</dt><dd>${html(iso(p.sopii))}</dd></div>
  <div><dt>Saatte</dt><dd>${html(iso(p.saat))}</dd></div>
  <div><dt>Tarvitsemme</dt><dd>${html(iso(p.tarvitsemme))}</dd></div>
  ${toimitus ? `<div><dt>Toimitus</dt><dd>${html(toimitus)}</dd></div>` : ''}
</dl>`;
}

const vali = (a, b) => `${eur(a).slice(0, -2)}–${eur(b)}`;

/** Puuttuva tieto näkyy PDF:ssä punaisena, jotta keskeneräistä ei lähetetä huomaamatta. */
function tieto(arvo, nimi, puuttuvat) {
  if (arvo) return html(arvo);
  puuttuvat.push(nimi);
  return `<span class="tayta">TÄYDENNÄ: ${html(nimi)}</span>`;
}

/** Palauttaa palvelukuvauksen sisällön HTML:nä ilman päivämäärää sekä puuttuvat tiedot. */
export function palvelukuvaus() {
  const puuttuvat = [];
  const y = SIVUSTO.yritys;
  const domain = SIVUSTO.osoite.replace('https://', '');
  const dpia = palvelu('vaikutustenarviointi');
  const fria = palvelu('perusoikeusvaikutusten-arviointi');
  const ttp = palvelu('tietotilinpaatos');
  const gap = palvelu('tietosuojatarkastus');
  const ts = palvelu('tietosuojaseloste');
  const ropa = palvelu('seloste-kasittelytoimista');
  const vastaava = palvelu('tietosuojavastaava');

  const sisalto = `
<header class="kansi">
  <p class="merkki"><svg viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="7" fill="#17453a"></rect><path d="M9 16.5l4.6 4.6L23 11.5" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg>${html(SIVUSTO.nimi)}</p>
  <h1>Tietosuojapalvelut kunnille</h1>
  <p class="alaotsikko">Palvelukuvaus hankintapäätöksen liitteeksi: sisältö, hinnat ja toimitusajat</p>
</header>

<section>
  <h2>Toimittaja</h2>
  <table class="tiedot">
    <tbody>
      <tr><th scope="row">Yritys</th><td>${tieto(y.nimi, 'yrityksen nimi', puuttuvat)}</td><th scope="row">Y-tunnus</th><td>${tieto(y.ytunnus, 'Y-tunnus', puuttuvat)}</td></tr>
      <tr><th scope="row">Osoite</th><td>${tieto(y.katuosoite, 'osoite', puuttuvat)}</td><th scope="row">Sähköposti</th><td>${html(SIVUSTO.sahkoposti)}</td></tr>
      <tr><th scope="row">Verkkosivut</th><td>${html(domain)}</td><th scope="row">Tarjouspyyntö</th><td>${html(domain)}/yhteystiedot</td></tr>
      <tr><th scope="row">Asiantuntijat</th><td colspan="3">${SIVUSTO.tiimi.map(iso).join(' · ')}</td></tr>
    </tbody>
  </table>
</section>

<section>
  <h2>Hinnoittelu</h2>
  <ul>
    <li>Jokaisella palvelulla on kiinteä hinta ja luvattu toimitusaika. Ei tuntilaskutusta.</li>
    <li>Hinnat ovat alv 0 %, ja niihin lisätään arvonlisävero 25,5 %.</li>
    <li>Hinta ja toimitusaika vahvistetaan kirjallisena ennen kuin työ alkaa. Lasku lähtee vasta, kun olette hyväksyneet valmiit asiakirjat.</li>
    <li>Hinta riippuu laajuudesta: yksittäinen palvelu tai yksikkö, tai koko toimiala tai laaja integroitu järjestelmä. Pienten yksiköiden hinnat ja ajantasainen hinnasto ovat osoitteessa ${html(domain)}/hinnasto.</li>
  </ul>
</section>

<section>
  <h2>Palvelut lyhyesti</h2>
  <table class="hinnat">
    <thead><tr><th scope="col">Palvelu</th><th scope="col">Toimitus</th><th scope="col" class="h">Hinta, alv 0 %</th></tr></thead>
    <tbody>
      <tr><th scope="row">1. Vaikutustenarviointi<span>järjestelmää kohden, kaikki tarvittava mukana</span></th><td>${html(HINNAT.vaikutustenarviointi.toimitus)}</td><td class="h">${vali(JARJESTELMAT.rajattu.keski, JARJESTELMAT.arkaluonteinen.laaja)}</td></tr>
      <tr><th scope="row">2. ${html(ARVIOINNIT.fria.nimi)}</th><td>${html(ARVIOINNIT.fria.toimitus)}</td><td class="h">${vali(ARVIOINNIT.fria.keski, ARVIOINNIT.fria.laaja)}</td></tr>
      <tr><th scope="row">3. ${html(HINNAT.tietotilinpaatos.nimi)}</th><td>${html(HINNAT.tietotilinpaatos.toimitus)}</td><td class="h">${vali(HINNAT.tietotilinpaatos.keski, HINNAT.tietotilinpaatos.laaja)}</td></tr>
      <tr><th scope="row">4. ${html(HINNAT.tarkastus.nimi)}</th><td>${html(HINNAT.tarkastus.toimitus)}</td><td class="h">${vali(HINNAT.tarkastus.keski, HINNAT.tarkastus.laaja)}</td></tr>
      <tr><th scope="row">5. ${html(HINNAT.tietosuojaseloste.nimi)}</th><td>${html(HINNAT.tietosuojaseloste.toimitus)}</td><td class="h">${vali(HINNAT.tietosuojaseloste.keski, HINNAT.tietosuojaseloste.laaja)}</td></tr>
      <tr><th scope="row">5. ${html(HINNAT.seloste.nimi)}</th><td>${html(HINNAT.seloste.toimitus)}</td><td class="h">${vali(HINNAT.seloste.keski, HINNAT.seloste.laaja)}</td></tr>
      <tr><th scope="row">6. Erilliset arvioinnit<span>ennakkoarvio, tasapainotesti, siirtovaikutusten arviointi</span></th><td>2–3 arkipäivää</td><td class="h">${vali(HINNAT.ennakkoarvio.keski, ARVIOINNIT.tia.keski)}</td></tr>
      <tr><th scope="row">7. ${html(JATKUVAT.vastaava.nimi)}</th><td>jatkuva</td><td class="h">${vali(JATKUVAT.vastaava.keski, JATKUVAT.vastaava.laaja)}/kk</td></tr>
    </tbody>
  </table>
</section>

<section class="palvelu">
  <h2>1. Vaikutustenarviointi järjestelmähankintaan</h2>
  <p>Hinta on järjestelmää kohden ja sisältää kaiken, mitä käyttöönotto tietosuojan kannalta vaatii:</p>
  <ul class="tarkistukset">${ARVIOINNIN_SISALTO.map((s) => `<li>${html(iso(s))}</li>`).join('')}</ul>
  ${kuvaus(dpia, HINNAT.vaikutustenarviointi.toimitus)}
  ${hintataulu(JARJESTELMIEN_JARJESTYS.map((a) => ({ ...JARJESTELMAT[a], lisa: JARJESTELMAT[a].esimerkit ? iso(JARJESTELMAT[a].esimerkit) : '' })))}
  <p class="pieni">Jos ennakkoarvio osoittaa, ettei vaikutustenarviointia tarvita, maksatte vain ennakkoarvion (${eur(HINNAT.ennakkoarvio.keski)}). Useampi järjestelmä samassa arvioinnissa hinnoitellaan kiinteällä tarjouksella.</p>
</section>

<section class="palvelu">
  <h2>2. ${html(ARVIOINNIT.fria.nimi)}</h2>
  <p>Tekoälyasetuksen 27 artiklan mukainen arviointi, kun julkinen toimija ottaa käyttöön suuririskisen tekoälyjärjestelmän. Tehdään tarvittaessa yhdessä vaikutustenarvioinnin kanssa.</p>
  ${kuvaus(fria, ARVIOINNIT.fria.toimitus)}
  ${hintataulu([{ ...ARVIOINNIT.fria, lisa: ARVIOINNIT.fria.yksikko }])}
</section>

<section class="palvelu">
  <h2>3. ${html(HINNAT.tietotilinpaatos.nimi)}</h2>
  ${kuvaus(ttp, HINNAT.tietotilinpaatos.toimitus)}
  ${hintataulu([{ ...HINNAT.tietotilinpaatos, nimi: HINNAT.tietotilinpaatos.nimi }], {
    otsikot: [
      { id: 'keski', nimi: 'Keskikokoinen kunta' },
      { id: 'laaja', nimi: 'Iso kunta' },
    ],
  })}
</section>

<section class="palvelu">
  <h2>4. ${html(HINNAT.tarkastus.nimi)}</h2>
  <p>Hyvä ensimmäinen askel, kun ei ole selvää, mitä tietosuojasta puuttuu. Analyysi vertaa nykytilaa tietosuoja-asetuksen vaatimuksiin, ja toimenpidelistassa on hinta jokaiselle korjaukselle.</p>
  ${kuvaus(gap, HINNAT.tarkastus.toimitus)}
  ${hintataulu([HINNAT.tarkastus])}
</section>

<section class="palvelu">
  <h2>5. Tietosuojaselosteet ja seloste käsittelytoimista</h2>
  <h3>${html(HINNAT.tietosuojaseloste.nimi)}</h3>
  ${kuvaus(ts, HINNAT.tietosuojaseloste.toimitus)}
  <h3>${html(HINNAT.seloste.nimi)}</h3>
  ${kuvaus(ropa, HINNAT.seloste.toimitus)}
  ${hintataulu([
    HINNAT.tietosuojaseloste,
    HINNAT.seloste,
    { ...PAKETTI, nimi: `${PAKETTI.nimi} -paketti`, lisa: iso(PAKETTI.sisalto) },
    { ...JATKO, lisa: 'GAP-analyysin hinta vähennetään paketista' },
  ])}
</section>

<section class="palvelu">
  <h2>6. Erilliset arvioinnit</h2>
  <p>Kun koko vaikutustenarviointia ei tarvita. Hinta on sama laajuudesta riippumatta.</p>
  <table class="hinnat">
    <thead><tr><th scope="col">Arviointi</th><th scope="col">Toimitus</th><th scope="col" class="h">Hinta</th></tr></thead>
    <tbody>
      <tr><th scope="row">${html(HINNAT.ennakkoarvio.nimi)}<span>Tarvitaanko vaikutustenarviointi? Hyvitetään, jos jatkatte arviointiin.</span></th><td>${html(HINNAT.ennakkoarvio.toimitus)}</td><td class="h">${eur(HINNAT.ennakkoarvio.keski)}</td></tr>
      <tr><th scope="row">${html(ARVIOINNIT.lia.nimi)}<span>${html(iso(ARVIOINNIT.lia.yksikko))}</span></th><td>${html(ARVIOINNIT.lia.toimitus)}</td><td class="h">${eur(ARVIOINNIT.lia.keski)}</td></tr>
      <tr><th scope="row">${html(ARVIOINNIT.tia.nimi)}<span>${html(iso(ARVIOINNIT.tia.yksikko))}</span></th><td>${html(ARVIOINNIT.tia.toimitus)}</td><td class="h">${eur(ARVIOINNIT.tia.keski)}</td></tr>
    </tbody>
  </table>
</section>

<section class="palvelu">
  <h2>7. Jatkuvat palvelut</h2>
  <h3>${html(JATKUVAT.vastaava.nimi)}</h3>
  ${kuvaus(vastaava, null)}
  ${hintataulu(
    [
      { ...JATKUVAT.vastaava, lisa: JATKUVAT.vastaava.lyhyt },
      { ...JATKUVAT.kunnossa, lisa: JATKUVAT.kunnossa.lyhyt },
    ],
    { kk: true },
  )}
  <p class="pieni">Jatkuvan palvelun hankinnan arvo lasketaan koko sopimuskaudelta.</p>
</section>

<section class="palvelu">
  <h2>Näin työ etenee</h2>
  <ol>
    <li><strong>Tarjouspyyntö.</strong> Lähettäkää tarjouspyyntö tai sähköpostia: mitä tarvitsette ja aikataulu.</li>
    <li><strong>Tilausvahvistus.</strong> Kiinteä hinta ja toimitusaika kirjallisena. Tilaukseen liitetään käsittelysopimus (tietosuoja-asetuksen 28 artikla).</li>
    <li><strong>Aineisto ja haastattelut.</strong> Palvelukohtaisesti edellä kuvatulla tavalla.</li>
    <li><strong>Toimitus.</strong> Asiakirjat ovat teidän, ja saatte ne muokattavina tiedostoina.</li>
    <li><strong>Hyväksyntä ja lasku.</strong> Korjaamme virheet maksutta. Lasku lähtee hyväksynnän jälkeen.</li>
  </ol>
</section>

<section class="palvelu">
  <h2>Tietosuoja ja tietoturva</h2>
  <ul>
    <li>Asiakirjoissa kuvataan tietoryhmiä ja käsittelyjä, ei yksittäisiä ihmisiä. Emme pyydä kuntalaisten, asiakkaiden tai työntekijöiden tietoja, vaan käsittelemme lähinnä yhteyshenkilöiden nimiä ja yhteystietoja.</li>
    <li>Tiedot ovat Complia-työkalussa, joka toimii Googlen pilvipalvelussa EU:ssa. Vain nimetty asiantuntija kirjautuu työkaluun.</li>
    <li>Tekoälyä käytetään tekstien luonnosteluun ilman henkilötietoja: nimet korvataan rooleilla ja asiakkaan nimi paikkamerkillä.</li>
    <li>Sopimuksen päättyessä saatte asiakirjat Word-tiedostoina, ja poistamme tiedot työkalusta. Varmuuskopiot poistetaan 30 päivän kuluessa.</li>
  </ul>
</section>

<section class="palvelu">
  <h2>Hankinta</h2>
  <p>Kertapalvelut ovat pienhankintojen kokoluokkaa. Noudattakaa kunnan hankintaohjetta. Tilauksiin sovelletaan toimitusehtoja (${html(domain)}/toimitusehdot) ja käsittelysopimusta (${html(domain)}/kasittelysopimus).</p>
</section>
`;
  const tiiviste = createHash('sha256').update(sisalto).digest('hex').slice(0, 16);
  return { sisalto, puuttuvat, tiiviste };
}

/** Koko tulostettava HTML-sivu. Fontit ladataan paikallisista tiedostoista. */
export function tulostettava(sisalto, paivays) {
  const fontti = (paketti, tiedosto) => `file://${join(JUURI, 'node_modules', '@fontsource-variable', paketti, 'files', tiedosto)}`;
  const nimi = SIVUSTO.yritys.nimi ?? SIVUSTO.nimi;
  const domain = SIVUSTO.osoite.replace('https://', '');
  return `<!doctype html>
<html lang="fi">
<head>
<meta charset="utf-8">
<title>Tietosuojapalvelut kunnille – palvelukuvaus | ${html(SIVUSTO.nimi)}</title>
<style>
@font-face { font-family: 'Inter'; font-weight: 100 900; font-display: block; src: url('${fontti('inter', 'inter-latin-wght-normal.woff2')}') format('woff2'); }
@font-face { font-family: 'Source Serif'; font-weight: 200 900; font-display: block; src: url('${fontti('source-serif-4', 'source-serif-4-latin-wght-normal.woff2')}') format('woff2'); }
@page {
  size: A4;
  margin: 18mm 18mm 20mm;
  @bottom-left { content: "${html(nimi)} · ${html(domain)} · päivitetty ${html(paivays)}"; font: 7.5pt 'Inter', sans-serif; color: #515c57; }
  @bottom-right { content: "Sivu " counter(page) " / " counter(pages); font: 7.5pt 'Inter', sans-serif; color: #515c57; }
}
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; font: 9.5pt/1.5 'Inter', sans-serif; color: #18211e; }
h1, h2, h3 { font-family: 'Source Serif', Georgia, serif; font-weight: 600; line-height: 1.2; margin: 0 0 0.5em; break-after: avoid; }
h1 { font-size: 26pt; letter-spacing: -0.01em; }
h2 { font-size: 14pt; color: #17453a; margin-top: 1.4em; padding-bottom: 0.25em; border-bottom: 1.5px solid #17453a; }
h3 { font-size: 11pt; margin-top: 1em; }
p, ul, ol { margin: 0 0 0.7em; }
ul, ol { padding-left: 1.2em; }
li { margin-bottom: 0.25em; }
.kansi { padding: 8mm 9mm 7mm; margin: 0 0 2mm; border-radius: 4mm; background: #0e2f27; color: #eef3ef; }
.kansi h1 { color: #fff; margin-bottom: 0.2em; }
.merkki { display: flex; align-items: center; gap: 2.5mm; font-family: 'Source Serif', serif; font-size: 13pt; font-weight: 650; color: #f1d999; margin-bottom: 4mm; }
.merkki svg { width: 7mm; height: 7mm; }
.alaotsikko { font-size: 11pt; color: rgb(238 243 239 / 85%); margin: 0; }
table { width: 100%; border-collapse: collapse; margin: 0.4em 0 0.8em; break-inside: avoid; }
th, td { text-align: left; vertical-align: top; padding: 1.6mm 2.2mm; border-bottom: 0.5pt solid #ddd9cd; }
thead th { background: #e5eee8; font-weight: 600; font-size: 8.5pt; }
tbody th { font-weight: 600; }
tbody th span { display: block; font-weight: 400; font-size: 8pt; color: #515c57; }
.h { text-align: right; white-space: nowrap; font-variant-numeric: tabular-nums; }
.tiedot th { width: 24mm; color: #515c57; font-weight: 500; }
.kuvaus { display: grid; grid-template-columns: 26mm 1fr; gap: 1mm 4mm; margin: 0.4em 0 0.6em; }
.kuvaus div { display: contents; }
.kuvaus dt { font-weight: 600; color: #515c57; }
.kuvaus dd { margin: 0; }
.tarkistukset { list-style: none; padding-left: 0; columns: 2; column-gap: 6mm; }
.tarkistukset li { padding-left: 4.5mm; position: relative; break-inside: avoid; }
.tarkistukset li::before { content: '✓'; position: absolute; left: 0; color: #17453a; font-weight: 700; }
.palvelu { break-inside: avoid-page; }
.pieni { font-size: 8.5pt; color: #515c57; }
.tayta { background: #fbe3de; color: #9b2c1a; font-weight: 700; padding: 0 1mm; }
</style>
</head>
<body>
${sisalto}
</body>
</html>`;
}
