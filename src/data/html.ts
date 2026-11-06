// Markdownista syntyvät taulukot kääritään vierityslaatikkoon. Silloin taulukko voi täyttää
// tekstipalstan leveyden ja vierittyä silti kapealla näytöllä ilman, että sivu levenee.
export function kaariTaulukot(html: string): string {
  return html
    .replace(/<table>/g, '<div class="taulu" role="region" aria-label="Taulukko" tabindex="0"><table>')
    .replace(/<\/table>/g, '</table></div>');
}
