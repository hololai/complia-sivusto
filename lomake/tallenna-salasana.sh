#!/bin/bash
# Tallentaa Google Workspacen sovellussalasanan Secret Manageriin. Salasana kysytään piilotettuna,
# eikä se jää komentohistoriaan, tiedostoon tai repoon. Aja myös silloin, kun salasana vaihdetaan.
set -euo pipefail
PROJEKTI=complia-lomake-fi
read -rsp "Sovellussalasana (välilyönnit saa jättää): " SALASANA
echo
SALASANA="${SALASANA// /}"
if [ ${#SALASANA} -ne 16 ]; then
  echo "Sovellussalasanassa pitää olla 16 merkkiä ilman välilyöntejä. Mitään ei tallennettu." >&2
  exit 1
fi
printf '%s' "$SALASANA" | gcloud secrets versions add smtp-salasana --project="$PROJEKTI" --data-file=-
unset SALASANA
echo "Tallennettu. Voit sulkea tämän välilehden."
