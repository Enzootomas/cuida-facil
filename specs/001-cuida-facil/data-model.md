# Modelo de Dados Proposto — CuidaFácil

**Status**: modelo lógico para planejamento; regras de produto marcadas como pendentes não são aprovadas por este documento.  
**Banco proposto**: PostgreSQL; IDs UUID; instantes em `timestamptz` UTC; nomes abaixo são lógicos, não migrações executáveis.

## Convenções

- Tabelas transacionais incluem `id`, `created_at`, `updated_at`; exclusão lógica só onde uma regra aprovada a exigir.
- FKs usam `ON DELETE RESTRICT` por padrão para não apagar histórico implicitamente. Política de exclusão/retenção aguarda CL-15/19.
- Dados pessoais não são duplicados em perfis profissionais ou snapshots, exceto quando uma decisão explícita requer histórico imutável.
- Endereço e localização dependem da CL-11; área e disponibilidade dependem da CL-08. Não assumir GPS, geocodificação, mapa ou recorrência.
- Colunas de saúde e de contato são sensíveis; consultas são mediadas pela API e não devem ser expostas via ORM serializado diretamente.

## Entidades

### `User`

Conta e identidade comum a exatamente um papel de produto.

| Campo | Tipo lógico | Regra |
|---|---|---|
| `id` | UUID PK | Gerado no servidor |
| `role` | enum `USER`, `TUTOR`, `PARTNER` | Obrigatório; único papel por conta |
| `full_name` | text | Obrigatório; normalização/validação server-side |
| `cpf` | text | Obrigatório conforme dados fornecidos; formato validado; unicidade depende de CL-02 |
| `birth_date` | date | Validada; elegibilidade 18+ confirmada para Usuário |
| `phone` | text | Validado; normalização e unicidade dependem de CL-02 |
| `email` | citext/text | Validado; normalização e unicidade dependem de CL-02 |
| `credential_hash` | text nullable | Hash forte quando autenticação por senha for aprovada; jamais senha em texto puro |
| `account_status` | enum | Estado operacional de conta; estados e ativação aguardam CL-03 |
| `created_at`, `updated_at` | timestamptz | Auditoria técnica |

**Índices**: PK; índice por `role`; índices únicos normalizados de CPF/e-mail/telefone somente após CL-02/03 definir identidade, duplicidade e verificação. Nunca indexar hash de senha para consulta.

### `UserProfile`

Dados adicionais específicos de Usuário, distintos dos dados comuns de conta.

| Campo | Tipo lógico | Regra |
|---|---|---|
| `user_id` | UUID PK/FK → `User.id` | Um perfil por conta com papel `USER` |
| `profile_data` | campos tipados adicionados após CL-05 | Não criar coleta genérica sem finalidade aprovada |
| `created_at`, `updated_at` | timestamptz | — |

**Integridade**: papel do `User` deve ser `USER`; validar no caso de uso e, se possível, com trigger/constraint de domínio ou separar as tabelas por conta tipada.

### `Tutor`

Perfil tipado de Tutor.

| Campo | Tipo lógico | Regra |
|---|---|---|
| `user_id` | UUID PK/FK → `User.id` | Um por conta `TUTOR` |
| `created_at`, `updated_at` | timestamptz | — |

### `Partner`

Perfil profissional de Parceiro.

| Campo | Tipo lógico | Regra |
|---|---|---|
| `user_id` | UUID PK/FK → `User.id` | Um por conta `PARTNER` |
| `service_type` | enum `CAREGIVER`, `DRIVER` | Tipo único por conta conforme requisito atual |
| `professional_info` | campos tipados a definir | Detalhes aguardam CL-07 |
| `publication_status` | enum | Aprovação/publicação aguardam CL-07 |
| `created_at`, `updated_at` | timestamptz | — |

Índice por `service_type, publication_status`; não apresentar parceiro como aprovado sem regra e verificação definidas.

### `CaregiverProfile`

Extensão de `Partner` para atuação como cuidador.

| Campo | Tipo lógico | Regra |
|---|---|---|
| `partner_id` | UUID PK/FK → `Partner.user_id` | Um por Parceiro Cuidador |
| `experience` | text/structured | Campo e comprovação aguardam CL-07 |
| `specialties` | relação/códigos ou text | Taxonomia aguarda CL-07 |
| `service_area` | campos estruturados | Formato/localização aguardam CL-08/11 |
| `professional_info` | campos tipados | Não aceitar documentos não definidos |

### `DriverProfile`

Extensão de `Partner` para atuação como motorista.

| Campo | Tipo lógico | Regra |
|---|---|---|
| `partner_id` | UUID PK/FK → `Partner.user_id` | Um por Parceiro Motorista |
| `service_category` | enum/text | Categoria aguarda CL-07 |
| `transport_capabilities` | relação/códigos | Características e verificações aguardam CL-07/08/11 |
| `service_area` | campos estruturados | Formato/localização aguardam CL-08/11 |
| `professional_info` | campos tipados | Dados de habilitação/veículo aguardam CL-07 |

**Regra de consistência**: exatamente uma extensão ativa correspondente a `Partner.service_type`; manter por transação e validar na camada de domínio.

### `UserTutor`

Vínculo muitos-para-muitos entre um Usuário e um Tutor, com estado de autorização. Cada pessoa mantém um único papel, mas um Tutor pode vincular vários Usuários e um Usuário pode vincular vários Tutores.

| Campo | Tipo lógico | Regra |
|---|---|---|
| `id` | UUID PK | — |
| `user_id` | UUID FK → `User.id` | Conta papel `USER` |
| `tutor_id` | UUID FK → `User.id` | Conta papel `TUTOR` |
| `initiated_by` | UUID FK → `User.id` | Deve ser um dos participantes |
| `status` | enum `PENDING`, `AUTHORIZED`, `REJECTED`, `REVOKED` | `AUTHORIZED` apenas após decisão autenticada do Usuário |
| `authorized_at`, `revoked_at` | timestamptz nullable | Definidos apenas na transição correspondente |
| `created_at`, `updated_at` | timestamptz | — |

**Restrições/índices**: `UNIQUE(user_id, tutor_id)` para vínculo corrente; índice `(tutor_id, status)` e `(user_id, status)`. Estratégia para permitir novo convite após rejeição/revogação deve ser confirmada na implementação de CL-06.

### `UserTutorPermission`

Permissão por vínculo, proposta para não codificar ACL dentro de JSON.

| Campo | Tipo lógico | Regra |
|---|---|---|
| `user_tutor_id` | UUID FK → `UserTutor.id` | — |
| `permission_code` | enum/text controlado | Categorias aguardam CL-06/19 |
| `granted_at` | timestamptz | — |
| `revoked_at` | timestamptz nullable | Revogação impede consultas seguintes |
| `granted_by_user_id` | UUID FK → `User.id` | Deve ser titular do vínculo |

PK composta proposta: `(user_tutor_id, permission_code)`. Sem permissão ativa, acesso negado. Grãos e granularidade são bloqueados por CL-06/19.

### `Availability`

Janelas/declarações de disponibilidade de Parceiro.

| Campo | Tipo lógico | Regra |
|---|---|---|
| `id` | UUID PK | — |
| `partner_id` | UUID FK → `Partner.user_id` | — |
| `starts_at`, `ends_at` | timestamptz nullable | Forma temporal a confirmar; se intervalo, `starts_at < ends_at` |
| `service_area_ref` | referência/campos tipados nullable | Modelo de área aguarda CL-08/11 |
| `status` | enum/text | Estado de publicação a decidir |
| `created_at`, `updated_at` | timestamptz | — |

Índices propostos: `(partner_id, starts_at, ends_at)` e `(status, starts_at)`. Recorrência, fuso, pausas, bloqueios e reservas dependem da CL-08; não implementar como regra inferida.

### `ServiceRequest`

Raiz de uma solicitação comum a cuidador e transporte.

| Campo | Tipo lógico | Regra |
|---|---|---|
| `id` | UUID PK | — |
| `requester_user_id` | UUID FK → `User.id` | Titular Usuário |
| `created_by_user_id` | UUID FK → `User.id` | Usuário titular ou Tutor autorizado, caso o produto aprove essa operação |
| `service_type` | enum `CAREGIVER`, `TRANSPORT` | Discriminador |
| `assigned_partner_id` | UUID FK → `Partner.user_id` nullable | Só parceiro compatível; escolha/atribuição aguardam CL-08/10/11 |
| `status` | enum `PENDING`, `ACCEPTED`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED` | `DECLINED`/reencaminhamento aguardam CL-12 |
| `requested_at`, `accepted_at`, `started_at`, `completed_at`, `cancelled_at` | timestamptz nullable | Coerentes com transições validadas |
| `created_at`, `updated_at` | timestamptz | — |

Índices: `(requester_user_id, status, created_at DESC)`, `(assigned_partner_id, status, created_at DESC)`, `(service_type, status)`. Acesso do Tutor exige vínculo e permissões; acesso do Parceiro exige atribuição/compatibilidade.

### `CaregiverRequest`

Detalhes de solicitação de cuidador; relação 1:1 com `ServiceRequest`.

| Campo | Tipo lógico | Regra |
|---|---|---|
| `service_request_id` | UUID PK/FK → `ServiceRequest.id` | `service_type=CAREGIVER` |
| `scheduled_start`, `scheduled_end` | timestamptz nullable | Necessidade temporal aguarda CL-10 |
| `service_location` | campos tipados nullable | Endereço/localização aguarda CL-05/11 |
| `request_details` | text nullable | Não coletar saúde além do necessário; conteúdo aguarda CL-05/10/19 |

### `TransportRequest`

Detalhes de solicitação de transporte; relação 1:1 com `ServiceRequest`.

| Campo | Tipo lógico | Regra |
|---|---|---|
| `service_request_id` | UUID PK/FK → `ServiceRequest.id` | `service_type=TRANSPORT` |
| `origin` | estrutura tipada | Endereço/mapa/GPS aguarda CL-11 |
| `destination` | estrutura tipada | Endereço/mapa/GPS aguarda CL-11 |
| `scheduled_at` | timestamptz | Validação de data/horário e fuso aguardam CL-11 |
| `special_needs` | campos tipados sensíveis | Taxonomia, necessidade e acesso aguardam CL-08/11/19 |
| `companion_count` | nullable | Não adicionar até decidir necessidade de acompanhante em CL-11 |

### `ServiceRequestEvent`

Trilha de transições de estado para histórico confiável.

| Campo | Tipo lógico | Regra |
|---|---|---|
| `id` | UUID PK | — |
| `service_request_id` | UUID FK → `ServiceRequest.id` | — |
| `actor_user_id` | UUID FK → `User.id` nullable | Sistema pode ser ator |
| `from_status`, `to_status` | enum | Transição autorizada no domínio |
| `occurred_at` | timestamptz | — |
| `reason_code` | text nullable | Justificativas e divulgação aguardam CL-12 |

Índice `(service_request_id, occurred_at)`. Evitar cópia livre de dados pessoais em `reason_code`.

### `HealthAppointment`

Compromisso de organização; todo acesso é classificado como dado de saúde sensível.

| Campo | Tipo lógico | Regra |
|---|---|---|
| `id` | UUID PK | — |
| `user_id` | UUID FK → `User.id` | Titular Usuário |
| `category` | enum/text controlado | Consulta, exame, compromisso, acompanhamento ou lembrete; detalhamento CL-13 |
| `title` | text | Conteúdo potencialmente sensível; campos finais CL-13 |
| `starts_at` | timestamptz | — |
| `ends_at` | timestamptz nullable | — |
| `notes` | text nullable | Não habilitar até esclarecer finalidade, campos e proteção |
| `reminder_at` | timestamptz nullable | Temporização/canal aguardam CL-13/14 |
| `created_at`, `updated_at` | timestamptz | — |

Índices: `(user_id, starts_at)` e `(user_id, category, starts_at)`. Nenhum acesso por Tutor sem permissão explícita de saúde; nenhuma consulta por parceiro prevista no escopo atual.

### `Notification`

Notificação em produto, sujeita a decisão de canal/destinatário.

| Campo | Tipo lógico | Regra |
|---|---|---|
| `id` | UUID PK | — |
| `recipient_user_id` | UUID FK → `User.id` | Destinatário autorizado |
| `event_type` | enum/text controlado | Eventos listados na especificação |
| `resource_type`, `resource_id` | enum + UUID nullable | Referência, não espelho da entidade |
| `safe_summary` | text | Conteúdo mínimo; nunca detalhamento sensível não autorizado |
| `read_at` | timestamptz nullable | Leitura em canal interno, se aprovada |
| `created_at` | timestamptz | — |

Índice `(recipient_user_id, read_at, created_at DESC)`. E-mail/SMS/push e preferências não fazem parte do modelo inicial sem CL-14.

### `AuditLog`

Registro append-only para eventos de segurança e mudanças sensíveis.

| Campo | Tipo lógico | Regra |
|---|---|---|
| `id` | UUID PK | — |
| `actor_user_id` | UUID FK → `User.id` nullable | `NULL` para processo interno |
| `action` | enum/text controlado | Consentimento, permissão, acesso negado, autenticação e transição crítica |
| `resource_type`, `resource_id` | enum + UUID nullable | Referência, sem cópia do conteúdo |
| `request_id` | text nullable | Correlação operacional |
| `occurred_at` | timestamptz | Imutável |
| `metadata_safe` | JSONB nullable | Allowlist; nunca senha, token, CPF, endereço ou notas de saúde |

Índices `(actor_user_id, occurred_at DESC)`, `(resource_type, resource_id, occurred_at DESC)` e `(action, occurred_at DESC)`. Retenção e acesso administrativo aguardam CL-19.

### Suporte de sessão e credenciais

- `AuthSession`: sessão server-side revogável, referência à conta, hash/identificador não reutilizável do segredo, expiração, criação e revogação. Necessário se a decisão de CL-03 aprovar sessão server-side.
- `VerificationToken` / `PasswordResetToken`: tokens de uso único armazenados em forma derivada, com validade e consumo; criar apenas para os canais e fluxos aprovados em CL-03.

## Integridade e transações

1. Toda referência de perfil verifica que `User.role` corresponde ao perfil especializado.
2. `UserTutor` só fica `AUTHORIZED` por decisão do Usuário autenticado da relação; autorização e mudança de estado gravam `AuditLog` na mesma transação.
3. Permissão ativa é a combinação de vínculo `AUTHORIZED` e grant específico não revogado; não se inferem permissões por ausência de configuração.
4. Criar solicitação e primeiro `ServiceRequestEvent` é uma única transação.
5. Aceitar, recusar, iniciar, concluir ou cancelar uma solicitação é transição condicional e transacional; transições válidas dependem da CL-12.
6. Criar extensões de serviço e raiz `ServiceRequest` é atômico; discriminador e extensão devem coincidir.
7. Não remover cascata de `User`, solicitações, compromissos ou auditoria antes de definir retenção e exclusão.
8. Índices únicos de dados pessoais dependem da decisão sobre unicidade, canais compartilhados e verificação (CL-02/03).

## Índices de autorização e consulta

- `User(role, account_status)` para roteamento e administração restrita.
- `UserTutor(user_id, status)` e `UserTutor(tutor_id, status)` para consulta dos dois lados.
- `UserTutorPermission(user_tutor_id, permission_code, revoked_at)` para autorização específica.
- `Partner(service_type, publication_status)` e `Availability(partner_id, starts_at, ends_at)` para descoberta compatível.
- `ServiceRequest(requester_user_id, status, created_at)` e `(assigned_partner_id, status, created_at)` para áreas de Usuário/Parceiro.
- `HealthAppointment(user_id, starts_at)` para próximos compromissos e histórico.
- `Notification(recipient_user_id, read_at, created_at)` para caixa de entrada.
- `AuditLog(resource_type, resource_id, occurred_at)` para trilha correlacionada.

Índices espaciais, full text, particionamento e cache não entram no MVP sem necessidades mensuráveis e decisões de localização/desempenho.
