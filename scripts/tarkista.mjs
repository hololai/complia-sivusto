// Tarkistaa valmiin dist-kansion hakukone-, saavutettavuus- ja tietosuojasäännöt.
// `--julkaisu` tekee puuttuvista tiedoista virheitä, jolloin keskeneräistä ei voi julkaista.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SIVUSTO } from '../site.config.mjs';
import { PDF_POLKU, TILA_POLKU, palvelukuvaus } from './palvelukuvaus.mjs';
import { ARVIOINNIT, HINNAT, JARJESTELMAT, JARJESTELMIEN_JARJESTYS, KOOT, PAKETTI, pakettiErikseen } from '../src/data/hinnat.ts';

const JULKAISU = process.argv.includes('--julkaisu');
const PAGES = process.argv.includes('--pages');
const JUURI = fileURLToPath(new URL('..', import.meta.url));
const DIST = join(JUURI, 'dist');
const virheet = [];
const varoitukset = [];
const virhe = (sivu, viesti) => virheet.push(`${sivu}: ${viesti}`);
const varoitus = (sivu, viesti) => varoitukset.push(`${sivu}: ${viesti}`);

function tiedostot(kansio) {
  return readdirSync(kansio).flatMap((nimi) => {
    const polku = join(kansio, nimi);
    return statSync(polku).isDirectory() ? tiedostot(polku) : [polku];
  });
}

const purku = (s) =>
  s
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;|&#34;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;| /g, ' ');

function sivunPolku(tiedosto) {
  const suht = relative(DIST, tiedosto).split(sep).join('/');
  if (suht === 'index.html') return '/';
  return `/${suht.replace(/\.html$/, '')}`;
}

const sivut = tiedostot(DIST)
  .filter((t) => t.endsWith('.html'))
  .map((t) => {
    const html = readFileSync(t, 'utf8');
    return {
      polku: sivunPolku(t),
      html,
      otsikko: purku(html.match(/<title>(.*?)<\/title>/s)?.[1] ?? ''),
      kuvaus: purku(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? ''),
      canonical: html.match(/<link rel="canonical" href="([^"]*)"/)?.[1],
      h1: [...html.matchAll(/<h1[^>]*>(.*?)<\/h1>/gs)].map((m) => purku(m[1].replace(/<[^>]+>/g, ''))),
      idt: new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])),
    };
  });
const sivuPolulla = new Map(sivut.map((s) => [s.polku, s]));
const lomakkeenPalvelut = new Set(
  [...(sivuPolulla.get('/yhteystiedot')?.html.match(/<select[^>]*name="palvelu"[\s\S]*?<\/select>/)?.[0] ?? '').matchAll(
    /<option value="([^"]*)"/g,
  )].map((m) => m[1]).filter(Boolean),
);

const nahdyt = { otsikko: new Map(), kuvaus: new Map() };
const puuttuvat = new Map();

for (const s of sivut) {
  const { polku, html } = s;

  if (!html.startsWith('<!DOCTYPE html>') && !html.toLowerCase().startsWith('<!doctype html>')) virhe(polku, 'doctype puuttuu sivun alusta');
  if (!html.includes('<html lang="fi"')) virhe(polku, 'lang="fi" puuttuu');
  if (s.h1.length !== 1) virhe(polku, `H1-otsikoita on ${s.h1.length}, pitää olla yksi`);

  // Ilme: yksi päätoiminto per osio, eikä tarjouslehden yliviivattuja hintoja (päätös 11.11.2026).
  for (const osio of html.matchAll(/<section[\s\S]*?<\/section>/g)) {
    const kultaiset = (osio[0].match(/painike--kulta/g) ?? []).length;
    if (kultaiset > 1) virhe(polku, `osiossa on ${kultaiset} kultaista painiketta, pitää olla enintään yksi`);
  }
  if (/<(s|del|strike)[\s>]/.test(html)) virhe(polku, 'sivulla on yliviivattua tekstiä: ei yliviivattuja hintoja');

  if (!s.otsikko) virhe(polku, 'title puuttuu');
  else if (s.otsikko.length > 65) varoitus(polku, `title on pitkä (${s.otsikko.length} merkkiä): ${s.otsikko}`);

  if (!s.kuvaus) virhe(polku, 'metakuvaus puuttuu');
  else if (s.kuvaus.length >= 155) virhe(polku, `metakuvaus on ${s.kuvaus.length} merkkiä, pitää olla alle 155: ${s.kuvaus}`);
  else if (s.kuvaus.length < 70) varoitus(polku, `metakuvaus on lyhyt (${s.kuvaus.length} merkkiä)`);

  for (const [avain, arvo] of [['otsikko', s.otsikko], ['kuvaus', s.kuvaus]]) {
    if (nahdyt[avain].has(arvo)) virhe(polku, `sama ${avain} kuin sivulla ${nahdyt[avain].get(arvo)}`);
    nahdyt[avain].set(arvo, polku);
  }

  const odotettu = new URL(polku, SIVUSTO.osoite).href;
  if (polku !== '/404' && s.canonical !== odotettu) virhe(polku, `canonical on ${s.canonical}, odotettiin ${odotettu}`);

  // Otsikkotasot eivät saa hypätä yli, koska ruudunlukijan käyttäjä liikkuu niiden mukaan.
  const main = html.match(/<main[^>]*>(.*)<\/main>/s)?.[1] ?? '';
  let edellinen = 1;
  for (const m of main.matchAll(/<h([1-6])[\s>]/g)) {
    const taso = Number(m[1]);
    if (taso > edellinen + 1) virhe(polku, `otsikkotaso hyppää h${edellinen} -> h${taso}`);
    edellinen = taso;
  }

  for (const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    try {
      JSON.parse(m[1]);
    } catch (e) {
      virhe(polku, `rakenteinen tieto ei ole kelvollista JSON:ia: ${e.message}`);
    }
  }

  // Lupaus: ei ulkoisia resursseja, ei seurantaa, ja tiukka CSP pitää.
  for (const m of html.matchAll(/<(script|link|img|iframe)\b[^>]*>/g)) {
    const tagi = m[0];
    if (tagi.includes('rel="canonical"')) continue;
    if (/(?:src|href)="(?:https?:)?\/\//.test(tagi)) virhe(polku, `ulkoinen resurssi: ${tagi}`);
  }
  for (const m of html.matchAll(/<script\b([^>]*)>/g)) {
    if (!/\bsrc=/.test(m[1]) && !m[1].includes('application/ld+json')) virhe(polku, 'sisäinen skripti rikkoo CSP:n');
  }
  if (/<style\b/.test(html)) virhe(polku, 'sisäinen style-tagi rikkoo CSP:n');
  if (/\sstyle="/.test(html)) virhe(polku, 'style-attribuutti rikkoo CSP:n');
  // Lomake saa lähettää tietoja vain omaan vastaanottopalveluun (lomake/, Google Cloud Run Suomessa).
  // Pikatesti laskee selaimessa eikä lähetä mitään.
  for (const m of html.matchAll(/<form\b[^>]*>/g)) {
    const kohde = m[0].match(/\saction="([^"]*)"/)?.[1];
    if (kohde !== undefined && kohde !== `${SIVUSTO.lomakeOsoite}/laheta`) virhe(polku, `lomake lähettää muualle kuin omaan vastaanottoon: ${kohde}`);
    if (kohde === undefined && /\smethod=/.test(m[0])) virhe(polku, `lomakkeella on method ilman vastaanottoa: ${m[0]}`);
  }
  if (/http-equiv="Content-Security-Policy"/.test(html) && !html.includes(`form-action 'self' ${new URL(SIVUSTO.lomakeOsoite).origin};`)) virhe(polku, 'CSP:n form-action ei rajaa lomaketta omaan vastaanottoon');
  // Lomakkeen lähettäjätili ja muut henkilökohtaiset osoitteet eivät kuulu sivustolle.
  if (/@famula\.fi/i.test(html)) virhe(polku, 'sivulla on famula.fi-sähköpostiosoite');
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt="/.test(m[0])) virhe(polku, `kuvalta puuttuu alt: ${m[0]}`);
  }

  if (html.includes('{{')) virhe(polku, 'korvaamaton {{hintatunnus}} sivulla');
  if (html.includes('&lt;&lt;')) virhe(polku, 'käsittelemätön <<täydennä>>-merkintä sivulla');

  // Sisäiset linkit ja ankkurit: rikkinäinen linkki on sekä hakukone- että käyttäjäongelma.
  for (const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const url = purku(m[1]);
    if (!url.startsWith('/') && !url.startsWith('#')) continue;
    if (url.startsWith('//')) continue;
    const [ilmanAnkkuria, ankkuri] = url.split('#');
    const kohde = (ilmanAnkkuria.split('?')[0] || polku).replace(/\/$/, '') || '/';
    if (kohde !== polku && !sivuPolulla.has(kohde) && !existsSync(join(DIST, decodeURI(kohde)))) {
      virhe(polku, `rikkinäinen linkki: ${url}`);
      continue;
    }
    const kohdeSivu = sivuPolulla.get(kohde);
    if (ankkuri && kohdeSivu && !kohdeSivu.idt.has(ankkuri)) virhe(polku, `ankkuria ei löydy: ${url}`);
  }

  // Tilaa-painike vie aina lomakkeelle, jossa palvelu on valmiiksi valittuna (src/scripts/tarjous.ts).
  for (const m of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)) {
    const href = purku(m[1].match(/href="([^"]*)"/)?.[1] ?? '');
    const teksti = purku(m[2].replace(/<[^>]+>/g, '')).trim();
    const palvelu = href.match(/^\/yhteystiedot\?palvelu=([^&#]*)/)?.[1];
    if (/^Tilaa/i.test(teksti) && palvelu === undefined) virhe(polku, `"${teksti}" ei vie esitäytettyyn lomakkeeseen: ${href}`);
    else if (palvelu !== undefined && !lomakkeenPalvelut.has(palvelu)) virhe(polku, `lomakkeella ei ole palvelua "${palvelu}": ${href}`);
  }

  // Kootaan puuttuvat tiedot yhdeksi listaksi: alatunnisteen kohdat näkyvät muuten joka sivulla.
  for (const m of html.matchAll(/<mark[^>]*data-tayta[^>]*>(.*?)<\/mark>/gs)) {
    const teksti = purku(m[1].replace(/<[^>]+>/g, '')).replace(/^Täydennä:\s*/, '').trim();
    if (!puuttuvat.has(teksti)) puuttuvat.set(teksti, new Set());
    puuttuvat.get(teksti).add(polku);
  }
  if (/<span data-tayta>/.test(html)) {
    const teksti = 'lomakkeen vastaanottava palvelu';
    if (!puuttuvat.has(teksti)) puuttuvat.set(teksti, new Set());
    puuttuvat.get(teksti).add(polku);
  }
}

for (const [teksti, polut] of puuttuvat) {
  const missa = polut.size > 3 ? `${polut.size} sivulla` : [...polut].join(', ');
  (JULKAISU ? virhe : varoitus)(`Täydennä (${missa})`, teksti);
}

// Sivukartta ja rakenteen eheys
const sivukartta = readFileSync(join(DIST, 'sitemap.xml'), 'utf8');
const kartalla = new Set([...sivukartta.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]));
for (const s of sivut) {
  if (s.polku === '/404' || s.polku === '/kiitos') continue;
  const osoite = new URL(s.polku, SIVUSTO.osoite).href;
  if (!kartalla.has(osoite)) virhe(s.polku, 'puuttuu sivukartasta');
  kartalla.delete(osoite);
}
for (const j of kartalla) virhe('sitemap.xml', `osoitetta ei ole olemassa: ${j}`);

// Hakusana otsikossa, H1:ssä ja metakuvauksessa. Vartalo riittää, koska suomessa sana taipuu.
function vartalo(sana) {
  return sana.length > 6 ? sana.slice(0, sana.length - 3) : sana;
}
for (const [kansio, etuliite] of [['palvelut', '/'], ['artikkelit', '/artikkelit/']]) {
  const juuri = join(JUURI, 'src/content', kansio);
  for (const nimi of readdirSync(juuri)) {
    const md = readFileSync(join(juuri, nimi), 'utf8');
    const polku = `${etuliite}${nimi.replace(/\.md$/, '')}`;
    const sivu = sivuPolulla.get(polku);
    if (!sivu) {
      virhe(polku, 'sisältötiedostolle ei syntynyt sivua');
      continue;
    }
    const hakusana = md.match(/^hakusana:\s*"?(.*?)"?\s*$/m)?.[1]?.toLowerCase();
    if (!hakusana) {
      virhe(polku, 'hakusana puuttuu');
      continue;
    }
    const sanat = hakusana.split(/\s+/).map(vartalo);
    for (const [nimike, teksti] of [['title', sivu.otsikko], ['H1', sivu.h1[0] ?? ''], ['metakuvaus', sivu.kuvaus]]) {
      if (!sanat.every((v) => teksti.toLowerCase().includes(v))) varoitus(polku, `hakusana "${hakusana}" ei näy kohdassa ${nimike}`);
    }
    const main = sivu.html.match(/<main[^>]*>(.*)<\/main>/s)?.[1] ?? '';
    const sanoja = main.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    if (sanoja < 400) varoitus(polku, `vain ${sanoja} sanaa sisältöä`);
  }
}

// Hinnaston laskut: paketin pitää oikeasti olla luvatun verran edullisempi.
for (const k of KOOT) {
  const erikseen = pakettiErikseen(k.id);
  const ale = 1 - PAKETTI[k.id] / erikseen;
  if (Math.abs(ale - 0.2) > 0.015) virhe('hinnat', `paketin alennus koossa ${k.id} on ${(ale * 100).toFixed(1)} %, luvattu noin 20 %`);
}
for (const [avain, p] of Object.entries({ ...HINNAT, ...JARJESTELMAT, ...ARVIOINNIT })) {
  const hinnat = [p.pieni, p.keski, p.laaja].filter((h) => h !== null);
  if (hinnat.some((h, i) => i > 0 && h < hinnat[i - 1])) virhe('hinnat', `${avain}: hinta laskee koon kasvaessa`);
}

// Laajempi järjestelmä ei saa olla halvempi kuin suppeampi samassa kokoluokassa.
for (const k of KOOT) {
  const rivi = JARJESTELMIEN_JARJESTYS.map((a) => JARJESTELMAT[a][k.id]);
  if (rivi.some((h, i) => i > 0 && h <= rivi[i - 1])) virhe('hinnat', `vaikutustenarvioinnin järjestelmärivit eivät kasva koossa ${k.id}`);
}

if (JULKAISU && !SIVUSTO.julkaistu) virhe('site.config.mjs', 'julkaistu on false: kaikki sivut ovat noindex');
// Esikatselua ei saa julkaista ilman salasanaa, eikä valmista sivustoa portin takana.
if (PAGES && SIVUSTO.esikatselu.paalla && !SIVUSTO.esikatselu.tiiviste) virhe('site.config.mjs', 'esikatselun salasana puuttuu: aja npm run salasana');
if (JULKAISU && SIVUSTO.esikatselu.paalla) virhe('site.config.mjs', 'esikatselun salasanaportti on päällä');
if (!JULKAISU && !SIVUSTO.julkaistu) varoitukset.push('site.config.mjs: julkaistu on false, joten sivut ovat noindex (oikein ennen julkaisua)');

const koko = tiedostot(DIST)
  .filter((t) => /\.(js|css|woff2)$/.test(t))
  .map((t) => ({ nimi: relative(DIST, t), tavua: statSync(t).size }));
const skriptit = koko.filter((t) => t.nimi.endsWith('.js')).reduce((a, t) => a + t.tavua, 0);

// Kuntien palvelukuvaus (PDF) tehdään samasta datasta kuin sivut. Jos hinnat tai yrityksen tiedot
// muuttuvat, PDF pitää tehdä uudelleen, muuten liitteessä olisi vanhoja hintoja.
const kuvaus = palvelukuvaus();
const kuvauksenTila = existsSync(TILA_POLKU) ? JSON.parse(readFileSync(TILA_POLKU, 'utf8')) : null;
if (!existsSync(join(DIST, PDF_POLKU))) virhe(PDF_POLKU, 'palvelukuvaus puuttuu: aja npm run asiakirjat');
else if (kuvauksenTila?.tiiviste !== kuvaus.tiiviste) virhe(PDF_POLKU, 'palvelukuvaus on vanhentunut: aja npm run asiakirjat');
if (kuvaus.puuttuvat.length) {
  const viesti = `palvelukuvauksesta puuttuu: ${kuvaus.puuttuvat.join(', ')}`;
  if (JULKAISU) virhe(PDF_POLKU, viesti);
  else varoitukset.push(`${PDF_POLKU}: ${viesti}`);
}

// Ei evästeitä eikä selaintallennusta. Salasanaportti (portti.js) on ainoa poikkeus, ja se poistuu julkaisussa.
for (const t of koko.filter((k) => k.nimi.endsWith('.js') && k.nimi !== 'portti.js')) {
  const sisalto = readFileSync(join(DIST, t.nimi), 'utf8');
  if (/document\.cookie|localStorage|sessionStorage|indexedDB/.test(sisalto)) virhe(t.nimi, 'skripti käyttää evästeitä tai selaintallennusta');
}
const tyylit = koko.filter((t) => t.nimi.endsWith('.css')).reduce((a, t) => a + t.tavua, 0);

console.log(`Sivuja ${sivut.length}, sivukartassa ${sivut.length - 1}. JavaScript yhteensä ${(skriptit / 1024).toFixed(1)} kt, tyylit ${(tyylit / 1024).toFixed(1)} kt.`);
if (varoitukset.length) console.log(`\nVaroitukset (${varoitukset.length}):\n  ${varoitukset.join('\n  ')}`);
if (virheet.length) {
  console.log(`\nVirheet (${virheet.length}):\n  ${virheet.join('\n  ')}`);
  process.exit(1);
}
console.log('\nEi virheitä.');
