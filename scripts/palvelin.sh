#!/bin/bash
# Koneen oletus-Node voi olla liian vanha Astrolle, joten otetaan ensin .nvmrc:n versio.
export NVM_DIR="$HOME/.nvm"
. "$NVM_DIR/nvm.sh"
nvm use >/dev/null
exec npm run "$@"
