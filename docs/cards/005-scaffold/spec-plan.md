# Card #5: Scaffold Astro + Tailwind com tokens da paleta

Issue: #5 · Épico: #1 · Spec + plano juntos (card de configuração, `05-processo.md` §6).

## Spec (o quê)
Projeto Astro com Tailwind na raiz do repo, com a paleta como tokens e uma página inicial mínima. Sem conteúdo real.

Tokens (decisão P8 do PRD): fundo `#0a0a0a`, superfície `#111113`, borda `#26262b`, texto `#e7e7ea`, texto secundário `#a1a1aa`, destaque `#FF5C39`, texto sobre o destaque `#0a0a0a`.

- **AC1:** Dado o repo limpo, quando rodo `npm ci && npm run build`, então gera `dist/` sem erro.
- **AC2:** Dada a página inicial, então as cores vêm dos tokens (nenhum hex fora do arquivo de tokens).
- **AC3:** Dado um PR ou push na `main`, então o workflow de CI roda o build.

Fora do escopo: conteúdo real, fontes, SEO, deploy.

## Plano (como)
1. Ler a doc oficial **atual** de instalação do Astro e do Tailwind para Astro (a versão estável do Astro hoje é a do `npm view astro`; não presumir comandos de memória).
2. Gerar o projeto mínimo do Astro numa pasta temporária (o repo já tem `README.md`, `.gitignore` e `.gitattributes`) e copiar para a raiz sem sobrescrever esses três.
3. Instalar e configurar o Tailwind como a doc manda.
4. Criar o arquivo de tokens (`src/styles/global.css`) e usar só os tokens em `src/pages/index.astro`.
5. Criar `.github/workflows/ci.yml`: `npm ci` e `npm run build` em `pull_request` e `push` na `main`.
6. Verificar AC1 a AC3 e preencher `verification.md`. Teste de AC2: `grep` por `#[0-9a-fA-F]{3,6}` fora de `global.css` deve retornar vazio.

Cobertura: passos 2–3 → AC1; passo 4 → AC2; passo 5 → AC3.
Branch: `card/005-scaffold`. Commit: `chore: scaffold astro with tailwind and palette tokens`.
