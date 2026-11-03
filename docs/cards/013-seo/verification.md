# Verificação: card #13 (SEO)

| AC | Evidência |
|---|---|
| AC1: title, description, canonical, Open Graph e Twitter card | `tests/seo.test.ts` › "AC1": confere cada tag no HTML do build (`og:locale` = `pt_BR`, `og:image` absoluta, `twitter:card` = `summary_large_image`). |
| AC2: imagem OG 1200×630 | `tests/seo.test.ts` › "AC2" lê o cabeçalho do PNG: 1200×630. Preview: `og-preview.png`. |
| AC3: sitemap e robots | `tests/seo.test.ts` › "AC3": `sitemap-index.xml` aponta para `sitemap-0.xml`, que lista `https://amarilhatiago.github.io/`; `robots.txt` com `Allow: /` e a linha `Sitemap:`. |
| AC4: favicon próprio | `tests/seo.test.ts` › "AC4": SVG com a cor de destaque, ICO com cabeçalho válido, `<link rel="icon">` no HTML. Gerados por `scripts/generate-og.mjs`. |
| AC5: textos de SEO sem dado sensível | `tests/seo.test.ts` › "AC5": sem CID, diagnóstico, `@` nem número de telefone. |

Observação: a primeira execução do script falhou em silêncio (o Edge exige caminho absoluto para o screenshot); o teste de AC2 acusou o PNG ausente e o script passou a falhar com erro claro.
Suíte completa: `npm test` → 34 passed (7 arquivos); `npm run build` ok.
