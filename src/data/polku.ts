// Sivun polku ilman julkaisun alipolkua. GitHub Pagesissa sivusto on alipolussa
// (/complia-sivusto), mutta canonical-osoitteet ja valikko käyttävät lopullisen verkkotunnuksen polkuja.
export function sivunPolku(url: URL): string {
  const alku = import.meta.env.BASE_URL.replace(/\/$/, '');
  let polku = url.pathname;
  if (alku && polku.startsWith(alku)) polku = polku.slice(alku.length);
  return polku.replace(/\.html$/, '').replace(/\/(index)?$/, '') || '/';
}
