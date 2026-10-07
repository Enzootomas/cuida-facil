# Esclarecimentos de produto — CuidaFácil

Este registro usa os mesmos IDs `CL-xx` da seção **Decisões em aberto para `/speckit.clarify`** em [spec.md](./spec.md). Sugestões são interpretações possíveis, não decisões aprovadas e não autorização para implementar. Respostas confirmadas devem ser refletidas na especificação, no plano e nos contratos/modelos afetados.

## Prioridade P0 — Acesso, identidade, elegibilidade e dados sensíveis

### CL-01 — Referências visuais

**Pergunta**: Onde estão as telas de referência citadas? Quais identidade visual, layouts, componentes e conteúdos nelas são normativos?

**Situação**: não foram encontradas imagens no workspace; a especificação usa somente o conteúdo textual.  
**Sugestão não aprovada**: aprovar as referências antes de fixar identidade visual, cores ou layout.

### CL-02 — Obrigatoriedade e unicidade dos cadastros

**Pergunta**: Quais campos são obrigatórios em cada perfil? CPF, e-mail e telefone são únicos entre contas? Como tratar dados já associados?

**Sugestão não aprovada**: marcar obrigatoriedade explicitamente e não revelar se uma conta existe ao tratar duplicidade.

### CL-03 — Autenticação, ativação e recuperação

**Pergunta**: Qual método de autenticação será usado? E-mail e telefone precisam de verificação? Quando uma conta é ativada? Como recuperar senha/acesso?

**Sugestão técnica não aprovada como decisão de produto**: sessão server-side segura para navegador; se senha for adotada, hash forte; recuperação com resposta que não enumere contas. Método, canais, ativação e fluxo devem ser aprovados.

### CL-04 — Elegibilidade do Usuário e representação

**Decisão confirmada pelo usuário**: o perfil Usuário é para adultos que necessitam de apoio, incluindo pessoas idosas, sem exigir idade mínima de 60 anos. Menores ficam fora do fluxo inicial; eventual atendimento exige representante e fluxo próprio, especificado antes da inclusão.

**Pergunta em aberto**: como atender um Usuário adulto que não consegue concluir alguma ação ou consentimento por conta própria? Qual representação, comprovação e limites se aplicam?

**Sugestão não aprovada**: não aceitar consentimento de Tutor como substituto do Usuário sem fluxo de representação formalmente definido.

### CL-05 — Dados complementares e endereço de cadastro

**Perguntas**: Quais dados adicionais são necessários para o Usuário usar cada serviço? Endereço residencial é requerido? Quais campos são obrigatórios e em qual etapa devem ser solicitados?

**Sugestão não aprovada**: coletar progressivamente somente dados necessários à função escolhida e não exigir endereço residencial sem finalidade aprovada.

### CL-06 — Papéis, vínculo Tutor–Usuário e permissões

**Decisões confirmadas pelo usuário**:
- Cada pessoa possui somente um papel de produto; não acumula Usuário e Tutor nem alterna papéis na mesma conta.
- Um Usuário pode autorizar vários Tutores, cada vínculo com permissões próprias.
- Um Tutor pode acompanhar vários Usuários, com autorização individual para cada vínculo.
- Tutor ou Usuário podem iniciar uma solicitação de vínculo.
- O Usuário autoriza ou recusa o vínculo dentro da plataforma, em sessão autenticada, após ver a identidade do solicitante e o escopo da autorização; antes disso, Tutor não acessa dados.

**Perguntas em aberto**: como iniciar/identificar o participante sem enumerar contas? Quais permissões granulares existem e quais são padrão? Como expira, rejeita, reconvida e remove um vínculo? Como tratar Usuário que necessita de representação assistida?

**Sugestão não aprovada**: negar por padrão e conceder permissões individualmente por Tutor/categoria; revogação deve bloquear acessos futuros. Granularidade e efeito sobre sessões/notificações precisam de decisão.

### CL-07 — Dados profissionais, aprovação e documentos de Parceiro

**Perguntas**: Quais campos definem experiência, especialidades, categorias e características do transporte? Exige-se aprovação manual? Quais documentos ou validações profissionais, habilitação, veículo e capacidade de transporte são requeridos? Quem aprova e por quanto tempo são válidos?

**Sugestão não aprovada**: não rotular um Parceiro como verificado nem distribuir pedidos antes de critérios definidos e aprovados; não inventar documentos obrigatórios.

### CL-08 — Disponibilidade, área e compatibilidade de serviço

**Perguntas**: Como Parceiros informam horários, dias, pausas, antecedência, área e capacidade? Quais regras determinam compatibilidade de Cuidador e Motorista, inclusive com necessidades especiais?

**Sugestão não aprovada**: revalidar disponibilidade antes do aceite e impedir dupla confirmação incompatível. Recorrência, fuso, reserva e compatibilidade dependem de decisão.

## Prioridade P1 — Seleção, execução e privacidade de serviço

### CL-09 — Busca, filtros e ordenação

**Perguntas**: Quais campos de busca, filtros e critérios de ordenação existem? Como perfis indisponíveis são apresentados?

**Sugestão não aprovada**: apresentar filtros ativos e estado vazio claro; não inferir ranking pago, recomendação ou avaliação sem requisito.

### CL-10 — Escolha e quantidade de cuidadores

**Decisão confirmada pelo usuário**: um Usuário pode ter atendimentos ativos de mais de um Cuidador simultaneamente.

**Perguntas em aberto**: o Usuário escolhe um Cuidador para cada pedido, recebe correspondências para escolher ou o sistema atribui? Pode ter mais de um Cuidador em pedidos diferentes? Há preferência recorrente?

**Sugestão não aprovada**: seleção direta de um Cuidador por pedido é uma opção, mas não foi aprovada; a implementação deve aguardar resposta.

### CL-11 — Transporte, escolha do Motorista e localização

**Perguntas**: O Usuário escolhe motorista ou há atribuição? Origem e destino são texto, endereço selecionado, mapa ou GPS? São aceitos ida e volta, recorrência e acompanhante? Que capacidades são compatíveis com necessidades especiais? Endereço pode ser compartilhado com Tutor/Parceiro e em que estágio?

**Sugestão não aprovada**: não fazer rastreamento contínuo nem coleta de GPS em segundo plano sem decisão explícita; liberar localização somente quando necessária e autorizada.

### CL-12 — Estados, recusa, cancelamento e transições

**Perguntas**: “Recusada” é estado persistente? Quem pode cancelar em cada estado? Existem prazo, justificativa, consequência, expiração ou reagendamento? O que ocorre após início e diante de mudanças simultâneas?

**Sugestão não aprovada**: transições explícitas e atômicas; não oferecer cancelamento unilateral depois do início sem regra aprovada.

### CL-13 — Compromissos de saúde e lembretes

**Perguntas**: Quais campos/categorias são necessários? Quem pode criar, alterar ou excluir? Qual antecedência e fuso do lembrete? Quais dados de compromisso podem ser compartilhados com Tutor?

**Sugestão não aprovada**: armazenar somente dados de organização necessários e sem aconselhamento clínico; detalhes continuam sujeitos à ACL aprovada.

### CL-14 — Notificações

**Perguntas**: Quais eventos notificam cada perfil? Quais destinatários e conteúdo são permitidos? Quais canais (in-app, e-mail, SMS, push), preferências, leitura e temporização?

**Sugestão não aprovada**: começar com central interna se aprovada e manter mensagens externas mínimas; nenhum canal externo deve ser presumido.

### CL-15 — Configurações e gestão de conta

**Perguntas**: Quais configurações entram no MVP? Há desativação/exclusão de conta, exportação ou correção? Como se conciliam solicitações de exclusão com retenção de histórico/auditoria?

**Sugestão não aprovada**: disponibilizar apenas controles cuja semântica e efeito foram aprovados; retenção e exclusão dependem da política aplicável.

## Prioridade P2 — Conformidade, operação e MVP

### CL-16 — Critério formal de acessibilidade

**Perguntas**: Qual padrão e nível de conformidade serão critérios de aceite? Quais limites mensuráveis de contraste, tipografia, alvos de toque e zoom?

**Sugestão não aprovada**: WCAG 2.2 AA pode servir como referência inicial, mas só passa a ser compromisso após aprovação.

### CL-17 — Dispositivos, responsividade e navegadores

**Perguntas**: Quais larguras/breakpoints, navegadores/versões e tecnologias assistivas serão oficialmente suportados?

**Sugestão não aprovada**: definir matriz compatível com o público e testar layouts em celular, tablet e desktop; faixas formais precisam de aprovação.

### CL-18 — Metas de desempenho

**Perguntas**: Quais limites de carregamento/resposta, dispositivos, rede e volume devem medir “desempenho adequado”?

**Sugestão não aprovada**: estabelecer SLOs após conhecer hospedagem e cenário de uso; não declarar limite mensurável sem aceitação.

### CL-19 — Privacidade operacional, acesso de Parceiro e retenção

**Perguntas**: Quais dados do Usuário o Parceiro vê antes/depois de aceitar e após conclusão? Quais dados de saúde podem ser vistos pelo Tutor e compartilhados em notificações? Quais regras de consentimento, auditoria, retenção, correção, exclusão, localização dos dados e conformidade legal se aplicam?

**Sugestão não aprovada**: minimizar dados, negar acesso por padrão e liberar apenas o necessário conforme autorização e etapa do serviço; não incluir conteúdo de saúde em notificação sem autorização específica.

### CL-20 — Limite do MVP

**Perguntas**: Todos os fluxos P1 estão na primeira entrega ou há corte menor? O que fazer quando não há Parceiro ou disponibilidade?

**Sugestão não aprovada**: estados vazios úteis e sem prometer oferta inexistente; fronteira final e prioridades dependem de aprovação de produto.

## Próxima pergunta pendente

As decisões confirmadas em CL-04 e CL-06 e a possibilidade de atendimentos simultâneos em CL-10 já foram incorporadas à especificação. A seleção do Cuidador em CL-10 continua sem resposta. Não considerar a sugestão de seleção direta como aprovada.
