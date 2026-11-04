# Verificação: card #12 (versão em inglês)

| AC | Evidência |
|---|---|
| AC1: `/en/` com todos os blocos, `lang="en"` e dicionário EN | `tests/i18n.test.ts` › "AC1" (dois testes): cabeçalho, hero, Sobre, projetos na ordem (`LLM-powered PR Reviewer`, `Job Radar`, `FinCtrl`) com os selos `ready` e `under construction`, experiência com períodos no formato `May 2026 – present`, links e rodapé. O botão de currículo usa `cvLink('en')`: `Download résumé (PT)` apontando para o PDF em português. A página PT não mostra conteúdo em inglês. |
| AC2: seletor com links reais e `aria-current` | `tests/i18n.test.ts` › "AC2": em PT, `en` leva a `/en/` e `pt` (atual) leva a `/`; em EN, o inverso. |
| AC3: hreflang, canonical, locale e sitemap | `tests/i18n.test.ts` › "AC3": as duas páginas trazem `hreflang` `pt-BR`, `en` e `x-default`; canonical próprio de cada uma; `og:locale` = `en_US` no EN; `sitemap-0.xml` lista `/` e `/en/` com `hreflang="en-US"`. |
| AC4: dados EN com fonte e sem termos médicos | `tests/profile.test.ts` agora roda para PT **e** EN (`describe.each`): fontes válidas em todas as folhas, sem CID/G80/diagnóstico, selo exato e sem emoji, 5 entradas na ordem, mesmas datas e contatos nos dois idiomas. `tests/i18n.test.ts` › "AC4": textos de SEO em EN sem dado sensível. |
| AC5: coleção por idioma | `tests/i18n.test.ts` › "AC5": cria um `.md` em `pt/` e outro em `en/` com títulos distintos, faz o build, e cada um aparece só na sua página; os arquivos são removidos. |
| AC6: copiar link copia a URL do idioma atual | Script de Playwright com permissão de área de transferência, em `/en/` a 360 px: o clique copiou `http://localhost:4395/en/` e o rótulo virou `copied!`. O teste confere também o `location.href` no script e o `data-copied`. |

Verificações extras na página em inglês:
- 360 px: `scrollWidth 360 / clientWidth 360`; print da página inteira: `en-360.png`.
- Teclado: Skip to content → ~/tiago → copy link → pt → en → View projects → Download résumé (PT) → repo → repo, todos com foco visível.
- Lighthouse 13.6.0 (`npm run lighthouse`, agora mede `/` e `/en/`, celular e desktop): 100 / 100 / 100 / 100 nos quatro casos. Relatórios: `docs/cards/014-a11y-lighthouse/lighthouse-en-{mobile,desktop}.json`.
- `a11y.test.ts` passou a cobrir as duas páginas (um `h1`, títulos em ordem, landmarks, link de pular).

Desvios e decisões:
- Os ids das âncoras ficam no dicionário: em PT `sobre`, `projetos`, `experiencia`, `links`; em EN `about`, `projects`, `experience`, `links` (o botão "View projects" aponta para `#projects`).
- A coleção passou a ler `src/content/projects/**` e filtra pelo prefixo do idioma (`pt/`, `en/`) no id da entrada.
- O sitemap usa a opção `i18n` da integração, que gera os `xhtml:link` de hreflang.
- Traduções feitas por mim, **pendentes de revisão do Tiago**: subtítulo, localização, cargo e descrição do Mega Júnior, rótulos de interface e os três cards de projeto (comentadas como `// translation` em `src/data/profile.en.ts`). Os textos "Sobre", cargos e selo PCD em EN são os da spec.

Suíte completa: `npm test` → 64 passed (10 arquivos); `npm run build` → 2 páginas.
