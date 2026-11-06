// Asettaa esikatselun salasanan. Salasana kysytään piilotettuna, eikä se tallennu mihinkään:
// tiedostoon site.config.mjs kirjoitetaan vain suolattu PBKDF2-tiiviste.
// Tiiviste päätyy julkiseen repoon, joten älä käytä salasanaa, jota käytät muualla.
// Aja: npm run salasana
import { pbkdf2Sync, randomBytes } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { createInterface } from 'node:readline';
import { fileURLToPath } from 'node:url';

const KIERROKSET = 200000;
const TIEDOSTO = fileURLToPath(new URL('../site.config.mjs', import.meta.url));

function kysy(kehote) {
  return new Promise((valmis) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    let mykistetty = false;
    rl._writeToOutput = (s) => {
      if (!mykistetty) rl.output.write(s);
    };
    rl.question(kehote, (vastaus) => {
      rl.close();
      process.stdout.write('\n');
      valmis(vastaus);
    });
    mykistetty = true;
  });
}

const salasana = await kysy('Esikatselun salasana: ');
if (salasana.length < 8) {
  console.error('Salasanassa pitää olla vähintään 8 merkkiä. Mitään ei muutettu.');
  process.exit(1);
}
if ((await kysy('Sama uudelleen: ')) !== salasana) {
  console.error('Salasanat eivät täsmää. Mitään ei muutettu.');
  process.exit(1);
}

const suola = randomBytes(16);
const tiiviste = `${suola.toString('hex')}:${KIERROKSET}:${pbkdf2Sync(salasana, suola, KIERROKSET, 32, 'sha256').toString('hex')}`;
const vanha = readFileSync(TIEDOSTO, 'utf8');
const uusi = vanha.replace(/tiiviste: (null|'[^']*'),/, `tiiviste: '${tiiviste}',`);
if (uusi === vanha) {
  console.error('Tiivisteen kohtaa ei löytynyt tiedostosta site.config.mjs. Mitään ei muutettu.');
  process.exit(1);
}
writeFileSync(TIEDOSTO, uusi);
console.log('Salasana asetettu. Tiiviste on tallennettu tiedostoon site.config.mjs.');
