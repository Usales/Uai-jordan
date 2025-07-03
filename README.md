# Uai-Jordan

E-commerce fictício de tênis inspirado na linha Air Jordan, desenvolvido em React com funções serverless (Netlify Functions) para backend.

## Funcionalidades
- Página inicial com carrossel responsivo de produtos em destaque
- Loja com grid de produtos
- Carrinho de compras persistente
- Cadastro, login e área "Minha Conta"
- Formulário de contato funcional
- Política de Troca e FAQ estilizados
- Rastreio de pedidos (mock)
- Navbar responsiva com menu hambúrguer
- Totalmente responsivo para mobile (testado em iPhone SE)

## Instalação e uso local
1. Clone o repositório:
   ```bash
   git clone <url-do-repo>
   cd Uai-jordan
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Rode o projeto localmente:
   ```bash
   npm start
   ```
4. Para testar as funções serverless localmente:
   ```bash
   npm install -g netlify-cli
   netlify dev
   ```

## Deploy no Netlify
1. Faça push do projeto para um repositório no GitHub.
2. No Netlify, clique em "Add new site" > "Import an existing project" e conecte ao seu repositório.
3. O Netlify detecta o build automaticamente (ou configure `build` como `npm run build` e `publish` como `build`).
4. As funções serverless ficam em `/netlify/functions` e são acessadas via `/.netlify/functions/nomeDaFuncao`.
5. O arquivo `netlify.toml` já está configurado para SPA.

## Estrutura de pastas
- `src/` — código React
- `src/pages/` — páginas principais (Home, Contato, FAQ, etc)
- `src/components/` — componentes reutilizáveis
- `netlify/functions/` — funções serverless (backend)
- `public/` — imagens e arquivos estáticos

## Responsividade
- O site é mobile-first, com media queries para telas pequenas
- Navbar, carrossel, cards, formulários e grids adaptados para celulares
- Testado em iPhone SE, Android e desktop

## Licença
Projeto educacional, sem fins comerciais.
