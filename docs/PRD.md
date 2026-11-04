# PRD: site portfólio (`AmarilhaTiago.github.io`)

Spec de origem: `portfolio/docs/02-site-portfolio.md`. Este PRD registra só o que a descoberta de 03/11/2026 decidiu ou acrescentou.

## Problema
Recrutadores (iFood GenAI e vagas remotas) precisam, em poucos segundos, ver quem é o Tiago, o que ele construiu e como contatá-lo ou baixar o currículo.
Hoje o único perfil público são repos antigos de faculdade.

## Usuário
Recrutador ou tech lead técnico, em desktop ou celular (360px), em português ou inglês, com pouco tempo.

## Objetivos
1. Página única no ar em https://amarilhatiago.github.io, em PT (padrão) e EN.
2. Seção de projetos alimentada por arquivos `.md`: adicionar um projeto = criar um arquivo.
3. Baixar o currículo funcionando nos dois idiomas (EN aponta para o PT com "(PT)" até existir o PDF em inglês).
4. Lighthouse ≥ 95 nas quatro categorias, 360px e navegação só por teclado.

## Não-objetivos
Blog, CMS, formulário com backend, modo claro, analytics, domínio próprio (pode vir depois com `CNAME`).

## Requisitos funcionais
Os da spec §2 a §4 (cabeçalho, hero, sobre, projetos, experiência, links, rodapé), mais:
- Experiência com **5 entradas**, em ordem de início mais recente primeiro: Bello Card, HaruCode, Mega Júnior, FAPEC, MaisCode.
- Seção Links com GitHub, LinkedIn, e-mail, **WhatsApp** (link `wa.me`, número visível) e currículo PT/EN.
- Todo dado factual vem de `src/data/profile.ts` (e `profile.en.ts`), com comentário de origem. A conferência campo → valor → fonte fica num relatório privado, fora deste repo.

## Requisitos não funcionais
Astro + Tailwind, JS no cliente só para "copiar link", contraste WCAG AA, foco visível, `prefers-reduced-motion`, SEO completo (spec §6).

## Decisões da descoberta (com o porquê)
| # | Decisão | Por quê |
|---|---|---|
| P1 | Usar o repo `AmarilhaTiago.github.io` que já existia (só o commit inicial); Pages muda para GitHub Actions no primeiro deploy. | O nome é o exigido; nada a perder. |
| P2 | Em divergência entre currículo e LinkedIn, vale o currículo (Bello Card, FAPEC, MaisCode). | Fonte de prioridade 1 da spec; bate com os textos revisados. |
| P3 | Mega Júnior entra na experiência (cargo e datas do LinkedIn; descrição dita pelo Tiago). | Decisão do Tiago; mostra gestão de pessoas e mentoria. |
| P4 | LinkedIn: usar a URL do export (`...-a7a6b31b8`). | É a URL do próprio perfil. |
| P5 | Telefone, e-mail e WhatsApp públicos no site e no repo; `curriculo.pdf` publicado como está. | Decisão do Tiago. O `CLAUDE.md` do workspace foi atualizado. |
| P7 | Selo PCD sem o emoji ♿: PT `PCD · disponível para vagas exclusivas e afirmativas`; EN `Person with disability · open to inclusive and PwD-dedicated roles`. | Decisão do Tiago em 03/11/2026 (muda a spec §2). Continua sem CID nem detalhe médico. |
| P8 | Cor de destaque: **vermelhão `#FF5C39`** (opção D do protótipo), sobre fundo `#0a0a0a`. Contraste 6,45:1 no fundo e 6,14:1 no card (AA). | Escolha do Tiago em 03/11/2026: identifica-se com vermelho. Texto do botão principal em `#0a0a0a`. |
| P9 | Cada cargo mostra os tópicos e a stack do currículo, em PT e EN; o Bello Card entra completo. O Mega Júnior (que não está no currículo) segue só com a descrição aprovada. | Pedido do Tiago em 04/11/2026: "deixe assim como está no currículo". O PDF do currículo, com esses mesmos trechos, já é público no site. |
| P6 | Card do pr-reviewer: "Evals (16 casos): recall 92–100% · precisão 86–87% com gpt-oss-120b · US$ 0". | Números medidos, com o modelo nomeado. |

## Métricas de sucesso
Critérios de aceite da spec §9 (todos marcados) e Lighthouse impresso no README.

## Riscos
- Dados de contato públicos podem ser coletados por robôs de spam. Aceito pelo Tiago.
- Currículo em PDF sem o Mega Júnior: diverge da linha do tempo até o Tiago atualizar o arquivo.
- URL do LinkedIn não verificável por automação: o Tiago confirma abrindo o link.
- O texto em inglês do Mega Júnior é tradução minha e precisa da revisão do Tiago.
