# Histórias de usuário — demonstração Front-end

Cada história corresponde ao RF de mesmo número. Os critérios devem ser testados e registrados; não representam resultados já aprovados.

## US01 — Apresentar a proposta (RF01)

Como visitante, quero conhecer a proposta, para entender se o serviço atende à minha necessidade.

Critérios de aceitação:

- A página apresenta a proposta e os serviços.
- A ação de início abre a seleção/cadastro.

Referência: `LandingPage.tsx` em `cuida-facil-project/src/app/components/`.

## US02 — Selecionar perfil (RF02)

Como visitante, quero escolher meu perfil, para iniciar a jornada adequada.

Critérios de aceitação:

- Cada opção identifica o perfil.
- Após concluir o fluxo, a área apresentada corresponde ao perfil escolhido.

Referência: `Login.tsx` em `cuida-facil-project/src/app/components/`.

## US03 — Preencher identificação demonstrativa (RF03)

Como usuário da demonstração, quero preencher minha identificação de exemplo, para experimentar o cadastro.

Critérios de aceitação:

- Campos têm labels e obrigatoriedade identificável.
- Valores inválidos impedem conclusão e mostram orientação; valores válidos permitem prosseguir.

Referência: `Login.tsx` em `cuida-facil-project/src/app/components/`.

## US04 — Consultar e editar perfil (RF04)

Como usuário da demonstração, quero consultar e editar meu perfil, para manter meus dados de exemplo atualizados.

Critérios de aceitação:

- Os dados atuais são exibidos.
- Após salvar valores válidos, a interface mostra a atualização.

Referência: `Profile.tsx` em `cuida-facil-project/src/app/components/`.

## US05 — Buscar cuidadores (RF05)

Como usuário da demonstração, quero buscar e selecionar cuidadores, para escolher apoio compatível.

Critérios de aceitação:

- As opções apresentam informações do cuidador.
- Filtros disponíveis alteram os resultados; seleção encaminha ao serviço correto.

Referência: `FindCaregiver.tsx` em `cuida-facil-project/src/app/components/`.

## US06 — Buscar transporte (RF06)

Como usuário da demonstração, quero consultar motoristas e veículos, para consultar uma opção de deslocamento.

Critérios de aceitação:

- Cada opção informa motorista e veículo.
- Ao selecionar, a tela seguinte corresponde à opção escolhida.

Referência: `FindDriver.tsx` em `cuida-facil-project/src/app/components/`.

## US07 — Agendar serviço (RF07)

Como usuário da demonstração, quero agendar um serviço demonstrativo, para organizar o compromisso.

Critérios de aceitação:

- Campos exigidos vazios mostram validação.
- Pedido válido apresenta confirmação com os dados escolhidos, sem representar contratação real.

Referência: `Appointment.tsx` em `cuida-facil-project/src/app/components/`.

## US08 — Consultar área do tutor (RF08)

Como familiar no perfil Tutor, quero consultar os familiares apresentados, para acompanhar um familiar.

Critérios de aceitação:

- A área mostra familiares fictícios identificáveis.
- Selecionar um familiar apresenta seu contexto sem misturar informações de outro.

Referência: `TutorDashboard.tsx` em `cuida-facil-project/src/app/components/`.

## US09 — Gerenciar vínculos demonstrativos (RF09)

Como usuário da demonstração, quero responder às solicitações de vínculo, para organizar quem acompanha o usuário.

Critérios de aceitação:

- Solicitações mostram as pessoas envolvidas.
- Aceitar ou recusar atualiza o estado demonstrativo da solicitação.

Referência: `ManageTutors.tsx / TutorRequests.tsx` em `cuida-facil-project/src/app/components/`.

## US10 — Gerenciar pedidos do parceiro (RF10)

Como profissional no perfil Parceiro, quero consultar e responder aos pedidos, para demonstrar o atendimento às solicitações.

Critérios de aceitação:

- Pedidos exibem informações do serviço.
- Ao responder, o estado apresentado é atualizado e a interface confirma a ação.

Referência: `PartnerRequests.tsx` em `cuida-facil-project/src/app/components/`.

Requisitos não funcionais aplicam-se transversalmente às histórias. A execução é local e simulada, sem garantias de autenticação, permissões no servidor ou troca real de dados entre usuários.

Documento elaborado com auxílio de ChatGPT / Codex.
