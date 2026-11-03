# Card #14: Acessibilidade e Lighthouse

Issue: #14 · Épico: #4 · Spec + plano juntos. Depende de #13.

## Spec (o quê)
O site cumpre WCAG AA, funciona só com teclado e em 360 px, e o Lighthouse mede **≥ 95** em Performance, Acessibilidade, Boas Práticas e SEO, em celular (padrão do Lighthouse) e em desktop.

- **AC1:** Dado o Lighthouse sobre o build servido localmente, então as quatro categorias ficam ≥ 95, em modo celular e em modo desktop.
- **AC2:** Dado o teclado, então todos os elementos interativos são alcançáveis com Tab, na ordem visual, com foco visível; há um link "pular para o conteúdo" que aparece ao receber foco e leva a `#top`.
- **AC3:** Dado 360 px, então não há scroll horizontal (script de Playwright já usado nos cards anteriores, com a página completa).
- **AC4:** Dado o contraste, então texto normal tem pelo menos 4,5:1 e texto grande/ícones pelo menos 3:1 (a auditoria de contraste do Lighthouse não aponta nada).
- **AC5:** Dado o HTML, então há um único `h1`, os títulos seguem a ordem (`h1` → `h2` → `h3`) e os landmarks `header`, `main`, `footer` e `nav` com rótulo existem.

Fora do escopo: modo claro, analytics, testes com leitores de tela reais (só as regras automáticas do Lighthouse).

## Plano (como), em ordem TDD
1. Instalar `lighthouse` e `chrome-launcher` como dependências de desenvolvimento (conferir na doc as versões e as opções atuais) e criar `scripts/lighthouse.mjs`: serve `dist/` numa porta local, roda os dois modos com o Edge instalado (`CHROME_PATH`) e grava `docs/cards/014-a11y-lighthouse/lighthouse-{mobile,desktop}.json` e um resumo. Falha com código ≠ 0 se alguma nota < 95.
2. **Teste que falha:** `tests/a11y.test.ts` (build em `.test-dist/a11y`): um `h1`, ordem dos títulos, landmarks e link "pular para o conteúdo" (AC2, AC5). A primeira rodada do Lighthouse é a evidência vermelha de AC1.
3. Corrigir o que o Lighthouse e os testes apontarem (candidatos: link de pular, `aria-label` no seletor de idioma, tamanho do alvo de toque dos botões pequenos, peso das fontes, `preload` da fonte principal).
4. Rodar o script de Playwright (AC3) e a navegação por Tab (AC2) e anexar o print.
5. Repetir até todas as notas ≥ 95; salvar os JSONs e um print do resumo para o README (#15); `npm test`, `npm run build` e `verification.md`.

Cobertura: passos 1 e 5 → AC1, AC4; passos 2–3 → AC2, AC5; passo 4 → AC2, AC3.
Decisão a aprovar: o Lighthouse roda por script local e não entra no CI (o Edge do CI muda e o resultado oscila); os JSONs versionados são a evidência.
Branch: `card/014-a11y-lighthouse`. Commit: `feat: improve accessibility and meet lighthouse targets`.
