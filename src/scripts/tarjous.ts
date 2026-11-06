// Kokoaa tarjouspyynnön sähköpostiviestiksi. Mitään ei lähetetä palvelimelle: viesti avataan kävijän
// omassa sähköpostiohjelmassa tai kopioidaan leikepöydälle. Ilman JavaScriptiä lomake pysyy piilossa.
const lomake = document.querySelector<HTMLFormElement>('[data-tarjous]');
const tila = document.querySelector<HTMLElement>('[data-tarjous-tila]');
const kopioi = document.querySelector<HTMLButtonElement>('[data-tarjous-kopioi]');

// Osa selaimista estää leikepöytärajapinnan, joten varalla on valintaan perustuva kopiointi.
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

if (lomake && tila && kopioi) {
  lomake.hidden = false;
  const osoite = lomake.dataset.osoite ?? '';
  const kentta = (nimi: string) => (lomake.elements.namedItem(nimi) as HTMLInputElement | HTMLSelectElement | null)?.value.trim() ?? '';
  const valinta = (nimi: string) => {
    const s = lomake.elements.namedItem(nimi) as HTMLSelectElement | null;
    return s?.value ? (s.selectedOptions[0]?.textContent ?? '') : '';
  };

  // Hinnaston Tilaa-painikkeet tuovat palvelun osoitteessa, jotta valinta on valmiina.
  const palvelu = new URLSearchParams(location.search).get('palvelu');
  const palveluKentta = lomake.elements.namedItem('palvelu') as HTMLSelectElement | null;
  if (palvelu && palveluKentta && [...palveluKentta.options].some((o) => o.value === palvelu)) palveluKentta.value = palvelu;

  const viesti = () => {
    const palveluNimi = valinta('palvelu') || 'ei vielä tiedossa';
    const otsikko = `Tarjouspyyntö: ${palveluNimi} – ${kentta('organisaatio')}`;
    // Vapaaehtoiset kentät jätetään pois, jos ne ovat tyhjiä.
    const tiedot: [string, string][] = [
      ['Nimi', `${kentta('etunimi')} ${kentta('sukunimi')}`],
      ['Sähköposti', kentta('sahkoposti')],
      ['Puhelin', kentta('puhelin')],
      ['Organisaatio', kentta('organisaatio')],
      ['Tehtävänimike', kentta('tehtava')],
      ['Organisaation tyyppi', kentta('tyyppi')],
      ['Henkilöstö', kentta('koko')],
      ['Palvelu', palveluNimi],
    ];
    const rivit = tiedot.filter(([, arvo]) => arvo).map(([nimi, arvo]) => `${nimi}: ${arvo}`);
    return { otsikko, runko: `${rivit.join('\n')}\n\n${kentta('viesti')}` };
  };

  const kunnossa = () => {
    if (lomake.checkValidity()) return true;
    lomake.reportValidity();
    tila.textContent = 'Täytä tähdellä merkityt kentät.';
    return false;
  };

  lomake.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!kunnossa()) return;
    const { otsikko, runko } = viesti();
    location.href = `mailto:${osoite}?subject=${encodeURIComponent(otsikko)}&body=${encodeURIComponent(runko)}`;
    tila.textContent = `Sähköpostiohjelmasi avautuu valmiilla viestillä. Jos mitään ei avautunut, valitse Kopioi viesti ja lähetä se osoitteeseen ${osoite}.`;
  });

  kopioi.addEventListener('click', async () => {
    if (!kunnossa()) return;
    const { otsikko, runko } = viesti();
    const teksti = `Vastaanottaja: ${osoite}\nAihe: ${otsikko}\n\n${runko}`;
    let onnistui = false;
    try {
      await navigator.clipboard.writeText(teksti);
      onnistui = true;
    } catch {
      onnistui = kopioiValinnalla(teksti);
    }
    tila.textContent = onnistui
      ? `Viesti kopioitu. Liitä se uuteen sähköpostiin ja lähetä osoitteeseen ${osoite}.`
      : `Kopiointi ei onnistunut. Lähetä viesti suoraan osoitteeseen ${osoite}.`;
  });
}
