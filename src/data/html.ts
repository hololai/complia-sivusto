// Markdownista syntyvät taulukot kääritään vierityslaatikkoon. Silloin taulukko voi täyttää
// tekstipalstan leveyden ja vierittyä silti kapealla näytöllä ilman, että sivu levenee.
export function kaariTaulukot(html: string): string {
  return html
    .replace(/<table>/g, '<div class="taulu" role="region" aria-label="Taulukko" tabindex="0"><table>')
    .replace(/<\/table>/g, '</table></div>');
}

// Palvelusivun pitkä teksti näytetään avattavina osioina: lukija näkee aiheet yhdellä silmäyksellä,
// ja hakukone lukee myös suljetun sisällön. Osio alkaa jokaisesta h2-otsikosta.
export function jaaOsiin(html: string): { alku: string; osiot: { otsikko: string; sisalto: string }[] } {
  const palat = html.split(/(?=<h2[\s>])/);
  const alku = palat[0].startsWith('<h2') ? '' : palat.shift()!;
  const osiot = palat.map((pala) => {
    const loppu = pala.indexOf('</h2>') + '</h2>'.length;
    return { otsikko: pala.slice(0, loppu), sisalto: pala.slice(loppu) };
  });
  return { alku, osiot };
}
