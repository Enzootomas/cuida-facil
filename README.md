# Cuida Fácil

**Mobilidade acessível e acompanhamento para facilitar o acesso à saúde.**

O Cuida Fácil é uma proposta de aplicação web que conecta pessoas com deficiência, mobilidade reduzida e idosos a motoristas e acompanhantes, considerando suas necessidades durante o deslocamento para consultas, exames e outros compromissos de saúde.

O projeto será desenvolvido em um Hackathon de Frameworks Front-end, com duração de **4 horas**. A entrega será um **site interativo, sem backend**, que demonstra a jornada do passageiro e do familiar responsável.

> **Status:** estrutura inicial criada. Aplicação, protótipo e documentação detalhada ainda serão desenvolvidos. As funcionalidades descritas abaixo representam o escopo proposto, não funcionalidades já entregues.
>
> **Branch de trabalho:** `develop`. A `main` fica reservada para a versão final.

## Navegação

- [ODS](#ods)
- [Problema](#problema)
- [Público-alvo](#público-alvo)
- [Proposta de Valor](#proposta-de-valor)
- [Benchmarking](#benchmarking)
- [Requisitos](#requisitos)
- [User Stories](#user-stories)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Framework Utilizado](#framework-utilizado)
- [Como Executar](#como-executar)
- [Protótipo](#protótipo)
- [Aplicação](#aplicação)
- [Processo de Desenvolvimento](#processo-de-desenvolvimento)
- [Integrantes](#integrantes)
- [Inteligência Artificial](#inteligência-artificial)

## ODS

**ODS 3 — Saúde e bem-estar**

A proposta busca facilitar o acesso a serviços de saúde ao reduzir barreiras de deslocamento e oferecer a opção de acompanhamento.

O transporte até uma consulta faz parte da jornada de acesso ao cuidado. Para quem precisa de um veículo compatível ou de companhia, organizar esse trajeto pode ser uma dificuldade adicional. O Cuida Fácil pretende apoiar essa organização.

## Problema

A equipe identificou como hipótese de problema a dificuldade de pessoas com deficiência, mobilidade reduzida e idosos em encontrar transporte compatível com suas necessidades.

Em serviços convencionais, o passageiro pode ter dificuldade para comunicar antecipadamente a necessidade de auxílio no embarque, espaço para uma cadeira de rodas ou veículo adaptado. Isso pode gerar incompatibilidade entre o atendimento disponível e a necessidade do passageiro, além de atrasos e transtornos.

Outra necessidade é o acompanhamento: familiares nem sempre conseguem acompanhar uma pessoa idosa ou com deficiência em consultas e exames.

Essas hipóteses orientam a proposta e deverão ser aprofundadas na pesquisa da equipe. Não representam uma pesquisa estatística já realizada.

## Público-alvo

- Pessoas com deficiência que precisam de condições específicas de transporte.
- Pessoas com mobilidade reduzida.
- Idosos que precisam de apoio em deslocamentos.
- Familiares e responsáveis que organizam compromissos de saúde.
- Motoristas e acompanhantes interessados em atender esse público.

As necessidades variam entre passageiros. A aplicação deverá permitir informar o apoio necessário, sem presumir que toda pessoa com deficiência precisa do mesmo atendimento.

## Proposta de Valor

| Pergunta | Proposta |
|---|---|
| Qual problema resolvemos? | A dificuldade de organizar transporte compatível e acompanhamento para compromissos de saúde. |
| Para quem? | Pessoas com deficiência, mobilidade reduzida, idosos e seus familiares. |
| Como ajudamos? | Reunindo informações sobre necessidades do passageiro, veículos, motoristas e acompanhantes em um único fluxo. |
| Qual valor entregamos? | Mais clareza na escolha do atendimento, apoio à autonomia e melhor organização do deslocamento para serviços de saúde. |

### Por que a solução seria útil?

O diferencial é considerar as necessidades do passageiro **antes da confirmação do transporte**. A escolha deverá apresentar informações sobre o veículo e o apoio oferecido pelo motorista.

A opção de acompanhante atende situações como a de um familiar que precisa organizar a ida de sua mãe idosa a uma consulta, mas não pode estar presente. Na proposta, ele poderá consultar o perfil do acompanhante e acompanhar o andamento do atendimento.

No hackathon, esses benefícios serão demonstrados por uma experiência interativa. Sua efetividade em um serviço real precisaria de validação com usuários.

### Exemplo de uso

1. Um familiar informa quem será o passageiro e o destino da consulta.
2. Registra as necessidades de acessibilidade e apoio.
3. Escolhe um motorista com veículo compatível.
4. Seleciona um acompanhante, caso necessário.
5. Confere as informações e confirma a solicitação demonstrativa.
6. Acompanha as etapas simuladas do trajeto.
7. Consulta o histórico e registra uma avaliação.

## Benchmarking

**Pendente:** pesquisar e comparar **5 soluções existentes** relacionadas ao problema.

Para cada solução, a equipe deverá registrar:

- Nome e fonte consultada.
- Funcionalidades e público-alvo.
- Pontos positivos e negativos observados.
- Características utilizadas como referência no Cuida Fácil.

A comparação detalhada será organizada em [docs/benchmarking](docs/benchmarking/). Esta seção será atualizada com os resultados e as referências efetivamente utilizadas.

## Requisitos

**Pendente:** definir e documentar **10 requisitos funcionais e 10 requisitos não funcionais**.

Os requisitos funcionais deverão descrever ações verificáveis do usuário. Os não funcionais deverão estabelecer critérios de qualidade, como responsividade, acessibilidade e organização do código.

Documentação prevista em [docs/requisitos](docs/requisitos/).

## User Stories

**Pendente:** transformar os requisitos em histórias de usuário, com critérios de aceitação.

Modelo:

> Como [tipo de usuário], quero [ação], para [objetivo ou benefício].

Cada história deverá incluir critérios que permitam verificar sua implementação e indicar o requisito relacionado.

Documentação prevista em [docs/user-stories](docs/user-stories/).

## Funcionalidades

**Escopo proposto, sujeito à definição dos requisitos pela equipe:**

| Funcionalidade | Interação prevista |
|---|---|
| Identificação do passageiro | Informar os dados demonstrativos de quem utilizará o serviço. |
| Solicitação de transporte | Preencher origem e destino do compromisso de saúde. |
| Necessidades de acessibilidade | Selecionar o apoio necessário e as condições do veículo. |
| Escolha do motorista | Consultar opções demonstrativas e selecionar uma opção compatível. |
| Perfil do motorista | Visualizar informações do profissional e do veículo. |
| Escolha do acompanhante | Consultar opções e adicionar acompanhamento à solicitação. |
| Perfil do acompanhante | Visualizar informações sobre o apoio oferecido. |
| Confirmação | Revisar as escolhas e confirmar a solicitação demonstrativa. |
| Acompanhamento do trajeto | Visualizar etapas e localização simuladas, identificadas como demonstração. |
| Histórico e avaliação | Consultar solicitações demonstrativas e avaliar a experiência. |

### Limites da demonstração

A entrega será exclusivamente front-end. Não haverá operação real de transporte, contratação de profissionais, pagamento ou autenticação segura.

A localização será **simulada**, sem rastreamento real entre dispositivos. Os perfis serão fictícios e identificados como dados demonstrativos; não haverá verificação real de motoristas ou acompanhantes.

O acompanhante representa apoio durante trajetos e compromissos. A proposta não define atendimento clínico ou substituição de profissionais de saúde.

## Tecnologias Utilizadas

| Tecnologia ou ferramenta | Situação e finalidade |
|---|---|
| Git e GitHub | Utilizados para versionamento e colaboração. |
| GitHub Projects | Quadro Kanban criado para gestão das atividades. |
| Framework Front-end | A definir pela equipe. |
| HTML, CSS e JavaScript/TypeScript | Uso e linguagem final a confirmar conforme o framework escolhido. |
| Dados demonstrativos | Previstos para demonstrar o fluxo sem backend. |
| Armazenamento no navegador | Possibilidade a avaliar para manter solicitações locais. |
| Plataforma de deploy | A definir. |
| Ferramenta de prototipação | A definir. |

## Framework Utilizado

**A definir pela equipe.**

Esta seção será atualizada com o framework escolhido, sua versão e a justificativa da escolha.

## Como Executar

A aplicação ainda não foi inicializada. Portanto, não há comandos de instalação ou execução confirmados.

O código será organizado em [frontend](frontend/). Após a definição do framework, esta seção deverá conter:

1. Pré-requisitos e versões.
2. Comandos de instalação.
3. Comando para iniciar a aplicação.
4. Endereço local.
5. Comando para gerar a versão de produção.

## Protótipo

**Status:** pendente.

O protótipo deverá conter **no mínimo 10 telas**, apresentar o fluxo de navegação, componentes principais e adaptação para diferentes tamanhos de tela.

- **URL do protótipo:** a preencher.
- **Materiais:** [docs/prototipo](docs/prototipo/).

O protótipo servirá como referência para a aplicação desenvolvida.

## Aplicação

- **URL da aplicação publicada:** a preencher após o deploy.
- **URL do repositório:** https://github.com/Enzootomas/cuida-facil
- **Branch de desenvolvimento:** https://github.com/Enzootomas/cuida-facil/tree/develop
- **URL do protótipo:** a preencher.
- **URL do GitHub Projects:** a preencher.

## Processo de Desenvolvimento

### Organização do repositório

```text
cuida-facil/
├── README.md                 # Apresentação e documentação principal
├── docs/
│   ├── planejamento/         # Problema, escopo e organização
│   ├── benchmarking/         # Comparação das 5 soluções
│   ├── requisitos/           # Requisitos funcionais e não funcionais
│   ├── user-stories/         # Histórias e critérios de aceitação
│   └── prototipo/            # Telas e fluxo de navegação
└── frontend/                 # Aplicação web
```

Os arquivos `.gitkeep` mantêm as pastas inicialmente vazias no Git.

### Colaboração e versionamento

Consulte o [guia de padrões básicos de Git](docs/planejamento/padroes-git.md) para nomes de branches, mensagens de commit, identificação dos autores e fluxo de Pull Requests.

- `main`: reservada para a versão final.
- `develop`: branch de integração do trabalho da equipe.
- `feature/...`: branches de funcionalidades, criadas a partir de `develop`.
- Pull Requests de trabalho deverão ter `develop` como destino.
- Os commits deverão representar alterações reais e possuir mensagens claras, como `feat:`, `fix:`, `style:` e `docs:`.

Esse fluxo é uma convenção da equipe; a proteção técnica da `main` ainda precisa ser configurada.

### Gestão das atividades

O quadro GitHub Projects utiliza as colunas:

| Coluna | Significado |
|---|---|
| Backlog | Atividades ainda não priorizadas. |
| Ready | Atividades prontas para começar. |
| In Progress | Atividades em execução. |
| In Review | Atividades aguardando revisão. |
| Done | Atividades concluídas e verificadas. |

A criação e organização dos cards ficarão sob responsabilidade de outro integrante, cujo nome será registrado após a definição da equipe.

### Regras e evidências da entrega

O enunciado determina que desenvolvimento, documentação e publicação sejam realizados durante as **4 horas do hackathon**. A estrutura inicial foi criada previamente; a equipe deverá confirmar com o professor como essa preparação será tratada na avaliação.

A equipe informou **5 integrantes**, enquanto o enunciado original estabelece equipes de 4. A composição deverá ser confirmada com o professor.

Como não haverá apresentação oral, o README, o protótipo, o quadro de tarefas, o histórico Git e a aplicação publicada deverão permitir avaliar o trabalho.

### Checklist das entregas

- [ ] Aplicação Front-end funcional e responsiva.
- [ ] Aplicação publicada e acessível pela Internet.
- [x] Repositório Git criado.
- [x] Branch `develop` criada.
- [x] Estrutura inicial de pastas organizada.
- [x] Quadro GitHub Projects criado e vinculado.
- [ ] Mínimo de 50 cards de atividades reais.
- [ ] Mínimo de 30 commits significativos de trabalho.
- [ ] Definição do problema, público, necessidade e objetivo.
- [ ] Benchmarking de 5 soluções existentes.
- [ ] Proposta de valor validada pela equipe.
- [ ] 10 requisitos funcionais.
- [ ] 10 requisitos não funcionais.
- [ ] User Stories com critérios de aceitação.
- [ ] Protótipo com no mínimo 10 telas.
- [ ] Framework escolhido e registrado.
- [ ] Instruções de execução verificadas.
- [ ] README revisado para refletir a entrega final.
- [ ] Links da aplicação, protótipo e Projects preenchidos.
- [ ] Integrantes e responsabilidades registrados.
- [ ] Uso de IA atualizado conforme as ferramentas efetivamente utilizadas.

## Integrantes

**Composição informada pela equipe: 5 pessoas, sujeita à confirmação com o professor.**

| Integrante | Responsabilidade informada |
|---|---|
| Enzo — [@Enzootomas](https://github.com/Enzootomas) | Criação do repositório, convites, estrutura inicial e organização do README. |
| Integrante 2 — a identificar | A definir. |
| Integrante 3 — a identificar | A definir. |
| Integrante 4 — a identificar | A definir. |
| Integrante 5 — a identificar | A definir. |

A responsabilidade pelos cards será atribuída ao integrante definido pela equipe.

## Inteligência Artificial

**Ferramenta utilizada até o momento:** ChatGPT / Codex.

**Utilização:**

- Apoio à organização da proposta e delimitação do escopo front-end.
- Orientações para configuração do repositório e GitHub Projects.
- Criação da estrutura inicial de pastas e da branch `develop`.
- Redação e organização deste README.

A equipe deverá atualizar este registro caso utilize IA na prototipação, implementação, revisão ou identificação de erros.

O conteúdo e o código assistidos por IA deverão ser revisados pela equipe, que permanece responsável pela solução entregue.
