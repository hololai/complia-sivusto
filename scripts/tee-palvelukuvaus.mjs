// Tulostaa kuntien palvelukuvauksen PDF:ksi Chromella (headless), jotta uusia riippuvuuksia
// ei tarvita. Aja: npm run asiakirjat. Chromen polun voi vaihtaa ympäristömuuttujalla CHROME.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PDF_POLKU, TILA_POLKU, palvelukuvaus, tulostettava } from './palvelukuvaus.mjs';

const JUURI = fileURLToPath(new URL('..', import.meta.url));
const CHROME = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
if (!existsSync(CHROME)) throw new Error(`Chromea ei löydy: ${CHROME}. Aseta polku ympäristömuuttujaan CHROME.`);

const { sisalto, puuttuvat, tiiviste } = palvelukuvaus();
const paivays = new Date().toLocaleDateString('fi-FI');
const kansio = mkdtempSync(join(tmpdir(), 'palvelukuvaus-'));
const sivu = join(kansio, 'palvelukuvaus.html');
const kohde = join(JUURI, 'public', PDF_POLKU);

try {
  writeFileSync(sivu, tulostettava(sisalto, paivays));
  execFileSync(
    CHROME,
    [
      '--headless',
      '--disable-gpu',
      '--no-first-run',
      '--no-default-browser-check',
      `--user-data-dir=${join(kansio, 'profiili')}`,
      '--no-pdf-header-footer',
      '--generate-pdf-document-outline',
      `--print-to-pdf=${kohde}`,
      `file://${sivu}`,
    ],
    { stdio: 'pipe' },
  );
} finally {
  rmSync(kansio, { recursive: true, force: true });
}

// Tarkistin vertaa tätä tiivistettä nykyiseen dataan ja huomaa, jos PDF on vanhentunut.
writeFileSync(TILA_POLKU, `${JSON.stringify({ tiiviste, puuttuvat, paivitetty: paivays }, null, 2)}\n`);
console.log(`Valmis: public/${PDF_POLKU} (${Math.round(statSync(kohde).size / 1024)} kt)`);
if (puuttuvat.length) console.log(`Puuttuu: ${puuttuvat.join(', ')}`);
