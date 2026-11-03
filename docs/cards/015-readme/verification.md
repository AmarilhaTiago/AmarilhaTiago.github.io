# Verificação: card #15 (README)

| AC | Evidência |
|---|---|
| AC1: 9 itens do template, em ordem | `tests/readme.test.ts` › "AC1": título (item 1) com a frase logo abaixo, e as 8 seções (`Screenshots`, `Why it exists`, `How it works`, `Results`, `Usage`, `Engineering decisions and trade-offs`, `Next steps`, `Resumo em português`) na ordem. |
| AC2: prints em desktop e 360 px | `tests/readme.test.ts` › "AC2": as imagens referenciadas (`docs/img/desktop.png`, `docs/img/mobile-360.png`) existem. Geradas por script de Playwright com o Edge sobre o build. |
| AC3: números iguais aos medidos | `tests/readme.test.ts` › "AC3": as linhas Mobile e Desktop da tabela batem com `docs/cards/014-a11y-lighthouse/lighthouse-summary.json` (100/100/100/100) e a data da medição (03/11/2026) aparece no texto. O README diz **42 testes**, e `npm test` retornou `Tests 42 passed (42)`. |
| AC4: os 3 passos funcionam num clone limpo | Clone novo do repo numa pasta temporária: `npm ci` ok; `npm run dev` respondeu 200 na porta de teste; um `.md` novo em `src/content/projects/pt/` apareceu na página no modo dev (1 ocorrência) e no `npm run build` (1 ocorrência). O servidor de teste foi encerrado depois. |
| AC5: decisões reais | Revisão do item "Engineering decisions" contra o código: `Sourced<T>` (`src/data/profile.ts`), coleção com schema (`src/content/schema.ts`), testes que constroem o site (`tests/helpers/build.ts`), tokens em `global.css`, `@fontsource`, `scripts/lighthouse.mjs` fora do CI, `scripts/generate-og.mjs`, deploy por Actions. |

Também verificado: o teste "no personal contact data" garante que o README não traz e-mail nem telefone.
Atenção para o card #12: o número de testes do README precisa ser atualizado quando o inglês entrar, e o teste de AC3 deve continuar passando.
Suíte completa: `npm test` → 42 passed (9 arquivos).
