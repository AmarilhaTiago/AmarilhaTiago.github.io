# Verificação: card #9 (seções Sobre, Experiência e Links)

| AC | Evidência |
|---|---|
| AC1: Sobre com o texto revisado | `tests/sections.test.ts` › "AC1": `id="sobre"` e o texto igual a `profile.about`. |
| AC2: 5 entradas na ordem, com período formatado; descrição só no Mega Júnior | `tests/sections.test.ts` › "AC2" (dois testes) e `tests/period.test.ts` (4 casos: período aberto, fechado, virada de ano, mês com zero à esquerda). |
| AC3: Links com GitHub, LinkedIn, e-mail, WhatsApp e currículo | `tests/sections.test.ts` › "AC3": confere os `href` (`mailto:`, `wa.me`, PDF) e o número visível. O texto exibido dos links vem dos dados, sem literais no HTML. |
| AC4: ids das seções | `id="sobre"`, `id="experiencia"` e `id="links"` verificados nos testes acima. **Desvio:** `projetos` e a âncora do botão "Ver projetos" ficam para o card #10 (registrado na spec). |
| AC5: 360 px sem scroll horizontal | Script descartável (Playwright com o Edge): `scrollWidth 360 / clientWidth 360`. Print da página inteira: `page-360.png`. |

Extras: foco visível em todas as paradas de Tab medidas (8 itens, `outline: solid 2px`); `grep` de cores hex fora de `global.css` e de textos factuais fixos nos componentes retornam vazio.
Suíte completa: `npm test` → 22 passed (5 arquivos); `npm run build` ok.
