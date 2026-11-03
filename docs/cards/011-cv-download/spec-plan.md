# Card #11: Currículo para download

Issue: #11 · Épico: #2 · Spec + plano juntos (card pequeno). **Entra primeiro do lote**, para o botão do hero (#8) nunca apontar para um arquivo inexistente.

## Spec (o quê)
O PDF do currículo é publicado em `public/cv/` e uma função pura decide o link e o rótulo por idioma. Decisão do Tiago (Q6): o PDF vai como está, com celular e e-mail.

Contrato: `cvLink(lang: 'pt' | 'en') -> { href: string; suffix: string }`
- `pt` → `{ href: '/cv/curriculo-tiago-amarilha-pt.pdf', suffix: '' }`
- `en` → mesmo `href` do PT, `suffix: ' (PT)'` (não há PDF em inglês ainda; spec §6).

- **AC1:** Dado `cvLink('pt')`, então o `href` é `/cv/curriculo-tiago-amarilha-pt.pdf` e o arquivo existe em `public/cv/` e é um PDF válido (começa com `%PDF`).
- **AC2:** Dado `cvLink('en')` sem PDF em inglês, então o `href` é o do PT e o `suffix` é ` (PT)`.

Fora do escopo: o botão em si (#8), a página EN (#12) e o `resume` em inglês.

## Plano (como), em ordem TDD
1. **Teste que falha:** `tests/cv.test.ts` com AC1 (função e arquivo) e AC2.
2. Copiar `docs/fontes/curriculo.pdf` do workspace para `public/cv/curriculo-tiago-amarilha-pt.pdf` (cópia, o original não muda).
3. Criar `src/data/cv.ts` com `cvLink` até os testes passarem.
4. Rodar `npm test` e `npm run build`; conferir que o PDF sai em `dist/cv/`.

Cobertura: passos 1–3 → AC1 e AC2.
Branch: `card/011-cv-download`. Commit: `feat: add cv pdf and cv link helper`.
