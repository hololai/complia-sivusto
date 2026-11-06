// Markdownista syntyvät taulukot kääritään vierityslaatikkoon. Silloin taulukko voi täyttää
// tekstipalstan leveyden ja vierittyä silti kapealla näytöllä ilman, että sivu levenee.
export function kaariTaulukot(html: string): string {
  return html
    .replace(/<table>/g, '<div class="taulu" role="region" aria-label="Taulukko" tabindex="0"><table>')
    .replace(/<\/table>/g, '</table></div>');
}

/** Suomalainen puhelinnumero tel:-linkiksi kansainvälisessä muodossa. */
export function puhelinLinkki(numero: string): string {
  return `tel:${numero.replace(/[\s-]/g, '').replace(/^0/, '+358')}`;
}
