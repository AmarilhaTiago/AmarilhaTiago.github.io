# Card #9: Seções Sobre, Experiência e Links

Issue: #9 · Épico: #2 · Depende de #8. Spec + plano juntos.

## Spec (o quê)
Três seções abaixo do hero, lendo só de `profile.ts` e `pt.ts`.

Contrato: `formatPeriod(period, dict) -> string`. Exemplos em PT: `{start:'2026-05', end:null}` → `mai/2026 – atual`; `{start:'2023-08', end:'2026-05'}` → `ago/2023 – mai/2026`.

- **AC1:** Dada a seção Sobre, então o texto é exatamente o de `profile.about` (texto revisado da spec §4).
- **AC2:** Dada a seção Experiência, então há 5 entradas na ordem Bello Card, HaruCode, Mega Júnior, FAPEC, MaisCode, cada uma com empresa, cargo e período formatado; a descrição aparece só no Mega Júnior.
- **AC3:** Dada a seção Links, então tem GitHub, LinkedIn, e-mail (`mailto:`), WhatsApp (`wa.me`, número visível) e currículo (`cvLink('pt')`).
- **AC4:** Dado o título de cada seção, então há `id` (`sobre`, `projetos`, `experiencia`, `links`) e a âncora do botão "Ver projetos" resolve.
- **AC5:** Dado 360 px, então não há scroll horizontal.

Fora do escopo: a seção Projetos (#10) e a versão EN (#12).

## Plano (como), em ordem TDD
1. **Teste que falha:** `tests/period.test.ts` (AC2, casos `end:null`, mês de um dígito, virada de ano) e extensão de `tests/page.test.ts` para o HTML das três seções (AC1 a AC4).
2. Implementar `formatPeriod` em `src/data/format.ts`.
3. Criar `About.astro`, `Experience.astro` e `Links.astro` e montar em `index.astro`.
4. Conferir AC5 com o mesmo script de Playwright do #8.
5. `npm test`, `npm run build` e `verification.md`.

Cobertura: passos 1–2 → AC2 (formato); passo 3 → AC1 a AC4; passo 4 → AC5.
Branch: `card/009-sections`. Commit: `feat: add about, experience and links sections`.
