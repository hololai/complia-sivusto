import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SIVUSTO } from '../../site.config.mjs';

const KIINTEAT = [
  '/',
  '/palvelut',
  '/hinnasto',
  '/kunnat',
  '/artikkelit',
  '/pikatesti',
  '/tietosuojaselostepohja',
  '/meista',
  '/yhteystiedot',
  '/tietosuoja',
  '/saavutettavuus',
  '/toimitusehdot',
  '/kasittelysopimus',
];

// Päivämäärä vain artikkeleille: Google luottaa lastmod-arvoon vain, jos se pitää paikkansa.
export const GET: APIRoute = async () => {
  const palvelut = await getCollection('palvelut');
  const artikkelit = await getCollection('artikkelit');
  const rivit = [
    ...KIINTEAT.map((p) => ({ polku: p })),
    ...palvelut.map((p) => ({ polku: `/${p.id}` })),
    ...artikkelit.map((a) => ({
      polku: `/artikkelit/${a.id}`,
      lastmod: a.data.paivitetty.toISOString().slice(0, 10),
    })),
  ];
  const urlit = rivit
    .map((r) => {
      const loc = new URL(r.polku, SIVUSTO.osoite).href;
      return `  <url><loc>${loc}</loc>${r.lastmod ? `<lastmod>${r.lastmod}</lastmod>` : ''}</url>`;
    })
    .join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlit}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
