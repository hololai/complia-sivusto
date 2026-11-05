// Kopioi pohjan tekstin ilman täyttöohjeita. Teksti on valmiina sivulla, joten skripti ei
// tarvitse verkkoa. Ilman JavaScriptiä painike pysyy piilossa.
const nappi = document.querySelector<HTMLButtonElement>('[data-kopioi]');
const lahde = document.querySelector<HTMLTemplateElement>('[data-pohja-teksti]');
const tila = document.querySelector<HTMLElement>('[data-kopioi-tila]');

// Osa selaimista ja upotetuista näkymistä estää leikepöytärajapinnan, joten varalla on
// vanha valintaan perustuva kopiointi.
function kopioiValinnalla(teksti: string): boolean {
  const alue = document.createElement('textarea');
  alue.value = teksti;
  alue.setAttribute('readonly', '');
  alue.className = 'visually-hidden';
  document.body.append(alue);
  alue.select();
  const onnistui = document.execCommand('copy');
  alue.remove();
  return onnistui;
}

if (nappi && lahde) {
  nappi.hidden = false;
  nappi.addEventListener('click', async () => {
    const teksti = lahde.content.textContent ?? '';
    let onnistui = false;
    try {
      await navigator.clipboard.writeText(teksti);
      onnistui = true;
    } catch {
      onnistui = kopioiValinnalla(teksti);
    }
    if (tila) tila.textContent = onnistui ? 'Pohja kopioitu leikepöydälle.' : 'Kopiointi ei onnistunut. Lataa pohja Word-tiedostona.';
  });
}
