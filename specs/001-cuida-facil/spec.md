# Especificação Funcional: CuidaFácil

**Feature Branch**: `001-cuida-facil`
**Criada**: 2026-10-07
**Status**: Draft
**Entrada**: Solicitação para especificar a plataforma CuidaFácil, seus perfis, áreas e fluxos funcionais.

## Contexto e objetivo

O CuidaFácil é uma plataforma digital para facilitar o acesso de pessoas idosas e de pessoas que necessitam de auxílio a serviços de apoio, conectando Usuários a cuidadores e motoristas e oferecendo ferramentas para organizar compromissos de saúde sem realizar diagnóstico ou recomendação médica. Tutores podem auxiliar no acompanhamento somente dentro das permissões concedidas pelo Usuário. O produto está alinhado ao ODS 3 — Saúde e bem-estar, ao facilitar a organização do acesso a serviços de saúde, e ao ODS 10 — Redução das desigualdades, ao considerar as necessidades de pessoas com deficiência, mobilidade reduzida e idosos para apoiar sua inclusão e autonomia. Esses alinhamentos representam a proposta de valor; o impacto social ainda não foi validado com usuários.

Esta especificação cobre uma experiência responsiva para desktop, tablet e celular, com landing page, escolha de perfil, cadastros, áreas dos três perfis, busca e solicitação de serviços, acompanhamento, organização de compromissos e notificações. Histórias prioritárias descrevem o valor funcional em incrementos verificáveis; decisões ainda não fornecidas estão listadas para `/speckit.clarify` e não devem ser presumidas durante planejamento ou implementação.

**Referências visuais**: a solicitação menciona telas de referência, mas nenhum arquivo de imagem ou tela de referência foi encontrado no workspace. Os requisitos visuais abaixo se limitam às descrições textuais fornecidas. Confirmar as referências visuais em `/speckit.clarify` antes de tratar detalhes de layout, cores, tipografia ou identidade visual como definidos.

## Atores e vocabulário

- **Usuário**: pessoa adulta (18 anos ou mais) que necessita de auxílio, incluindo pessoas idosas; solicita cuidadores e transporte e organiza acompanhamento de saúde. Menores não fazem parte do fluxo inicial; eventual atendimento exige representante e fluxo próprio previamente especificado.
- **Tutor**: familiar ou responsável vinculado a um ou mais Usuários com autorização explícita; acompanha informações e solicitações autorizadas e auxilia na organização dos serviços.
- **Parceiro**: profissional cadastrado que presta serviços como **Cuidador** ou **Motorista**.
- **Solicitação**: pedido de atendimento de cuidador ou transporte, com estado visível ao Usuário e acesso restrito a parceiros compatíveis.
- **Compromisso**: consulta, exame, acompanhamento ou outro compromisso de saúde registrado pelo Usuário para organização pessoal.

## Escopo

### Incluído na primeira versão

- Landing page e seleção de um dos três perfis.
- Cadastro específico para Usuário, Tutor e Parceiro, incluindo validação dos dados pessoais descritos.
- Complementação do perfil do Usuário e cadastro de informações profissionais específicas para cada tipo de Parceiro.
- Autenticação, autorização por perfil, proteção de rotas e controles de acesso, com método de autenticação a esclarecer.
- Área principal e navegação por perfil.
- Busca, filtros, consulta de perfis profissionais, disponibilidade e solicitação de cuidadores.
- Solicitação e acompanhamento de transporte adaptado, incluindo origem, destino, data, horário e necessidades especiais.
- Organização de consultas, exames, compromissos, acompanhamentos e lembretes, sem aconselhamento ou diagnóstico.
- Vínculo autorizado entre Tutor e Usuário, gestão de permissões pelo Usuário e acompanhamento restrito ao autorizado.
- Recebimento e gestão de solicitações compatíveis pelos Parceiros, disponibilidade, serviços agendados e histórico.
- Visualização de estados, histórico e notificações dos eventos relevantes.
- Requisitos transversais de acessibilidade, clareza, validação, segurança e responsividade.

### Fora do escopo da primeira versão

- Diagnóstico médico automatizado ou prescrição médica.
- Marketplace financeiro complexo ou pagamentos online.
- Integração com hospitais reais ou com o SUS.
- Prontuário médico completo.
- Recomendações médicas.

Funcionalidades futuras não listadas como incluídas dependem de justificativa e esclarecimento de produto antes de serem adicionadas.

## User Scenarios & Testing

As prioridades indicam a ordem de valor para o MVP. Cada história é uma fatia verificável por seus cenários de aceitação. Requisitos transversais de acessibilidade, privacidade e validação aplicam-se a todas as histórias pertinentes.

### US-01 — Conhecer a proposta do CuidaFácil (Priority: P1)

Como visitante, quero entender rapidamente o propósito da plataforma e seus serviços, para decidir se desejo começar.

**Por que esta prioridade**: apresenta o produto e é a entrada principal para os fluxos de cadastro.

**Teste independente**: abrir a página inicial sem autenticação, verificar os conteúdos e acionar o botão principal.

**Acceptance Scenarios**:

1. **Given** que sou visitante, **When** acesso a página inicial, **Then** vejo o nome ou logo CuidaFácil, a mensagem “Liberdade e Autonomia para Viver com Dignidade” e uma apresentação acolhedora, simples e acessível.
2. **Given** que estou na página inicial, **When** consulto as áreas de serviço, **Then** vejo Cuidadores, Transporte e Saúde, cada qual com uma descrição curta e compreensível.
3. **Given** que estou na página inicial, **When** localizo a ação principal, **Then** encontro um botão claramente identificado “Começar Agora”, visualmente proeminente e acionável por teclado.

### US-02 — Escolher o perfil de acesso (Priority: P1)

Como visitante, quero escolher se acesso como Usuário, Tutor ou Parceiro, para iniciar o cadastro adequado à minha função.

**Por que esta prioridade**: encaminha cada pessoa para seu fluxo correto sem confundir as responsabilidades dos perfis.

**Teste independente**: iniciar a partir da landing page e verificar que cada opção encaminha ao formulário correspondente.

**Acceptance Scenarios**:

1. **Given** que acionei “Começar Agora”, **When** a tela de perfis é apresentada, **Then** vejo “Bem-vindo! Como você deseja acessar?” e as três opções: “Sou Usuário — Preciso de cuidador ou transporte”, “Sou Tutor — Cuido de um ou mais familiares” e “Sou Parceiro — Cuidador ou motorista”.
2. **Given** que estou na escolha de perfil, **When** seleciono qualquer uma das três opções, **Then** sou encaminhado ao fluxo de cadastro correspondente, sem alteração implícita do meu perfil para outro.
3. **Given** que uso teclado ou leitor de tela, **When** navego pelas opções, **Then** cada opção tem nome acessível, foco visível e estado selecionável perceptível.

### US-03 — Cadastrar-se como Usuário (Priority: P1)

Como Usuário, quero cadastrar meus dados pessoais, para obter uma conta CuidaFácil.

**Por que esta prioridade**: habilita o público primário a iniciar os fluxos de apoio.

**Teste independente**: submeter dados válidos e inválidos nos campos do cadastro e verificar erros ou conclusão.

**Acceptance Scenarios**:

1. **Given** que escolhi “Sou Usuário”, **When** abro o formulário, **Then** encontro campos para nome completo, CPF, data de nascimento, telefone e e-mail, com labels explícitos e indicação dos campos obrigatórios segundo a regra aprovada.
2. **Given** que preenchi os campos com dados válidos e os requisitos de cadastro foram satisfeitos, **When** envio o formulário, **Then** o sistema confirma o resultado e permite prosseguir para completar os dados adicionais requeridos para uso da plataforma.
3. **Given** que informei nome, CPF, data de nascimento, telefone ou e-mail inválidos, **When** tento enviar o formulário, **Then** o sistema identifica o campo e apresenta mensagem clara de correção, sem descartar valores válidos já informados.
4. **Given** que um campo obrigatório está vazio, **When** tento enviar o formulário, **Then** o campo é identificado e a mensagem explica que informação falta.
5. **Given** que uma informação submetida é inválida, **When** o backend valida o cadastro, **Then** a operação não é registrada como sucesso e o erro técnico interno não é exposto ao Usuário.

### US-04 — Completar o perfil do Usuário (Priority: P2)

Como Usuário cadastrado, quero completar os dados adicionais necessários à plataforma, para utilizar os serviços com informações suficientes.

**Por que esta prioridade**: os dados adicionais são explicitamente necessários para uso, mas os dados específicos ainda dependem de esclarecimento.

**Teste independente**: acessar a etapa de complementação após o cadastro, preencher os dados definidos e confirmar a persistência.

**Acceptance Scenarios**:

1. **Given** que concluí o cadastro inicial, **When** acesso a complementação de perfil, **Then** o sistema apresenta somente os dados adicionais definidos como necessários para a utilização da plataforma.
2. **Given** que há dados adicionais obrigatórios pendentes, **When** tento iniciar uma função que dependa deles, **Then** recebo orientação clara sobre o que falta e como completar o perfil.
3. **Given** que atualizo meu perfil com dados válidos, **When** salvo as alterações, **Then** o sistema confirma a atualização e apresenta os dados atualizados ao próprio Usuário.

### US-05 — Cadastrar-se como Tutor e vincular Usuários com autorização (Priority: P1)

Como Tutor, quero cadastrar-me e estabelecer vínculos autorizados com Usuários, para auxiliá-los no acompanhamento.

**Por que esta prioridade**: o apoio familiar é parte central da proposta, mas não pode ultrapassar o consentimento do Usuário.

**Teste independente**: cadastrar Tutor, iniciar ou receber uma solicitação de vínculo e verificar que o Usuário precisa autorizar antes de qualquer acesso.

**Acceptance Scenarios**:

1. **Given** que escolhi “Sou Tutor”, **When** abro o formulário, **Then** encontro nome completo, CPF, data de nascimento, telefone e e-mail, com labels e indicação dos campos obrigatórios segundo a regra aprovada.
2. **Given** que informei dados pessoais inválidos, **When** tento concluir o cadastro, **Then** recebo mensagens claras nos campos relevantes e o cadastro não é indicado como concluído.
3. **Given** que sou Tutor ou Usuário cadastrado, **When** inicio ou recebo uma solicitação de vínculo, **Then** nenhum dado nem funcionalidade do Usuário fica acessível ao Tutor antes da autorização explícita do Usuário.
4. **Given** que um Usuário recebe uma solicitação de vínculo, **When** a consulta em sessão autenticada, vê quem solicitou e o que está autorizando e decide autorizá-la ou recusá-la, **Then** o resultado é comunicado às pessoas envolvidas e somente uma autorização concedida habilita o vínculo.
5. **Given** que sou Tutor, **When** tento acessar um Usuário não vinculado ou vínculo ainda não autorizado, **Then** o acesso é negado sem revelar suas informações.

### US-06 — Controlar acesso do Tutor às informações (Priority: P1)

Como Usuário, quero controlar quais informações cada Tutor vinculado pode visualizar, para manter a privacidade do meu perfil e dos meus dados sensíveis.

**Por que esta prioridade**: autorização explícita e controle pelo Usuário são condições obrigatórias de privacidade.

**Teste independente**: conceder e revogar acesso, consultar a visão do Tutor antes e depois e verificar bloqueio de dados não autorizados.

**Acceptance Scenarios**:

1. **Given** que tenho um vínculo autorizado, **When** acesso os controles de compartilhamento, **Then** consigo consultar quais informações estão disponíveis para o Tutor e alterar as permissões apresentadas.
2. **Given** que uma informação não foi autorizada, **When** o Tutor consulta o perfil ou acompanhamento, **Then** essa informação não é exibida nem disponibilizada por outra área da plataforma.
3. **Given** que revogo uma permissão previamente concedida, **When** a alteração é confirmada, **Then** acessos subsequentes do Tutor respeitam a revogação.
4. **Given** que há mais de um Tutor vinculado, **When** altero uma permissão, **Then** o sistema aplica a alteração de acordo com o Tutor e o escopo escolhidos, sem ampliar acesso de outra pessoa.
5. **Given** que o dado é relacionado à saúde, **When** qualquer perfil o consulta, **Then** só é mostrado se houver autorização válida para aquele dado.

### US-07 — Cadastrar-se como Parceiro e informar atuação (Priority: P1)

Como Parceiro, quero criar meu perfil profissional como Cuidador ou Motorista, para receber solicitações compatíveis com meu serviço.

**Por que esta prioridade**: sem profissionais cadastrados e classificados, Usuários não podem encontrar apoio.

**Teste independente**: cadastrar Parceiros de cada tipo e verificar campos adicionais e compatibilidade de solicitações.

**Acceptance Scenarios**:

1. **Given** que escolhi “Sou Parceiro”, **When** abro o formulário inicial, **Then** encontro nome completo, CPF, data de nascimento, telefone e e-mail com labels e obrigatoriedade indicados conforme regra aprovada.
2. **Given** que informei dados pessoais inválidos, **When** envio o cadastro, **Then** recebo mensagens compreensíveis e não sou informado de conclusão bem-sucedida.
3. **Given** que avanço para a definição da atuação, **When** escolho Cuidador ou Motorista, **Then** o sistema solicita as informações profissionais adequadas àquele tipo e diferencia visualmente os dois perfis.
4. **Given** que escolhi Cuidador, **When** completo o perfil profissional, **Then** posso informar experiência, especialidades, disponibilidade, área de atendimento e informações profissionais.
5. **Given** que escolhi Motorista, **When** completo o perfil profissional, **Then** posso informar categoria de atuação, disponibilidade, área de atendimento, características relacionadas ao transporte e informações profissionais.
6. **Given** que altero o tipo de atuação, **When** o perfil é atualizado, **Then** o sistema não apresenta campos ou solicitações incompatíveis com o tipo ativo.

### US-08 — Acessar a plataforma de acordo com meu perfil (Priority: P1)

Como pessoa cadastrada, quero autenticar-me e acessar somente as funções do meu perfil, para utilizar a plataforma com segurança.

**Por que esta prioridade**: o acesso seguro é pré-requisito para todas as áreas autenticadas e dados pessoais.

**Teste independente**: autenticar contas dos três perfis e verificar o destino e bloqueio de rotas incompatíveis.

**Acceptance Scenarios**:

1. **Given** que possuo uma conta ativa, **When** concluo autenticação válida, **Then** acesso a área correspondente ao meu perfil.
2. **Given** que não estou autenticado, **When** tento abrir uma área restrita, **Then** não vejo dados privados nem conteúdo protegido.
3. **Given** que estou autenticado em um perfil, **When** tento acessar uma função exclusiva de outro perfil, **Then** o acesso é negado mesmo que eu tente abrir diretamente a rota.
4. **Given** que forneço credenciais inválidas, **When** tento autenticar, **Then** recebo uma mensagem segura e compreensível que não revela informação técnica nem segredo de autenticação.
5. **Given** que uma operação sensível requer confirmação ou autenticação adicional, **When** o requisito aplicável é satisfeito ou não, **Then** a operação prossegue ou é bloqueada de forma clara. **[NEEDS CLARIFICATION: quais operações exigem autenticação adicional.]**

### US-09 — Consultar a área inicial do Usuário (Priority: P1)

Como Usuário, quero encontrar as funções principais em uma área inicial simples, para acessar serviços e compromissos sem sobrecarga de informação.

**Por que esta prioridade**: concentra o acesso cotidiano às funções essenciais do público principal.

**Teste independente**: entrar como Usuário e verificar navegação para cada área solicitada.

**Acceptance Scenarios**:

1. **Given** que estou autenticado como Usuário, **When** abro minha área inicial, **Then** encontro acesso a Meu perfil, Cuidadores, Transporte, Saúde, Solicitações, Histórico, Notificações e Configurações.
2. **Given** que estou na área inicial, **When** identifico ações em destaque, **Then** as ações prioritárias são apresentadas com clareza e sem excesso de conteúdo concorrente.
3. **Given** que seleciono qualquer item de navegação, **When** a página correspondente é aberta, **Then** o título e o contexto da seção são claros e a navegação mantém uma forma simples de retornar à área inicial.

### US-10 — Encontrar e consultar cuidadores disponíveis (Priority: P1)

Como Usuário, quero pesquisar e filtrar cuidadores e consultar seus perfis, para identificar profissionais que atendam às minhas necessidades.

**Por que esta prioridade**: viabiliza um dos serviços centrais do produto e prepara uma solicitação informada.

**Teste independente**: consultar a lista, aplicar pesquisa e filtros e abrir o perfil de um Cuidador.

**Acceptance Scenarios**:

1. **Given** que acesso Cuidadores, **When** existem profissionais disponíveis, **Then** vejo resultados identificados como cuidadores e posso abrir cada perfil.
2. **Given** que estou na lista de cuidadores, **When** informo um termo de pesquisa, **Then** os resultados apresentados correspondem à pesquisa ou recebo um estado vazio compreensível.
3. **Given** que existem filtros disponíveis, **When** seleciono ou removo filtros, **Then** a lista reflete os filtros ativos e permite compreender como limpar ou alterar a seleção.
4. **Given** que abro um perfil, **When** consulto seus detalhes, **Then** vejo as informações profissionais publicadas e a disponibilidade informada pelo Parceiro.
5. **Given** que não há cuidadores correspondentes ou disponíveis, **When** consulto ou pesquiso, **Then** recebo uma mensagem clara de indisponibilidade e não vejo resultados incompatíveis como se fossem correspondências.

### US-11 — Solicitar atendimento de Cuidador (Priority: P1)

Como Usuário, quero solicitar atendimento a um Cuidador, para obter apoio profissional.

**Por que esta prioridade**: transforma a descoberta de cuidadores em uma solicitação utilizável.

**Teste independente**: selecionar um cuidador disponível, enviar uma solicitação válida e verificar confirmação e registro.

**Acceptance Scenarios**:

1. **Given** que consultei um Cuidador, **When** inicio solicitação, **Then** o sistema apresenta os dados necessários para pedir atendimento e identifica campos obrigatórios de forma clara. **[NEEDS CLARIFICATION: dados requeridos além de disponibilidade e dados do perfil.]**
2. **Given** que preenchi uma solicitação válida, **When** a envio, **Then** recebo confirmação compreensível e a solicitação passa a estar visível com estado inicial Pendente.
3. **Given** que falta informação obrigatória ou há conflito de disponibilidade, **When** tento enviar, **Then** o sistema explica o problema e não cria uma solicitação com sucesso aparente.
4. **Given** que sou Parceiro Motorista, **When** consulto solicitações de cuidador, **Then** não recebo acesso a elas.

### US-12 — Solicitar transporte adaptado (Priority: P1)

Como Usuário, quero informar os dados de uma viagem e solicitar transporte, para planejar meu deslocamento com o apoio adequado.

**Por que esta prioridade**: transporte é um serviço central explicitamente previsto, incluindo necessidades especiais.

**Teste independente**: completar origem, destino, data, horário e necessidades, enviar o pedido e consultar seu estado.

**Acceptance Scenarios**:

1. **Given** que acesso Transporte, **When** inicio uma solicitação, **Then** encontro campos para origem, destino, data, horário e necessidades especiais, com labels e obrigatoriedade indicados.
2. **Given** que os dados informados são válidos, **When** consulto motoristas disponíveis para a viagem, **Then** vejo apenas opções compatíveis com a solicitação e posso prosseguir com o pedido.
3. **Given** que envio uma solicitação válida, **When** o sistema a registra, **Then** recebo confirmação e consigo consultar o estado Pendente.
4. **Given** que a origem, destino, data ou horário não são aceitos ou falta um dado obrigatório, **When** tento enviar, **Then** recebo orientação clara para corrigir e nenhuma solicitação inválida é registrada.
5. **Given** que não há motoristas disponíveis para os dados informados, **When** consulto opções, **Then** recebo indicação clara de indisponibilidade sem que uma opção incompatível seja apresentada como disponível.
6. **Given** que sou Parceiro Cuidador, **When** consulto solicitações de transporte, **Then** não recebo acesso a elas.

### US-13 — Acompanhar solicitações, cancelar e consultar histórico (Priority: P1)

Como Usuário, quero acompanhar estados, cancelamentos e histórico dos meus pedidos, para entender o andamento dos serviços.

**Por que esta prioridade**: transparência do andamento é essencial para segurança e confiança do Usuário.

**Teste independente**: consultar pedidos em diferentes estados, cancelar quando permitido e verificar histórico.

**Acceptance Scenarios**:

1. **Given** que tenho solicitações, **When** acesso Solicitações, **Then** vejo cada solicitação com tipo de serviço, estado atual e informações suficientes para identificá-la.
2. **Given** que uma solicitação percorre os estados previstos, **When** seu estado muda, **Then** Usuário e Parceiro veem o estado atualizado conforme suas permissões.
3. **Given** que uma solicitação pode ser cancelada, **When** confirmo o cancelamento, **Then** o estado passa a Cancelada e o resultado é comunicado às partes pertinentes.
4. **Given** que uma solicitação não pode ser cancelada naquele momento, **When** tento cancelá-la, **Then** o sistema explica que a ação não está disponível e não altera seu estado.
5. **Given** que existem solicitações concluídas ou canceladas, **When** acesso Histórico, **Then** consigo consultar registros anteriores sem confundi-los com solicitações ativas.
6. **Given** que um pedido é recusado por Parceiro, **When** consulto seu detalhe, **Then** vejo um resultado compreensível e o histórico não o apresenta como aceito. **[NEEDS CLARIFICATION: se “Recusada” é estado persistente e quais ações são permitidas após recusa.]**

### US-14 — Organizar compromissos e lembretes de saúde (Priority: P1)

Como Usuário, quero organizar consultas, exames, compromissos, acompanhamentos e lembretes, para cuidar da minha rotina sem depender de recomendações médicas do sistema.

**Por que esta prioridade**: apoia organização e bem-estar sem ultrapassar os limites médicos do produto.

**Teste independente**: criar compromissos de categorias previstas, consultar próximos itens e histórico e verificar a apresentação neutra.

**Acceptance Scenarios**:

1. **Given** que acesso Saúde, **When** consulto a área, **Then** vejo próximos compromissos e histórico claramente separados.
2. **Given** que quero registrar um item, **When** escolho consulta, exame, compromisso, acompanhamento ou lembrete, **Then** posso inserir os dados de organização solicitados pelo sistema. **[NEEDS CLARIFICATION: campos obrigatórios e categorias detalhadas para o registro.]**
3. **Given** que salvo um compromisso com dados válidos, **When** a operação termina, **Then** o item aparece na lista apropriada e o resultado é confirmado.
4. **Given** que um compromisso está próximo, **When** ocorre o evento de lembrete configurado, **Then** o Usuário recebe uma notificação informativa, sem diagnóstico ou recomendação clínica. **[NEEDS CLARIFICATION: antecedência, canal e configuração do lembrete.]**
5. **Given** que consulto informações desta área, **When** o sistema apresenta conteúdos ou estados, **Then** não diagnostica, prescreve nem os caracteriza como recomendação médica.
6. **Given** que um Tutor tenta consultar um compromisso, **When** não possui autorização aplicável, **Then** não vê os dados do compromisso.

### US-15 — Acompanhar Usuários autorizados como Tutor (Priority: P1)

Como Tutor, quero alternar entre Usuários vinculados e consultar somente informações autorizadas, para ajudar sem exceder minhas permissões.

**Por que esta prioridade**: atende ao papel de apoio familiar preservando controle e privacidade do Usuário.

**Teste independente**: entrar como Tutor com vínculos distintos, selecionar cada Usuário e verificar conteúdo autorizado e negado.

**Acceptance Scenarios**:

1. **Given** que sou Tutor com vínculos autorizados, **When** abro minha área, **Then** vejo a lista dos Usuários vinculados que posso acompanhar.
2. **Given** que acompanho mais de um Usuário, **When** seleciono um deles, **Then** a área identifica claramente qual Usuário está ativo e não mistura seus dados com os de outra pessoa.
3. **Given** que selecionei um Usuário, **When** consulto perfil, solicitações ou compromissos, **Then** vejo apenas as informações autorizadas por aquele Usuário.
4. **Given** que acompanho solicitações ou compromissos autorizados, **When** consulto seus estados, **Then** posso auxiliar na organização sem receber permissões que não foram concedidas.
5. **Given** que um vínculo foi revogado ou uma permissão foi removida, **When** atualizo ou tento abrir o conteúdo, **Then** o sistema bloqueia a informação não mais autorizada.
6. **Given** que ocorre uma notificação relevante para um Usuário acompanhado, **When** a notificação chega ao Tutor, **Then** ela contém apenas o conteúdo autorizado. **[NEEDS CLARIFICATION: regras de relevância, consentimento e destinatários.]**

### US-16 — Gerir disponibilidade e solicitações como Parceiro (Priority: P1)

Como Parceiro, quero configurar disponibilidade, receber pedidos compatíveis, respondê-los e consultar serviços, para gerir minha atuação na plataforma.

**Por que esta prioridade**: habilita a prestação dos serviços e o ciclo de atendimento.

**Teste independente**: entrar como cada tipo de Parceiro, atualizar disponibilidade, responder a pedido compatível e consultar serviços agendados e histórico.

**Acceptance Scenarios**:

1. **Given** que sou Parceiro autenticado, **When** abro minha área, **Then** encontro acesso ao perfil, disponibilidade, solicitações, serviços agendados e histórico.
2. **Given** que sou Cuidador, **When** acesso solicitações, **Then** vejo somente pedidos de atendimento compatíveis com atuação de cuidador.
3. **Given** que sou Motorista, **When** acesso solicitações, **Then** vejo somente pedidos de transporte compatíveis com atuação de motorista.
4. **Given** que recebo uma solicitação compatível, **When** a aceito, **Then** o sistema confirma a aceitação e atualiza o estado para Aceita.
5. **Given** que recebo uma solicitação compatível, **When** a recuso, **Then** o resultado é confirmado, a solicitação deixa de ser apresentada como aceita e o Usuário recebe a atualização pertinente.
6. **Given** que altero disponibilidade ou informações profissionais, **When** salvo dados válidos, **Then** o perfil atualizado é apresentado em consultas futuras conforme as permissões de publicação. **[NEEDS CLARIFICATION: aprovação e visibilidade das alterações.]**
7. **Given** que um serviço aceito começa ou termina, **When** o estado é atualizado, **Then** a área apresenta Em andamento ou Concluída conforme o evento registrado e disponibiliza o serviço no histórico após conclusão.

### US-17 — Receber notificações de eventos relevantes (Priority: P2)

Como Usuário, Tutor ou Parceiro, quero receber notificações sobre eventos importantes, para acompanhar mudanças sem consultar cada área repetidamente.

**Por que esta prioridade**: melhora o acompanhamento, mas os fluxos essenciais devem funcionar mesmo sem preferências avançadas de notificação.

**Teste independente**: provocar eventos listados e verificar criação, conteúdo autorizado e consulta da notificação pela pessoa destinatária.

**Acceptance Scenarios**:

1. **Given** que uma solicitação é criada, aceita, recusada ou cancelada, **When** ocorre o evento, **Then** a notificação correspondente é disponibilizada aos destinatários autorizados.
2. **Given** que um compromisso está próximo, **When** chega o momento de notificar conforme configuração aprovada, **Then** a notificação é disponibilizada ao destinatário autorizado.
3. **Given** que existe uma atualização relevante, **When** consulto Notificações, **Then** vejo uma descrição compreensível do evento e consigo distingui-la de outras notificações.
4. **Given** que uma notificação se refere a dados de Usuário ou saúde, **When** é enviada a um Tutor, **Then** seu conteúdo respeita as permissões vigentes e não revela detalhes não autorizados.
5. **Given** que uma notificação falha ou está carregando, **When** consulto a área, **Then** vejo um estado de erro ou carregamento compreensível, sem mensagem técnica interna.
6. **Given** que o canal ou as preferências ainda não foram definidos, **When** notificações são implementadas, **Then** nenhum canal externo ou comportamento de entrega é presumido antes de esclarecimento.

### US-18 — Gerir perfil e configurações pessoais (Priority: P2)

Como pessoa autenticada, quero consultar e atualizar informações e configurações pertinentes ao meu perfil, para manter meus dados corretos e controlar o uso da plataforma.

**Por que esta prioridade**: complementa o uso cotidiano e mantém informações necessárias atualizadas.

**Teste independente**: alterar dados permitidos em cada perfil, validar a alteração e confirmar os controles exclusivos do Usuário.

**Acceptance Scenarios**:

1. **Given** que sou Usuário autenticado, **When** abro Meu perfil ou Configurações, **Then** posso consultar e editar os dados e permissões de compartilhamento disponíveis ao meu perfil.
2. **Given** que sou Tutor autenticado, **When** abro Meu perfil ou Configurações, **Then** posso consultar e editar somente meus próprios dados e configurações permitidas.
3. **Given** que sou Parceiro autenticado, **When** abro Meu perfil, **Then** posso consultar e atualizar as informações profissionais permitidas para meu tipo de atuação.
4. **Given** que envio um dado inválido, **When** tento salvar, **Then** recebo orientação no campo relevante e os dados existentes não são silenciosamente substituídos por uma alteração inválida.
5. **Given** que uma atualização foi salva, **When** a operação termina, **Then** o sistema confirma o resultado e apresenta os dados atualizados.
6. **Given** que há configurações de notificações, segurança, privacidade ou conta ainda sem regra definida, **When** a interface for especificada, **Then** as escolhas são registradas em `/speckit.clarify`, não inventadas. **[NEEDS CLARIFICATION: configurações incluídas no MVP.]**

### US-19 — Usar a plataforma com acessibilidade e em diferentes dispositivos (Priority: P1)

Como pessoa usuária da plataforma, quero navegar e concluir tarefas com controles acessíveis em meu dispositivo, para utilizar os serviços com autonomia.

**Por que esta prioridade**: acessibilidade e responsividade são requisitos obrigatórios, especialmente para o público principal.

**Teste independente**: percorrer fluxos críticos com teclado e leitor de tela em viewports de desktop, tablet e celular, verificando conteúdo, controles e feedback.

**Acceptance Scenarios**:

1. **Given** que abro qualquer fluxo incluído, **When** leio e interajo com a interface, **Then** encontro textos legíveis, hierarquia visual clara, ações identificáveis e baixo nível de complexidade cognitiva.
2. **Given** que uso mouse, toque ou teclado, **When** navego por controles interativos, **Then** os alvos são fáceis de acionar, o foco é visível e nenhuma função depende exclusivamente de cor, gesto ou ícone sem nome acessível.
3. **Given** que uso leitor de tela, **When** navego por páginas e formulários, **Then** a estrutura semântica, labels, estados e mensagens são anunciados de forma compreensível.
4. **Given** que estou em desktop, tablet ou celular, **When** redimensiono ou acesso a plataforma, **Then** conteúdo e funções continuam disponíveis sem perda de informação ou ação necessária.
5. **Given** que estou em celular, **When** preencho formulários, **Then** os campos se organizam em uma coluna sempre que necessário e podem ser utilizados sem rolagem horizontal do formulário.
6. **Given** que uma ação termina, falha, aguarda ou requer confirmação, **When** observo ou navego pela interface, **Then** seu feedback é claro, perceptível e não depende apenas de cor.

## Edge Cases

- CPF, e-mail ou telefone já associados a uma conta: não indicar sucesso nem revelar dados da conta existente; o comportamento de recuperação ou vinculação depende da decisão de autenticação.
- Cadastro enviado com dados inválidos em frontend ou backend: preservar entradas válidas quando possível, identificar campos incorretos e nunca apresentar sucesso falso.
- Usuário sem Tutor, com múltiplos Tutores, autorização parcial, revogação durante sessão ou Tutor sem vínculos ativos: negar imediatamente conteúdo não autorizado e manter cada vínculo isolado.
- Parceiro sem disponibilidade, perfil incompleto ou tipo de atuação alterado: não apresentar como opção compatível até que os requisitos de disponibilidade e perfil definidos sejam satisfeitos.
- Busca sem resultados ou serviço indisponível: explicar o estado sem exibir correspondências incompatíveis como disponíveis.
- Solicitações aceitas, recusadas ou canceladas simultaneamente ou em estados desatualizados: impedir transições incompatíveis e apresentar o estado persistido mais recente. Regras de concorrência e transições permitidas precisam de esclarecimento.
- Datas ou horários passados, formatos ambíguos, fusos horários ou mudanças de disponibilidade após solicitação: validar segundo regras a definir; não adivinhar a regra temporal.
- Compromisso compartilhado com Tutor sem permissão de saúde: não incluir detalhes em listas, notificações, histórico ou qualquer outra superfície visível ao Tutor.
- Falha de rede, carregamento demorado ou erro interno: mostrar estado compreensível e opção segura de tentar novamente quando aplicável; não expor mensagem técnica nem duplicar criação de solicitação.
- Viewport estreito, zoom, navegação por teclado, leitor de tela e textos de erro longos: manter conteúdo, foco, leitura e ações utilizáveis sem sobreposição ou perda.

## Requirements

### Requisitos funcionais

- **FR-001**: O sistema DEVE apresentar nome/logo CuidaFácil, a mensagem principal literal, as áreas Cuidadores, Transporte e Saúde com descrições curtas e o botão “Começar Agora”, em uma apresentação acolhedora, simples e acessível.
- **FR-002**: O sistema DEVE apresentar a pergunta “Bem-vindo! Como você deseja acessar?” e as opções de perfil com os textos especificados para Usuário, Tutor e Parceiro.
- **FR-003**: O sistema DEVE encaminhar a seleção de perfil ao fluxo de cadastro correspondente e manter as distinções entre os três perfis.
- **FR-003a**: Cada pessoa DEVE possuir somente um dos perfis de produto (Usuário, Tutor ou Parceiro); não é permitido acumular ou alternar papéis na mesma conta.
- **FR-004**: O sistema DEVE permitir cadastro inicial de Usuário com nome completo, CPF, data de nascimento, telefone e e-mail.
- **FR-005**: O sistema DEVE validar nome, CPF, data de nascimento, telefone e e-mail no frontend e no backend, identificando campos inválidos com mensagens compreensíveis.
- **FR-006**: O sistema DEVE indicar campos obrigatórios de forma visível e acessível. A lista exata de obrigatoriedade deve ser definida em `/speckit.clarify`.
- **FR-007**: O sistema DEVE permitir complementação dos dados adicionais necessários ao uso, após identificação e esclarecimento dos dados requeridos.
- **FR-008**: O sistema DEVE permitir cadastro de Tutor com nome completo, CPF, data de nascimento, telefone e e-mail, aplicando validações equivalentes às do cadastro de Usuário.
- **FR-009**: O sistema DEVE permitir que um Tutor acompanhe um ou mais Usuários somente após autorização explícita do Usuário correspondente.
- **FR-009a**: Um Usuário DEVE poder autorizar mais de um Tutor, mantendo um vínculo e permissões independentes para cada Tutor.
- **FR-009b**: Um Tutor DEVE poder acompanhar mais de um Usuário, mantendo um vínculo independente e autorização explícita para cada Usuário.
- **FR-009c**: O Tutor ou o Usuário PODE iniciar a solicitação de vínculo; independentemente de quem iniciou, o Usuário DEVE autorizar explicitamente antes de qualquer acesso do Tutor.
- **FR-009d**: O Usuário DEVE autorizar ou recusar a solicitação de vínculo dentro da plataforma, em sessão autenticada, após ver a identidade do solicitante e o escopo da autorização.
- **FR-010**: O sistema DEVE permitir que o Usuário consulte e controle informações compartilhadas com cada Tutor e deve aplicar revogações às consultas posteriores.
- **FR-011**: O sistema DEVE impedir que Tutor acesse dados, solicitações, compromissos ou notificações fora das permissões concedidas, incluindo dados de saúde.
- **FR-012**: O sistema DEVE permitir cadastro inicial de Parceiro com nome completo, CPF, data de nascimento, telefone e e-mail, com validação de dados pessoais.
- **FR-013**: O sistema DEVE classificar Parceiro como Cuidador ou Motorista e apresentar formulários e solicitações compatíveis com o tipo de atuação.
- **FR-014**: O sistema DEVE permitir registrar experiência, especialidades, disponibilidade, área de atendimento e informações profissionais para Cuidador.
- **FR-015**: O sistema DEVE permitir registrar categoria de atuação, disponibilidade, área de atendimento, características de transporte e informações profissionais para Motorista.
- **FR-016**: O sistema DEVE autenticar pessoas e autorizar funções por perfil e permissão, proteger rotas e negar acesso direto não autorizado.
- **FR-017**: O sistema NÃO DEVE armazenar senhas em texto puro. O mecanismo de autenticação, verificação e recuperação de credenciais deve ser definido em `/speckit.clarify`.
- **FR-018**: O sistema DEVE apresentar ao Usuário uma área inicial com acesso a Meu perfil, Cuidadores, Transporte, Saúde, Solicitações, Histórico, Notificações e Configurações.
- **FR-019**: O sistema DEVE apresentar as ações principais do Usuário sem excesso de informação concorrente.
- **FR-020**: O sistema DEVE permitir visualizar, pesquisar, filtrar e abrir perfis de cuidadores disponíveis.
- **FR-021**: O sistema DEVE permitir consultar informações profissionais e disponibilidade publicadas de cuidadores.
- **FR-022**: O sistema DEVE permitir que Usuário solicite atendimento de Cuidador e acompanhe a solicitação criada.
- **FR-022a**: O sistema DEVE permitir que um Usuário tenha atendimentos ativos de mais de um Cuidador simultaneamente, mantendo solicitações, horários e históricos independentes.
- **FR-023**: O sistema DEVE permitir solicitar transporte com origem, destino, data, horário e necessidades especiais.
- **FR-024**: O sistema DEVE apresentar somente motoristas disponíveis e compatíveis com os dados de transporte conforme regras de compatibilidade a esclarecer.
- **FR-025**: O sistema DEVE permitir acompanhar solicitações de transporte e consultar seu histórico.
- **FR-026**: O sistema DEVE permitir organizar consultas, exames, compromissos, acompanhamentos e lembretes.
- **FR-027**: O sistema DEVE separar próximos compromissos de seu histórico e proteger informações de saúde por autorização explícita.
- **FR-028**: O sistema NÃO DEVE realizar diagnósticos, prescrições ou recomendações médicas nem representar acompanhamento organizacional como orientação clínica.
- **FR-029**: O sistema DEVE oferecer ao Tutor uma área para consultar Usuários vinculados, selecionar um Usuário e visualizar apenas conteúdo autorizado.
- **FR-030**: O sistema DEVE permitir ao Tutor acompanhar solicitações e compromissos autorizados, auxiliar na organização e receber notificações permitidas.
- **FR-031**: O sistema DEVE oferecer ao Parceiro acesso ao perfil, disponibilidade, solicitações, serviços agendados, histórico e atualização de informações profissionais permitidas.
- **FR-032**: O sistema DEVE mostrar a cada Parceiro somente solicitações compatíveis com seu tipo de atuação.
- **FR-033**: O sistema DEVE permitir ao Parceiro aceitar ou recusar solicitações compatíveis e comunicar o resultado às partes autorizadas.
- **FR-034**: As solicitações DEVEM ter estados visíveis e compreensíveis. Os estados explicitamente definidos são Pendente, Aceita, Em andamento, Concluída e Cancelada; o estado persistente para recusa e suas transições devem ser esclarecidos.
- **FR-035**: O sistema DEVE permitir ao Usuário consultar o estado atual de suas solicitações e histórico de atendimentos e transportes.
- **FR-036**: O sistema DEVE permitir cancelamento pelo Usuário segundo regras e limites que precisam ser esclarecidos, e comunicar o resultado às partes pertinentes.
- **FR-037**: O sistema DEVE disponibilizar notificações para solicitação criada, aceita, recusada ou cancelada, compromisso próximo e atualização relevante, respeitando autorização e privacidade.
- **FR-038**: Canais, destinatários, preferências, conteúdo e temporização de notificações DEVEM ser especificados em `/speckit.clarify` antes da implementação.
- **FR-039**: Formulários DEVEM incluir labels explícitos, indicação acessível de obrigatoriedade e mensagens claras associadas aos respectivos campos.
- **FR-040**: A interface DEVE mostrar estados de sucesso, erro, carregamento e confirmação de ações relevantes.
- **FR-041**: Erros técnicos internos NÃO DEVEM ser expostos diretamente ao Usuário final; falhas não devem ser representadas como operações concluídas.
- **FR-042**: Entradas de usuário DEVEM ser validadas tanto no frontend quanto no backend, inclusive dados pessoais e valores específicos de cada formulário.
- **FR-043**: A experiência DEVE priorizar legibilidade, hierarquia visual clara, controles e áreas de toque grandes, navegação simples, textos objetivos e baixo nível de complexidade cognitiva.
- **FR-044**: Ícones sem texto adjacente DEVEM possuir nome acessível que explique sua função.
- **FR-045**: A interface DEVE ser utilizável por teclado, apresentar foco visível, estrutura semântica e labels acessíveis, além de ser compatível com leitores de tela.
- **FR-046**: A interface DEVE ser responsiva para desktop, tablet e celular; formulários móveis DEVEM usar uma coluna quando necessário e evitar perda de ações ou informação.
- **FR-047**: O sistema DEVE manter dados e funções separados por perfil e limitar a apresentação de informações aos acessos autorizados.

### Requisitos não funcionais

- **NFR-001 — Acessibilidade**: fluxos de landing, cadastro, autenticação, busca, solicitação, acompanhamento e organização devem satisfazer os requisitos de teclado, foco, semântica, leitor de tela, contraste e legibilidade desta especificação. A norma e os critérios formais de conformidade devem ser definidos em `/speckit.clarify`.
- **NFR-002 — Segurança e privacidade**: dados pessoais e informações de saúde devem ser protegidos por autenticação, autorização por perfil, validação de acesso em todas as superfícies e armazenamento seguro de credenciais.
- **NFR-003 — Responsividade**: funcionalidades incluídas devem permanecer acessíveis em desktop, tablet e celular, sem perda de conteúdo ou operação.
- **NFR-004 — Clareza da experiência**: sucesso, erro, carregamento, confirmação, ausência de resultados e ausência de disponibilidade devem ser comunicados em linguagem clara e não técnica.
- **NFR-005 — Testabilidade e rastreabilidade**: requisitos e critérios de aceitação devem ser identificáveis para decomposição em tarefas e vinculáveis a implementação e testes automatizados de funções críticas.
- **NFR-006 — Manutenibilidade**: a implementação deve ser modular, legível e testável; decisões de produto não especificadas não devem ser codificadas como pressupostos.
- **NFR-007 — Desempenho**: o desempenho deve ser adequado para uso cotidiano, mas metas, condições de medição e limites quantitativos ainda não foram definidos e devem ser esclarecidos em `/speckit.clarify`.

## Entidades principais

- **Conta**: identidade de acesso associada a uma pessoa e a um perfil; inclui dados de autenticação, cujo mecanismo precisa ser esclarecido.
- **Perfil de Usuário**: dados pessoais do Usuário, dados adicionais necessários, preferências e permissões concedidas a Tutores.
- **Perfil de Tutor**: dados pessoais do Tutor e relações autorizadas com um ou mais Usuários.
- **Vínculo e autorização**: relação entre um Tutor e um Usuário, contendo estado de autorização e permissões controladas pelo Usuário.
- **Perfil de Parceiro**: dados pessoais, tipo de atuação, informações profissionais, área de atendimento e disponibilidade.
- **Solicitação**: pedido de atendimento ou transporte, solicitante, Parceiro compatível quando aplicável, dados do serviço, estado e histórico de mudanças.
- **Compromisso**: item de organização de saúde, categoria, dados temporais e histórico; conteúdo sensível sujeito a autorização.
- **Notificação**: evento, destinatário autorizado, conteúdo informativo, data de disponibilização e referência ao objeto relacionado, sem exposição de conteúdo não autorizado.
- **Histórico**: registros de solicitações e atendimentos anteriores apresentados somente aos perfis autorizados.

## Success Criteria

### Resultados mensuráveis

- **SC-001**: cada fluxo de landing e seleção de perfil pode ser concluído do início ao destino correto e possui critérios de aceitação verificáveis.
- **SC-002**: todos os formulários da primeira versão validam entradas no frontend e backend, indicam obrigatoriedade e associam mensagens a campos específicos.
- **SC-003**: nenhum cenário de teste de autorização permite que Tutor visualize informação não concedida pelo Usuário, inclusive após revogação e em notificações.
- **SC-004**: solicitações de cuidador e transporte podem ser criadas, consultadas e acompanhadas pelos estados definidos; cada transição permitida possui teste correspondente.
- **SC-005**: os três perfis acessam somente as áreas e solicitações compatíveis com suas permissões e atuação, conforme verificado por testes funcionais.
- **SC-006**: os fluxos críticos definidos pelas histórias P1 possuem testes automatizados rastreáveis aos IDs de requisito e história.
- **SC-007**: os fluxos cobertos podem ser percorridos em desktop, tablet e celular, por teclado, e a estrutura de controles é anunciável por leitor de tela.
- **SC-008**: não há diagnósticos, prescrições ou recomendações médicas em fluxos, mensagens, notificações ou estados definidos nesta especificação.

## Decisões em aberto para `/speckit.clarify`

Nenhuma decisão abaixo deve ser resolvida por suposição. As respostas devem atualizar esta especificação antes que as tarefas dependentes sejam implementadas.

1. **CL-01 — Referências visuais**: onde estão as telas de referência mencionadas? Qual identidade visual, layouts, componentes ou conteúdo nelas é normativo?
2. **CL-02 — Obrigatoriedade dos cadastros**: quais campos de Usuário, Tutor e Parceiro são obrigatórios? CPF, e-mail e telefone devem ser únicos entre contas? Quais regras de duplicidade e recuperação são esperadas?
3. **CL-03 — Autenticação e ativação**: qual método de login, criação/armazenamento de senha, verificação de e-mail/telefone e recuperação de acesso será usado? Cadastro cria conta ativa imediatamente ou depende de confirmação?
4. **CL-04 — Elegibilidade do Usuário — Resolvida parcialmente**: está confirmado que o Usuário é adulto (18 anos ou mais) que necessita de apoio, sem exigência de idade mínima de 60 anos; menores ficam fora do fluxo inicial e exigem representante e fluxo próprio antes de serem incluídos. Permanece em aberto como auxiliar adultos que não conseguem completar uma ação ou consentimento sozinhos e quais regras de representação se aplicam.
5. **CL-05 — Dados complementares do Usuário**: quais dados são necessários para usar cada serviço, quais são obrigatórios e quando são solicitados?
6. **CL-06 — Autorização e vínculo Tutor-Usuário — Resolvida parcialmente**: está confirmado que cada pessoa tem somente um papel; Usuário pode autorizar vários Tutores e Tutor pode acompanhar vários Usuários, com vínculo independente; ambos podem iniciar solicitação; o Usuário autoriza ou recusa em sessão autenticada após ver solicitante e escopo, e não há acesso antes do aceite. Permanece em aberto como identificar participantes, quais permissões granulares existem, como expiram/rejeitam/reconvidam vínculos e como revogação afeta sessões/notificações; representação assistida também permanece em CL-04.
7. **CL-07 — Dados profissionais e verificação de Parceiro**: quais campos concretos definem informações profissionais, categorias de motorista, características de transporte, especialidades, documentos ou validações? Há aprovação antes de publicar ou receber solicitações?
8. **CL-08 — Disponibilidade e compatibilidade**: como Parceiros informam disponibilidade, área atendida e capacidade? Quais regras determinam compatibilidade para cuidador e transporte, inclusive necessidades especiais?
9. **CL-09 — Busca e filtros**: quais campos de pesquisa e filtros são suportados, quais critérios ordenam resultados e como são apresentados perfis sem disponibilidade?
10. **CL-10 — Solicitação de cuidador — Resolvida parcialmente**: está confirmado que um Usuário pode ter atendimentos ativos de mais de um Cuidador simultaneamente. Permanecem em aberto os dados, data/duração, local e confirmação necessários, e se o Usuário escolhe um profissional por pedido, recebe correspondências ou usa atribuição automática.
11. **CL-11 — Solicitação de transporte**: origem/destino são endereço livre ou local selecionável? São permitidos trajetos de ida e volta, acompanhantes ou recorrência? Quais detalhes de necessidade especial são coletados e quais regras de validação temporal se aplicam?
12. **CL-12 — Estados e transições de solicitação**: “Recusada” é um estado persistente? Quem pode cancelar e em quais estados? Como são tratadas recusa, expiração, reagendamento, indisponibilidade após aceitação e atualizações concorrentes?
13. **CL-13 — Saúde e lembretes**: quais campos e categorias existem para cada compromisso? Quais ações de editar/excluir são permitidas, quais datas/antecedências de lembrete e quais canais são necessários?
14. **CL-14 — Notificações**: quais eventos notificam cada perfil, qual conteúdo pode ser compartilhado, quais canais (interno, e-mail, SMS ou outros) e quais preferências são configuráveis?
15. **CL-15 — Configurações e gestão de conta**: quais configurações fazem parte do MVP? Há requisitos para desativação/exclusão de conta, exportação ou correção de dados?
16. **CL-16 — Acessibilidade formal**: qual padrão/nível de conformidade e quais limites mensuráveis de contraste, tipografia, alvo de toque e zoom devem ser adotados?
17. **CL-17 — Responsividade e navegadores**: quais larguras ou breakpoints de referência, navegadores e versões são suportados?
18. **CL-18 — Desempenho**: quais metas de tempo de carregamento e resposta, dispositivos e condições de rede devem ser usados para medir “desempenho adequado”?
19. **CL-19 — Privacidade operacional**: quais regras de retenção, auditoria, compartilhamento, consentimento, localização de dados e conformidade aplicam-se a dados pessoais e de saúde?
20. **CL-20 — Escopo MVP**: todos os fluxos P1 desta especificação pertencem à primeira entrega ou há uma fronteira menor de MVP? Quais capacidades ficam disponíveis sem parceiro cadastrado ou sem dados de disponibilidade?

## Assumptions

- Os três perfis descritos são os perfis de produto da primeira versão; cada pessoa possui um único papel. O Usuário da primeira versão é adulto com 18 anos ou mais que necessita de apoio; menores ficam fora do fluxo inicial até que um fluxo próprio com representante seja especificado.
- “Saúde” significa organização e acompanhamento de informações e compromissos, nunca avaliação clínica.
- Cuidador e Motorista são os dois tipos de atuação conhecidos para Parceiro; nenhum terceiro tipo está implícito.
- Os estados Pendente, Aceita, Em andamento, Concluída e Cancelada são os estados fornecidos para solicitações; a recusa permanece em aberto conforme CL-12.
- Nenhuma imagem de referência foi incluída nos arquivos acessíveis durante a elaboração; detalhes visuais não descritos permanecem em aberto.
- As histórias P1 formam a base funcional prioritária; a decisão final sobre a fronteira do MVP requer resposta à CL-20.
