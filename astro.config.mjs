import { defineConfig } from 'astro/config';
import { SIVUSTO } from './site.config.mjs';

export default defineConfig({
  site: SIVUSTO.osoite,
  // Suunnitelman osoitteet ovat muotoa /hinnasto ilman loppuvinoviivaa. Tiedostomuoto
  // toimii sellaisenaan sekä Firebasessa (cleanUrls) että GitHub Pagesissa.
  trailingSlash: 'never',
  build: {
    format: 'file',
    // Tiukka CSP kieltää sisäiset tyylit, joten tyylit ovat aina omana tiedostonaan.
    inlineStylesheets: 'never',
  },
  // Sama syy skripteille: Vite ei saa upottaa pieniä skriptejä suoraan sivulle.
  vite: { build: { assetsInlineLimit: 0 } },
  devToolbar: { enabled: false },
  compressHTML: true,
});
