# Verificação: card #11 (currículo para download)

| AC | Evidência |
|---|---|
| AC1: `cvLink('pt')` aponta para o PDF publicado, que existe e é PDF | `tests/cv.test.ts` › "AC1": confere o retorno, que `public/cv/curriculo-tiago-amarilha-pt.pdf` existe e começa com `%PDF`. Passa. O build gera `dist/cv/curriculo-tiago-amarilha-pt.pdf` (65484 bytes, começa com `%PDF`). |
| AC2: `cvLink('en')` cai no PT com ` (PT)` | `tests/cv.test.ts` › "AC2". Passa. |

Suíte completa: `npm test` → 8 passed (2 arquivos); `npm run build` → 1 page built.
