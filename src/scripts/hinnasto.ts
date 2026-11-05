// Kaikki hinnat ovat valmiina HTML:ssä hakukoneita ja JavaScriptittömiä selaimia varten.
// Skripti vain korostaa valitun koon ja kapealla näytöllä piilottaa muut sarakkeet.
const juuri = document.querySelector<HTMLElement>('.hinnasto');
const valitsin = document.querySelector<HTMLElement>('[data-kokovalitsin]');

if (juuri && valitsin) {
  valitsin.hidden = false;
  const paivita = () => {
    const valittu = valitsin.querySelector<HTMLInputElement>('input:checked');
    if (valittu) juuri.dataset.koko = valittu.value;
  };
  valitsin.addEventListener('change', paivita);
  paivita();
}
