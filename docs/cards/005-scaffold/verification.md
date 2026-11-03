# Verificação: card #5 (scaffold)

| AC | Evidência |
|---|---|
| AC1: `npm ci && npm run build` gera `dist/` | Rodado do zero (`node_modules` e `dist` apagados): `npm ci` ok, 0 vulnerabilidades; build "1 page(s) built", `dist/index.html` criado. |
| AC2: cores só nos tokens | `grep -rnE '#[0-9a-fA-F]{3,8}\b' src` fora de `src/styles/global.css` retorna vazio. O CSS gerado em `dist/_astro/` contém `ff5c39`, vindo do token. |
| AC3: CI roda o build | `.github/workflows/ci.yml` (`pull_request` e `push` na `main`). Evidência do run verde: ver o PR do card. |
