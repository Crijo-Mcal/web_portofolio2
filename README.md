# Portfólio — Crijolise Marçal

Next.js (App Router) · React · TypeScript · Tailwind CSS v4.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # verifica também os dados JSON
```

## Conteúdo

| Ficheiro | Conteúdo |
|---|---|
| `data/projects.json` | Projetos (ordem do ficheiro = ordem no site; `"featured": true` = cartão laranja grande) |
| `data/experiences.json` | Experiências (mais recente primeiro) |
| `data/skills.json` | Competências (ícones Devicon) |
| `data/site.json` | Email, GitHub, caminho do CV |
| `public/assets/` | Imagens (o site nunca usa `desain/`) |

### Adicionar um projeto
1. Coloque a imagem em `public/assets/projects/<slug>.png` (16:9, por ex. 1200×675).
2. Adicione um objeto a `data/projects.json` (copie um existente). `slug` em minúsculas com hífens.
3. `demoUrl` / `repoUrl` vazios (`""`) → botões desativados. `context` e `status` são opcionais.

O cartão e a página `/projetos/<slug>` aparecem automaticamente.

### Adicionar uma experiência
Adicione um objeto no topo de `data/experiences.json`. `projectSlug` (opcional) mostra o link "Ver projeto …".

### CV
Coloque o ficheiro em `public/assets/cv.pdf`. Enquanto não existir, os botões "Descarregar CV" ficam desativados.

Se faltar um campo obrigatório ou uma imagem, `npm run build` falha com uma mensagem a indicar o ficheiro, o item e o campo.

## Deploy
Push para o GitHub → importar no Vercel (sem configuração extra).
