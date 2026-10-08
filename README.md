# Cuida Fácil

**Mobilidade acessível e acompanhamento para facilitar o acesso à saúde.**

O Cuida Fácil é uma proposta de aplicação web que conecta pessoas com deficiência, mobilidade reduzida e idosos a motoristas e acompanhantes, considerando suas necessidades durante o deslocamento para consultas, exames e outros compromissos de saúde.

O projeto faz parte de um Hackathon de Frameworks Front-end, com duração de **4 horas**. A entrega é um **site interativo, sem backend**, que demonstra a jornada do passageiro e do familiar responsável.

> **Status:** frontend publicado na Vercel. O endereço respondeu com HTTP 200 sem autenticação em 08/10/2026. A validação das funcionalidades, da responsividade e das demais entregas continua pendente.
>
> **Aplicação:** [Abrir Cuida Fácil](https://cuida-facil-qckjx199m-enzootomas-projects.vercel.app)
>
> **Branch de trabalho:** `develop`. A `main` contém a versão destinada à publicação na Vercel.

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

## 🌱 A causa

O acesso à saúde não termina quando uma pessoa consegue marcar uma consulta.

Para muitas pessoas, existe uma etapa anterior que pode ser igualmente desafiadora: **conseguir chegar ao local do atendimento**.

Questões como:

* necessidade de transporte acessível;
* dificuldade de locomoção;
* necessidade de acompanhamento;
* falta de informações sobre o veículo;
* necessidade de apoio durante o trajeto;
* dificuldade para familiares organizarem o deslocamento;

podem transformar um simples compromisso de saúde em uma experiência complexa.

O **Cuida Fácil** surge como uma proposta para aproximar **pessoas que precisam de apoio**, **motoristas** e **acompanhantes**, considerando previamente as necessidades de acessibilidade do passageiro.

> **Acreditamos que cuidar também significa facilitar o caminho até o cuidado.**

---

## 🎯 Nosso propósito

O propósito do Cuida Fácil é contribuir para que o deslocamento até serviços de saúde seja pensado de forma mais **acessível, organizada e inclusiva**.

A proposta considera as necessidades da pessoa antes da solicitação do transporte, permitindo que informações relacionadas à acessibilidade sejam consideradas durante a organização do deslocamento.

Dessa forma, a tecnologia é utilizada como uma ferramenta de apoio para:

**Identificar → Compreender → Organizar → Acompanhar → Facilitar**

---

## ODS

O Cuida Fácil está relacionado a dois Objetivos de Desenvolvimento Sustentável:

| ODS | Relação com a proposta |
|---|---|
| **ODS 3 — Saúde e bem-estar** | Facilitar o acesso a consultas, exames e outros serviços de saúde por meio de transporte compatível e acompanhamento. |
| **ODS 10 — Redução das desigualdades** | Apoiar a inclusão de pessoas com deficiência, mobilidade reduzida e idosos, considerando suas necessidades na escolha do transporte e do acompanhamento. |

O transporte até uma consulta faz parte da jornada de acesso ao cuidado. Para quem precisa de um veículo compatível ou de companhia, organizar esse trajeto pode ser uma dificuldade adicional. O Cuida Fácil pretende apoiar essa organização, contribuindo para a proposta do ODS 3.

A relação com o ODS 10 está na redução das barreiras que dificultam a participação e o acesso desse público aos serviços. Informar antecipadamente as necessidades do passageiro e apresentar opções compatíveis busca ampliar sua autonomia e tornar o atendimento mais inclusivo.

Essas relações expressam os objetivos da solução. O protótipo interativo não comprova impacto social; os resultados precisariam ser avaliados com usuários em uma aplicação real.

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

A [comparação documentada](docs/benchmarking/benchmarking.md) apresenta referências de serviços e mobilidade. A seção 12 organiza **GetNinjas, Acvida, Uber, 99 e ViaCEP**, com funcionalidades, público-alvo, pontos positivos, limitações, fontes e referências para a proposta. ViaCEP é uma referência técnica de endereço. A análise é documental e não representa testes de contratação.

## Requisitos

A referência para o hackathon é [Requisitos do Front-end](docs/requisitos/requisitos-hackathon.md), com **10 RF e 10 RNF**, critérios verificáveis e referências de componentes. A documentação de evolução em specs inclui capacidades de backend que não são obrigatórias nesta entrega. A existência do requisito não significa aprovação da implementação.

## User Stories

As [10 histórias da demonstração](docs/user-stories/user-stories-hackathon.md) seguem o modelo “Como…, quero…, para…” e possuem critérios de aceitação e vínculo RF01–RF10. Resultados devem ser registrados na [validação](docs/planejamento/validacao-entrega.md).

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
| React | Framework utilizado no frontend; package.json declara ^18.3.1. |
| Vite, Tailwind CSS e TSX | Ferramentas e arquivos presentes na aplicação atual. |
| Dados demonstrativos | Previstos para demonstrar o fluxo sem backend. |
| Armazenamento no navegador | Possibilidade a avaliar para manter solicitações locais. |
| Vercel | Publicação do frontend a partir da branch main. |
| Figma | Link do protótipo registrado pela equipe. |

## Framework Utilizado

**React**, com Vite e componentes em TSX. O package.json declara React ^18.3.1, Vite ^6.3.5 e Tailwind CSS ^4.1.12. As versões instaladas são determinadas pelo package-lock.json.

React permite organizar as interfaces em componentes reutilizáveis e atualizar a demonstração por estado. Vite fornece servidor local e build estático adequado à publicação na Vercel.

## Como Executar

O frontend está em **cuida-facil-project/**. Com o repositório clonado e a branch develop selecionada:

```bash
cd cuida-facil-project
npm ci
npm run dev
```

Abra o endereço exibido no terminal. Para gerar a versão de produção:

```bash
npm run build
```

Consulte o [guia de execução](docs/planejamento/guia-execucao.md) para pré-requisitos, atualização, visualização do build e resolução de problemas. A instalação com `npm ci` e a inicialização com `npm run dev` foram confirmadas pelo terminal de Enzo no Windows. O build local e a navegação completa ainda precisam ser registrados pela equipe.

## Protótipo

[Protótipo no Figma](https://www.figma.com/make/AYo2pdm4wNnkSP7RbWTsuI/Mobile-App-for-Caregiver-Matching).

O [inventário e fluxo de interfaces](docs/prototipo/fluxo-telas.md) descreve as **13 interfaces identificadas no código**, componentes e critérios de adaptação responsiva. A equipe ainda deve confirmar no Figma as 10 telas exigidas, conexões e acesso do professor; a contagem do código não comprova a contagem do protótipo.

## Aplicação

- **URL da aplicação publicada:** [Cuida Fácil na Vercel](https://cuida-facil-qckjx199m-enzootomas-projects.vercel.app)
- **URL do repositório:** https://github.com/Enzootomas/cuida-facil
- **Branch de desenvolvimento:** https://github.com/Enzootomas/cuida-facil/tree/develop
- **URL do protótipo:** https://www.figma.com/make/AYo2pdm4wNnkSP7RbWTsuI/Mobile-App-for-Caregiver-Matching
- **URL do GitHub Projects:** a preencher.

### Configuração do deploy

| Campo da Vercel | Valor |
|---|---|
| Production Branch | `main` |
| Framework Preset | Vite |
| Root Directory | `cuida-facil-project` |
| Install Command | `npm ci` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

O link acima identifica este deployment. Quando o domínio de produção permanente estiver confirmado, registre-o aqui para compartilhar a versão mais recente. Consulte o [guia de execução e publicação](docs/planejamento/guia-execucao.md) para verificar acesso público e resolver erros de configuração.

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
├── frontend/                 # Reserva da estrutura inicial
└── cuida-facil-project/       # Código atual da aplicação web
```

Os arquivos `.gitkeep` mantêm as pastas inicialmente vazias no Git.

### Colaboração e versionamento

Consulte o [guia de padrões básicos de Git](docs/planejamento/padroes-git.md) para nomes de branches, mensagens de commit, identificação dos autores e fluxo de Pull Requests.

- `main`: versão publicada; recebe alterações revisadas da `develop` por Pull Request.
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
- [x] Aplicação publicada com resposta HTTP 200 sem autenticação; navegação funcional ainda deve ser verificada.
- [x] Repositório Git criado.
- [x] Branch `develop` criada.
- [x] Estrutura inicial de pastas organizada.
- [x] Quadro GitHub Projects criado e vinculado.
- [ ] Mínimo de 50 cards de atividades reais.
- [ ] Mínimo de 30 commits significativos de trabalho.
- [ ] Definição do problema, público, necessidade e objetivo.
- [x] Comparação documental de 5 soluções, incluindo referência técnica, com fontes e limitações.
- [ ] Proposta de valor validada pela equipe.
- [x] 10 requisitos funcionais documentados para o Front-end; validação pendente.
- [x] 10 requisitos não funcionais documentados; verificação pendente.
- [x] 10 User Stories do Front-end com critérios de aceitação.
- [ ] Protótipo com no mínimo 10 telas.
- [x] Framework escolhido e registrado.
- [ ] Instruções de execução verificadas.
- [ ] README revisado para refletir a entrega final.
- [ ] Links da aplicação, protótipo e Projects preenchidos.
- [x] Cinco integrantes identificados.
- [ ] Responsabilidades individuais completas.
- [ ] Uso de IA atualizado conforme as ferramentas efetivamente utilizadas.

## Integrantes

Nomes e perfis registrados no PR #101 da equipe:

| Integrante | GitHub | Responsabilidade registrada |
|---|---|---|
| Edilaine Paulino Soldé | [@edilainesolde](https://github.com/edilainesolde) | Proposta de revisão do README no PR #101; demais tarefas a confirmar. |
| Enzo Gabriel Tomas De Souza | [@Enzootomas](https://github.com/Enzootomas) | Repositório, convites, organização, documentação e deploy. |
| Felipe Nunes Ramalho | [@FelipeNRamalho](https://github.com/FelipeNRamalho) | Registrar tarefas realizadas. |
| Henrique Marchetti Coutinho | [@henriquecoutinho11](https://github.com/henriquecoutinho11) | Registrar tarefas realizadas. |
| Juliana Karla Camargo da Silva | [@jukamargo](https://github.com/jukamargo) | Registrar tarefas realizadas. |

A composição de cinco pessoas deve ser confirmada com o professor. Não foram atribuídas responsabilidades por suposição.

## Inteligência Artificial

**Ferramenta utilizada até o momento:** ChatGPT / Codex.

**Utilização:**

- Apoio à organização da proposta e delimitação do escopo front-end.
- Orientações para configuração do repositório e GitHub Projects.
- Criação da estrutura inicial de pastas e da branch `develop`.
- Redação e organização deste README e atualização da relação da proposta com os ODS 3 e 10.
- Orientações de deploy na Vercel, diagnóstico de configuração e atualização da documentação de publicação.
- Complementação do benchmarking por pesquisa em fontes oficiais, requisitos e histórias do Front-end, inventário de telas e critérios de validação.

A equipe deverá atualizar este registro caso utilize IA na prototipação, implementação, revisão ou identificação de erros.

O conteúdo e o código assistidos por IA deverão ser revisados pela equipe, que permanece responsável pela solução entregue.

## Evidências e pendências

Consulte [Validação da entrega](docs/planejamento/validacao-entrega.md) para registrar testes, conferir cards e commits significativos e acompanhar as informações ainda não confirmadas. Os checkboxes documentais não certificam funcionalidades aprovadas. O site é uma demonstração; não oferece contratação, autenticação segura, pagamento ou GPS real.
