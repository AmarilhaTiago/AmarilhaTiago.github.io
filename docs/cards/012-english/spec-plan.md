# Card #12: Rota /en/ com dicionário e seletor

Issue: #12 · Épico: #3 (cortável) · Spec + plano juntos. Depende de #10 e #13. É o maior card do lote; se o tempo apertar, fica para depois da inscrição.

## Spec (o quê)
Versão em inglês em `/en/`, com os mesmos blocos da página PT. O site fica bilíngue, PT padrão em `/`.

Conteúdo (textos da spec §4 e traduções minhas, **a revisar pelo Tiago**):
- **Sobre, cargos e selo PCD:** os textos EN da spec (selo: `Person with disability · open to inclusive and PwD-dedicated roles`, sem emoji).
- **Traduções minhas:** subtítulo (`Full Stack Developer · Tech Lead · Applied AI`), localização (`Campo Grande, Brazil · open to remote`), Mega Júnior (`Mobile App Developer · Requirements Analyst`, e a descrição: `Worked in the marketing and product boards, managing deadlines and responsibilities; mentored new developers on stacks and technologies.`), os três cards de projeto e os rótulos de interface.
- Currículo: o botão aponta para o PDF em português com o sufixo ` (PT)` (`cvLink('en')`).

- **AC1:** Dado `/en/`, então renderiza todos os blocos (hero, sobre, projetos, experiência, links, rodapé) com `lang="en"` e o dicionário EN.
- **AC2:** Dado o seletor, então `pt` leva a `/` e `en` leva a `/en/`, com `aria-current` no idioma atual; o `en` deixa de ser texto sem link.
- **AC3:** Dados os dois idiomas, então cada página tem `link rel="alternate" hreflang` (`pt`, `en`, `x-default`) e o canonical da própria página; `og:locale` é `en_US` no EN; o sitemap lista as duas URLs.
- **AC4:** Dado `profile.en.ts`, então todo dado tem fonte e o teste de fontes do card #7 cobre PT e EN; nenhum texto EN contém CID ou detalhe médico; o selo EN não tem emoji.
- **AC5:** Dado um `.md` novo em `src/content/projects/en/`, então aparece só em `/en/` (e um em `pt/` só em `/`).
- **AC6:** Dado o botão "copiar link", então copia a URL do idioma atual.

Fora do escopo: PDF em inglês, detecção automática de idioma do navegador.

## Plano (como), em ordem TDD
1. Ler a doc oficial **atual** de i18n do Astro (`i18n` no `astro.config.mjs`, `prefixDefaultLocale: false`, `getRelativeLocaleUrl`).
2. **Testes que falham:** estender `tests/profile.test.ts` para percorrer `profile` e `profileEn` e o dicionário EN (AC4); novo `tests/i18n.test.ts` construindo o site (AC1 a AC3, AC5).
3. Criar `src/data/profile.en.ts`, `src/i18n/en.ts`, os três `.md` em `src/content/projects/en/` e passar o glob da coleção para `src/content/projects` com filtro pelo prefixo do idioma.
4. Refatorar os componentes para receberem `lang` e lerem o perfil, o dicionário e os projetos desse idioma (hoje importam `pt` direto); criar `src/pages/en/index.astro` reutilizando o mesmo conteúdo da página.
5. Trocar o `en` sem link do cabeçalho por link real, adicionar os `hreflang` no `Layout.astro` e ligar o sitemap i18n.
6. Rerodar os scripts de 360 px e teclado nas duas páginas e rodar `npm test`, `npm run build` e `verification.md`.

Cobertura: passos 2–3 → AC4, AC5; passos 4–5 → AC1 a AC3, AC6; passo 6 → AC1, AC2.
Decisão a aprovar: as traduções marcadas acima são minhas; você revisa antes do merge (eu paro e te mostro o texto EN completo).
Branch: `card/012-english`. Commit: `feat: add english version under /en/`.
