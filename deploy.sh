#!/usr/bin/env sh

set -e

npm run build

cd dist

rm -rf .git
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:NathanFouere/kanban-app.git master:gh-pages

cd -