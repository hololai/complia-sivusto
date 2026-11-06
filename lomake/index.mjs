// complia.fi:n tarjouspyynnön vastaanotto (Google Cloud Run, europe-north1).
//
// Tietosuoja: lomakkeen tiedot lähetetään sähköpostina osoitteeseen VASTAANOTTAJA eikä niitä tallenneta
// mihinkään. Lokeihin kirjataan vain tapahtuman tyyppi, ei henkilötietoja eikä IP-osoitteita.
// Roskapostisuoja ilman evästeitä ja kolmansia osapuolia: alkuperän tarkistus, ansakenttä,
// täyttöaika ja pyyntörajoitus.
//
// Ympäristömuuttujat:
//   SALLITUT_ALKUPERAT  pilkulla erotetut sivuston osoitteet, esim. https://complia.fi
//   PALUUOSOITE         sivusto, jonne kävijä ohjataan lähetyksen jälkeen, esim. https://complia.fi
//   VASTAANOTTAJA       esim. info@complia.fi
//   SMTP_KAYTTAJA       Google Workspace -tili, jonka kautta posti lähtee
//   SMTP_SALASANA       tilin sovellussalasana (Secret Managerista, ei koskaan repoon)
import { createServer } from 'node:http';
import nodemailer from 'nodemailer';

const env = (nimi) => {
  const arvo = process.env[nimi];
  if (!arvo) throw new Error(`Ympäristömuuttuja puuttuu: ${nimi}`);
  return arvo;
};
const SALLITUT = env('SALLITUT_ALKUPERAT').split(',').map((s) => s.trim());
const PALUU = env('PALUUOSOITE').replace(/\/$/, '');
const VASTAANOTTAJA = env('VASTAANOTTAJA');
const KAYTTAJA = env('SMTP_KAYTTAJA');

const posti = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: { user: KAYTTAJA, pass: env('SMTP_SALASANA') },
});

const ENIMMAISKOKO = 16 * 1024;
const MINIMIAIKA_MS = 3000; // Ihminen ei täytä lomaketta kolmessa sekunnissa.
const RAJA = { maara: 5, jaksoMs: 60 * 60 * 1000 };

// Kentät ja enimmäispituudet. Vain nämä päätyvät viestiin.
const KENTAT = {
  etunimi: { nimi: 'Etunimi', pituus: 80, pakollinen: true },
  sukunimi: { nimi: 'Sukunimi', pituus: 80, pakollinen: true },
  sahkoposti: { nimi: 'Sähköposti', pituus: 200, pakollinen: true },
  puhelin: { nimi: 'Puhelin', pituus: 40 },
  organisaatio: { nimi: 'Organisaatio', pituus: 200, pakollinen: true },
  tehtava: { nimi: 'Tehtävänimike', pituus: 120 },
  tyyppi: { nimi: 'Organisaation tyyppi', pituus: 60, pakollinen: true },
  koko: { nimi: 'Henkilöstö', pituus: 60, pakollinen: true },
  palvelu: { nimi: 'Palvelu', pituus: 120 },
  viesti: { nimi: 'Viesti', pituus: 4000, pakollinen: true },
};

// Pyyntörajoitus muistissa. IP-osoitetta ei tallenneta sellaisenaan, vaan siitä lasketaan
// tiiviste, joka unohtuu viimeistään tunnin kuluttua tai kun instanssi sammuu.
const laskurit = new Map();
async function rajoitettu(ip) {
  const avain = Buffer.from(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip))).toString('base64');
  const nyt = Date.now();
  const merkinnat = (laskurit.get(avain) ?? []).filter((t) => nyt - t < RAJA.jaksoMs);
  merkinnat.push(nyt);
  laskurit.set(avain, merkinnat);
  if (laskurit.size > 5000) laskurit.clear();
  return merkinnat.length > RAJA.maara;
}

const puhdas = (s) => String(s ?? '').replace(/\r\n?/g, '\n').trim();
const yksirivi = (s) => puhdas(s).replace(/\s+/g, ' ');
const sahkopostiOk = (s) => /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[^\s@<>()",;:]{2,}$/.test(s);

function ohjaa(res, polku) {
  res.writeHead(303, { Location: `${PALUU}${polku}`, 'Cache-Control': 'no-store' });
  res.end();
}

function lue(req) {
  return new Promise((resolve, reject) => {
    let koko = 0;
    const palat = [];
    req.on('data', (pala) => {
      koko += pala.length;
      if (koko > ENIMMAISKOKO) {
        reject(new Error('liian suuri'));
        req.destroy();
      } else palat.push(pala);
    });
    req.on('end', () => resolve(Buffer.concat(palat).toString('utf8')));
    req.on('error', reject);
  });
}

async function kasittele(req, res) {
  if (req.method === 'GET' && req.url === '/terve') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('ok');
  }
  if (req.method !== 'POST' || req.url !== '/laheta') {
    res.writeHead(404);
    return res.end();
  }

  // Vain complia.fi:n lomake saa lähettää. Selain lisää Origin-otsakkeen lomakkeen POST-pyyntöön.
  const alkupera = req.headers.origin ?? '';
  if (!SALLITUT.includes(alkupera)) {
    console.log('hylätty: alkuperä');
    res.writeHead(403);
    return res.end();
  }
  if (!String(req.headers['content-type'] ?? '').startsWith('application/x-www-form-urlencoded')) {
    res.writeHead(415);
    return res.end();
  }

  let tiedot;
  try {
    tiedot = new URLSearchParams(await lue(req));
  } catch {
    res.writeHead(413);
    return res.end();
  }

  // Ansakenttä on piilotettu ihmisiltä. Botille näytetään onnistuminen, jotta se ei opi kiertämään.
  if (tiedot.get('verkkosivu')) {
    console.log('hylätty: ansakenttä');
    return ohjaa(res, '/kiitos');
  }
  const aloitettu = Number(tiedot.get('aloitettu'));
  if (aloitettu && Date.now() - aloitettu < MINIMIAIKA_MS) {
    console.log('hylätty: liian nopea');
    return ohjaa(res, '/kiitos');
  }
  const ip = String(req.headers['x-forwarded-for'] ?? '').split(',')[0].trim() || req.socket.remoteAddress || '';
  if (await rajoitettu(ip)) {
    console.log('hylätty: pyyntöraja');
    return ohjaa(res, '/yhteystiedot?virhe=raja');
  }

  const arvot = {};
  for (const [avain, k] of Object.entries(KENTAT)) {
    const arvo = avain === 'viesti' ? puhdas(tiedot.get(avain)) : yksirivi(tiedot.get(avain));
    if ((k.pakollinen && !arvo) || arvo.length > k.pituus) {
      console.log('hylätty: kenttä');
      return ohjaa(res, '/yhteystiedot?virhe=kentat');
    }
    arvot[avain] = arvo;
  }
  if (!sahkopostiOk(arvot.sahkoposti)) {
    console.log('hylätty: sähköposti');
    return ohjaa(res, '/yhteystiedot?virhe=kentat');
  }

  const palvelu = arvot.palvelu || 'ei vielä tiedossa';
  const rivit = Object.entries(KENTAT)
    .filter(([avain]) => avain !== 'viesti' && arvot[avain])
    .map(([avain, k]) => `${k.nimi}: ${arvot[avain]}`);
  try {
    await posti.sendMail({
      from: { name: 'Complia tarjouspyyntö', address: KAYTTAJA },
      to: VASTAANOTTAJA,
      replyTo: { name: `${arvot.etunimi} ${arvot.sukunimi}`, address: arvot.sahkoposti },
      subject: `Tarjouspyyntö: ${palvelu} – ${arvot.organisaatio}`,
      text: `${rivit.join('\n')}\n\n${arvot.viesti}\n\n--\nLähetetty complia.fi:n tarjouspyyntölomakkeella. Vastaa tähän viestiin, niin vastaus menee pyytäjälle.`,
    });
  } catch (virhe) {
    console.error('lähetys epäonnistui:', virhe.code ?? virhe.name);
    return ohjaa(res, '/yhteystiedot?virhe=lahetys');
  }
  console.log('lähetetty');
  return ohjaa(res, '/kiitos');
}

createServer((req, res) => {
  kasittele(req, res).catch((virhe) => {
    console.error('odottamaton virhe:', virhe.name);
    if (!res.headersSent) ohjaa(res, '/yhteystiedot?virhe=lahetys');
  });
}).listen(Number(process.env.PORT ?? 8080));
