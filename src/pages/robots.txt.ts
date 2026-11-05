import type { APIRoute } from 'astro';
import { SIVUSTO } from '../../site.config.mjs';

// Ennen julkaisua sivut estetään noindex-merkinnällä. Disallow estäisi hakukonetta näkemästä sitä.
export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${SIVUSTO.osoite}/sitemap.xml\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
