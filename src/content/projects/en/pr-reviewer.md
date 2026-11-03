---
title: LLM-powered PR Reviewer
summary: "First-pass pull request review with an LLM, delivered as a GitHub Action: inline comments and an idempotent summary."
highlights:
  - "Model output validated against a schema, with one retry on failure."
  - "Token budgets per chunk and per PR, with cost tracking."
  - "Eval suite with 16 cases to compare models."
metric: "Evals (16 cases): recall 92–100% · precision 86–87% with gpt-oss-120b · US$ 0"
stack: [Python, GitHub Actions, Docker, LLM, pytest]
repo: https://github.com/AmarilhaTiago/pr-reviewer
status: pronto
order: 1
---
