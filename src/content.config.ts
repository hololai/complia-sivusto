import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const kysymys = z.object({ k: z.string(), v: z.string() });

const artikkelit = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/artikkelit' }),
  schema: z.object({
    h1: z.string(),
    otsikko: z.string(),
    kuvaus: z.string(),
    tiivistelma: z.string(),
    hakusana: z.string(),
    kohde: z.enum(['yritykset', 'kunnat', 'molemmat']),
    jarjestys: z.number(),
    julkaistu: z.coerce.date(),
    paivitetty: z.coerce.date(),
    palvelu: z.string(),
    kehotus: z.object({
      otsikko: z.string(),
      teksti: z.string(),
      nappi: z.string(),
      linkki: z.string(),
    }),
    usein: z.array(kysymys).default([]),
    lahteet: z.array(z.object({ nimi: z.string(), url: z.string().url() })).default([]),
  }),
});

const palvelut = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/palvelut' }),
  schema: z.object({
    nimi: z.string(),
    h1: z.string(),
    otsikko: z.string(),
    kuvaus: z.string(),
    hakusana: z.string(),
    jarjestys: z.number(),
    avain: z.string(),
    johdanto: z.string(),
    sopii: z.string(),
    saat: z.string(),
    tarvitsemme: z.string(),
    usein: z.array(kysymys),
    artikkeli: z.string().optional(),
  }),
});

export const collections = { artikkelit, palvelut };
