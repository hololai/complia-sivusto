// Kaikki hinnat ovat valmiina HTML:ssä hakukoneita ja JavaScriptittömiä selaimia varten.
// Skripti vain korostaa valitun koon ja kapealla näytöllä piilottaa muut sarakkeet.
const juuret = document.querySelectorAll<HTMLElement>('.hinnasto');
const valitsin = document.querySelector<HTMLElement>('[data-kokovalitsin]');

if (juuret.length && valitsin) {
  valitsin.hidden = false;
  const paivita = () => {
    const valittu = valitsin.querySelector<HTMLInputElement>('input:checked');
    if (valittu) juuret.forEach((juuri) => (juuri.dataset.koko = valittu.value));
  };
  valitsin.addEventListener('change', paivita);
  paivita();
}

// Esimerkkilaskelmat ovat avattavassa osiossa, ja niihin linkitetään muilta sivuilta (#kokonaisuudet).
// Avataan osio, jotta linkki ei vie suljetun otsikon kohdalle.
const avaaKohde = () => {
  const kohde = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
  if (kohde instanceof HTMLDetailsElement) kohde.open = true;
};
avaaKohde();
window.addEventListener('hashchange', avaaKohde);
