// Rakentaa ladattavan Word-pohjan samasta datasta kuin sivun mallin (src/data/pohja.ts).
// Asiakirja kootaan suoraan Office Open XML -muotoon, jotta taulukot, luettelot ja
// korostetut kentät säilyvät. Pakkaamiseen käytetään macOS:n zip-komentoa.
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { POHJA, POHJA_OTSIKKO, POHJA_PAIVAYS, kirjain, palat } from '../src/data/pohja.ts';
import { SIVUSTO } from '../site.config.mjs';

const JUURI = fileURLToPath(new URL('..', import.meta.url));
const KOHDE = join(JUURI, 'public/lataukset/tietosuojaseloste-pohja.docx');
const W = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';
const LEVEYS = 9072; // A4, marginaalit 2,5 cm

const xml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function ajo(teksti, { lihava = false } = {}) {
  const rpr = lihava ? '<w:rPr><w:b/></w:rPr>' : '';
  return `<w:r>${rpr}<w:t xml:space="preserve">${xml(teksti)}</w:t></w:r>`;
}

// Täytettävät kentät saavat saman keltaisen pohjan kuin sivulla.
function ajot(teksti) {
  return palat(teksti)
    .map((p) =>
      p.kentta
        ? `<w:r><w:rPr><w:shd w:val="clear" w:color="auto" w:fill="FFF2A8"/></w:rPr><w:t xml:space="preserve">${xml(p.teksti)}</w:t></w:r>`
        : ajo(p.teksti),
    )
    .join('');
}

const kappale = (sisalto, tyyli, lisa = '') =>
  `<w:p>${tyyli || lisa ? `<w:pPr>${tyyli ? `<w:pStyle w:val="${tyyli}"/>` : ''}${lisa}</w:pPr>` : ''}${sisalto}</w:p>`;

function solu(sisalto, otsikko) {
  const tcpr = `<w:tcPr><w:tcW w:w="2500" w:type="pct"/>${otsikko ? '<w:shd w:val="clear" w:color="auto" w:fill="E5EEE8"/>' : ''}</w:tcPr>`;
  const ajosisalto = otsikko ? ajo(sisalto, { lihava: true }) : ajot(sisalto);
  return `<w:tc>${tcpr}<w:p><w:pPr><w:pStyle w:val="Solu"/></w:pPr>${ajosisalto}</w:p></w:tc>`;
}

function taulukko(osa) {
  const raja = (n) => `<w:${n} w:val="single" w:sz="4" w:space="0" w:color="BFBAAA"/>`;
  const sarake = Math.floor(LEVEYS / osa.otsikot.length);
  return (
    `<w:tbl><w:tblPr><w:tblW w:w="5000" w:type="pct"/><w:tblBorders>${['top', 'left', 'bottom', 'right', 'insideH', 'insideV'].map(raja).join('')}</w:tblBorders>` +
    `<w:tblCellMar><w:top w:w="80" w:type="dxa"/><w:left w:w="120" w:type="dxa"/><w:bottom w:w="80" w:type="dxa"/><w:right w:w="120" w:type="dxa"/></w:tblCellMar></w:tblPr>` +
    `<w:tblGrid>${osa.otsikot.map(() => `<w:gridCol w:w="${sarake}"/>`).join('')}</w:tblGrid>` +
    `<w:tr><w:trPr><w:tblHeader/></w:trPr>${osa.otsikot.map((o) => solu(o, true)).join('')}</w:tr>` +
    osa.rivit.map((r) => `<w:tr>${r.map((s) => solu(s, false)).join('')}</w:tr>`).join('') +
    `</w:tbl>${kappale('', 'Vali')}`
  );
}

function osa(o) {
  switch (o.tyyppi) {
    case 'kappale':
      return kappale(ajot(o.teksti));
    case 'rivit':
      return kappale(o.rivit.map((r, i) => (i ? '<w:r><w:br/></w:r>' : '') + ajot(r)).join(''));
    case 'lista':
      return o.kohdat.map((k) => kappale(ajot(k), 'Luettelo', '<w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr>')).join('');
    case 'taulukko':
      return taulukko(o);
    case 'vaihtoehdot':
      return o.vaihtoehdot.map((v, i) => kappale(ajo(`Vaihtoehto ${kirjain(i)}: `, { lihava: true }) + ajot(v), 'Vaihtoehto')).join(kappale('', 'Vali'));
    case 'ohje':
      return kappale(ajo('Ohje: ', { lihava: true }) + ajo(o.teksti), 'Ohje');
    default:
      throw new Error(`Tuntematon osa: ${o.tyyppi}`);
  }
}

const runko = [
  kappale(ajot(POHJA_OTSIKKO), 'Title'),
  kappale(ajot(POHJA_PAIVAYS), 'Subtitle'),
  kappale(
    ajo('Täytä keltaiset kohdat, valitse vaihtoehdot ja poista ohjeet ennen julkaisua.'),
    'Ohje',
  ),
  ...POHJA.map((osio, i) => kappale(ajo(`${i + 1}. ${osio.otsikko}`), 'Heading1') + osio.osat.map(osa).join('')),
  kappale(
    ajo(`Pohja: ${SIVUSTO.nimi}, ${SIVUSTO.osoite.replace('https://', '')}. Valmis seloste kolmessa arkipäivässä: ${SIVUSTO.osoite.replace('https://', '')}/tietosuojaseloste`),
    'Huomautus',
  ),
].join('');

const dokumentti = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="${W}"><w:body>${runko}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1417" w:right="1417" w:bottom="1417" w:left="1417" w:header="708" w:footer="708" w:gutter="0"/></w:sectPr></w:body></w:document>`;

const tyyli = (id, nimi, ppr, rpr, tyyppi = 'paragraph') =>
  `<w:style w:type="${tyyppi}" w:styleId="${id}"><w:name w:val="${nimi}"/><w:basedOn w:val="Normal"/><w:qFormat/>${ppr ? `<w:pPr>${ppr}</w:pPr>` : ''}${rpr ? `<w:rPr>${rpr}</w:rPr>` : ''}</w:style>`;

const tyylit = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="${W}">
<w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:cs="Calibri" w:eastAsia="Calibri"/><w:color w:val="18211E"/><w:sz w:val="22"/><w:szCs w:val="22"/><w:lang w:val="fi-FI"/></w:rPr></w:rPrDefault>
<w:pPrDefault><w:pPr><w:spacing w:after="140" w:line="288" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>
<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style>
${tyyli('Title', 'Title', '<w:spacing w:after="80"/>', '<w:rFonts w:ascii="Georgia" w:hAnsi="Georgia"/><w:b/><w:sz w:val="40"/><w:szCs w:val="40"/>')}
${tyyli('Subtitle', 'Subtitle', '<w:pBdr><w:bottom w:val="single" w:sz="12" w:space="8" w:color="18211E"/></w:pBdr><w:spacing w:after="240"/>', '<w:color w:val="515C57"/>')}
${tyyli('Heading1', 'heading 1', '<w:keepNext/><w:spacing w:before="360" w:after="120"/><w:outlineLvl w:val="0"/>', '<w:rFonts w:ascii="Georgia" w:hAnsi="Georgia"/><w:b/><w:color w:val="17453A"/><w:sz w:val="28"/><w:szCs w:val="28"/>')}
${tyyli('Luettelo', 'List Paragraph', '<w:spacing w:after="60"/><w:ind w:left="360" w:hanging="360"/>', '')}
${tyyli('Solu', 'Taulukon teksti', '<w:spacing w:after="0"/>', '')}
${tyyli('Vali', 'Väli', '<w:spacing w:after="0" w:line="120" w:lineRule="exact"/>', '<w:sz w:val="8"/>')}
${tyyli('Vaihtoehto', 'Vaihtoehto', '<w:pBdr><w:top w:val="dashed" w:sz="6" w:space="4" w:color="BFBAAA"/><w:left w:val="dashed" w:sz="6" w:space="6" w:color="BFBAAA"/><w:bottom w:val="dashed" w:sz="6" w:space="4" w:color="BFBAAA"/><w:right w:val="dashed" w:sz="6" w:space="6" w:color="BFBAAA"/></w:pBdr><w:spacing w:before="120" w:after="120"/><w:ind w:left="120" w:right="120"/>', '')}
${tyyli('Ohje', 'Ohje', '<w:pBdr><w:left w:val="single" w:sz="18" w:space="8" w:color="7D5D1E"/></w:pBdr><w:shd w:val="clear" w:color="auto" w:fill="FAF5EA"/><w:spacing w:before="80" w:after="160"/><w:ind w:left="180"/>', '<w:i/><w:color w:val="7D5D1E"/><w:sz w:val="20"/><w:szCs w:val="20"/>')}
${tyyli('Huomautus', 'Huomautus', '<w:pBdr><w:top w:val="single" w:sz="4" w:space="8" w:color="DDD9CD"/></w:pBdr><w:spacing w:before="480"/>', '<w:color w:val="515C57"/><w:sz w:val="18"/><w:szCs w:val="18"/>')}
</w:styles>`;

const numerointi = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:numbering xmlns:w="${W}"><w:abstractNum w:abstractNumId="0"><w:multiLevelType w:val="singleLevel"/><w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="bullet"/><w:lvlText w:val="•"/><w:lvlJc w:val="left"/><w:pPr><w:ind w:left="360" w:hanging="360"/></w:pPr><w:rPr><w:color w:val="17453A"/></w:rPr></w:lvl></w:abstractNum><w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num></w:numbering>`;

const TIEDOSTOT = {
  '[Content_Types].xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/><Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/></Types>`,
  '_rels/.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/></Relationships>`,
  'word/_rels/document.xml.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/></Relationships>`,
  'word/document.xml': dokumentti,
  'word/styles.xml': tyylit,
  'word/numbering.xml': numerointi,
  // Ei tekijän nimeä eikä aikaleimoja: tiedosto on julkinen.
  'docProps/core.xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:title>Tietosuojaseloste, pohja</dc:title><dc:language>fi-FI</dc:language></cp:coreProperties>`,
  'docProps/app.xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"><Application>${xml(SIVUSTO.nimi)}</Application></Properties>`,
};

const valiaikainen = mkdtempSync(join(tmpdir(), 'pohja-'));
for (const [nimi, sisalto] of Object.entries(TIEDOSTOT)) {
  const polku = join(valiaikainen, nimi);
  mkdirSync(dirname(polku), { recursive: true });
  writeFileSync(polku, sisalto);
}
mkdirSync(dirname(KOHDE), { recursive: true });
rmSync(KOHDE, { force: true });
// -X jättää pois macOS:n lisämääritteet, jotka eivät kuulu asiakirjaan.
execFileSync('zip', ['-X', '-r', '-q', KOHDE, '[Content_Types].xml', '_rels', 'word', 'docProps'], { cwd: valiaikainen });
rmSync(valiaikainen, { recursive: true });
console.log(`Valmis: ${KOHDE.replace(JUURI, '')}`);
