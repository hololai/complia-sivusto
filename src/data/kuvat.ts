// Sivustolla käytettävät piirrokset. Ne ovat sivuun upotettua SVG:tä: ei kuvatiedostoja eikä ulkoisia
// pyyntöjä, ja CSP pysyy tiukkana. Kaikki piirrokset ovat samaa tyyliä, jotta sivusto näyttää yhtenäiseltä.
// Kuvien värit ovat samat kuin global.css:n muuttujissa. SVG:n värimääreet eivät voi lukea CSS-muuttujia.
export const KUVAT = {
  lomake: `
    <rect x="44" y="18" width="152" height="134" rx="12" fill="#fff" stroke="#ddd9cd"/>
    <path d="M44 30a12 12 0 0 1 12-12h128a12 12 0 0 1 12 12v12H44z" fill="#17453a"/>
    <circle cx="58" cy="30" r="3" fill="#e2bd68"/><circle cx="68" cy="30" r="3" fill="#f1d999"/><circle cx="78" cy="30" r="3" fill="#d4e4da"/>
    <rect x="58" y="56" width="14" height="14" rx="3" fill="#17453a"/><path d="M61 63l3 3 5-6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="82" y="60" width="92" height="6" rx="3" fill="#d4e4da"/>
    <rect x="58" y="80" width="14" height="14" rx="3" fill="#17453a"/><path d="M61 87l3 3 5-6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="82" y="84" width="70" height="6" rx="3" fill="#d4e4da"/>
    <rect x="58" y="104" width="14" height="14" rx="3" fill="#fff" stroke="#c9c4b4" stroke-width="1.5"/>
    <rect x="82" y="108" width="84" height="6" rx="3" fill="#ece9df"/>
    <rect x="58" y="128" width="120" height="12" rx="4" fill="#faf8f3" stroke="#ddd9cd"/>
    <rect x="64" y="131" width="1.6" height="6" fill="#17453a" class="kulku__kursori"/>
    <path d="M180 92h34a10 10 0 0 1 10 10v16a10 10 0 0 1-10 10h-20l-10 9v-9h-4a10 10 0 0 1-10-10v-16a10 10 0 0 1 10-10z" fill="#e2bd68"/>
    <text x="197" y="117" text-anchor="middle" font-family="Georgia, serif" font-size="20" font-weight="700" fill="#0e2f27">?</text>`,
  haastattelu: `
    <rect x="26" y="16" width="188" height="118" rx="12" fill="#17453a"/>
    <rect x="36" y="26" width="82" height="80" rx="8" fill="#d4e4da"/>
    <rect x="122" y="26" width="82" height="80" rx="8" fill="#f1d999"/>
    <circle cx="77" cy="56" r="13" fill="#17453a"/><path d="M55 106a22 20 0 0 1 44 0z" fill="#17453a"/>
    <circle cx="163" cy="56" r="13" fill="#7d5d1e"/><path d="M141 106a22 20 0 0 1 44 0z" fill="#7d5d1e"/>
    <rect x="127" y="31" width="42" height="12" rx="6" fill="#17453a"/><text x="148" y="39.5" text-anchor="middle" font-family="system-ui, sans-serif" font-size="6.5" font-weight="700" letter-spacing=".4" fill="#fff">COMPLIA</text>
    <circle cx="104" cy="120" r="5" fill="#fff" opacity=".85"/><circle cx="120" cy="120" r="5" fill="#e2bd68"/><circle cx="136" cy="120" r="5" fill="#fff" opacity=".85"/>
    <rect x="104" y="134" width="32" height="10" fill="#c9c4b4"/><rect x="80" y="144" width="80" height="6" rx="3" fill="#ddd9cd"/>
    <path d="M58 2h48a10 10 0 0 1 10 10v8a10 10 0 0 1-10 10H70l-8 7v-7h-4a10 10 0 0 1-10-10v-8a10 10 0 0 1 10-10z" fill="#fff" stroke="#ddd9cd"/>
    <circle cx="70" cy="16" r="2.6" fill="#17453a" class="kulku__piste"/><circle cx="82" cy="16" r="2.6" fill="#17453a" class="kulku__piste"/><circle cx="94" cy="16" r="2.6" fill="#17453a" class="kulku__piste"/>`,
  asiakirjat: `
    <g transform="rotate(-9 120 86)"><rect x="66" y="22" width="104" height="128" rx="8" fill="#d4e4da"/></g>
    <g transform="rotate(5 120 86)"><rect x="70" y="20" width="104" height="128" rx="8" fill="#f1d999"/></g>
    <rect x="68" y="18" width="104" height="132" rx="8" fill="#fff" stroke="#ddd9cd"/>
    <rect x="82" y="34" width="56" height="8" rx="4" fill="#17453a"/>
    <rect x="82" y="52" width="76" height="5" rx="2.5" fill="#d4e4da"/><rect x="82" y="63" width="64" height="5" rx="2.5" fill="#d4e4da"/>
    <rect x="82" y="80" width="22" height="22" rx="4" fill="#e5eee8"/><rect x="108" y="80" width="22" height="22" rx="4" fill="#f1d999"/><rect x="134" y="80" width="22" height="22" rx="4" fill="#e2bd68"/>
    <rect x="82" y="112" width="76" height="5" rx="2.5" fill="#d4e4da"/><rect x="82" y="123" width="52" height="5" rx="2.5" fill="#d4e4da"/>
    <circle cx="172" cy="128" r="20" fill="#17453a"/><path d="M172 116l9 4v6c0 6-4 10-9 12-5-2-9-6-9-12v-6z" fill="none" stroke="#e2bd68" stroke-width="2.2" stroke-linejoin="round"/><path d="M168 127l3 3 5-5" fill="none" stroke="#e2bd68" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M42 46l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="#e2bd68" class="kulku__tahti"/>
    <path d="M196 36l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#e2bd68" class="kulku__tahti"/>
    <path d="M50 120l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6z" fill="#17453a" class="kulku__tahti"/>`,
  lapikaynti: `
    <rect x="34" y="18" width="116" height="134" rx="8" fill="#fff" stroke="#ddd9cd"/>
    <rect x="48" y="34" width="60" height="8" rx="4" fill="#17453a"/>
    <rect x="48" y="54" width="86" height="5" rx="2.5" fill="#d4e4da"/><rect x="48" y="65" width="72" height="5" rx="2.5" fill="#d4e4da"/>
    <rect x="44" y="78" width="96" height="15" rx="3" fill="#f1d999"/><rect x="48" y="83" width="80" height="5" rx="2.5" fill="#c9a34f"/>
    <rect x="48" y="102" width="86" height="5" rx="2.5" fill="#d4e4da"/><rect x="48" y="113" width="60" height="5" rx="2.5" fill="#d4e4da"/>
    <rect x="48" y="124" width="76" height="5" rx="2.5" fill="#d4e4da"/>
    <path d="M140 86h20" stroke="#c9a34f" stroke-width="1.5" stroke-dasharray="3 3"/>
    <path d="M168 60h44a10 10 0 0 1 10 10v26a10 10 0 0 1-10 10h-28l-10 9v-9h-6a10 10 0 0 1-10-10V70a10 10 0 0 1 10-10z" fill="#17453a"/>
    <circle cx="176" cy="74" r="6" fill="#f1d999"/><rect x="186" y="71" width="26" height="5" rx="2.5" fill="#d4e4da"/>
    <rect x="168" y="84" width="44" height="4" rx="2" fill="#5f8a7c"/><rect x="168" y="92" width="32" height="4" rx="2" fill="#5f8a7c"/>
    <circle cx="214" cy="112" r="11" fill="#e2bd68"/><path d="M209 112l3.5 3.5 6-6.5" fill="none" stroke="#0e2f27" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    <g transform="rotate(35 120 140)"><rect x="104" y="134" width="44" height="9" rx="2" fill="#e2bd68"/><path d="M148 134l9 4.5-9 4.5z" fill="#17453a"/><rect x="100" y="134" width="6" height="9" rx="2" fill="#7d5d1e"/></g>`,
  allekirjoitus: `
    <rect x="150" y="66" width="74" height="74" rx="8" fill="#d4e4da"/><path d="M150 82h74" stroke="#17453a" stroke-width="2" opacity=".25"/>
    <rect x="166" y="96" width="42" height="8" rx="4" fill="#17453a" opacity=".35"/>
    <rect x="30" y="14" width="124" height="136" rx="8" fill="#fff" stroke="#ddd9cd"/>
    <rect x="44" y="30" width="64" height="8" rx="4" fill="#17453a"/>
    <rect x="44" y="50" width="94" height="5" rx="2.5" fill="#d4e4da"/><rect x="44" y="61" width="80" height="5" rx="2.5" fill="#d4e4da"/><rect x="44" y="72" width="88" height="5" rx="2.5" fill="#d4e4da"/>
    <path d="M44 128h92" stroke="#c9c4b4" stroke-width="1.5"/>
    <path class="kulku__nimi" d="M48 120c6-14 10-20 13-18 3 3-6 18-2 19 4 1 9-15 13-14 3 1-2 12 2 13 3 1 7-8 10-8 3 0 2 6 5 6 4 0 9-5 14-6 5-1 10 1 16 0" fill="none" stroke="#17453a" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="140" cy="44" r="17" fill="#e2bd68"/><circle cx="140" cy="44" r="12" fill="none" stroke="#7d5d1e" stroke-width="1.2" stroke-dasharray="2 2"/>
    <path d="M134 44l4 4 8-8" fill="none" stroke="#0e2f27" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`,
  paketti: `
    <rect x="18" y="20" width="76" height="96" rx="6" fill="#fff" stroke="#ddd9cd" transform="rotate(-10 56 68)"/>
    <rect x="60" y="10" width="76" height="96" rx="6" fill="#fff" stroke="#ddd9cd"/>
    <rect x="72" y="24" width="40" height="6" rx="3" fill="#17453a"/><rect x="72" y="38" width="52" height="4" rx="2" fill="#d4e4da"/><rect x="72" y="48" width="44" height="4" rx="2" fill="#d4e4da"/>
    <rect x="96" y="18" width="76" height="96" rx="6" fill="#fff" stroke="#ddd9cd" transform="rotate(9 134 66)"/>
    <rect x="22" y="78" width="176" height="92" rx="10" fill="#17453a"/>
    <rect x="22" y="78" width="176" height="20" rx="6" fill="#0e2f27"/>
    <rect x="100" y="78" width="20" height="92" fill="#e2bd68"/>
    <path d="M110 78c-14-18-34-16-30-4 3 8 20 6 30 4zm0 0c14-18 34-16 30-4-3 8-20 6-30 4z" fill="#f1d999" stroke="#c9a34f" stroke-width="1.5"/>
    <circle cx="110" cy="78" r="6" fill="#e2bd68" stroke="#c9a34f" stroke-width="1.5"/>
    <path d="M150 112l26 26" stroke="#f1d999" stroke-width="1.5"/>
    <circle cx="186" cy="146" r="13" fill="none" stroke="#e2bd68" stroke-width="5"/>
    <path d="M178 138l-26-26 M164 124l-6 6 M158 118l-6 6" stroke="#e2bd68" stroke-width="5" stroke-linecap="round"/>`,
} as const;

export type KuvanNimi = keyof typeof KUVAT;

// Koristekuva: ruudunlukija ohittaa sen, koska sama asia kerrotaan tekstissä.
export const svg = (nimi: KuvanNimi, vb = '0 0 240 170') =>
  `<svg viewBox="${vb}" aria-hidden="true" focusable="false">${KUVAT[nimi]}</svg>`;
