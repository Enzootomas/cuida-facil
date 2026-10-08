# Plano de Implementação: CuidaFácil

**Branch**: `001-cuida-facil` | **Data**: 2026-10-07 | **Especificação**: [spec.md](./spec.md)

**Entrada**: Especificação funcional do CuidaFácil.

## Resumo

Implementar a plataforma como uma aplicação web responsiva com uma SPA React/TypeScript, uma API REST TypeScript em monólito modular e PostgreSQL. O frontend compartilhará componentes de interface e validadores entre os perfis, mantendo rotas e casos de uso distintos por papel. O backend concentrará autenticação, autorização, validações definitivas e regras de domínio; o banco relacional preservará vínculos, permissões, solicitações, compromissos, notificações e trilhas de auditoria.

A proposta minimiza infraestrutura e acoplamento para o MVP: um repositório, uma aplicação frontend, uma API implantável única e um banco PostgreSQL. Não introduz microserviços, filas, Redis, pagamentos, integração médica ou geolocalização automática. Detalhes de produto ainda abertos em [clarifications.md](./clarifications.md) devem ser decididos antes das tarefas afetadas. As escolhas de stack abaixo são recomendações técnicas deste plano, não decisões de produto já aprovadas.

## Contexto técnico

**Linguagem/versão**: TypeScript com `strict` habilitado; versão Node.js LTS vigente a fixar no setup do repositório.  
**Frontend**: React + Vite; React Router; TanStack Query; React Hook Form + Zod; CSS Modules e tokens CSS.  
**Backend**: Node.js + Fastify; Zod nos limites HTTP; Prisma ORM; OpenAPI 3.1.  
**Persistência**: PostgreSQL. Migrações versionadas pelo Prisma.  
**Workspace/pacotes**: npm workspaces e lockfile único como opção padrão de baixo overhead; fixar versões de Node/npm no scaffold.  
**Testes**: Vitest, Testing Library, Supertest ou cliente HTTP equivalente, Playwright, axe-core.  
**Logging**: Pino em JSON, com redação de dados pessoais/sensíveis.  
**Plataforma alvo**: navegador desktop, tablet e celular; runtime Node.js e PostgreSQL gerenciados ou containerizados. Provedor de implantação a decidir.  
**Tipo de projeto**: aplicação web full-stack com API REST.  
**Metas de desempenho**: ainda não especificadas. Não assumir SLO ou limites quantitativos até resposta à CL-18.  
**Escala**: MVP sem metas de volume definidas; particionamento, cache distribuído e serviços independentes ficam fora do desenho inicial.

### Decisões técnicas propostas

1. **React + TypeScript + Vite** para entrega rápida de uma SPA acessível sem framework server-side adicional.
2. **Fastify + TypeScript** em um processo de API, com módulos de domínio explícitos e plugins somente quando necessários.
3. **PostgreSQL + Prisma** para transações, chaves estrangeiras, índices e migrações; autorização e transições de estado continuam explícitas no domínio, não delegadas ao ORM.
4. **REST versionada em `/api/v1` + OpenAPI** para contratos tipados, simples de testar e sem camada GraphQL.
5. **Sessão server-side em cookie HttpOnly/Secure/SameSite** como opção preferida de arquitetura para navegador, sem tokens de longa duração em `localStorage`. Método de autenticação, verificação e recuperação permanece pendente de decisão de produto CL-06.
6. **CSS Modules + tokens CSS sem biblioteca visual obrigatória** para evitar dependência de um sistema de componentes genérico antes de conhecer as referências visuais; componentes CuidaFácil próprios devem ser reutilizáveis.
7. **Monólito modular**: módulos de domínio no mesmo deploy e mesma base relacional, evitando microserviços e infraestrutura adicional no MVP.

## Verificação da Constituição

| Princípio | Aplicação no plano | Situação |
|---|---|---|
| Autonomia, dignidade e bem-estar | Fluxos de apoio, transporte e organização de compromissos; sem diagnóstico | Conforme |
| Acessibilidade e clareza | Componentes semânticos, teclado, leitor de tela, feedback consistente e validação legível | Conforme; padrão formal aguarda CL-16 |
| Privacidade e controle por perfil | Policy checks no backend, relação UserTutor e permissões por vínculo; negação padrão | Conforme; escopos de dados aguardam CL-06/19 |
| Limites para informação de saúde | Dados tratados como sensíveis; endpoints de compromissos sujeitos a autorização | Conforme |
| Validação e confiabilidade | Zod no cliente e no servidor; validação de domínio e integridade no banco | Conforme |
| Modularidade, testes e rastreabilidade | Módulos por domínio, IDs FR/US nos contratos e testes vinculados | Conforme |
| MVP e escopo justificado | Aplicação única, sem pagamentos, integrações clínicas ou serviços distribuídos | Conforme |
| Decisões não especificadas | Ambiguidades apontadas em CLs e gates dependentes bloqueados | Conforme; não iniciar implementação dos fluxos bloqueados |

**Gate de produto**: decisões sobre elegibilidade, vínculos, permissões, exposição de dados, autenticação, localização, parceiros, seleção, disponibilidade, cancelamento e notificações devem ser esclarecidas em `/speckit.clarify`. Os contratos e modelos deste plano indicam campos/limites necessários, mas não aprovam políticas que a especificação ainda não determinou.

## Arquitetura proposta

### Visão de componentes

```text
Browser
  └── React SPA
      ├── páginas por perfil e áreas públicas
      ├── componentes acessíveis compartilhados
      ├── TanStack Query (estado remoto)
      └── React Hook Form + Zod (estado de formulário)
             │ HTTPS / JSON / cookie de sessão / CSRF
             ▼
      Fastify REST API (/api/v1)
      ├── plugins transversais: sessão, autorização, validação, erros, logging
      ├── módulos: identity, users, tutors, partners, availability,
      │            caregiver-search, service-requests, health, notifications
      └── Prisma
             │
             ▼
         PostgreSQL
```

Não há chamada direta do navegador ao banco. Validação no cliente existe para feedback; somente a validação da API e as regras de domínio são autoridade. Não se assume API de mapas, e-mail, SMS, push, armazenamento de documentos ou pagamento até decisão de produto e escolha de provedor.

### Frontend

**Stack**: React, TypeScript strict, Vite, React Router, TanStack Query, React Hook Form, Zod e CSS Modules.

**Organização**:

- `app/`: inicialização, providers, roteador, boundaries e configuração global.
- `routes/`: rotas públicas, protegidas e layouts por perfil.
- `features/<domínio>/`: páginas, componentes de domínio, hooks, schemas de formulário e adaptadores HTTP.
- `components/ui/`: controles compartilhados e acessíveis (botão, campo, seleção, diálogo, status, alerta, carregamento, vazio, navegação).
- `components/layout/`: cabeçalho, navegação, breadcrumb/contexto e estruturas responsivas.
- `lib/api/`: cliente HTTP, parse de erros, configuração CSRF e tipos gerados do OpenAPI.
- `lib/auth/`: contexto somente de identidade/perfil e bootstrap de sessão; não manter credenciais.
- `styles/`: tokens de cor, tipografia, espaçamento, foco e breakpoints; paleta final aguarda referência visual.
- `test/`: fixtures, mocks e helpers comuns.

**Componentes e reutilização**: compartilhar primitives, formulários, estados, cabeçalho, navegação responsiva e apresentação de estados de solicitação. Componentes de domínio recebem dados tipados e não decidem autorização. Evitar componente único com condicionais extensas para três perfis; compor áreas e menus por perfil a partir de capacidades explícitas.

**Roteamento**: separar rotas públicas (`/`, `/acesso`, `/cadastro/...`) e áreas autenticadas (`/app/usuario/...`, `/app/tutor/...`, `/app/parceiro/...`). Um guard client-side melhora UX, mas cada endpoint deve revalidar sessão, papel, ownership e permissões. Redirecionamento não substitui autorização do servidor.

**Estado**:

- TanStack Query para dados remotos, invalidação e estados de carregamento/erro.
- Estado local React para interface transitória.
- Form state em React Hook Form.
- Não duplicar cache da API em store global nem guardar senha/token em estado persistente.
- Invalidar/refazer consultas de dados autorizados após revogação, mudança de sessão e alteração de perfil. A garantia de acesso é sempre do backend.

**Formulários e validação**: schemas Zod para feedback local e schemas equivalentes no servidor; validação de domínio autoritativa na API. Campos com label, required semântico, instrução e erro associado; preservar os valores válidos quando uma submissão falhar. CPF, telefone e e-mail com formatos normalizados no servidor; unicidade e tratamento de duplicidade dependem de CL-02/03.

**Erros e feedback**: traduzir Problem Details da API para linguagem compreensível. Mostrar estados explícitos de carregamento, vazio, sucesso, falha e confirmação. Nunca renderizar stack trace, mensagem do banco ou payload técnico. Tentativas de reenvio de criação devem evitar duplicidade usando chave de idempotência quando aplicável.

**Responsividade e acessibilidade**: mobile-first, uma coluna em formulários estreitos, navegação que não dependa de hover, foco visível, teclado integral, semântica HTML, nomes acessíveis, contraste e zoom. Alvos de toque e valores de contraste/tamanho serão fixados ao esclarecer CL-16. Testar a combinação formal de navegadores/AT após CL-17.

**Sessão**: cookie de sessão HttpOnly, Secure em produção, SameSite configurado de acordo com deployment, sessão rotacionada no login e invalidada no logout. Se sessão baseada em cookie for adotada, implementar proteção CSRF em mutações. Nunca persistir senha ou segredo de sessão em Web Storage. O método de login, verificação de canais e recuperação é gate CL-03.

### Backend

**Estilo**: API REST em Fastify, versionada `/api/v1`, monólito modular. Controllers HTTP são finos e delegam a casos de uso/serviços de domínio. Repositórios são introduzidos somente para encapsular consulta complexa ou limites de persistência relevantes; não criar camada genérica por tabela.

**Módulos**:

- `identity`: autenticação, sessão, credencial, verificação e recuperação (fluxos finais dependem de CL-03).
- `users`: perfil do Usuário, dados pessoais e autorizações de compartilhamento.
- `tutors`: perfil Tutor, solicitações de vínculo e gestão dos vínculos UserTutor.
- `partners`: perfil Parceiro, classificação Cuidador/Motorista e informações profissionais.
- `availability`: publicação e consulta de janelas de disponibilidade; regras finais dependem de CL-08.
- `caregiver-search`: pesquisa, filtros e visibilidade de perfis de Cuidador.
- `service-requests`: ciclo comum de solicitações, transições, política de acesso e histórico.
- `health`: compromissos e lembretes, sempre classificados como dados sensíveis.
- `notifications`: eventos e caixa de notificações; canal e destinatários dependem de CL-14.
- `audit`: gravação de eventos relevantes de segurança e autorização sem copiar conteúdo sensível.

**Fluxo de endpoint**: parse de parâmetros/body → autenticação → autorização por papel/ownership/consentimento → schema de entrada → caso de uso/transação → serialização allowlist → resposta. As verificações de autorização ocorrem no servidor para toda leitura e mutação, inclusive detalhe, listagem, notificações e rotas aninhadas.

**Validação**: schemas versionados junto ao módulo; normalização antes da persistência; validações no domínio para transições e compatibilidade. Restrições únicas, `NOT NULL`, FK e checks no banco como defesa adicional. Não assumir CPF válido como evidência de identidade civil.

**Erros**: resposta estável RFC 9457 Problem Details com `type`, `title`, `status`, `detail` seguro e `instance`; erros de validação podem conter códigos/campos, sem valores sensíveis. Mapear erro de domínio para status HTTP consistente. Erro inesperado gera 500 genérico e request ID; não é convertido em sucesso nem devolve detalhes internos.

**Logging**: Pino JSON com request ID, ação, resultado, perfil/ator interno e latência. Redigir CPF, e-mail, telefone, endereços, notas de saúde, tokens e corpos de formulários. `AuditLog` separado de logs operacionais, imutável pela API comum e sem armazenar credenciais/conteúdo clínico. Política de retenção de logs aguarda CL-19.

### Banco de dados

PostgreSQL relacional, UUID como chave primária, timestamps UTC (`timestamptz`), chaves estrangeiras e migrações versionadas. Usar enum/check para papéis e estados; adicionar índices pelos filtros e joins previstos. O desenho lógico detalhado está em [data-model.md](./data-model.md).

Princípios:

- `User` representa conta e identidade de autenticação; exatamente um papel por conta, coerente com a decisão de produto já confirmada.
- Perfis especializados separados para Usuário, Tutor e Parceiro.
- Relação `UserTutor` muitos-para-muitos com estado de consentimento e escopos associados por vínculo.
- `ServiceRequest` armazena estado e titular; extensões 1:1 guardam os campos específicos de cuidador e transporte.
- `HealthAppointment` é dado sensível e acessível por política específica; conteúdo mínimo até definição de campos.
- `Notification` guarda referência e mensagem mínima, nunca um espelho irrestrito de dados de saúde.
- `AuditLog` registra ator, ação, recurso e instante; não registra valores de campo sensíveis.
- Endereço e localização dependem da CL-11; área, compatibilidade e disponibilidade temporal dependem das CL-08/10.

### Contratos HTTP

Contratos REST iniciais propostos constam em [api-contracts.md](./api-contracts.md). Todos requerem HTTPS e validação server-side. Operações de criação/atualização autenticadas requerem sessão e autorização; endpoints públicos de catálogo expõem somente dados publicados. Não adicionar canal externo nem campos de domínio não aprovados.

## Estratégia de segurança

- **Identidade**: arquitetura de sessão server-side; fluxo de credenciais e verificações aguardam CL-03. Senhas, caso aprovadas, devem ser armazenadas com Argon2id e parâmetros mantidos em configuração segura; segredo nunca é registrado.
- **Sessão**: cookie HttpOnly/Secure/SameSite em produção, rotação de ID após autenticação, expiração e invalidação server-side; sem JWT de longa duração no `localStorage`. Cookies implicam CSRF tokens/validação de origem para mutações.
- **Autorização**: RBAC para capacidades gerais (Usuário/Tutor/Parceiro) combinado com ownership e ACL de vínculo. Negar por padrão. Cada rota verifica titular, estado do vínculo, permissão específica, tipo de parceiro e escopo da solicitação na mesma operação lógica.
- **Dados de saúde**: classificação de dados e políticas centralizadas no módulo de autorização; autorização em toda leitura/escrita e serialização por allowlist. Testes negativos de acesso horizontal e vertical são bloqueadores de release. Notificações e logs não replicam detalhes de saúde.
- **Acesso de Parceiro**: mostrar apenas as informações definidas para o estágio da solicitação quando CL-19 for respondida; nenhum payload de entidade completa deve ser serializado por conveniência.
- **Entrada e abuso**: validação em client/server, limites de tamanho e frequência configuráveis e respostas que não enumeram contas em login/recuperação; regras específicas dependem de CL-03 e escala.
- **Banco e transporte**: TLS entre browser/API e API/banco quando suportado pelo deployment; criptografia em repouso gerenciada pelo provedor. Segredos em secret manager/ambiente protegido, nunca em repositório.
- **Auditoria**: registrar consentimento, revogação, alterações de permissão, autenticação e transições críticas com IDs e timestamps, sem conteúdo sensível. Escopo e retenção finais aguardam CL-19.
- **Proteções operacionais**: CORS restrito à origem aprovada, headers de segurança, CSP, cookies seguros, dependências auditadas, migrações revisadas e menor privilégio nas credenciais de serviço.

## Plano de testes e qualidade

| Camada | Ferramenta proposta | Cobertura mínima |
|---|---|---|
| Unitário de domínio | Vitest | validação, permissões, transições de estado, compatibilidade, normalização e regras de cada caso de uso |
| Integração de API/DB | Vitest + PostgreSQL de teste | autenticação, autorização, transações, restrições, revogação, concorrência e serialização |
| Contrato/API | OpenAPI + cliente de teste Fastify/Supertest | schemas, códigos HTTP, Problem Details, paginação e respostas sem campos proibidos |
| Componentes | Testing Library + Vitest | formulários, mensagens, estados, navegação por teclado e reutilização dos componentes |
| E2E | Playwright | jornadas P1 por perfil, do cadastro à consulta/criação/acompanhamento, incluindo falha e acesso negado |
| Acessibilidade | axe-core + Playwright; revisão manual | páginas principais, formulários, diálogos, foco, teclado, rótulos, leitores de tela e zoom |
| Segurança | testes automatizados de autorização + revisão de dependências | IDOR, escalada de papel, acesso tutor sem consentimento, vazamento em notificações/logs e validação server-side |

**Gates de release**: lint, format check, typecheck, testes unitários, integração, build e E2E críticos aprovados; nenhuma falha conhecida em testes de autorização/privacidade; varredura automatizada de acessibilidade sem violações críticas nos fluxos cobertos. Metas formais WCAG e cobertura percentual precisam de aprovação em CL-16/20.

## DevOps e ambientes

**Ambientes**: local, CI isolado, staging e produção. Usar banco separado por ambiente e dados sintéticos em desenvolvimento/CI; não copiar dados reais de saúde para ambientes não produtivos.

**Variáveis**: validar configuração de inicialização com schema tipado. Exemplo de categorias, nomes finais a determinar:

- `DATABASE_URL`
- `SESSION_SECRET`/chave de sessão ou configuração do store
- `APP_ORIGIN`, `API_ORIGIN`, `CORS_ALLOWED_ORIGINS`
- `NODE_ENV`, nível de logging
- opções de migração e parâmetros não secretos.

Segredos não recebem valores padrão em produção; `.env.example` contém somente placeholders. Segredos de staging/produção devem vir do secret manager do provedor escolhido.

**Qualidade e CI**: GitHub Actions é recomendação condicionada à hospedagem do código no GitHub; se o repositório usar outro provedor, portar os mesmos gates. Pipeline em PR: instalação reproduzível com lockfile, lint, format check, TypeScript, testes unitários e de integração com PostgreSQL efêmero, build de frontend/API, E2E críticos e análise de dependências.

**CD**: gerar artefato/container imutável, promover o mesmo build de staging para produção, executar migração compatível antes da troca da aplicação e manter rollback operacional. Exigir aprovação manual para produção. Provedor, registry, estratégia de deploy, gestão de domínio, monitoramento e backup aguardam decisão; não incluir Terraform ou plataforma cloud específica neste MVP sem justificativa.

**Observabilidade**: logs estruturados e request IDs; métricas de disponibilidade/latência e erros sem dimensão ou valor pessoal; alertas e retenção conforme provider e SLO a esclarecer. Backups e teste de restauração são gate para ambiente com dados reais.

## Estrutura proposta do repositório

```text
cuida-facil/
├── apps/
│   ├── web/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   ├── routes/
│   │   │   ├── features/
│   │   │   │   ├── identity/
│   │   │   │   ├── users/
│   │   │   │   ├── tutors/
│   │   │   │   ├── partners/
│   │   │   │   ├── caregivers/
│   │   │   │   ├── transport/
│   │   │   │   ├── health/
│   │   │   │   ├── requests/
│   │   │   │   └── notifications/
│   │   │   ├── components/ui/
│   │   │   ├── components/layout/
│   │   │   ├── lib/api/
│   │   │   ├── lib/auth/
│   │   │   └── styles/
│   │   └── tests/
│   └── api/
│       ├── src/
│       │   ├── app/
│       │   ├── plugins/
│       │   ├── modules/
│       │   │   ├── identity/
│       │   │   ├── users/
│       │   │   ├── tutors/
│       │   │   ├── partners/
│       │   │   ├── availability/
│       │   │   ├── caregiver-search/
│       │   │   ├── service-requests/
│       │   │   ├── health/
│       │   │   ├── notifications/
│       │   │   └── audit/
│       │   └── shared/
│       └── tests/
├── packages/
│   ├── contracts/          # OpenAPI e tipos compartilhados gerados
│   └── config/             # configs compartilhadas de lint/TypeScript/testes
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── specs/
│   └── 001-cuida-facil/
└── .github/workflows/      # se GitHub for o host confirmado
```

**Estrutura decisória**: monorepo TypeScript com duas aplicações implantáveis e contratos/configuração compartilhados. Caso o repositório permaneça sem backend no MVP, criar a aplicação API somente após aprovação do escopo e das dependências; não simular autorização de produção apenas no frontend.

## Matriz de rastreabilidade

Endpoints são nomes de contrato propostos em [api-contracts.md](./api-contracts.md), relativos à base `/api/v1`, não contratos já aprovados para regras ainda abertas. `—` significa que a história é transversal e não exige endpoint exclusivo.

| User Story | Componente/módulo principal | Entidades | Endpoint(s) proposto(s) | Teste de aceite |
|---|---|---|---|---|
| US-01 Landing | `web/features/landing` | — | — (conteúdo estático no frontend) | Componente/E2E: mensagem, 3 áreas e ação principal |
| US-02 Escolher perfil | `web/features/identity` | User (na criação) | — (navegação client-side) | Componente/E2E: três opções apontam ao cadastro correto |
| US-03 Cadastro Usuário | `web/features/identity`, `api/modules/identity` | User, UserProfile | `POST /api/v1/registrations/users` | API: válidos, inválidos, duplicados e resposta segura |
| US-04 Completar perfil | `web/features/users`, `api/modules/users` | UserProfile | `GET/PATCH /api/v1/me/profile` | Integração: validação, persistência e acesso do titular |
| US-05 Cadastro/vínculo Tutor | `web/features/tutors`, `api/modules/tutors` | User, Tutor, UserTutor | `POST /registrations/tutors`, `POST /tutor-links`, `POST /tutor-links/{id}/decision` | API: pendente sem acesso; autorização habilita só vínculo correto |
| US-06 Permissões | `web/features/tutors`, `api/modules/users` | UserTutor, UserTutorPermission, AuditLog | `GET/PATCH /users/{id}/tutor-links/{linkId}/permissions` | Segurança: negar sem grant; revogar invalida acesso e notificação |
| US-07 Cadastro Parceiro | `web/features/partners`, `api/modules/partners` | User, Partner, CaregiverProfile, DriverProfile | `POST /registrations/partners`, `GET/PATCH /partners/me/profile` | API: schemas específicos por tipo e sem campos cruzados |
| US-08 Autenticação/autorização | `web/lib/auth`, `api/modules/identity` | User, AuthSession | `POST /auth/login`, `POST /auth/logout`, `GET /auth/session` | Integração: sessão, expiração, role guard e rota direta negada |
| US-09 Área Usuário | `web/routes/user`, `api/modules/users` | UserProfile, ServiceRequest, HealthAppointment, Notification | `GET /me/dashboard` | E2E: links e resumo sem vazamento |
| US-10 Buscar cuidadores | `web/features/caregivers`, `api/modules/caregiver-search` | Partner, CaregiverProfile, Availability | `GET /caregivers`, `GET /caregivers/{id}` | API/UI: pesquisa, filtro, vazio e somente perfil publicável |
| US-11 Solicitar Cuidador | `web/features/requests`, `api/modules/service-requests` | ServiceRequest, CaregiverRequest | `POST /caregiver-requests` | Integração: criação Pendente, validação e parceiro incompatível negado |
| US-12 Solicitar transporte | `web/features/transport`, `api/modules/service-requests` | ServiceRequest, TransportRequest, Availability | `GET /drivers/availability`, `POST /transport-requests` | API/E2E: campos, compatibilidade e ausência de motorista |
| US-13 Acompanhar/cancelar/histórico | `web/features/requests`, `api/modules/service-requests` | ServiceRequest, CaregiverRequest, TransportRequest, AuditLog | `GET /service-requests`, `GET /service-requests/{id}`, `POST /service-requests/{id}/cancel` | State-machine + integração: estados/transições permitidos e proibidos |
| US-14 Saúde e lembretes | `web/features/health`, `api/modules/health` | HealthAppointment, Notification, AuditLog | `GET/POST/PATCH /health/appointments` | Segurança: ACL health; domínio: CRUD e lembrete sem aconselhamento |
| US-15 Área Tutor | `web/routes/tutor`, `api/modules/tutors` | Tutor, UserTutor, UserProfile, ServiceRequest, HealthAppointment | `GET /tutor/links`, `GET /tutor/users/{id}/summary` | E2E/API: isolamento entre Usuários e escopo de cada vínculo |
| US-16 Área Parceiro | `web/routes/partner`, `api/modules/partners`, `service-requests` | Partner, Availability, ServiceRequest, AuditLog | `GET/PATCH /partners/me/availability`, `GET /partner/service-requests`, `POST /partner/service-requests/{id}/accept`, `POST /partner/service-requests/{id}/decline` | Integração: somente pedidos compatíveis, corrida no aceite e transições |
| US-17 Notificações | `web/features/notifications`, `api/modules/notifications` | Notification, UserTutor, ServiceRequest, HealthAppointment | `GET /notifications`, `POST /notifications/{id}/read` | Segurança: destinatário/escopo autorizado e nenhum detalhe sensível indevido |
| US-18 Perfil/configurações | `web/features/profile`, módulos users/tutors/partners | UserProfile, Tutor, Partner, UserTutorPermission | `GET/PATCH /me/profile`, endpoints de permissão | API/UI: alteração válida, inválida e isolamento de perfil |
| US-19 Acessibilidade/responsividade | `components/ui`, layouts e todas as features | — | — | axe + teclado + leitor de tela manual + Playwright em viewports acordados |

## Sequência de implementação

1. **Fechar decisões P0 de produto**: a elegibilidade de adultos 18+ em CL-04 está decidida, mas a representação assistida segue em aberto; decisões de cardinalidade e início/autorização em CL-06 também foram registradas. Responder CL-02/03/05/06/07/19 e finalizar representação assistida, revogação e granularidade antes de desenvolver ACL, identidade ou compartilhamento.
2. **Fundação e qualidade**: estrutura monorepo, TypeScript strict, lint/format, CI inicial, tokens semânticos provisórios, componentes acessíveis e schemas OpenAPI.
3. **Identidade e perfis**: sessões, cadastros, validação, guards e perfis; condicionado à CL-02/03/07.
4. **Vínculo e privacidade**: consentimento UserTutor, ACL por vínculo, auditoria e cenários negativos; condicionado à CL-06/19.
5. **Parceiros e disponibilidade**: formulários e publicação de perfis, critérios de verificação e calendário; condicionado à CL-07/08.
6. **Serviços do Usuário**: busca e pedidos de cuidador/transporte, estado e cancelamento; condicionado à CL-08/09/10/11/12.
7. **Compromissos e notificações**: registro de agenda e notificações seguras; condicionado à CL-06/13/14/19.
8. **Conformidade e lançamento**: E2E por perfil, testes de autorização, acessibilidade, performance acordada, backup/restore, staging e CD.

## Bloqueios de planejamento

- Os fluxos de login, recuperação, verificação e ativação dependem da CL-03.
- Compartilhamento de saúde e escopos de Tutor dependem das CL-06/19; destinatários e conteúdo de notificações dependem também da CL-14.
- Visibilidade de dados pessoais para Parceiros depende da CL-19.
- Endereços e localização dependem da CL-11.
- Descoberta e seleção de cuidadores dependem das CL-09/10; a possibilidade de múltiplos atendimentos simultâneos já está decidida. Não usar seleção direta como decisão.
- Seleção de motorista e matriz de compatibilidade dependem das CL-08/11.
- Disponibilidade depende da CL-08; cancelamento, recusa e transições dependem da CL-12.
- Verificação e documentos profissionais dependem da CL-07.
- Campos complementares dependem da CL-02/05/07; configurações de conta da CL-15.
- Política de retenção/privacidade depende da CL-15/19 em [clarifications.md](./clarifications.md).
- WCAG, suporte de dispositivos, SLO e corte do MVP dependem das CL-16/17/18/20; hospedagem segue sem provedor selecionado.

## Complexidade

| Item | Justificativa | Alternativa mais simples rejeitada porque |
|---|---|---|
| API backend separada da SPA | Autorização, dados sensíveis e regras de serviço devem ser validados no servidor | Somente frontend não protege dados nem atende validação backend |
| Monólito modular | Mantém separação por domínio sem custo de infraestrutura distribuída | Microserviços adicionariam deploy, rede e observabilidade desnecessários |
| Banco relacional + tabelas de associação/permissão | Integridade e vínculos muitos-para-muitos são centrais ao produto | JSON sem constraints dificulta autorização testável e referencial |
| Testes de API/DB além de unitários | Regras de consentimento e isolamento precisam ser verificadas ponta a ponta | Mock isolado não evidencia vazamento por joins ou rotas |
