# Card #13: SEO

Issue: #13 · Épico: #4 · Spec + plano juntos. Depende de #9 e #10.

## Spec (o quê)
Metadados e arquivos de SEO para a página em PT, com preview de link (LinkedIn, WhatsApp) que mostra título, descrição e imagem.

Textos (derivados de `profile.ts`, nada novo):
- `title`: `Tiago Amarilha · Desenvolvedor Full Stack · Tech Lead`
- `description`: `Tiago Amarilha, Desenvolvedor Full Stack · Tech Lead · IA aplicada. Projetos, experiência e currículo.` (montada a partir do subtítulo do perfil)

- **AC1:** Dada a página, então tem `<title>`, `meta description`, `link rel="canonical"` (`https://amarilhatiago.github.io/`), Open Graph (`og:title`, `og:description`, `og:type`, `og:url`, `og:image`, `og:locale` = `pt_BR`) e Twitter card (`summary_large_image`).
- **AC2:** Dada a imagem OG, então existe em `public/og.png` com 1200×630 e a URL absoluta no `og:image` aponta para ela.
- **AC3:** Dado o build, então gera `sitemap-index.xml` com a URL do site e `robots.txt` que permite tudo e aponta para o sitemap.
- **AC4:** Dado o site, então tem favicon próprio (não o logo padrão do Astro), em SVG e ICO.
- **AC5:** Dados os textos de SEO, então não contêm CID, diagnóstico, telefone nem e-mail (teste).

Fora do escopo: inglês e `hreflang` (#12), analytics.

## Plano (como), em ordem TDD
1. Ler a doc oficial **atual** da integração de sitemap do Astro (`@astrojs/sitemap`) e instalá-la com `npx astro add sitemap`.
2. **Teste que falha:** `tests/seo.test.ts` (build em `.test-dist/seo`): AC1 no HTML, AC2 lendo o cabeçalho do PNG (largura e altura), AC3 nos arquivos gerados, AC5 nas strings.
3. Estender `Layout.astro` com props `title`, `description`, `canonical` e `image`, e mover os textos para `src/data/seo.ts`.
4. Gerar a imagem OG: `scripts/generate-og.mjs` abre um HTML de 1200×630 (fundo `#0a0a0a`, `~/tiago`, nome, subtítulo, destaque `#FF5C39`) no Edge headless e salva `public/og.png`. O script e o PNG são versionados; o script não roda no build.
5. Criar `public/robots.txt` e trocar `favicon.svg` e `favicon.ico` por um `~/` no destaque sobre o fundo escuro.
6. `npm test`, `npm run build`, verificar o preview do link visualmente (print) e `verification.md`.

Cobertura: passos 3–4 → AC1, AC2; passo 1 e 5 → AC3, AC4; passo 2 → AC5.
Decisão a aprovar: gerar a imagem OG com um script no Edge headless, sem dependência nova (a spec marca a imagem como cortável; entra, mas é o primeiro item a sair se faltar tempo).
Branch: `card/013-seo`. Commit: `feat: add seo metadata, sitemap, robots and og image`.
