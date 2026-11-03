# Card #6: Deploy no GitHub Pages via Actions

Issue: #6 · Épico: #1 · Spec + plano juntos (card de configuração). Depende do card #5.

## Spec (o quê)
Cada push na `main` publica o site em https://amarilhatiago.github.io com a action oficial do Astro e `actions/deploy-pages`. O Pages hoje está no modo antigo (branch `main`, pasta `/`); passa para **GitHub Actions**.

- **AC1:** Dado um push na `main`, então o workflow de deploy conclui sem erro.
- **AC2:** Dado o site publicado, quando abro https://amarilhatiago.github.io, então responde 200 com a página do projeto (não o README).
- **AC3:** Dado Settings → Pages, então a Source é "GitHub Actions" (`build_type: workflow`).

Fora do escopo: domínio próprio.

## Plano (como)
1. Ler a doc oficial **atual** do Astro para deploy no GitHub Pages (versões da `withastro/action` e de `actions/deploy-pages`; não presumir).
2. Em `astro.config.mjs`, definir `site: 'https://amarilhatiago.github.io'` (repo de usuário: sem `base`).
3. Criar `.github/workflows/deploy.yml` com permissões mínimas, build e deploy, disparado em push na `main`.
4. Trocar a Source do Pages para Actions: `gh api -X PUT repos/AmarilhaTiago/AmarilhaTiago.github.io/pages -f build_type=workflow`. Muda uma configuração do repo público, e está coberto pela decisão P1 do PRD.
5. Mergear o PR; conferir o run com `gh run watch` e a resposta com `curl -sI https://amarilhatiago.github.io`.
6. Preencher `verification.md` (AC1 → run verde; AC2 → status 200 e título da página; AC3 → saída de `gh api .../pages`).

Cobertura: passos 2–3 → AC1; passo 5 → AC2; passo 4 → AC3.
Branch: `card/006-deploy`. Commit: `ci: deploy to github pages with astro action`.
