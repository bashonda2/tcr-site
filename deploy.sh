#!/usr/bin/env bash
set -e

echo "Building TCR..."
npm run build

echo "Deploying to VPS..."
rsync -avz --delete dist/ root@209.74.80.143:/var/www/tcr/

echo "Done. Live at https://thecovenantrendering.com"
