# Uai-Jordan

E-commerce fictício de tênis inspirado na linha Air Jordan, desenvolvido em React com funções serverless (Netlify Functions) para backend.

## Funcionalidades
- Página inicial com carrossel animado e responsivo de produtos em destaque
- Loja com grid de produtos e animação de entrada
- Carrinho de compras persistente e animado
- Cadastro, login e área "Minha Conta" com edição de dados
- Formulário de contato funcional
- Política de Troca e FAQ estilizados
- Navbar responsiva com menu hambúrguer
- Rodapé moderno e totalmente responsivo
- Todas as páginas possuem animação de entrada (fade-in-up)
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
- `src/pages/` — todas as páginas principais (Home, Loja, Contato, FAQ, Política de Troca, Minha Conta, Login, etc)
- `src/components/` — componentes reutilizáveis (Carrossel, Footer, Header, etc)
- `netlify/functions/` — funções serverless (backend)
- `public/` — imagens e arquivos estáticos

## Responsividade e animações
- O site é mobile-first, com media queries para telas pequenas
- Navbar, carrossel, cards, formulários, grids e rodapé adaptados para celulares
- Todas as páginas possuem animação de entrada suave (fade-in-up)
- Testado em iPhone SE, Android e desktop

## Observações
- O recurso de rastrear pedido foi removido.
- O fluxo de autenticação/cadastro foi revisado para evitar login automático indevido.
- O rodapé foi aprimorado para melhor experiência mobile.

## Licença
Projeto educacional, sem fins comerciais.
