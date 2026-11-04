# Verificação: card #16 (currículo abre em nova aba)

Spec e plano juntos (card trivial): todo link para `/cv/` ganha `target="_blank"`, `rel="noopener noreferrer"` e um `aria-label` que avisa "abre em nova aba" (PT) / "opens in a new tab" (EN). Pedido do Tiago em 03/11/2026.

| AC | Evidência |
|---|---|
| AC1: `target="_blank"` e `rel` com `noopener` em todo link de `/cv/` | `tests/page.test.ts` e `tests/i18n.test.ts` (testes "CV links (card #16)"): 3 links por página (botão do hero e PT/EN na seção Links), cada um com `target`, `noopener` e o aviso. Os testes ficaram vermelhos antes da mudança. Em navegador real (Playwright com o Edge): clicar nos 3 links de `/` e nos 3 de `/en/` abriu uma nova aba com `/cv/curriculo-tiago-amarilha-pt.pdf`, e a aba do site continuou onde estava. |
| AC2: o link anuncia que abre em nova aba | Os mesmos testes conferem o `aria-label` com `dict.nav.newTab` nos dois idiomas. |

Suíte completa: `npm test` → 66 passed (10 arquivos); `npm run build` → 2 páginas.
