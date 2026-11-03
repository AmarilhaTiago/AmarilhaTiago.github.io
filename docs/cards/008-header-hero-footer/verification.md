# Verificação: card #8 (cabeçalho, hero e rodapé)

| AC | Evidência |
|---|---|
| AC1: cabeçalho com `~/tiago`, cursor, copiar link e `pt \| en` | `tests/page.test.ts` › "AC1" (HTML do build). O botão nasce `hidden` e o script o revela, então sem JavaScript a página não quebra. O `en` fica sem link até o card #12 (desvio registrado na spec). O clique em "copiar link" não é coberto por teste automatizado: o script é de poucas linhas e foi só revisado. |
| AC2: hero com nome, subtítulo, localização, selo sem emoji e dois botões | `tests/page.test.ts` › "AC2" (dois testes): textos vêm de `profile.ts`, nenhum `♿`, `href` do "Ver projetos" é `#projetos` e o do currículo é `cvLink('pt').href`. A âncora `#projetos` só passa a existir no card #10. |
| AC3: 360 px sem scroll horizontal | Script descartável (Playwright com o Edge): `scrollWidth 360 / clientWidth 360`. Print: `hero-360.png`. |
| AC4: sem animação com `prefers-reduced-motion` | `tests/page.test.ts` › "AC4": o CSS gerado contém a media query (cursor e transições desligados). |
| AC5: rodapé | `tests/page.test.ts` › "AC5". |
| AC6: foco visível | Mesmo script: 5 paradas de Tab (`~/tiago`, copiar link, pt, Ver projetos, Baixar currículo), todas com `outline: solid 2px`. |

Fontes: o navegador carregou `Inter Variable` e `JetBrains Mono Variable` do próprio site (sem Google Fonts).
Suíte completa: `npm test` → 14 passed (3 arquivos); `npm run build` ok.
