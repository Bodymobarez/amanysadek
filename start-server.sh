#!/bin/bash
cd "$(dirname "$0")"
source ~/.nvm/nvm.sh
nvm use default
export PORT=${PORT:-8000}
export NODE_ENV=development
npm run dev



