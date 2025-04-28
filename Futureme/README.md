# FutureMe Gerenciador de Tarefas

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E) ![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

Este projeto é um gerenciador de tarefas simples implementado como um monorepo usando TurboRepo.

## Estrutura do Projeto

- `apps/app1`: Aplicação principal com API REST em Express e interface web para gerenciar tarefas.
- `packages/pkg1`: Placeholder para pacotes compartilhados (atualmente vazio).

## Como Rodar

1. Instale as dependências no root e no app1:

```bash
npm install
cd apps/app1
npm install
```

2. Rode a aplicação:

```bash
npm run dev
```

A API estará disponível em `http://localhost:3000`.

## Scripts Disponíveis

No diretório `apps/app1`:

- `npm run dev`: inicia o servidor da aplicação.
- `npm run test`: executa os testes unitários.
- `npm run lint`: executa o ESLint para análise estática do código.

## Funcionalidades

- Criar, listar, editar e excluir tarefas.
- Persistência simples em arquivo JSON.
- Interface web responsiva para gerenciamento das tarefas.

## Próximos Passos


---
- Implementar CI/CD.

## Contato

Para dúvidas ou sugestões, entre em contato.
