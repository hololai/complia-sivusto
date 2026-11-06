#!/bin/bash
# Julkaisee tarjouspyynnön vastaanoton Cloud Runiin (Suomi, europe-north1).
# Lähettäjätilin osoite kysytään tai luetaan ympäristömuuttujasta SMTP_KAYTTAJA, jotta se ei päädy repoon.
# Salasana luetaan Secret Managerista (tallenna se ensin: bash lomake/tallenna-salasana.sh).
set -euo pipefail
cd "$(dirname "$0")"
PROJEKTI=complia-lomake-fi
ALUE=europe-north1
if [ -z "${SMTP_KAYTTAJA:-}" ]; then
  read -rp "Lähettäjätili (Google Workspace): " SMTP_KAYTTAJA
fi
# Gmail ei näytä Saapuneissa omia lähetyksiään, jotka palaavat edelleenohjauksen kautta. Siksi viesti
# lähetetään suoraan lukijan postilaatikkoon eikä info@complia.fi-osoitteen kautta.
VASTAANOTTAJA="${VASTAANOTTAJA:-$SMTP_KAYTTAJA}"

# Julkinen osoite ilman allUsers-oikeutta: organisaation käytäntö sallii oikeudet vain omalle verkkotunnukselle.
gcloud run deploy complia-lomake \
  --project="$PROJEKTI" \
  --region="$ALUE" \
  --source=. \
  --service-account="lomake@$PROJEKTI.iam.gserviceaccount.com" \
  --no-invoker-iam-check \
  --max-instances=2 \
  --memory=256Mi \
  --cpu=1 \
  --concurrency=20 \
  --timeout=30 \
  --set-env-vars="SALLITUT_ALKUPERAT=https://complia.fi,PALUUOSOITE=https://complia.fi,VASTAANOTTAJA=$VASTAANOTTAJA,SMTP_KAYTTAJA=$SMTP_KAYTTAJA" \
  --set-secrets="SMTP_SALASANA=smtp-salasana:latest" \
  --quiet
