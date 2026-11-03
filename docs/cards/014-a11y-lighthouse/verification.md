# Verificação: card #14 (acessibilidade e Lighthouse)

| AC | Evidência |
|---|---|
| AC1: Lighthouse ≥ 95 nas 4 categorias, celular e desktop | `npm run build && npm run lighthouse` (Lighthouse 13.6.0, Edge headless, build servido localmente, 03/11/2026): **100 / 100 / 100 / 100** (Performance, Acessibilidade, Boas Práticas, SEO) nos dois modos. Relatórios completos: `lighthouse-mobile.json`, `lighthouse-desktop.json`; resumo: `lighthouse-summary.json`. Celular: FCP 0,9 s, LCP 0,9 s, CLS 0,005. O script sai com erro se alguma nota ficar abaixo de 95. |
| AC2: teclado, ordem, foco visível e link de pular | `tests/a11y.test.ts` › "AC2" (o link é o primeiro elemento e vem antes do `<header>`). Script de Playwright em 360 px: a primeira parada de Tab é "Pular para o conteúdo", que aparece na tela (x 8, y 8; print `skip-link-focus-360.png`), Enter leva a `#top`; todas as paradas seguintes têm `outline: solid 2px`. |
| AC3: 360 px sem scroll horizontal | Mesmo script: `scrollWidth 360 / clientWidth 360`. Print da página: `page-360.png`. |
| AC4: contraste | Auditorias `color-contrast` e `target-size` do Lighthouse com nota 1 nos dois modos. |
| AC5: estrutura | `tests/a11y.test.ts` › "AC5": um único `h1`, títulos sem pular nível, `header`, `main`, `footer` e `nav` com rótulo. |

Observações:
- A primeira rodada do Lighthouse (antes do link de pular) já deu 100 em tudo; o único vermelho do card era o teste de teclado do AC2.
- `npm audit --omit=dev` (dependências de produção) sem vulnerabilidades.
- Os JSONs do Lighthouse foram verificados: não contêm caminhos da máquina nem dados pessoais.
Suíte completa: `npm test` → 37 passed (8 arquivos); `npm run build` ok.
