// Tulos lasketaan vain selaimessa. Vastauksia ei lähetetä eikä tallenneta.
const lomake = document.querySelector<HTMLFormElement>('[data-pikatesti]');

function tulosTunnus(pisteet: number): string {
  if (pisteet >= 8) return 'hyva';
  if (pisteet >= 4) return 'puutteita';
  return 'korjattavaa';
}

if (lomake) {
  lomake.addEventListener('submit', (e) => {
    e.preventDefault();
    const pisteet = [...new FormData(lomake).values()].filter((v) => v === '1').length;
    const tunnus = tulosTunnus(pisteet);
    document.querySelectorAll<HTMLElement>('[data-tulos]').forEach((osio) => {
      osio.hidden = osio.dataset.tulos !== tunnus;
      if (!osio.hidden) {
        osio.querySelector('[data-pisteet]')!.textContent = String(pisteet);
        // Kohdistus siirtyy tulokseen, jotta myös ruudunlukijan käyttäjä huomaa sen.
        osio.focus();
        osio.scrollIntoView({ block: 'center' });
      }
    });
  });
}
