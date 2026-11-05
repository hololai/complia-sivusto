// Tekee ladattavan Word-pohjan sivulla näkyvästä mallista, jotta sisältöä ylläpidetään yhdessä paikassa.
// Aja `npm run build` ensin ja sen jälkeen uudelleen, jotta tiedosto tulee mukaan dist-kansioon.
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = fileURLToPath(new URL('..', import.meta.url));
const html = readFileSync(join(JUURI, 'dist/tietosuojaselostepohja.html'), 'utf8');
const malli = html.match(/<article[^>]*id="pohja"[^>]*>(.*?)<\/article>/s)?.[1];
if (!malli) throw new Error('Mallia ei löytynyt sivulta');

const valiaikainen = mkdtempSync(join(tmpdir(), 'pohja-'));
const lahde = join(valiaikainen, 'pohja.html');
writeFileSync(
  lahde,
  `<!doctype html><html lang="fi"><head><meta charset="utf-8"><title>Tietosuojaseloste, pohja</title>
  <style>body{font-family:Calibri,Arial,sans-serif;font-size:11pt}table{border-collapse:collapse}td,th{border:1px solid #888;padding:4pt}</style>
  </head><body>${malli}</body></html>`,
);
mkdirSync(join(JUURI, 'public/lataukset'), { recursive: true });
execFileSync('textutil', ['-convert', 'docx', '-output', join(JUURI, 'public/lataukset/tietosuojaseloste-pohja.docx'), lahde]);
rmSync(valiaikainen, { recursive: true });
console.log('Valmis: public/lataukset/tietosuojaseloste-pohja.docx');
