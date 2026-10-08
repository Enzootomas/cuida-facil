# Pesquisa e decisões técnicas — CuidaFácil

**Data**: 2026-10-07  
**Escopo**: decisões técnicas para suportar [spec.md](./spec.md), sem substituir esclarecimentos de produto em [clarifications.md](./clarifications.md).

## Estado do repositório

- O workspace contém README curto e arquivos de configuração do Spec Kit.
- Não foi encontrada aplicação web, API, pacote frontend/backend ou banco existentes.
- Não foram encontradas as telas de referência mencionadas pela solicitação.
- A constituição exige acessibilidade, validação em frontend/backend, autorização por perfil, proteção de dados de saúde, testes críticos, rastreabilidade e consulta via `/speckit.clarify` para decisões de produto omitidas.

Consequência: o plano não presume compatibilidade com stack, dados ou serviço legado. A criação de aplicações e infraestrutura é proposta, ainda sujeita à confirmação do escopo final do MVP e do provedor de hospedagem.

## Decisões propostas e alternativas

### Aplicação: SPA e API no mesmo repositório

**Proposta**: monorepo simples com `apps/web` e `apps/api` e `packages/contracts`.

**Alternativas consideradas**:
- **Aplicação apenas frontend**: rejeitada, pois não consegue aplicar autorização confiável, validar dados no backend nem proteger informação sensível.
- **Frontend e backend em repositórios independentes**: não necessário no MVP e aumenta overhead para compartilhar contratos.
- **Monorepo com várias aplicações independentes por perfil**: rejeitado, pois os três perfis compartilham identidade, componentes e fluxos; a separação é de módulos e rotas.

### Frontend: React, TypeScript e Vite

**Proposta**: React com TypeScript strict e Vite.

**Justificativa**: adequada a SPA acessível e responsiva, permite componentes compartilhados e oferece separação por feature sem impor camada server-side adicional. React Router e TanStack Query atendem navegação e estado remoto. React Hook Form e Zod permitem feedback de formulário e schema coerente.

**Alternativas**:
- **Next.js**: capacidade server-side não requerida pelos requisitos atuais; introduziria decisões adicionais de renderização e hospedagem.
- **Vue/Svelte**: tecnicamente possíveis, mas a proposta escolhe uma stack convencional; não há evidência no workspace que exija outra.
- **Store global único**: rejeitado para evitar cópia divergente de dados remotos e excesso de estado central.

### Backend: Fastify e monólito modular

**Proposta**: API REST Fastify em TypeScript, com módulos de domínio em um único processo.

**Justificativa**: validação de schemas na fronteira HTTP, plugins para funções transversais e baixo overhead operacional. Controllers finos e casos de uso facilitam testes.

**Alternativas**:
- **Microserviços**: rejeitados para MVP sem escala independente ou equipes separadas demonstradas.
- **Express**: viável; Fastify foi escolhido como opção proposta por schemas/encapsulamento, sem requisito que impeça Express.
- **GraphQL**: não necessário para o conjunto atual; REST/OpenAPI simplifica contratos e autorização explícita por endpoint.

### Persistência: PostgreSQL e Prisma

**Proposta**: PostgreSQL com Prisma e migrações revisadas.

**Justificativa**: suporta relações muitos-para-muitos autorizadas, transações, FKs, constraints, consultas de histórico e perfis tipados. Prisma facilita migrações e tipos TS, sem substituir política de domínio.

**Alternativas**:
- **Documento/NoSQL**: rejeitado para o núcleo, pois consentimento, cardinalidade, integridade e estados transacionais são centrais.
- **ORM como política de autorização**: rejeitado; autorização é caso de uso do servidor.
- **Event sourcing**: rejeitado; uma tabela de eventos de transição e audit log atendem à rastreabilidade inicial sem reconstrução de estado.

### Sessão e credenciais

**Proposta técnica**: sessão server-side em cookie seguro, sem bearer token de longa duração em Web Storage; Argon2id se senha for escolhida.

**Alternativas**:
- **JWT persistido no localStorage**: rejeitado por exposição a XSS e dificuldade de revogação.
- **OAuth/SSO**: não escolhido sem provedor e experiência aprovados.
- **Senha por e-mail/telefone**: não presumido como requisito; CL-03 deve decidir método, ativação, verificação e recuperação.

Esta proposta é arquitetura recomendada, não resolução da pergunta de produto CL-03.

### UI, design e acessibilidade

**Proposta**: componentes próprios de domínio, CSS Modules e design tokens; sem biblioteca visual imposta.

**Justificativa**: não existem referências visuais no workspace e o usuário exige identidade acolhedora, baixo nível de complexidade e controles adequados a pessoas idosas. Começar por tokens e primitivas acessíveis mantém flexibilidade sem acoplar o produto a defaults incompatíveis.

**Alternativas**:
- **Framework visual completo de imediato**: não escolhido antes de revisar as telas de referência e comprovar acessibilidade dos componentes.
- **CSS livre sem tokens**: rejeitado por risco de inconsistência e dificuldade de evoluir contraste/tipografia.

Padrão WCAG e níveis quantitativos dependem de CL-16; a proposta de AA descrita na clarificação não é decisão aprovada.

### Testes e automação

**Proposta**: Vitest para lógica/componentes, Testing Library para comportamento acessível, testes de API com PostgreSQL, Playwright para jornadas e axe-core para verificações automatizadas.

**Justificativa**: combina feedback rápido de unidade com testes reais para autorização relacional e jornadas multirperfil. Nenhuma ferramenta substitui teste manual de leitor de tela.

### CI/CD e hosting

**Proposta**: pipeline independente de provedor que instala lockfile, verifica lint/types/tests/build e publica artefato imutável; GitHub Actions somente se GitHub for o host efetivo.

**Ainda não decidido**: host do repositório, provedor de API e Postgres, registry, secret manager, domínio, estratégia concreta de CD, alertas, backup e recuperação. O plano não introduz infraestrutura cloud específica nem Terraform sem requisitos.

## Decisões que não são técnicas

Escolha de cuidador/motorista, elegibilidade, consentimento e permissões, campos pessoais/saúde, endereço, documentos de parceiros, estados/cancelamento, canais de notificação, retenção, SLA e fronteira do MVP são decisões de produto. Permanecem em `/speckit.clarify`; alternativas sugeridas em [clarifications.md](./clarifications.md) não autorizam implementação.
