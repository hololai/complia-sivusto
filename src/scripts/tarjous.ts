// Lomake toimii ilman JavaScriptiä. Skripti vain merkitsee täyttöajan alun roskapostisuojaa varten,
// valitsee palvelun valmiiksi Tilaa-painikkeen perusteella ja näyttää vastaanottopalvelun virheilmoituksen.
const lomake = document.querySelector<HTMLFormElement>('[data-tarjous]');
const aika = document.querySelector<HTMLInputElement>('[data-tarjous-aika]');
const virhe = document.querySelector<HTMLElement>('[data-tarjous-virhe]');

const VIRHEET: Record<string, string> = {
  kentat: 'Tarkista tähdellä merkityt kentät ja sähköpostiosoite, ja lähetä pyyntö uudelleen.',
  raja: 'Olet lähettänyt useita pyyntöjä lyhyessä ajassa. Yritä hetken kuluttua uudelleen tai lähetä sähköpostia.',
  lahetys: 'Pyynnön lähetys ei onnistunut. Yritä uudelleen tai lähetä sähköpostia osoitteeseen info@complia.fi.',
};

if (lomake) {
  if (aika) aika.value = String(Date.now());
  const haku = new URLSearchParams(location.search);
  const palvelu = haku.get('palvelu');
  const kentta = lomake.elements.namedItem('palvelu') as HTMLSelectElement | null;
  if (palvelu && kentta && [...kentta.options].some((o) => o.value === palvelu)) kentta.value = palvelu;
  const koodi = haku.get('virhe');
  if (koodi && virhe && VIRHEET[koodi]) {
    virhe.textContent = VIRHEET[koodi];
    virhe.hidden = false;
  }
}
