# 🎬 Movies API

## 📌 Overview

API backend para gerenciamento de filmes com autenticação, upload de arquivos e processamento assíncrono de tarefas.

O projeto foca em demonstrar construção de uma API completa, cobrindo:

- autenticação (JWT)
- validação de dados
- upload de arquivos
- organização em camadas
- processamento assíncrono simplificado (jobs)

A proposta é simular um backend real sem introduzir complexidade excessiva de infraestrutura.

---

## 🧠 O que este projeto demonstra

- Construção de API REST estruturada
- Separação clara de responsabilidades (controller/service)
- Validação robusta com Zod
- Sistema de autenticação com JWT
- Upload de arquivos (Cloudflare R2)
- Processamento assíncrono com retry baseado em banco

---

## ⚙️ Fluxo do sistema

1. Usuário se registra e autentica
2. Cria filmes com dados estruturados
3. Realiza upload de imagens
4. Sistema agenda jobs (ex: lembretes)
5. Worker processa jobs periodicamente
6. Em caso de falha:
   - retry automático (até 5 vezes)
   - status atualizado

---

## 🛠️ Tech Stack

- Node.js
- TypeScript
- Prisma
- PostgreSQL
- Zod
- JWT
- Cloudflare R2

---

## 🔐 Autenticação

JWT via header:

    Authorization: Bearer <token>

---

## 📦 Endpoints

### Auth
- POST /auth/register  
- POST /auth/login  

### Movies
- GET /movies  
- POST /movies  
- GET /movies/:id  
- PUT /movies/:id  
- DELETE /movies/:id  

### Upload
- POST /upload  

---

## 🔍 Exemplo de filtro

    /movies?page=1&search=batman&genres=action,drama&minDuration=90

---

## ⚙️ Sistema de Jobs

O sistema utiliza uma abordagem baseada em banco para processamento assíncrono.

- Execução periódica (polling)
- Processamento de jobs pendentes
- Retry automático (até 5 tentativas)
- Estados: pending, processing, done, failed

Essa abordagem foi escolhida para reduzir complexidade e manter o foco na lógica de negócio, sem introduzir infraestrutura adicional como filas.

---

## 🧠 Decisões Técnicas

### Validação com Zod
Validação na borda da aplicação, evitando duplicação de tipos e garantindo entrada consistente.

### Separação de responsabilidades
- Controller → fluxo HTTP e validação  
- Service → regras de negócio  

### Sistema de jobs baseado em banco
Escolha por simplicidade e menor overhead operacional.

Trade-off:
- menor escalabilidade  
- ausência de concorrência real  

### Upload de arquivos
Uso de Cloudflare R2 (compatível com S3), retornando apenas URL pública.

### Filtros
Implementação simples com AND entre parâmetros.

Trade-off:
- menor eficiência em larga escala  

---

## 🚀 Como rodar

1. Instalar

    npm install

2. Configurar .env

Baseado no `.env.example`

3. Subir banco

    docker-compose up -d

4. Rodar migrations

    npx prisma migrate dev --name init

5. Rodar aplicação

    npm run dev

---

## 📁 Estrutura

    src/
     ├── config/
     ├── database/
     ├── middlewares/
     ├── modules/
     │    ├── auth/
     │    ├── movies/
     │    ├── upload/
     │    └── job/
     ├── errors/
     └── server.ts

---

## 🧠 Considerações finais

Este projeto prioriza simplicidade e clareza, demonstrando como construir uma API completa com boas práticas, sem depender de infraestrutura complexa.
