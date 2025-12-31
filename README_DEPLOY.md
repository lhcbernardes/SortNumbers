# Guia de Deploy (Produção Barata/Gratuita)

Este guia explica como colocar seu projeto "SortNumbers" no ar usando serviços gratuitos.

## 1. Backend (Python/Flask) - Deploy no Render

O Render possui um plano gratuito para serviços web que desliga após 15 minutos de inatividade, o que é perfeito para projetos de hobby/portfolio.

### Passos:
1. Crie uma conta no [Render.com](https://render.com/).
2. Conecte sua conta do GitHub.
3. Clique em **"New +"** e selecione **"Web Service"**.
4. Conecte o repositório deste projeto.
5. Configure o serviço:
   - **Name**: `sortnumbers-backend` (ou o que preferir)
   - **Region**: Escolha a mais próxima (ex: Ohio ou Frankfurt)
   - **Root Directory**: `backend` (Muito importante!)
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn --bind 0.0.0.0:$PORT backend:app`
   - **Plan**: Free
6. Clique em **"Create Web Service"**.
7. Aguarde o deploy. Quando terminar, você terá uma URL (ex: `https://sortnumbers-backend.onrender.com`). **Copie essa URL.**

> **Atenção**: O arquivo `dados_historicos.csv` precisa estar na pasta `backend` do seu repositório GitHub. Se não estiver, o serviço não encontrará os dados.

## 2. Frontend (Vite/Lit) - Deploy na Vercel

A Vercel é excelente para frontends modernos e tem um plano gratuito generoso.

### Passos:
1. Crie uma conta na [Vercel.com](https://vercel.com/).
2. Clique em **"Add New..."** -> **"Project"**.
3. Importe o repositório do Git.
4. Na tela de configuração:
   - **Root Directory**: Clique em "Edit" e selecione a pasta `frontend`.
   - **Framework Preset**: A Vercel deve detectar "Vite" automaticamente.
   - **Environment Variables**:
     - Adicione uma variável chamada `VITE_API_URL`.
     - No valor, cole a URL do seu backend no Render (ex: `https://sortnumbers-backend.onrender.com`). **Não coloque a barra `/` no final.**
5. Clique em **"Deploy"**.

## Resumo
- Seu Backend ficará hospedado no Render (pode demorar uns 30 segundos para "acordar" no primeiro acesso).
- Seu Frontend ficará na Vercel e acessará o Backend.
- Tudo 100% gratuito.
