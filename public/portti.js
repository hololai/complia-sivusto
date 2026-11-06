// Esikatselun salasanaportti. Piilottaa sivuston, kunnes oikea salasana on annettu.
// Tämä EI ole tietoturvaa: sisältö on julkisessa repossa ja sivun lähdekoodissa. Portti vain
// estää sivuston näkymisen satunnaisille kävijöille ennen julkaisua.
// Ladataan tavallisena skriptinä <head>-osassa, jotta sisältö ei ehdi välähtää näkyviin.
(function () {
  var meta = document.querySelector('meta[name="esikatselu"]');
  if (!meta || !meta.content) return;
  var tiiviste = meta.content;
  var AVAIN = 'complia-esikatselu';
  try {
    if (localStorage.getItem(AVAIN) === tiiviste) return;
  } catch (e) {
    /* Selain estää tallennuksen: kysytään salasana joka kerta. */
  }
  document.documentElement.classList.add('lukittu');

  function hex(puskuri) {
    return Array.from(new Uint8Array(puskuri))
      .map(function (b) {
        return b.toString(16).padStart(2, '0');
      })
      .join('');
  }

  function tarkista(salasana) {
    var osat = tiiviste.split(':');
    var suola = new Uint8Array(
      osat[0].match(/../g).map(function (h) {
        return parseInt(h, 16);
      }),
    );
    var kierrokset = Number(osat[1]);
    return crypto.subtle
      .importKey('raw', new TextEncoder().encode(salasana), 'PBKDF2', false, ['deriveBits'])
      .then(function (avain) {
        return crypto.subtle.deriveBits({ name: 'PBKDF2', salt: suola, iterations: kierrokset, hash: 'SHA-256' }, avain, 256);
      })
      .then(function (bitit) {
        return hex(bitit) === osat[2];
      });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var portti = document.createElement('div');
    portti.className = 'portti';
    portti.innerHTML =
      '<form class="portti__kortti" novalidate>' +
      '<p class="portti__merkki">Complia</p>' +
      '<h1 class="portti__otsikko">Sivusto julkaistaan pian</h1>' +
      '<p class="portti__teksti">Esikatselu vaatii salasanan.</p>' +
      '<label for="portti-salasana">Salasana</label>' +
      '<input id="portti-salasana" type="password" autocomplete="current-password" required />' +
      '<p class="portti__virhe" role="alert" aria-live="assertive"></p>' +
      '<button class="painike" type="submit">Avaa</button>' +
      '</form>';
    document.body.prepend(portti);
    var lomake = portti.querySelector('form');
    var kentta = portti.querySelector('input');
    var virhe = portti.querySelector('.portti__virhe');
    kentta.focus();
    lomake.addEventListener('submit', function (e) {
      e.preventDefault();
      tarkista(kentta.value).then(function (oikein) {
        if (!oikein) {
          virhe.textContent = 'Väärä salasana.';
          kentta.select();
          return;
        }
        try {
          localStorage.setItem(AVAIN, tiiviste);
        } catch (e2) {
          /* Ei tallennusta: portti avautuu vain tällä kertaa. */
        }
        portti.remove();
        document.documentElement.classList.remove('lukittu');
      });
    });
  });
})();
