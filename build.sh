#!/bin/bash

mkdir -p public/assets
rm -f public/assets/*.chunk.*

(cd webpack && npm run build)

mv webpack/build/assets/*.chunk.* public/assets/

RAILS_ENV=production rake assets:precompile

rm -rf webpack/build/assets
rm -f webpack/build/stats.json
