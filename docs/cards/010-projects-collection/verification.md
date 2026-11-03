# Verificação: card #10 (coleção de projetos e cards)

| AC | Evidência |
|---|---|
| AC1: cards ordenados por `order`, com título, resumo, tags, destaques, métrica e repo | `tests/projects.test.ts` › "projects section": `id="projetos"`, 3 títulos na ordem Revisor, Radar, FinCtrl e a métrica do Revisor. Print: `page-360.png`. |
| AC2: um `.md` novo aparece sem mexer em código | `tests/projects.test.ts` › "AC2": cria `zz-test-fake.md`, faz o build, o título "Projeto Falso de Teste" aparece em `index.html`; o arquivo é removido e o teste confere a remoção. |
| AC3: `.md` inválido derruba o build | `tests/projects.test.ts` › "AC3" (build com `status: rascunho` lança erro) e "projectSchema" (título ausente, status fora da lista, `order` não numérico, mais de 3 destaques são rejeitados). |
| AC4: selo de status | `tests/projects.test.ts` › "AC4": "pronto" aparece 1 vez e "em construção" 2 vezes. |
| AC5: sem link quebrado quando falta `repo` | `tests/projects.test.ts` › "AC5": links de repo só do pr-reviewer e do finctrl, nada de `radar-vagas` e nenhum `href` vazio. |

Conferência dos textos dos cards contra as fontes (antes de escrever):
- pr-reviewer: o README confirma schema validado com uma nova tentativa, orçamento de tokens por trecho e por PR, 16 casos de eval e os números de recall e precisão; `pyproject.toml` (Python ≥ 3.12, pytest) e `action.yml` (`using: docker`) confirmam a stack.
- FinCtrl: telas, RLS e 28 testes vêm da auditoria da spec 04; o repo público existe.
- Radar de Vagas: só o resumo da spec 03; sem repo, sem métrica, sem destaques.

Também verificado: a âncora `#projetos` do botão "Ver projetos" agora resolve (pendência do card #8); 360 px sem scroll horizontal (`scrollWidth 360 / clientWidth 360`) e foco visível em todas as paradas de Tab.
Suíte completa: `npm test` → 29 passed (6 arquivos), rodando em sequência porque alguns testes adicionam arquivos temporários em `src/content`; `npm run build` ok.
