# Card #15: README do projeto

Issue: #15 · Épico: #4 · Spec + plano juntos. Depende de #14 (precisa das notas medidas do Lighthouse).

## Spec (o quê)
`README.md` em inglês, com seção em português, no template de 9 itens do `00-roadmap.md`, só com números medidos de verdade. Sem dados pessoais além do que o próprio site já mostra (a URL do site; telefone e e-mail não entram).

Os 9 itens: (1) nome e uma frase; (2) print do resultado; (3) por que existe; (4) como funciona (diagrama Mermaid); (5) resultados e métricas; (6) como usar em até 3 passos; (7) decisões de engenharia e trade-offs; (8) próximos passos; (9) 🇧🇷 resumo em português.

- **AC1:** Dado o README, então tem os 9 itens, nesta ordem, com os títulos esperados (teste).
- **AC2:** Dado o item 2, então referencia prints do site em desktop e em 360 px que existem no repo (`docs/img/`).
- **AC3:** Dado o item 5, então traz as quatro notas do Lighthouse (celular e desktop), a contagem de testes e a data da medição, **iguais** aos JSONs de `docs/cards/014-a11y-lighthouse/` e à saída de `npm test` (verificado na verificação do card).
- **AC4:** Dado o item 6, então os 3 passos funcionam num clone limpo (`npm ci`, `npm run dev`, adicionar um `.md` em `src/content/projects/pt/`).
- **AC5:** Dado o item 7, então cita as decisões reais: dados com fonte tipada (`Sourced<T>`), content collection com schema, testes que constroem o site, fontes próprias, tokens de design, sem analytics, deploy por Actions.

Fora do escopo: GIF animado (print estático basta).

## Plano (como)
1. **Teste que falha:** `tests/readme.test.ts` confere os 9 títulos em ordem (AC1) e que as imagens referenciadas existem (AC2).
2. Gerar os prints (desktop 1280 px e 360 px) com o script de Playwright e salvá-los em `docs/img/`.
3. Escrever o README com o diagrama Mermaid (dados → build do Astro → GitHub Pages) e preencher o item 5 com os números dos JSONs do #14.
4. Seguir o "como usar" em um clone limpo numa pasta temporária (AC4) e anotar o resultado.
5. `npm test`, conferir AC3 contra os JSONs e a saída do teste e `verification.md`.

Cobertura: passo 1 → AC1, AC2; passo 3 → AC3, AC5; passo 4 → AC4.
Branch: `card/015-readme`. Commit: `docs: write readme with measured results`.
