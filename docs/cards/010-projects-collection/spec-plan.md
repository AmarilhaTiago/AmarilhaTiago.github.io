# Card #10: Coleção de projetos e cards

Issue: #10 · Épico: #2 · Depende de #9. Spec + plano juntos.

## Spec (o quê)
Um arquivo `.md` por projeto em `src/content/projects/pt/<slug>.md`, validado por schema zod e exibido como cards na seção Projetos (`#projetos`), ordenados por `order`.

Schema (spec §3): `title`, `summary`, `highlights[]` (2–3), `metric?`, `stack[]`, `repo?`, `demo?`, `status: 'pronto' | 'em construção'`, `order`.

Conteúdo inicial (só dados verificáveis; **a aprovar**):

| Projeto | status | Texto |
|---|---|---|
| Revisor de PR com LLM (`order: 1`) | pronto | summary: "Revisão de primeira passada de pull requests com LLM, entregue como GitHub Action: comentários inline e um resumo idempotente." highlights: "Saída do modelo validada por schema, com uma nova tentativa quando falha." / "Orçamento de tokens por trecho e por PR, com custo registrado." / "Suíte de evals com 16 casos para comparar modelos." metric: "Evals (16 casos): recall 92–100% · precisão 86–87% com gpt-oss-120b · US$ 0" stack: Python, GitHub Actions, Docker, LLM, pytest; repo: github.com/AmarilhaTiago/pr-reviewer |
| Radar de Vagas (`order: 2`) | em construção | summary: "Coleta vagas, dá uma nota de aderência ao currículo com um LLM e envia só as boas no Telegram." sem highlights, sem métrica, sem repo (ainda não existe); stack: Python, Telegram, GitHub Actions, LLM |
| FinCtrl (`order: 3`) | em construção | summary: "Gestão financeira pessoal: web app com Next.js e Supabase." highlights: "Telas de dashboard, transações, contas, categorias, cartões, recorrentes, receitas e metas." / "Segurança por RLS em todas as tabelas do Postgres." / "28 testes automatizados nos utilitários." stack: Next.js, React, TypeScript, Tailwind, Supabase, Vitest; repo: github.com/AmarilhaTiago/finctrl |

Antes de escrever, confiro cada item contra o README, o `pyproject.toml` e o `action.yml` do pr-reviewer e a auditoria da spec 04; o que não bater sai.

- **AC1:** Dado um `.md` válido, então aparece como card, na ordem de `order`, com título, resumo, tags e (se existirem) highlights, métrica e link do repo.
- **AC2:** Dado um `.md` novo, quando o crio, então aparece na página sem alterar código (testado com um projeto falso, que é removido depois).
- **AC3:** Dado um `.md` inválido (por exemplo sem `title` ou com `status` fora da lista), então o build falha com mensagem clara.
- **AC4:** Dado `status: em construção`, então o card mostra o selo "em construção"; dado `pronto`, mostra "pronto".
- **AC5:** Dado um projeto sem `repo`, então o card não mostra link quebrado.

Fora do escopo: projetos em EN (#12).

## Plano (como), em ordem TDD
1. Ler a doc oficial **atual** de content collections do Astro (`src/content.config.ts`, loader e `z`); não presumir a API.
2. **Teste que falha:** `tests/projects.test.ts` valida o schema exportado (`safeParse` de válido e de inválidos, AC3 e AC4) e, via build, cria um `.md` falso e confirma que o card aparece (AC2), e que um inválido derruba o build (AC3).
3. Criar `src/content.config.ts` e o schema; escrever os 3 `.md`.
4. Criar `ProjectCard.astro` e a seção Projetos em `index.astro` (AC1, AC4, AC5).
5. `npm test`, `npm run build` e `verification.md`.

Cobertura: passo 2 → AC2, AC3; passos 3–4 → AC1, AC4, AC5.
Branch: `card/010-projects-collection`. Commit: `feat: add projects content collection and cards`.
