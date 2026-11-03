# Verificação: card #6 (deploy)

| AC | Evidência |
|---|---|
| AC1: push na `main` conclui o workflow | Run https://github.com/AmarilhaTiago/AmarilhaTiago.github.io/actions/runs/41727081829: `success` (jobs `build` e `deploy` com sucesso). |
| AC2: https://amarilhatiago.github.io responde 200 com a página | `curl` retornou `200` e `<title>~/tiago</title>` (a página do projeto, não o README). |
| AC3: Source do Pages = GitHub Actions | `gh api repos/AmarilhaTiago/AmarilhaTiago.github.io/pages -q .build_type`: `legacy` antes, `workflow` depois. |
