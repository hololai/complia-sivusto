import { SIVUSTO } from '../../site.config.mjs';

export const ORG_ID = `${SIVUSTO.osoite}/#organisaatio`;

export function organisaatio() {
  const { yritys } = SIVUSTO;
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': ORG_ID,
    name: SIVUSTO.nimi,
    url: `${SIVUSTO.osoite}/`,
    slogan: SIVUSTO.slogan,
    description:
      'Valmiit tietosuoja-asiakirjat yrityksille ja kunnille julkisilla, kiinteillä hinnoilla: tietosuojaselosteet, selosteet käsittelytoimista, vaikutustenarvioinnit ja tietosuojatarkastukset.',
    email: SIVUSTO.sahkoposti,
    areaServed: { '@type': 'Country', name: 'Suomi' },
    knowsLanguage: 'fi',
    image: `${SIVUSTO.osoite}/og.png`,
    logo: `${SIVUSTO.osoite}/apple-touch-icon.png`,
    ...(yritys.ytunnus ? { vatID: yritys.ytunnus } : {}),
    ...(yritys.puhelin ? { telephone: yritys.puhelin } : {}),
    ...(yritys.katuosoite ? { address: yritys.katuosoite } : {}),
  };
}

export function verkkosivusto() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SIVUSTO.osoite}/#sivusto`,
    name: SIVUSTO.nimi,
    url: `${SIVUSTO.osoite}/`,
    inLanguage: 'fi',
    publisher: { '@id': ORG_ID },
  };
}

export function murupolku(murut: { nimi: string; polku: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: murut.map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: m.nimi,
      item: new URL(m.polku, SIVUSTO.osoite).href,
    })),
  };
}

// Google lopetti usein kysyttyjen rikkaat tulokset toukokuussa 2026, mutta merkintä on yhä
// sallittu ja auttaa muita hakukoneita ja tekoälyhakuja ymmärtämään sisällön.
export function usein(kysymykset: { k: string; v: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: kysymykset.map((q) => ({
      '@type': 'Question',
      name: q.k,
      acceptedAnswer: { '@type': 'Answer', text: q.v },
    })),
  };
}

export function palvelu(p: {
  nimi: string;
  kuvaus: string;
  polku: string;
  hinnat: { koko: string; hinta: number }[];
  kuukausi?: boolean;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: p.nimi,
    description: p.kuvaus,
    url: new URL(p.polku, SIVUSTO.osoite).href,
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'Suomi' },
    offers: p.hinnat.map((h) => ({
      '@type': 'Offer',
      name: h.koko,
      priceCurrency: 'EUR',
      price: h.hinta,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: h.hinta,
        priceCurrency: 'EUR',
        valueAddedTaxIncluded: false,
        ...(p.kuukausi ? { unitCode: 'MON' } : {}),
      },
    })),
  };
}

export function artikkeli(a: {
  otsikko: string;
  kuvaus: string;
  polku: string;
  julkaistu: Date;
  paivitetty: Date;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.otsikko,
    description: a.kuvaus,
    inLanguage: 'fi',
    mainEntityOfPage: new URL(a.polku, SIVUSTO.osoite).href,
    datePublished: a.julkaistu.toISOString().slice(0, 10),
    dateModified: a.paivitetty.toISOString().slice(0, 10),
    image: `${SIVUSTO.osoite}/og.png`,
    publisher: { '@id': ORG_ID },
    author: SIVUSTO.asiantuntijat.length ? SIVUSTO.asiantuntijat.map((a) => henkilo(a, false)) : { '@id': ORG_ID },
  };
}

type Asiantuntija = (typeof SIVUSTO.asiantuntijat)[number];

export function henkilo(a: Asiantuntija, erillinen = true) {
  return {
    ...(erillinen ? { '@context': 'https://schema.org' } : {}),
    '@type': 'Person',
    name: a.nimi,
    jobTitle: a.titteli,
    url: `${SIVUSTO.osoite}/meista`,
    worksFor: { '@id': ORG_ID },
    knowsAbout: ['tietosuoja', 'GDPR', 'tietosuojan vaikutustenarviointi', 'tekoäly ja tietosuoja'],
    ...(a.linkedin ? { sameAs: [a.linkedin] } : {}),
  };
}
