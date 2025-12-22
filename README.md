# Mega-Sena Optimizer

Este projeto é uma aplicação web para gerar apostas otimizadas da Mega-Sena com base em análise estatística de dados históricos.

## Estrutura do Projeto

- **backend.py**: Servidor Flask que processa os dados e serve a API.
- **frontend/**: Aplicação Web construída com Vite e Lit.
- **dados_historicos.csv**: Base de dados dos sorteios anteriores.

## Pré-requisitos

- Python 3.8+
- Node.js 16+
- NPM

## Instalação e Execução

### Backend

1. Instale as dependências:

   ```bash
   pip install -r requirements.txt
   ```

2. Execute o servidor:

   ```bash
   python backend.py
   ```

   O servidor rodará em `http://localhost:3000`.

### Frontend

1. Entre na pasta do frontend:

   ```bash
   cd frontend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

   Acesse a aplicação no navegador (geralmente em `http://localhost:5173`).

## Funcionalidades

- Visualização de estatísticas de frequência das dezenas.
- Geração de apostas otimizadas com filtros de paridade e soma.
