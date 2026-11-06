import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import { SIVUSTO } from './site.config.mjs';

// GitHub Pages julkaisee sivuston alipolkuun (/complia-sivusto), kunnes oma verkkotunnus on käytössä.
// Paikallisesti ja omalla verkkotunnuksella alipolkua ei ole.
const ALIPOLKU = (process.env.SIVUSTON_POLKU ?? '').replace(/\/$/, '');

function tiedostot(kansio) {
  return readdirSync(kansio).flatMap((nimi) => {
    const polku = join(kansio, nimi);
    return statSync(polku).isDirectory() ? tiedostot(polku) : [polku];
  });
}

// Astro lisää alipolun omiin resursseihinsa, mutta sivujen ja tekstien linkit on kirjoitettu
// juuresta (/hinnasto). Ne korjataan valmiisiin HTML-tiedostoihin yhdellä kertaa, jottei
// jokaiseen linkkiin tarvita apufunktiota.
function alipolkuLinkkeihin() {
  return {
    name: 'alipolku-linkkeihin',
    hooks: {
      'astro:build:done': ({ dir }) => {
        if (!ALIPOLKU) return;
        const nimi = ALIPOLKU.slice(1).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const kuvio = new RegExp(`(\\s(?:href|src|action)=")/(?!/)(?!${nimi}(?:/|"))`, 'g');
        for (const tiedosto of tiedostot(fileURLToPath(dir))) {
          if (!tiedosto.endsWith('.html')) continue;
          const html = readFileSync(tiedosto, 'utf8');
          writeFileSync(tiedosto, html.replace(kuvio, `$1${ALIPOLKU}/`));
        }
      },
    },
  };
}

export default defineConfig({
  site: SIVUSTO.osoite,
  base: ALIPOLKU || '/',
  // Suunnitelman osoitteet ovat muotoa /hinnasto ilman loppuvinoviivaa. Tiedostomuoto
  // toimii sellaisenaan sekä GitHub Pagesissa että muilla staattisilla palvelimilla.
  trailingSlash: 'never',
  build: {
    format: 'file',
    // Tiukka CSP kieltää sisäiset tyylit, joten tyylit ovat aina omana tiedostonaan.
    inlineStylesheets: 'never',
  },
  // Sama syy skripteille: Vite ei saa upottaa pieniä skriptejä suoraan sivulle.
  vite: { build: { assetsInlineLimit: 0 } },
  integrations: [alipolkuLinkkeihin()],
  devToolbar: { enabled: false },
  compressHTML: true,
});
