# Card #17: Descrição dos cargos como no currículo (PT e EN)

Issue: #29 · Spec + plano juntos. Pedido do Tiago em 03/11/2026: "deixe assim como está no currículo", em PT e EN.

## Spec (o quê)
Cada entrada da experiência mostra, abaixo de cargo e período, os tópicos do currículo (como lista) e a stack (como tags). Texto em PT idêntico ao currículo; em EN, tradução dos mesmos tópicos (a revisar pelo Tiago).

- Bello Card (5 tópicos), HaruCode (2), FAPEC (4), MaisCode (2), cada um com a linha "Stack" do currículo.
- Mega Júnior não existe no currículo: continua só com a descrição aprovada antes, sem lista nem stack.
- Decisão do Tiago: os tópicos do Bello Card entram completos, como no currículo (inclui o nome da plataforma e a infraestrutura). O currículo com esses trechos já é público no site.

Contrato: `Experience` ganha `bullets?: Sourced<string[]>` e `stack?: Sourced<string[]>`.

- **AC1:** Dado o PT, então os tópicos de Bello Card, HaruCode, FAPEC e MaisCode são idênticos ao currículo (comparados com `tests/fixtures/cv-bullets.json`).
- **AC2:** Dada a stack de cada cargo, então aparece como tags, com os mesmos itens do currículo.
- **AC3:** Dado o EN, então cada cargo tem a tradução dos mesmos tópicos (mesma quantidade) e as mesmas tags.
- **AC4:** Dado o Mega Júnior, então continua só com a descrição, sem lista nem stack.
- **AC5:** Dados todos os textos novos, então têm fonte (`curriculo`) e nenhum termo médico (testes de fonte já existentes, que percorrem toda a estrutura).

Fora do escopo: competências técnicas, formação e idiomas do currículo.

## Plano (como), em ordem TDD
1. Fixture `tests/fixtures/cv-bullets.json` com o texto do currículo.
2. **Testes que falham:** em `tests/profile.test.ts` (dados PT e EN: quantidades, fonte, ausência no Mega Júnior, igualdade com a fixture no PT) e em `tests/sections.test.ts` e `tests/i18n.test.ts` (os tópicos e as tags aparecem no HTML).
3. Estender o tipo `Experience`, preencher `profile.ts` e `profile.en.ts`.
4. Renderizar a lista e as tags em `Experience.astro`.
5. Conferir 360 px, Lighthouse nas duas páginas e atualizar a contagem de testes do README.

Cobertura: passo 2 → AC1 a AC5; passos 3–4 → AC1 a AC4.
Branch: `card/017-job-descriptions`. Commit: `feat: add job descriptions from the cv in pt and en`.
