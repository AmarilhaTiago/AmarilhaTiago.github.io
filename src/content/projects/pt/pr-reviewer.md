---
title: Revisor de PR com LLM
summary: "Revisão de primeira passada de pull requests com LLM, entregue como GitHub Action: comentários inline e um resumo idempotente."
highlights:
  - "Saída do modelo validada por schema, com uma nova tentativa quando falha."
  - "Orçamento de tokens por trecho e por PR, com custo registrado."
  - "Suíte de evals com 16 casos para comparar modelos."
metric: "Evals (16 casos): recall 92–100% · precisão 86–87% com gpt-oss-120b · US$ 0"
stack: [Python, GitHub Actions, Docker, LLM, pytest]
repo: https://github.com/AmarilhaTiago/pr-reviewer
status: pronto
order: 1
---
