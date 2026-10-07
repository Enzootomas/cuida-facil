# Quickstart técnico — CuidaFácil

Este guia descreve a estrutura de execução proposta pelo plano. Ainda não é executável: a implementação, `package.json`, lockfile, containers e deployment não existem no repositório. Comandos e nomes devem ser conferidos durante o scaffold.

## Pré-requisitos propostos

- Node.js LTS fixado pela equipe e npm incluído nessa versão.
- PostgreSQL local ou container de desenvolvimento.
- Git e editor com suporte a TypeScript.
- Nenhum dado real de usuário ou saúde em ambiente local.

## Inicialização após scaffold

Na raiz do monorepo:

```powershell
npm ci
Copy-Item .env.example .env
docker compose up -d postgres
npm run db:migrate
npm run dev
```

Os scripts deverão iniciar SPA e API em desenvolvimento e apontar a API para banco local. `docker compose` serve somente para o ambiente local; a produção deverá usar infraestrutura e segredos gerenciados pelo host aprovado.

## Verificações locais

```powershell
npm run lint
npm run format:check
npm run typecheck
npm run test
npm run test:integration
npm run build
npm run test:e2e
```

As verificações de integração precisam de PostgreSQL de teste isolado. Os testes E2E devem usar exclusivamente dados sintéticos e validar as rotas por perfil e as negativas de autorização.

## Variáveis de ambiente

`.env.example` documentará nomes e valores fictícios de configuração, sem segredos:

```text
NODE_ENV=development
DATABASE_URL=postgresql://local-user:local-password@localhost:5432/cuidafacil_dev
APP_ORIGIN=http://localhost:5173
API_ORIGIN=http://localhost:3000
CORS_ALLOWED_ORIGINS=http://localhost:5173
LOG_LEVEL=info
```

Autenticação, store de sessão e serviços de verificação podem exigir variáveis adicionais após CL-03. Não adicionar valores default de segredo; produção deve falhar na inicialização se segredos/configurações requeridos estiverem ausentes.

## Ambientes e dados

- `development`: contas e registros sintéticos.
- `test`: banco efêmero independente, recriado por suite.
- `staging`: recursos separados de produção e dados sintéticos.
- `production`: dados reais protegidos; migração versionada, backup e procedimento de restauração validados antes de liberar.
