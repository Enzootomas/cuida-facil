# Backlog de Implementação: CuidaFácil

**Spec**: [spec.md](./spec.md)  
**Plano**: [plan.md](./plan.md)  
**Modelo de dados**: [data-model.md](./data-model.md)  
**Contratos**: [api-contracts.md](./api-contracts.md)  
**Esclarecimentos**: [clarifications.md](./clarifications.md)

**Total**: 89 tarefas independentes.  
**Convenção**: cada tarefa abaixo foi escrita como card de issue. “Concluído quando” define critérios observáveis; `—` significa que não há dependência anterior. IDs `US-xx` apontam para histórias em `spec.md`. Dependências entre tarefas não substituem os bloqueios de produto indicados por `CL-xx`.

## 1. Fundação do projeto

- [ ] **T001** Criar workspace npm e estrutura inicial do monorepo conforme `plan.md`. **US relacionada**: transversal. **Dependências**: —. **Concluído quando**: `apps/web`, `apps/api`, `packages/contracts`, `packages/config`, `prisma` e `specs` existem; um lockfile único é gerado; instalação limpa funciona.
- [ ] **T002** Configurar TypeScript strict, lint e formatação compartilhados. **US relacionada**: transversal. **Dependências**: T001. **Concluído quando**: os pacotes compartilham configuração versionada; scripts de lint, format check e typecheck executam localmente e falham com erro de exemplo.
- [ ] **T003** Preparar scaffold da API e integração local com PostgreSQL/Prisma. **US relacionada**: transversal. **Dependências**: T001, T002. **Concluído quando**: API Fastify inicia com health check, Prisma conecta ao PostgreSQL local, migração inicial pode ser aplicada e nenhuma credencial real é versionada.

## 2. Design system

- [ ] **T004** Resolver a disponibilidade e o conteúdo normativo das referências visuais (CL-01). **US relacionada**: US-01, US-02, US-19. **Dependências**: —. **Concluído quando**: resposta e referências aprovadas são registradas em `clarifications.md` e os limites visuais correspondentes são atualizados em `spec.md`; se não houver telas, isso é registrado como decisão.
- [ ] **T005** Implementar tokens visuais e primitives acessíveis reutilizáveis. **US relacionada**: US-01, US-02, US-19. **Dependências**: T004. **Concluído quando**: existem tokens semânticos para cores, tipografia, espaçamento e foco; botão, campo, alerta, carregamento, estado vazio e status têm API tipada, foco visível e estados sem depender só de cor.

## 3. Landing page

- [ ] **T006** Implementar a landing page CuidaFácil com CTA. **US relacionada**: US-01. **Dependências**: T005. **Concluído quando**: a rota pública apresenta marca, mensagem literal, descrições das três áreas e botão “Começar Agora”; o CTA navega à escolha de perfil e funciona por teclado.

## 4. Seleção de perfil

- [ ] **T007** Implementar tela de escolha e encaminhamento dos três perfis. **US relacionada**: US-02. **Dependências**: T005, T006. **Concluído quando**: pergunta e textos das três opções correspondem à especificação; cada opção abre seu cadastro; controles têm nome acessível e foco visível.

## 5. Cadastro de Usuário

- [ ] **T008** Definir obrigatoriedade, unicidade e duplicidade dos dados de cadastro (CL-02). **US relacionada**: US-03, US-05, US-07. **Dependências**: —. **Concluído quando**: obrigatoriedade e regras para CPF, e-mail e telefone de cada perfil são registradas em `clarifications.md` e aplicadas à tabela de campos de `spec.md`.
- [ ] **T009** Criar entidade persistente `User` e migração inicial. **US relacionada**: US-03, US-05, US-07, US-08. **Dependências**: T003, T008. **Concluído quando**: `User` contém apenas campos comuns de identidade/conta definidos em `data-model.md`; papéis são limitados aos três valores; constraints e índices refletem CL-02/03; migração aplica e reverte em banco de teste.
- [ ] **T010** Criar entidade `UserProfile` e relação com `User`. **US relacionada**: US-03, US-04. **Dependências**: T009. **Concluído quando**: perfil tem chave estrangeira única para conta Usuário; campos adicionais só são incluídos após decisão CL-05; testes de integridade impedem perfil de papel incompatível.
- [ ] **T011** Implementar endpoint de cadastro de Usuário e validação server-side. **US relacionada**: US-03. **Dependências**: T009, T010, T023, T025. **Concluído quando**: rota aceita somente campos aprovados em CL-02/03, valida e normaliza dados no backend, persiste atomicamente e devolve erros de campo sem detalhes internos.
- [ ] **T012** Implementar formulário de cadastro de Usuário. **US relacionada**: US-03. **Dependências**: T005, T008, T011. **Concluído quando**: formulário apresenta nome completo, CPF, nascimento, telefone e e-mail, indica obrigatoriedade conforme CL-02, valida e associa erros aos campos; sucesso prossegue no fluxo aprovado.

## 6. Cadastro de Tutor

- [ ] **T013** Criar entidade persistente `Tutor` ligada a uma conta. **US relacionada**: US-05. **Dependências**: T003, T009. **Concluído quando**: `Tutor.user_id` é PK/FK e a camada de domínio rejeita qualquer conta cujo papel não seja Tutor; migração e testes de integridade passam.
- [ ] **T014** Implementar endpoint e schema de cadastro de Tutor. **US relacionada**: US-05. **Dependências**: T013, T023, T025. **Concluído quando**: aceita somente campos aprovados, valida dados no servidor e cria conta/perfil em transação; falhas não produzem cadastro parcial.
- [ ] **T015** Implementar formulário de cadastro de Tutor. **US relacionada**: US-05. **Dependências**: T005, T008, T014. **Concluído quando**: apresenta os cinco dados pessoais especificados, obrigatoriedade decidida em CL-02, erros compreensíveis e confirmação de resultado.

## 7. Cadastro de Parceiro

- [ ] **T016** Definir campos, documentação, verificação e aprovação de Parceiro (CL-07). **US relacionada**: US-07, US-16. **Dependências**: —. **Concluído quando**: campos de Cuidador/Motorista, documentos eventualmente exigidos, verificação, publicação e aprovação manual estão decididos e registrados em `spec.md`/`clarifications.md`.
- [ ] **T017** Criar entidade persistente `Partner`. **US relacionada**: US-07, US-16. **Dependências**: T003, T009, T016. **Concluído quando**: há relação 1:1 com `User`, tipo de atuação e estado de publicação aprovados em CL-07; constraints impedem tipo inválido.
- [ ] **T018** Criar entidade persistente `CaregiverProfile`. **US relacionada**: US-07, US-10. **Dependências**: T017. **Concluído quando**: perfil 1:1 contém somente campos de cuidador aprovados em CL-07; FK, unicidade e regra de tipo Parceiro têm testes.
- [ ] **T019** Criar entidade persistente `DriverProfile`. **US relacionada**: US-07, US-12. **Dependências**: T017. **Concluído quando**: perfil 1:1 contém somente campos de motorista aprovados em CL-07; campos de habilitação/documentos só existem se aprovados; integridade do tipo tem teste.
- [ ] **T020** Implementar endpoint de cadastro de Parceiro por tipo de atuação. **US relacionada**: US-07. **Dependências**: T016, T017, T018, T019, T023, T025. **Concluído quando**: cadastro cria extensão correta atomicamente, valida schemas distintos e não publica nem marca verificação não aprovada.
- [ ] **T021** Implementar formulário de cadastro de Parceiro. **US relacionada**: US-07. **Dependências**: T005, T016, T020. **Concluído quando**: oferece seleção Cuidador/Motorista e campos profissionais correspondentes; mudança de tipo não deixa dados cruzados; obrigatoriedade e aprovação seguem CL-07.

## 8. Autenticação

- [ ] **T022** Decidir método de autenticação, ativação, verificação e recuperação de acesso (CL-03). **US relacionada**: US-03, US-05, US-07, US-08. **Dependências**: —. **Concluído quando**: método de login, credenciais, verificação de e-mail/telefone, ativação e recuperação são registrados em `spec.md` e `clarifications.md`, sem deixar comportamento implícito.
- [ ] **T023** Criar entidade de sessão autenticada `AuthSession`. **US relacionada**: US-08. **Dependências**: T003, T022. **Concluído quando**: sessão é revogável, expira conforme decisão e não persiste token de sessão em texto puro; migração e testes de expiração/revogação passam.
- [ ] **T024** Implementar endpoints de login, consulta de sessão e logout. **US relacionada**: US-08. **Dependências**: T022, T023, T009. **Concluído quando**: método aprovado em CL-03 é implementado; login rotaciona sessão, logout a invalida, erros não enumeram contas e respostas não incluem credenciais.
- [ ] **T025** Implementar interface de login e bootstrap de sessão. **US relacionada**: US-08. **Dependências**: T005, T022, T024. **Concluído quando**: login e estado autenticado consomem API, mostram carregamento/erro/sucesso e encaminham ao espaço do único papel da conta sem guardar segredo no Web Storage.
- [ ] **T026** Implementar endpoints de verificação de canal e recuperação de acesso. **US relacionada**: US-08. **Dependências**: T022, T023, T024. **Concluído quando**: fluxos e canais seguem CL-03, tokens são de uso único e expirados, respostas não enumeram contas e eventos são auditáveis sem registrar tokens.
- [ ] **T027** Implementar telas de verificação e recuperação de acesso. **US relacionada**: US-08. **Dependências**: T005, T026. **Concluído quando**: telas seguem o método aprovado, explicam estados de envio/erro/conclusão e permitem concluir ou reiniciar o fluxo sem revelar se uma conta existe.

## 9. Autorização

- [ ] **T028** Definir representação assistida de Usuário adulto que não consegue consentir sozinho (CL-04). **US relacionada**: US-05, US-06, US-15. **Dependências**: —. **Concluído quando**: representação permitida, comprovação, limites e fluxo de consentimento ficam documentados; nenhum Tutor é tratado como representante automaticamente.
- [ ] **T029** Esclarecer identificação, estados, expiração, rejeição, reconvite e revogação de vínculo e granularidade de permissões (CL-06). **US relacionada**: US-05, US-06, US-15. **Dependências**: —. **Concluído quando**: todas as questões abertas da CL-06 têm respostas registradas e a especificação define estados, efeito de revogação e catálogo de permissões.
- [ ] **T030** Definir minimização, dados visíveis a Parceiro/Tutor, saúde, notificações e retenção (CL-19). **US relacionada**: US-06, US-14, US-15, US-16, US-17. **Dependências**: T029. **Concluído quando**: matriz de dados × perfil × etapa × finalidade e política de retenção/auditoria estão registradas; acesso não autorizado continua negado por padrão.
- [ ] **T031** Criar entidade `UserTutor` para solicitações e vínculos muitos-para-muitos. **US relacionada**: US-05, US-06, US-15. **Dependências**: T003, T013, T028, T029. **Concluído quando**: armazena participantes, iniciador, estado e timestamps aprovados; impede duplicidade de vínculo corrente; decisões são limitadas ao Usuário daquela relação.
- [ ] **T032** Criar entidade `UserTutorPermission` para grants por vínculo. **US relacionada**: US-06, US-15. **Dependências**: T031, T029, T030. **Concluído quando**: catálogo de permissões deriva de CL-06/19, grants podem ser revogados sem apagar trilha e ausência de grant não concede acesso.
- [ ] **T033** Implementar serviço de autorização por papel, titularidade e vínculo. **US relacionada**: US-06, US-08, US-15, US-16. **Dependências**: T024, T031, T032. **Concluído quando**: policy checks centralizados negam por padrão, verificam papel/ownership/consentimento/grant e têm testes negativos para acesso horizontal e vertical.
- [ ] **T034** Implementar API para solicitar, listar, decidir e revogar vínculos Tutor–Usuário. **US relacionada**: US-05, US-06. **Dependências**: T029, T031, T033. **Concluído quando**: Usuário ou Tutor podem iniciar; decisão ocorre pelo Usuário autenticado após exibir solicitante/escopo; nenhuma leitura é permitida antes do aceite; todas as transições são auditadas.
- [ ] **T035** Implementar interface de vínculo e gestão de permissões do Tutor. **US relacionada**: US-05, US-06, US-15. **Dependências**: T005, T029, T030, T034. **Concluído quando**: participantes consultam pedidos/estados; Usuário concede/revoga permissões por Tutor; confirmação e escopo são explícitos; dados não autorizados não aparecem.

## 10. Perfil do Usuário

- [ ] **T036** Definir dados complementares necessários ao Usuário por serviço (CL-05). **US relacionada**: US-04, US-11, US-12. **Dependências**: —. **Concluído quando**: campos, finalidade, obrigatoriedade e etapa de coleta são documentados; endereço residencial não é exigido sem justificativa aprovada.
- [ ] **T037** Implementar consulta e atualização da API de perfil do Usuário. **US relacionada**: US-04, US-18. **Dependências**: T010, T030, T036. **Concluído quando**: API valida campos aprovados, atualiza apenas o perfil titular, aplica autorização no servidor e confirma persistência.
- [ ] **T038** Implementar tela de perfil e complementação de dados do Usuário. **US relacionada**: US-04, US-18. **Dependências**: T005, T036, T037. **Concluído quando**: mostra apenas dados aprovados, informa campos pendentes com clareza e apresenta erros/sucesso sem perder entradas válidas.

## 11. Área do Tutor

- [ ] **T039** Implementar API de usuários vinculados e resumo autorizado do Tutor. **US relacionada**: US-15. **Dependências**: T033, T034, T035. **Concluído quando**: lista apenas vínculos autorizados e cada campo do resumo respeita grants vigentes, inclusive após revogação.
- [ ] **T040** Implementar área inicial do Tutor e seletor de Usuário acompanhado. **US relacionada**: US-15. **Dependências**: T005, T035, T039. **Concluído quando**: Usuários são selecionáveis e identificados sem mistura de dados; solicitações/compromissos ausentes de permissão não são renderizados.

## 12. Área do Parceiro

- [ ] **T041** Definir modelo e regras de disponibilidade, área, compatibilidade e conflitos (CL-08). **US relacionada**: US-10, US-12, US-16. **Dependências**: T016. **Concluído quando**: formato de janelas/área, fuso, antecedência, capacidade e prevenção de conflitos são decididos e registrados sem pressupor recorrência.
- [ ] **T042** Criar entidade persistente `Availability`. **US relacionada**: US-10, US-12, US-16. **Dependências**: T003, T017, T041. **Concluído quando**: schema e constraints implementam CL-08, indexam Parceiro/intervalo e testes cobrem intervalo inválido e sobreposição conforme a regra aprovada.
- [ ] **T043** Implementar API de consulta e atualização de disponibilidade do Parceiro. **US relacionada**: US-16. **Dependências**: T041, T042, T033. **Concluído quando**: somente Parceiro atualiza a própria disponibilidade; API valida janelas/área aprovadas e evita conflitos definidos em CL-08.
- [ ] **T044** Implementar área do Parceiro e formulário de disponibilidade. **US relacionada**: US-16. **Dependências**: T005, T021, T043. **Concluído quando**: Parceiro vê perfil, serviços agendados e disponibilidade; altera dados permitidos e recebe feedback claro.

## 13. Cuidadores

- [ ] **T045** Definir campos de pesquisa, filtros, ordenação e apresentação de indisponíveis (CL-09). **US relacionada**: US-10. **Dependências**: T016. **Concluído quando**: campos/filtros e ordenação estão documentados; nenhum critério de ranking não aprovado é introduzido.
- [ ] **T046** Decidir escolha/atribuição do Cuidador e campos do pedido (CL-10). **US relacionada**: US-10, US-11. **Dependências**: T041, T045. **Concluído quando**: escolha direta, correspondência ou atribuição; dados obrigatórios, duração/local e confirmação são definidos e registrados; respeita decisão de múltiplos atendimentos ativos simultâneos.
- [ ] **T047** Criar entidade persistente `CaregiverRequest`. **US relacionada**: US-11, US-13. **Dependências**: T003, T010, T016, T046. **Concluído quando**: extensão 1:1 referencia solicitação raiz e contém apenas campos aprovados em CL-10; integridade do tipo é testada.
- [ ] **T048** Implementar API de busca e consulta de perfis de Cuidador. **US relacionada**: US-10. **Dependências**: T018, T020, T041, T045, T030. **Concluído quando**: pesquisa/filtros aprovados funcionam, retornam apenas perfis publicáveis e DTOs não expõem dados privados.
- [ ] **T049** Implementar interface de pesquisa e resultados de Cuidadores. **US relacionada**: US-10. **Dependências**: T005, T045, T048. **Concluído quando**: pesquisa, filtros ativos, perfil profissional, disponibilidade e estado vazio são apresentados e operáveis por teclado.
- [ ] **T050** Implementar formulário de solicitação de Cuidador. **US relacionada**: US-11. **Dependências**: T005, T046, T047, T048. **Concluído quando**: campos seguem CL-10, parceiro/opção segue escolha aprovada, erros são compreensíveis e submissão não gera duplicidade em repetição.

## 14. Transporte

- [ ] **T051** Definir endereços, localização, necessidades especiais e regras da viagem (CL-11). **US relacionada**: US-12. **Dependências**: T030, T041. **Concluído quando**: origem/destino, entrada/localização, data/fuso, acompanhante, ida/volta e campos de necessidade estão especificados; GPS em segundo plano não é presumido.
- [ ] **T052** Criar entidade persistente `TransportRequest`. **US relacionada**: US-12, US-13. **Dependências**: T003, T010, T051. **Concluído quando**: extensão 1:1 armazena campos aprovados, classifica necessidades sensíveis e valida referências temporais/estruturais decididas.
- [ ] **T053** Implementar API de busca de Motoristas e compatibilidade de transporte. **US relacionada**: US-12. **Dependências**: T019, T041, T042, T051, T030. **Concluído quando**: candidatos respeitam disponibilidade/capacidade aprovadas; endpoint filtra autorização e não declara capacidade não verificada.
- [ ] **T054** Implementar formulário de solicitação de transporte. **US relacionada**: US-12. **Dependências**: T005, T051, T052. **Concluído quando**: origem, destino, data, horário e necessidades especiais seguem CL-11; obrigatoriedade e mensagens são acessíveis.
- [ ] **T055** Implementar seleção/consulta de Motorista para a viagem. **US relacionada**: US-12. **Dependências**: T051, T053, T054. **Concluído quando**: fluxo apresenta somente opções segundo regra aprovada, mostra estado sem disponibilidade e impede confirmar candidato incompatível.

## 15. Saúde

- [ ] **T056** Definir campos, categorias, edição e regras de lembrete para compromissos (CL-13). **US relacionada**: US-14. **Dependências**: T030. **Concluído quando**: tipos de compromisso, campos, edição/exclusão, antecedência e fuso são documentados sem incluir diagnóstico ou recomendação.
- [ ] **T057** Criar entidade persistente `HealthAppointment`. **US relacionada**: US-14. **Dependências**: T003, T010, T056. **Concluído quando**: campos e categorias seguem CL-13; dados são classificados como sensíveis; FK e índices por Usuário/data têm migração e testes.
- [ ] **T058** Implementar API para próximos compromissos, histórico e CRUD permitido. **US relacionada**: US-14. **Dependências**: T030, T032, T033, T056, T057. **Concluído quando**: validação de campos e ACL de saúde ocorre no servidor para listagem/detalhe/mutação; nenhum endpoint produz diagnóstico ou recomendação.
- [ ] **T059** Implementar interface de Saúde e organização de compromissos. **US relacionada**: US-14. **Dependências**: T005, T056, T058. **Concluído quando**: próximos itens e histórico são separados; formulários e mensagens seguem CL-13; conteúdo deixa explícito que é organização, não orientação médica.

## 16. Solicitações

- [ ] **T060** Definir estados e transições, recusa, cancelamento, expiração e reagendamento (CL-12). **US relacionada**: US-11, US-12, US-13, US-16. **Dependências**: T046, T051. **Concluído quando**: matriz ator × estado × ação e efeitos está registrada; concorrência e transições proibidas têm regra explícita.
- [ ] **T061** Criar entidade persistente `ServiceRequest`. **US relacionada**: US-11, US-12, US-13, US-16. **Dependências**: T003, T010, T060. **Concluído quando**: raiz contém solicitante, tipo, parceiro, estado e timestamps definidos; índices por solicitante/parceiro/estado existem; extensão específica obrigatória é validada.
- [ ] **T062** Implementar serviço/API transacional de criação e transições de solicitação. **US relacionada**: US-11, US-12, US-13, US-16. **Dependências**: T047, T052, T060, T061, T033, T043. **Concluído quando**: criar pedido e transicionar estado grava histórico atomicamente, verifica ator/compatibilidade/ACL e bloqueia estados inválidos e aceite concorrente.
- [ ] **T063** Implementar interface de acompanhamento e ações permitidas da solicitação. **US relacionada**: US-13, US-16. **Dependências**: T005, T060, T062. **Concluído quando**: Usuário e Parceiro veem estado e tipo de serviço; cancelamento/aceite/recusa aparecem apenas quando permitidos; sucesso, conflito e falha têm feedback.

## 17. Agenda

- [ ] **T064** Implementar agenda consolidada responsiva de compromissos e serviços agendados. **US relacionada**: US-09, US-14, US-15, US-16. **Dependências**: T039, T044, T058, T062. **Concluído quando**: agenda consulta dados já autorizados de cada módulo, identifica Usuário ativo para Tutor e não revela detalhes sem grant; não duplica regras de estado ou persistência.

## 18. Notificações

- [ ] **T065** Definir destinatários, canais, preferências, temporização e conteúdo seguro (CL-14). **US relacionada**: US-06, US-14, US-15, US-16, US-17. **Dependências**: T030, T060. **Concluído quando**: matriz evento × destinatário × canal × conteúdo é aprovada; canais externos não são presumidos e dados sensíveis são minimizados.
- [ ] **T066** Criar entidade persistente `Notification`. **US relacionada**: US-17. **Dependências**: T003, T065. **Concluído quando**: destinatário, tipo de evento, referência, resumo mínimo e leitura seguem CL-14; índice de inbox existe; conteúdo sensível não é espelhado.
- [ ] **T067** Implementar geração e consulta de notificações na API. **US relacionada**: US-17. **Dependências**: T030, T060, T065, T066. **Concluído quando**: eventos definidos geram notificações idempotentes aos destinatários permitidos; leitura é isolada por destinatário e permissões são revalidadas.
- [ ] **T068** Implementar central de notificações na interface. **US relacionada**: US-17. **Dependências**: T005, T065, T067. **Concluído quando**: lista estados de carregamento, erro, vazio e notificação; conteúdo respeita escopos aprovados e é navegável por teclado/leitor de tela.

## 19. Histórico

- [ ] **T069** Definir eventos históricos, visibilidade, retenção e gestão de conta (CL-15). **US relacionada**: US-13, US-15, US-16, US-18. **Dependências**: T030, T060. **Concluído quando**: registros incluídos, titulares autorizados, efeito de término de vínculo/conta e política de retenção estão documentados; nenhuma exclusão ou retenção é presumida.
- [ ] **T070** Implementar telas de histórico de solicitações e atendimentos. **US relacionada**: US-13, US-15, US-16. **Dependências**: T063, T064, T069. **Concluído quando**: dados concluídos/cancelados ficam separados dos ativos, consulta reaproveita endpoints autorizados e cada perfil vê somente histórico permitido.

## 20. Segurança

- [ ] **T071** Criar entidade append-only `AuditLog`. **US relacionada**: US-06, US-08, US-13, US-17. **Dependências**: T003, T030, T069. **Concluído quando**: registra ator, ação, referência, request ID e instante; não contém credenciais nem conteúdo pessoal/sensível; API comum não pode alterar ou remover eventos.
- [ ] **T072** Implementar logging estruturado com redação de dados sensíveis. **US relacionada**: transversal. **Dependências**: T003, T030, T071. **Concluído quando**: logs Pino incluem request ID e resultado; testes verificam redação de CPF, e-mail, telefone, endereço, notas, tokens e corpos de formulários.
- [ ] **T073** Configurar proteções HTTP e limites de requisição da API. **US relacionada**: US-03, US-05, US-07, US-08. **Dependências**: T003, T022. **Concluído quando**: CORS usa origens permitidas, headers de segurança são emitidos, mutações com cookie verificam CSRF e endpoints públicos sensíveis têm rate limit configurado e testado.
- [ ] **T074** Validar armazenamento seguro de credenciais e segredos por ambiente. **US relacionada**: US-08. **Dependências**: T022, T023, T072. **Concluído quando**: nenhum caminho persiste senha em texto puro ou segredo no repositório/log; hashing e segredo de sessão seguem CL-03; produção falha se segredo obrigatório estiver ausente.

## 21. Acessibilidade

- [ ] **T075** Definir padrão formal, nível e limites de acessibilidade (CL-16). **US relacionada**: US-19. **Dependências**: —. **Concluído quando**: norma/nível, contraste, tipografia, alvo de toque e zoom são aprovados e registrados como critérios mensuráveis.
- [ ] **T076** Definir navegadores, dispositivos, breakpoints e tecnologias assistivas suportados (CL-17). **US relacionada**: US-19. **Dependências**: —. **Concluído quando**: matriz de suporte desktop/tablet/celular e combinações de navegador/AT está registrada e aprovada.
- [ ] **T077** Corrigir barreiras de acessibilidade nos fluxos de ponta a ponta. **US relacionada**: US-01 a US-19. **Dependências**: T005, T075, T076, T081. **Concluído quando**: achados automatizados e manuais dos fluxos críticos são resolvidos; teclado, foco, semântica, leitor de tela, contraste e zoom atendem aos critérios aprovados.

## 22. Testes

- [ ] **T078** Criar testes unitários de domínio para validações, ACL e estados. **US relacionada**: US-03, US-05, US-06, US-11 a US-17. **Dependências**: T033, T060, T062. **Concluído quando**: casos válidos, inválidos e transições proibidas têm testes determinísticos sem dependência de rede.
- [ ] **T079** Criar testes de integração de API e PostgreSQL. **US relacionada**: US-03 a US-18. **Dependências**: T011, T014, T020, T024, T034, T058, T062, T067. **Concluído quando**: migrações aplicam em banco de teste e endpoints exercitam persistência, constraints, transações, revogação e permissões.
- [ ] **T080** Criar testes de componentes para formulários, navegação e feedback. **US relacionada**: US-01 a US-19. **Dependências**: T005, T012, T015, T021, T035, T038, T040, T044, T049, T050, T054, T055, T059, T063, T068. **Concluído quando**: testes verificam conteúdo, validação, estados, foco e fluxo por teclado dos componentes críticos.
- [ ] **T081** Criar testes E2E das jornadas principais dos três perfis. **US relacionada**: US-01 a US-19. **Dependências**: T006, T007, T012, T015, T021, T025, T035, T040, T044, T050, T055, T059, T063, T068, T070. **Concluído quando**: jornadas P1 são executadas em browser com dados sintéticos e cobrem sucesso, estado vazio e erro de validação.
- [ ] **T082** Criar testes de regressão de autorização e privacidade. **US relacionada**: US-06, US-08, US-14 a US-17. **Dependências**: T030, T033, T034, T058, T062, T067, T071. **Concluído quando**: testes provam negação antes de consentimento, após revogação, entre Usuários, entre tipos de Parceiro e em detalhe/listagem/notificação.
- [ ] **T083** Definir metas mensuráveis de desempenho e ambiente de medição (CL-18). **US relacionada**: US-19. **Dependências**: —. **Concluído quando**: limites de carregamento/resposta, perfil de dispositivo/rede e cenário de carga são aprovados e registrados em `spec.md`.

## 23. CI/CD

- [ ] **T084** Criar pipeline CI para qualidade, testes, build e dependências. **US relacionada**: transversal. **Dependências**: T002, T078, T079, T080, T081, T082. **Concluído quando**: em pull request executam lint, format check, typecheck, unitários, integração, componentes, E2E críticos, build e auditoria de dependências; qualquer falha bloqueia o job.

## 24. Deploy

- [ ] **T085** Aprovar a fronteira do MVP e o comportamento sem Parceiros disponíveis (CL-20). **US relacionada**: US-01 a US-19. **Dependências**: —. **Concluído quando**: histórias e funcionalidades da primeira entrega são identificadas e estados vazios/funções sem oferta disponível são decididos em `spec.md`.
- [ ] **T086** Preparar configuração e deploy de staging. **US relacionada**: transversal. **Dependências**: T003, T022, T030, T069, T072, T083, T084, T085. **Concluído quando**: API, web e banco de staging usam configuração/segredos separados; migrações são versionadas; smoke tests confirmam health check e fluxos aprovados sem dados reais.
- [ ] **T087** Implementar promoção controlada para produção com rollback. **US relacionada**: transversal. **Dependências**: T086. **Concluído quando**: o mesmo artefato aprovado em staging é promovido com aprovação manual; migração é compatível; procedimento de rollback e verificação pós-deploy estão documentados e testados.

## 25. Documentação

- [ ] **T088** Escrever guia de desenvolvimento local e operação segura. **US relacionada**: transversal. **Dependências**: T001, T003, T022, T086. **Concluído quando**: quickstart contém pré-requisitos, setup, comandos de validação, variáveis sem segredos, ambientes e uso exclusivo de dados sintéticos; passos são verificados em clone limpo.
- [ ] **T089** Documentar OpenAPI, modelo de dados e rastreabilidade requisitos–implementação–teste. **US relacionada**: transversal. **Dependências**: T031, T032, T061, T065, T071, T084. **Concluído quando**: endpoints e schemas publicados refletem contratos implementados; entidades e decisões de privacidade estão documentadas; cada FR/US implementado aponta a módulos, issues e testes correspondentes.

## Dependências e ordem de execução

- T001 é a base do repositório; T002 depende dela; T003 depende das duas.
- T004, T008, T016, T022, T028–T030, T036, T041, T045–T046, T051, T056, T060, T065, T069, T075–T076, T083 e T085 são esclarecimentos/gates. Implementações relacionadas só podem começar quando a respectiva decisão estiver registrada.
- Modelos persistentes dependem de T003 e do esclarecimento de produto aplicável; APIs dependem dos modelos e políticas; interfaces dependem dos contratos e primitives; testes de integração/E2E dependem das superfícies implementadas.
- T084 CI depende dos comandos de qualidade e suites de teste; staging depende dos gates de segurança, escopo, desempenho e CI; produção depende de staging aprovado.
- T088–T089 devem acompanhar as decisões e contratos reais; atualizar documentação quando uma CL alterar comportamento.
- Tarefas sem dependências explícitas podem ser desenvolvidas em paralelo quando alterarem arquivos/componentes independentes.

## Critério de conclusão do backlog

O backlog não autoriza decisões de produto não respondidas. Antes de marcar tarefa dependente como pronta, a CL indicada deve estar resolvida e aplicada à especificação, ao modelo de dados e aos contratos afetados. Uma sugestão em `clarifications.md` não conta como decisão. Tarefas concluídas devem preservar rastreabilidade por US/FR e evidência de validação apropriada.
