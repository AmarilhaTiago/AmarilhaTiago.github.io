# Verificação: card #7 (dados do perfil)

| AC | Evidência |
|---|---|
| AC1: todo dado factual tem `source` | `tests/profile.test.ts` › "AC1": percorre `profile` e falha em qualquer primitivo fora de `Sourced` ou com fonte inválida. Passa (6/6). Checagem de mutação: trocar `name` por string solta fez o teste falhar; arquivo restaurado, volta a passar. |
| AC2: sem CID nem detalhe médico | `tests/profile.test.ts` › "AC2": varre todas as strings de `profile` e `pt` atrás de `CID`, `G80`, `diagnóstico`. Passa. Checagem de mutação: inserir `'CID G80'` fez o teste falhar. |
| AC3: componentes sem texto factual fixo | `grep -rnE "Bello Card\|HaruCode\|Mega J\|FAPEC\|MaisCode\|amarilhatiago@\|99621\|Tech Lead" src --include=*.astro` retorna vazio. |

Extras cobertos pelos testes: 5 empresas na ordem aprovada (início mais recente primeiro), selo PCD sem emoji, fontes do Mega Júnior (`tiago` na descrição, `linkedin` no cargo e nas datas), link do WhatsApp.
Suíte completa: `npm test` → 6 passed; `npm run build` → 1 page built.
