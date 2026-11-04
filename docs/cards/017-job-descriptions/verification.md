# Verificação: card #17 (descrição dos cargos como no currículo)

| AC | Evidência |
|---|---|
| AC1: tópicos em PT idênticos ao currículo | `tests/profile.test.ts` › "AC1-AC3": para Bello Card, HaruCode, FAPEC e MaisCode, os tópicos de `profile.ts` são iguais, texto a texto, aos de `tests/fixtures/cv-bullets.json` (cópia do `curriculo.pdf`). `tests/sections.test.ts` › "card #17 AC1/AC2": cada tópico aparece na seção Experiência da página PT. Os testes ficaram vermelhos antes dos dados. |
| AC2: stack como tags | Os mesmos testes: as tags de cada cargo (`PHP`, `JavaScript`, `jQuery`, `PostgreSQL`, `CI/CD`, `Scrum/Kanban` etc.) existem como itens da lista, iguais aos do currículo. |
| AC3: tradução em EN | `tests/profile.test.ts` (rodando para EN): mesma quantidade de tópicos e mesmas tags, textos diferentes dos do PT. `tests/i18n.test.ts` › "card #17 AC3": os tópicos traduzidos aparecem na seção `experience` de `/en/` e nenhum texto em PT vaza. |
| AC4: Mega Júnior só com a descrição | `tests/profile.test.ts` › "AC4" (PT e EN): `note` definido, `bullets` e `stack` ausentes. |
| AC5: fonte e termos médicos | Todos os dados novos usam `src(..., 'curriculo')`; o teste que percorre a estrutura inteira exige fonte válida e não acha `CID`/`G80`/`diagnóstico` em PT nem em EN. |

Verificações extras (04/11/2026):
- 360 px: sem scroll horizontal em `/` e em `/en/`; prints `pt-360.png` e `en-360.png`.
- Lighthouse 13.6.0 (`npm run lighthouse`, 4 medições): 100 / 100 / 100 / 100 em PT e EN, celular e desktop, mesmo com a página mais longa.
- Decisão do Tiago: os tópicos do Bello Card entram completos, como no currículo.
- A tradução em inglês é minha e está **pendente de revisão do Tiago** (comentada como `// translation of the CV topics` em `src/data/profile.en.ts`).

Suíte completa: `npm test` → 72 passed (10 arquivos); `npm run build` → 2 páginas.
