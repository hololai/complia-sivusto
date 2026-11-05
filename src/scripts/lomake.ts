const lomake = document.querySelector<HTMLFormElement>('[data-yhteys]');

if (lomake) {
  // Hinnaston Tilaa-painikkeet tuovat palvelun osoitteessa, jotta aihe on valmiiksi oikein.
  const palvelu = new URLSearchParams(location.search).get('palvelu');
  const aihe = lomake.querySelector<HTMLSelectElement>('#aihe');
  if (palvelu && aihe && [...aihe.options].some((o) => o.value === palvelu)) aihe.value = palvelu;

  // Kunnes lomakkeella on palvelin, siisti sähköpostiviesti on parempi kuin selaimen raakamuotoilu.
  if (lomake.action.startsWith('mailto:')) {
    lomake.addEventListener('submit', (e) => {
      e.preventDefault();
      const d = new FormData(lomake);
      const aiheNimi = aihe?.selectedOptions[0]?.textContent ?? '';
      const runko = `Nimi: ${d.get('nimi')}\nSähköposti: ${d.get('sahkoposti')}\nOrganisaatio: ${d.get('organisaatio')}\nAihe: ${aiheNimi}\n\n${d.get('viesti')}`;
      location.href = `mailto:${lomake.dataset.osoite}?subject=${encodeURIComponent(aiheNimi)}&body=${encodeURIComponent(runko)}`;
    });
  }
}
