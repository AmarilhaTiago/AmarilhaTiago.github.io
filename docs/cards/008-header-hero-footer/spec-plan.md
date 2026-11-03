# Card #8: Cabeçalho, hero e rodapé

Issue: #8 · Épico: #2 · Depende de #7 e #11. Spec + plano juntos (layout; a lógica testável é pouca).

## Spec (o quê)
Layout base da página única em PT, com a paleta D, fontes mono e sans hospedadas no próprio site, e três blocos: cabeçalho fixo, hero e rodapé. Todo texto vem de `profile.ts` e `pt.ts`.

- **AC1:** Dado o cabeçalho, então mostra `~/tiago` com cursor piscando, o botão "copiar link" e o seletor `pt | en`. Ao clicar em "copiar link", o rótulo vira "copiado!" por 1,5 s.
- **AC2:** Dado o hero, então mostra nome, subtítulo, localização, o selo `PCD · disponível para vagas exclusivas e afirmativas` (sem emoji) e os botões "Ver projetos" (âncora `#projetos`) e "Baixar currículo" (link de `cvLink('pt')`).
- **AC3:** Dado 360 px de largura, então não há scroll horizontal.
- **AC4:** Dado `prefers-reduced-motion: reduce`, então o cursor não pisca e as transições ficam desligadas.
- **AC5:** Dado o rodapé, então mostra `© 2026 Tiago Amarilha`.
- **AC6:** Dado o teclado, então todos os elementos interativos têm foco visível.

Casos de borda: sem JavaScript, o botão "copiar link" não pode quebrar a página (progressive enhancement: o resto funciona).
Fora do escopo: a troca de idioma funcionar (#12, o seletor só aponta para `/en/`), seções abaixo do hero (#9, #10).

## Plano (como)
1. Instalar as fontes por `@fontsource` (JetBrains Mono e Inter), conferindo na doc/npm os nomes e versões atuais dos pacotes; importar só os pesos usados.
2. **Teste que falha:** `tests/page.test.ts` constrói o site (`npm run build`) e lê `dist/index.html`: texto do cabeçalho, hero, ausência do `♿`, `href` do botão de currículo, rodapé, `lang="pt-BR"` (AC1, AC2, AC5). Um teste lê o CSS gerado e exige `prefers-reduced-motion` (AC4).
3. Criar `Header.astro`, `Hero.astro`, `Footer.astro` e atualizar `Layout.astro`; script de "copiar link" (único JS no cliente).
4. Conferir AC3 e AC6 com um script descartável de Playwright no scratchpad (fora do repo): mede `scrollWidth` em 360 px e percorre a página com Tab.
5. `npm test` e `npm run build`; preencher `verification.md` com a saída e um print em 360 px.

Cobertura: passo 2 → AC1, AC2, AC4, AC5; passo 4 → AC3, AC6.
Branch: `card/008-header-hero-footer`. Commit: `feat: add header, hero and footer`.
