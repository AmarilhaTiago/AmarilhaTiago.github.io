# Card #7: Dados do perfil e dicionário PT

Issue: #7 · Épico: #2 · Spec + plano juntos (os dados já estão decididos no PRD). Depende do card #5.

## Spec (o quê)
`src/data/profile.ts` é a única fonte dos dados factuais (nome, cargos, datas, contatos, links, textos Sobre e Experiência). `src/i18n/pt.ts` guarda os textos de interface. Os valores são os do relatório de dados aprovado ("OK dados", 03/11/2026).

Contrato: cada dado factual é um `Sourced<T>` = `{ value: T; source: 'curriculo' | 'linkedin' | 'github' | 'spec' | 'tiago' }`. Os componentes leem `.value`.

- **AC1:** Dado `profile.ts`, então todo dado factual tem `source` (o tipo exige e um teste percorre todas as folhas).
- **AC2:** Dados `profile.ts` e `pt.ts`, então nenhum texto contém `CID`, `G80` nem `diagnóstico` (teste).
- **AC3:** Dados os componentes, então não há texto factual fixo neles: leem de `profile.ts` e do dicionário (verificação por `grep` de strings conhecidas, como "Bello Card").

Casos de borda: Mega Júnior tem `source: 'linkedin'` no cargo e nas datas e `source: 'tiago'` na descrição; o selo PCD não tem emoji.

Fora do escopo: versão EN (card #12).

## Plano (como), em ordem TDD
1. Ler a doc oficial **atual** do runner de testes (Vitest, que se integra ao Astro) e instalá-lo como dependência de desenvolvimento.
2. **Teste que falha:** `tests/profile.test.ts` percorre as folhas e exige `source` (AC1) e varre os textos atrás dos termos proibidos (AC2).
3. Criar `src/data/profile.ts` e `src/i18n/pt.ts` com os dados do relatório aprovado até os testes passarem.
4. Refatorar: tipo `Sourced<T>` e helper `src(value, source)` para ficar legível.
5. Adicionar `npm test` ao CI (`ci.yml`).
6. Verificar AC3 com `grep` nos componentes (ainda poucos neste ponto) e preencher `verification.md`.

Cobertura: passos 2–4 → AC1 e AC2; passo 6 → AC3.
Decisão a aprovar: `Sourced<T>` com campo `source` em vez de só comentário `// fonte:` (a spec §1.1 pede comentário). O tipo é verificável por teste e por compilação; o comentário seria só convenção.
Branch: `card/007-profile-data`. Commit: `feat: add profile data with per-field sources`.
