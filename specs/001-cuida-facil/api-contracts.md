# Contratos de API Propostos — CuidaFácil

**Base**: `/api/v1`  
**Formato**: JSON, UTF-8.  
**Autenticação proposta**: sessão web segura. Definição final de credenciais e verificações aguarda CL-03.
**Estado**: rotas de planejamento; campos, regras e transições dependentes de produto não estão aprovados por este documento.

## Convenções

- API HTTPS; `Content-Type: application/json`.
- UUID opacos como identificadores públicos.
- Datas e instantes em ISO 8601; fuso e política de datas devem ser esclarecidos onde aplicável.
- Listagens usam `limit`/`cursor` após estratégia de paginação definida; não assumir ordenação além da explicitamente contratada.
- Respostas autenticadas são filtradas por identidade, papel, ownership, vínculo e permissões no servidor.
- DTOs de resposta são allowlists específicas por finalidade; nunca serializar modelos Prisma diretamente.
- Erros usam RFC 9457 Problem Details, incluindo request ID sem stack trace ou conteúdo sensível.
- Endpoints que criam pedido podem aceitar `Idempotency-Key` para evitar criação duplicada em repetição de rede.
- Todos os endpoints abaixo precisam de autenticação por padrão, exceto quando indicados como públicos. Operações públicas devem expor somente dados publicados.

## Identidade e cadastro

| Método e rota | Acesso | Propósito | Estado/observação |
|---|---|---|---|
| `POST /registrations/users` | Público, rate-limited | Criar conta e perfil inicial de Usuário | Campos dependem CL-02/05; ativação depende CL-03 |
| `POST /registrations/tutors` | Público, rate-limited | Criar conta de Tutor | Obrigatoriedade depende CL-02; ativação depende CL-03 |
| `POST /registrations/partners` | Público, rate-limited | Criar conta e tipo de Parceiro | Campos e aprovação dependem CL-07 |
| `POST /auth/login` | Público, rate-limited | Iniciar sessão | Método depende CL-03 |
| `POST /auth/logout` | Sessão | Invalidar a sessão atual | Proposta de sessão server-side |
| `GET /auth/session` | Sessão | Consultar identidade e papel da sessão atual | Não retorna credenciais |
| `POST /auth/recovery` | Público, rate-limited | Iniciar recuperação sem enumerar contas | Mecanismo e canal dependem CL-03 |
| `POST /auth/verification` | Público/autenticado conforme fluxo | Verificar canal de contato | Canal e momento dependem CL-03 |

## Perfil e configuração

| Método e rota | Acesso | Propósito | Política |
|---|---|---|---|
| `GET /me/profile` | Sessão | Consultar o próprio perfil | DTO conforme papel |
| `PATCH /me/profile` | Sessão | Atualizar campos permitidos do próprio perfil | Validar novamente no servidor |
| `GET /me/dashboard` | Usuário | Resumo da área inicial | Somente dados do titular |
| `GET /partners/me/profile` | Parceiro | Consultar perfil profissional próprio | Tipo restrito ao Parceiro |
| `PATCH /partners/me/profile` | Parceiro | Atualizar dados profissionais | Publicação/aprovação depende CL-07 |

## Vínculo Tutor–Usuário e permissões

| Método e rota | Acesso | Propósito | Política |
|---|---|---|---|
| `POST /tutor-links` | Usuário ou Tutor autenticado | Criar solicitação de vínculo | Qualquer dos participantes pode iniciar; par distinto |
| `GET /tutor-links` | Participante autenticado | Listar vínculos próprios e estado | Não expõe conteúdo do outro perfil além do necessário |
| `GET /tutor-links/{linkId}` | Participante da relação | Ver solicitante, estado e escopo pendente | Bloquear terceiros |
| `POST /tutor-links/{linkId}/decision` | Usuário titular da relação | Autorizar ou recusar em sessão autenticada | Exibir identidade solicitante e escopo antes de decisão |
| `DELETE /tutor-links/{linkId}` | Usuário titular; política final a confirmar | Revogar vínculo | CL-06 deve fixar efeitos e reconvite |
| `GET /users/{userId}/tutor-links/{linkId}/permissions` | Usuário titular e Tutor conforme grant | Consultar grants do vínculo | Sem permissão ativa, negar |
| `PUT /users/{userId}/tutor-links/{linkId}/permissions` | Usuário titular da relação | Substituir grants autorizados | Catálogo e granularidade dependem CL-06/19 |
| `GET /tutor/links` | Tutor | Listar Usuários com vínculo autorizado | Sem dados de Usuário sem grant |
| `GET /tutor/users/{userId}/summary` | Tutor autorizado | Consultar resumo autorizado | Cada campo filtrado por ACL |

## Descoberta e disponibilidade de Parceiros

| Método e rota | Acesso | Propósito | Política |
|---|---|---|---|
| `GET /caregivers` | Público/autenticado conforme política de publicação | Pesquisar cuidadores | Query e filtros dependem CL-09; visibilidade depende CL-07/19 |
| `GET /caregivers/{partnerId}` | Público/autenticado conforme publicação | Consultar perfil de Cuidador | Somente campos publicados |
| `GET /drivers/availability` | Usuário autenticado | Consultar candidatos para transporte | Compatibilidade e dados de localização dependem CL-08/11 |
| `GET /partners/me/availability` | Parceiro | Consultar disponibilidade própria | Tipo e fuso a esclarecer |
| `PUT /partners/me/availability` | Parceiro | Substituir ou configurar disponibilidade | Recorrência, bloqueios e reservas dependem CL-08 |

## Solicitações de serviço

| Método e rota | Acesso | Propósito | Política |
|---|---|---|---|
| `POST /caregiver-requests` | Usuário; Tutor somente se autorizado para essa ação | Criar pedido de Cuidador | Escolha/dados obrigatórios dependem CL-06/10 |
| `POST /transport-requests` | Usuário; Tutor somente se autorizado para essa ação | Criar pedido de transporte | Endereço/necessidades/compatibilidade dependem CL-08/11/19 |
| `GET /service-requests` | Participante autorizado | Listar solicitações do Usuário, Tutor autorizado ou Parceiro atribuído | Filtrar por identidade e tipo compatível |
| `GET /service-requests/{requestId}` | Solicitante/titular, Tutor autorizado ou Parceiro compatível | Consultar detalhes | Projeção por perfil e estágio CL-19 |
| `POST /partner/service-requests/{requestId}/accept` | Parceiro compatível e elegível | Aceitar pedido pendente | Transição atômica; revalidar disponibilidade; aprovação depende CL-07 |
| `POST /partner/service-requests/{requestId}/decline` | Parceiro compatível | Recusar pedido | Estado persistente/reencaminhamento dependem CL-12 |
| `POST /service-requests/{requestId}/cancel` | Solicitante/titular; Tutor somente se permitido | Cancelar solicitação | Permissões, prazo e estados dependem CL-12 |
| `POST /partner/service-requests/{requestId}/start` | Parceiro atribuído | Marcar serviço em andamento | Pré-condições a confirmar CL-12 |
| `POST /partner/service-requests/{requestId}/complete` | Parceiro atribuído | Concluir atendimento/viagem | Pré-condições e evidência a confirmar |
| `GET /service-requests/{requestId}/events` | Participante autorizado | Consultar histórico de transições | Redigir motivo e conteúdo conforme permissões |

Transições devem ser implementadas como casos de uso explícitos, atômicos e concorrentes de forma segura. Não permitir `PATCH status` genérico.

## Saúde e lembretes

| Método e rota | Acesso | Propósito | Política |
|---|---|---|---|
| `GET /health/appointments` | Usuário; Tutor com permissão explícita de saúde | Listar compromissos | Filtros próximos/histórico; resposta mínima |
| `POST /health/appointments` | Usuário; Tutor apenas se criação delegada for aprovada | Criar compromisso | Campos e categorias dependem CL-13 |
| `GET /health/appointments/{appointmentId}` | Usuário titular; Tutor com grant explícito | Consultar detalhe | Dado sensível, deny by default |
| `PATCH /health/appointments/{appointmentId}` | Usuário titular; Tutor se grant incluir edição | Atualizar compromisso | Campo editável depende CL-06/13/19 |
| `DELETE /health/appointments/{appointmentId}` | Usuário titular; Tutor se permitido | Remover/arquivar compromisso | Política de histórico/retenção depende CL-13/19 |

Não existe endpoint de diagnóstico, prescrição, classificação médica ou recomendação.

## Notificações e auditoria

| Método e rota | Acesso | Propósito | Política |
|---|---|---|---|
| `GET /notifications` | Destinatário autenticado | Consultar notificações | Filtrar por grants vigentes e conteúdo permitido |
| `POST /notifications/{notificationId}/read` | Destinatário | Marcar como lida | Aplicável se central interna for aprovada CL-14 |
| `GET /audit-events` | Operação administrativa restrita, não usuário comum | Auditoria | Escopo, retenção e papéis administrativos precisam definição |

## Contratos de entrada e saída

Schemas de request/response devem ser OpenAPI, validados no servidor e sincronizados com tipos do cliente. Campos mínimos de entrada conhecidos:

- Cadastros: `fullName`, `cpf`, `birthDate`, `phone`, `email`, tipo profissional para Parceiro; credenciais ainda dependem CL-03.
- Transporte: `origin`, `destination`, `scheduledAt`, `specialNeeds`; forma de endereço e detalhes finais dependem CL-11.
- Compromisso: categoria e dados temporais mínimos; campos finais dependem CL-13.
- Vínculo: identificação do participante alvo; mecanismo de identificação depende CL-06, autorização sempre depende decisão autenticada do Usuário.

Respostas de perfil de Tutor, Parceiro e Usuário usam projeções próprias. Não incluir campos internos como `credential_hash`, tokens, dados de outros vínculos, CPF sem finalidade aprovada ou notas de saúde em respostas genéricas.

## Respostas de erro

| HTTP | Uso |
|---|---|
| `400` | JSON/formato inválido ou query malformada |
| `401` | Sessão ausente/inválida |
| `403` | Papel, ownership, vínculo ou permissão insuficiente |
| `404` | Recurso inexistente ou não visível; evitar enumeração |
| `409` | Conflito de estado, duplicidade ou concorrência |
| `422` | Campos semanticamente inválidos |
| `429` | Limite de frequência |
| `500` | Falha inesperada com request ID e detalhe interno somente em log redigido |

Os códigos finais e mensagens públicas devem ser padronizados antes da implementação; nenhuma resposta revela stack trace, SQL, segredo ou existência de conta quando isso facilitar enumeração.
